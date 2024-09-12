<template>
    <BaseDialog
        :title="$$t(`报警记录`)"
        v-model="visible"
        width="1300px"
        :show-close="false"
        @open="open"
    >
        <el-form size="small" :model="queryParams" ref="formRef">
            <el-form-item :label="$$t('报警时间')">
                <div style="display: flex;justify-content: space-between;">
                    <div
                        style="display: flex;align-items: center; column-gap: 10px;"
                    >
                        <el-date-picker
                            type="datetime"
                            v-model="queryParams.startTime"
                        ></el-date-picker>
                        <span> - </span>
                        <el-date-picker
                            type="datetime"
                            v-model="queryParams.endTime"
                        ></el-date-picker>
                        <el-button type="primary" @click="query">{{
                            $$t('查询')
                        }}</el-button>
                    </div>
                    <div>
                        <el-button type="primary" plain @click="onExport">{{
                            $$t('导出')
                        }}</el-button>
                    </div>
                </div>
            </el-form-item>
            <Table :data="tableData" ref="tableRef" border height="400">
                <el-table-column type="index" width="55" :label="$$t(`序号`)" />
                <el-table-column prop="CreateTime" :label="$$t(`报警时间`)" />
                <el-table-column
                    prop="ParameterName"
                    :label="$$t(`报警变量名`)"
                />
                <el-table-column prop="ErrorType" :label="$$t(`报警类型`)" />
                <el-table-column prop="Spot" :label="$$t(`点数`)" />
                <el-table-column prop="Reason" :label="$$t(`原因`)" />
                <el-table-column prop="Handle" :label="$$t(`处理方法`)" />
                <el-table-column prop="Remarks" :label="$$t(`备注`)" />
                <el-table-column prop="HandleBy" :label="$$t(`处理人`)" />
            </Table>
        </el-form>
        <template #footer>
            <div class="footer">
                <el-button type="info" @click="handleClose">{{
                    $$t(`取消`)
                }}</el-button>
                <el-button type="primary" @click="handleClose">{{
                    $$t(`确定`)
                }}</el-button>
            </div>
        </template>
    </BaseDialog>
</template>
<script>
import {
    defineComponent,
    ref,
    reactive,
    computed,
    getCurrentInstance
} from '@vue/composition-api';
import BaseDialog from '../../dialog/BaseDialog.vue';
import Table from '../../components/Table/index.vue';
import { SPCAnalysisApi } from '../api';
import store from '@/store';
import dayjs from 'dayjs';

export default defineComponent({
    name: 'AlarmHistoryDialog',
    components: {
        Table,
        BaseDialog
    },
    props: {
        value: {
            type: Boolean,
            default: false
        }
    },
    emits: ['confirm'],
    setup(props, { emit }) {
        const { proxy } = getCurrentInstance();
        const visible = computed({
            get() {
                return props.value;
            },
            set(val) {
                emit('input', val);
            }
        });

        const open = async () => {
            await query();
        };
        const handleClose = () => {
            visible.value = false;
            emit('close');
        };
        const queryParams = reactive({
            startTime: dayjs().format('YYYY-MM-DD 00:00:00'),
            endTime: dayjs().format('YYYY-MM-DD 23:59:59')
        });
        const tableRef = ref(null);
        const tableData = ref([]);
        const query = async () => {
            const res = await SPCAnalysisApi.GetAlarmRecordList(
                null,
                queryParams
            );
            if (res.data.code === 0) {
                tableData.value = res.data.data || [];
            }
        };
        const onExport = () => {
            SPCAnalysisApi.ExportAlarmRecord(queryParams).then(res => {
                proxy.downloadFile(res.data, `${$$t(`报警记录`)}.xlsx`);
            });
        };

        return {
            visible,
            tableRef,
            tableData,
            queryParams,

            open,
            handleClose,
            query,
            onExport
        };
    }
});
</script>
<style lang="scss" scoped>
::v-deep {
    .el-table {
        .el-form-item {
            margin-bottom: 0;
            .el-form-item__error {
                position: relative;
            }
        }
    }
}
.footer {
    display: flex;
    margin-top: 20px;
    align-items: center;
    justify-content: flex-end;
    .confirm {
        background: #386df0;
        color: #fff;
    }
}
</style>
