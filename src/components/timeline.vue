<template>
  <div class="component timeline peoff" :class="{ transparent_timeline: p.map_state === 2, 'bg-gray-300': p.map_state === 0, peoff: p.map_state === 1 }" ref="component">
    <div
      class="global_wrap"
      v-show="p.map_state !== 1"
      v-pan="{ fn: component_pan, args: [] }"
      v-up="{ fn: component_up, args: [] }"
      @mousewheel="onmousewheel($event)"
      @mousemove="component_mousemove($event)"
      @touchstart="component_mousemove($event)"
      @touchmove="
        component_mousemove($event)
        is_show_pophover = false
      "
      style="position: absolute;left:0;top:0;width:100%;height:100%;"
    >
      <div class="global clearfix peon" :style="get_global_style()">
        <div class="marginfix" style="height: 1px;margin-bottom: -1px;"></div>
        <div class="area" v-for="(area, i) in act_areas" :style="get_area_style(area, i)">
          <div class="timeline_row" v-for="(row, i) in area.rows" :style="get_row_style(row, i, area)">
            <div class="period" :class="{ act: period_act === period }" v-for="(period, i) in row.periods" @mouseenter="period_mouseenter(period, i)" @touchstart="period_mouseenter(period, i)" @mouseleave="period_mouseleave(period, i)" @mousedown="period_mousedown($event)" v-hammer:press="period_press" :style="get_period_style(period, i, area)">
              <span class="name">{{ period.name }}</span>
              <!-- <img v-show="period.map.boundary" class="map_icon" src="../assets/map.png"> -->
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="ruler" v-show="p.map_state !== 1"></div>
    <div class="v_bar" v-show="p.map_state !== 1" :style="{ left: poin.x + 'px' }"></div>
    <div class="poin_time" v-show="p.map_state !== 1" :style="{ left: poin.x + 'px' }">
      <span>{{ poin_time }}</span>
      <span style="margin-left: 5px;color:gray;">距今: {{ now_year - poin_time }}</span>
    </div>
    <div class="detail peon" v-if="period_act" v-show="p.map_state !== 1" style="position:absolute;width:100%;top:24px;background: black;">
      <div style="display: flex;color:white;justify-content: space-around;">
        <div>{{ period_act.name }}</div>
        <div><span style="color:gray;">时长: </span>{{ period_act.to - period_act.from }}</div>
        <div><span style="color:gray;">公元: </span>{{ period_act.from }}~{{ period_act.to }}</div>
        <div style="color:gray;">距今: {{ now_year - period_act.from }}~{{ now_year - period_act.to }}</div>
        <a :href="'https://baike.baidu.com/item/' + period_act.name" target="_blank" style="color:cyan;">百科</a>
        <a :href="'https://www.baidu.com/s?wd=' + period_act.name" target="_blank" style="color:cyan;">搜索</a>
      </div>
      <div v-if="period_act.alias" style="display: flex;color:white;justify-content: flex-start;">{{ period_act.alias }}</div>
    </div>

    <v-footer class="peon flex flex-wrap-reverse justify-end" fixed padless>
      <v-btn-toggle class="m-0.5" color="primary" shaped v-model="lang" mandatory>
        <v-btn small text value="ja">日本語</v-btn>
        <v-btn small text value="en">English</v-btn>
        <v-btn small text value="zh">中文</v-btn>
      </v-btn-toggle>
      <v-btn class="m-0.5" small text elevation="0" @click="is_show_pop_help = !is_show_pop_help">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style="vertical-align: middle;">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
        </svg>
      </v-btn>
      <v-btn-toggle class="m-0.5" color="" shaped>
        <v-btn small text elevation="0" @click="goto_twha()">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style="vertical-align: middle; margin-right: 4px;">
            <path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/>
          </svg>
          平面地图
        </v-btn>
      </v-btn-toggle>
      <v-btn-toggle class="m-0.5" color="" shaped>
        <v-btn small text elevation="0" @click="p.is_map_name = !p.is_map_name">
          <svg v-if="p.is_map_name" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style="vertical-align: middle; margin-right: 4px;">
            <path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
          <svg v-else width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align: middle; margin-right: 4px;">
            <rect x="3" y="3" width="18" height="18" rx="2"/>
          </svg>
          地图国名
        </v-btn>
        <v-btn small text elevation="0" @click="toggle_map()">切换显示</v-btn>
      </v-btn-toggle>
      <v-btn class="m-0.5" :color="act_areas.includes(area) ? 'primary' : ''" rounded elevation="0" small @click="menu_area_click(area, i)" v-for="(area, i) in global.areas">{{ area.name }}</v-btn>
    </v-footer>

    <v-menu class="popmenu" v-if="period_act" v-model="is_show_popmenu" :position-x="popmenu_style ? popmenu_style.x : 0" :position-y="popmenu_style ? popmenu_style.y : 0" absolute offset-y>
      <v-list>
        <v-list-item>
          <a :href="'https://baike.baidu.com/item/' + period_act.name" target="_blank" style="display: block;">百度百科</a>
        </v-list-item>
        <v-list-item>
          <a :href="'https://www.baidu.com/s?wd=' + period_act.name" target="_blank" style="display: block;">百度搜索</a>
        </v-list-item>
      </v-list>
    </v-menu>

    <v-dialog class="text-center" v-model="is_show_pop_help" width="500">
      <v-card>
        <v-list>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>
                <a href="https://gitee.com/gonnavis/Timeline" target="_blank">gitee</a>
                &nbsp;&nbsp;&nbsp;
                <a href="https://github.com/gonnavis/Timeline" target="_blank">github</a>
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>移动</v-list-item-title>
              <v-list-item-subtitle>点击拖拽</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>缩放</v-list-item-title>
              <v-list-item-subtitle>鼠标滚轮 / 双指捏 / 双击并按住上下移动</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>切换显示</v-list-item-title>
              <v-list-item-subtitle>时间线和地图 / 纯地图 / 纯时间线</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>QQ群</v-list-item-title>
              <v-list-item-subtitle>680915237</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>邮箱</v-list-item-title>
              <v-list-item-subtitle>gonnavis@163.com</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>版本</v-list-item-title>
              <v-list-item-subtitle>2025-11-07 21:25</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="is_show_pop_help = false">确认</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import _ from 'lodash'
