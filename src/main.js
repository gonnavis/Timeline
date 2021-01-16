// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './components/App'
// import router from './router'
import vuetify from './plugins/vuetify'
import { VueHammer } from 'vue2-hammer'

// const VConsole = require('vconsole');
// const vConsole = new VConsole();

Vue.use(VueHammer)
Vue.config.productionTip = false
VueHammer.config.pinch = {
  enable: true,
};

/* eslint-disable no-new */
new Vue({
  // router,
  vuetify,
  render: h => h(App)
}).$mount("#app");

