// ════════════════════════════════════════════════════════════
//   Xector1 Production — Member Portal
// ════════════════════════════════════════════════════════════

const LS_NAME = 'xector1_name';
const LS_GOAL = 'xector1_goal';
const LS_AV   = 'xector1_av';
const LS_JOIN = 'xector1_joined';

const CATS = {
  content:   { label: 'Content',   color: 'var(--cat-content)' },
  algorithm: { label: 'Algorithm', color: 'var(--cat-algorithm)' },
  growth:    { label: 'Growth',    color: 'var(--cat-growth)' },
  mindset:   { label: 'Mindset',   color: 'var(--cat-mindset)' },
  collab:    { label: 'Collab',    color: 'var(--cat-collab)' },
};

let activeFilter = 'all';

function $(id) { return document.getElementById(id); }
function escapeHtml(s) {
  return String(s || '').replace(/[&<>"']/g, c =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])
  );
}
function readMinutes(text) { return Math.max(1, Math.round((text || '').length / 400)); }
function previewOf(text, n) {
  const flat = (text || '').replace(/^[■・]\s*/gm, '').replace(/\n+/g, ' ').trim();
  return flat.slice(0, n || 80);
}
// 外部記事リンクTipsかどうか
function isExternal(tip) { return !!(tip && tip.link); }
// 一覧用のメタ表示（外部記事なら「記事を読む」、アプリ内なら所要分）
function metaLabel(tip) {
  return isExternal(tip) ? '記事を読む' : `${readMinutes(tip.body)} MIN`;
}
// 一覧用のプレビュー文（本文 or リンク説明）
function listPreview(tip, n) {
  if (isExternal(tip)) return 'Xector1 Production のコラムを読む';
  return previewOf(tip.body, n);
}

// ─── マークダウンパーサ ───
function renderBody(body) {
  const lines = (body || '').split('\n');
  let html = '', buf = [], inList = false;
  const flushPara = () => { if (buf.length) { html += `<p class="sheet-p">${escapeHtml(buf.join(' '))}</p>`; buf = []; } };
  const closeList = () => { if (inList) { html += '</div>'; inList = false; } };

  for (let raw of lines) {
    const line = raw.trim();
    if (!line) { flushPara(); closeList(); continue; }
    if (line.startsWith('■')) {
      flushPara(); closeList();
      html += `<h3 class="sheet-h">${escapeHtml(line.replace(/^■\s*/, ''))}</h3>`;
      continue;
    }
    if (line.startsWith('・')) {
      flushPara();
      if (!inList) { html += '<div class="sheet-ul">'; inList = true; }
      html += `<div class="sheet-li">${escapeHtml(line.replace(/^・\s*/, ''))}</div>`;
      continue;
    }
    closeList();
    buf.push(line);
  }
  flushPara(); closeList();
  return html;
}

// ─── トースト ───
let toastTimer = null;
function toast(msg) {
  const el = $('toast');
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('show'), 2200);
}

// ─── アバター ───
function applyAvatar() {
  const av = localStorage.getItem(LS_AV);
  const name = (localStorage.getItem(LS_NAME) || '').trim();
  const initial = name ? name.charAt(0).toUpperCase() : '?';
  ['av-preview', 'bar-av'].forEach(id => {
    const el = $(id); if (!el) return;
    if (av) { el.style.backgroundImage = `url(${av})`; el.textContent = ''; }
    else { el.style.backgroundImage = ''; el.textContent = initial; }
  });
}

// ─── 入会日 ───
function ensureJoinDate() {
  let j = localStorage.getItem(LS_JOIN);
  if (!j) { j = String(Date.now()); localStorage.setItem(LS_JOIN, j); }
  return parseInt(j, 10);
}

// ─── ホーム ───
function renderHome() {
  const name = (localStorage.getItem(LS_NAME) || '').trim() || 'ゲスト';
  $('hero-name').textContent = name;
  const goal = (localStorage.getItem(LS_GOAL) || '').trim();
  $('goal-text').textContent = goal || '目標を設定してください';
  renderPick();
  renderRecentTips();
}

