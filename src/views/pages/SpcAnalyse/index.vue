<template>
    <div ref="menuRef" class="SpcConfig">
        <!-- <div class="right-container"> -->
        <div class="head-wrap">
            <div class="left">
                <div class="select-product">
                    <span class="label"
                        >{{
                            lang.SPCAnalysis_SPCAnalysisUserControl_AlarmMode
                        }}：</span
                    >
                    <el-select
                        v-model="searchForm.Mode"
                        placeholder="请选择"
                        style="width: 150px;"
                        @change="changeAlarmMode"
                    >
                        <el-option
                            :label="$$t(`报警停机`)"
                            :value="`报警停机`"
                        ></el-option>
                        <el-option
                            :label="$$t(`报警不停机`)"
                            :value="`报警不停机`"
                        ></el-option>
                    </el-select>
                </div>
                <div class="left-main">
                    <div class="rule-text">
                        <img
                            @click="visible = true"
                            src="@/assets/images/pages/tips.png"
                            class="tips"
                        />
                        <span class="label">
                            {{ $$t(`判异规则选择`) + '：' }}
                        </span>
                    </div>
                    <div class="mode-list">
                        <div
                            class="mode-item"
                            @click="changeRule(item)"
                            :class="{ active: curRule.includes(item) }"
                            v-for="item of 8"
                            :key="item.Key"
                        >
                            {{ $$t(`模式`) + item }}
                        </div>
                    </div>
                    <div class="limit-wrap">
                        <div class="limit-item">
                            <span class="label"> {{ $$t('上限值') }}： </span>
                            <el-input
                                style="width: 150px;"
                                class="form-input"
                                placeholder="请输入"
                                v-model.number="searchForm.USL"
                                @blur="formatInput('USL')"
                            />
                        </div>
                        <div class="limit-item">
                            <span class="label"> {{ $$t('下限值') }}： </span>
                            <el-input
                                style="width: 150px;"
                                class="form-input"
                                v-model.number="searchForm.LSL"
                                placeholder="请输入"
                                @blur="formatInput('LSL')"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div class="right">
                <template v-if="searchForm.IsRealTime">
                    <el-badge
                        :value="AlarmTableData.length"
                        :hidden="AlarmTableData.length === 0"
                    >
                        <el-button
                            class="yellow-btn"
                            @click="visibleAlarmConfirm = true"
                            >{{ lang.AlarmRecord_Time_Sure }}</el-button
                        >
                    </el-badge>
                    <el-button type="primary" @click="visibleAlarmSet = true">{{
                        lang.SPCAnalysis_WarnSetting_AlarmSetting
                    }}</el-button>
                    <el-button
                        type="primary"
                        @click="visibleAlarmHistory = true"
                        >{{
                            lang.SPCAnalysis_SPCAnalysisUserControl_AlarmRecord
                        }}</el-button
                    >
                </template>
                <el-button type="primary" @click="handleExport">{{
                    lang.SPCAnalysis_SPCAnalysisUserControl_ExportReport
                }}</el-button>
            </div>
        </div>
        <div class="main">
            <NavTree
                class="nav-left"
                v-model="searchForm.ParameterName"
                @change="handleChangeTree"
            />
            <div class="container">
                <div class="main-head-content">
                    <div style="display: flex;align-items: center;">
                        <div class="type-chart">
                            <div
                                class="chart-item"
                                :class="{ active: chartType === 'XChart' }"
                                @click="changCharType('XChart')"
                            >
                                {{
                                    lang.SPCAnalysis_SPCAnalysisUserControl_XRChart
                                }}
                            </div>
                            <div
                                class="chart-item"
                                :class="{ active: chartType === 'Plan' }"
                                @click="changCharType('Plan')"
                            >
                                {{
                                    lang.SPCAnalysis_SPCAnalysisUserControl_NormalDistributionPlot
                                }}
                            </div>
                        </div>
                        <el-button
                            class="yellow-btn sample"
                            @click="modelDialogVisible = true"
                            >{{
                                lang.SPCAnalysis_SPCAnalysisUserControl_SampleData
                            }}</el-button
                        >
                        <template v-if="!searchForm.IsRealTime">
                            <div class="form-item">
                                <div
                                    style="display: inline-flex; align-items: center;"
                                >
                                    <el-date-picker
                                        type="datetime"
                                        v-model="searchForm.StartTime"
                                        :clearable="false"
                                        style="width: 195px;"
                                    ></el-date-picker>
                                    <div style="margin: 0 5px;">-</div>
                                    <el-date-picker
                                        type="datetime"
                                        v-model="searchForm.EndTime"
                                        :clearable="false"
                                        style="width: 195px;"
                                    ></el-date-picker>
                                </div>
                            </div>
                            <!-- <div class="form-item">
                        <span class="label"
                            >{{
                                lang.SPCAnalysis_SPCAnalysisUserControl_SampleInterval
                            }}：</span
                        >
                        <el-select
                            v-model="searchForm.SampleInterval"
                            placeholder="请选择"
                            style="width: 100px;"
                        >
                            <el-option
                                v-for="item in intervalList"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                            ></el-option>
                        </el-select>
                    </div> -->
                            <!-- <div class="form-item">
                        <span class="label"
                            ><i @click="handleHelp" class="el-icon-question"></i
                            >{{
                                lang.SpcConfig_EditingWindow_SubGroupCapacity
                            }}：</span
                        >
                        <el-input
                            style="width: 80px;"
                            class="form-input"
                            v-model="searchForm.SubgroupCapacity"
                            type="number"
                        />
                    </div> -->
                            <el-button class="search-btn" @click="pollFunction">
                                {{ lang.LogManage_LoginRecord_Select }}
                            </el-button>
                        </template>
                    </div>
                    <el-switch
                        class="swith-history"
                        v-model="searchForm.IsRealTime"
                        active-color="#13ce66"
                        inactive-color="#7E92A2"
                        :active-text="
                            searchForm.IsRealTime
                                ? lang.SPCAnalysis_SPCAnalysisUserControl_RealTime
                                : lang.SPCAnalysis_SPCAnalysisUserControl_History
                        "
                        :width="118"
                        @change="pollFunction"
                    >
                    </el-switch>
                    <!-- <i
                        class="el-icon-refresh-right icon-refresh"
                        @click="pollFunction"
                    ></i> -->
                </div>
                <div class="chart-content">
                    <ControlChart
                        ref="controlChartRef"
                        :chartType="chartType"
                        :chartData="chartData"
                    />
                </div>
            </div>
        </div>
        <RuleDialog v-model="visible" :ruleList="ruleList" />
        <SubGroupDialog v-model="visibleSubGroupDialog" />

        <ModelDialog
            v-model="modelDialogVisible"
            :searchForm="searchForm"
            :originalSampleDatas="originalSampleDatas"
            :parameterId="treeNodeData.Id"
        />
        <AlarmSetDialog v-model="visibleAlarmSet"></AlarmSetDialog>
        <AlarmConfirmDialog
            v-model="visibleAlarmConfirm"
            :table-data="AlarmTableData"
            @confirm="GetAlarmListFn"
        ></AlarmConfirmDialog>
        <AlarmHistoryDialog v-model="visibleAlarmHistory"></AlarmHistoryDialog>
        <!-- </div> -->
    </div>
