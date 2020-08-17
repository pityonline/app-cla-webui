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
    export default {
        name: "RepoSelect",
        data(){
            return {
                platform: '',
                platformOption: [{value: 'gitee', label: 'gitee'}, {value: 'github', label: 'github'},],
                org:'',
                orgOption: [{value: 'gitee', label: 'gitee'}, {value: 'github', label: 'github'},],
                repo:'',
                repoOption: [{value: 'gitee', label: 'gitee'}, {value: 'github', label: 'github'},],
            };
        },
        methods:{
            submit(){
                console.log('submit',this.platform,this.org,this.repo);
            },
            getOrg(){
                console.log(this.platform);
            },
            getRepo(){
                console.log(this.org);
            },
        },
        created() {

        }
    }
</script>

<style scoped>

</style>