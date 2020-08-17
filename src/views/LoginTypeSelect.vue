<template>
    <div >
        <el-row>
            <el-col :span="4" :offset="10" style="padding:3rem ">
                <el-button type="primary" size="medium" style="width: 100%;margin: 1rem 0;" @click="submit('Individual')">
                    Individual
                </el-button>
                <el-button type="primary" size="medium" style="width: 100%;margin: 1rem 0" @click="submit('Corporation')">
                    Corporation
                </el-button>
                <el-button type="primary" size="medium" style="width: 100%;margin: 1rem 0" @click="submit('Employee')">
                    Employee
                </el-button>
                <el-button type="primary" size="medium" style="width: 100%;margin: 1rem 0" @click="submit('RogManager')">
                    RogManager
                </el-button>
                <el-button type="primary" size="medium" style="width: 100%;margin: 1rem 0" @click="submit('CorporationManager')">
                    CorporationManager
                </el-button>


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
            submit(loginType){
                console.log(loginType);
                if (loginType==='RogManager') {
                    this.$router.push('/platformSelect')
                }else if (loginType === 'CorporationManager') {
                    this.$router.push('/CorporationManagerLogin')
                }else{
                    this.$router.push('/repoSelect')
                }
            },
        }
    }
</script>

<style scoped>

</style>