<template>
    <div class="district">
        <app_content class="content">
            <div class="cinema_list">
                <ul class="nav">
                    <li :class="{active_li:activeli==0}" @click="showList(0)">商区</li>
                    <li :class="{active_li:activeli==1}" @click="showList(1)">地铁站</li>
                </ul>
                <div class="list_box" v-if="activeli==0">
                    <ul class="district_list">
                        <li v-for="(item,index) in params" 
                        :key="item.id" @click="setListInfo(index)"
                        :class="{active_list:activelist==index}">
                            {{item.name}}（{{item.count}}）
                        </li>
                    </ul>
                    <ul class="list_info">
                        <li v-for="(item,index) in listInfo" 
                        :key="item.id" @click="setInfo(index)"
                        :class="{active_info:activeinfo==index}">
                            <span>{{item.name}}</span>
                            <span></span>
                            <span>{{item.count}}</span>
                        </li>
                    </ul>
                </div>
                <div class="list_box" v-if="activeli==1">
                    <ul class="district_list">
                        <li v-for="(item,index) in params" 
                        :key="item.id" @click="setListInfo(index)"
                        :class="{active_list:activelist==index}">
                            {{item.name}}（{{item.count}}）
                        </li>
                    </ul>
                    <ul class="list_info">
                        <li v-for="(item,index) in listInfo" 
                        :key="item.id" @click="setInfo(index)"
                        :class="{active_info:activeinfo==index}">
                            <span>{{item.name}}</span>
                            <span></span>
                            <span>{{item.count}}</span>
                        </li>
                    </ul>
                </div>
            </div>
        </app_content>
        
    </div>
</template>

<script>
export default {
  props: {
    //item.id => districtId
    params_dis: Array,
    params_sub: Array,
    district: Object
  },
  data() {
    return {
      //item.id => areaId 区域
      listInfo: [],
      sub_list: [],
      // 区下标
      activelist: 0,
      activeli: 0,
      // 县下标
      activeinfo: 0,
      params: this.params_dis
    };
  },
  methods: {
    // 切换地铁和商区
    showList(index) {
      this.activeli = index;
      if (index === 0) {
        this.params = this.params_dis;
      } else if (index === 1) {
        this.params = this.params_sub;
      }
    },
    setDistrict(params) {
      this.$center.$emit("setDistrict", params);
    },
    // 更改区
    setListInfo(index) {
      this.listInfo = this.params[index].subItems;
      this.activelist = index;
    },
    // 更改县
    setInfo(index) {
      this.activeinfo = index;

      // 更改县中全部为区名
      let name = "";
      if (this.listInfo[index].id === -1) {
        name = this.params[this.activelist].name;
      } else {
        name = this.listInfo[index].name;
      }
      // 设置URL参数
      let params = {};
      if (this.activeli === 0) {
        params = Object.assign(
          {},
          {
            districtName: this.listInfo[index].name,
            districtId: this.params[this.activelist].id,
            areaId: this.listInfo[index].id,
            updateShowDay: false,
            limit: 10,
            stationId: -1
          }
        );
      } else if (this.activeli === 1) {
        params = Object.assign(
          {},
          {
            districtName: this.listInfo[index].name,
            districtId: -1,
            stationId: this.listInfo[index].id,
            updateShowDay: false,
            limit: 10,
            areaId: -1
          }
        );
      }

      //设置新的参数
      this.setDistrict(params);
      // 触发请求数据，并传入新的参数
      // console.log(this.district)
      this.$center.$emit("reload", this.district);
      // 更改名字
      this.$center.$emit("setName", name);
      //触发关闭选择页面
      this.$center.$emit("closeDisrict", {
        index: -1,
        name: this.district.districtName
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.content {
  padding-top: 84px;
  .cinema_list {
    background: #fff;
    margin: -15px;
    position: relative;
    li {
      line-height: 45px;
      font-size: 14px;
      padding-left: 15px;
      color: #666;
    }
    .nav {
      width: 100%;
      display: flex;
      li {
        flex: 1;
        text-align: center;
      }
    }
    .list_box {
      width: 100%;
      height: 400px;
      display: flex;
      li {
        overflow: hidden;
        width: 100%;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .district_list {
        width: 120px;
        height: 400px;
        overflow-y: auto;
      }
      .list_info {
        flex: 1;
        background: #f5f5f5;
        height: 400px;
        overflow-y: auto;
        li {
          display: flex;
          justify-content: space-around;
          span {
            flex: 1;
            font-size: 13px;
            color: #555;
            text-align: center;
          }
        }
      }
    }
  }
}
.active_li {
  color: red !important;
  border-bottom: 2px solid red !important;
}
.active_list {
  color: red !important;
  background: #f5f5f5 !important;
}
.active_info {
  span {
    color: red !important;
  }
}
</style>

