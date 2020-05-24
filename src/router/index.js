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
      path: '/Register',
      name: 'Register',
      component: () => import('@/views/Register.vue')
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/Login.vue')
    },
    {
      path: '/article/:id',
      name: 'Article',
      component: () => import('@/views/Article')
    },
    {
      path: '/edit',
      name: 'Edit',
      component: () => import('@/views/Edit')
    }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
