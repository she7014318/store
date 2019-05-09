// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// 引入element
import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'

import './assets/comment.css'

// 引入element树插件
import ElTreeGrid from 'element-tree-grid'

// 处理 axios的三个问题
// 问题1 :基路径
import axios from 'axios'

Vue.component(ElTreeGrid.name, ElTreeGrid)// 引入element树插件

axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'
// 问题2 : 每次都要 引入axios
Vue.prototype.$axios = axios
// 问题3 : 拦截器
axios.interceptors.request.use(function (config) {
  // Do something before request is sent
  config.headers.Authorization = localStorage.getItem('token')
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

// 安装element
Vue.use(ElementUI)
Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
