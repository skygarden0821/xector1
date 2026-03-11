// ══════════════════════════════
//  DATA
// ══════════════════════════════
const MEMBER = { name:'田中 雄介', short:'田中', since:'2024-11-01', streak:23, rank:1, goal:'', avatar:null };

const SNS = {
  yt:{ sub:24100, views:1230000, posts:18, imp:450000 },
  tt:{ sub:82000, views:890000,  posts:22, likes:340000 },
  ig:{ sub:56000, reach:120000,  posts:12 },
  x: { sub:31000, imp:450000,    posts:30, eng:8200 },
};

const MONTHLY = {
  followers:[18200,19800,21100,22400,23500,24100],
  views:    [780000,850000,920000,1050000,1150000,1230000],
  posts:    [14,16,18,17,19,18],
  likes:    [28000,31000,34000,38000,41000,45000],
  imp:      [320000,350000,390000,420000,440000,450000],
};
const WEEKLY  = { followers:[23200,23500,23800,24100], views:[1180000,1200000,1215000,1230000], posts:[4,5,4,5], likes:[43000,44000,44500,45000], imp:[440000,445000,448000,450000] };
const YEARLY  = { followers:[8200,18200,24100], views:[210000,780000,1230000], posts:[8,14,18], likes:[11000,28000,45000], imp:[120000,320000,450000] };
const LABELS  = { month:['10月','11月','12月','1月','2月','3月'], week:['3/1週','3/2週','3/3週','3/4週'], year:['2023','2024','2025'] };

const AXES = [
  { key:'followers', label:'フォロワー', color:'#c8ff00', max:100000 },
  { key:'views',     label:'再生数',     color:'#00f0ff', max:2000000 },
  { key:'posts',     label:'投稿数',     color:'#9f6fff', max:80 },
  { key:'likes',     label:'いいね',     color:'#ff3d80', max:500000 },
  { key:'imp',       label:'インプレ',   color:'#ffb700', max:1000000 },
  { key:'reach',     label:'リーチ',     color:'#00ffaa', max:300000 },
];

const METRICS = [
  { key:'followers', label:'フォロワー' },
  { key:'views',     label:'再生数' },
  { key:'posts',     label:'投稿数' },
  { key:'likes',     label:'いいね' },
  { key:'imp',       label:'インプレ' },
];

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
  { key:'all', label:'すべて' },
  { key:'content', label:'コンテンツ' },
  { key:'algorithm', label:'アルゴリズム' },
  { key:'growth', label:'成長戦略' },
  { key:'mindset', label:'マインドセット' },
  { key:'collab', label:'コラボ' },
];

// ── ダミーメンバーデータ（実在感を出すためバリエーション豊富に）──
const DUMMY_MEMBERS = [
  { name:'渡辺 拓海', av:'渡', color:'#ff3d80', badge:'RANK #1', badgeColor:'#c8ff00' },
  { name:'佐藤 美優', av:'佐', color:'#00f0ff', badge:'GROWING', badgeColor:'#00f0ff' },
  { name:'伊藤 さくら', av:'伊', color:'#9f6fff', badge:'MEMBER', badgeColor:'rgba(242,240,255,0.3)' },
  { name:'中村 蓮', av:'中', color:'#ffb700', badge:'TOP MEMBER', badgeColor:'#c8ff00' },
  { name:'高橋 ひな', av:'高', color:'#00ffaa', badge:'GROWING', badgeColor:'#00f0ff' },
  { name:'小林 悠斗', av:'小', color:'#ff7043', badge:'MEMBER', badgeColor:'rgba(242,240,255,0.3)' },
  { name:'山田 彩花', av:'山', color:'#ab47bc', badge:'MEMBER', badgeColor:'rgba(242,240,255,0.3)' },
  { name:'加藤 颯', av:'加', color:'#26c6da', badge:'GROWING', badgeColor:'#00f0ff' },
];

const DUMMY_POSTS_POOL = [
  // 朝系（活動開始・気合い）
  { text:'おはようございます！今日はいつもより1時間早く起きて編集してました。朝の集中力えぐい。このペース続けたい', ach:null, likes:14, timeSlot:'morning' },
  { text:'今朝投稿した動画、もう<strong>3,200再生</strong>いってる🙌 朝イチで投稿するの正解だったかも。フォロワーさんの反応早い', ach:null, likes:22, timeSlot:'morning' },
  { text:'今日から編集ワーク週5にしてみる実験スタート。まずは1週間試してみます。応援してください笑', ach:null, likes:11, timeSlot:'morning' },
  { text:'昨日の動画の続きを朝から収録。台本作るより先に話し始めた方が自然になるって気づいてからだいぶ楽になった', ach:null, likes:17, timeSlot:'morning' },
  // 昼系（作業中・報告）
  { text:'今日はいつもより<strong>+2本</strong>出せてる〜！！テンポよく編集できてる日って気持ちいい。このまま夜まで走ります', ach:null, likes:26, timeSlot:'noon' },
  { text:'昼休みに撮影して帰宅後に編集、これが今のスタイルになってきた。やっとルーティン固まってきた感', ach:null, likes:13, timeSlot:'noon' },
  { text:'ショートが伸びてる。ここ3日で<strong>+890フォロワー</strong>。なんか急にアルゴリズムに乗れた感じがある', ach:{ icon:'📈', label:'Growing', val:'+890フォロワー' }, likes:38, timeSlot:'noon' },
  // 夕方系（振り返り・進捗）
  { text:'みんな頑張ってるの見てると刺激になる！！負けてらんない。今から編集頑張る🔥', ach:null, likes:31, timeSlot:'evening' },
  { text:'今日3本投稿できた。疲れたけど満足感がすごい。週に1回これやるだけで月の本数全然変わってくるよね', ach:null, likes:19, timeSlot:'evening' },
  { text:'TikTokでずっと伸び悩んでたけど、サムネ変えたら突然<strong>1.2万再生</strong>きた。見た目って本当に大事', ach:{ icon:'🎯', label:'Breakthrough', val:'1.2万再生' }, likes:44, timeSlot:'evening' },
  { text:'面談でフィードバックもらった内容を即実行してみた。「最初の3秒」だけ変えたら視聴維持が全然違う。やっぱり試すのが一番', ach:null, likes:27, timeSlot:'evening' },
  // 夜系（締め・翌日準備）
  { text:'今日の投稿が夜になってじわじわ伸びてる。<strong>5,600再生</strong>。寝る前にこれ見るの好きすぎる笑', ach:null, likes:35, timeSlot:'night' },
  { text:'明日の台本書き終えた。明後日撮影。ちゃんとストック作れてる。この流れを崩さないようにしたい', ach:null, likes:12, timeSlot:'night' },
  { text:'今月の目標本数まであと2本。明日中に終わらせる予定。ぎりぎりだけど間に合わせます', ach:null, likes:9, timeSlot:'night' },
  // 深夜系（1本のみ・控えめ）
  { text:'また深夜作業してしまった…でも今日の編集すごく良い仕上がりになった気がする。明日の反応楽しみ', ach:null, likes:8, timeSlot:'latenight' },
];

let _dummyTimer = null;

function injectRandomPost(silent){
  const pool = DUMMY_POSTS_POOL;
  const members = DUMMY_MEMBERS;
  // 直前と違うメンバーを選ぶ
  const lastName = appState.posts.find(x=>x.isDummy)?.name;
  const eligible = members.filter(m=>m.name!==lastName);
  const m = eligible[Math.floor(Math.random()*eligible.length)];
  const p = pool[Math.floor(Math.random()*pool.length)];
  const newPost = {
    id: Date.now(),
    name: m.name, av: m.av, color: m.color,
    badge: m.badge, badgeColor: m.badgeColor,
    time: 'たった今',
    text: p.text,
    ach: p.ach ? {...p.ach} : null,
    likes: p.likes + Math.floor(Math.random()*6),
    liked: false,
    isDummy: true,
    isMe: false,
    ts: Date.now(),
  };
  // 自分の投稿（isMe）は保持、ダミーはその前に追加
  const myPosts = appState.posts.filter(x=>x.isMe);
  const dummies = appState.posts.filter(x=>!x.isMe);
  dummies.unshift(newPost);
  if(dummies.length > 18) dummies.pop();
  appState.posts = [...myPosts, ...dummies];
  // 時刻を経過に応じて更新
  updatePostTimes();
  if(!silent) renderFeed();
  else renderFeed();
}

function updatePostTimes(){
  const now = Date.now();
  appState.posts.forEach(p=>{
    if(!p.ts) return;
    const min = Math.floor((now - p.ts) / 60000);
    if(min < 1)       p.time = 'たった今';
    else if(min < 60) p.time = `${min}分前`;
    else if(min < 120) p.time = '1時間前';
    else               p.time = `${Math.floor(min/60)}時間前`;
  });
}

function startDummyTimer(){
  if(_dummyTimer) clearInterval(_dummyTimer);
  // 最初に1件挿入
  injectRandomPost(false);
  // 2〜4分ごとにランダムで新着投稿
  function scheduleNext(){
    const ms = (120 + Math.floor(Math.random()*120)) * 1000; // 2〜4分
    _dummyTimer = setTimeout(()=>{
      injectRandomPost(false);
      scheduleNext();
    }, ms);
  }
  scheduleNext();
  // 1分ごとに時刻表示を更新
  setInterval(()=>{ updatePostTimes(); renderFeed(); }, 60000);
}

const COMM_POSTS = [
  { id:1, name:'渡辺 拓海', av:'渡', color:'#ff3d80', time:'2時間前', badge:'RANK #1', badgeColor:'#c8ff00',
    text:'今週で<strong>YouTubeチャンネル登録者40万人</strong>を突破しました！参加してから8ヶ月、本当に継続してよかったです。',
    ach:{ icon:'🏆', label:'Achievement', val:'40万人 突破' }, likes:24, liked:false, isDummy:true },
  { id:2, name:'佐藤 美優', av:'佐', color:'#00f0ff', time:'5時間前', badge:'GROWING', badgeColor:'#00f0ff',
    text:'TikTokのエンゲージメント率が先月比で<strong>+4.2%</strong>上がりました。投稿後30分の集中対応を始めてから明らかに初速が変わった感じがします。',
    ach:null, likes:18, liked:false, isDummy:true },
  { id:3, name:'伊藤 さくら', av:'伊', color:'#9f6fff', time:'2日前', badge:'MEMBER', badgeColor:'rgba(242,240,255,0.3)',
    text:'初めて<strong>Instagramリール</strong>が1万再生を超えました！「共感型」で作った動画でした。ここのTipsがめちゃくちゃ役に立ってます。',
    ach:{ icon:'🎉', label:'First Milestone', val:'1万再生 達成' }, likes:31, liked:false, isDummy:true },
];

const SESSIONS_DATA = [
  { id:'strategy', icon:'⚡', type:'FLAGSHIP', name:'戦略セッション', dur:'60分',
    desc:'現状の数値を深く分析し、次の1ヶ月の戦略を一緒に設計。月1回推奨のメインセッション。',
    price:'¥included', priceNote:'月額費用に含まれています', color:'var(--lime)' },
  { id:'content', icon:'🎬', type:'ADDON', name:'コンテンツ添削', dur:'45分',
    desc:'動画・サムネイル・タイトルを実際に見ながらフィードバック。改善点を具体的に指摘します。',
    price:'¥5,500', priceNote:'会員割引価格 (通常¥8,800)', color:'var(--cyan)' },
  { id:'emergency', icon:'🔥', type:'URGENT', name:'緊急相談', dur:'30分',
    desc:'「今すぐ話したい」ときのための緊急枠。バズった・炎上しそう・突然の案件など即対応。',
    price:'¥3,300', priceNote:'会員割引価格 (通常¥5,500)', color:'var(--pink)' },
];

