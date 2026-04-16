// ══════════════════════════════
//  DATA
// ══════════════════════════════
const MEMBER = {
  name:   'メンバー',
  short:  'メンバー',
  since:  '2024-11-01',
  goal:   '',
  avatar: null,
};

const TIPS = [
  {
    id: 1, cat: 'content', catLabel: 'コンテンツ', color: '#3b9eff', week: 'Week 01', isNew: true,
    title: '最初の3秒で全てが決まる',
    preview: '視聴者の90%は冒頭3秒で離脱を判断します。冒頭に「結論」か「問い」を置くだけで視聴継続率が劇的に改善します。',
    lead: 'コンテンツの質より「入口の設計」が先です。どれだけ良い内容でも、最初の3秒で興味を掴めなければ誰にも届きません。',
    points: ['冒頭0〜3秒に「結論」か「強い問い」を置く', 'BGMや効果音でエネルギーを上げる', '顔のアップまたは衝撃シーンからスタートする', 'テロップを最初から表示して視覚でも引き込む'],
    body: '「今日は〇〇について話します」という導入は最も視聴者を失います。答えを先に言ってから理由を話す「結論ファースト」を徹底してください。',
  },
  {
    id: 2, cat: 'algorithm', catLabel: 'アルゴリズム', color: '#f5a623', week: 'Week 02', isNew: true,
    title: '投稿後30分が勝負の窓',
    preview: 'TikTok・YouTubeのアルゴリズムは投稿直後の初速を最重要指標にします。投稿30分以内の集中拡散が鍵です。',
    lead: 'アルゴリズムは「人気なコンテンツ」を広めるのではなく「初速が速いコンテンツ」を広めます。',
    points: ['フォロワーに直接通知（ストーリー・X・LINEなど）', 'コメントへの即レスで滞在時間を伸ばす', '自分でもコメントして最初のコメント欄を埋める'],
    body: 'プラットフォームは投稿直後にまず少数のユーザーにテスト配信します。そこでの反応率が高ければ次の大きな層に配信されます。',
  },
  {
    id: 3, cat: 'growth', catLabel: '成長戦略', color: '#e84393', week: 'Week 03', isNew: false,
    title: 'エンゲージメント率を見ろ',
    preview: 'フォロワー10万より、エンゲージメント率5%の1万フォロワーアカウントの方がビジネス価値は高い。',
    lead: 'フォロワー数は「見かけの資産」です。実際に動いてくれる人数こそが本当の影響力であり、収益に直結します。',
    points: ['TikTok: 3%以上で平均、8%以上で高エンゲージメント', 'Instagram: 2%以上で平均、6%以上で優秀', 'YouTube: 完了率40%以上、クリック率4%以上'],
    body: 'エンゲージメント率 = (いいね + コメント + シェア + 保存) ÷ インプレッション × 100',
  },
  {
    id: 4, cat: 'mindset', catLabel: 'マインドセット', color: '#9b6fff', week: 'Week 04', isNew: false,
    title: '継続できる人は仕組みを持つ',
    preview: 'モチベーションに頼った継続は必ず切れます。感情に依存しない制作フローを持つことが全ての基本です。',
    lead: '「続けられない」のはあなたの意志の問題ではありません。仕組みが足りないだけです。',
    points: ['企画・撮影・編集・投稿の4工程を別の日に分ける', 'ネタ帳をメモアプリで常に開けるようにする', '週次レビューで「次週の1本目」だけ決めておく'],
    body: '「毎日投稿」は中級者以上の戦略です。初期は週2〜3本の質の高い投稿から始めてください。',
  },
  {
    id: 5, cat: 'collab', catLabel: 'コラボ', color: '#00c896', week: 'Week 05', isNew: false,
    title: 'コラボ相手の選び方で10倍変わる',
    preview: 'フォロワーが多い人とコラボすればいい訳ではありません。視聴者層の親和性が全てです。',
    lead: 'コラボの目的は「お互いの視聴者を交換すること」です。フォロワー数より視聴者の属性・興味の重なりを優先して選ぶ。',
    points: ['視聴者層の年齢・性別・興味が近い', 'フォロワー数は自分の0.5〜2倍の範囲が最適', '投稿スタイルが補完関係にある'],
    body: '「コラボしたいです」だけのDMは9割スルーされます。具体的な企画と双方のメリットを提示することが必須です。',
  },
  {
    id: 6, cat: 'content', catLabel: 'コンテンツ', color: '#3b9eff', week: 'Week 06', isNew: false,
    title: 'ショート動画の「型」を持て',
    preview: 'バズったショート動画の80%は5つの型のどれかに当てはまります。型を理解することで制作速度と再生数が同時に上がります。',
    lead: '一から企画を考える必要はありません。型に自分のオリジナリティを乗せる方が圧倒的に速く、しかも伸びやすい。',
    points: ['【衝撃型】「え、これ本当に？」から始まる事実・検証', '【共感型】「あるある」を刺激するシチュエーション', '【学び型】「3秒で分かる〇〇」のHow-To形式', '【感情型】感動・笑い・怒りを動かすストーリー'],
    body: 'まず過去1ヶ月の自分の投稿を振り返り、どの型で作ったか分類してみてください。',
  },
];

