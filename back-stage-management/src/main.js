import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 导入element-ui
import './element-ui';

// 导入公共样式
import '@/assets/assets.css';

// 引入axios
import './api';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
