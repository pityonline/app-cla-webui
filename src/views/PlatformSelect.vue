<template>
    <div>
        <el-row>
            <el-col :span="8" :offset="8" style="padding:3rem ">
                <el-row :gutter="20">
                    <el-col>
                        <svg-icon icon-class="giteelogin" class="loginIcon" @click="login('gitee')"></svg-icon>
                        <svg-icon icon-class="githublogin" class="loginIcon" @click="login('github')"></svg-icon>
                    </el-col>


                </el-row>
                <el-row :gutter="20" style="margin: 3rem 0">
                    Select the platform you want to authorize to log in
                </el-row>
            </el-col>
        </el-row>


    </div>
</template>

<script>
    import {mapActions} from 'vuex'
    import * as url from '../until/api'

    export default {
        name: "PlatformSelect",
        data() {
            return {
                platform: '',
            };
        },
        methods: {
            ...mapActions(['setPlatformAct']),

            submit() {
                console.log('submit');
            },

            login(platform) {
                console.log(platform);
                this.setPlatformAct(platform)
                let interval = setInterval(() => {
                    if (this.$store.state.platform) {
                        this.$axios({
                            url: `/api${url.getAuthCodeUrl}/${platform}/login`,
                        }).then(res=>{
                            console.log(res);
                                window.location.href =res.data.url
                        }).catch(err=>{
                            console.log(err);
                        })

                      clearInterval(interval)
                    }
                }, 100)

            },
        }
    }
</script>

<style scoped lang="less">
    .loginIcon {
        cursor: pointer;
        width: 2rem;
        height: 2rem;
        margin: 0 1rem;
    }
</style>