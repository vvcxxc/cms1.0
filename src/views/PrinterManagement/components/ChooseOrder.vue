<template>
    <div class="variableSelect">
        <div class="myDialog">
            <div class="popHeader">
                选择订单
                <img :src="no" alt="" @click="handleClick('no')" />
            </div>
            <div class="popContent">
                <div class="mySearch">
                    <span class="text">创建时间</span>
                    <div class="container">
                        <span class="demonstration"></span>
                        <el-date-picker v-model="starttime" type="datetime" placeholder="请选择"
                            value-format="yyyy-MM-dd HH:mm:ss" :style="{ width: '220px' }"></el-date-picker>
                        <span class="text">-</span>
                        <span class="demonstration"></span>
                        <el-date-picker v-model="endtime" type="datetime" placeholder="请选择"
                            value-format="yyyy-MM-dd HH:mm:ss" :style="{ width: '220px' }"></el-date-picker>
                        <span class="text">产品型号</span>
                        <el-select style="margin-left:5px;width:120px" placeholder="请选择" v-model="type">
                            <el-option label="不限" value="00000000-0000-0000-0000-000000000000"></el-option>
                            <el-option v-for="item in typeList" :key="item.ID" :label="item.ProductTypeCode"
                                :value="item.ID">
                            </el-option>
                        </el-select>
                        <el-input v-model="projectkeyword" style="width: 130px; height: 30px" placeholder="关键字"
                            class="space"></el-input>
                        <el-button class="btn btn2" @click="req(1)">
                            查询
                        </el-button>
                    </div>


                </div>
                <div class="myTable">
                    <el-table :data="dataList" height="100%" border ref="multipleTable" highlight-current-row stripe
                        tooltip-effect="dark" style="width: 100%" :header-cell-style="{
                            background: '#E1EDFA',
                            color: '#769DE7',
                            'border-left': '1px solid #cccccc',
                            height: '50px',
                            padding: '0',
                        }" @current-change="handleCurrentChange">
                        <template slot="empty">
                            <span>暂无数据</span>
                        </template>
                        <el-table-column type="index" label="序号" width="60px"></el-table-column>
                        <el-table-column label="订单号" :show-overflow-tooltip="true">
                            <template slot-scope="scope">{{ scope.row.Data.OrderNumber }}</template></el-table-column>
                        <el-table-column prop="OrderStatus" label="订单状态" :show-overflow-tooltip="true"></el-table-column>

                        <el-table-column prop="ProductTypeCode" label="产品型号"
                            :show-overflow-tooltip="true"></el-table-column>
                        <el-table-column prop="ProductTypeFormulaCode" label="物料编码"
                            :show-overflow-tooltip="true"></el-table-column>
                        <el-table-column label="计划数量" :show-overflow-tooltip="true">
                            <template slot-scope="scope">{{ scope.row.Data.PlanNumber }}</template>
                        </el-table-column>
                        <el-table-column prop="OutputNumber" label="产量" :show-overflow-tooltip="true">
                            <template slot-scope="scope">{{ scope.row.Data.OutputNumber }}</template>
                        </el-table-column>
                        <el-table-column prop="UnOkNumber" label="未完成数" :show-overflow-tooltip="true"></el-table-column>
                        <el-table-column prop="OkNumber" label="合格数" :show-overflow-tooltip="true">
                            <template slot-scope="scope">{{ scope.row.Data.OkNumber }}</template>
                        </el-table-column>
                        <el-table-column prop="NgNumber" label="不合格数" :show-overflow-tooltip="true">
                            <template slot-scope="scope">{{ scope.row.Data.NgNumber }}</template>
                        </el-table-column>
                        <el-table-column prop="OrderTime" label="下单日期" :show-overflow-tooltip="true">
                            <template slot-scope="scope">{{ scope.row.Data.OrderTime }}</template>
                        </el-table-column>
                        <el-table-column prop="DeliveryDate" label="交货日期" :show-overflow-tooltip="true">
                            <template slot-scope="scope">{{ scope.row.Data.DeliveryDate }}</template>
                        </el-table-column>
                        <el-table-column prop="Address" label="备注" :show-overflow-tooltip="true">
                            <template slot-scope="scope">{{ scope.row.Data.Remarks }}</template>
                        </el-table-column>
                        <el-table-column prop="Address" label="开始时间" :show-overflow-tooltip="true">
                            <template slot-scope="scope">{{ scope.row.Data.OrderStartTime }}</template>
                        </el-table-column>
                        <el-table-column prop="Address" label="创建时间" :show-overflow-tooltip="true">
                            <template slot-scope="scope">{{ scope.row.Data.CreateTime }}</template>
                        </el-table-column>
                    </el-table>
                </div>
                <div class="pages-container">
                    <my-page :pageData="pageData" @req="req"></my-page>
                </div>
            </div>
            <div class="popBtn">
                <el-button class="btn" @click="handleClick('no')">
                    取消
                </el-button>
                <el-button class="btn" @click="handleClick('yes')" style="
                        margin-right: 40px;
                        background: rgba(56, 109, 240);
                        border: 1px solid #386df0;
                    ">
                    确定
                </el-button>
            </div>
        </div>
        <TipsPop v-if="isTipShow" :tipText="tipText" @tipCallBack="tipCallBack"></TipsPop>

    </div>
