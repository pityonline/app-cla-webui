<template>
    <el-row>
        <el-col :offset="7" :span="10">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="10rem">

                <el-form-item label-width="0" label="" prop="email">
                    <el-input
                           placeholder="please input email" size="medium" v-model="ruleForm.email">
                    </el-input>
                </el-form-item>
                <el-form-item label-width="0">
                    <el-row align="center">

                        <el-button type="primary" size="medium" @click="submit('ruleForm')">确定</el-button>
                        <el-button size="medium" @click="reset('ruleForm')">重置</el-button>
                    </el-row>
                </el-form-item>
            </el-form>
        </el-col>
    </el-row>
</template>

<script>
    import * as url from '../until/api'
    export default {
        name: "CreateUser",
        data(){
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
                    callback(new Error('please input email'));
                } else {
                    let reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
                    if (reg.test(value)) {
                        callback();
                    } else {
                        callback(new Error('Email format error '))
                    }
                    callback();
                }
                callback();
            };
            return{
                cla_org_id:this.$store.state.loginInfo.cla_org_id,
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
                    emails: '',
                },
            }
        },
        methods:{
            createUser(){
                let obj ={cla_org_id:this.cla_org_id,emails:['ocl@163.com']}
                this.$axios({
                    url:'/api'+url.addEmployeeManager,
                    method:'post',
                    data:obj,
                }).then(res => {
                    console.log(res);
                    this.$message.closeAll()
                    this.$message.success('success')

                }).catch(err => {
                    console.log(err);
                    this.$message.closeAll()
                    // this.$message.error('Please enter the correct old password')
                })
            },
            submit(formName) {
                this.$refs[formName].validate((valid => {
                    if (valid) {
                       this.createUser();
                    } else {
                        console.log('error submit');
                        return false;
                    }
                }))
            },
            reset(formName) {
                this.$refs[formName].resetFields();
            },
        },
    }
</script>

<style scoped>

</style>