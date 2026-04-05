import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'

const routes = [
  {
    path: '/',
    component: HomeView
  },
  {
    path: '/about',
    component: AboutView
  },
  {
    path: '/catalog',
    component: () => import('../views/CatalogView.vue')
  },
  {
    path: '/catalog/:id',
    component: () => import('../views/ProductDetails.vue')
  },
  {
    path: '/profile',
    component: () => import('../views/ProfileView.vue'),
    children: [
      {
        path: 'info',
        component: () => import('../views/ProfileInfo.vue')
      },
      {
        path: 'settings',
        component: () => import('../views/ProfileSettings.vue')
      }
    ]
  },

  {
    path: '/:pathMatch(.*)*',
    component: () => import('../views/NotFound.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router