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
                                label="status"
                                align="center">
                            <template slot-scope="scope">
                                <el-row class="mySwitch">

                                    <el-switch
                                            @change="changeActtive(scope.row.cla_org_id,scope.row.email,scope.row.enabled)"
                                            v-model="scope.row.enabled"
                                            class="mySwitch"
                                            :disabled="scope.row.enabled"
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
                                <el-row class="mySwitch">

                                    <el-switch
                                            @change="changeActtive(scope.row.cla_org_id,scope.row.email,scope.row.enabled)"
                                            v-model="scope.row.enabled"
                                            class="mySwitch"
                                            :disabled="scope.row.enabled"
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
        data() {
            return {
                active: 'first',
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
            changeActtive(cla_org_id, email, enabled) {
                let data = {
                    cla_org_id: cla_org_id,
                    email: email,
                    enabled: enabled
                }
                this.$axios({
                    url: `/api${url.enableEmployee}`,
                    method: 'put',
                    data: data,
                }).then(res => {
                    console.log(res);
                    this.getEmployee()
                }).catch(err => {
                    console.log(err);
                })
            },

            getEmployee() {
                let obj = {
                    platform: this.$store.state.repoInfo.platform,
                    repo_id: this.$store.state.repoInfo.repo_id,
                    org_id: this.$store.state.repoInfo.org_id,
                    corporation_email: this.$store.state.loginInfo.email
                }
                this.$axios({
                    url: '/api' + url.queryEmployee,
                    params: obj
                }).then(res => {
                    this.inactiveData = [];
                    this.activeData = [];
                    console.log(res);
                    res.data.forEach((item, index) => {
                        item.enabled === false ? this.inactiveData.push(item) : this.activeData.push(item)
                    })
                }).catch(err => {
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

    .mySwitch .el-switch.is-disabled .el-switch__core, .mySwitch .el-switch.is-disabled .el-switch__label, .tableStyle {
        cursor: pointer;
    }
</style>