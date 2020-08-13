<template>
    <div id="createCLA" :style="createCLAClass">
        <v-header></v-header>
        <div id="section">
            <el-col :offset="6" :span="12">
                <div style="display: flex;justify-content: space-between;padding: 1rem 0">
                    <span>Edit your CLA</span>

                </div>
                <div>
                    <el-tag
                            class="pointer"
                            :key="tag"
                            v-for="(tag,index) in claTags"
                            closable
                            @click="chooseCla(index)"
                            :disable-transitions="false"
                            @close="handleClose(tag,index)">
                        {{tag}}
                    </el-tag>
                </div>
                <div v-if="!addNewFile">
                    <el-button class="pointer" size="mini" @click="clickAddNewClaFile()">+ add new file</el-button>
                </div>
                <div v-else style="display: flex;justify-content: space-between;">
                    <el-col :span="20" style="padding-right: 2rem;">
                        <el-input style="margin-bottom: 0.5rem;" size="small" v-model="newClaFileName"
                                  placeholder="please input file name">
                        </el-input>
                    </el-col>
                    <el-col :span="4" align="right">
                        <el-select style="width: 8rem" size="small" v-model="value" value="">
                            <el-option
                                    v-for="item in languageOptions"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-col>
                </div>
                <div>
                    <el-input rows="15" :readonly="!isEdit" @change="claTextChange" class="textAreaClass"
                              v-model="claText" type="textarea">
                    </el-input>
                </div>


                <p>Edit your metaData
                    <el-tooltip class="item" effect="dark"
                                content="The information you want contributors to fill in when they sign the cla"
                                placement="right">
                        <svg-icon icon-class="bangzhu"></svg-icon>
                    </el-tooltip>
                </p>
                <el-row style="margin: 0 -10px">
                    <el-col :span="5" class="typeCol">
                        <el-radio v-model="metadataType" label="individual">Individual Contributor</el-radio>
                    </el-col>
                    <el-col :span="5" class="typeCol">
                        <el-radio v-model="metadataType" label="corporation">Legal Entity Contributor</el-radio>
                    </el-col>

                </el-row>
                <div>
                    <div>
                        <el-row style="padding: 0.5rem 0;" type="flex" align="middle" :gutter="20"
                                v-for="(item,index) in metadataArr">
                            <el-col :span="5">
                                <el-input v-model="item.title" size="medium" readonly="">

                                </el-input>
                            </el-col>
                            <el-col :span="5">
                                <el-input v-model="item.type" size="medium" readonly></el-input>
                            </el-col>
                            <el-col :span="5">
                                <el-input v-model="item.description" size="medium" readonly></el-input>
                            </el-col>
                            <el-col :span="5" style="height: 100%">
                                <el-checkbox v-model="item.required" disabled="">required</el-checkbox>
                            </el-col>
                        </el-row>

                    </div>
                    <div>
                        <el-row style="padding: 0.5rem 0;" type="flex" align="middle" :gutter="20"
                                v-for="(item,index) in customMetadataArr">
                            <el-col :span="5">
                                <el-input v-model="item.title" size="medium"
                                          placeholder="please input title">

                                </el-input>
                            </el-col>
                            <el-col :span="5">
                                <el-select style="width: 100%" v-model="item.type"
                                           placeholder="select dataType"
                                           size="medium">
                                    <el-option
                                            v-for="i in dataTypeOptions"
                                            :key="i.value"
                                            :label="i.label"
                                            :value="i.value">
                                    </el-option>
                                </el-select>
                            </el-col>
                            <el-col :span="5" style="height: 100%">
                                <el-input v-model="item.description" size="medium"
                                          placeholder="description"></el-input>
                            </el-col>
                            <el-col :span="5" style="height: 100%">
                                <el-checkbox v-model="item.required">required</el-checkbox>
                            </el-col>
                            <el-col :span="4">
                                <el-button @click="addRow(index)" size="medium">+</el-button>
                                <el-button @click="myDeleteRow(index)" size="medium">-</el-button>
                            </el-col>
                        </el-row>
                    </div>
                </div>
                <div style="margin-top: 1rem;display: flex;justify-content: space-between">
                    <el-button size="medium" v-loading.fullscreen.lock="fullscreenLoading" :disabled="!verifyNotNull()"
                               type="primary"
                               @click="uploadCla()">create CLA
                    </el-button>
                </div>
            </el-col>
        </div>
        <v-footer></v-footer>
    </div>
