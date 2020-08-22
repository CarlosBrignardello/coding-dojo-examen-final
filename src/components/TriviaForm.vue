<template>
  <div>
    <form class="alert alert-primary">
      <h3>{{title}}</h3>
      <div class="row">
        <div class="col-6 mt-5 mb-5">
          <input class="mr-3" type="radio" name="alternative" :value="values[0]">
          <label :for="values[0]">{{values[0]}}</label><br>  
        </div>
        <div class="col-6 mt-5 mb-5">
          <input class="mr-3" type="radio" name="alternative" :value="values[1]">
          <label :for="values[1]">{{values[1]}}</label><br>  
        </div>
        <div class="col-6 mt-5 mb-5">
          <input class="mr-3" type="radio" name="alternative" :value="values[2]">
          <label :for="values[2]">{{values[2]}}</label><br>  
        </div>
        <div class="col-6 mt-5 mb-5">
          <input class="mr-3" type="radio" name="alternative" :value="values[3]">
          <label :for="values[3]">{{values[3]}}</label><br>  
        </div>
      </div>


    </form>
  </div>
</template>

<script>
export default {
  name: 'TriviaForm',
  props: {
    title: String,
    values: Array
  }
}
</script>

<style>

</style>