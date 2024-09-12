<template>
    <div class="zdeditPop">
        <div class="myDialog" id="myDialog">
            <div class="popHeader">
                {{ title }}
                <img :src="require('../../../assets/images/no.png')" alt="" @click="handleClick" class="close" />
            </div>

            <div class="popContent">
                <CurrentTitle title="基本信息" />
                <div class="content1-line">
                    <div class="content">
                        <div class="contentLable required">打印机位置</div>
                        <el-input type="text" v-model="formData.PrinterPosition" style="width: 265px" placeholder="请输入" />
                    </div>
                    <div class="content">
                        <div class="contentLable required">关联打印机</div>
                        <el-input type="text" v-model="formData.AssociatedPrinter" style="width: 265px" placeholder="请输入" />
                    </div>

                </div>
                <div class="content1-line">

                    <div class="content">
                        <div class="contentLable required">打印规则</div>
                        <el-select style="width: 265px" v-model="formData.PrintRuleID" placeholder="请选择">
                            <el-option label="客户编码" :value="0"></el-option>
                            <el-option label="UPC1/2" :value="1"></el-option>
                            <el-option label="MES编码" :value="2"></el-option>
                        </el-select>
                    </div>
                    <div class="content">
                        <div class="contentLable required">打印信号</div>
                        <el-input type="text" v-model="formData.PrintSignal" style="width: 265px" placeholder="请输入"
                            :disabled="false" />
                        <div class="unit" @click="handleChoose('PrintSignal')">…</div>
                    </div>
                </div>
                <div class="content1-line">

                    <div class="content">
                        <div class="contentLable required">打印结果信号</div>
                        <el-input type="text" v-model="formData.PrintResultSignal" style="width: 265px" placeholder="请输入"
                            :disabled="false" />
                        <div class="unit" @click="handleChoose('PrintResultSignal')">…</div>
                    </div>
                    <div class="content">
                        <div class="contentLable required">打印模板路径</div>
                        <el-input type="text" v-model="formData.PrintTemplatePath" style="width: 265px" placeholder="请输入" />
                    </div>
                </div>
                <CurrentTitle title="打印内容" />
                <div class="content1-line" v-if="formData.PrintRuleID == 0">
                    <div class="content">
                        <div class="contentLable required">范围</div>
                        <el-input type="text" v-model="formData.Scale" style="width: 265px" placeholder="请输入"
                            :disabled="false" />
                    </div>
                    <div class="content">
                        <div class="contentLable required">零件号</div>
                        <el-input type="text" v-model="formData.PartNumber" style="width: 265px" placeholder="请输入"
                            :disabled="false" />
                    </div>
                </div>
                <div class="content1-line" v-if="formData.PrintRuleID == 0">
                    <div class="content">
                        <div class="contentLable required">体积</div>
                        <el-input type="text" v-model="formData.Volume" style="width: 265px" placeholder="请输入"
                            :disabled="false" />
                    </div>
                    <div class="content">
                        <div class="contentLable required">工作电压</div>
                        <el-input type="text" v-model="formData.WorkingVoltage" style="width: 265px" placeholder="请输入"
                            :disabled="false" />
                    </div>
                </div>
                <div class="content1-line" v-if="formData.PrintRuleID == 0">
                    <div class="content">
                        <div class="contentLable required">供应商代码</div>
                        <el-input type="text" v-model="formData.SupplierCode" style="width: 265px" placeholder="请输入"
                            :disabled="false" />
                    </div>
                    <div class="content">
                        <div class="contentLable required">版本号</div>
                        <el-input type="text" v-model="formData.Version" style="width: 265px" placeholder="请输入"
                            :disabled="false" />
                    </div>
                </div>
                <div class="content1-line" v-if="formData.PrintRuleID == 0">
                    <div class="content">
                        <div class="contentLable required">FCB版本号</div>
                        <el-input type="text" v-model="formData.FcbVersion" style="width: 265px" placeholder="请输入"
                            :disabled="false" />
                    </div>
                    <div class="content">

                    </div>
                </div>
                <!-- /////////////////////////////////////////////////////// -->
                <div class="content1-line" v-if="formData.PrintRuleID == 1">
                    <div class="content">
                        <div class="contentLable required">产品型号</div>
                        <el-input type="text" v-model="formData.ProductType" style="width: 265px" placeholder="请输入" />
                    </div>
                    <div class="content">
                        <div class="contentLable required">物料编码</div>
                        <el-input type="text" v-model="formData.MaterialCode" style="width: 265px" placeholder="请输入" />
                    </div>

                </div>
                <div class="content1-line" v-if="formData.PrintRuleID == 1">
                    <div class="content">
                        <div class="contentLable required">版本号</div>
                        <el-input type="text" v-model="formData.Version" style="width: 265px" placeholder="请输入"
                            :disabled="false" />
                    </div>
                    <div class="content">
                        <div class="contentLable required">产品型号代码</div>
                        <el-input type="text" v-model="formData.ProductTypeCode" style="width: 265px" placeholder="请输入"
                            :disabled="false" />
                    </div>
                </div>

                <div class="content1-line" v-if="formData.PrintRuleID == 1">
                    <div class="content">
                        <div class="contentLable required">总成号</div>
                        <el-input type="text" v-model="formData.TotalNumber" style="width: 265px" placeholder="请输入"
                            :disabled="false" />
                    </div>
                    <div class="content"></div>
                </div>
                <!-- /////////////////////////////////////////////////////// -->
                <div class="content1-line" v-if="formData.PrintRuleID == 2">
                    <div class="content">
                        <div class="contentLable required">订单号</div>

                        <el-input type="text" v-model="formData.OrderNumber" style="width: 265px" placeholder="请输入"
                            :disabled="true" />
                        <div class="unit" @click="openChooseOrder()">…</div>
                     </div>
                    <div class="content">
                        <div class="contentLable required">类型</div>
                        <el-select style="width: 265px" v-model="formData.UpcType" placeholder="请选择">
                            <el-option label="箱体(C)" value="C"></el-option>
                            <el-option label="门体(D)" value="D"></el-option>
                            <el-option label="前门(F)" value="F"></el-option>
                            <el-option label="中门(M)" value="M"></el-option>
                            <el-option label="后门(T)" value="T"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="content1-line" v-if="formData.PrintRuleID == 2">
                    <div class="content">
                        <div class="contentLable required">容积</div>
                        <el-input type="text" v-model="formData.Capacity" style="width: 265px" placeholder="请输入"
                            :disabled="false" />
                    </div>
                    <div class="content">
                        <div class="contentLable required">产品款型</div>
                        <el-input type="text" v-model="formData.MesProductType" style="width: 265px" placeholder="请输入"
                            :disabled="false" />
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
        <variable-select v-if="isVariableShow" :data="chooseArr" @variableSelectCallBack="variableSelectCallBack" />
        <ChooseOrder v-if="ChooseOrderShow" :data="chooseArr" @CallBack="ChooseOrderCallBack"></ChooseOrder>
    </div>
