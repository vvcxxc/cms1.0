<template>
    <div
        class="KilnOperation-Page"
        :class="{ blackBlueBg: $store.state.color === 'blackBlue' }"
    >
        <div class="page-center">
            <div class="select">
                <my-select @select="select" />
            </div>
            <div class="content">
                <div class="content-left">
                    <div class="up">
                        <div style="margin: 0 12px 0 20px">ON</div>
                        <div class="cir" />
                        <div style="margin: 0 12px 0 40px">OFF</div>
                        <div class="cir" style="background: #df5f5f" />
                    </div>
                    <div class="downs">
                        <div
                            class="down"
                            v-for="(item, index) in list"
                            :key="index"
                        >
                            <div>{{ item.content }}</div>
                            <div
                                class="cir"
                                :style="{
                                    background: item.flag
                                        ? '#9ee179'
                                        : '#df5f5f',
                                }"
                            />
                        </div>
                    </div>
                </div>
                <div class="content-right">
                    <img src="../../assets/images/pic.png" alt="" />
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
            list: [],
            id: 1,
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
    methods: {
        initData(val) {
            this.$axios({
                method: 'post',
                url: `/api/TechnologicalProcess/KilnContolSentToPage?KilnID=${val}`,
            }).then((res) => {
                const arr = [];
                const datas = { ...res.data.data };
                Object.keys(datas).forEach((item) => {
                    let obj = {};
                    if (item == 'JetAutoIgnition1') {
                        obj = {
                            content: '烧嘴1自动点火',
                            flag: datas[item],
                        };
                    } else if (item == 'JetAutoIgnition2') {
                        obj = {
                            content: '烧嘴2自动点火',
                            flag: datas[item],
                        };
                    } else if (item == 'WinOutputModel') {
                        obj = {
                            content: '出口大气模式',
                            flag: datas[item],
                        };
                    } else if (item == 'WinInputModel') {
                        obj = {
                            content: '入口大气模式',
                            flag: datas[item],
                        };
                    } else if (item == 'Buzzer') {
                        obj = {
                            content: '使用蜂鸣器',
                            flag: datas[item],
                        };
                    } else if (item == 'AlarmLoudspeaker') {
                        obj = {
                            content: '使用报警扬声器',
                            flag: datas[item],
                        };
                    } else if (item == 'Reaplace') {
                        obj = {
                            content: '使用出入口置换室报警及蜂鸣',
                            flag: datas[item],
                        };
                    } else if (item == 'AcoustoOpticAlarm') {
                        obj = {
                            content: '使用出入口墙上声光报警器',
                            flag: datas[item],
                        };
                    } else if (item == 'Sagger') {
                        obj = {
                            content: '使用窑炉长时间不进匣钵报警',
                            flag: datas[item],
                        };
                    } else if (item == 'AlarmPage') {
                        obj = {
                            content: '当异常情况发生自动切换至报警画面',
                            flag: datas[item],
                        };
                    } else if (item == 'PositiveAndNegative') {
                        obj = {
                            content: '出口异常时窑炉自动切换正反转模式',
                            flag: datas[item],
                        };
                    }
                    arr.push(obj);
                });
                this.list = arr;
            });
        },
        select(val) {
            this.id = val;
            this.initData(val);
        },
    },
    beforeDestroy() {
        clearInterval(this.timer);
    },
};
</script>

<style lang="scss" scoped>
.KilnOperation-Page {
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
            margin: 22px 20px;
            height: calc(100% - 104px);
            width: calc(100% - 40px);
            display: flex;
            flex-direction: row;

            .content-left {
                width: 450px;
                background: #0e1732;
                border: 1px solid #2a3058;
                margin-right: 20px;
                .up {
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    color: #e4e4e4;
                    font-size: 16px;
                    font-weight: 400;
                    height: 60px;
                    width: 100%;
                    border-bottom: 1px solid #38415a;
                }
                .cir {
                    width: 25px;
                    height: 25px;
                    background: #9ee179;
                    border-radius: 50%;
                }
                .downs {
                    height: calc(100% - 60px);
                    overflow-y: auto;
                }
                .down {
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                    color: #ffffff;
                    font-size: 16px;
                    font-weight: 400;
                    width: calc(100% - 45px);
                    margin: 27px 25px 0 20px;
                    padding-bottom: 15px;
                }
            }

            .content-right {
                flex: 1;
                background: #172243;
                border: 1px solid #2a3058;
                padding: 54px 30px;

                img {
                    height: 100%;
                    width: 100%;
                }
            }
        }
    }
}
</style>