const FILTERS = [
  { key: 'all',       label: 'すべて' },
  { key: 'content',   label: 'コンテンツ' },
  { key: 'algorithm', label: 'アルゴリズム' },
  { key: 'growth',    label: '成長戦略' },
  { key: 'mindset',   label: 'マインドセット' },
  { key: 'collab',    label: 'コラボ' },
];

let activeFilter = 'all';

// ══════════════════════════════
//  LOCAL STORAGE
// ══════════════════════════════
function loadStorage() {
  try {
    const n = localStorage.getItem('xector1_name');
    if (n) { MEMBER.name = n; MEMBER.short = n.split(/[\s　]/)[0] || n; }
    const g = localStorage.getItem('xector1_goal');
    if (g) MEMBER.goal = g;
    const a = localStorage.getItem('xector1_avatar');
    if (a) MEMBER.avatar = a;
  } catch (e) {}
}

function saveName() {
  const val = document.getElementById('settings-name').value.trim();
  if (!val) { showToast('名前を入力してください'); return; }
  MEMBER.name  = val;
  MEMBER.short = val.split(/[\s　]/)[0] || val;
  try { localStorage.setItem('xector1_name', val); } catch(e) {}
  document.getElementById('topbar-member').textContent = MEMBER.name;
  document.getElementById('home-name').textContent     = MEMBER.short;
  showToast('名前を保存しました');
}

function saveGoal() {
  const val = document.getElementById('settings-goal').value.trim();
  if (!val) { showToast('目標を入力してください'); return; }
  MEMBER.goal = val;
  try { localStorage.setItem('xector1_goal', val); } catch(e) {}
  document.getElementById('goal-text').textContent = val;
  showToast('目標を保存しました');
}

// ══════════════════════════════
//  AVATAR
// ══════════════════════════════
let crop = { img: null, x: 0, y: 0, scale: 1, dragging: false, lx: 0, ly: 0 };

function applyAvatar(url) {
  MEMBER.avatar = url;
  ['topbar-avatar-inner', 'home-avatar-inner', 'avatar-preview-inner'].forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    el.innerHTML = url
      ? `<img src="${url}" alt="アバター">`
      : (MEMBER.short[0] || '?');
  });
}

function onAvatarFileSelected(e) {
  const file = e.target.files[0];
  if (!file) return;
  const r = new FileReader();
  r.onload = ev => {
    const img = new Image();
    img.onload = () => {
      crop = { img, x: 0, y: 0, scale: 1, dragging: false, lx: 0, ly: 0 };
      document.getElementById('avatar-crop-wrap').classList.add('open');
      drawCrop();
    };
    img.src = ev.target.result;
  };
  r.readAsDataURL(file);
}

function drawCrop() {
  const wrap   = document.getElementById('crop-canvas-wrap');
  const canvas = document.getElementById('crop-canvas');
  const size   = wrap.offsetWidth;
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
  ctx.strokeStyle = 'rgba(200,255,0,0.7)';
  ctx.lineWidth   = 3;
  ctx.beginPath();
  ctx.arc(size / 2, size / 2, size / 2 - 1.5, 0, Math.PI * 2);
  ctx.stroke();
}

