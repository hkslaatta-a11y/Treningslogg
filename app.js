const STORAGE_KEY='treningslogg-pwa-v1';
const APP_VERSION='2.1.0';
const CLOUD_CONFIG_KEY='treningslogg-cloud-config-v1';
const CLOUD_META_KEY='treningslogg-cloud-meta-v1';

const mePrograms=[
  {name:'Full Body A',notes:'Revidert etter praktisk testing. Kvalitet, full ROM og riktig RIR før belastning.',exercises:[
    ['Dype Smith-knebøy',3,'10–12','3–1–1–0',180,'RIR 1–2',false,[]],
    ['Smith benkpress',3,'8–12','3–0–1–0',180,'RIR 1–2',false,[]],
    ['Pull-ups',3,'6–10','2–1–1–1',180,'RIR 1–2',false,[]],
    ['RDL',3,'8–10','3–0–1–0',180,'RIR 1–2',false,[]],
    ['Sidehev',2,'10–15','2–0–1–1',120,'RIR 0–1',false,[]],
    ['Sittende incline DB curl',2,'10–15','3–1–1–1',120,'RIR 0–1',false,[]],
    ['Enarms cable triceps extension',2,'10–15','3–1–1–1',120,'RIR 0–1',false,[]],
    ['Cable crunch',3,'8–12','3–1–1–1',120,'RIR 0–1',false,[]]
  ]},
  {name:'Full Body B',notes:'Revidert etter økten 03.09.2026.',exercises:[
    ['RDL',3,'8–12','3–0–1–0',180,'RIR 1–2',false,[]],
    ['Incline Smith press',3,'8–12','3–0–1–0',180,'RIR 1–2',false,[]],
    ['Horizontal pull-ups',3,'8–12','3–1–1–1',150,'RIR 1–2',false,['Chest-supported row']],
    ['Bulgarian split squat – front foot elevated',3,'8–12','3–1–1–0',180,'RIR 1–2',false,[]],
    ['DB shoulder press',3,'8–12','3–0–1–0',150,'RIR 1–2',false,[]],
    ['Leg extension',2,'12–15','3–0–1–1',120,'RIR 0–1',false,[]],
    ['Leg curl',2,'10–15','3–1–1–1',120,'RIR 0–1',false,[]],
    ['Hanging leg raise',3,'8–12','3–1–2–1',120,'RIR 0–1 · avslutt med bekkenrull',false,[]]
  ]},
  {name:'Full Body C',notes:'Supersett A–D. Pause 2–3 min, nærmere 3 min på store øvelser.',exercises:[
    ['A1 · Utfall fra boks',3,'8–12','3–1–1–0',180,'RIR 1–2 · Supersett A2',false,[]],
    ['A2 · Chin-ups',3,'6–10','2–1–1–1',180,'RIR 1–2 · Supersett A1',false,[]],
    ['B1 · Dype Smith-knebøy',3,'12–15','3–1–1–0',180,'RIR 1–2 · Supersett B2',false,[]],
    ['B2 · Weighted dips',3,'6–10','3–1–1–0',180,'RIR 1–2 · Supersett B1',false,[]],
    ['C1 · Sidehev',2,'10–15','2–0–1–1',120,'RIR 0–1 · Supersett C2',false,[]],
    ['C2 · Cable flyes',2,'8–12','3–1–1–1',120,'RIR 0–1 · Supersett C1',false,[]],
    ['D1 · Cable hammer curl',2,'10–15','3–0–1–1',120,'RIR 0–1 · Supersett D2',false,[]],
    ['D2 · Ab wheel rollout',3,'6–12','3–1–1–0',120,'RIR 0–1 · Supersett D1',false,['Stående ab-wheel partials']]
  ]},
  {name:'Calisthenics / ekstraøkt',notes:'Valgfri ekstraøkt. Skal ikke gå utover A/B/C-restitusjonen.',exercises:[
    ['Feet-elevated pike push-ups / HSPU-progresjon',3,'6–10','3–1–1–0',120,'RIR 2',false,['Wall HSPU negatives','Partial wall HSPU']],
    ['Neutral-grip pull-ups',3,'6–10','2–1–1–1',120,'RIR 2',false,['Pull-ups','Chin-ups']],
    ['Dips',3,'8–12','kontrollert',120,'RIR 2',false,[]],
    ['Horizontal pull-ups / inverted row',3,'10–15','2–1–1–1',120,'RIR 1–2',false,[]],
    ['Knestående ab-wheel',2,'8–12','3–1–1–0',120,'Teknikk og lang ROM',false,[]],
    ['Stående ab-wheel partials',3,'3–6','kontrollert',150,'Bruk vegg som stoppunkt',false,[]]
  ]}
];

const partnerPrograms=[
  {name:'ØKT A',notes:'Partnerprogram.',exercises:[
    ['BootyBuilder',3,'6–8','',120,'',false,[]],
    ['Abduksjon',3,'15–25','',90,'',false,[]],
    ['Sumo strakmark',3,'8','',150,'',false,[]],
    ['Pullups',3,'4–8','',150,'',false,[]],
    ['Reverse lunge',3,'8–10','',150,'Valgfri variant',false,['Knebøy']],
    ['Kabelroing',3,'8–10','',120,'2–3 sett etter behov',false,[]],
    ['Sidehev',3,'10–15','',90,'2–3 sett etter behov',false,[]]
  ]},
  {name:'ØKT B',notes:'Partnerprogram.',exercises:[
    ['RDL',3,'6–8','',150,'',false,[]],
    ['Push-ups',3,'6–10','',120,'',false,[]],
    ['Gående utfall',3,'8','',150,'',false,[]],
    ['Nedtrekkvariant',3,'10','',120,'',false,[]],
    ['Skulderpress',3,'6–8','',120,'',false,[]],
    ['Rygghev',3,'10–12','',120,'',false,[]],
    ['Crunch i slynge',3,'10–15','',90,'',false,[]]
  ]},
  {name:'ØKT C',notes:'Partnerprogram.',exercises:[
    ['BootyBuilder',3,'8–10','',120,'',false,[]],
    ['Abduksjon',3,'15–25','',90,'',true,[]],
    ['Chins',3,'5–8','',150,'',false,[]],
    ['Leg extension',3,'10–15','',120,'',true,[]],
    ['Sidehev',3,'10–15','',90,'',false,[]],
    ['Foroverbøyd roing',2,'8/arm','',120,'',false,[]],
    ['Smalere push-ups',3,'8–10','',120,'',false,[]],
    ['Bensenk',3,'10–15','',90,'Valgfri variant',false,['Sideplanke']]
  ]},
  {name:'BONUSØKT',notes:'Alle øvelsene er valgfrie – bygg dagens bonusøkt etter behov.',exercises:[
    ['Tøying',1,'etter behov','',0,'Valgfri',true,[]],['Kickback',3,'10–15','',90,'Valgfri',true,[]],
    ['Skulderpress',3,'6–8','',120,'Valgfri',true,[]],['GHD',3,'8–12','',120,'Valgfri',true,[]],
    ['Six ways',2,'10–15','',90,'Valgfri',true,[]],['TRX crunch',3,'10–15','',90,'Valgfri',true,[]],
    ['Benkpress',3,'6–10','',150,'Valgfri',true,[]],['Skrå sit-up',3,'10–15','',90,'Valgfri',true,[]],
    ['Adduksjon',3,'12–20','',90,'Valgfri',true,[]],['Knebøy i kabel',3,'8–12','',120,'Valgfri',true,[]]
  ]}
];

