// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
// import VueLazyLoad from 'vue-lazyload'
import $ from 'jquery'
import 'element-ui/lib/theme-chalk/index.css'
import './common/font-awesome-4.7.0/css/font-awesome.css'
import 'babel-polyfill'
import './common/scss/reset.scss'
import './common/scss/icon.scss'
import './common/scss/common.scss'
import Cookies from 'js-cookie'
//将axios挂载到原型上
Vue.prototype.$cookie = Cookies;


Vue.config.productionTip = false
Vue.use(ElementUI)

// 图片浏览
import preview from 'vue-photo-preview'
import 'vue-photo-preview/dist/skin.css'
Vue.use(preview)
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
