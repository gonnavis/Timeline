<template>
  <div class="component timeline" ref="component" @mousewheel="onmousewheel($event)">
    <div class="global" :style="get_global_style()">
      <div class="area" v-for="(area, i) in global.areas" :style="get_area_style(area, i)">
        <div class="row" v-for="(row, i) in area.rows" :style="get_row_style(row, i)">
          <div class="period" v-for="(period, i) in row.periods" :style="get_period_style(period, i)">{{period.name}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import data from './data.js'
import global from './preprocess_data.js'
export default {
  name: 'timeline',
  data () {
    return {
      r: null,
      global: global,
      period_height: 30,
      zoom: .1,
      global_left: 0,
      global_top: 0,
    }
  },
  created(){
    let s=window.s=this
    console.log(global)
  },
  mounted(){
    let s=this
    s.r=s.$refs

    let vh=new VSHammer(s.r.component);
    vh.on('pan', function(ve){
      // console.log(ve)
      s.global_left+=ve.deltaX;
      s.global_top+=ve.deltaY;
    })
  },
  methods:{
    onmousewheel(e){
      let s=this;
      console.log(e);
      s.zoom+=-e.deltaY/10000;
      if(s.zoom<.01) s.zoom=.01;
    },
    get_global_style(){
      let s=this;
      let style={
        position: 'relative',
        left: s.global_left-s.global.min*s.zoom+'px',
        top: s.global_top+'px',
      }
      return style;
    },
    get_area_style(area, i){
      let s=this
      let height=area.rows.length*s.period_height
      let style={
        position: 'relative',
        height: height+'px',
        width: '100%',
      };
      return style;
    },
    get_row_style(row, i){
      let s=this
      let height=s.period_height;
      let style={
        position: 'relative',
        height: height+'px',
      };
      return style;
    },
    get_period_style(period, i){
      let s=this
      let height=s.period_height;
      let style={
        position: 'absolute',
        left: period.from*s.zoom+'px',
        top: '0px',
        width: period.span*s.zoom+'px',
        height: height+'px',
        'box-sizing': 'border-box',
        border: 'solid 1px gray',
        'line-height': height+'px',
        color: 'black',
        'text-shadow': 'rgb(255, 255, 255) 1px 1px 0px',
        'word-break': 'keep-all',
        'background-color': period.color,
      };
      return style;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
