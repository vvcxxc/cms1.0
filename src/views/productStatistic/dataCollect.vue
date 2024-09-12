<!--
 * @description: 产量统计表
 * @since: 2019-11-08 15:00:48
 * @Author: jawnwa22
 * @LastEditors: jawnwa22
 * @LastEditTime: 2019-11-11 10:13:58
 -->
<template>
    <div class="tapwater">
        <div class="linebox" :class="{ colordiv: $store.state.color == 'grey' }">
            <div class="table clearfix">
                <div class="fl">
                    <span>查询日期范围</span>
                    <div class="container">
                        <div class="block">
                            <span class="demonstration"></span>
                            <el-date-picker popper-class="hourPicker" @change="stateTime" v-model="value1"
                                type="datetime" placeholder="选择日期时间" value-format="yyyy-MM-dd HH:mm:ss"
                                :style="{ width: '220px' }"></el-date-picker>
                        </div>
                        <span>至</span>
                        <div class="block">
                            <span class="demonstration"></span>
                            <el-date-picker popper-class="hourPicker" @change="entTime" v-model="value2" type="datetime"
                                placeholder="选择日期时间" value-format="yyyy-MM-dd HH:mm:ss"
                                :style="{ width: '220px' }"></el-date-picker>
                        </div>
                        <span>产品型号：</span>
                        <el-select v-model="prodtype" size="medium" style="width:150px">
                            <el-option v-for="item in productTypesList" :key="item.ProductTypeCode"
                                :label="item.ProductTypeCode" :value="item.ProductTypeCode"></el-option>
                        </el-select>
                        <span>设备名称：</span>
                        <el-select v-model="process" style="width:150px">
                            <el-option v-for="item  in workProcessesList" :key="item.WID" :label="item.WorkName"
                                :value="item.WID"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query" @click="query">查询</div>
                <div class="fr">
                    <div class="export" @click="exportExcel">导出</div>
                </div>
            </div>
            <div id="myChart" ref="myChart" :style="{ width: '100%', height: '45%' }"></div>
            <el-table :data="data" border highlight-current-row header-row-class-name="light-blue"
                row-class-name="high-light" :height="'calc(55% - 60px)'" width="100%" ref="metable" :header-cell-style="{
            background:
                $store.state.color == 'grey' ? '#D9DBDE' : '#5a6c98',
            color: $store.state.color == 'grey' ? '#000' : '#fff',
            'border-left': '1px solid #cccccc',
            height: '50px',
            padding: '0',
        }">
                <template slot="empty">
                    <span>暂无数据</span>
                </template>
                <el-table-column label="序号" prop="Index" width="100"></el-table-column>
                <el-table-column label="日期" prop="RecordDateStr"></el-table-column>
                <el-table-column label="产量" prop="Production"></el-table-column>
            </el-table>
        </div>
        <div class="tip" ref="kongtiao2" v-if="tipchange1">
            <div class="tiptop" @mousedown="mouseDownHandleelse2($event)" @mouseup="mouseUpHandleelse2($event)">
                <img :src="gth" alt />
                <span>提示</span>
            </div>
            <div class="tipcontanin">
                <div class="w">{{ w }}</div>
                <div class="tipdetermine" @click="tip2">确定</div>
            </div>
        </div>
        <div class="cover3" v-if="tipchange1"></div>
    </div>
</template>

<script>
// vue文件中引入echarts工具
let echarts = require('echarts/lib/echarts');
require('echarts/lib/chart/line');
// 以下的组件按需引入
require('echarts/lib/component/tooltip'); // tooltip组件

