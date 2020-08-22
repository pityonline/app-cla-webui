<template>
    <el-row>
        <el-col>
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="oldPassword" prop="oldPassword">
                    <el-input type="password" v-model="ruleForm.oldPassword" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="newPassword" prop="newPassword">
                    <el-input type="password" v-model="ruleForm.newPassword" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </el-col>
    </el-row>
</template>

<script>
    export default {
        name: "ResetPassword",
        data(){
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('please input old password'));
                }  else {
                    callback();
                }
            };
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('please input new password'));
                } else {
                    callback();
                }
            };
            return{
                ruleForm: {
                    oldPassword: '',
                    newPassword: '',
                },
                rules: {
                    oldPassword: [
                        {require:true, validator: validatePass, trigger: 'blur' }
                    ],
                    newPassword: [
                        {require:true, validator: validatePass2, trigger: 'blur' }
                    ],

                }
            }
        },
    }
</script>

<style scoped>

</style>