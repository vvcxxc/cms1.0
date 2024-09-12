<template>
    <div class="zdeditPop">
        <div class="myDialog" id="myDialog">
            <div class="popHeader">
                {{ title }}工单
                <img :src="require('../../../assets/images/no.png')" alt="" @click="handleClick" class="close" />
            </div>

            <div class="popContent">
                <div class="content1-line">
                    <div class="content">
                        <div class="contentLable required">工单号</div>
                        <el-input type="text" v-model="formData.OrderNumber" style="width: 250px"
                            :disabled="title == '查看'" />
                    </div>
                    <div class="content">
                        <div class="contentLable required">生产型号</div>
                        <el-select v-model="formData.FID" style="width: 250px" @change="GetOrderWorkSectionListFn(false)"
                            :disabled="title == '查看'">
                            <el-option v-for="item in typeList" :key="item.FID" :label="item.ProductTypeCode"
                                :value="item.FID">
                            </el-option>
                        </el-select>
                    </div>

                </div>
                <div class="content1-line">
                    <div class="content">
                        <div class="contentLable required">工单类型</div>
                        <el-select v-model="formData.OrderType" style="width: 250px" :disabled="title == '查看'">
                            <el-option v-for="item in statusList" :key="item.OrderTypeId" :label="item.OrderTypeName"
                                :value="item.OrderTypeId">
                            </el-option>
                        </el-select>
                    </div>
                    <div class="content">
                        <div class="contentLable required">计划数量</div>
                        <el-input type="number" v-model="formData.PlanNumber" style="width: 250px"
                            :disabled="title == '查看'" />
                    </div>

                </div>
                <div class="content1-line">
                    <div class="content">
                        <div class="contentLable required">计划开始</div>
                        <el-date-picker v-model="formData.StartTime" type="datetime" placeholder="选择日期"
                            value-format="yyyy-MM-dd HH:mm:ss" style="width: 250px" :disabled="title == '查看'" />
                    </div>
                    <div class="content">
                        <div class="contentLable required">计划结束</div>
                        <el-date-picker v-model="formData.EndTime" type="datetime" placeholder="选择日期"
                            value-format="yyyy-MM-dd HH:mm:ss" style="width: 250px" :disabled="title == '查看'" />
                    </div>
                </div>

                <div class="flex-box">
                    <div class="flex-l">
                        <div class="table-title">
                            <CurrentTitle title="工艺路线" />
                        </div>
                        <div class="table">
                            <el-table ref="myTable" highlight-current-row :cell-style="{ borderColor: '#E4E7ED' }"
                                :header-cell-style="{ 'text-align': 'center', background: '#5a6c98', color: '#fff' }"
                                :data="WorkSectionList" border height="100%" :row-class-name="tableRowClassName"
                                @row-click="handleRowChange1" @select-all="selectFn" @select="selectFn">
                                <template slot="empty">
                                    <span>暂无数据</span>
                                </template>
                                <el-table-column type="index" label="序号" width="60px" align='center'></el-table-column>
                                <el-table-column prop="WorkName" label="工序名称" align='center'
                                    :show-overflow-tooltip="true"></el-table-column>
                                <el-table-column type="selection" width="60px" :selectable="selectableFn">
                                </el-table-column>
                                <el-table-column label="工序编码" width="150px" align='center'>
                                    <template slot-scope="scope">
                                        <el-input v-model="scope.row.WorkSection.WorkSectionCode"
                                            :disabled="title == '查看'" />
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                    </div>
                    <div class="flex-r">
                        <div class="table-title">
                            <CurrentTitle title="检测工序" />
                            <div class="table-action">
                                <div class="action-btn" @click="addWorkSection">添加</div>
                                <div class="action-btn cancel" @click="delWorkSection">删除</div>
                            </div>
                        </div>

                        <div class="table">
                            <el-table ref="myTable2" highlight-current-row :cell-style="{ borderColor: '#E4E7ED' }"
                                :header-cell-style="{ 'text-align': 'center', background: '#5a6c98', color: '#fff' }"
                                :data="rightList" border height="100%" :row-class-name="tableRowClassName"
                                @row-click="handleRowChange2">
                                <template slot="empty">
                                    <span>暂无数据</span>
                                </template>
                                <el-table-column type="index" label="序号" width="60px" align='center'></el-table-column>
                                <el-table-column prop="WorkCode" label="物料编码" align='center' :show-overflow-tooltip="true">
                                    <template slot-scope="scope">
                                        <el-select v-model="scope.row.MaterialCode" :disabled="title == '查看'">
                                            <el-option v-for="item in materialList" :key="item.Id"
                                                :label="item.MaterialCode" :value="item.MaterialCode">
                                            </el-option>
                                        </el-select>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="WorkStepName" label="单位用量" align='center'
                                    :show-overflow-tooltip="true">
                                    <template slot-scope="scope">
                                        <el-input v-model="scope.row.UnitQty" :disabled="title == '查看'" />
                                    </template>
                                </el-table-column>

                            </el-table>
                        </div>
                    </div>
                </div>






                <div class="content1-line">
                    <div class="content">
                        <div class="contentLable">备注</div>
                        <el-input type="textarea" v-model="formData.Remarks" style="width: 650px" />
                    </div>

                </div>

            </div>
            <div class="popBtn">
                <el-button class="btn" @click="handleClick('no')">
                    取消
                </el-button>
                <el-button class="btn" @click="handleClick('yes')" style="
                                                                     background: rgba(56, 109, 240);
                                                                    border: 1px solid #386df0;
                                                                ">
                    确定
                </el-button>
            </div>
        </div>
        <tip-pop v-if="isTipShow" :tipText="tipText" :noCancel="noCancel" @tipCallBack="tipCallBack"></tip-pop>

    </div>
