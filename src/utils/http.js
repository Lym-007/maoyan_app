/*发送http请求的工具*/

// 引入发送请求的工具和接口
import axios from "axios"
import API from "../api"

// 导出发送请求的方法
// 参数：请求的配置对象
export default function http(options){
    let obj={};
    if(options.method.toUpperCase()=="GET"){
        // get请求参数为params
        obj.params=options.data;
    }
    else if(options.method.toUpperCase()=="POST"){
        // post请求参数为data
        obj.data=options.data;
    }
    // 返回请求函数
    return axios({
        url:options.url,
        method:options.method,
        ...obj,
        baseURL:API.SAT_HOST,
        // timeout:1000
    });
}