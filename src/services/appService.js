import http from "../utils/http"
import API from "../api"

/** 请求城市列表 */

export function getCityList(){
    return new Promise((resolve,reject)=>{
        http({
            url:API.CITY_LIST_API,
            method:"get"
        })
        .then(({data,status})=>{
            // console.log("城市",data)
            if(status!=200){
                // 请求失败
                return ;
            }
            // 按首字母分类
            let newdata={};
            data.cts.map((item)=>{
                if(!newdata[item.py[0]]){
                    newdata[item.py[0]]=[];
                }
                newdata[item.py[0]].push(item);
            })

            //获取属性名
            let keys=Object.keys(newdata);
            
            // 排序
            for(let i=0;i<keys.length;i++){
                for(let j=i+1;j<keys.length;j++){
                    if(keys[i]>[keys[j]]){
                        let temp=keys[i];
                        keys[i]=keys[j];
                        keys[j]=temp;
                    }
                }
            }
            let dataMap={};
            for(let l=0;l<keys.length;l++){
                dataMap[keys[l]]=newdata[keys[l]];
            }
            // 填上属性值
            // console.log(dataMap)
            resolve(dataMap);
        })
    })
}

/*请求全城，品牌，特色等数据*/
export function getCityCinema(id){
    return new Promise((resolve,redject)=>{
        http({
            url:API.CITY_CINEMA_API,
            method:"get",
            ci:id
        })
        .then(({data,status})=>{
            console.log(data);
            // 请求成功
            if(status==200){
                  resolve(data);
            }
          
        })
    })
}

/**请求影院列表 */

export function getCinemaList(params){
    // console.log(params)
    return new Promise((resolve,reject)=>{
        http({
            url:API.CINEMA_LIST_API,
            method:"get",
            data: params
        })
        .then(({data,status})=>{
            if(status==200){
                console.log(data)
                resolve(data);
            }
        })
    })
}