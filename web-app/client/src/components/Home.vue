<template>
  <div class="posts">
    <h1>2020 Presidential Election</h1>
    <h3>If you are a registered voter, enter your voterId below</h3>
    <!--span><b>{{ response }}</b></span><br /-->
    <form v-on:submit="validateVoter">
      <input type="text" v-model="loginData.voterId" placeholder="Enter VoterId">
      <br>

      <input type="submit" value="Login">
      <br>
      <br>
      <span v-if="loginReponse">
        <b>{{ loginReponse.data }}</b>
      </span>
      <br>
    </form>

    <br>
    <h3>Otherwise, fill out the form below to register!</h3>
    <form v-on:submit="registerVoter">
      <input type="text" v-model="registerData.voterId" placeholder="Enter Drivers License">
      <br>
      <input type="text" v-model="registerData.registrarId" placeholder="Enter Registrar ID">
      <br>
      <input type="text" v-model="registerData.firstName" placeholder="Enter first name">
      <br>
      <input type="text" v-model="registerData.lastName" placeholder="Enter last name">
      <br>
      <input type="submit" value="Register">
    </form>
    <span v-if="registerReponse">
      <b>{{ registerReponse.data }}</b>
    </span>
    <br>
    <vue-instant-loading-spinner ref="Spinner"></vue-instant-loading-spinner>
  </div>
</template>

<script>
import PostsService from "@/services/apiService";
import VueInstantLoadingSpinner from 'vue-instant-loading-spinner/src/components/VueInstantLoadingSpinner.vue'

export default {
  name: "response",
  data() {
    return {
      loginData: {},
      registerData: {},
      registerReponse: {
        data: ''
      },
      loginReponse: {
        data: ''
      },
    };
  },
  components: {
    VueInstantLoadingSpinner
  },
  methods: {
    async registerVoter() {
      await this.runSpinner();
      const apiResponse = await PostsService.registerVoter(
        this.registerData.voterId,
        this.registerData.registrarId,
        this.registerData.firstName,
        this.registerData.lastName
      );

      console.log(apiResponse);
      this.registerReponse = apiResponse;
      await this.hideSpinner();
    },

    async validateVoter() {
      await this.runSpinner();
      const apiResponse = await PostsService.registerVoter(
        this.loginData.voterId
      );

      console.log(apiResponse);
      this.loginReponse = apiResponse;
      await this.hideSpinner();
    },
    async runSpinner() {
      this.$refs.Spinner.show();
    },
    async hideSpinner() {
      this.$refs.Spinner.hide();
    }
  }
};
</script>
