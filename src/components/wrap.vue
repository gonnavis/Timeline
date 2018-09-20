<template>
  <div class="component wrap">
    <timeline></timeline>
  </div>
</template>

<script>
import timeline from './timeline'
export default {
  name: 'wrap',
  components:{timeline},
  data () {
    return {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
