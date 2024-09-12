<!--
 * @Description: 这是双窗口子组件页面（组件）
 * @Date: 2019-11-19 13:51:38
 * @Author: Tao
 * @LastEditors: Tao
 * @LastEditTime: 2021-01-30 13:31:35
 TODO:重构
 -->
<template>
    <div class="conterbox2">
        <div class="conterbox2load" v-show="loading1" v-loading="loading1"></div>
        <div class="tip" ref="kongtiao2" v-show="tipchange"
            :style="{ width: 380 * zoom + 'px', height: 220 * zoom + 'px' }">
            <div class="tiphead" style="position:absolute;width: 380px;height: 40px;"></div>
            <div class="tiptop" :style="{ zoom }">
                <img :src="gth" alt />
                <span>{{ lang.HT_MessageBoxCaption_Tips }}</span>
            </div>
            <div class="tipcontanin" :style="{ zoom }">
                <div class="tipword"><span>{{ tipword }}</span></div>
                <div class="tipdetermine" @click="tip1">{{ lang.MessageBox_Confrim }}</div>
            </div>
        </div>
        <div class="conter_head" :class="{ colortip: $store.state.color == 'grey' }" :style="{
            zoom

        }">
            <div class="xl">
                <el-dropdown trigger="click">
                    <el-button class="dro" type="primary">
                        <span class="drotext">{{ text }}</span><i class="el-icon-caret-bottom el-icon--right caret"></i>
                    </el-button>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item @click.native="curveName(index)" @focus='sx' v-for="(item, index) in curveIDTo"
                            :key="index">
                            {{ item.Name }}</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
            <div class="staTime">
                <el-date-picker @focus='sx' :disabled="showTime" v-model="Sstime" type="datetime"
                    :placeholder="lang.SCMSConsoleWebApiMySql_PleChooseDate" default-time="12:00:00">
                </el-date-picker>
            </div>
            <div class="endTime">
                <el-date-picker @focus='sx' :disabled="showTime" v-model="Eetime" type="datetime"
                    :placeholder="lang.SCMSConsoleWebApiMySql_PleChooseDate" default-time="12:00:00">
                </el-date-picker>
            </div>
            <div class="bottom">
                <el-button @click.native="qeShow()" :disabled="showTime" class="conButton" type="primary">{{
                    lang.NewTrendChart_NewTrendChartUserControl_Query }}</el-button>
            </div>
        </div>
        <div class="conter_echart" :style="{ zoom, height: '427px', position: 'relative' }">
            <div class="echarts echarttwo"
                :style="{ width: 100 / zoom + '%', 'background': color2, height: '427px', zoom: 1 / zoom, transform: 'scale(' + zoom + ')' }"
                ref="tendency" :id='id'></div>
        </div>
        <div class="bottom_fool" :style="{
            marginTop: 20 * zoom + 'px',
            padding: 10 * zoom + 'px'
        }">
            <el-table :porp="Newtime" border height="100%" class="conterFool_middle" ref="multipleTable" :data="curveArr"
                prop=Newtime tooltip-effect="dark" :row-style="{ height: 50 * zoom + 'px', fontSize: 14 * zoom + 'px' }"
                :style="{ width: '100%', fontSize: 14 * zoom + 'px' }" :header-cell-style="{
                    background: ($store.state.color == 'grey') ? '#D9DBDE' : '#5a6c98',
                    color: ($store.state.color == 'grey') ? '#000' : '#fff',
                    'border-left': '1px solid #cccccc',
                    height: 50 * zoom + 'px',
                    fontSize: 14 * zoom + 'px',
                    padding: '0'
                }">
                <template slot="empty">
                    <span>{{ lang.SCMSConsoleWebApiMySql_NoData }}</span>
                </template>
                <el-table-column :label="lang.NewTrendChart_SingleChartUC_No" prop="Number" :width="80 * zoom">
                </el-table-column>
                <el-table-column prop="Name" :label="lang.NewTrendChart_SingleChartUC_Name" :width="150 * zoom">
                    <template slot-scope="scope">
                        <input ref="inpcheck" @click="inpClick(scope.$index, $event)" class="inpcheck" :style="'border:1px solid' + scope.row.Stroke + ';color:' + scope.row.Stroke
                            + ';position:relative;' + 'zoom:' + zoom" checked="checked" type="checkbox">
                        <span style="margin-left: 10px">{{ scope.row.DisplayName }}</span>
                    </template>
                </el-table-column>
                <el-table-column :label="lang.NewTrendChart_SingleChartUC_Description" prop="OriginalDescripDescription"
                    :width="100 * zoom">
                </el-table-column>
                <el-table-column :label="lang.NewTrendChart_SingleChartUC_Unit" prop="Unit" :width="80 * zoom">
                </el-table-column>
                <el-table-column :label="lang.NewTrendChart_SingleChartUC_Max" v-if="MaxShow" prop="MaxValue"
                    :width="80 * zoom">
                </el-table-column>
                <el-table-column :label="lang.NewTrendChart_SingleChartUC_Min" prop="MinValue" v-if="MinShow"
                    :width="80 * zoom">
                </el-table-column>
                <el-table-column :label="lang.NewTrendChart_SingleChartUC_Average" prop="numP" v-if="MeanShow"
                    :width="80 * zoom">
                </el-table-column>
                <el-table-column :label="lang.NewTrendChart_SingleChartUC_Type" prop="Type" :width="80 * zoom">
                </el-table-column>
                <el-table-column :render-header="renderHeader" :width="240 * zoom">
                    <template slot-scope="scope">
                        <span :style="'color:' + scope.row.Stroke + '!important;'" style="margin-left: 10px">{{
                            scope.row.Newtext }}</span>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
