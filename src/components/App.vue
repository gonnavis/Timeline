<template>
  <div id="app">
    <!-- <router-view :p="p" /> -->
    <wrap :p="p" />
  </div>
</template>

<script>
import p from '../p.js'
import wrap from './wrap'
export default {
  name: "App",
  components:{wrap},
  data() {
    return {
      p: p,
    };
  },
  created() {
    let s = this;
  },
  mounted() {
    let s = (window.sapp = this);
  }
};
</script>

<style>
html,body{position: fixed;left: 0;top: 0;width:100%;height: 100%;overflow: hidden;margin:0;}
#app {font-family: "Avenir", Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; text-align: center; color: #2c3e50; margin-top: 60px; position: absolute;left: 0;top: 0;width:100%;height: 100%;overflow: hidden;margin: 0;padding: 0; font-size: 14px;}
.clearfix::after {content: ""; clear: both; display: table; }
.full{position: absolute;left:0;top:0;width: 100%;height: 100%;}
.peoff{pointer-events: none;}
.peon{pointer-events: all;}
</style>
