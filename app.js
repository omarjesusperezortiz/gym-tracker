
// DATA is loaded from data.js
const LS_LOG="obt_log_v2", LS_PREF="obt_pref_v2", LS_GH="obt_gh_v1", LS_PLAN="obt_plan_v1", LS_DRAFT="obt_draft_v1", LS_RECO="obt_reco_v1";
let plan=localStorage.getItem(LS_PLAN)||"gym";
let cur=null, view="today", started=false, editingId=null, editingKey=null;
let reco=JSON.parse(localStorage.getItem(LS_RECO)||"null"), recoFetching=false;
let live=JSON.parse(localStorage.getItem(LS_DRAFT)||"{}"), calMonth=new Date();
// The draft carries a reserved __meta entry so an in-progress EDIT survives reloads
// and navigating around (Home, resume card). It is stripped out of `live` on load.
(function restoreEditMeta(){
  const m=live.__meta;
  delete live.__meta;
  if(m&&typeof m==='object'&&m.editingId!=null){editingId=m.editingId;editingKey=m.editingKey||null;}
})();
let pref=JSON.parse(localStorage.getItem(LS_PREF)||"{}");
let gh=JSON.parse(localStorage.getItem(LS_GH)||"null");
let syncState="off";
let progExercise=null;
const $=s=>document.querySelector(s);
const KINDLABEL={bar:"Barbell",cable:"Cable",db:"Dumbbell",gym:"Gym",bw:"Bodyweight"};
const ico={
 home:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9.5L12 3l9 6.5V21a1 1 0 01-1 1h-5v-7H9v7H4a1 1 0 01-1-1z"/></svg>',
 back:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>',
 chev:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18l6-6-6-6"/></svg>',
 check:'<svg viewBox="0 0 24 24" fill="none" stroke="#062a1c" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>',
 save:'<svg viewBox="0 0 24 24" fill="none" stroke="#0a0b0e" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>',
 train:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6.5 6.5l11 11M2 6l4-4M18 22l4-4M3 3l1 1M20 20l1 1"/></svg>',
 cal:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>',
 meal:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 2v7c0 1.1.9 2 2 2h0a2 2 0 002-2V2M5 2v20M13 2v20M13 8c0-3 1.5-6 4-6v20"/></svg>',
 gear:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 11-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 11-2.83-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 112.83-2.83l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 112.83 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>',
 empty:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M6.5 6.5l11 11M2 6l4-4M18 22l4-4"/></svg>',
 progress:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3v18h18"/><path d="M18 9l-5 5-4-4-3 3"/></svg>',
 today:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2.5M12 19.5V22M4.2 4.2l1.8 1.8M18 18l1.8 1.8M2 12h2.5M19.5 12H22M4.2 19.8L6 18M18 6l1.8-1.8"/></svg>'
};
const DAYCOLORS=["#ff9f4d","var(--push)","var(--pull)","#5ad6c4","#ff6b9d","#7c9dff","var(--warn)","var(--full)","var(--violet)"];
function dayColor(planKey,dayKey){const keys=Object.keys(DATA.plans[planKey].sessions);const i=keys.indexOf(dayKey);return DAYCOLORS[(i>=0?i:0)%DAYCOLORS.length];}
function HUEof(e){return e&&e.plan&&DATA.plans[e.plan]?dayColor(e.plan,e.sess):"var(--acc)";}
function P(){return DATA.plans[plan];}
function log(){return JSON.parse(localStorage.getItem(LS_LOG)||"[]");}
function saveLog(a){localStorage.setItem(LS_LOG,JSON.stringify(a));}
function savePref(){localStorage.setItem(LS_PREF,JSON.stringify(pref));}
function toast(m,icon){const t=$("#toast");t.innerHTML=(icon||"")+"<span>"+m+"</span>";t.classList.add('show');clearTimeout(t._t);t._t=setTimeout(()=>t.classList.remove('show'),1900);}
function parseTarget(s){const m=s.match(/(\d+)\s*×/);return m?parseInt(m[1]):3;}
function isTimeScheme(s){return /\d\s*s(\/|\b)/i.test(s||"");}
function fmtLast(p,weighted,timeBased){if(!p)return"";if(!weighted)return timeBased?`${p.r||"–"}s`:`${p.r||"–"}`;return `${p.w||"–"}×${p.r||"–"}`;}
function keyOf(slot){return plan+"|"+cur+"|"+slot;}
function lastFor(slot,kind){
  const l=log();
  for(let i=l.length-1;i>=0;i--){
    if(l[i].plan!==plan||l[i].sess!==cur)continue;
    const s=(l[i].slots||[]).find(x=>x.slot===slot);
    if(s&&s.kind===kind&&s.sets&&s.sets.length)return s.sets;
  }
  return null;
}
/* ---------- Header + plan + nav ---------- */
function renderShell(){
  // plan chips
  let ph="";for(const pk in DATA.plans){const pl=DATA.plans[pk];
    ph+=`<div class="planchip ${pk===plan?'active':''}" data-plan="${pk}"><span class="pi">${pl.icon}</span>${pl.label}</div>`;}
  $("#planrow").innerHTML=ph;
  $("#planrow").querySelectorAll('[data-plan]').forEach(e=>e.onclick=()=>{plan=e.dataset.plan;localStorage.setItem(LS_PLAN,plan);cur=null;live={};render();});
  // nav
  const navs=[["today","Today",ico.today],["home","Home",ico.home],["calendar","Calendar",ico.cal],["progress","Progress",ico.progress],["meals","Meals",ico.meal]];
  $("#nav").innerHTML=navs.map(([v,l,i])=>`<div class="ni ${v===view?'active':''}" data-view="${v}">${i}<span>${l}</span></div>`).join('');
  $("#nav").querySelectorAll('[data-view]').forEach(e=>e.onclick=()=>{view=e.dataset.view;if(view==='home')started=false;if(view==='today')refreshRecommendation();render();});
}
function renderTabs(){
  const t=$("#tabs");t.innerHTML="";
  const keys=Object.keys(P().sessions);
  if(!cur||!keys.includes(cur))cur=keys[0];
  keys.forEach((k,i)=>{
    const s=P().sessions[k],col=dayColor(plan,k);
    const d=document.createElement('div');d.className="daycard"+(k===cur?" active":"");d.dataset.k=k;
    d.innerHTML=`<div class="dcbar" style="background:${col}"></div><div class="dck">${s.emoji} Day ${i+1}</div><div class="dcn">${s.name}</div><div class="dcm">${s.muscles}</div>`;
    d.onclick=()=>{cur=k;syncEditContext();renderTrain();const el=t.querySelector('.daycard.active');if(el)el.scrollIntoView({inline:'center',block:'nearest',behavior:'smooth'});};
    t.appendChild(d);
  });
  // scroll active into view
  const a=t.querySelector('.daycard.active');if(a)a.scrollIntoView({inline:'center',block:'nearest'});
}
function progress(){const s=P().sessions[cur];let done=0;s.slots.forEach(sl=>{const st=live[keyOf(sl[0])];if(st&&st.done)done++;});return{done,total:s.slots.length,pct:Math.round(done/s.slots.length*100)};}

