<template>
    <div id="section" :style="section">
        <CorporationHeader @clickItem="clickItem" :userName="user"></CorporationHeader>
        <el-row style="margin-top: 2rem">
            <el-col :offset="4" :span="16">
                <el-tabs v-model="active">
                    <el-tab-pane label="inactive" name="first" style="margin-top: 1rem">
                        <div style="margin-bottom: 1rem" class="tableStyle">
                            <el-table
                                    :data="inactiveData"
                                    align="center"
                                    style="width: 100%;">
                                <el-table-column
                                        prop="name"
                                        label="Name"
                                >
                                </el-table-column>
                                <el-table-column
                                        prop="email"
                                        label="Email"
                                >
                                </el-table-column>
                                <el-table-column
                                        prop="tel"
                                        label="Tel">

                                </el-table-column>

                                <el-table-column
                                        align="center">
                                    <template slot-scope="scope">
                                        <el-row>

                                            <el-switch
                                                    @change="changeActive(scope.row.id,scope.row.isUsed)"
                                                    v-model="scope.row.isUsed"
                                                    class="mySwitch"
                                                    :disabled="scope.row.isUsed"
                                                    width="3rem"
                                                    active-color="#409EFF"
                                                    active-text="active"
                                                    inactive-text="inactive"
                                                    inactive-color="#EBEEF5">
                                            </el-switch>

                                            <!--<el-button style="margin-left: 1rem" type="danger" size="mini"-->
                                            <!--@click="clickDelete(scope.row.id)">删除-->
                                            <!--</el-button>-->

                                        </el-row>

                                    </template>
                                </el-table-column>
                            </el-table>

                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="active" name="second" style="margin-top: 1rem">
                        <div style="margin-bottom: 1rem" class="tableStyle">
                        <el-table
                                :data="activeData"
                                align="center"
                                style="width: 100%;">
                            <el-table-column
                                    prop="name"
                                    label="Name"
                            >
                            </el-table-column>
                            <el-table-column
                                    prop="email"
                                    label="Email"
                            >
                            </el-table-column>
                            <el-table-column
                                    prop="tel"
                                    label="Tel">

                            </el-table-column>

                            <el-table-column
                                    align="center">
                                <template slot-scope="scope">
                                    <el-row>

                                        <el-switch
                                                @change="changeActive(scope.row.id,scope.row.isUsed)"
                                                v-model="scope.row.isUsed"
                                                class="mySwitch"
                                                :disabled="scope.row.isUsed"
                                                width="3rem"
                                                active-color="#409EFF"
                                                active-text="active"
                                                inactive-text="inactive"
                                                inactive-color="#EBEEF5">
                                        </el-switch>

                                        <!--<el-button style="margin-left: 1rem" type="danger" size="mini"-->
                                        <!--@click="clickDelete(scope.row.id)">删除-->
                                        <!--</el-button>-->

                                    </el-row>

                                </template>
                            </el-table-column>
                        </el-table>
                        </div>
                    </el-tab-pane>
                </el-tabs>

            </el-col>
        </el-row>

        <div class="paginationClass">
            <el-pagination
                    background
                    :page-size="5"
                    :pager-count="5"
                    :hide-on-single-page="true"
                    :current-page="currentPage"
                    @current-change="changePage"
                    layout="prev, pager, next"
                    :total="tableTotal">
            </el-pagination>
        </div>
        <el-dialog
                width="20%"
                title=""
                align="center"
                :visible.sync="deleteUserVisible">
            <el-row align="center">
                确定删除？
            </el-row>
            <el-row align="center" class="marginTop1rem contentTitle">

                <el-button type="primary" size="medium" @click="deleteContributor()">确定</el-button>
                <el-button size="medium" @click="deleteUserVisible=false">取消</el-button>
            </el-row>

        </el-dialog>
        <Footer></Footer>
    </div>

</template>

