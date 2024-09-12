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
                        :style="{width:'220px'}"
                    >
                        <!-- <option value="选择一级菜单">选择一级菜单</option> -->
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
                        class="collername"
                        v-model="indexId2 "
                        :style="{width:'180px'}"
                    >
                        <!-- <option value="选择二级菜单">选择二级菜单</option> -->
                        <option :value="k" v-for="k in select02" :key="k">{{k}}</option>
                    </select>
                    <span>查询范围：</span>
                    <select
                        name="public-choice"
                        v-model="couponSelected"
                        class="tabledatetime"
                        :style="{width:'100px'}"
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
                    <div class="query" @click.stop="changetime">查询</div>
                    <div class="export" @click="exportTable">导出Excel</div>
                </div>
            </div>
            <!-- <div id="myChart" ref="myChart" :style="{width: '100%', height: '45%'}"></div> -->
            <div class="tabledata" :style="{width: '100%', height: 'calc(100% - 123px)'}">
                <div class="sad">
                    <table cellspacing="0" cellpadding="0">
                        <thead>
                            <tr height="50px" class=".trr">
                                <th v-for="(item,index) in powerheader.header" :key="index">{{item}}</th>
                            </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(item,index) in pwerbody" :key="index">
                                <td v-for="(val,index) in item" :key="index">{{val}}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="page">
                    <div class="pageword">
                        {{lang.DataGrid_Reaction_HT_ATotalOf}}
                        <span>{{pageDate.togesize}}</span>{{lang.DataGrid_Reaction_HT_RecordsAndTheCurrent}}
                        <span>{{pageDate.pageIndex}}</span>{{lang.DataGrid_Reaction_HT_Page}}
                        <span>{{pageDate.togeIndex}}</span>{{lang.DataGrid_Reaction_HT_RecordsAnd}}
                        <span>{{pageDate.pagesize}}</span>{{lang.DataGrid_Reaction_HT_PerPage}}
                    </div>
                    <div class="pageoperation">
                        <span class="btn" @click="start">{{lang.DataGrid_Reaction_FirstPage}}</span>
                        <span class="btn " :class="{nopage:aaa}" @click="abck">{{lang.DataGrid_Reaction_LastPage}}</span>
                        <span class="btn" :class="{nopage:bbb}" @click="next">{{lang.DataGrid_Reaction_NextPage}}</span>
                        <span class="btn" @click="end">{{lang.DataGrid_Reaction_EndPage}}</span>
                        <div class="inputnumber">
                            {{lang.DataGrid_Reaction_The}}
                            <input type="text" v-model="nowpage" /> {{lang.DataGrid_Reaction_Page}}
                        </div>

                        <span class="btn" @click="jump">{{lang.DataGrid_Reaction_TurnPage}}</span>
                    </div>
                </div>
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
            nowpage: 1,
            gth: require('../../assets/images/gth.png'),
            powerheader: '',
            pwerbody: '',
            select01: [], //获取的一级数组数据
            select02: [], //获取的二级数组数据
            indexId: '', //定义分类一的默认值
            indexId2: '',
            indexNum: 0, //定义一级菜单的下标
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
            chardata: [],
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
            aaa: false,
            bbb: false,
            tableData: [],
            nowIndex: 1,
            pageDate: {
                pageIndex: 1,
                pagesize: 50,
                togeIndex: 0,
                togesize: 0
            },
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
        },
        indexId(val) {
            this.indexSelect01();
            this.indexId2 = this.select02[0];
        }
    },
    methods: {
        abck() {
            if (1 < this.nowIndex) {
                this.nowIndex--;
                
                this.somethingdata1();
              
            } 
        },
        next() {
            if (this.pageDate.togeIndex > this.nowIndex) {
                this.nowIndex++;
                this.somethingdata1();
            }
        },
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
                const tHeader = [];
                for (var i in this.powerheader.header) {
                    tHeader.push(this.powerheader.header[i]);
                }
                var a = 1;
                const filterVal = [];
                for (var key in this.pwerbody[0]) {
                    if (this.pwerbody[0].hasOwnProperty(key)) {
                        console.log(key);
                        filterVal.push(key);
                        console.log(filterVal);
                    }
                }
                const list = this.listdata;
                const data = this.formatJson(filterVal, list);
                export_json_to_excel(tHeader, data, '变配电报表');
            });
        },
        formatJson(filterVal, jsonData) {
            return jsonData.map(v => filterVal.map(j => v[j]));
        },
        indexSelect01() {
            let i = 0;
            for (i = 0; i < this.select01.length; i++) {
                if (this.select01[i].Room == this.indexId) {
                    this.indexNum = i;
                    break;
                }
            }
            this.select02 = this.select01[this.indexNum].Devices;
        },
        jump() {
            if (this.nowpage <= this.pageDate.togeIndex) {
                this.nowIndex = this.nowpage;
                this.somethingdata1();
            }
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

        somethingdata() {
            
            this.$axios({
                method: 'post',
                url: `/api/HistoryReport/HistoryReport_GstData?argRoom=${this.indexId.replace(
                    /#/g,
                    '%23'
                )}&argDevice=${this.indexId2.replace(/#/g, '%23')}&argRange=${
                    this.couponSelected
                }&argStartTime=${this.starttime}&argEndTime=${this.endtime}`
            })
                .then(res => {
            
                    this.powerheader = res.data.data;
                    console.log(res);
                    console.log( this.couponSelected);
                    console.log(this.starttime);
                    console.log(this.endtime);
                    this.pwerbody = JSON.parse(this.powerheader.tables);
                    this.pageDate.togesize = this.pwerbody.length;
                    this.pageDate.togeIndex = Math.ceil(
                        this.pwerbody.length / 50
                    );
                    this.listdata = JSON.parse(this.powerheader.tables);
                    console.log('this.listadaa',this.listdata)
                    this.pwerbody = this.pwerbody.splice(0, 50);
                    if (this.nowIndex >= this.pageDate.togeIndex) {
                        this.aaa = false;
                    } else {
                        this.aaa = true;
                    }
                    if (this.nowIndex < this.pageDate.togeIndex) {
                        this.bbb = false;
                    } else {
                        this.bbb = true;
                    }
                })
                .catch(function(error) {
                    console.log(error);
                });
        },
        start() {
            this.nowIndex = 1;
            this.somethingdata1();
            
        },
        end() {
            this.nowIndex = this.pageDate.togeIndex;
            this.somethingdata1();
        },
        somethingdata1() {
            this.$axios({
                method: 'post',
                url: `/api/HistoryReport/HistoryReport_GstData?argRoom=${this.indexId.replace(
                    /#/g,
                    '%23'
                )}&argDevice=${this.indexId2.replace(/#/g, '%23')}&argRange=${
                    this.couponSelected
                }&argStartTime=${this.starttime}&argEndTime=${this.endtime}`
            })
                .then(res => {
                    this.powerheader = res.data.data;
                    this.pwerbody = JSON.parse(this.powerheader.tables);
                    console.log(this.pwerbody);
                    this.pageDate.togesize = this.pwerbody.length;
                    this.pageDate.togeIndex = Math.ceil(
                        this.pwerbody.length / 50
                    );
                    let a = this.nowIndex - 1;
                    if (this.nowIndex * 50 + 50 > this.pageDate.togesize) {
                        let b = this.pageDate.togesize;
                       this.pageDate.pageIndex = this.nowIndex;
                        this.pwerbody = this.pwerbody.splice(a * 50, b);
                    } else {
                        let b = this.nowIndex * 50 + 50;
                          this.pageDate.pageIndex = this.nowIndex;
                        this.pwerbody = this.pwerbody.splice(a * 50, b);
                    }
                    if (this.nowIndex >= this.pageDate.togeIndex) {
                        this.aaa = false;
                    } else {
                        this.aaa = true;
                    }
                    if (this.nowIndex < this.pageDate.togeIndex) {
                        this.bbb = false;
                    } else {
                        this.bbb = true;
                    }
                    this.nowpage = 1;
                })
                .then(() => {})
                .catch(function(error) {
                    console.log(error);
                });
        },
        tablename() {
            //请求接口
            this.$axios({
                method: 'post',
                url: '/api/HistoryReport/HistoryReport_GstRoomsAndDevices'
            })
                .then(res => {
                    this.select01 = res.data.data;
                    this.indexSelect01();
                    if (this.indexId == '') {
                        this.indexId = this.select01[0].Room;
                        this.indexId2 = '1#进线柜';
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
        this.tablename();
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
            width: 200px;
            overflow: hidden;
        }
        .tabledatetime {
            height: 40px;
            width: 69px;
        }
        .collername {
            width: 130px;
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
    // height: 50%;

    .number {
        width: 160px !important;
    }
    .center {
        text-align: center;
        width: 40%;
    }
    .middle {
        width: 12%;
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
.page {
    width: 100%;
    height: 50px;
    line-height: 50px;
    color: #ababab;
    padding-left: 10px;
    font-size: 14px;
    overflow: hidden;
    .nopage {
        border: 2px solid #fed286 !important;
        color: #fed286;
    }
    .pageword {
        float: left;
    }
    .pageoperation {
        float: right;
        span {
            border: 2px solid #fda100;
            padding: 3px 8px;
            border-radius: 5px;
            color: #fda100;
            margin-left: 10px;
        }
        .inputnumber {
            display: inline-block;
            margin-left: 10px;
            input {
                width: 66px;
                height: 30px;
                text-align: center;
                color: #fda100;
            }
        }
    }
}

.sad {
    height: 100%;
    width: 100%;
    // overflow: auto;
    border: 1px solid #cccccc;
    table {
        width: 100%;

        background-color: #ffffff;
        color: #9d9d9d;

        th {
            background: #5a6c98;
            color: #ffffff;
            border-right: 1px solid #cccccc;
        }
        td {
            border-right: 1px solid #cccccc;
            border-bottom: 1px solid #cccccc;
            text-align: center;
        }
    }
}
.query:hover {
    cursor: pointer;
}
.sad {
    thead {
        tr {
            display: table;
            width: 99%;
            table-layout: fixed;
        }
    }
}
.sad {
    tbody {
        display: block;
        height: 580px;
        overflow-y: scroll;
    }
    tr {
        display: table;
        width: 100%;
        table-layout: fixed;
    }
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
.btn {
    cursor: pointer;
}
</style>