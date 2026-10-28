'use strict';

/* ---------- 設定 ---------- */

const CATEGORY_COLORS = {
  'すべて': '#142b37',
  '橋梁': '#bd613e',
  'ダム・発電': '#377c98',
  '水道・水路': '#368d86',
  '治水・砂防': '#9a8440',
  '鉄道・隧道': '#83709b',
  '港湾・灯台': '#6187a7',
  'その他': '#7a858b'
};

// 同梱している写真の一覧（LOCAL_PHOTOS）は photos.js にある。土木学会の写真は掲載せず、公式ページへリンクする。
// ときやどが撮った写真（photos-mine.js、tools/import_my_photos.py が作る）を先に、その後に Wikimedia Commons などの写真を並べる
const photosOf = id => [
  ...((typeof MINE_PHOTOS === 'object' && MINE_PHOTOS[id]) || []),
  ...((typeof LOCAL_PHOTOS === 'object' && LOCAL_PHOTOS[id]) || [])
];

const DESCRIPTIONS = {
  '2000_4': '東京湾の防衛を担った要塞。明治期の煉瓦構造を間近に見られる遺構です。',
  '2001_10': '明治期の港湾整備を伝える三角西港。石積みの岸壁が、港の歴史を今に伝えています。',
  '2000_1': '廣井勇が築港に携わった小樽港の防波堤。日本の近代港湾技術を伝える施設です。'
};

// 周辺地形ビュー（3D）に対応している遺産
const PILOTS_3D = {
  '2000_4': {
    form: '煉瓦造（フランス積み）・石造擁壁',
    source: 'https://www.jsce.or.jp/branch/kanto/04_isan/isan_2.html',
    zoom: 15.7, pitch: 67, bearing: -28,
    highlight: '島の起伏と東京湾内での位置関係に注目'
  },
  '2001_10': {
    form: '安山岩の切石積み岸壁',
    source: 'https://committees.jsce.or.jp/heritage/node/205',
    zoom: 15.9, pitch: 64, bearing: 32,
    highlight: '石積み岸壁と背後の山地・海岸線の関係に注目'
  },
  '2000_1': {
    form: 'コンクリート方塊の傾斜積み防波堤',
    source: 'https://committees.jsce.or.jp/heritage/node/148',
    zoom: 14.9, pitch: 61, bearing: -42,
    highlight: '防波堤の延長と小樽港全体の配置に注目'
  }
};

const MAPLIBRE_BASE = 'https://unpkg.com/maplibre-gl@5.24.0/dist/maplibre-gl';
const PAGE_SIZE = 30;
const VIEWER_ERROR_NETWORK = '3D地図を読み込めませんでした。通信環境を確認して、もう一度お試しください。';
const VIEWER_ERROR_WEBGL = 'このブラウザでは3D描画（WebGL）を開始できませんでした。WebGL対応のブラウザでお試しください。解説は引き続き確認できます。';

/* ---------- 状態 ---------- */

let records = [];
let filtered = [];
let category = 'すべて';
let selectedIds = [];
let limit = PAGE_SIZE;
let detailId = null; // 詳細を開いている遺産
let listMode = 'all'; // 'all' = 条件に合う全件／'view' = この地図の範囲
let origin = null; // 現在地（ボタンを押して取れたときだけ）。{lat, lng, at: 取得した時刻, stale: 取り直しに失敗したか}
let locateLayer = null;
let distances = new Map(); // 遺産ID → 基点から最も近い地点までの直線距離（km）
let selectedRowId = null; // 最後に詳細を開いた遺産（一覧の行に印を付ける）
let listReturn = null; // 一覧から詳細を開いたときの一覧の位置 {id, scroll}

let map = null;
let markers = null;
let tileErrors = 0;
// 利用者が地図を動かすまでは、枠のサイズが変わるたびにこの関数で表示範囲を合わせ直す
let autoFit = null;

let maplibrePromise = null;
let viewerMap = null;
let viewerRecord = null;
let viewerLoadTimer = null;
let viewerPhotoUrl = '';
let orbitTimer = null;
let photoView = null;
let photoMarker = null;

/* ---------- 共通 ---------- */

const $ = id => document.getElementById(id);

const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
}[c]));

const norm = s => String(s).normalize('NFKC').toLowerCase().replace(/\s/g, '');

const color = r => CATEGORY_COLORS[r.category] || CATEGORY_COLORS['その他'];

// 国の重要文化財（土木系）で、選奨土木遺産ではないもの（designated.json、tools/build_designated.py が作る）
const isDesignated = r => r.type === 'designated';
const isSelected = r => !isDesignated(r);

function urlWithParam(key, value) {
  const url = new URL(location.href);
  if (value) url.searchParams.set(key, value);
  else url.searchParams.delete(key);
  return url;
}

// 履歴の状態（詳細を開いているかどうか）は保ったまま、URL の値だけを書き換える
function setUrlParam(key, value) {
  history.replaceState(history.state, '', urlWithParam(key, value));
}

// index.html の data-version（tools/stamp_version.py が付ける）をデータの URL に付ける。
// 新しい index.html からは必ず新しいデータを読み、古いデータがブラウザに残っていても使わない
const DATA_VERSION = document.documentElement.dataset.version || '';
const withVersion = path => DATA_VERSION ? `${path}?v=${DATA_VERSION}` : path;

/* ---------- 絞り込み ---------- */

function matches(r, includeScope = true) {
  const q = norm($('search').value);
  const text = [r.name, r.reading, r.location, ...r.prefectures, ...r.points.map(p => p.name)].join(' ');
  return (!q || norm(text).includes(q))
    && (!isDesignated(r) || $('show-designated').checked)
    && (!$('region').value || r.region === $('region').value)
    && (!$('prefecture').value || r.prefectures.includes($('prefecture').value))
    && (!$('year').value || r.year === Number($('year').value))
    && (category === 'すべて' || r.category === category)
    && (!includeScope || !selectedIds.length || selectedIds.includes(r.id));
}

function hasFilter() {
  return category !== 'すべて' || selectedIds.length > 0 || !$('show-designated').checked
    || Boolean($('region').value || $('prefecture').value || $('year').value || $('search').value);
}

/* ---------- 距離（直線） ---------- */

function distanceKm(a, b) {
  const rad = x => x * Math.PI / 180;
  const dLat = rad(b.lat - a.lat);
  const dLng = rad(b.lng - a.lng);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(rad(a.lat)) * Math.cos(rad(b.lat)) * Math.sin(dLng / 2) ** 2;
  return 2 * 6371 * Math.asin(Math.sqrt(h));
}

// 複数の地点がある遺産は、いちばん近い地点までの距離を使う
const nearestKm = (r, from) => Math.min(...r.points.map(p => distanceKm(from, p)));

// 道路の距離と取り違えないよう、必ず「直線」と書く
function formatDistance(km) {
  if (km < 1) return `直線 約${Math.max(10, Math.round(km * 100) * 10)}m`;
  if (km < 10) return `直線 約${km.toFixed(1)}km`;
  return `直線 約${Math.round(km).toLocaleString()}km`;
}

/* ---------- 一覧 ---------- */

function thumbHTML(r) {
  const local = photosOf(r.id)[0];
  if (local) return `<img src="${esc(local.thumb)}" alt="" loading="lazy" decoding="async">`;
  return `<span class="record-tile" style="--cat:${color(r)}" aria-hidden="true">${esc(r.category.charAt(0))}</span>`;
}

function recordHTML(r) {
  const selected = r.id === selectedRowId ? ' is-selected' : '';
  return `<button class="record${selected}" data-id="${esc(r.id)}" aria-label="${esc(r.name)}の詳細"${selected ? ' aria-current="true"' : ''}>
    <span class="record-image">${thumbHTML(r)}</span>
    <span class="record-text">
      <span class="record-top">
        <span class="record-category" style="--cat:${color(r)}">${esc(r.category)}</span>
        ${isDesignated(r) ? `<span class="record-kind">${esc(r.kind)}</span>` : `<span class="record-year">${r.year}</span>`}
      </span>
      <h3>${esc(r.name)}</h3>
      <span class="record-location">${esc(r.location)}</span>
      ${distances.has(r.id) && origin ? `<span class="record-distance">${formatDistance(distances.get(r.id))}</span>` : ''}
      ${r.points.length > 1 ? `<span class="point-count">${r.points.length}地点の遺産</span>` : ''}
      ${narrativeIds.has(r.id) && narrativeIds.size < records.filter(isSelected).length ? '<span class="narrative-label">紹介文</span>' : ''}
      ${PILOTS_3D[r.id] ? '<span class="pilot-label">地形ビュー</span>' : ''}
    </span>
  </button>`;
}

