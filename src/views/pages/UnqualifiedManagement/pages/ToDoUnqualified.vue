<template>
    <div class="InspectionRecords">
        <div class="InspectionRecords-search">
            <div class="InspectionRecords-search-content">
                <div class="search-content-left">
                    <div>时间范围</div>
                    <el-date-picker
                        type="datetime"
                        v-model="dataObj.From"
                        :disabled-date="date => disabledFn(date)"
                        :teleported="false"
                    ></el-date-picker>
                    <div class="search-key">-</div>
                    <el-date-picker
                        type="datetime"
                        v-model="dataObj.To"
                        :disabled-date="date => disabledFn(date, 'To')"
                        popper-class="light-datetime-picker"
                        :teleported="false"
                    ></el-date-picker>
                    <div>产品型号</div>
                    <el-select
                        class="light-element-ui"
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
                        v-model="dataObj.codeType"
                        :teleported="false"
                    >
                        <el-option label="产品ID" value="产品ID"></el-option>
                        <el-option label="工单号" value="工单号"></el-option>
                    </el-select>
                    <el-input
                        style="width: 160px"
                        :placeholder="'请输入' + dataObj.codeType"
                        v-model="dataObj.OrderNumber"
                    />
                    <div
                        class="btn"
                        :style="{ '--color': '#386DF0' }"
                        @click="GetRecordListAsyncFn(1)"
                    >
                        查询
                    </div>
                </div>
                <div class="search-content-right">
                    <div
                        class="btn plain"
                        :style="{ '--color': '#FDAE22' }"
                        @click="openProductJudgmentPop"
                    >
                        判定
                    </div>
                    <!-- <div
                        class="btn plain"
                        :style="{ '--color': '#FDAE22' }"
                        @click="
                            () => (dataObj.reasonConfigurationPopShow = true)
                        "
                    >
                        配置
                    </div> -->
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
                highlight-current-row
                :header-cell-style="{
                    background: '#596A96',
                    color: '#fff',
                    borderRight: '1px solid #fff'
                }"
                empty-text="暂无数据"
                @row-click="rowClickFn"
                :row-class-name="tableRowClassName"
            >
                <el-table-column width="80px" type="index" label="序号" />
                <el-table-column prop="ProductModel" label="产品型号" />
                <el-table-column
                    prop="SerialNumber"
                    label="产品ID"
                    :show-overflow-tooltip="true"
                />
                <el-table-column
                    prop="OrderCode"
                    label="工单号"
                    :show-overflow-tooltip="true"
                />
                <el-table-column prop="WorkSectionName" label="不良工序"
                    ><template #default="scope">
                        <div class="process-item">
                            {{ scope.row.WorkSectionName }}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="UnqualifiedReason" label="不合格原因">
                    <template #default="scope">
                        <div>{{ scope.row.UnqualifiedReason }}</div>
                    </template>
                </el-table-column>
                <el-table-column prop="FinishTime" label="最后记录时间">
                    <template #default="{row:{FinishTime:v}}">
                        {{ dayjs(v).format('YYYY-MM-DD HH:mm:ss') }}
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div>
            <my-page
                :pageData="dataObj.pageData"
                @req="GetRecordListAsyncFn"
            ></my-page>
        </div>
        <ProductJudgmentPop
            :visible="dataObj.productJudgmentPopShow"
            @callback="productJudgmentPopCallback"
            :selectItem="dataObj.productJudgmentPopItem"
        />
        <ReasonConfigurationPop
            :visible="dataObj.reasonConfigurationPopShow"
            @callback="reasonConfigurationPopCallback"
        />
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
import ProductJudgmentPop from '../dialogs/ProductJudgmentPop.vue';
import ReasonConfigurationPop from '../dialogs/ReasonConfigurationPop.vue';
import { UnqualifiedApi } from '../api/index';
import dayjs from 'dayjs';
import { Message } from 'element-ui';

