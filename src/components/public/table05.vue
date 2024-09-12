<!--
 * @Description: 表格组件
 * @Date: 2019-11-24 14:58:56
 * @Author: 随风
 * @LastEditors: 随风
 * @LastEditTime: 2019-11-28 16:08:08
 -->
<template>
    <div class="table-container">
        <el-table
            :data="data"
            border
            header-row-class-name="light-blue"
            row-class-name="high-light"
            height="100%"
            width="100%"
             highlight-current-row
            @select="select"
        >
            <template slot="empty">
                <!-- <no-data :tip="tip" v-if="!tip"></no-data>
                <span v-else-if="tip === 'nodata'">暂无数据</span>-->
                <span>{{lang.SCMSConsoleWebApiMySql_NoData}}</span>
            </template>
             <el-table-column prop="Number" label="序号"  width="150">
                   <template slot-scope="scope">
                    <div class="item">
                        <span
                            class="sad"
                            v-if="scope.row.AlarmStateName == '未确认未恢复'"
                        >{{scope.row.Number}}</span>
                        <span
                            class="nosad"
                            v-else-if="scope.row.AlarmStateName == '已确认未恢复'"
                        >{{scope.row.Number}}</span>
                        <span v-else>{{scope.row.Number}}</span>
                    </div>
                </template>
             </el-table-column>
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column
                v-for="(value, key) in tableHead"
                :key="key"
                :label="value"
                align="left"
                width="250"
            >
                <template slot-scope="scope">
                    <div class="item">
                        <span
                            class="sad"
                            v-if="scope.row.AlarmStateName == '未确认未恢复'"
                        >{{ computedData(scope.row[key], key) }}</span>
                        <span
                            class="nosad"
                            v-else-if="scope.row.AlarmStateName == '已确认未恢复'"
                        >{{ computedData(scope.row[key], key) }}</span>
                        <span v-else>{{ computedData(scope.row[key], key) }}</span>
                    </div>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
    props: ['data', 'tableHead', 'operation', 'tip'],
    data() {
        return {
            comitdata:[],
            lang: JSON.parse(localStorage.getItem('languages'))[localStorage.getItem('currentLang')]
        };
    },
    methods: {
        select(selection, row) {
            let i = 0;
            for(i in selection){
                this.comitdata.push(selection[i].ID);
            }
            this.$emit('func',this.comitdata,selection);

            
        },
        computedData(value, key) {
            // if (key === 'AlarmTime' || key === 'RecoverTime') {
            // }
            if (key === 'AlarmState') {
                let stateObj = {
                    0: this.lang.AlarmRecord_HT_ConfirmedRecovery,
                    1: this.lang.AlarmRecord_HT_UnconfirmedResumption,
                    2: this.lang.AlarmRecord_HT_ConfirmedNoRecovered,
                    3: this.lang.AlarmRecord_HT_UnconfirmedUnresumed
                };
                return stateObj[value] || '--';
            }
            if (key === 'DeviceStatus') {
                let statusObj = {
                    1: this.lang.EquipmentAccount_Used,
                    2: this.lang.EquipmentAccount_Stopped,
                    3: this.lang.EquipmentAccount_Abandoned
                };
                return statusObj[value] || '--';
            }
            if (key === 'QualityStatus') {
                let statusObj = {
                    1: this.lang.EquipmentAccount_Inside,
                    2: this.lang.EquipmentAccount_Outside
                };
                return statusObj[value] || '--';
            }
            return value || '--';
        }
    }
};
</script>

<style lang="scss" scoped>
.table-container {
    height: 100%;
    width: 1700px;
}
// .sad{
//     color: red;
// }
// .sad:hover{
//     color: black;
// }
</style>
