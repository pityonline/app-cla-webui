<template>
    <el-row>
        <el-col class="index" id="transparentDiv" :style="transparentDiv">
            <NewHeader></NewHeader>
            <el-row id="section" :style="sectionStyle">
                <el-col :offset="4" :span="16" style="height: 100%">
                    <el-row style="height: 100%">
                        <el-col :span="14" class="title">
                            <div>
                                <div class="name">
                                    <div>
                                        <p>Contributor License Agreement</p>
                                    </div>
                                    <span>Sign</span>
                                </div>
                                <!--<p class="description">Easily handle Contributor License Agreements (CLAs)</p>-->
                            </div>
                        </el-col>
                        <el-col :span="10" style="height: 100%;">
                            <router-view></router-view>
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
    import Select from '@components/Select'
    import {mapActions} from 'vuex'

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
            NewFooter
        },
        data() {
            return {
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
            ...mapActions(['setPlatformAct']),
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
        mounted() {
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
