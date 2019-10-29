<template>
  <div class="component timeline" ref="component" @mousewheel="onmousewheel($event)" style="position: absolute;left:0;top:0;width:100%;height: 100%;overflow: hidden;background: rgb(223,223,223);cursor: default;">

    <div class="global" :style="get_global_style()">
      <div class="area" v-for="(area, i) in act_areas" :style="get_area_style(area, i)" style="background: white;">
        <div class="row" v-for="(row, i) in area.rows" :style="get_row_style(row, i, area)">
          <div class="period" v-for="(period, i) in row.periods" :style="get_period_style(period, i, area)">{{period.name}}</div>
        </div>
      </div>
    </div>

    <div class="menu clearfix" style="width:100%;position: absolute;left: 0;bottom: 0;display: flex;align-items: flex-end;flex-wrap: wrap-reverse;justify-content: flex-end; background: rgb(190,190,190);">
      <div class="area" :class="{act:act_areas.includes(area)}" v-down="menu_area_click(area, i)" v-for="(area, i) in global.areas" style="">{{area.name}}</div>
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
      act_areas: [],
    }
  },
  created(){
    let s=window.s=this
    console.log(global)
    s.act_areas.push(global.areas[0])
  },
  mounted(){
    let s=this
    s.r=s.$refs

    // let vh=new VSHammer(s.r.component);
    // vh.on('pan', function(ve){
    //   // console.log(ve)
    //   s.global_left+=ve.deltaX;
    //   s.global_top+=ve.deltaY;
    // })
  },
  directives:{
    pan: {
      bind(el, binding, vnode, oldVnode){
        console.log(arguments);
        // let s=vnode.context;
        // let vh=new VSHammer(el);
        // let expression=binding.expression.split('');
        // expression.splice(binding.expression.indexOf('(')+1, 0, 've, ');
        // expression=expression.join('');
        // console.log(expression);
        // vh.on('pan', function(ve){
        //   eval('s.'+expression)
        // })
        let s=vnode.context;
        let vh=new VSHammer(el);
        let fn=s[ binding.expression.match(/(.+)\(/)[1] ];
        let args_str=binding.expression.match(/\((.+)\)/)[1]
        let args=args_str.split(',')
        args=args.map(arg=>arg.trim());
        args=args.map(arg=>s[arg]);
        // console.log(args)
        vh.on('pan', function(ve){
          // console.log(ve);
          fn(ve, ...args);
        })
      }
    },
    down: {
      bind(el, binding, vnode, oldVnode){
        console.log(arguments);
        let s=vnode.context;
        let vh=new VSHammer(el);
        let fn=s[ binding.expression.match(/(.+)\(/)[1] ];
        let args_str=binding.expression.match(/\((.+)\)/)[1]
        let args=args_str.split(',')
        args=args.map(arg=>arg.trim());
        args=args.map(arg=>s[arg]);
        // console.log(args)
        vh.on('down', function(ve){
          fn(ve, ...args);
        })
      }
    },
  },
  methods:{
    component_pan(ve){
      // console.log(arguments);
      if(typeof ve !== 'object' || !ve.poins) return;
      let s=this
      s.global_left+=ve.deltaX;
      s.global_top+=ve.deltaY;
    },
    menu_area_click(ve, area, i){
      // console.log(arguments);
      if(typeof ve !== 'object' || !ve.poins) return;
      let s=this;
      if(s.act_areas.includes(area)){
        s.act_areas.splice(s.act_areas.indexOf(area), 1);
      }else{
        s.act_areas.push(area);
      }
    },
    onmousewheel(e){
      let s=this;
      // console.log(e);
      s.zoom+=-e.deltaY/10000;
      if(s.zoom<.01) s.zoom=.01;
    },
    get_global_style(){
      let s=this;
      let style={
        position: 'relative',
        width: s.global.span*s.zoom + 200 + 'px',
        left: s.global_left + 'px',
        top: s.global_top+'px',
      }
      return style;
    },
    get_area_style(area, i){
      let s=this
      let height=area.rows.length*s.period_height
      let style={
        position: 'relative',
        width: '100%',
        height: height+'px',
        border: 'solid 1px rgb(200,200,200)',
        margin: '10px 0',
      };
      return style;
    },
    get_row_style(row, i, area){
      let s=this
      let height=s.period_height;
      let style={
        position: 'relative',
        height: height+'px',
      };
      return style;
    },
    get_period_style(period, i, area){
      let s=this
      let height=s.period_height;
      let style={
        position: 'absolute',
        left: (period.from-s.global.min)*s.zoom+'px',
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
  .menu .area{background: gray;border: solid 1px;padding:3px 6px;cursor: pointer;}
  .menu .area.act{background: white;}
</style>
