
import * as THREE from '../lib/three.module.js';

class AreaCalc {
  raycaster = new THREE.Raycaster();
  group = new THREE.Group()
  constructor(arg = { mesh, }) {
    let s = this
    s.arg = arg
    return group
  }
  add_dot() {
    let s = this
    s.raycaster.set({ x: 0, y: 0, z: 100 }, { x: 0, y: 0, z: -1 });
    intersects = s.raycaster.intersectObject(s.arg.mesh);
  }
}

export default AreaCalc