// 一覧に出す遺産を決める。絞り込みの条件はどちらの一覧にも同じように効く
function listRows() {
  let rows = records.filter(r => matches(r));
  const view = listMode === 'view' && map;
  if (view) {
    const bounds = map.getBounds();
    rows = rows.filter(r => r.points.some(p => bounds.contains([p.lat, p.lng])));
  }
  distances = new Map();
  // 基点：現在地があれば現在地、無ければ「この地図の範囲」では地図の中心
  const base = origin || (view ? map.getCenter() : null);
  if (base) {
    rows.forEach(r => distances.set(r.id, nearestKm(r, base)));
    rows.sort((a, b) => distances.get(a.id) - distances.get(b.id));
  }
  return rows;
}

function renderListNote() {
  const notes = [];
  if (origin && origin.stale) {
    notes.push(`前回取得した現在地（${originTime()}時点）から近い順（直線距離）。現在地を更新できなかったため、この位置のままです<button type="button" id="clear-origin" class="note-btn">現在地の基準を解除</button>`);
  } else if (origin) {
    notes.push('現在地から近い順（直線距離）<button type="button" id="clear-origin" class="note-btn">現在地を解除</button>');
  }
  else if (listMode === 'view') notes.push('地図の中心に近い順。地図を動かすと一覧も変わります');
  $('list-note').hidden = !notes.length;
  $('list-note').innerHTML = notes.join('');
  $('clear-origin')?.addEventListener('click', clearOrigin);
  $('mode-all').setAttribute('aria-pressed', String(listMode === 'all'));
  $('mode-view').setAttribute('aria-pressed', String(listMode === 'view'));
  $('mode-view').disabled = !map;
}

function renderList() {
  filtered = listRows();
  $('result-count').textContent = filtered.length;
  const designatedCount = filtered.filter(isDesignated).length;
  $('result-unit').textContent = (listMode === 'view' ? ' 件（この地図の範囲）' : ' 件')
    + (designatedCount ? `（うち国の重要文化財 ${designatedCount}件）` : (listMode === 'view' ? '' : 'の土木遺産'));
  renderListNote();
  $('reset').hidden = !hasFilter();

  $('scope').hidden = !selectedIds.length;
  $('scope').innerHTML = selectedIds.length
    ? `<span>選択した地点の遺産 · ${filtered.length}件</span><button id="clear-scope" aria-label="地点選択を解除">×</button>`
    : '';
  $('clear-scope')?.addEventListener('click', () => { selectedIds = []; update(); });

  if (filtered.length) {
    const rest = filtered.length - limit;
    $('results').innerHTML = filtered.slice(0, limit).map(recordHTML).join('')
      + (rest > 0 ? `<button class="more" id="more">さらに${Math.min(PAGE_SIZE, rest)}件を見る</button>` : '');
  } else {
    $('results').innerHTML = listMode === 'view'
      ? '<p class="empty">この地図の範囲に、条件に合う遺産はありません。<br>地図を縮小して広げるか、<button type="button" class="linkish" id="empty-all">条件に合う全件</button>に切り替えてください。</p>'
      : '<p class="empty">条件に一致する遺産がありません。<br>地名や絞り込み条件を変えてお試しください。</p>';
    $('empty-all')?.addEventListener('click', () => setListMode('all'));
  }
  $('results').querySelectorAll('[data-id]').forEach(el => {
    el.addEventListener('click', () => {
      const back = { id: el.dataset.id, scroll: $('results').scrollTop };
      showDetail(el.dataset.id);
      listReturn = back;
    });
  });
  $('more')?.addEventListener('click', () => {
    const scroll = $('results').scrollTop;
    limit += PAGE_SIZE;
    renderList();
    $('results').scrollTop = scroll;
  });

  document.querySelectorAll('.category').forEach(b => {
    const active = b.dataset.cat === category;
    b.classList.toggle('active', active);
    b.setAttribute('aria-pressed', String(active));
  });

  const points = records.filter(r => matches(r, false)).reduce((n, r) => n + r.points.length, 0);
  $('point-total').textContent = points + '地点';
}

/* ---------- 地図 ---------- */

// 画面上で近い地点をまとめて、数字つきの丸で表示する
function renderMap() {
  if (!map) return;
  markers.clearLayers();

  const buckets = [];
  records.filter(r => matches(r, false)).forEach(r => r.points.forEach((p, index) => {
    const pos = map.latLngToLayerPoint([p.lat, p.lng]);
    const item = { r, p, index };
    const near = buckets.find(b => Math.hypot(pos.x - b.pos.x, pos.y - b.pos.y) < 42);
    if (near) near.items.push(item);
    else buckets.push({ pos, items: [item] });
  }));

  buckets.forEach(b => {
    const n = b.items.length;
    const ids = [...new Set(b.items.map(i => i.r.id))];
    const single = n === 1;
    const first = b.items[0];
    const center = b.items.reduce((a, i) => [a[0] + i.p.lat / n, a[1] + i.p.lng / n], [0, 0]);
    const size = single ? 24 : n > 30 ? 48 : 38;
    const selected = ids.some(id => selectedIds.includes(id)) ? 'selected' : '';
    const title = single ? first.p.name : `${n}地点・${ids.length}件の遺産`;
    const html = single
      ? `<span class="site-dot ${selected} ${isDesignated(first.r) ? 'designated' : ''}" style="--cat:${color(first.r)}"></span>`
      : `<span class="cluster-bubble ${n > 30 ? 'large' : ''} ${selected}">${n}</span>`;

    const marker = L.marker(center, {
      icon: L.divIcon({ className: 'cluster-marker', html, iconSize: [size, size], iconAnchor: [size / 2, size / 2] }),
      title,
      keyboard: true
    });
    marker.bindTooltip(esc(title), { direction: 'top', offset: [0, -size / 2] });
    marker.on('click', () => {
      if (single) { showDetail(first.r.id, first.index); return; }
      selectedIds = ids;
      limit = PAGE_SIZE;
      renderList();
      autoFit = null;
      map.fitBounds(b.items.map(i => [i.p.lat, i.p.lng]), { padding: [65, 65], maxZoom: 18, animate: false });
      renderMap();
      $('results').scrollTop = 0;
    });
    marker.addTo(markers);
  });
}

function fitNational() {
  if (!map) return;
  autoFit = fitNational;
  const mobile = innerWidth <= 760;
  map.fitBounds([[21.8, 119.8], [45.5, 145.6]], {
    paddingTopLeft: mobile ? [45, 65] : [90, 140],
    paddingBottomRight: mobile ? [35, 28] : [65, 70],
    animate: false
  });
}

// 開いたときの表示：全国表示から1段階近づけ、本州を中心に置く（「全国を表示」ボタンは全国表示のまま）
function fitOpening() {
  if (!map) return;
  fitNational();
  autoFit = fitOpening;
  map.setView([36.9, 136.2], map.getZoom() + 1, { animate: false });
}

function fitFiltered() {
  if (!map) return;
  const coords = records.filter(r => matches(r)).flatMap(r => r.points.map(p => [p.lat, p.lng]));
  if (!coords.length) return;
  autoFit = fitFiltered;
  map.fitBounds(coords, { padding: [65, 65], maxZoom: 15, animate: false });
}

function initMap() {
  if (typeof L === 'undefined') { $('map-error').hidden = false; return; }

  map = L.map('map', { zoomControl: false, minZoom: 3, maxZoom: 18, zoomSnap: .25, scrollWheelZoom: true, attributionControl: true });
  L.tileLayer('https://cyberjapandata.gsi.go.jp/xyz/pale/{z}/{x}/{y}.png', {
    attribution: '<a href="https://maps.gsi.go.jp/development/ichiran.html" target="_blank" rel="noopener">地理院タイル</a>',
    maxZoom: 18
  })
    .on('tileerror', () => { tileErrors++; if (tileErrors > 8) $('map-error').hidden = false; })
    .on('tileload', () => { $('map-error').hidden = true; tileErrors = 0; })
    .addTo(map);
  markers = L.layerGroup().addTo(map);

  fitOpening();
  map.on('zoomend', renderMap);
  // 地図を拡大すると、見出し（全体のメッセージ）は地図の文字と重なって読みにくいので、そっと消す
  const toggleHeading = () => document.querySelector('.map-surface').classList.toggle('is-zoomed', map.getZoom() >= 7);
  map.on('zoomend', toggleHeading);
  toggleHeading();
  map.on('moveend', onMapMoved);

  // 利用者が自分で地図を動かしたら、自動の合わせ直しをやめる
  ['pointerdown', 'wheel', 'keydown'].forEach(type => {
    $('map').addEventListener(type, () => { autoFit = null; }, { passive: true });
  });
  new ResizeObserver(() => {
    map.invalidateSize({ animate: false });
    autoFit?.();
  }).observe($('map'));
}