const SLOT_DATA = {
  11:[{t:'10:00',a:true},{t:'14:00',a:true},{t:'19:00',a:true}],
  12:[{t:'11:00',a:false},{t:'15:00',a:true},{t:'20:00',a:true}],
  14:[{t:'10:00',a:true},{t:'14:00',a:false},{t:'18:00',a:true}],
  17:[{t:'10:00',a:true},{t:'13:00',a:true},{t:'20:00',a:true}],
  18:[{t:'11:00',a:true},{t:'16:00',a:true}],
  20:[{t:'10:00',a:true},{t:'14:00',a:true},{t:'19:00',a:true}],
  22:[{t:'13:00',a:true},{t:'20:00',a:true}],
  24:[{t:'10:00',a:true},{t:'15:00',a:true}],
  27:[{t:'11:00',a:true},{t:'14:00',a:true},{t:'20:00',a:true}],
};

// ══════════════════════════════
//  STATE
// ══════════════════════════════
let appState = {
  period:'month', metric:'followers',
  tipFilter:'all',
  session:null, calYear:2025, calMonth:2, calDay:null, calTime:null,
  posts:[...COMM_POSTS],
};
let radarChart=null, lineChart=null, shareRadarChart=null;

// ══════════════════════════════
//  SUPABASE
// ══════════════════════════════
const SUPA_URL = 'https://vpjlxxxsxxyfddqncuaj.supabase.co';
const SUPA_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZwamx4eHhzeHh5ZmRkcW5jdWFqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMwNTA4NjgsImV4cCI6MjA4ODYyNjg2OH0.zsCWK4-R_eo2yR9NEXEW9FQMmqbNgxNXotRzpbAs1jA';
const supa = supabase.createClient(SUPA_URL, SUPA_KEY);

let currentUser = null;

// セッション復元（ページ再読み込み時に自動ログイン）
async function restoreSession(){
  try {
    const { data:{ session } } = await supa.auth.getSession();
    if(session){
      currentUser = session.user;
      showApp();
    } else {
      const el = document.getElementById('screen-login');
      if(el) el.style.display='flex';
    }
  } catch(e) {
    console.error('restoreSession error:', e);
    const el = document.getElementById('screen-login');
    if(el) el.style.display='flex';
    // file://で開いている or Supabaseが停止中の場合に警告
    if(e && (e.message||'').toLowerCase().includes('fetch')){
      setTimeout(()=>{
        showError(
          '⚠ 接続失敗: Supabaseに到達できません。\n' +
          '① Supabaseダッシュボードでプロジェクトが稼働中か確認 → https://supabase.com/dashboard\n' +
          '② file://で開いている場合はVercel等のURLで開いてください（CORS制限）'
        );
      }, 500);
    }
  }
}

function showApp(){
  const login = document.getElementById('screen-login');
  const app   = document.getElementById('app');
  login.classList.add('out');
  setTimeout(()=>{
    login.style.display='none';
    app.classList.add('visible');
    loadUserAndInit();
  }, 1200);
}

// ══════════════════════════════
//  LOGIN
// ══════════════════════════════
async function doLogin(){

  try {
  const email = document.getElementById('l-email').value.trim();
  const pass  = document.getElementById('l-pass').value.trim();
  if(!email||!pass){ showToast('メールとパスワードを入力してください'); return; }

  const btn = document.querySelector('.btn-login');
  btn.querySelector('span').textContent = '認証中...';
  btn.disabled = true;

  const { data, error } = await supa.auth.signInWithPassword({ email, password:pass });

  if(error){
    // 未登録ならサインアップ
    if(error.message.includes('Invalid login') || error.message.includes('invalid')){
      const { data:su, error:se } = await supa.auth.signUp({ email, password:pass });
      if(se){ showToast('エラー: '+se.message); btn.querySelector('span').textContent='ENTER'; btn.disabled=false; return; }
      currentUser = su.user;
    } else {
      showToast('ログインエラー: '+error.message);
      btn.querySelector('span').textContent='ENTER'; btn.disabled=false; return;
    }
  } else {
    currentUser = data.user;
  }

  document.getElementById('screen-login').classList.add('out');
  setTimeout(()=>showApp(), 600);
  } catch(e) {
    console.error('doLogin error:', e);
    const btn = document.querySelector('.btn-login');
    if(btn){ btn.querySelector('span').textContent='ENTER'; btn.disabled=false; }
    // Supabaseプロジェクト停止 or ネットワーク障害の判定
    if(e && (e.message||'').toLowerCase().includes('fetch')){
      showError(
        '接続エラー: Supabaseサーバーに接続できません。\n' +
        '① Supabaseダッシュボードでプロジェクトが「停止中」でないか確認 → https://supabase.com/dashboard\n' +
        '② ファイルをローカルで直接開いている場合はVercel/サーバー経由で開いてください（file://はCORSエラーになります）\n' +
        '③ ネットワーク接続を確認してください'
      );
    } else {
      showToast('エラー: ' + (e.message || '不明なエラー'));
    }
  }
}

// ══════════════════════════════
//  PROFILE SETUP
// ══════════════════════════════
const SP_GENRES = ['歌い手','ゲーム実況','Vtuber','ダンス','音楽制作','ラジオ/トーク','イラスト/アート','その他'];
let spGenres = [];
let spStep = 1;

function initSetup(){
  document.getElementById('screen-setup').classList.add('visible');
  spRenderGenres();
}

function spRenderGenres(){
  document.getElementById('sp-genre-pills').innerHTML = SP_GENRES.map(g=>`
    <div class="gpill ${spGenres.includes(g)?'sel':''}" onclick="spToggleGenre('${g}')">${g}</div>
  `).join('');
}
function spToggleGenre(g){
  spGenres = spGenres.includes(g) ? spGenres.filter(x=>x!==g) : [...spGenres,g];
  spRenderGenres();
}

function spValidate(id, type){
  const el  = document.getElementById(id);
  const val = el.value.trim();
  const err = document.getElementById('sperr-'+id);
  let ok = false;
  if(type==='name') ok = val.length >= 2;
  if(type==='yomi') ok = /^[ぁ-んー\s]+$/.test(val);
  if(type==='req')  ok = val.length >= 1;
  el.className = val ? (ok?'valid':'invalid') : '';
  if(err) err.className = 'sf-err'+(val&&!ok?' show':'');
  return ok;
}

function spValidateUrl(platform, domain){
  const id  = 'sp-'+platform+'-url';
  const val = document.getElementById(id).value.trim();
  const err = document.getElementById('sperr-'+platform);
  const chk = document.getElementById('urlchk-'+platform);
  const badge = document.getElementById('ssb-badge-'+platform);
  const block = document.getElementById('ssb-'+platform);
  if(!val){
    document.getElementById(id).className='';
    err.className='sf-err'; chk.textContent='';
    badge.textContent='未入力'; badge.className='ssb-badge';
    block.classList.remove('has-url');
    return true;
  }
  const domains = platform==='x' ? ['x.com','twitter.com'] : [domain];
  const valid = domains.some(d=>val.includes(d)) && val.startsWith('http');
  document.getElementById(id).className = valid?'valid':'invalid';
  err.className  = 'sf-err'+(!valid?' show':'');
  chk.textContent = valid?'✓':'✕';
  chk.style.color = valid?'var(--green)':'#ff4444';
  badge.textContent = valid?'✓ 入力済み':'要確認';
  badge.className = 'ssb-badge'+(valid?' ok':'');
  block.classList.toggle('has-url', valid);
  return valid;
}

function spNext(from){
  if(from===1){
    const v1=spValidate('sp-name','name');
    const v2=spValidate('sp-yomi','yomi');
    const v3=spValidate('sp-stage','req');
    const v4=spGenres.length>0;
    const v5=document.getElementById('sp-status').value!=='';
    if(!v4){showToast('ジャンルを1つ以上選んでください');return;}
    if(!v5){document.getElementById('sperr-sp-status').className='sf-err show';return;}
    if(!v1||!v2||!v3) return;
  }
  if(from===2){
    const ps=['yt','tt','ig','x'], dm={yt:'youtube.com',tt:'tiktok.com',ig:'instagram.com',x:'x.com'};
    let anyFilled=false, allOk=true;
    ps.forEach(p=>{ const v=document.getElementById('sp-'+p+'-url').value.trim();
      if(v){anyFilled=true; if(!spValidateUrl(p,dm[p]))allOk=false;} });
    if(!anyFilled){showToast('SNSを最低1つ入力してください');return;}
    if(!allOk){showToast('URLの形式を確認してください');return;}
    spBuildConfirm();
  }
  spSetStep(from+1);
}
function spPrev(from){ spSetStep(from-1); }

function spSetStep(n){
  spStep=n;
  document.querySelectorAll('.setup-panel').forEach(p=>p.classList.remove('active'));
  document.getElementById('sp-'+n).classList.add('active');
  document.querySelectorAll('.sp-step').forEach((s,i)=>{
    s.classList.remove('active','done');
    if(i+1<n)  s.classList.add('done');
    if(i+1===n) s.classList.add('active');
  });
  document.getElementById('screen-setup').scrollTo({top:0,behavior:'smooth'});
}

const SP_STATUS_LABELS={
  just_started:'これから始める',
  under_1k:'1,000フォロワー未満',
  '1k_10k':'1,000〜10,000フォロワー',
  '10k_100k':'1万〜10万フォロワー',
  over_100k:'10万フォロワー以上',
};
function spBuildConfirm(){
  const rows=[
    {l:'本名',    v:document.getElementById('sp-name').value.trim()},
    {l:'よみがな',v:document.getElementById('sp-yomi').value.trim()},
    {l:'活動名',  v:document.getElementById('sp-stage').value.trim()},
    {l:'ジャンル',v:spGenres.join(' / ')},
    {l:'状況',    v:SP_STATUS_LABELS[document.getElementById('sp-status').value]||''},
    {l:'YouTube', v:document.getElementById('sp-yt-url').value.trim(), url:true},
    {l:'TikTok',  v:document.getElementById('sp-tt-url').value.trim(), url:true},
    {l:'Instagram',v:document.getElementById('sp-ig-url').value.trim(), url:true},
    {l:'X',       v:document.getElementById('sp-x-url').value.trim(), url:true},
  ].filter(r=>r.v);
  document.getElementById('sp-confirm-block').innerHTML=rows.map(r=>`
    <div class="conf-row">
      <span class="conf-l">${r.l}</span>
      <span class="${r.url?'conf-url':'conf-v'}">${r.v}</span>
    </div>`).join('');
}

