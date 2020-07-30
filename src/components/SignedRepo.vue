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
                :close-on-click-modal="false"
                title="白名单"
                top="10vh"
                align="center"
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
                                    class="mySwitch"
                                    active-color="#409EFF"
                                    active-text="启用"
                                    inactive-text="停用"
                                    inactive-color="#EBEEF5">
                            </el-switch>
                            <el-button style="margin-left: 1rem" type="danger" size="mini"
                                       @click="clickDelete(scope.row.id)">删除
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
    </div>

</template>

<script>
    import * as url from '../until/api'

    export default {
        name: "SignedRepo",
        data() {
            return {
                deleteId: '',
                deleteUserVisible: false,
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
        right: -3px;
    }

    /*关闭时文字位置设置*/
    .mySwitch .el-switch__label--left {
        z-index: 1;
        left: 19px;
    }

    /*显示文字*/
    .mySwitch .el-switch__label.is-active {
        display: block;
    }

    .el-switch .el-switch__core,
    .el-switch .el-switch__label {
        width: 50px !important;
    }
</style>