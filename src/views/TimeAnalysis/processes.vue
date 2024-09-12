<!-- 动作节拍趋势 -->
<template>
    <div class="action-beat-trend">
        <!-- 头部 -->
        <div class="my-head flex">
            <el-form :inline="true" :model="formData">
                <el-form-item label="时间范围：">
                    <el-date-picker v-model="formData.st" type="datetime" placeholder="开始日期"
                        value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
                </el-form-item>
                <el-form-item label="-">
                    <el-date-picker v-model="formData.ed" type="datetime" placeholder="结束日期"
                        value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
                </el-form-item>
                <el-form-item label="产品型号">
                    <el-select v-model="formData.qq1" size="medium" style="width:120px">
                        <el-option v-for="item in productTypesList" :key="item.ProductTypeCode"
                            :label="item.ProductTypeCode" :value="item.ProductTypeCode"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" size="medium" @click="queryData">查询</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="success" plain size="medium" @click="setRangeShow()">范围设置</el-button>
                </el-form-item>

            </el-form>
            <div class="right">
                <el-button type="warning" plain size="medium" @click="exportPicture()">导出</el-button>
            </div>
        </div>
        <!-- 内容 -->


        <!-- 工序 -->
        <div class="my-page flex content">
            <div class="my-chart">
                <div class="title">{{ leftTopTitle }}-趋势节拍</div>
                <div id="my-chart2"></div>
                <div class="chart-content">
                    <div class="chart-label">
                        <div class="label-item">上限值：{{ dataObj.UpperLimit }}</div>
                        <div class="label-item">下限值：{{ dataObj.LowerLimit }}</div>
                    </div>
                    <div class="chart-table">
                        <div class="table-item">
                            <div class="table-up">工序名称</div>
                            <div class="table-down">{{ leftTopTitle }}</div>
                        </div>
                        <div class="table-item">
                            <div class="table-up"> <span>最大值（s）</span>
                                <el-checkbox v-model="maxValSelect"></el-checkbox>
                            </div>
                            <div class="table-down">{{ dataObj.Max }}</div>
                        </div>
                        <div class="table-item">
                            <div class="table-up"><span>最小值（s）</span>
                                <el-checkbox v-model="minValSelect"></el-checkbox>
                            </div>
                            <div class="table-down">{{ dataObj.Min }}</div>
                        </div>
                        <div class="table-item">
                            <div class="table-up"><span>平均值（s）</span>
                                <el-checkbox v-model="averageValSelect"></el-checkbox>
                            </div>
                            <div class="table-down">{{ dataObj.Avg }}</div>
                        </div>
                        <div class="table-item">
                            <div class="table-up">样本占比</div>
                            <div class="table-down">{{ dataObj.Proportion }}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="my-form">
                <!-- 流程 -->
                <div class="process">
                    <!-- 工序选择 -->

                    <!-- <div class="title">工序选择：</div>
                        <el-radio-group v-model="formData.qq2" @change="queryData">
                            <el-radio v-for="(item, idx) in workProcessesList" :key="item.Value + idx" :label="item.WID">{{
                                item.WorkName
                            }}</el-radio>
                        </el-radio-group> -->



                    <el-table ref="myTable" :data="workProcessesList" highlight-current-row @row-click="onRowClick"
                        :cell-style="{ borderColor: '#E4E7ED' }" :header-cell-style="{
                            background: '#5a6c98',
                            color: '#fff',
                        }" border height="100%">
                        <el-table-column label="工序名" prop="WorkName"> </el-table-column>

                    </el-table>




                </div>
            </div>
            <el-dialog :z-index="99" width="500px" title="范围设置" :visible.sync="setRangeConfig.show" center
                :close-on-click-modal="false" :close-on-press-escape="false"
                :before-close="() => { setRangeCallback('cancel') }">
                <div class="dialog-content2">
                    <el-table :data="popData2" v-loading="this.$store.state.isShow"
                        element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)"
                        height="100%" border :style="{ width: '100%', fontSize: '14px' }"
                        :header-cell-style="{ background: '#dcf0f9', color: '#5883e7', 'border-left': '1px solid #a7d0e2', height: '50px', padding: '0' }">
                        <template slot="empty">
                            <span>暂无数据</span>
                        </template>
                        <el-table-column prop="Name" label="工序名称" :show-overflow-tooltip="true"></el-table-column>
                        <el-table-column label="样本上限（s）" :show-overflow-tooltip="true">
                            <template slot-scope="scope">
                                <el-input v-model="scope.row.upperLimit" size="medium" />
                            </template>
                        </el-table-column>
                        <el-table-column label="样本下限（s）" :show-overflow-tooltip="true">
                            <template slot-scope="scope">
                                <el-input v-model="scope.row.lowerLimit" size="medium" />
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                <template #footer>
                    <el-button @click="setRangeCallback('cancel')">取消</el-button>
                    <el-button type="primary" @click="setRangeCallback('confirm')">确定</el-button>
                </template>
            </el-dialog>
        </div>

        <TipPop v-if="isPopShow" :tipText="tipText" :noCancel="noCancel" @tipCallBack="tipCallBack" />
    </div>
