<template>
    <div>
        <el-tabs v-model="active">
            <el-tab-pane label="inactive" name="first" style="margin-top: 1rem">
                <div style="margin-bottom: 1rem" class="tableStyle">
                    <el-table
                            :data="inactiveData"
                            align="center"
                            style="width: 100%;">
                        <!--<el-table-column-->
                                <!--prop="name"-->
                                <!--label="Name">-->
                        <!--</el-table-column>-->
                        <el-table-column
                                prop="email"
                                label="Email">
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


                                    <el-button style="margin-left: 1rem" type="danger" size="mini"
                                    @click="deleteEmployee(scope.row.cla_org_id,scope.row.email,scope.row.enabled)">Delete
                                    </el-button>

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
                        <!--<el-table-column-->
                                <!--prop="name"-->
                                <!--label="Name">-->
                        <!--</el-table-column>  -->
                        <el-table-column
                                prop="email"
                                label="Email">
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

                                            width="3rem"
                                            active-color="#409EFF"
                                            active-text="active"
                                            inactive-text="inactive"
                                            inactive-color="#EBEEF5">
                                    </el-switch>

                                    <el-button style="margin-left: 1rem" type="danger" size="mini"
                                    @click="deleteEmployee(scope.row.cla_org_id,scope.row.email,scope.row.enabled)">删除
                                    </el-button>

                                </el-row>

                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </el-tab-pane>
        </el-tabs>
        <el-dialog
                width="20%"
                title=""
                align="center"
                :visible.sync="deleteUserVisible">
            <el-row align="center">
                Are you sure to delete ?
            </el-row>
            <el-row align="center" class="marginTop1rem contentTitle">

                <el-button type="primary" size="medium" @click="submit()">Yes</el-button>
                <el-button size="medium" @click="deleteUserVisible=false">No</el-button>
            </el-row>

        </el-dialog>
        <corpReLoginDialog :title="corpReLoginDialogTitle" :message="corpReLoginMsg" :dialogVisible="corpReLoginDialogVisible"></corpReLoginDialog>
        <reTryDialog :title="corpReLoginDialogTitle" :message="corpReLoginMsg" :dialogVisible="corpReTryDialogVisible"></reTryDialog>
    </div>
</template>

