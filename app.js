import {drawingTargets,drawingEntities} from './drawing-context.mjs';
import {createResearchWorkspace} from './explorer-ui.mjs';
import {sceneDescription,targetGroup} from './explorer-model.mjs';
import {lessonScene,teachingAnatomyBlurb} from './teaching-model.mjs';
import {contextsFor, groupEvidence, sourceInterpretations} from './evidence-context.mjs';
import {meshIdsFor, defaultMap, allowedMap, targetCandidates, countText, medialHemisphere, cortexAlpha, regionDefinition, parseRegions, regionsForMesh, regionVisibilityNote, circuitProfile, restoredTracts, cortexOpacityFromSlider, cortexSliderFromOpacity, hoverOpacity, smoothOpacity, chooseHoverHit, hoverBlurb, tractPointVisible, coordinateStyle} from './atlas-model.mjs';
import * as THREE from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {MeshoptDecoder} from 'three/addons/libs/meshopt_decoder.module.js';
const $=s=>document.querySelector(s);
const el=(tag,cls,text)=>{const e=document.createElement(tag);if(cls)e.className=cls;if(text!==undefined)e.textContent=text;return e;};
const [atlas,evidence,studyMaps,regionCatalog,regionSurfaces,circuitCatalog,hoverGuide,publicCatalog]=await Promise.all(['assets/atlas.json','assets/evidence.json','assets/study-maps.json','assets/region-overlays.json','assets/region-surfaces.json','assets/tms-circuits.json','assets/hover-guide.json','assets/public-pathways.json'].map(async p=>{const r=await fetch(p);if(!r.ok)throw new Error(`Unable to load ${p}`);return r.json();}));
atlas.meshes.push(...regionSurfaces.meshes);
atlas.tracts.push(...publicCatalog.tracts);
atlas.meshes.push(...publicCatalog.meshes);
hoverGuide.anatomy['inferior-thalamic-peduncle']={...publicCatalog.families.ITP,role:'ITP anatomy'};
circuitCatalog.sources.push(...publicCatalog.sources);
for(const [family,entry]of Object.entries(publicCatalog.families))hoverGuide.tracts[family]={...entry,role:'Public tract geometry'};
atlas.sources.aal3={name:'AAL3 anatomical estimates',citation:'Rolls et al. 2020. AAL3v1; medial superior frontal, anterior SMA and subgenual ACC. Source MNI affine; no cross-template registration.',url:'https://www.oxcns.org/aal3.html'};
const paperById=Object.fromEntries(evidence.sources.map(s=>[s.id,s]));
const entityById=Object.fromEntries([...drawingEntities,...evidence.anatomical_entities].map(s=>[s.id,s]));
const contextColor='#6586b3';
const colors={C_FP:'#b98a47',UF:'#567bab',TR_A:'#4f8f7b',CS_A:'#bc7558',CS_S:'#96709f',AC:'#bfa64e',...Object.fromEntries(Object.entries(publicCatalog.families).map(([id,x])=>[id,x.color]))};
const bundleNames={TR_A:'Anterior thalamic radiation',CS_A:'Anterior corticostriatal tract',CS_S:'Superior corticostriatal tract',C_FP:'Cingulum (frontoparietal segment)',UF:'Uncinate fasciculus',AC:'Anterior commissure',...Object.fromEntries(Object.entries(publicCatalog.families).map(([id,x])=>[id,x.name]))};
const regionNames={dmpfc:'Dorsomedial prefrontal cortex (dmPFC)',dlpfc:'Dorsolateral prefrontal cortex (DLPFC)',presma:'Pre-supplementary motor area (pre-SMA)',vlpfc:'Ventrolateral prefrontal cortex (VLPFC)',sgacc:'Subgenual anterior cingulate cortex (sgACC)',ofc:'Orbitofrontal cortex (OFC)','right-ofc':'Right orbitofrontal cortex (OFC)'};
const pair=(...ids)=>ids.flatMap(id=>[`${id}-l`,`${id}-r`]);
const mapping={
 hippocampus:pair('hippocampus'),amygdala:pair('amygdala'),insula:pair('dkt-insula'),M1:pair('dkt-precentral'),PM:[],
 SFG:pair('dkt-superior-frontal'),
 NAc:pair('nucleus-accumbens'),BNST:pair('bed-nucleus-stria-terminalis'),STN:pair('subthalamic-nucleus'),amSTN:pair('subthalamic-nucleus'),GPe:pair('globus-pallidus-externus'),GPi:pair('globus-pallidus-internus'),caudate:pair('caudate-nucleus'),putamen:pair('putamen'),thalamus:pair('thalamus'),MD_thalamus:pair('thalamus-mediodorsal'),red_nucleus:pair('red-nucleus'),LHb:pair('habenula'),ALIC:pair('internal-capsule'),vALIC:pair('internal-capsule'),VCVS:pair('internal-capsule','nucleus-accumbens'),
 inferior_parietal:pair('dkt-inferior-parietal'),precuneus:pair('dkt-precuneus'),left_anterior_insula:['dkt-insula-l'],preSMA:pair('aal3-presma'),mPFC:pair('dkt-superior-frontal','dkt-medial-orbitofrontal'),right_anterior_insula:['dkt-insula-r'],symptom_targets:pair('dkt-rostral-middle-frontal','dkt-caudal-middle-frontal'),depression_circuit:pair('dkt-rostral-middle-frontal','dkt-caudal-middle-frontal'),
 DLPFC:pair('dkt-rostral-middle-frontal','dkt-caudal-middle-frontal'),vlPFC:pair('dkt-pars-opercularis','dkt-pars-triangularis','dkt-pars-orbitalis'),OFC:pair('dkt-medial-orbitofrontal','dkt-lateral-orbitofrontal','dkt-pars-orbitalis'),medial_OFC:pair('dkt-medial-orbitofrontal'),lateral_OFC:pair('dkt-lateral-orbitofrontal'),vmPFC:pair('dkt-medial-orbitofrontal'),dmPFC:pair('aal3-dmpfc'),dACC:pair('dkt-caudal-anterior-cingulate'),medial_frontal:pair('dkt-superior-frontal','dkt-medial-orbitofrontal'),lateral_PFC:pair('dkt-rostral-middle-frontal','dkt-caudal-middle-frontal'),vmPFC_OFC_Segura:pair('dkt-medial-orbitofrontal','dkt-lateral-orbitofrontal'),SCC_GM:pair('aal3-sgacc'),SCC_WM:[],slMFB:[],MFB_classical:[],ITP:pair('inferior-thalamic-peduncle'),ventral_pallidum:[],midbrain_medial:[],midbrain_lateral:[]
};
const contextMapping={SCC_WM:pair('aal3-sgacc')};
const fiberEntities={ITP:['ITP'],forceps_minor:['FMI'],slMFB:['VTAPP'],MFB_classical:['MFB'],cingulum:['C_FP','C_PO'],uncinate:['UF'],ATR:['TR_A'],frontostriatal:['CS_A','CS_S'],anterior_commissure:['AC']};
const labels={'nucleus-accumbens':'NAc','bed-nucleus-stria-terminalis':'BNST','subthalamic-nucleus':'STN','globus-pallidus-externus':'GPe','globus-pallidus-internus':'GPi','caudate-nucleus':'Caudate','putamen':'Putamen','thalamus':'Thalamus','thalamus-mediodorsal':'MD thalamus','red-nucleus':'Red nucleus','habenula':'Habenula','internal-capsule':'Internal capsule','gyrus-middle-frontal':'Middle frontal gyrus','cortex-orbitofrontal':'Orbitofrontal cortex','cortex-frontal-medial':'Medial orbitofrontal','gyrus-superior-frontal':'Superior frontal gyrus','gyrus-cingulate-anterior':'Anterior cingulate','gyrus-inferior-frontal-opercularis':'Inferior frontal gyrus','gyrus-inferior-frontal-triangularis':'Inferior frontal gyrus'};
const topicIds=['ocd','depression','tms-depression','tms-ocd'];
const topicSources=id=>[...new Set(evidence.evidence.filter(e=>e.topics?.includes(id)).map(e=>e.source_id))];
const topics={
 ocd:{title:'OCD · DBS',description:'Capsular, striatal and subthalamic targets, with structural and engagement evidence.',sources:topicSources('ocd'),default:'alic'},
 depression:{title:'Depression · DBS',description:'SCC, vALIC and slMFB evidence, with cohorts and study designs kept distinct.',sources:topicSources('depression'),default:'scc'},
 'tms-depression':{title:'Depression · TMS',description:'Cortical targets, connectivity models, and randomized targeting comparisons.',sources:topicSources('tms-depression'),default:'dlpfc'},
 'tms-ocd':{title:'OCD · TMS',description:'Medial prefrontal, pre-SMA, DLPFC and orbitofrontal approaches.',sources:topicSources('tms-ocd'),default:'deep-medial'},
 all:{title:'Anatomy & evidence',description:'Explore the anatomy and research behind TMS and DBS for depression and OCD.',sources:evidence.sources.map(x=>x.id),default:'overview'}
};
const targets={
 ...drawingTargets,
 'fronto-insular':{name:'Fronto-insular mechanism',sub:'Johnson 2026 · aiTBS research',kind:'research',topics:['tms-depression','all'],entities:['DLPFC','insula'],focus:['DLPFC','insula'],focus_laterality:{DLPFC:'left',insula:'bilateral'},bundles:[],note:'Left DLPFC and whole bilateral insula parcels orient the human connectivity analyses. Mouse prelimbic experiments are not mapped onto human cortex. No individual target, direct tract or insular subdivision is reconstructed.'},
 'depression-network':{name:'Amygdala-linked depression network',sub:'Ji 2026 · therapeutic network (DTN)',kind:'research',topics:['depression','tms-depression','all'],entities:['amygdala','insula','hippocampus'],focus:['amygdala','insula','hippocampus'],focus_laterality:{amygdala:'bilateral',insula:'bilateral',hippocampus:'bilateral'},bundles:[],note:'Whole amygdala, insula and hippocampus surfaces orient Ji’s network hypothesis. These are not the study’s amygdala hub clusters or DTN values. The author-released DTN map is linked from the evidence cards. No clinical amygdala stimulation target is implied.'},
 alic:{name:'ALIC / vALIC',sub:'Anterior limb of the internal capsule',topics:['ocd','depression','all'],entities:['ALIC','vALIC','VCVS'],focus:['ALIC','NAc','GPe'],bundles:['TR_A','CS_A'],note:'The full internal capsule and neighboring nuclei orient this view. These shapes do not define ALIC/vALIC target boundaries. Li’s released response fibers are available through its findings or the tract controls.'},
 nac:{name:'Nucleus accumbens',sub:'Historical target & adjacent capsule',topics:['ocd','all'],entities:['NAc'],focus:['NAc'],bundles:['CS_A'],note:'The NAc is a population atlas structure. Historical NAc treatment labels and active-contact locations in adjacent vALIC remain separate evidence findings.'},
 bnst:{name:'BNST / ITP region',sub:'Posterior target context',topics:['ocd','all'],entities:['BNST','ITP'],focus:['BNST','MD_thalamus'],bundles:['ITP'],note:'The teal volume shows the local inferior thalamic peduncle segment delineated in a public hypothalamic atlas. It does not trace its complete cortical–thalamic course. BNST and mediodorsal thalamus provide orientation; the Meyer response volume is not reconstructed.'},
 stn:{name:'Subthalamic region',sub:'Whole STN for orientation',topics:['ocd','all'],entities:['STN','amSTN'],focus:['STN','red_nucleus','MD_thalamus'],bundles:['STN_ASSOC','STN_LIMBIC'],note:'This mask shows the whole STN. Associative and limbic STN pathways provide atlas context; neither the anteromedial target subdivision nor patient stimulation fields are delineated.'},
 gpe:{name:'Globus pallidus externus',sub:'Stimulation & recording context',topics:['ocd','all'],entities:['GPe'],focus:['GPe','ALIC','putamen'],bundles:['CS_A'],note:'GPe anatomy supports contact-localization and LFP-recording findings. In Imtiaz 2026, therapeutic stimulation was in ALIC white matter, while a ventral GPe contact was used for sensing. No patient electrode or stimulation volume is reconstructed.'},
 scc:{name:'Subcallosal cingulate',sub:'SCC white-matter target',topics:['depression','all'],entities:['SCC_WM','SCC_GM','forceps_minor','cingulum','uncinate','frontostriatal'],focus:['SCC_GM'],bundles:['C_FP','C_PO','FMI','UF','CS_A'],note:'The pink region is subgenual anterior cingulate cortex (sgACC), the gray matter beside the SCC white-matter DBS target. It locates the surrounding cortex, not the exact stimulation site. Forceps minor, anterior cingulum and other reference tracts are now available. The precise SCC stimulation site and study-specific fiber intersection remain unavailable.'},
 vcvs:{name:'VC/VS',sub:'Ventral capsule / ventral striatum',topics:['ocd','depression','all'],entities:['VCVS'],focus:['NAc','ALIC'],bundles:['CS_A','TR_A'],note:'Whole NAc and internal-capsule masks provide regional context. They do not define the clinical VC/VS target boundary or a stimulation volume.'},
 mfb:{name:'slMFB',sub:'Superolateral medial forebrain bundle',topics:['ocd','depression','all'],entities:['slMFB','MFB_classical'],focus:['STN','red_nucleus','thalamus'],bundles:['VTAPP'],note:'The released VTA projection pathway supplies an slMFB anatomical model, including its caudal extensions. It is distinct from the classical MFB, which can be enabled separately. Patient-specific treatment fibers and activation volumes are not reconstructed.'},
 lhb:{name:'Lateral habenula',sub:'Whole habenula for orientation',topics:['depression','all'],entities:['LHb'],focus:['LHb','thalamus'],bundles:[],note:'This atlas provides the whole habenula, not a separate lateral-habenula mask. No cortical tract is inferred from the depression review’s target illustration.'},
 dlpfc:{name:'DLPFC',sub:'Dorsolateral prefrontal cortex',topics:['tms-depression','tms-ocd','all'],entities:['DLPFC','SCC_GM'],focus:['DLPFC'],focus_laterality:{DLPFC:'left'},bundles:[],note:'Middle-frontal parcels provide broad DLPFC context. Fox’s left-DLPFC–sgACC relationship is functional anticorrelation. Displayed corticostriatal fibers are separately sourced reference anatomy; no direct DLPFC–sgACC fiber, individualized target or electric field is inferred.'},
 medial:{name:'dmPFC',sub:'Dorsomedial prefrontal cortex',topics:['tms-ocd','tms-depression','all'],entities:['dmPFC','dACC'],focus:['dmPFC','dACC'],bundles:[],note:'dmPFC lies anterior to pre-SMA. AAL3 medial superior-frontal anatomy provides a bounded dmPFC estimate, separate from anterior SMA. The OCD paper’s purple MNI point, when shown, is an analysis seed, not the Talairach coil landmark. See the targeting comparison below.'},
 vlpfc:{name:'VLPFC',sub:'Ventrolateral prefrontal cortex',topics:['ocd','all'],entities:['vlPFC'],focus:['vlPFC'],bundles:[],note:'Inferior-frontal parcels are broad VLPFC context. These OCD DBS findings concern connected cortex, not direct cortical stimulation. The anatomy overlay provides separate VLPFC–amygdala research references.'},
 sgacc:{name:'Subgenual anterior cingulate',sub:'sgACC connectivity in TMS research',topics:['tms-depression','all'],entities:['SCC_GM'],focus:['SCC_GM'],bundles:[],note:'The published Fox sgACC point is an analysis seed, not a target mask or direct TMS site. AAL3 subgenual gray matter provides a bounded regional estimate. The SCC white-matter DBS target remains a separate view.'},
 ofc:{name:'Orbitofrontal cortex',sub:'Stimulation sites & measured effects',topics:['tms-ocd','all'],entities:['OFC'],focus:['OFC'],bundles:[],note:'Orbitofrontal anatomical parcels are shown. Exact stimulation sites, treatment parameters and electric fields are not represented by these surfaces.'},
 'deep-medial':{name:'mPFC / ACC · deep TMS',sub:'H7 coil · symptom provocation',topics:['tms-ocd','all'],entities:['mPFC','dACC'],focus:['mPFC','dACC'],bundles:[],note:'Medial frontal and cingulate parcels provide context for the H7 approach. They are not an electric-field model or evidence of isolated direct ACC stimulation.'},
 presma:{name:'Pre-SMA',sub:'Pre-supplementary motor area',topics:['tms-ocd','all'],entities:['preSMA'],focus:['preSMA','STN'],bundles:[],note:'Pre-SMA is posterior to the dmPFC approach compared below. AAL3 SMA anterior to the AC plane provides a bounded pre-SMA estimate. No precise target boundary or patient stimulation point is reconstructed.'},
 symptoms:{name:'Symptom-specific targets',sub:'Dysphoric ↔ anxiosomatic',topics:['tms-depression','all'],entities:['symptom_targets'],focus:['DLPFC'],bundles:[],map:'siddiqi-symptoms',note:'The author-released Siddiqi targeting volume is sampled onto reference cortex. Negative values denote hypothesized dysphoric preference; positive values denote anxiosomatic preference. This is not a prospective efficacy map.'},
 insula:{name:'Insula-guided DLPFC',sub:'BRIGhTMIND · effective connectivity',topics:['tms-depression','all'],entities:['right_anterior_insula'],focus:['DLPFC','right_anterior_insula'],focus_laterality:{DLPFC:'left',right_anterior_insula:'right'},bundles:[],note:'DLPFC and whole right-insula parcels provide context. The published insula point is an analysis seed; stimulation was delivered to an individually selected left-DLPFC site.'},
 convergent:{name:'Convergent depression circuit',sub:'Circuit targeting versus Beam F3',topics:['tms-depression','all'],entities:['depression_circuit'],focus:['DLPFC'],bundles:[],map:'taylor-circuit',note:'The public group t map referenced by Taylor is sampled onto reference cortex. It is not the participant-specific connectivity map, an electric field, or a set of individual treatment coordinates.'},
 overview:{name:'All reviewed evidence',sub:`${evidence.evidence.length} findings · ${evidence.sources.length} sources`,topics:['ocd','depression','tms-depression','tms-ocd','all'],entities:null,focus:[],bundles:['TR_A','CS_A','C_FP','UF'],note:'Reference anatomy accompanies source-linked evidence. Published points distinguish treatment means, fallback targets, controls and analysis coordinates. Individual response volumes, target masks and patient tractograms are unavailable.'}

};
const typeNames={preclinical_mechanism:'Preclinical mechanism',intracranial_lfp:'Intracranial recording',safety_outcome:'Safety outcomes',review_illustration:'Review illustration',review_functional_targeting:'Review of functional targeting',review_tms_network:'Review of TMS networks',review_tms_target:'Review of TMS targets',review_qualification:'Review limitations',resting_fmri_change:'Resting-state fMRI change',task_fmri_change:'Task fMRI change',scalp_eeg_change:'EEG change',artifact_control_reanalysis:'Reanalysis with artifact controls',retrospective_response_association:'Retrospective response association',patient_specific_tractography_association:'Patient tractography association',historical_target_relocalization:'Reassessment of historical targets',contact_localization:'Contact localization',nomenclature_qualification:'Anatomical terminology',scope_qualification:'Study scope',analysis_qualification:'Analysis limitations',evidence_interpretation:'Evidence interpretation',validation:'Validation',targeting_method:'Targeting method',methodological_limit:'Methodological finding',electrophysiology:'Evoked-potential evidence',patient_specific_tractography:'Patient tractography',clinical_outcome:'Clinical outcome',local_response_association:'Response association',functional_connectivity:'Functional connectivity',functional_change:'Functional change',review_synthesis:'Review synthesis',anatomical_localization:'Contact localization',structural_association:'Structural association'};
const teachingEmbed=new URL(location).searchParams.get('embed')==='learn';
let state={topic:'ocd',target:'alic',study:'all',hemisphere:'both',selected:null,bundles:new Set(targets.alic.bundles),tractMode:'suggested',view:'oblique',map:'off',regions:new Set(),search:'',panel:'targets'};
let teachingScene=null,workspaceUI=null,restoringUrl=false,urlWritePending=false,urlReplaceOnly=true;
const mapData=new Map(),mapColorCache=new WeakMap();
let hoverTarget=null,hoverFrame=0,pendingHover=null,hoverCandidate=null,hoverTimer=0;
let pinnedTarget=null,pinnedContext=null,focusTweens=[],focusAnimating=false,lastFrameTime=null;
let highlight=new Set(),contextMeshes=new Set();let mapOpacity=.92;let regionOpacity=.16;let loadedMeshes=0;let loadedTracts=0;let labelsOn=false;let cortexOpacity=.065;let pointersDown=null;let renderDirty=true;
const viewport=$('#viewport');
const scene=new THREE.Scene();
const camera=new THREE.PerspectiveCamera(35,1,.1,2000);camera.position.set(-255,95,-185);
const renderer=new THREE.WebGLRenderer({antialias:true,alpha:true,preserveDrawingBuffer:true,powerPreference:'high-performance'});renderer.localClippingEnabled=true;renderer.setPixelRatio(Math.min(devicePixelRatio,2));renderer.setClearColor(0xffffff,0);renderer.outputColorSpace=THREE.SRGBColorSpace;viewport.prepend(renderer.domElement);renderer.domElement.setAttribute('aria-label','Rotatable reference brain');renderer.domElement.setAttribute('role','img');
const controls=new OrbitControls(camera,renderer.domElement);controls.target.set(0,5,10);controls.enableDamping=true;controls.dampingFactor=.08;controls.minDistance=45;controls.maxDistance=720;controls.panSpeed=.8;controls.rotateSpeed=.65;
controls.addEventListener('change',()=>{renderDirty=true;});
scene.add(new THREE.HemisphereLight(0xffffff,0x647660,2));const key=new THREE.DirectionalLight(0xffffff,2.1);key.position.set(-160,220,-160);scene.add(key);const fill=new THREE.DirectionalLight(0xdde8dc,1.1);fill.position.set(140,40,100);scene.add(fill);
const anatomy=new THREE.Group();anatomy.rotation.x=-Math.PI/2;scene.add(anatomy);
const objects=new Map(),tractObjects=new Map(),labelElements=new Map();
const loader=new GLTFLoader();loader.setMeshoptDecoder(MeshoptDecoder);
const markerObjects=new Map();
for(const point of evidence.coordinate_markers){const marker=new THREE.Mesh(new THREE.SphereGeometry(1.9,14,10),new THREE.MeshBasicMaterial({color:coordinateStyle(point).color,transparent:true,opacity:.95,depthTest:false}));marker.position.set(...point.xyz);marker.renderOrder=6;marker.userData.point=point;anatomy.add(marker);markerObjects.set(point.id,marker);}
const raycaster=new THREE.Raycaster();raycaster.params.Line.threshold=.8;
const ndc=new THREE.Vector2();
function inTopic(e){return state.topic==='all'||e.topics?.includes(state.topic);}
function inTarget(e,id=state.target){return id==='overview'||(e.target_ids?e.target_ids.includes(id):targets[id].kind!=='research'&&e.entity_ids.some(x=>targets[id].entities?.includes(x)));}
function records(){return evidence.evidence.filter(e=>inTopic(e)&&inTarget(e)&&(state.study==='all'||e.source_id===state.study)&&(!state.search||[e.finding,e.limitations,paperById[e.source_id].label,paperById[e.source_id].title].join(' ').toLowerCase().includes(state.search)));}
function studySourcesInView(){return evidence.sources.filter(x=>evidence.evidence.some(e=>e.source_id===x.id&&inTopic(e)&&inTarget(e)));}
function visiblePoints(){if(teachingScene)return [];return evidence.coordinate_markers.filter(p=>isSide(p.side)&&(state.topic==='all'||p.topics.includes(state.topic))&&(state.target==='overview'||p.target_ids.includes(state.target))&&(state.study==='all'||state.study===p.source_id)&&(!state.selected||p.finding_ids.includes(state.selected)));}
function updateMapControls(){
 const hasMaps=studyMaps.some(m=>allowedMap(m.id,state.topic,studyMaps));
 $('#functional-map-control').hidden=!hasMaps;$('.map-controls').hidden=!hasMaps;
}
function renderMarkers(){
 const ids=new Set(visiblePoints().map(p=>p.id));for(const [id,m]of markerObjects)m.visible=ids.has(id);
 const holder=$('#coordinate-list');holder.replaceChildren();
 for(const p of visiblePoints()){const row=el('div','coordinate-row');const a=el('a','',p.name);a.href=p.url;a.target='_blank';a.rel='noopener';row.append(a,el('span','',`${p.xyz.join(', ')} mm · ${p.role}`),el('small','',`${p.locator} · ${p.space}`));holder.append(row);}
 $('#coordinate-panel').hidden=!visiblePoints().length;$('#point-mode').hidden=!visiblePoints().length;updateMapControls();
}
function sampleMap(map,x,y,z){
 const m=map.world_to_voxel;const q=[x,y,z,1];const v=m.slice(0,3).map(row=>row.reduce((a,b,i)=>a+b*q[i],0));const b=v.map(Math.floor),f=v.map((n,i)=>n-b[i]);const [nx,ny,nz]=map.shape;
 if(b.some((n,i)=>n<0||n+1>=map.shape[i]))return null;
 let value=0,weight=0;const values=mapData.get(map.id);
 for(let dx=0;dx<2;dx++)for(let dy=0;dy<2;dy++)for(let dz=0;dz<2;dz++){const n=values[((b[0]+dx)*ny+b[1]+dy)*nz+b[2]+dz];if(!Number.isFinite(n))continue;const w=(dx?f[0]:1-f[0])*(dy?f[1]:1-f[1])*(dz?f[2]:1-f[2]);value+=n*w;weight+=w;}
 return weight?value/weight:null;
}
function surfaceColors(mesh,map){
 let cache=mapColorCache.get(mesh);if(!cache){cache={};mapColorCache.set(mesh,cache);}if(cache[map.id])return cache[map.id];
 anatomy.updateMatrixWorld(true);const transform=new THREE.Matrix4().copy(anatomy.matrixWorld).invert().multiply(mesh.matrixWorld);const pos=mesh.geometry.attributes.position;const colors=new Float32Array(pos.count*3);const negative=new THREE.Color('#426da5'),positive=new THREE.Color('#c77b49'),neutral=new THREE.Color('#e0e5dd');const pt=new THREE.Vector3();const c=new THREE.Color();
 for(let i=0;i<pos.count;i++){pt.fromBufferAttribute(pos,i).applyMatrix4(transform);const value=sampleMap(map,pt.x,pt.y,pt.z);c.copy(neutral);if(value!==null)c.lerp(value<0?negative:positive,Math.min(1,Math.abs(value)/map.scale));colors.set([c.r,c.g,c.b],i*3);}
 cache[map.id]=new THREE.BufferAttribute(colors,3);return cache[map.id];
}
function currentCircuit(){
 const finding=evidence.evidence.find(e=>e.id===state.selected);
 const findingProfile=circuitCatalog.profiles.find(p=>p.id===finding?.circuit_profile&&p.topics.includes(state.topic));if(findingProfile)return findingProfile;
 const direct=circuitProfile(state.topic,state.target,circuitCatalog);if(direct)return direct;
 if(state.topic==='all'&&state.target==='overview'&&finding){for(const topic of finding.topics.filter(t=>t.startsWith('tms')))for(const target of finding.target_ids||[]){const profile=circuitProfile(topic,target,circuitCatalog);if(profile)return profile;}}
 return null;
}
function suggestedBundles(){return currentCircuit()?.bundles||targets[state.target].bundles;}
function selectionMap(){const finding=evidence.evidence.find(e=>e.id===state.selected);return defaultMap({topic:state.topic,sourceId:finding?.source_id||state.study,targetMap:targets[state.target].map},studyMaps);}
function applySelectionMap(){const next=selectionMap();if(next!==state.map&&next!=='off'&&currentCircuit()&&state.bundles.size)mapOpacity=Math.min(mapOpacity,.28);state.map=next;}
function renderMapInfo(){
 if(!allowedMap(state.map,state.topic,studyMaps))state.map='off';
 const select=$('#map-select');select.replaceChildren();const off=el('option','','None');off.value='off';select.append(off);
 for(const m of studyMaps.filter(m=>allowedMap(m.id,state.topic,studyMaps))){const op=el('option','',m.name);op.value=m.id;select.append(op);}select.value=state.map;
 const map=studyMaps.find(x=>x.id===state.map),finding=evidence.evidence.find(e=>e.id===state.selected);
 const source=finding?.source_id||(state.study!=='all'?state.study:null);
 const comparison=!!map&&(source?!map.source_ids.includes(source):targets[state.target].map!==map.id);
 const holder=$('#map-description');holder.replaceChildren();
 $('#map-opacity-control').hidden=!map;$('#map-opacity').value=mapOpacity;
 $('#cortex-opacity-note').hidden=!map;$('#cortex-opacity').disabled=!!map;$('#cortex-opacity').title=map?'Use Map opacity while a functional map is displayed.':'';
 $('#scene-title').textContent=map?map.name:targets[state.target].name;
 const selectedLabel=finding?`${paperById[finding.source_id].label} · ${typeNames[finding.evidence_type]||readable(finding.evidence_type)}`:'';
 $('#scene-subtitle').textContent=[selectedLabel,map?(comparison?'Comparison with a different study':'Published group-level functional map'):finding?'':targets[state.target].kind==='reference'?'Confirmed drawing label · anatomical context':'Explore anatomy and related study findings'].filter(Boolean).join(' · ');
 $('.viewport-heading .eyebrow').textContent=topics[state.topic].title+' / '+(map?(comparison?'COMPARISON MAP':'PUBLISHED FUNCTIONAL MAP'):finding?'SELECTED FINDING':'ANATOMICAL REFERENCE');
 renderRegionLegend();
 let caption=sceneDescription({map,target:targets[state.target],finding,regions:activeRegions()});
 if(finding&&!map){
  // Per-region qualifications remain in the adjacent Anatomy for this finding details.
  caption=finding.display_note||'Shading locates the anatomy named in the finding; it does not reconstruct the study’s treatment site or measured effect.';
  if(!finding.entity_ids.length)caption=finding.display_note||'No localized anatomical highlight is available for this finding.';
  if(state.bundles.size&&finding.source_id!=='P32620886')caption+=' Visible fibers are reference anatomy, not this study’s reconstructed treatment connections.';
 }
 if(state.map==='off'&&finding?.entity_ids.some(id=>!['left','right','bilateral','midline'].includes(finding.entity_laterality?.[id])&&(mapping[id]||[]).some(mesh=>!regionsForMesh(mesh,state.regions,regionCatalog).length)))caption+=' Blue regions locate reported anatomy whose side was not specified; they do not imply bilateral effects.';
 if(finding?.source_id==='P32620886'&&state.bundles.has('OCD_RESPONSE'))caption+=' Red fibers are the positive-weight portion of Li’s released response atlas; they are not a significance map or individual patient tractogram.';
 if(finding&&state.map==='off'){caption+=' Reference anatomy follows the reported sides; color does not indicate significance or benefit.';}
 if(finding&&map)caption+=' The released group map spans its own spatial extent; its colors do not mark this finding’s individual treatment sites. Choose None to inspect regional anatomy.';
 if(map)caption+=' Surface colors are a group projection, not an individual treatment field.';
 $('#geometry-caption').replaceChildren(el('strong','','Shown in 3D: '),document.createTextNode(caption));
 renderRegionInfo();
 if(state.regions.size&&!map)$('#geometry-caption').append(document.createTextNode(' Checked region colors show independent reference anatomy, not the selected finding’s effects. AAL3 estimates may have small boundary mismatches with the background template.'));
 updateMapControls();if(!map)return;
 holder.append(el('p','map-relationship',comparison?`Comparison only: ${map.name}. This overlay is not evidence from ${source?paperById[source].label:'the selected target'}.`:`Source-linked overlay: ${map.name}.`));

 holder.append(el('p','',`Cortical projection · ${map.id==='taylor-circuit'?'group t map':'symptom-preference map'} · blue −${map.scale.toFixed(2)}, neutral 0, orange +${map.scale.toFixed(2)}. Display limits are not significance thresholds.`));
 const a=el('a','','Original map & provenance');a.href=map.url;a.target='_blank';a.rel='noopener';holder.append(a);
}
function activeRegions(){return regionCatalog.regions.filter(r=>state.regions.has(r.id));}
function relatedRegionTopic(r){return r.relevant_topics.includes(state.topic)&&targets[r.evidence_target].topics.includes(state.topic)?state.topic:r.evidence_topic;}
function renderRegionInfo(){
 const holder=$('#region-list');
 if(!holder.children.length)for(const r of regionCatalog.regions){
  const row=el('div','region-row');const label=el('label','bundle-row');
  const box=el('input');box.type='checkbox';box.id=`region-${r.id}`;box.dataset.region=r.id;
  box.addEventListener('change',()=>selectRegion(r.id,box.checked));
  const swatch=el('span','region-swatch');swatch.style.background=r.color;label.append(box,swatch,el('span','',regionNames[r.id]||r.name));
  const detail=el('details','region-detail');detail.append(el('summary','', 'Boundaries & evidence'));
  detail.append(el('p','',r.description),el('p','region-limit',r.limitations),el('p','',r.evidence_note));
  for(const source of r.sources){const a=el('a','',source.label);a.href=source.url;a.target='_blank';a.rel='noopener';a.title=source.role;detail.append(a,el('p','source-role',source.role));}
  const related=el('button','quiet','View related evidence');related.addEventListener('click',()=>{const topic=relatedRegionTopic(r);selectTopic(topic);selectTarget(r.evidence_target);});detail.append(related);
  const note=el('small','region-visibility');note.id=`region-note-${r.id}`;
  row.append(label,note,detail);holder.append(row);
 }
 for(const r of regionCatalog.regions)$(`#region-${r.id}`).checked=state.regions.has(r.id);
 $('#region-opacity').value=regionOpacity;$('#region-opacity-control').hidden=!state.regions.size;
 updateRegionStatus();renderRegionLegend();
}
function updateRegionStatus(){
 const selected=activeRegions();
 for(const r of regionCatalog.regions){const note=$(`#region-note-${r.id}`);if(!note)continue;note.textContent=state.regions.has(r.id)?regionVisibilityNote(r,state.hemisphere,regionOpacity,state.map):'';note.hidden=!note.textContent;}
 $('#region-status').textContent=selected.length?(state.map!=='off'?'Region colors are paused while the functional map is shown. Turn the map off to restore them.':`${selected.length} ${selected.length===1?'region':'regions'} selected · ${Math.round(regionOpacity*100)}% opacity`):'Select regions to add colored shading in any view.';
 $('#region-opacity').disabled=state.map!=='off';
}
function renderRegionLegend(){
 const holder=$('.legend');holder.replaceChildren();
 $('#layer-notice').hidden=!(state.map!=='off'&&state.regions.size);
 const map=studyMaps.find(m=>m.id===state.map),scale=$('#functional-legend');scale.replaceChildren();scale.hidden=!map;
 if(map){scale.append(el('span','negative',`${map.negative_label} (−${map.scale.toFixed(2)})`),el('span','map-gradient'),el('span','positive',`${map.positive_label} (+${map.scale.toFixed(2)})`));scale.setAttribute('aria-label',`${map.name}; neutral midpoint is zero. Display range is not a significance threshold.`);}

 const key=(label,color,cls='')=>{const span=el('span',cls);const chip=el('i');chip.style.background=color;span.append(chip,document.createTextNode(label));holder.append(span);};
 const visible=atlas.meshes.filter(m=>objects.get(m.id)?.visible);
 const selected=visible.filter(m=>meshRole(m)==='selected');
 if(teachingScene){for(const [id,color]of Object.entries(teachingScene.colors)){const ids=meshIdsFor([id],teachingScene.sides,{[id]:[...(mapping[id]||[]),...(contextMapping[id]||[])]});if(visible.some(m=>ids.includes(m.id)&&['selected','landmark'].includes(meshRole(m))))key(id==='SCC_WM'?'sgACC beside DBS target':id==='SCC_GM'?'Subgenual anterior cingulate cortex (sgACC)':entityById[id]?.label||id,color);}}
 if(!teachingScene&&state.map==='off'&&selected.some(m=>m.is_cortex)){
  const sccReference=state.target==='scc'&&!state.selected;
  key(sccReference?regionNames.sgacc:'Highlighted cortex',sccReference?regionDefinition('sgacc',regionCatalog).color:'#c99270');
 }
 if(!teachingScene&&visible.some(m=>meshRole(m)==='landmark')&&state.map==='off')key(regionNames.sgacc,regionDefinition('sgacc',regionCatalog).color);
 if(!teachingScene&&selected.some(m=>!m.is_cortex))key('Highlighted deep structures','#c48a5c');
 if(visible.some(m=>meshRole(m)==='context'&&(!m.is_cortex||state.map==='off')))key('Related anatomy',contextColor);
 if(visible.some(m=>meshRole(m)==='background'&&(!m.is_cortex||state.map==='off')))key('Background anatomy','#859b82');
 for(const family of state.bundles)if(atlas.tracts.some(t=>t.family===family&&tractObjects.get(t.id)?.visible)||visible.some(m=>m.pathway_family===family))key(bundleNames[family],colors[family],'tract-legend-item');
 for(const r of activeRegions())if(state.map==='off'&&regionOpacity>0&&r.mesh_ids.some(id=>objects.get(id)?.visible))key(regionNames[r.id]||r.name,r.color,'region-legend-item');
 const overlap=state.map==='off'&&visible.some(m=>new Set(regionsForMesh(m.id,state.regions,regionCatalog).map(r=>r.color)).size>1);
 if(overlap&&regionOpacity>0)key('Overlapping regions (striped)','repeating-linear-gradient(135deg,#9a78b4 0 4px,#668ac3 4px 8px)');
 if(visible.some(m=>m.label_points!==false&&(highlight.has(m.id)||sccLandmark(m)||(state.map==='off'&&regionsForMesh(m.id,state.regions,regionCatalog).length))))key('Anatomy label dots','#89654f','point-legend-item');
 const pointKeys=new Map(visiblePoints().map(p=>{const style=coordinateStyle(p);return [style.legend,style.color];}));
 for(const [label,color]of pointKeys)key(label,color,'point-legend-item');
 holder.hidden=!holder.children.length;
}
function selectRegion(id,enabled=true){
 if(!regionDefinition(id,regionCatalog))return;
 enabled?state.regions.add(id):state.regions.delete(id);
 // Adding reference regions never silently replaces the current study map.
 renderMapInfo();setAppearance();syncUrl();
}

