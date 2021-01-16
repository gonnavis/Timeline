VSHammer = function(dom, option) {
  /*
    poin = pointer, stands for both mouse and touch
    ne = native event
    ve = VSHammer event
  */
  this.dom = dom;

  this.state = 'idle';
  this.poin = { x: 0, y: 0 }; // pointer
  this.handler = {
    pans: [],
    downs: [],
    ups: [],
  }

  this.dom.addEventListener('mousedown', ne => {
    this.poindown(ne);
  })
  this.dom.addEventListener('touchstart', ne => {
    this.poindown(ne);
  })

  this.dom.addEventListener('mouseup', ne => {
    this.poinup(ne);
  })

  this.dom.addEventListener('touchend', ne => {
    this.poinup(ne);
  })

  this.dom.addEventListener('mouseleave', ne => {
    this.poinleave(ne);
  })
  this.dom.addEventListener('touchcancel', ne => {
    this.poinleave(ne);
  })

  this.dom.addEventListener('mousemove', ne => {
    this.poinmove(ne);
  })
  this.dom.addEventListener('touchmove', ne => {
    this.poinmove(ne);
  })

}

VSHammer.prototype = {
  on: function(event_type, handler) {
    this.handler[event_type + 's'].push(handler);
  },
  ne_to_ve: function(ne, type) {
    let ve = {};
    if (ne.touches) { // mobile
      ve.poins = ne.touches
      ve.button = ne.touches.length - 1;
    } else { // pc
      ve.poins = []
      ve.poins.push(ne)
      ve.button = ne.button;
    }
    return ve
  },
  poindown(ne) {
    let ve = this.ne_to_ve(ne)
    // console.log('poindown', ve)
    ne.preventDefault();

    if (ve.button === 0) {
      this.state = 'left';
    }
    this.handler.downs.forEach(down => {
      down(ve);
    })

    this.poin.x = ve.poins[0].clientX;
    this.poin.y = ve.poins[0].clientY;
  },
  poinup(ne) {
    let ve = this.ne_to_ve(ne)
    this.state = 'idle';
    this.handler.ups.forEach(up => {
      up(ve);
    })
  },
  poinleave(ne) {
    let ve = this.ne_to_ve(ne)
    this.state = 'idle';
  },
  poinmove(ne) {
    let ve = this.ne_to_ve(ne)
    // console.log('poinmove', ve)
    ve.deltaX = ve.poins[0].clientX - this.poin.x
    ve.deltaY = ve.poins[0].clientY - this.poin.y

    if (this.state === 'left' && (ve.deltaX || ve.deltaY)) {
      this.state = 'pan';
    }

    if (this.state === 'pan') {
      this.handler.pans.forEach(pan => {
        pan(ve);
      })
    }

    this.poin.x = ve.poins[0].clientX;
    this.poin.y = ve.poins[0].clientY;
  },
}
