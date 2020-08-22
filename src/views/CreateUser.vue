<template>
    <el-row>
        <el-col>
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
        </el-col>
    </el-row>
</template>

<script>
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
            return{
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
            }
        },
        methods:{
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
        },
    }
</script>

<style scoped>

</style>