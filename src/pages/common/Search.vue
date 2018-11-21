<template> 
        <div class="search_box">
            <app-header title="猫眼电影">
                <div class="header-btn header-btn-left" slot="left"></div>
            </app-header>
            <div class="search_text">
                    <input type="text" :placeholder="text">
                    <span @click="back">取消</span>
            </div>
        </div>
</template>
<script>
export default {
    props:{
        text:String
    },
    data(){
        return {
            
        }
    },
    methods:{
        back(){
            this.$router.back();
        }
    },
    created(){
       
    }
}
</script>

<style lang="scss" scoped>
    .search_box{
        width:100%;
        height:100%;
        position: fixed;
        left:0;
        top:0;
        background:#f5f5f5;
        z-index:3;
        .search_text{
            position:absolute;
            top:44px;
            width:100%;
            display: flex;
            -webkit-box-align: center;
            align-items: center;
            padding: 8px 0 8px 10px;
            background-color: #f5f5f5;
            border-bottom: 1px solid #e5e5e5;
            z-index: 1;
            input{
                flex:1;
                height:30px;
                padding:5px 10px;
                border:1px solid #e5e5e5;
                border-radius:5px;
            }
            span{
                padding:0 10px;
                font-size:16px;
                color:red;
                line-height:32px;
            }
        }
    }
</style>

