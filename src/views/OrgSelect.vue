<template>
    <el-row>
        <el-col>
            <el-row>
                <el-col>
                    <span>Please select the organization you want to manage</span>
                </el-col>
            </el-row>
            <el-row>
                <el-col>
                    <el-select v-model="orgValue"
                               clearable=""
                               filterable=""
                               @change="changeOrg">
                        <el-option
                                v-for="item in orgData"
                                :key="item.value"
                                :value="item.value"
                                :label="item.label">

                        </el-option>
                    </el-select>
                </el-col>
            </el-row>


        </el-col>
    </el-row>
</template>

<script>
    export default {
        name: "OrgSelect",
        computed:{
            orgData(){
                return this.$store.state.loginInfo.userInfo
            },
        },
        data(){
            return{
                orgValue:'',
            }
        },
        methods:{
            changeOrg(value){
                console.log(value);
            },
        },
    }
</script>

<style scoped>

</style>