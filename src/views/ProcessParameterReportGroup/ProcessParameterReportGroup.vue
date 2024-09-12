<template>
    <div
        class="ProcessParameterReport-Page"
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
                        class="hour-picker"
                        :key="
                            $store.state.color === 'blackBlue'
                                ? 'blackBlueBg hourPicker'
                                : 'normal hourPicker'
                        "
                        :popper-class="
                            $store.state.color === 'blackBlue'
                                ? 'blackBlueBg hourPicker'
                                : 'normal hourPicker'
                        "
                        type="datetime"
                        v-model="seleTime"
                        value-format="yyyy-MM-dd HH:mm:ss"
                    ></el-date-picker>
                    <span class="dateicon">-</span>
                    <el-date-picker
                        class="hour-picker"
                        :key="
                            $store.state.color === 'blackBlue'
                                ? 'blackBlueBg hourPicker'
                                : 'normal hourPicker'
                        "
                        :popper-class="
                            $store.state.color === 'blackBlue'
                                ? 'blackBlueBg hourPicker'
                                : 'normal hourPicker'
                        "
                        type="datetime"
                        v-model="seleEndTime"
                        placeholder="结束时间"
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
                    <el-button
                        class="select-btn2"
                        v-if="isBSystem"
                        @click="saveTable"
                        >报表保存</el-button
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
                        :cell-style="columnStyle"
                        :span-method="objectSpanMethod"
                        :border="true"
                        style="width: 100%"
                        :header-cell-style="headFirst"
                    >
                        <el-table-column
                            prop="LineIndex"
                            label="碳化线编号"
                            width="100"
                            :resizable="false"
                            align="center"
                        >
                            <template slot-scope="scope">
                                <div
                                    v-if="
                                        scope.row.LineIndex &&
                                        scope.row.LineIndex.indexOf('记录人') >=
                                            0
                                    "
                                    class="left white"
                                >
                                    {{ scope.row.LineIndex }}
                                </div>
                                <span v-else class="white">{{
                                    scope.row.LineIndex
                                }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="LineName"
                            width="90"
                            align="center"
                        >
                            <template slot-scope="scope">
                                <div
                                    v-if="
                                        scope.row.LineName &&
                                        scope.row.LineName.indexOf('确认人') >=
                                            0
                                    "
                                    class="left white"
                                >
                                    {{ scope.row.LineName }}
                                </div>
                                <span v-else class="white">{{
                                    scope.row.LineName
                                }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="T1" label="T1" align="center">
                            <template slot-scope="scope">
                                <input
                                    type="text"
                                    v-if="isBSystem"
                                    class="rowInput"
                                    v-model="scope.row.T1"
                                    @blur="isNumber"
                                />
                                <span v-else>{{ scope.row.T1 }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="T2" label="T2" align="center">
                            <template slot-scope="scope">
                                <input
                                    type="text"
                                    v-if="isBSystem"
                                    class="rowInput"
                                    v-model="scope.row.T2"
                                    @blur="isNumber"
                                />
                                <span v-else>{{ scope.row.T2 }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="T3" label="T3" align="center">
                            <template slot-scope="scope">
                                <input
                                    type="text"
                                    v-if="isBSystem"
                                    class="rowInput"
                                    v-model="scope.row.T3"
                                    @blur="isNumber"
                                />
                                <span v-else>{{ scope.row.T3 }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="T4" label="T4" align="center">
                            <template slot-scope="scope">
                                <input
                                    type="text"
                                    v-if="isBSystem"
                                    class="rowInput"
                                    v-model="scope.row.T4"
                                    @blur="isNumber"
                                />
                                <span v-else>{{ scope.row.T4 }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="T5" label="T5" align="center">
                            <template slot-scope="scope">
                                <input
                                    type="text"
                                    v-if="isBSystem"
                                    class="rowInput"
                                    v-model="scope.row.T5"
                                    @blur="isNumber"
                                />
                                <span v-else>{{ scope.row.T5 }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="T6" label="T6" align="center">
                            <template slot-scope="scope">
                                <input
                                    type="text"
                                    v-if="isBSystem"
                                    class="rowInput"
                                    v-model="scope.row.T6"
                                    @blur="isNumber"
                                />
                                <span v-else>{{ scope.row.T6 }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="T7" label="T7" align="center">
                            <template slot-scope="scope">
                                <input
                                    type="text"
                                    v-if="isBSystem"
                                    class="rowInput"
                                    v-model="scope.row.T7"
                                    @blur="isNumber"
                                />
                                <span v-else>{{ scope.row.T7 }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="T8" label="T8" align="center">
                            <template slot-scope="scope">
                                <input
                                    type="text"
                                    v-if="isBSystem"
                                    class="rowInput"
                                    v-model="scope.row.T8"
                                    @blur="isNumber"
                                />
                                <span v-else>{{ scope.row.T8 }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="T9" label="T9" align="center">
                            <template slot-scope="scope">
                                <input
                                    type="text"
                                    v-if="isBSystem"
                                    class="rowInput"
                                    v-model="scope.row.T9"
                                    @blur="isNumber"
                                />
                                <span v-else>{{ scope.row.T9 }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="T10" label="T10" align="center">
                            <template slot-scope="scope">
                                <input
                                    type="text"
                                    v-if="isBSystem"
                                    class="rowInput"
                                    v-model="scope.row.T10"
                                    @blur="isNumber"
                                />
                                <span v-else>{{ scope.row.T10 }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="T11" label="T11" align="center">
                            <template slot-scope="scope">
                                <input
                                    type="text"
                                    v-if="isBSystem"
                                    class="rowInput"
                                    v-model="scope.row.T11"
                                    @blur="isNumber"
                                />
                                <span v-else>{{ scope.row.T11 }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="T12" label="T12" align="center">
                            <template slot-scope="scope">
                                <input
                                    type="text"
                                    v-if="isBSystem"
                                    class="rowInput"
                                    v-model="scope.row.T12"
                                    @blur="isNumber"
                                />
                                <span v-else>{{ scope.row.T12 }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="T13" label="T13" align="center">
                            <template slot-scope="scope">
                                <input
                                    type="text"
                                    v-if="isBSystem"
                                    class="rowInput"
                                    v-model="scope.row.T13"
                                    @blur="isNumber"
                                />
                                <span v-else>{{ scope.row.T13 }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="T14" label="T14" align="center">
                            <template slot-scope="scope">
                                <input
                                    type="text"
                                    v-if="isBSystem"
                                    class="rowInput"
                                    v-model="scope.row.T14"
                                    @blur="isNumber"
                                />
                                <span v-else>{{ scope.row.T14 }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="T15" label="T15" align="center">
                            <template slot-scope="scope">
                                <input
                                    type="text"
                                    v-if="isBSystem"
                                    class="rowInput"
                                    v-model="scope.row.T15"
                                    @blur="isNumber"
                                />
                                <span v-else>{{ scope.row.T15 }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="NitrogenFlow"
                            label="氮气流量"
                            align="center"
                        >
                            <template slot-scope="scope">
                                <input
                                    type="text"
                                    v-if="isBSystem"
                                    class="rowInput"
                                    v-model="scope.row.NitrogenFlow"
                                    @blur="isNumber"
                                />
                                <span v-else>{{ scope.row.NitrogenFlow }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="AdvanceTime"
                            label="推进时间"
                            align="center"
                        >
                            <template slot-scope="scope">
                                <input
                                    type="text"
                                    v-if="isBSystem"
                                    class="rowInput"
                                    v-model="scope.row.AdvanceTime"
                                    @blur="isNumber"
                                />
                                <span v-else>{{ scope.row.AdvanceTime }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="FurnacePressure"
                            width="100"
                            label="炉压（pa）"
                            align="center"
                        >
                            <template slot-scope="scope">
                                <input
                                    type="text"
                                    v-if="isBSystem"
                                    class="rowInput"
                                    v-model="scope.row.FurnacePressure"
                                    @blur="isNumber"
                                />
                                <span v-else>{{
                                    scope.row.FurnacePressure
                                }}</span>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </div>
        </div>
        <div class="pages-container">
            <my-page :pageData="PageData" @req="req"></my-page>
        </div>
    </div>
</template>
<script>
import html2Canvas from 'html2canvas';
import JsPDF from 'jspdf';
import MyPage from '../../components/public/Pages.vue';
export default {
    components: {
        MyPage,
    },
    data() {
        return {
            tipword: '',
            tipchange: false,
            isBSystem: false,
            seleTime: '',
            seleEndTime: '',
            tableData: [],
            PageData: {
                PageSize: 6,
                TotalCount: 0,
                TotalPage: 0,
                PageIndex: 1,
                LastEnabled: false,
                NextEnabled: false,
            },
            pageIndex: 1,
        };
    },
    methods: {
        isPositiveInteger(s) {
            //是否为正整数
            var re = /^[0-9]+$/;
            return re.test(s);
        },
        req(pageIndex, s) {
            if (s == 'jump') {
                if (!this.isPositiveInteger(pageIndex)) {
                    this.tipchange = true;
                    this.tipword = this.lang.RoleManage_HT_PEAPositiveInteger;
                    return;
                } else {
                    if (
                        pageIndex !== 1 &&
                        pageIndex !== this.PageData.TotalPage
                    ) {
                        if (
                            pageIndex < 1 ||
                            pageIndex > this.PageData.TotalPage
                        ) {
                            this.tipchange = true;
                            this.tipword =
                                this.lang.DataGrid_Reaction_HT_PEThePageNumber;
                            return;
                        }
                    }
                }
            }
            this.pageIndex = pageIndex;
            this.GetProcessParamDataByTime();
        },
        exportTable() {
            this.$axios
                .get(
                    `/api/ProcessParameters/GetProcessParamDataListByTime?startTime=${this.seleTime}&endTime=${this.seleEndTime}&isBSystem=${this.isBSystem}&argPageSize=${this.PageData.TotalCount}&argPageIndex=1`
                )
                .then((res) => {
                    if (res.data.code == 0) {
                        let data = res.data.data.DataList;
                        let temp = [];
                        for (let i in data) {
                            let t = {};
                            for (let j in data[i]) {
                                t[data[i][j].VName] = data[i][j].Value;
                            }
                            temp.push(t);
                        }
                        let filterVal = [...Object.keys(temp[0])];
                        let title = [
                            '归档时间',
                            '碳化线编号',
                            '',
                            'T1',
                            'T2',
                            'T3',
                            'T4',
                            'T5',
                            'T6',
                            'T7',
                            'T8',
                            'T9',
                            'T10',
                            'T11',
                            'T12',
                            'T13',
                            'T14',
                            'T15',
                            '氮气流量',
                            '推进时间',
                            '炉压（pa）',
                        ];
                        let tableList = [...temp];
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
                            console.log('excelDatas', excelDatas);
                            this.json2excel(
                                excelDatas,
                                '工艺参数统计表',
                                true,
                                'xlsx'
                            );
                        });
                    } else {
                        this.tipword = res.data.msg;
                        this.tipchange = true;
                    }
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
                let pageDataHtml = canvas.toDataURL('image/jpeg');
                const printWindow = window.open('page.html');
                printWindow.document.write(
                    '<img src="' + pageDataHtml + '" />'
                );
            });
        },
        doPrint() {
            let dom = document.getElementsByClassName('table-content')[0];
            html2Canvas(dom, {
                allowTaint: true,
                height: dom.scrollHeight,
                // windowHeight: dom.scrollHeight
            }).then(function (canvas) {
                let pageDataHtml = canvas.toDataURL('image/jpeg');
                const printWindow = window.open('page.html');
                printWindow.document.write(
                    '<img src="' + pageDataHtml + '" />'
                );
                setTimeout(() => {
                    printWindow.print();
                    printWindow.close();
                });
            });
        },
        headFirst({ row, colunm, rowIndex, columnIndex }) {
            if (rowIndex === 0 && columnIndex === 0) {
                //这里为了是将第二列的表头隐藏，就形成了合并表头的效果
                return 'border-right:none;background:#18314e;color:#fff;';
            }
            return 'background:#18314e;color:#fff;';
        },
        columnStyle({ row, column, rowIndex, columnIndex }) {
            if (rowIndex != this.tableData.length - 1) {
                if (columnIndex == 0) {
                    return 'background:	#204361;borderBottom:#1D2B55 1px solid;';
                } else if (columnIndex == 1) {
                    return 'background:	#2A3058;borderBottom:#1D2B55 1px solid;';
                }
            }
        },
        objectSpanMethod({ row, column, rowIndex, columnIndex }) {
            if (columnIndex === 0) {
                if (rowIndex === this.tableData.length - 1) {
                    return {
                        rowspan: 1,
                        colspan: 8,
                    };
                } else if ((rowIndex + 1) % 3 === 1) {
                    return {
                        rowspan: 3,
                        colspan: 1,
                    };
                } else {
                    return {
                        rowspan: 0,
                        colspan: 0,
                    };
                }
            }
            if (columnIndex === 1) {
                if (rowIndex === this.tableData.length - 1) {
                    return {
                        rowspan: 1,
                        colspan: 12,
                    };
                } else {
                    return {
                        rowspan: 1,
                        colspan: 1,
                    };
                }
            }
        },
        GetProcessParamDataByTime() {
            if (!this.seleTime || !this.seleEndTime) {
                this.tipword = '未选择时间';
                this.tipchange = true;
                return;
            }
            this.$axios
                .get(
                    `/api/ProcessParameters/GetProcessParamDataListByTime?startTime=${this.seleTime}&endTime=${this.seleEndTime}&isBSystem=${this.isBSystem}&argPageSize=6&argPageIndex=${this.pageIndex}`
                )
                .then((res) => {
                    if (res.data.code == 0) {
                        console.log('res.data', res.data.data);
                        this.PageData = res.data.data.ParameterList;
                        let data = res.data.data.DataList;
                        let temp = [];
                        for (let i in data) {
                            let t = {};
                            for (let j in data[i]) {
                                t[data[i][j].VName] = data[i][j].Value;
                            }
                            temp.push(t);
                        }
                        temp.push({
                            LineIndex: '记录人：',
                            LineName: '确认人：',
                        });
                        this.tableData = temp;
                    } else {
                        this.tipword = res.data.msg;
                        this.tipchange = true;
                    }
                });
        },
        objToArr(obj) {
            var arr = [];
            for (let i in obj) {
                if (
                    obj[i].indexOf('记录人') >= 0 ||
                    obj[i].indexOf('确认人') >= 0
                ) {
                    break; //这种情况别循环了直接退吧
                } else {
                    let a = true;
                    if (i != 'LineName' && i != 'LineIndex' && i != 'Time') {
                        a = this.isNumber(obj[i], true);
                    }
                    a &&
                        arr.push({
                            VName: i,
                            Value: obj[i],
                        });
                    if (!a) {
                        return false;
                    }
                }
            }
            return arr;
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
        saveTable() {
            if (!this.seleTime || !this.seleEndTime) {
                this.tipword = '未选择时间';
                this.tipchange = true;
                return;
            }
            let arr = [];
            let temp = [...this.tableData];
            for (let i in temp) {
                let a = this.objToArr(temp[i]);
                a && a.length && arr.push(a);
                if (!a) {
                    return;
                }
            }
            this.$axios
                .post(
                    `/api/ProcessParameters/EditProductionParamListData?time=${this.tableData[0].Time}`,
                    arr
                )
                .then((res) => {
                    //弹窗保存成功
                    if (res.data.code == 0) {
                        this.tipword = '保存成功';
                        this.tipchange = true;
                    } else {
                        this.tipword = res.data.msg;
                        this.tipchange = true;
                    }
                    this.GetProcessParamDataByTime();
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
        getNowTime() {
            let date = new Date();
            let y = date.getFullYear();
            console.log('y', y);
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
            return y + '-' + MM + '-' + d + ' ' + h + ':00:00';
        },
        dd() {
            let arr = document.getElementsByClassName('el-scrollbar');
            console.log('arr', arr);
        },
    },
    mounted() {
        this.seleTime = this.$getDate(
            new Date(new Date().toLocaleDateString()).getTime()
        );
        this.seleEndTime = this.getNowTime();
        this.isBSystem = eval(sessionStorage.getItem('isBSystem')) || false;
        this.GetProcessParamDataByTime();
    },
};
</script>
<style>
.ProcessParameterReport-Page .el-table--border td,
.ProcessParameterReport-Page .el-table--border th,
.ProcessParameterReport-Page
    .el-table__body-wrapper
    .el-table--border.is-scrolling-left
    ~ .el-table__fixed {
    border-right: 1px solid #304171;
    background: #121c3a;
}
.ProcessParameterReport-Page .el-table td,
.el-table th.is-leaf {
    border-bottom: 1px solid #304171;
}
.ProcessParameterReport-Page .el-table--border th.gutter:last-of-type {
    background: #1e304a;
}
.ProcessParameterReport-Page
    .el-table--enable-row-hover
    .el-table__body
    tr:hover
    > td {
    background-color: #081027;
}
/* .hourPicker .el-scrollbar:nth-child(1) {
    width: 180px !important;
}
.hourPicker .el-scrollbar:nth-child(2),
.hourPicker .el-scrollbar:nth-child(3) {
    display: none;
} */
</style>
<style lang="scss" scoped>
.ProcessParameterReport-Page {
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
        height: calc(100% - 60px);
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
    .dateicon {
        padding: 0 5px;
    }
}
</style>