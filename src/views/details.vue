<!-- 详情 -->
<template>
  <div v-if="details" class="wrap">
    <img class="img" :src="details.thumb" alt="">
    <div class="card">
      <p>{{details.name}}</p>
      <span>¥{{details.price}}.00</span>
   </div>
    <div class="describe">
      <div class="title"><i></i><span>详细描述</span><i></i></div>
      <div class="content">{{details.details}}</div>
    </div>

    <van-goods-action>
      <van-goods-action-icon icon="shop-o" text="首页" color="#ee0a24" @click="nextTo('home')"/>
      <van-goods-action-icon icon="cart-o" text="购物车" color="#ee0a24" @click="nextTo('car')"/>
      <van-goods-action-icon icon="service-o" text="客服" color="#ee0a24" @click="kefu"/>
      <van-goods-action-button type="warning" text="加入购物车" @click="buyGoods('a')"/>
      <van-goods-action-button type="danger" text="立即购买" @click="buyGoods('b')"/>
    </van-goods-action>

    <!-- 购买弹窗 -->
    <van-popup v-model="showPopup" round position="bottom" closeable>
       <div class="popup-con">
        <div class="head">
          <img width="80" height="80" :src="details.thumb" alt="">
          <div>
            <p>{{details.name}}</p>
            <p class="p2">¥{{details.price}}.00</p>
          </div>
        </div>
         <!-- 规格参数 -->
        <div class="spec-title">颜色：</div>
        <ul v-if="details.spec.color" class="spec">
          <template v-for="item in details.spec.color">
            <li :data-attr="setAttr(item)" :class="setClass(item)" :key="item" @click="hanldSelect($event,item)">{{item}}</li>
          </template>
         
        </ul>
        <div class="spec-title">尺寸：</div>
        <ul v-if="details.spec.size" class="spec">
          <template v-for="item in details.spec.size">
           <li :data-attr="setAttr(item)" :class="setClass(item)" :key="item" @click="hanldSelect($event,item)">{{item}}</li>
           </template>
        </ul>
        <div class="spec-title">形状：</div>
        <ul v-if="details.spec.shape" class="spec">
          <template v-for="item in details.spec.shape">
            <li :data-attr="setAttr(item)" :class="setClass(item)" :key="item" @click="hanldSelect($event,item)">{{item}}</li>
           </template>
        </ul>
        <div class="goods-num">
          <p>购买数量</p>
          <van-stepper v-model="num" theme="round" button-size="22" disable-input @change="onChangeNum"/>
        </div>
        <van-button round block color="linear-gradient(to right, #ff6034, #ee0a24)" @click="confirm">确定</van-button>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { getDetail } from "../plugins/api";
export default {
  name: "detail",
  components: { },
  data () {
    return {
      details:"",
      id:'',
      selsctVal:[],
      exsitVal:[],
      classStr:'',
      showPopup:false,
      num:1,
      buyType:''
    };
  },
  beforeCreate(){
   
  },
  created() {
    const id = this.$route.params.id
    this.getData(id)
  },
  mounted() {},
  computed: {
    setAttr() {
      return function(params) {
        const a1 = !this.selsctVal.length?!this.classStr?true:false:false
        const a2 = this.selsctVal.length?this.classStr.includes(params)?true:false:false
        const a3 = this.selsctVal.includes(params)?!this.classStr.includes(params)?true:false:false
        const str = a1?'y':a2?'y':a3?'y':'n'
        return str
      }
    },
    setClass(){
      return function(params) {
        const {on,no} = {on:'on-li',no:'no-li'}
        const c1 = this.selsctVal.includes(params)?true:false
        const c2 = this.selsctVal.length?!this.classStr.includes(params)?true:false:false
        const str = c1?on:c2?no:''
        return str
      }
    }
  },
  methods: {
    getData(id){
      getDetail({id:id}).then(res=>{
        console.log(res);
        if(res.code==200){
          this.details = res.data
        }
      }).catch(err=>console.log(err))
    },
    // 导航
    nextTo(param){
      const path  = {
        home:'/home',
        car:'/car',
      }
      this.$router.push(path[param])
    },
    // 客服
    kefu(){
      const isLogin = window.localStorage.getItem('isLogin') || false
      if(!isLogin){
         this.$router.replace('/login')
         return
      }
      this.$toast('客服忙线中...');
    },
    //购买、加入购物车按钮
    buyGoods(param){
      this.buyType = param
      const isLogin = window.localStorage.getItem('isLogin') || false
      if(!isLogin){
        this.$router.replace('/login')
        return
      }
      this.showPopup = true
    },
    confirm(){
      const type = this.buyType
      const plan = {
        a:()=>{
          this.$toast.success('已加入购物车');
        },
        b:()=>{
          this.$router.push('/orderDetail')
        }
      }
      plan[type]()
      this.showPopup = false
    },
    // 数量加减
    onChangeNum(value) {
     console.log(value);
    },
      //商品规格选项
    hanldSelect(e,param){
      const s = e.target.dataset.attr
      if(s=='n')return
      // console.log(param);
      let allVal = this.selsctVal
      const aLen = allVal.length
      const oldExsit = this.exsitVal
      const newExsit = this.details.existing
      let filterArr = []
      let vId = allVal.indexOf(param)
      filterArr = aLen?oldExsit:newExsit
     
      if(vId==-1){
       allVal.push(param)
      }else{
        allVal.splice(vId,1)
        filterArr = newExsit
      }
      let arr = []
      for (let i = 0,len = allVal.length; i < len; i++) {
        const ele = allVal[i];
        arr = filterArr.filter(v=>v.includes(ele))
      }
      console.log('=======================');
     
      const str = arr.join()
      let nVal = allVal
      if(str){
        nVal = allVal.filter(v=>str.includes(v))
      }
      
      console.log('已选项',nVal);
      console.log('规格',arr);
      console.log('规格字段',str);
      
      this.exsitVal = arr
      this.classStr = str
      this.selsctVal = nVal
    },
  }
}
</script>

