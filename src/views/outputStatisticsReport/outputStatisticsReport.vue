<template>
    <div class="OutputStatisticsReport-Page" :class="{ blackBlueBg: $store.state.color === 'blackBlue' }">
        <div class="page-center">
            <div class="select">
                <my-select @select="select" @handleEvent="handleEvent" />
            </div>
            <div class="tables">
                <div class="myTable" id="myTable">
                    <div class="myTable-title">
                        <div>序号</div>
                        <div>归档时间</div>
                        <div>日产量</div>
                        <div>A班产量</div>
                        <div>A组产量</div>
                        <div>B组产量</div>
                        <div>C组产量</div>
                        <div>D组产量</div>
                        <div>E组产量</div>
                        <div>F组产量</div>
                        <div>B班产量</div>
                        <div>A组产量</div>
                        <div>B组产量</div>
                        <div>C组产量</div>
                        <div>D组产量</div>
                        <div>E组产量</div>
                        <div>F组产量</div>
                    </div>
                    <div v-for="item in tableData" :key="item.Index" class="myTable-content">
                        <div>{{ item.ID }}</div>
                        <div>{{ item.DisplayRecordTime }}</div>
                        <div>{{ item.DayProduction }}</div>
                        <div>{{ item.AShiftProduction }}</div>
                        <div>{{ item.ProductionSumA_A }}</div>
                        <div>{{ item.ProductionSumB_A }}</div>
                        <div>{{ item.ProductionSumC_A }}</div>
                        <div>{{ item.ProductionSumD_A }}</div>
                        <div>{{ item.ProductionSumE_A }}</div>
                        <div>{{ item.ProductionSumF_A }}</div>
                        <div>{{ item.BShiftProduction }}</div>
                        <div>{{ item.ProductionSumA_B }}</div>
                        <div>{{ item.ProductionSumB_B }}</div>
                        <div>{{ item.ProductionSumC_B }}</div>
                        <div>{{ item.ProductionSumD_B }}</div>
                        <div>{{ item.ProductionSumE_B }}</div>
                        <div>{{ item.ProductionSumF_B }}</div>
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
                url: `/api/ProductionRepoet/QueryReport?time=${time}`,
            }).then((res) => {
                this.tableData = [...res.data.data];
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
                    '日产量',
                    'A班产量',
                    'A组产量',
                    'B组产量',
                    'C组产量',
                    'D组产量',
                    'E组产量',
                    'F组产量',
                    'B班产量',
                    'A组产量',
                    'B组产量',
                    'C组产量',
                    'D组产量',
                    'E组产量',
                    'F组产量',
                ];
                const filterVal = [
                    'ID',
                    'DisplayRecordTime',
                    'DayProduction',
                    'AShiftProduction',
                    'ProductionSumA_A',
                    'ProductionSumB_A',
                    'ProductionSumC_A',
                    'ProductionSumD_A',
                    'ProductionSumE_A',
                    'ProductionSumF_A',
                    'BShiftProduction',
                    'ProductionSumA_B',
                    'ProductionSumB_B',
                    'ProductionSumC_B',
                    'ProductionSumD_B',
                    'ProductionSumE_B',
                    'ProductionSumF_B',
                ];
                const arr = [...this.tableData];
                const excelDatas = [
                    {
                        tHeader: tHeader,
                        filterVal: filterVal,
                        tableDatas: arr.splice(0, 20000),
                        sheetName: 'sheet1',
                    },
                    {
                        tHeader: tHeader,
                        filterVal: filterVal,
                        tableDatas: arr.splice(0, 1000),
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
                width: fit-content;

                .myTable-title {
                    background: #2a3058;
                }

                .myTable-title,
                .myTable-content {
                    height: 40px;
                    text-align: center;
                    line-height: 40px;
                    width: fit-content;
                    display: flex;

                    div {
                        width: 120px;
                        height: 100%;
                        border: #304171 0.5px solid;
                    }
                }
            }
        }
    }
}
</style>