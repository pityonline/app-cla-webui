<template>
    <el-row class="headerBox" style="border-bottom:2px solid #F2F2F2;">
        <el-col class="header" :offset="3" :span="18">
            <div  class="box">
                <svg-icon icon-class="icon" class="icon"></svg-icon>
            </div>
            <div class="box">
                <select class="my_select"  v-model="language" placeholder="language">
                    <option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">

                    </option>
                </select>
            </div>
        </el-col>
    </el-row>
</template>

<script>
    export default {
        name: "NewHeader",
        data(){
            return{
                language:0,
                options:[{value:0,label:'English'},{value:1,label:'中文'},{value:2,label:'日语'}],
            }
        },
    }
</script>

<style scoped lang="less">
    .my_select{
        width: 8rem;
        height: 3rem;
        border-radius: 1.5rem;
        font-size: 1.2rem;
        text-align: center;
        padding: 0 1rem;
    }
    .my_select:focus{
        outline: none;
    }
    .icon{
        width: 3.5rem;
        height: 3.5rem;
    }
    .pointer{
        cursor: pointer;
    }
    .headerBox{
        /*position: fixed;*/
        /*top: 0;*/
        /*left: 0;*/
        height: 4.5rem;
        width: 100%;
        /*z-index: 10;*/
    }
    .header {
        height: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }
    .box{
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
</style>