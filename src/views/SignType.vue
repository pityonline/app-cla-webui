<template>
    <el-row class="signType" style="height: 100%">
        <el-col style="height: 100%">
            <el-row style="height: 50%">

            </el-row>
            <el-row style="height: 50%">
                <el-col  align="right" class="buttonBox">
                    <div>
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

    </el-row>
</template>

<script>
    import * as url from '../until/api'
    import {mapActions} from 'vuex'

    export default {
        name: "SignType",
        data() {
            return {
                platform: '',
                org: '',
                repo: '',
            }
        },
        methods: {
            ...mapActions(['setTokenAct', 'setLoginTypeAct', 'setRepoInfoAct']),
            getRepoInfo() {
                console.log(window.location.href);
                let args = window.location.href.split('/sign/')[1].split('/')
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
                    console.log('gitee');

                    if (loginType === 'individual' || loginType === 'employee') {
                        console.log('individual');
                        this.$axios({
                            url: `/api${url.getAuthCodeUrl}/${this.platform}/sign`,
                        }).then(res => {
                            console.log(res);
                            window.location.href = res.data.url

                        }).catch(err => {
                            console.log(err);
                        })

                    } else {
                        this.$router.push('/sign-cla')
                    }
                } else if (this.platform === 'github') {
                    console.log('github');

                    if (this.$store.state.loginType === 'individual' || this.$store.state.loginType === 'employee') {
                        window.location.href = 'https://github.com/login/oauth/authorize?client_id=d86f4915398dad23bffc&redirect_uri=http://localhost:8080/home&scope=user,user:email'  //逗号分隔多个权限
                    } else {
                        this.$router.push('/signCla')
                    }
                }

            }
            ,

        },
        created() {
            this.getRepoInfo();
        }
    }
</script>

<style scoped lang="less">
    @import "../assets/font/css/Roboto-Bold.css";

    .signType{
        font-family: Roboto-Bold,sans-serif;
    }
    .buttonBox {
        height: 100%;
        display: flex;
        flex-direction: column;
        /*justify-content: center;*/
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
</style>