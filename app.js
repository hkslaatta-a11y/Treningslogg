const STORAGE_KEY='treningslogg-pwa-v1';
const APP_VERSION='2.7.1';
const SHOW_SPLASH_KEY='treningslogg-show-splash-v1';
const THEME_KEY='treningslogg-theme-v1';
const CLOUD_CONFIG_KEY='treningslogg-cloud-config-v1';
const CLOUD_META_KEY='treningslogg-cloud-meta-v1';
const DEFAULT_CLOUD_CONFIG={
  url:'https://ybzvccszcmijkppowlmv.supabase.co',
  key:'sb_publishable_1VUkyD3k08qPFynmH3fB3Q_iA8ljk3b'
};
let recoveryMode=/(?:^|[?#&])type=recovery(?:&|$)/i.test(location.href);
let recoveryPromptShown=false;

const mePrograms=[
  {name:'Full Body A',notes:'Lavere beinvolum. Behold full ROM, kontrollert tempo og 1–2 RIR på hovedøvelsene.',exercises:[
    ['Dype Smith-knebøy',2,'8–12','3–1–1–0',180,'RIR 1–2',false,[]],
    ['Smith benkpress',3,'8–12','3–0–1–0',180,'RIR 1–2',false,[]],
    ['Pull-ups',3,'6–10','2–1–1–1',180,'RIR 1–2',false,[]],
    ['RDL',2,'8–10','3–0–1–0',180,'RIR 1–2',false,[]],
    ['Sidehev',2,'10–15','2–0–1–1',120,'RIR 0–1',false,[]],
    ['Sittende incline DB curl',2,'10–15','3–1–1–1',120,'RIR 0–1',false,[]],
    ['Enarms cable triceps extension',2,'10–15','3–1–1–1',120,'RIR 0–1',false,[]],
    ['Cable crunch',3,'8–12','3–1–1–1',120,'RIR 0–1',false,[]],
    ['Leg extension',2,'12–15','3–0–1–1',120,'Valgfri · 1–2 sett etter behov · RIR 0–1',true,[]],
    ['Rear-delt cable fly',2,'12–20','2–1–1–1',90,'Valgfri · RIR 0–1',true,[]]
  ]},
  {name:'Full Body B',notes:'Lavere beinvolum. Unilateral beintrening begrenses til to kvalitetssett med full ROM.',exercises:[
    ['Bulgarian split squat – front foot elevated',2,'8–10','3–1–1–0',180,'RIR 1–2',false,[]],
    ['Incline Smith press',3,'8–12','3–0–1–0',180,'RIR 1–2',false,[]],
    ['Horizontal pull-ups',3,'8–12','3–1–1–1',150,'RIR 1–2',false,['Chest-supported row']],
    ['DB shoulder press',3,'8–12','3–0–1–0',150,'RIR 1–2',false,[]],
    ['Leg curl',2,'10–15','3–1–1–1',120,'RIR 0–1',false,[]],
    ['Hanging leg raise',3,'8–12','3–1–2–1',120,'RIR 0–1 · avslutt med bekkenrull',false,[]],
    ['RDL',2,'8–12','3–0–1–0',180,'Valgfri · 1–2 sett etter behov · RIR 1–2',true,[]],
    ['Leg extension',2,'12–15','3–0–1–1',120,'Valgfri · 1–2 sett etter behov · RIR 0–1',true,[]]
  ]},
  {name:'Full Body C',notes:'Lavere beinvolum og mer øvre rygg. Utfall er flyttet til valgfritt tillegg.',exercises:[
    ['Dype Smith-knebøy',2,'10–15','3–1–1–0',180,'RIR 1–2',false,[]],
    ['Chin-ups',3,'6–10','2–1–1–1',180,'RIR 1–2',false,[]],
    ['Weighted dips',3,'6–10','3–1–1–0',180,'RIR 1–2',false,[]],
    ['Chest-supported row',2,'8–12','3–1–1–1',150,'RIR 1–2',false,['Horizontal pull-ups']],
    ['Sidehev',2,'10–15','2–0–1–1',120,'RIR 0–1',false,[]],
    ['Cable flyes',2,'8–12','3–1–1–1',120,'RIR 0–1',false,[]],
    ['Cable hammer curl',2,'10–15','3–0–1–1',120,'RIR 0–1',false,[]],
    ['Ab wheel rollout',3,'6–12','3–1–1–0',120,'RIR 0–1',false,['Stående ab-wheel partials']],
    ['Utfall fra boks',2,'8–12/ben','3–1–1–0',180,'Valgfri · 1–2 sett etter behov · RIR 1–2',true,[]],
    ['Rear-delt cable fly',2,'12–20','2–1–1–1',90,'Valgfri · RIR 0–1',true,[]]
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

const BODYWEIGHT_KEYWORDS=['pull-up','pullup','chin-up','chinup','chins','dips','push-up','pushup','horizontal pull','inverted row','hanging leg raise','ab wheel','ab-wheel','pike push','hspu','trx crunch','bensenk','sideplanke','crunch i slynge'];
function isBodyweightExercise(nameOrExercise){const e=typeof nameOrExercise==='object'?nameOrExercise:null;if(e&&typeof e.bodyweight==='boolean')return e.bodyweight;const n=normalizedName(e?.name||nameOrExercise||'');return BODYWEIGHT_KEYWORDS.some(k=>n.includes(k));}
function inferredLoadType(st,e){if(!isBodyweightExercise(e))return 'kg';if(st?.loadType)return st.loadType;const w=num(st?.weight);if(w===1||w===0)return 'bw';return w>1?'bw_plus':'bw';}
function normalizeBodyweightData(s){if(!s?.profiles)return s;for(const p of s.profiles||[]){for(const pr of p.programs||[]){for(const e of pr.exercises||[]){if(typeof e.bodyweight!=='boolean')e.bodyweight=isBodyweightExercise(e.name);}}for(const sess of p.sessions||[]){for(const e of sess.exercises||[]){if(typeof e.bodyweight!=='boolean')e.bodyweight=isBodyweightExercise(e.name);for(const st of e.sets||[]){if(isBodyweightExercise(e)&&!st.loadType){const w=num(st.weight);st.loadType=(w===1||w===0)?'bw':'bw_plus';if(st.loadType==='bw')st.weight='';}}}}}if(s.active){for(const e of s.active.exercises||[]){if(typeof e.bodyweight!=='boolean')e.bodyweight=isBodyweightExercise(e.name);for(const st of e.sets||[]){if(isBodyweightExercise(e)&&!st.loadType){const w=num(st.weight);st.loadType=(w===1||w===0)?'bw':'bw_plus';if(st.loadType==='bw')st.weight='';}}}}return s;}
function newSetForExercise(e,completed=false){const bw=isBodyweightExercise(e),weighted=/weighted/i.test(e?.name||'');return{id:uid(),weight:'',reps:'',rir:'',completed,loadType:bw?(weighted?'bw_plus':'bw'):'kg'};}
function loadLabel(st,e){const t=inferredLoadType(st,e),w=num(st?.weight);if(t==='bw')return 'KV';if(t==='bw_plus')return `+${fmtW(w)} kg`;if(t==='bw_assist')return `−${fmtW(w)} kg`;return `${fmtW(w)} kg`;}
function loadRank(st,e){const t=inferredLoadType(st,e),w=num(st?.weight);if(t==='bw_assist')return -w;if(t==='bw_plus')return w;if(t==='bw')return 0;return w;}
function setExternalVolume(st,e){if(isBodyweightExercise(e))return 0;return num(st?.weight)*num(st?.reps);}

function makePrograms(raw,prefix){return raw.map((p,pi)=>({id:`${prefix}p${pi}`,name:p.name,notes:p.notes||'',exercises:p.exercises.map((e,ei)=>({id:`${prefix}p${pi}e${ei}`,name:e[0],targetSets:e[1],targetReps:e[2],tempo:e[3],restSeconds:e[4],notes:e[5],optional:!!e[6],alternatives:e[7]||[],bodyweight:isBodyweightExercise(e[0])}))}));}
function bankExerciseFromProgram(e){const bw=typeof e.bodyweight==='boolean'?e.bodyweight:isBodyweightExercise(e.name);return{id:uid(),name:e.name||'Øvelse',targetSets:Number(e.targetSets)||3,targetReps:e.targetReps||'8–12',tempo:e.tempo||'',restSeconds:e.restSeconds??120,notes:e.notes||'',bodyweight:bw,muscleGroup:e.muscleGroup||inferMuscleGroup(e.name),equipment:e.equipment||inferEquipment(e.name,bw),alternatives:clone(e.alternatives||[])};}
function defaultExerciseBank(){const out=[],seen=new Set();const add=e=>{const key=normalizedName(e.name);if(!key||seen.has(key))return;seen.add(key);out.push(bankExerciseFromProgram(e));};for(const pr of [...makePrograms(mePrograms,'bm'),...makePrograms(partnerPrograms,'bd')])for(const e of pr.exercises){add(e);for(const alt of e.alternatives||[]){const bw=isBodyweightExercise(alt);add({...e,name:alt,alternatives:[],bodyweight:bw,muscleGroup:inferMuscleGroup(alt),equipment:inferEquipment(alt,bw)});}}return out.sort((a,b)=>a.name.localeCompare(b.name,'nb'));}
function ensureExerciseBank(s){if(!s)return s;if(!Array.isArray(s.exerciseBank))s.exerciseBank=[];const seen=new Set(s.exerciseBank.map(e=>normalizedName(e.name)));for(const p of s.profiles||[])for(const pr of p.programs||[])for(const e of pr.exercises||[]){const key=normalizedName(e.name);if(key&&!seen.has(key)){s.exerciseBank.push(bankExerciseFromProgram(e));seen.add(key);}for(const alt of e.alternatives||[]){const ak=normalizedName(alt);if(ak&&!seen.has(ak)){{const bw=isBodyweightExercise(alt);s.exerciseBank.push(bankExerciseFromProgram({...e,name:alt,alternatives:[],bodyweight:bw,muscleGroup:inferMuscleGroup(alt),equipment:inferEquipment(alt,bw)}));seen.add(ak);}}}}s.exerciseBank=s.exerciseBank.filter(e=>e&&String(e.name||'').trim()).map(e=>({...e,id:e.id||uid(),targetSets:Number(e.targetSets)||3,targetReps:e.targetReps||'8–12',tempo:e.tempo||'',restSeconds:e.restSeconds??120,notes:e.notes||'',bodyweight:typeof e.bodyweight==='boolean'?e.bodyweight:isBodyweightExercise(e.name),muscleGroup:e.muscleGroup||inferMuscleGroup(e.name),equipment:e.equipment||inferEquipment(e.name,typeof e.bodyweight==='boolean'?e.bodyweight:isBodyweightExercise(e.name)),alternatives:e.alternatives||[]})).sort((a,b)=>a.name.localeCompare(b.name,'nb'));return s;}
function addOrUpdateBankExercise(e){if(!e?.name?.trim())return;ensureExerciseBank(state);const key=normalizedName(e.name),idx=state.exerciseBank.findIndex(x=>normalizedName(x.name)===key),item=bankExerciseFromProgram(e);if(idx>=0){item.id=state.exerciseBank[idx].id;state.exerciseBank[idx]={...state.exerciseBank[idx],...item};}else state.exerciseBank.push(item);state.exerciseBank.sort((a,b)=>a.name.localeCompare(b.name,'nb'));}
function freshState(){const s={version:2,currentProfileId:'me',profiles:[
  {id:'me',name:'Håvard',programs:makePrograms(mePrograms,'m'),sessions:[]},
  {id:'partner',name:'Stine',programs:makePrograms(partnerPrograms,'d'),sessions:[]}
],exerciseBank:defaultExerciseBank(),active:null,timer:null};return s;}
function uid(){return crypto.randomUUID?crypto.randomUUID():Date.now().toString(36)+Math.random().toString(36).slice(2);}
function clone(x){return structuredClone?structuredClone(x):JSON.parse(JSON.stringify(x));}
function migrateLegacy(s){
  const n=freshState(),me=n.profiles[0];
  if(Array.isArray(s.programs)&&s.programs.length) me.programs=s.programs.map((p,pi)=>({id:p.id||`legacy-p${pi}`,name:p.name||`Program ${pi+1}`,notes:p.notes||'',exercises:(p.exercises||[]).map((e,ei)=>({id:e.id||`legacy-p${pi}e${ei}`,name:e.name||'Øvelse',targetSets:e.targetSets||3,targetReps:e.targetReps||'',tempo:e.tempo||'',restSeconds:e.restSeconds??120,notes:e.notes||'',optional:!!e.optional,alternatives:e.alternatives||[],bodyweight:typeof e.bodyweight==='boolean'?e.bodyweight:isBodyweightExercise(e.name)}))}));
  me.sessions=(s.sessions||[]).map(x=>({...x,profileId:'me'}));
  if(s.active)n.active={...s.active,profileId:'me'};
  return n;
}
function normalizeProfileNames(s){if(!s||!Array.isArray(s.profiles))return s;ensureExerciseBank(s);const me=s.profiles.find(p=>p.id==='me');const partner=s.profiles.find(p=>p.id==='partner');if(me&&(!me.name||me.name==='Meg'))me.name='Håvard';if(partner&&(!partner.name||partner.name==='Dama'))partner.name='Stine';s.profiles.forEach(p=>{if(p.reportEmail==null)p.reportEmail='';(p.sessions||[]).forEach(sess=>(sess.exercises||[]).forEach(e=>{if(e.comment==null)e.comment='';}));});return normalizeBodyweightData(s);}
function loadState(){try{const raw=localStorage.getItem(STORAGE_KEY);if(raw){const s=JSON.parse(raw);if(s.version>=2&&Array.isArray(s.profiles)){s.timer=null;return normalizeProfileNames(s);}return normalizeProfileNames(migrateLegacy(s));}}catch(e){}return freshState();}
let state=loadState();let timerHandle=null;
let cloudClient=null,cloudReady=false,cloudSyncTimer=null,cloudPollTimer=null,cloudLastProfileSnapshot=JSON.stringify({profiles:state.profiles||[],exerciseBank:state.exerciseBank||[]}),cloudApplying=false,cloudWriteInFlight=false,cloudSuppressPullUntil=0;
let cloudMeta=loadCloudMeta();
saveState();
function loadCloudConfig(){
  try{
    const stored=JSON.parse(localStorage.getItem(CLOUD_CONFIG_KEY)||'{}');
    return {url:stored.url||DEFAULT_CLOUD_CONFIG.url,key:stored.key||DEFAULT_CLOUD_CONFIG.key};
  }catch(e){return {...DEFAULT_CLOUD_CONFIG};}
}
function saveCloudConfig(c){localStorage.setItem(CLOUD_CONFIG_KEY,JSON.stringify(c||{}));}
function loadCloudMeta(){try{return JSON.parse(localStorage.getItem(CLOUD_META_KEY)||'{}')}catch(e){return{}}}
function saveCloudMeta(){localStorage.setItem(CLOUD_META_KEY,JSON.stringify(cloudMeta||{}));}
function cloudPayload(){return {version:state.version||2,profiles:clone(state.profiles||[]),exerciseBank:clone(state.exerciseBank||[])};}

// Treveis sammenslaaing kombinert med atomisk databaseversjon (CAS).
const CLOUD_BASE_KEY='treningslogg-cloud-sync-base-v1';
let cloudBasePayload=null,cloudBaseRevision=null,cloudSyncAvailable=false,cloudResyncRequested=false;
function syncEqual(a,b){return JSON.stringify(a)===JSON.stringify(b);}
function syncClone(x){return x===undefined?undefined:clone(x);}
function syncKey(v,i){return v&&typeof v==='object'&&v.id?String(v.id):v?.startedAt?String(v.startedAt):v?.name?String(v.name)+':'+i:'#'+i;}
function syncMergeArray(base,local,remote,key=''){
  const baseMap=new Map((base||[]).map((x,i)=>[syncKey(x,i),x]));
  const localMap=new Map((local||[]).map((x,i)=>[syncKey(x,i),x]));
  const remoteMap=new Map((remote||[]).map((x,i)=>[syncKey(x,i),x]));
  const keys=new Set([...remoteMap.keys(),...localMap.keys()]);
  const out=[];
  for(const id of keys){
    const merged=syncMergeValue(baseMap.get(id),localMap.get(id),remoteMap.get(id),'');
    if(merged!==undefined)out.push(merged);
  }
  if(key==='sessions')out.sort((a,b)=>(Date.parse(b.finishedAt||b.startedAt||0)||0)-(Date.parse(a.finishedAt||a.startedAt||0)||0));
  return out;
}
function syncMergeValue(base,local,remote,key=''){
  if(syncEqual(local,base))return syncClone(remote);
  if(syncEqual(remote,base))return syncClone(local);
  if(Array.isArray(local)&&Array.isArray(remote)){
    if(['profiles','sessions','exercises','sets','programs','exerciseBank'].includes(key))
      return syncMergeArray(Array.isArray(base)?base:[],local,remote,key);
    return syncClone(local);
  }
  if(local&&remote&&typeof local==='object'&&typeof remote==='object'&&!Array.isArray(local)&&!Array.isArray(remote)){
    const keys=new Set([...Object.keys(base&&typeof base==='object'?base:{}),...Object.keys(remote),...Object.keys(local)]);
    const out={};
    for(const k of keys){const x=syncMergeValue(base?.[k],local[k],remote[k],k);if(x!==undefined)out[k]=x;}
    return out;
  }
  return syncClone(local);
}
function syncMergePayload(base,local,remote){
  if(!base?.profiles||!remote?.profiles)return syncClone(local);
  return syncMergeValue(base,local,remote);
}
function cloudSavedBase(householdId){
  try{
    const x=JSON.parse(localStorage.getItem(CLOUD_BASE_KEY)||'null');
    return x&&x.householdId===householdId&&Number.isSafeInteger(x.revision)&&x.payload?.profiles?x:null;
  }catch(e){return null;}
}
function cloudRememberBase(householdId,payload,revision){
  const rev=Number(revision);
  if(!householdId||!payload?.profiles||!Number.isSafeInteger(rev)||rev<0)throw new Error('Ugyldig skyrevisjon');
  cloudBasePayload=syncClone(payload);cloudBaseRevision=rev;
  localStorage.setItem(CLOUD_BASE_KEY,JSON.stringify({householdId,revision:rev,payload:cloudBasePayload}));
}
function cloudCheckedRow(data){
  const row=Array.isArray(data)?data[0]:data;
  if(!row?.household_id||!row.data?.profiles||!Number.isSafeInteger(Number(row.revision)))
    throw new Error('Skysynk mangler versjonskontroll. Installer Supabase-migrering 2.7.0 før synkronisering.');
  return row;
}
async function readCloudChecked(){
  const {data,error}=await cloudClient.rpc('get_my_training_household_checked');
  if(error)throw new Error(/get_my_training_household_checked|PGRST202|42883|schema cache/i.test(error.message||'')?
    'Supabase må oppgraderes med migrering 2.7.0 før skysynk kan brukes.':(error.message||'Kunne ikke lese skydatabasen'));
  return data;
}
function cloudAdoptCheckedRow(row,forceRemote=false){
  cloudSyncAvailable=true;
  cloudMeta.householdId=row.household_id;cloudMeta.inviteCode=row.invite_code;
  cloudMeta.updatedAt=row.updated_at;
  const saved=cloudSavedBase(row.household_id);
  const base=!forceRemote&&(cloudBasePayload&&cloudBaseRevision!==null?cloudBasePayload:saved?.payload);
  const local=cloudPayload();
  const merged=base?syncMergePayload(base,local,row.data):syncClone(row.data);
  cloudRememberBase(row.household_id,row.data,row.revision);
  applyCloudPayload(merged);
  saveCloudMeta();
  if(!syncEqual(merged,row.data))queueCloudPush();
}
function saveState(){
  ensureExerciseBank(state);
  localStorage.setItem(STORAGE_KEY,JSON.stringify(state));
  const snap=JSON.stringify({profiles:state.profiles||[],exerciseBank:state.exerciseBank||[]});
  if(!cloudApplying&&snap!==cloudLastProfileSnapshot){cloudLastProfileSnapshot=snap;queueCloudPush();}
}
function cloudConfigured(){const c=loadCloudConfig();return !!(c.url&&c.key);}
async function initCloud(){
  const c=loadCloudConfig();
  if(!c.url||!c.key||!window.supabase){cloudReady=false;return;}
  try{
    cloudClient=window.supabase.createClient(c.url,c.key,{auth:{persistSession:true,autoRefreshToken:true,detectSessionInUrl:true}});
    const {data}=await cloudClient.auth.getSession();cloudReady=!!data?.session;
    if(recoveryMode&&cloudReady)ensureRecoveryPrompt();
    if(cloudReady)await resolveCloudHousehold();
    cloudClient.auth.onAuthStateChange(async(event,session)=>{
      cloudReady=!!session;
      if(event==='PASSWORD_RECOVERY'||recoveryMode)ensureRecoveryPrompt();
      if(cloudReady)await resolveCloudHousehold();
      renderSettings();
    });
    if(recoveryMode)ensureRecoveryPrompt();
    if(cloudPollTimer)clearInterval(cloudPollTimer);
    cloudPollTimer=setInterval(()=>{if(cloudReady&&cloudMeta.householdId&&cloudSyncAvailable&&document.visibilityState==='visible'&&!recoveryMode)pullCloud(false);},20000);
    document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='visible'&&cloudReady&&cloudMeta.householdId&&cloudSyncAvailable&&!recoveryMode)pullCloud(false);},{passive:true});
  }catch(e){cloudReady=false;cloudMeta.lastError=e?.message||'Kunne ikke koble til Supabase';saveCloudMeta();}
}
function ensureRecoveryPrompt(){
  if(!recoveryMode||!cloudClient||recoveryPromptShown)return;
  recoveryPromptShown=true;setTimeout(()=>showPasswordRecoveryModal(),0);
}
async function resolveCloudHousehold(){
  if(!cloudClient||!cloudReady)return;
  try{
    const data=await readCloudChecked();
    const row=Array.isArray(data)?data[0]:data;
    if(row?.household_id){
      if(cloudMeta.householdId&&cloudMeta.householdId!==row.household_id){cloudBasePayload=null;cloudBaseRevision=null;}
      cloudAdoptCheckedRow(cloudCheckedRow(row));
      cloudMeta.lastError='';saveCloudMeta();
    }else{
      cloudSyncAvailable=true;cloudMeta.householdId=null;cloudBasePayload=null;cloudBaseRevision=null;saveCloudMeta();
    }
  }catch(e){
    cloudSyncAvailable=false;cloudMeta.lastError=e.message||'Skysynk kan ikke starte';saveCloudMeta();renderCloudStatus();
  }
}
function applyCloudPayload(payload){
  if(!payload?.profiles)return;
  const current=state.currentProfileId,active=state.active,timer=state.timer;
  cloudApplying=true;
  try{
    state.profiles=syncClone(payload.profiles);
    if(Array.isArray(payload.exerciseBank))state.exerciseBank=syncClone(payload.exerciseBank);
    normalizeProfileNames(state);ensureExerciseBank(state);
    state.currentProfileId=state.profiles.some(p=>p.id===current)?current:
      (state.profiles.some(p=>p.id===cloudMeta.deviceProfileId)?cloudMeta.deviceProfileId:state.profiles[0]?.id);
    state.active=active;state.timer=timer;
    localStorage.setItem(STORAGE_KEY,JSON.stringify(state));
    cloudLastProfileSnapshot=JSON.stringify({profiles:state.profiles||[],exerciseBank:state.exerciseBank||[]});
  }finally{cloudApplying=false;}
  renderAll();
}
function queueCloudPush(){
  if(!cloudClient||!cloudReady||!cloudMeta.householdId||!cloudSyncAvailable||cloudBaseRevision===null)return;
  if(cloudWriteInFlight){cloudResyncRequested=true;return;}
  clearTimeout(cloudSyncTimer);
  cloudSyncTimer=setTimeout(()=>{cloudSyncTimer=null;pushCloud();},900);
}
async function pushCloud(payloadOverride=null){
  if(!cloudClient||!cloudReady||!cloudMeta.householdId||!cloudSyncAvailable||cloudBaseRevision===null)return false;
  if(cloudWriteInFlight){cloudResyncRequested=true;return false;}
  cloudWriteInFlight=true;cloudSuppressPullUntil=Date.now()+4000;
  const local=payloadOverride||cloudPayload(),base=syncClone(cloudBasePayload);
  try{
    for(let tries=0;tries<6;tries++){
      const data=await readCloudChecked(),record=cloudCheckedRow(data);
      if(record.household_id!==cloudMeta.householdId)throw new Error('Feil delt treningskonto');
      const remote=record.data;
      const payload=syncMergePayload(base||remote,local,remote);
      let written=remote,revision=Number(record.revision),updatedAt=record.updated_at;
      if(!syncEqual(payload,remote)){
        const {data:response,error}=await cloudClient.rpc('save_training_state_checked',{
          p_household_id:record.household_id,p_data:payload,p_expected_revision:revision
        });
        if(error)throw new Error(error.message||'Skylagring feilet');
        const saved=Array.isArray(response)?response[0]:response;
        if(!saved||saved.saved!==true){
          // En annen telefon lagret mellom lesing og skriving. Les og flette på nytt.
          if(saved?.saved===false)continue;
          throw new Error('Skysynk mottok ugyldig svar');
        }
        written=payload;revision=Number(saved.revision);updatedAt=saved.updated_at;
      }
      cloudRememberBase(record.household_id,written,revision);
      // Data som kom inn mens RPC-kallet paagikk skal ikke forsvinne.
      const after=cloudPayload(),merged=syncMergePayload(local,after,written);
      applyCloudPayload(merged);
      if(!syncEqual(merged,written))cloudResyncRequested=true;
      cloudMeta.updatedAt=updatedAt||new Date().toISOString();
      cloudMeta.lastSyncedAt=new Date().toISOString();cloudMeta.lastError='';
      saveCloudMeta();renderCloudStatus();return true;
    }
    throw new Error('Begge telefoner oppdaterer samtidig. Prøv Synkroniser nå igjen. Lokale data er beholdt.');
  }catch(e){
    cloudMeta.lastError=e?.message||'Skysynk feilet – lokale data beholdt';
    saveCloudMeta();renderSettings();return false;
  }finally{
    cloudWriteInFlight=false;
    if(cloudResyncRequested){cloudResyncRequested=false;queueCloudPush();}
  }
}
async function pullCloud(showToast=true){
  if(!cloudClient||!cloudReady||!cloudMeta.householdId||!cloudSyncAvailable)return;
  if(cloudWriteInFlight||cloudSyncTimer||Date.now()<cloudSuppressPullUntil||document.querySelector('#modal')?.open)return;
  try{
    const data=await readCloudChecked(),row=cloudCheckedRow(data);
    if(row.household_id!==cloudMeta.householdId)throw new Error('Feil delt treningskonto');
    const local=cloudPayload(),merged=syncMergePayload(cloudBasePayload||row.data,local,row.data);
    cloudRememberBase(row.household_id,row.data,row.revision);
    applyCloudPayload(merged);
    cloudMeta.inviteCode=row.invite_code;cloudMeta.updatedAt=row.updated_at;
    cloudMeta.lastSyncedAt=new Date().toISOString();cloudMeta.lastError='';
    saveCloudMeta();renderCloudStatus();
    if(!syncEqual(merged,row.data))queueCloudPush();
    if(showToast)toast('Synkronisert fra skyen');
  }catch(e){cloudMeta.lastError=e?.message||'Kunne ikke hente fra skyen';saveCloudMeta();renderCloudStatus();if(showToast)toast('Synkronisering feilet');}
}


async function cloudSignUp(email,password){const {data,error}=await cloudClient.auth.signUp({email,password});if(error)throw error;return data;}
async function cloudSignIn(email,password){const {data,error}=await cloudClient.auth.signInWithPassword({email,password});if(error)throw error;cloudReady=true;await resolveCloudHousehold();return data;}
async function cloudSignOut(){if(cloudClient)await cloudClient.auth.signOut();cloudReady=false;cloudSyncAvailable=false;cloudBasePayload=null;cloudBaseRevision=null;cloudMeta={deviceProfileId:cloudMeta.deviceProfileId};saveCloudMeta();renderAll();}
async function sendPasswordRecovery(email){
  if(!cloudClient)throw new Error('Supabase er ikke koblet til.');
  const redirectTo=location.origin+location.pathname;
  const {error}=await cloudClient.auth.resetPasswordForEmail(email,{redirectTo});
  if(error)throw error;
}
function showPasswordRecoveryModal(){
  if(!cloudClient)return;
  const m=document.querySelector('#modal'),b=document.querySelector('#modalBody');
  if(!m||!b)return;
  b.innerHTML=`<h3>Sett nytt passord</h3><p class="muted small">Recovery-lenken er godkjent. Velg et nytt passord før du fortsetter til Treningslogg.</p><div class="stack"><label>Nytt passord<input id="recoveryPassword" type="password" autocomplete="new-password" minlength="6"></label><label>Bekreft nytt passord<input id="recoveryPassword2" type="password" autocomplete="new-password" minlength="6"></label><button type="button" class="primary" id="saveRecoveryPassword">Lagre nytt passord</button></div>`;
  const btn=b.querySelector('#saveRecoveryPassword');
  btn.onclick=async()=>{
    const p1=b.querySelector('#recoveryPassword').value,p2=b.querySelector('#recoveryPassword2').value;
    if(p1.length<6)return toast('Passordet må ha minst 6 tegn');
    if(p1!==p2)return toast('Passordene er ikke like');
    btn.disabled=true;btn.textContent='Lagrer…';
    try{
      const {error}=await cloudClient.auth.updateUser({password:p1});
      if(error)throw error;
      recoveryMode=false;recoveryPromptShown=false;
      history.replaceState({},document.title,location.origin+location.pathname);
      cloudReady=true;await resolveCloudHousehold();
      try{m.close();}catch(_){}
      renderAll();toast('Passordet er oppdatert');
    }catch(e){alert(e.message||'Kunne ikke oppdatere passordet');btn.disabled=false;btn.textContent='Lagre nytt passord';}
  };
  if(!m.open)m.showModal();
}
async function createCloudHousehold(){
  if(!cloudSyncAvailable)throw new Error('Installer Supabase-migrering 2.7.0 først.');
  const {error}=await cloudClient.rpc('create_training_household',{initial_data:cloudPayload()});
  if(error)throw error;
  const row=cloudCheckedRow(await readCloudChecked());
  cloudAdoptCheckedRow(row,true);
  cloudMeta.lastSyncedAt=new Date().toISOString();cloudMeta.lastError='';
  saveCloudMeta();renderAll();
}
async function joinCloudHousehold(code){
  if(!cloudSyncAvailable)throw new Error('Installer Supabase-migrering 2.7.0 først.');
  const {error}=await cloudClient.rpc('join_training_household',{code:String(code||'').trim().toUpperCase()});
  if(error)throw error;
  const row=cloudCheckedRow(await readCloudChecked());
  cloudAdoptCheckedRow(row,true);
  cloudMeta.lastSyncedAt=new Date().toISOString();cloudMeta.lastError='';
  saveCloudMeta();renderAll();
}
async function currentCloudUser(){if(!cloudClient)return null;const {data}=await cloudClient.auth.getUser();return data?.user||null;}
function renderCloudStatus(){const e=document.querySelector('#cloudStatus');if(!e)return;const last=cloudMeta.lastSyncedAt?fmtDate(cloudMeta.lastSyncedAt):'Ikke synkronisert ennå';e.textContent=cloudMeta.lastError?`Synkfeil: ${cloudMeta.lastError}`:`Sist synkronisert: ${last}`;}

function profile(){return state.profiles.find(p=>p.id===state.currentProfileId)||state.profiles[0];}
function esc(s=''){return String(s).replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));}
function fmtDate(iso){return new Intl.DateTimeFormat('nb-NO',{day:'2-digit',month:'short',year:'numeric',hour:'2-digit',minute:'2-digit'}).format(new Date(iso));}
function normalizedName(n=''){return n.replace(/^[A-D][12]\s*[·.-]?\s*/i,'').trim().toLowerCase();}

