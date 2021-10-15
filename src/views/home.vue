<!-- home -->
<template>
  <div v-if="list.length" class="home">
    <template v-for="(item,index) in list">
      <div :key="index" class="goods-item">
        <p class="title"><i class="line"></i>{{item.vendorName}}<i class="line"></i></p>
        <ul class="item">
          <template v-for="(i,n) in item.goods">
            <li :key="n" @click="toDetails(i.goodsId)">
              <img width="150" height="150" :src="i.thumb" alt="">
              <div class="name">{{i.name}}</div>
              <div class="price">¥{{i.price}}.00</div>
            </li>
          </template>
        </ul>
      </div>
    </template>
  </div>
  <div v-else-if="loading && !list.length" class="loading"><van-loading type="spinner"  color="#1989fa" size="26"/></div>
  <div v-else class="not-goods">暂无商品~</div>

</template>

<script>
import { getList } from "../plugins/api";
export default {
  name: "home",
  components: {},
  data () {
    return {
      list:[],
      loading:true,
    };
  },
  created() {
    this.getData()
  },
  mounted() {},
  computed: {},
  methods: {
    getData(){
      getList().then(res=>{
        console.log(res);
        this.loading = false
        if(res.code==200){
          // this.list = res.data.list
        }
      }).catch(err=>{
        this.loading = false
        console.log(err)
      })
    },
    toDetails(id){
      // const json = JSON.stringify(item)
      // window.sessionStorage.setItem('goods',json)
      this.$router.push(`/details/${id}`)
      }
  }
}

</script>

<style lang='scss' scoped>
.home{
  padding: .3rem;
  .goods-item{
    font-size: .32rem;
    margin-bottom: .5rem;
    .title{
      font-size: .42rem;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      padding: .3rem 0;
      color: #bb254f;
      .line{
        height: .05rem;
        width: .5rem;
        margin: 0 .2rem;
        background: #bb254f;
        border-radius: .1rem;
      }
    }
    .item{
      display: flex;
      align-items: center;
      li{
        flex: 1;
        padding: .2rem;
        max-width: 3.4rem;
        img{
          margin-bottom: .25rem;
        }
        .name{
          overflow:hidden; 
          text-overflow:ellipsis;
          display:-webkit-box; 
          -webkit-box-orient:vertical;
          -webkit-line-clamp:2;
          line-height: .4rem;
          margin-bottom: .25rem;
        }
        .price{
          color: rgb(238, 26, 44);
          font-weight: bold;
        }
      }
    }
  }
}
.not-goods{
  font-size: .32rem;
  text-align: center;
  padding-top: 5rem;
}
.loading{
  position: fixed;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>