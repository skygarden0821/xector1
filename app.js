// ============================================================
//  app.js — アプリのロジック
//  Tipsの追加・修正は tips-data.js を編集してください
// ============================================================

const MEMBER = { name:'メンバー', short:'メンバー', since:'2024-11-01', goal:'', avatar:null };

// ─── STORAGE ───
function loadStorage() {
  try {
    const n = localStorage.getItem('x1_name');   if (n) { MEMBER.name=n; MEMBER.short=n.split(/[\s　]/)[0]||n; }
    const g = localStorage.getItem('x1_goal');   if (g) MEMBER.goal=g;
    const a = localStorage.getItem('x1_avatar'); if (a) MEMBER.avatar=a;
    const s = localStorage.getItem('x1_since');  if (s) MEMBER.since=s;
    else localStorage.setItem('x1_since', MEMBER.since);
  } catch(_) {}
}

function saveName() {
  const v = document.getElementById('settings-name').value.trim();
  if (!v) { toast('名前を入力してください'); return; }
  MEMBER.name=v; MEMBER.short=v.split(/[\s　]/)[0]||v;
  try { localStorage.setItem('x1_name',v); } catch(_) {}
  document.getElementById('topbar-member').textContent = MEMBER.name;
  document.getElementById('home-name').innerHTML = MEMBER.short+'<span class="hero-san">さん</span>';
  toast('名前を保存しました');
}

function saveGoal() {
  const v = document.getElementById('settings-goal').value.trim();
  if (!v) { toast('目標を入力してください'); return; }
  MEMBER.goal=v;
  try { localStorage.setItem('x1_goal',v); } catch(_) {}
  document.getElementById('goal-text').textContent=v;
  toast('目標を保存しました');
}

// ─── AVATAR ───
let crop = { img:null, x:0, y:0, scale:1, drag:false, lx:0, ly:0 };

function applyAvatar(url) {
  MEMBER.avatar=url;
  ['topbar-av','home-av','av-preview'].forEach(id=>{
    const el=document.getElementById(id); if(!el) return;
    el.innerHTML = url ? `<img src="${url}" alt="">` : (MEMBER.short[0]||'?');
  });
}

function onAvatarFileSelected(e) {
  const f=e.target.files[0]; if(!f) return;
  const r=new FileReader();
  r.onload=ev=>{
    const img=new Image();
    img.onload=()=>{ crop={img,x:0,y:0,scale:1,drag:false,lx:0,ly:0}; document.getElementById('crop-panel').classList.add('open'); drawCrop(); };
    img.src=ev.target.result;
  };
  r.readAsDataURL(f);
}

function drawCrop() {
  const stage=document.getElementById('crop-stage'), canvas=document.getElementById('crop-canvas');
  const size=stage.offsetWidth; canvas.width=canvas.height=size;
  const ctx=canvas.getContext('2d');
  ctx.clearRect(0,0,size,size);
  ctx.save(); ctx.beginPath(); ctx.arc(size/2,size/2,size/2,0,Math.PI*2); ctx.clip();
  ctx.fillStyle='#1a1a1a'; ctx.fillRect(0,0,size,size);
  if(crop.img){
    const iw=crop.img.width*crop.scale, ih=crop.img.height*crop.scale;
    crop.x=Math.min(0,Math.max(size-iw,crop.x)); crop.y=Math.min(0,Math.max(size-ih,crop.y));
    ctx.drawImage(crop.img,crop.x,crop.y,iw,ih);
  }
  ctx.restore();
  ctx.strokeStyle='rgba(200,255,0,.7)'; ctx.lineWidth=2.5;
  ctx.beginPath(); ctx.arc(size/2,size/2,size/2-1.5,0,Math.PI*2); ctx.stroke();
}

(function(){
  let pend=false,ld=0;
  function go(){
    const c=document.getElementById('crop-canvas'); if(!c)return;
    const s=(x,y)=>{crop.drag=true;crop.lx=x;crop.ly=y;};
    const m=(x,y)=>{if(!crop.drag)return;crop.x+=x-crop.lx;crop.y+=y-crop.ly;crop.lx=x;crop.ly=y;if(!pend){pend=true;requestAnimationFrame(()=>{drawCrop();pend=false;});}};
    const e=()=>{crop.drag=false;};
    c.addEventListener('mousedown',ev=>s(ev.clientX,ev.clientY));
    c.addEventListener('mousemove',ev=>m(ev.clientX,ev.clientY));
    c.addEventListener('mouseup',e); c.addEventListener('mouseleave',e);
    c.addEventListener('touchstart',ev=>{const t=ev.touches[0];s(t.clientX,t.clientY);},{passive:true});
    c.addEventListener('touchmove',ev=>{
      if(ev.touches.length===2){const dx=ev.touches[0].clientX-ev.touches[1].clientX,dy=ev.touches[0].clientY-ev.touches[1].clientY,d=Math.sqrt(dx*dx+dy*dy);if(ld)crop.scale=Math.max(.5,Math.min(4,crop.scale*(d/ld)));ld=d;drawCrop();}
      else{ld=0;const t=ev.touches[0];m(t.clientX,t.clientY);}
      ev.preventDefault();
    },{passive:false});
    c.addEventListener('touchend',()=>{ld=0;e();});
    c.addEventListener('wheel',ev=>{crop.scale=Math.max(.5,Math.min(4,crop.scale*(ev.deltaY<0?1.08:.93)));drawCrop();ev.preventDefault();},{passive:false});
  }
  document.readyState==='loading'?document.addEventListener('DOMContentLoaded',go):go();
})();

