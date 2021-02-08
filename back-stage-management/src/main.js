import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 导入element-ui
import './element-ui/index.js';

// 导入公共样式
import '@/assets/assets.css';

// 导入ant Design vue
import Antd from 'ant-design-vue/lib/button';
import 'ant-design-vue/dist/antd.css';
Vue.use(Antd);

// 引入axios
import './api/index.js';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
