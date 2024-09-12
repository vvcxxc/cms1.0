<template>
    <div class="EditWorkStepsPop">
        <div class="myDialog" id="addDialog">
            <div class="popHeader">
                漏工序检测配置
                <img :src="no" alt="" @click="handleClick('no')" />
            </div>

            <div class="popContent">
                <div class="content1">

                    <div class="content1-line">
                        <div class="content2">
                            <div class="contentLable "><span class="require">*</span>
                                配方名称
                            </div>
                            <el-select v-model="FID" placeholder="必选" style="width: calc(100% - 100px)" @change="getConfig">
                                <el-option v-for="item in formualList" :label="item.Name" :value="item.FID"></el-option>
                            </el-select>
                        </div>
                        <div class="content2">
                            <div class="contentLable ">
                                当前工位
                            </div>
                            {{ data.CurrentWorkstation }}
                        </div>

                    </div>
                    <div class="content1-line">
                        <div class="content2">
                            <div class="contentLable"><span class="require">*</span>
                                触发信号
                            </div>
                            <el-input type="text" v-model="data.TriggerTagName" style="width: calc(100% - 100px)"
                                placeholder="必填" :disabled="true" />
                            <div class="unit" @click="handleChoose('TriggerTagName')">…</div>
                        </div>
                        <div class="content2">
                            <div class="contentLable"><span class="require">*</span>
                                下发地址
                            </div>
                            <el-input type="text" v-model="data.PassTagName" style="width: calc(100% - 100px)"
                                placeholder="必填" :disabled="true" />
                            <div class="unit" @click="handleChoose('PassTagName')">…</div>
                        </div>



                    </div>
                    <div class="content1-line">

                        <div class="content2">
                            <div class="contentLable"><span class="require">*</span>
                                判断方式
                            </div>
                            <el-select v-model="data.TriggerType" placeholder="必选" style="width: calc(100% - 100px)">
                                <el-option label="默认" :value="0"></el-option>
                                <el-option label="自定义" :value="1"></el-option>
                            </el-select>
                        </div>
                        <div class="content2">
                            <div class="contentLable" v-show="data.TriggerType == 1"><span class="require">*</span>
                                判断值
                            </div>
                            <el-input v-show="data.TriggerType == 1" type="text" v-model="data.TriggerValue"
                                style="width: calc(100% - 100px)" placeholder="必填" :disabled="false" />
                        </div>

                    </div>
                    <div class="flex-box">
                        <div class="flex-l">
                            <div class="table-title">
                                <CurrentTitle title="检测条码" />
                                <div class="table-action">
                                    <div class="action-btn" @click="handleChoose3">添加</div>
                                    <div class="action-btn cancel" @click="delCode">删除</div>
                                </div>
                            </div>
                            <div class="content1">
                                <el-table ref="myTable" highlight-current-row :cell-style="{ borderColor: '#E4E7ED' }"
                                    :header-cell-style="{ 'text-align': 'center', background: '#5a6c98', color: '#fff' }"
                                    :data="data.Items" border height="100%" @select="selectFn1" @select-all="selectFn1"
                                    @row-click="tableRowClick">
                                    <template slot="empty">
                                        <span>暂无数据</span>
                                    </template>
                                    <el-table-column type="selection" width="60px" align='center'></el-table-column>
                                    <el-table-column prop="ProductIDTagName" label="检测条码" align='center'
                                        :show-overflow-tooltip="true"></el-table-column>
                                    <el-table-column width="100px" align='center'>
                                        <template slot-scope="scope">
                                            <div class="unit2" @click="handleChoose2(scope.row)">…</div>
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </div>
                        </div>
                        <div class="flex-r">
                            <div class="table-title">
                                <CurrentTitle title="检测工序" />
                                <div class="table-action">
                                    <div class="action-btn" @click="addProcess">添加</div>
                                    <div class="action-btn cancel" @click="delProcess">删除</div>
                                </div>
                            </div>

                            <div class="content1">
                                <el-table highlight-current-row :cell-style="{ borderColor: '#E4E7ED' }"
                                    :header-cell-style="{ 'text-align': 'center', background: '#5a6c98', color: '#fff' }"
                                    :data="rightList" border height="100%" @select="selectFn2" @select-all="selectFn2">
                                    <template slot="empty">
                                        <span>暂无数据</span>
                                    </template>
                                    <el-table-column type="selection" width="60px" align='center'></el-table-column>
                                    <el-table-column prop="WorkCode" label="工序编号" align='center'
                                        :show-overflow-tooltip="true"></el-table-column>
                                    <el-table-column prop="WorkStepName" label="工序名称" align='center'
                                        :show-overflow-tooltip="true"></el-table-column>
                                    <el-table-column width="100px">
                                        <template slot-scope="scope">
                                            <div class="unit2" @click="openChooseProcess(scope.row)">…</div>
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </div>
                        </div>
                    </div>




                </div>
            </div>
            <div class="popBtn">
                <el-button class="btn" @click="clearList" style="background: #FFA724;">
                    清空配置
                </el-button>
                <el-button class="btn" @click="handleClick('no')">
                    取消
                </el-button>
                <el-button class="btn" @click="handleClick('yes')" style="background: rgba(56, 109, 240);">
                    保存
                </el-button>
            </div>
        </div>
        <TipPop v-if="isPopShow" :tipText="tipText" :noCancel="noCancel" @tipCallBack="tipCallBack" />
        <variable-select v-if="isVariableShow" :data="chooseArr" @variableSelectCallBack="variableSelectCallBack" />
        <ChooseProcess v-if="ChooseProcessShow" @callback="ChooseProcessCallback" :selectItem="chooseProcess" :FID="FID" :WID="data.WID" />
    </div>
