<template>
  <div class="posts">
    <h1>Cast Ballot</h1>
    <input type="radio" id="one" value="Republican" v-model="picked">
    <label for="one">Donald Trump (Republican) </label>
    <br>
    <input type="radio" id="two" value="Democrat" v-model="picked">
    <label for="two">Joe Biden (Democratic) </label>
    <br>
    <input type="radio" id="two" value="Green" v-model="picked">
    <label for="two">TBA (Green Party) </label>
    <br>
    <input type="radio" id="two" value="Independent" v-model="picked">
    <label for="two">TBA (Independent) </label>
    <br>
    <input type="radio" id="two" value="Libertarian" v-model="picked">
    <label for="two">TBA (Libertarian) </label>
    <br>
    <br>
    <span v-if="picked">
      Picked:
      <b>{{ picked }}</b>
    </span>
    <br>
    <br>
    <!--span><b>{{ response }}</b></span><br /-->
    <form v-on:submit="castBallot">
      <input type="text" v-model="input.electionId" placeholder="Enter ElectionId">
      <br>
      <input type="text" v-model="input.voterId" placeholder="Enter VoterId">
      <br>
      <input type="submit" value="Cast Vote">
      <br>
    </form>

    <br>
    <span v-if="response">
      <b>{{ response }}</b>
    </span>
    <br>
    <vue-instant-loading-spinner ref="Spinner"></vue-instant-loading-spinner>
  </div>
</template>

<script>
import PostsService from "@/services/apiService";
import VueInstantLoadingSpinner from "vue-instant-loading-spinner/src/components/VueInstantLoadingSpinner.vue";

export default {
  name: "response",
  data() {
    return {
      input: {},
      picked: null,
      response: null
    };
  },
  components: {
    VueInstantLoadingSpinner
  },
  methods: {
    async castBallot() {
      console.log('picked: ');
      console.log(this.picked);
      this.response = null;
      await this.runSpinner();
      const apiResponse = await PostsService.castBallot(
        this.input.electionId,
        this.input.voterId,
        this.picked
      );
      this.response = apiResponse.data;

      console.log("cast ballot");
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
};
</script>
