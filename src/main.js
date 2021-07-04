/*
 * @Author: JinYuRin 
 * @Date: 2021-07-01 21:07:02 
 * @Last Modified by: JinYuRin
 * @Last Modified time: 2021-07-04 20:22:28
 */
import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import router from './router'
import echarts from 'echarts'
import $config from './common/config/config'
Vue.prototype.$config = $config
// 有时候莫名的错误也有可能是因为版本不兼容的问题
Vue.prototype.$echarts = echarts; // 利用Vue原型引入全局配置
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')