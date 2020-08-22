<template>
  <form>
    <p class="mt-5">Hola {{user.email}}</p>
    <p class="mb-5">Bienvenido!, responde las siguientes  tres preguntas para determinar tu puntaje!</p>

    <TriviaForm :title="allValuesTrivias.allValues[0].triviaName" :values="allValuesTrivias.array[0]"/>
    <TriviaForm :title="allValuesTrivias.allValues[1].triviaName" :values="allValuesTrivias.array[1]"/>
    <TriviaForm :title="allValuesTrivias.allValues[2].triviaName" :values="allValuesTrivias.array[2]"/>

    <p v-if="faileGame">Necesitas seleccionar todas las opciones!</p>

    <button class="container bg bg-primary w-100 mb-3" @click.prevent="readChecks()">Enviar</button>
  </form>
</template>

<script>
import TriviaForm from '../components/TriviaForm'
import { mapActions, mapState } from 'vuex'

export default {
  name: 'PlayGame',
  data(){
    return {
      shuffleTrivias: [],
      optionValues: [],
      faileGame: false,
      trueValues: [],
    }
  },
  components: {
    TriviaForm
  },
  computed: {
    ...mapState(['user', 'allTrivias', 'allValuesTrivias'])
  },
  methods: {
    ...mapActions(['getAllTrivias', 'addScore', 'getValuesTrivias']),
    readChecks(){
      let choicesSelected = []
      for(let i = 0; i < 3; i++){
        for(let j = 0; j < 4; j++){
          let selector = document.querySelectorAll('.row')[i].querySelectorAll('input')[j]
          if(selector.checked === true){
            choicesSelected.push(selector.value)
          }
        }
      }
      console.log(choicesSelected)
      if(choicesSelected.length < 3){
        this.faileGame = true
      }
      else{
        this.faileGame = false
        let score = 0
        let percent = 0
        for(let i = 0; i < 4; i++){
          if(this.allValuesTrivias.true.includes(choicesSelected[i])){
            console.log('SE CUMPLE')
            score++
          }
        }
        if(score === 0){
          percent = '0%'
        }
        if(score === 1){
          percent = '33.3%'
        }
        if(score === 2){
          percent = '66.6%'
        }
        if(score === 3){
          percent = '100%'
        }
        this.addScore({score: score, percent: percent, user: this.user.email})
      }
    }
  },
  created(){
    this.getAllTrivias()
    this.getValuesTrivias()
  },
  mounted(){
  },
  updated(){
    
  }

}
</script>

<style>

</style>