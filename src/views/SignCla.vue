<template>
    <el-row id="checkCLA" :style="checkCLAClass">
        <Header></Header>

        <el-row id="section">
            <el-row v-if="!isSendCode" class="content">
                <el-col :offset="6" :span="12">
                    <p class="contentTitle">Please sign the CLA for <span>{{repo}}</span></p>


                    <el-row class="marginTop3rem" id="claBox">
                    </el-row>


                    <el-row class="marginTop3rem form">
                        <el-col>
                            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-position="left"
                                     label-width="20%"
                                     class="demo-ruleForm">
                                <el-form-item v-for="(item,index) in fields"
                                              :label="item.title"
                                              :required="item.required"
                                              :prop="item.id">

                                    <el-input v-if="item.type==='email'" :readonly="loginType!=='corporation'"
                                              v-model="ruleForm[item.id]"
                                              size="small" @blur="setMyForm(item.type,ruleForm[item.id])"></el-input>

                                    <el-input v-else-if="item.type==='date'" readonly="" v-model="ruleForm[item.id]"
                                              size="small" @blur="setMyForm(item.type,ruleForm[item.id])"></el-input>
                                    <el-input v-else v-model="ruleForm[item.id]" size="small"
                                              @blur="setMyForm(item.type,ruleForm[item.id])"></el-input>
                                </el-form-item>
                                <el-form-item
                                        v-if="loginType==='corporation'"
                                        label="Verify Code"
                                        required=""
                                        prop="code">

                                    <el-input v-model="ruleForm.code" size="small">
                                        <el-button slot="append" :disabled="sendBtText!=='send code'"
                                                   @click="sendCode()">{{sendBtText}}
                                        </el-button>
                                    </el-input>
                                </el-form-item>
                                <p style="font-size: .9rem;" class="borderClass"><span style="color: #F56C6C;">*</span>{{desc.metadataDesc}}
                                </p>
                                <div class="marginTop1rem">
                                    <el-checkbox v-model="isRead">I have read the Privacy Policy and hereby consent to
                                        the processing of my data by openLooKeng in Hong Kong"
                                    </el-checkbox>
                                </div>
                                <el-form-item label-width="0" class="marginTop1rem signBtBox">
                                    <button class="button" @click="submitForm('ruleForm')">
                                        {{desc.sign}}
                                    </button>
                                    <!--<el-button @click="resetForm('ruleForm')">{{desc.reset}}</el-button>-->
                                </el-form-item>
                            </el-form>
                        </el-col>
                    </el-row>
                </el-col>
            </el-row>

        </el-row>

        <Footer></Footer>
        <el-dialog
                title=""
                top="5vh"
                :close-on-press-escape="false"
                :show-close="false"
                :close-on-click-modal="false"
                :visible.sync="tipsDialogVisible"
                width="50%">
            <el-row>
                <el-col align="center">
                    <p>{{tipsMessage}}</p>
                    <el-button style="margin-top: 3rem" type="primary" size="medium" @click="clickOk()">OK</el-button>
                </el-col>
            </el-row>
        </el-dialog>

    </el-row>
</template>