function update() {
  limit = PAGE_SIZE;
  renderList();
  renderMap();
  $('results').scrollTop = 0;
}

function reset() {
  category = 'すべて';
  selectedIds = [];
  $('search').value = '';
  $('region').value = '';
  $('prefecture').value = '';
  $('year').value = '';
  $('show-designated').checked = true;
  $('stat-designated').classList.remove('is-off');
  setUrlParam('q', '');
  update();
  fitNational();
}

/* ---------- 紹介文 ---------- */

// 紹介文は data.json とは別に narratives/ に置く（tools/build_narratives.py が作る公開用の部分だけ）。
// 一覧（index.json）を最初に読み、本文は詳細を開いたときに1件ずつ読む。読めなくても詳細は従来どおり出す
let narrativeIndex = null;
let narrativeIds = new Set(); // 紹介文がある遺産（一覧の印に使う）
let narrativeVersions = new Map(); // 遺産ID → その紹介文の版（index.json）。1件のファイルと同じ版かを確かめる
const narrativeCache = new Map(); // 遺産ID → 読み込み中または読み込んだ紹介文（Promise）。同じ原稿を二重に読まない

function loadNarrativeIndex() {
  if (!narrativeIndex) {
    narrativeIndex = fetch(withVersion('narratives/index.json'))
      .then(res => { if (!res.ok) throw Error('narratives index'); return res.json(); })
      .then(doc => {
        narrativeVersions = new Map(Object.entries(doc.items || {}));
        narrativeIds = new Set(narrativeVersions.keys());
        return narrativeIds;
      })
      .catch(error => {
        console.warn('紹介文の一覧を読み込めませんでした', error);
        narrativeIndex = null; // 次に詳細を開いたときにもう一度試す
        throw error;
      });
  }
  return narrativeIndex;
}

// 開いたままの古い画面がサイトの更新後に読んだときなど、一覧と1件のファイルの版が合わないことを示す
function staleError(message) {
  const error = Error(message);
  error.stale = true;
  return error;
}

async function fetchNarrative(id) {
  // 版を URL に付けるので、原稿が更新されたときだけ読み直し、同じ版はブラウザに残ったものを使える
  const res = await fetch(`narratives/${encodeURIComponent(id)}.json?v=${encodeURIComponent(narrativeVersions.get(id))}`);
  if (res.status === 404) throw staleError('narrative removed ' + id);
  if (!res.ok) throw Error('narrative ' + id);
  const doc = await res.json();
  if (doc.id !== id) throw Error('narrative id mismatch ' + id);
  if ((doc.build || '') !== narrativeVersions.get(id)) throw staleError('narrative build mismatch ' + id);
  return doc;
}

async function loadNarrative(id) {
  const ids = await loadNarrativeIndex();
  if (!ids.has(id)) return null;
  if (!narrativeCache.has(id)) {
    // 読み込み中のものも覚えておき、続けて開いても二重に読まない。失敗したら忘れて、再試行できるようにする
    const pending = fetchNarrative(id);
    narrativeCache.set(id, pending);
    pending.catch(() => narrativeCache.delete(id));
  }
  return narrativeCache.get(id);
}

// 出典番号のボタン。押すとその遺産の出典一覧の該当箇所へ移る（番号はこの遺産の中だけで通用する）
function refsHTML(n, refs) {
  if (!refs || !refs.length) return '';
  const known = new Set(n.sources.map(s => s.number));
  return `<span class="refs">${refs.map(num => known.has(num)
    ? `<button type="button" class="ref" data-ref="${Number(num)}" aria-label="出典${Number(num)}へ移動">${Number(num)}</button>`
    : `<span class="ref">${esc(num)}</span>`).join('')}</span>`;
}

// 出典のリンクは http(s) の URL だけにする（それ以外は資料名だけを文字で出す）
function safeUrl(url) {
  try {
    const u = new URL(String(url));
    return u.protocol === 'https:' || u.protocol === 'http:' ? u.href : '';
  } catch (_) {
    return '';
  }
}

function sourceHTML(rid, s) {
  const meta = [s.publisher, s.section, s.published != null && s.published !== '' ? `${s.published}` : '', s.accessed ? `${s.accessed} 閲覧` : '']
    .filter(Boolean).map(esc).join(' ／ ');
  const url = safeUrl(s.url);
  return `<li id="nsrc-${esc(rid)}-${Number(s.number)}" class="nsource" tabindex="-1">
    <span class="nsource-num">${Number(s.number)}</span>
    <span class="nsource-text">
      ${url ? `<a href="${esc(url)}" target="_blank" rel="noopener">${esc(s.title)} ↗</a>` : `<span>${esc(s.title)}</span>`}
      ${meta ? `<small>${meta}</small>` : ''}
      <button type="button" class="nsource-back" hidden>本文に戻る ↑</button>
    </span>
  </li>`;
}

function narrativeLeadHTML(n) {
  return `<span class="eyebrow">紹介</span>
    <h3 class="narrative-title">${esc(n.title)}</h3>
    <p class="narrative-intro">${esc(n.intro)}${refsHTML(n, n.intro_source_refs)}</p>`;
}

function narrativeBodyHTML(rid, n) {
  return `<div class="narrative-body">
      ${n.paragraphs.map(p => `<p>${esc(p.text)}${refsHTML(n, p.source_refs)}</p>`).join('')}
    </div>
    ${n.highlights.length ? `<h4 class="narrative-heading">現地で注目したい点</h4>
      <ul class="narrative-highlights">${n.highlights.map(h => `<li>${esc(h.text)}${refsHTML(n, h.source_refs)}</li>`).join('')}</ul>` : ''}
    ${n.people.length ? `<h4 class="narrative-heading">関係者と役割</h4>
      <dl class="narrative-people">${n.people.map(p => `<div><dt>${esc(p.name)}</dt><dd>${esc(p.role)}${refsHTML(n, p.source_refs)}</dd></div>`).join('')}</dl>` : ''}
    <details class="narrative-sources" id="nsources-${esc(rid)}">
      <summary>出典 <span>${n.sources.length}件</span></summary>
      <ol>${n.sources.map(s => sourceHTML(rid, s)).join('')}</ol>
    </details>
    <p class="narrative-note">紹介文は公開資料をもとに当サイトが独自に書いたものです。番号を押すと出典に移ります。見学できる範囲は、訪問前に管理者の案内でご確認ください。</p>`;
}

function bindNarrativeRefs(rid, root) {
  const sources = root.querySelector('.narrative-sources');
  let lastRef = null;
  root.querySelectorAll('button.ref').forEach(button => {
    button.addEventListener('click', () => {
      // id はこの遺産の番号だけを持つので、別の遺産の出典に飛ぶことはない
      const target = root.querySelector(`#nsrc-${CSS.escape(rid)}-${Number(button.dataset.ref)}`);
      if (!target) return;
      lastRef = button;
      sources.open = true;
      root.querySelectorAll('.nsource.is-target').forEach(el => el.classList.remove('is-target'));
      root.querySelectorAll('.nsource-back').forEach(b => { b.hidden = true; });
      target.classList.add('is-target');
      target.querySelector('.nsource-back').hidden = false;
      target.scrollIntoView({ block: 'center' });
      target.focus({ preventScroll: true });
    });
  });
  root.querySelectorAll('.nsource-back').forEach(back => {
    back.addEventListener('click', () => {
      if (!lastRef) return;
      lastRef.scrollIntoView({ block: 'center' });
      lastRef.focus({ preventScroll: true });
    });
  });
}

