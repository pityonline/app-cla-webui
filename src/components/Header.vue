<template>
    <div class="header">
        <el-col :span="8">
            <div style="display: flex;">
                <img class="pointer" style="width: 2rem" :src="this.$store.state.user.userImg" alt="" @click="newWindow()">
                <div style="display: flex;flex-direction: column;justify-content: center;margin-left: .5rem">
                    <span>Hi, <span class="pointer" style="font-weight: bold">{{this.$store.state.user.userName}}!</span></span>
                </div>
            </div>
        </el-col>
        <el-col :span="8">
            <div>

                <svg-icon class="pointer" @click="toHome()" id="svg_logo" icon-class="logo_b"/>
            </div>
        </el-col>
        <el-col :span="8">
            <div>

                <el-tooltip  effect="dark" content="Sign out" placement="left">
                    <svg-icon class="pointer" @click="loginOut()" id="svg_loginOut" icon-class="loginOut"/>
                </el-tooltip>
            </div>
        </el-col>


    </div>
</template>

<script>
    export default {
        name: "Header",
        computed:{

        },
        data(){
            return {

            }
        },
        created(){

        },
        methods:{
            toHome(){
                this.$router.push('/home')
            },
            loginOut(){
                this.$router.push('/')
            },
            newWindow(){
                // window.open('https://github.com/ouchengle/Test','_black')
                window.open('https://github.com/ouchengle')
            },
        },
    }
</script>

<style scoped lang="less">
    .pointer{
        cursor: pointer;
    }
    .header {
        position: fixed;
        top: 0;
        left: 0;
        background-color: white;
        height: 4rem;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        z-index: 1;
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