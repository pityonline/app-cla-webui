<template>
    <div id="createCLA" :style="createCLAClass">
        <v-header></v-header>
        <div id="section">
            <el-col :offset="6" :span="12">
                <div style="display: flex;justify-content: space-between;padding: 1rem 0">
                    <span>Edit your CLA</span>
                    <el-select style="width: 8rem" size="small" v-model="value" value="">
                        <el-option
                                v-for="item in languageOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <el-tag
                        :key="tag"
                        v-for="tag in claOptions"
                        closable
                        :disable-transitions="false"
                        @close="handleClose(tag)">
                    {{tag}}
                </el-tag>
                <el-input rows="10" @change="claTextChange" class="textAreaClass" v-model="claText" type="textarea" >

                </el-input>
                <!--<el-button type="primary" @click="copy">copy</el-button>-->
                <p>Edit your metaData</p>
                <!--<div>-->
                <!--<pre style="white-space: pre-wrap" id="showCla"></pre>-->
                <!--</div>-->
                <el-input rows="10" class="textAreaClass" v-model="metaData" type="textarea">

                </el-input>
                <div style="margin-top: 1rem;display: flex;justify-content: space-between">
                    <el-input v-model="claName" placeholder="请输入cla名称" style="margin-right: 2rem"></el-input>
                    <el-button v-loading.fullscreen.lock="fullscreenLoading" :disabled="!verifyNotNull()" type="primary" @click="uploadCla()">create CLA</el-button>
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
                claOptions:[],
                fullscreenLoading: false,
                claName: '',
                value: "0",
                languageOptions: [{
                    value: '0',
                    label: 'english'
                }, {
                    value: '1',
                    label: 'chinese'
                },],
                claText: 'test',
                metaData: 'test',
                createCLAClass: {
                    height: '',
                },
                platform:this.$store.state.platform,
                user: {
                    userName: this.$store.state.user.userName,
                    userId: this.$store.state.user.userId,
                }

            }
        },
        methods: {
            handleClose(tag) {
                this.claOptions.splice(this.claOptions.indexOf(tag), 1);
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
            claTextChange(value){
                console.log(value);
            },
            /*验证calName和claText不为空*/
            verifyNotNull() {
                return this.claText.trim() && this.claName.trim()
            },
            /*上传cla*/
          async  uploadCla() {
                this.fullscreenLoading=true;
                let obj = {
                    name: this.claName,
                    text: this.claText,
                    // metaData: this.metaData,
                    language: 'EN',
                    // id: this.user.userId,
                    submitter:`${this.platform}/${this.user.userName}`
                    // user: this.user.userName
                }
                // this.verifyClaAndMeta() &&
                this.$axios({
                    url: '/api' + url.uploadCla,
                    method: 'post',
                    data: obj,
                }).then(res => {
                    console.log(res);
                    if (res.status === 200) {
                        this.fullscreenLoading=false;
                        this.$message.success('succeed')
                        setTimeout( ()=> {
                            this.$router.replace('/home')
                        },2000)
                    }else{
                        this.fullscreenLoading=false;
                        this.$message.error('failed')
                    }
                }).catch(err => {
                    console.log(err);
                })
            },
            /*非空验证*/
            verifyClaAndMeta() {
                return this.claText !== "" && this.metaData !== ""
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
</style>