/* ---------- MAIN render dispatch ---------- */
function render(){
  renderShell();
  const inTrain=(view==='train');
  $("#tabs").style.display='none';           // top chips retired — dashboard handles picking
  $("#planrow").style.display='none';
  $("#trainbar").classList.toggle('show',inTrain);if(inTrain)renderTrainbar();
  $("#dock").classList.toggle('hide',!inTrain);
  if(view==='today')renderToday();
  else if(view==='home')renderHome();
  else if(view==='train')renderTrain();
  else if(view==='calendar')renderCalendar();
  else if(view==='progress')renderProgress();
  else renderMeals();
}


/* ---------- TODAY (recommendation) ---------- */
function relTime(iso){
  const t=new Date(iso).getTime();if(isNaN(t))return null;
  const diffSec=Math.round((Date.now()-t)/1000);
  if(diffSec<60)return"just now";
  const m=Math.round(diffSec/60);if(m<60)return`${m}m ago`;
  const hr=Math.round(m/60);if(hr<24)return`${hr}h ago`;
  return`${Math.round(hr/24)}d ago`;
}
// Simple client-side pick when no server recommendation is available: the broad
// (push/pull/full-body) session that was trained longest ago (or never).
function localRecoFallback(){
  const pk=DATA.plans.gym?'gym':Object.keys(DATA.plans)[0];
  const sessions=DATA.plans[pk].sessions;
  const broad=Object.keys(sessions).filter(k=>(sessions[k].group||'focused')==='broad');
  const pool=broad.length?broad:Object.keys(sessions);
  const l=log();
  let best=pool[0],bestDays=-1;
  pool.forEach(k=>{
    const last=l.filter(e=>!e.type&&e.plan===pk&&e.sess===k).sort((a,b)=>new Date(b.date)-new Date(a.date))[0];
    const days=last?Math.floor((Date.now()-new Date(last.date).getTime())/86400000):9999;
    if(days>bestDays){bestDays=days;best=k;}
  });
  const s=sessions[best];
  return{
    date:new Date().toISOString().slice(0,10),generatedAt:null,type:'train',plan:pk,session:best,
    sessionName:s.name,emoji:s.emoji,title:`Today: ${s.name} ${s.emoji||''}`.trim(),
    reason:bestDays>=9999?`You haven't logged ${s.name} yet — good place to start.`
      :`${s.name} was your least-recently trained session (${bestDays} day${bestDays!==1?'s':''} ago).`,
    exercises:(s.slots||[]).map(sl=>sl[0]),stats:{}
  };
}
// Opens a plan+session as a FRESH workout in the training view — the same navigation
// used by the Home dashboard's day rows / resume card (syncEditContext keeps an
// in-progress edit of that exact session alive, but never carries over from another one).
function openSession(pk,sk){
  if(!pk||!DATA.plans[pk]||!DATA.plans[pk].sessions[sk]){toast("That session isn't available");return;}
  plan=pk;localStorage.setItem(LS_PLAN,plan);cur=sk;syncEditContext();
  started=true;view='train';window.scrollTo(0,0);render();
}
async function refreshRecommendation(){
  if(recoFetching)return;
  recoFetching=true;
  try{
    const r=await fetchRecommendation();
    if(r){reco=r;localStorage.setItem(LS_RECO,JSON.stringify(reco));if(view==='today')renderToday();}
  }catch(e){/* keep showing cached/fallback — never crash the page */}
  recoFetching=false;
}
function renderToday(){
  const w=$("#wrap");
  try{
    const r=reco||localRecoFallback();
    const isFallback=!reco;
    const today=new Date().toISOString().slice(0,10);
    const stale=!!(r.date&&r.date!==today);
    const updated=r.generatedAt?relTime(r.generatedAt):null;
    let h=`<div class="today-view">`;
    if(r.type==='rest'){
      h+=`<div class="today-card rest">
        <div class="today-badge">${isFallback?'Local suggestion':'Recommended'}${stale?` · from ${r.date}`:''}</div>
        <div class="today-emoji">${r.emoji||'😴'}</div>
        <div class="today-title">${r.title||'Rest day'}</div>
        <div class="today-reason">${r.reason||'Take it easy today — recovery matters.'}</div>
        <button class="btn sec" style="padding:14px" data-today-light>Do a light session anyway</button>
      </div>`;
    }else{
      h+=`<div class="today-card">
        <div class="today-badge">${isFallback?'Local suggestion':'Recommended'}${stale?` · from ${r.date}`:''}</div>
        <div class="today-emoji">${r.emoji||'💪'}</div>
        <div class="today-title">${r.title||('Today: '+(r.sessionName||r.session||''))}</div>
        <div class="today-reason">${r.reason||''}</div>
        ${(r.exercises||[]).length?`<div class="today-exlist">${r.exercises.map((x,i)=>`<div class="today-ex"><span class="today-exn">${i+1}</span>${x}</div>`).join('')}</div>`:''}
        <button class="btn acc" style="padding:14px" data-today-start>Start this workout</button>
      </div>`;
    }
    if(updated||r.date)h+=`<div class="today-meta">${updated?`Updated ${updated}`:''}${updated&&r.date?' · ':''}${r.date?`for ${r.date}`:''}</div>`;
    h+=`</div>`;
    w.innerHTML=h;
    const startBtn=w.querySelector('[data-today-start]');
    if(startBtn)startBtn.onclick=()=>openSession(r.plan,r.session);
    const lightBtn=w.querySelector('[data-today-light]');
    if(lightBtn)lightBtn.onclick=()=>{const fb=localRecoFallback();openSession(fb.plan,fb.session);};
  }catch(e){
    w.innerHTML=`<div class="today-view"><div class="empty">${ico.empty}<br>Couldn't load today's recommendation.</div></div>`;
  }
}

/* ---------- HOME (dashboard) ---------- */
function inProgressSessions(){
  // returns [{plan,day,done,total}] for sessions with any logged data in draft
  const map={};
  for(const key in live){
    const parts=key.split("|");if(parts.length<3)continue;
    const pk=parts[0],dk=parts[1];const st=live[key];
    const hasData=(st&&((st.sets&&st.sets.some(x=>x&&(x.w||x.r)))||st.done));
    if(!hasData)continue;
    if(!DATA.plans[pk]||!DATA.plans[pk].sessions[dk])continue;
    const id=pk+"|"+dk;
    if(!map[id])map[id]={plan:pk,day:dk,done:0,total:DATA.plans[pk].sessions[dk].slots.length};
    if(st.done)map[id].done++;
    else if(st.sets&&st.sets.some(x=>x&&(x.w||x.r)))map[id].done++; // count started-with-values as progress
  }
  return Object.values(map);
}

