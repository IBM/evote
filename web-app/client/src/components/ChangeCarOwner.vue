<template>
  <div class="posts">
    <h1>Change Car Owner</h1>
    <!--span><b>{{ response }}</b></span><br /-->
    <select v-model="changeOwner.carKey">
      <option v-bind:key="carEntry.Key" v-for="carEntry in carKeys" >{{ carEntry.Key }}</option>
    </select>    
    <br />
    <input type="text" v-model="changeOwner.newOwner" placeholder="Enter New Owner">
    <br /><br />
    <button v-on:click="changeCarOwner()">Change Owner</button>
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
        changeOwner: {},
        carKeys: [],
        selectedOption: null,
        response: null
    }
  },
  mounted () {
    this.load(),
    this.selectedOption = this.value
  },
  methods: {
    async load () {
      const apiResponse = await PostsService.queryAllCars()
      this.carKeys = apiResponse.data
    },
    async changeCarOwner() {
        const apiResponse = await PostsService.changeCarOwner(this.changeOwner.carKey, this.changeOwner.newOwner)
        this.response = apiResponse.data
        
        console.log('changeOwner');
        console.log(this.changeOwner);
      }
  }
}
</script>
