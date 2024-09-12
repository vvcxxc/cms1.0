<template>
    <div class="SaggerDamageStatistics-Page" :class="{ blackBlueBg: $store.state.color === 'blackBlue' }">
        <div class="tip" ref="kongtiao2" v-if="tipchange">
            <div class="tiptop" @mousedown="mouseDownHandleelse2($event)" @mouseup="mouseUpHandleelse2($event)">
                <img src="../../assets/images/gth.png" alt />
                <span>提示</span>
            </div>
            <div class="tipcontanin">
                <div class="tipword">{{ tipword }}</div>
                <div class="tipdetermine" @click="tip1">确定</div>
            </div>
        </div>
        <div class="page-center">
            <div class="select">
                <div class="select-l">
                    <div class="select-text">查询时间：</div>
                    <el-date-picker :key="
                        $store.state.color === 'blackBlue'
                            ? 'blackBlueBg'
                            : 'normal'
                    " :popper-class="
    $store.state.color === 'blackBlue'
        ? 'blackBlueBg'
        : 'normal'
" type="date" v-model="seleTime" placeholder="开始时间" value-format="yyyy-MM-dd" :style="{ marginRight: '10px' }">
                    </el-date-picker>
                    <span>-</span>
                    <el-date-picker :key="
                        $store.state.color === 'blackBlue'
                            ? 'blackBlueBg'
                            : 'normal'
                    " :popper-class="
    $store.state.color === 'blackBlue'
        ? 'blackBlueBg'
        : 'normal'
