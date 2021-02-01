<template>
    <el-row id="configOne">
        <div class="itemBox">
            <div class="stepTitle">
                ① {{$t('org.config_cla_select_org_tile')}}
            </div>
            <div class="margin-top-1rem">
                {{$t('org.config_cla_select_org')}}
            </div>
            <el-row class="margin-top-1rem">
                <el-col>
                    <el-select v-model="orgValue"
                               :placeholder="$t('org.config_cla_select_org_placeholder')"
                               style="width: 100%"
                               size="medium"
                               clearable
                               filterable
                               @visible-change="orgVisibleChange"
                               @change="changeOrg">
                        <el-option
                                v-for="item in orgOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-col>
            </el-row>
            <div class="margin-top-1rem">
                {{$t('org.config_cla_select_org_alias')}}
            </div>
            <div class="margin-top-1rem">
                <el-input v-model="org_alias" size="medium"
                          :placeholder="$t('org.config_cla_select_org_alias_placeholder')"></el-input>
            </div>
            <div class="margin-top-1rem">
                {{$t('org.config_cla_select_repo')}}
            </div>
            <el-row class="margin-top-1rem">
                <el-col>
                    <el-select v-model="repositoryValue"
                               :placeholder="$t('org.config_cla_select_repo_placeholder')"
                               style="width: 100%"
                               size="medium"
                               clearable=""
                               filterable
                               @visible-change="repoVisibleChange"
                               @change="changeRepository">
                        <el-option
                                v-for="item in repositoryOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-col>
            </el-row>
        </div>
        <div class="orgStepBtBox">
            <button class="step_button" @click="toConfigClaLink">{{$t('org.next_step')}}</button>
        </div>
        <ReTryDialog :message="reTryMsg" :dialogVisible="reTryVisible"></ReTryDialog>
        <ReLoginDialog :message="reTryMsg" :dialogVisible="orgReLoginVisible"></ReLoginDialog>
    </el-row>
</template>