// ─── Today's Pick ───
function pickIndexForToday() {
  if (typeof TIPS === 'undefined' || !TIPS.length) return 0;
  const d = new Date();
  const seed = d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate();
  return seed % TIPS.length;
}
function renderPick() {
  if (typeof TIPS === 'undefined' || !TIPS.length) return;
  const idx = pickIndexForToday();
  const tip = TIPS[idx];
  const cat = CATS[tip.cat] || { label: tip.cat, color: 'var(--t2)' };
  const card = $('pick-card');

  // サムネ
  const thumbEl = $('pick-thumb');
  if (thumbEl) {
    if (tip.thumb) {
      thumbEl.style.backgroundImage = `url("${tip.thumb}")`;
      thumbEl.style.display = 'block';
    } else {
      thumbEl.style.display = 'none';
    }
  }

  $('pick-num').textContent = String(idx + 1).padStart(2, '0') + ' / ' + String(TIPS.length).padStart(2, '0');
  $('pick-tag').textContent = cat.label;
  $('pick-tag').style.color = cat.color;
  $('pick-meta').textContent = metaLabel(tip);
  $('pick-title').textContent = tip.title;
  $('pick-preview').textContent = listPreview(tip, 100);
  $('pick-cta').textContent = isExternal(tip) ? '記事を開く' : '続きを読む';
  card.dataset.tipId = tip.id;
}
function openPick() {
  const id = parseInt($('pick-card').dataset.tipId, 10);
  if (id) openTip(id);
}

// ─── Recent Tips (home feed — list style) ───
function renderRecentTips() {
  if (typeof TIPS === 'undefined' || !TIPS.length) return;
  const wrap = $('recent-tips');
  wrap.innerHTML = '';
  const container = document.createElement('div');
  container.className = 'feed-list';
  const list = TIPS.slice().sort((a, b) => b.id - a.id).slice(0, 4);
  list.forEach((tip, i) => {
    const cat = CATS[tip.cat] || { label: tip.cat, color: 'var(--t3)' };
    const ext = isExternal(tip);
    const el = document.createElement('button');
    el.className = 'feed-item rise';
    el.style.animationDelay = (i * 50) + 'ms';
    el.onclick = () => openTip(tip.id);
    el.innerHTML = `
      <div class="feed-item-body">
        <div class="feed-item-meta">
          <span class="feed-item-cat" style="color:${cat.color}">${escapeHtml(cat.label)}</span>
          <span class="feed-item-min">${metaLabel(tip)}</span>
          ${tip.isNew ? '<span class="feed-item-new">NEW</span>' : ''}
        </div>
        <p class="feed-item-title">${escapeHtml(tip.title)}</p>
      </div>
      <span class="feed-item-arrow">
        ${ext
          ? '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>'
          : '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>'
        }
      </span>
    `;
    container.appendChild(el);
  });
  wrap.appendChild(container);
}

// ─── Tips フィルタ ───
function renderFilters() {
  const row = $('filter-row'); if (!row) return;
  row.innerHTML = '';
  const all = document.createElement('button');
  all.className = 'chip' + (activeFilter === 'all' ? ' active' : '');
  all.textContent = 'すべて';
  all.onclick = () => setFilter('all');
  row.appendChild(all);
  Object.keys(CATS).forEach(key => {
    const b = document.createElement('button');
    b.className = 'chip' + (activeFilter === key ? ' active' : '');
    b.textContent = CATS[key].label;
    b.onclick = () => setFilter(key);
    row.appendChild(b);
  });
}
function setFilter(key) { activeFilter = key; renderFilters(); renderTips(); }

// ─── Tips リスト ───
function renderTips() {
  if (typeof TIPS === 'undefined') return;
  const list = $('tips-list');
  const empty = $('tips-empty');
  const q = ($('tip-search')?.value || '').trim().toLowerCase();
  const clearBtn = $('search-clear');
  if (clearBtn) clearBtn.classList.toggle('show', q.length > 0);

  let items = TIPS.slice().sort((a, b) => b.id - a.id);
  if (activeFilter !== 'all') items = items.filter(t => t.cat === activeFilter);
  if (q) items = items.filter(t =>
    t.title.toLowerCase().includes(q) ||
    (t.body || '').toLowerCase().includes(q) ||
    (t.week || '').toLowerCase().includes(q)
  );

  list.innerHTML = '';
  if (!items.length) { empty.style.display = 'block'; return; }
  empty.style.display = 'none';

  items.forEach((tip, i) => {
    const cat = CATS[tip.cat] || { label: tip.cat, color: 'var(--t3)' };
    const ext = isExternal(tip);
    const el = document.createElement('button');
    el.className = 'tip-card rise' + (tip.thumb ? ' has-thumb' : '');
    el.style.animationDelay = Math.min(i * 45, 360) + 'ms';
    el.onclick = () => openTip(tip.id);
    el.innerHTML = `
      ${tip.thumb ? `<span class="tip-thumb" style="background-image:url('${escapeHtml(tip.thumb)}')"></span>` : ''}
      <div class="tip-card-body">
        <div class="tip-meta-row">
          <span class="tip-cat" style="color:${cat.color}">${escapeHtml(cat.label)}</span>
          <span class="tip-min">${metaLabel(tip)}</span>
          ${tip.isNew ? '<span class="tip-new">NEW</span>' : ''}
        </div>
        <p class="tip-title">${escapeHtml(tip.title)}</p>
        <p class="tip-preview">${escapeHtml(listPreview(tip, 80))}</p>
      </div>
      <span class="tip-card-arrow">
        ${ext
          ? '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>'
          : '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>'
        }
      </span>
    `;
    list.appendChild(el);
  });
}
function clearSearch() {
  const el = $('tip-search'); if (!el) return;
  el.value = ''; renderTips(); el.focus();
}

