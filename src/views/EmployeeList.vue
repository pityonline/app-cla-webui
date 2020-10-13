<template>
    <div id="employeeList">
        <el-tabs v-model="active">
            <el-tab-pane label="inactive" name="first" style="margin-top: 1rem">
                <div style="margin-bottom: 1rem" class="tableStyle">
                    <el-table
                            class="tableClass"
                            :data="inactiveData"
                            align="center"
                            style="width: 100%;">
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


                                    <button class="deleteBt"
                                               @click="deleteEmployee(scope.row.cla_org_id,scope.row.email,scope.row.enabled)">
                                        Delete
                                    </button>

                                </el-row>

                            </template>
                        </el-table-column>
                    </el-table>

                </div>
            </el-tab-pane>
            <el-tab-pane label="active" name="second" style="margin-top: 1rem">
                <div style="margin-bottom: 1rem" class="tableStyle">
                    <el-table
                            class="tableClass"
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

                                    <!--<el-button style="margin-left: 1rem" type="danger" size="mini"-->
                                    <!--@click="deleteEmployee(scope.row.cla_org_id,scope.row.email,scope.row.enabled)">删除-->
                                    <!--</el-button>-->

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
                :show-close="false"
                :visible.sync="deleteUserVisible">
            <el-row align="center">
                Are you sure to delete ?
            </el-row>
            <el-row align="center" class="marginTop1rem contentTitle">
                <button class="deleteBt"  @click="submit()">Yes</button>
                <button class="cancelBt" @click="deleteUserVisible=false">No</button>
            </el-row>

        </el-dialog>
        <corpReLoginDialog :title="corpReLoginDialogTitle" :message="corpReLoginMsg"
                           :dialogVisible="corpReLoginDialogVisible"></corpReLoginDialog>
        <reTryDialog :title="corpReLoginDialogTitle" :message="corpReLoginMsg"
                     :dialogVisible="corpReTryDialogVisible"></reTryDialog>
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
                deleteUserVisible: false,
                active: 'first',
                inactiveData: [],
                activeData: [],
                deleteData: '',
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
            submit() {
                let obj = {enabled: this.deleteData.enabled}
                http({
                    url: `${url.enableEmployee}/${this.deleteData.email}`,
                    method: 'delete',
                    data: obj,
                }).then(res => {
                    this.getEmployee()
                    this.deleteUserVisible = false
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
                    } else {
                        this.$store.commit('errorCodeSet', {
                            dialogVisible: true,
                            dialogMessage: 'System error, please try again',
                        })
                    }
                })
            },
            deleteEmployee(cla_org_id, email, enabled) {
                this.deleteData = {
                    cla_org_id: cla_org_id,
                    email: email,
                    enabled: enabled
                }
                this.deleteUserVisible = true
            },
            changeActtive(cla_org_id, email, enabled) {
                let data = {
                    enabled: enabled
                }
                http({
                    url: `${url.enableEmployee}/${email}`,
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
                    } else {
                        this.$store.commit('errorCodeSet', {
                            dialogVisible: true,
                            dialogMessage: 'System error, please try again',
                        })
                    }
                })
            },

            getEmployee() {
                http({
                    url: url.queryEmployee,
                }).then(res => {
                    console.log(res);
                    this.inactiveData = [];
                    this.activeData = [];
                    let data = res.data.data;
                    for (let key in data) {
                        console.log(key);
                        console.log(data[key]);
                        data[key].forEach((item, index) => {
                            Object.assign(item, {cla_org_id: key})
                            item.enabled === false ? this.inactiveData.push(item) : this.activeData.push(item)
                        })
                    }
                }).catch(err => {
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
                    } else {
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
    #employeeList {
        & .el-dialog {
            border-radius: 1rem;
        }
        .el-tabs__active-bar{
            background-color: #319E55;
        }
        .el-tabs__item.is-active {
            color: #319E55;
        }
        .el-tabs__item:hover {
            color: #319E55;
        }
        .el-tabs__item{
            font-size: 1.5rem;
        }
        & .tableStyle {
            margin-bottom: 2rem;
            padding: 3rem;
            background-color: white;
            border-radius: 1.5rem;
        }
        & .el-dialog__body {
            padding-top: 0;
        }
        & .cancelBt {
            width: 5rem;
            height: 2rem;
            border-radius: 1rem;
            border: 1px solid black;
            color: black;
            font-size: 1rem;
            cursor: pointer;
            background-color: white;
            margin-left: 1rem;
        }

        & .cancelBt:focus {
            outline: none;
        }

        & .deleteBt {
            margin-left: 1rem;
            width: 5rem;
            height: 2rem;
            border-radius: 1rem;
            border: none;
            color: white;
            font-size: 1rem;
            cursor: pointer;
            background: linear-gradient(to right, #FF9D58, #E22424);
        }

        & .deleteBt:focus {
            outline: none;
        }

        & .button {
            width: 10rem;
            height: 2rem;
            border-radius: 1rem;
            border: none;
            color: white;
            font-size: 1rem;
            cursor: pointer;
            background: linear-gradient(to right, #97DB30, #319E55);
            margin-bottom: 1rem;
        }

        & .button:focus {
            outline: none;
        }

        .tableClass {
            border: 1px solid black;
            border-radius: 1.5rem;
        }
        & .el-table__body, .el-table__footer, .el-table__header {
            padding: 0;
            width: auto;
        }

        & .el-table__body-wrapper {
            margin: 0 1rem;
        }
        .el-table__body tr:not(:last-of-type) td{
            border-bottom: 1px dashed lightgrey;
        }

        .el-table::before{
            height:0;
        }


        & .el-table__body-wrapper, .el-table__footer-wrapper, .el-table__header-wrapper {
            padding: 0;
            width: auto;
        }

        & .el-table__footer-wrapper, .el-table__header-wrapper {
            border-bottom: 1px solid black;
            border-radius: 1.5rem;
            padding: 0 1rem;
        }

        & .mySwitch .el-switch__label {
            position: absolute;
            display: none;
            color: #fff;
        }

        & .mySwitch .el-switch__label--right {
            z-index: 1;
            right: 2.5rem;
        }

        & .mySwitch .el-switch__label--left {
            z-index: 1;
            left: -.4rem;
        }
        & .mySwitch .el-switch__label.is-active {
            display: block;
        }
        .el-switch.is-checked .el-switch__core {
            border-color: #319E55!important;
            background-color: #319E55!important;
        }
        & .mySwitch .el-switch.is-disabled .el-switch__core, .mySwitch .el-switch.is-disabled .el-switch__label, .tableStyle {
            cursor: pointer;
        }
        .el-switch .el-switch__label, .mySwitch.el-switch .el-switch__core{
            width: 6rem!important;
            height: 2rem;
            border-radius: 1rem;
            line-height: 2rem;
            font-size: 1rem;
            text-align: right;
        }
        .el-switch__label *{
            font-size: 1rem;
        }
        .el-switch__core:after{
            height: 2rem;
            width: 2rem;
            top: -1px;
        }
        .el-switch{
            font-size: 1rem;
            line-height: 2rem;
            height: 2rem;
        }
        .el-switch.is-checked .el-switch__core:after {
            left: 100%;
            margin-left: -2rem;
        }
    }

</style>