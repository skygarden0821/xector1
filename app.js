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

const TIPS_DATA = [
  { id:1, cat:'content', catLabel:'コンテンツ', color:'#3b9eff', week:'Week 01', isNew:true, icon:'🎬',
    title:'最初の3秒で全てが決まる',
    preview:'視聴者の90%は冒頭3秒で離脱を判断します。冒頭に「結論」か「問い」を置くだけで視聴継続率が劇的に改善します。',
    lead:'コンテンツの質より「入口の設計」が先です。どれだけ良い内容でも、最初の3秒で興味を掴めなければ誰にも届きません。',
    points:['冒頭0〜3秒に「結論」か「強い問い」を置く','BGMや効果音でエネルギーを上げる','顔のアップ or 衝撃シーンからスタートする','テロップを最初から表示して視覚でも引き込む'],
    body:'「今日は〇〇について話します」という導入は最も視聴者を失います。答えを先に言ってから理由を話す「結論ファースト」を徹底してください。' },
  { id:2, cat:'algorithm', catLabel:'アルゴリズム', color:'#f5a623', week:'Week 02', isNew:true, icon:'⚡',
    title:'投稿後30分が勝負の窓',
    preview:'TikTok・YouTubeのアルゴリズムは投稿直後の初速を最重要指標にします。投稿30分以内の集中拡散が鍵です。',
    lead:'アルゴリズムは「人気なコンテンツ」を広めるのではなく「初速が速いコンテンツ」を広めます。',
    points:['フォロワーに直接通知（ストーリー・X・LINEなど）','コメントへの即レスで滞在時間を伸ばす','自分でもコメントして最初のコメント欄を埋める'],
    body:'プラットフォームは投稿直後にまず少数のユーザーにテスト配信します。そこでの反応率が高ければ次の大きな層に配信されます。' },
  { id:3, cat:'growth', catLabel:'成長戦略', color:'#e84393', week:'Week 03', isNew:false, icon:'📈',
    title:'エンゲージメント率を見ろ',
    preview:'フォロワー10万より、エンゲージメント率5%の1万フォロワーアカウントの方がビジネス価値は高い。',
    lead:'フォロワー数は「見かけの資産」です。実際に動いてくれる人数こそが本当の影響力であり、収益に直結します。',
    points:['TikTok: 3%以上で平均、8%以上で高エンゲージメント','Instagram: 2%以上で平均、6%以上で優秀','YouTube: 完了率40%以上、クリック率4%以上'],
    body:'エンゲージメント率 = (いいね+コメント+シェア+保存) ÷ インプレッション × 100' },
  { id:4, cat:'mindset', catLabel:'マインドセット', color:'#9b6fff', week:'Week 04', isNew:false, icon:'🧠',
    title:'継続できる人は仕組みを持つ',
    preview:'モチベーションに頼った継続は必ず切れます。感情に依存しない制作フローを持つことが全ての基本です。',
    lead:'「続けられない」のはあなたの意志の問題ではありません。仕組みが足りないだけです。',
    points:['企画・撮影・編集・投稿の4工程を別の日に分ける','ネタ帳をメモアプリで常に開けるようにする','週次レビューで「次週の1本目」だけ決めておく'],
    body:'「毎日投稿」は中級者以上の戦略です。初期は週2〜3本の質の高い投稿から始めてください。' },
  { id:5, cat:'collab', catLabel:'コラボ', color:'#00c896', week:'Week 05', isNew:false, icon:'🤝',
    title:'コラボ相手の選び方で10倍変わる',
    preview:'フォロワーが多い人とコラボすればいい訳ではありません。視聴者層の親和性が全てです。',
    lead:'コラボの目的は「お互いの視聴者を交換すること」です。フォロワー数より視聴者の属性・興味の重なりを優先して選ぶ。',
    points:['視聴者層の年齢・性別・興味が近い','フォロワー数は自分の0.5〜2倍の範囲が最適','投稿スタイルが補完関係にある'],
    body:'「コラボしたいです」だけのDMは9割スルーされます。具体的な企画と双方のメリットを提示することが必須です。' },
  { id:6, cat:'content', catLabel:'コンテンツ', color:'#3b9eff', week:'Week 06', isNew:false, icon:'✂️',
    title:'ショート動画の「型」を持て',
    preview:'バズったショート動画の80%は5つの型のどれかに当てはまります。型を理解することで制作速度と再生数が同時に上がります。',
    lead:'一から企画を考える必要はありません。型に自分のオリジナリティを乗せる方が圧倒的に速く、しかも伸びやすい。',
    points:['【衝撃型】「え、これ本当に？」から始まる事実・検証','【共感型】「あるある」を刺激するシチュエーション','【学び型】「3秒で分かる〇〇」のHow-To形式','【感情型】感動・笑い・怒りの感情を動かすストーリー'],
    body:'まず過去1ヶ月の自分の投稿を振り返り、どの型で作ったか分類してみてください。' },
];