<style lang='scss' scoped>
.wrap{
  .img{
    display: block;
    width: 100%;
    min-height: 5rem;
  }
  .card{
    padding: .3rem;
    p{
      font-size: .42rem;
      font-weight: bold;
      line-height: .48rem;
      margin-bottom: .25rem;
    }
    span{
      display: block;
      font-size: .36rem;
      color: #bb254f;
      font-weight: bold;
    }
  }
  .describe{
    .title{
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: .28rem;
      color: #999;
      margin-bottom: .3rem;
      span{margin: 0 .15rem;}
      i{
        height: .01rem;
        background: #999;
        flex: 1;
      }
    }
    .content{
      padding: .3rem;
      color: #999;
      font-size: .3rem;
    }
  }
  .fixed-box{
    position: fixed;
    bottom: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: .88rem;
    line-height: .88rem;
    border-top: 1px solid #ccc;
    background: #fff;
    padding: .1rem 0;
    .link{
      display: flex;
      align-items: center;
      justify-content: space-around;
      font-size: .28rem;
      flex: 1;
      span{}
    }
    .btns{
      font-size: .32rem;
      display: flex;
      align-items: center;
      border-radius: .4rem;
      border-radius: .5rem;
      overflow: hidden;
      margin-right: .1rem;
      a{
        color: #fff;
        padding: 0 .2rem;
        &:first-child{
          background: #f03d07;
        }
        &:last-child{
          background: #bb254f;
        }
      }
    }
  }
  .popup-con{
    padding-top: .6rem;
    .head{
      display: flex;
      justify-content: space-between;
      padding: .2rem;
      img{margin-right: .25rem;}
      p{
        font-size: .32rem;
        padding: .1rem;
        line-height: .38rem;
      }
      .p2{
        font-size: .36rem;
        color: #bb254f;
        font-weight: bold;
      }
    }
    .spec-title{
      font-size: .32rem;
      padding: .2rem .3rem;
    }
    .spec{
      display: flex;
      align-items: center;
      margin-bottom: .25rem;
      font-size: .32rem;
      padding: 0 .3rem;
      li{
        padding: .1rem .2rem;
        border: 1px solid #999;
        border-radius: .1rem;
        margin-right: .2rem;
      }
      .no-li{
        color: #ccc;
        background: #eee;
        border: 1px solid #ddd;
      }
      .on-li{
        color: #108ee9;
        border: 1px solid #108ee9;
        background: #fff;
      }
    }
    .goods-num{
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: .32rem;
      padding: .3rem;
      margin-bottom: .2rem;
      .num{
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px solid #ddd;
        i{
          font-size: .4rem;
          height: 100%;
          width: .3rem;
          text-align: center;
          &:first-child{border-right: 1px solid #ddd;}
          &:last-child{border-left: 1px solid #ddd;}
        }
        span{padding: 0 .2rem;color: #bb254f;}
      }
    }
    .btn{
      width: 80%;
      line-height: .8rem;
      text-align: center;
      margin: 0 auto;
      color: #fff;
      font-size: .32rem;
      background: #bb254f;
      border-radius: .4rem;
    }
  }
}
</style>