import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../components/Login.vue')
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('../components/Home.vue'),
    redirect: '/welcome',
    children: [
      { path: '/welcome', name: 'Welcome', component: () => import('../components/Welcome.vue') },
      { path: '/users', name: 'Users', component: () => import('../components/user/Users.vue') },
      { path: '/rights', name: 'Rights', component: () => import('../components/power/Rights.vue') },
      { path: '/roles', name: 'Roles', component: () => import('../components/power/Roles.vue') }
    ]
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  // next() 放行  next('/home') 强制跳转
  if (to.path === '/login') return next()
  const token = window.sessionStorage.getItem('token')
  if (!token) return next('/login')
  next()
})

export default router
