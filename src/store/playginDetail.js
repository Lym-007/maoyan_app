/**
 * 正在热映详情模块
 */
export default{
    // 设置命名空间，成为独立模块
    namespaced:true,
    state:{
        id:"",
        name:"",
        img:"",
        wish:"",
        date:"",
        version:""
    },
    mutations:{
            setInfo(state,params){
                state.id=params.id;
                state.name=params.nm;
                state.img=params.img;
                state.wish=params.wish;
                state.date=params.rt;
                state.version=params.version;
            }
    },
    actions:{
        setDetail(context,params){
            context.commit("setInfo",params);
        }
        
    }
}