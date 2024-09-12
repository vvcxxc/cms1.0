<template>
    <div
        class="saggerDamageInquiry-Page"
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
                        type="datetime"
                        v-model="seleTime"
                        placeholder="查询时间"
                        default-time="12:00:00"
                        value-format="yyyy-MM-dd HH:mm:ss"
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
                        :span-method="objectSpanMethod"
                        :border="true"
                        style="width: 100%"
                    >
                        <el-table-column
                            prop="SaggerNumberNG1"
                            label="一号线匣钵破损数"
                            align="center"
                        >
                            <template slot-scope="scope">
                                <div
                                    v-if="
                                        scope.row.SaggerNumberNG1.indexOf(
                                            '记录人'
                                        ) >= 0
                                    "
                                    class="left white"
                                >
                                    {{ scope.row.SaggerNumberNG1 }}
                                </div>
                                <span
                                    v-else-if="scope.row.IsMarkSaggerNumberNG1"
                                    class="red"
                                    >{{ scope.row.SaggerNumberNG1 }}</span
                                >
                                <span v-else class="white">{{
                                    scope.row.SaggerNumberNG1
                                }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="SaggerNumberNG2"
                            label="二号线匣钵破损数"
                            align="center"
                        >
                            <template slot-scope="scope">
                                <div
                                    v-if="
                                        scope.row.SaggerNumberNG2.indexOf(
                                            '确认人'
                                        ) >= 0
                                    "
                                    class="left white"
                                >
                                    {{ scope.row.SaggerNumberNG2 }}
                                </div>
                                <span
                                    v-else-if="scope.row.IsMarkSaggerNumberNG2"
                                    class="red"
                                    >{{ scope.row.SaggerNumberNG2 }}</span
                                >
                                <span v-else class="white">{{
                                    scope.row.SaggerNumberNG2
                                }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            label="三号线匣钵破损数"
                            prop="SaggerNumberNG3"
                            align="center"
                        >
                            <template slot-scope="scope">
                                <span
                                    v-if="scope.row.IsMarkSaggerNumberNG3"
                                    class="red"
                                    >{{ scope.row.SaggerNumberNG3 }}</span
                                >
                                <span v-else class="white">{{
                                    scope.row.SaggerNumberNG3
                                }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            label="四号线匣钵破损数"
                            prop="SaggerNumberNG4"
                            align="center"
                        >
                            <template slot-scope="scope">
                                <span
                                    v-if="scope.row.IsMarkSaggerNumberNG4"
                                    class="red"
                                    >{{ scope.row.SaggerNumberNG4 }}</span
                                >
                                <span v-else class="white">{{
                                    scope.row.SaggerNumberNG4
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
            tableData: [],
        };
    },
    methods: {
        exportTable() {
            let filterVal = [
                'seleTime',
                'SaggerNumberNG1',
                'SaggerNumberNG2',
                'SaggerNumberNG3',
                'SaggerNumberNG4',
            ];
            let title = [
                '时间',
                '一号线匣钵破损数',
                '二号线匣钵破损数',
                '三号线匣钵破损数',
                '四号线匣钵破损数',
            ];
            let tableList = [
                ...this.tableData.map((_) => ({
                    ..._,
                    seleTime: this.seleTime,
                })),
            ];
            tableList.pop();
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
                this.json2excel(excelDatas, '匣钵破损次数表', true, 'xlsx');
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
        objectSpanMethod({ row, column, rowIndex, columnIndex }) {
            if (columnIndex === 0) {
                if (rowIndex === this.tableData.length - 1) {
                    return {
                        rowspan: 1,
                        colspan: 2,
                    };
                }
            }
            if (rowIndex === this.tableData.length - 1) {
                if (columnIndex === 1) {
                    return {
                        rowspan: 1,
                        colspan: 2,
                    };
                }
            }
        },
        GetProcessParamDataByTime() {
            if (!this.seleTime) {
                this.tipword = '未选择时间';
                this.tipchange = true;
                return;
            }
            this.$axios
                .get(`/api/SaggarDamageQuery/Query?time=${this.seleTime}`)
                .then((res) => {
                    if (res.data.code == 0) {
                        let temp = [{ ...res.data.data }];
                        temp.push({
                            SaggerNumberNG1: '记录人：',
                            SaggerNumberNG2: '确认人：',
                        });
                        console.log('temp', temp);
                        this.tableData = temp;
                    } else {
                        this.tipword = res.data.msg;
                        this.tipchange = true;
                    }
                });
        },

        isNumber(e, sumbit) {
            let s = '';
            if (sumbit) {
                s = e;
            } else {
                s = e.target.value;
            }
            if (s && isNaN(s)) {
                this.tipword = '输入数字格式错误';
                this.tipchange = true;
                return false;
            }
            return true;
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
        getNowTime() {
            let date = new Date(new Date().getTime() - 3000); //秒级查询，页面刷新太快，后端跟不上，提前几秒
            let y = date.getFullYear();
            let MM = date.getMonth() + 1;
            MM = MM < 10 ? '0' + MM : MM;
            let d = date.getDate();
            d = d < 10 ? '0' + d : d;
            let h = date.getHours();
            h = h < 10 ? '0' + h : h;
            let m = date.getMinutes();
            m = m < 10 ? '0' + m : m;
            let s = date.getSeconds();
            s = s < 10 ? '0' + s : s;
            return y + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s;
        },
    },
    mounted() {
        this.seleTime = this.getNowTime();
        this.GetProcessParamDataByTime();
    },
};
</script>
<style>
.saggerDamageInquiry-Page .el-table--border td,
.saggerDamageInquiry-Page .el-table--border th,
.saggerDamageInquiry-Page
    .el-table__body-wrapper
    .el-table--border.is-scrolling-left
    ~ .el-table__fixed {
    border-right: 1px solid #304171;
    background: #121c3a;
}
.saggerDamageInquiry-Page .el-table td,
.el-table th.is-leaf {
    border-bottom: 1px solid #304171;
}
.saggerDamageInquiry-Page .el-table--border th.gutter:last-of-type {
    background: #1e304a;
}
.saggerDamageInquiry-Page
    .el-table--enable-row-hover
    .el-table__body
    tr:hover
    > td {
    background-color: #081027;
}
</style>
<style lang="scss" scoped>
.saggerDamageInquiry-Page {
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