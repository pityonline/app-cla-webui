<template>
    <div id="checkCLA" :style="checkCLAClass">
        <!--<Header></Header>-->
        <div class="header">

            <el-col :offset="8" :span="8">
                <div>

                    <svg-icon class="pointer" @click="" id="svg_logo" icon-class="logo_b"/>
                </div>
            </el-col>


        </div>
        <div id="section">
            <div v-if="!isSendCode" class="content">
                <el-col :offset="6" :span="12">
                    <p class="contentTitle">Please sign the CLA for <span>{{repo}}</span></p>

                    <el-row>
                        <span class="size_s">Version: 2020-06-17</span>
                        <el-select
                                style="width: 6rem;margin-left: 2rem"
                                size="small"
                                v-model="value"
                                value=""
                                @change="changeLanguage">
                            <el-option
                                    v-for="item in languageOptions"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-row>


                    <div class="marginTop1rem" id="claBox" style="white-space: pre-wrap">

                    </div>

                    <el-divider></el-divider>

                    <el-row class="marginTop1rem">
                        <el-col :span="16">
                            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-position="left"
                                     label-width="30%"
                                     class="demo-ruleForm">
                                <el-form-item v-for="(item,index) in fields"
                                              :label="item.title"
                                              :required="item.required"
                                              :prop="item.type">

                                    <el-input v-if="item.type==='email'" :readonly="loginType!=='corporation'"
                                              v-model="ruleForm.individualEmail"
                                              size="small"></el-input>

                                    <el-input v-else-if="item.type==='date'" readonly="" v-model="ruleForm[item.type]"
                                              size="small"></el-input>
                                    <el-input v-else v-model="ruleForm[item.type]" size="small"></el-input>
                                </el-form-item>
                                <el-form-item
                                        v-if="loginType==='corporation'"
                                        label="VerifyCode"
                                        required=""
                                        prop="code">

                                    <el-input v-model="ruleForm.code" size="small">
                                        <el-button slot="append" :disabled="sendBtText!=='send code'"
                                                   @click="sendCode()">{{sendBtText}}
                                        </el-button>
                                    </el-input>
                                </el-form-item>
                                <p style="font-size: .9rem;" class="borderClass">{{desc.metadataDesc}}</p>
                                <div class="marginTop1rem">
                                    <el-checkbox v-model="isRead">I have read the Privacy Policy and hereby consent to
                                        the processing of my data by openLooKeng in Hong Kong"
                                    </el-checkbox>
                                </div>
                                <el-form-item label-width="0" class="marginTop1rem">
                                    <el-button :disabled="!isRead" type="primary" @click="submitForm('ruleForm')">
                                        {{desc.sign}}
                                    </el-button>
                                    <el-button @click="resetForm('ruleForm')">{{desc.reset}}</el-button>
                                </el-form-item>
                            </el-form>
                            <!--<div style="margin-top: 1rem;text-align: left">-->
                            <!--<el-button style="font-size: 1rem" type="primary">Agree</el-button>-->
                            <!--</div>-->
                        </el-col>
                    </el-row>


                </el-col>
            </div>
            <div v-else-if="!isVerify" class="content ">
                <el-col :offset="6" :span="12" class="verifyClass">
                    <p>请输入6位数验证码完成验证</p>
                    <el-row>
                        <el-col :span="6" style="margin-right: 2rem">

                            <el-input v-model="verifyCode" size="medium"></el-input>
                        </el-col>
                        <el-col :span="6">
                            <el-button type="primary" size="medium" @click="verify()">确定</el-button>
                        </el-col>
                    </el-row>

                </el-col>
            </div>
            <div v-else class="content">
                <el-col :offset="6" :span="12" class="verifyClass">
                    <p style="text-align: center">
                        {{passContent}}
                    </p>
                </el-col>
            </div>
        </div>

        <Footer></Footer>

    </div>
</template>

