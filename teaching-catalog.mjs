// Background review context is separate from clinical outcomes and spatial geometry.
export const functionalRegions={
 "sgacc": {
  "label": "sgACC",
  "expanded": "Subgenual anterior cingulate cortex",
  "emphasis": "Coordinating bodily arousal",
  "description": "Dixon’s review proposes that sgACC helps coordinate autonomic and endocrine responses during anticipation of significant events. This account is tentative; causal evidence comes mainly from animal studies.",
  "locator": "Figure 4; sgACC section; Limitations of the Appraisal-by-Content Model",
  "source_id": "P28616997",
  "brief": "Dixon proposes a role in anticipating events through bodily arousal; this remains tentative, with causal evidence mainly from animals."
 },
 "pgacc": {
  "label": "pgACC",
  "expanded": "Pregenual anterior cingulate cortex",
  "emphasis": "Interpreting bodily feelings",
  "description": "Dixon’s framework proposes that pgACC evaluates bodily sensations in relation to personal meaning, contributing to subjective feelings of pleasure and displeasure. Its functions overlap with neighboring regions.",
  "locator": "Figure 5; pgACC section",
  "source_id": "P28616997",
  "brief": "Dixon proposes that pgACC interprets bodily feelings in personal context. No dedicated pgACC boundary is available here."
 },
 "mofc": {
  "label": "Medial OFC",
  "expanded": "Medial orbitofrontal cortex",
  "emphasis": "Evaluating remembered and imagined events",
  "description": "Dixon proposes that medial OFC evaluates memories and imagined future events in relation to goals and needs. The authors explicitly present this specialization as a hypothesis requiring further tests.",
  "locator": "Figure 3; medial OFC section; Limitations of the Appraisal-by-Content Model",
  "source_id": "P28616997",
  "brief": "Dixon proposes that medial OFC evaluates memories and imagined future events in relation to goals and needs. This specialization remains a hypothesis."
 },
 "lofc": {
  "label": "Lateral OFC",
  "expanded": "Lateral orbitofrontal cortex",
  "emphasis": "Evaluating external sensory information",
  "description": "Dixon reviews evidence that lateral OFC evaluates external sensory information in relation to context, goals and needs. It participates in both positive and negative valuation.",
  "locator": "Figure 2; lateral OFC section",
  "source_id": "P28616997",
  "brief": "Dixon describes lateral OFC as evaluating external sensory information in context, including both positive and negative values."
 },
 "dlpfc": {
  "label": "Lateral PFC",
  "expanded": "Lateral prefrontal cortex",
  "emphasis": "Evaluating emotions and regulation strategies",
  "description": "Dixon’s framework proposes that lateral PFC helps evaluate ongoing emotions and select regulation strategies in context. This concerns a broad region, not a specific DLPFC stimulation site or a demonstrated treatment mechanism.",
  "locator": "Lateral PFC and Emotion Regulation sections; Figure 9 diagram; Limitations of the Appraisal-by-Content Model",
  "source_id": "P28616997",
  "brief": "Dixon proposes that lateral PFC evaluates emotions and regulation strategies. This is broad functional context, not a demonstrated DLPFC treatment mechanism."
 }
};
export const functionalComparisons=[
 {
  "id": "cingulate",
  "label": "sgACC & pgACC",
  "title": "Bodily responses and bodily feelings",
  "regions": [
   "sgacc",
   "pgacc"
  ],
  "note": "These are complementary, overlapping roles in Dixon’s framework. The sgACC surface supplies anatomical orientation. The atlas has no dedicated pgACC boundary; its broader rostral ACC parcel is not an exact substitute. SCC DBS targets adjacent white matter."
 },
 {
  "id": "ofc",
  "label": "Medial & lateral OFC",
  "title": "Remembered, imagined and sensory experience",
  "regions": [
   "mofc",
   "lofc"
  ],
  "note": "Both regions participate in valuation. This is not a simple reward-versus-punishment division. These functional accounts provide context for the Tyagi network comparison; they do not establish why the two DBS sites produced different clinical effects."
 }
];

