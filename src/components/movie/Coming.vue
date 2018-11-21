<template>
    <app_content :canLoadMore="canLoadMore" @getmoreplaying="getMore" ref="con">
                 <h1>近期最受期待</h1>
                <div class="expect">
                    <div class="expectbox">
                        <div class="expect_item" v-for="item in expectlist" :key="item.id">
                            <div class="item_img">
                                <img :src="item.img | replaceWH(85,115)" alt="l">
                                <h3>
                                    <span>{{item.wish}} <i>人想看</i></span> 
                                </h3>
                            </div>
                            <h2>{{item.nm}}</h2>
                            <span class="time">{{item.comingTitle}}</span>
                        </div>
                    </div>
                    
                </div>
                <div class="list">
                    <ul v-for="(item,key) in comingMap" :key="key">
                        <h3>{{key}}</h3>
                        <li v-for="info in item" :key="info.id" class="item">
                            <div class="item_img"> 
                                <img :src="info.img | replaceWH(85,115)" alt="l">
                            </div>
                            <div class="item_text">
                                <div class="text_title">
                                    <h2>{{info.nm}}</h2>
                                    <div class="version"></div>
                                </div>
                                <h3>
                                    <span>{{info.wish}} <i>人想看</i></span> 
                                </h3>
                                <span class="item_star">主演 {{info.star}}</span>
                                <p>{{info.rt}}上映</p>
                            </div>
                            <div class="item_btn">
                            <button :class="{btn_text:info.showst==1}">
                                    {{info.showst==4?'预售':'想看'}}
                                </button>
                            </div>

                        </li>
                    </ul>
                </div>
    </app_content>
</template>

<script>
import filter from "../../utils/filter";
import {
  findByDate,
  getMostExpected,
  getComingList,
  getMoreComing
} from "../../services/movieService";
export default {
  props:{
    ci:Number
  },
  data() {
    return {
      cominglist: [],
      comingMap: {},
      expectlist: [],
      comingIds: [],
      canLoadMore: true
    };
  },
  created() {
    // 请求即将上映的数据
    getComingList(this.ci).then(({ data, movieIds }) => {
      this.cominglist = data;
      this.comingIds = movieIds;
      this.comingMap = findByDate(data);
    });
    // 请求最近最受期待的数据
    getMostExpected().then(result => {
      this.expectlist = result;
    });
  },
  watch:{
    ci(neval){
      console.log("更新城市了");
      this.$nextTick(()=>{
         // 请求即将上映的数据
        getComingList(neval).then(({ data, movieIds }) => {
          this.cominglist = data;
          this.comingIds = movieIds;
          this.comingMap = findByDate(data);
        });
      })
    }
  },
  methods: {
    getMore() {
      console.log("getmore")
      if (this.cominglist.length >= this.comingIds.length) {
        console.log("已经没有更多了");
        this.canLoadMore = false;
        return;
      }
      let ids = this.comingIds.splice(this.cominglist.length, 10);
      this.cominglist.concat(ids);
      ids = ids.join(",");
      // 加载更多
      getMoreComing(this.ci,ids).then(newData => {
        // 按日期分类
        let newMap = {};
        newMap = findByDate(newData);
        // 拼接到本地 拼接到空对象中再赋值给this.comingMap
        this.comingMap = Object.assign({}, this.comingMap, newMap);
        // console.log(this.comingMap);
        this.$refs.con.scroll.refresh();
      });
    },
  }
};
</script>

<style lang="scss" scoped>
h1 {
  font-size: 14px;
  color: #666;
  line-height: 50px;
}
.expect {
  overflow-x: auto;
  .expectbox {
    border-bottom: 5px solid #eee;
    display: flex;
    .expect_item {
      width: 100px;
      height: 170px;
      margin: 0 10px;
    }
    .item_img {
      width: 100px;
      padding: 0 5px;
      position: relative;
      img {
        width: 85px;
        height: 115px;
      }
      h3 {
        width: 100%;
        position: absolute;
        left: 5px;
        bottom: 5px;
        font-size: 12px;
        line-height: 12px;
        span {
          color: rgb(240, 179, 13);
        }
      }
    }
    h2 {
      width: 100%;
      line-height: 14px;
      font-size: 14px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      padding-left: 5px;
    }
    .time {
      display: block;
      width: 100%;
      font-size: 10px;
      line-height: 20px;
      color: #aaa;
      padding-left: 5px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
}
ul {
  h3 {
    font-size: 16px;
    color: #333;
    height: 30px;
    line-height: 30px;
  }
}
.list {
  .item {
    width: 100%;
    display: flex;
    padding: 10px;
    border-bottom: 2px solid #eee;
    .item_img {
      width: 85px;
      height: 115px;
      img {
        width: 85px;
        height: 115px;
      }
    }
    .item_text {
      flex: 1;
      margin: 10px;
      .text_title {
        h2 {
          width: 150px;
          font-size: 20px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
      h3 {
        font-size: 16px;
        color: #999;
        span {
          color: rgb(241, 207, 14);
          i {
            color: #666;
          }
        }
      }
      .item_star {
        display: inline-block;
        width: 200px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        color: #555;
      }

      p {
        width: 100%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        color: #444;
      }
    }
    .item_btn {
      width: 85px;
      height: 115px;
    }
  }
}
.item_btn {
  position: relative;
  button {
    position: absolute;
    width: 40px;
    height: 20px;
    background: rgb(8, 201, 250);
    left: 50%;
    top: 50%;
    margin-left: -20px;
    margin-top: -10px;
    border-radius: 3px;
    font-size: 10px;
    color: #fff;
  }
  .btn_text {
    background: rgb(241, 226, 11);
  }
}
</style>

