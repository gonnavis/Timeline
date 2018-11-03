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
      state: 'idle',
    }
  },
  mounted(){
    let s=window.smap=this
    s.r=s.$refs

    s.init_three()
  },
  methods:{
    init_three(){
      let s=this

      var scene= s.scene = new THREE.Scene();
      var camera = s.camera = new THREE.PerspectiveCamera( 45, window.innerWidth/window.innerHeight, 0.1, 1000 );

      scene.add( new THREE.AmbientLight( 0xffffff, 2.5 ) );
      // var light = new THREE.PointLight( 0xffffff );
      // light.position.set(-3,6,10);
      // scene.add( light );


      var renderer = new THREE.WebGLRenderer();
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

      var controls = new THREE.OrbitControls(camera , renderer.domElement);

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
    tap(he){
      let s=this
      s.mouse.x=(he.center.x/window.innerWidth)*2-1
      s.mouse.y=-(he.center.y/window.innerHeight)*2+1

      if(s.state==='idle'){
        s.state='start'
      }else if(s.state==='start'){
        s.state='idle'
      }

      // s.add_point()
      s.add_point_same_distance(10)
    },
    add_point(){
      let s=this

      s.raycaster.setFromCamera(s.mouse, s.camera)
      let intersect=s.raycaster.intersectObject(s.mesh_earth)[0]
      if(intersect){
        // console.log(intersect)
        let geo=new THREE.IcosahedronBufferGeometry(.1,3)
        let mtl=new THREE.MeshBasicMaterial({color:'red'})
        let mesh=new THREE.Mesh(geo, mtl)
        s.scene.add(mesh)
        mesh.position.copy(intersect.point)
      }
    },
    add_point_same_distance(distance){
      let s=this

      s.raycaster.setFromCamera(s.mouse, s.camera)
      let intersect=s.raycaster.intersectObject(s.mesh_earth)[0]
      if(intersect){
        // console.log(intersect)
        let geo=new THREE.IcosahedronBufferGeometry(.1,3)
        let mtl=new THREE.MeshBasicMaterial({color:'red'})
        let mesh=new THREE.Mesh(geo, mtl)
        s.scene.add(mesh)


        mesh.position.copy(get_same_distance_vec3(intersect.point))
      }

      function get_same_distance_vec3(vec3){
        let vec3_result=new THREE.Vector3().copy(vec3)
        vec3_result.normalize()
        vec3_result.multiplyScalar(distance)
        return vec3_result
      }
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
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