// Teaching claims share source IDs and reference geometry with the research atlas.
// Diagram positions are layout coordinates, never MRI coordinates.
const node=(id,label,expanded,color,entities,description)=>({id,label,expanded,color,entities,description});
export const nodes={
 dlpfc:node('dlpfc','DLPFC','Dorsolateral prefrontal cortex','#cd8759',['DLPFC'],'A cortical entry point used in depression TMS. Its functional connections help explain why target location within this broad region matters.'),
 sgacc:node('sgacc','sgACC','Subgenual anterior cingulate cortex','#bf7390',['SCC_GM'],'A deep part of the cingulate cortex involved in mood. Depression TMS is applied over the DLPFC; researchers study its functional connection with sgACC to help explain treatment effects.'),
 caudate:node('caudate','Caudate','Caudate nucleus','#bd8868',['caudate'],'A striatal partner of prefrontal cortex. A healthy-volunteer TMS–PET experiment demonstrated a downstream dopamine response here; it did not test antidepressant efficacy.'),
 mpfc:node('mpfc','mPFC / ACC','Medial prefrontal / anterior cingulate cortex','#b89c5c',['mPFC','dACC'],'The cortical territory targeted by the H7 OCD protocol. These broad anatomical regions do not outline the coil’s electric field.'),
 striatum:node('striatum','Striatum','Caudate and putamen','#bd8868',['caudate','putamen'],'Deep nuclei within frontal–basal ganglia circuits. Their inclusion explains the network rationale; it does not mean deep TMS directly stimulates them.'),
 thalamus:node('thalamus','Thalamus','Thalamus','#738cac',['thalamus'],'A deep partner in cortico-striato-thalamo-cortical circuitry. The diagram shows selected relationships, not a complete synaptic loop.'),
 presma:node('presma','Pre-SMA','Pre-supplementary motor area','#9b80af',['preSMA'],'Medial frontal cortex involved in action control. It lies posterior to the dmPFC approach and is a distinct OCD TMS research target.'),
 stn:node('stn','STN','Subthalamic nucleus','#6b9f96',['STN'],'A small deep nucleus involved in action control. Ji used STN functional connectivity to choose a superficial pre-SMA TMS site; the STN itself was not the coil target.'),
 capsule:node('capsule','Ventral capsule','Ventral anterior limb of the internal capsule','#bc805d',['ALIC'],'A white-matter corridor containing several fiber populations. A contact’s location within this corridor matters more than the broad target name alone.'),
 mofc:node('mofc','Medial OFC','Medial orbitofrontal cortex','#c79860',['medial_OFC'],'A cortical destination associated with effective ventral-capsule stimulation in Tyagi’s tractography analysis.'),
 amstn:node('amstn','amSTN','Anteromedial subthalamic region','#6b9f96',['amSTN'],'The OCD DBS target in the anterior-medial STN region. The 3D atlas shows the whole STN as orientation anatomy, not this precise subdivision.'),
 lofc:node('lofc','Lateral OFC','Lateral orbitofrontal cortex','#a78d66',['lateral_OFC'],'A cortical destination associated with effective amSTN stimulation in Tyagi’s tractography analysis.'),
 dacc:node('dacc','dACC','Dorsal anterior cingulate cortex','#b5a052',['dACC'],'A cingulate region included in the amSTN-connected network. Its whole parcel is an anatomical approximation.'),
 scc:node('scc','SCC white matter','Subcallosal cingulate white matter','#ba748a',['SCC_WM'],'The depression DBS target is white matter near the subgenual cingulate. The pink 3D surface is neighboring sgACC gray matter; it does not outline the stimulation site.'),
 medial:node('medial','Medial frontal cortex','Medial frontal cortex','#c79860',['medial_frontal'],'A cortical destination in SCC responder tractography, reached through fiber systems that include forceps minor and uncinate fasciculus.'),
 cingulate:node('cingulate','Cingulate cortex','Rostral and dorsal cingulate cortex','#b5a052',['dACC'],'A cortical destination linked to SCC stimulation through the cingulum. The available 3D parcel provides partial cortical context.'),
 subcortical:node('subcortical','Subcortical destinations','Ventral striatal and other deep destinations','#738cac',['NAc'],'SCC responder tractography included several deep destinations. Nucleus accumbens supplies one available landmark; it does not represent every destination.'),
};
const edge=(id,from,to,label,kind,sources,description,bundles=[])=>({id,from,to,label,kind,sources,description,bundles});
const step=(title,body,takeaway,nodeIds,edgeIds,bundles,sources,locator,note)=>({title,body,takeaway,nodes:nodeIds,edges:edgeIds,bundles,sources,locator,note});
export const lessons=[
 {id:'depression-tms',category:'Depression · TMS',title:'From a cortical target to a mood network',question:'Why stimulate the DLPFC?',topic:'tms-depression',target:'dlpfc',view:'lateral',hemisphere:'left',positions:{dlpfc:[145,85],sgacc:[475,85],caudate:[145,275]},edges:[
  edge('dlpfc-sgacc','dlpfc','sgacc','Functional anticorrelation','functional',['P22658708','P29274805','P36855880'],'Early studies associated more negative DLPFC–sgACC connectivity with better response. Elbau’s larger analysis found a modest, method-sensitive association. This functional relationship is not a direct fiber or a complete treatment mechanism.'),
  edge('dlpfc-caudate','dlpfc','caudate','Frontostriatal context','structural',['strafella2001','yeh2022'],'Reference corticostriatal fibers supply anatomical context. Healthy-volunteer TMS–PET supports a downstream caudate effect, not proof that this bundle mediates depression improvement.',['CS_A'])
 ],steps:[
  step('Start at the cortical target','The coil is positioned over left DLPFC. “DLPFC” covers a broad cortical region; the precise stimulation site varies across targeting approaches.','The treatment entry point is cortical.',['dlpfc'],[],[],['P22658708'],'Introduction; Figure 1','Left middle-frontal parcels approximate DLPFC; no coil field is shown.'),
  step('Connect the target to sgACC','Fox and Weigand associated more negative DLPFC–sgACC connectivity with better response. Elbau’s larger analysis found a modest, method-sensitive relationship, explaining about 3% of outcome variation. This remains a useful hypothesis, not a universal targeting rule.','A useful targeting relationship is not the same thing as a direct tract.',['dlpfc','sgacc'],['dlpfc-sgacc'],[],['P22658708','P29274805','P36855880'],'Fox and Weigand Results; Elbau Results and Discussion','The dashed line represents a functional relationship, not a direct fiber. The pink surface shows where sgACC lies; the exact location analyzed in each study is described in the evidence.'),
  step('Keep the deep circuit in view','Prefrontal stimulation can affect deeper structures. A TMS–PET experiment in healthy volunteers found a dopamine response in the ipsilateral caudate. The atlas’s corticostriatal tract gives this relationship anatomical context.','TMS has downstream effects beyond the cortex under the coil.',['dlpfc','sgacc','caudate'],['dlpfc-sgacc','dlpfc-caudate'],['CS_A'],['strafella2001','yeh2022'],'Strafella abstract; population-tract atlas','The displayed tract is a whole reference bundle, not a patient’s stimulated fibers.'),
  step('Read targeting trials in context','Taylor’s small randomized trial favored convergent-circuit targeting over scalp targeting with the same accelerated protocol. Morriss found no advantage for an insula-guided approach using different protocols. These test different strategies; neither settles a universal sgACC rule.','Ask which targeting method and stimulation protocol were actually compared.',['dlpfc','sgacc','caudate'],['dlpfc-sgacc','dlpfc-caudate'],['CS_A'],['P36855880','P42340706','P38228914','P34711062'],'Elbau Discussion; Taylor and Morriss primary comparisons; Cole tests an accelerated treatment package','No treatment strength, direction of electrical flow, or individual response is encoded.')
 ],quiz:{question:'Does the dashed DLPFC–sgACC connection represent a direct anatomical tract?',answer:'No. It represents resting-state functional connectivity. The separate corticostriatal bundle shows structural context.'}},
 {id:'ocd-tms',category:'OCD · TMS',title:'A cortical entry point into OCD circuitry',question:'Why target medial frontal cortex?',topic:'tms-ocd',target:'deep-medial',view:'medial',hemisphere:'left',positions:{mpfc:[310,75],striatum:[145,275],thalamus:[475,275]},edges:[
  edge('medial-striatal','mpfc','striatum','Corticostriatal arm','rationale',['P31109199','yeh2022'],'A selected arm of the circuit motivating the H7 protocol. The study tested a treatment protocol, not selective activation of this displayed fiber bundle.',['CS_A']),
  edge('medial-thalamic','mpfc','thalamus','Thalamocortical arm','rationale',['P31109199','yeh2022'],'The thalamic relationship supplies broader circuit context. Intermediate basal-ganglia relays are omitted; this drawing is not a complete closed loop.',['TR_A'])
 ],steps:[
  step('Locate the cortical entry point','Carmi’s H7 deep-TMS protocol targeted medial prefrontal/anterior cingulate circuitry and paired treatment with individualized symptom provocation.','Target, coil, and treatment context belong together.',['mpfc'],[],[],['P31109199'],'Methods; targeting protocol','A medial cortical approximation is shown, not an H7 field or isolated direct ACC stimulation.'),
  step('Reveal the deep partners','The rationale involves frontal–striatal–thalamic circuitry. These deep partners help explain the choice of cortical territory even though the coil is outside the skull.','Deep circuitry is relevant without assuming the coil directly stimulates every deep node.',['mpfc','striatum','thalamus'],['medial-striatal','medial-thalamic'],['CS_A','TR_A'],['P31109199','yeh2022'],'Carmi Introduction; atlas tract definitions','Only two circuit arms are shown. Pallidal relays and a complete synaptic loop are omitted.'),
  step('Separate the rationale from the trial result','The randomized trial reported more OCD responders with active than sham treatment. This supports the tested protocol; it does not determine which individual tract carried the benefit.','Clinical efficacy and a proposed circuit mechanism are different claims.',['mpfc','striatum','thalamus'],['medial-striatal','medial-thalamic'],['CS_A','TR_A'],['P31109199'],'Results; 38.1% versus 11.1% post-treatment response among assessed participants','Reference bundles are shown; no trial-specific stimulated fibers are available.'),
  step('Distinguish neighboring cortical approaches','Pre-SMA and dmPFC approaches use different targets and protocols. They should be taught separately from the H7 medial-prefrontal/ACC approach. Open the pre-SMA lesson to follow its STN connection.','Neighboring medial frontal labels are not interchangeable.',['mpfc'],[],[],['P31109199','P26440813','ji2021'],'Methods of the respective protocols','Left hemisphere is isolated to show the medial surface; it does not imply unilateral H7 treatment.')
 ],quiz:{question:'Does this diagram prove that the H7 coil directly stimulates the striatum or thalamus?',answer:'No. Those structures explain the network rationale. The clinical trial did not map selective deep-tract activation.'}},
 {id:'ocd-presma',category:'OCD · TMS',title:'Pre-SMA and the control of actions',question:'Why connect pre-SMA to the STN?',topic:'tms-ocd',target:'presma',view:'medial',hemisphere:'right',positions:{presma:[310,75],striatum:[145,275],stn:[475,275]},edges:[
  edge('presma-striatum','presma','striatum','Striatal connection','structural',['lehericy2004'],'Anatomical work places pre-SMA in associative striatal circuitry. The superior corticostriatal bundle is broad reference anatomy.',['CS_S']),
  edge('presma-stn','presma','stn','STN-linked targeting','functional',['ji2021'],'Ji selected a right pre-SMA TMS site using individual STN functional connectivity. The separate 3D hyperdirect-pathway estimate is population anatomy, not the study’s targeting map.',['HDP_PRE_SMA'])
 ],steps:[
  step('Start at pre-SMA','Pre-SMA is a medial frontal action-control region, posterior to the dmPFC approach. Ji’s OCD trial stimulated an individually selected right pre-SMA site.','The superficial target and deep connectivity reference have different roles.',['presma'],[],[],['ji2021'],'Methods: individualized target and 1-Hz rTMS','An anterior-SMA anatomical estimate is shown, not Ji’s individual target.'),
  step('Add striatum and STN','Pre-SMA participates in striatal and subthalamic circuitry. The striatal arm and the STN-linked targeting relationship are distinct connections, shown with different line styles.','The superior corticostriatal tract does not terminate in the STN.',['presma','striatum','stn'],['presma-striatum','presma-stn'],['CS_S','HDP_PRE_SMA'],['ji2021','lehericy2004','presma_derivation'],'Ji Introduction/Methods; atlas derivation record','The pre-SMA–STN 3D subset is an anatomical estimate with asymmetric source coverage.'),
  step('Understand the targeting experiment','In a randomized study of 37 people, Ji used STN connectivity to choose the cortical target. Active treatment improved OCD symptoms more than sham, with associated changes in the functional target network.','Connectivity helped choose where to stimulate; the STN was not directly stimulated by TMS.',['presma','stn'],['presma-stn'],['HDP_PRE_SMA'],['ji2021'],'Abstract; Results; clinical and connectivity analyses','One small trial does not establish this pathway as the universal mediator of OCD TMS.'),
  step('Keep the evidence proportional','Clinical evidence is mixed. Mantovani’s small bilateral study had an inconclusive categorical response comparison. Fitzsimmons found no clinical superiority for left pre-SMA plus exposure therapy over active vertex stimulation plus that therapy. Ji’s positive right-sided trial used a different protocol.','A plausible circuit and one positive trial do not establish every pre-SMA protocol.',['presma','stn'],['presma-stn'],['HDP_PRE_SMA'],['ji2021','P19691873','P39089567'],'Mantovani categorical response comparison; Fitzsimmons clinical Results; Ji targeting and Results','The right-side display follows Ji’s target; it is not a claim of right-hemisphere superiority.')
 ],quiz:{question:'Is the STN the TMS treatment site in Ji’s study?',answer:'No. Right pre-SMA is stimulated. STN functional connectivity was used to choose that cortical site.'}},
 {id:'ocd-dbs',category:'OCD · DBS',title:'Different entry points, different networks',question:'Why does the DBS location matter?',topic:'ocd',target:'alic',view:'oblique',hemisphere:'both',positions:{mofc:[115,75],lofc:[315,75],dlpfc:[515,75],capsule:[115,285],amstn:[415,285]},edges:[
  edge('vc-mofc','capsule','mofc','VC-connected network','structural',['P30853111'],'Effective ventral-capsule stimulation volumes were linked predominantly with medial OFC in Tyagi’s tractography analysis.'),
  edge('stn-lofc','amstn','lofc','amSTN-connected network','structural',['P30853111'],'Tractography associated the effective amSTN site with lateral OFC, dACC and DLPFC. The diagram omits dACC to keep this comparison compact.',['STN_ASSOC','STN_LIMBIC']),
  edge('stn-dlpfc','amstn','dlpfc','Prefrontal connection','structural',['P30853111'],'DLPFC was among the cortical destinations from the effective amSTN stimulation volume. Reference STN pathways are not those individual treatment fibers.',['STN_ASSOC'])
 ],steps:[
  step('Locate the white-matter corridor','Capsular DBS places contacts near multiple fiber populations. The ventral capsule and neighboring ventral striatum are close together, so the broad target label alone does not specify the stimulated network.','Ask which fibers are near the active contact.',['capsule'],[],['CS_A','TR_A'],['P30853111'],'Methods: neurosurgery; Discussion','The whole internal capsule provides orientation. It does not delineate vALIC or a stimulation volume.'),
  step('Follow the ventral-capsule network','In Tyagi’s six-person comparison, effective ventral-capsule stimulation connected predominantly with medial OFC. VC stimulation had a stronger mood effect than amSTN stimulation.','A deep white-matter entry point can access distant cortex.',['capsule','mofc'],['vc-mofc'],['CS_A','TR_A'],['P30853111'],'Results: Tractography; mood comparison; Figure 3','General capsular bundles provide context; the study-specific medial OFC pathway is not reconstructed.'),
  step('Compare the subthalamic entry point','In the same six participants, the amSTN-connected network included lateral OFC, dACC and DLPFC. Both DBS sites reduced OCD symptoms; improved cognitive flexibility was found with amSTN stimulation. This is a study-specific comparison, not a universal division of function.','Clinical dimensions and connected networks can differ across DBS sites.',['amstn','lofc','dlpfc'],['stn-lofc','stn-dlpfc'],['STN_ASSOC','STN_LIMBIC'],['P30853111'],'Results: Tractography and cognitive flexibility; Figure 3','The whole STN and population pathways are shown; the precise amSTN treatment volume is unavailable.'),
  step('From target labels to individual connections','Newer multicenter response mapping and tractography-guided series also relate DBS location to connected networks. They do not assign a universal effect to a contact number. Tyagi’s six-person comparison supplies one useful example within this broader research.','Ask which fibers a contact can engage; an immediate mood lift is not sustained treatment benefit.',['capsule','mofc','amstn','lofc','dlpfc'],['vc-mofc','stn-lofc','stn-dlpfc'],['CS_A','TR_A','STN_ASSOC'],['P30853111','P38141909','P41172368'],'Tyagi target comparison; Meyer response mapping; Segura-Amil tractography-guided series','No “contact 4” rule is inferred. Contact numbering and implanted trajectories vary.')
 ],quiz:{question:'Can the name “VC/VS” alone tell you which cortical network a contact engages?',answer:'No. Location, trajectory and stimulation settings matter. A study’s tractography can support a network interpretation, but the target name is not enough.'}},
 {id:'depression-dbs',category:'Depression · DBS',title:'A meeting point for mood-related pathways',question:'Why target SCC white matter?',topic:'depression',target:'scc',view:'medial',hemisphere:'left',positions:{medial:[115,75],cingulate:[315,75],subcortical:[515,75],scc:[315,285]},edges:[
  edge('scc-frontal','scc','medial','Forceps minor / uncinate','structural',['P24832866','P28397839'],'SCC responder tractography included medial frontal connections through forceps minor and uncinate. These are two distinct fiber systems.',['FMI','UF']),
  edge('scc-cingulate','scc','cingulate','Cingulum','structural',['P24832866','P28397839'],'Cingulum pathways connect the SCC region with rostral and dorsal cingulate territories.',['C_FP','C_PO']),
  edge('scc-deep','scc','subcortical','Descending connections','structural',['P24832866','P28397839'],'Subcortical connections were part of responder tractography. The displayed corticostriatal bundle is contextual, not a complete reconstruction of the study’s descending paths.',['CS_A'])
 ],steps:[
  step('Distinguish cortex from white matter','SCC DBS targets white matter beside the subgenual cingulate cortex. The nearby sgACC helps orient us, but a cortical surface is not the DBS stimulation site.','The pink surface marks neighboring cortex.',['scc'],[],[],['P24832866'],'Methods; stimulation-volume tractography','The precise SCC white-matter target has no boundary mask in this atlas.'),
  step('Reveal the converging fiber systems','Riva-Posse’s work associated response with pathways toward medial frontal, cingulate and subcortical destinations. Prospective targeting sought convergence of four fiber systems: forceps minor, uncinate, cingulum and frontostriatal fibers.','The connection pattern may be more informative than a coordinate alone.',['scc','medial','cingulate','subcortical'],['scc-frontal','scc-cingulate','scc-deep'],['FMI','UF','C_FP','C_PO','CS_A'],['P24832866','P28397839'],'2014 Results/Figure 2; 2018 targeting methods','Reference bundles are shown. Their visual overlap does not define a validated stimulation sweet spot.'),
  step('Understand the evidence for targeting','A prospective open-label cohort used tractography to guide targeting. Its encouraging outcomes support further study of this approach, while the absence of a sham comparison limits causal interpretation.','Targeting evidence and controlled efficacy evidence answer different questions.',['scc','medial','cingulate','subcortical'],['scc-frontal','scc-cingulate','scc-deep'],['FMI','UF','C_FP','CS_A'],['P28397839'],'Prospective cohort Results; open-label design','The 3D anatomy does not reproduce the cohort’s electrodes or activation volumes.'),
  step('Connect the trial to longer follow-up','Holtzheimer’s blinded SCC trial did not show significant active-versus-sham benefit. Himes later reported sustained improvement in pooled follow-up that includes this trial and the Riva-Posse cohort. Different follow-up periods and comparisons explain why these results can coexist.','Later observational improvement does not reverse a negative blinded comparison.',['scc','medial','cingulate','subcortical'],['scc-frontal','scc-cingulate','scc-deep'],['FMI','UF','C_FP','CS_A'],['P28988904','P28397839','P40854479'],'Holtzheimer primary blinded comparison; Himes pooled cohorts and long-term outcomes','The left medial view is for visibility; these DBS studies used bilateral implantation.')
 ],quiz:{question:'Does the pink sgACC surface show the exact SCC DBS stimulation volume?',answer:'No. It locates neighboring gray matter. The DBS target is adjacent white matter, and the patient-specific stimulation volume is not loaded.'}}
];

