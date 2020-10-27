<template>
    <el-row>
        <el-dialog
                :title=""
                :visible.sync="dialogVisible"
                :close-on-press-escape="false"
                :show-close="false"
                :close-on-click-modal="false"
                width="30%">
            <el-row>
                <el-col align="center">
                    <p>{{message}}</p>
                    <button class="dialogBt" @click="clickGoHome()">OK</button>
                </el-col>
            </el-row>
        </el-dialog>
    </el-row>
</template>

<script>
    export default {
        name: "ReLoginDialog",
        props: ['dialogVisible', 'message', 'title'],
        data() {
            return {
            }
        },
        methods: {
            clickGoHome() {
                this.$store.commit('errorSet', {
                    dialogVisible: false,
                    dialogMessage: '',
                })
                this.$router.replace('/corporationManagerLogin')

            },
        },
    }
</script>

<style scoped>
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
</style>