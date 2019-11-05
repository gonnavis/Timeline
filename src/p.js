var p = {
  is_edit: vs.getQueryStringByName("is_edit"),
  map_state: 2, // 0 only timeline   1 only map   2 timeline & map,
  material: null,
  canvasTexture_twha: null,
  canvasTexture_text: null,
  uniforms: null,
  ctx_regions: null,
  group_text: new THREE.Group(),
  cache_text: {},
  is_map_name: true,
}

// p.group_text.scale.set(1.03, 1.03, 1.03)
window.p = p //test

export default p
