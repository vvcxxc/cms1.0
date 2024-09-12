
<template>
    <div class="ww">
        <div id="myChart1" ref="myChart" :style="{width: '100%', height: '130%'}"></div>
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
        intheadchart2() {
            let Chart2 = this.$echarts.init(
                document.getElementById('myChart1')
            );

            let xdata1_1 = new Array();
            for (let i = 1; i < this.ChartDataSource.length + 1; i++) {
                xdata1_1.push(i);
            }
            let ydata1_1 = new Array();
            for (let i = 0; i < this.ChartDataSource.length; i++) {
                if(this.ChartDataItem.PrType == 'XS'){
                   ydata1_1.push(parseFloat(this.ChartDataSource[i].ste));
                }else{
                     ydata1_1.push(parseFloat(this.ChartDataSource[i].range));
                }
               
            }
            let UCL = parseFloat(this.ChartCalResult.m_uslr);
            let LCL = parseFloat(this.ChartCalResult.m_lslr);
            let minyy = Math.min.apply(null, ydata1_1);
            let maxyy = Math.max.apply(null, ydata1_1);
            if (parseFloat(LCL) < minyy) {
                minyy = parseFloat(LCL);
            }
            if (parseFloat(UCL) > maxyy) {
                maxyy = parseFloat(UCL);
            }
            let option2 = {
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
                        name: this.ChartDataItem.PrType=='XS'?this.$t('CpkMsg.CpkStandard'):this.$t('CpkMsg.CpkAverage'),
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
            Chart2.setOption(option2);
        }
    },
    mounted() {
        console.log('11111111111111111', this.ChartDataSource);
                console.log('11111111111111111', this.ChartDataItem);
        this.$nextTick(function() {
            this.intheadchart2();
        });
    }
};
</script>
<style lang='scss' scoped>
.ww {
    background: #f2f2f2;
}
</style>