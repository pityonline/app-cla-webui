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

<style scoped>

</style>