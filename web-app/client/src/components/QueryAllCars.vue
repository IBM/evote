<template>
  <div class="posts">
    <h1>Query All Cars</h1>    
    <div v-bind:key="carEntry.Key" v-for="carEntry in response" >
      <p> {{ carEntry.Key }} | {{ carEntry.Record }}  </p>
    </div>
    
  </div>
</template>

<script>
import PostsService from '@/services/apiService'
export default {
  name: 'response',
  data () {
    return {
      response: {}
    }
  },
  mounted () {
    this.load()
  },
  methods: {
    async load () {
      const apiResponse = await PostsService.queryAllCars()
      this.response = apiResponse.data
    }
  }
}
</script>
