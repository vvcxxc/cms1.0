<!--
 * @Description: 报警管理
 * @Date: 2019-11-23 11:54:01
 * @Author: 随风
 * @LastEditors: 随风
 * @LastEditTime: 2019-11-27 14:53:55
 -->
<template>
    <div class="DataItemCollection-container">

        <div class="DataItemCollection-flex">
            <div class="DataItemCollection-item table1">
                <div class="item-header">
                    <div class="item-title">设备信息</div>
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
                        <el-table-column prop="EquipmentCode" label="设备ID" :show-overflow-tooltip="true"></el-table-column>
                    </el-table>
                </div>

            </div>

            <div class="DataItemCollection-item">
                <div class="item-header">
                    <div class="item-title">采集项信息</div>
                </div>

                <div class="item-table">
                    <el-table ref="table2" highlight-current-row :cell-style="{ borderColor: '#E4E7ED' }"
                        :header-cell-style="{ background: '#5a6c98', color: '#fff' }" :data="dataList2" border
                        height="100%">
                        <template slot="empty">
                            <span>暂无数据</span>
                        </template>
                        <el-table-column type="index" label="序号" width="60px"></el-table-column>
                        <el-table-column prop="TagCode" label="采集项编码" :show-overflow-tooltip="true"></el-table-column>
                        <el-table-column prop="TagDescription" label="采集项目" :show-overflow-tooltip="true"></el-table-column>
                    </el-table>
                </div>
            </div>

        </div>
        <tip-pop v-if="isTipShow" :tipText="tipText" :noCancel="noCancel" @tipCallBack="tipCallBack"></tip-pop>

    </div>
</template>

<script>

import TipPop from '../../../components/public/tipPop.vue';

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
                url: `/api/BasicData/GetDeviceList`,
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
            console.log(this.curLeft.EquipmentId)
            if (!this.curLeft.EquipmentId) {
                this.dataList2 = [];
                return
            }
            this.$axios({
                method: 'get',
                url: `/api/BasicData/GetDataCollectionList?equipmentId=${this.curLeft.EquipmentId}`,
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
.DataItemCollection-container {
    width: 100%;
    height: 100%;
    padding: 10px;
    box-sizing: border-box;

    .DataItemCollection-flex {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: space-between;

        .DataItemCollection-item {
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


            .item-table {
                width: 100%;
                height: calc(100% - 60px);
                border: 1px solid #ddd;

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
