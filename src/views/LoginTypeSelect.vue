<template>
    <div >
        <el-row>
            <el-col :span="4" :offset="10" style="padding:3rem ">
                <!--<el-button type="primary" size="medium" style="width: 100%;margin: 1rem 0;" @click="submit('individual')">-->
                    <!--Individual-->
                <!--</el-button>-->
                <!--<el-button type="primary" size="medium" style="width: 100%;margin: 1rem 0" @click="submit('corporation')">-->
                    <!--Corporation-->
                <!--</el-button>-->
                <!--<el-button type="primary" size="medium" style="width: 100%;margin: 1rem 0" @click="submit('employee')">-->
                    <!--Employee-->
                <!--</el-button>-->
                <el-button type="primary" size="medium" style="width: 100%;margin: 1rem 0" @click="submit('orgManager')">
                    OrgManager
                </el-button>
                <el-button type="primary" size="medium" style="width: 100%;margin: 1rem 0" @click="submit('corporationManager')">
                    CorporationManager
                </el-button>


            </el-col>
        </el-row>


    </div>
</template>

<script>
    import {mapActions} from 'vuex'

    export default {
        name: "RepoSelect",
        data(){
            return {

            };
        },
        methods:{
            ...mapActions(['setLoginTypeAct']),
            submit(loginType){
                console.log(loginType);
                this.setLoginTypeAct(loginType)
                if (loginType==='orgManager') {
                    this.$router.push('/platformSelect')
                }else if (loginType === 'corporationManager') {
                    this.$router.push('/corporationManagerLogin')
                }else{
                    this.$router.push('/signCla')

                }
            },
        }
    }
</script>

<style scoped>

</style>