function selectedAnatomy(){if(teachingScene)return {finding:null,ids:teachingScene.entities,sides:teachingScene.sides,meshes:mapping};const finding=evidence.evidence.find(e=>e.id===state.selected);return {finding,ids:finding?finding.entity_ids:targets[state.target].focus,sides:finding?finding.entity_laterality:targets[state.target].focus_laterality||{},meshes:{...mapping,...finding?.entity_mesh_ids}};}
function sccLandmark(mesh){const {ids}=selectedAnatomy();return mesh.region_id==='sgacc'&&ids.includes('SCC_WM')&&!ids.includes('SCC_GM');}
// Interaction follows the visible selection, not the existence of a catalog blurb.
function meshRole(mesh){
 if(mesh.pathway_family)return state.bundles.has(mesh.pathway_family)?'pathway':'background';
 if(hoverBlurb({kind:'mesh',id:mesh.id},hoverGuide)?.role==='Background cortical anatomy')return 'background';
 if(state.map==='off'&&regionsForMesh(mesh.id,state.regions,regionCatalog).length)return 'region';
 if(highlight.has(mesh.id))return 'selected';
 if(contextMeshes.has(mesh.id))return sccLandmark(mesh)?'landmark':'context';
 return 'background';
}
function renderAnatomySummary(){
 const {finding,ids,sides,meshes}=selectedAnatomy(),holder=$('#anatomy-summary');holder.replaceChildren();
 if(finding){
  const details=el('details');details.append(el('summary','','Anatomy for this finding'));
  const list=el('dl','anatomy-details');
  for(const id of ids){
   const side=sides[id]||'unspecified';const mapped=(meshes[id]||[]).length;
   const shown=(state.map!=='off'&&(meshes[id]||[]).some(mesh=>mesh.startsWith('aal3-'))?'This regional surface is hidden by the functional map; select None to inspect its anatomy. ': '')+(entityById[id]?.display_note|| (id==='ITP'?'A local segmented volume is available; the full pathway and study stimulation field are not reconstructed.':fiberEntities[id]?.length?'Related tracts are available; these are general anatomy, not this study’s reconstructed fibers.':!mapped?'This structure or pathway is not drawn.':['preSMA','dmPFC','SCC_GM'].includes(id)?'Approximate anatomical region; the individual stimulation site is not shown.':'Reference anatomy; the exact study target or measured effect is not reconstructed.'));
   list.append(el('dt','',entityById[id]?.label||id),el('dd','',`${side==='unspecified'?'Side not specified':readable(side)}. ${readable(finding.entity_roles?.[id]||'Reported region')}. ${shown}`));
  }
  details.append(list);holder.append(details);
 }
 const compare=$('#target-context');compare.hidden=!(ids.includes('preSMA')||ids.includes('dmPFC')||['presma','medial'].includes(state.target));
 if(!compare.hidden){for(const b of compare.querySelectorAll('[data-context-target]')){const active=b.dataset.contextTarget===state.target;b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active));}}
}
function isSide(side){return state.hemisphere==='both'||side==='midline'||side==='bilateral'||side===state.hemisphere;}
function updateHighlights(){
 const {finding,ids,sides,meshes}=selectedAnatomy();
 const known=ids.filter(id=>!finding||(['left','right','bilateral','midline'].includes(sides[id])&&finding.entity_display_modes?.[id]!=='context'));
 highlight=new Set(meshIdsFor(known,sides,meshes));
 contextMeshes=new Set([...meshIdsFor(ids,sides,contextMapping),...meshIdsFor(ids.filter(id=>!known.includes(id)),sides,meshes)]);
 renderAnatomySummary();
}
// Shared parcels carry spatial stripes instead of silently losing one region's color.
const regionColorCache=new WeakMap();
function regionalColors(mesh,regions){
 const unique=[...new Set(regions.map(r=>r.color))],key=unique.join(',');
 let cache=regionColorCache.get(mesh);if(!cache){cache={};regionColorCache.set(mesh,cache);}if(cache[key])return cache[key];
 const palette=unique.map(c=>new THREE.Color(c)),pos=mesh.geometry.attributes.position,colors=new Float32Array(pos.count*3);
 for(let i=0;i<pos.count;i++){const n=Math.floor((pos.getX(i)+pos.getY(i)+pos.getZ(i))/4);const c=palette[((n%palette.length)+palette.length)%palette.length];colors.set([c.r,c.g,c.b],i*3);}
 return cache[key]=new THREE.BufferAttribute(colors,3);
}
function setAppearance(){
 renderDirty=true;updateHighlights();updateRegionStatus();
 for(const m of atlas.meshes){const obj=objects.get(m.id);if(!obj)continue;
  const role=meshRole(m),focused=role==='selected',context=role==='context'||role==='landmark';
  const regions=state.map==='off'?regionsForMesh(m.id,state.regions,regionCatalog):[],regional=regions.length>0;
  const studyMap=studyMaps.find(x=>x.id===state.map),mapped=m.is_cortex&&!m.regional_only&&studyMap&&mapData.has(state.map);
  const opacity=m.pathway_family?.55:m.is_cortex?(regional?regionOpacity:cortexAlpha({mapped,focused:focused||role==='landmark',context,cortexOpacity,mapOpacity})):(focused?.95:context?.18:.105);
  obj.visible=(!m.pathway_family||state.bundles.has(m.pathway_family))&&isSide(m.side)&&m.id!=='brain-envelope'&&opacity>0&&(!m.regional_only||(state.map==='off'&&(regional||focused||context)));
  obj.traverse(child=>{if(!child.isMesh)return;const mat=child.material;const stripes=regional&&new Set(regions.map(r=>r.color)).size>1;
   mat.vertexColors=!!mapped||stripes;
   if(mapped)child.geometry.setAttribute('color',surfaceColors(child,studyMap));
   if(stripes)child.geometry.setAttribute('color',regionalColors(child,regions));
   const sccReference=(focused&&m.region_id==='sgacc'&&state.target==='scc'&&!state.selected)||role==='landmark';
   const teachingColor=teachingScene&&(focused||context)&&Object.entries(teachingScene.colors).find(([id])=>meshIdsFor([id],teachingScene.sides,{[id]:[...(mapping[id]||[]),...(contextMapping[id]||[])]}).includes(m.id))?.[1];
   mat.color.set(teachingColor|| (m.pathway_family?colors[m.pathway_family]:mapped||stripes?'#ffffff':regional?regions[0].color:sccReference?regionDefinition('sgacc',regionCatalog).color:focused?(m.is_cortex?'#c99270':'#c48a5c'):context?contextColor:'#859b82'));
   // Keep the current rendered alpha when controls change; fade toward the new baseline.
   mat.opacity=child.userData.appearance?mat.opacity:opacity;mat.transparent=opacity<1;mat.depthWrite=!!(mapped&&mapOpacity>=.5)||focused&&!m.is_cortex;child.userData.appearance={opacity,depthWrite:mat.depthWrite,transparent:mat.transparent};mat.roughness=.72;mat.metalness=0;child.renderOrder=regional||focused?2:0;mat.needsUpdate=true;
  });
 }
 for(const t of atlas.tracts){const obj=tractObjects.get(t.id);if(obj){obj.visible=state.bundles.has(t.family)&&isSide(t.side);obj.material.clippingPlanes=state.hemisphere==='both'?[]:[new THREE.Plane(new THREE.Vector3(state.hemisphere==='left'?-1:1,0,0),0)];}}
 renderRegionLegend();renderMarkers();updateCircuitStatus();validatePinnedFocus();updateLabels();clearHover();
}

