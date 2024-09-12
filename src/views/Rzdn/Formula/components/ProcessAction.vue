<!-- 配方工艺参数修改 -->
<template>
    <div class="process-action">
        <div class="centent">
            <div class="add-item">
                <div class="item-title">工艺参数</div>
                <el-input class="item-input" v-model="processData1.ProcessParametersName"></el-input>
            </div>
            <div class="add-item">
                <div class="item-title">配方值</div>
                <el-input type="Number" class="item-input" v-model="processData1.Value"></el-input>
            </div>
            <div class="add-item">
                <div class="item-title">变量</div>
                <el-input class="item-input input1" v-model="processData1.VariableName" disabled></el-input>
                <el-button class="btn" @click="changeProcess">选择</el-button>
            </div>

        </div>
        <div class="footer">
            <my-button class="btn" @btnClick="colse()">取消</my-button>
            <my-button class="btn ok" @btnClick="ok()">保存</my-button>

        </div>
        <my-dialog :toBody="true" :title="'选择变量'" :visible="openDialog" :width="'1100px'" @close="openDialog = false"
            @ok="dialogOk">
            <div class="parameter-list">
                <div class="parameter-header">
                    <div class="header-item">
                        <span>设备：</span>
                        <el-select class="select" v-model="deviceName" placeholder="请选择" @change="selectDevice">
                            <el-option v-for="(item, index) in deviceList" :key="index" :label="item.DeviceName"
                                :value="item.DeviceName">
                            </el-option>
                        </el-select>
                    </div>
                    <div class="header-item">
                        <span>组名：</span>
                        <el-select class="select" v-model="groupName" placeholder="请选择">
                            <el-option v-for="(item, index) in groupList" :key="'group' + index" :label="item.GroupName"
                                :value="item.GroupName">
                            </el-option>
                        </el-select>
                    </div>
                    <div class="header-item">
                        <span>数据类型：</span>
                        <el-select class="select" v-model="dataType" placeholder="请选择">
                            <el-option v-for="item in dataTypeList" :key="item.Value" :label="item.Text"
                                :value="item.Value">
                            </el-option>
                        </el-select>
                    </div>
                    <div class="header-item">
                        <el-input class="select" v-model="keyWord" placeholder="请输入关键字"></el-input>
                    </div>
                    <el-button class="btn search" @click="searchBtn">查询</el-button>
                </div>
                <div class="content-table">
                    <my-table class="table" :isSelection="true" :columnList="parameterColumnList"
                        :tableDataList="parameterList" @selectionChange="selectionChange">
                    </my-table>
                </div>
                <div class="footer">
                    <my-page :pageData="pageData" @changePage="changePage"></my-page>
                </div>

            </div>
        </my-dialog>
    </div>
