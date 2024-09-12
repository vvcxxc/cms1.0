<template>
    <div
        class="SaggerDamageStatistics-Page"
        :class="{ blackBlueBg: $store.state.color === 'blackBlue' }"
    >
        <div class="tip" ref="kongtiao2" v-if="tipchange">
            <div
                class="tiptop"
                @mousedown="mouseDownHandleelse2($event)"
                @mouseup="mouseUpHandleelse2($event)"
            >
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
                    <el-date-picker
                        :key="
                            $store.state.color === 'blackBlue'
                                ? 'blackBlueBg'
                                : 'normal'
                        "
                        :popper-class="
                            $store.state.color === 'blackBlue'
                                ? 'blackBlueBg'
                                : 'normal'
                        "
                        type="date"
                        v-model="seleTime"
                        placeholder="开始时间"
                        value-format="yyyy-MM-dd"
                        :style="{ marginRight: '10px' }"
                    ></el-date-picker>
                    <span>-</span>
                    <el-date-picker
                        :key="
                            $store.state.color === 'blackBlue'
                                ? 'blackBlueBg'
                                : 'normal'
                        "
                        :popper-class="
                            $store.state.color === 'blackBlue'
                                ? 'blackBlueBg'
                                : 'normal'
                        "
                        type="date"
                        v-model="seleTime2"
                        placeholder="结束时间"
                        value-format="yyyy-MM-dd"
                        :style="{ marginLeft: '10px' }"
                    ></el-date-picker>
                    <el-button
                        class="select-btn"
                        @click="GetProcessParamDataByTime"
                        >查询</el-button
                    >
                </div>
                <div class="select-print">
                    <el-button class="select-btn2" @click="htmlToPdf"
                        >打印预览</el-button
                    >
                    <el-button class="select-btn2" @click="doPrint"
                        >报表打印</el-button
                    >
                    <el-button class="select-btn3" @click="exportTable"
                        >导出</el-button
                    >
                </div>
            </div>
            <div class="content">
                <div class="table-content" id="table-content">
                    <el-table
                        :data="tableData"
                        :border="true"
                        style="width: 100%"
                        :summary-method="getSummaries"
                        show-summary
                    >
                        <el-table-column
                            prop="Sequence"
                            label="序号"
                            align="center"
                        >
                        </el-table-column>
                        <el-table-column
                            prop="RecordDate"
                            width="170"
                            label="归档时间"
                            align="center"
                        >
                        </el-table-column>
                        <el-table-column
                            prop="DaySaggerNumberNG"
                            label="日总破损次数"
                            align="center"
                        >
                            <template slot-scope="scope">
                                <div
                                    v-if="scope.row.IsMarkDaySaggerNumberNG"
                                    class="red"
                                >
                                    {{ scope.row.DaySaggerNumberNG }}
                                </div>
                                <span v-else class="white">{{
                                    scope.row.DaySaggerNumberNG
                                }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="SaggerNumberNGA"
                            label="早班破损次数"
                            align="center"
                        >
                            <template slot-scope="scope">
                                <div
                                    v-if="scope.row.IsMarkSaggerNumberNGA"
                                    class="red"
                                >
                                    {{ scope.row.SaggerNumberNGA }}
                                </div>
                                <span v-else class="white">{{
                                    scope.row.SaggerNumberNGA
                                }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="SaggerNumberNG1A"
                            label="一线破损次数"
                            align="center"
                        >
                            <template slot-scope="scope">
                                <div
                                    v-if="scope.row.IsMarkSaggerNumberNG1A"
                                    class="red"
                                >
                                    {{ scope.row.SaggerNumberNG1A }}
                                </div>
                                <span v-else class="white">{{
                                    scope.row.SaggerNumberNG1A
                                }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="SaggerNumberNG2A"
                            label="二线破损次数"
                            align="center"
                        >
                            <template slot-scope="scope">
                                <div
                                    v-if="scope.row.IsMarkSaggerNumberNG2A"
                                    class="red"
                                >
                                    {{ scope.row.SaggerNumberNG2A }}
                                </div>
                                <span v-else class="white">{{
                                    scope.row.SaggerNumberNG2A
                                }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="SaggerNumberNG3A"
                            label="三线破损次数"
                            align="center"
                        >
                            <template slot-scope="scope">
                                <div
                                    v-if="scope.row.IsMarkSaggerNumberNG3A"
                                    class="red"
                                >
                                    {{ scope.row.SaggerNumberNG3A }}
                                </div>
                                <span v-else class="white">{{
                                    scope.row.SaggerNumberNG3A
                                }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="SaggerNumberNG4A"
                            label="四线破损次数"
                            align="center"
                        >
                            <template slot-scope="scope">
                                <div
                                    v-if="scope.row.IsMarkSaggerNumberNG4A"
                                    class="red"
                                >
                                    {{ scope.row.SaggerNumberNG4A }}
                                </div>
                                <span v-else class="white">{{
                                    scope.row.SaggerNumberNG4A
                                }}</span>
                            </template>
                        </el-table-column>

                        <el-table-column
                            prop="SaggerNumberNGB"
                            label="晚班破损次数"
                            align="center"
                        >
                            <template slot-scope="scope">
                                <div
                                    v-if="scope.row.IsMarkSaggerNumberNGB"
                                    class="red"
                                >
                                    {{ scope.row.SaggerNumberNGB }}
                                </div>
                                <span v-else class="white">{{
                                    scope.row.SaggerNumberNGB
                                }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="SaggerNumberNG1B"
                            label="一线破损次数"
                            align="center"
                        >
                            <template slot-scope="scope">
                                <div
                                    v-if="scope.row.IsMarkSaggerNumberNG1B"
                                    class="red"
                                >
                                    {{ scope.row.SaggerNumberNG1B }}
                                </div>
                                <span v-else class="white">{{
                                    scope.row.SaggerNumberNG1B
                                }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="SaggerNumberNG2B"
                            label="二线破损次数"
                            align="center"
                        >
                            <template slot-scope="scope">
                                <div
                                    v-if="scope.row.IsMarkSaggerNumberNG2B"
                                    class="red"
                                >
                                    {{ scope.row.SaggerNumberNG2B }}
                                </div>
                                <span v-else class="white">{{
                                    scope.row.SaggerNumberNG2B
                                }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="SaggerNumberNG3B"
                            label="三线破损次数"
                            align="center"
                        >
                            <template slot-scope="scope">
                                <div
                                    v-if="scope.row.IsMarkSaggerNumberNG3B"
                                    class="red"
                                >
                                    {{ scope.row.SaggerNumberNG3B }}
                                </div>
                                <span v-else class="white">{{
                                    scope.row.SaggerNumberNG3B
                                }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="SaggerNumberNG4B"
                            label="四线破损次数"
                            align="center"
                        >
                            <template slot-scope="scope">
                                <div
                                    v-if="scope.row.IsMarkSaggerNumberNG4B"
                                    class="red"
                                >
                                    {{ scope.row.SaggerNumberNG4B }}
                                </div>
                                <span v-else class="white">{{
                                    scope.row.SaggerNumberNG4B
                                }}</span>
                            </template>
                        </el-table-column>
                    </el-table>
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
                    }, 0)}`;
                } else {
                    sums[index] = '-';
                }
            });

            return sums;
        },
        exportTable() {
            let filterVal = [
                'Sequence',
                'RecordDate',
                'DaySaggerNumberNG',
                'SaggerNumberNGA',
                'SaggerNumberNG1A',
                'SaggerNumberNG2A',
                'SaggerNumberNG3A',
                'SaggerNumberNG4A',
                'SaggerNumberNGB',
                'SaggerNumberNG1B',
                'SaggerNumberNG2B',
                'SaggerNumberNG3B',
                'SaggerNumberNG4B',
            ];
            let title = [
                '序号',
                '归档时间',
                '日总破损次数',
                '早班破损次数',
                '一线破损次数',
                '二线破损次数',
                '三线破损次数',
                '四线破损次数',
                '晚班破损次数',
                '一线破损次数',
                '二线破损次数',
                '三线破损次数',
                '四线破损次数',
            ];
            let tableList = [...this.tableData];
            tableList.push({
                Sequence: '合计',
                RecordDate: `${this.seleTime}--${this.seleTime2}`,
                DaySaggerNumberNG: tableList.reduce((prev, curr) => {
                    return Number(prev) + Number(curr.DaySaggerNumberNG);
                }, 0),
                SaggerNumberNGA: tableList.reduce((prev, curr) => {
                    return Number(prev) + Number(curr.SaggerNumberNGA);
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
                SaggerNumberNGB: tableList.reduce((prev, curr) => {
                    return Number(prev) + Number(curr.SaggerNumberNGB);
                }, 0),
                SaggerNumberNG1B: tableList.reduce((prev, curr) => {
                    return Number(prev) + Number(curr.SaggerNumberNG1B);
                }, 0),
                SaggerNumberNG2B: tableList.reduce((prev, curr) => {
                    return Number(prev) + Number(curr.SaggerNumberNG2B);
                }, 0),
                SaggerNumberNG3B: tableList.reduce((prev, curr) => {
                    return Number(prev) + Number(curr.SaggerNumberNG3B);
                }, 0),
                SaggerNumberNG4B: tableList.reduce((prev, curr) => {
                    return Number(prev) + Number(curr.SaggerNumberNG4B);
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
                        tableDatas: tableList,
                        sheetName: 'sheet1',
                    },
                    {
                        tHeader: title,
                        filterVal: filterVal,
                        tableDatas: tableList,
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
            let dom = document.getElementsByClassName('table-content')[0];
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
            let dom = document.getElementsByClassName('table-content')[0];
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
            this.$axios
                .get(
                    `/api/SaggerDamageStatistics/Query?st=${this.seleTime}&et=${this.seleTime2}`
                )
                .then((res) => {
                    if (res.data.code == 0) {
                        this.tableData = res.data.data;
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
    },
};
</script>
<style>
.SaggerDamageStatistics-Page .el-table--border td,
.SaggerDamageStatistics-Page .el-table--border th,
.SaggerDamageStatistics-Page
    .el-table__body-wrapper
    .el-table--border.is-scrolling-left
    ~ .el-table__fixed {
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
.SaggerDamageStatistics-Page
    .el-table--enable-row-hover
    .el-table__body
    tr:hover
    > td {
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
            overflow-y: scroll;
            .table-content {
                width: 100%;
                height: 100%;
                .rowInput {
                    width: 100%;
                    height: 100%;
                    border: none !important;
                    background: transparent;
                    color: #fff;
                    font-size: 16px;
                    text-align: center;
                }
                .left {
                    width: 100%;
                    text-align: left;
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
}
</style>