<script>
    import Header from '@components/Header'
    import Footer from '@components/Footer'
    import * as until from '../until/until'
    import * as url from '../until/api'
    import {mapActions} from 'vuex'
    import md5 from 'js-md5'

    export default {

        name: "CheckCLA",
        computed: {
            loginType() {
                return this.$store.state.loginType
            },
        },
        components: {
            Header,
            Footer
        },
        data() {
            let verifyEmail = (rule, value, callback) => {
                let email = value;
                console.log(email);
                let reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
                if (reg.test(email)) {
                    callback();
                } else {
                    callback(new Error('Email format error'))
                }
            }
            let verifyTel = (rule, value, callback) => {
                if (!value) {
                    callback();
                } else {

                    let reg = /^1[3456789]\d{9}$/;
                    if (reg.test(value)) {
                        callback();
                    } else {
                        callback(new Error('电话号码有误'))
                    }
                    callback();
                }
            }
            let verifyAddr = (rule, value, callback) => {
                if (!value) {
                    callback(new Error('请输入地址'))
                }
                callback();
            }

            return {
                cla_org_id: '',

                sendBtText: 'send code',
                claOrgIdArr: [],
                fields: [],
                claIdArr: [],
                desc: '',
                enDesc: {
                    personalContributor: 'Individual Contributor',
                    comContributor: 'Legal Entity Contributor',
                    metadataDesc: '* require field. ',
                    sign: 'SIGN',
                    reset: 'RESET',
                },
                cnDesc: {
                    personalContributor: '个人贡献者',
                    comContributor: '企业贡献者',
                    metadataDesc: '*为必填项',
                    sign: '签署',
                    reset: '重置',
                },
                passContent: '',
                isVerify: false,
                isSendCode: false,
                verifyCode: '',
                platform: this.$store.state.platform,
                dialogVisible: false,
                repositoryOptions: [],
                repo: '',
                role: '0',
                ruleForm: {
                    code: '',
                    adminEmail: '',
                    corporationName: '',
                    name: '',
                    email: '',
                    telephone: '',
                    date: '',
                    fax: '',
                    address: '',
                    individualEmail: '',

                },
                rules: {
                    code: [{required: true, message: 'Please enter the verification code', trigger: 'blur'},],
                    name: [
                        {required: true, message: 'please input name', trigger: 'blur'},
                        {min: 2, max: 10, message: 'The length is between 2 and 10 characters', trigger: 'blur'}
                    ],
                    email: [{required: true, message: 'please input email', trigger: 'blur'},
                        {validator: verifyEmail, trigger: 'blur'}],
                    date: [{required: true, message: 'please input date', trigger: 'blur'}],
                    telephone: [
                        {validator: verifyTel, trigger: 'blur'}
                    ],
                    address: [
                        {validator: verifyAddr, trigger: 'blur'}
                    ],


                },
                isRead: false,
                value: 0,
                languageOptions: [{
                    value: 0,
                    label: 'english'
                }, {
                    value: 1,
                    label: 'chinese'
                },],
                metadataArr: [],
                checkCLAClass: {
                    height: '',
                },
            }
        },
        methods: {
            ...mapActions(['setTokenAct', 'setRepoInfoAct']),
            sendCode() {
                console.log('sendcode');

                this.$axios({
                    url: '/api' + url.sendVerifyCode,
                    method: 'post',
                    data: {cla_org_id: this.cla_org_id, email: this.ruleForm.adminEmail},

                }).then(res => {
                    console.log(res);
                    let second = 60
                    let codeInterval = setInterval(() => {
                        if (second !== 0) {
                            second--
                            this.sendBtText = second + 's'
                        } else {
                            this.sendBtText = 'send code'
                            clearInterval(codeInterval)
                        }
                    }, 1000)
                }).catch(err => {
                    console.log(err);
                })
            },
            getNowDate() {
                let date = new Date();
                let year, month, day
                year = date.getFullYear()
                console.log(date.getFullYear(), date.getMonth() + 1, date.getDate());
                date.getMonth() < 9 ? month = `0${date.getMonth() + 1}` : month = date.getMonth() + 1;
                date.getDate() < 10 ? day = `0${date.getDate()}` : day = date.getDate()
                this.ruleForm.date = year + '-' + month + '-' + day

            },
            getEmail(access_token, refresh_token) {
                this.$axios({
                    url: url.getEmail,
                    params: {access_token: access_token}
                }).then(res => {
                    console.log(res);
                    this.ruleForm.individualEmail = res.data[0].email

                }).catch(err => {
                    console.log(err);
                })
            },

            getCookieData() {
                if (document.cookie !== '') {
                    let cookieArr = document.cookie.split('; ')
                    let access_token, refresh_token, platform_token = '';
                    cookieArr.forEach((item, index) => {
                        let arr = item.split('=');
                        arr[0] === 'access_token' ? access_token = arr[1] : arr[0] === 'refresh_token' ? refresh_token = arr[1] : arr[0] === 'platform_token' ? platform_token = arr[1] : platform_token = '';
                        ;
                    })
                    let data = {access_token, refresh_token, platform_token};
                    this.setTokenAct(data);
                    if (this.loginType !== 'corporation') {
                        this.getEmail(platform_token, refresh_token)
                    }
                }

            },
            getSignPage() {
                console.log('getSignPage');
                this.changeDesc('english');
                let applyTo = '';
                if (this.$store.state.loginType === 'individual' || this.$store.state.loginType === 'employee') {
                    this.rules = {
                        code: [{required: true, message: 'Please enter the verification code', trigger: 'blur'},],
                        individualEmail: [{required: true, message: 'Please set the email', trigger: 'blur'},],
                        name: [
                            {required: true, message: 'please input name', trigger: 'blur'},
                            {min: 2, max: 10, message: 'The length is between 2 and 10 characters', trigger: 'blur'}
                        ],
                    }
                    this.ruleForm = {
                        code: '',
                        adminEmail: '',
                        corporationName: '',
                        name: '',
                        telephone: '',
                        date: '',
                        fax: '',
                        address: '',
                        individualEmail: '',
                    }
                    applyTo = 'individual';
                } else {
                    applyTo = 'corporation';

                }
                this.$axios({
                    url: `/api${url.getSignPage}/${this.$store.state.repoInfo.platform}/${this.$store.state.repoInfo.org_id}/${applyTo}`,
                    params: {
                        repo_id: this.$store.state.repoInfo.repo_id,
                    }

                }).then(res => {
                    console.log(res);
                    if (res.data.length) {
                        this.languageOptions = []
                        this.claIdArr = []
                        this.claOrgIdArr = []
                        res.data.forEach((item, index) => {
                            if (item.cla_language === 'english') {
                                this.value = index;

                                console.log('find claText');
                                this.getClaText(item.cla_id)

                            }
                            this.languageOptions.push({value: index, label: item.cla_language})
                            this.claIdArr.push(item.cla_id)
                            this.claOrgIdArr.push(item.id)
                        })
                        this.cla_org_id = this.claOrgIdArr[this.value]

                    }

                }).catch(err => {
                    console.log(err);
                })
            },
            changeLanguage(value) {
                this.changeDesc(this.languageOptions[value].label);
                this.getClaText(this.claIdArr[value])
                this.cla_org_id = this.claOrgIdArr[value]
            },
            changeDesc(language) {
                if (language === 'english') {
                    this.desc = this.enDesc;
                } else if (language === 'chinese') {
                    this.desc = this.cnDesc;
                }
            },

            /*查找clatext*/
            getClaText(cla_id) {
                this.$axios({
                    url: `/api${url.getClaInfo}/${cla_id}`,
                    headers: {'Token': this.$store.state.access_token},
                }).then(resp => {
                    console.log(resp);
                    document.getElementById('claBox').innerHTML = resp.data.text
                    this.fields = resp.data.fields

                }).catch(err => {
                    console.log(err);
                })
            },
            toHome() {
                this.$router.push('/home')
            },


            /*发送验证码*/
            signCla() {

                let info = {}
                let myUrl = '';
                let obj = {};
                for (let key in this.ruleForm) {
                    console.log(key);
                    if (this.ruleForm[key] !== '') {
                        this.fields.title
                        Object.assign(info, {[key]: this.ruleForm[key]})
                    }
                }
                console.log(info);
                if (this.$store.state.loginType === 'individual') {
                    myUrl = url.individual_signing;
                    obj = {
                        cla_org_id: this.claOrgIdArr[this.value],
                        email: this.ruleForm.individualEmail,
                        info: info,
                    }

                } else if (this.$store.state.loginType === 'corporation') {

                    myUrl = url.corporation_signing;
                    obj = {
                        cla_org_id: this.claOrgIdArr[this.value],
                        corporation_name: this.ruleForm.corporationName,
                        admin_name: this.ruleForm.name,
                        admin_email: this.ruleForm.adminEmail,
                        enabled: true,
                        info: info,
                        verifi_code: this.ruleForm.code,
                    }
                } else if (this.$store.state.loginType === 'employee') {
                    myUrl = url.employee_signing;
                    obj = {
                        name: this.ruleForm.name,
                        cla_org_id: this.claOrgIdArr[this.value],
                        email: this.ruleForm.individualEmail,
                        info: info,
                    }
                }

                this.sign(myUrl, obj)
            },

            sign(myUrl, obj) {
                console.log(myUrl, obj);
                this.$axios({
                    url: '/api' + myUrl,
                    method: 'post',
                    data: obj,
                    headers: {
                        'Access-Token': this.$store.state.access_token,
                        'Refresh-Token': this.$store.state.refresh_token,
                        'User': `${this.platform}/${this.$store.state.user.userName}`
                    }
                }).then(res => {
                    console.log(res);
                    this.$message.closeAll()
                    this.$message.success('sign successfully')
                    // this.dialogVisible = true;
                    this.resetForm('ruleForm')
                    this.isRead = false;
                    // this.isSendCode = true;

                }).catch(err => {
                    console.log(err);
                })
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        // this.dialogVisible = true
                        // console.log(this.$store.state.loginType);
                        this.signCla();

                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            getRepositoriesOfOrg(org, org_id) {
                let obj = {access_token: this.$store.state.access_token, org: org, page: 1, per_page: 10};
                console.log("getRepositoriesOfOrg", obj);
                this.$axios({
                    url: `https://gitee.com/api/v5/orgs/${org}/repos`,
                    params: obj,
                    headers: {
                        'Access-Token': this.$store.state.access_token,
                        'Refresh-Token': this.$store.state.refresh_token,
                        'User': `${this.platform}/${this.$store.state.user.userName}`
                    }
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
                    until.getClientHeight() > document.getElementById('checkCLA').offsetHeight ?
                        this.checkCLAClass.height = until.getClientHeight() + 'px' :
                        this.checkCLAClass.height = document.getElementById('checkCLA').offsetHeight

                })
                console.log(document.getElementById('checkCLA').offsetHeight);
            },


        },

        created() {
            this.getCookieData()
            this.getSignPage();
            this.getNowDate()


        },
        mounted() {
            this.setClientHeight();
            this.resetForm('ruleForm')
        }
    }
    window.onresize = () => {
        // console.log(until.getClientHeight());
        if (until.getClientHeight() > document.getElementById('checkCLA').offsetHeight) {
            document.getElementById("checkCLA").style.height = until.getClientHeight() + 'px'
        }
    }
</script>

<style lang="less">
    .codeBox .el-button--medium, .codeBox .el-button {
        border-radius: 0 4px 4px 0;
    }

    .codeBox .el-input__inner {
        border-radius: 4px 0 0 4px;
    }

    .el-button.is-disabled, .el-button.is-disabled:focus, .el-button.is-disabled:hover {
        cursor: pointer;
    }

    .pointer {
        cursor: pointer;
    }

    .header {
        position: fixed;
        top: 0;
        left: 0;
        background-color: #ececec;
        height: 4rem;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        z-index: 1;
        width: 100%;


        & > div:nth-of-type(1) {
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


    }

    .verifyClass {
        padding: 10rem 0;

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

    #checkCLA {
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
        padding-top: 4rem;

        & > .header {
            height: 4rem;
            width: 100%;
        }

        & > #section {
            flex-grow: 1;
            background-color: #F5F5F5;

            & > .content {
                padding: 1rem;
                text-align: left;


            }
        }

        & > .footer {
            height: 4rem;
            width: 100%;
        }


    }
</style>