<template>
    <div class="InspectionRecords">
        <div class="InspectionRecords-search">
            <div class="InspectionRecords-search-content">
                <div class="search-content-left">
                    <div>{{ '时间范围' }}</div>
                    <el-date-picker
                        type="datetime"
                        v-model="dataObj.From"
                        popper-class="light-datetime-picker"
                        :disabled-date="date => disabledFn(date)"
                        :teleported="false"
                    ></el-date-picker>
                    <div class="search-key">-</div>
                    <el-date-picker
                        type="datetime"
                        v-model="dataObj.To"
                        popper-class="light-datetime-picker"
                        :disabled-date="date => disabledFn(date, 'To')"
                        :teleported="false"
                    ></el-date-picker>
                    <div>{{ '判定结果' }}</div>
                    <el-select
                        style="width: 120px"
                        v-model="dataObj.JudgmentType"
                        :teleported="false"
                    >
                        <el-option
                            v-for="item in JudgmentTypeIdList"
                            :key="item.Id"
                            :label="item.Name"
                            :value="item.Id"
                        ></el-option>
                    </el-select>
                    <div>{{ '产品型号' }}</div>
                    <el-select
                        style="width: 120px"
                        v-model="dataObj.ProductModel"
                        :teleported="false"
                    >
                        <el-option
                            v-for="item in productList"
                            :key="item.Id"
                            :label="item.ProductTypeCode"
                            :value="item.ProductTypeCode"
                        ></el-option>
                    </el-select>
                    <el-select
                        style="width: 120px"
                        v-model="dataObj.CodeType"
                        :teleported="false"
                    >
                        <el-option
                            :label="'产品ID'"
                            :value="'产品ID'"
                        ></el-option>
                        <el-option
                            :label="'工单号'"
                            :value="'工单号'"
                        ></el-option>
                    </el-select>
                    <el-input
                        style="width: 160px"
                        :placeholder="'请输入' + dataObj.CodeType"
                        v-model="dataObj.OrderNumber"
                    />
                </div>
                <div class="search-content-right">
                    <div
                        class="btn"
                        :style="{ '--color': '#386DF0' }"
                        @click="getJudgmentListFn(1)"
                    >
                        查询
                    </div>
                    <div
                        class="btn plain"
                        :style="{ '--color': '#FDAE22' }"
                        @click="ExportJudgmentAsyncFn"
                    >
                        导出
                    </div>
                </div>
            </div>
        </div>
        <div class="page-warp">
            <el-table
                :data="dataList"
                class="x_table"
                height="100%"
                style="width: 100%"
                border
                :header-cell-style="{
                    background: '#596A96',
                    color: '#fff',
                    borderRight: '1px solid #fff'
                }"
                :empty-text="'暂无数据'"
            >
                <el-table-column width="80px" type="index" :label="'序号'" />
                <el-table-column prop="ProductModel" :label="'产品型号'" />
                <el-table-column prop="SerialNumber" :label="'产品ID'" />
                <el-table-column prop="OrderCode" :label="'工单号'" />
                <el-table-column prop="JudgmentTypeDisplay" :label="'判定结果'">
                </el-table-column>
                <el-table-column
                    width="85px"
                    prop="IsQualified"
                    :label="'是否合格'"
                >
                    <template #default="{row}">
                        <div v-if="row.JudgmentTypeDisplay === '设备返修'">
                            ——
                        </div>
                        <template v-else>
                            <div style="color: green" v-if="row.IsQualified">
                                OK
                            </div>
                            <div style="color: red" v-else>NG</div>
                        </template>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="UnqualifiedReason"
                    :label="'不良原因'"
                    show-overflow-tooltip
                    ><template #default="{row}">
                        {{ row.UnqualifiedReason || '—' }}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="JudgmentSectionsDisplay"
                    :label="'返修工序'"
                >
                    <template #default="{row}">
                        <span v-if="row.JudgmentType !== 0">—</span>
                        <span v-else>{{
                            row.JudgmentSectionsDisplay || '—'
                        }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="JudgmentPersonnel" :label="'判定人员'" />
                <el-table-column prop="JudgmentTime" :label="'判定时间'">
                    <template #default="{row:{JudgmentTime:v}}">
                        {{ dayjs(v).format('YYYY-MM-DD HH:mm:ss') }}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="JudgmentDetailsDisplay"
                    :label="'判定详情'"
                    :show-overflow-tooltip="true"
                >
                    <template #default="{row}">
                        <div v-if="row.JudgmentTypeDisplay === '人工返修'">
                            {{ row.JudgmentDetailsDisplay || '—' }}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="Remarks"
                    :label="'处理说明'"
                    :show-overflow-tooltip="true"
                />
            </el-table>
        </div>
        <div>
            <my-page
                :pageData="dataObj.pageData"
                @req="getJudgmentListFn"
            ></my-page>
        </div>
    </div>
</template>

<script>
import {
    ref,
    onMounted,
    defineComponent,
    reactive,
    computed,
    watch
} from '@vue/composition-api';
import MyPage from '@/components/public/Pages.vue';
import { UnqualifiedApi } from '../api/index';
import dayjs from 'dayjs';
import { download } from '../hooks/exports';
import { Message } from 'element-ui';

export default defineComponent({
    name: 'InspectionRecords',
    components: {
        MyPage
    },
    setup() {
        const dataObj = reactive({
            ProductModel: '',
            CodeType: '产品ID',
            OrderNumber: '',
            JudgmentType: '',
            From: '',
            To: '',
            pageData: {
                PageIndex: 1,
                PageSize: 50,
                TotalCount: 0,
                TotalPage: 0
            }
        });
        const ProductModel = computed(() =>
            dataObj.ProductModel === '全部' ? '' : dataObj.ProductModel
        );

        const productList = ref([]);
        const GetAllProductListFn = () => {
            return UnqualifiedApi.GetAllProductList({ filter: '' }).then(
                ({ data }) => {
                    productList.value = [
                        { ProductTypeCode: '全部' },
                        ...data.data
                    ];
                    if (productList.value.length) {
                        dataObj.ProductModel =
                            productList.value[0].ProductTypeCode;
                    } else {
                        dataObj.ProductModel = '';
                    }
                }
            );
        };

        const JudgmentTypeIdList = ref([]);
        const JudgmentTypeIdMap = computed(() =>
            JudgmentTypeIdList.value.reduce((p, c) => {
                p[c.id] = c.name;
                return p;
            }, {})
        );
        const GetJudgmentTypeAsyncFn = () => {
            return UnqualifiedApi.GetJudgmentTypeAsync().then(res => {
                JudgmentTypeIdList.value = [
                    { Name: '全部' },
                    ...res.data.data.map(e => ({
                        Name: e.JudgmentType,
                        Id: e.JudgmentTypeId
                    }))
                ];
                if (JudgmentTypeIdList.value.length) {
                    dataObj.JudgmentType = JudgmentTypeIdList.value[0].id;
                } else {
                    dataObj.JudgmentType = '';
                }
            });
        };

        const dataList = ref([]);
        const getJudgmentListFn = PageIndex => {
            dataObj.pageData.PageIndex = PageIndex;
            return UnqualifiedApi.GetJudgmentListAsync({
                'input.serialNumber':
                    dataObj.CodeType == '产品ID' ? dataObj.OrderNumber : '',
                'input.judgmentType': dataObj.JudgmentType,
                'input.orderCode':
                    dataObj.CodeType == '工单号' ? dataObj.OrderNumber : '',
                'input.productModel': ProductModel.value,
                'input.startTime': getDate(dataObj.From),
                'input.endTime': getDate(dataObj.To),
                'input.isQualified': '',
                'input.pageIndex': PageIndex,
                'input.pageSize': 50
            }).then(({ data: { data } }) => {
                dataList.value = data.Items || [];
                dataObj.pageData.TotalCount = data.TotalCount;
                dataObj.pageData.TotalPage = Math.ceil(
                    data.TotalCount / dataObj.pageData.PageSize
                );
            });
        };

        const getDate = val => {
            return dayjs(val).format('YYYY-MM-DD HH:mm:ss');
        };

        const ExportJudgmentAsyncFn = () => {
            UnqualifiedApi.ExportJudgmentAsync({
                SerialNumber:
                    dataObj.CodeType == '产品ID' ? dataObj.OrderNumber : '',
                JudgmentType: dataObj.JudgmentType || '',
                OrderCode:
                    dataObj.CodeType == '工单号' ? dataObj.OrderNumber : '',
                ProductModel: ProductModel.value,
                IsQualified: '',
                StartTime: getDate(dataObj.From),
                EndTime: getDate(dataObj.To)
            }).then(res => {
                download(res.data, '产品判定记录.xlsx');
            });
        };
        watch([() => dataObj.From, () => dataObj.To], () => {
            if (
                dayjs(dataObj.To).format('YYYY-MM-DD 00:00:00') <
                dayjs(dataObj.From).format('YYYY-MM-DD 00:00:00')
            ) {
                Message.warning('结束时间不能大于开始时间');
            }
        });
        const disabledFn = (date, flag = 'From') => {
            if (flag === 'From') {
                return (
                    date <
                    dayjs(dataObj.To)
                        .add(-60, 'day')
                        .toDate()
                );
            } else {
                return (
                    date >
                    dayjs(dataObj.From)
                        .add(60, 'day')
                        .toDate()
                );
            }
        };

        onMounted(async () => {
            dataObj.From = dayjs().format('YYYY-MM-DD 00:00:00');
            dataObj.To = dayjs().format('YYYY-MM-DD 23:59:59');
            await GetAllProductListFn();
            await GetJudgmentTypeAsyncFn();
            await getJudgmentListFn(1);
        });
        return {
            dayjs,

            dataObj,
            productList,
            getDate,
            getJudgmentListFn,
            GetAllProductListFn,
            dataList,
            JudgmentTypeIdList,
            JudgmentTypeIdMap,
            GetJudgmentTypeAsyncFn,
            ExportJudgmentAsyncFn,
            disabledFn
        };
    }
});
</script>
<style lang="scss" scoped>
.InspectionRecords {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    overflow: auto;
    display: flex;
    flex-direction: column;

    // background: #ffffff;

    .InspectionRecords-search {
        padding: 0 0 6px;

        .InspectionRecords-search-content {
            height: 60px;
            background-color: #ddd;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 8px;

            .btn {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 120px;
                height: 40px;
                border-radius: 4px;
                border: 2px solid var(--color);
                font-weight: 600;
                margin-left: 10px;
                font-size: 16px;
                cursor: pointer;
                background-color: var(--color);
                color: #fff;
                &.plain {
                    background-color: #fff;
                    color: var(--color);
                }
            }

            .search-content-left {
                display: flex;
                align-items: center;
                justify-content: space-between;
                column-gap: 6px;
            }

            .search-content-right {
                display: flex;
                align-items: center;
                justify-content: flex-end;
            }
        }
    }

    .page-warp {
        width: 100%;
        height: calc(100% - 98px);
        padding: 0;
    }
}
</style>
