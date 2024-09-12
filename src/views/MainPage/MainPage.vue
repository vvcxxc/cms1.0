
<template>
    <div class="MainPage-container-page">
        <div class="MainPage-content" :class="{ blackBlueBg: $store.state.color === 'blackBlue' }"
            @click="clearShowListType">
            <div class="tip" ref="kongtiao2" v-if="tipchange">
                <div class="tiptop" @mousedown="mouseDownHandleelse2($event)" @mouseup="mouseUpHandleelse2($event)">
                    <img src="../../assets/images/gth.png" alt />
                    <span>提示</span>
                </div>
                <div class="tipcontanin">
                    <div class="tipword">{{ tipword }}</div>
                    <div class="tipdetermine" @click="tip1">确定</div>
                </div>
            </div>
            <div class="MainPage-banner">
                <div class="MainPage-banner-mask" v-show="this.showListType == 'Online'">
                    <div class="MainPage-banner-info green" v-for="(item, idx) in this.OnlineList" :key="idx">
                        {{ item }}
                    </div>
                </div>
                <div class="MainPage-banner-mask" v-show="this.showListType == 'OffLine'">
                    <div class="MainPage-banner-info" v-for="(item, idx) in this.OffLineList" :key="idx">
                        {{ item }}
                    </div>
                </div>
                <div class="MainPage-banner-mask" v-show="this.showListType == 'Normal'">
                    <div class="MainPage-banner-info green" v-for="(item, idx) in this.NormalList" :key="idx">
                        {{ item }}
                    </div>
                </div>
                <div class="MainPage-banner-mask" v-show="this.showListType == 'Alarm'">
                    <div class="MainPage-banner-info red" v-for="(item, idx) in this.AlarmList" :key="idx">
                        {{ item }}
                    </div>
                </div>
            </div>
            <div class="MainPage-container">
                <div class="MainPage-num">
                    <div class="MainPage-num-item" @click="PLCOnlineSentInfoToMain">
                        <div class="MainPage-num-title">在线</div>
                        <div class="MainPage-num-info">{{ Online }}</div>
                    </div>
                    <div class="MainPage-num-item" @click="PLCOfflineSentInfoToMain">
                        <div class="MainPage-num-title">离线</div>
                        <div class="MainPage-num-info">{{ OffLine }}</div>
                    </div>
                    <div class="MainPage-num-item" @click="PLCAlarmSentInfoToMain">
                        <div class="MainPage-num-title">报警</div>
                        <div class="MainPage-num-info red">{{ Alarm }}</div>
                    </div>
                    <div class="MainPage-num-item" @click="PLCNormalSentInfoToMain">
                        <div class="MainPage-num-title">正常</div>
                        <div class="MainPage-num-info green">{{ Normal }}</div>
                    </div>
                </div>
                <div class="MainPage-label">
                    <div class="MainPage-label-title">耗电量</div>
                    <div class="MainPage-label-unit">kw</div>
                </div>
                <div class="Power-num">
                    <div class="Power-num-item">
                        <div class="Power-num-title">昨日耗电</div>
                        <div class="Power-num-info">{{ YesterdayPower }}</div>
                    </div>
                    <div class="Power-num-item">
                        <div class="Power-num-title">上月耗电</div>
                        <div class="Power-num-info">{{ MonthPower }}</div>
                    </div>
                    <div class="Power-num-item">
                        <div class="Power-num-title">实时耗电</div>
                        <div class="Power-num-info">{{ TenMinutesPower }}</div>
                    </div>
                </div>
                <div class="MainPage-label">
                    <div class="MainPage-label-title">产量统计</div>
                    <div class="MainPage-label-unit">钵</div>
                </div>
                <div class="Output-statistics">
                    <div class="Output-num-item">
                        <div class="Output-num-title">昨日产量</div>
                        <div class="Output-num-info">
                            {{ ProductionOfYesterday }}
                        </div>
                    </div>
                    <div class="Output-num-item">
                        <div class="Output-num-title">月产量</div>
                        <div class="Output-num-info">
                            {{ ProductionOfMonth }}
                        </div>
                    </div>
                    <div class="Output-num-item">
                        <div class="Output-num-title">早班次</div>
                        <div class="Output-num-info">
                            {{ ProductionOfShiftA }}
                        </div>
                    </div>
                    <div class="Output-num-item">
                        <div class="Output-num-title">晚班次</div>
                        <div class="Output-num-info">
                            {{ ProductionOfShifB }}
                        </div>
                    </div>
                </div>
                <div class="MainPage-label">
                    <div class="MainPage-label-title">能耗统计</div>
                    <div class="seleword-box">
                        <div class="seleword" @click="openSelect">
                            <div class="selectword1">
                                {{ curSelectItem.Name }}
                                <img src="../../assets/images/PullDown.png" />
                            </div>
                        </div>
                        <div class="selectword2" v-show="selectShow">
                            <div v-for="item in KilnsList" :key="item.Id" :class="
                                item.Name == curSelectItem.Name
                                    ? 'type-node-select'
                                    : 'type-node'
                            " @click="handleSelectItem(item)">
                                {{ item.Name }}
                            </div>
                        </div>
                    </div>
                    <div class="MainPage-label-unit">
                        M
                        <span>3</span>
                    </div>
                </div>
                <div class="MainPage-table">
                    <el-table ref="elTable" :data="tableData" height="100%" style="width: 100%" :border="true"
                        :header-cell-style="{
                            background:
                                $store.state.color == 'grey'
                                    ? '#D9DBDE'
                                    : '#223046',
                            color:
                                $store.state.color == 'grey' ? '#000' : '#fff',
                            height: '45px',
                        }">
                        <el-table-column prop="Tag" width="75" :resizable="false" />
                        <el-table-column prop="燃气" label="燃气" width="174" :resizable="false" />
                        <el-table-column prop="氮气" label="氮气" width="174" :resizable="false" />
                        <el-table-column prop="冷却水" label="冷却水" width="174" :resizable="false" />
                    </el-table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    components: {},
    data() {
        return {
            tipword: '',
            tipchange: false,
            Alarm: '',
            Online: '',
            Normal: '',
            OffLine: '',
            OnlineList: [],
            OffLineList: [],
            NormalList: [],
            AlarmList: [],
            showListType: '',
            TenMinutesPower: '',
            YesterdayPower: '',
            MonthPower: '',
            ProductionOfShiftA: '',
            ProductionOfShifB: '',
            ProductionOfYesterday: '',
            ProductionOfMonth: '',
            KilnsList: [],
            selectShow: false,
            curSelectItem: {},
            timer: 0,
            timer2: 0,
            tableData: [],
        };
    },
    computed: {},
    methods: {
        tip1() {
            this.tipchange = false;
        },
        mouseDownHandleelse2(event) {
            event.currentTarget.style.cursor = 'move';
            window.onmousemove = this.mouseMoveHandleelse2;
        },
        mouseMoveHandleelse2(event) {
            let moveLeft = event.pageX - 100 + 'px';
            let moveTop = event.pageY + 80 + 'px';
            this.$refs.kongtiao2.style.left = moveLeft;
            this.$refs.kongtiao2.style.top = moveTop;
        },
        mouseUpHandleelse2(event) {
            window.onmousemove = null;
            event.currentTarget.style.cursor = 'move';
        },
        openSelect() {
            this.selectShow = !this.selectShow;
        },
        handleSelectItem(item) {
            this.curSelectItem = item;
            this.selectShow = false;
            clearInterval(this.timer);
            clearInterval(this.timer2);
            this.FuelCalculateSendToMain();
            this.setTimeSearch();
        },
        //数量
        PLCStateSentCountToMain() {
            this.$axios
                .get(`/api/MainWindowData/GetPLCStateCount`)
                .then((res) => {
                    if (res.data.code == 0) {
                        let { OnlineCount, OffLineCount, AlarmCount, NormalCount } = res.data.data;
                        this.Alarm = AlarmCount;
                        this.Normal = NormalCount;
                        this.OffLine = OffLineCount;
                        this.Online = OnlineCount;
                    } else {
                        this.tipword = res.data.msg;
                        this.tipchange = true;
                    }
                });
        },
        clearShowListType() {
            this.showListType = '';
        },
        searchList(type) {
            this.$axios
                .get(`/api/MainWindowData/GetPLCTootip?stateEnum=${type}`)
                .then((res) => {
                    if (res.data.code == 0) {
                        if (type == 1) {
                            this.OnlineList = res.data.data;
                            this.showListType = 'Online';
                        } else if (type == 2) {
                            this.OffLineList = res.data.data;
                            this.showListType = 'OffLine';
                        } else if (type == 3) {
                            this.AlarmList = res.data.data;
                            this.showListType = 'Alarm';
                        } else if (type == 4) {
                            this.NormalList = res.data.data;
                            this.showListType = 'Normal';
                        }
                    } else {
                        this.tipword = res.data.msg;
                        this.tipchange = true;
                    }
                });
        },
        //在线列表
        PLCOnlineSentInfoToMain() {
            this.searchList(1)
        },
        //离线列表
        PLCOfflineSentInfoToMain() {
            this.searchList(2)
        },
        //正常列表
        PLCNormalSentInfoToMain() {
            this.searchList(4)
        },
        //报警列表
        PLCAlarmSentInfoToMain() {
            this.searchList(3)
        },
        //获取窑炉列表
        GetKilnsTypesList() {
            this.$axios
                .get(`/api/MainWindowData/GetKilnList`)
                .then((res) => {
                    if (res.data.code == 0) {
                        this.KilnsList = res.data.data;
                        this.curSelectItem = res.data.data[0];
                        this.FuelCalculateSendToMain();
                    } else {
                        this.tipword = res.data.msg;
                        this.tipchange = true;
                    }
                });
        },
        //产量统计接口
        OutputStatisticsSendToMain() {
            this.$axios
                .get(`/api/MainWindowData/GetProduction`)
                .then((res) => {
                    if (res.data.code == 0) {
                        let {
                            AShiftProduction,
                            BShiftProduction,
                            DayProduction,
                            MonthProduction,
                        } = res.data.data;
                        this.ProductionOfShiftA = AShiftProduction;
                        this.ProductionOfShifB = BShiftProduction;
                        this.ProductionOfYesterday = DayProduction;
                        this.ProductionOfMonth = MonthProduction;
                    } else {
                        this.tipword = res.data.msg;
                        this.tipchange = true;
                    }
                });
        },
        //耗电量统计接口
        PowerCalculateSendToMain() {
            this.$axios
                .get(`/api/MainWindowData/GetPower`)
                .then((res) => {
                    if (res.data.code == 0) {
                        let { TenMinutePower, LastDayPower, MonthPower } =
                            res.data.data;
                        this.TenMinutesPower = TenMinutePower;
                        this.YesterdayPower = LastDayPower;
                        this.MonthPower = MonthPower;
                    } else {
                        this.tipword = res.data.msg;
                        this.tipchange = true;
                    }
                });
        },
        //耗能统计接口
        FuelCalculateSendToMain() {
            this.$axios
                .get(
                    `/api/MainWindowData/GetEneryReport?kiln=${Number(
                        this.curSelectItem.Id
                    )}`
                )
                .then((res) => {
                    if (res.data.code == 0) {
                        let data=res.data.data;
                        this.tableData = [
                            {
                                Tag: '实时',
                                '燃气': data.CurFuelGas, 
                                '氮气': data.CurNitrogen, 
                                '冷却水': data.CurCoolWater 
                            },
                            {
                                Tag: '上月',
                                '燃气': data.LMFuelGas, 
                                '氮气': data.LMNitrogen, 
                                '冷却水': data.LMCoolWater 
                            },
                            {
                                Tag: '本月' ,
                                '燃气': data.CMFuelGas, 
                                '氮气': data.CMNitrogen, 
                                '冷却水': data.CMCoolWater
                            }
                        ];
                    } else {
                        this.tipword = res.data.msg;
                        this.tipchange = true;
                    }
                });
        },
        setTimeSearch() {
            this.timer = setInterval(() => {
                this.searchData(); //轮询实时刷新
            }, 5000);
            this.timer2 = setInterval(() => {
                this.PLCStateSentCountToMain();
            }, 2000);
        },
        searchData(isFirst) {
            if (isFirst) {
                this.GetKilnsTypesList();
                this.PLCStateSentCountToMain();
            } else {
                this.FuelCalculateSendToMain();
                //以下四条是四条设备状态
                switch (this.showListType) {
                    case 'Online':
                        this.PLCOnlineSentInfoToMain();
                        break;
                    case 'OffLine':
                        this.PLCOfflineSentInfoToMain();
                        break;

                    case 'Normal':
                        this.PLCNormalSentInfoToMain();
                        break;

                    case 'Alarm':
                        this.PLCAlarmSentInfoToMain();
                        break;
                }
            }
            this.PowerCalculateSendToMain();
            this.OutputStatisticsSendToMain();
        },
    },
    mounted() {
        this.searchData(true);
        this.setTimeSearch();
    },
    beforeDestroy() {
        clearInterval(this.timer);
        clearInterval(this.timer2);
    },
};
</script>
<style>
.MainPage-content .el-table--border td,
.MainPage-content .el-table--border th,
.MainPage-content .el-table__body-wrapper .el-table--border.is-scrolling-left~.el-table__fixed {
    border-right: 1px solid #21324f;
}

