<template>
  <div class="component Map full">
    <div class="three_container full" ref="three_container" v-hammer:tap="tap"></div>
  </div>
</template>

<script>
/*
  export map
  JSON.stringify({
    boundary :smap.vec3s_boundary_dot,
    camera_position: smap.camera.position,
  })
*/
import { get_twha_canvas, update_twha_canvas } from '../twha/get_twha_canvas.js'
import data from './data.js'
import global from './preprocess_data.js'
import { OrbitControls } from '../lib/OrbitControls_this.js'
export default {
  name: 'Map',
  props: ['p'],
  components: {},
  data() {
    return {
      raycaster: new THREE.Raycaster(),
      mouse: new THREE.Vector2(),
      point: new THREE.Vector3(),
      state: 'idle',
      vec3s_boundary_dot: [],
      vec3s_boundary_line: [],
      group_boundary: new THREE.Group(),
      obj3ds_boundary_dot: [],
      obj3ds_boundary_line: [],
      camera_distance: 35,
      // stats: new Stats()
    }
  },
  created() {
    //test
    let s = this
    s.p.canvasTexture_twha = new THREE.CanvasTexture(get_twha_canvas())
  },
  mounted() {
    let s = (window.smap = this)
    s.r = s.$refs
    window.data = data

    // document.body.appendChild(s.stats.dom);

    s.init_three()
    s.scene.add(s.p.group_text)
    s.scene.add(s.group_boundary)

    // s.prepare_boundarys();

    let init_draw_name = ''
    if (init_draw_name) {
      let index
      index = data[0].periods.findIndex((n) => n.name === init_draw_name)
      data[0].periods[index].map.boundary.forEach((xyz) => {
        s.vec3s_boundary_dot.push(new THREE.Vector3(...Object.values(xyz)))
      })
      s.draw_boundary()
      s.camera.position.copy(data[0].periods[index].map.camera_position)
      // s.camera.position.multiplyScalar(s.camera_distance)
      s.camera.lookAt(0, 0, 0)
    }
  },
  methods: {
    vec3(vec3) {
      return new THREE.Vector3().copy(vec3)
    },
    tap(he) {
      let s = this
      if (!s.p.is_edit) return
      s.mouse.x = (he.center.x / window.innerWidth) * 2 - 1
      s.mouse.y = -(he.center.y / window.innerHeight) * 2 + 1

      s.raycaster.setFromCamera(s.mouse, s.camera)
      let intersect = s.raycaster.intersectObject(s.mesh_earth)[0]
      // console.log(intersect)
      if (intersect) {
        // s.point.copy(intersect.point)
        s.vec3s_boundary_dot.push(s.vec3(intersect.point))
        s.draw_boundary()
      }

      if (s.state === 'idle') {
        s.state = 'start'
      } else if (s.state === 'start') {
      }

      // s.add_point(s.point, )
      // s.add_point_same_distance(s.point, 10)
    },
    draw_boundary() {
      let s = this

      s.group_boundary.remove(...s.obj3ds_boundary_dot)
      s.obj3ds_boundary_dot.forEach((obj) => {
        obj.geometry = null
        obj.material = null
        obj = null
      })
      s.obj3ds_boundary_dot = []

      s.group_boundary.remove(...s.obj3ds_boundary_line)
      s.obj3ds_boundary_line.forEach((obj) => {
        obj.geometry = null
        obj.material = null
        obj = null
      })
      s.obj3ds_boundary_line = []

      s.vec3s_boundary_dot.forEach((vec3_dot, i) => {
        let geo = new THREE.IcosahedronBufferGeometry(0.07, 2)
        let mtl = new THREE.MeshBasicMaterial({ color: 'red' })
        let obj3d = new THREE.Mesh(geo, mtl)

        if (s.p.is_edit) s.group_boundary.add(obj3d)
        s.obj3ds_boundary_dot.push(obj3d)

        obj3d.position.copy(vec3_dot)
      })

      let prev_dot = s.vec3s_boundary_dot[0]
      for (let i = 1; i < s.vec3s_boundary_dot.length; i++) {
        let dot = s.vec3s_boundary_dot[i]
        add_line(prev_dot, dot)

        prev_dot = s.vec3s_boundary_dot[i]
      }
      add_line(prev_dot, s.vec3s_boundary_dot[0])

      function add_line(prev_dot, dot) {
        let line3 = new THREE.Line3(prev_dot, dot)
        let geo = new THREE.Geometry()
        let mtl = new THREE.LineBasicMaterial({ color: 'red' })
        let len = Math.ceil(line3.distance()) + 1
        // console.log(line3.distance(), len)
        for (let i = 0; i < len; i++) {
          let vec3 = new THREE.Vector3()
          line3.at(i / (len - 1), vec3)
          geo.vertices.push(s.set_distance(vec3, 10.02))
          // geo.vertices.push(vec3)
        }
        let line = new THREE.Line(geo, mtl)

        s.group_boundary.add(line)
        s.obj3ds_boundary_line.push(line)
      }

      if (s.dragControls) s.dragControls.dispose()
      var dragControls = (s.dragControls = new THREE.DragControls(s.obj3ds_boundary_dot, s.camera, s.renderer.domElement))
      dragControls.addEventListener('dragstart', function(event) {
        s.controls.enabled = false
      })
      dragControls.addEventListener('dragend', function(event) {
        // console.log(event)
        let index = s.obj3ds_boundary_dot.findIndex((n) => n === event.object)
        s.vec3s_boundary_dot[index].copy(s.obj3ds_boundary_dot[index].position)
        s.draw_boundary()
        s.controls.enabled = true
      })
    },
    prepare_boundarys() {
      let s = this

      for (let i = 0; i < data.length; i++) {
        let area = data[i]
        for (let j = 0; j < area.periods.length; j++) {
          let period = area.periods[j]
          if (!period.map.boundary) continue
          for (let k = 0; k < period.map.boundary.length; k++) {
            period.map.boundary[k] = new THREE.Vector3(...Object.values(period.map.boundary[k]))
          }
        }
      }

      for (let i = 0; i < data.length; i++) {
        let area = data[i]
        for (let j = 0; j < area.periods.length; j++) {
          let period = area.periods[j]
          if (!period.map.boundary) continue
          let boundary_mesh = (s.boundary_mesh = new THREE.Group())
          boundary_mesh.visible = false
          let prev_dot = period.map.boundary[0]
          for (let k = 1; k < period.map.boundary.length; k++) {
            let dot = period.map.boundary[k]
            add_line(prev_dot, dot)

            prev_dot = period.map.boundary[k]
          }
          add_line(prev_dot, period.map.boundary[0])

          function add_line(prev_dot, dot) {
            let line3 = new THREE.Line3(prev_dot, dot)
            let geo = new THREE.Geometry()
            let mtl = new THREE.LineBasicMaterial({
              color: 'red',
              // linewidth: 1,
            })
            let len = Math.ceil(line3.distance()) + 1
            // console.log(line3.distance(), len)
            for (let l = 0; l < len; l++) {
              let vec3 = new THREE.Vector3()
              line3.at(l / (len - 1), vec3)
              geo.vertices.push(s.set_distance(vec3, 10.02))
              // geo.vertices.push(vec3)
            }
            let line = new THREE.Line(geo, mtl)

            boundary_mesh.add(line)
            s.scene.add(boundary_mesh)
          }

          // function add_line(prev_dot, dot){
          //   let line3=new THREE.Line3(prev_dot, dot)
          //   let len=Math.ceil(line3.distance())+1
          //   // console.log(line3.distance(), len)
          //   let positions = [];
          //   let colors = [];
          //   for(let l=0;l<len;l++){
          //     let vec3=new THREE.Vector3()
          //     line3.at(l/(len-1), vec3)
          //     vec3=s.set_distance(vec3, 10.05)
          //     // geo.vertices.push(s.set_distance(vec3, 10.02))
          //     // geo.vertices.push(vec3)
          //     positions.push(vec3.x, vec3.y, vec3.z)
          //     colors.push(1,0,0)
          //   }
          //   let geometry = new THREE.LineGeometry();
          //   geometry.setPositions( positions );
          //   geometry.setColors( colors );

          //   let matLine = new THREE.LineMaterial( {

          //     color: 0xffffff,
          //     linewidth: .003, // in pixels
          //     vertexColors: THREE.VertexColors,
          //     //resolution:  // to be set by renderer, eventually
          //     dashed: false

          //   } );

          //   let line = new THREE.Line2( geometry, matLine );
          //   line.computeLineDistances();
          //   line.scale.set( 1, 1, 1 );

          //   boundary_mesh.add(line)
          //   s.scene.add(boundary_mesh)
          // }
          period.map.boundary_mesh = boundary_mesh
        }
      }
    },
    add_point(vec3) {
      let s = this

      let geo = new THREE.IcosahedronBufferGeometry(0.1, 3)
      let mtl = new THREE.MeshBasicMaterial({ color: 'red' })
      let obj3d = new THREE.Mesh(geo, mtl)
      s.scene.add(obj3d)
      obj3d.position.copy(vec3)
      return obj3d
    },
    add_point_same_distance(vec3, distance) {
      let s = this

      let geo = new THREE.IcosahedronBufferGeometry(0.1, 3)
      let mtl = new THREE.MeshBasicMaterial({ color: 'red' })
      let mesh = new THREE.Mesh(geo, mtl)
      s.scene.add(mesh)

      mesh.position.copy(s.set_distance(vec3, distance))
    },
    set_distance(vec3, distance) {
      let vec3_result = new THREE.Vector3().copy(vec3)
      vec3_result.normalize()
      vec3_result.multiplyScalar(distance)
      return vec3_result
    },
    add_arc() {
      let s = this
      let radius = 10.1
      let start = 0
      let end = 2 * Math.PI
      end = Math.PI / 3
      let curve = new THREE.EllipseCurve(
        0,
        0, // ax, aY
        radius,
        radius, // xRadius, yRadius
        start,
        end, // aStartAngle, aEndAngle
        false, // aClockwise
        0 // aRotation
      )

      let points = curve.getPoints(50)
      let geometry = new THREE.BufferGeometry().setFromPoints(points)

      let material = new THREE.LineBasicMaterial({ color: 0xff0000 })

      // Create the final object to add to the scene
      let arc = (s.arc = new THREE.Line(geometry, material))
      s.scene.add(arc)
    },
    mousemove(e) {
      let s = this
      s.mouse.x = (e.clientX / window.innerWidth) * 2 - 1
      s.mouse.y = -(e.clientY / window.innerHeight) * 2 + 1
      // console.log(s.mouse.x, s.mouse.y)
    },
    init_three() {
      let s = this

      var scene = (s.scene = new THREE.Scene())
      window.scene = scene //test
      var camera = (s.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000))
      window.camera = camera //test

      scene.add(new THREE.AmbientLight(0xffffff, 2.5))
      // var light = new THREE.PointLight( 0xffffff );
      // light.position.set(-3,6,10);
      // scene.add( light );

      var renderer = (s.renderer = new THREE.WebGLRenderer())
      renderer.setSize(window.innerWidth, window.innerHeight)
      renderer.setClearColor('rgb(80,80,80)')
      renderer.setPixelRatio(devicePixelRatio)
      s.r.three_container.appendChild(renderer.domElement)

      // var geometry = new THREE.SphereBufferGeometry( 5, 32, 32 );
      // var geometry = (s.geometry = new THREE.IcosahedronBufferGeometry(10, 4));
      var geometry = (s.geometry = new THREE.IcosahedronGeometry(10, 4))

      // // var material = new THREE.MeshLambertMaterial( {
      // var material = (s.material = new THREE.MeshStandardMaterial({
      //   color: 0xffffff,
      //   map: new THREE.CanvasTexture(get_twha_canvas())
      //   // map: new THREE.TextureLoader().load(require('../assets/thematicmapping/2_no_clouds_4k.jpg')),
      //   // map: new THREE.TextureLoader().load(require('../assets/twha_year_0.png')),
      //   // map: new THREE.TextureLoader().load(require('../assets/map_color.jpg')),
      //   // displacementMap: new THREE.TextureLoader().load(require('../assets/map_height.jpg')),
      //   // displacementScale: .3,
      // }));

      var uniforms = {
        tOne: {
          type: 't',
          value: new THREE.TextureLoader().load(require('../assets/thematicmapping/2_no_clouds_4k.jpg')),
        },
        // tSec: { type: "t", value: new THREE.TextureLoader().load(require('../assets/twha_year_0.png')) },
        tSec: { type: 't', value: s.p.canvasTexture_twha },
      }
      s.p.uniforms = uniforms
      var material = new THREE.ShaderMaterial({
        uniforms: uniforms,
        vertexShader: `
          varying vec2 vUv;

          void main()
          {
              vUv = uv;
              vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
              gl_Position = projectionMatrix * mvPosition;
          }
        `,
        fragmentShader: `
          #ifdef GL_ES
          precision highp float;
          #endif

          uniform sampler2D tOne;
          uniform sampler2D tSec;

          varying vec2 vUv;

          void main(void)
          {
            vec3 c;
            vec4 Ca = texture2D(tOne, vUv);
            vec4 Cb = texture2D(tSec, vUv);
            c = Ca.rgb * .6 + Cb.rgb * .4;  // blending equation //ok
            // c = Ca.rgb * Ca.a + Cb.rgb * Cb.a * (1.0 - Ca.a);  // blending equation
            // c = Ca.rgb *  Cb.rgb;  // blending equation
            // c = vec3( min(Ca.r,Cb.r), min(Ca.g,Cb.g), min(Ca.b,Cb.b)  );
            gl_FragColor= vec4(c, 1.0);
          }
        `,
      })

      s.p.material = material
      update_twha_canvas(0)
      var mesh_earth = (s.mesh_earth = new THREE.Mesh(geometry, material))
      mesh_earth.rotation.y = -0.2
      scene.add(mesh_earth)
      window.mesh_earth = mesh_earth //test

      // camera.position.set(0, 10, 26)
      camera.position.set(-14.523731303166098, 14.155641410831901, 19.09657155830265)

      var controls = (s.controls = new OrbitControls(camera, renderer.domElement))
      controls.enablePan = false
      controls.minDistance = 12
      controls.maxDistance = 100
      window.controls = controls //test
      controls.addEventListener('dolly', (e) => {
        map.update_info()
      })

      window.addEventListener('resize', onWindowResize, false)
      function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight
        camera.updateProjectionMatrix()
        renderer.setSize(window.innerWidth, window.innerHeight)
      }

      // helper
      // var helper={};
      // helper.gridHelper = new THREE.GridHelper( 20 , 20 );
      // scene.add( helper.gridHelper );

      // helper.geometry_x = new THREE.BoxGeometry( 10 , 0.1 , 0.1 );
      // helper.material_x = new THREE.MeshBasicMaterial( {color:'red'});
      // helper.mesh_x=new THREE.Mesh(helper.geometry_x,helper.material_x);
      // helper.mesh_x.position.x=5;
      // helper.gridHelper.add(helper.mesh_x);

      // helper.geometry_y = new THREE.BoxGeometry( .1 , 10 , 0.1 );
      // helper.material_y = new THREE.MeshBasicMaterial( {color:'green'});
      // helper.mesh_y=new THREE.Mesh(helper.geometry_y,helper.material_y);
      // helper.mesh_y.position.y=5;
      // helper.gridHelper.add(helper.mesh_y);

      // helper.geometry_z = new THREE.BoxGeometry( .1 , .1 , 10 );
      // helper.material_z = new THREE.MeshBasicMaterial( {color:'blue'});
      // helper.mesh_z=new THREE.Mesh(helper.geometry_z,helper.material_z);
      // helper.mesh_z.position.z=5;
      // helper.gridHelper.add(helper.mesh_z);

      var animate = function(time) {
        requestAnimationFrame(animate)

        // s.stats.update();
        TWEEN.update(time)
        renderer.render(scene, camera)
      }

      animate()
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
