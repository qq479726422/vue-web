<!-- 订单页面 -->
<template>
  <div class="wrap">
     <div v-show="true">
       <!-- <van-count-down class="time" :time="time" format="00 时 mm 分 ss 秒" /> -->
       <div v-show="false" class="site">
         <span>请选择收货地址</span>
         <van-icon name="arrow" />
       </div>
       <div v-show="true" class="site-info">
          <div class="left">
            <span>张三</span>
            <span>13000000000</span>
            <p class="address">浙江省杭州市西湖区文三路 138 号东方通信大厦 7 楼 501 室</p>
          </div>
           <van-icon name="arrow" />
       </div>
       <van-card
        num="2"
        price="2.00"
        desc="描述信息"
        title="商品标题"
        thumb="https://img01.yzcdn.cn/vant/ipad.jpeg"
      />
     </div>
     <div v-show="false">多个商品</div>
     <van-submit-bar :price="3050" button-text="提交订单" @submit="onSubmit" />
  </div>
</template>

<script>
export default {
  name: "orderDetail",
  components: {},
  data () {
    return {
      time:60 * 60 * 1000,
    };
  },
  created() {},
  mounted() {},
  computed: {},
  methods: {
    onSubmit(){
      this.$toast.success('提交成功');
      setTimeout(() => {
        this.$router.replace('/success')
      }, 800);
    }
  }
}
</script>

<style lang='scss' scoped>
.wrap{
  padding: .3rem;
  .van-card__price{color: #ee0a24;}
  .time{
    font-size: .32rem;
    color: #bb254f;
    margin-bottom: .4rem;
  }
  .site{
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: .2rem;
    font-size: .32rem;
    background: #f1f1f1;
    color: #999;
  }
  .site-info{
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: .32rem;
    color: #333;
    .left{
      margin-right: .15rem;
      span{
        &:first-child{margin-right: .2rem;}
      }
    }
    .address{
      padding-top: .2rem;
      font-size: .26rem;
      line-height: .32rem;
    }
  }
}
</style>