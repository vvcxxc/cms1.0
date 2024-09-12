<!--
 * @Description: 报警管理
 * @Date: 2019-11-23 11:54:01
 * @Author: 随风
 * @LastEditors: 随风
 * @LastEditTime: 2019-11-27 14:53:55
 -->
<template>
    <div class="MaterialManagementNew-container">

        <div class="MaterialManagementNew-flex">
            <div class="MaterialManagementNew-item table1">
                <div class="item-header">
                    <div class="item-title">物料信息</div>
                </div>
                <div class="item-search">
                    <span>关键词:</span>
                    <el-input style="width: 150px;margin-left: 5px;" v-model="filterStr1" />
                    <div class="search-btn" @click="getData1">查询</div>
                </div>
                <div class="item-table">
                    <el-table ref="table1" @row-click="tableRowClick" highlight-current-row
                        :cell-style="{ borderColor: '#E4E7ED' }"
                        :header-cell-style="{ background: '#5a6c98', color: '#fff' }" :data="dataList1" border
                        height="100%">
                        <template slot="empty">
                            <span>暂无数据</span>
                        </template>
                        <el-table-column type="index" label="序号" width="60px"></el-table-column>
                        <el-table-column prop="MaterialCode" label="物料编码" :show-overflow-tooltip="true"></el-table-column>
                        <el-table-column prop="RevisionCode" label="版本号" :show-overflow-tooltip="true"></el-table-column>
                        <el-table-column prop="Qty" label="数量" :show-overflow-tooltip="true"></el-table-column>
                        <el-table-column prop="LocatorId" label="货位ID" :show-overflow-tooltip="true"></el-table-column>
                    </el-table>
                </div>

            </div>

            <div class="MaterialManagementNew-item">
                <div class="item-header">
                    <div class="item-title">物料条码</div>
                </div>
                <div class="item-search">
                    <span>物料条码:</span>
                    <el-input style="width:  150px;margin-left: 5px;" v-model="filterStr2" />
                    <div class="search-btn" @click="getData2">查询</div>
                </div>
                <div class="item-table">
                    <el-table ref="table2" highlight-current-row :cell-style="{ borderColor: '#E4E7ED' }"
                        :header-cell-style="{ background: '#5a6c98', color: '#fff' }" :data="dataList2" border
                        height="100%">
                        <template slot="empty">
                            <span>暂无数据</span>
                        </template>
                        <el-table-column type="index" label="序号" width="60px"></el-table-column>
                        <el-table-column prop="MaterialLotCode" label="物料条码" :show-overflow-tooltip="true"></el-table-column>
                        <el-table-column prop="Qty" label="数量" :show-overflow-tooltip="true"></el-table-column>
                        <el-table-column prop="SNStatus" label="条码质量状态" :show-overflow-tooltip="true"></el-table-column>
                        <el-table-column prop="FreezeFlag" label="条码冻结状态" :show-overflow-tooltip="true"></el-table-column>

                    </el-table>
                </div>
            </div>

        </div>
        <tip-pop v-if="isTipShow" :tipText="tipText" :noCancel="noCancel" @tipCallBack="tipCallBack"></tip-pop>

    </div>
</template>

<script>

import TipPop from '../../components/public/tipPop.vue';

export default {
    components: {

        TipPop,
    },
    data() {
        return {
            lang: JSON.parse(localStorage.getItem('languages'))[localStorage.getItem('currentLang')],
            isTipShow: false,
            tipText: '',
            noCancel: true,
            filterStr1: '',
            filterStr2: '',
            curLeft: {},
            dataList1: [],
            dataList2: [],

        };
    },
    mounted() {
        this.getData1()
    },
    methods: {
        tipCallBack(str) {
            console.log(str)
            if (str == 'yes') {

            }
            this.isTipShow = false;
            this.noCancel = true;
        },
        tableRowClick(row) {
            this.curLeft = row;
            this.getData2()
        },
        getData1() {
            this.$axios({
                method: 'get',
                url: `/api/Material/GetMaterialList?KeyWord=${this.filterStr1}`,
            })
                .then(res => {
                    if (res.data.code == 0) {
                        this.dataList1 = res.data.data;
                        if (this.dataList1.length) {
                            this.curLeft = this.dataList1[0]
                            this.$refs.table1.setCurrentRow(this.curLeft);
                        } else {
                            this.curLeft = {};
                        }
                        this.getData2()
                    } else {
                        this.isTipShow = true;
                        this.tipText = res.data.msg;
                    }
                })
        },
        getData2() {
             if (!this.curLeft.Id) {
                this.dataList2 = [];
                return
            }
            this.$axios({
                method: 'get',
                url: `/api/Material/GetMaterialCodeList?MaterialId=${this.curLeft.Id}&Barcode=${this.filterStr2}`,
            })
                .then(res => {
                    if (res.data.code == 0) {
                        this.dataList2 = res.data.data;
                    } else {
                        this.isTipShow = true;
                        this.tipText = res.data.msg;
                    }
                })
        },



    }
};
</script>

<style lang='scss' scoped>
.MaterialManagementNew-container {
    width: 100%;
    height: 100%;
    padding: 100px 10px 40px;
    box-sizing: border-box;

    .MaterialManagementNew-flex {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: space-between;

        .MaterialManagementNew-item {
            flex: 2;
            height: 100%;
            padding: 0 10px;
            border: 1px solid #ddd;
            box-sizing: border-box;
            margin-left: 10px;

            .item-header {
                height: 50px;
                display: flex;
                align-items: center;


                .item-title {
                    color: #386df0;
                    font-size: 16px;
                    border-left: 3px solid #386df0;
                    padding-left: 5px;
                }
            }

            .item-search {
                width: 100%;
                height: 50px;
                background-color: #dddddd;
                display: flex;
                align-items: center;
                padding-left: 10px;



                .search-btn {
                    cursor: pointer;
                    margin-right: 10px;
                    height: 36px;
                    width: 100px;
                    border-radius: 4px;
                    border: 1px solid #5279DD;
                    background-color: #fff;
                    color: #5279DD;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    position: relative;
                    margin-left: 10px;
                }


            }

            .item-table {
                width: 100%;
                height: calc(100% - 120px);
                border: 1px solid #ddd;
                margin-top: 10px;

                .green {
                    color: #61D731;
                }

                .yes2 {
                    display: flex;
                    align-items: center;
                    padding-left: 20px;
                    position: relative;
                    line-height: 1;

                    .yes2-content {
                        width: 16px;
                        height: 16px;
                        position: absolute;
                        left: 0;
                        top: 50%;
                        transform: translate(0, -50%);
                    }
                }

                .table-action {
                    width: 50px;
                    float: left;
                    height: 25px;
                    border-radius: 13px;
                    background-color: #fff;
                    border: 1px solid #cccccc;
                    position: relative;
                    margin-left: 5px;
                    cursor: pointer;

                    img {
                        position: absolute;
                        top: 0;
                        width: 20px;
                        height: 20px;
                        bottom: 0;
                        left: 0;
                        right: 0;
                        margin: auto;
                    }
                }
            }

        }

        .table1 {
            flex: 1;
            margin-left: 0;
        }
    }

}
</style>
