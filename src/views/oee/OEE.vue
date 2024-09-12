<template>
    <div class="oee">
        <div class="shift">
            <div class="search">
                <span class="label">日期</span>
                <el-date-picker
                    v-model="startTime"
                    type="date"
                    placeholder="请选择"
                    value-format="yyyy-MM-dd"
                    :clearable="false"
                ></el-date-picker>
                <span class="label">-</span>
                <el-date-picker
                    v-model="endTime"
                    type="date"
                    placeholder="请选择"
                    value-format="yyyy-MM-dd"
                    :clearable="false"
                ></el-date-picker>
                <div class="label">班次</div>
                <el-select style="width: 210px" v-model="shiftId">
                    <el-option label="全部" value=""></el-option>
                    <el-option
                        v-for="item in shiftList"
                        :key="item.sId"
                        :label="item.sCategory"
                        :value="item.sId"
                    ></el-option>
                </el-select>
                <div class="query" @click="queryShiftResults(false)">查询</div>
            </div>
            <div class="table">
                <el-table
                    ref="contentTable"
                    stripe
                    @row-click="tableRowClick"
                    :data="data1"
                    height="100%"
                    border
                    :style="{ fontSize: 15 + 'px', width: '100%' }"
                    highlight-current-row
                    :row-style="{ height: 50 + 'px' }"
                    :header-cell-style="{
                        background:
                            $store.state.color == 'grey'
                                ? '#D9DBDE'
                                : '#5a6c98',
                        color: $store.state.color == 'grey' ? '#000' : '#fff',
                        'border-left': '1px solid #cccccc',
                        height: 50 + 'px',
                        padding: '0'
                    }"
                    tooltip-effect="dark"
                >
                    <template slot="empty">
                        <span>暂无数据</span>
                    </template>
                    <el-table-column
                        type="index"
                        label="序号"
                        :width="80"
                    ></el-table-column>
                    <el-table-column
                        prop="Data"
                        label="日期"
                        :show-overflow-tooltip="true"
                    ></el-table-column>
                    <el-table-column
                        prop="ShiftName"
                        label="班次"
                        :show-overflow-tooltip="true"
                    ></el-table-column>
                    <el-table-column
                        prop="ShiftTime"
                        label="班次时间"
                        :show-overflow-tooltip="true"
                    ></el-table-column>
                    <el-table-column
                        prop="Oee"
                        label="产线OEE"
                        :show-overflow-tooltip="true"
                    ></el-table-column>
                    <el-table-column
                        prop="RestTime"
                        label="产线计划停机时间"
                        :show-overflow-tooltip="true"
                    ></el-table-column>
                    <el-table-column
                        prop="Beat"
                        label="产线计划节拍数"
                        :show-overflow-tooltip="true"
                    ></el-table-column>
                </el-table>
            </div>
        </div>
        <div class="process">
            <div class="search">
                <div class="label">工序名</div>
                <el-input
                    style="width: 150px"
                    v-model="filterVal"
                    placeholder="请输入"
                />
                <div class="query" @click="queryWorkSectionResults">查询</div>
            </div>
            <div class="table">
                <el-table
                    stripe
                    :data="data2"
                    height="100%"
                    border
                    :style="{ fontSize: 15 + 'px', width: '100%' }"
                    highlight-current-row
                    :row-style="{ height: 50 + 'px' }"
                    :header-cell-style="{
                        background:
                            $store.state.color == 'grey'
                                ? '#D9DBDE'
                                : '#5a6c98',
                        color: $store.state.color == 'grey' ? '#000' : '#fff',
                        'border-left': '1px solid #cccccc',
                        height: 50 + 'px',
                        padding: '0'
                    }"
                    tooltip-effect="dark"
                >
                    <template slot="empty">
                        <span>暂无数据</span>
                    </template>
                    <el-table-column
                        type="index"
                        label="序号"
                        :width="80"
                    ></el-table-column>

                    <el-table-column
                        prop="WorkSection"
                        label="工序名"
                        :show-overflow-tooltip="true"
                    ></el-table-column>
                    <el-table-column
                        prop="Oee"
                        label="OEE"
                        :show-overflow-tooltip="true"
                    ></el-table-column>
                </el-table>
            </div>
        </div>
        <tip-pop
            v-if="isTipShow"
            :tipText="tipText"
            :noCancel="noCancel"
            @tipCallBack="tipCallBack"
        ></tip-pop>
    </div>
