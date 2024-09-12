<template>
    <div
        class="TransmissionSetting-Page"
        :class="{ blackBlueBg: $store.state.color === 'blackBlue' }"
    >
        <div class="page-center">
            <div class="select">
                <my-select @select="select" />
            </div>
            <div class="downs">
                <div class="content" v-if="KType==1">
                    <div class="down-child" style="width: 65%; flex-direction: row">
                        <div class="dd-items">
                            <div class="items">
                                <div>窑炉传动1运行频率</div>
                                <div class="center">{{ list.OperatingEfficiency1 }}</div>
                                <div class="item-unit">HZ</div>
                            </div>
                            <div class="items">
                                <div>窑炉传动1设定频率</div>
                                <div class="center greenText">{{ list.SettingEfficiency1 }}</div>
                                <div class="item-unit">HZ</div>
                            </div>

                            <div class="items">
                                <div>窑炉传动2运行频率</div>
                                <div class="center">{{ list.OperatingEfficiency2 }}</div>
                                <div class="item-unit">HZ</div>
                            </div>
                            <div class="items">
                                <div>窑炉传动2设定频率</div>
                                <div class="center greenText">{{ list.SettingEfficiency2 }}</div>
                                <div class="item-unit">HZ</div>
                            </div>
                        </div>

                        <div class="dd-items">
                            <div class="items">
                                <div>窑炉传动3运行频率</div>
                                <div class="center">{{ list.OperatingEfficiency3 }}</div>
                                <div class="item-unit">HZ</div>
                            </div>
                            <div class="items">
                                <div>窑炉传动3设定频率</div>
                                <div class="center greenText">{{ list.SettingEfficiency3 }}</div>
                                <div class="item-unit">HZ</div>
                            </div>
                            <div class="items">
                                <div>冷却风机运行频率</div>
                                <div class="center">{{ list.CoolingFanOperatingEfficiency }}</div>
                                <div class="item-unit">HZ</div>
                            </div>
                            <div class="items">
                                <div>冷却风机设定频率</div>
                                <div class="center greenText">{{ list.CoolingFanSettingEfficiency }}</div>
                                <div class="item-unit">HZ</div>
                            </div>
                        </div>
                    </div>
                    <div class="down-child">
                        <div class="items">
                            <div>排烟风机运行频率</div>
                            <div class="center">{{ list.SmokeExhaustFanOperatingEfficiency }}</div>
                            <div class="item-unit">HZ</div>
                        </div>
                        <div class="items">
                            <div>助燃风机运行频率</div>
                            <div class="center">{{ list.CombustionFanOperatingEfficiency }}</div>
                            <div class="item-unit">HZ</div>
                        </div>
                    </div>
                </div>

                <div class="content" v-if="KType==2">
                    <div class="down-child" style="width: 100%; flex-direction: row">
                        <div class="dd-items2">
                            <div class="items">
                                <div>窑炉传动1运行频率</div>
                                <div class="center">{{ list.OperatingEfficiency1 }}</div>
                                <div class="item-unit">HZ</div>
                            </div>
                            <div class="items">
                                <div>窑炉传动2运行频率</div>
                                <div class="center">{{ list.OperatingEfficiency2 }}</div>
                                <div class="item-unit">HZ</div>
                            </div>
                        </div>
                        <div class="dd-items2">
                            <div class="items">
                                <div>窑炉传动3运行频率</div>
                                <div class="center">{{ list.OperatingEfficiency3 }}</div>
                                <div class="item-unit">HZ</div>
                            </div>
                            <div class="items">
                                <div>窑炉传动4运行频率</div>
                                <div class="center">{{ list.OperatingEfficiency4 }}</div>
                                <div class="item-unit">HZ</div>
                            </div>
                        </div>
                        <div class="dd-items2">
                            <div class="items">
                                <div>窑炉传动5运行频率</div>
                                <div class="center">{{ list.OperatingEfficiency5 }}</div>
                                <div class="item-unit">HZ</div>
                            </div>
                            <div class="items">
                                <div>窑炉传动6运行频率</div>
                                <div class="center">{{ list.OperatingEfficiency6 }}</div>
                                <div class="item-unit">HZ</div>
                            </div>
                        </div>
                        <div class="dd-items2">
                            <div class="items">
                                <div>窑炉传动7运行频率</div>
                                <div class="center">{{ list.OperatingEfficiency7 }}</div>
                                <div class="item-unit">HZ</div>
                            </div>
                            <div class="items">
                                <div>窑炉传动8运行频率</div>
                                <div class="center">{{ list.OperatingEfficiency8 }}</div>
                                <div class="item-unit">HZ</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="content">
                    <div class="down-child" style="width: 65%; flex-direction: row">
                        <div class="dd-items">
                            <div class="items">
                                <div>实际烧成周期</div>
                                <div class="center">{{ list.ActualFiringCycle }}</div>
                                <div class="item-unit">H</div>
                            </div>
                            <div class="items">
                                <div>设定烧成周期</div>
                                <div class="center greenText">{{ list.SetFiringCycle }}</div>
                                <div class="item-unit">H</div>
                            </div>
                            <div class="items">
                                <div>燃烧炉1实际温度</div>
                                <div class="center">{{ list.CombustionActualTemperature1 }}</div>
                                <div class="item-unit">℃</div>
                            </div>
                            <div class="items">
                                <div>燃烧炉1设定温度</div>
                                <div class="center greenText">{{ list.CombustionSettingTemperature1 }}</div>
                                <div class="item-unit">℃</div>
                            </div>
                        </div>
                        <div class="dd-items">
                            <div class="items">
                                <div>燃烧炉2实际温度</div>
                                <div class="center">{{ list.CombustionActualTemperature2 }}</div>
                                <div class="item-unit">℃</div>
                            </div>
                            <div class="items">
                                <div>燃烧炉2设定温度</div>
                                <div class="center greenText">{{ list.CombustionSettingTemperature2 }}</div>
                                <div class="item-unit">℃</div>
                            </div>
                        </div>
                    </div>
                    <div class="down-child" style="width: 30%">
                        <div class="items">
                            <div>当天进钵排数</div>
                            <div class="center">{{ list.NumberOfBowlToday }}</div>
                        </div>
                        <div class="items">
                            <div>窑炉实时排数</div>
                            <div class="center">{{ list.NumberOfBowlRealTime }}</div>
                            <!-- <div   class="item-unit">H</div> -->
                        </div>
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
        MySelect
    },
    data() {
        return {
            id: 1,
            KType: 1,
            list: {}
        };
    },
    created() {
        this.initList(this.id);
    },
    methods: {
        initList(id) {
            this.$axios({
                method: 'get',
                url: `/api/TransmissionSetting/TransmissionSettingQuery?kiln=${id}`
            }).then(res => {
                this.list = { ...res.data.data };
            });
        },
        select(val, KType) {
            this.id = val;
            this.KType = KType;
            this.initList(this.id);
        }
    }
};
</script>

