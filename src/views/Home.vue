<template>
    <div id="home" :style="home">
        <Header></Header>
        <el-col :offset="5" :span="14" id="section">
            <router-view></router-view>
        </el-col>
        <Footer></Footer>
    </div>
</template>
<script>
    import * as until from '../until/until'
    import Header from '@components/NewHeader'
    import Footer from '@components/NewFooter'
    import {mapActions} from 'vuex'

    window.onresize = () => {
        if (until.getClientHeight() > document.getElementById('home').offsetHeight) {
            document.getElementById("home").style.height = until.getClientHeight() + 'px'
        }
    }
    export default {
        name: "Home",
        components: {
            Header,
            Footer,
        },
        data() {
            return {
                listCurrentPage: 1,
                access_token: this.$store.state.access_token,
                refresh_token: this.$store.state.refresh_token,
                platform_token: this.$store.state.platform_token,

                home: {
                    height: '',
                },
            }
        },
        methods: {
            ...mapActions(['setLoginUserAct', 'setTokenAct']),
            setClientHeight() {
                this.$nextTick(() => {
                    console.log(until.getClientHeight(), document.getElementById('home').offsetHeight);
                    until.getClientHeight() > document.getElementById('home').offsetHeight ?
                        this.home.height = until.getClientHeight() + 'px' :
                        this.home.height = document.getElementById('home').offsetHeight
                })
            },



        },
        mounted() {
            this.setClientHeight();
        },

    };

</script>

<style lang="less">
    .el-table th>.cell{
        word-break: keep-all;
    }
    #home {
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
        overflow: hidden;
        background-color: #f9f9f9;

        & > div:nth-of-type(2) {
            flex-grow: 1;
            text-align: left;


            & > div:nth-of-type(3) {
                padding: 4rem 0 2rem 0;
                font-size: 1.3rem;
                color: #2C3E50;
            }
        }

        .el-dropdown-link {
            cursor: pointer;
            color: #409EFF;
        }

        .el-icon-arrow-down {
            font-size: 12px;
        }

    }
</style>