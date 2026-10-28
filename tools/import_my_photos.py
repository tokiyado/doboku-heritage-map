"""ときやどが撮った写真を取り込み、確認してから公開する。

使い方（サイトのフォルダで実行）:
    python tools/import_my_photos.py              # 新しい写真を取り込み、割り当て表・公開判定・確認用一覧を更新する
    python tools/import_my_photos.py --dry-run    # 何が起きるかを表示するだけ（何も書き換えない）

写真の置き場所（元の写真は読むだけで、動かさない・消さない）:
    OneDrive\\土木遺産写真（サブフォルダも読む）。--source か mine-src/config.json の "source" で変えられる

流れ:
  1. 振り分け … 撮影位置（GPS）から data.json の地点までの直線距離で、遺産を決める。
       30m 以内 → 自動で決める／100m 以内 → 「確認待ち」（割り当て表に ?候補 を出す）／それより遠い・位置なし → 未割り当て。
       ファイル名に遺産ID（例 2000_1）が入っていれば、それを優先する。複数地点の遺産は、どの地点（施設）かも記録する。
  2. 公開用の画像を作る … 撮影情報（位置・日時・機種など）を消し、長辺1280px・300KB以下に縮小、一覧用に192pxの正方形も作る。
       iPhone の HEIC は JPEG にする。ここで作った画像は mine-src/preview/ に置くだけで、まだ公開されない。
  3. 公開前の確認 … mine-src/確認用一覧.html で写真を見て、人の顔や車のナンバーが写っていないかを確かめ、
       mine-src/公開判定.txt に「公開」か「除外」を書く（最初は「未確認」）。
  4. もう一度このツールを実行すると、「公開」の写真だけを photos/mine/ に置き、photos-mine.js を作り直し、
       index.html の読み込み用の印を更新する。「公開」をやめた写真は photos/mine/ から外す。

手で書くファイル（mine-src/ は .gitignore で公開対象外）:
  割り当て.txt  … 「写真ID = 遺産ID」で決める。複数地点なら「= 2000_7:3」（3番目の地点）。
                  「?遺産ID」は確認待ちの候補（? を消すと確定）。「対象外」と書けば土木遺産の写真として扱わない。
  公開判定.txt  … 「写真ID = 公開」「= 除外」「= 未確認」。# から後ろはメモ（除外した理由など）。

写真の利用条件: 著作権はときやど。無断転載禁止（photos-mine.js の license に入れ、画面にも表示する）。
"""
import argparse
import hashlib
import html
import io
import json
import math
import os
import re
import subprocess
import sys

from PIL import Image, ImageOps

try:  # iPhone の HEIC を読めるようにする
    import pillow_heif
    pillow_heif.register_heif_opener()
    HEIC_OK = True
except ImportError:
    HEIC_OK = False

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
WORK = os.path.join(ROOT, "mine-src")
PREVIEW = os.path.join(WORK, "preview")
RECORDS = os.path.join(WORK, "records.json")
ASSIGN = os.path.join(WORK, "割り当て.txt")
DECIDE = os.path.join(WORK, "公開判定.txt")
REVIEW = os.path.join(WORK, "確認用一覧.html")
CONFIG = os.path.join(WORK, "config.json")
PUBLIC_DIR = os.path.join(ROOT, "photos", "mine")
PUBLIC_JS = os.path.join(ROOT, "photos-mine.js")
DATA = os.path.join(ROOT, "data.json")

DEFAULT_SOURCE = os.path.join(os.path.expanduser("~"), "OneDrive", "土木遺産写真")
EXTS = {".jpg", ".jpeg", ".png", ".heic", ".heif"}
AUTO_M = 30      # これ以内は自動で決める
CHECK_M = 100    # これ以内は確認待ち
OWNER = "ときやど"
LICENSE = "無断転載禁止"
ID_IN_NAME = re.compile(r"(?<![0-9A-Za-z])([0-9]{4}_[0-9]{1,2}|jd-[0-9]+)(?![0-9])")


def rel(path):
    return os.path.relpath(path, ROOT).replace("\\", "/")


