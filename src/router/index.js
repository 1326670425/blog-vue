import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

  const routes = [
    {
      path: '/',
      component: () => import('@/views/Home.vue'),
      children:[{
        path: '/',
        name: 'Content',
        component: () => import('@/views/Content.vue')
      },
      {
        path: '/table',
        name: 'Table',
        component: () => import('@/views/Table.vue')
      }]
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/Login.vue')
    }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
