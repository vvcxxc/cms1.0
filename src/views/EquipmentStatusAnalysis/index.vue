<!--
 * @description: 报警统计页面
 * @since: 2019-11-08 15:00:48
 * @Author: jawnwa22
 * @LastEditors: jawnwa22
 * @LastEditTime: 2019-11-11 10:13:58
 -->
<template>
    <div class="tapwater" v-loading="this.$store.state.isShow">

        <div class="linebox" id="linebox">
            <div class="search-content">
                <div class="search-left">
                    <div>{{ lang.AlarmStatistics_AlarmStatisticsUserControl_StartTime }}</div>
                    <el-date-picker v-model="value1" type="datetime" placeholder="请选择" value-format="yyyy-MM-dd HH:mm:ss"
                        :style="{ width: '210px' }"></el-date-picker>

                    <div>{{ lang.AlarmStatistics_AlarmStatisticsUserControl_EndTime }}</div>
                    <el-date-picker v-model="value2" type="datetime" placeholder="请选择" value-format="yyyy-MM-dd HH:mm:ss"
                        :style="{ width: '210px' }"></el-date-picker>

                    <div>设备名称</div>
                    <el-select :style="{ width: '150px' }" v-model="Equipment"
                        :placeholder="lang.SCMSConsoleWebApiMySql_PleChoose">
                        <el-option v-for="item in EquipmentList" :key="item.AID" :label="item.Name"
                            :value="item.AID">
                        </el-option>
                    </el-select>
                    <div>班次</div>
                    <el-select :style="{ width: '150px' }" v-model="Shift"
                        :placeholder="lang.SCMSConsoleWebApiMySql_PleChoose">
                        <el-option v-for="item in ShiftList" :key="item.sId" :label="item.sName"
                            :value="item.sId">
                        </el-option>
                    </el-select>

                    <div class="query" @click="getData">
                        {{ lang.AlarmStatistics_AlarmStatisticsUserControl_Query }}</div>
                </div>
                

                <div class="export" @click="exportFn">导出</div>
            </div>


            <div class="alarm-page" ref="alarmPage">
                <div class="charts">
                    <div class="mychart" id="mychart" ref="mychart"></div>
                </div>

                <div class="table-box">
                    <el-table highlight-current-row :cell-style="{ borderColor: '#E4E7ED' }"
                        :header-cell-style="{ background: '#5a6c98', color: '#fff' }" :data="dataList" border height="100%">
                        <template slot="empty">
                            <span>暂无数据</span>
                        </template>
                        <el-table-column type="index" label="序号" width="60px"></el-table-column>
                        <el-table-column prop="RecordTime" label="日期" :show-overflow-tooltip="true"></el-table-column>
                        <el-table-column prop="DeviceName" label="设备名称" :show-overflow-tooltip="true"></el-table-column>
                        <el-table-column prop="ShiftName" label="班次" :show-overflow-tooltip="true"></el-table-column>
                        <el-table-column prop="DisplayPowerOnDuration" label="开机时间（m:s）"
                            :show-overflow-tooltip="true"></el-table-column>
                        <el-table-column prop="DisplayEfficientDuration" label="有效加工时间（m:s）"
                            :show-overflow-tooltip="true"></el-table-column>
                        <el-table-column prop="DisplayAlarmDuration" label="报警时间（m:s）"
                            :show-overflow-tooltip="true"></el-table-column>
                        <el-table-column prop="DisplayStandByDuration" label="待机时间（m:s）" width="220px"></el-table-column>
                    </el-table>
                </div>
            </div>

        </div>
        <TipsPop :tipText="tipText" :noCancel="noCancel" v-if="isPopShow" @tipCallBack="tipCallBack"></TipsPop>

    </div>
</template>