export const additionalSources=[
 {id:'P24421642',label:'Tsai 2014',title:'Acute stimulation effect of the ventral capsule/ventral striatum in patients with refractory obsessive–compulsive disorder – a double-blinded trial',url:'https://pmc.ncbi.nlm.nih.gov/articles/PMC3888347/',doi:'10.2147/NDT.S54964',review:'Public full text read through Europe PMC XML; Methods, Results, Table 2 and Discussion.',access:'full_text'},
 {id:'lead-spec',label:'3387 / 3389 lead dimensions',title:'FDA SSED P150031/S028: comparison of lead specifications, printed page 22',url:'https://www.accessdata.fda.gov/cdrh_docs/pdf15/P150031S028B.pdf',review:'Public device-comparison table; checked against Tsai’s methods. Used only for hardware dimensions.',access:'public_specification'},
];

export const contactCase={
 id:'tsai-case1-left',title:'One lead, different immediate experiences',study:'P24421642',patient:'Published case 1 · left VC/VS lead',leadModel:'Medtronic 3387',contactLengthMm:1.5,gapMm:1.5,diameterMm:1.27,
 setting:'Reported test: 6 V · 210 μs · 130 Hz · monopolar',
 description:'Compare adjacent contacts 1 and 2. Both elicited smiling/laughter, but reported euphoria differed. These are observations in one person, not a prediction for another patient.',
 contacts:[
  {id:0,title:'Deepest contact',experience:'Smile/laughter with euphoria',detail:'At 6 V, the report describes smile/laughter with euphoria. Smell and chest tightness were also reported.',sources:['P24421642'],locator:'Results: Psychiatric responses; Table 2, case 1, contact 0'},
  {id:1,title:'Second from the tip',experience:'Smile/laughter with euphoria',detail:'At 6 V, smile/laughter was accompanied by reported euphoria. The table also lists smell, chest tightness and increased sexual drive at this voltage.',sources:['P24421642'],locator:'Results: Psychiatric responses; Table 2, case 1, contact 1'},
  {id:2,title:'Third from the tip',experience:'Smile/laughter without euphoria',detail:'At 6 V, smile/laughter occurred without reported euphoria. Smell, chest tightness and increased sexual drive were also listed at this voltage.',sources:['P24421642'],locator:'Results: Psychiatric responses; Table 2, case 1, contact 2'},
  {id:3,title:'Most superficial contact',experience:'No smile/laughter reported',detail:'Table 2 lists no smile/laughter response for this contact across the tested voltages. Smell was reported at 6 V. The text does not supply an exact euphoria rating for this contact at 6 V.',sources:['P24421642'],locator:'Table 2, case 1, contact 3; no individual euphoria score inferred from the group figure'}
 ],
 limits:'The lead drawing preserves nominal contact dimensions. It is not implanted into the atlas: the study does not supply a matched patient tractogram or a validated tract assignment for these individual responses. No activation volume is estimated.',
 takeaway:'A smile, a subjective mood change, and sustained improvement in OCD are different outcomes. Nearby contacts can differ, and the contact number alone is not an anatomical label.'
};

