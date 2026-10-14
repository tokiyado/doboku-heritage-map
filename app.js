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
const photosOf = id => (typeof LOCAL_PHOTOS === 'object' && LOCAL_PHOTOS[id]) || [];

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

function setUrlParam(key, value) {
  const url = new URL(location.href);
  if (value) url.searchParams.set(key, value);
  else url.searchParams.delete(key);
  history.replaceState(null, '', url);
}

/* ---------- 絞り込み ---------- */

function matches(r, includeScope = true) {
  const q = norm($('search').value);
  const text = [r.name, r.reading, r.location, ...r.prefectures, ...r.points.map(p => p.name)].join(' ');
  return (!q || norm(text).includes(q))
    && (!$('region').value || r.region === $('region').value)
    && (!$('prefecture').value || r.prefectures.includes($('prefecture').value))
    && (!$('year').value || r.year === Number($('year').value))
    && (category === 'すべて' || r.category === category)
    && (!includeScope || !selectedIds.length || selectedIds.includes(r.id));
}

function hasFilter() {
  return category !== 'すべて' || selectedIds.length > 0
    || Boolean($('region').value || $('prefecture').value || $('year').value || $('search').value);
}

/* ---------- 一覧 ---------- */

function thumbHTML(r) {
  const local = photosOf(r.id)[0];
  if (local) return `<img src="${esc(local.thumb)}" alt="" loading="lazy" decoding="async">`;
  return `<span class="record-tile" style="--cat:${color(r)}" aria-hidden="true">${esc(r.category.charAt(0))}</span>`;
}

function recordHTML(r) {
  return `<button class="record" data-id="${esc(r.id)}" aria-label="${esc(r.name)}の詳細">
    <span class="record-image">${thumbHTML(r)}</span>
    <span class="record-text">
      <span class="record-top">
        <span class="record-category" style="--cat:${color(r)}">${esc(r.category)}</span>
        <span class="record-year">${r.year}</span>
      </span>
      <h3>${esc(r.name)}</h3>
      <span class="record-location">${esc(r.location)}</span>
      ${r.points.length > 1 ? `<span class="point-count">${r.points.length}地点の遺産</span>` : ''}
      ${PILOTS_3D[r.id] ? '<span class="pilot-label">地形ビュー</span>' : ''}
    </span>
  </button>`;
}

