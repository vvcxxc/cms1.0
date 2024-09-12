<!--
 * @Description: 这是参数报表页面（组件）
 * @Date: 2019-11-28 10:59:10
 * @Author: Tao
 * @LastEditors: Tao
 * @LastEditTime: 2021-04-08 15:25:35
 -->
<template>
    <div class="tapwater">
        <div class="linebox" id="linebox">
            <div class="query-table clearfix">
                <div class="fl">

                    <span>实际开始时间</span>
                    <div class="container">
                        <div class="block">
                            <span class="demonstration"></span>
                            <el-date-picker v-model="starttime" type="datetime" placeholder="请选择"
                                value-format="yyyy-MM-dd HH:mm:ss" :style="{ width: '180px' }"></el-date-picker>
                        </div>
                        <i class="separate">-</i>
                        <div class="block">
                            <span class="demonstration"></span>
                            <el-date-picker v-model="endtime" type="datetime" placeholder="请选择"
                                value-format="yyyy-MM-dd HH:mm:ss" :style="{ width: '180px' }"></el-date-picker>
                        </div>
                    </div>
                    <span>产品型号</span>
                    <el-select style="margin-left:5px;width:120px" placeholder="请选择" v-model="type">
                        <el-option label="不限" value="00000000-0000-0000-0000-000000000000"></el-option>
                        <el-option v-for="item in typeList" :key="item.FID" :label="item.ProductTypeCode" :value="item.FID">
                        </el-option>
                    </el-select>
                    <el-input style="margin-left:5px;width:170px" placeholder="请输入关键词" v-model="inputFilter" />
                    <div class="query" @click="req(1)">查询</div>
                </div>

            </div>
            <div class="conter">
                <div class="conter-table">
                    <el-table highlight-current-row :cell-style="{ borderColor: '#E4E7ED' }"
                        :header-cell-style="{ background: '#5a6c98', color: '#fff' }" :data="dataList" border height="100%">
                        <template slot="empty">
                            <span>暂无数据</span>
                        </template>

                        <el-table-column type="index" label="序号" width="60px"></el-table-column>
                        <el-table-column label="订单号" :show-overflow-tooltip="true">
                            <template slot-scope="scope">{{ scope.row.Data.OrderNumber }}</template></el-table-column>
                        <el-table-column prop="ProductTypeCode" label="产品型号"
                            :show-overflow-tooltip="true"></el-table-column>
                        <el-table-column prop="ProductTypeFormulaCode" label="物料编码"
                            :show-overflow-tooltip="true"></el-table-column>

                        <el-table-column prop="FormualName" label="配方名称" width="220px"
                            :show-overflow-tooltip="true"></el-table-column>
                        <el-table-column prop="FormualSection" label="配方工位" width="220px"
                            :show-overflow-tooltip="true"></el-table-column>
                        <el-table-column label="计划产量" :show-overflow-tooltip="true">
                            <template slot-scope="scope">{{ scope.row.Data.PlanNumber }}</template>
                        </el-table-column>
                        <el-table-column prop="OrderTimeStr" label="下单日期" :show-overflow-tooltip="true">
                         </el-table-column>
                        <el-table-column prop="DeliveryDateStr" label="交货日期" :show-overflow-tooltip="true">
                         </el-table-column>
                        <el-table-column prop="OutputNumber" label="产量" :show-overflow-tooltip="true">
                            <template slot-scope="scope">{{ scope.row.Data.OutputNumber }}</template>
                        </el-table-column>
                        <el-table-column prop="OkNumber" label="合格数" :show-overflow-tooltip="true">
                            <template slot-scope="scope">{{ scope.row.Data.OkNumber }}</template>
                        </el-table-column>
                        <el-table-column prop="Address" label="备注" :show-overflow-tooltip="true">
                            <template slot-scope="scope">{{ scope.row.Data.Remarks }}</template>
                        </el-table-column>
                        <el-table-column prop="Address" label="实际开始时间" :show-overflow-tooltip="true">
                            <template slot-scope="scope">{{ scope.row.Data.OrderStartTime }}</template>
                        </el-table-column>
                        <el-table-column prop="Address" label="实际结束时间" :show-overflow-tooltip="true">
                            <template slot-scope="scope">{{ scope.row.Data.OrderEndTime }}</template>
                        </el-table-column>
                    </el-table>
                </div>
                <div class="conter-page">
                    <my-page :pageData="pageData" @req="req"></my-page>
                </div>
            </div>
        </div>
        <!-- 提示弹窗和遮罩层 -->
        <TipsPop v-if="isPopShow" :tipText="tipText" :noCancel="noCancel" @tipCallBack="tipCallBack"></TipsPop>
        <EditOrder v-if="EditOrderShow" :title="EditOrderTitle" :selectItem="EditOrderSelectItem"
            @callback="EditOrderCallBack" />
    </div>
</template>

<script>
// vue文件中引入echarts工具
import TipsPop from '../../../components/public/tipPop.vue';
import MyPage from '../../../components/public/page.vue';
import EditOrder from './EditOrder.vue';

