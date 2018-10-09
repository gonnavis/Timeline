
VSHammer = function(dom, option){
  this.dom=dom;

  this.state='idle';
  this.mouse={x:0, y:0};
  this.handler={
    pans: [],
  }

  this.dom.addEventListener('mousedown', ne=>{
    // console.log('mousedown')
    // console.log(ne)
    ne.preventDefault();

    if(ne.button===0){
      this.state='left';
    }

    this.mouse.x=ne.clientX;
    this.mouse.y=ne.clientY;
  })

  this.dom.addEventListener('mouseup', ne=>{
    this.state='idle';
  })

  this.dom.addEventListener('mouseleave', ne=>{
    this.state='idle';
  })

  this.dom.addEventListener('mousemove', ne=>{
    // console.log(ne)
    let deltaX=ne.clientX-this.mouse.x
    let deltaY=ne.clientY-this.mouse.y

    if(this.state==='left' && (deltaX || deltaY)){
      this.state='pan';
    }

    if(this.state==='pan'){
      this.handler.pans.forEach(pan=>{
        pan({ne, deltaX, deltaY});
      })
    }

    this.mouse.x=ne.clientX;
    this.mouse.y=ne.clientY;
  })

}

VSHammer.prototype.on=function(event_type, handler){
  this.handler[event_type+'s'].push(handler);
}