import {lessons,nodes,additionalSources,contactCase,machadoCase,functionalRegions,functionalComparisons} from './teaching-catalog.mjs';
import {readTeachingState,teachingHash,lessonScene,atlasLink,contactCenters,contactDistance,teachingNodeDescription,teachingNodeSources} from './teaching-model.mjs';
import {atlasReturnPath} from './explorer-model.mjs';
const $=s=>document.querySelector(s);
const el=(tag,cls,text)=>{const e=document.createElement(tag);if(cls)e.className=cls;if(text!==undefined)e.textContent=text;return e;};
const svgEl=(tag,attributes={},text)=>{const e=document.createElementNS('http://www.w3.org/2000/svg',tag);for(const [k,v]of Object.entries(attributes))e.setAttribute(k,v);if(text!==undefined)e.textContent=text;return e;};
let state=readTeachingState(location.hash),sources={},slot='a',brainReady=false;
const frame=$('#teaching-brain');
function sourceLink(id){const s=sources[id];const a=el('a','',s?.label||id);a.href=s?.full_text_url||s?.url||'#';a.target='_blank';a.rel='noopener';return a;}
function sourceRows(holder,ids){holder.replaceChildren();for(const id of [...new Set(ids)]){const s=sources[id],row=el('div','source-row');row.append(sourceLink(id),el('small','',s?.title||s?.kind||''));if(s?.review||s?.review_status)row.append(el('small','',s.review||s.review_status));holder.append(row);}}
function focusStep(){const target=state.mode==='contacts'?$('.historical-notice'):$('#step-title');target.tabIndex=-1;target.focus({preventScroll:true});target.scrollIntoView({block:'start',behavior:'instant'});}
function change(values,{replace=false}={}){const before=[state.mode,state.lesson,state.step].join(':');state=readTeachingState(teachingHash({...state,...values}));const u=new URL(location);u.searchParams.set('v','0.17.0');u.hash=teachingHash(state);history[replace?'replaceState':'pushState'](null,'',u);render();if(before!==[state.mode,state.lesson,state.step].join(':'))focusStep();}
const fromAtlas=atlasReturnPath(new URL(location).searchParams.get('from'),location.href);
if(fromAtlas){const back=el('a','return-atlas','Return to previous research view →');back.href=fromAtlas;$('.learn-topbar').append(back);}

