<template>
  <div id="app">
    <div id="nav" class="navbar navbar-expand-lg navbar-light" style="background-color: #eee">
      <p v-if="userIsLogged">Bienvenid@ {{user.email}}</p>
      <router-link v-if="userIsLogged" to="/">Inicio</router-link>
      <router-link v-if="userIsLogged" to="/add-question">Agregar pregunta</router-link>
      <router-link v-if="!userIsLogged" to="/register">Registrarse</router-link>
      <router-link v-if="!userIsLogged" to="/login">Accede a tu cuenta</router-link>
      <button class="btn btn-light" v-if="userIsLogged" @click="closeSession()">Cerrar sesión</button>
      
    </div>
    <router-view/>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'

export default {
  methods: {
    ...mapActions(['closeSession'])
  },
  computed: {
    ...mapGetters(['userIsLogged']),
    ...mapState(['user'])
  }
}
</script>

<style lang="scss">
p{
  margin: 0
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a, p {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
