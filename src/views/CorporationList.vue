<template>
    <div>
        <div class="tableStyle">
            <el-table
                    :data="tableData"
                    align="center"
                    style="width: 100%;">
                <el-table-column
                        prop="corporation_name"
                        label="CorporationName">

                </el-table-column>
                <el-table-column
                        prop="admin_name"
                        label="AdminName">
                </el-table-column>

                <el-table-column
                        prop="admin_email"
                        label="Email">
                </el-table-column>

                <el-table-column
                        label="PDF"
                        align="center">

                    <template slot-scope="scope">
                        <el-tooltip slot="reference" effect="dark" content="pdf"
                                    placement="bottom">
                            <svg-icon class="pointer" icon-class="pdf" @click=""/>
                        </el-tooltip>

                    </template>
                </el-table-column>
                <el-table-column
                        align="center">

                    <template slot-scope="scope">
                        <el-tooltip slot="reference" effect="dark" content="activation"
                                    placement="bottom">
                            <el-switch
                                    @change="changeActive(scope.row.cla_org_id,scope.row.corporation_name,scope.row.admin_email,true)"
                                    v-model="scope.row.enabled"
                                    class="mySwitch"
                                    :disabled="scope.row.enabled"
                                    width="3rem"
                                    active-color="#409EFF"
                                    active-text="active"
                                    inactive-text="inactive"
                                    inactive-color="#EBEEF5">
                            </el-switch>
                        </el-tooltip>
                        <el-button type="primary" size="small" @click="createRoot(scope.row.cla_org_id,scope.row.admin_email)">Create Root</el-button>

                    </template>
                </el-table-column>

            </el-table>
        </div>
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
    </div>


</template>
<script>
    import {mapActions} from 'vuex'
    import * as url from '../until/api'

    export default {
        name: "CorporationList",
        data() {
            return {
                tableData:[{corporation_name:'ooo',admin_name:'ocl',admin_email:'666@qq.com',date:'2020-08-18'},{corporation_name:'oco',admin_name:'oll',email:'555@qq.com',date:'2020-08-19'},],
                currentPage:1,
                tableTotal:0,
            }
        },
        created() {
            // this.getCookieData()
            console.log(this.$route.query.corporationInfo,'created');
            this.tableData=this.$route.query.corporationInfo
        },
        methods: {
            createRoot(cla_org_id,email){
                let data = {cla_org_id: cla_org_id,email: email}
                this.$axios({
                    url: `/api${url.corporationManager}`,
                    method: 'post',
                    data: data,
                }).then(res => {
                    console.log(res);
                }).catch(err => {
                    console.log(err);
                })
            },
            changeActive(cla_org_id, corporation_name,admin_email,enabled) {
                console.log('changeActive', cla_org_id, email);
                let data = {cla_org_id: cla_org_id,corporation_name:corporation_name, admin_email: admin_email,enabled:enabled}
                this.$axios({
                    url: `/api${url.active_corporation}`,
                    method: 'put',
                    data: data,
                }).then(res => {
                    console.log(res);
                }).catch(err => {
                    console.log(err);
                })
            },
        },

    }
</script>

<style  lang="less">
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
        width: 50px !important;
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

    .el-dropdown-link {
        cursor: pointer;
        color: #409EFF;
    }

    .el-icon-arrow-down {
        font-size: 12px;
    }

    .hoverUnderline:hover {
        text-decoration: underline;
    }

    .qusLink {
        text-decoration: underline;
        font-size: .8rem;
        cursor: pointer;
    }

    .dialogDec {
        font-size: 1rem;
        padding: .5rem 0;
    }

    .left {
        text-align: left;
    }

    .right {
        text-align: right;
    }

    .size_b {
        font-size: 1.3rem;
    }

    .size_m {
        font-size: 1rem;
        text-align: left;
    }

    .menuBT {
        display: flex;
        flex-direction: column;

        & > * {

            margin: .2rem 0;
            text-align: center;
        }
    }

    .pointer {
        cursor: pointer;
    }

    .dialogDesc {

        font-size: 1.2rem;
        margin: 2rem 0;
        text-align: center;
    }

    li {
        margin: 1rem 0;
    }

    .disableClass {
        margin-top: 2rem;
        text-align: center;
        height: 3rem;
        background-color: #ACD7E6;
        color: white;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .linkBt {
        margin-top: 2rem;
        text-align: center;
        height: 3rem;
        background-color: #0594C6;
        color: white;
        display: flex;
        flex-direction: column;
        justify-content: center;


        &:hover {
            background-color: #046F94;
        }
    }

    #configBtDiv {
        text-align: left;
        padding-top: 3rem;

        & > .configBt {
            font-size: 1.2rem;
        }
    }

    #home {
        padding-top: 4rem;
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
        overflow: hidden;
        background-color: #F5F5F5;

        & > .header {
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

        & > div:nth-of-type(2) {
            flex-grow: 1;
            background-color: #F5F5F5;
            text-align: left;


            & > div:nth-of-type(3) {
                padding: 4rem 0 2rem 0;
                font-size: 1.3rem;
                color: #2C3E50;
            }

        }

        & > .footer {
            height: 4rem;
            display: flex;
            justify-content: space-between;
            background-color: white;

            & > .left {
                text-align: left;
                padding-left: 2rem;
                display: flex;
                flex-direction: column;
                justify-content: center;
            }

            & > .center {
                text-align: center;
                display: flex;
                flex-direction: column;
                justify-content: center;
            }

            & > .right {
                text-align: right;
                padding-right: 2rem;
                display: flex;
                flex-direction: column;
                justify-content: center;

                span:nth-of-type(1) {
                    margin-right: 1rem;
                }

                #github_logo {
                    width: 1.1rem;
                    height: 1.1rem;
                }
            }
        }
    }
</style>