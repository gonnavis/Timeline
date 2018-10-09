<template>
  <div class="component timeline" ref="container">
    
  </div>
</template>

<script>
// import data from './data.js'
import timelines from './preprocess_data.js'
export default {
  name: 'timeline',
  data () {
    return {
      r:null,
      scene:null,
      camera:null,
      period_height:100,
      groupTimelines:new THREE.Group(),
    }
  },
  created(){
    let s=window.s=this
    console.log(timelines)
  },
  mounted(){
    let s=this
    s.r=s.$refs

    s.init_three()
    s.init_timelines()
  },
  methods:{
    init_three(){
      let s=this

      var scene = s.scene = window.scene = new THREE.Scene();

      let width=window.innerWidth
      let height=window.innerHeight
      var camera = s.camera = window.camera = new THREE.OrthographicCamera( width / - 2, width / 2, height / 2, height / - 2, 1, 10000000 );



      var renderer = new THREE.WebGLRenderer();
      renderer.setSize( window.innerWidth, window.innerHeight );
      s.r.container.appendChild( renderer.domElement );

      camera.zoom=.08
      camera.position.set(-3500,10,0)
      camera.lookAt(-3500,0,0)
      camera.updateProjectionMatrix()


      // event
      window.addEventListener('mousewheel', function(e){
        s.groupTimelines.scale.x+=-e.deltaY/1000;
      })



      // helper
        var helper={};
        helper.gridHelper = new THREE.GridHelper( 20 , 20 );
        scene.add( helper.gridHelper );

        helper.geometry_x = new THREE.BoxGeometry( 10 , 0.1 , 0.1 );
        helper.material_x = new THREE.MeshBasicMaterial( {color:'red'});
        helper.mesh_x=new THREE.Mesh(helper.geometry_x,helper.material_x);
        helper.mesh_x.position.x=5;
        scene.add(helper.mesh_x);

        helper.geometry_y = new THREE.BoxGeometry( .1 , 10 , 0.1 );
        helper.material_y = new THREE.MeshBasicMaterial( {color:'green'});
        var mesh_y=new THREE.Mesh(helper.geometry_y,helper.material_y);
        mesh_y.position.y=5;
        scene.add(mesh_y);

        helper.geometry_z = new THREE.BoxGeometry( .1 , .1 , 10 );
        helper.material_z = new THREE.MeshBasicMaterial( {color:'blue'});
        helper.mesh_z=new THREE.Mesh(helper.geometry_z,helper.material_z);
        helper.mesh_z.position.z=5;
        scene.add(helper.mesh_z);



      var animate = function () {
        requestAnimationFrame( animate );

        renderer.render(scene, camera);
      };

      animate();
    },
    init_timelines(){
      let s=this
      s.groupTimelines.rotation.x=Math.PI/2;
      s.scene.add(s.groupTimelines);
      timelines[0].rows.forEach((row,ri)=>{
        row.forEach((period,pi)=>{
          let geo=new THREE.PlaneBufferGeometry(period.span, s.period_height)
          let mtl=new THREE.MeshBasicMaterial({color:period.color, side:THREE.DoubleSide})
          let mesh=new THREE.Mesh(geo, mtl)
          // mesh.rotation.x=Math.PI/2
          mesh.position.x=period.from+period.span/2;
          mesh.position.y=ri*s.period_height
          s.groupTimelines.add(mesh)
        })
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
