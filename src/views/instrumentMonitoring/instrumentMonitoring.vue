<template>
    <div class="InstrumentMonitoring-Page" :class="{ blackBlueBg: $store.state.color === 'blackBlue' }">
        <div class="page-center">
            <div class="select">
                <my-select @select="select" />
            </div>
            <div class="content">
                <div class="both-size">
                    <div class="whole">
                        <div class="whole-tetx">氮气瞬时流量</div>
                        <div class="whole-center">{{ list.NitrogenFlowRate }}</div>
                        <div style="color: #7481a8">Nm³/h</div>
                    </div>
                    <div class="whole">
                        <div class="whole-tetx">冷却水瞬时流量</div>
                        <div class="whole-center">{{ list.CoolingWaterFlowRate }}</div>
                        <div style="color: #7481a8">Nm³/h</div>
                    </div>

                    <div class="whole">
                        <div class="whole-tetx">天然气瞬时流量</div>
                        <div class="whole-center">{{ list.GasFlowRate }}</div>
                        <div style="color: #7481a8">Nm³/h</div>
                    </div>
                    <div class="whole">
                        <div class="whole-tetx">氮气累计流量</div>
                        <div class="whole-center">{{ list.NitrogenFlowRateAdd }}</div>
                        <div style="color: #7481a8">Nm³</div>
                    </div>
                    <div class="whole">
                        <div class="whole-tetx">冷却水累计流量</div>
                        <div class="whole-center">{{ list.CoolingWaterFlowRateAdd }}</div>
                        <div style="color: #7481a8">Nm³</div>
                    </div>
                    <div class="whole">
                        <div class="whole-tetx">天然气累计流量</div>
                        <div class="whole-center">{{ list.GasFlowRateAdd }}</div>
                        <div style="color: #7481a8">Nm³</div>
                    </div>
                    <div class="whole">
                        <div class="whole-tetx">排烟温度</div>
                        <div class="whole-center">{{ list.ExhaustGasTemperature }}</div>
                        <div style="color: #7481a8">℃</div>
                    </div>

                    <div class="whole">
                        <div class="whole-tetx">进口冷却水温度</div>
                        <div class="whole-center">{{ list.InletCoolingWaterTemperature }}</div>
                        <div style="color: #7481a8">℃</div>
                    </div>
                    <div class="whole">
                        <div class="whole-tetx">出口冷却水温度</div>
                        <div class="whole-center">{{ list.OutletCoolingWaterTemperature }}</div>
                        <div style="color: #7481a8">℃</div>
                    </div>
                    <div class="whole" v-if="KType==1">
                        <div class="whole-tetx">循环冷却水温度</div>
                        <div class="whole-center">{{ list.CirculatingCoolingWaterTemperature }}</div>
                        <div style="color: #7481a8">℃</div>
                    </div>
                    <div class="whole">
                        <div class="whole-tetx">T1燃烧温度</div>
                        <div class="whole-center">{{ list.T1BurningTemperature }}</div>
                        <div style="color: #7481a8">℃</div>
                    </div>
                    <div class="whole">
                        <div class="whole-tetx">T2燃烧温度</div>
                        <div class="whole-center">{{ list.T2BurningTemperature }}</div>
                        <div style="color: #7481a8">℃</div>
                    </div>
                    <div class="whole" v-if="KType==1">
                        <div class="whole-tetx">烧成周期</div>
                        <div class="whole-center">{{ list.FiringPeriod }}</div>
                        <div style="color: #7481a8">H</div>
                    </div>


                    <div class="whole" v-if="KType==2">
                        <div class="whole-tetx">烧成周期</div>
                        <div class="whole-short w-left">{{ list.FiringPeriodH }}</div>
                        <div style="color: #7481a8">H</div>
                        <div class="whole-short">{{ list.FiringPeriodMin }}</div>
                        <div style="color: #7481a8">MIN</div>
                    </div>
                </div>
                <div class="center">
                    <img src="../../assets/images/pic.png" alt="" />
                </div>
                <div class="both-size">
                    <div class="whole">
                        <div class="whole-tetx">总用电能</div>
                        <div class="whole-center">{{ list.TotalElectricity }}</div>
                        <div style="color: #7481a8">KWh</div>
                    </div>
                    <div class="whole">
                        <div class="whole-tetx">A相电压</div>
                        <div class="whole-center">{{ list.APhaseVoltage }}</div>
                        <div style="color: #7481a8">V</div>
                    </div>
                    <div class="whole">
                        <div class="whole-tetx">B相电压</div>
                        <div class="whole-center">{{ list.BPhaseVoltage }}</div>
                        <div style="color: #7481a8">V</div>
                    </div>
                    <div class="whole">
                        <div class="whole-tetx">C相电压</div>
                        <div class="whole-center">{{ list.CPhaseVoltage }}</div>
                        <div style="color: #7481a8">V</div>
                    </div>

                    <div class="whole">
                        <div class="whole-tetx">A相电流</div>
                        <div class="whole-center">{{ list.APhaseCurrent }}</div>
                        <div style="color: #7481a8">A</div>
                    </div>
                    <div class="whole">
                        <div class="whole-tetx">B相电流</div>
                        <div class="whole-center">{{ list.BPhaseCurrent }}</div>
                        <div style="color: #7481a8">A</div>
                    </div>
                    <div class="whole">
                        <div class="whole-tetx">C相电流</div>
                        <div class="whole-center">{{ list.CPhaseCurrent }}</div>
                        <div style="color: #7481a8">A</div>
                    </div>
                    <div class="whole" v-if="KType==1">
                        <div class="whole-tetx">9区窑压力</div>
                        <div class="whole-center">{{ list.AreaKilnPressure9 }}</div>
                        <div style="color: #7481a8">pa</div>
                    </div>
                    <div class="whole" v-if="KType==1">
                        <div class="whole-tetx">19区窑压力</div>
                        <div class="whole-center">{{ list.AreaKilnPressure19 }}</div>
                        <div style="color: #7481a8">pa</div>
                    </div>
                    <div class="whole" v-if="KType==1">
                        <div class="whole-tetx">23区窑压力</div>
                        <div class="whole-center">{{ list.AreaKilnPressure23 }}</div>
                        <div style="color: #7481a8">pa</div>
                    </div>
                    <div class="whole" v-if="KType==1">
                        <div class="whole-tetx">氮气压力</div>
                        <div class="whole-center">{{ list.NitrogenPressure }}</div>
                        <div style="color: #7481a8">Mpa</div>
                    </div>
                    <div class="whole" v-if="KType==2">
                        <div class="whole-tetx">窑炉压力</div>
                        <div class="whole-center">{{ list.FurnacePressure }}</div>
                        <div style="color: #7481a8">Mpa</div>
                    </div>
                    <div class="whole" v-if="KType==2">
                        <div class="whole-tetx">入口压缩空气压力</div>
                        <div class="whole-center">{{ list.InletCompressedAirPressure }}</div>
                        <div style="color: #7481a8">Mpa</div>
                    </div>
                    <div class="whole" v-if="KType==2">
                        <div class="whole-tetx">出口压缩空气压力</div>
                        <div class="whole-center">{{ list.OutletCompressedAirPressure }}</div>
                        <div style="color: #7481a8">Mpa</div>
                    </div>
                    <div class="whole" v-if="KType==2">
                        <div class="whole-tetx">天然气一次侧压力</div>
                        <div class="whole-center">{{ list.GasFristSidePressure }}</div>
                        <div style="color: #7481a8">Mpa</div>
                    </div>
                    <div class="whole" v-if="KType==2">
                        <div class="whole-tetx">天然气二次侧压力</div>
                        <div class="whole-center">{{ list.GasSecondarySidePressure }}</div>
                        <div style="color: #7481a8">Kpa</div>
                    </div>
                    <div class="whole" v-if="KType==2">
                        <div class="whole-tetx">氮气一次侧压力</div>
                        <div class="whole-center">{{ list.NitrogenFristSidePressure }}</div>
                        <div style="color: #7481a8">Mpa</div>
                    </div>
                    <div class="whole" v-if="KType==2">
                        <div class="whole-tetx">氮气二次侧压力</div>
                        <div class="whole-center">{{ list.NitrogenSecondarySidePressure }}</div>
                        <div style="color: #7481a8">Kpa</div>
                    </div>

                    <div class="whole">
                        <div class="whole-tetx">冷却水压力</div>
                        <div class="whole-center">{{ list.CoolingWaterPressure }}</div>
                        <div style="color: #7481a8">Mpa</div>
                    </div>
                    <div class="whole">
                        <div class="whole-tetx">助燃压力</div>
                        <div class="whole-center">{{ list.CombustionPressure }}</div>
                        <div style="color: #7481a8">Mpa</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import MySelect from '../../components/Select/Select.vue';
    export default {
        components: {
            MySelect,
        },
        data() {
            return {
                list: {},
                id: 1,
                KType: 1
            };
        },
        created() {
            this.initData(this.id);
        },
        mounted() {
            this.timer = setInterval(() => {
                this.initData(this.id);
            }, 5000);
        },
        beforeDestroy() {
            clearInterval(this.timer);
        },
        methods: {
            initData(val) {
                this.$axios({
                    method: 'GET',
                    url: `/api/TechnologicalProcess/MeterViewQuery?kiln=${val}`,
                }).then((res) => {
                    this.list = res.data.data;
                });
            },
            select(val,KType) {
                this.id = val;
                this.KType=KType;
                this.initData(val);
            },
        },
    };