" type="date" v-model="seleTime2" placeholder="结束时间" value-format="yyyy-MM-dd" :style="{ marginLeft: '10px' }">
                    </el-date-picker>
                    <el-button class="select-btn" @click="GetProcessParamDataByTime">查询</el-button>
                </div>
                <div class="select-print">
                    <el-button class="select-btn2" @click="htmlToPdf">打印预览</el-button>
                    <el-button class="select-btn2" @click="doPrint">报表打印</el-button>
                    <el-button class="select-btn3" @click="exportTable">导出</el-button>
                </div>
            </div>
            <div class="content">
                <div class="table-content" id="table-content">
                    <div class="myTable-box">
                        <div class="myTable-title">
                            <div class="row-item">序号</div>
                            <div class="row-item date-item">归档时间</div>
                            <!-- <div class="row-item">白/晚班</div> -->
                            <div class="row-item">班次</div>
                            <div class="row-item">班组</div>
                            <div class="row-item">日破损次数</div>
                            <div class="row-item">班组破损次数</div>
                            <div class="row-item">一线破损次数</div>
                            <div class="row-item">二线破损次数</div>
                            <div class="row-item">三线破损次数</div>
                            <div class="row-item">四线破损次数</div>
                        </div>

                        <div v-for="(item, index) in tableData" :key="item.Index" class="myTable-content">
                            <template v-if="!item.Summary">
                                <div class="myTable-left">
                                    <div class="row-item">{{ /* item.Sequence */ index + 1 }}</div>
                                    <div class="row-item date-item">{{ item.RecordTime }}</div>
                                </div>
                                <div class="myTable-right">
                                    <div class="right-row">
                                        <div class="row-item">{{
                                            item.Datas[0] && item.Datas[0].ClassName
                                        }}</div>
                                        <div class="row-item">{{
                                            item.Datas[0] && item.Datas[0].ShiftName
                                        }}</div>


                                    </div>
                                    <div class="right-row">
                                        <div class="row-item">{{
                                            item.Datas[1] && item.Datas[1].ClassName
                                        }}</div>
                                        <div class="row-item">{{
                                            item.Datas[1] && item.Datas[1] && item.Datas[1].ShiftName
                                        }}</div>


                                    </div>
                                </div>
                                <div class="myTable-left">
                                    <div :class="item.IsMarkShiftSaggerNumberNGSum ? 'row-item red' : 'row-item'">{{
                                        item.DaySaggerNumberNGSum
                                    }}</div>
                                </div>
                                <div class="myTable-right">
                                    <div class="right-row">
                                        <div :class="item.Datas[0].IsMarkSaggerNumberNG1A ? 'row-item red' : 'row-item'">{{
                                            item.Datas[0].ShiftSaggerNumberNGSum
                                        }}</div>
                                        <div :class="item.Datas[0].IsMarkSaggerNumberNG1 ? 'row-item red' : 'row-item'">{{
                                            item.Datas[0].SaggerNumberNG1
                                        }}</div>
                                        <div :class="item.Datas[0].IsMarkSaggerNumberNG2 ? 'row-item red' : 'row-item'">{{
                                            item.Datas[0].SaggerNumberNG2
                                        }}</div>
                                        <div :class="item.Datas[0].IsMarkSaggerNumberNG3 ? 'row-item red' : 'row-item'">{{
                                            item.Datas[0].SaggerNumberNG3
                                        }}</div>
                                        <div :class="item.Datas[0].IsMarkSaggerNumberNG4 ? 'row-item red' : 'row-item'">{{
                                            item.Datas[0].SaggerNumberNG4
                                        }}</div>

                                    </div>
                                    <div class="right-row">
                                        <div
                                            :class="item.Datas[1] && item.Datas[1].IsMarkShiftSaggerNumberNGSum ? 'row-item red' : 'row-item'">
                                            {{
                                                item.Datas[1] && item.Datas[1].ShiftSaggerNumberNGSum
                                            }}</div>
                                        <div
                                            :class="item.Datas[1] && item.Datas[1].IsMarkSaggerNumberNG1 ? 'row-item red' : 'row-item'">
                                            {{
                                                item.Datas[1] && item.Datas[1].SaggerNumberNG1
                                            }}</div>
                                        <div
                                            :class="item.Datas[1] && item.Datas[1].IsMarkSaggerNumberNG2 ? 'row-item red' : 'row-item'">
                                            {{
                                                item.Datas[1] && item.Datas[1].SaggerNumberNG2
                                            }}</div>
                                        <div
                                            :class="item.Datas[1] && item.Datas[1].IsMarkSaggerNumberNG3 ? 'row-item red' : 'row-item'">
                                            {{
                                                item.Datas[1] && item.Datas[1].SaggerNumberNG3
                                            }}</div>
                                        <div
                                            :class="item.Datas[1] && item.Datas[1].IsMarkSaggerNumberNG4 ? 'row-item red' : 'row-item'">
                                            {{
                                                item.Datas[1] && item.Datas[1].SaggerNumberNG4
                                            }}</div>

                                    </div>
                                </div>
                            </template>
                            <template v-else>
                                <div class="myTable-left myTable-summary">
                                    <div class="row-item">合计</div>
                                    <div class="row-item date-item">{{ item.RecordTime }}</div>
                                    <div class="row-item">-</div>
                                    <div class="row-item">-</div>
                                    <div class="row-item">{{ item.DaySaggerNumberNGSum }}</div>
                                    <div class="row-item">{{ item.ShiftSaggerNumberNGSumA + item.ShiftSaggerNumberNGSumB }}
                                    </div>
                                    <div class="row-item">{{ item.SaggerNumberNG1A + item.SaggerNumberNG1B }}</div>
                                    <div class="row-item">{{ item.SaggerNumberNG2A + item.SaggerNumberNG2B }}</div>
                                    <div class="row-item">{{ item.SaggerNumberNG3A + item.SaggerNumberNG3B }}</div>
                                    <div class="row-item">{{ item.SaggerNumberNG4A + item.SaggerNumberNG4B }}</div>
                                </div>
                            </template>

                        </div>
                    </div>


                </div>
            </div>
        </div>
    </div>
