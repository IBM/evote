<template>
  <div class="posts">
    <h1>Cast Ballot</h1>    
    <!--span><b>{{ response }}</b></span><br /-->
    <form v-on:submit="addCar">
      <input type="text" v-model="newCar.electionId" placeholder="Enter ElectionId">
      <br />
      <input type="text" v-model="newCar.voterId" placeholder="Enter VoterId">
      <br />

      <input type="submit" value="Cast Vote">
      
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
        const apiResponse = await PostsService.createCar(this.newCar.electionId, this.newCar.voterId)
        this.response = apiResponse.data
        
        console.log('add car');
        console.log(this.newCar);
      }
  }
}
</script>