function makePrograms(raw,prefix){return raw.map((p,pi)=>({id:`${prefix}p${pi}`,name:p.name,notes:p.notes||'',exercises:p.exercises.map((e,ei)=>({id:`${prefix}p${pi}e${ei}`,name:e[0],targetSets:e[1],targetReps:e[2],tempo:e[3],restSeconds:e[4],notes:e[5],optional:!!e[6],alternatives:e[7]||[]}))}));}
function freshState(){return {version:2,currentProfileId:'me',profiles:[
  {id:'me',name:'Håvard',programs:makePrograms(mePrograms,'m'),sessions:[]},
  {id:'partner',name:'Stine',programs:makePrograms(partnerPrograms,'d'),sessions:[]}
],active:null,timer:null};}
function uid(){return crypto.randomUUID?crypto.randomUUID():Date.now().toString(36)+Math.random().toString(36).slice(2);}
function clone(x){return structuredClone?structuredClone(x):JSON.parse(JSON.stringify(x));}
function migrateLegacy(s){
  const n=freshState(),me=n.profiles[0];
  if(Array.isArray(s.programs)&&s.programs.length) me.programs=s.programs.map((p,pi)=>({id:p.id||`legacy-p${pi}`,name:p.name||`Program ${pi+1}`,notes:p.notes||'',exercises:(p.exercises||[]).map((e,ei)=>({id:e.id||`legacy-p${pi}e${ei}`,name:e.name||'Øvelse',targetSets:e.targetSets||3,targetReps:e.targetReps||'',tempo:e.tempo||'',restSeconds:e.restSeconds??120,notes:e.notes||'',optional:!!e.optional,alternatives:e.alternatives||[]}))}));
  me.sessions=(s.sessions||[]).map(x=>({...x,profileId:'me'}));
  if(s.active)n.active={...s.active,profileId:'me'};
  return n;
}
function normalizeProfileNames(s){if(!s||!Array.isArray(s.profiles))return s;const me=s.profiles.find(p=>p.id==='me');const partner=s.profiles.find(p=>p.id==='partner');if(me&&(!me.name||me.name==='Meg'))me.name='Håvard';if(partner&&(!partner.name||partner.name==='Dama'))partner.name='Stine';return s;}
function loadState(){try{const raw=localStorage.getItem(STORAGE_KEY);if(raw){const s=JSON.parse(raw);if(s.version>=2&&Array.isArray(s.profiles)){s.timer=null;return normalizeProfileNames(s);}return normalizeProfileNames(migrateLegacy(s));}}catch(e){}return freshState();}
let state=loadState();let timerHandle=null;
let cloudClient=null,cloudReady=false,cloudSyncTimer=null,cloudPollTimer=null,cloudLastProfileSnapshot=JSON.stringify(state.profiles||[]),cloudApplying=false;
let cloudMeta=loadCloudMeta();
saveState();
function loadCloudConfig(){try{return JSON.parse(localStorage.getItem(CLOUD_CONFIG_KEY)||'{}')}catch(e){return{}}}
function saveCloudConfig(c){localStorage.setItem(CLOUD_CONFIG_KEY,JSON.stringify(c||{}));}
function loadCloudMeta(){try{return JSON.parse(localStorage.getItem(CLOUD_META_KEY)||'{}')}catch(e){return{}}}
function saveCloudMeta(){localStorage.setItem(CLOUD_META_KEY,JSON.stringify(cloudMeta||{}));}
function cloudPayload(){return {version:state.version||2,profiles:clone(state.profiles||[])};}
function saveState(){localStorage.setItem(STORAGE_KEY,JSON.stringify(state));const snap=JSON.stringify(state.profiles||[]);if(!cloudApplying&&snap!==cloudLastProfileSnapshot){cloudLastProfileSnapshot=snap;queueCloudPush();}}
function cloudConfigured(){const c=loadCloudConfig();return !!(c.url&&c.key);}
async function initCloud(){
  const c=loadCloudConfig();
  if(!c.url||!c.key||!window.supabase){cloudReady=false;return;}
  try{
    cloudClient=window.supabase.createClient(c.url,c.key,{auth:{persistSession:true,autoRefreshToken:true,detectSessionInUrl:true}});
    const {data}=await cloudClient.auth.getSession();
    cloudReady=!!data?.session;
    if(cloudReady)await resolveCloudHousehold();
    cloudClient.auth.onAuthStateChange(async(_event,session)=>{cloudReady=!!session;if(cloudReady)await resolveCloudHousehold();renderSettings();});
    if(cloudPollTimer)clearInterval(cloudPollTimer);
    cloudPollTimer=setInterval(()=>{if(cloudReady&&cloudMeta.householdId&&document.visibilityState==='visible')pullCloud(false);},20000);
    document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='visible'&&cloudReady&&cloudMeta.householdId)pullCloud(false);},{passive:true});
  }catch(e){cloudReady=false;}
}
async function resolveCloudHousehold(){
  if(!cloudClient)return;
  const {data,error}=await cloudClient.rpc('get_my_training_household');
  if(error){cloudMeta.lastError=error.message;saveCloudMeta();return;}
  const row=Array.isArray(data)?data[0]:data;
  if(row?.household_id){cloudMeta.householdId=row.household_id;cloudMeta.inviteCode=row.invite_code;cloudMeta.updatedAt=row.updated_at;saveCloudMeta();if(row.data&&row.data.profiles)applyCloudPayload(row.data);}
}
function applyCloudPayload(payload){
  if(!payload?.profiles)return;
  const current=state.currentProfileId,active=state.active,timer=state.timer;
  cloudApplying=true;state.profiles=payload.profiles;normalizeProfileNames(state);state.currentProfileId=state.profiles.some(p=>p.id===cloudMeta.deviceProfileId)?cloudMeta.deviceProfileId:(state.profiles.some(p=>p.id===current)?current:state.profiles[0]?.id);state.active=active;state.timer=timer;localStorage.setItem(STORAGE_KEY,JSON.stringify(state));cloudLastProfileSnapshot=JSON.stringify(state.profiles||[]);cloudApplying=false;renderAll();
}
function queueCloudPush(){if(!cloudReady||!cloudMeta.householdId)return;clearTimeout(cloudSyncTimer);cloudSyncTimer=setTimeout(()=>pushCloud(),900);}
async function pushCloud(){
  if(!cloudClient||!cloudReady||!cloudMeta.householdId)return;
  const {data,error}=await cloudClient.rpc('save_training_state',{p_household_id:cloudMeta.householdId,p_data:cloudPayload()});
  if(error){cloudMeta.lastError=error.message;saveCloudMeta();renderSettings();return;}
  const row=Array.isArray(data)?data[0]:data;cloudMeta.updatedAt=row?.updated_at||new Date().toISOString();cloudMeta.lastSyncedAt=new Date().toISOString();cloudMeta.lastError='';saveCloudMeta();renderCloudStatus();
}
async function pullCloud(showToast=true){
  if(!cloudClient||!cloudReady||!cloudMeta.householdId)return;
  const {data,error}=await cloudClient.rpc('get_my_training_household');
  if(error){cloudMeta.lastError=error.message;saveCloudMeta();renderSettings();return;}
  const row=Array.isArray(data)?data[0]:data;if(!row?.household_id)return;
  if(row.data?.profiles)applyCloudPayload(row.data);cloudMeta.inviteCode=row.invite_code;cloudMeta.updatedAt=row.updated_at;cloudMeta.lastSyncedAt=new Date().toISOString();cloudMeta.lastError='';saveCloudMeta();renderCloudStatus();if(showToast)toast('Synkronisert fra skyen');
}
async function cloudSignUp(email,password){const {data,error}=await cloudClient.auth.signUp({email,password});if(error)throw error;return data;}
async function cloudSignIn(email,password){const {data,error}=await cloudClient.auth.signInWithPassword({email,password});if(error)throw error;cloudReady=true;await resolveCloudHousehold();return data;}
async function cloudSignOut(){if(cloudClient)await cloudClient.auth.signOut();cloudReady=false;cloudMeta={deviceProfileId:cloudMeta.deviceProfileId};saveCloudMeta();renderAll();}
async function createCloudHousehold(){const {data,error}=await cloudClient.rpc('create_training_household',{initial_data:cloudPayload()});if(error)throw error;const row=Array.isArray(data)?data[0]:data;cloudMeta.householdId=row.household_id;cloudMeta.inviteCode=row.invite_code;cloudMeta.updatedAt=row.updated_at;cloudMeta.lastSyncedAt=new Date().toISOString();saveCloudMeta();renderAll();}
async function joinCloudHousehold(code){const {data,error}=await cloudClient.rpc('join_training_household',{code:String(code||'').trim().toUpperCase()});if(error)throw error;const row=Array.isArray(data)?data[0]:data;cloudMeta.householdId=row.household_id;cloudMeta.inviteCode=row.invite_code;cloudMeta.updatedAt=row.updated_at;cloudMeta.lastSyncedAt=new Date().toISOString();saveCloudMeta();if(row.data?.profiles)applyCloudPayload(row.data);renderAll();}
async function currentCloudUser(){if(!cloudClient)return null;const {data}=await cloudClient.auth.getUser();return data?.user||null;}
function renderCloudStatus(){const e=document.querySelector('#cloudStatus');if(!e)return;const last=cloudMeta.lastSyncedAt?fmtDate(cloudMeta.lastSyncedAt):'Ikke synkronisert ennå';e.textContent=cloudMeta.lastError?`Synkfeil: ${cloudMeta.lastError}`:`Sist synkronisert: ${last}`;}

