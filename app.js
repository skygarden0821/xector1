// ════════════════════════════════════════════════════════════
//  app.js — XECTOR1 MEMBER PORTAL
//  Tipsの追加・修正は tips-data.js を編集してください
// ════════════════════════════════════════════════════════════

const MEMBER = {
  name:   'メンバー',
  short:  'メンバー',
  since:  '2024-11-01',
  goal:   '',
  avatar: null
};

// ─── カテゴリ定義（ラベル・色） ───
const CATS = {
  content:   { label: 'コンテンツ',     color: 'var(--cat-content)'   },
  algorithm: { label: 'アルゴリズム',   color: 'var(--cat-algorithm)' },
  growth:    { label: '成長戦略',       color: 'var(--cat-growth)'    },
  mindset:   { label: 'マインドセット', color: 'var(--cat-mindset)'   },
  collab:    { label: 'コラボ',         color: 'var(--cat-collab)'    },
};

let activeFilter = 'all';

// ════════════════════════════════════════════════════════════
//  STORAGE
// ════════════════════════════════════════════════════════════
function loadStorage() {
  try {
    const n = localStorage.getItem('x1_name');
    if (n) {
      MEMBER.name = n;
      MEMBER.short = n.split(/[\s　]/)[0] || n;
    }
    const g = localStorage.getItem('x1_goal');
    if (g) MEMBER.goal = g;
    const a = localStorage.getItem('x1_avatar');
    if (a) MEMBER.avatar = a;
    const s = localStorage.getItem('x1_since');
    if (s) MEMBER.since = s;
    else localStorage.setItem('x1_since', MEMBER.since);
  } catch (_) {}
}

function saveName() {
  const v = document.getElementById('settings-name').value.trim();
  if (!v) { toast('名前を入力してください'); return; }
  MEMBER.name  = v;
  MEMBER.short = v.split(/[\s　]/)[0] || v;
  try { localStorage.setItem('x1_name', v); } catch (_) {}
  document.getElementById('topbar-member').textContent = MEMBER.name;
  document.getElementById('home-name').innerHTML =
    MEMBER.short + '<span class="hero-san">さん</span>';
  toast('名前を保存しました');
}

function saveGoal() {
  const v = document.getElementById('settings-goal').value.trim();
  if (!v) { toast('目標を入力してください'); return; }
  MEMBER.goal = v;
  try { localStorage.setItem('x1_goal', v); } catch (_) {}
  document.getElementById('goal-text').textContent = v;
  toast('目標を保存しました');
}

// ════════════════════════════════════════════════════════════
//  AVATAR (Crop)
// ════════════════════════════════════════════════════════════
let crop = { img: null, x: 0, y: 0, scale: 1, drag: false, lx: 0, ly: 0 };

function applyAvatar(url) {
  MEMBER.avatar = url;
  ['topbar-av', 'home-av', 'av-preview'].forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    el.innerHTML = url
      ? `<img src="${url}" alt="">`
      : (MEMBER.short[0] || '?');
  });
}

function onAvatarFileSelected(e) {
  const f = e.target.files[0];
  if (!f) return;
  const r = new FileReader();
  r.onload = ev => {
    const img = new Image();
    img.onload = () => {
      crop = { img, x: 0, y: 0, scale: 1, drag: false, lx: 0, ly: 0 };
      document.getElementById('crop-panel').classList.add('open');
      drawCrop();
    };
    img.src = ev.target.result;
  };
  r.readAsDataURL(f);
}

function drawCrop() {
  const stage  = document.getElementById('crop-stage');
  const canvas = document.getElementById('crop-canvas');
  const size   = stage.offsetWidth;
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, size, size);
  ctx.save();
  ctx.beginPath();
  ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
  ctx.clip();
  ctx.fillStyle = '#1a1a1a';
  ctx.fillRect(0, 0, size, size);
  if (crop.img) {
    const iw = crop.img.width  * crop.scale;
    const ih = crop.img.height * crop.scale;
    crop.x = Math.min(0, Math.max(size - iw, crop.x));
    crop.y = Math.min(0, Math.max(size - ih, crop.y));
    ctx.drawImage(crop.img, crop.x, crop.y, iw, ih);
  }
  ctx.restore();
  ctx.strokeStyle = 'rgba(212,255,61,.7)';
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.arc(size / 2, size / 2, size / 2 - 1.5, 0, Math.PI * 2);
  ctx.stroke();
}

