<template>
           <div class="show">
                    <app-header :title="name">
                        <div slot="left" class="header-btn-left"></div>
                    </app-header>
                <app_content>
                    <div class="show_banner">
                        <img :src="img | replaceWH(110,150)" alt="l">
                        <div class="banner_txt">
                            <h3>{{name}}</h3>
                            <div>fjs kduf oir we,fsd oip</div>
                            <p>{{wish}}人想看</p>
                            <span></span>
                            <span>冒险，惊悚，喜剧 {{version?'3D':""}}</span>
                            <span>美国</span>
                            <span>{{date}}</span> 
                            <div class="btn"></div>
                        </div>
                    </div>
                    <div class="show_content">
                        <ul class="date_tab">
                            <li v-for="item in 7" :key="item" @click="setActive(item)"
                            class="tab_item" :class="{tab_active:active==item}">
                                {{nowdate}}
                            </li>
                        </ul>
                        <ul class="kind_tab">
                            <li>全城</li>
                            <li>品牌</li>
                            <li>特色</li>
                        </ul>
                    </div>
                  </app_content>
            </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState({
      id: state => state.playingDetail.id,
      name: state => state.playingDetail.name,
      img: state => state.playingDetail.img,
      wish: state => state.playingDetail.wish,
      date: state => state.playingDetail.date,
      version: state => state.playingDetail.version
    })
  },
  data() {
    return {
      nowdate: new Date().toLocaleDateString().replace(/[/]/g, "-"),
      active: 1
    };
  },
  methods: {
    setActive(item) {
      this.active = item;
    }
  }
};
</script>

<style lang="scss" scoped>
.show {
  width: 100%;
  position: fixed;
  background: #fff;
  left: 0;
  top: 0;
  bottom: 0;
  z-index: 2;
  .show_banner {
    padding: 10px;
    width: 100%;
    height: 188px;
    background: #666;
    position: absolute;
    top: 0px;
    left:0;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: 110px;
      height: 150px;
      margin: 10px;
    }
    .banner_txt {
      flex: 1;
      position: relative;
      * {
        margin: 5px;
      }
      h3 {
        color: #fff;
        width:100%;
        white-space:nowrap;
        overflow:hidden;
        text-overflow:ellipsis;
      }
      p {
        font-size: 14px;
        color: rgb(247, 146, 15);
      }
      div {
        color: #fff;
      }
      span {
        display: block;
        color: #aaa;
        font-size: 14px;
      }
      .btn {
        position: absolute;
        top: 50%;
        right: 5px;
        width: 0;
        height: 0;
        margin-top: -5px;
        border-width: 10px;
        border-color: transparent transparent transparent #fff;
        border-style: dashed dashed dashed solid;
        &:after {
          content: "";
          position: absolute;
          left: -12px;
          top: -10px;
          width: 0;
          height: 0;
          border-width: 10px;
          border-color: transparent transparent transparent #666;
          border-style: dashed dashed dashed solid;
        }
      }
    }
  }

  .show_content {
    position: absolute;
    width: 100%;
    bottom: 0;
    top: 188px;
    .date_tab {
      display: flex;
      overflow-x: auto;
      white-space: nowrap;
      .tab_item {
        padding: 12px;
        line-height: 30px;
        color: #666;
      }
      .tab_active {
        border-bottom: 2px solid red;
        color: red;
      }
    }
    .kind_tab {
      display: flex;
      width: 100%;
      justify-content: space-around;
      border: 1px solid #ddd;
      border-left: none;
      border-right: none;
      li {
        flex: 1;
        text-align: center;
        line-height: 40px;
        position: relative;
        border-right: 1px solid #ddd;
        &:after {
          position: absolute;
          display: block;
          content: "";
          width: 0;
          height: 0;
          border-width: 5px;
          border-color: #aaa transparent transparent transparent;
          border-style: solid dashed dashed dashed;
          right: 50%;
          top: 50%;
          margin-top: -2px;
          margin-right: -30px;
        }
      }
    }
  }
}
</style>

