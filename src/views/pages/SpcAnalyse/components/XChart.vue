<template>
    <div class="chart-centent">
        <div class="content-item">
            <div class="chart-name">{{ lang[chartData.ChartXTitle] }}</div>
            <div class="content">
                <div class="chart">
                    <div class="dot-explain">
                        <span class="dot-item">
                            <img src="@/assets/images/pages/dot_icon.png" />{{
                                lang.SPCAnalysis_SPCAnalysisUserControl_Point
                            }}
                        </span>
                        <span class="dot-item">
                            <img src="@/assets/images/pages/center_dot.png" />{{
                                lang.SPCAnalysis_SPCAnalysisUserControl_CenterLine
                            }}
                        </span>
                        <span class="dot-item">
                            <img src="@/assets/images/pages/USL.png" />USL
                        </span>
                        <span class="dot-item">
                            <img src="@/assets/images/pages/LSL.png" />LSL
                        </span>
                        <span class="dot-item">
                            <img
                                src="@/assets/images/pages/deviate_dot.png"
                            />{{
                                lang.SPCAnalysis_SPCAnalysisUserControl_OutOfControlPoint
                            }}
                        </span>
                    </div>
                    <div class="line-chart" id="lineChart1"></div>
                </div>
            </div>
        </div>

        <div class="content-item">
            <div class="chart-name">{{ lang[chartData.ChartRTitle] }}</div>
            <div class="content">
                <div class="chart">
                    <div class="dot-explain">
                        <span class="dot-item">
                            <img src="@/assets/images/pages/dot_icon.png" />{{
                                lang.SPCAnalysis_SPCAnalysisUserControl_Point
                            }}
                        </span>
                        <span class="dot-item">
                            <img
                                src="@/assets/images/pages/center_dot.png"
                            />中心线
                        </span>
                        <span class="dot-item">
                            <img src="@/assets/images/pages/USL.png" />USL
                        </span>
                        <span class="dot-item">
                            <img src="@/assets/images/pages/LSL.png" />LSL
                        </span>
                        <span class="dot-item">
                            <img
                                src="@/assets/images/pages/deviate_dot.png"
                            />{{
                                lang.SPCAnalysis_SPCAnalysisUserControl_OutOfControlPoint
                            }}
                        </span>
                    </div>
                    <div
                        class="line-chart"
                        id="lineChart2"
                        width="100%"
                        height="100%"
                    ></div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {
    defineComponent,
    ref,
    nextTick,
    getCurrentInstance,
    watch,
    onMounted
} from '@vue/composition-api';
import * as echarts from 'echarts';