def distance_m(a_lat, a_lng, b_lat, b_lng):
    r = math.radians
    h = math.sin(r(b_lat - a_lat) / 2) ** 2 + math.cos(r(a_lat)) * math.cos(r(b_lat)) * math.sin(r(b_lng - a_lng) / 2) ** 2
    return 2 * 6371000 * math.asin(math.sqrt(h))


def read_meta(path):
    """撮影日時と位置を読む（読めなければ None）"""
    taken, lat, lng = None, None, None
    try:
        with Image.open(path) as im:
            exif = im.getexif()
            sub = exif.get_ifd(0x8769)  # Exif
            raw = sub.get(0x9003) or exif.get(0x0132)  # DateTimeOriginal / DateTime
            if raw:
                m = re.match(r"(\d{4}):(\d{2}):(\d{2})[ T](\d{2}):(\d{2}):(\d{2})", str(raw))
                if m:
                    taken = "{}-{}-{}T{}:{}:{}".format(*m.groups())
            gps = exif.get_ifd(0x8825)
            if gps and 2 in gps and 4 in gps:
                def deg(v, ref):
                    d = float(v[0]) + float(v[1]) / 60 + float(v[2]) / 3600
                    return -d if ref in ("S", "W") else d
                lat = deg(gps[2], gps.get(1, "N"))
                lng = deg(gps[4], gps.get(3, "E"))
                if not (-90 <= lat <= 90 and -180 <= lng <= 180) or (lat == 0 and lng == 0):
                    lat = lng = None
    except Exception as e:  # 壊れた画像など
        print(f"  読めません: {path}（{e}）")
        return None
    return taken, lat, lng


def file_sha(path):
    h = hashlib.sha256()
    with open(path, "rb") as f:
        for chunk in iter(lambda: f.read(1 << 20), b""):
            h.update(chunk)
    return h.hexdigest()