function num(v){if(typeof v==='number')return Number.isFinite(v)?v:0;const t=String(v??'').trim().replace(/\s/g,'').replace(',','.');const n=parseFloat(t);return Number.isFinite(n)?n:0;}
const MUSCLE_GROUPS=['Bryst','Rygg','Skuldre','Biceps','Triceps','Quads','Hamstrings','Sete','Legger','Core','Helkropp','Annet'];
const EQUIPMENT_TYPES=['Kroppsvekt','Kabel','Maskin','Manualer','Stang','Smith','TRX/slynge','Annet'];
function inferMuscleGroup(name=''){const n=normalizedName(name);if(/crunch|ab wheel|ab-wheel|leg raise|bensenk|sideplanke|sit-up|trx crunch/.test(n))return'Core';if(/curl/.test(n)&&!/leg curl/.test(n))return'Biceps';if(/triceps|pushdown/.test(n))return'Triceps';if(/sidehev|shoulder|skulder|rear-delt|six ways|hspu|pike/.test(n))return'Skuldre';if(/bench|benk|press|push-up|pushup|dips|fly/.test(n)&&!/shoulder|skulder/.test(n))return'Bryst';if(/row|roing|pull-up|pullup|chin|nedtrekk|lat|rygghev/.test(n))return'Rygg';if(/leg curl|rdl|strakmark/.test(n))return'Hamstrings';if(/booty|hip thrust|kickback|abduksjon/.test(n))return'Sete';if(/calf|leggpress|tåhev/.test(n))return'Legger';if(/squat|knebøy|lunge|utfall|leg extension|bulgarian|adduksjon/.test(n))return'Quads';return'Annet';}
function inferEquipment(name='',bodyweight=false){const n=normalizedName(name);if(bodyweight||isBodyweightExercise(name))return'Kroppsvekt';if(/smith/.test(n))return'Smith';if(/cable|kabel|nedtrekk|pulldown/.test(n))return'Kabel';if(/db|dumbbell|manual/.test(n))return'Manualer';if(/barbell|stang|rdl|strakmark|benkpress/.test(n))return'Stang';if(/trx|slynge/.test(n))return'TRX/slynge';if(/bootybuilder|extension|leg curl|abduksjon|adduksjon|machine|maskin/.test(n))return'Maskin';return'Annet';}

