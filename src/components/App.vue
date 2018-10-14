<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
html,body{position: fixed;left: 0;top: 0;width:100%;height: 100%;overflow: hidden;margin:0;}
#app {font-family: 'Avenir', Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; text-align: center; color: #2c3e50; margin-top: 60px; position: absolute;left: 0;top: 0;width:100%;height: 100%;overflow: hidden;margin: 0;padding: 0; font-size: 14px;}
.clearfix::after {content: ""; clear: both; display: table; }
</style>
