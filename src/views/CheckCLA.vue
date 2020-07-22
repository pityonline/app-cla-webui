<template>
    <div id="checkCLA" :style="checkCLAClass">
        <v-header></v-header>
        <div id="section">
            <el-col :offset="6" :span="12">
                <p class="contentTitle">Please sign the CLA for <span>{{repo}}</span></p>

                <p class="size_s">Version: 2020-06-17</p>


                <div id="claBox" style="white-space: pre-wrap">

                </div>


                <div class="marginTop1rem">
                    <el-checkbox v-model="isRead">已经阅读过协议</el-checkbox>
                </div>
                <el-row class="marginTop1rem ">


                    <el-col :span="8" class="borderClass">
                        <el-radio label="0" v-model="role">个人贡献者</el-radio>
                    </el-col>
                    <el-col :span="8" class="borderClass">
                        <el-radio label="1" v-model="role">企业贡献者</el-radio>
                    </el-col>

                </el-row>
                <el-row class="marginTop1rem">
                    <el-col :span="16">
                        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-position="left" label-width="30%"
                                 class="demo-ruleForm">
                            <el-form-item v-for="(item,index) in metaData" :label="item.label" :required="item.required"
                                          :prop="item.prop">
                                <el-input v-model="ruleForm[item.prop]"></el-input>
                            </el-form-item>
                            <p style="font-size: .9rem;" class="borderClass">*为必填项，请确保你的邮箱与gitee账号绑定</p>
                            <el-form-item label-width="0">
                                <el-button :disabled="!isRead" type="primary" @click="submitForm('ruleForm')">签署
                                </el-button>
                                <el-button @click="resetForm('ruleForm')">重置</el-button>
                            </el-form-item>
                        </el-form>
                        <!--<div style="margin-top: 1rem;text-align: left">-->
                        <!--<el-button style="font-size: 1rem" type="primary">Agree</el-button>-->
                        <!--</div>-->
                    </el-col>
                </el-row>


            </el-col>
        </div>
        <v-footer></v-footer>
        <el-dialog
                title=""
                top="5vh"
                :visible.sync="dialogVisible"
                width="70%">
            <div style="margin-bottom: 1rem">
            请在10分钟内点击邮箱{{ruleForm.email}}中的链接进行验证

            </div>
            <div>
                <el-button type="primary" size="medium" @click="dialogVisible=false">确定</el-button>
            </div>
            <div class="paginationClass">
                <el-pagination
                        background
                        :page-size="5"
                        :pager-count="5"
                        :hide-on-single-page="true"
                        :current-page="listCurrentPage"
                        @current-change="listChangePage"
                        layout="prev, pager, next"
                        :total="listData.length">
                </el-pagination>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import Header from '@components/Header'
    import Footer from '@components/Footer'
    import * as until from '../until/until'
    import * as url from '../until/api'

    export default {

        name: "CheckCLA",
        components: {
            'v-header': Header,
            'v-footer': Footer
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
            let verifyTel = (rule, value, callback) => {
                let tel = value;
                console.log(tel);
                let reg = /^1[3456789]\d{9}$/;
                if (reg.test(tel)) {
                    callback();
                } else {
                    callback(new Error('电话号码有误'))


                }
            }
            return {
                platform:this.$store.state.platform,
                dialogVisible:false,
                repositoryOptions: [],
                repo: '',
                role: '0',
                ruleForm: {
                    name: '',
                    email: '',
                    tel: '',
                    date1: '',

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
                    date1: [
                        {type: 'date', required: true, message: '请选择日期', trigger: 'change'}
                    ],

                    tel: [
                        {required: true, message: '请输入电话号码', trigger: 'blur'},
                        {validator: verifyTel, trigger: 'blur'}
                    ],

                },
                isRead: false,
                value: "0",
                languageOptions: [{
                    value: '0',
                    label: 'english'
                }, {
                    value: '1',
                    label: 'chinese'
                },],
                claText: '          通过签署贡献协议（“本协议”），签署的“贡献者”同意接受“本协议”并受“本协议”约束。“本协议”适用于“贡献者”提交给openEuler社区 （“社区”）的全部项目（后称“项目”）的“贡献”，无论“贡献”是在签署日期之前，签署时还是之后提供。\n' +
                    '\n' +
                    '       “贡献” 是指受版权法保护的，由“贡献者”有意“提交”以包含在“项目”所分发软件中任何作品。“提交”是指以电子，口头或书面交流的任何形式送给“社区”管理方或其代表，包括但不限于“社区”管理方为管理的为讨论和改进项目所提供的电子邮件列表上的交流，源代码控制系统以及由“社区”管理方或其代表管理的问题跟踪系统，但不包括由“我”明确标记或以书面形式指定为“非贡献”的交流。\n' +
                    '\n' +
                    '       “贡献者”或“我”是指下面签名栏中标明的个人或法人实体。对于法人实体，做出“贡献”的实体以及由该实体控制、受其控制或受其共同控制的所有其他实体均被视为“贡献者”。就本定义而言，“控制”是指有受控方或共同受控方至少50%直接或间接的投票权，资金或其他有价证券。\n' +
                    '\n' +
                    '       “贡献者”授予“社区”管理方和由“项目”所分发的软件的每个接收者一个永久性的、全球性的、免费的、非独占的、不可撤销的、有分许可权的版权许可，供其复制、使用、修改、分发其“贡献”，不论修改与否。',
                metaData: [
                    {
                        label: '姓名',
                        prop: 'name',
                        required: true,
                    },
                    {
                        label: '邮箱',
                        prop: 'email',
                        required: true,
                    },
                    {
                        label: '电话',
                        prop: 'tel',
                        required: true,
                    },

                ],
                checkCLAClass: {
                    height: '',
                },
            }
        },
        methods: {
            signCla() {
                let code=`${Math.floor(Math.random()*10)}${Math.floor(Math.random()*10)}${Math.floor(Math.random()*10)}${Math.floor(Math.random()*10)}${Math.floor(Math.random()*10)}${Math.floor(Math.random()*10)}`
                let obj = {
                    code:code,
                    role: this.role,
                    name: this.ruleForm.name,
                    email: this.ruleForm.email,
                    tel: this.ruleForm.tel
                }
                console.log(obj);
                this.$axios({
                    url: '/api'+url.signCla,
                    method: 'post',
                    data: obj,
                    headers: {'Access-Token': this.$store.state.access_token, 'Refresh-Token': this.$store.state.refresh_token,'User':`${this.platform}/${this.$store.state.user.userName}`}
                }).then(res => {
                    console.log(res);
                }).catch(err => {
                    console.log(err);
                })
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.dialogVisible=true
                        this.signCla();
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            getClaAndMetadata() {

                console.log("getClaAndMetadata", obj);
                this.$axios({
                    url: '/api' + url.getCla,
                    headers: {'Access-Token': this.$store.state.access_token, 'Refresh-Token': this.$store.state.refresh_token,'User':`${this.platform}/${this.$store.state.user.userName}`}

                }).then(res => {
                    console.log(res);
                    if (res.status === 200) {
                        this.claText = res.data.cla;
                        this.metaData = res.data.metadata;
                    }
                }).catch(err => {
                    console.log(err);
                })
            },
            getRepositoriesOfOrg(org, org_id) {
                let obj = {access_token: this.$store.state.access_token, org: org, page: 1, per_page: 10};
                console.log("getRepositoriesOfOrg", obj);
                this.$axios({
                    url: `https://gitee.com/api/v5/orgs/${org}/repos`,
                    params: obj,
                    headers: {'Access-Token': this.$store.state.access_token, 'Refresh-Token': this.$store.state.refresh_token,'User':`${this.platform}/${this.$store.state.user.userName}`}
                }).then(res => {
                    console.log(res);
                    if (res.status === 200) {
                        this.repositoryOptions = [];
                        res.data.forEach((item, index) => {
                            this.repositoryOptions.push({
                                value: index,
                                org: org,
                                org_id: org_id,
                                repoName: item.name,
                                label: `${org}/${item.name}`,
                                id: item.id
                            });
                        })
                    }
                }).catch(err => {
                    console.log(err);
                })
            },


            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            setClientHeight() {
                this.$nextTick(() => {
                    console.log(until.getClientHeight());
                    console.log(document.getElementById('checkCLA').offsetHeight);
                    until.getClientHeight() > document.getElementById('checkCLA').offsetHeight ?
                        this.checkCLAClass.height = until.getClientHeight() + 'px' :
                        this.checkCLAClass.height = document.getElementById('checkCLA').offsetHeight

                })
            },
            setClaContent() {
                document.getElementById('claBox').innerHTML = this.claText
            },
        },

        created() {
            this.getClaAndMetadata();
        },
        mounted() {
            this.setClientHeight();
            this.setClaContent();

        }
    }
    window.onresize = () => {
        // console.log(until.getClientHeight());
        if (until.getClientHeight() > document.getElementById('checkCLA').offsetHeight) {
            document.getElementById("checkCLA").style.height = until.getClientHeight() + 'px'
        }
    }
</script>

<style scoped lang="less">
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

    #checkCLA {
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
        padding-top: 4rem;

        & > #section {
            padding: 1rem;
            text-align: left;
            flex-grow: 1;
            background-color: #F5F5F5;

        }
    }
</style>