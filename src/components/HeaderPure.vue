<template>
    <el-row class="header" align="meddle">
        <el-col :offset="4" :span="16">
            <el-row>
                <el-col :span="12" align="left">
                    <svg-icon class="pointer" @click="toHome()" id="svg_logo" icon-class="logo"/>
                </el-col>
                <el-col :span="12" align="right">
                    <el-select
                            v-model="language">
                        <el-option
                                v-for="item in languageOptions"
                                :key="item.value"
                                :value="item.value"
                                :label="item.label">

                        </el-option>
                    </el-select>
                </el-col>
            </el-row>
        </el-col>
    </el-row>
</template>

<script>
    export default {
        name: "HeaderPure",
        data() {
            return {
                language: '',
                languageOptions: '',
            }
        },
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
        height: 4rem;
        z-index: 10;
        width: 100%;
        border-bottom: lightgrey;
    }
</style>