function profile(){return state.profiles.find(p=>p.id===state.currentProfileId)||state.profiles[0];}
function esc(s=''){return String(s).replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));}
function fmtDate(iso){return new Intl.DateTimeFormat('nb-NO',{day:'2-digit',month:'short',year:'numeric',hour:'2-digit',minute:'2-digit'}).format(new Date(iso));}
function normalizedName(n=''){return n.replace(/^[A-D][12]\s*[·.-]?\s*/i,'').trim().toLowerCase();}
function repRange(t=''){const n=(String(t).match(/\d+/g)||[]).map(Number);return n.length?[Math.min(...n),Math.max(...n)]:null;}
function rirRange(t=''){const m=(String(t).match(/RIR\s*(\d+)(?:[–-](\d+))?/i)||[]);if(!m.length)return null;const a=+m[1],b=m[2]?+m[2]:a;return[Math.min(a,b),Math.max(a,b)];}
function volume(s){return (s.exercises||[]).flatMap(e=>e.sets||[]).reduce((a,x)=>a+(Number(x.weight)||0)*(Number(x.reps)||0),0);}
function oneRM(w,r){return w>0&&r>0?w*(1+r/30):0;}
function fmtW(v){return Number.isInteger(v)?String(v):Number(v).toFixed(1).replace('.',',');}
function round05(v){return Math.round(v*2)/2;}
function smallExercise(n){return ['sidehev','curl','triceps','fly','extension','leg curl','abduksjon','adduksjon','kickback'].some(k=>normalizedName(n).includes(k));}
function toast(msg){const t=document.querySelector('#toast');t.textContent=msg;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),1800);}
function setTab(id){document.querySelectorAll('.tab').forEach(b=>b.classList.toggle('active',b.dataset.tab===id));document.querySelectorAll('.view').forEach(v=>v.classList.toggle('active',v.id===id));renderAll();}