// Full texts supplied and public supplement retrieved in the v0.13 follow-up.
export const accessGaps=[];

Object.assign(nodes, {
 seg_dlpfc:{...node('seg_dlpfc','L DLPFC','Left dorsolateral prefrontal cortex','#cd8759',['DLPFC'],'The starting region for these proposed routes from the TMS site toward sgACC. Seguin modeled a 10-mm-radius region around each stimulation location. The shaded cortex locates DLPFC; it does not outline an individual stimulation site.'),side:'left'},
 seg_sfg:{...node('seg_sfg','R dorsal SFG','Right dorsal superior frontal gyrus','#9277ad',['SFG'],'An intermediate region in the cortical route and early-crossing thalamic route. The whole superior-frontal parcel gives orientation; it does not delineate Lausanne parcels 20 and 36.'),side:'right',view:'medial'},
 seg_acc:{...node('seg_acc','R anterior cingulate','Right anterior cingulate cortex','#b19753',['dACC'],'An intermediate region in the proposed cortical route. The study labels it right caudal anterior cingulate 1 and relates the route to area 32. The atlas parcel is broader.'),side:'right',view:'medial'},
 seg_lthal:{...node('seg_lthal','L thalamus','Left thalamus','#738cac',['thalamus'],'A proposed relay before the interhemispheric crossing. The connectome uses a whole-thalamus parcel; it does not resolve individual thalamic nuclei.'),side:'left'},
 seg_rthal:{...node('seg_rthal','R thalamus','Right thalamus','#738cac',['thalamus'],'A proposed relay after the early interhemispheric crossing. This is a modeled network step, not a measured evoked response.'),side:'right'},
 seg_lmed:{...node('seg_lmed','L medial SFG','Left medial superior frontal gyrus','#b89c5c',['dmPFC'],'A medial frontal intermediate region, labeled left superior frontal 14 in the study. The atlas provides a broad medial-frontal estimate rather than that exact parcel.'),side:'left',view:'medial'},
 seg_rmed:{...node('seg_rmed','R medial SFG','Right medial superior frontal gyrus','#b89c5c',['dmPFC'],'A medial frontal intermediate region, labeled right superior frontal 7 in the study. It is distinct from the more dorsal SFG node in the schematic.'),side:'right',view:'medial'},
 seg_sgc:{...node('seg_sgc','R sgACC','Right subgenual cingulate cortex','#bf7390',['SCC_GM'],'The proposed routes end at this mood-related cortical region. Seguin calls it SGC and models a 10-mm-radius region around MNI (6, 16, −10). The pink surface locates sgACC; it does not outline that study region.'),side:'right',view:'medial'}
});
const modelEdge=(id,from,to,label,bundles=[])=>edge(id,from,to,label,'model',['seguin2026'],'A proposed step in Seguin’s normative connectome model. Direction follows the modeled route; it is not observed electrical propagation. The 3D bundles are separately sourced reference anatomy.',bundles);
const routeStep=(title,body,takeaway,ids,edgeIds,bundles,positions,locator)=>({...step(title,body,takeaway,ids,edgeIds,bundles,['seguin2026'],locator,'The diagram follows the proposed route. Broad 3D regions and reference bundles do not reproduce its individual streamlines.'),positions});
lessons.splice(1,0,{
 id:'depression-routes',category:'Depression · TMS',title:'How might DLPFC stimulation reach sgACC?',question:'Compare three proposed multistep routes',topic:'tms-depression',target:'dlpfc',view:'oblique',hemisphere:'both',stepLabels:['CORTICAL ROUTE','LEFT THALAMUS','RIGHT THALAMUS','EVIDENCE'],positions:{seg_dlpfc:[105,75],seg_sfg:[315,75],seg_acc:[525,75],seg_sgc:[525,285],seg_lthal:[315,75],seg_lmed:[525,75],seg_rmed:[525,285],seg_rthal:[525,75]},edges:[
  modelEdge('seg-callosal','seg_dlpfc','seg_sfg','Callosal crossing'),modelEdge('seg-sfg-acc','seg_sfg','seg_acc','Cortical step'),modelEdge('seg-acc-sgc','seg_acc','seg_sgc','Cingulum',['C_FP','C_PO']),
  modelEdge('seg-l-thalamic','seg_dlpfc','seg_lthal','To left thalamus',['TR_A']),modelEdge('seg-l-thal-med','seg_lthal','seg_lmed','To medial cortex',['TR_A']),modelEdge('seg-med-cross','seg_lmed','seg_rmed','Later crossing'),modelEdge('seg-med-sgc','seg_rmed','seg_sgc','To sgACC'),
  modelEdge('seg-r-thalamic','seg_sfg','seg_rthal','To right thalamus',['TR_A']),modelEdge('seg-r-thal-med','seg_rthal','seg_rmed','To medial cortex',['TR_A'])
 ],steps:[
  routeStep('A route through cortex','Seguin proposes left DLPFC → right dorsal superior frontal gyrus → right anterior cingulate cortex → right SGC. This three-step route crosses hemispheres through the corpus callosum and reaches SGC through the cingulum.','Several connections can link two regions without a direct DLPFC–sgACC tract.',['seg_dlpfc','seg_sfg','seg_acc','seg_sgc'],['seg-callosal','seg-sfg-acc','seg-acc-sgc'],['C_FP','C_PO'],{seg_dlpfc:[105,75],seg_sfg:[315,75],seg_acc:[525,75],seg_sgc:[525,285]},'Main text p. 1050; Figure 2g–h; Supplementary Figure S7'),
  routeStep('The left-thalamus route','Another route proceeds from left DLPFC to left thalamus, left medial superior frontal cortex, right medial superior frontal cortex and right SGC. The hemispheric crossing occurs after the left thalamic relay.','The thalamus supplies a possible intermediate relay.',['seg_dlpfc','seg_lthal','seg_lmed','seg_rmed','seg_sgc'],['seg-l-thalamic','seg-l-thal-med','seg-med-cross','seg-med-sgc'],['TR_A'],{seg_dlpfc:[105,75],seg_lthal:[315,75],seg_lmed:[525,75],seg_rmed:[525,285],seg_sgc:[315,285]},'Main text p. 1050; Figure 2h; Supplementary Figure S6'),
  routeStep('The right-thalamus route','Here the crossing occurs earlier: left DLPFC → right dorsal superior frontal cortex → right thalamus → right medial superior frontal cortex → right SGC. This is a different four-step alternative, not an additional segment of the left-thalamus route.','Keep alternative routes separate rather than joining them into one long tract.',['seg_dlpfc','seg_sfg','seg_rthal','seg_rmed','seg_sgc'],['seg-callosal','seg-r-thalamic','seg-r-thal-med','seg-med-sgc'],['TR_A'],{seg_dlpfc:[105,75],seg_sfg:[315,75],seg_rthal:[525,75],seg_rmed:[525,285],seg_sgc:[315,285]},'Main text p. 1050; Figure 2h; Supplementary Figure S8'),
  routeStep('What supports these routes?','In two existing TMS cohorts (25 and 24 participants), fewer modeled hops were associated with greater symptom improvement. The supplied data reproduce the first cohort’s correlation (ρ≈−0.51). Two of four cohort/connectome combinations remained significant after correction across nine network measures.','These routes are testable anatomical hypotheses, not proven pathways of antidepressant action.',['seg_dlpfc','seg_sfg','seg_acc','seg_sgc'],['seg-callosal','seg-sfg-acc','seg-acc-sgc'],['C_FP','C_PO'],{seg_dlpfc:[105,75],seg_sfg:[315,75],seg_acc:[525,75],seg_sgc:[525,285]},'Figure 1c,g; Methods; Supplementary Figure S3; Source Data Figure 1, sheet 1C')
 ],quiz:{question:'Does “four hops” mean four millimeters or four directly observed synapses?',answer:'Neither. A hop is one modeled connection between parcels in a normative graph. The selected route minimizes a weight-based cost; it is not a measured physical path length or a count of observed synapses.'}
});

