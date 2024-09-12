<template>
    <div class="workshop-Record">
        <div class="page-center">
            <div class="select">
                <div class="select-l">
                    <div class="select-text">查询时间：</div>
                    <el-date-picker class="hour-picker" v-model="formData.startTime" :key="
                        $store.state.color === 'blackBlue'
                            ? 'blackBlueBg hourPicker'
                            : 'normal hourPicker'
                    " :popper-class="
    $store.state.color === 'blackBlue'
        ? 'blackBlueBg hourPicker'
        : 'normal hourPicker'
" type="datetime" value-format="yyyy-MM-dd HH:mm:ss">
                    </el-date-picker>
                    <span class="dateicon">-</span>
                    <el-date-picker class="hour-picker" v-model="formData.endTime" :key="
                        $store.state.color === 'blackBlue'
                            ? 'blackBlueBg hourPicker'
                            : 'normal hourPicker'
                    " :popper-class="
    $store.state.color === 'blackBlue'
        ? 'blackBlueBg hourPicker'
        : 'normal hourPicker'
" type="datetime" placeholder="结束时间" value-format="yyyy-MM-dd HH:mm:ss">
                    </el-date-picker>
                    <el-button class="select-btn" @click="req(1)">查询</el-button>
                </div>
                <div class="select-print">
                    <el-button class="select-btn2" @click="addReport">新增报表</el-button>
                    <el-button class="select-btn2" @click="htmlToPdf">打印预览</el-button>
                    <el-button class="select-btn2" @click="doPrint">报表打印</el-button>
                    <!-- <el-button class="select-btn2" v-if="isBSystem" @click="saveTable">报表保存</el-button> -->
                    <el-button class="select-btn2" @click="saveReport">报表保存</el-button>
                    <el-button class="select-btn3" @click="exportData">导出</el-button>
                </div>
            </div>
            <div class="content">
                <div class="table-content" id="table-content">
                    <el-table :data="tableData" :border="true" style="width: 100%" :span-method="objectSpanMethod"
                        height='100%' :header-cell-style="headFirst" ref="mytable">
                        <el-table-column prop="DisplayTime" label="日期" width="150" :resizable="false" align="center">
                            <template slot-scope="scope">
                                <!-- <el-date-picker
                                    v-if="isBSystem" class="rowInput"
                                    :key="
                                    $store.state.color === 'blackBlue'
                                    ? 'blackBlueBg hourPicker'
                                    : 'normal hourPicker'
                                    " :popper-class="
                                    $store.state.color === 'blackBlue'
                                    ? 'blackBlueBg hourPicker'
                                    : 'normal hourPicker'
                                    "
                                    v-model="scope.row.RecordTime"
                                    type="date"
                                    size="small"
                                /> -->
                                <span>{{ scope.row.DisplayTime }}</span>
                            </template>
                        </el-table-column>

                        <el-table-column prop="ShiftName" label="班次" width="100" :resizable="false" align="center">
                            <template slot-scope="scope">
                                <span>{{ scope.row.ShiftName }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="GroupName" label="班组" width="120" align="center">
                            <template slot-scope="scope">
                                <div v-if="scope.$index % 9 === 8"></div>
                                <div v-else>
                                    <el-select v-model="scope.row.GroupName" v-if="isBSystem" popper-class="table-select"
                                        size="small" placeholder="请选择">
                                        <el-option v-for="item in classOptions" :key="item" :label="item" :value="item" />
                                    </el-select>
                                    <span v-else>{{ scope.row.GroupName }}</span>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="LineGroup" label="线组" width="120" align="center">
                            <template slot-scope="scope">
                                <div v-if="scope.$index % 9 === 8"></div>
                                <div v-else>
                                    <el-select v-model="scope.row.LineGroup" v-if="isBSystem" popper-class="table-select"
                                        size="small" placeholder="请选择">
                                        <el-option v-for="item in ['1', '2', '3', '4']" :key="item" :label="item"
                                            :value="item" />
                                    </el-select>
                                    <span v-else>{{ scope.row.LineGroup }}</span>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="TradeName" label="品名" align="center">
                            <template slot-scope="scope">
                                <div v-if="scope.$index % 9 === 8"></div>
                                <div v-else>
                                    <input type="text" v-if="isBSystem" class="rowInput" v-model="scope.row.TradeName"
                                        @blur="isNumber" />
                                    <span v-else>{{ scope.row.TradeName }}</span>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="BatchNumber" label="批号" align="center">
                            <template slot-scope="scope">
                                <div v-if="scope.$index % 9 === 8"></div>
                                <div v-else>
                                    <input type="text" v-if="isBSystem" class="rowInput" v-model="scope.row.BatchNumber"
                                        @blur="isNumber" />
                                    <span v-else>{{ scope.row.BatchNumber }}</span>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="Count" label="筛分数量（kg）" align="center">
                            <template slot-scope="scope">
                                <div v-if="scope.$index % 9 === 8"></div>
                                <div v-else>
                                    <input type="text" v-if="isBSystem" class="rowInput" v-model="scope.row.Count"
                                        @blur="isNumber" />
                                    <span v-else>{{ scope.row.Count }}</span>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="SaggerNumber" label="匣钵数" align="center">
                            <template slot-scope="scope">
                                <div v-if="scope.$index % 9 === 8"></div>
                                <div v-else>
                                    <input type="text" v-if="isBSystem" class="rowInput" v-model="scope.row.SaggerNumber"
                                        @blur="isNumber" />
                                    <span v-else>{{ scope.row.SaggerNumber }}</span>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="MeetProduction" label="达产标准" align="center">
                            <template slot-scope="scope">
                                <div v-if="scope.$index % 9 === 8"></div>
                                <div v-else>
                                    <input type="text" v-if="isBSystem" class="rowInput" v-model="scope.row.MeetProduction"
                                        @blur="isNumber" />
                                    <span v-else>{{ scope.row.MeetProduction }}</span>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="Remark" label="备注" align="center">
                            <template slot-scope="scope">
                                <div v-if="scope.$index % 9 === 8"></div>
                                <div v-else>
                                    <input type="text" v-if="isBSystem" class="rowInput" v-model="scope.row.Remark"
                                        @blur="isNumber" />
                                    <span v-else>{{ scope.row.Remark }}</span>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="MonitorA" width="100" label="交班班长" align="center">
                            <template slot-scope="scope">
                                <!-- <input type="text" v-if="isBSystem" class="rowInput" v-model="scope.row.FurnacePressure"
                                    @blur="isNumber" />
                                <span v-else>{{
                                        scope.row.FurnacePressure
                                }}</span> -->
                                <!-- <div v-if="scope.$index % 9 === 8"></div>
                                <div v-else> -->
                                <!-- <div v-if="[1, 2, 5, 6].includes(scope.$index % 9)" class="colTh">接班班长</div> -->
                                <!-- <div v-else> -->
                                <input type="text" v-if="isBSystem" class="rowInput" v-model="scope.row.MonitorA"
                                    @blur="isNumber" />
                                <span v-else>{{
                                    scope.row.MonitorA
                                }}</span>
                                <!-- </div> -->
                            </template>
                        </el-table-column>
                        <el-table-column prop="MonitorB" width="100" align="center">
                            <template slot-scope="scope">
                                <!-- <div v-if="scope.$index % 9 === 8"></div>
                                <div v-else> -->
                                <input type="text" v-if="isBSystem" class="rowInput" v-model="scope.row.MonitorB"
                                    @blur="isNumber" />
                                <span v-else>{{
                                    scope.row.MonitorB
                                }}</span>
                                <!-- </div> -->
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
            PageData: {
                PageSize: 40,
                TotalCount: 0,
                TotalPage: 0,
                PageIndex: 1,
                LastEnabled: false,
                NextEnabled: false,
            },
            isBSystem: true,
            formData: {
                startTime: '',
                endTime: '',
            },
            tableData: [],
            classOptions: [],
            pageIndex: 1,
            firstAdd: true,
            newTime: ''
        }
    },
    mounted() {
        setTimeout(() => {
            let a1 = $('.v-toolbar').height() * $('.v-toolbar')[0].style.zoom + 10 + $('.v-footer').height() * $('.v-footer')[0].style.zoom + 'px'
            $('.workshop-Record').css({ marginTop: $('.v-toolbar').height() * $('.v-toolbar')[0].style.zoom + 10 + 'px', height: `calc(100% - ${a1})` })
        })
        this.formData.startTime = this.$moment(new Date()).format('YYYY-MM-DD') + ' 00:00:00'
        this.formData.endTime = this.$moment(new Date()).format('YYYY-MM-DD') + ' 23:59:59'
        // this.isBSystem = eval(sessionStorage.getItem('isBSystem')) || false;
        this.req(1)
        this.getGroup()

    },
    methods: {
        addReport() {
            let date = ''
            if (this.firstAdd) {
                date = this.$moment(this.newTime).format('YYYY-MM-DD')
                this.firstAdd = false;
            } else {
                let oldDate = this.tableData[0].DisplayTime
                date = this.$moment(oldDate).add(1, 'd').format('YYYY-MM-DD')
            }
            this.tableData.unshift(
                {
                    customId: 'custom',
                    Index: 1,
                    DisplayTime: date,
                    ShiftName: '白班',
                    GroupName: '',
                    LineGroup: '',
                    TradeName: '',
                    BatchNumber: '',
                    Count: '',
                    SaggerNumber: '',
                    MeetProduction: '',
                    Remark: '',
                    MonitorA: '',
                    MonitorB: '',
                },
                {
                    customId: 'custom',
                    Index: 2,
                    DisplayTime: date,
                    ShiftName: '白班',
                    GroupName: '',
                    LineGroup: '',
                    TradeName: '',
                    BatchNumber: '',
                    Count: '',
                    SaggerNumber: '',
                    MeetProduction: '',
                    Remark: '',
                    MonitorA: '',
                    MonitorB: '',
                },
                {
                    customId: 'custom',
                    Index: 3,
                    DisplayTime: date,
                    ShiftName: '白班',
                    GroupName: '',
                    LineGroup: '',
                    TradeName: '',
                    BatchNumber: '',
                    Count: '',
                    SaggerNumber: '',
                    MeetProduction: '',
                    Remark: '',
                    MonitorA: '',
                    MonitorB: '',
                },
                {
                    customId: 'custom',
                    Index: 4,
                    DisplayTime: date,
                    ShiftName: '白班',
                    GroupName: '',
                    LineGroup: '',
                    TradeName: '',
                    BatchNumber: '',
                    Count: '',
                    SaggerNumber: '',
                    MeetProduction: '',
                    Remark: '',
                    MonitorA: '',
                    MonitorB: '',
                },
                {
                    customId: 'custom',
                    Index: 5,
                    DisplayTime: date,
                    ShiftName: '晚班',
                    GroupName: '',
                    LineGroup: '',
                    TradeName: '',
                    BatchNumber: '',
                    Count: '',
                    SaggerNumber: '',
                    MeetProduction: '',
                    Remark: '',
                    MonitorA: '',
                    MonitorB: '',
                },
                {
                    customId: 'custom',
                    Index: 6,
                    DisplayTime: date,
                    ShiftName: '晚班',
                    GroupName: '',
                    LineGroup: '',
                    TradeName: '',
                    BatchNumber: '',
                    Count: '',
                    SaggerNumber: '',
                    MeetProduction: '',
                    Remark: '',
                    MonitorA: '',
                    MonitorB: '',
                },
                {
                    customId: 'custom',
                    Index: 7,
                    DisplayTime: date,
                    ShiftName: '晚班',
                    GroupName: '',
                    LineGroup: '',
                    TradeName: '',
                    BatchNumber: '',
                    Count: '',
                    SaggerNumber: '',
                    MeetProduction: '',
                    Remark: '',
                    MonitorA: '',
                    MonitorB: '',
                },
                {
                    customId: 'custom',
                    Index: 8,
                    DisplayTime: date,
                    ShiftName: '晚班',
                    GroupName: '',
                    LineGroup: '',
                    TradeName: '',
                    BatchNumber: '',
                    Count: '',
                    SaggerNumber: '',
                    MeetProduction: '',
                    Remark: '',
                    MonitorA: '',
                    MonitorB: '',
                },
                {
                    customId: 'custom',
                    DisplayTime: '',
                    ShiftName: '',
                    GroupName: '',
                    LineGroup: '',
                    TradeName: '',
                    BatchNumber: '',
                    Count: '',
                    SaggerNumber: '',
                    MeetProduction: '',
                    Remark: '',
                    MonitorA: '',
                    MonitorB: '',
                }
            )
            this.$nextTick(() => {
                this.$refs.mytable.doLayout(); //解决表格错位
            });
        },
        isPositiveInteger(s) {
            //是否为正整数
            var re = /^[0-9]+$/;
            return re.test(s);
        },
        req(pageIndex, s) {
            console.log('11111');
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
            this.getData();
        },
        headFirst({ row, colunm, rowIndex, columnIndex }) {
            if (rowIndex === 0 && columnIndex === 10) {
                //这里为了是将第11列的表头隐藏，就形成了合并表头的效果
                return 'border-left: 1px solid #304171;border-right:none;background:#18314e;color:#fff;';
            }
            return 'background:#18314e;color:#fff;';
        },
        objectSpanMethod({ row, column, rowIndex, columnIndex }) {
            // 处理交接班长
            // if(rowIndex % 4 === 1 || rowIndex % 4 === 2) {
            // if ([1, 2, 5, 6].includes(rowIndex % 9)) {
            //     if (columnIndex === /* this.tableData[0].length - 1 */ 10) {
            //         return [2, 2]
            //     }
            // }
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
        saveReport() {
            let $this = this
            let data = this.tableData.filter((f, i) => i % 9 !== 8)
            for (let i = 0; i < data.length; i++) {
                if (data[i].GroupName === '') {
                    $this.message_Warn($this, '班组未填写，请填写！')
                    return
                }
                if (data[i].LineGroup === '') {
                    $this.message_Warn($this, '线组未填写，请填写！')
                    return
                }
            }
            let postData = data.map(item => ({
                ID: item.customId ? 0 : item.ID,
                Index: item.Index,
                RecordTime: item.DisplayTime,
                ShiftName: item.ShiftName,
                GroupName: item.GroupName,
                LineGroup: item.LineGroup,
                TradeName: item.TradeName,
                BatchNumber: item.BatchNumber,
                Count: item.Count,
                SaggerNumber: item.SaggerNumber,
                MeetProduction: item.MeetProduction,
                Remark: item.Remark,
                MonitorA: item.MonitorA,
                MonitorB: item.MonitorB,
            }))
            this.$axios({
                url: `api/WorkshopHandoverRecord/Save`,
                method: 'post',
                data: postData
            }).then(res => {
                if (res.data.code === 0) {
                    $this.message_Success($this, '保存成功！')
                    $this.req(1)
                } else {
                    $this.message_Error($this, res.data.msg)
                }
            })
        },
        exportData() {
            let $this = this
            this.$axios({
                url: `api/WorkshopHandoverRecord/Export?st=${this.formData.startTime}&et=${this.formData.endTime}`,
                method: 'get',
                data: this.tableData
            }).then(res => {
                if (res.data.code == 0) {
                    // let data = res.data.data
                    // let temp = [];
                    // for (let i in data) {
                    //     let t = {};
                    //     for (let j in data[i]) {
                    //         t[data[i][j].VName] = data[i][j].Value;
                    //     }
                    //     temp.push(t);
                    // }
                    let filterVal = [
                        'DisplayTime',
                        'ShiftName',
                        'GroupName',
                        'LineGroup',
                        'TradeName',
                        'BatchNumber',
                        'Count',
                        'SaggerNumber',
                        'MeetProduction',
                        'Remark',
                        'MonitorA',
                        'MonitorB',
                    ];
                    let title = [
                        '日期',
                        '班次',
                        '班组',
                        '线组',
                        '品名',
                        '批号',
                        '筛分数量(kg)',
                        '匣钵数',
                        '达产标准',
                        '备注',
                        '交班班长A',
                        '交班班长B'
                    ]
                    let tableList = [...res.data.data]
                    // tableList.pop()
                    require.ensure([], () => {
                        const { expor_json_to_excel } = require('../../vendor/Export2Excel');
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
                        ]
                        console.log('excelDatas', excelDatas);
                        this.json2excel(excelDatas, '车间交接记录表', true, 'xlsx');
                    });

                } else {
                    $this.message_Error($this, res.data.msg)
                }
            })
        },
        formatJson(filterVal, jsonData) {
            return jsonData.map(v => filterVal.map(j => v[j]));
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
        getData() {
            let $this = this
            $this.tableData = []
            this.$axios({
                url: `api/WorkshopHandoverRecord/Query?st=${this.formData.startTime}&et=${this.formData.endTime}&argPageSize=${this.PageData.PageSize}&argPageIndex=${this.pageIndex}`,
                method: 'get',
            }).then(res => {
                if (res.data.code === 0) {
                    $this.tableData = res.data.data.DataList
                    let lineCount = Math.ceil(res.data.data.DataList.length / 8)
                    for (let i = 1; i <= lineCount; i++) {
                        $this.tableData.splice((i * 8) + i - 1, 0, {})
                    }
                    this.firstAdd = true;
                    $this.PageData = res.data.data.ParameterList
                    $this.$nextTick(() => {
                        $this.$refs.mytable.doLayout(); //解决表格错位
                    });
                    this.getNewTime()
                } else {
                    $this.message_Error($this, res.data.msg)
                }
            })
        },
        getGroup() {
            let $this = this
            this.$axios({
                url: `api/WorkshopHandoverRecord/GetGroupName`,
                method: 'get',
            }).then(res => {
                if (res.data.code === 0) {
                    $this.classOptions = res.data.data
                } else {
                    $this.message_Error($this, res.data.msg)
                }
            })
        },
        getNewTime() {
            let $this = this
            this.$axios({
                url: `api/WorkshopHandoverRecord/GetNewTime`,
                method: 'get',
            }).then(res => {
                if (res.data.code === 0) {
                    this.newTime = res.data.data
                } else {
                    $this.message_Error($this, res.data.msg)
                }
            })
        },
    },
}

</script>
<style>
.workshop-Record .el-table--border td,
.workshop-Record .el-table--border th,
.workshop-Record .el-table__body-wrapper .el-table--border.is-scrolling-left~.el-table__fixed {
    border-right: 1px solid #304171;
    background: #121c3a;
}

.workshop-Record .el-table td,
.el-table th.is-leaf {
    border-bottom: 1px solid #304171;
}

.workshop-Record .el-table--border th.gutter:last-of-type {
    background: #1e304a;
}

.workshop-Record .el-table--enable-row-hover .el-table__body tr:hover>td {
    background-color: #081027;
}
</style>
<style lang="scss">
.table-select.el-select-dropdown {
    background: #1D2846;
    border: 1px solid #445992;
    color: #fff;

    .el-select-dropdown__item {
        background: #1D2846;
        color: #fff;

        &:hover {
            background: #409EFF;
        }

        &:focus {
            background: #409EFF;
        }
    }
}
</style>

<style lang="scss" scoped>
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

.colTh {
    width: 100%;
    height: 100%;
    text-align: left;
    padding-left: 10px;
    color: #fff;
    font-weight: bold;
    text-align: center;
}
</style>