"""紹介文（narratives）を取り込み、公開用のファイルを作る。

使い方（このフォルダの一つ上＝サイトのフォルダで実行）:
    python tools/build_narratives.py           # 確認して、問題がなければ narratives/ に書き出す
    python tools/build_narratives.py --check   # 確認だけ（何も書き換えない）

入力: narratives-src/ にある *.json（.gitignore で公開対象から外している）
  - {"records": {"遺産ID": {...}, ...}} の形（まとめたファイル）
  - {"id": "遺産ID", "public": {...}, ...} の形（1件のファイル）
  のどちらでもよい。各件の public だけを公開し、research_notes などの内部メモは書き出さない。

出力: narratives/index.json（紹介文がある遺産IDの一覧）と narratives/{遺産ID}.json
  書き出したあと tools/stamp_version.py を実行して、index.html の読み込み用の印を更新する。

確認すること（1つでも「エラー」があれば何も書き出さない）:
  - data.json に無い遺産ID
  - 同じ遺産IDの重複（中身が同じなら注意、違えば差分を出してエラー。黙って上書きしない）
  - 必須項目の不足・型の違い
  - source_refs が、その遺産の sources[].number に無い番号を指していないか
"""
import argparse
import difflib
import glob
import hashlib
import json
import os
import subprocess
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC_DIR = os.path.join(ROOT, "narratives-src")
OUT_DIR = os.path.join(ROOT, "narratives")
DATA_PATH = os.path.join(ROOT, "data.json")

# 公開する項目（これ以外は書き出さない）
PUBLIC_FIELDS = ["title", "intro", "intro_source_refs", "paragraphs", "highlights", "people", "sources"]
ITEM_FIELDS = {
    "paragraphs": ["text", "source_refs"],
    "highlights": ["text", "source_refs"],
    "people": ["name", "role", "source_refs"],
    "sources": ["number", "title", "publisher", "url", "section", "published", "accessed", "note"],
}
# 内部用と分かっている項目（公開しないが、知らない項目として注意も出さない）
INTERNAL_ITEM_FIELDS = {"paragraphs": {"evidence_class"}, "sources": {"verification"}}


class DuplicateKeyError(ValueError):
    pass


def no_duplicate_keys(pairs):
    seen = {}
    for k, v in pairs:
        if k in seen:
            raise DuplicateKeyError(k)
        seen[k] = v
    return seen


def load_sources(errors):
    """narratives-src の全ファイルから [(ファイル名, 遺産ID, 1件の中身)] を作る"""
    entries = []
    files = sorted(glob.glob(os.path.join(SRC_DIR, "*.json")))
    for path in files:
        name = os.path.relpath(path, ROOT)
        try:
            with open(path, encoding="utf-8") as f:
                doc = json.load(f, object_pairs_hook=no_duplicate_keys)
        except DuplicateKeyError as e:
            errors.append(f"{name}: 同じキー「{e}」が1つのファイルの中で重複しています（後の方で黙って上書きされるため、どちらを使うか決めてください）")
            continue
        except (OSError, json.JSONDecodeError) as e:
            errors.append(f"{name}: JSON として読めません（{e}）")
            continue
        if isinstance(doc, dict) and isinstance(doc.get("records"), dict):
            for rid, rec in doc["records"].items():
                entries.append((name, rid, rec))
        elif isinstance(doc, dict) and "public" in doc and "id" in doc:
            entries.append((name, doc["id"], doc))
        else:
            errors.append(f"{name}: 形式が分かりません（\"records\" か、\"id\" と \"public\" を持つ1件の形にしてください）")
    return files, entries