</template>
<script>
import html2canvas from 'html2canvas';
import TipPop from '../../components/public/tipPop.vue';
export default {
    components: { TipPop },
    data() {
        return {
            isPopShow: false, // 是否显示弹窗
            tipText: '', // 弹窗提示语
            noCancel: true, // 弹窗是否带取消按按钮
            formData: {
                st: '',
                ed: '',
                qq1: '',
                qq2: '',
                upperLimit: '', // 上限
                lowerLimit: '', // 下限
            },
            // 范围设置-配置
            setRangeConfig: {
                show: false,
            },
            productTypesList: [],
            workProcessesList: [],
            dataObj: {},
            leftTopTitle: '',
            maxValSelect: true,
            minValSelect: true,
            averageValSelect: true,
            popData1: {
                upperLimit: '', // 上限
                lowerLimit: '', // 下限
            },
            popData2: [],
            popData3: [],
            popData: []
        }
    },
    watch: {
        maxValSelect: {
            immediate: true,
            handler: function (newVal, oldVal) {
                this.changeLineShow()
            }
        },
        minValSelect: {
            immediate: true,
            handler: function (newVal, oldVal) {
                this.changeLineShow()
            }
        },
        averageValSelect: {
            immediate: true,
            handler: function (newVal, oldVal) {
                this.changeLineShow()
            }
        },
        'formData.qq1': {
            immediate: true,
            handler: function (newVal, oldVal) {
                if (!newVal) {
                    this.workProcessesList = []
                    return
                }
                this.getWorkProcesses()
            }
        },

    },
    methods: {
        tipCallBack(str) {
            this.noCancel = true;
            if (str == 'yes') {
                this.isPopShow = false;
            } else {
                this.isPopShow = false;
            }
        },
        getWorkProcesses() {
            this.$axios({
                method: 'post',
                url: `/api/ProcessParameterConfigure/QueryOneWorkSectionFromModel?model=${this.formData.qq1}`,
            }).then(res => {
                if (res.data.code == 0) {
                    this.workProcessesList = res.data.data;
                    if (this.workProcessesList.length) {
                        this.workProcessesList = this.workProcessesList
                        this.formData.qq2 = this.workProcessesList[0].WID
                        this.$nextTick(() => {
                            this.$refs.myTable.setCurrentRow(this.workProcessesList[0]);
                        })
                    }
                    this.queryData();
                } else {
                    this.isPopShow = true;
                    this.tipText = res.data.msg
                    this.dataObj = {};
                    let Chart1 = echarts.init(document.getElementById('my-chart2'))
                    Chart1.clear();
                    this.leftTopTitle = '';
                }
            }).catch((err) => {
                console.log('err', err)
            })
        },
        changeLineShow() {
            let _id = 'my-chart2'
            var Chart1 = echarts.init(document.getElementById(_id))
            let option1 = Chart1.getOption();
            let series = [{ ...option1.series[0] }]
            if (this.averageValSelect) {
                series.push({
                    type: 'line',
                    data: option1.series[0].data.map(_ => this.dataObj.Avg),
                    itemStyle: {
                        normal: {
                            color: "#797979",
                            lineStyle: {
                                color: "#797979",
                                type: 'dashed'
                            }
                        }
                    },
                })
            }
            if (this.maxValSelect) {
                series.push({
                    type: 'line',
                    data: option1.series[0].data.map(_ => this.dataObj.Max),
                    itemStyle: {
                        normal: {
                            color: "red",
                            lineStyle: {
                                color: "red",
                                type: 'dashed'
                            }
                        }
                    },
                })
            }
            if (this.minValSelect) {
                series.push({
                    type: 'line',
                    data: option1.series[0].data.map(_ => this.dataObj.Min),
                    itemStyle: {
                        normal: {
                            color: "red",
                            lineStyle: {
                                color: "red",
                                type: 'dashed'
                            }
                        }
                    },
                })
            }

            option1.series = series;
            Chart1.setOption(option1, true);

        },
        onRowClick(row) {
            this.formData.qq2 = row.WID
            this.queryData()
        },
        queryData() {
            if (!this.formData.qq2) {
                return
            }
            let _obj = this.workProcessesList.find(_ => _.WID == this.formData.qq2) || {}
            let title = `工序：${_obj.WorkName || ''}`
            this.leftTopTitle = title;
            let str = title ? title + '<br/>' : '';
            let option1 = {
                tooltip: {
                    trigger: 'axis',
                    formatter: function (params) { // tip显示的具体内容
                        return `${str}<span>产品码：${params[0].name}</span><br/>
              ${params[0].marker}<span>持续时长：${params[0].data}s</span>`;
                    },
                },
                color:[ "#F29C1B","#797979",'red','red' ],
                legend: {
                    show:true,
                    right: '4%',
                    data: ['节拍', '平均值', '最大值', '最小值']
                },
                xAxis: {
                    type: 'category',
                    data: [],
                },
                yAxis: {
                    type: 'value'
                },
                series: [
                    {
                        data: [],
                        type: 'line',
                        itemStyle: {
                            normal: {
                                color: "#F29C1B",
                                lineStyle: {
                                    color: "#F29C1B"
                                }
                            }
                        },
                    },
                    {
                        data: [],
                        type: 'line',
                        itemStyle: {
                            normal: {
                                color: "#797979",
                                lineStyle: {
                                    color: "#797979",
                                    type: 'dashed'
                                }
                            }
                        },
                    },
                    {
                        data: [],
                        type: 'line',
                        itemStyle: {
                            normal: {
                                color: "red",
                                lineStyle: {
                                    color: "red",
                                    type: 'dashed'
                                }
                            }
                        },
                    },
                    {
                        data: [],
                        type: 'line',
                        itemStyle: {
                            normal: {
                                color: "red",
                                lineStyle: {
                                    color: "red",
                                    type: 'dashed'
                                }
                            }
                        },
                    }
                ]
            };

            this.$axios({
                method: 'get',
                url: `/api/ProduceData/GetSectionBeatsAsync?input.model=${this.formData.qq1
                    }&input.startTime=${this.formData.st
                    }&input.endTime=${this.formData.ed
                    }&input.wID=${this.formData.qq2}`,
            }).then(res => {
                if (res.data.code == 0) {
                    if (!res.data.data.Beats) {
                        res.data.data.Beats = []
                    }
                    this.dataObj = res.data.data
                    option1.series[0].itemStyle.normal.lineStyle.color = '#1fe556'
                    option1.series[0].itemStyle.normal.color = '#1fe556'
                    option1.xAxis.data = res.data.data.Beats.map(_ => _.ProductId)
                    option1.series[0].data = res.data.data.Beats.map(_ => _.Beat)
                    option1.series[1].data = res.data.data.Beats.map(_ => res.data.data.Avg)
                    option1.series[2].data = res.data.data.Beats.map(_ => res.data.data.Max)
                    option1.series[3].data = res.data.data.Beats.map(_ => res.data.data.Min)
                    let Chart1 = echarts.init(document.getElementById('my-chart2'))
                    Chart1.setOption(option1, true);
                } else {
                    this.dataObj = {};
                    this.isPopShow = true;
                    this.tipText = res.data.msg
                    let Chart1 = echarts.init(document.getElementById('my-chart2'))
                    Chart1.clear();
                }
            }).catch((err) => {
                console.log('err', err)
            })

        },
        // 范围设置-显示
        setRangeShow() {
            this.$axios({
                method: 'get',
                url: `/api/Setting/Get?request.providerName=G&request.providerKey=${this.formData.qq1}&request.namePrefix=SCMS.RangeSetting`,

            }).then(res => {
                if (res.data.code == 0) {
                    let Settings = res.data.data.Settings
                    console.log('-this.Settings-', Settings)
                    this.popData = Settings.length ? JSON.parse(Settings[0].Value) : [];
                    let temp = this.workProcessesList.map(_ => ({ Name: _.WorkName }))
                    console.log('-this.popData-', this.popData)
                    temp.forEach(item => {


                        this.popData.forEach(_ => {
                        })
                        let _obj = this.popData.find(_ => (_.RangeType == 1 && _.Subject == item.Name)) || {}
                        console.log("_obj", _obj)
                        item.upperLimit = _obj.UpperLimit;
                        item.lowerLimit = _obj.LowerLimit;
                    })

                    this.popData2 = temp;

                } else {
                    this.isPopShow = true;
                    this.tipText = res.data.msg
                }
            }).catch((err) => {
                console.log('err', err)
            })
            this.setRangeConfig.show = true
        },
        isNumber(val) {
            var re = /^[0-9]+(\.[0-9]?)?$/;
            console.log("val", val, re.test(val))
            return re.test(val);
        },
        // 范围设置-回调
        setRangeCallback(state) {
            if (state == 'confirm') {
                this.popData2.forEach(item => {
                    let b = this.popData.some(_ => _.RangeType == 1 && _.Subject == item.Name);
                    if (b) {
                        this.popData.forEach(_ => {
                            if (_.RangeType == 1 && _.Subject == item.Name) {
                                _.UpperLimit = item.upperLimit;
                                _.LowerLimit = item.lowerLimit;
                            }
                        })
                    } else {
                        this.popData.push(
                            {
                                RangeType: 1,
                                Subject: item.Name,
                                UpperLimit: item.upperLimit,
                                LowerLimit: item.lowerLimit
                            }
                        )
                    }
                })

                let bool1 = this.popData.some(_ => {
                    let _a = !_.UpperLimit || (_.UpperLimit && this.isNumber(_.UpperLimit));
                    let _b = !_.LowerLimit || (_.LowerLimit && this.isNumber(_.LowerLimit))
                    console.log(_a, _b)
                    return !_a || !_b
                }

                )
                if (bool1) {
                    this.isPopShow = true;
                    this.tipText = '上下限请输入小数位不超过一位的0或正数!'
                    return
                }
                // let bool2 = this.popData.some(_ =>
                //   Number(_.UpperLimit) < Number(_.LowerLimit)
                // )
                // if (bool2) {
                //   this.isPopShow = true;
                //   this.tipText = '上限需要大于下限!'
                //   return
                // }
                this.$axios({
                    method: 'post',
                    url: '/api/Setting/UpdateRangeSetting',
                    data: {
                        ProviderName: "G",
                        ProviderKey: this.formData.qq1,
                        Settings: [
                            {
                                Name: "SCMS.RangeSetting",
                                Value: this.popData
                            }
                        ]
                    }
                }).then(res => {
                    if (res.data.code == 0) {
                        this.isPopShow = true;
                        this.tipText = '修改成功！'
                        this.setRangeConfig.show = false
                        this.queryData()
                    } else {
                        this.isPopShow = true;
                        this.tipText = res.data.msg
                    }
                }).catch((err) => {
                    console.log('err', err)
                })
            } else {
                this.setRangeConfig.show = false
            }
        },
        // 导出图片
        exportPicture() {
            const DOM = document.getElementsByClassName('my-chart')[0];
            html2canvas(DOM).then(function (canvas) {
                const src = canvas.toDataURL('image/png');
                const a = document.createElement('a')
                a.download = name
                a.href = src;
                a.click();
                a.remove();
            });
        },
        getProductTypes(flash) {
            this.$axios({
                method: 'post',
                url: '/api/FormulaManage/QueryProductType',
            }).then(res => {
                if (res.data.code == 0) {
                    this.productTypesList = res.data.data
                    if (this.productTypesList.length) {
                        this.formData.qq1 = this.productTypesList[0].ProductTypeCode;
                    }
                    if (flash) {
                        this.queryData();
                    }
                } else {
                    this.isPopShow = true;
                    this.tipText = res.data.msg
                }
            }).catch((err) => {
                console.log('err', err)
            })
        },


    },
    mounted() {
        let st = this.$getDate(
            new Date(new Date().toLocaleDateString()).getTime() -
            6 * 24 * 60 * 60 * 1000
        );
        let ed = this.$getDate(
            new Date(new Date().toLocaleDateString()).getTime() +
            24 * 60 * 60 * 1000 -
            1
        );
        Object.assign(this.formData, {
            st,
            ed
        });
        this.getProductTypes(true)
    },
}
</script>
<style lang="scss" scoped>
.flex {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}