</template>

<script>
    import Header from '@components/Header'
    import Footer from '@components/Footer'
    import * as until from '../until/until'
    import * as url from '../until/api'

    export default {

        name: "CreateCLA",
        components: {
            'v-header': Header,
            'v-footer': Footer
        },
        data() {
            return {
                metadataArr: [{
                    title: 'Name',
                    type: 'string',
                    description: 'your name',
                    required: true,
                }, {
                    title: 'E-Mail',
                    type: 'email',
                    description: 'your email',
                    required: true,
                }, {
                    title: 'Date',
                    type: 'date',
                    description: 'the date of today',
                    required: true,
                },],
                metadataType: 'individual',
                customMetadataArr: [{
                    title: '',
                    type: '',
                    description: '',
                    required: true,
                }],
                dataTypeOptions: [{label: 'string', value: 0}, {label: 'date', value: 1}, {
                    label: 'number',
                    value: 2
                }, {label: 'telephone', value: 3}, {label: 'email', value: 4}, {label: 'boolean', value: 5}],
                access_token: this.$store.state.access_token,
                refresh_token: this.$store.state.refresh_token,
                isAddNewMetaFile: false,
                isEditMeta: false,
                metaText: '',
                currentIndex: '',
                newMetaFileName: '',
                metaTags: ['test', 'myMeta', 'test1', 'myTest', 'test2', 'test3', 'test4', 'test5', 'test6', 'test7', 'internationalMetadata', 'openLooKeng', 'test8'],
                newClaFileName: '',
                addNewFile: false,
                isEdit: false,
                claTags: [],
                claOptions: [],
                metaOptions: [{
                    value: 0,
                    text: '{userName:{type:string,require:true},email:{type:string,require:true},}'
                },],
                fullscreenLoading: false,
                claName: '',
                value: 0,
                languageOptions: [{
                    value: 0,
                    label: 'english'
                }, {
                    value: 1,
                    label: 'chinese'
                },],
                claText: '',
                metaData: '',
                createCLAClass: {
                    height: '',
                },
                platform: this.$store.state.platform,
                user: {
                    userName: this.$store.state.user.userName,
                    userId: this.$store.state.user.userId,
                }

            }
        },
        methods: {

            addRow(index) {
                this.customMetadataArr.splice(index + 1, 0, {
                    title: '',
                    type: '',
                    description: '',
                    required: true,
                })

            },
            myDeleteRow(index) {
                this.customMetadataArr.splice(index, 1)

            },
            clickAddNewClaFile() {
                this.addNewFile = true;
                this.claText = '';
                this.isEdit = true;
                this.newClaFileName = '';
            },
            clickAddNewMetaFile() {
                this.isAddNewMetaFile = true;
                this.metaData = '';
                this.isEditMeta = true;
            },
            chooseMeta(index) {
                console.log('chooseMeta', index);
                this.metaData = this.metaOptions[0].text;
                this.isEditMeta = false;
                this.isAddNewMetaFile = false;
                this.newMetaFileName = '';
            },
            chooseCla(index) {
                console.log('chooseCla', index);
                this.claText = this.claOptions[index].text;
                this.isEdit = false;
                this.currentIndex = index;
                this.addNewFile = false;
                this.newClaFileName = this.claTags[index];
            },
            handleClose(tag, index) {
                this.$axios({
                    url: `/api${url.delCla}/${this.claOptions[index].id}`,
                    method: 'delete',
                    headers: {
                        'Access-Token': this.access_token,
                        'Refresh-Token': this.refresh_token,
                        'User': `${this.platform}/${this.user.userName}`
                    }

                }).then(res => {
                    console.log(res);
                    this.claTags.splice(this.claTags.indexOf(tag), 1);
                    if (this.currentIndex === index) {
                        this.claText = '';
                        this.currentIndex = '';
                    }
                    this.getCLA();
                }).catch(err => {
                    console.log(err);
                    this.$message.error('已有绑定关系，无法删除')
                })

            },

            /*获取cla数据*/
            getCLA() {
                console.log("getCLA");
                this.$axios({
                    url: '/api' + url.getClaInfo,
                    headers: {
                        'Access-Token': this.access_token,
                        'Refresh-Token': this.refresh_token,
                        'User': `${this.platform}/${this.user.userName}`
                    }

                }).then(res => {
                    console.log(res);
                    if (res.data.length) {
                        this.claOptions = [];
                        this.claTags = [];
                        res.data.forEach((item, index) => {
                            this.claTags.push(item.name);
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
            claTextChange(value) {
                console.log(value);
            },
            /*验证newClaFileName和claText不为空*/
            verifyNotNull() {
                return this.addNewFile ? this.newClaFileName.trim() !== '' && this.claText.trim() !== '' : this.claText.trim() !== '';
            },
            checkMetadata() {
                let newArr = this.customMetadataArr.concat(this.metadataArr);
                for (let i = 0; i < newArr.length; i++) {
                    for (let j = i+1; j < newArr.length; j++) {
                        if (newArr[i].title === newArr[j].title) {
                            return false;
                        }
                    }
                }
                return true;

            },
            /*上传cla*/
            uploadCla() {
                if (this.checkMetadata()) {
                    let fields = [];

                    this.metadataArr.forEach((item, index) => {
                        fields.push({
                            id:index+'',
                            title: item.title,
                            type: this.dataTypeOptions[item.type].label,
                            description: item.description,
                            required: item.required,
                        })
                    })
                    this.customMetadataArr.forEach((item, index) => {
                        fields.push({
                            id:this.metadataArr.length-1+index+'',
                            title: item.title,
                            type: this.dataTypeOptions[item.type].label,
                            description: item.description,
                            required: item.required,
                        })
                    })
                    this.fullscreenLoading = true;
                    let obj = {
                        name: this.newClaFileName,
                        text: this.claText,
                        language: this.languageOptions[this.value].label,
                        submitter: `${this.platform}/${this.user.userName}`,
                        apply_to: this.metadataType,
                        fields: fields,

                    }
                    console.log(obj);
                    this.$axios({
                        url: '/api' + url.uploadCla,
                        method: 'post',
                        data: obj,
                        headers: {
                            'Access-Token': this.access_token,
                            'Refresh-Token': this.refresh_token,
                            'User': `${this.platform}/${this.user.userName}`
                        }

                    }).then(res => {
                        console.log(res);

                        this.fullscreenLoading = false;
                        this.$message.success('succeed')
                        setTimeout(() => {
                            this.$router.replace('/home')
                        }, 2000)


                    }).catch(err => {
                        console.log(err);
                        this.fullscreenLoading = false;
                        this.$message.error('failed')
                    })
                } else {
                    this.$message.closeAll();
                    this.$message.error('The title is repeated')
                }

            },

            setClientHeight() {
                this.$nextTick(() => {
                    console.log(until.getClientHeight());
                    console.log(document.getElementById('createCLA').offsetHeight);
                    until.getClientHeight() > document.getElementById('createCLA').offsetHeight ?
                        this.createCLAClass.height = until.getClientHeight() + 'px' :
                        this.createCLAClass.height = document.getElementById('createCLA').offsetHeight

                })
            },
            copy() {
                // this.metaData = this.claText
                console.log(this.claText);
                this.init()
            },
            init() {

                var des = this.claText.replace(/\r\n/g, '<br/>').replace(/\n/g, '<br/>').replace(/\s/g, ' ');  //转换格式
                console.log(des);
                this.metaData = des

            },

        },
        created() {
            this.getCLA()
        },
        mounted() {
            this.setClientHeight()

        }
    }
    window.onresize = () => {
        // console.log(until.getClientHeight());
        if (until.getClientHeight() > document.getElementById('createCLA').offsetHeight) {
            document.getElementById("createCLA").style.height = until.getClientHeight() + 'px'
        }
    }
</script>

<style lang="less">
    .typeCol {
        padding: .5rem 10px;
    }

    #createCLA {
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
        padding-top: 4rem;

        & > .header {
            height: 4rem;
            width: 100%;
        }

        & > #section {
            padding: 1rem;
            text-align: left;
            flex-grow: 1;
            background-color: #F5F5F5;


        }

        & > .footer {
            height: 4rem;
            width: 100%;
        }
    }

    .pointer {
        cursor: pointer;
        margin-right: 1rem;
        margin-bottom: 0.5rem;
    }

    .el-button.is-disabled, .el-button.is-disabled:focus, .el-button.is-disabled:hover {
        cursor: pointer;
    }

    .el-checkbox__input.is-disabled + span.el-checkbox__label, .el-checkbox__input.is-disabled .el-checkbox__inner, .el-checkbox__input.is-disabled .el-checkbox__inner::after {
        cursor: pointer;
    }
</style>