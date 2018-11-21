/*定义接口文档*/


// 开发端域名
const SAT_HOST="http://localhost:8080";
// 测试端域名
const UAT_HOST="http://m.maoyan.com";
// 生产端域名
const PRO_HOST="http://m.maoyan.com";

/*
即将上映的接口
参数： ci 城市id
      token 用户表示
      limit 数据长度
*/
const COMING_API="/ajax/comingList";

/*
正在热映的接口
参数：token：可选，用户标识
     movieIds：可选，需要请求的电影id列表，如果没有，请求第一页数据
*/
const PLAYING_API = '/ajax/movieOnInfoList';

/* 
    近期最受期待数据接口
    参数：ci 城市id
          limit 数据长度
          offset 偏移量
          token  用户标识
    
*/
const MOST_EXPECTED_API="/ajax/mostExpected";

/* 
    加载更多正在热映的数据接口
    参数： ci 城市id
           token 用户标识
           limit 数据长度
           movieIds 数据长度id字符串
*/

const MORE_PLAYING_API="/ajax/moreComingList";

/**
 *  加载更多即将上映的数据接口
 * 参数：ci 城市id
 *       token 城市标识
 *      limit 数据长度
 *      movieIds 数据长度id字符串
 * 
 * 
 */
const MORE_COMING_API="/ajax/moreComingList";


/**
 * 正在热映电影详情接口
 * 参数 movieId 电影id
 *      day 当前时间
 */
const PLAYING_DETAIL_API="/ajax/filterCinemas";

/**
 * 定位城市列表接口(需要去package.json配置正向代理)
 * 无参数
 */
const CITY_LIST_API="/dianying/cities.json";

/**城市影院接口 
 * 参数 ci 城市id
 * 
*/
const CITY_CINEMA_API="/ajax/filterCinemas"

/**
 * 城市影院列表接口
 * http://m.maoyan.com/ajax/cinemaList?
 * day=2018-11-17
 * offset=0
 * limit=20
 * districtId=-1
 * lineId=-1
 * hallType=-1
 * brandId=-1
 * serviceId=-1
 * areaId=-1
 * stationId=-1
 * item=
 * updateShowDay=true
 * reqId=1542427440107
 * cityId=30
 * 参数：
 *      day 当前时间
 *      offset 偏移量
 *      limit 数据长度
 *      districtId 行政区id
 *      lineId 
 *      hallType  是特殊厅类型
 *      baranId  品牌id
 *      serviceId 服务id
 *      areadId  区id
 *      stationId 地铁id
 *      item  
 *      updateShowDay 
 *      reqId 时间戳
 *      cityId 城市id
 *         
 */

 const CINEMA_LIST_API="/ajax/cinemaList";
// 导出接口
export default{
    SAT_HOST,
    UAT_HOST,
    PRO_HOST,
    COMING_API,
    PLAYING_API,
    MOST_EXPECTED_API,
    MORE_PLAYING_API,
    MORE_COMING_API,
    PLAYING_DETAIL_API,
    CITY_LIST_API,
    CITY_CINEMA_API,
    CINEMA_LIST_API
}
