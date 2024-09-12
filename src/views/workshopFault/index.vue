<template>
    <div class="workshop-Fault">
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
                    <el-table ref="mytable" :data="tableData" :border="true" style="width: 100%"
                        :header-cell-style="headFirst" height='100%'>
                        <el-table-column prop="FaultWorkshop" label="故障车间" width="150" :resizable="false" align="center">
                            <template slot-scope="scope">
                                <input type="text" v-if="isBSystem" class="rowInput" v-model="scope.row.FaultWorkshop"
                                    @beforecut="copy($event)" @paste='pasteDescription($event)' @blur="isNumber" />
                                <span v-else>{{ scope.row.FaultWorkshop }}</span>
                            </template>
                        </el-table-column>

                        <el-table-column prop="Location" label="异常地点" width="100" :resizable="false" align="center">
                            <template slot-scope="scope">
                                <input type="text" v-if="isBSystem" class="rowInput" v-model="scope.row.Location"
                                    @blur="isNumber" />
                                <span v-else>{{ scope.row.Location }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="Remark" label="异常描述" align="center">
                            <template slot-scope="scope">
                                <input type="text" v-if="isBSystem" class="rowInput" v-model="scope.row.Remark"
                                    @blur="isNumber" />
                                <span v-else>{{ scope.row.Remark }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="ServiceName" label="异常设备" align="center">
                            <template slot-scope="scope">
                                <input type="text" v-if="isBSystem" class="rowInput" v-model="scope.row.ServiceName"
                                    @blur="isNumber" />
                                <span v-else>{{ scope.row.ServiceName }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="DisplayRepairTime" label="报修时间" align="center">
                            <template slot-scope="scope">
                                <!-- <input type="text" v-if="isBSystem" class="rowInput" v-model="scope.row.DisplayRepairTime"
                                    @blur="isNumber" /> -->
                                <el-date-picker v-if="isBSystem" class="rowInput" :key="
                                    $store.state.color === 'blackBlue'
                                        ? 'blackBlueBg hourPicker'
                                        : 'normal hourPicker'
                                " :popper-class="
    $store.state.color === 'blackBlue'
        ? 'blackBlueBg hourPicker'
        : 'normal hourPicker'
" v-model="scope.row.DisplayRepairTime" value-format="yyyy-MM-dd HH:mm" format="yyyy-MM-dd HH:mm" type="datetime"
                                    size="small" />
                                <span v-else>{{ scope.row.DisplayRepairTime }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="DisplayRepairStartTime" label="维修开始时间" align="center">
                            <template slot-scope="scope">
                                <!-- <input type="text" v-if="isBSystem" class="rowInput" v-model="scope.row.DisplayRepairStartTime"
                                    @blur="isNumber" /> -->
                                <el-date-picker v-if="isBSystem" class="rowInput" :key="
                                    $store.state.color === 'blackBlue'
                                        ? 'blackBlueBg hourPicker'
                                        : 'normal hourPicker'
                                " :popper-class="
    $store.state.color === 'blackBlue'
        ? 'blackBlueBg hourPicker'
        : 'normal hourPicker'
" v-model="scope.row.DisplayRepairStartTime" value-format="yyyy-MM-dd HH:mm" format="yyyy-MM-dd HH:mm" type="datetime"
                                    size="small" />
                                <span v-else>{{ scope.row.DisplayRepairStartTime }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="DisplayRepairEndTime" label="维修完成时间" align="center">
                            <template slot-scope="scope">
                                <!-- <input type="text" v-if="isBSystem" class="rowInput" v-model="scope.row.DisplayRepairEndTime"
                                    @blur="isNumber" /> -->
                                <el-date-picker v-if="isBSystem" class="rowInput" :key="
                                    $store.state.color === 'blackBlue'
                                        ? 'blackBlueBg hourPicker'
                                        : 'normal hourPicker'
                                " :popper-class="
    $store.state.color === 'blackBlue'
        ? 'blackBlueBg hourPicker'
        : 'normal hourPicker'
" v-model="scope.row.DisplayRepairEndTime" value-format="yyyy-MM-dd HH:mm" format="yyyy-MM-dd HH:mm" type="datetime"
                                    size="small" />
                                <span v-else>{{ scope.row.DisplayRepairEndTime }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="FaultTime" label="故障总时长" align="center">
                            <template slot-scope="scope">
                                <span>
                                    {{
                                        isNaN($moment(scope.row.DisplayRepairEndTime).diff($moment(scope.row.DisplayRepairStartTime),
                                            'minutes'))
                                        ? ''
                                        :
                                        formatTime($moment(scope.row.DisplayRepairEndTime).diff($moment(scope.row.DisplayRepairStartTime),
                                            'minutes'))
                                    }}
                                </span>
                                <!-- <span>{{ scope.row.DisplayRepairEndTime }} --- {{ scope.row.DisplayRepairStartTime }}</span> -->
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
                PageSize: 50,
                TotalCount: 0,
                TotalPage: 0,
                PageIndex: 1,
                LastEnabled: false,
                NextEnabled: false,
            },
            formData: {
                startTime: '',
                endTime: '',
            },
            isBSystem: true,
            tableData: [
                {
                    ID: "",
                    FaultWorkshop: "",
                    Location: "",
                    Remark: "",
                    ServiceName: "",
                    DisplayRepairTime: "",
                    DisplayRepairStartTime: "",
                    DisplayRepairEndTime: "",
                    FaultTime: ''
                }
            ],
            pageIndex: 1,
        }
    },
    mounted() {
        setTimeout(() => {
            let a1 = $('.v-toolbar').height() * $('.v-toolbar')[0].style.zoom + 10 + $('.v-footer').height() * $('.v-footer')[0].style.zoom + 'px'
            $('.workshop-Fault').css({ marginTop: $('.v-toolbar').height() * $('.v-toolbar')[0].style.zoom + 10 + 'px', height: `calc(100% - ${a1})` })
        })
        // this.isBSystem = eval(sessionStorage.getItem('isBSystem')) || false;
        this.formData.startTime = this.$moment(new Date()).format('YYYY-MM-DD') + ' 00:00:00'
        this.formData.endTime = this.$moment(new Date()).format('YYYY-MM-DD') + ' 23:59:59'
        this.req(1)
    },
    methods: {
        copyFn() {
            console.log("copy");
        },
        pasteDescription(event) {
            var pastedText = undefined
            if (event.clipboardData && event.clipboardData.getData) {
                pastedText = event.clipboardData.getData('Text')
            } else {
                pastedText = event.originalEvent.clipboardData.getData('Text')
            }
            //计算行数
            var rows = pastedText.split("\n")
            var rowsNum = rows.length - 1
            if (rowsNum > 5) {
                let result = pastedText.replace(/\n/g, '')
                console.log(result)
                this.ruleForm.description = ''
            } else {
                console.log(pastedText)
            }

        },
        addReport() {
            this.tableData.unshift(
                {
                    customId: "custom",
                    FaultWorkshop: "",
                    Location: "",
                    Remark: "",
                    ServiceName: "",
                    DisplayRepairTime: this.$moment(new Date()).format('YYYY-MM-DD HH:mm'),
                    DisplayRepairStartTime: this.$moment(new Date()).format('YYYY-MM-DD HH:mm'),
                    DisplayRepairEndTime: this.$moment(new Date()).format('YYYY-MM-DD') + ' 23:59',
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
            return 'background:#18314e;color:#fff;';
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
        saveReport() {
            let $this = this
            for (let i = 0; i < this.tableData.length; i++) {
                if (this.tableData[i].FaultWorkshop === '') {
                    $this.message_Warn($this, '故障车间未填写，请填写！')
                    return
                }
                if (this.tableData[i].Location === '') {
                    $this.message_Warn($this, '异常地点未填写，请填写！')
                    return
                }
                if (this.tableData[i].Remark === '') {
                    $this.message_Warn($this, '异常描述未填写，请填写！')
                    return
                }
                if (this.tableData[i].ServiceName === '') {
                    $this.message_Warn($this, '异常设备未填写，请填写！')
                    return
                }
                if (this.tableData[i].DisplayRepairTime === '') {
                    $this.message_Warn($this, '报修时间未填写，请填写！')
                    return
                }
                if (this.tableData[i].DisplayRepairStartTime === '') {
                    $this.message_Warn($this, '维修开始未填写，请填写！')
                    return
                }
                if (this.tableData[i].DisplayRepairEndTime === '') {
                    $this.message_Warn($this, '维修完成时间未填写，请填写！')
                    return
                }
                if (this.$moment(this.tableData[i].DisplayRepairStartTime).diff(this.$moment(this.tableData[i].DisplayRepairTime), 'minutes') < 0) {
                    $this.message_Warn($this, '报修时间大于维修开始时间, 无法保存！')
                    return
                }
                if (this.$moment(this.tableData[i].DisplayRepairEndTime).diff(this.$moment(this.tableData[i].DisplayRepairStartTime), 'minutes') < 0) {
                    $this.message_Warn($this, '维修完成时间大于维修开始时间, 无法保存！')
                    return
                }
            }
            // 
            let postData = this.tableData.map(item => ({
                ID: item.customId ? 0 : item.ID,
                FaultWorkshop: item.FaultWorkshop,
                Location: item.Location,
                Remark: item.Remark,
                ServiceName: item.ServiceName,
                RepairTime: item.DisplayRepairTime,
                RepairStartTime: item.DisplayRepairStartTime,
                RepairEndTime: item.DisplayRepairEndTime,
            }))
            this.$axios({
                url: `api/WorkshopHandoverFault/Save`,
                method: 'post',
                data: postData,
            }).then(res => {
                if (res.data.code === 0) {
                    $this.message_Success($this, '保存成功！')
                    $this.req(1)
                } else {
                    $this.message_Error($this, res.data.msg)
                }
            })
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
            this.$axios({
                url: `api/WorkshopHandoverFault/Query?st=${this.formData.startTime}&et=${this.formData.endTime}&argPageSize=${this.PageData.PageSize}&argPageIndex=${this.pageIndex}`,
                method: 'get'
            }).then(res => {
                if (res.data.code === 0) {
                    $this.tableData = res.data.data.DataList.map(item => ({
                        ...item,
                        DisplayRepairTime: $this.$moment(new Date(item.DisplayRepairTime)).format('YYYY-MM-DD HH:mm'),
                        DisplayRepairStartTime: $this.$moment(new Date(item.DisplayRepairStartTime)).format('YYYY-MM-DD HH:mm'),
                        DisplayRepairEndTime: $this.$moment(new Date(item.DisplayRepairEndTime)).format('YYYY-MM-DD HH:mm'),
                    }))
                    $this.PageData = res.data.data.ParameterList
                } else {
                    $this.message_Error($this, res.data.msg)
                }
                this.$nextTick(() => {
                    this.$refs.mytable.doLayout(); //解决表格错位
                });
            })
        },
        exportData() {
            let $this = this
            this.$axios({
                url: `api/WorkshopHandoverFault/Export?st=${this.formData.startTime}&et=${this.formData.endTime}`,
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
                        'FaultWorkshop',
                        'Location',
                        'Remark',
                        'ServiceName',
                        'DisplayRepairTime',
                        'DisplayRepairStartTime',
                        'DisplayRepairEndTime',
                        'FaultTime',
                    ];
                    let title = [
                        '故障车间',
                        '异常地点',
                        '异常描述',
                        '异常设备',
                        '报修时间',
                        '维修开始时间',
                        '维修完成时间',
                        '故障总时长',
                    ]
                    let tableList = [...res.data.data]
                    tableList = tableList.map(item => ({
                        ...item,
                        FaultTime: this.formatTime(this.$moment(item.DisplayRepairEndTime).diff(this.$moment(item.DisplayRepairStartTime), 'minutes'))
                    }))
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
                        $this.json2excel(excelDatas, '车间交接故障表', true, 'xlsx');
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
        formatTime(value) {
            let str = ``
            if (value >= 1440) {
                // 天数转换
                let day = Math.floor(value / 1440)
                str += `${day}天`
                let hour = value - 1440 * day
                hour === 0 ? '' : str += this.formatHour(value - 1440 * day)
                return str
            }
            if (value >= 60) {
                str = this.formatHour(value)
                return str
            }
            return value + '分钟'
        },
        formatHour(value) {
            // 小时抓换
            let str = ``
            let hour = Math.floor(value / 60)
            hour === 0 ? '' : str += `${hour}小时`
            let min = value - 60 * hour
            min === 0 ? '' : str += `${min}分钟`
            return str
        }
    },
}

</script>
<style>
.workshop-Fault .el-table--border td,
.workshop-Fault .el-table--border th,
.workshop-Fault .el-table__body-wrapper .el-table--border.is-scrolling-left~.el-table__fixed {
    border-right: 1px solid #304171;
    background: #121c3a;
}

.workshop-Fault .el-table td,
.el-table th.is-leaf {
    border-bottom: 1px solid #304171;
}

.workshop-Fault .el-table--border th.gutter:last-of-type {
    background: #1e304a;
}

.workshop-Fault .el-table--enable-row-hover .el-table__body tr:hover>td {
    background-color: #081027;
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
</style>