<template>
    <div id="home" :style="home">
        <Header></Header>

        <el-col :offset="4" :span="16" id="section">

            <div id="configBtDiv">
                <el-button v-if="!showConfigForm" class="configBt" type="primary" @click="configCla()">
                    Configure CLA
                </el-button>
            </div>
            <el-row>
                <el-row v-if="showConfigForm">
                    <div style="padding-bottom: 1.5rem;font-size: 1.3rem">Configure CLA</div>
                    <el-row>
                        <el-col :span="10">
                            <div style="background-color: white">
                                <div style="text-align: right;padding: 1rem">

                                    <svg-icon @click="closeConfigForm()" icon-class="close"/>
                                </div>
                                <!--选择仓库-->
                                <div style="font-size: 1.2rem;padding: .5rem">
                                    ① Choose a repository <span v-if="!user.isAuthorize" @click="authorize()"
                                                                style="font-size: .8rem;text-decoration: underline;cursor: pointer">(want to link an org?)</span>
                                </div>
                                <div style="padding: 0 2rem">
                                    <el-select v-model="repositoryValue"
                                               placeholder="select"
                                               style="width: 100%"
                                               size="medium"
                                               filterable
                                               @change="changeRepository">
                                        <el-option
                                                v-for="item in repositoryOptions"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value">
                                        </el-option>
                                    </el-select>
                                </div>
                                <!--选择协议-->
                                <div style="font-size: 1.2rem;padding: .5rem">
                                    ② Choose a CLA
                                </div>
                                <div style="font-size: 1rem;padding: 0 2rem .5rem 2rem">
                                    Select from Gist
                                    <span @click="createCLA()"
                                          style="font-size: .8rem;text-decoration: underline;cursor: pointer">(don't have one?)</span>
                                </div>
                                <div style="padding: 0 2rem">
                                    <el-select v-model="claValue"
                                               placeholder="select"
                                               style="width: 100%"
                                               size="medium"
                                               filterable
                                               @change="changeCla">
                                        <el-option
                                                v-for="item in claOptions"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value">
                                        </el-option>
                                    </el-select>

                                </div>
                                <!--选择metadata-->
                                <div style="font-size: 1.2rem;padding: .5rem">
                                    ③ Choose a Metadata
                                </div>
                                <div style="font-size: 1rem;padding: 0 2rem .5rem 2rem">
                                    Select from Gist
                                    <span @click="createMetadata()"
                                          style="font-size: .8rem;text-decoration: underline;cursor: pointer">(don't have one?)</span>
                                </div>
                                <div style="padding: 0 2rem">
                                    <el-select v-model="metadataValue"
                                               placeholder="select"
                                               style="width: 100%"
                                               filterable
                                               size="medium"
                                               @change="changeMetadata">
                                        <el-option
                                                v-for="item in metadataOptions"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value">
                                        </el-option>
                                    </el-select>

                                </div>
                                <div style="font-size: 1.2rem;padding: .5rem">
                                    ④ Email
                                </div>
                                <div style="padding: 0 2rem">
                                    <el-input
                                            @input="verifyEmail"
                                            size="medium"
                                            placeholder="Input you email"
                                            v-model="email">

                                    </el-input>
                                </div>

                                <div
                                        :class="{'linkBt pointer':claChoose&&repositoryChoose&&isEmail,'disableClass':!(claChoose&&repositoryChoose&&isEmail)}"
                                        @click="openLinkDialog()">
                                    <div>
                                        <svg-icon icon-class="link"></svg-icon>
                                        LINK
                                    </div>
                                </div>
                            </div>
                        </el-col>
                        <el-col :span="12" :offset="2" v-if="showPreviewCla">
                            <el-input rows="16" readonly type="textarea" placeholder="preview cla" v-model="previewText"
                                      style="white-space: pre-wrap">

                            </el-input>
                        </el-col>
                    </el-row>

                </el-row>

            </el-row>

            <div>
                <el-tabs v-model="activeName" @tab-click="tabsHandleClick">
                    <el-tab-pane  label="Linked Repositories" name="first" style="margin-top: 1rem">

                    </el-tab-pane>
                    <el-tab-pane  label="Signed Repositories" name="second" style="margin-top: 1rem">



                    </el-tab-pane>
                </el-tabs>
                <router-view></router-view>
            </div>

        </el-col>

        <Footer id="footer"></Footer>
        <el-dialog
                top="5vh"
                title=""
                :visible.sync="authorizeDialogVisible"
                width="35%">
            <div style="text-align: left">
                <p class="dialogDesc">Why link organizations?</p>
                <!--<p>At <a href="https://gist.github.com/" target="_blank">gist.github.com</a> enter a file name and paste-->
                <!--the content of your CLA.</p>-->
                <p>If you link an organization with your CLA, CLA assistant sets a web hook on your organization and
                    listens to Pull Requests of all repositories in the organization. That means that your CLA becomes
                    active for each existing and future repositories of your organization.</p>
                <p class="dialogDesc">How can I link an organization?</p>
                <p>CLA assistant needs an additional authorization from you to be able to create web hooks for
                    organizations. To grant CLA assistant appropriate rights just click on the button below. For more
                    information on Authorization scopes see github documentation</p>
                <div
                        class="linkBt pointer"
                        style="font-size: 1.1rem"
                        @click="getOrgPermission()">

                    Yes,let's go for it

                </div>
            </div>

        </el-dialog>
        <el-dialog
                top="5vh"
                title=""
                :visible.sync="createCLADialogVisible"
                width="35%">
            <div style="text-align: left">
                <p class="dialogDesc">How can I create a CLA Gist?</p>
                <!--<p>At <a href="https://gist.github.com/" target="_blank">gist.github.com</a> enter a file name and paste-->
                <!--the content of your CLA.</p>-->
                <p>To <span @click="toCreateCLA()" style="cursor: pointer;text-decoration: underline;color: blue">createCLA</span>
                    enter a file name and paste
                    the content of your CLA.</p>
                <p class="dialogDesc">What happens if I edit the Gist file?</p>
                <p>CLA assistant will always show you the current version of your Gist file. Users who accept your CLA
                    sign the current version. If you change the content of your CLA, each contributor has to accept the
                    new version when they create a new pull request.</p>
            </div>
            <span slot="footer" class="dialog-footer">

  </span>
        </el-dialog>
        <el-dialog
                top="5vh"
                title=""
                :visible.sync="createMetadataDialogVisible"
                width="35%">
            <div style="text-align: left">
                <p class="dialogDesc">How can I create a Metadata Gist?</p>

                <p>To <span @click="toCreateMetadata()" style="cursor: pointer;text-decoration: underline;color: blue">createMetadata</span>
                    enter a file name and paste
                    the content of your Metadata.</p>
                <p class="dialogDesc">What happens if I edit the Gist file?</p>
                <p>CLA assistant will always show you the current version of your Gist file. Users who accept your
                    Metadata
                    sign the current version. If you change the content of your Metadata, each contributor has to accept
                    the
                    new version when they create a new pull request.</p>
            </div>
            <span slot="footer" class="dialog-footer">

  </span>
        </el-dialog>
        <el-dialog
                top="5vh"
                title=""
                :visible.sync="shareDialogVisible"
                width="35%">
            <div style="text-align: left">
                <p class="dialogDesc">What happens if I choose to share the gist with multiple repos or orgs?</p>
                <!--<p>At <a href="https://gist.github.com/" target="_blank">gist.github.com</a> enter a file name and paste-->
                <!--the content of your CLA.</p>-->
                <p>Contributors will simply need to sign only once for any of the repos or orgs linked with the same
                    shared gist.</p>
                <p class="dialogDesc">Are previous CLA signatures still valid after I choose to share the gist with
                    multiple repos or orgs?</p>
                <p>Yes, but the scope of the previous signatures are still limited to the previous repo or org.</p>
                <p class="dialogDesc">What happens if I uncheck the box and choose NOT to share the gist any more?</p>
                <p>Previous contributors that have signed the shared gist will have to sign again.</p>
            </div>
            <span slot="footer" class="dialog-footer">

  </span>
        </el-dialog>
        <el-dialog
                top="5vh"
                title=""
                :visible.sync="linkDialogVisible"
                width="35%">
            <div>
                <p class="dialogDesc">Would you like to link this CLA
                    to your repository?</p>
                <div>
                    <el-row>
                        <svg-icon style="width: 100%;height: 100%" icon-class="popup_link"></svg-icon>
                    </el-row>
                    <el-row>
                        <el-col :offset="6" :span="5" v-if="claChoose">
                            {{claOptions[claValue].label}}
                        </el-col>
                        <el-col :offset="2" :span="5" v-if="repositoryChoose">
                            {{repositoryOptions[repositoryValue].label}}
                        </el-col>
                    </el-row>
                </div>
                <div style="padding: 0 3rem;color: #409EFF">

                </div>
                <div style="padding: 2rem 6rem;text-align: left;font-size: 1.3rem">
                    <p style="text-align: center">CLA assistant will...</p>
                    <ul>
                        <li>Create a webhook in your repository and listen for pull requests</li>
                        <li>Set a pull request CLA status</li>
                        <li>Comment on pull requests</li>
                    </ul>
                </div>

                <span slot="footer" class="dialog-footer">
                    <el-button @click="linkDialogVisible = false">Cancel</el-button>
                    <el-button v-loading.fullscreen.lock="linkLoading" type="primary" @click="linkRepository()">Yes,Let's do this!</el-button>
                </span>
            </div>

        </el-dialog>


    </div>
</template>

<script>
    import * as url from '../until/api'
    import * as until from '../until/until'
    import Header from '@components/Header'
    import Footer from '@components/Footer'
    import {mapActions} from 'vuex'

    window.onresize = () => {
        // console.log(until.getClientHeight());
        if (until.getClientHeight() > document.getElementById('home').offsetHeight) {
            document.getElementById("home").style.height = until.getClientHeight() + 'px'
        }
    }
    export default {
        name: "Home",
        components: {
            Header,
            Footer,
        },
        computed: {},
        watch:{
            $route(to,from){
              let path = to.path;
                if ( path==='/linkedRepo'||path==='/home'){
                    this.activeName='first';
                }else if (path==='/signedRepo'||path==='/signedRepoLogin'){
                    this.activeName='second';
                }
            },
        },
        data() {


            return {
                createMetadataDialogVisible: false,
                linkLoading: false,
                platform: this.$store.state.platform,


                isVerify: false,
                activeName: '',
                previewShow: false,
                previewText: '',
                loginType: this.$store.state.loginType,

                tableType: 1,
                tableShow: true,

                listCurrentPage: 1,
                dropdownTitle: 'Linked Repositories',
                isEmail: false,
                email: '',
                code: '',
                gitee_client_id: this.$store.state.gitee_client_id,
                gitee_client_secret: this.$store.state.gitee_client_secret,
                gitee_redirect_uri: this.$store.state.gitee_redirect_uri,
                github_client_id: this.$store.state.github_client_id,
                github_client_secret: this.$store.state.github_client_secret,
                github_redirect_uri: this.$store.state.github_redirect_uri,
                access_token: this.$store.state.access_token,
                refresh_token: this.$store.state.refresh_token,
                listDialogVisible: false,
                checkClaDialogVisible: false,
                unLinkDialogVisible: false,
                editDialogVisible: false,
                menuVisible: false,
                claName: 'test',
                repositoryName: 'ooo/test',
                shareGistChecked: false,
                claOptions: [],
                claValue: '',
                metadataOptions: [{
                    value: 0,
                    label: '',
                    id: '',
                    text: '',
                    language: ''
                }],
                metadataValue: '',
                showPreviewCla:false,
                claChoose: false,
                metadataChoose: false,
                linkDialogVisible: false,
                shareDialogVisible: false,
                createCLADialogVisible: false,
                authorizeDialogVisible: false,
                fileNumber: '',
                lineNumber: '',
                gistUrl: '',
                orgOptions: [{value: '0', label: 'test'}],
                orgValue: '',
                repositoryOptions: [{value: '0', label: 'test',},],
                repositoryValue: '',
                repositoryChoose: '',
                showConfigForm: false,



                home: {
                    height: '',
                },
                user: {
                    userName: this.$store.state.user.userName,
                    userId: this.$store.state.user.userId,
                    isAuthorize: false,
                },
            }
        },
        methods: {
            ...mapActions(['setLoginUserAct', 'setTokenAct','getLinkedRepoListAct']),

            getPath(){
                let path = this.$route.path;
                if ( path==='/linkedRepo'||path==='/home'){
                    this.activeName='first';
                }else if (path==='/signedRepo'||path==='/signedRepoLogin'){
                    this.activeName='second';
                }
            },
            tabsHandleClick(tab, event) {
                console.log(tab, event);
                tab.index === '0'? this.$router.push('/linkedRepo') : this.$router.push('/signedRepoLogin')

            },
            /*获取组织权限*/
            getOrgPermission() {
                if (this.loginType === '0') {
                    window.location.href = 'https://github.com/login/oauth/authorize?client_id=d86f4915398dad23bffc&redirect_url=http://localhost:8080/home&scope=repo';
                }
            },

            /*白名单列表翻页*/
            listChangePage(page) {
                console.log(page);
            },


            /*获取个人签署的项目*/
            getPersonalSigned() {
                console.log('getPersonalRepositories');
                let obj = {
                    userName: this.user.userName
                };
                this.$axios({
                    url: url.getPersonalRepositories,
                    methods: 'post',
                    data: obj,
                    headers: {access_token: this.$store.state.access_token, refresh_token: this.refresh_token}
                }).then(res => {
                    console.log(res);
                    if (res.data.code === 200) {
                        this.tableData = res.data.data
                    }
                }).catch(err => {
                    console.log(err);
                })
            },
            /*获取企业签署的项目*/
            getCompanyRepositories() {
                console.log('getCompanyRepositories');
                let obj = {
                    userName: this.user.userName
                };
                this.$axios({
                    url: url.getCompanyRepositories,
                    methods: 'post',
                    data: obj,
                    headers: {access_token: this.$store.state.access_token, refresh_token: this.refresh_token}
                }).then(res => {
                    console.log(res);
                    if (res.data.code === 200) {
                        this.tableData = res.data.data
                    }
                }).catch(err => {
                    console.log(err);
                })
            },
            /*获取企业个人签署的项目*/
            getCompanyPersonRepositories() {
                console.log('getCompanyPersonRepositories');
                let obj = {
                    userName: this.user.userName
                };
                this.$axios({
                    url: url.getCompanyPersonRepositories,
                    methods: 'post',
                    data: obj,
                    headers: {access_token: this.$store.state.access_token, refresh_token: this.refresh_token}
                }).then(res => {
                    console.log(res);
                    if (res.data.code === 200) {
                        this.tableData = res.data.data
                    }
                }).catch(err => {
                    console.log(err);
                })
            },

            newWindow() {
                // window.open('https://github.com/ouchengle/Test','_black')
                window.open('https://github.com/ouchengle')
            },
            /*打开确认发布开源项目的弹框*/
            openLinkDialog() {
                (this.repositoryChoose && this.claChoose && this.isEmail) && (this.linkDialogVisible = true)
            },


            /*邮箱合法验证*/
            verifyEmail() {
                var email = this.email;
                var reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
                if (reg.test(email)) {
                    this.isEmail = true
                } else {
                    // this.$message({
                    //     type: 'error',
                    //     message:'Please enter the correct email',
                    //     center:true
                    // });
                    this.isEmail = false

                    return false
                }
            },

            /*链接开源项目*/
            linkRepository() {
                this.linkLoading = true;
                let obj = {
                    repo_id: `${this.repositoryOptions[this.repositoryValue].repoName}`,
                    cla_id: this.claOptions[this.claValue].id,
                    org_email: this.email,
                    platform: this.platform,
                    org_id: `${this.repositoryOptions[this.repositoryValue].org}`,
                    cla_language: this.claOptions[this.claValue].language,
                    submitter: `${this.platform}/${this.$store.state.user.userName}`,
                    metadata_id: '',
                };
                console.log(obj);
                this.$axios({
                    url: '/api' + url.linkRepository,
                    method: 'post',
                    data: obj,
                    headers: {
                        'Access-Token': this.access_token,
                        'Refresh-Token': this.refresh_token,
                        'User': `${this.platform}/${this.user.userName}`
                    }

                }).then(res => {
                    this.linkLoading = false;
                    this.$message.success('success')
                    console.log(res);
                    this.claValue = '';
                    this.repositoryValue = '';
                    this.claChoose = false;
                    this.repositoryChoose = false;
                    this.email = '';
                    this.linkDialogVisible = false;
                    let data ={access_token:this.$store.state.access_token,refresh_token:this.$store.state.refresh_token,userName:this.$store.state.user.userName,platform:this.platform}
                    this.getLinkedRepoListAct(data)
                }).catch(err => {
                    console.log(err);
                    this.linkLoading = false
                    this.$message.error('failed')
                })
            },

            /*查看CLA签署状态*/
            checkCla() {
                console.log("checkCla");
                this.$router.push('/checkCla')
            },
            /*cla条目编辑*/
            editHandleClick(index) {
                console.log(index);
                this.editDialogVisible = true
            },
            /*跳转到创建CLA页面*/
            toCreateCLA() {
                this.$router.push('/createCLA')
            },
            toCreateMetadata() {
                this.$router.push('/createMetadata')
            },
            /*选择cla*/
            changeCla(value) {
                this.showPreviewCla=true
                this.claChoose = true;
                this.previewText = this.claOptions[value].text;
            },
            /*选择Metadata*/
            changeMetadata(value) {
                this.metadataChoose = true;
                this.previewText = this.metadataOptions[value].text;
            },
            /*弹出dialog说明框*/
            createCLA() {
                this.createCLADialogVisible = true
            },
            createMetadata() {
                this.createMetadataDialogVisible = true
            },
            /*授权CLA应用访问开源组织的账号信息*/
            authorize() {
                console.log("authorize");
                this.authorizeDialogVisible = true
                /*弹出dialog说明框，点击授权跳转到授权页面，点击确认授权，跳转至输入密码验证，成功之后自动跳转回配置页面*/

            },

            /*选择仓库*/
            changeRepository(value) {
                console.log(this.repositoryValue);
                this.repositoryChoose = true;

            },
            getRepositoriesOfOrg(org, org_id) {
                let obj = {access_token: this.$store.state.access_token, org: org, page: 1, per_page: 10};
                console.log("getRepositoriesOfOrg", obj);
                this.$axios({
                    url: `https://gitee.com/api/v5/orgs/${org}/repos`,
                    params: obj,
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
            /*获取仓库数据*/
            getOrgsInfo() {
                let obj = {access_token: this.$store.state.access_token, admin: true, page: 1, per_page: 10};
                console.log("getOrgsInfo", obj);
                this.$axios({
                    url: url.getOrgsInfo,
                    methods: 'get',
                    params: obj,
                }).then(res => {
                    console.log(res);
                    if (res.status === 200) {
                        // this.repositoryOptions = res.data.data
                        this.orgOptions = [];
                        res.data.forEach((item, index) => {
                            this.orgOptions.push({value: index, label: item.login, id: item.id});
                            this.getRepositoriesOfOrg(item.login, item.id)
                        })
                    }
                }).catch(err => {
                    console.log(err);
                })
            },
            /*获取cla数据*/
            getCLA() {
                console.log("getCLA");
                this.$axios({
                    url: '/api' + url.getClaInfo,
                    headers: {
                        'Access-Token': this.$store.state.access_token,
                        'Refresh-Token': this.$store.state.refresh_token,
                        'User': `${this.platform}/${this.$store.state.user.userName}`
                    }
                }).then(res => {
                    console.log(res);
                    if (res.data.length) {
                        this.claOptions = [];
                        res.data.forEach((item, index) => {
                            this.claOptions.push({
                                value: index,
                                label: item.name,
                                id: item.id,
                                text: item.text,
                                language: item.language
                            })
                        })
                    }
                }).catch(err => {
                    console.log(err);
                })
            },
            /*关闭cla配置表单*/
            closeConfigForm() {
                this.showConfigForm = false
                this.setClientHeight()
            },

            /*点击配置cla按钮*/
            configCla() {
                this.showConfigForm = true;
                this.home.height = 'auto'
                this.getCLA()
                this.getOrgsInfo()
                this.getMeta();
            },
            /*获取metadata数据*/
            getMeta() {
                console.log("getMeta");
                this.$axios({
                    url: '/api' + url.getMeta,
                    headers: {
                        'Access-Token': this.access_token,
                        'Refresh-Token': this.refresh_token,
                        'User': `${this.platform}/${this.user.userName}`
                    }

                }).then(res => {
                    console.log(res);
                    if (res.data.length) {
                        this.metadataOptions = [];
                        res.data.forEach((item, index) => {
                            this.metadataOptions.push({
                                value: index,
                                label: item.name,
                                id: item.id,
                                text: item.text,
                                language: item.language
                            })
                        })
                    }
                }).catch(err => {
                    console.log(err);
                })
            },
            /*设置页面高度*/
            setClientHeight() {
                // console.log(until.getClientHeight());
                this.$nextTick(() => {
                    until.getClientHeight() > document.getElementById('home').offsetHeight ?
                        this.home.height = until.getClientHeight() + 'px' :
                        this.home.height = document.getElementById('home').offsetHeight

                })
            },
            /**/
            change(value) {
                console.log(value);
                this.value = value;
            },
            /*获取cookie*/


            openFullScreen() {
                const loading = this.$loading({
                    lock: true,
                    // text: 'Loading',
                    // spinner: 'el-icon-loading',
                    background: 'rgba(255, 255, 255, 0.8)'
                });
                setInterval(() => {
                    this.$store.state.user.userName&&this.$store.state.ready && loading.close();
                }, 500)
            },
            getCookieData() {
                console.log('getCookieData');
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
                    this.getUserInfo(access_token, refresh_token)

                }

            },
            /*获取用户名并显示*/
            getUserInfo(access_token, refresh_token) {
                let obj = {access_token: access_token};
                console.log(obj);
                this.$axios({
                    url: url.getUserInfo,
                    params: obj,
                }).then(res => {
                    console.log(res);

                    let data = {
                        userId: res.data.id,
                        userName: res.data.login,
                        userImg: res.data.avatar_url,
                        userEmail: res.data.email
                    }
                    this.setLoginUserAct(data);
                    let obj = {
                        access_token: access_token,
                        refresh_token: refresh_token,
                        userName: res.data.login,
                        platform: this.platform
                    }
                    this.getLinkedRepoListAct(obj);

                }).catch(err => {
                    console.log(err);
                })
            },
        },

        created() {
            this.getPath();
            this.openFullScreen();
            this.getCookieData()
        },
        mounted() {
            this.setClientHeight();
        }
    }

</script>

<style scoped lang="less">
    .tableStyle {
        margin-bottom: 2rem;
        padding: 3rem;
        background-color: white;
    }

    .paginationClass {
        text-align: center;
        margin-bottom: 1rem;
    }

    .el-dropdown-link {
        cursor: pointer;
        color: #409EFF;
    }

    .el-icon-arrow-down {
        font-size: 12px;
    }

    .hoverUnderline:hover {
        text-decoration: underline;
    }

    .qusLink {
        text-decoration: underline;
        font-size: .8rem;
        cursor: pointer;
    }

    .dialogDec {
        font-size: 1rem;
        padding: .5rem 0;
    }

    .left {
        text-align: left;
    }

    .right {
        text-align: right;
    }

    .size_b {
        font-size: 1.3rem;
    }

    .size_m {
        font-size: 1rem;
        text-align: left;
    }

    .menuBT {
        display: flex;
        flex-direction: column;

        & > * {

            margin: .2rem 0;
            text-align: center;
        }
    }

    .pointer {
        cursor: pointer;
    }

    .dialogDesc {

        font-size: 1.2rem;
        margin: 2rem 0;
    }

    li {
        margin: 1rem 0;
    }

    .disableClass {
        margin-top: 2rem;
        text-align: center;
        height: 3rem;
        background-color: #ACD7E6;
        color: white;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .linkBt {
        margin-top: 2rem;
        text-align: center;
        height: 3rem;
        background-color: #0594C6;
        color: white;
        display: flex;
        flex-direction: column;
        justify-content: center;


        &:hover {
            background-color: #046F94;
        }
    }

    #configBtDiv {
        text-align: left;
        padding-top: 3rem;

        & > .configBt {
            font-size: 1.2rem;
        }
    }

    #home {
        padding-top: 4rem;
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
        overflow: hidden;
        background-color: #F5F5F5;

        & > .header {
            position: fixed;
            top: 0;
            left: 0;
            background-color: white;
            height: 4rem;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            z-index: 1;
            width: 100%;

            & > div:nth-of-type(1) {
                display: flex;
                flex-direction: column;
                justify-content: center;
                text-align: left;
                padding-left: 3rem;
            }

            & > div:nth-of-type(2) {
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

            & > div:nth-of-type(3) {
                display: flex;
                flex-direction: column;
                justify-content: center;
                text-align: right;
                padding-right: 3rem;
            }
        }

        & > div:nth-of-type(2) {
            flex-grow: 1;
            background-color: #F5F5F5;
            text-align: left;


            & > div:nth-of-type(3) {
                padding: 4rem 0 2rem 0;
                font-size: 1.3rem;
                color: #2C3E50;
            }

        }

        & > .footer {
            height: 4rem;
            display: flex;
            justify-content: space-between;
            background-color: white;

            & > .left {
                text-align: left;
                padding-left: 2rem;
                display: flex;
                flex-direction: column;
                justify-content: center;
            }

            & > .center {
                text-align: center;
                display: flex;
                flex-direction: column;
                justify-content: center;
            }

            & > .right {
                text-align: right;
                padding-right: 2rem;
                display: flex;
                flex-direction: column;
                justify-content: center;

                span:nth-of-type(1) {
                    margin-right: 1rem;
                }

                #github_logo {
                    width: 1.1rem;
                    height: 1.1rem;
                }
            }
        }
    }
</style>