function weekCount(){
  const l=log(),now=new Date();const day=(now.getDay()+6)%7;
  const monday=new Date(now);monday.setHours(0,0,0,0);monday.setDate(now.getDate()-day);
  return l.filter(e=>new Date(e.date)>=monday).length;
}
function lastWorkout(){const l=log();return l.length?l[l.length-1]:null;}
function renderHome(){
  const w=$("#wrap");
  const wc=weekCount(),total=log().length;
  let h=`<div class="dash"><div class="dash-h">Let's train 💪</div><div class="dash-sub">Pick your mode, then today's focus.</div>`;
  // resume cards
  const ip=inProgressSessions();
  if(ip.length){
    h+=`<div class="sec-label">▶ Continue where you left off</div>`;
    ip.forEach(x=>{const s=DATA.plans[x.plan].sessions[x.day],col=dayColor(x.plan,x.day),pl=DATA.plans[x.plan];
      const isEd=editingId!=null&&editingKey===x.plan+"|"+x.day;
      const edEntry=isEd?log().find(e=>String(e.id)===String(editingId)):null;
      const edWhen=edEntry?new Date(edEntry.date).toLocaleDateString(undefined,{month:'short',day:'numeric'}):'';
      h+=`<div class="resume" data-rp="${x.plan}" data-rd="${x.day}"><div class="rbar" style="background:${col}"></div>
        <div class="rico">${s.emoji}</div>
        <div class="rinfo"><div class="rname">${s.name} <span class="rtag">${pl.icon} ${pl.label}</span>${isEd?`<span class="rtag edit">✏️ editing${edWhen?" "+edWhen:""}</span>`:''}</div>
        <div class="rmus">${x.done} of ${x.total} done · tap to ${isEd?'resume editing':'resume'}</div></div>
        <div class="rplay">▶</div></div>`;});
  }
  // week stats
  h+=`<div class="week-strip">
    <div class="wk"><div class="wv acc">${wc}</div><div class="wl">this week</div></div>
    <div class="wk"><div class="wv">${total}</div><div class="wl">total workouts</div></div>
    <div class="wk"><div class="wv">${streakAll()}</div><div class="wl">day streak 🔥</div></div>
  </div>`;
  // plan picker
  h+=`<div class="sec-label">Mode</div><div class="plan-grid">`;
  for(const pk in DATA.plans){const pl=DATA.plans[pk];const n=Object.keys(pl.sessions).length;
    h+=`<div class="plancard ${pk===plan?'active':''}" data-plan="${pk}"><div class="pe">${pl.icon}</div><div class="pl">${pl.label}</div><div class="ps">${n} days</div></div>`;}
  h+=`</div>`;
  // grouped sessions: Quick picks (broad) + Focused
  const keys=Object.keys(P().sessions);
  const groups=[["broad","⚡ Quick picks — broad sessions"],["focused","🎯 Focused — one area"]];
  groups.forEach(([g,label])=>{
    const gk=keys.filter(k=>(P().sessions[k].group||'focused')===g);
    if(!gk.length)return;
    h+=`<div class="sec-label">${label}</div><div class="day-list">`;
    gk.forEach(k=>{const s=P().sessions[k],col=dayColor(plan,k);
      h+=`<div class="dayrow" data-day="${k}"><div class="dbar" style="background:${col}"></div>
        <div class="dnum">${s.emoji}</div>
        <div class="dinfo"><div class="dname">${s.name}</div><div class="dmus">${s.muscles}</div></div>
        <div class="dcount">${s.slots.length} ex</div>
        <div class="dgo">${ico.chev}</div></div>`;});
    h+=`</div>`;
  });
  h+=`</div>`;
  w.innerHTML=h;
  w.querySelectorAll('[data-plan]').forEach(e=>e.onclick=()=>{plan=e.dataset.plan;localStorage.setItem(LS_PLAN,plan);cur=null;renderHome();});
  w.querySelectorAll('[data-day]').forEach(e=>e.onclick=()=>{cur=e.dataset.day;syncEditContext();started=true;view='train';window.scrollTo(0,0);render();});
  w.querySelectorAll('[data-rp]').forEach(e=>e.onclick=()=>{plan=e.dataset.rp;localStorage.setItem(LS_PLAN,plan);cur=e.dataset.rd;syncEditContext();started=true;view='train';window.scrollTo(0,0);render();});
}
function streakAll(){const l=log();const byDay={};l.forEach(e=>{byDay[e.date.slice(0,10)]=1;});
  let s=0,d=new Date();for(;;){const k=d.toISOString().slice(0,10);if(byDay[k]){s++;d.setDate(d.getDate()-1);}else{if(k===new Date().toISOString().slice(0,10)){d.setDate(d.getDate()-1);continue;}break;}}return s;}
function renderTrainbar(){
  if(view!=='train'){return;}
  const keys=Object.keys(P().sessions);if(!cur||!keys.includes(cur))cur=keys[0];
  const s=P().sessions[cur],p=progress();
  const ed=isEditingCurrent();
  const edDate=ed?(log().find(e=>String(e.id)===String(editingId))||{}).date:null;
  const edLabel=edDate?new Date(edDate).toLocaleDateString(undefined,{month:'short',day:'numeric'}):'';
  $("#trainbar").innerHTML=`<div class="backbtn" onclick="goHome()">${ico.back}</div>
    <div class="tinfo"><div class="tt">${s.emoji} ${s.name}</div><div class="tm">${ed?`<span class="editbadge" onclick="cancelEdit(event)">✏️ editing${edLabel?" "+edLabel:""} · exit</span> `:""}${P().icon} ${P().label} · ${s.muscles}</div></div>
    <div class="tprog">${p.done}/${p.total}</div>`;
}
// NOTE: goHome must NOT clear editingId — an in-progress edit has to survive a look
// around the dashboard. It is cleared on finish (completeFinish), on cancelEdit, or
// when a different session is opened (syncEditContext).
function goHome(){view='home';started=false;window.scrollTo(0,0);render();}

