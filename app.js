// ════════════════════════════════════════════════════════════
//   XECTOR1 Member Portal — Native App v4
// ════════════════════════════════════════════════════════════

const LS_NAME = 'xector1_name';
const LS_GOAL = 'xector1_goal';
const LS_AV   = 'xector1_av';
const LS_JOIN = 'xector1_joined';

// カテゴリ表示テーブル
const CATS = {
  content:   { label:'コンテンツ',     color:'var(--cat-content)' },
  algorithm: { label:'アルゴリズム',   color:'var(--cat-algorithm)' },
  growth:    { label:'成長戦略',       color:'var(--cat-growth)' },
  mindset:   { label:'マインドセット', color:'var(--cat-mindset)' },
  collab:    { label:'コラボ',         color:'var(--cat-collab)' },
};

let activeFilter = 'all';

// ─── ユーティリティ ───
function $(id){ return document.getElementById(id); }
function escapeHtml(s){ return String(s||'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }
function readMinutes(text){ return Math.max(1, Math.round((text||'').length / 400)); }
function previewOf(text, n){
  const flat = (text||'').replace(/^[■・]\s*/gm,'').replace(/\n+/g,' ').trim();
  return flat.slice(0, n||80);
}

// ─── 簡易マークダウン パーサ ───
function renderBody(body){
  const lines = (body || '').split('\n');
  let html = '';
  let buf = [];
  let inList = false;

  const flushPara = ()=>{
    if (buf.length){
      html += `<p class="sheet-p">${escapeHtml(buf.join(' '))}</p>`;
      buf = [];
    }
  };
  const closeList = ()=>{
    if (inList){ html += '</div>'; inList = false; }
  };

  for (let raw of lines){
    const line = raw.trim();
    if (!line){ flushPara(); closeList(); continue; }

    if (line.startsWith('■')){
      flushPara(); closeList();
      const text = line.replace(/^■\s*/,'');
      html += `<h3 class="sheet-h">${escapeHtml(text)}</h3>`;
      continue;
    }

    if (line.startsWith('・')){
      flushPara();
      if (!inList){ html += '<div class="sheet-ul">'; inList = true; }
      const text = line.replace(/^・\s*/,'');
      html += `<div class="sheet-li">${escapeHtml(text)}</div>`;
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
function toast(msg){
  const el = $('toast');
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(()=> el.classList.remove('show'), 2200);
}

// ─── アバター適用 ───
function applyAvatar(){
  const av = localStorage.getItem(LS_AV);
  const name = (localStorage.getItem(LS_NAME) || '').trim();
  const initial = name ? name.charAt(0).toUpperCase() : '?';
  const targets = ['av-preview','bar-av'];
  targets.forEach(id=>{
    const el = $(id); if (!el) return;
    if (av){
      el.style.backgroundImage = `url(${av})`;
      el.textContent = '';
    } else {
      el.style.backgroundImage = '';
      el.textContent = initial;
    }
  });
}

// ─── 入会日数 ───
function ensureJoinDate(){
  let j = localStorage.getItem(LS_JOIN);
  if (!j){
    j = String(Date.now());
    localStorage.setItem(LS_JOIN, j);
  }
  return parseInt(j, 10);
}
function daysAsMember(){
  const j = ensureJoinDate();
  return Math.max(1, Math.floor((Date.now() - j) / (1000*60*60*24)) + 1);
}

// ─── ホーム描画 ───
function renderHome(){
  const name = (localStorage.getItem(LS_NAME) || '').trim() || 'ゲスト';
  $('hero-name').textContent = name;
  $('hero-days').textContent = daysAsMember();
  $('hero-tips-count').textContent = (typeof TIPS !== 'undefined' ? TIPS.length : 0);

  const goal = (localStorage.getItem(LS_GOAL) || '').trim();
  $('goal-text').textContent = goal || 'タップして目標を設定';

  renderPick();
  renderRecentTips();
}

// ─── Today's Pick ───
function pickIndexForToday(){
  if (typeof TIPS === 'undefined' || !TIPS.length) return 0;
  const d = new Date();
  const seed = d.getFullYear()*10000 + (d.getMonth()+1)*100 + d.getDate();
  return seed % TIPS.length;
}
function renderPick(){
  if (typeof TIPS === 'undefined' || !TIPS.length) return;
  const idx = pickIndexForToday();
  const tip = TIPS[idx];
  const cat = CATS[tip.cat] || { label: tip.cat, color: 'var(--lime)' };

  $('pick-num').textContent = String(idx+1).padStart(2,'0') + ' / ' + String(TIPS.length).padStart(2,'0');
  $('pick-tag').textContent = cat.label;
  $('pick-tag').style.color = cat.color;
  $('pick-meta').textContent = `${readMinutes(tip.body)} MIN READ`;
  $('pick-title').textContent = tip.title;
  $('pick-preview').textContent = previewOf(tip.body, 100);
  $('pick-stripe').style.background = cat.color;

  $('pick-card').dataset.tipId = tip.id;
}
function openPick(){
  const id = parseInt($('pick-card').dataset.tipId, 10);
  if (id) openTip(id);
}

// ─── 最近のTips ───
function renderRecentTips(){
  if (typeof TIPS === 'undefined' || !TIPS.length) return;
  const wrap = $('recent-tips'); wrap.innerHTML = '';
  const list = TIPS.slice().sort((a,b)=> b.id - a.id).slice(0, 4);
  list.forEach(tip=>{
    const cat = CATS[tip.cat] || { label: tip.cat, color: 'var(--lime)' };
    const el = document.createElement('button');
    el.className = 'feed-card';
    el.onclick = ()=> openTip(tip.id);
    el.innerHTML = `
      <span class="feed-stripe" style="background:${cat.color}"></span>
      <div class="feed-body">
        <div class="feed-meta-row">
          <span class="feed-cat" style="color:${cat.color}">${escapeHtml(cat.label)}</span>
          <span class="feed-min">${readMinutes(tip.body)} MIN</span>
          ${tip.isNew ? '<span class="feed-new">NEW</span>' : ''}
        </div>
        <p class="feed-title">${escapeHtml(tip.title)}</p>
      </div>
    `;
    wrap.appendChild(el);
  });
}

// ─── Tipsページ：フィルタchip ───
function renderFilters(){
  const row = $('filter-row');
  if (!row) return;
  row.innerHTML = '';
  const all = document.createElement('button');
  all.className = 'chip' + (activeFilter==='all' ? ' active' : '');
  all.textContent = 'すべて';
  all.onclick = ()=> setFilter('all');
  row.appendChild(all);
  Object.keys(CATS).forEach(key=>{
    const b = document.createElement('button');
    b.className = 'chip' + (activeFilter===key ? ' active' : '');
    b.textContent = CATS[key].label;
    b.onclick = ()=> setFilter(key);
    row.appendChild(b);
  });
}
function setFilter(key){
  activeFilter = key;
  renderFilters();
  renderTips();
}

// ─── Tipsページ：リスト ───
function renderTips(){
  if (typeof TIPS === 'undefined') return;
  const list = $('tips-list');
  const empty = $('tips-empty');
  const q = ($('tip-search')?.value || '').trim().toLowerCase();
  const clearBtn = $('search-clear');
  if (clearBtn) clearBtn.classList.toggle('show', q.length > 0);

  let items = TIPS.slice().sort((a,b)=> b.id - a.id);
  if (activeFilter !== 'all') items = items.filter(t => t.cat === activeFilter);
  if (q) items = items.filter(t =>
    t.title.toLowerCase().includes(q) || (t.body||'').toLowerCase().includes(q)
  );

  list.innerHTML = '';
  if (!items.length){
    empty.style.display = 'block';
    return;
  }
  empty.style.display = 'none';

  items.forEach(tip=>{
    const cat = CATS[tip.cat] || { label: tip.cat, color: 'var(--lime)' };
    const el = document.createElement('button');
    el.className = 'tip-card';
    el.onclick = ()=> openTip(tip.id);
    el.innerHTML = `
      <span class="tip-stripe" style="background:${cat.color}"></span>
      <div class="tip-body">
        <div class="tip-meta-row">
          <span class="tip-cat" style="color:${cat.color}">${escapeHtml(cat.label)}</span>
          <span class="tip-min">${readMinutes(tip.body)} MIN READ</span>
          ${tip.isNew ? '<span class="tip-new">NEW</span>' : ''}
        </div>
        <p class="tip-title">${escapeHtml(tip.title)}</p>
        <p class="tip-preview">${escapeHtml(previewOf(tip.body, 90))}</p>
      </div>
    `;
    list.appendChild(el);
  });
}
function clearSearch(){
  const el = $('tip-search'); if (!el) return;
  el.value = '';
  renderTips();
  el.focus();
}

// ─── Tip シート ───
function openTip(id){
  const tip = (typeof TIPS !== 'undefined') ? TIPS.find(t => t.id === id) : null;
  if (!tip) return;
  const cat = CATS[tip.cat] || { label: tip.cat, color: 'var(--lime)' };

  $('tip-content').innerHTML = `
    <span class="sheet-cat" style="color:${cat.color}">${escapeHtml(cat.label)}</span>
    <h1 class="sheet-h1">${escapeHtml(tip.title)}</h1>
    <div class="sheet-meta">
      <span class="sheet-meta-item">${escapeHtml(String(tip.week||'—'))}</span>
      <span class="sheet-meta-item">${readMinutes(tip.body)} MIN READ</span>
      <span class="sheet-meta-item">#${String(tip.id).padStart(3,'0')}</span>
    </div>
    ${renderBody(tip.body)}
  `;

  const ov = $('tip-overlay');
  ov.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeTip(e){
  if (e && e.target.closest('.sheet')) return;
  $('tip-overlay').classList.remove('open');
  document.body.style.overflow = '';
}

// ─── ページ切り替え ───
function goPage(p){
  document.querySelectorAll('.page').forEach(el=> el.classList.remove('active'));
  const target = $('page-'+p);
  if (target) target.classList.add('active');

  document.querySelectorAll('.nav-item').forEach(el=> el.classList.remove('active'));
  const navBtn = $('nav-'+p);
  if (navBtn) navBtn.classList.add('active');

  $('scroll-area').scrollTo(0,0);

  if (p === 'home') renderHome();
  if (p === 'tips') renderTips();
  if (p === 'settings') prefill();
}

// ─── 予約ページ：プログラム切り替え（segmented control） ───
function switchProgram(n){
  for (let i=1; i<=3; i++){
    const tab = $(`prog-tab-${i}`);
    const panel = $(`ycbm-panel-${i}`);
    if (tab) tab.classList.toggle('active', i===n);
    if (panel) panel.style.display = (i===n ? 'block' : 'none');
  }
  // segmented thumb 動かす
  const thumb = $('seg-thumb');
  if (thumb){
    thumb.style.transform = `translateX(${(n-1)*100}%)`;
  }
}

// ─── 設定 prefill ───
function prefill(){
  const n = localStorage.getItem(LS_NAME) || '';
  const g = localStorage.getItem(LS_GOAL) || '';
  if ($('settings-name')) $('settings-name').value = n;
  if ($('settings-goal')) $('settings-goal').value = g;
  applyAvatar();
}
function saveAll(){
  const n = ($('settings-name')?.value || '').trim();
  const g = ($('settings-goal')?.value || '').trim();
  localStorage.setItem(LS_NAME, n);
  localStorage.setItem(LS_GOAL, g);
  applyAvatar();
  toast('保存しました');
  renderHome();
}

// ─── アバター crop ───
let cropImg = null;
let cropScale = 1;
let cropX = 0, cropY = 0;
let dragLast = null;
let pinchLast = 0;

function onAvatarFileSelected(e){
  const f = e.target.files && e.target.files[0];
  if (!f) return;
  const r = new FileReader();
  r.onload = ev => {
    const img = new Image();
    img.onload = ()=> {
      cropImg = img;
      cropScale = 1; cropX = 0; cropY = 0;
      $('crop-panel').classList.add('open');
      requestAnimationFrame(setupCrop);
    };
    img.src = ev.target.result;
  };
  r.readAsDataURL(f);
  e.target.value = '';
}
function setupCrop(){
  const stage = $('crop-stage');
  const canvas = $('crop-canvas');
  const w = stage.clientWidth, h = stage.clientHeight;
  canvas.width = w; canvas.height = h;
  fitCrop();
  drawCrop();
  bindCropEvents();
}
function fitCrop(){
  if (!cropImg) return;
  const c = $('crop-canvas');
  const cw = c.width, ch = c.height;
  const ir = cropImg.width / cropImg.height;
  const cr = cw / ch;
  if (ir > cr){
    cropScale = ch / cropImg.height;
  } else {
    cropScale = cw / cropImg.width;
  }
  cropX = (cw - cropImg.width*cropScale) / 2;
  cropY = (ch - cropImg.height*cropScale) / 2;
}
function drawCrop(){
  const c = $('crop-canvas'); if (!c || !cropImg) return;
  const ctx = c.getContext('2d');
  ctx.fillStyle = '#000';
  ctx.fillRect(0,0,c.width,c.height);
  ctx.drawImage(cropImg, cropX, cropY, cropImg.width*cropScale, cropImg.height*cropScale);
}
function bindCropEvents(){
  const c = $('crop-canvas');
  c.onpointerdown = e => { dragLast = {x:e.clientX, y:e.clientY}; c.setPointerCapture(e.pointerId); };
  c.onpointermove = e => {
    if (!dragLast) return;
    cropX += e.clientX - dragLast.x;
    cropY += e.clientY - dragLast.y;
    dragLast = {x:e.clientX, y:e.clientY};
    drawCrop();
  };
  c.onpointerup = ()=> dragLast = null;
  c.onpointercancel = ()=> dragLast = null;

  c.onwheel = e => {
    e.preventDefault();
    const f = e.deltaY < 0 ? 1.06 : 0.94;
    zoomCrop(f, c.width/2, c.height/2);
  };

  let touching = [];
  c.ontouchstart = e => {
    if (e.touches.length === 2){
      const a = e.touches[0], b = e.touches[1];
      pinchLast = Math.hypot(a.clientX-b.clientX, a.clientY-b.clientY);
    }
  };
  c.ontouchmove = e => {
    if (e.touches.length === 2){
      e.preventDefault();
      const a = e.touches[0], b = e.touches[1];
      const d = Math.hypot(a.clientX-b.clientX, a.clientY-b.clientY);
      if (pinchLast){
        const f = d / pinchLast;
        zoomCrop(f, c.width/2, c.height/2);
        pinchLast = d;
      }
    }
  };
}
function zoomCrop(f, cx, cy){
  const newScale = Math.min(8, Math.max(0.2, cropScale * f));
  const ratio = newScale / cropScale;
  cropX = cx - (cx - cropX) * ratio;
  cropY = cy - (cy - cropY) * ratio;
  cropScale = newScale;
  drawCrop();
}
function cancelCrop(){
  $('crop-panel').classList.remove('open');
  cropImg = null;
}
function saveCrop(){
  const c = $('crop-canvas'); if (!c) return;
  const out = document.createElement('canvas');
  out.width = 320; out.height = 320;
  const oc = out.getContext('2d');
  oc.drawImage(c, 0, 0, c.width, c.height, 0, 0, 320, 320);
  const dataUrl = out.toDataURL('image/jpeg', 0.85);
  localStorage.setItem(LS_AV, dataUrl);
  applyAvatar();
  $('crop-panel').classList.remove('open');
  cropImg = null;
  toast('プロフィール写真を更新');
}

// ─── 起動 ───
window.addEventListener('DOMContentLoaded', ()=>{
  ensureJoinDate();
  applyAvatar();
  prefill();
  renderHome();
  renderFilters();
  renderTips();
  switchProgram(1);
});