function profileSessions(pid=state.currentProfileId){return state.profiles.find(p=>p.id===pid)?.sessions||[];}
function mostRecentExercise(name,pid=state.currentProfileId){const key=normalizedName(name);for(const sess of profileSessions(pid)){const e=(sess.exercises||[]).find(x=>normalizedName(x.name)===key);if(e)return e;}return null;}
function lastSummary(name){const e=mostRecentExercise(name);if(!e)return'';const sets=(e.sets||[]).filter(s=>s.completed||s.reps);if(!sets.length)return'';return sets.map(s=>`${s.weight||0}kg×${s.reps||0}${s.rir!==''&&s.rir!=null?`@${s.rir}`:''}`).join(' · ');}
function progressionSuggestion(e){const rr=repRange(e.targetReps),prev=mostRecentExercise(e.name);if(!rr||!prev)return null;const sets=(prev.sets||[]).filter(s=>(s.completed||s.reps)&&Number(s.reps)>0);if(!sets.length)return null;const reps=sets.map(s=>Number(s.reps));const avgRirVals=sets.filter(s=>s.rir!==''&&s.rir!=null).map(s=>Number(s.rir));const avgRir=avgRirVals.length?avgRirVals.reduce((a,b)=>a+b,0)/avgRirVals.length:NaN;const target=rirRange(e.notes);const wvals=sets.map(s=>Number(s.weight)).filter(w=>w>0);const w=wvals.length?Math.max(...wvals):null;const allTop=sets.length>=2&&sets.every(s=>Number(s.reps)>=rr[1]);
  if(target&&Number.isFinite(avgRir)&&avgRir<target[0])return{title:'Behold / juster ned',detail:`Sist ca. RIR ${avgRir.toFixed(1).replace('.',',')}; mål ${target[0]}–${target[1]}. Prioriter teknikk og riktig RIR.`};
  if(allTop){if(w){const next=round05(w+(smallExercise(e.name)?1:2.5));return{title:'Klar for liten økning',detail:`Alle arbeidssettene traff toppen av repområdet. Prøv ca. ${fmtW(next)} kg hvis tempo og RIR var riktig.`};}return{title:'Gjør varianten litt tyngre',detail:'Du traff toppen av repområdet på alle arbeidssett.'};}
  if(Math.max(...reps)>=rr[0])return{title:'Bygg reps',detail:`Behold omtrent samme belastning og prøv å slå forrige økt innen ${rr[0]}–${rr[1]} reps.`};
  return{title:'Bygg inn i repområdet',detail:`Sikt først på minst ${rr[0]} rene reps per arbeidssett.`};
}

function startWorkout(programId){const p=profile().programs.find(x=>x.id===programId);if(!p)return;if(state.active&&!confirm('Du har allerede en pågående økt. Erstatt den?'))return;openWorkoutSetup(p);}
function openWorkoutSetup(p){const m=document.querySelector('#modal'),b=document.querySelector('#modalBody');b.innerHTML=`<h3>${esc(p.name)}</h3><p class="muted small">Velg valgfrie øvelser før du starter. Du kan også legge til engangsøvelser underveis.</p><div class="stack optional-list">${p.exercises.map(e=>`<label class="toggle-row"><input type="checkbox" data-pick="${e.id}" ${e.optional?'':'checked'}><span><strong>${esc(e.name)}</strong>${e.optional?'<em>Valgfri</em>':''}<small>${e.targetSets} × ${esc(e.targetReps||'–')}</small></span></label>`).join('')}</div><div class="grid2"><button value="cancel" class="ghost">Avbryt</button><button type="button" class="primary" id="confirmStart">Start økt</button></div>`;m.showModal();b.querySelector('#confirmStart').onclick=()=>{const chosen=new Set([...b.querySelectorAll('[data-pick]:checked')].map(x=>x.dataset.pick));const selected=p.exercises.filter(e=>chosen.has(e.id));if(!selected.length)return toast('Velg minst én øvelse');state.active={id:uid(),profileId:state.currentProfileId,programID:p.id,name:p.name,startedAt:new Date().toISOString(),notes:'',exercises:selected.map(e=>({id:uid(),sourceExerciseID:e.id,name:e.name,originalName:e.name,targetReps:e.targetReps,tempo:e.tempo,restSeconds:e.restSeconds,notes:e.notes,alternatives:e.alternatives||[],sets:Array.from({length:Number(e.targetSets)||3},()=>({id:uid(),weight:'',reps:'',rir:'',completed:false}))}))};saveState();m.close();setTab('workout');};}
function addSet(eid){const e=state.active?.exercises.find(x=>x.id===eid);if(!e)return;e.sets.push({id:uid(),weight:'',reps:'',rir:'',completed:false});saveState();renderWorkout();}
function removeExercise(eid){if(!state.active)return;state.active.exercises=state.active.exercises.filter(e=>e.id!==eid);saveState();renderWorkout();}
function updateSet(eid,sid,key,value){const e=state.active?.exercises.find(x=>x.id===eid),s=e?.sets.find(x=>x.id===sid);if(!s)return;s[key]=value;saveState();updateWorkoutSummary();}
function toggleSet(eid,sid){const e=state.active?.exercises.find(x=>x.id===eid),s=e?.sets.find(x=>x.id===sid);if(!s)return;s.completed=!s.completed;if(s.completed&&e.restSeconds)startTimer(e.restSeconds);saveState();renderWorkout();}
function startTimer(sec){state.timer={end:Date.now()+sec*1000,duration:sec};saveState();tickTimer();clearInterval(timerHandle);timerHandle=setInterval(tickTimer,1000);}
function stopTimer(){state.timer=null;saveState();clearInterval(timerHandle);timerHandle=null;renderWorkout();}
function tickTimer(){if(!state.timer)return;const left=Math.max(0,Math.ceil((state.timer.end-Date.now())/1000)),el=document.querySelector('#timerValue');if(el)el.textContent=`${Math.floor(left/60)}:${String(left%60).padStart(2,'0')}`;if(left<=0){stopTimer();toast('Pause ferdig');}}
function finishWorkout(){if(!state.active)return;const any=state.active.exercises.some(e=>e.sets.some(s=>s.completed||Number(s.reps)>0));if(!any)return toast('Registrer minst ett sett først');const done=clone(state.active);done.finishedAt=new Date().toISOString();const p=state.profiles.find(x=>x.id===done.profileId)||profile();p.sessions.unshift(done);state.active=null;state.timer=null;saveState();toast('Økten er lagret');setTab('history');}

