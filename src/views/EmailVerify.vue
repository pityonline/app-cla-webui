<template>
    <div>
        <HeaderPure></HeaderPure>
        <el-row style="padding: 5rem 0">
            <el-col :offset="8" :span="8">
                <el-form :model="ruleForm" ref="ruleForm" :rules="rules"  label-width="30%">
                    <el-form-item label="email" prop="email">
                        <el-input placeholder="email"></el-input>
                    </el-form-item>
                    <el-form-item label="name" prop="name">
                        <el-input placeholder="name"></el-input>
                    </el-form-item>
                    <el-form-item label="country" prop="country">
                        <el-input placeholder="country"></el-input>
                    </el-form-item>
                    <el-form-item label="language" prop="language">
                        <el-input placeholder="language"></el-input>
                    </el-form-item>
                    <el-form-item >
                        <el-button type="primary"  @click="submit('ruleForm')">SUBMIT</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
        <Footer></Footer>
    </div>
</template>

<script>
    import HeaderPure from '@components/HeaderPure'
    import Footer from '@components/Footer'
    export default {
        name: "EmailVerify",
        components: {
            HeaderPure,
            Footer,
        },
        data(){
            let verifyEmail = (rule, value, callback) => {
                let email = value;
                console.log(email);
                let reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
                if (reg.test(email)) {
                    callback();
                } else {
                    callback(new Error('邮箱格式有误'))
                }
            }
            return{
                ruleForm:{
                    email:'',
                    name:'',
                    country:'',
                    language:'',
                },
                name: [
                    {required: true, message: '请输入姓名', trigger: 'blur'},
                    {min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur'}
                ],
                email: [
                    {required: true, message: '请输入邮箱', trigger: 'blur'},
                    {validator: verifyEmail, trigger: 'blur'}
                ],

            }
        },
        methods:{
            submit(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        console.log('发邮件');;
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
        },
    }
</script>

<style scoped lang="less">
    #section {
        padding: 5rem 0;
        background-color: #F5F5F5;
    }
</style>