/* ---------- TRAIN ---------- */
function renderTrain(){
  const s=P().sessions[cur],p=progress(),w=$("#wrap");
  renderTrainbar();
  let html=`<div class="prog" style="margin-top:2px"><div class="ring" style="--p:${p.pct}"><b>${p.pct}%</b></div>
    <div style="flex:1"><div class="pl">${p.done} of ${p.total} exercises done</div><div class="ps">Log your sets · tap ⬤ when done</div></div></div>`;
  w.innerHTML=html;
  s.slots.forEach((sl,i)=>{
    const [slot,scheme,force]=sl,k=keyOf(slot);
    if(!live[k])live[k]={kind:pref[plan+"|"+slot]||firstKind(slot),done:false,sets:null,force:false};
    const st=live[k],kind=st.kind;
    const vr=(P().variations[slot]||{})[kind]||Object.values(P().variations[slot]||{})[0];
    const cue=vr?(P().cues[vr.name]||""):"";
    const timeBased=isTimeScheme(scheme),weighted=kind!=='bw';
    if(!st.sets){const lp=lastFor(slot,kind),n=parseTarget(scheme);
      st.sets=Array.from({length:n},(_,j)=>({w:"",r:"",last:fmtLast(lp&&lp[j],weighted,timeBased)}));}
    const kinds=Object.keys(P().variations[slot]||{});
    const kIdx=Math.max(0,kinds.indexOf(kind));
    const card=document.createElement('div');card.className="ex"+(st.done?" done":"");
    let h=`<div class="head"><div class="num">${st.done?ico.check:(i+1)}</div>
      <div class="hmeta"><div class="hname">${slot}</div>
      <div class="hscheme"><span class="scheme-pill">${st.force&&force?force:scheme}</span>
      ${force?`<span class="forcebtn ${st.force?'on':''}" data-force="${k}">💪 Force</span>`:''}</div></div>
      <div class="check ${st.done?'on':''}" data-chk="${k}">${ico.check}</div></div>`;
    if(kinds.length>1){
      h+=`<div class="seg"><div class="thumb" style="width:calc((100% - 6px)/${kinds.length});transform:translateX(${kIdx*100}%)"></div>`+
        kinds.map(kk=>`<div class="segi ${kk===kind?'active':''}" data-vk="${k}" data-kind="${kk}">${KINDLABEL[kk]||kk}</div>`).join('')+`</div>`;
    }
    h+=`<div class="detail">`;
    if(vr){h+=`<div class="exvarname">${vr.name}</div>`;if(cue)h+=`<div class="cue">${cue}</div>`;
      h+=`<div class="imgs"><div class="imgcell"><span class="tag">Start</span><img loading="lazy" src="${vr.img}"></div>
        <div class="imgcell"><span class="tag">Finish</span><img loading="lazy" src="${vr.img2}"></div></div>`;}
    if(force)h+=`<div class="force-note ${st.force?'show':''}"><b>💪 Strength:</b> ${force} — heavier, fewer reps, longer rest.</div>`;
    h+=`<div class="sets">`;
    st.sets.forEach((set,j)=>{h+=`<div class="setrow ${weighted?'':'noweight'}"><div class="sl">SET ${j+1}</div>`+
      (weighted?`<input inputmode="decimal" placeholder="kg" value="${set.w}" class="${set.w?'filled':''}" data-sk="${k}" data-si="${j}" data-f="w"><span class="x">×</span>`:'')+
      `<input inputmode="numeric" placeholder="${timeBased?'sec':'reps'}" value="${set.r}" class="${set.r?'filled':''}" data-sk="${k}" data-si="${j}" data-f="r">
      <div class="last">${set.last||''}</div></div>`;});
    h+=`</div><button class="addset" data-add="${k}">+ Add set</button></div>`;
    card.innerHTML=h;w.appendChild(card);
  });
  w.querySelectorAll('[data-chk]').forEach(e=>e.onclick=()=>{live[e.dataset.chk].done=!live[e.dataset.chk].done;if(navigator.vibrate)navigator.vibrate(8);saveDraft();renderTrain();});
  w.querySelectorAll('[data-force]').forEach(e=>e.onclick=()=>{const k=e.dataset.force;live[k].force=!live[k].force;saveDraft();renderTrain();});
  w.querySelectorAll('[data-vk]').forEach(e=>e.onclick=()=>{const k=e.dataset.vk,kind=e.dataset.kind,slot=k.split("|")[2];live[k].kind=kind;
    const cur=live[k].sets||[];const hasInput=cur.some(x=>x&&(x.w!==""||x.r!==""));
    if(hasInput){const lp=lastFor(slot,kind);const sl=P().sessions[cur].slots.find(x=>x[0]===slot);const tb=isTimeScheme(sl&&sl[1]),wt=kind!=='bw';cur.forEach((x,j)=>{x.last=fmtLast(lp&&lp[j],wt,tb);});}
    else{live[k].sets=null;}
    pref[plan+"|"+slot]=kind;savePref();saveDraft();renderTrain();});
  w.querySelectorAll('input[data-sk]').forEach(e=>e.oninput=()=>{const k=e.dataset.sk,i=+e.dataset.si,f=e.dataset.f;live[k].sets[i][f]=e.value;e.classList.toggle('filled',!!e.value);saveDraft();});
  w.querySelectorAll('[data-add]').forEach(e=>e.onclick=()=>{live[e.dataset.add].sets.push({w:"",r:"",last:""});saveDraft();renderTrain();});
}
function firstKind(slot){const v=P().variations[slot];return v?Object.keys(v)[0]:"bw";}

