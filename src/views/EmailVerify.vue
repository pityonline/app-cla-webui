<template>
    <div id="emailVerify" :style="homeClass">
        <HeaderPure></HeaderPure>
        <el-row id="section">
            <el-col :offset="9" :span="6">

            </el-col>
        </el-row>
        <el-dialog
                title="Mailbox verification"
                :visible.sync="dialogVisible"
                :close-on-press-escape="false"
                :close-on-click-modal="false"
                width="30%">
            <el-row>
                <el-col align="center">
                    <p>{{message}}</p>

                </el-col>
            </el-row>
        </el-dialog>
        <Footer></Footer>
    </div>
</template>

<script>
    import HeaderPure from '@components/HeaderPure'
    import Footer from '@components/Footer'
    import * as url from '../until/api'
    import * as until from '../until/until'
    import http from '../until/http'

    window.onresize = () => {
        // console.log(until.getClientHeight());
        if (until.getClientHeight() > document.getElementById('emailVerify').offsetHeight) {
            document.getElementById("emailVerify").style.height = until.getClientHeight() + 'px'
        }
    }
    export default {
        name: "EmailVerify",
        components: {
            HeaderPure,
            Footer,
        },
        data() {
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
            return {
                homeClass: {
                    height: '',
                },
                ruleForm: {
                    email: '',
                    name: '',
                    country: '',
                    language: '',
                },
                rules: {
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
        methods: {
            verifyEmail() {
                http({
                        url: `${url.enableEmployee}/${email}`,
                        method: 'put',
                        data: data,
                    }
                ).then(res => {
                    this.message = 'sign cla successfully'
                }).catch(err => {
                    this.message='sign cla fail'
                    console.log(err);
                });
            },

            /*设置页面高度*/

            setClientHeight() {
                this.$nextTick(() => {
                    console.log(until.getClientHeight(), document.getElementById('emailVerify').offsetHeight);
                    if (until.getClientHeight() > document.getElementById('emailVerify').offsetHeight) {
                        console.log('>>>');
                        document.getElementById("emailVerify").style.height = until.getClientHeight() + 'px'
                    }

                    console.log(until.getClientHeight(), document.getElementById('emailVerify').offsetHeight);


                })
            }
        },
        created() {
            this.verifyEmail()
        }
        ,
        mounted() {
            this.setClientHeight();
        }
    }
</script>

<style scoped lang="less">
    #emailVerify {
        display: flex;
        flex-direction: column;

        #section {
            flex-grow: 1;
            padding: 10rem 0;
            background-color: #F5F5F5;
        }
    }

</style>