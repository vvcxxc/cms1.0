<template>
    <div class="OutputStatisticsReport-Page" :class="{ blackBlueBg: $store.state.color === 'blackBlue' }">
        <div class="page-center">
            <div class="select">
                <my-select @select="select" @handleEvent="handleEvent" />
            </div>
            <div class="tables">
                <div class="myTable" id="myTable">
                    <div class="myTable-title">
                        <div class="myTable-left">
                            <div class="row-item">序号</div>
                            <div class="row-item">归档时间</div>
                        </div>
                        <div class="myTable-right">
                            <div class="right-row">
                                <div class=" row-item">班次</div>
                                <div class="row-item">班组</div>
                                <div class="row-item">班进炉产量</div>
                                <div class="row-item">班出炉产量</div>
                                <div class="row-item">1组进炉产量</div>
                                <div class="row-item">1组出炉产量</div>
                                <div class="row-item">2组进炉产量</div>
                                <div class="row-item">2组出炉产量</div>
                                <div class="row-item">3组进炉产量</div>
                                <div class="row-item">3组出炉产量</div>
                                <div class="row-item">4组进炉产量</div>
                                <div class="row-item">4组出炉产量</div>
                            </div>
                        </div>
                    </div>
                    <div v-for="(item, idx) in tableData" :key="item.Item1" class="myTable-content">
                        <div class="myTable-left">
                            <div class="row-item">{{ item.Item1 }}</div>
                            <div class="row-item">{{ item.Item2 }}</div>
                        </div>
                        <div class="myTable-right">
                            <div class="right-row" v-for="item3 in item.Item3">
                                <div class="row-item">{{ item3.ClassName }}</div>
                                <div class="row-item">{{ item3.ShiftName }}</div>
                                <div class="row-item">{{ item3.TheoreticalProductionIO }}</div>
                                <div class="row-item">{{ item3.ActualProductionIO }}</div>
                                <div class="row-item">{{ item3.TheoreticalProductionIO1 }}</div>
                                <div class="row-item">{{ item3.ActualProductionIO1 }}</div>
                                <div class="row-item">{{ item3.TheoreticalProductionIO2 }}</div>
                                <div class="row-item">{{ item3.ActualProductionIO2 }}</div>
                                <div class="row-item">{{ item3.TheoreticalProductionIO3 }}</div>
                                <div class="row-item">{{ item3.ActualProductionIO3 }}</div>
                                <div class="row-item">{{ item3.TheoreticalProductionIO4 }}</div>
                                <div class="row-item">{{ item3.ActualProductionIO4 }}</div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>



















import MySelect from '../../components/Select/Search01.vue';
import html2Canvas from 'html2canvas';

