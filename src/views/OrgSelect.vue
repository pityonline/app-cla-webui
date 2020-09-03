<template>
    <el-row>
        <el-col>
            <el-row class="marginTop">
                <el-col>
                    <span>Please select the organization you want to manage</span>
                </el-col>
            </el-row>
            <el-row class="marginTop">
                <el-col>
                    <el-select v-model="orgValue"
                               clearable=""
                               filterable=""
                               style="width: 15rem"
                               placeholder="select"
                               @change="changeOrg">
                        <el-option
                                v-for="item in orgData"
                                :key="item.value"
                                :value="item.value"
                                :label="item.label">

                        </el-option>
                    </el-select>
                </el-col>
            </el-row>
            <el-row class="marginTop">
                <el-col>
                    <el-button style="width: 15rem" type="primary" size="medium" @click="submit">SUBMIT</el-button>
                </el-col>
            </el-row>

        </el-col>
    </el-row>
</template>

<script>
    import {mapActions} from 'vuex'

    export default {
        name: "OrgSelect",
        computed: {
            orgData() {
                let data = []
                this.$store.state.loginInfo.userInfo.forEach((item, index) => {
                    if (item.repo_id) {
                        data.push({value: index, label: `${item.org_id}/${item.repo_id}`})
                    } else {
                        data.push({value: index, label: item.org_id})
                    }
                })
                return data
            },
        },
        data() {
            return {
                orgValue: '',
            }
        },
        methods: {
            ...mapActions(['setLoginInfoAct']),
            changeOrg(value) {
                console.log(value);

            },
            submit(){
                let data =JSON.parse(JSON.stringify(this.$store.state.loginInfo))
                Object.assign(data,{orgValue:this.orgValue})
                this.setLoginInfoAct(data)
                console.log(data);
                if (data.userInfo[this.orgValue].role==='admin')
                {
                    this.$router.push('/rootManager')
                }else{
                    this.$router.push('/signedRepo')
                }
            },
        },
    }
</script>

<style scoped lang="less">
    .marginTop {
        margin-top: 2rem;
    }
</style>