async function spSubmit(){

  try {
  const btn=document.getElementById('sp-submit-btn');
  btn.textContent='保存中...'; btn.disabled=true;

  // Supabase auth.usersへの反映を確実に待つ
  await new Promise(r => setTimeout(r, 1000));

  // セッションを最新に更新
  const { data:{ session } } = await supa.auth.getSession();
  if(session) currentUser = session.user;

  const payload={
    id:         currentUser.id,
    name:       document.getElementById('sp-name').value.trim(),
    yomi:       document.getElementById('sp-yomi').value.trim(),
    stage_name: document.getElementById('sp-stage').value.trim(),
    genres:     spGenres.join(','),
    status:     document.getElementById('sp-status').value,
    goal:       document.getElementById('sp-goal').value.trim(),
    yt_url:     document.getElementById('sp-yt-url').value.trim()||null,
    tt_url:     document.getElementById('sp-tt-url').value.trim()||null,
    ig_url:     document.getElementById('sp-ig-url').value.trim()||null,
    x_url:      document.getElementById('sp-x-url').value.trim()||null,
    registered_at: new Date().toISOString(),
    approved:   false,
  };
  const {error} = await supa.from('profiles').upsert(payload);
  if(error){ showError('保存エラー: '+error.message); btn.textContent='登録してポータルへ →'; btn.disabled=false; return; }
  MEMBER.name  = payload.stage_name || payload.name;
  MEMBER.short = (payload.stage_name || payload.name || "").split(" ")[0] || MEMBER.name;
  document.getElementById('screen-setup').classList.remove('visible');
  loadUserAndInit();
  } catch(e) {
    console.error('spSubmit:', e);
    showToast('保存エラー: ' + e.message);
  }
}

// ══════════════════════════════
//  USER DATA LOAD
// ══════════════════════════════
async function loadUserAndInit(){
  if(!currentUser){ initApp(); return; }
  try {
  // プロフィール取得
  let { data:prof } = await supa.from('profiles').select('*').eq('id',currentUser.id).single();

  // 初回ログイン or プロフィール未設定 → セットアップ画面へ
  if(!prof || !prof.stage_name){
    initSetup();
    return;
  }

  MEMBER.name  = prof.stage_name || prof.name || currentUser.email.split("@")[0];
  MEMBER.short = (prof.stage_name || prof.name || "").split(" ")[0] || MEMBER.name;
  if(prof.registered_at) MEMBER.since = prof.registered_at.split("T")[0];
  if(prof.goal) MEMBER.goal = prof.goal;
  document.getElementById("topbar-member").textContent = MEMBER.name;

  // 最新のSNS数値を取得
  const { data:stats } = await supa.from('sns_stats')
    .select('*').eq('user_id',currentUser.id)
    .order('recorded_at',{ascending:false}).limit(1);

  if(stats && stats.length > 0){
    const s = stats[0];
    SNS.yt.sub    = s.yt_subscribers  || 0;
    SNS.yt.views  = s.yt_views        || 0;
    SNS.yt.posts  = s.yt_posts        || 0;
    SNS.tt.sub    = s.tt_followers    || 0;
    SNS.tt.views  = s.tt_views        || 0;
    SNS.tt.posts  = s.tt_posts        || 0;
    SNS.ig.sub    = s.ig_followers    || 0;
    SNS.ig.reach  = s.ig_reach        || 0;
    SNS.ig.posts  = s.ig_posts        || 0;
    SNS.x.sub     = s.x_followers     || 0;
    SNS.x.imp     = s.x_impressions   || 0;
    SNS.x.posts   = s.x_posts         || 0;
  }

  initApp();
  // 週次サマリー・マイルストーン確認
  checkWeeklyAndMilestones(stats);
  try{ updateGoalProgress(); }catch(e){ console.warn(e); }
  } catch(e) {
    console.error('loadUserAndInit:', e);
    showToast('データ読み込みエラー。再ログインしてください。');
    initApp();
  }
}

// ══════════════════════════════
//  SAVE STATS TO DB
// ══════════════════════════════
async function saveStatsToDB(){

  try {
  if(!currentUser){ showToast('ログインが必要です'); return; }

  const payload = {
    user_id:        currentUser.id,
    recorded_at:    new Date().toISOString().split('T')[0],
    yt_subscribers: SNS.yt.sub,
    yt_views:       SNS.yt.views,
    yt_posts:       SNS.yt.posts,
    tt_followers:   SNS.tt.sub,
    tt_views:       SNS.tt.views,
    tt_posts:       SNS.tt.posts,
    ig_followers:   SNS.ig.sub,
    ig_reach:       SNS.ig.reach,
    ig_posts:       SNS.ig.posts,
    x_followers:    SNS.x.sub,
    x_impressions:  SNS.x.imp,
    x_posts:        SNS.x.posts,
  };

  const { error } = await supa.from('sns_stats').insert(payload);
  if(error){ showToast('保存エラー: '+error.message); return; }
  showToast('数値をDBに保存しました ✓');
  updateGoalProgress();
  checkWeeklyAndMilestones(null);
  setTimeout(()=>goPage('home'),800);
  } catch(e) {
    console.error('saveStatsToDB:', e);
    showToast('保存エラー: ' + e.message);
  }
}


// ══════════════════════════════
//  AVATAR & GOAL
// ══════════════════════════════
function applyAvatar(dataUrl){
  MEMBER.avatar = dataUrl;
  // topbar
  const tb = document.getElementById('topbar-avatar-inner');
  if(tb) tb.innerHTML = dataUrl ? `<img src="${dataUrl}">` : MEMBER.short[0]||'?';
  // x-composer
  const xav = document.getElementById('x-composer-av');
  if(xav) xav.innerHTML = dataUrl ? `<img src="${dataUrl}">` : (MEMBER.short[0]||'?');
  // home
  const ha = document.getElementById('home-avatar-inner');
  if(ha) ha.innerHTML = dataUrl ? `<img src="${dataUrl}">` : MEMBER.short[0]||'?';
  // settings preview
  const sp = document.getElementById('avatar-preview-inner');
  if(sp) sp.innerHTML = dataUrl ? `<img src="${dataUrl}">` : MEMBER.short[0]||'?';
  // composer
  const ca = document.getElementById('composer-avatar-img');
  if(ca){ ca.innerHTML = dataUrl ? `<img src="${dataUrl}">` : MEMBER.short[0]||'?'; }
}

// ── CROP 機能 ──
let cropState = { img:null, x:0, y:0, scale:1, dragging:false, lastX:0, lastY:0 };

function onAvatarFileSelected(e){
  const file = e.target.files[0];
  if(!file) return;
  const reader = new FileReader();
  reader.onload = ev => {
    const img = new Image();
    img.onload = () => {
      cropState.img   = img;
      cropState.x     = 0;
      cropState.y     = 0;
      cropState.scale = 1;
      document.getElementById('avatar-crop-wrap').classList.add('visible');
      drawCrop();
    };
    img.src = ev.target.result;
  };
  reader.readAsDataURL(file);
}

function drawCrop(){
  const wrap   = document.getElementById('crop-canvas-wrap');
  const canvas = document.getElementById('crop-canvas');
  const size   = wrap.offsetWidth;
  canvas.width  = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0,0,size,size);
  // 円クリップ
  ctx.save();
  ctx.beginPath();
  ctx.arc(size/2,size/2,size/2,0,Math.PI*2);
  ctx.clip();
  ctx.fillStyle='#111';
  ctx.fillRect(0,0,size,size);
  if(cropState.img){
    const s = cropState.scale;
    const iw = cropState.img.width * s;
    const ih = cropState.img.height * s;
    const mx = Math.min(0, Math.max(size-iw, cropState.x));
    const my = Math.min(0, Math.max(size-ih, cropState.y));
    cropState.x = mx; cropState.y = my;
    ctx.drawImage(cropState.img, mx, my, iw, ih);
  }
  ctx.restore();
  // 円枠
  ctx.strokeStyle='rgba(200,255,0,0.5)';
  ctx.lineWidth=2;
  ctx.beginPath();
  ctx.arc(size/2,size/2,size/2-1,0,Math.PI*2);
  ctx.stroke();
}

// タッチ・マウスドラッグ
(function(){
  let pending = false;
  function setupDrag(){
    const c = document.getElementById('crop-canvas');
    if(!c) return;
    function start(x,y){ cropState.dragging=true; cropState.lastX=x; cropState.lastY=y; }
    function move(x,y){
      if(!cropState.dragging) return;
      cropState.x += x - cropState.lastX;
      cropState.y += y - cropState.lastY;
      cropState.lastX=x; cropState.lastY=y;
      if(!pending){ pending=true; requestAnimationFrame(()=>{ drawCrop(); pending=false; }); }
    }
    function end(){ cropState.dragging=false; }
    c.addEventListener('mousedown', e=>start(e.clientX,e.clientY));
    c.addEventListener('mousemove', e=>move(e.clientX,e.clientY));
    c.addEventListener('mouseup',   end);
    c.addEventListener('touchstart', e=>{ const t=e.touches[0]; start(t.clientX,t.clientY); },{passive:true});
    c.addEventListener('touchmove',  e=>{ const t=e.touches[0]; move(t.clientX,t.clientY); e.preventDefault(); },{passive:false});
    c.addEventListener('touchend',   end);
    // ピンチズーム
    let lastDist=0;
    c.addEventListener('touchmove', e=>{
      if(e.touches.length===2){
        const dx=e.touches[0].clientX-e.touches[1].clientX;
        const dy=e.touches[0].clientY-e.touches[1].clientY;
        const dist=Math.sqrt(dx*dx+dy*dy);
        if(lastDist){ cropState.scale = Math.max(0.5, Math.min(4, cropState.scale*(dist/lastDist))); drawCrop(); }
        lastDist=dist;
      } else { lastDist=0; }
    },{passive:false});
    c.addEventListener('touchend', ()=>{ lastDist=0; });
    // ホイールズーム
    c.addEventListener('wheel', e=>{
      cropState.scale = Math.max(0.5, Math.min(4, cropState.scale*(e.deltaY<0?1.08:0.93)));
      drawCrop(); e.preventDefault();
    },{passive:false});
  }
  // DOMロード後にセットアップ
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',setupDrag);
  else setupDrag();
  // settingsページが表示されたタイミングでも再セット
  const orig = window.goPage;
  // （goPage内でsetupDragを再度呼ばなくても一度登録されればOK）
})();

function cancelCrop(){
  document.getElementById('avatar-crop-wrap').classList.remove('visible');
  document.getElementById('avatar-file-input').value='';
}

function saveCrop(){
  const canvas = document.getElementById('crop-canvas');
  const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
  applyAvatar(dataUrl);
  // localStorageに保存（小さい画像なのでOK）
  try{ localStorage.setItem('xector1_avatar_'+currentUser?.id, dataUrl); } catch(e){}
  cancelCrop();
  showToast('アイコンを保存しました ✓');
}

function loadAvatarFromStorage(){
  if(!currentUser) return;
  try{
    const saved = localStorage.getItem('xector1_avatar_'+currentUser.id);
    if(saved) applyAvatar(saved);
    else applyAvatar(null);
  } catch(e){}
}


