<template>
    <el-row style="height: 100%">
        <el-col  align="right" class="formBox">
            <el-row>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-row>
                        <svg-icon icon-class="gitee_new" class="loginIcon" ></svg-icon>
                    </el-row>
                    <el-row>
                        <button class="button" @click="login('gitee')">
                            Login in
                        </button>
                    </el-row>
                </el-col>
                <el-col :span="12">
                    <el-row>
                        <svg-icon icon-class="github_new" class="loginIcon" ></svg-icon>
                    </el-row>
                    <el-row>
                        <button class="button" @click="login('github')">
                            Login in
                        </button>
                    </el-row>
                </el-col>
            </el-row>
            <el-row>
            <span> Select the platform you want to authorize to log in</span>
            </el-row>
        </el-col>
    </el-row>

</template>

<script>
    import {mapActions} from 'vuex'
    import * as url from '../until/api'

    export default {
        name: "PlatformSelect",
        data() {
            return {
                platform: '',
            };
        },
        methods: {
            ...mapActions(['setPlatformAct']),

            submit() {
                console.log('submit');
            },

            login(platform) {
                console.log(platform);
                this.setPlatformAct(platform)
                let interval = setInterval(() => {
                    if (this.$store.state.platform) {
                        this.$axios({
                            url: `/api${url.getAuthCodeUrl}/${platform}/login`,
                        }).then(res=>{
                            console.log(res);
                                window.location.href =res.data.url
                        }).catch(err=>{
                            console.log(err);
                        })

                      clearInterval(interval)
                    }
                }, 100)

            },
        }
    }
</script>

<style scoped lang="less">
    .button {
        width: 100%;
        height: 4rem;
        border-radius: 2rem;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        background: linear-gradient(to right, #97DB30, #319E55);
        margin: 1rem 0;
    }

    .button:focus {
        outline: none;
    }
    .formBox {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    .loginIcon {
        cursor: pointer;
        width: 2rem;
        height: 2rem;
        margin: 0 1rem;
    }
</style>