<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/> -->
     <router-view></router-view>
     <Bar :showBar="show" /> 
  </div>
</template>

<script>
import Bar from './components/switchBar.vue'
// import HelloWorld from './components/HelloWorld.vue'
// import Car from './views/car.vue'

export default {
  name: 'App',
  data () {
    return {
      show:true
    };
  },
  components: {
    // HelloWorld
    // Car
    Bar
  },
 watch: {
   '$route':{
    handler(to, from) { //监听路由是否变化
      if(to.meta.showBar != undefined){
        this.show = to.meta.showBar
      }else{
        this.show = true
      }
    },
    immediate: true
   }
  
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
