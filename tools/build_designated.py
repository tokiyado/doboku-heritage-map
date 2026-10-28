"""選奨土木遺産には入っていない、国の重要文化財（建造物）のうち土木系のものを designated.json に書き出す。

使い方（サイトのフォルダで実行）:
    python tools/build_designated.py                  # 土木学会の公開マップ（KML）を取得して作る
    python tools/build_designated.py --kml map.kml    # 手元に保存した KML から作る
    python tools/build_designated.py --check          # 照合レポートだけを作り、designated.json は書き換えない

出典: 土木学会の公開マップ（https://dobocolle.jsce.or.jp/digital-map/）の「国宝・重要文化財（建造物）マップ」の層。
  1棟ずつの名称・種別（国宝／重要文化財）・時代・指定年月日・所在地・緯度経度・文化遺産オンラインのURLだけを使う
  （解説文や写真は取り込まない）。

まとめ方:
  1. 1棟ずつの記録を、指定の単位（例「旧碓氷峠鉄道施設」）にまとめる（GROUP_RULES）。
  2. 名称から土木系の単位だけを残す（CIVIL）。蒸溜所・農場・駅舎などの建物は除く（NOT_CIVIL）。
  3. 選奨土木遺産と同じ施設の単位は除く。いずれかの棟が選奨土木遺産の地点から300m以内にある単位を同じ施設とみなし、
     手で確かめた例外を SAME_AS（同じ施設）・NOT_SAME（近いが別の施設）で直す。
  照合の結果は review/designated-report.md（公開しない）に出す。
"""
import argparse
import html
import json
import math
import os
import re
import subprocess
import sys
import urllib.request

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "designated.json")
REPORT = os.path.join(ROOT, "review", "designated-report.md")
DATA = os.path.join(ROOT, "data.json")
KML_URL = "https://www.google.com/maps/d/kml?mid=1J8uktUmdsmBiT32O0V5ePoGcqE6fTu0&forcekml=1"
SOURCE_PAGE = "https://dobocolle.jsce.or.jp/digital-map/"

# 1棟の名称 → 指定の単位の名称（上から順に試す）
GROUP_RULES = [
    re.compile(r"^(.+?灯台)"),                       # 犬吠埼灯台灯台・犬吠埼灯台旧霧笛舎 → 犬吠埼灯台
    re.compile(r"^(.+?及び.+?(?:橋梁|橋))"),         # 大江橋及び淀屋橋淀屋橋 → 大江橋及び淀屋橋
    re.compile(r"^(水準原点)"),
    re.compile(r"^(.+?施設)"),                       # 旧碓氷峠鉄道施設第七橋梁 → 旧碓氷峠鉄道施設
]
CIVIL = re.compile(r"橋|隧道|トンネル|堰堤|ダム|水門|閘門|樋門|水閘|疏水|疎水|水路|用水|運河|防波堤|突堤|港|船渠|ドック|"
                   r"灯台|鉄道|転車台|機関車庫|水道|浄水|配水|砂防|堤防|放水路|発電所|洗堰|サイフォン|取水|溜池|水源地|"
                   r"階段工|干拓|台場|潮流信号|水準原点|洞門|燈台|汚水|下水|喞筒|樋川")
# 名称に土木の語を含むが、土木構造物とは言いにくい単位
NOT_CIVIL = {"門司港駅(旧門司駅)本屋", "旧佐渡鉱山採鉱施設", "日本煉瓦製造株式会社旧煉瓦製造施設", "東京駅丸ノ内本屋",
             "旧菅島燈台付属官舎倉庫", "旧菅島燈台付属官舎主屋", "旧大社駅本屋"}
# 選奨土木遺産と同じ施設（300m より離れているが、手で確かめて同じと判断したもの）→ 選奨土木遺産のID
SAME_AS = {
    "角島灯台": "2009_18",
    "本河内水源地水道施設": "2007_22",
    "三国港（旧阪井港）突堤": "2004_10",
}
# 300m 以内に選奨土木遺産の地点があるが、別の施設（手で確かめたもの）
NOT_SAME = {"那須疏水旧取水施設", "常願寺川砂防施設"}

