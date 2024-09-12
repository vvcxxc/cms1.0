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
            <div class="bulletin-title">
                {{ dataObj.mainTitle }}
                <div class="bulletin-time">{{ nowTime }}</div>
                <div class="bulletin-logo">RAPOW锐湃科技</div>
            </div>
            <div class="bulletin-top">
                <div class="bulletin-btn">
                    <div class="btn4">设备</div>
                    <div class="btn4">物流</div>
                    <div class="btn4">安全</div>
                    <div class="btn4">计划停止</div>
                    <div class="btn4">新机型</div>
                    <div class="btn4">品质</div>
                </div>
                <div class="bulletin-legend">
                    <div class="legend1">正常</div>
                    <div class="legend2">警报</div>
                    <div class="legend3">预警</div>
                    <div class="legend4">呼叫</div>
                </div>
            </div>
            <div class="bulletin-list">
                <div class="list1">
                    <div class="list-title">{{ dataObj.subTitle }}</div>
                    <div class="list-content">
                        数量：
                        <div class="content-num">
                            {{ dataObj.inStationNumber }}
                        </div>
                    </div>
                </div>
                <div class="list2">
                    <div class="list2-content">
                        <template v-for="item in listData">
                            <div
                                class="content-item2"
                                :key="item.workStep"
                                v-if="item.chlid && item.chlid.length"
                            >
                                <div
                                    class="item-group"
                                    v-for="item2 in item.chlid"
                                    :key="item2.workStep"
                                    :style="{ background: getCurItem(item2) }"
                                >
                                    {{ item2.workStep }}
                                </div>
                            </div>
                            <div
                                class="content-item"
                                v-else
                                :key="item.workStep + '2'"
                                :style="{ background: getCurItem(item) }"
                            >
                                {{ item.workStep }}
                            </div>
                        </template>
                    </div>
                </div>
                <div class="list3">
                    <div class="list-title3">{{ dataObj.subTitle }}</div>
                    <div class="list-content3">
                        数量：
                        <div class="content-num3">
                            {{ dataObj.outStationNumber }}
                        </div>
                    </div>
                </div>
            </div>

            <div class="bulletin-alarm">
                <div class="alarm1">
                    <div class="alarm-title">警报信息</div>
                    <div class="alarm-content">
                        <el-carousel
                            height="150px"
                            indicator-position="none"
                            arrow="never"
                            :autoplay="true"
                            loop
                            :interval="5000"
                        >
                            <el-carousel-item
                                v-for="item in dataObj.alarmList"
                                :key="item"
                            >
                                <div class="alarmMsg">{{ item.AlarmMsg }}</div>
                            </el-carousel-item>
                        </el-carousel>
                    </div>
                </div>
                <div class="alarm2">
                    <div class="alarm-title">呼叫信息</div>
                    <div class="alarm-content">
                        <el-carousel
                            height="150px"
                            indicator-position="none"
                            arrow="never"
                            :autoplay="true"
                            loop
                            :interval="5000"
                        >
                            <el-carousel-item
                                v-for="item in dataObj.callingList"
                                :key="item"
                            >
                                <div class="alarmMsg">{{ item.AlarmMsg }}</div>
                            </el-carousel-item>
                        </el-carousel>
                    </div>
                </div>
                <div class="alarm3">
                    <div class="alarm-title">预警信息</div>
                    <div class="alarm-content">
                        <el-carousel
                            height="150px"
                            indicator-position="none"
                            arrow="never"
                            :autoplay="true"
                            loop
                            :interval="5000"
                        >
                            <el-carousel-item
                                v-for="item in dataObj.warningList"
                                :key="item"
                            >
                                <div class="alarmMsg">{{ item.AlarmMsg }}</div>
                            </el-carousel-item>
                        </el-carousel>
                    </div>
                </div>
            </div>
            <div class="bulletin-rate">
                <div class="rate-item">
                    <div class="rate-title">生产节拍器</div>
                    <div class="rate-content">
                        {{ dataObj.takeTime }}
                        <div class="rate-unit">sec</div>
                    </div>
                </div>
                <div class="rate-item">
                    <div class="rate-title">计划产量</div>
                    <div class="rate-content">{{ dataObj.planNumber }}</div>
                </div>
                <div class="rate-item">
                    <div class="rate-title">实际产量</div>
                    <div class="rate-content">{{ dataObj.actualNumber }}</div>
                </div>
                <div class="rate-item">
                    <div class="rate-title">综合开动率</div>
                    <div class="rate-content">
                        {{ dataObj.combinedOperatingRate }}
                        <div class="rate-unit">%</div>
                    </div>
                </div>
                <div class="rate-item">
                    <div class="rate-title">设备开动率</div>
                    <div class="rate-content">
                        {{ dataObj.equipmentOperatingRate }}
                        <div class="rate-unit">%</div>
                    </div>
                </div>
                <div class="rate-item">
                    <div class="rate-title">加班时间</div>
                    <div class="rate-content">
                        {{ dataObj.overTime }}
                        <div class="rate-unit">min</div>
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
    name: 'StationBoard2',
    components: {
        TipPop
    },
    data() {
        return {
            getDataTimer: 0,
            timeTimer: 0,
            nowTime: '',
            lang: JSON.parse(localStorage.getItem('languages'))[
                localStorage.getItem('currentLang')
            ],
            isPopShow: false,
            noCancel: true, // 弹窗是否带取消按按钮
            tipText: '',
            dataObj: {
                alarmList: [],
                callingList: [],
                warningList: [],
                inStationNumber: '',
                outStationNumber: '',
                planNumber: '',
                actualNumber: '',
                combinedOperatingRate: '',
                equipmentOperatingRate: '',
                takeTime: '',
                overTime: '',
                mainTitle: '',
                subTitle: '',
                workStepList: []
            },
            listData: [
                {
                    workStep: '10',
                    chlid: [{ workStep: '10-1' }, { workStep: '10-2' }]
                },
                {
                    workStep: '20'
                },
                {
                    workStep: '30',
                    chlid: [{ workStep: '30-1' }, { workStep: '30-2' }]
                },
                {
                    workStep: '40'
                },
                {
                    workStep: '50',
                    chlid: [{ workStep: '50-1' }, { workStep: '50-2' }]
                },
                {
                    workStep: '50',
                    chlid: [{ workStep: '50-3' }, { workStep: '50-4' }]
                },
                {
                    workStep: '50',
                    chlid: [{ workStep: '50-5' }, { workStep: '50-6' }]
                },
                {
                    workStep: '50',
                    chlid: [{ workStep: '50-7' }, { workStep: '50-8' }]
                },
                {
                    workStep: '50',
                    chlid: [{ workStep: '50-9' }, { workStep: '50-10' }]
                },
                {
                    workStep: '50',
                    chlid: [{ workStep: '50-11' }, { workStep: '50-12' }]
                },
                {
                    workStep: '60',
                    chlid: [{ workStep: '60-1' }, { workStep: '60-2' }]
                },
                {
                    workStep: '70'
                },
                {
                    workStep: '80'
                },
                {
                    workStep: '90',
                    chlid: [{ workStep: '90-1' }, { workStep: '90-2' }]
                },
                {
                    workStep: '100'
                },
                {
                    workStep: '110'
                },
                {
                    workStep: '120'
                },
                {
                    workStep: '130'
                },
                {
                    workStep: '140'
                },
                {}
            ]
        };
    },
    watch: {
        '$store.state.sizeBool'(val) {
            if (!val) {
                setTimeout(() => {
                    $('.StationBoard').css({ paddingTop: 0 });
                });
            } else {
                setTimeout(() => {
                    $('.StationBoard').css({
                        paddingTop:
                            $('.v-toolbar').height() *
                                $('.v-toolbar')[0].style.zoom +
                            'px'
                    });
                });
            }
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
        getNowTime() {
            let _date = new Date();
            this.nowTime = `${_date.getFullYear()}年${_date.getMonth() +
                1}月${_date.getDate()}日 ${_date.getHours()}:${_date.getMinutes()}:${_date.getSeconds()}`;
        },
        getCurItem(item) {
            if (this.dataObj.workStepList && this.dataObj.workStepList.length) {
                let _obj = this.dataObj.workStepList.find(
                    _ => _.StepCode == item.workStep
                );
                if (_obj && _obj.AlarmVariable) {
                    if (_obj.AlarmVariable.Calling == '1') {
                        return '#ff8000'; //呼叫
                    } else if (_obj.AlarmVariable.Alarm == '1') {
                        return '#ff0000'; //报警
                    } else if (_obj.AlarmVariable.Warning == '1') {
                        return '#ffff00'; //预警
                    } else if (_obj.AlarmVariable.Normal == '1') {
                        return '#00ff00'; //正常
                    }
                }
            }
            return '';
        },
        initData() {
            clearTimeout(this.getDataTimer);
            this.$axios({
                method: 'get',
                url: `/api/Dashboard/GetDashboardInfo`
            }).then(res => {
                if (res.data.code == 0) {
                    this.dataObj = res.data.data;
                } else {
                    this.isPopShow = true;
                    this.tipText = res.data.msg;
                }
                this.getDataTimer = setTimeout(() => {
                    this.initData();
                }, 2000);
            });
        },
        clearTimerFn() {
            this.$store.state.sizeBool = true;
            clearInterval(this.timeTimer);
            clearTimeout(this.getDataTimer);
        }
    },
    destroyed() {
        this.clearTimerFn();
    },
    beforeDestroy() {
        this.clearTimerFn();
    },
    mounted() {
        this.clearTimerFn();
        this.width = window.screen.width;
        this.zoom = this.width / 1920 < 0.8 ? 0.8 : this.width / 1920;
        setTimeout(() => {
            $('.StationBoard').css({
                paddingTop:
                    $('.v-toolbar').height() * $('.v-toolbar')[0].style.zoom +
                    'px',
                paddingBottom:
                    $('.v-footer').height() * $('.v-footer')[0].style.zoom +
                    'px'
            });
        });
        clearInterval(this.timeTimer);
        this.timeTimer = setInterval(() => this.getNowTime(), 1000);

        document.addEventListener('keyup', e => {
            let keyvalue = e.keyCode ? e.keyCode : e.which;
            if (keyvalue == 27 && !this.sizeBool) {
                this.$store.state.sizeBool = true;
            }
        });

        this.initData();
    }
};
</script>

