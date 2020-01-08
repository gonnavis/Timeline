var p = {
  is_edit: vs.getQueryStringByName("is_edit"),
  map_state: 2, // 0 only timeline   1 only map   2 timeline & map,
  material: null,
  canvasTexture_twha: null,
  uniforms: null,
  group_text: new THREE.Group(),
  cache_text: {},
  is_map_name: true,
  year_clamp(year)
  {
    if (year < -4000) {
      year = -4000;
    } else if (year > this.MAX_YEAR) {
      year = this.MAX_YEAR;
    }
    return year
  }
}

// p.group_text.scale.set(1.03, 1.03, 1.03)
window.p = p //test

export default p
