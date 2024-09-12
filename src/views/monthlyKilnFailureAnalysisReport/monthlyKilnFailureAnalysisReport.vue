<template>
    <div
        class="MonthlyKilnFailureAnalysisReport-Page"
        :class="{ blackBlueBg: $store.state.color === 'blackBlue' }"
    >
        <div class="page-center">
            <div class="select">
                <my-select
                    @select="select"
                    @exportTable="exportTable"
                    @handleEvent="handleEvent"
                    :flag="flag"
                    :type="type"
                />
            </div>
            <div class="content flex">
                <div class="content-left">
                    <my-form
                        :list="list"
                        :flag="flag"
                        @handleChange="handleChange"
                    />
                </div>
                <div class="content-right">
                    <div id="myChart" style="width: 100%; height: 100%" />
                </div>
            </div>
        </div>
        <my-tip
            v-if="tipShow"
            :deltrue="true"
            :tipword="tipword"
            @tipSure="tipSure"
        />
    </div>
</template>
<script>
import MySelect from '../../components/Select/Search04.vue';
import MyForm from '../../components/Select/Form02.vue';
import MyTip from '../../components/Select/MyTip.vue';
import html2Canvas from 'html2canvas';

let echarts = require('echarts/lib/echarts');
require('echarts/lib/chart/line');
// 以下的组件按需引入
require('echarts/lib/component/tooltip'); // tooltip组件
require('echarts/lib/component/title'); //  title组件
require('echarts/lib/component/legend'); // legend组件
let color = [
    '#DE685B',
    '#FBAE61',
    '#FBE161',
    '#B1E98B',
    '#5CDEC3',
    '#5CB1DE',
    '#7394FE',
    '#C773FE',
    '#FE73A7',
    '#FFA99F',
    '#FFF8CE',
    '#B4C6FF',
    new echarts.graphic.LinearGradient(0, 0, 0, 1, [
        { offset: 0, color: '#DE685B' },
        { offset: 1, color: 'rgba(255, 193, 68, 0.2)' },
    ]),
    new echarts.graphic.LinearGradient(0, 0, 0, 1, [
        { offset: 0, color: '#B1E98B' },
        { offset: 1, color: 'rgba(255, 255, 255, 0.2)' },
    ]),
    new echarts.graphic.LinearGradient(0, 0, 0, 1, [
        { offset: 0, color: '#7394FE' },
        { offset: 1, color: 'rgba(255, 255, 255, 0.2)' },
    ]),
    new echarts.graphic.LinearGradient(0, 0, 0, 1, [
        { offset: 0, color: '#FE73A7' },
        { offset: 1, color: 'rgba(255, 255, 255, 0.2)' },
    ]),
];

