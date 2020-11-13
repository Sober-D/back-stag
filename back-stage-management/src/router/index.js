import Vue from 'vue'
import VueRouter from 'vue-router'

//引入element-ui样式
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: () => import('@/views/Login/Login.vue')
  },
  {
    path: '/home',
    name: 'name',
    component: () => import('@/views/home/home.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if(to.path === '/') return next();
  const token = sessionStorage.getItem('token');
  if(!token) return next('/');
  next();
})

export default router
