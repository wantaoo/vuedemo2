// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import fastclick from 'fastclick'
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import VueLazyLoad from 'vue-lazyload'
import axios from 'axios'

import './common/stylus/index.styl'

Vue.prototype.$http = axios

Vue.config.productionTip = false

fastclick.attach(document.body)

Vue.use(VueLazyLoad,{
	loading: require('../src/common/image/default.png')
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
