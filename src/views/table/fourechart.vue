
<template>
    <div class="ww">
        <div id="myChart3" ref="myChart" :style="{width: '100%', height: '100%'}"></div>
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
        this.targetPage = this.pageData.PageIndex;
    },
    methods: {
        intheadchart4() {
            let Chart4 = this.$echarts.init(
                document.getElementById('myChart3')
            );
            let xdata1_1 = new Array();
            let ydata1_1 = new Array();
            for (let i = 0; i < this.ChartDataSource.length; i++) {
                for (
                    let j = 0;
                    j < this.ChartDataSource[i].datasource.length;
                    j++
                ) {
                    xdata1_1.push(i + 1);
                    ydata1_1.push(
                        parseFloat(this.ChartDataSource[i].datasource[j].value)
                    );
                }
            }
            let USL = parseFloat(this.ChartDataItem.PrUpLimit);
            let LSL = parseFloat(this.ChartDataItem.PrDownLimit);
            let minyy = Math.min.apply(null, ydata1_1);
            let maxyy = Math.max.apply(null, ydata1_1);

            if (parseFloat(LSL) < minyy) {
                minyy = parseFloat(LSL);
            }
            if (parseFloat(USL) > maxyy) {
                maxyy = parseFloat(USL);
            }
            let option13 = {
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
                        name: this.$t('CpkMsg.CpkSampleValue'),
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
                                }
                            ]
                        }
                    }
                ]
            };
            Chart4.setOption(option13);
        }
    },
    mounted() {
        console.log('11111111111111111', this.ChartCalResult);
        this.$nextTick(function() {
            this.intheadchart4();
        });
    }
};
</script>
<style lang='scss' scoped>
.ww {
    background: #f2f2f2;
}
</style>