function renderProfileBar(){const sel=document.querySelector('#profileSelect');sel.innerHTML=state.profiles.map(p=>`<option value="${p.id}" ${p.id===state.currentProfileId?'selected':''}>${esc(p.name)}</option>`).join('');sel.onchange=e=>{if(state.active&&state.active.profileId!==e.target.value&&!confirm('Det pågår en økt på en annen profil. Bytte profil likevel?')){e.target.value=state.currentProfileId;return;}state.currentProfileId=e.target.value;saveState();renderAll();};}
function renderPrograms(){const el=document.querySelector('#programs'),p=profile();el.innerHTML=`<div class="card hero"><div><span class="eyebrow">${esc(p.name)}</span><h2>Treningsprogram</h2><p class="muted small">Start en økt, rediger programmet eller legg inn valgfrie/alternative øvelser.</p></div><button class="ghost compact" id="newProgram">+ Nytt program</button></div>${p.programs.map(pr=>`<div class="card program-card"><div class="row wrap"><div><h3>${esc(pr.name)}</h3><div class="muted small">${pr.exercises.length} øvelser</div></div><div class="actions"><button class="ghost compact" data-edit-program="${pr.id}">Rediger</button><button class="primary compact" data-start="${pr.id}">Start</button></div></div><p class="muted small">${esc(pr.notes)}</p>${pr.exercises.map(e=>`<div class="exercise"><div class="exercise-title">${esc(e.name)} ${e.optional?'<span class="tag">Valgfri</span>':''}</div><div class="meta">${e.targetSets} × ${esc(e.targetReps||'–')}${e.tempo?` · Tempo ${esc(e.tempo)}`:''}${e.notes?` · ${esc(e.notes)}`:''}${e.alternatives?.length?` · Alt: ${esc(e.alternatives.join(' / '))}`:''}</div><div class="last">${lastSummary(e.name)?`Sist: ${esc(lastSummary(e.name))}`:'Ingen tidligere logg'}</div></div>`).join('')}</div>`).join('')}`;
  el.querySelectorAll('[data-start]').forEach(b=>b.onclick=()=>startWorkout(b.dataset.start));el.querySelectorAll('[data-edit-program]').forEach(b=>b.onclick=()=>openProgramEditor(b.dataset.editProgram));el.querySelector('#newProgram').onclick=()=>openProgramEditor(null);
}
function openProgramEditor(programId){const p=profile(),pr=programId?p.programs.find(x=>x.id===programId):{id:uid(),name:'Nytt program',notes:'',exercises:[]};const m=document.querySelector('#modal'),b=document.querySelector('#modalBody');b.innerHTML=`<h3>Rediger program</h3><div class="stack"><label>Navn<input id="peName" value="${esc(pr.name)}"></label><label>Notat<textarea id="peNotes">${esc(pr.notes||'')}</textarea></label><div id="peExercises"></div><button type="button" class="ghost" id="peAdd">+ Legg til øvelse</button><div class="grid2"><button value="cancel" class="ghost">Avbryt</button><button type="button" class="primary" id="peSave">Lagre</button></div>${programId?'<button type="button" class="danger" id="peDelete">Slett program</button>':''}</div>`;m.showModal();const rows=b.querySelector('#peExercises');let draft=clone(pr.exercises||[]);function draw(){rows.innerHTML=draft.map((e,i)=>`<div class="editor-row"><div class="row"><strong>${i+1}. ${esc(e.name||'Ny øvelse')}</strong><button type="button" class="text-danger" data-rm="${i}">Fjern</button></div><label>Øvelse<input data-i="${i}" data-k="name" value="${esc(e.name||'')}"></label><div class="grid3"><label>Sett<input type="number" min="1" data-i="${i}" data-k="targetSets" value="${e.targetSets||3}"></label><label>Reps<input data-i="${i}" data-k="targetReps" value="${esc(e.targetReps||'')}"></label><label>Pause<input type="number" min="0" data-i="${i}" data-k="restSeconds" value="${e.restSeconds??120}"></label></div><div class="grid2"><label>Tempo<input data-i="${i}" data-k="tempo" value="${esc(e.tempo||'')}"></label><label>RIR / notat<input data-i="${i}" data-k="notes" value="${esc(e.notes||'')}"></label></div><label>Alternative øvelser <span class="muted small">(kommaseparert)</span><input data-i="${i}" data-k="alternativesText" value="${esc((e.alternatives||[]).join(', '))}"></label><label class="toggle-row"><input type="checkbox" data-i="${i}" data-k="optional" ${e.optional?'checked':''}><span>Valgfri øvelse</span></label></div>`).join('');rows.querySelectorAll('input').forEach(inp=>inp.oninput=()=>{const i=+inp.dataset.i,k=inp.dataset.k;if(!k)return;if(k==='optional')draft[i][k]=inp.checked;else if(k==='targetSets'||k==='restSeconds')draft[i][k]=Number(inp.value)||0;else if(k==='alternativesText')draft[i].alternatives=inp.value.split(',').map(x=>x.trim()).filter(Boolean);else draft[i][k]=inp.value;});rows.querySelectorAll('[data-rm]').forEach(x=>x.onclick=()=>{draft.splice(+x.dataset.rm,1);draw();});}
  draw();b.querySelector('#peAdd').onclick=()=>{draft.push({id:uid(),name:'',targetSets:3,targetReps:'8–12',tempo:'',restSeconds:120,notes:'',optional:false,alternatives:[]});draw();};b.querySelector('#peSave').onclick=()=>{const saved={id:pr.id,name:b.querySelector('#peName').value.trim()||'Program',notes:b.querySelector('#peNotes').value.trim(),exercises:draft.filter(e=>e.name.trim()).map(e=>({...e,id:e.id||uid()}))};const idx=p.programs.findIndex(x=>x.id===pr.id);if(idx>=0)p.programs[idx]=saved;else p.programs.push(saved);saveState();m.close();renderAll();toast('Program lagret');};if(programId)b.querySelector('#peDelete').onclick=()=>{if(confirm('Slette programmet? Historikken påvirkes ikke.')){p.programs=p.programs.filter(x=>x.id!==programId);saveState();m.close();renderAll();}};
}
function renderWorkout(){const el=document.querySelector('#workout');if(!state.active){el.innerHTML=`<div class="card empty"><h2>Ingen aktiv økt</h2><p>Velg et program og trykk Start.</p><button class="primary" id="goPrograms">Velg program</button></div>`;el.querySelector('#goPrograms').onclick=()=>setTab('programs');return;}const a=state.active,owner=state.profiles.find(x=>x.id===a.profileId);const timer=state.timer?`<div class="timer"><div><div class="small">Hviletimer</div><strong id="timerValue">–</strong></div><button class="ghost compact" id="stopTimer">Stopp</button></div>`:'';el.innerHTML=`${timer}<div class="card hero"><div><span class="eyebrow">${esc(owner?.name||'')}</span><h2>${esc(a.name)}</h2><div class="muted small">Startet ${fmtDate(a.startedAt)}</div></div><div class="right"><div class="muted small">Volum</div><strong id="workoutVolume">${Math.round(volume(a)).toLocaleString('nb-NO')} kg</strong></div></div>${a.exercises.map(e=>{const sug=progressionSuggestion(e),alts=e.alternatives||[];return`<div class="card"><div class="row wrap"><div><h3>${esc(e.name)}</h3><div class="meta">${esc(e.targetReps||'')}${e.tempo?` · Tempo ${esc(e.tempo)}`:''}${e.notes?` · ${esc(e.notes)}`:''}</div></div><button class="text-danger" data-remove="${e.id}">Fjern</button></div>${alts.length?`<label class="variant">Variant<select data-variant="${e.id}"><option>${esc(e.name)}</option>${alts.map(x=>`<option>${esc(x)}</option>`).join('')}</select></label>`:''}${lastSummary(e.originalName||e.name)?`<div class="last highlight">Sist: ${esc(lastSummary(e.originalName||e.name))}</div>`:''}${sug?`<div class="suggestion"><strong>${esc(sug.title)}</strong><br>${esc(sug.detail)}</div>`:''}<div class="set-head"><span>#</span><span>kg</span><span>reps</span><span>RIR</span><span>✓</span></div>${e.sets.map((s,i)=>`<div class="set-row"><span>${i+1}</span><input inputmode="decimal" data-e="${e.id}" data-s="${s.id}" data-k="weight" value="${esc(s.weight)}"><input inputmode="numeric" data-e="${e.id}" data-s="${s.id}" data-k="reps" value="${esc(s.reps)}"><input inputmode="decimal" data-e="${e.id}" data-s="${s.id}" data-k="rir" value="${esc(s.rir)}"><button class="check ${s.completed?'done':''}" data-check-e="${e.id}" data-check-s="${s.id}">${s.completed?'✓':'○'}</button></div>`).join('')}<button class="ghost compact" data-addset="${e.id}">+ Sett</button></div>`}).join('')}<div class="card"><button class="ghost" id="addExercise">+ Engangsøvelse</button><label>Øktnotat<textarea id="workoutNotes" placeholder="Hvordan føltes økten?">${esc(a.notes||'')}</textarea></label><div class="grid2"><button class="danger" id="cancelWorkout">Avbryt</button><button class="primary" id="finishWorkout">Lagre økt</button></div></div>`;
  el.querySelectorAll('input[data-e]').forEach(inp=>inp.oninput=()=>updateSet(inp.dataset.e,inp.dataset.s,inp.dataset.k,inp.value));el.querySelectorAll('[data-check-e]').forEach(x=>x.onclick=()=>toggleSet(x.dataset.checkE,x.dataset.checkS));el.querySelectorAll('[data-addset]').forEach(x=>x.onclick=()=>addSet(x.dataset.addset));el.querySelectorAll('[data-remove]').forEach(x=>x.onclick=()=>{if(confirm('Fjerne øvelsen fra dagens økt?'))removeExercise(x.dataset.remove);});el.querySelectorAll('[data-variant]').forEach(sel=>sel.onchange=()=>{const e=a.exercises.find(x=>x.id===sel.dataset.variant);e.name=sel.value;saveState();renderWorkout();});el.querySelector('#addExercise').onclick=openAddExercise;el.querySelector('#workoutNotes').oninput=e=>{a.notes=e.target.value;saveState();};el.querySelector('#cancelWorkout').onclick=()=>{if(confirm('Avbryte økten? Registreringene i denne økten slettes.')){state.active=null;state.timer=null;saveState();renderAll();}};el.querySelector('#finishWorkout').onclick=finishWorkout;if(state.timer){el.querySelector('#stopTimer').onclick=stopTimer;tickTimer();}}
