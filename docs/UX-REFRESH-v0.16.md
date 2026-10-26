# NMAtlas v0.16.0 · Guided learning and research workspace

Release: 5 October 2026.

## Purpose and content preservation

The research atlas is the full expert edition, with guided learning as a separate,
connected route. No clinical finding, study, teaching claim, source citation,
methodological qualification, coordinate record or anatomical asset was removed
or rewritten for simplification. The evidence collection remains 94 findings from
39 sources. Dixon remains supplemental functional background, not a new clinical
outcome source. Patient geometry and causal treatment mechanisms are not inferred.

## Research atlas

- Targets, Evidence and Layers share one inspector next to a stable brain scene.
  Camera and hemisphere controls remain visible above the brain. Long spatial
  explanations, coordinate provenance and boundary notes remain in Layers.
- The scene identifies the clinical focus, evidence focus and actual map source.
  Comparison overlays and paused region colors are explicit. Geometry captions
  follow the displayed map, including when a selected target's map is off.
- Region checkboxes add reference layers without silently replacing a study map.
  A visible action restores region colors by turning the map off. Changing targets
  clears added region layers; finding changes within a target retain them.
- Anatomy, study-defined targeting approaches and collection overviews are grouped.
  All findings remain available with their study families, source filters,
  interpretation, limitations and optional historical sections.
- Labels start off on new views to reduce clutter. Explicit saved label settings
  are respected. Users can focus on selected anatomy and restore target defaults
  with Reset exploration; Reset camera still changes only the camera.
- Browser history records selection changes atomically. Sliders and search typing
  replace the current entry rather than flooding the history with tiny changes.
- Search atlas finds targets, findings, lessons and Dixon comparisons. Results label
  their evidence category. The original panel search is explicitly a finding filter.

## Guided learning

- Atlas-to-lesson links match the clinical topic and target where a lesson exists.
  Related lessons are labeled as related, rather than implying exact coverage.
- The exact previous research view has a return link. Opening the research atlas
  from a lesson retains that lesson's step and diagram selection for the return.
- Next and Previous bring the new heading into view and move keyboard focus to it.
  A persistent progress strip provides navigation while exploring the visuals.
- Historical comparisons return to the actual prior lesson and step. They remain
  optional and retain their original hardware and interpretation caveats.
- The last step offers an explicit research destination and another clinical question.
- Dixon comparisons are an expandable background section, with direct search links
  and a return-to-step action. Existing in-context Dixon descriptions are retained.

## Verification

- 52 atlas regression groups; 12 teaching groups; 5 evidence-curation groups.
- 8 new workspace groups cover clinical lesson matching, map descriptions,
  all lesson/element return links, safe local return URLs, categorized search,
  reachability of every finding and grouping of targets versus study approaches.
- Citation checks: 39 source identities, 94 findings and 13 checked coordinates
  (8 displayed study-marker records).
- Desktop browser: all 28 target/overview choices, all 6 lessons and 24 steps,
  all 109 diagram node/connection choices, completion routes, map/region switching,
  comparison-map captions, Reset exploration, browser Back, research/lesson return,
  historical return, Dixon search and keyboard inspector tabs. All Next transitions
  brought their headings into view. No browser errors were reported in these checks.
- Narrow-screen browser: 390 × 844; header, overflow, research inspector/brain
  navigation and lesson progression checked. Desktop checks used 1280 × 720.
- Encrypted distribution checks include the new modules/styles and verify round-trip
  decryption, wrong-password rejection, tampering rejection and exclusion of private
  source papers and plaintext application files.

This is functional and visual regression testing, not a formal accessibility
certification or a study with clinical users. The existing scientific distinctions
and source-review limitations remain applicable.
