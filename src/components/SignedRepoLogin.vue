<template>
    <el-row>
        <el-col :offset="8" :span="8" >
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px"
                     class="demo-ruleForm" style="padding: 2rem">
                <el-form-item label="账号" prop="account">
                    <el-input v-model="ruleForm.account" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="pass">
                    <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </el-col>
    </el-row>
</template>

<script>
    export default {
        name: "SignedRepoLogin",
        data(){
            var validateAccount = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入账号'));
                }
                callback();
            };
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                }
                callback();
            };
            return{
                rules: {
                    account: [
                        {validator: validateAccount, trigger: 'blur'}
                    ],
                    pass: [
                        {validator: validatePass, trigger: 'blur'}
                    ],
                },
                ruleForm: {
                    pass: '',
                    account: '',
                },
            }
        },
        methods:{
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        alert('submit!');
                          this.$router.push('/signedRepo')
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
        },
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

    .el-dropdown-link {
        cursor: pointer;
        color: #409EFF;
    }

    .el-icon-arrow-down {
        font-size: 12px;
    }

    .hoverUnderline:hover {
        text-decoration: underline;
    }

    .qusLink {
        text-decoration: underline;
        font-size: .8rem;
        cursor: pointer;
    }

    .dialogDec {
        font-size: 1rem;
        padding: .5rem 0;
    }

    .left {
        text-align: left;
    }

    .right {
        text-align: right;
    }

    .size_b {
        font-size: 1.3rem;
    }

    .size_m {
        font-size: 1rem;
        text-align: left;
    }

    .menuBT {
        display: flex;
        flex-direction: column;

        & > * {

            margin: .2rem 0;
            text-align: center;
        }
    }

    .pointer {
        cursor: pointer;
    }

    .dialogDesc {

        font-size: 1.2rem;
        margin: 2rem 0;
    }

    li {
        margin: 1rem 0;
    }

    .disableClass {
        margin-top: 2rem;
        text-align: center;
        height: 3rem;
        background-color: #ACD7E6;
        color: white;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .linkBt {
        margin-top: 2rem;
        text-align: center;
        height: 3rem;
        background-color: #0594C6;
        color: white;
        display: flex;
        flex-direction: column;
        justify-content: center;


        &:hover {
            background-color: #046F94;
        }
    }

    #configBtDiv {
        text-align: left;
        padding-top: 3rem;

        & > .configBt {
            font-size: 1.2rem;
        }
    }

    #home {
        padding-top: 4rem;
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
        overflow: hidden;
        background-color: #F5F5F5;

        & > .header {
            position: fixed;
            top: 0;
            left: 0;
            background-color: white;
            height: 4rem;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            z-index: 1;
            width: 100%;

            & > div:nth-of-type(1) {
                display: flex;
                flex-direction: column;
                justify-content: center;
                text-align: left;
                padding-left: 3rem;
            }

            & > div:nth-of-type(2) {
                display: flex;
                justify-content: center;

                & > div {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;

                    #svg_logo {
                        height: 4rem;
                        width: 4rem;
                    }
                }

            }

            & > div:nth-of-type(3) {
                display: flex;
                flex-direction: column;
                justify-content: center;
                text-align: right;
                padding-right: 3rem;
            }
        }

        & > div:nth-of-type(2) {
            flex-grow: 1;
            background-color: #F5F5F5;
            text-align: left;


            & > div:nth-of-type(3) {
                padding: 4rem 0 2rem 0;
                font-size: 1.3rem;
                color: #2C3E50;
            }

        }

        & > .footer {
            height: 4rem;
            display: flex;
            justify-content: space-between;
            background-color: white;

            & > .left {
                text-align: left;
                padding-left: 2rem;
                display: flex;
                flex-direction: column;
                justify-content: center;
            }

            & > .center {
                text-align: center;
                display: flex;
                flex-direction: column;
                justify-content: center;
            }

            & > .right {
                text-align: right;
                padding-right: 2rem;
                display: flex;
                flex-direction: column;
                justify-content: center;

                span:nth-of-type(1) {
                    margin-right: 1rem;
                }

                #github_logo {
                    width: 1.1rem;
                    height: 1.1rem;
                }
            }
        }
    }
</style>