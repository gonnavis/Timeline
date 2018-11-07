<template>
  <div class="component Map full">
    <div class="container full" ref="container" v-hammer:tap="tap"></div>
  </div>
</template>

<script>
export default {
  name: 'Map',
  props: ['p'],
  components:{},
  data () {
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
    }
  },
  mounted(){
    let s=window.smap=this
    s.r=s.$refs

    s.init_three()
    s.scene.add(s.group_boundary)
  },
  methods:{
    vec3(vec3){
      return new THREE.Vector3().copy(vec3)
    },
    tap(he){
      let s=this
      s.mouse.x=(he.center.x/window.innerWidth)*2-1
      s.mouse.y=-(he.center.y/window.innerHeight)*2+1

      s.raycaster.setFromCamera(s.mouse, s.camera)
      let intersect=s.raycaster.intersectObject(s.mesh_earth)[0]
      // console.log(intersect)
      if(intersect){
        // s.point.copy(intersect.point)
        s.vec3s_boundary_dot.push(s.vec3(intersect.point))
        s.draw_boundary()
      }

      if(s.state==='idle'){
        s.state='start'
      }else if(s.state==='start'){
      }

      // s.add_point(s.point, )
      // s.add_point_same_distance(s.point, 10)
    },
    draw_boundary(){
      let s=this

      s.group_boundary.remove(...s.obj3ds_boundary_dot)
      s.obj3ds_boundary_dot.forEach(obj=>{
        obj.geometry=null
        obj.material=null
        obj=null
      })
      s.obj3ds_boundary_dot=[]

      s.group_boundary.remove(...s.obj3ds_boundary_line)
      s.obj3ds_boundary_line.forEach(obj=>{
        obj.geometry=null
        obj.material=null
        obj=null
      })
      s.obj3ds_boundary_line=[]


      s.vec3s_boundary_dot.forEach((vec3_dot, i)=>{
        let geo=new THREE.IcosahedronBufferGeometry(.1, 2)
        let mtl=new THREE.MeshBasicMaterial({color:'red'})
        let obj3d=new THREE.Mesh(geo, mtl)

        s.group_boundary.add(obj3d)
        s.obj3ds_boundary_dot.push( obj3d )

        obj3d.position.copy(vec3_dot)

      })


      let prev_dot=s.vec3s_boundary_dot[0]
      for(let i=1;i<s.vec3s_boundary_dot.length;i++){
        let dot=s.vec3s_boundary_dot[i]

        let line3=new THREE.Line3(prev_dot, dot)
        let geo=new THREE.Geometry()
        let mtl=new THREE.LineBasicMaterial({color:'red'})
        for(let i=0, len=5;i<len;i++){
          let vec3=new THREE.Vector3()
          line3.at(i/(len-1), vec3)
          geo.vertices.push(s.set_distance(vec3, 10.05))
          // geo.vertices.push(vec3)
        }
        let line=new THREE.Line(geo, mtl)

        s.group_boundary.add(line)
        s.obj3ds_boundary_line.push( line )


        prev_dot=s.vec3s_boundary_dot[i]
      }

// debugger
      if(s.dragControls)  s.dragControls.dispose()
      var dragControls = s.dragControls = new THREE.DragControls( s.obj3ds_boundary_dot, s.camera, s.renderer.domElement );
      dragControls.addEventListener( 'dragstart', function ( event ) { s.controls.enabled = false; } );
      dragControls.addEventListener( 'dragend', function ( event ) { 
        // console.log(event)
        let index=s.obj3ds_boundary_dot.findIndex(n=>n===event.object)
        s.vec3s_boundary_dot[index].copy(s.obj3ds_boundary_dot[index].position)
        s.draw_boundary()
        s.controls.enabled = true; 
      } );
    },
    tap_boundary(he){
      let s=this
      s.mouse.x=(he.center.x/window.innerWidth)*2-1
      s.mouse.y=-(he.center.y/window.innerHeight)*2+1

      s.raycaster.setFromCamera(s.mouse, s.camera)
      let intersect=s.raycaster.intersectObject(s.mesh_earth)[0]
      if(intersect){
        s.point.copy(intersect.point)
      }

      if(s.state==='idle'){
        s.state='start'
        s.prev_point=new THREE.Vector3().copy(s.point)
      }else if(s.state==='start'){
        s.line3=new THREE.Line3(s.prev_point, s.point)
        let geo=new THREE.Geometry()
        let mtl=new THREE.LineBasicMaterial({color:'red'})
        for(let i=0, len=5;i<len;i++){
          console.log(111)
          let point=new THREE.Vector3()
          s.line3.at(i/(len-1), point)
          geo.vertices.push(s.set_distance(point, 10.05))
        }
        let line=new THREE.Line(geo, mtl)
        s.scene.add(line)


        s.prev_point.copy(s.point)
      }

      // s.add_point(s.point, )
      s.add_point_same_distance(s.point, 10)
    },
    add_point(vec3){
      let s=this

      let geo=new THREE.IcosahedronBufferGeometry(.1,3)
      let mtl=new THREE.MeshBasicMaterial({color:'red'})
      let obj3d=new THREE.Mesh(geo, mtl)
      s.scene.add(obj3d)
      obj3d.position.copy(vec3)
      return obj3d
    },
    add_point_same_distance(vec3, distance){
      let s=this

      let geo=new THREE.IcosahedronBufferGeometry(.1,3)
      let mtl=new THREE.MeshBasicMaterial({color:'red'})
      let mesh=new THREE.Mesh(geo, mtl)
      s.scene.add(mesh)


      mesh.position.copy(s.set_distance(vec3, distance))
    },
    set_distance(vec3, distance){
      let vec3_result=new THREE.Vector3().copy(vec3)
      vec3_result.normalize()
      vec3_result.multiplyScalar(distance)
      return vec3_result
    },
    add_arc(){
      let s=this
      let radius=10.1
      let start=0
      let end=2*Math.PI
      end=Math.PI/3
      let curve = new THREE.EllipseCurve(
        0,  0,            // ax, aY
        radius, radius,           // xRadius, yRadius
        start,  end,  // aStartAngle, aEndAngle
        false,            // aClockwise
        0                 // aRotation
      );

      let points = curve.getPoints( 50 );
      let geometry = new THREE.BufferGeometry().setFromPoints( points );

      let material = new THREE.LineBasicMaterial( { color : 0xff0000 } );

      // Create the final object to add to the scene
      let arc = s.arc = new THREE.Line( geometry, material );
      s.scene.add( arc );
    },
    mousemove(e){
      let s=this
      s.mouse.x=(e.clientX/window.innerWidth)*2-1
      s.mouse.y=-(e.clientY/window.innerHeight)*2+1
      // console.log(s.mouse.x, s.mouse.y)
    },
    init_three(){
      let s=this

      var scene= s.scene = new THREE.Scene();
      var camera = s.camera = new THREE.PerspectiveCamera( 45, window.innerWidth/window.innerHeight, 0.1, 1000 );

      scene.add( new THREE.AmbientLight( 0xffffff, 2.5 ) );
      // var light = new THREE.PointLight( 0xffffff );
      // light.position.set(-3,6,10);
      // scene.add( light );


      var renderer = s.renderer = new THREE.WebGLRenderer();
      renderer.setSize( window.innerWidth, window.innerHeight );
      s.r.container.appendChild( renderer.domElement );

      // var geometry = new THREE.SphereBufferGeometry( 5, 32, 32 );
      var geometry = s.geometry = new THREE.IcosahedronBufferGeometry(10, 4)
      // var material = new THREE.MeshLambertMaterial( { 
      var material = s.material = new THREE.MeshStandardMaterial( { 
        color: 0xffffff,
        map: new THREE.TextureLoader().load(require('../assets/thematicmapping/2_no_clouds_4k.jpg')),
        // map: new THREE.TextureLoader().load(require('../assets/map_color.jpg')),
        // displacementMap: new THREE.TextureLoader().load(require('../assets/map_height.jpg')),
        displacementScale: .3,
      } );
      var mesh_earth = s.mesh_earth = new THREE.Mesh( geometry, material );
      mesh_earth.rotation.y=-.2
      scene.add( mesh_earth );

      camera.position.set(0,10,26);

      var controls = s.controls = new THREE.OrbitControls(camera , renderer.domElement);

      // helper
        var helper={};
        helper.gridHelper = new THREE.GridHelper( 20 , 20 );
        scene.add( helper.gridHelper );

        helper.geometry_x = new THREE.BoxGeometry( 10 , 0.1 , 0.1 );
        helper.material_x = new THREE.MeshBasicMaterial( {color:'red'});
        helper.mesh_x=new THREE.Mesh(helper.geometry_x,helper.material_x);
        helper.mesh_x.position.x=5;
        helper.gridHelper.add(helper.mesh_x);

        helper.geometry_y = new THREE.BoxGeometry( .1 , 10 , 0.1 );
        helper.material_y = new THREE.MeshBasicMaterial( {color:'green'});
        helper.mesh_y=new THREE.Mesh(helper.geometry_y,helper.material_y);
        helper.mesh_y.position.y=5;
        helper.gridHelper.add(helper.mesh_y);

        helper.geometry_z = new THREE.BoxGeometry( .1 , .1 , 10 );
        helper.material_z = new THREE.MeshBasicMaterial( {color:'blue'});
        helper.mesh_z=new THREE.Mesh(helper.geometry_z,helper.material_z);
        helper.mesh_z.position.z=5;
        helper.gridHelper.add(helper.mesh_z);

      var animate = function () {
        requestAnimationFrame( animate );

        renderer.render(scene, camera);
      };

      animate();
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
