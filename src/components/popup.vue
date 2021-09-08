<!-- 弹窗提示 -->
<template>
  <div v-show="flag" class="popup" :class="{'fixe-top':fixed=='top','fixe-center':fixed=='center'}">{{con}}</div>
</template>

<script>
export default {
  props:{
    con: {
      type: String,
      default: ''
    },
   fixed:{
     type: String,
      default: 'top'
   }
  },
  name: "popup",
  components: {},
  data () {
    return {
      flag:false,
    };
  },
  created() {},
  mounted() {},
  updated(){
     
  },
  computed: {},
  methods: {
   show(){
     this.flag = true
     setTimeout(() => {
       this.flag = false
     }, 1000);
   },
  }
}
</script>

<style lang='scss' scoped>
.popup{
  position: fixed;
  text-align: center;
  width: 100%;
  line-height: .8rem;
  background: rgba(0,0,0,.5);
  color: #fff;
  font-size: .3rem;
}
.fixe-top{
  top: 0;
  left: 0;
}
.fixe-center{
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  width: 40%;
}
</style>