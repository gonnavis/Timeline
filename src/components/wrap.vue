<template>
  <div class="component wrap">
    <Map :p="p" ></Map>
    <timeline :p="p"  v-if="!p.is_edit"></timeline>
  </div>
</template>

<script>
import timeline from './timeline'
import Map from './Map'
export default {
  name: 'wrap',
  components:{timeline, Map},
  props: ['p'],
  data () {
    return {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
