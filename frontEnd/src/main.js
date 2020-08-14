// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/css/normalize.css'
import Header from './component/Header'

Vue.use(ElementUI)
Vue.config.productionTip = false


//注册全局头部
Vue.component('myheader',Header);

//格式化时间
Vue.filter('formatTime', function (value) {
  var da = new Date(value.replace("/Date(", "").replace(")/", "").split("+")[0]);

  return da.getFullYear() + "-" + (da.getMonth() + 1) + "-" + da.getDate() + " " + da.getHours() + ":" + da.getMinutes() + ":" + da.getSeconds();
})


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
