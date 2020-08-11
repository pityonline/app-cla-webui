<template>
    <div>
        <HeaderPure></HeaderPure>
        <div>
            <el-form :model="ruleForm" ref="ruleForm" :rules="rules">
                <el-form-item label="email" prop="email">
                    <el-input placeholder="email"></el-input>
                </el-form-item>
                <el-form-item label="name" prop="name">
                    <el-input placeholder="name"></el-input>
                </el-form-item>
                <el-form-item label="country" prop="country">
                    <el-input placeholder="country"></el-input>
                </el-form-item>
                <el-form-item label="language" prop="language">
                    <el-input placeholder="language"></el-input>
                </el-form-item>
                <el-form-item >
                   <el-button>SUBMIT</el-button>
                </el-form-item>
            </el-form>
        </div>
        <Footer></Footer>
    </div>
</template>

<script>
    import HeaderPure from '@components/HeaderPure'
    import Footer from '@components/Footer'
    export default {
        name: "EmailVerify",
        components: {
            HeaderPure,
            Footer,
        },
    }
</script>

<style scoped>

</style>