<!--
 * @description: 设备总览页面
 * @since: 2019-11-08 15:00:48
 * @Author: jawnwa22
 * @LastEditors: jawnwa22
 * @LastEditTime: 2019-11-11 10:13:58
 -->
<template>
    <!-- <div class="alarm-container">
		<iframe src="http://10.51.1.4:8813" height="100%" width="100%"></iframe>
    </div>-->
    <div class="tapwater">
        <div class="linebox">
            <div class="table clearfix">
                <div class="fl">
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
                        <div class="block" v-show="couponSelected == '小时'">
                            <span class="demonstration"></span>
                            <el-date-picker
                                v-model="value1"
                                type="datetime"
                                :placeholder="lang.SCMSConsoleWebApiMySql_PleChooseDate"
                                value-format="yyyy-MM-dd HH:mm:ss"
                                :style="{width:'220px'}"
                            ></el-date-picker>
                        </div>
                        <i class="separate" v-show="couponSelected == '小时'">-</i>
                        <div class="block" v-show="couponSelected == '小时'">
                            <span class="demonstration"></span>
                            <el-date-picker
                                v-model="value2"
                                type="datetime"
                                :placeholder="lang.SCMSConsoleWebApiMySql_PleChooseDate"
                                value-format="yyyy-MM-dd HH:mm:ss"
                                :style="{width:'220px'}"
                            ></el-date-picker>
                        </div>
                        <div
                            class="block"
                            v-show="couponSelected == '日' || couponSelected == '周'||couponSelected == '季'"
                        >
                            <span class="demonstration"></span>
                            <el-date-picker
                                v-model="value3"
                                type="date"
                                placeholder="选择日期"
                                value-format="yyyy-MM-dd"
                                :style="{width:'220px'}"
                            ></el-date-picker>
                        </div>
                        <i
                            class="separate"
                            v-show="couponSelected == '日' || couponSelected == '周'||couponSelected == '季'"
                        >-</i>
                        <div
                            class="block"
                            v-show="couponSelected == '日' || couponSelected == '周'||couponSelected == '季'"
                        >
                            <span class="demonstration"></span>
                            <el-date-picker
                                v-model="value4"
                                type="date"
                                placeholder="选择日期"
                                value-format="yyyy-MM-dd"
                                :style="{width:'220px'}"
                            ></el-date-picker>
                        </div>
                        <div class="block" v-show="couponSelected == '月'">
                            <span class="demonstration"></span>
                            <el-date-picker
                                v-model="value5"
                                type="month"
                                placeholder="选择月"
                                value-format="yyyy-MM"
                                :style="{width:'220px'}"
                            ></el-date-picker>
                        </div>
                        <i class="separate" v-show="couponSelected == '月'">-</i>
                        <div class="block" v-show="couponSelected == '月'">
                            <span class="demonstration"></span>
                            <el-date-picker
                                v-model="value6"
                                type="month"
                                placeholder="选择月"
                                value-format="yyyy-MM"
                                :style="{width:'220px'}"
                            ></el-date-picker>
                        </div>
                        <div class="block" v-show="couponSelected == '年'">
                            <span class="demonstration"></span>
                            <el-date-picker
                                v-model="value7"
                                type="year"
                                placeholder="选择年"
                                value-format="yyyy"
                                :style="{width:'220px'}"
                            ></el-date-picker>
                        </div>
                        <i class="separate" v-show="couponSelected == '年'">-</i>
                        <div class="block" v-show="couponSelected == '年'">
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
                    <div class="export" @click="exportTable">导出</div>
                </div>
            </div>
            <div class="tabledata" :style="{width: '100%', height: 'calc(100% - 123px)'}">
                <div class="sad1" id="outTable">
                    <el-table
                        v-if="headerrows == 2"
                        ref="tableList"
                        :data="obj.tables"
                        border
                          :height="height"
                        row-key="id"
                        stripe
                        @header-dragend="colChange"
                    >
                        <template slot="empty">
                            <span>{{lang.SCMSConsoleWebApiMySql_NoData}}</span>
                        </template>
                        <el-table-column
                            v-for="(item,index) in obj.header"
                            :label="item.FirstHeader"
                            :key="index"
                            :prop="item.prop"
                        >
                            <el-table-column
                                v-for="(child,ci) in item.SecondHeader"
                                :prop="child.Key"
                                :label="child.Name"
                                :key="ci"
                                width="204"
                            ></el-table-column>
                        </el-table-column>
                    </el-table>
                    <div class="asd addclass" id="orderFullScreen" v-if="headerrows == 2" @scroll="handleScroll">
                        <div class="tr" v-for="(item,index) in totalData" :key="index">
                            <div
                                class="td"
                                v-for="(value,key,index) in item"
                                :key="index"
                                :class="key"
                            >{{value}}</div>
                        </div>
                    </div>
                    <el-table
                        :data="obj.tables"
                        ref="tableList"
                        border
                           :height="height"
                        style="width: 100%"
                        row-key="id"
                        stripe
                        v-if="headerrows == 1"
                        @header-dragend="colChange1"
                    >
                        <el-table-column
                            v-for="(child,ci) in obj.header"
                            :prop="child.Key"
                            :label="child.Name"
                            :key="ci"
                            width="371"
                        ></el-table-column>
                    </el-table>
                    <div class="asd1" id="orderFullScreen" v-if="headerrows == 1" @scroll="handleScroll" :class="{addclass}">
                        <div class="tr" v-for="(item,index) in totalData" :key="index">
                            <div
                                class="td"
                                v-for="(value,key,index) in item"
                                :key="index"
                                :class="key"
                            >{{value}}</div>
                        </div>
                    </div>
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
                        <span class="btn" :class="{nopage:aaa}" @click="abck">{{lang.DataGrid_Reaction_LastPage}}</span>
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
import FileSaver from 'file-saver';
import XLSX from 'xlsx';
export default {
    name: 'tapwater',
    computed: {
        totalProps() {
            const keys = Object.keys(this.totalData[0]);
            console.log(keys);
            return keys;
        }
    },
    data() {
        return {
            // obj:{},
            addclass:true,
            a: '',
            b: '',
            wewidth: 0,
            obj: {
                header: [],
                list: []
            },

            saddata: [],
            sdadata: {},
            // 表格组件 列表数据对象
            tableData: [],
            loading: false,
            planList: [],
            editRowJson: '',
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
                    name: '小时'
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
                    name: '日'
                },
                {
                    time: 3,
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
                    name: '周'
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
                    name: '月'
                },
                {
                    time: 5,
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
                    name: '季'
                },
                {
                    time: 6,
                    id:
                        new Date().getFullYear() +
                        '-' +
                        (new Date().getMonth() + 1),
                    id1:
                        new Date().getFullYear() +
                        '-' +
                        (new Date().getMonth() + 1),
                    name: '年'
                }
            ],
            couponSelected: '',
            starttime: '',
            endtime: '',
              height:'66.9%',
            change: 2,
            aaa: false,
            bbb: false,
            tableData1323: [],
            nowIndex: 1,
            pageDate: {
                pageIndex: 1,
                pagesize: 24,
                togeIndex: 0,
                togesize: 0
            },
            twodata: [],
            totalData: [],
            scrollLeft: null,
            headerrows: 1,
            www:1,
            lang: JSON.parse(localStorage.getItem('languages'))[localStorage.getItem('currentLang')]
        };
    },

    created() {
        //如果没有这句代码，select中初始化会是空白的，默认选中就无法实现
        this.couponSelected = this.couponList[0].name;
        this.initData();
         document.getElementById('orderFullScreen').addEventListener('scroll', this.handleScroll);
    },
    watch: {
        couponSelected(val) {
            if (val == '小时') {
                this.value1 = this.couponList[0].id;
                this.value2 = this.couponList[0].id1;
            } else if (val == '日') {
                this.value3 = this.couponList[1].id;
                this.value4 = this.couponList[1].id1;
            } else if (val == '周') {
                this.value3 = this.couponList[1].id;
                this.value4 = this.couponList[1].id1;
            } else if (val == '季') {
                this.value3 = this.couponList[1].id;
                this.value4 = this.couponList[1].id1;
            } else if (val == '月') {
                this.value5 = this.couponList[2].id;
                this.value6 = this.couponList[2].id1;
            } else if (val == '年') {
                this.value7 = this.couponList[3].id;
                this.value8 = this.couponList[3].id1;
            }
            if (val == '小时') {
                this.change = 2;
            }
        }
    },

    methods: {
        colChange(a, b, c, d) {
            console.log(b);
            let e = '';
            if (c.property == 'Time') {
                e = 'Name';
            } else {
                e = c.property;
            }

            var g = document.getElementsByClassName(`${e}`);
            for (let i = 0; i < g.length; i++) {
                g[i].style.width = a + 'px';
            }
            var aa = document.getElementsByClassName('tr');
            console.log(aa);
            var v = document.querySelectorAll('.tr>.td');
            let cc = 0;
            for (let bb = 0; bb < v.length; bb++) {
                cc = cc + v[bb].clientWidth + 2;
            }
            console.log(cc / this.totalData.length);
            this.wewidth = cc / this.totalData.length;
            for (let i = 0; i < aa.length; i++) {
                aa[i].style.width = this.wewidth + 'px';
            }
        },
        colChange1(a, b, c, d) {
            console.log(b);
            let e = '';
            if (c.property == 'Time') {
                e = 'Name';
            } else {
                e = c.property;
            }

            var g = document.getElementsByClassName(`${e}`);
            for (let i = 0; i < g.length; i++) {
                g[i].style.width = a + 'px';
            }
            var aa = document.getElementsByClassName('tr');
            console.log(aa);
            var v = document.querySelectorAll('.tr>.td');
            let cc = 0;
            for (let bb = 0; bb < v.length; bb++) {
                cc = cc + v[bb].clientWidth + 2;
            }
            console.log(cc / this.totalData.length);
            this.wewidth = cc / this.totalData.length;
            for (let i = 0; i < aa.length; i++) {
                aa[i].style.width = this.wewidth + 'px';
            }
        },
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
            if (this.headerrows == 1) {
                require.ensure([], () => {
                    const {
                        export_json_to_excel
                    } = require('../../vendor/Export2Excel');
                    const tHeader = [];
                    for (var i in this.obj.header) {
                        tHeader.push(this.obj.header[i].Name);
                        console.log(this.obj.header[i].Name);
                    }
                    console.log(this.pwerbody);
                    var a = 1;
                    const filterVal = [];
                    for (var key in this.pwerbody[0]) {
                        if (this.pwerbody[0].hasOwnProperty(key)) {
                            console.log(key);
                            filterVal.push(key);
                        }
                    }
                    console.log(filterVal);
                    console.log(this.listdata);
                    console.log(this.totalData);

                    const list = this.listdata;
                    let dd = {};
                    let cc = 0;
                  if(this.www == 1){
                       for(cc in this.totalData){
						
                        dd = this.totalData[cc];
						dd.Time = dd.Name;
						delete dd.Time;
                        list.push(dd)
					}
					}
					this.www = 2;
                    const data = this.formatJson(filterVal, list);
                    export_json_to_excel(tHeader, data, '自来水计量统计');
                });
            } else {
                console.log('sad');
                /* generate workbook object from table */
                var wb = XLSX.utils.table_to_book(
                    document.querySelector('#outTable')
                );
                /* get binary string as output */
                var wbout = XLSX.write(wb, {
                    bookType: 'xlsx',
                    bookSST: true,
                    type: 'array'
                });
                try {
                    FileSaver.saveAs(
                        new Blob([wbout], { type: 'application/octet-stream' }),
                        '自来水计量统计'
                    );
                } catch (e) {
                    if (typeof console !== 'undefined') console.log(e, wbout);
                }
                return wbout;
            }
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
           
            if (this.couponSelected == '小时') {
                if (this.change !== 1) {
                    this.value1 = this.GMTToStr(this.value1);
                    this.value2 = this.GMTToStr(this.value2);
                    this.change = 1;
                }
                this.starttime = this.value1;
                this.endtime = this.value2;
            } else if (
                this.couponSelected == '日' ||
                this.couponSelected == '周' ||
                this.couponSelected == '季'
            ) {
                this.starttime = this.value3;
                this.endtime = this.value4;
            } else if (this.couponSelected == '月') {
                this.starttime = this.value5;
                this.endtime = this.value6;
            } else if (this.couponSelected == '年') {
                this.starttime = this.value7.substring(0, 4);
                this.endtime = this.value8.substring(0, 4);
            }
            if (this.couponSelected == '小时') {
                if (
                    new Date(this.starttime).getTime() >
                    new Date(this.endtime).getTime()
                ) {
                    this.tipchange1 = true;
                    this.w = `查询开始时间不能大于结束时间！`;
                } else {
                    this.somethingdata1();
                }
            } else if (
                this.couponSelected == '日' ||
                this.couponSelected == '周' ||
                this.couponSelected == '季'
            ) {
                if (
                    new Date(this.starttime).getTime() >
                    new Date(this.endtime).getTime()
                ) {
                    this.tipchange1 = true;
                    this.w = `查询开始时间不能大于结束时间！`;
                } else {
                    this.somethingdata1();
                }
            } else if (this.couponSelected == '月') {
                if (
                    new Date(this.starttime).getTime() >
                    new Date(this.endtime).getTime()
                ) {
                    this.tipchange1 = true;
                    this.w = `查询开始时间不能大于结束时间！`;
                } else {
                    this.somethingdata1();
                }
            } else if (this.couponSelected == '年') {
                if (
                    new Date(this.starttime).getTime() >
                    new Date(this.endtime).getTime()
                ) {
                    this.tipchange1 = true;
                    this.w = `查询开始时间不能大于结束时间！`;
                } else {
                    this.somethingdata1();
                }
            }
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

        somethingdata1() {
            this.$axios
                .post(
                    `/api/CustomReports/CustomReports_GstData?argReportName=TapWaterMeasureStatistics&argRange=${this.couponSelected}&argStartTime=${this.starttime}&argEndTime=${this.endtime}&argPageSize=24&argPageIndex=1`
                )
                .then(res => {
                    // this.addclass = false;
                    console.log(JSON.parse(res.data.data.summary));
                    this.headerrows = res.data.data.headerrows;
                    this.obj = res.data.data;
                        this.totalData = JSON.parse(this.obj.summary);
                           if(this.obj.tables == ']'){
                        this.obj.tables = [];
                    }
                          console.log(this.totalData)
                          console.log(this.totalData.length)
                    this.pwerbody = JSON.parse(this.obj.tables);
                    this.listdata = JSON.parse(this.obj.tables);
                    this.obj.tables = this.pwerbody;
                      console.log(this.obj.tables);
                    this.headerrows = res.data.data.headerrows;
                
                    let i = 0;
                    let a = 0;
                    let b = 0;
                       let c = 0;

                    for(c  in this.obj.header){
                     this.obj.header[c].Key=this.obj.header[c].Key.split(".").join("");
                    // this.obj.header[c].Key = this.obj.header[c].Key.replace(reg,"");
                     console.log(this.obj.header[c].Key);
                    }
                    for (i in this.pwerbody) {
                        this.saddata.push(this.sdadata);
                    }
                    // this.pageDate.togesize = this.pwerbody.length;
                    // this.pageDate.togeIndex = Math.ceil(
                    //     this.pwerbody.length / 24
                    // );
                    // let a1 = this.nowIndex + 1;
                    // if (24 >= this.pageDate.togesize) {
                    //     let b = this.pageDate.togesize;
                    //     this.pageDate.pageIndex = this.nowIndex;
                    // } else {
                    //     let b = this.nowIndex * 24 + 24;
                    //     this.pageDate.pageIndex = this.nowIndex;
                    //     console.log(this.pwerbody);
                    //     this.pwerbody = this.pwerbody.splice(a1 * 24, b);
                    // }
                    // if (this.nowIndex >= this.pageDate.togeIndex) {
                    //     this.aaa = false;
                    // } else {
                    //     this.aaa = true;
                    // }
                    // if (this.nowIndex < this.pageDate.togeIndex) {
                    //     this.bbb = false;
                    // } else {
                    //     this.bbb = true;
                    // }
                    // this.nowpage = 1;
                   
                }).then(() => {
                     this.addclass = false;
                     var aa = document.getElementsByClassName('tr');
                    console.log(aa.length);
                    var v = document.querySelectorAll('.tr>.td');
                    let cc = 0;
                    for (let bb = 0; bb < v.length; bb++) {
                        cc = cc + v[bb].clientWidth + 2;
                    }
                    console.log(cc / this.totalData.length);
                    this.wewidth = cc / this.totalData.length;
                    for (let i = 0; i < aa.length; i++) {
                        aa[i].style.width = this.wewidth + 'px';
                    }
                    console.log(this.totalData.length);
                    if (this.totalData.length == 1) {
                        this.height = '91.5%';
                        if (this.headerrows == 1) {
                            let aaa = document.getElementsByClassName(
                                'asd1'
                            )[0];
                            aaa.style.height = '8.4%';
                        } else {
                            let aaa = document.getElementsByClassName(
                                'asd1'
                            )[0];
                            aaa.style.height = '8.4%';
                        }
                    } else if (this.totalData.length == 2) {
                        this.height = '83.5%';
                        if (this.headerrows == 1) {
                            let aaa = document.getElementsByClassName(
                                'asd1'
                            )[0];
                            aaa.style.height = '16.4%';
                        } else {
                            let aaa = document.getElementsByClassName(
                                'asd1'
                            )[0];
                            aaa.style.height = '16.4%';
                        }
                    } else if (this.totalData.length == 3) {
                        this.height = '75.5%';
                        if (this.headerrows == 1) {
                            let aaa = document.getElementsByClassName(
                                'asd1'
                            )[0];
                            aaa.style.height = '24.4%';
                        } else {
                            let aaa = document.getElementsByClassName(
                                'asd1'
                            )[0];
                            aaa.style.height = '24.4%';
                        }
                    }else if (this.totalData.length == 4) {
                        this.height = '66.9%';
                        if (this.headerrows == 1) {
                            let aaa = document.getElementsByClassName(
                                'asd1'
                            )[0];
                            aaa.style.height = '33%';
                        } else {
                            let aaa = document.getElementsByClassName(
                                'asd1'
                            )[0];
                            aaa.style.height = '33%';
                        }
                    }
                })
                .catch(function(error) {
                    
                    // console.log(error);
                    // console.log(this.$refs.tableList)
                     var aa = document.getElementsByClassName('tr');
                    var v = document.querySelectorAll('.tr>.td');
                    let cc = 0;
                    for (let bb = 0; bb < v.length; bb++) {
                        cc = cc + v[bb].clientWidth + 2;
                    }
                    
                //    this.totalData.length = 4;
                //     console.log(cc / this.totalData.length);
                    // this.wewidth = cc / this.totalData.length;
                    for (let i = 0; i < aa.length; i++) {
                        aa[i].style.width = cc/4 + 'px';
                    }
                    // console.log(this.totalData.length);
                    // if (this.totalData.length == 1) {
                    //     this.height = '91.5%';
                    //     if (this.headerrows == 1) {
                    //         let aaa = document.getElementsByClassName(
                    //             'asd1'
                    //         )[0];
                    //         aaa.style.height = '8.4%';
                    //     } else {
                    //         let aaa = document.getElementsByClassName(
                    //             'asd1'
                    //         )[0];
                    //         aaa.style.height = '8.4%';
                    //     }
                    // } else if (this.totalData.length == 2) {
                    //     this.height = '83.5%';
                    //     if (this.headerrows == 1) {
                    //         let aaa = document.getElementsByClassName(
                    //             'asd1'
                    //         )[0];
                    //         aaa.style.height = '16.4%';
                    //     } else {
                    //         let aaa = document.getElementsByClassName(
                    //             'asd1'
                    //         )[0];
                    //         aaa.style.height = '16.4%';
                    //     }
                    // } else if (this.totalData.length == 3) {
                    //     this.height = '75.5%';
                    //     if (this.headerrows == 1) {
                    //         let aaa = document.getElementsByClassName(
                    //             'asd1'
                    //         )[0];
                    //         aaa.style.height = '24.4%';
                    //     } else {
                    //         let aaa = document.getElementsByClassName(
                    //             'asd1'
                    //         )[0];
                    //         aaa.style.height = '24.4%';
                    //     }
                    // }else if (this.totalData.length == 4) {
                    //     this.height = '66.9%';
                    //     if (this.headerrows == 1) {
                    //         let aaa = document.getElementsByClassName(
                    //             'asd1'
                    //         )[0];
                    //         aaa.style.height = '33%';
                    //     } else {
                    //         let aaa = document.getElementsByClassName(
                    //             'asd1'
                    //         )[0];
                    //         aaa.style.height = '33%';
                    //     }
                    // }
                        this.addclass = true;
                    console.log('鼠标');
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
        handleScroll() {
            this.$refs.tableList.bodyWrapper.scrollLeft = document.getElementById(
                'orderFullScreen'
            ).scrollLeft;
            console.log(document.getElementById(
                'orderFullScreen'
            ).scrollLeft);
            console.log(  this.$refs.tableList.bodyWrapper.scrollLeft);
        }
    },
    mounted() {
        this.changetime();
           
       
    }
};
</script>
<style lang="scss" scoped>
.asd {
    width: 100%;
    height: 33%;
    overflow-x: auto;
    overflow-y: hidden;
    .td {
        // width: 1%;
        float: left;
        height: 48px;
        line-height: 48px;
        text-align: center;
        color: #606266;
        // width: (100%/9);
        width: 203.88px;
    }
    .tr {
        overflow: hidden;
        border-bottom: 1px solid #ebeef5;
        width: 100%;
    }
}
.asd1 {
    width: 100%;
    height: 33%;
    overflow-x: auto;
    overflow-y: hidden;
    .td {
        // width: 1%;
        float: left;
        height: 48px;
        line-height: 48px;
        text-align: center;
        color: #606266;
        // width: (100%/9);
        width: 371px;
    }
    .tr {
        overflow: hidden;
        border-bottom: 1px solid #ebeef5;
        width: 100%;
    }
}
.sad1 {
    width: 100%;
    height: 600px;
    overflow: auto;
    border: 1px solid blue;
}

.fl {
    float: left;
}
.fr {
    float: right;
}
select {
    text-indent: 1em;
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
        padding-left: 20px;
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
        background-color: #4270e4;
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
    width: calc(100% - 20px);
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
.el-scrollbar__wrap {
    overflow-x: hidden;
}

.sad {
    height: 100%;
    width: 100%;
    overflow: auto;
    border: 1px solid #cccccc;
    table {
        width: 100%;

        background-color: #ffffff;
        color: #9d9d9d;
        tr {
            background-color: #5a6c98;
        }
        th {
            background: #5a6c98;
            color: #ffffff;
            display: inline-block;
            width: 200px;
            border-right: 1px solid #cccccc;
        }
        td {
            width: 200px !important;
            display: inline-block;
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

.alarm-container {
    width: 100%;
    height: 86vh;
    color: #000;
    margin-top: 100px;
    display: flex;
    background-color: #eee;
    padding: 20px 10px;
    box-sizing: border-box;
}

</style>