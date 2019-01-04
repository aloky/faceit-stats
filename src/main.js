import Vue from 'vue'
import App from './App.vue'
import router from './router'
import AtUi from 'at-ui'
import axios from 'axios'
import VueAxios from 'vue-axios'

// api
Vue.use(VueAxios, axios)

// flags
import 'flag-icon-css/css/flag-icon.min.css'

// framework
Vue.use(AtUi)
import 'at-ui-style/css/at.css'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
