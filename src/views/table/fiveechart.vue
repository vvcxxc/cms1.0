
<template>
    <div class="ww">
        <div id="myChart4" ref="myChart" :style="{width: '100%', height: '100%'}"></div>
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
        intheadchart5() {
            let Chart5 = this.$echarts.init(
                document.getElementById('myChart4')
            );
            let xdata1_1 = new Array();
            for (let i = 1; i < this.ChartDataSource.length + 1; i++) {
                xdata1_1.push(i);
            }
            let ydata1_1 = new Array();

            // if (this.ChartDataSource[0] < 50) {
            //     let a3 = 0;
            //     ydata1_1.push(a3);
            // } else {
            //     let a3 = 0;
            //     a3 =
            //           parseFloat(this.ChartDataSource[0].mean) -
            //           parseFloat((this.ChartDataSource[0].mean % 50));
            //     ydata1_1.push(a3);
            // }
            //   var a = 0;
            // a =
            //     a +
            //     parseFloat((this.ChartDataSource[this.ChartDataSource.length - 1].mean %
            //         50)) +
            //       parseFloat(this.ChartDataSource[this.ChartDataSource.length - 1].mean);
            // ydata1_1.push(a);
            // console.log(ydata1_1)
            // console.log( (this.ChartDataSource[this.ChartDataSource.length - 1].mean %
            //         50))
            for (let i = 0; i < this.ChartDataSource.length; i++) {
                ydata1_1.push(parseFloat(this.ChartDataSource[i].mean));
            }
            // ydata1_1 = [parseFloat(this.ChartDataItem.PrDownLimit),parseFloat(this.ChartDataItem.PrDownLimit)+50]
            let USL = parseFloat(this.ChartDataItem.PrUpLimit);
            let LSL = parseFloat(this.ChartDataItem.PrDownLimit);
            let Taget = parseFloat(this.ChartDataItem.PrgoalValue);
            let minyy = Math.min.apply(null, ydata1_1);
            let maxyy = Math.max.apply(null, ydata1_1);

            if (parseFloat(LSL) < minyy) {
                minyy = parseFloat(LSL);
            }
            if (parseFloat(USL) > maxyy) {
                maxyy = parseFloat(USL);
            }
            let option12 = {
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
                                    name: 'Taget',
                                    yAxis: Taget
                                }
                            ]
                        }
                    }
                ]
            };
            // //按样本数增加样本数个数的散点图
            for (
                let m = 0;
                m < parseInt(this.ChartDataItem.PrSampleNumber);
                m++
            ) {
                let yadata1_1 = new Array();
                for (let mm = 0; mm < this.ChartDataSource.length; mm++) {
                    yadata1_1.push(
                        parseFloat(this.ChartDataSource[mm].datasource[m].value)
                    );
                }
                let obj = {
                    name: this.$t('CpkMsg.CpkSample') + m,
                    nameTextStyle: {
                        fontFamily: 'SiYuanHei'
                    },
                    type: 'scatter',
                    data: ydata1_1
                };
                option12.series.push(obj);
            }
            console.log("option12",JSON.stringify(option12))
            Chart5.setOption(option12);
        }
    },
    mounted() {
        console.log('11111111111111111', this.ChartCalResult);
        this.$nextTick(function() {
            this.intheadchart5();
        });
    }
};
</script>
<style lang='scss' scoped>
.ww {
    background: #f2f2f2;
}
</style>