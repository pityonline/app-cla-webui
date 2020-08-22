<template>
    <el-row>
        <el-col :offset="8" :span="8">
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="" prop="oldPassword" label-width="0">
                    <el-input plaseholder="please input old password" type="password" v-model="ruleForm.oldPassword" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="" prop="newPassword" label-width="0">
                    <el-input plaseholder="please input new password" type="password" v-model="ruleForm.newPassword" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label-width="0">
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