// ══════════════════════════════
//  DATA
// ══════════════════════════════
const MEMBER = {
  name: 'メンバー',
  short: 'メンバー',
  since: '2024-11-01',
  streak: 0,
  goal: '',
  avatar: null,
};

const TIPS_DATA = [
  { id:1, cat:'content', catLabel:'コンテンツ', color:'#00f0ff', bg:'rgba(0,240,255,0.08)', week:'Week 01', isNew:true, icon:'🎬',
    title:'最初の3秒で全てが決まる',
    preview:'視聴者の90%は冒頭3秒で離脱を判断します。冒頭に「結論」か「問い」を置くだけで視聴継続率が劇的に改善します。',
    lead:'コンテンツの質より「入口の設計」が先です。どれだけ良い内容でも、最初の3秒で興味を掴めなければ誰にも届きません。',
    points:['冒頭0〜3秒に「結論」か「強い問い」を置く','BGMや効果音でエネルギーを上げる','顔のアップ or 衝撃シーンからスタートする','テロップを最初から表示して視覚でも引き込む'],
    body:'「今日は〇〇について話します」という導入は最も視聴者を失います。答えを先に言ってから理由を話す「結論ファースト」を徹底してください。' },
  { id:2, cat:'algorithm', catLabel:'アルゴリズム', color:'#ffb700', bg:'rgba(255,183,0,0.08)', week:'Week 02', isNew:true, icon:'⚡',
    title:'投稿後30分が勝負の窓',
    preview:'TikTok・YouTubeのアルゴリズムは投稿直後の初速を最重要指標にします。投稿30分以内の集中拡散が鍵です。',
    lead:'アルゴリズムは「人気なコンテンツ」を広めるのではなく「初速が速いコンテンツ」を広めます。',
    points:['フォロワーに直接通知（ストーリー・X・LINEなど）','コメントへの即レスで滞在時間を伸ばす','自分でもコメントして最初のコメント欄を埋める'],
    body:'プラットフォームは投稿直後にまず少数のユーザーにテスト配信します。そこでの反応率が高ければ次の大きな層に配信されます。' },
  { id:3, cat:'growth', catLabel:'成長戦略', color:'#ff3d80', bg:'rgba(255,61,128,0.08)', week:'Week 03', isNew:false, icon:'📈',
    title:'エンゲージメント率を見ろ',
    preview:'フォロワー10万より、エンゲージメント率5%の1万フォロワーアカウントの方がビジネス価値は高い。',
    lead:'フォロワー数は「見かけの資産」です。実際に動いてくれる人数こそが本当の影響力であり、収益に直結します。',
    points:['TikTok: 3%以上で平均、8%以上で高エンゲージメント','Instagram: 2%以上で平均、6%以上で優秀','YouTube: 完了率40%以上、クリック率4%以上'],
    body:'エンゲージメント率 = (いいね+コメント+シェア+保存) ÷ インプレッション × 100' },
  { id:4, cat:'mindset', catLabel:'マインドセット', color:'#9f6fff', bg:'rgba(159,111,255,0.08)', week:'Week 04', isNew:false, icon:'🧠',
    title:'継続できる人は仕組みを持つ',
    preview:'モチベーションに頼った継続は必ず切れます。感情に依存しない制作フローを持つことが全ての基本です。',
    lead:'「続けられない」のはあなたの意志の問題ではありません。仕組みが足りないだけです。',
    points:['企画・撮影・編集・投稿の4工程を別の日に分ける','ネタ帳をメモアプリで常に開けるようにする','週次レビューで「次週の1本目」だけ決めておく'],
    body:'「毎日投稿」は中級者以上の戦略です。初期は週2〜3本の質の高い投稿から始めてください。' },
  { id:5, cat:'collab', catLabel:'コラボ', color:'#00ffaa', bg:'rgba(0,255,170,0.08)', week:'Week 05', isNew:false, icon:'🤝',
    title:'コラボ相手の選び方で10倍変わる',
    preview:'フォロワーが多い人とコラボすればいい訳ではありません。視聴者層の親和性が全てです。',
    lead:'コラボの目的は「お互いの視聴者を交換すること」です。フォロワー数より視聴者の属性・興味の重なりを優先して選ぶ。',
    points:['視聴者層の年齢・性別・興味が近い','フォロワー数は自分の0.5〜2倍の範囲が最適','投稿スタイルが補完関係にある'],
    body:'「コラボしたいです」だけのDMは9割スルーされます。具体的な企画と双方のメリットを提示することが必須です。' },
  { id:6, cat:'content', catLabel:'コンテンツ', color:'#00f0ff', bg:'rgba(0,240,255,0.08)', week:'Week 06', isNew:false, icon:'✂️',
    title:'ショート動画の「型」を持て',
    preview:'バズったショート動画の80%は5つの型のどれかに当てはまります。型を理解して使いこなすことで制作速度と再生数が同時に上がります。',
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

const DUMMY_MEMBERS = [
  { name:'渡辺 拓海', av:'渡', color:'#ff3d80', badge:'RANK #1',    badgeColor:'#c8ff00' },
  { name:'佐藤 美優', av:'佐', color:'#00f0ff', badge:'GROWING',    badgeColor:'#00f0ff' },
  { name:'伊藤 さくら', av:'伊', color:'#9f6fff', badge:'MEMBER',   badgeColor:'rgba(242,240,255,0.3)' },
  { name:'中村 蓮',   av:'中', color:'#ffb700', badge:'TOP MEMBER', badgeColor:'#c8ff00' },
  { name:'高橋 ひな', av:'高', color:'#00ffaa', badge:'GROWING',    badgeColor:'#00f0ff' },
  { name:'小林 悠斗', av:'小', color:'#ff7043', badge:'MEMBER',     badgeColor:'rgba(242,240,255,0.3)' },
  { name:'山田 彩花', av:'山', color:'#ab47bc', badge:'MEMBER',     badgeColor:'rgba(242,240,255,0.3)' },
  { name:'加藤 颯',   av:'加', color:'#26c6da', badge:'GROWING',    badgeColor:'#00f0ff' },
];

const DUMMY_POSTS_POOL = [
  { text:'おはようございます！今日はいつもより1時間早く起きて編集してました。朝の集中力えぐい。このペース続けたい', ach:null, likes:14, timeSlot:'morning' },
  { text:'今朝投稿した動画、もう<strong>3,200再生</strong>いってる🙌 朝イチで投稿するの正解だったかも。フォロワーさんの反応早い', ach:null, likes:22, timeSlot:'morning' },
  { text:'今日から編集ワーク週5にしてみる実験スタート。まずは1週間試してみます。応援してください笑', ach:null, likes:11, timeSlot:'morning' },
  { text:'昨日の動画の続きを朝から収録。台本作るより先に話し始めた方が自然になるって気づいてからだいぶ楽になった', ach:null, likes:17, timeSlot:'morning' },
  { text:'今日はいつもより<strong>+2本</strong>出せてる〜！！テンポよく編集できてる日って気持ちいい。このまま夜まで走ります', ach:null, likes:26, timeSlot:'noon' },
  { text:'昼休みに撮影して帰宅後に編集、これが今のスタイルになってきた。やっとルーティン固まってきた感', ach:null, likes:13, timeSlot:'noon' },
  { text:'ショートが伸びてる。ここ3日で<strong>+890フォロワー</strong>。なんか急にアルゴリズムに乗れた感じがある', ach:{ icon:'📈', label:'Growing', val:'+890フォロワー' }, likes:38, timeSlot:'noon' },
  { text:'みんな頑張ってるの見てると刺激になる！！負けてらんない。今から編集頑張る🔥', ach:null, likes:31, timeSlot:'evening' },
  { text:'今日3本投稿できた。疲れたけど満足感がすごい。週に1回これやるだけで月の本数全然変わってくるよね', ach:null, likes:19, timeSlot:'evening' },
  { text:'TikTokでずっと伸び悩んでたけど、サムネ変えたら突然<strong>1.2万再生</strong>きた。見た目って本当に大事', ach:{ icon:'🎯', label:'Breakthrough', val:'1.2万再生' }, likes:44, timeSlot:'evening' },
  { text:'面談でフィードバックもらった内容を即実行してみた。「最初の3秒」だけ変えたら視聴維持が全然違う。やっぱり試すのが一番', ach:null, likes:27, timeSlot:'evening' },
  { text:'今日の投稿が夜になってじわじわ伸びてる。<strong>5,600再生</strong>。寝る前にこれ見るの好きすぎる笑', ach:null, likes:35, timeSlot:'night' },
  { text:'明日の台本書き終えた。明後日撮影。ちゃんとストック作れてる。この流れを崩さないようにしたい', ach:null, likes:12, timeSlot:'night' },
  { text:'今月の目標本数まであと2本。明日中に終わらせる予定。ぎりぎりだけど間に合わせます', ach:null, likes:9, timeSlot:'night' },
  { text:'また深夜作業してしまった…でも今日の編集すごく良い仕上がりになった気がする。明日の反応楽しみ', ach:null, likes:8, timeSlot:'latenight' },
];

const INITIAL_POSTS = [
  { id:1, name:'渡辺 拓海', av:'渡', color:'#ff3d80', time:'2時間前', badge:'RANK #1', badgeColor:'#c8ff00',
    text:'今週で<strong>YouTubeチャンネル登録者40万人</strong>を突破しました！参加してから8ヶ月、本当に継続してよかったです。',
    ach:{ icon:'🏆', label:'Achievement', val:'40万人 突破' }, likes:24, liked:false, isDummy:true, isMe:false, ts:Date.now()-7200000 },
  { id:2, name:'佐藤 美優', av:'佐', color:'#00f0ff', time:'5時間前', badge:'GROWING', badgeColor:'#00f0ff',
    text:'TikTokのエンゲージメント率が先月比で<strong>+4.2%</strong>上がりました。投稿後30分の集中対応を始めてから明らかに初速が変わった感じがします。',
    ach:null, likes:18, liked:false, isDummy:true, isMe:false, ts:Date.now()-18000000 },
  { id:3, name:'伊藤 さくら', av:'伊', color:'#9f6fff', time:'2日前', badge:'MEMBER', badgeColor:'rgba(242,240,255,0.3)',
    text:'初めて<strong>Instagramリール</strong>が1万再生を超えました！「共感型」で作った動画でした。ここのTipsがめちゃくちゃ役に立ってます。',
    ach:{ icon:'🎉', label:'First Milestone', val:'1万再生 達成' }, likes:31, liked:false, isDummy:true, isMe:false, ts:Date.now()-172800000 },
];

// ══════════════════════════════
//  STATE
// ══════════════════════════════
let appState = {
  tipFilter: 'all',
  posts: INITIAL_POSTS.map(p => ({ ...p })),
};

// ══════════════════════════════
//  COMMUNITY TIMER
// ══════════════════════════════
let _communityTimerStarted = false;

function startCommunityTimer() {
  if (_communityTimerStarted) return;
  _communityTimerStarted = true;

  function getTimeSlot(h) {
    if (h >= 6  && h < 11) return 'morning';
    if (h >= 11 && h < 15) return 'noon';
    if (h >= 15 && h < 20) return 'evening';
    if (h >= 20 && h < 23) return 'night';
    if (h >= 23)           return 'latenight';
    return null;
  }

  function getDelayMs(h) {
    if (h >= 6  && h < 11) return (25 + Math.random() * 20) * 60000;
    if (h >= 11 && h < 15) return (40 + Math.random() * 30) * 60000;
    if (h >= 15 && h < 20) return (20 + Math.random() * 20) * 60000;
    if (h >= 20 && h < 23) return (35 + Math.random() * 25) * 60000;
    if (h >= 23)           return (50 + Math.random() * 40) * 60000;
    // 0〜5時: 次の朝6時まで待つ
    const now  = new Date();
    const next = new Date(now);
    next.setHours(6, 0, 0, 0);
    if (next <= now) next.setDate(next.getDate() + 1);
    return (next - now) + Math.random() * 1800000;
  }

  function injectPost() {
    const h    = new Date().getHours();
    const slot = getTimeSlot(h);
    if (!slot) { scheduleNext(); return; }

    const pool     = DUMMY_POSTS_POOL.filter(p => p.timeSlot === slot);
    const source   = pool.length > 0 ? pool : DUMMY_POSTS_POOL;
    const lastName = appState.posts.find(x => x.isDummy)?.name;
    const eligible = DUMMY_MEMBERS.filter(m => m.name !== lastName);
    const m        = eligible[Math.floor(Math.random() * eligible.length)];
    const p        = source[Math.floor(Math.random() * source.length)];

    const newPost = {
      id:        Date.now(),
      name:      m.name,
      av:        m.av,
      color:     m.color,
      badge:     m.badge,
      badgeColor:m.badgeColor,
      time:      'たった今',
      text:      p.text,
      ach:       p.ach ? { ...p.ach } : null,
      likes:     p.likes + Math.floor(Math.random() * 6),
      liked:     false,
      isDummy:   true,
      isMe:      false,
      ts:        Date.now(),
      comments:  [],
    };

    const myPosts = appState.posts.filter(x => x.isMe);
    const dummies = appState.posts.filter(x => !x.isMe);
    dummies.unshift(newPost);
    if (dummies.length > 18) dummies.pop();
    appState.posts = [...myPosts, ...dummies];

    updatePostTimes();
    renderFeed();
    scheduleNext();
  }

  function scheduleNext() {
    const delay = getDelayMs(new Date().getHours());
    setTimeout(injectPost, delay);
  }

  scheduleNext();

  // 1分ごとに時刻表示を更新
  setInterval(() => { updatePostTimes(); renderFeed(); }, 60000);
}

function updatePostTimes() {
  const now = Date.now();
  appState.posts.forEach(p => {
    if (!p.ts) return;
    const min = Math.floor((now - p.ts) / 60000);
    if (min < 1)         p.time = 'たった今';
    else if (min < 60)   p.time = `${min}分前`;
    else if (min < 1440) p.time = `${Math.floor(min / 60)}時間前`;
    else                 p.time = `${Math.floor(min / 1440)}日前`;
  });
}

// ══════════════════════════════
//  AUTO COMMENTS
// ══════════════════════════════
const AUTO_COMMENTS = [
  { text:'めちゃくちゃ参考になります！私もやってみます🔥' },
  { text:'すごい！数字に表れてますね。継続の力を感じます。' },
  { text:'自分も同じ悩みがあったので、とても共感できます。' },
  { text:'このやり方、詳しく聞いてみたいです！' },
  { text:'お疲れ様です！着実に成長してますね👏' },
  { text:'このTips、私も試してみます。ありがとうございます！' },
  { text:'そのやり方知らなかったです。早速真似させてもらいます。' },
  { text:'継続が大事って、本当にそうですよね。自分も頑張ります。' },
  { text:'最近投稿頻度落ちてたので刺激受けました！ありがとう😊' },
];

function scheduleAutoComment(postId) {
  const delay = 30000 + Math.random() * 90000;
  setTimeout(() => {
    const post = appState.posts.find(p => p.id === postId);
    if (!post) return;
    const m = DUMMY_MEMBERS[Math.floor(Math.random() * DUMMY_MEMBERS.length)];
    const c = AUTO_COMMENTS[Math.floor(Math.random() * AUTO_COMMENTS.length)];
    if (!post.comments) post.comments = [];
    post.comments.push({ name: m.name, av: m.av, color: m.color, text: c.text });
    renderFeed();
    showToast(m.name + 'さんがコメントしました 💬');
  }, delay);
}

// ══════════════════════════════
//  AVATAR
// ══════════════════════════════
let cropState = { img: null, x: 0, y: 0, scale: 1, dragging: false, lastX: 0, lastY: 0 };

function applyAvatar(dataUrl) {
  MEMBER.avatar = dataUrl;
  const targets = [
    document.getElementById('topbar-avatar-inner'),
    document.getElementById('home-avatar-inner'),
    document.getElementById('avatar-preview-inner'),
    document.getElementById('composer-avatar-img'),
  ];
  targets.forEach(el => {
    if (!el) return;
    el.innerHTML = dataUrl ? `<img src="${dataUrl}">` : (MEMBER.short[0] || '?');
  });
}

function onAvatarFileSelected(e) {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = ev => {
    const img = new Image();
    img.onload = () => {
      cropState = { img, x: 0, y: 0, scale: 1, dragging: false, lastX: 0, lastY: 0 };
      document.getElementById('avatar-crop-wrap').classList.add('visible');
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
  ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
  ctx.clip();
  ctx.fillStyle = '#111';
  ctx.fillRect(0, 0, size, size);
  if (cropState.img) {
    const s  = cropState.scale;
    const iw = cropState.img.width  * s;
    const ih = cropState.img.height * s;
    const mx = Math.min(0, Math.max(size - iw, cropState.x));
    const my = Math.min(0, Math.max(size - ih, cropState.y));
    cropState.x = mx;
    cropState.y = my;
    ctx.drawImage(cropState.img, mx, my, iw, ih);
  }
  ctx.restore();
  ctx.strokeStyle = 'rgba(200,255,0,0.5)';
  ctx.lineWidth   = 2;
  ctx.beginPath();
  ctx.arc(size / 2, size / 2, size / 2 - 1, 0, Math.PI * 2);
  ctx.stroke();
}

// ドラッグ/ピンチ/ホイール
(function setupCropInteraction() {
  let pending  = false;
  let lastDist = 0;

  function setup() {
    const c = document.getElementById('crop-canvas');
    if (!c) return;

    const start = (x, y) => { cropState.dragging = true; cropState.lastX = x; cropState.lastY = y; };
    const move  = (x, y) => {
      if (!cropState.dragging) return;
      cropState.x += x - cropState.lastX;
      cropState.y += y - cropState.lastY;
      cropState.lastX = x;
      cropState.lastY = y;
      if (!pending) { pending = true; requestAnimationFrame(() => { drawCrop(); pending = false; }); }
    };
    const end = () => { cropState.dragging = false; };

    c.addEventListener('mousedown',  e => start(e.clientX, e.clientY));
    c.addEventListener('mousemove',  e => move(e.clientX, e.clientY));
    c.addEventListener('mouseup',    end);
    c.addEventListener('mouseleave', end);
    c.addEventListener('touchstart', e => { const t = e.touches[0]; start(t.clientX, t.clientY); }, { passive: true });
    c.addEventListener('touchmove',  e => {
      if (e.touches.length === 2) {
        const dx   = e.touches[0].clientX - e.touches[1].clientX;
        const dy   = e.touches[0].clientY - e.touches[1].clientY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (lastDist) cropState.scale = Math.max(0.5, Math.min(4, cropState.scale * (dist / lastDist)));
        lastDist = dist;
        drawCrop();
      } else {
        lastDist = 0;
        const t = e.touches[0];
        move(t.clientX, t.clientY);
      }
      e.preventDefault();
    }, { passive: false });
    c.addEventListener('touchend', () => { lastDist = 0; end(); });
    c.addEventListener('wheel', e => {
      cropState.scale = Math.max(0.5, Math.min(4, cropState.scale * (e.deltaY < 0 ? 1.08 : 0.93)));
      drawCrop();
      e.preventDefault();
    }, { passive: false });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', setup);
  else setup();
})();

function cancelCrop() {
  document.getElementById('avatar-crop-wrap').classList.remove('visible');
  document.getElementById('avatar-file-input').value = '';
}

function saveCrop() {
  const canvas  = document.getElementById('crop-canvas');
  const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
  applyAvatar(dataUrl);
  try { localStorage.setItem('xector1_avatar', dataUrl); } catch (e) { /* ストレージ満杯時は無視 */ }
  cancelCrop();
  showToast('アイコンを保存しました ✓');
}

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

    const streak = parseInt(localStorage.getItem('xector1_streak') || '0', 10);
    MEMBER.streak = isNaN(streak) ? 0 : streak;

    const since = localStorage.getItem('xector1_since');
    if (since) MEMBER.since = since;
    else { localStorage.setItem('xector1_since', MEMBER.since); }

    // 当日初アクセスならストリーク+1
    const today     = new Date().toISOString().split('T')[0];
    const lastVisit = localStorage.getItem('xector1_last_visit');
    if (lastVisit !== today) {
      const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
      MEMBER.streak = (lastVisit === yesterday) ? MEMBER.streak + 1 : 1;
      localStorage.setItem('xector1_streak',      String(MEMBER.streak));
      localStorage.setItem('xector1_last_visit',  today);
    }
  } catch (e) {
    console.warn('localStorage error:', e);
  }
}

function saveName() {
  const input = document.getElementById('settings-name');
  const text  = input ? input.value.trim() : '';
  if (!text) { showToast('名前を入力してください'); return; }
  MEMBER.name  = text;
  MEMBER.short = text.split(/[\s　]/)[0] || text;
  try { localStorage.setItem('xector1_name', text); } catch (e) {}
  const topbar = document.getElementById('topbar-member');
  if (topbar) topbar.textContent = MEMBER.name;
  const hn = document.getElementById('home-name');
  if (hn) hn.textContent = MEMBER.short;
  showToast('名前を保存しました ✓');
}

function saveGoal() {
  const text = document.getElementById('settings-goal').value.trim();
  if (!text) { showToast('目標を入力してください'); return; }
  MEMBER.goal = text;
  try { localStorage.setItem('xector1_goal', text); } catch (e) {}
  const gt = document.getElementById('goal-text');
  if (gt) gt.textContent = text;
  showToast('目標を保存しました ✓');
}

// ══════════════════════════════
//  TIPS
// ══════════════════════════════
function renderFilterRow() {
  document.getElementById('filter-row').innerHTML = FILTER_CATS.map(c => `
    <button class="fb ${appState.tipFilter === c.key ? 'active' : ''}" onclick="setTipFilter('${c.key}')">${c.label}</button>
  `).join('');
}

function setTipFilter(k) {
  appState.tipFilter = k;
  renderFilterRow();
  renderTipsList();
}

function renderTipsList() {
  const list = appState.tipFilter === 'all'
    ? TIPS_DATA
    : TIPS_DATA.filter(t => t.cat === appState.tipFilter);

  document.getElementById('tips-list').innerHTML = list.map(t => `
    <div class="tip-row" onclick="openTipSheet(${t.id})">
      <div class="tip-accent" style="background:${t.color}"></div>
      <div class="tip-body-wrap">
        <div class="tip-meta-row">
          <span class="tip-cat-tag" style="background:${t.bg};color:${t.color};border:1px solid ${t.color}22">${t.catLabel}</span>
          <span class="tip-week-tag">${t.week}</span>
          ${t.isNew ? '<span class="tip-new">NEW</span>' : ''}
        </div>
        <div class="tip-title-text">${t.title}</div>
        <div class="tip-preview">${t.preview}</div>
      </div>
      <div class="tip-row-icon">${t.icon}</div>
    </div>
  `).join('');
}

function openTipSheet(id) {
  const t = TIPS_DATA.find(x => x.id === id);
  if (!t) return;
  document.getElementById('tip-sheet-content').innerHTML = `
    <div class="tip-meta-row" style="margin-bottom:12px;">
      <span class="tip-cat-tag" style="background:${t.bg};color:${t.color};border:1px solid ${t.color}22;padding:3px 8px;border-radius:2px;font-family:'Space Mono',monospace;font-size:8px;letter-spacing:2px;">${t.catLabel}</span>
      <span style="font-family:'Space Mono',monospace;font-size:10px;color:rgba(242,240,255,0.55);letter-spacing:0px;margin-left:8px;">${t.week}</span>
    </div>
    <div style="font-family:'Bebas Neue',sans-serif;font-size:32px;letter-spacing:3px;line-height:1.05;margin-bottom:16px;">${t.title}</div>
    <div style="font-size:14px;color:var(--white);line-height:1.75;margin-bottom:20px;border-left:2px solid ${t.color};padding-left:16px;">${t.lead}</div>
    <div style="font-family:'Space Mono',monospace;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:${t.color};margin-bottom:10px;font-weight:700;">やること</div>
    <ul style="list-style:none;display:flex;flex-direction:column;gap:8px;margin-bottom:20px;">
      ${t.points.map(p => `<li style="font-size:13px;color:rgba(242,240,255,0.7);padding-left:16px;position:relative;line-height:1.7;"><span style="position:absolute;left:0;color:${t.color}">—</span>${p}</li>`).join('')}
    </ul>
    <div style="font-family:'Space Mono',monospace;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:rgba(242,240,255,0.55);margin-bottom:8px;font-weight:700;">解説</div>
    <div style="font-size:13px;color:rgba(242,240,255,0.65);line-height:1.75;">${t.body}</div>
    <div style="margin-top:24px;">
      <button onclick="closeTipSheet()" style="background:${t.color};color:#000;border:none;width:100%;padding:13px;font-family:'Bebas Neue',sans-serif;font-size:20px;letter-spacing:4px;cursor:pointer;">理解した — 実践する</button>
    </div>`;
  document.getElementById('tip-overlay').classList.add('open');
}

function closeTipSheet(e) {
  if (!e || e.target === document.getElementById('tip-overlay'))
    document.getElementById('tip-overlay').classList.remove('open');
}

// ══════════════════════════════
//  COMMUNITY FEED
// ══════════════════════════════
function renderFeed() {
  const el = document.getElementById('feed');
  if (!el) return;
  el.innerHTML = appState.posts.map((p, i) => {
    const avHtml = (!p.isDummy && MEMBER.avatar)
      ? `<img src="${MEMBER.avatar}">`
      : p.av;
    const achHtml = p.ach ? `
      <div class="post-ach">
        <span class="ach-icon">${p.ach.icon}</span>
        <div class="ach-info">
          <div class="ach-label">${p.ach.label}</div>
          <div class="ach-val">${p.ach.val}</div>
        </div>
      </div>` : '';
    const commentsHtml = (p.comments && p.comments.length) ? `
      <div class="post-comments">
        ${p.comments.map(c => `
          <div class="post-comment">
            <div class="pc-av" style="background:${c.color}22;color:${c.color}">${c.av}</div>
            <div class="pc-body">
              <div class="pc-name">${c.name}</div>
              <div class="pc-text">${c.text}</div>
            </div>
          </div>`).join('')}
      </div>` : '';
    return `
      <div class="post-card" style="animation:pageIn .4s ${i * 35}ms ease both">
        <div class="post-avatar" style="background:${p.color}22;color:${p.color}">${avHtml}</div>
        <div class="post-body">
          <div class="post-header">
            <span class="post-name">${p.name}</span>
            <span class="post-badge" style="background:${p.badgeColor}22;color:${p.badgeColor};border:1px solid ${p.badgeColor}44;">${p.badge}</span>
            <span class="post-time">${p.time}</span>
          </div>
          <div class="post-text">${p.text}</div>
          ${achHtml}
          <div class="post-actions">
            <button class="post-like ${p.liked ? 'liked' : ''}" onclick="toggleLike(${p.id})">${p.liked ? '♥' : '♡'} ${p.likes}</button>
          </div>
          ${commentsHtml}
        </div>
      </div>`;
  }).join('');
}

function toggleLike(id) {
  const p = appState.posts.find(x => x.id === id);
  if (!p) return;
  p.liked  = !p.liked;
  p.likes += p.liked ? 1 : -1;
  renderFeed();
}

function submitPost() {
  const raw = document.getElementById('composer-ta').value.trim();
  if (!raw) { showToast('テキストを入力してください'); return; }
  const text = raw.replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const newPost = {
    id:        Date.now(),
    name:      MEMBER.name,
    av:        MEMBER.short[0] || '?',
    color:     '#c8ff00',
    time:      'たった今',
    badge:     'MEMBER',
    badgeColor:'rgba(242,240,255,0.3)',
    text,
    ach:       null,
    likes:     0,
    liked:     false,
    isMe:      true,
    isDummy:   false,
    comments:  [],
    ts:        Date.now(),
  };
  appState.posts.unshift(newPost);
  document.getElementById('composer-ta').value = '';
  renderFeed();
  showToast('投稿しました ✓');
  scheduleAutoComment(newPost.id);
}

// ══════════════════════════════
//  BOOK (Program tabs)
// ══════════════════════════════
function switchProgram(n) {
  [1, 2, 3].forEach(i => {
    const tab   = document.getElementById('prog-tab-' + i);
    const panel = document.getElementById('ycbm-panel-' + i);
    if (tab)   tab.classList.toggle('active', i === n);
    if (panel) panel.style.display = i === n ? 'block' : 'none';
  });
}

// ══════════════════════════════
//  PAGE NAVIGATION
// ══════════════════════════════
function goPage(name) {
  const sl = document.getElementById('scan-line-overlay');
  if (sl) { sl.classList.remove('scanning'); void sl.offsetWidth; sl.classList.add('scanning'); }

  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));

  const page = document.getElementById('page-' + name);
  const nav  = document.getElementById('nav-'  + name);
  if (page) page.classList.add('active');
  if (nav)  nav.classList.add('active');
  document.querySelector('.app-content').scrollTo(0, 0);

  if (name === 'settings') prefillSettings();
  if (name === 'community') startCommunityTimer();

  // nav アイコン スナップ
  if (nav) {
    const ico = nav.querySelector('.nav-icon');
    if (ico) {
      ico.classList.remove('spin');
      void ico.offsetWidth;
      ico.classList.add('spin');
      ico.addEventListener('animationend', () => ico.classList.remove('spin'), { once: true });
    }
  }
}

// ══════════════════════════════
//  SETTINGS PREFILL
// ══════════════════════════════
function prefillSettings() {
  const nameEl = document.getElementById('settings-name');
  if (nameEl) nameEl.value = MEMBER.name !== 'メンバー' ? MEMBER.name : '';
  const goalEl = document.getElementById('settings-goal');
  if (goalEl) goalEl.value = MEMBER.goal || '';
}

// ══════════════════════════════
//  INIT
// ══════════════════════════════
function initApp() {
  // 名前・アバターをUIに反映
  const topbar = document.getElementById('topbar-member');
  if (topbar) topbar.textContent = MEMBER.name;
  applyAvatar(MEMBER.avatar);

  setGreeting();
  renderStreakDots();

  // 目標カード
  const gt = document.getElementById('goal-text');
  if (gt) gt.textContent = MEMBER.goal || '目標を設定してください →';

  // Tips
  renderFilterRow();
  renderTipsList();

  // Community
  renderFeed();
  startCommunityTimer();
}

function setGreeting() {
  const h = new Date().getHours();
  const g = h < 12 ? 'Good morning' : h < 18 ? 'Good afternoon' : 'Good evening';
  const el = document.getElementById('home-greeting');
  if (el) el.textContent = g;
  const nm = document.getElementById('home-name');
  if (nm) nm.textContent = MEMBER.short;
  const since = document.getElementById('home-since');
  if (since) {
    const days = Math.floor((Date.now() - new Date(MEMBER.since)) / 86400000);
    since.textContent = `Member since ${MEMBER.since} — Day ${days}`;
  }
}

function renderStreakDots() {
  const c = document.getElementById('streak-dots');
  if (!c) return;
  const sn = document.getElementById('streak-num');
  if (sn) sn.textContent = MEMBER.streak;
  c.innerHTML = '';
  for (let i = 0; i < 14; i++) {
    const d = document.createElement('div');
    d.className = 'sd' + (i < MEMBER.streak && i < 14 ? ' on' : '');
    c.appendChild(d);
  }
}

// ══════════════════════════════
//  UTILS
// ══════════════════════════════
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2800);
}

// ══════════════════════════════
//  BOOT
// ══════════════════════════════
window.addEventListener('load', () => {
  loadFromLocalStorage();
  initApp();

  // iOS PWA ヒント
  const isIos        = /iphone|ipad|ipod/.test(navigator.userAgent.toLowerCase());
  const isStandalone = window.navigator.standalone === true;
  if (isIos && !isStandalone) {
    setTimeout(() => showToast('ホーム画面に追加するとアプリとして使えます'), 3000);
  }
});
