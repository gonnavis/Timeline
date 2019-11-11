import * as THREE from '../lib/three.module.js';

class AreaCalc {
  raycaster = new THREE.Raycaster();
  group = new THREE.Group()
  count = 0

  // geo = new THREE.IcosahedronBufferGeometry(.05, 1);
  // mtl = new THREE.MeshBasicMaterial({ color: "black" });

  mtl = new THREE.SpriteMaterial({ color: 'black', sizeAttenuation: false });

  constructor(arg = { mesh, }) {
    let s = this
    s.arg = arg

  }
  add_dot() {
    let s = this
    const origin = s.get_random_sphere_position(11)
    const direction = new THREE.Vector3().sub(origin).normalize()
    s.raycaster.set(origin, direction);
    const intersects = s.raycaster.intersectObject(s.arg.mesh);
    // console.log(intersects)
    const intersect = intersects[0]
    window.intersect = intersect //todo
    if (intersect) {
      const imageData = s.get_color(ctx_regions, intersect.uv)
      // console.log(imageData.data)
      if (imageData.data[0] === 255 && imageData.data[1] === 0 && imageData.data[2] === 0) {

        count++

        // let obj3d = new THREE.Mesh(s.geo, s.mtl);
        // obj3d.position.copy(intersect.point)

        // let obj3d = new THREE.Sprite(s.mtl);
        // let scale = .005
        // obj3d.scale.set(scale, scale, scale, )
        // obj3d.position.copy(intersect.point)
        // this.group.add(obj3d)
      }
    }
  }
  get_random_sphere_position(radius) {
    let position = new THREE.Vector3(Math.random() - .5, Math.random() - .5, Math.random() - .5, )
    position.normalize().multiplyScalar(radius)
    return position
  }
  get_color(ctx, uv) {
    return ctx.getImageData(uv.x * ctx.canvas.width, (1 - uv.y) * ctx.canvas.height, 1, 1)
  }
}

export default AreaCalc

/*//console use
  for(let i=0;i<1000;i++){
    console.log(i)
    area_clac.add_dot()
  }
*/
