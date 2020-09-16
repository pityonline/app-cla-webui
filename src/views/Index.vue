<template>
    <el-row>
        <el-col class="index" id="transparentDiv" :style="transparentDiv">
            <NewHeader></NewHeader>
            <div id="section">
                <!--<div id="title">-->
                    <!--<svg-icon class="logText" icon-class="CLA_SYSTEM_WHITE"></svg-icon>-->

                <!--</div>-->
                <!--<div>Easily handle Contributor License Agreements (CLAs)</div>-->
                <router-view></router-view>

            </div>
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
                    if (until.getClientHeight() > document.getElementById('transparentDiv').offsetHeight)  {
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
    .index {
        display: flex;
        flex-direction: column;
        background-image: url("../assets/images/backgroundx1.png");
        background-repeat: no-repeat;
        background-position: 40rem 15rem;
        &>#section {
            flex-grow: 1;
        }
    }



</style>
