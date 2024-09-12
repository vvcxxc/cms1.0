<template>
    <div class="EditWorkStepsPop">
        <div class="myDialog" id="addDialog">
            <div class="popHeader">
                {{ title }}
                <img :src="no" alt="" @click="handleClick('no')" />
            </div>

            <div class="popContent">
                <CurrentTitle title="工位信息" />
                <div class="content1">
                    <div class="content2">
                        <div class="contentLable ">
                            <span class="require">*</span>
                            工位名称
                        </div>
                        <el-input
                            type="text"
                            v-model="data.StepName"
                            placeholder="必填"
                            style="width: calc(100% - 160px)"
                        />
                    </div>
                    <div class="content2 check-content">
                        <el-checkbox
                            label="重码检测"
                            v-model="data.IsCheckDuplicate"
                        />
                        <el-checkbox
                            label="物料检测"
                            v-model="data.IsCheckMaterial"
                        />
                        <el-checkbox
                            label="激光打码"
                            v-model="data.IsLaserMarking"
                        />
                        <el-checkbox label="焊接标记" v-model="data.IsWeld" />
                        <el-checkbox
                            label="进出站分离"
                            v-model="data.IsSeparationInOut"
                        />
                        <el-checkbox
                            label="画像检查"
                            v-model="data.IsImageCheck"
                        />
                        <el-checkbox label="下线查询" v-model="data.IsOffine" />
                    </div>
                    <div class="content2">
                        <div class="contentLable">
                            <span class="require">*</span>
                            产品ID
                        </div>
                        <el-input
                            type="text"
                            v-model="data.ProductIDTagName"
                            style="width: calc(100% - 160px)"
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
                            完工信号
                        </div>
                        <el-input
                            type="text"
                            v-model="data.FinishTagName1"
                            style="width: calc(100% - 160px)"
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
                            进站信号
                        </div>
                        <el-input
                            type="text"
                            v-model="data.GetInTagName"
                            style="width: calc(100% - 160px)"
                            placeholder="必填"
                            :disabled="true"
                        />
                        <div class="unit" @click="handleChoose('GetInTagName')">
                            …
                        </div>
                    </div>
                    <div class="content1-line" v-show="data.IsSeparationInOut">
                        <div class="content2">
                            <div class="contentLable">
                                <span class="require">*</span>
                                出站产品ID
                            </div>
                            <el-input
                                type="text"
                                v-model="data.OutProductIDTagName"
                                style="width: calc(100% - 160px)"
                                placeholder="必填"
                                :disabled="true"
                            />
                            <div
                                class="unit"
                                @click="handleChoose('OutProductIDTagName')"
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
                                style="width: calc(100% - 160px)"
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
                    <div class="content2">
                        <div class="contentLable">
                            <span class="require">*</span>
                            最近加工信号
                        </div>
                        <el-input
                            type="text"
                            v-model="data.IsMachiningTagName"
                            style="width: calc(100% - 160px)"
                            placeholder="必填"
                            :disabled="true"
                        />
                        <div
                            class="unit"
                            @click="handleChoose('IsMachiningTagName')"
                        >
                            …
                        </div>
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
                                style="width: calc(100% - 160px)"
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
                                style="width: calc(100% - 160px)"
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
                    <div
                        class="content1-line"
                        v-show="data.IsCheckDuplicate || data.IsCheckMaterial"
                    >
                        <div class="content2" v-show="data.IsCheckDuplicate">
                            <div class="contentLable">
                                <span class="require">*</span>
                                重码检测结果
                            </div>
                            <el-input
                                type="text"
                                v-model="data.DuplicateCodeResultTagName"
                                style="width: calc(100% - 160px)"
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
                        <div class="content2" v-show="data.IsCheckMaterial">
                            <div class="contentLable">
                                <span class="require">*</span>
                                物料检测信号
                            </div>
                            <el-input
                                type="text"
                                v-model="data.MaterialTagName"
                                style="width: calc(100% - 160px)"
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
                        <div
                            class="content2"
                            v-show="
                                !data.IsCheckDuplicate || !data.IsCheckMaterial
                            "
                        ></div>
                    </div>
                    <div class="content1-line" v-show="data.IsCheckMaterial">
                        <div class="content2">
                            <div class="contentLable">
                                <span class="require">*</span>
                                物料条码
                            </div>
                            <el-input
                                type="text"
                                v-model="data.MaterialProductIDTagName"
                                style="width: calc(100% - 160px)"
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
                        <div class="content2">
                            <div class="contentLable">
                                <span class="require">*</span>
                                物料检测结果
                            </div>
                            <el-input
                                type="text"
                                v-model="data.MaterialResultTagName"
                                style="width: calc(100% - 160px)"
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
                    <CurrentTitle
                        title="业务信息"
                        v-show="data.IsWeld || data.IsLaserMarking"
                    />
                    <div class="content1-line" v-show="data.IsLaserMarking">
                        <div class="content2">
                            <div class="contentLable">
                                <span class="require">*</span>
                                打码请求信号
                            </div>
                            <el-input
                                type="text"
                                v-model="data.MarkingTagName"
                                style="width: calc(100% - 160px)"
                                placeholder="必填"
                                :disabled="true"
                            />
                            <div
                                class="unit"
                                @click="handleChoose('MarkingTagName')"
                            >
                                …
                            </div>
                        </div>
                        <div class="content2">
                            <div class="contentLable">
                                <span class="require">*</span>
                                条码下发
                            </div>
                            <el-input
                                type="text"
                                v-model="data.MarkingProductIDTagName"
                                style="width: calc(100% - 160px)"
                                placeholder="必填"
                                :disabled="true"
                            />
                            <div
                                class="unit"
                                @click="handleChoose('MarkingProductIDTagName')"
                            >
                                …
                            </div>
                        </div>
                    </div>
                    <div class="content1-line" v-show="data.IsLaserMarking">
                        <div class="content2">
                            <div class="contentLable">
                                <span class="require">*</span>
                                条码下发结果
                            </div>
                            <el-input
                                type="text"
                                v-model="data.MarkingResultTagName"
                                style="width: calc(100% - 160px)"
                                placeholder="必填"
                                :disabled="true"
                            />
                            <div
                                class="unit"
                                @click="handleChoose('MarkingResultTagName')"
                            >
                                …
                            </div>
                        </div>
                        <div class="content2"></div>
                    </div>

                    <div class="content1-line" v-show="data.IsWeld">
                        <div class="content2">
                            <div class="contentLable">
                                <span class="require">*</span>
                                设备返修标记信号
                            </div>
                            <el-input
                                type="text"
                                v-model="data.WeldRepairTagName"
                                style="width: calc(100% - 160px)"
                                placeholder="必填"
                                :disabled="true"
                            />
                            <div
                                class="unit"
                                @click="handleChoose('WeldRepairTagName')"
                            >
                                …
                            </div>
                        </div>
                        <div class="content2">
                            <div class="contentLable">
                                <span class="require">*</span>
                                产品报废标记信号
                            </div>
                            <el-input
                                type="text"
                                v-model="data.WeldScrapTagName"
                                style="width: calc(100% - 160px)"
                                placeholder="必填"
                                :disabled="true"
                            />
                            <div
                                class="unit"
                                @click="handleChoose('WeldScrapTagName')"
                            >
                                …
                            </div>
                        </div>
                    </div>
                    <div class="content1-line" v-show="data.IsWeld">
                        <div class="content2">
                            <div class="contentLable">
                                <span class="require">*</span>
                                条码变量
                            </div>
                            <el-input
                                type="text"
                                v-model="data.WeldProductIDTagName"
                                style="width: calc(100% - 160px)"
                                placeholder="必填"
                                :disabled="true"
                            />
                            <div
                                class="unit"
                                @click="handleChoose('WeldProductIDTagName')"
                            >
                                …
                            </div>
                        </div>
                        <div class="content2">
                            <div class="contentLable">
                                <span class="require">*</span>
                                标记处理结果
                            </div>
                            <el-input
                                type="text"
                                v-model="data.WeldResultTagName"
                                style="width: calc(100% - 160px)"
                                placeholder="必填"
                                :disabled="true"
                            />
                            <div
                                class="unit"
                                @click="handleChoose('WeldResultTagName')"
                            >
                                …
                            </div>
                        </div>
                    </div>
                    <div class="content1-line" v-show="data.IsWeld">
                        <div class="content2">
                            <div class="contentLable">
                                <span class="require">*</span>
                                查询信号
                            </div>
                            <el-input
                                type="text"
                                v-model="data.WeldNgSelTagName"
                                style="width: calc(100% - 160px)"
                                placeholder="必填"
                                :disabled="true"
                            />
                            <div
                                class="unit"
                                @click="handleChoose('WeldNgSelTagName')"
                            >
                                …
                            </div>
                        </div>
                        <div class="content2">
                            <div class="contentLable">
                                <span class="require">*</span>
                                查询条码
                            </div>
                            <el-input
                                type="text"
                                v-model="data.WeldNgSelProductIDTagName"
                                style="width: calc(100% - 160px)"
                                placeholder="必填"
                                :disabled="true"
                            />
                            <div
                                class="unit"
                                @click="
                                    handleChoose('WeldNgSelProductIDTagName')
                                "
                            >
                                …
                            </div>
                        </div>
                    </div>
                    <div class="content1-line" v-show="data.IsWeld">
                        <div class="content2">
                            <div class="contentLable">
                                <span class="require">*</span>
                                查询条码结果
                            </div>
                            <el-input
                                type="text"
                                v-model="data.WeldNgSelResultTagName"
                                style="width: calc(100% - 160px)"
                                placeholder="必填"
                                :disabled="true"
                            />
                            <div
                                class="unit"
                                @click="handleChoose('WeldNgSelResultTagName')"
                            >
                                …
                            </div>
                        </div>
                        <div class="content2">
                            <div class="contentLable">
                                <span class="require">*</span>
                                看板查询信号
                            </div>
                            <el-input
                                type="text"
                                v-model="data.BoardSelTagName"
                                style="width: calc(100% - 160px)"
                                placeholder="必填"
                                :disabled="true"
                            />
                            <div
                                class="unit"
                                @click="handleChoose('BoardSelTagName')"
                            >
                                …
                            </div>
                        </div>
                    </div>
                    <div class="content1-line" v-show="data.IsWeld">
                        <div class="content2">
                            <div class="contentLable">
                                <span class="require">*</span>
                                看板查询条码
                            </div>
                            <el-input
                                type="text"
                                v-model="data.BoardSelProductIDTagName"
                                style="width: calc(100% - 160px)"
                                placeholder="必填"
                                :disabled="true"
                            />
                            <div
                                class="unit"
                                @click="
                                    handleChoose('BoardSelProductIDTagName')
                                "
                            >
                                …
                            </div>
                        </div>
                        <div class="content2">
                            <div class="contentLable">
                                <span class="require">*</span>
                                看板查询结果
                            </div>
                            <el-input
                                type="text"
                                v-model="data.BoardSelResultTagName"
                                style="width: calc(100% - 160px)"
                                placeholder="必填"
                                :disabled="true"
                            />
                            <div
                                class="unit"
                                @click="handleChoose('BoardSelResultTagName')"
                            >
                                …
                            </div>
                        </div>
                    </div>

                    <div class="content1-line" v-show="data.IsImageCheck">
                        <div class="content2">
                            <div class="contentLable">
                                <span class="require">*</span>
                                画像检查人工返修
                            </div>
                            <el-input
                                type="text"
                                v-model="data.ImageCheckManualTagName"
                                style="width: calc(100% - 160px)"
                                placeholder="必填"
                                :disabled="true"
                            />
                            <div
                                class="unit"
                                @click="handleChoose('ImageCheckManualTagName')"
                            >
                                …
                            </div>
                        </div>
                        <div class="content2">
                            <div class="contentLable">
                                <span class="require">*</span>
                                画像检查产品报废
                            </div>
                            <el-input
                                type="text"
                                v-model="data.ImageCheckScrapTagName"
                                style="width: calc(100% - 160px)"
                                placeholder="必填"
                                :disabled="true"
                            />
                            <div
                                class="unit"
                                @click="handleChoose('ImageCheckScrapTagName')"
                            >
                                …
                            </div>
                        </div>
                    </div>
                    <div class="content1-line" v-show="data.IsImageCheck">
                        <div class="content2">
                            <div class="contentLable">
                                <span class="require">*</span>
                                画像检查条码变量
                            </div>
                            <el-input
                                type="text"
                                v-model="data.ImageCheckProductIDTagName"
                                style="width: calc(100% - 160px)"
                                placeholder="必填"
                                :disabled="true"
                            />
                            <div
                                class="unit"
                                @click="
                                    handleChoose('ImageCheckProductIDTagName')
                                "
                            >
                                …
                            </div>
                        </div>
                        <div class="content2">
                            <div class="contentLable">
                                <span class="require">*</span>
                                画像检查标记处理
                            </div>
                            <el-input
                                type="text"
                                v-model="data.ImageCheckResultTagName"
                                style="width: calc(100% - 160px)"
                                placeholder="必填"
                                :disabled="true"
                            />
                            <div
                                class="unit"
                                @click="handleChoose('ImageCheckResultTagName')"
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
                WID: 0,
                SID: null,
                StepName: '',
                IsAuto: false,
                ProductIDTagName: '',
                IsRelated: false,
                FinishTag1: '',
                FinishTag2: '',
                IsAbsolute: false,
                AbsoQualTag: 0,
                IsQualitiedTagName: '',
                IsCheckDuplicate: true,
                GetInTagName: '',
                IsSeparationInOut: true,
                OutProductIDTagName: '',
                DuplicateCodeTagName: '',
                DuplicateCodeResultTagName: '',
                DuplicateCodeProductIDTagName: '',
                IsCheckMaterial: true,
                MaterialTagName: '',
                MaterialResultTagName: '',
                MaterialProductIDTagName: '',
                IsLaserMarking: true,
                MarkingTagName: '',
                MarkingProductIDTagName: '',
                MarkingResultTagName: '',
                IsWeld: true,
                WeldRepairTagName: '',
                WeldScrapTagName: '',
                WeldProductIDTagName: '',
                WeldResultTagName: '',
                WeldNgSelTagName: '',
                WeldNgSelProductIDTagName: '',
                WeldNgSelResultTagName: '',
                BoardSelTagName: '',
                BoardSelProductIDTagName: '',
                BoardSelResultTagName: '',
                IsImageCheck: true,
                ImageCheckManualTagName: '',
                ImageCheckScrapTagName: '',
                ImageCheckProductIDTagName: '',
                ImageCheckResultTagName: '',
                IsOffine: false,
                IsMachiningTagName: ''
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
                        IsLaserMarking: res.data.data.IsLaserMarking
                            ? true
                            : false,
                        IsWeld: res.data.data.IsWeld ? true : false,
                        IsSeparationInOut: res.data.data.IsSeparationInOut
                            ? true
                            : false,
                        IsImageCheck: res.data.data.IsImageCheck ? true : false,
                        IsFinishSeparate: res.data.data.IsFinishSeparate
                            ? true
                            : false,
                        IsOffine: res.data.data.IsOffine ? true : false,
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
                        IsLaserMarking: this.data.IsLaserMarking ? 1 : 0,
                        IsWeld: this.data.IsWeld ? 1 : 0,
                        IsImageCheck: this.data.IsImageCheck ? 1 : 0,
                        IsSeparationInOut: this.data.IsSeparationInOut ? 1 : 0,
                        QualitiedType: this.data.QualitiedType ? 1 : 0,
                        IsOffine: this.data.IsOffine ? 1 : 0,
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
        width: 1450px;
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
            .check-content {
                grid-row-start: span 2;
                padding-left: 40px;
            }
            .content1 {
                width: 100%;
                height: auto;
                margin-bottom: 30px;
                display: grid;
                grid-template-columns: repeat(auto-fill, 50%);

                .content1-line {
                    grid-column-start: span 2;
                    display: flex;
                    align-items: flex-start;
                    justify-content: space-between;

                    .content {
                        width: fit-content;
                        position: relative;
                    }
                }
            }

            .content,
            .content2 {
                display: flex;
                flex-wrap: wrap;
                width: 100%;
                line-height: 40px;
                align-items: center;
                position: relative;
                margin-bottom: 16px;

                .contentLable {
                    width: 150px;
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
