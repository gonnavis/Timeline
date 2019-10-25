'use strict';

import { data } from './data.js'
import { region_list } from './regions.js'
import { Region } from './Region.js'
import { territory } from './territory.js'

function Map(glob)
{
  const cvs = document.createElement('canvas')
  const ctx = cvs.getContext('2d')
  const tile_size = 450
  cvs.width = data.tile_x_count * tile_size
  cvs.height = data.tile_y_count * tile_size
  cvs.style.position = 'fixed'
  // cvs.style.left = '100px'
  cvs.style.left = '0px'
  cvs.style.top = '0px'
  cvs.style.zIndex = '99999'
  // cvs.style.width = '500px'
  cvs.style.width = '100%'
  cvs.style.maxWidth = '100%'
  document.body.appendChild(cvs)

  var MAP_SIZE = 450;
  var MAP_X = 8;
  var MAP_Y = 4;
  var SCALES = [0.5, 1, 2, 4, 8];

  var mpLandCache = new Array(MAP_X * MAP_Y);
  var mpTertCache = new Array(MAP_X * MAP_Y);
  // 指定年份的所有区域面板
  var regions_this_year = [];
  // 屏幕上所有可见的“区域”面板
  var visible_regions = [];

  var curWidth, curHeight;
  var curWidth2, curHeight2;
  var mousedown_x = 0;
  var mousedown_y = 0;
  var prev_zoom = data.zoom;
  var prev_year = -9999;

  var landLayer = document.getElementById('layer-land');
  var tertLayer = document.getElementById('layer-tert');
  var infoLayer = document.getElementById('layer-info');


  function getMapLandPart(i, j)
  {
    var idx = i + j * MAP_X;
    var ld = mpLandCache[idx];
    if (!ld) {
      ld = document.createElement('img');
      ld.setAttribute('alt', '');
      ld.setAttribute('src', '../twha/sf/' + i + j + '.png');
      mpLandCache[idx] = ld;
    }
    return ld;
  }

  function getMapTertYear(year, i, j)
  {
    var a = territory[i][j];
    var lb = 0,
      ub = a.length;
    while (lb < ub) {
      var m = Math.floor((lb + ub) / 2);
      if (year >= a[m]) {
        if (m + 1 == ub || year < a[m + 1]) {
          return a[m];
        }
        lb = m + 1;
      } else {
        ub = m;
      }
    }
    return -4000;
  }

  this.getMapTertPart = getMapTertPart

  function getMapTertPart(i, j)
  {
    console.log('getMapTertPart')
    // ctx.clearRect(0, 0, cvs.width, cvs.height)
    ctx.fillRect(0, 0, cvs.width, cvs.height)
    // debugger
    var idx = i + j * MAP_X;
    var mp = mpTertCache[idx];
    if (!mp) {
      mp = document.createElement('img');
      mp.setAttribute('alt', '');
      mpTertCache[idx] = mp;
    }
    mp.setAttribute('src', '../twha/t/' + i + j + '/' + getMapTertYear(data.year, i, j) + '.png');
    mp.onload = function() {
      ctx.drawImage(mp, i * (tile_size), j * (tile_size))
    }
    return mp;
  }


  function update_map()
  {
    // zoom更改时，坐标中心也会更改
    if (prev_zoom !== data.zoom) {
      data.map_x = Math.round(data.map_x * SCALES[data.zoom] / SCALES[prev_zoom]);
      data.map_y = Math.round(data.map_y * SCALES[data.zoom] / SCALES[prev_zoom]);
      prev_zoom = data.zoom;
    }

    // 计算地图显示范围
    var curX = data.map_x;
    var curY = data.map_y;
    var mapSize = MAP_SIZE * SCALES[data.zoom];
    var maxW = Math.ceil(curWidth / mapSize);
    var maxH = Math.ceil(curHeight / mapSize);

    var rev = false;

    var ox = curX - curWidth2;
    if (ox < 0) {
      ox += mapSize * MAP_X;
    }
    var mx = ox % mapSize;
    var px = Math.floor(ox / mapSize);
    var ex = px + maxW;
    if (ex >= MAP_X) {
      ex -= MAP_X;
      rev = true;
    }

    var oy = curY - curHeight2;
    var my, py;
    if (oy < 0) {
      my = mapSize - (-oy % mapSize) - 1;
      py = -Math.floor(-oy / mapSize) - 1;
    } else {
      my = oy % mapSize;
      py = Math.floor(oy / mapSize);
    }
    var ey = py + maxH;

    // 显示地图
    for (var i = 0; i < MAP_X; i++) {
      var vi = (i >= px && i <= ex);
      if (rev) {
        vi = !vi;
      }
      for (var j = 0; j < MAP_Y; j++) {
        var idx = i + j * MAP_X;
        var mpLand;
        var mpTert;

        if (vi && j >= py && j <= ey) {
          mpLand = getMapLandPart(i, j);
          mpTert = getMapTertPart(i, j);

          if (!mpLand.parentNode) {
            landLayer.appendChild(mpLand);
          }
          if (!mpTert.parentNode) {
            tertLayer.appendChild(mpTert);
          }

          var dx = i - px;
          if (dx < 0) {
            dx += MAP_X;
          }
          var dy = j - py;

          mpLand.style.left = (dx * mapSize - mx) + 'px';
          mpLand.style.top = (dy * mapSize - my) + 'px';
          mpLand.setAttribute('width', mapSize);
          mpLand.setAttribute('height', mapSize);

          mpTert.style.left = (dx * mapSize - mx) + 'px';
          mpTert.style.top = (dy * mapSize - my) + 'px';
          mpTert.setAttribute('width', mapSize);
          mpTert.setAttribute('height', mapSize);
        } else {
          mpLand = mpLandCache[idx];
          mpTert = mpTertCache[idx];

          if (mpLand && mpLand.parentNode) {
            landLayer.removeChild(mpLand);
          }
          if (mpTert && mpTert.parentNode) {
            tertLayer.removeChild(mpTert);
          }
        }
      }
    }
  }

  // 从所有区域中提取指定年份中包含的那些
  function update_region_of_year(yr)
  {
    var ret = [];

    for (var i = 0; i < region_list.length; i++) {
      var a = region_list[i];
      var rg = a[0];
      if (rg) {
        if (rg.node && rg.node.parentNode) {
          infoLayer.removeChild(rg.node);
        }
        if (yr >= a[1] && yr < a[2]) {
          rg.update_year();
        } else {
          a[0] = rg = null;
        }
      } else {
        if (yr >= a[1] && yr < a[2]) {
          a[0] = rg = new Region(a);
          rg.update_year();
        }
      }
      if (rg) {
        ret.push(rg);
      }
    }

    return ret;
  }

  // infoLayerに追加
  function insert_visible_regions(nt)
  {
    visible_regions.push(nt);
    infoLayer.appendChild(nt.node);
  }
  // infoLayerから削除
  function remove_visible_region(rg)
  {
    infoLayer.removeChild(rg.node);
    let i = visible_regions.indexOf(rg);
    if (i >= 0) {
      visible_regions.splice(i, 1);
    }
  }

  function update_info()
  {
    if (prev_year !== data.year) {
      regions_this_year = update_region_of_year(data.year);
      visible_regions = [];
      prev_year = data.year;
    }
    var scale = SCALES[data.zoom];
    var mapSize = MAP_SIZE * scale;
    var curX = data.map_x;
    var curY = data.map_y;

    for (var i = 0; i < regions_this_year.length; i++) {
      var nt = regions_this_year[i];
      var px = nt.pos_x * scale - curX;
      var py = nt.pos_y * scale - curY;

      if (px > mapSize * 4) {
        px -= mapSize * 8;
      } else if (px < -mapSize * 4) {
        px += mapSize * 8;
      }

      if (px > -curWidth2 - data.REGION_WIDTH && px < curWidth2 + 20 &&
        py > -curHeight2 - 210 && py < curHeight2 + 15 && data.zoom >= nt.disp_level)
      {
        // 見えている
        nt.update(px + curWidth2, py + curHeight2);

        if (!nt.node.parentNode) {
          insert_visible_regions(nt);
        }
      } else {
        // 見えなくなった
        if (nt.node.parentNode) {
          remove_visible_region(nt);
        }
      }
    }
  }

  // スクロール位置を合わせる
  function limit_map_center()
  {
    var mapSize = MAP_SIZE * SCALES[data.zoom];
    var maxX = MAP_X * mapSize;
    var maxY = MAP_Y * mapSize;

    // 左右限度を超えた場合、1周回る
    if (data.map_x < 0) {
      data.map_x += maxX;
    } else if (data.map_x >= maxX) {
      data.map_x -= maxX;
    }

    // 上下限を超えないようにする
    if (data.map_y < 0) {
      data.map_y = 0;
    } else if (data.map_y > maxY) {
      data.map_y = maxY;
    }
  }

  this.set_size = function(width, height)
  {
    curWidth = width;
    curHeight = height;
    curWidth2 = Math.floor(width / 2);
    curHeight2 = Math.floor(height / 2);

    let w = width + 'px';
    let h = height + 'px';

    landLayer.style.width = w;
    landLayer.style.height = h;
    tertLayer.style.width = w;
    tertLayer.style.height = h;
    infoLayer.style.width = w;
    infoLayer.style.height = h;
  };
  this.update = function()
  {
    update_map();
    update_info();
  };
  this.update_style = function()
  {
    for (var i = 0; i < visible_regions.length; i++) {
      visible_regions[i].update();
    }
  };
  this.draw_all = function(year = 0) {
    data.year = year
    for (let x = 0; x < data.tile_x_count; x++) {
      for (let y = 0; y < data.tile_y_count; y++) {
        this.getMapTertPart(x, y)
      }
    }
  }
  this.get_canvas = function() {
    return cvs
  }

}

export { Map }
