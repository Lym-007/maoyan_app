<template>
<div class="district">
    <app_content class="content">
         <div class="list_box">
                    <div class="district_list">
                        <h3>特色功能</h3>
                        <ul>
                            <li v-for="(item,index) in service" 
                            :key="item.id" @click="setInfoser(index)"
                            :class="{active_list:activeser==index}">
                                {{item.name}}
                            </li>
                        </ul>
                        <h3>特殊厅</h3>
                        <ul>
                            <li v-for="(item,index) in hallType" 
                            :key="item.id" @click="setInfohall(index)"
                            :class="{active_list:activehall==index}">
                               {{item.name}}
                            </li>
                        </ul>
                    </div>
                    <div class="option">
                        <div class="reset" @click="resetInfo">重置</div>
                        <div class="confirm" @click="reqInfo">确定</div>
                    </div>
         </div>
    </app_content>
</div>
</template>

<script>
export default {
  props: {
    district: Object,
    hallType: Array,
    service: Array
  },
  data() {
    return {
      activehall: 0,
      activeser: 0
    };
  },
  methods: {
    //   选中hallType
    setInfohall(index) {
      this.activehall=index;
    },
    // 选中service
    setInfoser(index) {
      this.activeser=index;
    },
    // 重置选项
    resetInfo(){
        this.activehall=0;
        this.activeser=0;
    },
    // 请求相应数据
    reqInfo(){
        let params={};
        params=Object.assign({},{
            limit:10,
            hallType:this.hallType[this.activehall].id,
            serviceId:this.service[this.activeser].id
        });
        this.$center.$emit("reload", this.district);
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
    margin: -15px;
    height: 400px;
    background: #fff;
    .district_list {
      width: 100%;
      height:340px;
      overflow-y: auto;
      padding: 5px 20px;
      color: #777;
      h3 {
        line-height: 40px;
        font-weight: normal;
        font-size: 16px;
      }
      ul {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        li {
          padding: 10px 15px;
          font-size: 10px;
          border: 1px solid #ddd;
          margin: 5px;
          border-radius: 5px;
        }
      }
    }
    .active_list {
      color: red !important;
      background: #f5f5f5 !important;
    }

    .option{
        display: position;
        bottom:0;
        height:60px;
        padding:0 20px;
        background:#f5f5f5;
        display: flex;
        align-items: center;
        justify-content: space-between;
        div{
            display:inline;
            padding:10px 30px;
            border:1px solid #ddd;
            border-radius: 10px;
        }
        .reset{
            background: #fff;
            color:#777;
        }
        .confirm{
            background: red;
            color:#fff;
        }
    }
  }
}
</style>

