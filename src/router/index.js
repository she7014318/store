import Vue from 'vue'

// 导入路由模块
import Router from 'vue-router'

// 引入子组件
import Login from '@/components/login/Login.vue'
import Home from '@/components/home/Home.vue'

Vue.use(Router)

let router = new Router({
  routes: [
    { path: '/', redirect: 'Login' },
    { path: '/login', name: 'login', component: Login },
    { path: '/home', name: 'home', component: Home }
  ]
})
/* eslint-disable */
router.beforeEach((to, from, next) => {
  // to and from are both route objects. must call `next`.
  if (to.path === '/login') {
    next()
  } else {
    let token = localStorage.getItem('token')
    token ? next() : next('/login')

  }
})
export default router
