import * as THREE from '../lib/three.module.js';
import { getUvFromSpherePosition } from './getSpherePositionFromUv.js'
import { SelectionBox } from '../lib/SelectionBox.js';
import { SelectionHelper } from '../lib/SelectionHelper_this.js';

class AreaCalc {
  raycaster = new THREE.Raycaster();
  group = new THREE.Group()
  count = 0
  imageDatas = []

  geo = new THREE.IcosahedronBufferGeometry(.05, 1);


  constructor(arg = { mesh, }) {
    let s = this
    s.arg = arg

    // var selectionBox = new SelectionBox(s.arg.camera, s.arg.scene);
    var selectionBox = new SelectionBox(s.arg.camera, s.group);
    var helper = new SelectionHelper(selectionBox, s.arg.renderer, 'selectBox');
    document.addEventListener('mousedown', function(event) {
      if (event.button !== 2) return
      for (var item of selectionBox.collection) {
        item.material.color.set('black')
      }
      selectionBox.startPoint.set(
        (event.clientX / window.innerWidth) * 2 - 1,
        -(event.clientY / window.innerHeight) * 2 + 1,
        0.5);
    });
    document.addEventListener('mousemove', function(event) {
      return
      if (helper.isDown) {
        for (var i = 0; i < selectionBox.collection.length; i++) {
          selectionBox.collection[i].material.color.set('black')
        }
        selectionBox.endPoint.set(
          (event.clientX / window.innerWidth) * 2 - 1,
          -(event.clientY / window.innerHeight) * 2 + 1,
          0.5);
        var allSelected = selectionBox.select();
        for (var i = 0; i < allSelected.length; i++) {
          allSelected[i].material.color.set('white')
        }
      }
    });
    document.addEventListener('mouseup', function(event) {
      if (event.button !== 2) return
      selectionBox.endPoint.set(
        (event.clientX / window.innerWidth) * 2 - 1,
        -(event.clientY / window.innerHeight) * 2 + 1,
        0.5);
      var allSelected = selectionBox.select();
      console.log('allSelected', allSelected)
      for (var i = 0; i < allSelected.length; i++) {
        allSelected[i].material.color.set('white')
      }
    });

  }
  add_dot() {
    let s = this
    const origin = s.get_random_sphere_position(10)
    // const direction = new THREE.Vector3().sub(origin).normalize()
    //todo 自己写球面映射, 不要用raycaster
    // s.raycaster.set(origin, direction);
    // const intersects = s.raycaster.intersectObject(s.arg.mesh);
    // console.log(intersects)
    // const intersect = intersects[0]
    // window.intersect = intersect //todo
    // if (intersect) {
    const uv = getUvFromSpherePosition(origin)
    // console.log(uv)
    const imageData = s.get_color(ctx_regions, uv)
    // console.log(imageData.data)
    if (imageData.data[0] === 255 && imageData.data[1] === 0 && imageData.data[2] === 0) {

      s.count++
      // s.imageDatas.push(imageData)


      let mtl = new THREE.MeshBasicMaterial({ color: "black" });
      let obj3d = new THREE.Mesh(s.geo, mtl);


      // let mtl = new THREE.SpriteMaterial({ color: 'black', sizeAttenuation: false });
      // let obj3d = new THREE.Sprite(mtl);
      // let scale = .005
      // obj3d.scale.set(scale, scale, scale, )

      obj3d.position.copy(origin)
      this.group.add(obj3d)
    }
    // }
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
    area_clac.add_dot()
  }
  console.log('ok')
  //为什conole里一万一次分批执行, 后面会越来越快?


  //remove all backface, backface cull
  camera_length = camera.position.length()
  area_clac.group.children = area_clac.group.children.filter(n=>camera.position.clone().sub(n.position).length()<camera_length)



*/
