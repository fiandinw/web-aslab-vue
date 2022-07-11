import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import AdminLoginView from '../views/AdminLoginView.vue'
import DashboardView from '../views/DashboardView.vue'
import AdminDashboardView from '../views/AdminDashboardView.vue'
import LaporView from '../views/LaporView.vue'
import RekapView from '../views/RekapView.vue'
import AdminKelolaView from '../views/AdminKelolaView.vue'
import AdminRekapView from '../views/AdminRekapView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginView
    },
    {
      path: '/admin',
      name: 'adminLogin',
      component: AdminLoginView
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView
    },
    {
      path: '/admin/dashboard',
      name: 'adminDashboard',
      component: AdminDashboardView
    },
    {
      path: '/lapor',
      name: 'lapor',
      component: LaporView
    },
    {
      path: '/rekap',
      name: 'rekap',
      component: RekapView
    },
    {
      path: '/admin/kelola',
      name: 'adminKelola',
      component: AdminKelolaView
    },
    {
      path: '/admin/rekap',
      name: 'adminRekap',
      component: AdminRekapView
    },
  ]
})

router.beforeEach(async (to, from) => {
  if (localStorage.getItem("asistenId") && ['adminLogin','adminDashboard', 'adminKelola','adminRekap', 'login'].includes(to.name)){
    return {name: 'dashboard'}
  }
  if (localStorage.getItem("adminId") && ['adminLogin','dashboard', 'lapor', 'login', 'rekap'].includes(to.name)){
    return {name: 'adminDashboard'}
  }
  if ( !localStorage.getItem("asistenId") && ['dashboard', 'lapor', 'rekap'].includes(to.name) ) {
    return { name: 'login' }
  }
  if ( !localStorage.getItem("adminId") && ['adminDashboard', 'adminKelola', 'adminRekap'].includes(to.name) ) {
    return { name: 'adminLogin' }
  }
})

export default router