async function fillNarrative(r) {
  const lead = $('narrative-lead');
  const body = $('narrative-main');
  let n = null;
  try {
    n = await loadNarrative(r.id);
  } catch (error) {
    console.warn(error);
    if (detailId !== r.id) return;
    lead.hidden = false;
    if (error.stale) {
      // 版の違う紹介文を混ぜて出さない
      lead.innerHTML = '<p class="narrative-error">このサイトが更新されています。ページを再読み込みすると、最新の紹介文を表示できます。<button type="button" class="linkish" id="narrative-reload">再読み込み</button></p>';
      $('narrative-reload').addEventListener('click', () => location.reload());
      return;
    }
    // 読めないときは、従来の表示のまま小さく知らせる（写真・地図・リンクはそのまま使える）
    lead.innerHTML = '<p class="narrative-error">紹介文を読み込めませんでした。通信の状態を確かめてください。<button type="button" class="linkish" id="narrative-retry">もう一度読み込む</button></p>';
    $('narrative-retry').addEventListener('click', () => { lead.innerHTML = ''; fillNarrative(r); });
    return;
  }
  if (detailId !== r.id) return; // 読み込み中に別の遺産を開いた
  if (!n) { lead.hidden = true; lead.innerHTML = ''; return; }
  lead.hidden = false;
  lead.innerHTML = narrativeLeadHTML(n);
  body.hidden = false;
  body.innerHTML = narrativeBodyHTML(r.id, n);
  $('detail-description')?.remove(); // 紹介文があるときは短い説明文は出さない
  bindNarrativeRefs(r.id, $('detail-content'));
}

/* ---------- 共有 ---------- */

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (_) {
    // 古いブラウザや http で開いているとき
    const area = document.createElement('textarea');
    area.value = text;
    area.setAttribute('readonly', '');
    area.style.position = 'fixed';
    area.style.opacity = '0';
    $('detail').append(area);
    area.select();
    let ok = false;
    try { ok = document.execCommand('copy'); } catch (_) { ok = false; }
    area.remove();
    return ok;
  }
}

function detailUrl(id) {
  const url = new URL(location.pathname, location.origin);
  url.searchParams.set('id', id);
  return url.href;
}

/* ---------- 詳細 ---------- */

function licenseLabel(p) {
  return p.license === 'Public domain' ? 'パブリックドメイン' : p.license;
}

function photoCredit(p) {
  const license = p.licenseUrl
    ? `<a href="${esc(p.licenseUrl)}" target="_blank" rel="noopener">${esc(licenseLabel(p))}</a>`
    : esc(licenseLabel(p));
  // 自分の写真は出典ページが無いので、撮影者と撮影日だけを文字で出す
  const by = p.source
    ? `<a href="${esc(p.source)}" target="_blank" rel="noopener">${esc(p.by)}</a>`
    : esc(p.by) + (p.taken ? `（${esc(p.taken)} 撮影）` : '');
  return `${p.facility ? `<span class="photo-facility">${esc(p.facility)}</span>` : ''}`
    + `${esc(p.creditLabel || '写真')}：${by} / ${license}`;
}

function photoAlt(r, p) {
  return p.facility ? `${r.name}（${p.facility}）` : r.name;
}

function detailPhotoHTML(r) {
  const photos = photosOf(r.id);
  const local = photos[0];
  if (!local && isDesignated(r)) {
    return `<div class="detail-nophoto" style="--cat:${color(r)}">
      <span>写真は文化遺産オンライン（文化庁）でご覧ください。</span>
      ${r.url ? `<a href="${esc(r.url)}" target="_blank" rel="noopener">文化遺産オンラインで見る ↗</a>` : ''}
    </div>`;
  }
  if (!local) {
    return `<div class="detail-nophoto" style="--cat:${color(r)}">
      <span>このサイトでは土木学会の写真を掲載していません。</span>
      <a href="${esc(r.url)}" target="_blank" rel="noopener">公式ページで写真を見る ↗</a>
    </div>`;
  }
  return `<div class="detail-photo-wrap">
      <img id="detail-photo-main" class="detail-photo" src="${esc(local.src)}" alt="${esc(photoAlt(r, local))}" decoding="async">
      <button id="expand-photo" class="expand-photo">写真を拡大 ↗</button>
    </div>
    <p id="detail-photo-credit" class="photo-credit">${photoCredit(local)}</p>
    ${photos.length > 1 ? `<div class="photo-strip" aria-label="写真を切り替える">${photos.map((p, i) => `<button data-photo="${i}" aria-pressed="${i === 0}" aria-label="写真${i + 1}${p.facility ? `（${esc(p.facility)}）` : ''}を表示"><img src="${esc(p.thumb)}" alt="" loading="lazy" decoding="async"></button>`).join('')}</div>` : ''}`;
}

function pointRowHTML(r, p, i, current) {
  return `<div class="point-row ${current ? 'current' : ''}">
    <strong>${r.points.length > 1 ? `${i + 1}. ` : ''}${esc(p.name)}</strong>
    <div>
      <button data-point="${i}">地図で見る</button>
      <a href="https://www.google.com/maps/search/?api=1&query=${p.lat},${p.lng}" target="_blank" rel="noopener" aria-label="${esc(p.name)}をGoogleマップで開く">Googleマップ ↗</a>
      ${p.url ? `<a href="${esc(p.url)}" target="_blank" rel="noopener" aria-label="${esc(p.name)}を文化遺産オンラインで開く">文化遺産オンライン ↗</a>` : ''}
    </div>
  </div>`;
}

// history: 'push' = 履歴を1つ増やす（「戻る」で閉じられる）／'none' = 履歴を変えない（「進む」で開き直したとき）
function showDetail(id, pointIndex = 0, { history: historyMode = 'push' } = {}) {
  const r = records.find(r => r.id === id);
  if (!r) return false;
  // 閉じた直後に開き直すと、ブラウザが close の通知を出さないことがある。その分の後始末をここで済ませる
  if (!$('detail').open && detailId !== null) onDetailClosed();
  const photos = photosOf(r.id);
  let currentPhoto = 0;
  detailId = r.id;
  selectedRowId = r.id;
  document.querySelectorAll('#results .record').forEach(row => {
    const on = row.dataset.id === r.id;
    row.classList.toggle('is-selected', on);
    if (on) row.setAttribute('aria-current', 'true'); else row.removeAttribute('aria-current');
  });

  $('detail-content').innerHTML = `${detailPhotoHTML(r)}
    <div class="detail-body">
      <span class="detail-tag" style="--cat:${color(r)}">${esc(r.category)}</span>
      ${isDesignated(r) ? `<span class="detail-kind">国の${esc(r.kind)}</span>` : ''}
      <h2>${esc(r.name)}</h2>
      ${r.reading ? `<p class="detail-reading">${esc(r.reading)}</p>` : ''}
      <p class="detail-location">${esc(r.location)}</p>
      <div class="detail-actions">
        <button type="button" id="copy-link" class="share-btn">リンクをコピー</button>
        <span id="copy-status" class="share-status" role="status"></span>
      </div>
      <section id="narrative-lead" class="narrative narrative-lead" aria-label="紹介" hidden></section>
      ${PILOTS_3D[r.id] ? '<button id="open-3d" class="three-d-launch"><span><small>周辺の位置関係</small>周辺地形を見る</span></button>' : ''}
      ${r.statusNote ? `<p class="status-note">${esc(r.statusNote)}</p>` : ''}
      ${isDesignated(r) ? `<p class="designated-note">国の${esc(r.kind)}（建造物）です。土木学会の選奨土木遺産ではありません。</p>
      <dl class="detail-facts">
        <div><dt>${esc(r.kind)}の指定</dt><dd>${esc(r.treasure || r.designated || '—')}</dd></div>
        <div><dt>地域</dt><dd>${esc(r.region)}</dd></div>
        <div class="wide"><dt>時代（文化財データの表記）</dt><dd>${esc(r.built || '—')}</dd></div>
      </dl>` : `<dl class="detail-facts">
        <div><dt>選奨年度</dt><dd>${r.year}<small> 年度</small></dd></div>
        <div><dt>地域</dt><dd>${esc(r.region)}</dd></div>
        <div class="wide"><dt>竣工年（原資料の表記）</dt><dd>${esc(r.built || '原資料の詳細をご確認ください')}</dd></div>
      </dl>`}
      ${DESCRIPTIONS[r.id] ? `<p id="detail-description" class="detail-description">${esc(DESCRIPTIONS[r.id])}</p>` : ''}
      <section id="narrative-main" class="narrative" aria-label="紹介文の本文と出典" hidden></section>
      <h3 class="points-title">${isDesignated(r) ? '指定されている建造物' : 'この遺産の掲載地点'} <span>${r.points.length}</span></h3>
      <div class="point-list">${r.points.map((p, i) => pointRowHTML(r, p, i, pointIndex === i)).join('')}</div>
      <p class="location-note">位置の出典：<a href="https://dobocolle.jsce.or.jp/digital-map/" target="_blank" rel="noopener">土木学会の公開マップ</a>${isDesignated(r) ? '（国宝・重要文化財の層）' : ''}。見学入口を示すものではありません。訪問前に管理者の案内をご確認ください。</p>
      ${isDesignated(r)
        ? (r.url ? `<a class="primary-link" href="${esc(r.url)}" target="_blank" rel="noopener">文化遺産オンライン（文化庁）で見る <span>↗</span></a>` : '')
        : `<a class="primary-link" href="${esc(r.url)}" target="_blank" rel="noopener">土木学会の解説・写真を見る <span>↗</span></a>`}
      <div class="detail-actions detail-actions-end">
        <button type="button" id="copy-link-end" class="share-btn">この遺産のリンクをコピー</button>
        <span id="copy-status-end" class="share-status" role="status"></span>
      </div>
    </div>`;

  $('expand-photo')?.addEventListener('click', () => {
    const p = photos[currentPhoto];
    $('photo-content').innerHTML = `<img class="detail-photo" src="${esc(p.src)}" alt="${esc(photoAlt(r, p))}">`
      + `<p class="photo-credit">${photoCredit(p)}</p>`;
    $('photo-dialog').showModal();
  });
  $('detail-content').querySelectorAll('[data-photo]').forEach(button => {
    button.addEventListener('click', () => {
      currentPhoto = Number(button.dataset.photo);
      const p = photos[currentPhoto];
      $('detail-photo-main').src = p.src;
      $('detail-photo-main').alt = photoAlt(r, p);
      $('detail-photo-credit').innerHTML = photoCredit(p);
      $('detail-content').querySelectorAll('[data-photo]').forEach(b => b.setAttribute('aria-pressed', String(b === button)));
    });
  });
  $('open-3d')?.addEventListener('click', () => open3D(r));
  $('detail-content').querySelectorAll('[data-point]').forEach(button => {
    button.addEventListener('click', () => {
      const p = r.points[Number(button.dataset.point)];
      listReturn = null; // 地図へ移るので、一覧の位置は戻さない
      closeDetail();
      selectedIds = [r.id];
      update();
      autoFit = null;
      map?.setView([p.lat, p.lng], 16, { animate: false });
      renderMap();
    });
  });

  [['copy-link', 'copy-status'], ['copy-link-end', 'copy-status-end']].forEach(([buttonId, statusId]) => {
    $(buttonId).addEventListener('click', async () => {
      const ok = await copyText(detailUrl(r.id));
      $(statusId).textContent = ok ? 'コピーしました' : 'コピーできませんでした。アドレス欄のURLをお使いください';
    });
  });

  if (!$('detail').open) $('detail').showModal();
  $('detail').scrollTop = 0;

  // 詳細を開いたら履歴を1つ増やし、ブラウザの「戻る」で閉じられるようにする
  if (historyMode === 'push') syncDetailHistory(r.id);

  fillNarrative(r);
  return true;
}

