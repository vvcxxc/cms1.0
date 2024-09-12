<!-- 表格 -->
<template>
    <div class="my-extable">
        <div class="ex-title">{{ title }}</div>
        <div class="ex-label">
            <div class="label" v-if="pT">产品型号：{{ pT }}</div>
            <div class="label" v-if="pC">产品码：{{ pC }}</div>
            <div class="label" v-if="dT">时间范围：{{ dT }}</div>
            <div class="label" v-if="wP">工序：{{ wP }}</div>
        </div>
        <!-- 头部 -->
        <div class="my-head flex">
            <div class="column column-1">工序</div>
            <div class="column column-2">工步</div>
            <div class="column column-3">
                <div class="row">{{ title == "线体平均节拍" ? '平均时长（s）' : '时间（s）' }}</div>
                <div class="row flex">
                    <div class="item">开始</div>
                    <div class="item">持续</div>
                    <div class="item">结束</div>
                </div>
            </div>
            <div class="column column-4 flex">
                <span>{{ dT ? '时间范围内平均时长' : '循环时间' }}</span>
            </div>
            <div class="totalTime" v-if="totalTime">{{ totalTime }}</div>
        </div>
        <!-- 内容 -->
        <div class="my-content flex">

            <!-- 头部 -->
            <div class="my-content-head flex">
                <div class="right flex">
                    <div class="item flex">
                        <div class="icon state-1"></div>
                        <div>{{ title == "线体平均节拍" ? '人工动作平均时长' : '人工动作实际时长' }}</div>
                    </div>
                    <div class="item flex">
                        <div class="icon state-2"></div>
                        <div>{{ title == "线体平均节拍" ? '设备动作平均时长' : '设备动作实际时长' }}</div>
                    </div>
                    <div class="item flex">
                        <div class="icon state-3 flex"></div>
                        <div>{{ title == "线体平均节拍" ? '上下限范围内的平均时长' : '上下限范围内的时长' }}</div>
                    </div>
                    <div class="item flex">
                        <div class="icon state-4"></div>
                        <div>{{ title == "线体平均节拍" ? '超出上限的平均时长' : '超出上限的时长' }}</div>
                    </div>
                    <div class="item flex">
                        <div class="icon state-5"></div>
                        <div>{{ title == "线体平均节拍" ? '未达下限的平均时长' : '未达下限的时长' }}</div>
                    </div>
                </div>
            </div>

            <!-- 内容 -->
            <div class="container flex">
                <!-- 表格 -->
                <div class="container-table">
                    <div class="item flex" v-for="(item, i) in tableData.items" :key="i">
                        <div class="left">{{ item.Name }}</div>
                        <div class="right">
                            <div class="row title flex">
                                <div>
                                    <span v-if="item.Code">产品码：{{ item.Code }}</span>
                                </div>
                                <div>时长：{{ item.Value }}s</div>
                            </div>
                            <div class="row flex" v-for="(workingProcedure, n) in item.children" :key="n">
                                <div class="column column-1">{{ workingProcedure.WorkStep }}</div>
                                <div class="column column-2">{{ workingProcedure.Start }}</div>
                                <div class="column column-3" :style="{
                                    background: workingProcedure.OverstepUpperLimit ? 'pink' : ''
                                }">{{ workingProcedure.Duration }}</div>
                                <div class="column column-4">{{ workingProcedure.Finish }}</div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 图表 -->
                <div id="container-echarts" class="container-echarts"
                    :style="`height:${(echartsData.row.length * 40) + 47}px;`">
                    <!-- 栅格 -->
                    <div class="row flex" v-for="(row, i) in echartsData.row" :key="i">
                        <div class="box" v-for="(box, n) in row" :key="n">
                            <!-- {{ box.title }} -->
                        </div>
                    </div>

                    <!-- 刻度线 -->
                    <div v-for="item in scaleLine.list" :key="item.id" class="scale-line" :style="scaleLineStyle(item)">
                        <div class="content">
                            <div class="value">{{ item.value }}s</div>
                            <div class="line"></div>
                        </div>
                    </div>

                    <!-- 进度条 -->
                    <div class="progress-bar">
                        <div class="container">
                            <div class="group" v-for="item in progressBarList.list" :key="item.id">
                                <div v-for="element in item.list" :key="element.id" class="box">
                                    <div v-if="!element.IsManual || (element.IsManual && rengongShow)"
                                        :class="element.IsManual ? 'isManualBar' : 'bar'"
                                        :style="progressBarStyle(element)">
                                        <div class="redBar" v-if="element.OverstepUpperLimit"
                                            :style="progressRedStyle(element)"></div>
                                        <div class="greyBar" v-if="element.NotReachedLowerLimit"
                                            :style="progressGreyStyle(element)"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                </div>
            </div>


        </div>
    </div>