export default {
    name: 'conterbox2',
    props: ['showTime', "timeShowTo", "curveIDTo", "moreWindowTo", "ShowtextTo", "ide", 'id'],
    data() {
        return {
            gth: require('../../../assets/images/gth.png'),
            tipword: '',
            tipchange: false,
            value3: '',
            Sstime: '',
            Eetime: '',
            text: '',
            chartarr: [],
            chartarr1: [],
            curveLineColor: [],
            curveArr: [],
            curvearrValue: [],
            realArr: [],
            curveLine: [],
            curveLineName: [],
            curveLineType: [],
            curveLineValue: [],
            lineData: [],
            Stime: [],
            serDate: [],
            historyTime: [],
            RealShow: true,
            time2: false,
            timer: true,
            inpClickShow: true,
            Newtime: '2020-01-01 12:12:12',
            Newtext: '',
            NumP: 0,
            a: 0,
            NumS: 0,
            historyShow: false,
            loading1: false,
            formatterValue: '{value}',
            MeanShow: true,
            MaxShow: true,
            MinShow: true,
            color2: '',
            myChart: '',
            zoom: 1,
            lang: JSON.parse(localStorage.getItem('languages'))[localStorage.getItem('currentLang')],
            rowData: '',
            currentCache: 30,
        }
    },

    watch: {
        //图表动态数值
        "$store.state.cacheTime": {
            deep: true,
            handler: function (n, o) {
                if (n != this.currentCache) {
                    this.currentCache = n;
                    clearInterval(this.time2);
                    this.time2 = window.setInterval(() => {
                        this.getDate()
                    }, 1000)
                }
            }
        },
        "$store.state.curveGroupId": {
            deep: true,
            handler: function (n, o) {
                if (n === this.rowData.GID) {
                    // 清除曲线
                    let chart = this.$echarts.init(this.$refs.tendency)
                    chart.clear()
                    this.Stime = []
                    this.drawLine()
                }
            }
        },
        curveIDTo(n, o) {
            this.$nextTick(function () {
                this.curveName(this.ide)
            })
        },
        Sstime(n, o) {
            if (typeof (n) == 'object') {
                this.Sstime = this.getTime(this.Sstime)
            }
        },
        Eetime(n, o) {
            if (typeof (n) == 'object') {
                this.Eetime = this.getTime(this.Eetime)
            }
        },

        //比例显示
        ShowtextTo(n, o) {
            if (this.RealShow) {
                if (n == 1) {
                    this.NumS = 0
                    clearInterval(this.time2);
                    clearInterval(this.timer);
                    this.curvearrValue = []
                    this.Stime = []
                    this.time2 = window.setInterval(() => {
                        this.getDate()
                    }, 1000)
                    this.Showindex = 1
                    this.formatterValue = '{value}%'
                    this.curveLineValue = []
                    this.drawLine(1);
                    this.curveName(this.index)
                }
                if (n == 0) {
                    this.NumS = 0
                    clearInterval(this.time2);
                    clearInterval(this.timer);
                    this.curvearrValue = []
                    this.Stime = []
                    this.time2 = window.setInterval(() => {
                        this.getDate()
                    }, 1000)
                    this.Showindex = 0
                    this.formatterValue = '{value}'
                    this.curveLineValue = []
                    this.drawLine(1);
                    this.curveName(this.index)
                }
            }
        },
        //历史实时的监听
        timeShowTo(n, o) {
            if (n) {
                this.NumS = 0
                this.RealShow = true
                this.curveLineValue = []
                this.Stime = []
                var ind = this.index
                var id = this.ide
                this.curveName(id)
                this.time2Fun()
                this.historyShow = false
            } else {
                this.RealShow = false
                clearInterval(this.time2);
                clearInterval(this.timer);
                this.historyShow = true
            }
        }
    },
    created() {
        this.getCacheTime()
        this.getDate2()
        this.axiosSet()
    },
    beforeDestroy() {
        clearInterval(this.time2);
        clearInterval(this.timer);
        this.myChart.dispose()
    },
    destroyed() {
        clearInterval(this.time2);
        clearInterval(this.timer);
        this.myChart.dispose()
    },

    mounted() {
        var id = this.ide
        this.curveName(id)
        this.time2Fun()
        var fool = document.querySelectorAll('.fool_conter')
        for (var i = 0; i < fool.length; i++) {
            if (i % 2 == 0) {
                fool[i].style.background = '#fff'
            }
        }
        this.zoom = window.screen.width / 1920 < 0.8 ? 0.8 : window.screen.width / 1920
        setTimeout(() => {

            $('.bottom_fool').find('.el-input').css('zoom', this.zoom)
        })


        //图表自适应大小
        // this.$nextTick(()=>{
        //       window.onresize = ()=> {
        //           if(this.myChart){
        //             //   this.myChart.resize()
        //           }
        //       }
        // })
    },
    methods: {
        tip1() {
            this.tipchange = false;
            this.loading1 = false
        },
        sx() {

            let that = this
            setTimeout(() => {
                for (let i = 0; i < $('.el-picker-panel').length; i++) {
                    $('.el-picker-panel')[i].style.zoom = that.zoom
                }
                for (let i = 0; i < $('.el-select-dropdown').length; i++) {
                    $('.el-select-dropdown')[i].style.zoom = that.zoom
                }
                for (let i = 0; i < $('.el-dropdown-menu ').length; i++) {
                    $('.el-dropdown-menu ')[i].style.zoom = that.zoom
                }
            })

        },
        time2Fun() {
            if (this.timeShowTo) {
                this.getDate2()
                clearInterval(this.time2);
                this.time2 = window.setInterval(() => {
                    this.getDate()
                }, 1000)
            }
        },
        echartsResize() {

            this.myChart.resize()
        },
        getCacheTime() {
            this.$axios({
                method: 'post',
                url: `/api/NewTrendChart/GetCurveCacheTime`,
            }).then(res => {
                this.currentCache = res.data.data
            })
        },
        //请求曲线图表设置
        axiosSet() {
            this.$axios({
                method: "post",
                url: "/api/NewTrendChart/QueryChartSetting",
            }).then((res) => {
                this.color2 = '#' + res.data.data.ChartBackground.slice(3)
                this.color3 = '#' + res.data.data.CursorColor.slice(3)
                this.color4 = '#' + res.data.data.LineColor.slice(3)
                this.color5 = '#' + res.data.data.XForeground.slice(3)
                this.color6 = '#' + res.data.data.YForeground.slice(3)
                this.value2 = res.data.data.XFontFamily
                this.value3 = res.data.data.YFontFamily
                this.value5 = res.data.data.XFontSize
                this.value6 = res.data.data.YFontSize
                this.XFontIsB = res.data.data.XFontIsB
                this.YFontIsB = res.data.data.YFontIsB
                this.MaxShow = res.data.data.Max
                this.MinShow = res.data.data.Min
                this.MeanShow = res.data.data.Mean
            })
        },
        //切换肤色
        rowClass({ row, rowIndex }) {
            return `background:${this.$store.state.color == 'grey' ? '#D9DBDE !important' : ''};color:${this.$store.state.color == 'grey' ? '#000' : '#FFF'};border-left:'1px solid #cccccc';height:'50*${this.zoom}px';
            font-size: 14*${this.zoom}+'px'
            padding:'0'`
        },
        //表头时间
        renderHeader(h, { column, $index }) {
            return (
                <el-date-picker
                    size="mini"
                    class="timeLast"
                    v-model={this.Newtime}
                    onFocus={this.sx}
                    type="datetime"
                    focus={this.sx()}
                    change={this.aaa()}
                    placeholder="选择日期时间">
                </el-date-picker>
            )
        },
        //表头搜索时间接口
        aaa() {
            if (this.Newtime.length != 19) {
                var year = this.Newtime.getFullYear();        //获取当前月
                var month = this.Newtime.getMonth() + 1;
                var mothe = month > 9 ? month : '0' + month            //获取当前日
                var date = this.Newtime.getDate();
                var da = date > 9 ? date : '0' + date
                var h = this.Newtime.getHours(); //获取当前小时数(0-23)
                var he = h > 9 ? h : '0' + h
                var m = this.Newtime.getMinutes(); //获取当前分钟数(0-59)
                var me = m > 9 ? m : '0' + m
                var s = this.Newtime.getSeconds();
                var se = s > 9 ? s : '0' + s
                var str = year + '-' + mothe + '-' + da + ' ' + he + ':' + me + ':' + se
                var serDateArr
                if (this.serDate.length != 0) {
                    serDateArr = JSON.parse(this.serDate)
                } else {
                    serDateArr = this.serDate1
                }
                var data3 = {
                    IsProportion: this.Showindex,
                    StartTime: this.Sstime,
                    EndTime: this.Eetime,
                    Series: serDateArr
                }
                this.$axios({
                    method: "post",
                    url: "/api/NewTrendChart/QuerySerieHistoryPoints",
                    data: data3
                }).then((res) => {
                    if (res.data.code !== 0) {
                        this.tipword = res.data.msg;
                        setTimeout(() => {
                            this.tipchange = true;
                            this.move('tip', 'tiphead');
                        });
                        return
                    } else {
                        var data = res.data.data[0].Points
                        for (var i = 0; i < data.length; i++) {
                            this.curveArr[i].Newtext = data[i].Value
                        }
                    }

                })
            }
        },
        //父级组件调用
        huanyuan() {
            this.curvearrValue = []
            this.$nextTick(function () {
                if (this.$refs.tendency) {
                    var numdata
                    var numtime
                    if (this.ide == 0) {
                        numdata = localStorage.getItem("a")
                        numtime = localStorage.getItem("time")
                        this.curveLineValue = JSON.parse(numdata)
                        this.Stime = JSON.parse(numtime)
                        this.drawLine(0);
                    }
                    if (this.ide == 1) {
                        numdata = localStorage.getItem("b")
                        numtime = localStorage.getItem("time")
                        this.curveLineValue = JSON.parse(numdata)
                        this.Stime = JSON.parse(numtime)
                        this.drawLine(0);
                    }
                }
            })
        },
        move(name, namehead) {
            //  $(`.${name}`).addClass('center')
            let left = ($(`.${name}`).width()) / 2 + 'px'
            let top = ($(`.${name}`).height()) / 2 + 'px'
            $(`.${name}`)[0].style.left = `calc(50% - ${left})`;
            $(`.${name}`)[0].style.top = `calc(50% - ${top})`;
            $(`.${name}`)[0].addEventListener('mousedown', function (e) {

                if (e.target.className.toLocaleLowerCase() == namehead) {
                    $(`.${name}`).removeClass('center')
                    window.event.stopPropagation();
                    var x = 0;
                    var y = 0;
                    var l = 0;
                    var t = 0;
                    var isDown = false;
                    x = window.event.clientX;
                    y = window.event.clientY;
                    //获取左部和顶部的偏移量
                    l = $(`.${name}`)[0].offsetLeft;
                    t = $(`.${name}`)[0].offsetTop;
                    //开关打开
                    isDown = true;
                    var pdmove = false;


                    //设置样式
                    $('body')[0].style.cursor = 'move';

                    $('body')[0].addEventListener('mousemove', function (e) {
                        pdmove = true;
                        if (isDown == false) {
                            return;
                        }
                        //获取x和y
                        var nx = window.event.clientX;
                        var ny = window.event.clientY;

                        //计算移动后的左偏移量和顶部的偏移量
                        var nl = nx - (x - l);
                        var nt = ny - (y - t);
                        $(`.${name}`)[0].style.left = nl + 'px';
                        $(`.${name}`)[0].style.top = nt + 'px';
                    });
                    $('body')[0].addEventListener('mouseup', function (e) {
                        //开关关闭
                        isDown = false;
                        $('body')[0].style.cursor = 'default';
                    });
                }
            });
        },
        //请求曲线历史值
        axiosHistory(text) {
            var inde
            if (this.ShowtextTo) {
                inde = this.ShowtextTo
            } else {
                inde = 0
            }
            var serDateArr
            if (this.serDate.length != 0) {
                serDateArr = JSON.parse(this.serDate)
            } else {
                serDateArr = this.serDate1
            }
            var data3 = {
                IsProportion: this.Showindex,
                StartTime: this.Sstime,
                EndTime: this.Eetime,
                Series: serDateArr
            }
            //历史查询
            this.$axios({
                method: "post",
                url: "/api/NewTrendChart/QuerySerieHistoryPoints",
                data: data3
            }).then((res) => {
                if (res.data.code !== 0) {
                    this.tipword = res.data.msg;
                    setTimeout(() => {
                        this.tipchange = true;
                        this.move('tip', 'tiphead');
                    });
                    return
                }
                if (res.data.data.length == 0) {
                    for (var k2 = 0; k2 < this.curveLineValue.length; k2++) {
                        this.curveLineValue[k2].data = []
                    }
                    this.Stime = []
                    this.historyTime = []
                    this.drawLine(0);
                }
                if (this.curveLineValue.length != 0) {
                    for (let i = 0; i < res.data.data.length; i++) {
                        if (this.historyValue) {
                            for (var k = 0; k < this.curveLineValue.length; k++) {
                                this.curveLineValue[k].data = []
                            }
                            this.Stime = []
                            this.historyTime = []
                        }
                        this.historyTime.push(res.data.data[i].Time)
                        this.Stime = this.historyTime
                        for (var j = 0; j < this.curveLineValue.length; j++) {
                            if (res.data.data[i].Points[j] != undefined) {
                                this.curveLineValue[j].data.push(res.data.data[i].Points[j].Value)
                                this.historyValue = false
                            }
                        }
                    }
                }
                this.loading1 = false
                this.drawLine(1);
            })
        },

        //请求所有曲线值
        axiosAll(index, text) {
            this.curveArr = []
            this.realArr = []
            this.curveLineType = []
            this.curveLineColor = []
            if (this.curveIDTo[index]) {
                var data = this.curveIDTo[index].GID
            }
            this.$axios({
                method: "post",
                url: "/api/NewTrendChart/QuerySeries?gid=" + data,
                gid: data
            }).then((res) => {
                for (var i = 0; i < res.data.data.length; i++) {
                    this.curveLineName.push(res.data.data[i].Name)
                    this.curveLineColor.push(res.data.data[i].Stroke)
                    var lineType
                    var typename
                    if (res.data.data[i].Type == 1) {
                        typename = this.lang.NewTrendChart_CommonClass_Line
                        lineType = 'line'
                    } else if (res.data.data[i].Type == 2) {
                        typename = this.lang.NewTrendChart_CommonClass_Column
                        lineType = 'bar'
                    } else {
                        typename = this.lang.NewTrendChart_CommonClass_Consult
                        lineType = 'line'
                    }
                    var curveValue = {
                        Number: res.data.data[i].Number,
                        Unit: res.data.data[i].Unit,
                        MaxValue: res.data.data[i].MaxValue,
                        MinValue: res.data.data[i].MinValue,
                        Type: typename,
                        type: res.data.data[i].Type,
                        Description: res.data.data[i].Description,
                        OriginalDescripDescription: res.data.data[i].OriginalDescripDescription,
                        Stroke: res.data.data[i].Stroke,
                        Name: res.data.data[i].Name,
                        DisplayName: res.data.data[i].DisplayName,
                        text: '',
                        Newtext: '',
                        numP: '',
                        num: 0
                    }
                    var realValue = {
                        SID: res.data.data[i].SID,
                        Number: res.data.data[i].Number,
                        TagName: res.data.data[i].TagName,
                        Digit: res.data.data[i].Digit,
                        MaxValue: res.data.data[i].MaxValue,
                        MinValue: res.data.data[i].MinValue,
                        Type: res.data.data[i].Type,
                        Rule: res.data.data[i].Rule,
                        Decimal: res.data.data[i].Decimal,
                        DecimalMaxValue: res.data.data[i].DecimalMaxValue,
                        DecimalMinValue: res.data.data[i].DecimalMinValue,
                    }
                    var Line = {
                        name: res.data.data[i].DisplayName,
                        type: lineType
                    }
                    this.curveLineType.push(Line)
                    this.curveArr.push(curveValue)
                    this.realArr.push(realValue)
                }

                if (text == 1) {
                    this.serDate1 = this.realArr
                    this.axiosReal(this.realArr, 1)
                } else {
                    clearInterval(this.timer);
                    clearInterval(this.time2);
                    this.axiosReal(this.realArr, 1)
                    if (this.$store.state.showTime) {
                        this.time2 = window.setInterval(() => {
                            this.getDate()

                        }, 1000)
                        this.timer = window.setInterval(() => {
                            this.axiosReal(this.realArr, 1)
                        }, 1000)
                    }

                }
            })
        },

        //请求实时值
        axiosReal(data, index) {
            var inde
            if (this.ShowtextTo) {
                inde = this.ShowtextTo
            } else {
                inde = 0
            }
            var serData = JSON.stringify(data)
            var serData1 = data
            var data2 = {
                isProportion: this.Showindex,
                series: serData1
            }
            this.serDate = serData
            this.$axios({
                method: "post",
                url: "/api/NewTrendChart/QuerySerieCurrentPoints",
                data: data2
            }).then((res) => {
                for (var i = 0; i < res.data.data.length; i++) {
                    if (this.lineshow) {
                        this.lineData.push(res.data.data[i].Value)
                        var cruveV = {
                            name: this.curveLineType[i].name,
                            type: this.curveLineType[i].type,
                            barMaxWidth: 25.0,
                            // showBackground: true,
                            data: [],
                            itemStyle: {
                                normal: {
                                    shadowColor: "rgba(85,85,85,0.3)",
                                    shadowBlur: 2,
                                    shadowOffsetX: 2,
                                    color: this.curveLineColor[i],
                                }
                            },
                            symbol: 'none',
                            lineStyle: {
                                normal: {
                                    shadowColor: "rgba(0, 0, 0, 0.3)",
                                    shadowBlur: 20,
                                    shadowOffsetY: 10,
                                    width: 2,
                                    color: this.curveLineColor[i],
                                    height: this.curveLineType[i].type == 'bar' ? '1' : '0'
                                }
                            },
                            // areaStyle: {
                            //     color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            //         offset: 0,
                            //         color: this.curveLineColor[i] + '50'
                            //     }, {
                            //         offset: 1,
                            //         color: this.curveLineColor[i] + '00'
                            //     }])
                            // },
                        }
                        this.curveLineValue.push(cruveV)
                        this.lineData = []
                        if (i == res.data.data.length - 1) {
                            this.lineshow = false
                        }
                    }
                }
                for (var j = 0; j < this.curveLineValue.length; j++) {
                    this.curveLineValue[j].data.push(res.data.data[j].Value)
                    this.NewText = res.data.data[j].Value
                    this.curveArr[j].Newtext = res.data.data[j].Value
                    var sum = 0
                    var pnum = this.curveLineValue[j].data
                    for (var w = 0; w < pnum.length; w++) {
                        sum = sum + parseFloat(pnum[w])
                    }
                    this.curveArr[j].numP = (sum / this.curveLineValue[j].data.length).toFixed(4)
                    this.curveArr[j].text = res.data.data[j].Value
                    //数据校正
                    if (this.curveLineValue[j].data.length > this.currentCache) {
                        this.curveLineValue[j].data = this.curveLineValue[j].data.slice(-this.currentCache)
                    }
                }
                this.drawLine(0);
            })
        },

        //时间格式化
        getTime(dt) {
            var year = dt.getFullYear();        //获取当前月
            var month = dt.getMonth() + 1;
            var mothe = month > 9 ? month : '0' + month            //获取当前日
            var date = dt.getDate();
            var da = date > 9 ? date : '0' + date
            var h = dt.getHours(); //获取当前小时数(0-23)
            var he = h > 9 ? h : '0' + h
            var m = dt.getMinutes(); //获取当前分钟数(0-59)
            var me = m > 9 ? m : '0' + m
            var s = dt.getSeconds();
            var se = s > 9 ? s : '0' + s
            var str = year + '-' + mothe + '-' + da + ' ' + he + ':' + me + ':' + se         //获取当前时间
            return str;
        },
        //点击曲线组
        curveName(index) {
            this.rowData = this.curveIDTo[index]
            this.sx()
            if (this.curveIDTo.length == 0) {
                document.querySelector('.drotext').innerHTML = ''
                this.curveLineColor = ['red', 'blue', 'green']
                this.formatterShow = true
                this.curveLineValue = [{
                    data: [1, 2, 3, 1, 2],
                    type: 'line',
                    itemStyle: {
                        normal: {
                            lineStyle: { color: '#F95858' }
                        }
                    }
                }, {
                    data: [2, 3, 4, 2, 3],
                    type: 'line',
                    itemStyle: {
                        normal: {
                            lineStyle: { color: '#5C5FFB' }
                        }
                    }
                }, {
                    data: [3, 4, 5, 3, 4],
                    type: 'line',
                    itemStyle: {
                        normal: {
                            lineStyle: { color: '#43A145' }
                        }
                    }
                },]
                this.Stime = ['', '', '', '', '']
                this.drawLine(0);
            } else {
                this.formatterShow = false
            }
            if (this.timeShowTo) {
                this.NumS = 0
                if (this.curveIDTo[index]) {
                    this.text = this.curveIDTo[index].Name
                }
                this.CurveNameShow = !this.CurveNameShow
                this.lineshow = true
                this.inpClickShow = true
                this.curveLineValue = []
                this.Stime = []
                clearInterval(this.timer);
                this.drawLine(1);
                this.index = index
                this.axiosAll(index, 0)
            } else {
                this.NumS = 0
                if (this.curveIDTo[index]) {
                    this.text = this.curveIDTo[index].Name
                }
                this.CurveNameShow = !this.CurveNameShow
                this.lineshow = true
                this.inpClickShow = true
                this.curveLineValue = []
                this.Stime = []
                clearInterval(this.timer);
                this.drawLine(1);
                this.index = index
                this.axiosAll(index, 1)
            }
        },
        //勾选显示隐藏echarts折线或柱形
        inpClick(index, e) {

            if (!e.path[0].checked) {
                this.curveLineValue[index].lineStyle.normal.width = 0
                this.curveLineValue[index].symbol = 'none'
                this.curveLineValue[index].type = 'line'
                this.curveLineValue[index].areaStyle = undefined
                this.inpClickShow = !this.inpClickShow
            } else {
                var indd = this.curveLineValue[index].lineStyle.normal.height
                this.curveLineValue[index].lineStyle.normal.width = 2
                this.curveLineValue[index].symbol = 'none'
                this.inpClickShow = !this.inpClickShow
                this.curveLineValue[index].type = indd == '1' ? 'bar' : 'line'

                this.inpClickShow = !this.inpClickShow
            }
            //切换图例的选中状态。
            this.myChart.dispatchAction({
                type: 'legendToggleSelect',
                name: this.curveLineValue[index].name
            })
        },
        //查询
        qeShow() {
            this.$parent.$parent.isPower('', '双窗口查询').then(val => {
                if (val) {
                    this.axiosHistory()
                    this.historyValue = true
                    this.loading1 = true
                } else {
                    this.$parent.$parent.openPopFun()
                }
            })
        },
        // 时间赋值
        getDate2() {
            var myDate = new Date();
            //获取当前年
            var year = myDate.getFullYear();
            //获取当前月
            var month = myDate.getMonth() + 1;
            var mothe = month > 9 ? month : '0' + month
            var date = myDate.getDate();
            var da = date > 9 ? date : '0' + date    //获取当前日
            var h = myDate.getHours(); //获取当前小时数(0-23)
            var he = h > 9 ? h : '0' + h
            var m = myDate.getMinutes(); //获取当前分钟数(0-59)
            var me = m > 9 ? m : '0' + m
            var s = myDate.getSeconds();
            var se = s > 9 ? s : '0' + s
            var now = year + '-' + mothe + '-' + da + ' ' + he + ':' + me + ':' + se     //获取当前时间
            this.Sstime = year + '-' + mothe + '-' + da + ' 00:00:00'
            this.Eetime = year + '-' + mothe + '-' + da + ' ' + he + ':' + me + ':' + se
        },
        // 时间赋值
        getDate() {
            var myDate = new Date();
            var year = myDate.getFullYear();   //获取当前年
            var month = myDate.getMonth() + 1;
            var mothe = month > 9 ? month : '0' + month   //获取当前月
            var date = myDate.getDate();
            var da = date > 9 ? date : '0' + date     //获取当前日
            var h = myDate.getHours(); //获取当前小时数(0-23)
            var he = h > 9 ? h : '0' + h
            var m = myDate.getMinutes(); //获取当前分钟数(0-59)
            var me = m > 9 ? m : '0' + m
            var s = myDate.getSeconds();
            var se = s > 9 ? s : '0' + s
            // "2019-07-15 10:00:00"
            //获取当前时间
            var now = he + ':' + me + ':' + se
            var now1 = year + ' ' + mothe + ' ' + da + ' ' + he + ':' + me + ':' + se          //获取当前时间
            this.Eetime = year + '-' + mothe + '-' + da + ' ' + he + ':' + me + ':' + se
            this.Newtime = year + ' ' + mothe + ' ' + da + ' ' + he + ':' + me + ':' + se
            this.indexTime = this.Stime.indexOf(now)
            if (this.indexTime == -1) {
                this.Stime.push(now)
                this.Newtime = now1
                //坐标校正
                if (this.Stime.length > this.currentCache) {
                    this.Stime = this.Stime.slice(-this.currentCache)
                }
            }
            console.log(" this.Stime", this.Stime);
        },

        // 绘制图表方法
        drawLine(text) {
            // 基于准备好的dom，初始化echarts实例
            if (!this.myChart) this.myChart = this.$echarts.init(this.$refs.tendency)

            if (text == 1) {
                this.myChart.clear()
            }
            let formatter = "{value}"
            if (this.$store.state.Showtext == 1) {
                formatter = "{value}%"
            } else {
                formatter = "{value}"

            }
            let toolbox = {}
            if (!this.$store.state.showTime) {
                toolbox = {
                    feature: {
                        dataZoom: {
                            yAxisIndex: 'none',
                            title: {
                                zoom: this.lang.NewTrendChart_Actions_Zoom,
                                back: this.lang.NewTrendChart_Actions_ZoomReset
                            }
                        },
                        restore: {
                            title: this.lang.NewTrendChart_Actions_Reset
                        },
                    }
                }
            }
            // 绘制图表

            this.myChart.setOption({
                title: {
                    text: '',
                    left: 'center',
                    show: true,
                    textStyle:
                    {
                        color: "#000000",
                        fontSize: "14",
                        fontFamily: "SiYuanHei"
                    }
                },
                tooltip: {
                    trigger: 'axis',
                    confine: true,
                    formatter: this.formatterShow == true ? '{b0}<br /><span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#5087f0;"></span>曲线1:{c0}<br/><span style ="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#7eebfa;"></span>曲线2:{c1}<br/><span style ="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#faeb74;"></span>曲线3:{c2}<br/>' : '',
                    axisPointer: {
                        "lineStyle": {
                            "color": this.color3
                        }
                    },
                },
                legend: {
                    top: '-100%'
                },
                color: this.curveLineColor,
                toolbox: toolbox,
                xAxis: {
                    type: 'category',
                    name: '',
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: this.color5,
                            width: 1, //这里是为了突出显示加上的  
                        }
                    },
                    axisLabel: {
                        formatter: '{value}',
                        textStyle: {
                            fontSize: this.value5,
                            fontFamily: this.value2,
                            fontWeight: this.XFontIsB == true ? 'bold' : ''
                        }
                    },
                    data: this.Stime.length == 0 ? [''] : this.Stime
                    //  data: ['曲线1', '曲线2', '曲线3', '曲线4', '曲线5']
                },
                grid: {
                    left: '4%',
                    right: '9%',
                    bottom: '5%',
                    top: '15%',
                    containLabel: true
                },
                yAxis: {
                    type: 'value',   //position  offset
                    name: '',
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: this.color6,
                            width: 1, //这里是为了突出显示加上的  
                        }
                    },

                    splitLine: {
                        show: true,

                        lineStyle: {
                            type: 'dashed',
                            color: this.color4
                        }
                    },
                    axisLabel: {
                        formatter: formatter,
                        textStyle: {
                            fontSize: this.value6,
                            fontFamily: this.value3,
                            fontWeight: this.YFontIsB == true ? 'bold' : ''
                        }
                    }
                },
                series: this.curveLineValue.map(_ => {
                    return ({ ..._, data: _.data.slice(-this.Stime.length) })
                })
            });

        }
    }
}
</script>
<style lang="scss">
.conterbox2 {
    .colortip {
        background-color: #EFEFF0 !important;
    }

    .el-popper[x-placement^=bottom] {
        max-height: 300px;
        overflow: auto
    }

    .timeLast {
        .el-input__inner {
            height: 30px;
        }
    }

    .el-input__inner {
        border-radius: 0;
    }

    .bottom_fool {
        .el-table th>.cell {
            line-height: 16px;
        }

        .conterbox .timeLast .el-input__inner {
            height: 38px !important;
        }

        .el-table__header-wrapper {
            background: #5A6C98 !important;
        }

        .el-table th {
            background: #5A6C98 !important;
        }

        .el-table thead {
            background: #5A6C98;
            color: #fff;
            height: 50px;
        }
    }

    .el-table td,
    .el-table th.is-leaf {
        border-left: 0.5px solid #fff;
    }

    .el-table th,
    .el-table tr {
        height: 50px;
    }

    .el-table td,
    .el-table th {
        padding: 0;
    }

    .el-table__row:nth-of-type(odd) {
        background: #fff !important;
    }

    .el-table__row:nth-of-type(even) {
        background: #EAEDEE;
    }

    .el-table--scrollable-y .el-table__body-wrapper {
        height: 197px;
    }
}

