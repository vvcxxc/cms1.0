<template>
    <div class="EditWorkStepsPop">
        <div class="myDialog" id="addDialog">
            <div class="popHeader">
                {{ title }}
                <img :src="no" alt="" @click="handleClick('no')" />
            </div>

            <div class="popContent">
                <div class="content1">
                    <CurrentTitle title="工位信息" />
                    <div class="content1-line">
                        <div class="content2">
                            <div class="contentLable ">
                                <span class="require">*</span>
                                工位名称
                            </div>
                            <el-input
                                type="text"
                                v-model="data.StepName"
                                placeholder="必填"
                                style="width: calc(100% - 100px)"
                            />
                        </div>
                        <div class="content2 check-content">
                            <el-checkbox
                                label="重码检测"
                                v-model="data.IsCheckDuplicate"
                                style="margin-left:100px"
                            />
                            <el-checkbox
                                label="物料校验"
                                v-model="data.IsCheckMaterial"
                            />
                            <el-checkbox
                                label="出站条码分离"
                                v-model="data.IsFinishSeparate"
                            />
                            <el-checkbox
                                label="绝对合格，无需判断"
                                v-model="data.QualitiedType"
                            />
                        </div>
                    </div>

                    <div class="content1-line">
                        <div class="content2">
                            <div class="contentLable">
                                <span class="require">*</span>
                                产品ID
                            </div>
                            <el-input
                                type="text"
                                v-model="data.ProductIDTagName"
                                style="width: calc(100% - 100px)"
                                placeholder="必填"
                                :disabled="true"
                            />
                            <div
                                class="unit"
                                @click="handleChoose('ProductIDTagName')"
                            >
                                …
                            </div>
                        </div>
                        <div class="content2">
                            <div class="contentLable">
                                <span class="require">*</span>
                                托盘码
                            </div>
                            <el-input
                                type="text"
                                v-model="data.PalletCodeTagName"
                                style="width: calc(100% - 100px)"
                                placeholder="必填"
                                :disabled="true"
                            />
                            <div
                                class="unit"
                                @click="handleChoose('PalletCodeTagName')"
                            >
                                …
                            </div>
                        </div>
                    </div>

                    <div class="content1-line">
                        <div class="content2">
                            <div class="contentLable">
                                <span class="require">*</span>
                                进站信号
                            </div>
                            <el-input
                                type="text"
                                v-model="data.GetInTagName"
                                style="width: calc(100% - 100px)"
                                placeholder="必填"
                                :disabled="true"
                            />
                            <div
                                class="unit"
                                @click="handleChoose('GetInTagName')"
                            >
                                …
                            </div>
                        </div>
                        <div class="content2">
                            <div class="contentLable">
                                <span class="require">*</span>
                                完工信号
                            </div>
                            <el-input
                                type="text"
                                v-model="data.FinishTagName1"
                                style="width: calc(100% - 100px)"
                                placeholder="必填"
                                :disabled="true"
                            />
                            <div
                                class="unit"
                                @click="handleChoose('FinishTagName1')"
                            >
                                …
                            </div>
                        </div>
                    </div>
                    <div class="content1-line" v-show="data.QualitiedType">
                        <div class="content2">
                            <div class="contentLable">
                                <span class="require">*</span>
                                合格信号
                            </div>
                            <el-input
                                type="text"
                                v-model="data.IsQualitiedTagName"
                                style="width: calc(100% - 100px)"
                                placeholder="必填"
                                :disabled="true"
                            />
                            <div
                                class="unit"
                                @click="handleChoose('IsQualitiedTagName')"
                            >
                                …
                            </div>
                        </div>
                        <div class="content2"></div>
                    </div>
                    <div class="content1-line" v-show="data.IsCheckDuplicate">
                        <div class="content2">
                            <div class="contentLable">
                                <span class="require">*</span>
                                重码检测信号
                            </div>
                            <el-input
                                type="text"
                                v-model="data.DuplicateCodeTagName"
                                style="width: calc(100% - 100px)"
                                placeholder="必填"
                                :disabled="true"
                            />
                            <div
                                class="unit"
                                @click="handleChoose('DuplicateCodeTagName')"
                            >
                                …
                            </div>
                        </div>

                        <div class="content2">
                            <div class="contentLable">
                                <span class="require">*</span>
                                重码检测结果
                            </div>
                            <el-input
                                type="text"
                                v-model="data.DuplicateCodeResultTagName"
                                style="width: calc(100% - 100px)"
                                placeholder="必填"
                            />
                            <div
                                class="unit"
                                @click="
                                    handleChoose('DuplicateCodeResultTagName')
                                "
                            >
                                …
                            </div>
                        </div>
                    </div>
                    <div class="content1-line" v-show="data.IsCheckDuplicate">
                        <div class="content2">
                            <div class="contentLable">
                                <span class="require">*</span>
                                重码检测条码
                            </div>
                            <el-input
                                type="text"
                                v-model="data.DuplicateCodeProductIDTagName"
                                style="width: calc(100% - 100px)"
                                placeholder="必填"
                                :disabled="true"
                            />
                            <div
                                class="unit"
                                @click="
                                    handleChoose(
                                        'DuplicateCodeProductIDTagName'
                                    )
                                "
                            >
                                …
                            </div>
                        </div>
                        <div class="content2">
                            <div class="contentLable">
                                <span class="require">*</span>
                                重码条码类型
                            </div>
                            <el-select
                                v-model="data.DuplicateCodeBarCodeType"
                                style="width: calc(100% - 100px)"
                                placeholder="请选择"
                            >
                                <el-option
                                    label="产品ID"
                                    :value="0"
                                ></el-option>
                                <el-option
                                    label="托盘码"
                                    :value="1"
                                ></el-option>
                            </el-select>
                        </div>
                    </div>

                    <div class="content1-line" v-show="data.IsCheckMaterial">
                        <div class="content2">
                            <div class="contentLable">
                                <span class="require">*</span>
                                物料检测信号
                            </div>
                            <el-input
                                type="text"
                                v-model="data.MaterialTagName"
                                style="width: calc(100% - 100px)"
                                placeholder="必填"
                                :disabled="true"
                            />
                            <div
                                class="unit"
                                @click="handleChoose('MaterialTagName')"
                            >
                                …
                            </div>
                        </div>
                        <div class="content2">
                            <div class="contentLable">
                                <span class="require">*</span>
                                物料条码
                            </div>
                            <el-input
                                type="text"
                                v-model="data.MaterialProductIDTagName"
                                style="width: calc(100% - 100px)"
                                placeholder="必填"
                                :disabled="true"
                            />
                            <div
                                class="unit"
                                @click="
                                    handleChoose('MaterialProductIDTagName')
                                "
                            >
                                …
                            </div>
                        </div>
                    </div>
                    <div class="content1-line">
                        <div class="content2" v-show="data.IsCheckMaterial">
                            <div class="contentLable">
                                <span class="require">*</span>
                                物料检测结果
                            </div>
                            <el-input
                                type="text"
                                v-model="data.MaterialResultTagName"
                                style="width: calc(100% - 100px)"
                                placeholder="必填"
                                :disabled="true"
                            />
                            <div
                                class="unit"
                                @click="handleChoose('MaterialResultTagName')"
                            >
                                …
                            </div>
                        </div>
                        <div class="content2">
                            <div class="contentLable">
                                <span class="require">*</span>
                                叫料检测结果
                            </div>
                            <el-input
                                type="text"
                                v-model="data.CallMaterialResultVarName"
                                style="width: calc(100% - 100px)"
                                placeholder="必填"
                                :disabled="true"
                            />
                            <div
                                class="unit"
                                @click="
                                    handleChoose('CallMaterialResultVarName')
                                "
                            >
                                …
                            </div>
                        </div>
                    </div>

                    <CurrentTitle
                        title="出站条码分离"
                        v-show="data.IsFinishSeparate"
                    />
                    <div class="content1-line" v-show="data.IsFinishSeparate">
                        <div class="content2">
                            <div class="contentLable">
                                <span class="require">*</span>
                                出站产品ID
                            </div>
                            <el-input
                                type="text"
                                v-model="data.FinishProductIDTagName"
                                style="width: calc(100% - 100px)"
                                placeholder="必填"
                                :disabled="true"
                            />
                            <div
                                class="unit"
                                @click="handleChoose('FinishProductIDTagName')"
                            >
                                …
                            </div>
                        </div>
                        <div class="content2">
                            <div class="contentLable">
                                <span class="require">*</span>
                                出站托盘码
                            </div>
                            <el-input
                                type="text"
                                v-model="data.FinishPalletCodeTagName"
                                style="width: calc(100% - 100px)"
                                placeholder="必填"
                                :disabled="true"
                            />
                            <div
                                class="unit"
                                @click="handleChoose('FinishPalletCodeTagName')"
                            >
                                …
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="popBtn">
                <el-button class="btn" @click="handleClick('no')">
                    取消
                </el-button>
                <el-button
                    class="btn"
                    @click="handleClick('yes')"
                    style="background: rgba(56, 109, 240);border: 1px solid #386df0;"
                >
                    保存
                </el-button>
            </div>
        </div>
        <TipPop
            v-if="isPopShow"
            :tipText="tipText"
            :noCancel="noCancel"
            @tipCallBack="tipCallBack"
        />
        <variable-select
            v-if="isVariableShow"
            :multiple="multipleVariable"
            :data="chooseArr"
            @variableSelectCallBack="variableSelectCallBack"
        />
    </div>
