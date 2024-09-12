<!--
 * @Description: 这是参数报表页面（组件）
 * @Date: 2019-11-28 10:59:10
 * @Author: Tao
 * @LastEditors: Tao
 * @LastEditTime: 2021-04-08 15:25:35
 -->
<template>
    <div class="tapwater">
        <div class="InspectionRecords">

            <div class="StationBoard-textarea">
                <div class="textarea-label">产品ID：</div>
                <div class="textarea-content">
                    <el-input type="text" resize="none" ref="input1" @keyup.enter.native="$event.target.blur()"
                        v-model="prodCode" />
                </div>
            </div>

            <div class="StationBoard-textarea">
                <div class="textarea-label">是否合格：</div>
                <div class="textarea-content">
                    <div :class="isQualified ? 'check-btn query' : 'check-btn'" @click="changeIsQualified(true)">是</div>
                    <div :class="!isQualified ? 'check-btn query' : 'check-btn'" @click="changeIsQualified(false)">否</div>
                </div>
            </div>
            <div class="StationBoard-textarea textarea-box" v-show="!this.isQualified">
                <div class="textarea-label">不良原因：</div>
                <div class="textarea-content">
                    <el-input type="textarea" resize="none" ref="input12" v-model="judeCode"
                        @keyup.enter.native="$event.target.blur()" @blur="checkReason" />
                    <div class="jude-list">
                        <div class="list-reason" v-for="item in curReasonList" :key="item.PoorBarCode">{{ item.PoorMark
                        }}
                            <img class="reason-cancel" @click="delReason(item)" src="../../../assets/images/board-close.png"
                                alt />
                        </div>
                    </div>
                </div>
            </div>
            <div class="StationBoard-textarea" v-show="!this.isQualified">
                <div class="textarea-label">不良工序：</div>
                <div class="textarea-content">
                    <el-tooltip effect="dark" :content="processStr" placement="top" :disabled="!process.length">
                        <el-select style="width:500px" class="tags-select-input" placeholder="请选择" multiple
                            v-model="process">
                            <el-option v-for="item in processList" :key="item.WID" :label="item.WorkName" :value="item.WID">
                            </el-option>
                        </el-select>
                    </el-tooltip>
                </div>
            </div>

            <div class="btn-box">
                <div class="sumbit" @click="sumbitFn">提交</div>
            </div>

        </div>

        <!-- 提示弹窗和遮罩层 -->
        <TipsPop v-if="isPopShow" :tipText="tipText" :noCancel="noCancel" @tipCallBack="tipCallBack"></TipsPop>

    </div>
</template>

