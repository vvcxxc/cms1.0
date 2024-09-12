<template>
    <div
        class="InstrumentMonitoring-Page"
        :class="{ blackBlueBg: $store.state.color === 'blackBlue' }"
    >
        <div class="page-center">
            <div class="select">
                <my-select @select="select" />
            </div>
            <div class="content">
                <div class="both-size">
                    <div class="whole">
                        <div class="whole-tetx">燃气流量计：瞬时流量</div>
                        <div class="whole-center">{{ list.FInsDelivery }}</div>
                        <div style="color: #7481a8">Nm³/h</div>
                    </div>
                    <div class="whole">
                        <div class="whole-tetx">燃气流量计：累计流量</div>
                        <div class="whole-center">{{ list.FAddDelivery }}</div>
                        <div style="color: #7481a8">Nm³</div>
                    </div>
                    <div class="dashed" />
                    <div class="whole">
                        <div class="whole-tetx">燃气一次侧压力</div>
                        <div class="whole-center">{{ list.FSideFrist }}</div>
                        <div style="color: #7481a8">Mpa</div>
                    </div>
                    <div class="whole">
                        <div class="whole-tetx">燃气二次侧压力</div>
                        <div class="whole-center">{{ list.FSideSecond }}</div>
                        <div style="color: #7481a8">Kpa</div>
                    </div>
                    <div class="whole">
                        <div class="whole-tetx">助燃风压力</div>
                        <div class="whole-center">{{ list.CombustionAir }}</div>
                        <div style="color: #7481a8">Kpa</div>
                    </div>
                    <div class="whole">
                        <div class="whole-tetx">入口压缩空气压力</div>
                        <div class="whole-center">{{ list.InputPress }}</div>
                        <div style="color: #7481a8">Mpa</div>
                    </div>
                    <div class="whole">
                        <div class="whole-tetx">出口压缩空气压力</div>
                        <div class="whole-center">{{ list.OutputPress }}</div>
                        <div style="color: #7481a8">Mpa</div>
                    </div>
                    <div class="dashed" />
                    <div class="whole">
                        <div class="whole-tetx">线电压Uab</div>
                        <div class="whole-center">{{ list.LineVoltage1 }}</div>
                        <div style="color: #7481a8">V</div>
                    </div>
                    <div class="whole">
                        <div class="whole-tetx">线电压Uab</div>
                        <div class="whole-center">{{ list.LineVoltage2 }}</div>
                        <div style="color: #7481a8">V</div>
                    </div>
                    <div class="whole">
                        <div class="whole-tetx">线电压Uab</div>
                        <div class="whole-center">{{ list.LineVoltage3 }}</div>
                        <div style="color: #7481a8">V</div>
                    </div>
                    <div class="whole">
                        <div class="whole-tetx">线电流la</div>
                        <div class="whole-center">{{ list.LineCurrent1 }}</div>
                        <div style="color: #7481a8">A</div>
                    </div>
                    <div class="whole">
                        <div class="whole-tetx">线电流lb</div>
                        <div class="whole-center">{{ list.LineCurrent2 }}</div>
                        <div style="color: #7481a8">A</div>
                    </div>
                    <div class="whole" style="margin-bottom: -5px">
                        <div class="whole-tetx">线电流lc</div>
                        <div class="whole-center">{{ list.LineCurrent3 }}</div>
                        <div style="color: #7481a8">A</div>
                    </div>
                </div>
                <div class="center">
                    <img src="../../assets/images/pic.png" alt="" />
                </div>
                <div class="both-size">
                    <div class="whole">
                        <div class="whole-tetx">氮气流量计：瞬时流量</div>
                        <div class="whole-center">{{ list.NInsDelivery }}</div>
                        <div style="color: #7481a8">Nm³/h</div>
                    </div>
                    <div class="whole">
                        <div class="whole-tetx">氮气流量计：累计流量</div>
                        <div class="whole-center">{{ list.NAddDelivery }}</div>
                        <div style="color: #7481a8">Nm³</div>
                    </div>
                    <div class="whole">
                        <div class="whole-tetx">氮气一次侧压力</div>
                        <div class="whole-center">{{ list.NSideFrist }}</div>
                        <div style="color: #7481a8">Mpa</div>
                    </div>
                    <div class="whole">
                        <div class="whole-tetx">氮气二次侧压力</div>
                        <div class="whole-center">{{ list.NSideSecond }}</div>
                        <div style="color: #7481a8">Mpa</div>
                    </div>
                    <div class="dashed" />
                    <div class="whole">
                        <div class="whole-tetx">冷却水：瞬时流量</div>
                        <div class="whole-center">{{ list.CInsDelivery }}</div>
                        <div style="color: #7481a8">Nm³/h</div>
                    </div>
                    <div class="whole">
                        <div class="whole-tetx">冷却水：累计流量</div>
                        <div class="whole-center">{{ list.CAddDelivery }}</div>
                        <div style="color: #7481a8">Nm³</div>
                    </div>
                    <div class="whole">
                        <div class="whole-tetx">冷却水压力</div>
                        <div class="whole-center">{{ list.CPressure }}</div>
                        <div style="color: #7481a8">Mpa</div>
                    </div>
                    <div class="dashed" />
                    <div class="whole">
                        <div class="whole-tetx">有功功率</div>
                        <div class="whole-center">{{ list.ActiveP }}</div>
                        <div style="color: #7481a8">KW</div>
                    </div>
                    <div class="whole">
                        <div class="whole-tetx">有功电能EPI</div>
                        <div class="whole-center">{{ list.ActiveEPI }}</div>
                        <div style="color: #7481a8">KVar</div>
                    </div>
                    <div class="whole">
                        <div class="whole-tetx">无功电能EPL</div>
                        <div class="whole-center">{{ list.ActiveEPL }}</div>
                        <div style="color: #7481a8">KWh</div>
                    </div>
                    <div class="whole">
                        <div class="whole-tetx">功率因数</div>
                        <div class="whole-center">{{ list.PFactor }}</div>
                        <!-- <div style="color: #7481a8">KVar</div> -->
                    </div>
                    <div class="whole">
                        <div class="whole-tetx">无功功率</div>
                        <div class="whole-center">{{ list.ReactiveP }}</div>
                        <div style="color: #7481a8">Kvar</div>
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
        };
    },
    created() {
        this.initData(1);
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
                method: 'post',
                url: `/api/TechnologicalProcess/MeterViewSentToPage?KilnID=${val}`,
            }).then((res) => {
                this.list = { ...res.data.data };
            });
        },
        select(val) {
            this.id = val;
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
                    .whole-center {
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