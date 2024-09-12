<template>
    <div class="zdeditPop">
        <div class="myDialog" id="myDialog">
            <div class="popHeader">
                查看保养执行结果
                <img :src="require('../../assets/images/no.png')" alt="" @click="handleClick" class="close" />
            </div>
            <div class="popContent">
                <CurrentTitle title="保养信息" :line="true" />
                <div class="content1-line">
                    <div class="content">
                        <div class="contentLable">计划名称</div>
                        <div class="contentVal">{{ formData.PlanName }}</div>
                    </div>
                    <div class="content">
                        <div class="contentLable">保养人</div>
                        <div class="contentVal">{{ formData.MaintenancePerson }}</div>
                    </div>
                </div>
                <div class="content1-line">
                    <div class="content">
                        <div class="contentLable">设备名称</div>
                        <div class="contentVal">{{ formData.DeviceName }}</div>
                    </div>
                    <div class="content">

                    </div>
                </div>
                <div class="content1-line">
                    <div class="content">
                        <div class="contentLable">任务开始时间</div>
                        <div class="contentVal">{{ formData.StartTime }}</div>
                    </div>
                    <div class="content">
                        <div class="contentLable">任务执行工期</div>
                        <div class="contentVal">
                            <div>{{ formData.displayTimeDiff }}</div>
                            <div class="unit">{{ changeUnit(formData.displayTimeDiffUnit) }}</div>
                        </div>
                    </div>
                </div>
                <div class="content1-line">
                    <div class="content">
                        <div class="contentLable">重复任务周期</div>
                        <div class="contentVal">
                            <div>{{ formData.PeriodValue }}</div>
                            <div class="unit"> {{ changeUnit(formData.PeriodUnit) }}
                            </div>
                        </div>
                    </div>
                    <div class="content">
                        <div class="contentLable">计划到期时间</div>
                        <div class="contentVal">{{ formData.MaturityTime }}</div>
                    </div>
                </div>
                <div class="content1-line">
                    <div class="content">
                        <div class="contentLable">任务提前提醒</div>
                        <div class="contentVal">
                            <div>{{ formData.ReminderTimeValue }}</div>
                            <div class="unit">{{ changeUnit(formData.ReminderTimeUnit) }} </div>
                        </div>
                    </div>
                    <div class="content">
                        <div class="contentLable">计划执行状态</div>
                        <div class="contentVal">{{ formData.displayStatus }}</div>
                    </div>
                </div>
                <div class="content1-line">
                    <div class="content">
                        <div class="contentLable">任务执行内容</div>
                        <div class="contentAreaVal">{{ formData.Remarks }}</div>
                    </div>

                </div>

            </div>
            <div class="popBtn">
                <el-button class="btn" @click="handleClick('yes')" style="
                                                                     background: rgba(56, 109, 240);
                                                                    border: 1px solid #386df0;
                                                                ">
                    确定
                </el-button>
            </div>
        </div>
        <tip-pop v-if="isTipShow" :tipText="tipText" :noCancel="noCancel" @tipCallBack="tipCallBack"></tip-pop>

    </div>
</template>

<script>
import CurrentTitle from '../../components/public/currentTitle.vue';
import TipPop from '../../components/public/tipPop.vue';

