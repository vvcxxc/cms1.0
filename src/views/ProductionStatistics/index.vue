<!--
 * @Description: 这是参数报表页面（组件）
 * @Date: 2019-11-28 10:59:10
 * @Author: Tao
 * @LastEditors: Tao
 * @LastEditTime: 2021-04-08 15:25:35
 -->
<template>
    <div class="tapwater">
        <div class="linebox" id="linebox">
            <div class="query-table clearfix">
                <div class="fl">
                    <span>时间范围</span>
                    <div class="container">
                        <div class="block">
                            <span class="demonstration"></span>
                            <el-date-picker v-model="starttime" type="datetime" placeholder="请选择"
                                value-format="yyyy-MM-dd HH:mm:ss" :style="{ width: '180px' }"></el-date-picker>
                        </div>
                        <i class="separate">-</i>
                        <div class="block">
                            <span class="demonstration"></span>
                            <el-date-picker v-model="endtime" type="datetime" placeholder="请选择"
                                value-format="yyyy-MM-dd HH:mm:ss" :style="{ width: '180px' }"></el-date-picker>
                        </div>
                    </div>
                    <span>产品型号</span>
                    <el-select style="margin-left:5px;width:170px" placeholder="请选择" v-model="ProductModel">
                        <el-option label="全部" value="全部"></el-option>
                        <el-option v-for="item in ProductTypeList" :key="item.ProductTypeCode" :label="item.ProductTypeCode"
                            :value="item.ID">
                        </el-option>
                    </el-select>
                    <span>上料设备</span>
                    <el-select style="margin-left:5px;width:170px" placeholder="请选择" v-model="process">
                        <!-- <el-option label="全部" value="全部"></el-option> -->
                        <el-option v-for="item in processList" :key="item.WID" :label="item.WorkName" :value="item.WID">
                        </el-option>
                    </el-select>
                    <div class="query" @click="getData">查询</div>
                </div>
                <div class="fr">
                    <div class="export" @click="exportTable">导出</div>
                </div>
            </div>
            <div class="conter">
                <div class="conter-chart" id="mychart"></div>
                <div class="conter-table">
                    <el-table highlight-current-row :cell-style="{ borderColor: '#E4E7ED' }"
                        :header-cell-style="{ background: '#5a6c98', color: '#fff' }" :data="dataList" border
                        height="500px">
                        <template slot="empty">
                            <span>暂无数据</span>
                        </template>
                        <el-table-column type="index" label="序号" width="60px"></el-table-column>
                        <el-table-column prop="RecordDateStr" label="日期" :show-overflow-tooltip="true"></el-table-column>
                        <el-table-column prop="Production" label="产量（总）" :show-overflow-tooltip="true"></el-table-column>

                    </el-table>
                </div>
            </div>
        </div>
        <!-- 提示弹窗和遮罩层 -->
        <TipsPop :tipText="tipText" :noCancel="noCancel" v-if="isPopShow" @tipCallBack="tipCallBack"></TipsPop>
    </div>
</template>

