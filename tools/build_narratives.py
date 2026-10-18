"""紹介文（narratives）を取り込み、公開用のファイルを作る。

使い方（サイトのフォルダで実行）:
    python tools/build_narratives.py                 # 確認して、問題がなければ narratives/ に書き出す
    python tools/build_narratives.py --check         # 確認と照合レポートだけ（narratives/ は書き換えない）
    python tools/build_narratives.py --overwrite 2000_1,2000_3
                                                     # 手元で編集した公開ファイルを、原稿の内容で置き換える

入力: narratives-src/ の直下にある *.json（.gitignore で公開対象から外している）
  - {"records": {"遺産ID": {...}, ...}} の形（まとめたファイル）
  - {"id": "遺産ID", "public": {...}, ...} の形（1件のファイル）
  取り込み済みの古いバッチは narratives-src/archive/ に移す（直下に置かないので二重には読まない）。
  同じ遺産IDが直下の複数のファイルにあり、中身が違うときはエラーにして差分を出す（黙って上書きしない）。

出力（公開されるもの）:
  narratives/index.json        紹介文がある遺産IDと、その版（中身の指紋）の一覧。一覧の印と版の確認に使う
  narratives/{遺産ID}.json     1件ずつの本文。詳細を開いたときだけ読む
  各件の public のうち、許可した項目だけを取り出して書き出す（不要な項目を削る方式ではない）。
  research_notes、根拠の区分（evidence_class・evidence_note）、確認状況（verification）、
  出典の注記（note。内部の調査注記が入るため）は書き出さない。
  書き出したあと tools/stamp_version.py を実行して、index.html の読み込み用の印を更新する。

公開されないもの（review/ と narratives-src/。どちらも .gitignore で Git の追跡対象外）:
  review/narratives-report.md  照合レポート（件数・エラー・注意・公開しなかった注記）
  review/narratives-diff.txt   既存の公開ファイルとの差分
  narratives-src/build-state.json  このツールが最後に書き出した各ファイルの指紋（手元の編集を見分ける）

手元の編集の保護:
  narratives/{遺産ID}.json を手で直した場合（build-state.json の指紋と違う場合）は上書きせずに残し、
  原稿との差分を review/narratives-diff.txt に出す。原稿の内容に置き換えるときは --overwrite を使う。

エラー（1件でもあると何も書き出さない）:
  data.json に無い遺産ID／キーと id の違い／名称が data.json と違う／同じIDの内容違い／必須項目の不足・型の違い／
  出典番号の重複・存在しない出典番号への参照／http(s) 以外の出典URL／1つのファイルの中での同じキーの重複
注意（書き出しは行う）:
  どこからも参照されていない出典／公開しない項目
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
REVIEW_DIR = os.path.join(ROOT, "review")
STATE_PATH = os.path.join(SRC_DIR, "build-state.json")
DATA_PATH = os.path.join(ROOT, "data.json")

# 公開する項目（これ以外は書き出さない）
ITEM_FIELDS = {
    "paragraphs": ["text", "source_refs"],
    "highlights": ["text", "source_refs"],
    "people": ["name", "role", "source_refs"],
    "sources": ["number", "title", "publisher", "url", "section", "published", "accessed"],
}
PUBLIC_FIELDS = ["title", "intro", "intro_source_refs", "paragraphs", "highlights", "people", "sources"]
# 内部用と分かっている項目（公開しない。知らない項目としての注意も出さない）
INTERNAL_ITEM_FIELDS = {
    "paragraphs": {"evidence_class", "evidence_note"},
    "sources": {"verification", "note"},
}


class DuplicateKeyError(ValueError):
    pass


def no_duplicate_keys(pairs):
    seen = {}
    for k, v in pairs:
        if k in seen:
            raise DuplicateKeyError(k)
        seen[k] = v
    return seen


def rel(path):
    return os.path.relpath(path, ROOT).replace("\\", "/")


def load_sources(errors):
    """narratives-src の直下の全ファイルから [(ファイル名, 遺産ID, 1件の中身)] を作る"""
    entries = []
    files = sorted(glob.glob(os.path.join(SRC_DIR, "*.json")))
    files = [f for f in files if os.path.abspath(f) != os.path.abspath(STATE_PATH)]
    for path in files:
        name = rel(path)
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


def is_int(v):
    return isinstance(v, int) and not isinstance(v, bool)


def check_record(where, rid, rec, ids, names, errors, warnings, private_notes):
    """1件を確かめる。問題なければ公開用の中身を返す"""
    before = len(errors)
    if not isinstance(rec, dict):
        errors.append(f"{where}: 中身がオブジェクトではありません")
        return None
    if rid not in ids:
        errors.append(f"{where}: 遺産ID「{rid}」は data.json にありません")
    if rec.get("id") != rid:
        errors.append(f"{where}: キーの遺産ID「{rid}」と id「{rec.get('id')}」が違います")
    if rid in names and rec.get("name") != names[rid]:
        errors.append(f"{where}: 名称「{rec.get('name')}」が data.json の名称「{names[rid]}」と違います（推測で結び付けずに止めます）")

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
        if not is_int(s.get("number")):
            errors.append(f"{where}: {label}.number が整数ではありません")
        else:
            numbers.append(s["number"])
        need_text(s, "title", f"{label}.title")
        url = s.get("url")
        if not isinstance(url, str) or not (url.startswith("https://") or url.startswith("http://")) or any(c in url for c in ' "<>'):
            errors.append(f"{where}: {label}.url が http(s) のURLではありません（{url!r}）")
        for field in ["publisher", "section", "accessed"]:
            if s.get(field) is not None and not isinstance(s.get(field), str):
                errors.append(f"{where}: {label}.{field} が文字列ではありません")
        if s.get("published") is not None and not isinstance(s.get("published"), str) and not is_int(s.get("published")):
            errors.append(f"{where}: {label}.published が文字列・整数ではありません")
        if isinstance(s.get("note"), str) and s["note"].strip():
            private_notes.append((rid, s.get("number"), s["note"].strip()))
    dup = sorted({n for n in numbers if numbers.count(n) > 1})
    if dup:
        errors.append(f"{where}: 出典番号 {dup} が重複しています")
    valid = set(numbers)
    used = set()

    def check_refs(refs, label):
        if refs is None:
            return
        if not isinstance(refs, list) or not all(is_int(n) for n in refs):
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
    for i, s in enumerate(pub["sources"]):
        if isinstance(s, dict):
            extra = set(s) - set(ITEM_FIELDS["sources"]) - INTERNAL_ITEM_FIELDS["sources"]
            if extra:
                warnings.append(f"{where}: public.sources[{i}] の項目 {sorted(extra)} は公開しません")
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
    """公開用に、許可した項目だけを取り出す（research_notes や内部の項目は入らない）"""
    out = {"id": rid, "title": pub["title"].strip(), "intro": pub["intro"].strip()}
    if pub.get("intro_source_refs"):
        out["intro_source_refs"] = list(pub["intro_source_refs"])
    for key in ["paragraphs", "highlights", "people", "sources"]:
        items = []
        for item in pub[key]:
            kept = {}
            for field in ITEM_FIELDS[key]:
                v = item.get(field)
                if v is None or v == "" or v == []:
                    continue
                kept[field] = v.strip() if isinstance(v, str) else (list(v) if isinstance(v, list) else v)
            items.append(kept)
        out[key] = items
    return out


def fingerprint(record):
    """1件の版（中身の指紋）。中身が同じなら何度作っても同じ値になる"""
    return hashlib.sha256(json.dumps(record, ensure_ascii=False, sort_keys=True).encode("utf-8")).hexdigest()[:12]


def serialize(record):
    """1件の公開ファイルの中身（版を先頭に付ける）"""
    return json.dumps({"build": fingerprint(record), **record}, ensure_ascii=False, indent=1) + "\n"


def file_hash(text):
    return hashlib.sha256(text.encode("utf-8")).hexdigest()


def pretty(obj):
    return json.dumps(obj, ensure_ascii=False, indent=2, sort_keys=True).splitlines()


def read_text(path):
    with open(path, encoding="utf-8", newline="") as f:
        return f.read()


def write_if_changed(path, text):
    if os.path.exists(path) and read_text(path) == text:
        return False
    with open(path, "w", encoding="utf-8", newline="\n") as f:
        f.write(text)
    return True


def main():
    ap = argparse.ArgumentParser(description="紹介文を確かめて、公開用のファイルを作る")
    ap.add_argument("--check", action="store_true", help="確認と照合レポートだけで、narratives/ は書き換えない")
    ap.add_argument("--overwrite", default="", help="手元で編集した公開ファイルを原稿で置き換える遺産ID（カンマ区切り）")
    ap.add_argument("--trust-current", action="store_true",
                    help="（最初の1回だけ）今ある narratives/ をこのツールが作ったものとして記録する")
    args = ap.parse_args()
    overwrite = {x.strip() for x in args.overwrite.split(",") if x.strip()}

    with open(DATA_PATH, encoding="utf-8") as f:
        data = json.load(f)
    ids = {r["id"] for r in data}
    names = {r["id"]: r["name"] for r in data}

    state = {}
    if os.path.exists(STATE_PATH):
        with open(STATE_PATH, encoding="utf-8") as f:
            state = json.load(f).get("files", {})
    if args.trust_current:
        state = {}
        for path in glob.glob(os.path.join(OUT_DIR, "*.json")):
            rid = os.path.splitext(os.path.basename(path))[0]
            if rid != "index":
                state[rid] = file_hash(read_text(path))
        print(f"今ある公開ファイル {len(state)} 件を、このツールが作ったものとして記録します。")

    errors, warnings, private_notes = [], [], []
    if not os.path.isdir(SRC_DIR):
        print(f"入力のフォルダ {rel(SRC_DIR)} がありません。")
        return 1
    files, entries = load_sources(errors)
    print(f"入力: {len(files)} ファイル（{', '.join(rel(f) for f in files)}）・{len(entries)} 件")

    by_id = {}
    for where_file, rid, rec in entries:
        by_id.setdefault(rid, []).append((where_file, rec))
    published = {}
    for rid in sorted(by_id):
        items = by_id[rid]
        first_file, first = items[0]
        for other_file, other in items[1:]:
            if other == first:
                warnings.append(f"{rid}: {first_file} と {other_file} に同じ内容があります（1件として扱います）")
                continue
            diff = "\n".join(difflib.unified_diff(
                pretty(first), pretty(other), fromfile=f"{first_file}:{rid}", tofile=f"{other_file}:{rid}", lineterm="", n=1))
            errors.append(f"{rid}: {first_file} と {other_file} で内容が違います。どちらを使うか決めて、片方を archive/ に移してください。\n{diff}")
        result = check_record(f"{first_file}:{rid}", rid, first, ids, names, errors, warnings, private_notes)
        if result:
            published[rid] = result

    # 既存の公開ファイルとの照合
    existing = {}
    for path in glob.glob(os.path.join(OUT_DIR, "*.json")):
        rid = os.path.splitext(os.path.basename(path))[0]
        if rid != "index":
            existing[rid] = read_text(path)
    added, same, updated, kept, overwritten = [], [], [], [], []
    diffs = []
    final = {}  # 遺産ID → 書き出す中身（文字列）
    for rid, rec in published.items():
        new_text = serialize(rec)
        if rid not in existing:
            added.append(rid)
            final[rid] = new_text
            continue
        old_text = existing[rid]
        try:
            old_rec = json.loads(old_text)
        except json.JSONDecodeError:
            old_rec = None
        old_body = {k: v for k, v in (old_rec or {}).items() if k != "build"}
        edited = state.get(rid) != file_hash(old_text)  # このツールが書いたままではない＝手元で編集された
        if old_body == rec:
            same.append(rid)
            final[rid] = new_text  # 本文は同じ。版の書き方だけそろえる
            continue
        diff = "\n".join(difflib.unified_diff(
            pretty(old_body), pretty(rec), fromfile=f"narratives/{rid}.json（今の公開ファイル）",
            tofile=f"原稿から作った内容:{rid}", lineterm="", n=1))
        if edited and rid not in overwrite:
            kept.append(rid)
            final[rid] = old_text
            diffs.append(f"### {rid}：手元で編集された公開ファイルを保持（原稿の内容では上書きしていません）\n{diff}\n")
        else:
            (overwritten if edited else updated).append(rid)
            final[rid] = new_text
            label = "手元の編集を --overwrite で原稿の内容に置き換え" if edited else "原稿の更新を反映"
            diffs.append(f"### {rid}：{label}\n{diff}\n")
    removed = sorted(set(existing) - set(published))
    for rid in removed:
        if errors:
            break
        diffs.append(f"### {rid}：原稿に無いため公開ファイルを削除\n")

    for w in warnings:
        print("注意:", w)
    for e in errors:
        print("エラー:", e)

    # 照合レポート（公開しない）
    os.makedirs(REVIEW_DIR, exist_ok=True)
    data_points = sum(len(r["points"]) for r in data)
    lines = [
        "# 紹介文の照合レポート（公開しないファイル）",
        "",
        f"- 入力: {', '.join(rel(f) for f in files)}",
        f"- 原稿の件数: {len(by_id)} 遺産（重複を除く遺産IDの数）",
        f"- サイトの遺産: {len(ids)} 件（地点は {data_points} か所。地点ごとではなく遺産ごとに1つの紹介文）",
        f"- サイトにあって原稿に無い遺産: {len(ids - set(by_id))} 件" + (f"（{', '.join(sorted(ids - set(by_id)))}）" if ids - set(by_id) else ""),
        f"- 確認を通った件数: {len(published)} 件",
        f"- エラー: {len(errors)} 件　注意: {len(warnings)} 件",
        "",
        "## 既存の公開ファイルとの照合",
        "",
        f"- 新規追加: {len(added)} 件",
        f"- 既存と同一: {len(same)} 件" + (f"（{', '.join(same)}）" if same else ""),
        f"- 原稿の更新を反映: {len(updated)} 件" + (f"（{', '.join(updated)}）" if updated else ""),
        f"- 手元の編集を保持: {len(kept)} 件" + (f"（{', '.join(kept)}）" if kept else ""),
        f"- 手元の編集を原稿で置き換え: {len(overwritten)} 件" + (f"（{', '.join(overwritten)}）" if overwritten else ""),
        f"- 原稿に無いため削除: {len(removed)} 件" + (f"（{', '.join(removed)}）" if removed else ""),
        "",
        "差分は review/narratives-diff.txt を参照。",
        "",
        "## エラー",
        "",
        *([f"- {e}" for e in errors] or ["- なし"]),
        "",
        "## 注意",
        "",
        *([f"- {w}" for w in warnings] or ["- なし"]),
        "",
        "## 公開しなかった出典の注記（sources[].note）",
        "",
        "内部の調査注記が含まれるため、出典の注記は公開していません。",
        "",
        *([f"- {rid} 出典{num}: {note}" for rid, num, note in private_notes] or ["- なし"]),
        "",
    ]
    with open(os.path.join(REVIEW_DIR, "narratives-report.md"), "w", encoding="utf-8", newline="\n") as f:
        f.write("\n".join(lines))
    with open(os.path.join(REVIEW_DIR, "narratives-diff.txt"), "w", encoding="utf-8", newline="\n") as f:
        f.write("\n".join(diffs) if diffs else "既存の公開ファイルとの差分はありません。\n")

    print(f"新規 {len(added)}・同一 {len(same)}・更新を反映 {len(updated)}・手元の編集を保持 {len(kept)}"
          f"・置き換え {len(overwritten)}・削除 {len(removed)}・エラー {len(errors)}・注意 {len(warnings)}")
    print("照合レポート: review/narratives-report.md　差分: review/narratives-diff.txt")
    if errors:
        print(f"\nエラーが {len(errors)} 件あるため、書き出していません。")
        return 1
    if args.check:
        print("--check のため、narratives/ は書き換えていません。")
        return 0

    os.makedirs(OUT_DIR, exist_ok=True)
    changed = 0
    for rid in removed:
        os.remove(os.path.join(OUT_DIR, rid + ".json"))
        changed += 1
    items = {}
    for rid in sorted(final):
        text = final[rid]
        changed += write_if_changed(os.path.join(OUT_DIR, rid + ".json"), text)
        items[rid] = json.loads(text).get("build", "")
        if rid not in kept:
            state[rid] = file_hash(text)
    for rid in removed:
        state.pop(rid, None)
    index_text = json.dumps({"version": 2, "items": items}, ensure_ascii=False, separators=(",", ":"), sort_keys=True) + "\n"
    changed += write_if_changed(os.path.join(OUT_DIR, "index.json"), index_text)
    with open(STATE_PATH, "w", encoding="utf-8", newline="\n") as f:
        json.dump({"files": dict(sorted(state.items()))}, f, ensure_ascii=False, indent=1)
        f.write("\n")
    print(f"{rel(OUT_DIR)}/ を更新しました（書き換えたファイル {changed} 個）。")

    # 読み込み用の印（index.html の ?v=）を更新する
    return subprocess.call([sys.executable, "-X", "utf8", os.path.join(ROOT, "tools", "stamp_version.py")])


if __name__ == "__main__":
    sys.exit(main())
