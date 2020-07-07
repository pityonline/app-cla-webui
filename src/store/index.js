import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loginType:sessionStorage.getItem('loginType')||undefined,
    gitee_client_id: '2632e89d3dfb17ce941d2d2b45efc6f235afb4941ddb67578adda83aa33ab6a2',
    gitee_client_secret: '265ba325522a42a531649d39fa323ce0788238b1c7ea279297443eb52edd18af',
    gitee_redirect_uri: 'http://127.0.0.1:8080/v1/login',
    github_client_id: 'd86f4915398dad23bffc',
    github_client_secret: '7e605a8a1104b78452475264c85df5b73a108c94',
    github_redirect_uri: 'http://localhost:8080/home',
  },
  mutations: {
    setLoginType(state,loginType){
      state.loginType=loginType;
      sessionStorage.setItem('loginType',loginType);
    },
  },
  actions: {
    setLoginTypeAct({commit},loginType){
      console.log(loginType);
      commit('setLoginType',loginType)
    }
  },
  modules: {
  }
})
