<template>
    <el-row id="configTwo">
        <div class="itemBox">
            <div class="stepTitle">
                ③ {{$t('org.config_cla_paste_url_title')}}
                <el-tooltip class="item" effect="light"
                            :content="$t('org.config_cla_paste_url_title_tooltips')"
                            placement="right">
                    <svg-icon icon-class="bangzhu"></svg-icon>
                </el-tooltip>
            </div>
            <div>
                <div class="margin-top-1rem">
                    {{$t('org.config_cla_paste_individual_url')}}
                </div>
                <div class="margin-top-1rem">
                    {{$t('org.config_cla_individual_url_desc')}}
                </div>
                <div class="margin-top-1rem">
                    <el-row class="margin-top-1rem">
                        <el-col>
                            <el-input clearable="" :placeholder="$t('org.config_cla_url_placeholder')" size="medium"
                                      v-model="cla_link_individual">
                            </el-input>
                        </el-col>
                    </el-row>
                    <el-row class="margin-top-1rem">
                        {{$t('org.config_cla_individual_lang')}}
                    </el-row>
                    <el-row class="margin-top-1rem">
                        <el-col>
                            <el-select v-model="individualClaLanguageValue"
                                       :placeholder="$t('org.config_cla_select_lang')"
                                       style="width: 100%"
                                       size="medium"
                                       clearable
                                       filterable
                                       @change="changeIndividualLanguage">
                                <el-option
                                        v-for="item in languageOptions"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-col>
                    </el-row>
                </div>
            </div>
            <div class="margin-top-2rem">
                <div class="margin-top-1rem">
                    {{$t('org.config_cla_corp_url')}}
                </div>
                <div class="margin-top-1rem">
                    {{$t('org.config_cla_paste_corp_url')}}
                </div>
                <div class="margin-top-1rem">
                    {{$t('org.config_cla_corp_url_desc')}}
                </div>
                <div class="margin-top-1rem">
                    <el-row>
                        <el-col>
                            <el-input clearable="" :placeholder="$t('org.config_cla_url_placeholder')" size="medium"
                                      v-model="cla_link_corporation">
                            </el-input>
                        </el-col>
                    </el-row>
                    <div class="margin-top-1rem">
                        {{$t('org.config_cla_corp_lang')}}
                    </div>
                    <el-row class="margin-top-1rem">
                        <el-col>
                            <el-select v-model="corpClaLanguageValue"
                                       :placeholder="$t('org.config_cla_select_lang')"
                                       style="width: 100%"
                                       size="medium"
                                       clearable
                                       filterable
                                       @change="changeCorpLanguage">
                                <el-option
                                        v-for="item in languageOptions"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-col>
                    </el-row>
                    <div class="margin-top-1rem">
                        {{$t('org.config_cla_upload_file_title')}}
                    </div>
                    <div class="margin-top-1rem">
                        {{$t('org.config_cla_corp_file')}}
                        <span @click="downloadFile"
                              class="downloadText">{{$t('org.config_cla_corp_file_download')}}</span>
                    </div>
                    <div class="margin-top-1rem">
                        <div>
                            <button class="showBox">
                                <input class="inputFile" id="corp_pdf" @change="changeFile" type="file" name="file">
                                {{$t('org.config_cla_corp_choose_file')}}
                            </button>
                            <span class="signatureName">
                                {{this.$store.state.corpFDName}}
                                <svg-icon class="delete-icon" v-if="this.$store.state.corpFDName" @click="deleteFile"
                                          icon-class="clear"></svg-icon>
                            </span>

                        </div>
                        <div class="margin-top-1rem file_size_tips">
                            {{$t('org.config_cla_corp_file_size',{max_size_kb:this.max_size})}}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="stepBtBox">
            <button class="step_button" @click="toPreviousPage">{{$t('org.previous_step')}}</button>
            <button class="step_button" @click="toNextPage">{{$t('org.next_step')}}</button>
        </div>
        <ReTryDialog :message="reLoginMsg" :dialogVisible="reTryVisible"></ReTryDialog>
        <ReLoginDialog :dialogVisible="reLoginDialogVisible" :message="reLoginMsg"></ReLoginDialog>
    </el-row>