</template>
<script>
import {
    defineComponent,
    ref,
    reactive,
    onMounted,
    getCurrentInstance
} from '@vue/composition-api';
import { useMenuHeight } from '../hooks/use-menu-height';
import NavTree from './components/NavTree.vue';
import RuleDialog from './components/RuleDialog.vue';
import ControlChart from './components/ControlChart.vue';
import ModelDialog from './components/ModelDialog.vue';
import AlarmSetDialog from './components/AlarmSetDialog.vue';
import AlarmConfirmDialog from './components/AlarmConfirmDialog.vue';
import AlarmHistoryDialog from './components/AlarmHistoryDialog.vue';
import _ from 'lodash';
import { SPCAnalysisApi, getSpcConfig } from './api';
import SubGroupDialog from '../SpcConfig/components/SubGroupDialog.vue';
import moment from 'moment';
import store from '@/store';

export default defineComponent({
    name: 'SpcConfig',
    components: {
        NavTree,
        RuleDialog,
        ControlChart,
        SubGroupDialog,
        ModelDialog,
        AlarmSetDialog,
        AlarmConfirmDialog,
        AlarmHistoryDialog
    },
    setup() {
        const { proxy } = getCurrentInstance();
        const lang = ref({});
        const controlChartRef = ref();
        const { menuRef } = useMenuHeight();
        const modelDialogVisible = ref(false);
        const visible = ref(false);
        const visibleSubGroupDialog = ref(false);
        const visibleAlarmSet = ref(false);
        const visibleAlarmConfirm = ref(false);
        const visibleAlarmHistory = ref(false);
        const chartData = ref();
        const treeNodeData = ref({});
        const productList = ref([]);

        const originalSampleDatas = ref({});
        const cachePreSearchData = ref({});

        const searchForm = reactive({
            Mode: '',
            ParameterName: '',
            ProductModel: '',
            USL: '',
            LSL: '',
            SampleInterval: 0.5,
            SubgroupCapacity: '',
            StartTime: '',
            EndTime: '',
            IsRealTime: true,
            DisplayXR: true
        });

        const getCacheParams = () => {
            return _.pick(searchForm, [
                'USL',
                'LSL',
                'ProductModel',
                'SampleInterval',
                'SubgroupCapacity',
                'ParameterId',
                'EndTime',
                'StartTime'
            ]);
        };

        const queryChartData = async () => {
            const params = {
                // ParameterName: treeNodeData.value
                ...searchForm,
                ParameterId: treeNodeData.value.Id
                // ParameterId: 1
            };
            if (_.isEqual(cachePreSearchData.value, getCacheParams())) {
                params.OriginalSampleDatas = originalSampleDatas.value;
            }
            // 这玩意是判异模式
            for (let i = 1; i < 9; i++) {
                if (curRule.value.includes(i)) {
                    params['R' + i] = true;
                } else {
                    params['R' + i] = false;
                }
            }

            const response = await SPCAnalysisApi.QueryChartData(params);
            chartData.value = response.data.data || {};
            originalSampleDatas.value = chartData.value.OriginalSampleDatas;
            cachePreSearchData.value = getCacheParams();
        };

        const getSpcConfigData = async id => {
            const res = await getSpcConfig(id);
            const data = res.data.data;
            if (!data) return;
            searchForm.USL = data.UpperLimit;
            searchForm.LSL = data.LowerLimit;
            searchForm.SubgroupCapacity = data.SubgroupCapacity;
            searchForm.Mode = data.IsAlarmShutDown ? `报警停机` : `报警不停机`;
            return Promise.resolve();
        };

        const handleChangeTree = async nodeData => {
            treeNodeData.value = nodeData || {};
            console.log(nodeData, '---');
            await getSpcConfigData(nodeData.Id);
            pollFunction();
        };
        const handleExport = async () => {
            const params = {
                // ParameterName: treeNodeData.value
                ...searchForm,
                ParameterId: treeNodeData.value.Id
                // ParameterId: 1
            };
            if (_.isEqual(cachePreSearchData.value, getCacheParams())) {
                params.OriginalSampleDatas = originalSampleDatas.value;
            }
            const res = await SPCAnalysisApi.exportReport({
                Pictures: controlChartRef.value.getChartBase64().map(e=> e.substring(22)) || [],
                ...params
            });
            proxy.downloadFile(
                res.data,
                lang.value.SpcConfig_SpcConfigUserControl_SPCAnalyze + '.xlsx'
            );
        };

        const dataSource = ref([]);

        const intervalList = ref([]);

        const initIntervalList = () => {
            intervalList.value = [
                { label: '0.5' + $$t(`小时`), value: 0.5 },
                { label: '1' + $$t(`小时`), value: 1 },
                { label: '2' + $$t(`小时`), value: 2 },
                { label: '3' + $$t(`小时`), value: 3 },
                { label: '4' + $$t(`小时`), value: 4 },
                { label: '5' + $$t(`小时`), value: 5 },
                { label: '6' + $$t(`小时`), value: 6 }
            ];
        };

        const ruleList = ref([]);
        const curRule = ref([1]);
        const changeRule = async rule => {
            const index = curRule.value.findIndex(item => item === rule);
            if (index != -1) {
                curRule.value.splice(index, 1);
            } else {
                curRule.value.push(rule);
            }
            await SPCAnalysisApi.SaveAlarmPattern({
                ParameterName: searchForm.ParameterName,
                Pattern: Array(8)
                    .fill(0)
                    .map((e, i) => curRule.value.includes(i + 1)),
                LoginUserName: store.state.user.SCMSUserName
            });
            queryChartData();
        };
        const getRules = async () => {
            const res = await SPCAnalysisApi.getOOCRules();
            ruleList.value = res.data.data;
        };

        const handleHelp = () => {
            visibleSubGroupDialog.value = true;
        };
        const formatInput = async key => {
            if (searchForm[key] !== '') {
                searchForm[key] = Number(
                    parseFloat(searchForm[key]).toFixed(5)
                );
            }
            await SPCAnalysisApi.SaveAlarmUpperLower({
                ParameterName: searchForm.ParameterName,
                UpperLimit: Number(searchForm.USL),
                LowerLimit: Number(searchForm.LSL),
                LoginUserName: store.state.user.SCMSUserName
            });
        };

        const chartType = ref('XChart');
        const changCharType = type => {
            if (type === 'XChart') {
                searchForm.DisplayXR = true;
            } else {
                searchForm.DisplayXR = false;
            }
            chartType.value = type;
            queryChartData();
        };

        let pollInterval = null;
        const pollFunction = async () => {
            clearTimeout(pollInterval);
            queryChartData();
            initAlarm();
            if (searchForm.IsRealTime) {
                pollInterval = setTimeout(
                    pollFunction,
                    1000 * 60 * 60 * searchForm.SampleInterval
                    // 1000 * searchForm.SampleInterval
                );
            }
        };

        const AlarmTableData = ref([]);
        const initAlarm = async () => {
            // 啥时候请求？？
            await GetAlarmListFn();
        };
        const GetAlarmListFn = async () => {
            const res = await SPCAnalysisApi.GetAlarmList();
            if (res.data.code === 0) {
                AlarmTableData.value = res.data.data || [];
            }
        };
        const changeAlarmMode = async Mode => {
            await SPCAnalysisApi.SaveAlarmShutDown({
                ParameterName: searchForm.ParameterName,
                Mode,
                LoginUserName: store.state.user.SCMSUserName
            });
            queryChartData();
        };

        onMounted(async () => {
            lang.value = JSON.parse(localStorage.getItem('languages'))[
                localStorage.getItem('currentLang')
            ];
            initIntervalList();
            await getRules();
            // 设置时间为 0 点
            searchForm.StartTime = moment()
                .startOf('day')
                .toISOString();
            searchForm.EndTime = moment()
                .add(1, 'day')
                .startOf('day')
                .subtract(1, 's')
                .toISOString();
        });

        return {
            menuRef,
            dataSource,
            intervalList,
            searchForm,
            visible,
            handleHelp,
            productList,
            ruleList,
            curRule,
            changeRule,
            visibleSubGroupDialog,
            formatInput,
            changCharType,
            chartType,
            pollFunction,
            chartData,
            modelDialogVisible,
            handleExport,
            lang,
            controlChartRef,
            originalSampleDatas,
            treeNodeData,
            visibleAlarmSet,
            visibleAlarmConfirm,
            visibleAlarmHistory,
            AlarmTableData,
            handleChangeTree,
            GetAlarmListFn,
            changeAlarmMode
        };
    }
});
</script>
<style lang="scss" scoped>
.yellow-btn {
    color: #fdae22;
    border-color: #fdae22;
}
.SpcConfig {
    width: 100%;
    background-color: #e9eeef;
    padding: 20px 24px;
    display: flex;
    flex-direction: column;

    .main {
        display: flex;
        flex: 1;
        background: #fff;
        overflow-y: auto;
    }
    .head-wrap {
        display: flex;
        align-items: center;
        justify-content: space-between;
        /* height: 60px; */
        padding: 11px;
        background: #dddddd;
        ::v-deep {
            .el-form-item {
                margin-bottom: 0;
            }
            .el-form-item__label {
                font-size: 14px;
            }
        }

        .left {
            display: flex;
            align-items: center;
            flex: 1;
            overflow: hidden;
            .label {
                font-size: 14px;
                font-weight: 400;
                color: #6c6d6d;
            }
            .left-main {
                display: flex;
                align-items: center;
                flex: 1;
                overflow-x: auto;
            }
            .rule-text {
                display: flex;
                align-items: center;
                margin-right: 10px;
                flex-shrink: 0;
                .tips {
                    width: 20px;
                    height: 20px;
                    flex-shrink: 0;
                    margin-right: 8px;
                    cursor: pointer;
                }
            }
            .select-product {
                flex-shrink: 0;
                margin-right: 10px;
            }

            .mode-list {
                flex: 1;
                overflow-y: auto;
                display: flex;
                align-items: center;
                .mode-item {
                    text-wrap: nowrap;
                    padding: 0 30px;
                    line-height: 38px;
                    background: #fff;
                    color: #333333;
                    border-right: 1px solid #e4e4e4;
                    cursor: pointer;
                    &:last-child {
                        border-right: 0;
                    }
                    &.active {
                        background: #386df0;
                        color: #fff;
                    }
                }
            }
            .limit-wrap {
                display: flex;
                align-items: center;
                .limit-item {
                    margin-left: 10px;
                }
            }
        }
        .right {
            margin-left: 10px;
            flex-shrink: 0;
            column-gap: 10px;
            & > * {
                margin-left: 10px;
            }
            .el-button.el-button--primary {
                background-color: #386df0;
                border-color: #386df0;
            }
        }
    }
    .el-icon-question {
        font-size: 16px;
        margin-left: 5px;
        cursor: pointer;
    }
}
.nav-left {
    width: 240px;
    border-right: 1px solid #e4e4e4;
}
.main-head-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .type-chart {
        display: flex;
        border: 1px solid #e4e4e4;

        .chart-item {
            width: 102px;
            height: 40px;
            background: #ffffff;
            border-right: 1px solid #e4e4e4;
            font-size: 16px;
            font-family: PingFang SC-Medium, PingFang SC;
            color: #333333;
            text-align: center;
            line-height: 40px;
            cursor: pointer;

            &:last-child {
                border: 0;
            }
            &.active {
                background: #386df0;
                color: #fff;
            }
        }
    }
    .sample {
        margin-left: 20px;
    }
    .form-item {
        margin-left: 20px;
        white-space: nowrap;
        .label {
            font-size: 14px;
            font-weight: 400;
            color: #6c6d6d;
            margin-right: 8px;
        }
    }
    .search-btn {
        background: #386df0;
        color: #fff;
        margin-left: 20px;
        width: 120px;
    }
    .swith-history {
        margin-left: 20px;
        width: 118px;
    }
    ::v-deep {
        .el-switch__label {
            position: absolute;
            left: 34px;
            span {
                font-size: 16px;
                font-family: Source Han Sans CN-Medium, Source Han Sans CN;
                font-weight: 500;
                color: #ffffff;
            }
        }
        .el-switch__core {
            height: 38px;
            border-radius: 19px;
            &::after {
                width: 34px;
                height: 34px;
            }
        }
        .swith-history.is-checked {
            .el-switch__core {
                &::after {
                    left: 85%;
                }
            }
        }
    }
}
.container {
    flex: 1;
    padding: 20px;
    background: #f5f5f5;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
}
.chart-content {
    /* background: #fff; */
    margin-top: 10px;
    flex: 1;
    overflow-y: auto;
}

.el-icon-question {
    font-size: 16px;
    margin-left: 5px;
    cursor: pointer;
}
.icon-refresh {
    font-size: 36px;
    margin-left: 15px;
    cursor: pointer;
    color: #386df0;
}
</style>
