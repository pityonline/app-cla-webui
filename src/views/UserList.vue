<template>

    <el-row class="marginTop1rem tableStyle">
        <el-table :data="tableData">
            <el-table-column
                    prop="userName"
                    label="用户名">
            </el-table-column>
            <el-table-column
                    prop="email"
                    label="邮箱">
            </el-table-column>
            <el-table-column
                    prop="class"
                    label='部门'>
            </el-table-column>
            <el-table-column
                    width="100">
                <template slot-scope="scope">
                    <el-button type="danger" size="mini" @click="deleteUser(scope.row.id)">删除</el-button>
                </template>

            </el-table-column>
        </el-table>
    </el-row>

</template>

<script>
    export default {
        name: "UserList",
        data() {
            return {
                tableData: [{id: 0, userName: '001', pwd: '001', email: '969707751@qq.com', class: '法务'}, {
                    id: 1,
                    userName: '002',
                    pwd: '002',
                    email: '1057750732@qq.com',
                    class: '开发部'
                },],
            }
        },
    }
</script>

<style scoped lang="less">
    .marginTop1rem {
        margin-top: 1rem;
    }

    .tableStyle {
        margin-bottom: 2rem;
        padding: 3rem;
        background-color: white;
    }
</style>