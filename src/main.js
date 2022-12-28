import Vue from 'vue'
// import App from './App.vue'
import router from './router'
import store from './store'
import Antd from 'ant-design-vue'
// import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
import 'ant-design-vue/dist/antd.css'
// import Myecharts from 'echarts'
import echarts from 'echarts'
import axios from 'axios'
// import { Button } from 'ant-design-vue'
// Vue.use(Button)
import { get, post } from './utils/https'
// import './util/pxtorem'
import './assets/style/common.less'
import { message } from 'ant-design-vue'
//main.js
import moment from 'moment';
Vue.prototype.$moment = moment;

Vue.prototype.$message = message;

Vue.config.productionTip = false
Vue.prototype.$echarts = echarts
Vue.prototype.$ajax = axios

Vue.prototype.$https = {
  get,
  post,
}

Vue.use(Antd)
Vue.use(echarts)
// Vue.use(ElementUI);

new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  router,
  store,
  render: h => h(App)
}).$mount('#app')