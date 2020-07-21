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
                    <el-input rows="10" :readonly="!isEdit" @change="claTextChange" class="textAreaClass"
                              v-model="claText" type="textarea">
                    </el-input>
                </div>


                <p>Edit your metaData</p>
                <div>
                    <el-tag
                            class="pointer"
                            :key="tag"
                            v-for="(tag,index) in metaTags"
                            closable
                            @click="chooseMeta(index)"
                            :disable-transitions="false"
                            @close="closeMetaTag(tag)">
                        {{tag}}
                    </el-tag>
                </div>
                <div v-if="!isAddNewMetaFile">
                    <el-button class="pointer" size="mini" @click="clickAddNewMetaFile()">+ add new file</el-button>
                </div>
                <div v-else style="display: flex;justify-content: space-between;">
                    <el-col :span="20" style="padding-right: 2rem">
                        <el-input style="margin-bottom: 0.5rem;" size="small" v-model="newMetaFileName"
                                  placeholder="please input file name">
                        </el-input>
                    </el-col>
                    <!--<el-select style="width: 8rem" size="small" v-model="value" value="">-->
                    <!--<el-option-->
                    <!--v-for="item in languageOptions"-->
                    <!--:key="item.value"-->
                    <!--:label="item.label"-->
                    <!--:value="item.value">-->
                    <!--</el-option>-->
                    <!--</el-select>-->
                </div>
                <el-input :readonly="!isEditMeta" rows="10" class="textAreaClass" v-model="metaData" type="textarea">

                </el-input>
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
                access_token:this.$store.state.access_token,
                refresh_token:this.$store.state.refresh_token,
                isAddNewMetaFile: false,
                isEditMeta: false,
                metaText: '',
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
            clickAddNewClaFile() {
                this.addNewFile = true;
                this.claText = '';
                this.isEdit = true;
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
                this.addNewFile = false;
                this.newClaFileName = '';
            },
            handleClose(tag,index) {
                let obj = {id:this.claOptions[index].id}
                this.$axios({
                    url:url.delCla,
                    method:'delete',
                    data:obj,
                    headers: {'Access-Token': this.access_token, 'Refresh-Token': this.refresh_token,'User':`${this.platform}/${this.user.userName}`}

                }).then(res=>{
                    console.log(res);
                    this.claTags.splice(this.claTags.indexOf(tag), 1);
                }).catch(err=>{
                    console.log(err);
                    this.$message.error('已有绑定关系，无法删除')
                })

            },
            closeMetaTag(tag) {
                /*删除cla*/
                this.metaTags.splice(this.metaTags.indexOf(tag), 1);
                /*删除cla*/

            },
            /*获取cla数据*/
            getCLA() {
                console.log("getCLA");
                this.$axios({
                    url: '/api' + url.getClaInfo,
                    headers: {'Access-Token': this.access_token, 'Refresh-Token': this.refresh_token,'User':`${this.platform}/${this.user.userName}`}

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
            /*上传cla*/
            async uploadCla() {
                this.fullscreenLoading = true;
                let obj = {
                    name: this.newClaFileName,
                    text: this.claText,
                    // metaData: this.metaData,
                    language: this.languageOptions[this.value].label,
                    // id: this.user.userId,
                    submitter: `${this.platform}/${this.user.userName}`
                    // user: this.user.userName
                }
                console.log(obj);
                this.$axios({
                    url: '/api' + url.uploadCla,
                    method: 'post',
                    data: obj,
                    headers: {'Access-Token': this.access_token, 'Refresh-Token': this.refresh_token,'User':`${this.platform}/${this.user.userName}`}

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

<style scoped lang="less">
    #createCLA {
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
        padding-top: 4rem;

        & > #section {
            padding: 1rem;
            text-align: left;
            flex-grow: 1;
            background-color: #F5F5F5;


        }
    }

    .pointer {
        cursor: pointer;
        margin-right: 1rem;
        margin-bottom: 0.5rem;
    }
</style>