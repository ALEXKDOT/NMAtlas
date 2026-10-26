# Confirmed office-drawing markings · v0.16.1

Release: 15 October 2026.

The integration follows the 7 October photo interpretation and the owner's instruction to integrate only high-confidence identifications that were missing. Confidence refers to reading/identifying the marking, not evidence of treatment efficacy or precision of a drawn boundary. The original photos remain local reference material and are not redistributed.

## Coverage

Layers → Figee’s office drawings provides the crosswalk below; Search atlas also finds these markings. Existing clinical and anatomical destinations are reused. All new anatomy entries are reference-only under Whole collection, with no assigned clinical findings or default tract layers. The evidence collection remains 94 findings and 39 sources.

| Marking | Identification | Photo | Integration |
| --- | --- | --- | --- |
| OCD | Obsessive-compulsive disorder | IMG_4609 | existing |
| MDD | Major depressive disorder | IMG_4609 | existing |
| vlPFC | Ventrolateral prefrontal cortex | IMG_4609 | existing |
| dlPFC | Dorsolateral prefrontal cortex | IMG_4609 | existing |
| dmPFC | Dorsomedial prefrontal cortex | IMG_4609 | existing |
| OFC | Orbitofrontal cortex | IMG_4609 | existing |
| vmPFC | Ventromedial prefrontal cortex | IMG_4609, IMG_4610 | existing anatomy new access |
| pre-SMA | Pre-supplementary motor area | IMG_4609 | existing |
| PM | Premotor cortex | IMG_4609 | new label |
| M₁ | Primary motor cortex | IMG_4609 | existing anatomy new access |
| T | Thalamus | IMG_4609 | existing anatomy new access |
| H | Hippocampus | IMG_4609 | new reference anatomy |
| A | Amygdala | IMG_4609 | new reference anatomy |
| M | Motor territory | IMG_4609 | new label |
| STN | Subthalamic nucleus | IMG_4610 | existing |
| NAc | Nucleus accumbens | IMG_4610 | existing |
| Vertical lead | DBS electrode lead | IMG_4610 | existing |
| Four marked positions | Four DBS contacts | IMG_4610 | existing |
| Connecting lines | Schematic connections | IMG_4609, IMG_4610 | existing concept |

## Geometry and provenance

Hippocampus and amygdala each receive bilateral whole-structure surfaces copied unchanged from the Clinical Neuroanatomy Atlas v1.0.3 bundle already used by NMAtlas. Hippocampus uses MNI-FreeSurfer; amygdala uses MASSP (Apache-2.0). The source IDs, native MNI alignment, original metadata, filenames and mesh SHA-256 hashes are retained in assets/atlas.json. Upstream notices remain in assets/licenses/ and ATTRIBUTION.txt. No photo-derived geometry or registration is introduced. Bilateral presentation is atlas context; the drawing does not establish laterality.

Primary motor cortex uses the existing CerebrA precentral-gyrus parcels as broad orientation, explicitly not an exact or complete M1 boundary. vmPFC reuses partial medial-OFC context, and thalamus reuses whole-thalamus meshes. Premotor cortex has a readable label and explanation but no substitute surface. The broad M marking is not equated to M1.

The lead and four-contact markings link to the existing published historical contact example. That separately sourced lesson is not a reconstruction of the office drawing. Contact numbers, spacing, activation settings and anatomical positions are not recovered from the photo. Connecting lines are retained only as a schematic concept, without a named tract or new geometry.

## Excluded interpretations

Medium-high and lower readings are excluded: the vlPFC occurrence in IMG_4610, GPe, BS, TS expansion, S/sensory, uncertain C/L and deep L/C/M marks, the overview's diagonal line as a lead, and interpretations of nested rings. No inferred vALIC lead placement, millimeter distances, stimulation fields, tract direction or connection endpoints are introduced. Existing independently sourced GPe and brainstem anatomy is unaffected. Unreadable small labels and contact numbers remain unidentified.

## Verification

The existing atlas, citation, teaching and curation checks cover unchanged evidence and navigation behavior. Additional workspace checks enforce the confidence gate, distinguish reference anatomy from clinical targets and exercise search/link destinations. Publishing checks include the new module and anatomy in encrypted-file round trips. Browser checks cover the drawing index, anatomy selection, premotor's absent surface, search and the existing contacts destination.

Release validation passed: 52 atlas regression groups, citation validation, 12 teaching groups, 5 curation groups, 10 workspace groups and 276 encrypted-file round trips. All four added mesh hashes and byte lengths match their metadata. Local browser checks passed for the drawing index, amygdala and M1 labels, premotor explanation, hippocampus search, and the historical four-contact destination.
