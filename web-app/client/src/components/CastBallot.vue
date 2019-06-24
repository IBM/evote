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
    <vue-instant-loading-spinner ref="Spinner"></vue-instant-loading-spinner>
  </div>
</template>

<script>
import PostsService from '@/services/apiService'
import VueInstantLoadingSpinner from 'vue-instant-loading-spinner/src/components/VueInstantLoadingSpinner.vue'

export default {
  name: 'response',
  data () {
    return {
        input: {},
        response: null
    }
  },
  components: {
    VueInstantLoadingSpinner
  },
  methods: {    
    async castBallot() {
      this.response = null;
      await this.runSpinner();
      const apiResponse = await PostsService.castBallot(this.input.electionId, this.input.voterId)
      this.response = apiResponse.data
      
      console.log('cast ballot');
      console.log(this.input);
      await this.hideSpinner();
    },
    async runSpinner() {
      this.$refs.Spinner.show();
    },
    async hideSpinner() {
      this.$refs.Spinner.hide();
    }
  }
}
</script>
