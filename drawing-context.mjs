// Only identifications rated High in the 2026-10-07 photo review are admitted.
// A readable name does not establish a clinical target, connection or boundary.
const atlasLink=target=>`./#topic=all&target=${target}&panel=layers&map=off`;
const reference=(name,sub,entities,note)=>({name,sub,entities,focus:entities,topics:['all'],bundles:[],kind:'reference',note});
export const drawingTargets={
 hippocampus:reference('Hippocampus','H · anatomical reference',['hippocampus'],'The H marking identifies the hippocampus. The bilateral surfaces come from the existing MNI template atlas; the drawing supplies neither laterality nor a treatment location.'),
 amygdala:reference('Amygdala','A · anatomical reference',['amygdala'],'The A marking identifies the amygdala. Bilateral MASSP atlas surfaces provide anatomical context. No treatment target or connection is inferred from the drawing.'),
 'primary-motor':reference('Primary motor cortex (M1)','M₁ · precentral-gyrus context',['M1'],'M₁ identifies primary motor cortex. The existing precentral-gyrus parcels provide broad orientation, not a complete or exact M1 boundary. The separate M marking denotes broader motor territory, not specifically M1.'),
 premotor:reference('Premotor cortex (PM)','PM · label and explanation',['PM'],'PM identifies premotor cortex. A distinct premotor surface is not available in this atlas, so no region is highlighted. The label is retained without assigning neighboring frontal parcels to it.'),
 'vmpfc-reference':reference('Ventromedial prefrontal cortex (vmPFC)','Existing medial-OFC context',['vmPFC'],'vmPFC is clearly labeled in both drawings. The existing medial orbitofrontal parcels provide partial anatomical context, not the full vmPFC or a treatment boundary.'),
 'thalamus-reference':reference('Thalamus','T · existing reference anatomy',['thalamus'],'The T marking identifies the thalamus. Existing whole-thalamus surfaces provide orientation; the drawing does not identify a specific thalamic nucleus or treatment target.')
};
export const drawingEntities=[
 {id:'hippocampus',label:'Hippocampus'},
 {id:'amygdala',label:'Amygdala'},
 {id:'M1',label:'Primary motor cortex (M1)'},
 {id:'PM',label:'Premotor cortex (PM)'}
];
const entry=(id,mark,label,photos,href,detail,status)=>({id,mark,label,photos,confidence:'high',href,detail,status});
export const drawingMarkings=[
 entry('ocd','OCD','Obsessive-compulsive disorder',['IMG_4609'], './#topic=ocd&target=overview','Condition label; the drawing does not assign a specific TMS or DBS protocol.','existing'),
 entry('mdd','MDD','Major depressive disorder',['IMG_4609'], './#topic=depression&target=overview','Condition label; the existing depression collection includes DBS and TMS sections.','existing'),
 entry('vlpfc','vlPFC','Ventrolateral prefrontal cortex',['IMG_4609'],atlasLink('vlpfc'),'Existing VLPFC reference. Only the high-confidence occurrence in the brain overview is used.','existing'),
 entry('dlpfc','dlPFC','Dorsolateral prefrontal cortex',['IMG_4609'],atlasLink('dlpfc'),'Existing DLPFC reference; the drawing does not establish treatment laterality.','existing'),
 entry('dmpfc','dmPFC','Dorsomedial prefrontal cortex',['IMG_4609'],atlasLink('medial'),'Existing dmPFC reference, kept distinct from pre-SMA.','existing'),
 entry('ofc','OFC','Orbitofrontal cortex',['IMG_4609'],atlasLink('ofc'),'Existing OFC reference.','existing'),
 entry('vmpfc','vmPFC','Ventromedial prefrontal cortex',['IMG_4609','IMG_4610'],atlasLink('vmpfc-reference'),'Existing entity and partial medial-OFC geometry, now directly accessible.','existing-anatomy-new-access'),
 entry('presma','pre-SMA','Pre-supplementary motor area',['IMG_4609'],atlasLink('presma'),'Existing pre-SMA reference.','existing'),
 entry('premotor','PM','Premotor cortex',['IMG_4609'],atlasLink('premotor'),'Label added; a distinct boundary is unavailable, so no surrogate surface is assigned.','new-label'),
 entry('primary-motor','M₁','Primary motor cortex',['IMG_4609'],atlasLink('primary-motor'),'The existing precentral gyrus is now accessible as broad M1 context, with its limits stated.','existing-anatomy-new-access'),
 entry('thalamus','T','Thalamus',['IMG_4609'],atlasLink('thalamus-reference'),'Existing whole-thalamus anatomy, now directly accessible.','existing-anatomy-new-access'),
 entry('hippocampus','H','Hippocampus',['IMG_4609'],atlasLink('hippocampus'),'Added whole-hippocampus reference surfaces from the same atlas bundle already used by NMAtlas.','new-reference-anatomy'),
 entry('amygdala','A','Amygdala',['IMG_4609'],atlasLink('amygdala'),'Added whole-amygdala reference surfaces from the same atlas bundle already used by NMAtlas.','new-reference-anatomy'),
 entry('motor','M','Motor territory',['IMG_4609'],null,'Broad motor label retained. It is not assigned to a unique nucleus, cortical boundary, or the uncertain deep L/C/M shapes.','new-label'),
 entry('stn','STN','Subthalamic nucleus',['IMG_4610'],atlasLink('stn'),'Existing STN reference. The drawing does not locate the electrode inside the STN.','existing'),
 entry('nac','NAc','Nucleus accumbens',['IMG_4610'],atlasLink('nac'),'Existing NAc reference.','existing'),
 entry('lead','Vertical lead','DBS electrode lead',['IMG_4610'],'learn.html#mode=contacts','The existing contact lesson illustrates a separately sourced lead; it is not a reconstruction of this drawing.','existing'),
 entry('contacts','Four marked positions','Four DBS contacts',['IMG_4610'],'learn.html#mode=contacts','Four contacts are identifiable. Their numbers, dimensions, active settings, and anatomical assignments are not recovered from the photo.','existing'),
 entry('connections','Connecting lines','Schematic connections',['IMG_4609','IMG_4610'],null,'The lines indicate connections broadly. No individual tract name, direction, endpoint, or geometry is added from them.','existing-concept')
];

export function drawingSearch(query){
 const terms=query.trim().toLowerCase().split(/\s+/).filter(Boolean);
 if(!terms.length)return [];
 return drawingMarkings.filter(x=>terms.every(t=>`${x.mark} ${x.label} ${x.detail} Figee office drawing`.toLowerCase().includes(t))).map(x=>({kind:'Office drawing label',title:`${x.mark} · ${x.label}`,detail:`High-confidence identification · ${x.detail}`,href:x.href||'./#topic=all&target=overview&panel=layers'}));
}
