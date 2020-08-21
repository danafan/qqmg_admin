import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import echarts from 'echarts'
Vue.prototype.$echarts = echarts

Vue.use(ElementUI);
Vue.prototype.baseUrl = "http://localhost:8089/static/uploads/";	
// Vue.prototype.captcha = `${location.origin}/admin/admin/captcha`;		//获取验证码前缀	
Vue.prototype.captcha = 'http://114.67.110.57/admin/admin/captcha';		//获取验证码前缀	
new Vue({
  render: h => h(App),
  router
}).$mount('#app')