const FILTER_CATS = [
  { key:'all',       label:'すべて' },
  { key:'content',   label:'コンテンツ' },
  { key:'algorithm', label:'アルゴリズム' },
  { key:'growth',    label:'成長戦略' },
  { key:'mindset',   label:'マインドセット' },
  { key:'collab',    label:'コラボ' },
];

let tipFilter = 'all';

// ══════════════════════════════
//  LOCAL STORAGE
// ══════════════════════════════
function loadFromLocalStorage() {
  try {
    const name = localStorage.getItem('xector1_name');
    if (name) { MEMBER.name = name; MEMBER.short = name.split(/[\s　]/)[0] || name; }
    const goal = localStorage.getItem('xector1_goal');
    if (goal) MEMBER.goal = goal;
    const avatar = localStorage.getItem('xector1_avatar');
    if (avatar) MEMBER.avatar = avatar;
    const since = localStorage.getItem('xector1_since');
    if (since) MEMBER.since = since;
    else localStorage.setItem('xector1_since', MEMBER.since);
  } catch (e) {
    console.warn('localStorage:', e);
  }
}

function saveName() {
  const val = document.getElementById('settings-name').value.trim();
  if (!val) { showToast('名前を入力してください'); return; }
  MEMBER.name  = val;
  MEMBER.short = val.split(/[\s　]/)[0] || val;
  try { localStorage.setItem('xector1_name', val); } catch(e){}
  document.getElementById('topbar-member').textContent = MEMBER.name;
  document.getElementById('home-name').textContent     = MEMBER.short;
  showToast('名前を保存しました ✓');
}

function saveGoal() {
  const val = document.getElementById('settings-goal').value.trim();
  if (!val) { showToast('目標を入力してください'); return; }
  MEMBER.goal = val;
  try { localStorage.setItem('xector1_goal', val); } catch(e){}
  document.getElementById('goal-text').textContent = val;
  showToast('目標を保存しました ✓');
}

// ══════════════════════════════
//  AVATAR
// ══════════════════════════════
let cropState = { img:null, x:0, y:0, scale:1, dragging:false, lastX:0, lastY:0 };

function applyAvatar(dataUrl) {
  MEMBER.avatar = dataUrl;
  const ids = ['topbar-avatar-inner','home-avatar-inner','avatar-preview-inner'];
  ids.forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    el.innerHTML = dataUrl ? `<img src="${dataUrl}" alt="avatar">` : (MEMBER.short[0] || '?');
  });
}

function onAvatarFileSelected(e) {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = ev => {
    const img = new Image();
    img.onload = () => {
      cropState = { img, x:0, y:0, scale:1, dragging:false, lastX:0, lastY:0 };
      document.getElementById('avatar-crop-wrap').classList.add('open');
      drawCrop();
    };
    img.src = ev.target.result;
  };
  reader.readAsDataURL(file);
}