CATEGORY_RULES = [  # 単位の名称 → 分類（土木遺産アトラスの分類にそろえる）
    (re.compile(r"鉄道施設|転車台|機関車庫"), "鉄道・隧道"),
    (re.compile(r"橋"), "橋梁"),
    (re.compile(r"灯台|燈台|港|船渠|ドック|突堤|台場|潮流信号"), "港湾・灯台"),
    (re.compile(r"発電所|溜池|豊稔池|ダム"), "ダム・発電"),
    (re.compile(r"砂防|階段工|水門|干拓|堤防|放水路|分流"), "治水・砂防"),
    (re.compile(r"水道|水源地|疏水|疎水|用水|運河|閘門|水閘|取水|配水|浄水|水路|汚水|下水|喞筒|樋川"), "水道・水路"),
    (re.compile(r"隧道|トンネル|洞門"), "鉄道・隧道"),
]
PREF = re.compile(r"^(北海道|東京都|京都府|大阪府|.{2,3}県)")


def distance_m(a_lat, a_lng, b_lat, b_lng):
    r = math.radians
    h = math.sin(r(b_lat - a_lat) / 2) ** 2 + math.cos(r(a_lat)) * math.cos(r(b_lat)) * math.sin(r(b_lng - a_lng) / 2) ** 2
    return 2 * 6371000 * math.asin(math.sqrt(h))


def group_of(name):
    for rule in GROUP_RULES:
        m = rule.match(name)
        if m:
            return m.group(1)
    return name


def date_text(value):
    """20011114 / 2.0011114E7 → 2001年11月14日"""
    digits = re.sub(r"\D", "", str(int(float(value)))) if value else ""
    if len(digits) != 8:
        return ""
    return f"{int(digits[:4])}年{int(digits[4:6])}月{int(digits[6:])}日"


def read_kml(text):
    folders = re.findall(r"<Folder>\s*<name>(.*?)</name>(.*?)</Folder>", text, re.S)
    body = [b for n, b in folders if "重要文化財" in n]
    if len(body) != 1:
        raise SystemExit("KML に「国宝・重要文化財（建造物）マップ」の層が見つかりません")
    items = []
    for pm in re.findall(r"<Placemark>.*?</Placemark>", body[0], re.S):
        def value(name):
            m = re.search(r'<Data name="%s">\s*<value>(.*?)</value>' % re.escape(name), pm, re.S)
            return html.unescape(m.group(1)).strip() if m else ""
        name = html.unescape(re.search(r"<name>(.*?)</name>", pm, re.S).group(1)).strip()
        lng, lat = map(float, re.search(r"<coordinates>\s*([-\d.]+),([-\d.]+)", pm).groups())
        url = value("文化遺産オンライン")
        items.append({
            "name": name, "kml_id": value("管理対象ID").replace(".0", ""), "kind": value("種別"),
            "era": value("時代"), "designated": date_text(value("重文指定年月日")),
            "treasure": date_text(value("国宝指定年月日")), "location": value("所在地"),
            "lat": lat, "lng": lng, "url": url if url.startswith("https://") else "",
        })
    return items