function updateWorkoutSummary(){const el=document.querySelector('#workoutVolume');if(el&&state.active)el.textContent=`${Math.round(volume(state.active)).toLocaleString('nb-NO')} kg`;}
function openAddExercise(){const m=document.querySelector('#modal'),b=document.querySelector('#modalBody');b.innerHTML=`<h3>Engangsøvelse</h3><p class="muted small">Legges bare til i dagens økt og endrer ikke programmalen.</p><div class="stack"><label>Navn<input id="xName" placeholder="F.eks. Face pull"></label><div class="grid2"><label>Sett<input id="xSets" type="number" min="1" value="3"></label><label>Reps<input id="xReps" value="8–12"></label></div><div class="grid2"><label>Tempo<input id="xTempo"></label><label>Pause (sek)<input id="xRest" type="number" min="0" value="120"></label></div><label>RIR / notat<input id="xNotes" value="RIR 1–2"></label><div class="grid2"><button value="cancel" class="ghost">Avbryt</button><button type="button" class="primary" id="saveExtra">Legg til</button></div></div>`;m.showModal();b.querySelector('#saveExtra').onclick=()=>{const name=b.querySelector('#xName').value.trim();if(!name)return toast('Skriv navn på øvelsen');const n=Math.max(1,+b.querySelector('#xSets').value||3);state.active.exercises.push({id:uid(),name,originalName:name,targetReps:b.querySelector('#xReps').value.trim(),tempo:b.querySelector('#xTempo').value.trim(),restSeconds:Math.max(0,+b.querySelector('#xRest').value||0),notes:b.querySelector('#xNotes').value.trim(),alternatives:[],sets:Array.from({length:n},()=>({id:uid(),weight:'',reps:'',rir:'',completed:false}))});saveState();m.close();renderWorkout();};}

