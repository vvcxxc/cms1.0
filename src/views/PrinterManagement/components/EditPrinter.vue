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
                        <div class="contentLable required">打印机名称</div>
                        <el-input type="text" v-model="formData.Voucher"  style="width: 265px" placeholder="请输入"  />
                    </div>
                    <div class="content">
                        <div class="contentLable required">打印规则</div>
                        <el-input type="text" v-model="formData.Voucher"  style="width: 265px" placeholder="请输入" />
                    </div>

                </div>
                <div class="content1-line">
                    <div class="content">
                        <div class="contentLable required">打印信号</div>
                        <el-input type="text" v-model="formData.ActuateTagName"  style="width: 265px"  placeholder="请输入"
                            :disabled="false" />
                        <div class="unit" @click="handleChoose('ActuateTagName')">…</div>
                    </div>
                    <div class="content">
                        <div class="contentLable required">打印结果信号</div>
                        <el-input type="text" v-model="formData.ActuateTagName"  style="width: 265px"  placeholder="请输入"
                            :disabled="false" />
                        <div class="unit" @click="handleChoose('ActuateTagName')">…</div>
                    </div>
                </div>

                <div class="content1-line">
                    <div class="content">
                        <div class="contentLable required">打印模板路径</div>
                        <el-input type="text" v-model="formData.ActuateTagName"  style="width: 265px"  placeholder="请输入"
                            :disabled="false" />
                        <div class="unit" @click="handleChoose('ActuateTagName')">…</div>
                    </div>
                    <div class="content"></div>
                </div>

                <CurrentTitle title="打印内容" />



                <div class="content1-line">
                    <div class="content">
                        <div class="contentLable required">范围</div>
                        <el-input type="text" v-model="formData.ActuateTagName"  style="width: 265px"  placeholder="请输入"
                            :disabled="false" />
                    </div>
                    <div class="content">
                        <div class="contentLable required">零件号</div>
                        <el-input type="text" v-model="formData.ActuateTagName"  style="width: 265px"  placeholder="请输入"
                            :disabled="false" />
                    </div>
                </div>
                <div class="content1-line">
                    <div class="content">
                        <div class="contentLable required">体积</div>
                        <el-input type="text" v-model="formData.ActuateTagName"  style="width: 265px"  placeholder="请输入"
                            :disabled="false" />
                    </div>
                    <div class="content">
                        <div class="contentLable required">工作电压</div>
                        <el-input type="text" v-model="formData.ActuateTagName"  style="width: 265px"  placeholder="请输入"
                            :disabled="false" />
                    </div>
                </div>
                <div class="content1-line">
                    <div class="content">
                        <div class="contentLable required">供应商代码</div>
                        <el-input type="text" v-model="formData.ActuateTagName"  style="width: 265px"  placeholder="请输入"
                            :disabled="false" />
                    </div>
                    <div class="content">
                        <div class="contentLable required">版本号</div>
                        <el-input type="text" v-model="formData.ActuateTagName"  style="width: 265px"  placeholder="请输入"
                            :disabled="false" />
                    </div>
                </div>
                <div class="content1-line">
                    <div class="content">
                        <div class="contentLable required">FCB版本号</div>
                        <el-input type="text" v-model="formData.ActuateTagName"  style="width: 265px"  placeholder="请输入"
                            :disabled="false" />
                    </div>
                    <div class="content">
                        
                    </div>
                </div>
                <!-- /////////////////////////////////////////////////////// -->
                <div class="content1-line">
                    <div class="content">
                        <div class="contentLable required">产品型号</div>
                        <el-input type="text" v-model="formData.Voucher"  style="width: 265px" placeholder="请输入" />
                    </div>
                    <div class="content">
                        <div class="contentLable required">物料编码</div>
                        <el-input type="text" v-model="formData.Voucher"  style="width: 265px"  placeholder="请输入"/>
                    </div>

                </div>
                <div class="content1-line">
                    <div class="content">
                        <div class="contentLable required">版本号</div>
                        <el-input type="text" v-model="formData.ActuateTagName"  style="width: 265px"  placeholder="请输入"
                            :disabled="false" />
                    </div>
                    <div class="content">
                        <div class="contentLable required">产品型号代码</div>
                        <el-input type="text" v-model="formData.ActuateTagName"  style="width: 265px"  placeholder="请输入"
                            :disabled="false" />
                    </div>
                </div>

                <div class="content1-line">
                    <div class="content">
                        <div class="contentLable required">总成号</div>
                        <el-input type="text" v-model="formData.ActuateTagName"  style="width: 265px"  placeholder="请输入"
                            :disabled="false" />
                    </div>
                    <div class="content"></div>
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

    </div>
</template>

<script>
import CurrentTitle from '../../../components/public/currentTitle.vue';
import TipPop from '../../../components/public/tipPop.vue';
import VariableSelect from '../../../components/public/variableSelect.vue';

export default {
    props: ['title', 'selectItem'],
    components: {
        CurrentTitle,
        TipPop,
        VariableSelect,
    },
    data() {
        return {
            isVariableShow:false,
            chooseArr: [], // 变量类型
            chooseText:'',
            isTipShow: false,
            tipText: '',
            noCancel: true,
            formData: {
                Voucher: '',
            },



        };
    },

    mounted() {
        this.formData = {
            ...this.selectItem
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
            this.$emit('callback');
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