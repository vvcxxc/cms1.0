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
             highlight-current-row
            header-row-class-name="light-blue"
            row-class-name="high-light"
            height="100%"
            width="100%"
        
        >
          <el-table-column label="序号" prop="Number" width="150">

            </el-table-column>
            <template slot="empty">
                <!-- <no-data :tip="tip" v-if="!tip"></no-data>
				<span v-else-if="tip === 'nodata'">暂无数据</span> -->
                <span>{{lang.SCMSConsoleWebApiMySql_NoData}}</span>
            </template>
            <el-table-column
                v-for="(value, key) in tableHead"
                :key="key"
                :label="value"
                align="left"
                width="280"
            >
                <template slot-scope="scope">
                    <div class="item">
                        <span  class="sad" v-if="scope.row.AlarmStateName == '未确认未恢复'">{{ computedData(scope.row[key], key) }}</span>
                        <span   v-else>{{ computedData(scope.row[key], key) }}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="Condition" label="条件"  width="200">
                   <template slot-scope="scope">
                    <div class="item">
                        <select name="" id="" style="width:180px;height:30px;text-indent:0.5em" v-model="scope.row.Condition" @change="haschange(scope)">
                            <option :value="item" v-for="(item,index) in scope.row.ConditionList" :key="index">{{item}}</option>
                        </select>
                    </div>
                </template>
             </el-table-column>
             <el-table-column prop="Limit" label="限值"  width="200" >
                   <template slot-scope="scope">
                    <div class="item">
                        <input type="text" style="width:180px;height:30px;text-indent:0.5em" v-model="scope.row.Limit"  @change="haschange(scope)">
                    </div>
                </template>
             </el-table-column>
             <el-table-column prop="Text" label="报警文本"  width="200">
                   <template slot-scope="scope">
                    <div class="item">
                        <input type="text" style="width:180px;height:30px;text-indent:0.5em" v-model="scope.row.Text" @change="haschange(scope)">
                    </div>
                </template>
             </el-table-column>
            <el-table-column prop="Level" label="报警级别"  width="200">
                   <template slot-scope="scope">
                    <div class="item">
                        <select name="" id="" style="width:180px;height:30px;text-indent:0.5em" v-model="scope.row.Level" @change="haschange(scope)">
                            <option value="H">H</option>
                            <option value="HH">HH</option>
                            <option value="L">L</option>
                            <option value="LL">LL</option>
                        </select>
                    </div>
                </template>
             </el-table-column>
            <el-table-column
                label="操作"
                v-for="(item, index) in operation"
                :key="index"
            >
                <!-- <div>safa</div> -->
                <!-- <template slot-scope="scope">
					<div class="btn-container">
						<div v-if="(item.title = 'edit')">修改</div>
					</div>
				</template> -->
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
    props: ['data', 'tableHead', 'operation', 'tip',],
    data() {
        return {
            
            changedata:{},
            changedata1:[],
            lang: JSON.parse(localStorage.getItem('languages'))[localStorage.getItem('currentLang')]
        };
    },
    methods: {
        haschange(a){
        //     console.log(a.row.Text);
        // this.changedata.AlarmID = a.row.ID;
        //    this.changedata.Number = a.row.Number;
        //    this.changedata.DataType = a.row.DataType;
        //    this.changedata.TagName = a.row.Name;
        //    this.changedata.Condition = a.row.Condition;
        //    this.changedata.Limit = a.row.Limit;
        //    this.changedata.Text = a.row.Text;
        //    this.changedata.Level = a.row.Level;
            this.changedata1.push(a.row);
            console.log(this.changedata1);
            this.$emit('changedata',this.changedata1)
           
        },
      
        zore(){
             this.changedata1 = [];
             console.log("sadsad", this.changedata1);
        },
        // sadsad(row,column,cell,event){
        // //    this.changedata.AlarmID = row.ID;
        // //    this.changedata.Number = row.Number;
        // //    this.changedata.DataType = row.DataType;
        // //    this.changedata.TagName = row.Name;
        // //    this.changedata.Condition = row.Condition;
        // //    this.changedata.Limit = row.Limit;
        // //    this.changedata.Text = row.Text;
        // //    this.changedata.Level = row.Level;
        // //    console.log(row);
        // //    this.changedata1.push(this.changedata);
        // //    console.log(this.changedata1);
        // //    this.$emit('changedata',this.changedata1)
        // console.log(event);
        // },
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
