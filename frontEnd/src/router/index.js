import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/index'
    },
    {
      path: '/index',
      name: 'index',
      component: (resolve) => require(['@/views/index'], resolve)
    },
    {
      path: '/register',
      name: 'register',
      component: (resolve) => require(['@/views/register'], resolve)
    },
    {
      path: '/login',
      name: 'login',
      component: (resolve) => require(['@/views/login'], resolve)
    },
    {
      path: '/article',
      name: 'article',
      component: (resolve) => require(['@/views/article'], resolve)
    }
  ]
})