</template>

<script>
import CurrentTitle from '../../../components/public/currentTitle.vue';
import TipPop from '../../../components/public/tipPop.vue';

export default {
    props: ['title', 'selectItem'],
    components: {
        CurrentTitle,
        TipPop
    },
    data() {
        return {
            isTipShow: false,
            tipText: '',
            noCancel: true,
            formData: {
                OrderNumber: '',
                OrderType: '',
                FID: '',
                PlanNumber: '',
                StartTime: '',
                EndTime: '',
                Remarks: ''
            },
            curLeftIdx: 0,
            curRightIdx: 0,
            WorkSectionList: [],
            selectionList: [],
            statusList: [],//产品型号
            typeList: [],//工单类型
            materialList: [],//物料编号

        };
    },

    mounted() {
        this.GetOrderStatus()
        this.GetProductType()
        this.GetMaterialList();
        if (this.title != '添加' && this.selectItem) {
            this.formData = {
                ...this.selectItem.Data,
            }

            this.GetOrderWorkSectionListFn(true)
        }


    },
    computed: {
        rightList() {
            if (this.WorkSectionList.length && this.WorkSectionList[this.curLeftIdx]) {
                return this.WorkSectionList[this.curLeftIdx].BomList || []
            }
            return [];
        }
    },
    watch: {
        curLeftIdx(val) {
            this.curRightIdx = 0;
            this.$nextTick(() => {
                if (this.rightList.length) {
                    this.$refs.myTable2.setCurrentRow(this.rightList[0]);
                }
            });
        },
        'formData.OrderType': {
            immediate: true,
            handler: function () {
                this.initSelect()
            }
        }

    },
    methods: {
        initSelect() {
            if (this.formData.OrderType == 3) {
                let _obj = this.WorkSectionList.find(_ => _.WorkName == '定子上料')
                if (_obj) {
                    this.selectionList = [_obj];
                    this.$nextTick(() => {
                        this.WorkSectionList.forEach(element => {
                            if (element.WorkName == '定子上料') {
                                this.$refs.myTable.toggleRowSelection(element, true)
                            } else {
                                this.$refs.myTable.toggleRowSelection(element, false)
                            }
                        });
                    })

                } else {
                    this.selectionList = [];
                    this.$nextTick(() => {
                        this.WorkSectionList.forEach(element => {
                            this.$refs.myTable.toggleRowSelection(element, false)
                        });
                    })
                }
            } else {
                this.selectionList = this.WorkSectionList
                this.$nextTick(() => {
                    this.WorkSectionList.forEach(element => {
                        this.$refs.myTable.toggleRowSelection(element, true)
                    });

                })
            }
        },
        selectableFn() {
            if (this.title == '查看') {
                return false
            }
            if (this.formData.OrderType == 3) {
                return true
            }
            return false
        },
        selectFn(arr) {
            if (this.formData.OrderType != 3) {
                return
            }
            this.selectionList = arr;
        },
        addWorkSection() {
            if (this.title == '查看') {
                return
            }
            if (this.WorkSectionList.length && this.WorkSectionList[this.curLeftIdx]) {
                this.WorkSectionList[this.curLeftIdx].BomList.push({
                    UnitQty: '',
                    MaterialCode: ''

                })
                this.curRightIdx = 0;
                this.$nextTick(() => {
                    this.$refs.myTable2.setCurrentRow(this.rightList[0]);
                })
            } else {
                this.tipText = '请选择工艺路线！';
                this.isTipShow = true;
            }
        },
        delWorkSection() {
            if (this.title == '查看') {
                return
            }
            if (this.WorkSectionList.length &&
                this.WorkSectionList[this.curLeftIdx] &&
                this.WorkSectionList[this.curLeftIdx].BomList &&
                this.WorkSectionList[this.curLeftIdx].BomList[this.curRightIdx]) {
                console.log(this.WorkSectionList[this.curLeftIdx].BomList[this.curRightIdx])
                this.tipText = '确认删除选中工序？';
                this.isTipShow = true;
                this.noCancel = false;
            } else {
                this.tipText = '请选择工序！';
                this.isTipShow = true;
            }
        },
        tipCallBack(str) {
            if (str == 'yes') {
                this.WorkSectionList[this.curLeftIdx].BomList.splice(this.curRightIdx, 1)
                this.curRightIdx = 0;
                if (this.rightList.length) {
                    this.$nextTick(() => {
                        this.$refs.myTable2.setCurrentRow(this.rightList[0]);
                    })
                }
            }
            this.isTipShow = false;
            this.noCancel = true;
        },
        tableRowClassName({ row, rowIndex }) {
            row.$index = rowIndex
        },
        handleRowChange1(row) {
            this.curLeftIdx = row.$index;
        },
        handleRowChange2(row) {
            this.curRightIdx = row.$index;
        },
        GetOrderStatus() {
            this.$axios({
                url: `/api/ProjectOrder/GetOrderTypeList`,
                method: 'get',
            }).then((res) => {
                if (res.data.code == 0) {
                    this.statusList = res.data.data.filter(_ => _.OrderTypeId != 0)
                } else {
                    this.tipText = res.data.msg;
                    this.isTipShow = true;
                }
            });
        },
        GetProductType() {
            this.$axios({
                url: `/api/ProjectOrder/GetProductTypeList`,
                method: 'get',
            }).then((res) => {
                if (res.data.code == 0) {
                    this.typeList = res.data.data.filter(_ => _.FID != '00000000-0000-0000-0000-000000000000')
                } else {
                    this.tipText = res.data.msg;
                    this.isTipShow = true;
                }
            });
        },
        GetMaterialList() {
            this.$axios({
                url: `/api/ProjectOrder/GetOrderMaterialList`,
                method: 'get',
            }).then((res) => {
                if (res.data.code == 0) {
                    this.materialList = res.data.data;
                } else {
                    this.tipText = res.data.msg;
                    this.isTipShow = true;
                }
            });
        },
        GetOrderWorkSectionListFn(initEdit) {
            this.$axios({
                url: `/api/ProjectOrder/GetOrderWorkSectionList?FID=${this.formData.FID}`,
                method: 'get',
            }).then((res) => {
                if (res.data.code == 0) {
                    this.WorkSectionList = res.data.data
                    if ((this.title != '添加') && initEdit) {
                        this.$axios({
                            url: `/api/ProjectOrder/GetOrderDetail?orderNumber=${this.formData.OrderNumber}`,
                            method: 'post',
                        }).then((res) => {
                            if (res.data.code == 0) {
                                this.selectionList = []
                                let _WorkSectionList = res.data.data.WorkSectionList
                                this.WorkSectionList.forEach((item) => {
                                    if (_WorkSectionList.some(_ => _.WorkName == item.WorkName)) {
                                        let _obj = _WorkSectionList.find(_ => _.WorkName == item.WorkName)
                                        item.WorkSection.WorkSectionCode = _obj.WorkSection.WorkSectionCode;
                                        item.BomList = _obj.BomList;
                                        this.selectionList.push(item)
                                        this.$nextTick(() => {
                                            this.$refs.myTable.toggleRowSelection(item, true)
                                        })
                                    }
                                })
                            } else {
                                this.tipText = res.data.msg;
                                this.isTipShow = true;
                            }

                            if (this.title == '复制新增') {
                                this.formData.OrderNumber = '';
                                this.formData.StartTime = '';
                                this.formData.EndTime = '';
                            }
                        })
                    } else {
                        this.initSelect()
                    }
                    if (this.WorkSectionList.length) {
                        this.$refs.myTable.setCurrentRow(this.WorkSectionList[0]);
                    }
                } else {
                    this.tipText = res.data.msg;
                    this.isTipShow = true;
                }
            });
        },

        handleClick(str) {

            if (str == 'yes') {
                let operatorName = '';
                if (!JSON.parse(sessionStorage.getItem('userInfo1')) || (JSON.parse(sessionStorage.getItem('userInfo1')) == null)) {
                    operatorName = JSON.parse(
                        sessionStorage.getItem('sightseerInfo1')
                    ).SCMSUserName;
                } else {
                    operatorName = JSON.parse(
                        sessionStorage.getItem('userInfo1')
                    ).SCMSUserName;
                }
                this.$axios({
                    url: `/api/ProjectOrder/SaveOrder?isAdd=${(this.title == '添加' || this.title == '复制新增') ? true : false}&operatorName=${operatorName}`,
                    method: 'post',
                    data: {
                        OrderInfo: this.formData,
                        WorkSectionList: this.selectionList
                    }
                }).then((res) => {
                    if (res.data.code == 0) {
                        this.$emit('callback', `${this.title}成功！`);
                    } else {
                        this.tipText = res.data.msg;
                        this.isTipShow = true;
                    }
                });
            } else {
                this.$emit('callback');
            }

        },
    },
};
</script>

