<template>
            <app_content :canLoadMore="canLoadMore" @getmoreplaying="getMorePlaying" >
                            <li v-for="item in playingList" 
                            :key="item.id" class="item"
                            @click.stop="getDetailInfo(item)">
                                <div class="item_img"> 
                                    <img :src="item.img | replaceWH(85,115)" alt="l">
                                </div>
                                <div class="item_text">
                                    <div class="text_title">
                                        <h2>{{item.nm}}</h2>
                                        <div class="version"></div>
                                    </div>
                                    <h3>
                                        <span> 
                                            {{item.globalReleased?'观众评分':'' }}
                                        </span>
                                        <i>{{item.globalReleased?item.sc:item.wish}}</i>
                                        <span> 
                                            {{item.globalReleased?'':'人想看' }}
                                        </span>
                                    </h3>
                                    <span class="item_star">主演 {{item.star}}</span>
                                    <p>{{item.showInfo}}</p>
                                </div>
                                <div class="item_btn">
                                    <button :class="{btn_text:item.globalReleased}">
                                        {{item.globalReleased?'购票':'预售'}}
                                    </button>
                                </div>
                            </li>              
            </app_content>

</template>

<script>
import filter from "../../utils/filter"
import {mapActions,mapState} from "vuex"
import {getDetail} from "../../services/detailService"
import {getPlayingList,getMorePlaying} from "../../services/movieService"
export default {
    props:{
        ci:Number
    },
    data(){
        return {
            playingList: [],
            playingIds:[],
            canLoadMore:true,
            show:0,
            nowdate:"",
            active:0
        }
    },
    methods:{
        getMorePlaying(){
            // 获取总的数据条数id
            let ids=[...this.playingIds];
            // 去掉已经显示的数据,加载10条
            ids=ids.splice(this.playingList.length,10);
            // 拼接成字符串
            let movieIds=ids.join(",");
            // 发送请求
            // if(this.canLoadMore){
                 getMorePlaying(movieIds).then((data)=>{
                    //  console.log(data.coming)
                    // 将结果拼接到本地
                    this.playingList=[...this.playingList,...data.coming];
                    // console.log(this.playingList)
                    // 判断是否还有数据可加载
                    if(this.playingList.length>=this.playingIds.length){
                        // 不可加载
                        this.canLoadMore=false;
                    }
                    else{
                        this.canLoadMore=true;
                    }
                })
            // }
           
        },
        ...mapActions({
            setDetail:"playingDetail/setDetail"
        }),
        getDetailInfo(info){
            // 获取id
            let id=info.id;
            // 获取时间
            let date=new Date();
            let day=date.toLocaleDateString();
            day=day.replace(/[/]/g,"-");
            this.nowdate=day;
            // 发送请求
            getDetail(id,day).then((result)=>{
                console.log(result)
                this.setDetail(info);
                this.$router.push("/movie/detail");
            })
        }
    },
    created(){
         //请求正在热映的电影数据
        getPlayingList().then(({data,ids})=>{
            this.playingList = data;
            this.playingIds=ids;
        }); 
        // console.log(getDetail)
    }
}
</script>

<style lang="scss" scoped>
            .item{
                width:100%;
                display:flex;
                padding:10px;
                border-bottom:2px solid #eee;
                .item_img{
                    width:85px;
                    height:115px;
                }
                .item_text{
                    flex:1;
                    margin:10px;
                    .text_title{
                        h2{
                            width:150px;
                            font-size:20px;
                            white-space:nowrap;
                            overflow:hidden;
                            text-overflow:ellipsis;
                        }
                    }
                    h3{
                        font-size:16px;
                        color:#666;
                        i{
                            color:rgba(247, 212, 10, 0.63);
                        }
                    }
                    .item_star{
                            display:inline-block;
                            width:200px;
                            white-space:nowrap;
                            overflow:hidden;
                            text-overflow:ellipsis;
                            color:#555;
                        }
                    
                    p{
                        width:100%;
                        white-space:nowrap;
                        overflow:hidden;
                        text-overflow:ellipsis;
                        color:#444;
                    }
                }
                .item_btn{
                    width:85px;
                    height:115px;
                }
    }
    .item_btn{
        position:relative;
        button{
            position: absolute;
            width:40px;
            height:20px;
            background:rgb(8, 201, 250);
            left:50%;
            top:50%;
            margin-left:-20px;
            margin-top:-10px;
            border-radius:3px;
            font-size:10px;
            color:#fff;
        }
        .btn_text{
            background:rgb(233, 83, 83);
        }
    }
</style>

