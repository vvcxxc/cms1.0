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
                <div class="content">
                    <div class="content-up">
                        <div class="cir" />
                        <div>传送带速度</div>
                    </div>
                    <div class="content-down">
                        <div class="down-child">
                            <div class="items">
                                <div>输出速度</div>
                                <div class="center">{{ list.OutSpeed1 }}</div>
                                <div style="color: #7481a8">HZ</div>
                            </div>
                            <div class="items" style="margin-top: 40px">
                                <div>设置速度</div>
                                <div class="center">{{ list.SetSpeed1 }}</div>
                                <div style="color: #7481a8">HZ</div>
                            </div>
                        </div>
                        <div class="down-child">
                            <div class="items">
                                <div>输出速度</div>
                                <div class="center">{{ list.OutSpeed2 }}</div>
                                <div style="color: #7481a8">HZ</div>
                            </div>
                            <div class="items" style="margin-top: 40px">
                                <div>设置速度</div>
                                <div class="center">{{ list.SetSpeed2 }}</div>
                                <div style="color: #7481a8">HZ</div>
                            </div>
                        </div>
                        <div class="down-child">
                            <div class="items">
                                <div>输出速度</div>
                                <div class="center">{{ list.OutSpeed3 }}</div>
                                <div style="color: #7481a8">HZ</div>
                            </div>
                            <div class="items" style="margin-top: 40px">
                                <div>设置速度</div>
                                <div class="center">{{ list.SetSpeed3 }}</div>
                                <div style="color: #7481a8">HZ</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="content">
                    <div class="content-up">
                        <div class="cir" />
                        <div>入口/炉内/出口</div>
                    </div>
                    <div class="titles">
                        <div>烧成时间</div>
                        <div
                            class="center center2"
                            style="margin: 0 10px 0 26px"
                        >
                            {{ list.BurningHour1 }}
                        </div>
                        <div class="unit">H</div>
                        <div
                            class="center center2"
                            style="margin: 0 10px 0 10px"
                        >
                            {{ list.BurningMinute1 }}
                        </div>
                        <div class="unit">M</div>
                    </div>
                    <div class="content-down">
                        <div
                            class="down-child"
                            style="width: 65%; flex-direction: row"
                        >
                            <div class="dd-items">
                                <div class="items">
                                    <div>进匣钵数量</div>
                                    <div class="center" style="width: 234px">
                                        {{ list.IntoSaggar }}
                                    </div>
                                    <div style="color: #7481a8">排</div>
                                </div>
                                <div
                                    class="items"
                                    style="margin: 40px 0 0 -8px"
                                >
                                    <div>炉内匣钵数量</div>
                                    <div class="center" style="width: 234px">
                                        {{ list.FurSaggar }}
                                    </div>
                                    <div style="color: #7481a8">排</div>
                                </div>
                            </div>
                            <div class="dd-items">
                                <div class="items">
                                    <div>进产品时间</div>
                                    <div
                                        class="center"
                                        style="width: 234px; margin-right: 10px"
                                    >
                                        {{ list.InputProTime }}
                                    </div>
                                    <div style="color: #7481a8">S</div>
                                </div>
                                <div class="items" style="margin: 40px 0 0 8px">
                                    <div>烧成时间</div>
                                    <div
                                        class="center"
                                        style="
                                            margin: 0 10px 0 25px;
                                            width: 100px;
                                        "
                                    >
                                        {{ list.BurningHour2 }}
                                    </div>
                                    <div style="color: #7481a8">H</div>
                                    <div
                                        class="center"
                                        style="
                                            margin: 0 10px 0 10px;
                                            width: 100px;
                                        "
                                    >
                                        {{ list.BurningMinute2 }}
                                    </div>
                                    <div style="color: #7481a8">M</div>
                                </div>
                            </div>
                        </div>
                        <div class="down-child" style="width: 30%">
                            <div class="items">
                                <div>速度修正</div>
                                <div class="center">{{ list.VCorrection }}</div>
                                <div style="color: #7481a8">HZ</div>
                            </div>
                            <div class="items" style="margin: 26px 0 0 -21px">
                                <div>速度检测</div>
                                <div class="center">{{ list.VCheck }}</div>
                                <!-- <div style="color: #7481a8">H</div> -->
                            </div>
                            <div class="items" style="margin: 26px 0 0 -40px">
                                <div>实际烧成时间</div>
                                <div class="center">
                                    {{ list.CurBurningTime }}
                                </div>
                                <div style="color: #7481a8">M</div>
                            </div>
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
        MySelect,
    },
    data() {
        return {
            id: 1,
            list: {},
        };
    },
    created() {
        this.initList(this.id);
    },
    methods: {
        initList(id) {
            this.$axios({
                method: 'post',
                url: `/api/TransmissionSet/TransmissionSetSenttToPage?kilnID=${id}`,
            }).then((res) => {
                this.list = { ...res.data.data };
            });
        },
        select(val) {
            this.id = val;
            this.initList(this.id);
        },
    },
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
            background: #0e1732;
            border: 1px solid #2a3058;

            .content-up {
                font-size: 18px;
                font-weight: 400;
                color: #ffffff;
                display: flex;
                flex-direction: row;
                align-items: center;
                margin-left: 20px;
                margin-top: 21px;

                .cir {
                    width: 10px;
                    height: 10px;
                    background: #386df0;
                    border-radius: 50%;
                    margin-right: 10px;
                }
            }

            .content-down {
                margin: 37px 39px 28px 39px;
                display: flex;
                flex-direction: row;
                justify-content: space-between;

                .down-child {
                    width: 30%;
                    height: 214px;
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
                        justify-content: center;
                        font-size: 16px;
                        color: #ffffff;
                    }
                }
            }

            .dd-items {
                width: 50%;
                height: 100%;
                display: flex;
                flex-direction: column;
                justify-content: center;
            }

            .center {
                width: 190px;
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