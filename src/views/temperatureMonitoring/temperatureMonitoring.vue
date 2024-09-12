<template>
    <div
        class="temperatureMonitoring-Page"
        :class="{ blackBlueBg: $store.state.color === 'blackBlue' }"
    >
        <div class="page-center">
            <div class="select">
                <div class="select-text">窑炉选择：</div>
                <el-select
                    v-model="curSelectItem"
                    placeholder="Select"
                    :popper-append-to-body="false"
                >
                    <el-option
                        v-for="item in KilnsList"
                        :key="item.Id"
                        :label="item.Name"
                        :value="item.Id"
                    ></el-option>
                </el-select>
                <el-button class="select-btn" @click="searchTemperatureMonitoringSentToPage">查询</el-button>
            </div>
            <div class="content">
                <div class="right-title">温度控制（℃）</div>
                <div class="right-table" v-if="KType==1">
                    <div class="clomn title">
                        <div class="row">上部温区</div>
                        <div class="row title">实际温度</div>
                        <div class="row title">设置温度</div>
                        <div class="row title">目标温度</div>
                    </div>
                    <div class="clomn" v-for="item in t1" :key="item.Tag">
                        <div class="row">{{ item.Tag }}</div>
                        <div class="row">{{ item.RealTemperature }}</div>
                        <div class="row">{{ item.SetTemperature }}</div>
                        <div class="row">{{ item.TargetTemperature }}</div>
                    </div>
                </div>
                <div class="right-table" v-if="KType==2">
                    <div class="clomn title">
                        <div class="row"></div>
                        <div class="row">实温℃</div>
                        <div class="row">设温℃</div>
                        <div class="row">目标℃</div>
                        <div class="row">输出℃</div>
                        <div class="row">报警</div>
                        <div class="row">运行</div>
                    </div>
                    <div class="clomn" v-for="item in t4" :key="item.Tag">
                        <div class="row">{{ item.Tag }}</div>
                        <div class="row">{{ item.RealTemperature }}</div>
                        <div class="row">{{ item.SetTemperature }}</div>
                        <div class="row">{{ item.TargetTemperature }}</div>
                        <div class="row">{{ item.OutputPercent }}</div>
                        <div class="row">
                            <div :class="item.Alarm?'greenLight':'greyLight'"></div>
                        </div>
                        <div class="row">
                            <div :class="item.Running?'greenLight':'greyLight'"></div>
                        </div>
                    </div>
                </div>

                <div class="right-title" v-if="KType==1">温度控制（℃）</div>
                <div class="right-table" v-if="KType==1">
                    <div class="clomn title">
                        <div class="row">上部温区</div>
                        <div class="row title">实际温度</div>
                    </div>
                    <div class="clomn" v-for="item in t3" :key="item.Tag">
                        <div class="row">{{ item.Tag }}</div>
                        <div class="row">{{ item.RealTemperature }}</div>
                    </div>
                </div>

                <div class="right-title">温度控制（℃）</div>
                <div class="right-table" v-if="KType==1">
                    <div class="clomn title">
                        <div class="row">上部温区</div>
                        <div class="row title">实际温度</div>
                        <div class="row title">设置温度</div>
                        <div class="row title">目标温度</div>
                    </div>
                    <div class="clomn" v-for="item in t2" :key="item.Tag">
                        <div class="row">{{ item.Tag }}</div>
                        <div class="row">{{ item.RealTemperature }}</div>
                        <div class="row">{{ item.SetTemperature }}</div>
                        <div class="row">{{ item.TargetTemperature }}</div>
                    </div>
                </div>
                <div class="right-table" v-if="KType==2">
                    <div class="clomn title">
                        <div class="row"></div>
                        <div class="row">实温℃</div>
                        <div class="row">设温℃</div>
                        <div class="row">目标℃</div>
                        <div class="row">输出℃</div>
                        <div class="row">报警</div>
                        <div class="row">运行</div>
                    </div>
                    <div class="clomn" v-for="item in t5" :key="item.Tag">
                        <div class="row">{{ item.Tag }}</div>
                        <div class="row">{{ item.RealTemperature }}</div>
                        <div class="row">{{ item.SetTemperature }}</div>
                        <div class="row">{{ item.TargetTemperature }}</div>
                        <div class="row">{{ item.OutputPercent }}</div>
                        <div class="row">
                            <div :class="item.Alarm?'greenLight':'greyLight'"></div>
                        </div>
                        <div class="row">
                            <div :class="item.Running?'greenLight':'greyLight'"></div>
                        </div>
                    </div>
                    <div class="clomn title">
                        <div class="row"></div>
                        <div class="row">炉压Pa</div>
                        <div class="row">设定Pa</div>
                        <div class="row">目标Pa</div>
                        <div class="row">输出Pa</div>
                        <div class="row">报警</div>
                        <div class="row">运行</div>
                    </div>
                    <div class="clomn" v-if="luya">
                        <div class="row">{{ luya.Tag }}</div>
                        <div class="row">{{ luya.RealTemperature }}</div>
                        <div class="row">{{ luya.SetTemperature }}</div>
                        <div class="row">{{ luya.TargetTemperature }}</div>
                        <div class="row">{{ luya.OutputPercent }}</div>
                        <div class="row">
                            <div :class="luya.Alarm?'greenLight':'greyLight'"></div>
                        </div>
                        <div class="row">
                            <div :class="luya.Running?'greenLight':'greyLight'"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            timer: 0,
            empyt: '',
            KilnsList: [],
            curSelectItem: '', //下拉框显示的
            realCurSelectItem: '', //按了查询后更新
            tableInfo: [],
            t1: [],
            t2: [],
            t3: [],
            t4: [],
            t5: []
        };
    },
    computed: {
        KType() {
            let o = this.KilnsList.find(_ => _.Id == this.realCurSelectItem);
            console.log('o', o);
            return o ? o.KType : 1;
        },
        luya() {
            return this.tableInfo.find(_ => _.Tag == '炉压');
        }
    },
    methods: {
        searchTemperatureMonitoringSentToPage() {
            this.realCurSelectItem = this.curSelectItem;
            clearInterval(this.timer);
            this.TemperatureMonitoringSentToPage();
            this.timer = setInterval(() => {
                this.TemperatureMonitoringSentToPage(); //轮询实时刷新
            }, 5000);
        },
        TemperatureMonitoringSentToPage() {
            this.$axios
                .get(
                    `/api/TechnologicalProcess/TemperatureViewQuery?kiln=${this.realCurSelectItem}`
                )
                .then(res => {
                    if (res.data.code == 0) {
                        let data = res.data.data;
                        this.tableInfo = data;
                        if (this.KType == 1) {
                            let a1 = [
                                '1U',
                                '2U',
                                '3U',
                                '4U',
                                '5U',
                                '6U',
                                '7U',
                                '8U',
                                '9U',
                                '10U',
                                '11U',
                                '12U',
                                '13U',
                                '14U',
                                '15U',
                                '16U',
                                '17U',
                                '18U',
                                '19U',
                                '20U',
                                '21U'
                            ];
                            this.t1 = data.filter(_ => {
                                return a1.indexOf(_.Tag) >= 0;
                            });
                            let a2 = [
                                '1D',
                                '2D',
                                '3D',
                                '4D',
                                '5D',
                                '6D',
                                '7D',
                                '8D',
                                '9D',
                                '10D',
                                '11D',
                                '12D',
                                '13D',
                                '14D',
                                '15D',
                                '16D',
                                '17D',
                                '18D',
                                '19D',
                                '20D',
                                '21D'
                            ];
                            this.t2 = data.filter(_ => {
                                return a2.indexOf(_.Tag) >= 0;
                            });
                            this.t3 = data.filter(_ => {
                                return (
                                    a1.indexOf(_.Tag) < 0 &&
                                    a2.indexOf(_.Tag) < 0
                                );
                            });
                        } else if (this.KType == 2) {
                            let a3 = [
                                'U1',
                                'U2',
                                'U3',
                                'U4',
                                'U5',
                                'U6',
                                'U7',
                                'U8',
                                'U9',
                                'U10',
                                'U11',
                                'U12',
                                'U13',
                                'U14',
                                'U15',
                                'U16',
                                'U17',
                                'U18',
                                'U19',
                                'U20',
                                'U21',
                                'U22',
                                'U23',
                                '烧嘴#1'
                            ];
                            this.t4 = data.filter(_ => {
                                return a3.indexOf(_.Tag) >= 0;
                            });
                            let a4 = [
                                'D1',
                                'D2',
                                'D3',
                                'D4',
                                'D5',
                                'D6',
                                'D7',
                                'D8',
                                'D9',
                                'D10',
                                'D11',
                                'D12',
                                'D13',
                                'D14',
                                'D15',
                                'D16',
                                'D17',
                                'D18',
                                'D19',
                                'D20',
                                'D21',
                                'D22',
                                'D23',
                                '烧嘴#2'
                            ];
                            this.t5 = data.filter(_ => {
                                return a4.indexOf(_.Tag) >= 0;
                            });
                        }
                    }
                });
        },
        //获取窑炉列表
        GetKilnsTypesList() {
            this.$axios.get(`/api/MainWindowData/GetKilnList`).then(res => {
                if (res.data.code == 0) {
                    this.KilnsList = res.data.data;
                    this.curSelectItem = res.data.data[0].Id;
                    this.realCurSelectItem = res.data.data[0].Id;
                    this.TemperatureMonitoringSentToPage();
                    this.timer = setInterval(() => {
                        this.TemperatureMonitoringSentToPage(); //轮询实时刷新
                    }, 5000);
                }
            });
        }
    },
    mounted() {
        this.GetKilnsTypesList();
    },
    beforeDestroy() {
        clearInterval(this.timer);
    }
};
</script>
<style lang="scss" scoped>
.temperatureMonitoring-Page {
    height: calc(100% - 160px);
    margin: 20px;
    margin-top: 110px;
    background-color: #081027;
    color: #fff;
    &.blackBlueBg {
        background-color: #081027;
        box-shadow: 0 3px 6px 0 rgb(0 0 0 / 16%);
        color: #fff;
    }

    .page-center {
        width: 100%;
        height: 100%;
        background: #081027;
        border: 2px solid #2a3058;

        .select {
            height: 60px;
            background: #0b1530;
            border-bottom: 1px solid #38415a;
            display: flex;
            flex-direction: row;
            align-items: center;
            .select-text {
                font-size: 16px;
                font-weight: 400;
                color: #e4e4e4;
                margin-left: 20px;
                margin-right: 6px;
            }
            ::v-deep .el-input__inner {
                border-radius: 0;
                height: 36px;
                line-height: 36px;
                width: 174px;
                background: #1d2846;
                border: 1px solid #445992 !important;
                font-size: 16px;
                color: #c6cad8;
            }
            ::v-deep .el-input__icon {
                line-height: 36px;
            }
            .select-btn {
                width: 120px;
                height: 40px;
                line-height: 0;
                background: #386df0;
                color: #fff;
                border-radius: 4px;
                font-size: 16px;
                font-weight: bold;
                margin-left: 10px;
                border: 0;
            }
        }

        .content {
            width: 100%;
            height: calc(100% - 60px);
            padding: 22px 20px;
            box-sizing: border-box;
            overflow: auto;
            .right-title {
                padding-left: 30px;
                box-sizing: border-box;
                position: relative;
                margin-bottom: 10px;
            }
            .right-title::before {
                content: '';
                width: 10px;
                height: 10px;
                background: #386df0;
                border-radius: 50%;
                position: absolute;
                top: 50%;
                left: 8px;
                transform: translate(0, -50%);
            }
            .right-table {
                width: 100%;
                margin-bottom: 20px;
                display: flex;
                background: #0e1732;
                color: #fff;

                .clomn {
                    flex: auto;
                    height: auto;
                    border-right: #304171 0.5px solid;
                    .row {
                        border-bottom: #304171 0.5px solid;
                        width: 100%;
                        height: 36px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        color: #9aa3be;
                        .redLight,
                        .greenLight,
                        .greyLight {
                            width: 60%;
                            height: 60%;
                            background: #982323;
                        }
                        .greenLight {
                            background: #369a4d;
                        }
                        .greyLight {
                            background: #909399;
                        }
                    }
                    .row:nth-child(2n) {
                        background: #121c3a;
                    }
                    .row:first-child {
                        background: #18254e;
                        color: #fff;
                    }
                }

                .title {
                    width: 120px;
                    flex: unset;
                    .row,
                    .row:nth-child(2n) {
                        background: #18314e;
                        color: #fff;
                    }
                    .row:first-child {
                        background: #18254e;
                        color: #fff;
                    }
                }
            }
        }
    }
}
</style>