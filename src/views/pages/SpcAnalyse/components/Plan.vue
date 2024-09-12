<template>
    <div class="main" id="plan"></div>
</template>
<script>
import {
    defineComponent,
    ref,
    nextTick,
    getCurrentInstance,
    onMounted,
    watch
} from '@vue/composition-api';
import * as echarts from 'echarts';

export default defineComponent({
    name: 'Plan',
    props: {
        chartData: {
            type: Object,
            default: () => ({})
        }
    },
    setup(props) {
        // 正太分布图数据
        let testChartData = {
            xData: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            barData: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6],
            lineData: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3]
        };

        let main1Chart = null;

        const renderMain = chartData => {
            chartData = JSON.parse(chartData);
            // 基于准备好的dom，初始化echarts实例
            main1Chart = echarts.init(document.getElementById('plan'));
            // 指定图表的配置项和数据
            const option = {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        crossStyle: {
                            color: '#999'
                        }
                    }
                },
                color: '#5C8CDA',
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
                        /* 自定义恢复按钮 */
                        //myTool1: {
                        //  show: true,
                        //  title: '还原',
                        //  icon: 'path://M -6.9994 0.9083 M 4.5416 -2.9654 L 7.1597 -2.9654 L 7.1597 -5.6904 M 7.0261 -2.6448 C 5.9041 -5.6102 2.8051 -7.8543 -0.8549 -7.4536 C -4.6485 -7.0261 -7.5872 -3.6867 -7.4536 0.1603 M -4.5416 2.9654 L -7.1864 2.9654 L -7.1864 5.6904 M -7.0261 2.6448 C -5.9041 5.6102 -2.8051 7.8543 0.8549 7.4536 C 4.6485 7.0261 7.5872 3.6867 7.4536 -0.1603',
                        //  onclick: function (){
                        //    barRefresh()
                        //  }
                        //},
                    }
                },
                xAxis: [
                    {
                        type: 'category',
                        data: chartData.xData,
                        axisPointer: {
                            type: 'shadow'
                        }
                    }
                ],
                yAxis: [
                    {
                        type: 'value'
                    },
                    {
                        type: 'value'
                    }
                ],
                series: [
                    {
                        type: 'bar',
                        // label: {
                        //   show: true,
                        //   position: 'top',
                        // },
                        data: chartData.barData
                    },
                    {
                        type: 'line',
                        yAxisIndex: 1,
                        data: chartData.lineData,
                        itemStyle: {
                            color: '#3FC1D5'
                        }
                    }
                ]
            };

            // 使用刚指定的配置项和数据显示图表。
            main1Chart.setOption(option, true);
        };

        watch(
            () => props.chartData,
            () => {
                if (!props.chartData.ChartData) {
                    return;
                }
                renderMain(props.chartData.ChartData);
            },
            { deep: true }
        );

        const getDataURL = () => {
            const baseArr = [];
            if (!main1Chart) return []
            const imageDataURL1 = main1Chart.getDataURL({
                pixelRatio: 1, // 图片分辨率，默认为 1，可以设置为 2 增加分辨率
                backgroundColor: '#fff', // 图片背景色，默认为透明背景
                mimeType: 'image/png' // 图片的 MIME 类型，默认为 'image/png'
            });
            baseArr.push(imageDataURL1);
            return baseArr;
        };

        onMounted(() => {
            console.log(echarts, '-- echarts');
            nextTick(() => {
                if (props.chartData.ChartData) {
                    renderMain(props.chartData.ChartData);
                }
            });
        });

        return {
            getDataURL
        };
    }
});
</script>
<style lang="scss" scoped>
.main {
    width: 100%;
    height: 100%;
}
</style>
