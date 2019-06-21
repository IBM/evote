<template>
  <div class="posts">
    <h1>Cast Ballot</h1>    
    <!--span><b>{{ response }}</b></span><br /-->
    <form v-on:submit="castBallot">
      <input type="text" v-model="input.electionId" placeholder="Enter ElectionId">
      <br />
      <input type="text" v-model="input.voterId" placeholder="Enter VoterId">
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
        input: {},
        response: null
    }
  },
  methods: {    
    async castBallot() {
        const apiResponse = await PostsService.castBallot(this.input.electionId, this.input.voterId)
        this.response = apiResponse.data
        
        console.log('cast ballot');
        console.log(this.input);
      }
  }
}
</script>