// 詳細の履歴。自分で積んだ履歴（pushedDetail）だけを戻し、戻している途中（pendingBack）に
// 別の詳細を開いたときは、戻し終えてから積み直す（素早く閉じて開き直しても履歴がずれないように）
let closingFromHistory = false;
let pushedDetail = false;
let pendingBack = false;

function syncDetailHistory(id) {
  if (pendingBack) return; // 戻し終えたとき（onPopState）に積む
  const url = urlWithParam('id', id);
  if (pushedDetail) {
    history.replaceState({ detail: id }, '', url);
  } else {
    history.pushState({ detail: id }, '', url);
    pushedDetail = true;
  }
}

// 詳細を閉じる。close の通知は届かないこと・遅れることがあるので、通知を待たずにここで後始末する
// （通知が後から届いても onDetailClosed は1回しか働かない）
function closeDetail() {
  if ($('detail').open) $('detail').close();
  onDetailClosed();
}

// 詳細が閉じられたとき（×・Esc・背景・「地図で見る」など）。開いたときに増やした履歴を戻す

function onDetailClosed() {
  // 後始末は1回だけ。開き直したあとに遅れて届いた古い通知は無視する
  if ($('detail').open || detailId === null) return;
  detailId = null;
  $('photo-dialog').open && $('photo-dialog').close();
  restoreListPosition();
  if (closingFromHistory) { closingFromHistory = false; return; }
  if (pushedDetail) {
    pushedDetail = false;
    pendingBack = true;
    history.back();
  } else {
    history.replaceState(null, '', urlWithParam('id', ''));
  }
}

// 一覧から開いた詳細を閉じたら、一覧のスクロール位置と、開いた行（選択行）を元に戻す
function restoreListPosition() {
  const back = listReturn;
  listReturn = null;
  if (!back) return;
  let row = $('results').querySelector(`.record[data-id="${CSS.escape(back.id)}"]`);
  if (!row) {
    // 「さらに見る」で出していた行が、描き直しで隠れていたら出し直す
    const index = filtered.findIndex(r => r.id === back.id);
    if (index < 0) return;
    if (index >= limit) {
      limit = Math.ceil((index + 1) / PAGE_SIZE) * PAGE_SIZE;
      renderList();
    }
    row = $('results').querySelector(`.record[data-id="${CSS.escape(back.id)}"]`);
    if (!row) return;
  }
  $('results').scrollTop = back.scroll;
  const box = $('results').getBoundingClientRect();
  const rect = row.getBoundingClientRect();
  if (rect.top < box.top || rect.bottom > box.bottom) row.scrollIntoView({ block: 'nearest' });
  // ダイアログが閉じたあとのブラウザ自身のフォーカス移動より後に、開いた行へフォーカスを戻す
  setTimeout(() => row.isConnected && row.focus({ preventScroll: true }), 0);
}

// ブラウザの「戻る」「進む」
function onPopState(event) {
  if (pendingBack) {
    // 自分で戻した分。その間に別の詳細を開いていたら、改めて履歴を積む
    pendingBack = false;
    if (detailId && $('detail').open) syncDetailHistory(detailId);
    return;
  }
  pushedDetail = false;
  const id = event.state?.detail;
  if (id) {
    showDetail(id, 0, { history: 'none' });
    return;
  }
  if ($('detail').open) {
    closingFromHistory = true;
    closeDetail();
  }
}

/* ---------- 一覧の切り替えと現在地 ---------- */

function setListMode(mode) {
  if (mode === 'view' && !map) return;
  listMode = mode;
  limit = PAGE_SIZE;
  renderList();
  $('results').scrollTop = 0;
}

// 「この地図の範囲」のときは、地図を動かし終えたら一覧を作り直す
let viewTimer = null;
function onMapMoved() {
  if (listMode !== 'view') return;
  clearTimeout(viewTimer);
  viewTimer = setTimeout(() => {
    limit = PAGE_SIZE;
    renderList();
    if (!detailId) $('results').scrollTop = 0;
  }, 150);
}

function showGeoStatus(message, { offerView = false, offerClear = false } = {}) {
  const box = $('geo-status');
  box.hidden = !message;
  box.innerHTML = message
    ? `<p>${message}</p>`
      + (offerClear ? '<button type="button" class="note-btn" id="geo-clear">現在地の基準を解除して通常の並びに戻す</button>' : '')
      + (offerView && map ? '<button type="button" class="note-btn" id="geo-view">この地図の範囲で探す</button>' : '')
      + '<button type="button" class="note-btn" id="geo-close">閉じる</button>'
    : '';
  $('geo-clear')?.addEventListener('click', clearOrigin);
  $('geo-view')?.addEventListener('click', () => { showGeoStatus(''); setListMode('view'); });
  $('geo-close')?.addEventListener('click', () => showGeoStatus(''));
}

const originTime = () => origin.at.toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' });

const GEO_FALLBACK = '地名や遺産名で検索するか、地図を動かして「この地図の範囲」で探せます。';

