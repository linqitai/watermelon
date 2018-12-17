// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import $ from 'jquery'
import 'element-ui/lib/theme-chalk/index.css'
import './common/font-awesome-4.7.0/css/font-awesome.css'
import 'babel-polyfill'
import './common/scss/reset.scss'
import './common/scss/icon.scss'
import './common/scss/common.scss'
// import './common/js/utils'
// import utils from './common/js/utils'
import axios from "axios"
import Cookies from 'js-cookie'
//将axios挂载到原型上
Vue.prototype.$axios = axios;
Vue.prototype.$cookie = Cookies;
Vue.prototype.HOST='/api'

//配置全局的axios默认值（可选）
// Axios.defaults.baseURL = 'https://wx.chinaxywl.com';
// Axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// Axios.defaults.headers.post['token'] = localStorage.getItem('token');

Vue.config.productionTip = false
Vue.use(ElementUI)
// 图片浏览
import preview from 'vue-photo-preview'
import 'vue-photo-preview/dist/skin.css'
Vue.use(preview)
// 富文本编辑器
// import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
// import '@/styles/index.scss' // global css
// Vue.use(VueQuillEditor)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
