'use strict';

function YearBar(glob)
{
  var _SIZE = 32;

  var year_bar = document.getElementById('year-bar');
  var arrow_l = document.getElementById('year-arrow-left');
  var arrow_r = document.getElementById('year-arrow-right');
  var scale = document.getElementById('year-bar-scale');
  var cursor = document.getElementById('year-bar-cursor');
  var scale_width = 1;
  var on_changed_handler = null;
  this.SIZE = _SIZE;


  this.set_top = function(top)
  {
    year_bar.style.top = top + 'px';
  };
  this.set_width = function(width)
  {
    if (width < 1) {
      width = 1;
    }
    scale_width = width;
    scale.setAttribute('width', width);

    var ctx = scale.getContext('2d');
    ctx.clearRect(0, 0, width, _SIZE);
    ctx.fillStyle = '#e0e0e0'
    ctx.fillRect(0, 0, width, _SIZE);

    var pattern = [
      0, 0,
      1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0,
      1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0,
      1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0,
      1, 1,
    ];
    var length = pattern.length;
    var i;
    ctx.fillStyle = '#c0c0c0'
    for (i = 0; i < length; i++) {
      if (pattern[i]) {
        var x1 = width * i / length;
        var x2 = width * (i + 1) / length;
        ctx.fillRect(x1, 0, x2 - x1, _SIZE);
      }
    }
    ctx.fillStyle = 'black';
    ctx.font = '9px sans-serif'
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    for (i = 0; i < 4; i++) {
      ctx.fillText(String(-4000 + i * 1000), (2 + i * 10) * width / length, _SIZE / 2);
    }
    for (i = 0; i < 6; i++) {
      ctx.fillText(String(-500 + i * 500), (42 + i * 10) * width / length, _SIZE / 2);
    }

    update_cursor();
  };

  function update_cursor()
  {
    data.year_clamp();

    var yr = data.year + 4000;
    if (yr > 3000) {
      yr = yr * 2 - 3000;
    }
    cursor.style.left = ((yr + 200) * scale_width / 9400 + 26) + 'px';
  }

  this.onchanged = function(f)
  {
    on_changed_handler = f;
  };
  this.update = update_cursor;

  year_bar.addEventListener('contextmenu', function(e) { e.preventDefault() })
  year_bar.addEventListener('mousewheel', function(e)
  {
    console.log(e)
    e.preventDefault()
    e.stopPropagation()
    var step
    if (e.ctrlKey || e.buttons === 2) step = 10
    else if (e.shiftKey) step = 5
    else step = 1
    if (e.deltaY > 0) {
      data.year += step
    } else if (e.deltaY < 0) {
      data.year -= step
    }
    update_cursor();
    if (on_changed_handler) {
      on_changed_handler();
    }
  });

  var is_mousedown = false
  year_bar.addEventListener('mousedown', function(e) {
    // console.log(e)
    glob.pan_target = year_bar
    set_year(e)
  })
  window.addEventListener('mousemove', function(e)
  {
    if (!glob.pan_target || glob.pan_target !== year_bar) {
      return
    }
    e.preventDefault()
    set_year(e)
  });
  arrow_l.addEventListener('mouseenter', function()
  {
    arrow_l.src = '../twha/img/arrow-left2.png';
  });
  arrow_l.addEventListener('mouseleave', function()
  {
    arrow_l.src = '../twha/img/arrow-left.png';
  });
  arrow_r.addEventListener('mouseenter', function()
  {
    arrow_r.src = '../twha/img/arrow-right2.png';
  });
  arrow_r.addEventListener('mouseleave', function()
  {
    arrow_r.src = '../twha/img/arrow-right.png';
  });

  function set_year(e) {
    if (e.buttons !== 1) return
    var xpos = e.clientX;
    if (xpos < _SIZE) {
      data.year--;
    } else if (xpos > scale_width + _SIZE) {
      data.year++;
    } else {
      var yr = (xpos - 32) * 9400 / scale_width - 200;
      if (yr > 3000) {
        yr = (yr + 3000) / 2;
      }
      yr -= 4000;
      data.year = Math.round(yr);
    }
    update_cursor();
    if (on_changed_handler) {
      on_changed_handler();
    }
  }
}

export { YearBar }
