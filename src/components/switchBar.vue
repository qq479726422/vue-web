<!-- 底部切换栏 -->
<template>
  <van-tabbar v-show="showBar" v-model="active" route>
    <van-tabbar-item replace to="/home" icon="shop-o">首页</van-tabbar-item>
    <van-tabbar-item replace to="/car" icon="cart-o">购物车</van-tabbar-item>
    <van-tabbar-item replace to="/my" icon="user-o">个人</van-tabbar-item>
  </van-tabbar>
</template>

<script>
export default {
  name: "switchBar",
  props:{
    showBar: {
      type: Boolean,
      default: true
    },
  },
  components: {},
  data () {
    return {
      active:'home'
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