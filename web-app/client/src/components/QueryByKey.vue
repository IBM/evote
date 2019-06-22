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

    <br>
  </div>
</template>

<script>
import PostsService from "@/services/apiService";
export default {
  name: "response",
  data() {
    return {
      input: {},

    };
  },
  methods: {
    async queryByKey() {
      if (!this.input.key) {
        this.input.data = `Error! You must enter a key to query!`;
      } else {
        const apiResponse = await PostsService.queryByKey(this.input.key);
        console.log(apiResponse);
        this.input = apiResponse;
      }
    }
  }
};
</script>
