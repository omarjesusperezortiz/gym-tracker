
// DATA is loaded from data.js
const LS_LOG="obt_log_v2", LS_PREF="obt_pref_v2", LS_GH="obt_gh_v1", LS_PLAN="obt_plan_v1", LS_DRAFT="obt_draft_v1";
let plan=localStorage.getItem(LS_PLAN)||"gym";
let cur=null, view="home", started=false, editingId=null;
let live=JSON.parse(localStorage.getItem(LS_DRAFT)||"{}"), calMonth=new Date();
let pref=JSON.parse(localStorage.getItem(LS_PREF)||"{}");
let gh=JSON.parse(localStorage.getItem(LS_GH)||"null");
let syncState="off";
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
 empty:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M6.5 6.5l11 11M2 6l4-4M18 22l4-4"/></svg>'
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
  const navs=[["home","Home",ico.home],["calendar","Calendar",ico.cal],["meals","Meals",ico.meal]];
  $("#nav").innerHTML=navs.map(([v,l,i])=>`<div class="ni ${v===view?'active':''}" data-view="${v}">${i}<span>${l}</span></div>`).join('');
  $("#nav").querySelectorAll('[data-view]').forEach(e=>e.onclick=()=>{view=e.dataset.view;if(view==='home')started=false;render();});
}
function renderTabs(){
  const t=$("#tabs");t.innerHTML="";
  const keys=Object.keys(P().sessions);
  if(!cur||!keys.includes(cur))cur=keys[0];
  keys.forEach((k,i)=>{
    const s=P().sessions[k],col=dayColor(plan,k);
    const d=document.createElement('div');d.className="daycard"+(k===cur?" active":"");d.dataset.k=k;
    d.innerHTML=`<div class="dcbar" style="background:${col}"></div><div class="dck">${s.emoji} Day ${i+1}</div><div class="dcn">${s.name}</div><div class="dcm">${s.muscles}</div>`;
    d.onclick=()=>{cur=k;renderTrain();const el=t.querySelector('.daycard.active');if(el)el.scrollIntoView({inline:'center',block:'nearest',behavior:'smooth'});};
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
  if(view==='home')renderHome();
  else if(view==='train')renderTrain();
  else if(view==='calendar')renderCalendar();
  else renderMeals();
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
      h+=`<div class="resume" data-rp="${x.plan}" data-rd="${x.day}"><div class="rbar" style="background:${col}"></div>
        <div class="rico">${s.emoji}</div>
        <div class="rinfo"><div class="rname">${s.name} <span class="rtag">${pl.icon} ${pl.label}</span></div>
        <div class="rmus">${x.done} of ${x.total} done · tap to resume</div></div>
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
  w.querySelectorAll('[data-day]').forEach(e=>e.onclick=()=>{cur=e.dataset.day;started=true;view='train';window.scrollTo(0,0);render();});
  w.querySelectorAll('[data-rp]').forEach(e=>e.onclick=()=>{plan=e.dataset.rp;localStorage.setItem(LS_PLAN,plan);cur=e.dataset.rd;started=true;view='train';window.scrollTo(0,0);render();});
}
function streakAll(){const l=log();const byDay={};l.forEach(e=>{byDay[e.date.slice(0,10)]=1;});
  let s=0,d=new Date();for(;;){const k=d.toISOString().slice(0,10);if(byDay[k]){s++;d.setDate(d.getDate()-1);}else{if(k===new Date().toISOString().slice(0,10)){d.setDate(d.getDate()-1);continue;}break;}}return s;}
function renderTrainbar(){
  if(view!=='train'){return;}
  const keys=Object.keys(P().sessions);if(!cur||!keys.includes(cur))cur=keys[0];
  const s=P().sessions[cur],p=progress();
  $("#trainbar").innerHTML=`<div class="backbtn" onclick="goHome()">${ico.back}</div>
    <div class="tinfo"><div class="tt">${s.emoji} ${s.name}</div><div class="tm">${editingId!=null?"✏️ editing · ":""}${P().icon} ${P().label} · ${s.muscles}</div></div>
    <div class="tprog">${p.done}/${p.total}</div>`;
}
function goHome(){view='home';started=false;editingId=null;window.scrollTo(0,0);render();}

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
    if(!st.sets){const lp=lastFor(slot,kind),n=parseTarget(scheme);
      st.sets=Array.from({length:n},(_,j)=>({w:"",r:"",last:lp&&lp[j]?`${lp[j].w||"–"}×${lp[j].r||"–"}`:""}));}
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
    st.sets.forEach((set,j)=>{h+=`<div class="setrow"><div class="sl">SET ${j+1}</div>
      <input inputmode="decimal" placeholder="kg" value="${set.w}" class="${set.w?'filled':''}" data-sk="${k}" data-si="${j}" data-f="w">
      <span class="x">×</span>
      <input inputmode="numeric" placeholder="reps" value="${set.r}" class="${set.r?'filled':''}" data-sk="${k}" data-si="${j}" data-f="r">
      <div class="last">${set.last||''}</div></div>`;});
    h+=`</div><button class="addset" data-add="${k}">+ Add set</button></div>`;
    card.innerHTML=h;w.appendChild(card);
  });
  w.querySelectorAll('[data-chk]').forEach(e=>e.onclick=()=>{live[e.dataset.chk].done=!live[e.dataset.chk].done;if(navigator.vibrate)navigator.vibrate(8);saveDraft();renderTrain();});
  w.querySelectorAll('[data-force]').forEach(e=>e.onclick=()=>{const k=e.dataset.force;live[k].force=!live[k].force;saveDraft();renderTrain();});
  w.querySelectorAll('[data-vk]').forEach(e=>e.onclick=()=>{const k=e.dataset.vk,kind=e.dataset.kind,slot=k.split("|")[2];live[k].kind=kind;live[k].sets=null;pref[plan+"|"+slot]=kind;savePref();saveDraft();renderTrain();});
  w.querySelectorAll('input[data-sk]').forEach(e=>e.oninput=()=>{const k=e.dataset.sk,i=+e.dataset.si,f=e.dataset.f;live[k].sets[i][f]=e.value;e.classList.toggle('filled',!!e.value);saveDraft();});
  w.querySelectorAll('[data-add]').forEach(e=>e.onclick=()=>{live[e.dataset.add].sets.push({w:"",r:"",last:""});saveDraft();renderTrain();});
}
function firstKind(slot){const v=P().variations[slot];return v?Object.keys(v)[0]:"bw";}

function saveDraft(){localStorage.setItem(LS_DRAFT,JSON.stringify(live));}
function saveProgress(){
  saveDraft();
  toast("Progress saved 💾");
  if(navigator.vibrate)navigator.vibrate(8);
}
function finishWorkout(){
  const s=P().sessions[cur],slots=[];
  s.slots.forEach(sl=>{const slot=sl[0],k=keyOf(slot),st=live[k];if(!st)return;
    const sets=(st.sets||[]).filter(x=>x.w!==""||x.r!=="").map(x=>({w:x.w,r:x.r}));
    if(sets.length||st.done)slots.push({slot,kind:st.kind,done:st.done,force:!!st.force,sets});});
  if(!slots.length){toast("Log something first 💪");return;}
  const l=log();
  if(editingId!=null){
    const idx=l.findIndex(e=>String(e.id)===String(editingId));
    if(idx>=0){l[idx]={...l[idx],plan,sess:cur,name:s.name,slots};}
    else{l.push({id:Date.now(),date:new Date().toISOString(),plan,sess:cur,name:s.name,slots});}
  }else{
    l.push({id:Date.now(),date:new Date().toISOString(),plan,sess:cur,name:s.name,slots});
  }
  saveLog(l);
  s.slots.forEach(sl=>delete live[keyOf(sl[0])]);saveDraft();
  const wasEdit=editingId!=null;editingId=null;
  toast(wasEdit?(s.name+" updated ✏️"):(s.name+" finished! 🎉"),ico.save);if(navigator.vibrate)navigator.vibrate([10,40,10]);
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
    h+=(e.slots||[]).map(s=>{const sets=(s.sets||[]).map(x=>`${x.w||'\u2013'}\u00D7${x.r||'\u2013'}`).join('  ');
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
  plan=entry.plan;localStorage.setItem(LS_PLAN,plan);cur=entry.sess;editingId=entry.id;started=true;
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

/* ---------- History / Settings / Sync (unchanged logic) ---------- */
function showHistory(){
  const l=log().slice().reverse();
  let h=`<div class="grab"></div><h2>History</h2><div class="sh-sub">${l.length} session${l.length!==1?'s':''} logged</div>`;
  if(!l.length)h+=`<div class="empty">${ico.empty}<br>No sessions yet.<br>Finish a workout and it lands here.</div>`;
  l.slice(0,60).forEach(e=>{const d=new Date(e.date);
    const pl=DATA.plans[e.plan]?DATA.plans[e.plan].label:'';
    h+=`<div class="hentry"><div class="hd"><span class="hbadge" style="color:${HUEof(e)}">${pl} · ${e.name}</span>
      <span class="htime">${d.toLocaleDateString(undefined,{month:'short',day:'numeric'})} · ${d.toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'})}</span></div><div class="hln">`;
    h+=(e.slots||[]).map(s=>{const sets=(s.sets||[]).map(x=>`${x.w||'–'}×${x.r||'–'}`).join('  ');
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
async function ghGet(){const r=await fetch(`https://api.github.com/repos/${gh.repo}/contents/workouts.json`,{headers:{Authorization:`Bearer ${gh.token}`,Accept:"application/vnd.github+json"}});
  if(r.status===404)return{data:{sessions:[]},sha:null};
  if(!r.ok)throw new Error("GET "+r.status+(r.status===401?" (bad/expired token)":r.status===403?" (token lacks Contents R/W)":r.status===404?" (repo not found)":""));
  const j=await r.json();return{data:JSON.parse(decodeURIComponent(escape(atob(j.content)))),sha:j.sha};}
async function ghPut(data,sha){const body={message:"workout sync "+new Date().toISOString(),content:btoa(unescape(encodeURIComponent(JSON.stringify(data,null,2))))};if(sha)body.sha=sha;
  const r=await fetch(`https://api.github.com/repos/${gh.repo}/contents/workouts.json`,{method:"PUT",headers:{Authorization:`Bearer ${gh.token}`,Accept:"application/vnd.github+json"},body:JSON.stringify(body)});
  if(!r.ok)throw new Error("PUT "+r.status);return r.json();}
function mergeLogs(remote,local){const map={};[...(remote||[]),...(local||[])].forEach(s=>{if(s&&s.id!=null)map[s.id]=s;else if(s)map[s.date]=s;});return Object.values(map).sort((a,b)=>new Date(a.date)-new Date(b.date));}
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
function openSheet(h){$("#sheet").innerHTML=h;$("#modal").classList.add('show');}
function hideModal(){$("#modal").classList.remove('show');}
$("#modal").onclick=e=>{if(e.target.id==='modal')hideModal();};
render();
if(gh&&gh.token){syncState="ok";pullSync(false);}
