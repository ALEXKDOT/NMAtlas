# Teaching edition · v0.12.0

2 October 2026. Clinical teaching draft; not yet reviewed by Dr. Figee.

## What is implemented

**Learn the circuits** is a companion state in the existing repository, linked
from the atlas header. Five lessons, each with four steps, cover all four clinical
categories. Pre-SMA OCD TMS has its own lesson so that it is not conflated with
medial-prefrontal/ACC deep TMS.

Each lesson presents a stimulation site, selected connections, clinical evidence
and interpretation. Interactive SVG diagrams use explicit structural, functional
or circuit-rationale line styles. Selecting a region or connection changes the
adjacent 3D reference scene. The 3D view is the existing atlas renderer, using the
same geometry, hover descriptions, opacity controls and click-to-pin behavior.
The full research atlas remains available through an explicit link. Source details
and a short understanding check accompany each lesson.

Lesson, step, diagram selection, comparison contacts and mode are saved in the URL.
Back/forward navigation restores them. Ordinary full-atlas URLs keep their existing
meaning. Teaching scenes accept validated catalog IDs through a same-origin message
bridge; they cannot load caller-supplied anatomy or execute arbitrary instructions.

## Contact comparison

The comparison uses **Tsai 2014, published case 1, left VC/VS lead**. At the reported
6-V, 210-μs, 130-Hz monopolar test, contact 1 elicited smile/laughter with euphoria;
contact 2 elicited smile/laughter without euphoria. The lead was a Medtronic 3387.
Its 1.5-mm contact length and 1.5-mm gap imply **3 mm between adjacent contact centers**.
The four contacts and a ruler preserve those nominal dimensions. The shaft extension
outside the contact array is schematic. No exact patient contact-to-tract distance is
reported, and the contact coordinates in Table 2 are not converted into MNI coordinates.

The model lets a learner compare any two of the four published contact observations.
Case 1 contact 3 has no smile/laughter response recorded in Table 2; an individual
euphoria score at 6 V is not supplied and is not invented. Fixed parameters identify
the source observation; they are not editable programming recommendations. Acute
experience is kept separate from long-term clinical response.

A separate comparison links into Tyagi's OCD DBS lesson: medial OFC connectivity
with effective VC stimulation versus lateral OFC/dACC/DLPFC connectivity with
effective amSTN stimulation. The contact view never attributes those group pathways
to Tsai's individual contacts or equates either example with Figee's remembered
contact-number anecdote.

## Scientific boundaries

- DLPFC–sgACC is drawn as a functional relationship, with no invented direct 3D fiber.
  Caudate TMS–PET engagement is identified as healthy-volunteer evidence.
- H7 target, circuit rationale and randomized efficacy result remain separate.
  The diagram shows selected circuit arms; it does not omit pallidal relays while
  claiming to be a complete cortico-striato-thalamo-cortical loop.
- Ji's right pre-SMA target is separated from bilateral Mantovani and left
  Fitzsimmons protocols. The STN is a connectivity reference, not the TMS site.
- The hyperdirect subset is the existing population anatomical estimate, not Ji's
  patient-specific route or stimulated fibers.
- Tyagi's medial/lateral OFC distinction and small six-person sample are explicit.
  The displayed whole STN does not delineate amSTN.
- SCC white matter is distinguished from the neighboring sgACC surface. Riva-Posse
  targeting cohorts and Holtzheimer's negative controlled comparison both appear.
- Reference hemispheres isolate medial anatomy for visibility where stated. Broad
  parcels, whole bundles and cross-template geometry are not millimeter-validated
  contact anatomy. No electric field, activation volume or clinical predictor is added.

The teaching collection is a curated synthesis, not a new systematic review or a
claim that the main atlas's 88 findings / 37 sources now include every teaching-only
source as a separate research card. Teaching sources and claim locations have their
own [structured crosswalk](teaching-review-v0.12.json).

## Access and follow-up

[The acquisition list](TEACHING-ACCESS-v0.12.md) records the two inaccessible full
texts needed for deferred extensions: Seguin 2026 and Machado 2009. It separately
records geometry/registration requirements that more PDFs may not resolve.

The next clinical review should check whether a novice can explain the entry point,
connection, clinical rationale and key uncertainty after each lesson. The current
implementation is ready for that review; no student usability study or clinician
endorsement is claimed.

## Verification

Automated and browser checks are recorded in `teaching-verification-v0.12.json`.
Existing atlas syntax, citation and regression checks must pass alongside
`node check-teaching.mjs`. The teaching checks cover reference integrity, all URL
states, input validation, laterality, functional-versus-structural mapping, Tyagi's
OFC distinction, lead dimensions and the contact comparison.
