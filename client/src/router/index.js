import Vue from 'vue'
import Router from 'vue-router'
import App from '@/components/App'
import Home from '@/components/home'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'url',
      component: App
    },
    {
      path: '/home',
      name: 'url',
      component: Home
    }
  ]
})
