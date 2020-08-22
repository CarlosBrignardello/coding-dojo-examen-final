import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

import { auth } from './firebase'
auth.onAuthStateChanged(user => {
  if(user){
    const userLogged = {
      email: user.email,
      uid: user.uid
    }
    store.dispatch('loggedUser', userLogged)
  }
  else{
    store.dispatch('loggedUser', user)
  }
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')
})

