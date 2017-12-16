import Vue from 'vue'
import App from './App'
import router from './router'
import './assets/style/reset.css'
import 'swiper/dist/css/swiper.css'
import './assets/style/iconfont/iconfont.css'
import VueSwiper from 'vue-awesome-swiper'
import VueSource from 'vue-resource'

Vue.config.productionTip = false
Vue.use(VueSwiper)
Vue.use(VueSource)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
