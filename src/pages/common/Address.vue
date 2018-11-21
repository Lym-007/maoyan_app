<template> 
        <div class="address_box">
                     <app-header title="定位">
                        <div class="header-btn header-btn-left" slot="left"></div>
                    </app-header>
            <app_content ref="content">
                   
                <div class="posit" ref="posit">
                    <h3>定位城市</h3>
                    <p>
                        <span>定位失败，请点击重试</span>
                    </p>
                </div>
                <div class="recently" ref="recently">
                    <h3>最近访问城市</h3>
                    <p>
                        <span v-for="item in recentlyCity" 
                        :key="item.id" @click="getPosition(item)">
                            {{item.nm}}
                        </span>
                    </p>
                </div>
                <div class="hot" ref="hot">
                    <h3>热门城市</h3>
                    <p>
                        <span v-for="item in hotCity" 
                        :key="item.id" @click="getPosition(item)">
                            {{item.nm}}
                        </span>
                    </p>
                </div>
                <div class="citylist">
                    <div v-for="(item,key) in citylist" :key="key" ref="city">
                        <h3>{{key.toUpperCase()}}</h3>
                        <p v-for="city in item" 
                        :key="city.id" class="list-item"
                        @click="getPosition(city)">
                        {{city.nm}}
                        </p>
                    </div>
                </div>
            </app_content>
            <div class="list-nav">
                <p v-for="(item,key,index) in citylist" :key="index" @click="goto(index)">
                    {{key.toUpperCase()}}
                </p>
            </div>
        </div>
</template>
<script>
import {getCityList} from "../../services/appService"
import {mapMutations} from "vuex"
export default {
    data(){
        return {
            citylist:{},
            hotCity:[
                {nm:"深圳",id:30},
                {nm:"上海",id:10},
                {nm:"北京",id:1},
                {nm:"杭州",id:51},
                {nm:"广州",id:20},
                {nm:"武汉",id:57},
                {nm:"重庆",id:45},
                {nm:"天津",id:40},
            ],
            recentlyCity:[
                {nm:"深圳",id:30},
                {nm:"上海",id:10},
                {nm:"北京",id:1},
            ]
        }
    },
    methods:{
        ...mapMutations({
                setCity:"setCity"
            }),
            goto(index){
                // 刷新视图
                this.$refs.content.scroll.refresh();
                let height=this.$refs.posit.offsetHeight+this.$refs.hot.offsetHeight
                +this.$refs.recently.offsetHeight+15;
                for(let i=0;i<this.$refs.city.length;i++){
                    if(i<index){
                        height+=this.$refs.city[i].offsetHeight;
                    }
                }
                // console.log(height)
                // 滚动视图
                this.$refs.content.scroll.scrollTo(0,-height,200);
            },
            getPosition(city){
                this.setCity(city);
                this.$router.back();
            }
    },
    created(){
        getCityList().then(list=>{
            this.citylist=list;
        });
    }
}
</script>

<style lang="scss" scoped>
    .address_box{
        width:100%;
        height:100%;
        position: fixed;
        left:0;
        top:0;
        background:#ebebeb;
        z-index:4;
        color:#333;
        .posit,.recently,.citylist,.hot{
            width:100%;
            background:#f5f5f5;
            h3{
                font-size:14px;
                background:#ebebeb;
                line-height:40px;
            }
            p{
                width:100%;
                padding:20px 10px;
                font-size:14px;
                span{
                    display:inline-block;
                    padding:5px 30px;
                    background:#fff;
                    margin:7px;
                }
            }
            .list-item{
                border-bottom:1px solid #ccc;
            }
        }
        .list-nav{
            width:15px;
            position:absolute;
            font-size:12px;
            text-align:center;
            right:0;
            top:50%;
            transform:translateY(-50%);
            p{
                padding:2px 0;
            }
        }
    }
</style>


