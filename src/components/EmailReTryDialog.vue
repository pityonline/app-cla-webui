<template>
    <el-row id="emailReTryDialog">
        <el-dialog
                title=""
                :visible.sync="dialogVisible"
                :close-on-press-escape="false"
                :show-close="false"
                :close-on-click-modal="false"
                :width="dialogWidth">
            <div class="titleBox">
                <svg-icon icon-class="fail_icon" class="dialogIcon"></svg-icon>
                <span>{{$t('tips.failedTitle')}}</span>
            </div>
            <el-row>
                <el-col align="center">
                    <p :class="dialogMessage">{{$t('tips.no_public_email_1',{platform:this.$store.state.repoInfo.platform})}}
                        <a :href="emailSetAddress" target="_blank">{{this.$t('tips.click_here')}}</a>{{emailNotOpenEnd}}</p>
                    <button class="dialogBt" @click="reTry()">{{$t('tips.dialogBt')}}</button>
                </el-col>
            </el-row>
        </el-dialog>
    </el-row>
</template>

<script>
    export default {
        name: "EmailReLoginDialog",
        props: ['dialogVisible'],
        computed:{
            dialogMessage() {
                if (localStorage.getItem('lang') === '0') {
                    return 'dialogMessageEn'
                } else if (localStorage.getItem('lang') === '1') {
                    return 'dialogMessage'
                }
            },
            dialogWidth() {
                if (this.IS_MOBILE) {
                    return '80%'
                } else {
                    return '30%'
                }
            },
            emailNotOpenEnd(){
                if (this.$store.state.repoInfo.platform.toLowerCase() === 'gitee') {
                    return this.$t('tips.gitee_no_public_email_2')
                }else if (this.$store.state.repoInfo.platform.toLowerCase() === 'github') {
                    return this.$t('tips.github_no_public_email_2')
                }
            },
            emailSetAddress(){
                if (this.$store.state.repoInfo.platform.toLowerCase() === 'gitee') {
                    return 'https://gitee.com/profile/emails'
                }else if (this.$store.state.repoInfo.platform.toLowerCase() === 'github') {
                    return 'https://github.com/settings/emails'
                }
            },
        },
        data() {
            return {
            }
        },
        methods: {
            toEmailSet(){

            },
            reTry() {
                this.$store.commit('setEmailErr', false)
            },
        },
    }
</script>

<style lang="less">
    #emailReTryDialog{
        .dialogBt {
            margin-top: 3rem;
            width: 8rem;
            height: 3rem;
            background: linear-gradient(to right, #97DB30, #319E55);
            border-radius: 1.5rem;
            border: none;
            color: white;
            cursor: pointer;
            outline: none;
        }
        a{
            color: #319E55;
        }
        .el-dialog__header{
            padding: 0;
        }
        .el-dialog__body{
            padding: 20px;
        }
        .titleBox {
            text-align: left;
            font-size: 1.5rem;
            color: #E22424;
            margin-bottom: 1rem;
            .dialogIcon {
                width: 1.5rem;
                height: 1.5rem;
                margin-right: 1rem;
            }
        }
    }

</style>