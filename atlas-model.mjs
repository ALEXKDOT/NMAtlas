// Shared, deterministic display rules. Unknown laterality stays anatomical context.
export function meshIdsFor(entities, sides, mapping) {
  return [...new Set(entities.flatMap(id => (mapping[id] || []).filter(mesh => {
    const side = sides?.[id];
    return !['left', 'right'].includes(side) || mesh.endsWith(side === 'left' ? '-l' : '-r');
  })))];
}

export function defaultMap({topic, sourceId, targetMap}, maps) {
  if (!['tms-depression', 'all'].includes(topic)) return 'off';
  if (sourceId && sourceId !== 'all') return maps.find(m => m.source_ids.includes(sourceId))?.id || 'off';
  return maps.some(m => m.id === targetMap) ? targetMap : 'off';
}

export function allowedMap(id, topic, maps) {
  return id === 'off' || (['tms-depression', 'all'].includes(topic) && maps.some(m => m.id === id));
}

export function targetCandidates(meshId, topic, targets, mapping, contextMapping) {
  return Object.entries(targets).filter(([, t]) => t.topics.includes(topic) &&
    t.entities?.some(entity => [...(mapping[entity] || []), ...(contextMapping[entity] || [])].includes(meshId))
  ).map(([id]) => id);
}

export function countText(value) {
  if (value == null) return '';
  if (typeof value === 'object') return Object.entries(value).map(([key, n]) => `${key.replaceAll('_', ' ')}: ${countText(n)}`).join('; ');
  return String(value);
}

// A coordinate's study role must survive every rendering path: dot, legend and
// hover. Treatment means and control locations are not candidate targets.
export function coordinateStyle(point) {
  const styles = {
    treatment_mean: {color:'#327f79', legend:'Mean treatment coordinates'},
    treatment_fallback: {color:'#b54e35', legend:'Treatment fallback coordinates'},
    control: {color:'#666b76', legend:'Control coordinates'},
  };
  const seed = point.role.toLowerCase().includes('seed');
  return {...(styles[point.kind] || (seed
    ? {color:'#6b5aaa', legend:'Connectivity analysis coordinates'}
    : {color:'#b54e35', legend:'Candidate TMS coordinates'})),
    description:point.description || (seed
      ? 'A published analysis coordinate used to examine connectivity. It is not a stimulation site or the boundary of an anatomical region.'
      : 'A published candidate cortical target coordinate. The dot marks a reported location, not an individual treatment prescription or the extent of stimulation.')};
}

export function medialHemisphere(view, hemisphere) {
  return view === 'medial' && hemisphere === 'both' ? 'left' : hemisphere;
}

export function cortexAlpha({mapped, focused, context, cortexOpacity, mapOpacity}) {
  if (mapped) return mapOpacity;
  // The slider scales every cortical parcel, including highlighted/context parcels.
  return Math.min(1, cortexOpacity * (focused ? 2.4 : context ? 1.3 : 1));
}

// Most slider travel is reserved for the useful translucent range. URL state
// continues to store physical opacity, so existing views retain their appearance.
export function cortexOpacityFromSlider(value) {
  const v = Math.max(0, Math.min(1, Number(value) || 0));
  return v <= .9 ? .4 * (v / .9) ** 3 : .4 + .6 * ((v - .9) / .1) ** 2;
}

export function cortexSliderFromOpacity(value) {
  const v = Math.max(0, Math.min(1, Number(value) || 0));
  return v <= .4 ? .9 * Math.cbrt(v / .4) : .9 + .1 * Math.sqrt((v - .4) / .6);
}

export function hoverOpacity(base, active, matches, kind = 'mesh') {
  if (!active || base === 0) return base;
  return matches ? Math.max(base, kind === 'tract' ? .95 : .32) : base * .5;
}

// Exponential easing keeps interrupted fades continuous and frame-rate independent.
export function smoothOpacity(current, target, elapsedMs) {
  if (elapsedMs <= 0) return current;
  const next = target + (current - target) * Math.exp(-elapsedMs / 90);
  return Math.abs(next - target) < .0001 ? target : next;
}

// Hits arrive in distance order from the raycaster. Visible point markers are
// already rendered through anatomy. Otherwise solid
// foreground surfaces still block deeper hits, even when they are noninteractive.
// Background cortical parcels never become hover or click targets.
export function chooseHoverHit(hits) {
  const point = hits.find(h => h.kind === 'point' && h.interactive !== false);
  if (point) return point;
  const solid = hits.find(h => h.kind === 'mesh' && h.opacity >= .5);
  const visible = hits.filter(h => h.interactive !== false && (!solid || h.distance <= solid.distance + .5));
  return visible.find(h => h.kind === 'tract') ||
    visible.find(h => h.kind === 'mesh' && h.preferred) || visible[0] || null;
}

export function hoverBlurb(item, catalog) {
  return item.kind === 'tract' ? catalog.tracts[item.family] :
    item.kind === 'mesh' ? catalog.anatomy[item.id.replace(/-[lr]$/, '')] : null;
}

// Checked regions remain independent of clinical evidence and published seed points.
export function regionDefinition(id, catalog) {
  return catalog.regions.find(region => region.id === id) || null;
}

export function parseRegions(value, catalog) {
  return new Set(String(value || '').split(',').filter(id => regionDefinition(id, catalog)));
}

export function regionsForMesh(meshId, selected, catalog) {
  return catalog.regions.filter(r => selected.has(r.id) && r.mesh_ids.includes(meshId));
}

export function regionVisibilityNote(region, hemisphere, opacity, map = 'off') {
  if (map !== 'off') return 'Colors paused by functional map';
  if (!region.mesh_ids.some(id => hemisphere === 'both' || id.endsWith(hemisphere === 'left' ? '-l' : '-r'))) return 'Hidden by Hemisphere filter';
  if (opacity === 0) return 'Hidden at zero region opacity';
  return '';
}

// Circuit presets describe reference anatomy, separately from a finding's measurements.
export function circuitProfile(topic, target, catalog) {
  return catalog.profiles.find(p => p.topics.includes(topic) && p.targets.includes(target)) || null;
}

export function restoredTracts({value, mode, version, suggested, families, hasCircuit}) {
  const [major, minor] = String(version || '').split('.').map(Number);
  const legacyEmpty = hasCircuit && value === '' && (!version || (major === 0 && minor < 8));
  const useSuggested = value === null || legacyEmpty || mode === 'suggested';
  return {
    bundles: new Set(useSuggested ? suggested : value.split(',').filter(id => families.includes(id))),
    tractMode: useSuggested ? 'suggested' : 'custom',
  };
}

// The display transform preserves x. Apply the same midsagittal clipping rule
// to line rendering and picking so hidden contralateral fibers cannot be hovered.
export function tractPointVisible(x, hemisphere) {
  return hemisphere === 'both' || (hemisphere === 'left' ? x <= 0 : x >= 0);
}
