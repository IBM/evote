<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">    
      
        <p><router-link to="/">Home</router-link>&nbsp;          
        <router-link to="/createCar">Create Car</router-link>&nbsp;
        <router-link to="/changeCarOwner">Change Car Owner</router-link>&nbsp;
        <router-link to="/QueryAll">QueryAll</router-link></p>
        <router-link to="/queryWithQueryString">Query by Type</router-link>&nbsp;
      
      <router-view></router-view>
    </div>
</template>

<script>

export default {
  name: 'app'  
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