// 現在地は、ボタンを押したときに1回だけ取る（追いかけ続けない）。外部へは送らない
function locate() {
  if (!map) return;
  if (!('geolocation' in navigator) || !window.isSecureContext) {
    showGeoStatus('このブラウザ（またはこの開き方）では現在地を使えません。' + GEO_FALLBACK, { offerView: true });
    return;
  }
  $('locate').disabled = true;
  $('locate').classList.add('is-busy');
  showGeoStatus('現在地を取得しています…');
  navigator.geolocation.getCurrentPosition(pos => {
    $('locate').disabled = false;
    $('locate').classList.remove('is-busy');
    origin = { lat: pos.coords.latitude, lng: pos.coords.longitude, at: new Date(), stale: false };
    showLocation(origin, pos.coords.accuracy);
    showGeoStatus('');
    autoFit = null;
    map.setView([origin.lat, origin.lng], Math.max(map.getZoom(), 11), { animate: false });
    limit = PAGE_SIZE;
    renderList();
    $('results').scrollTop = 0;
  }, err => {
    $('locate').disabled = false;
    $('locate').classList.remove('is-busy');
    const reason = err.code === 1 ? '位置情報の利用が許可されていません。'
      : err.code === 3 ? '現在地の取得に時間がかかり、取得できませんでした。'
      : '現在地を取得できませんでした。';
    if (origin) {
      // 前に取れた現在地があるときは、その位置で並び続けていることをはっきり示し、解除できるようにする
      origin.stale = true;
      renderList();
      showGeoStatus(`${reason}一覧は、前回取得した現在地（${originTime()}時点）から近い順のままです。`, { offerClear: true });
      return;
    }
    showGeoStatus(reason + GEO_FALLBACK, { offerView: true });
  }, { enableHighAccuracy: false, timeout: 15000, maximumAge: 60000 });
}

function showLocation(at, accuracy) {
  locateLayer?.remove();
  locateLayer = L.layerGroup([
    L.circle([at.lat, at.lng], { radius: Math.min(accuracy || 0, 2000), color: '#2b6cb0', weight: 1, fillColor: '#2b6cb0', fillOpacity: .08, interactive: false }),
    L.circleMarker([at.lat, at.lng], { radius: 7, color: '#fff', weight: 3, fillColor: '#2b6cb0', fillOpacity: 1, interactive: false })
  ]).addTo(map);
}

function clearOrigin() {
  origin = null;
  showGeoStatus('');
  locateLayer?.remove();
  locateLayer = null;
  limit = PAGE_SIZE;
  renderList();
  $('results').scrollTop = 0;
}

/* ---------- 周辺地形ビュー（3D） ---------- */

// MapLibre は3Dビューを開いたときに初めて読み込む
function loadMapLibre() {
  if (typeof maplibregl !== 'undefined') return Promise.resolve();
  if (!maplibrePromise) {
    maplibrePromise = new Promise((resolve, reject) => {
      const css = document.createElement('link');
      css.rel = 'stylesheet';
      css.href = MAPLIBRE_BASE + '.css';
      const script = document.createElement('script');
      script.src = MAPLIBRE_BASE + '.js';
      script.onload = resolve;
      script.onerror = () => {
        maplibrePromise = null;
        script.remove();
        css.remove();
        reject(Error('maplibre'));
      };
      document.head.append(css, script);
    });
  }
  return maplibrePromise;
}

function stopOrbit() {
  if (orbitTimer) { clearInterval(orbitTimer); orbitTimer = null; }
  $('orbit').setAttribute('aria-pressed', 'false');
  $('orbit').textContent = '自動旋回';
}

function startOrbit() {
  if (!viewerMap) return;
  orbitTimer = setInterval(() => viewerMap.rotateTo((viewerMap.getBearing() + 1.2) % 360, { duration: 90 }), 110);
  $('orbit').setAttribute('aria-pressed', 'true');
  $('orbit').textContent = '旋回を停止';
}

function reset3DCamera() {
  if (!viewerMap || !viewerRecord) return;
  const p = viewerRecord.points[0];
  const v = PILOTS_3D[viewerRecord.id];
  viewerMap.easeTo({ center: [p.lng, p.lat], zoom: v.zoom, pitch: v.pitch, bearing: v.bearing, duration: 900 });
}

function clearPhotoView() {
  if (photoMarker) { photoMarker.remove(); photoMarker = null; }
  photoView = null;
  $('remove-photo-view').hidden = true;
  $('bind-photo-view').textContent = '現在の視点を写真に紐付け';
  $('photo-link-status').textContent = '紐付けを外しました。写真は残っています。地図を動かして、もう一度紐付けできます。';
}

function bindPhotoView() {
  if (!viewerMap) return;
  stopOrbit();
  const c = viewerMap.getCenter();
  photoView = { center: [c.lng, c.lat], zoom: viewerMap.getZoom(), pitch: viewerMap.getPitch(), bearing: viewerMap.getBearing() };
  if (photoMarker) photoMarker.remove();

  const el = document.createElement('div');
  el.className = 'photo-map-pin';
  const show = document.createElement('button');
  show.type = 'button';
  show.textContent = '写真';
  show.setAttribute('aria-label', '紐付けた写真を表示');
  show.addEventListener('click', () => {
    const img = $('viewer-photo-img');
    if (!img) return;
    img.scrollIntoView({ block: 'nearest' });
    img.classList.add('photo-focus');
    setTimeout(() => $('viewer-photo-img')?.classList.remove('photo-focus'), 900);
  });
  const remove = document.createElement('button');
  remove.type = 'button';
  remove.className = 'photo-pin-remove';
  remove.textContent = '×';
  remove.title = '写真の紐付けを外す';
  remove.setAttribute('aria-label', '写真の紐付けを外す');
  remove.addEventListener('click', event => { event.stopPropagation(); clearPhotoView(); });
  el.append(show, remove);

  photoMarker = new maplibregl.Marker({ element: el }).setLngLat(photoView.center).addTo(viewerMap);
  $('remove-photo-view').hidden = false;
  $('bind-photo-view').textContent = '現在の視点に紐付け直す';
  $('photo-link-status').textContent = '視点を紐付けました。地図上の写真の×、または「紐付けを外す」で取り消せます。撮影位置は手動設定です。';
}

// 利用者が選んだ写真は、この画面内で一時的に表示するだけで、保存も送信もしない
function showOwnPhoto(event) {
  const file = event.target.files?.[0];
  if (!file) return;
  if (file.type && !file.type.startsWith('image/')) {
    $('photo-link-status').textContent = '画像ファイルを選んでください。';
    event.target.value = '';
    return;
  }
  if (viewerPhotoUrl) URL.revokeObjectURL(viewerPhotoUrl);
  viewerPhotoUrl = URL.createObjectURL(file);

  let img = $('viewer-photo-img');
  if (!img) {
    const frame = $('viewer-info').querySelector('.viewer-photo');
    frame.querySelector('.viewer-nophoto')?.remove();
    img = document.createElement('img');
    img.id = 'viewer-photo-img';
    frame.prepend(img);
  }
  img.src = viewerPhotoUrl;
  img.alt = '選択した自分の写真';
  const credit = $('viewer-credit');
  credit.textContent = '自分の写真 · 一時表示';
  credit.removeAttribute('href');
  clearPhotoView();
  $('photo-link-status').textContent = '写真を表示しました。地図を撮影地点へ動かし、現在の視点を写真に紐付けてください。';
  event.target.value = '';
}

