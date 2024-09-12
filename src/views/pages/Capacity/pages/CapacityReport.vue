<template>
    <div class="container">
        <div class="search">
            <div class="search--left" style="flex:1;gap: 8px">
                <div style="display: inline-flex;align-items: center;gap: 8px">
                    <span>{{ $$t('生产时间') }}</span>
                    <el-date-picker
                        v-model="search.StartTime"
                        type="datetime"
                        value-format="yyyy-MM-dd HH:mm:ss"
                    />
                    -
                    <el-date-picker
                        v-model="search.EndTime"
                        type="datetime"
                        value-format="yyyy-MM-dd HH:mm:ss"
                    />
                </div>
                <EditButton
                    :text="$$t(`查询`)"
                    style="margin-left: 10px;"
                    @click="onSearch"
                />
                <el-tooltip content="每小时归档产量。" placement="top">
                    <i class="el-icon-warning-outline"></i>
                </el-tooltip>
            </div>
            <div class="search--right">
                <VarConfig @init="onSearch" />
                <Export :tableParams="search" />
            </div>
        </div>
        <div class="table-container">
            <Table
                :data="dataSource"
                :ref="tableRef"
                class="table"
                stripe
                :header-cell-style="{ 'border-left': '1px solid #EBEEF5' }"
                show-summary
                :summary-method="getSummaries"
            >
                <el-table-column
                    v-for="item in columns"
                    :key="item.prop"
                    :label="item.label"
                    :show-overflow-tooltip="true"
                    min-width="200px"
                    width="200px"
                >
                    <template v-if="item.type !== 'base'">
                        <el-table-column
                            v-for="child in childrenColumns"
                            :key="item.ProductionData"
                            :label="child.label"
                            :show-overflow-tooltip="true"
                            :prop="`${item.label}_${child.prop}`"
                            width="120px"
                        >
                        </el-table-column>
                    </template>
                    <template slot-scope="scope">
                        <span>
                            {{ scope.row[item.prop] }}
                        </span>
                    </template>
                </el-table-column>
            </Table>
        </div>
    </div>
</template>

<script>
import EditButton from '@/views/pages/components/edit-button/index.vue';
import VarConfig from '../components/VarConfig';
import Export from '../components/Export';
import Table from '@/views/pages/components/Table/index.vue';
import _ from 'lodash';
import dayjs from 'dayjs';
import { defineComponent, nextTick, ref } from '@vue/composition-api';
import { Message } from 'element-ui';
import { CapacityApi } from '../api';

export default defineComponent({
    name: 'CapacityReport',
    components: { VarConfig, Export, EditButton, Table },
    setup() {
        const dataSource = ref([]);
        const tableRef = ref(null);
        const search = ref({
            StartTime: dayjs().format('YYYY-MM-DD 00:00:00'),
            EndTime: dayjs()
                .add(1, 'day')
                .format('YYYY-MM-DD 00:00:00')
        });
        const productLineOptions = ref([]);
        const columns = ref([
            { label: $$t('生产时间'), prop: 'ProductionTime', type: 'base' }
        ]);
        const childrenColumns = ref([
            { label: $$t('产量'), prop: 'CapacityNum' },
            { label: $$t('合格数'), prop: 'OkNum' },
            { label: $$t('不合格数'), prop: 'NgNum' }
        ]);
        const totalMap = ref({});
        const onSearch = async () => {
            // const auth = await getAuth('查询按钮');
            // if (!auth) return;

            await initColumn();
            await initTable();
        };
        const initColumn = async () => {
            const res = await CapacityApi.GetConfigList();
            if (res.data.code === 0) {
                columns.value = columns.value.filter(e => e.type === 'base');
                res.data.data.forEach(item => {
                    columns.value.push({ label: item.DeviceName });
                });
            }
        };
        const initTable = async () => {
            const { StartTime, EndTime } = search.value;
            if (!isWithin7Days(StartTime, EndTime)) {
                Message.error($$t('查询时间跨度不能超过7天'));
                return;
            }
            const result = await CapacityApi.GetRecordListAsync({
                StartTime,
                EndTime
            });
            const data = _.get(result, 'data.data') || [];
            const children = _.get(data[0], 'ProductionData') || [];

            let list = [];
            totalMap.value = {};
            data.forEach(item => {
                const { ProductionData = [] } = item;
                const childrenMap = ProductionData.reduce(
                    (obj, cItem, cIndex) => {
                        const { DeviceName } = cItem;
                        let config = {};
                        Object.keys(cItem).forEach(k => {
                            const itemKey = `${DeviceName}_${k}`;
                            const count = totalMap.value[itemKey] || 0;
                            config[itemKey] = cItem[k];
                            totalMap.value[itemKey] = count + cItem[k];
                        });
                        return {
                            ...obj,
                            ...config
                        };
                    },
                    {}
                );

                list.push({
                    ...item,
                    ...childrenMap
                });
            });

            dataSource.value = list;
        };
        const onExport = async () => {
            // const auth = await getAuth('导出按钮');
            // if (!auth) return;

            const result = await CapacityApi.ExportCapacityRecordAsync({
                ...search.value
            });
            downloadFile(
                result.data,
                '生产报表_' + dayjs().format('YYYYMMDDHHmmss') + '.xlsx'
            );
        };
        const init = async () => {
            onSearch();
        };
        function isWithin7Days(startDate, endDate) {
            const start = dayjs(startDate);
            const end = dayjs(endDate);
            const diffInDays = end.diff(start, 'day');
            return diffInDays <= 6;
        }
        const getSummaries = param => {
            const { columns } = param;
            const sums = [];

            columns.forEach((column, index) => {
                if (index === 0) {
                    sums[index] = $$t('合计');
                    return;
                } else if (!column.property) {
                    sums[index] = '';
                    return;
                }
                const { property } = column;
                sums[index] = totalMap.value[property];
            });
            return sums;
        };

        init();

        return {
            dataSource,
            columns,
            childrenColumns,
            tableRef,
            search,
            productLineOptions,

            onSearch,
            initTable,
            onExport,
            getSummaries
        };
    }
});
</script>

<style lang="scss" scoped>
.container {
    width: 100%;
    height: 100%;
    margin: auto;
    background-color: #fff;
}

.search {
    width: 100%;
    height: 60px;
    background-color: #ddd;
    display: flex;
    align-items: center;
    padding: 0 8px;
}
.table-container {
    width: 100%;
    height: calc(100% - 60px);
    overflow: auto;

    .table {
        width: 100%;
        height: 100%;
        ::v-deep .el-table {
            text-align: center;
            padding-bottom: 47px;
            .el-table__body-wrapper {
                height: calc(100% - 93px) !important;
            }
        }
    }
}
</style>
