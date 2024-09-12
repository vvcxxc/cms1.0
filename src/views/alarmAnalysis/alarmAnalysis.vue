<!--
 * @description: 报警统计页面
 * @since: 2019-11-08 15:00:48
 * @Author: jawnwa22
 * @LastEditors: jawnwa22
 * @LastEditTime: 2019-11-11 10:13:58
 -->
<template>
    <div class="tapwater" v-loading="this.$store.state.isShow">
        <div class="linebox" :class="{ colordiv: $store.state.color == 'grey' }">
            <div class="table">
                <div class="fll" v-show="!tableData.curId">

                    <span>{{ lang.AlarmStatistics_AlarmStatisticsUserControl_StartTime }}</span>
                    <div class="block">
                        <el-date-picker v-model="value1" type="datetime"
                            :placeholder="lang.SCMSConsoleWebApiMySql_PleChooseDate" value-format="yyyy-MM-dd HH:mm:ss"
                            :style="[{ height: 40 * 1 + 'px' }, { marginLeft: 16 + 'px' }, { width: 250 * 1 + 'px' }]"></el-date-picker>
                    </div>
                    <span>{{ lang.AlarmStatistics_AlarmStatisticsUserControl_EndTime }}</span>
                    <div class="block">
                        <el-date-picker v-model="value2" type="datetime"
                            :placeholder="lang.SCMSConsoleWebApiMySql_PleChooseDate" value-format="yyyy-MM-dd HH:mm:ss"
                            :style="[{ height: 40 * 1 + 'px' }, { marginLeft: 16 + 'px' }, { width: 250 * 1 + 'px' }]"></el-date-picker>
                    </div>
                </div>
                <div class="query" @click="tablename" v-show="!tableData.curId" :id="cxid"
                    :style="[{ lineHeight: 36 * 1 < 36 ? 36 + 'px' : 36 * 1 + 'px' }, { height: 40 * 1 + 'px' }, { fontSize: 16 * 1 + 'px' }, { width: 120 * 1 + 'px' }]">
                    {{ lang.AlarmStatistics_AlarmStatisticsUserControl_Query }}</div>
                <div class="fr">
                    <div class="export" @click="saveImage" :id="dcid"
                        :style="[{ lineHeight: 40 * 1 + 'px' }, { height: 40 * 1 + 'px' }, { fontSize: 16 * 1 + 'px' }, { width: 120 * 1 + 'px' }]">
                        {{ lang.AlarmStatistics_AlarmStatisticsUserControl_Export }}</div>

                    <div class="query" @click="back" v-show="tableData.curId"
                        :style="[{ lineHeight: 36 * 1 + 'px' }, { height: 40 * 1 + 'px' }, { fontSize: 16 * 1 + 'px' }, { width: 120 * 1 + 'px' }]">
                        {{ lang.AlarmStatistics_AlarmStatisticsUserControl_Back }}</div>

                </div>
            </div>


            <div class="alarm-page" ref="alarmPage">
                <div class="charts">
                    <div class="mychart" id="mychart" ref="mychart"></div>
                </div>

                <div class="table-r">
                    <table cellspacing="0" cellpadding="1">
                        <!-- 头部 -->
                        <thead v-if="!tableData.curId">
                            <tr>
                                <th>{{ ZHObj.rowTitleDevice }}</th>
                                <th v-for="item in tableData.tableList" :key="item.Name + 'Name'">
                                    {{ item.Name }}</th>
                            </tr>
                        </thead>
                        <thead v-else>
                            <tr>
                                <th>{{ ZHObj.subTableRowTitleAlarmType }}</th>
                                <th v-for="item in tableData.curIdList" :key="item.Name + 'Name2'">
                                    {{ item.Name }}</th>
                            </tr>
                        </thead>
                        <!-- 表体 -->
                        <tbody v-if="!tableData.curId">
                            <tr>
                                <td>{{ ZHObj.rowTitleCon }}</td>
                                <td v-for="item in tableData.tableList" :key="item.Name + 'rowTitleCon'">
                                    {{ item.Con }}</td>
                            </tr>
                            <tr>
                                <td>{{ ZHObj.rowTitlePer }}</td>
                                <td v-for="item in tableData.tableList" :key="item.Name + 'rowTitlePer'">
                                    {{ (item.Per * 100).toFixed(1) }}
                                </td>
                            </tr>
                            <tr>
                                <td>{{ ZHObj.rowTitleSumPer }}</td>
                                <td v-for="item in tableData.tableList" :key="item.Name + 'rowTitleSumPer'">
                                    {{ (item.SumPer * 100).toFixed(1) }}</td>
                            </tr>
                        </tbody>
                        <tbody v-else>
                            <tr>
                                <td>{{ ZHObj.rowTitleCon }}</td>
                                <td v-for="item in tableData.curIdList" :key="item.Name + 'rowTitleCon2'">
                                    {{ item.Con }}</td>
                            </tr>
                            <tr>
                                <td>{{ ZHObj.rowTitlePer }}</td>
                                <td v-for="item in tableData.curIdList" :key="item.Name + 'rowTitlePer2'">
                                    {{ (item.Per * 100).toFixed(1) }}
                                </td>
                            </tr>
                            <tr>
                                <td>{{ ZHObj.rowTitleSumPer }}</td>
                                <td v-for="item in tableData.curIdList" :key="item.Name + 'rowTitleSumPer2'">
                                    {{ (item.SumPer * 100).toFixed(1) }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
        <div class="tip" ref="kongtiao3" v-if="tipchange1">
            <div class="tiptop">
                <img :src="gth" alt />
                <span>{{ lang.HT_MessageBoxCaption_Tips }}</span>
            </div>
            <div class="tipcontanin">
                <div class="w">{{ w }}</div>
                <div class="tipdetermine" @click="tip2">{{ lang.MessageBox_Confrim }}</div>
            </div>
        </div>
        <div class="cover3" v-if="tipchange1"></div>
    </div>
</template>

<script>
// vue文件中引入echarts工具
let echarts = require('echarts/lib/echarts');
import html2canvas from 'html2canvas';
require('echarts/lib/chart/line');
// 以下的组件按需引入
require('echarts/lib/component/tooltip'); // tooltip组件
require('echarts/lib/component/title'); //  title组件
require('echarts/lib/component/legend'); // legend组件
export default {
    name: 'tapwater',
    data() {
        return {
            jurisdiction: [],
            buttonarr: [],
            cxid: "",
            dcid: '',
            cxshow: true,
            dcshow: true,
            ZHObj: {
                chartTitle: '设备报警统计',
                subChartTitle: '设备报警类型统计',
                rowTitleDevice: '设备',
                rowTitleCon: '数量',
                rowTitlePer: '百分比',
                rowTitleSumPer: '累计百分比',
                subTableRowTitleAlarmType: '报警类型',
            },

            tipchange1: false,
            tip: 'noData',
            w: '',
            gth: require('../../assets/images/gth.png'),
            value1: new Date(new Date().toLocaleDateString()),
            value2: new Date(
                new Date(new Date().toLocaleDateString()).getTime() +
                24 * 60 * 60 * 1000 -
                1
            ),
            lang: JSON.parse(localStorage.getItem('languages'))[localStorage.getItem('currentLang')],
            tableData: {
                tableList: [],
                curId: '',
                curIdList: ''
            }


        };
    },

    created() {
        this.getZHObj()
        this.jurisdiction = this.$store.state.btnPowerData
        this.buttonarr = this.findPathByLeafId(this.GetUrlParam('id'), this.jurisdiction)[0].Children
        this.buttonarr.forEach((item) => {
            if (item.RightName == "查询按钮") {
                this.cxid = item.RightID
            } else if (item.RightName == "导出按钮") {
                this.dcid = item.RightID
            }
        })
        var userid = ''
        if (!JSON.parse(sessionStorage.getItem('userInfo1'))) {
            userid = JSON.parse(
                sessionStorage.getItem('sightseerInfo1')
            ).SCMSUserID;
        } else {
            userid = JSON.parse(
                sessionStorage.getItem('userInfo1')
            ).SCMSUserID;
        }
        this.$axios({
            method: 'post',
            url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.cxid}`,
        }).then(res => {
            this.cxshow = res.data.data

        }).catch((err) => {
            console.log('err', err)
        })
        this.$axios({
            method: 'post',
            url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.dcid}`,
        }).then(res => {
            this.dcshow = res.data.data

        }).catch((err) => {
            console.log('err', err)
        })
    },
    computed: {
        VpowerData() {
            return this.$store.state.btnPowerData;
        },
    },
    mounted() {
        this.value1 = this.GMTToStr(this.value1);
        this.value2 = this.GMTToStr(this.value2);
        if (this.cxshow) {
            this.tablename();
        }

        $(window).bind("resize",
            function () {
                let myChart = this.$echarts.init(document.getElementById('mychart'));
                console.log("myChart99")
                myChart.resize()
            }
        );
    },
    watch: {

        VpowerData(val) {
            this.jurisdiction = this.$store.state.btnPowerData
            this.buttonarr = this.findPathByLeafId(this.GetUrlParam('id'), this.jurisdiction)[0].Children
            this.buttonarr.forEach((item) => {
                if (item.RightName == "查询按钮") {
                    this.cxid = item.RightID
                } else if (item.RightName == "导出按钮") {
                    this.dcid = item.RightID
                }
            })
            var userid = ''
            if (!JSON.parse(sessionStorage.getItem('userInfo1'))) {
                userid = JSON.parse(
                    sessionStorage.getItem('sightseerInfo1')
                ).SCMSUserID;
            } else {
                userid = JSON.parse(
                    sessionStorage.getItem('userInfo1')
                ).SCMSUserID;
            }
            this.$axios({
                method: 'post',
                url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.cxid}`,
            }).then(res => {
                this.cxshow = res.data.data

            }).catch((err) => {
                console.log('err', err)
            })
            this.$axios({
                method: 'post',
                url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.dcid}`,
            }).then(res => {
                this.dcshow = res.data.data

            }).catch((err) => {
                console.log('err', err)
            })
        }
    },
    methods: {
        getZHObj() {
            this.ZHObj = {
                chartTitle: this.lang.AlarmStatistics_chartitle,
                subChartTitle: this.lang.AlarmStatistics_subcharttitle,
                rowTitleDevice: this.lang.AlarmStatistics_tablecell0,
                rowTitleCon: this.lang.AlarmStatistics_tablecell1,
                rowTitlePer: this.lang.AlarmStatistics_tablecell2,
                rowTitleSumPer: this.lang.AlarmStatistics_tablecell3,
                subTableRowTitleAlarmType: this.lang.AlarmStatistics_subtablecell0,
            }
        },
        move(name, namehead) {
            //  $(`.${name}`).addClass('center')
            let left = ($(`.${name}`).width()) / 2 + 'px'
            let top = ($(`.${name}`).height()) / 2 + 'px'
            $(`.${name}`)[0].style.left = `calc(50% - ${left})`;
            $(`.${name}`)[0].style.top = `calc(50% - ${top})`;
            $(`.${name}`)[0].addEventListener('mousedown', function (e) {

                console.log(e.target.className.toLocaleLowerCase());
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
                        console.log(nx)
                        console.log(x)
                        console.log(l)
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
        findPathByLeafId(id, node, path) {
            if (!path) {
                path = []
            }
            for (let i = 0; i < node.length; i++) {
                var temPath = path.concat();

                if (id == node[i].RightID) {
                    temPath.push(node[i])
                    return temPath
                }
                if (node[i].Children) {
                    var findResult = this.findPathByLeafId(id, node[i].Children, temPath)
                    if (findResult) {
                        return findResult
                    }
                }
            }
        },
        GetUrlParam(paraName) {
            let url = document.location.toString();
            let arrObj = url.split("?");
            if (arrObj.length > 1) {
                let arrPara = arrObj[1].split("&");
                let arr;
                for (let i = 0; i < arrPara.length; i++) {
                    arr = arrPara[i].split("=");
                    if (arr && arr[0] == paraName) {

                        return arr[1]
                    }
                }
                return ''
            } else {
                return ''
            }
        },

        tip2() {
            if (this.w == this.lang.SCMSConsoleWebApiMySql_TimeFormatIsIncorrect) {
                this.value1 = new Date(new Date().toLocaleDateString());
                this.value2 = new Date(
                    new Date(new Date().toLocaleDateString()).getTime() +
                    24 * 60 * 60 * 1000 -
                    1
                );
                this.value1 = this.GMTToStr(this.value1);
                this.value2 = this.GMTToStr(this.value2);
            }
            this.tipchange1 = false;
        },



        dataURLToBlob(dataurl) {
            let arr = dataurl.split(',');
            let mime = arr[0].match(/:(.*?);/)[1];
            let bstr = atob(arr[1]);
            let n = bstr.length;
            let u8arr = new Uint8Array(n);
            while (n--) {
                u8arr[n] = bstr.charCodeAt(n);
            }
            return new Blob([u8arr], { type: mime });
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

        saveImage(imgText) {
            if (!this.dcshow) {
                this.tipchange1 = true;
                setTimeout(() => {
                    $('.tip').css({

                        left: `calc(50% - ${($('.tip').width() / 2)}px)`,
                        top: `calc(50% - ${($('.tip').height() / 2)}px)`
                    })
                    this.move('tip', 'tiptop')
                })
                this.tipword = ''
                // this.w = this.lang.NoOperationAuthority;
                this.w = res.data.msg
                return
            }
            let canvasID = this.$refs.alarmPage;
            let that = this;
            let a = document.createElement('a');
            html2canvas(canvasID).then(canvas => {
                let dom = document.body.appendChild(canvas);
                dom.style.display = 'none';
                a.style.display = 'none';
                document.body.removeChild(dom);
                let blob = that.dataURLToBlob(dom.toDataURL('image/jpg'));
                a.setAttribute('href', URL.createObjectURL(blob));
                //这块是保存图片操作  可以设置保存的图片的信息
                a.setAttribute('download', this.lang.AlarmAnalysis + '.jpg');
                document.body.appendChild(a);
                a.click();
                URL.revokeObjectURL(blob);
                document.body.removeChild(a);
            });
        },
        tablename() {
            var timeRegex = "^((([0-9]{3}[1-9]|[0-9]{2}[1-9][0-9]{1}|[0-9]{1}[1-9][0-9]{2}|[1-9][0-9]{3})-" +
                "(((0[13578]|1[02])-(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)-(0[1-9]|[12][0-9]|30))|(02-(0[1-9]|[1][0-9]|2[0-8]))))|((([0-9]{2})" +
                "(0[48]|[2468][048]|[13579][26])|((0[48]|[2468][048]|[3579][26])00))-02-29))\\s+" +
                "([0-1]?[0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])$"
            var Regex = new RegExp(timeRegex)
            console.log(this.value1)
            console.log(Regex.test("2020-10-14 00:00:00"))
            if (!this.cxshow) {
                this.tipchange1 = true;
                setTimeout(() => {
                    $('.tip').css({

                        left: `calc(50% - ${($('.tip').width() / 2)}px)`,
                        top: `calc(50% - ${($('.tip').height() / 2)}px)`
                    })
                    this.move('tip', 'tiptop')
                })
                this.tipword = ''
                this.w = this.lang.NoOperationAuthority;
                return
            }
            if (!Regex.test(this.value1) || !Regex.test(this.value2)) {
                this.tipchange1 = true;
                setTimeout(() => {
                    $('.tip').css({

                        left: `calc(50% - ${($('.tip').width() / 2)}px)`,
                        top: `calc(50% - ${($('.tip').height() / 2)}px)`
                    })
                    this.move('tip', 'tiptop')
                })
                this.tipword = ''
                this.w = this.lang.SCMSConsoleWebApiMySql_TimeFormatIsIncorrect;
                return
            }

            //请求接口
            this.$axios({
                method: 'post',
                url: `/api/AlarmStatistics/SearchAlarm?StartTime=${this.value1}&EndTime=${this.value2}`
            }).then(res => {
                if (res.data.code == 0) {
                    this.tableData.tableList = res.data.data || [];
                    this.tableData.curId = '';
                    this.tableData.curIdList = [];
                    this.drawLine()
                } else {
                    this.tipchange1 = true;
                    setTimeout(() => {
                        $('.tip').css({

                            left: `calc(50% - ${($('.tip').width() / 2)}px)`,
                            top: `calc(50% - ${($('.tip').height() / 2)}px)`
                        })
                        this.move('tip', 'tiptop')
                    })
                    this.tipword = ''
                    this.w = this.lang.SCMSConsoleWebApiMySql_TimeFormatIsIncorrect;
                }

            })
        },

        // 返回
        back() {
            this.tableData.curId = ''
            this.tableData.curIdList = ''
            this.drawLine()
        },
        chartClick(data) {
            console.log("111")
            if (this.tableData.curId) {
                return
            }
            this.tableData.curId = data.name
            let _subObj = this.tableData.tableList.find(item => item.Name == data.name) || {}
            this.tableData.curIdList = _subObj.Children || []
            this.drawLine()
        },
        drawLine() {
            let xList = [], databar = [], dataline = [], dataShadow = [], title = '';
            if (this.tableData.curId) {
                //分表
                title = this.ZHObj.subChartTitle
                title = this.ZHObj.subChartTitle
                xList = this.tableData.curIdList.map(item => item.Name)
                databar = this.tableData.curIdList.map(item => (item.Per * 100).toFixed(1));
                dataline = this.tableData.curIdList.map(item => (item.SumPer * 100).toFixed(1));
            } else {
                //总表
                title = this.ZHObj.chartTitle
                xList = this.tableData.tableList.map(item => item.Name)
                databar = this.tableData.tableList.map(item => (item.Per * 100).toFixed(1));
                dataline = this.tableData.tableList.map(item => (item.SumPer * 100).toFixed(1));

            }
            dataShadow = databar.map(_ => 100)
            let option = {
                title: {
                    text: title,
                    textStyle: {
                        color: '#0DB9F2',        //颜色
                        fontStyle: 'normal',     //风格
                        fontWeight: 'normal',    //粗细
                        fontFamily: 'Microsoft yahei',   //字体
                        fontSize: 14,     //大小
                        align: 'center'   //水平对齐
                    },
                    left: 'center'
                },
                xAxis: {
                    data: xList,
                    axisLabel: {
                        inside: false,
                        textStyle: {
                            color: '#0DB9F2'
                        }
                    },
                    axisTick: {
                        show: false
                    },
                    axisLine: {
                        show: false
                    },
                    z: 10
                },
                yAxis: {
                    axisLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    },
                    axisLabel: {
                        textStyle: {
                            color: '#999'
                        }
                    }
                },
                dataZoom: [
                    {
                        type: 'inside'
                    }
                ],
                series: [
                    {
                        type: 'bar',
                        itemStyle: {
                            normal: { color: 'rgba(0,0,0,0.05)' }
                        },
                        barGap: '-100%',
                        barCategoryGap: '40%',
                        data: dataShadow,
                        animation: false
                    },
                    {
                        type: 'bar',
                        itemStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(
                                    0, 0, 0, 1,
                                    [
                                        { offset: 0, color: '#83bff6' },
                                        { offset: 0.5, color: '#188df0' },
                                        { offset: 1, color: '#188df0' }
                                    ]
                                )
                            },
                            emphasis: {
                                color: new echarts.graphic.LinearGradient(
                                    0, 0, 0, 1,
                                    [
                                        { offset: 0, color: '#2378f7' },
                                        { offset: 0.7, color: '#2378f7' },
                                        { offset: 1, color: '#83bff6' }
                                    ]
                                )
                            }
                        },
                        data: databar
                    },
                    {
                        type: 'line',
                        data: dataline
                    }
                ]
            };
            let myChart = this.$echarts.init(document.getElementById('mychart'));
            myChart.clear()
            myChart.setOption(option, true);
            myChart.on('click', params => this.chartClick(params))
        }
    },


};
</script>
<style lang="scss" scoped>
.tabledata {
    overflow-y: auto;
    overflow-x: hidden;
}



