<template>
    <el-row class="loginTypeSelect" style="height: 100%">
        <el-col style="height: 100%">
            <el-row style="height: 50%">

            </el-row>
            <el-row style="height: 50%">
                <el-col :offset="15" :span="9" align="right" class="buttonBox">
                    <div>
                        <button class="button" @click="submit('orgManager')">
                            Organization Manager
                        </button>
                        <button class="button" @click="submit('corporationManager')">
                            Corporation Manager
                        </button>

                    </div>

                </el-col>
            </el-row>
        </el-col>

    </el-row>

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

<style scoped lang="less">
    @import "../assets/font/css/Roboto-Bold.css";
    @import "../assets/font/css/Roboto-Regular.css";
    .loginTypeSelect{
        font-family: Roboto-Bold,sans-serif;
    }
    .buttonBox {
        height: 100%;
        display: flex;
        flex-direction: column;
        /*justify-content: center;*/
    }

    .button {
        font-family:Roboto-Regular,sans-serif ;
        width: 100%;
        height: 4rem;
        border-radius: 2rem;
        border: none;
        color: white;
        font-size: 1.3rem;
        cursor: pointer;
        background: linear-gradient(to right, #97DB30, #319E55);
        margin: 1rem 0;
    }

    .button:focus {
        outline: none;
    }
</style>