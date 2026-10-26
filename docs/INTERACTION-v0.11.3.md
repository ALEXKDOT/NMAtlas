# Smooth hover and pinned focus · v0.11.3

Released 1 October 2026.

Hover emphasis now changes continuously instead of switching instantly between
normal and faded opacity. Meshes, tracts and study markers ease from their current
rendered opacity, including when a transition is interrupted by another hover.
Labels and their connector dots/lines also fade smoothly. Background elements
retain the existing 50% of their normal opacity; this release changes the
transition, not the amount of fading.

An 80 ms dwell filters brief crossings of neighboring structures. A 120 ms grace
period across empty gaps avoids repeatedly restoring and re-fading the atlas.
The opacity easing reaches approximately 95% of its new value in 270 ms. Frame
time is accounted for, and long frame gaps are capped to avoid a visible jump.

## Clicking and releasing focus

- Click an interactive structure, tract, or published point to pin its highlight.
  The pinned name and Clear focus appear below the brain.
- Moving away or hovering another element keeps the pinned focus. Hover labels
  and descriptions still identify the element under the cursor.
- Click a different element to move the pin. Click the same element again,
  click empty space, press Escape, or choose Clear focus to release it.
- Rotation, zoom, camera presets, label toggling and opacity changes preserve
  a pin while its element remains visible and relevant.
- Changing target, clinical focus, study, finding or search clears the pin.
  Hiding its tract/region or filtering out its hemisphere also clears it.
- Dragging never selects a pin, including a drag that returns to its starting
  point. Non-primary mouse buttons do not pin structures.
- Anatomy-to-target navigation is available explicitly through Related targets
  beside the pinned name, rather than occurring on the click that pins focus.
- Background anatomy stays passive. Pins are temporary viewing state and are
  not saved in shared links or restored after a reload.

## Verification

- JavaScript syntax checks and **52 regression groups** passed. New numerical
  checks cover gradual convergence, agreement at 30 versus 60 frames per second,
  interrupted fades, no overshoot, and exact restoration after settling.
- Citation checks passed: 37 source identities, 88 covered findings, and 13
  coordinate records (eight displayed and five source-only).
- Recorded opacity during a real pointer hover in the running atlas. A
  background surface moved from 0.065 through 0.0595, 0.0530, 0.0442, and 0.0376
  toward 0.0325 rather than switching directly to the faded value.
- Pinned a left caudal middle-frontal mesh, moved outside the canvas, and verified
  that its emphasis remained at 0.32 while the callout disappeared. Hovering the
  rostral middle-frontal mesh showed its description without moving that pin.
- Clicked a second mesh to transfer the pin; verified preservation through a
  superior camera preset and a cortex-opacity change.
- Tested published-coordinate pinning and same-point release, and pinned the
  left anterior corticostriatal tract. A drag away and back retained the tract
  pin; unchecking that tract cleared it.
- Verified Clear focus, Escape and empty-space release; changing to the right
  hemisphere cleared a left-only pin. Selecting a Fox finding also cleared the
  earlier pin. Related targets opened the existing target chooser.
- Final live loads reported no atlas loading errors. Existing anatomical colors,
  reported laterality, study highlights, coordinate roles and opacity controls
  remain independent of temporary focus.

![Pinned focus remains after the cursor leaves the structure](pinned-focus-v0.11.3.jpg)
