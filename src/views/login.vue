<!-- 登录 -->
<template>
  <div class="login">
    <img src="../assets/logo.png" alt="">
    <form class="form" action="">
      <label for="name">用户：<input type="text" v-model="name" placeholder="用户名称"></label>
      <label for="password">密码：<input type="password" v-model="password" placeholder="用户密码"></label>
      <div class="btns">
        <a href="javascript:;" @click="login">登录</a>
        <!-- <a href="javascript:;" @click="register">注册</a> -->
      </div>
    </form>
  </div>
</template>

<script>
import { postLogin } from "../plugins/api";

export default {
  name: "login",
  components: {},
  data () {
    return {
      name:'admin',
      password:123,
      content:'',
    };
  },
 
  created() {},
  mounted() {},
  computed: {},
  methods: {
    //登录
    login(){
      const params = {
        name:this.name,
        password:this.password,
      }
      const name = this.name
      const password = this.password
      if(!name){
        this.$toast({
          message: '用户账户不能为空',
          position: 'top',
        });
        return
      }
      if(!password){
        this.$toast({
          message: '用户密码不能为空',
          position: 'top',
        });
        return
      }
     
      postLogin(params).then(res=>{
        if(res.code==200){
          this.$toast.success(res.data);
          window.localStorage.setItem('isLogin',true)
          // const oPath = window.localStorage.getItem('oldUrl')
          // this.$router.replace(oPath)
          this.$router.go(-1)
        }else{
           this.$toast(res.data);
        }
      }).catch(err=>{
        console.log(err);
      })
     
    },
    //注册
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