function updateLabels(){
 renderDirty=true;$('#label-layer').replaceChildren();labelElements.clear();
 const svg=document.createElementNS('http://www.w3.org/2000/svg','svg');svg.setAttribute('class','label-connectors');$('#label-layer').append(svg);
 function addLabel(id,text,centroid,color,point=false,pinned=false,anchorDot=true){if(labelElements.has(id))return;const div=el('div','anatomy-label'+(point?' point-label':'')+(pinned?' pinned-label':''),text);div.hidden=!labelsOn&&!pinned;const line=document.createElementNS(svg.namespaceURI,'line');line.setAttribute('stroke',color);svg.append(line);const dot=document.createElementNS(svg.namespaceURI,'circle');dot.setAttribute('r',point?'3.5':'2.5');dot.setAttribute('fill',color);svg.append(dot);$('#label-layer').append(div);labelElements.set(id,{div,line,dot,centroid,point,pinned,anchorDot});}
 // A chosen name stays visible even with automatic labels off. Give it layout
 // priority; broad regions and tracts gain a leader, never a new coordinate dot.
 const pinnedObject=focusObject(pinnedTarget);
 if(pinnedObject?.visible){const m=pinnedObject.userData.point||pinnedObject.userData.tract||pinnedObject.userData.atlas;const anchor=m.xyz||m.centroid||pinnedTarget.anchor;if(anchor)addLabel(pinnedTarget.id,focusName(pinnedTarget),anchor,pinnedTarget.kind==='point'?coordinateStyle(m).color:pinnedTarget.kind==='tract'?colors[m.family]:'#735943',pinnedTarget.kind==='point',true,pinnedTarget.kind==='point'||(pinnedTarget.kind==='mesh'&&m.label_points!==false));}
 for(const p of visiblePoints())addLabel(p.id,p.name,p.xyz,coordinateStyle(p).color,true);
 let n=0;
 for(const m of atlas.meshes){if(m.label_points===false||(!highlight.has(m.id)&&!sccLandmark(m)&&!(state.map==='off'&&regionsForMesh(m.id,state.regions,regionCatalog).length))||!isSide(m.side)||!objects.get(m.id)?.visible)continue;if(n++>=14)break;
  const label=m.name.replace(/ \([LR]\)$/,'');addLabel(m.id,`${m.side==='left'?'L':m.side==='right'?'R':''} ${label}`,m.centroid,'#89654f');
 }
}
function positionLabels(){
 const placed=[];const width=viewport.clientWidth,height=viewport.clientHeight;const bottomLimit=height-22,topLimit=12;anatomy.updateMatrixWorld();
 for(const {div,line,dot,centroid,pinned,anchorDot} of labelElements.values()){
  const p=new THREE.Vector3(...centroid).applyMatrix4(anatomy.matrixWorld).project(camera);
  const px=(p.x*.5+.5)*width,py=(-p.y*.5+.5)*height;
  // Anchors stay at their projected location even when text is hidden or crowded.
  div.style.display='none';line.style.display='none';dot.style.display='none';
  if(p.z>1||p.z< -1||px<8||px>width-8||py<8||py>height-8)continue;
  dot.style.display=anchorDot?'block':'none';dot.setAttribute('cx',px);dot.setAttribute('cy',py);
  if(!labelsOn&&!pinned)continue;
  div.style.display='block';const w=div.offsetWidth,h=div.offsetHeight;
  let x=Math.max(w/2+8,Math.min(width-w/2-8,px+w/2+18)),y=py-22;
  const ys=[Math.max(topLimit+h/2+1,Math.min(bottomLimit-h/2-1,y)),y+32,y-32,y+64,y-64,y+96,y-96];y=ys.find(v=>v>topLimit+h/2&&v<bottomLimit-h/2&&!placed.some(a=>Math.abs(x-a.x)<(w+a.w)/2+8&&Math.abs(v-a.y)<(h+a.h)/2+7));
  if(y===undefined){div.style.display='none';continue;}
  div.style.left=`${x}px`;div.style.top=`${y}px`;placed.push({x,y,w,h});
  line.style.display='block';
  for(const [a,v]of Object.entries({x1:px,y1:py,x2:Math.max(x-w/2,Math.min(x+w/2,px)),y2:Math.max(y-h/2,Math.min(y+h/2,py))}))line.setAttribute(a,v);
 }
 positionOrientation();
}
function positionOrientation(){
 const rot=camera.quaternion.clone().invert();
 for(const [label,v]of Object.entries({R:[1,0,0],L:[-1,0,0],A:[0,0,-1],P:[0,0,1],S:[0,1,0],I:[0,-1,0]})){
  const p=new THREE.Vector3(...v).applyQuaternion(rot);const e=$(`#axis-${label}`);const axial=Math.hypot(p.x,p.y)<.15;e.style.left=`${38+p.x*27+(axial?(p.z>0?-6:6):0)}px`;e.style.top=`${38-p.y*27}px`;e.style.opacity=p.z<0?'.4':'1';
 }
}
function targetCount(id){return evidence.evidence.filter(e=>inTopic(e)&&inTarget(e,id)).length;}
function renderTargets(){
 const holder=$('#target-list');holder.replaceChildren();
 const available=Object.entries(targets).filter(([,t])=>t.topics.includes(state.topic));
 for(const group of ['Anatomical targets & network references','Study-defined targeting approaches','Mechanism & network research','Reference anatomy','Collection overview']){
  const entries=available.filter(([id])=>targetGroup(id)===group);if(!entries.length)continue;
  holder.append(el('h2','target-group-label',group));
  for(const [id,t]of entries){const b=el('button','target'+(state.target===id?' active':''));b.dataset.target=id;b.setAttribute('aria-pressed',String(state.target===id));const text=el('span');text.append(el('strong','',id==='overview'?'All findings in this focus':t.name),el('small','',id==='overview'?`${state.topic==='all'?evidence.sources.length:topics[state.topic].sources.length} sources`:t.sub));b.append(text,el('b','',t.kind==='reference'?'Reference':`${targetCount(id)} ${targetCount(id)===1?'finding':'findings'}`));b.addEventListener('click',()=>selectTarget(id));holder.append(b);}
 }
}

