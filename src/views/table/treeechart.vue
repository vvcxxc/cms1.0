
<template>
    <div class="ww">
        <div id="myChart2" ref="myChart" :style="{width: '100%', height: '130%'}"></div>
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
        intheadchart3() {
            let means = parseFloat(this.ChartCalResult.m_means);
            let sigmas = parseFloat(this.ChartCalResult.m_rs);
            console.log("asd",this.ChartCalResult)
            let myChart = this.$echarts.init(
                document.getElementById('myChart2')
            );
            //提取y值
            let CPKY = new Array();
            for (let i = 0; i < this.ChartDataSource.length; i++) {
                for (
                    let j = 0;
                    j < this.ChartDataSource[i].datasource.length;
                    j++
                ) {
                    CPKY.push(
                        parseFloat(this.ChartDataSource[i].datasource[j].value)
                    );
                }
            }
            //提取样本数及最小样本差
            let mmaaxx = Math.max.apply(null, CPKY);
            //确定间距
            let sdf = Math.floor(Math.pow(CPKY.length, 0.5));
            let arrnumber = sdf;
            let det =
                (Math.max.apply(null, CPKY) - Math.min.apply(null, CPKY)) /
                arrnumber;
            let mininter = 2;
            let USL = 9;
            let LSL = 1;
            let xarrayx = new Array();
            //确定横坐标每组宽度
            let X_Y = new Array();
            for (let i = 0; i < arrnumber; i++) {
                X_Y[i] = new Array();
                X_Y[i][0] = Math.min.apply(null, CPKY) + i * det;
                let lit = Math.min.apply(null, CPKY) + (i + 1) * det;
                let ss = 0;
                for (let j = 0; j < CPKY.length; j++) {
                    if (i !== arrnumber - 1) {
                        if (CPKY[j] >= X_Y[i][0] && CPKY[j] < lit) {
                            ss = ss + 1;
                        }
                    } else if (i == arrnumber - 1) {
                        if (CPKY[j] >= X_Y[i][0] && CPKY[j] <= lit) {
                            ss = ss + 1;
                        }
                    }
                    //if (i == arrnumber - 1 && j == CPKY.length - 1) {
                    //    ss = ss + 1;
                    //}
                }
                X_Y[i][1] = ss;
            }
            //确定横坐标轴上下限
            if (Math.min.apply(null, CPKY) < LSL) {
                let downlimit = Math.min.apply(null, CPKY) - det;
                xarrayx.push(downlimit);
            } else {
                let downlimit = Math.min.apply(null, CPKY) - det;
                xarrayx.push(downlimit);
            }

            for (let i = 0; i < X_Y.length; i++) {
                xarrayx.push(X_Y[i][0]);
            }

            if (Math.max.apply(null, CPKY) > USL) {
                let uplimit = Math.max.apply(null, CPKY) + det;
                xarrayx.push(uplimit);
            } else {
                let uplimit = USL + det;
                xarrayx.push(uplimit);
            }
            let yarrayy = new Array();
            if (sigmas != 0) {
                for (let j = 0; j < xarrayx.length; j++) {
                    let esd =
                        (1 / sigmas / Math.pow(2 * Math.PI, 0.5)) *
                        Math.pow(
                            Math.E,
                            -Math.pow(xarrayx[j] - means, 2) /
                                2 /
                                Math.pow(sigmas, 2)
                        );
                    yarrayy.push(esd);
                }
            } else {
                for (let j = 0; j < xarrayx.length; j++) {
                    
                    let esd =
                        (1 / sigmas / Math.pow(2 * Math.PI, 0.5)) *
                        Math.pow(Math.E, -Math.pow(xarrayx[j] - means, 2) / 2);
                    yarrayy.push(esd);
                    console.log(esd)
                }
            }

            var dataxy = new Array();
         

            {
                for (let j = 0; j < xarrayx.length; j++) {
                    dataxy.push([xarrayx[j], yarrayy[j] * 100]);
                }
            }
                 function renderItem(params, api) {
                let yValue = api.value(2);
                let start = api.coord([api.value(0), yValue]);
                let size = api.size([api.value(1) - api.value(0), yValue]);
                let style = api.style();

                return {
                    type: 'rect',
                    shape: {
                        x: start[0] + 1,
                        y: start[1],
                        width: size[0] - 2,
                        height: size[1]
                    },
                    style: style
                };
            }
            // let bins = this.$ecStat.histogram(CPKY, 'scott');
            let interval;
            let min = Infinity;
            let max = -Infinity;
            let data = this.$echarts.util.map(X_Y, function(item, index) {
                let x0 = X_Y[index][0];
                let x1 = X_Y[index][0] + det;
                interval = det;
                min = Math.min(min, x0);
                max = Math.max(max, x1);
                return [x0, x1, item[1]];
            });
            let minxx = parseFloat((min - interval).toFixed(3));
            let maxxx = parseFloat((max + interval).toFixed(3));
            let intervalxx = parseFloat(interval.toFixed(3));
            let option11 = {
                title: {
                    text: this.$t('CpkMsg.CpkCapabilityAssessment'),
                    textStyle: {
                        fontFamily: 'SiYuanHei'
                    },
                    //sublink: 'https://github.com/ecomfe/echarts-stat',
                    left: 'center',
                    top: 10
                },
                color: ['rgb(25, 183, 207)'],
                grid: {
                    top: 80,
                    containLabel: true
                },
                xAxis: [
                    {
                        type: 'value',
                        min: minxx,
                        max: maxxx,
                        interval: intervalxx
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
                        //min: 0,
                        //max: 100,
                    },
                    {
                        type: 'value',
                         "axisTick":{       //y轴刻度线
          "show":true
        },
       "axisLine":{       //y轴
          "show":true

        },
                        //min: 0,
                        //max: 100,
                    }
                ],
                series: [
                    {
                        name: 'height',
                        type: 'custom',
                         renderItem: renderItem,
                        label: {
                            normal: {
                                show: true,
                                position: 'insideTop'
                            }
                        },
                        itemStyle: {
                            color: '#5c8cda'
                        },
                        encode: {
                            x: [0, 1],
                            y: 2,
                            tooltip: 2,
                            label: 2
                        },
                        data: data
                    },
                
                    {
                        name: 'height1',
                        type: 'line',
                        yAxisIndex: 1,
                        smooth: 0.5,
                        data: dataxy
                    },
                    {
                        name: 'USL',
                        type: 'line',
                        markLine: {
                            name: 'USL',
                            data: [
                                [
                                    { coord: [USL, 0] },
                                    { coord: [USL, mmaaxx] } //如何获取grid上侧最大值，目前是写死的
                                ]
                            ]
                        }
                    },
                    {
                        name: 'USL',
                        type: 'line',
                        markLine: {
                            name: 'LSL',
                            data: [
                                [
                                    { coord: [LSL, 0] },
                                    { coord: [LSL, mmaaxx] } //如何获取grid上侧最大值，目前是写死的
                                ]
                            ]
                        }
                    }
                ]
            };
            console.log("11111123123213",option11)
            myChart.setOption(option11);
       
        }
    },
    mounted() {
        console.log('11111111111111111', this.ChartCalResult);
        this.$nextTick(function() {
            this.intheadchart3();
        });
    }
};
</script>
<style lang='scss' scoped>
.ww {
    background: #f2f2f2;
}
</style>