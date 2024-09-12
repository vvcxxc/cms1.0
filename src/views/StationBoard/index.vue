<!--
 * @description: 设备总览页面
 * @since: 2019-11-08 15:00:48
 * @Author: jawnwa22
 * @LastEditors: jawnwa22
 * @LastEditTime: 2019-11-11 10:13:58
 -->
<template>
    <div class="StationBoard" :style="{ paddingTop: fullScreen ? 0 : '100px' }">
        <div class="StationBoard-full">
            <img
                v-if="!fullScreen"
                :src="require('../../assets/images/plus.png')"
                alt="放大"
                @click="fullScreenFn(true)"
            />
            <img
                v-else
                :src="require('../../assets/images/minus.png')"
                alt="缩小"
                @click="fullScreenFn(false)"
            />
        </div>
        <div class="StationBoard-content">
            <div class="StationBoard-left">
                <div class="StationBoard-base">
                    <div class="StationBoard-title">
                        <img
                            :src="require('../../assets/images/board1.png')"
                            alt
                        />
                        基本信息
                    </div>
                    <div class="base-content">
                        <div class="base-img">
                            <img
                                :src="'data:image/jpeg;base64,' + ImgBase64"
                                alt
                                v-if="ImgBase64"
                            />
                            <img
                                :src="require('../../assets/images/board6.png')"
                                alt
                                v-else
                            />
                        </div>
                        <div class="base-user">{{ SCMSUserName }}</div>
                        <div class="base-ul">
                            <div class="base-info">
                                工号：{{ SCMSUserAccount }}
                            </div>
                            <div class="base-info">工序号：{{ WorkCode }}</div>
                            <div class="base-info">
                                工序名称：{{ WorkName }}
                            </div>
                        </div>
                    </div>
                </div>
                <div class="StationBoard-duty">
                    <div class="StationBoard-title">
                        <img
                            :src="require('../../assets/images/board2.png')"
                            alt
                        />
                        当班作业情况
                    </div>
                    <div class="duty-ul">
                        <div class="duty-li duty-mr duty-mb">
                            <div class="li-label">作业数量</div>
                            <div class="li-num">{{ JobNum }}</div>
                        </div>
                        <div class="duty-li duty-mb blue">
                            <div class="li-label">不良数量</div>
                            <div class="li-num">{{ NGNum }}</div>
                        </div>
                        <div class="duty-li duty-mr yellow">
                            <div class="li-label">良率</div>
                            <div class="li-num">{{ YieldRate }}</div>
                        </div>
                        <div class="duty-li">
                            <div class="li-label">C/T（秒）</div>
                            <div class="li-num">{{ TimeAvg }}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="StationBoard-right">
                <div class="StationBoard-prod">
                    <div class="StationBoard-title">
                        <img
                            :src="require('../../assets/images/board3.png')"
                            alt
                        />
                        产品信息
                    </div>
                    <div class="prod-content">
                        <div class="StationBoard-textarea">
                            <div class="textarea-label">产品条码：</div>
                            <div class="textarea-content">
                                <el-input
                                    type="text"
                                    resize="none"
                                    ref="input1"
                                    @keyup.enter.native="$event.target.blur()"
                                    @focus="startWrite"
                                    @blur="CheckProcessFn(true)"
                                    v-model="prodCode"
                                />
                            </div>
                        </div>
                        <div class="prod-form">
                            <div class="StationBoard-textarea prod-input">
                                <div class="textarea-label">托盘码：</div>
                                <el-tooltip
                                    effect="dark"
                                    :content="trayCode"
                                    placement="top"
                                    :disabled="!trayCode"
                                >
                                    <div class="textarea-content">
                                        <el-input v-model="trayCode" disabled />
                                    </div>
                                </el-tooltip>
                            </div>
                            <div class="StationBoard-textarea prod-input">
                                <div class="textarea-label">加工类型：</div>
                                <el-tooltip
                                    effect="dark"
                                    :content="RepairType"
                                    placement="top"
                                    :disabled="!RepairType"
                                >
                                    <div class="textarea-content">
                                        <el-input
                                            v-model="RepairType"
                                            disabled
                                        />
                                    </div>
                                </el-tooltip>
                            </div>
                            <div class="StationBoard-textarea prod-input">
                                <div class="textarea-label">返修工序：</div>
                                <el-tooltip
                                    effect="dark"
                                    :content="RepairProcess"
                                    placement="top"
                                    :disabled="!RepairProcess"
                                >
                                    <div class="textarea-content">
                                        <el-input
                                            v-model="RepairProcess"
                                            disabled
                                        />
                                    </div>
                                </el-tooltip>
                            </div>
                            <div class="StationBoard-textarea prod-input">
                                <div class="textarea-label">工单编号：</div>
                                <el-tooltip
                                    effect="dark"
                                    :content="WorkOrderNum"
                                    placement="top"
                                    :disabled="!WorkOrderNum"
                                >
                                    <div class="textarea-content">
                                        <el-input
                                            v-model="WorkOrderNum"
                                            disabled
                                        />
                                    </div>
                                </el-tooltip>
                            </div>
                            <div class="StationBoard-textarea prod-input">
                                <div class="textarea-label">产品名称：</div>
                                <el-tooltip
                                    effect="dark"
                                    :content="ProductTypeName"
                                    placement="top"
                                    :disabled="!ProductTypeName"
                                >
                                    <div class="textarea-content">
                                        <el-input
                                            v-model="ProductTypeName"
                                            disabled
                                        />
                                    </div>
                                </el-tooltip>
                            </div>
                            <div class="StationBoard-textarea prod-input">
                                <div class="textarea-label">产品型号：</div>
                                <el-tooltip
                                    effect="dark"
                                    :content="ProductTypeCode"
                                    placement="top"
                                    :disabled="!ProductTypeCode"
                                >
                                    <div class="textarea-content">
                                        <el-input
                                            v-model="ProductTypeCode"
                                            disabled
                                        />
                                    </div>
                                </el-tooltip>
                            </div>
                            <div class="StationBoard-textarea prod-input">
                                <div class="textarea-label">产品颜色：</div>
                                <el-tooltip
                                    effect="dark"
                                    :content="ProductColor"
                                    placement="top"
                                    :disabled="!ProductColor"
                                >
                                    <div class="textarea-content">
                                        <el-input
                                            v-model="ProductColor"
                                            disabled
                                        />
                                    </div>
                                </el-tooltip>
                            </div>
                            <div class="StationBoard-textarea prod-input">
                                <div class="textarea-label">重码校验：</div>
                                <el-tooltip
                                    effect="dark"
                                    :content="RepairVer"
                                    placement="top"
                                    :disabled="!RepairVer"
                                >
                                    <div
                                        :class="
                                            RepairVer == 'NG'
                                                ? 'textarea-content ng-input'
                                                : 'textarea-content'
                                        "
                                    >
                                        <el-input
                                            v-model="RepairVer"
                                            disabled
                                        />
                                    </div>
                                </el-tooltip>
                            </div>
                            <div class="StationBoard-textarea prod-input">
                                <div class="textarea-label">漏工序校验：</div>
                                <el-tooltip
                                    effect="dark"
                                    :content="MissingProcessVer"
                                    placement="top"
                                    :disabled="!MissingProcessVer"
                                >
                                    <div
                                        :class="
                                            MissingProcessVer == 'NG'
                                                ? 'textarea-content ng-input'
                                                : 'textarea-content'
                                        "
                                    >
                                        <el-input
                                            v-model="MissingProcessVer"
                                            disabled
                                        />
                                    </div>
                                </el-tooltip>
                            </div>
                            <div class="StationBoard-textarea prod-input">
                                <div class="textarea-label">遗漏工序：</div>
                                <el-tooltip
                                    effect="dark"
                                    :content="MissingProcess"
                                    placement="top"
                                    :disabled="!MissingProcess"
                                >
                                    <div class="textarea-content">
                                        <el-input
                                            v-model="MissingProcess"
                                            disabled
                                        />
                                    </div>
                                </el-tooltip>
                            </div>
                        </div>
                    </div>
                    <div class="Mater-title">
                        <div class="mater-left">
                            <img
                                :src="require('../../assets/images/board4.png')"
                                alt
                            />
                            物料信息
                        </div>
                        <div class="mater-right">
                            <div class="mater-label">
                                输入物料条码：<el-input
                                    ref="input2"
                                    v-model="materCode"
                                    @keyup.enter.native="$event.target.blur()"
                                    @blur="checkMater"
                                    style="width: 250px;"
                                />
                            </div>
                            <div class="mater-label" v-show="MaterRes">
                                校验结果：{{ MaterRes }}
                            </div>
                            <div class="mater-label" v-show="NGReason">
                                NG原因：{{ NGReason }}
                            </div>
                        </div>
                    </div>
                    <div class="mater-content">
                        <div class="mater-table">
                            <el-table
                                ref="myTable"
                                :data="MaterialList"
                                height="100%"
                                :style="{ width: '100%', fontSize: '14px' }"
                                :header-cell-style="{
                                    background: '#DAE9F6',
                                    color: '#59759C',
                                    height: '30px',
                                    padding: '0'
                                }"
                                :row-style="{ height: '50px' }"
                                :row-class-name="tableRowClassName"
                            >
                                <template slot="empty">
                                    <span>{{
                                        lang.SCMSConsoleWebApiMySql_NoData
                                    }}</span>
                                </template>
                                <el-table-column
                                    prop="MaterialName"
                                    label="物料名称"
                                    :show-overflow-tooltip="true"
                                >
                                </el-table-column>
                                <el-table-column
                                    prop="MaterialCode"
                                    label="物料条码"
                                    :show-overflow-tooltip="true"
                                >
                                </el-table-column>
                                <el-table-column
                                    prop="MaterialRS"
                                    label="校验结果"
                                    :show-overflow-tooltip="true"
                                >
                                </el-table-column>
                            </el-table>
                        </div>
                    </div>

                    <div class="switch-title">
                        <img
                            :src="require('../../assets/images/date.png')"
                            alt
                        />
                        其他配置
                    </div>
                    <div class="switch-content">
                        <div class="switch-flex" @click="njFn">
                            配置是否需拧紧:
                            <el-switch
                                :disabled="!njshow"
                                v-model="EnableTightening"
                                size="large"
                                :style="{ marginLeft: '10px' }"
                            />
                        </div>
                        <div class="switch-tips">
                            开：需完成拧紧后才能提交； 关：可跳过拧紧
                        </div>
                    </div>
                </div>
                <div class="StationBoard-jude">
                    <div class="StationBoard-title">
                        <img
                            :src="require('../../assets/images/board5.png')"
                            alt
                        />
                        合格判定
                    </div>
                    <div class="jude-content">
                        <div class="StationBoard-textarea">
                            <div class="textarea-label">不良条码：</div>
                            <div class="textarea-content">
                                <el-input
                                    type="text"
                                    ref="input12"
                                    v-model="judeCode"
                                    @keyup.enter.native="$event.target.blur()"
                                    @blur="checkReason"
                                />
                                <div class="jude-list">
                                    <div
                                        class="list-reason"
                                        v-for="item in curReasonList"
                                        :key="item.Value"
                                    >
                                        {{ item.Reason }}
                                        <img
                                            class="reason-cancel"
                                            @click="delReason(item)"
                                            :src="
                                                require('../../assets/images/board-close.png')
                                            "
                                            alt
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="jude-sumbit">
                            <div
                                :class="
                                    !prodCode ||
                                    RepairVer == 'NG' ||
                                    MissingProcessVer == 'NG'
                                        ? 'sumbit-btn disabled-btn'
                                        : 'sumbit-btn'
                                "
                                @click="ProcessParameterSubFn"
                            >
                                提交
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <TipPop
            v-if="isPopShow"
            :tipText="tipText"
            :noCancel="noCancel"
            @tipCallBack="tipCallBack"
        />
    </div>
