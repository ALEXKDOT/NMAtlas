import {drawingMarkings} from './drawing-context.mjs';
import {lessonForAtlas,searchCollection} from './explorer-model.mjs';
const $=s=>document.querySelector(s);
const el=(tag,cls,text)=>{const e=document.createElement(tag);if(cls)e.className=cls;if(text!==undefined)e.textContent=text;return e;};

export function createResearchWorkspace({evidence,targets,topics,getState,getView,onPanel,onReset,onIsolate,onMapOff,getUrl}) {
 if(new URL(location).searchParams.get('embed')==='learn')return null;
 const root=$('.workspace'),left=$('.left-panel'),scene=$('.viewport-panel'),evidencePanel=$('.evidence-panel');
 const inspector=el('aside','inspector'),tabs=el('nav','inspector-tabs'),body=el('div','inspector-body');
 inspector.setAttribute('aria-label','Research inspector');tabs.setAttribute('role','tablist');tabs.setAttribute('aria-label','Research tools');
 root.prepend(inspector);inspector.append(tabs,body);
 left.id='targets-panel';evidencePanel.id='evidence-panel';const layers=el('section','layers-panel');layers.id='layers-panel';
 const layerHeading=el('div','panel-heading');layerHeading.append(el('span','eyebrow','DISPLAY & ANATOMICAL CONTEXT'),el('h2','','Layers & spatial detail'));layers.append(layerHeading);
 const helper=el('p','layer-help','Target highlights follow the selected target or finding. The checkboxes below add independent anatomical context.');layers.append(helper);
 const mapControls=$('.map-controls');layers.append(mapControls);
 layers.append($('.fiber-controls'),$('.region-controls'));
 const display=el('section','layers');display.append(el('h2','','Surface visibility'),$('.display-controls .range-label'),$('#cortex-opacity-note'));layers.append(display);
 const spatial=el('details','spatial-details');spatial.open=true;spatial.append(el('summary','','What this view represents'),$('#geometry-caption'),$('#anatomy-summary'));layers.append(spatial,$('#coordinate-panel'),$('#target-context'));
 const drawings=el('details','spatial-details office-drawings');drawings.id='office-drawings';drawings.append(el('summary','','Figee’s office drawings'));
 drawings.append(el('p','layer-help','Confirmed labels from the two office drawings. Existing atlas entries are reused. Confidence concerns the identification, not a treatment claim or an exact boundary.'));
 const drawingList=el('dl','drawing-markings');
 for(const item of drawingMarkings){const term=el('dt'),name=`${item.mark} · ${item.label}`;if(item.href){const a=el('a','',name);a.href=item.href;term.append(a);}else term.textContent=name;const detail=el('dd','',item.detail);detail.append(el('small','',`${item.photos.join(' · ')} · High confidence`));drawingList.append(term,detail);}
 drawings.append(drawingList);layers.append(drawings);
 const clinical=el('div','clinical-picker'),label=el('label','','Clinical focus');clinical.append(label,$('#topics'));left.prepend(clinical);
 $('#topics [data-topic="all"]').textContent='Whole collection';
 const journey=el('section','journey-card');journey.append(el('strong','','Prefer a guided explanation?'));
 const guided=el('a','','Open a related lesson →');guided.id='context-lesson';journey.append(guided);$('#target-list').before(journey);
 body.append(left,evidencePanel,layers);
 const panels={targets:left,evidence:evidencePanel,layers},positions={};let active='targets';
 const showPanel=(name,{notify=true,reset=false}={})=>{
  if(!panels[name])name='targets';positions[active]=body.scrollTop;active=name;
  for(const [key,panel] of Object.entries(panels)){panel.hidden=key!==name;const b=$(`#tab-${key}`);b.setAttribute('aria-selected',String(key===name));b.tabIndex=key===name?0:-1;}
  body.scrollTop=reset?0:positions[name]||0;if(notify){onPanel(name);if(matchMedia('(max-width:700px)').matches)inspector.scrollIntoView({block:'start',behavior:'instant'});}
 };
 for(const [name,panel]of Object.entries(panels)){
  const button=el('button','',{targets:'Targets',evidence:'Evidence',layers:'Layers'}[name]);button.id=`tab-${name}`;button.setAttribute('role','tab');button.setAttribute('aria-controls',panel.id);panel.setAttribute('role','tabpanel');panel.setAttribute('aria-labelledby',button.id);
  button.addEventListener('click',()=>showPanel(name));button.addEventListener('keydown',event=>{const keys=Object.keys(panels),index=keys.indexOf(name);const next=event.key==='ArrowRight'?keys[(index+1)%3]:event.key==='ArrowLeft'?keys[(index+2)%3]:event.key==='Home'?keys[0]:event.key==='End'?keys[2]:null;if(next){event.preventDefault();showPanel(next);$(`#tab-${next}`).focus();}});tabs.append(button);
 }
 const mode=el('nav','mode-nav');mode.setAttribute('aria-label','Atlas mode');const learn=$('.learn-entry');learn.className='';learn.textContent='Guided learning';const research=el('a','','Research atlas');research.href='./';research.setAttribute('aria-current','page');mode.append(learn,research);$('.brand').after(mode);$('.brand small').textContent='Neuromodulation atlas';
 const actions=el('div','header-actions'),searchButton=el('button','','Search atlas');searchButton.id='search-open';actions.append(searchButton,$('#about-open'));$('.topbar').append(actions);
 const lock=$('#lock-app')||$('.topbar button[data-lock]');if(lock)actions.append(lock);
 const sceneState=el('div','scene-state');sceneState.id='scene-state';sceneState.setAttribute('aria-label','Current view');$('.viewport-heading').after(sceneState);
 const controls=$('.view-controls'),toolbar=$('.atlas-toolbar');$('#viewport').before(controls,toolbar);
 const legend=el('details','legend-details');legend.append(el('summary','','Legend & coordinate roles'));$('.scene-bottom').append(legend);legend.append($('.legend'),$('#layer-notice'),$('#point-mode'));
 const dialog=el('dialog','explorer-search');dialog.id='atlas-search';const heading=el('div','dialog-heading'),title=el('h2','','Search the whole atlas'),close=el('button','','Close');close.setAttribute('aria-label','Close atlas search');heading.append(title,close);dialog.setAttribute('aria-label','Search the whole atlas');
 const content=el('div','dialog-body'),searchLabel=el('label','','Find anatomy, a target, study or lesson'),input=el('input');input.type='search';input.id='collection-search';searchLabel.htmlFor=input.id;input.placeholder='Try Dixon, pre-SMA, SCC or a study author…';
 const count=el('p','search-count'),results=el('div','search-results');count.setAttribute('role','status');content.append(searchLabel,input,el('p','search-hint','Clinical findings, anatomical references, office drawing labels and lessons are labeled separately.'),count,results);dialog.append(heading,content);document.body.append(dialog);
 const runSearch=()=>{const matches=searchCollection(input.value,{evidence,targets,topics});results.replaceChildren();count.textContent=input.value.trim()?`${matches.length} ${matches.length===1?'result':'results'} across the atlas`:'Enter a name or question to begin.';for(const result of matches){const a=el('a','search-result');a.href=result.href;a.append(el('small','',result.kind),el('strong','',result.title),el('p','',result.detail));a.addEventListener('click',()=>dialog.close());results.append(a);}if(input.value.trim()&&!matches.length)results.append(el('p','search-hint','No matches. Try a region abbreviation, study author or a shorter phrase.'));};
 const openSearch=(query='')=>{input.value=query;runSearch();dialog.showModal();input.focus();};searchButton.addEventListener('click',()=>openSearch());close.addEventListener('click',()=>dialog.close());input.addEventListener('input',runSearch);
 const more=el('button','quiet search-collection-link','Search lessons & the whole collection →');more.addEventListener('click',()=>openSearch($('#evidence-search').value));$('.search-filter').after(more);
 function update(){
  const state=getState(),view=getView(),target=targets[state.target],map=view.map;
  const url=new URL(getUrl(),location),teaching=new URL('learn.html',location);
  teaching.searchParams.set('from',url.pathname+url.search+url.hash);
  const ref=new URLSearchParams(url.hash.slice(1));
  const lesson=ref.get('returnLesson')||lessonForAtlas(state.topic,state.target);
  teaching.hash=new URLSearchParams({lesson,...(ref.has('returnLesson')?{step:ref.get('returnStep')||'0',...(ref.get('returnElement')?{element:ref.get('returnElement')}:{})}:{})}).toString();
  learn.href=guided.href=teaching.pathname+teaching.search+teaching.hash;research.href=url.pathname+url.search+url.hash;
  guided.textContent=ref.has('returnLesson')?'Return to your lesson →':'Open a related lesson →';journey.hidden=target.kind==='reference';
  sceneState.replaceChildren();
  const primary=map?`Map: ${map.name}`:`Reference anatomy · ${state.bundles.size} tract ${state.bundles.size===1?'layer':'layers'} · ${state.regions.size} additional ${state.regions.size===1?'region':'regions'}`;
  sceneState.append(el('span','state-primary',primary));
  const evidenceLabel=view.finding?`${view.source.label} · selected finding`:state.study!=='all'?`${view.source.label} · filtered study`:`${target.name} · all related studies`;
  sceneState.append(el('span','',target.kind==='reference'?`Anatomical reference: ${target.name}`:`Evidence focus: ${evidenceLabel}`));
  if(view.comparison)sceneState.append(el('span','state-warning','Comparison overlay: this map belongs to a different study than the evidence focus.'));
  if(map&&state.regions.size)sceneState.append(el('span','state-warning',`${state.regions.size} region color ${state.regions.size===1?'layer paused':'layers paused'} by this map.`));
  if(state.bundles.has('OCD_RESPONSE')&&view.source?.id!=='P32620886')sceneState.append(el('span','state-warning','Li 2020 response fibers are a separate study layer, not the selected study’s pathways.'));
  if(!map&&state.regions.size)sceneState.append(el('span','',`Added reference regions: ${view.regionNames.join(', ')}`));
  const links=el('div','state-links');
  for(const [text,fn,cls]of [[target.kind==='reference'?'Change anatomy':'Change target',()=>showPanel('targets'),'scene-change-target'],[target.kind==='reference'?'Browse confirmed drawing labels':`Review ${view.count} findings →`,()=>{if(target.kind==='reference'){showPanel('layers');drawings.open=true;drawings.scrollIntoView({block:'start'});}else showPanel('evidence');},'scene-action'],['Adjust layers',()=>showPanel('layers'),''],['Focus on selected anatomy',onIsolate,''],['Reset exploration',onReset,'']]){const b=el('button',cls,text);b.addEventListener('click',fn);links.append(b);}
  if(map&&state.regions.size){const reveal=el('button','','Show region colors · turn map off');reveal.addEventListener('click',onMapOff);links.append(reveal);}
  sceneState.append(links);
  if(active!==state.panel)showPanel(state.panel,{notify:false});
 }
 document.querySelector('#target-list').addEventListener('click',event=>{if(event.target.closest('[data-target]')&&matchMedia('(max-width:700px)').matches)scene.scrollIntoView({block:'start',behavior:'instant'});});
 showPanel('targets',{notify:false});
 return {showPanel,update,openSearch};
}
