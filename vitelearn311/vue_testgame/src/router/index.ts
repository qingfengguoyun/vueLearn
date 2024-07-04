import { createRouter, createWebHistory } from 'vue-router'

import GamePage from '@/components/GamePage.vue'
import GoogleGame from '@/components/GoogleGame.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/game',
      name: 'game',
      component: GamePage
    },
    {
      path: '/',
      redirect : '/game'
    },
    {
      path: '/googleGame',
      name: 'googleGame',
      component : GoogleGame
    }
  ]
})

export default router