</template>
<script>
import MyButton from '@/newComponents/Button.vue'
import MyDialog from '@/newComponents/Dialog.vue'
import MyTable from '@/newComponents/Table.vue'
import MyPage from '@/newComponents/Page.vue'
import { parameterColumnList } from '../index'
export default {
    components: {
        MyButton,
        MyDialog,
        MyTable,
        MyPage
    },
    props: {
        processData: {
            type: Object,
            default: null
        },

    },

    data() {
        return {
            openDialog: false,
            parameterColumnList: parameterColumnList,
            pageData: {
                PageIndex: 1,
                TotalCount: 0,
                PageSize: 50
            },
            deviceList: [],
            deviceName: '不限',
            groupName: '不限',
            dataType: '不限',
            keyWord: '',
            parameterList: [],
            processData1: '',
            selectionList: []


        }
    },
    watch: {
        
        processData(n) {
            this.processData1 = n
            // console.log(this.processData1)
        }
    },
    computed: {
        groupList() {
            let list = []
            let _this = this
            if (this.deviceList.length > 0) {
                let data = this.deviceList.filter(item => {
                    return item.DeviceName == _this.deviceName
                })

                list = data[0].Groups
            }

            return list
        },
        dataTypeList() {
            // console.log(this.groupList)
            let list = []
            let _this = this
            let data = this.groupList.filter(item => {
                return item.GroupName == _this.groupName
            })
            if (data.length > 0) {
                list = data[0].DataTypes
            }
            return list

        },
        dataTypes() {
            let list = []
            if (this.dataType == '不限') {
                this.dataTypeList.forEach(item => {
                    if (item.Value != '不限') {
                        list.push(item.Value)
                    }
                })
            } else {
                list.push(this.dataType)
            }
            return list
        }

    },

    methods: {
        colse() {
            this.$emit('colse')
        },
        dialogOk() {
            if (this.selectionList.length <= 0) {
                this.confirm_Pop2(this, '请选择变量')
                return
            }
            if (this.selectionList.length > 1) {
                this.confirm_Pop2(this, '只能选择一个变量项')
                return
            }
            this.processData1.VariableName = this.selectionList[0].Name
            this.openDialog = false

        },
        selectionChange(selection) {
            this.selectionList = selection

        },
        //changePage分页
        changePage(PageIndex) {
            this.pageData.PageIndex = PageIndex
            this.getProcessList()
        },
        //变量查询
        searchBtn() {
            this.pageData.PageIndex = 1
            this.getProcessList()
        },
        selectDevice(data) {
            this.groupName = '不限',
                this.dataType = '不限'
            // console.log(data)
        },
        //选择变量
        changeProcess() {
            this.getSearchProcessData().then(res => {
                this.getProcessList()
            })
            this.openDialog = true
        },


        //获取变量查询列
        getSearchProcessData() {
            return new Promise((resolve, reject) => {
                this.$axios({
                    url: `/api/ProcessParameterConfigure/GstCondition`,
                    method: 'post',
                }).then(res => {

                    const data = res.data
                    if (data.code == 0) {
                        this.deviceList = data.data
                        resolve(data.data)
                    } else {
                        reject(data)
                    }

                }).catch(err => {
                    reject(err)

                })

            })

        },
        //获取变量
        getProcessList() {
            let data = {
                "argDevice": this.deviceName,
                "argGroup": this.groupName,
                "argDataType": this.dataTypes,
                "argKeyWord": this.keyWord,
                "argPageSize": this.pageData.PageSize,
                "argPageIndex": this.pageData.PageIndex
            }
            return new Promise((resolve, reject) => {
                this.$axios({
                    url: `/api/ProcessParameterConfigure/GstVariableList`,
                    method: 'post',
                    data: data
                }).then(res => {
                    // console.log(res)
                    const data = res.data
                    if (data.code == 0) {
                        this.parameterList = data.data.DataList
                        let ParameterList = data.data.ParameterList
                        this.pageData.TotalCount = ParameterList.TotalCount
                        resolve(data.data)
                    } else {
                        reject(data)
                    }

                }).catch(err => {
                    reject(err)

                })

            })

        },
        //
        ok() {
             if (!this.processData1.ProcessParametersName.trim()) {
                this.confirm_Pop2(this, `请输入工艺参数`)
                return
            }
             if (!this.processData1.Value.trim()) {
                this.confirm_Pop2(this, `请输入配方值`)
                return
            }
            // console.log(this.processData1)
            let data = {
                "ProcessParametersId": this.processData1.ProcessParametersId,
                "ProcessParametersName":this.processData1.ProcessParametersName,
                "Value": this.processData1.Value,
                "VariableName": this.processData1.VariableName,
                "Description": this.processData1.Description
            }
            this.$axios({
                    url: `/api/Formula/UpdateFormulaParameterInfo`,
                    method: 'post',
                    data:data
                }).then(res => {

                    const data = res.data
                    if (data.code == 0) {
                        this.message_Success(this, '编辑成功')
                        this.$emit('ok')
                    } else{
                        this.confirm_Pop2(this,data.msg)
                    }

                }).catch(err => {
                    this.confirm_Pop2(this,err)

                })

        }
    },
    mounted() {
        this.processData1 = this.processData
        // this.getSearchProcessData()
    }
}
</script>
<style lang="scss" scoped>
.process-action {

    .centent {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;

        .add-item {
            width: 48%;
            padding-bottom: 20px;

            .item-input {
                width: calc(100% - 70px)
            }

            .input1 {
                width: calc(100% - 150px);
                margin-right: 10px
            }

            .btn {
                height: 30px;
                padding: 0;
                width: 70px;
                color: #4270E4;
                border: 2px solid rgba(66, 112, 228, 0.7)
            }

            .item-title {
                width: 70px;
                display: inline-block;
                text-align: right;
                padding-right: 5px;
            }

        }

    }

    .footer {
        text-align: right;

        .btn {
            min-width: 100px;
            height: 38px;
            background: #999999;
            border: 0;
            font-size: 16px;
            color: #FFFFFF;

        }

        .ok {
            background: #386DF0;
        }
    }


}

.parameter-list {
    padding: 10px 20px;
    background: #e6e6e6;
    border: 1px solid #dcdcdc;

    .parameter-header {

        .header-item {
            padding: 10px;
            display: inline-block
        }

        .search {
            height: 30px;
            padding: 0;
            width: 100px;
            color: #4270E4;
            border: 2px solid #4270E4
        }

        .select {
            width: 150px;

            // height:30px
            ::v-deep .el-input__inner {
                height: 30px;
                line-height: 30px
            }

            ::v-deep .el-input__icon {
                line-height: 30px
            }
        }
    }

    .footer {
        padding-top: 20px
    }

    .content-table {
        height: 400px
    }
}
</style>