</script>

<style lang="scss" scoped>
    .InstrumentMonitoring-Page {
        height: calc(100% - 160px);
        margin: 20px;
        margin-top: 110px;
        background: #fff;

        &.blackBlueBg {
            background-color: #081027;
            box-shadow: 0 3px 6px 0 rgb(0 0 0 / 16%);
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
            }

            .content {
                display: flex;
                flex-direction: row;
                justify-content: space-around;
                margin: 22px;
                height: calc(100% - 104px);
                width: calc(100% - 40px);

                .both-size {
                    width: 508px;
                    height: 100%;
                    background: #0e1732;
                    border: 1px solid #2a3058;
                    padding: 21px 30px;
                    overflow-y: auto;

                    .dashed {
                        width: 100%;
                        height: 0px;
                        border: 1px dashed #445992;
                        margin: 24px 0;
                    }

                    .whole {
                        display: flex;
                        flex-direction: row;
                        align-items: center;
                        font-size: 16px;
                        font-weight: 400;
                        color: #ffffff;
                        margin-bottom: 20px;

                        .whole-tetx {
                            width: 160px;
                            text-align: right;
                        }

                        .whole-center,
                        .whole-short {
                            width: 190px;
                            height: 36px;
                            line-height: 36px;
                            background: #1d2846;
                            border: 1px solid #445992;
                            text-align: center;
                            color: #c6cad8;
                            margin-left: 11px;
                            margin-right: 19px;
                        }

                        .whole-short {
                            width: 79px;
                        }

                        .w-left {
                            margin-right: 11px;
                        }


                    }
                }

                .center {
                    flex: 1;
                    background: #172243;
                    border: 1px solid #2a3058;
                    padding: 203px 29px;
                    margin: 0 20px;

                    img {
                        width: 100%;
                        height: 100%;
                    }
                }
            }
        }
    }
</style>