function updateCircuitStatus(){
 const profile=currentCircuit();$('#restore-tracts').hidden=state.tractMode!=='custom';
 const count=state.bundles.size;$('#tract-status').textContent=profile?`${count} ${count===1?'tract':'tracts'} selected${state.tractMode==='custom'?' (custom selection)':''}. Use Hemisphere to choose which side to show.`:'';
 $('#reveal-tracts').hidden=!(count&&state.map!=='off'&&mapOpacity>.45);
}
function renderCircuitInfo(){
 const profile=currentCircuit(),holder=$('#circuit-info');holder.replaceChildren();holder.hidden=!profile;if(!profile)return;
 holder.append(el('strong','',profile.title),el('p','',profile.summary));
 const details=el('details');details.append(el('summary','',profile.bundles.length?'Why these fibers? Sources & limits':'Circuit sources & limits'));
 for(const [family,reason]of Object.entries(profile.bundle_reasons))details.append(el('p','',`${bundleNames[family]}: ${reason}`));
 details.append(el('p','circuit-limit',profile.limitations),el('p','',circuitCatalog.interpretation));
 const refs=el('div','circuit-sources');for(const id of profile.source_ids){const source=paperById[id]||circuitCatalog.sources.find(x=>x.id===id);const a=el('a','',source.label+(source.kind?' · '+source.kind:''));a.href=source.url;a.target='_blank';a.rel='noopener';refs.append(a);}details.append(refs);
 holder.append(details,el('p','small','Reference context stays separate from the selected finding and its reported laterality.'));
}
function renderBundles(){
 renderCircuitInfo();updateCircuitStatus();const holder=$('#bundle-list');holder.replaceChildren();const groups=new Map();
 for(const [family,name]of Object.entries(bundleNames)){
  const group=publicCatalog.families[family]?.group;let parent=holder;
  if(group){if(!groups.has(group)){const details=el('details','tract-group');details.open=Object.entries(publicCatalog.families).some(([id,x])=>x.group===group&&state.bundles.has(id));details.append(el('summary','',group));holder.append(details);groups.set(group,details);}parent=groups.get(group);}
  const label=el('label','bundle-row'),box=el('input');box.type='checkbox';box.checked=state.bundles.has(family);box.dataset.bundle=family;
  box.addEventListener('change',()=>{box.checked?state.bundles.add(family):state.bundles.delete(family);state.tractMode='custom';renderMapInfo();setAppearance();syncUrl();});
  const dot=el('span','color-dot');dot.style.background=colors[family];label.append(box,dot,el('span','',name));parent.append(label);
 }
}
function readable(str){return String(str||'').replaceAll('_',' ');}
function badgeClass(e){if(/functional|eeg|reanalysis|physiolog/.test(e.evidence_type))return ' functional';if(/association|response|outcome/.test(e.evidence_type))return ' association';return '';}
function renderEvidence(){
 renderStudySummary();renderCurrentContext();const list=$('#evidence-list');
 const openGroups=new Set([...list.querySelectorAll('details[data-group][open]')].map(e=>e.dataset.group));
 list.replaceChildren();const items=records();$('#evidence-count').textContent=`${items.length} ${items.length===1?'finding':'findings'} in this view`;$('#evidence-description').textContent=targets[state.target].entities?`Findings related to ${targets[state.target].name}.`:'All findings in this clinical focus.';
 $('#clear-evidence').hidden=!state.selected;
 if(!items.length){list.append(el('p','empty',state.search?'No findings match your search in this view. Clear the search or try another term.':'No findings match the selected study and target. Select another study or target.'));if(state.search){const clear=el('button','quiet empty-clear','Clear search');clear.addEventListener('click',()=>{$('#evidence-search').value='';$('#evidence-search').dispatchEvent(new Event('input'));});list.append(clear);}return;}
 const groups=groupEvidence(items,evidence.sources),containers=new Map();
 let optional;
 for(const [index,group] of groups.entries()){
  const all=[...group.records,...group.earlier],selected=all.some(e=>e.id===state.selected);
  let parent=list;
  if(group.optional){if(!optional){optional=el('details','optional-evidence');optional.dataset.group='optional';optional.append(el('summary','','Historical observations & research background'));optional.open=openGroups.has('optional');list.append(optional);}parent=optional;if(selected||state.search||state.study!=='all')optional.open=true;}
  const section=el('details','evidence-group');section.dataset.group=group.id;
  section.open=selected||!!state.search||state.study!=='all'||openGroups.has(group.id)||(index===0&&!group.optional);
  section.append(el('summary','',group.title));
  if(group.note)section.append(el('p','evidence-interpretation',group.note));
  parent.append(section);for(const e of group.records)containers.set(e.id,section);
  if(group.earlier.length){const earlier=el('details','earlier-analysis');earlier.dataset.group=group.id+'-earlier';earlier.open=group.earlier.some(e=>e.id===state.selected)||!!state.search||openGroups.has(earlier.dataset.group);earlier.append(el('summary','','Original analysis before artifact controls'),el('p','evidence-interpretation','Read with the right-seed findings and nonsignificant left-seed results in the addendum. This earlier analysis is retained for source history, not additional confirmation.'));section.append(earlier);for(const e of group.earlier)containers.set(e.id,earlier);}
 }
 for(const e of groups.flatMap(g=>[...g.records,...g.earlier])){const source=paperById[e.source_id];const card=el('article','evidence-card'+(state.selected===e.id?' selected':''));card.dataset.evidence=e.id;const head=el('div','card-head');head.append(el('strong','',source.label));if(state.selected===e.id)head.append(el('span','selection-status','Selected'));const finding=el('button','finding',e.finding);finding.setAttribute('aria-label',`${e.entity_ids.length?'Highlight anatomy for':'Select finding'} ${e.id}: ${e.finding}`);finding.setAttribute('aria-pressed',String(state.selected===e.id));finding.addEventListener('click',()=>selectEvidence(e.id));card.append(head,finding);
 card.append(el('span','badge'+badgeClass(e),typeNames[e.evidence_type]||readable(e.evidence_type)));
 const side=readable(e.laterality),sideKnown=side&&!/not resolved|not applicable/.test(side);const info=[e.evidence_population||'',e.analysis_n?`Participants analyzed: ${countText(e.analysis_n)}`:'',sideKnown?`Reported side: ${side}`:''].filter(Boolean).join(' · ');if(info)card.append(el('p','card-meta',info));
 if(e.controlled_result)card.append(el('p','controlled-result',e.controlled_result));if(e.round===5&&e.display_note)card.append(el('p','card-meta',e.display_note));card.append(el('p','study-design',readable(e.study_design||source.design||'Study design unspecified')));
 const detail=el('details');detail.append(el('summary','','Interpretation & source location'));detail.append(el('p','',e.limitations));if(!sideKnown&&e.entity_ids.length)detail.append(el('p','','Laterality is not specified in the reviewed material.'));detail.append(el('p','record-id',`Record ID: ${e.id}`));if(e.evidence_locator){const loc=e.evidence_locator;detail.append(el('p','',`${loc.pdf_page?'PDF page '+loc.pdf_page+' · ':''}${loc.detail}`));}if(source.sample)detail.append(el('p','',`Sample: ${source.sample}.`));if(source.targeting)detail.append(el('p','',`Targeting: ${source.targeting}`));if(source.protocol)detail.append(el('p','',`Study protocol: ${source.protocol}`));if(e.directionality)detail.append(el('p','',`Directionality: ${readable(e.directionality)}.`));card.append(detail);
 const analysisCoordinates=(evidence.analysis_coordinates||[]).filter(p=>p.finding_ids.includes(e.id));
 if(analysisCoordinates.length){
  detail.append(el('p','','Published planning analysis centers (MNI mm; source details only):'));
  const coordinates=el('ul');for(const p of analysisCoordinates)coordinates.append(el('li','',`${p.name.replace(' · planning ROI','')}: ${p.xyz.join(', ')}`));
  detail.append(coordinates,el('p','',`${analysisCoordinates[0].locator}. These analysis locations are not treatment targets.`));
 }
 const links=el('div','source-links');const paper=el('a','','Publication');paper.href=source.url;paper.target='_blank';paper.rel='noopener';links.append(paper);
 for(const loc of e.supporting_locators||[]){const supporting=el('a','',loc.label);supporting.href=loc.asset_id&&!window.__NMATLAS_HOSTED__?`source/${encodeURIComponent(loc.asset_id)}#page=${loc.pdf_page||1}`:paperById[loc.source_id].url;supporting.title=`${paperById[loc.source_id].label}: ${loc.detail}`;supporting.target='_blank';supporting.rel='noopener';links.append(supporting);}
 const asset=e.evidence_locator?.asset_id;if(asset&&!window.__NMATLAS_HOSTED__){const local=el('a','','Source PDF');local.href=`source/${encodeURIComponent(asset)}#page=${e.evidence_locator.pdf_page||1}`;local.target='_blank';local.rel='noopener';links.append(local);}if(source.abstract_url){const a=el('a','','Reviewed abstract');a.href=source.abstract_url;a.target='_blank';a.rel='noopener';links.append(a);}if(source.full_text_url&&(!asset||window.__NMATLAS_HOSTED__)){const full=el('a','','Full text');full.href=source.full_text_url;full.target='_blank';full.rel='noopener';links.append(full);}if(source.supplements?.length&&!window.__NMATLAS_HOSTED__){for(const x of source.supplements){const link=el('a','',x.label);link.href=`source/${encodeURIComponent(x.asset_id)}`;link.target='_blank';link.rel='noopener';links.append(link);}}for(const related of source.related_publications||[]){const link=el('a','',related.label);link.href=related.url;link.title=related.note||'';link.target='_blank';link.rel='noopener';links.append(link);}if(source.resource_url){const r=el('a','',source.key==='li2020'?'Tract resource':'Released map');r.href=source.resource_url;r.target='_blank';r.rel='noopener';links.append(r);}card.append(links);containers.get(e.id).append(card);
 }
 for(const earlier of list.querySelectorAll('.earlier-analysis'))earlier.parentElement.append(earlier);
}
function renderCurrentContext(){
 const holder=$('#current-context');holder.replaceChildren();
 holder.append(el('h3','','Current understanding'));
 const references=Object.fromEntries([...circuitCatalog.sources,...evidence.sources].map(s=>[s.id,s]));
 for(const entry of contextsFor(state.topic,state.target)){
  if(entry.topic)holder.append(el('strong','context-topic',topics[entry.topic].title));
  holder.append(el('p','',entry.text),el('p','context-uncertainty',entry.uncertainty));
  if(entry.sources.length){const detail=el('details');detail.append(el('summary','','Evidence behind this interpretation'));const links=el('div','source-links');for(const id of entry.sources){const source=references[id];if(!source)continue;const a=el('a','',source.label||source.title);a.href=source.url;a.target='_blank';a.rel='noopener';links.append(a);}detail.append(links);holder.append(detail);}
 }
}
function renderStudySummary(){
 const h=$('#study-summary');h.replaceChildren();if(state.study==='all')return;const s=paperById[state.study];h.append(el('strong','',s.title));if(sourceInterpretations[s.id])h.append(el('p','evidence-interpretation',sourceInterpretations[s.id]));
 for(const text of [s.design,s.sample].filter(Boolean))h.append(el('p','',readable(text)));
 const notes=[s.targeting,s.protocol,s.review_status,s.correction].filter(Boolean);
 if(notes.length){const details=el('details');details.append(el('summary','','Study methods & review notes'));for(const text of notes)details.append(el('p','',text));h.append(details);}
}
function renderStudyFilter(){const select=$('#study-filter');select.replaceChildren();const all=el('option','','All studies');all.value='all';select.append(all);for(const s of studySourcesInView()){const op=el('option','',s.label);op.value=s.id;select.append(op);}select.value=state.study;}
function atlasUrl(){
 const u=new URL(location);u.searchParams.set('v','0.17.0');
 u.hash=new URLSearchParams({topic:state.topic,target:state.target,map:state.map,regions:activeRegions().map(r=>r.id).join(','),regionOpacity:String(regionOpacity),hemisphere:state.hemisphere,view:state.view,cortex:String(cortexOpacity),mapOpacity:String(mapOpacity),labels:String(labelsOn),bundles:[...state.bundles].join(','),tractMode:state.tractMode,panel:state.panel,...(state.selected?{finding:state.selected}:{}),...(state.study!=='all'?{study:state.study}:{}),...(state.search?{q:state.search}:{}),...Object.fromEntries(['returnLesson','returnStep','returnElement'].filter(k=>state[k]!=null).map(k=>[k,state[k]]))}).toString();return u;
}
function syncUrl({replace=false}={}){
 workspaceUI?.update();if(restoringUrl||teachingEmbed)return;
 urlReplaceOnly=urlReplaceOnly&&replace;if(urlWritePending)return;urlWritePending=true;
 queueMicrotask(()=>{const u=atlasUrl();if(u.href!==location.href)history[urlReplaceOnly?'replaceState':'pushState'](null,'',u);urlWritePending=false;urlReplaceOnly=true;});
}