</template>

<script>
import TipPop from '@/components/public/tipPop.vue';

export default {
    name: 'StationBoard',
    components: {
        TipPop
    },
    data() {
        return {
            SID: '',
            lang: JSON.parse(localStorage.getItem('languages'))[
                localStorage.getItem('currentLang')
            ],
            isPopShow: false,
            noCancel: true, // 弹窗是否带取消按按钮
            tipText: '',
            getTrayTimer: 0,
            getMaterTimer: 0,
            getShiftTimer: 0,
            prodCode: '',
            materCode: '',
            judeCode: '',
            trayCode: '',
            ImgBase64: '',
            SCMSUserName: '',
            SCMSUserAccount: '',
            WorkCode: '',
            WorkName: '',
            RepairVer: '',
            RepairProcess: '',
            RepairType: '',
            MissingProcessVer: '',
            MissingProcess: '',
            WorkOrderNum: '',
            ProductTypeName: '',
            ProductColor: '',
            ProductTypeCode: '',
            DefectiveReasons: [],
            curReasonList: [],
            MaterialList: [],
            JobNum: '',
            NGNum: '',
            YieldRate: '',
            TimeAvg: '',
            isRFIDReadTimer: 0,
            oldprodCode: '',
            writeProdNow: false,
            fullScreen: false,
            materBlurTimerBool: false,
            sumbitNow: false,
            ClientIp: '',
            MaterRes: '',
            NGReason: '',
            EnableTightening: false,
            jurisdiction: [],
            buttonarr: [],
            njid: '',
            njshow: false
        };
    },
    watch: {
        '$store.state._prodCode': {
            //静态图片数据
            deep: true,
            handler: function(data) {
                if (data && data.SID == this.SID) {
                    if (data.ProductId) {
                        this.prodCode = data.ProductId;
                        //oldprodCode在CheckProcessFn再复制
                        this.CheckProcessFn();
                    } else if (data.Msg) {
                        this.isPopShow = true;
                        this.tipText = data.Msg;
                    }
                }
            }
        },
        '$store.state.submitIP': {
            //静态图片数据
            deep: true,
            handler: function(data) {
                if (data && data == this.ClientIp) {
                    this.sumbitFn();
                }
            }
        },
        '$store.state.btnPowerData': {
            //脚本事件
            deep: true,
            handler: function(n, o) {
                this.getPower();
            }
        }
    },

    methods: {
        njFn() {
            if (!this.njshow) {
                this.isPopShow = true;
                this.tipText = '该用户没有权限!';
                return;
            }
        },
        fullScreenFn(full) {
            this.fullScreen = full;
            this.$store.state.fullScreen = full;
        },
        tipCallBack(str) {
            if (this.tipText == '提交成功！') {
                this.$nextTick(() => {
                    this.$refs.input1.focus();
                });
            }
            if (str == 'yes') {
                this.isPopShow = false;
            } else {
                this.isPopShow = false;
            }
            this.noCancel = true;
        },

        timerGetTray() {
            clearTimeout(this.getTrayTimer);
            this.$axios({
                method: 'get',
                url: `/api/ManualPosition/GetTrayValue`
            }).then(res => {
                if (res.data.code == 0) {
                    this.trayCode = res.data.data.value;
                }
                this.getTrayTimer = setTimeout(() => {
                    this.timerGetTray();
                }, 2000);
            });
        },
        timerGetShift() {
            clearTimeout(this.getShiftTimer);
            this.$axios({
                method: 'get',
                url: `/api/ManualPosition/GetShiftProduction`
            }).then(res => {
                if (res.data.code == 0) {
                    this.JobNum = res.data.data.JobNum;
                    this.NGNum = res.data.data.NGNum;
                    this.YieldRate = res.data.data.YieldRate;
                    this.TimeAvg = res.data.data.TimeAvg;
                } else {
                    this.isPopShow = true;
                    this.tipText = res.data.msg;
                }
                this.getShiftTimer = setTimeout(() => {
                    this.timerGetShift();
                }, 60000); //一分钟
            });
        },
        getMaterialsInfo() {
            // this.$axios({
            //     method: 'post',
            //     url: `/api/ManualPosition/GetMaterialInfo`
            // }).then(res => {
            //     if (res.data.code == 0) {
            //     } else {
            //         this.isPopShow = true;
            //         this.tipText = res.data.msg;
            //     }
            // });
        },

        GetBaseInfoFn() {
            let _name = '';
            if (!JSON.parse(sessionStorage.getItem('userInfo1'))) {
                _name = JSON.parse(sessionStorage.getItem('sightseerInfo1'))
                    .SCMSUserName;
            } else {
                _name = JSON.parse(sessionStorage.getItem('userInfo1'))
                    .SCMSUserName;
            }
            this.$axios({
                method: 'post',
                url: `/api/ManualPosition/GetBaseInfo?UserName=${_name}`
            }).then(res => {
                if (res.data.code == 0) {
                    if (res.data.data) {
                        this.EnableTightening =
                            res.data.data.EnableTightening == 1 ? true : false;
                        this.SID = res.data.data.Step.SID;
                        this.ImgBase64 = res.data.data.User.ImgBase64;
                        this.SCMSUserName = res.data.data.User.SCMSUserName;
                        this.SCMSUserAccount =
                            res.data.data.User.SCMSUserAccount;
                        this.WorkCode = res.data.data.WorkSection.WorkCode;
                        this.WorkName = res.data.data.WorkSection.WorkName;
                        this.ClientIp = res.data.data.Step.ClientIp;
                        this.prodCode = '';
                    }
                    this.$nextTick(() => {
                        this.$refs.input1.focus();
                    });
                    this.getMaterialsInfo();
                    this.timerGetTray();
                    this.timerGetShift();
                } else {
                    this.isPopShow = true;
                    this.tipText = res.data.msg;
                }
            });
        },
        startWrite() {
            this.writeProdNow = true;
        },
        CheckProcessFn(fromInput1) {
            this.writeProdNow = false;
            this.$refs.input1.blur();
            if (!this.prodCode) {
                return;
            }

            this.oldprodCode = this.prodCode;
            this.$axios({
                method: 'post',
                url: `/api/ManualPosition/CheckProcess?ProductId=${
                    this.prodCode
                }&enableTightening=${this.EnableTightening ? 1 : 0}`
            }).then(res => {
                if (res.data.code == 0) {
                    this.RepairVer = res.data.data.CheckResult.RepairVer;
                    this.RepairProcess =
                        res.data.data.CheckResult.RepairProcess;
                    this.RepairType = res.data.data.CheckResult.RepairType;
                    this.WorkOrderNum = res.data.data.CheckResult.WorkOrderNum;
                    this.ProductTypeName =
                        res.data.data.CheckResult.ProductTypeName;
                    this.ProductColor = res.data.data.CheckResult.ProductColor;
                    this.ProductTypeCode =
                        res.data.data.CheckResult.ProductTypeCode;
                } else {
                    this.isPopShow = true;
                    this.tipText = res.data.msg;

                    this.RepairType = '';
                    this.RepairProcess = '';
                    this.WorkOrderNum = '';
                    this.ProductTypeName = '';
                    this.ProductTypeCode = '';
                    this.ProductColor = '';
                    this.RepairVer = '';
                    this.MissingProcessVer = '';
                    this.MissingProcess = '';
                }
                this.MaterialList = [];
                this.CheckMissingProcessFn(fromInput1);
            });
        },
        CheckMissingProcessFn(fromInput1, notCheckMiss) {
            this.$axios({
                method: 'post',
                url: `/api/ManualPosition/CheckMissingProcess?ProductId=${
                    this.prodCode
                }&enableTightening=${this.EnableTightening ? 1 : 0}`
            }).then(res => {
                if (res.data.code == 0) {
                    if (res.data.data.CheckMissProcess && !notCheckMiss) {
                        setTimeout(() => {
                            this.CheckMissingProcessFn(fromInput1, true);
                        }, 2000);
                        return;
                    }
                    this.MissingProcessVer = res.data.data.MissingProcessVer;
                    this.MissingProcess = res.data.data.MissingProcess;

                    if (res.data.data.AutoSubmit) {
                        this.isPopShow = true;
                        this.tipText = '提交成功！';
                        this.prodCode = '';
                        this.judeCode = '';
                        this.curReasonList = [];
                        this.RepairType = '';
                        this.RepairVer = '';
                        this.MissingProcessVer = '';
                        this.MissingProcess = '';
                        this.MaterialList = [];
                        setTimeout(() => {
                            this.tipCallBack('no');
                        }, 2000);
                    } else if (fromInput1) {
                        this.$nextTick(() => {
                            this.$refs.input2.focus();
                        });
                    }
                } else {
                    this.isPopShow = true;
                    this.tipText = res.data.msg;
                }
            });
        },
        GetDefectiveReasonsFn() {
            this.$axios({
                method: 'get',
                url: `/api/ManualPosition/GetDefectiveReasons`
            }).then(res => {
                if (res.data.code == 0) {
                    this.DefectiveReasons = res.data.data || [];
                } else {
                    this.isPopShow = true;
                    this.tipText = res.data.msg;
                }
            });
        },
        checkReason() {
            let _obj = this.DefectiveReasons.find(
                item => item.Value == this.judeCode
            );
            if (
                _obj &&
                !this.curReasonList.some(item => item.Value == this.judeCode)
            ) {
                this.curReasonList.push(_obj);
                this.judeCode = '';
            }
        },
        delReason(cur) {
            this.curReasonList = this.curReasonList.filter(
                item => item.Value != cur.Value
            );
        },
        tableRowClassName({ row, rowIndex }) {
            row.$index = rowIndex;
        },

        checkMater() {
            if (!this.materCode || !this.materCode.trim()) {
                return;
            }
            this.$axios({
                method: 'post',
                url: `/api/ManualPosition/MaterCheckV2?MaterCode=${
                    this.materCode
                }&productTypeCode=${this.ProductTypeCode}&enableTightening=${
                    this.EnableTightening ? 1 : 0
                }&productId=${this.prodCode}`
            }).then(res => {
                if (res.data.code == 0) {
                    this.MissingProcessVer = res.data.data.MissingProcessVer;
                    this.MissingProcess = res.data.data.MissingProcess;
                    if (res.data.data.MaterialItem.MaterialRS != 'NG') {
                        let _idx = this.MaterialList.findIndex(
                            _ =>
                                _.MID == res.data.data.MaterialItem.MID &&
                                _.MaterialName ==
                                    res.data.data.MaterialItem.MaterialName
                        );
                        if (_idx >= 0) {
                            this.MaterialList[_idx] = {
                                ...res.data.data.MaterialItem
                            };
                        } else {
                            this.MaterialList.push({
                                ...res.data.data.MaterialItem
                            });
                        }
                        this.MaterRes = 'OK';
                        this.NGReason = '';
                    } else {
                        this.MaterRes = 'NG';
                        this.NGReason = res.data.data.MaterialItem.MaterialMsg;
                    }

                    if (res.data.data.AutoSubmit) {
                        this.isPopShow = true;
                        this.tipText = '提交成功！';
                        this.prodCode = '';
                        this.judeCode = '';
                        this.curReasonList = [];
                        this.RepairType = '';
                        this.RepairVer = '';
                        this.MissingProcessVer = '';
                        this.MissingProcess = '';
                        this.MaterialList = [];
                        setTimeout(() => {
                            this.MaterRes = '';
                            this.NGReason = '';
                            this.materCode = '';
                            this.tipCallBack('no');
                        }, 2000);
                    } else {
                        setTimeout(() => {
                            this.MaterRes = '';
                            this.NGReason = '';
                            this.materCode = '';
                            this.$nextTick(() => {
                                this.$refs.input2.focus();
                            });
                        }, 2000);
                    }
                } else {
                    this.isPopShow = true;
                    this.tipText = res.data.msg;
                }
            });
        },
        tableScrollToRow(tableElement, rowIndex) {
            const theTableRows = tableElement.bodyWrapper.querySelectorAll(
                '.el-table__body tbody .el-table__row'
            );
            let scrollTop = 0;
            for (let i = 0; i < theTableRows.length; i++) {
                if (i === rowIndex) {
                    break;
                }
                scrollTop += theTableRows[i].offsetHeight;
            }
            tableElement.bodyWrapper.scrollTop = scrollTop;
        },

        ProcessParameterSubFn() {
            if (
                !this.prodCode ||
                this.RepairVer == 'NG' ||
                this.MissingProcessVer == 'NG'
            ) {
                return;
            }
            this.sumbitFn();
        },
        sumbitFn() {
            this.sumbitNow = true;
            this.$axios({
                method: 'post',
                url: `/api/ManualPosition/ProcessParameterSub?ProductId=${
                    this.prodCode
                }&enableTightening=${this.EnableTightening ? 1 : 0}`,
                data: {
                    EnableTightening: this.EnableTightening ? 1 : 0,
                    ProductId: this.prodCode,
                    CheckMaterialList: this.MaterialList,
                    ReasonValue: this.curReasonList.map(item => item.Value)
                }
            })
                .then(res => {
                    if (res.data.code == 0) {
                        this.isPopShow = true;
                        this.tipText = '提交成功！';
                        this.prodCode = '';
                        this.judeCode = '';
                        this.curReasonList = [];
                        this.RepairType = '';
                        this.RepairVer = '';
                        this.MissingProcessVer = '';
                        this.MissingProcess = '';
                        this.MaterialList = [];
                        setTimeout(() => {
                            this.tipCallBack('no');
                        }, 2000);
                    } else {
                        this.isPopShow = true;
                        this.tipText = res.data.msg;
                    }
                    this.sumbitNow = false;
                })
                .catch(() => {
                    this.sumbitNow = false;
                });
        },
        findPathByLeafId(id, node, path) {
            if (!path) {
                path = [];
            }
            for (let i = 0; i < node.length; i++) {
                var temPath = path.concat();

                if (id == node[i].RightID) {
                    temPath.push(node[i]);
                    return temPath;
                }
                if (node[i].Children) {
                    var findResult = this.findPathByLeafId(
                        id,
                        node[i].Children,
                        temPath
                    );
                    if (findResult) {
                        return findResult;
                    }
                }
            }
        },
        GetUrlParam(paraName) {
            let url = document.location.toString();
            let arrObj = url.split('?');
            if (arrObj.length > 1) {
                let arrPara = arrObj[1].split('&');
                let arr;
                for (let i = 0; i < arrPara.length; i++) {
                    arr = arrPara[i].split('=');
                    if (arr && arr[0] == paraName) {
                        return arr[1];
                    }
                }
                return '';
            } else {
                return '';
            }
        },
        getPower() {
            this.jurisdiction = this.$store.state.btnPowerData;

            this.buttonarr = this.findPathByLeafId(
                this.GetUrlParam('id'),
                this.jurisdiction
            )[0].Children;

            this.buttonarr.forEach(item => {
                if (item.RightName == '人工位-是否拧紧按钮') {
                    this.njid = item.RightID;
                }
            });
            var userid = '';
            if (!JSON.parse(sessionStorage.getItem('userInfo1'))) {
                userid = JSON.parse(sessionStorage.getItem('sightseerInfo1'))
                    .SCMSUserID;
            } else {
                userid = JSON.parse(sessionStorage.getItem('userInfo1'))
                    .SCMSUserID;
            }
            this.$axios({
                method: 'post',
                url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.njid}`
            })
                .then(res => {
                    this.njshow = res.data.data;
                })
                .catch(err => {
                    console.log('err', err);
                });
        }
    },
    destroyed() {
        this.fullScreenFn(false);
        clearTimeout(this.isRFIDReadTimer);
        clearTimeout(this.getTrayTimer);
        clearTimeout(this.getMaterTimer);
        clearTimeout(this.getShiftTimer);
    },
    beforeDestroy() {
        this.fullScreenFn(false);
        clearTimeout(this.isRFIDReadTimer);
        clearTimeout(this.getTrayTimer);
        clearTimeout(this.getMaterTimer);
        clearTimeout(this.getShiftTimer);
    },
    mounted() {
        this.fullScreenFn(false);
        this.width = window.screen.width;

        this.GetBaseInfoFn();
        this.GetDefectiveReasonsFn();

        this.getPower();
    }
};
</script>
<style lang="scss">
.StationBoard {
    .el-textarea__inner {
        height: 48px;
        font-size: 16px;
    }

    .jude-content {
        .el-textarea__inner {
            height: 75px;
        }
    }

    .el-input__inner {
        height: 36px;
        background: #f1f1f1;
        font-size: 16px;
    }

    .mater-content .el-input__inner {
        height: 36px;
    }

    .el-input.is-disabled .el-input__inner {
        color: #0a0a0a;
    }

    .ng-input {
        color: #d9001b;

        .el-input__inner {
            color: #d9001b;
        }

        .el-input.is-disabled .el-input__inner {
            color: #d9001b;
        }
    }

    .el-table td {
        padding: 0 0;
    }

    .el-table__body-wrapper::-webkit-scrollbar {
        /*width: 0;宽度为0隐藏*/
        width: 0px;
    }

    .el-table__body-wrapper::-webkit-scrollbar-thumb {
        border-radius: 2px;
        height: 50px;
        background: #eee;
    }

    .el-table th.gutter {
        display: none;
        width: 0;
    }

    .el-table colgroup col[name='gutter'] {
        display: none;
        width: 0;
    }

    .el-table__body {
        width: 100% !important;
    }
}
</style>
<style lang="scss" scoped>
.StationBoard {
    height: 100vh;
    width: 100vw;
    color: #000;
    padding-left: 10px;
    padding-right: 10px;
    padding-top: 100px;
    padding-bottom: 40px;
    box-sizing: border-box;
    background-color: #f1f1f1;
    position: relative;

    .StationBoard-full {
        width: 60px;
        height: 60px;
        position: absolute;
        right: 20px;
        top: 120px;
        cursor: pointer;

        img {
            width: 100%;
            height: 100%;
        }
    }

    .StationBoard-content {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: space-between;

        .StationBoard-title {
            height: 22px;
            font-size: 16px;
            display: flex;
            align-items: center;
            padding-left: 20px;
            box-sizing: border-box;

            img {
                width: 16px;
                margin-right: 4px;
            }
        }

        .Mater-title {
            height: 40px;
            font-size: 16px;
            display: flex;
            align-items: center;
            padding-left: 20px;
            padding-right: 76px;
            box-sizing: border-box;
            justify-content: flex-start;

            .mater-left {
                display: flex;
                align-items: center;
                justify-content: flex-start;
                img {
                    width: 16px;
                    margin-right: 4px;
                }
            }
            .mater-right {
                margin-left: 50px;
                display: flex;
                align-items: center;
                justify-content: flex-end;
                .mater-label {
                    display: flex;
                    align-items: center;
                    justify-content: flex-end;
                    margin-right: 30px;
                }
            }
        }
        .switch-title {
            height: 22px;
            font-size: 16px;
            display: flex;
            align-items: center;
            padding-left: 20px;
            box-sizing: border-box;
            margin: 10px 0;
            img {
                width: 16px;
                margin-right: 4px;
            }
        }
        .switch-content {
            width: 100%;
            height: auto;
            padding: 0 40px 20px;
            .switch-flex {
                display: flex;
                align-items: center;
                justify-content: flex-start;
            }
            .switch-tips {
                font-size: 14px;
                color: #808080;
            }
        }
        .StationBoard-textarea {
            width: 100%;
            display: flex;
            margin-bottom: 6px;
            align-items: center;

            .textarea-label {
                width: 150px;
                line-height: 1;
                font-size: 16px;
                font-weight: 400;
                color: #333333;
                padding-right: 10px;
                box-sizing: border-box;
                text-align: right;
            }

            .textarea-content {
                width: calc(100% - 150px);
            }
        }

        .StationBoard-left {
            height: 100%;
            width: 320px;

            .StationBoard-base {
                padding-top: 9px;
                box-sizing: border-box;
                width: 100%;
                height: calc(100% - 240px);
                background: #ffffff;
                border-radius: 6px;

                .base-content {
                    width: 100%;
                    height: auto;
                    display: flex;
                    flex-direction: column;
                    align-items: center;

                    .base-img {
                        margin: 44px 0 17px;
                        width: 170px;
                        height: 170px;
                        border-radius: 8px;
                        overflow: hidden;
                        // border: 1px solid #D2D2D2;

                        img {
                            width: 100%;
                            height: 100%;
                            object-fit: contain;
                        }
                    }

                    .base-user {
                        margin-bottom: 45px;
                        font-size: 16px;
                    }

                    .base-ul {
                        width: 250px;

                        .base-info {
                            margin-bottom: 10px;
                            font-size: 16px;
                            text-align: left;
                        }
                    }
                }
            }

            .StationBoard-duty {
                padding-top: 9px;
                box-sizing: border-box;
                width: 100%;
                height: 230px;
                margin-top: 10px;
                background: #ffffff;
                border-radius: 6px;

                .duty-ul {
                    width: 100%;
                    height: calc(100% - 22px);
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: center;
                    align-items: center;
                    padding: 20px 36px 28px;

                    .duty-li {
                        width: calc(50% - 10px);
                        height: calc(50% - 5px);
                        background: #effaed;
                        border-radius: 2px 2px 2px 2px;
                        opacity: 1;
                        border: 1px solid #2ba83f;
                        color: #2ba83f;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                        font-size: 17px;

                        .li-label {
                            margin-bottom: 8px;
                        }
                    }

                    .duty-mr {
                        margin-right: 20px;
                    }

                    .duty-mb {
                        margin-bottom: 10px;
                    }

                    .blue {
                        background: #ebf4fa;
                        border: 1px solid #5a84ff;
                        color: #5a84ff;
                    }

                    .yellow {
                        background: #fcf3e4;
                        border: 1px solid #ffa724;
                        color: #ffa724;
                    }
                }
            }
        }

        .StationBoard-right {
            height: 100%;
            width: calc(100% - 330px);
            overflow-y: auto;

            .StationBoard-prod {
                padding-top: 9px;
                box-sizing: border-box;
                width: 100%;
                min-height: calc(100% - 200px);
                height: auto;
                background: #ffffff;
                border-radius: 6px;

                .prod-content {
                    width: 100%;
                    padding: 10px 76px 10px 53px;

                    .prod-form {
                        display: flex;
                        flex-wrap: wrap;
                        justify-content: space-between;

                        .prod-input {
                            width: calc(50% - 10px);
                            align-items: center;
                            margin-bottom: 8px;
                        }
                    }
                }

                .mater-content {
                    width: 100%;
                    height: 200px;
                    padding: 0 76px 0px 40px;

                    .mater-table {
                        width: 100%;
                        height: 100%;
                        background: #dae9f6;
                        padding: 7px;
                        box-sizing: border-box;

                        .table-show {
                            width: 100%;
                            height: 20px;
                            display: flex;
                            align-items: center;
                            cursor: pointer;
                        }
                    }
                }
            }

            .StationBoard-jude {
                padding-top: 9px;
                box-sizing: border-box;
                width: 100%;
                height: 190px;
                margin-top: 10px;
                background: #ffffff;
                border-radius: 6px;

                .jude-content {
                    width: 100%;
                    padding: 20px 76px 0 53px;
                    box-sizing: border-box;

                    .jude-list {
                        width: 100%;
                        display: flex;
                        flex-wrap: wrap;
                        margin-top: 8px;

                        .list-reason {
                            margin-right: 8px;
                            padding: 9px 8px;
                            color: #0a0a0a;
                            background-color: #f2f2f2;
                            display: flex;
                            align-items: center;
                            line-height: 1;
                            border-radius: 2px;

                            .reason-cancel {
                                width: 9px;
                                height: 9px;
                                margin-left: 16px;
                                cursor: pointer;
                            }
                        }
                    }

                    .jude-sumbit {
                        display: flex;
                        justify-content: flex-end;

                        .sumbit-btn {
                            width: 105px;
                            height: 36px;
                            background: #169bd5;
                            color: #fff;
                            border-radius: 4px;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            cursor: pointer;
                        }

                        .disabled-btn {
                            background: #808080;
                            cursor: not-allowed;
                        }
                    }
                }
            }
        }
    }
}
</style>