<style lang="scss" scoped>
.TransmissionSetting-Page {
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

        .downs {
            height: calc(100% - 60px);
            width: 100%;
            overflow-y: auto;
        }

        .content {
            margin: 20px;
            padding: 20px;
            box-sizing: border-box;
            background: #0e1732;
            border: 1px solid #2a3058;
            height: calc(50% - 30px);
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            .down-child {
                width: 30%;
                height: 100%;
                padding: 30px;
                box-sizing: border-box;
                background: #070f29;
                border: 1px solid #2f3d67;
                border-left: 4px solid #4775cb;
                border-right: 4px solid #4775cb;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;

                .items {
                    width: 100%;
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    justify-content: flex-end;
                    font-size: 16px;
                    padding-right: 50px;
                    box-sizing: border-box;
                    color: #ffffff;
                    margin-bottom: 30px;
                    .item-unit {
                        color: #7481a8;
                        width: 20px;
                    }
                }
                .items:last-child {
                    margin-bottom: 0;
                }
            }

            .dd-items {
                width: 50%;
                height: 100%;
            }
            .dd-items2 {
                width: 50%;
                height: 100%;
                display: flex;
                flex-direction: column;
                justify-content: center;
            }

            .center {
                width: 160px;
                height: 36px;
                line-height: 36px;
                text-align: center;
                background: #1d2846;
                border: 1px solid #445992;
                color: #c6cad8;
                margin: 0 20px 0 25px;
            }

            .center2 {
                width: 100px;
                font-size: 22px;
            }
            .greenText{
                color:#5BAF2E
            }

            .titles {
                height: 95px;
                background: #18254e;
                display: flex;
                flex-direction: row;
                justify-content: center;
                align-items: center;
                margin-top: 40px;
                font-size: 20px;
                color: #ffffff;

                .unit {
                    color: #7481a8;
                    font-size: 16px;
                }
            }
        }
    }
}
</style>