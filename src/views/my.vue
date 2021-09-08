<!-- 我的页面 -->
<template>
  <div class="wrap">
    <div v-if="showBox" class="head">
      <img src="../assets/logo.png" alt="">
      <p>{{userInfo.name}}</p>
    </div>
    <div v-if="!showBox" class="not-info">暂无个人信息，请登录</div>
    <div v-if="showBox" class="btn" @click="logout">退出登录</div>
    <div v-if="!showBox" class="btn" @click="login">登录</div>

  </div>
</template>

<script>
export default {
  name: "my",
  components: {},
  data () {
    return {
      showBox:null,
      userInfo:{},
    };
  },
  created() {
    const flag = window.sessionStorage.getItem('isLogin') || false
    const user = JSON.parse(window.sessionStorage.getItem('user'))
    this.showBox = flag
    this.userInfo = user
  },
  mounted() {},
  computed: {},
  methods: {
    logout(){
      window.sessionStorage.removeItem('isLogin')
      this.showBox = false
    },
    login(){this.$router.push('/login')},
  }
}
</script>

<style lang='scss' scoped>
.wrap{
  padding: .4rem;
  .head{
    display: flex;
    align-items: center;
    img{
      width: .8rem;
      height: .8rem;
      margin-right: .5rem;
    }
    p{
      font-size: .3rem;
    }
  }
  .not-info{font-size: .3rem;text-align: center;}
  .btn{
    position: fixed;
    bottom: 10%;
    left: 50%;
    transform: translateX(-50%);
    font-size: 0.3rem;
    line-height: .88rem;
    width: 50%;
    text-align: center;
    border-radius: .5rem;
    color: #fff;
    background: rgb(1, 110, 253);
  }
}

</style>