function saveDraft(){
  const out={...live};
  if(editingId!=null)out.__meta={editingId,editingKey};
  localStorage.setItem(LS_DRAFT,JSON.stringify(out));
}
/* ---------- edit context (survives navigation + reloads via the draft) ---------- */
function setEditContext(id,pk,sk){editingId=id;editingKey=pk+"|"+sk;saveDraft();}
function clearEditContext(){editingId=null;editingKey=null;saveDraft();}
function isEditingCurrent(){return editingId!=null&&editingKey===plan+"|"+cur;}
// Opening a session drops a stale edit context only if it's a DIFFERENT session.
function syncEditContext(){if(editingId!=null&&editingKey!==plan+"|"+cur)clearEditContext();}
function cancelEdit(ev){
  if(ev&&ev.stopPropagation)ev.stopPropagation();
  if(editingId==null)return;
  const s=P().sessions[cur];
  if(s)s.slots.forEach(sl=>delete live[keyOf(sl[0])]);
  clearEditContext();
  toast("Edit discarded");
  goHome();
}
function saveProgress(){
  saveDraft();
  toast(isEditingCurrent()?"Edit saved 💾":"Progress saved 💾");
  if(navigator.vibrate)navigator.vibrate(8);
}
function finishWorkout(){
  const s=P().sessions[cur],slots=[];
  s.slots.forEach(sl=>{const slot=sl[0],k=keyOf(slot),st=live[k];if(!st)return;
    const sets=(st.sets||[]).filter(x=>x.w!==""||x.r!=="").map(x=>({w:x.w,r:x.r}));
    if(sets.length||st.done)slots.push({slot,kind:st.kind,done:st.done,force:!!st.force,sets});});
  if(!slots.length){toast("Log something first 💪");return;}
  // Editing an existing entry (incl. a PAST day) always updates it in place — never
  // creates a today entry. Only applies when the edit context matches this session.
  if(isEditingCurrent()){completeFinish(slots,s,editingId);return;}
  const today=new Date().toISOString().slice(0,10);
  const dup=log().find(e=>!e.type&&e.plan===plan&&e.sess===cur&&(e.date||"").slice(0,10)===today);
  if(dup)confirmDupeFinish(dup,slots,s);
  else completeFinish(slots,s,null);
}
function confirmDupeFinish(dup,slots,s){
  let h=`<div class="grab"></div><h2>Already logged today</h2>
    <div class="sh-sub">You already logged <b>${dup.name}</b> today. Update that session instead of creating a new one?</div>
    <button class="btn acc" style="padding:14px" data-dupe="update">Update existing session</button>
    <button class="btn sec" style="padding:14px" data-dupe="new">No, log as a new session</button>`;
  openSheet(h);
  $('[data-dupe="update"]').onclick=()=>{hideModal();completeFinish(slots,s,dup.id);};
  $('[data-dupe="new"]').onclick=()=>{hideModal();completeFinish(slots,s,null);};
}
function completeFinish(slots,s,targetId){
  const l=log();
  let updated=false;
  if(targetId!=null){
    const idx=l.findIndex(e=>String(e.id)===String(targetId));
    // Keep the ORIGINAL id and date — editing a past day must not restamp it to today.
    if(idx>=0){l[idx]={...l[idx],id:l[idx].id,date:l[idx].date,plan,sess:cur,name:s.name,slots};updated=true;}
    else{l.push({id:Date.now(),date:new Date().toISOString(),plan,sess:cur,name:s.name,slots});}
  }else{
    l.push({id:Date.now(),date:new Date().toISOString(),plan,sess:cur,name:s.name,slots});
  }
  saveLog(l);
  s.slots.forEach(sl=>delete live[keyOf(sl[0])]);
  const wasUpdate=updated;clearEditContext();
  toast(wasUpdate?(s.name+" updated ✏️"):(s.name+" finished! 🎉"),ico.save);if(navigator.vibrate)navigator.vibrate([10,40,10]);
  if(gh&&gh.token)pushSync();goHome();
}

/* ---------- CALENDAR ---------- */
function dayKey(d){return d.toISOString().slice(0,10);}
function dotColor(e){return e.type==='skate'?'var(--blue)':e.type==='rest'?'var(--mut2)':HUEof(e);}
function renderCalendar(){
  const w=$("#wrap");
  const l=log();
  const byDay={};l.forEach(e=>{const k=e.date.slice(0,10);(byDay[k]=byDay[k]||[]).push(e);});
  const y=calMonth.getFullYear(),m=calMonth.getMonth();
  const first=new Date(y,m,1),start=(first.getDay()+6)%7;
  const days=new Date(y,m+1,0).getDate();
  const today=dayKey(new Date());
  const monthName=calMonth.toLocaleDateString(undefined,{month:'short',year:'numeric'});
  const monthCount=Object.keys(byDay).filter(k=>k.slice(0,7)===`${y}-${String(m+1).padStart(2,'0')}`).length;
  const streak=calcStreak(byDay);
  const now=new Date();const wd=(now.getDay()+6)%7;
  const monday=new Date(now);monday.setHours(0,0,0,0);monday.setDate(now.getDate()-wd);
  const DN=["M","T","W","T","F","S","S"];let week='';
  for(let i=0;i<7;i++){
    const dd=new Date(monday);dd.setDate(monday.getDate()+i);const key=dayKey(dd);
    const evs=byDay[key]||[];const isToday=key===today;
    const gym=evs.filter(e=>!e.type||e.type==='workout');
    let mark='';
    if(gym.length)mark=`<span class="wm" style="background:${dotColor(gym[0])}"></span>`;
    else if(evs.some(e=>e.type==='skate'))mark=`<span class="wmi">\u{1F6F9}</span>`;
    else if(evs.some(e=>e.type==='rest'))mark=`<span class="wmr">\u00B7</span>`;
    week+=`<div class="wday ${isToday?'today':''} ${evs.length?'active':''}" data-week="${key}"><div class="wdl">${DN[i]}</div><div class="wdn">${dd.getDate()}</div><div class="wmk">${mark}</div></div>`;
  }
  let h=`<div class="cal">
    <div class="sec-h" style="margin:2px 2px 10px">This week</div>
    <div class="weekbar">${week}</div>
    <div class="cal-stats">
      <div class="stat"><div class="sv acc">${monthCount}</div><div class="sl">this month</div></div>
      <div class="stat"><div class="sv">${streak}</div><div class="sl">streak \u{1F525}</div></div>
      <div class="stat"><div class="sv">${l.length}</div><div class="sl">total</div></div>
    </div>
    <div class="cal-hd"><div class="mtitle">${monthName}</div>
      <div class="cal-nav"><button data-mv="-1">\u2039</button><button data-mv="0">\u2022</button><button data-mv="1">\u203A</button></div></div>
    <div class="grid">`;
  DN.forEach(d=>h+=`<div class="gh">${d}</div>`);
  for(let i=0;i<start;i++)h+=`<div class="cell empty"></div>`;
  for(let d=1;d<=days;d++){
    const key=`${y}-${String(m+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
    const evs=byDay[key]||[];
    const dots=evs.slice(0,3).map(e=>`<i style="background:${dotColor(e)}"></i>`).join('');
    h+=`<div class="cell ${evs.length?'has':''} ${key===today?'today':''}" data-day="${key}"><div class="dn">${d}</div><div class="dots">${dots}</div></div>`;
  }
  h+=`</div><div class="cal-legend"><i class="lg" style="background:var(--acc)"></i> workout &nbsp; <i class="lg" style="background:var(--blue)"></i> skate &nbsp; <i class="lg" style="background:var(--mut2)"></i> rest</div></div>`;
  w.innerHTML=h;
  w.querySelectorAll('[data-mv]').forEach(e=>e.onclick=()=>{const v=+e.dataset.mv;if(v===0)calMonth=new Date();else calMonth=new Date(y,m+v,1);renderCalendar();});
  w.querySelectorAll('[data-day]').forEach(e=>e.onclick=()=>showDay(e.dataset.day,byDay[e.dataset.day]||[]));
  w.querySelectorAll('[data-week]').forEach(e=>e.onclick=()=>showDay(e.dataset.week,byDay[e.dataset.week]||[]));
}
function calcStreak(byDay){
  // consecutive days up to today with a workout
  let s=0,d=new Date();
  for(;;){const k=dayKey(d);if(byDay[k]){s++;d.setDate(d.getDate()-1);}else{ // allow today to be empty (streak from yesterday)
    if(k===dayKey(new Date())){d.setDate(d.getDate()-1);continue;}break;}}
  return s;
}
function showDay(key,evs){
  const d=new Date(key+"T00:00:00");
  const workouts=evs.filter(e=>!e.type||e.type==='workout');
  const skated=evs.some(e=>e.type==='skate');const rested=evs.some(e=>e.type==='rest');
  let h=`<div class="grab"></div><h2>${d.toLocaleDateString(undefined,{weekday:'long',month:'long',day:'numeric'})}</h2>`;
  h+=`<div class="sh-sub">${workouts.length?workouts.length+' workout'+(workouts.length!==1?'s':''):'nothing logged yet'}${skated?' \u00B7 \u{1F6F9} skated':''}${rested?' \u00B7 rest':''}</div>`;
  workouts.forEach((e)=>{
    const pl=DATA.plans[e.plan]?DATA.plans[e.plan].label:e.plan;
    const canRepeat=DATA.plans[e.plan]&&DATA.plans[e.plan].sessions[e.sess];
    h+=`<div class="hentry"><div class="hd"><span class="hbadge" style="color:${HUEof(e)}">${DATA.plans[e.plan]?DATA.plans[e.plan].icon:''} ${pl} \u00B7 ${e.name}</span>`;
    h+=`<span class="htime">${new Date(e.date).toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'})}</span></div><div class="hln">`;
    h+=(e.slots||[]).map(s=>{const sets=(s.sets||[]).map(x=>s.kind==='bw'?`${x.r||'\u2013'}`:`${x.w||'\u2013'}\u00D7${x.r||'\u2013'}`).join('  ');
      return `<b>${s.slot}</b> <span style="color:var(--mut)">${s.kind}${s.force?' \u00B7 \u{1F4AA}':''}</span> ${sets||'\u2713'}`;}).join('<br>');
    h+=`</div>`;
    if(canRepeat)h+=`<button class="btn sec" style="margin-top:10px" onclick="editLogEntry('${e.id}')">\u25B6 Continue / edit this workout</button>`;
    h+=`</div>`;});
  h+=`<div class="sec-label" style="margin-top:6px">Log for this day</div><div class="quicklog">`;
  h+=`<button class="ql skate ${skated?'on':''}" onclick="toggleDayType('${key}','skate')">\u{1F6F9} Skate</button>`;
  h+=`<button class="ql rest ${rested?'on':''}" onclick="toggleDayType('${key}','rest')">\u{1F634} Rest</button></div>`;
  h+=`<button class="btn acc" onclick="hideModal()" style="margin-top:12px">Close</button>`;
  openSheet(h);
}
function toggleDayType(key,type){
  let l=log();
  const existing=l.find(e=>e.type===type && e.date.slice(0,10)===key);
  if(existing){l=l.filter(e=>e!==existing);toast((type==='skate'?"Skate":"Rest")+" removed");}
  else{l.push({id:Date.now(),date:new Date(key+"T12:00:00").toISOString(),type,name:type==='skate'?'Skate':'Rest'});toast((type==='skate'?"\u{1F6F9} Skate":"\u{1F634} Rest")+" logged");}
  saveLog(l);if(gh&&gh.token)pushSync();
  const byDay={};log().forEach(e=>{const k=e.date.slice(0,10);(byDay[k]=byDay[k]||[]).push(e);});
  showDay(key,byDay[key]||[]);renderCalendar();
}
function editLogEntry(id){
  hideModal();
  const l=log();const entry=l.find(e=>String(e.id)===String(id));
  if(!entry){toast("Couldn't open that workout");return;}
  plan=entry.plan;localStorage.setItem(LS_PLAN,plan);cur=entry.sess;started=true;
  setEditContext(entry.id,entry.plan,entry.sess);
  (entry.slots||[]).forEach(s=>{
    live[plan+"|"+cur+"|"+s.slot]={kind:s.kind,done:!!s.done,force:!!s.force,
      sets:(s.sets||[]).map(x=>({w:x.w||"",r:x.r||"",last:""}))};
  });
  saveDraft();
  view='train';window.scrollTo(0,0);render();
  toast("Editing this workout ✏️");
}

