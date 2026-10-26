import {drawingTargets,drawingSearch} from './drawing-context.mjs';
import {lessons,functionalComparisons,functionalRegions} from './teaching-catalog.mjs';

export function lessonForAtlas(topic,target) {
 if(target==='fronto-insular')return 'fronto-insular';
 if(target==='depression-network')return 'depression-network';
 if(target==='presma')return 'ocd-presma';
 if(topic==='all'&&target==='scc')return 'depression-dbs';
 if(topic==='all'&&['alic','nac','bnst','stn','gpe','vcvs','vlpfc'].includes(target))return 'ocd-dbs';
 if(topic==='tms-ocd'||topic==='all'&&['deep-medial','ofc'].includes(target))return 'ocd-tms';
 if(topic==='ocd')return 'ocd-dbs';
 if(topic==='depression')return 'depression-dbs';
 return 'depression-tms';
}

export function sceneDescription({map,target,finding,regions=[]}) {
 if(map){
  const meaning=map.id==='siddiqi-symptoms'
   ? 'Negative values denote hypothesized dysphoric preference; positive values denote anxiosomatic preference. This is not a prospective efficacy map.'
   : 'The released group t map is sampled onto reference cortex. It is not an individual connectivity map, treatment field or set of treatment coordinates.';
  return `${map.name}. ${meaning} Cortical colors follow this map instead of target or finding shading.${regions.length?' Additional region colors are also paused until the map is turned off.':''}`;
 }
 if(finding)return finding.display_note||'Shading locates the anatomy named in the finding; it does not reconstruct the study’s treatment site or measured effect.';
 if(target.map)return 'Reference cortical anatomy is shown. The published functional map is off; no symptom-preference or group-map values are displayed.';
 return target.note;
}

export function targetGroup(id) {
 if(id==='overview')return 'Collection overview';
 if(['fronto-insular','depression-network'].includes(id))return 'Mechanism & network research';
 if(drawingTargets[id])return 'Reference anatomy';
 if(['symptoms','insula','convergent'].includes(id))return 'Study-defined targeting approaches';
 return 'Anatomical targets & network references';
}

// A return link can only point back to this atlas, never to another origin or route.
export function atlasReturnPath(value,base) {
 if(!value)return null;
 try{const current=new URL(base),candidate=new URL(value,current),directory=current.pathname.replace(/[^/]*$/,'');
  if(candidate.origin!==current.origin||![directory,directory+'index.html'].includes(candidate.pathname))return null;
  return candidate.pathname+candidate.search+candidate.hash;
 }catch{return null;}
}

export function searchCollection(query,{evidence,targets,topics}) {
 const terms=query.trim().toLowerCase().split(/\s+/).filter(Boolean);
 if(!terms.length)return [];
 const matches=text=>terms.every(term=>text.toLowerCase().includes(term));
 const results=[],sourceById=Object.fromEntries(evidence.sources.map(s=>[s.id,s]));
 for(const [id,target] of Object.entries(targets)){
  if(id==='overview'||!matches(`${target.name} ${target.sub} ${id}`))continue;
  const topic=target.topics.find(t=>t!=='all')||'all';
  results.push({kind:target.kind==='reference'?'Reference anatomy':'Target / network',title:target.name,detail:target.sub,href:`./#${new URLSearchParams({topic,target:id,panel:'targets'})}`});
 }
 for(const lesson of lessons){
  if(matches([lesson.category,lesson.title,lesson.question,...lesson.steps.map(s=>s.title)].join(' ')))results.push({kind:'Guided lesson',title:lesson.question,detail:lesson.category,href:`learn.html#lesson=${lesson.id}`});
 }
 for(const comparison of functionalComparisons){
  const descriptions=comparison.regions.map(id=>functionalRegions[id]);
  if(matches(['Dixon 2017 functional background',comparison.label,comparison.title,...descriptions.flatMap(r=>[r.expanded,r.description])].join(' ')))results.push({kind:'Functional background',title:comparison.label,detail:'Dixon 2017 · review context, separate from clinical outcomes',href:`learn.html?background=${comparison.id}#lesson=${comparison.id==='ofc'?'ocd-dbs':'depression-tms'}`});
 }
 for(const finding of evidence.evidence){
  const source=sourceById[finding.source_id];
  const targetText=(finding.target_ids||[]).map(id=>targets[id]?.name||id).join(' ');
  if(!matches([source.label,source.title,finding.finding,finding.limitations,targetText,...(finding.topics||[]).map(t=>topics[t]?.title||t)].join(' ')))continue;
  results.push({kind:'Study finding',title:source.label,detail:finding.finding,href:`./#${new URLSearchParams({topic:'all',target:'overview',study:source.id,finding:finding.id,panel:'evidence'})}`});
 }
 return [...results,...drawingSearch(query)];
}
