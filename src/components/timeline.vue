<template>
  <div class="component timeline">
    <div class="global" :style="get_global_style()">
      <div class="area" v-for="(area, ai) in global.areas" :style="get_area_style(area, ai)">
        <div class="row" v-for="row in area.rows">
          <div class="period" v-for="period in row.periods">{{period.name}}</div>
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
        position: 'absolute',
        top: '0px',
        left: -s.global.min*s.scale+'px',
      }
      return style;
    },
    get_area_style(area, ai){
      let s=this
      let height=area.rows.length*s.period_height
      let style={
        position: 'absolute',
        height: height+'px',
        width: area.span*s.scale+'px',
        left: area.min*s.scale+'px',
        top: ai*height+'px',
        'background-color': `rgb(${255*Math.random()}, ${255*Math.random()}, ${255*Math.random()})`,
      };
      return style;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
