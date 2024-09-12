<template>
    <div class="add-parameter">
        <div class="parameter-list">
            <div class="parameter-header">
                <div class="header-item">
                    <span>设备：</span>
                    <el-select class="select" v-model="deviceName" placeholder="请选择">
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
        <div class="line">
            <el-button class="btn add" @click="addParameter">添加</el-button>
            <el-button class="btn del" @click="delParameter">移除</el-button>
        </div>
        <div class="parameter-list">
            <div class="title">已选变量</div>
            <div class="content-table">
                <my-table :isSelection="true" :columnList="parameterColumnList1" :tableDataList="selectParameterList"
                    @selectionChange="selectionChange1">
                    <template #ProcessParametersName="{ scope }">
                        <el-input v-model="scope.row.ProcessParametersName" @input="processInput($event, scope)">
                        </el-input>
                    </template>
                    <template #Value="{ scope }">
                        <el-input type="Number" v-model="scope.row.Value"></el-input>
                    </template>
                </my-table>
            </div>
        </div>
        <div class="footer">
            <my-button class="btn" @btnClick="colse()">取消</my-button>
            <my-button class="btn ok" @btnClick="ok()">保存</my-button>

        </div>
    </div>
</template>
<script>
import MyTable from '@/newComponents/Table.vue'
import MyPage from '@/newComponents/Page.vue'
import MyButton from '@/newComponents/Button.vue'
import { parameterColumnList, parameterColumnList1 } from '../index'
import { randomRangeId } from '@/util/tool.js'
export default {
    components: {
        MyTable,
        MyPage,
        MyButton
    },
    props: {
        data: {
            type: Array,
            default: () => {
                return []
            }
        },
        formulaId: {
            type: Number,
            default: null
        },
        workStationId: {
            type: Number,
            default: null
        }

    },
    data() {
        return {
            parameterColumnList: parameterColumnList,
            parameterColumnList1: parameterColumnList1,
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
            selectionList: [],
            selectParameterList: [],
            selectionList1: []

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
        ok() {
            // console.log(this.selectParameterList)
            let list = this.selectParameterList
            let items = []
            for (let i = 0; i < list.length; i++) {
                let item = list[i]
                if (!item.ProcessParametersName.trim()) {
                    this.confirm_Pop2(this, `变量${item.VariableName},请输入工艺参数`)
                    return
                }
                if (!item.Value.trim()) {
                    this.confirm_Pop2(this, `变量${item.VariableName},请输入配方值`)
                    return
                }
                items.push({
                    "ProcessParametersName": item.ProcessParametersName,
                    "Value": item.Value,
                    "VariableName": item.VariableName,
                    "Description": item.Description
                })
            }
            let data = {
                "FormularId": this.formulaId,
                "WorkStationID": this.workStationId,
                "ParameterInfoItems": items
            }
            this.$axios({
                url: `/api/Formula/BatchAddFormulaParameterInfo`,
                method: 'post',
                data: data
            }).then(res => {

                const data = res.data
                if (data.code == 0) {
                    // this.deviceList = data.data
                    this.$emit('ok', data.data)
                    this.message_Success(this, '保存成功')
                } else {
                    this.confirm_Pop2(this, data.msg)
                }

            }).catch(err => {
                this.confirm_Pop2(this, err)

            })

        },
        processInput(val, scope) {
            // console.log(val)
            // console.log(scope)

        },
        //添加变量
        addParameter() {
            let sameNameList = []
            this.selectionList.forEach(item => {
                let variableData = this.selectParameterList.filter((item1) => {
                    return item1.VariableName == item.Name

                })
                if (variableData.length <= 0) {
                    let data = {
                        'ID': randomRangeId(),
                        "ProcessParametersName": "",
                        "Value": "",
                        "VariableName": item.Name,
                        "Description": item.Descript
                    }
                    this.selectParameterList.push(data)

                } else {
                    // console.log(variableData)
                    sameNameList.push(variableData[0].VariableName)
                }

            })
            
            if (sameNameList.length > 0) {
                
                this.confirm_Pop2(this, `变量${sameNameList.toString()}已选，添加失败`)
            }
            // this.selectParameterList.concat(this.selectionList)

        },
        //删除变量
        delParameter() {
            // console.log(this.selectionList1)
            this.confirm_Pop(this, '是否确认移除？', () => {
                let list = this.selectParameterList
                this.selectionList1.forEach(item => {
                    for (let i = 0; i < list.length; i++) {
                        if (item.ID == list[i].ID) {
                            list.splice(i, 1)
                            break;
                        }
                    }
                })

            })
        },
        //选择变量
        selectionChange(selection) {
            this.selectionList = selection
            // console.log(selection)

        },
        //选择删除变量
        selectionChange1(selection) {
            this.selectionList1 = selection
            // console.log(selection)

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

        }
    },
    mounted() {
        this.selectParameterList = []
        this.data.forEach(item => {
            // console.log(item)
            let data = {
                'ID': item.ProcessParametersId,
                "ProcessParametersName": item.ProcessParametersName,
                "Value": item.Value,
                "VariableName": item.VariableName,
                "Description": item.Description
            }
            this.selectParameterList.push(data)

        })
        this.getSearchProcessData().then(res => {
            this.getProcessList()
        })
    }
}
</script>
<style scoped lang="scss">
.add-parameter {
    .parameter-list {
        padding: 10px 20px;
        background: #e6e6e6;
        border: 1px solid #dcdcdc;

        .footer {
            padding-top: 20px
        }
    }

    .parameter-header {

        .header-item {
            padding: 10px;
            display: inline-block
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



    .line {
        padding: 10px 0;
        text-align: center;




    }

    .btn {
        height: 30px;
        padding: 0;
        width: 120px;
        color: #fff;
    }

    .search {
        width: 100px;
        color: #4270E4;
        border: 2px solid #4270E4
    }

    .add {

        background: #4270E4
    }

    .del {
        background: #AAAAAA
    }

    .content-table {
        height: 260px;

        ::v-deep .el-table th.is-leaf {
            background: #dcf0f9 !important;
            color: #386df0 !important;
        }
    }

    .title {
        color: #4270E4;
        font-size: 18px;
        // font-weight: bold;
        padding-bottom: 10px
    }

    .footer {
        padding-top: 10px;
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
</style>