// ── SETTINGS から SNS 数値保存 ──
async function saveStatsFromSettings(){

  try {
  const g = id => { const v=parseInt(document.getElementById(id)?.value||'0'); return isNaN(v)?0:v; };
  SNS.yt.sub   = g('s-yt-sub')   || SNS.yt.sub;
  SNS.yt.views = g('s-yt-views') || SNS.yt.views;
  SNS.yt.posts = g('s-yt-posts') || SNS.yt.posts;
  SNS.tt.sub   = g('s-tt-sub')   || SNS.tt.sub;
  SNS.tt.views = g('s-tt-views') || SNS.tt.views;
  SNS.tt.posts = g('s-tt-posts') || SNS.tt.posts;
  SNS.ig.sub   = g('s-ig-sub')   || SNS.ig.sub;
  SNS.ig.reach = g('s-ig-reach') || SNS.ig.reach;
  SNS.ig.posts = g('s-ig-posts') || SNS.ig.posts;
  SNS.x.sub    = g('s-x-sub')    || SNS.x.sub;
  SNS.x.imp    = g('s-x-imp')    || SNS.x.imp;
  SNS.x.posts  = g('s-x-posts')  || SNS.x.posts;

  // ホームのKPIグリッドを再描画
  renderKPIGrid();
  initRadar();
  renderMetricScroll();
  initLineChart();

  // DBに保存
  if(currentUser){
    const payload = {
      user_id: currentUser.id,
      recorded_at: new Date().toISOString().split('T')[0],
      yt_subscribers: SNS.yt.sub, yt_views: SNS.yt.views, yt_posts: SNS.yt.posts,
      tt_followers: SNS.tt.sub,   tt_views: SNS.tt.views, tt_posts: SNS.tt.posts,
      ig_followers: SNS.ig.sub,   ig_reach: SNS.ig.reach, ig_posts: SNS.ig.posts,
      x_followers: SNS.x.sub,     x_impressions: SNS.x.imp, x_posts: SNS.x.posts,
    };
    const { error } = await supa.from('sns_stats').insert(payload);
    if(error){ showToast('DB保存エラー: '+error.message); return; }
  }
  showToast('数値を更新しました ✓');
  updateGoalProgress();
  } catch(e) {
    console.error('saveStatsFromSettings:', e);
    showToast('保存エラー: ' + e.message);
  }
}

// ── 設定ページを開いたとき現在値をフィールドにセット ──
function prefillSettingsSNS(){
  const set = (id, val) => { const el=document.getElementById(id); if(el&&val!==undefined&&val!==null) el.value=val; };
  // 名前と目標をプリフィル
  const nameEl = document.getElementById('settings-name');
  if(nameEl && MEMBER.name) nameEl.value = MEMBER.name;
  const goalEl = document.getElementById('settings-goal');
  if(goalEl && MEMBER.goal) goalEl.value = MEMBER.goal;
  set('s-yt-sub',   SNS.yt.sub);
  set('s-yt-views', SNS.yt.views);
  set('s-yt-posts', SNS.yt.posts);
  set('s-tt-sub',   SNS.tt.sub);
  set('s-tt-views', SNS.tt.views);
  set('s-tt-posts', SNS.tt.posts);
  set('s-ig-sub',   SNS.ig.sub);
  set('s-ig-reach', SNS.ig.reach);
  set('s-ig-posts', SNS.ig.posts);
  set('s-x-sub',    SNS.x.sub);
  set('s-x-imp',    SNS.x.imp);
  set('s-x-posts',  SNS.x.posts);
}


// ── Program タブ切り替え ──
function switchProgram(n){
  [1,2,3].forEach(i=>{
    const tab = document.getElementById('prog-tab-'+i);
    const panel = document.getElementById('ycbm-panel-'+i);
    if(tab)   tab.classList.toggle('active', i===n);
    if(panel) panel.style.display = i===n ? 'block' : 'none';
  });
}


// ── STATS: 準備中判定 ──
function checkStatsPending(){
  const hasData = SNS.yt.sub>0 || SNS.tt.sub>0 || SNS.ig.sub>0 || SNS.x.sub>0;
  const pending = document.getElementById('stats-pending');
  const radar   = document.querySelector('.radar-card');
  const periodTabs = document.querySelector('.period-tabs');
  const metricScroll = document.getElementById('metric-scroll');
  const lineCard = document.querySelector('.line-card');
  if(pending){
    pending.style.display = hasData ? 'none' : 'block';
    if(radar) radar.style.display = hasData ? 'block' : 'none';
    if(periodTabs) periodTabs.style.display = hasData ? 'flex' : 'none';
    if(metricScroll) metricScroll.style.display = hasData ? 'flex' : 'none';
    if(lineCard) lineCard.style.display = hasData ? 'block' : 'none';
  }
  if(hasData) animateCharts();
}

// ── グラフカウントアップアニメーション ──
function animateCharts(){
  // レーダーチャート：データを0から増やして描画
  const norm = getRadarData();
  const score = getScore(norm);
  const grade = getGrade(score);
  document.getElementById('radar-score').textContent = '—';
  document.getElementById('radar-grade').textContent = '集計中...';

  if(radarChart) radarChart.destroy();
  const ctx = document.getElementById('radar-chart').getContext('2d');
  const zeroed = norm.map(()=>0);
  radarChart = new Chart(ctx,{
    type:'radar',
    data:{ labels:AXES.map(a=>a.label), datasets:[{
      data:[...zeroed], backgroundColor:'rgba(200,255,0,0.07)', borderColor:'#c8ff00',
      borderWidth:2, pointBackgroundColor:AXES.map(a=>a.color),
      pointBorderColor:'transparent', pointRadius:4,
    }]},
    options:{ responsive:true, maintainAspectRatio:false, animation:{duration:0},
      plugins:{ legend:{display:false} },
      scales:{ r:{ min:0, max:100, backgroundColor:'transparent',
        grid:{color:'rgba(255,255,255,0.04)'}, angleLines:{color:'rgba(255,255,255,0.06)'},
        pointLabels:{color:'rgba(242,240,255,.5)',font:{family:'Space Mono',size:9}},
        ticks:{display:false} }}}
  });

  // 0→実値へ段階的にアニメーション（1.2秒）
  let step = 0; const steps = 40;
  const timer = setInterval(()=>{
    step++;
    const t = step/steps;
    const ease = 1 - Math.pow(1-t, 3); // ease-out cubic
    radarChart.data.datasets[0].data = norm.map(v => v*ease);
    radarChart.update('none');
    if(step >= steps){
      clearInterval(timer);
      // スコア表示
      const sc = document.getElementById('radar-score');
      const gr = document.getElementById('radar-grade');
      let cur=0; const target=score;
      const sc_timer = setInterval(()=>{
        cur = Math.min(cur+3, target);
        sc.textContent = cur;
        if(cur>=target){ clearInterval(sc_timer); sc.style.color=grade.c; gr.textContent='GRADE '+grade.g; }
      },20);
    }
  }, 30);

  // ラインチャートはフェードイン
  setTimeout(()=>{ initLineChart(); }, 600);
}


let _communityTimerStarted = false;

// ── コミュニティ定期投稿（1〜2分おき） ──
function startCommunityTimer(){
  if(_communityTimerStarted) return; // 二重起動防止
  _communityTimerStarted = true;
  // 時間帯別の投稿スロット定義
  // 朝(6-10): 2本, 昼(11-14): 1本, 夕(15-19): 2本, 夜(20-22): 1本, 深夜(23): 1本, 0-5時: なし
  function getTimeSlot(h){
    if(h>=6  && h<11) return 'morning';
    if(h>=11 && h<15) return 'noon';
    if(h>=15 && h<20) return 'evening';
    if(h>=20 && h<23) return 'night';
    if(h>=23)         return 'latenight';
    return null; // 0-5時は投稿なし
  }
  function getSlotPool(slot){
    if(!slot) return [];
    const matching = DUMMY_POSTS_POOL.filter(p=>p.timeSlot===slot);
    // 該当スロットがなければ全部から選ぶ（フォールバック）
    return matching.length > 0 ? matching : DUMMY_POSTS_POOL;
  }
  function getDelayMs(h){
    // 時間帯ごとの投稿間隔（現実感のある間隔）
    if(h>=6  && h<11) return (25 + Math.random()*20) * 60000;  // 25〜45分
    if(h>=11 && h<15) return (40 + Math.random()*30) * 60000;  // 40〜70分
    if(h>=15 && h<20) return (20 + Math.random()*20) * 60000;  // 20〜40分
    if(h>=20 && h<23) return (35 + Math.random()*25) * 60000;  // 35〜60分
    if(h>=23)         return (50 + Math.random()*40) * 60000;  // 50〜90分
    // 0-5時: 次の朝6時まで待つ
    const now = new Date();
    const next6 = new Date(now); next6.setHours(6,0,0,0);
    if(next6<=now) next6.setDate(next6.getDate()+1);
    return next6-now + Math.random()*1800000; // 6時 + ランダム0〜30分
  }
  function scheduleNext(){
    const h = new Date().getHours();
    const delay = getDelayMs(h);
    setTimeout(()=>{
      const slot = getTimeSlot(new Date().getHours());
      if(slot){ // 深夜0-5時はスキップ
        const pool = getSlotPool(slot);
        const members = DUMMY_MEMBERS;
        const lastName = appState.posts.find(x=>x.isDummy)?.name;
        const eligible = members.filter(m=>m.name!==lastName);
        const m = eligible[Math.floor(Math.random()*eligible.length)];
        const p = pool[Math.floor(Math.random()*pool.length)];
        const newPost = {
          id:Date.now(), name:m.name, av:m.av, color:m.color,
          badge:m.badge, badgeColor:m.badgeColor, time:'たった今',
          text:p.text, ach:p.ach?{...p.ach}:null,
          likes:p.likes+Math.floor(Math.random()*6), liked:false, isDummy:true, isMe:false, ts:Date.now()
        };
        const commPage = document.getElementById('page-community');
        if(commPage && commPage.classList.contains('active')){
          const myPosts = appState.posts.filter(x=>x.isMe);
          const dummies = appState.posts.filter(x=>!x.isMe);
          dummies.unshift(newPost);
          if(dummies.length>18) dummies.pop();
          appState.posts = [...myPosts,...dummies];
          updatePostTimes(); renderFeed();
        } else {
          appState.posts.push(newPost);
        }
      }
      scheduleNext();
    }, delay);
  }
  scheduleNext();
}


// ══════════════════════════════
//  週次サマリー & マイルストーン
// ══════════════════════════════
const MILESTONE_THRESHOLDS = [1000, 5000, 10000, 50000, 100000, 500000, 1000000];

function fmtMilestone(n){
  if(n >= 1000000) return (n/10000).toFixed(0)+'万';
  if(n >= 10000)   return (n/10000).toFixed(0)+'万';
  if(n >= 1000)    return (n/1000).toFixed(0)+'千';
  return String(n);
}