</template>
<script>
import { realtimeSequenceData } from './index'
export default {
    props: {
        title: {
            type: String,
            required: true,
        },
        dataObj: {
            required: true,
        },
        rengongShow: {
            type: Boolean,
            required: false,
        },
        pT: {
            type: String,
            required: false,
        },
        pC: {
            type: String,
            required: false,
        },
        wP: {
            type: String,
            required: false,
        },
        dT: {
            type: String,
            required: false,
        },
        totalTime: {
            type: String,
            required: false,
        },
    },
    data() {
        return {
            // 表格数据
            tableData: {
                items: []
            },
            // 图表数据
            echartsData: {
                row: [],
                columnNumber: 0, // 有多少列
            },
            // 刻度线
            scaleLine: {
                list: [] // 有多少条
            },
            // 进度条
            progressBarList: {
                list: [] // 有多少条
            },
        }
    },
    watch: {
        dataObj: {
            deep: true,
            immediate: true,
            handler: function (newVal, oldVal) {
                if (!newVal || !newVal.TimeSequences || !newVal.TimeSequences.length) {
                    this.tableData.items = [];
                    this.echartsData = {
                        row: [],
                        columnNumber: 0, // 有多少列
                    };
                    this.scaleLine = {
                        list: [],
                    };
                    this.progressBarList = {
                        list: [],
                    };
                    return
                }
                this.queryData()
            }
        }
    },
    methods: {
        createRandomId() {
            return (Math.random() * 10000000).toString(16).substr(0, 4) + (new Date()).getTime() + Math.random().toString().substr(2, 5);
        },
        queryData() {
            const data = JSON.parse(JSON.stringify(this.dataObj))
            data.ProcessDurations.forEach(item => {
                item.children = (
                    item.Code ?
                        data.TimeSequences.filter(item2 => item2.WorkProcess == item.Name && item2.ProductCode == item.Code) :
                        data.TimeSequences.filter(item2 => item2.WorkProcess == item.Name)
                )
            })
            this.tableData.items = data.ProcessDurations

            let maxEnd = 0 // 最大结束时间；最大时长，查询结束最大值就行了
            let maxRow = -1 // 最大行
            let progressBarList = [] // 进度条
            for (const item of data.ProcessDurations) {
                maxRow += 2
                const group = []
                for (const element of item.children) {
                    maxRow += 1
                    if ((Number(element.Finish) + Number(element.NotReachedLowerLimit)) > maxEnd) maxEnd = (Number(element.Finish) + Number(element.NotReachedLowerLimit))
                    group.push({
                        id: this.createRandomId(),
                        start: element.Start,
                        duration: element.Duration,
                        end: element.Finish,
                        OverstepUpperLimit: element.OverstepUpperLimit,
                        NotReachedLowerLimit: element.NotReachedLowerLimit,
                        IsManual: element.IsManual,
                        UpperLimit: element.UpperLimit,
                        LowerLimit: element.LowerLimit,
                        workStep: element.WorkStep
                    })
                }
                progressBarList.push({
                    id: this.createRandomId(),
                    list: group
                })
            }
            this.progressBarList.list = progressBarList
            //除以10
            maxEnd = Math.ceil(maxEnd / 10)
            this.echartsData.columnNumber = maxEnd

            // 渲染图表
            let _row = [] // 行
            for (let i = 0; i < maxRow; i++) {
                let _box = [] // 列
                for (let n = 0; n < maxEnd; n++) {
                    _box.push({
                        title: `${i},${n}`,
                    })
                }
                _row.push(_box)
            }
            this.echartsData.row = _row

            // 刻度线
            const scaleLine = []
            for (let i = 0, iLen = _row[0].length; i < iLen; i++) {
                if (i % 10 === 0) {
                    scaleLine.push({
                        id: this.createRandomId(),
                        value: i * 10
                    })
                }
            }
            this.scaleLine.list = scaleLine
        },
        scaleLineStyle(data) {
            let style = ''
            const left = ((data.value / 10) * 40) + 7
            style += `left:${left}px;`
            return style
        },
        progressBarStyle(data) {
            let style = ''
            const width = data.duration * 40 / 10
            const left = data.start * 40 / 10
            style += `width:${width}px; left:${left}px;`
            if (data.OverstepUpperLimit || data.NotReachedLowerLimit) {
                style += `borderRight: none;`
            }
            return style
        },
        progressRedStyle(data) {
            let style = ''
            const width = data.OverstepUpperLimit * 40 / 10
            style += `width:${width}px;`
            return style
        },
        progressGreyStyle(data) {
            let style = ''
            const width = data.NotReachedLowerLimit * 40 / 10
            style += `width:${width}px;`
            return style
        },
    },
    mounted() {
        this.$nextTick(() => {
        })
    },
}
</script>
<style lang="scss" scoped>
$color1: #E4E4E4;

