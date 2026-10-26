# Supplied-literature coverage crosswalk

> Follow-up: the [v0.11.0 Round 3 report](ROUND3-v0.11.md) records incorporation of the five subsequently supplied article families. Counts and gaps below remain the original v0.10.3 audit snapshot.

Reviewed 1 October 2026 against atlas **v0.10.3**, commit `0120b05`.

**The atlas represents the downloaded core collection and all 20 expansion papers,
but it does not yet incorporate the wider supplied Handoff literature.**
Paper presence, finding coverage and available 3D geometry are separate questions.

This is a coverage audit and expansion backlog. It does not add new clinical
findings to the atlas or claim to have freshly read all 231 primary publications.

[Searchable crosswalk](literature-crosswalk-v0.10.3.html) ·
[Structured crosswalk](literature-crosswalk-v0.10.3.json)

The HTML report works when opened locally or through the local atlas server;
GitHub displays its source. Finding links require the local atlas to be running.

## Coverage counts

| Supplied material | Result |
| --- | --- |
| 71 files in the Figee folder | Every non-hidden file inventoried; all hashes match the prior records. Includes 29 PDFs, 2 DOCX files, 37 images and 3 Handoff files. |
| 11 scientific source families represented by those files | All have atlas findings. Alternate manuscripts, duplicate files and supplements are not additional papers. The mislabeled Liebrand PDF is excluded as Liebrand evidence; its correct main article was retrieved separately. |
| Requested 20-paper expansion | **20/20 represented, with 41 findings.** Nineteen have map-relevant full-text review; Fitzsimmons remains abstract/indexed-results level. Only Cole and Taylor have supplied main PDFs in the Round 2 folder; other papers were accessed separately. |
| Wider Handoff: 231 screened publication records | 12 represented as atlas sources, 1 incorporated addendum, 107 not incorporated, 20 background/mixed-context records and 91 outside the four-topic scope. These are records, not unique independent studies. |
| Wider Handoff: 54 annotated cards | **11 represented source records + the Figee addendum = 12 incorporated cards; 33 additional in-scope cards are not incorporated; 8 concern other indications and 1 is lesion-based background.** The supplied chapter is also represented, but was not one of these 54 cards. |
| Handoff anatomy and figures | All 75 relationships, 28 figure entries, 14 intervention/recording roles and 53 entities have explicit dispositions. |
| Active atlas | 32 sources and 76 findings crosswalked to their anatomy, review depth, source locations and previously verified display state. |

The 164 “related” records in the supplied dossier used a broader scope than this
atlas. The present audit retains all 231 screened records and applies the user's
four-topic restriction. It does not count Parkinson disease, schizophrenia,
addiction, tinnitus, VNS or non-neuromodulation studies as missing atlas targets.

## Highest-priority absent sources

Priorities below reflect relevance to this atlas, not a ranking of clinical efficacy.