def check_record(where, rid, rec, ids, names, errors, warnings):
    """1件を確かめる。問題なければ公開用の中身を返す"""
    before = len(errors)
    if not isinstance(rec, dict):
        errors.append(f"{where}: 中身がオブジェクトではありません")
        return None
    if rid not in ids:
        errors.append(f"{where}: 遺産ID「{rid}」は data.json にありません")
    if "id" in rec and rec["id"] != rid:
        errors.append(f"{where}: キーの遺産ID「{rid}」と id「{rec['id']}」が違います")
    if rid in names and rec.get("name") and rec["name"] != names[rid]:
        warnings.append(f"{where}: name「{rec['name']}」が data.json の名称「{names[rid]}」と違います（表示には data.json の名称を使います）")

    pub = rec.get("public")
    if not isinstance(pub, dict):
        errors.append(f"{where}: public がありません")
        return None

    def need_text(obj, key, label):
        v = obj.get(key)
        if not isinstance(v, str) or not v.strip():
            errors.append(f"{where}: {label} がありません（文字が空、または文字列ではない）")

    need_text(pub, "title", "public.title（見出し）")
    need_text(pub, "intro", "public.intro（導入文）")

    lists_missing = [key for key in ["paragraphs", "highlights", "people", "sources"] if not isinstance(pub.get(key), list)]
    for key in lists_missing:
        errors.append(f"{where}: public.{key} がありません（リストではない）")
    if lists_missing:
        return None
    if not pub["paragraphs"]:
        errors.append(f"{where}: public.paragraphs（本文）が空です")
    if not pub["sources"]:
        errors.append(f"{where}: public.sources（出典）が空です")

    numbers = []
    for i, s in enumerate(pub["sources"]):
        label = f"public.sources[{i}]"
        if not isinstance(s, dict):
            errors.append(f"{where}: {label} がオブジェクトではありません")
            continue
        if not isinstance(s.get("number"), int) or isinstance(s.get("number"), bool):
            errors.append(f"{where}: {label}.number が整数ではありません")
        else:
            numbers.append(s["number"])
        need_text(s, "title", f"{label}.title")
        need_text(s, "url", f"{label}.url")
    dup = sorted({n for n in numbers if numbers.count(n) > 1})
    if dup:
        errors.append(f"{where}: 出典番号 {dup} が重複しています")
    valid = set(numbers)
    used = set()

    def check_refs(refs, label):
        if refs is None:
            return
        if not isinstance(refs, list) or not all(isinstance(n, int) and not isinstance(n, bool) for n in refs):
            errors.append(f"{where}: {label}.source_refs が整数のリストではありません")
            return
        missing = [n for n in refs if n not in valid]
        if missing:
            errors.append(f"{where}: {label} が存在しない出典番号 {missing} を参照しています（この遺産の出典は {sorted(valid)}）")
        used.update(refs)

    check_refs(pub.get("intro_source_refs"), "public.intro_source_refs")
    for key, required in [("paragraphs", ["text"]), ("highlights", ["text"]), ("people", ["name", "role"])]:
        for i, item in enumerate(pub[key]):
            label = f"public.{key}[{i}]"
            if not isinstance(item, dict):
                errors.append(f"{where}: {label} がオブジェクトではありません")
                continue
            for field in required:
                need_text(item, field, f"{label}.{field}")
            check_refs(item.get("source_refs", []), label)
            extra = set(item) - set(ITEM_FIELDS[key]) - INTERNAL_ITEM_FIELDS.get(key, set())
            if extra:
                warnings.append(f"{where}: {label} の項目 {sorted(extra)} は公開しません")
    unused = sorted(valid - used)
    if unused:
        warnings.append(f"{where}: 出典 {unused} はどこからも参照されていません（出典一覧には表示します）")
    extra = set(pub) - set(PUBLIC_FIELDS)
    if extra:
        warnings.append(f"{where}: public の項目 {sorted(extra)} は公開しません（表示に使う場合は tools/build_narratives.py に追加）")
    if errors[before:]:
        return None
    return public_part(rid, pub)


def public_part(rid, pub):
    """公開用に、決めた項目だけを取り出す（research_notes や内部の項目は入らない）"""
    out = {"id": rid, "title": pub["title"].strip(), "intro": pub["intro"].strip()}
    if pub.get("intro_source_refs"):
        out["intro_source_refs"] = pub["intro_source_refs"]
    for key in ["paragraphs", "highlights", "people", "sources"]:
        items = []
        for item in pub[key]:
            kept = {}
            for field in ITEM_FIELDS[key]:
                v = item.get(field)
                if v is None or v == "" or v == []:
                    continue
                kept[field] = v.strip() if isinstance(v, str) else v
            items.append(kept)
        out[key] = items
    return out


def pretty(obj):
    return json.dumps(obj, ensure_ascii=False, indent=2, sort_keys=True).splitlines()