function repRange(t=''){const n=(String(t).match(/\d+/g)||[]).map(Number);return n.length?[Math.min(...n),Math.max(...n)]:null;}
function rirRange(t=''){const m=(String(t).match(/RIR\s*(\d+)(?:[–-](\d+))?/i)||[]);if(!m.length)return null;const a=+m[1],b=m[2]?+m[2]:a;return[Math.min(a,b),Math.max(a,b)];}
function volume(s){let total=0;for(const e of s.exercises||[])for(const st of e.sets||[])total+=setExternalVolume(st,e);return total;}
function oneRM(w,r){return w>0&&r>0?w*(1+r/30):0;}
function fmtW(v){return Number.isInteger(v)?String(v):Number(v).toFixed(1).replace('.',',');}
function round05(v){return Math.round(v*2)/2;}
function smallExercise(n){return ['sidehev','curl','triceps','fly','extension','leg curl','abduksjon','adduksjon','kickback'].some(k=>normalizedName(n).includes(k));}
function toast(msg){const t=document.querySelector('#toast');t.textContent=msg;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),1800);}
function setTab(id){document.querySelectorAll('.tab').forEach(b=>b.classList.toggle('active',b.dataset.tab===id));document.querySelectorAll('.view').forEach(v=>v.classList.toggle('active',v.id===id));renderAll();}

function profileSessions(pid=state.currentProfileId){return state.profiles.find(p=>p.id===pid)?.sessions||[];}
function mostRecentExercise(name,pid=state.currentProfileId){const key=normalizedName(name);for(const sess of profileSessions(pid)){const e=(sess.exercises||[]).find(x=>normalizedName(x.name)===key);if(e)return e;}return null;}
function lastSummary(name){const e=mostRecentExercise(name);if(!e)return'';const sets=(e.sets||[]).filter(s=>s.completed||s.reps);if(!sets.length)return'';return sets.map(st=>`${loadLabel(st,e)} × ${st.reps||0}${st.rir!==''&&st.rir!=null?` @RIR ${st.rir}`:''}`).join(' · ');}
function lastComment(name){const e=mostRecentExercise(name);return e?.comment||'';}
function updateExerciseComment(eid,value){const e=state.active?.exercises.find(x=>x.id===eid);if(!e)return;e.comment=value;saveState();}
function localDateTimeValue(iso){const d=new Date(iso||Date.now()),pad=n=>String(n).padStart(2,'0');return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;}
function monthKeyFromDate(d){const x=new Date(d),m=String(x.getMonth()+1).padStart(2,'0');return `${x.getFullYear()}-${m}`;}
function previousMonthKey(key){const [y,m]=key.split('-').map(Number),d=new Date(y,m-2,1);return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}`;}
function monthLabel(key){const [y,m]=key.split('-').map(Number);return new Intl.DateTimeFormat('nb-NO',{month:'long',year:'numeric'}).format(new Date(y,m-1,1));}
function monthlyExerciseStats(key,pid=state.currentProfileId){
  const stats=new Map();
  for(const sess of profileSessions(pid)){
    const when=sess.finishedAt||sess.startedAt;if(!when||monthKeyFromDate(when)!==key)continue;
    for(const e of sess.exercises||[]){
      const k=normalizedName(e.name),bw=isBodyweightExercise(e);
      if(!stats.has(k))stats.set(k,{name:e.name,bodyweight:bw,sessions:0,sets:0,reps:0,volume:0,bestWeight:0,bestReps:0,bestE1RM:0,bestLoadRank:-Infinity,bestLoadType:null,bestLoadAmount:0,bestLoadReps:0,rirSum:0,rirN:0});
      const x=stats.get(k);x.sessions++;x.bodyweight=x.bodyweight||bw;
      for(const st of e.sets||[]){
        if(!(st.completed||Number(st.reps)>0))continue;
        const w=num(st.weight),r=Number(st.reps)||0,rir=st.rir===''||st.rir==null?NaN:Number(st.rir);x.sets++;x.reps+=r;
        if(bw){const rank=loadRank(st,e);if(rank>x.bestLoadRank||(rank===x.bestLoadRank&&r>x.bestLoadReps)){x.bestLoadRank=rank;x.bestLoadType=inferredLoadType(st,e);x.bestLoadAmount=w;x.bestLoadReps=r;}x.bestReps=Math.max(x.bestReps,r);}
        else{x.volume+=w*r;x.bestWeight=Math.max(x.bestWeight,w);x.bestReps=Math.max(x.bestReps,r);x.bestE1RM=Math.max(x.bestE1RM,oneRM(w,r));}
        if(Number.isFinite(rir)){x.rirSum+=rir;x.rirN++;}
      }
    }
  }
  return stats;
}
function formatLoadFromStats(x){if(!x||!x.bodyweight)return x?.bestWeight?`${fmtW(x.bestWeight)} kg`:'–';if(x.bestLoadType==='bw_plus')return `+${fmtW(x.bestLoadAmount)} kg`;if(x.bestLoadType==='bw_assist')return `−${fmtW(x.bestLoadAmount)} kg assistanse`;return 'KV';}
function monthlyReportData(key,pid=state.currentProfileId){
  const sessions=profileSessions(pid).filter(s=>monthKeyFromDate(s.finishedAt||s.startedAt)===key),stats=monthlyExerciseStats(key,pid),prev=monthlyExerciseStats(previousMonthKey(key),pid);let totalVolume=0;for(const sess of sessions)totalVolume+=volume(sess);
  const rows=[...stats.entries()].map(([k,x])=>{const p=prev.get(k);let trend='Ny / ikke sammenlignbar',delta=null;
    if(p){
      if(x.bodyweight||p.bodyweight){
        const xr=Number.isFinite(x.bestLoadRank)?x.bestLoadRank:0,pr=Number.isFinite(p.bestLoadRank)?p.bestLoadRank:0;
        if(xr>pr){trend=`↑ belastning ${formatLoadFromStats(p)} → ${formatLoadFromStats(x)}`;delta=2;}
        else if(xr<pr){trend=`↓ belastning ${formatLoadFromStats(p)} → ${formatLoadFromStats(x)}`;delta=-2;}
        else if(x.bestLoadReps>p.bestLoadReps){trend=`↑ beste reps ${p.bestLoadReps} → ${x.bestLoadReps}`;delta=2;}
        else if(x.bestLoadReps<p.bestLoadReps){trend=`↓ beste reps ${p.bestLoadReps} → ${x.bestLoadReps}`;delta=-2;}
        else trend='Stabil kroppsvektprestasjon';
      } else if(x.bestE1RM>0&&p.bestE1RM>0){delta=(x.bestE1RM/p.bestE1RM-1)*100;trend=Math.abs(delta)<1?'Stabil styrke':`${delta>0?'↑':'↓'} styrke ${Math.abs(delta).toFixed(1).replace('.',',')} %`;}
      else if(x.bestReps&&p.bestReps){delta=(x.bestReps/p.bestReps-1)*100;trend=Math.abs(delta)<1?'Stabile reps':`${delta>0?'↑':'↓'} beste reps ${Math.abs(delta).toFixed(1).replace('.',',')} %`;}
    }
    return {...x,avgRir:x.rirN?x.rirSum/x.rirN:null,trend,delta};
  }).sort((a,b)=>a.name.localeCompare(b.name,'nb'));
  const improved=rows.filter(r=>r.delta!=null&&r.delta>1).length,down=rows.filter(r=>r.delta!=null&&r.delta<-1).length;
  const text=!sessions.length?'Ingen registrerte økter denne måneden.':`${sessions.length} økt${sessions.length===1?'':'er'} og ${Math.round(totalVolume).toLocaleString('nb-NO')} kg registrert ekstern treningsmengde (kroppsvektøvelser holdes utenfor kg-volum). ${improved?`${improved} øvelse${improved===1?'':'r'} viser tydelig fremgang fra forrige måned.`:'Ingen tydelig fremgang kan fastslås mot forrige måned ennå.'}${down?` ${down} øvelse${down===1?'':'r'} ligger lavere og kan være verdt å følge med på.`:''}`;
  return{key,sessions,totalVolume,rows,text};
}
function reportText(key,pid=state.currentProfileId){const pr=state.profiles.find(p=>p.id===pid),r=monthlyReportData(key,pid);let out=`Treningsrapport – ${pr?.name||''} – ${monthLabel(key)}\n\n${r.text}\n\n`;for(const x of r.rows){out+=`${x.name}\n`;out+=`Sett: ${x.sets} · Reps: ${x.reps}`;if(x.bodyweight)out+=` · Beste: ${formatLoadFromStats(x)} × ${x.bestLoadReps}`;else{if(x.bestWeight>0)out+=` · Tyngste vekt: ${fmtW(x.bestWeight)} kg`;if(x.bestE1RM>0)out+=` · Beste e1RM: ${x.bestE1RM.toFixed(1).replace('.',',')} kg`;}if(x.avgRir!=null)out+=` · Snitt RIR: ${x.avgRir.toFixed(1).replace('.',',')}`;out+=`\n${x.trend}\n\n`;}return out;}
function sendMonthlyReportEmail(key){const p=profile(),to=(p.reportEmail||'').trim();if(!to){toast('Legg inn rapport-e-post under Data først');setTab('settings');return;}const subject=`Treningsrapport ${p.name} – ${monthLabel(key)}`,body=reportText(key);window.location.href=`mailto:${encodeURIComponent(to)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;}
function activeTheme(){const x=localStorage.getItem(THEME_KEY)||'forest';return ['forest','midnight','copper','plum','light'].includes(x)?x:'forest';}
function applyTheme(name=activeTheme()){const x=['forest','midnight','copper','plum','light'].includes(name)?name:'forest';localStorage.setItem(THEME_KEY,x);document.documentElement.dataset.theme=x;}
function shouldShowSplash(){return localStorage.getItem(SHOW_SPLASH_KEY)!=='false';}
function setSplashPreference(v){localStorage.setItem(SHOW_SPLASH_KEY,v?'true':'false');}
function hideSplash(goProgram=false){const sp=document.querySelector('#splashScreen');if(sp){sp.classList.add('hidden');sp.setAttribute('aria-hidden','true');}if(goProgram)setTab('programs');}
function progressionSuggestion(e){
  const rr=repRange(e.targetReps),prev=mostRecentExercise(e.name);if(!rr||!prev)return null;const sets=(prev.sets||[]).filter(st=>(st.completed||st.reps)&&Number(st.reps)>0);if(!sets.length)return null;
  const reps=sets.map(st=>Number(st.reps)),avgRirVals=sets.filter(st=>st.rir!==''&&st.rir!=null).map(st=>Number(st.rir)),avgRir=avgRirVals.length?avgRirVals.reduce((a,b)=>a+b,0)/avgRirVals.length:NaN,target=rirRange(e.notes),allTop=sets.length>=2&&sets.every(st=>Number(st.reps)>=rr[1]);
  if(target&&Number.isFinite(avgRir)&&avgRir<target[0])return{title:'Behold / juster ned',detail:`Sist ca. RIR ${avgRir.toFixed(1).replace('.',',')}; mål ${target[0]}–${target[1]}. Prioriter teknikk og riktig RIR.`};
  if(isBodyweightExercise(e)){
    const best=sets.slice().sort((a,b)=>loadRank(b,prev)-loadRank(a,prev)||Number(b.reps)-Number(a.reps))[0],t=inferredLoadType(best,prev),w=num(best.weight);
    if(allTop){if(t==='bw')return{title:'Klar for ekstra belastning',detail:'Du traff toppen av repområdet med KV. Prøv en liten +kg-belastning neste gang, eller gjør varianten vanskeligere.'};if(t==='bw_plus')return{title:'Klar for liten økning',detail:`Alle arbeidssettene traff toppen av repområdet. Prøv litt mer enn +${fmtW(w)} kg med samme tempo og RIR.`};if(t==='bw_assist')return{title:'Reduser assistansen',detail:`Du traff toppen av repområdet. Prøv litt mindre enn ${fmtW(w)} kg assistanse neste gang.`};}
    return{title:'Bygg reps',detail:`Behold ${loadLabel(best,prev)} og prøv å slå forrige økt innen ${rr[0]}–${rr[1]} reps.`};
  }
  const wvals=sets.map(st=>num(st.weight)).filter(w=>w>0),w=wvals.length?Math.max(...wvals):null;
  if(allTop){if(w){const next=round05(w+(smallExercise(e.name)?1:2.5));return{title:'Klar for liten økning',detail:`Alle arbeidssettene traff toppen av repområdet. Prøv ca. ${fmtW(next)} kg hvis tempo og RIR var riktig.`};}return{title:'Gjør varianten litt tyngre',detail:'Du traff toppen av repområdet på alle arbeidssett.'};}
  if(Math.max(...reps)>=rr[0])return{title:'Bygg reps',detail:`Behold omtrent samme belastning og prøv å slå forrige økt innen ${rr[0]}–${rr[1]} reps.`};
  return{title:'Bygg inn i repområdet',detail:`Sikt først på minst ${rr[0]} rene reps per arbeidssett.`};
}

