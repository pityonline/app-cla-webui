<template>
    <el-row>
        <el-col :offset="7" :span="10">
            <el-row gutter="20" v-for="(item,index) in emails">
                <el-col :span="16">
                    <el-input
                            placeholder="please input email" clearable="" size="medium" v-model="item">
                    </el-input>
                </el-col>
                <el-col :span="8">
                    <el-button @click="addRow(index)" size="medium">+</el-button>
                    <el-button @click="myDeleteRow(index)" size="medium">-</el-button>
                </el-col>
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

                emails: ['',],
            }
        },
        methods: {
            addRow(index) {
                this.emails.splice(index + 1, 0,'')

            },
            myDeleteRow(index) {
                console.log(index);
                if (this.emails.length===1) {
                    this.emails[0]=''

                }else{
                    this.emails.splice(index, 1);
                }

            },
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