export default {
    name: 'tapwater',
    components: {
        TipsPop,
        MyPage,
        EditOrder
    },
    data() {
        return {
            isPopShow: false,
            tipText: '',
            noCancel: true,

            starttime: new Date(new Date(new Date().toLocaleDateString()) - 30 * 24 * 60 * 60 * 1000),
            endtime: new Date(
                new Date(new Date().toLocaleDateString()).getTime() +
                24 * 60 * 60 * 1000 - 1
            ),
            pageData: {
                PageSize: 50,
                TotalCount: 0,
                TotalPage: 0,
                PageIndex: 1,
                LastEnabled: false,
                NextEnabled: false
            },
            lang: JSON.parse(localStorage.getItem('languages'))[localStorage.getItem('currentLang')],
            inputFilter: '',
            typeList: [],
            type: '00000000-0000-0000-0000-000000000000',

            dataList: [],
            EditOrderShow: false,
            EditOrderTitle: '',
            EditOrderSelectItem: null,
        };
    },
    created() {

    },
    watch: {


    },

    methods: {
        tipCallBack(str) {
            this.noCancel = true;
            this.isPopShow = false;
        },
        openEditOrder(type, item) {
            this.EditOrderShow = true
            this.EditOrderTitle = type
            this.EditOrderSelectItem = item
        },
        EditOrderCallBack() {
            this.EditOrderShow = false
        },
        getDate(val) {
            if (val) {
                let date = new Date(val);
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
                let str = `${date.getFullYear()}-${month}-${day} ${hour}:${minute}:${second}`;
                return str;
            }
            return '';
        },
        GetProductType() {
            this.$axios({
                url: `/api/Order/GetFormulaProductTypeList`,
                method: 'get',
            }).then((res) => {
                if (res.data.code == 0) {
                    this.typeList = res.data.data
                    // if (this.typeList && this.typeList.length) {
                    //     this.type = this.typeList[0].FID
                    // } else {
                    //     this.type = '';
                    // }
                    this.req(1)


                } else {
                    this.tipText = res.data.msg;
                    this.isPopShow = true;
                }
            });
        },
        req(_index) {
            this.$axios({
                url: `/api/Order/GetHistoryOrderList?StartTime=${this.getDate(this.starttime)}&EndTime=${this.getDate(this.endtime)}&PageSize=${this.pageData.PageSize}&PageIndex=${_index}&FID=${this.type}&KeyWord=${this.inputFilter}`,
                method: 'get',
            }).then((res) => {
                if (res.data.code == 0) {
                    this.dataList = res.data.data.DataList;
                    this.pageData = res.data.data.ParameterList;

                } else {
                    this.tipText = res.data.msg;
                    this.isPopShow = true;
                }
            });
        },


    },
    //渲染后计算宽度
    mounted() {
        this.GetProductType()
    },
};
</script>

<style lang="scss">
.tapwater {
    .fl .el-input--prefix .el-input__inner {
        padding-left: 25px !important;
    }

    .table input {
        text-indent: 4px;
    }
}
</style>

<style lang="scss" scoped>
.mask_box {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    width: 100%;
    height: 100%;
    z-index: 999;
}

.conter {
    width: 100%;
    height: calc(100% - 60px);


    .conter-table {
        width: 100%;
        height: calc(100% - 50px);

        .table-action {
            width: 50px;
            float: left;
            height: 25px;
            border-radius: 13px;
            background-color: #fff;
            border: 1px solid #cccccc;
            margin-left: 5px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #2CBDBD;

            img {

                height: 18px;

            }
        }
    }

    .conter-page {
        width: 100%;
        height: 50%;

    }

}

.fl {
    float: left;
}

.fr {
    float: right;
}

.clearfix::after {
    content: '';
    height: 0;
    line-height: 0;
    clear: both;
    visibility: hidden;
}

.clearfix {
    zoom: 1;
}

.tapwater {
    box-sizing: border-box;
    width: 100%;
    height: 100%;


    .linebox {
        height: 100%;
        width: 100%;
        background-color: #ffffff;
        border: 1px solid #d5d5d5;
    }

    .query-table {
        height: 60px;
        background-color: #dddddd;
        line-height: 60px;
        overflow: hidden;
        font-size: 14px;
        color: #6b6668;

        span {
            margin-left: 5px;
        }

        .tablename {
            height: 40px;
            width: 250px;
        }

        .tabledatetime {
            height: 40px;
            width: 178px;
        }

        .starttime {
            height: 40px;
            width: 210px;
            display: inline-block;
            margin-left: 18px;
            background-color: #ffffff;
            line-height: 40px;
            padding-left: 12px;
        }

        .endtime {
            height: 40px;
            width: 210px;
            display: inline-block;
            background-color: #ffffff;
            line-height: 40px;
            padding-left: 12px;
        }
    }

    .query,
    .add,
    .getOrder {
        display: inline-block;
        height: 40px;
        width: 118px;
        text-align: center;
        line-height: 40px;
        color: #ffffff;
        border-radius: 5px;
        font-weight: 600;
        cursor: pointer;
    }

    .query {
        background-color: #4270e4;
        margin-left: 10px;
    }

    .getOrder {
        background-color: #ffffff;
        color: #4270e4;
        border: 2px solid #4270e4;
        margin-right: 20px;
    }

    .add {
        background-color: #23d052;
        color: #fff;
        margin-right: 20px;
    }

    .container {
        display: inline-block;
        height: 40px;

        .block {
            display: inline-block;
        }
    }

    .separate {
        position: relative;
        left: 7px;
    }
}
</style>
 