<!--
 * @Description: 表格组件
 * @Date: 2019-11-24 14:58:56
 * @Author: 随风
 * @LastEditors: Tao
 * @LastEditTime: 2020-08-06 18:30:43
 -->
<template>
    <div class="table-container">
        <el-table
        :popper-append-to-body="false"
            :data="data"
           border
              highlight-current-row
             :header-cell-style="{background:($store.state.color=='grey')?'#D9DBDE':'#5a6c98',color:($store.state.color=='grey')?'#000':'#fff','border-left':'1px solid #cccccc',height:50*a1+'px',padding:'0'}"
            row-class-name="high-light"
            height="100%"
            width="100%"
            :style="{fontSize:a1*15+'px'}"
             :row-style="{height:50*a1+'px'}"
        >
            <template slot="empty">
                <!-- <no-data :tip="tip" v-if="!tip"></no-data>
                <span v-else-if="tip === 'nodata'">暂无数据</span>-->
                <span>{{lang.SCMSConsoleWebApiMySql_NoData}}</span>
            </template>

            <el-table-column
                v-for="(value, key) in tableHead"
                :key="key"
                 :popper-append-to-body="false"
                :label="value"
                align="left"
                :show-overflow-tooltip="true"
                 :height='100'
            >
                <template slot-scope="scope">
                    <div class="item">
                        <span
                            class="sad"
                             :style="{fontSize:a1*15+'px'}"
                            v-if="scope.row.AlarmStateName == '未确认未恢复'"
                        >{{ computedData(scope.row[key], key) }}</span>
                        <span  :style="{fontSize:a1*15+'px'}" v-else>{{ computedData(scope.row[key], key) }}</span>
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
            pensoil: require('../../assets/images/icon_pensoil.png'),
            dell: require('../../assets/images/icon_dell.png'),
             a1:1,
            lang: JSON.parse(localStorage.getItem('languages'))[localStorage.getItem('currentLang')]
            
        };
    },
    mounted(){
    },
    methods: {
        handleEdit1(a,b){
          this.$emit('func',b);
       },
       handleEdit2(a,b){
        this.$emit('funcn',b);
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
.img{
width: 60px;
height: 30px;
border-radius: 15px;
position: relative;
border: 1px  solid #cccccc;
display: inline-block;
margin-left: 10px;
background-color: #ffffff;
img{
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
.colordiv {
    background-color: #d9dbde !important;
}
.colortip {
    background-color: #efeff0 !important;
}
.fcolor{
    color: #000!important;
}
// .sad{
//     color: red;
// }
// .sad:hover{
//     color: black;
// }
</style>