</template>
<script>
    import * as url from '../until/api'
    import * as until from '../until/until'
    import http from '../until/http'
    import download from 'downloadjs'
    import ReTryDialog from '../components/ReTryDialog'
    import ReLoginDialog from '../components/ReLoginDialog'

    export default {
        name: "ConfigClaLink",
        components: {
            ReTryDialog,
            ReLoginDialog,
        },
        computed: {
            reTryVisible() {
                return this.$store.state.reTryDialogVisible
            },
            reLoginDialogVisible() {
                return this.$store.state.orgReLoginDialogVisible
            },
            reLoginMsg() {
                return this.$store.state.dialogMessage
            },
            cla_link_individual: {
                get() {
                    return this.$store.state.claLinkIndividual;
                },
                set(value) {
                    this.$store.commit('setClaLinkIndividual', value)
                },
            },
            cla_link_corporation: {
                get() {
                    return this.$store.state.claLinkCorp;
                },
                set(value) {
                    this.$store.commit('setClaLinkCorp', value)
                },
            },
            individualClaLanguageValue: {
                get() {
                    return this.$store.state.individualLanguage;
                },
                set(value) {
                    this.$store.commit('setIndividualLanguage', value)
                }
            },
            corpClaLanguageValue: {
                get() {
                    return this.$store.state.corpLanguage;
                },
                set(value) {
                    this.$store.commit('setCorpLanguage', value)
                }
            },
            corpReLoginMsg() {
                return this.$store.state.dialogMessage
            },
            corpReTryDialogVisible() {
                return this.$store.state.reTryDialogVisible
            },
        },
        data() {
            return {
                max_size: SIGNATURE_PAGE_MAX_SIZE,
                corp_pdf_name: '',
                languageOptions: [{value: 'english', label: 'English'}, {value: 'chinese', label: '中文'}],
            }
        },
        methods: {
            deleteFile() {
                let input = document.getElementById('corp_pdf');
                input.value = '';
                this.$store.commit('setCorpFDName', '');
                this.$store.commit('setCorpFD', '');
                sessionStorage.removeItem('corpFDName');
                sessionStorage.removeItem('corpFD');
            },
            init() {
                this.$store.commit('setIndividualLanguage', '');
                this.$store.commit('setCorpLanguage', '');
                this.$store.commit('setClaLinkIndividual', '');
                this.$store.commit('setClaLinkCorp', '');
                this.$store.commit('setCorpFDName', '');
                this.$store.commit('setCorpFD', '');
                sessionStorage.removeItem('individualLanguage');
                sessionStorage.removeItem('corpLanguage');
                sessionStorage.removeItem('claLinkIndividual');
                sessionStorage.removeItem('claLinkCorp');
                sessionStorage.removeItem('corpFDName');
                sessionStorage.removeItem('corpFD');
            },
            downloadFile() {
                if (this.corpClaLanguageValue) {
                    http({
                        url: `${url.getBlankSignature}/${this.$store.state.corpLanguage}`,
                        responseType: "blob",
                    }).then(res => {
                        if (res.data) {
                            let time = until.getNowDateToTime();
                            download((new Blob([res.data])), `${this.$store.state.corpLanguage}_blank_signature${time}.pdf`, 'application/pdf');
                        }
                    }).catch(err => {
                        if (err.data && err.data.hasOwnProperty('data')) {
                            switch (err.data.data.error_code) {
                                case 'cla.invalid_token':
                                    this.$store.commit('setOrgReLogin', {
                                        dialogVisible: true,
                                        dialogMessage: this.$t('tips.invalid_token'),
                                    });
                                    break;
                                case 'cla.missing_token':
                                    this.$store.commit('setOrgReLogin', {
                                        dialogVisible: true,
                                        dialogMessage: this.$t('tips.missing_token'),
                                    });
                                    break;
                                case 'cla.unknown_token':
                                    this.$store.commit('setOrgReLogin', {
                                        dialogVisible: true,
                                        dialogMessage: this.$t('tips.unknown_token'),
                                    });
                                    break;
                                case 'cla.system_error':
                                    this.$store.commit('errorCodeSet', {
                                        dialogVisible: true,
                                        dialogMessage: this.$t('tips.system_error'),
                                    });
                                    break;
                                default :
                                    this.$store.commit('errorCodeSet', {
                                        dialogVisible: true,
                                        dialogMessage: this.$t('tips.unknown_error'),
                                    });
                                    break;
                            }
                        } else {
                            this.$store.commit('errorCodeSet', {
                                dialogVisible: true,
                                dialogMessage: this.$t('tips.system_error'),
                            })
                        }
                    })
                } else {
                    this.$message.closeAll();
                    this.$message.error(this.$t('org.config_cla_download_empty_signature_tips'));
                }
            },
            changeIndividualLanguage(value) {
                this.$store.commit('setIndividualLanguage', value)
            },
            changeCorpLanguage(value) {
                this.$store.commit('setCorpLanguage', value)
            },
            changeFile() {
                let formData = new FormData();
                let input = document.getElementById('corp_pdf');
                let fs = input.files;
                let _size = 1024 * this.max_size;
                for (let i = 0; i < fs.length; i++) {
                    let d = fs[i];
                    if (/.(PDF|pdf)$/.test(d.name)) {
                        if (d.size <= _size) {
                            formData.append("files", fs[i]);
                            this.$store.commit('setCorpFDName', formData.get('files').name);
                            let reader = new FileReader();
                            reader.readAsDataURL(formData.get('files'));
                            reader.onload = () => {
                                this.$store.commit('setCorpFD', reader.result)
                            };
                        } else {
                            input.value = '';
                            this.$store.commit('errorCodeSet', {
                                dialogVisible: true,
                                dialogMessage: this.$t('tips.file_too_large'),
                            });
                            return false
                        }
                    } else {
                        input.value = '';
                        this.$store.commit('errorCodeSet', {
                            dialogVisible: true,
                            dialogMessage: this.$t('tips.not_pdf'),
                        });
                        return false
                    }
                }
            },
            toPreviousPage() {
                this.$router.replace('/config-email')
            },
            toNextPage() {
                if (this.cla_link_individual && this.individualClaLanguageValue) {
                    if (this.cla_link_corporation && this.corpClaLanguageValue && this.$store.state.corpFD
                        || !(this.cla_link_corporation || this.corpClaLanguageValue || this.$store.state.corpFD)) {
                        this.$router.replace('/config-fields')
                    } else if (this.cla_link_corporation) {
                        if (this.corpClaLanguageValue) {
                            this.$store.commit('errorCodeSet', {
                                dialogVisible: true,
                                dialogMessage: this.$t('tips.upload_signature_file'),
                            });
                        } else {
                            this.$store.commit('errorCodeSet', {
                                dialogVisible: true,
                                dialogMessage: this.$t('tips.select_corp_language'),
                            });
                        }

                    } else {
                        this.$store.commit('errorCodeSet', {
                            dialogVisible: true,
                            dialogMessage: this.$t('tips.paste_corp_link'),
                        });
                    }
                } else if (this.cla_link_individual) {
                    this.$store.commit('errorCodeSet', {
                        dialogVisible: true,
                        dialogMessage: this.$t('tips.select_individual_language'),
                    });
                } else {
                    this.$store.commit('errorCodeSet', {
                        dialogVisible: true,
                        dialogMessage: this.$t('tips.paste_individual_link'),
                    });
                }
            },
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
    #configTwo {
        .file_button {
            font-family: Roboto-Regular, sans-serif;
            width: 5rem;
            height: 3rem;
            border-radius: 1.5rem;
            border: none;
            color: white;
            font-size: 0.8rem;
            cursor: pointer;
            background: linear-gradient(to right, #97DB30, #319E55);
            margin: 1.2rem 0;
        }

        .file_button:focus {
            outline: none;
        }

        .signatureName {
            font-size: .8rem;
            vertical-align: text-top;
        }

        .delete-icon {
            cursor: pointer;
            margin-left: .5rem;
        }

        .downloadText {
            text-decoration: underline;
            cursor: pointer;
            color: #319E55;
        }

        .inputFile {
            position: absolute;
            top: 0;
            left: 0;
            z-index: 2;
            opacity: 0;
            width: 100%;
            height: 100%;
        }

        .showBox {
            position: relative;
            top: 0;
            left: 0;
            z-index: 1;
            margin-right: 1rem;
            font-family: Roboto-Regular, sans-serif;
            width: 5rem;
            height: 2rem;
            border-radius: 1rem;
            border: none;
            color: white;
            font-size: 0.8rem;
            cursor: pointer;
            background: linear-gradient(to right, #97DB30, #319E55);
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

        .file_size_tips {
            font-size: 0.8rem;
        }
    }
</style>