def main():
    ap = argparse.ArgumentParser(description="紹介文を確かめて、公開用のファイルを作る")
    ap.add_argument("--check", action="store_true", help="確認だけして、何も書き出さない")
    args = ap.parse_args()

    with open(DATA_PATH, encoding="utf-8") as f:
        data = json.load(f)
    ids = {r["id"] for r in data}
    names = {r["id"]: r["name"] for r in data}

    errors, warnings = [], []
    if not os.path.isdir(SRC_DIR):
        print(f"入力のフォルダ {os.path.relpath(SRC_DIR, ROOT)} がありません。")
        return 1
    files, entries = load_sources(errors)
    print(f"入力: {len(files)} ファイル・{len(entries)} 件")

    # 同じ遺産IDの重複
    by_id = {}
    for where_file, rid, rec in entries:
        by_id.setdefault(rid, []).append((where_file, rec))
    published = {}
    for rid, items in by_id.items():
        if len(items) > 1:
            first_file, first = items[0]
            for other_file, other in items[1:]:
                if other == first:
                    warnings.append(f"{rid}: {first_file} と {other_file} に同じ内容があります（1件として扱います）")
                    continue
                diff = "\n".join(difflib.unified_diff(
                    pretty(first), pretty(other), fromfile=f"{first_file}:{rid}", tofile=f"{other_file}:{rid}", lineterm="", n=1))
                errors.append(f"{rid}: {first_file} と {other_file} で内容が違います。どちらを使うか決めて、片方を外してください。\n{diff}")
        where = f"{items[0][0]}:{rid}"
        result = check_record(where, rid, items[0][1], ids, names, errors, warnings)
        if result:
            published[rid] = result

    for w in warnings:
        print("注意:", w)
    for e in errors:
        print("エラー:", e)
    if errors:
        print(f"\nエラーが {len(errors)} 件あるため、書き出していません。")
        return 1

    # 今の公開用ファイルとの違いを知らせる
    old = {}
    for path in glob.glob(os.path.join(OUT_DIR, "*.json")):
        rid = os.path.splitext(os.path.basename(path))[0]
        if rid == "index":
            continue
        with open(path, encoding="utf-8") as f:
            old[rid] = json.load(f)
            old[rid].pop("build", None)  # 作成番号は比べない
    added = sorted(set(published) - set(old))
    removed = sorted(set(old) - set(published))
    changed = sorted(rid for rid in set(published) & set(old) if published[rid] != old[rid])
    print(f"確認済み: {len(published)} 件（追加 {len(added)}・変更 {len(changed)}・削除 {len(removed)}）")
    for label, items in [("追加", added), ("変更", changed), ("削除", removed)]:
        if items:
            print(f"  {label}: {', '.join(items)}")

    if args.check:
        print("--check のため、書き出していません。")
        return 0

    # 作成番号：公開する中身全体の指紋。index.json と1件ずつのファイルに同じ値を入れ、
    # 画面は両者が合うときだけ紹介文を出す（サイトの更新をまたいで版の違うものを混ぜない）
    build = hashlib.sha256(json.dumps(published, ensure_ascii=False, sort_keys=True).encode("utf-8")).hexdigest()[:12]
    os.makedirs(OUT_DIR, exist_ok=True)
    for rid in removed:
        os.remove(os.path.join(OUT_DIR, rid + ".json"))
    for rid, rec in published.items():
        with open(os.path.join(OUT_DIR, rid + ".json"), "w", encoding="utf-8", newline="\n") as f:
            json.dump({"build": build, **rec}, f, ensure_ascii=False, indent=1)
            f.write("\n")
    with open(os.path.join(OUT_DIR, "index.json"), "w", encoding="utf-8", newline="\n") as f:
        json.dump({"build": build, "ids": sorted(published)}, f, ensure_ascii=False)
        f.write("\n")
    print(f"{os.path.relpath(OUT_DIR, ROOT)}/ に書き出しました。")

    # 読み込み用の印（index.html の ?v=）を更新する
    return subprocess.call([sys.executable, os.path.join(ROOT, "tools", "stamp_version.py")])


if __name__ == "__main__":
    sys.exit(main())
