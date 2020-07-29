<template>
        <div id="section">
           <el-row>
               <el-button type="primary" size="small">
                   create user
               </el-button>
           </el-row>
            <el-row>
                <el-table :data="tableData">
                    <el-table-column
                            prop="userName"
                            label="用户名"
                            width="220">
                    </el-table-column>
                    <el-table-column
                            prop="email"
                            label="邮箱"
                            width="220">
                    </el-table-column>
                    <el-table-column
                            prop="class"
                            label='部门'
                            width="220">
                    </el-table-column>
                    <el-table-column
                            label='部门'>
                        <template slot-scope="scope">
                            <el-button type="danger" size="small" @click="deleteUser(scope.row.id)">删除</el-button>
                        </template>
                        <template>

                        </template>
                    </el-table-column>
                </el-table>
            </el-row>
        </div>

</template>

<script>
    import * as until from '../until/until'
    import * as url from '../until/api'
    export default {
        name: "rootManager",

        data(){
            return {
                tableData:[{id:0,userName:'001',email:'969707751@qq.com',class:'法务'},{id:1,userName:'002',email:'1057750732@qq.com',class:'开发部'},],
            }
        },
        methods:{
            deleteUser(id){
                console.log(id);
            },
        },
    }
</script>

<style scoped lang="less">
    .pointer{
        cursor: pointer;
    }
    .borderClass {
        padding: .5rem 0;
        border-bottom: 1px solid lightgray;
        border-top: 1px solid lightgray;
    }

    .marginTop1rem {
        margin-top: 1rem;
    }

    .contentTitle {
        font-size: 1.2rem;
    }

    .size_s {
        font-size: .9rem;
    }

</style>