</template>

<script>
import TipPop from '../../../components/public/tipPop.vue';
import VariableSelect from '../../../components/public/variableSelect.vue';
import CurrentTitle from '../../../components/public/currentTitle.vue';
import ChooseProcess from './ChooseProcess.vue';
export default {
    props: ['SID'],
    components: {
        TipPop,
        VariableSelect,
        CurrentTitle,
        ChooseProcess
    },
    data() {
        return {
            isPopShow: false, // 是否显示弹窗
            tipText: '', // 弹窗提示语
            noCancel: true, // 弹窗是否带取消按按钮
            delType: 0,
            no: require('@/assets/images/no3.png'),
            data: {
                Id: 0,
                WID:0,
                FormulaId: "",
                SID: 0,
                TriggerTagName: "",
                TriggerType: 0,
                TriggerValue: "",
                PassTagName: "",
                UnPassTagName: "",
                RecordTime: "",
                Items: []
            },
            curLeft: {},
            FID: '',
            isVariableShow: false, // 选择变量弹窗
            chooseArr: [], // 变量类型
            chooseText: '', // 变量字段
            ChooseProcessShow: false,
            formualList: [],
            selectList1: [],
            selectList2: [],
            chooseItem: {},
            chooseType: 0,
            chooseProcess: {},
            chooseProcessType: 0,
        };
    },
    computed: {
        rightList() {
            if (!this.data || !this.data.Items || !this.data.Items.length || !this.curLeft || !this.curLeft.misProcessWorkSections || !this.curLeft.misProcessWorkSections.length) {
                return []
            }
            return this.curLeft.misProcessWorkSections
        }
    },
    mounted() {
        this.$axios({
            method: 'post',
            url: `api/FormulaManage/QueryFormulas`,
        })
            .then(res => {
                if (res.data.code == 0) {
                    this.formualList = res.data.data;
                    if (this.formualList.length) {
                        this.FID = this.formualList[0].FID;
                        this.getConfig();
                    }
                } else {
                    this.isTipShow = true;
                    this.tipText = res.data.msg;
                }
            })
    },

    methods: {
        getConfig() {
            this.$axios({
                url: `/api/ProcessParameterConfigure/QueryMissedProcessesConfig?SID=${this.SID}&FID=${this.FID}`,
                method: 'post',
            }).then((res) => {
                if (res.data.code == 0) {
                    this.data = res.data.data
                    if (this.data.Items || this.data.Items.length) {
                        this.curLeft = this.data.Items[0]
                        this.$refs.myTable.setCurrentRow(this.curLeft);
                    }
                } else {
                    this.tipText = res.data.msg;
                    this.isPopShow = true;
                }
            });
        },
        clearList() {
            this.data.Items = []
        },
        tableRowClick(row) {
            this.curLeft = row;
        },
        openChooseProcess(row) {
            this.chooseProcess = row;
            this.chooseProcessType = 1;
            this.ChooseProcessShow = true
        },
        addProcess() {
            console.log(this.curLeft,'121')
            if (!this.curLeft || !this.curLeft.misProcessWorkSections) {
                this.tipText = '请选择检测条码！';
                this.isPopShow = true;
                return
            }
            this.chooseProcess = {};
            this.chooseProcessType = 2;
            this.ChooseProcessShow = true
        },
        ChooseProcessCallback(str, arr) {
            if (str == 'yes') {
                if (this.chooseProcessType == 1) {
                    this.chooseProcess.WorkCode = arr.map(_ => _.WorkCode).join(',')
                    this.chooseProcess.WorkStepName = arr.map(_ => _.WorkName).join(',')
                } else {
                    this.curLeft.misProcessWorkSections.push({
                        WorkCode: arr.map(_ => _.WorkCode).join(','),
                        WorkStepName: arr.map(_ => _.WorkName).join(',')
                    })
                }
            }
            this.ChooseProcessShow = false
            this.chooseProcessType = 0;
        },
        // 选择变量
        handleChoose(val) {
            this.chooseArr = ['不限',
                '二进制变量',
                '字符串',
                '有符号8位整型',
                '无符号8位整型',
                '有符号16位整型',
                '无符号16位整型',
                '有符号32位整型',
                '无符号32位整型',
                '有符号64位整型',
                '无符号64位整型',
                '日期时间'
            ];
            this.chooseType = 1;
            this.chooseText = val;
            this.isVariableShow = true;
        },
        handleChoose2(item) {
            this.chooseArr = ['不限',
                '二进制变量',
                '字符串',
                '有符号8位整型',
                '无符号8位整型',
                '有符号16位整型',
                '无符号16位整型',
                '有符号32位整型',
                '无符号32位整型',
                '有符号64位整型',
                '无符号64位整型',
                '日期时间'
            ];
            this.chooseType = 2;
            this.chooseItem = item;
            this.isVariableShow = true;
        },
        handleChoose3() {
            this.chooseArr = ['不限',
                '二进制变量',
                '字符串',
                '有符号8位整型',
                '无符号8位整型',
                '有符号16位整型',
                '无符号16位整型',
                '有符号32位整型',
                '无符号32位整型',
                '有符号64位整型',
                '无符号64位整型',
                '日期时间'
            ];
            this.chooseType = 3;
            this.chooseItem = {};
            this.isVariableShow = true;
        },

        // 弹窗回调
        variableSelectCallBack(str, val) {
            this.isVariableShow = false;
            if (str == 'yes') {
                if (this.chooseType == 1) {
                    this.data[this.chooseText] = val.Name;
                } else if (this.chooseType == 2) {
                    if (this.chooseItem.ProductIDTagName != val.Name) {
                        if (this.data.Items.some(_ => _.ProductIDTagName == val.Name)) {
                            this.tipText = '检测条码不能一致！';
                            this.isPopShow = true;
                        } else {
                            this.chooseItem.ProductIDTagName = val.Name;
                        }
                    }
                } else if (this.chooseType == 3) {
                    if (this.data.Items.some(_ => _.ProductIDTagName == val.Name)) {
                        this.tipText = '检测条码不能一致！';
                        this.isPopShow = true;
                    } else {
                        this.data.Items.push({
                            ProductIDTagName: val.Name,
                            misProcessWorkSections: []
                        })
                    }
                }
                if (!this.curLeft) {
                    this.curLeft = this.data.Items[0]
                }
                this.chooseType = 0;
            }
        },

        getNowTime() {
            let date = new Date();
            let y = date.getFullYear();
            let MM = date.getMonth() + 1;
            MM = MM < 10 ? '0' + MM : MM;
            let d = date.getDate();
            d = d < 10 ? '0' + d : d;
            let h = date.getHours();
            h = h < 10 ? '0' + h : h;
            let m = date.getMinutes();
            m = m < 10 ? '0' + m : m;
            let s = date.getSeconds();
            s = s < 10 ? '0' + s : s;
            return y + '-' + MM + '-' + d;
        },
        tipCallBack(str) {
            if (str == 'yes') {
                if (this.delType == 1) {
                    this.data.Items = this.data.Items.filter(_ => !this.selectList1.some(_2 => _2.ProductIDTagName == _.ProductIDTagName))
                } else if (this.delType == 2) {
                    this.curLeft.misProcessWorkSections = this.curLeft.misProcessWorkSections.filter(_ => !this.selectList2.some(_2 => _2.WorkCode == _.WorkCode))

                }
            } this.delType = 0;
            this.isPopShow = false;
            this.noCancel = true;
        },
        handleClick(str) {
            if (str == 'yes') {
                this.$axios({
                    url: `/api/ProcessParameterConfigure/SaveMissedProcesses`,
                    method: 'post',
                    data: {
                        ...this.data,
                        FormulaId: this.FID,
                        SID: this.SID,
                        ItemsList: this.data.Items.map(_ => ({
                            ProductIDTagName: _.ProductIDTagName,
                            WorkStepList: _.misProcessWorkSections || []
                        }))
                    }
                }).then((res) => {
                    if (res.data.code == 0) {
                        this.$emit('callback', '保存成功！');
                    } else {
                        this.tipText = res.data.msg;
                        this.isPopShow = true;
                    }
                });

            } else {
                this.$emit('callback');
            }
        },
        selectFn1(arr) {
            this.selectList1 = arr
        },
        selectFn2(arr) {
            this.selectList2 = arr
        },
        delCode() {
            if (!this.selectList1.length) {
                this.tipText = `请选中条码！`;
                this.isPopShow = true;
                return;
            }
            this.tipText = `是否确认删除选中条码？`;
            this.isPopShow = true;
            this.delType = 1;
            this.noCancel = false;
        },
        delProcess() {
            if (!this.selectList2.length) {
                this.tipText = `请选中工序！`;
                this.isPopShow = true;
                return;
            }
            this.tipText = `是否确认删除选中工序？`;
            this.isPopShow = true;
            this.delType = 2;
            this.noCancel = false;
        },
    }
};
</script>

