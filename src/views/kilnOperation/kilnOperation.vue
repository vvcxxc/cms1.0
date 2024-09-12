<template>
    <div class="KilnOperation-Page" :class="{ blackBlueBg: $store.state.color === 'blackBlue' }">
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
                        <div class="cir" style="background: #D4D4D4" />
                    </div>
                    <div class="downs">
                        <div class="down" v-for="(item, index) in list" :key="index">
                            <div>{{ item.content }}</div>
                            <div class="cir" :style="{
                                    background: item.flag
                                        ? '#9ee179'
                                        : '#D4D4D4',
                                }" />
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
        methods: {
            initData(val) {
                this.$axios({
                    method: 'GET',
                    url: `/api/TechnologicalProcess/KilnViewQuery?kiln=${val}`,
                }).then((res) => {
                    let arr;
                    let datas = res.data.data;
                    if (this.KType == 1) {
                        //a-c
                        arr = [{
                                content: '蜂鸣器开关',
                                flag: datas['BuzzerSwitch'],
                            },
                            {
                                content: '入口报警开关',
                                flag: datas['EntranceAlarmSwitch'],
                            },
                            {
                                content: '整列装置开关',
                                flag: datas['WholeLineDeviceSwitch'],
                            },

                            {
                                content: '置换/直通开关',
                                flag: datas['DisplacementOrThroughSwitch'],
                            },
                            {
                                content: '传动总开关',
                                flag: datas['DriveMainSwitch'],
                            },
                            {
                                content: '传动电机01正转',
                                flag: datas['DriveMotorPositiveRotation01'],
                            },
                            {
                                content: '传动电机01反转',
                                flag: datas['DriveMotorPositiveReversal01'],
                            },
                            {
                                content: '传动电机02正转',
                                flag: datas['DriveMotorPositiveRotation02'],
                            },
                            {
                                content: '传动电机02反转',
                                flag: datas['DriveMotorPositiveReversal02'],
                            },
                            {
                                content: '传动电机03正转',
                                flag: datas['DriveMotorPositiveRotation03'],
                            },
                            {
                                content: '传动电机03反转',
                                flag: datas['DriveMotorPositiveReversal03'],
                            },
                            {
                                content: '排烟风机',
                                flag: datas['SmokeExhaustFan'],
                            },
                            {
                                content: '冷却风机',
                                flag: datas['CoolingFan'],
                            },
                            {
                                content: '助燃风机',
                                flag: datas['CombustionFan'],
                            },
                            {
                                content: '燃烧炉1电磁阀1.1#',
                                flag: datas['CombustionFurnace1SolenoidValve1_1'],
                            },
                            {
                                content: '燃烧炉1电磁阀1.2#',
                                flag: datas['CombustionFurnace1SolenoidValve1_2'],
                            },
                            {
                                content: '燃烧炉2电磁阀2.1#',
                                flag: datas['CombustionFurnace2SolenoidValve2_1'],
                            },
                            {
                                content: '燃烧炉2电磁阀2.2#',
                                flag: datas['CombustionFurnace2SolenoidValve2_2'],
                            },
                        ];
                    } else {
                        //d-f
                        arr = [{
                                content: '1#烧嘴自动着火',
                                flag: datas['BurnerCatchesFireAutomatically1'],
                            },
                            {
                                content: '2#烧嘴自动着火',
                                flag: datas['BurnerCatchesFireAutomatically2'],
                            },
                            {
                                content: '出口异常时传动正反转',
                                flag: datas['OutletPositiveNegative'],
                            },

                            {
                                content: '电机脱落异常时传动停止',
                                flag: datas['MotorDriveStop'],
                            },
                            {
                                content: '断棒时传动正反转',
                                flag: datas['DriveForward'],
                            },
                            {
                                content: '蜂鸣器使用',
                                flag: datas['Buzzer'],
                            },
                            {
                                content: '扬声器使用',
                                flag: datas['Loudspeaker'],
                            },

                            {
                                content: '加热断棒时允许加热',
                                flag: datas['DriveForwardWarm'],
                            },
                            {
                                content: '传动电机1状态',
                                flag: datas['DrivingMotorState1'],
                            },
                            {
                                content: '传动电机2状态',
                                flag: datas['DrivingMotorState2'],
                            },
                            {
                                content: '传动电机3状态',
                                flag: datas['DrivingMotorState3'],
                            },
                            {
                                content: '传动电机4状态',
                                flag: datas['DrivingMotorState4'],
                            },
                            {
                                content: '传动电机5状态',
                                flag: datas['DrivingMotorState5'],
                            },
                            {
                                content: '传动电机6状态',
                                flag: datas['DrivingMotorState6'],
                            },
                            {
                                content: '传动电机7状态',
                                flag: datas['DrivingMotorState7'],
                            },
                            {
                                content: '传动电机8状态',
                                flag: datas['DrivingMotorState8'],
                            },
                            {
                                content: '排烟风机状态',
                                flag: datas['DrivingMotorState5'],
                            },
                            {
                                content: '抽热风机状态',
                                flag: datas['SuctionFanState'],
                            },
                            {
                                content: '助燃风机状态',
                                flag: datas['CombustionFanState'],
                            },
                        ];
                    }

                    this.list = arr;
                });
            },
            select(val, KType) {
                this.id = val;
                this.KType = KType;
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
