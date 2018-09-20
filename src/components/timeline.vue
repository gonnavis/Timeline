<template>
  <div class="component timeline">
    timeline
  </div>
</template>

<script>
// import data from './data.js'
import data from './preprocess_data.js'
export default {
  name: 'timeline',
  data () {
    return {
    }
  },
  created(){
    let s=this
    console.log(data)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
