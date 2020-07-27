import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import * as url from '../until/api'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tableData:JSON.parse(sessionStorage.getItem('tableData'))||undefined,
    ready:Boolean(sessionStorage.getItem('ready')||undefined),
    platform:sessionStorage.getItem('platform')||undefined,
    gitee_client_id: '2632e89d3dfb17ce941d2d2b45efc6f235afb4941ddb67578adda83aa33ab6a2',
    gitee_client_secret: '265ba325522a42a531649d39fa323ce0788238b1c7ea279297443eb52edd18af',
    gitee_redirect_uri: 'http://139.159.224.207:60031/api/v1/login?platform=gitee',
    github_client_id: 'd86f4915398dad23bffc',
    github_client_secret: '7e605a8a1104b78452475264c85df5b73a108c94',
    github_redirect_uri: 'http://localhost:8080/home',
    access_token:sessionStorage.getItem('access_token')||undefined,
    refresh_token:sessionStorage.getItem('refresh_token')||undefined,
    user:{
      userId:sessionStorage.getItem('userId')||undefined,
      userName:sessionStorage.getItem('userName')||undefined,
      userImg:sessionStorage.getItem('userImg')||undefined,
      userEmail:sessionStorage.getItem('userEmail')||undefined,
    },
  },
  mutations: {
    setReady(state,data){
      console.log(data);
      state.ready=data.ready;
      state.tableData=data.tableData;
      sessionStorage.setItem('ready',data.ready);
      sessionStorage.setItem('tableData',JSON.stringify(data.tableData));
    },
    setToken(state,data){
      console.log(data);
      state.access_token=data.access_token;
      state.refresh_token=data.refresh_token;
      sessionStorage.setItem('access_token',data.access_token);
      sessionStorage.setItem('refresh_token',data.refresh_token);
    },
    setLoginUser(state,data){
      state.user.userId=data.userId;
      state.user.userName=data.userName;
      state.user.userImg=data.userImg;
      state.user.userEmail=data.userEmail;
      sessionStorage.setItem('userId',data.userId);
      sessionStorage.setItem('userName',data.userName);
      sessionStorage.setItem('userImg',data.userImg);
      sessionStorage.setItem('userEmail',data.userEmail);
    },
    setPlatform(state,platform){
      state.platform=platform;
      sessionStorage.setItem('platform',platform);
    },
  },
  actions: {

    setPlatformAct({commit},platform){
      console.log(platform);
      commit('setPlatform',platform)
    },
    setTokenAct({commit},data){
      commit('setToken',data);
    },
    setLoginUserAct({commit},data){
      console.log(data);
      commit('setLoginUser',data)
    },
    /*获取指定cla数据*/
    getClaAct(id,index,data) {
      console.log("getClaAct");
      this.$axios({
        url: '/api' + url.getClaInfo,
        params:{
          id:id,
        },
        headers: {
          'Access-Token': data.access_token,
          'Refresh-Token': data.refresh_token,
          'User': `${data.platform}/${data.userName}`
        }
      }).then(res => {
        console.log(res);
        if (res.data.length) {
            this.tableData[index].assign({
              cla:res.data,
            })
        }
      }).catch(err => {
        console.log(err);
      })
    },
    getLinkedRepoListAct({commit},data) {
      axios({
        url: '/api' + url.getLinkedRepoList,
        headers: {
          'Access-Token': data.access_token,
          'Refresh-Token': data.refresh_token,
          'User': `${data.platform}/${data.userName}`
        }
      }).then(res => {
        console.log(res);

        if (res.data.length) {
          let tableData = [];
          res.data.forEach((item, index) => {
            tableData.push({
              id:item.id,
              repository: `${item.org_id}/${item.repo_id}`,
              cla: item.cla_id,
              sharedGist: 'Yes',
              contributors: '0',
            })
            axios({
              url: '/api' + url.getClaInfo,
              params:{
                id:item.id,
              },
              headers: {
                'Access-Token': data.access_token,
                'Refresh-Token': data.refresh_token,
                'User': `${data.platform}/${data.userName}`
              }
            }).then(res => {
              console.log(res);
              if (res.data.length) {
                tableData[index].assign({
                  cla:res.data,
                })
              }
            }).catch(err => {
              console.log(err);
            })
          })
          let obj={tableData:tableData,ready:true}
          commit('setReady',obj);
        }
      }).catch(err => {
        console.log(err);
      })

    },
  },
  modules: {
  }
})
