<template>
    <div id="checkCLA" :style="checkCLAClass">
        <!--<Header></Header>-->
        <div class="header">

            <el-col :offset="8" :span="8">
                <div>

                    <svg-icon class="pointer" @click="toHome()" id="svg_logo" icon-class="logo_b"/>
                </div>
            </el-col>


        </div>
        <div id="section">
            <div v-if="!isSendCode" class="content">
                <el-col :offset="6" :span="12">
                    <p class="contentTitle">Please sign the CLA for <span>{{repo}}</span></p>

                    <el-row >
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
                    <!--<el-row class="marginTop1rem">-->


                        <!--<el-col :span="8" class="borderClass">-->
                            <!--<el-radio label="0" @change="roleChange()" v-model="role">{{desc.personalContributor}}</el-radio>-->
                        <!--</el-col>-->
                        <!--<el-col :span="8" class="borderClass">-->
                            <!--<el-radio label="1" @change="roleChange()" v-model="role">{{desc.comContributor}}</el-radio>-->
                        <!--</el-col>-->

                    <!--</el-row>-->
                    <el-row class="marginTop1rem">
                        <el-col :span="16">
                            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-position="left"
                                     label-width="30%"
                                     class="demo-ruleForm">
                                <el-form-item v-for="(item,index) in fields"
                                              :label="item.title"
                                              :required="item.required"
                                              :prop="item.type">
                                    <el-input v-model="ruleForm[item.type]" size="small"></el-input>
                                </el-form-item>
                                <p style="font-size: .9rem;" class="borderClass">{{desc.metadataDesc}}</p>
                                <div class="marginTop1rem">
                                    <el-checkbox v-model="isRead">I have read the Privacy Policy and hereby consent to the processing of my data by openLooKeng in Hong Kong"</el-checkbox>
                                </div>
                                <el-form-item label-width="0" class="marginTop1rem">
                                    <el-button :disabled="!isRead" type="primary" @click="submitForm('ruleForm')">{{desc.sign}}
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
        <el-dialog
                title=""
                top="5vh"
                :visible.sync="dialogVisible"
                width="50%">
            <div style="margin-bottom: 2rem">
                请在48小时内输入邮箱{{ruleForm.email}}中的验证码进行验证

            </div>
            <div>
                <el-button type="primary" size="medium" @click="dialogVisible=false">确定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import Header from '@components/Header'
    import Footer from '@components/Footer'
    import * as until from '../until/until'
    import * as url from '../until/api'
    import {mapActions} from 'vuex'


    export default {

        name: "CheckCLA",
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
                    callback(new Error('邮箱格式有误'))
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
            let verifyDate = (rule, value, callback) => {
                if (!value) {
                    callback(new Error('请输入日期'))
                }
                callback();
            }
            return {
                claOrgIdArr:[],
                fields:[],
                claIdArr:[],
                desc:'',
                enDesc:{
                    personalContributor:'Individual Contributor',
                    comContributor:'Legal Entity Contributor',
                    metadataDesc:'* require field. Please make sure the E-Mail is related with your gitee account.',
                    sign:'SIGN',
                    reset:'RESET',
                },
                cnDesc:{
                    personalContributor:'个人贡献者',
                    comContributor:'企业贡献者',
                    metadataDesc:'*为必填项，请确保你的邮箱与gitee账号绑定',
                    sign:'签署',
                    reset:'重置',
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
                    name: '',
                    email: '',
                    telephone: '',
                    date: '',
                    fax:'',
                    address:'',

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


                    telephone: [
                        {validator: verifyTel, trigger: 'blur'}
                    ],
                    address: [
                        {validator: verifyAddr, trigger: 'blur'}
                    ],
                    date: [
                        {validator: verifyDate, trigger: 'blur'}
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
                metadata: {
                    "name": {
                        "title": "Name",
                        "type": "string",
                        "githubKey": "name",
                        "required": true
                    },
                    "email": {
                        "title": "E-Mail",
                        "type": "string",
                        "githubKey": "email",
                        "required": true
                    },
                    "phone": {
                        "title": "Telephone",
                        "type": "string",
                        "required": false
                    },
                    "faxnumber": {
                        "title": "Fax",
                        "type": "string",
                        "required": false
                    },
                    "address": {
                        "title": "Address",
                        "type": "string",
                        "required": true
                    },
                    "date": {
                        "title": "Date",
                        "type": "string",
                        "required": true
                    },
                    "category": {
                        "title": "I have read the Privacy Policy and hereby consent to the processing of my data by openLooKeng in Hong Kong",
                        "type": "boolean",
                        "required": true
                    }
                },
                metadataArr: [],
                checkCLAClass: {
                    height: '',
                },
            }
        },
        methods: {
            ...mapActions(['setTokenAct','setRepoInfoAct']),

            getCookieData() {
                if (document.cookie !== '') {
                    let cookieArr = document.cookie.split('; ')
                    let access_token, refresh_token = '';
                    cookieArr.forEach((item, index) => {
                        let arr = item.split('=');
                        arr[0] === 'access_token' ? access_token = arr[1] : arr[0] === 'refresh_token' ? refresh_token = arr[1] : refresh_token = '';
                        ;
                    })
                    let data = {access_token, refresh_token};
                    this.setTokenAct(data);
                }

            },
            changeLanguage(value) {
                this.changeDesc(this.languageOptions[this.value].label);
                this.getClaText(this.claIdArr[value])
            },
            changeDesc(language){
                if (language === 'english') {
                    this.desc=this.enDesc;
                }else if (language === 'chinese') {
                    this.desc=this.cnDesc;
                }
            },
            /*获取个人签署的metadata*/
            getSignPage() {
                console.log('getSignPage');
                this.changeDesc('english');
                this.$axios({
                    url: '/api' + url.getSignPage,
                    params:{
                        platform:'gitee',
                        org_id:this.$store.state.repoInfo.org_id,
                        repo_id:this.$store.state.repoInfo.repo_id,
                        apply_to: this.$store.state.loginType
                    }

                }).then(res => {
                    console.log(res);
                    if (res.data.length) {
                        this.languageOptions=[]
                        this.claIdArr=[]
                        this.claOrgIdArr=[]
                        res.data.forEach((item,index)=>{
                            if (item.cla_language === 'english') {
                                this.value=index;
                                console.log('查找clatext');
                                this.getClaText(item.cla_id)

                            }
                            this.languageOptions.push({value:index,label:item.cla_language})
                            this.claIdArr.push(item.cla_id)
                            this.claOrgIdArr.push(item.id)
                        })

                    }else{

                    }

                }).catch(err => {
                    console.log(err);
                })
            },
            /*查找clatext*/
            getClaText(cla_id){
                this.$axios({
                    url: `/api${url.getClaInfo}/${cla_id}`,

                }).then(resp => {
                    console.log(resp);
                    document.getElementById('claBox').innerHTML=resp.data.text
                    this.fields=resp.data.fields
                    // this.ruleForm={};
                    // this.fields.forEach(item=>{
                    //     Object.assign(this.ruleForm,{[item.type]:''})
                    // })
                    // console.log(this.ruleForm);

                }).catch(err => {
                    console.log(err);
                })
            },
            /*获取企业签署的metadata*/
            getCompanyMetaAndCla() {
                this.$axios({
                    url: '/api' + url.getClaInfo,
                    headers: {
                        'Access-Token': this.$store.state.access_token,
                        'Refresh-Token': this.$store.state.refresh_token,
                        'User': `${this.platform}/${this.$store.state.user.userName}`
                    }

                }).then(res => {
                    console.log(res);

                }).catch(err => {
                    console.log(err);
                })
            },
            roleChange() {
                console.log(this.role);
                switch (this.role) {
                    case '0':
                        // this.getPersonalMetaAndCla();
                        break;
                    case '1':
                        this.getCompanyMetaAndCla();
                        break;

                }
            },
            toHome() {
                this.$router.push('/home')
            },
            /*验证验证码*/
            verify() {
                this.isVerify = true;
                let obj = {code: this.verifyCode}
                this.$axios({
                    url: '/api' + url.verifyCode,
                    method: 'post',
                    data: obj,
                    headers: {
                        'Access-Token': this.$store.state.access_token,
                        'Refresh-Token': this.$store.state.refresh_token,
                        'User': `${this.platform}/${this.$store.state.user.userName}`
                    }

                }).then(res => {
                    console.log(res);
                    if (res.data.code === 200) {
                        this.isVerify = true;
                    } else {
                        this.$message.error('验证码错误')
                    }
                }).catch(err => {
                    console.log(err);

                })
            },
            /*发送验证码*/
            signCla() {
                // this.$router.push('/verifyPage?role=1')
                // this.dialogVisible = true;
                // this.isSendCode = true;
                // console.log(until.getClientHeight(), document.getElementById('checkCLA').offsetHeight);
                // this.checkCLAClass.height = until.getClientHeight() + 'px'
                // let code = `${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}`
                // let obj = {
                //     code: code,
                //     role: this.role,
                //     name: this.ruleForm.name,
                //     email: this.ruleForm.email,
                //     tel: this.ruleForm.tel
                // }
                // console.log(obj);
                let info={}
                for(let key in this.ruleForm){
                    console.log(key);
                    if (this.ruleForm[key] !== '') {
                        Object.assign(info,{[key]:this.ruleForm[key]})
                    }
                }
                console.log(info);
                let obj ={
                    cla_org_id:this.claOrgIdArr[this.value],
                    email:this.ruleForm.email,
                    info:info,
                }
                this.$axios({
                    url: '/api' + url.individual_signing,
                    method: 'post',
                    data: obj,
                    headers: {
                        'Access-Token': this.$store.state.access_token,
                        'Refresh-Token': this.$store.state.refresh_token,
                        'User': `${this.platform}/${this.$store.state.user.userName}`
                    }
                }).then(res => {
                    console.log(res);
                    this.dialogVisible = true;
                    this.isSendCode = true;

                }).catch(err => {
                    console.log(err);
                })
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
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

            loadMetadata() {
                console.log(this.metadata);
                this.metadataArr = []
                for (let item in this.metadata) {
                    console.log(item);
                    if (item !== 'category') {
                        Object.assign(this.metadata[item], {githubKey: item});
                        this.metadataArr.push(this.metadata[item])
                    }
                }
                console.log(this.metadataArr);
            },

        },

        created() {
            this.getCookieData()
            this.getSignPage();
            this.loadMetadata()

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

<style scoped lang="less">
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