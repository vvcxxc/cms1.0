2<!--
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
            @select="select"
            @select-all="selectall"
            :header-cell-style="{background:'#5a6c98',color:'#ffffff', 'border-left':'1px solid #cccccc',height:'50px',padding:'0'}"
        >
            <template slot="empty">
                <!-- <no-data :tip="tip" v-if="!tip"></no-data>
                <span v-else-if="tip === 'nodata'">暂无数据</span>-->
                <span>{{lang.SCMSConsoleWebApiMySql_NoData}}</span>
            </template>
            <el-table-column type="selection" width="60" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column label="序号" prop="Number" width="100" :show-overflow-tooltip="true"></el-table-column>
              <el-table-column label="操作" width="220" prop="Number" >
                 <template slot-scope="scope">
                      <div class="img" @click="handleEdit2(scope.$index, scope.row)">
                            <img :src="pensoil" alt />
                            <!-- {{scope.row.phone}} -->
                        </div>
                            <div class="img" @click="handleEdit1(scope.$index, scope.row)"  v-show="scope.row.UserAccount !== 'SuperAdmin'&& scope.row.UserAccount !== 'guest'">
                            <img :src="dell" alt />
                        </div>
                    </template>
            </el-table-column>
            <el-table-column
                v-for="(value, key) in tableHead"
                :key="key"
                :label="value"
                align="left"
                width="180px"
                :show-overflow-tooltip="true"
            >
                <template slot-scope="scope">
                    <div class="item">
                        <span
                            class="sad"
                            v-if="scope.row.AlarmState == 3"
                        >{{ computedData(scope.row[key], key) }}</span>
                        <span
                            class="nosad"
                            v-else-if="scope.row.AlarmState == 2"
                        >{{ computedData(scope.row[key], key) }}</span>
                        <span v-else>{{ computedData(scope.row[key], key) }}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="操作" v-for="(item, index) in operation" :key="index" :show-overflow-tooltip="true">
                <!-- <div>safa</div> -->
                <!-- <template slot-scope="scope">
					<div class="btn-container">
						<div v-if="(item.title = 'edit')">修改</div>
					</div>
                </template>-->
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
            comitdata: [],
            comitdata1: [],
            lang: JSON.parse(localStorage.getItem('languages'))[localStorage.getItem('currentLang')]
        };
    },
    methods: {
        select(selection, row) {
            let i = 0;
            for (i in selection) {
                this.comitdata.push(selection[i].ID);
            }
            this.$emit('func', this.comitdata, selection);
        },
        selectall(selection, row) {
            let i = 0;
            for (i in selection) {
                this.comitdata1.push(selection[i].ID);
            }
            this.$emit('func1', this.comitdata1, selection);
            this.comitdata1 = [];
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
    width: 1690px;
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
