<!-- 注册页面 -->
<template>
  <div>
    <form action="" class="form">
      <p>用户注册</p>
        <label for="name">
          <span><b>*</b>用户名称：</span>
          <input v-model="name" id="name" type="text" placeholder="请输入用户名称">
        </label>
        <label for="account">
          <span><b>*</b>用户账号：</span>
          <input v-model="account" id="account" type="text" placeholder="请输入用户账号">
        </label>
        <label for="password">
          <span><b>*</b>用户密码：</span>
          <input v-model="password" id="password" type="password" placeholder="请输入用户密码">
        </label>
        <label for="password2">
          <span><b>*</b>确认密码：</span>
          <input v-model="password2" id="password2" type="password" placeholder="请输入确认密码">
        </label>

        <div class="btn" @click="submit">提交</div>
    </form>
    <!-- <div v-show="err" class="error">{{errContent}}</div> -->
    <Popup ref="model" :con="content" />
  </div>
</template>

<script>
import Popup from "../components/popup.vue";
export default {
  name: "register",
  components: {Popup,},
  data () {
    return {
      name:'',
      account:'',
      password:'',
      password2:'',
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
    submit(){
      const list = JSON.parse(window.localStorage.getItem('userInfo')) || []
      const name = this.name
      const account = this.account
      const password = this.password
      const password2 = this.password2
      const isAccount = list.includes(account)
      
      if(!name){
        this.showTips('请填写用户名称')
        return
      }
      if(isAccount){
        this.showTips('用户账号已存在')
        return
      }
      if(!account){
        this.showTips('请填写用户账号')
        return
      }
      if(!password){
        this.showTips('请填写用户密码')
        return
      }
      if(!password2){
        this.showTips('请填写确认密码')
        return
      }
      if(password != password2){
        this.showTips('确认密码要与密码相同')
        return
      }

      const obj = {
        name:name,
        account:account,
        password:password
      }
      list.push(obj)
      const jsonStr = JSON.stringify(list)
      window.localStorage.setItem('userInfo',jsonStr)
      this.showTips('提交成功')

      setTimeout(() => {
        this.$router.push('/login')
      }, 1000);
    },
  }
}
</script>

<style lang='scss' scoped>
.form{
  padding: .5rem;
  p{
    color: #333;
    font-size: .5rem;
    margin-bottom: .5rem;
  }
  label{
    display: flex;
    align-items: center;
    font-size: .28rem;
    padding: .2rem .4rem;
    b{color: red;}
    input{
      flex: 1;
      height: .64rem;
      border: 1px solid #ccc;
      padding: 0 .15rem;
    }
  }
  .btn{
    position: fixed;
    bottom: 10%;
    left: 50%;
    transform: translateX(-50%);
    font-size: 0.3rem;
    line-height: .88rem;
    width: 2.68rem;
    text-align: center;
    border-radius: .5rem;
    color: #fff;
    background: rgb(1, 110, 253);
  }
}
.error{
  position: fixed;
  top: 0;
  left: 0;
  text-align: center;
  width: 100%;
  line-height: .8rem;
  background: rgba(0,0,0,.5);
  color: #fff;
  font-size: .3rem;
}
</style>