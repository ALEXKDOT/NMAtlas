# Current interpretation and historical context · v0.14.0

Reviewed 2026-10-02. This release addresses the pre-2020 relevance QA and the
prominence of legacy contact hardware. It adds an editorial synthesis over the
existing source archive. It does not reclassify studies solely by publication year.

## Result

- Every clinical target has a concise current interpretation and main uncertainty,
  with expandable supporting citations. The all-topic anatomy views display the
  corresponding clinical interpretations separately.
- Findings are grouped by study or related study family. Controlled comparisons
  remain prominent. Source filtering, searching and old finding links retain all
  94 original records from 39 clinical sources.
- Known participant overlap is explicit for SCC follow-up and the Li/Tyagi/Meyer
  studies. Unknown overlap is described as unknown, rather than assuming either
  independence or identical participants.
- Figee's artifact-controlled reanalysis precedes the original connectivity
  analysis. The latter is under “Original analysis before artifact controls.”
- Machado and Tsai are optional **Historical contact examples**, with a visible
  legacy-hardware explanation and a return to current teaching. Machado's
  speculative circuit explanation is no longer rendered beside the cluster map.
  The original interpretation is retained in the historical source record.
- The 7-mm specification remains only in historical methods and the optional
  source archive. It never computes atlas geometry, a modern lead, or a tract
  assignment. Pooled AC-relative cluster coordinates remain separate from MNI
  atlas anatomy.
- The depression-TMS lesson now includes Elbau's qualification, the differing
  Taylor/Morriss targeting comparisons, and the distinction between Cole's
  treatment-package trial and a test of targeting alone.
- The pre-SMA lesson includes Mantovani's inconclusive categorical comparison
  and Fitzsimmons' lack of clinical superiority over an active comparator with
  exposure therapy. Neither is treated as a like-for-like reversal of Ji.
- The OCD DBS lesson qualifies Tyagi's six-person example and connects it to
  newer response-mapping/tractography work without transferring the old contact
  observations to new hardware.
- The SCC lesson pairs the negative blinded result with Himes' later pooled
  observations and shared cohorts. It does not present recency as resolving the
  difference between trial and follow-up results.

## Disposition of older evidence

| Source | Editorial action |
| --- | --- |
| Machado 2009; Tsai 2014 | Optional historical examples; no current hardware or contact-to-pathway rule. |
| Fox 2012; Weigand 2018 | Retained foundations, qualified by Elbau and newer method-specific randomized comparisons in the main lesson and target summaries. |
| Salomons 2014 | Retained open-label mechanism context; the larger negative Dunlop 2020 depression trial is in the dmPFC summary. |
| Carmi 2019 | Remains a clinical anchor for the tested H7 protocol; circuit selectivity is not inferred. |
| Mantovani 2010 | Inconclusive categorical response contrast and later protocol differences are explicit. |
| Dunlop 2016 | Exploratory OCD connectivity evidence; not controlled efficacy or validation of H7. |
| Nauczyciel 2014 | Inconclusive clinical result separated from bilateral metabolic effects; Jimenez's newer single case does not supersede it. |
| Figee 2013 / 2014 addendum | Corrected right-seed interpretation first; nonsignificant left-seed results visible; original analysis optional, not extra replication. |
| Van den Munckhof 2013 | Retained historical NAc/vALIC localization clarification; unresolved cohort overlap stated. |
| Tyagi 2019 | Small study-specific network comparison; grouped with partly overlapping response-mapping cohorts. |
| Liebrand 2019; Coenen 2019 | Investigational associations, debated naming and gateway-trial limits visible; no universal antidepressant tract claim. |
| Riva-Posse 2014 / 2018 | Targeting observations connected to controlled outcomes and follow-up; no implied causal proof. |
| Holtzheimer 2017; Dougherty 2015 | Negative blinded comparisons retain prominence. |
| Bergfeld 2016 | Post-optimization crossover made explicit; same-cohort 2022 naturalistic follow-up linked without a new independent outcome card. |
| Smolders 2013; Bahramisharif 2016; Widge 2016 | Optional early research with sample, diagnosis, OFF-interval and overlap qualifications. |
| Strafella 2001; Lehéricy 2004; Aron 2007 | Retained for downstream physiology/anatomical rationale, not clinical efficacy. |
| Older anatomical templates / tract atlases | Retained as reference anatomy; no age-based rejection or claim of patient-level targeting accuracy. |

## Source and implementation provenance

`evidence-context.mjs` contains the current interpretations, source roles and
grouping rules. Citations resolve against the existing clinical and anatomical
source catalogs. `teaching-catalog.mjs` holds the revised lesson claims and source
locators; the versioned teaching crosswalk records the resulting 24 steps.

No finding text, finding ID, published coordinate, tract asset, target surface or
original reference file was changed. The only additional publication link is
[Bergfeld 2022](https://pubmed.ncbi.nlm.nih.gov/35772671/), a naturalistic follow-up
of the original vALIC cohort. Its published abstract was checked during the QA;
no new detailed outcome claim or geometry was imported.

The QA's newer OFC comparisons were not added as evidence cards on the basis of
abstract-only access. Khedr 2022 and Ziblak 2021 need full-text verification before
any detailed protocol or outcome incorporation. The current OFC synthesis is
limited to the already-reviewed Nauczyciel and Jimenez evidence and explicitly
does not purport to be a complete current systematic review.

Editorial priorities reflect relevance, study design and interpretive limits,
not a formal quantitative evidence grade. The atlas remains an educational
reference, with no patient-specific electrode or activation-field reconstruction.

## Verification

- JavaScript syntax checks and 52 atlas regression groups pass.
- Citation verification passes for 39 source identities, 94 findings and 13
  checked coordinates (eight displayed markers).
- Nine teaching regression groups pass across six lessons / 24 steps, including
  unchanged Seguin alternatives and historical contact coordinates.
- Five curation regression groups verify complete record preservation, filtered
  record access, corrected-analysis ordering, retained controlled trials,
  shared-cohort grouping, summary source resolution and revised lesson citations.
- Browser checks: all 48 clinical/anatomy target views have current interpretations;
  revised DLPFC and pre-SMA lessons; historical-entry presentation and return link; corrected Figee
  order; old original-analysis link; SCC grouping; hidden-by-default Machado
  hardware finding; search, selection and reload of its saved link.
- The full finding objects are unchanged against the preceding commit.

See `teaching-review-v0.14.json` for the lesson claim/source crosswalk and
`verification-v0.14.json` for the completed browser and automated checks.