.fll {
    float: left;
    height: 100%;
    display: flex;
    align-items: center;
}

.fr {
    float: right;
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


    }

    .query,
    .export {
        display: inline-block;
        text-align: center;
        color: #ffffff;
        border-radius: 5px;
        font-weight: 600;
        cursor: pointer;
        margin-left: 10px;
    }

    .query {
        background-color: #ffffff;
        border: 2px solid #4270e4;
        color: #4270e4;
        margin-right: 20px;
    }

    .export {
        color: #fd9e00;
        background-color: #ffffff;
        border: 2px solid #fd9e00;
        margin-right: 10px;

    }



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




.colordiv {
    background-color: #d9dbde;
}


.alarm-page {
    width: 100%;
    height: calc(100% - 80px);
    border: 1px solid #d5d5d5;
    padding: 16px;
    box-sizing: border-box;
}

.charts {
    width: 100%;
    height: calc(100% - 260px);
    padding-bottom: 16px;
    box-sizing: border-box;
}

.mychart {
    width: 100%;
    height: 100%;
}

/* 表格样式 */

.table-r {
    height: 260px;
    width: 100%;
    overflow-x: auto;
    overflow-y: hidden;
    box-sizing: border-box;
    border: 1px solid #808080;
    box-sizing: border-box;
    background-color: #f0f1f2;
}

table {
    width: 100%;
    height: 100%;
}

th:first-child,
td:first-child {
    position: sticky;
    left: 0;
    background-color: #c7d5e8;
}

th {
    background-color: #dcf0f9 !important;
}

th,
td {
    height: 60px;
    // min-width: 200px;//web不能做横向滚动，不然导出截图截不到
    word-break: keep-all;
    border: 1px solid #808080;
    box-sizing: border-box;
    text-align: center;
    background-color: #fff;
}
</style>