<script>
    import * as url from '../until/api'
    import http from '../until/http'
    import corpReLoginDialog from '../components/CorpReLoginDialog'
    import reTryDialog from '../components/ReTryDialog'
    export default {
        name: "EmployeeList",
        components: {
            corpReLoginDialog,
            reTryDialog
        },
        data() {
            return {
                deleteUserVisible:false,
                active: 'first',
                inactiveData: [],
                activeData: [],
                deleteData:'',
            }
        },
        computed: {
            orgValue() {
                return this.$store.state.loginInfo.orgValue
            },
            userInfo() {
                return this.$store.state.loginInfo.userInfo
            },
            corpReLoginDialogVisible() {
                return this.$store.state.dialogVisible
            }
            ,
            corpReLoginMsg() {
                return this.$store.state.dialogMessage
            },
            corpReLoginDialogTitle() {
                return `cla sign prompt you`
            },
            corpReTryDialogVisible() {
                return this.$store.state.reTryDialogVisible
            },
        },
        methods: {
            submit(){
                let obj={enabled:this.deleteData.enabled}
               http({
                    url: `${url.enableEmployee}/${this.deleteData.cla_org_id}/${this.deleteData.email}`,
                    method: 'delete',
                    data: obj,
                }).then(res => {
                    this.getEmployee()
                    this.deleteUserVisible=false
                    this.$message.closeAll();
                    this.$message.success(res.data.data)
                }).catch(err => {
                   console.log(err);
                   if (err.data.hasOwnProperty('data')) {
                       switch (err.data.data.error_code) {
                           case 'cla.invalid_token':
                               this.$store.commit('errorSet', {
                                   dialogVisible: true,
                                   dialogMessage: 'token expired, please login again',
                               });
                               break;
                           case 'cla.missing_token':
                               this.$store.commit('errorSet', {
                                   dialogVisible: true,
                                   dialogMessage: 'Token does not exist, please login again',
                               });
                               break;
                           case 'cla.unknown_token':
                               this.$store.commit('errorSet', {
                                   dialogVisible: true,
                                   dialogMessage: 'token unknown, please login again',
                               });
                               break;

                           case 'cla.num_of_corp_managers_exceeded':
                               this.$store.commit('errorCodeSet', {
                                   dialogVisible: true,
                                   dialogMessage: 'The added administrator exceeds the limit',
                               });
                               break;
                           case 'cla.corp_manager_exists':
                               this.$store.commit('errorCodeSet', {
                                   dialogVisible: true,
                                   dialogMessage: 'The added administrator already exists',
                               });
                               break;
                           case 'cla.not_same_corp':
                               this.$store.commit('errorCodeSet', {
                                   dialogVisible: true,
                                   dialogMessage: 'The mailbox does not belong to the company mailbox',
                               });
                               break;
                           case 'cla.system_error':
                               this.$store.commit('errorCodeSet', {
                                   dialogVisible: true,
                                   dialogMessage: 'System error, please try again',
                               });
                               break;
                       }
                   }else{
                       this.$store.commit('errorCodeSet', {
                           dialogVisible: true,
                           dialogMessage: 'System error, please try again',
                       })
                   }
                })
            },
            deleteEmployee(cla_org_id, email, enabled){
                this.deleteData={
                    cla_org_id: cla_org_id,
                    email: email,
                    enabled: enabled
                }
                this.deleteUserVisible=true
            },
            changeActtive(cla_org_id, email, enabled) {
                let data = {
                    enabled: enabled
                }
                http({
                    url: `${url.enableEmployee}/${cla_org_id}/${email}`,
                    method: 'put',
                    data: data,
                }).then(res => {
                    this.getEmployee()
                }).catch(err => {
                    console.log(err);
                    if (err.data.hasOwnProperty('data')) {
                        switch (err.data.data.error_code) {
                            case 'cla.invalid_token':
                                this.$store.commit('errorSet', {
                                    dialogVisible: true,
                                    dialogMessage: 'token expired, please login again',
                                });
                                break;
                            case 'cla.missing_token':
                                this.$store.commit('errorSet', {
                                    dialogVisible: true,
                                    dialogMessage: 'Token does not exist, please login again',
                                });
                                break;
                            case 'cla.unknown_token':
                                this.$store.commit('errorSet', {
                                    dialogVisible: true,
                                    dialogMessage: 'token unknown, please login again',
                                });
                                break;

                            case 'cla.num_of_corp_managers_exceeded':
                                this.$store.commit('errorCodeSet', {
                                    dialogVisible: true,
                                    dialogMessage: 'The added administrator exceeds the limit',
                                });
                                break;
                            case 'cla.corp_manager_exists':
                                this.$store.commit('errorCodeSet', {
                                    dialogVisible: true,
                                    dialogMessage: 'The added administrator already exists',
                                });
                                break;
                            case 'cla.not_same_corp':
                                this.$store.commit('errorCodeSet', {
                                    dialogVisible: true,
                                    dialogMessage: 'The mailbox does not belong to the company mailbox',
                                });
                                break;
                            case 'cla.system_error':
                                this.$store.commit('errorCodeSet', {
                                    dialogVisible: true,
                                    dialogMessage: 'System error, please try again',
                                });
                                break;
                        }
                    }else{
                        this.$store.commit('errorCodeSet', {
                            dialogVisible: true,
                            dialogMessage: 'System error, please try again',
                        })
                    }
                })
            },

            getEmployee() {
                let obj = {
                    platform: this.userInfo[this.orgValue].platform,
                    repo_id: this.userInfo[this.orgValue].repo_id,
                    org_id: this.userInfo[this.orgValue].org_id,
                    corporation_email: this.userInfo[this.orgValue].email
                }
               http({
                    url: url.queryEmployee,
                    params: obj,

                }).then(res => {
                    console.log(res);
                    this.inactiveData = [];
                    this.activeData = [];
                    let data =res.data.data;
                    for (let key in data){
                        console.log(key);
                        console.log(data[key]);
                        data[key].forEach((item, index) => {
                            Object.assign(item,{cla_org_id:key})
                            item.enabled === false ? this.inactiveData.push(item) : this.activeData.push(item)
                        })
                    }
                }).catch(err => {
                   console.log(err);
                   if (err.data.hasOwnProperty('data')) {
                       switch (err.data.data.error_code) {
                           case 'cla.invalid_token':
                               this.$store.commit('errorSet', {
                                   dialogVisible: true,
                                   dialogMessage: 'token expired, please login again',
                               });
                               break;
                           case 'cla.missing_token':
                               this.$store.commit('errorSet', {
                                   dialogVisible: true,
                                   dialogMessage: 'Token does not exist, please login again',
                               });
                               break;
                           case 'cla.unknown_token':
                               this.$store.commit('errorSet', {
                                   dialogVisible: true,
                                   dialogMessage: 'token unknown, please login again',
                               });
                               break;

                           case 'cla.num_of_corp_managers_exceeded':
                               this.$store.commit('errorCodeSet', {
                                   dialogVisible: true,
                                   dialogMessage: 'The added administrator exceeds the limit',
                               });
                               break;
                           case 'cla.corp_manager_exists':
                               this.$store.commit('errorCodeSet', {
                                   dialogVisible: true,
                                   dialogMessage: 'The added administrator already exists',
                               });
                               break;
                           case 'cla.not_same_corp':
                               this.$store.commit('errorCodeSet', {
                                   dialogVisible: true,
                                   dialogMessage: 'The mailbox does not belong to the company mailbox',
                               });
                               break;
                           case 'cla.system_error':
                               this.$store.commit('errorCodeSet', {
                                   dialogVisible: true,
                                   dialogMessage: 'System error, please try again',
                               });
                               break;
                       }
                   }else{
                       this.$store.commit('errorCodeSet', {
                           dialogVisible: true,
                           dialogMessage: 'System error, please try again',
                       })
                   }
                })
            },
        },
        created() {
            this.getEmployee();
        }
    }
</script>

<style lang="less">
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
    .mySwitch .el-switch__label--right {
        z-index: 1;
        right: 0.5rem;
    }

    .mySwitch .el-switch__label--left {
        z-index: 1;
        left: .5rem;
    }

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