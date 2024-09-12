
<template>
    <div class="ww">
        <div id="myChart" ref="myChart" :style="{width: '100%', height: '130%'}"></div>
    </div>
</template>
<script>
export default {
    props: ['ChartDataItem', 'ChartDataSource', 'ChartCalResult'],
    data() {
        return {
            targetPage: 1
        };
    },
    created() {
        // this.targetPage = this.pageData.PageIndex;
    },
    methods: {
        intheadchart1() {
            let Chart1 = this.$echarts.init(document.getElementById('myChart'));
            let xdata1_1 = new Array();
            for (let i = 1; i < this.ChartDataSource.length + 1; i++) {
                xdata1_1.push(i);
            }
            let ydata1_1 = new Array();
            for (let i = 0; i < this.ChartDataSource.length; i++) {
                ydata1_1.push(parseFloat(this.ChartDataSource[i].mean));
            }
            let USL = parseFloat(this.ChartDataItem.PrUpLimit);
            let LSL = parseFloat(this.ChartDataItem.PrDownLimit);
            let UCL = parseFloat(this.ChartCalResult.m_uslx);
            let LCL = parseFloat(this.ChartCalResult.m_lslx);
            let minyy = Math.min.apply(null, ydata1_1);
            let maxyy = Math.max.apply(null, ydata1_1);

            if (parseFloat(LSL) < minyy) {
                minyy = parseFloat(LSL);
            }
            if (parseFloat(USL) > maxyy) {
                maxyy = parseFloat(USL);
            }
            let option1 = {
                calculable: true,
                xAxis: [
                    {
                        type: 'category',
                        boundaryGap: false,
                        data: xdata1_1
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                         "axisTick":{       //y轴刻度线
          "show":true
        },
       "axisLine":{       //y轴
          "show":true

        },
                        axisLabel: {
                            formatter: '{value}'
                        },
                        name: this.$t('CpkMsg.CpkAverage'),
                        nameTextStyle: {
                            fontSize: 16,
                            fontFamily: 'SiYuanHei'
                        },
                        min: minyy,
                        max: maxyy
                    }
                ],
                series: [
                    {
                        name: this.$t('CpkMsg.CpkDetectTemperature'),
                        nameTextStyle: {
                            fontFamily: 'SiYuanHei'
                        },
                        type: 'line',
                        data: ydata1_1,
                        markLine: {
                            data: [
                                {
                                    type: 'average',
                                    name: this.$t('CpkMsg.CpkAverage')
                                },
                                {
                                    name: 'USL',
                                    yAxis: USL
                                },
                                {
                                    name: 'LSL',
                                    yAxis: LSL
                                },
                                {
                                    name: 'UCL',
                                    yAxis: UCL
                                },
                                {
                                    name: 'LCL',
                                    yAxis: LCL
                                }
                            ]
                        }
                    }
                ]
            };
            Chart1.setOption(option1);
            console.log(JSON.stringify(option1))
        }
    },
    mounted() {
        console.log('11111111111111111', this.ChartCalResult);
        this.$nextTick(function() {
            this.intheadchart1();
        });
    }
};
</script>
<style lang='scss' scoped>
.ww {
    background: #f2f2f2;
}
</style>