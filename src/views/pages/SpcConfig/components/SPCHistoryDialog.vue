<template>
    <BaseDialog
        :title="$$t(`SPC配置修改记录`)"
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
                <el-table-column prop="UpdateAt" :label="$$t(`修改时间`)" />
                <el-table-column prop="UpdateBy" :label="$$t(`修改人`)" />
                <el-table-column
                    prop="ParameterName"
                    :label="$$t(`修改项目`)"
                />
                <el-table-column prop="UpperLimit" :label="$$t(`规格上限值`)" />
                <el-table-column prop="LowerLimit" :label="$$t(`规格下限值`)" />
                <el-table-column prop="TargetValue" :label="$$t(`目标值`)" />
                <el-table-column
                    prop="DiscriminanMode"
                    :label="$$t(`判异模式`)"
                />
                <el-table-column
                    prop="IsShutDown"
                    :label="$$t(`报警是否停机`)"
                />
                <el-table-column prop="IsAuto" :label="$$t(`控制线是否自动`)" />
            </Table>
            <my-page
                style="height: 60px"
                :pageData="queryParams"
                @req="req"
            ></my-page>
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
import { SPCConfigApi } from '../api';
import store from '@/store';
import dayjs from 'dayjs';
import MyPage from '@/components/public/Paging.vue';

export default defineComponent({
    name: 'SPCHistoryDialog',
    components: {
        Table,
        BaseDialog,
        MyPage
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
            endTime: dayjs().format('YYYY-MM-DD 23:59:59'),
            pageSize: 50,
            TotalCount: 0,
            TotalPage: 0,
            PageIndex: 1,
            LastEnabled: false,
            NextEnabled: false
        });
        const req = (pageIndex, s) => {
            if (!_.isNumber(pageIndex)) {
                return;
            }
            queryParams.PageIndex = pageIndex;
            query();
        };
        const tableRef = ref(null);
        const tableData = ref([]);
        const query = async () => {
            const res = await SPCConfigApi.GetHisPagedListAsync(
                null,
                queryParams
            );
            if (res.data.code === 0) {
                tableData.value = res.data.data.DataList || [];
                for (let key in res.data.data.ParameterList) {
                    queryParams[key] = res.data.data.ParameterList[key];
                }
            }
        };
        const onExport = () => {
            SPCConfigApi.ExportHisAsync(null, queryParams).then(res => {
                proxy.downloadFile(res.data, `${$$t(`SPC配置修改记录`)}.xlsx`);
            });
        };

        return {
            visible,
            tableRef,
            tableData,
            queryParams,

            open,
            handleClose,
            req,
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