<script>
    import Header from '@components/NewHeader'
    import Footer from '@components/NewFooter'
    import * as until from '../until/until'
    import * as url from '../until/api'
    import {mapActions} from 'vuex'

    export default {

        name: "CheckCLA",
        computed: {
            loginType() {
                return this.$store.state.loginType
            },
            platform_token() {
                return this.$store.state.platform_token
            },
            access_token() {
                return this.$store.state.access_token
            },
            refresh_token() {
                return this.$store.state.refresh_token
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
                        callback(new Error('telephone format error'))
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
                tipsMessage: 'Signed successfully.We have sent a notification email to your email address. Please check it',
                tipsDialogVisible: false,
                signPageData: '',
                cla_org_id: '',
                sendBtText: 'send code',
                claOrgIdArr: [],
                fields: [],
                claIdArr: [],
                desc: '',
                enDesc: {
                    personalContributor: 'Individual Contributor',
                    comContributor: 'Legal Entity Contributor',
                    metadataDesc: ' require field. ',
                    sign: 'SIGN',
                    reset: 'RESET',
                },
                cnDesc: {
                    personalContributor: '个人贡献者',
                    comContributor: '企业贡献者',
                    metadataDesc: '为必填项',
                    sign: '签署',
                    reset: '重置',
                },
                isVerify: false,
                isSendCode: false,
                verifyCode: '',
                platform: this.$store.state.platform,
                dialogVisible: false,
                repositoryOptions: [],
                repo: '',
                role: '0',
                // ruleForm: {
                //     code: '',
                //     adminEmail: '',
                //     corporationName: '',
                //     name: '',
                //     email: '',
                //     telephone: '',
                //     date: '',
                //     fax: '',
                //     address: '',
                // },

                ruleForm: {},
                myForm: {},
                rules: {},
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
            clickOk() {
                this.$router.go(-1)
                this.tipsDialogVisible = false;
            },
            async verifyTel(rule, value, callback) {
                if (!value) {
                    callback();
                } else {

                    let reg = /^1[3456789]\d{9}$/;
                    if (reg.test(value)) {
                        callback();
                    } else {
                        callback(new Error('telephone format error'))
                    }
                    callback();
                }
            },
            async verifyAddr(rule, value, callback) {
                if (!value) {
                    callback(new Error('please input address'))
                }
                callback();
            },
            async verifyFormEmail(rule, value, callback) {
                let email = value;
                // console.log(email);
                let reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
                if (reg.test(email)) {
                    callback();
                } else {
                    callback(new Error('Email format error'))
                }
            },
            setMyForm(type, value) {
                this.myForm[type] = value
                console.log(this.myForm[type]);
            },
            sendCode() {
                console.log('sendcode');

                this.$axios({
                    url: '/api' + url.sendVerifyCode,
                    method: 'post',
                    data: {cla_org_id: this.cla_org_id, email: this.myForm.adminEmail},

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
                    this.$message.closeAll()
                    this.$message.error(err.response.data)
                })
            },
            getNowDate() {

                let date = new Date();
                let year, month, day
                year = date.getFullYear()
                console.log(date.getFullYear(), date.getMonth() + 1, date.getDate());
                date.getMonth() < 9 ? month = `0${date.getMonth() + 1}` : month = date.getMonth() + 1;
                date.getDate() < 10 ? day = `0${date.getDate()}` : day = date.getDate()
                console.log(this.fields);
                console.log(this.ruleForm);

                for (let item of this.fields) {
                    console.log(item);
                    if (item.type === 'date') {
                        this.myForm.date = year + '-' + month + '-' + day
                        Object.assign(this.ruleForm, {[item.id]: year + '-' + month + '-' + day})
                        break;
                    }
                }
                console.log(this.ruleForm);
                if (this.loginType !== 'corporation') {
                    this.getEmail(this.platform_token, this.refresh_token)
                }
            },
            getEmail(access_token, refresh_token) {
                this.$axios({
                    url: url.getEmail,
                    params: {access_token: access_token}
                }).then(res => {
                    console.log(res);
                    for (let item of res.data) {
                        console.log(item);
                        if (item.scope) {
                            if (item.scope[0] === 'primary') {
                                this.myForm.email = item.email;
                                console.log(this.myForm.email);
                                break
                            }
                        }
                    }
                    for (let item of this.fields) {
                        if (item.type === 'email') {
                            Object.assign(this.ruleForm, {[item.id]: this.myForm.email})
                            break;
                        }
                    }
                    console.log(this.ruleForm);
                }).catch(err => {
                    console.log(err);
                    this.$message.closeAll()
                    this.$message.error(err.response.data)
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

                }

            },
            getSignPage(argRes) {
                console.log('getSignPage');
                this.changeDesc('english');
                let applyTo = '';
                if (this.$store.state.loginType === 'individual' || this.$store.state.loginType === 'employee') {
                    applyTo = 'individual';
                } else {
                    applyTo = 'corporation';

                }
                this.$axios({
                    url: `/api${url.getSignPage}/${this.$store.state.repoInfo.platform}/${this.$store.state.repoInfo.org_id}/${applyTo}`,
                    params: {
                        repo_id: this.$store.state.repoInfo.repo_id,
                    },
                    headers: {'Token': this.$store.state.access_token}

                }).then(res => {
                    console.log(res);
                    this.signPageData = res.data
                    console.log(Object.keys(res.data).length);
                    if (Object.keys(res.data).length) {
                        this.languageOptions = []
                        for (let key in res.data) {
                            console.log(key);
                            if (res.data[key].language === 'english') {
                                this.value = key;
                                this.cla_org_id = key
                                console.log(this.cla_org_id);
                                console.log('find claText');

                                this.setClaText(key)
                                argRes('complete')


                            }
                            this.languageOptions.push({value: key, label: res.data[key].language})
                        }
                    }

                }).catch(err => {
                    console.log(err.response);
                    this.$message.closeAll()
                    this.$message.error(err.response.data)
                })
            },
            changeLanguage(value) {
                console.log(value);
                this.changeDesc(this.languageOptions[value].label);
                this.setClaText(value)
                this.cla_org_id = value
            },
            changeDesc(language) {
                if (language === 'english') {
                    this.desc = this.enDesc;
                } else if (language === 'chinese') {
                    this.desc = this.cnDesc;
                }
            },

            /*查找clatext*/
            setClaText(key) {

                let form = {}
                let rules = {}
                document.getElementById('claBox').innerHTML = this.signPageData[key].text;
                /*排序*/
                for (let i = 0; i < this.signPageData[key].fields.length; i++) {
                    for (let j = i + 1; j < this.signPageData[key].fields.length; j++) {
                        if (Number(this.signPageData[key].fields[i].id) > Number(this.signPageData[key].fields[j].id)) {
                            let field = this.signPageData[key].fields[i]
                            this.signPageData[key].fields[i] = this.signPageData[key].fields[j]
                            this.signPageData[key].fields[j] = field
                        }
                    }
                }
                console.log(this.signPageData[key].fields);
                this.fields = this.signPageData[key].fields
                this.fields.forEach(item => {
                    Object.assign(form, {[item.id]: ''})
                    if (item.type === 'name') {
                        Object.assign(this.myForm, {name: ''})
                        Object.assign(rules, {
                            [item.id]: [
                                {required: true, message: 'please input name', trigger: 'blur'},
                            ],
                        })

                    }else if (item.type === 'corporationName') {
                        Object.assign(this.myForm, {corporationName: ''})
                        Object.assign(rules, {
                            [item.id]: [
                                {required: true, message: 'please input corporationName', trigger: 'blur'},
                            ],
                        })

                    }else if (item.type === 'adminEmail') {
                        Object.assign(this.myForm, {adminEmail: ''})
                        Object.assign(rules, {
                            [item.id]: [
                                {required: true, message: 'please input adminEmail', trigger: 'blur'},
                            ],
                        })

                    } else if (item.type === 'date') {
                        Object.assign(this.myForm, {date: ''})

                        Object.assign(rules, {
                            [item.id]: [
                                {required: true, message: 'please input date', trigger: 'blur'}],
                        })
                    } else if (item.type === 'email') {
                        Object.assign(this.myForm, {email: ''})

                        Object.assign(rules, {
                            [item.id]: [{
                                required: true,
                                validator: this.verifyFormEmail,
                                trigger: 'blur'
                            }],
                        })
                    } else if (item.type === 'telephone') {
                        Object.assign(this.myForm, {telephone: ''})

                        Object.assign(rules, {
                            [item.id]: [{
                                required: true,
                                validator: this.verifyTel,
                                trigger: 'blur'
                            }],
                        })
                    } else if (item.type === 'address') {
                        Object.assign(this.myForm, {address: ''})
                        Object.assign(rules, {
                            [item.id]: [{
                                required: true,
                                validator: this.verifyAddr(),
                                trigger: 'blur'
                            }],
                        })
                    }
                })
                Object.assign(form, {code: ''})
                Object.assign(this.myForm, {code: ''})
                Object.assign(rules, {
                    code: [{
                        required: true,
                        message: 'Please enter the verification code',
                        trigger: ['blur','change']
                    },]
                })
                this.ruleForm = form
                this.rules = rules
                console.log(this.ruleForm);
                console.log(this.rules);

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
                        Object.assign(info, {[key]: this.ruleForm[key] + ''})
                    }
                }
                console.log(info);
                if (this.$store.state.loginType === 'individual') {
                    myUrl = `${url.individual_signing}/${this.cla_org_id}`;
                    obj = {
                        name: this.myForm.name,
                        email: this.myForm.email,
                        info: info,
                    }

                } else if (this.$store.state.loginType === 'corporation') {

                    myUrl = url.corporation_signing;
                    obj = {
                        cla_org_id: this.cla_org_id,
                        corporation_name: this.myForm.corporationName,
                        admin_name: this.myForm.name,
                        admin_email: this.myForm.adminEmail,
                        enabled: true,
                        info: info,
                        verifi_code: this.ruleForm.code,
                    }
                } else if (this.$store.state.loginType === 'employee') {
                    myUrl = `${url.employee_signing}/${this.cla_org_id}`;
                    obj = {
                        name: this.myForm.name,
                        email: this.myForm.email,
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
                        'Token': this.$store.state.access_token,
                        'Access-Token': this.$store.state.platform_token,
                        'Refresh-Token': this.$store.state.refresh_token,
                        'User': `${this.platform}/${this.$store.state.user.userName}`
                    }
                }).then(res => {
                    console.log(res);
                    // this.$message.closeAll()
                    // this.clearForm()
                    // this.isRead = false;
                    // this.isSendCode = true;
                    // this.$message.success('sign successfully')
                    if (this.$store.state.loginType === 'corporation') {
                        this.tipsMessage = 'We have sent a notification email to your email address. Please check it.And please complete the signature according to the prompt in the email'
                    } else if (this.$store.state.loginType === 'employee') {
                        this.tipsMessage = 'We have sent a notification email to your email address. Please check it,And email the administrator of your company to audit'
                    }
                    this.tipsDialogVisible = true;


                }).catch(err => {
                    console.log(err);
                    this.$message.closeAll()
                    this.$message.error(err.response.data)
                })
            },
            clearForm() {
                if (this.$store.state.loginType === 'employee' || this.$store.state.loginType === 'individual') {
                    for (let key in this.ruleForm) {
                        if (key !== '1' && key !== '2') {
                            this.ruleForm[key] = ''
                        }
                    }
                } else {
                    for (let key in this.ruleForm) {
                        if (key !== '3') {
                            this.ruleForm[key] = ''
                        }
                    }
                }
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
                    this.$message.closeAll()
                    this.$message.error(err.response.data)
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
            new Promise(resolve => {
                this.getSignPage(resolve);
            }, reject => {

            }).then(res => {
                console.log(res);
                this.getNowDate()

            }, err => {
            })


        },
        mounted() {
            this.setClientHeight();
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
    .signBtBox {
        display: flex;
        justify-content: center;
    }

    .button {
        width: 20rem;
        height: 5rem;
        border-radius: 2.5rem;
        border: none;
        color: white;
        font-size: 2rem;
        cursor: pointer;
        background: linear-gradient(to right, #97DB30, #319E55);
        margin: 1rem 0;
    }

    .button:focus {
        outline: none;
    }

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

    .verifyClass {
        padding: 10rem 0;

    }

    .borderClass {
        margin-top: 1rem;
        padding: 1rem 0;
        border-top: 1px dashed #F3F3F3;
    }

    .form {
        border-radius: 1rem;
        box-shadow: 0 0 20px 10px #F3F3F3;
        padding: 2rem;
        margin-bottom: 2rem;
        font-size: 1.5rem;

        & .el-input__inner {
            background-color: #F3F3F3;
            border-radius: 1rem;
            border: 1px solid #F3F3F3;
        }

        & .el-form-item {
            margin-bottom: 28px
        }
    }

    .marginTop3rem {
        margin-top: 3rem;
    }

    .marginTop1rem {
        margin-top: 1rem;
    }

    #claBox {
        border-bottom: 1px dashed lightgrey;
        padding-bottom: 2rem;
        margin-bottom: 2rem;
        white-space: pre-wrap;
    }

    .contentTitle {
        font-size: 2rem;
        font-weight: bold;
        margin: 2rem 0;
    }

    .size_s {
        font-size: .9rem;
    }

    #checkCLA {
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
        /*padding-top: 4rem;*/

        /*& > .header {*/
        /*height: 4rem;*/
        /*width: 100%;*/
        /*}*/

        & > #section {
            flex-grow: 1;


            & > .content {
                padding: 1rem;
                text-align: left;


            }
        }

        /*& > .footer {*/
        /*height: 4rem;*/
        /*width: 100%;*/
        /*}*/


    }
</style>