function activate(group,fn){group.setAttribute('role','button');group.setAttribute('tabindex','0');group.addEventListener('click',fn);group.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();fn();}});}
function diagram(lesson,step){
 const svg=$('#circuit-diagram');svg.replaceChildren();
 const choose=id=>change({element:state.element===id?null:id});let edgeIndex=0;
 for(const edge of lesson.edges){
  if(!step.edges.includes(edge.id))continue;
  const [x1,y1]=(step.positions||lesson.positions)[edge.from],[x2,y2]=(step.positions||lesson.positions)[edge.to];
  const horizontal=y1===y2,direction=Math.sign(x2-x1)||1;const start=[x1+(horizontal?90*direction:0),y1+(horizontal?0:(y2>y1?29:-29))];
  const end=[x2-(horizontal?90*direction:0),y2+(horizontal?0:(y2>y1?-29:29))];
  const path=`M ${start} L ${end}`;const g=svgEl('g');
  const selected=state.element===edge.id;const muted=state.element&&!selected&&state.element!==edge.from&&state.element!==edge.to;
  g.setAttribute('opacity',muted?'.4':'1');
  const hit=svgEl('path',{d:path,class:'edge-hit'});hit.addEventListener('click',()=>choose(edge.id));
  g.append(svgEl('path',{d:path,class:'edge-line',stroke:selected?'#315f50':'#7a927f','stroke-width':selected?4:2.5,'stroke-dasharray':edge.kind==='functional'?'8 6':edge.kind==='rationale'?'2 6':edge.kind==='experimental'?'3 3':edge.kind==='model'?'10 4 2 4':''}),hit);
  const fraction=horizontal?.5:.38+(edgeIndex++%3)*.16;
  const lx=start[0]+(end[0]-start[0])*fraction,ly=start[1]+(end[1]-start[1])*fraction+(horizontal?(edge.kind==='model'?-46:-18):0),width=Math.min(188,edge.label.length*6+14);
  const label=svgEl('g',{'data-edge':edge.id,'aria-label':`${edge.label}: ${nodes[edge.from].label} to ${nodes[edge.to].label}`});
  label.append(svgEl('rect',{x:lx-width/2,y:ly-12,width,height:23,rx:5,fill:selected?'#dceadd':'#f8faf4',stroke:'#e6ece2'}),svgEl('text',{x:lx,y:ly+3,'text-anchor':'middle','font-size':12.5},edge.label));activate(label,()=>choose(edge.id));g.append(label);svg.append(g);
 }
 for(const id of step.nodes){
  const n=nodes[id],[x,y]=(step.positions||lesson.positions)[id],selected=state.element===id;
  const edge=lesson.edges.find(e=>e.id===state.element);const muted=state.element&&!selected&&!(edge&&(edge.from===id||edge.to===id));
  const g=svgEl('g',{class:'diagram-node','data-node':id,'aria-label':n.expanded,'aria-pressed':String(selected),opacity:muted?'.5':'1'});
  g.append(svgEl('rect',{x:x-90,y:y-29,width:180,height:58,rx:10,fill:selected?n.color+'60':n.color+'26',stroke:selected?'#315f50':n.color}));
  const label=svgEl('text',{x,y:y+5,'text-anchor':'middle','font-size':18,'font-weight':600});
  if(n.label.length>20){const words=n.label.split(' '),last=words.pop();label.append(svgEl('tspan',{x,y:y-3},words.join(' ')),svgEl('tspan',{x,y:y+18},last));}else label.textContent=n.label;
  g.append(label);activate(g,()=>choose(id));svg.append(g);
 }
 const key=$('#diagram-key');key.replaceChildren();const kinds=[...new Set(lesson.edges.filter(e=>step.edges.includes(e.id)).map(e=>e.kind))];
 for(const kind of kinds){const item=el('span');item.append(el('i',kind),document.createTextNode({functional:'Functional relationship',structural:'Structural connection / tractography',rationale:'Circuit rationale',model:'Proposed route · connectome model',experimental:'Animal circuit experiment'}[kind]));key.append(item);}
 if(!kinds.length)key.append(el('span','','Selected structures are shown without an inferred connection.'));
 const detail=$('#element-detail');detail.replaceChildren();const edge=lesson.edges.find(e=>e.id===state.element);const node=nodes[state.element];
 if(node){detail.append(el('strong','',node.expanded),el('p','',teachingNodeDescription(lesson.id,node.id)));for(const id of teachingNodeSources(node.id,[...step.sources,...lesson.edges.filter(e=>e.from===node.id||e.to===node.id).flatMap(e=>e.sources)]))detail.append(sourceLink(id));}
 else if(edge){detail.append(el('strong','',`${nodes[edge.from].label} · ${nodes[edge.to].label}`),el('p','',edge.description));for(const id of edge.sources)detail.append(sourceLink(id));}
 else detail.append(el('strong','','A simplified teaching diagram'),el('p','',step.nodes.every(id=>nodes[id].species==='animal')?'Select a region or line for its explanation. This animal experiment is not projected onto human brain anatomy.':'Select a region or line for its explanation. Diagram positions are conceptual; the adjacent brain provides anatomical orientation.'));
 $('#clear-element').hidden=!state.element;
}
function sendScene(){if(!brainReady||state.mode!=='learn')return;frame.contentWindow.postMessage({type:'figee:lesson-scene',lesson:state.lesson,step:state.step,element:state.element},location.origin);}
let functionalChoice=null,functionalLesson=null;
function renderFunctionalContext(){
 if(functionalLesson!==state.lesson){functionalLesson=state.lesson;functionalChoice=state.lesson==='ocd-dbs'?'ofc':'cingulate';const requested=new URL(location).searchParams.get('background');if(functionalComparisons.some(c=>c.id===requested))functionalChoice=requested;}
 const comparison=functionalComparisons.find(c=>c.id===functionalChoice);
 const choices=$('#functional-choices');
 if(!choices.children.length)for(const c of functionalComparisons){const b=el('button','',c.label);b.dataset.comparison=c.id;b.setAttribute('aria-controls','functional-comparison');b.addEventListener('click',()=>{functionalChoice=c.id;renderFunctionalContext();});choices.append(b);}
 for(const b of choices.children){const active=b.dataset.comparison===functionalChoice;b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active));}
 $('#functional-comparison-title').textContent=comparison.title;
 const cards=$('#functional-cards');cards.replaceChildren();
 for(const id of comparison.regions){const r=functionalRegions[id],card=el('article','functional-card');card.dataset.region=id;card.append(el('span','eyebrow',r.label),el('h4','',r.emphasis),el('p','functional-region-name',r.expanded),el('p','',r.description));cards.append(card);}
 $('#functional-note').textContent=comparison.note;
 $('#regulation-context').textContent=functionalRegions.dlpfc.description;
 sourceRows($('#functional-source'),['P28616997']);
}
$('#show-functional-context').addEventListener('click',()=>{$('#functional-fold').open=true;$('#functional-title').tabIndex=-1;$('#functional-title').focus({preventScroll:true});$('#functional-context').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:'start'});});
function renderLesson(){
 const lesson=lessons.find(l=>l.id===state.lesson),step=lesson.steps[state.step];
 $('#lesson-category').textContent=lesson.category;$('#lesson-title').textContent=lesson.title;$('#lesson-question').textContent=lesson.question;
 const steps=$('#step-list');steps.replaceChildren();lesson.steps.forEach((s,i)=>{const b=el('button',i===state.step?'active':'');b.setAttribute('aria-current',i===state.step?'step':'false');b.append(el('span','',`${i+1} / ${(lesson.stepLabels||['SITE','CONNECTION','EVIDENCE','INTERPRETATION'])[i]}`),document.createTextNode(s.title));b.addEventListener('click',()=>change({step:i,element:null}));steps.append(b);});
 $('#step-counter').textContent=`STEP ${state.step+1} OF ${lesson.steps.length}`;$('#step-title').textContent=step.title;$('#step-body').textContent=step.body;$('#step-takeaway').textContent=step.takeaway;
 $('#brain-context-title').textContent=step.nodes.every(id=>nodes[id].species==='animal')?'Animal experiment · no human location assigned':'Locate it in the brain';renderFunctionalContext();diagram(lesson,step);$('#brain-note').textContent=step.note;$('#explore-link').href=atlasLink(state);$('#header-explore').href=atlasLink(state);
 sourceRows($('#step-sources'),step.sources);$('#source-locator').textContent=`Source location: ${step.locator}.`;
 $('#previous-step').disabled=state.step===0;$('#next-step').disabled=false;
 const complete=state.step===lesson.steps.length-1;$('#next-step').textContent=complete?'Explore in research atlas →':'Next →';$('#progress-label').textContent=`Step ${state.step+1} of ${lesson.steps.length}`;
 const finish=$('#lesson-complete');finish.hidden=!complete;finish.replaceChildren();if(complete){finish.append(el('h3','','You have reached the end of this lesson'),el('p','',step.takeaway));const explore=el('a','','Explore this question in the research atlas →');explore.href=atlasLink(state);finish.append(explore);const nextId={'depression-tms':'depression-routes','depression-routes':'depression-dbs','ocd-tms':'ocd-presma','ocd-presma':'ocd-dbs','ocd-dbs':'depression-dbs','depression-dbs':'depression-tms'}[lesson.id];const next=lessons.find(l=>l.id===nextId);if(next){const b=el('button','',`Another question: ${next.question}`);b.addEventListener('click',()=>change({lesson:next.id,step:0,element:null}));finish.append(b);}}

 $('#quiz-question').textContent=`Check your understanding: ${lesson.quiz.question}`;$('#quiz-answer').textContent=lesson.quiz.answer;
 document.title=`${lesson.category} · Learn · NMAtlas`;
 sendScene();
}
function renderLead(){
 const svg=$('#lead-diagram');svg.replaceChildren();const scale=28,bottom=355,left=120,width=contactCase.diameterMm*scale,centers=contactCenters();
 const mmY=mm=>bottom-mm*scale;
 svg.append(svgEl('rect',{x:left,y:22,width,height:bottom-22,rx:width/2,fill:'#e2e7e2',stroke:'#a8b8ab'}));
 // The rounded, non-contact shaft extension is schematic; scale applies to the contact array.
 for(let mm=0;mm<=11;mm++){svg.append(svgEl('line',{x1:72,x2:mm%3===0?91:84,y1:mmY(mm),y2:mmY(mm),stroke:'#96aa99'}));if(mm%3===0)svg.append(svgEl('text',{x:62,y:mmY(mm)+4,'text-anchor':'end'},String(mm)));}
 svg.append(svgEl('text',{x:72,y:22,'text-anchor':'middle'},'mm'));
 for(const c of centers){const y=mmY(c.centerMm+contactCase.contactLengthMm/2),height=contactCase.contactLengthMm*scale;const isA=c.id===state.a,isB=c.id===state.b;const color=isA?'#557d67':isB?'#ab8758':'#a9b7ad';
  const g=svgEl('g',{'aria-label':`Contact ${c.id}, choose for ${slot.toUpperCase()}`});g.append(svgEl('rect',{x:left,y,width,height,fill:color,stroke:'#536b5a'}));
  g.append(svgEl('rect',{x:left-8,y:y-5,width:170,height:height+10,fill:'transparent'}));
  g.append(svgEl('text',{x:left+width+16,y:y+height/2+5},`Contact ${c.id}${isA?' · A':''}${isB?' · B':''}`));activate(g,()=>change({[slot]:c.id}));svg.append(g);
 }
 const a=centers.find(c=>c.id===state.a),b=centers.find(c=>c.id===state.b);
 svg.append(svgEl('line',{x1:300,x2:300,y1:mmY(a.centerMm),y2:mmY(b.centerMm),stroke:'#8e754b','stroke-width':2}));
 for(const c of [a,b])svg.append(svgEl('line',{x1:292,x2:308,y1:mmY(c.centerMm),y2:mmY(c.centerMm),stroke:'#8e754b','stroke-width':2}));
 svg.append(svgEl('text',{x:138,y:390,'text-anchor':'middle'},'Deepest → tip'));
 $('#distance-note').textContent=state.a===state.b?'Same contact · 0 mm':`${contactDistance(state.a,state.b)} mm between contact centers`;
 for(const b of document.querySelectorAll('[data-slot]')){b.classList.toggle('active',b.dataset.slot===slot);b.setAttribute('aria-pressed',String(b.dataset.slot===slot));}
}
function renderMachado(){
 const selected=machadoCase.clusters.find(c=>c.id===state.cluster),side=state.side;
 document.title='Historical Machado example · NMAtlas';$('#header-explore').href='./?v=0.15.0#topic=depression&target=vcvs';
 $('#machado-side').value=side;const controls=$('#cluster-buttons');controls.replaceChildren();
 for(const c of machadoCase.clusters){const b=el('button',c.id===selected.id?'active':'',`CC${c.id} · ${c.name}`);b.setAttribute('aria-pressed',String(c.id===selected.id));b.dataset.cluster=c.id;b.addEventListener('click',()=>change({cluster:c.id}));controls.append(b);}
 const svg=$('#cluster-diagram');svg.replaceChildren();const x=mm=>300+mm*11,y=mm=>240-mm*11;
 for(let tick=-20;tick<=20;tick+=5){svg.append(svgEl('line',{x1:x(tick),x2:x(tick),y1:55,y2:305,stroke:tick===0?'#859b90':'#edf1ed','stroke-dasharray':tick===0?'5 4':''}),svgEl('text',{x:x(tick),y:330,'text-anchor':'middle'},String(tick)));}
 for(let tick=-5;tick<=10;tick+=5){svg.append(svgEl('line',{x1:60,x2:540,y1:y(tick),y2:y(tick),stroke:tick===0?'#859b90':'#edf1ed','stroke-dasharray':tick===0?'5 4':''}),svgEl('text',{x:46,y:y(tick)+5,'text-anchor':'end'},String(tick)));}
 svg.append(svgEl('text',{x:300,y:360,'text-anchor':'middle'},'L ← medial–lateral position (mm) → R'),svgEl('text',{x:60,y:28},'Superior (+) / inferior (−), mm'),svgEl('text',{x:310,y:258},'AC origin'));
 for(const c of machadoCase.clusters){const [cx,,cz]=c.position[side],active=c.id===selected.id,g=svgEl('g',{'data-cluster-point':c.id,'aria-label':`Select ${side} CC${c.id}: ${c.name}`,'aria-pressed':String(active)});g.append(svgEl('circle',{cx:x(cx),cy:y(cz),r:18,fill:'transparent'}),svgEl('circle',{cx:x(cx),cy:y(cz),r:active?9:6,fill:active?'#315f50':'#ac8863',stroke:'#fff','stroke-width':2}),svgEl('text',{x:x(cx)+(side==='left'?-17:17),y:y(cz)+5,'text-anchor':side==='left'?'end':'start'},`CC${c.id}`));activate(g,()=>change({cluster:c.id}));svg.append(g);}
 const detail=$('#cluster-detail');detail.replaceChildren();detail.append(el('p','eyebrow',`${side.toUpperCase()} · CC${selected.id}`),el('h3','',selected.name),el('p','mood-result',selected.mood[side]),el('p','',selected.effects[side]),el('h4','','Which pathway caused this response?'),el('p','','This study did not establish a tract-specific cause. Its acute observations cannot assign modern contacts to pathways.'));
 const [xx,yy,zz]=selected.position[side];detail.append(el('p','panel-hint',`Reported cluster center: x ${xx.toFixed(1)}, y ${yy.toFixed(1)}, z ${zz.toFixed(1)} mm relative to the AC. These are not MNI coordinates.`));const link=el('a','','Explore the VC/VS neighborhood →');link.href='./?v=0.15.0#topic=depression&target=vcvs';detail.append(link);
 $('#machado-takeaway').textContent=machadoCase.conclusion;$('#machado-frame').textContent=machadoCase.frame;$('#machado-limits').textContent=machadoCase.limits;
 $('#machado-lead').textContent=`Most leads: ${machadoCase.lead.name}, 3-mm contacts separated by 4-mm gaps → 7-mm nominal center spacing. ${machadoCase.lead.exception} The plotted cluster centers are group averages, so their distances need not equal hardware spacing.`;
 sourceRows($('#machado-sources'),[machadoCase.study]);
}

