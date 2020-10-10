<template>
    <div class="corpHeader">
        <el-col class="header" :offset="4" :span="16">
            <div class="box">
                <svg-icon @click="toHome()" icon-class="icon" class="icon"></svg-icon>
            </div>
            <div>
                <div>
                    <div class="menuBox">
                        <div class="userImgBox">
                            <svg-icon class="userImg" @click.native="openMenu()" icon-class="yonghu"></svg-icon>
                        </div>
                        <div id="menuOption" :class="menuVisible">
                            <div>
                                user
                            </div>
                            <div>
                                employee
                            </div>
                            <div>
                                create user
                            </div>
                            <div>
                                reset password
                            </div>
                            <div>
                                my cla
                            </div>
                            <div>
                                login out
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div class="my_select_box">
                        <el-row class="my_select" @click.native="clickSelect()">
                            <el-col :span="20" class="select_content">
                                {{language}}
                            </el-col>
                            <el-col :span="4" class="select_content">
                                <svg-icon icon-class="arrow"></svg-icon>
                            </el-col>
                        </el-row>
                        <div id="my_option" :class="visible">
                            <div
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                <div style="width: 100%">
                                    <div>
                                        <div class="mark">
                                        </div>
                                    </div>

                                    <div>
                                        {{item.label}}
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div>
                        <el-dropdown @command="handleCommand">
                         <span class="el-dropdown-link">
    {{userName}}<i class="el-icon-arrow-down el-icon--right"></i>
  </span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item v-if="userInfo[orgValue].role==='admin'" command="a">user
                                </el-dropdown-item>
                                <el-dropdown-item v-else command="b">employee</el-dropdown-item>
                                <el-dropdown-item v-if="userInfo[orgValue].role==='admin'" command="c">create user
                                </el-dropdown-item>
                                <el-dropdown-item command="d">reset password</el-dropdown-item>
                                <el-dropdown-item v-if="userInfo[orgValue].role==='admin'" command="e">my cla
                                </el-dropdown-item>
                                <el-dropdown-item command="f">login out</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </div>
                </div>

            </div>
        </el-col>
    </div>
</template>

<script>
    export default {
        name: "CorporationHeader",
        // computed: {user:{get:()=>{return this.userName}}},
        props: ['user'],
        computed: {

            userInfo() {
                console.log(this.user.userInfo);
                return this.user.userInfo
            },
            orgValue() {
                console.log(this.user.orgValue);
                return this.user.orgValue
            },
        },

        data() {
            return {
                userName: this.user.userName,
                language: 'English',
                value: 0,
                options: [{value: 0, label: 'English'}, {value: 1, label: '中文'}, {value: 2, label: '日语'}],
                visible: {
                    visibility: 'hidden',
                },
                menuVisible:{
                    visibility:'hidden'
                },

            }
        },
        created() {
            console.log(this.user);
        },
        methods: {
            openMenu(){
                console.log('openMenu');
                this.menuVisible.visibility='visible'
            },
            clickSelect() {
                console.log('clickSelect');
                document.getElementById('my_option').style.visibility = 'hidden'
            },
            handleCommand(command) {
                this.$emit('clickItem', command);
            },
            toHome() {
                this.$router.push('/home')
            },
            loginOut() {

                this.$router.push('/')

            },
            newWindow() {
                // window.open('https://github.com/ouchengle/Test','_black')
                // window.open('https://github.com/ouchengle')
            },
        },
    }
</script>

