<!--
 * @description: 设备总览页面
 * @since: 2019-11-08 15:00:48
 * @Author: jawnwa22
 * @LastEditors: jawnwa22
 * @LastEditTime: 2019-11-11 10:13:58
 -->
<template>
    <div class="tapwater">
        <div class="linebox">
            <div class="table clearfix">
                <div class="fl">
                    <span>仪表名称：</span>
                    <select name class="tablename" v-model="Meter" :style="{width:'250px'}">
                        <option
                            v-for="(item,index) in tablenames"
                            :key="index"
                            :value="item"
                        >{{item}}</option>
                    </select>
                    <span>查询范围：</span>
                    <select
                        name="public-choice"
                        v-model="couponSelected"
                        class="tabledatetime"
                        :style="{width:'180px'}"
                    >
                        <option
                            :value="coupon.name"
                            v-for="coupon in couponList"
                            :key="coupon.time"
                        >{{coupon.name}}</option>
                    </select>
                    <div class="container">
                        <div class="block" v-show="couponSelected == '日期'">
                            <span class="demonstration"></span>
                            <el-date-picker
                                v-model="value1"
                                type="datetime"
                                :placeholder="lang.SCMSConsoleWebApiMySql_PleChooseDate"
                                value-format="yyyy-MM-dd HH:mm:ss"
                                :style="{width:'220px'}"
                            ></el-date-picker>
                        </div>
                        <i class="separate" v-show="couponSelected == '日期'">-</i>
                        <div class="block" v-show="couponSelected == '日期'">
                            <span class="demonstration"></span>
                            <el-date-picker
                                v-model="value2"
                                type="datetime"
                                :placeholder="lang.SCMSConsoleWebApiMySql_PleChooseDate"
                                value-format="yyyy-MM-dd HH:mm:ss"
                                :style="{width:'220px'}"
                            ></el-date-picker>
                        </div>
                        <div class="block" v-show="couponSelected == '日报表'">
                            <span class="demonstration"></span>
                            <el-date-picker
                                v-model="value3"
                                type="date"
                                placeholder="选择日期"
                                value-format="yyyy-MM-dd"
                                :style="{width:'220px'}"
                            ></el-date-picker>
                        </div>
                        <i class="separate" v-show="couponSelected == '日报表'">-</i>
                        <div class="block" v-show="couponSelected == '日报表'">
                            <span class="demonstration"></span>
                            <el-date-picker
                                v-model="value4"
                                type="date"
                                placeholder="选择日期"
                                value-format="yyyy-MM-dd"
                                :style="{width:'220px'}"
                            ></el-date-picker>
                        </div>
                        <div class="block" v-show="couponSelected == '月报表'">
                            <span class="demonstration"></span>
                            <el-date-picker
                                v-model="value5"
                                type="month"
                                placeholder="选择月"
                                value-format="yyyy-MM"
                                :style="{width:'220px'}"
                            ></el-date-picker>
                        </div>
                        <i class="separate" v-show="couponSelected == '月报表'">-</i>
                        <div class="block" v-show="couponSelected == '月报表'">
                            <span class="demonstration"></span>
                            <el-date-picker
                                v-model="value6"
                                type="month"
                                placeholder="选择月"
                                value-format="yyyy-MM"
                                :style="{width:'220px'}"
                            ></el-date-picker>
                        </div>
                        <div class="block" v-show="couponSelected == '年报表'">
                            <span class="demonstration"></span>
                            <el-date-picker
                                v-model="value7"
                                type="year"
                                placeholder="选择年"
                                value-format="yyyy"
                                :style="{width:'220px'}"
                            ></el-date-picker>
                        </div>
                        <i class="separate" v-show="couponSelected == '年报表'">-</i>
                        <div class="block" v-show="couponSelected == '年报表'">
                            <span class="demonstration"></span>
                            <el-date-picker
                                v-model="value8"
                                type="year"
                                placeholder="选择年"
                                value-format="yyyy"
                                :style="{width:'220px'}"
                            ></el-date-picker>
                        </div>
                    </div>
                </div>
                <div class="fr">
                    <div class="query" @click="changetime">查询</div>
                    <div class="export" @click="exportTable">导出</div>
                </div>
            </div>
            <div id="myChart" ref="myChart" :style="{width: '100%', height: '36%'}"></div>
            <div class="tabledata" :style="{width: '100%', height: 'calc(100% - 36% - 82px)'}">
                <el-table
                    :data="tableData"
                    height="64%"
                    border
                    :style="{border:'1px solid #cccccc'}"
                    :cell-style="{border:'1px solid #cccccc'}"
                    :header-cell-style="{background:'#5a6c98',color:'#ffffff', border:'1px solid #cccccc',height:'50px',padding:'0'}"
                >
                    <template slot="empty">
                        <span>{{lang.SCMSConsoleWebApiMySql_NoData}}</span>
                    </template>
                    <el-table-column prop="Number" label="序号" width="180"></el-table-column>
                    <el-table-column prop="Time" label="时间" width="414"></el-table-column>
                    <el-table-column prop="DeviceName" label="仪表名称" width="414"></el-table-column>
                    <el-table-column prop="InstantFlow" label="瞬时流量" width="414"></el-table-column>
                    <el-table-column prop="CumulationFlow" label="累积流量"></el-table-column>
                </el-table>
                <table class="bottomtable" cellspacing="0" celloadding="0">
                    <tr>
                        <td class="center" width="1008">合计</td>
                        <td class="middle" width="414"></td>
                        <td class="middle">
                            <span v-show="!chardata">0</span>
                            {{chardata.cumulationSum}}
                        </td>
                    </tr>
                    <tr class="topline">
                        <td class="center" width="1008">最大</td>
                        <td class="middle" width="414">
                            <span v-show="!chardata">0</span>
                            {{chardata.instantMax}}
                        </td>
                        <td class="middle">
                            <span v-show="!chardata">0</span>
                            {{chardata.cumulationMax}}
                        </td>
                    </tr>
                    <tr>
                        <td class="center" width="1008">最小</td>
                        <td class="middle" width="414">
                            <span v-show="!chardata">0</span>
                            {{chardata.instantMin}}
                        </td>
                        <td class="middle">
                            <span v-show="!chardata">0</span>
                            {{chardata.cumulationMin}}
                        </td>
                    </tr>
                </table>
                <div class="sum">共{{sum}}条记录</div>
            </div>
        </div>
        <div class="tip" ref="kongtiao3" v-if="tipchange1">
            <div
                class="tiptop"
                @mousedown="mouseDownHandleelse3($event)"
                @mouseup="mouseUpHandleelse3($event)"
            >
                <img :src="gth" alt />
                <span>提示</span>
            </div>
            <div class="tipcontanin">
                <div class="w">{{w}}</div>
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
require('echarts/lib/component/title'); //  title组件
require('echarts/lib/component/legend'); // legend组件
export default {
    name: 'tapwater',
    data() {
        return {
            tipchange1: false,
            tip: 'noData',
            w: '',
            gth: require('../../assets/images/gth.png'),
            option: {
                title: {
                    text: ''
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data: ['瞬时流量', '累积流量'],
                    left: '4%',
                    bottom: '0%',
                    icon: 'circle',
                    selectedMode: 'single'
                },
                grid: {
                    left: '4%',
                    right: '4%',
                    bottom: '15%',
                    containLabel: true
                },
                toolbox: {
                    right: '3%',
                    feature: {
                        dataZoom: {
                            yAxisIndex: 'none'
                        },
                        restore: {}
                    }
                },

                xAxis: {
                    type: 'category',
                    boundaryGap: true,
                    data: [],
                    axisLabel: {
                        show: true,
                        // interval: 0,

                        textStyle: {
                            color: '#6861a6' //文字颜色
                        }
                    }
                },
                yAxis: {
                    type: 'value'
                },
                series: [
                    {
                        name: '瞬时流量',
                        type: 'line',
                        stack: '总量',
                        data: [120, 132, 101, 134, 90, 230, 210],
                        color: 'blue'
                    },
                    {
                        name: '累积流量',
                        type: 'line',
                        stack: '总量',
                        data: [220, 182, 191, 234, 290, 330, 310],
                        color: 'red'
                    }
                ]
            },
            value1: new Date(new Date().toLocaleDateString()),
            value2: new Date(
                new Date(new Date().toLocaleDateString()).getTime() +
                    24 * 60 * 60 * 1000 -
                    1
            ),
            value3:
                new Date().getFullYear() +
                '-' +
                (new Date().getMonth() + 1) +
                '-' +
                (new Date().getDate() > 10
                    ? new Date().getDate()
                    : '0' + new Date().getDate()),
            value4:
                new Date().getFullYear() +
                '-' +
                (new Date().getMonth() + 1) +
                '-' +
                (new Date().getDate() > 10
                    ? new Date().getDate()
                    : '0' + new Date().getDate()),
            value5:
                new Date().getFullYear() + '-' + (new Date().getMonth() + 1),
            value6:
                new Date().getFullYear() + '-' + (new Date().getMonth() + 1),
            value7:
                new Date().getFullYear() + '-' + (new Date().getMonth() + 1),
            value8:
                new Date().getFullYear() + '-' + (new Date().getMonth() + 1),
            tablenames: '',
            Meter: '',
            chardata: '',
            couponList: [
                {
                    time: 1,
                    id: new Date(new Date().toLocaleDateString()),
                    id1: new Date(
                        new Date(new Date().toLocaleDateString()).getTime() +
                            24 * 60 * 60 * 1000 -
                            1
                    ),
                    name: '日期'
                },
                {
                    time: 2,
                    id:
                        new Date().getFullYear() +
                        '-' +
                        (new Date().getMonth() + 1) +
                        '-' +
                        new Date().getDate(),
                    id1:
                        new Date().getFullYear() +
                        '-' +
                        (new Date().getMonth() + 1) +
                        '-' +
                        new Date().getDate(),
                    name: '日报表'
                },
                {
                    time: 3,
                    id:
                        new Date().getFullYear() +
                        '-' +
                        (new Date().getMonth() + 1),
                    id1:
                        new Date().getFullYear() +
                        '-' +
                        (new Date().getMonth() + 1),
                    name: '月报表'
                },
                {
                    time: 4,
                    id:
                        new Date().getFullYear() +
                        '-' +
                        (new Date().getMonth() + 1),
                    id1:
                        new Date().getFullYear() +
                        '-' +
                        (new Date().getMonth() + 1),
                    name: '年报表'
                }
            ],
            couponSelected: '',
            starttime: '',
            endtime: '',
            change: 2,
            tableData: [],
            hasnum: 1,
            sum: 0,
            lang: JSON.parse(localStorage.getItem('languages'))[localStorage.getItem('currentLang')]
        };
    },

    created() {
        //如果没有这句代码，select中初始化会是空白的，默认选中就无法实现
        this.couponSelected = this.couponList[0].name;
    },
    watch: {
        couponSelected(val) {
            this.value1 = this.couponList[0].id;
            this.value2 = this.couponList[0].id1;
            this.value3 = this.couponList[1].id;
            this.value4 = this.couponList[1].id1;
            this.value5 = this.couponList[2].id;
            this.value6 = this.couponList[2].id1;
            this.value7 = this.couponList[3].id;
            this.value8 = this.couponList[3].id1;
              if(val == '日期'){
              this.change = 2;
            }
        }
    },
    methods: {
        tip2() {
            this.tipchange1 = false;
        },
        mouseDownHandleelse3(event) {
            event.currentTarget.style.cursor = 'move';
            window.onmousemove = this.mouseMoveHandleelse3;
        },
        mouseMoveHandleelse3(event) {
            let moveLeft = event.pageX - 190 + 'px';
            let moveTop = event.pageY - 20 + 'px';
            this.$refs.kongtiao3.style.left = moveLeft;
            this.$refs.kongtiao3.style.top = moveTop;
        },
        mouseUpHandleelse3(event) {
            window.onmousemove = null;
            event.currentTarget.style.cursor = 'move';
        },
        exportTable() {
            require.ensure([], () => {
                const {
                    export_json_to_excel
                } = require('../../vendor/Export2Excel');
                const tHeader = [
                    '序号',
                    '时间',
                    '仪表名称',
                    '瞬时流量',
                    '累积流量'
                ];
                const filterVal = [
                    'Number',
                    'Time',
                    'DeviceName',
                    'InstantFlow',
                    'CumulationFlow'
                ];
                let pushdata = [
                    {
                        Number: '',
                        Time: '合计',
                        DeviceName: '',
                        InstantFlow: ' ',
                        CumulationFlow: this.chardata.cumulationSum
                    },
                    {
                        Number: '',
                        Time: '最大',
                        DeviceName: '',
                        InstantFlow: this.chardata.instantMax,
                        CumulationFlow: this.chardata.cumulationMax
                    },
                    {
                        Number: '',
                        Time: '最小',
                        DeviceName: '',
                        InstantFlow: this.chardata.instantMin,
                        CumulationFlow: this.chardata.cumulationMin
                    }
                ];
                var trydata = [];
                for (var i in this.tableData) {
                    trydata.push(this.tableData[i]);
                }
                for (var j in pushdata) {
                    trydata.push(pushdata[j]);
                }
                const list = trydata;
                const data = this.formatJson(filterVal, list);
                export_json_to_excel(tHeader, data, '自来水');
            });
        },
        formatJson(filterVal, jsonData) {
            return jsonData.map(v => filterVal.map(j => v[j]));
        },
        changetime() {
            this.tablename();
        },
        GMTToStr(time) {
            let date = new Date(time);
            let m = date.getMonth() + 1,
                mm = '-' + (m < 10 ? '0' + m : m);
            let d = date.getDate(),
                dd = '-' + (d < 10 ? '0' + d : d);
            let h = date.getHours(),
                hh = h < 10 ? '0' + h : h;
            let i = date.getMinutes(),
                ii = i < 10 ? '0' + i : i;
            let s = date.getSeconds(),
                ss = s < 10 ? '0' + s : s;
            return (
                date.getFullYear() + mm + dd + ' ' + hh + ':' + ii + ':' + ss
            );
        },
        drawLine() {
            // 基于准备好的dom，初始化echarts实例
            let myChart = echarts.init(document.getElementById('myChart'));
            // 绘制图表
            myChart.setOption(this.option);
        },
        somethingdata() {
            this.$axios({
                method: 'post',
                url: `/api/TapWaterTrendCurve/TapWaterTrendCurve_GstData?argDevice=${this.Meter.replace(
                    '#',
                    '%23'
                )}&argRange=${this.couponSelected}&argStartTime=${
                    this.starttime
                }&argEndTime=${this.endtime}`
            })
                .then(res => {
                    this.option.xAxis.data = res.data.data.xAxis;
                    this.option.series[0].data = res.data.data.instantData;
                    this.option.series[1].data = res.data.data.cumulationData;
                    res.data.data.instantSum =
                        Math.round(res.data.data.instantSum * 100) / 100;
                    this.chardata = res.data.data;
                    this.tableData = res.data.data.tables;
                    this.sum = this.tableData[this.tableData.length - 1].Number;
                    let myChart = echarts.init(this.$refs['myChart']);
                    myChart.setOption(this.option, true);
                })
                .catch(function(error) {
                    this.hasnum = 2;
                    console.log(error);
                });
        },
        tablename() {
            //请求接口
            this.$axios({
                method: 'post',
                url: '/api/TapWaterTrendCurve/TapWaterTrendCurve_GstDevices'
            })
                .then(res => {
                    this.tablenames = res.data.data;
                    if (this.Meter == '') {
                        this.Meter = this.tablenames[0];
                    }
                    if (this.couponSelected == '日期') {
                        if (this.change !== 1) {
                            this.value1 = this.GMTToStr(this.value1);
                            this.value2 = this.GMTToStr(this.value2);
                            this.change = 1;
                        }
                        this.starttime = this.value1;
                        this.endtime = this.value2;
                    } else if (this.couponSelected == '日报表') {
                        this.starttime = this.value3;
                        this.endtime = this.value4;
                    } else if (this.couponSelected == '月报表') {
                        this.starttime = this.value5;
                        this.endtime = this.value6;
                    } else if (this.couponSelected == '年报表') {
                        this.starttime = this.value7.substring(0, 4);
                        this.endtime = this.value8.substring(0, 4);
                    }
                    if (this.couponSelected == '日期') {
                        if (
                            new Date(this.starttime).getTime() >
                            new Date(this.endtime).getTime()
                        ) {
                            this.tipchange1 = true;
                            this.w = `查询开始时间不能大于结束时间！`;
                        }
                    } else if (this.couponSelected == '日报表') {
                        if (
                            new Date(this.starttime).getTime() >
                            new Date(this.endtime).getTime()
                        ) {
                            this.tipchange1 = true;
                            this.w = `查询开始时间不能大于结束时间！`;
                        }
                    } else if (this.couponSelected == '月报表') {
                        if (
                            new Date(this.starttime).getTime() >
                            new Date(this.endtime).getTime()
                        ) {
                            this.tipchange1 = true;
                            this.w = `查询开始时间不能大于结束时间！`;
                        }
                    } else if (this.couponSelected == '年报表') {
                        if (
                            new Date(this.starttime).getTime() >
                            new Date(this.endtime).getTime()
                        ) {
                            this.tipchange1 = true;
                            this.w = `查询开始时间不能大于结束时间！`;
                        }
                    }
                })
                .then(() => {
                    this.somethingdata();
                })
                .catch(function(error) {
                    console.log(error);
                });
        }
    },
    mounted() {
        this.drawLine();
        this.tablename();
        let myChart = echarts.init(this.$refs['myChart']);
        myChart.setOption(this.option, true);
    }
};
</script>
<style lang="scss" scoped>
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
        background-color: #ffffff;
        border: 1px solid #d5d5d5;
        overflow: hidden;
    }
    .table {
        height: 60px;
        margin: 12px 20px 10px 20px;
        background-color: #dddddd;
        line-height: 60px;
        overflow: hidden;
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
        margin-right: 10px;
    }
    .export {
        background-color: #ff6600;
        margin-right: 20px;
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
    table {
        width: 100%;
        background-color: #ffffff;
        color: #9d9d9d;
        border-right: 1px solid #cccccc;
        border-left: 1px solid #cccccc;
    }
    .number {
        width: 160px !important;
    }
    .center {
        padding-left: 190px;
    }
    .middle {
        padding: 0 10px;
    }
    .bottomtable {
        border-bottom: 1px solid #cccccc;
    }
}
tr {
    height: 40px;
    line-height: 40px;
}
.topline > td {
    border-top: 1px solid #cccccc;
    border-bottom: 1px solid #cccccc;
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
</style>