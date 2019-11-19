import * as THREE from '../lib/three.module.js';
import { getUvFromSpherePosition } from './getSpherePositionFromUv.js'
import { SelectionBox } from '../lib/SelectionBox_this.js';
import { SelectionHelper } from '../lib/SelectionHelper_this.js';

class AreaCalc {
  raycaster = new THREE.Raycaster();
  group = new THREE.Group()
  count = 0

  origins = []

  // mesh_type = 'icosahedron'
  mesh_type = 'instanced'
  // mesh_type = 'sprite'
  // mesh_type = 'points'

  icosahedron_geo = new THREE.IcosahedronBufferGeometry(.05, 1);
  instanced_geo = new THREE.IcosahedronBufferGeometry(.02, 1);
  instanced_mtl = new THREE.MeshBasicMaterial({ color: "black" });
  instanced_mesh;
  instanced_dummy = new THREE.Object3D();
  points_geo = new THREE.BufferGeometry()
  points_vertices = []
  points_mtl = new THREE.PointsMaterial({ size: 5, sizeAttenuation: false, color: 'black' })
  points_mesh;
  points_used_index = 0

  imageData

  constructor(arg = { mesh, }) {
    let s = this
    s.arg = arg

    if (s.mesh_type === 'points') {
      s.points_vertices.length = 1000000 * 3
      s.points_vertices.fill(0)
      s.points_geo.setAttribute('position', new THREE.Float32BufferAttribute(s.points_vertices, 3))
      s.points_mesh = new THREE.Points(s.points_geo, s.points_mtl)
      s.group.add(s.points_mesh)
    } else if (s.mesh_type === 'instanced') {
      s.instanced_mesh = new THREE.InstancedMesh(s.instanced_geo, s.instanced_mtl, 1e5)
      s.group.add(s.instanced_mesh)
    }

    // var selectionBox = new SelectionBox(s.arg.camera, s.arg.scene);
    var selectionBox = new SelectionBox(s.arg.camera, s.group);
    var helper = new SelectionHelper(selectionBox, s.arg.renderer, 'selectBox');
    document.addEventListener('mousedown', function(event) {
      if (event.button !== 2) return

      let camera_length = camera.position.length()
      area_clac.group.children = area_clac.group.children.filter(n => camera.position.clone().sub(n.position).length() < camera_length)

      for (var item of selectionBox.collection) {
        item.material.color.set('black')
      }
      selectionBox.startPoint.set(
        (event.clientX / window.innerWidth) * 2 - 1,
        -(event.clientY / window.innerHeight) * 2 + 1,
        0.5
      );
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
          allSelected[i].material.color.set('blue')
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
        allSelected[i].material.color.set('blue')
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
    const arr_color = s.get_color(ctx_regions, uv)
    if (arr_color[0] === 255 && arr_color[1] === 0 && arr_color[2] === 0) {

      s.origins.push(origin)

      if (s.mesh_type === 'points') {
        s.points_mesh.geometry.attributes.position.array[s.points_used_index + 0] = origin.x
        s.points_mesh.geometry.attributes.position.array[s.points_used_index + 1] = origin.y
        s.points_mesh.geometry.attributes.position.array[s.points_used_index + 2] = origin.z
        s.points_mesh.geometry.attributes.position.needsUpdate = true

        s.points_used_index += 3
      } else if (s.mesh_type === 'instanced') {
        // debugger
        s.instanced_dummy.position.copy(origin)
        // s.instanced_dummy.position.set(origin.x, origin.y, origin.z)
        // s.instanced_dummy.position.set(10, 10, 10)
        // s.instanced_dummy.rotation.y = (Math.sin(x / 4 + time) + Math.sin(y / 4 + time) + Math.sin(z / 4 + time));
        // s.instanced_dummy.rotation.z = s.instanced_dummy.rotation.y * 2;
        s.instanced_dummy.updateMatrix();
        s.instanced_mesh.setMatrixAt(s.count, s.instanced_dummy.matrix)
        s.instanced_mesh.instanceMatrix.needsUpdate = true;
      } else {
        let obj3d
        if (s.mesh_type === 'icosahedron') {
          let mtl = new THREE.MeshBasicMaterial({ color: "black" });
          obj3d = new THREE.Mesh(s.icosahedron_geo, mtl);
        } else if (s.mesh_type === 'sprite') {
          let mtl = new THREE.SpriteMaterial({ color: 'black', sizeAttenuation: false });
          obj3d = new THREE.Sprite(mtl);
          let scale = .005
          obj3d.scale.set(scale, scale, scale, )
        }
        obj3d.position.copy(origin)
        this.group.add(obj3d)
      }

      s.count++
    }
    // }
  }
  get_random_sphere_position(radius) {
    let position = new THREE.Vector3(Math.random() - .5, Math.random() - .5, Math.random() - .5, )
    position.normalize().multiplyScalar(radius)
    return position
  }
  get_color(ctx, uv) {
    let s = this
    if (!s.imageData) {
      s.imageData = ctx_regions.getImageData(0, 0, ctx_regions.canvas.width, ctx_regions.canvas.height)
    }
    // return ctx.getImageData(uv.x * ctx.canvas.width, (1 - uv.y) * ctx.canvas.height, 1, 1)
    let xy = {
      x: Math.round(uv.x * ctx.canvas.width),
      y: Math.round((1 - uv.y) * ctx.canvas.height),
    }
    let index = vs.xy_to_serial(ctx.canvas.width, xy) * 4
    return [
      s.imageData.data[index + 0],
      s.imageData.data[index + 1],
      s.imageData.data[index + 2],
    ]
  }
}

export default AreaCalc

/*//console use

  //area_clac.group.children=[]
  area_clac.imageData=null
  for(let i=0;i<1e6;i++){ //一百万个随机采样点
    area_clac.add_dot()
  }
  console.log('ok')
  //为什conole里一万一次分批执行, 后面会越来越快?


  //remove all backface, backface cull
  camera_length = camera.position.length()
  area_clac.group.children = area_clac.group.children.filter(n=>camera.position.clone().sub(n.position).length()<camera_length)

  area_clac.group.children=[]

*/