<style lang="less">
    .corpHeader {
        /*position: fixed;*/
        /*top: 0;*/
        /*left: 0;*/
        border-bottom: 2px solid #F2F2F2;
        height: 4.5rem;
        width: 100%;
        /*z-index: 10;*/
        .menuBox{
            position: relative;
            width: 8rem;
            height: 2.6rem;
        }
        .userImgBox{
            height: 2.6rem;
            width: 2.6rem;
            border-radius: 1.3rem;
            position: absolute;
            right: 0;
            top: 0;
            z-index: 2;
        }
        #menuOption{
            border: 1px solid black;
            border-radius: 1.3rem;
            position: absolute;
            right: 0;
            top: 0;
            z-index: 1;
            &>div{
                height: 2.6rem;
                width: 100%;
                background-color: white;
                line-height: 2.6rem;
                margin: 0 .5rem;

            }
            &>div:not(:last-of-type){
                border-bottom: 1px solid black;
            }
        }
       & .uerImg{
            height: 2.6rem;
            width: 2.6rem;
        }
        & .mark {
            visibility: hidden;
            height: 6px;
            width: 6px;
            border-radius: 50%;
            background-color: #2E9C55;
        }

        & .my_box {
            height: 2.6rem;
            position: relative;

        }

        & .my_box > div {
            position: absolute;
            top: 0;
            left: 0;
            border: 1px solid black;
            border-radius: 1.3rem;
            width: 8rem;

        }

        & .my_select_box {
            /*font-size: 1.2rem;*/
            height: 2.6rem;
            width: 8rem;
            position: relative;

        }

        & .my_select {
            position: absolute;
            top: 0;
            left: 0;
            box-sizing: border-box;
            width: 8rem;
            height: 2.6rem;
            border: 1px solid black;
            border-radius: 1.3rem;
            padding: 0 1rem;
            z-index: 2;
            cursor: pointer;
        }

        & .select_content {
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
        }

        & #my_option {
            z-index: 2;
            position: absolute;
            background-color: white;
            top: 0;
            left: 0;
            padding-top: 2.6rem;
            box-sizing: border-box;
            width: 8rem;
            border: 1px solid black;
            border-radius: 1.3rem;
            cursor: pointer;

        }

        & #my_option > div {
            cursor: pointer;
            background-color: white;
            border-radius: 1.3rem;
            height: 2.6rem;
            padding: 0 1rem;
            display: flex;
            justify-content: center;
        }

        & #my_option > div > div {
            cursor: pointer;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
        }

        & #my_option > div > div > div {
            display: flex;
            flex-direction: column;
            justify-content: center;
            cursor: pointer;
        }

        & #my_option > div > div > div:last-child {
            flex-grow: 1;
        }

        & #my_option > div:not(:last-child) > div {
            border-bottom: 1px solid black;
        }


        & .ul_box > div {
            box-sizing: border-box;
            /*padding: 2.6rem 0 0 0;*/
            /*overflow: hidden;*/
            width: 8rem;
            height: 2.6rem;
            border: 1px solid black;
            border-radius: 1.3rem;
        }

        & .icon {
            width: 3.5rem;
            height: 3.5rem;
        }

        & .header {
            height: 100%;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
        }

        & .header > div:nth-of-type(1) {
            display: flex;
            flex-direction: column;
            justify-content: center;
        }

        & .header > div:nth-of-type(2) {
            height: 100%;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
        }

        & .header > div:nth-of-type(2) > div {
            margin-left: 1rem;
            display: flex;
            flex-direction: column;
            justify-content: center;
        }

    }

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

    /*.header {*/
    /*position: fixed;*/
    /*top: 0;*/
    /*left: 0;*/
    /*background-color: #ececec;*/
    /*height: 4rem;*/
    /*display: flex;*/
    /*flex-direction: row;*/
    /*justify-content: space-between;*/
    /*z-index: 10;*/
    /*width: 100%;*/

    /*& > div:nth-of-type(1) {*/
    /*display: flex;*/
    /*flex-direction: column;*/
    /*justify-content: center;*/
    /*text-align: left;*/
    /*padding-left: 3rem;*/
    /*}*/

    /*& > div:nth-of-type(2) {*/
    /*display: flex;*/
    /*justify-content: center;*/

    /*& > div {*/
    /*display: flex;*/
    /*flex-direction: column;*/
    /*justify-content: center;*/

    /*#svg_logo {*/
    /*height: 4rem;*/
    /*width: 4rem;*/
    /*}*/
    /*}*/

    /*}*/

    /*& > div:nth-of-type(3) {*/
    /*display: flex;*/
    /*flex-direction: column;*/
    /*justify-content: center;*/
    /*text-align: right;*/
    /*padding-right: 3rem;*/
    /*}*/
    /*}*/
</style>