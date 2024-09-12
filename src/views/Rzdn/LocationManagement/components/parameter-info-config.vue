<template>
    <div class="parameter-info-config flex">
        <!-- 头部 -->
        <div class="head flex">
            <div class="basicbtn" @click="createData()">新增</div>
            <div class="basicbtn-gray-fill" @click="deleteData()">删除</div>
        </div>

        <!-- 表格 -->
        <div class="table">
            <el-table
                ref="myTable"
                :data="tableData"
                :header-cell-style="{ background: '#5A6C98', color: '#FFFFFF' }"
                :row-class-name="
                    ({ row, rowIndex }) =>
                        rowIndex % 2 ? 'table-row-highlighted' : ''
                "
                :border="true"
                style="width: 100%"
                height="550"
                @select="handleSelectionChange"
                @select-all="handleSelectionChange"
            >
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column label="序号" align="center" width="50">
                    <template slot-scope="scope">{{
                        scope.$index + 1
                    }}</template>
                </el-table-column>
                <el-table-column
                    prop="ParameterName"
                    label="参数名称"
                    width="220"
                >
                    <template slot-scope="scope">
                        <el-tooltip
                            effect="dark"
                            :content="scope.row.ParameterName"
                            placement="bottom"
                        >
                            <el-input
                                v-model="scope.row.ParameterName"
                                placeholder="请输入参数名称"
                            ></el-input>
                        </el-tooltip>
                    </template>
                </el-table-column>
                <el-table-column prop="Type" label="参数类型" width="180">
                    <template slot-scope="scope">
                        <el-select
                            v-model="scope.row.Type"
                            @change="changeType"
                        >
                            <el-option
                                v-for="(item, i) in parameterTypes"
                                :key="i"
                                :label="item.Item2"
                                :value="item.Item1"
                                :disabled="isDisabled(item, scope.row)"
                            ></el-option>
                        </el-select>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="VariableName"
                    label="变量名称"
                    width="260"
                >
                    <template slot-scope="scope">
                        <div class="variable flex">
                            <span>{{ getVariableNameText(scope.row) }}</span>
                            <div
                                class="basicbtn-blue"
                                @click="
                                    selectParameter(scope.row, scope.$index)
                                "
                            >
                                选择
                            </div>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="foot-btn flex">
            <el-button @click="submit('cancel')">取消</el-button>
            <el-button type="primary" @click="submit('confirm')"
                >确认</el-button
            >
        </div>

        <!-- 选择变量 -->
        <el-dialog
            title="选择变量"
            width="1100px"
            class="select-variable-dialog flex"
            :visible.sync="selectVariableDialog.show"
            :before-close="
                () => {
                    this.selectVariableShow('hide');
                }
            "
            append-to-body
        >
            <select-variable
                :list="selectVariableDialog.list"
                v-if="selectVariableDialog.contentShow"
                @callback="selectVariableCallback"
            ></select-variable>
        </el-dialog>

        <!-- 订单字段 -->
        <el-dialog
            title="订单字段"
            width="400px"
            class="flex"
            :visible.sync="orderFieldsDialog.show"
            :before-close="
                () => {
                    this.orderFieldsShow('hide');
                }
            "
            append-to-body
        >
            <order-fields
                v-if="orderFieldsDialog.contentShow"
                @callback="orderFieldsCallback"
            ></order-fields>
        </el-dialog>

    </div>
</template>
<script>
import SelectVariable from '@/newComponents/select-variable.vue';
import OrderFields from './order-fields.vue';
import MyDialog from '@/newComponents/Dialog.vue';

