import Vue from 'vue'
import Vuex from 'vuex'
import playingDetail from "./playginDetail"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
      city:{
        nm:"深圳",
        id:30
      }
  },
  mutations: {
    setCity(state,params){
      state.city.nm=params.nm;
      state.city.id=params.id;
    }
  },
  actions: {

  },
  modules:{
    playingDetail
  }
})
