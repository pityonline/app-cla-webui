import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import * as url from '../until/api'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        repoInfo:JSON.parse(sessionStorage.getItem('repoInfo')) || undefined,
        loginType:sessionStorage.getItem('loginType') || undefined,
        tableData: JSON.parse(sessionStorage.getItem('tableData')) || undefined,
        ready: Boolean(sessionStorage.getItem('ready') || undefined),
        platform: sessionStorage.getItem('platform') || undefined,
        gitee_client_id: '2632e89d3dfb17ce941d2d2b45efc6f235afb4941ddb67578adda83aa33ab6a2',
        gitee_client_secret: '265ba325522a42a531649d39fa323ce0788238b1c7ea279297443eb52edd18af',
        gitee_redirect_uri: 'http://139.159.224.207:60031/api/v1/login?platform=gitee',
        github_client_id: 'd86f4915398dad23bffc',
        github_client_secret: '7e605a8a1104b78452475264c85df5b73a108c94',
        github_redirect_uri: 'http://localhost:8080/home',
        access_token: sessionStorage.getItem('access_token') || undefined,
        refresh_token: sessionStorage.getItem('refresh_token') || undefined,
        user: {
            userId: sessionStorage.getItem('userId') || undefined,
            userName: sessionStorage.getItem('userName') || undefined,
            userImg: sessionStorage.getItem('userImg') || undefined,
            userEmail: sessionStorage.getItem('userEmail') || undefined,
        },
    },
    mutations: {
        setReady(state, data) {
            console.log(data);
            state.ready = data.ready;
            state.tableData = data.tableData;
            sessionStorage.setItem('ready', data.ready);
            sessionStorage.setItem('tableData', JSON.stringify(data.tableData));
        },
        setToken(state, data) {
            console.log(data);
            state.access_token = data.access_token;
            state.refresh_token = data.refresh_token;
            sessionStorage.setItem('access_token', data.access_token);
            sessionStorage.setItem('refresh_token', data.refresh_token);
        },
        setLoginUser(state, data) {
            state.user.userId = data.userId;
            state.user.userName = data.userName;
            state.user.userImg = data.userImg;
            state.user.userEmail = data.userEmail;
            sessionStorage.setItem('userId', data.userId);
            sessionStorage.setItem('userName', data.userName);
            sessionStorage.setItem('userImg', data.userImg);
            sessionStorage.setItem('userEmail', data.userEmail);
        },
        setPlatform(state, platform) {
            console.log(platform);
            state.platform = platform;
            sessionStorage.setItem('platform', platform);
        },
        setLoginType(state, loginType) {
            console.log(loginType);
            state.loginType = loginType;
            sessionStorage.setItem('loginType', loginType);
        },
        setRepoInfo(state, obj) {
            console.log(obj);
            state.repoInfo = obj;
            sessionStorage.setItem('repoInfo', JSON.stringify(obj));
        },
    },
    actions: {
        setRepoInfoAct({commit}, obj) {
            console.log(obj);
            commit('setRepoInfo', obj);


},
        setLoginTypeAct({commit}, loginType) {
            console.log(loginType);
            commit('setLoginType', loginType)

        },
        setPlatformAct({commit}, platform) {
            console.log(platform);
            commit('setPlatform', platform)
        },
        setTokenAct({commit}, data) {
            commit('setToken', data);
        },
        setLoginUserAct({commit}, data) {
            commit('setLoginUser', data)
        },

        getLinkedRepoListAct({commit}, data) {
            console.log('getLinkedRepoListAct',data);
            axios({
                url: '/api' + url.getLinkedRepoList,
                params:{enabled:true},
                headers: {
                    'Access-Token': data.access_token,
                    'Refresh-Token': data.refresh_token,
                    'User': `${data.platform}/${data.userName}`
                }
            }).then(res => {
                console.log(res);

                if (res.data.length) {
                    let tableData = [];
                    let count = res.data.length
                    res.data.forEach((item, index) => {
                       this.claChoose = true; console.log(index);
                        tableData.push({
                            id: item.id,
                            repository: `${item.org_id}/${item.repo_id}`,
                            cla: item.cla_id,
                            contributors: '0',
                        });
                        ((index, item, length, {commit}, tableData) => {
                            console.log(index, tableData, item, length);

                            axios({
                                url: `/api${url.getClaInfo}/${item.cla_id}`,
                                headers: {
                                    'Access-Token': data.access_token,
                                    'Refresh-Token': data.refresh_token,
                                    'User': `${data.platform}/${data.userName}`
                                }
                            }).then(resp => {
                                console.log(resp);
                                console.log(index, tableData, item, length);
                                Object.assign(tableData[index], {
                                    claName: resp.data.name,
                                })
                                if (--count===0) {
                                    let obj = {tableData: tableData, ready: true}
                                    commit('setReady', obj);
                                }
                                console.log(tableData);
                            }).catch(err => {
                                console.log(err);
                            })
                        })(index, item, res.data.length, {commit}, tableData)

                    })

                }
            }).catch(err => {
                console.log(err);
            })

        },

    },
    modules: {}
})
