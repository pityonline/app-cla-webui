<template>
    <el-row align="middle" style="border-top:2px solid #F2F2F2;">
        <el-col class="footer" :offset="3" :span="18">
            <div  class="box">
                <span class="join_us">JOIN US</span>
            </div>
            <div class="box">

                <span class="copyright">©2020 Draven.Designed by LA-Studio</span>
            </div>

        </el-col>

    </el-row>
</template>

<script>
    export default {
        name: "NewFooter"
    }
</script>

<style scoped lang="less">
    .footer {
        display: flex;
        justify-content: space-between;
        height: 4.5rem;
    }
    .box{
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .copyright {
        font-size: .5rem;
    }

    .join_us {
        font-size: 1.8rem;
    }
</style>