<template>
    <div id="rootManager" :style="section">
        <Header></Header>
        <el-row>
            <el-col :offset="5" :span="14">
                <router-view></router-view>
            </el-col>
        </el-row>

        <Footer></Footer>
        <el-dialog
                style="background-color: #3C3C3C"
                title="pdf-reader"
                top="5vh"
                :visible.sync="previewDialogVisible"
                width="50%">
            <div>
                <pdfReader
                        v-if="docInfo.type === 'pdf'"
                        :doctype="docInfo.type"
                        :dochref="docInfo.href">

                </pdfReader>

            </div>

        </el-dialog>
    </div>

</template>

<script>
    import Header from '@components/NewHeader'
    import Footer from '@components/NewFooter'
    import * as until from '../until/until'
    import pdfReader from "@components/PdfReader";

    window.onresize = () => {
        if (until.getClientHeight() > document.getElementById('rootManager').offsetHeight) {
            document.getElementById("rootManager").style.height = until.getClientHeight() + 'px'
        }
    }
    export default {
        name: "rootManager",
        components: {
            Header,
            Footer,
            pdfReader

        },
        computed: {
            user() {
                return this.$store.state.loginInfo
            },
        },
        data() {
            return {
                docInfo: {
                    type: "pdf",
                    href: "/static/pdf/merge.pdf"
                },
                previewDialogVisible: false,

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
    #rootManager {
        display: flex;
        box-sizing: border-box;
        flex-direction: column;
        & > div:nth-of-type(2) {
            flex-grow: 1;
            background-color: #F0F2F5;
        }

    }
</style>