// 引入Vue实例
import Vue from 'vue';

// 引入axios
import axios from 'axios';

// 设置默认请求路径
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/';

// 设置请求拦截器
axios.interceptors.request.use(config => {
    // config就相当于请求的数据，最后必须return
    // console.log(config,'请求拦截器');
    // 设置一个预请求
    config.headers.Authorization = sessionStorage.getItem('token');

    return config;
})

// Vue原型设置自定义axios;
Vue.prototype.$axios = axios;