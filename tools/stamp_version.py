"""更新後に古いプログラムと新しいデータが混ざらないよう、index.html に読み込み用の印を付ける。

使い方（サイトのフォルダで実行）:
    python tools/stamp_version.py           # index.html を更新する
    python tools/stamp_version.py --check   # 印が古くないか確かめるだけ（古ければ終了コード 1）

- style.css・app.js・photos.js などの読み込みに、中身の指紋 ?v=xxxxxxxx を付ける。
  中身が変わると URL が変わるので、ブラウザに残った古いファイルは使われない。
- data.json と narratives/ の指紋を <html data-version="..."> に入れる。
  app.js はこの印を付けてデータを読むので、新しい index.html からは必ず新しいデータを読む。
- ファイルを書き換えたら、公開の前にこのスクリプトを実行する（build_narratives.py は自動で実行する）。
"""
import glob
import hashlib
import os
import re
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
INDEX = os.path.join(ROOT, "index.html")
ASSETS = ["leaflet.css", "style.css", "leaflet.js", "photos-mine.js", "photos.js", "app.js"]


def digest(paths):
    h = hashlib.sha256()
    for path in paths:
        h.update(os.path.relpath(path, ROOT).replace("\\", "/").encode())
        with open(path, "rb") as f:
            h.update(f.read())
    return h.hexdigest()[:10]


def stamped(html):
    for name in ASSETS:
        ver = digest([os.path.join(ROOT, name)])
        pattern = r'((?:src|href)=")' + re.escape(name) + r'(?:\?v=[0-9a-f]*)?(")'
        html, n = re.subn(pattern, r"\g<1>" + name + "?v=" + ver + r"\g<2>", html)
        if n != 1:
            raise SystemExit(f"index.html で {name} の読み込みが {n} か所見つかりました（1か所のはず）")
    data_files = [os.path.join(ROOT, "data.json"), os.path.join(ROOT, "designated.json")] + sorted(glob.glob(os.path.join(ROOT, "narratives", "*.json")))
    ver = digest(data_files)
    html, n = re.subn(r'<html lang="ja"(?: data-version="[0-9a-f]*")?>', f'<html lang="ja" data-version="{ver}">', html)
    if n != 1:
        raise SystemExit('index.html の <html lang="ja"> が見つかりません')
    return html


def main():
    with open(INDEX, encoding="utf-8", newline="") as f:   # 改行コードはそのまま保つ
        html = f.read()
    new = stamped(html)
    if "--check" in sys.argv:
        if new != html:
            print("index.html の読み込み用の印が古くなっています。python tools/stamp_version.py を実行してください。")
            return 1
        print("index.html の読み込み用の印は最新です。")
        return 0
    if new != html:
        with open(INDEX, "w", encoding="utf-8", newline="\n") as f:
            f.write(new)
        print("index.html の読み込み用の印を更新しました。")
    else:
        print("index.html の読み込み用の印は最新です。")
    return 0


if __name__ == "__main__":
    sys.exit(main())