let myChart;
export default {
    name: 'tapwater',
    data() {
        return {
            data: [],
            value1: new Date(new Date().toLocaleDateString()),
            value2: new Date(
                new Date(new Date().toLocaleDateString()).getTime() +
                24 * 60 * 60 * 1000 -
                1
            ),
            timevalue2: '',
            timevalue1: '',
            oldTimeValue1: '',
            oldTimeValue2: '',
            prodtype: '全部',
            productTypesList: [],
            process: '',
            workProcessesList: '',
            ProductIDArr: [],
            lineData: [],
            tipchange1: false,
            w: '',
            gth: require('../../assets/images/gth.png'),
        };
    },
    watch: {
        value1(n) {
            let date = n.split(' ');
            let temp = date[1].split(':');
            if (temp[1] != '00' || temp[2] != '00') {
                this.value1 = date[0] + ' ' + temp[0] + ':00:00';
            }
        },
        value2(n) {
            let date = n.split(' ');
            let temp = date[1].split(':');
            if (temp[1] != '00' || temp[2] != '00') {
                this.value2 = date[0] + ' ' + temp[0] + ':00:00';
            }
        },
    },
    created() {
        //重新改变图表大小
        $(window).bind('resize', function () {
            myChart.resize();
        });
    },
    mounted() {
        this.getDate1();

        this.drawLine();
        this.getProductTypes();

    },
    methods: {
        getProductTypes() {
            this.$axios({
                method: 'post',
                url: '/api/FormulaManage/QueryProductType',
            }).then(res => {
                if (res.data.code == 0) {
                    this.productTypesList = res.data.data;
                    this.productTypesList.unshift({ ProductTypeName: '全部', ProductTypeCode: '全部' })
                    if (this.productTypesList.length) {
                        this.prodtype = this.productTypesList[0].ProductTypeCode;
                    }
                    this.getWorkProcesses();

                } else {
                    this.isPopShow = true;
                    this.tipText = res.data.msg
                }
            }).catch((err) => {
                console.log('err', err)
            })
        },
        getWorkProcesses() {
            this.$axios({
                method: 'post',
                url: `/api/ProcessParameterConfigure/QueryWorkSections`,
            }).then(res => {
                if (res.data.code == 0) {
                    this.workProcessesList = res.data.data;
                    if (this.workProcessesList.length) {
                        this.workProcessesList = this.workProcessesList
                        this.process = this.workProcessesList[0].WID
                    }
                    this.query();
                } else {
                    this.isPopShow = true;
                    this.tipText = res.data.msg
                }
            }).catch((err) => {
                console.log('err', err)
            })
        },

        fun_date(num, spl = '-') {
            var date1 = new Date();
            var date2 = new Date(date1);
            date2.setDate(date1.getDate() + num);
            //num是正数表示之后的时间，num负数表示之前的时间，0表示今天
            var time2 =
                date2.getFullYear() +
                spl +
                (date2.getMonth() + 1) +
                spl +
                date2.getDate() +
                ' 00:00:00';
            return time2;
        },
        //初始化时间
        getDate1() {
            this.value1 = this.fun_date(0, '-');
            this.timevalue1 = this.fun_date(0, '-'); //获取当前时间
            this.oldTimeValue1 = this.fun_date(0, '-'); //获取当前时间

            this.value2 = this.fun_date(1, '-');
            this.timevalue2 = this.fun_date(1, '-');
            this.oldTimeValue2 = this.fun_date(1, '-'); //获取当前时间
        },
        //改数据格式
        stateTime() {
            this.timevalue1 = this.value1;
            var sTime = new Date(this.timevalue1).getTime();
            var eTime = new Date(this.timevalue2).getTime();
            var diffs = eTime - sTime;
            if (diffs < 0) {
                this.timevalue1 = this.oldTimeValue1;
                this.value1 = this.oldTimeValue1;
                this.tipchange1 = true;
                this.w = '开始时间不能大于结束时间';
            } else if (diffs == 0) {
                this.timevalue1 = this.oldTimeValue1;
                this.timevalue2 = this.oldTimeValue2;
                this.value1 = this.oldTimeValue1;
                this.tipchange1 = true;
                this.w = '开始时间不能等于结束时间';
            } else {
                this.oldTimeValue1 = this.timevalue1;
            }
        },
        entTime() {
            this.timevalue2 = this.value2;
            var sTime = new Date(this.timevalue1).getTime();
            var eTime = new Date(this.timevalue2).getTime();
            var diffs = eTime - sTime;
            if (diffs < 0) {
                this.timevalue2 = this.oldTimeValue2;
                this.value2 = this.oldTimeValue2;
                this.tipchange1 = true;
                this.w = '开始时间不能大于结束时间';
            } else if (diffs == 0) {
                this.timevalue2 = this.oldTimeValue2;
                this.value2 = this.oldTimeValue2;
                this.tipchange1 = true;
                this.w = '开始时间不能等于结束时间';
            } else {
                this.oldTimeValue2 = this.value2;
            }
        },
        //查询
        query() {
            this.$axios({
                method: 'post',
                url: `/api/ProductStatisticData/QueryProductStatisticData?st=${this.timevalue1}&et=${this.timevalue2}&ProductModel=${this.prodtype == '全部' ? '' : this.prodtype}&WID=${this.process}`,
                contentType: 'application/json',
            }).then((res) => {
                if (res.data.code === 0) {
                    //重置图表数据
                    this.ProductIDArr = [];
                    this.lineData = [];
                    this.data = [...res.data.data];
                    this.data.forEach((item, idx) => {
                        if (idx !== this.data.length - 1) {
                            this.ProductIDArr.push(item.RecordDateStr);
                            this.lineData.push(item.Production);
                        }
                    });
                    this.drawLine();
                } else {
                    this.w = res.data.msg;
                }
            });
        },
        // 基于准备好的dom，初始化echarts实例
        drawLine() {
            myChart = echarts.init(document.getElementById('myChart')); // 绘制图表
            myChart.clear();
            myChart.setOption({
                color: ['#169bd5'],
                tooltip: {
                    trigger: 'axis',
                    formatter: function (params) {
                        return (
                            params[0].axisValue +
                            '<Br/> <span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#83bff6;"></span>产量：' +
                            params[0].value +
                            '<Br/>'
                        );
                    },
                },
                grid: {
                    left: '2%',
                    right: '2%',
                    bottom: '4%',
                    containLabel: true,
                },
                xAxis: {
                    type: 'category',
                    data: this.ProductIDArr,
                    axisLine: { show: false }, //轴线不显示
                    // axisLabel: {
                    //     interval: 0,
                    //     rotate: -45,
                    // },
                },
                yAxis: {
                    type: 'value',
                },
                series: [
                    {
                        type: 'bar',
                        animation: false,
                        data: this.lineData,
                        // barWidth: 40,
                        label: {
                            show: true,
                            position: 'top',
                            color: '#000',
                        },
                        itemStyle: {
                            normal: {
                                lineStyle: {
                                    width: 3,
                                },
                            },
                        },
                    },
                ],
            });
        },
        exportExcel() {
            let date = new Date();
            let now =
                date.toLocaleDateString().replace(/\//g, '') +
                (date.getHours() < 10
                    ? '0' + date.getHours()
                    : date.getHours()) +
                (date.getMinutes() < 10
                    ? '0' + date.getMinutes()
                    : date.getMinutes()) +
                (date.getSeconds() < 10
                    ? '0' + date.getSeconds()
                    : date.getSeconds());
            this.$axios({
                url: `/api/ProductStatisticData/ProductStatisticExport?st=${this.timevalue1}&et=${this.timevalue2}&ProductModel=${this.prodtype == '全部' ? '' : this.prodtype}&WID=${this.process}`,
                method: 'get',
                responseType: 'blob',
            }).then((res) => {
                const blob = new Blob([res.data], {
                    type: 'application/x-excel',
                });
                const url = window.URL || window.webkitURL || window.moxURL;
                const downloadHref = url.createObjectURL(blob);
                let downloadLink = document.createElement('a');
                downloadLink.href = downloadHref;
                downloadLink.download = '产量统计报表' + now + '.xlsx';
                downloadLink.click();
                window.URL.revokeObjectURL(url);
            });
        },
        tip2() {
            this.tipchange1 = false;
        },
        mouseDownHandleelse2(event) {
            event.currentTarget.style.cursor = 'move';
            window.onmousemove = this.mouseMoveHandleelse2;
        },
        mouseMoveHandleelse2(event) {
            let moveLeft = event.pageX - 190 + 'px';
            let moveTop = event.pageY - 20 + 'px';
            this.$refs.kongtiao2.style.left = moveLeft;
            this.$refs.kongtiao2.style.top = moveTop;
        },
        mouseUpHandleelse2(event) {
            window.onmousemove = null;
            event.currentTarget.style.cursor = 'move';
        },
    },
};
</script>
<style>
.hourPicker .el-scrollbar:nth-child(1) {
    width: 180px !important;
}

.hourPicker .el-scrollbar:nth-child(2),
.hourPicker .el-scrollbar:nth-child(3) {
    display: none;
}
</style>
<style lang="scss" scoped>
.tabledata {
    overflow-y: auto;
    overflow-x: hidden;
}

.sum {
    margin-top: 5px;
    color: #9d9d9d;
}

.fl {
    float: left;
}

.fr {
    float: right;
}

.clearfix::after {
    content: '';
    height: 0;
    line-height: 0;
    clear: both;
    visibility: hidden;
}

.clearfix {
    zoom: 1;
}

.tapwater {
    position: fixed;
    top: 100px;
    height: calc(100% - 130px);
    padding: 20px;
    width: 100%;
    background-color: #eeeeee;

    .linebox {
        height: 100%;
        width: 100%;
        background-color: #fff;
        overflow: hidden;

        #myChart {
            background-color: #eef4f6;
        }

        .el-table {
            position: relative;
            bottom: 1px;
        }
    }

    .table {
        height: 60px;
        background-color: #fff;
        line-height: 60px;
        font-size: 14px;
        color: #6b6668;

        span {
            margin-left: 18px;
        }

        .tablename {
            height: 40px;
            width: 250px;
        }

        .tabledatetime {
            height: 40px;
            width: 178px;
        }

        .starttime {
            height: 40px;
            width: 210px;
            display: inline-block;
            margin-left: 18px;
            background-color: #ffffff;
            line-height: 40px;
            padding-left: 12px;
        }

        .endtime {
            height: 40px;
            width: 210px;
            display: inline-block;
            background-color: #ffffff;
            line-height: 40px;
            padding-left: 12px;
        }
    }

    .query,
    .export {
        margin-left: 15px;
        display: inline-block;
        height: 40px;
        width: 118px;
        text-align: center;
        line-height: 40px;
        color: #ffffff;
        border-radius: 5px;
        font-weight: 600;
        cursor: pointer;
    }

    .query {
        background-color: #4270e4;
        color: #ffffff;
        margin-right: 20px;
    }

    .export {
        color: #fd9e00;
        background-color: #ffffff;
        border: 2px solid #fd9e00;
        margin-right: 10px;
    }

    .container {
        display: inline-block;
        height: 40px;

        .block {
            display: inline-block;
        }
    }

    .separate {
        position: relative;
        left: 7px;
    }
}

