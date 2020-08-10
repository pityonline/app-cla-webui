<template>
    <div>
        <div id="login" :style="loginStyle"></div>
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
                <el-row>
                    <el-col :offset="9" :span="6">
                        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px"
                                 class="demo-ruleForm" style="padding: 2rem">
                            <el-form-item label="account" prop="account">
                                <el-input v-model="ruleForm.userName" autocomplete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="password" prop="pass">
                                <el-input type="password" v-model="ruleForm.pwd" autocomplete="off"></el-input>
                            </el-form-item>
                            <el-form-item label-width="0">
                                <el-button type="primary" @click="submitForm('ruleForm')">SUBMIT</el-button>
                                <el-button @click="resetForm('ruleForm')">RESET</el-button>
                            </el-form-item>
                        </el-form>
                    </el-col>
                </el-row>
                <p>通过其他方式登陆</p>
                <div class="loginIconDiv">
                    <svg-icon class="loginIcon" icon-class="giteelogin"></svg-icon>
                    <svg-icon class="loginIcon" icon-class="githublogin"></svg-icon>
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
        if (until.getClientHeight() > document.getElementById('transparentDiv').offsetHeight) {
            document.getElementById("login").style.height = until.getClientHeight() + 'px';
            document.getElementById("transparentDiv").style.height = until.getClientHeight() + 'px';
        }
    }
    export default {
        name: 'Login',
        components: {
            Select
        },
        data() {
            var validateAccount = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('please input account number'));
                }
                callback();
            };
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('please input password'));
                }
                callback();
            };
            return {
                rules: {
                    userName: [
                        {validator: validateAccount, trigger: 'blur'}
                    ],
                    pwd: [
                        {validator: validatePass, trigger: 'blur'}
                    ],
                },
                ruleForm: {
                    userName: '',
                    pwd: '',
                },
                platform: '',
                loginUrl: '',
                value: '0',
                options: [{
                    value: '0',
                    label: '通过Gitee账号登陆'
                }, {
                    value: '1',
                    label: '通过Github账号登陆'
                }],
                loginStyle: {
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
            ...mapActions(['setPlatformAct']),
            login(userName, pwd) {
                this.$router.push('/rootManager')
                let obj = {userName: userName, pwd: pwd};
                this.$axios({
                    url: '/api' + url.relogin,
                    method: 'post',
                    data: obj,
                }).then(res => {
                    console.log(res);
                    if (res.data.role === 'root') {
                        this.$router.push('/rootManager')
                    } else {
                        this.$router.push('/signedRepo')
                    }
                }).catch(err => {
                    console.log(err);
                })
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.login(this.ruleForm.userName, this.ruleForm.pwd)
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                console.log('reset');
                this.$refs[formName].resetFields();
            },
            setClientHeight() {
                this.$nextTick(() => {
                    console.log(until.getClientHeight(), document.getElementById('transparentDiv').offsetHeight);
                    until.getClientHeight() > document.getElementById('transparentDiv').offsetHeight ?
                        (this.loginStyle.height = until.getClientHeight() + 'px')&&
                        (this.transparentDiv.height=until.getClientHeight() + 'px'):
                        this.loginStyle.height = document.getElementById('transparentDiv').offsetHeight+'px'

                })
            },
            change(value) {
                console.log(value);
                this.value = value;
            },
            loginIn() {
                console.log(this.value);
                console.log("loginIn");
                switch (this.value) {
                    case '0':
                        this.platform = 'gitee';
                        break;
                    case '1':
                        this.platform = 'github';
                        break;
                }
                this.setPlatformAct(this.platform)
                switch (this.value) {
                    case '0':
                        console.log("case0");
                        window.location.href = 'https://gitee.com/oauth/authorize?client_id=2632e89d3dfb17ce941d2d2b45efc6f235afb4941ddb67578adda83aa33ab6a2&redirect_uri=http://139.159.224.207:60031/api/v1/login?platform=gitee&response_type=code&scope=user_info%20groups%20emails';

                        break;
                    case '1':
                        console.log("case1");
                        window.location.href = 'https://github.com/login/oauth/authorize?client_id=d86f4915398dad23bffc&redirect_uri=http://localhost:8080/home&scope=user,user:email'  //逗号分隔多个权限

                        break;
                    default:
                        console.log("default");
                }

            },
        },
        created() {

        },
        mounted() {
            this.setClientHeight();
        }
    }
</script>
<style  lang="less">

    .loginIcon {
        width: 2rem;
        height: 2rem;
        margin: 0 1rem;
    }
    #header {
        height: 10%;
        min-height: 4rem;
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
        .el-form-item__label{
            color:white;
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