function startWorkout(programId){const p=profile().programs.find(x=>x.id===programId);if(!p)return;if(state.active&&!confirm('Du har allerede en pågående økt. Erstatt den?'))return;openWorkoutSetup(p);}
function bonusSuggestions(pid=state.currentProfileId){
  const last=profileSessions(pid)[0];
  if(!last||/bonus/i.test(last.name||''))return[];
  if(Date.now()-Date.parse(last.finishedAt||last.startedAt||'')>7*86400000)return[];
  const omitted=(last.omittedExercises||[]).filter(e=>e.reason==='skipped').map(e=>clone(e));
  const seen=new Set(omitted.map(e=>normalizedName(e.name)));
  for(const e of last.exercises||[]){
    if((e.sets||[]).some(st=>st.completed||num(st.reps)>0))continue;
    const k=normalizedName(e.name);if(seen.has(k))continue;
    omitted.push({name:e.name,targetSets:e.originalTargetSets||e.targetSets||e.sets?.length||3,targetReps:e.targetReps,
      tempo:e.tempo,restSeconds:e.restSeconds,notes:e.notes,bodyweight:e.bodyweight,reason:'skipped'});
    seen.add(k);
  }
  return omitted;
}
function workoutExerciseFromPlan(e,origin=null){
  return {id:uid(),sourceExerciseID:origin?.id||null,name:e.name,originalName:origin?.name||e.name,
    targetSets:Math.max(1,Number(e.targetSets)||3),originalTargetSets:Math.max(1,Number(origin?.targetSets??e.targetSets)||3),
    targetReps:e.targetReps||'',tempo:e.tempo||'',restSeconds:e.restSeconds??120,
    notes:e.notes||'',comment:'',alternatives:clone(e.alternatives||[]),
    bodyweight:typeof e.bodyweight==='boolean'?e.bodyweight:isBodyweightExercise(e.name),
    sets:Array.from({length:Math.max(1,Number(e.targetSets)||3)},()=>newSetForExercise(e,false))};
}
function openWorkoutSetup(p,extras=[]){
  if(!p)return;
  const modal=document.querySelector('#modal'),body=document.querySelector('#modalBody');
  const isBonus=/bonus/i.test(p.name||'');
  const rows=(p.exercises||[]).map(e=>({origin:clone(e),item:clone(e),selected:!e.optional,extra:false,suggested:false}));
  if(isBonus)for(const e of [...extras,...bonusSuggestions()].filter((e,i,a)=>a.findIndex(x=>normalizedName(x.name)===normalizedName(e.name))===i)){
    rows.unshift({origin:null,item:{...e,id:uid()},selected:extras.some(x=>normalizedName(x.name)===normalizedName(e.name)),extra:true,suggested:true});
  }
  const draw=()=>{
    body.innerHTML=`<div class="row wrap"><h3>${esc(p.name)} · Klargjør økt</h3><button type="button" class="ghost compact" id="setupClose">Lukk ×</button></div>
      <p class="muted small">Velg, bytt og juster sett. Endringene gjelder bare denne økten.</p>
      ${isBonus&&rows.some(r=>r.suggested)?'<p class="suggestion">Forslag fra forrige økt: huk av dem du vil ta i bonusøkten. Forslagene forsvinner etter neste gjennomførte økt.</p>':''}
      <div class="setup-list">${rows.map((r,i)=>`<div class="setup-item ${r.selected?'':'setup-off'}">
        <div class="row wrap"><label class="setup-check"><input type="checkbox" data-setup-pick="${i}" ${r.selected?'checked':''}><span><strong>${esc(r.item.name)}</strong>${r.suggested?' <span class="tag">Fra forrige økt</span>':''}<small>${esc(r.item.targetReps||'')} ${r.origin?.optional?'· Valgfri':''}</small></span></label>
          <button type="button" class="ghost compact" data-setup-swap="${i}">Bytt</button></div>
        <div class="row wrap"><span class="muted small">Sett i dag</span><div class="actions">
          <button type="button" class="ghost compact" data-setup-minus="${i}" ${Number(r.item.targetSets)<=1?'disabled':''} aria-label="Færre sett">−</button>
          <strong>${Math.max(1,Number(r.item.targetSets)||3)}</strong>
          <button type="button" class="ghost compact" data-setup-plus="${i}" ${Number(r.item.targetSets)>=12?'disabled':''} aria-label="Flere sett">+</button>
          <button type="button" class="ghost compact" data-setup-up="${i}" ${i===0?'disabled':''} aria-label="Flytt opp">↑</button>
          <button type="button" class="ghost compact" data-setup-down="${i}" ${i===rows.length-1?'disabled':''} aria-label="Flytt ned">↓</button>
          ${r.extra?`<button type="button" class="text-danger" data-setup-del="${i}">Fjern</button>`:''}
        </div></div></div>`).join('')}</div>
      <div class="stack"><button type="button" class="ghost" id="setupAdd">+ Legg til fra øvelsesbanken</button>
      <p class="muted small" id="setupCount"></p>
      <div class="grid2"><button type="button" class="ghost" id="setupCancel">Avbryt</button><button type="button" class="primary" id="confirmStart">Start økt</button></div></div>`;
    const total=rows.filter(x=>x.selected).reduce((n,x)=>n+Number(x.item.targetSets||0),0);
    body.querySelector('#setupCount').textContent=`${rows.filter(x=>x.selected).length} øvelser · ${total} planlagte sett`;
    body.querySelector('#setupClose').onclick=()=>modal.close();
    body.querySelector('#setupCancel').onclick=()=>modal.close();
    body.querySelectorAll('[data-setup-pick]').forEach(x=>x.onchange=()=>{rows[+x.dataset.setupPick].selected=x.checked;draw();});
    body.querySelectorAll('[data-setup-minus]').forEach(x=>x.onclick=()=>{const r=rows[+x.dataset.setupMinus];r.item.targetSets=Math.max(1,Number(r.item.targetSets)-1);draw();});
    body.querySelectorAll('[data-setup-plus]').forEach(x=>x.onclick=()=>{const r=rows[+x.dataset.setupPlus];r.item.targetSets=Math.min(12,Number(r.item.targetSets)+1);draw();});
    body.querySelectorAll('[data-setup-up]').forEach(x=>x.onclick=()=>{const i=+x.dataset.setupUp;if(i>0){[rows[i-1],rows[i]]=[rows[i],rows[i-1]];draw();}});
    body.querySelectorAll('[data-setup-down]').forEach(x=>x.onclick=()=>{const i=+x.dataset.setupDown;if(i<rows.length-1){[rows[i+1],rows[i]]=[rows[i],rows[i+1]];draw();}});
    body.querySelectorAll('[data-setup-del]').forEach(x=>x.onclick=()=>{rows.splice(+x.dataset.setupDel,1);draw();});
    body.querySelectorAll('[data-setup-swap]').forEach(x=>x.onclick=()=>{
      const idx=+x.dataset.setupSwap;
      openBankPicker(item=>{rows[idx].item={...clone(item),targetSets:rows[idx].item.targetSets};rows[idx].selected=true;draw();if(!modal.open)modal.showModal();},{allowCreate:true,onCancel:()=>{draw();if(!modal.open)modal.showModal();}});
    });
    body.querySelector('#setupAdd').onclick=()=>openBankPicker(item=>{
      rows.push({origin:null,item:{...clone(item),id:uid()},selected:true,extra:true,suggested:false});
      draw();if(!modal.open)modal.showModal();
    },{allowCreate:true,onCancel:()=>{draw();if(!modal.open)modal.showModal();}});
    body.querySelector('#confirmStart').onclick=()=>{
      if(state.active&&!confirm('Du har en pågående økt. Erstatt den?'))return;
      if(!rows.some(r=>r.selected))return toast('Velg minst én øvelse');
      const omittedExercises=rows.filter(r=>r.origin&&((!r.selected&&!r.origin.optional)||(r.selected&&normalizedName(r.origin.name)!==normalizedName(r.item.name)))).map(r=>({
        sourceExerciseID:r.origin.id,name:r.origin.name,targetSets:r.origin.targetSets,targetReps:r.origin.targetReps,
        tempo:r.origin.tempo,restSeconds:r.origin.restSeconds,notes:r.origin.notes,
        bodyweight:r.origin.bodyweight,reason:r.selected?'replaced':'skipped'
      }));
      state.active={id:uid(),profileId:state.currentProfileId,programID:p.id,name:p.name,
        startedAt:new Date().toISOString(),notes:'',omittedExercises,
        exercises:rows.filter(r=>r.selected).map(r=>workoutExerciseFromPlan(r.item,r.origin))};
      saveState();modal.close();setTab('workout');
    };
  };
  draw();if(!modal.open)modal.showModal();
}
function addSet(eid){const e=state.active?.exercises.find(x=>x.id===eid);if(!e)return;e.sets.push(newSetForExercise(e,false));saveState();renderWorkout();}
function removeLastSet(eid){
  const e=state.active?.exercises.find(x=>x.id===eid);if(!e||e.sets.length<=1)return;
  const last=e.sets.at(-1);
  if((last.completed||last.reps!==''||last.weight!==''||last.rir!=='')&&!confirm('Fjerne siste sett og det registrerte resultatet?'))return;
  e.sets.pop();saveState();renderWorkout();
}
function removeExercise(eid){
  const a=state.active,e=a?.exercises.find(x=>x.id===eid);if(!e)return;
  if((e.sets||[]).some(st=>st.completed||st.reps!==''||st.weight!==''))return toast('Øvelsen har loggede sett. Fjern sett i stedet.');
  if(e.sourceExerciseID){
    a.omittedExercises=a.omittedExercises||[];
    if(!a.omittedExercises.some(x=>x.sourceExerciseID===e.sourceExerciseID&&x.reason==='skipped'))
      a.omittedExercises.push({sourceExerciseID:e.sourceExerciseID,name:e.originalName||e.name,
        targetSets:e.originalTargetSets||e.sets.length,targetReps:e.targetReps,tempo:e.tempo,
        restSeconds:e.restSeconds,notes:e.notes,bodyweight:e.bodyweight,reason:'skipped'});
  }
  a.exercises=a.exercises.filter(x=>x.id!==eid);saveState();renderWorkout();
}
function updateSet(eid,sid,key,value){const e=state.active?.exercises.find(x=>x.id===eid),s=e?.sets.find(x=>x.id===sid);if(!s)return;s[key]=value;if(key==='loadType'&&value==='bw')s.weight='';saveState();if(key==='loadType')renderWorkout();else updateWorkoutSummary();}
function toggleSet(eid,sid){const e=state.active?.exercises.find(x=>x.id===eid),s=e?.sets.find(x=>x.id===sid);if(!s)return;s.completed=!s.completed;if(s.completed&&e.restSeconds)startTimer(e.restSeconds);saveState();renderWorkout();}
function startTimer(sec){state.timer={end:Date.now()+sec*1000,duration:sec};saveState();tickTimer();clearInterval(timerHandle);timerHandle=setInterval(tickTimer,1000);}
function stopTimer(){state.timer=null;saveState();clearInterval(timerHandle);timerHandle=null;renderWorkout();}
function tickTimer(){if(!state.timer)return;const left=Math.max(0,Math.ceil((state.timer.end-Date.now())/1000)),el=document.querySelector('#timerValue');if(el)el.textContent=`${Math.floor(left/60)}:${String(left%60).padStart(2,'0')}`;if(left<=0){stopTimer();toast('Pause ferdig');}}
function finishWorkout(){
  if(!state.active)return;
  const any=state.active.exercises.some(e=>(e.sets||[]).some(st=>st.completed||num(st.reps)>0));
  if(!any)return toast('Registrer minst ett sett først');
  const done=clone(state.active);done.finishedAt=new Date().toISOString();
  const p=state.profiles.find(x=>x.id===done.profileId)||profile();
  p.sessions.unshift(done);state.active=null;state.timer=null;saveState();
  toast('Økten er lagret');setTab('history');
}
function renderProfileBar(){const sel=document.querySelector('#profileSelect');sel.innerHTML=state.profiles.map(p=>`<option value="${p.id}" ${p.id===state.currentProfileId?'selected':''}>${esc(p.name)}</option>`).join('');sel.onchange=e=>{if(state.active&&state.active.profileId!==e.target.value&&!confirm('Det pågår en økt på en annen profil. Bytte profil likevel?')){e.target.value=state.currentProfileId;return;}state.currentProfileId=e.target.value;saveState();renderAll();};}

function defaultProgramsForProfile(pid){return pid==='partner'?makePrograms(partnerPrograms,'d'):makePrograms(mePrograms,'m');}
function exportPrograms(){
  const p=profile(),payload={format:'treningslogg-program-v1',exportedAt:new Date().toISOString(),profileName:p.name,programs:clone(p.programs||[])};
  const blob=new Blob([JSON.stringify(payload,null,2)],{type:'application/json'}),a=document.createElement('a');
  a.href=URL.createObjectURL(blob);a.download=`treningsprogram-${(p.name||'profil').toLowerCase().replace(/[^a-z0-9æøå]+/gi,'-')}-${new Date().toISOString().slice(0,10)}.json`;a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1000);
}
function importPrograms(ev){
  const f=ev.target.files?.[0];if(!f)return;const r=new FileReader();
  r.onload=()=>{try{const x=JSON.parse(r.result);let programs=null;if(x?.format==='treningslogg-program-v1'&&Array.isArray(x.programs))programs=x.programs;else if(Array.isArray(x?.programs))programs=x.programs;else throw new Error('format');if(!confirm(`Importere ${programs.length} program og erstatte programmene til ${profile().name}? Treningshistorikken påvirkes ikke.`))return;profile().programs=clone(programs).map((pr,pi)=>({...pr,id:pr.id||uid(),exercises:(pr.exercises||[]).map(e=>({...e,id:e.id||uid(),optional:!!e.optional,alternatives:e.alternatives||[],bodyweight:typeof e.bodyweight==='boolean'?e.bodyweight:isBodyweightExercise(e.name)}))}));saveState();renderAll();toast('Program importert');}catch(e){alert('Kunne ikke lese programfilen.');}finally{ev.target.value='';}};r.readAsText(f);
}
function resetProgramsToOriginal(){
  const p=profile();if(!confirm(`Tilbakestille programmene til ${p.name} til originalmalen i appen? Treningshistorikken blir beholdt.`))return;
  p.programs=defaultProgramsForProfile(p.id);ensureExerciseBank(state);saveState();renderAll();toast(`${p.name}: originalprogram gjenopprettet`);
}

