import Vue from 'vue'
import App from './App.vue'
import router from './router'
import "@/plugins/echarts";

Vue.config.productionTip = false

new Vue({
  render: function (h) { return h(App) },
  router,
}).$mount('#app')