::v-deep .el-form {
    .el-form-item {

        // margin-bottom: 0;
        .el-form-item__label {
            color: #6C6D6D;
        }

        .el-form-item__content {
            display: inline-block;
        }
    }

    .radio-group {
        .el-form-item__content {
            line-height: 36px;
        }
    }
}

.action-beat-trend {
    width: 100%;
    height: 100%;

    &>.my-head {
        width: 100%;
        height: 60px;
        padding: 0 10px;
        justify-content: space-between;
        background-color: #DDDDDD;

        ::v-deep .el-form {
            .el-form-item {
                margin-bottom: 0;
            }
        }

    }

    &>.content {
        width: 100%;
        height: calc(100% - 60px);
        padding: 20px;
    }
}
</style>
<style lang="scss" scoped>
.flex {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}

::v-deep .el-radio-group {
    .el-radio {
        line-height: 30px;
        display: block;
    }
}

.my-form {
    width: 100%;
    height: 100%;
    padding: 10px;
    border: 1px solid #E4E4E4;

    // 信息
    &>.info {
        width: 100%;
        padding: 0 10px;
        background-color: #F8F8F8;

        &>.row {
            width: 100%;
            line-height: 40px;
            justify-content: flex-start;

            .label {
                .el-checkbox {
                    line-height: 40px;
                    margin: 0 5px 0 0;
                }
            }
        }
    }

    &>.proportion {
        padding: 20px 0 0 10px;
        line-height: 20px;
        font-size: 14px;
        font-weight: 400;
        color: #333333;

        &>.value {
            line-height: 40px;
            font-size: 20px;
            font-weight: bold;
            color: #386DF0;
        }
    }

    &>.process {
        width: 100%;
        height: 100%;
        background-color: #F8F8F8;
        padding: 10px;
        margin: 10px 0 0 0;
        overflow-x: hidden;
        overflow-y: auto;

        // 工序选择

        // 工步选择
        .work-step {
            width: 100%;
        }
    }
}