export default {
    props: ['WorkName'],
    components: {
        CurrentTitle,
        TipPop
    },
    data() {
        return {
            isTipShow: false,
            tipText: '',
            noCancel: true,
            formData: {
                DeviceName: '',
                Foreground: '',
                TID: '',
                PID: '',
                PlanName: '',
                MaintenancePerson: '',
                AID: '',
                StartTime: '',
                EndTime: '',
                PeriodValue: '',
                PeriodUnit: '',
                MaturityTime: '',
                ReminderTimeValue: '',
                ReminderTimeUnit: '',
                Remarks: null,
                CloseRemarks: null,
                RemindTime: '',
                FinishTime: '',
                Status: 0,
                SynchronizeToSOP: false,
                SCMSMaintenancePlan: null,
                displayStatus: '',
                displayTimeDiff: '',
                displayTimeDiffUnit: ''
            },
        };
    },

    mounted() {
        if (!this.WorkName) {
            this.$emit('callback', '当前无工序');
            return
        }
        this.$axios({
            method: 'post',
            url: `/api/MaintenanceManage/MaintenanceManage_GstLastInfo?deviceName=${this.WorkName}`,
        }).then(res => {
            if (res.data.code === 0) {
                this.formData = {
                    ...res.data.data,
                    displayStatus: '启用'//能进这里一定是启用
                }
                console.log(this.formData)
                this.intervalTime()
            } else {
                this.$emit('callback', res.data.msg);
            }
        })


    },

    methods: {
        changeUnit(num) {
            switch (num) {
                case 1:
                    return '小时';
                case 2:
                    return '天';
                case 3:
                    return '周';
                case 4:
                    return '月';
                default:
                    return num;
            }
        },
        intervalTime() {
            if (!this.formData.StartTime || !this.formData.EndTime) {
                this.formData.displayTimeDiff = ''
                this.formData.displayTimeDiffUnit = ''
                return
            }
            let date1 = new Date(this.formData.StartTime).getTime();
            let date2 = new Date(this.formData.EndTime).getTime();
            let timestamp_diff = (date2 - date1)

            // 将毫秒数转换为小时数
            let hours_diff = timestamp_diff / 3600000
            if (hours_diff < 24) {
                this.formData.displayTimeDiff = Math.floor(hours_diff)
                this.formData.displayTimeDiffUnit = '小时'
                return
            }

            let days_diff = timestamp_diff / 86400000
            if (days_diff < 7) {
                this.formData.displayTimeDiff = Math.floor(days_diff)
                this.formData.displayTimeDiffUnit = '天'
                return
            }

            let weeks_diff = timestamp_diff / 604800000
            if (weeks_diff < 4) {
                this.formData.displayTimeDiff = Math.floor(weeks_diff)
                this.formData.displayTimeDiffUnit = '周'
                return
            }


            let months_diff = timestamp_diff / 2592000000
            if (months_diff < 12) {
                this.formData.displayTimeDiff = Math.floor(months_diff)
                this.formData.displayTimeDiffUnit = '月'
                return
            }

            let years_diff = timestamp_diff / 946080000000
            this.formData.displayTimeDiff = Math.floor(years_diff)
            this.formData.displayTimeDiffUnit = '年'

        },
        tipCallBack(str) {
            if (str == 'yes') {

            }
            this.isTipShow = false;
            this.noCancel = true;
        },


        handleClick() {
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
        width: 820px;
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

                    .contentLable {
                        width: 110px;
                        text-align: right;
                        font-size: 14px;
                        color: #363636;
                        margin-right: 10px;
                    }

                    .contentVal {
                        border: 1px solid #c2c2c2;
                        width: 230px;
                        height: 40px;
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        padding-left: 5px;
                        box-sizing: border-box;
                        color: #363636;
                        background: #fdfcfc;

                        .unit {
                            border-left: 1px solid #c2c2c2;
                            height: 100%;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            padding: 0 10px;
                            box-sizing: border-box;
                            width: 80px;
                            text-align: center;
                        }
                    }

                    .contentAreaVal {
                        border: 1px solid #c2c2c2;
                        width: 600px;
                        height: 60px;
                        padding-left: 5px;
                        box-sizing: border-box;
                        color: #363636;
                        background: #fdfcfc;
                        line-height: 1.2;
                    }

                }

            }


            .flex-box {
                width: 100%;
                height: 300px;
                display: flex;

                .flex-l {
                    flex: 3;
                    height: 100%;
                    margin-right: 10px;
                }

                .flex-r {
                    flex: 2;
                    height: 100%;
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

                .table {
                    width: 100%;
                    height: calc(100% - 50px);
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