function enableReorder(container,itemSelector,handleSelector,onOrder){
  if(!container)return;
  const order=()=>[...container.querySelectorAll(itemSelector)].map(x=>x.dataset.reorderId).filter(Boolean);
  const start=(item,x,y)=>{
    if(!item)return null;
    const r=item.getBoundingClientRect(),before=order();
    const placeholder=document.createElement('div');placeholder.className='reorder-placeholder';
    placeholder.style.height=`${Math.max(54,r.height)}px`;container.insertBefore(placeholder,item);
    const ghost=document.createElement('div');ghost.className='reorder-ghost drag-preview';
    ghost.textContent=item.querySelector('h3,strong')?.textContent?.trim()||'Flytt øvelse';
    Object.assign(ghost.style,{position:'fixed',left:`${r.left}px`,top:`${r.top}px`,width:`${r.width}px`,height:'54px',zIndex:'9999',pointerEvents:'none'});
    document.body.appendChild(ghost);
    item.classList.add('reorder-source');document.body.classList.add('is-reordering');
    let atY=y,frame=0,active=true;
    const place=()=>{
      const others=[...container.querySelectorAll(itemSelector)].filter(v=>v!==item);let target=null;
      for(const v of others){const b=v.getBoundingClientRect();if(atY<b.top+b.height/2){target=v;break;}}
      if(target)container.insertBefore(placeholder,target);else container.appendChild(placeholder);
    };
    const tick=()=>{
      frame=0;if(!active)return;
      ghost.style.setProperty('transform',`translate3d(0,${atY-y}px,0)`,'important');
      place();
      const h=window.innerHeight,edge=80;
      let speed=0;if(atY<edge)speed=-Math.min(15,(edge-atY)*.18);else if(atY>h-edge)speed=Math.min(15,(atY-(h-edge))*.18);
      if(speed){window.scrollBy(0,speed);frame=requestAnimationFrame(tick);}
    };
    const move=cy=>{atY=cy;if(!frame)frame=requestAnimationFrame(tick);};
    const end=(cancel=false)=>{
      active=false;if(frame)cancelAnimationFrame(frame);
      if(!cancel)container.insertBefore(item,placeholder);
      placeholder.remove();ghost.remove();item.classList.remove('reorder-source');document.body.classList.remove('is-reordering');
      onOrder(cancel?before:order());
    };
    move(y);
    return {move,end};
  };
  for(const handle of container.querySelectorAll(handleSelector)){
    handle.setAttribute('aria-label','Dra for å flytte. Piltaster kan også brukes.');
    handle.addEventListener('keydown',e=>{
      if(e.key!=='ArrowUp'&&e.key!=='ArrowDown')return;
      const item=handle.closest(itemSelector),all=[...container.querySelectorAll(itemSelector)],i=all.indexOf(item);
      const dir=e.key==='ArrowUp'?-1:1;
      if(i<0||i+dir<0||i+dir>=all.length)return;e.preventDefault();
      if(dir<0)container.insertBefore(item,all[i-1]);else container.insertBefore(all[i+1],item);
      onOrder(order());
    });
    handle.addEventListener('touchstart',e=>{
      const touch=e.touches?.[0];if(!touch)return;
      const ctx=start(handle.closest(itemSelector),touch.clientX,touch.clientY);if(!ctx)return;
      e.preventDefault();
      const onMove=ev=>{const t=ev.touches?.[0];if(!t)return;ev.preventDefault();ctx.move(t.clientY);};
      const clear=()=>{document.removeEventListener('touchmove',onMove);document.removeEventListener('touchend',onEnd);document.removeEventListener('touchcancel',onCancel);};
      const onEnd=()=>{clear();ctx.end(false);};
      const onCancel=()=>{clear();ctx.end(true);};
      document.addEventListener('touchmove',onMove,{passive:false});document.addEventListener('touchend',onEnd);document.addEventListener('touchcancel',onCancel);
    },{passive:false});
    handle.addEventListener('pointerdown',e=>{
      if(e.pointerType==='touch'||(e.button!=null&&e.button!==0))return;
      e.preventDefault();const ctx=start(handle.closest(itemSelector),e.clientX,e.clientY);if(!ctx)return;
      const onMove=ev=>{if(ev.pointerId===e.pointerId){ev.preventDefault();ctx.move(ev.clientY);}};
      const clear=()=>{window.removeEventListener('pointermove',onMove);window.removeEventListener('pointerup',onEnd);window.removeEventListener('pointercancel',onCancel);};
      const onEnd=ev=>{if(ev.pointerId!==e.pointerId)return;clear();ctx.end(false);};
      const onCancel=ev=>{if(ev.pointerId!==e.pointerId)return;clear();ctx.end(true);};
      window.addEventListener('pointermove',onMove,{passive:false});window.addEventListener('pointerup',onEnd);window.addEventListener('pointercancel',onCancel);
    });
  }
}
function bankMatches(e,term,muscle,equipment){const q=normalizedName(term||''),hay=normalizedName([e.name,...(e.alternatives||[]),e.notes||''].join(' '));return(!q||hay.includes(q))&&(!muscle||e.muscleGroup===muscle)&&(!equipment||e.equipment===equipment);}
function openBankPicker(onPick,opts={}){
  ensureExerciseBank(state);const m=document.querySelector('#modal'),b=document.querySelector('#modalBody');let filters={q:'',muscle:'',equipment:''};
  const draw=()=>{const items=(state.exerciseBank||[]).filter(e=>bankMatches(e,filters.q,filters.muscle,filters.equipment));b.innerHTML=`<h3>Velg fra øvelsesbanken</h3><div class="stack"><input id="bankSearch" type="search" placeholder="Søk etter øvelse" value="${esc(filters.q)}"><div class="bank-filter-grid"><select id="bankMuscle"><option value="">Alle muskelgrupper</option>${MUSCLE_GROUPS.map(x=>`<option ${filters.muscle===x?'selected':''}>${esc(x)}</option>`).join('')}</select><select id="bankEquipment"><option value="">Alt utstyr</option>${EQUIPMENT_TYPES.map(x=>`<option ${filters.equipment===x?'selected':''}>${esc(x)}</option>`).join('')}</select></div><div class="bank-list">${items.map(e=>`<button type="button" class="bank-item" data-bank-pick="${e.id}"><span><strong>${esc(e.name)}</strong><small>${e.targetSets} × ${esc(e.targetReps||'–')}${e.bodyweight?' · KV':''} · ${esc(e.muscleGroup||'Annet')} · ${esc(e.equipment||'Annet')}</small></span><span>+</span></button>`).join('')||'<div class="empty small">Ingen treff.</div>'}</div>${opts.allowCreate?'<button type="button" class="ghost" id="bankQuickCreate">+ Opprett ny øvelse</button>':''}<button type="button" id="pickerCancel" class="ghost">Tilbake</button></div>`;const search=b.querySelector('#bankSearch'),mus=b.querySelector('#bankMuscle'),eq=b.querySelector('#bankEquipment');search.oninput=()=>{filters.q=search.value;const q=filters.q,m=filters.muscle,equip=filters.equipment;b.querySelectorAll('[data-bank-pick]').forEach(x=>{const item=state.exerciseBank.find(z=>z.id===x.dataset.bankPick);x.style.display=item&&bankMatches(item,q,m,equip)?'':'none';});};mus.onchange=()=>{filters.muscle=mus.value;draw();};eq.onchange=()=>{filters.equipment=eq.value;draw();};b.querySelectorAll('[data-bank-pick]').forEach(x=>x.onclick=()=>{const item=state.exerciseBank.find(e=>e.id===x.dataset.bankPick);if(item){m.close();onPick(clone(item));}});const back=b.querySelector('#pickerCancel');if(back)back.onclick=()=>{m.close();if(opts.onCancel)opts.onCancel();};const qc=b.querySelector('#bankQuickCreate');if(qc)qc.onclick=()=>openExerciseBankEditor(null,item=>{m.close();onPick(item);},()=>openBankPicker(onPick,opts));};draw();if(!m.open)m.showModal();
}
function openExerciseBank(){
  ensureExerciseBank(state);const m=document.querySelector('#modal'),b=document.querySelector('#modalBody');let filters={q:'',muscle:'',equipment:''};
  const draw=()=>{const items=(state.exerciseBank||[]).filter(e=>bankMatches(e,filters.q,filters.muscle,filters.equipment));b.innerHTML=`<div class="row wrap"><h3>Øvelsesbank</h3><button type="button" class="ghost compact" id="bankClose">Lukk ×</button></div><p class="muted small">Banken deles mellom Håvard og Stine via Supabase. Søk og filtrer på muskelgruppe eller utstyr.</p><div class="stack"><input id="bankManageSearch" type="search" placeholder="Søk i ${(state.exerciseBank||[]).length} øvelser" value="${esc(filters.q)}"><div class="bank-filter-grid"><select id="bankManageMuscle"><option value="">Alle muskelgrupper</option>${MUSCLE_GROUPS.map(x=>`<option ${filters.muscle===x?'selected':''}>${esc(x)}</option>`).join('')}</select><select id="bankManageEquipment"><option value="">Alt utstyr</option>${EQUIPMENT_TYPES.map(x=>`<option ${filters.equipment===x?'selected':''}>${esc(x)}</option>`).join('')}</select></div><button type="button" class="primary" id="bankNew">+ Ny øvelse</button><div class="bank-list manage">${items.map(e=>`<div class="bank-manage-row"><button type="button" class="bank-main" data-bank-edit="${e.id}"><strong>${esc(e.name)}</strong><small>${e.targetSets} × ${esc(e.targetReps||'–')}${e.bodyweight?' · KV':''} · ${esc(e.muscleGroup||'Annet')} · ${esc(e.equipment||'Annet')}</small></button><button type="button" class="text-danger" data-bank-del="${e.id}">Slett</button></div>`).join('')||'<div class="empty small">Ingen treff.</div>'}</div><button value="cancel" class="ghost">Lukk</button></div>`;const search=b.querySelector('#bankManageSearch'),mus=b.querySelector('#bankManageMuscle'),eq=b.querySelector('#bankManageEquipment');search.oninput=()=>{filters.q=search.value;const q=filters.q,m=filters.muscle,equip=filters.equipment;b.querySelectorAll('.bank-manage-row').forEach(row=>{const btn=row.querySelector('[data-bank-edit]');const item=btn&&state.exerciseBank.find(z=>z.id===btn.dataset.bankEdit);row.style.display=item&&bankMatches(item,q,m,equip)?'':'none';});};mus.onchange=()=>{filters.muscle=mus.value;draw();};eq.onchange=()=>{filters.equipment=eq.value;draw();};b.querySelector('#bankNew').onclick=()=>openExerciseBankEditor(null,()=>openExerciseBank());b.querySelectorAll('[data-bank-edit]').forEach(x=>x.onclick=()=>openExerciseBankEditor(x.dataset.bankEdit,()=>openExerciseBank()));b.querySelectorAll('[data-bank-del]').forEach(x=>x.onclick=()=>{const item=state.exerciseBank.find(e=>e.id===x.dataset.bankDel);if(!item)return;const used=(state.profiles||[]).some(p=>(p.programs||[]).some(pr=>(pr.exercises||[]).some(e=>normalizedName(e.name)===normalizedName(item.name))));const msg=used?`«${item.name}» brukes i et program. Slette den fra banken likevel? Programmet påvirkes ikke.`:`Slette «${item.name}» fra øvelsesbanken?`;if(confirm(msg)){state.exerciseBank=state.exerciseBank.filter(e=>e.id!==item.id);saveState();draw();}});b.querySelector('#bankClose').onclick=()=>m.close();};draw();if(!m.open)m.showModal();
}
function openExerciseBankEditor(id,onSaved,onCancel=null){
  const m=document.querySelector('#modal'),b=document.querySelector('#modalBody'),existing=id?(state.exerciseBank||[]).find(e=>e.id===id):null,e=existing?clone(existing):{id:uid(),name:'',targetSets:3,targetReps:'8–12',tempo:'',restSeconds:120,notes:'',bodyweight:false,muscleGroup:'Annet',equipment:'Annet',alternatives:[]};
  b.innerHTML=`<div class="row wrap"><h3>${existing?'Rediger øvelse':'Ny øvelse'}</h3><button type="button" id="bankEditorClose" class="ghost compact">Tilbake</button></div><div class="stack"><label>Navn<input id="beName" value="${esc(e.name)}" placeholder="F.eks. Face pull"></label><div class="grid3"><label>Standard sett<input id="beSets" type="number" min="1" value="${e.targetSets||3}"></label><label>Reps<input id="beReps" value="${esc(e.targetReps||'8–12')}"></label><label>Pause<input id="beRest" type="number" min="0" value="${e.restSeconds??120}"></label></div><label>Tempo<input id="beTempo" value="${esc(e.tempo||'')}"></label><label>RIR / notat<input id="beNotes" value="${esc(e.notes||'')}"></label><div class="grid2"><label>Muskelgruppe<select id="beMuscle">${MUSCLE_GROUPS.map(x=>`<option ${x===(e.muscleGroup||inferMuscleGroup(e.name))?'selected':''}>${esc(x)}</option>`).join('')}</select></label><label>Utstyr/type<select id="beEquipment">${EQUIPMENT_TYPES.map(x=>`<option ${x===(e.equipment||inferEquipment(e.name,e.bodyweight))?'selected':''}>${esc(x)}</option>`).join('')}</select></label></div><label>Alternative navn/varianter <span class="muted small">(kommaseparert)</span><input id="beAlts" value="${esc((e.alternatives||[]).join(', '))}"></label><label class="toggle-row"><input id="beBw" type="checkbox" ${e.bodyweight?'checked':''}><span><strong>Kroppsvektøvelse</strong><small>Bruk KV, +kg og −kg/assistanse.</small></span></label><div class="grid2"><button value="cancel" class="ghost">Avbryt</button><button type="button" class="primary" id="beSave">Lagre</button></div></div>`;
  b.querySelector('#bankEditorClose').onclick=()=>onCancel?onCancel():openExerciseBank();
   b.querySelector('#beSave').onclick=()=>{const name=b.querySelector('#beName').value.trim();if(!name)return toast('Skriv navn på øvelsen');const item={id:e.id,name,targetSets:Math.max(1,+b.querySelector('#beSets').value||3),targetReps:b.querySelector('#beReps').value.trim(),tempo:b.querySelector('#beTempo').value.trim(),restSeconds:Math.max(0,+b.querySelector('#beRest').value||0),notes:b.querySelector('#beNotes').value.trim(),bodyweight:b.querySelector('#beBw').checked,muscleGroup:b.querySelector('#beMuscle').value,equipment:b.querySelector('#beBw').checked?'Kroppsvekt':b.querySelector('#beEquipment').value,alternatives:b.querySelector('#beAlts').value.split(',').map(x=>x.trim()).filter(Boolean)};const duplicate=(state.exerciseBank||[]).find(x=>x.id!==item.id&&normalizedName(x.name)===normalizedName(item.name));if(duplicate)return toast('Denne øvelsen finnes allerede i banken');const idx=(state.exerciseBank||[]).findIndex(x=>x.id===item.id);if(idx>=0)state.exerciseBank[idx]=item;else state.exerciseBank.push(item);state.exerciseBank.sort((a,b)=>a.name.localeCompare(b.name,'nb'));saveState();m.close();toast('Øvelse lagret i banken');if(onSaved)onSaved(clone(item));};if(!m.open)m.showModal();
}
function renderPrograms(){const el=document.querySelector('#programs'),p=profile();el.innerHTML=`<div class="card hero"><div><span class="eyebrow">${esc(p.name)}</span><h2>Treningsprogram</h2><p class="muted small">Programmet kan redigeres direkte på telefonen. Endringer synkroniseres til Supabase og den andre telefonen.</p></div><button class="ghost compact" id="newProgram">+ Nytt program</button></div><div class="card exercise-bank-card"><div class="row wrap"><div><span class="eyebrow">Felles for begge profiler</span><h3>Øvelsesbank</h3><p class="muted small">${(state.exerciseBank||[]).length} øvelser. Legg til nye øvelser én gang og bruk dem i hvilket som helst program.</p></div><button class="primary compact" id="openExerciseBank">Åpne bank</button></div></div><div class="card program-tools"><div class="row wrap"><div><h3>Programverktøy</h3><p class="muted small">Eksporter, importer eller gå tilbake til appens originalmal uten å påvirke treningshistorikken.</p></div></div><div class="program-tool-grid"><button class="ghost" id="exportPrograms">Eksporter program</button><label class="file-label program-import">Importer program<input type="file" id="importPrograms" accept="application/json,.json"></label><button class="danger" id="resetPrograms">Tilbakestill til original</button></div></div>${p.programs.map(pr=>`<div class="card program-card"><div class="row wrap"><div><h3>${esc(pr.name)}</h3><div class="muted small">${pr.exercises.filter(e=>!e.optional).length} faste · ${pr.exercises.filter(e=>e.optional).length} valgfrie</div></div><div class="actions"><button class="ghost compact" data-edit-program="${pr.id}">Rediger</button><button class="primary compact" data-start="${pr.id}">Start</button></div></div><p class="muted small">${esc(pr.notes)}</p>${pr.exercises.map(e=>`<div class="exercise"><div class="exercise-title">${esc(e.name)} ${e.optional?'<span class="tag">Valgfri</span>':''} ${isBodyweightExercise(e)?'<span class="tag bw-tag">KV</span>':''}</div><div class="meta">${e.targetSets} × ${esc(e.targetReps||'–')}${e.tempo?` · Tempo ${esc(e.tempo)}`:''}${e.notes?` · ${esc(e.notes)}`:''}${e.alternatives?.length?` · Alt: ${esc(e.alternatives.join(' / '))}`:''}</div><div class="last">${lastSummary(e.name)?`Sist: ${esc(lastSummary(e.name))}`:'Ingen tidligere logg'}</div></div>`).join('')}</div>`).join('')}`;
  el.querySelector('#openExerciseBank').onclick=openExerciseBank;el.querySelectorAll('[data-start]').forEach(b=>b.onclick=()=>openWorkoutSetup(p.programs.find(x=>x.id===b.dataset.start)));el.querySelectorAll('[data-edit-program]').forEach(b=>b.onclick=()=>openProgramEditor(b.dataset.editProgram));el.querySelector('#newProgram').onclick=()=>openProgramEditor(null);el.querySelector('#exportPrograms').onclick=exportPrograms;el.querySelector('#importPrograms').onchange=importPrograms;el.querySelector('#resetPrograms').onclick=resetProgramsToOriginal;
}
function openProgramEditor(programId,restore=null){
  const p=profile(),pr=programId?p.programs.find(x=>x.id===programId):{id:uid(),name:'Nytt program',notes:'',exercises:[]};const m=document.querySelector('#modal'),b=document.querySelector('#modalBody');b.innerHTML=`<h3>Rediger program</h3><div class="stack"><label>Navn<input id="peName" value="${esc(restore?.name??pr.name)}"></label><label>Notat<textarea id="peNotes">${esc(restore?.notes??pr.notes??'')}</textarea></label><div id="peExercises"></div><button type="button" class="ghost" id="peAddBank">+ Velg fra søkbar øvelsesbank</button><button type="button" class="ghost" id="peAdd">+ Ny øvelse</button><div class="grid2"><button value="cancel" class="ghost">Avbryt</button><button type="button" class="primary" id="peSave">Lagre</button></div>${programId?'<button type="button" class="danger" id="peDelete">Slett program</button>':''}</div>`;m.showModal();const rows=b.querySelector('#peExercises');let draft=clone(restore?.exercises||pr.exercises||[]).map(e=>({...e,bodyweight:typeof e.bodyweight==='boolean'?e.bodyweight:isBodyweightExercise(e.name)}));
  function draw(){rows.innerHTML=draft.map((e,i)=>`<div class="editor-row reorder-item" data-reorder-id="${e.id}"><div class="row"><div class="reorder-title"><button type="button" class="drag-handle" aria-label="Dra for å endre rekkefølge">☰</button><strong>${i+1}. ${esc(e.name||'Ny øvelse')}</strong></div><div class="actions"><button type="button" class="text-danger" data-rm="${i}">Fjern</button></div></div><label>Øvelse<input data-i="${i}" data-k="name" value="${esc(e.name||'')}"></label><div class="grid3"><label>Sett<input type="number" min="1" data-i="${i}" data-k="targetSets" value="${e.targetSets||3}"></label><label>Reps<input data-i="${i}" data-k="targetReps" value="${esc(e.targetReps||'')}"></label><label>Pause<input type="number" min="0" data-i="${i}" data-k="restSeconds" value="${e.restSeconds??120}"></label></div><div class="grid2"><label>Tempo<input data-i="${i}" data-k="tempo" value="${esc(e.tempo||'')}"></label><label>RIR / notat<input data-i="${i}" data-k="notes" value="${esc(e.notes||'')}"></label></div><label>Alternative øvelser <span class="muted small">(kommaseparert)</span><input data-i="${i}" data-k="alternativesText" value="${esc((e.alternatives||[]).join(', '))}"></label><label class="toggle-row"><input type="checkbox" data-i="${i}" data-k="bodyweight" ${e.bodyweight?'checked':''}><span><strong>Kroppsvektøvelse</strong><small>Logger KV, +kg eller −kg/assistanse i stedet for vanlig kg.</small></span></label><label class="toggle-row"><input type="checkbox" data-i="${i}" data-k="optional" ${e.optional?'checked':''}><span>Valgfri øvelse</span></label></div>`).join('');
    rows.querySelectorAll('input').forEach(inp=>inp.oninput=()=>{const i=+inp.dataset.i,k=inp.dataset.k;if(!k)return;if(k==='optional'||k==='bodyweight')draft[i][k]=inp.checked;else if(k==='targetSets'||k==='restSeconds')draft[i][k]=Number(inp.value)||0;else if(k==='alternativesText')draft[i].alternatives=inp.value.split(',').map(x=>x.trim()).filter(Boolean);else draft[i][k]=inp.value;});
    rows.querySelectorAll('[data-rm]').forEach(x=>x.onclick=()=>{draft.splice(+x.dataset.rm,1);draw();});enableReorder(rows,'.reorder-item','.drag-handle',ids=>{const byId=new Map(draft.map(e=>[String(e.id),e]));draft=ids.map(id=>byId.get(String(id))).filter(Boolean);draw();});
  }
  draw();b.querySelector('#peAddBank').onclick=()=>{
    const snapshot={name:b.querySelector('#peName').value,notes:b.querySelector('#peNotes').value,exercises:clone(draft)};
    openBankPicker(item=>{snapshot.exercises.push({...clone(item),id:uid(),optional:false});openProgramEditor(programId,snapshot);},
      {allowCreate:true,onCancel:()=>openProgramEditor(programId,snapshot)});
  };b.querySelector('#peAdd').onclick=()=>{draft.push({id:uid(),name:'',targetSets:3,targetReps:'8–12',tempo:'',restSeconds:120,notes:'',optional:false,bodyweight:false,alternatives:[]});draw();};b.querySelector('#peSave').onclick=()=>{const saved={id:pr.id,name:b.querySelector('#peName').value.trim()||'Program',notes:b.querySelector('#peNotes').value.trim(),exercises:draft.filter(e=>e.name.trim()).map(e=>({...e,id:e.id||uid()}))};saved.exercises.forEach(addOrUpdateBankExercise);const idx=p.programs.findIndex(x=>x.id===pr.id);if(idx>=0)p.programs[idx]=saved;else p.programs.push(saved);saveState();m.close();renderAll();toast('Program lagret');};if(programId)b.querySelector('#peDelete').onclick=()=>{if(confirm('Slette programmet? Historikken påvirkes ikke.')){p.programs=p.programs.filter(x=>x.id!==programId);saveState();m.close();renderAll();}};
}
function activeExerciseChoices(e){
  const names=[e.originalName||e.name,e.name,...(e.alternatives||[])].map(x=>String(x||'').trim()).filter(Boolean),out=[],seen=new Set();
  for(const n of names){const k=normalizedName(n);if(k&&!seen.has(k)){seen.add(k);out.push(n);}}
  return out;
}
function applyActiveExerciseChoice(e,name,bankItem=null){
  if(!e||!name)return;
  const item=bankItem||(state.exerciseBank||[]).find(x=>normalizedName(x.name)===normalizedName(name));
  e.name=name;
  if(item){
    e.bodyweight=typeof item.bodyweight==='boolean'?item.bodyweight:isBodyweightExercise(name);
    e.targetReps=item.targetReps||e.targetReps;e.tempo=item.tempo||e.tempo;e.restSeconds=item.restSeconds??e.restSeconds;e.notes=item.notes||e.notes;
  }else e.bodyweight=isBodyweightExercise(name);
  for(const st of e.sets||[]){
    if(e.bodyweight){if(!st.loadType||st.loadType==='kg')st.loadType='bw';}
    else st.loadType='kg';
  }
  saveState();renderWorkout();
}
function renderWorkout(){
  const el=document.querySelector('#workout'),a=state.active;if(!a){el.innerHTML=`<div class="card empty"><h2>Ingen pågående økt</h2><p>Start en økt fra Program-fanen.</p></div>`;return;}
  el.innerHTML=`${state.timer?`<div class="timer"><span>Pause</span><strong id="timerValue">0:00</strong><button class="ghost compact" id="stopTimer">Stopp</button></div>`:''}<div class="card hero"><div><span class="eyebrow">${esc(profile().name)}</span><h2>${esc(a.name)}</h2><p class="muted small">Startet ${fmtDate(a.startedAt)}</p></div><div class="right"><div class="muted small">Ekstern kg-volum</div><strong id="workoutVolume">${Math.round(volume(a)).toLocaleString('nb-NO')} kg</strong></div></div><div id="workoutExerciseList">${a.exercises.map(e=>{const sug=progressionSuggestion(e),choices=activeExerciseChoices(e),lc=lastComment(e.name),bw=isBodyweightExercise(e);return`<div class="card workout-exercise reorder-item" data-reorder-id="${e.id}"><div class="row wrap"><div class="reorder-title"><button type="button" class="drag-handle" aria-label="Dra for å endre rekkefølge">☰</button><div><h3>${esc(e.name)}</h3><div class="meta">${esc(e.targetReps||'')}${e.tempo?` · Tempo ${esc(e.tempo)}`:''}${e.notes?` · ${esc(e.notes)}`:''}${bw?' · Kroppsvekt':''}</div></div></div><div class="actions"><button type="button" class="ghost compact" data-move-up="${e.id}" aria-label="Flytt øvelsen opp">↑</button><button type="button" class="ghost compact" data-move-down="${e.id}" aria-label="Flytt øvelsen ned">↓</button><button class="text-danger" data-remove="${e.id}">Fjern</button></div></div><label class="variant">Bytt øvelse<select data-variant="${e.id}">${choices.map(x=>`<option value="${esc(x)}" ${normalizedName(x)===normalizedName(e.name)?'selected':''}>${esc(x)}</option>`).join('')}<option value="__bank__">Velg fra øvelsesbanken…</option></select></label>${lastSummary(e.name)?`<div class="last highlight">Sist: ${esc(lastSummary(e.name))}</div>`:''}${lc?`<div class="last-comment"><strong>Kommentar sist:</strong> ${esc(lc)}</div>`:''}${sug?`<div class="suggestion"><strong>${esc(sug.title)}</strong><br>${esc(sug.detail)}</div>`:''}${bw?`<div class="set-head bw"><span>#</span><span>Type</span><span>kg</span><span>reps</span><span>RIR</span><span>✓</span></div>`:`<div class="set-head"><span>#</span><span>kg</span><span>reps</span><span>RIR</span><span>✓</span></div>`}${e.sets.map((st,i)=>bw?`<div class="set-row bw"><span>${i+1}</span><select data-e="${e.id}" data-s="${st.id}" data-k="loadType"><option value="bw" ${inferredLoadType(st,e)==='bw'?'selected':''}>KV</option><option value="bw_plus" ${inferredLoadType(st,e)==='bw_plus'?'selected':''}>+kg</option><option value="bw_assist" ${inferredLoadType(st,e)==='bw_assist'?'selected':''}>−kg</option></select><input inputmode="decimal" data-e="${e.id}" data-s="${st.id}" data-k="weight" value="${inferredLoadType(st,e)==='bw'?'':esc(st.weight)}" placeholder="${inferredLoadType(st,e)==='bw'?'—':'kg'}" ${inferredLoadType(st,e)==='bw'?'disabled':''}><input inputmode="numeric" data-e="${e.id}" data-s="${st.id}" data-k="reps" value="${esc(st.reps)}"><input inputmode="decimal" data-e="${e.id}" data-s="${st.id}" data-k="rir" value="${esc(st.rir)}"><button class="check ${st.completed?'done':''}" data-check-e="${e.id}" data-check-s="${st.id}">${st.completed?'✓':'○'}</button></div>`:`<div class="set-row"><span>${i+1}</span><input inputmode="decimal" data-e="${e.id}" data-s="${st.id}" data-k="weight" value="${esc(st.weight)}"><input inputmode="numeric" data-e="${e.id}" data-s="${st.id}" data-k="reps" value="${esc(st.reps)}"><input inputmode="decimal" data-e="${e.id}" data-s="${st.id}" data-k="rir" value="${esc(st.rir)}"><button class="check ${st.completed?'done':''}" data-check-e="${e.id}" data-check-s="${st.id}">${st.completed?'✓':'○'}</button></div>`).join('')}<div class="actions wrap"><button class="ghost compact" data-addset="${e.id}">+ Sett</button><button type="button" class="ghost compact" data-removeset="${e.id}" ${e.sets.length<=1?'disabled':''}>− Siste sett</button></div><label class="exercise-comment">Kommentar til øvelsen<textarea data-ex-comment="${e.id}" placeholder="F.eks. god kontroll, skulderen kjentes bra, tempo brøt på siste sett …">${esc(e.comment||'')}</textarea></label></div>`}).join('')}</div><div class="card"><button class="ghost" id="addExercise">+ Engangsøvelse</button><label>Øktnotat<textarea id="workoutNotes" placeholder="Hvordan føltes økten?">${esc(a.notes||'')}</textarea></label><div class="grid2"><button class="danger" id="cancelWorkout">Avbryt</button><button class="primary" id="finishWorkout">Lagre økt</button></div></div>`;
  el.querySelectorAll('[data-e][data-k]').forEach(x=>{const handler=()=>updateSet(x.dataset.e,x.dataset.s,x.dataset.k,x.value);x.oninput=handler;x.onchange=handler;});
  el.querySelectorAll('[data-check-e]').forEach(b=>b.onclick=()=>toggleSet(b.dataset.checkE,b.dataset.checkS));el.querySelectorAll('[data-addset]').forEach(b=>b.onclick=()=>addSet(b.dataset.addset));el.querySelectorAll('[data-remove]').forEach(b=>b.onclick=()=>removeExercise(b.dataset.remove));el.querySelectorAll('[data-removeset]').forEach(b=>b.onclick=()=>removeLastSet(b.dataset.removeset));el.querySelectorAll('[data-move-up],[data-move-down]').forEach(b=>b.onclick=()=>{const i=a.exercises.findIndex(e=>e.id===(b.dataset.moveUp||b.dataset.moveDown)),step=b.dataset.moveUp?-1:1;if(i<0||i+step<0||i+step>=a.exercises.length)return;[a.exercises[i],a.exercises[i+step]]=[a.exercises[i+step],a.exercises[i]];saveState();renderWorkout();});el.querySelectorAll('[data-ex-comment]').forEach(x=>x.oninput=()=>updateExerciseComment(x.dataset.exComment,x.value));
  el.querySelectorAll('[data-variant]').forEach(x=>x.onchange=()=>{const e=a.exercises.find(e=>e.id===x.dataset.variant);if(!e)return;if(x.value==='__bank__'){x.value=e.name;openBankPicker(item=>applyActiveExerciseChoice(e,item.name,item));return;}applyActiveExerciseChoice(e,x.value);});
  const stop=el.querySelector('#stopTimer');if(stop)stop.onclick=stopTimer;el.querySelector('#workoutNotes').oninput=e=>{a.notes=e.target.value;saveState();};el.querySelector('#cancelWorkout').onclick=()=>{if(confirm('Avbryte pågående økt?')){state.active=null;state.timer=null;saveState();renderAll();}};el.querySelector('#finishWorkout').onclick=finishWorkout;el.querySelector('#addExercise').onclick=()=>openBankPicker(item=>{const ex={...clone(item),id:uid(),sourceExerciseID:null,originalName:item.name,comment:'',sets:Array.from({length:Number(item.targetSets)||3},()=>newSetForExercise(item,false))};a.exercises.push(ex);saveState();renderWorkout();},{allowCreate:true});enableReorder(el.querySelector('#workoutExerciseList'),'.workout-exercise','.drag-handle',ids=>{const byId=new Map(a.exercises.map(e=>[String(e.id),e]));a.exercises=ids.map(id=>byId.get(String(id))).filter(Boolean);saveState();renderWorkout();});if(state.timer)tickTimer();
}
function updateWorkoutSummary(){const el=document.querySelector('#workoutVolume');if(el&&state.active)el.textContent=`${Math.round(volume(state.active)).toLocaleString('nb-NO')} kg`;}
function openAddExercise(){const m=document.querySelector('#modal'),b=document.querySelector('#modalBody');b.innerHTML=`<h3>Engangsøvelse</h3><p class="muted small">Legges bare til i dagens økt og endrer ikke programmalen.</p><div class="stack"><label>Navn<input id="xName" placeholder="F.eks. Face pull"></label><div class="grid2"><label>Sett<input id="xSets" type="number" min="1" value="3"></label><label>Reps<input id="xReps" value="8–12"></label></div><div class="grid2"><label>Tempo<input id="xTempo"></label><label>Pause (sek)<input id="xRest" type="number" min="0" value="120"></label></div><label>RIR / notat<input id="xNotes" value="RIR 1–2"></label><div class="grid2"><button value="cancel" class="ghost">Avbryt</button><button type="button" class="primary" id="saveExtra">Legg til</button></div></div>`;m.showModal();b.querySelector('#saveExtra').onclick=()=>{const name=b.querySelector('#xName').value.trim();if(!name)return toast('Skriv navn på øvelsen');const n=Math.max(1,+b.querySelector('#xSets').value||3);state.active.exercises.push({id:uid(),name,originalName:name,targetReps:b.querySelector('#xReps').value.trim(),tempo:b.querySelector('#xTempo').value.trim(),restSeconds:Math.max(0,+b.querySelector('#xRest').value||0),notes:b.querySelector('#xNotes').value.trim(),comment:'',alternatives:[],sets:Array.from({length:n},()=>({id:uid(),weight:'',reps:'',rir:'',completed:false}))});saveState();m.close();renderWorkout();};}