export default defineComponent({
    name: 'InspectionRecords',
    components: {
        MyPage,
        ProductJudgmentPop,
        ReasonConfigurationPop
    },
    setup() {
        const dataObj = reactive({
            productJudgmentPopShow: false,
            reasonConfigurationPopShow: false,
            pageData: {
                PageIndex: 1,
                PageSize: 50,
                TotalCount: 0,
                TotalPage: 0
            },
            ProductModel: '',
            codeType: '产品ID',
            OrderNumber: '',
            From: '',
            To: '',
            curIdx: NaN,
            productJudgmentPopItem: {},
            judgmentPersonnel: ''
        });
        const ProductModel = computed(() =>
            dataObj.ProductModel === '全部' ? '' : dataObj.ProductModel
        );

        const openProductJudgmentPop = () => {
            dataObj.productJudgmentPopItem =
                (dataList.value && dataList.value[dataObj.curIdx]) || {};
            const productModel = dataObj.productJudgmentPopItem.productModel;
            dataObj.productJudgmentPopItem.productId = (
                productList.value.find(e => e.model === productModel) || {}
            ).id;
            dataObj.productJudgmentPopItem.judgmentPersonnel =
                dataObj.judgmentPersonnel;
            dataObj.productJudgmentPopShow = true;
        };

        const productJudgmentPopCallback = (state, str) => {
            dataObj.productJudgmentPopShow = false;

            if (state == 'confirm') {
                GetRecordListAsyncFn(1);
            }
        };

        const reasonConfigurationPopCallback = (state, str) => {
            dataObj.reasonConfigurationPopShow = false;
        };

        const dataList = ref([]);
        const GetRecordListAsyncFn = pageIndex => {
            dataObj.pageData.PageIndex = pageIndex;
            return UnqualifiedApi.GetRecordListAsync({
                'input.serialNumber':
                    dataObj.codeType == '产品ID' ? dataObj.OrderNumber : '',
                'input.startTime': getDate(dataObj.From),
                'input.endTime': getDate(dataObj.To),
                'input.orderCode':
                    dataObj.codeType == '工单号' ? dataObj.OrderNumber : '',
                'input.productModel': ProductModel.value,
                'input.pageIndex': pageIndex,
                'input.pageSize': 50
            }).then(({ data: { data } }) => {
                if (data) {
                    dataList.value = data.Items;
                    dataObj.curIdx = NaN;
                    dataObj.pageData.TotalCount = data.TotalCount;
                    dataObj.pageData.TotalPage = Math.ceil(
                        data.TotalCount / dataObj.pageData.PageSize
                    );
                }
            });
        };

        const productList = ref([]);
        const getAllProductList = () => {
            return UnqualifiedApi.GetAllProductList().then(({ data }) => {
                productList.value = [{ ProductTypeCode: '全部' }, ...data.data];
                if (productList.value.length) {
                    dataObj.ProductModel = productList.value[0].ProductTypeCode;
                } else {
                    dataObj.ProductModel = '';
                }
            });
        };
        const getDate = val => {
            if (val) {
                const date = new Date(val);
                let month = date.getMonth() + 1;
                month = month < 10 ? `0${month}` : month;
                let day = date.getDate();
                day = day < 10 ? `0${day}` : day;
                let hour = date.getHours();
                hour = hour < 10 ? `0${hour}` : hour;
                let minute = date.getMinutes();
                minute = minute < 10 ? `0${minute}` : minute;
                let second = date.getSeconds();
                second = second < 10 ? `0${second}` : second;
                const str = `${date.getFullYear()}-${month}-${day} ${hour}:${minute}:${second}`;
                return str;
            }
            return '';
        };

        const tableRowClassName = ({ row, rowIndex }) => {
            row.index = rowIndex;
        };
        const rowClickFn = row => {
            dataObj.curIdx = row.index;
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
                        .add(-90, 'day')
                        .toDate()
                );
            } else {
                return (
                    date >
                    dayjs(dataObj.From)
                        .add(90, 'day')
                        .toDate()
                );
            }
        };

        onMounted(async () => {
            dataObj.From = dayjs()
                .add(-6, 'day')
                .format('YYYY-MM-DD 00:00:00');
            dataObj.To = dayjs()
                .add(0, 'day')
                .format('YYYY-MM-DD 23:59:59');
            const userInfo = JSON.parse(
                sessionStorage.getItem('userInfo1') ||
                    sessionStorage.getItem('sightseerInfo1')
            );
            if (userInfo) dataObj.judgmentPersonnel = userInfo.SCMSUserName;
            await GetRecordListAsyncFn(1);
            await getAllProductList();
        });
        return {
            dayjs,

            getDate,
            GetRecordListAsyncFn,
            dataList,
            dataObj,
            productJudgmentPopCallback,
            reasonConfigurationPopCallback,
            productList,
            tableRowClassName,
            rowClickFn,
            openProductJudgmentPop,
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
    --el-color-primary: #5a84ff;

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

        .process-item {
            width: fit-content;
            height: 30px;
            border-radius: 15px;
            padding: 0 12px 0 27px;
            display: flex;
            align-items: center;
            background: #f1f0f7;
            border-radius: 29px;
            color: #907fec;
            position: relative;
        }

        .process-item::before {
            content: '';
            width: 10px;
            height: 10px;
            border-radius: 5px;
            background: #907fec;
            position: absolute;
            left: 14px;
            top: 50%;
            transform: translate(0, -50%);
        }
    }
}
</style>