/* ---------- MEALS ---------- */
function renderMeals(){
  const M=DATA.meals,w=$("#wrap");
  let h=`<div class="meals">`;
  h+=`<div class="target-card"><div class="tg">
    <div class="ti"><div class="tv">${M.targets.protein.split(' ')[0]}</div><div class="tl">protein/day</div></div>
    <div class="ti"><div class="tv">+250</div><div class="tl">kcal surplus</div></div>
    <div class="ti"><div class="tv">${M.targets.water.split('–')[0]}L</div><div class="tl">water</div></div>
  </div><div style="font-size:12.5px;color:var(--ink2);line-height:1.5">${M.targets.note}</div></div>`;
  h+=`<div class="sec-h">Principles</div>`;
  M.principles.forEach(p=>h+=`<div class="midea" style="margin:0 6px 8px;color:var(--ink2)">${p}</div>`);
  h+=`<div class="sec-h" style="margin-top:16px">Daily meals</div>`;
  M.meals.forEach(mm=>{
    h+=`<div class="mcard"><div class="mtitle2">${mm.t}<span class="mp">${mm.p}</span></div><div class="mideas">`;
    mm.ideas.forEach(i=>h+=`<div class="midea">${i}</div>`);
    h+=`</div></div>`;
  });
  h+=`<div class="sec-h" style="margin-top:16px">Go-to protein foods</div>`;
  h+=`<div class="mcard"><div class="chips">${M.protein_foods.map(f=>`<span class="c">${f}</span>`).join('')}</div></div>`;
  h+=`</div>`;
  w.innerHTML=h;
}

