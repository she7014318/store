import Vue from 'vue'

// 导入路由模块
import Router from 'vue-router'

// 引入子组件
import Login from '@/components/login/Login.vue'

// 打包优化改为异步组件按需加载
const Home = () => import('@/components/home/Home.vue')
const Users = () => import('@/components/users/Users.vue')
const Roles = () => import('../components/roles/Roles.vue')
const Rights = () => import('../components/rights/Rights.vue')
const Categories = () => import('../components/categories/categories.vue')
const Goods = () => import('../components/goods/goods.vue')
const GoodsAdd = () => import('../components/goods-add/goods-add.vue')

// import Home from '@/components/home/Home.vue'
// import Users from '../components/users/Users.vue'
// import Roles from '../components/roles/Roles.vue'
// import Rights from '../components/rights/Rights.vue'
// import Categories from '../components/categories/categories.vue'
// import Goods from '../components/goods/goods.vue'
// import GoodsAdd from '../components/goods-add/goods-add.vue'

Vue.use(Router)

let router = new Router({
  routes: [
    { path: '/', redirect: 'Login' },
    { path: '/login', name: 'login', component: Login },
    {
      path: '/home',
      name: 'home',
      component: Home,
      children: [
        { path: '/users/:page?', name: 'users', component: Users },
        { path: '/rights', name: 'rights', component: Rights },
        { path: '/roles', name: 'roles', component: Roles },
        { path: '/categories', name: 'categories', component: Categories },
        { path: '/goods', name: 'goods', component: Goods },
        { path: '/goods-add', name: 'goods-add', component: GoodsAdd }
      ]
    }
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