(function () {
  let pend = false, ld = 0;
  function bind() {
    const c = document.getElementById('crop-canvas');
    if (!c) return;
    const s = (x, y) => { crop.drag = true; crop.lx = x; crop.ly = y; };
    const m = (x, y) => {
      if (!crop.drag) return;
      crop.x += x - crop.lx;
      crop.y += y - crop.ly;
      crop.lx = x; crop.ly = y;
      if (!pend) {
        pend = true;
        requestAnimationFrame(() => { drawCrop(); pend = false; });
      }
    };
    const e = () => { crop.drag = false; };
    c.addEventListener('mousedown',  ev => s(ev.clientX, ev.clientY));
    c.addEventListener('mousemove',  ev => m(ev.clientX, ev.clientY));
    c.addEventListener('mouseup',   e);
    c.addEventListener('mouseleave', e);
    c.addEventListener('touchstart', ev => {
      const t = ev.touches[0]; s(t.clientX, t.clientY);
    }, { passive: true });
    c.addEventListener('touchmove', ev => {
      if (ev.touches.length === 2) {
        const dx = ev.touches[0].clientX - ev.touches[1].clientX;
        const dy = ev.touches[0].clientY - ev.touches[1].clientY;
        const d  = Math.sqrt(dx * dx + dy * dy);
        if (ld) crop.scale = Math.max(0.5, Math.min(4, crop.scale * (d / ld)));
        ld = d;
        drawCrop();
      } else {
        ld = 0;
        const t = ev.touches[0];
        m(t.clientX, t.clientY);
      }
      ev.preventDefault();
    }, { passive: false });
    c.addEventListener('touchend', () => { ld = 0; e(); });
    c.addEventListener('wheel', ev => {
      crop.scale = Math.max(0.5, Math.min(4, crop.scale * (ev.deltaY < 0 ? 1.08 : 0.93)));
      drawCrop();
      ev.preventDefault();
    }, { passive: false });
  }
  document.readyState === 'loading'
    ? document.addEventListener('DOMContentLoaded', bind)
    : bind();
})();

function cancelCrop() {
  document.getElementById('crop-panel').classList.remove('open');
  document.getElementById('av-input').value = '';
}

function saveCrop() {
  const url = document.getElementById('crop-canvas').toDataURL('image/jpeg', 0.88);
  applyAvatar(url);
  try { localStorage.setItem('x1_avatar', url); } catch (_) {}
  cancelCrop();
  toast('アイコンを保存しました');
}

// ════════════════════════════════════════════════════════════
//  TIPS
// ════════════════════════════════════════════════════════════

// 本文の簡易マークアップを HTML に変換
//   ■ 見出し  → <h3 class="sheet-h">
//   ・項目   → <ul><li>
//   空行     → 段落区切り
//   その他   → <p>
function renderBody(body) {
  const lines = body.split('\n');
  let html = '';
  let inList = false;
  let buffer = [];

  const flushBuffer = () => {
    if (buffer.length) {
      html += `<p class="sheet-p">${buffer.join('<br>')}</p>`;
      buffer = [];
    }
  };
  const flushList = () => {
    if (inList) { html += '</ul>'; inList = false; }
  };

  for (const raw of lines) {
    const line = raw.trim();
    if (!line) {
      flushBuffer();
      flushList();
      continue;
    }
    if (line.startsWith('■')) {
      flushBuffer();
      flushList();
      html += `<h3 class="sheet-h">${escapeHtml(line.slice(1).trim())}</h3>`;
    } else if (line.startsWith('・')) {
      flushBuffer();
      if (!inList) { html += '<ul class="sheet-ul">'; inList = true; }
      html += `<li>${escapeHtml(line.slice(1).trim())}</li>`;
    } else {
      if (inList) flushList();
      buffer.push(escapeHtml(line));
    }
  }
  flushBuffer();
  flushList();
  return html;
}

function escapeHtml(s) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// 推定読了時間（日本語400文字/分）
function readMinutes(body) {
  const chars = body.replace(/\s/g, '').length;
  return Math.max(1, Math.round(chars / 400));
}