(function setupCrop() {
  let pending = false, ld = 0;
  function init() {
    const c = document.getElementById('crop-canvas');
    if (!c) return;
    const s = (x, y) => { crop.dragging = true; crop.lx = x; crop.ly = y; };
    const m = (x, y) => {
      if (!crop.dragging) return;
      crop.x += x - crop.lx; crop.y += y - crop.ly;
      crop.lx = x; crop.ly = y;
      if (!pending) { pending = true; requestAnimationFrame(() => { drawCrop(); pending = false; }); }
    };
    const e = () => { crop.dragging = false; };
    c.addEventListener('mousedown',  ev => s(ev.clientX, ev.clientY));
    c.addEventListener('mousemove',  ev => m(ev.clientX, ev.clientY));
    c.addEventListener('mouseup',    e);
    c.addEventListener('mouseleave', e);
    c.addEventListener('touchstart', ev => { const t = ev.touches[0]; s(t.clientX, t.clientY); }, { passive: true });
    c.addEventListener('touchmove',  ev => {
      if (ev.touches.length === 2) {
        const dx = ev.touches[0].clientX - ev.touches[1].clientX;
        const dy = ev.touches[0].clientY - ev.touches[1].clientY;
        const d  = Math.sqrt(dx * dx + dy * dy);
        if (ld) crop.scale = Math.max(0.5, Math.min(4, crop.scale * (d / ld)));
        ld = d; drawCrop();
      } else { ld = 0; const t = ev.touches[0]; m(t.clientX, t.clientY); }
      ev.preventDefault();
    }, { passive: false });
    c.addEventListener('touchend', () => { ld = 0; e(); });
    c.addEventListener('wheel', ev => {
      crop.scale = Math.max(0.5, Math.min(4, crop.scale * (ev.deltaY < 0 ? 1.08 : 0.93)));
      drawCrop(); ev.preventDefault();
    }, { passive: false });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();

function cancelCrop() {
  document.getElementById('avatar-crop-wrap').classList.remove('open');
  document.getElementById('avatar-file-input').value = '';
}

function saveCrop() {
  const url = document.getElementById('crop-canvas').toDataURL('image/jpeg', 0.88);
  applyAvatar(url);
  try { localStorage.setItem('xector1_avatar', url); } catch(e) {}
  cancelCrop();
  showToast('アイコンを保存しました');
}

// ══════════════════════════════
//  TIPS
// ══════════════════════════════
function renderFilters() {
  document.getElementById('filter-row').innerHTML = FILTERS.map(f =>
    `<button class="chip${activeFilter === f.key ? ' active' : ''}" onclick="setFilter('${f.key}')">${f.label}</button>`
  ).join('');
}

function setFilter(k) {
  activeFilter = k;
  renderFilters();
  renderTips();
}

function renderTips() {
  const list = activeFilter === 'all' ? TIPS : TIPS.filter(t => t.cat === activeFilter);
  document.getElementById('tips-list').innerHTML = list.map(t => `
    <button class="tip-item" onclick="openTip(${t.id})">
      <div class="tip-item-bar" style="background:${t.color}"></div>
      <div class="tip-item-body">
        <div class="tip-item-meta">
          <span class="tip-cat" style="background:${t.color}20;color:${t.color};border:1px solid ${t.color}40">${t.catLabel}</span>
          <span class="tip-week">${t.week}</span>
          ${t.isNew ? '<span class="tip-new">NEW</span>' : ''}
        </div>
        <p class="tip-title">${t.title}</p>
        <p class="tip-preview">${t.preview}</p>
      </div>
      <div class="tip-chevron">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="9 18 15 12 9 6"/></svg>
      </div>
    </button>
  `).join('');
}

function openTip(id) {
  const t = TIPS.find(x => x.id === id);
  if (!t) return;
  document.getElementById('tip-detail').innerHTML = `
    <span class="sheet-tag" style="background:${t.color}20;color:${t.color};border:1px solid ${t.color}40">${t.catLabel} — ${t.week}</span>
    <h2 class="sheet-title">${t.title}</h2>
    <p class="sheet-lead">${t.lead}</p>
    <p class="sheet-section-label">やること</p>
    <ul class="sheet-checklist">
      ${t.points.map(p => `<li>${p}</li>`).join('')}
    </ul>
    <p class="sheet-section-label">解説</p>
    <p class="sheet-body">${t.body}</p>
    <button class="btn-primary btn-sheet-cta" onclick="closeTipSheet()" style="background:${t.color};color:${t.color === '#f5a623' || t.color === '#00c896' ? '#000' : '#fff'}">
      理解した &#8212; 実践する
    </button>
  `;
  document.getElementById('tip-overlay').classList.add('open');
  document.getElementById('content').style.overflow = 'hidden';
}

function closeTipSheet(e) {
  if (!e || e.target === document.getElementById('tip-overlay')) {
    document.getElementById('tip-overlay').classList.remove('open');
    document.getElementById('content').style.overflow = '';
  }
}

// ══════════════════════════════
//  BOOK
// ══════════════════════════════
function switchProgram(n) {
  [1, 2, 3].forEach(i => {
    document.getElementById(`prog-tab-${i}`)?.classList.toggle('active', i === n);
    const p = document.getElementById(`ycbm-panel-${i}`);
    if (p) p.style.display = i === n ? 'block' : 'none';
  });
}

// ══════════════════════════════
//  NAVIGATION
// ══════════════════════════════
function goPage(name) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(b => b.classList.remove('active'));
  document.getElementById(`page-${name}`)?.classList.add('active');
  document.getElementById(`nav-${name}`)?.classList.add('active');
  document.getElementById('content').scrollTo(0, 0);
  if (name === 'settings') prefill();
}

function prefill() {
  const n = document.getElementById('settings-name');
  if (n && MEMBER.name !== 'メンバー') n.value = MEMBER.name;
  const g = document.getElementById('settings-goal');
  if (g) g.value = MEMBER.goal || '';
}

// ══════════════════════════════
//  INIT
// ══════════════════════════════
function init() {
  const h  = new Date().getHours();
  const gr = h < 12 ? 'おはようございます' : h < 18 ? 'こんにちは' : 'こんばんは';
  document.getElementById('home-greeting').textContent = gr;
  document.getElementById('home-name').textContent     = MEMBER.short;
  document.getElementById('topbar-member').textContent = MEMBER.name;
  document.getElementById('goal-text').textContent     = MEMBER.goal || '目標を設定する';
  applyAvatar(MEMBER.avatar);
  renderFilters();
  renderTips();
}

function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2400);
}

window.addEventListener('load', () => {
  loadStorage();
  init();
});
