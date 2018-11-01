<template>
  <div class="component wrap">
    <!-- <timeline></timeline> -->
    <Map></Map>
  </div>
</template>

<script>
import timeline from './timeline'
import Map from './Map'
export default {
  name: 'wrap',
  components:{timeline, Map},
  data () {
    return {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
