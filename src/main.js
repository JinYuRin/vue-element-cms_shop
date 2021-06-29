/*  ctrl+alt+i
 * @Author: mikey.zhaopeng 
 * @Date: 2021-06-29 21:54:55 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2021-06-29 22:01:44
 */
import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import router from './router'
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
