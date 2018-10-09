
VSHammer = function(camera, domElement, root, callbackIntersect){
  window.svc=this;
  this.camera=camera;
  this.domElement=domElement
  this.root=root;

  this.state='idle';

  this.raycaster = new THREE.Raycaster();
  this.mouse=new THREE.Vector2();

  this.focus=new THREE.Vector3().copy(this.root.position);

  window.addEventListener('contextmenu', event=>{
    event.preventDefault();
  })

  this.controlCoefficientPan=1;
  this.controlCoefficientRotate=5;
  this.controlCoefficientZoom=1;

  window.addEventListener('mousedown', event=>{
    // console.log('mousedown')
    // console.log(event)
    event.preventDefault();
    this.mouse.x=(event.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y=-(event.clientY / window.innerHeight) * 2 + 1;

    if(event.button===0){
      this.state='l';
    }else if(event.button===1){
      this.state='m';
    }else if(event.button===2){
      this.state='r';
    }
    
    if(this.state==='l'){
      this.raycaster.setFromCamera( this.mouse, this.camera );
      var intersects = this.raycaster.intersectObjects( this.root.children, true );
      if(intersects.length>0){
        this.focus=intersects[0].point;
        callbackIntersect(intersects);
      }else{
        callbackIntersect(null);
      }
    }
  })

  window.addEventListener('mouseup', event=>{
    this.state='idle';
  })

  window.addEventListener('mouseleave', event=>{
    // this.state='idle';
  })

  window.addEventListener('mousemove', event=>{
    // console.log(event)
    this.deltaX=((event.clientX / window.innerWidth) * 2 - 1)-this.mouse.x
    this.deltaY=(-(event.clientY / window.innerHeight) * 2 + 1)-this.mouse.y

    if(this.state==='l'){
      let matRY=new THREE.Matrix4().makeRotationY(this.deltaX*this.controlCoefficientRotate)
      vs.threejs_rotateByPivot(this.root, matRY, this.focus);
      let matRX=new THREE.Matrix4().makeRotationX(-this.deltaY*this.controlCoefficientRotate)
      vs.threejs_rotateByPivot(this.root, matRX, this.focus);
    }else if(this.state==='r'){
      this.controlCoefficientPan=new THREE.Vector3().subVectors(this.focus, this.camera.position).length();
      this.controlCoefficientPan/=10;
      // console.log(this.controlCoefficientPan);
      let quaternion=new THREE.Quaternion()
      this.camera.getWorldQuaternion(quaternion)
      this.root.position.sub(new THREE.Vector3(-this.deltaX*this.controlCoefficientPan,-this.deltaY*this.controlCoefficientPan,0).applyQuaternion(quaternion).multiplyScalar(10));
    }

    this.mouse.x=(event.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y=-(event.clientY / window.innerHeight) * 2 + 1;
  })

  window.addEventListener('mousewheel', event=>{
    // let vec3=new THREE.Vector3().subVectors(this.focus, this.camera.position);
    // console.log(new THREE.Vector3().copy(vec3).normalize());
    // let length=vec3.length();
    // length+=event.deltaY/100;
    // let newVec3=new THREE.Vector3().copy(vec3).setLength(length);
    // if((vec3.x<0&&newVec3.x<0) || (vec3.x>=0&&newVec3.x>=0)){
    //   let newPosition=new THREE.Vector3().addVectors(this.camera.position, newVec3);
    //   this.root.position.copy(newPosition);
    // }
    this.controlCoefficientZoom=new THREE.Vector3().subVectors(this.focus, this.camera.position).length();
    this.controlCoefficientZoom/=10;
    let vec3=new THREE.Vector3().subVectors(this.focus, this.camera.position);
    vec3.normalize().multiplyScalar(event.deltaY/100).multiplyScalar(this.controlCoefficientZoom);
    // console.log(vec3);
    this.root.position.add(vec3);
    this.focus.add(vec3);
  })

}

// THREE.VisControls.prototype.update=function(){
// }