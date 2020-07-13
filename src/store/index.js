import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loginType:sessionStorage.getItem('loginType')||undefined,
    gitee_client_id: '2632e89d3dfb17ce941d2d2b45efc6f235afb4941ddb67578adda83aa33ab6a2',
    gitee_client_secret: '265ba325522a42a531649d39fa323ce0788238b1c7ea279297443eb52edd18af',
    gitee_redirect_uri: 'http://139.159.224.207:60031/api/v1/login?platform=gitee',
    github_client_id: 'd86f4915398dad23bffc',
    github_client_secret: '7e605a8a1104b78452475264c85df5b73a108c94',
    github_redirect_uri: 'http://localhost:8080/home',
    access_token:sessionStorage.getItem('access_token')||undefined,
    refresh_token:sessionStorage.getItem('refresh_token')||undefined,
    user:{
      loginUser:sessionStorage.getItem('loginUser')||undefined,
      loginUserImg:sessionStorage.getItem('loginUserImg')||undefined,
    },
  },
  mutations: {
    setToken(state,data){
      console.log(data);
      state.access_token=data.access_token;
      state.refresh_token=data.refresh_token;
      sessionStorage.setItem('access_token',data.access_token);
      sessionStorage.setItem('refresh_token',data.refresh_token);
    },
    setLoginUser(state,data){
      state.user.loginUser=data.loginUser;
      state.user.loginUserImg=data.loginUserImg;
      sessionStorage.setItem('loginUser',data.loginUser);
      sessionStorage.setItem('loginUserImg',data.loginUserImg);
    },
    setLoginType(state,loginType){
      state.loginType=loginType;
      sessionStorage.setItem('loginType',loginType);
    },
  },
  actions: {
    setLoginTypeAct({commit},loginType){
      console.log(loginType);
      commit('setLoginType',loginType)
    },
    setTokenAct({commit},data){
      commit('setToken',data);
    },
    setLoginUserAct({commit},data){
      console.log(data);
      commit('setLoginUser',data)
    }
  },
  modules: {
  }
})
