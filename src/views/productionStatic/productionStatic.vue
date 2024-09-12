
<!-- 产量统计 -->
<template>
    <div class="page-full">
        <div class="page-contain">
            <div class="search-container">
                <my-search
                    :searchList="searchList"
                    :searchData="searchData"
                    @setParams="setParams"
                    @change="change"
                />
            </div>
            <div class="view-container flex-column-layout">
                <div class="echart-view">
                    <div class="pane" ref="unWork"></div>
                </div>
                <div class="table-contain full-flex">
                    <my-table
                        :data="tableData"
                        :tableHead="tableHead"
                        :sortable="sortable"
                        style="width: 100%"
                    ></my-table>
                </div>
            </div>
        </div>
        <cms-dialog :tipchange="tipchange" :tipword="tipword" @confirm="confirmDialog"/>
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
import CmsDialog from '@/components/public/cmsDialog.vue';
export default {
    components: {
        MySearch,
        MyTable,
        CmsDialog,
    },
    data() {
        return {
            searchList: [
                {
                    title: '统计时间范围：',
                    model: 'argStartTime',
                    type: 'time',
                },
                {
                    title: '结束时间：',
                    model: 'argEndTime',
                    type: 'time',
                },
                {
                    title: '图表维度：',
                    model: 'timeType',
                    type: 'select',
                    optionList: [
                        {
                            label: '日',
                            value: '0',
                        },
                        {
                            label: '月',
                            value: '1',
                        },
                        {
                            label: '年',
                            value: '2',
                        }
                    ],
                    value: 'value',
                    label: 'label',
                },
                {
                    title: '班次：',
                    model: 'shift',
                    type: 'select',
                    optionList: [
                        {
                            label: '全部',
                            value: '全部'
                        }
                    ],
                    value: 'value',
                    label: 'label',
                },
                {
                    title: '产品型号：',
                    model: 'productModel',
                    type: 'select',
                    optionList: [
                        {
                            label: '全部',
                            value: '全部'
                        },
                    ],
                    value: 'value',
                    label: 'label',
                },
                {
                    title: '设备名称：',
                    model: 'equipmentName',
                    type: 'select',
                    optionList: [
                        {
                            label: '全部',
                            value: '全部'
                        },
                    ],
                    value: 'value',
                    label: 'label',
                },
            ],
            searchData: {
                argStartTime: '',
                argEndTime: '',
                timeType: '0',
                shift: '',
                productModel: '',
                equipmentName: ''
            },
            sortable: ['AlarmTime', 'AlarmTagAddress'],
            tableData: [],
            tableHead: {
                Date: '日期时间',
                Shift: '班次',
                EquipmentName: '设备名称',
                ProductType: '产品型号',
                Product: '产量',
            },
            XAxisLabel: [],
            tipchange: false,
            tipword: '',
            lang: JSON.parse(localStorage.getItem('languages'))[
                localStorage.getItem('currentLang')
            ],
        };
    },
    methods: {
        change() {
            console.log('change')
        },
        confirmDialog(){
            // 时间格式不正确
            if(this.tipword == this.lang.SCMSConsoleWebApiMySql_TimeFormatIsIncorrect){
                this.tipchange = false;
                this.searchData.argStartTime = this.$getDate(
                    new Date(new Date().toLocaleDateString()).getTime()
                );
                this.searchData.argEndTime = this.$getDate(
                    new Date(new Date().toLocaleDateString()).getTime() +
                        24 * 60 * 60 * 1000 - 1
                );
                return;
            }
            this.closeDialog();
        },
        closeDialog(){
            this.tipchange = false;
            this.tipword = '';
        },
        getList(){
            let { argStartTime, argEndTime, equipmentName, timeType, shift, productModel } = this.searchData
            this.$axios.get(encodeURI(`/api/Throughput/Query?equipmentName=${equipmentName}&startTime=${argStartTime}&endTime=${argEndTime}&timeType=${timeType}&shift=${shift}&productModel=${productModel}`)).then(res=>{
                if(res.data.code === 0){
                    let { Records, XAxisLabel, ChartDimension } = res.data.data
                    this.tableData = [...Records]
                    this.XAxisLabel = XAxisLabel

                    let xData = ChartDimension.XDatas
                    let yData = ChartDimension.YDatas
                    this.$nextTick(()=>{
                        this.createLine(xData, yData);
                    })
                }else{

                }
            })
        },
        setParams(params) {
            // 开始时间大于结束时间
            if (new Date(params.argStartTime).getTime() > new Date(params.argEndTime).getTime()) {
                this.tipchange = true;
                this.tipword = this.lang.AlarmRecord_HT_TheQueryDate;
                return
            }
            this.getList();
        },
        req(data){
        },
        labelFormatter(params) {
            let div = document.createElement('div');
            let xaxis = this.XAxisLabel[params[0].axisValueLabel];
            if (xaxis) {   
                for (let ire in xaxis) {
                    let key = ire;
                    let value = xaxis[ire];
                    let label= document.createElement('div');
                    label.innerText = key + ":" + value;
                    div.appendChild(label);
                }
                return div.innerHTML;
            }
        },
        createLine(xData=[], yData=[]){
            // 基于准备好的dom，初始化echarts实例
            let myChart = echarts.init(this.$refs.unWork);
            let option = {
                color: ['#FFAC64'],
                grid: {
                    left: '30px',
                    right: '30px',
                    top: '46px',
                    bottom: '10px',
                    containLabel: true
                },
                xAxis: {
                    type: 'category',
                    data: xData 
                },
                yAxis: {
                    type: 'value',
                },
                tooltip: {
                    trigger: 'axis',
                    formatter: this.labelFormatter
                },
                series: [
                    {
                        type: 'bar',
                        showBackground: true,
                        barWidth: 28,
                        itemStyle: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                { offset: 0, color: '#5DB3EC' },
                                { offset: 1, color: '#6094E3' }
                            ])
                        },
                        label: {
                            show: true,
                            position: 'top'
                        },
                        data: yData
                    },
                    {
                        type: 'line',
                        data: yData
                    }
                ]
            }
            // 绘制图表
            myChart.setOption(option);
        },
        // 获取班次
        getShifts(){
            this.$axios.post('/api/UserManage/UserManage_GetShifts').then(res=>{
                if(res.data.code === 0){
                    console.log(res.data.data)
                    let list = [
                        {
                            value: '',
                            label: '全部'
                        }
                    ]
                    res.data.data.forEach(item => {
                        list.push({
                            value: item,
                            label: item
                        })
                    });
                    this.searchData.shift = ''
                    this.searchList[3].optionList = list
                }else{
                    this.tipchange = true;
                    this.tipword = res.data.msg;
                }
            })
        },
        // 获取设备名称
        getEquipmentNames(){
            this.$axios.get('/api/Throughput/GetEquipmentNames').then(res=>{
                if(res.data.code === 0){
                    let list = []
                    res.data.data.forEach(item => {
                        list.push({
                            value: item === '全部' ? '' : item,
                            label: item
                        })
                    });
                    this.searchList[5].optionList = list
                }else{
                    this.tipchange = true;
                    this.tipword = res.data.msg;
                }
            })
        },
        // 获取产品型号
        getDrawingNos(){
            this.$axios.get('/api/Throughput/GetDrawingNos').then(res=>{
                if(res.data.code === 0){
                    console.log(res.data.data)
                    let list = []
                    res.data.data.forEach(item => {
                        list.push({
                            value: item === '全部' ? '' : item,
                            label: item
                        })
                    });
                    this.searchList[4].optionList = list
                }else{
                    this.tipchange = true;
                    this.tipword = res.data.msg;
                }
            })
        }
    },
    created() {
        let argStartTime = this.$getDate(
            new Date(new Date().toLocaleDateString()).getTime() - 1000*60*60*24*7
        );
        let argEndTime = this.$getDate(
            new Date(new Date().toLocaleDateString()).getTime() + 24 * 60 * 60 * 1000 - 1
        );
        Object.assign(this.searchData, {
            argStartTime,
            argEndTime,
        });

        this.getShifts()
        this.getEquipmentNames();
        this.getDrawingNos()
    },
    mounted(){
        this.getList();
    }
};
</script>
<style lang="scss" scoped>
.page-full {
    margin-top: 100px;
    height: 86vh;
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
    }
    .view-container {
        flex: 1;
        padding-top: 10px;
    }
    .echart-view {
        height: 45%;
        margin-bottom: 21px;
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
    height: 100%;
    background: rgba(255, 255, 255, 0.39);
    border: 1px solid #e5e6e6;

    &:last-child {
        margin-bottom: 0;
    }
}
</style>
