<template>
  <div class="component timeline">
    <div class="areas">
      <div v-for="area in global.areas">
        <div v-for="row in area.rows">
          <div v-for="period in row.periods">{{period.name}}</div>
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
      period_height:100,
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
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