def make_images(src, key):
    """撮影情報を消した公開用の画像（長辺1280px・300KB以下）と、一覧用の192px正方形を mine-src/preview に作る"""
    os.makedirs(PREVIEW, exist_ok=True)
    with Image.open(src) as im:
        im = ImageOps.exif_transpose(im).convert("RGB")
    main = im.copy()
    main.thumbnail((1280, 1280), Image.LANCZOS)
    for q in (85, 80, 75, 70, 65, 60, 55):
        buf = io.BytesIO()
        main.save(buf, "JPEG", quality=q, optimize=True, progressive=True)  # exif を渡さないので撮影情報は入らない
        if buf.tell() <= 300 * 1024:
            break
    with open(os.path.join(PREVIEW, key + ".jpg"), "wb") as f:
        f.write(buf.getvalue())
    w, h = im.size
    s = min(w, h)
    thumb = im.crop(((w - s) // 2, (h - s) // 2, (w - s) // 2 + s, (h - s) // 2 + s)).resize((192, 192), Image.LANCZOS)
    thumb.save(os.path.join(PREVIEW, key + "-thumb.jpg"), "JPEG", quality=82, optimize=True)
    for name in (key + ".jpg", key + "-thumb.jpg"):
        with Image.open(os.path.join(PREVIEW, name)) as check:
            if len(check.getexif()) or "exif" in check.info:
                raise SystemExit(f"撮影情報が残っています（公開しません）: {name}")
    return main.size


def parse_table(path):
    """「写真ID = 値  # メモ」の表を読む → {写真ID: (値, メモ)}"""
    out = {}
    if not os.path.exists(path):
        return out
    with open(path, encoding="utf-8-sig") as f:
        for line in f:
            line = line.rstrip("\n")
            if not line.strip() or line.lstrip().startswith("#") or "=" not in line:
                continue
            key, rest = line.split("=", 1)
            value, _, memo = rest.partition("#")
            out[key.strip()] = (value.strip(), memo.strip())
    return out


def nearest(points, lat, lng):
    best = None
    for hid, idx, p in points:
        d = distance_m(lat, lng, p["lat"], p["lng"])
        if best is None or d < best[0]:
            best = (d, hid, idx)
    return best


def main():
    ap = argparse.ArgumentParser(description="ときやどが撮った写真を取り込む")
    ap.add_argument("--source", help="写真の置き場所（既定は OneDrive\\土木遺産写真）")
    ap.add_argument("--dry-run", action="store_true", help="表示だけで、何も書き換えない")
    args = ap.parse_args()

    config = {}
    if os.path.exists(CONFIG):
        with open(CONFIG, encoding="utf-8") as f:
            config = json.load(f)
    source = args.source or config.get("source") or DEFAULT_SOURCE
    if not os.path.isdir(source):
        print(f"写真の置き場所がありません: {source}")
        return 1

    with open(DATA, encoding="utf-8") as f:
        data = {r["id"]: r for r in json.load(f)}
    designated_path = os.path.join(ROOT, "designated.json")  # 国の重要文化財（土木系・選奨外）の地点も振り分けに使う
    if os.path.exists(designated_path):
        with open(designated_path, encoding="utf-8") as f:
            for r in json.load(f):
                data.setdefault(r["id"], r)
    points = [(hid, i, p) for hid, r in data.items() for i, p in enumerate(r["points"])]

    records = {}
    if os.path.exists(RECORDS):
        with open(RECORDS, encoding="utf-8") as f:
            records = json.load(f)
    by_sha = {r["sha256"]: k for k, r in records.items()}

    # 1. 新しい写真を探す（同じ中身の写真は一度だけ）
    new = 0
    for dirpath, _, files in os.walk(source):
        for name in sorted(files):
            path = os.path.join(dirpath, name)
            ext = os.path.splitext(name)[1].lower()
            if ext not in EXTS:
                continue
            if ext in (".heic", ".heif") and not HEIC_OK:
                print(f"  HEIC を読む部品（pillow-heif）が無いため飛ばします: {name}")
                continue
            sha = file_sha(path)
            if sha in by_sha:
                old = records[by_sha[sha]]
                old["original"] = os.path.relpath(path, source)
                # まだ遺産が決まっていない写真は、地点が増えたとき（国の重要文化財など）に候補を選び直す
                if not old["heritage"] and old["how"] != "対象外" and old["lat"] is not None:
                    d, hid, idx = nearest(points, old["lat"], old["lng"])
                    old["distance_m"], old["candidate"] = round(d), [hid, idx]
                    if d <= AUTO_M:
                        old["heritage"], old["point"], old["how"] = hid, idx, f"自動（{round(d)}m）"
                continue
            meta = read_meta(path)
            if meta is None:
                continue
            taken, lat, lng = meta
            key = (taken.replace("-", "").replace(":", "").replace("T", "-") if taken else "nodate") + "-" + sha[:8]
            rec = {"sha256": sha, "original": os.path.relpath(path, source), "taken": taken,
                   "lat": lat, "lng": lng, "heritage": None, "point": None, "how": "", "distance_m": None, "candidate": None}
            m = ID_IN_NAME.search(name)
            if m and m.group(1) in data:
                rec["heritage"], rec["how"] = m.group(1), "ファイル名"
                pts = [(m.group(1), i, p) for i, p in enumerate(data[m.group(1)]["points"])]
                if lat is not None:
                    d, _, idx = nearest(pts, lat, lng)
                    rec["point"], rec["distance_m"] = idx, round(d)
                elif len(pts) == 1:
                    rec["point"] = 0
            elif lat is not None:
                d, hid, idx = nearest(points, lat, lng)
                rec["distance_m"], rec["candidate"] = round(d), [hid, idx]
                if d <= AUTO_M:
                    rec["heritage"], rec["point"], rec["how"] = hid, idx, f"自動（{round(d)}m）"
            records[key] = rec
            by_sha[sha] = key
            new += 1
    print(f"写真の置き場所: {source}")
    print(f"新しい写真: {new} 枚（これまでの分を合わせて {len(records)} 枚）")

    # 2. 割り当て表の指定を反映する
    assigned_by_hand = parse_table(ASSIGN)
    for key, (value, _) in assigned_by_hand.items():
        rec = records.get(key)
        if not rec or not value or value.startswith("?"):
            continue
        if value == "対象外":
            rec["heritage"], rec["point"], rec["how"] = None, None, "対象外"
            continue
        hid, _, idx = value.partition(":")
        if hid not in data:
            print(f"  割り当て表の遺産IDが data.json にありません: {key} = {value}")
            continue
        npts = len(data[hid]["points"])
        point = int(idx) - 1 if idx.isdigit() and 1 <= int(idx) <= npts else (0 if npts == 1 else rec.get("point"))
        if rec["heritage"] != hid or rec["point"] != point or not rec["how"].startswith("手で"):
            rec["heritage"], rec["point"], rec["how"] = hid, point, "手で指定"

    # 3. 公開用の画像（まだ公開しない）を作る
    for key, rec in sorted(records.items()):
        if rec["heritage"] and not os.path.exists(os.path.join(PREVIEW, key + ".jpg")) and not args.dry_run:
            src = os.path.join(source, rec["original"])
            if not os.path.exists(src):
                print(f"  元の写真が見つかりません（置き場所から消えた？）: {rec['original']}")
                continue
            rec["size"] = list(make_images(src, key))

    # 4. 公開判定を読む（無い写真は「未確認」）
    decisions = parse_table(DECIDE)
    for key, rec in records.items():
        value, memo = decisions.get(key, ("未確認", ""))
        if value not in ("公開", "除外", "未確認"):
            print(f"  公開判定は「公開」「除外」「未確認」のどれかにしてください: {key} = {value}")
            value = "未確認"
        rec["decision"], rec["decision_memo"] = value, memo

    published = {k: r for k, r in records.items() if r["heritage"] and r["decision"] == "公開"}
    counts = {
        "確認待ち・未割り当て": sum(1 for r in records.values() if not r["heritage"] and r["how"] != "対象外"),
        "対象外": sum(1 for r in records.values() if r["how"] == "対象外"),
        "未確認": sum(1 for r in records.values() if r["heritage"] and r["decision"] == "未確認"),
        "公開": len(published),
        "除外": sum(1 for r in records.values() if r["heritage"] and r["decision"] == "除外"),
    }
    print("　".join(f"{k} {v}" for k, v in counts.items()))
    if args.dry_run:
        print("--dry-run のため、何も書き換えていません。")
        return 0

    os.makedirs(WORK, exist_ok=True)
    with open(RECORDS, "w", encoding="utf-8", newline="\n") as f:
        json.dump(records, f, ensure_ascii=False, indent=1, sort_keys=True)
        f.write("\n")
    write_tables(records, data, assigned_by_hand, decisions)
    write_review(records, data, counts)

    # 5. 「公開」の写真だけを photos/mine/ に置き、photos-mine.js を作り直す
    os.makedirs(PUBLIC_DIR, exist_ok=True)
    wanted = set()
    for key in published:
        for suffix in (".jpg", "-thumb.jpg"):
            name = key + suffix
            wanted.add(name)
            src, dst = os.path.join(PREVIEW, name), os.path.join(PUBLIC_DIR, name)
            if not os.path.exists(src):
                continue
            with open(src, "rb") as f:
                body = f.read()
            if not os.path.exists(dst) or open(dst, "rb").read() != body:
                with open(dst, "wb") as f:
                    f.write(body)
    for name in os.listdir(PUBLIC_DIR):  # 「公開」をやめた写真を外す（このツールが置いた形の名前だけ）
        if name not in wanted and re.match(r"^(\d{8}-\d{6}|nodate)-[0-9a-f]{8}(-thumb)?\.jpg$", name):
            os.remove(os.path.join(PUBLIC_DIR, name))
    write_public_js(published, data)
    print(f"公開する写真: {len(published)} 枚（photos/mine/・photos-mine.js）")
    print(f"確認用一覧: {rel(REVIEW)}　割り当て表: {rel(ASSIGN)}　公開判定: {rel(DECIDE)}")
    return subprocess.call([sys.executable, "-X", "utf8", os.path.join(ROOT, "tools", "stamp_version.py")])


def heritage_label(data, hid, point):
    if not hid:
        return ""
    r = data[hid]
    if len(r["points"]) > 1 and point is not None:
        return f"{r['name']}（{r['points'][point]['name']}）"
    return r["name"]


def write_tables(records, data, assigned_by_hand, decisions):
    lines = ["# 割り当て表：「写真ID = 遺産ID」で決める。複数地点なら「= 2000_7:3」（3番目の地点）。",
             "# 「?遺産ID」は確認待ちの候補（? を消すと確定）。「対象外」で土木遺産の写真として扱わない。",
             "# 書き換えたら python tools/import_my_photos.py をもう一度実行する。", ""]
    for key, rec in sorted(records.items()):
        if rec["heritage"] or rec["how"] == "対象外":
            value = assigned_by_hand.get(key, ("", ""))[0] if key in assigned_by_hand else ""
            if not value:
                continue  # 自動やファイル名で決まったものは表に出さない
        else:
            cand = rec.get("candidate")
            value = assigned_by_hand.get(key, ("", ""))[0] or (f"?{cand[0]}" + (f":{cand[1] + 1}" if len(data[cand[0]]['points']) > 1 else "") if cand and rec["distance_m"] <= CHECK_M else "")
        info = [f"撮影 {rec['taken'][:16].replace('T', ' ')}" if rec["taken"] else "撮影日時なし"]
        if rec.get("candidate"):
            c = rec["candidate"]
            info.append(f"最寄り {heritage_label(data, c[0], c[1])} まで {rec['distance_m']}m")
        elif rec["lat"] is None:
            info.append("位置情報なし")
        info.append(rec["original"])
        lines.append(f"{key} = {value}  # {'・'.join(info)}")
    with open(ASSIGN, "w", encoding="utf-8", newline="\n") as f:
        f.write("\n".join(lines) + "\n")

    lines = ["# 公開判定：mine-src/確認用一覧.html で写真を見て、「公開」か「除外」を書く（最初は「未確認」）。",
             "# 人の顔や車のナンバーが写っている写真は「除外」にする。# から後ろはメモ（除外の理由など）。",
             "# 書き換えたら python tools/import_my_photos.py をもう一度実行する。", ""]
    for key, rec in sorted(records.items()):
        if not rec["heritage"]:
            continue
        memo = decisions.get(key, ("", ""))[1] or f"{rec['heritage']} {heritage_label(data, rec['heritage'], rec['point'])}・{rec['taken'][:10] if rec['taken'] else '撮影日なし'}"
        lines.append(f"{key} = {rec['decision']}  # {memo}")
    with open(DECIDE, "w", encoding="utf-8", newline="\n") as f:
        f.write("\n".join(lines) + "\n")


def write_review(records, data, counts):
    """写真を見て公開・除外を決めるための一覧（公開しない）"""
    groups = [("公開前の確認（未確認）", lambda r: r["heritage"] and r["decision"] == "未確認"),
              ("確認待ち・未割り当て（割り当て表で遺産を決める）", lambda r: not r["heritage"] and r["how"] != "対象外"),
              ("公開", lambda r: r["heritage"] and r["decision"] == "公開"),
              ("除外", lambda r: r["heritage"] and r["decision"] == "除外"),
              ("対象外", lambda r: r["how"] == "対象外")]
    parts = []
    for title, test in groups:
        items = [(k, r) for k, r in sorted(records.items()) if test(r)]
        if not items:
            continue
        cards = []
        for key, r in items:
            img = f"preview/{key}.jpg" if os.path.exists(os.path.join(PREVIEW, key + ".jpg")) else ""
            label = heritage_label(data, r["heritage"], r["point"]) if r["heritage"] else (
                f"候補：{heritage_label(data, r['candidate'][0], r['candidate'][1])}（{r['distance_m']}m）" if r.get("candidate") else "候補なし")
            pick = (f'<label><input type="radio" name="{key}" value="公開"> 公開</label>'
                    f'<label><input type="radio" name="{key}" value="除外"> 除外</label>') if r["heritage"] else ""
            ph = f'<a href="{img}" target="_blank"><img src="{img}" alt=""></a>' if img else "画像は遺産が決まってから作ります"
            cards.append(f'<div class="card"><div class="ph">{ph}</div>'
                         f'<p><b>{html.escape(label)}</b></p>'
                         f'<p class="m">{html.escape(key)}<br>撮影 {html.escape((r["taken"] or "日時なし").replace("T", " "))}・{html.escape(r["how"] or "")}<br>{html.escape(r["original"])}</p>'
                         f'<p class="m">いまの判定：{html.escape(r.get("decision", ""))} {html.escape(r.get("decision_memo") or "")}</p>{pick}</div>')
        parts.append(f"<h2>{html.escape(title)}（{len(items)}枚）</h2><div class=\"grid\">{''.join(cards)}</div>")
    page = f"""<!doctype html><html lang="ja"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex"><title>自分の写真 確認用一覧（公開しない）</title><style>
body{{margin:0;padding:16px;font:15px/1.6 system-ui,"Yu Gothic UI",sans-serif;background:#f4f7f8;color:#142b37}}
.note{{border:2px solid #c0392b;background:#fff;padding:10px 14px;border-radius:8px}}
.grid{{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:12px}}
.card{{background:#fff;border:1px solid #dfe5e8;border-radius:8px;padding:10px}}
.ph img{{width:100%;height:220px;object-fit:contain;background:#eef2f4;display:block}}.ph{{min-height:40px;color:#71818b}}
.m{{font-size:12px;color:#5d7380;margin:4px 0}}label{{margin-right:14px}}
textarea{{width:100%;height:140px;font:12px monospace}}.bar{{position:sticky;top:0;background:#f4f7f8;padding:8px 0}}
</style></head><body>
<h1>自分の写真 確認用一覧</h1>
<p class="note"><b>このページは公開しません。</b>写真を拡大して、人の顔・車のナンバー・個人の家などが写っていないか確かめ、
「公開」か「除外」を選んでください。下の「選んだ判定を書き出す」で出る文字を mine-src/公開判定.txt の同じ行に反映し（またはそのまま Claude に渡し）、
python tools/import_my_photos.py をもう一度実行すると「公開」の写真だけがサイトに入ります。</p>
<p>{'　'.join(f'{html.escape(k)} {v}' for k, v in counts.items())}</p>
<div class="bar"><button id="out">選んだ判定を書き出す</button></div><textarea id="ta" hidden readonly></textarea>
{''.join(parts) or '<p>まだ写真がありません。</p>'}
<script>
document.getElementById('out').addEventListener('click',function(){{var l=[];document.querySelectorAll('input[type=radio]:checked').forEach(function(i){{l.push(i.name+' = '+i.value)}});var t=document.getElementById('ta');t.hidden=false;t.value=l.join('\\n');t.select();}});
</script></body></html>
"""
    with open(REVIEW, "w", encoding="utf-8", newline="\n") as f:
        f.write(page)


def write_public_js(published, data):
    by_id = {}
    for key, r in sorted(published.items(), key=lambda kv: (kv[1]["heritage"], kv[1]["taken"] or "", kv[0])):
        facility = data[r["heritage"]]["points"][r["point"]]["name"] if len(data[r["heritage"]]["points"]) > 1 and r["point"] is not None else ""
        by_id.setdefault(r["heritage"], []).append({
            "src": f"photos/mine/{key}.jpg", "thumb": f"photos/mine/{key}-thumb.jpg",
            "by": OWNER, "taken": (r["taken"] or "")[:10], "license": LICENSE, "facility": facility, "mine": True,
        })
    lines = ["// ときやどが撮った写真（tools/import_my_photos.py が作る。手で書き換えない）。",
             "// 著作権はときやど。無断転載禁止。画面では Wikimedia Commons などの写真より先に並べる。",
             "const MINE_PHOTOS = {"]
    items = sorted(by_id.items())
    for n, (hid, photos) in enumerate(items):
        body = ",\n".join("    " + json.dumps(p, ensure_ascii=False) for p in photos)
        lines.append(f'  "{hid}": [\n{body}\n  ]' + ("," if n < len(items) - 1 else ""))
    lines.append("};")
    text = "\n".join(lines) + "\n"
    if not os.path.exists(PUBLIC_JS) or open(PUBLIC_JS, encoding="utf-8").read() != text:
        with open(PUBLIC_JS, "w", encoding="utf-8", newline="\n") as f:
            f.write(text)


if __name__ == "__main__":
    sys.exit(main())