import { data as twha_data } from '../twha/js/data.js'
import global from './preprocess_data.js'
import StateMachine from 'javascript-state-machine'
import { update_twha_canvas } from '../twha/get_twha_canvas.js'
export default {
  name: 'timeline',
  props: ['p'],
  data() {
    return {
      lang: 'zh',
      r: null,
      popmenu_style: null,
      is_show_popmenu: false,
      is_show_pophover: false,
      is_show_pop_help: false,
      global: global,
      period_height: 30,
      zoom: 0.34,
      global_left: -2308,
      global_top: 100,
      act_areas: [],
      poin: { x: 0, y: 0 }, // pointer
      poin_time: 0,
      now_year: new Date().getFullYear(),
      zoom_fix: 2,
      zoom_min: 0.05,
      pan_speed: 1, // the larger the faster
      period_act: null,
      fsm: null,
      is_panning: false,
    }
  },
  watch: {
    'p.is_map_name': function() {
      let s = this
      console.log('watch')
      map.update_info()
    },
    lang: function(val) {
      let s = this
      twha_data.lang = val
      map.update_info()
    },
  },
  created() {
    let s = (window.stimeline = this)
    // console.log(global);
    s.act_areas.push(global.areas[0])

    s.fsm = new StateMachine({
      init: 'idle',
      transitions: [
        { name: 'tapedtoidle', from: 'taped', to: 'idle' },
        { name: 'idletoptaped', from: 'idle', to: 'taped' },
        { name: 'tapedtopanzoom', from: 'taped', to: 'panzoom' },
        { name: 'panzoomtoidle', from: 'panzoom', to: 'idle' },
      ],
      methods: {
        onInvalidTransition: function() {},
      },
    })
  },
  mounted() {
    let s = this
    s.r = s.$refs

    // let vh=new VSHammer(s.r.component);
    // vh.on('pan', function(ve){
    //   // console.log(ve)
    //   s.global_left+=ve.deltaX;
    //   s.global_top+=ve.deltaY;
    // })

    s.throttled_update_twha_canvas(s.poin_time)
    map.update_info()

    let hmr_component = new Hammer(s.r.component)
    hmr_component.get('pinch').set({ enable: true })
    hmr_component.get('pan').set({ direction: Hammer.DIRECTION_ALL })
    hmr_component.on('pinchin', function(e) {
      s.zoom_out(s.x_to_time(e.center.x))
    })
    hmr_component.on('pinchout', function(e) {
      s.zoom_in(s.x_to_time(e.center.x))
    })
    hmr_component.on('tap', function(e) {
      // console.log("tap");
      s.fsm.idletoptaped()
      setTimeout(() => {
        s.fsm.tapedtoidle()
      }, 500)
    })
    hmr_component.on('pan', function(e) {
      // console.log('pan', e.direction, e)
      if (s.fsm.is('taped')) {
        s.fsm.tapedtopanzoom()
      }
      if (s.fsm.is('panzoom')) {
        if (e.direction === 8) {
          // up
          s.zoom_in(s.x_to_time(e.center.x))
        } else if (e.direction === 16) {
          // down
          s.zoom_out(s.x_to_time(e.center.x))
        }
      }
    })
    hmr_component.on('panend', function(e) {
      s.fsm.panzoomtoidle()
    })
  },
  directives: {
    pan: {
      bind(el, binding) {
        let vh = new VSHammer(el)
        vh.on('pan', function(ve) {
          binding.value.fn(ve, ...binding.value.args)
        })
      },
    },
    up: {
      bind(el, binding) {
        let vh = new VSHammer(el)
        vh.on('up', function(ve) {
          binding.value.fn(ve, ...binding.value.args)
        })
      },
    },
    down: {
      bind(el, binding) {
        let vh = new VSHammer(el)
        vh.on('down', function(ve) {
          binding.value.fn(ve, ...binding.value.args)
        })
      },
    },
  },
  methods: {
    throttled_update_twha_canvas: _.throttle(
      function(year) {
        let s = this
        // console.log("throttled_update_twha_canvas");
        update_twha_canvas(year)
        // this.p.material.map.needsUpdate = true; //todo only needsUpdate after await update_twha_canvas()
        // s.p.canvasTexture_twha.needsUpdate = true;
        // s.p.uniforms.tSec.value = s.p.canvasTexture_twha;
        //todo three.js:19873 THREE.WebGLRenderer: image is not power of two (3600x1800). Resized to 2048x1024
      },
      0,
      { heading: false }
    ),
    // throttled_update_twha_canvas:update_twha_canvas,
    goto_twha() {
      let s = this
      if (confirm('目前只支持pc访问, 确认跳转?')) window.open('http://gonnavis.com/timeline/twha')
    },
    toggle_map() {
      let s = this
      s.p.map_state--
      if (s.p.map_state < 0) {
        s.p.map_state = 2
      }
      console.log(s.p.map_state)
    },
    period_contextmenu(ne) {
      let s = this
      console.log('contextmenu', ne)
    },
    period_mousedown(ne) {
      let s = this
      if (ne.button === 2) {
        s.popmenu_style = s.get_popmenu_style()
        s.is_show_popmenu = true
      }
    },
    period_press() {
      let s = this
      s.popmenu_style = s.get_popmenu_style()
      s.is_show_popmenu = true
    },
    get_popmenu_style() {
      let s = this
      let style = {
        x: s.poin.x,
        y: s.poin.y,
      }
      return style
    },
    period_mouseenter(period, i) {
      let s = this
      s.period_act = period
      s.is_show_pophover = true

      s.global.areas.forEach((area) => {
        area.periods.forEach((period) => {
          if (period.map.boundary_mesh) period.map.boundary_mesh.visible = false
        })
      })
      if (period.map.boundary_mesh) {
        period.map.boundary_mesh.visible = true
        // smap.camera.position.copy(period.map.camera_position)
        // smap.camera.lookAt(0,0,0)

        let to = new THREE.Vector3(...Object.values(smap.camera.position))
        let tween = (s.tween = new TWEEN.Tween(to)
          .to(period.map.camera_position, 500)
          .easing(TWEEN.Easing.Quadratic.InOut)
          .onUpdate(() => {
            smap.camera.position.copy(to)
            smap.camera.lookAt(0, 0, 0)
          })
          .start())
      }
    },
    period_mouseleave(period, i) {
      let s = this
      s.is_show_pophover = false
    },
    get_pophover_style() {
      let s = this
      let left = s.poin.x - 320
      if (left < 0) left = 0
      let style = {
        left: left + 'px',
        // left: 0+'px',
        top: s.poin.y + 30 + 'px',
      }
      return style
    },
    zoom_in(current_time) {
      let s = this
      let prev_zoom = s.zoom

      let zoom_step = s.zoom / 10
      s.zoom = +(s.zoom + zoom_step).toFixed(s.zoom_fix)

      s.global_left += -((current_time - s.global.min) * s.zoom - (current_time - s.global.min) * prev_zoom)
    },
    zoom_out(current_time) {
      let s = this
      let prev_zoom = s.zoom

      let zoom
      let zoom_step = s.zoom / 10
      zoom = +(s.zoom - zoom_step).toFixed(s.zoom_fix)
      if (zoom >= s.zoom_min) {
        s.zoom = zoom
        s.global_left += (current_time - s.global.min) * prev_zoom - (current_time - s.global.min) * s.zoom
      }
    },
    component_mousemove(e) {
      let s = this
      if (s.is_panning) {
        return
      }
      // console.log(e);
      if (e.touches) {
        s.poin.x = e.touches[0].clientX
        s.poin.y = e.touches[0].clientY
      } else {
        s.poin.x = e.clientX
        s.poin.y = e.clientY
      }
      s.poin_time = Math.floor((s.poin.x - s.global_left) / s.zoom + s.global.min)
      if (s.p.map_state !== 0) {
        s.throttled_update_twha_canvas(s.poin_time)
        map.update_info()
      }
    },
    x_to_time(x) {
      let s = this
      return Math.floor((x - s.global_left) / s.zoom + s.global.min)
    },
    component_pan(ve) {
      let s = this
      s.is_panning = true
      s.global_left += ve.deltaX * s.pan_speed
      s.global_top += ve.deltaY * s.pan_speed
    },
    component_up(ve) {
      let s = this
      s.is_panning = false
    },
    menu_area_click(area, i) {
      let s = this
      if (s.act_areas.includes(area)) {
        s.act_areas.splice(s.act_areas.indexOf(area), 1)
      } else {
        s.act_areas.push(area)
      }
    },
    onmousewheel(e) {
      let s = this
      // console.log(e);
      // s.zoom+=-e.deltaY/10000;
      // if(s.zoom<.01) s.zoom=.01;
      if (e.deltaY < 0) {
        s.zoom_in(s.poin_time)
      } else {
        s.zoom_out(s.poin_time)
      }
    },
    get_global_style() {
      let s = this
      let style = {
        position: 'relative',
        width: s.global.span * s.zoom + 200 + 'px',
        left: s.global_left + 'px',
        top: s.global_top + 'px',
      }
      return style
    },
    get_area_style(area, i) {
      let s = this
      let height = area.rows.length * s.period_height
      let style = {
        position: 'relative',
        width: '100%',
        height: height + 'px',
        margin: '10px 0',
      }
      return style
    },
    get_row_style(row, i, area) {
      let s = this
      let height = s.period_height
      let style = {
        position: 'relative',
        height: height + 'px',
      }
      return style
    },
    get_period_style(period, i, area) {
      let s = this
      let height = s.period_height
      let style = {
        left: (period.from - s.global.min) * s.zoom + 'px',
        width: period.span * s.zoom + 'px',
        height: height + 'px',
        'line-height': height - 2 + 'px',
        'background-color': period.color,
      }
      return style
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.component {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  cursor: default;
}
.component .area {
  background: white;
  border: solid 1px rgb(200, 200, 200);
}
.component .ruler {
  height: 24px;
  background: #000;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
}
.component .v_bar {
  position: absolute;
  top: 0;
  height: 100%;
  width: 1px;
  background: #000;
  pointer-events: none;
}
.component .poin_time {
  position: absolute;
  top: 0;
  color: #fff;
  line-height: 24px;
  white-space: nowrap;
}
.component .pophover {
  border: 1px solid gray;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 4px;
  text-align: left;
  padding: 10px;
  position: absolute;
  width: 300px;
  pointer-events: none;
}
.component .global .period {
  position: absolute;
  top: 0;
  box-sizing: border-box;
  border: solid 1px gray;
  color: black;
  text-shadow: rgb(255, 255, 255) 1px 1px 0px;
  word-break: keep-all;
}
.component .global .period .map_icon {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 10px;
  height: 10px;
  pointer-events: none;
  opacity: 0.7;
  background: rgba(255, 255, 255, 0.3);
}
.component .global .period.act {
  border-color: red;
  border-width: 2px;
}
.component .detail > * {
  padding: 2px;
}

.component.transparent_timeline {
  background: rgba(0, 0, 0, 0.3);
}
.component.transparent_timeline .area {
  background: rgba(255, 255, 255, 0.1);
  border: solid 1px rgba(200, 200, 200, 0.1);
}
.component.transparent_timeline .global .period {
  text-shadow: rgba(255, 255, 255, 0.6) 1px 1px 0px;
}
.component.transparent_timeline .global .period.act {
  border-color: rgba(255, 0, 0, 0.5);
}
/*.component.transparent_timeline .pophover{background: rgba(255,255,255,.5);}*/
</style>