// 前週データとの比較・マイルストーン検出
async function checkWeeklyAndMilestones(currentStats){
  if(!currentUser) return;
  try {

  // 1週間前のデータを取得
  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 7);
  const weekAgoStr = weekAgo.toISOString().split('T')[0];

  const { data:prevData } = await supa.from('sns_stats')
    .select('*').eq('user_id', currentUser.id)
    .lte('recorded_at', weekAgoStr)
    .order('recorded_at', {ascending:false}).limit(1);

  const prev = prevData?.[0] || null;

  // 比較データ構築
  const platforms = [
    { key:'yt', label:'YouTube', sub:'登録者', plat:'#ff4040', curr:SNS.yt.sub, prevVal: prev?.yt_subscribers||0 },
    { key:'tt', label:'TikTok',  sub:'フォロワー', plat:'#69d9d0', curr:SNS.tt.sub, prevVal: prev?.tt_followers||0 },
    { key:'ig', label:'Instagram', sub:'フォロワー', plat:'#e040fb', curr:SNS.ig.sub, prevVal: prev?.ig_followers||0 },
    { key:'x',  label:'X',      sub:'フォロワー', plat:'#c8c8c8', curr:SNS.x.sub, prevVal: prev?.x_followers||0 },
  ];

  const hasAnyData = platforms.some(p => p.curr > 0);
  if(!hasAnyData) return;

  // ── マイルストーン検出 ──
  // 前回データがある場合のみ（新規登録直後のフォロワー数は除外）
  if(prev){
    for(const p of platforms){
      for(const thr of MILESTONE_THRESHOLDS){
        if(p.prevVal < thr && p.curr >= thr){
          // マイルストーン達成！
          setTimeout(()=> showMilestone(p.label, p.sub, thr), 800);
          return; // 一度に1つだけ表示
        }
      }
    }
  }

  // ── 週次サマリーモーダル ──
  // 今週初回ログイン時のみ表示（localStorageで管理）
  const today = new Date().toISOString().split('T')[0];
  const lastShown = localStorage.getItem('xector1_weekly_shown_' + currentUser.id);
  const weekStart = getWeekStart();
  if(lastShown && lastShown >= weekStart) return; // 今週すでに表示済み

  // 変化があるものだけ表示
  const items = platforms.filter(p => p.curr > 0);
  if(!items.length) return;

  // モーダル構築
  const wm = document.getElementById('weekly-modal');
  const wmItems = document.getElementById('wm-items');
  const wmHeadline = document.getElementById('wm-headline');
  const wmSub = document.getElementById('wm-sub');

  if(prev){
    const gains = items.map(p => ({ ...p, delta: p.curr - p.prevVal }));
    const totalDelta = gains.reduce((s,p) => s + p.delta, 0);
    wmHeadline.textContent = totalDelta >= 0 ? '成長中！' : '踏ん張り時';
    wmSub.textContent = `先週との比較です。数値を確認してみましょう。`;
    wmItems.innerHTML = gains.map(p => `
      <div class="wm-item">
        <div class="wm-item-left">
          <span class="wm-item-dot" style="background:${p.plat}"></span>
          <div>
            <div class="wm-item-plat">${p.label} ${p.sub}</div>
            <div class="wm-item-val">${fmtNum(p.curr)}</div>
          </div>
        </div>
        <div class="wm-item-delta ${p.delta<0?'dn':''}">${p.delta>=0?'+':''}${fmtNum(Math.abs(p.delta))}</div>
      </div>`).join('');
  } else {
    wmHeadline.textContent = '現在の数値';
    wmSub.textContent = '来週から週次比較が表示されます。';
    wmItems.innerHTML = items.map(p => `
      <div class="wm-item">
        <div class="wm-item-left">
          <span class="wm-item-dot" style="background:${p.plat}"></span>
          <div>
            <div class="wm-item-plat">${p.label} ${p.sub}</div>
            <div class="wm-item-val">${fmtNum(p.curr)}</div>
          </div>
        </div>
        <div class="wm-item-delta">—</div>
      </div>`).join('');
  }

  // 少し遅らせて表示（ログイン演出が終わってから）
  setTimeout(()=>{ wm.classList.add('show'); }, 1400);
  localStorage.setItem('xector1_weekly_shown_' + currentUser.id, today);
  } catch(e){ console.warn('weekly check error:', e); }
}

function getWeekStart(){
  const d = new Date();
  const day = d.getDay();
  const diff = d.getDate() - day + (day===0?-6:1);
  const mon = new Date(d.setDate(diff));
  return mon.toISOString().split('T')[0];
}

function closeWeeklyModal(){
  document.getElementById('weekly-modal').classList.remove('show');
}

// ── マイルストーン演出 ──
function showMilestone(platLabel, subLabel, val){
  const overlay = document.getElementById('milestone-overlay');
  document.getElementById('ms-val').textContent = fmtMilestone(val);
  document.getElementById('ms-plat').textContent = platLabel + ' ' + subLabel;
  const icons = {1000:'⭐',5000:'🌟',10000:'🎉',50000:'🚀',100000:'🏆',500000:'👑',1000000:'💎'};
  document.getElementById('ms-icon').textContent = icons[val] || '🏆';

  overlay.classList.add('show');
  launchConfetti();
  setTimeout(()=>{ overlay.classList.remove('show'); }, 4000);
}

function launchConfetti(){
  const colors = ['#c8ff00','#00f0ff','#ff3d80','#ffb700','#ffffff','#00ffaa'];
  for(let i=0;i<60;i++){
    const el = document.createElement('div');
    el.className = 'confetti-piece';
    el.style.cssText = `
      left:${Math.random()*100}vw;
      top:-10px;
      background:${colors[Math.floor(Math.random()*colors.length)]};
      width:${4+Math.random()*8}px;
      height:${4+Math.random()*8}px;
      transform:rotate(${Math.random()*360}deg);
      animation:confettiFall ${1.5+Math.random()*2}s ${Math.random()*0.8}s ease-in forwards;
    `;
    document.body.appendChild(el);
    setTimeout(()=>el.remove(), 4000);
  }
}

// ══════════════════════════════
//  目標プログレスバー
// ══════════════════════════════
function updateGoalProgress(){ try {
  const wrap = document.getElementById('goal-progress-wrap');
  const barFill = document.getElementById('goal-progress-bar');
  const pctEl = document.getElementById('goal-progress-pct');
  const textEl = document.getElementById('goal-progress-text');
  const detailEl = document.getElementById('goal-progress-detail');

  if(!wrap) return;

  // 目標テキストから数値・プラットフォームをパース
  const goal = MEMBER.goal || '';
  if(!goal){
    wrap.style.display='none';
    const gc = document.getElementById('goal-card');
    if(gc) gc.style.display='block';
    return;
  }

  // 例：「YouTube10万人達成」「TikTok5万フォロワー」などをパース
  const numMatch = goal.match(/([0-9０-９]+(?:[.．][0-9０-９]+)?)[\s　]*(?:万|千)?/);
  if(!numMatch){ wrap.style.display='none'; return; }

  let targetNum = parseFloat(numMatch[1].replace(/[０-９]/g, c=>String.fromCharCode(c.charCodeAt(0)-65248)));
  if(goal.includes('万')) targetNum *= 10000;
  else if(goal.includes('千')) targetNum *= 1000;

  if(!targetNum || targetNum <= 0){
    wrap.style.display='none';
    const gc2 = document.getElementById('goal-card');
    if(gc2) gc2.style.display='block';
    return;
  }

  // どのSNSの目標かを検出
  let currVal = 0;
  let platLabel = '';
  let platColor = 'var(--lime)';

  if(/youtube|yt|ユーチューブ/i.test(goal)){
    currVal = SNS.yt.sub; platLabel='YouTube 登録者'; platColor='#ff4040';
  } else if(/tiktok|tt|ティックトック/i.test(goal)){
    currVal = SNS.tt.sub; platLabel='TikTok フォロワー'; platColor='#69d9d0';
  } else if(/instagram|ig|インスタ/i.test(goal)){
    currVal = SNS.ig.sub; platLabel='Instagram フォロワー'; platColor='#e040fb';
  } else if(/twitter|x(?![a-z])|ツイッター/i.test(goal)){
    currVal = SNS.x.sub; platLabel='X フォロワー'; platColor='#c8c8c8';
  } else {
    // プラットフォーム不明な場合は最大値を使う
    const all = [SNS.yt.sub, SNS.tt.sub, SNS.ig.sub, SNS.x.sub];
    currVal = Math.max(...all);
    platLabel = 'フォロワー';
  }

  const pct = Math.min(100, Math.round(currVal / targetNum * 100));
  const remaining = Math.max(0, targetNum - currVal);

  wrap.style.display = 'block';
  // 目標プログレスが表示される場合はゴールカードを隠す
  const goalCard = document.getElementById('goal-card');
  if(goalCard) goalCard.style.display = 'none';
  wrap.style.borderLeftColor = platColor;
  pctEl.style.color = platColor;
  pctEl.textContent = pct + '%';
  textEl.textContent = goal.length > 30 ? goal.substring(0,28)+'…' : goal;
  detailEl.innerHTML = `
    <span class="gpd-item">現在 <span class="gpd-val" style="color:${platColor}">${fmtNum(currVal)}</span></span>
    <span class="gpd-item">目標 <span class="gpd-val">${fmtNum(targetNum)}</span></span>
    <span class="gpd-item">残り <span class="gpd-val">${fmtNum(remaining)}</span></span>
  `;

  // バーアニメーション（少し遅らせて）
  setTimeout(()=>{
    barFill.style.background = platColor;
    barFill.style.boxShadow = `0 0 8px ${platColor}80`;
    barFill.style.width = pct + '%';
  }, 300);
  } catch(e){ console.warn('updateGoalProgress error:', e); }
}

// ══════════════════════════════
//  自動コメント（投稿から30秒〜2分後）
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
  { text:'数字より内容を重視してたら自然とフォロワー増えた感じがします。' },
  { text:'最近投稿頻度落ちてたので刺激受けました！ありがとう😊' },
];

function scheduleAutoComment(postId){
  const delay = 30000 + Math.random() * 90000; // 30秒〜2分
  setTimeout(()=>{
    const post = appState.posts.find(p => p.id === postId);
    if(!post) return; // 投稿が消えていたらスキップ
    const members = DUMMY_MEMBERS;
    const m = members[Math.floor(Math.random() * members.length)];
    const c = AUTO_COMMENTS[Math.floor(Math.random() * AUTO_COMMENTS.length)];
    if(!post.comments) post.comments = [];
    post.comments.push({ name:m.name, av:m.av, color:m.color, text:c.text });
    renderFeed();
    showToast(m.name + 'さんがコメントしました 💬');
    // 2回目のコメント（50%の確率で3〜8分後）
    if(Math.random() > 0.5){
      setTimeout(()=>{
        const p2 = appState.posts.find(p => p.id === postId);
        if(!p2) return;
        const m2 = members.filter(x=>x.name!==m.name)[Math.floor(Math.random()*( members.length-1))];
        const c2 = AUTO_COMMENTS[Math.floor(Math.random()*AUTO_COMMENTS.length)];
        if(!p2.comments) p2.comments=[];
        p2.comments.push({ name:m2.name, av:m2.av, color:m2.color, text:c2.text });
        renderFeed();
      }, 180000 + Math.random()*300000);
    }
  }, delay);
}

// ── GOAL SAVE ──
async function saveGoal(){

  try {
  const text = document.getElementById('settings-goal').value.trim();
  if(!text){ showToast('目標を入力してください'); return; }
  if(!currentUser){ showToast('ログインが必要です'); return; }
  MEMBER.goal = text;
  // goal-cardに即時反映
  const gt = document.getElementById('goal-text');
  if(gt) gt.textContent = text;
  // DBに保存
  const { error } = await supa.from('profiles').update({ goal: text }).eq('id', currentUser.id);
  if(error){ showToast('保存エラー: '+error.message); return; }
  showToast('目標を保存しました ✓');
  updateGoalProgress();
  } catch(e) {
    console.error('saveGoal:', e);
    showToast('保存エラー: ' + e.message);
  }
}


