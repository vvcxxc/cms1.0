<!--
 * @Description: 这是多窗口页面（组件）
 * @Date: 2019-11-19 13:51:38
 * @Author: Tao
 * @LastEditors: Tao
 * @LastEditTime: 2021-01-30 13:35:38
 TODO:重构
 -->
<template>
    <div class="conterbox">
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
            zoom: zoom1
        }">
            <div class="xl" :style="{ width: 20 * zoom + '%!important' }">
                <el-dropdown class="dro" trigger="click"
                    :style="{ height: 40 * zoom + 'px', lineHeight: 40 * zoom + 'px' }">
                    <el-button class="dro" type="primary">
                        <span class="drotext">{{ text }}</span><i class="el-icon-caret-bottom el-icon--right caret"></i>
                    </el-button>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item @click.native="curveName(index)" v-for="(item, index) in curveIDTo" :key="index">
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
            <div @click="jumpFun()" class="JumpPage" :style="{ height: 40 * zoom + 'px' }"></div>
        </div>
        <div class="conter_echart" :style="{ zoom: zoom1 }">
            <div class="paging">
                <div @click="pagingright" class="el-icon-caret-left"></div>
                <div @click="pagingleft" class="el-icon-caret-right"></div>
            </div>
            <div :style="{ height: '100%', position: 'relative' }">
                <div class="echarts"
                    :style="{ width: 100 / zoom1 + '%', 'background': color2, height: 100 / zoom1 + '%', zoom: 1 / zoom1, transform: 'scale(' + zoom1 + ')' }"
                    ref="tendency" :id='id'></div>
            </div>

        </div>
    </div>