export const machadoCase={
 id:'machado2009',study:'P19781987',n:6,
 frame:'Millimeters relative to the posterior-inferior margin of the anterior commissure (AC); axes aligned to the AC–PC line.',
 lead:{name:'Modified 3387 INS',contactLengthMm:3,gapMm:4,centerSpacingMm:7,exception:'One participant had a standard 3387 on the left, with 3-mm center spacing.'},
 clusters:[
  {id:0,name:'Ventral striatal region',position:{right:[7.7,1.1,-2.8],left:[-5.0,1.6,-2.6]},mood:{right:'Mood elevation: consistent (4–6 participants)',left:'Mood elevation: consistent (4–6 participants)'},effects:{right:'Dizziness, anxiety, alertness and energy were frequent (2–3 participants).',left:'Warmth was consistent; dizziness, anxiety and flushing were frequent.'},interpretation:'Several nearby structures may contribute: ventral striatum/pallidum, anterior commissure, fornix and ventral capsular fibers. This study could not isolate their contributions.'},
  {id:1,name:'Ventral capsule above the AC',position:{right:[11.6,3.5,2.7],left:[-7.9,4.0,2.6]},mood:{right:'Mood elevation: consistent (4–6 participants)',left:'Mood elevation: frequent (2–3 participants)'},effects:{right:'Energy, alertness, laughter, dizziness and talking were frequent.',left:'Energy, alertness, warmth, calmness and nausea were frequent.'},interpretation:'The authors proposed engagement of orbitofrontal-connected ventral capsular fibers and associated loops. This is an anatomical explanation, not a measured tract-specific cause.'},
  {id:2,name:'Middle portion of the ALIC',position:{right:[15.6,5.1,7.9],left:[-11.0,6.3,7.6]},mood:{right:'Mood elevation: isolated (1 participant)',left:'No mood-elevation category reported'},effects:{right:'Dizziness, anxiety, calmness, reduced mood and fatigue were frequent.',left:'No consistent or frequent effects. Warmth, energy, dizziness and calmness were isolated.'},interpretation:'The response pattern differed from the ventral clusters. Absence of a reported category is not a prediction of no effect in another patient.'}
 ],
 limits:'Each point is an average across retained contacts from several people. It is not one person’s electrode. CC3 was too dispersed for response clustering. These coordinates have not been registered into the atlas.',
 conclusion:'Acute mood changes varied with location and side. The paper did not establish that an immediate mood lift predicts sustained antidepressant benefit.'
};

