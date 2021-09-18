<!-- 登录 -->
<template>
  <div class="login">
    <img src="../assets/logo.png" alt="">
    <form class="form" action="">
      <label for="name">用户：<input type="text" v-model="name" placeholder="用户名称"></label>
      <label for="password">密码：<input type="password" v-model="password" placeholder="用户密码"></label>
      <div class="btns">
        <a href="javascript:;" @click="login">登录</a>
        <a href="javascript:;" @click="register">注册</a>
      </div>
    </form>

    <Popup ref="model" :con="content" />
  </div>
</template>

<script>
import Popup from "../components/popup.vue";

export default {
  name: "login",
  components: {Popup},
  data () {
    return {
      name:'',
      password:'',
      content:'',
    };
  },
 
  created() {},
  mounted() {},
  computed: {},
  methods: {
    showTips(str){
      this.content = str
      this.$refs.model.show()
    },
    login(){
      const userInfo = JSON.parse(window.localStorage.getItem('userInfo')) || []
      const name = this.name
      const password = this.password
      const filterUser = userInfo.filter(v=>v.account==name)
      const user = filterUser[0]
      const isName = user.account==name?true:false
      const isPassword = user.password==password?true:false
      // console.log('userInfo',userInfo);
      if(!name){
        this.showTips('用户账户不能为空')
        return
      }
      if(!isName){
        this.showTips('用户账户不存在')
        return
      }
      if(!password){
        this.showTips('用户密码不能为空')
        return
      }
      if(!isPassword){
        this.showTips('用户密码错误')
        return
      }
      const oPath = window.localStorage.getItem('oldUrl')
      window.localStorage.setItem('isLogin',true)
      window.localStorage.setItem('user',JSON.stringify(user))
      this.$router.push(oPath)
    },
    register(){this.$router.push('/register')},
  }
}
</script>

<style lang='scss' scoped>
.login{text-align: center;}
.form{
  label{
    display: flex;
    align-items: center;
    font-size: .28rem;
    padding: .2rem .4rem;
    input{
      flex: 1;
      height: .64rem;
      border: 1px solid #ccc;
      padding: 0 .15rem;
    }
  }
  .btns{
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: .3rem;
    padding: .5rem;
    a:first-child{margin-right: .5rem;}
  }
}
</style>