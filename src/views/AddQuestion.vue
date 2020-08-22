<template>
  <div>
    <h1 class="mt-5 mb-5">Agregar una pregunta</h1>
    <form class="container" @submit.prevent="addUserTrivia2({ name: name, trueValue: trueValue, falseValues: falseValues, user: user.email })">
      <label class="w-100">Nombre de la pregunta</label>
      <input class="w-100 mb-5" type="text" v-model="name">

      <label class="w-100">Valor verdadero</label>
      <input class="w-100 mb-5" type="text" v-model="trueValue">

      <label class="w-100">Valor falso #1</label>
      <input class="w-100 mb-5" type="text" v-model="falseValues.falseValue1">

      <label class="w-100">Valor falso #2</label>
      <input class="w-100 mb-5" type="text" v-model="falseValues.falseValue2">

      <label class="w-100">Valor falso #3</label>
      <input class="w-100 mb-5" type="text" v-model="falseValues.falseValue3">

      <button class="btn btn-primary" type="submit">Agregar</button>
    </form>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'AddQuestion',
  data(){
    return {
      name: '',
      trueValue: '',
      falseValues: { 
        falseValue1: '',
        falseValue2: '',
        falseValue3: ''
      }
    }
  },
  methods: {
    ...mapActions(['addUserTrivia2'])
  },
  computed: {
    ...mapState(['user'])
  }
}
</script>

<style>

</style>