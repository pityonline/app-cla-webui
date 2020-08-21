<template>
    <div>
        <div class="tableStyle">
            <el-table
                    :data="tableData"
                    align="center"
                    style="width: 100%;">
                <el-table-column
                        prop="corporation_name"
                        label="CorporationName">

                </el-table-column>
                <el-table-column
                        prop="admin_name"
                        label="AdminName">
                </el-table-column>

                <el-table-column
                        prop="admin_email"
                        label="Email">
                </el-table-column>

                <el-table-column
                        label="PDF"
                        align="center">

                    <template slot-scope="scope">
                        <el-tooltip slot="reference" effect="dark" content="pdf"
                                    placement="bottom">
                            <svg-icon class="pointer" icon-class="pdf" @click=""/>
                        </el-tooltip>

                    </template>
                </el-table-column>
                <el-table-column
                        align="center">

                    <template slot-scope="scope">
                            <div class="mySwitch" style="display: inline-block">
                                <el-switch
                                        @change="changeActive(scope.row.cla_org_id,scope.row.corporation_name,scope.row.admin_email,true)"
                                        v-model="scope.row.enabled"
                                        class="mySwitch"
                                        :disabled="scope.row.enabled"
                                        width="3rem"
                                        active-color="#409EFF"
                                        active-text="active"
                                        inactive-text="inactive"
                                        inactive-color="#EBEEF5">
                                </el-switch>
                            </div>
                        <el-button style="margin-left: 1rem" type="primary" size="mini"
                                   @click="createRoot(scope.row.cla_org_id,scope.row.admin_email)">Create Root
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


</template>
<script>
    import * as url from '../until/api'

    export default {
        name: "CorporationList",
        data() {
            return {
                item: '',
                tableData: [{
                    corporation_name: 'ooo',
                    admin_name: 'ocl',
                    admin_email: '666@qq.com',
                    date: '2020-08-18'
                }, {corporation_name: 'oco', admin_name: 'oll', email: '555@qq.com', date: '2020-08-19'},],
                currentPage: 1,
                tableTotal: 0,
            }
        },

        watch:{
            // 监听,当路由发生变化的时候执行
            $route(to,from){
                console.log(from.path);
            }
        },
        created() {

            console.log(this.$route.query.item, 'created',sessionStorage.getItem('item'),JSON.parse(sessionStorage.getItem('item')));
            if (JSON.parse(sessionStorage.getItem('item'))) {
                console.log('if');
                this.item=JSON.parse(sessionStorage.getItem('item'))
                this.getCorporationInfo()
            }else{
                console.log('else');

                this.tableData = this.$route.query.item.corporationInfo
                this.item = this.$route.query.item
                sessionStorage.setItem('item',JSON.stringify(this.$route.query.item))
            }
            },

        methods: {
            getCorporationInfo() {
                this.$axios({
                    url: `/api${url.corporation_signing}`,
                    params: {
                        platform: this.item.platform,
                        org_id: this.item.org_id,
                        repo_id: this.item.repo_id,
                        cla_language: this.item.cla_language
                    },
                }).then(resp => {
                    console.log(resp);
                    this.tableData = resp.data;
                }).catch(err => {
                    console.log(err);
                })
            },
            createRoot(cla_org_id, email) {
                let data = {cla_org_id: cla_org_id, email: email}
                this.$axios({
                    url: `/api${url.corporationManager}`,
                    method: 'post',
                    data: data,
                }).then(res => {
                    console.log(res);
                    this.$message.closeAll()
                    this.$message.success('success')
                    this.getCorporationInfo()
                }).catch(err => {
                    console.log(err);
                    this.$message.closeAll()
                    this.$message.error('failed')
                })
            },
            changeActive(cla_org_id, corporation_name, admin_email, enabled) {
                console.log('changeActive', cla_org_id, admin_email);
                let data = {
                    cla_org_id: cla_org_id,
                    corporation_name: corporation_name,
                    admin_email: admin_email,
                    enabled: enabled
                }
                this.$axios({
                    url: `/api${url.active_corporation}`,
                    method: 'put',
                    data: data,
                }).then(res => {
                    console.log(res);
                    this.getCorporationInfo()

                }).catch(err => {
                    console.log(err);
                })
            },
        },

    }
</script>

<style lang="less">
    .mySwitch .el-switch__label {
        position: absolute;
        display: none;
        color: #fff;
    }

    /*打开时文字位置设置*/
    .mySwitch .el-switch__label--right {
        z-index: 1;
        right: 0.5rem;
    }

    /*关闭时文字位置设置*/
    .mySwitch .el-switch__label--left {
        z-index: 1;
        left: .5rem;
    }

    /*显示文字*/
    .mySwitch .el-switch__label.is-active {
        display: block;
    }

    .mySwitch.el-switch .el-switch__core,
    .el-switch .el-switch__label {
        width: 4rem !important;
    }
    .mySwitch .el-switch.is-disabled .el-switch__core,.mySwitch .el-switch.is-disabled .el-switch__label,.tableStyle{
        cursor: pointer;
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

    .pointer {
        cursor: pointer;
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

</style>