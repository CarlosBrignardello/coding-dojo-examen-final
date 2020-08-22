import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import { auth } from '../firebase'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { requiresAuth: true }
  },
  {
    path: '/add-question',
    name: 'AddQuestion',
    component: () => import('../views/AddQuestion.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/play-game',
    name: 'PlayGame',
    component: () => import('../views/PlayGame.vue'),
    meta: { requiresAuth: true }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)){

    const user = auth.currentUser
    if(!user){
      next({ path: '/login' })
    }else{
      next()
    }   

  }else{
    next()
  }
})

export default router
