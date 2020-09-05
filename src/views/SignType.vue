<template>
    <el-row>
        <el-col :span="4" :offset="10">
            <el-button type="primary" size="medium" style="width: 100%;margin: 1rem 0;" @click="submit('individual')">
                Individual
            </el-button>
            <el-button type="primary" size="medium" style="width: 100%;margin: 1rem 0" @click="submit('corporation')">
                Corporation
            </el-button>
            <el-button type="primary" size="medium" style="width: 100%;margin: 1rem 0" @click="submit('employee')">
                Employee
            </el-button>
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
            ...mapActions(['setTokenAct', 'setRepoInfoAct']),
            getRepoInfo(){
                console.log(window.location.href);


                this.setRepoInfoAct({platform: this.platform, org_id: this.org, repo_id: this.repo});

            },
            toSignCla() {
                if (this.platform === 'gitee') {
                    console.log('gitee');

                    if (this.$store.state.loginType === 'individual' || this.$store.state.loginType === 'employee') {
                        console.log('individual');

                        // window.location.href = 'https://gitee.com/oauth/authorize?client_id=2632e89d3dfb17ce941d2d2b45efc6f235afb4941ddb67578adda83aa33ab6a2&redirect_uri=http://139.159.224.207:60031/api/v1/login?platform=gitee&response_type=code';
                        //     this.$router.push('/signCla')
                        this.$axios({
                            url: `/api${url.getAuthCodeUrl}/${this.platform}/sign`,
                        }).then(res => {
                            console.log(res);
                            window.location.href = res.data.url

                        }).catch(err => {
                            console.log(err);
                        })

                    } else if (this.$store.state.loginType === 'corporation') {
                        this.$router.push('/signCla')
                    } else {
                        this.$router.push('/corporationManagerLogin')
                    }
                } else if (this.platform === 'github') {
                    console.log('github');

                    if (this.$store.state.loginType === 'individual' || this.$store.state.loginType === 'employee') {
                        window.location.href = 'https://github.com/login/oauth/authorize?client_id=d86f4915398dad23bffc&redirect_uri=http://localhost:8080/home&scope=user,user:email'  //逗号分隔多个权限
                    } else {
                        this.$router.push('/signCla')
                    }
                }

            },
            submit(loginType) {
                console.log(loginType);
                this.setLoginTypeAct(loginType)
                if (loginType === 'orgManager') {
                    this.$router.push('/platformSelect')
                } else if (loginType === 'corporationManager') {
                    this.$router.push('/corporationManagerLogin')
                }
            },
        },
        created() {
            this.getRepoInfo();
        }
    }
</script>

<style scoped>

</style>