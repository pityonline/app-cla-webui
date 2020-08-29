<template>
    <el-row>
        <el-col :offset="7" :span="10">
            <el-row>
                <el-input
                        placeholder="please input email" clearable="" size="medium" v-model="ruleForm.email">
                </el-input>
            </el-row>

            <el-row align="center">

                <el-button type="primary" size="medium" @click="createUser()">Submit</el-button>

            </el-row>

        </el-col>
    </el-row>
</template>

<script>
    import * as url from '../until/api'

    export default {
        name: "CreateUser",
        data() {

            return {
                cla_org_id: this.$store.state.loginInfo.cla_org_id,

                emails: [],
            }
        },
        methods: {
            createUser() {
                let obj = {cla_org_id: this.cla_org_id, emails: this.emails}
                this.$axios({
                    url: '/api' + url.addEmployeeManager,
                    method: 'post',
                    data: obj,
                }).then(res => {
                    console.log(res);
                    this.$message.closeAll()
                    this.$message.success('success')
                    this.$refs.ruleForm.resetFields();

                }).catch(err => {
                    console.log(err);
                    this.$message.closeAll()
                    // this.$message.error('Please enter the correct old password')
                })
            },
        }
    }
</script>

<style scoped>

</style>