<style lang="scss" scoped>
.EditWorkStepsPop {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 101;

    .myDialog {
        position: relative;
        width: 1000px;
        height: auto;
        top: 50%;
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

            img {
                width: 60px;
                height: 60px;
                position: absolute;
                top: 0px;
                right: 0px;
                cursor: pointer;
            }
        }

        .popContent {
            width: 100%;
            height: calc(100% - 120px);
            padding: 20px 30px;
            padding-bottom: 0;

            .unit {
                width: 36px;
                height: 24px;
                border-radius: 4px;
                position: absolute;
                right: 5px;
                top: 50%;
                transform: translate(0, -50%);
                display: flex;
                align-items: center;
                justify-content: center;
                color: #386df0;
                background: #e4eafb;
                cursor: pointer;
            }

            .unit2 {
                width: 36px;
                height: 24px;
                border-radius: 4px;
                display: flex;
                align-items: center;
                justify-content: center;
                color: #386df0;
                background: #e4eafb;
                cursor: pointer;
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

            .content1 {
                width: 100%;
                height: calc(100% - 50px);
                margin-bottom: 30px;

                .content1-line {
                    display: flex;
                    align-items: flex-start;
                    justify-content: space-between;
                    margin-bottom: 16px;

                    .content {
                        width: fit-content;
                        position: relative;


                    }
                }

                .flex-box {
                    width: 100%;
                    height: 300px;
                    display: flex;

                    .flex-l {
                        flex: 2;
                        height: 100%;
                        margin-right: 10px;
                    }

                    .flex-r {
                        flex: 3;
                        height: 100%;
                    }
                }
            }

            .content,
            .content2 {
                display: flex;
                width: 100%;
                line-height: 40px;
                align-items: center;
                position: relative;

                .contentLable {
                    width: 100px;
                    text-align: right;
                    font-size: 14px;
                    color: #363636;
                    margin-right: 10px;

                    .require {
                        color: #D9001B;
                    }
                }



                img {
                    width: 38px;
                    height: 38px;
                    position: absolute;
                    top: 2px;
                    right: 0;
                    cursor: pointer;
                }

                .textarea-box {
                    width: calc(100% - 100px);
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
                border: 1px solid #999999;
            }
        }
    }

}
</style>
<style lang="scss">
.EditWorkStepsPop .el-input.is-disabled .el-input__inner {
    color: #606266;
}

// .virtual-cell-time-picker {
//     .el-time-spinner__wrapper {
//         width: 50% !important;
//     }

//     .el-scrollbar:nth-of-type(3) {
//         display: none !important;
//     }
// }
</style>
