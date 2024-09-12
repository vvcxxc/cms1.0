<template>
    <div class="ProcessParameterReport-Page" :class="{ blackBlueBg: $store.state.color === 'blackBlue' }">
        <div class="tip" ref="kongtiao2" v-if="tipchange">
            <div class="tiptop" @mousedown="mouseDownHandleelse2($event)" @mouseup="mouseUpHandleelse2($event)">
                <img src="../../assets/images/gth.png" alt>
                <span>提示</span>
            </div>
            <div class="tipcontanin">
                <div class="tipword">{{tipword}}</div>
                <div class="tipdetermine" @click="tip1">确定</div>
            </div>
        </div>
        <div class="page-center">
            <div class="select">
                <div class="select-l">
                    <div class="select-text">窑炉选择：</div>
                    <div class="select-content">
                        <el-select v-model="curSelectItem" placeholder="Select" :popper-append-to-body="false">
                            <el-option v-for="item in KilnsList" :key="item.Id" :label="item.Name" :value="item.Id">
                            </el-option>
                        </el-select>
                    </div>

                    <el-button class="select-btn" @click="GetRealTimeProductionData">刷新</el-button>
                </div>
                <div class="select-print">
                    <el-button class="select-btn2" @click="htmlToPdf">打印预览</el-button>
                    <el-button class="select-btn2" @click="doPrint">报表打印</el-button>
                    <el-button class="select-btn2" v-if="isBSystem" @click="saveTable">报表保存</el-button>
                    <el-button class="select-btn3" @click="exportTable">导出</el-button>
                </div>
            </div>
            <div class="content">
                <div class="table-content" id="table-content">
                    <div class="table-item">
                        <div class="table-time">
                            <div class="table-title-time">时间</div>
                            <div class="table-info-time">{{Time}}</div>
                        </div>
                        <div class="table-info">
                            <div class="table-info-child">
                                <div class="clomn">
                                    <div class="row"></div>
                                    <div class="row">实际温度</div>
                                    <div class="row">设定温度</div>
                                    <div class="row">目标温度</div>
                                </div>
                                <div class="clomn"
                                    v-for="item in ReportDetailModels.filter((i)=>{ return i.Tag.indexOf('U') >= 0  })"
                                    :key="item.Tag">
                                    <div class="row">{{item.Tag }}</div>
                                    <div class="row">
                                        <input type="text" v-if="isBSystem" class="rowInput"
                                            v-model="item.RealTemperature" @blur="isNumber">
                                        <span v-else>{{item.RealTemperature}}</span>
                                    </div>
                                    <div class="row">
                                        <input type="text" v-if="isBSystem" class="rowInput"
                                            v-model="item.SetTemperature" @blur="isNumber">
                                        <span v-else>{{item.SetTemperature}}</span>
                                    </div>
                                    <div class="row">
                                        <input type="text" v-if="isBSystem" class="rowInput"
                                            v-model="item.TargetTemperature" @blur="isNumber">
                                        <span v-else>{{item.TargetTemperature}}</span>
                                    </div>

                                </div>
                            </div>

                            <div class="table-info-child">
                                <div class="clomn">
                                    <div class="row"></div>
                                    <div class="row">实际温度</div>
                                    <div class="row">设定温度</div>
                                    <div class="row">目标温度</div>
                                </div>
                                <div class="clomn"
                                    v-for="item in ReportDetailModels.filter((i)=>{ return i.Tag.indexOf('D') >= 0 })"
                                    :key="item.Tag">
                                    <div class="row">{{ item.Tag }}</div>
                                    <div class="row">
                                        <input type="text" v-if="isBSystem" class="rowInput"
                                            v-model="item.RealTemperature" @blur="isNumber">
                                        <span v-else>{{item.RealTemperature}}</span>
                                    </div>
                                    <div class="row">
                                        <input type="text" v-if="isBSystem" class="rowInput"
                                            v-model="item.SetTemperature" @blur="isNumber">
                                        <span v-else>{{item.SetTemperature}}</span>
                                    </div>
                                    <div class="row">
                                        <input type="text" v-if="isBSystem" class="rowInput"
                                            v-model="item.TargetTemperature" @blur="isNumber">
                                        <span v-else>{{item.TargetTemperature}}</span>
                                    </div>
                                </div>
                            </div>
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
import { debuglog, log } from 'util';
export default {
    data() {
        return {
            tipword: '',
            tipchange: false,
            isBSystem: false,
            KilnsList: [],
            curSelectItem: '',
            curSelectItemfirst: true,
            selectTime: '',
            Time: '',
            ReportDetailModels: []
        };
    },
    watch: {
        curSelectItem(val) {
            if (val && !this.curSelectItemfirst) {
                this.GetRealTimeProductionData();
            }
        }
    },
    methods: {
        exportTable() {
            let Type = ['时间', '温区'],
                RealTemperature = { 时间: this.Time, 温区: '实际温度' },
                SetTemperature = { 时间: this.Time, 温区: '设定温度' },
                TargetTemperature = { 时间: this.Time, 温区: '目标温度' }
            for (let j in this.ReportDetailModels) {
                let wj = this.ReportDetailModels[j];
                Type.push(wj.Tag);
                RealTemperature[wj.Tag] = wj.RealTemperature;
                SetTemperature[wj.Tag] = wj.SetTemperature;
                TargetTemperature[wj.Tag] = wj.TargetTemperature;
            }
            let arr = [RealTemperature, SetTemperature, TargetTemperature];

            require.ensure([], () => {
                const {
                    expor_json_to_excel
                } = require('../../vendor/Export2Excel');
                let excelDatas = [
                    {
                        tHeader: Type,
                        filterVal: Type,
                        tableDatas: arr,
                        sheetName: this.Time
                    },
                    {
                        tHeader: Type,
                        filterVal: Type,
                        tableDatas: arr,
                        sheetName: this.Time
                    } //不知道源码为啥删一次，写两次才正常
                ];
                this.json2excel(excelDatas, '生产实时报表', true, 'xlsx');
            });
        },
        json2excel(tableJson, filenames, autowidth, bookTypes) {
            let that = this;
            //这个是引用插件
            import('@/vendor/Export2Excel').then(excel => {
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
                    bookType: bookTypes
                });
            });
        },
        formatJson(filterVal, jsonData) {
            return jsonData.map(v => filterVal.map(j => v[j]));
        },
        htmlToPdf() {
            let dom = document.getElementById('table-content');
            html2Canvas(dom, {
                allowTaint: true,
                height: dom.scrollHeight
                // windowHeight: dom.scrollHeight
            }).then(function (canvas) {
                let pageData = canvas.toDataURL('image/jpeg');
                const printWindow = window.open('page.html');
                printWindow.document.write('<img src="' + pageData + '" />');
            });
        },
        doPrint() {
            let dom = document.getElementById('table-content');
            html2Canvas(dom, {
                allowTaint: true,
                height: dom.scrollHeight
                // windowHeight: dom.scrollHeight
            }).then(canvas => {
                let pageData = canvas.toDataURL('image/jpeg');
                const printWindow = window.open('page.html');
                printWindow.document.write('<img src="' + pageData + '" />');
                setTimeout(() => {
                    printWindow.print();
                    printWindow.close();
                });
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
        //获取窑炉列表
        GetKilnsTypesList() {
            this.$axios
                .get(`/api/MainWindowData/GetKilnList`)
                .then(res => {
                    if (res.data.code == 0) {
                        this.KilnsList = res.data.data;
                        this.curSelectItem = res.data.data[0].Id;
                        this.GetRealTimeProductionData();
                    } else {
                        this.tipword = res.data.msg;
                        this.tipchange = true;
                    }
                });
        },
        GetRealTimeProductionData() {
            this.$axios
                .get(
                    `/api/ReportManagement/RealtimeProductionReportQuery?kiln=${this.curSelectItem}&isBSystem=${this.isBSystem}`
                )
                .then(res => {
                    if (res.data.code == 0) {
                        this.ReportDetailModels =
                            res.data.data.Data;
                        this.Time = res.data.data.CurrentTime;
                        if (this.curSelectItemfirst) {
                            this.curSelectItemfirst = false;
                        }
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
        saveTable() {
            let data = {
                CurrentTime: this.Time,
                Data: this.ReportDetailModels,
            };
            this.$axios
                .post(`/api/ReportManagement/EditRealtimeProductionReport?kiln=${this.curSelectItem}`, data)
                .then(res => {
                    //弹窗保存成功
                    if (res.data.code == 0) {
                        this.tipword = '保存成功';
                        this.tipchange = true;
                    } else {
                        this.tipword = res.data.msg;
                        this.tipchange = true;
                    }
                    this.GetRealTimeProductionData();
                });
        }
    },
    mounted() {
        this.isBSystem = eval(sessionStorage.getItem('isBSystem')) || false;
        this.GetKilnsTypesList();
    }
};
</script>
<style>
.ProcessParameterReport-Page .el-table--border td,
.ProcessParameterReport-Page .el-table--border th,
.ProcessParameterReport-Page .el-table__body-wrapper .el-table--border.is-scrolling-left~.el-table__fixed {
    border-right: 1px solid #1e304a;
}

.ProcessParameterReport-Page .el-table--border th.gutter:last-of-type {
    background: #1e304a;
}

.ProcessParameterReport-Page .el-picker-panel__body-wrapper,
.ProcessParameterReport-Page .el-picker-panel__footer {
    background: #1e304a;
}
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

                .select-text,
                .select-text2 {
                    font-size: 16px;
                    font-weight: 400;
                    color: #e4e4e4;
                    margin-right: 6px;
                }

                .select-text2 {
                    margin-left: 16px;
                }

                .select-content {
                    height: 100%;
                    width: 174px;
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

                .table-item {
                    display: flex;

                    .table-time {
                        width: 180px;

                        .table-title-time {
                            height: 36px;
                            width: 100%;
                            background: #2f3d67;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                        }

                        .table-info-time {
                            height: calc(100% - 36px);
                            width: 100%;
                            background: #204361;
                            border-top: 1px solid #1d2b55;
                            box-sizing: border-box;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                        }
                    }

                    .table-info {
                        width: calc(100% - 180px);
                        color: #fff;

                        .table-info-child {
                            width: 100%;
                            display: flex;

                            .clomn {
                                flex: 1;
                                height: auto;
                                border-right: #304171 0.5px solid;

                                .row {
                                    border-bottom: #304171 0.5px solid;
                                    width: 100%;
                                    height: 36px;
                                    display: flex;
                                    align-items: center;
                                    justify-content: center;
                                    color: #9aa3be;

                                    .rowInput {
                                        width: 100%;
                                        height: 100%;
                                        border: none;
                                        background: transparent;
                                        font-size: 16px;
                                        text-align: center;
                                    }
                                }

                                .row:nth-child(2n) {
                                    background: #121c3a;
                                }

                                .row:nth-child(2n + 1) {
                                    background: #0e1732;
                                }

                                .row:first-child {
                                    background: #18254e;
                                    color: #fff;
                                }
                            }

                            .clomn:first-child {
                                .row {
                                    background: #18314e;
                                    color: #fff;
                                }

                                .row:first-child {
                                    background: #18254e;
                                    color: #fff;
                                }
                            }
                        }
                    }
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