<script>
    import * as url from '../until/api'
    import * as until from '../until/until'
    import CorporationHeader from '@components/CorporationHeader'
    import Footer from '@components/Footer'
    window.onresize = () => {
        // console.log(until.getClientHeight());
        if (until.getClientHeight() > document.getElementById('section').offsetHeight) {
            document.getElementById("section").style.height = until.getClientHeight() + 'px'
        }
    }
    export default {
        name: "SignedRepo",
        components:{
            CorporationHeader,
            Footer,
        },
        data() {
            return {
                user:this.$store.state.loginInfo.userName,

                active:'first',
                section: {
                    height: '',
                },
                deleteId: '',
                deleteUserVisible: false,
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
                activeData:[{id: 0, name: 'tom', email: '10577507@qq.com', tel: '15632486433', isUsed: true}, {
                    id: 1,
                    name: 'helen',
                    email: '105507@163.com',
                    tel: '18832486437',
                    isUsed: true
                }]
            }
        },
        methods: {
            checkPdf(){
                console.log('checkPdf');
            },
            changeActive(id, active) {
                console.log('changeActive', id, active);
                let data = {id: id, active: active}
                this.$axios({
                    url: `/api${url.changeActive}`,
                    method: 'post',
                    data: data,
                }).then(res => {
                    console.log(res);
                }).catch(err => {
                    console.log(err);
                })
            },
            clickDelete(id) {
                this.deleteUserVisible = true;
                this.deleteId = id
            },

            deleteContributor() {
                console.log('deleteContributor');
                this.$axios({
                    url: `/api${url.deleteCon}/${this.deleteId}`,
                    method: 'delete',
                }).then(res => {
                    console.log(res);
                }).catch(err => {
                    console.log(err);
                })
            },
            changePage(page) {
                console.log(page);
            },
            /*设置页面高度*/
            setClientHeight() {
                // console.log(until.getClientHeight());
                this.$nextTick(() => {
                    until.getClientHeight() > document.getElementById('section').offsetHeight ?
                        this.section.height = until.getClientHeight() + 'px' :
                        this.section.height = document.getElementById('section').offsetHeight

                })
            },
            clickItem(command) {
                console.log(command);
                switch (command) {
                    case 'a':
                        if (this.$route.path !== '/userList') {
                            this.$router.push('/userList');
                        }
                        break;
                    case 'b':
                        if (this.$route.path !== '/createUser') {
                            this.$router.push('/createUser');
                        }
                        break;
                    case 'c':
                        if (this.$route.path !== '/resetPassword') {
                            this.$router.push('/resetPassword');
                        }
                        break;

                    case 'd':
                        this.loginOut()
                        break;
                }
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
    #section {
        padding-top: 4rem;
        background-color: #F5F5F5;
        display: flex;
        box-sizing: border-box;
        flex-direction: column;

        & > div:nth-of-type(2) {
            flex-grow: 1;
        }
    }
    .tableStyle {
        margin-bottom: 2rem;
        padding: 3rem;
        background-color: white;
    }

    .paginationClass {
        text-align: center;
        margin-bottom: 1rem;
    }


    .pointer {
        cursor: pointer;
    }


    .marginTop1rem {
        margin-top: 1rem;
    }

    .contentTitle {
        font-size: 1.2rem;
    }

    .mySwitch .el-switch__label {
        position: absolute;
        display: none;
        color: #fff;
    }

    /*打开时文字位置设置*/
    .mySwitch .el-switch__label--right {
        z-index: 1;
        right: 0.5rem;
    }

    /*关闭时文字位置设置*/
    .mySwitch .el-switch__label--left {
        z-index: 1;
        left: .5rem;
    }

    /*显示文字*/
    .mySwitch .el-switch__label.is-active {
        display: block;
    }

    .mySwitch.el-switch .el-switch__core,
    .el-switch .el-switch__label {
        width: 4rem !important;
    }
</style>