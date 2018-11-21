<template>
<div class="district">
    <app_content class="content">
         <div class="list_box">
                    <ul class="district_list">
                        <li v-for="(item,index) in params" 
                        :key="item.id" @click="setInfo(index)"
                        :class="{active_info:activelist==index}">
                            <span>{{item.name}}</span>
                            <span>{{item.count}}</span>
                        </li>
                    </ul>
                </div>
    </app_content>
</div>
</template>

<script>
export default {
  props: {
    params: Array,
    district:Object
  },
  data() {
    return {
      activelist: 0
    };
  },
    methods: {
    setDistrict(params) {
      this.$center.$emit("setDistrict", params);
    },
    // 更改品牌
    setInfo(index) {
      this.activelist = index;
      // 设置URL参数
      let params = {};
        params = Object.assign({},
          {
            brandName: this.params[index].name,
            limit: 10,
            brandId:this.params[index].id
          }
        );
        console.log(params)
      //设置新的参数
      this.setDistrict(params);
      // 触发请求数据，并传入新的参数
      // console.log(this.district)
      this.$center.$emit("reload", this.district);
      // 更改名字
    //   this.$center.$emit("setName", name);
      //触发关闭选择页面
      this.$center.$emit("closeDisrict", {
        index: -1,
        name: this.district.brandName
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.content {
    padding-top: 84px;
  .list_box {
    margin:-15px;
    height: 400px;
    display: flex;
    background: #fff;
    overflow-y: auto;
    .district_list{
        width:100%;
        padding:5px 20px;
        li {
            display:flex;
            padding:0 10px;
            justify-content: space-between;
            line-height:50px; 
            border-bottom:1px solid #ddd;
        }
    }
    .active_info {
            span {
                color: red !important;
            }
    }
  }
}
</style>

