import {lessons,nodes,contactCase,functionalRegions} from './teaching-catalog.mjs';

export function readTeachingState(hash='') {
 const p=new URLSearchParams(hash.replace(/^#/,''));
 const lesson=lessons.find(l=>l.id===p.get('lesson'))||lessons[0];
 const raw=Number(p.get('step'));const step=Number.isInteger(raw)?Math.max(0,Math.min(lesson.steps.length-1,raw)):0;
 const current=lesson.steps[step];const candidate=p.get('element');
 const element=[...current.nodes,...current.edges].includes(candidate)?candidate:null;
 const contact=n=>/^[0-3]$/.test(p.get(n)||'')?Number(p.get(n)):n==='a'?1:2;
 const cluster=p.has('cluster')?Number(p.get('cluster')):1;
 return {mode:p.get('mode')==='contacts'?'contacts':'learn',lesson:lesson.id,step,element,a:contact('a'),b:contact('b'),example:p.get('example')==='machado'?'machado':'tsai',side:p.get('side')==='left'?'left':'right',cluster:Number.isInteger(cluster)&&cluster>=0&&cluster<=2?cluster:1};
}
export function teachingHash(state) {
 return new URLSearchParams({mode:state.mode,lesson:state.lesson,step:String(state.step),...(state.element?{element:state.element}:{}),a:String(state.a),b:String(state.b),...(state.example?{example:state.example,side:state.side,cluster:String(state.cluster)}:{})}).toString();
}
export function lessonScene(lessonId,index,element=null) {
 const lesson=lessons.find(l=>l.id===lessonId);
 if(!lesson||!Number.isInteger(index)||!lesson.steps[index])return null;
 const step=lesson.steps[index],edge=lesson.edges.find(e=>e.id===element&&step.edges.includes(e.id));
 const selectedNode=step.nodes.includes(element)?element:null;
 const visibleNodes=selectedNode?[selectedNode]:edge?[edge.from,edge.to]:step.nodes;
 const entities=[...new Set(visibleNodes.flatMap(id=>nodes[id].entities))];
 const sides=Object.fromEntries(entities.map(id=>{const nodeSides=[...new Set(visibleNodes.filter(n=>nodes[n].entities.includes(id)).map(n=>nodes[n].side|| (lesson.id==='depression-tms'?(id==='SCC_GM'?'bilateral':'left'):lesson.id==='ocd-presma'?'right':'bilateral')))];return [id,nodeSides.length===1?nodeSides[0]:'bilateral'];}));
 const colors=Object.fromEntries(visibleNodes.flatMap(id=>nodes[id].entities.map(entity=>[entity,nodes[id].color])));
 return {id:`${lesson.id}:${index}:${selectedNode||edge?.id||''}`,lessonId,index,element:selectedNode||edge?.id||null,nodeIds:visibleNodes,topic:lesson.topic,target:lesson.target,view:nodes[selectedNode]?.view||(selectedNode&&['sgacc','scc','presma','mpfc','cingulate'].includes(selectedNode)?'medial':lesson.view),hemisphere:nodes[selectedNode]?.side||lesson.hemisphere,entities,sides,colors,bundles:edge?edge.bundles:step.bundles,title:lesson.category,note:step.note};
}
// Shared by the diagram and 3D teaching view, so anatomy keeps its lesson role.
export function teachingNodeDescription(lessonId,nodeId) {
 if(lessonId==='ocd-dbs'&&nodeId==='dlpfc')return 'DLPFC is a cortical destination in the network associated with amSTN DBS. In this example the implanted stimulation site is deep; DLPFC is connected cortex. '+functionalRegions.dlpfc.brief;
 const description=nodes[nodeId]?.description||'';
 const background=functionalRegions[nodeId];
 return background?`${description} ${background.brief}`:description;
}
export function teachingNodeSources(nodeId,sourceIds=[]) {
 return [...new Set([...(functionalRegions[nodeId]?[functionalRegions[nodeId].source_id]:[]),...sourceIds])];
}
export function teachingAnatomyBlurb(scene,entityIds,side) {
 if(!scene)return null;
 const nodeId=scene.nodeIds.find(id=>nodes[id].entities.some(e=>entityIds.includes(e))&&(!nodes[id].side||nodes[id].side===side));
 if(!nodeId)return null;
 return {description:teachingNodeDescription(scene.lessonId,nodeId),source_ids:teachingNodeSources(nodeId,lessons.find(l=>l.id===scene.lessonId).steps[scene.index].sources)};
}
export function atlasLink(state) {
 const scene=lessonScene(state.lesson,state.step,state.element);
 const p=new URLSearchParams({topic:scene.topic,target:scene.target,map:'off',regions:'',hemisphere:scene.hemisphere,view:scene.view,labels:'false',bundles:scene.bundles.join(','),tractMode:'custom',returnLesson:state.lesson,returnStep:String(state.step),...(state.element?{returnElement:state.element}:{}),panel:'evidence'});
 return `./?v=0.17.0#${p}`;
}
export function contactCenters(model=contactCase) {
 return model.contacts.map(c=>({id:c.id,centerMm:model.contactLengthMm/2+c.id*(model.contactLengthMm+model.gapMm)}));
}
export function contactDistance(a,b,model=contactCase) {
 const centers=contactCenters(model);return Math.abs(centers.find(c=>c.id===a).centerMm-centers.find(c=>c.id===b).centerMm);
}