export default {
    components: {
        MySelect,
    },
    data() {
        let time = this.$getDate(
            new Date(new Date().toLocaleDateString()).getTime()
        );
        return {
            tableData: [],
            time,
        };
    },
    created() {
        this.initTable(this.time);
    },
    methods: {
        initTable(time) {
            this.$axios({
                method: 'get',
                url: `/api/OutputStatisticsReport/GetOutputStatisticsDataByTime?time=${time}`,
            }).then((res) => {
                this.tableData = res.data.data;
            });
        },
        select(date) {
            this.time = date.date;
            this.initTable(this.time);
        },
        handleEvent(str) {
            if (str === 'dyyl') {
                this.htmlToPdf();
            } else if (str === 'bgdy') {
                this.doPrint();
            } else {
                this.export();
            }
        },
        tabRow({ row, rowIndex }) {
            console.log(row, rowIndex);
            let index = rowIndex + 1;
            if (index % 2 == 0) {
                return 'warnning-row';
            } else {
                return 'true-row';
            }
        },
        // 打印预览
        htmlToPdf() {
            let dom = document.getElementsByClassName('myTable')[0];
            console.dir(dom);
            html2Canvas(dom, {
                allowTaint: true,
                height: dom.scrollHeight,
                // windowHeight: dom.scrollHeight,
            }).then(function (canvas) {
                dom.style.height = '100%';
                let pageData = canvas.toDataURL('image/jpeg');
                const printWindow = window.open('page.html');
                printWindow.document.write('<img src="' + pageData + '" />');
            });
        },
        // 报表打印
        doPrint() {
            let dom = document.getElementsByClassName('myTable')[0];
            document.getElementsByClassName('tables')[0].scrollTop = 0;
            console.dir(dom);
            html2Canvas(dom, {
                allowTaint: true,
                height: dom.scrollHeight,
                // windowHeight: dom.scrollHeight,
            }).then(function (canvas) {
                dom.style.height = '100%';
                let pageData = canvas.toDataURL('image/jpeg');
                const printWindow = window.open('page.html');
                printWindow.document.write('<img src="' + pageData + '" />');
                setTimeout(() => {
                    printWindow.print();
                    printWindow.close();
                });
            });
        },
        // 导出
        export() {
            require.ensure([], () => {
                const tHeader = [
                    '序号',
                    '归档时间',
                    '班次',
                    '班组',
                    '班进炉产量',
                    '班出炉产量',
                    '1组进炉产量',
                    '1组出炉产量',
                    '2组进炉产量',
                    '2组出炉产量',
                    '3组进炉产量',
                    '3组出炉产量',
                    '4组进炉产量',
                    '4组出炉产量',

                ];
                const filterVal = [
                    'Sequence',
                    'RecordDate',
                    'ClassName',
                    'ShiftName',
                    'TheoreticalProductionIO',
                    'ActualProductionIO',
                    'TheoreticalProductionIO1',
                    'ActualProductionIO1',
                    'TheoreticalProductionIO2',
                    'ActualProductionIO2',
                    'TheoreticalProductionIO3',
                    'ActualProductionIO3',
                    'TheoreticalProductionIO4',
                    'ActualProductionIO4',
                ];

                let arr = [];
                this.tableData.map((_) => {
                    _.Item3.map((_2) => {
                        arr.push({
                            ..._2,
                            Sequence: _.Item1,
                            RecordDate: _.Item2
                        })
                    });
                });

                const excelDatas = [
                    {
                        tHeader: tHeader,
                        filterVal: filterVal,
                        tableDatas: arr,
                        sheetName: 'sheet1',
                    },
                    {
                        tHeader: tHeader,
                        filterVal: filterVal,
                        tableDatas: arr,
                        sheetName: 'sheet2',
                    },
                ];
                this.json2excel(excelDatas, '产量统计报表', true, 'xlsx');
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
.OutputStatisticsReport-Page {
    height: calc(100% - 160px);
    margin: 20px;
    margin-top: 110px;
    background: #fff;

    &.blackBlueBg {
        background-color: #081027;
        box-shadow: 0 3px 6px 0 rgb(0 0 0 / 16%);
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

        .tables {
            margin: 22px;
            height: calc(100% - 104px);
            width: calc(100% - 40px);
            overflow-y: auto;

            .myTable {
                color: #fff;
                border-color: #38415a;
                background: #121c3a;
                height: auto;
                width: 100%;
                position: relative;

                .myTable-title {
                    background: #2a3058;
                    position: sticky;
                    top: 0;
                }

                .myTable-title,
                .myTable-content {

                    text-align: center;
                    line-height: 40px;
                    width: 100%;
                    display: flex;

                    .myTable-left,
                    .myTable-right {
                        height: auto;
                        width: calc(100% - 240px);


                        .right-row {
                            width: 100%;
                            height: 40px;
                            display: flex;
                            flex-wrap: nowrap;
                        }
                    }

                    .myTable-left {
                        width: 240px;
                        display: flex;
                        flex-wrap: nowrap;
                    }

                    .row-item {
                        flex: 1;
                        height: 100%;
                        border: #1D2B55 0.5px solid;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }

                }
            }
        }
    }
}
</style>