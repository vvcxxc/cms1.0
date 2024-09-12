<!--  设备状态统计-->
<template>
    <div class="page-full">
        <div class="page-contain">
            <div class="search-container">
                <my-search
                    :searchList="searchList"
                    :searchData="searchData"
                    @setParams="setParams"
                    @change="change"
                >
                    <button class="btn" @click="exportTable">{{ lang.AlarmRecord_HT_AlarmPointManageUC_Export }}</button>
                </my-search>
            </div>
            <div class="view-container flex-layout">
                <div class="echart-view flex-column-layout">
                    <div class="pane full-flex flex-column-layout">
                        <div class="pane-title">
                            工作状态占比
                        </div>
                        <div class="full-flex" ref="workStatus"></div>
                    </div>
                    <div class="pane full-flex" ref="unWork"></div>
                </div>
                <div class="full-flex flex-column-layout">
                    <div class="table-contain full-flex">
                        <my-table
                            :data="tableData"
                            :tableHead="tableHead"
                            style="width: 100%"
                        ></my-table>
                    </div>
                    <div class="pager-contain">
                        <my-page :pageData="pageData" @req="req"/>
                    </div>
                </div>
            </div>
        </div>
        <cms-dialog :tipchange="tipchange" :tipword="tipword" @confirm="confirmDialog" @cancel="closeDialog" :showBtnGroup="showBtnGroup"/>
    </div>
</template>
<script>
let echarts = require('echarts/lib/echarts');
require('echarts/lib/chart/pie');
require('echarts/lib/chart/line');
// 以下的组件按需引入
require('echarts/lib/component/tooltip'); // tooltip组件
require('echarts/lib/component/title'); //  title组件
require('echarts/lib/component/legend'); // legend组件