function cancelCrop(){ document.getElementById('crop-panel').classList.remove('open'); document.getElementById('av-input').value=''; }
function saveCrop(){
  const url=document.getElementById('crop-canvas').toDataURL('image/jpeg',.88);
  applyAvatar(url); try{localStorage.setItem('x1_avatar',url);}catch(_){} cancelCrop(); toast('アイコンを保存しました');
}


function setFilter(k){ activeFilter=k; renderFilters(); renderTips(); }

function renderTips(){
  const list = activeFilter==='all' ? TIPS : TIPS.filter(t=>t.cat===activeFilter);
  document.getElementById('tips-list').innerHTML=list.map(t=>`
    <button class="tip-card" onclick="openTip(${t.id})">
      <span class="tip-accent" style="background:${t.color}"></span>
      <div class="tip-card-body">
        <div class="tip-meta">
          <span class="tip-tag" style="color:${t.color}">${t.label}</span>
          <span class="tip-wk">${t.week}</span>
          ${t.isNew?'<span class="tip-new">NEW</span>':''}
        </div>
        <p class="tip-title">${t.title}</p>
        <p class="tip-preview">${t.preview}</p>
      </div>
      <svg class="tip-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="9 18 15 12 9 6"/></svg>
    </button>
  `).join('');
}

function openTip(id){
  const t=TIPS.find(x=>x.id===id); if(!t)return;
  document.getElementById('tip-content').innerHTML=`
    <span class="sheet-tag" style="background:${t.color}18;color:${t.color};border:1.5px solid ${t.color}40">${t.label} — ${t.week}</span>
    <h2 class="sheet-title">${t.title}</h2>
    <p class="sheet-lead" style="border-left-color:${t.color}">${t.lead}</p>
    <p class="sheet-section">やること</p>
    <ul class="sheet-list">${t.points.map(p=>`<li style="--c:${t.color}">${p}</li>`).join('')}</ul>
    <p class="sheet-section">解説</p>
    <p class="sheet-body">${t.body}</p>
    <button class="btn-sheet" style="background:${t.color};color:#000" onclick="closeTip()">理解した &#8212; 実践する</button>
  `;
  document.getElementById('tip-overlay').classList.add('open');
}
function closeTip(e){
  if(!e||e.target===document.getElementById('tip-overlay'))
    document.getElementById('tip-overlay').classList.remove('open');
}

// ─── BOOK ───
function switchProgram(n){
  [1,2,3].forEach(i=>{
    document.getElementById(`prog-tab-${i}`)?.classList.toggle('active',i===n);
    const p=document.getElementById(`ycbm-panel-${i}`); if(p)p.style.display=i===n?'block':'none';
  });
}

// ─── NAV ───
function goPage(name){
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(b=>b.classList.remove('active'));
  document.getElementById(`page-${name}`)?.classList.add('active');
  document.getElementById(`nav-${name}`)?.classList.add('active');
  document.getElementById('scroll-area').scrollTo(0,0);
  if(name==='settings') prefill();
}
function prefill(){
  const n=document.getElementById('settings-name'); if(n&&MEMBER.name!=='メンバー')n.value=MEMBER.name;
  const g=document.getElementById('settings-goal'); if(g)g.value=MEMBER.goal||'';
}

// ─── INIT ───
function init(){
  const h=new Date().getHours();
  document.getElementById('home-greeting').textContent=h<12?'おはようございます':h<18?'こんにちは':'こんばんは';
  document.getElementById('home-name').innerHTML=MEMBER.short+'<span class="hero-san">さん</span>';
  document.getElementById('topbar-member').textContent=MEMBER.name;
  document.getElementById('goal-text').textContent=MEMBER.goal||'目標を設定してください';
  applyAvatar(MEMBER.avatar);
  renderFilters(); renderTips();
}

function toast(msg){
  const el=document.getElementById('toast'); el.textContent=msg; el.classList.add('show');
  setTimeout(()=>el.classList.remove('show'),2400);
}

window.addEventListener('load',()=>{ loadStorage(); init(); });