<script>
    import ReTryDialog from '../components/ReTryDialog'
    import ReLoginDialog from '../components/ReLoginDialog'
    import * as url from '../util/api'
    import _axios from '../util/_axios'

    export default {
        name: "ConfigOne",
        components: {
            ReTryDialog,
            ReLoginDialog,
        },
        computed: {
            reTryMsg() {
                return this.$store.state.dialogMessage
            },
            orgReLoginVisible() {
                return this.$store.state.orgReLoginDialogVisible
            },
            reTryVisible() {
                return this.$store.state.reTryDialogVisible
            },
            orgOptions() {
                try {
                    return JSON.parse(this.$store.state.orgOptions)
                } catch (e) {
                    return this.$store.state.orgOptions
                }
            },
            orgChoose() {
                return `${this.$store.state.orgChoose}` === 'true';
            },
            repositoryChoose() {
                return `${this.$store.state.repositoryChoose}` === 'true'
            },
            repositoryOptions() {
                try {
                    return JSON.parse(this.$store.state.repositoryOptions)
                } catch (e) {
                    return this.$store.state.repositoryOptions
                }

            },
            orgValue() {
                if (this.$store.state.orgValue === undefined || this.$store.state.orgValue === '' || this.$store.state.orgValue === 'undefined') {
                    return undefined
                } else {
                    return Number(this.$store.state.orgValue)
                }
            },
            repositoryValue() {
                if (this.$store.state.repositoryValue === undefined || this.$store.state.repositoryValue === '' || this.$store.state.repositoryValue === 'undefined') {
                    return undefined
                } else {
                    return Number(this.$store.state.repositoryValue)
                }
            },
            org_alias: {
                get() {
                    return this.$store.state.orgAlias;
                },
                set(value) {
                    this.$store.commit('setOrgAlias', value)
                },
            },
        },
        data() {
            return {
                org_id: '',
                org: this.$store.state.chooseOrg,
            }
        },
        methods: {
            toConfigClaLink() {
                if (this.org && this.org_alias) {
                    this.$router.replace('/config-email')
                } else {
                    this.$store.commit('errorCodeSet', {
                        dialogVisible: true,
                        dialogMessage: this.$t('corp.fill_complete'),
                    });
                }
            },
            orgVisibleChange(visible) {
                if (visible) {
                    this.getOrgsInfo();
                }
            },
            repoVisibleChange(visible) {
                if (visible && this.org) {
                    this.getRepositoriesOfOrg(this.org, this.org_id);
                }
            },
            changeOrg(value) {
                this.$store.commit('setOrgValue', value);
                this.$store.commit('setRepositoryValue', undefined);
                this.$store.commit('setRepositoryChoose', false);
                this.$store.commit('setRepositoryOptions', undefined);
                if (value === '') {
                    this.$store.commit('setChooseOrg', '');
                    this.org = '';
                    this.org_id = '';
                    this.$store.commit('setOrgChoose', false);
                } else {
                    this.$store.commit('setChooseOrg', this.orgOptions[value].label);
                    this.org = this.orgOptions[value].label;
                    this.org_id = this.orgOptions[value].id;
                    this.$store.commit('setOrgChoose', true);
                    this.getRepositoriesOfOrg(this.orgOptions[value].label, this.orgOptions[value].id)
                }
            },
            changeRepository(value) {
                this.$store.commit('setRepositoryValue', value);
                if (value !== '') {
                    this.$store.commit('setRepositoryChoose', true);
                    this.$store.commit('setChooseRepo', this.repositoryOptions[value].label);
                } else {
                    this.$store.commit('setRepositoryChoose', false);
                    this.$store.commit('setChooseRepo', '');
                }
            },
            getRepositoriesOfOrg(org, org_id) {
                let obj = {access_token: this.$store.state.platform_token, org: org, page: 1, per_page: 100};
                _axios({
                    url: `https://gitee.com/api/v5/orgs/${org}/repos`,
                    params: obj,
                }).then(res => {
                    let repositoryOptions = [];
                    res.data.forEach((item, index) => {
                        repositoryOptions.push({
                            value: index,
                            org: org,
                            org_id: org_id,
                            repoName: item.name,
                            label: item.name,
                            id: item.id
                        });
                    });
                    this.$store.commit('setRepositoryOptions', repositoryOptions)
                }).catch(err => {
                    this.$store.commit('errorCodeSet', {
                        dialogVisible: true,
                        dialogMessage: this.$t('tips.system_error'),
                    })
                })
            },
            getOrgsInfo() {
                let obj = {access_token: this.$store.state.platform_token, admin: true, page: 1, per_page: 100};
                _axios({
                    url: url.getOrgsInfo,
                    params: obj,
                }).then(res => {
                    if (res.status === 200) {
                        let orgOptions = [];
                        res.data.forEach((item, index) => {
                            orgOptions.push({value: index, label: item.login, id: item.id});
                        });
                        this.$store.commit('setOrgOption', orgOptions)
                    }
                }).catch(err => {
                    if (err.status === 401) {
                        this.$store.commit('setOrgReLogin', {
                            dialogVisible: true,
                            dialogMessage: this.$t('tips.not_authorize_group'),
                        })
                    }
                })
            },
            init() {
                this.$store.commit('setOrgOption', []);
                this.$store.commit('setOrgValue', '');
                this.$store.commit('setOrgChoose', '');
                this.$store.commit('setRepositoryOptions', []);
                this.$store.commit('setRepositoryChoose', '');
                this.$store.commit('setRepositoryValue', '');
                this.$store.commit('setOrgAlias', '');
                this.$store.commit('setChooseOrg', '');
                this.$store.commit('setChooseRepo', '');
                sessionStorage.removeItem('orgOptions');
                sessionStorage.removeItem('orgValue');
                sessionStorage.removeItem('orgChoose');
                sessionStorage.removeItem('orgAlias');
                sessionStorage.removeItem('repositoryOptions');
                sessionStorage.removeItem('repositoryChoose');
                sessionStorage.removeItem('repositoryValue');
                sessionStorage.removeItem('chooseOrg');
                sessionStorage.removeItem('chooseRepo');
            },
        },
        created() {
            // this.getOrgsInfo();
        },
        beforeRouteEnter(to, from, next) {
            next(vm => {
                if (from.path === '/') {
                    vm.init();
                }
            })
        },
    }
</script>

<style lang="less">
    #configOne {
        .orgStepBtBox {
            text-align: right;
            margin-bottom: 2rem;
        }

        .stepTitle {
            font-size: 1.2rem;
            padding: .5rem;
        }

        .itemBox {
            border-radius: 1.25rem;
            box-shadow: 0 0 20px 10px #F3F3F3;
            padding: 2rem;
            margin-bottom: 2rem;

            .emailInput {
                cursor: pointer;
            }
        }
    }

</style>
