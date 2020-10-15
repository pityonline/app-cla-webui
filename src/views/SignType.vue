<template>
    <el-row class="signType" style="height: 100%">
        <el-col id="sign" style="height: 100%">
            <el-row style="height: 50%">
            </el-row>
            <el-row style="height: 50%">
                <el-col align="right" class="buttonBox">
                    <div id="btBox">
                        <div>
                            <button class="button" @click="submit('individual')">
                                Individual
                            </button>
                        </div>
                        <div>
                            <button class="button" @click="submit('corporation')">
                                Corporation
                            </button>
                        </div>
                        <button class="button" @click="submit('employee')">
                            Employee
                        </button>
                    </div>
                </el-col>
            </el-row>
        </el-col>
        <ReTryDialog :dialogVisible="reTryDialogVisible" :message="reLoginMsg"
                     :title="reLoginDialogTitle"></ReTryDialog>
    </el-row>
</template>
<script>
    import * as url from '../until/api'
    import {mapActions} from 'vuex'
    import * as until from '../until/until'
    import http from '../until/http'
    import ReTryDialog from '../components/ReTryDialog'

    export default {
        name: "SignType",
        components: {
            ReTryDialog,
        },
        computed: {
            reTryDialogVisible() {
                return this.$store.state.reTryDialogVisible
            },
            reLoginMsg() {
                return this.$store.state.dialogMessage
            },
            reLoginDialogTitle() {
                return this.$store.state.repoInfo.repo_id ? `"${this.$store.state.repoInfo.org_id}/${this.$store.state.repoInfo.repo_id}" prompt you` :
                    `"${this.$store.state.repoInfo.org_id}" prompt you`
            },
        },
        data() {
            return {
                platform: '',
                org: '',
                repo: '',
                domain: this.$store.state.domain,
            }
        },
        methods: {
            ...mapActions(['setTokenAct', 'setLoginTypeAct', 'setRepoInfoAct', 'errorAct']),
            getRepoInfo() {
                let params = window.location.href.split('/sign/')[1]
               let args = decodeURIComponent(atob(params)).split('/');
                console.log(args);
                this.platform = args[0]
                this.org = args[1]
                if (args[2]) {
                    this.repo = args[2]
                } else {
                    this.repo = ''
                }
                this.setRepoInfoAct({platform: this.platform, org_id: this.org, repo_id: this.repo});
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
                        // window.location.href = 'https://github.com/login/oauth/authorize?client_id=d86f4915398dad23bffc&redirect_uri=http://localhost:8080/home&scope=user,user:email'  //逗号分隔多个权限
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
        },

        created() {
            this.setCookie();
            this.getRepoInfo();
        },
        mounted() {
            until.setMinHeight('sign', 'btBox')
        }
    }
</script>
<style scoped lang="less">
    @import "../assets/font/css/Roboto-Bold.css";

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
</style>