// ── SETTINGS: 名前変更 ──
async function saveName(){
  try {
  const input = document.getElementById('settings-name');
  const text = input ? input.value.trim() : '';
  if(!text){ showToast('名前を入力してください'); return; }
  if(!currentUser){ showToast('ログインが必要です'); return; }
  MEMBER.name  = text;
  MEMBER.short = text.split(/[\s　]/)[0] || text;
  // UIに即時反映（全箇所）
  const topbar = document.getElementById('topbar-member');
  if(topbar) topbar.textContent = MEMBER.name;
  const hn = document.getElementById('home-name');
  if(hn) hn.textContent = MEMBER.short;
  // DBに保存
  const { error } = await supa.from('profiles').update({ stage_name: text }).eq('id', currentUser.id);
  if(error){ showToast('保存エラー: '+error.message); return; }
  showToast('名前を保存しました ✓');
  } catch(e) {
    console.error('saveName:', e);
    showToast('保存エラー: ' + e.message);
  }
}
// ── youcanbookme iframe リサイズ ──
function resizeYcbm(iframe){
  try{
    const h = iframe.contentWindow.document.body.scrollHeight;
    if(h > 300) iframe.style.height = h + 'px';
  } catch(e){
    iframe.style.height = '700px';
  }
}

// ══════════════════════════════
//  INIT
// ══════════════════════════════
function initApp(){
  checkStatsPending();
  // DB取得後の名前をUIに反映
  const bfName = document.getElementById("bf-name");
  if(bfName) bfName.value = MEMBER.name;
  const topbar = document.getElementById("topbar-member");
  if(topbar) topbar.textContent = MEMBER.name;
  // アバター
  loadAvatarFromStorage();
  applyAvatar(MEMBER.avatar);
  startCommunityTimer();
  // composerのアバター反映
  const ca = document.getElementById('composer-avatar-img');
  if(ca){ if(MEMBER.avatar) ca.innerHTML=`<img src="${MEMBER.avatar}">`; else ca.textContent=MEMBER.short[0]||'?'; }
  // 目標カード
  const gt = document.getElementById('goal-text');
  if(gt) gt.textContent = MEMBER.goal || '目標を設定してください →';
  // プログレスバー
  try{ updateGoalProgress(); }catch(e){ console.warn(e); }
  // settingsのinitial文字
  const tb2 = document.getElementById('topbar-avatar-inner');
  if(tb2 && !MEMBER.avatar) tb2.textContent = MEMBER.short[0]||'?';
  const ha2 = document.getElementById('home-avatar-inner');
  if(ha2 && !MEMBER.avatar) ha2.textContent = MEMBER.short[0]||'?';
  const sp2 = document.getElementById('avatar-preview-inner');
  if(sp2 && !MEMBER.avatar) sp2.textContent = MEMBER.short[0]||'?';
  // X-composer アバター
  const xav = document.getElementById('x-composer-av');
  if(xav){ if(MEMBER.avatar) xav.innerHTML=`<img src="${MEMBER.avatar}">`; else xav.textContent=MEMBER.short[0]||'?'; }
  setGreeting();
  renderStreakDots();
  renderKPIGrid();
  renderKPIStrip();
  initRadar();
  renderMetricScroll();
  initLineChart();
  renderInputForm();
  renderFilterRow();
  renderTipsList();
  try{ renderCommStats(); }catch(e){ console.warn('renderCommStats:',e); }
  renderFeed();
  try{ renderSessionList(); }catch(e){ console.warn('renderSessionList:',e); }
  try{ renderCalendar(); }catch(e){ console.warn('renderCalendar:',e); }
  try{ renderTimeSlots(null); }catch(e){ console.warn('renderTimeSlots:',e); }
}

// ── GREETING ──
function setGreeting(){
  const h=new Date().getHours();
  const g = h<12?'Good morning':h<18?'Good afternoon':'Good evening';
  document.getElementById('home-greeting').textContent=g;
  document.getElementById('home-name').textContent=MEMBER.short;
  const days=Math.floor((new Date()-new Date(MEMBER.since))/86400000);
  document.getElementById('home-since').textContent=`Member since Nov 2024 — Day ${days}`;
}

// ── STREAK ──
function renderStreakDots(){
  const c=document.getElementById('streak-dots');
  c.innerHTML='';
  for(let i=0;i<14;i++){
    const d=document.createElement('div');
    d.className='sd'+(i<MEMBER.streak&&i<14?' on':'');
    c.appendChild(d);
  }
}

// ── HOME KPI ──
function renderKPIGrid(){
  const kpis=[
    { label:'YouTube',   sub:'フォロワー数', plat:'#ff4040', val:fmtNum(SNS.yt.sub), rawVal:SNS.yt.sub, delta:'+1,200', up:true },
    { label:'TikTok',    sub:'フォロワー数', plat:'#69d9d0', val:fmtNum(SNS.tt.sub), rawVal:SNS.tt.sub, delta:'+340',   up:true },
    { label:'Instagram', sub:'フォロワー数', plat:'#e040fb', val:fmtNum(SNS.ig.sub), rawVal:SNS.ig.sub, delta:'+180',   up:true },
    { label:'X',         sub:'フォロワー数', plat:'#c8c8c8', val:fmtNum(SNS.x.sub),  rawVal:SNS.x.sub,  delta:'+90',    up:true },
  ];
  document.getElementById('kpi-grid').innerHTML=kpis.map((k,i)=>`
    <div class="kpi-card" style="animation:pageIn .8s ${i*120}ms cubic-bezier(.2,0,.4,1) both">
      <div class="kpi-card-label">
        <span class="kpi-plat" style="background:${k.plat}"></span>${k.label}
      </div>
      <div class="kpi-card-sub">${k.sub}</div>
      <div class="kpi-card-val" data-final="${k.rawVal}">0</div>
      <div class="kpi-card-delta ${k.up?'up':'dn'}">${k.delta} 先月比</div>
    </div>`).join('');
  // カウントアップ
  setTimeout(()=>{
    document.querySelectorAll('.kpi-card-val[data-final]').forEach(el=>{
      const final = parseInt(el.dataset.final)||0;
      const dur = 900, step = 16;
      const steps = dur/step;
      let cur = 0;
      const t = setInterval(()=>{
        cur++;
        const v = Math.round(final*(cur/steps));
        el.textContent = fmtNum(v);
        if(cur>=steps){ el.textContent=fmtNum(final); clearInterval(t); }
      },step);
    });
  },100);
}

// ── HOME KPI STRIP (横スクロール) ──
function renderKPIStrip(){
  const kpis=[
    { label:'YouTube', plat:'#ff4040', val:fmtNum(SNS.yt.sub), delta:'+1,200' },
    { label:'TikTok',  plat:'#69d9d0', val:fmtNum(SNS.tt.sub), delta:'+340'   },
    { label:'Instagram',plat:'#e040fb',val:fmtNum(SNS.ig.sub), delta:'+180'   },
    { label:'X',       plat:'#c8c8c8', val:fmtNum(SNS.x.sub),  delta:'+90'    },
  ];
  const el = document.getElementById('kpi-strip');
  if(!el) return;
  el.innerHTML = kpis.map(k=>`
    <div class="kpi-chip">
      <span class="kpi-chip-dot" style="background:${k.plat}"></span>
      <div class="kpi-chip-body">
        <div class="kpi-chip-label">${k.label}</div>
        <div class="kpi-chip-val">${k.val}</div>
        <div class="kpi-chip-delta">${k.delta}</div>
      </div>
    </div>`).join('');
}


function getRadarData(){
  const total={
    followers: SNS.yt.sub+SNS.tt.sub+SNS.ig.sub+SNS.x.sub,
    views:     SNS.yt.views+SNS.tt.views,
    posts:     SNS.yt.posts+SNS.tt.posts+SNS.ig.posts+SNS.x.posts,
    likes:     SNS.tt.likes,
    imp:       SNS.yt.imp+SNS.x.imp,
    reach:     SNS.ig.reach,
  };
  return AXES.map(a=>Math.min((total[a.key]||0)/a.max*100,100));
}
function getScore(norm){ return Math.round(norm.reduce((s,v)=>s+v,0)/norm.length); }
function getGrade(s){ return s>=80?{g:'S',c:'#c8ff00'}:s>=65?{g:'A',c:'#00f0ff'}:s>=50?{g:'B',c:'#9f6fff'}:s>=35?{g:'C',c:'#ffb700'}:{g:'D',c:'#ff3d80'}; }

function showStatsEmpty(){
  // データが全部0のとき「準備中」表示
  const total = SNS.yt.sub+SNS.tt.sub+SNS.ig.sub+SNS.x.sub;
  const radarCard = document.querySelector('.radar-card');
  const lineCard  = document.querySelector('.line-card');
  const empty = document.getElementById('stats-empty');
  if(total === 0){
    if(radarCard) radarCard.style.display='none';
    if(lineCard)  lineCard.style.display='none';
    document.querySelector('.period-tabs').style.display='none';
    document.querySelector('.metric-scroll')?.style && (document.querySelector('.metric-scroll').style.display='none');
    if(empty) empty.style.display='block';
    return true;
  }
  if(radarCard) radarCard.style.display='';
  if(lineCard)  lineCard.style.display='';
  document.querySelector('.period-tabs').style.display='';
  if(empty) empty.style.display='none';
  return false;
}

function initRadar(){
  const norm=getRadarData();
  const score=getScore(norm);
  const grade=getGrade(score);
  document.getElementById('radar-score').textContent=score;
  document.getElementById('radar-score').style.color=grade.c;
  document.getElementById('radar-grade').textContent='GRADE '+grade.g;

  if(radarChart) radarChart.destroy();
  const ctx=document.getElementById('radar-chart').getContext('2d');
  radarChart=new Chart(ctx,{
    type:'radar',
    data:{ labels:AXES.map(a=>a.label), datasets:[{
      data:norm, backgroundColor:'rgba(200,255,0,0.07)', borderColor:'#c8ff00',
      borderWidth:2, pointBackgroundColor:AXES.map(a=>a.color),
      pointBorderColor:'transparent', pointRadius:4,
    }]},
    options:{ responsive:true, maintainAspectRatio:false,
      plugins:{ legend:{display:false}, tooltip:{
        backgroundColor:'#131318', borderColor:'rgba(255,255,255,0.1)', borderWidth:1,
        titleColor:'rgba(242,240,255,.5)', bodyColor:'#c8ff00',
        titleFont:{family:'Space Mono',size:8}, bodyFont:{family:'Bebas Neue',size:18},
        padding:10, callbacks:{ label:c=>'  '+Math.round(c.raw)+' pts' }
      }},
      scales:{ r:{ min:0, max:100, backgroundColor:'transparent',
        grid:{color:'rgba(255,255,255,0.04)'}, angleLines:{color:'rgba(255,255,255,0.06)'},
        pointLabels:{color:'rgba(242,240,255,.4)',font:{family:'Space Mono',size:9}},
        ticks:{display:false} }}}
  });
}

