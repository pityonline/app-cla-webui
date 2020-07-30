<template>
    <div>
        <div class="tableStyle">
            <el-table
                    :data="tableDataOther"
                    align="center"
                    style="width: 100%;">
                <el-table-column
                        prop="repository"
                        label="Repository"
                        width="220">
                    <template slot-scope="scope">
                        <svg-icon icon-class="repository"/>
                        <span class="pointer hoverUnderline"
                              @click="newWindow()"
                              style="margin-left: 10px;">{{ scope.row.repository }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="cla"
                        label="CLA"
                        width="220">
                    <template slot-scope="scope">
                                            <span class="pointer hoverUnderline"
                                                  @click="checkCla()">{{scope.row.cla}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="gist"
                        label="Gist">
                    <template slot-scope="scope">
                        <svg-icon style="cursor: pointer" icon-class="github"/>
                    </template>
                </el-table-column>

                <el-table-column
                        prop="sharedGist"
                        label="Shared Gist">
                </el-table-column>
                <el-table-column
                        prop="contributors"
                        label="Contributors"
                        align="center">
                </el-table-column>
                <el-table-column
                        prop="status"
                        align="center"
                        label="Status">
                    <template slot-scope="scope">
                        <svg-icon class="pointer" icon-class="link_active"/>
                    </template>
                </el-table-column>
                <el-table-column
                        align="center">
                    <template slot-scope="scope">
                        <el-button type="primary" size="small"
                                   @click="listDialogVisible=true">白名单
                        </el-button>
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
        <el-dialog
                close-on-click-modal="false"
                title="白名单"
                top="5vh"
                :visible.sync="listDialogVisible"
                width="70%">
            <div style="margin-bottom: 1rem">
                <el-table
                        :data="listData"
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
                            <el-switch
                                    @change="changeActive(scope.row.id,scope.row.isUsed)"
                                    v-model="scope.row.isUsed"
                                    active-color="#409EFF"
                                    inactive-color="#EBEEF5">
                            </el-switch>
                            <el-button style="margin-left: 1rem" type="danger" size="mini"
                                       @click="deleteContributor(scope.row.id)">删除
                            </el-button>
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
                        :current-page="listCurrentPage"
                        @current-change="listChangePage"
                        layout="prev, pager, next"
                        :total="listData.length">
                </el-pagination>
            </div>
        </el-dialog>
    </div>

</template>

<script>
    import * as url from '../until/api'

    export default {
        name: "SignedRepo",
        data() {
            return {
                listDialogVisible: false,
                tableDataOther: [{repository: 'ooo', cla: 'test', sharedGist: 'Yes', contributors: '0',},],
                tableTotal: 0,
                currentPage: 1,
                listData: [{id: 0, name: 'jack', email: '10577507@qq.com', tel: '15632486433', isUsed: true}, {
                    id: 1,
                    name: 'Rose',
                    email: '105507@163.com',
                    tel: '18832486437',
                    isUsed: false
                }],
            }
        },
        methods: {
            changeActive(id,active) {
                console.log('changeActive',id,active);
                let data ={id:id,active:active}
                this.$axios({
                    url: `/api${url.changeActive}`,
                    method: 'post',
                    data:data,
                }).then(res => {
                    console.log(res);
                }).catch(err => {
                    console.log(err);
                })
            },
            deleteContributor(id) {
                console.log('deleteContributor');
                this.$axios({
                    url: `/api${url.deleteCon}/${id}`,
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
        }
    }
</script>

<style scoped lang="less">
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