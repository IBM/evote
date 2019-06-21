<template>
  <div class="posts">
    <h1>2020 Presidential Election</h1>    
    <h3>If you are a registered voter, enter your voterId below</h3>    
    <!--span><b>{{ response }}</b></span><br /-->
    <form v-on:submit="registerVoter">

      <input type="text" v-model="loginData.voterId" placeholder="Enter VoterId">
      <br />

      <input type="submit" value="Login">
          <span v-if="response"><b>{{ response }}</b></span><br />

    </form>

    <br />
    <h3>Otherwise, fill out the form below to register! </h3>
    <form v-on:submit="registerVoter">
      <input type="text" v-model="registerData.voterId" placeholder="Enter Drivers License">
      <br />
      <input type="text" v-model="registerData.registrarId" placeholder="Enter Registrar ID">
      <br />
      <input type="text" v-model="registerData.voterId" placeholder="Enter first name">
      <br />
      <input type="text" v-model="registerData.voterId" placeholder="Enter last name">
      <br />    
    <input type="submit" value="Register">
    </form>

    <span v-if="response"><b>{{ response }}</b></span><br />
  </div>
</template>

<script>
import PostsService from '@/services/apiService'
export default {
  name: 'response',
  data () {
    return {
        loginData: {},
        registerData: {},
        response: null
    }
  },
  methods: {    

    async registerVoter() {
        const apiResponse = await PostsService.registerVoter(this.loginData.voterId);

        console.log(apiResponse)
        this.loginData = apiResponse;
    }
  }
}
</script>
