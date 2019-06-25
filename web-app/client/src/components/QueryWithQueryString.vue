<template>
  <div class="posts">
    <h1>Select the type of object to query for</h1>
    <select v-model="selected">
      <option disabled value>Please select one</option>
      <option>ballot</option>
      <option>election</option>
      <option>votableItem</option>
      <option>voter</option>
    </select>
    <br>

    <br>

    <button v-on:click="queryByQueryString()">Query the world State</button>

    <br>
    <br>
    <br>
    <span v-if="response">
      <b>{{ response }}</b>
    </span>
    <br>
    <vue-instant-loading-spinner id='loader' ref="Spinner"></vue-instant-loading-spinner>
  </div>
</template>

<script>
import PostsService from "@/services/apiService";
import VueInstantLoadingSpinner from "vue-instant-loading-spinner/src/components/VueInstantLoadingSpinner.vue";

export default {
  name: "response",
  data() {
    return {
      selected: {
        data: ""
      },
      response: null
    };
  },
  components: {
    VueInstantLoadingSpinner
  },
  methods: {
    async queryByQueryString(selected) {
      this.response = null;
      this.runSpinner();
 
      //check to make sure the user selected something
      if (this.selected != 'ballot' && this.selected != 'election' 
        && this.selected!= 'voter' && this.selected != 'votableItem') {

        console.log('this . selectionesdfsdfds')
        let result = `Please select a type of object!`;
        this.response = result;
        this.hideSpinner();

      } else {
        const apiResponse = await PostsService.queryWithQueryString(
        this.selected
      );
      this.response = apiResponse.data;

      console.log("query by object type called");
      this.hideSpinner();
      }
      
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
