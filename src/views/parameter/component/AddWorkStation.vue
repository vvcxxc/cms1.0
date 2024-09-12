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
                                label="并行多工位"
                                v-model="data.IsParallelMultiStation"
                                v-if="!isManual"
                            />
                            <el-checkbox
                                label="托盘码写入"
                                v-model="data.IsWritePalletCode"
                                v-if="isManual"
                            />
                            <el-checkbox
                                label="重码检测"
                                v-model="data.IsCheckDuplicate"
                            />
                            <el-checkbox
                                label="物料校验"
                                v-model="data.IsCheckMaterial"
                            />
                            <el-checkbox
                                label="制冷系统对接"
                                v-model="data.IsRefrigerationSystem"
                                v-if="!isManual"
                            />
                            <el-checkbox
                                label="RFID读取产品ID"
                                v-model="data.IsRFIDRead"
                                v-if="isManual"
                            />
                        </div>
                    </div>

                    <div class="content1-line" v-show="data.IsRFIDRead">
                        <div class="content2">
                            <div class="contentLable">
                                <span class="require">*</span>
                                RFID读取信号
                            </div>
                            <el-input
                                type="text"
                                v-model="data.RFIDReadTagName"
                                style="width: calc(100% - 100px)"
                                placeholder="必填"
                                :disabled="true"
                            />
                            <div
                                class="unit"
                                @click="handleChoose('RFIDReadTagName')"
                            >
                                …
                            </div>
                        </div>
                        <div class="content2">
                            <div class="contentLable">
                                <span class="require">*</span>
                                RFID变量
                            </div>
                            <el-input
                                type="text"
                                v-model="data.RFIDTagName"
                                style="width: calc(100% - 100px)"
                                placeholder="必填"
                                :disabled="true"
                            />
                            <div
                                class="unit"
                                @click="handleChoose('RFIDTagName')"
                            >
                                …
                            </div>
                        </div>
                    </div>

                    <div class="content1-line">
                        <div class="content2">
                            <div class="contentLable">
                                <span class="require">*</span>
                                进站产品ID
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
                    </div>
                    <div class="content1-line">
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
                    </div>
                    <div
                        class="content1-line"
                        v-show="data.IsParallelMultiStation || isManual"
                    >
                        <div
                            class="content2"
                            v-show="data.IsParallelMultiStation"
                        >
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

                        <div class="content2" v-show="isManual">
                            <div class="contentLable">
                                <span class="require">*</span>
                                工位IP
                            </div>
                            <el-input
                                type="text"
                                v-model="data.ClientIp"
                                style="width: calc(100% - 100px)"
                                placeholder="必填"
                            />
                        </div>
                        <div
                            class="content2"
                            v-if="!data.IsParallelMultiStation || !isManual"
                        ></div>
                    </div>
                    <div class="content1-line" v-show="data.IsWritePalletCode">
                        <div class="content2">
                            <div class="contentLable">
                                <span class="require">*</span>
                                托盘码变量
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
                        <div class="content2">
                            <div class="contentLable">
                                <span class="require">*</span>
                                托盘码下发信号
                            </div>
                            <el-input
                                type="text"
                                v-model="data.PalletResultTagName"
                                style="width: calc(100% - 100px)"
                                placeholder="必填"
                                :disabled="true"
                            />
                            <div
                                class="unit"
                                @click="handleChoose('PalletResultTagName')"
                            >
                                …
                            </div>
                        </div>
                    </div>

                    <CurrentTitle
                        title="重码校验"
                        v-show="data.IsCheckDuplicate"
                    />
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
                    </div>
                    <div class="content1-line" v-show="data.IsCheckDuplicate">
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
                                :disabled="true"
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
                        <div class="content2"></div>
                    </div>

                    <CurrentTitle
                        title="物料校验"
                        v-show="data.IsCheckMaterial"
                    />
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
                                物料码变量
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
                    <div class="content1-line" v-show="data.IsCheckMaterial">
                        <div class="content2">
                            <div class="contentLable">
                                <span class="require">*</span>
                                扫码顺序变量
                            </div>
                            <el-input
                                type="text"
                                v-model="data.MaterialScanSequenceTagName"
                                style="width: calc(100% - 100px)"
                                placeholder="必填"
                                :disabled="true"
                            />
                            <div
                                class="unit"
                                @click="
                                    handleChoose('MaterialScanSequenceTagName')
                                "
                            >
                                …
                            </div>
                        </div>
                        <div class="content2">
                            <div class="contentLable">
                                <span class="require">*</span>
                                物料校验结果
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
                    </div>

                    <CurrentTitle title="配方切换" />
                    <div class="content1-line">
                        <div class="content2">
                            <div class="contentLable">
                                <span class="require">*</span>
                                配方切换信号
                            </div>
                            <el-input
                                type="text"
                                v-model="data.FormulaRecipeSwitchingSignal"
                                style="width: calc(100% - 100px)"
                                placeholder="必填"
                                :disabled="true"
                            />
                            <div
                                class="unit"
                                @click="
                                    handleChoose('FormulaRecipeSwitchingSignal')
                                "
                            >
                                …
                            </div>
                        </div>
                        <div class="content2">
                            <div class="contentLable">
                                <span class="require">*</span>
                                产品型号代码变量
                            </div>
                            <el-input
                                type="text"
                                v-model="data.FormulaProductModelCodeTag"
                                style="width: calc(100% - 100px)"
                                placeholder="必填"
                                :disabled="true"
                            />
                            <div
                                class="unit"
                                @click="
                                    handleChoose('FormulaProductModelCodeTag')
                                "
                            >
                                …
                            </div>
                        </div>
                    </div>
                    <div class="content1-line" v-show="isManual">
                        <div class="content2">
                            <div class="contentLable">
                                <span class="require">*</span>
                                型号代码起始位
                            </div>
                            <el-input
                                type="number"
                                v-model="data.ModelCodeStartingPosition"
                                style="width: calc(100% - 100px)"
                                placeholder="必填"
                            />
                        </div>
                        <div class="content2">
                            <div class="contentLable">
                                <span class="require">*</span>
                                型号代码长度
                            </div>
                            <el-input
                                type="number"
                                v-model="data.ModelCodeLength"
                                style="width: calc(100% - 100px)"
                                placeholder="必填"
                            />
                        </div>
                    </div>

                    <div class="content1-line">
                        <div class="content2">
                            <div class="contentLable">
                                <span class="require">*</span>
                                匹配对象
                            </div>
                            <el-select
                                v-model="data.MatchObject"
                                style="width: calc(100% - 100px)"
                                placeholder="请选择"
                            >
                                <el-option
                                    label="总产品型号代码"
                                    :value="1"
                                ></el-option>
                                <el-option
                                    label="冷凝器总成产品型号代码"
                                    :value="2"
                                ></el-option>
                                <el-option
                                    label="压缩机总成产品型号代码"
                                    :value="3"
                                ></el-option>
                            </el-select>
                        </div>
                        <div class="content2"></div>
                    </div>

                    <!-- <div class="table-title">
                        <CurrentTitle title="不合格原因信息" />
                        <div class="table-action">
                            <div class="action-btn mult" @click="handleMultChoose">批量关联</div>
                            <div class="action-btn">添加</div>
                            <div class="action-btn cancel">删除</div>
                        </div>
                    </div>
                    <div class="content1">
                        <el-table highlight-current-row :cell-style="{ borderColor: '#E4E7ED' }"
                            :header-cell-style="{ background: '#5a6c98', color: '#fff' }" :data="[1, 2]" border
                            height="180px" @select="selectFn1" @select-all="selectFn1">
                            <template slot="empty">
                                <span>暂无数据</span>
                            </template>
                            <el-table-column type="selection" width="60px"></el-table-column>
                            <el-table-column prop="Device" label="原因描述" :show-overflow-tooltip="true"></el-table-column>
                            <el-table-column prop="Device" label="关联变量" :show-overflow-tooltip="true"></el-table-column>
                            <el-table-column prop="Address" label="判断值" width="220px">
                                <template slot-scope="scope">
                                    <div class="unit" @click="handleChoose('ActuateTagName')">…</div>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div> -->
                </div>
            </div>
            <div class="popBtn">
                <el-button class="btn" @click="handleClick('no')">
                    取消
                </el-button>
                <el-button
                    class="btn"
                    @click="handleClick('yes2')"
                    v-if="title == '添加工位'"
                    style="background: #fff;color:#386df0;width:160px;border: 1px solid #386df0;"
                >
                    保存并创建下一个
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
                WID: 0,
                SID: '',
                StepName: '',
                IsAuto: false,
                ProductIDTagName: '',
                IsRelated: false,
                FinishTag1: '',
                FinishTag2: '',
                IsAbsolute: false,
                AbsoQualTag: 0,
                IsQualitiedTagName: '',
                GetInTagName: '',
                IsWritePalletCode: false,
                PalletCodeTagName: '',
                PalletResultTagName: '',
                IsParallelMultiStation: false,
                FinishProductIDTagName: '',
                IsRFIDRead: false,
                RFIDReadTagName: '',
                RFIDTagName: '',
                ClientIp: '',
                IsCheckDuplicate: false,
                DuplicateCodeTagName: '',
                DuplicateCodeResultTagName: '',
                DuplicateCodeProductIDTagName: '',
                IsCheckMaterial: false,
                MaterialTagName: '',
                MaterialProductIDTagName: '',
                MaterialResultTagName: '',
                MaterialScanSequenceTagName: '',
                FormulaRecipeSwitchingSignal: '',
                FormulaProductModelCodeTag: '',
                ModelCodeStartingPosition: null,
                ModelCodeLength: null,
                MatchObject: 0,
                IsRefrigerationSystem: false
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
                        IsWritePalletCode: res.data.data.IsWritePalletCode
                            ? true
                            : false,
                        IsCheckDuplicate: res.data.data.IsCheckDuplicate
                            ? true
                            : false,
                        IsCheckMaterial: res.data.data.IsCheckMaterial
                            ? true
                            : false,
                        IsRFIDRead: res.data.data.IsRFIDRead ? true : false,
                        IsParallelMultiStation: res.data.data
                            .IsParallelMultiStation
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
        handleMultChoose(val) {
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
            this.multipleVariable = true;
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
        goOnNext() {},
        handleClick(str) {
            if (str == 'yes' || str == 'yes2') {
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
                        IsWritePalletCode: this.data.IsWritePalletCode ? 1 : 0,
                        IsCheckDuplicate: this.data.IsCheckDuplicate ? 1 : 0,
                        IsCheckMaterial: this.data.IsCheckMaterial ? 1 : 0,
                        IsRFIDRead: this.data.IsRFIDRead ? 1 : 0,
                        IsParallelMultiStation: this.data.IsParallelMultiStation
                            ? 1
                            : 0
                    }
                }).then(res => {
                    if (res.data.code == 0) {
                        if (this.title == '添加工位') {
                            if (str == 'yes2') {
                                this.data = {
                                    WID: this.WID,
                                    SID: '',
                                    StepName: '',
                                    IsAuto: false,
                                    ProductIDTagName: '',
                                    IsRelated: false,
                                    FinishTag1: '',
                                    FinishTag2: '',
                                    IsAbsolute: false,
                                    AbsoQualTag: 0,
                                    IsQualitiedTagName: '',
                                    GetInTagName: '',
                                    IsWritePalletCode: false,
                                    PalletCodeTagName: '',
                                    PalletResultTagName: '',
                                    IsParallelMultiStation: false,
                                    FinishProductIDTagName: '',
                                    IsRFIDRead: false,
                                    RFIDReadTagName: '',
                                    RFIDTagName: '',
                                    ClientIp: '',
                                    IsCheckDuplicate: false,
                                    DuplicateCodeTagName: '',
                                    DuplicateCodeResultTagName: '',
                                    DuplicateCodeProductIDTagName: '',
                                    IsCheckMaterial: false,
                                    MaterialTagName: '',
                                    MaterialProductIDTagName: '',
                                    MaterialResultTagName: '',
                                    MaterialScanSequenceTagName: ''
                                };
                            } else {
                                this.$emit('callback', str, '添加成功！');
                            }
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
        width: 1300px;
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
                    width: 135px;
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

            .check-content {
                justify-content: flex-end;
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