.tabledata {
    padding: 10px;
    width: calc(100%-20px);
}

select {
    text-indent: 0.5em;
}

.query:hover {
    cursor: pointer;
}

.tip {
    position: fixed;
    width: 380px;
    height: 200px;
    z-index: 30;
    top: 350px;
    left: 750px;
    box-shadow: 0px 0px 8px black;
    background-color: #f3f3f4;

    .tiptop {
        width: 380px;
        height: 40px;
        background-color: #ffbc3d;

        img {
            width: 20px;
            height: 20px;
            margin-top: 10px;
            margin-left: 160px;
        }

        span {
            color: #ffffff;
            position: relative;
            top: -5px;
            margin-left: 7px;
        }
    }

    .tipword {
        width: 100%;
        padding: 30px;
        // text-align: center;
        padding-bottom: 0;
    }

    .w {
        width: 100%;
        margin-top: 40px;
        overflow-y: auto;
        text-align: center;
    }

    .tipdetermine {
        color: #ea9328;
        width: 310px;
        line-height: 30px;
        cursor: pointer;
        text-align: center;
        margin-top: 40px;
        margin-left: 35px;
        height: 30px;
        background-color: #f3e3ad;
    }

    .delclass {
        width: 330px;
        line-height: 30px;
        margin-top: 40px;
        margin-left: 25px;
        height: 30px;

        .one {
            cursor: pointer;
            display: inline-block;
            height: 30px;
            width: 160px;
            text-align: center;
            background-color: #e0e0e0;
            color: #7e7e7e;
        }

        .two {
            cursor: pointer;
            display: inline-block;
            height: 30px;
            margin-left: 10px;
            width: 160px;
            background-color: #f3e3ad;
            text-align: center;
            color: #eeb764;
        }
    }
}

