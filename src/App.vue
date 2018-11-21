<template>
  <div id="app">
      <app-header :title="tabList[selectIndex].name"></app-header>
      <transition enter-active-class="slideInRight">
        <router-view></router-view>
      </transition>
      <tabs v-model="selectIndex">
        <tab-item v-for="(tabItem, index) in tabList" :key="index" 
          :name="tabItem.name" :icon="tabItem.icon">
        </tab-item> 
      </tabs>
  </div>
</template>
<script>
export default {
    data(){
      return {
        tabList:[
            {name:"猫眼电影",path:"/movie",icon:"iconfont icon-dianying"},
            {name:"影院",path:"/cinema",icon:"iconfont icon-yingyuana"},
            {name:"我的",path:"/mine",icon:"iconfont icon-daohanglan-05"},
          ],
          selectIndex:0
      }
    },
    watch:{
      selectIndex:{
        handler(newval){
          this.$router.push(this.tabList[newval].path);
        }
      }
    },
    created() {
      let path = this.$route.path;
      let index = this.tabList.findIndex((item, index)=>{
        // console.log(item.path == path)
        return item.path == path;
      })
      if(index >= 0){
        this.selectIndex = index;
      }
      // console.log(this.selectIndex)
    },

}

</script>
<style lang="scss">

</style>