import MySearch from '@/components/public/searchDiy.vue';
import MyTable from '@/components/public/table0Diy.vue';
import MyPage from '@/components/public/Pages.vue';
import CmsDialog from '@/components/public/cmsDialog.vue'
export default {
    components: {
        MySearch,
        MyTable,
        MyPage,
        CmsDialog
    },
    data() {
        return {
            searchList: [
                {
                    title: '开始时间：',
                    model: 'argStartTime',
                    type: 'date',
                },
                {
                    title: '结束时间：',
                    model: 'argEndTime',
                    type: 'date',
                },
                {
                    title: '设备名称：',
                    model: 'deviceName',
                    type: 'select',
                    optionList: [],
                    value: 'value',
                    label: 'label',
                },
            ],
            searchData: {
                argStartTime: '',
                argEndTime: '',
                deviceName: '',
            },
            tableData: [],
            tableHead: {
                CreateTime: {
                    name: '日期',
                    computed: (row, key)=>{
                        let value = row.replace("T", " ")
                        return `<div>${value}</div>`
                    }
                },
                DeviceName: '设备名称',
                WorkingSeconds: '正常工作时间（m:s）',
                NotWorkingSeconds: '不工作时间（m:s）',
            },
            pageData: {
                PageSize: 50,
                TotalCount: 0,
                TotalPage: 1,
                PageIndex: 1,
                LastEnabled: false,
                NextEnabled: false,
            },
            optionPie: {
                color: ['#5CA2E9', '#B4B4B4'],
                legend: {
                    bottom: 10,
                    left: 'center',
                    itemWidth: 18,
                    itemHeight: 18,
                    textStyle: {
                        fontWeight: 400,
                        color: '#999',
                    }
                },
                series: [
                    {
                        type: 'pie',
                        radius: ['40%', '56%'],
                        center: ['50%', '40%'],
                        label: {
                            padding: [0, -80, 0, -95],
                            formatter: '{aa|{d}%}\n{bb|{b}}',
                            left: 0,
                            rich: {
                                aa: {
                                    color: '#333',
                                    fontSize: 18,
                                    fontWeight: 'bold',
                                    height: 25,
                                    align: 'left'
                                },
                                bb: {
                                    color: '#999',
                                    fontSize: 14,
                                    height: 20,
                                    align: 'left'
                                }
                            }
                        },
                        labelLine: {
                            show: true,
                            minTurnAngle: 60,
                            length2: 100
                        },
                        data: []
                    }
                ]
            },
            optionLine: {
                color: ['#D85A51'],
                xAxis: {
                    type: 'category',
                    data: [],
                    axisTick: {
                        show: false
                    }
                },
                yAxis: {
                    type: 'value',
                    name: '不工作次数',
                    axisTick: {
                        show: false
                    }
                },
                tooltip: {
                    trigger: 'axis'
                },
                series: [
                    {
                        type: 'line',
                        name: '次数',
                        data: []
                    }
                ]
            },
            lang: JSON.parse(localStorage.getItem('languages'))[
                localStorage.getItem('currentLang')
            ],
            tipchange: false,
            tipword: '',
            showBtnGroup: false
        };
    },
    methods: {
        getLangData(){
            
        },
        change() {
            console.log('change')
        },
        allDays(year){
            let leapYear = false, sum_day = 0, month_arr = [4, 6, 9, 11];
            if (year % 100 === 0) { // 年份是整百
                leapYear = year % 400 === 0 
            } else {
                leapYear = year % 4 === 0
            }
            // 下面计算每个月的天数
            for (let i = 1; i < 13; i++) {
                if (i === 2) {
                    sum_day += leapYear ? 29 : 28
                } else if (month_arr.includes(i)) {
                    sum_day += 30
                } else {
                    sum_day += 31
                }
            }
            return sum_day
        },
        setParams(data) {
            console.log("查询", data)
            // 开始时间大于结束时间
            if (new Date(data.argStartTime + ' 00:00:00').getTime() > new Date(data.argEndTime + ' 23:59:59').getTime()) {
                this.tipchange = true;
                this.tipword = this.lang.AlarmRecord_HT_TheQueryDate;
                return
            }
            // 查询范围不能超过1年
            let OneYearTime = 1000*60*60*24*this.allDays(data.argEndTime.getFullYear)
            if(new Date(data.argEndTime + ' 23:59:59').getTime() - new Date(data.argStartTime + ' 00:00:00').getTime() > OneYearTime){
                this.tipchange = true;
                this.tipword = '查询范围不能大于1年';
                return
            }
            // 不工作占比
            this.$axios.post('/api/DeviceStatusAnalysis/GetWorkingStatusRatio', {
                BeginTime: new Date(this.searchData.argStartTime + ' 00:00:00').toISOString(),
                EndTime: new Date(this.searchData.argEndTime + ' 23:59:59').toISOString(),
                DeviceName: this.searchData.deviceName
            }).then(res=>{
                if(res.status == 200){
                    let {WorkingStatusRatio, NotWorkingStatusRatio} = res.data
                    this.optionPie.series[0].data = [
                        { value: WorkingStatusRatio === 'NaN' ? 0 : Number(WorkingStatusRatio), name: '正常工作时间' },
                        { value: NotWorkingStatusRatio === 'NaN' ? 0 : Number(NotWorkingStatusRatio), name: '不工作时间' },
                    ]
                }else{
                    this.tipchange = true;
                    this.tipword = res.data.msg
                }
            }).then(()=>{
                this.createPie()
            })
            
            let listData = []
            let xAxisData = []
            // // 不工作折线图
            this.$axios.post('/api/DeviceStatusAnalysis/GetNotWorkingCount', {
                BeginTime: new Date(this.searchData.argStartTime).toISOString(),
                EndTime: new Date(this.searchData.argEndTime+ ' 23:59:59').toISOString(),
                DeviceName: this.searchData.deviceName
            }).then(res=>{
                console.log(res)
                if(res.status == 200){
                    res.data.NotWorkingCountResults.forEach(item=>{
                        listData.push(item.Count)
                        xAxisData.push(item.Date.replace('T', ' '))
                    })

                    this.optionLine.series[0].data = listData
                    this.optionLine.xAxis.data = xAxisData
                }else{
                    this.tipchange = true;
                    this.tipword = res.data.msg
                }
            }).then(()=>{
                this.createLine();
            })

            // 表格数据
            // this.req(1)
        },
        exportTable(){
            // 判断用户权限
            this.$axios({
                method: 'post',
                url: '/api/DeviceStatusAnalysis/Export', 
                responseType: 'blob',
                data: {
                    BeginTime: new Date(this.searchData.argStartTime).toISOString(),
                    EndTime: new Date(this.searchData.argEndTime+ ' 23:59:59').toISOString(),
                    DeviceName: this.searchData.deviceName,
                    PageSize: 65536,
                    PageIndex: 1
                }
            }).then(res=>{
                const blob = new Blob([res.data], { type: 'application/x-xls;charset=utf-8' });
                // 兼容不同浏览器的URL对象
                // @ts-expect-error
                const url = window.URL || window.webkitURL || window.moxURL;
                // 创建下载链接
                const downloadHref = url.createObjectURL(blob);
                // 创建a标签并为其添加属性
                let downloadLink = document.createElement('a');
                downloadLink.href = downloadHref;
                downloadLink.download = '设备状态统计.xls'
                // 触发点击事件执行下载
                downloadLink.click();
            })
        },
        isPositiveInteger(s) {   
            //是否为正整数
            var re = /^[0-9]+$/;
            return re.test(s);
        },
        req(pageIndex, s) {
            console.log(pageIndex, s)
             if(s=='jump'){
                if (!this.isPositiveInteger(pageIndex)) {
                    this.tipword = this.lang.DataGrid_Reaction_HT_PEAPositiveInteger;
                    this.tipchange = true;
                    return;
                } else {
                    if(pageIndex!==1 && pageIndex!==this.pageData.TotalPage){
                        if (pageIndex < 1 || pageIndex > this.pageData.TotalPage) {
                            this.tipchange = true;
                        }
                        this.tipword = this.lang.DataGrid_Reaction_HT_PEThePageNumber;
                        return;
                    }
                }
             
            }
            console.log(this.searchData, new Date(this.searchData.argStartTime).toISOString())
            this.$axios.post('/api/DeviceStatusAnalysis/GetDeviceStatusBusinessRecord', {
                BeginTime: new Date(this.searchData.argStartTime).toISOString(),
                EndTime: new Date(this.searchData.argEndTime + ' 23:59:59').toISOString(),
                DeviceName: this.searchData.deviceName,
                PageSize: this.pageData.PageSize,
                PageIndex: pageIndex,
            }).then(res=>{
                if(res.status == 200){
                    let {TotalCount, PageSize, PageIndex, DeviceStatusBusinessRecordItems} = res.data
                    this.pageData.TotalCount = TotalCount;
                    this.pageData.PageSize = PageSize;
                    this.pageData.PageIndex = PageIndex;
                    this.tableData = [...DeviceStatusBusinessRecordItems];
                }else{
                    this.tipchange = true;
                    this.tipword = res.data.msg
                }
            })
        },
        createPie(){
            // 基于准备好的dom，初始化echarts实例
            let myChart = echarts.init(this.$refs.workStatus);
            // 绘制图表
            myChart.setOption(this.optionPie);
            window.onresize = function(){
                myChart && myChart.resize();
            }
        },
        createLine(){
            // 基于准备好的dom，初始化echarts实例
            let myChart = echarts.init(this.$refs.unWork);
            // 绘制图表
            myChart.setOption(this.optionLine);
            window.onresize = function(){
                myChart && myChart.resize();
            }
        },
        confirmDialog(){
            this.closeDialog();
        },
        closeDialog(){
            this.tipchange = false;
            this.tipword = '';
            this.showBtnGroup = false
        }
    },
    created() {
        let date = new Date();
        let argStartTime = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
        let argEndTime = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
        Object.assign(this.searchData, {
            argStartTime,
            argEndTime,
        });
    },
    mounted(){
        this.$axios.post('/api/DeviceStatusAnalysis/GetDeviceList').then(res=>{
            if(res.status == 200){
                let list = [
                    {
                        label: '全部',
                        value: ''
                    }
                ]
                res.data.forEach(item=>{
                    list.push({
                        label: item,
                        value: item
                    })
                })
                this.searchList[2].optionList = [...list]

            }
        }).then(()=>{
            this.setParams(this.searchData)
            this.req(1)
        })
    }
};
</script>
<style lang="scss" scoped>
.page-full {
    margin-top: 100px;
    height: calc(100% - 120px);
    overflow: hidden;
    color: #000;
    background-color: #eee;
    padding: 20px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;

    .page-contain {
        background: #fff;
        width: 100%;
        height: 100%;
        padding: 10px 21px;
        display: flex;
        flex-flow: column;
        box-sizing: border-box;
    }
    .view-container {
        flex: 1;
        height: 100%;
        padding-top: 10px;
    }
    .echart-view {
        width: 515px;
        margin-right: 12px;
    }
    .flex-layout {
        display: flex;
    }
    .flex-column-layout {
        display: flex;
        flex-flow: column;
    }
    .full-flex {
        flex: 1;
    }
}
.pane {
    background: rgba(255, 255, 255, 0.39);
    border: 1px solid #e5e6e6;
    margin-bottom: 10px;

    .pane-title{
        font-size: 14px;
        margin: 10px;
        padding-left: 5px;
        border-left: 2px solid #386DF0;
        font-size: 16px;
        font-weight: bold;
        line-height: 20px;
        color: #386DF0;
    }

    &:last-child {
        margin-bottom: 0;
    }
}
</style>
