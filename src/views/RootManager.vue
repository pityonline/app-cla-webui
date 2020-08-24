<template>
    <div id="section" :style="section">

        <CorporationHeader @clickItem="clickItem" :userInfo="user"></CorporationHeader>
        <el-row style="margin-top: 2rem">
            <el-col :offset="4" :span="16">
                <el-tabs v-model="active">
                    <el-tab-pane label="User Management" name="first" style="margin-top: 1rem">

                    </el-tab-pane>
                </el-tabs>

                <!--<el-row>-->
                <!--<el-col align="left">-->
                <!--<el-button type="primary" size="small" @click="clickAddUser()">-->
                <!--create user-->
                <!--</el-button>-->
                <!--</el-col>-->

                <!--</el-row>-->
                <router-view></router-view>
            </el-col>
        </el-row>

        <Footer></Footer>
        <el-dialog
                width="50%"
                title="新增管理员"
                align="center"
                :visible.sync="addUserVisible">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="10rem">
                <el-form-item label="用户名" prop="userName">
                    <el-input
                            size="medium" v-model="ruleForm.userName">
                    </el-input>
                </el-form-item>
                <el-form-item label="密码" prop="pwd">
                    <el-input
                            show-password size="medium" v-model="ruleForm.pwd">
                    </el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input
                            size="medium" v-model="ruleForm.email">
                    </el-input>
                </el-form-item>
                <el-form-item label-width="0">
                    <el-row align="center">

                        <el-button type="primary" size="medium" @click="submit('ruleForm')">确定</el-button>
                        <el-button size="medium" @click="reset('ruleForm')">重置</el-button>
                    </el-row>
                </el-form-item>
            </el-form>


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

                <el-button type="primary" size="medium" @click="submit()">确定</el-button>
                <el-button size="medium" @click="deleteUserVisible=false">取消</el-button>
            </el-row>

        </el-dialog>
    </div>

</template>

<script>
    import * as url from '../until/api'
    import CorporationHeader from '@components/CorporationHeader'
    import Footer from '@components/Footer'
    import * as until from '../until/until'

    window.onresize = () => {
        // console.log(until.getClientHeight());
        if (until.getClientHeight() > document.getElementById('section').offsetHeight) {
            document.getElementById("section").style.height = until.getClientHeight() + 'px'
        }
    }
    export default {
        name: "rootManager",
        components: {
            CorporationHeader,
            Footer

        },
        data() {
            let validateAccount = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入账号'));
                }
                callback();
            };
            let validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                }
                callback();
            };
            let validateEmail = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入邮箱'));
                } else {
                    let reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
                    if (reg.test(value)) {
                        callback();
                    } else {
                        callback(new Error('邮箱格式有误'))
                    }
                    callback();
                }
                callback();
            };
            return {
                user:this.$store.state.loginInfo,
                section: {
                    height: '',
                },
                active: 'first',
                maxUser: 2,
                deleteUserVisible: false,
                rules: {
                    userName: [
                        {require: true, validator: validateAccount, trigger: 'blur'}
                    ],
                    pwd: [
                        {require: true, validator: validatePass, trigger: 'blur'}
                    ],
                    email: [
                        {require: true, validator: validateEmail, trigger: 'blur'}
                    ],
                },
                ruleForm: {
                    userName: '',
                    pwd: '',
                    email: '',
                },
                addUserVisible: false,
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

        },
        mounted() {
            this.setClientHeight();
        },

        methods: {
            clickItem(command) {
                console.log(command);
                switch (command) {
                    case 'a':
                        if (this.$route.path !== '/userList') {
                            this.$router.push('/userList');
                        }
                        break;
                    case 'b':
                        if (this.$route.path !== '/createUser') {
                            this.$router.push('/createUser');
                        }
                        break;
                    case 'c':
                        if (this.$route.path !== '/resetPassword') {
                            this.$router.push('/resetPassword');
                        }
                        break;

                    case 'd':
                        this.loginOut()
                        break;
                }
            },
            loginOut() {
                console.log('删除账号信息');
                this.$router.push('/')
            },
            /*设置页面高度*/
            setClientHeight() {
                // console.log(until.getClientHeight());
                this.$nextTick(() => {
                    until.getClientHeight() > document.getElementById('section').offsetHeight ?
                        this.section.height = until.getClientHeight() + 'px' :
                        this.section.height = document.getElementById('section').offsetHeight

                })
            },
            addUser() {
                let data = {}
                this.$axios({
                    url: '/api' + url.addUser,
                    method: 'post',
                    data: data,
                }).then(res => {
                    console.log(res);
                }).catch(err => {
                    console.log(err);
                })
            },
            submit(formName) {
                this.$refs[formName].validate((valid => {
                    if (valid) {
                        alert('submit!')
                    } else {
                        console.log('error submit');
                        return false;
                    }
                }))
            },
            reset(formName) {
                this.$refs[formName].resetFields();
            },
            deleteUser(id) {
                console.log(id);
                this.deleteUserVisible = true
            },
            clickAddUser() {

                if (this.tableData.length === this.maxUser) {
                    this.$message.closeAll();
                    this.$message(`最多新增${this.maxUser}个管理账号`)
                } else {
                    this.addUserVisible = true;
                }

            },
        },
    }
</script>

<style scoped lang="less">
    #section {
        padding-top: 4rem;
        background-color: #F5F5F5;
        display: flex;
        box-sizing: border-box;
        flex-direction: column;

        & > div:nth-of-type(2) {
            flex-grow: 1;
        }
    }

    .pointer {
        cursor: pointer;
    }

    .tableStyle {
        margin-bottom: 2rem;
        padding: 3rem;
        background-color: white;
    }

    .borderClass {
        padding: .5rem 0;
        border-bottom: 1px solid lightgray;
        border-top: 1px solid lightgray;
    }

    .marginTop1rem {
        margin-top: 1rem;
    }

    .contentTitle {
        font-size: 1.2rem;
    }

    .size_s {
        font-size: .9rem;
    }

</style>