/* ---------- PROGRESS ---------- */
function allExerciseNames(){
  const set=new Set();
  log().forEach(e=>{if(e.type)return;(e.slots||[]).forEach(s=>{
    if((s.sets||[]).some(x=>x.w!==""&&x.w!=null&&!isNaN(parseFloat(x.w))&&parseFloat(x.w)>0))set.add(s.slot);
  });});
  return Array.from(set).sort();
}
function exerciseSeries(name){
  const pts=[];
  log().forEach(e=>{
    if(e.type)return;
    (e.slots||[]).forEach(s=>{
      if(s.slot!==name)return;
      const ws=(s.sets||[]).map(x=>parseFloat(x.w)).filter(n=>!isNaN(n)&&n>0);
      if(!ws.length)return;
      pts.push({date:e.date,top:Math.max(...ws)});
    });
  });
  pts.sort((a,b)=>new Date(a.date)-new Date(b.date));
  return pts;
}
function renderProgress(){
  const w=$("#wrap");
  const names=allExerciseNames();
  if(!names.length){
    w.innerHTML=`<div class="progress-view"><div class="sec-label">Progress</div><div class="empty">${ico.empty}<br>No weight logged yet.<br>Finish a workout with kg × reps to see progress here.</div></div>`;
    return;
  }
  if(!progExercise||!names.includes(progExercise))progExercise=names[0];
  const series=exerciseSeries(progExercise);
  let h=`<div class="progress-view"><div class="sec-label">Progress</div>
    <select id="prog-ex" class="prog-select">${names.map(n=>`<option value="${n}" ${n===progExercise?'selected':''}>${n}</option>`).join('')}</select>`;
  h+=renderProgressChart(series,progExercise);
  h+=`</div>`;
  w.innerHTML=h;
  w.querySelector('#prog-ex').onchange=e=>{progExercise=e.target.value;renderProgress();};
}
function renderProgressChart(series,name){
  if(!series.length)return `<div class="empty">${ico.empty}<br>No weight logged for ${name} yet.</div>`;
  const last=series[series.length-1].top;
  const prev=series.length>1?series[series.length-2].top:null;
  const delta=prev!=null?+(last-prev).toFixed(1):null;
  const best=Math.max(...series.map(p=>p.top));
  const maxV=best*1.15||1;
  const W=320,H=160,pad=8;
  const n=series.length;
  const slot=(W-pad*2)/n,bw=Math.max(6,slot-6);
  let bars='';
  series.forEach((p,i)=>{
    const x=pad+i*slot;
    const bh=Math.max(2,(p.top/maxV)*(H-30));
    const y=H-20-bh;
    const isLast=i===n-1;
    bars+=`<rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${bw.toFixed(1)}" height="${bh.toFixed(1)}" rx="3" fill="${isLast?'var(--acc)':'var(--surf3)'}"></rect>`;
    if(i===0||i===n-1||n<=6){
      bars+=`<text x="${(x+bw/2).toFixed(1)}" y="${H-6}" font-size="9" text-anchor="middle" fill="var(--mut)">${p.top}</text>`;
    }
  });
  const dateLabel=d=>new Date(d).toLocaleDateString(undefined,{month:'short',day:'numeric'});
  let h=`<div class="prog-stats">
    <div class="pstat"><div class="pv">${best}kg</div><div class="pl">PR best</div></div>
    <div class="pstat"><div class="pv">${last}kg</div><div class="pl">last top set</div></div>
    <div class="pstat"><div class="pv ${delta==null?'':delta>0?'up':delta<0?'down':''}">${delta==null?'—':(delta>0?'+':'')+delta+'kg'}</div><div class="pl">vs last time</div></div>
  </div>`;
  h+=`<div class="prog-chart"><svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="none" role="img" aria-label="${name} top set progress">${bars}</svg></div>`;
  h+=`<div class="prog-sub">${series.length} session${series.length!==1?'s':''} · ${dateLabel(series[0].date)} → ${dateLabel(series[series.length-1].date)}</div>`;
  return h;
}

/* ---------- History / Settings / Sync (unchanged logic) ---------- */
function showHistory(){
  const l=log().slice().reverse();
  let h=`<div class="grab"></div><h2>History</h2><div class="sh-sub">${l.length} session${l.length!==1?'s':''} logged</div>`;
  if(!l.length)h+=`<div class="empty">${ico.empty}<br>No sessions yet.<br>Finish a workout and it lands here.</div>`;
  l.slice(0,60).forEach(e=>{const d=new Date(e.date);
    const pl=DATA.plans[e.plan]?DATA.plans[e.plan].label:'';
    h+=`<div class="hentry"><div class="hd"><span class="hbadge" style="color:${HUEof(e)}">${pl} · ${e.name}</span>
      <span class="htime">${d.toLocaleDateString(undefined,{month:'short',day:'numeric'})} · ${d.toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'})}</span></div><div class="hln">`;
    h+=(e.slots||[]).map(s=>{const sets=(s.sets||[]).map(x=>s.kind==='bw'?`${x.r||'–'}`:`${x.w||'–'}×${x.r||'–'}`).join('  ');
      return `<b>${s.slot}</b> <span style="color:var(--mut)">${s.kind}${s.force?' · 💪':''}</span> ${sets||'✓'}`;}).join('<br>');
    h+=`</div></div>`;});
  if(l.length)h+=`<button class="btn sec" onclick="exportData()">⬇︎ Export backup (JSON)</button>`;
  h+=`<button class="btn acc" onclick="hideModal()" style="margin-top:8px">Close</button>`;
  openSheet(h);
}
function showSettings(){
  const stMap={off:['off','Not connected — data stays on this device'],ok:['ok','Synced with GitHub'],sync:['sync','Syncing…'],err:['err','Sync error — check token']};
  const [sd,stxt]=stMap[syncState]||stMap.off;
  let h=`<div class="grab"></div><h2>Settings</h2><div class="sh-sub">Cross-device sync via your private GitHub repo</div>`;
  h+=`<div class="sync-status"><span class="sd ${sd}"></span><span>${stxt}</span></div>`;
  h+=`<div class="field"><label>GitHub repo (owner/name)</label><input id="gh-repo" placeholder="omarjesusperezortiz/gym-data" value="${gh&&gh.repo?gh.repo:'omarjesusperezortiz/gym-data'}"></div>`;
  h+=`<div class="field"><label>Fine-grained token</label><input id="gh-token" type="text" autocomplete="off" autocapitalize="none" autocorrect="off" spellcheck="false" placeholder="github_pat_..." value="${gh&&gh.token?gh.token:''}">
    <div class="hint">Scoped to just this one repo (Contents: Read+Write). Stored only on this device.</div></div>`;
  h+=`<button class="btn acc" onclick="saveGh()">Save & Sync now</button>`;
  h+=`<button class="btn sec" onclick="pullSync(true)" style="margin-top:8px">⬇︎ Pull from GitHub</button>`;
  if(gh&&gh.token)h+=`<button class="btn sec" onclick="disconnectGh()" style="margin-top:8px;color:var(--danger)">Disconnect</button>`;
  h+=`<button class="btn sec" onclick="hideModal()" style="margin-top:8px">Close</button>`;
  openSheet(h);
}
function saveGh(){const repo=$("#gh-repo").value.replace(/\s+/g,''),token=$("#gh-token").value.replace(/\s+/g,'');
  if(!repo||!token){toast("Fill both fields");return;}gh={repo,token};localStorage.setItem(LS_GH,JSON.stringify(gh));toast("Saved — syncing…");mergeSync();}
