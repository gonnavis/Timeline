// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './components/App'
import router from './router'
import { VueHammer } from 'vue2-hammer'

Vue.use(VueHammer)
Vue.config.productionTip = false
VueHammer.config.pinch = {
  enable: true,
};

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
