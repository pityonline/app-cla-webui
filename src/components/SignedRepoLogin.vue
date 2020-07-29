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

</style>