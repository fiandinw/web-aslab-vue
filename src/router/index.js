import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // {
    //   path: '/',
    //   name: 'home',
    //   component: HomeView
    // },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // }
    {
      path: '/',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/admin',
      name: 'adminLogin',
      component: () => import('../views/AdminLoginView.vue')
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../views/DashboardView.vue')
    },
    {
      path: '/admin/dashboard',
      name: 'adminDashboard',
      component: () => import('../views/AdminDashboardView.vue')
    },
    {
      path: '/lapor',
      name: 'lapor',
      component: () => import('../views/LaporView.vue')
    },
  ]
})

router.beforeEach(async (to, from) => {
  if ( !localStorage.getItem("asistenId") && ['dashboard', 'lapor'].includes(to.name) ) {
    return { name: 'login' }
  }
  if ( !localStorage.getItem("adminId") && ['adminDashboard'].includes(to.name) ) {
    return { name: 'adminLogin' }
  }
})

export default router