.MainPage-content .el-table--border,
.MainPage-content .el-table--group {
    border: none;
}

.MainPage-content .el-table,
.MainPage-content .el-table__expanded-cell {
    background-color: transparent;
    position: unset;
}

.MainPage-content .el-table td,
.MainPage-content .el-table th.is-leaf {
    border-bottom: 1px solid #0c1b30;
}

.MainPage-content .el-table__row {
    background: #1e304a;
    color: #fff;
}

.MainPage-content .el-table::before {
    height: 0;
}

.MainPage-content .el-table__row:hover {
    color: #1e304a;
}

.blackBlueBg .el-table--enable-row-hover .el-table__body tr:hover>td {
    background: #1e304a;
    color: #fff;
}

.MainPage-content .el-table--scrollable-x .el-table__body-wrapper {
    overflow: hidden;
}
</style>
<style lang="scss" scoped>
.MainPage-container-page {
    // width: clac(100% -40px);
    // height: 100%;
    width: 100%;
    height: 86vh;
    color: #000;
    margin-top: 100px;
    display: flex;
    background-color: #eee;
    box-sizing: border-box;
}

.MainPage-content {
    width: 100%;
    height: 100%;
    background-color: #081027;
    color: #fff;
    padding: 30px;
    box-sizing: border-box;
    display: flex;

    .red {
        color: #fc1e0f;
    }

    .green {
        color: #48fe44;
    }

    &.blackBlueBg {
        background-color: #081027;
        box-shadow: 0 3px 6px 0 rgb(0 0 0 / 16%);
        color: #fff;
    }

    .MainPage-banner {
        flex: 1;
        height: 100%;
        background-image: url('../../assets/images/Maingraph.png');
        background-repeat: no-repeat;
        background-size: 100% 100%;
        position: relative;

        .MainPage-banner-mask {
            width: 300px;
            height: 100%;
            position: absolute;
            top: 0;
            right: 0;
            background: rgba(0, 0, 0, 0.7);
            padding: 16px 8px;
            box-sizing: border-box;
            overflow-y: scroll;

            .MainPage-banner-info {
                width: 100%;
                height: auto;
                color: #fff;
                margin-bottom: 16px;
            }
        }

        .MainPage-banner-mask::-webkit-scrollbar {
            width: 0 !important;
        }
    }

    .MainPage-container {
        width: 670px;
        padding: 0 37px;
        box-sizing: border-box;
        height: 100%;

        .MainPage-num {
            display: flex;
            align-items: center;
            justify-content: space-around;
            margin-bottom: 30px;

            .MainPage-num-item {
                width: 148px;
                height: 104px;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                background-image: url('../../assets/images/DeviceStatusBox.png');
                background-repeat: no-repeat;
                background-size: 100% 100%;
                padding-top: 10px;
                box-sizing: border-box;
                cursor: pointer;

                .MainPage-num-title {
                    font-size: 20px;
                    margin-bottom: 8px;
                }

                .MainPage-num-info {
                    font-size: 22px;
                }
            }
        }

        .MainPage-label {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 18px;
            position: relative;
            z-index: 10;

            .MainPage-label-title {
                font-size: 22px;
                color: #fc8331;
                position: relative;
            }

            .MainPage-label-title::after {
                content: '';
                width: 31px;
                height: 31px;
                position: absolute;
                top: 50%;
                transform: translate(0, -50%);
                background-image: url('../../assets/images/Decorativearrow.png');
                background-repeat: no-repeat;
                background-size: 100% 100%;
            }

            .MainPage-label-unit {
                width: 66px;
                height: 26px;
                background: #1b3758;
                border-radius: 2px;
                font-size: 18px;
                display: flex;
                justify-content: center;

                span {
                    font-size: 12px;
                    vertical-align: top;
                }
            }

            .seleword-box {
                position: absolute;
                right: 88px;
                top: 50%;
                transform: translate(0, -50%);
                width: fit-content;
                height: 40px;
                display: flex;
                align-items: center;
                justify-content: flex-start;
                cursor: pointer;

                .el-date-editor.el-input,
                .el-date-editor.el-input__inner {
                    width: 200px;
                    border-radius: unset;
                }

                div {
                    word-break: keep-all;
                    white-space: nowrap;
                }

                .time-middle {
                    display: inline-block;
                    width: 26px;
                    text-align: center;
                }

                .seleword {
                    display: inline-block;
                    width: 240px;
                    height: 36px;
                    background: #1f3145;
                    border-radius: 2px;

                    .el-dropdown {
                        width: 100%;
                        height: 100%;
                        position: absolute;
                        left: 0;
                        top: 0;
                    }

                    .selectword1 {
                        width: 100%;
                        height: 100%;
                        display: flex;
                        align-items: center;
                        padding-left: 16px;
                        position: relative;
                        box-sizing: border-box;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                        overflow: hidden;
                        word-break: break-all;

                        img {
                            position: absolute;
                            right: 2px;
                            width: 20px;
                            height: 20px;
                            top: 10px;
                        }
                    }
                }

                .selectword2 {
                    width: 100%;
                    height: auto;
                    max-height: 200px;
                    color: #000;
                    position: absolute;
                    bottom: 0;
                    right: 0;
                    transform: translate(0, 100%);
                    z-index: 999;
                    overflow-y: scroll;
                    background: #1e304a;
                    color: #fff;

                    .type-node {
                        padding: 8px 16px;
                    }

                    .type-node-select {
                        padding: 8px 16px;
                        background: #273e7e;
                        color: #409eff;
                    }
                }

                .selectword2::-webkit-scrollbar {
                    width: 0 !important;
                }
            }
        }

        .Power-num {
            margin-bottom: 30px;

            .Power-num-item {
                display: flex;
                align-items: center;
                justify-content: flex-start;
                padding-bottom: 5px;
                height: 48px;
                width: 100%;
                padding-left: 45px;
                box-sizing: border-box;
                background-image: url('../../assets/images/PowerConsumptionBox.png');
                background-repeat: no-repeat;
                background-size: 100% 100%;

                .Power-num-title {
                    width: 105px;
                    font-size: 20px;
                    color: #ffffff;
                }

                .Power-num-info {
                    font-size: 20px;
                    color: #30c9fc;
                }
            }
        }

        .Output-statistics {
            display: flex;
            align-items: center;
            justify-content: space-around;
            margin-bottom: 25px;

            .Output-num-item {
                width: 124px;
                height: 80px;
                padding-bottom: 8px;
                box-sizing: border-box;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: space-between;
                background-image: url('../../assets/images/OutputStatisticsBox.png');
                background-repeat: no-repeat;
                background-size: 100% 100%;

                .Output-num-title {
                    padding-left: 16px;
                    box-sizing: border-box;
                    width: 100%;
                    height: 20px;
                    font-size: 20px;
                    color: #ffffff;
                }

                .Output-num-info {
                    font-size: 20px;
                    color: #18e4b5;
                }
            }
        }

        .MainPage-table {
            width: 100%;
            height: 180px;
            overflow-y: scroll;
        }

        .MainPage-table::-webkit-scrollbar {
            width: 0 !important;
        }
    }

    .tip {
        position: fixed;
        width: 380px;
        height: 200px;
        z-index: 100;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        box-shadow: 0px 0px 8px black;
        background-color: #f3f3f4;

        .tiptop {
            width: 380px;
            height: 40px;
            background-color: #ffbc3d;

            img {
                width: 20px;
                height: 20px;
                margin-top: 10px;
                margin-left: 160px;
            }

            span {
                color: #ffffff;
                position: relative;
                top: -5px;
                margin-left: 7px;
            }
        }

        .tipword {
            width: 100%;
            margin-top: 40px;
            text-align: center;
        }

        .w {
            width: 100%;
            margin-top: 40px;
            text-align: center;
        }

        .tipdetermine {
            color: #ea9328;
            cursor: pointer;
            width: 310px;
            line-height: 30px;
            text-align: center;
            // margin-top: 40px;
            position: absolute;
            bottom: 20px;
            margin-left: 35px;
            height: 30px;
            background-color: #f3e3ad;
        }

        .delclass {
            width: 330px;
            line-height: 30px;
            margin-top: 40px;
            margin-left: 25px;
            height: 30px;

            .one {
                display: inline-block;
                height: 30px;
                width: 160px;
                text-align: center;
                background-color: #e0e0e0;
                color: #7e7e7e;
            }

            .two {
                display: inline-block;
                height: 30px;
                margin-left: 10px;
                width: 160px;
                background-color: #f3e3ad;
                text-align: center;
                color: #eeb764;
            }
        }
    }
}
</style>
