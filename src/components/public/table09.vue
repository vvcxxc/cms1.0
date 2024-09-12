<!--
 * @Description: 表格组件
 * @Date: 2019-11-24 14:58:56
 * @Author: 随风
 * @LastEditors: Tao
 * @LastEditTime: 2020-08-06 16:46:54
 -->
<template>
    <div class="table-container">
        <el-table :data="data" border highlight-current-row
            :header-cell-style="{ background: ($store.state.color == 'grey') ? '#D9DBDE' : '#5a6c98', color: ($store.state.color == 'grey') ? '#000' : '#fff', 'border-left': '1px solid #cccccc', height: 50 * a11 + 'px', padding: '0' }"
            header-row-class-name="light-blue" row-class-name="high-light" height="100%" width="100%"
            :style="{ fontSize: a11 * 15 + 'px' }" :row-style="{ height: 50 * a11 + 'px' }"
            @row-click="handleRowChange1">
            <template slot="empty">
                <!-- <no-data :tip="tip" v-if="!tip"></no-data>
                <span v-else-if="tip === 'nodata'">暂无数据</span>-->
                <span>{{ lang.SCMSConsoleWebApiMySql_NoData }}</span>
            </template>

            <el-table-column v-for="(value, key) in tableHead" :key="key" :label="value" align="left"
                :show-overflow-tooltip="true">
                <template slot-scope="scope">
                    <div class="item">
                        <span v-if="key == 'Status'"
                            :style="{ color: scope.row['Status'] == '投料中' ? '#F59A23' : scope.row['Status'] == '未投料' ? '#7F7F7F' : '#000' }">{{
        computedData(scope.row[key],
            key)
}}</span>
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
            a11: 1,
            pensoil: require('../../assets/images/icon_pensoil.png'),
            dell: require('../../assets/images/icon_dell.png'),
            lang: JSON.parse(localStorage.getItem('languages'))[localStorage.getItem('currentLang')]
        };
    },
    mounted() {
        this.a11 = Number(parseFloat(window.screen.width / 1920).toFixed(2));
        if (this.a11 < 1) {
            this.a11 = 0.8;
        }
    },
    methods: {
        handleEdit1(a, b) {
            this.$emit('func', b);
        },
        handleEdit2(a, b) {
            this.$emit('funcn', b);
        },
        handleRowChange1(row, event, column) {
            this.$emit('handleRowChange1', row);
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
    border: 1px solid #cccccc;
    width: 100%;
}

.item {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.img {
    width: 60px;
    height: 30px;
    border-radius: 15px;
    position: relative;
    border: 1px solid #cccccc;
    display: inline-block;
    margin-left: 10px;
    background-color: #ffffff;

    img {
        cursor: pointer;
        width: 24px;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
        height: 24px;
    }
}

// .sad{
//     color: red;
// }
// .sad:hover{
//     color: black;
// }
</style>
