<template>
  <div class="home">

    <div class="alert alert-warning">
      <router-link to="/play-game">
        <button class="btn btn-primary">Jugar</button>
      </router-link>

      <p>Haz click en este botón para empezar a jugar</p>
    </div>

<table class="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Usuario</th>
      <th scope="col">Puntaje</th>
      <th scope="col">Porcentaje</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="(score, index) in allScores" :key="index">
      <th scope="row">{{index}}</th>
      <td>{{score.user}}</td>
      <td>{{score.score}}</td>
      <td>{{score.percent}}</td>
    </tr>
  </tbody>
</table>

  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'Home',
  computed: {
    ...mapState(['user', 'userTrivias', 'allScores']),
    orderedScores(){
      this.allScores.score.sort()
    }
  },
  methods: {
    ...mapActions(['getUserTrivias', 'deleteTrivia', 'getAllUsersScores'])
  },
  created(){
    this.getUserTrivias()
    this.getAllUsersScores()
  }
}
</script>
