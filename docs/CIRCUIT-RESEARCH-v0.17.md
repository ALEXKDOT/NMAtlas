# Circuit research · v0.17.0

Reviewed 15 October 2026. The supplied full-text PDFs add ten findings from two
sources, bringing the atlas to 104 findings and 41 sources. Eight guided lessons
now contain 32 steps. Existing findings, coordinates and geometry are retained.

## Sources and scope

**Johnson et al. (Cell, 2026), “Fronto-insular circuit mechanisms of accelerated
intermittent theta burst stimulation.”**
[Publication](https://doi.org/10.1016/j.cell.2026.04.030) ·
[PubMed 42102818](https://pubmed.ncbi.nlm.nih.gov/42102818/).

- `R5-J-PLASTICITY`: mouse prelimbic optogenetic aiTBS and cell-type-specific
  plasticity (Figure 2). Optical stimulation is not human magnetic stimulation.
- `R5-J-CAUSAL`: mouse insula inhibition and projection-specific stimulation
  support necessity/sufficiency in the studied behavioral assays (Figure 5).
- `R5-J-EVOKED`: prefrontal TMS evokes intracranial responses in ten epilepsy
  patients (Figure 6A–E; regional samples 8–10, five patients overlap a prior
  report). These 0.5-Hz probe pulses were not an aiTBS efficacy trial.
- `R5-J-RESPONSE`: baseline DLPFC–insula connectivity relates to improvement in
  51 open-label aiTBS patients (Figure 6F–J). The correlations are exploratory,
  without sham control or external predictive validation.
- `R5-J-CHANGE`: the pre/post connectivity decrease did **not** survive whole-brain
  multiple-comparison correction (STAR Methods and Figure S9).

Main text and figure/method labels differ in anterior/posterior insular wording;
whole-insula orientation is used, without assigning the disputed subregion.
Whole-brain feature rankings are omitted because the text and figure wording
also differ. Mouse PL is not treated as an exact human DLPFC homologue.

**Ji et al. (Nature Communications 17, 1176, 2026), “Distinct antidepressant
therapies act on a common brain network.”**
[Publication](https://doi.org/10.1038/s41467-025-67945-5) ·
[PubMed 41484145](https://pubmed.ncbi.nlm.nih.gov/41484145/).
The DOI contains 2025; the publication year is 2026.

- `R5-D-NETWORK`: treatment-associated gray-matter increases from 16 experiments
  in 15 studies (533 depression participants; 169 controls) converge through a
  652-person healthy normative connectome. Bilateral amygdala hubs seed the DTN
  (Figures 2–3). Discovery includes ECT, medication and MST, not DBS or rTMS.
- `R5-D-VALIDATION`: independent literature and ECT datasets support network
  resemblance (Figure 4); this is spatial validation, not validated clinical
  prediction or proof of mediation.
- `R5-D-ECS`: bilateral basolateral-amygdala inactivation attenuates an ECS
  behavioral effect in rats (Figure 5; nine analyzed per arm). This does not
  identify a human amygdala stimulation target.
- `R5-D-TARGETS`: 11 previously reported DBS sites connect positively and 13 rTMS
  sites negatively to the DTN (Figure 7a). These are literature sites, not new
  trial participants; connectivity sign is not excitation/inhibition.
- `R5-D-RESPONSE`: DTN connectivity change correlates with HAMD-17 change in a
  retrospective 24-person rTMS dataset (Figure 7b; partial r=0.56, P=0.016).
  This is a change–change association, not baseline prediction or randomized
  DTN-guided treatment. The Results text calls this panel 7c; the figure is 7b.

Genetic, receptor and cognitive spatial annotations are outside this update's
neuromodulation focus; no drug-selection or individual treatment recommendation
is inferred. The article and embedded figures/methods were reviewed; a separate
Ji supplement was not independently reviewed.

## Finding and learning views

Targets → **Mechanism & network research** contains **Fronto-insular mechanism**
and **Amygdala-linked depression network**. These are paper-specific views,
separate from Taylor's convergent circuit and the BRIGhTMIND targeting trial.
Johnson findings are also available under DLPFC. Topic filters distinguish Ji's
rTMS-only association from findings relevant to broader depression research.

Each new card provides the study population, finding-specific design, an upfront
qualification, full interpretation limits, and a figure/page locator. The
publication and full text remain linked online. Original local PDFs are not
redistributed. New lessons progress through animal and human evidence with
explicit transitions and source-linked conceptual diagrams.

## Spatial boundaries

No new study coordinates, tractograms, target masks or electric fields are added.
Human DLPFC, insula, amygdala and hippocampus surfaces provide broad anatomical
orientation only. No human anatomy is highlighted for the animal-only records
or lesson steps. Functional associations do not generate anatomical fibers.

Johnson's data statement did not provide a reusable study connectivity volume
or electrode geometry suitable for this atlas. Ji's author repository provides
[DTN.nii](https://github.com/jigongjun/Depression-therapeutic-network), linked from
the evidence cards. This release does not render or redistribute a derivative.
The repository had no separate data license; the article is CC BY-NC-ND 4.0.
The visible whole amygdala is not the derived amygdala hub cluster or DTN mask.

## Verification

The machine-readable [source audit](round5-source-review-v0.17.json) records
source-file hashes, publication metadata, page/figure locators and limitations.
Regression checks cover paper-specific membership, source references, laterality,
clearing unrelated maps, animal/human separation, and omission of inferred fibers.
Validation passed: 53 atlas regression groups, 13 teaching groups, five curation
groups, ten workspace groups, and citation checks for all 104 findings and 41
sources. Encrypted-distribution checks round-tripped all 278 bundled files and
rejected wrong passwords and tampering. Browser checks covered both new evidence
views, expanded limitations, human/animal lesson transitions, selected-node source
links, reference anatomy rendering and research/lesson navigation. The prior 94
findings and 39 source records are semantically unchanged.
