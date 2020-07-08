<template>
    <div>
        <div id="login" :style="login"></div>
        <div id="transparentDiv" :style="transparentDiv">
            <div id="header">
                <div>
                    <img src="../assets/logo.png" alt="">
                </div>

                <span class="pointer" @click="loginIn">Sign in</span>
            </div>
            <div id="section">
                <div id="title">
                    <svg-icon class="logText" icon-class="CLA_text"></svg-icon>

                </div>
                <div>Easily handle Contributor License Agreements (CLAs)</div>
                <div>
                    <label>
                        <el-select
                                size="medium"
                                value=""
                                v-model="value"
                                @change="change">
                            <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">

                            </el-option>
                        </el-select>
                    </label>
                    <!--<span>通过Gitee账号登陆</span>-->
                    <el-button type="primary" class="loginBt" @click="loginIn" size="medium">登 录</el-button>
                </div>

            </div>
        </div>


    </div>
</template>

<script>
    // @ is an alias to /src
    import * as url from '../until/api'
    import * as until from '../until/until'
    import Select from '@components/Select'
    import {mapActions} from 'vuex'

    window.onresize = () => {
        console.log(until.getClientHeight());
        console.log(document.getElementById('login').offsetHeight);
        if (until.getClientHeight() > document.getElementById('login').offsetHeight) {
            document.getElementById("login").style.height = until.getClientHeight() + 'px'
            document.getElementById("transparentDiv").style.height = until.getClientHeight() + 'px'
        }
    }
    export default {
        name: 'Login',
        components: {
            Select
        },
        data() {
            return {
                loginUrl: '',
                value: '0',
                options: [{
                    value: '0',
                    label: '通过Gitee账号登陆'
                }, {
                    value: '1',
                    label: '通过Github账号登陆'
                }],
                login: {
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    zIndex: -1,
                    height: '',
                    width: '100%',
                    backgroundImage: `url(${require("@/assets/images/background.jpg")})`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "100% auto",
                },
                transparentDiv: {
                    background: 'rgba(0, 0, 0, .5)',
                    height: '',
                },
            }
        },
        methods: {
            ...mapActions(['setLoginTypeAct']),
            setClientHeight() {
                this.login.height = until.getClientHeight() + 'px';
                this.transparentDiv.height = until.getClientHeight() + 'px'
            },
            change(value) {
                console.log(value);
                this.value = value;
            },
            loginIn() {
                console.log(this.value);
                console.log("loginIn");
                this.setLoginTypeAct(this.value)
                switch (this.value) {
                    case '0':
                        console.log("case0");
                        window.location.href = 'https://gitee.com/oauth/authorize?client_id=2632e89d3dfb17ce941d2d2b45efc6f235afb4941ddb67578adda83aa33ab6a2&redirect_uri=http://159.138.58.253:8080/v1/login&response_type=code&scope=user_info%20groups%20emails';
                        // window.location.href='https://gitee.com/oauth/authorize?client_id=e3577b9da49965e89dd27f71041e418c176a5c6b943d0cf7ae6fd5e54f70c770&redirect_uri=http://localhost:8080/checkCLA&response_type=code'
                        // let obj = {
                        //     // code: this.code,
                        //     // grant_type: 'authorization_code',
                        //     client_id: '2632e89d3dfb17ce941d2d2b45efc6f235afb4941ddb67578adda83aa33ab6a2',
                        //     redirect_uri: this.redirect_uri,
                        //     client_secret: this.client_secret
                        // }
                        // this.$axios({
                        //     url: url.linkRepository,
                        //     method: 'post',
                        //     data: obj,
                        // }).then(res => {
                        //     console.log(res);
                        //     if (res.data.code === 200) {
                        //         this.repositoryOptions = res.data.data
                        //     }
                        // }).catch(err => {
                        //     console.log(err);
                        // });
                        break;
                    case '1':
                        console.log("case1");
                        window.location.href = 'https://github.com/login/oauth/authorize?client_id=d86f4915398dad23bffc&redirect_uri=http://localhost:8080/home&scope=user,user:email'  //逗号分隔多个权限

                        break;
                    default:
                        console.log("default");
                }
                // this.$router.push('/home')
            },
        },
        created() {

        },
        mounted() {
            this.setClientHeight();
        }
    }
</script>
<style scoped lang="less">
    #header {
        height: 10%;
        border-bottom: 2px solid white;
        box-sizing: border-box;
        margin: 0 4rem;
        display: flex;
        justify-content: space-between;
        padding: 0 1rem;
        color: white;

        div {
            display: flex;
            flex-direction: column;
            justify-content: center;

            img {
                width: 4rem;
                height: 4rem;
            }
        }


        span {
            display: flex;
            flex-direction: column;
            justify-content: center;
        }
    }

    #section {
        height: 90%;
        color: white;

        div:nth-of-type(2) {
            padding: 2rem 0;
        }
    }

    #title {
        padding-top: 5rem;
        display: flex;
        justify-content: center;
    }

    .loginBt {
        margin-left: 1rem;
    }

    .pointer {
        cursor: pointer;
    }

    .logText {
        width: 18rem;
        height: 18rem;
    }
</style>
