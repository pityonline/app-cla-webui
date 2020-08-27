<template>

    <el-row class="marginTop1rem tableStyle">

        <el-col>
            <el-table :data="tableData">
                <el-table-column
                        prop="name"
                        label="userName">
                </el-table-column>
                <el-table-column
                        prop="email"
                        label="email">
                </el-table-column>
                <el-table-column
                        prop="role"
                        label='role'>
                </el-table-column>
                <el-table-column
                        width="100">
                    <template slot-scope="scope">
                        <el-button type="danger" size="mini" @click="deleteUser(scope.row)">删除</el-button>
                    </template>

                </el-table-column>
            </el-table>
        </el-col>


        <el-dialog
                width="20%"
                title=""
                align="center"
                :visible.sync="deleteUserVisible">
            <el-row align="center">
                确定删除？
            </el-row>
            <el-row align="center" class="marginTop1rem contentTitle">

                <el-button type="primary" size="medium" @click="submit()">确定</el-button>
                <el-button size="medium" @click="deleteUserVisible=false">取消</el-button>
            </el-row>

        </el-dialog>
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
    </el-row>

</template>

<script>
    import * as url from '../until/api'
    import pdfReader from "@components/PdfReader";

    export default {
        name: "UserList",
        components: {
            pdfReader
        },
        data() {
            return {
                docInfo: {
                    type: "pdf",
                    href: "/static/pdf/test.pdf"
                },
                previewDialogVisible: false,
                row: '',
                deleteUserVisible: false,
                tableData: [{id: 0, userName: '001', pwd: '001', email: '969707751@qq.com', class: '法务'}, {
                    id: 1,
                    userName: '002',
                    pwd: '002',
                    email: '1057750732@qq.com',
                    class: '开发部'
                },],
            }
        },
        created() {
            this.getEmployeeManager();
        },
        methods: {
            previewPdf() {
                this.previewDialogVisible = true
            },
            deleteUser(row) {
                console.log(row);
                this.row = row
                this.deleteUserVisible = true
            },
            getEmployeeManager() {
                let obj = {
                    cla_org_id: this.$store.state.loginInfo.cla_org_id, email: this.$store.state.loginInfo.email
                }
                this.$axios({
                    url: '/api' + url.queryEmployeeManager,
                    params: obj
                }).then(res => {
                    console.log(res);
                    this.tableData = res.data;
                }).catch(err => {
                    console.log(err);
                })
            },
            submit() {
                let obj = {
                    cla_org_id: this.$store.state.loginInfo.cla_org_id, emails: [this.row.email]
                }
                this.$axios({
                    url: '/api' + url.deleteEmployeeManager,
                    method: 'delete',
                    data: obj
                }).then(res => {
                    console.log(res);
                    this.getEmployeeManager();
                    this.deleteUserVisible = false

                }).catch(err => {
                    console.log(err);
                })
            },
        },
    }
</script>

<style scoped lang="less">
    .marginTop1rem {
        margin-top: 1rem;
    }

    .tableStyle {
        margin-bottom: 2rem;
        padding: 3rem;
        background-color: white;
    }
</style>