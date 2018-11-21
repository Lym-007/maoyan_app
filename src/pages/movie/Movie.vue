<template>
    <div class="page" id="movie">
        <router-view/>
        <div class="sub-header">
                <span class="city-icon" @click="goAddress">{{cityNm}}</span>
                <nav class="nav">
                    <li v-for="(item, index) in navList" :key="index" 
                        @click="changeAction(index)"
                        :class="{active: index == navIndex}">
                        {{item}}
                    </li>
                </nav>
                <span class="search-icon" @click="goSearch">
                    <img src="../../assets/search.png"/>
                </span>
        </div>
        <keep-alive>
            <!-- 正在热映 -->
                <playing  v-if="navIndex==0" :ci="ci"></playing>
            <!-- 即将上映 -->
                <coming  v-if="navIndex==1" :ci="ci"></coming>
        </keep-alive>
            <transition enter-active-class="slideInRight" leave-active-class="slideOutRight">
                    <router-view></router-view>
            </transition>

    </div>
</template>

<script>
import playing from "../../components/movie/Playing"
import coming from "../../components/movie/Coming"
import {mapState} from "vuex"
export default {
    components:{
        playing,
        coming
    },
    computed:{
        ...mapState({
            cityNm:state=>state.city.nm,
            ci:state=>state.city.id
        })
    },
    data(){
            return {
                navList: ['正在热映', '即将上映'],
                navIndex: 0,
        }
    },
    
    methods: {
        changeAction(index){
            this.navIndex = index;
        },
        goSearch(){
            // this.$center.$emit("getPlaceholder","搜电影、搜影院");
            this.$router.push("/search?text=搜电影、搜影院");
            
        },
        goAddress(){
            this.$router.push("/movie/address")
        }
    },
 
}
</script>

<style lang="scss" scoped>
.sub-header{
    width: 100%;
    height: 44px;
    border-bottom: 1px solid #e6e6e6;
    display: flex;
    .city-icon{
        width:30%;
        text-align: center;
        line-height: 44px;
        font-size:14px;
        color:#999;
        &::after{
            content: '';
            display: inline-block;
            width: 0;
            height: 0;
            border: 6px solid transparent;
            border-top: 6px solid #666;
            transform: translateY(3px) translateX(3px);
        }
    }
    .nav{
        width: 55%;
        display: flex;
        color: #666;
        font-size: 14px;
        li{
            flex: 1;
            text-align: center;
            line-height: 44px;
            &.active{
                color: #f03d37;
                border-bottom: 2px solid #f03d37;
            }
        }
    }
    .search-icon{
        display:flex;
        width:50px;
        justify-content:center;
        img{
            width: 22px;
            margin: 10px auto;
        }
    } 
}
</style>