export default {
    components: {
        MySelect,
        MyForm,
        MyTip,
    },
    data() {
        let time = this.$getDate(
            new Date(new Date().toLocaleDateString()).getTime()
        );
        return {
            type: 'month', // datepicker类型
            flag: true, // 判断A、B表
            tipShow: false, // 弹窗
            tipword: '',
            option: {},
            list: [
                {
                    label: '窑炉1',
                    value: '',
                },
                {
                    label: '窑炉2',
                    value: '',
                },
                {
                    label: '窑炉3',
                    value: '',
                },
                {
                    label: '窑炉4',
                    value: '',
                },
                {
                    label: '窑炉5',
                    value: '',
                },
                {
                    label: '窑炉6',
                    value: '',
                },
                {
                    label: '窑炉7',
                    value: '',
                },
                {
                    label: '窑炉8',
                    value: '',
                },
                {
                    label: '窑炉9',
                    value: '',
                },
                {
                    label: '窑炉10',
                    value: '',
                },
                {
                    label: '窑炉11',
                    value: '',
                },
                {
                    label: '窑炉12',
                    value: '',
                },
                {
                    label: '外线1',
                    value: '',
                },
                {
                    label: '外线2',
                    value: '',
                },
                {
                    label: '外线3',
                    value: '',
                },
                {
                    label: '外线4',
                    value: '',
                },
            ],
            query: {
                time,
                isBSystem: true,
            },
        };
    },
    created() {
        this.flag = eval(sessionStorage.getItem('isBSystem')) || false;
        this.query = {
            ...this.query,
            isBSystem: this.flag,
        };
        this.initTable(this.query);
        window.addEventListener('resize', () => {
            let myChart = echarts.init(document.getElementById('myChart'));
            // 绘制图表
            myChart.resize();
        });
    },
    destroyed() {
        window.removeEventListener('resize', () => {});
    },
    methods: {
        initTable(query) {
            this.$axios({
                method: 'get',
                url: `/api/KilnFailure/GetMonthlyFailureDataByTime?time=${query.time}&isBSystem=${query.isBSystem}`,
            }).then((res) => {
                if (res.data.data.length) {
                    this.list = res.data.data.map((item) => ({
                        label: item.VName,
                        value: item.Value,
                    }));
                } else {
                    this.list = [
                        {
                            label: '窑炉1',
                            value: '',
                        },
                        {
                            label: '窑炉2',
                            value: '',
                        },
                        {
                            label: '窑炉3',
                            value: '',
                        },
                        {
                            label: '窑炉4',
                            value: '',
                        },
                        {
                            label: '窑炉5',
                            value: '',
                        },
                        {
                            label: '窑炉6',
                            value: '',
                        },
                        {
                            label: '窑炉7',
                            value: '',
                        },
                        {
                            label: '窑炉8',
                            value: '',
                        },
                        {
                            label: '窑炉9',
                            value: '',
                        },
                        {
                            label: '窑炉10',
                            value: '',
                        },
                        {
                            label: '窑炉11',
                            value: '',
                        },
                        {
                            label: '窑炉12',
                            value: '',
                        },
                        {
                            label: '外线1',
                            value: '',
                        },
                        {
                            label: '外线2',
                            value: '',
                        },
                        {
                            label: '外线3',
                            value: '',
                        },
                        {
                            label: '外线4',
                            value: '',
                        },
                    ];
                }
                const arr = this.reData(this.list);
                this.option = {
                    color,
                    title: {
                        text: '月故障时间总计',
                        left: 'center',
                        padding: [20, 0, 0, 0],
                        textStyle: {
                            color: '#ffffff',
                            fontSize: 16,
                        },
                    },
                    legend: {
                        type: 'scroll',
                        right: 0,
                        top: 'center',
                        orient: 'vertical',
                        selectedMode: false,
                        itemGap: 20,
                        itemWidth: 24,
                        itemHeight: 24,
                        padding: [0, 20, 0, 0],
                        textStyle: {
                            fontSize: 14,
                            color: '#9AA3BE',
                        },
                    },
                    grid: {
                        top: 80,
                        left: 80,
                        right: 110,
                    },
                    xAxis: {
                        type: 'category',
                        data: this.list.map((item) => item.label),
                        axisLabel: {
                            color: '#9AA3BE',
                            fontSize: 12,
                        },
                        axisLine: {
                            lineStyle: {
                                color: '#4C5777',
                            },
                        },
                    },
                    yAxis: {
                        name: '故障时间/min',
                        type: 'value',
                        nameTextStyle: {
                            color: '#9AA3BE',
                            fontSize: 14,
                        },
                        axisLabel: {
                            color: '#9AA3BE',
                            fontSize: 12,
                        },
                        axisLine: {
                            lineStyle: {
                                color: '#4C5777',
                            },
                        },
                        splitLine: {
                            interval: 1,
                            lineStyle: {
                                color: ['#4C5777'],
                            },
                        },
                    },
                    series: arr,
                };
                let myChart = echarts.init(document.getElementById('myChart'));
                // 绘制图表
                myChart.setOption(this.option);
            });
        },
        // 柱状图series数据处理
        reData(arr) {
            return arr.map((item, index) => {
                let arrs = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                arrs[index] = item.value;
                return {
                    name: item.label,
                    data: arrs,
                    type: 'bar',
                    barGap: '-100%',
                    barWidth: 40,
                    itemStyle: {
                        color: function (params) {
                            return color[params.dataIndex];
                        },
                    },
                };
            });
        },
        //搜索回调
        select(data) {
            this.query = {
                ...this.query,
                time: data.date,
            };
            this.initTable(this.query);
        },
        tipSure(str) {
            this.tipShow = false;
        },
        //右侧按钮整体回调
        handleEvent(str) {
            if (str === 'dyyl') {
                this.htmlToPdf();
            } else if (str === 'bgdy') {
                this.doPrint();
            } else if (str === 'bgbc') {
                this.formSave();
            } else {
                this.exportTable();
            }
        },
        // 表格回调
        handleChange(data) {
            this.list = [...data];
            const arr = this.reData(this.list);
            this.option.series = arr;
            let myChart = echarts.init(document.getElementById('myChart'));
            // 绘制图表
            myChart.setOption(this.option);
        },
        // 打印预览
        htmlToPdf() {
            let dom = document.getElementsByClassName('content')[0];
            dom.style.height = '807px';
            let myChart = echarts.init(document.getElementById('myChart'));
            myChart.resize();
            myChart.on('finished', () => {
                html2Canvas(dom, {
                    allowTaint: true,
                    height: dom.scrollHeight,
                    windowHeight: dom.scrollHeight,
                }).then(function (canvas) {
                    myChart.off('finished');
                    dom.style.height = 'calc(100% - 104px)';
                    myChart.resize();
                    let pageData = canvas.toDataURL('image/jpeg');
                    const printWindow = window.open('page.html');
                    printWindow.document.write(
                        '<img src="' + pageData + '" />'
                    );
                });
            });
        },
        // 报表打印
        doPrint() {
            let dom = document.getElementsByClassName('content')[0];
            dom.style.height = '807px';
            let myChart = echarts.init(document.getElementById('myChart'));
            myChart.resize();
            myChart.on('finished', () => {
                html2Canvas(dom, {
                    allowTaint: true,
                    height: dom.scrollHeight,
                    windowHeight: dom.scrollHeight,
                }).then(function (canvas) {
                    myChart.off('finished');
                    dom.style.height = 'calc(100% - 104px)';
                    myChart.resize();
                    let pageData = canvas.toDataURL('image/jpeg');
                    const printWindow = window.open('page.html');
                    printWindow.document.write(
                        '<img src="' + pageData + '" />'
                    );
                    setTimeout(() => {
                        printWindow.print();
                        printWindow.close();
                    });
                });
            });
        },
        // 报表保存
        formSave() {
            const queryList = this.list.map((item) => ({
                VName: item.label,
                Value: Number(item.value),
            }));
            for (let i = 0; i < queryList.length; i++) {
                if (
                    (!queryList[i].Value && queryList[i].Value !== 0) ||
                    queryList[i].Value < 0
                ) {
                    this.tipShow = true;
                    this.tipword = '请输入大于等于0的数字！';
                    return;
                }
            }
            this.$axios({
                method: 'post',
                url: `/api/KilnFailure/EditMonthlyFailureData?time=${this.query.time}`,
                data: queryList,
            }).then((res) => {
                this.tipShow = true;
                this.tipword = '保存成功！';
            });
        },
        // 导出
        exportTable() {
            require.ensure([], () => {
                const tHeader = ['项目', '故障时间/min'];
                const filterVal = ['label', 'value'];
                const arr = [...this.list];
                const excelDatas = [
                    {
                        tHeader: tHeader,
                        filterVal: filterVal,
                        tableDatas: arr.splice(0, 20000),
                        sheetName: '故障时间',
                    },
                    {
                        tHeader: tHeader,
                        filterVal: filterVal,
                        tableDatas: arr.splice(0, 1000),
                        sheetName: 'sheet2',
                    },
                ];
                this.json2excel(excelDatas, '窑炉故障月分析报表', true, 'xlsx');
            });
        },
        json2excel(tableJson, filenames, autowidth, bookTypes) {
            var that = this;
            //这个是引用插件
            import('@/vendor/Export2Excel').then((excel) => {
                var tHeader = [];
                var dataArr = [];
                var sheetnames = [];
                for (var i in tableJson) {
                    tHeader.push(tableJson[i].tHeader);
                    dataArr.push(
                        that.formatJson(
                            tableJson[i].filterVal,
                            tableJson[i].tableDatas
                        )
                    );
                    sheetnames.push(tableJson[i].sheetName);
                }
                excel.export_json_to_excel({
                    header: tHeader,
                    data: dataArr,
                    sheetname: sheetnames,
                    filename: filenames,
                    autoWidth: autowidth,
                    bookType: bookTypes,
                });
            });
        },
        formatJson(filterVal, jsonData) {
            return jsonData.map((v) => filterVal.map((j) => v[j]));
        },
    },
};
</script>

<style lang="scss" scoped>
.MonthlyKilnFailureAnalysisReport-Page {
    height: calc(100% - 160px);
    margin: 20px;
    margin-top: 110px;
    background: #fff;

    &.blackBlueBg {
        background-color: #081027;
        box-shadow: 0 3px 6px 0 rgb(0 0 0 / 16%);
    }

    .flex {
        display: flex;
        flex-direction: row;
    }

    .page-center {
        width: 100%;
        height: 100%;
        background: #081027;
        border: 2px solid #2a3058;

        .select {
            height: 60px;
            background: #0b1530;
            border-bottom: 1px solid #38415a;
        }

        .content {
            margin: 22px 20px;
            height: calc(100% - 104px);
            width: calc(100% - 40px);

            .content-left {
                width: 328px;
                flex: none;
                background: #0e1732;
                border: 1px solid #2a3058;
                margin-right: 18px;
                font-size: 16px;
                overflow-y: auto;
            }

            .content-right {
                width: calc(100% - 346px);
                background: #0e1732;
                border: 1px solid #2a3058;
            }
        }
    }
}
</style>