export default defineComponent({
    name: 'XChart',
    props: {
        chartData: {
            type: Object,
            default: () => ({})
        }
    },
    setup(props) {
        // X-R图数据
        let lineData1 = {
            xData: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], //x轴数据
            markLineData: [
                {
                    name: 'LSL',
                    value: 100
                },
                {
                    name: '中心线',
                    value: 200
                },
                {
                    name: 'USL',
                    value: 250
                }
            ], //4条标线数据
            lineData: {
                name: '点',
                data: [50, 150, 230, 360, 218, 165, 260],
                info: [
                    {
                        data: 50,
                        state: true
                    },
                    {
                        data: 150,
                        state: true
                    },
                    {
                        data: 230,
                        state: false
                    },
                    {
                        data: 360,
                        state: true
                    },
                    {
                        data: 218,
                        state: false
                    },
                    {
                        data: 165,
                        state: true
                    },
                    {
                        data: 260,
                        state: true
                    }
                ]
            }
        };
        let lineData2 = {
            xData: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], //x轴数据
            markLineData: [
                {
                    name: 'LSL',
                    value: 100
                },
                {
                    name: '中心线',
                    value: 200
                },
                {
                    name: 'USL',
                    value: 400
                }
            ], //4条标线数据
            lineData: {
                name: '点',
                // data: [30, 100, 260, 390, 111, 165, 450]
                info: [
                    {
                        data: 30,
                        state: true
                    },
                    {
                        data: 100,
                        state: true
                    },
                    {
                        data: 260,
                        state: false
                    },
                    {
                        data: 390,
                        state: true
                    },
                    {
                        data: 111,
                        state: false
                    },
                    {
                        data: 165,
                        state: true
                    },
                    {
                        data: 450,
                        state: true
                    }
                ]
            } // 折线数据
        };

        let lineChart1 = null;
        let lineChart2 = null;

        lineData1 = JSON.stringify(lineData1);
        lineData2 = JSON.stringify(lineData2);

        const renderMainChart = (lineData1, lineData2) => {
            lineData1 = JSON.parse(lineData1);
            lineData2 = JSON.parse(lineData2);
            console.log(document.getElementById('lineChart1'), '--111');
            // 基于准备好的dom，初始化echarts实例
            lineChart1 = echarts.init(document.getElementById('lineChart1'));
            lineChart2 = echarts.init(document.getElementById('lineChart2'));

            let markLineData1 = []; // 渲染x管制图 标线以及标线颜色
            lineData1.markLineData.forEach(item => {
                if (item.name === 'LSL') {
                    markLineData1.push({
                        yAxis: item.value,
                        lineStyle: {
                            type: 'dashed',
                            width: 2,
                            color: '#9E2D2D'
                        }
                    });
                }
                if (
                    item.name ===
                    lang.SPCAnalysis_SPCAnalysisUserControl_CenterLine
                ) {
                    markLineData1.push({
                        yAxis: item.value,
                        lineStyle: {
                            type: 'dashed',
                            width: 2,
                            color: '#95F204'
                        }
                    });
                }
                if (item.name === 'USL') {
                    markLineData1.push({
                        yAxis: item.value,
                        lineStyle: {
                            type: 'dashed',
                            width: 2,
                            color: '#E0BBBB'
                        }
                    });
                }
            });

            let markLineData2 = []; // 渲染R管制图 标线以及标线颜色
            lineData2.markLineData.forEach(item => {
                if (item.name === 'LSL') {
                    markLineData2.push({
                        yAxis: item.value,
                        lineStyle: {
                            type: 'dashed',
                            width: 2,
                            color: '#9E2D2D'
                        }
                    });
                }
                if (
                    item.name ===
                    lang.SPCAnalysis_SPCAnalysisUserControl_CenterLine
                ) {
                    markLineData2.push({
                        yAxis: item.value,
                        lineStyle: {
                            type: 'dashed',
                            width: 2,
                            color: '#95F204'
                        }
                    });
                }
                if (item.name === 'USL') {
                    markLineData2.push({
                        yAxis: item.value,
                        lineStyle: {
                            type: 'dashed',
                            width: 2,
                            color: '#E0BBBB'
                        }
                    });
                }
            });
            let seriesData1 = lineData1.lineData.info.map(item => item.data);
            let seriesData2 = lineData2.lineData.info.map(item => item.data);
            // 指定图表的配置项和数据
            var option1 = {
                toolbox: {
                    feature: {
                        dataZoom: {
                            yAxisIndex: 'none'
                        },
                        restore: {
                            show: true,
                            onclick: () => {
                                debugger;
                            }
                        }
                        // restore: { show: true },
                        /* 自定义恢复按钮 */
                        //myTool2: {
                        //  show: true,
                        //    title: '还原',
                        //  icon: 'path://M -6.9994 0.9083 M 4.5416 -2.9654 L 7.1597 -2.9654 L 7.1597 -5.6904 M 7.0261 -2.6448 C 5.9041 -5.6102 2.8051 -7.8543 -0.8549 -7.4536 C -4.6485 -7.0261 -7.5872 -3.6867 -7.4536 0.1603 M -4.5416 2.9654 L -7.1864 2.9654 L -7.1864 5.6904 M -7.0261 2.6448 C -5.9041 5.6102 -2.8051 7.8543 0.8549 7.4536 C 4.6485 7.0261 7.5872 3.6867 7.4536 -0.1603',
                        //  onclick: function (){
                        //    lineRefresh1()
                        //  }
                        //},
                    }
                },
                tooltip: {
                    formatter: function(params) {
                        if (params.componentType === 'series') {
                            if ([0, 1, 2].includes(params.dataIndex)) {
                                return '';
                            }
                            if (params.value > 100 && params.value < 250) {
                                return `${params.value}`;
                            } else {
                                return `${params.value}`;
                            }
                        }
                        if (params.componentType === 'markLine') {
                            if (params.borderColor === '#9E2D2D') {
                                return `LSL：${params.value}`;
                            }
                            if (params.borderColor === '#95F204') {
                                return `中心线：${params.value}`;
                            }
                            if (params.borderColor === '#E0BBBB') {
                                return `USL：${params.value}`;
                            }
                        }
                    }
                },
                // legend: {
                //   data: ['点'],
                //   right: 4,
                //   top: 40,
                //   align: 'right',
                //   textStyle: {
                //     padding: [5, 5, 5, 5]
                //   }
                // },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: lineData1.xData
                },
                yAxis: {
                    type: 'value'
                },
                // visualMap: {
                //   show: true,
                //   top: 60,
                //   right: 10,
                //   type: 'piecewise',
                //   pieces: [
                //     {
                //       lte: lineData1.markLineData[0].value,
                //       color: 'red',
                //       label: '下限失控点',
                //     },
                //     {
                //       gt: lineData1.markLineData[0].value,
                //       lte: lineData1.markLineData[1].value,
                //       color: '#95F204',
                //       label: lineData1.markLineData[1].name
                //     },
                //     {
                //       gt: lineData1.markLineData[1].value,
                //       lte: lineData1.markLineData[2].value,
                //       color: '#E0BBBB',
                //       label: lineData1.markLineData[2].name
                //     },
                //     {
                //       gt: lineData1.markLineData[2].value,
                //       color: 'red',
                //       label: '上限失控点',
                //     }
                //   ],
                //   outOfRange: {
                //     color: '#9BBCDB' /* #999 */
                //   }
                // },
                series: [
                    {
                        data: seriesData1,
                        type: 'line',
                        name: lineData1.lineData.name,
                        symbolSize: 10,
                        symbol: 'circle',
                        itemStyle: {
                            color: function(params) {
                                let maxVal = 0;
                                let minVal = 0;
                                lineData1.markLineData.forEach(item => {
                                    if (item.name === 'LSL') {
                                        minVal = item.value;
                                    }
                                    if (item.name === 'USL') {
                                        maxVal = item.value;
                                    }
                                });
                                //if(params.value > 0 && params.value < minVal){
                                //    return "#D9001B";
                                //}else if(params.value >= maxVal ){
                                //    return "#D9001B";
                                //}
                                if (
                                    lineData1.lineData.info[params.dataIndex]
                                        .state
                                ) {
                                    return '#D9001B';
                                }
                                return '#5C7BD9';
                            }
                        },
                        label: {
                            show: true,
                            position: 'top'
                        },
                        markLine: {
                            symbol: 'none', //去掉标线最后面的箭头
                            data: markLineData1 /* [
            {
              yAxis: lineData1.markLineData[0].value,
              lineStyle:{
                type:"dashed",
                width: 2,
                color:"#9E2D2D"
              }
            },
            {
              yAxis: lineData1.markLineData[1].value,
              lineStyle:{
                type:"dashed",
                width: 2,
                color:"#95F204"
              }
            },
            {
              yAxis: lineData1.markLineData[2].value,
              lineStyle:{
                type:"dashed",
                width: 2,
                color:"#E0BBBB"
              }
            }
          ] */
                        }
                    }
                ],
                grid: {
                    left: '70px',
                    right: '70px'
                }
            };

            var option2 = {
                toolbox: {
                    feature: {
                        dataZoom: {
                            yAxisIndex: 'none'
                        },
                        restore: { show: true }
                        /* 自定义恢复按钮 */
                        //myTool3: {
                        //  show: true,
                        //    title: '还原',
                        //  icon: 'path://M -6.9994 0.9083 M 4.5416 -2.9654 L 7.1597 -2.9654 L 7.1597 -5.6904 M 7.0261 -2.6448 C 5.9041 -5.6102 2.8051 -7.8543 -0.8549 -7.4536 C -4.6485 -7.0261 -7.5872 -3.6867 -7.4536 0.1603 M -4.5416 2.9654 L -7.1864 2.9654 L -7.1864 5.6904 M -7.0261 2.6448 C -5.9041 5.6102 -2.8051 7.8543 0.8549 7.4536 C 4.6485 7.0261 7.5872 3.6867 7.4536 -0.1603',
                        //  onclick: function (){
                        //    lineRefresh2()
                        //  }
                        //},
                    }
                },
                tooltip: {
                    formatter: function(params) {
                        if (params.componentType === 'series') {
                            if ([0, 1, 2].includes(params.dataIndex)) {
                                return '';
                            }
                            if (params.value > 100 && params.value < 250) {
                                return `${params.value}`;
                            } else {
                                return `${params.value}`;
                            }
                        }
                        if (params.componentType === 'markLine') {
                            if (params.borderColor === '#9E2D2D') {
                                return `LSL：${params.value}`;
                            }
                            if (params.borderColor === '#95F204') {
                                return `中心线：${params.value}`;
                            }
                            if (params.borderColor === '#E0BBBB') {
                                return `USL：${params.value}`;
                            }
                        }
                    }
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: lineData2.xData
                },
                yAxis: {
                    type: 'value'
                },
                series: [
                    {
                        data: seriesData2,
                        type: 'line',
                        name: lineData2.lineData.name,
                        symbolSize: 10,
                        symbol: 'circle',
                        itemStyle: {
                            color: function(params) {
                                let maxVal = 0;
                                let minVal = 0;
                                lineData2.markLineData.forEach(item => {
                                    if (item.name === 'LSL') {
                                        minVal = item.value;
                                    }
                                    if (item.name === 'USL') {
                                        maxVal = item.value;
                                    }
                                });
                                //if(params.value > 0 && params.value < minVal){
                                //    return "#D9001B";
                                //}else if(params.value >= maxVal ){
                                //    return "#D9001B";
                                //}
                                if (
                                    lineData2.lineData.info[params.dataIndex]
                                        .state
                                ) {
                                    return '#D9001B';
                                }
                                return '#5C7BD9';
                            }
                        },
                        label: {
                            show: true,
                            position: 'top'
                        },
                        markLine: {
                            symbol: 'none', //去掉标线最后面的箭头
                            data: markLineData2
                        }
                    }
                ],
                grid: {
                    left: '70px',
                    right: '70px'
                }
            };

            // 使用刚指定的配置项和数据显示图表。
            lineChart1.setOption(option1, true);
            lineChart2.setOption(option2, true);
        };

        watch(
            () => props.chartData,
            () => {
                if (
                    !props.chartData.ChartXData &&
                    !props.chartData.ChartRData
                ) {
                    return;
                }
                renderMainChart(
                    props.chartData.ChartXData,
                    props.chartData.ChartRData
                );
            },
            { deep: true }
        );

        const getDataURL = () => {
            const baseArr = [];
            if (lineChart1) {
                const imageDataURL1 = lineChart1.getDataURL({
                    pixelRatio: 1, // 图片分辨率，默认为 1，可以设置为 2 增加分辨率
                    backgroundColor: '#fff', // 图片背景色，默认为透明背景
                    mimeType: 'image/png' // 图片的 MIME 类型，默认为 'image/png'
                });
                baseArr.push(imageDataURL1);
            }

            if (lineChart2) {
                const imageDataURL2 = lineChart2.getDataURL({
                    pixelRatio: 1, // 图片分辨率，默认为 1，可以设置为 2 增加分辨率
                    backgroundColor: '#fff', // 图片背景色，默认为透明背景
                    mimeType: 'image/png' // 图片的 MIME 类型，默认为 'image/png'
                });

                baseArr.push(imageDataURL2);
            }

            return baseArr;
        };

        const lang = ref({});
        onMounted(() => {
            lang.value = JSON.parse(localStorage.getItem('languages'))[
                localStorage.getItem('currentLang')
            ];
            nextTick(() => {
                if (
                    !props.chartData.ChartXData &&
                    !props.chartData.ChartRData
                ) {
                    return;
                }
                renderMainChart(
                    props.chartData.ChartXData,
                    props.chartData.ChartRData
                );
            });
        });

        return {
            lang,
            getDataURL
        };
    }
});
</script>
<style lang="scss" scoped>
.chart-centent {
    height: 100%;
    display: flex;
    flex-direction: column;
}
.dot-explain {
    display: flex;
    align-items: center;
    .dot-item {
        display: flex;
        align-items: center;
        margin-right: 20px;

        color: #333333;
        font-size: 14px;
        img {
            width: 20px;
            margin-right: 8px;
        }
    }
}
.chart-name {
    font-size: 14px;
    font-family: PingFang SC-Bold, PingFang SC;
    font-weight: bold;
    color: #333333;
    text-align: center;

    background: #e2e2e2;
    line-height: 30px;
}
.content-item {
    display: flex;
    flex-direction: column;
    flex: 1;
}
.content {
    padding: 20px;
    height: 100%;
    background: #fff;
    /* height: 350px; */
}

.chart {
    height: 100%;
}
.line-chart {
    width: 100%;
    height: 100%;
}
</style>
