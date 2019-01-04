import Vue from 'vue'
import Router from 'vue-router'

// pages
import HomePage from './views/HomePage.vue'

Vue.use(Router)

export default new Router({
	mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HomePage',
      component: HomePage
    },
    {
      path: '*',
      redirect: { name: 'HomePage' }
    }
  ]
})
