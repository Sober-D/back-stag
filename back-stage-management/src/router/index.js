import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: () => import('@/views/login/login.vue')
  },
  {
    path: '/home',
    name: 'name',
    redirect: '/wecome',
    component: () => import('@/views/home/home.vue'),
    children:[
      {
        path: '/wecome',
        name: 'weCome',
        component: () => import('@/views/weCome/weCome.vue')
      },
      {
        path: '/users',
        name: 'users',
        component: () => import('@/views/users/users.vue')
      },
      {
        path: '/roles',
        name: 'roles',
        component: () => import('@/views/rights/roles.vue')
      },
      {
        path: '/rights',
        name: 'rights',
        component: () => import('@/views/rights/rights.vue')
      },
      {
        path: '/goods',
        name: 'goods',
        component: () => import('@/views/goods/goods.vue')
      },
      {
        path: '/params',
        name: 'params',
        component: () => import('@/views/goods/params.vue')
      },
      {
        path: '/categories',
        name: 'categories',
        component: () => import('@/views/goods/categories.vue')
      },
      {
        path: '/orders',
        name: 'orders',
        component: () => import('@/views/orders/orders.vue')
      },
      {
        path: '/reports',
        name: 'reports',
        component: () => import('@/views/reports/reports.vue')
      },
    ]
  },
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
