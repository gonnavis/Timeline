import Vue from 'vue'
import Router from 'vue-router'
import wrap from '@/components/wrap'

Vue.use(Router)

export default new Router({
  routes: [
    {path: '/', name: 'wrap', component: wrap }
  ]
})
