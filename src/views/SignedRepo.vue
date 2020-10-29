<template>
    <div id="signedRepo" :style="section">
        <CorporationHeader @clickItem="clickItem" :user="user"></CorporationHeader>
        <el-row style="padding-top: 2rem">
            <el-col :offset="4" :span="16">
                <router-view></router-view>
            </el-col>
        </el-row>
        <Footer></Footer>
    </div>

</template>

<script>
    import * as url from '../until/api'
    import * as until from '../until/until'
    import CorporationHeader from '@components/CorporationHeader'
    import Footer from '@components/NewFooter'

    window.onresize = () => {
        if (until.getClientHeight() > document.getElementById('signedRepo').offsetHeight) {
            document.getElementById("signedRepo").style.height = until.getClientHeight() + 'px'
        }
    }
    export default {
        name: "SignedRepo",
        components: {
            CorporationHeader,
            Footer,
        },
        data() {
            return {
                user: this.$store.state.loginInfo,

                active: 'first',
                section: {
                    height: '',
                },
                deleteId: '',
                listDialogVisible: false,
                tableDataOther: [{repository: 'ooo', cla: 'test', sharedGist: 'Yes', contributors: '0',},],
                tableTotal: 0,
                currentPage: 1,
                inactiveData: [{id: 0, name: 'jack', email: '10577507@qq.com', tel: '15632486433', isUsed: false}, {
                    id: 1,
                    name: 'Rose',
                    email: '105507@163.com',
                    tel: '18832486437',
                    isUsed: false
                }],
                activeData: [{id: 0, name: 'tom', email: '10577507@qq.com', tel: '15632486433', isUsed: true}, {
                    id: 1,
                    name: 'helen',
                    email: '105507@163.com',
                    tel: '18832486437',
                    isUsed: true
                }]
            }
        },
        methods: {

            checkPdf() {
            },
            changeActive(id, active) {
                let data = {id: id, active: active}
                this.$axios({
                    url: `/api${url.changeActive}`,
                    method: 'post',
                    data: data,
                }).then(res => {
                }).catch(err => {
                    this.$message.closeAll()
                    this.$message.error(err.response.data)
                })
            },
            deleteContributor() {
                this.$axios({
                    url: `/api${url.deleteCon}/${this.deleteId}`,
                    method: 'delete',
                }).then(res => {
                }).catch(err => {
                    this.$message.closeAll()
                    this.$message.error(err.response.data)
                })
            },
            changePage(page) {
            },
            setClientHeight() {
                this.$nextTick(() => {
                    until.getClientHeight() > document.getElementById('signedRepo').offsetHeight ?
                        this.section.height = until.getClientHeight() + 'px' :
                        this.section.height = document.getElementById('signedRepo').offsetHeight

                })
            },
            clickItem(command) {
                switch (command) {
                    case 'b':
                        if (this.$route.path !== '/employeeList') {
                            this.$router.push('/employeeList');
                        }
                        break;
                    case 'c':
                        if (this.$route.path !== '/createManager') {
                            this.$router.push('/createManager');
                        }
                        break;
                    case 'd':
                        if (this.$route.path !== '/signedRepo/resetPassword') {
                            this.$router.push('/signedRepo/resetPassword');
                        }
                        break;
                    case 'f':
                        this.loginOut()
                        break;
                }
            },
            loginOut() {
                sessionStorage.clear()
                this.$router.push('/corporationManagerLogin')

            },
        },
        created() {
        },
        mounted() {
            this.setClientHeight();
        }
    }
</script>

<style lang="less">
    #signedRepo {
        display: flex;
        box-sizing: border-box;
        flex-direction: column;

        & > div:nth-of-type(2) {
            flex-grow: 1;
            background-color: #F0F2F5;
        }

        & .tableStyle {
            margin-bottom: 2rem;
            padding: 3rem;
            background-color: white;
        }

        & .pointer {
            cursor: pointer;
        }

        & .marginTop1rem {
            margin-top: 1rem;
        }

        & .contentTitle {
            font-size: 1.2rem;
        }

    }


</style>