import { createRouter, createWebHistory } from 'vue-router'
import Options from '../views/Options.vue'
import Items from '../views/Items.vue'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/items/:item',
    name: 'Items',
    component: Items
  },
  {
    path: '/options',
    name: 'Options',
    component: Options
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