// ── METRIC SCROLL ──
function renderMetricScroll(){
  const data = appState.period==='month'?MONTHLY:appState.period==='week'?WEEKLY:YEARLY;
  document.getElementById('metric-scroll').innerHTML=METRICS.map(m=>`
    <div class="metric-chip ${appState.metric===m.key?'active':''}" onclick="selectMetric('${m.key}')">
      <div class="mc-label">${m.label}</div>
      <div class="mc-val">${fmtNum(data[m.key]?.[data[m.key].length-1]||0)}</div>
    </div>`).join('');
}

function selectMetric(key){
  appState.metric=key;
  renderMetricScroll();
  updateLineChart();
  document.getElementById('lc-title').textContent=METRICS.find(m=>m.key===key).label+'推移';
}

// ── LINE CHART ──
function initLineChart(){
  if(lineChart) lineChart.destroy();
  const ctx=document.getElementById('line-chart').getContext('2d');
  const data=getLineData();
  const grad=ctx.createLinearGradient(0,0,0,160);
  grad.addColorStop(0,'rgba(200,255,0,0.15)');
  grad.addColorStop(1,'rgba(200,255,0,0)');
  lineChart=new Chart(ctx,{
    type:'line',
    data:{ labels:data.labels, datasets:[{
      data:data.vals, borderColor:'#c8ff00', backgroundColor:grad,
      borderWidth:2, pointBackgroundColor:'#c8ff00', pointBorderColor:'#050507',
      pointBorderWidth:2, pointRadius:4, tension:0.4, fill:true,
    }]},
    options:{ responsive:true, maintainAspectRatio:false,
      plugins:{ legend:{display:false}, tooltip:{
        backgroundColor:'#131318', borderColor:'rgba(255,255,255,0.1)', borderWidth:1,
        bodyColor:'#c8ff00', bodyFont:{family:'Bebas Neue',size:18}, padding:10,
        callbacks:{ label:c=>'  '+fmtNum(c.raw) }
      }},
      scales:{
        x:{ grid:{color:'rgba(255,255,255,0.03)'}, ticks:{color:'rgba(242,240,255,.3)',font:{family:'Space Mono',size:8}}, border:{display:false} },
        y:{ grid:{color:'rgba(255,255,255,0.03)'}, ticks:{color:'rgba(242,240,255,.3)',font:{family:'Space Mono',size:8},callback:v=>fmtNum(v)}, border:{display:false} }
      }
    }
  });
}

function getLineData(){
  const src=appState.period==='month'?MONTHLY:appState.period==='week'?WEEKLY:YEARLY;
  return { labels:LABELS[appState.period], vals:src[appState.metric]||src.followers };
}

function updateLineChart(){
  const d=getLineData();
  lineChart.data.labels=d.labels;
  lineChart.data.datasets[0].data=d.vals;
  lineChart.update();
}

function setPeriod(p,btn){
  appState.period=p;
  document.querySelectorAll('.pt').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  const lbl={month:'Monthly',week:'Weekly',year:'Yearly'};
  document.getElementById('lc-sub').textContent=lbl[p];
  renderMetricScroll();
  updateLineChart();
}

// ── INPUT FORM ──
function renderInputForm(){
  const platforms=[
    { key:'yt', cls:'pb-yt', icon:'🎬', bg:'rgba(255,64,64,0.1)', name:'YouTube',
      fields:[{id:'yt-sub',l:'登録者数',v:SNS.yt.sub},{id:'yt-views',l:'総再生数',v:SNS.yt.views},{id:'yt-posts',l:'月間投稿数',v:SNS.yt.posts},{id:'yt-imp',l:'インプレ',v:SNS.yt.imp}]},
    { key:'tt', cls:'pb-tt', icon:'♪', bg:'rgba(105,217,208,0.1)', name:'TikTok',
      fields:[{id:'tt-sub',l:'フォロワー',v:SNS.tt.sub},{id:'tt-views',l:'月間再生数',v:SNS.tt.views},{id:'tt-posts',l:'月間投稿数',v:SNS.tt.posts},{id:'tt-likes',l:'総いいね',v:SNS.tt.likes}]},
    { key:'ig', cls:'pb-ig', icon:'◈', bg:'rgba(224,64,251,0.1)', name:'Instagram',
      fields:[{id:'ig-sub',l:'フォロワー',v:SNS.ig.sub},{id:'ig-reach',l:'月間リーチ',v:SNS.ig.reach},{id:'ig-posts',l:'月間投稿数',v:SNS.ig.posts}]},
    { key:'x', cls:'pb-x', icon:'✕', bg:'rgba(200,200,200,0.07)', name:'X / Twitter',
      fields:[{id:'x-sub',l:'フォロワー',v:SNS.x.sub},{id:'x-imp',l:'月間インプレ',v:SNS.x.imp},{id:'x-posts',l:'月間投稿数',v:SNS.x.posts},{id:'x-eng',l:'エンゲージ',v:SNS.x.eng}]},
  ];
  document.getElementById('input-form').innerHTML=platforms.map(p=>`
    <div class="platform-block ${p.cls}">
      <div class="pb-head">
        <div class="pb-icon" style="background:${p.bg}">${p.icon}</div>
        <div class="pb-name">${p.name}</div>
      </div>
      <div class="pb-fields">
        ${p.fields.map(f=>`<div class="pf"><label>${f.l}</label><input type="number" id="${f.id}" value="${f.v}"></div>`).join('')}
      </div>
    </div>`).join('');
}

function saveStats(){
  const g=(id)=>parseFloat(document.getElementById(id)?.value)||0;
  SNS.yt.sub   =g("yt-sub")   ||SNS.yt.sub;
  SNS.yt.views =g("yt-views") ||SNS.yt.views;
  SNS.yt.posts =g("yt-posts") ||SNS.yt.posts;
  SNS.tt.sub   =g("tt-sub")   ||SNS.tt.sub;
  SNS.tt.views =g("tt-views") ||SNS.tt.views;
  SNS.tt.posts =g("tt-posts") ||SNS.tt.posts;
  SNS.ig.sub   =g("ig-sub")   ||SNS.ig.sub;
  SNS.ig.reach =g("ig-reach") ||SNS.ig.reach;
  SNS.ig.posts =g("ig-posts") ||SNS.ig.posts;
  SNS.x.sub    =g("x-sub")    ||SNS.x.sub;
  SNS.x.imp    =g("x-imp")    ||SNS.x.imp;
  SNS.x.posts  =g("x-posts")  ||SNS.x.posts;
  initRadar(); renderKPIGrid(); renderMetricScroll();
  saveStatsToDB();
}

// ── TIPS ──
function renderFilterRow(){
  document.getElementById('filter-row').innerHTML=FILTER_CATS.map(c=>`
    <button class="fb ${appState.tipFilter===c.key?'active':''}" onclick="setTipFilter('${c.key}')">${c.label}</button>`).join('');
}
function setTipFilter(k){
  appState.tipFilter=k;
  renderFilterRow();
  renderTipsList();
}
function renderTipsList(){
  const list=appState.tipFilter==='all'?TIPS_DATA:TIPS_DATA.filter(t=>t.cat===appState.tipFilter);
  document.getElementById('tips-list').innerHTML=list.map(t=>`
    <div class="tip-row" onclick="openTipSheet(${t.id})">
      <div class="tip-accent" style="background:${t.color}"></div>
      <div class="tip-body-wrap">
        <div class="tip-meta-row">
          <span class="tip-cat-tag" style="background:${t.bg};color:${t.color};border:1px solid ${t.color}22">${t.catLabel}</span>
          <span class="tip-week-tag">${t.week}</span>
          ${t.isNew?'<span class="tip-new">NEW</span>':''}
        </div>
        <div class="tip-title-text">${t.title}</div>
        <div class="tip-preview">${t.preview}</div>
      </div>
      <div class="tip-row-icon">${t.icon}</div>
    </div>`).join('');
}

function openTipSheet(id){
  const t=TIPS_DATA.find(x=>x.id===id);
  if(!t) return;
  document.getElementById('tip-sheet-content').innerHTML=`
    <div class="tip-meta-row" style="margin-bottom:12px;">
      <span class="tip-cat-tag" style="background:${t.bg};color:${t.color};border:1px solid ${t.color}22;padding:3px 8px;border-radius:2px;font-family:'Space Mono',monospace;font-size:8px;letter-spacing:2px;">${t.catLabel}</span>
      <span style="font-family:'Space Mono',monospace;font-size:10px;color:rgba(242,240,255,0.55);letter-spacing:0px;margin-left:8px;">${t.week}</span>
    </div>
    <div style="font-family:'Bebas Neue',sans-serif;font-size:32px;letter-spacing:3px;line-height:1.05;margin-bottom:16px;">${t.title}</div>
    <div style="font-size:14px;color:var(--white);line-height:1.75;margin-bottom:20px;border-left:2px solid ${t.color};padding-left:16px;">${t.lead}</div>
    <div style="font-family:'Space Mono',monospace;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:${t.color};margin-bottom:10px;font-weight:700;">やること</div>
    <ul style="list-style:none;display:flex;flex-direction:column;gap:8px;margin-bottom:20px;">
      ${t.points.map(p=>`<li style="font-size:13px;color:rgba(242,240,255,0.7);padding-left:16px;position:relative;line-height:1.7;"><span style="position:absolute;left:0;color:${t.color}">—</span>${p}</li>`).join('')}
    </ul>
    <div style="font-family:'Space Mono',monospace;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:rgba(242,240,255,0.55);margin-bottom:8px;font-weight:700;">解説</div>
    <div style="font-size:13px;color:rgba(242,240,255,0.65);line-height:1.75;">${t.body}</div>
    <div style="margin-top:24px;">
      <button onclick="closeTipSheet()" style="background:${t.color};color:#000;border:none;width:100%;padding:13px;font-family:'Bebas Neue',sans-serif;font-size:20px;letter-spacing:4px;cursor:pointer;">理解した — 実践する</button>
    </div>`;
  document.getElementById('tip-overlay').classList.add('open');
}
function closeTipSheet(e){
  if(!e||e.target===document.getElementById('tip-overlay'))
    document.getElementById('tip-overlay').classList.remove('open');
}

// ── COMMUNITY ──
function renderCommStats(){
  const el = document.getElementById('comm-stats');
  if(!el) return;
  const stats=[
    {label:'Active Members',val:'39',color:'var(--green)'},
    {label:'Posts This Week',val:'127',color:'var(--lime)'},
    {label:'Avg Growth',val:'+38%',color:'var(--cyan)'},
    {label:'Next Session',val:'3/15',color:'var(--gold)'},
  ];
  el.innerHTML=stats.map(s=>`
    <div class="cs-card">
      <div class="cs-label">${s.label}</div>
      <div class="cs-val" style="color:${s.color}">${s.val}</div>
    </div>`).join('');
}
function renderFeed(){
  const el = document.getElementById('feed');
  if(!el) return;
  el.innerHTML = appState.posts.map((p,i)=>{
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
    return `
    <div class="post-card" style="animation:pageIn .4s ${i*35}ms ease both">
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
          <button class="post-like ${p.liked?'liked':''}" onclick="toggleLike(${p.id})">${p.liked?'♥':'♡'} ${p.likes}</button>
        </div>
        ${p.comments && p.comments.length ? `
        <div class="post-comments">
          ${p.comments.map(c=>`
            <div class="post-comment">
              <div class="pc-av" style="background:${c.color}22;color:${c.color}">${c.av}</div>
              <div class="pc-body">
                <div class="pc-name">${c.name}</div>
                <div class="pc-text">${c.text}</div>
              </div>
            </div>`).join('')}
        </div>` : ''}
      </div>
    </div>`;
  }).join('');
}
function toggleLike(id){
  const p=appState.posts.find(x=>x.id===id);
  if(!p) return;
  p.liked=!p.liked; p.likes+=p.liked?1:-1;
  renderFeed();
}
function submitPost(){
  const raw=document.getElementById('composer-ta').value.trim();
  if(!raw){showToast('テキストを入力してください');return;}
  // XSSサニタイズ
  const text = raw.replace(/</g,'&lt;').replace(/>/g,'&gt;');
  const newPost = {id:Date.now(),name:MEMBER.name,av:MEMBER.short[0]||'?',color:'#c8ff00',time:'たった今',badge:'MEMBER',badgeColor:'rgba(242,240,255,0.3)',text,ach:null,likes:0,liked:false,isMe:true,isDummy:false,comments:[]};
  appState.posts.unshift(newPost);
  document.getElementById('composer-ta').value='';
  renderFeed();
  showToast('投稿しました ✓');
  // 自動コメントをスケジュール
  scheduleAutoComment(newPost.id);
}