import {
    randomNumber,
    clearArray,
    dataIsChange,
    getOrderField,
    getOrderFieldsText,
    GetMaterialType,
} from '../index';
export default {
    components: { OrderFields, SelectVariable, MyDialog },
    props: {
        locationData: {
            type: Object,
            required: false,
            default: () => {
                return null;
            },
        },
    },
    data() {
        return {
            oldData: [], // 旧数据用于验证
            productionNumberLocationID: 0, // 产品编号工位ID
            tableData: [],
            orderFieldList: [],
            parameterTypes: [],
            parameterTypesHave4: false, // 有产品编号
            selectVariableDialog: {
                // 选择变量
                show: false,
                contentShow: false,
                list: [], // 变量列表
            },
            orderFieldsDialog: {
                // 订单字段
                show: false,
                contentShow: false,
            },

            currentIndex: null, // 表格-选择当前行下班
            selection: [], // 表格-复选框选择数据
            rules: {
                ParameterName: [
                    {
                        required: true,
                        message: '请输入参数名称',
                        trigger: 'blur',
                    },
                ],
                Type: [
                    {
                        required: true,
                        message: '请选择参数类型',
                        trigger: 'change',
                    },
                ],
            },
            keyWord: '',
            materialPopShow: false,
            materialTypeList: [],
        };
    },
    methods: {
        // 获取产品编号工位ID
        getProductionNumberLocationID() {
            return this.$api.locationManagement
                .getProductionNumberLocationID()
                .then(
                    (ref) => {
                        // 不为0就是已选产品编号
                        return ref.data.data;
                    },
                    (err) => {
                        console.log('失败回调', err);
                        return -1;
                    }
                );
        },
        // 参数类型-改变
        changeType(data) {
            if (data === 4) {
                this.parameterTypesHave4 = true;
            } else {
                this.parameterTypesHave4 = false;
            }
            console.log(data, this.parameterTypesHave4);
        },
        // 参数类型-是否禁用
        isDisabled(item, row) {
            if (item.Item1 !== 4) return false;
            if (this.productionNumberLocationID > 0) {
                if (this.productionNumberLocationID === row.WorkStationId) {
                    if (this.parameterTypesHave4) return true;
                    return false;
                } else {
                    return true;
                }
            }
            if (this.parameterTypesHave4) return true;
            return false;
        },
        // 参数类型-是否有产品编号
        have4(list) {
            for (let i = 0, iLen = list.length; i < iLen; i++) {
                const item = list[i];
                if (item.Type === 4) {
                    this.parameterTypesHave4 = true;
                    break;
                }
            }
        },
        // 获取参数类型选择项
        getTypeOption() {
            return this.$api.locationManagement
                .getParameterType(this.locationData.Type)
                .then(
                    (ref) => {
                        const list = ref.data.data;
                        if (
                            Object.prototype.toString.call(list) !==
                            '[object Array]'
                        ) {
                            this.$message.error(list);
                            return;
                        }
                        // this.parameterTypes = list
                        // console.log("参数类型", JSON.parse(JSON.stringify(list)));
                        return list;
                    },
                    (err) => {
                        this.$message.error(err);
                        return [];
                    }
                );
        },
        // 获取列表
        getList() {
            return this.$api.locationManagement
                .getParameterReport(this.locationData.WorkStationId)
                .then(
                    (ref) => {
                        const list = ref.data.data;
                        // this.oldData = JSON.parse(JSON.stringify(list))
                        // this.tableData = list
                        // console.log("获取列表", JSON.parse(JSON.stringify(list)));
                        return list;
                    },
                    (err) => {
                        console.log('失败回调', err);
                        return [];
                    }
                );
        },

        // 获取变量名称文本
        getVariableNameText(row) {
            let text = getOrderFieldsText(row, this.orderFieldList)
            if (!text && row.Type === 3) {
                text = "未选择"
            }
            return text;
        },
        // 新建参数信息
        createData() {
            // console.log("批量编辑参数.locationData", JSON.parse(JSON.stringify(this.locationData)));
            this.tableData.push({
                WorkStationId: this.locationData.WorkStationId,
                ParameterId: Number('-' + randomNumber()),
                ParameterName: '',
                Type: null,
                VariableName: '',
            });
        },
        // 删除参数信息
        async deleteData() {
            if (!this.selection.length) return;
            const results = await new Promise((resolve, reject) => {
                this.confirm_Pop3(this, '是否删除', (res) => resolve(res));
            });
            if (results === 'cancel') return;

            let onlineList = []; // 线上删除数组
            let localList = []; // 本地删除数组
            for (let i = 0, iLen = this.selection.length; i < iLen; i++) {
                const item = this.selection[i];
                if (item.ParameterId >= 0) {
                    onlineList.push(item.ParameterId);
                } else {
                    localList.push(item.ParameterId);
                }
            }

            this.tableData = clearArray(
                this.tableData,
                localList,
                'ParameterId'
            );

            if (!onlineList.length) return;
            this.cacheDeleteIndex = onlineList;

            this.tableData = clearArray(
                this.tableData,
                onlineList,
                'ParameterId'
            );
        },
        // 表格-复选框
        handleSelectionChange(row, item) {
            this.selection = row;
        },
        async getMaterialTypeList() {
            let res = await GetMaterialType(this.keyWord);
            this.materialTypeList = res.map((_) => ({ ..._, c: false }));
        },
        // 选择参数
        async selectParameter(row, index) {
            /*
      参数类型：
      1.过程参数-1、合格信号-5、扫码枪-6：跳出变量选择弹窗；
      2.订单字段-2：订单字段弹窗
      3.物料防错-3、产品编号-4：选择按钮不可用(点了没反应)
      */
            // console.log('选择参数', JSON.parse(JSON.stringify(row)));
            this.currentIndex = index;
            if ([3].includes(row.Type)) {
                let res = await GetMaterialType('');
                this.materialTypeList = res.map((_) => ({ ..._, c: false }));
                this.materialPopShow = true;
                return;
            }
            if ([1, 5, 6,7].includes(row.Type)) {
                this.selectVariableDialog.list = [{ Name: row.VariableName }];
                this.selectVariableShow('show');
                return;
            }
            if ([2].includes(row.Type)) {
                this.orderFieldsShow('show');
                return;
            }
            if ([4].includes(row.Type)) {
                console.log('产品编号无需配置参数地址');
                return;
            }
        },
        // 选择变量-显示/隐藏
        selectVariableShow(state) {
            switch (state) {
                case 'show':
                    this.selectVariableDialog.show = true;
                    this.selectVariableDialog.contentShow = true;
                    break;
                case 'hide':
                    this.selectVariableDialog.show = false;
                    setTimeout(() => {
                        this.selectVariableDialog.contentShow = false;
                    }, 500);
                    break;
                default:
                    break;
            }
        },
        // 选择变量回调
        selectVariableCallback(data) {
            if (data === 'cancel') {
                this.selectVariableShow('hide');
                return;
            }
            if (!data || !data.length) return;
            this.tableData[this.currentIndex].VariableName = data[0].Name;
            this.selectVariableShow('hide');
        },

        // 订单字段-显示/隐藏
        orderFieldsShow(state) {
            switch (state) {
                case 'show':
                    this.orderFieldsDialog.show = true;
                    this.orderFieldsDialog.contentShow = true;
                    break;
                case 'hide':
                    this.orderFieldsDialog.show = false;
                    setTimeout(() => {
                        this.orderFieldsDialog.contentShow = false;
                    }, 500);
                    break;
                default:
                    break;
            }
        },
        // 选择订单字段回调
        orderFieldsCallback(data) {
            // console.log(data);
            if (data === 'cancel') {
                this.orderFieldsShow('hide');
                return;
            }
            if (!data) return;
            this.tableData[this.currentIndex].VariableName = data.Item1;
            this.orderFieldsShow('hide');
        },
        // 验证改动
        validateChanges() {
            // 确认弹窗
            const confirm = async () => {
                const results = await new Promise((resolve, reject) => {
                    this.confirm_Pop3(this, '当前数据已修改是否保存', (res) =>
                        resolve(res)
                    );
                });
                switch (results) {
                    case 'confirm':
                        this.submit(results);
                        break;
                    case 'cancel':
                        this.$emit('callback', null);
                        break;
                    default:
                        break;
                }
            };
            if (dataIsChange(this.oldData, this.tableData)) {
                confirm();
            } else {
                this.$emit('callback', null);
            }
        },
        // 提交
        submit(model) {
            // console.clear();
            // console.log("提交", JSON.parse(JSON.stringify(this.tableData)));
            if (model === 'cancel' || !this.tableData.length) {
                this.validateChanges();
                return;
            }

            let msgText = '';
            for (let i = 0, iLen = this.tableData.length; i < iLen; i++) {
                const item = this.tableData[i];
                let index = i;
                const indexText = `序号为${++index}，`;
                if (!item.ParameterName) {
                    msgText = `${indexText}请输入名称`;
                    break;
                }
                if (item.Type) {
                    if ([1, 5, 6, 7].includes(item.Type) && !item.VariableName) {
                        msgText = `${indexText}请选择变量`;
                        break;
                    }
                    if ([2].includes(item.Type) && !item.VariableName) {
                        msgText = `${indexText}请选择订单字段`;
                        break;
                    }
                    if ([3].includes(item.Type) && !item.VariableName) {
                        msgText = `${indexText}请选择产品类型`;
                        break;
                    }
                } else {
                    msgText = `${indexText}请选择参数类型`;
                    break;
                }
            }
            if (msgText) {
                this.confirm_Pop2(this, msgText);
                return;
            }
            let arr = this.tableData.map((item) => ({
                ...item,
                VariableName:
                    item.Type == 3 ? item.VariableId : item.VariableName,
            }));
            this.$api.locationManagement.saveParameterInfo(arr).then(
                (ref) => {
                    // console.log('提交', ref);
                    if (ref.data.code === 0) {
                        this.confirm_Pop2(this, '保存成功');
                        this.$emit('callback', 'success');
                    } else {
                        this.confirm_Pop2(this, ref.data.msg);
                    }
                },
                (err) => {
                    this.$message.error(err);
                }
            );
            if (this.cacheDeleteIndex.length) {
                this.$api.locationManagement.deleteParameterInfo(this.cacheDeleteIndex).then(
                    (ref) => {
                        if (!ref.data.data) {
                            this.$message({
                                message: ref.data.msg,
                                type: 'error',
                            });
                            return;
                        }
                        this.$message({
                            message: ref.data.data,
                            type: 'success',
                        });
                    },
                    (err) => {
                        console.log('失败回调', err);
                    }
                );
            }
        },
        async init() {
            console.clear();
            if (!this.locationData) return;
            this.productionNumberLocationID =
                await this.getProductionNumberLocationID();
            this.parameterTypes = await this.getTypeOption();
            let materialTypeList = await GetMaterialType('');
            this.orderFieldList = await getOrderField();
            const list = await this.getList();
            this.have4(list);
            this.oldData = JSON.parse(JSON.stringify(list));
            list.forEach((_) => {
                if (_.Type == 3) {
                    let o = materialTypeList.find(
                        (_2) => _.VariableName == _2.ID
                    );
                    if (o) {
                        _.VariableName = o.Name;
                        _.VariableId = o.ID;
                    }
                }
            });
            this.tableData = list;
        },
        changeCheck(i, b) {
            this.materialTypeList.forEach((element) => {
                console.log("element",element,i)
                element.c = element.ID == i.ID ? b : false;
            });
        },
    },
    computed: {
        selectlistRow() {
            return this.materialTypeList.find((element) => element.c);
        },
    },
    watch: {
        locationData: {
            immediate: true,
            handler: function () {
                this.init();
            },
        },
    },
};
</script>
<style>
.materialType-dialog .el-dialog__headerbtn {
    top: 20px !important;
}
.materialType-dialog .el-dialog {
    margin-top: 15vh !important;
}
.materialType-dialog .dialog-class .el-dialog__header {
    line-height: 36px;
}
</style>
<style lang='scss' scoped>
@import '../index.scss';
.parameter-info-config {
    width: 100%;
    height: 100%;
    flex-direction: column !important;
    ::v-deep .is-error {
        border-color: #f56c6c;
    }

    & > .head {
        width: 100%;
        height: 50px;
        padding: 0 0 10px 0;
        justify-content: flex-start;
        .basicbtn,
        .basicbtn-orange,
        .basicbtn-gray-fill {
            margin: 0 10px 0 0;
        }
        & > .left {
            height: 100%;
            & > .title {
                height: 100%;
                color: #4270e4;
                .block {
                    width: 4px;
                    height: 60%;
                    margin: 0 4px 0 0;
                    background: #4270e4;
                }
            }
        }
    }
    & > .table {
        width: 100%;
        // height: 100%;
        // height: 500px;
        // max-height: 500px;
        overflow-y: auto;
        .el-table {
            overflow-y: auto;
        }
        .variable {
            width: 100%;
            height: 100%;
            justify-content: space-between;
        }
    }
    .foot-btn {
        width: 100%;
        margin: 20px 0 0 0;
        justify-content: flex-end;
    }
}
.materialType-manage {
    .btn-list {
        width: 100%;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        box-sizing: border-box;
        padding-bottom: 16px;
        .header-input {
            width: 200px;
            margin-right: 16px;
        }
    }
    .btn {
        height: 40px;
        font-weight: 600;
        font-size: 16px;
        padding: 0 10px;
        // margin: 0 10px;
        min-width: 100px;
    }

    .search-btn {
        color: #fff;
        background: #4270e4;
    }
    .ok {
        background: #386df0;
    }
    .table-list {
        width: 100%;
        height: 500px;
    }

    .dialog-footer {
        padding: 20px 0 0;
        box-sizing: border-box;
        display: flex;
        justify-content: flex-end;
    }
}
</style>