function selectTarget(id){
 state.target=id;state.selected=null;state.study='all';if(!restoringUrl){state.regions.clear();state.returnLesson=null;state.returnStep=null;state.returnElement=null;}$('.evidence-panel').scrollTop=0;state.search='';$('#evidence-search').value='';applySelectionMap();state.hemisphere='both';$('#hemisphere').value=state.hemisphere;$('#pick-choices').hidden=true;$('.viewport-panel').scrollTop=0;
 state.tractMode='suggested';state.bundles=new Set(suggestedBundles());if(currentCircuit()&&state.map!=='off')mapOpacity=.28;$('#scene-title').textContent=targets[id].name;renderMapInfo();renderTargets();renderStudyFilter();renderBundles();renderEvidence();setAppearance();setCamera(state.view==='free'?'oblique':state.view);syncUrl();
}
function selectTopic(id){state.topic=id;state.study='all';for(const b of document.querySelectorAll('[data-topic]')){const on=b.dataset.topic===id;b.classList.toggle('active',on);b.setAttribute('aria-pressed',String(on));}$('#focus-title').textContent=topics[id].title;$('#focus-description').textContent=topics[id].description;state.view=id.startsWith('tms')?(id==='tms-ocd'?'anterior':'lateral'):'oblique';selectTarget(topics[id].default);}
function selectEvidence(id){
 const e=evidence.evidence.find(x=>x.id===id);if(!e||!records().some(x=>x.id===id))return;state.selected=state.selected===id?null:id;
 if(currentCircuit()){if(state.tractMode!=='custom')state.bundles=new Set(suggestedBundles());}
 else {state.tractMode='suggested';state.bundles=new Set(state.selected?(e.source_id==='P32620886'?['OCD_RESPONSE']:e.entity_ids.flatMap(x=>fiberEntities[x]||[])):targets[state.target].bundles);}
 // Reveal all reported sides when a finding changes; an intentional later filter remains possible.
 state.hemisphere='both';$('#hemisphere').value='both';applySelectionMap();
 renderMapInfo();renderBundles();renderEvidence();setAppearance();setCamera(['free','medial'].includes(state.view)?'oblique':state.view);syncUrl();
}
function setCamera(view){
 state.view=view;state.hemisphere=medialHemisphere(view,state.hemisphere);$('#hemisphere').value=state.hemisphere;
 const right=state.hemisphere==='right';const positions={oblique:[right?255:-255,95,-185],lateral:[right?340:-340,15,5],medial:[right?-300:300,15,5],anterior:[0,20,-355],superior:[0,365,10]};
 camera.position.set(...positions[view]);camera.up.set(0,view==='superior'?0:1,view==='superior'?1:0);controls.target.set(0,5,10);controls.update();
 document.querySelectorAll('[data-view]').forEach(b=>b.classList.toggle('active',b.dataset.view===view));
 $('.viewport-panel').scrollTop=0;$('#orientation').textContent=({oblique:(right?'Right':'Left')+' oblique view',lateral:(right?'Right':'Left')+' lateral view',medial:(right?'Right':'Left')+' medial view · isolated hemisphere',anterior:'Anterior view',superior:'Superior view'})[view];setAppearance();syncUrl();
}
function restoreUrl(){
 if(restoringUrl)return;restoringUrl=true;
 const version=new URL(location).searchParams.get('v');const p=new URLSearchParams(location.hash.slice(1));let topic=p.get('topic');const target=p.get('target'),finding=p.get('finding'),study=p.get('study');for(const key of ['returnLesson','returnStep','returnElement'])state[key]=p.get(key);state.panel=['targets','evidence','layers'].includes(p.get('panel'))?p.get('panel'):finding||study?'evidence':'targets';if(topic==='tms')topic=['medial','ofc','presma','deep-medial'].includes(target)?'tms-ocd':'tms-depression';selectTopic(topics[topic]?topic:'tms-depression');if(target&&targets[target]?.topics.includes(state.topic))selectTarget(target);
 if(study&&studySourcesInView().some(s=>s.id===study)){state.study=study;renderStudyFilter();}state.search=p.get('q')||'';$('#evidence-search').value=state.search;renderEvidence();if(finding)selectEvidence(finding);
 state.regions=parseRegions(p.has('regions')?p.get('regions'):p.get('region'),regionCatalog);
 state.map=!p.has('regions')&&state.regions.size?'off':p.has('map')&&allowedMap(p.get('map'),state.topic,studyMaps)?p.get('map'):selectionMap();
 if(['both','left','right'].includes(p.get('hemisphere')))state.hemisphere=p.get('hemisphere');
 const bounded=(name,fallback)=>p.has(name)&&Number.isFinite(Number(p.get(name)))?Math.max(0,Math.min(1,Number(p.get(name)))):fallback;
 regionOpacity=p.has('regions')?bounded('regionOpacity',.16):.16;cortexOpacity=bounded('cortex',.065);mapOpacity=bounded('mapOpacity',currentCircuit() ? .28 : .92);$('#cortex-opacity').value=cortexSliderFromOpacity(cortexOpacity);labelsOn=p.get('labels')==='true';$('#show-labels').checked=labelsOn;
 Object.assign(state,restoredTracts({value:p.get('bundles'),mode:p.get('tractMode'),version,suggested:[...state.bundles],families:Object.keys(bundleNames),hasCircuit:!!currentCircuit()}));
 const view=['oblique','lateral','medial','anterior','superior'].includes(p.get('view'))?p.get('view'):state.view;
 renderMapInfo();renderBundles();setCamera(view==='free'?'oblique':view);restoringUrl=false;syncUrl({replace:true});
}
function provenance(){
 for(const source of circuitCatalog.sources){const row=el('div','source-row');const link=el('a','',source.label);link.href=source.url;link.target='_blank';link.rel='noopener';row.append(link,el('p','',`${source.kind}. Review scope: ${source.review}.`));$('#circuit-sources').append(row);}
 $('#alignment-note').textContent=atlas.alignment_note+' Added Lead-DBS fibers use native MNI2009b coordinates; DIPY forceps minor uses MNI2009a. The pre-SMA subset uses native-affine AAL3 and STN endpoint masks. These cross-template overlays are educational estimates, not validated millimetre-level registrations. Published MNI points retain the authors’ template descriptions; no new registration is claimed. The two functional overlays are trilinearly sampled onto reference cortex and do not display deep voxels, patient targets, or electric fields.';const holder=$('#geometry-sources');
 const rows=[{name:'HCP1065 population-averaged tractography',citation:'Yeh FC. Population-based tract-to-region connectome of the human brain and its hierarchical topology. Nature Communications 2022.',url:'https://brain.labsolver.org/hcp_trk_atlas.html'},...Object.values(atlas.sources)];
 for(const s of rows){const row=el('div','source-row');const a=el('a','',s.name);a.href=s.url;a.target='_blank';a.rel='noopener';row.append(a,el('p','',s.citation));holder.append(row);}
 for(const map of studyMaps){const row=el('div','source-row');const a=el('a','',map.name);a.href=map.url;a.target='_blank';a.rel='noopener';row.append(a,el('p','',`${map.original_citation} ${map.space}. Public NeuroVault map by siddiqis, CC0. ${map.display_note}`));holder.append(row);}
 for(const s of evidence.sources){const row=el('div','source-row');const a=el('a','',s.title);a.href=s.url;a.target='_blank';a.rel='noopener';row.append(a,el('p','',`${s.label} · ${readable(s.design)}${s.round===2?' · Round 2':''}`));$('#paper-sources').append(row);}
}
function progress(){const count=loadedMeshes+loadedTracts,total=atlas.meshes.length+atlas.tracts.length;$('#status').textContent=`Loading anatomy · ${Math.round(count/total*100)}%`;if(count===total){$('#status').className='done';window.__figeeAtlas.ready=true;setAppearance();}}
async function loadAnatomy(){let cursor=0;const work=async()=>{while(cursor<atlas.meshes.length){const m=atlas.meshes[cursor++];try{const model=await loader.loadAsync(m.file);model.scene.userData.atlas=m;model.scene.traverse(c=>{if(c.isMesh){c.material=new THREE.MeshStandardMaterial({color:'#a7b49d',transparent:true,opacity:.1,side:THREE.DoubleSide,depthWrite:false,roughness:.72});c.userData.atlas=m;}});anatomy.add(model.scene);objects.set(m.id,model.scene);loadedMeshes++;progress();}catch(error){window.__figeeAtlas.errors.push(`${m.id}: ${error.message}`);throw error;}}};await Promise.all([work(),work(),work(),work(),work(),work()]);setAppearance();}
async function loadMaps(){await Promise.all(studyMaps.map(async m=>{const r=await fetch(m.file);if(!r.ok)throw new Error('Cannot load study map '+m.id);mapData.set(m.id,new Float32Array(await r.arrayBuffer()));}));setAppearance();}
async function loadTracts(){
 await Promise.all(atlas.tracts.map(async t=>{const r=await fetch(t.file);if(!r.ok)throw new Error(`Cannot load ${t.id}`);const pos=new Float32Array(await r.arrayBuffer());let count=0;for(const n of t.lengths)count+=(n-1)*2;const vertices=new Float32Array(count*3),rgb=new Float32Array(count*3);let input=0,output=0;const base=new THREE.Color(colors[t.family]);
 for(let k=0;k<t.lengths.length;k++){const n=t.lengths[k];const c=base.clone().offsetHSL(((k*37)%19-9)/360,((k*17)%13-6)/120,((k*13)%25-12)/130);for(let j=0;j<n-1;j++){for(const i of [j,j+1]){vertices.set(pos.subarray(input+i*3,input+i*3+3),output);rgb.set([c.r,c.g,c.b],output);output+=3;}}input+=n*3;}
 const geometry=new THREE.BufferGeometry();geometry.setAttribute('position',new THREE.BufferAttribute(vertices,3));geometry.setAttribute('color',new THREE.BufferAttribute(rgb,3));geometry.computeBoundingSphere();const line=new THREE.LineSegments(geometry,new THREE.LineBasicMaterial({vertexColors:true,transparent:true,opacity:.85,depthWrite:false}));line.userData.tract=t;line.renderOrder=1;anatomy.add(line);tractObjects.set(t.id,line);loadedTracts++;progress();}));setAppearance();
}
function sameFocus(a,b){return a?.kind===b?.kind&&a?.id===b?.id;}
function focusObject(target){return target?.kind==='tract'?tractObjects.get(target.id):target?.kind==='point'?markerObjects.get(target.id):objects.get(target?.id);}
function focusContext(){return [state.topic,state.target,state.study,state.selected,state.search,teachingScene?.id].join('|');}
function anatomyBlurb(kind,m){
 const entities=kind==='mesh'&&teachingScene?teachingScene.entities.filter(id=>[...(mapping[id]||[]),...(contextMapping[id]||[])].includes(m.id)):[];
 return teachingAnatomyBlurb(teachingScene,entities,m.side)||hoverBlurb({kind,id:m.id,family:m.family},hoverGuide);
}
function focusName(target){
 const obj=focusObject(target),meta=obj?.userData.point||obj?.userData.tract||obj?.userData.atlas;
 if(!meta)return '';
 const side=meta.side==='left'?'Left':meta.side==='right'?'Right':meta.side==='bilateral'?(state.hemisphere==='both'?'Both hemispheres':readable(state.hemisphere)+' portion'):'Midline';
 return target.kind==='tract'?`${bundleNames[meta.family]} · ${side}`:meta.name;
}
function renderPinnedFocus(){
 const status=$('#focus-status');status.textContent=pinnedTarget?`Pinned: ${focusName(pinnedTarget)}`:'Click a structure to keep its label and highlight.';status.title=status.textContent;
 const description=$('#pinned-description'),obj=focusObject(pinnedTarget),m=obj?.userData.point||obj?.userData.tract||obj?.userData.atlas;
 description.hidden=!pinnedTarget;description.textContent=m?(pinnedTarget.kind==='point'?coordinateStyle(m).description:anatomyBlurb(pinnedTarget.kind,m)?.description||''):'';
 $('#clear-focus').hidden=!pinnedTarget;
 const choices=pinnedTarget?.kind==='mesh'?targetCandidates(pinnedTarget.id,state.topic,targets,mapping,contextMapping):[];
 $('#focus-targets').hidden=!choices.some(id=>id!==state.target);
}
function validatePinnedFocus(){
 const obj=focusObject(pinnedTarget);
 if(pinnedTarget&&(pinnedContext!==focusContext()||!obj?.visible||(pinnedTarget.kind==='tract'&&pinnedTarget.anchor&&!tractPointVisible(pinnedTarget.anchor[0],state.hemisphere))||(pinnedTarget.kind==='mesh'&&meshRole(obj.userData.atlas)==='background'))){pinnedTarget=null;pinnedContext=null;$('#pick-choices').hidden=true;}
 renderPinnedFocus();
}
function applyHoverFocus(){
 const focus=pinnedTarget||hoverTarget,active=!!focus;focusTweens=[];
 for(const [id,obj]of objects)obj.traverse(c=>{if(!c.isMesh||!c.userData.appearance)return;const base=c.userData.appearance,match=focus?.kind==='mesh'&&focus.id===id;
  focusTweens.push({material:c.material,target:hoverOpacity(base.opacity,active,match),depthWrite:active&&!match?false:base.depthWrite,transparent:active||base.transparent});
 });
 for(const [id,obj]of tractObjects)focusTweens.push({material:obj.material,target:hoverOpacity(.85,active,focus?.kind==='tract'&&focus.id===id,'tract'),depthWrite:false,transparent:true});
 for(const [id,obj]of markerObjects)focusTweens.push({material:obj.material,target:hoverOpacity(.95,active,focus?.kind==='point'&&focus.id===id,'point'),depthWrite:false,transparent:true});
 for(const [id,label]of labelElements){const opacity=String(hoverOpacity(1,active,id===focus?.id));label.div.style.opacity=opacity;label.line.style.opacity=opacity;label.dot.style.opacity=opacity;}
 focusAnimating=true;renderDirty=true;
}
function animateFocus(elapsedMs){
 if(!focusAnimating)return;
 focusAnimating=false;
 for(const item of focusTweens){
  const mat=item.material;mat.opacity=smoothOpacity(mat.opacity,item.target,elapsedMs);
  const moving=mat.opacity!==item.target;focusAnimating||=moving;
  // Keep translucent materials in the transparent pass until their fade finishes.
  const transparent=moving||item.transparent;
  if(mat.transparent!==transparent){mat.transparent=transparent;mat.needsUpdate=true;}
  mat.depthWrite=moving?false:item.depthWrite;
 }
 renderDirty=true;
}
function cancelHoverCandidate(){clearTimeout(hoverTimer);hoverTimer=0;hoverCandidate=null;}
function clearHover(){
 cancelHoverCandidate();pendingHover=null;if(hoverFrame){cancelAnimationFrame(hoverFrame);hoverFrame=0;}
 hoverTarget=null;$('#hover-tip').hidden=true;$('#hover-callout-line').setAttribute('hidden','');renderer.domElement.removeAttribute('aria-describedby');applyHoverFocus();
}
function clearPinnedFocus(){pinnedTarget=null;pinnedContext=null;$('#pick-choices').hidden=true;renderPinnedFocus();updateLabels();clearHover();}
function togglePinnedFocus(hit){
 if(!hit||sameFocus(pinnedTarget,hit)){clearPinnedFocus();return;}
 pinnedTarget={kind:hit.kind,id:hit.id,anchor:hit.anchor};pinnedContext=focusContext();$('#pick-choices').hidden=true;renderPinnedFocus();updateLabels();clearHover();
}
function queueHover(hit,event){
 if(sameFocus(hoverTarget,hit)){cancelHoverCandidate();return;}
 // A short dwell filters boundary jitter; brief gaps between neighboring objects
 // do not immediately restore and re-fade the whole atlas.
 if(hoverTimer&&sameFocus(hoverCandidate?.hit,hit)){hoverCandidate={hit,event};return;}
 cancelHoverCandidate();hoverCandidate={hit,event};
 hoverTimer=setTimeout(()=>{const candidate=hoverCandidate;hoverTimer=0;hoverCandidate=null;if(candidate&&!pointersDown)showHover(candidate.hit,candidate.event);},hit?80:120);
}
function pick(event){
 const rect=renderer.domElement.getBoundingClientRect();ndc.set((event.clientX-rect.left)/rect.width*2-1,-(event.clientY-rect.top)/rect.height*2+1);raycaster.setFromCamera(ndc,camera);
 // Approximately two screen pixels: a bundle can be picked through translucent cortex.
 raycaster.params.Line.threshold=Math.max(.15,2*camera.position.distanceTo(controls.target)*Math.tan(THREE.MathUtils.degToRad(camera.fov/2))*2/rect.height);
 const candidates=[];for(const obj of objects.values())if(obj.visible)obj.traverse(c=>{if(c.isMesh)candidates.push(c);});
 for(const obj of tractObjects.values())if(obj.visible)candidates.push(obj);
 for(const obj of markerObjects.values())if(obj.visible)candidates.push(obj);
 const seen=new Set(),hits=[];
 for(const hit of raycaster.intersectObjects(candidates,false)){
  if(hit.object.userData.tract&&!tractPointVisible(hit.point.x,state.hemisphere))continue;
  const data=hit.object.userData,kind=data.point?'point':data.tract?'tract':'mesh',meta=data.point||data.tract||data.atlas,key=kind+':'+meta.id;if(seen.has(key))continue;seen.add(key);
  const interactive=kind!=='mesh'||meshRole(meta)!=='background';
  hits.push({kind,id:meta.id,meta,anchor:anatomy.worldToLocal(hit.point.clone()).toArray(),interactive,distance:hit.distance,opacity:data.appearance?.opacity||0,preferred:kind==='mesh'&&(!meta.is_cortex||highlight.has(meta.id)||contextMeshes.has(meta.id)||(state.map==='off'&&regionsForMesh(meta.id,state.regions,regionCatalog).length))});
 }
 const hit=chooseHoverHit(hits);if(hit?.kind==='point')return hit;
 // The persistent parcel dots are navigation anchors, not treatment coordinates.
 const x=event.clientX-rect.left,y=event.clientY-rect.top;
 let nearest=null;
 for(const [id,label]of labelElements){
  if(label.point||label.dot.style.display==='none')continue;
  const distance=Math.hypot(x-Number(label.dot.getAttribute('cx')),y-Number(label.dot.getAttribute('cy')));
  const meta=atlas.meshes.find(m=>m.id===id);
  if(distance<=7&&(!nearest||distance<nearest.distance)&&objects.get(id)?.visible&&meshRole(meta)!=='background')nearest={kind:'mesh',id,meta,distance};
 }
 return nearest||hit;
}
function positionHoverCallout(hit,event){
 const tip=$('#hover-tip'),rect=viewport.getBoundingClientRect(),x=event.clientX-rect.left,y=event.clientY-rect.top;
 const w=tip.offsetWidth,h=tip.offsetHeight,pad=12,gap=52;
 const topLimit=pad;
 const bottom=rect.height-pad;
 const clamp=(v,min,max)=>Math.max(min,Math.min(Math.max(min,max),v));
 // Prefer space outside the selected element, rather than covering its nearby fibers.
 const object=hit.kind==='tract'?tractObjects.get(hit.id):hit.kind==='point'?markerObjects.get(hit.id):objects.get(hit.id);
 const box=new THREE.Box3().setFromObject(object),corners=[];
 for(const bx of [box.min.x,box.max.x])for(const by of [box.min.y,box.max.y])for(const bz of [box.min.z,box.max.z]){
  const p=new THREE.Vector3(bx,by,bz).project(camera);corners.push({x:(p.x+1)*rect.width/2,y:(1-p.y)*rect.height/2});
 }
 const bounds={left:Math.min(...corners.map(p=>p.x)),right:Math.max(...corners.map(p=>p.x)),top:Math.min(...corners.map(p=>p.y)),bottom:Math.max(...corners.map(p=>p.y))};
 const candidates=[{x:Math.max(x+gap,bounds.right+18),y:y-32},{x:Math.min(x-gap-w,bounds.left-18-w),y:y-32},{x:x-w/2,y:Math.min(y-gap-h,bounds.top-18-h)},{x:x-w/2,y:Math.max(y+gap,bounds.bottom+18)}].map((p,i)=>{
  const left=clamp(p.x,pad,rect.width-w-pad),top=clamp(p.y,Math.min(topLimit,bottom-h),bottom-h);
  const endX=clamp(x,left,left+w),endY=clamp(y,top,top+h),distance=Math.hypot(endX-x,endY-y);
  const overlap=Math.max(0,Math.min(left+w,bounds.right)-Math.max(left,bounds.left))*Math.max(0,Math.min(top+h,bounds.bottom)-Math.max(top,bounds.top));
  return {left,top,endX,endY,distance,score:overlap*2+Math.max(0,gap-distance)*100+distance+Math.hypot(left-p.x,top-p.y)+i};
 }).sort((a,b)=>a.score-b.score);
 const p=candidates[0];tip.style.left=`${p.left}px`;tip.style.top=`${p.top}px`;
 const leader=$('#hover-callout-line'),line=leader.querySelector('line'),dot=leader.querySelector('circle');
 const inset=Math.min(7,p.distance),scale=p.distance?inset/p.distance:0;
 line.setAttribute('x1',x+(p.endX-x)*scale);line.setAttribute('y1',y+(p.endY-y)*scale);
 line.setAttribute('x2',p.endX);line.setAttribute('y2',p.endY);
 dot.setAttribute('cx',x);dot.setAttribute('cy',y);leader.removeAttribute('hidden');
}
function showHover(hit,event){
 if(!hit){clearHover();return;}
 const tip=$('#hover-tip');if(hoverTarget?.id===hit.id&&hoverTarget?.kind===hit.kind)return;
 {
  hoverTarget={kind:hit.kind,id:hit.id};tip.replaceChildren();const m=hit.meta;
  const blurb=anatomyBlurb(hit.kind,m);
  const side=m.side==='left'?'Left':m.side==='right'?'Right':m.side==='bilateral'?(state.hemisphere==='both'?'Both hemispheres':readable(state.hemisphere)+' portion'):'Midline';
  const title=hit.kind==='tract'?`${bundleNames[m.family]} · ${side}`:m.name;
  tip.append(el('strong','hover-title',title));if(hit.kind==='point')tip.append(el('span','hover-role',m.role));
  let description=blurb?.description;
  if(hit.kind==='point')description=coordinateStyle(m).description;
  tip.append(el('p','hover-blurb',description));
  if(hit.kind==='mesh'){
   const {finding,ids,sides,meshes}=selectedAnatomy();
   const roles=[...new Set(ids.filter(id=>meshIdsFor([id],sides,meshes).includes(m.id)).map(id=>finding?.entity_roles?.[id]).filter(role=>role&&role!=='reported region'))];
   if(roles.length)tip.append(el('p','hover-detail',`Selected finding: ${roles.join('; ')}.`));
  }
  if(hit.kind==='mesh'&&sccLandmark(m)&&!teachingScene)tip.append(el('p','hover-detail','SCC DBS stimulates fibers beside this cortex. The exact DBS stimulation site is not drawn.'));
  if(hit.kind==='mesh'&&state.map!=='off'&&m.is_cortex)tip.append(el('p','hover-detail',`Surface colors: ${studyMaps.find(x=>x.id===state.map)?.name}. These describe a group functional map, not this parcel’s treatment efficacy.`));
  if(hit.kind==='point')tip.append(el('p','hover-detail',`${m.xyz.join(', ')} mm · ${m.space} · ${m.locator}`));
  const refs=hit.kind==='point'?[m.source_id]:[...new Set([...(hit.kind==='mesh'&&state.selected&&(highlight.has(m.id)||contextMeshes.has(m.id))?[evidence.evidence.find(e=>e.id===state.selected).source_id]:[]),...(blurb?.source_ids||[])])];
  const names=refs.slice(0,2).map(id=>(paperById[id]||circuitCatalog.sources.find(x=>x.id===id))?.label.split(' · ')[0]).filter(Boolean);
  if(names.length)tip.append(el('small','hover-source',`Sources: ${names.join('; ')}`));
  applyHoverFocus();
 }
 tip.hidden=false;renderer.domElement.setAttribute('aria-describedby','hover-tip');
 // Anchor once per element, so the explanation does not chase the pointer.
 positionHoverCallout(hit,event);
}
renderer.domElement.addEventListener('pointermove',event=>{
 if(pointersDown){if(Math.hypot(event.clientX-pointersDown.x,event.clientY-pointersDown.y)>5){if(!pointersDown.moved)clearHover();pointersDown.moved=true;state.view='free';$('#orientation').textContent='Free view · orientation axes below';document.querySelectorAll('[data-view]').forEach(b=>b.classList.remove('active'));}return;}
 if(event.pointerType==='touch')return;pendingHover={clientX:event.clientX,clientY:event.clientY};
 if(!hoverFrame)hoverFrame=requestAnimationFrame(()=>{hoverFrame=0;const point=pendingHover;pendingHover=null;if(point&&!pointersDown)queueHover(pick(point),point);});
});
renderer.domElement.addEventListener('pointerleave',clearHover);
renderer.domElement.addEventListener('wheel',clearHover,{passive:true});
renderer.domElement.addEventListener('pointerdown',e=>{cancelHoverCandidate();pointersDown={x:e.clientX,y:e.clientY,button:e.button,moved:false};});
window.addEventListener('blur',()=>{pointersDown=null;clearHover();});document.addEventListener('keydown',event=>{if(event.key==='Escape')clearPinnedFocus();});
function showPickChoices(meshId){
 const choices=targetCandidates(meshId,state.topic,targets,mapping,contextMapping);const holder=$('#pick-choices');holder.replaceChildren();
 if(choices.length===1){if(choices[0]!==state.target)selectTarget(choices[0]);return;}
 if(!choices.length)return;holder.hidden=false;holder.append(el('strong','','Shared reference anatomy — choose a target'));
 for(const id of choices){const b=el('button','',targets[id].name+(id===state.target?' · current':''));b.addEventListener('click',()=>selectTarget(id));holder.append(b);}
 const close=el('button','quiet','Close');close.addEventListener('click',()=>holder.hidden=true);holder.append(close);
}
renderer.domElement.addEventListener('pointerup',e=>{const down=pointersDown;pointersDown=null;if(!down)return;if(down.moved||Math.hypot(e.clientX-down.x,e.clientY-down.y)>5){clearHover();syncUrl();return;}if(down.button!==0||e.button!==0)return;togglePinnedFocus(pick(e));});
renderer.domElement.addEventListener('pointercancel',()=>{pointersDown=null;clearHover();});
document.querySelectorAll('[data-topic]').forEach(b=>b.addEventListener('click',()=>selectTopic(b.dataset.topic)));
document.querySelectorAll('[data-view]').forEach(b=>b.addEventListener('click',()=>setCamera(b.dataset.view)));
function resetExploration(){
 clearPinnedFocus();state.regions.clear();labelsOn=false;$('#show-labels').checked=false;cortexOpacity=.065;regionOpacity=.16;mapOpacity=.28;$('#cortex-opacity').value=cortexSliderFromOpacity(cortexOpacity);state.view=state.topic.startsWith('tms')?(state.topic==='tms-ocd'?'anterior':'lateral'):'oblique';selectTarget(state.target);workspaceUI?.showPanel('targets',{reset:true});
}
workspaceUI=createResearchWorkspace({evidence,targets,topics,getState:()=>state,getUrl:atlasUrl,
 getView:()=>{const finding=evidence.evidence.find(e=>e.id===state.selected),source=paperById[finding?.source_id||state.study],map=studyMaps.find(m=>m.id===state.map);return {finding,source,map,count:records().length,comparison:!!map&&(source?!map.source_ids.includes(source.id):targets[state.target].map!==map.id),regionNames:activeRegions().map(r=>regionNames[r.id]||r.name)};},
 onPanel:panel=>{state.panel=panel;syncUrl();},onReset:resetExploration,
 onIsolate:()=>{state.bundles.clear();state.tractMode='custom';state.regions.clear();state.map='off';labelsOn=false;$('#show-labels').checked=false;renderMapInfo();renderBundles();setAppearance();syncUrl();},
 onMapOff:()=>{state.map='off';renderMapInfo();setAppearance();syncUrl();}
});
$('#hemisphere').addEventListener('change',e=>{state.hemisphere=e.target.value;setCamera(state.view==='free'||(state.view==='medial'&&state.hemisphere==='both')?'oblique':state.view);});
$('#cortex-opacity').addEventListener('input',e=>{cortexOpacity=cortexOpacityFromSlider(e.target.value);setAppearance();syncUrl({replace:true});});
$('#show-labels').addEventListener('change',e=>{labelsOn=e.target.checked;updateLabels();applyHoverFocus();syncUrl();});
$('#study-filter').addEventListener('change',e=>{state.study=e.target.value;state.selected=null;if(state.tractMode!=='custom')state.bundles=new Set(suggestedBundles());renderBundles();applySelectionMap();renderMapInfo();state.hemisphere='both';$('#hemisphere').value='both';setCamera(state.view==='free'?'oblique':state.view);renderEvidence();setAppearance();syncUrl();});
$('#evidence-search').addEventListener('input',e=>{state.search=e.target.value.trim().toLowerCase();state.selected=null;if(state.tractMode!=='custom')state.bundles=new Set(suggestedBundles());renderBundles();applySelectionMap();renderMapInfo();renderEvidence();setAppearance();syncUrl({replace:true});});
$('#map-select').addEventListener('change',e=>{state.map=e.target.value;renderMapInfo();setAppearance();syncUrl();});
$('#clear-evidence').addEventListener('click',()=>{state.selected=null;applySelectionMap();renderMapInfo();if(!currentCircuit()||state.tractMode!=='custom')state.bundles=new Set(suggestedBundles());renderEvidence();renderBundles();setAppearance();syncUrl();});
$('#restore-tracts').addEventListener('click',()=>{state.tractMode='suggested';state.bundles=new Set(suggestedBundles());if(state.map!=='off')mapOpacity=.28;renderMapInfo();renderBundles();setAppearance();syncUrl();});
$('#reveal-tracts').addEventListener('click',()=>{mapOpacity=.28;renderMapInfo();setAppearance();syncUrl();});
$('#reset-view').addEventListener('click',()=>setCamera('oblique'));
$('#clear-focus').addEventListener('click',clearPinnedFocus);
$('#focus-targets').addEventListener('click',()=>{if(pinnedTarget?.kind==='mesh')showPickChoices(pinnedTarget.id);});
$('#view-evidence').addEventListener('click',()=>$('.evidence-panel').scrollIntoView({block:'start'}));
$('#view-atlas').addEventListener('click',()=>{$('.viewport-panel').scrollTop=0;$('.viewport-panel').scrollIntoView({block:'start'});});
$('#region-opacity').addEventListener('input',e=>{regionOpacity=Number(e.target.value);setAppearance();syncUrl({replace:true});});
$('#about-open').addEventListener('click',()=>$('#about').showModal());$('#about-close').addEventListener('click',()=>$('#about').close());$('#about').addEventListener('click',e=>{if(e.target===$('#about')){const r=$('#about').getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)$('#about').close();}});
$('#map-opacity').addEventListener('input',e=>{mapOpacity=Number(e.target.value);setAppearance();syncUrl({replace:true});});
document.querySelectorAll('[data-context-target]').forEach(b=>b.addEventListener('click',()=>{if(!targets[b.dataset.contextTarget].topics.includes(state.topic))selectTopic('tms-ocd');selectTarget(b.dataset.contextTarget);}));
// Preserve the horizontal field of view on narrow panels, without resetting user zoom.
const resize=()=>{if(hoverTarget)clearHover();const w=viewport.clientWidth,h=viewport.clientHeight;if(!w||!h)return;renderer.setSize(w,h);camera.aspect=w/h;camera.fov=THREE.MathUtils.radToDeg(2*Math.atan(Math.tan(THREE.MathUtils.degToRad(35/2))*Math.max(1,1.2/camera.aspect)));camera.updateProjectionMatrix();renderDirty=true;};new ResizeObserver(resize).observe(viewport);resize();
window.__figeeAtlas={ready:false,mapsReady:false,errors:[],getState:()=>({...state,teachingScene,regions:[...state.regions],bundles:[...state.bundles]}),renderForCapture:()=>{resize();positionLabels();renderer.render(scene,camera);renderer.getContext().finish();},getGeometry:()=>({labelsOn,hoverTarget,pinnedTarget,focusAnimating,cortexOpacity,cortexSlider:cortexSliderFromOpacity(cortexOpacity),hoveredTracts:[...tractObjects.entries()].map(([id,o])=>({id,visible:o.visible,opacity:o.material.opacity,clipNormals:o.material.clippingPlanes?.map(p=>p.normal.toArray())||[]})),circuitProfile:currentCircuit()?.id||null,mapOpacity,activeRegions:[...state.regions],regionOpacity,regionLayers:activeRegions().map(r=>({id:r.id,color:r.color,visibleMeshes:r.mesh_ids.filter(id=>objects.get(id)?.visible&&state.map==='off')})),materials:[...objects.entries()].map(([id,o])=>{let value; o.traverse(c=>{if(c.isMesh)value={id,visible:o.visible,role:meshRole(atlas.meshes.find(m=>m.id===id)),color:c.material.color.getHexString(),opacity:c.material.opacity,vertexColors:c.material.vertexColors};});return value;}),highlightedMeshes:[...highlight],contextMeshes:[...contextMeshes],meshes:objects.size,tractFiles:tractObjects.size,studyMaps:mapData.size,activeMap:state.map,visibleMarkers:visiblePoints().map(p=>p.id),visibleMeshes:[...objects.entries()].filter(([,o])=>o.visible).map(([id])=>id),visibleTracts:[...tractObjects.entries()].filter(([,o])=>o.visible).map(([id])=>id)}),sampleStudyMap:(id,xyz)=>sampleMap(studyMaps.find(m=>m.id===id),...xyz),getRecordIds:()=>records().map(e=>e.id),meshMetadata:atlas.meshes.map(m=>({id:m.id,bbox:m.bbox,source:m.source})),targetCount:()=>Object.keys(targets).filter(x=>targets[x].topics.includes(state.topic)).length};
$('#record-count').textContent=`${evidence.evidence.length} findings · ${evidence.sources.length} sources`;restoreUrl();provenance();window.addEventListener('popstate',restoreUrl);window.addEventListener('hashchange',()=>{if(!urlWritePending)restoreUrl();});
renderer.setAnimationLoop(time=>{const elapsed=lastFrameTime===null?0:Math.min(64,Math.max(0,time-lastFrameTime));lastFrameTime=time;controls.update();animateFocus(elapsed);if(renderDirty){positionLabels();renderer.render(scene,camera);renderDirty=false;}});
// The embedded lesson accepts catalog IDs only, never arbitrary anatomy or code.
window.addEventListener('message',event=>{
 if(!teachingEmbed||event.source!==parent||event.origin!==location.origin||event.data?.type!=='figee:lesson-scene')return;
 const next=lessonScene(event.data.lesson,event.data.step,event.data.element);if(!next||next.id===teachingScene?.id)return;
 teachingScene=next;clearPinnedFocus();
 Object.assign(state,{topic:next.topic,target:next.target,study:'all',selected:null,search:'',hemisphere:next.hemisphere,regions:new Set(),map:'off',bundles:new Set(next.bundles),tractMode:'custom'});
 $('#scene-title').textContent=next.title;renderMapInfo();renderBundles();setCamera(next.view);setAppearance();
});
try{await Promise.all([loadAnatomy(),loadTracts(),loadMaps()]);window.__figeeAtlas.mapsReady=true;if(teachingEmbed)parent.postMessage({type:'figee:lesson-ready'},location.origin);}catch(error){console.error(error);$('#status').textContent='Some anatomy could not load. The evidence remains available; reload to retry.';$('#status').className='error';window.__figeeAtlas.errors.push(error.message);if(teachingEmbed)parent.postMessage({type:'figee:lesson-error'},location.origin);}
