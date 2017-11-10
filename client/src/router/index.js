import Vue from 'vue'
import Router from 'vue-router'
import App from '@/components/App'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'url',
      component: App
    }
  ]
})