// 1行プレビュー（本文の最初の文）
function previewOf(body) {
  const first = body.split('\n').find(l => l.trim() && !l.startsWith('■') && !l.startsWith('・'));
  return first ? first.trim().slice(0, 80) : '';
}

function catInfo(cat) {
  return CATS[cat] || { label: cat, color: 'var(--tx2)' };
}

// ─── フィルター ───
function setFilter(k) {
  activeFilter = k;
  renderFilters();
  renderTips();
}

function renderFilters() {
  const cats = ['all', ...Object.keys(CATS).filter(c => TIPS.some(t => t.cat === c))];
  document.getElementById('filter-row').innerHTML = cats.map(c => {
    const label = c === 'all' ? 'ALL' : catInfo(c).label;
    const active = activeFilter === c ? 'active' : '';
    return `<button class="chip ${active}" onclick="setFilter('${c}')">${escapeHtml(label)}</button>`;
  }).join('');
}

// ─── Tip リスト ───
function renderTips() {
  const list = activeFilter === 'all'
    ? TIPS
    : TIPS.filter(t => t.cat === activeFilter);

  const container = document.getElementById('tips-list');
  if (!list.length) {
    container.innerHTML = '<div class="tip-empty">該当するTipsがありません</div>';
    return;
  }

  // 1件目はフィーチャー、それ以降はリスト
  const [featured, ...rest] = list;
  const featuredHtml = `
    <button class="tip-card-featured" onclick="openTip(${featured.id})">
      <div class="tip-featured-head">
        <span class="tip-featured-tag" style="color:${catInfo(featured.cat).color}">
          <span class="tip-featured-tag-dot" style="background:${catInfo(featured.cat).color}"></span>
          ${escapeHtml(catInfo(featured.cat).label)}
        </span>
        <span class="tip-featured-num">${String(featured.id).padStart(2, '0')}</span>
      </div>
      <p class="tip-featured-title">${escapeHtml(featured.title)}</p>
      <div class="tip-featured-foot">
        <span class="tip-featured-meta">
          ${escapeHtml(featured.week)}
          <span class="tip-meta-dot"></span>
          ${readMinutes(featured.body)}分
          ${featured.isNew ? '<span class="tip-meta-dot"></span>NEW' : ''}
        </span>
        <span class="tip-featured-cta">
          READ
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
        </span>
      </div>
    </button>
  `;

  const restHtml = rest.map(t => `
    <button class="tip-card" onclick="openTip(${t.id})">
      <span class="tip-card-num">${String(t.id).padStart(2, '0')}</span>
      <div class="tip-card-body">
        <div class="tip-card-meta">
          <span class="tip-tag" style="color:${catInfo(t.cat).color}">${escapeHtml(catInfo(t.cat).label)}</span>
          <span class="tip-wk">${escapeHtml(t.week)}</span>
          ${t.isNew ? '<span class="tip-new">NEW</span>' : ''}
        </div>
        <p class="tip-title">${escapeHtml(t.title)}</p>
      </div>
      <span class="tip-card-arrow">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="9 18 15 12 9 6"/></svg>
      </span>
    </button>
  `).join('');

  container.innerHTML = featuredHtml + restHtml;
}

