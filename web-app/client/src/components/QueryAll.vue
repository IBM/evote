<template>
  <div class="posts">
    <h1>Current State: All Key-Value Pairs in World State</h1>
    <button v-on:click="queryAll()">Query All Assets</button>

    <div v-bind:key="carEntry.Key" v-for="carEntry in response">
      <p>{{ carEntry.Key }} | {{ carEntry.Record }}</p>
    </div>
    <vue-instant-loading-spinner id = 'loader' ref="Spinner"></vue-instant-loading-spinner>
  </div>
</template>

<script>
import PostsService from "@/services/apiService";
import VueInstantLoadingSpinner from "vue-instant-loading-spinner/src/components/VueInstantLoadingSpinner.vue";

export default {
  name: "response",
  data() {
    return {
      response: {}
    };
  },
  components: {
    VueInstantLoadingSpinner
  },
  methods: {
    async queryAll() {
      this.response = null;
      this.runSpinner();
      const apiResponse = await PostsService.queryAll();
      this.response = apiResponse.data;
      this.hideSpinner();
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
