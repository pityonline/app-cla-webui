<template>
    <el-row>
        <el-col class="index" id="transparentDiv" :style="transparentDiv">
            <NewHeader></NewHeader>
            <el-row id="section" :style="sectionStyle">
                <el-col :offset="4" :span="16" style="height: 100%">
                    <el-row style="height: 100%">
                        <el-col style="height: 100%"  :span="10" >
                            <el-row style="height: 100%" >
                                <div class="title">
                                    <div class="name">
                                        <div>
                                            <p>Contributor License Agreement</p>
                                        </div>
                                        <span>Sign</span>
                                    </div>
                                </div>

                            </el-row>

                        </el-col>
                        <el-col :span="10" style="height: 100%;">
                            <el-row class="signType" style="height: 100%">
                                <el-col id="sign" style="height: 100%">
                                    <el-row style="height: 50%">
                                    </el-row>
                                    <el-row style="height: 50%">
                                        <el-col align="right" class="buttonBox">
                                            <div id="btBox">
                                                <div>

                                                    <button class="button" @click="submit('corporation')">
                                                        Sign As Corporation
                                                    </button>
                                                </div>
                                                <div>
                                                    <button class="button" @click="submit('employee')">
                                                        Sign As Employee
                                                    </button>
                                                </div>
                                                <button class="button" @click="submit('individual')">
                                                    Sign As Individual
                                                </button>
                                            </div>
                                        </el-col>
                                    </el-row>
                                </el-col>
                                <ReTryDialog :dialogVisible="reTryDialogVisible" :message="reLoginMsg"
                                             :title="reLoginDialogTitle"></ReTryDialog>
                            </el-row>
                        </el-col>
                    </el-row>
                </el-col>
            </el-row>
            <el-row>
                <el-col :offset="4" :span="16">
                    <el-row class="guideTitle">
                        Signing CLA Guide for...
                    </el-row>
                    <el-row >
                        <el-col :span="8" class="SignTypeCol" :class="{'typeShadow':signType==='corporation'}"
                                @click.native="clickSignTypeGuide('corporation')">
                            <div class="SignTypeBox">
                                <svg-icon icon-class="qiye" class="SignTypeIcon"></svg-icon>
                                <p>Corporation</p>
                            </div>
                        </el-col>
                        <el-col :span="8" class="SignTypeCol" :class="{'typeShadow':signType==='employee'}"
                                @click.native="clickSignTypeGuide('employee')">
                            <div class="SignTypeBox">
                                <svg-icon icon-class="yuangong" class="SignTypeIcon"></svg-icon>
                                <p>Employee</p>
                            </div>
                        </el-col>
                        <el-col :span="8" class="SignTypeCol" :class="{'typeShadow':signType==='individual'}"
                                @click.native="clickSignTypeGuide('individual')">
                            <div class="SignTypeBox">
                                <svg-icon icon-class="geren" class="SignTypeIcon"></svg-icon>
                                <p>Individual</p>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row v-if="signType==='corporation'" class="guideBox">
                       corporation guide
                    </el-row>
                    <el-row v-if="signType==='employee'" class="guideBox">
                        employee guide
                    </el-row>
                    <el-row v-if="signType==='individual'" class="guideBox">
                        individual guide
                    </el-row>
                </el-col>
            </el-row>
            <NewFooter></NewFooter>
        </el-col>
    </el-row>
