// Editorial synthesis, reviewed 2026-10-02. Priority reflects relevance and design,
// not publication year. Full finding records remain independently addressable.
const context=(text,uncertainty,sources)=>({text,uncertainty,sources});
export const currentContexts={
 'tms-depression:fronto-insular':context('Johnson connects controlled mouse circuit manipulations with human TMS-evoked responses and exploratory aiTBS response correlations. These provide complementary evidence for studying fronto-insular mechanisms.','Mouse causality does not establish a human antidepressant mechanism. The 51-person human cohort was open label; the connectivity-change analysis did not survive correction.',['P42102818']),
 'tms-depression:depression-network':context('Ji’s DTN links treatment-associated structural changes to a normative amygdala-centered network. Published TMS sites and a retrospective 24-person rTMS dataset support further study of this network.','The rTMS result is a change–change association, not baseline prediction or randomized evidence that DTN-guided targeting improves outcomes.',['P41484145']),
 'depression:depression-network':context('Ji’s network was derived from ECT, medication and MST experiments. Previously published DBS sites aligned positively with it in a secondary analysis.','This is not a new DBS outcome trial or support for implanting the amygdala. Human hub clusters and rat basolateral-amygdala interventions remain distinct.',['P41484145']),
 'tms-depression:overview':context('DLPFC stimulation is taught as a cortical intervention with network effects. Evidence for a treatment protocol, a targeting strategy and its mechanism answers different questions.','Connectivity can help guide targeting, but no single connection explains every response.',['P34711062','P36855880','P42340706']),
 'tms-depression:dlpfc':context('DLPFC–sgACC anticorrelation is a useful targeting hypothesis with observational support. A larger analysis found a modest, method-sensitive relationship; newer trials evaluate particular targeting approaches.','Taylor’s small positive randomized targeting trial and Morriss’s null comparison used different networks and protocols. Neither establishes a universal sgACC targeting rule.',['P29274805','P36855880','P38228914','P42340706']),
 'tms-depression:sgacc':context('sgACC is a connectivity reference for cortical TMS. The early DLPFC–sgACC association remains relevant, with a smaller and method-sensitive effect in Elbau’s larger dataset.','Functional anticorrelation does not identify a direct tract or prove that sgACC engagement causes antidepressant benefit. Seguin’s alternative routes remain modeled hypotheses.',['P22658708','P36855880','seguin2026']),
 'tms-depression:medial':context('Early open-label dmPFC work motivated a network-targeting approach. The subsequent 120-person randomized depression trial did not show active treatment superiority over sham.','The early connectivity observations do not establish clinical efficacy. This protocol is distinct from medial-frontal deep TMS for OCD.',['salomons2014','P31711880']),
 'tms-depression:symptoms':context('Symptom-linked connectivity maps propose that different cortical sites may preferentially affect different depressive symptom dimensions.','The displayed retrospective group map is a targeting hypothesis, not a prospective efficacy map or an individual prediction.',['P32160765']),
 'tms-depression:insula':context('BRIGhTMIND did not find a significant primary-outcome advantage for insula-connectivity-guided iTBS over standard-site rTMS.','Both the targeting method and stimulation protocol differed between arms; this does not isolate or disprove every form of connectivity guidance.',['P38228914']),
 'tms-depression:convergent':context('Taylor’s 40-person randomized comparison favored individualized convergent-circuit targeting over scalp-based targeting with the same accelerated stimulation protocol.','This small trial supports that particular strategy. It is not a universal targeting rule or a direct validation of maximal sgACC anticorrelation.',['P42340706']),
 'tms-ocd:overview':context('OCD TMS approaches differ in coil, cortical target, laterality and treatment context. Carmi’s multicenter sham-controlled H7 trial remains an important clinical anchor.','Pre-SMA, dmPFC, DLPFC and OFC findings should be interpreted within their own protocols, rather than pooled into one established mechanism.',['P31109199','P39089567','P26440813','P25203167']),
 'tms-ocd:deep-medial':context('Carmi’s randomized multicenter trial supports the tested H7 medial-prefrontal/ACC protocol with symptom provocation. Its design remains informative despite its 2019 publication date.','The trial does not identify one selectively stimulated deep structure or the tract responsible for improvement.',['P31109199']),
 'tms-ocd:presma':context('Pre-SMA is a plausible action-control target with mixed, protocol-specific clinical evidence. Ji’s small STN-connectivity-guided trial was positive; Fitzsimmons found no clinical superiority over active-control stimulation with exposure therapy.','Mantovani’s small categorical response comparison was inconclusive. Differences in laterality, stimulation and accompanying therapy prevent a simple old-versus-new verdict.',['ji2021','P19691873','P39089567']),
 'tms-ocd:dlpfc':context('In Fitzsimmons, left-DLPFC or left-pre-SMA stimulation combined with exposure therapy did not show clinical superiority over active vertex stimulation with the same therapy.','This proof-of-concept comparison does not establish equivalence, or settle the efficacy of other DLPFC protocols.',['P39089567']),
 'tms-ocd:medial':context('Dunlop’s small open OCD study linked dmPFC treatment response to changes in frontostriatal connectivity.','This is exploratory mechanism evidence without a sham-controlled efficacy comparison. It does not validate the distinct H7 protocol.',['P26440813','P31109199']),
 'tms-ocd:ofc':context('OFC remains an investigational OCD TMS target. Nauczyciel’s clinical comparison was inconclusive, although PET detected bilateral metabolic effects after right-sided stimulation.','The newer Jimenez single case with concurrent exposure therapy does not settle efficacy or supersede the pilot’s result. These studies test different approaches.',['P25203167','P40963640']),
 'depression:overview':context('Depression DBS has promising targeting and long-term observational findings alongside negative blinded trials. These designs answer different questions.','Long-term improvement cannot erase a negative randomized comparison; shared cohorts and changes in targeting or optimization must be considered.',['P28988904','P25726497','P27049915','P40854479']),
 'depression:scc':context('SCC tractography studies motivate targeting a convergence of fiber systems. The larger blinded trial did not show significant active-versus-sham benefit; later pooled follow-up reports sustained improvement.','Himes includes BROADEN and the Riva-Posse 2018 cohort. It extends those observations rather than supplying an independent randomized reversal.',['P24832866','P28397839','P28988904','P40854479']),
 'depression:alic':context('Bergfeld’s vALIC study found benefit during a randomized on/off crossover after an extended optimization phase. Liebrand linked contact-to-pathway relationships with outcome in a small retrospective sample.','The crossover concerns optimized treatment, not an initial all-implant efficacy test. Neither study identifies a universal contact number or antidepressant tract.',['P27049915','P30522916']),
 'depression:vcvs':context('The controlled VC/VS depression trial did not show significant active-versus-sham benefit during its blinded phase. Other capsular studies used different targeting and optimization designs.','An immediate mood change does not establish sustained antidepressant benefit. Contact effects depend on anatomical placement, lead geometry and stimulation settings.',['P25726497','P27049915']),
 'depression:mfb':context('slMFB studies provide investigational targeting and clinical evidence. Coenen’s small gateway trial reported improvement, with interpretation complicated by stimulation-onset and early microlesion effects.','The tractography-defined slMFB model is distinct from classical MFB anatomy. Neither is a demonstrated universal “happiness pathway.”',['P30867553','P30522916']),
 'depression:lhb':context('The habenula is included as anatomical context for a depression-DBS target discussed in the reviewed literature.','A review illustration and a whole-habenula mask do not establish efficacy or delineate the lateral-habenula target.',['P35817944']),
 'ocd:overview':context('OCD DBS research increasingly relates stimulation location to connected networks. Target names alone do not specify which fibers a contact engages.','Response maps, physiological measurements and small target comparisons provide different kinds of support; partially reused cohorts are grouped below.',['P38141909','P41172368','P30853111']),
 'ocd:alic':context('Capsular DBS can engage several frontal and deep networks. Multicenter response mapping and newer tractography-guided series support attention to connectivity rather than a broad target name alone.','These studies do not establish a universal contact-to-symptom rule. Meyer, Li and Tyagi include partly overlapping samples; Segura’s development and outcome cohorts also overlap.',['P38141909','P32620886','P41172368','P30853111']),
 'ocd:nac':context('Historical “NAc DBS” labels often include active contacts in neighboring vALIC. Figee’s artifact-controlled reanalysis retained right-NAc-seed links to right lateral and left medial prefrontal cortex.','Left-seed findings were not significant at the reported threshold. These are imaging-seed relationships, not proof that stimulation was confined to NAc or that a specific tract was inhibited.',['P23652657','P23434914']),
 'ocd:vcvs':context('Tyagi’s six-person comparison associated effective ventral-capsule stimulation with medial OFC connectivity and a greater mood effect than amSTN stimulation.','This is a study-specific target comparison, not a universal functional partition. Acute contact experiences and sustained OCD improvement are distinct outcomes.',['P30853111','P41172368']),
 'ocd:stn':context('Tyagi’s six-person comparison linked amSTN stimulation to lateral OFC, dACC and DLPFC networks, with improved cognitive flexibility in that study.','The whole STN provides orientation. Neither this small comparison nor reference pathways define a universal therapeutic subdivision or patient stimulation field.',['P30853111','P32620886']),
 'ocd:bnst':context('The BNST/ITP neighborhood provides context for response-associated locations in multicenter OCD DBS mapping.','A statistical response map is not proof of selective engagement of the BNST or ITP, and the local ITP surface does not show its complete pathway.',['P38141909']),
 'ocd:gpe':context('In Imtiaz’s observational study, ventral GPe contacts recorded signals while therapeutic stimulation was delivered in ALIC white matter.','A recording association does not establish GPe as the therapeutic stimulation target or a validated general biomarker.',['D874dae9256']),
 'ocd:vlpfc':context('VLPFC appears as connected cortex in tractography-guided OCD DBS research.','Connectivity to a DBS site is distinct from direct cortical stimulation or proof that this region independently mediates benefit.',['P41172368']),
 'ocd:mfb':context('The displayed slMFB/VTA projection model provides anatomical context for OCD circuit research.','Study-defined response fibers, slMFB and classical MFB should not be treated as one proven universal therapeutic pathway.',['P32620886','P34482949']),
 'all:overview':context('Start with a clinical focus to read the current interpretation for each target. Evidence is organized by question and study family, with historical observations available separately.','Finding counts are not independent replications. Newer publication dates alone do not outweigh stronger designs or correct for shared participants.',[])
};

