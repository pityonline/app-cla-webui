<template>
    <el-select v-model="value"
               placeholder="请选择"
               :size="Size"
               @change="checked"
               :value="value">
        <el-option
                v-for="item in Options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
        </el-option>
    </el-select>
</template>

<script>
    export default {
        name: "Select",
        props: ['Options', 'Value', 'Size'],
        computed: {},
        data() {
            return {
                value: this.Value,
            }
        },
        methods: {
            checked(value) {
                console.log(value);
                this.$emit('change', value);
            }
        }
    }
</script>

<style scoped>

</style>