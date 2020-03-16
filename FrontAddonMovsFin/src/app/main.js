// Polyfills
import 'es6-promise/auto'
import 'babel-polyfill'
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import { ColorThemePlugin } from 'vuestic-ui/src/services/ColorThemePlugin'
import store from '../store/index'
import router from '../router/index'
import VuesticPlugin from 'vuestic-ui/src/components/vuestic-plugin'
import '../i18n/index'
import YmapPlugin from 'vue-yandex-maps'
import VueClipboard from 'vue-clipboard2'
import VeeValidate from 'vee-validate'
import axios from 'axios'
import '../metrics'
import VueExcelXlsx from 'vue-excel-xlsx'

// NOTE: workaround for VeeValidate + vuetable-2
Vue.use(VeeValidate, { fieldsBagName: 'formFields' })

Vue.use(VuesticPlugin)
Vue.use(YmapPlugin)
Vue.use(VueClipboard)
Vue.use(VueExcelXlsx)
Vue.use(ColorThemePlugin,
  {
    // Add or change theme colors here
    themes: {
    //  primary: this.$themes.primary,
      // blurple: '#7289DA',
    },
  })

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next()
      return
    }
    next('/login')
  } else {
    next()
  }
})
axios.defaults.baseURL = 'http://localhost:8008/api'
Vue.prototype.$http = axios
const token = localStorage.getItem('token')
if (token) {
  Vue.prototype.$http.defaults.headers.common['Authorization'] = token
}
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
})
