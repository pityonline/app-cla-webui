<template>
    <div class="header">
        <el-col :span="8">
            <div style="display: flex;">
                <!--<img class="pointer" style="width: 2rem" :src="this.$store.state.user.userImg" alt="" @click="newWindow()">-->
                <!--<div style="display: flex;flex-direction: column;justify-content: center;margin-left: .5rem">-->
                <!--<span>Hi, <span class="pointer" style="font-weight: bold">{{this.$store.state.user.userName}}!</span></span>-->
                <!--</div>-->
            </div>
        </el-col>
        <el-col :span="8">
            <div>

                <svg-icon class="pointer" @click="toHome()" id="svg_logo" icon-class="logo_b"/>
            </div>
        </el-col>
        <el-col :span="8">
            <div>

                <el-dropdown @command="handleCommand">
  <span class="el-dropdown-link">
    {{userInfo.userName}}<i class="el-icon-arrow-down el-icon--right"></i>
  </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item v-if="userInfo.role==='admin'" command="a">user manager</el-dropdown-item>
                        <el-dropdown-item v-else command="a">employee manager</el-dropdown-item>
                        <el-dropdown-item v-if="userInfo.role==='admin'" command="b">create user</el-dropdown-item>
                        <el-dropdown-item command="c">reset password</el-dropdown-item>
                        <el-dropdown-item command="d">login out</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </el-col>


    </div>
</template>

<script>
    export default {
        name: "CorporationHeader",
        // computed: {user:{get:()=>{return this.userName}}},
        props:['userInfo'],

        data() {
            return {}
        },
        created() {

        },
        methods: {
            handleCommand(command) {
                this.$emit('clickItem' ,command);
            },
            toHome() {
                this.$router.push('/home')
            },
            loginOut() {
                /*清空缓存，服务器改变登录状态。成功则跳转到登录页面*/
                this.$router.push('/')

            },
            newWindow() {
                // window.open('https://github.com/ouchengle/Test','_black')
                window.open('https://github.com/ouchengle')
            },
        },
    }
</script>

<style  lang="less">
    .el-dropdown-link {
        cursor: pointer;
        color: rgba(54, 54, 54, 0.91);
    }
    .el-icon-arrow-down {
        font-size: 12px;
    }
    .pointer {
        cursor: pointer;
    }

    .header {
        position: fixed;
        top: 0;
        left: 0;
        background-color: #ececec;
        height: 4rem;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        z-index: 10;
        width: 100%;

        & > div:nth-of-type(1) {
            display: flex;
            flex-direction: column;
            justify-content: center;
            text-align: left;
            padding-left: 3rem;
        }

        & > div:nth-of-type(2) {
            display: flex;
            justify-content: center;

            & > div {
                display: flex;
                flex-direction: column;
                justify-content: center;

                #svg_logo {
                    height: 4rem;
                    width: 4rem;
                }
            }

        }

        & > div:nth-of-type(3) {
            display: flex;
            flex-direction: column;
            justify-content: center;
            text-align: right;
            padding-right: 3rem;
        }
    }
</style>