function exercisePR(sess,e){
  const date=Date.parse(sess.finishedAt||sess.startedAt||'');
  const previous=profileSessions().filter(x=>x!==sess&&Date.parse(x.finishedAt||x.startedAt||'')<date)
    .flatMap(x=>(x.exercises||[]).filter(y=>normalizedName(y.name)===normalizedName(e.name)));
  if(!previous.length)return false;
  const score=x=>Math.max(0,...(x.sets||[]).filter(st=>st.completed||num(st.reps)>0).map(st=>
    isBodyweightExercise(x)?(loadRank(st,x)+1000)*101+num(st.reps):oneRM(num(st.weight),num(st.reps))));
  const best=Math.max(0,...previous.map(score));
  return score(e)>best;
}
function deviceProfileID(){
  const id=cloudMeta?.deviceProfileId;
  return state.profiles.some(p=>p.id===id)?id:null;
}
function setDeviceProfile(id){
  const p=state.profiles.find(x=>x.id===id);
  if(!p)return toast('Velg Håvard eller Stine først');
  if(state.active&&state.active.profileId!==p.id&&!confirm('Det pågår en økt på en annen profil. Bytte til din profil likevel?'))return;
  cloudMeta.deviceProfileId=p.id;
  state.currentProfileId=p.id;
  saveCloudMeta();
  saveState();
  renderAll();
  toast('Denne telefonen brukes av '+p.name);
}
function exerciseReactionsMarkup(sess,e,si,ei){
  const owner=state.currentProfileId,reactor=deviceProfileID(),
    reactions=e.reactions&&typeof e.reactions==='object'?e.reactions:{};
  const labels=Object.entries(reactions).filter(([pid,emoji])=>state.profiles.some(p=>p.id===pid)&&['❤️','🔥','💪','👏','😍','🏆'].includes(emoji))
    .map(([pid,emoji])=>`<span class="reaction-label">${esc(state.profiles.find(p=>p.id===pid)?.name||pid)} ${emoji}</span>`).join('');
  if(!reactor||!state.profiles.some(p=>p.id===reactor))
    return `<div class="reaction-area">${labels||''}<p class="muted small">Velg «Denne telefonen brukes primært av» under Data for å reagere.</p></div>`;
  if(reactor===owner)return `<div class="reaction-area">${labels||'<span class="muted small">Ingen reaksjoner ennå</span>'}</div>`;
  return `<div class="reaction-area">${labels}<div class="reaction-buttons" aria-label="Reager på ${esc(e.name)}">
    ${['❤️','🔥','💪','👏','😍','🏆'].map(emoji=>`<button type="button" class="reaction-btn ${reactions[reactor]===emoji?'selected':''}" data-react-session="${si}" data-react-ex="${ei}" data-react-emoji="${emoji}" aria-label="Reager med ${emoji}" aria-pressed="${reactions[reactor]===emoji}">${emoji}</button>`).join('')}
    </div></div>`;
}
function setExerciseReaction(si,ei,emoji){
  const actor=deviceProfileID(),target=state.currentProfileId;
  if(!actor||actor===target)return toast('Velg din egen telefonprofil under Data');
  const sess=profileSessions(target)[si],ex=sess?.exercises?.[ei];
  if(!ex)return;
  if(!['❤️','🔥','💪','👏','😍','🏆'].includes(emoji))return;
  if(!ex.reactions||typeof ex.reactions!=='object')ex.reactions={};
  if(ex.reactions[actor]===emoji)delete ex.reactions[actor];else ex.reactions[actor]=emoji;
  saveState();renderHistory();
}
function renderHistory(){
  const el=document.querySelector('#history'),sessions=profile().sessions;
  if(!sessions.length){el.innerHTML=`<div class="card empty"><h2>Ingen historikk for ${esc(profile().name)}</h2><p>Fullfør en økt, så vises den her.</p></div>`;return;}
  el.innerHTML=`<div class="card hero"><div><span class="eyebrow">${esc(profile().name)}</span><h2>Historikk</h2><p class="muted small">${sessions.length} lagrede økter · Velg profil øverst for å se hverandres resultater.</p></div></div>
  ${sessions.map((sess,si)=>`<div class="card"><div class="row wrap"><div><h3>${esc(sess.name)}</h3><div class="muted small">${fmtDate(sess.finishedAt||sess.startedAt)}</div></div>
    <div class="right"><div class="muted small">Ekstern kg-volum</div><strong>${Math.round(volume(sess)).toLocaleString('nb-NO')} kg</strong></div></div>
    ${(sess.exercises||[]).map((e,ei)=>`<div class="exercise"><div class="exercise-title">${esc(e.name)}${exercisePR(sess,e)?' <span class="tag">🏆 Ny PR</span>':''}</div>
    ${(e.sets||[]).filter(x=>x.completed||x.reps).map((st,i)=>`<div class="history-set">Sett ${i+1}: ${esc(loadLabel(st,e))} × ${st.reps||0}${st.rir!==''&&st.rir!=null?` · RIR ${st.rir}`:''}</div>`).join('')}
    ${e.comment?`<div class="history-comment">${esc(e.comment)}</div>`:''}
    ${exerciseReactionsMarkup(sess,e,si,ei)}</div>`).join('')}
    ${sess.notes?`<p class="muted small note-box">${esc(sess.notes)}</p>`:''}
    <div class="history-actions"><button class="ghost compact" data-edit-session="${si}">Rediger økt</button><button class="text-danger" data-del-session="${si}">Slett økt</button></div></div>`).join('')}`;
  el.querySelectorAll('[data-react-session]').forEach(b=>b.onclick=()=>setExerciseReaction(+b.dataset.reactSession,+b.dataset.reactEx,b.dataset.reactEmoji));
  el.querySelectorAll('[data-edit-session]').forEach(b=>b.onclick=()=>openSessionEditor(+b.dataset.editSession));
  el.querySelectorAll('[data-del-session]').forEach(b=>b.onclick=()=>{
    if(confirm('Slette denne økten permanent?')){
      sessions.splice(+b.dataset.delSession,1);saveState();renderHistory();renderWeek();renderProgress();
    }
  });
}
function openSessionEditor(index){
  const profileId=state.currentProfileId,initialProfile=state.profiles.find(p=>p.id===profileId),original=initialProfile?.sessions?.[index];if(!original)return;const sessionId=original.id||null,sessionStartedAt=original.startedAt||null,sessionFinishedAt=original.finishedAt||null;let draft=clone(original),m=document.querySelector('#modal'),b=document.querySelector('#modalBody');normalizeBodyweightData({profiles:[{programs:[],sessions:[draft]}]});
  function draw(){b.innerHTML=`<h3>Rediger gjennomført økt</h3><p class="muted small">Endringene erstatter den eksisterende økten og synkroniseres til den andre telefonen.</p><div class="stack"><label>Øktnavn<input id="seName" value="${esc(draft.name||'')}"></label><label>Dato og tid<input id="seDate" type="datetime-local" value="${localDateTimeValue(draft.finishedAt||draft.startedAt)}"></label><div id="seExercises">${(draft.exercises||[]).map((e,ei)=>{const bw=isBodyweightExercise(e);return`<div class="editor-row"><div class="row"><strong>${ei+1}. ${esc(e.name)}</strong><button type="button" class="text-danger" data-se-rm-ex="${ei}">Fjern øvelse</button></div><label>Øvelse<input data-se-ex-name="${ei}" value="${esc(e.name)}"></label><label class="toggle-row"><input type="checkbox" data-se-bw="${ei}" ${bw?'checked':''}><span><strong>Kroppsvektøvelse</strong><small>Bruk KV, +kg eller −kg/assistanse.</small></span></label>${(e.sets||[]).map((st,si)=>bw?`<div class="edit-set-row bw"><span>Sett ${si+1}</span><select data-se-load="${ei}:${si}"><option value="bw" ${inferredLoadType(st,e)==='bw'?'selected':''}>KV</option><option value="bw_plus" ${inferredLoadType(st,e)==='bw_plus'?'selected':''}>+kg</option><option value="bw_assist" ${inferredLoadType(st,e)==='bw_assist'?'selected':''}>−kg</option></select><input inputmode="decimal" data-se-set="${ei}:${si}:weight" value="${inferredLoadType(st,e)==='bw'?'':esc(st.weight??'')}" placeholder="kg" ${inferredLoadType(st,e)==='bw'?'disabled':''}><input inputmode="numeric" data-se-set="${ei}:${si}:reps" value="${esc(st.reps??'')}" placeholder="reps"><input inputmode="decimal" data-se-set="${ei}:${si}:rir" value="${esc(st.rir??'')}" placeholder="RIR"><button type="button" class="text-danger" data-se-rm-set="${ei}:${si}">×</button></div>`:`<div class="edit-set-row"><span>Sett ${si+1}</span><input inputmode="decimal" data-se-set="${ei}:${si}:weight" value="${esc(st.weight??'')}" placeholder="kg"><input inputmode="numeric" data-se-set="${ei}:${si}:reps" value="${esc(st.reps??'')}" placeholder="reps"><input inputmode="decimal" data-se-set="${ei}:${si}:rir" value="${esc(st.rir??'')}" placeholder="RIR"><button type="button" class="text-danger" data-se-rm-set="${ei}:${si}">×</button></div>`).join('')}<button type="button" class="ghost compact" data-se-add-set="${ei}">+ Sett</button><label>Kommentar<textarea data-se-comment="${ei}">${esc(e.comment||'')}</textarea></label></div>`}).join('')}</div><button type="button" class="ghost" id="seAddExercise">+ Legg til øvelse</button><label>Øktnotat<textarea id="seNotes">${esc(draft.notes||'')}</textarea></label><div class="grid2"><button value="cancel" class="ghost">Avbryt</button><button type="button" class="primary" id="seSave">Lagre endringer</button></div></div>`;
    b.querySelector('#seName').oninput=e=>draft.name=e.target.value;b.querySelector('#seDate').onchange=e=>{const d=new Date(e.target.value);if(!isNaN(d))draft.finishedAt=d.toISOString();};b.querySelector('#seNotes').oninput=e=>draft.notes=e.target.value;
    b.querySelectorAll('[data-se-ex-name]').forEach(x=>x.oninput=()=>{const e=draft.exercises[+x.dataset.seExName];e.name=x.value;if(typeof e.bodyweight!=='boolean')e.bodyweight=isBodyweightExercise(e.name);});
    b.querySelectorAll('[data-se-bw]').forEach(x=>x.onchange=()=>{const e=draft.exercises[+x.dataset.seBw];e.bodyweight=x.checked;for(const st of e.sets||[]){if(x.checked){if(!st.loadType)st.loadType=(num(st.weight)>1?'bw_plus':'bw');if(st.loadType==='bw')st.weight='';}else st.loadType='kg';}draw();});
    b.querySelectorAll('[data-se-comment]').forEach(x=>x.oninput=()=>draft.exercises[+x.dataset.seComment].comment=x.value);
    b.querySelectorAll('[data-se-load]').forEach(x=>x.onchange=()=>{const [ei,si]=x.dataset.seLoad.split(':');const st=draft.exercises[+ei].sets[+si];st.loadType=x.value;if(x.value==='bw')st.weight='';draw();});
    b.querySelectorAll('[data-se-set]').forEach(x=>x.oninput=()=>{const [ei,si,k]=x.dataset.seSet.split(':');draft.exercises[+ei].sets[+si][k]=x.value;draft.exercises[+ei].sets[+si].completed=true;});
    b.querySelectorAll('[data-se-rm-set]').forEach(x=>x.onclick=()=>{const [ei,si]=x.dataset.seRmSet.split(':');draft.exercises[+ei].sets.splice(+si,1);draw();});b.querySelectorAll('[data-se-add-set]').forEach(x=>x.onclick=()=>{const e=draft.exercises[+x.dataset.seAddSet];e.sets.push(newSetForExercise(e,true));draw();});b.querySelectorAll('[data-se-rm-ex]').forEach(x=>x.onclick=()=>{draft.exercises.splice(+x.dataset.seRmEx,1);draw();});
    b.querySelector('#seAddExercise').onclick=()=>{const e={id:uid(),name:'Ny øvelse',originalName:'Ny øvelse',targetReps:'',tempo:'',restSeconds:0,notes:'',comment:'',alternatives:[],bodyweight:false,sets:[]};e.sets=[newSetForExercise(e,true)];draft.exercises.push(e);draw();};
    b.querySelector('#seSave').onclick=async()=>{if(!draft.exercises.length)return toast('Økten må inneholde minst én øvelse');const targetProfile=state.profiles.find(p=>p.id===profileId);if(!targetProfile)return toast('Fant ikke profilen. Prøv igjen.');let targetIndex=sessionId?targetProfile.sessions.findIndex(s=>s.id===sessionId):-1;if(targetIndex<0&&sessionStartedAt)targetIndex=targetProfile.sessions.findIndex(s=>s.startedAt===sessionStartedAt&&(s.finishedAt||null)===sessionFinishedAt);if(targetIndex<0&&targetProfile.sessions[index])targetIndex=index;if(targetIndex<0)return toast('Fant ikke økten. Lukk og prøv igjen.');const btn=b.querySelector('#seSave');btn.disabled=true;btn.textContent='Lagrer…';targetProfile.sessions[targetIndex]=clone(draft);state.currentProfileId=profileId;cloudSuppressPullUntil=Date.now()+5000;saveState();clearTimeout(cloudSyncTimer);const payload=cloudPayload();let cloudOk=true;if(cloudReady&&cloudMeta.householdId)cloudOk=await pushCloud(payload);m.close();renderAll();toast(cloudOk?'Økten er korrigert':'Korrigert lokalt – skysynk feilet');};
  }
  draw();m.showModal();
}
function personalRecords(){const best=new Map();for(const sess of profile().sessions)for(const e of sess.exercises||[]){if(isBodyweightExercise(e))continue;for(const set of e.sets||[]){const v=oneRM(num(set.weight),num(set.reps));if(!v)continue;const key=normalizedName(e.name),cur=best.get(key);if(!cur||v>cur.e1rm)best.set(key,{name:e.name,weight:num(set.weight),reps:num(set.reps),e1rm:v,date:sess.finishedAt||sess.startedAt});}}return[...best.values()].sort((a,b)=>a.name.localeCompare(b.name,'nb'));}
function seriesFor(name){const key=normalizedName(name),arr=[];for(const sess of [...profile().sessions].reverse()){const e=(sess.exercises||[]).find(x=>normalizedName(x.name)===key);if(!e||isBodyweightExercise(e))continue;let best=0;for(const set of e.sets||[])best=Math.max(best,oneRM(num(set.weight),num(set.reps)));if(best)arr.push({date:sess.finishedAt||sess.startedAt,value:best});}return arr;}
function svgChart(data){if(data.length<2)return`<div class="muted small">Trenger minst to registrerte økter for graf.</div>`;const w=600,h=170,p=24,min=Math.min(...data.map(d=>d.value)),max=Math.max(...data.map(d=>d.value)),span=Math.max(1,max-min),coords=data.map((d,i)=>[p+i*(w-2*p)/(data.length-1),h-p-(d.value-min)*(h-2*p)/span]);const pts=coords.map(x=>x.join(',')).join(' ');return`<svg class="chart" viewBox="0 0 ${w} ${h}"><line x1="${p}" y1="${h-p}" x2="${w-p}" y2="${h-p}" stroke="currentColor" opacity=".2"/><polyline points="${pts}" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>${coords.map((x,i)=>`<circle cx="${x[0]}" cy="${x[1]}" r="5" fill="currentColor"><title>${data[i].value.toFixed(1)} kg e1RM</title></circle>`).join('')}</svg><div class="row small muted"><span>${data[0].value.toFixed(1)} kg</span><span>${data.at(-1).value.toFixed(1)} kg e1RM</span></div>`;}
function weekData(pid=state.currentProfileId){
  const p=state.profiles.find(x=>x.id===pid),start=Date.now()-7*86400000;
  const sessions=(p?.sessions||[]).filter(x=>{const t=Date.parse(x.finishedAt||x.startedAt||'');return Number.isFinite(t)&&t>=start&&t<=Date.now()+86400000;});
  const skipped=[],partial=[],replaced=[];let completed=0;
  const trained=new Set();
  for(const sess of sessions){
    const date=sess.finishedAt||sess.startedAt,exercises=sess.exercises||[];
    for(const e of exercises){
      const key=normalizedName(e.name),done=(e.sets||[]).filter(st=>st.completed||num(st.reps)>0).length;
      if(done)trained.add(key);
      const planned=Number(e.targetSets)||e.sets?.length||done;
      const info={id:`${sess.id||date}:${e.id||key}`,name:e.name,from:sess.name,date,
        remaining:Math.max(0,planned-done),planned,done,
        spec:{name:e.name,targetSets:Math.max(1,planned-done),targetReps:e.targetReps||'',tempo:e.tempo||'',restSeconds:e.restSeconds??120,notes:e.notes||'',bodyweight:e.bodyweight}};
      if(done>=planned)completed++;else if(done>0)partial.push(info);else skipped.push(info);
    }
    for(const e of sess.omittedExercises||[]){
      if(e.reason==='replaced'){replaced.push({name:e.name,from:sess.name,date});continue;}
      if(e.reason!=='skipped')continue;
      if(exercises.some(x=>normalizedName(x.name)===normalizedName(e.name)))continue;
      const info={id:`${sess.id||date}:omitted:${e.sourceExerciseID||e.name}`,name:e.name,from:sess.name,date,
        remaining:Number(e.targetSets)||3,planned:Number(e.targetSets)||3,done:0,
        spec:{name:e.name,targetSets:Number(e.targetSets)||3,targetReps:e.targetReps||'',tempo:e.tempo||'',restSeconds:e.restSeconds??120,notes:e.notes||'',bodyweight:e.bodyweight}};
      skipped.push(info);
    }
  }
  const unscheduled=[...new Set((p?.programs||[]).filter(x=>!/bonus/i.test(x.name||'')).flatMap(x=>x.exercises||[]).filter(e=>!e.optional&&!trained.has(normalizedName(e.name))).map(e=>e.name))].sort((a,b)=>a.localeCompare(b,'nb'));
  return {sessions,skipped,partial,replaced,completed,unscheduled};
}
function renderWeek(){
  const el=document.querySelector('#week');if(!el)return;
  const d=weekData(),pending=[...d.skipped,...d.partial];
  el.innerHTML=`<div class="card hero"><div><span class="eyebrow">${esc(profile().name)} · Siste syv dager</span><h2>Ukeoversikt</h2><p class="muted small">Bare øvelser fra økter du faktisk startet kan bli registrert som utelatt.</p></div></div>
    <div class="week-stats"><div><strong>${d.sessions.length}</strong><span>Økter</span></div><div><strong>${d.completed}</strong><span>Fullført</span></div><div><strong>${d.skipped.length}</strong><span>Utelatt</span></div><div><strong>${d.partial.length}</strong><span>Delvis</span></div></div>
    <div class="card"><h3>Utelatt eller delvis gjennomført</h3>
      <p class="muted small">Velg øvelsene du ønsker som forslag til en bonusøkt. Ingen av dem er obligatoriske.</p>
      ${pending.length?pending.map((x,i)=>`<label class="week-exercise"><input type="checkbox" data-week-select="${i}">
        <span><strong>${esc(x.name)}</strong><small>${esc(x.from)} · ${fmtDate(x.date)} · ${x.done?`${x.done} av ${x.planned} sett gjennomført`:`${x.planned} sett utelatt`}</small></span>
        <span class="tag">${x.done?'Delvis':'Utelatt'}</span></label>`).join(''):'<p class="muted small">Ingen utelatte eller ufullførte øvelser de siste syv dagene.</p>'}
      ${pending.length?'<button type="button" class="primary" id="weekBonus">Planlegg bonusøkt med valgte øvelser</button>':''}
      ${d.replaced.length?`<details class="week-details"><summary>${d.replaced.length} bevisste øvelsesbytter</summary>${d.replaced.map(x=>`<p class="muted small">${esc(x.name)} · ${esc(x.from)} · ${fmtDate(x.date)}</p>`).join('')}</details>`:''}
    </div>
    <div class="card"><details class="week-details"><summary>Ikke trent fra programmalene (${d.unscheduled.length})</summary>
      <p class="muted small">Disse øvelsene finnes i programmene dine, men er ikke registrert de siste syv dagene. Det betyr ikke at de var planlagt eller at du burde ha trent dem.</p>
      ${d.unscheduled.length?d.unscheduled.map(x=>`<p class="muted small">• ${esc(x)}</p>`).join(''):'<p class="muted small">Alle programøvelsene er registrert denne uken.</p>'}
    </details></div>`;
  const btn=el.querySelector('#weekBonus');
  if(btn)btn.onclick=()=>{
    const selected=[...el.querySelectorAll('[data-week-select]:checked')].map(x=>pending[+x.dataset.weekSelect]);
    if(!selected.length)return toast('Velg minst én øvelse');
    const p=profile().programs.find(x=>/bonus/i.test(x.name||''));
    if(!p)return toast('Opprett en BONUSØKT i programmet først');
    openWorkoutSetup(p,selected.map(x=>({...x.spec,targetSets:Math.max(1,x.remaining)})));
  };
}
function renderProgress(){
  const el=document.querySelector('#progress'),prs=personalRecords(),available=[...new Set(profile().sessions.map(s=>monthKeyFromDate(s.finishedAt||s.startedAt)))].sort().reverse(),currentKey=available.includes(el.dataset.month)?el.dataset.month:(available[0]||monthKeyFromDate(new Date())),report=monthlyReportData(currentKey);
  const reportHtml=`<div class="card"><div class="row wrap"><div><span class="eyebrow">Månedsrapport · ${esc(profile().name)}</span><h2>${esc(monthLabel(currentKey))}</h2></div><div class="actions"><button class="ghost compact" id="emailReport">Send e-post</button></div></div><label>Måned<select id="reportMonth">${(available.length?available:[currentKey]).map(k=>`<option value="${k}" ${k===currentKey?'selected':''}>${esc(monthLabel(k))}</option>`).join('')}</select></label><div class="report-summary"><strong>${report.sessions.length} økter</strong><span>${Math.round(report.totalVolume).toLocaleString('nb-NO')} kg ekstern volum</span></div><p class="report-text">${esc(report.text)}</p>${report.rows.length?report.rows.map(x=>`<div class="report-exercise"><div class="row"><strong>${esc(x.name)}</strong><span class="trend ${x.delta!=null&&x.delta>1?'up':x.delta!=null&&x.delta<-1?'down':''}">${esc(x.trend)}</span></div><div class="report-metrics"><span>${x.sets} sett</span><span>${x.reps} reps</span>${x.bodyweight?`<span>Beste ${esc(formatLoadFromStats(x))} × ${x.bestLoadReps}</span>`:`${x.bestWeight>0?`<span>Maks ${fmtW(x.bestWeight)} kg</span>`:''}${x.bestE1RM>0?`<span>e1RM ${x.bestE1RM.toFixed(1).replace('.',',')} kg</span>`:''}`}${x.avgRir!=null?`<span>RIR ${x.avgRir.toFixed(1).replace('.',',')}</span>`:''}</div></div>`).join(''):`<div class="empty">Ingen økter denne måneden.</div>`}</div>`;
  if(!prs.length){el.innerHTML=reportHtml+`<div class="card empty"><h2>Ingen øvrige vektprogresjonsdata ennå</h2><p>Kroppsvektøvelser følges direkte i månedsrapporten som KV, +kg eller assistanse. Øvelser med vanlig kg får PR-er og e1RM-grafer her.</p></div>`;}
  else{const names=[...new Set(prs.map(p=>p.name))],selected=el.dataset.selected&&names.includes(el.dataset.selected)?el.dataset.selected:names[0];el.dataset.selected=selected;el.innerHTML=reportHtml+`<div class="card"><span class="eyebrow">${esc(profile().name)}</span><h2>Progresjon</h2><p class="muted small">Kroppsvektøvelser vises i månedsrapporten. Grafen under brukes kun for øvelser med vanlig kg-belastning.</p><label>Øvelse<select id="progressExercise">${names.map(n=>`<option ${n===selected?'selected':''}>${esc(n)}</option>`).join('')}</select></label><div style="margin-top:12px">${svgChart(seriesFor(selected))}</div></div><div class="card"><h3>Personlige rekorder</h3>${prs.map(p=>`<div class="exercise"><div class="row"><div><strong>${esc(p.name)}</strong><div class="muted small">${fmtDate(p.date)}</div></div><div class="right"><strong>${fmtW(p.weight)} kg × ${p.reps}</strong><div class="muted small">e1RM ${p.e1rm.toFixed(1).replace('.',',')} kg</div></div></div></div>`).join('')}</div>`;const pe=el.querySelector('#progressExercise');if(pe)pe.onchange=e=>{el.dataset.selected=e.target.value;renderProgress();};}
  const rm=el.querySelector('#reportMonth');if(rm)rm.onchange=e=>{el.dataset.month=e.target.value;renderProgress();};const er=el.querySelector('#emailReport');if(er)er.onclick=()=>sendMonthlyReportEmail(currentKey);
}

