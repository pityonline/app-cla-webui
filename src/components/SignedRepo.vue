<template>
    <div >
        <div class="tableStyle">
            <el-table
                    :data="tableDataOther"
                    align="center"
                    style="width: 100%;">
                <el-table-column
                        prop="repository"
                        label="Repository"
                        width="180">
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
                        width="180">
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
                        <el-button type="primary"  size="small"
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
    </div>
    <el-dialog
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
                                v-model="scope.row.isUsed"
                                active-color="#409EFF"
                                inactive-color="#EBEEF5">
                        </el-switch>
                        <el-button style="margin-left: 1rem" type="danger" size="mini">删除
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
</template>

<script>
    export default {
        name: "SignedRepo",
        data(){
            return{
                listDialogVisible:false,
                tableDataOther: [{repository: 'ooo', cla: 'test', sharedGist: 'Yes', contributors: '0',},],
                tableTotal: 0,
                currentPage: 1,
                listData: [{name: 'jack', email: '10577507@qq.com', tel: '15632486433', isUsed: true}, {
                    name: 'Rose',
                    email: '105507@163.com',
                    tel: '18832486437',
                    isUsed: false
                }],
            }
        },
        methods:{
            changePage(page) {
                console.log(page);
            },
        }
    }
</script>

<style scoped>

</style>