function renderHistory(){const el=document.querySelector('#history'),sessions=profile().sessions;if(!sessions.length){el.innerHTML=`<div class="card empty"><h2>Ingen historikk for ${esc(profile().name)}</h2><p>Fullfør en økt, så vises den her.</p></div>`;return;}el.innerHTML=`<div class="card hero"><div><span class="eyebrow">${esc(profile().name)}</span><h2>Historikk</h2><p class="muted small">${sessions.length} lagrede økter</p></div></div>${sessions.map((s,si)=>`<div class="card"><div class="row wrap"><div><h3>${esc(s.name)}</h3><div class="muted small">${fmtDate(s.finishedAt||s.startedAt)}</div></div><div class="right"><div class="muted small">Volum</div><strong>${Math.round(volume(s)).toLocaleString('nb-NO')} kg</strong></div></div>${(s.exercises||[]).map(e=>`<div class="exercise"><div class="exercise-title">${esc(e.name)}</div>${(e.sets||[]).filter(x=>x.completed||x.reps).map((x,i)=>`<div class="history-set">Sett ${i+1}: ${x.weight||0} kg × ${x.reps||0}${x.rir!==''&&x.rir!=null?` · RIR ${x.rir}`:''}</div>`).join('')}</div>`).join('')}${s.notes?`<p class="muted small note-box">${esc(s.notes)}</p>`:''}<button class="text-danger" data-del-session="${si}">Slett økt</button></div>`).join('')}`;el.querySelectorAll('[data-del-session]').forEach(b=>b.onclick=()=>{if(confirm('Slette denne økten permanent?')){sessions.splice(+b.dataset.delSession,1);saveState();renderHistory();renderProgress();}});}
function personalRecords(){const best=new Map();for(const s of profile().sessions)for(const e of s.exercises||[])for(const set of e.sets||[]){const v=oneRM(+set.weight,+set.reps);if(!v)continue;const key=normalizedName(e.name),cur=best.get(key);if(!cur||v>cur.e1rm)best.set(key,{name:e.name,weight:+set.weight,reps:+set.reps,e1rm:v,date:s.finishedAt||s.startedAt});}return[...best.values()].sort((a,b)=>a.name.localeCompare(b.name,'nb'));}
function seriesFor(name){const key=normalizedName(name),arr=[];for(const s of [...profile().sessions].reverse()){const e=(s.exercises||[]).find(x=>normalizedName(x.name)===key);if(!e)continue;let best=0;for(const set of e.sets||[])best=Math.max(best,oneRM(+set.weight,+set.reps));if(best)arr.push({date:s.finishedAt||s.startedAt,value:best});}return arr;}
function svgChart(data){if(data.length<2)return`<div class="muted small">Trenger minst to registrerte økter for graf.</div>`;const w=600,h=170,p=24,min=Math.min(...data.map(d=>d.value)),max=Math.max(...data.map(d=>d.value)),span=Math.max(1,max-min),coords=data.map((d,i)=>[p+i*(w-2*p)/(data.length-1),h-p-(d.value-min)*(h-2*p)/span]);const pts=coords.map(x=>x.join(',')).join(' ');return`<svg class="chart" viewBox="0 0 ${w} ${h}"><line x1="${p}" y1="${h-p}" x2="${w-p}" y2="${h-p}" stroke="currentColor" opacity=".2"/><polyline points="${pts}" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>${coords.map((x,i)=>`<circle cx="${x[0]}" cy="${x[1]}" r="5" fill="currentColor"><title>${data[i].value.toFixed(1)} kg e1RM</title></circle>`).join('')}</svg><div class="row small muted"><span>${data[0].value.toFixed(1)} kg</span><span>${data.at(-1).value.toFixed(1)} kg e1RM</span></div>`;}
function renderProgress(){const el=document.querySelector('#progress'),prs=personalRecords();if(!prs.length){el.innerHTML=`<div class="card empty"><h2>Ingen progresjonsdata ennå</h2><p>Logg økter med vekt og reps for å få PR-er og grafer.</p></div>`;return;}const names=[...new Set(prs.map(p=>p.name))],selected=el.dataset.selected&&names.includes(el.dataset.selected)?el.dataset.selected:names[0];el.dataset.selected=selected;el.innerHTML=`<div class="card"><span class="eyebrow">${esc(profile().name)}</span><h2>Progresjon</h2><label>Øvelse<select id="progressExercise">${names.map(n=>`<option ${n===selected?'selected':''}>${esc(n)}</option>`).join('')}</select></label><div style="margin-top:12px">${svgChart(seriesFor(selected))}</div></div><div class="card"><h3>Personlige rekorder</h3>${prs.map(p=>`<div class="exercise"><div class="row"><div><strong>${esc(p.name)}</strong><div class="muted small">${fmtDate(p.date)}</div></div><div class="right"><strong>${fmtW(p.weight)} kg × ${p.reps}</strong><div class="muted small">e1RM ${p.e1rm.toFixed(1).replace('.',',')} kg</div></div></div></div>`).join('')}</div>`;el.querySelector('#progressExercise').onchange=e=>{el.dataset.selected=e.target.value;renderProgress();};}

