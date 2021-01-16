'use strict';

import p from '../../p.js'
import { data } from './data.js'
import { region_list } from './regions.js'
import { Region } from './Region.js'
import { territory } from './territory.js'
import { getSpherePositionFromUv } from "../../components/getSpherePositionFromUv.js";

function Map(glob)
{
  const cvs_regions = document.createElement('canvas')
  const ctx_regions = cvs_regions.getContext('2d')
  cvs_regions.width = 2048
  cvs_regions.height = 1024
  const tile_size = 2048 / 8
  // cvs_regions.style.position = 'fixed'
  // cvs_regions.style.left = '0px'
  // cvs_regions.style.top = '0px'
  // cvs_regions.style.zIndex = '99999'
  // cvs_regions.style.width = '500px'
  // document.body.appendChild(cvs_regions)

  // window.test_count_1 = 0
  // window.test_count_2 = 0
  // window.test_count_3 = 0

  let caches = {}
  let ctx_tile_id_count = 0
  let tile_indexs = {}
  let text_level = 0

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
      ld.setAttribute("src", "./twha/sf/" + i + j + ".png");
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

  async function getMapTertPart(i, j)
  {
    const ij = i + '_' + j
    const count = ctx_tile_id_count++
    tile_indexs[ij] = count

    const mapTertYear = getMapTertYear(data.year, i, j)
    const key = `${i}_${j}_${mapTertYear}`
    if (!caches[key]) {
      const cvs_tile = document.createElement('canvas')
      const ctx_tile = cvs_tile.getContext('2d')
      cvs_tile.width = tile_size
      cvs_tile.height = tile_size

      const img = await vs.load_img(
        "./twha/t/" + i + j + "/" + mapTertYear + ".png"
      );
      // window.open(img.src)
      ctx_tile.drawImage(
        img,
        0, 0, 450, 450,
        0, 0, tile_size, tile_size
      )
      caches[key] = cvs_tile
    }
    if (count >= tile_indexs[ij]) {
      ctx_regions.drawImage(
        caches[key], i * tile_size, j * tile_size
      )
      p.canvasTexture_twha.needsUpdate = true;
      p.uniforms.tSec.value = p.canvasTexture_twha;
    }
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
  async function insert_visible_regions(nt)
  {
    /*
      nt = rg

      Region {pos_x: 2135, pos_y: 1020, disp_level: 1, node: div.region, update_year: ƒ, …}
        disp_level: 1
        node: div.region
        pos_x: 2135
        pos_y: 1020
        update: ƒ (x, y)
        update_year: ƒ ()
        __proto__: Object
    */

    // if (!window.test_display_levels) {
    //   window.test_display_levels = new Set()
    // }
    // test_display_levels.add(nt.disp_level)

    if (!p.is_map_name) return
    if (nt.disp_level > text_level) return

    { //three.js sprite
      // let temp_name = nt.data_name.split('（')[0].split('(')[0]
      // if (!temp_name) {
      //   temp_name = nt.data_name
      // }
      // const name = temp_name
      const name = nt.data_name
      const name_x_y = `${name}_${nt.pos_x}_${nt.pos_y}`
      if (!p.cache_text[name_x_y]) {

        // let spriteMap = new THREE.TextureLoader().load(require('../../assets/test.png'));

        let cvs_text = document.createElement('canvas')
        let ctx_text = cvs_text.getContext('2d')
        cvs_text.width = 512
        cvs_text.height = 32

        // ctx_text.fillStyle = `rgba(${255*Math.random()},${255*Math.random()},${255*Math.random()},1)`
        // ctx_text.fillRect(0, 0, cvs_text.width, cvs_text.height)

        ctx_text.font = "24px Arial";
        ctx_text.lineWidth = 6
        ctx_text.lineJoin = "round";
        ctx_text.strokeStyle = "white"
        ctx_text.fillStyle = "black";
        // ctx_text.textAlign = "center";
        // ctx_text.shadowColor = "white";
        // ctx_text.shadowBlur = 2;
        // ctx_text.shadowOffsetX = 1;
        // ctx_text.shadowOffsetY = 1;
        const text_width = ctx_text.measureText(name).width
        ctx_text.strokeText(name, 6, cvs_text.height - 6)
        ctx_text.fillText(name, 6, cvs_text.height - 6)

        let spriteMap = new THREE.CanvasTexture(cvs_text)
        spriteMap.needsUpdate = true;

        let spriteMaterial = new THREE.SpriteMaterial({ map: spriteMap, color: 0xffffff, sizeAttenuation: false });
        let sprite = new THREE.Sprite(spriteMaterial);
        p.cache_text[name_x_y] = sprite;
        let scale = 0.28
        p.cache_text[name_x_y].scale.set(1 * scale, (cvs_text.height / cvs_text.width) * scale, 1 * scale)
        sprite.center = new THREE.Vector2(text_width / 2 / cvs_text.width, .5)

        const uv = new THREE.Vector2(nt.pos_x / 3600, 1 - (nt.pos_y / 1800))
        // let position = getPositionFromUv(mesh_earth, uv.x, uv.y)
        let position = getSpherePositionFromUv(uv.x, uv.y, 10.3)
        // if (position && !p.group_text.children.includes(p.cache_text[name])) {
        if (position) {
          p.cache_text[name_x_y].position.copy(position)
        }
        p.group_text.add(p.cache_text[name_x_y])
      }
      // const uv = new THREE.Vector2(nt.pos_x / 3600, 1 - (nt.pos_y / 1800))
      // let position = getSpherePositionFromUv(mesh_earth, uv.x, uv.y)
      // if (position) {
      //   p.cache_text[name_x_y].position.copy(position)
      // }
      p.cache_text[name_x_y].visible = true
    }

    // const x = parseInt(nt.node.style.left)
    // const y = parseInt(nt.node.style.top)
    // console.log('nt', nt)
    // visible_regions.push(nt);
    // infoLayer.appendChild(nt.node);
  }
  // infoLayerから削除
  function remove_visible_region(rg)
  {
    // infoLayer.removeChild(rg.node);
    // let i = visible_regions.indexOf(rg);
    // if (i >= 0) {
    //   visible_regions.splice(i, 1);
    // }
    p.group_text.remove(p.cache_text[rg.data_name])
  }

  this.update_info = update_info

  function update_info()
  {

    const camera_distance = window.camera.position.length()
    if (camera_distance < 15) {
      text_level = 2
    } else if (camera_distance < 25) {
      text_level = 1
    } else {
      text_level = 0
    }
    // console.log(camera_distance, text_level)


    // console.log('update_info')
    if (prev_year !== data.year) {
      regions_this_year = update_region_of_year(data.year);
      visible_regions = [];
      prev_year = data.year;
    }
    var scale = 1;
    var mapSize = MAP_SIZE * scale;
    var curX = data.map_x;
    var curY = data.map_y;

    // p.group_text.children = []
    p.group_text.children.forEach(one => one.visible = false)

    for (var i = 0; i < regions_this_year.length; i++) {
      var nt = regions_this_year[i];
      var px = nt.pos_x * scale - curX;
      var py = nt.pos_y * scale - curY;

      if (px > mapSize * 4) {
        px -= mapSize * 8;
      } else if (px < -mapSize * 4) {
        px += mapSize * 8;
      }
      // console.log(1)
      // if (px > -curWidth2 - data.REGION_WIDTH && px < curWidth2 + 20 &&
      //   py > -curHeight2 - 210 && py < curHeight2 + 15 && data.zoom >= nt.disp_level)
      // {
      // 可以看到
      // nt.update(px + curWidth2, py + curHeight2);
      nt.update(px, py);
      // nt.update(0,0);

      // if (!nt.node.parentNode) {
      insert_visible_regions(nt);
      // }
      // } else {
      //   // 消失了
      //   if (nt.node.parentNode) {
      //     remove_visible_region(nt);
      //   }
      // }
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
    // data.year = p.year_clamp(year)
    data.year = year
    for (let x = 0; x < data.tile_x_count; x++) {
      for (let y = 0; y < data.tile_y_count; y++) {
        this.getMapTertPart(x, y)
      }
    }
  }
  this.get_canvas = function() {
    return cvs_regions
  }

}

export { Map }
