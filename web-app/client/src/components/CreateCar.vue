<template>
  <div class="posts">
    <h1>Create Car</h1>    
    <!--span><b>{{ response }}</b></span><br /-->
    <form v-on:submit="addCar">
      <input type="text" v-model="newCar.make" placeholder="Enter Make">
      <br />
      <input type="text" v-model="newCar.model" placeholder="Enter Model">
      <br />
      <input type="text" v-model="newCar.color" placeholder="Enter Color">
      <br />
      <input type="text" v-model="newCar.owner" placeholder="Enter Owner">
      <br />

      <input type="submit" value="Submit">
      
    </form>

    <br />
    <span v-if="response"><b>{{ response }}</b></span><br />
  </div>
</template>

<script>
import PostsService from '@/services/apiService'
export default {
  name: 'response',
  data () {
    return {
        newCar: {},
        response: null
    }
  },
  methods: {    
    async addCar() {
        const apiResponse = await PostsService.createCar(this.newCar.make, this.newCar.model, this.newCar.color, this.newCar.owner)
        this.response = apiResponse.data
        
        console.log('add car');
        console.log(this.newCar);
      }
  }
}
</script>
