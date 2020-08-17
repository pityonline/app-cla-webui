<template>
    <div >
        <el-row>
            <el-col :span="8" :offset="8" style="padding:3rem ">
                <el-row :gutter="20">
                    <el-col :span="8">
                        <el-select
                                v-model="platform"
                                clearable=""
                                filterable=""
                                @change="changePlatform"
                                value="">
                            <el-option
                                    v-for="item in platformOption"
                                    :key="item.value"
                                    :value="item.value"
                                    :label="item.label">

                            </el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="8">
                        <el-select
                                clearable=""
                                filterable=""
                                v-model="org"
                                @change="changeOrg"
                                value="">
                            <el-option
                                    v-for="item in orgOption"
                                         :key="item.value"
                                         :value="item.value"
                                         :label="item.label">

                            </el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="8">
                        <el-select
                                clearable=""
                                filterable=""
                                v-model="repo"
                                value="">
                            <el-option
                                    v-for="item in repoOption"
                                         :key="item.value"
                                         :value="item.value"
                                         :label="item.label">

                            </el-option>
                        </el-select>
                    </el-col>
                </el-row>
                <el-row :gutter="20" style="margin: 3rem 0">
                    <el-col :span="8" :offset="8">
                        <el-button type="primary" style="width: 100%" @click="submit">
                            SUBMIT
                        </el-button>
                    </el-col>

                </el-row>
            </el-col>
        </el-row>


    </div>
</template>

<script>
    import * as url from '../until/api'
import {mapActions} from 'vuex'
    export default {
        name: "RepoSelect",
        data(){
            return {
                platform: '',
                platformOption: [{value: 'gitee', label: 'gitee'}, {value: 'github', label: 'github'},],
                org:'',
                orgOption: [],
                repo:'',
                repoOption: [],
            };
        },
        methods:{
            ...mapActions(['setLoginTypeAct']),
            changeOrg(){
                this.getRepo()
            },
            changePlatform(){
                    this.getOrg(this.platform)
            },
            submit(){
                console.log('submit',this.platform,this.org,this.repo);
            },
            getOrg(platform){
                console.log(platform);
                    this.$axios({
                        url:'/api' +url.getSignPage,
                        params:{
                            platform:platform,
                            org_id:'',
                            apply_to:this.$store.state.loginType
                        }
                    }).then(res=>{
                        console.log(res);
                        this.orgOption=[];
                        this.repoOption=[]
                        this.org=''
                        this.repo=''
                        if (res.data.length) {
                            let arr =[]
                            res.data.forEach(item=>{
                                arr.push(item.org_id)
                            })
                            let newSet = new Set(arr)
                            console.log(newSet);
                            arr = [...newSet];
                            arr.forEach(item=>{
                                this.orgOption.push({label:item,value:item})
                            })

                            console.log(this.orgOption);
                        }
                    }).catch(err=>{
                        console.log(err);
                    })

            },
            getRepo(){
                console.log(this.org);
                this.$axios({
                    url:'/api' +url.getSignPage,
                    params: {
                        platform: this.platform,
                        org_id: this.org,
                        apply_to: this.$store.state.loginType
                    }
                }).then(res=>{
                    console.log(res);
                    this.repoOption=[];
                    this.repo=''
                    if (res.data.length) {
                        let arr =[]
                        res.data.forEach(item=>{
                            arr.push(item.repo_id)
                        })
                        let newSet = new Set(arr)
                        console.log(newSet);
                        arr = [...newSet];
                        arr.forEach(item=>{
                            this.repoOption.push({label:item,value:item})
                        })

                        console.log(this.repoOption);
                    }
                }).catch(err=>{
                    console.log(err);
                })
            },
        },
        created() {

        }
    }
</script>

<style scoped>

</style>