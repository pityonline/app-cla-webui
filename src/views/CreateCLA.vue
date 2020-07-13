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
                <el-input rows="10" class="textAreaClass" v-model="claText" type="textarea">

                </el-input>
                <!--<el-button type="primary" @click="copy">copy</el-button>-->
                <p>Edit your metaData</p>
                <!--<div>-->
                <!--<pre style="white-space: pre-wrap" id="showCla"></pre>-->
                <!--</div>-->
                <el-input rows="10" class="textAreaClass" v-model="metaData" type="textarea">

                </el-input>
                <div style="margin-top: 1rem;text-align: right">
                    <el-button type="primary" @click="uploadCla()">create CLA</el-button>
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
                value: "0",
                languageOptions: [{
                    value: '0',
                    label: 'english'
                }, {
                    value: '1',
                    label: 'chinese'
                },],
                name:'test',
                claText: 'test',
                metaData: 'test',
                createCLAClass: {
                    height: '',
                },
            }
        },
        methods: {
            /*上传cla*/
            uploadCla() {
                let obj = {name:this.name,claText: this.claText, metaData: this.metaData,language:'EN'}
                this.verifyClaAndMeta() &&
                this.$axios({
                    url: '/apis'+url.uploadCla,
                    method: 'post',
                    data: obj,
                }).then(res => {
                    console.log(res);
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