function drawCrop() {
  const wrap   = document.getElementById('crop-canvas-wrap');
  const canvas = document.getElementById('crop-canvas');
  const size   = wrap.offsetWidth;
  canvas.width  = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, size, size);
  ctx.save();
  ctx.beginPath();
  ctx.arc(size/2, size/2, size/2, 0, Math.PI*2);
  ctx.clip();
  ctx.fillStyle = '#111';
  ctx.fillRect(0, 0, size, size);
  if (cropState.img) {
    const s  = cropState.scale;
    const iw = cropState.img.width  * s;
    const ih = cropState.img.height * s;
    cropState.x = Math.min(0, Math.max(size - iw, cropState.x));
    cropState.y = Math.min(0, Math.max(size - ih, cropState.y));
    ctx.drawImage(cropState.img, cropState.x, cropState.y, iw, ih);
  }
  ctx.restore();
  ctx.strokeStyle = 'rgba(200,255,0,0.6)';
  ctx.lineWidth   = 2;
  ctx.beginPath();
  ctx.arc(size/2, size/2, size/2 - 1, 0, Math.PI*2);
  ctx.stroke();
}

// drag / pinch / wheel
(function() {
  let pending = false, lastDist = 0;
  function setup() {
    const c = document.getElementById('crop-canvas');
    if (!c) return;
    const start = (x,y) => { cropState.dragging=true; cropState.lastX=x; cropState.lastY=y; };
    const move  = (x,y) => {
      if (!cropState.dragging) return;
      cropState.x += x - cropState.lastX;
      cropState.y += y - cropState.lastY;
      cropState.lastX = x; cropState.lastY = y;
      if (!pending) { pending=true; requestAnimationFrame(()=>{ drawCrop(); pending=false; }); }
    };
    const end = () => { cropState.dragging = false; };
    c.addEventListener('mousedown',  e => start(e.clientX, e.clientY));
    c.addEventListener('mousemove',  e => move(e.clientX, e.clientY));
    c.addEventListener('mouseup',    end);
    c.addEventListener('mouseleave', end);
    c.addEventListener('touchstart', e => { const t=e.touches[0]; start(t.clientX,t.clientY); }, {passive:true});
    c.addEventListener('touchmove',  e => {
      if (e.touches.length === 2) {
        const dx=e.touches[0].clientX-e.touches[1].clientX, dy=e.touches[0].clientY-e.touches[1].clientY;
        const dist=Math.sqrt(dx*dx+dy*dy);
        if (lastDist) cropState.scale = Math.max(0.5, Math.min(4, cropState.scale*(dist/lastDist)));
        lastDist=dist; drawCrop();
      } else { lastDist=0; const t=e.touches[0]; move(t.clientX,t.clientY); }
      e.preventDefault();
    }, {passive:false});
    c.addEventListener('touchend', ()=>{ lastDist=0; end(); });
    c.addEventListener('wheel', e=>{ cropState.scale=Math.max(0.5,Math.min(4,cropState.scale*(e.deltaY<0?1.08:0.93))); drawCrop(); e.preventDefault(); }, {passive:false});
  }
  if (document.readyState==='loading') document.addEventListener('DOMContentLoaded', setup);
  else setup();
})();

function cancelCrop() {
  document.getElementById('avatar-crop-wrap').classList.remove('open');
  document.getElementById('avatar-file-input').value = '';
}
function saveCrop() {
  const dataUrl = document.getElementById('crop-canvas').toDataURL('image/jpeg', 0.85);
  applyAvatar(dataUrl);
  try { localStorage.setItem('xector1_avatar', dataUrl); } catch(e){}
  cancelCrop();
  showToast('アイコンを保存しました ✓');
}

// ══════════════════════════════
//  TIPS
// ══════════════════════════════
function renderFilterRow() {
  document.getElementById('filter-row').innerHTML = FILTER_CATS.map(c =>
    `<button class="filter-chip ${tipFilter===c.key?'active':''}" onclick="setFilter('${c.key}')">${c.label}</button>`
  ).join('');
}

function setFilter(k) {
  tipFilter = k;
  renderFilterRow();
  renderTipsList();
}

