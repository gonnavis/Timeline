(function(fn)
{
  if (document.readyState !== 'loading') {
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
})(function()
{
  var glob = {
    pan_target: null,
  }
  var screen_width = 0;
  var screen_height = 0;
  var resize_timer = -1;

  var zoom_bar = new ZoomBar();
  var lang_button = new LangButton();
  var year_text = new YearText();
  var year_bar = new YearBar(glob);
  var map = window.map = new Map(glob);

  data.year_clamp = function()
  {
    if (this.year < -4000) {
      this.year = -4000;
    } else if (this.year == 0) {
      this.year = 1;
    } else if (this.year > MAX_YEAR) {
      this.year = MAX_YEAR;
    }
  };

  function resize()
  {
    var body = document.getElementsByTagName('body')[0];

    screen_width = body.offsetWidth;
    screen_height = body.offsetHeight;
    var canbas_h = screen_height - year_bar.SIZE;

    map.set_size(screen_width, canbas_h);

    year_bar.set_top(canbas_h);
    year_bar.set_width(screen_width - year_bar.SIZE * 2);

    map.update();
  }

  year_bar.onchanged(function()
  {
    year_text.update();
    map.update();
  });
  lang_button.onchanged(function()
  {
    year_text.update();
    map.update_style();
  });
  year_text.onchanged(function()
  {
    year_bar.update();
    map.update();
  });
  zoom_bar.onchanged(function()
  {
    map.update();
  });

  window.addEventListener('resize', function()
  {
    if (resize_timer !== -1) {
      clearTimeout(resize_timer);
    }

    resize_timer = setTimeout(function() {
      resize_timer = -1;
      resize();
    }, 250);
  });

  (function(callback)
  {
    if (window.addEventListener) {
      window.addEventListener('DOMMouseScroll', callback, false);
      window.addEventListener('mousewheel', callback, false);
    }
  })(function(e)
  {
    let delta = e.wheelDelta ? e.wheelDelta : e.deltaY ? -e.deltaY : -e.detail;
    if (delta > 0) {
      if (data.zoom < 4) {
        data.zoom++;
        zoom_bar.update();
        map.update();
      }
    } else if (delta < 0) {
      if (data.zoom > 0) {
        data.zoom--;
        zoom_bar.update();
        map.update();
      }
    }
  });

  resize();
});
