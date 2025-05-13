import { createRouter, createWebHistory } from 'vue-router'

import Home from '@/pages/Home.vue'

import LoginPage from '@/pages/Login.vue'
import UserPage from '@/pages/UserAccount.vue'
import ProductsPage from '@/pages/Product.vue'
import AboutPage from '@/pages/About.vue'
import GalleryPage from '@/pages/Gallery.vue'
import Cabinet from '@/pages/UserAccount.vue'
import Karzine from '@/pages/ProCard.vue'
import Ask from '@/pages/ASK.vue'
import Detali from '@/pages/Detalitov.vue'
import Loves from '@/pages/Love.vue'

const routes = [
  { path: '/', component: Home, name: 'home' },
 
  { path: '/login', component: LoginPage, name: 'login' },
  { path: '/user/:id', component: UserPage, name: 'user' },
  { path: '/products', component: ProductsPage, name: 'products' },
  { path: '/about', component: AboutPage, name: 'about' },
  { path: '/gallery', component: GalleryPage, name: 'gallery' },
  { path: '/karzine', component: Karzine, name: 'karzine' },
  { path: '/ask', component: Ask, name: 'ask' },
  { path: '/cabinet', component: Cabinet, name: 'cabiney' },
  { path: '/detali/:id', component: Detali, name: 'detali' },
  { path: '/love', component: Loves, name: 'love' },
 
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {// ДЛЯ АСКА 
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
      }
    }
    return { top: 0 }
  }
})




export default router