.cover2 {
    width: 100%;
    height: 100%;
    z-index: 29;
    position: fixed;
    top: 0;
    left: 0;
}

.cover3 {
    width: 100%;
    height: 100%;
    z-index: 29;
    position: fixed;
    top: 0;
    left: 0;
}

input,
textarea,
select,
a:focus {
    outline: none;
}

.headtable {
    color: #000000;
    font-size: 16pt;
    font-weight: 700;
    font-style: normal;
    text-decoration: none;
    text-align: center;
    vertical-align: middle;
}

.headtable_td {
    color: #000000;
    font-size: 12pt;
    font-weight: 400;
    font-style: normal;
    text-decoration: none;
    text-align: left;
    vertical-align: middle;
    border: 0.5pt solid #000000;
}

.headtable_ba {
    color: #000000;
    font-size: 12pt;
    font-weight: 400;
    font-style: normal;
    text-decoration: none;
    text-align: center;
    vertical-align: middle;
    border: 0.5pt solid #000000;
    background: #f2f2f2;
}

.headtableinput {
    border: none;
    background-color: #f2f2f2;
    height: 30px;
    width: 50px;
}

.middletablefirst {
    color: #000000;
    font-size: 10pt;
    font-weight: 400;
    font-style: normal;
    text-decoration: none;
    text-align: left;
    vertical-align: middle;
    border: 0.5pt solid #000000;
}

