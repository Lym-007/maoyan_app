
/*请求电影数据的服务*/

import http from "../utils/http"
import API from "../api"

// 导出请求正在热映的电影数据
export function getPlayingList(){
    // 使用promise解决异步问题
    return new Promise((resolve, reject)=>{
        http({
            url: API.PLAYING_API,
            method: 'GET',
            data: {
                token: ''
            }
        })
        .then(({data, status})=>{
            // console.log(data)
            if(status == 200){
                //请求成功
                let newData = data.movieList.map(item=>{
                    let {id, nm, img,rt, version, sc, star, showInfo, wish, globalReleased} = item;
                    return {id, nm, img,rt, version, sc, star, showInfo, wish, globalReleased};
                })
                // 创建数据对象接收data和movieIDS
                let dataobj={};
                dataobj.data=newData;
                dataobj.ids=data.movieIds;
                resolve(dataobj);  
            }else{
                //请求失败
            }
        })
        .catch(()=>{
            //请求失败
        });
    })
}

// 请求即将上映的数据
export function getComingList(ci){
    return new Promise((resolve,reject)=>{
        http({
            url:API.COMING_API,
            method:"get",
            data:{
                ci:ci||30,
                token:"",
                limit:10
            }
        })
        .then(({data,status})=>{
            // console.log(data)
            if(status==200){
                let newData=data.coming.map(item=>{
                    let {id, nm, img, wish, star, rt,showInfo, version, comingTitle,showst} = item;
                    return {id, nm, img, wish, star, rt,showInfo, version, comingTitle,showst};
                });
               
                // 传递的是没有分类好的数据
                let dataobj={};
                dataobj.data=newData;
                dataobj.movieIds=data.movieIds;
                resolve(dataobj);
            }
            else{
                // 请求失败
            }
        })
        .catch(()=>{
            // 请求失败
        })
    })
}

// 请求最受期待的数据

export function getMostExpected(){
    return new Promise((resolve,reject)=>{
        http({
            url:API.MOST_EXPECTED_API,
            method:"get",
            data:{
                limit:10,
                offset:0,
                token:""
            }
        })
        .then(({data,status})=>{
            if(status!=200){
                // 请求失败
                return ;
            }
            let newData={};
            // console.log(data)
            newData=data.coming.map((item)=>{
                let {id,img,wish,nm,star, rt,showInfo,showst ,version, comingTitle}=item;
                return {id,img,wish,nm,star,rt, showInfo, showst,version, comingTitle};
            })
            resolve(newData);
        })
        .catch(()=>{
            // 请求失败
        })
    })
}
 

// 请求加载更多正在热映
export function getMorePlaying(ids){
    return new Promise((resolve,reject)=>{
        http({
            url:API.MORE_PLAYING_API,
            method:"get",
            data:{
                token:"",
                movieIds:ids
            }
        })
        .then(({data,status})=>{
            if(status!==200){
                return ;
            }
            resolve(data)
        })
    })
}

// 请求加载更多即将上映
export function getMoreComing(ci,ids){
    return new Promise((resolve,reject)=>{
        http({
            url:API.MORE_COMING_API,
            method:"get",
            data:{
                ci:ci||30,
                token:"",
                limit:10,
                movieIds:ids
            }
        })
        .then(({data})=>{
            resolve(data.coming);
        })
    })
}

export function findByDate(newData){
    // 按日期分类
       let dataMap={};
       newData.map(item=>{
           // 如果dataMap中没有item.comingTitle属性
           if(!dataMap[item.comingTitle]){
               // 将其加入到dataMap对象中并声明为一个空数组
               dataMap[item.comingTitle]=[];
           }
           // 将对应日期的数据加入到数组中
           dataMap[item.comingTitle].push(item);
       }) 
       return dataMap;
}