.inpcheck[type=checkbox] {
    top: 0px;
    left: 0;
    width: 24px;
    height: 22px;
    display: inline-block;
    text-align: center;
    vertical-align: middle;
    line-height: 24px;
    z-index: 11;
    position: relative;
    outline: none;
    -webkit-appearance: none;
    border: 1px solid #B0B0B0;
    border-radius: 4px;
}

.inpcheck[type=checkbox]:after {
    position: absolute;
    width: 24px;
    height: 24px;
    top: -1px;
    left: -1px;
    content: " ";
    display: inline-block;
    visibility: visible;
    text-align: center;
    line-height: 24px;
}

.inpcheck[type=checkbox]:checked:after {
    content: "✓";
    font-size: 14px;
    border: none;
    font-weight: bold;
}

.conter_head {
    .el-button--primary {
        background: #fff;
        color: #000;
    }
}

.conterbox2 {
    .conterbox .conter_head .xl .caret[data-v-c809ffe8] {
        float: right;
        margin-left: 0 !important;
    }

    .timeLast {
        .el-input__inner {
            height: 30px;
        }
    }

    .bottom_fool {
        .cell {
            .el-input {
                width: 95% !important;
            }
        }
    }

    .conter_head {
        .el-button {
            padding: 0 20px !important;
            height: 100%;
        }

        .staTime,
        .endTime {
            .el-input {
                width: 95% !important;
            }
        }

        .el-dropdown {
            width: 100% !important
        }

        .dro {
            width: 100% !important;
            height: 40px;
            padding: 0px !important
        }

        .drotext {
            width: 86% !important
        }
    }
}
</style>