function renderViewerInfo(r) {
  const local = photosOf(r.id)[0];
  const v = PILOTS_3D[r.id];
  const photo = local
    ? `<img id="viewer-photo-img" src="${esc(local.src)}" alt="${esc(photoAlt(r, local))}">`
    : '<div class="viewer-nophoto"><span>土木学会の写真は掲載していません。</span></div>';
  const credit = local
    ? `<p id="viewer-credit" class="viewer-credit">${photoCredit(local)}</p>`
    : `<a id="viewer-credit" class="viewer-credit" href="${esc(r.url)}" target="_blank" rel="noopener">公式ページで写真を見る ↗</a>`;

  $('viewer-info').innerHTML = `<div class="viewer-kicker">周辺地形 · ${r.year}</div>
    <h2>${esc(r.name)}</h2>
    <p class="viewer-location">${esc(r.location)}</p>
    <div class="viewer-photo">${photo}<button id="photo-viewpoint">写真の視点へ</button></div>
    ${credit}
    <dl class="viewer-facts">
      <div><dt>建設年</dt><dd>${esc(r.built || '原資料参照')}</dd></div>
      <div><dt>形式</dt><dd>${esc(v.form)}</dd></div>
    </dl>
    <a class="viewer-credit" href="${esc(v.source)}" target="_blank" rel="noopener">形式の出典：土木学会 ↗</a>
    <div class="viewer-highlight"><span>VIEWPOINT</span><p>${esc(v.highlight)}</p></div>
    <div class="photo-link-tools">
      <button id="bind-photo-view">現在の視点を写真に紐付け</button>
      <button id="remove-photo-view" hidden>紐付けを外す</button>
      <p id="photo-link-status" role="status">撮影位置は未登録。現在は遺産の掲載地点を表示します。</p>
    </div>
    <label class="photo-upload">
      <span>写真から選ぶ</span>
      <small>この端末内だけで一時表示され、保存・送信されません</small>
      <input id="viewer-upload" type="file" accept="image/*">
    </label>
    <label class="photo-upload camera-upload">
      <span>カメラで撮影する</span>
      <small>スマホでは背面カメラで撮影できます。端末によっては写真の選択画面が開きます。</small>
      <input id="viewer-camera" type="file" accept="image/*" capture="environment">
    </label>
    <p class="viewer-note">写真はこの画面内の一時表示です。閉じると写真と紐付けは消えます。撮影位置は自動では取得しません。</p>
    <p class="viewer-note">地形は公開標高データによる概略表示です。測量・設計用途には使用できません。</p>`;

  $('photo-viewpoint').addEventListener('click', () => {
    stopOrbit();
    if (photoView && viewerMap) viewerMap.easeTo({ ...photoView, duration: 600 });
    else reset3DCamera();
  });
  $('remove-photo-view').addEventListener('click', clearPhotoView);
  $('bind-photo-view').addEventListener('click', bindPhotoView);
  $('viewer-upload').addEventListener('change', showOwnPhoto);
  $('viewer-camera').addEventListener('change', showOwnPhoto);
}

function add3DLayers(r) {
  if (!viewerMap) return;
  const v = PILOTS_3D[r.id];
  const firstLabel = viewerMap.getStyle().layers.find(layer => layer.type === 'symbol');

  try {
    viewerMap.addSource('terrain-dem', {
      type: 'raster-dem',
      tiles: ['https://s3.amazonaws.com/elevation-tiles-prod/terrarium/{z}/{x}/{y}.png'],
      tileSize: 256,
      maxzoom: 15,
      encoding: 'terrarium',
      attribution: 'Elevation tiles: Mapzen / AWS Open Data'
    });
    viewerMap.setTerrain({ source: 'terrain-dem', exaggeration: 1 });
    viewerMap.addLayer({
      id: 'terrain-shade',
      type: 'hillshade',
      source: 'terrain-dem',
      paint: { 'hillshade-shadow-color': '#233d49', 'hillshade-highlight-color': '#f5eee1', 'hillshade-exaggeration': .32 }
    }, firstLabel?.id);
  } catch (error) {
    console.warn('terrain unavailable', error);
  }

  try {
    if (viewerMap.getSource('openmaptiles') && !viewerMap.getLayer('building-3d') && !viewerMap.getLayer('heritage-buildings')) {
      viewerMap.addLayer({
        id: 'heritage-buildings',
        source: 'openmaptiles',
        'source-layer': 'building',
        type: 'fill-extrusion',
        minzoom: 14,
        paint: {
          'fill-extrusion-color': ['interpolate', ['linear'], ['zoom'], 14, '#a9b5b6', 17, '#dfd5c8'],
          'fill-extrusion-height': ['coalesce', ['get', 'render_height'], ['get', 'height'], ['*', ['coalesce', ['get', 'levels'], 1], 3]],
          'fill-extrusion-base': ['coalesce', ['get', 'render_min_height'], ['get', 'min_height'], 0],
          'fill-extrusion-opacity': .78
        }
      }, firstLabel?.id);
    }
  } catch (error) {
    console.warn('buildings unavailable', error);
  }

  const p = r.points[0];
  const pin = document.createElement('button');
  pin.className = 'heritage-3d-pin';
  pin.type = 'button';
  pin.innerHTML = '<span>＋</span>';
  pin.setAttribute('aria-label', r.name + 'の注釈');
  const popup = new maplibregl.Popup({ offset: 22, closeButton: false, maxWidth: '270px' }).setHTML(
    `<div class="map-annotation"><small>${esc(v.form)} · ${esc(r.built || '建設年不明')}</small><strong>${esc(r.name)}</strong><p>${esc(v.highlight)}</p></div>`
  );
  new maplibregl.Marker({ element: pin, anchor: 'bottom' }).setLngLat([p.lng, p.lat]).setPopup(popup).addTo(viewerMap);
  popup.setLngLat([p.lng, p.lat]).addTo(viewerMap);
}

function setViewerControls(enabled) {
  document.querySelectorAll('.viewer-tools button').forEach(b => { b.disabled = !enabled; });
  $('bind-photo-view').disabled = !enabled;
  $('photo-viewpoint').disabled = !enabled;
}

function showViewerError(message) {
  $('viewer-loading').hidden = true;
  $('viewer-error').textContent = message;
  $('viewer-error').hidden = false;
}

async function open3D(r) {
  const v = PILOTS_3D[r.id];
  const p = r.points[0];
  if (!v || !p) return;

  closeDetail();
  viewerRecord = r;
  photoView = null;
  renderViewerInfo(r);
  setViewerControls(false);
  $('viewer-loading').hidden = false;
  $('viewer-error').hidden = true;
  $('viewer3d').showModal();

  try {
    await loadMapLibre();
  } catch (error) {
    if (viewerRecord === r) showViewerError(VIEWER_ERROR_NETWORK);
    return;
  }
  // 読み込み中に閉じられた場合は何もしない
  if (viewerRecord !== r || !$('viewer3d').open) return;

  try {
    viewerMap = new maplibregl.Map({
      container: 'viewer-map',
      style: 'https://tiles.openfreemap.org/styles/liberty',
      center: [p.lng, p.lat],
      zoom: v.zoom,
      pitch: v.pitch,
      bearing: v.bearing,
      maxPitch: 80,
      attributionControl: true
    });
  } catch (error) {
    showViewerError(VIEWER_ERROR_WEBGL);
    console.warn('3D unavailable', error);
    return;
  }

  const activeMap = viewerMap;
  viewerMap.addControl(new maplibregl.NavigationControl({ visualizePitch: true, showZoom: true, showCompass: true }), 'top-right');
  viewerLoadTimer = setTimeout(() => {
    if (viewerMap === activeMap) showViewerError(VIEWER_ERROR_NETWORK);
  }, 20000);
  viewerMap.once('load', () => {
    if (viewerMap !== activeMap) return;
    clearTimeout(viewerLoadTimer);
    $('viewer-loading').hidden = true;
    $('viewer-error').hidden = true;
    add3DLayers(r);
    setViewerControls(true);
  });
  viewerMap.on('dragstart', stopOrbit);
  viewerMap.on('rotatestart', e => { if (e.originalEvent) stopOrbit(); });
}

function dispose3D() {
  stopOrbit();
  clearTimeout(viewerLoadTimer);
  if (viewerMap) { viewerMap.remove(); viewerMap = null; }
  viewerRecord = null;
  photoMarker = null;
  photoView = null;
  if (viewerPhotoUrl) { URL.revokeObjectURL(viewerPhotoUrl); viewerPhotoUrl = ''; }
  $('viewer-info').innerHTML = '';
}

/* ---------- 初期化 ---------- */

function sortRecords() {
  const number = r => Number(r.id.split('_')[1]);
  // 選奨土木遺産を年度の新しい順に並べ、国の重要文化財はその後ろ（名称順）
  records.sort((a, b) => isDesignated(a) - isDesignated(b)
    || (isDesignated(a) ? a.name.localeCompare(b.name, 'ja') : b.year - a.year || number(a) - number(b)));
}

// 件数・地点数・年度の表示は data.json から算出する
function renderStats() {
  const selected = records.filter(isSelected);
  const years = selected.map(r => r.year);
  const first = Math.min(...years);
  const last = Math.max(...years);
  const points = selected.reduce((n, r) => n + r.points.length, 0);
  const values = { records: selected.length, points, years: `${first}〜${last}`, 'years-en': `${first} — ${last}` };
  document.querySelectorAll('[data-stat]').forEach(el => { el.textContent = values[el.dataset.stat]; });
  $('stat-years').textContent = `${first}–${last}年度の選奨`;
  $('stat-points').textContent = `${points}地点（全国・海外）`;
}

