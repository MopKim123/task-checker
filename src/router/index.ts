import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router' 
import Login from '../views/Login.vue'
import Home from '../views/Home.vue'

const routes: RouteRecordRaw[] = [
  { path: '/', component: Login },  
  { path: '/home', component: Home },  
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
