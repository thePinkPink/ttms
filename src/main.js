import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router/router.js'
import store from './store'
import './plugins/iview.js'

import '../public/ico.js'
import '../public/ico.css'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
