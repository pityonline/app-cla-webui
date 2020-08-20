<template>
    <div class="header">
        <el-col :offset="8" :span="8">
            <div>
                <svg-icon class="pointer" @click="toHome()" id="svg_logo" icon-class="logo_b"/>
            </div>
        </el-col>
    </div>
</template>

<script>
    export default {
        name: "HeaderPure",
        methods: {
            toHome() {
                this.$router.push('/home')
            },
        },
    }
</script>

<style scoped lang="less">
    .header {
        position: fixed;
        top: 0;
        left: 0;
        background-color: #ececec;
        height: 4rem;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        z-index: 10;
        width: 100%;


        & > div:nth-of-type(1) {
            display: flex;
            justify-content: center;

            & > div {
                display: flex;
                flex-direction: column;
                justify-content: center;

                #svg_logo {
                    height: 4rem;
                    width: 4rem;
                }
            }

        }


    }
</style>