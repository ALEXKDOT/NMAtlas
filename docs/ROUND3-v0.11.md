# Round 3 incorporation · v0.11.0

> **v0.11.1 display update:** Removed the five planning ROI markers and their associated labels/legend entries. The regional findings remain shaded; the coordinates are retained in collapsed source details. Eight published markers remain available for treatment, control and existing connectivity references. The report below records the original v0.11.0 incorporation.

Reviewed 1 October 2026. At v0.11.0, the atlas contained **88 findings from 37 sources** and **13 published coordinate markers**. This release adds 12 findings, revises two existing findings, and adds eight coordinates. All five supplied article families contribute substantive evidence. Widge 2016 is an additional public primary source qualifying the cross-frequency-coupling result.

The earlier [literature crosswalk](LITERATURE-COVERAGE-v0.10.3.md) remains a historical snapshot. This release resolves the five Round 3 acquisition priorities; it does not complete the wider Handoff backlog or a systematic review of all neuromodulation literature. Counts of sources and findings are not counts of independent trials or participants.

## What each article contributes

| Article | Incorporated contribution | Finding IDs | Where to explore |
|---|---|---|---|
| [Fitzsimmons 2025](https://doi.org/10.1016/j.biopsych.2024.06.029) | Clinical denominators and active-control qualification; planning effects in right DLPFC, bilateral inferior parietal cortex/precuneus and right insula; separate within-arm symptom associations; weak pre-SMA associations and null Bayesian ROI contrasts; treatment and analysis coordinates | R2-12-1, R2-12-2 (revised); R3-FITZ-TARGETS, R3-FITZ-PLANNING, R3-FITZ-PRESMA | OCD TMS → DLPFC or pre-SMA → Fitzsimmons |
| [Imtiaz 2026](https://doi.org/10.1016/j.neurom.2026.09.006) | ALIC stimulation versus GPe sensing; periodic alpha changes, side-specific statistical qualification, and preliminary longitudinal symptom association | R3-GPE-PLACEMENT, R3-GPE-ALPHA, R3-GPE-CLINICAL | OCD DBS → GPe or ALIC |
| [Himes 2025](https://doi.org/10.1016/j.brs.2025.08.017) | SCC observed-case response/remission with denominators, attrition and overlapping cohorts, pooled safety counts; authorship correction | R3-HIMES-OUTCOMES, R3-HIMES-RETENTION, R3-HIMES-SAFETY | Depression DBS → SCC |
| [Smolders 2013](https://doi.org/10.1016/j.biopsych.2013.03.012) | Frontal scalp theta phase preservation, distinguished from power and from a localized cortical/tract mechanism | R3-SMOLDERS-EEG | OCD DBS → NAc or ALIC |
| [Bahramisharif 2016](https://doi.org/10.1016/j.biopsych.2015.05.021) | Midoccipital scalp cross-frequency coupling in seven OCD responders; stimulation and recording locations kept separate | R3-BAHRAMI-CFC | OCD DBS → ALIC or VC/VS |
| [Widge 2016](https://doi.org/10.1016/j.biopsych.2015.10.029) | Qualified negative replication: five participants, four depression and one OCD, with a shorter OFF interval | R3-WIDGE-CFC | OCD or depression DBS → VC/VS |

## Supplied-file crosswalk

The nine originals were read without modification. Their relative filenames, SHA-256 hashes, source identities, reviewed findings and coordinate locations are recorded in [the machine-readable review](round3-citation-review-v0.11.json). PDFs and office supplements are linked from the relevant cards through the private local manifest; the originals are not redistributed in Git.

| Asset | Review and use |
|---|---|
| R3F01 · Bahramisharif main PDF | Both pages; methods, results and Figure 1. Year label follows the 2016 issue, with a 2015 online DOI. |
| R3F02 · Fitzsimmons main PDF | Clinical methods/results and Tables 1–2; Figure 1 treatment coordinates on PDF page 3; planning Figures 4–5 on PDF page 8. |
| R3F03 · Fitzsimmons XLSX | Key Resources Table reviewed and linked. It describes resources/software, not individual targets, masks or tractography. The template instruction/example sheets are not study data. |
| R3F04 · Fitzsimmons 39-page supplement | Target-selection methods on page 4; Table S2 ROI centers/radii on page 14; planning estimates in Table S11 on page 23; inhibition/error estimates in Tables S13–S14 on pages 25–26. Exploratory whole-brain results were assessed for scope, but not reconstructed as effect maps. |
| R3F05 · GPe journal pre-proof | Main methods/results, figures, and embedded Supplemental Tables 1–2 / Figures 1–3 on pages 15–19. Accepted 14 September 2026; not the definitive version of record. The earlier preprint is linked as the same study. |
| R3F06 · Himes main/extended PDF | Main nine-page article plus appended correction. Outcome denominators checked against Figure 1 on page 4; safety section 3.5 on page 5; attrition on page 6. |
| R3F07 · Himes DOCX | Supplementary figures SF1–SF8 and captions. SF1 visually checked for later time points and shrinking denominators; SF2–SF5 provide sensitivity analyses. No new causal claim is inferred from extension curves. |
| R3F08 · Himes correction PDF | Restores omitted author Keyoumars Ashkan. This is an authorship correction, not a change to the clinical results. |
| R3F09 · Smolders main PDF | Both pages; frontal FCz component, phase-preservation measure, power comparison, and ON-then-OFF design. |

The Bahramisharif authors’ reply is linked as an indexed citation. Its full text was not supplied or reviewed; the atlas makes no claims about its argument.

## Evidence-to-display decisions

- **Stimulation versus effects:** the Fitzsimmons planning finding highlights right DLPFC, bilateral inferior parietal cortex/precuneus and right insula. Its left stimulation target is described separately. Only the stronger planning contrasts are summarized in that highlight. The left-DLPFC/left-insula contrasts had moderate evidence, while caudate contrasts did not meet the strong threshold.
- **Associations versus between-arm effects:** the right-insula within-arm symptom association is an increase with improvement, despite the relative reduction in the DLPFC-versus-vertex contrast. These are separate cards. The pre-SMA error associations are explicitly weak; uncorrected exploratory whole-brain contrasts are not treated as validated response maps.
- **Coordinate roles:** one DLPFC group mean, one actually used pre-SMA fallback, one vertex control, and five planning ROI centers are added. Their colors, legends and hover descriptions distinguish roles. The adjacent pre-SMA group mean remains in text to avoid a nearly overlapping marker. The unused DLPFC fallback is not plotted.
- **Regional boundaries:** available whole cortical parcels orient the findings. Purple dots mark published ROI centers; they do not claim to reconstruct the ROI spheres, activation peaks, individual targets or electric fields. The right/left insula parcels are broader than anterior-insula ROIs.
- **GPe:** bilateral surfaces identify where LFPs were recorded. They do not claim separately significant effects in both hemispheres. Ten participants supplied twenty hemispheric observations. ALIC remains the therapeutic stimulation region. AC-relative patient contact coordinates are not interpreted as MNI coordinates.
- **SCC:** long-term follow-up is shown beside the existing negative controlled SCC and VC/VS trials. BROADEN and Emory overlap with existing atlas publications. Observed-case response percentages carry their changing denominators and the ≥50% MADRS criterion; the original BROADEN criterion differs.
- **Scalp EEG:** frontal and occipital scalp results do not identify a cortical generator. The atlas therefore highlights the treatment context without inventing a cortical source or connecting tract. Widge’s mixed sample and shorter OFF interval prevent treating it as an exact OCD replication.

## Remaining limits and source inconsistencies

No new individual MRI volumes, registered electrode coordinates, tractograms, target masks or stimulation fields were supplied. The GPe table uses patient AC-relative coordinates, so a valid transformation and individual reference images would be needed before plotting contacts. Fitzsimmons’ published coordinates permit points and anatomical context, not reconstruction of individual treatment distributions or thresholded group maps.

The GPe pre-proof reports sensitivity of 89.9% with eight true positives and one false negative; that count gives 88.9%. The atlas omits the sensitivity/ROC performance claim. Himes reports a suicide rate that differs from a simple calculation using its stated count and patient-years; raw event counts and reported exposure are retained without substituting a recalculated rate. These discrepancies need source clarification if those derived metrics are to be used.

Other in-scope Handoff contributions remain in the historical backlog. The two previously abstract-only TMS records not supplied in Round 3 remain at their prior review level. The new files do not supply the missing study-specific pathway geometry.

## Verification

- JavaScript syntax checks, all **50 regression groups**, and citation checks passed: 37 source identities, 88 reviewed finding references and all 13 coordinate markers.
- All **14 new or revised cards** were selected through the live interface. The resulting highlights, context surfaces and marker sets matched their intended roles; no atlas loading errors were reported.
- Checked the desktop columns and narrow stacked layout, source filtering, medial hemisphere behavior, SCC landmarks and coordinate legends. With floating labels hidden, hovering the DLPFC mean and vertex control showed their distinct explanations while the markers remained visible.
- The hover check caught and corrected a second point-color path in the SVG label connectors, so these dots now match the 3D markers and legend.
- All **nine source downloads** returned the original bytes with the correct file types. Temporary-fixture tests verified allowlist refresh, office-file download disposition and rejection of missing/private/traversal routes. All nine original source hashes remained unchanged.
- This is targeted verification of the new release, not a rerun of the historical 200-selection display audit. The earlier QA documents retain their version-specific scope.
