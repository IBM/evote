<template>
  <div class="posts">
    <h1>Select the type of object to query for</h1>  
  <select v-model="selected">
  <option disabled value="">Please select one</option>
  <option>ballot</option>
  <option>election</option>
  <option>votableItem</option>
  <option>voter</option>
</select>
<br>

<br>

      <button v-on:click="queryByQueryString()">Query the world State</button>

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
        selected: {},
        response: null
    }
  },
  methods: {    
    async queryByQueryString(selected) {
      console.log(`this.selected ${this.selected}`);
      // console.log(queryString)
        const apiResponse = await PostsService.queryWithQueryString(this.selected)
        this.response = apiResponse.data
        
        console.log('query by object type called');
        // console.log(this.newCar);
      }
  }
}
</script>