.middletablesecond {
    color: #000000;
    font-size: 9pt;
    font-weight: 400;
    font-style: normal;
    text-decoration: none;
    text-align: center;
    vertical-align: middle;
    border: 0.5pt solid #000000;
    background: #f2f2f2;
}

#table2 td {
    color: #000000;
    font-size: 9pt;
    font-weight: 400;
    font-style: normal;
    text-decoration: none;
    text-align: left;
    vertical-align: middle;
}

#rule span {
    font-size: 8pt;
}

#table3 td {
    color: #000000;
    font-size: 12pt;
    font-weight: 400;
    font-style: normal;
    text-decoration: none;
    text-align: left;
    vertical-align: middle;
    width: 100px;
}

#table4 td {
    color: #000000;
    font-size: 12pt;
    font-weight: 400;
    font-style: normal;
    text-decoration: none;
    text-align: left;
    vertical-align: middle;
    width: 100px;
    height: 50px;
}

#tabledata {
    font-size: 14pt;
    color: #333333;
    border-width: 1px;
    border-color: #999999;
    border-collapse: collapse;
    text-align: center;
}

#tabledata th {
    background-color: #dcf0f9 !important;
    border-width: 1px;
    padding: 8px;
    border-style: solid;
    border-color: #999999;
    text-align: center;
}

.W1 {
    margin-left: 10px;
}

#tabledata td {
    border-width: 1px;
    padding: 8px;
    border-style: solid;
    border-color: #999999;
    text-align: center;
}

#subtabledata {
    font-size: 14pt;
    color: #333333;
    border-width: 1px;
    border-color: #999999;
    border-collapse: collapse;
    text-align: center;
    table-layout: fixed;
}

#subtabledata th {
    //  background:#dcf0f9 url('cell-blue.jpg');
    border-width: 1px;
    padding: 8px;
    border-style: solid;
    border-color: #999999;
    text-align: center;
}

#subtabledata td {
    //  background:#ffffff url('cell-grey.jpg');
    border-width: 1px;
    padding: 8px;
    border-style: solid;
    border-color: #999999;
    text-align: center;
}

#tabletemple {
    font-size: 11px;
    color: #333333;
    border-width: 1px;
    border-color: #999999;
    border-collapse: collapse;
}

#tabletemple th {
    //  background:#dcf0f9 url('cell-blue.jpg');
    border-width: 1px;
    padding: 8px;
    border-style: solid;
    border-color: #999999;
}

#tabletemple td {
    //  background:#ffffff url('cell-grey.jpg');
    border-width: 1px;
    padding: 8px;
    border-style: solid;
    border-color: #999999;
}

.colordiv {
    background-color: #d9dbde;
}

table {}

td {
    white-space: nowrap !important;
    overflow: auto !important;
}
</style>t