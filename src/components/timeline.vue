<template>
  <div class="component timeline">
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
      r:null,
      global:global,
      period_height:30,
      scale:.1,
    }
  },
  created(){
    let s=window.s=this
    console.log(global)
  },
  mounted(){
    let s=this
    s.r=s.$refs

  },
  methods:{
    get_global_style(){
      let s=this;
      let style={
        position: 'relative',
        top: '0px',
        left: -s.global.min*s.scale+'px',
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
        // left: '0px',
        // top: i*height+'px',
        // 'background-color': `rgb(${255*Math.random()}, ${255*Math.random()}, ${255*Math.random()})`,
      };
      return style;
    },
    get_row_style(row, i){
      let s=this
      let height=s.period_height;
      let style={
        position: 'relative',
        height: height+'px',
        // top: i*height+'px',
        // left: '0px',
      };
      return style;
    },
    get_period_style(period, i){
      let s=this
      let height=s.period_height;
      let style={
        position: 'absolute',
        left: period.from*s.scale+'px',
        top: '0px',
        width: period.span*s.scale+'px',
        height: height+'px',
        'line-height': height+'px',
        color: 'black',
        'text-shadow': 'rgb(255, 255, 255) 1px 1px 0px',
        'word-break': 'keep-all',
        'background-color': `rgb(${100+155*Math.random()}, ${100+155*Math.random()}, ${100+155*Math.random()})`,
      };
      return style;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
