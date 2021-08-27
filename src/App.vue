<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/> -->
     <router-view></router-view>   
    <Bar />
  </div>
</template>

<script>
import Bar from './components/switchBar.vue'
// import HelloWorld from './components/HelloWorld.vue'
// import Car from './views/car.vue'

export default {
  name: 'App',
  components: {
    // HelloWorld
    // Car
    Bar
  }
}
</script>

<style>
#app {
  padding-bottom: 1rem;
  /* font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px; */
}
</style>
