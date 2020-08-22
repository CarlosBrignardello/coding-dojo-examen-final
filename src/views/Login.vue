<template>
  <div>
    <h1 class="mb-5 mt-5">Acceder a la cuenta</h1>
    <form class="container" @submit.prevent="loginUser({email: email, password: password})">
      <input class="w-100 mb-3" type="email" placeholder="Ingresa tu correo" v-model="email">
      <input class="w-100 mb-3" type="password" placeholder="Ingresa la contraseña" v-model="password">
      <button class="btn btn-primary" type="submit">Ingresar</button>
    </form>
    <p>{{error}}</p>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'Login',
  data(){
    return {
      email: '',
      password: ''
    }
  },
  methods:{
    ...mapActions(['loginUser'])
  },
  computed:{
    ...mapState(['error'])
  }
}
</script>

<style>

</style>