// ── SESSIONS ──
function renderSessionList(){
  const slEl=document.getElementById('session-list');
  if(!slEl) return;
  slEl.innerHTML=SESSIONS_DATA.map(s=>`
    <div class="session-row ${appState.session===s.id?'sel':''}" onclick="selectSession('${s.id}')">
      <div class="sr-check">SELECTED ✓</div>
      <div class="sr-top">
        <span class="sr-icon">${s.icon}</span>
        <span class="sr-type">${s.type}</span>
      </div>
      <div class="sr-name">${s.name}</div>
      <div class="sr-desc">${s.desc}</div>
      <div class="sr-bottom">
        <div class="sr-price" style="color:${s.color}">${s.price}</div>
        <div class="sr-dur">${s.dur}</div>
      </div>
    </div>`).join('');
}
function selectSession(id){
  appState.session=id;
  renderSessionList();
  showToast(SESSIONS_DATA.find(s=>s.id===id).name+' を選択');
}

// ── CALENDAR ──
const MONTH_N=['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'];
const DAY_N=['SUN','MON','TUE','WED','THU','FRI','SAT'];

function renderCalendar(){
  const calMonth = document.getElementById('cal-month');
  const calGrid  = document.getElementById('cal-grid');
  if(!calMonth || !calGrid) return;
  calMonth.textContent=`${appState.calYear}年 ${MONTH_N[appState.calMonth]}`;
  const first=new Date(appState.calYear,appState.calMonth,1).getDay();
  const dim=new Date(appState.calYear,appState.calMonth+1,0).getDate();
  const today=new Date();
  let html=DAY_N.map(d=>`<div class="cal-dh">${d}</div>`).join('');
  for(let i=0;i<first;i++) html+=`<div class="cal-c empty"></div>`;
  for(let d=1;d<=dim;d++){
    const cd=new Date(appState.calYear,appState.calMonth,d);
    const past=cd<new Date(today.getFullYear(),today.getMonth(),today.getDate());
    const isToday=cd.toDateString()===today.toDateString();
    const hasSlot=!!SLOT_DATA[d];
    const hasOpen=hasSlot&&SLOT_DATA[d].some(s=>s.a);
    const isSel=appState.calDay===d;
    let cls='cal-c';
    if(past) cls+=' past';
    else if(isSel) cls+=' sel';
    else if(hasOpen) cls+=' slot';
    else if(SLOT_DATA[d]&&!hasOpen) cls+=' avail';
    else cls+=' avail';
    if(isToday) cls+=' today';
    html+=`<div class="${cls}" onclick="selectDay(${d})">${d}</div>`;
  }
  calGrid.innerHTML=html;
}
function selectDay(d){
  appState.calDay=d; appState.calTime=null;
  renderCalendar(); renderTimeSlots(d);
}
function renderTimeSlots(d){
  const twDate   = document.getElementById('tw-date');
  const timeSlot = document.getElementById('time-slots');
  if(!twDate || !timeSlot) return;
  const dayN=['日','月','火','水','木','金','土'];
  twDate.textContent =
    d ? `${appState.calMonth+1}月${d}日（${dayN[new Date(appState.calYear,appState.calMonth,d).getDay()]}）` : '日付を選択';
  const slots=d?SLOT_DATA[d]:null;
  timeSlot.innerHTML=!slots
    ? `<div style="font-family:'Space Mono',monospace;font-size:10px;color:var(--dim2)">← 日付を選択してください</div>`
    : slots.map(s=>`<div class="ts ${!s.a?'full':''} ${appState.calTime===s.t&&s.a?'sel':''}" onclick="${s.a?`selectTime('${s.t}')`:''}">${s.t}</div>`).join('');
}
function selectTime(t){ appState.calTime=t; renderTimeSlots(appState.calDay); showToast(t+' を選択'); }
function prevMonth(){ if(appState.calMonth===0){appState.calMonth=11;appState.calYear--;}else appState.calMonth--; appState.calDay=null;appState.calTime=null; renderCalendar(); renderTimeSlots(null); }
function nextMonth(){ if(appState.calMonth===11){appState.calMonth=0;appState.calYear++;}else appState.calMonth++; appState.calDay=null;appState.calTime=null; renderCalendar(); renderTimeSlots(null); }

function submitBooking(){
  if(!appState.session){showToast('セッションを選択してください');return;}
  if(!appState.calDay){showToast('日程を選択してください');return;}
  if(!appState.calTime){showToast('時間を選択してください');return;}
  const s=SESSIONS_DATA.find(x=>x.id===appState.session);
  const dayN=['日','月','火','水','木','金','土'];
  const dateStr=`${appState.calMonth+1}月${appState.calDay}日（${dayN[new Date(appState.calYear,appState.calMonth,appState.calDay).getDay()]}）`;
  document.getElementById('ss-detail').innerHTML=[
    {l:'セッション',v:s.name},{l:'日時',v:`${dateStr} ${appState.calTime}〜`},
    {l:'時間',v:s.dur},{l:'料金',v:s.price}
  ].map(r=>`<div class="ssd-row"><span class="ssd-l">${r.l}</span><span class="ssd-v">${r.v}</span></div>`).join('');
  document.getElementById('success-overlay').classList.add('open');
}
function closeSuccess(){
  document.getElementById('success-overlay').classList.remove('open');
  appState.session=null; appState.calDay=null; appState.calTime=null;
  renderSessionList(); renderCalendar(); renderTimeSlots(null);
  goPage('home');
}

// ── SHARE SHEET ──
function openShareSheet(){
  const norm=getRadarData();
  const score=getScore(norm);
  const grade=getGrade(score);
  const now=new Date();
  document.getElementById('sc-name').textContent=MEMBER.name;
  document.getElementById('sc-period').textContent=`${now.getFullYear()}年${now.getMonth()+1}月`;
  document.getElementById('sc-score').textContent=score;
  document.getElementById('sc-score').style.color=grade.c;
  document.getElementById('sc-rank-tag').textContent=`RANK #${MEMBER.rank} — GRADE ${grade.g}`;
  document.getElementById('sc-grid').innerHTML=[
    {l:'YouTube',v:fmtNum(SNS.yt.sub)},{l:'TikTok',v:fmtNum(SNS.tt.sub)},
    {l:'総再生数',v:fmtNum(SNS.yt.views+SNS.tt.views)},{l:'月間投稿',v:(SNS.yt.posts+SNS.tt.posts+SNS.ig.posts+SNS.x.posts)+'本'},
  ].map(s=>`<div><div class="sc-stat-l">${s.l}</div><div class="sc-stat-v">${s.v}</div></div>`).join('');
  if(shareRadarChart) shareRadarChart.destroy();
  const ctx=document.getElementById('share-radar').getContext('2d');
  shareRadarChart=new Chart(ctx,{
    type:'radar',
    data:{ labels:AXES.map(a=>a.label), datasets:[{
      data:norm, backgroundColor:'rgba(200,255,0,0.08)', borderColor:'#c8ff00',
      borderWidth:1.5, pointBackgroundColor:AXES.map(a=>a.color),
      pointBorderColor:'transparent', pointRadius:3,
    }]},
    options:{ responsive:true, maintainAspectRatio:false,
      plugins:{legend:{display:false},tooltip:{enabled:false}},
      scales:{ r:{ min:0,max:100, grid:{color:'rgba(255,255,255,0.05)'}, angleLines:{color:'rgba(255,255,255,0.05)'},
        pointLabels:{color:'rgba(242,240,255,.35)',font:{family:'Space Mono',size:7}}, ticks:{display:false} }}}
  });
  document.getElementById('share-overlay').classList.add('open');
}
function closeShareSheet(e){
  if(!e||e.target===document.getElementById('share-overlay')){
    document.getElementById('share-overlay').classList.remove('open');
    if(shareRadarChart){shareRadarChart.destroy();shareRadarChart=null;}
  }
}

// ── PAGE NAV ──
function goPage(name){
  // 光ラインSE
  const sl = document.getElementById('scan-line-overlay');
  if(sl){ sl.classList.remove('scanning'); void sl.offsetWidth; sl.classList.add('scanning'); }
  // nav アイコン1回転
  const navEl = document.getElementById('nav-'+name);
  if(navEl){
    const ico = navEl.querySelector('.nav-icon');
    if(ico){ ico.classList.remove('spin'); void ico.offsetWidth; ico.classList.add('spin');
      ico.addEventListener('animationend',()=>ico.classList.remove('spin'),{once:true}); }
  }

  document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n=>n.classList.remove('active'));
  const page = document.getElementById('page-'+name);
  const nav  = document.getElementById('nav-'+name);
  if(page) page.classList.add('active');
  if(nav)  nav.classList.add('active');
  document.querySelector('.app-content').scrollTo(0,0);
  // settingsページを開いたとき目標・SNS数値をプリフィル
  if(name==='settings'){
    const gi = document.getElementById('settings-goal');
    if(gi) gi.value = MEMBER.goal || '';
    prefillSettingsSNS();
  }
  // コミュニティページを開くたびにランダム投稿を先頭に追加
  if(name==='community' && !_communityTimerStarted) startCommunityTimer();
}

// ── UTILS ──
function fmtNum(n){
  if(!n||n===0) return '0';
  if(n>=10000) return (n/10000).toFixed(1)+'万';
  return n.toLocaleString();
}
function showToast(msg){
  const t=document.getElementById('toast');
  t.textContent=msg; t.classList.add('show');
  setTimeout(()=>t.classList.remove('show'),2800);
}
function showError(msg){
  // エラーは常時表示・コピペ可能なバナーで表示
  const b=document.getElementById('err-banner');
  document.getElementById('err-banner-text').textContent=msg;
  b.classList.add('show');
}

// 起動時の処理
window.addEventListener("load", async ()=>{
  const isIos=()=>/iphone|ipad|ipod/.test(navigator.userAgent.toLowerCase());
  const isStandalone=()=>window.navigator.standalone===true;
  if(isIos()&&!isStandalone()){
    setTimeout(()=>showToast("ホーム画面に追加するとアプリとして使えます"),3000);
  }
  // Supabaseセッション復元
  await restoreSession();
});
