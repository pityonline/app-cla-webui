<template>
    <el-row>
        <el-col class="index" id="transparentDiv" :style="transparentDiv">
            <NewHeader></NewHeader>
            <el-row id="section">
                <el-col :offset="3" :span="18" style="height: 100%">
                    <el-row style="height: 100%">
                        <el-col :span="12" class="title">
                            <div>
                                <div class="name">
                                    <div>
                                        <span>CLA</span>
                                    </div>
                                    <span>SYSTEM</span>
                                </div>
                                <p class="description">Easily handle Contributor License Agreements (CLAs)</p>
                            </div>

                        </el-col>
                        <el-col :span="12" style="height: 100%;">
                            <router-view></router-view>
                        </el-col>
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
    import * as url from '../until/api'
    import * as until from '../until/until'
    import Select from '@components/Select'
    import {mapActions} from 'vuex'


    window.onresize = () => {
        console.log(until.getClientHeight());
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

                transparentDiv: {
                    height: '',
                },
            }
        },
        methods: {
            ...mapActions(['setPlatformAct']),
            setClientHeight() {
                this.$nextTick(() => {
                    console.log(until.getClientHeight(), document.getElementById('transparentDiv').offsetHeight);
                    if (until.getClientHeight() > document.getElementById('transparentDiv').offsetHeight) {
                        this.transparentDiv.height = until.getClientHeight() + 'px'
                    }
                })
            },
        },
        created() {

        },
        mounted() {
            this.setClientHeight();
        }
    }
</script>
<style scoped lang="less">
    .title {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        text-align: left
    }

    .name {
        font-size: 6rem;
        font-weight: bold;
    }

    .description {
        font-size: 1.5rem;
    }

    .index {
        display: flex;
        flex-direction: column;
        background-image: url("../assets/images/backgroundx1.png");
        background-repeat: no-repeat;
        /*background-position: 40rem 15rem;*/
        background-position: 40rem center;
        background-size: 60rem;

        & > #section {
            flex-grow: 1;
        }
    }


</style>
