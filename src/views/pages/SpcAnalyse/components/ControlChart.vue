<template>
    <div class="control-chart">
        <div class="main">
            <!-- <XChart /> -->
            <component :is="chartType" :chartData="chartData" ref="comRef" />
        </div>
        <div class="explain">
            <div class="norm-explain">
                <div class="norm-item">
                    <span class="key">{{
                        lang.SPCAnalysis_SPCAnalysisUserControl_AvgValue
                    }}</span>
                    <span class="value">{{ chartData.Vae }}</span>
                </div>
                <div class="norm-item">
                    <span class="key">sigma</span>
                    <span class="value">{{ chartData.Sigmas }}</span>
                </div>
                <div class="norm-item">
                    <span class="key">Cp</span>
                    <span class="value">{{ chartData.Cp }}</span>
                </div>
                <div class="norm-item">
                    <span class="key">Cpk</span>
                    <span class="value">{{ chartData.Cpk }}</span>
                </div>
                <div class="norm-item">
                    <span class="key">ppm</span>
                    <span class="value">{{ chartData.Ppm }}</span>
                </div>
            </div>
            <template v-if="chartType === 'XChart'">
                <div class="detail-table">
                    <h3 class="table-title">
                        {{
                            lang.SPCAnalysis_SPCAnalysisUserControl_XChartErrorDetail
                        }}
                    </h3>
                    <el-table
                        :data="chartData.XControlList"
                        border
                        class="custom-table"
                        :header-cell-style="{
                            color: '#fff',
                            background: '#386DF0',
                            fontSize: '15px'
                        }"
                    >
                        <el-table-column
                            prop="ErrorType"
                            :label="
                                lang.SPCAnalysis_DiscriminantRuleWindow_RuleNo
                            "
                        >
                        </el-table-column>
                        <el-table-column
                            prop="Start"
                            :label="
                                lang.SPCAnalysis_SPCAnalysisUserControl_BeginPoint
                            "
                        >
                        </el-table-column>
                        <el-table-column
                            prop="Number"
                            :label="
                                lang.SPCAnalysis_SPCAnalysisUserControl_ErrorPointCount
                            "
                        >
                        </el-table-column>
                    </el-table>
                </div>
                <div class="detail-table">
                    <h3 class="table-title">
                        {{
                            lang.SPCAnalysis_SPCAnalysisUserControl_RChartErrorDetail
                        }}
                    </h3>
                    <el-table
                        :data="chartData.RControlList"
                        border
                        class="custom-table"
                        :header-cell-style="{
                            color: '#fff',
                            background: '#386DF0',
                            fontSize: '15px'
                        }"
                    >
                        <el-table-column
                            prop="ErrorType"
                            :label="
                                lang.SPCAnalysis_DiscriminantRuleWindow_RuleNo
                            "
                        >
                        </el-table-column>
                        <el-table-column
                            prop="Start"
                            :label="
                                lang.SPCAnalysis_SPCAnalysisUserControl_BeginPoint
                            "
                        >
                        </el-table-column>
                        <el-table-column
                            prop="Number"
                            :label="
                                lang.SPCAnalysis_SPCAnalysisUserControl_ErrorPointCount
                            "
                        >
                        </el-table-column>
                    </el-table>
                </div>
            </template>
        </div>
    </div>
</template>
<script>
import { defineComponent, ref, onMounted } from '@vue/composition-api';
import XChart from './XChart.vue';
import Plan from './Plan.vue';
export default defineComponent({
    name: 'ControlChart',
    props: {
        chartType: {
            type: String,
            default: 'XChart'
        },
        chartData: {
            type: Object,
            default: () => ({}),
            required: true
        }
    },
    components: {
        XChart,
        Plan
    },
    setup() {
        const lang = ref({});
        const comRef = ref();
        const getChartBase64 = () => {
            return comRef.value.getDataURL();
        };

        onMounted(() => {
            lang.value = JSON.parse(localStorage.getItem('languages'))[
                localStorage.getItem('currentLang')
            ];
        });

        return {
            lang,
            getChartBase64,
            comRef
        };
    }
});
</script>
<style lang="scss" scoped>
.control-chart {
    display: flex;
    height: 100%;
}
.main {
    flex: 1;
    background: #fff;
}
.explain {
    width: 300px;
    margin-left: 20px;
    .norm-explain {
        background: #fff;
        padding: 20px 58px;

        .norm-item {
            display: flex;
            font-size: 16px;
            color: #35363b;

            font-family: PingFang SC-Regular, PingFang SC;
            border: 1px solid #dde0e4;
            line-height: 38px;

            margin-bottom: 10px;
            overflow-x: auto;
        }

        .key {
            width: 73px;
            /* height: 38px; */
            text-align: center;
            background: #dde0e4;
            flex-shrink: 0;
        }
        .value {
            flex: 1;
            padding: 0 10px;
        }
    }
    .detail-table {
        margin-top: 15px;
        .table-title {
            font-size: 16px;
            font-family: PingFang SC-Bold, PingFang SC;
            font-weight: 400;
            color: #35363b;
            margin-bottom: 10px;
        }
        .custom-table {
            width: 100%;
            height: 200px;
            overflow-y: auto;
        }
    }
}
::v-deep {
    .el-table td,
    .el-table th.is-leaf {
        border-right: 1px solid #ebeef5 !important;
    }
}
</style>