</template>

<script>
import MyPage from '@/components/public/Pages.vue';
import TipPop from '../../../components/public/tipPop.vue';
export default {
    components: {
        MyPage,
        TipPop,
    },
    props: ['data', 'multiple'],
    data() {
        return {
            no: require('@/assets/images/no3.png'),
            pageData: {
                PageSize: 50,
                TotalCount: 0,
                TotalPage: 0,
                PageIndex: 1,
                LastEnabled: false,
                NextEnabled: false,
            }, // 分页数据
            dataList: [],
            selectData: null,
            isTipShow: false,
            tipText: '',

            projectkeyword: '',

            starttime: new Date(new Date(new Date().toLocaleDateString()).getTime() -
                29 * 24 * 60 * 60 * 1000 - 1
            ),
            endtime: new Date(
                new Date(new Date().toLocaleDateString()).getTime() +
                24 * 60 * 60 * 1000 - 1
            ),
            typeList: [],
            type: '00000000-0000-0000-0000-000000000000',

        };
    },
    mounted() {
        this.GetProductType()
    },
    methods: {
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
                url: `/api/FormulaManage/QueryProductType`,
                method: 'post',
            }).then((res) => {
                if (res.data.code == 0) {
                    this.typeList = res.data.data
                    // if (this.typeList && this.typeList.length) {
                    //     this.type = this.typeList[0].ID
                    // } else {
                    //     this.type = '';
                    // }
                    this.req(1);
                } else {
                    this.tipText = res.data.msg;
                    this.isPopShow = true;
                }
            });
        },

        req(_index) {
            this.$axios({
                url: `/api/Order/GetProjectOrderInfoList?StartTime=${this.getDate(this.starttime)}&EndTime=${this.getDate(this.endtime)}&PageSize=${this.pageData.PageSize}&PageIndex=${_index}&FID=${this.type}&OrderStatus=${-1}&KeyWord=${this.projectkeyword}&QueryHistory=${true}`,
                method: 'get',
            }).then((res) => {
                if (res.data.code == 0) {
                    this.dataList = res.data.data.DataList;
                    this.pageData = res.data.data.ParameterList;
                    if (this.dataList && this.dataList.length) {
                        this.curItem = this.dataList[0]
                    } else {
                        this.curItem = null;
                    }
                } else {
                    this.tipText = res.data.msg;
                    this.isPopShow = true;
                }
            });
        },

        handleCurrentChange(row) {
            this.selectData = row;
        },
        handleClick(str) {
            if (str == 'yes' && !this.selectData) {
                this.isTipShow = true;
                this.tipText = '请选择一个订单'
                return;
            }
            this.$emit('CallBack', str, this.selectData);

        },
        tipCallBack() {
            this.isTipShow = false;
        },
    }
};
</script>

<style lang="scss" scoped>
.variableSelect {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 101;

    .myDialog {
        position: relative;
        width: 1122px;
        height: 615px;
        top: 50%;
        transform: translateY(-50%);
        margin: auto;
        background: rgba(238, 238, 238);
        box-shadow: 0px 0px 21px rgba(45, 46, 46, 0.43);

        .popHeader {
            width: 1122px;
            height: 60px;
            background: rgba(56, 109, 240);
            line-height: 60px;
            text-align: center;
            color: #ffffff;
            font-size: 20px;
            position: relative;

            img {
                width: 60px;
                height: 60px;
                position: absolute;
                top: 0;
                right: 0;
                cursor: pointer;
            }
        }

        .popContent {
            width: calc(100% - 122px);
            height: calc(100% - 190px);
            margin: 32px 61px;
            border: 1px solid #d0d0d0;
            padding: 10px 24px;

            ::v-deep .el-input__inner {
                height: 30px;
            }

            ::v-deep .el-input__icon {
                line-height: 30px;
            }

            ::v-deep .el-button {
                padding: 0;
            }

            .text {
                font-size: 12px;
                color: #666666;
            }

            .space {
                margin-right: 20px;
            }

            .btn {
                width: 120px;
                height: 30px;
                background: #fff;
                border: 1px solid #386df0;
                opacity: 1;
                border-radius: 4px;
                font-size: 14px;
                color: #386df0;
            }

            .myTable {
                height: calc(100% - 90px);
                width: 100%;
                margin-top: 10px;
                border: 1px solid #d0d0d0;
                padding: 12px;
            }
        }

        .popBtn {
            width: 100%;
            height: 60px;
            text-align: right;
            line-height: 60px;

            .btn {
                width: 100px;
                height: 38px;
                background: rgba(153, 153, 153);
                border-radius: 4px;
                font-size: 16px;
                color: #ffffff;
                margin-left: 20px;
                border: 1px solid #999999;
            }
        }
    }
}
</style>