def main():
    ap = argparse.ArgumentParser(description="国の重要文化財（土木系）を designated.json に書き出す")
    ap.add_argument("--kml", help="手元に保存した KML（省略すると土木学会の公開マップから取得）")
    ap.add_argument("--check", action="store_true", help="照合レポートだけを作る")
    args = ap.parse_args()

    if args.kml:
        with open(args.kml, encoding="utf-8") as f:
            text = f.read()
    else:
        req = urllib.request.Request(KML_URL, headers={"User-Agent": "doboku-heritage-map (https://github.com/tokiyado)"})
        text = urllib.request.urlopen(req, timeout=60).read().decode("utf-8")
    items = read_kml(text)

    with open(DATA, encoding="utf-8") as f:
        data = json.load(f)
    names = {r["id"]: r["name"] for r in data}
    region_of = {p: r["region"] for r in data for p in r["prefectures"]}
    points = [(r["id"], p["lat"], p["lng"]) for r in data for p in r["points"]]

    groups = {}
    for it in items:
        groups.setdefault(group_of(it["name"]), []).append(it)

    kept, same, not_civil = [], [], []
    for gname, members in groups.items():
        if gname in NOT_CIVIL or not any(CIVIL.search(m["name"]) for m in members):
            not_civil.append((gname, members))
            continue
        near = None
        for m in members:
            for hid, lat, lng in points:
                d = distance_m(m["lat"], m["lng"], lat, lng)
                if d <= 300 and (near is None or d < near[1]):
                    near = (hid, d)
        if gname in SAME_AS:
            same.append((gname, members, SAME_AS[gname], "手で確認"))
        elif near and gname not in NOT_SAME:
            same.append((gname, members, near[0], f"{round(near[1])}m"))
        else:
            kept.append((gname, members))

    records = []
    for gname, members in sorted(kept, key=lambda g: g[1][0]["kml_id"].zfill(8)):
        category = next((c for rule, c in CATEGORY_RULES if rule.search(gname)), "その他")
        locations = list(dict.fromkeys(m["location"] for m in members if m["location"]))
        prefs = list(dict.fromkeys(PREF.match(l).group(1) for l in locations if PREF.match(l)))
        kind = "国宝" if any(m["kind"] == "国宝" for m in members) else "重要文化財"
        dates = sorted({m["designated"] for m in members if m["designated"]}, key=lambda s: [int(x) for x in re.findall(r"\d+", s)])
        records.append({
            "id": "jd-" + members[0]["kml_id"],
            "type": "designated",
            "name": gname,
            "kind": kind,
            "designated": dates[0] if dates else "",
            "treasure": next((m["treasure"] for m in members if m["treasure"]), ""),
            "built": "・".join(dict.fromkeys(m["era"] for m in members if m["era"])),
            "location": "、".join(locations[:2]) + ("ほか" if len(locations) > 2 else ""),
            "prefectures": prefs,
            "region": region_of.get(prefs[0], "") if prefs else "",
            "category": category,
            "url": members[0]["url"],
            "points": [{"name": m["name"], "lat": m["lat"], "lng": m["lng"], "url": m["url"], "source": SOURCE_PAGE}
                       for m in sorted(members, key=lambda m: m["kml_id"].zfill(8))],
        })

    os.makedirs(os.path.dirname(REPORT), exist_ok=True)
    lines = ["# 国の重要文化財（土木系）の照合レポート（公開しないファイル）", "",
             f"- KML の棟数: {len(items)}（指定の単位 {len(groups)}）",
             f"- 載せる単位: {len(records)}（{sum(len(r['points']) for r in records)} 棟）",
             f"- 選奨土木遺産と同じ施設として除いた単位: {len(same)}",
             f"- 土木系ではないとして除いた単位: {len(not_civil)}", "",
             "## 載せる単位", ""]
    lines += [f"- {r['id']} {r['name']}（{r['kind']}・{r['category']}・{len(r['points'])}棟）{r['location']}" for r in records]
    lines += ["", "## 選奨土木遺産と同じ施設として除いた単位", ""]
    lines += [f"- {g}（{len(ms)}棟）→ {hid} {names[hid]}（{why}）" for g, ms, hid, why in same]
    lines += ["", "## 土木系ではないとして除いた単位", ""]
    lines += [f"- {g}（{len(ms)}棟）" for g, ms in not_civil]
    with open(REPORT, "w", encoding="utf-8", newline="\n") as f:
        f.write("\n".join(lines) + "\n")
    print(f"載せる単位 {len(records)}（{sum(len(r['points']) for r in records)} 棟）・同じ施設として除外 {len(same)}・土木系以外 {len(not_civil)}")
    print(f"照合レポート: {os.path.relpath(REPORT, ROOT)}")
    if args.check:
        return 0
    text = "[\n" + ",\n".join(json.dumps(r, ensure_ascii=False, separators=(",", ":")) for r in records) + "\n]\n"
    if not os.path.exists(OUT) or open(OUT, encoding="utf-8").read() != text:
        with open(OUT, "w", encoding="utf-8", newline="\n") as f:
            f.write(text)
        print("designated.json を更新しました。")
    return subprocess.call([sys.executable, "-X", "utf8", os.path.join(ROOT, "tools", "stamp_version.py")])


if __name__ == "__main__":
    sys.exit(main())