export function contextsFor(topic,target){
 if(topic!=='all')return [currentContexts[`${topic}:${target}`]||currentContexts[`${topic}:overview`]];
 if(target==='overview')return [currentContexts['all:overview']];
 return Object.entries(currentContexts).filter(([key])=>key.endsWith(`:${target}`)&&!key.startsWith('all:')).map(([key,value])=>({...value,topic:key.split(':')[0]}));
}

export const sourceInterpretations={
 P42102818:'Separate evidence streams: mouse cellular and circuit experiments; evoked responses in 10 epilepsy patients; exploratory fMRI in 51 open-label aiTBS patients. Correlation and corrected null findings remain distinct from the causal mouse results.',
 P41484145:'The DTN is a normative network derived from structural treatment changes, with retrospective human validation and separate rat ECS experiments. It is distinct from Taylor’s convergent targeting circuit and has not been tested in a prospective randomized DTN-guided trial.',
 P23434914:'Read the artifact-controlled reanalysis first. The original connectivity analysis and addendum use the same dataset, not independent replications. Imaging seeds and active stimulation tissue are different.',
 P23652657:'Historical localization evidence: the “NAc” treatment label often included active contacts in adjacent vALIC. Independence from other Amsterdam reports is unresolved.',
 P22658708:'Foundational connectivity hypothesis. Read with Weigand and the larger, method-sensitive Elbau analysis; this is not a randomized targeting comparison.',
 P29274805:'Prospective observational support for the sgACC relationship. Association alone does not prove an optimal targeting rule or a causal treatment pathway.',
 P36855880:'A larger analysis found a modest, method-sensitive sgACC association (about 3% of outcome variance). This qualifies the strength and generality of earlier estimates.',
 P34711062:'The randomized comparison tested the accelerated treatment package. It does not isolate the added value of connectivity targeting from the rest of the protocol.',
 P38228914:'The null primary comparison concerns two different targeting/protocol combinations; it does not isolate connectivity guidance or invalidate every such strategy.',
 P42340706:'A small randomized targeting comparison with matched stimulation protocol. Its positive result concerns the convergent circuit used here, not every connectivity target.',
 P31109199:'A multicenter sham-controlled clinical anchor for this H7 protocol. The trial does not identify a selectively activated therapeutic tract.',
 P26440813:'Small open-label OCD study: useful mechanistic observations, without controlled proof of efficacy or validation of the separate H7 protocol.',
 P19691873:'Pilot with an inconclusive categorical response comparison. Later trials differ in side, targeting and concurrent therapy; pre-SMA efficacy remains protocol-specific.',
 P25203167:'Exploratory pilot: the clinical comparison was inconclusive. Bilateral PET changes do not establish efficacy or identify the stimulated fibers.',
 P39089567:'No clinical superiority over an active vertex comparator with exposure therapy. This proof-of-concept trial does not establish equivalence or rule out other protocols.',
 P40963640:'Single case with concurrent exposure therapy. Recency does not make this stronger efficacy evidence than a controlled comparison.',
 P30522916:'Small retrospective association using paper-defined slMFB/ATR anatomy. It does not establish a universal optimal coordinate; bundle naming remains debated.',
 P30867553:'Small investigational gateway trial. Early microlesion effects complicate the blinded-onset comparison; later improvement does not establish a universal mood pathway.',
 P27049915:'Randomized on/off crossover after open optimization. Later follow-up extends this same cohort; it is not an independent initial-implant efficacy trial.',
 P31711880:'The larger randomized depression trial did not show active dmPFC treatment superiority over sham. Earlier open-label connectivity findings do not supersede it.',
 P41172368:'Evolving tractography-guided case series. Development and outcome samples partly overlap; no universal contact number or selective tract mechanism is established.',
 seguin2026:'Proposed multistep routes tested in two existing TMS cohorts. Reanalysis of those cohorts is not a new independent clinical trial.',
 D874dae9256:'Observational recording study: bilateral hemispheres are repeated observations from ten people. ALIC stimulation and GPe sensing have different roles.',
 P19781987:'Historical acute mapping with a legacy modified lead. Its spacing and pooled coordinates are study methods, not current hardware guidance or validated contact-to-tract assignments.'
};