.dialog-content2 {
    height: 300px;
}
</style>
<style lang="scss" scoped>
.flex {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}

.my-chart {
    width: 100%;
    height: 100%;
    position: relative;

    &>.title {
        width: 40%;
        height: 36px;
        padding: 0 0 0 20px;
        position: absolute;
        top: 0;
        left: 0;
        line-height: 36px;
        font-size: 16px;
        font-weight: 400;
        color: #4270E4;
        background-color: #EEF3FF;
    }

    #my-chart1 {
        width: 100%;
        height: 100%;
    }

    #my-chart2,
    #my-chart3 {
        width: 100%;
        height: calc(100% - 100px);
    }

    .chart-content {
        width: 100%;
        height: 100px;
        background-color: #fff;

        .chart-label {
            width: 100%;
            height: 30px;
            display: flex;
            align-items: center;
            justify-content: flex-start;
            padding-left: 16px;
            box-sizing: border-box;

            .label-item {
                margin-right: 50px;
            }
        }

        .chart-table {
            width: 100%;
            height: 70px;
            display: flex;

            .table-item {
                flex: 1;
                border-right: 1px solid #fff;
                box-sizing: border-box;

                .table-up {
                    width: 100%;
                    height: 50%;
                    background-color: #5a6c98;
                    color: #fff;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 0 8px;
                    box-sizing: border-box;
                }

                .table-down {
                    width: 100%;
                    height: 50%;
                    background-color: #eaedee;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
            }

        }
    }


}
</style>
<style lang="scss" scoped>
.my-page {
    width: 100%;
    height: 100%;

    &>.my-chart {
        width: calc(100% - 210px);
        height: 100%;
        margin: 0 10px 0 0;
        position: relative;
        background-color: #F8F8F8;
    }

    >.my-form {
        width: 300px;
        height: 100%;
        padding: 10px;
    }
}
</style>