.flex {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}

::v-deep .is-checked {
    .el-switch__core {
        background: #4270E4;

        &::after {
            background-color: white !important;
        }
    }
}

.my-extable {
    position: fixed;
    right: 0;
    top: 0;
    transform: translate(100%, 0);
    width: fit-content;
    height: fit-content;
    padding: 14px 20px;
    box-sizing: border-box;

    .ex-title {
        width: 100%;
        height: 50px;
        border: 1px solid #e4e4e4;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .ex-label {
        width: 100%;
        height: 50px;
        border: 1px solid #e4e4e4;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        padding-left: 16px;
        box-sizing: border-box;

        .label {
            margin-right: 30px;
        }
    }

    &>.my-head {
        width: 100%;
        height: 80px;
        margin: 0 0 10px 0;
        font-size: 16px;
        font-weight: 400;
        color: #4270E4;
        background-color: #EEF3FF;
        border: 1px solid #BACAF2;
        justify-content: space-between;
        position: relative;

        .totalTime {
            position: absolute;
            right: 20px;
            bottom: 5px;
        }

        &>.column {
            height: 100%;
            line-height: 1;
            font-weight: bold;
            font-size: 18px;
            display: flex;
            align-items: center;
            justify-content: center;
            word-break: break-all;
            border-right: 1px solid #BACAF2;
        }

        &>.column:last-child {
            border-right: none;
        }

        &>.column-1 {
            width: 60px;
            min-width: 60px;
        }

        &>.column-2 {
            width: 160px;
            min-width: 160px;
        }

        &>.column-3 {
            width: 200px;
            min-width: 200px;
            height: 100%;
            display: block !important;

            &>.row {
                width: 100%;
                height: 50%;
                line-height: 40px;
                text-align: center;

                &>.item {
                    width: 33.33333333%;
                    border-top: 1px solid #BACAF2;
                    border-right: 1px solid #BACAF2;
                    line-height: 40px;
                    text-align: center;
                }

                &>.item:last-child {
                    border-right: none;
                }
            }
        }

        &>.column-4 {
            width: 100%;
            height: 100%;

            ::v-deep .el-checkbox {
                margin: 0 0 0 10px;

                .el-checkbox__label {
                    padding: 0 0 0 5px;
                }
            }
        }
    }

    &>.my-content {
        width: 100%;
        height: calc(100% - 90px);
        padding: 10px 10px 10px 0px;
        background-color: #F8F8F8;
        flex-direction: column;
        position: relative;

        &>.my-content-head {
            width: calc(100% - 440px);
            justify-content: space-between;
            margin: 0 0 0 440px;

            // background: red;
            &>.right {
                .item {
                    margin: 0 0 0 20px;

                    .icon {
                        width: 18px;
                        height: 18px;
                        margin: 0 10px 0 0;
                        background: #FFFFFF;
                    }

                    .state-1 {
                        border: 1px solid #46BE05;
                    }

                    .state-2 {
                        border: 1px solid #4270E4;
                    }

                    .state-3 {
                        width: 54px;
                        background: rgba(255, 255, 255, 0);

                        &::after {
                            display: block;
                            content: "";
                            width: 18px;
                            height: 18px;
                            margin: 0 10px 0 0;
                            background: #D8E3FF;
                        }

                        &::before {
                            display: block;
                            content: "";
                            width: 18px;
                            height: 18px;
                            margin: 0 10px 0 0;
                            background: #D4FBBF;
                        }
                    }

                    .state-4 {
                        background-color: #F65757;
                    }

                    .state-5 {
                        background-color: #BBBBBB;
                    }
                }
            }
        }

        &>.container {
            width: 100%;
            height: calc(100% - 25px);

            position: relative;
            align-items: flex-start;

            &>.container-table {
                width: 420px;
                padding: 30px 0 0 0;

                &>.item {
                    width: 100%;
                    // margin: 0 0 40px 0;
                    margin: 0 0 38px 0;
                    background-color: white;
                    border: 1px solid $color1;
                    justify-content: space-between;
                    border-right: 1px solid $color1;

                    &:last-child {
                        margin: 0 0 0 0;
                    }

                    &>.left {
                        width: 60px;
                        // height: 100%;
                        height: 40px;
                        text-align: center;
                        word-break: break-all;
                    }

                    &>.right {
                        width: calc(100% - 60px);
                        line-height: 40px;
                        border-left: 1px solid $color1;

                        &>.row {
                            width: 100%;
                            height: 40px;
                            border-bottom: 1px solid $color1;

                            &>.column {
                                // height: 100%;
                                height: 40px;
                                padding: 0 10px;
                                border-right: 1px solid $color1;
                                line-height: 1;
                                display: flex;
                                align-items: center;
                            }

                            &>.column:last-child {
                                border-right: none;
                            }

                            &>.column-1 {
                                width: 160px;
                                min-width: 160px;
                            }

                            &>.column-2 {
                                width: 66px;
                                min-width: 66px;
                            }

                            &>.column-3 {
                                width: 66px;
                                min-width: 66px;
                            }

                            &>.column-4 {
                                width: 66px;
                                min-width: 66px;
                            }
                        }

                        &>.row:last-child {
                            border-bottom: none;
                        }

                        &>.title {
                            padding: 5px 10px;
                            background-color: #EEEEEE;
                            justify-content: space-between;
                        }
                    }
                }
            }

            .container-echarts {
                width: calc(100% - 437px);
                padding: 30px 0 0 7px;
                margin: 0 0 0 15px;
                position: relative;

                // 栅格
                .row {
                    height: 40px;
                    border-bottom: 1px solid $color1;
                    justify-content: flex-start;
                    position: relative;

                    .box {
                        width: 40px;
                        min-width: 40px;
                        height: 40px;
                        min-height: 40px;
                        text-align: center;
                        line-height: 40px;
                        background-color: white;
                        border-right: 1px solid $color1;
                        border-bottom: 1px solid $color1;
                    }

                    &>.box:last-child {
                        border-right: none;
                    }

                    &:first-child {
                        .box {
                            border-top: 1px solid $color1;
                        }
                    }
                }

                // 刻度线
                .scale-line {
                    position: absolute;
                    top: 0;
                    width: 1px;
                    height: 100%;

                    .content {
                        width: 100%;
                        height: 100%;
                        padding: 5px 0 0 0;
                        position: relative;

                        .value {
                            width: 100px;
                            height: 24px;
                            text-align: center;
                            transform: translate(-50%, 0);
                        }

                        .line {
                            width: 1px;
                            height: calc(100% - 25px);
                            border-left: 1px solid #999999;
                        }
                    }
                }

                // 进度条
                .progress-bar {
                    width: 100%;
                    height: 100%;
                    position: absolute;
                    top: 0;
                    left: 0;

                    .container {
                        width: 100%;
                        height: 100%;
                        position: relative;
                        padding: 0 0 0 7px;

                        .group {
                            width: 100%;
                            position: relative;
                            // margin: 40px 0 0 0;
                            padding: 80px 0 0 0;

                            .box {
                                height: 40px;
                                padding: 4px 0 5px 0;
                                position: relative;

                                .bar,
                                .isManualBar {
                                    // width: 100%;
                                    height: 30px;
                                    position: absolute;
                                    background-color: #D8E3FF;
                                    border: 1px solid #4270E4;

                                    .redBar {
                                        position: absolute;
                                        right: 0;
                                        top: 50%;
                                        transform: translate(0, -50%);
                                        height: 30px;
                                        border: 1px solid #4270E4;
                                        border-left: none;
                                        background-color: #F65757;
                                    }

                                    .greyBar {
                                        position: absolute;
                                        right: 0;
                                        top: 50%;
                                        transform: translate(100%, -50%);
                                        height: 30px;
                                        border-left: 1px solid #4270E4;
                                        border-right: 1px solid #BBBBBB;
                                        background-color: #BBBBBB;
                                    }
                                }

                                .isManualBar {
                                    background-color: #D4FBBF;
                                    border: 1px solid #46BE05;
                                }

                            }

                            &:first-child {
                                // margin: 30px 0 0 0;
                                padding: 70px 0 0 0;
                            }
                        }
                    }
                }

                // 辅助线
                #auxiliary-wire {
                    position: absolute;
                    top: 0;
                    width: 10px;
                    height: 100%;
                    // background-color: #46BE05;
                    cursor: w-resize;

                    &::before {
                        content: "";
                        display: block;
                        width: 1px;
                        height: 100%;
                        border-left: 2px solid #4270E4;
                    }
                }
            }
        }
    }
}
</style>
  