</template>

<script>
import TipPop from '../../../components/public/tipPop.vue';
import VariableSelect from '../../../components/public/variableSelect.vue';
import CurrentTitle from '../../../components/public/currentTitle.vue';

export default {
    props: ['title', 'selectItem', 'WID'],
    components: {
        TipPop,
        VariableSelect,
        CurrentTitle
    },
    data() {
        return {
            isPopShow: false, // 是否显示弹窗
            tipText: '', // 弹窗提示语
            noCancel: true, // 弹窗是否带取消按按钮
            no: require('@/assets/images/no3.png'),
            checkList: [],
            data: {
                SID: null,
                WID: null,
                StepName: '',
                StepCode: '',
                QualitiedType: 0,
                IsCheckMaterial: 0,
                IsCheckDuplicate: 0,
                IsFinishSeparate: 0,
                ProductIDTagName: '',
                PalletCodeTagName: '',
                GetInTagName: '',
                FinishTagName1: '',
                IsQualitiedTagName: '',
                MaterialTagName: '',
                MaterialResultTagName: '',
                CallMaterialResultVarName: '',
                MaterialProductIDTagName: '',
                DuplicateCodeTagName: '',
                DuplicateCodeResultTagName: '',
                DuplicateCodeProductIDTagName: '',
                DuplicateCodeBarCodeType: 0,
                FeedingTagName: '',
                PalletBindingResultTagName: '',
                FinishProductIDTagName: '',
                FinishPalletCodeTagName: ''
            },
            isVariableShow: false, // 选择变量弹窗
            multipleVariable: false,
            chooseArr: [], // 变量类型
            chooseText: '', // 变量字段
            timerBool: true,
            isManual: false
        };
    },

    mounted() {
        this.data.WID = this.WID;
        if (this.title == '修改工位') {
            this.$axios({
                url: `/api/ProcessParameterConfigure/QueryOneWorkStep/${this.selectItem.SID}`,
                method: 'post'
            }).then(res => {
                if (res.data.code == 0) {
                    this.data = {
                        ...res.data.data,
                        IsCheckDuplicate: res.data.data.IsCheckDuplicate
                            ? true
                            : false,
                        IsCheckMaterial: res.data.data.IsCheckMaterial
                            ? true
                            : false,
                        IsFinishSeparate: res.data.data.IsFinishSeparate
                            ? true
                            : false,
                        QualitiedType: res.data.data.QualitiedType
                            ? true
                            : false
                    };
                } else {
                    this.tipText = res.data.msg;
                    this.isPopShow = true;
                }
            });
        }

        this.$axios({
            url: `/api/ProcessParameterConfigure/QueryOneWorkSection/${this.WID}`,
            method: 'post'
        }).then(res => {
            if (res.data.code == 0) {
                console.log(res);
                this.isManual = res.data.data.OperatingMode == 1 ? true : false;
            } else {
                this.tipText = res.data.msg;
                this.isPopShow = true;
            }
        });
    },

    methods: {
        // 选择变量
        handleChoose(val) {
            const obj = {
                // CarNoTagName: 'int',
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
                this.chooseArr = [
                    '不限',
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
            this.multipleVariable = false;
            this.isVariableShow = true;
        },
        // 弹窗回调
        variableSelectCallBack(str, val) {
            this.isVariableShow = false;
            if (str == 'yes') {
                this.data[this.chooseText] = val.Name;
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
                this.isPopShow = false;
            } else {
                this.isPopShow = false;
            }
        },

        handleClick(str) {
            if (str == 'yes') {
                if (!this.timerBool) {
                    return;
                }
                let _name = '';
                if (
                    !JSON.parse(sessionStorage.getItem('userInfo1')) ||
                    JSON.parse(sessionStorage.getItem('userInfo1')) == null
                ) {
                    _name = JSON.parse(sessionStorage.getItem('sightseerInfo1'))
                        .SCMSUserName;
                } else {
                    _name = JSON.parse(sessionStorage.getItem('userInfo1'))
                        .SCMSUserName;
                }
                this.timerBool = false;
                setTimeout(() => (this.timerBool = true), 2000);
                this.$axios({
                    url: `/api/ProcessParameterConfigure/AddWorkStep?LoginName=${_name}`,
                    method: 'post',
                    data: {
                        ...this.data,
                        IsCheckDuplicate: this.data.IsCheckDuplicate ? 1 : 0,
                        IsCheckMaterial: this.data.IsCheckMaterial ? 1 : 0,
                        QualitiedType: this.data.QualitiedType ? 1 : 0,
                        IsFinishSeparate: this.data.IsFinishSeparate ? 1 : 0
                    }
                }).then(res => {
                    if (res.data.code == 0) {
                        if (this.title == '添加工位') {
                            this.$emit('callback', str, '添加成功！');
                        } else {
                            this.$emit('callback', str, '修改成功！');
                        }
                    } else {
                        this.tipText = res.data.msg;
                        this.isPopShow = true;
                    }
                });
            } else {
                this.$emit('callback', str);
            }
        }
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
        width: 1400px;
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
            max-height: 550px;
            overflow-y: auto;
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

                    .mult {
                        background: #ea9328;
                    }

                    .cancel {
                        background: #999999;
                    }
                }
            }

            .content1 {
                width: 100%;
                height: auto;
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
                        color: #d9001b;
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