function exportData(){const blob=new Blob([JSON.stringify({...state,exportedAt:new Date().toISOString(),format:'treningslogg-pwa-v2'},null,2)],{type:'application/json'}),a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=`treningslogg-backup-${new Date().toISOString().slice(0,10)}.json`;a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1000);}
function importData(ev){const f=ev.target.files?.[0];if(!f)return;const r=new FileReader();r.onload=()=>{try{const s=JSON.parse(r.result);let incoming;if(s.version>=2&&Array.isArray(s.profiles))incoming=s;else if(Array.isArray(s.sessions)&&Array.isArray(s.programs))incoming=migrateLegacy(s);else throw new Error();incoming=normalizeProfileNames(incoming);if(!confirm('Importere backup og erstatte dataene i denne installasjonen?'))return;state=incoming;state.timer=null;saveState();renderAll();toast('Backup importert');}catch(e){alert('Kunne ikke lese backup-filen.');}};r.readAsText(f);}
async function renderSettings(){
  const el=document.querySelector('#settings'),cfg=loadCloudConfig();let user=null;if(cloudClient&&cloudReady)user=await currentCloudUser();
  const cloudCard=!cloudConfigured()?`<div class="card"><span class="eyebrow">Nyhet i v${APP_VERSION}</span><h2>Skylagring og synk</h2><p class="muted small">Koble appen til et gratis Supabase-prosjekt. Lim inn <strong>Project URL</strong> og <strong>anon/publishable key</strong> fra Supabase. Bruk aldri service_role-nøkkelen.</p><div class="stack"><label>Supabase Project URL<input id="cloudUrl" placeholder="https://xxxx.supabase.co" value="${esc(cfg.url||'')}"></label><label>Anon / publishable key<input id="cloudKey" type="password" placeholder="sb_publishable_… eller anon key" value="${esc(cfg.key||'')}"></label><button class="primary" id="saveCloudConfig">Lagre skyoppsett</button></div></div>`:
  !user?`<div class="card"><span class="eyebrow">Skylagring</span><h2>Logg inn</h2><p class="muted small">Håvard og Stine lager hver sin Supabase-bruker. Etterpå kobles begge til samme treningskonto med en delingskode.</p><div class="stack"><label>E-post<input id="cloudEmail" type="email" autocomplete="email"></label><label>Passord<input id="cloudPassword" type="password" autocomplete="current-password" minlength="6"></label><div class="grid2"><button class="ghost" id="cloudRegister">Opprett bruker</button><button class="primary" id="cloudLogin">Logg inn</button></div><button class="text-danger" id="clearCloudConfig">Endre Supabase-oppsett</button></div></div>`:
  !cloudMeta.householdId?`<div class="card"><span class="eyebrow">Innlogget</span><h2>${esc(user.email||'Supabase-bruker')}</h2><p class="muted small">På Håvard sin telefon: opprett den delte treningskontoen. På Stine sin telefon: skriv inn delingskoden Håvard får.</p><div class="stack"><button class="primary" id="createHousehold">Opprett delt treningskonto</button><div class="divider">eller</div><label>Delingskode<input id="joinCode" autocomplete="off" autocapitalize="characters" placeholder="F.eks. A1B2C3D4E5F6"></label><button class="ghost" id="joinHousehold">Koble til eksisterende konto</button><button class="text-danger" id="cloudLogout">Logg ut</button></div></div>`:
  `<div class="card"><span class="eyebrow">Skysynk aktiv</span><h2>${esc(user.email||'Innlogget')}</h2><div class="cloud-ok">✓ Håvard og Stine kan synkronisere samme data</div><p class="muted small">Delingskode: <strong class="code">${esc(cloudMeta.inviteCode||'—')}</strong></p><label>Denne telefonen brukes primært av<select id="deviceProfile">${state.profiles.map(p=>`<option value="${p.id}" ${cloudMeta.deviceProfileId===p.id?'selected':''}>${esc(p.name)}</option>`).join('')}</select></label><div class="stack" style="margin-top:10px"><button class="primary" id="syncNow">Synkroniser nå</button><div id="cloudStatus" class="muted small"></div><button class="text-danger" id="cloudLogout">Logg ut av skyen</button></div></div>`;
  el.innerHTML=`${cloudCard}<div class="card"><h2>Backup og data</h2><p class="muted small"><strong>Behold fortsatt lokale backups.</strong> Skylagring synkroniserer program og fullførte økter mellom telefonene, mens en JSON-backup er ekstra sikkerhet.</p><div class="stack"><button class="primary" id="exportBtn">Eksporter full backup</button><label class="file-label">Importer backup<input type="file" id="importFile" accept="application/json,.json"></label></div></div><div class="card"><h3>Profiler</h3><p class="muted small">Begge profiler og all fullført historikk deles når skysynk er aktiv. Pågående økt lagres lokalt på telefonen til den fullføres.</p>${state.profiles.map(p=>`<label>Profilnavn<input data-profile-name="${p.id}" value="${esc(p.name)}"></label>`).join('')}</div><div class="card"><h3>App</h3><p class="muted small">Treningslogg v${APP_VERSION} · offline PWA · Supabase-skysynk · redigerbare programmer · valgfrie øvelser.</p></div>`;
  el.querySelector('#exportBtn').onclick=exportData;el.querySelector('#importFile').onchange=importData;el.querySelectorAll('[data-profile-name]').forEach(x=>x.onchange=()=>{const p=state.profiles.find(p=>p.id===x.dataset.profileName);if(p&&x.value.trim()){p.name=x.value.trim();saveState();renderAll();}});
  const saveCfg=el.querySelector('#saveCloudConfig');if(saveCfg)saveCfg.onclick=()=>{const url=el.querySelector('#cloudUrl').value.trim().replace(/\/$/,'');const key=el.querySelector('#cloudKey').value.trim();if(!/^https:\/\/.+\.supabase\.co$/i.test(url)||!key)return toast('Kontroller URL og nøkkel');saveCloudConfig({url,key});location.reload();};
  const clearCfg=el.querySelector('#clearCloudConfig');if(clearCfg)clearCfg.onclick=()=>{if(confirm('Fjerne Supabase-oppsettet fra denne telefonen? Lokale treningsdata beholdes.')){localStorage.removeItem(CLOUD_CONFIG_KEY);cloudMeta={deviceProfileId:cloudMeta.deviceProfileId};saveCloudMeta();location.reload();}};
  const reg=el.querySelector('#cloudRegister');if(reg)reg.onclick=async()=>{try{const email=el.querySelector('#cloudEmail').value.trim(),pw=el.querySelector('#cloudPassword').value;if(!email||pw.length<6)return toast('E-post og minst 6 tegn i passord');const d=await cloudSignUp(email,pw);if(d.session){cloudReady=true;await resolveCloudHousehold();renderAll();toast('Bruker opprettet');}else toast('Bruker opprettet – bekreft e-posten først');}catch(e){alert(e.message||'Kunne ikke opprette bruker');}};
  const login=el.querySelector('#cloudLogin');if(login)login.onclick=async()=>{try{await cloudSignIn(el.querySelector('#cloudEmail').value.trim(),el.querySelector('#cloudPassword').value);renderAll();toast('Innlogget');}catch(e){alert(e.message||'Kunne ikke logge inn');}};
  const create=el.querySelector('#createHousehold');if(create)create.onclick=async()=>{try{await createCloudHousehold();toast('Delt treningskonto opprettet');}catch(e){alert(e.message||'Kunne ikke opprette delt konto');}};
  const join=el.querySelector('#joinHousehold');if(join)join.onclick=async()=>{const code=el.querySelector('#joinCode').value.trim();if(!code)return toast('Skriv inn delingskoden');if(!confirm('Ved tilkobling hentes den delte treningskontoen fra skyen. Lokale profil/programdata på denne telefonen erstattes. Fortsette?'))return;try{await joinCloudHousehold(code);toast('Koblet til delt treningskonto');}catch(e){alert(e.message||'Ugyldig delingskode');}};
  const sync=el.querySelector('#syncNow');if(sync)sync.onclick=()=>pullCloud(true);
  const logout=el.querySelector('#cloudLogout');if(logout)logout.onclick=()=>cloudSignOut();
  const dp=el.querySelector('#deviceProfile');if(dp)dp.onchange=()=>{cloudMeta.deviceProfileId=dp.value;state.currentProfileId=dp.value;saveCloudMeta();saveState();renderAll();};renderCloudStatus();
}
function renderAll(){renderProfileBar();renderPrograms();renderWorkout();renderHistory();renderProgress();renderSettings();const count=profile().sessions.length;const cloud=cloudReady&&cloudMeta.householdId?' · ☁︎ synk':' ';document.querySelector('#statusLine').textContent=state.active?`Pågående: ${state.active.name}`:`${profile().name} · ${count} lagrede økter${cloud}`;}
function installHelp(){const m=document.querySelector('#modal'),b=document.querySelector('#modalBody');b.innerHTML=`<h3>Installer på iPhone</h3><ol class="install-steps"><li>Åpne siden i <strong>Safari</strong>.</li><li>Trykk <strong>Del</strong>.</li><li>Velg <strong>Legg til på Hjem-skjerm</strong>.</li><li>Trykk <strong>Legg til</strong>.</li></ol><p class="muted small">Ved oppdatering på samme nettadresse beholdes localStorage-data. Ta likevel backup først.</p><button value="cancel" class="primary" style="width:100%">Lukk</button>`;m.showModal();}

document.querySelectorAll('.tab').forEach(b=>b.addEventListener('click',()=>setTab(b.dataset.tab)));document.querySelector('#installHelpBtn').addEventListener('click',installHelp);if('serviceWorker' in navigator)window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js').catch(()=>{}));renderAll();initCloud().then(()=>renderAll());
