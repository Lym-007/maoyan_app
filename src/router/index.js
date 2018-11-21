import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

import Mine from "../pages/mine/Mine"
import Movie from "../pages/movie/Movie"
import Cinema from "../pages/cinema/Cinema"
import PlayingDetail from "../components/movie/PlayingDetail"
import Search from "../pages/common/Search"
import Address from "../pages/common/Address"
export default new Router({
  routes: [
    {
      path: "/movie",
      component: Movie,
      props:true,
      children: [
        {
          path: "detail",
          component: PlayingDetail
        },
        {
          path:"address",
          component:Address
        },
      ]
    },
    {
      path: "/detail",
      component: PlayingDetail
    },
    {
      path: "/search",
      component: Search,
      props:(route)=>({text:route.query.text})
    },
    {
      path: "/mine",
      component: Mine
    },
    {
      path: "/cinema",
      component: Cinema,
      children:[
        {
          path:"address",
          component:Address
        },
      ]
    },
    {
      path: "/**",
      redirect: "/movie"
    }
  ]
})