function disconnectGh(){gh=null;localStorage.removeItem(LS_GH);syncState="off";toast("Disconnected");showSettings();}
// Generic reader for any file in the configured gym-data repo (same auth/repo as workouts.json).
async function ghGetFile(path){
  const r=await fetch(`https://api.github.com/repos/${gh.repo}/contents/${path}`,{headers:{Authorization:`Bearer ${gh.token}`,Accept:"application/vnd.github+json"}});
  if(r.status===404)return{data:null,sha:null,notFound:true};
  if(!r.ok)throw new Error("GET "+r.status+(r.status===401?" (bad/expired token)":r.status===403?" (token lacks Contents R/W)":r.status===404?" (repo not found)":""));
  const j=await r.json();return{data:JSON.parse(decodeURIComponent(escape(atob(j.content)))),sha:j.sha,notFound:false};
}
async function ghGet(){
  const {data,sha,notFound}=await ghGetFile('workouts.json');
  return notFound?{data:{sessions:[]},sha:null}:{data,sha};
}
// Reads recommendation.json (sibling of workouts.json, same gym-data repo). Returns null
// (never throws to the caller) when there's no token, it's offline, or the file is missing.
async function fetchRecommendation(){
  if(!gh||!gh.token)return null;
  try{const {data,notFound}=await ghGetFile('recommendation.json');return notFound?null:data;}
  catch(e){return null;}
}
async function ghPut(data,sha){const body={message:"workout sync "+new Date().toISOString(),content:btoa(unescape(encodeURIComponent(JSON.stringify(data,null,2))))};if(sha)body.sha=sha;
  const r=await fetch(`https://api.github.com/repos/${gh.repo}/contents/workouts.json`,{method:"PUT",headers:{Authorization:`Bearer ${gh.token}`,Accept:"application/vnd.github+json"},body:JSON.stringify(body)});
  if(!r.ok)throw new Error("PUT "+r.status);return r.json();}
function dedupeWorkoutLogs(arr){
  const groups={},passthrough=[];
  (arr||[]).forEach(e=>{
    if(!e)return;
    if(e.type){passthrough.push(e);return;} // skate/rest markers: untouched
    const key=e.plan+"|"+e.sess+"|"+(e.date||"").slice(0,10);
    const existing=groups[key];
    if(!existing){groups[key]=e;return;}
    const rank=x=>x.id!=null?Number(x.id):new Date(x.date).getTime();
    if(rank(e)>=rank(existing))groups[key]=e;
  });
  return [...passthrough,...Object.values(groups)].sort((a,b)=>new Date(a.date)-new Date(b.date));
}
function mergeLogs(remote,local){const map={};[...(remote||[]),...(local||[])].forEach(s=>{if(s&&s.id!=null)map[s.id]=s;else if(s)map[s.date]=s;});return dedupeWorkoutLogs(Object.values(map).sort((a,b)=>new Date(a.date)-new Date(b.date)));}
async function mergeSync(){if(!gh||!gh.token){syncState="off";return;}syncState="sync";refreshSyncUI();
  try{const {data,sha}=await ghGet();const merged=mergeLogs(data.sessions,log());saveLog(merged);
    await ghPut({version:2,updatedAt:new Date().toISOString(),device:navigator.platform,sessions:merged},sha);syncState="ok";toast("Synced ✓",ico.save);}
  catch(e){syncState="err";toast("Sync failed: "+e.message);}refreshSyncUI();render();}
async function pushSync(){if(!gh||!gh.token)return;syncState="sync";refreshSyncUI();
  try{const {sha}=await ghGet();await ghPut({version:2,updatedAt:new Date().toISOString(),device:navigator.platform,sessions:log()},sha);syncState="ok";}
  catch(e){syncState="err";toast("Sync failed: "+e.message);}refreshSyncUI();}
async function pullSync(manual){if(!gh||!gh.token){if(manual)toast("Connect GitHub first");return;}syncState="sync";refreshSyncUI();
  try{const {data}=await ghGet();saveLog(mergeLogs(data.sessions,log()));syncState="ok";if(manual){toast("Pulled ✓",ico.save);showSettings();}render();}
  catch(e){syncState="err";if(manual)toast("Pull failed: "+e.message);}refreshSyncUI();}
function refreshSyncUI(){const b=$("#hdr-sync");if(b)b.style.display=(syncState==='err')?'block':'none';}
function exportData(){const blob=new Blob([JSON.stringify({log:log(),pref},null,2)],{type:'application/json'});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='gym-tracker-backup.json';a.click();}
function openSheet(h){
  const sh=$("#sheet");
  sh.innerHTML=h;
  sh.style.transition='';sh.style.transform='';   // reset any leftover drag offset
  $("#modal").classList.add('show');
  initSheetDrag();
}
function hideModal(){
  const sh=$("#sheet");
  if(sh){sh.style.transition='';sh.style.transform='';}
  $("#modal").classList.remove('show');
}
/* ---------- swipe-down-to-dismiss for the bottom sheet ---------- */
let sheetDrag=null;
function initSheetDrag(){
  const sh=$("#sheet");
  if(!sh||sh._dragInit)return;
  sh._dragInit=true;
  const CLOSE_PX=100, FLICK_PX=40, FLICK_MS=250, SLOP=6;
  sh.addEventListener('touchstart',e=>{
    if(e.touches.length!==1){sheetDrag=null;return;}
    const onGrab=!!(e.target&&e.target.closest&&e.target.closest('.grab'));
    // only start a dismiss-drag from the handle, or when content is scrolled to the top
    if(!onGrab&&sh.scrollTop>0){sheetDrag=null;return;}
    sheetDrag={y0:e.touches[0].clientY,dy:0,onGrab,active:false,t0:Date.now()};
    sh.style.transition='none';
  },{passive:true});
  sh.addEventListener('touchmove',e=>{
    if(!sheetDrag||e.touches.length!==1)return;
    const dy=e.touches[0].clientY-sheetDrag.y0;
    if(!sheetDrag.active){
      if(dy>SLOP&&(sheetDrag.onGrab||sh.scrollTop<=0))sheetDrag.active=true;
      else if(dy<-SLOP){sheetDrag=null;return;}   // upward → let it scroll normally
      else return;
    }
    if(e.cancelable)e.preventDefault();           // non-passive only while dragging
    sheetDrag.dy=dy>0?dy:dy*0.25;                 // resist upward past the open position
    sh.style.transform=`translateY(${Math.max(sheetDrag.dy,-40).toFixed(1)}px)`;
  },{passive:false});
  const endDrag=()=>{
    if(!sheetDrag)return;
    const dy=sheetDrag.dy,fast=(Date.now()-sheetDrag.t0)<FLICK_MS&&dy>FLICK_PX;
    sheetDrag=null;
    sh.style.transition='transform .28s cubic-bezier(.2,.8,.2,1)';
    if(dy>CLOSE_PX||fast){
      sh.style.transform='translateY(100%)';
      setTimeout(hideModal,220);
    }else{
      sh.style.transform='translateY(0)';
    }
  };
  sh.addEventListener('touchend',endDrag,{passive:true});
  sh.addEventListener('touchcancel',endDrag,{passive:true});
}
$("#modal").onclick=e=>{if(e.target.id==='modal')hideModal();};
initSheetDrag();
render();
if(gh&&gh.token){syncState="ok";pullSync(false);}
refreshRecommendation();
