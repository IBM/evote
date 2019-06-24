<template>
  <div class="posts">
    <h1>Query By Key</h1>
    <form v-on:submit="queryByKey">
      <input type="text" v-model="input.key" placeholder="Enter Key to Query">
      <br>

      <input type="submit" value="Query">
      <br>
      <br>
      <span v-if="input">
        <b>{{ input.data }}</b>
      </span>  
     

      <br>
    </form>
     <!-- <span v-if="input">        
        <b>{{ input.data }}</b>
      </span> -->
      <!-- <span v-if=!input.data> -->
        <!-- <vue-instant-loading-spinner ref="Spinner"></vue-instant-loading-spinner> -->
      <!-- </span> 
      <span v-else>
        <b>{{ input.data }}</b>
      </span>  -->
      <!-- <button @click="test()">Run Spinner</button> -->

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
      input: {},

    };
  },
  name: 'app',
  components: {
    VueInstantLoadingSpinner
  },
  methods: {
    async queryByKey() {
      // this.input.data = null;
      console.log('this.input: ');
      console.log(this.input);
      if (!this.input.key) {
        this.input.data = await `Error! You must enter a key to query!`;
        // this.hideSpinner();
      } else {
        this.runSpinner();
        const apiResponse = await PostsService.queryByKey(this.input.key);
        console.log(apiResponse);
        this.input = apiResponse;
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
