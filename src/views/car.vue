/* eslint-disable no-unused-vars */
<template>
  <div v-if="list.length" class="car">
    <div class="head">
      <span @click="editCar(false)" v-show="edit">编辑</span>
      <span @click="editCar(true)" v-show="!edit">完成</span>
    </div>
    <template v-for="(item,index) in list">
      <div class="goods-item" :key="index">
        <label class="shop-title" :for="item.vendorId"><input @click="typeSelect(index)" :id="item.vendorId" type="checkbox" :checked="item.flag">{{item.vendorName}}</label>
        <ul class="ul">
          <template v-for="(itm,i) in item.goods">
            <li :key="i">
              <div class="li-l">
                <input @click="singleSelect(index,i)" type="checkbox" :checked="itm.flag">
                <img width="120" height="120" :src="itm.thumb" alt="">
              </div>
              <div class="li-r">
                <p class="mgb-25">{{itm.name}}</p>
                <p class="p2 color-999 mgb-25">{{itm.details}}</p>
                <div class="price">
                  <span class="color-red">¥{{itm.price}}</span>
                  <div><i @click="count('subtract',index,i)">-</i>{{itm.num}}<i class="color-red" @click="count('add',index,i)">+</i></div>
                </div>
              </div>
            </li>
          </template>
        </ul>
      </div>
    </template>
    <div class="fixed-foot">
      <label class="foot-l" for="all"><input  @click="allSelect" id="all" type="checkbox" :checked="allFlag">全选</label>
      <div class="foot-r">
        <p v-show="edit">总计 <span class="color-red">¥{{aggregate}}.00</span></p>
        <div v-show="edit" class="btn" @click="pay">结算</div>
        <div v-show="!edit" class="btn" @click="deleteGoods">删除</div>
      </div>
    </div>
  </div>
  <div v-else class="not-info">购物车空空如也~</div>
</template>

