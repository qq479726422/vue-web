/* eslint-disable no-unused-vars */
<template>
  <div class="car">
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
                <!-- 规格参数 -->
                <ul v-if="itm.spec.color" class="spec">
                  <template v-for="c in itm.spec.color">
                    <li :class="{'on-li':selsctVal.includes(c) && classStr.indexOf(c) != -1,
                    'no-li':selsctVal.length && classStr.indexOf(c) == -1,'odd':selsctVal.includes(c) && !exsitVal.length}" :key="c" @click="hanldSelect(itm,c)">{{c}}</li>
                  </template>
                </ul>
                <ul v-if="itm.spec.size" class="spec">
                  <template v-for="c in itm.spec.size">
                    <li :class="{'on-li':selsctVal.includes(c)&& classStr.indexOf(c) != -1,
                    'no-li':selsctVal.length && classStr.indexOf(c) == -1,'odd':selsctVal.includes(c) && !exsitVal.length}" :key="c" @click="hanldSelect(itm,c)">{{c}}</li>
                  </template>
                </ul>
                <ul v-if="itm.spec.shape" class="spec">
                  <template v-for="c in itm.spec.shape">
                    <li :class="{'on-li':selsctVal.includes(c)&& classStr.indexOf(c) != -1,
                    'no-li':selsctVal.length && classStr.indexOf(c) == -1,'odd':selsctVal.includes(c) && !exsitVal.length}" :key="c" @click="hanldSelect(itm,c)">{{c}}</li>
                  </template>
                </ul>
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
      selsctVal:[],
      exsitVal:[],
      classStr:'',
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
      let num = this.list[index].goods[i].num
      if(type=='add'){
        num++
      }else if(type=='subtract' && num>1){
        num--
      }
      this.lists[index].goods[i].num = num
    },
    // 全选
    allSelect(){
      const all = !this.allFlag
      const arr = this.list
      const len = arr.length
      let allPrice = 0
      for (let i = 0; i < len; i++) {
        const item = this.list[i]
        item.flag = all
        const itm = item.goods
        for (let j = 0; j < itm.length; j++) {
          itm[j].flag = all
          allPrice += itm[j].price
        }
      }
      this.list = arr
      this.allFlag = all
      this.aggregate = all?allPrice:0
    },
    // 同类商品选项
    typeSelect(index){
      const totalPrice = this.aggregate
      let allPrice = 0
      let oldPrice = 0
      
      const aLen = this.list.length
      const obj = this.list[index]
      const flag = !obj.flag
      obj.flag = flag
      const arr = obj.goods
      const narr = arr.filter(v=>v.flag==true)
      narr.forEach(ele => oldPrice+=ele.price);
      const nLen = narr.length
      for (let i = 0; i < arr.length; i++) {
        arr[i].flag = flag
        allPrice += arr[i].price
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
      const itemPrice = obj.goods[i].price
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
    //商品规格选项
    hanldSelect(ele,param){
      // console.log(ele.exsit);
      // console.log(param);
      let arr = []
      let allVal = this.selsctVal
      const oldExsit = this.exsitVal
      const oldLen = oldExsit.length
      const newExsit = ele.exsit
      let vId = allVal.indexOf(param)
      let oId = oldLen?oldExsit.findIndex(v=>v.includes(param)):-1

      if(allVal.length && !oldLen && vId==-1){
        return
      }
      else if(oldLen && oId==-1 && vId==-1){
        return
      }
      else if(allVal.length && !oldLen && vId!=-1){
         allVal.splice(vId,1)
      }
      else if(vId!=-1){
        allVal.splice(vId,1)
      }else if(vId==-1){
        allVal.push(param)
      }

      console.log('=======================');
     for (let k = 0; k < allVal.length; k++) {
        const arg = newExsit.filter(v=>v.includes(allVal[k]))
        arr = arg
      }

      let nVal = []
      allVal.forEach(ele => {
        if(arr.length){
          let str = arr.join()
          const t = str.includes(ele)
          if(t)nVal.push(ele)
        }else{
          nVal.push(ele)
        }
      });
      const str = arr.join()
      
      console.log('已选项',nVal);
      console.log('规格',arr);
      console.log('规格字段',str);
      
      this.exsitVal = arr
      this.classStr = str
      this.selsctVal = nVal
    },
    
    // 编辑/完成
    editCar(flag){
      this.edit = flag?true:false
      this.allFlag = false
      this.aggregate = 0 
      if(flag)return
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
      .spec{
        display: flex;
        align-items: center;
        margin-bottom: .25rem;
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
        .no-li.odd{
          color: #108ee9;
          border: 1px solid #108ee9;
          background: #fff;
        }
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