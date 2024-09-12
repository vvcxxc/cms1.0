<!--
 * @Description: 报警管理
 * @Date: 2019-11-23 11:54:01
 * @Author: 随风
 * @LastEditors: 随风
 * @LastEditTime: 2019-11-27 14:53:55
 -->
<template>
    <div class="MaterialManagementNew-container">

        <div class="MaterialManagementNew-item">

            <div class="item-search">

                <el-select v-model="timeType" type="datetime" placeholder="请选择" style="width:150px;">
                    <el-option label="叫料时间" value="0"></el-option>
                    <el-option label="送达时间" value="1"></el-option>
                </el-select>
                <div style="margin:0 10px;">时间范围</div>
                <el-date-picker v-model="startime" type="datetime" placeholder="选择日期时间" style="width:210px;">
                </el-date-picker>
                <div style="margin:0 10px;">-</div>
                <el-date-picker v-model="endtime" type="datetime" placeholder="选择日期时间" style="width:210px;">
                </el-date-picker>
                <div style="margin:0 10px;">送达状态</div>
                <el-select v-model="deliverType" placeholder="请选择" style="width:150px;">
                    <el-option label="不限" value=""></el-option>
                    <el-option label="未响应" value="0"></el-option>
                    <el-option label="未送达" value="1"></el-option>
                    <el-option label="已送达" value="2"></el-option>
                </el-select>
                <span style="margin:0 10px;">关键词:</span>
                <el-input style="width: 150px;margin-left: 5px;" v-model="filterStr1"  placeholder="请输入" />
                <div class="search-btn" @click="getData1">查询</div>
            </div>
            <div class="item-table">
                <el-table highlight-current-row :cell-style="{ borderColor: '#E4E7ED' }"
                    :header-cell-style="{ background: '#5a6c98', color: '#fff' }" :data="dataList1" border height="100%">
                    <template slot="empty">
                        <span>暂无数据</span>
                    </template>
                    <el-table-column type="index" label="序号" width="60px"></el-table-column>
                    <el-table-column prop="OrderNo" label="领料编码" :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column prop="InstructionDocNumber" label="领料单号"
                        :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column prop="Status" label="送达状态" :show-overflow-tooltip="true">
                        <template slot-scope="scope">
                            <span :style="{
                                color: scope.row.Status == 0 ? '#FF0000' :
                                    scope.row.Status == 1 ? '#FF9500' : '#606266'
                            }">{{ scope.row.Status == 0 ? '未响应' :
    scope.row.Status == 1 ? '未送达' : scope.row.Status == 2 ? '已送达' : '-' }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="MaterialCode" label="物料编码" :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column prop="LocatorId" label="货位ID" :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column prop="AgvPointCode" label="AGV站点编码" :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column prop="CallTime" label="叫料时间" :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column prop="DeliveryTime" label="送达时间" :show-overflow-tooltip="true"></el-table-column>
                </el-table>
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
            dataList1: [],
            timeType: '0',
            startime: new Date(
                new Date(new Date().toLocaleDateString()).getTime() -
                24 * 60 * 60 * 1000 * 6
            ),
            endtime: new Date(
                new Date(new Date().toLocaleDateString()).getTime() +
                24 * 60 * 60 * 1000 -
                1
            ),
            deliverType: ''
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
        getData1() {
            this.$axios({
                method: 'get',
                url: `/api/MaterialOrder/GetMaterialOrderList?Keyword=${this.filterStr1}&dateType=${this.timeType}&startTime=${this.getDate(this.startime)}&endTime=${this.getDate(this.endtime)}&deliverStatus=${this.deliverType}`,
            })
                .then(res => {
                    if (res.data.code == 0) {
                        this.dataList1 = res.data.data;
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


    .MaterialManagementNew-item {
        width: 100%;
        height: 100%;
        border: 1px solid #ddd;
        box-sizing: border-box;
        margin-left: 10px;



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
            height: calc(100% - 50px);
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


}
</style>