| Source | Missing contribution | Work needed |
| --- | --- | --- |
| [Fridgeirsson 2020](https://pmc.ncbi.nlm.nih.gov/articles/PMC7241947/) | OCD vALIC DBS and vmPFC–amygdala–insula connectivity. | Extract functional connectivity and model-estimated effective connectivity separately; preserve OCD mood/anxiety context. |
| [Cha 2024](https://pubmed.ncbi.nlm.nih.gov/37919403/) | Changes in SCC DBS network effects over time. | Add time-specific PET findings. Avoid giving the DMN or salience network one permanent activation/inhibition label. |
| [Alagapan 2023](https://www.nature.com/articles/s41586-023-06541-3) | SCC electrophysiology associated with depression recovery. | Distinguish stimulation and recording volumes and a recovery-state biomarker from a new therapeutic tract. |
| [Arbab 2025](https://pubmed.ncbi.nlm.nih.gov/41127682/) | OCD intracranial symptom-provocation recording evidence. | Add recorded physiological effects while keeping GPe/striatal/capsular sensing locations separate from therapeutic targets. |
| [Hollunder supplied preprint](https://pubmed.ncbi.nlm.nih.gov/41445619/) | Symptom-specific OCD circuit distinctions. | Confirm publication version and full-text details; keep provisional status and exploratory cognitive analyses explicit. Li's existing global response tract is a different dataset. |
| [Himes 2025 pooled SCC outcomes](https://pubmed.ncbi.nlm.nih.gov/40854479/) | Long-term outcome context beyond the blinded SCC trial. | Reconcile the [2026 corrigendum](https://pubmed.ncbi.nlm.nih.gov/42275687/) before numerical extraction; preserve overlapping cohorts. The correction identity was verified, but its text could not be retrieved from the publisher in this pass. |

The original NAc-labelled clinical trial, larger and longer-term vALIC OCD
cohorts, the depression vALIC follow-up, dopamine imaging and additional recording
studies are secondary priorities. They are listed individually in the crosswalk.
Recording/physiology findings can be useful without inventing new tract geometry.

## Partial coverage within papers already present

| Paper / issue | What is absent or deliberately deferred | Next step |
| --- | --- | --- |
| [Figee 2022](https://doi.org/10.1007/s13311-022-01270-3) — Depression ITP coverage | The paper’s ITP anatomy and small clinical literature are absent as depression findings. The current ITP target view is offered in OCD/All evidence, despite the depression review discussing it. | Add a carefully qualified depression ITP evidence card and route; distinguish small exploratory evidence from established efficacy. The available local ITP volume is not a complete tract. Source: F011 PDF pp. 9–10, Inferior Thalamic Peduncle and Figure 6. |
| [Segura-Amil 2026 (online 2025)](https://doi.org/10.3171/2025.6.JNS243066) — Updated responder map and modeling | The initial six-responder map is represented; the updated map and detailed side/model results are not. The source contains seven/eight responder-count inconsistency. | Resolve the count or explicitly report the inconsistency before a separate updated-map finding. Do not infer precise geometry from the printed figure. Source: F035 PDF pp. 8–11, Figures 7–8; assets/evidence.json unresolved list. |
| [Smith, Figee & Mayberg 2025](https://doi.org/10.1093/med/9780197640654.003.0010) — Chapter beyond Figure 10.1 | SCC Figure 10.1 and core TMS concepts are linked. The chapter’s VC/VS Figure 10.2 is not a dedicated figure entry; mechanisms, safety and protocol detail are selective. | Add figure-level lineage where useful. ECT and other out-of-scope chapter sections should remain outside the four clinical tabs. Source: F074 Figure 10.1 p. 6; Figure 10.2 p. 11; TMS discussions pp. 9 and 13. |
| [Meyer 2024](https://doi.org/10.1016/j.biopsych.2023.12.010) — Symptom-specific maps | The principal OCD site findings are represented. The mood/anxiety card mostly states cohort scope, not all spatial results; source response volumes are absent. | Extract source-specific mood/anxiety associations with laterality and limits if that layer is desired; retain OCD cohort context. Source: FM008–FM012; F065 supplementary analyses. |
| [Dunlop 2016](https://doi.org/10.1038/npp.2015.292) — Distributed dmPFC effects | Caudate/ventral-striatal and thalamic changes are a selected subset of the distributed connectivity results. | Audit remaining reported clusters before adding them. Do not label a gross parcel as the exact functional cluster. Source: R2-09-1; published Results/Table 1/Figures 1–2, previous display audit. |
| [Fitzsimmons 2025](https://doi.org/10.1016/j.biopsych.2024.06.029) — Fitzsimmons full-text depth | The paper is represented, but full-text and supplement verification is incomplete. | Obtain full text/supplements for precise task-network effects and source-specific geometry. Existing abstract-supported outcome claims remain qualified. Source: R2-12-1 and R2-12-2 source review status. |
| [Baldermann 2021](https://doi.org/10.1016/j.biopsych.2021.07.010) — Review’s DBS–TMS bridge | Core pathways and nomenclature are covered. The review’s Figure 2 cortical/deep-TMS comparison is conceptually represented through other sources, not a dedicated review finding. | Add a review-level source link if useful; do not present it as an independent TMS trial. Source: F008 Figure 2; FM021–FM023; existing TMS circuit catalog. |

The updated Segura-Amil map is a known source ambiguity, not an accidentally
forgotten paper. The seven/eight responder discrepancy is already recorded in
the atlas. The initial six-responder map remains the represented analysis.

For the book chapter, **Figure 10.1 is incorporated as a source-linked SCC
tract-family reference**. That does not imply reconstruction of the pictured
patient streamlines, nor complete extraction of every other chapter section.

## Relationship-level coverage

| Disposition | Relationships |
| --- | ---: |
| Represented with qualifications | 19 |
| Not incorporated | 30 |
| Unrepresented finding in represented paper | 2 |
| Partial conceptual coverage | 1 |
| Outside scope | 17 |
| Covered through a combined ROI | 4 |
| Deferred source ambiguity | 2 |

The combined-ROI rows preserve vmPFC/OFC as the source defines it. They do not
count two independently established endpoints. Nineteen unincorporated
relationship rows come from one Hollunder preprint; they are not 19 independent
studies. Missing figures, recording roles and patient-specific geometry are
tracked separately from missing publications.

## The 20-paper expansion

| Paper | Atlas findings | Review depth / remaining limit |
| --- | --- | --- |
| [Fox 2012](https://doi.org/10.1016/j.biopsych.2012.04.028) | [R2-01-1](http://127.0.0.1:8773/?v=0.10.3#topic=all&target=overview&finding=R2-01-1), [R2-01-2](http://127.0.0.1:8773/?v=0.10.3#topic=all&target=overview&finding=R2-01-2) | Map-relevant full text reviewed. Selected map-relevant findings only; patient-specific masks, fields and all secondary results are not implied by paper-level coverage. |
| [Weigand 2018](https://doi.org/10.1016/j.biopsych.2017.10.028) | [R2-02-1](http://127.0.0.1:8773/?v=0.10.3#topic=all&target=overview&finding=R2-02-1), [R2-02-2](http://127.0.0.1:8773/?v=0.10.3#topic=all&target=overview&finding=R2-02-2) | Map-relevant full text reviewed. Selected map-relevant findings only; patient-specific masks, fields and all secondary results are not implied by paper-level coverage. |
| [Siddiqi 2020](https://doi.org/10.1176/appi.ajp.2019.19090915) | [R2-03-1](http://127.0.0.1:8773/?v=0.10.3#topic=all&target=overview&finding=R2-03-1), [R2-03-2](http://127.0.0.1:8773/?v=0.10.3#topic=all&target=overview&finding=R2-03-2) | Map-relevant full text reviewed. Selected map-relevant findings only; patient-specific masks, fields and all secondary results are not implied by paper-level coverage. |
| [Cole 2022](https://doi.org/10.1176/appi.ajp.2021.20101429) | [R2-04-1](http://127.0.0.1:8773/?v=0.10.3#topic=all&target=overview&finding=R2-04-1), [R2-04-2](http://127.0.0.1:8773/?v=0.10.3#topic=all&target=overview&finding=R2-04-2) | Map-relevant full text reviewed. Selected map-relevant findings only; patient-specific masks, fields and all secondary results are not implied by paper-level coverage. |
| [Elbau 2023](https://doi.org/10.1176/appi.ajp.20220306) | [R2-05-1](http://127.0.0.1:8773/?v=0.10.3#topic=all&target=overview&finding=R2-05-1), [R2-05-2](http://127.0.0.1:8773/?v=0.10.3#topic=all&target=overview&finding=R2-05-2) | Map-relevant full text reviewed. Selected map-relevant findings only; patient-specific masks, fields and all secondary results are not implied by paper-level coverage. |
| [Morriss 2024](https://doi.org/10.1038/s41591-023-02764-z) | [R2-06-1](http://127.0.0.1:8773/?v=0.10.3#topic=all&target=overview&finding=R2-06-1), [R2-06-2](http://127.0.0.1:8773/?v=0.10.3#topic=all&target=overview&finding=R2-06-2) | Map-relevant full text reviewed. Selected map-relevant findings only; patient-specific masks, fields and all secondary results are not implied by paper-level coverage. |
| [Taylor 2026](https://doi.org/10.1001/jamapsychiatry.2026.1100) | [R2-07-1](http://127.0.0.1:8773/?v=0.10.3#topic=all&target=overview&finding=R2-07-1), [R2-07-2](http://127.0.0.1:8773/?v=0.10.3#topic=all&target=overview&finding=R2-07-2) | Map-relevant full text reviewed. Selected map-relevant findings only; patient-specific masks, fields and all secondary results are not implied by paper-level coverage. |
| [Carmi 2019](https://doi.org/10.1176/appi.ajp.2019.18101180) | [R2-08-1](http://127.0.0.1:8773/?v=0.10.3#topic=all&target=overview&finding=R2-08-1), [R2-08-2](http://127.0.0.1:8773/?v=0.10.3#topic=all&target=overview&finding=R2-08-2) | Map-relevant full text reviewed. Selected map-relevant findings only; patient-specific masks, fields and all secondary results are not implied by paper-level coverage. |
| [Dunlop 2016](https://doi.org/10.1038/npp.2015.292) | [R2-09-1](http://127.0.0.1:8773/?v=0.10.3#topic=all&target=overview&finding=R2-09-1), [R2-09-2](http://127.0.0.1:8773/?v=0.10.3#topic=all&target=overview&finding=R2-09-2) | Map-relevant full text reviewed. Caudate/ventral-striatal and thalamic changes are a selected subset of the distributed connectivity results. |
| [Mantovani 2010](https://doi.org/10.1017/S1461145709990435) | [R2-10-1](http://127.0.0.1:8773/?v=0.10.3#topic=all&target=overview&finding=R2-10-1), [R2-10-2](http://127.0.0.1:8773/?v=0.10.3#topic=all&target=overview&finding=R2-10-2) | Map-relevant full text reviewed. Selected map-relevant findings only; patient-specific masks, fields and all secondary results are not implied by paper-level coverage. |
| [Nauczyciel 2014](https://doi.org/10.1038/tp.2014.62) | [R2-11-1](http://127.0.0.1:8773/?v=0.10.3#topic=all&target=overview&finding=R2-11-1), [R2-11-2](http://127.0.0.1:8773/?v=0.10.3#topic=all&target=overview&finding=R2-11-2) | Map-relevant full text reviewed. Selected map-relevant findings only; patient-specific masks, fields and all secondary results are not implied by paper-level coverage. |
| [Fitzsimmons 2025](https://doi.org/10.1016/j.biopsych.2024.06.029) | [R2-12-1](http://127.0.0.1:8773/?v=0.10.3#topic=all&target=overview&finding=R2-12-1), [R2-12-2](http://127.0.0.1:8773/?v=0.10.3#topic=all&target=overview&finding=R2-12-2) | Published abstract and indexed publisher methods/results reviewed; direct PDF retrieval blocked. The paper is represented, but full-text and supplement verification is incomplete. |
| [Jimenez 2025](https://doi.org/10.1016/j.transm.2025.100182) | [R2-13-1](http://127.0.0.1:8773/?v=0.10.3#topic=all&target=overview&finding=R2-13-1), [R2-13-2](http://127.0.0.1:8773/?v=0.10.3#topic=all&target=overview&finding=R2-13-2) | Map-relevant full text reviewed. Selected map-relevant findings only; patient-specific masks, fields and all secondary results are not implied by paper-level coverage. |
| [Riva-Posse 2014](https://doi.org/10.1016/j.biopsych.2014.03.029) | [R2-14-1](http://127.0.0.1:8773/?v=0.10.3#topic=all&target=overview&finding=R2-14-1), [R2-14-2](http://127.0.0.1:8773/?v=0.10.3#topic=all&target=overview&finding=R2-14-2) | Map-relevant full text reviewed. Selected map-relevant findings only; patient-specific masks, fields and all secondary results are not implied by paper-level coverage. |
| [Riva-Posse 2018](https://doi.org/10.1038/mp.2017.59) | [R2-15-1](http://127.0.0.1:8773/?v=0.10.3#topic=all&target=overview&finding=R2-15-1), [R2-15-2](http://127.0.0.1:8773/?v=0.10.3#topic=all&target=overview&finding=R2-15-2) | Map-relevant full text reviewed. Selected map-relevant findings only; patient-specific masks, fields and all secondary results are not implied by paper-level coverage. |
| [Coenen 2019](https://doi.org/10.1038/s41386-019-0369-9) | [R2-16-1](http://127.0.0.1:8773/?v=0.10.3#topic=all&target=overview&finding=R2-16-1), [R2-16-2](http://127.0.0.1:8773/?v=0.10.3#topic=all&target=overview&finding=R2-16-2) | Map-relevant full text reviewed. Selected map-relevant findings only; patient-specific masks, fields and all secondary results are not implied by paper-level coverage. |
| [Bergfeld 2016](https://doi.org/10.1001/jamapsychiatry.2016.0152) | [R2-17-1](http://127.0.0.1:8773/?v=0.10.3#topic=all&target=overview&finding=R2-17-1), [R2-17-2](http://127.0.0.1:8773/?v=0.10.3#topic=all&target=overview&finding=R2-17-2) | Map-relevant full text reviewed. Selected map-relevant findings only; patient-specific masks, fields and all secondary results are not implied by paper-level coverage. |
| [Li 2020](https://doi.org/10.1038/s41467-020-16734-3) | [R2-18-1](http://127.0.0.1:8773/?v=0.10.3#topic=all&target=overview&finding=R2-18-1), [R2-18-2](http://127.0.0.1:8773/?v=0.10.3#topic=all&target=overview&finding=R2-18-2) | Map-relevant full text reviewed. Selected map-relevant findings only; patient-specific masks, fields and all secondary results are not implied by paper-level coverage. |
| [Tyagi 2019](https://doi.org/10.1016/j.biopsych.2019.01.017) | [R2-19-1](http://127.0.0.1:8773/?v=0.10.3#topic=all&target=overview&finding=R2-19-1), [R2-19-3](http://127.0.0.1:8773/?v=0.10.3#topic=all&target=overview&finding=R2-19-3), [R2-19-2](http://127.0.0.1:8773/?v=0.10.3#topic=all&target=overview&finding=R2-19-2) | Map-relevant full text reviewed. Selected map-relevant findings only; patient-specific masks, fields and all secondary results are not implied by paper-level coverage. |
| [Van Bogaert 2026](https://doi.org/10.1016/j.bpsgos.2025.100609) | [R2-20-1](http://127.0.0.1:8773/?v=0.10.3#topic=all&target=overview&finding=R2-20-1), [R2-20-2](http://127.0.0.1:8773/?v=0.10.3#topic=all&target=overview&finding=R2-20-2) | Map-relevant full text reviewed. Selected map-relevant findings only; patient-specific masks, fields and all secondary results are not implied by paper-level coverage. |

## All 33 in-scope annotated cards not yet incorporated

These rows are a backlog, not newly verified clinical claims. Unless a fresh
check is explicitly recorded in the crosswalk, the access depth and summary
come from the supplied Handoff snapshot. “Full text retrieved” in that snapshot
does not mean the full text was supplied in this local folder or re-reviewed now.

| Supplied publication | Priority | Supplied extraction basis |
| --- | --- | --- |
| [Deep brain stimulation of the nucleus accumbens for treatment-refractory obsessive-compulsive disorder.](https://doi.org/10.1001/archgenpsychiatry.2010.122) | Medium | Abstract |
| [Targets for Deep Brain Stimulation in Obsessive-Compulsive Disorder](https://doi.org/10.3928/00485713-20100924-06) | Unranked | Title and Crossref metadata |
| [Update on repetitive transcranial magnetic stimulation in obsessive-compulsive disorder: different targets.](https://doi.org/10.1007/s11920-011-0205-3) | Low, historical | Abstract; target details require full text |
| [Current status of deep brain stimulation for obsessive-compulsive disorder: a clinical review of different targets.](https://doi.org/10.1007/s11920-011-0200-8) | Unranked | Abstract |
| [Top-down-directed synchrony from medial frontal cortex to nucleus accumbens during reward anticipation.](https://doi.org/10.1002/hbm.21195) | Unranked | Abstract |
| [Deep brain stimulation targeted at the nucleus accumbens decreases the potential for pathologic network communication.](https://doi.org/10.1016/j.biopsych.2013.03.012) | Medium, access needed | Title and metadata |
| [Deep brain stimulation induces striatal dopamine release in obsessive-compulsive disorder.](https://doi.org/10.1016/j.biopsych.2013.06.021) | Medium | Abstract |
| [Clinical Outcome and Mechanisms of Deep Brain Stimulation for Obsessive-Compulsive Disorder.](https://doi.org/10.1007/s40473-015-0036-3) | Unranked | Full text |
| [Deep Brain Stimulation Diminishes Cross-Frequency Coupling in Obsessive-Compulsive Disorder.](https://doi.org/10.1016/j.biopsych.2015.05.021) | Medium, access needed | Title and metadata |
| [Deep brain stimulation modulates directional limbic connectivity in obsessive-compulsive disorder.](https://doi.org/10.1093/brain/awaa100) | High | Full text, Results and connectivity models |
| [Long-term deep brain stimulation of the ventral anterior limb of the internal capsule for treatment-resistant depression.](https://doi.org/10.1136/jnnp-2019-321758) | Medium | Abstract |
| [Efficacy of Deep Brain Stimulation of the Ventral Anterior Limb of the Internal Capsule for Refractory Obsessive-Compulsive Disorder: A Clinical Cohort of 70 Patients.](https://doi.org/10.1176/appi.ajp.2019.19060656) | Medium | Abstract |
| [Long-term Outcome of Deep Brain Stimulation of the Ventral Part of the Anterior Limb of the Internal Capsule in a Cohort of 50 Patients With Treatment-Refractory Obsessive-Compulsive Disorder.](https://doi.org/10.1016/j.biopsych.2020.08.018) | Medium | Abstract |
| [Deep brain stimulation response in obsessive-compulsive disorder is associated with preoperative nucleus accumbens volume.](https://doi.org/10.1016/j.nicl.2021.102640) | Unranked | Full text |
| [Deep Brain Stimulation for Obsessive-Compulsive Disorder: Why Anatomy Matters.](https://doi.org/10.1016/j.biopsych.2021.06.011) | Unranked | Title and bibliographic record |
| [Toward Personalized Deep Brain Stimulation for Obsessive-Compulsive Disorder.](https://doi.org/10.1016/j.bpsc.2023.01.004) | Unranked | Full text |
| [Acute effects of deep brain stimulation on brain function in obsessive-compulsive disorder.](https://doi.org/10.1016/j.clinph.2022.12.012) | Unranked | Abstract |
| [Patient specific intracranial neural signatures of obsessions and compulsions in the ventral striatum.](https://doi.org/10.1088/1741-2552/acbee1) | Unranked | Abstract |
| [Cingulate dynamics track depression recovery with deep brain stimulation.](https://doi.org/10.1038/s41586-023-06541-3) | High | Full text |
| [Whole brain network effects of subcallosal cingulate deep brain stimulation for treatment-resistant depression.](https://doi.org/10.1038/s41380-023-02306-6) | High | Full text, Results |
| [Neural Interoceptive Processing Is Modulated by Deep Brain Stimulation to Subcallosal Cingulate Cortex for Treatment-Resistant Depression.](https://doi.org/10.1016/j.bpsc.2024.11.021) | Medium | Full text |
| [Intracranial electrophysiological biomarkers of compulsivity in obsessive-compulsive disorder.](https://doi.org/10.1038/s44220-025-00457-9) | High | Full text |
| [A Multi-Symptom Circuit Architecture of Obsessive-Compulsive Disorder.](https://doi.org/10.64898/2025.12.14.25342121) | High, provisional | Full text, symptom-response Results; Figures 3–7 |
| [Revisiting subcallosal cingulate deep brain stimulation for depression: Long-term safety and effectiveness outcomes from a pooled analysis of 172 implanted patients.](https://doi.org/10.1016/j.brs.2025.08.017) | High, correction needed | Abstract |
| [Longitudinal Changes in Cortical Response Dynamics with Deep Brain Stimulation to the Subcallosal Cingulate for Treatment-Resistant Depression.](https://doi.org/10.1101/2025.11.26.690543) | Unranked | Abstract |
| [Dopamine and serotonin transients predict depressive symptom relief following deep brain stimulation of human subcallosal cingulate cortex.](https://doi.org/10.64898/2025.11.28.691184) | Unranked | Abstract |
| [Globus pallidus externus (GPe) alpha band activity decreases after deep brain stimulation in clinically responsive obsessive-compulsive disorder patients.](https://doi.org/10.64898/2026.04.10.26350428) | Medium, version check | Abstract; linked journal metadata |
| [Globus pallidus externus (GPe) alpha band activity decreases after deep brain stimulation in clinically responsive obsessive-compulsive disorder patients](https://doi.org/10.1016/j.neurom.2026.09.006) | Medium, version check | Crossref author/title/DOI metadata |
| [Common Electrophysiology Biomarkers Collected at Home Robustly Track Depression Recovery With Deep Brain Stimulation.](https://doi.org/10.64898/2026.04.13.26350107) | Unranked | Abstract |
| [The neurobiological synergy of transcranial magnetic stimulation and mindfulness-based interventions in treatment-resistant depression: a narrative review.](https://doi.org/10.3389/fpsyt.2026.1805825) | Low, contextual | Full text |
| [[Transcranial magnetic stimulation in obsessive compulsive disorder: a systematic review].](https://pubmed.ncbi.nlm.nih.gov/29077137/) | Low, historical | Abstract |
| [TREATING OBSESSIVE-COMPULSIVE DISORDER WITH TRANSCRANIAL MAGNETIC STIMULATION USING INDIVIDUALIZED TRACTOGRAPHY-GUIDED TARGETING](https://doi.org/10.1016/j.transm.2024.100063) | Low, access needed | Crossref metadata |
| [Combining Intensive Exposure and Response Prevention Therapy With Accelerated Transcranial Magnetic Stimulation to Treat Patients With Severe Obsessive-Compulsive Disorder](https://doi.org/10.1016/j.transm.2025.100133) | Low, access needed | Crossref metadata |

## Files, versions and exclusions

- The 64 original inventory files and 7 Round 2 files all match their earlier
  SHA-256 records. Originals were not modified or copied into the repository.
- `F061` is byte-identical to Figee supplement `F053`; it is not the Liebrand
  article despite its filename. The correct article has an external source link.
- `F032/F063/F064` are the same Meyer study family. `F064` is manuscript text,
  not a separate scientific supplement. `F065` is the relevant supplement.
- `F035/F041/F043` are versions of Segura-Amil; `F034/F042` are identical
  supplements. Figure tiles and repeated JPEGs are not extra papers.
- `F019–F022` are disclosure forms. `F023` renders only an XFA compatibility
  message; no scientific content was inferred from it.
- `F076` is a book container. The relevant supplied chapter occupies PDF
  pp. 58–65; the other chapters are not silently counted as missing evidence.
- Taylor's supplied correction is already acknowledged; protocol and
  data-sharing supplements are not independent studies. The old Round 2
  manifest omitted the later-added third Tyagi finding from its ID list;
  this audit refreshes that manifest without changing the finding itself.
- Figee's 2014 addendum is integrated under the 2013 source and is not counted
  as a replication. Other preprint/journal and corrigendum relationships are
  retained in the crosswalk; cohort overlap is not fully resolved.

## Method and limits

1. Enumerated all 71 supplied files and verified existing hashes. Read file
   identities, the complete structured Handoff inventory and all 54 annotated
   cards; reused unchanged PDF/text extractions and inspected relevant source
   sections and disclosure/form renders where identity mattered.
2. Matched source IDs/DOIs and the explicit Figee addendum relationship against
   the 32-source atlas. Manually reviewed dispositions for all 75 relationships,
   28 figures and 14 roles. Shared anatomy alone never counted as a source match.
3. Crosswalked all 76 current findings to source locations, laterality and the
   saved v0.10.3 live display audit. That audit supplies observed geometry; this
   pass did not rerun the previous spatial registration checks.
4. Checked primary records for the six leading absent sources and the Himes
   correction. Review depth varies and is recorded per row. The other absent
   publications remain at supplied metadata/card screening depth.
5. Checked unique IDs, complete inventories, all referenced finding/source IDs,
   source hashes, browser report filters and finding links; ran the existing
   45 regression groups, syntax checks and citation checks.

This is not a new exhaustive literature search, a fresh full-text reading of
231 papers, a source-mask validation, or a clinical targeting recommendation.
The app remains **v0.10.3 with 76 findings**. The new deliverables are this report,
the searchable crosswalk and its structured data; they make the omissions explicit.

Related reports: [citation audit](CITATION-AUDIT-v0.10.2.md),
[evidence/display agreement](DISPLAY-QA-v0.10.3.md),
[public pathway data](PUBLIC-DATA-AUDIT-v0.10.md).