function exportData(){const blob=new Blob([JSON.stringify({...state,exportedAt:new Date().toISOString(),format:'treningslogg-pwa-v2'},null,2)],{type:'application/json'}),a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=`treningslogg-backup-${new Date().toISOString().slice(0,10)}.json`;a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1000);}
function importData(ev){const f=ev.target.files?.[0];if(!f)return;const r=new FileReader();r.onload=()=>{try{const s=JSON.parse(r.result);let incoming;if(s.version>=2&&Array.isArray(s.profiles))incoming=s;else if(Array.isArray(s.sessions)&&Array.isArray(s.programs))incoming=migrateLegacy(s);else throw new Error();incoming=normalizeProfileNames(incoming);if(!confirm('Importere backup og erstatte dataene i denne installasjonen?'))return;state=incoming;state.timer=null;saveState();renderAll();toast('Backup importert');}catch(e){alert('Kunne ikke lese backup-filen.');}};r.readAsText(f);}
async function renderSettings(){
  const el=document.querySelector('#settings'),cfg=loadCloudConfig();let user=null;if(cloudClient&&cloudReady)user=await currentCloudUser();
  const cloudCard=!cloudConfigured()?`<div class="card"><span class="eyebrow">Nyhet i v${APP_VERSION}</span><h2>Skylagring og synk</h2><p class="muted small">Koble appen til et gratis Supabase-prosjekt. Lim inn <strong>Project URL</strong> og <strong>anon/publishable key</strong> fra Supabase. Bruk aldri service_role-nøkkelen.</p><div class="stack"><label>Supabase Project URL<input id="cloudUrl" placeholder="https://xxxx.supabase.co" value="${esc(cfg.url||'')}"></label><label>Anon / publishable key<input id="cloudKey" type="password" placeholder="sb_publishable_… eller anon key" value="${esc(cfg.key||'')}"></label><button class="primary" id="saveCloudConfig">Lagre skyoppsett</button></div></div>`:
  !user?`<div class="card"><span class="eyebrow">Skylagring</span><h2>Logg inn</h2><p class="muted small">Skyoppsettet er nå innebygd i appen. Håvard og Stine logger bare inn med hver sin Supabase-bruker.</p><div class="stack"><label>E-post<input id="cloudEmail" type="email" autocomplete="email"></label><label>Passord<input id="cloudPassword" type="password" autocomplete="current-password" minlength="6"></label><div class="grid2"><button class="ghost" id="cloudRegister">Opprett bruker</button><button class="primary" id="cloudLogin">Logg inn</button></div><button class="ghost" id="forgotPassword" type="button">Glemt passord</button></div></div>`:
  !cloudSyncAvailable?`<div class="card"><span class="eyebrow">Synkronisering blokkert</span><h2>Supabase må oppgraderes</h2><p class="muted small">${esc(cloudMeta.lastError||'Installer migrering 2.7.0 med atomisk versjonskontroll.')}</p><p class="muted small">Treningsdata lagres fortsatt lokalt, men skyen skrives ikke til før migreringen er installert.</p><button type="button" class="ghost" id="retryCloudInit">Sjekk Supabase på nytt</button></div>`:
  !cloudMeta.householdId?`<div class="card"><span class="eyebrow">Innlogget</span><h2>${esc(user.email||'Supabase-bruker')}</h2><p class="muted small">På Håvard sin telefon: opprett den delte treningskontoen. På Stine sin telefon: skriv inn delingskoden Håvard får.</p><div class="stack"><button class="primary" id="createHousehold">Opprett delt treningskonto</button><div class="divider">eller</div><label>Delingskode<input id="joinCode" autocomplete="off" autocapitalize="characters" placeholder="F.eks. A1B2C3D4E5F6"></label><button class="ghost" id="joinHousehold">Koble til eksisterende konto</button><button class="text-danger" id="cloudLogout">Logg ut</button></div></div>`:
  `<div class="card"><span class="eyebrow">Skysynk aktiv</span><h2>${esc(user.email||'Innlogget')}</h2><div class="cloud-ok">✓ Håvard og Stine kan synkronisere samme data</div><p class="muted small">Delingskode: <strong class="code">${esc(cloudMeta.inviteCode||'—')}</strong></p><label>Denne telefonen brukes primært av<select id="deviceProfile"><option value="" disabled ${deviceProfileID()?'':'selected'}>Velg telefonens bruker</option>${state.profiles.map(p=>`<option value="${p.id}" ${deviceProfileID()===p.id?'selected':''}>${esc(p.name)}</option>`).join('')}</select></label><button type="button" class="ghost" id="confirmDeviceProfile">Bekreft telefonprofil</button><p class="muted small">Profilen må bekreftes på hver telefon for å sende emoji-reaksjoner. Du kan fortsatt se begge sine økter.</p><div class="stack" style="margin-top:10px"><button class="primary" id="syncNow">Synkroniser nå</button><div id="cloudStatus" class="muted small"></div><button class="text-danger" id="cloudLogout">Logg ut av skyen</button></div></div>`;
  el.innerHTML=`${cloudCard}<div class="card"><h2>Backup og data</h2><p class="muted small"><strong>Behold fortsatt lokale backups.</strong> Skylagring synkroniserer program og fullførte økter mellom telefonene, mens en JSON-backup er ekstra sikkerhet.</p><div class="stack"><button class="primary" id="exportBtn">Eksporter full backup</button><label class="file-label">Importer backup<input type="file" id="importFile" accept="application/json,.json"></label></div></div><div class="card"><h3>Profiler</h3><p class="muted small">Begge profiler og all fullført historikk deles når skysynk er aktiv. Pågående økt lagres lokalt på telefonen til den fullføres.</p>${state.profiles.map(p=>`<label>Profilnavn<input data-profile-name="${p.id}" value="${esc(p.name)}"></label><label>Rapport-e-post for ${esc(p.name)}<input type="email" data-report-email="${p.id}" value="${esc(p.reportEmail||'')}" placeholder="navn@epost.no"></label>`).join('')}</div><div class="card"><h3>Utseende</h3><p class="muted small">Fargetemaet lagres på denne telefonen.</p><label>Fargetema<select id="themeSelect"><option value="forest" ${activeTheme()==='forest'?'selected':''}>Rolig premium · mørk grønn</option><option value="midnight" ${activeTheme()==='midnight'?'selected':''}>Midnatt · mørk blå</option><option value="copper" ${activeTheme()==='copper'?'selected':''}>Kobber · varm mørk</option><option value="plum" ${activeTheme()==='plum'?'selected':''}>Plomme · mørk lilla</option><option value="light" ${activeTheme()==='light'?'selected':''}>Lys</option></select></label></div><div class="card"><h3>Startside</h3><label class="toggle-row"><input type="checkbox" id="showSplashSetting" ${shouldShowSplash()?'checked':''}><span><strong>Vis startside ved oppstart</strong><small>Innstillingen gjelder denne telefonen.</small></span></label><button class="ghost" id="previewSplash" style="margin-top:10px">Vis startsiden nå</button></div><div class="card"><h3>App</h3><p class="muted small">Treningslogg v${APP_VERSION} · Sikker synk RC2 · Håvard & Stine · søkbar øvelsesbank · forbedret drag-and-drop · alternative øvelser · komma-desimaler · KV/+kg/assistanse · innebygd skyoppsett · programeditor på mobil · valgfrie øvelser · kommentarer · historikkredigering · månedsrapport · Supabase-skysynk.</p></div>`;
  el.querySelector('#exportBtn').onclick=exportData;el.querySelector('#importFile').onchange=importData;el.querySelectorAll('[data-profile-name]').forEach(x=>x.onchange=()=>{const p=state.profiles.find(p=>p.id===x.dataset.profileName);if(p&&x.value.trim()){p.name=x.value.trim();saveState();renderAll();}});el.querySelectorAll('[data-report-email]').forEach(x=>x.onchange=()=>{const p=state.profiles.find(p=>p.id===x.dataset.reportEmail);if(p){p.reportEmail=x.value.trim();saveState();}});const themeSelect=el.querySelector('#themeSelect');if(themeSelect)themeSelect.onchange=()=>applyTheme(themeSelect.value);const ss=el.querySelector('#showSplashSetting');if(ss)ss.onchange=()=>setSplashPreference(ss.checked);const ps=el.querySelector('#previewSplash');if(ps)ps.onclick=()=>{const sp=document.querySelector('#splashScreen');sp.classList.remove('hidden');sp.setAttribute('aria-hidden','false');};
  const saveCfg=el.querySelector('#saveCloudConfig');if(saveCfg)saveCfg.onclick=()=>{const url=el.querySelector('#cloudUrl').value.trim().replace(/\/$/,'');const key=el.querySelector('#cloudKey').value.trim();if(!/^https:\/\/.+\.supabase\.co$/i.test(url)||!key)return toast('Kontroller URL og nøkkel');saveCloudConfig({url,key});location.reload();};
  const clearCfg=el.querySelector('#clearCloudConfig');if(clearCfg)clearCfg.onclick=()=>{if(confirm('Fjerne Supabase-oppsettet fra denne telefonen? Lokale treningsdata beholdes.')){localStorage.removeItem(CLOUD_CONFIG_KEY);cloudMeta={deviceProfileId:cloudMeta.deviceProfileId};saveCloudMeta();location.reload();}};
  const reg=el.querySelector('#cloudRegister');if(reg)reg.onclick=async()=>{try{const email=el.querySelector('#cloudEmail').value.trim(),pw=el.querySelector('#cloudPassword').value;if(!email||pw.length<6)return toast('E-post og minst 6 tegn i passord');const d=await cloudSignUp(email,pw);if(d.session){cloudReady=true;await resolveCloudHousehold();renderAll();toast('Bruker opprettet');}else toast('Bruker opprettet – bekreft e-posten først');}catch(e){alert(e.message||'Kunne ikke opprette bruker');}};
  const login=el.querySelector('#cloudLogin');if(login)login.onclick=async()=>{try{await cloudSignIn(el.querySelector('#cloudEmail').value.trim(),el.querySelector('#cloudPassword').value);renderAll();toast('Innlogget');}catch(e){alert(e.message||'Kunne ikke logge inn');}};
  const forgot=el.querySelector('#forgotPassword');if(forgot)forgot.onclick=async()=>{const email=el.querySelector('#cloudEmail').value.trim();if(!email)return toast('Skriv inn e-postadressen først');try{await sendPasswordRecovery(email);toast('Ny passordlenke er sendt på e-post');}catch(e){alert(e.message||'Kunne ikke sende passordlenke');}};
  const create=el.querySelector('#createHousehold');if(create)create.onclick=async()=>{try{await createCloudHousehold();toast('Delt treningskonto opprettet');}catch(e){alert(e.message||'Kunne ikke opprette delt konto');}};
  const join=el.querySelector('#joinHousehold');if(join)join.onclick=async()=>{const code=el.querySelector('#joinCode').value.trim();if(!code)return toast('Skriv inn delingskoden');if(!confirm('Ved tilkobling hentes den delte treningskontoen fra skyen. Lokale profil/programdata på denne telefonen erstattes. Fortsette?'))return;try{await joinCloudHousehold(code);toast('Koblet til delt treningskonto');}catch(e){alert(e.message||'Ugyldig delingskode');}};
  const sync=el.querySelector('#syncNow');if(sync)sync.onclick=()=>pullCloud(true);
  const logout=el.querySelector('#cloudLogout');if(logout)logout.onclick=()=>cloudSignOut();
  const retry=el.querySelector('#retryCloudInit');if(retry)retry.onclick=async()=>{await resolveCloudHousehold();renderAll();};const dp=el.querySelector('#deviceProfile');if(dp)dp.onchange=()=>setDeviceProfile(dp.value);const confirmDevice=el.querySelector('#confirmDeviceProfile');if(confirmDevice)confirmDevice.onclick=()=>setDeviceProfile(dp?.value);renderCloudStatus();
}
function renderAll(){renderProfileBar();renderPrograms();renderWorkout();renderHistory();renderWeek();renderProgress();renderSettings();const count=profile().sessions.length;const cloud=cloudReady&&cloudMeta.householdId?' · ☁︎ synk':' ';document.querySelector('#statusLine').textContent=state.active?`Pågående: ${state.active.name}`:`${profile().name} · ${count} lagrede økter${cloud}`;}
function installHelp(){const m=document.querySelector('#modal'),b=document.querySelector('#modalBody');b.innerHTML=`<h3>Installer på iPhone</h3><ol class="install-steps"><li>Åpne siden i <strong>Safari</strong>.</li><li>Trykk <strong>Del</strong>.</li><li>Velg <strong>Legg til på Hjem-skjerm</strong>.</li><li>Trykk <strong>Legg til</strong>.</li></ol><p class="muted small">Ved oppdatering på samme nettadresse beholdes localStorage-data. Ta likevel backup først.</p><button value="cancel" class="primary" style="width:100%">Lukk</button>`;m.showModal();}

function initSplash(){const sp=document.querySelector('#splashScreen');if(!sp)return;const toggle=sp.querySelector('#splashToggle');if(toggle){toggle.checked=shouldShowSplash();toggle.onchange=()=>setSplashPreference(toggle.checked);}const start=sp.querySelector('#splashStart');if(start)start.onclick=()=>hideSplash(true);const open=sp.querySelector('#splashOpen');if(open)open.onclick=()=>hideSplash(false);if(!shouldShowSplash())sp.classList.add('hidden');}
applyTheme();initSplash();
document.querySelectorAll('.tab').forEach(b=>b.addEventListener('click',()=>setTab(b.dataset.tab)));document.querySelector('#installHelpBtn').addEventListener('click',installHelp);if('serviceWorker' in navigator)window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js?v=2.7.1').catch(()=>{}));renderAll();initCloud().then(()=>renderAll());