const families=[
 {id:'scc-evidence',title:'SCC targeting, controlled outcomes & follow-up',sources:['P28988904','P40854479','P28397839','P24832866'],rank:10,note:'Different questions and partly shared participants: Himes includes BROADEN/Holtzheimer and the Riva-Posse 2018 cohort. Long-term observational improvement does not reverse the blinded trial result.'},
 {id:'ocd-pathways',title:'OCD target comparisons & response mapping',sources:['P38141909','P32620886','P30853111'],rank:20,note:'Partly shared cohorts: Li includes Tyagi’s six-person London cohort; Meyer’s discovery sample includes 36 participants reported by Li. Meyer also has an independent validation sample. These publications are not three wholly independent replications.'},
 {id:'early-eeg',title:'Early EEG and coupling research',sources:['P23623188','P26166231','P26852071'],rank:90,optional:true,note:'Small exploratory studies, not validated general biomarkers. The coupling studies differ in diagnosis and DBS-OFF interval. Independence of the Amsterdam samples from other reports is unresolved.'},
 {id:'machado-history',title:'Historical contact mapping · Machado 2009',sources:['P19781987'],rank:100,optional:true,note:sourceInterpretations.P19781987}
];
export const earlierAnalysisIds=new Set(['FM014','FM015']);
const firstRecords=['FM016','FM017','FM018','AUDIT-01','AUDIT-02'];
const importantSources=['P31109199','P25726497','P39089567','P31711880','P36855880','P38228914','P42340706','P27049915'];

export function groupEvidence(items,sources){
 const bySource=Object.fromEntries(sources.map(s=>[s.id,s])),groups=new Map();
 for(const record of items){
  const family=families.find(f=>f.sources.includes(record.source_id));
  const source=bySource[record.source_id];
  const background=/review/.test(source.design||'');
  const config=family||{id:source.id,title:source.label,sources:[source.id],rank:importantSources.includes(source.id)?10:background?80:40,optional:background,note:sourceInterpretations[source.id]||''};
  if(!groups.has(config.id))groups.set(config.id,{...config,records:[],earlier:[]});
  groups.get(config.id)[earlierAnalysisIds.has(record.id)?'earlier':'records'].push(record);
 }
 const priority=(a,b)=>{
  const pa=firstRecords.indexOf(a.id),pb=firstRecords.indexOf(b.id);
  return (pa<0?100:pa)-(pb<0?100:pb);
 };
 return [...groups.values()].sort((a,b)=>a.rank-b.rank).map(g=>({...g,records:g.records.sort(priority)}));
}
