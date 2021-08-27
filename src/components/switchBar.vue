<!-- 底部切换栏 -->
<template>
  <div class="bar">
    <router-link to="/">首页</router-link>
    <router-link to="/car">购物车</router-link>
  </div>
</template>

<script>
export default {
  name: "switchBar",
  components: {},
  data () {
    return {
    };
  },
  created() {},
  mounted() {},
  computed: {},
  methods: {}
}
</script>

<style lang='scss' scoped>
.bar{
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-around;
  font-size: .3rem;
  border-top: .01rem solid #ddd;
  background: #fff;
}
</style>