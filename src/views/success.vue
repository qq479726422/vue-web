<!-- 支付成功页 -->
<template>
  <div class="wrap">
    <van-icon name="checked" size="3em" color="#07c160"/>
    <p class="txt">支付成功！即将为您跳转到订单详情~</p>
  </div>
</template>

<script>
export default {
  name: "success",
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
.wrap{
  text-align: center;
  padding-top: 1rem;
  .txt{
    padding-top: .4rem;
    font-size: .32rem;
  }
}
</style>