<template>
    <div>
        <div class="tableStyle">
            <el-table
                    :data="this.$store.state.tableData"
                    align="center"
                    style="width: 100%;">
                <el-table-column
                        prop="repository"
                        label="Repository"
                        width="220">
                    <template slot-scope="scope">
                        <svg-icon icon-class="repository"/>
                        <span class="pointer hoverUnderline"
                              @click="newWindow()"
                              style="margin-left: 10px;">{{ scope.row.repository }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="claName"
                        label="CLA"
                        width="220">
                    <template slot-scope="scope">
                                        <span class="pointer hoverUnderline"
                                              @click="checkCla()">{{scope.row.claName}}</span>
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

                        <el-tooltip slot="reference" effect="dark" content="unlink"
                                    placement="bottom">
                            <svg-icon class="pointer" icon-class="delete" @click="unlinkHandleClick(scope)"/>
                        </el-tooltip>
                        <!--<el-popover-->
                        <!--width="80"-->
                        <!--placement="right">-->

                        <!--<div class="menuBT">-->
                        <!--<el-button type="primary" size="medium">Import</el-button>-->
                        <!--<el-button type="primary" size="medium">ReCheck PRs</el-button>-->
                        <!--<el-button type="primary" size="medium">Get Badge</el-button>-->
                        <!--<el-button type="primary" size="medium"-->
                        <!--@click="unLinkDialogVisible=true">Unlink-->
                        <!--</el-button>-->
                        <!--</div>-->
                        <!--<el-tooltip slot="reference" effect="dark" content="More.."-->
                        <!--placement="bottom">-->
                        <!--<svg-icon class="pointer" icon-class="menu"/>-->
                        <!--</el-tooltip>-->
                        <!--</el-popover>-->
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
        <el-dialog
                title=""
                top="5vh"
                :visible.sync="unLinkDialogVisible"
                width="35%">
            <div>
                <p class="dialogDesc">Are you sure you want to unlink?</p>
                <div style="text-align: center">
                    <svg-icon style="width: 30rem;height: 20rem;margin:0 auto" icon-class="error"></svg-icon>
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
                    <el-button type="danger" @click="unLinkRepositoryFun()">Unlink anyway</el-button>
                </div>

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
    </div>


</template>
<script>
    import {mapActions} from 'vuex'
    import * as url from '../until/api'

    export default {
        name: "linkedRepo",
        data() {
            return {
                platform: this.$store.state.platform,
                editDialogVisible: false,
                unLinkDialogVisible: false,
                tableTotal: 0,
                currentPage: 1,
            }
        },
        created() {
            // this.getCookieData()
        },
        methods: {
            ...mapActions(['setLoginUserAct', 'setTokenAct', 'getLinkedRepoListAct']),

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

            /*cla条目编辑*/
            editHandleClick(index) {
                console.log(index);
                this.editDialogVisible = true
            },

            unlinkHandleClick(index) {
                console.log(index);
                this.unLinkDialogVisible = true
            },
            /*查看CLA签署状态*/
            checkCla() {
                console.log("checkCla");
                this.$router.push('/checkCla')
            },
            newWindow() {
                // window.open('https://github.com/ouchengle/Test','_black')
                window.open('https://github.com/ouchengle')
            },
            /*解绑开源项目*/
            unLinkRepositoryFun() {

                let obj = {
                    id: this.$store.state.tableData[0].id,
                };
                this.$axios({
                    url: `/api${url.unLinkRepository}/${this.$store.state.tableData[0].id}`,
                    method: 'delete',
                    headers: {
                        'Access-Token': this.$store.state.access_token,
                        'Refresh-Token': this.$store.state.refresh_token,
                        'User': `${this.platform}/${this.$store.state.user.userName}`
                    }

                }).then(res => {
                    console.log(res);
                    this.$message.success('解绑成功')
                    this.unLinkDialogVisible = false
                    let data = {
                        access_token: this.$store.state.access_token,
                        refresh_token: this.$store.state.refresh_token,
                        userName: this.$store.state.user.userName,
                        platform: this.platform
                    }
                    this.getLinkedRepoListAct(data)
                }).catch(err => {
                    console.log(err);
                })
            },
            /*首页展示项目翻页*/
            changePage(page) {
                console.log(page);
            },
        },

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
        text-align: center;
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