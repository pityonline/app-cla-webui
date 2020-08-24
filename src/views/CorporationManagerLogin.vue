<template>
    <div>
        <el-row>
            <el-col align="middle" style="padding:3rem">
                <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="0"
                         class="demo-ruleForm" style="padding: 2rem 2rem 0 2rem;width: 15rem">
                    <el-form-item label="" prop="account">
                        <el-input v-model="ruleForm.userName" autocomplete="off" placeholder="account"></el-input>
                    </el-form-item>
                    <el-form-item label="" prop="pass">
                        <el-input type="password" v-model="ruleForm.pwd" autocomplete="off"
                                  placeholder="password"></el-input>
                    </el-form-item>
                    <el-form-item style="text-align: left">
                        <span class="pointer" @click="findPwd" id="forgetPwd">Forget the password?</span>
                    </el-form-item>
                    <el-form-item>
                        <el-button style="width: 100%" type="primary" @click="submitForm('ruleForm')">SIGN IN
                        </el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>


    </div>
</template>

<script>
    import * as url from '../until/api'
    import {mapActions} from 'vuex'

    export default {
        name: "RepoSelect",
        data() {
            var validateAccount = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('please input account number'));
                }
                callback();
            };
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('please input password'));
                }
                callback();
            };
            return {
                rules: {
                    userName: [
                        {validator: validateAccount, trigger: 'blur'}
                    ],
                    pwd: [
                        {validator: validatePass, trigger: 'blur'}
                    ],
                },
                ruleForm: {
                    userName: '',
                    pwd: '',
                },
            };
        },
        methods: {
            ...mapActions(['setLoginInfoAct']),
            findPwd() {
                console.log('findPwd');
            },
            login(userName, pwd) {
                // this.$router.push('/rootManager')
                let obj = {
                    platform: this.$store.state.repoInfo.platform,
                    org_id: this.$store.state.repoInfo.org_id,
                    repo_id: this.$store.state.repoInfo.repo_id,
                    user: userName,
                    password: pwd
                };
                this.$axios({
                    url: '/api' + url.corporationManagerAuth,
                    method: 'post',
                    data: obj,
                }).then(res => {
                    console.log(res);
                    new Promise((resolve, reject) => {
                        let obj = {userName: userName, cla_org_id: res.data.cla_org_id, email: res.data.email}

                        this.setLoginInfoAct(obj)
                        resolve('completed');
                    }).then(res => {
                        console.log(res);

                        // this.$router.push({
                        //     path: '/rootManager',
                        //     query: {userName: userName, cla_org_id: res.data.cla_org_id, email: res.data.email}
                        // })
                    }, err => {
                        console.log(err);
                    })
                    if (res.data.role === 'admin') {
                        this.$router.push('/rootManager')
                    }else{
                        this.$router.push('/signedRepo')
                    }


                    //     this.$router.push('/signedRepo')

                }).catch(err => {
                    console.log(err);
                })
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.login(this.ruleForm.userName, this.ruleForm.pwd)
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },

        }
    }
</script>

<style scoped lang="less">
    .pointer {
        cursor: pointer;
    }

    #forgetPwd:hover {
        text-decoration: underline;
    }
</style>