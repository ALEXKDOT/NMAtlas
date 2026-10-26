# Public pathway dataset audit — v0.10.0

Reviewed 1 October 2026. This pass expands the atlas from 11 to **33 streamline files**, plus **two local ITP surfaces**. There are **13 new optional pathway layers**: 12 fiber families and one segmented-volume family. The atlas now contains 96 meshes. All 76 clinical findings and their limitation texts are preserved.

The search covered the public repositories and released files below, rather than treating a paper figure or a functional correlation as fiber geometry. “No geometry found” means no usable, openly retrievable geometry was identified in those releases; it is not proof that no other dataset exists. Private patient tractograms were not obtained or inferred.

## Added geometry

| Layer | Public source | What the atlas now shows |
| --- | --- | --- |
| Forceps minor | [DIPY 80-bundle atlas, version 2](https://doi.org/10.6084/m9.figshare.7375883.v2) | A separately delineated frontal callosal bundle, derived from HCP842; not a relabeling of the entire corpus callosum. Enabled in SCC DBS. |
| Four additional cingulum subdivisions | [HCP1065 / Yeh 2022](https://brain.labsolver.org/hcp_trk_atlas.html) | Frontal–parahippocampal, parahippocampal–parietal, parahippocampal, and parolfactory segments. The anterior/parolfactory segment is enabled in SCC and sgACC views. |
| Frontal aslant tract | HCP1065 | Bilateral frontal association anatomy, optional control-network context. It is not an STN pathway or established OCD efficacy tract. |
| VTA projection pathway (slMFB model) | [DBS Tractography Atlas, bundled with Lead-DBS](https://www.lead-dbs.org/download-lead-dbs/) | Original `vtaPP_slMFB` trajectories. Enabled in the slMFB view, including the release’s caudal extensions. This is a reference model, not a patient treatment tract. |
| Classical medial forebrain bundle | Same DBS atlas | The separately released `MFB` anatomy, available for comparison; not silently equated with the VTA projection model. |
| Associative and limbic STN pathways | Same DBS atlas | Two separately selectable bilateral families, enabled in the subthalamic view. Their entire extents are not clinical amSTN target boundaries. |
| Pre-SMA–STN pathway (estimate) | Endpoint-filtered source STN fibers + existing AAL3 anatomy | Complete original streamlines retained by an explicit endpoint rule. Enabled alongside superior corticostriatal anatomy in pre-SMA TMS. |
| OCD response-associated fibers (Li 2020) | [Li publication](https://doi.org/10.1038/s41467-020-16734-3), official Lead-DBS response atlas | All 238 positive-weight streamlines from the released file. Selecting a Li finding enables these fibers; changing to another study restores general tract suggestions. |
| Inferior thalamic peduncle (local segment) | [Neudorfer et al. 2020](https://doi.org/10.1038/s41597-020-00644-6), official Lead-DBS distribution | Bilateral shaded volumes of the locally segmented ITP, enabled in BNST/ITP. They are tissue boundaries, not fabricated centerlines or a complete thalamic–cortical tractogram. |

Names for the HCP subdivisions follow the [source laboratory’s terminology](https://practicum.labsolver.org/wmt.html). The later DBS atlas protocol renames `vtaPP_slMFB` as VTA projection pathway; it also identifies STN–BA6 as broadly supplementary-motor, not specifically pre-SMA. The older bundled source files were used because their redistribution terms are supplied with the official distribution.

## What was checked and not added

| Resource | Inspection and outcome |
| --- | --- |
| [HCP1065 full tract release](https://github.com/data-others/atlas/releases/download/hcp1065/hcp1065_avg_tracts_trk.zip) | Archive inventory and selected original TRK files inspected. Ten new bilateral cingulum/FAT files extracted with ZIP CRC verification. The existing anterior corticostriatal and thalamic families were not renamed as ITP or hyperdirect fibers. |
| [DIPY / Figshare](https://figshare.com/articles/Advanced_Atlas_of_80_Bundles_in_MNI_space/7375883) | Forceps-minor TRK, README and CC BY 4.0 license extracted. README identifies MNI ICBM2009a. Imported rather than using the unsplit callosal bundle. |
| [Official Lead-DBS release](https://www.lead-dbs.org/release/leaddbs.zip) | Full ZIP/ZIP64 member inventory inspected without downloading the entire 11.2 GB archive. Source MAT files, STN masks, ITP masks and full license extracted. Release identified as 3.2.1; HTTP Last-Modified 14 May 2026. File hashes pin the actual inputs. Other anatomical families, including Avecillas mesocortical/mesolimbic and thalamocortical families, do not provide the missing study-specific Jimenez or multi-hop TMS routes. |
| [DBS Tractography Atlas v2.2 repository](https://github.com/netstim/DBS-Tractography-Atlas) | Pinned tree `d4edb93b6be7881a41f21f0a2dfb540081458383`, protocol and sample STN–BA6/VTA/MFB files inspected. BA6 is broader than pre-SMA. An explicit standalone data license was not found in the inspected repository; the official bundled atlas with supplied terms was used instead. |
| [Petersen basal-ganglia pathway atlas](https://osf.io/mhd4z/) | Project, file tree and custom licensing inspected. Public visibility does not establish unrestricted derivative-web redistribution. Not imported; licensed bundled STN anatomy covers the useful reference role here. |
| [LINC / DANDI 001278](https://dandiarchive.org/dandiset/001278) | Draft metadata and all 205 asset entries inspected. Right-hemisphere MNI2009b STN6 and thalamus–OFC TRK files downloaded and parsed (2,596 and 260 streamlines respectively). CC BY 4.0. These are single-specimen reference pathways, not isolated pre-SMA, named ITP, or the Jimenez patient pathway. Retained as audited alternatives rather than duplicating the bilateral families in the UI. |
| [Seguin indirect DLPFC–sgACC study repository](https://github.com/caioseguin/tms_dep_pathways) | Repository file tree and main analysis code inspected. Released matrices, masks and analysis outputs are not an export of the study’s individual multi-hop streamline routes. No direct DLPFC–sgACC line or stitched “indirect tract” was invented. |
| [Pre-SMA/STN lifespan study OSF release](https://osf.io/hnz79/) | All five public files listed; tractography notebook inspected. Code references subject-specific STN–pre-SMA TCK outputs, but the public deposit provides analysis code/tables rather than those tractograms. |
| [Jimenez 2025](https://doi.org/10.1016/j.transm.2025.100182) | Accessible full-text XML inspected. OFC targeting uses tract overlay in the patient’s native space and cites an earlier meeting report. No downloadable original tract file or deposited geometry link was identified. Li’s group response fibers are not substituted for this patient’s OFC tract. |
| [Germann ITP/OCD study](https://doi.org/10.1159/000523826) | Published data-availability statement directs requests to the authors. Public hypothalamic segmentation provides a local ITP boundary, but not this study’s stimulation-linked full fiber geometry. |
| [IIT atlas](https://www.nitrc.org/projects/iit/) | Standalone terms restrict alterations and web redistribution. Original IIT assets were not imported. |
| [FSL XTRACT atlas](https://github.com/SPMIC-UoN/XTRACT_atlases) | Public inventory inspected; forceps-minor and cingulum probability-volume alternatives exist. DIPY/HCP streamline releases were used for these already-covered families. |
| [BrainstemSeg 2026](https://zenodo.org/records/19343085) | Release documentation and file inventory reviewed. Primarily a diffusion-MRI segmentation workflow with subject-native outputs; motor/premotor hyperdirect and VTA variants do not supply the exact remaining OCD/TMS study routes. No multi-gigabyte executable or new patient reconstruction was needed for the available atlas additions. |

This distinguishes three outcomes: imported geometry; usable alternatives that would duplicate a reference role; and missing or redistribution-restricted data. It does not imply that every public brain pathway belongs in this depression/OCD atlas.

## Derivations and checks

### Pre-SMA–STN estimate

For each hemisphere, pool the original `STN_motor_tract` and `STN_associative_tract` files. Retain a whole streamline only when:

1. Its superior endpoint falls within AAL3 SMA label 15 (left) or 16 (right), with MNI y > 0 mm, matching the app’s existing anterior-SMA estimate.
2. Its opposite endpoint falls in the same-side public STN mask at voxel value > 0.5.

Each mask is sampled at its nearest voxel using its own native affine. No cross-template nonlinear registration is claimed. No endpoints are extended, shifted, joined or mirrored. The selection retains **460 left streamlines** (377 motor + 83 associative) and **186 right streamlines** (186 motor + 0 associative). This asymmetry is preserved and is not evidence of biological hemispheric dominance. All retained indices and original endpoints are recorded. This is an anatomical estimate, not Ji’s superficial target mask, individual connectivity optimum, histological proof or treatment-activation model.

### Li response fibers

The release contains 384 streamlines across two HDF5 cells. Those cells are **not hemisphere labels**. Use the signed per-fiber weights: retain all 238 positive values and exclude 146 nonpositive values. Both cells contribute. Preserve cell/index/T-score for every displayed fiber. Positive is a response association, not a statistical-significance cutoff. Full trajectories are retained, including extensions; do not label every curve a pure monosynaptic hyperdirect pathway. Neither color nor density encodes efficacy or T-score.

### ITP volumes

Threshold each released local ITP probability volume at > 0.5, then use marching cubes at binary level 0.5 and apply the supplied RAS affine. No smoothing, dilation, bridging or inferred fiber direction. Left: 3,544 source voxels. Right: 3,680. The volume has limited spatial extent around the hypothalamic/thalamic interface and is not the full projection pathway.

### Display and coordinates

TRK headers are interpreted by NiBabel; MAT coordinates retain their published MNI space. Up to 550 evenly spaced source streamline indices are used per displayed file, with arc-length resampling around 1.8 mm and 12–100 points per streamline. Li and pre-SMA sets are below the cap, so every selected streamline is shown. Original endpoints remain unchanged within float32 precision.

HCP and DIPY use MNI2009a; Lead uses MNI2009b; the existing cortex reports MNI2009c. Source-affine overlays support educational orientation, **not millimetre-level contact distances or individualized targeting**. Hemisphere selection clips lines at x = 0, including crossing fibers, and excludes clipped points from hover picking. It does not delete the source data.

## Reproduce and reuse

`tools/build-public-pathways.py` rebuilds all added assets from the checked-in sources listed in `assets/tract-inputs/manifest.json`. It verifies source SHA-256 hashes before processing. Dependencies and versions are recorded in `assets/public-pathways.json`. The unchanged legacy preparation script is not used.

HCP additions retain CC BY-SA 4.0 and HCP acknowledgment. DIPY forceps minor retains CC BY 4.0 and its full bundled license. Lead-derived assets retain the **complete upstream license**, including its separate Standard Space Atlases notice and request to contact atlas coordinators for commercial use; no broader permission is asserted. Source MAT/NIfTI files, transformation rules and selection indices accompany those derivatives. See `ATTRIBUTION.txt`.

## Remaining geometry gaps

- **Complete ITP fiber trajectories:** local tissue boundaries are now available; an authenticated end-to-end tractogram with appropriate anatomy, template and reuse terms is still needed.
- **Exact Jimenez ALIC–OFC pathway:** requires the authors’ original targeting tract or a specifically released equivalent, with coordinate space and redistribution permission.
- **Complete indirect DLPFC–sgACC routes:** requires an exported structural connectome/tractogram with edge-to-streamline correspondence and the study’s route definitions. A functional anticorrelation or a list of graph nodes cannot determine a unique 3D trajectory.
- **Right-insula–left-DLPFC relationship:** the effective-connectivity finding is not itself an anatomical tract. A specific structural reconstruction is needed before drawing a route.
- **Patient-specific treatment geometries:** exact stimulation volumes, electrodes, patient tractograms and response intersections remain separate from this population/reference atlas.

The former blanket statement “pre-SMA–STN geometry unavailable” is replaced by a qualified estimate. Forceps minor, the VTA/slMFB reference model, additional cingulum segments, Li response fibers and local ITP geometry are no longer simply absent.
