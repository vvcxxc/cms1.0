<!--
 * @description: 设备总览页面
 * @since: 2019-11-08 15:00:48
 * @Author: jawnwa22
 * @LastEditors: jawnwa22
 * @LastEditTime: 2019-11-11 10:13:58
 -->
<template>
    <div class="StationBoard">
        <div class="StationBoard-content">
            <div class="StationBoard-left">
                <div class="StationBoard-base">
                    <div class="StationBoard-title">
                        <img :src="require('../../assets/images/board1.png')" alt />
                        基本信息
                    </div>
                    <div class="base-content">
                        <div class="base-img">
                            <img :src="'data:image/jpeg;base64,' + ImgBase64" alt v-if="ImgBase64" />
                            <img :src="require('../../assets/images/board6.png')" alt v-else />
                        </div>
                        <div class="base-user">{{ SCMSUserName }}</div>
                        <div class="base-ul">
                            <div class="base-info">工号：{{ SCMSUserAccount }}</div>
                            <div class="base-info">工序号：{{ WorkCode }}</div>
                            <div class="base-info">工序名称：{{ WorkName }}</div>
                        </div>
                    </div>
                </div>
                <div class="StationBoard-duty">
                    <div class="StationBoard-title">
                        <img :src="require('../../assets/images/board2.png')" alt />
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
                        <img :src="require('../../assets/images/board3.png')" alt />
                        产品信息
                    </div>
                    <div class="prod-content">
                        <div class="StationBoard-textarea">
                            <div class="textarea-label">产品条码：</div>
                            <div class="textarea-content">
                                <el-input type="text" resize="none" ref="input1" @keyup.enter.native="$event.target.blur()"
                                    @focus="startWrite" @blur="CheckProcessFn" v-model="prodCode" />
                            </div>
                        </div>
                        <div class="prod-form">
                            <div class="StationBoard-textarea prod-input">
                                <div class="textarea-label">托盘码：</div>
                                <el-tooltip effect="dark" :content="trayCode" placement="top" :disabled="!trayCode">
                                    <div class="textarea-content">
                                        <el-input v-model="trayCode" disabled />
                                    </div>
                                </el-tooltip>
                            </div>
                            <div class="StationBoard-textarea prod-input">
                                <div class="textarea-label">加工类型：</div>
                                <el-tooltip effect="dark" :content="RepairType" placement="top" :disabled="!RepairType">
                                    <div class="textarea-content">
                                        <el-input v-model="RepairType" disabled />
                                    </div>
                                </el-tooltip>
                            </div>
                            <div class="StationBoard-textarea prod-input">
                                <div class="textarea-label">返修工序：</div>
                                <el-tooltip effect="dark" :content="RepairProcess" placement="top"
                                    :disabled="!RepairProcess">
                                    <div class="textarea-content">
                                        <el-input v-model="RepairProcess" disabled />
                                    </div>
                                </el-tooltip>
                            </div>
                            <div class="StationBoard-textarea prod-input">
                                <div class="textarea-label">工单编号：</div>
                                <el-tooltip effect="dark" :content="WorkOrderNum" placement="top" :disabled="!WorkOrderNum">
                                    <div class="textarea-content">
                                        <el-input v-model="WorkOrderNum" disabled />
                                    </div>
                                </el-tooltip>
                            </div>
                            <div class="StationBoard-textarea prod-input">
                                <div class="textarea-label">产品名称：</div>
                                <el-tooltip effect="dark" :content="ProductTypeName" placement="top"
                                    :disabled="!ProductTypeName">
                                    <div class="textarea-content">
                                        <el-input v-model="ProductTypeName" disabled />
                                    </div>
                                </el-tooltip>
                            </div>
                            <div class="StationBoard-textarea prod-input">
                                <div class="textarea-label">产品型号：</div>
                                <el-tooltip effect="dark" :content="ProductTypeCode" placement="top"
                                    :disabled="!ProductTypeCode">
                                    <div class="textarea-content">
                                        <el-input v-model="ProductTypeCode" disabled />
                                    </div>
                                </el-tooltip>
                            </div>
                            <div class="StationBoard-textarea prod-input">
                                <div class="textarea-label">产品颜色：</div>
                                <el-tooltip effect="dark" :content="ProductColor" placement="top" :disabled="!ProductColor">
                                    <div class="textarea-content">
                                        <el-input v-model="ProductColor" disabled />
                                    </div>
                                </el-tooltip>
                            </div>
                            <div class="StationBoard-textarea prod-input">
                                <div class="textarea-label">重码校验：</div>
                                <el-tooltip effect="dark" :content="RepairVer" placement="top" :disabled="!RepairVer">
                                    <div :class="RepairVer == 'NG' ? 'textarea-content ng-input' : 'textarea-content'">
                                        <el-input v-model="RepairVer" disabled />
                                    </div>
                                </el-tooltip>
                            </div>
                            <div class="StationBoard-textarea prod-input">
                                <div class="textarea-label">漏工序校验：</div>
                                <el-tooltip effect="dark" :content="MissingProcessVer" placement="top"
                                    :disabled="!MissingProcessVer">
                                    <div
                                        :class="MissingProcessVer == 'NG' ? 'textarea-content ng-input' : 'textarea-content'">
                                        <el-input v-model="MissingProcessVer" disabled />
                                    </div>
                                </el-tooltip>
                            </div>
                            <div class="StationBoard-textarea prod-input">
                                <div class="textarea-label">遗漏工序：</div>
                                <el-tooltip effect="dark" :content="MissingProcess" placement="top"
                                    :disabled="!MissingProcess">
                                    <div class="textarea-content">
                                        <el-input v-model="MissingProcess" disabled />
                                    </div>
                                </el-tooltip>
                            </div>
                        </div>
                    </div>
                    <div class="StationBoard-title">
                        <img :src="require('../../assets/images/board4.png')" alt />
                        物料信息
                    </div>
                    <div class="mater-content">
                        <div class="mater-table">
                            <el-table :data="MaterialList" height="100%" :style="{ width: '100%', fontSize: '14px' }"
                                :header-cell-style="{ background: '#DAE9F6', color: '#59759C', height: '30px', padding: '0' }"
                                :row-style="{ height: '30px' }">
                                <template slot="empty">
                                    <span>{{ lang.SCMSConsoleWebApiMySql_NoData }}</span>
                                </template>
                                <el-table-column prop="MaterialName" label="物料名称" :show-overflow-tooltip="true">
                                    <template slot-scope="scope">
                                        <div :class="scope.row.MaterialRS == 'NG' ? 'ng-input' : ''"> {{
                                            scope.row.MaterialName }}</div>

                                    </template>
                                </el-table-column>
                                <el-table-column prop="MaterialCode" label="物料条码" :show-overflow-tooltip="true">
                                    <template slot-scope="scope">
                                        <div :class="scope.row.MaterialRS == 'NG' ? 'table-show ng-input' : 'table-show'"
                                            v-if="!scope.row.isEdit" @click="handleEdit(scope.row)">{{
                                                scope.row.MaterialCode
                                            }}</div>
                                        <el-input class="table-input" v-else v-model="scope.row.tempCode"
                                            @keyup.enter.native="$event.target.blur()" @blur="checkMater(scope.row)" />
                                    </template>
                                </el-table-column>
                                <el-table-column prop="MaterialRS" label="校验结果" :show-overflow-tooltip="true">
                                    <template slot-scope="scope">
                                        <div :class="scope.row.MaterialRS == 'NG' ? 'ng-input' : ''"> {{
                                            scope.row.MaterialRS }}</div>

                                    </template>
                                </el-table-column>
                                <el-table-column prop="MaterialMsg" label="NG原因" :show-overflow-tooltip="true">
                                    <template slot-scope="scope">
                                        <div :class="scope.row.MaterialRS == 'NG' ? 'ng-input' : ''"> {{
                                            scope.row.MaterialMsg }}</div>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                    </div>
                </div>
                <div class="StationBoard-jude">
                    <div class="StationBoard-title">
                        <img :src="require('../../assets/images/board5.png')" alt />
                        合格判定
                    </div>
                    <div class="jude-content">
                        <div class="StationBoard-textarea">
                            <div class="textarea-label">不良条码：</div>
                            <div class="textarea-content">
                                <el-input type="textarea" resize="none" ref="input12" v-model="judeCode"
                                    @keyup.enter.native="$event.target.blur()" @blur="checkReason" />
                                <div class="jude-list">
                                    <div class="list-reason" v-for="item in curReasonList" :key="item.Value">{{ item.Reason
                                    }}
                                        <img class="reason-cancel" @click="delReason(item)"
                                            :src="require('../../assets/images/board-close.png')" alt />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="jude-sumbit">
                            <div :class="(haveNG || !prodCode || MissingProcessVer == 'NG' || RepairVer == 'NG') ? 'sumbit-btn disabled-btn' : 'sumbit-btn'"
                                @click="ProcessParameterSubFn">提交</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <TipPop v-if="isPopShow" :tipText="tipText" :noCancel="noCancel" @tipCallBack="tipCallBack" />

    </div>
