<template>
        <div class="cinema_box">
            <router-view/>
            <div class="canOption">
                <div class="search">
                    <ul class="kind_tab">
                        <li @click="goAddress">
                            <span>{{city}}</span>
                            <span class="tag"></span>
                        </li>
                        <div class="box">
                            <div @click="goSearch">搜影院</div>
                        </div>
                    </ul>
                </div>
                <ul class="kind_tab">
                    <li :class="{active_kind:activekind[0]==1}" @click="choose(0)">
                        <span>{{urlParams.districtName}}</span>
                        <span class="tag"></span>
                    </li>
                    <li :class="{active_kind:activekind[1]==2}" @click="choose(1)">
                        <span>{{urlParams.brandName}}</span>
                        <span class="tag"></span>
                    </li>
                    <li :class="{active_kind:activekind[2]==3}" @click="choose(2)">
                        <span>特色</span>
                        <span class="tag"></span>
                    </li>
                </ul>
            </div>
            
             <app_content :canLoadMore="canLoadMore" @getmoreplaying="getMoreCinema">
                 <div class="cinema_list">
                     <div v-for="item in cinemalist" :key="item.id">
                            <div class="tit">
                                <span>{{item.nm}}</span>
                                <i>{{item.sellPrice}}元起</i>
                            </div>
                            <div class="add">
                                <span class="addtext">{{item.addr}}</span>
                                <span>{{item.distance}}</span>
                            </div>
                            <div class="card">
                                <span v-if="item.tag.allowRefund==1" class="card_blue">退</span>
                                <span v-if="item.tag.sell==1" class="card_blue">改签</span>
                                <span v-if="item.tag.snack==1">小吃</span>
                                <span v-if="item.tag.vipTag">{{item.tag.vipTag}}</span>
                                <span v-if="item.tag.hallType.length>0" 
                                    v-for="tag in item.tag.hallType"
                                    :key="tag" class="card_blue">
                                    {{tag}}
                                </span>
                            </div>
                            <div class="cheap">{{item.promotion.cardPromotionTag}}</div>
                     </div>
                 </div>
             </app_content>
            <district v-if="selectedIndex==1" :params_sub="subway" :params_dis="district" :district="urlParams"></district>
            <brand v-if="selectedIndex==2" :params="brand" :district="urlParams"></brand>
            <halltype v-if="selectedIndex==3" :hallType="hallType" :service="service" :district="urlParams"></halltype>
        </div>
</template>

<script>
import Brand from "./Brand"
import District from "./District"
import HallType from "./HallType"
import {getCityCinema,getCinemaList} from "../../services/appService"
import {mapState} from "vuex"
export default {
    // 导入组件
    components:{
        "brand":Brand,
        "district":District,
        "halltype":HallType
    },
    data(){
        return {
            // 选择页面控制下标
            selectedIndex:-1,
            // 获取到的行政区数据
            district:[],
            // 品牌数据
            brand:[],
            // 地铁数据
            subway:[],
            // 特殊厅数据
            hallType:[],
            // 服务数据
            service:[],
            activekind:[-1,-2,-3],
            // 获取到的当前区域的影院数据
            cinemalist:[],
            canLoadMore:true,
            urlParams:{
                districtName:"全城",
                brandName:"品牌",
                cityId:30,
                day:new Date().toLocaleDateString().replace(/[/]/g,"-"),
                districtId:-1,
                lineId:-1,
                hallType:-1,
                brandId:-1,
                serviceId:-1,
                areaId:-1,
                stationId:-1,
                updateShowDay:true,
                reqId:Date.now(),
                limit:10,
                offset:0,
                item:""
            } ,
            total:0
        }
    },
    computed:{
        // 获取store中的数据
        ...mapState({
            city:state=>state.city.nm,
            id:state=>state.city.id,
        }),
    },
    methods:{
        // 到定位
        goAddress(){
            this.$router.push("/cinema/address")
        },
        // 到搜索
        goSearch(){
            this.$router.push("/search?text=搜影院")
        },
        // 切换城市品牌
        choose(index){
            // 取反实现点击切换
            this.activekind[index]=-this.activekind[index];
            this.selectedIndex=this.activekind[index]; 
            // 将其他未选中显示的置为默认值
            for(let i=0;i<this.activekind.length;i++){
                if(this.activekind[i]!=this.selectedIndex){
                    this.activekind[i]=-(i+1);
                }
            }
        },
             // 加载更多
        getMoreCinema(){
                    console.log("getmore---")
                // 判断是否还有更多数据
                if(this.urlParams.limit>=this.total){
                    this.canLoadMore=false;
                }
                else{
                    this.canLoadMore=true;
                }
                // 重新请求更多数据
                this.urlParams.limit+=10;
                getCinemaList(this.urlParams).then(result=>{
                    //更新影院数据
                        this.cinemalist=result.cinemas;   
                })
            
        }
    },
    created(){
        this.$center.$on("setDistrict",(params)=>{
             this.urlParams.districtName=params.districtName||this.urlParams.districtName;
             this.urlParams.brandName=params.brandName||this.urlParams.brandName;
            this.urlParams.cityId=params.cityId||this.urlParams.cityId;
            this.urlParams.districtId=params.districtId||this.urlParams.districtId;
            this.urlParams.lineId=params.lineId||this.urlParams.lineId;
            this.urlParams.hallType=params.hallType||this.urlParams.hallType;
            this.urlParams.brandId=params.brandId|| this.urlParams.brandId;
            this.urlParams.serviceId=params.serviceId||this.urlParams.serviceId;
            this.urlParams.areaId=params.areaId||this.urlParams.areaId;
            this.urlParams.stationId=params.stationId||this.urlParams.stationId;
            this.urlParams.updateShowDay=params.updateShowDay||this.urlParams.updateShowDay;
            this.urlParams.limit=params.limit||this.urlParams.limit;
            if(this.urlParams.brandName==="全部"){
                this.urlParams.brandName="品牌";
            }
        })
        // console.log(this.$store.state.district.district.name)
        // 响应关闭选择页面
        this.$center.$on("closeDisrict",param=>{
            this.selectedIndex=param.index;
        })
        this.$center.$on("reload",(district)=>{
               // 恢复默认样式
                this.activekind=[-1,-2,-3];
                let query = district;
                this.urlParams=Object.assign({},district);
                // console.log(this.urlParams)
                // 请求相应影院
                getCinemaList(query).then(result=>{
                    //更新影院数据
                    this.cinemalist=result.cinemas;  
                    this.total=result.paging.total; 
            })
           
        }) 
        // 更改区域名字
            this.$center.$on("setName",name=>{
                this.urlParams.districtName=name;
            })
        getCityCinema(this.id).then((result)=>{
            this.district=result.district.subItems;
            this.brand=result.brand.subItems;
            this.subway=result.subway.subItems;
            this.hallType=result.hallType.subItems;
            this.service=result.service.subItems;
        })
        // 请求默认影院
        getCinemaList().then(result=>{
            this.cinemalist=result.cinemas;
            this.total=result.paging.total;
        })
    },

}
</script>

