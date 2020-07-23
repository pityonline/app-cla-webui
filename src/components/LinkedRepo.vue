<template>
    <div>
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
    </div>
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
</template>

<script>
    export default {
        name: "linkedRepo",
        data() {
            return {
                unLinkDialogVisible: false,
                tableTotal: 0,
                currentPage: 1,
                tableData: [{repository: 'ooo', cla: 'test', sharedGist: 'Yes', contributors: '0',}, {
                    repository: 'ooo',
                    cla: 'test',
                    sharedGist: 'No',
                    contributors: '0',
                }],
            }
        },
        methods: {
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
                    headers: {
                        'Access-Token': this.access_token,
                        'Refresh-Token': this.refresh_token,
                        'User': `${this.platform}/${this.user.userName}`
                    }

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