<template>

    <el-row class="marginTop1rem tableStyle">
        <el-table :data="tableData">
            <el-table-column
                    prop="userName"
                    label="用户名">
            </el-table-column>
            <el-table-column
                    prop="email"
                    label="邮箱">
            </el-table-column>
            <el-table-column
                    prop="class"
                    label='部门'>
            </el-table-column>
            <el-table-column
                    width="100">
                <template slot-scope="scope">
                    <el-button type="danger" size="mini" @click="deleteUser(scope.row)">删除</el-button>
                </template>

            </el-table-column>
        </el-table>
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
    export default {
        name: "UserList",
        data() {
            return {
                row:'',
                deleteUserVisible:false,
                tableData: [{id: 0, userName: '001', pwd: '001', email: '969707751@qq.com', class: '法务'}, {
                    id: 1,
                    userName: '002',
                    pwd: '002',
                    email: '1057750732@qq.com',
                    class: '开发部'
                },],
            }
        },
        created(){
            this.getEmployeeManager();
        },
        methods:{
            deleteUser(row) {
                console.log(row);
                this.row = row
                this.deleteUserVisible = true
            },
            getEmployeeManager(){
                let obj = {
                    cla_org_id:this.$store.state.loginInfo.cla_org_id,email:this.$store.state.loginInfo.email
                }
                this.$axios({
                    url:'/api'+url.queryEmployeeManager,
                    params:obj
                }).then(res=>{
                    console.log(res);
                }).catch(err=>{
                    console.log(err);
                })
            },
            submit(){
                let obj = {
                    cla_org_id:this.row.cla_org_id,emails:[this.row.email]
                }
                this.$axios({
                    url:'/api'+url.deleteEmployeeManager,
                    method:'delete',
                    data:obj
                }).then(res=>{
                    console.log(res);
                }).catch(err=>{
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