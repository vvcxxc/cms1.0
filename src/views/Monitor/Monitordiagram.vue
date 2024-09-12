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
                    <span>车间：</span>
                    <select
                        name="province"
                        id="province"
                        class="tablename"
                        v-on:change="indexSelect01"
                        v-model="indexId"
                        :style="{width: '240px'}"
                    >
                        <option
                            :value="item.WorkShop"
                            v-for="(item,index) in select01"
                            :key="index"
                        >{{item.WorkShop}}</option>
                        <!---->
                    </select>
                    <!--二级菜单-->
                    <span>设备名称：</span>
                    <select
                        name="city"
                        id="city"
                        class="equipmentname"
                        v-model="indexId2"
                        :style="{width: '300px'}"
                    >
                        <option :value="k" v-for="k in select02" :key="k">{{k}}</option>
                    </select>

                    <span>班次：</span>
                    <select
                        name="city"
                        id="city"
                        class="tabledatetime"
                        v-model="indexId3"
                        :style="{width: '100px'}"
                    >
                        <option :value="d" v-for="d in select03" :key="d">{{d}}</option>
                    </select>
                    <span>时间：</span>
                    <select
                        name="public-choice"
                        v-model="couponSelected"
                        class="tabledatetime"
                        :style="{width: '100px'}"
                    >
                        <option
                            :value="coupon.name"
                            v-for="coupon in couponList"
                            :key="coupon.time"
                        >{{coupon.name}}</option>
                    </select>
                    <div class="container">
                        <div class="block" v-show="couponSelected == '日报表'">
                            <span class="demonstration"></span>
                            <el-date-picker
                                v-model="value1"
                                type="date"
                                placeholder="选择日期"
                                value-format="yyyy-MM-dd"
                                :style="{width: '220px'}"
                            ></el-date-picker>
                        </div>
                        <i class="separate" v-show="couponSelected == '日报表'">-</i>
                        <div class="block" v-show="couponSelected == '日报表'">
                            <span class="demonstration"></span>
                            <el-date-picker
                                v-model="value2"
                                type="date"
                                placeholder="选择日期"
                                value-format="yyyy-MM-dd"
                                :style="{width: '220px'}"
                            ></el-date-picker>
                        </div>
                        <div class="block" v-show="couponSelected == '月报表'">
                            <span class="demonstration"></span>
                            <el-date-picker
                                v-model="value3"
                                type="month"
                                placeholder="选择月"
                                value-format="yyyy-MM"
                                :style="{width: '220px'}"
                            ></el-date-picker>
                        </div>
                        <i class="separate" v-show="couponSelected == '月报表'">-</i>
                        <div class="block" v-show="couponSelected == '月报表'">
                            <span class="demonstration"></span>
                            <el-date-picker
                                v-model="value4"
                                type="month"
                                placeholder="选择月"
                                value-format="yyyy-MM"
                                :style="{width: '220px'}"
                            ></el-date-picker>
                        </div>
                        <div class="block" v-show="couponSelected == '年报表'">
                            <span class="demonstration"></span>
                            <el-date-picker
                                v-model="value5"
                                type="year"
                                placeholder="选择年"
                                value-format="yyyy"
                                :style="{width: '220px'}"
                            ></el-date-picker>
                        </div>
                        <i class="separate" v-show="couponSelected == '年报表'">-</i>
                        <div class="block" v-show="couponSelected == '年报表'">
                            <span class="demonstration"></span>
                            <el-date-picker
                                v-model="value6"
                                type="year"
                                placeholder="选择年"
                                value-format="yyyy"
                                :style="{width: '220px'}"
                            ></el-date-picker>
                        </div>
                    </div>
                </div>
                <div class="fr">
                    <div class="query" @click="changetime">查询</div>
                    <div class="export" @click="exportTable">导出</div>
                </div>
            </div>
            <div id="myChart" ref="myChart" :style="{width: '100%', height: '38%'}"></div>
            <div class="tabledata" :style="{width: '100%', height: 'calc(100% - 38% - 82px)'}">
                <el-table
                    :data="tableData"
                    height="295"
                    border
                    :style="{border:'1px solid #cccccc'}"
                    :cell-style="{border:'1px solid #cccccc'}"
                    :header-cell-style="{background:'#5a6c98',color:'#ffffff', border:'1px solid #cccccc',height:'50px',padding:'0'}"
                >
                    <template slot="empty">
                        <span>{{lang.SCMSConsoleWebApiMySql_NoData}}</span>
                    </template>
                    <el-table-column prop="Number" label="序号" width="90"></el-table-column>
                    <el-table-column prop="Time" label="时间" width="100"></el-table-column>
                    <el-table-column prop="WorkShop" label="车间" width="200"></el-table-column>
                    <el-table-column prop="Device" label="设备" width="260"></el-table-column>
                    <el-table-column prop="Shift" label="班次" width="90"></el-table-column>
                    <el-table-column prop="UsageRate" label="开动率%" width="120"></el-table-column>
                    <el-table-column prop="BootTime" label="开机时长(h)" width="160"></el-table-column>
                    <el-table-column prop="DownTime" label="停机时长(h)" width="160"></el-table-column>
                    <el-table-column prop="OperationTime" label="运行时长(h)" width="160"></el-table-column>
                    <el-table-column prop="TestRunTime" label="低速运行时长(h)" width="160"></el-table-column>
                    <el-table-column prop="NormalTime" label="高速运行时长(h)"></el-table-column>
                </el-table>
                <table class="bottomtable" cellspacing="0" celloadding="0">
                    <tr class="topline average">
                        <td class="center" width="650">数据统计</td>
                        <td width="90" class="middle">合计</td>
                        <td class="middle" width="120">
                            <span v-show="!chardata">0</span>
                            {{chardata.useRateSum}}
                        </td>
                        <td class="middle" width="160">
                            <span v-show="!chardata">0</span>
                            {{chardata.bootTimeSum}}
                        </td>
                        <td class="middle" width="160">
                            <span v-show="!chardata">0</span>
                            {{chardata.downTimeSum}}
                        </td>
                        <td class="middle" width="160">
                            <span v-show="!chardata">0</span>
                            {{chardata.operationTimeSum}}
                        </td>
                        <td class="middle" width="160">
                            <span v-show="!chardata">0</span>
                            {{chardata.testRunTimeSum}}
                        </td>
                        <td class="middle">
                            <span v-show="!chardata">0</span>
                            {{chardata.normalTimeSum}}
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
            select01: [], //获取的一级数组数据
            select02: [], //获取的二级数组数据
            select03: ['全部', '早班', '中班'], //获取的二级数组数据
            indexId: '', //定义分类一的默认值
            indexId2: '',
            indexId3: '',
            sum: 0,
            indexNum: 0, //定义一级菜单的下标
            index1Num: 0, //定义一级菜单的下标
            option: {
                tooltip: {
                    trigger: 'axis'
                },
                grid: {
                    left: '4%',
                    right: '4%',
                    bottom: '0%',
                    containLabel: true
                },
                xAxis: {
                    type: 'category',
                    data: [
                        '开动率%',
                        '开机时长',
                        '停机时长',
                        '运行时长',
                        '低速运行时长',
                        '高速运行时长'
                    ]
                },
                yAxis: {
                    type: 'value',
                    name: '小时h/%'
                },
                toolbox: {
                    right: '3%',
                    show: true,
                    feature: {
                        dataZoom: {
                            yAxisIndex: 'none'
                        },
                        restore: {
                            show: true,
                            type: 'retore'
                        }
                    }
                },
                series: [
                    {
                        itemStyle: {
                            normal: {
                                color: function(params) {
                                    var colorList = [
                                        'blue',
                                        '#008080',
                                        "#ff0000",
                                        "#00ff00",
                                        "#c7ffc5",
                                        "#0080c0",
                                    ];
                                    return colorList[params.dataIndex];
                                }
                            }
                        },
                        data: [],
                        type: 'bar',
                        color: 'blue'
                    }
                ]
            },
            value1:
                new Date().getFullYear() +
                '-' +
                (new Date().getMonth() + 1) +
                '-' +
                (new Date().getDate() > 10
                    ? new Date().getDate()
                    : '0' + new Date().getDate()),
            value2:
                new Date().getFullYear() +
                '-' +
                (new Date().getMonth() + 1) +
                '-' +
                (new Date().getDate() > 10
                    ? new Date().getDate()
                    : '0' + new Date().getDate()),
            value3:
                new Date().getFullYear() + '-' + (new Date().getMonth() + 1),
            value4:
                new Date().getFullYear() + '-' + (new Date().getMonth() + 1),
            value5:
                new Date().getFullYear() + '-' + (new Date().getMonth() + 1),
            value6:
                new Date().getFullYear() + '-' + (new Date().getMonth() + 1),
            tablenames: '',
            Meter: '',
            chardata: '',
            couponList: [
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
            
        },
        indexId(val) {
            this.indexSelect01();
            this.indexId2 = this.select02[0];
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
                    '车间',
                    '设备',
                    '班次',
                    '开动率%',
                    '开机时长（h）',
                    '停机时长（h）',
                    '运行时长（h）',
                    '低速运行时长（h）',
                    '高速运行时长（h）'
                ];
                const filterVal = [
                    'Number',
                    'Time',
                    'WorkShop',
                    'Device',
                    'Shift',
                    'UsageRate',
                    'BootTime',
                    'DownTime',
                    'OperationTime',
                    'TestRunTime',
                    'NormalTime'
                ];
                let pushdata = [
                    {
                        Number: '合计',
                        Time: '',
                        WorkShop: '',
                        Device: '',
                        Shift: '',
                        UsageRate: this.chardata.useRateSum,
                        BootTime: this.chardata.bootTimeSum,
                        DownTime: this.chardata.downTimeSum,
                        OperationTime: this.chardata.operationTimeSum,
                        TestRunTime: this.chardata.testRunTimeSum,
                        PoorTime: this.chardata.poorTimeSum,
                        NormalTime: this.chardata.normalTimeSum
                    }
                ];
                var trydata = [];
                for (var j in this.tableData) {
                    trydata.push(this.tableData[j]);
                }
                for (let i in pushdata) {
                    trydata.push(pushdata[i]);
                }
                const list = trydata;
                const data = this.formatJson(filterVal, list);
                export_json_to_excel(tHeader, data, '设备柱状图');
            });
        },
        formatJson(filterVal, jsonData) {
            return jsonData.map(v => filterVal.map(j => v[j]));
        },
        indexSelect01() {
            let i = 0;
            for (i = 0; i < this.select01.length; i++) {
                if (this.select01[i].WorkShop == this.indexId) {
                    this.indexNum = i;
                    break;
                }
            }
            this.select02 = this.select01[this.indexNum].Devices;
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
                // url: `/api/ReportColumnChart/ReportColumnChart_GstData?argWorkShop=&argDevice=&argShift=${this.indexId3}&argRange==日报表&argStartTime=2019-11-01&argEndTime=2019-12-02`
                url: `/api/ReportColumnChart/ReportColumnChart_GstData?argWorkShop=${this.indexId.replace(
                    /#/g,
                    '%23'
                )}&argDevice=${this.indexId2.replace(
                    /#/g,
                    '%23'
                )}&argShift=${this.indexId3.replace(/#/g, '%23')}&argRange=${
                    this.couponSelected
                }&argStartTime=${this.starttime}&argEndTime=${this.endtime}`
            })

                .then(res => {
                    console.log(res);
                    this.hasnum = 1;
                    console.log(this.starttime);
                    this.option.series[0].data = [
                        res.data.data.useRateSum,
                        res.data.data.bootTimeSum,
                        res.data.data.downTimeSum,
                        res.data.data.operationTimeSum,
                        res.data.data.testRunTimeSum,
                        res.data.data.poorTimeSum,
                        res.data.data.normalTimeSum
                    ];
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
            // this.indexId2 = this.indexId2.replace(/#/g, '%23');
            this.$axios({
                method: 'post',
                url:
                    '/api/ReportColumnChart/ReportColumnChart_GstWorkShopsAndDevices'
            })
                .then(res => {
                    this.tablenames = res.data.data;
                    this.select01 = res.data.data;
                    this.indexSelect01();
                    if (this.indexId == '') {
                        this.indexId = this.select01[0].WorkShop;
                        this.indexId2 = this.select02[0];
                        this.indexId3 = this.select03[0];
                    }
                    if (this.couponSelected == '日报表') {
                        this.starttime = this.value1;
                        this.endtime = this.value2;
                    } else if (this.couponSelected == '月报表') {
                        this.starttime = this.value3;
                        this.endtime = this.value4;
                    } else if (this.couponSelected == '年报表') {
                        this.starttime = this.value5.substring(0, 4);
                        this.endtime = this.value6.substring(0, 4);
                    }
                    if (this.couponSelected == '日报表') {
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
        this.tablename();
        this.drawLine();
        let myChart = echarts.init(this.$refs['myChart']);
        myChart.setOption(this.option, true);
    }
};
</script>
<style lang="scss" scoped>
.sum {
    margin-top: 20px;
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
            width: 190px;
        }
        .tabledatetime {
            height: 40px;
            width: 81px;
        }
        .equipmentname {
            width: 240px;
            height: 40px;
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
            // width: 202px;
        }
    }
    .separate {
        position: relative;
        left: 7px;
    }
}
.tabledata {
    padding: 10px;
    width: calc(100% - 20px);
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
        padding-left: 100px;
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
.middle {
    padding-left: 10px;
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