function renderContacts(){
 const isMachado=state.example==='machado';$('#tsai-contact-view').hidden=isMachado;$('#machado-contact-view').hidden=!isMachado;
 for(const b of document.querySelectorAll('[data-example]')){b.classList.toggle('active',b.dataset.example===state.example);b.setAttribute('aria-pressed',String(b.dataset.example===state.example));}
 if(isMachado){renderMachado();return;}

 document.title='Historical Tsai example · NMAtlas';$('#header-explore').href='./#topic=ocd&target=vcvs';
 $('#contact-intro').textContent=state.a===1&&state.b===2?contactCase.description:`Compare ${state.a===state.b?'the same contact':`contacts ${state.a} and ${state.b}`} from one published OCD case. These acute observations do not predict another patient’s response or identify the pathways responsible.`;$('#contact-setting').textContent=contactCase.setting;$('#contact-takeaway').textContent=contactCase.takeaway;$('#contact-limits').textContent=contactCase.limits;
 renderLead();const holder=$('#contact-cards');holder.replaceChildren();for(const which of ['a','b']){const c=contactCase.contacts.find(c=>c.id===state[which]),card=el('article',`contact-card ${which}`);const label=el('label','label',`COMPARISON ${which.toUpperCase()}`);const select=el('select');select.setAttribute('aria-label',`Comparison ${which.toUpperCase()} contact`);for(const entry of contactCase.contacts){const o=el('option','',`Contact ${entry.id} · ${entry.title}`);o.value=entry.id;select.append(o);}select.value=c.id;select.addEventListener('change',e=>change({[which]:Number(e.target.value)}));label.append(select);card.append(label,el('h3','',c.experience),el('p','',c.detail));holder.append(card);}
 sourceRows($('#contact-sources'),['P24421642','lead-spec']);
}
function render(){
 if(state.mode==='contacts')$('#historical-entry').open=true;
 $('#lesson-view').hidden=state.mode!=='learn';$('#contact-view').hidden=state.mode!=='contacts';$('#contact-mode').classList.toggle('active',state.mode==='contacts');$('#contact-mode').setAttribute('aria-pressed',String(state.mode==='contacts'));
 for(const button of document.querySelectorAll('[data-lesson]')){const active=state.mode==='learn'&&button.dataset.lesson===state.lesson;button.classList.toggle('active',active);button.setAttribute('aria-pressed',String(active));}
 if(state.mode==='learn')renderLesson();else renderContacts();
}
$('#machado-side').addEventListener('change',e=>change({side:e.target.value}));
for(const b of document.querySelectorAll('[data-example]'))b.addEventListener('click',()=>change({example:b.dataset.example}));
$('#previous-step').addEventListener('click',()=>change({step:state.step-1,element:null}));$('#next-step').addEventListener('click',()=>{const lesson=lessons.find(l=>l.id===state.lesson);if(state.step===lesson.steps.length-1)location.href=atlasLink(state);else change({step:state.step+1,element:null});});$('#clear-element').addEventListener('click',()=>change({element:null}));
$('#return-current-lesson').addEventListener('click',()=>{$('#historical-entry').open=false;change({mode:'learn'});});
$('#contact-mode').addEventListener('click',()=>change({mode:'contacts'}));for(const b of document.querySelectorAll('[data-slot]'))b.addEventListener('click',()=>{slot=b.dataset.slot;renderLead();});
for(const b of document.querySelectorAll('[data-network]'))b.addEventListener('click',()=>change({mode:'learn',lesson:'ocd-dbs',step:b.dataset.network==='vc'?1:2,element:null}));
window.addEventListener('popstate',()=>{state=readTeachingState(location.hash);render();focusStep();});window.addEventListener('hashchange',()=>{state=readTeachingState(location.hash);render();focusStep();});
$('#return-to-step').addEventListener('click',focusStep);
window.addEventListener('message',event=>{if(event.origin!==location.origin||event.source!==frame.contentWindow)return;if(event.data?.type==='figee:lesson-ready'){brainReady=true;$('#brain-status').textContent='Drag to rotate · scroll to zoom · click anatomy to keep its label and highlight';sendScene();}if(event.data?.type==='figee:lesson-error')$('#brain-status').textContent='Some reference anatomy could not load. The teaching diagram and source links remain available.';});
try {
 const [evidence,circuits,pathways]=await Promise.all(['assets/evidence.json','assets/tms-circuits.json','assets/public-pathways.json'].map(async url=>{const r=await fetch(url);if(!r.ok)throw new Error(url);return r.json();}));
 sources=Object.fromEntries([...circuits.sources,...pathways.sources,...evidence.sources,...additionalSources].map(s=>[s.id,s]));
 for(const lesson of lessons){const b=el('button');b.dataset.lesson=lesson.id;b.append(el('strong','',lesson.category),el('span','',lesson.question));b.addEventListener('click',()=>{change({mode:'learn',lesson:lesson.id,step:0,element:null});$('#sources-details').open=false;$('.self-check').open=false;});$('#lesson-list').append(b);}
 $('.learn-workspace').hidden=false;$('#load-status').hidden=true;change({}, {replace:true});if(new URL(location).searchParams.has('background'))$('#show-functional-context').click();
 frame.src=atlasLink(state).replace('./?','./?embed=learn&');
 window.__figeeTeaching={getState:()=>({...state}),getScene:()=>lessonScene(state.lesson,state.step,state.element),sourceIds:()=>Object.keys(sources)};
}catch(error){console.error(error);$('#load-status').textContent='The teaching collection could not load. Reload to retry, or open the full atlas.';const a=el('a','','Open atlas');a.href='./';$('#load-status').append(' ',a);}
