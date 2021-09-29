<!-- home -->
<template>
  <div class="home">
    <template v-for="(item,index) in list">
      <div :key="index" class="goods-item">
        <p class="title"><i class="line"></i>{{item.vendorName}}<i class="line"></i></p>
        <ul class="item">
          <template v-for="(i,n) in item.goods">
            <li :key="n" @click="toDetails(item.vendorId,i)">
              <img width="150" height="150" :src="i.thumb" alt="">
              <div class="name">{{i.name}}</div>
              <div class="price">¥{{i.price}}.00</div>
            </li>
          </template>
        </ul>
      </div>
    </template>
  </div>
</template>

<script>
import { listState } from '../assets/data'
export default {
  name: "home",
  components: {},
  data () {
    return {
      list:listState,
    };
  },
  created() {
    console.log(this.list);
  },
  mounted() {},
  computed: {},
  methods: {
    toDetails(id,item){
      const json = JSON.stringify(item)
      window.sessionStorage.setItem('goods',json)
      this.$router.push({path:'/details', query:{ vid:id }} )
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
</style>