<style lang="scss" scoped>
.StationBoard {
    height: 100vh;
    width: 100vw;
    padding-top: 90px;
    padding-bottom: 40px;
    box-sizing: border-box;
    background-image: url('./images/4bg.png');
    background-size: 100% 100%;
    background-repeat: no-repeat;

    .StationBoard-content {
        width: 100%;
        height: 100%;
        background-image: url('./images/2.png');
        background-size: 100% 180px;
        background-repeat: no-repeat;
        background-position: top;

        .bulletin-title {
            width: 100%;
            height: 110px;
            padding-bottom: 20px;
            box-sizing: border-box;
            display: flex;
            align-items: flex-end;
            justify-content: center;
            color: #000;
            font-size: 44px;
            font-weight: bold;
            line-height: 1;
            position: relative;
            color: #0b9cd7;

            .bulletin-time {
                position: absolute;
                right: 10px;
                top: 15px;
                font-size: 24px;
                color: #0b9cd7;
            }

            .bulletin-logo {
                position: absolute;
                left: 10px;
                top: 15px;
                font-size: 24px;
                color: #0b9cd7;
            }
        }

        .bulletin-top {
            height: 70px;
            width: 100%;
            display: flex;
            align-items: flex-end;
            justify-content: space-between;
            padding: 0 80px 0 20px;
            box-sizing: border-box;

            .bulletin-btn {
                display: flex;
                align-items: flex-end;
                justify-content: flex-start;

                .btn1,
                .btn2,
                .btn3,
                .btn4 {
                    width: 150px;
                    height: 50px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #fff;
                    font-size: 30px;
                    font-weight: bold;
                    background-size: 100% 100%;
                    background-repeat: no-repeat;
                    margin-right: 15px;
                    cursor: pointer;
                }

                .btn1 {
                    background-image: url('./images/64.png');
                }

                .btn2 {
                    background-image: url('./images/66.png');
                }

                .btn3 {
                    background-image: url('./images/65.png');
                }

                .btn4 {
                    background-image: url('./images/67.png');
                }
            }

            .bulletin-legend {
                width: 240px;
                display: flex;
                flex-wrap: wrap;

                .legend1,
                .legend2,
                .legend3,
                .legend4 {
                    color: #00ff00;
                    width: 120px;
                    position: relative;
                    font-size: 22px;
                }

                .legend1::after,
                .legend2::after,
                .legend3::after,
                .legend4::after {
                    content: '';
                    width: 40px;
                    height: 20px;
                    border-radius: 3px;
                    background-color: #00ff00;
                    position: absolute;
                    left: 50px;
                    top: 50%;
                    transform: translate(0, -50%);
                }

                .legend2 {
                    color: #ff0000;
                }

                .legend2::after {
                    background-color: #ff0000;
                }

                .legend3 {
                    color: #ffff00;
                }

                .legend3::after {
                    background-color: #ffff00;
                }

                .legend4 {
                    color: #ff8000;
                }

                .legend4::after {
                    background-color: #ff8000;
                }
            }
        }

        .bulletin-list {
            width: 100%;
            height: calc(100% - 570px);
            display: flex;

            padding: 0 20px;
            box-sizing: border-box;

            .list1 {
                width: 200px;
                height: 100%;
                display: flex;
                flex-direction: column;
                align-items: flex-start;
                justify-content: flex-start;
                color: #fff;
                font-size: 24px;
                padding: 10px 0 0 30px;
                font-weight: bold;
                position: relative;

                .list-title {
                    font-size: 30px;
                    height: 38px;
                    line-height: 45px;
                    z-index: 1;
                }

                .list-content {
                    font-size: 30px;
                    margin-top: 10px;
                    z-index: 1;

                    .content-num {
                        display: inline-block;
                        font-size: 60px;
                        vertical-align: bottom;
                        line-height: 1;
                    }
                }
            }

            .list1::after {
                content: '';
                width: 150px;
                height: 90px;
                position: absolute;
                right: 0;
                top: 15px;
                transform: translate(10%, 0);
                background-image: url('./images/68.png');
                background-size: 100% 100%;
                background-repeat: no-repeat;
                z-index: 0;
            }

            .list3 {
                width: 200px;
                height: 100%;
                display: flex;
                flex-direction: column;
                align-items: flex-start;
                justify-content: flex-end;
                color: #fff;
                font-size: 24px;
                padding: 0 0 30px 40px;
                font-weight: bold;
                position: relative;

                .list-title3 {
                    font-size: 30px;
                    height: 38px;
                    line-height: 45px;
                    z-index: 1;
                }

                .list-content3 {
                    font-size: 30px;
                    z-index: 1;
                    margin-top: 10px;

                    .content-num3 {
                        display: inline-block;
                        font-size: 60px;
                        vertical-align: bottom;
                        line-height: 1;
                    }
                }
            }

            .list3::before {
                content: '';
                width: 150px;
                height: 90px;
                position: absolute;
                left: 0;
                bottom: 15px;
                transform: translate(-50%, 0);
                background-image: url('./images/68.png');
                background-size: 100% 100%;
                background-repeat: no-repeat;
                z-index: 0;
            }

            .list2 {
                width: calc(100% - 400px);
                height: 100%;
                padding: 20px;
                box-sizing: border-box;

                .list2-content {
                    width: 100%;
                    height: 100%;
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: space-between;
                    align-items: space-between;

                    .content-item {
                        width: 9.8%;
                        height: 49%;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        background: #808080;
                        color: #000;
                        font-weight: bold;
                        font-size: 30px;
                        z-index: 3;
                    }

                    .content-item2 {
                        width: 9.8%;
                        height: 49%;
                        display: flex;
                        flex-direction: column;
                        justify-content: space-between;
                        align-items: space-between;
                        color: #000;
                        font-weight: bold;
                        font-size: 30px;
                        z-index: 3;

                        .item-group {
                            width: 100%;
                            height: 49%;
                            background: #808080;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                        }
                    }
                }
            }
        }

        .bulletin-alarm {
            width: 100%;
            display: flex;
            align-items: flex-end;
            justify-content: space-between;
            padding: 0 20px;
            box-sizing: border-box;

            .alarm1,
            .alarm2,
            .alarm3 {
                width: 30%;
                height: 200px;
                padding-left: 15px;
                background-image: url('./images/63.png');
                background-size: 100% 100%;
                background-repeat: no-repeat;

                .alarm-title {
                    color: #fff;
                    height: 50px;
                    line-height: 65px;
                    font-size: 20px;
                    font-weight: bold;
                }

                .alarm-content {
                    width: 100%;
                    height: calc(100% - 50px);
                    color: #fff;
                    font-size: 30px;

                    .alarmMsg {
                        height: 150px;
                        display: flex;
                        align-items: center;
                        line-height: 1;
                        font-size: 50px;
                    }
                }
            }

            .alarm2 {
                background-image: url('./images/62.png');
            }

            .alarm3 {
                background-image: url('./images/61.png');

                .alarm-title {
                    color: #000;
                }
            }
        }

        .bulletin-rate {
            width: 100%;
            height: 170px;
            display: flex;
            align-items: flex-end;
            justify-content: space-between;
            padding: 20px 20px 0;
            box-sizing: border-box;

            .rate-item {
                width: 15%;
                height: 100%;
                padding-left: 25px;
                background-image: url('./images/6.png');
                background-size: 100% 100%;
                background-repeat: no-repeat;
                color: #fff;
                display: flex;
                flex-direction: column;
                align-items: flex-start;
                justify-content: center;

                .rate-title {
                    font-size: 24px;
                    font-weight: bold;
                }

                .rate-content {
                    font-size: 50px;
                    font-weight: bold;

                    .rate-unit {
                        font-size: 20px;
                        display: inline-block;
                        vertical-align: baseline;
                    }
                }
            }
        }
    }
}
</style>
