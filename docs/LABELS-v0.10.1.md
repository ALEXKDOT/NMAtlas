# Floating label controls · v0.10.1

1 October 2026

## Behavior

- A single **Show labels** switch sits above the brain, available while scrolling
  the atlas panel. It controls floating text and its leader lines.
- Relevant published coordinates and existing parcel anchor dots remain visible.
  Hover reveals the point or parcel name and its existing explanation. Highlighted
  region surfaces also retain hover; broad regions receive no new artificial points.
- Parcel dots remain at the projected anatomical position even if there is no room
  for a floating name. Their small hover target selects the associated parcel.
- The former Study coordinates visibility checkbox is removed. Old `points=false`
  links retain the points appropriate to the current view. Topic, target, study,
  finding and hemisphere still determine which coordinates are relevant.
- `labels=false` persists across clinical-view changes and reloads. Reset view
  retains its prior behavior of restoring labels.
- Corrected one stale pre-SMA hover description: the available pre-SMA–STN layer
  is an endpoint-filtered anatomical estimate, rather than unavailable geometry.

## Verification

Both JavaScript syntax checks and all **37 regression groups** passed. A new
regression checks saved label state, legacy point visibility, hemisphere filtering
and study/finding relevance. Desktop browser checks covered point and parcel hover,
pre-SMA surface hover, keyboard switching, clinical-view transitions and reload.
A 390-pixel layout check found the switch accessible on screen with no horizontal
document overflow; no physical touch-device or full accessibility audit was run.

![Labels off with a published point callout](labels-hover-v0.10.1.png)

No geometry, coordinates or clinical evidence records changed. Existing spatial
limitations remain in [the public-data audit](PUBLIC-DATA-AUDIT-v0.10.md).
The full previous verification is preserved in
[verification-v0.10.0.json](verification-v0.10.0.json).