<script>
// vue文件中引入echarts工具
import TipsPop from '../../../components/public/tipPop.vue';
import MyPage from '../../../components/public/page.vue';
export default {
    name: 'tapwater',
    components: {
        TipsPop,
        MyPage,
    },
    data() {
        return {
            isPopShow: false,
            tipText: '',
            noCancel: true,

            prodCode: '',
            judeCode: '',
            isQualified: true,
            DefectiveReasons: [],
            curReasonList: [],
            processList: [],
            process: [],
        };
    },
    mounted() {
        this.GetDefectiveReasonsFn();
        this.getProcess();
    },
    computed: {
        processStr() {
            return this.processList.filter(_ => this.process.some(_2 => _2 == _.WID)).map(_ => _.WorkName).join(',')
        }
    },
    methods: {
        tipCallBack() {
            if (this.tipText == '添加成功！') {
                this.$nextTick(() => {
                    this.$refs.input1.focus();
                })
            }
            this.isPopShow = false;
            this.noCancel = true;
        },
        changeIsQualified(b) {
            this.isQualified = b
        },
        GetDefectiveReasonsFn() {
            this.$axios({
                method: 'post',
                url: `/api/InspectionRecords/QueryDefectiveProductsReasonSelect`,
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
            let _obj = this.DefectiveReasons.find((item) => {
                return item.PoorBarCode.trim() == this.judeCode.trim()
            })

            if (_obj && !this.curReasonList.some((item) => item.PoorBarCode.trim() == this.judeCode.trim())) {
                this.curReasonList.push(_obj)
                this.judeCode = '';
                this.$nextTick(() => {
                    this.$refs.input12.focus();
                })
            }
        },
        delReason(cur) {
            this.curReasonList = this.curReasonList.filter((item) => item.PoorBarCode != cur.PoorBarCode)
        },
        getProcess() {
            this.$axios({
                url: `/api/ProcessParameterConfigure/QueryWorkSections`,
                method: 'post',
            }).then((res) => {
                if (res.data.code == 0) {
                    this.processList = res.data.data || []
                } else {
                    this.tipText = res.data.msg;
                    this.isPopShow = true;
                }
            });
        },
        sumbitFn() {
            let _name = '';
            if (!JSON.parse(sessionStorage.getItem('userInfo1'))) {
                _name = JSON.parse(
                    sessionStorage.getItem('sightseerInfo1')
                ).SCMSUserName;
            } else {
                _name = JSON.parse(
                    sessionStorage.getItem('userInfo1')
                ).SCMSUserName;
            }
            if (!this.prodCode) {
                this.tipText = '请输入产品ID！';
                this.isPopShow = true;
                return
            }
            if (!this.isQualified && !this.curReasonList.length) {
                this.tipText = '请输入不良原因！';
                this.isPopShow = true;
                return
            }
            if (!this.isQualified && !this.process.length) {
                this.tipText = '请选择不良工序！';
                this.isPopShow = true;
                return
            }
            this.$axios({
                url: `/api/InspectionRecords/AddInspectionRecord`,
                method: 'post',
                data: {
                    ProductId: this.prodCode,
                    IsQualified: this.isQualified,
                    ReasonValue: this.curReasonList.map(_ => _.PoorMark),
                    WIDS: this.process,
                    LoginName: _name
                }
            }).then((res) => {
                if (res.data.code == 0) {
                    this.tipText = '添加成功！';
                    this.isPopShow = true;
                    this.prodCode = '';
                    this.judeCode = '';
                    this.process = [];
                    this.isQualified = true;
                    this.curReasonList = [];
                    this.$nextTick(() => {
                        this.$refs.input1.focus();
                    })
                } else {
                    this.tipText = res.data.msg;
                    this.isPopShow = true;
                }
            });
        }
    },

};
</script>

 

<style lang="scss" scoped>
.tapwater {
    box-sizing: border-box;
    width: 100%;
    height: 100%;


    ::v-deep .el-select__tags {
        white-space: nowrap;
        overflow: hidden;
        flex-flow: nowrap;
    }

    ::v-deep .el-select__tags-text {
        max-width: 60px;
        white-space: nowrap;
        overflow: hidden;
        flex-flow: nowrap;
    }

    .InspectionRecords {
        width: 900px;
        padding-top: 50px;

        .StationBoard-textarea {
            width: 100%;
            display: flex;
            align-items: center;
            margin-bottom: 15px;

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
                            width: 12px;
                            height: 12px;
                            margin-left: 16px;
                            cursor: pointer;
                        }
                    }
                }
            }



            .check-btn {
                display: inline-block;
                height: 40px;
                width: 80px;
                text-align: center;
                line-height: 40px;
                color: #ffffff;
                background-color: #d7d7d7;
                border-radius: 5px;
                margin-right: 15px;
                cursor: pointer;
            }

            .query {
                background-color: #facd91;
                position: relative;
            }

            .query::after {
                content: '√';
                position: absolute;
                right: -10px;
                bottom: 0;
                width: 20px;
                height: 20px;
                font-size: 20px;
                line-height: 1;
                color: white;
            }
        }

        .textarea-box {
            align-items: flex-start;
        }


    }

    .btn-box {
        width: 100%;
        display: flex;
        justify-content: flex-end;

        .sumbit {
            display: inline-block;
            height: 40px;
            width: 118px;
            text-align: center;
            line-height: 40px;
            color: #ffffff;
            background-color: #4270e4;
            border-radius: 5px;
            cursor: pointer;
        }
    }


}
</style>
 