import API from "../api"
import http from "../utils/http"

// 请求正在热映点击电影的详情数据
export function getDetail(id,day){
    return new Promise((resolve,reject)=>{
        http({
            url:API.PLAYING_DETAIL_API,
            method:"get",
            data:{
                movieId:id,
                day:day
            }
        })
        .then(({data})=>{
            resolve(data);
        })
    })
}