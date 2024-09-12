<template>
    <div
        class="oxygenContentReport-Page"
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
        <div class="page-center0">
            <div class="select">
                <div class="select-l">
                    <div class="page-title">窑炉含氧量-实时</div>
                    <el-button
                        class="select-btn"
                        @click="CurrentKilnContainsOxygenQuery"
                        >刷新</el-button
                    >
                </div>
                <div class="select-print">
                    <el-button
                        class="select-btn2"
                        @click="htmlToPdf('table-content1')"
                        >打印预览</el-button
                    >
                    <el-button
                        class="select-btn2"
                        @click="doPrint('table-content1')"
                        >报表打印</el-button
                    >
                    <el-button
                        class="select-btn3"
                        @click="exportTable('table-content1')"
                        >导出</el-button
                    >
                </div>
            </div>
            <div class="content">
                <div class="table-content1" id="table-content1">
                    <el-table
                        :data="currentData"
                        :border="true"
                        style="width: 100%"
                    >
                        <el-table-column
                            prop="RecordDate"
                            label="归档时间"
                            width="100"
                            align="center"
                        >
                        </el-table-column>
                        <el-table-column
                            prop="Unit"
                            label="含氧量"
                            width="90"
                            align="center"
                        >
                        </el-table-column>
                        <el-table-column
                            prop="KilnOxygen1"
                            label="窑炉1"
                            align="center"
                        >
                        </el-table-column>
                        <el-table-column
                            prop="KilnOxygen2"
                            label="窑炉2"
                            align="center"
                        >
                        </el-table-column>
                        <el-table-column
                            prop="KilnOxygen3"
                            label="窑炉3"
                            align="center"
                        >
                        </el-table-column>
                        <el-table-column
                            prop="KilnOxygen4"
                            label="窑炉4"
                            align="center"
                        >
                        </el-table-column>
                        <el-table-column
                            prop="KilnOxygen5"
                            label="窑炉5"
                            align="center"
                        >
                        </el-table-column>
                        <el-table-column
                            prop="KilnOxygen6"
                            label="窑炉6"
                            align="center"
                        >
                        </el-table-column>
                        <el-table-column
                            prop="KilnOxygen7"
                            label="窑炉7"
                            align="center"
                        >
                        </el-table-column>
                        <el-table-column
                            prop="KilnOxygen8"
                            label="窑炉8"
                            align="center"
                        >
                        </el-table-column>
                        <el-table-column
                            prop="KilnOxygen9"
                            label="窑炉9"
                            align="center"
                        >
                        </el-table-column>
                        <el-table-column
                            prop="KilnOxygen10"
                            label="窑炉10"
                            align="center"
                        >
                        </el-table-column>
                        <el-table-column
                            prop="KilnOxygen11"
                            label="窑炉11"
                            align="center"
                        >
                        </el-table-column>
                        <el-table-column
                            prop="KilnOxygen12"
                            label="窑炉12"
                            align="center"
                        >
                        </el-table-column>
                    </el-table>
                </div>
            </div>
        </div>

        <div class="page-center">
            <div class="select">
                <div class="select-l">
                    <div class="page-title">窑炉含氧量-统计</div>
                    <div class="select-text">查询时间：</div>
                    <el-date-picker
                        :key="
                            $store.state.color === 'blackBlue'
                                ? 'blackBlueBg'
                                : 'normal'
                        "
                        :popper-class="
                            $store.state.color === 'blackBlue'
                                ? 'blackBlueBg tpc'
                                : 'normal tpc'
                        "
                        type="datetime"
                        v-model="seleTime"
                        :clearable="false"
                        placeholder="开始时间"
                        value-format="yyyy-MM-dd HH:mm:ss"
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
                                ? 'blackBlueBg tpc'
                                : 'normal tpc'
                        "
                        type="datetime"
                        v-model="seleTime2"
                        :clearable="false"
                        placeholder="结束时间"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        :style="{ marginLeft: '10px' }"
                    ></el-date-picker>
                    <el-button
                        class="select-btn"
                        @click="GetProcessParamDataByTime(1)"
                        >查询</el-button
                    >
                </div>
                <div class="select-print">
                    <el-button
                        class="select-btn2"
                        @click="htmlToPdf('table-content2-area')"
                        >打印预览</el-button
                    >
                    <el-button
                        class="select-btn2"
                        @click="doPrint('table-content2-area')"
                        >报表打印</el-button
                    >
                    <el-button
                        class="select-btn2"
                        v-if="isBSystem"
                        @click="saveTable"
                        >报表保存</el-button
                    >
                    <el-button
                        class="select-btn3"
                        @click="exportTable('table-content2')"
                        >导出</el-button
                    >
                </div>
            </div>
            <div class="content">
                <div class="table-content2" id="table-content2">
                    <div class="table-content2-area">
                        <el-table
                            :data="tableData"
                            :border="true"
                            style="width: 100%"
                        >
                            <el-table-column
                                prop="RecordDate"
                                label="归档时间"
                                width="100"
                                align="center"
                            >
                            </el-table-column>
                            <el-table-column
                                prop="Unit"
                                label="含氧量"
                                width="90"
                                align="center"
                            >
                            </el-table-column>
                            <el-table-column
                                prop="KilnOxygen1"
                                label="窑炉1"
                                align="center"
                            >
                                <template slot-scope="scope">
                                    <input
                                        type="text"
                                        v-if="isBSystem"
                                        class="rowInput"
                                        v-model="scope.row.KilnOxygen1"
                                        @blur="isNumber"
                                    />
                                    <span v-else>{{
                                        scope.row.KilnOxygen1
                                    }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="KilnOxygen2"
                                label="窑炉2"
                                align="center"
                            >
                                <template slot-scope="scope">
                                    <input
                                        type="text"
                                        v-if="isBSystem"
                                        class="rowInput"
                                        v-model="scope.row.KilnOxygen2"
                                        @blur="isNumber"
                                    />
                                    <span v-else>{{
                                        scope.row.KilnOxygen2
                                    }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="KilnOxygen3"
                                label="窑炉3"
                                align="center"
                            >
                                <template slot-scope="scope">
                                    <input
                                        type="text"
                                        v-if="isBSystem"
                                        class="rowInput"
                                        v-model="scope.row.KilnOxygen3"
                                        @blur="isNumber"
                                    />
                                    <span v-else>{{
                                        scope.row.KilnOxygen3
                                    }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="KilnOxygen4"
                                label="窑炉4"
                                align="center"
                            >
                                <template slot-scope="scope">
                                    <input
                                        type="text"
                                        v-if="isBSystem"
                                        class="rowInput"
                                        v-model="scope.row.KilnOxygen4"
                                        @blur="isNumber"
                                    />
                                    <span v-else>{{
                                        scope.row.KilnOxygen4
                                    }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="KilnOxygen5"
                                label="窑炉5"
                                align="center"
                            >
                                <template slot-scope="scope">
                                    <input
                                        type="text"
                                        v-if="isBSystem"
                                        class="rowInput"
                                        v-model="scope.row.KilnOxygen5"
                                        @blur="isNumber"
                                    />
                                    <span v-else>{{
                                        scope.row.KilnOxygen5
                                    }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="KilnOxygen6"
                                label="窑炉6"
                                align="center"
                            >
                                <template slot-scope="scope">
                                    <input
                                        type="text"
                                        v-if="isBSystem"
                                        class="rowInput"
                                        v-model="scope.row.KilnOxygen6"
                                        @blur="isNumber"
                                    />
                                    <span v-else>{{
                                        scope.row.KilnOxygen6
                                    }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="KilnOxygen7"
                                label="窑炉7"
                                align="center"
                            >
                                <template slot-scope="scope">
                                    <input
                                        type="text"
                                        v-if="isBSystem"
                                        class="rowInput"
                                        v-model="scope.row.KilnOxygen7"
                                        @blur="isNumber"
                                    />
                                    <span v-else>{{
                                        scope.row.KilnOxygen7
                                    }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="KilnOxygen8"
                                label="窑炉8"
                                align="center"
                            >
                                <template slot-scope="scope">
                                    <input
                                        type="text"
                                        v-if="isBSystem"
                                        class="rowInput"
                                        v-model="scope.row.KilnOxygen8"
                                        @blur="isNumber"
                                    />
                                    <span v-else>{{
                                        scope.row.KilnOxygen8
                                    }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="KilnOxygen9"
                                label="窑炉9"
                                align="center"
                            >
                                <template slot-scope="scope">
                                    <input
                                        type="text"
                                        v-if="isBSystem"
                                        class="rowInput"
                                        v-model="scope.row.KilnOxygen9"
                                        @blur="isNumber"
                                    />
                                    <span v-else>{{
                                        scope.row.KilnOxygen9
                                    }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="KilnOxygen10"
                                label="窑炉10"
                                align="center"
                            >
                                <template slot-scope="scope">
                                    <input
                                        type="text"
                                        v-if="isBSystem"
                                        class="rowInput"
                                        v-model="scope.row.KilnOxygen10"
                                        @blur="isNumber"
                                    />
                                    <span v-else>{{
                                        scope.row.KilnOxygen10
                                    }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="KilnOxygen11"
                                label="窑炉11"
                                align="center"
                            >
                                <template slot-scope="scope">
                                    <input
                                        type="text"
                                        v-if="isBSystem"
                                        class="rowInput"
                                        v-model="scope.row.KilnOxygen11"
                                        @blur="isNumber"
                                    />
                                    <span v-else>{{
                                        scope.row.KilnOxygen11
                                    }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="KilnOxygen12"
                                label="窑炉12"
                                align="center"
                            >
                                <template slot-scope="scope">
                                    <input
                                        type="text"
                                        v-if="isBSystem"
                                        class="rowInput"
                                        v-model="scope.row.KilnOxygen12"
                                        @blur="isNumber"
                                    />
                                    <span v-else>{{
                                        scope.row.KilnOxygen12
                                    }}</span>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </div>
                <my-page
                    :pageData="pageData"
                    @req="GetProcessParamDataByTime"
                ></my-page>
            </div>
        </div>
    </div>
</template>
<script>
import html2Canvas from 'html2canvas';
import MyPage from '../../components/public/Pages.vue';
export default {
    components: {
        MyPage,
    },
    data() {
        return {
            isBSystem: false,
            tipword: '',
            tipchange: false,
            seleTime: '',
            seleTime2: '',
            tableData: [],
            currentData: [],
            pageData: {
                PageSize: 72,
                TotalCount: 0,
                TotalPage: 0,
                PageIndex: 1,
                LastEnabled: false,
                NextEnabled: false,
            },
        };
    },
    watch: {
        seleTime(n) {
            let list0 = n.split(' ');
            let list1 = list0[1].split(':');
            if (list1[2] != '00' || list1[1] != '00') {
                this.seleTime = list0[0] + ' ' + list1[0] + ':00:00';
            }
        },
        seleTime2(n) {
            let list0 = n.split(' ');
            let list1 = list0[1].split(':');
            if (list1[2] != '00' || list1[1] != '00') {
                this.seleTime2 = list0[0] + ' ' + list1[0] + ':00:00';
            }
        },
    },
    methods: {
        exportTable(_dom) {
            let filterVal = [
                'RecordDate',
                'Unit',
                'KilnOxygen1',
                'KilnOxygen2',
                'KilnOxygen3',
                'KilnOxygen4',
                'KilnOxygen5',
                'KilnOxygen6',
                'KilnOxygen7',
                'KilnOxygen8',
                'KilnOxygen9',
                'KilnOxygen10',
                'KilnOxygen11',
                'KilnOxygen12',
            ];
            let title = [
                '归档时间',
                '含氧量',
                '窑炉1',
                '窑炉2',
                '窑炉3',
                '窑炉4',
                '窑炉5',
                '窑炉6',
                '窑炉7',
                '窑炉8',
                '窑炉9',
                '窑炉10',
                '窑炉11',
                '窑炉12',
            ];
            if (_dom == 'table-content2') {
                if (!this.seleTime || !this.seleTime2) {
                    this.tipword = '未选择时间';
                    this.tipchange = true;
                    return;
                }
                this.$axios
                    .get(
                        `/api/KilnContainsOxygen/KilnContainsOxygenStaticsQuery?st=${this.seleTime}&et=${this.seleTime2}&argPageSize=${this.pageData.TotalCount}&argPageIndex=1&isSystemB=${this.isBSystem}`
                    )
                    .then((res) => {
                        if (res.data.code == 0) {
                            let tableList = res.data.data.DataList;
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
                                this.json2excel(
                                    excelDatas,
                                    '窑炉含氧量统计表',
                                    true,
                                    'xlsx'
                                );
                            });
                        } else {
                            this.tipword = res.data.msg;
                            this.tipchange = true;
                        }
                    });
            } else if (_dom == 'table-content1') {
                let tableList = [...this.currentData];
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
                    this.json2excel(
                        excelDatas,
                        '窑炉含氧量实时表',
                        true,
                        'xlsx'
                    );
                });
            }
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
        htmlToPdf(_dom) {
            let dom = document.getElementsByClassName(_dom)[0];
            html2Canvas(dom, {
                allowTaint: true,
                height: dom.scrollHeight,
                // windowHeight: dom.scrollHeight
            }).then(function (canvas) {
                let pageContent = canvas.toDataURL('image/jpeg');
                const printWindow = window.open('page.html');
                printWindow.document.write('<img src="' + pageContent + '" />');
            });
        },
        doPrint(_dom) {
            let dom = document.getElementsByClassName(_dom)[0];
            html2Canvas(dom, {
                allowTaint: true,
                height: dom.scrollHeight,
                // windowHeight: dom.scrollHeight
            }).then(function (canvas) {
                let pageContent = canvas.toDataURL('image/jpeg');
                const printWindow = window.open('page.html');
                printWindow.document.write('<img src="' + pageContent + '" />');
                setTimeout(() => {
                    printWindow.print();
                    printWindow.close();
                });
            });
        },
        CurrentKilnContainsOxygenQuery() {
            this.$axios
                .get(`/api/KilnContainsOxygen/CurrentKilnContainsOxygenQuery`)
                .then((res) => {
                    if (res.data.code == 0) {
                        this.currentData = [{ ...res.data.data }];
                    } else {
                        this.tipword = res.data.msg;
                        this.tipchange = true;
                    }
                });
        },
        GetProcessParamDataByTime(pageIndex) {
            if (!this.seleTime || !this.seleTime2) {
                this.tipword = '未选择时间';
                this.tipchange = true;
                return;
            }
            this.$axios
                .get(
                    `/api/KilnContainsOxygen/KilnContainsOxygenStaticsQuery?st=${this.seleTime}&et=${this.seleTime2}&argPageSize=72&argPageIndex=${pageIndex}&isSystemB=${this.isBSystem}`
                )
                .then((res) => {
                    if (res.data.code == 0) {
                        this.pageData = res.data.data.ParameterList;
                        this.tableData = res.data.data.DataList;
                    } else {
                        this.tipword = res.data.msg;
                        this.tipchange = true;
                    }
                });
        },

        objToArr(obj) {
            var arr = [];
            for (let i in obj) {
                let a = true;
                if (i != 'LineName' && i != 'LineIndex') {
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
            if (!this.seleTime || !this.seleTime2) {
                this.tipword = '未选择时间';
                this.tipchange = true;
                return;
            }
            let arr = [...this.tableData];
            this.$axios
                .patch(
                    `/api/KilnContainsOxygen/UpdateKilnContainsOxygenStatics`,
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
                    this.GetProcessParamDataByTime(1);
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
        addDate(days) {
            var d = new Date();
            d.setDate(d.getDate() + days);
            var m = d.getMonth() + 1;
            let h = d.getHours();
            h = h < 10 ? '0' + h : h;
            return (
                d.getFullYear() +
                '-' +
                m +
                '-' +
                d.getDate() +
                ' ' +
                h +
                ':00:00'
            );
        },
    },
    mounted() {
        this.isBSystem = eval(sessionStorage.getItem('isBSystem')) || false;
        this.seleTime = this.addDate(-1);
        this.seleTime2 = this.addDate(0);
        console.log('seleTime', this.seleTime);
        console.log('seleTime2', this.seleTime2);
        this.CurrentKilnContainsOxygenQuery();
        this.GetProcessParamDataByTime(1);
    },
};
</script>
<style>
.oxygenContentReport-Page .el-table--border td,
.oxygenContentReport-Page .el-table--border th,
.oxygenContentReport-Page
    .el-table__body-wrapper
    .el-table--border.is-scrolling-left
    ~ .el-table__fixed {
    border-right: 1px solid #304171;
    background: #121c3a;
}
.oxygenContentReport-Page .el-table td,
.el-table th.is-leaf {
    border-bottom: 1px solid #304171;
}
.oxygenContentReport-Page .el-table--border th.gutter:last-of-type {
    background: #1e304a;
}
.oxygenContentReport-Page
    .el-table--enable-row-hover
    .el-table__body
    tr:hover
    > td {
    background-color: #081027;
}
.tpc .el-time-spinner__wrapper {
    width: 100% !important;
}
.tpc .el-scrollbar:nth-of-type(2) {
    display: none !important;
}
</style>
<style lang="scss" scoped>
.oxygenContentReport-Page {
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

    .page-center,
    .page-center0 {
        width: 100%;
        height: calc(100% - 200px);
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
                .page-title {
                    margin-right: 10px;
                    height: 36px;
                    width: 150px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: #445992;
                    color: #fff;
                }
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
            padding: 20px 22px 0;
            .table-content1,
            .table-content2 {
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
            .table-content1 {
                padding-bottom: 20px;
            }
            .table-content2 {
                height: calc(100% - 60px);
                overflow-y: scroll;
                .table-content2-area {
                    width: 100%;
                    height: auto;
                }
            }
        }
        .content::-webkit-scrollbar {
            width: 0 !important;
        }
    }
    .page-center0 {
        height: 200px;
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