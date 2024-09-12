<template>
    <div class="ProcessParameterReport-Page" :class="{ blackBlueBg: $store.state.color === 'blackBlue' }">
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
                    <div class="select-text">窑炉选择：</div>
                    <div class="select-content">
                        <el-select v-model="curSelectItem" placeholder="Select" :popper-append-to-body="false">
                            <el-option v-for="item in KilnsList" :key="item.Id" :label="item.Name" :value="item.Id">
                            </el-option>
                        </el-select>
                    </div>
                    <div class="select-text2">查询时间：</div>
                    <el-date-picker :key="
                        $store.state.color === 'blackBlue'
                            ? 'blackBlueBg'
                            : 'normal'
                    " :popper-class="
                        $store.state.color === 'blackBlue'
                            ? 'blackBlueBg'
                            : 'normal'
                    " type="date" v-model="selectTime" placeholder="查询时间" default-time="12:00:00"
                        value-format="yyyy-MM-dd"></el-date-picker>
                    <el-button class="select-btn" @click="WorkshopRecordSentToPage">查询</el-button>
                </div>
                <div class="select-print">
                    <el-button class="select-btn2" @click="htmlToPdf">打印预览</el-button>
                    <el-button class="select-btn2" @click="doPrint">报表打印</el-button>
                    <el-button class="select-btn3" @click="exportTable">导出</el-button>
                </div>
            </div>
            <div class="content">
                <div class="table-content">
                    <div class="table-title">
                        <div class="table-title-time">时间</div>
                    </div>

                    <div class="table-item" v-for="item in tableList" :key="item.RecordTime">
                        <div class="table-time">{{ item.RecordTime }}</div>
                        <div class="table-info">
                            <div class="table-info-child">
                                <div class="clomn">
                                    <div class="row"></div>
                                    <div class="row">实际温度</div>
                                    <div class="row">设定温度</div>
                                    <div class="row">目标温度</div>
                                </div>
                                <div class="clomn" v-for="_ in item.Data.filter(
                                    (i) => {
                                        return (
                                            i.Tag.indexOf('U') >= 0
                                        );
                                    }
                                )" :key="_.Tag">
                                    <div class="row">{{ _.Tag }}</div>
                                    <div class="row">
                                        {{ _.RealTemperature }}
                                    </div>
                                    <div class="row">
                                        {{ _.SetTemperature }}
                                    </div>
                                    <div class="row">
                                        {{ _.TargetTemperature }}
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
                                <div class="clomn" v-for="_ in item.Data.filter(
                                    (i) => {
                                        return (
                                            i.Tag.indexOf('D') >= 0 
                                        );
                                    }
                                )" :key="_.Tag">
                                    <div class="row">{{ _.Tag }}</div>
                                    <div class="row">
                                        {{ _.RealTemperature }}
                                    </div>
                                    <div class="row">
                                        {{ _.SetTemperature }}
                                    </div>
                                    <div class="row">
                                        {{ _.TargetTemperature }}
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
export default {
    data() {
        return {
            tipword: '',
            tipchange: false,
            KilnsList: [],
            curSelectItem: {},
            KType: 1,
            value: '窑炉1',
            selectTime: '',
            tableList: [],
        };
    },
    methods: {
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
                console.log('html2Canvas end');
                let pageData = canvas.toDataURL('image/jpeg');
                const printWindow = window.open('page.html');
                printWindow.document.write('<img src="' + pageData + '" />');
                setTimeout(() => {
                    printWindow.print();
                    printWindow.close();
                });
            });
        },
        //获取窑炉列表
        GetKilnsTypesList() {
            this.$axios
                .get(`/api/MainWindowData/GetKilnList`)
                .then((res) => {
                    if (res.data.code == 0) {
                        this.KilnsList = res.data.data;
                        this.curSelectItem = res.data.data[0].Id;
                        this.KType = res.data.data[0].KType;
                        this.WorkshopRecordSentToPage();
                    }
                });
        },
        WorkshopRecordSentToPage() {
            if (!this.selectTime) {
                this.tipword = '未选择时间';
                this.tipchange = true;
                return;
            }
            this.$axios
                .get(
                    `/api/ReportManagement/WorkshopRecordReportQuery?kiln=${this.curSelectItem}&time=${this.selectTime}`
                )
                .then((res) => {
                    if (res.data.code == 0) {
                        this.tableList = res.data.data;
                    } else {
                        this.tipword = res.data.msg;
                        this.tipchange = true;
                    }
                });
        },
        getNowTime() {
            let date = new Date();
            let y = date.getFullYear();
            let MM = date.getMonth() + 1;
            MM = MM < 10 ? '0' + MM : MM;
            let d = date.getDate();
            d = d < 10 ? '0' + d : d;
            return y + '-' + MM + '-' + d;
        },
        exportTable() {
            let title = this.tableList[0].Data.map((_) => {
                return _.Tag;
            });
            title.unshift('')
            title.unshift('时间');

            let fil = this.tableList[0].Data.map((_) => {
                return _.Tag;
            });
            fil.unshift('label')
            fil.unshift('RecordTime');

            let temp = [];
            for (let i in this.tableList) {
                let t1 = {
                    RecordTime: this.tableList[i].RecordTime,
                    label: '实际温度',
                };
                let t2 = {
                    RecordTime: this.tableList[i].RecordTime,
                    label: '设定温度',
                };
                let t3 = {
                    RecordTime: this.tableList[i].RecordTime,
                    label: '目标温度',
                };
                for (let j in this.tableList[i].Data) {
                    t1[this.tableList[i].Data[j].Tag] =
                        this.tableList[i].Data[j].RealTemperature;
                    t2[this.tableList[i].Data[j].Tag] =
                        this.tableList[i].Data[j].SetTemperature;
                    t3[this.tableList[i].Data[j].Tag] =
                        this.tableList[i].Data[j].TargetTemperature;
                }
                temp.push(t1);
                temp.push(t2);
                temp.push(t3);
            }

            require.ensure([], () => {
                const {
                    expor_json_to_excel,
                } = require('../../vendor/Export2Excel');
                let excelDatas = [
                    {
                        tHeader: title,
                        filterVal: fil,
                        tableDatas: temp,
                        sheetName: 'sheet1',
                    },
                    {
                        tHeader: title,
                        filterVal: fil,
                        tableDatas: temp,
                        sheetName: 'sheet1',
                    }, //不知道源码为啥删一次，写两次才正常
                ];
                this.json2excel(
                    excelDatas,
                    '碳二车间辊道记录表',
                    true,
                    'xlsx'
                );
            });


        },
        json2excel(tableJson, filenames, autowidth, bookTypes) {
            let that = this;
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
    mounted() {
        this.selectTime = this.getNowTime();
        this.GetKilnsTypesList();
    },
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
    position: relative;

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

                .table-title {
                    height: 40px;
                    width: 100%;
                    background: #2f3d67;

                    .table-title-time {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        height: 100%;
                        width: 180px;
                    }
                }

                .table-item {
                    display: flex;

                    .table-time {
                        background: #204361;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        border-top: 1px solid #1d2b55;
                        box-sizing: border-box;
                        width: 180px;
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