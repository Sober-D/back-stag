import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 导入element-ui
import { Button, Form, FormItem, Input, Message} from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(Button);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
Vue.prototype.$message = Message;
// 导入公共样式
import '@/assets/assets.css';

// 引入axios
import axios from 'axios';
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/';
Vue.prototype.$axios = axios;

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