function renderTipsList() {
  const list = tipFilter === 'all' ? TIPS_DATA : TIPS_DATA.filter(t => t.cat === tipFilter);
  document.getElementById('tips-list').innerHTML = list.map(t => `
    <button class="tip-card" onclick="openTip(${t.id})">
      <div class="tip-card-left" style="border-left-color:${t.color}">
        <div class="tip-card-top">
          <span class="tip-tag" style="background:${t.color}22;color:${t.color}">${t.catLabel}</span>
          <span class="tip-week">${t.week}</span>
          ${t.isNew ? '<span class="tip-new-badge">NEW</span>' : ''}
        </div>
        <div class="tip-title">${t.title}</div>
        <div class="tip-preview">${t.preview}</div>
      </div>
      <div class="tip-icon">${t.icon}</div>
    </button>
  `).join('');
}

function openTip(id) {
  const t = TIPS_DATA.find(x => x.id === id);
  if (!t) return;
  document.getElementById('tip-sheet-content').innerHTML = `
    <div class="tip-sheet-tag" style="background:${t.color}22;color:${t.color}">${t.catLabel} — ${t.week}</div>
    <h2 class="tip-sheet-title">${t.title}</h2>
    <p class="tip-sheet-lead">${t.lead}</p>
    <div class="tip-sheet-section-label">やること</div>
    <ul class="tip-sheet-list">
      ${t.points.map(p => `<li>${p}</li>`).join('')}
    </ul>
    <div class="tip-sheet-section-label">解説</div>
    <p class="tip-sheet-body">${t.body}</p>
    <button class="btn-primary btn-block mt-24" onclick="closeTipSheet()" style="background:${t.color};color:#000;">
      理解した — 実践する
    </button>
  `;
  document.getElementById('tip-overlay').classList.add('open');
}

function closeTipSheet(e) {
  if (!e || e.target === document.getElementById('tip-overlay'))
    document.getElementById('tip-overlay').classList.remove('open');
}

// ══════════════════════════════
//  BOOK
// ══════════════════════════════
function switchProgram(n) {
  [1,2,3].forEach(i => {
    document.getElementById('prog-tab-'    + i)?.classList.toggle('active', i === n);
    const panel = document.getElementById('ycbm-panel-' + i);
    if (panel) panel.style.display = i === n ? 'block' : 'none';
  });
}

// ══════════════════════════════
//  NAVIGATION
// ══════════════════════════════
function goPage(name) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  document.getElementById('page-' + name)?.classList.add('active');
  document.getElementById('nav-'  + name)?.classList.add('active');
  document.querySelector('.content').scrollTo(0, 0);
  if (name === 'settings') prefillSettings();
}

function prefillSettings() {
  const nameEl = document.getElementById('settings-name');
  if (nameEl && MEMBER.name !== 'メンバー') nameEl.value = MEMBER.name;
  const goalEl = document.getElementById('settings-goal');
  if (goalEl) goalEl.value = MEMBER.goal || '';
}

// ══════════════════════════════
//  INIT
// ══════════════════════════════
function initApp() {
  document.getElementById('topbar-member').textContent = MEMBER.name;
  document.getElementById('home-name').textContent     = MEMBER.short;
  applyAvatar(MEMBER.avatar);

  // greeting
  const h  = new Date().getHours();
  const gr = h < 12 ? 'おはようございます' : h < 18 ? 'こんにちは' : 'こんばんは';
  document.getElementById('home-greeting').textContent = gr;

  // since
  const days = Math.floor((Date.now() - new Date(MEMBER.since)) / 86400000);
  // goal
  document.getElementById('goal-text').textContent = MEMBER.goal || '目標をタップして設定する →';

  renderFilterRow();
  renderTipsList();
}

// ══════════════════════════════
//  TOAST
// ══════════════════════════════
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2600);
}

// ══════════════════════════════
//  BOOT
// ══════════════════════════════
window.addEventListener('load', () => {
  loadFromLocalStorage();
  initApp();
  // iOS PWA ヒント
  if (/iphone|ipad|ipod/i.test(navigator.userAgent) && !window.navigator.standalone)
    setTimeout(() => showToast('ホーム画面に追加するとアプリとして使えます'), 3000);
});
