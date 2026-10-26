# Atlas citation audit · v0.10.2

Reviewed 1 October 2026. All **76 rendered finding cards and 32 clinical source
records** were included. Corrections are incorporated in the atlas.

## Scope and result

- Matched all **31 clinical PubMed IDs to their DOIs** using Europe PMC/PubMed
  metadata, with Crossref corroboration where available. The remaining source is
  the Smith, Figee and Mayberg book chapter, checked against the supplied PDF.
- Checked citation support for 71 findings in relevant full-text sections,
  figures or tables, using supplied PDFs, public articles and previously cached
  article text. Five findings remain supported at published-abstract level.
- Scraped all 76 cards from the live **All evidence** view. Checked five coordinate
  markers, 18 figure/table records, seven cortical layers, 13 TMS circuit profiles,
  48 anatomy hover entries, six original tract hover entries, 13 public pathway
  families, two functional maps, and anatomical dataset attributions.
- The initial HTTP check covered **107 unique URLs**: 92 returned 2xx/3xx and
  15 returned 403; none returned 404. This is a transport snapshot, **not** proof
  that 92 full texts were readable. Cookie and anti-bot pages can return 200.
- No mismatched clinical DOI/PubMed pair or unresolved source ID was found.
  Indexed correction notices for Figee and Taylor were already incorporated.
  Commentaries and preprint relationships were not treated as errata.

The [per-record audit](citation-audit-v0.10.2.json) records all 76 findings,
bibliographic identities, review bases, coordinates, figure locations and the
initial URL check. It contains no source PDFs or personal file paths.

## Corrected references

| Atlas entry | Previous reference | Correct reference |
| --- | --- | --- |
| SCC four-bundle synthesis, FM026 | Chapter Figure 10.2, PDF p. 11 | **Figure 10.1, PDF p. 6**; four-bundle discussion p. 7. Figure 10.2 concerns VC/VS. The card now has a direct chapter link. |
| Meyer independent validation, FM011 | Figure 3, PDF p. 7 | **Figure 4B, PDF p. 8**; Results paragraph p. 5. Figure 3 concerns depression/anxiety symptoms. |
| Fox candidate target markers | Figure 3A/B without qualification | **Figure 3C/D target maps**, with the actual Results heading, “Identification of optimized TMS targets.” |
| Dunlop 2016 outcome/connectivity card, R2-09-1 | Figures 2–3 | **Figures 1–2**. The article has only two main figures. |
| Jiménez follow-up, R2-13-2 | Figure 1B | **Figure 1C–D** for outcomes; 1B for dosage. |
| Segura-Amil dACC limitation, FM006 | Discussion “opening paragraph” | Discussion on **PDF p. 11**; the opening is earlier. |

The corresponding Meyer and chapter figure-registry entries were corrected too.
The obsolete Meyer Figure 3 standalone-image association was removed from the
validation record. Liebrand's supplemental figure is correctly described as
DOCX material rather than a PDF figure.

Fox requires a qualification: the manuscript's prose itself refers to A/B beside
the two target coordinates. Its actual image and caption show seeds in A/B and
target maps in C/D. The revised atlas identifies the visual panels explicitly;
the coordinates themselves were already correct. See the
[original figure and caption](https://pmc.ncbi.nlm.nih.gov/articles/PMC4120275/figure/F3/).

Other corrections are supported by the supplied chapter/Meyer PDFs and the
[Dunlop article](https://pmc.ncbi.nlm.nih.gov/articles/PMC4793124/),
[Jiménez article](https://pmc.ncbi.nlm.nih.gov/articles/PMC12440150/) and
[Segura-Amil publication](https://doi.org/10.3171/2025.6.JNS243066).

## Bibliography and traceability cleanup

Nine paraphrased titles were replaced with published article titles: Fox,
Weigand, Cole, Taylor, Carmi, Mantovani, Fitzsimmons, Riva-Posse 2014 and Bergfeld.
Short author/year labels are retained. Online versus issue-year differences
(including Fitzsimmons, Segura-Amil and Van Bogaert) were checked, not treated
automatically as citation errors.

The [Mantovani publisher HTML](https://academic.oup.com/ijnp/article/13/2/217/663177)
supports both findings, including bilateral pre-SMA placement and the
non-significant completer response comparison. Its full-text link now opens that
article. Unverified PDF page references were replaced with named HTML sections.

The Fitzsimmons review records already acknowledged limited access. That limit
is retained; its two locators now point specifically to the published abstract
that supports the displayed findings and was checked in this pass.

Several provenance statements were stale after the public-pathway expansion:
Li's model was described as external-only, and the STN hover and methods notes
still described hyperdirect or pre-SMA–STN geometry as unavailable. These now distinguish the **released normative Li
response model**, **public STN pathways**, and **estimated pre-SMA–STN subset**
from unavailable patient-specific tractograms.

The Taylor overlay already credits its original Siddiqi 2021 circuit. Its reuse
by Taylor 2026 is explicit; the audit did not relabel it as a newly generated
Taylor patient map. Cortical boundaries and tract presets remain anatomical
estimates or literature-informed selections, not study-specific treatment masks.

## Remaining verification limits

- **Fitzsimmons:** both displayed findings are supported by the published
  abstract. Publisher and institutional PDF retrieval remain blocked. This audit
  does not claim a fresh complete review of the final PDF or all its methods.
- **Holtzheimer 2017, Dougherty 2015 and Dunlop 2020:** the three cards remain
  explicitly based on published abstracts; their full texts were not independently
  reviewed here.
- **Mantovani:** the claims and named HTML sections were verified, but the former
  PDF pagination was not independently rechecked.
- **Legacy supplemental assets:** F009, F034 and F060 lack current local PDF
  routes. F034's cited table was checked from cached extraction; F060 is a DOCX
  supplement. No live finding's Source PDF link depends on those missing routes.
  The previously identified, mislabeled local “Liebrand” PDF remains excluded;
  the actual institutional article was checked separately.
- Publisher 403s and unavailable full-text XML are access limitations, not proof
  of invalid citations. Conversely, an HTTP 200 is not proof of readable content.

This is a citation and attribution audit, not an independent replication of
study analyses, a complete systematic review, or validation of individual
treatment geometry. Historical release reports remain dated snapshots.

## Verification

The citation checker verifies bibliography identities against the reviewed
metadata snapshot, citation/finding references, coordinate values, supporting
chapter links and the corrected critical figure references. The ordinary atlas
regression suite is also run. Live browser checks and command results are recorded
in [verification-v0.10.2.json](verification-v0.10.2.json).