</template>
<script>
import TipPop from '../../components/public/tipPop.vue';
import moment from 'moment'; //导入文件

export default {
    components: {
        TipPop
    },

    data() {
        return {
            isTipShow: false,
            tipText: '',
            noCancel: true,
            startTime: '',
            endTime: '',
            filterVal: '',
            shiftId: '',
            data1: [],
            data2: [],
            shiftList: '',
            curLeft: null
        };
    },
    mounted() {
        this.startTime = this.$getDate(
            new Date(new Date().toLocaleDateString()).getTime()
        );
        this.endTime = this.$getDate(
            new Date(new Date().toLocaleDateString()).getTime() +
                24 * 60 * 60 * 1000 -
                1
        );
        this.queryShift();
    },
    methods: {
        tipCallBack(str) {
            this.isTipShow = false;
        },
        queryShiftResults(b) {
            this.$axios({
                method: 'get',
                url: `/api/OeeStatistics/QueryShiftResults?startTime=${moment(
                    this.startTime
                ).format('YYYY-MM-DD HH:mm:ss')}&endTime=${moment(
                    this.endTime
                ).format('YYYY-MM-DD HH:mm:ss')}&shiftId=${this.shiftId}`
            }).then(res => {
                if (res.data.code == 0) {
                    this.data1 = res.data.data || [];
                    if (this.data1.length && b) {
                        this.curLeft = this.data1[0];
                        this.queryWorkSectionResults();
                    }
                    setTimeout(() => {
                        this.data1.length &&
                            this.$refs.contentTable.setCurrentRow(
                                this.data1[0]
                            );
                    });
                } else {
                    this.isTipShow = true;
                    this.tipText = res.data.msg;
                }
            });
        },
        queryWorkSectionResults() {
            this.$axios({
                method: 'post',
                url: `/api/OeeStatistics/QueryWorkSectionResults?key=${
                    this.filterVal
                }&startTime=${moment(this.startTime).format(
                    'YYYY-MM-DD HH:mm:ss'
                )}&endTime=${moment(this.endTime).format(
                    'YYYY-MM-DD HH:mm:ss'
                )}`,
                data: this.curLeft
            }).then(res => {
                if (res.data.code == 0) {
                    this.data2 = res.data.data || [];
                } else {
                    this.isTipShow = true;
                    this.tipText = res.data.msg;
                }
            });
        },
        queryShift() {
            this.$axios({
                method: 'get',
                url: `/api/Class/QueryShift?KeyWord=`
            }).then(res => {
                if (res.data.code == 0) {
                    this.shiftList = res.data.data;
                    // if (this.shiftList.length) {
                    //     this.shiftId = this.shiftList[0].sId;
                    // }
                    this.queryShiftResults(true);
                    // this.queryWorkSectionResults();
                } else {
                    this.isTipShow = true;
                    this.tipText = res.data.msg;
                }
            });
        },
        tableRowClick(row, column, event) {
            this.curLeft = row;
        }
    }
};
</script>
<style lang="scss" scoped>
.oee {
    width: 100%;
    height: 100%;
    padding: 100px 10px 40px;
    display: flex;
    .shift,
    .process {
        height: 100%;
        width: 70%;

        .search {
            height: 50px;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: flex-start;
            .label {
                margin: 0 10px;
            }
            .query {
                display: inline-block;
                height: 40px;
                width: 100px;
                text-align: center;
                line-height: 40px;
                color: #ffffff;
                border-radius: 5px;
                cursor: pointer;
                background-color: #4270e4;
                margin-left: 10px;
            }
        }
        .table {
            height: calc(100% - 50px);
            width: 100%;
        }
    }
    .process {
        width: 30%;
        padding-left: 20px;
    }
}
</style>
