<template>
    <el-row class="footer">
        <el-col class="left" :span="8">
            <span>© 2020 HUAWEI SE</span>

        </el-col>
        <el-col :span="8" class="center">
                <span>Made with <svg-icon icon-class="heart"/>  from the GitHub team at HUAWEI
            </span>
        </el-col>

        <el-col :span="8" class="right">
            <div>

                <span class="pointer">Terms of Service & Privacy Policy</span>
                <span class="pointer"> <svg-icon  id="github_logo" icon-class="github"/>Open an issue</span>
            </div>
        </el-col>

    </el-row>
</template>

<script>
    export default {
        name: "Footer"
    }
</script>

<style scoped lang="less">
    .pointer{
        cursor: pointer;
    }
    .footer {
        height: 4rem;
        display: flex;
        justify-content: space-between;
        background-color: #ececec;


        & > .left {
            text-align: left;
            padding-left: 2rem;
            display: flex;
            flex-direction: column;
            justify-content: center;

        }

        & > .center {
            text-align: center;
            display: flex;
            flex-direction: column;
            justify-content: center;
        }

        & > .right {
            text-align: right;
            padding-right: 2rem;
            display: flex;
            flex-direction: column;
            justify-content: center;

            span:nth-of-type(1) {
                margin-right: 1rem;
            }

            #github_logo {
                width: 1.1rem;
                height: 1.1rem;
            }
        }

    }
</style>