<script>
import { listState } from '../assets/data'
export default {
  name: 'car',
 data () {
    return {
      list:[],
      allFlag:false,
      aggregate:0,
      edit:true,
    }
  },
  computed:{
    lists:function (){
      const arr = listState
      for (let i = 0; i < arr.length; i++) {
        let item = arr[i]
        item.flag = false
        for (let j = 0; j < item.goods.length; j++) {
          const itm = item.goods[j]
          itm.flag = false
        }
      }
      return arr
    }
  },
  created(){
    this.list = this.lists
    // console.log('====================================');
    // console.log(this.list);
    // console.log('====================================');
  },
  methods:{
    // 商品数量加减
    count(type,index,i){
      const totalPrice = this.aggregate
      const itemPrice = this.list[index].goods[i].price
      const flag = this.list[index].goods[i].flag
      let num = this.list[index].goods[i].num
      let newPrice = 0
      if(type=='add'){
        num++
        newPrice = totalPrice+itemPrice
      }else if(type=='subtract' && num>1){
        num--
        newPrice = totalPrice-itemPrice
      }
      if(flag)this.aggregate = newPrice

      this.lists[index].goods[i].num = num
    },
    // 全选
    allSelect(){
      const flag = !this.allFlag
      const arr = this.list
      const len = arr.length
      let allPrice = 0
      for (let i = 0; i < len; i++) {
        const item = this.list[i]
        item.flag = flag
        const itm = item.goods
        for (let j = 0; j < itm.length; j++) {
          itm[j].flag = flag
          allPrice += itm[j].price*itm[j].num
        }
      }
      this.list = arr
      this.allFlag = flag
      this.aggregate = flag?allPrice:0
    },
    // 同类商品选项
    typeSelect(index){
      const totalPrice = this.aggregate //当前总价格
      let allPrice = 0
      let oldPrice = 0
      const aLen = this.list.length
      const obj = this.list[index]
      const flag = !obj.flag
      obj.flag = flag
      const nLen = this.list.filter(v=>v.flag).length
      const arr = obj.goods
      const narr = arr.filter(v=>v.flag)

      narr.forEach(ele => oldPrice+=(ele.price*ele.num));//计算所有已选择的商品价格
      for (let i = 0; i < arr.length; i++) {
        arr[i].flag = flag
        allPrice += arr[i].price*arr[i].num//计算同类型商品的总价格
      }
      
      if(aLen==nLen){
        this.allFlag = true
      }else{
        this.allFlag = false
      }
      const price = flag?totalPrice+(allPrice-oldPrice):totalPrice-allPrice
      this.aggregate = price
    },
    // 单项商品选项
    singleSelect(index,i){
      const totalPrice = this.aggregate
      const aLen = this.list.length
      const obj = this.list[index]
      const itemPrice = obj.goods[i].price*obj.goods[i].num
      const flag = !obj.goods[i].flag
      obj.goods[i].flag = flag
      const arr = obj.goods
      const len = arr.length
      let nLen = arr.filter(v=>v.flag==true).length
      if(nLen==len){
        obj.flag = true
      }else{
        obj.flag = false
      }
      const pLen = this.list.filter(v=>v.flag==true).length
      if(aLen==pLen){
        this.allFlag = true
      }else{
        this.allFlag = false
      }
      const price = flag?totalPrice+itemPrice:totalPrice-itemPrice
      this.aggregate = price
    },
   
    // 编辑/完成
    editCar(flag){
      this.edit = flag?true:false
      this.allFlag = false
      this.aggregate = 0 
      const arr =this.list 
      for (let i = 0; i < arr.length; i++) {
        arr[i].flag = false
        const carr = arr[i].goods
        for (let j = 0; j < carr.length; j++) {
         carr[j].flag = false
        }
      }
    },
    // 删除商品
    deleteGoods(){
      const arr = this.list
      let allLen = arr.length
      for (let i = 1; i <= allLen; i++) {
        const index = allLen-i
        if(arr[index].flag){
          arr.splice(index,1)
        }else{
          const goods = arr[index].goods
          const cLen = goods.length
          for (let j = 1; j <= cLen; j++) {
            const n = cLen-j
            if(goods[n].flag){
              goods.splice(n,1)
            }
          }
        }
      }
    },
    // 结算
    pay(){
      const arr = this.list
      let goodsArr = []
      for (let i = 0; i < arr.length; i++) {
        const goods = arr[i].goods
        for (let j = 0; j < goods.length; j++) {
          let obj = {}
          if(goods[j].flag){
            obj.name = goods[j].name
            obj.num = goods[j].num
            goodsArr.push(obj)
          }
        }
      }
      console.log('ply:',goodsArr);
    },
  }
}
</script>

<style lang="scss" scoped>
.car{padding:.3rem;}
.color-999{color: #999;}
.color-red{color: rgb(238, 26, 44);}
.mgb-25{margin-bottom: .25rem;}
.head{
  text-align: right;
  font-size: .32rem;
  margin-bottom: .8rem;
}
.goods-item{
  padding: .3rem;
  border-radius: .2rem;
  border: 1px solid #eee;
  margin-bottom: .2rem;
  label{font-size: .3rem;}
}
.shop-title{
  display: flex;
  align-items: center;
  margin-bottom: .5rem;
  input{margin-right: .3rem;}
}
.ul{
  &>li{
    display: flex;
    font-size: .28rem;
    align-items: flex-start;
    padding: .15rem 0;
    .li-l{
      display: flex;
      align-items: center;
      margin-right: .35rem;
      input{margin-right: .3rem;}
    }
    .li-r{
      flex: 1;
      .p2{
        background: #eee;
        padding: .1rem;
        border-radius: .1rem;
      }
      .price{
        display: flex;
        align-items: center;
        justify-content: space-between;
        div{
          display: flex;
          align-items:
          center;
          i{font-size: .5rem;padding: 0 .2rem;}
        }
      }
    }
  }
}
.not-info{font-size: .35rem;text-align: center;padding-top: 2rem;}
.fixed-foot{
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: .32rem;
  .foot-l{
    input{margin-right: .3rem;} 
  }
  .foot-r{
    display: flex;
    align-items: center;
    .btn{
      color: #fff;
      background: rgb(204, 14, 14);
      padding: .2rem .5rem;
      border-radius: .5rem;
      margin-left: .5rem;
    }
  }
}
</style>