</template>
<script>
    import NewHeader from '@components/NewHeader'
    import NewFooter from '@components/NewFooter'
    import * as until from '../until/until'
    import * as url from '../until/api'
    import http from '../until/http'
    import Select from '@components/Select'
    import {mapActions} from 'vuex'
    import ReTryDialog from '../components/ReTryDialog'

    window.onresize = () => {
        if (until.getClientHeight() > document.getElementById('transparentDiv').offsetHeight) {
            document.getElementById("transparentDiv").style.height = until.getClientHeight() + 'px';
        }
    }
    export default {
        name: 'Login',
        components: {
            Select,
            NewHeader,
            NewFooter,
            ReTryDialog,
        },
        watch: {

        },
        computed:{
            reTryDialogVisible() {
                return this.$store.state.reTryDialogVisible
            },
            reLoginMsg() {
                return this.$store.state.dialogMessage
            },
        },
        data() {
            return {
                reLoginDialogTitle:'',
                platform: '',
                org: '',
                repo: '',
                domain: this.$store.state.domain,
                signType: 'corporation',
                transparentDiv: {
                    height: '',
                },
                sectionStyle: {
                    height: '',
                },
            }
        },
        provide() {
            return {
                setClientHeight: this.setClientHeight
            }
        },
        methods: {
            ...mapActions(['setPlatformAct','setLoginTypeAct', 'setRepoInfoAct', 'errorAct']),
            getRepoInfo() {
                let params = window.location.href.split('/sign/')[1]
                let repoInfoParams = ''
                if (params.indexOf('/') !== -1) {
                    repoInfoParams = params.substring(0, params.indexOf('/'));
                    let orgAddress = params.substring(params.indexOf('/') + 1);
                    sessionStorage.setItem('orgAddress', orgAddress)
                } else {
                    sessionStorage.removeItem('orgAddress')
                    repoInfoParams = params
                }
                let arg = until.base64ToStr(repoInfoParams)
                if (arg) {
                    let args = arg.split('/');
                    if (args.length < 2) {
                        this.$router.push({name: 'ErrorPath'})
                    } else {
                        this.platform = args[0];
                        this.org = args[1];
                        if (args[2]) {
                            this.repo = args[2]
                        } else {
                            this.repo = ''
                        }
                        this.setRepoInfoAct({platform: this.platform, org_id: this.org, repo_id: this.repo});
                    }
                } else {
                    this.$router.push({name: 'ErrorPath'})
                }
            },
            submit(loginType) {
                this.setLoginTypeAct(loginType)
                if (this.platform === 'gitee') {
                    if (loginType === 'individual' || loginType === 'employee') {
                        http({
                            url: `${url.getAuthCodeUrl}/${this.platform}/sign`,
                        }).then(res => {
                            window.location.href = res.data.data.url
                        }).catch(err => {
                            this.errorAct(err)
                        })
                    } else {
                        this.$router.push('/sign-cla')
                    }
                } else if (this.platform === 'github') {
                    if (this.$store.state.loginType === 'individual' || this.$store.state.loginType === 'employee') {
                    } else {
                        this.$router.push('/signCla')
                    }
                }
            },
            setCookie() {
                let date = new Date();
                date.setTime(date.getTime() - 10000);
                document.cookie = `_mark=; expire=${date.toUTCString()}; Domain=${this.domain}; path=/`;
            },
            clickSignTypeGuide(type) {
                console.log(type);
                this.signType = type;
            },
            setClientHeight() {
                this.$nextTick(() => {
                    if (until.getClientHeight() > document.getElementById('transparentDiv').offsetHeight) {
                        this.transparentDiv.height = until.getClientHeight() + 'px'
                    }
                })
            },
        },
        created(){
            this.setCookie();
            this.getRepoInfo();
        },
        mounted() {
            until.setMinHeight('sign', 'btBox')
            this.setClientHeight();
        }
    }
</script>
<style scoped lang="less">
    @import "../assets/font/css/Roboto-Bold.css";
    @import "../assets/font/css/Roboto-Black.css";
    @import "../assets/font/css/Roboto-Light.css";
    @import "../assets/font/css/Roboto-Regular.css";
    .index {
        display: flex;
        flex-direction: column;

        & > #section {
            flex-grow: 1;
            background-image: url("../assets/images/backgroundx2.png");
            background-repeat: no-repeat;
            background-position: 40rem center;
            background-size: 55rem;

        }


        .signType {
            font-family: Roboto-Bold, sans-serif;

            & > div {
                display: flex;
                flex-direction: column;
                justify-content: space-between;
            }
        }

        .buttonBox {
            height: 100%;
            display: flex;
            flex-direction: column;
        }

        .button {
            width: 15rem;
            height: 4rem;
            border-radius: 2rem;
            border: none;
            color: white;
            font-size: 1.5rem;
            cursor: pointer;
            background: linear-gradient(to right, #97DB30, #319E55);
            margin: 1.2rem 0;
        }

        .button:focus {
            outline: none;
        }

        .disabledButton {
            width: 15rem;
            height: 4rem;
            border-radius: 2rem;
            border: none;
            color: white;
            font-size: 1.5rem;
            cursor: pointer;
            /*background: linear-gradient(to right, #97DB30, #319E55);*/
            background-color: lightgrey;
            margin: 1.2rem 0;
        }

        .disabledButton:focus {
            outline: none;
        }
        .guideBox{
            box-shadow:0 10px 20px 10px #F3F3F3;
            margin-bottom: 5rem;
            padding-top:4rem;
            padding-bottom: 10rem;
        }
        .typeShadow {
            box-shadow: 0 -10px 20px 10px #F3F3F3;
        }
        .SignTypeCol {
            cursor: pointer;
            height: 16rem;
            font-size: 1.5rem;
            font-family: Roboto-Bold,sans-serif;
            display: flex;
            justify-content: center;
            flex-direction: column;
        }
        .SignTypeIcon {
            width: 5rem;
            height: 5rem;
            margin: 1rem;
        }
        .SignTypeBox{

        }
        .guideTitle{
            font-size:2.5rem ;
            margin: 5rem 0;
        }
    }
    .title {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        text-align: left
    }

    .name {
        font-family: Roboto-Regular, sans-serif;
        font-size: 3rem;
    }

    .description {
        font-family: Roboto-Regular, sans-serif;
        font-size: 1.5rem;
    }


</style>
