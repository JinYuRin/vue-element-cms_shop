/*
 * @Author: JinYuRin 
 * @Date: 2021-07-01 21:07:02 
 * @Last Modified by: JinYuRin
 * @Last Modified time: 2021-07-01 21:09:33
 */
import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import router from './router'
// 利用Vue原型引入全局配置
import $config from './common/config/config'
Vue.prototype.$config = $config
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')