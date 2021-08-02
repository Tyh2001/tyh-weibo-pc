import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import tyhUI from 'tyh-ui/lib'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Axios from 'axios'
import qs from 'qs'
Vue.use(ElementUI)
Vue.use(tyhUI)

Vue.config.productionTip = false
Vue.prototype.$axios = Axios
Vue.prototype.$qs = qs

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
