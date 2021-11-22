import { createRouter, createWebHistory } from 'vue-router'
import Options from '../views/Options.vue'
import Items from '../views/Items.vue'
import Home from '../views/Home.vue'
import Register from '../views/Register.vue'
import Login from '../views/Login.vue'
import Item from '../views/Item.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/items',
    name: 'Item',
    component: Item
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
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