</template>
<script>
import html2Canvas from 'html2canvas';
import JsPDF from 'jspdf';
export default {
    data() {
        return {
            tipword: '',
            tipchange: false,
            seleTime: '',
            seleTime2: '',
            tableData: [],
        };
    },
    methods: {
        getSummaries(param) {
            const { columns, data } = param;
            const sums = [];
            columns.forEach((column, index) => {
                if (index === 0) {
                    sums[index] = '合计';
                    return;
                }
                if (index === 1) {
                    sums[index] = `${this.seleTime}--${this.seleTime2}`;
                    return;
                }
                const values = data.map((item) =>
                    Number(item[column.property])
                );
                if (!values.every((value) => Number.isNaN(value))) {
                    sums[index] = `${values.reduce((prev, curr) => {
                        const value = Number(curr);
                        if (!Number.isNaN(value)) {
                            return prev + curr;
                        } else {
                            return prev;
                        }
                    }, 0)
                        .toFixed(2)}`;
                } else {
                    sums[index] = '-';
                }
            });

            return sums;
        },
        exportTable() {
            let filterVal = [
                'Index',
                'RecordTime',
                'ClassName',
                'ShiftName',
                'DaySaggerNumberNGSum',
                'ShiftSaggerNumberNGSum',
                'SaggerNumberNG1',
                'SaggerNumberNG2',
                'SaggerNumberNG3',
                'SaggerNumberNG4',
            ];
            let title = [
                '序号',
                '归档时间',
                '班次',
                '班组',
                '日破损次数',
                '班组破损次数',
                '一线破损次数',
                '二线破损次数',
                '三线破损次数',
                '四线破损次数',
            ];
            console.log('112', this.tableData);
            let exportData = JSON.parse(JSON.stringify(this.tableData))
            exportData.pop()
            let temp = [];
            exportData.forEach(_ => {
                temp.push({
                    ..._,
                    ..._.Datas[0],
                })
                temp.push({
                    ..._,
                    ..._.Datas[1],
                })
            })
            temp.forEach((_, i) => {
                _.Index = Number(i) + 1
            })
            temp.push({
                Index: '合计',
                RecordTime: `${this.seleTime}--${this.seleTime2}`,
                Shift: '-',
                ShiftName: '-',
                DaySaggerNumberNGSum: exportData.reduce((prev, curr) => {
                    return Number(prev) + Number(curr.DaySaggerNumberNGSum || 0);
                }, 0),
                ShiftSaggerNumberNGSum: exportData.reduce((prev, curr) => {
                    return Number(prev) + Number(curr.ShiftSaggerNumberNGSum || 0);
                }, 0),
                SaggerNumberNG1: exportData.reduce((prev, curr) => {
                    return Number(prev) + Number(curr.SaggerNumberNG1 || 0);
                }, 0),
                SaggerNumberNG2: exportData.reduce((prev, curr) => {
                    return Number(prev) + Number(curr.SaggerNumberNG2 || 0);
                }, 0),
                SaggerNumberNG3: exportData.reduce((prev, curr) => {
                    return Number(prev) + Number(curr.SaggerNumberNG3 || 0);
                }, 0),
                SaggerNumberNG4: exportData.reduce((prev, curr) => {
                    return Number(prev) + Number(curr.SaggerNumberNG4 || 0);
                }, 0),

            });

            require.ensure([], () => {
                const {
                    expor_json_to_excel,
                } = require('../../vendor/Export2Excel');
                let excelDatas = [
                    {
                        tHeader: title,
                        filterVal: filterVal,
                        tableDatas: temp,
                        sheetName: 'sheet1',
                    },
                    {
                        tHeader: title,
                        filterVal: filterVal,
                        tableDatas: temp,
                        sheetName: 'sheet1',
                    }, //不知道源码为啥删一次，写两次才正常
                ];
                this.json2excel(excelDatas, '匣钵破损统计表', true, 'xlsx');
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
        htmlToPdf() {
            let dom = document.getElementsByClassName('myTable-box')[0];
            document.getElementsByClassName('table-content')[0].scrollTop = 0;
            html2Canvas(dom, {
                allowTaint: true,
                height: dom.scrollHeight,
                // windowHeight: dom.scrollHeight
            }).then(function (canvas) {
                let pageData = canvas.toDataURL('image/jpeg');
                const printWindow = window.open('page.html');
                printWindow.document.write('<img src="' + pageData + '" />');
            });
        },
        doPrint() {
            let dom = document.getElementsByClassName('myTable-box')[0];
            document.getElementsByClassName('table-content')[0].scrollTop = 0;
            html2Canvas(dom, {
                allowTaint: true,
                height: dom.scrollHeight,
                // windowHeight: dom.scrollHeight
            }).then(function (canvas) {
                let pageData = canvas.toDataURL('image/jpeg');
                const printWindow = window.open('page.html');
                printWindow.document.write('<img src="' + pageData + '" />');
                setTimeout(() => {
                    printWindow.print();
                    printWindow.close();
                });
            });
        },
        GetProcessParamDataByTime() {
            if (!this.seleTime || !this.seleTime2) {
                this.tipword = '未选择时间';
                this.tipchange = true;
                return;
            }
            let $this = this
            this.$axios
                .get(
                    `/api/SaggerDamageStatistics/Query?st=${this.seleTime}&et=${this.seleTime2}`
                )
                .then((res) => {
                    if (res.data.code == 0) {
                        this.tableData = res.data.data;
                        if (res.data.data.length !== 0) {
                            let tableList = [...this.tableData].map((item, index) => ({
                                Index: index + 1,
                                RecordTime: item.RecordTime,
                                DaySaggerNumberNGSum: item.DaySaggerNumberNGSum,
                                ShiftNameA: item.Datas[0].ShiftName,
                                ShiftSaggerNumberNGSumA: item.Datas[0].ShiftSaggerNumberNGSum,
                                SaggerNumberNG1A: item.Datas[0].SaggerNumberNG1,
                                SaggerNumberNG2A: item.Datas[0].SaggerNumberNG2,
                                SaggerNumberNG3A: item.Datas[0].SaggerNumberNG3,
                                SaggerNumberNG4A: item.Datas[0].SaggerNumberNG4,
                                ShiftNameB: item.Datas[1] && item.Datas[1].ShiftName,
                                ShiftSaggerNumberNGSumB: item.Datas[1] && item.Datas[1].ShiftSaggerNumberNGSum,
                                SaggerNumberNG1B: item.Datas[1] && item.Datas[1].SaggerNumberNG1,
                                SaggerNumberNG2B: item.Datas[1] && item.Datas[1].SaggerNumberNG2,
                                SaggerNumberNG3B: item.Datas[1] && item.Datas[1].SaggerNumberNG3,
                                SaggerNumberNG4B: item.Datas[1] && item.Datas[1].SaggerNumberNG4,
                            }))
                            $this.tableData.push({
                                Summary: true,
                                RecordTime: `${this.seleTime}--${this.seleTime2}`,
                                DaySaggerNumberNGSum: tableList.reduce((prev, curr) => {
                                    return Number(prev) + Number(curr.DaySaggerNumberNGSum);
                                }, 0),
                                SaggerNumberNGA: tableList.reduce((prev, curr) => {
                                    return Number(prev) + Number(curr.SaggerNumberNGA);
                                }, 0),
                                ShiftSaggerNumberNGSumA: tableList.reduce((prev, curr) => {
                                    return Number(prev) + Number(curr.ShiftSaggerNumberNGSumA);
                                }, 0),
                                SaggerNumberNG1A: tableList.reduce((prev, curr) => {
                                    return Number(prev) + Number(curr.SaggerNumberNG1A);
                                }, 0),
                                SaggerNumberNG2A: tableList.reduce((prev, curr) => {
                                    return Number(prev) + Number(curr.SaggerNumberNG2A);
                                }, 0),
                                SaggerNumberNG3A: tableList.reduce((prev, curr) => {
                                    return Number(prev) + Number(curr.SaggerNumberNG3A);
                                }, 0),
                                SaggerNumberNG4A: tableList.reduce((prev, curr) => {
                                    return Number(prev) + Number(curr.SaggerNumberNG4A);
                                }, 0),
                                ShiftSaggerNumberNGSumB: tableList.reduce((prev, curr) => {
                                    prev = isNaN(Number(prev)) ? 0 : Number(prev)
                                    curr.ShiftSaggerNumberNGSumB = isNaN(Number(curr.ShiftSaggerNumberNGSumB)) ? 0 : Number(curr.ShiftSaggerNumberNGSumB)
                                    return Number(prev) + Number(curr.ShiftSaggerNumberNGSumB);
                                }, 0),
                                SaggerNumberNGB: tableList.reduce((prev, curr) => {
                                    prev = isNaN(Number(prev)) ? 0 : Number(prev)
                                    curr.SaggerNumberNGB = isNaN(Number(curr.SaggerNumberNGB)) ? 0 : Number(curr.SaggerNumberNGB)
                                    return Number(prev) + Number(curr.SaggerNumberNGB);
                                }, 0),
                                SaggerNumberNG1B: tableList.reduce((prev, curr) => {
                                    prev = isNaN(Number(prev)) ? 0 : Number(prev)
                                    curr.SaggerNumberNG1B = isNaN(Number(curr.SaggerNumberNG1B)) ? 0 : Number(curr.SaggerNumberNG1B)
                                    return Number(prev) + Number(curr.SaggerNumberNG1B);
                                }, 0),
                                SaggerNumberNG2B: tableList.reduce((prev, curr) => {
                                    prev = isNaN(Number(prev)) ? 0 : Number(prev)
                                    curr.SaggerNumberNG2B = isNaN(Number(curr.SaggerNumberNG2B)) ? 0 : Number(curr.SaggerNumberNG2B)
                                    return Number(prev) + Number(curr.SaggerNumberNG2B);
                                }, 0),
                                SaggerNumberNG3B: tableList.reduce((prev, curr) => {
                                    prev = isNaN(Number(prev)) ? 0 : Number(prev)
                                    curr.SaggerNumberNG3B = isNaN(Number(curr.SaggerNumberNG3B)) ? 0 : Number(curr.SaggerNumberNG3B)
                                    return Number(prev) + Number(curr.SaggerNumberNG3B);
                                }, 0),
                                SaggerNumberNG4B: tableList.reduce((prev, curr) => {
                                    prev = isNaN(Number(prev)) ? 0 : Number(prev)
                                    curr.SaggerNumberNG4B = isNaN(Number(curr.SaggerNumberNG4B)) ? 0 : Number(curr.SaggerNumberNG4B)
                                    return Number(prev) + Number(curr.SaggerNumberNG4B);
                                }, 0),
                            })
                        }
                    } else {
                        this.tipword = res.data.msg;
                        this.tipchange = true;
                    }
                });
        },
        tip1() {
            this.tipchange = false;
        },
        mouseDownHandleelse2(event) {
            event.currentTarget.style.cursor = 'move';
            window.onmousemove = this.mouseMoveHandleelse2;
        },
        mouseMoveHandleelse2(event) {
            let moveLeft = event.pageX - 100 + 'px';
            let moveTop = event.pageY + 80 + 'px';
            this.$refs.kongtiao2.style.left = moveLeft;
            this.$refs.kongtiao2.style.top = moveTop;
        },
        mouseUpHandleelse2(event) {
            window.onmousemove = null;
            event.currentTarget.style.cursor = 'move';
        },
        addDate(days) {
            var d = new Date();
            d.setDate(d.getDate() + days);
            var m = d.getMonth() + 1;
            return d.getFullYear() + '-' + m + '-' + d.getDate();
        },
    },
    mounted() {
        this.seleTime = this.addDate(0);
        this.seleTime2 = this.addDate(0);
        this.GetProcessParamDataByTime();

        let itemWidth = document.getElementsByClassName("table-content")[0].offsetWidth / 11 - 1;
        let style = document.documentElement.appendChild(document.createElement("style"));
        style.sheet.insertRule(
            `.row-item{width:${itemWidth}px;}`, 0);
        style.sheet.insertRule(
            `.date-item{width:${itemWidth * 2}px !important;}`, 0);



    },
};
</script>
<style>
.SaggerDamageStatistics-Page .el-table--border td,
.SaggerDamageStatistics-Page .el-table--border th,
.SaggerDamageStatistics-Page .el-table__body-wrapper .el-table--border.is-scrolling-left~.el-table__fixed {
    border-right: 1px solid #304171;
    background: #121c3a;
}

.SaggerDamageStatistics-Page .el-table td,
.el-table th.is-leaf {
    border-bottom: 1px solid #304171;
}

.SaggerDamageStatistics-Page .el-table--border th.gutter:last-of-type {
    background: #1e304a;
}

.SaggerDamageStatistics-Page .el-table--enable-row-hover .el-table__body tr:hover>td {
    background-color: #081027;
}
</style>
<style lang="scss" scoped>
.SaggerDamageStatistics-Page {
    height: calc(100% - 160px);
    margin: 20px;
    margin-top: 110px;
    background-color: #081027;
    color: #fff;

    &.blackBlueBg {
        background-color: #081027;
        box-shadow: 0 3px 6px 0 rgb(0 0 0 / 16%);
        color: #fff;
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
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 16px;
            box-sizing: border-box;

            .select-l {
                display: flex;
                flex-direction: row;
                align-items: center;

                .select-text {
                    font-size: 16px;
                    font-weight: 400;
                    color: #e4e4e4;
                    margin-right: 6px;
                }

                ::v-deep .el-input__inner {
                    border-radius: 0;
                    height: 36px;
                    line-height: 36px;
                    width: 100%;
                    background: #1d2846;
                    border: 1px solid #445992 !important;
                    font-size: 16px;
                    color: #c6cad8;
                }

                ::v-deep .el-input__icon {
                    line-height: 36px;
                }
            }

            .select-btn,
            .select-btn2,
            .select-btn3 {
                width: 120px;
                height: 40px;
                line-height: 0;
                background: #386df0;
                color: #fff;
                border-radius: 4px;
                font-size: 16px;
                font-weight: bold;
                margin-left: 10px;
                border: 0;
            }

            .select-btn2 {
                background: transparent;
                border: 1px solid #46be05;
                color: #46be05;
                box-sizing: border-box;
            }

            .select-btn3 {
                background: transparent;
                border: 1px solid #fda100;
                color: #fda100;
                box-sizing: border-box;
            }

            .select-print {
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: flex-end;
            }
        }

        .content {
            width: 100%;
            height: calc(100% - 60px);
            box-sizing: border-box;
            padding: 22px 20px;

            .table-content {
                width: 100%;
                height: 100%;
                // overflow-y: scroll;
                position: relative;
                overflow: hidden;

                .myTable-box {
                    width: 100%;
                    height: 100% !important;
                    height: auto;
                    overflow-x: hidden;
                    overflow-y: scroll;
                    background: #081027;
                    padding-bottom: 40px;
                    box-sizing: border-box;

                    .myTable-title {
                        background: #2a3058;
                        position: sticky;
                        top: 0;
                    }

                    .myTable-title,
                    .myTable-content {

                        text-align: center;
                        line-height: 40px;
                        width: fit-content;
                        display: flex;

                        .myTable-left,
                        .myTable-right {
                            height: 80px;
                            width: fit-content;




                            .right-row {
                                width: fit-content;
                                height: 40px;
                                display: flex;
                                flex-wrap: nowrap;
                            }
                        }

                        .myTable-left {
                            display: flex;
                            flex-wrap: nowrap;
                        }

                        .row-item {
                            height: 100%;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            border: #1D2B55 0.5px solid;
                        }

                    }
                }

                .white {
                    color: #fff;
                }

                .red {
                    color: #dd4444;
                }

            }
        }

        .content::-webkit-scrollbar {
            width: 0 !important;
        }
    }

    .tip {
        position: fixed;
        width: 380px;
        height: 200px;
        z-index: 30;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
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
            margin-top: 40px;
            text-align: center;
        }

        .w {
            width: 100%;
            margin-top: 40px;
            text-align: center;
        }

        .tipdetermine {
            color: #ea9328;
            cursor: pointer;
            width: 310px;
            line-height: 30px;
            text-align: center;
            // margin-top: 40px;
            position: absolute;
            bottom: 20px;
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
                display: inline-block;
                height: 30px;
                width: 160px;
                text-align: center;
                background-color: #e0e0e0;
                color: #7e7e7e;
            }

            .two {
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

    .myTable-summary {
        height: 40px !important;
        position: absolute;
        bottom: 0px;
        box-sizing: border-box;
        background-color: #203764;
    }
}
</style>