<template>
  <div>
    <h1 class="mb-5 mt-5">Registrarse</h1>
    <form class="container" @submit.prevent="createUser({email: email, password: password})">
      <input class="w-100 mb-3" type="email" placeholder="Ingresa tu correo" v-model="email">
      <input class="w-100 mb-3" type="password" placeholder="Ingresa la contraseña" v-model="password">
      <input class="w-100 mb-3" type="password" placeholder="Repite la contraseña" v-model="valPassword">
      <button class="btn btn-primary" type="submit" :disabled="!disablePassword">Registarse</button>
    </form>
    <p v-if="error && error.code === 'auth/weak-password'">La contraseña debe tener almenos 6 caracteres.</p>
  </div>
</template>

<script>
import {mapActions, mapState} from 'vuex'

export default {
  name: 'Register',
  data(){
    return{
      email: '',
      password: '',
      valPassword: ''
    }
  },
  created(){

  },
  methods: {
    ...mapActions(['createUser'])
  },
  computed: {
    ...mapState(['error']),
    disablePassword(){
      return this.password === this.valPassword && this.password.trim() != '' && this.password.length > 5
    }
  }
}
</script>

<style>
</style>