// ─── Tip シート ───
function openTip(id) {
  const t = TIPS.find(x => x.id === id);
  if (!t) return;
  const c = catInfo(t.cat);
  document.getElementById('tip-content').innerHTML = `
    <div class="sheet-meta-row">
      <span class="sheet-tag" style="background:color-mix(in srgb, ${c.color} 12%, transparent); color:${c.color}; border:1px solid color-mix(in srgb, ${c.color} 30%, transparent);">
        <span class="sheet-tag-dot" style="background:${c.color}"></span>
        ${escapeHtml(c.label)}
      </span>
      <span class="sheet-meta-item">${escapeHtml(t.week)}</span>
      <span class="sheet-meta-dot"></span>
      <span class="sheet-meta-item">${readMinutes(t.body)} MIN READ</span>
      <span class="sheet-week">#${String(t.id).padStart(2, '0')}</span>
    </div>
    <h2 class="sheet-title">${escapeHtml(t.title)}</h2>
    <div class="sheet-body">${renderBody(t.body)}</div>
    <button class="sheet-cta" onclick="closeTip()">理解した — 実践する</button>
  `;
  document.getElementById('tip-overlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeTip(e) {
  if (!e || e.target === document.getElementById('tip-overlay')) {
    document.getElementById('tip-overlay').classList.remove('open');
    document.body.style.overflow = '';
  }
}

// ─── HOME: TODAY'S PICK ───
let pickedTipId = null;

function renderPick() {
  if (!TIPS.length) return;
  // 日付ベースで安定的に1つ選ぶ（同じ日には同じTipが出る）
  const seed = Math.floor(new Date().getTime() / 86400000);
  const tip = TIPS[seed % TIPS.length];
  pickedTipId = tip.id;
  const c = catInfo(tip.cat);

  document.getElementById('pick-tag').innerHTML = `
    <span class="pick-card-tag-dot" style="background:${c.color}"></span>
    <span style="color:${c.color}">${escapeHtml(c.label)}</span>
  `;
  document.getElementById('pick-title').textContent = tip.title;
  document.getElementById('pick-meta').textContent = `${tip.week} · ${readMinutes(tip.body)}分で読了`;
  document.getElementById('pick-num').textContent =
    `${String(tip.id).padStart(2, '0')} / ${String(TIPS.length).padStart(2, '0')}`;
}

function openPick() {
  if (pickedTipId) openTip(pickedTipId);
}

// ════════════════════════════════════════════════════════════
//  BOOK
// ════════════════════════════════════════════════════════════
function switchProgram(n) {
  [1, 2, 3].forEach(i => {
    document.getElementById(`prog-tab-${i}`)?.classList.toggle('active', i === n);
    const p = document.getElementById(`ycbm-panel-${i}`);
    if (p) p.style.display = i === n ? 'block' : 'none';
  });
}

// ════════════════════════════════════════════════════════════
//  NAV
// ════════════════════════════════════════════════════════════
function goPage(name) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(b => b.classList.remove('active'));
  document.getElementById(`page-${name}`)?.classList.add('active');
  document.getElementById(`nav-${name}`)?.classList.add('active');
  document.getElementById('scroll-area').scrollTo(0, 0);
  if (name === 'settings') prefill();
}

function prefill() {
  const n = document.getElementById('settings-name');
  if (n && MEMBER.name !== 'メンバー') n.value = MEMBER.name;
  const g = document.getElementById('settings-goal');
  if (g) g.value = MEMBER.goal || '';
}

// ════════════════════════════════════════════════════════════
//  INIT
// ════════════════════════════════════════════════════════════
function formatDate() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  return { date: `${y}.${m}.${dd}`, day: days[d.getDay()] };
}

function daysAsMember() {
  try {
    const since = new Date(MEMBER.since);
    const today = new Date();
    return Math.max(1, Math.floor((today - since) / 86400000));
  } catch (_) {
    return 1;
  }
}

function init() {
  // 日付スタンプ
  const { date, day } = formatDate();
  document.getElementById('hero-date').textContent = date;
  document.getElementById('hero-day').textContent = day;

  // 挨拶
  const h = new Date().getHours();
  document.getElementById('home-greeting').textContent =
    h < 12 ? 'おはようございます' : h < 18 ? 'こんにちは' : 'こんばんは';

  // 名前
  document.getElementById('home-name').innerHTML =
    MEMBER.short + '<span class="hero-san">さん</span>';
  document.getElementById('topbar-member').textContent = MEMBER.name;

  // 在籍日数
  document.getElementById('status-days').textContent = `${daysAsMember()}日目`;

  // 目標
  document.getElementById('goal-text').textContent = MEMBER.goal || '目標を設定してください';

  // アバター
  applyAvatar(MEMBER.avatar);

  // Tips
  renderFilters();
  renderTips();
  renderPick();

  // Tips統計
  document.getElementById('tips-total').textContent = String(TIPS.length).padStart(2, '0');
  const uniqueCats = new Set(TIPS.map(t => t.cat));
  document.getElementById('tips-cats').textContent = String(uniqueCats.size).padStart(2, '0');
}

function toast(msg) {
  const el = document.getElementById('toast');
  el.textContent = msg;
  el.classList.add('show');
  setTimeout(() => el.classList.remove('show'), 2400);
}

window.addEventListener('load', () => {
  loadStorage();
  init();
});