<style lang="scss" scoped>
.conterbox2 {
    width: 100%;
    height: 100%;
    background: #fff;

    .conter_head {
        width: 100%;
        height: 70px;
        padding: 15px 2.5%;
        display: flex;

        .xl {
            float: left;
            margin-right: 1%;
            width: 20%;

            .dro {
                width: 200px;
                border-color: #ddd;
                line-height: 40px;

                .drotext {
                    width: 142px;
                    display: inline-block;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                }

                .caret {
                    float: right;
                    margin: 0;
                    line-height: inherit;
                }
            }
        }

        .staTime {
            float: left;
            margin-right: 2%;
            width: 30%
        }

        .endTime {
            float: left;
            margin-right: 2%;
            width: 30%
        }

        .bottom {
            float: left;

            .conButton {
                color: #fff;
                background: #4270E4;
            }
        }
    }

    .conter_echart {
        width: 100%;
        overflow: hidden;
        height: 427px;

        .echarts {
            width: 100%;
            height: 100%;
            margin: 0 auto;
            background: #EEF4F6;
        }
    }

    .bottom_fool {
        width: 100%;
        flex: 1;
        background: #E0E8F3;
        margin-top: 20px;
        padding: 10px;

        .fool {
            width: 98%;
            height: 90%;
            margin: 0 auto;
            background: #fff;
            overflow: auto;

            .fool_top {
                width: 100%;
                height: 40px;
                overflow: hidden;
                color: #fff;

                .fool_li {
                    float: left;
                }

                .name {
                    width: 18%;
                    height: 40px;
                    text-align: center;
                    line-height: 40px;
                    background: #5A6D98;
                }

                .id {
                    width: 5%;
                    height: 40px;
                    text-align: center;
                    line-height: 40px;
                    background: #5A6D98;
                }

                .de {
                    width: 22%;
                    height: 40px;
                    text-align: center;
                    line-height: 40px;
                    background: #5A6D98;
                }

                .dw {
                    width: 8%;
                    height: 40px;
                    text-align: center;
                    line-height: 40px;
                    background: #5A6D98;
                }

                .type {
                    width: 8%;
                    height: 40px;
                    text-align: center;
                    line-height: 40px;
                    background: #5A6D98;
                }

                .mean {
                    width: 8%;
                    height: 40px;
                    text-align: center;
                    line-height: 40px;
                    background: #5A6D98;
                }

                .max {
                    width: 8%;
                    height: 40px;
                    text-align: center;
                    line-height: 40px;
                    background: #5A6D98;
                }

                .min {
                    width: 8%;
                    height: 40px;
                    text-align: center;
                    line-height: 40px;
                    background: #5A6D98;
                }

                .time {
                    width: 15%;
                    height: 40px;
                    text-align: center;
                    line-height: 40px;
                    background: #5A6D98;

                    .timeLast {
                        width: 106px;
                        height: 30px;
                    }

                }
            }

            .fool_conter {
                width: 100%;
                height: 40px;
                overflow: hidden;
                background: #E8EEEE;
                border-bottom: 1px solid #D2D4D4;

                .fool_li {
                    float: left;
                }

                .name1 {
                    width: 18%;
                    height: 40px;
                    text-align: center;
                    line-height: 40px;
                    font-size: 13px;

                    .name1text {
                        display: inline-block;
                        width: 82%;
                        height: 100%;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        font-size: 13px;
                    }

                    .inpcheck {
                        float: left;
                    }

                    input[type="checkbox"] {
                        margin: 9px 0;
                        top: -1px;
                        left: 0;
                        width: 24px;
                        height: 24px;
                        display: inline-block;
                        text-align: center;
                        vertical-align: middle;
                        line-height: 24px;
                        z-index: 11;
                        position: relative;
                        outline: none;
                        -webkit-appearance: none;
                        border: 1px solid #B0B0B0;
                        color: #fff;
                    }

                    input[type=checkbox]:after {
                        position: absolute;
                        width: 24px;
                        height: 24px;
                        top: -1px;
                        left: -1px;
                        content: " ";
                        display: inline-block;
                        visibility: visible;
                        text-align: center;
                        line-height: 24px;
                    }

                    input[type=checkbox]:checked:after {
                        content: "✓";
                        font-size: 14px;
                        border: none;
                        font-weight: bold;
                        color: #000;
                    }
                }

                .id1 {
                    width: 5%;
                    height: 40px;
                    text-align: center;
                    line-height: 40px;
                }

                .de1 {
                    width: 22%;
                    height: 40px;
                    text-align: center;
                    line-height: 40px;
                }

                .dw1 {
                    width: 8%;
                    height: 40px;
                    text-align: center;
                    line-height: 40px;
                }

                .type1 {
                    width: 8%;
                    height: 40px;
                    text-align: center;
                    line-height: 40px;
                }

                .mean1 {
                    width: 8%;
                    height: 40px;
                    text-align: center;
                    line-height: 40px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }

                .max1 {
                    width: 8%;
                    height: 40px;
                    text-align: center;
                    line-height: 40px;
                }

                .min1 {
                    width: 8%;
                    height: 40px;
                    text-align: center;
                    line-height: 40px;
                }

                .time1 {
                    width: 13%;
                    height: 40px;
                    text-align: center;
                    line-height: 40px;
                }
            }
        }
    }
}

#qscxcharttwo {
    position: absolute !important;
    top: 0;
    bottom: 0;
    margin: auto;
    transform-origin: 0;
}

.tip {
    position: fixed;
    width: 380px;
    height: 200px;
    z-index: 30999999;
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

    .tipcontanin {
        height: calc(100% - 40px);
    }

    .tipword {
        width: 100%;
        height: 75%;
        padding: 0 20px;
        display: flex;
        // text-align: center;
        justify-content: center;
        align-items: center;
    }

    .tipdetermine {
        color: #ea9328;
        cursor: pointer;
        width: 310px;
        line-height: 30px;
        text-align: center;
        // margin-top: 40px;
        position: absolute;
        bottom: 13px;
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

.conterbox2 {
    position: relative;

    .conterbox2load {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
    }
}
</style>