function renderList() {
  filtered = records.filter(r => matches(r));
  $('result-count').textContent = filtered.length;
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
    $('results').innerHTML = '<p class="empty">条件に一致する遺産がありません。<br>地名や絞り込み条件を変えてお試しください。</p>';
  }
  $('results').querySelectorAll('[data-id]').forEach(el => {
    el.addEventListener('click', () => showDetail(el.dataset.id));
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
      ? `<span class="site-dot ${selected}" style="--cat:${color(first.r)}"></span>`
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

  fitNational();
  map.on('zoomend', renderMap);

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
  setUrlParam('q', '');
  update();
  fitNational();
}

/* ---------- 詳細 ---------- */

function licenseLabel(p) {
  return p.license === 'Public domain' ? 'パブリックドメイン' : p.license;
}

function photoCredit(p) {
  const license = p.licenseUrl
    ? `<a href="${esc(p.licenseUrl)}" target="_blank" rel="noopener">${esc(licenseLabel(p))}</a>`
    : esc(licenseLabel(p));
  return `${p.facility ? `<span class="photo-facility">${esc(p.facility)}</span>` : ''}`
    + `写真：<a href="${esc(p.source)}" target="_blank" rel="noopener">${esc(p.by)}</a> / ${license}`;
}

function photoAlt(r, p) {
  return p.facility ? `${r.name}（${p.facility}）` : r.name;
}

function detailPhotoHTML(r) {
  const photos = photosOf(r.id);
  const local = photos[0];
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
    </div>
  </div>`;
}

function showDetail(id, pointIndex = 0) {
  const r = records.find(r => r.id === id);
  if (!r) return false;
  const photos = photosOf(r.id);
  let currentPhoto = 0;

  $('detail-content').innerHTML = `${detailPhotoHTML(r)}
    <div class="detail-body">
      <span class="detail-tag" style="--cat:${color(r)}">${esc(r.category)}</span>
      <h2>${esc(r.name)}</h2>
      ${r.reading ? `<p class="detail-reading">${esc(r.reading)}</p>` : ''}
      <p class="detail-location">${esc(r.location)}</p>
      ${PILOTS_3D[r.id] ? '<button id="open-3d" class="three-d-launch"><span><small>周辺の位置関係</small>周辺地形を見る</span></button>' : ''}
      ${r.statusNote ? `<p class="status-note">${esc(r.statusNote)}</p>` : ''}
      <dl class="detail-facts">
        <div><dt>選奨年度</dt><dd>${r.year}<small> 年度</small></dd></div>
        <div><dt>地域</dt><dd>${esc(r.region)}</dd></div>
        <div class="wide"><dt>竣工年（原資料の表記）</dt><dd>${esc(r.built || '原資料の詳細をご確認ください')}</dd></div>
      </dl>
      ${DESCRIPTIONS[r.id] ? `<p class="detail-description">${esc(DESCRIPTIONS[r.id])}</p>` : ''}
      <h3 class="points-title">この遺産の掲載地点 <span>${r.points.length}</span></h3>
      <div class="point-list">${r.points.map((p, i) => pointRowHTML(r, p, i, pointIndex === i)).join('')}</div>
      <p class="location-note">位置の出典：<a href="https://dobocolle.jsce.or.jp/digital-map/" target="_blank" rel="noopener">土木学会の公開マップ</a>。見学入口を示すものではありません。訪問前に管理者の案内をご確認ください。</p>
      <a class="primary-link" href="${esc(r.url)}" target="_blank" rel="noopener">土木学会の解説・写真を見る <span>↗</span></a>
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
      $('detail').close();
      selectedIds = [r.id];
      update();
      autoFit = null;
      map?.setView([p.lat, p.lng], 16, { animate: false });
      renderMap();
    });
  });

  if (!$('detail').open) $('detail').showModal();
  $('detail').scrollTop = 0;
  setUrlParam('id', r.id);
  return true;
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
    ? `<a id="viewer-credit" class="viewer-credit" href="${esc(local.source)}" target="_blank" rel="noopener">写真：${esc(local.by)} / ${esc(licenseLabel(local))} ↗</a>`
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

  $('detail').close();
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
  records.sort((a, b) => b.year - a.year || number(a) - number(b));
}

// 件数・地点数・年度の表示は data.json から算出する
function renderStats() {
  const years = records.map(r => r.year);
  const first = Math.min(...years);
  const last = Math.max(...years);
  const points = records.reduce((n, r) => n + r.points.length, 0);
  const values = { records: records.length, points, years: `${first}〜${last}`, 'years-en': `${first} — ${last}` };
  document.querySelectorAll('[data-stat]').forEach(el => { el.textContent = values[el.dataset.stat]; });
  $('stat-years').textContent = `${first}–${last}年度の選奨記録`;
  $('stat-points').textContent = `${points}地点 · 全国・海外`;
}

function buildFilters() {
  [...new Set(records.map(r => r.year))].sort((a, b) => b - a).forEach(y => {
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

  $('about').addEventListener('click', () => $('about-dialog').showModal());
  $('close-about').addEventListener('click', () => $('about-dialog').close());
  $('close-detail').addEventListener('click', () => $('detail').close());
  $('close-photo').addEventListener('click', () => $('photo-dialog').close());
  $('detail').addEventListener('close', () => setUrlParam('id', ''));

  // ダイアログの外側（背景）をクリックしたら閉じる
  ['detail', 'about-dialog', 'photo-dialog'].forEach(id => {
    $(id).addEventListener('click', e => {
      if (e.target !== $(id)) return;
      const rect = $(id).getBoundingClientRect();
      const outside = e.clientX < rect.left || e.clientX > rect.right || e.clientY < rect.top || e.clientY > rect.bottom;
      if (outside) $(id).close();
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

async function init() {
  bindEvents();
  try {
    const res = await fetch('data.json');
    if (!res.ok) throw Error('data');
    records = await res.json();
  } catch (error) {
    $('results').innerHTML = '<p class="empty">掲載データを読み込めませんでした。ページを再読み込みしてください。<br>'
      + '<a href="https://www.jsce.or.jp/contents/isan/list/index.html">土木学会の一覧を見る ↗</a></p>';
    console.error(error);
    return;
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
  if (id) showDetail(id);
}

init();
