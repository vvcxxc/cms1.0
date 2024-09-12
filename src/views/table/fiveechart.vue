
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
            targetPage: 1,
            option12:{},
            Chart5: null
        };
    },
    created() {
        this.targetPage = this.pageData.PageIndex;
    },
    computed:{
        theme(){
            return this.$store.state.color
        }
    },  
    watch: {
        theme(val){
            if(val === 'blackBlue'){
                this.option12.color = ['#5470C6']
                this.option12.yAxis[0].splitLine.lineStyle.color = '#4C5777'
                this.option12.yAxis[0].axisLabel.color = '#9AA3BE'
                this.option12.xAxis[0].splitLine.lineStyle.color = '#4C5777'
                this.option12.xAxis[0].axisLabel.color = '#9AA3BE'
                this.option12.yAxis[0].nameTextStyle.color = '#9AA3BE'
            }else{
                this.option12.color = ['#E60012']
                this.option12.yAxis[0].splitLine.lineStyle.color = '#ccc'
                this.option12.yAxis[0].axisLabel.color = '#333'
                this.option12.xAxis[0].splitLine.lineStyle.color = '#ccc'
                this.option12.xAxis[0].axisLabel.color = '#333'
                this.option12.yAxis[0].nameTextStyle.color = '#333'
            }
            this.Chart5.setOption(this.option12);
        }
    },
    methods: {
        intheadchart5() {
            this.Chart5 = this.$echarts.init(
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
            this.option12 = {
                calculable: true,
                xAxis: [
                    {
                        type: 'category',
                        boundaryGap: false,
                        data: xdata1_1,
                        splitLine:{
                            lineStyle: {
                                color: this.$store.state.color === 'blackBlue' ? '#4C5777' : '#ccc'
                            }
                        },
                        axisLabel: {
                            color: this.$store.state.color === 'blackBlue' ? '#9AA3BE' : '#333',
                        },
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
                        splitLine:{
                            lineStyle: {
                                color: this.$store.state.color === 'blackBlue' ? '#4C5777' : '#ccc'
                            }
                        },
                        axisLabel: {
                            color: this.$store.state.color === 'blackBlue' ? '#9AA3BE' : '#333',
                            formatter: '{value}'
                        },
                        name: this.$t('CpkMsg.CpkAverage'),
                        nameTextStyle: {
                            fontSize: 16,
                            fontFamily: 'SiYuanHei',
                            color: this.$store.state.color === 'blackBlue' ? '#9AA3BE' : '#333',
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
                this.option12.series.push(obj);
            }
            console.log("this.option12",JSON.stringify(this.option12))
            this.Chart5.setOption(this.option12);
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