function buildFilters() {
  [...new Set(records.filter(isSelected).map(r => r.year))].sort((a, b) => b - a).forEach(y => {
    const option = document.createElement('option');
    option.value = y;
    option.textContent = y + '年度';
    $('year').append(option);
  });

  const seen = new Set();
  [...$('region').options].map(o => o.value || o.textContent).filter(region => region !== '全国すべて').forEach(region => {
    const values = [...new Set(records.filter(r => r.region === region).flatMap(r => r.prefectures))]
      .filter(p => !seen.has(p))
      .sort((a, b) => a.localeCompare(b, 'ja'));
    if (!values.length) return;
    const group = document.createElement('optgroup');
    group.label = region;
    values.forEach(value => {
      seen.add(value);
      const option = document.createElement('option');
      option.value = value;
      option.textContent = value;
      group.append(option);
    });
    $('prefecture').append(group);
  });

  Object.keys(CATEGORY_COLORS).forEach(cat => {
    const b = document.createElement('button');
    b.className = 'category';
    b.dataset.cat = cat;
    b.style.setProperty('--cat', CATEGORY_COLORS[cat]);
    b.textContent = cat;
    b.addEventListener('click', () => { category = cat; selectedIds = []; update(); fitFiltered(); });
    $('categories').append(b);
  });
}

function bindEvents() {
  const onFilterChange = () => { selectedIds = []; update(); fitFiltered(); };
  $('search').addEventListener('input', () => { selectedIds = []; update(); });
  $('search').addEventListener('change', () => { setUrlParam('q', $('search').value.trim()); fitFiltered(); });
  $('region').addEventListener('change', onFilterChange);
  $('prefecture').addEventListener('change', onFilterChange);
  $('year').addEventListener('change', onFilterChange);
  $('reset').addEventListener('click', reset);

  $('zoom-in').addEventListener('click', () => { autoFit = null; map?.zoomIn(); });
  $('zoom-out').addEventListener('click', () => { autoFit = null; map?.zoomOut(); });
  $('fit').addEventListener('click', () => { selectedIds = []; update(); fitNational(); });
  $('locate').addEventListener('click', () => { autoFit = null; locate(); });
  $('mode-all').addEventListener('click', () => setListMode('all'));
  $('mode-view').addEventListener('click', () => setListMode('view'));
  $('show-designated').addEventListener('change', () => {
    // ヘッダーの重要文化財の件数は、地図に出していないときは薄くする
    $('stat-designated').classList.toggle('is-off', !$('show-designated').checked);
    selectedIds = [];
    update();
  });

  $('about').addEventListener('click', () => $('about-dialog').showModal());
  $('close-about').addEventListener('click', () => $('about-dialog').close());
  $('close-detail').addEventListener('click', closeDetail);
  // Esc で閉じるときも同じ後始末を通す
  $('detail').addEventListener('cancel', event => { event.preventDefault(); closeDetail(); });
  $('close-photo').addEventListener('click', () => $('photo-dialog').close());
  $('detail').addEventListener('close', onDetailClosed);
  window.addEventListener('popstate', onPopState);

  // ダイアログの外側（背景）をクリックしたら閉じる
  ['detail', 'about-dialog', 'photo-dialog'].forEach(id => {
    $(id).addEventListener('click', e => {
      if (e.target !== $(id)) return;
      const rect = $(id).getBoundingClientRect();
      const outside = e.clientX < rect.left || e.clientX > rect.right || e.clientY < rect.top || e.clientY > rect.bottom;
      if (outside) id === 'detail' ? closeDetail() : $(id).close();
    });
  });

  $('close-3d').addEventListener('click', () => $('viewer3d').close());
  $('viewer3d').addEventListener('close', dispose3D);
  $('orbit').addEventListener('click', () => orbitTimer ? stopOrbit() : startOrbit());
  $('rotate-left').addEventListener('click', () => { stopOrbit(); viewerMap?.rotateTo(viewerMap.getBearing() - 30, { duration: 450 }); });
  $('rotate-right').addEventListener('click', () => { stopOrbit(); viewerMap?.rotateTo(viewerMap.getBearing() + 30, { duration: 450 }); });
  $('pitch-up').addEventListener('click', () => { stopOrbit(); viewerMap?.easeTo({ pitch: 0, duration: 450 }); });
  $('pitch-down').addEventListener('click', () => { stopOrbit(); viewerMap?.easeTo({ pitch: 65, duration: 450 }); });
  $('reset-3d').addEventListener('click', () => { stopOrbit(); reset3DCamera(); });
}

// index.html に必要な部品がそろっているか。サイトの更新直後に、ブラウザに残った古い index.html と
// 新しい app.js が組み合わさったときは、壊れた画面を出さずに再読み込みを案内する
const REQUIRED_IDS = [
  'search', 'region', 'prefecture', 'year', 'categories', 'reset', 'result-count', 'scope', 'results',
  'map', 'map-error', 'point-total', 'zoom-in', 'zoom-out', 'fit', 'stat-years', 'stat-points',
  'about', 'about-dialog', 'close-about', 'detail', 'detail-content', 'close-detail', 'photo-dialog', 'photo-content', 'close-photo',
  'viewer3d', 'close-3d', 'viewer-map', 'viewer-info', 'viewer-loading', 'viewer-error',
  'orbit', 'rotate-left', 'rotate-right', 'pitch-up', 'pitch-down', 'reset-3d',
  'result-unit', 'mode-all', 'mode-view', 'list-note', 'geo-status', 'locate',
  'designated-toggle', 'show-designated', 'designated-count'
];

function pageIsOutdated() {
  const missing = REQUIRED_IDS.filter(id => !$(id));
  if (!missing.length) return false;
  console.warn('index.html と app.js の版が合いません', missing);
  // style.css も古い可能性があるので、見た目はこの場で指定する
  const note = document.createElement('div');
  note.setAttribute('role', 'alert');
  note.style.cssText = 'position:fixed;left:16px;right:16px;top:16px;z-index:5000;padding:14px 16px;border-radius:8px;background:#142b37;color:#fff;font:14px/1.7 sans-serif';
  note.innerHTML = 'このサイトは更新されています。ページを再読み込みしてください。 <button type="button" style="margin-left:8px;padding:4px 12px;border:0;border-radius:4px;background:#fff;color:#142b37;font:inherit">再読み込み</button>';
  note.querySelector('button').addEventListener('click', () => location.reload());
  document.body.append(note);
  return true;
}

async function init() {
  if (pageIsOutdated()) return;
  bindEvents();
  try {
    const res = await fetch(withVersion('data.json'));
    if (!res.ok) throw Error('data');
    records = await res.json();
  } catch (error) {
    $('results').innerHTML = '<p class="empty">掲載データを読み込めませんでした。ページを再読み込みしてください。<br>'
      + '<a href="https://www.jsce.or.jp/contents/isan/list/index.html">土木学会の一覧を見る ↗</a></p>';
    console.error(error);
    return;
  }

  // 紹介文の一覧を先に読んでおく。読めたら一覧に「紹介文」の印を付ける（失敗しても地図と一覧はそのまま使える）
  loadNarrativeIndex().then(() => {
    const scroll = $('results').scrollTop;
    renderList();
    $('results').scrollTop = scroll;
  }).catch(() => {});
  // 国の重要文化財（土木系）を足す。読めなくても選奨土木遺産だけで動く
  try {
    const res = await fetch(withVersion('designated.json'));
    if (!res.ok) throw Error('designated');
    const designated = (await res.json()).filter(r => r.type === 'designated' && !records.some(x => x.id === r.id));
    records.push(...designated);
    $('designated-count').textContent = designated.length;
    $('stat-designated-count').textContent = designated.length;
    $('stat-designated').hidden = !designated.length;
  } catch (error) {
    console.warn('国の重要文化財の一覧を読み込めませんでした（選奨土木遺産だけを表示します）', error);
    $('designated-toggle').hidden = true;
  }
  sortRecords();
  renderStats();
  buildFilters();
  initMap();
  update();

  // ?q=検索語 と ?id=遺産ID で、検索結果や個別の遺産に直接リンクできる
  const params = new URLSearchParams(location.search);
  const q = params.get('q');
  if (q) { $('search').value = q; update(); fitFiltered(); }
  const id = params.get('id');
  if (id && records.some(r => r.id === id)) {
    // 直接開いたときも、地図だけの状態を手前の履歴に置いて、「戻る」で詳細を閉じられるようにする
    history.replaceState(null, '', urlWithParam('id', ''));
    showDetail(id);
  }
}

init();
