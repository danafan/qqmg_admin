import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import echarts from 'echarts'
Vue.prototype.$echarts = echarts

Vue.use(ElementUI);
Vue.prototype.baseUrl = "http://localhost:8089/static/uploads/";		
new Vue({
  render: h => h(App),
  router
}).$mount('#app')