<style lang="scss" scoped>
.zdeditPop {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 100;

    .myDialog {
        position: relative;
        width: 850px;
        height: auto;
        top: 45%;
        transform: translateY(-50%);
        margin: auto;
        background: rgba(238, 238, 238);
        box-shadow: 0px 0px 21px rgba(45, 46, 46, 0.43);

        .popHeader {
            width: 100%;
            height: 60px;
            background: rgba(56, 109, 240);
            line-height: 60px;
            text-align: center;
            color: #ffffff;
            font-size: 20px;
            position: relative;

            .close {
                width: 24px;
                height: 24px;
                position: absolute;
                top: 18px;
                right: 20px;
                cursor: pointer;
            }
        }

        .popContent {
            width: 100%;
            height: auto;
            overflow-y: auto;
            padding: 20px 40px;
            padding-bottom: 0;



            .content1-line {
                display: flex;
                align-items: center;
                justify-content: space-between;

                .content {
                    display: flex;
                    width: 100%;
                    line-height: 40px;
                    margin: 10px 0;

                    .contentLable,
                    .contentLable2 {
                        width: 110px;
                        text-align: right;
                        font-size: 14px;
                        color: #363636;
                        margin-right: 10px;
                    }

                    .contentLable2 {
                        width: 120px;
                    }

                    img {
                        width: 38px;
                        height: 38px;
                        position: absolute;
                        top: 2px;
                        right: 0;
                        cursor: pointer;
                    }

                    .required::before {
                        content: '*';
                        color: #f56c6c;
                        margin-right: 4px;
                    }
                }

            }


            .flex-box {
                width: 100%;
                height: 300px;
                display: flex;

                .flex-l {
                    flex: 1;
                    height: 100%;
                    margin-right: 10px;
                }

                .flex-r {
                    flex: 1;
                    height: 100%;
                }

                .table-title {

                    height: 50px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;

                    .table-action {
                        display: flex;
                        align-items: center;
                        justify-content: flex-end;

                        .action-btn {
                            width: 80px;
                            height: 34px;
                            background: #386df0;
                            border-radius: 4px;
                            font-size: 16px;
                            color: #ffffff;
                            margin-left: 10px;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            cursor: pointer;
                        }

                        .cancel {
                            background: #999999;
                        }
                    }

                }

                .table {
                    width: 100%;
                    height: calc(100% - 50px);
                }
            }

        }

        .popBtn {
            width: 100%;
            height: 60px;
            text-align: center;
            // line-height: 60px;

            .btn {
                width: 100px;
                height: 38px;
                background: rgba(153, 153, 153);
                border-radius: 4px;
                font-size: 16px;
                color: #ffffff;
                margin-left: 20px;
                margin-top: 10px;
                border: 1px solid #999999;
            }
        }
    }


}
</style>
<style lang="scss">
.zdeditPop {
    textarea {
        resize: none !important;
    }

    .el-table tr.light-blue th {
        background-color: #dcf0f9;
        color: #fff;
    }
}
</style>