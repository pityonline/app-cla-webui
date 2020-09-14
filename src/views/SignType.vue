<template>
    <el-row>
        <el-col :span="4" :offset="10" style="padding:3rem">
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
            ...mapActions(['setTokenAct', 'setLoginTypeAct', 'setRepoInfoAct']),
            getRepoInfo() {
                console.log(window.location.href);
                let args = window.location.href.split('/signType/')[1].split('/')
                this.platform = args[0]
                this.org = args[1]
                if (args[2]) {
                    this.repo = args[2]
                }else {
                    this.repo=''
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
                        this.$router.push('/signCla')
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

<style scoped>

</style>