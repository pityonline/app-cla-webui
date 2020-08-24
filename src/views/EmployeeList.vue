<template>
    <div>
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
                                label="status"
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
                                label="status"
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
    </div>
</template>

<script>
    import * as url from '../until/api'

    export default {
        name: "EmployeeList",
        data(){
            return{
                active:'first',
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
        methods:{
            getEmployee(){
                let obj = {
                    platform:this.$store.state.repoInfo.platform,
                    repo_id:this.$store.state.repoInfo.repo_id,
                    org_id:this.$store.state.repoInfo.org_id,
                    corporation_email:this.$store.state.loginInfo.email
                }
                this.$axios({
                    url:'/api'+url.queryEmployee,
                    params:obj
                }).then(res=>{
                    console.log(res);
                    this.tableData=res.data;
                }).catch(err=>{
                    console.log(err);
                })
            },
        },
        created() {
            this.getEmployee();
        }
    }
</script>

<style scoped lang="less">
    .tableStyle {
        margin-bottom: 2rem;
        padding: 3rem;
        background-color: white;
    }
</style>