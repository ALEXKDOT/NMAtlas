# Teaching sources and remaining data needs · v0.13

Reviewed 2 October 2026. This supersedes the two full-text requests in v0.12.

**Both requested full texts are now incorporated. No additional full text is
requested for this iteration.** Original supplied files remain local and unchanged.

| Source | Material reviewed | Contribution |
|---|---|---|
| [Seguin et al. 2026](https://doi.org/10.1038/s41593-026-02248-6) | Supplied published paper and all three source-data spreadsheets; independently retrieved public Supplementary Information; public analysis code and data | Three proposed DLPFC–SGC routes; their evidence and limitations; three atlas findings; a four-step teaching lesson |
| [Machado et al. 2009](https://doi.org/10.1016/j.clinph.2009.05.030) | Supplied full text, including figures, Tables 1–4 and methods | Depression DBS contact-cluster comparison by hemisphere; acute-effect categories; three atlas findings |

Seguin's public [Supplementary Information](https://media.springernature.com/original/springer-static/esm/art%3A10.1038%2Fs41593-026-02248-6/MediaObjects/41593_2026_2248_MOESM1_ESM.pdf)
was accessible without another acquisition request. The
[analysis repository](https://github.com/caioseguin/tms_dep_pathways/tree/067385f040eea215ed092afdc8e0332ad55b290d)
was inspected at the linked commit. It contains regional connectivity matrices,
parcellation volumes and coordinate transforms, cohort I clinical data and analysis
code. It does not supply the individual streamlines needed to draw the proposed
routes as physical fibers. Cohort II clinical data remain restricted; aggregate
published results suffice for the current lesson.

## What more PDFs cannot resolve

- **Seguin route geometry:** a regional graph identifies connections, not the
  physical course of every fiber. The current 3D view therefore retains broad
  anatomical references. Exact study parcellation surfaces could be a future layer;
  they would still not supply the intervening streamlines.
- **Individual DBS contact-to-pathway relationships:** these require localized
  electrodes and matching anatomy/tractography in a documented coordinate space.
  Machado's pooled AC-relative coordinates cannot be placed into this MNI atlas
  without a validated registration. His group centroids are not one electrode.
- **Figee's particular teaching example:** target, lead model, contact numbering,
  side and the specific proposed connection remain to be confirmed with him.
  Neither paper establishes that a universal contact “4” is a happiness contact.

See [the release review](TEACHING-v0.13.md) and
[the source/data audit](round4-source-review-v0.13.json).