</template>

<script>
import TipPop from '@/components/public/tipPop.vue';

export default {
    name: 'StationBoard',
    components: {
        TipPop,
    },
    data() {
        return {
            SID: '',
            lang: JSON.parse(localStorage.getItem('languages'))[localStorage.getItem('currentLang')],
            isPopShow: false,
            noCancel: true, // 弹窗是否带取消按按钮
            tipText: '',
            getTrayTimer: 0,
            getMaterTimer: 0,
            getShiftTimer: 0,
            prodCode: '',
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
        };

    },
    watch: {
        '$store.state._prodCode': {
            //静态图片数据
            deep: true,
            handler: function (data) {
                if (data && data.SID == this.SID) {
                    if (data.ProductId && this.oldprodCode != data.ProductId) {
                        this.prodCode = data.ProductId;
                        //oldprodCode在CheckProcessFn再复制
                        this.MaterialList.forEach((item) => {
                            item.isEdit = false;
                            item.MaterialCode = '';
                            item.tempCode = '';
                            item.MaterialRS = '';
                            item.MaterialMsg = '';
                        });
                    
                        this.CheckProcessFn();
                    } else if (!data.ProductId && data.Msg) {
                        this.isPopShow = true;
                        this.tipText = data.Msg;
                    }
                }
            }
        }
    },
    computed: {
        haveNG() {
            return this.MaterialList.some((item) => item.MaterialRS != 'OK')
        }
    },
    methods: {
        tipCallBack(str) {
            if (str == 'yes') {
                this.isPopShow = false;
            } else {
                this.isPopShow = false;
            }
            this.noCancel = true;
        },

        timerGetTray() {
            clearTimeout(this.getTrayTimer)
            this.$axios({
                method: 'get',
                url: `/api/ManualPosition/GetTrayValue`,
            }).then(res => {
                if (res.data.code == 0) {
                    this.trayCode = res.data.data.value
                } else {
                } this.getTrayTimer = setTimeout(() => {
                    this.timerGetTray()
                }, 2000)
            })

        },
        timerGetShift() {
            clearTimeout(this.getShiftTimer)
            this.$axios({
                method: 'get',
                url: `/api/ManualPosition/GetShiftProduction`,
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
                    this.timerGetShift()
                }, 2000)
            })

        },

        timerMaterialsInfo() {
            clearTimeout(this.getMaterTimer)
            this.$axios({
                method: 'post',
                url: `/api/ManualPosition/MaterialsInfoRealTime`,
            }).then(res => {
                if (res.data.code == 0) {
                    this.MaterialList.forEach((item, idx) => {
                        let _obj = res.data.data.find(_ => _.BomId == item.BomID)
                        if (_obj) {
                            console.log(_obj)
                            if (
                                item.MaterialCode != _obj.MaterialCode ||
                                item.MaterialRS != _obj.MaterialRS ||
                                item.MaterialMsg != _obj.MaterialMsg
                            ) {
                                item.MaterialCode = _obj.MaterialCode;
                                item.MaterialRS = _obj.MaterialRS;
                                item.MaterialMsg = _obj.MaterialMsg;
                                if (!item.isEdit) {
                                    item.tempCode = _obj.MaterialCode;
                                }
                                this.$set(this.MaterialList, idx, item)
                            }
                        } else {
                            item.MaterialCode = '';
                            item.MaterialRS = '';
                            item.MaterialMsg = '';
                            this.$set(this.MaterialList, idx, item)
                        }
                    });
                } else {
                    this.isPopShow = true;
                    this.tipText = res.data.msg;
                }
                this.$nextTick(() => {
                    this.getMaterTimer = setTimeout(() => {
                        this.timerMaterialsInfo()
                    }, 2000)
                })
            })
        },

        GetBaseInfoFn() {
            let _name = ''
            if (!JSON.parse(sessionStorage.getItem('userInfo1'))) {
                _name = JSON.parse(
                    sessionStorage.getItem('sightseerInfo1')
                ).SCMSUserName;
            } else {
                _name = JSON.parse(
                    sessionStorage.getItem('userInfo1')
                ).SCMSUserName;
            }
            this.$axios({
                method: 'post',
                url: `/api/ManualPosition/GetBaseInfo?UserName=${_name}`,
            }).then(res => {
                if (res.data.code == 0) {
                    if (res.data.data) {
                        this.SID = res.data.data.Step.SID;
                        this.ImgBase64 = res.data.data.User.ImgBase64;
                        this.SCMSUserName = res.data.data.User.SCMSUserName;
                        this.SCMSUserAccount = res.data.data.User.SCMSUserAccount;
                        this.WorkCode = res.data.data.WorkSection.WorkCode;
                        this.WorkName = res.data.data.WorkSection.WorkName;
                        if (res.data.data.MaterialList && res.data.data.MaterialList.length) {
                            this.MaterialList = res.data.data.MaterialList.map((item) => ({
                                ...item,
                                isEdit: false,
                                tempCode: ''
                            })) || [];
                            this.timerMaterialsInfo()
                        } else {
                            this.MaterialList = [];
                        }
                        this.prodCode = '';
                        this.$nextTick(() => {
                            this.$refs.input1.focus();
                        })
                    }
                } else {
                    this.isPopShow = true;
                    this.tipText = res.data.msg;
                }
            })
        },
        startWrite() {
            this.writeProdNow = true;
        },
        CheckProcessFn() {
            this.writeProdNow = false;
            this.$refs.input1.blur();
            if (!this.prodCode) {
                return
            }

            this.oldprodCode = this.prodCode;
            this.$axios({
                method: 'post',
                url: `/api/ManualPosition/CheckProcess?ProductId=${this.prodCode}`,
            }).then(res => {
                if (res.data.code == 0) {
                    this.RepairVer = res.data.data.RepairVer;
                    this.RepairProcess = res.data.data.RepairProcess;
                    this.RepairType = res.data.data.RepairType;
                    this.WorkOrderNum = res.data.data.WorkOrderNum;
                    this.ProductTypeName = res.data.data.ProductTypeName;
                    this.ProductColor = res.data.data.ProductColor;
                    this.ProductTypeCode = res.data.data.ProductTypeCode;
                } else {
                    this.isPopShow = true;
                    this.tipText = res.data.msg;
                }
            })
            this.CheckMissingProcessFn()
        },
        CheckMissingProcessFn() {
            this.$axios({
                method: 'post',
                url: `/api/ManualPosition/CheckMissingProcess?ProductId=${this.prodCode}`,
            }).then(res => {
                if (res.data.code == 0) {
                    this.MissingProcessVer = res.data.data.MissingProcessVer;
                    this.MissingProcess = res.data.data.MissingProcess;
                } else {
                    this.isPopShow = true;
                    this.tipText = res.data.msg;
                }
            })
        },
        GetDefectiveReasonsFn() {
            this.$axios({
                method: 'get',
                url: `/api/ManualPosition/GetDefectiveReasons`,
            }).then(res => {
                if (res.data.code == 0) {
                    this.DefectiveReasons = res.data.data || []
                } else {
                    this.isPopShow = true;
                    this.tipText = res.data.msg;
                }
            })
        },
        checkReason() {
            let _obj = this.DefectiveReasons.find((item) => item.Value == this.judeCode)
            if (_obj && !this.curReasonList.some((item) => item.Value == this.judeCode)) {
                this.curReasonList.push(_obj)
                this.judeCode = '';
            }
        },
        delReason(cur) {
            this.curReasonList = this.curReasonList.filter((item) => item.Value != cur.Value)
        },
        handleEdit(row) {
            row.tempCode = row.MaterialCode;
            row.isEdit = true;
            this.$nextTick(() => {
                let arr = document.getElementsByClassName('table-input')
                if (arr && arr.length) {
                    this.$nextTick(() => {
                        arr[0].children[0].focus()
                    })
                }
            })
        },
        checkMater(row) {
            if (!(row.tempCode.trim())) {
                row.tempCode = row.MaterialCode;
                this.MaterialList.forEach((item) => item.isEdit = false);
                return;
            }
            this.$axios({
                method: 'post',
                url: `/api/ManualPosition/MaterCheck?MaterCode=${row.tempCode}&BomID=${row.BomID}`,
            }).then(res => {
                if (res.data.code == 0) {
                    row.MaterialCode = row.tempCode;
                    console.log('checkMater', row)
                    this.$nextTick(() => {
                        if (row.IsMissProcess) {
                            this.CheckMissingProcessFn()
                        }
                    })
                } else {
                    row.tempCode = row.MaterialCode;
                    this.isPopShow = true;
                    this.tipText = res.data.msg;
                }
                this.MaterialList.forEach((item) => item.isEdit = false);
            }).catch(() => {
                row.tempCode = row.MaterialCode;
                this.MaterialList.forEach((item) => item.isEdit = false);
            })
        },

        ProcessParameterSubFn() {
            if (this.haveNG || !this.prodCode || this.RepairVer == 'NG') {
                return
            }
            this.$axios({
                method: 'post',
                url: `/api/ManualPosition/ProcessParameterSub?ProductId=${this.prodCode}`,
                data: this.curReasonList.map((item) => item.Value)
            }).then(res => {
                if (res.data.code == 0) {
                    this.isPopShow = true;
                    this.tipText = '提交成功！'
                    this.prodCode = '';
                    this.judeCode = '';
                    this.curReasonList = [];
                    this.RepairType = '';
                    this.RepairVer = '';
                    this.MissingProcessVer = '';
                    this.MissingProcess = '';
                    this.MaterialList.forEach((item) => {
                        item.isEdit = false;
                        item.MaterialCode = '';
                        item.tempCode = '';
                        item.MaterialRS = '';
                        item.MaterialMsg = '';
                    });

                } else {
                    this.isPopShow = true;
                    this.tipText = res.data.msg;
                }
            })
        },

    },
    destroyed() {
        clearTimeout(this.isRFIDReadTimer)
        clearTimeout(this.getTrayTimer)
        clearTimeout(this.getMaterTimer)
        clearTimeout(this.getShiftTimer)
    },
    beforeDestroy() {
        clearTimeout(this.isRFIDReadTimer)
        clearTimeout(this.getTrayTimer)
        clearTimeout(this.getMaterTimer)
        clearTimeout(this.getShiftTimer)
    },
    mounted() {
        this.width = window.screen.width;
        this.zoom = this.width / 1920 < 0.8 ? 0.8 : this.width / 1920;
        setTimeout(() => {
            $('.StationBoard').css({
                paddingTop:
                    $('.v-toolbar').height() * $('.v-toolbar')[0].style.zoom +
                    10 +
                    'px',
                paddingBottom:
                    $('.v-footer').height() * $('.v-footer')[0].style.zoom + 10 + 'px',
            });



        });

        this.GetBaseInfoFn();
        this.GetDefectiveReasonsFn();
        this.timerGetTray()
        this.timerGetShift();
    },
};
</script>
<style lang="scss" > .StationBoard {
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
         background: #F1F1F1;
         font-size: 16px;
     }

     .mater-content .el-input__inner {
         height: 25px;
     }

     .el-input.is-disabled .el-input__inner {
         color: #0A0A0A;
     }

     .ng-input {
         color: #D9001B;

         .el-input__inner {
             color: #D9001B;
         }

         .el-input.is-disabled .el-input__inner {
             color: #D9001B;
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
         width: 0
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
    padding: 0 10px;
    padding-top: 100px;
    padding-top: 40px;
    box-sizing: border-box;
    background-color: #F1F1F1;

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
                background: #FFFFFF;
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
                background: #FFFFFF;
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
                        background: #EFFAED;
                        border-radius: 2px 2px 2px 2px;
                        opacity: 1;
                        border: 1px solid #2BA83F;
                        color: #2BA83F;
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
                        background: #EBF4FA;
                        border: 1px solid #5A84FF;
                        color: #5A84FF;
                    }

                    .yellow {
                        background: #FCF3E4;
                        border: 1px solid #FFA724;
                        color: #FFA724;

                    }
                }
            }
        }

        .StationBoard-right {
            height: 100%;
            width: calc(100% - 330px);

            .StationBoard-prod {
                padding-top: 9px;
                box-sizing: border-box;
                width: 100%;
                height: calc(100% - 240px);
                overflow-y: auto;
                background: #FFFFFF;
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
                    height: calc(100% - 350px);
                    padding: 10px 76px 0px 40px;

                    .mater-table {
                        width: 100%;
                        height: 100%;
                        background: #DAE9F6;
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
                height: 230px;
                margin-top: 10px;
                background: #FFFFFF;
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
                            color: #0A0A0A;
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