<style lang="scss" scoped>
.cinema_box {
  width: 100%;
  position:absolute;
  top:44px;
  bottom:49px;
  .canOption{
      position:relative;
      z-index: 3;
  }
  .kind_tab {
      background:#fff;
        display: flex;
        width: 100%;
        justify-content: space-around;
        border: 1px solid #ddd;
        border-left: none;
        border-right: none;
        div{
            width:80%;
            padding:5px;
            div{
                width:100%;
                height:30px;
                border:1px solid #ccc;
                border-radius:5px;
                padding:0 10px;
                font-size:12px;
                color:#aaa;
                background:#fff;
                text-align:center;
                line-height:25px;
            }
        }
        li {
            flex: 1;
            text-align: center;
            line-height: 40px;
            position: relative;
            border-right: 1px solid #ddd;
            font-size:12px;
            color:#999;
            display:flex;
            justify-content:center;
            align-items:center;
            .tag {
                display: block;
                content: "";
                width: 0;
                height: 0;
                border-width: 5px;
                border-color: #aaa transparent transparent transparent;
                border-style: solid dashed dashed dashed;
                margin-top:5px;
                margin-left:2px;
            }
    }
      .active_kind{
            color:red;
            .tag{
                border-color:  transparent transparent red transparent;
                border-style: dashed dashed solid dashed;
                margin-top:-5px;
            }
            
        }
  }
  .search{
      
      .kind_tab{
          background:#eaeaea;
      }
      li{
          border:none;
          font-size:14px;
          color:#666;
      }
  }
  .cinema_list{
      padding-top:25px;
    //   用了不计算在文档流的定位就不能滚动
    //   position:absolute;
      display:flex;
      flex-direction: column;
      div{
           padding:2px;
           margin:2px;
      }
      .tit{
          width:100%;
          span{
              font-size:16px;
          }
          i{
              color:red;
              margin-left:10px;
          }
      }
      .add{
          font-size:13px;
          color:#666;
          display:flex;
          justify-content: space-between;
        .addtext{
            flex:3;
            white-space:nowrap;
            overflow:hidden;
            text-overflow:ellipsis;
        }
      }
      .card{
          span{
              color:#f60;
              padding:1px 3px;
              font-size:8px;
              line-height:10px;
              border:1px solid #f60;
              margin:0 2px;
              border-radius:2px;
          }
          .card_blue{
              color:#589daf;
              border-color:#589daf;
          }
      }
      .cheap{
          font-size:12px;
          color:#999;
      }
  }
}
  .district{
        width:100%;
        position:fixed;
        top:0;
        bottom:0;
        left:0;
        z-index: 2;
        background:rgba(0,0,0,0.4);
}
</style>

