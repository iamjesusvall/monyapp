import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'


import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)

Vue.config.productionTip = false

Vue.filter('toCurrency', (value) => {
  if (typeof value !== "number") {
    return value;
  }
  let formatter = new Intl.NumberFormat('es-VE', {
      style: 'decimal',
      minimumFractionDigits: 2
  });
  return formatter.format(value);
})

Vue.filter('capitalize', function (value) {
  if (!value) return ''
  value = value.toString()
  return value.charAt(0).toUpperCase() + value.slice(1)
})

new Vue({
  router,
  store,
  created() {
    this.$store.commit('initStore')
  },
  render: h => h(App)
}).$mount('#app')