<script>
import html2canvas from 'html2canvas';
import TipsPop from '../../components/public/tipPop.vue';
export default {
    name: 'tapwater',
    components: {
        TipsPop,

    },
    data() {
        return {
            jurisdiction: [],
            buttonarr: [],
            cxid: "",
            dcid: '',
            cxshow: true,
            dcshow: true,


            isPopShow: false,
            tipText: '',
            noCancel: true,

            gth: require('../../assets/images/gth.png'),
            value1: new Date(new Date().toLocaleDateString()),
            value2: new Date(
                new Date(new Date().toLocaleDateString()).getTime() +
                24 * 60 * 60 * 1000 -
                1
            ),
            productTypeCode: '',
            productTypeList: [],
            lang: JSON.parse(localStorage.getItem('languages'))[localStorage.getItem('currentLang')],
            dataList: [],
            Labels: [],
            LineAlarm: [],
            LineDefault: [],
            LineEfficient: [],
            LineStandby: [],
            StepX: 1,
            StepY: 1,
            EquipmentList: [],
            Equipment: '',
            ShiftList: [],
            Shift: '',
        };
    },

    created() {

    },
    computed: {

    },
    mounted() {
        this.value1 = this.GMTToStr(this.value1);
        this.value2 = this.GMTToStr(this.value2);

        this.getProdType()
        $(window).bind("resize",
            function () {
                let myChart = this.$echarts.init(document.getElementById('mychart'));
                console.log("myChart99")
                myChart.resize()
            }
        );
    },


    methods: {
        tipCallBack(str) {
            if (str == 'yes') {
                
            }
            this.noCancel = true;
            this.isPopShow = false;
            this.delItem = null;
        },
        getProdType() {

            this.$axios({
                method: 'post',
                url: `/api/EquipmentStatusAnalysis/EquipmentStatus_GstEquipmentList`,
            }).then(res => {
                if (res.data.code == 0) {
                    this.EquipmentList = res.data.data || []
                    if (this.EquipmentList.length) {
                        this.Equipment = this.EquipmentList[0].AID
                    }

                    this.$axios({
                        method: 'post',
                        url: `/api/EquipmentStatusAnalysis/EquipmentStatus_GstShiftList`,
                    }).then(res => {
                        if (res.data.code == 0) {
                            this.ShiftList = res.data.data || []
                            if (this.ShiftList.length) {
                                this.Shift = this.ShiftList[0].sId
                            }
                            this.getData()
                        } else {
                            this.isPopShow = true
                            this.tipText = res.data.msg
                        }
                    })


                } else {
                    this.isPopShow = true
                    this.tipText = res.data.msg
                }
            })




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
        exportFn(){
            let canvasID = document.getElementById('linebox');
            let a = document.createElement('a');
            html2canvas(canvasID).then(canvas => {
                let dom = document.body.appendChild(canvas);
                dom.style.display = 'none';
                a.style.display = 'none';
                document.body.removeChild(dom);
                let blob = this.dataURLToBlob(dom.toDataURL('image/jpg'));
                a.setAttribute('href', URL.createObjectURL(blob));
                //这块是保存图片操作  可以设置保存的图片的信息
                a.setAttribute('download', this.lang.AlarmAnalysis + '.jpg');
                document.body.appendChild(a);
                a.click();
                URL.revokeObjectURL(blob);
                document.body.removeChild(a);
            });
        },
        getData() {
            this.$axios({
                method: 'post',
                url: `/api/EquipmentStatusAnalysis/QueryEquipmentStatus?st=${this.value1}&et=${this.value2}&EquipmentID=${this.Equipment}&shiftId=${this.Shift}`,
            }).then(res => {
                if (res.data.code == 0) {
                    this.dataList = res.data.data.DataList || []
                    this.Labels = res.data.data.Labels || []
                    this.LineAlarm = res.data.data.LineAlarm || []
                    this.LineDefault = res.data.data.LineDefault || []
                    this.LineEfficient = res.data.data.LineEfficient || []
                    this.LineStandby = res.data.data.LineStandby || []
                    this.StepX = res.data.data.StepX
                    this.StepY = res.data.data.StepY
                    this.drawLine()
                } else {
                    this.isPopShow = true
                    this.tipText = res.data.msg
                }
            })
        },


        drawLine() {
      
            let option = {
                title: {
                    text: '设备状态统计',
                 },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data: ['开机时间', '有效加工时间', '报警时间', '待机时间']
                },
                calculable: true,
                xAxis: [
                    {
                        type: 'category',
                        // prettier-ignore
                        data: this.Labels
                    }
                ],
                yAxis: [
                    {
                        type: 'value'
                    }
                ],
                series: [
                    {
                        name: '开机时间',
                        type: 'bar',
                        data: this.LineDefault
                    },
                    {
                        name: '有效加工时间',
                        type: 'bar',
                        data: this.LineEfficient
                    },
                    {
                        name: '报警时间',
                        type: 'bar',
                        data: this.LineAlarm
                    },
                    {
                        name: '待机时间',
                        type: 'bar',
                        data: this.LineStandby
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

.tapwater {
    height: 100%;
    padding: 20px;
    width: 100%;
    background-color: #eeeeee;
    padding: 100px 0 40px;
    box-sizing: border-box;

    .linebox {
        height: 100%;
        width: 100%;
        background-color: #ffffff;
        border: 1px solid #d5d5d5;
        overflow: hidden;
    }

    .search-content {
        height: 60px;
        width: 100%;
        background-color: #dddddd;
        line-height: 60px;
        overflow: hidden;
        font-size: 14px;
        color: #6b6668;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .search-left {
            display: flex;
            align-items: center;
            height: 100%;
            display: flex;
            align-items: center;

            div {
                margin: 0 10px;
            }
        }

        .fr {
            display: flex;
            align-items: center;
        }

        span {
            margin-left: 18px;
        }




    }

    .query,
    .export {
        width: 120px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
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
        cursor: pointer;
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

.table-box {
    width: 100%;
    height: 260px;
}

/* 表格样式 */

.table-r {
    height: 260px;
    width: 100%;
    box-sizing: border-box;
    border: 1px solid #808080;
    box-sizing: border-box;
    background-color: #f0f1f2;
}
</style>