<script>
// vue文件中引入echarts工具
let echarts = require('echarts/lib/echarts')
import TipsPop from '../../components/public/tipPop.vue';
export default {
    name: 'tapwater',
    components: {
        TipsPop,
    },
    data() {
        return {
            isPopShow: false,
            tipText: '',
            noCancel: true,
            starttime: new Date(new Date().toLocaleDateString()),
            endtime: new Date(
                new Date(new Date().toLocaleDateString()).getTime() +
                24 * 60 * 60 * 1000 - 1
            ),
            ProductTypeList: [],
            ProductModel: '全部',
            processList: [],
            process: '全部',
            dataList: [],
            shiftList: [],

            lang: JSON.parse(localStorage.getItem('languages'))[localStorage.getItem('currentLang')],
        };
    },
    computed: {

    },
    methods: {
        tipCallBack(str) {
            this.isPopShow = false;
            if (str == 'yes') {
                //
            }
            this.noCancel = true;
        },
        getProdType() {
            this.$axios({
                method: 'post',
                url: '/api/FormulaManage/QueryProductType',
            }).then(res => {
                if (res.data.code == 0) {
                    this.ProductTypeList = res.data.data || [];
                    // if (this.ProductTypeList.length) {
                    //     this.ProductModel = this.ProductTypeList[0].ProductTypeCode
                    // }
                    this.getProcessList();
                } else {
                    this.isPopShow = true
                    this.tipText = res.data.msg
                }
            })

        },
        getProcessList() {
            this.$axios({
                method: 'post',
                url: `/api/ProcessParameterConfigure/QueryWorkSections`,
            }).then(res => {
                if (res.data.code == 0) {
                    this.processList = res.data.data
                    if (this.processList && this.processList.length) {
                        this.process = this.processList[0].WID
                    } else {
                        this.process = '';
                    }
                    this.getData();
                } else {
                    this.isPopShow = true
                    this.tipText = res.data.msg
                }
            })

        },
        getShiftList() {
            this.$axios({
                method: 'post',
                url: '/api/ProductStatisticData/QuerySCMSShift',
            }).then(res => {
                if (res.data.code == 0) {
                    this.shiftList = res.data.data || [];
                } else {
                    this.isPopShow = true
                    this.tipText = res.data.msg
                }
            })
        },
        getDate(val) {
            if (val) {
                let date = new Date(val);
                let month = date.getMonth() + 1;
                month = month < 10 ? `0${month}` : month;
                let day = date.getDate();
                day = day < 10 ? `0${day}` : day;
                let hour = date.getHours();
                hour = hour < 10 ? `0${hour}` : hour;
                let minute = date.getMinutes();
                minute = minute < 10 ? `0${minute}` : minute;
                let second = date.getSeconds();
                second = second < 10 ? `0${second}` : second;
                let str = `${date.getFullYear()}-${month}-${day} ${hour}:${minute}:${second}`;
                return str;
            }
            return '';
        },
        exportTable() {
            this.$axios({
                method: 'get',
                url: `/api/ProductStatisticData/ProductStatisticExport?st=${this.getDate(this.starttime)}&et=${this.getDate(this.endtime)}&ProductModel=${this.ProductModel}&WID=${this.process}`,
                responseType: 'blob',
            }).then(res => {
                if (res.status === 200) {
                    this.downloadFile(res.data, '产量统计.xlsx')
                } else {
                    this.tipText = res.data.msg;
                    this.isTipShow = true;
                }
            })
        },
        getData() {
            this.$axios({
                method: 'post',
                url: `/api/ProductStatisticData/QueryProductStatisticData?st=${this.getDate(this.starttime)}&et=${this.getDate(this.endtime)}&ProductModel=${this.ProductModel}&WID=${this.process}`,
            }).then(res => {
                if (res.data.code == 0) {
                    this.dataList = res.data.data || [];
                    this.drawLine()
                } else {
                    this.isPopShow = true
                    this.tipText = res.data.msg
                }
            })
        },

        drawLine() {
            let xList = [], databar = [];

            //总表
            xList = this.dataList.map(_ => _.RecordDateStr)
            databar = this.dataList.map(_ => _.Production);
            let option = {
                tooltip: {
                    trigger: 'axis',
                    show: true
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
                        barMaxWidth: 30,
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
                    }
                ]
            };
            let myChart = this.$echarts.init(document.getElementById('mychart'));
            myChart.clear()
            myChart.setOption(option, true);
            myChart.on('click', params => this.chartClick(params))
        }


    },
    //渲染后计算宽度
    mounted() {
        this.getShiftList()
        this.getProdType()
    },
};
</script>

<style lang="scss">
.tapwater {
    .fl .el-input--prefix .el-input__inner {
        padding-left: 25px !important;
    }

    .table input {
        text-indent: 4px;
    }
}
</style>

<style lang="scss" scoped>
.mask_box {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    width: 100%;
    height: 100%;
    z-index: 999;
}

.conter {
    width: 100%;
    height: calc(100% - 60px);

    .conter-chart {
        width: 100%;
        height: 50%;

    }

    .conter-table {
        width: 100%;
        height: calc(50% - 10px);
        margin-top: 10px;
    }
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
    box-sizing: border-box;
    width: 100vw;
    height: 100vh;
    padding: 100px 0 40px;

    .linebox {
        height: 100%;
        width: 100%;
        background-color: #ffffff;
        border: 1px solid #d5d5d5;
    }

    .query-table {
        height: 60px;
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
        margin-left: 10px;
    }

    .export {
        background-color: #ffffff;
        color: #fcac1f;
        border: 2px solid #fcac1f;
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
</style>
 