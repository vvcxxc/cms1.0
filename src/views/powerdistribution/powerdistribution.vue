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
                    <span>配电室：</span>
                    <select
                        name="province"
                        id="province"
                        class="tablename"
                        v-on:change="indexSelect01"
                        v-model="indexId"
                        :style="{width: '220px'}"
                    >
                        <option
                            :value="item.Room"
                            v-for="(item,index) in select01"
                            :key="index"
                        >{{item.Room}}</option>
                        <!---->
                    </select>
                    <!--二级菜单-->
                    <span>控制柜：</span>
                    <select
                        name="city"
                        id="city"
                        class="tablename"
                        v-model="indexId2"
                        v-on:change="indexSelect02"
                        :style="{width: '180px'}"
                    >
                        <option :value="k.Device" v-for="k in select02" :key="k.Device">{{k.Device}}</option>
                    </select>
                    <span>变量点：</span>
                    <select
                        name="city"
                        id="city"
                        class="tablename"
                        v-model="indexId3"
                        :style="{width: '210px'}"
                    >
                        <option :value="d" v-for="d in select03" :key="d">{{d}}</option>
                    </select>
                    <span>查询范围：</span>
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
                        <div class="block" v-show="couponSelected == '日期'">
                            <span class="demonstration"></span>
                            <el-date-picker
                                v-model="value1"
                                type="datetime"
                                :style="{width:'220px'}"
                                placeholder="选择日期时间"
                                value-format="yyyy-MM-dd HH:mm:ss"
                            ></el-date-picker>
                        </div>
                        <i class="separate" v-show="couponSelected == '日期'">-</i>
                        <div class="block" v-show="couponSelected == '日期'">
                            <span class="demonstration"></span>
                            <el-date-picker
                                v-model="value2"
                                type="datetime"
                                placeholder="选择日期时间"
                                :style="{width:'220px'}"
                                value-format="yyyy-MM-dd HH:mm:ss"
                            ></el-date-picker>
                        </div>
                        <div class="block" v-show="couponSelected == '日报表'">
                            <span class="demonstration"></span>
                            <el-date-picker
                                v-model="value3"
                                type="date"
                                placeholder="选择日期"
                                :style="{width:'220px'}"
                                value-format="yyyy-MM-dd"
                            ></el-date-picker>
                        </div>
                        <i class="separate" v-show="couponSelected == '日报表'">-</i>
                        <div class="block" v-show="couponSelected == '日报表'">
                            <span class="demonstration"></span>
                            <el-date-picker
                                v-model="value4"
                                :style="{width:'220px'}"
                                type="date"
                                placeholder="选择日期"
                                value-format="yyyy-MM-dd"
                            ></el-date-picker>
                        </div>
                        <div class="block" v-show="couponSelected == '月报表'">
                            <span class="demonstration"></span>
                            <el-date-picker
                                v-model="value5"
                                type="month"
                                :style="{width:'220px'}"
                                placeholder="选择月"
                                value-format="yyyy-MM"
                            ></el-date-picker>
                        </div>
                        <i class="separate" v-show="couponSelected == '月报表'">-</i>
                        <div class="block" v-show="couponSelected == '月报表'">
                            <span class="demonstration"></span>
                            <el-date-picker
                                v-model="value6"
                                type="month"
                                :style="{width:'220px'}"
                                placeholder="选择月"
                                value-format="yyyy-MM"
                            ></el-date-picker>
                        </div>
                        <div class="block" v-show="couponSelected == '年报表'">
                            <span class="demonstration"></span>
                            <el-date-picker
                                v-model="value7"
                                type="year"
                                :style="{width:'220px'}"
                                placeholder="选择年"
                                value-format="yyyy"
                            ></el-date-picker>
                        </div>
                        <i class="separate" v-show="couponSelected == '年报表'">-</i>
                        <div class="block" v-show="couponSelected == '年报表'">
                            <span class="demonstration"></span>
                            <el-date-picker
                                v-model="value8"
                                type="year"
                                :style="{width:'220px'}"
                                placeholder="选择年"
                                value-format="yyyy"
                            ></el-date-picker>
                        </div>
                    </div>
                </div>
                <div class="fr">
                    <div class="query" @click="changetime">查询</div>
                    <div class="export" @click="exportTable">导出</div>
                </div>
            </div>
            <div id="myChart" ref="myChart" :style="{width: '100%', height: '40%'}"></div>
            <div class="tabledata" :style="{width: '100%', height: 'calc(100% - 40% - 82px)'}">
                <el-table
                    :data="tableData"
                    height="69%"
                    border
                    :style="{border:'1px solid #cccccc'}"
                    :cell-style="{border:'1px solid #cccccc'}"
                    :header-cell-style="{background:'#5a6c98',color:'#ffffff', border:'1px solid #cccccc',height:'50px',padding:'0'}"
                >
                    <el-table-column prop="Number" label="序号" width="180"></el-table-column>
                    <el-table-column prop="Time" label="时间" width="272"></el-table-column>
                    <el-table-column prop="Room" label="配电室" width="272"></el-table-column>
                    <el-table-column prop="Device" label="控制柜" width="272"></el-table-column>
                    <el-table-column prop="TagName" label="变量名" width="272"></el-table-column>
                    <el-table-column prop="TagDesc" label="变量描述" width="272"></el-table-column>
                    <el-table-column prop="Temperature" label="温度℃"></el-table-column>
                </el-table>
                <table class="bottomtable" cellspacing="0" celloadding="0">
                    <tr class="topline">
                        <td class="center" width="1540">最大</td>
                        <td class="middle">
                            <span v-show="!chardata">0</span>
                            {{chardata.max}}
                        </td>
                    </tr>
                    <tr>
                        <td class="center" width="1540">最小</td>
                        <td class="middle">
                            <span v-show="!chardata">0</span>
                            {{chardata.min}}
                        </td>
                    </tr>
                </table>
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
            select03: [], //获取的三级数组数据
            indexId: '', //定义分类一的默认值
            indexId2: '',
            indexId3: '',
            indexNum: 0, //定义一级菜单的下标
            index1Num: 0, //定义一级菜单的下标
            option: {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross'
                    }
                },
                legend: {
                    data: ['温度℃'],
                    left: '1%'
                    // icon:'circle'
                },
                grid: {
                    left: '4%',
                    right: '4%',
                    bottom: '4%',
                    containLabel: true
                },
                toolbox: {
                    right: '3%',
                    feature: {
                        dataZoom: {
                            show: true
                            // yAxisIndex: 'none'
                        },
                        restore: {
                            show: true
                        }
                    }
                },

                xAxis: {
                    type: 'category',
                    boundaryGap: ['20%', '20%'],
                    data: ['1']
                },
                yAxis: {
                    type: 'value',
                },
                series: [
                    {
                        name: '温度℃',
                        type: 'line',
                        stack: '总量',
                        data: [220, 182, 191, 234, 290, 330, 310],
                        selectedMode: 'single',
                        symbol: 'none',
                        color: 'blue'
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
            hasnum: 1
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
        },
        indexId(val) {
            this.indexSelect01();
            this.indexId2 = this.select02[0].Device;
            console.log(this.indexId2);
            this.indexId3 = this.select02[0].Points[0];
        },
        indexId2(val){
          this.indexId3 = this.select03[0];
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
                    '配电室',
                    '控制柜',
                    '变量名',
                    '变量描述',
                    '温度℃'
                ];
                const filterVal = [
                    'Number',
                    'Time',
                    'Room',
                    'Device',
                    'TagName',
                    'TagDesc',
                    'Temperature'
                ];

                let pushdata = [
                    {
                        Number: '',
                        Time: '最大',
                        DeviceName: '',
                        Room: '',
                        Device: '',
                        TagName: '',
                        TagDesc: '',
                        Temperature: this.chardata.max
                    },
                    {
                        Number: '',
                        Time: '最小',
                        DeviceName: '',
                        Room: '',
                        Device: '',
                        TagName: '',
                        TagDesc: '',
                        Temperature: this.chardata.min
                    }
                ];
                var trydata = [];
                for (var j in this.tableData) {
                    trydata.push(this.tableData[j]);
                }
                for (var i in pushdata) {
                    trydata.push(pushdata[i]);
                }
                const list = trydata;
                const data = this.formatJson(filterVal, list);
                export_json_to_excel(tHeader, data, '变配电曲线');
            });
        },
        formatJson(filterVal, jsonData) {
            return jsonData.map(v => filterVal.map(j => v[j]));
        },
        indexSelect01() {
            let i = 0;
            let j = 0;
            for (i = 0; i < this.select01.length; i++) {
                if (this.select01[i].Room == this.indexId) {
                    this.indexNum = i;
                    break;
                }
            }

            this.select02 = this.select01[this.indexNum].Devices;
            for (j = 0; j < this.select02.length; j++) {
                if (this.select02[j].Device == this.indexId2) {
                    this.index1Num = j;
                    break;
                }
            }
            this.select03 = this.select01[this.indexNum].Devices[
                this.index1Num
            ].Points;
        },
        indexSelect02() {
            this.indexSelect01();
            let j = 0;
            for (j = 0; j < this.select02.length; j++) {
                if (this.select02[j].Device == this.indexId2) {
                    this.index1Num = j;
                    break;
                }
            }
            this.select03 = this.select01[this.indexNum].Devices[
                this.index1Num
            ].Points;
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
                url: `/api/TemperatureCurve/TemperatureCurve_GstData?argRoom=${
                    this.indexId
                }&argDevice=${this.indexId2.replace(/#/g, '%23')}&argTag=${
                    this.indexId3
                }&argRange=${this.couponSelected}&argStartTime=${
                    this.starttime
                }&argEndTime=${this.endtime}`
            })

                .then(res => {
                    console.log(res);
                    this.hasnum = 1;
                    this.option.xAxis.data = res.data.data.xAxis;
                    console.log(this.option.xAxis.data);
                    this.option.series[0].data = res.data.data.temperatureData;
                    this.chardata = res.data.data;
                    this.tableData = res.data.data.tables;
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
                    '/api/TemperatureCurve/TemperatureCurve_GstRoomsAndDevicesAndTag'
            })
                .then(res => {
                    this.tablenames = res.data.data;
                    this.select01 = res.data.data;
                    this.indexSelect01();
                    this.indexSelect02();
                    if (this.indexId == '') {
                        this.indexId = this.select01[0].Room;
                        this.indexId2 = '1#进线柜';
                        this.indexId3 = 'KJ.PD.D1.1_1AA_7019';
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
            width: 220px;
        }
        .tabledatetime {
            height: 40px;
            width: 66px;
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
        cursor: pointer;
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
        // text-align: center;
        text-indent: 12em;
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