<template>
    <BaseDialog
        :title="
            searchForm.IsRealTime ? $$t('样本实时数据') : $$t('样本历史数据')
        "
        v-model="visible"
        width="1200px"
        :show-close="false"
    >
        <el-table
            :data="sampleData"
            ref="tableRef"
            border
            style="width: 100%; 
            border: 2px solid #E4E4E4;"
            :header-cell-style="{ color: '#4270E4' }"
        >
            <el-table-column
                prop="SerialNumber"
                width="120"
                :label="lang.SPCAnalysis_WarnRecordWindow_SerialNumber"
            />
            <el-table-column
                prop="CreateTime"
                :label="lang.SPCAnalysis_SampleWindow_AnalyzeTime"
            >
                <template #default="{row}">
                    {{ formatTime(row.CreateTime) }}
                </template>
            </el-table-column>
            <el-table-column
                prop="Shift"
                :label="lang.SPCAnalysis_SampleWindow_WorkNumber"
            >
            </el-table-column>
            <el-table-column
                :prop="'SampleValue' + item"
                :label="lang.SPCAnalysis_SPCAnalysisUserControl_Sample + item"
                v-for="item of searchForm.SubgroupCapacity"
                :key="item"
            >
                <span
                    slot-scope="{ row }"
                    :style="row.State === '正常' ? '' : 'color: red'"
                    >{{ row['SampleValue' + item] }}</span
                >
            </el-table-column>
            <el-table-column
                prop="State"
                :label="lang.SPCAnalysis_SampleWindow_Status"
            >
                <span
                    slot-scope="{ row }"
                    :style="row.State === '正常' ? '' : 'color: red'"
                    >{{ row.State }}</span
                >
            </el-table-column>
            <el-table-column
                prop="Ave"
                :label="lang.SPCAnalysis_SampleWindow_AvgValue"
            >
            </el-table-column>
            <el-table-column
                prop="StandardDeviation"
                :label="lang.SPCAnalysis_SampleWindow_StandardDeviation"
            >
            </el-table-column>
            <el-table-column
                prop="Range"
                :label="lang.SPCAnalysis_SampleWindow_MaxMinValueRange"
            >
            </el-table-column>
        </el-table>
        <template #footer>
            <div class="footer">
                <el-button @click="handleClose" class="close">{{
                    lang.SpcConfig_SpcRecord_Cancel
                }}</el-button>
                <el-button class="confirm" @click="handleExport">{{
                    lang.SpcConfig_SpcRecord_Export
                }}</el-button>
            </div>
        </template>
    </BaseDialog>
</template>
<script>
import {
    defineComponent,
    ref,
    watch,
    computed,
    onMounted
} from '@vue/composition-api';
import BaseDialog from '../../dialog/BaseDialog.vue';
import { SPCAnalysisApi } from '../api';
import moment from 'moment'; //导入文件
export default defineComponent({
    name: 'ModelDialog',
    components: {
        BaseDialog
    },
    props: {
        value: {
            type: Boolean,
            default: false
        },
        searchForm: {
            type: Object,
            default: () => ({})
        },
        originalSampleDatas: {
            type: Object,
            default: () => ({}),
            required: true
        },
        parameterId: {
            type: [String, Number],
            default: '',
            required: true
        }
    },
    emits: ['confirm'],
    setup(props, { emit }) {
        const lang = ref({});

        const visible = computed({
            get() {
                return props.value;
            },
            set(val) {
                emit('input', val);
            }
        });

        watch(
            () => props.value,
            val => {
                console.log(val);
                if (val) {
                    getSampleDataList();
                }
            }
        );

        const handleClose = () => {
            visible.value = false;
            emit('close');
        };

        const downFile = (file, fileName) => {
            const blob = new Blob([file], {
                type:
                    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
            });
            // 兼容不同浏览器的URL对象
            const url = window.URL || window.webkitURL;
            // 创建下载链接
            const downloadHref = url.createObjectURL(blob);
            // 创建a标签并为其添加属性
            let downloadLink = document.createElement('a');
            downloadLink.href = downloadHref;
            downloadLink.download = fileName;
            // 触发点击事件执行下载
            downloadLink.click();
            window.URL.revokeObjectURL(url);
        };

        const sampleData = ref([]);
        const getSampleDataList = async () => {
            const res = await SPCAnalysisApi.getSampleData({
                ...props.searchForm,
                ParameterId: props.parameterId,
                OriginalSampleDatas: props.originalSampleDatas
            });
            sampleData.value = res.data.data;
        };

        const handleExport = async () => {
            const res = await SPCAnalysisApi.exportSampleData({
                ...props.searchForm,
                ParameterId: props.parameterId,
                OriginalSampleDatas: props.originalSampleDatas
            });
            downFile(
                res.data,
                'SPC' + lang.value.SPCAnalysis_SPCAnalysisUserControl_Sample
            );
            visible.value = false;
            emit('confirm');
        };

        const formatTime = time => {
            return moment(time).format('YYYY-MM-DD HH:mm:ss');
        };

        const tableRef = ref(null);
        const tableData = ref();

        onMounted(() => {
            lang.value = JSON.parse(localStorage.getItem('languages'))[
                localStorage.getItem('currentLang')
            ];
        });

        return {
            formatTime,
            visible,
            handleClose,
            tableData,
            tableRef,
            handleExport,
            sampleData,
            lang
        };
    }
});
</script>
<style lang="scss" scoped>
::v-deep {
    thead {
        th {
            background: #dcf0f9;
        }
        .el-table-column--selection {
            .cell {
                display: none;
            }
        }
    }
}
.footer {
    display: flex;
    align-items: center;
    margin-top: 20px;
    justify-content: center;
    .close {
        width: 100px;
        height: 38px;
    }

    .confirm {
        width: 100px;
        height: 38px;
        background: #386df0;
        border-radius: 4px 4px 4px 4px;
        border: none;
        color: #fff;
    }
}
</style>
