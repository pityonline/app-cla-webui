<template>
    <div id="home" :class="homeClass">
        <HeaderPure></HeaderPure>
        <el-row id="section">
            <el-col :offset="9" :span="6">
                <el-form :model="ruleForm" ref="ruleForm" :rules="rules"  label-width="20%">
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
                        <el-button style="width: 100%;" type="primary"  @click="submit('ruleForm')">SUBMIT</el-button>
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
    import * as url from '../until/api'
    import * as until from '../until/until'
    window.onresize = () => {
        // console.log(until.getClientHeight());
        if (until.getClientHeight() > document.getElementById('home').offsetHeight) {
            document.getElementById("home").style.height = until.getClientHeight() + 'px'
        }
    }
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
                homeClass:{
                    height:'',
                },
                ruleForm:{
                    email:'',
                    name:'',
                    country:'',
                    language:'',
                },
                rules:{
                    name: [
                        {required: true, message: '请输入姓名', trigger: 'blur'},
                        {min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur'}
                    ],
                    email: [
                        {required: true, message: '请输入邮箱', trigger: 'blur'},
                        {validator: verifyEmail, trigger: 'blur'}
                    ],
                    country: [
                        {required: true, message: '请选择国家', trigger: 'blur'},

                    ],
                    language: [
                        {required: true, message: '请选择语言', trigger: 'blur'},

                    ],

                },


            }
        },
        methods:{
            /*设置页面高度*/
            setClientHeight() {
                this.$nextTick(() => {
                    console.log(until.getClientHeight(),document.getElementById('home').offsetHeight);
                    until.getClientHeight() > document.getElementById('home').offsetHeight ?
                        this.homeClass.height = until.getClientHeight() + 'px' :
                        this.homeClass.height = document.getElementById('home').offsetHeight

                })
            },
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
         created() {
         },
        mounted() {
            this.setClientHeight();
        }
    }
</script>

<style scoped lang="less">
    #section {
        padding: 10rem 0;
        background-color: #F5F5F5;
    }
</style>