// ─── Tip シート / 外部リンク ───
function openTip(id) {
  const tip = (typeof TIPS !== 'undefined') ? TIPS.find(t => t.id === id) : null;
  if (!tip) return;

  // 外部記事リンクの場合は新しいタブで開く
  if (isExternal(tip)) {
    window.open(tip.link, '_blank', 'noopener');
    return;
  }

  const cat = CATS[tip.cat] || { label: tip.cat, color: 'var(--t3)' };
  $('tip-content').innerHTML = `
    ${tip.thumb ? `<div class="sheet-thumb" style="background-image:url('${escapeHtml(tip.thumb)}')"></div>` : ''}
    <span class="sheet-cat" style="color:${cat.color}">${escapeHtml(cat.label)}</span>
    <h1 class="sheet-h1">${escapeHtml(tip.title)}</h1>
    <div class="sheet-meta">
      <span class="sheet-meta-item">${escapeHtml(String(tip.week || '—'))}</span>
      <span class="sheet-meta-item">${readMinutes(tip.body)} MIN READ</span>
      <span class="sheet-meta-item">#${String(tip.id).padStart(3, '0')}</span>
    </div>
    ${renderBody(tip.body)}
  `;
  $('tip-overlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeTip(e) {
  if (e && e.target.closest('.sheet')) return;
  $('tip-overlay').classList.remove('open');
  document.body.style.overflow = '';
}

// ─── ページ切替 ───
let currentPage = 'home';
function goPage(p) {
  if (p === currentPage && document.querySelector('.page.active')) {
    // 同じタブ再タップ：トップへスクロールのみ
    $('scroll-area').scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }
  currentPage = p;

  // 光のラインを走らせる
  fireSweep();

  document.querySelectorAll('.page').forEach(el => el.classList.remove('active'));
  const target = $('page-' + p);
  if (target) {
    target.classList.add('active');
    // ステガード（時間差）アニメを再起動
    restagger(target);
  }
  document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
  const navBtn = $('nav-' + p);
  if (navBtn) navBtn.classList.add('active');
  $('scroll-area').scrollTo(0, 0);
  if (p === 'home') renderHome();
  if (p === 'tips') renderTips();
  if (p === 'settings') prefill();
}

// 光のラインエフェクト（アプリバー直下を一瞬ウィンと走る）
function fireSweep() {
  const sweep = $('sweep');
  if (!sweep) return;
  sweep.classList.remove('run');
  // reflow を強制してアニメを再発火
  void sweep.offsetWidth;
  sweep.classList.add('run');
}

// ページ内の要素を時間差でフェードイン
function restagger(page) {
  const items = page.querySelectorAll('[data-stagger]');
  items.forEach((el, i) => {
    el.style.animation = 'none';
    void el.offsetWidth;
    el.style.animation = '';
    el.style.animationDelay = (i * 55) + 'ms';
  });
}

// ─── 予約セグメント ───
function switchProgram(n) {
  for (let i = 1; i <= 3; i++) {
    const tab = $(`prog-tab-${i}`);
    const panel = $(`ycbm-panel-${i}`);
    if (tab) tab.classList.toggle('active', i === n);
    if (panel) panel.style.display = (i === n ? 'block' : 'none');
  }
  const thumb = $('seg-thumb');
  if (thumb) thumb.style.transform = `translateX(${(n - 1) * 100}%)`;
}

// ─── 設定 ───
function prefill() {
  if ($('settings-name')) $('settings-name').value = localStorage.getItem(LS_NAME) || '';
  if ($('settings-goal')) $('settings-goal').value = localStorage.getItem(LS_GOAL) || '';
  applyAvatar();
}
function saveAll() {
  const n = ($('settings-name')?.value || '').trim();
  const g = ($('settings-goal')?.value || '').trim();
  localStorage.setItem(LS_NAME, n);
  localStorage.setItem(LS_GOAL, g);
  applyAvatar();
  toast('保存しました');
  renderHome();
}

// ─── アバター crop ───
let cropImg = null, cropScale = 1, cropX = 0, cropY = 0, dragLast = null, pinchLast = 0;

function onAvatarFileSelected(e) {
  const f = e.target.files && e.target.files[0];
  if (!f) return;
  const r = new FileReader();
  r.onload = ev => {
    const img = new Image();
    img.onload = () => { cropImg = img; cropScale = 1; cropX = 0; cropY = 0; $('crop-panel').classList.add('open'); requestAnimationFrame(setupCrop); };
    img.src = ev.target.result;
  };
  r.readAsDataURL(f);
  e.target.value = '';
}
function setupCrop() {
  const stage = $('crop-stage'), canvas = $('crop-canvas');
  canvas.width = stage.clientWidth; canvas.height = stage.clientHeight;
  fitCrop(); drawCrop(); bindCropEvents();
}
function fitCrop() {
  if (!cropImg) return;
  const c = $('crop-canvas');
  cropScale = (cropImg.width / cropImg.height > c.width / c.height) ? c.height / cropImg.height : c.width / cropImg.width;
  cropX = (c.width - cropImg.width * cropScale) / 2;
  cropY = (c.height - cropImg.height * cropScale) / 2;
}
function drawCrop() {
  const c = $('crop-canvas'); if (!c || !cropImg) return;
  const ctx = c.getContext('2d');
  ctx.fillStyle = '#000'; ctx.fillRect(0, 0, c.width, c.height);
  ctx.drawImage(cropImg, cropX, cropY, cropImg.width * cropScale, cropImg.height * cropScale);
}
function bindCropEvents() {
  const c = $('crop-canvas');
  c.onpointerdown = e => { dragLast = { x: e.clientX, y: e.clientY }; c.setPointerCapture(e.pointerId); };
  c.onpointermove = e => {
    if (!dragLast) return;
    cropX += e.clientX - dragLast.x; cropY += e.clientY - dragLast.y;
    dragLast = { x: e.clientX, y: e.clientY }; drawCrop();
  };
  c.onpointerup = c.onpointercancel = () => dragLast = null;
  c.onwheel = e => { e.preventDefault(); zoomCrop(e.deltaY < 0 ? 1.06 : 0.94, c.width / 2, c.height / 2); };
  c.ontouchstart = e => { if (e.touches.length === 2) pinchLast = Math.hypot(e.touches[0].clientX - e.touches[1].clientX, e.touches[0].clientY - e.touches[1].clientY); };
  c.ontouchmove = e => {
    if (e.touches.length !== 2) return;
    e.preventDefault();
    const d = Math.hypot(e.touches[0].clientX - e.touches[1].clientX, e.touches[0].clientY - e.touches[1].clientY);
    if (pinchLast) { zoomCrop(d / pinchLast, c.width / 2, c.height / 2); pinchLast = d; }
  };
}
function zoomCrop(f, cx, cy) {
  const ns = Math.min(8, Math.max(0.2, cropScale * f)), r = ns / cropScale;
  cropX = cx - (cx - cropX) * r; cropY = cy - (cy - cropY) * r; cropScale = ns; drawCrop();
}
function cancelCrop() { $('crop-panel').classList.remove('open'); cropImg = null; }
function saveCrop() {
  const c = $('crop-canvas'); if (!c) return;
  const out = document.createElement('canvas');
  out.width = out.height = 320;
  out.getContext('2d').drawImage(c, 0, 0, c.width, c.height, 0, 0, 320, 320);
  localStorage.setItem(LS_AV, out.toDataURL('image/jpeg', 0.85));
  applyAvatar(); $('crop-panel').classList.remove('open'); cropImg = null;
  toast('プロフィール写真を更新しました');
}

// ─── 起動 ───
window.addEventListener('DOMContentLoaded', () => {
  ensureJoinDate();
  applyAvatar();
  prefill();
  renderHome();
  renderFilters();
  renderTips();
  switchProgram(1);

  // 初回ロードの登場演出
  const home = $('page-home');
  if (home) restagger(home);
  fireSweep();
});
