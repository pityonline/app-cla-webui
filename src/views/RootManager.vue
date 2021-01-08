<template>
    <div id="rootManager" :style="section">
        <Header></Header>
        <div>
            <div id="rootManager_section">
                <router-view></router-view>
            </div>
        </div>
        <Footer></Footer>
    </div>
</template>
<script>
    import Header from '@components/NewHeader'
    import Footer from '@components/NewFooter'
    import * as until from '../until/until'

    window.onresize = () => {
        if (until.getClientHeight() > document.getElementById('rootManager').offsetHeight) {
            document.getElementById("rootManager").style.height = until.getClientHeight() + 'px'
        }
    };
    export default {
        name: "rootManager",
        components: {
            Header,
            Footer,
        },
        computed: {
            user() {
                return this.$store.state.loginInfo
            },
        },
        data() {
            return {
                section: {
                    height: '',
                },
                active: 'first',
            }
        },
        mounted() {
            this.setClientHeight();
        },
        methods: {
            setClientHeight() {
                this.$nextTick(() => {
                    until.getClientHeight() > document.getElementById('rootManager').offsetHeight ?
                        this.section.height = until.getClientHeight() + 'px' :
                        this.section.height = document.getElementById('rootManager').offsetHeight
                })
            },
        },
    }
</script>
<style scoped lang="less">
    @media screen and (min-width: 1200px) {
        #rootManager_section {
            width: 1200px;
            margin: auto;
        }
    }

    #rootManager {
        display: flex;
        box-sizing: border-box;
        flex-direction: column;

        & > div:nth-of-type(2) {
            flex-grow: 1;
            background-color: #F0F2F5;
            padding: 0 1rem;
        }

    }
</style>