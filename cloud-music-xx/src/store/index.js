import Vue from 'vue'
import Vuex from 'vuex'
import mutations from "./mutations";
import actions from "./actions";
Vue.use(Vuex)

const state = {
  //保存singerItem点击的数据
  singItem:{},
}
export default new Vuex.Store({
  state: state,
  mutations: mutations,
  actions: actions,
  modules: {
  }
})
