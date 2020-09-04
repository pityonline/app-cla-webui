<template>

    <el-row class="marginTop1rem tableStyle">

        <el-col>
            <el-row>
                <el-col align="right">
                    <el-button @click="multipleChoice=true" size="medium">Multiple choice</el-button>
                </el-col>
            </el-row>
            <el-row>
                <el-table
                        @selection-change="handleSelectionChange"
                        ref="multipleTable"
                        :data="tableData">
                    <el-table-column
                            v-if="multipleChoice"
                            type="selection"
                            width="55">
                    </el-table-column>
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
                            <el-button v-if="!multipleChoice" type="danger" size="mini" @click="deleteUser(scope.row)">
                                删除
                            </el-button>
                        </template>

                    </el-table-column>
                </el-table>
            </el-row>
            <el-row style="margin-top: 20px" v-if="multipleChoice">
                <el-col align="left">
                    <el-button size="medium" type="danger" @click="deleteUser()">Delete</el-button>
                    <el-button size="medium" @click="cancel()">Cancel</el-button>
                </el-col>
            </el-row>
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

    </el-row>

</template>

<script>
    import * as url from '../until/api'
    import {mapActions} from 'vuex'

    export default {
        name: "UserList",
        computed:{
            orgValue(){
                console.log(this.$store.state.loginInfo.orgValue);
                return this.$store.state.loginInfo.orgValue
            },
            userInfo(){
                console.log(this.$store.state.loginInfo.userInfo);
                return this.$store.state.loginInfo.userInfo
            },

        },
        components: {},
        data() {
            return {
                emails: [],
                multipleChoice: false,
                multipleSelection: [],
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
            ...mapActions(['setUserLimitAct']),
            cancel() {
                this.$refs.multipleTable.clearSelection();
                this.multipleChoice = false

            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            deleteUser(row) {
                this.emails = [];
                if (this.multipleChoice) {
                    this.multipleSelection.forEach(item => {
                        this.emails.push(item.email)
                    })
                } else {
                    this.emails.push(row.email)
                }
                console.log(row);

                console.log(this.multipleSelection);
                this.deleteUserVisible = true

            },
            getEmployeeManager() {
                let obj = {
                    cla_org_id: this.userInfo[this.orgValue].cla_org_id, email: this.userInfo[this.orgValue].email
                }
                this.$axios({
                    url: '/api' + url.queryEmployeeManager,
                    params: obj,
                    header:{
                        token:this.userInfo[this.orgValue].token
                    }
                }).then(res => {
                    console.log(res);
                    this.tableData = res.data;
                    this.setUserLimitAct(res.data.length)
                }).catch(err => {
                    console.log(err);
                })
            },
            submit() {
                let obj = {
                    cla_org_id: this.userInfo[this.orgValue].cla_org_id, emails: this.emails
                }
                this.$axios({
                    url: '/api' + url.deleteEmployeeManager,
                    method: 'delete',
                    data: obj,
                    header:{
                        token:this.userInfo[this.orgValue].token
                    }
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