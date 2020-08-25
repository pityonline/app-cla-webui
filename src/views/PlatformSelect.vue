<template>
    <div >
        <el-row>
            <el-col :span="8" :offset="8" style="padding:3rem ">
                <el-row :gutter="20">
                    <el-col >
                        <svg-icon icon-class="giteelogin" class="loginIcon" @click="login('gitee')"></svg-icon>
                        <svg-icon icon-class="githublogin"  class="loginIcon" @click="login('github')"></svg-icon>
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

    export default {
        name: "PlatformSelect",
        data(){
            return {
                platform: '',
            };
        },
        methods:{
            ...mapActions(['setPlatformAct']),

            submit(){
                console.log('submit');
            },
            login(platform){
                this.setPlatformAct(platform)
                console.log(platform);
                if (platform === 'gitee') {
                    window.location.href = 'https://gitee.com/oauth/authorize?client_id=2632e89d3dfb17ce941d2d2b45efc6f235afb4941ddb67578adda83aa33ab6a2&redirect_uri=http://139.159.224.207:60031/api/v1/login?platform=gitee&response_type=code&scope=user_info%20groups%20emails';
                }else{
                    window.location.href = 'https://github.com/login/oauth/authorize?client_id=d86f4915398dad23bffc&redirect_uri=http://localhost:8080/home&scope=user,user:email'  //逗号分隔多个权限
                }
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