</template>

<script>
import CurrentTitle from '../../../components/public/currentTitle.vue';
import TipPop from '../../../components/public/tipPop.vue';
import VariableSelect from '../../../components/public/variableSelect.vue';
import ChooseOrder from './ChooseOrder.vue';

export default {
    props: ['title', 'selectItem'],
    components: {
        CurrentTitle,
        TipPop,
        VariableSelect,
        ChooseOrder
    },
    data() {
        return {
            isVariableShow: false,
            chooseArr: [], // 变量类型
            chooseText: '',
            isTipShow: false,
            tipText: '',
            noCancel: true,
            formData: {
                Voucher: '',
            },
            ChooseOrderShow: false


        };
    },

    mounted() {
        if (this.title == '编辑') {
            this.formData = {
                ...this.selectItem,
                ...this.selectItem.Data,
                Data:null
            }
        }
    },
    methods: {
        // 选择变量
        handleChoose(val) {
            const obj = {
                // CarNoTagName: 'int',
                // IsReachTagName: 'bool',
                // InputTunnelTagName: 'int',
                // UpdateCompleteTagName: 'bool',
                // IsLeisureTagName: 'bool',
                // OutputTunnelTagName: 'int',
            };
            if (obj[val] == 'int') {
                this.chooseArr = [
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
            } else {
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
            }
            this.chooseText = val;
            this.isVariableShow = true;
        },
        openChooseOrder() {
            this.ChooseOrderShow = true
        },
        ChooseOrderCallBack(type, row) {
            if (type == 'yes' && row) {
                this.formData.OrderNumber = row.Data.OrderNumber
            }
            this.ChooseOrderShow = false;
            console.log(row)
        },
        // 弹窗回调
        variableSelectCallBack(str, val) {
            this.isVariableShow = false;
            if (str == 'yes') {
                this.formData[this.chooseText] = val.Name;
            }
        },
        tipCallBack(str) {
            this.isTipShow = false;
        },
        handleClick(str) {
            if (str == 'yes') {
                this.$axios({
                    url: `/api/PrinterRecords/AddOrUpdatePrintManagement`,
                    method: 'post',
                    data: this.formData
                }).then((res) => {
                    if (res.data.code == 0) {
                        this.$emit('callback', `${this.title}成功`);
                    } else {
                        this.tipText = res.data.msg;
                        this.isPopShow = true;
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

            .content1-line {
                display: flex;
                align-items: center;
                justify-content: space-between;

                .content {
                    display: flex;
                    width: 100%;
                    line-height: 40px;
                    margin: 10px 0;
                    position: relative;

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