</template>
<script>
export default {
    name: 'tendenConter3',
    props: ['showTime', "timeShowTo", "curveIDTo", "ShowtextTo", "ide", "child2Show", "id"],
    data() {
        return {
            gth: require('../../../assets/images/gth.png'),
            tipword: '',
            tipchange: false,
            selected: '',
            value3: '',
            Sstime: '',
            Eetime: '',
            text: '',
            curveArr: [],
            curvearrValue: [],
            realArr: [],
            curveLine: [],
            curveLineName: [],
            curveLineName2: [],
            curveLineColor: [],
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
            paginMin: 0,
            paginMax: 3,
            historyShow: false,
            loading1: false,
            formatterValue: '{value}',
            color2: '#000',
            myChart: '',
            curveID: '', // 曲线id
            curveIndex: '',//曲线id索引
            zoom: 1,
            zoom1: 1,
            lang: JSON.parse(localStorage.getItem('languages'))[localStorage.getItem('currentLang')],
            rowData: '',
            currentCache: 30,
            refreshTime: 1000,
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
                    }, this.refreshTime)
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
                    this.drawLine(0)
                }
            }
        },
        curveIDTo(n, o) {
            this.curveName(this.ide)
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
        ShowtextTo(n, o) {
            if (this.RealShow) {
                if (n == 1) {
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
        //历史
        timeShowTo(n, o) {
            if (n) {
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
                if (this.ide == 0) {
                    localStorage.setItem("a", JSON.stringify(this.curveLineValue))
                    localStorage.setItem("time", JSON.stringify(this.Stime))
                }
                if (this.ide == 1) {
                    localStorage.setItem("b", JSON.stringify(this.curveLineValue))
                    localStorage.setItem("time", JSON.stringify(this.Stime))
                }
                if (this.ide == 2) {
                    localStorage.setItem("c", JSON.stringify(this.curveLineValue))
                    localStorage.setItem("time", JSON.stringify(this.Stime))
                }
                if (this.ide == 3) {
                    localStorage.setItem("d", JSON.stringify(this.curveLineValue))
                    localStorage.setItem("time", JSON.stringify(this.Stime))
                }
            }
        }
    },
    created() {
        this.getCacheTime()
        this.getDate2()
        this.axiosSet()
    },
    mounted() {
        var id = this.ide
        this.curveName(id)
        this.time2Fun()
        //图表自适应大小
        // this.$nextTick(()=>{
        //     window.onresize = ()=> {
        //         if(this.myChart){
        //             this.myChart.resize()
        //         }
        //     }
        // })
        this.zoom1 = window.screen.width / 1920 < 0.8 ? 0.8 : window.screen.width / 1920
        this.zoom = 1
        setTimeout(() => {
            $(".el-button--primary,.el-input__inner").css({ lineHeight: 40 * this.zoom + 'px', height: 40 * this.zoom + 'px', fontSize: 14 * this.zoom + 'px' })
        })
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
    methods: {
        sx() {

            let that = this
            setTimeout(() => {
                for (let i = 0; i < $('.el-picker-panel').length; i++) {
                    $('.el-picker-panel')[i].style.zoom = that.zoom
                }
                for (let i = 0; i < $('.el-select-dropdown').length; i++) {
                    $('.el-select-dropdown')[i].style.zoom = that.zoom1
                }
                for (let i = 0; i < $('.el-dropdown-menu ').length; i++) {
                    $('.el-dropdown-menu ')[i].style.zoom = that.zoom1
                }
            })

        },
        //父组件调用
        huanyuan() {
            this.$nextTick(function () {
                if (this.$refs.tendency) {
                    var numdata
                    var numtime
                    if (this.ide == 0) {
                        window.setTimeout(() => {
                            numdata = localStorage.getItem("a")
                            numtime = localStorage.getItem("time")
                            this.curveLineValue = JSON.parse(numdata)
                            this.Stime = JSON.parse(numtime)
                            this.drawLine(0);
                        }, 1000)
                    }
                    if (this.ide == 1) {
                        window.setTimeout(() => {
                            numdata = localStorage.getItem("b")
                            numtime = localStorage.getItem("time")
                            this.curveLineValue = JSON.parse(numdata)
                            this.Stime = JSON.parse(numtime)
                            this.drawLine(0);
                        }, 1000)
                    }
                    if (this.ide == 2) {
                        window.setTimeout(() => {
                            numdata = localStorage.getItem("c")
                            numtime = localStorage.getItem("time")
                            this.curveLineValue = JSON.parse(numdata)
                            this.Stime = JSON.parse(numtime)
                            this.drawLine(0);
                        }, 1000)
                    }
                    if (this.ide == 3) {
                        window.setTimeout(() => {
                            numdata = localStorage.getItem("d")
                            numtime = localStorage.getItem("time")
                            this.curveLineValue = JSON.parse(numdata)
                            this.Stime = JSON.parse(numtime)
                            this.drawLine(0);
                        }, 1000)
                    }
                }
            })
        },
        echartsResize() {
            if (this.myChart) {
                this.myChart.resize()
            }
        },
        //跳转单窗口
        jumpFun() {
            this.$parent.$parent.windowClick(this.lang.NewTrendChart_NewTrendChartUserControl_Single, this.curveIndex, this.Sstime, this.Eetime)

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
        //历史向前一天
        pagingleft() {
            var curLength = this.curveLineName.length
            if (Number(curLength) >= 4) {
                if (Number(curLength) > Number(this.paginMax)) {
                    this.paginMin = this.paginMin + 3
                    this.paginMax = this.paginMax + 3
                    this.curveLineName2 = this.curveLineName.slice(Number(this.paginMin), Number(this.paginMax))
                    this.drawLine(0);
                }
            }
        },
        //历史向后一天
        pagingright() {
            var curLength = this.curveLineName.length
            if (Number(this.paginMin) >= 3) {
                this.paginMin = this.paginMin - 3
                this.paginMax = this.paginMax - 3
                this.curveLineName2 = this.curveLineName.slice(Number(this.paginMin), Number(this.paginMax))
                this.drawLine(0);
            }
        },
        //开启实时
        time2Fun() {
            if (this.timeShowTo) {
                this.etDate2()
                clearInterval(this.time2);
                this.time2 = window.setInterval(() => {
                    this.getDate()
                }, 1000)
            }
        },
        tip1() {
            this.tipchange = false;
            this.loading1 = false
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
        //请求曲线历史值
        axiosHistory() {
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
            //  历史查询
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

                    this.drawLine(0);
                }
                for (var i = 0; i < res.data.data.length; i++) {
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
                        this.curveLineValue[j].data.push(res.data.data[i].Points[j].Value)
                        this.historyValue = false
                    }
                }
                this.drawLine(0);
                this.loading1 = false
            })
        },

        //请求所有曲线值
        axiosAll(index, text) {
            this.curveArr = []
            this.realArr = []
            this.curveLineType = []
            this.curveLineColor = []
            this.curveLineName = []
            this.curveID = ''
            this.curveIndex = index
            if (this.curveIDTo.length) {
                var data = this.curveIDTo[index].GID
                this.curveID = this.curveIDTo[index].GID
            }
            this.$axios({
                method: "post",
                url: "/api/NewTrendChart/QuerySeries?gid=" + data,
                gid: data
            }).then((res) => {
                this.Stime = []
                var curveLength = 0
                for (var i = 0; i < res.data.data.length; i++) {

                    this.curveLineName.push(res.data.data[i].DisplayName)
                    this.curveLineName2 = this.curveLineName
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
                        Stroke: res.data.data[i].Stroke,
                        DisplayName: res.data.data[i].DisplayName
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
                    this.time2 = window.setInterval(() => {
                        this.getDate()
                    }, 1000)

                    this.timer = window.setInterval(() => {
                        this.axiosReal(this.realArr, 1)
                    }, 1000)
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
            this.serDate = serData
            var data2 = {
                isProportion: this.Showindex,
                series: serData1
            }
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
                            data: [],
                            symbol: 'none',
                            // showBackground: true,
                            lineStyle: {
                                normal: {
                                    shadowColor: "rgba(0, 0, 0, 0.3)",
                                    shadowBlur: 20,
                                    shadowOffsetY: 10,
                                    width: 2,
                                    color: this.curveLineColor[i]
                                }
                            },
                            barMaxWidth: 25.0,
                            itemStyle: {
                                normal: {
                                    shadowColor: "rgba(85,85,85,0.3)",
                                    shadowBlur: 2,
                                    shadowOffsetX: 2,
                                    color: this.curveLineColor[i],
                                }
                            },
                        }
                        this.curveLineValue.push(cruveV)
                        this.drawLine(0);
                        this.lineData = []
                        if (i == res.data.data.length - 1) {
                            this.lineshow = false
                        }
                    }
                }
                for (var j = 0; j < this.curveLineValue.length; j++) {
                    this.curveLineValue[j].data.push(res.data.data[j].Value)
                    //数据校正
                    if (this.curveLineValue[j].data.length > this.currentCache) {
                        this.curveLineValue[j].data = this.curveLineValue[j].data.slice(-this.currentCache)
                    }
                }
                this.drawLine(0);
            })
        },
        //选择曲线组
        curveName(index) {
            this.rowData = this.curveIDTo[index]
            if (this.curveIDTo.length == 0) {
                document.querySelector('.drotext').innerHTML = ''
                this.curveIDTo = this.curveIDTo
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
                this.Stime = []
                this.drawLine(0);
            } else {
                this.formatterShow = false
            }

            if (this.timeShowTo) {
                if (this.curveIDTo.length) {
                    this.text = this.curveIDTo[index].Name
                }
                this.CurveNameShow = !this.CurveNameShow
                this.lineshow = true
                this.curveLineValue = []
                this.Stime = []
                clearInterval(this.timer);
                clearInterval(this.time2);
                this.drawLine(1);
                this.index = index
                this.axiosAll(index, 0)
            } else {
                if (this.curveIDTo.length) {
                    this.text = this.curveIDTo[index].Name
                }
                this.CurveNameShow = !this.CurveNameShow
                this.lineshow = true
                this.curveLineValue = []
                this.Stime = []
                clearInterval(this.timer);
                clearInterval(this.time2);
                this.drawLine(1);
                this.index = index
                this.axiosAll(index, 1)
            }
            this.myChart = this.$echarts.init(this.$refs.tendency)
            let a = this.myChart.getOption()
            if (a) {
                if (a.legend[0].selected) {
                    a.legend[0].selected = ''
                    this.myChart.setOption(a)
                }
            }
        },
        //查询
        qeShow() {
            this.myChart = this.$echarts.init(this.$refs.tendency)
            let a = this.myChart.getOption()
            if (a) {
                if (a.legend[0].selected) {
                    a.legend[0].selected = ''
                    this.myChart.setOption(a)
                }
            }
            this.$parent.$parent.isPower('', '多窗口查询').then(val => {
                if (val) {
                    this.axiosHistory()
                    this.historyValue = true
                    this.loading1 = true
                } else {
                    this.$parent.$parent.openPopFun()
                }
            })
        },

        etDate2() {
            var myDate = new Date();
            var year = myDate.getFullYear();   //获取当前年
            var month = myDate.getMonth() + 1;
            var mothe = month > 9 ? month : '0' + month  //获取当前月
            var date = myDate.getDate();
            var da = date > 9 ? date : '0' + date  //获取当前日
            var h = myDate.getHours(); //获取当前小时数(0-23)
            var he = h > 9 ? h : '0' + h
            var m = myDate.getMinutes(); //获取当前分钟数(0-59)
            var me = m > 9 ? m : '0' + m
            var s = myDate.getSeconds();
            var se = s > 9 ? s : '0' + s
            var now = year + '-' + mothe + '-' + da + ' ' + he + ':' + me + ':' + se    //获取当前时间
            this.Sstime = year + '-' + mothe + '-' + da + ' 00:00:00'
        },

        getDate2() {
            var myDate = new Date();
            var year = myDate.getFullYear();   //获取当前年
            var month = myDate.getMonth() + 1;
            var mothe = month > 9 ? month : '0' + month   //获取当前月
            var date = myDate.getDate();
            var da = date > 9 ? date : '0' + date   //获取当前日
            var h = myDate.getHours(); //获取当前小时数(0-23)
            var he = h > 9 ? h : '0' + h
            var m = myDate.getMinutes(); //获取当前分钟数(0-59)
            var me = m > 9 ? m : '0' + m
            var s = myDate.getSeconds();
            var se = s > 9 ? s : '0' + s
            var now = year + '-' + mothe + '-' + da + ' ' + he + ':' + me + ':' + se  //获取当前时间
            this.Sstime = year + '-' + mothe + '-' + da + ' 00:00:00'
            this.Eetime = year + '-' + mothe + '-' + da + ' ' + he + ':' + me + ':' + se
        },
        getDate(num = 30) {
            var myDate = new Date();
            var year = myDate.getFullYear();  //获取当前年
            var month = myDate.getMonth() + 1;
            var mothe = month > 9 ? month : '0' + month   //获取当前月
            var date = myDate.getDate();
            var da = date > 9 ? date : '0' + date   //获取当前日
            var h = myDate.getHours(); //获取当前小时数(0-23)
            var he = h > 9 ? h : '0' + h
            var m = myDate.getMinutes(); //获取当前分钟数(0-59)
            var me = m > 9 ? m : '0' + m
            var s = myDate.getSeconds();
            var se = s > 9 ? s : '0' + s
            var now = he + ':' + me + ':' + se //获取当前时间
            this.Eetime = year + '-' + mothe + '-' + da + ' ' + he + ':' + me + ':' + se
            this.indexTime = this.Stime.indexOf(now)
            if (this.indexTime == -1) {
                this.Stime.push(now)
                //坐标校正
                if (this.Stime.length > this.currentCache) {
                    this.Stime = this.Stime.slice(-this.currentCache)
                }
            }
        },
        // 绘制图表方法
        drawLine(text) {

            // 基于准备好的dom，初始化echarts实例
            this.myChart = this.$echarts.init(this.$refs.tendency)
            let a = this.myChart.getOption()
            if (a && a.legend && a.legend.length) {
                if (a.legend[0].selected) {
                    this.selected = a.legend[0].selected
                } else {
                    let object = {}
                    a.legend[0].data.forEach((item) => {
                        object[item] = true
                    })
                    this.selected = object
                }
            }

            this.myChart.on('legendselectchanged', (obj) => {
                let a = this.myChart.getOption()
                a.legend[0].selected = obj;

            })
            if (text == 1) {
                this.myChart.clear()
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
            let formatter = "{value}"
            if (this.$store.state.Showtext == 1) {
                formatter = "{value}%"
            } else {
                formatter = "{value}"

            }
            // 绘制图表

            this.myChart.setOption({
                title: {
                    text: '',
                    left: 'center',
                    show: true,
                    textStyle: {
                        color: "#000000",
                        fontSize: "14",
                        fontFamily: "SiYuanHei"
                    }
                },
                tooltip: {
                    trigger: 'axis',
                    confine: true,
                    formatter: this.formatterShow == true ? '{b0}<br /><span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#5087f0;"></span>曲线1:{c0}<br/><span style ="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#7eebfa;"></span>曲线2:{c1}<br/><span style ="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#faeb74;"></span>曲线3:{c2}<br/>' : '',
                    "axisPointer": {
                        "lineStyle": {
                            "color": this.color3
                        }
                    },
                },
                color: this.curveLineColor,
                legend: {
                    right: 40,
                    y: '23px',
                    selected: this.selected,
                    data: this.curveLineName2.slice(0, 3)
                },
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
                },
                grid: {
                    left: '4%',
                    right: '9%',
                    bottom: '20',
                    top: '20%',
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
                series: this.curveLineValue.map(_ => ({ ..._, data: _.data.slice(-this.Stime.length) }))
            });

        }
    }
}
</script>

<style lang="scss">
.el-dropdown-menu {
    max-height: 300px;
    overflow: auto
}

.conterbox {
    .colortip {
        background-color: #EFEFF0 !important;
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

        .dro {
            width: 100% !important;
            height: 40px;
            padding: 0px !important;
            line-height: 40px;
        }

        .drotext {
            width: 86% !important
        }
    }
}
</style>

<style lang="scss" scoped>
.conterbox {
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

                .drotext {
                    width: 142px;
                    display: inline-block;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                }
            }

            .caret {
                float: right;
                margin: 0;
                line-height: inherit;
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

        .JumpPage {
            float: left;
            width: 32px;
            height: 40px;
            margin-left: 2%;
            background: url('../../../assets/images/enlarge.png');
            background-size: cover;
            cursor: pointer;
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
        overflow: hidden;
        position: relative;
        width: 100%;
        flex: 1;
        height: calc(100% - 70px);

        .paging {
            position: absolute;
            top: 22px;
            right: 0;
            z-index: 9;

        }

        .echarts {
            width: 100%;
            height: 95%;
            background: #EEF4F6;
        }
    }
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

.conterbox {
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
