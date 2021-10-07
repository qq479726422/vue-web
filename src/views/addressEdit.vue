<!-- 地址编辑 -->
<template>
  <van-address-edit
  :area-list="areaList"
  show-postal
  show-delete
  show-set-default
  show-search-result
  :search-result="searchResult"
  :area-columns-placeholder="['请选择', '请选择', '请选择']"
  @save="onSave"
  @change-detail="onChangeDetail"
/>
</template>

<script>
export default {
  name: "addressEdit",
  components: {},
  data () {
    return {
      areaList:{},
      searchResult: [],
    };
  },
  created() {},
  mounted() {},
  computed: {},
  methods: {
     onSave() {
       console.log('save');
    },
   
    onChangeDetail(val) {
      if (val) {
        this.searchResult = [
          {
            name: '黄龙万科中心',
            address: '杭州市西湖区',
          },
        ];
      } else {
        this.searchResult = [];
      }
    },
  }
}
</script>

<style lang='scss' scoped>
</style>