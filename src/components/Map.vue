<template>
  <div class="component Map full">
    <div class="container full" ref="container"></div>
  </div>
</template>

<script>
export default {
  name: 'Map',
  props: ['p'],
  components:{},
  data () {
    return {
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

      var scene = new THREE.Scene();
      var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

      scene.add( new THREE.AmbientLight( 0x333333 ) );
      var light = new THREE.PointLight( 0xffffff );
      light.position.set(-3,6,10);
      scene.add( light );


      var renderer = new THREE.WebGLRenderer();
      renderer.setSize( window.innerWidth, window.innerHeight );
      s.r.container.appendChild( renderer.domElement );

      var geometry = new THREE.SphereBufferGeometry( 5, 32, 32 );
      // var material = new THREE.MeshLambertMaterial( { 
      var material = new THREE.MeshBasicMaterial( { 
        color: 0xffffff,
        map: new THREE.TextureLoader().load(require('../assets/map_color.jpg')),
      } );
      var mesh = new THREE.Mesh( geometry, material );
      scene.add( mesh );

      camera.position.set(10,10,10);

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
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