// v0.17: distinguish animal mechanisms from human physiology and associations.
Object.assign(nodes,{
 'mouse-pl':node('mouse-pl','Mouse PL','Mouse prelimbic cortex','#cd8759',[],'Optogenetic mouse stimulation site. No spatial registration to human DLPFC is supplied, so this node has no human atlas surface.'),
 'mouse-insula':node('mouse-insula','Mouse insula','Mouse insular cortex','#738cac',[],'In Johnson’s mouse experiments, insula inhibition blocked behavioral effects and stimulation of insula-projecting PL neurons reproduced them. This is not a human treatment target.'),
 'human-pfc':node('human-pfc','DLPFC','Human DLPFC physiology context','#cd8759',['DLPFC'],'Broad bilateral cortical context for ipsilateral and contralateral TMS-evoked recordings; individual coil sites are not reconstructed.'),
 'left-dlpfc':{...node('left-dlpfc','Left DLPFC','Left dorsolateral prefrontal cortex','#cd8759',['DLPFC'],'Stimulation region in Johnson’s 51-person open-label aiTBS cohort. Broad parcels do not delineate individual targets.'),side:'left'},
 'insula-context':node('insula-context','Insula','Bilateral insular context','#738cac',['insula'],'Whole-insula reference anatomy. Johnson studied evoked responses and connectivity; Ji reported common network connectivity. Anterior/posterior subdivisions and electrodes are not reconstructed.'),
 'amygdala-hub':node('amygdala-hub','Amygdala','Amygdala hub anatomy','#bf7390',['amygdala'],'Ji derived small bilateral hub clusters. The whole-amygdala surfaces are broader anatomical landmarks, not those clusters or an implanted treatment target.'),
 'hippocampus-context':node('hippocampus-context','Hippocampus','Hippocampal network context','#b89c5c',['hippocampus'],'Hippocampal regions appeared in common connectivity across Ji’s discovery experiments. The whole structure does not delimit the DTN.'),
 'rat-amygdala':node('rat-amygdala','Rat amygdala','Rat basolateral-amygdala intervention','#bf7390',[],'Muscimol inactivation during rat electroconvulsive shock. No human injection site or amygdala treatment target is assigned.')
});
lessons.push(
 {id:'fronto-insular',stepLabels:['MOUSE','HUMAN','ASSOCIATION','LIMIT'],category:'Depression · mechanism research',title:'Fronto-insular evidence across species',question:'What does the fronto-insular study establish?',topic:'tms-depression',target:'fronto-insular',view:'oblique',hemisphere:'both',positions:{'mouse-pl':[145,175],'mouse-insula':[475,175],'human-pfc':[145,175],'left-dlpfc':[145,175],'insula-context':[475,175]},edges:[
  edge('mouse-pl-insula','mouse-pl','mouse-insula','Mouse circuit manipulation','experimental',['P42102818'],'Controlled inhibition and projection-specific stimulation support necessity and sufficiency for the tested mouse behaviors. This relation is confined to the experimental model; no human fiber is inferred.'),
  edge('pfc-insula-evoked','human-pfc','insula-context','Evoked response','functional',['P42102818'],'Active-versus-sham TMS responses in epilepsy patients show downstream engagement. Single-pulse physiology does not establish an antidepressant mechanism or direct tract.'),
  edge('pfc-insula-fc','left-dlpfc','insula-context','Baseline connectivity','functional',['P42102818'],'Pretreatment resting-state connectivity was associated with outcome in an open-label cohort. This is not causal direction or an externally validated targeting rule.')
 ],steps:[
  step('Start with the mouse experiment','Optogenetic prelimbic aiTBS promoted cell-specific synaptic plasticity. Inhibiting insular activity blocked behavioral effects; stimulating insula-projecting prelimbic neurons reproduced them.','Causality is established within this mouse model.',['mouse-pl','mouse-insula'],['mouse-pl-insula'],[],['P42102818'],'Figures 2 and 5; Limitations','These animal nodes have no human anatomical highlight. The experiment does not reproduce human magnetic stimulation.'),
  step('Ask what was measured in humans','Ten epilepsy patients contributed TMS-evoked intracranial responses. Insula, ACC and medial OFC responded beyond sham. The diagram focuses on the insular component.','Evoked responses establish engagement, not antidepressant benefit.',['human-pfc','insula-context'],['pfc-insula-evoked'],[],['P42102818'],'Figure 6A–E; legend pp. 3082–3083','Human surfaces are broad context; neither individual electrodes nor a direct fronto-insular tract are shown.'),
  step('Read the treatment association','In 51 open-label aiTBS patients, stronger pretreatment left-DLPFC connectivity with the left and right insula was associated with greater MADRS improvement (r=0.367 and 0.413).','Association motivates further testing of a mechanism.',['left-dlpfc','insula-context'],['pfc-insula-fc'],[],['P42102818'],'Figure 6F–J; STAR Methods, fMRI Data Analysis','The exploratory cohort had no sham control or external predictive validation. This was not the BRIGhTMIND targeting comparison.'),
  step('Keep the corrected null result visible','The exploratory pre/post fronto-insular connectivity decrease did not survive whole-brain multiple-comparison correction. The baseline association and the change analysis concern different questions.','A response correlation does not demonstrate treatment-induced rewiring.',['left-dlpfc','insula-context'],['pfc-insula-fc'],[],['P42102818'],'Figure S9D; STAR Methods; Results p. 3083','No treatment-induced connection-strength change is encoded in this diagram.')
 ],quiz:{question:'Does the human association prove that changing this connection causes recovery?',answer:'No. Causal circuit manipulations were in mice. The human data show evoked engagement and exploratory response associations; corrected connectivity-change evidence was nonsignificant.'}},
 {id:'depression-network',stepLabels:['DERIVATION','VALIDATION','ANIMAL','EXTENSION'],category:'Depression · network research',title:'An amygdala-linked therapeutic network',question:'What is the depression therapeutic network?',topic:'tms-depression',target:'depression-network',view:'oblique',hemisphere:'both',positions:{'amygdala-hub':[310,85],'insula-context':[145,285],'hippocampus-context':[475,285],'rat-amygdala':[310,185]},edges:[
  edge('dtn-insula','amygdala-hub','insula-context','Normative network','functional',['P41484145'],'Conceptual context for the amygdala-seeded normative network and common insular connectivity. The line is not a reconstructed tract, measured treatment change or patient-specific connection.'),
  edge('dtn-hippocampus','amygdala-hub','hippocampus-context','Normative network','functional',['P41484145'],'Conceptual context for hippocampal regions in the common network. Whole-structure landmarks do not delineate Ji’s DTN or hub clusters.')
 ],steps:[
  step('Derive a network from treatment changes','Ji mapped gray-matter changes from 16 ECT, medication and MST experiments through a 652-person healthy connectome. Bilateral amygdala hub clusters defined the DTN.','The starting evidence is a group-level structural-change synthesis.',['amygdala-hub','insula-context','hippocampus-context'],['dtn-insula','dtn-hippocampus'],[],['P41484145'],'Figures 2–3; Results and Therapeutic network mapping','The diagram names selected regions. It does not display the released DTN values, hub boundaries or a treatment mask.'),
  step('Understand the human validation','Networks constructed from independent cortical-thickness studies and two ECT cohorts (40 and 54 people) resembled the DTN more than non-depression comparison networks.','Spatial-pattern validation is different from clinical prediction.',['amygdala-hub','insula-context','hippocampus-context'],['dtn-insula','dtn-hippocampus'],[],['P41484145'],'Figure 4; Retrospective clinical validation','The validation does not compare DTN-guided treatment with standard targeting.'),
  step('Separate the animal causal test','Inhibiting bilateral basolateral amygdala during ECS attenuated behavioral improvement in male rats. Nine rats per arm were analyzed after placement exclusions.','The causal intervention was in a rat ECS model.',['rat-amygdala'],[],[],['P41484145'],'Figure 5; Methods, Prospective preclinical validation','No human anatomy is highlighted for the rat experiment. It does not recommend amygdala DBS or TMS.'),
  step('Interpret the DBS and TMS extension','Published DBS and rTMS sites aligned with opposite signs of the DTN. In a separate retrospective 24-person rTMS dataset, increased positive-DTN connectivity correlated with HAMD improvement (partial r=0.56).','A randomized DTN-guided targeting trial is still needed.',['amygdala-hub','insula-context','hippocampus-context'],['dtn-insula','dtn-hippocampus'],[],['P41484145'],'Figure 7a–b; Generalizability; Limitations','Functional signs do not mean excitation or inhibition. The retrospective change–change association is not baseline prediction or proven targeting superiority.')
 ],quiz:{question:'Is the DTN the same map as Taylor’s convergent targeting circuit?',answer:'No. Ji derived the DTN from treatment-related structural changes and normative connectivity. Taylor tested a different circuit-based targeting strategy in a randomized trial.'}}
);

for(const id of ['mouse-pl','mouse-insula','rat-amygdala'])nodes[id].species='animal';
