<template>
    <div class="zdeditPop">
        <div class="myDialog" id="myDialog">
            <div class="popHeader">
                {{ title }}
                <img
                    :src="require('../../../assets/images/no.png')"
                    alt=""
                    @click="handleClick"
                    class="close"
                />
            </div>

            <div class="popContent">
                <div class="content1-line">
                    <div class="content">
                        <div class="contentLable required">班次编码</div>
                        <el-input
                            type="text"
                            v-model="formData.sCode"
                            style="width: 210px"
                            :disabled="title == '编辑班次'"
                            :maxLength="2"
                        />
                    </div>
                    <div class="content">
                        <div class="contentLable required">班次类别</div>
                        <el-input
                            type="text"
                            v-model="formData.sCategory"
                            style="width: 210px"
                        />
                    </div>
                </div>
                <div class="content1-line">
                    <div class="content">
                        <div class="contentLable required">类型</div>
                        <el-select
                            style="width: 210px"
                            v-model="formData.sType"
                        >
                            <el-option label="当天" :value="0"></el-option>
                            <el-option label="跨天" :value="1"></el-option>
                        </el-select>
                    </div>
                    <div class="content"></div>
                </div>
                <div class="content1-line">
                    <div class="content">
                        <div class="contentLable required">班次开始时间</div>

                        <el-time-picker
                            v-model="formData.sStartTime"
                            value-format="HH:mm"
                            format="HH:mm"
                            splaceholder="请选择"
                        ></el-time-picker>
                    </div>

                    <div class="content">
                        <div class="contentLable required">班次结束时间</div>

                        <el-time-picker
                            v-model="formData.sEndTime"
                            value-format="HH:mm"
                            format="HH:mm"
                            splaceholder="请选择"
                        ></el-time-picker>
                    </div>
                </div>
                <div class="content1-line">
                    <div class="content">
                        <div class="contentLable"></div>
                        实际工时: {{ calculateHours }}h
                    </div>
                    <div class="content"></div>
                </div>
                <div class="content1-line">
                    <div class="content">
                        <div class="contentLable">备注</div>
                        <el-input
                            type="textarea"
                            style="width: 580px"
                            v-model="formData.sRemark"
                        />
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
                    style="
                                                                     background: rgba(56, 109, 240);
                                                                    border: 1px solid #386df0;
                                                                "
                >
                    确定
                </el-button>
            </div>
        </div>
        <tip-pop
            v-if="isTipShow"
            :tipText="tipText"
            :noCancel="noCancel"
            @tipCallBack="tipCallBack"
        ></tip-pop>
    </div>
</template>

<script>
import TipPop from '../../../components/public/tipPop.vue';
import moment from 'moment';

export default {
    props: ['title', 'selectItem'],
    components: {
        TipPop
    },
    data() {
        return {
            isTipShow: false,
            tipText: '',
            noCancel: true,
            formData: {
                sId: '',
                sCode: '',
                sCategory: '',
                sType: 0,
                sStartTime: '',
                sEndTime: '',
                sRemark: '',
                sStaff: '',
                sRefreshTime: '',
                sIsDelete: false
            },
            shiftList: [],
            classList: []
        };
    },

    mounted() {
        if (this.title != '新增班次' && this.selectItem) {
            this.formData = {
                ...this.selectItem,
                ScheduleId: this.selectItem.sId
            };
        }
    },
    computed: {
        calculateHours() {
            console.log(this.formData.sStartTime, this.formData.sEndTime);
            if (!this.formData.sStartTime || !this.formData.sEndTime) {
                return '-';
            }
            let sthList = this.formData.sStartTime.split(':');
            let ethList = this.formData.sEndTime.split(':');
            let sth = sthList[0];
            let eth = ethList[0];
            if (this.formData.sType == 1) {
                eth = Number(eth) + 24;
            }
            let st = sth * 60 + parseInt(sthList[1]);
            let et = eth * 60 + parseInt(ethList[1]);
            console.log(st, et, sth, eth);
            return ((et - st) / 60).toFixed(1);
        }
    },
    methods: {
        tipCallBack(str) {
            this.isTipShow = false;
        },
        handleClick(str) {
            if (str == 'yes') {
                let userid = '';
                if (!JSON.parse(sessionStorage.getItem('userInfo1'))) {
                    userid = JSON.parse(
                        sessionStorage.getItem('sightseerInfo1')
                    ).SCMSUserName;
                } else {
                    userid = JSON.parse(sessionStorage.getItem('userInfo1'))
                        .SCMSUserName;
                }
                if (!this.formData.sCode) {
                    this.isTipShow = true;
                    this.tipText = '班次编码不能为空';
                    return;
                }
                if (!this.formData.sCategory) {
                    this.isTipShow = true;
                    this.tipText = '班次类别不能为空';
                    return;
                }

                if (!this.formData.sStartTime) {
                    this.isTipShow = true;
                    this.tipText = '班次开始时间不能为空';
                    return;
                }
                if (!this.formData.sEndTime) {
                    this.isTipShow = true;
                    this.tipText = '班次结束时间不能为空';
                    return;
                }
                if (this.title == '新增班次') {
                    this.$axios({
                        method: 'post',
                        url: `/api/Class/CreateShift`,
                        data: {
                            ...this.formData,
                            sStaff: userid
                        }
                    }).then(res => {
                        if (res.data.code == 0) {
                            this.$emit('callback', '新增成功！');
                        } else {
                            this.isTipShow = true;
                            this.tipText = res.data.msg;
                        }
                    });
                } else if (this.title == '编辑班次') {
                    this.$axios({
                        method: 'post',
                        url: `/api/Class/UpdateShift`,
                        data: {
                            ...this.formData,
                            sStaff: userid
                        }
                    }).then(res => {
                        if (res.data.code == 0) {
                            this.isTipShow = true;
                            this.$emit('callback', '修改成功！');
                        } else {
                            this.isTipShow = true;
                            this.tipText = res.data.msg;
                        }
                    });
                }
            } else {
                this.$emit('callback');
            }
        }
    }
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
        width: 800px;
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
