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
                                               @change="changeCla">
                                        <el-option
                                                v-for="item in claOptions"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value">
                                        </el-option>
                                    </el-select>

                                </div>

                                <div style="font-size: 1rem;padding: .5rem 2rem">
                                    Email
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
                        <el-col :span="12" :offset="2">
                            <el-input rows="16" readonly type="textarea" v-model="previewText" style="white-space: pre-wrap">

                            </el-input>
                        </el-col>
                    </el-row>

                </el-row>

            </el-row>

            <div>
                <el-tabs v-model="activeName" @tab-click="tabsHandleClick">
                    <el-tab-pane label="Linked Repositories" name="first" style="margin-top: 1rem">
                        <div class="tableStyle">
                            <el-table
                                    :data="tableData"
                                    align="center"
                                    style="width: 100%;">
                                <el-table-column
                                        prop="repository"
                                        label="Repository"
                                        width="180">
                                    <template slot-scope="scope">
                                        <svg-icon icon-class="repository"/>
                                        <span class="pointer hoverUnderline"
                                              @click="newWindow()"
                                              style="margin-left: 10px;">{{ scope.row.repository }}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                        prop="cla"
                                        label="CLA"
                                        width="180">
                                    <template slot-scope="scope">
                                        <span class="pointer hoverUnderline"
                                              @click="checkCla()">{{scope.row.cla}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                        prop="gist"
                                        label="Gist">
                                    <template slot-scope="scope">
                                        <svg-icon style="cursor: pointer" icon-class="github"/>
                                    </template>
                                </el-table-column>

                                <el-table-column
                                        prop="sharedGist"
                                        label="Shared Gist">
                                </el-table-column>
                                <el-table-column
                                        prop="contributors"
                                        label="Contributors"
                                        align="center">
                                </el-table-column>
                                <el-table-column
                                        prop="status"
                                        align="center"
                                        label="Status">
                                    <template slot-scope="scope">
                                        <svg-icon class="pointer" icon-class="link_active"/>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                        align="center">

                                    <template slot-scope="scope">
                                        <el-tooltip class="item" effect="dark" content="Edit" placement="bottom">
                                            <svg-icon class="pointer" style="display: inline-block;margin-right: .5rem"
                                                      icon-class="edit" @click="editHandleClick(scope)"/>
                                        </el-tooltip>


                                        <el-popover
                                                width="80"
                                                placement="right">

                                            <div class="menuBT">
                                                <el-button type="primary" size="medium">Import</el-button>
                                                <el-button type="primary" size="medium">ReCheck PRs</el-button>
                                                <el-button type="primary" size="medium">Get Badge</el-button>
                                                <el-button type="primary" size="medium"
                                                           @click="unLinkDialogVisible=true">Unlink
                                                </el-button>
                                            </div>
                                            <el-tooltip slot="reference" effect="dark" content="More.."
                                                        placement="bottom">
                                                <svg-icon class="pointer" icon-class="menu"/>
                                            </el-tooltip>
                                        </el-popover>
                                    </template>
                                </el-table-column>

                            </el-table>
                        </div>
                        <div class="paginationClass">
                            <el-pagination
                                    background
                                    :page-size="5"
                                    :pager-count="5"
                                    :hide-on-single-page="true"
                                    :current-page="currentPage"
                                    @current-change="changePage"
                                    layout="prev, pager, next"
                                    :total="tableTotal">
                            </el-pagination>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="Signed Repositories" name="second" style="margin-top: 1rem">
                        <el-col :offset="8" :span="8" v-if="!isVerify">
                            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px"
                                     class="demo-ruleForm" style="padding: 2rem">
                                <el-form-item label="账号" prop="account">
                                    <el-input v-model="ruleForm.account" autocomplete="off"></el-input>
                                </el-form-item>
                                <el-form-item label="密码" prop="pass">
                                    <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
                                </el-form-item>
                                <el-form-item>
                                    <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                                </el-form-item>
                            </el-form>
                        </el-col>
                        <div v-else>
                            <div class="tableStyle">
                                <el-table
                                        :data="tableDataOther"
                                        align="center"
                                        style="width: 100%;">
                                    <el-table-column
                                            prop="repository"
                                            label="Repository"
                                            width="180">
                                        <template slot-scope="scope">
                                            <svg-icon icon-class="repository"/>
                                            <span class="pointer hoverUnderline"
                                                  @click="newWindow()"
                                                  style="margin-left: 10px;">{{ scope.row.repository }}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                            prop="cla"
                                            label="CLA"
                                            width="180">
                                        <template slot-scope="scope">
                                            <span class="pointer hoverUnderline"
                                                  @click="checkCla()">{{scope.row.cla}}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                            prop="gist"
                                            label="Gist">
                                        <template slot-scope="scope">
                                            <svg-icon style="cursor: pointer" icon-class="github"/>
                                        </template>
                                    </el-table-column>

                                    <el-table-column
                                            prop="sharedGist"
                                            label="Shared Gist">
                                    </el-table-column>
                                    <el-table-column
                                            prop="contributors"
                                            label="Contributors"
                                            align="center">
                                    </el-table-column>
                                    <el-table-column
                                            prop="status"
                                            align="center"
                                            label="Status">
                                        <template slot-scope="scope">
                                            <svg-icon class="pointer" icon-class="link_active"/>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                            align="center">
                                        <template slot-scope="scope">
                                            <el-button type="primary" v-if="tableType===3" size="small"
                                                       @click="listDialogVisible=true">白名单
                                            </el-button>
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </div>
                            <div class="paginationClass">
                                <el-pagination
                                        background
                                        :page-size="5"
                                        :pager-count="5"
                                        :hide-on-single-page="true"
                                        :current-page="currentPage"
                                        @current-change="changePage"
                                        layout="prev, pager, next"
                                        :total="tableTotal">
                                </el-pagination>
                            </div>
                        </div>

                    </el-tab-pane>

                </el-tabs>
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
        <el-dialog
                title=""
                top="5vh"
                :visible.sync="editDialogVisible"
                width="35%">
            <div>
                <p class="size_b">Edit ooo/Test</p>
                <div class="left">
                    <div>
                        <span class="size_m">Choose a CLA</span>
                    </div>
                    <div>
                        <span>(please note that changing the CLA results in a new request to sign the CLA from the contributors!)</span>
                    </div>
                    <p class="size_m" style="margin-bottom: .2rem">Select from Gist</p>
                    <el-select v-model="claValue"
                               clearable
                               placeholder="select"
                               style="width: 100%"
                               size="medium"
                               @change="changeCla"
                               :value="claValue">
                        <el-option
                                v-for="item in claOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                    <div class="dialogDec">
                        Email
                    </div>
                    <el-input
                            size="medium"
                            placeholder="Input your email"
                            v-model="email">

                    </el-input>
                    <div class="dialogDec">
                        - or -
                    </div>
                    <div class="dialogDec">
                        Paste a URL from a Gist
                    </div>
                    <div>
                        <el-input
                                size="medium"
                                placeholder="https://gist.github.com/<your cla gist id>"
                                v-model="gistUrl">

                        </el-input>
                    </div>
                    <!--是否分享-->
                    <div class="dialogDec">
                        <el-checkbox v-model="shareGistChecked"/>
                        Share the Gist
                        <span class="qusLink"
                              @click="shareDialogVisible=true">(want to share?)</span>
                    </div>

                    <!--文件修改数-->
                    <div class="dialogDec">
                        Minimum File Number Changes
                    </div>
                    <div>
                        <el-input
                                type="number"
                                size="medium"
                                placeholder="number"
                                v-model="fileNumber">

                        </el-input>
                    </div>
                    <!--行修改数-->
                    <div class="dialogDec">
                        - or -
                    </div>
                    <div class="dialogDec">
                        Minimum Line Number Changes
                    </div>
                    <div>
                        <el-input
                                type="number"
                                size="medium"
                                placeholder="number"
                                v-model="lineNumber">

                        </el-input>
                    </div>

                    <div class="dialogDec">Specify usernames to be whitelisted <span class="qusLink">(how does this work?)</span>
                    </div>
                    <span>(you can also use wildcard *)</span>
                    <div class="dialogDec">
                        <el-input
                                size="medium"
                                placeholder="user1,user2,*[bot]"
                                v-model="gistUrl">

                        </el-input>
                    </div>
                    <div class="dialogDec">
                    <span>Request the user's consent to the use of personal data in accordance with your privacy policy.
                        Please, provide a link to your Privacy Policy here</span>
                    </div>
                    <div class="dialogDec">
                        <el-input
                                size="medium"
                                placeholder="https://..."
                                v-model="gistUrl">

                        </el-input>
                    </div>

                </div>


                <div class="right" style="margin: 1rem 0">
                <span slot="footer" class="dialog-footer">
                    <el-button @click="editDialogVisible = false">Cancel</el-button>
                    <el-button type="primary" @click="editDialogVisible = false">Save</el-button>
                </span>
                </div>
            </div>

        </el-dialog>
        <el-dialog
                title=""
                top="5vh"
                :visible.sync="unLinkDialogVisible"
                width="35%">
            <div>
                <p class="dialogDesc" style="margin-top: 0">Are you sure you want to unlink?</p>
                <div>
                    <svg-icon style="width: 30rem;height: 20rem;margin: auto" icon-class="error"></svg-icon>
                </div>

                <div style="padding: 0 6rem;text-align: left;font-size: 1.3rem">
                    <p style="text-align: center">Unlinking will...</p>
                    <ul>
                        <li>Remove the CLA assistant webhook in your repository/organization
                        </li>
                        <li>Remove the link to your list of contributors</li>

                    </ul>
                </div>

                <div class="right">
                    <el-button @click="unLinkDialogVisible = false">Keep it</el-button>
                    <el-button type="danger" @click="unLinkRepository()">Unlink anyway</el-button>
                </div>

            </div>

        </el-dialog>
        <el-dialog
                title="白名单"
                top="5vh"
                :visible.sync="listDialogVisible"
                width="70%">
            <div style="margin-bottom: 1rem">
                <el-table
                        :data="listData"
                        align="center"
                        style="width: 100%;">
                    <el-table-column
                            prop="name"
                            label="Name"
                    >
                    </el-table-column>
                    <el-table-column
                            prop="email"
                            label="Email"
                    >
                    </el-table-column>
                    <el-table-column
                            prop="tel"
                            label="Tel">

                    </el-table-column>

                    <el-table-column
                            align="center">
                        <template slot-scope="scope">
                            <el-switch
                                    v-model="scope.row.isUsed"
                                    active-color="#409EFF"
                                    inactive-color="#EBEEF5">
                            </el-switch>
                            <el-button style="margin-left: 1rem" type="danger" size="mini">删除
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>

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
        computed:{
            access_token:()=>{
                return this.$store.state.access_token;
            }
        },
        data() {

            var validateAccount = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入账号'));
                }
                callback();
            };
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                }
                callback();
            };
            return {

                linkLoading: false,
                platform: this.$store.state.platform,
                ruleForm: {
                    pass: '',
                    account: '',
                },
                rules: {
                    account: [
                        {validator: validateAccount, trigger: 'blur'}
                    ],
                    pass: [
                        {validator: validatePass, trigger: 'blur'}
                    ],
                },
                isVerify: false,
                activeName: 'first',
                previewShow: false,
                previewText: 'previewCla',
                loginType: this.$store.state.loginType,
                tableTotal: 0,
                listData: [{name: 'jack', email: '10577507@qq.com', tel: '15632486433', isUsed: true}, {
                    name: 'Rose',
                    email: '105507@163.com',
                    tel: '18832486437',
                    isUsed: false
                }],
                tableType: 1,
                tableShow: true,
                currentPage: 1,
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
                claChoose: false,
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

                tableData: [{repository: 'ooo', cla: 'test', sharedGist: 'Yes', contributors: '0',}, {
                    repository: 'ooo',
                    cla: 'test',
                    sharedGist: 'No',
                    contributors: '0',
                }],
                tableDataOther: [{repository: 'ooo', cla: 'test', sharedGist: 'Yes', contributors: '0',},],
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
            ...mapActions(['setLoginUserAct', 'setTokenAct']),
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        alert('submit!');
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            tabsHandleClick(tab, event) {
                console.log(tab, event);
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
            /*首页展示项目翻页*/
            changePage(page) {
                console.log(page);
            },
            // handleCommand(command) {
            //     // this.$message('click on item ' + command);
            //     this.dropdownTitle = command
            //     switch (command) {
            //         case '发布的开源项目':
            //             this.tableType = 1;
            //             this.tableShow = true;
            //             this.currentPage = 1;
            //             this.tableTotal = this.tableData.length
            //             console.log(this.tableShow);
            //             // this.getLinkedRepositories();
            //             break;
            //         case '个人签署的项目':
            //             this.tableType = 2;
            //             this.currentPage = 1;
            //
            //             this.tableShow = false;
            //             console.log(this.tableShow);
            //             this.tableTotal = this.tableDataOther.length;
            //
            //             break;
            //         case '企业签署的项目':
            //             this.tableType = 3;
            //             this.currentPage = 1;
            //
            //             this.tableShow = false;
            //             console.log(this.tableShow);
            //             this.tableTotal = this.tableDataOther.length;
            //
            //             // this.getCompanyRepositories();
            //             break;
            //         case '企业个人签署的项目':
            //             this.tableType = 4;
            //             this.tableShow = false;
            //             this.currentPage = 1;
            //
            //             console.log(this.tableShow);
            //             this.tableTotal = this.tableDataOther.length;
            //             // this.getCompanyPersonRepositories();
            //             break;
            //
            //
            //     }
            // },
            /*获取发布的开源项目*/
            getLinkedRepositories() {
                console.log('getLinkedRepositories');
                let obj = {
                    userName: this.user.userName
                };
                this.$axios({
                    url: url.getLinkedRepositories,
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


            /*邮箱验证*/
            verifyEmail() {
                var email = this.email;
                console.log(email);
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
            /*解绑开源项目*/
            unLinkRepository() {
                this.linkDialogVisible = false;
                let obj = {
                    repositoryValue: this.repositoryValue,
                    claValue: this.claValue,

                };
                this.$axios({
                    url: url.unLinkRepository,
                    methods: 'post',
                    data: obj,
                    headers: {access_token: this.$store.state.access_token, refresh_token: this.refresh_token}
                }).then(res => {
                    console.log(res);
                    if (res.data.code === 200) {
                        this.repositoryOptions = res.data.data
                        this.$message.success('解绑成功')
                        this.unLinkDialogVisible = false
                    }
                }).catch(err => {
                    console.log(err);
                })
            },
            /*链接开源项目*/
            linkRepository() {
                this.linkLoading = true;
                let obj = {
                    repo_id: `${this.repositoryOptions[this.repositoryValue].id}`,
                    cla_id: this.claOptions[this.claValue].id,
                    org_email: this.email,
                    platform: this.platform,
                    org_id: `${this.repositoryOptions[this.repositoryValue].org_id}`,
                    cla_language: this.claOptions[this.claValue].language,
                    submitter: `${this.platform}/${this.user.userName}`,
                    metadata_id: '',
                };
                console.log(obj);
                this.$axios({
                    url: '/api' + url.linkRepository,
                    method: 'post',
                    data: obj,
                    headers: {access_token: this.$store.state.access_token, refresh_token: this.refresh_token}
                }).then(res => {
                    this.$message.success('success')
                    console.log(res);
                    this.claValue = '';
                    this.repositoryValue = '';
                    this.email = '';
                    this.linkLoading = false;
                    this.linkDialogVisible = false;
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
            /*选择cla*/
            changeCla(value) {
                this.claChoose = true;
                console.log(this.claValue);
                this.previewText = this.claOptions[value].text;
            },
            /*弹出dialog说明框*/
            createCLA() {
                console.log("authorize");
                this.createCLADialogVisible = true
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
            getRepositoriesOfOrg(org,org_id) {
                let obj = {access_token: this.$store.state.access_token, org: org, page: 1, per_page: 10};
                console.log("getRepositoriesOfOrg",obj);
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
                                org_id:org_id,
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
                console.log("getOrgsInfo",obj);
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
                            this.getRepositoriesOfOrg(item.login,item.id)
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
                    headers: {access_token: this.$store.state.access_token, refresh_token: this.refresh_token}
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
            getLinkedRepoList(access_token,refresh_token,userName){
                let obj ={platform:this.platform}
                console.log(obj,access_token,refresh_token);
                this.$axios({
                    url: '/api' + url.getLinkedRepoList,
                    headers: {'Access-Token': access_token, 'Refresh-Token': refresh_token, 'User':`${this.platform}/${userName}`}
                }).then(res => {
                    console.log(res);
                    if (res.data.length) {

                    }
                }).catch(err => {
                    console.log(err);
                })

            },
            /*点击配置cla按钮*/
            configCla() {
                this.showConfigForm = true;
                this.home.height = 'auto'
                this.getCLA()
                this.getOrgsInfo()
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
            getCookieData() {
                console.log('getCookieData');
                if (document.cookie!=='') {
                    let cookieArr = document.cookie.split('; ')
                    let access_token, refresh_token = '';
                    cookieArr.forEach((item, index) => {
                        let arr = item.split('=');
                        arr[0] === 'access_token' ? access_token = arr[1] : arr[0] === 'refresh_token' ? refresh_token = arr[1] : refresh_token = '';
                        ;
                    })
                    let data = {access_token, refresh_token};
                    this.setTokenAct(data);
                    this.getUserInfo(access_token,refresh_token)

                }

            },
            /*获取用户名并显示*/
            getUserInfo(access_token,refresh_token) {
                let obj = {access_token: access_token};
                console.log(obj);
                this.$axios({
                    url: url.getUserInfo,
                    params: obj,
                }).then(res => {
                    console.log(res);
                    if (res.status === 200) {
                        let data = {
                            userId: res.data.id,
                            userName: res.data.login,
                            userImg: res.data.avatar_url,
                            userEmail: res.data.email
                        };
                        this.setLoginUserAct(data);
                        this.getLinkedRepoList(access_token,refresh_token,res.data.login)
                    }
                }).catch(err => {
                    console.log(err);
                })
            },

            openFullScreen() {
                const loading = this.$loading({
                    lock: true,
                    // text: 'Loading',
                    // spinner: 'el-icon-loading',
                    background: 'rgba(255, 255, 255, 0.8)'
                });
                setInterval(()=>{
                    this.$store.state.user.userName&&loading.close();
                },500)
            }
        },

        created() {
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