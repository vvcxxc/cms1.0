<!-- 动作节拍趋势 -->
<template>
    <div class="action-beat-trend">
        <!-- 头部 -->
        <div class="my-head flex">
            <el-form :inline="true" :model="formData">
                <el-form-item label="时间范围：">
                    <el-date-picker
                        v-model="formData.st"
                        type="datetime"
                        placeholder="开始日期"
                        value-format="yyyy-MM-dd HH:mm:ss"
                    ></el-date-picker>
                </el-form-item>
                <el-form-item label="-">
                    <el-date-picker
                        v-model="formData.ed"
                        type="datetime"
                        placeholder="结束日期"
                        value-format="yyyy-MM-dd HH:mm:ss"
                    ></el-date-picker>
                </el-form-item>
                <el-form-item label="产品型号">
                    <el-select
                        v-model="formData.qq1"
                        size="medium"
                        style="width:120px"
                    >
                        <el-option
                            v-for="item in productTypesList"
                            :key="item.ProductTypeCode"
                            :label="item.ProductTypeCode"
                            :value="item.ProductTypeCode"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="产线段">
                    <el-select
                        v-model="formData.qq4"
                        size="medium"
                        style="width:120px"
                    >
                        <el-option
                            v-for="item in lineList"
                            :key="item.Value"
                            :label="item.Name"
                            :value="item.Value"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" size="medium" @click="queryData"
                        >查询</el-button
                    >
                </el-form-item>
                <el-form-item>
                    <el-button
                        type="success"
                        plain
                        size="medium"
                        @click="setRangeShow()"
                        >范围设置</el-button
                    >
                </el-form-item>
            </el-form>
            <div class="right">
                <el-button
                    type="warning"
                    plain
                    size="medium"
                    @click="exportPicture()"
                    >导出</el-button
                >
            </div>
        </div>
        <!-- 内容 -->
        <!-- 整线 -->
        <div class="my-page flex content">
            <div class="my-chart">
                <div class="title">产线节拍趋势</div>
                <div id="my-chart1"></div>
            </div>
            <div class="my-form">
                <!-- 信息 -->
                <div class="info">
                    <div class="row flex">
                        <div class="label">样本上限：</div>
                        <div class="value">{{ dataObj.UpperLimit }}</div>
                    </div>
                    <div class="row flex">
                        <div class="label">样本下限：</div>
                        <div class="value">{{ dataObj.LowerLimit }}</div>
                    </div>
                    <div class="row flex">
                        <div class="label">
                            <el-checkbox v-model="maxValSelect"></el-checkbox>
                            <span>最大值：</span>
                        </div>
                        <div class="value">{{ dataObj.Max }}</div>
                    </div>
                    <div class="row flex">
                        <div class="label">
                            <el-checkbox v-model="minValSelect"></el-checkbox>
                            <span>最小值：</span>
                        </div>
                        <div class="value">{{ dataObj.Min }}</div>
                    </div>
                    <div class="row flex">
                        <div class="label">
                            <el-checkbox
                                v-model="averageValSelect"
                            ></el-checkbox>
                            <span>平均值：</span>
                        </div>
                        <div class="value">{{ dataObj.Avg }}</div>
                    </div>
                </div>
                <div class="proportion">
                    <div>范围内数据占总样本容量：</div>
                    <div class="value">{{ dataObj.Proportion }}</div>
                </div>
            </div>

            <el-dialog
                :z-index="99"
                width="350px"
                title="范围设置"
                :visible.sync="setRangeConfig.show"
                center
                :close-on-click-modal="false"
                :close-on-press-escape="false"
                :before-close="
                    () => {
                        setRangeCallback('cancel');
                    }
                "
            >
                <div class="dialog-content">
                    <el-form>
                        <el-form-item label="样本上限：">
                            <el-input
                                v-model="popData1.upperLimit"
                                size="medium"
                            />
                        </el-form-item>
                        <el-form-item label="样本下限：">
                            <el-input
                                v-model="popData1.lowerLimit"
                                size="medium"
                            />
                        </el-form-item>
                    </el-form>
                </div>
                <template #footer>
                    <el-button @click="setRangeCallback('cancel')"
                        >取消</el-button
                    >
                    <el-button
                        type="primary"
                        @click="setRangeCallback('confirm')"
                        >确定</el-button
                    >
                </template>
            </el-dialog>
        </div>

        <TipPop
            v-if="isPopShow"
            :tipText="tipText"
            :noCancel="noCancel"
            @tipCallBack="tipCallBack"
        />
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
                qq4: '',
                upperLimit: '', // 上限
                lowerLimit: '' // 下限
            },
            // 范围设置-配置
            setRangeConfig: {
                show: false
            },
            productTypesList: [],
            lineList: [],
            workProcessesList: [],
            workStepsList: [],
            dataObj: {
                Avg: 0,
                LowerLimit: 0,
                Max: 0,
                Min: 0,
                Proportion: '',
                UpperLimit: 0,
                Beats: []
            },
            leftTopTitle: '',
            maxValSelect: true,
            minValSelect: true,
            averageValSelect: true,
            popData1: {
                upperLimit: '', // 上限
                lowerLimit: '' // 下限
            },
            popData: []
        };
    },
    watch: {
        maxValSelect: {
            immediate: true,
            handler: function(newVal, oldVal) {
                this.changeLineShow();
            }
        },
        minValSelect: {
            immediate: true,
            handler: function(newVal, oldVal) {
                this.changeLineShow();
            }
        },
        averageValSelect: {
            immediate: true,
            handler: function(newVal, oldVal) {
                this.changeLineShow();
            }
        }
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

        changeLineShow() {
            let _id = 'my-chart1';

            var Chart1 = echarts.init(document.getElementById(_id));
            let option1 = Chart1.getOption();

            let series = [{ ...option1.series[0] }];
            console.log('option1', option1);
            if (this.averageValSelect) {
                series.push({
                    type: 'line',
                    data: option1.series[0].data.map(_ => this.dataObj.Avg),
                    itemStyle: {
                        normal: {
                            color: '#797979',
                            lineStyle: {
                                color: '#797979',
                                type: 'dashed'
                            }
                        }
                    }
                });
            }
            if (this.maxValSelect) {
                series.push({
                    type: 'line',
                    data: option1.series[0].data.map(_ => this.dataObj.Max),
                    itemStyle: {
                        normal: {
                            color: 'red',
                            lineStyle: {
                                color: 'red',
                                type: 'dashed'
                            }
                        }
                    }
                });
            }
            if (this.minValSelect) {
                series.push({
                    type: 'line',
                    data: option1.series[0].data.map(_ => this.dataObj.Min),
                    itemStyle: {
                        normal: {
                            color: 'red',
                            lineStyle: {
                                color: 'red',
                                type: 'dashed'
                            }
                        }
                    }
                });
            }

            option1.series = series;
            console.log('option1.series', option1.series);
            Chart1.setOption(option1, true);
        },
        queryData() {
            let title = '整线';

            this.leftTopTitle = title;
            let str = title ? title + '<br/>' : '';
            console.log('title66+6', title);
            let option1 = {
                tooltip: {
                    trigger: 'axis',
                    formatter: function(params) {
                        // tip显示的具体内容
                        return `${str}<span>产品码：${params[0].name}</span><br/>
              ${params[0].marker}<span>持续时长：${params[0].data}s</span>`;
                    }
                },
                color: ['#F29C1B', '#797979', 'red', 'red'],
                legend: {
                    show: true,
                    right: '4%',
                    data: ['节拍', '平均值', '最大值', '最小值']
                },
                xAxis: {
                    type: 'category',
                    data: []
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
                                color: '#F29C1B',
                                lineStyle: {
                                    color: '#F29C1B'
                                }
                            }
                        }
                    },
                    {
                        data: [],
                        type: 'line',
                        itemStyle: {
                            normal: {
                                color: '#797979',
                                lineStyle: {
                                    color: '#797979',
                                    type: 'dashed'
                                }
                            }
                        }
                    },
                    {
                        data: [],
                        type: 'line',
                        itemStyle: {
                            normal: {
                                color: 'red',
                                lineStyle: {
                                    color: 'red',
                                    type: 'dashed'
                                }
                            }
                        }
                    },
                    {
                        data: [],
                        type: 'line',
                        itemStyle: {
                            normal: {
                                color: 'red',
                                lineStyle: {
                                    color: 'red',
                                    type: 'dashed'
                                }
                            }
                        }
                    }
                ]
            };

            this.$axios({
                method: 'get',
                url: `/api/ProduceData/GetLineBeatsAsync?input.model=${this.formData.qq1}&input.productionLine=${this.formData.qq4}&input.startTime=${this.formData.st}&input.endTime=${this.formData.ed}`
            })
                .then(res => {
                    if (res.data.code == 0) {
                        if (!res.data.data.Beats) {
                            res.data.data.Beats = [];
                        }
                        this.dataObj = res.data.data;
                        option1.series[0].itemStyle.normal.lineStyle.color =
                            '#ffc053';
                        option1.series[0].itemStyle.normal.color = '#ffc053';
                        option1.xAxis.data = res.data.data.Beats.map(
                            _ => _.ProductId
                        );
                        option1.series[0].data = res.data.data.Beats.map(
                            _ => _.Beat
                        );
                        option1.series[1].data = res.data.data.Beats.map(
                            _ => res.data.data.Avg
                        );
                        option1.series[2].data = res.data.data.Beats.map(
                            _ => res.data.data.Max
                        );
                        option1.series[3].data = res.data.data.Beats.map(
                            _ => res.data.data.Min
                        );
                        var Chart1 = echarts.init(
                            document.getElementById('my-chart1')
                        );
                        Chart1.setOption(option1, true);
                    } else {
                        this.dataObj = {};
                        this.isPopShow = true;
                        this.tipText = res.data.msg;
                        let Chart1 = echarts.init(
                            document.getElementById('my-chart2')
                        );
                        Chart1.clear();
                    }
                })
                .catch(err => {
                    console.log('err', err);
                });
        },
        // 范围设置-显示
        setRangeShow() {
            //接口有点慢，先清了等接口回来再显示
            this.popData1 = {
                upperLimit: '',
                lowerLimit: ''
            };
            this.$axios({
                method: 'get',
                url: `/api/Setting/Get?request.providerName=G&request.providerKey=${this.formData.qq1}&request.namePrefix=SCMS.RangeSetting`
            })
                .then(res => {
                    if (res.data.code == 0) {
                        let Settings = res.data.data.Settings;
                        this.popData = Settings.length
                            ? JSON.parse(Settings[0].Value)
                            : [];
                        console.log('popData', this.popData, this.formData.qq4);
                        let _obj =
                            this.popData.find(
                                _ =>
                                    _.RangeType == 0 &&
                                    _.Subject == this.formData.qq4
                            ) || {};
                        this.popData1 = {
                            upperLimit: _obj.UpperLimit,
                            lowerLimit: _obj.LowerLimit
                        };
                    } else {
                        this.isPopShow = true;
                        this.tipText = res.data.msg;
                    }
                })
                .catch(err => {
                    console.log('err', err);
                });
            this.setRangeConfig.show = true;
        },
        isNumber(val) {
            var re = /^[0-9]+(\.[0-9]?)?$/;
            console.log('val', val, re.test(val));
            return re.test(val);
        },
        // 范围设置-回调
        setRangeCallback(state) {
            if (state == 'confirm') {
                let b = this.popData.find(
                    _ => _.RangeType == 0 && _.Subject == this.formData.qq4
                );
                if (b) {
                    b.UpperLimit = this.popData1.upperLimit;
                    b.LowerLimit = this.popData1.lowerLimit;
                } else {
                    this.popData.push({
                        RangeType: 0,
                        Subject: this.formData.qq4,
                        UpperLimit: this.popData1.upperLimit,
                        LowerLimit: this.popData1.lowerLimit
                    });
                }
                let bool1 = this.popData.some(_ => {
                    let _a =
                        !_.UpperLimit ||
                        (_.UpperLimit && this.isNumber(_.UpperLimit));
                    let _b =
                        !_.LowerLimit ||
                        (_.LowerLimit && this.isNumber(_.LowerLimit));
                    console.log(_a, _b);
                    return !_a || !_b;
                });
                if (bool1) {
                    this.isPopShow = true;
                    this.tipText = '上下限请输入小数位不超过一位的0或正数!';
                    return;
                }

                this.$axios({
                    method: 'post',
                    url: '/api/Setting/UpdateRangeSetting',
                    data: {
                        ProviderName: 'G',
                        ProviderKey: this.formData.qq1,
                        Settings: [
                            {
                                Name: 'SCMS.RangeSetting',
                                Value: this.popData
                            }
                        ]
                    }
                })
                    .then(res => {
                        if (res.data.code == 0) {
                            this.isPopShow = true;
                            this.tipText = '修改成功！';
                            this.queryData();
                            this.setRangeConfig.show = false;
                        } else {
                            this.isPopShow = true;
                            this.tipText = res.data.msg;
                        }
                    })
                    .catch(err => {
                        console.log('err', err);
                    });
            } else {
                this.setRangeConfig.show = false;
            }
        },
        // 导出图片
        exportPicture() {
            const DOM = document.getElementsByClassName('my-chart')[0];
            html2canvas(DOM).then(function(canvas) {
                const src = canvas.toDataURL('image/png');
                const a = document.createElement('a');
                a.download = name;
                a.href = src;
                a.click();
                a.remove();
            });
        },
        getProductTypes() {
            this.$axios({
                method: 'post',
                url: '/api/FormulaManage/QueryProductType'
            })
                .then(res => {
                    if (res.data.code == 0) {
                        this.productTypesList = res.data.data;
                        if (this.productTypesList.length) {
                            this.formData.qq1 = this.productTypesList[0].ProductTypeCode;
                        }
                        this.getLines();
                    } else {
                        this.isPopShow = true;
                        this.tipText = res.data.msg;
                    }
                })
                .catch(err => {
                    console.log('err', err);
                });
        },
        getLines() {
            this.$axios({
                method: 'get',
                url: '/api/ProcessParameterConfigure/GetLine'
            })
                .then(res => {
                    if (res.data.code == 0) {
                        this.lineList = res.data.data;
                        this.lineList.unshift({
                            Name: '不限',
                            Value: ''
                        });
                        if (this.lineList.length) {
                            this.formData.qq4 = this.lineList[0].Value;
                        }
                        this.queryData();
                    } else {
                        this.isPopShow = true;
                        this.tipText = res.data.msg;
                    }
                })
                .catch(err => {
                    console.log('err', err);
                });
        }
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
        this.getProductTypes();
    }
};
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
            color: #6c6d6d;
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

    & > .my-head {
        width: 100%;
        height: 60px;
        padding: 0 10px;
        justify-content: space-between;
        background-color: #dddddd;

        ::v-deep .el-form {
            .el-form-item {
                margin-bottom: 0;
            }
        }
    }

    & > .content {
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
    border: 1px solid #e4e4e4;

    // 信息
    & > .info {
        width: 100%;
        padding: 0 10px;
        background-color: #f8f8f8;

        & > .row {
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

    & > .proportion {
        padding: 20px 0 0 10px;
        line-height: 20px;
        font-size: 14px;
        font-weight: 400;
        color: #333333;

        & > .value {
            line-height: 40px;
            font-size: 20px;
            font-weight: bold;
            color: #386df0;
        }
    }

    & > .process {
        width: 100%;
        height: calc(100% - 295px);
        background-color: #f8f8f8;
        padding: 10px;
        margin: 10px 0 0 0;
        overflow-x: hidden;
        overflow-y: auto;

        // 工序选择
        .working-procedure {
            width: 100%;
            padding: 0 0 20px 0;
        }

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

    & > .title {
        width: 40%;
        height: 36px;
        padding: 0 0 0 20px;
        position: absolute;
        top: 0;
        left: 0;
        line-height: 36px;
        font-size: 16px;
        font-weight: 400;
        color: #4270e4;
        background-color: #eef3ff;
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

    & > .my-chart {
        width: calc(100% - 210px);
        height: 100%;
        margin: 0 10px 0 0;
        position: relative;
        background-color: #f8f8f8;
    }

    > .my-form {
        width: 300px;
        height: 100%;
        padding: 10px;
    }
}
</style>
