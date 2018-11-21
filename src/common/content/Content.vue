<template>
    <div class="content"  ref="content">
            <div class="wrap">
                 <slot/>
            </div>
    </div>
</template>

<script>
export default {
    name:"app_content",
    props:{
        canLoadMore:Boolean
    },
    mounted(){
        this.scroll=new IScroll(this.$refs.content,{
            click: true,
            tap: true
        });
        this.scroll.on("beforeScrollStart",()=>{
            this.scroll.refresh();
        })
        this.scroll.on("scrollEnd",()=>{
            if(this.scroll.y<=this.scroll.maxScrollY&&this.canLoadMore){
                console.log("start getmore")
                this.$emit("getmoreplaying");
            }
        })
    }
}
</script>

<style lang="scss" scoped>
    .content{
        width:100%;
        position:absolute;
        top:44px;
        bottom:0;
        overflow:hidden;
        .wrap{
            padding:15px;
            width:100%;
        }
    }
    
</style>
