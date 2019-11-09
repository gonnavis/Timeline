var p = {
  is_edit: vs.getQueryStringByName("is_edit"),
  map_state: 1, // 0 only timeline   1 only map   2 timeline & map,
  material: null,
  canvasTexture_twha: null,
  uniforms: null,
  group_text: new THREE.Group(),
  cache_text: {},
  is_map_name: false,
}

// p.group_text.scale.set(1.03, 1.03, 1.03)
window.p = p //test

export default p
