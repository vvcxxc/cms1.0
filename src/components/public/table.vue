<!--
 * @Description: 表格组件
 * @Date: 2019-11-24 14:58:56
 * @Author: 随风
 * @LastEditors: Tao
 * @LastEditTime: 2020-08-06 16:25:45
 -->
<template>
    <div class="table-container table-container1">
        <el-table
            :data="data"
            border
             highlight-current-row
            header-row-class-name="light-blue"
            row-class-name="high-light"
            height="100%"
            width="100%"
            :style="{'font-size': 14*zoom + 'px'}"
            @select="select"
            @select-all="selectall"
            ref="metable"
            :header-cell-style="{
                background:($store.state.color=='grey')?'#D9DBDE':'#5a6c98',
                color:($store.state.color=='grey')?'#000':'#fff',
                'border-left':'1px solid #cccccc',
                height: 50*zoom + 'px',
                'font-size': 14*zoom + 'px',
                padding:'0'}"
        >
            <template slot="empty">
                <!-- <no-data :tip="tip" v-if="!tip"></no-data>
                <span v-else-if="tip === 'nodata'">暂无数据</span>-->
                <span>{{lang.SCMSConsoleWebApiMySql_NoData}}</span>
            </template>
            <el-table-column type="selection" :width="zoom>1?zoom*65:65" ></el-table-column>
            <el-table-column
                v-for="(value, key) in tableHead"
                :key="key"
                :label="value"
                align="left"
                :width="180 * zoom"
                 :show-overflow-tooltip="true"
            >
                <template slot-scope="scope">
                    <div class="item">
                        <span
                            class="sad"
                            v-if="scope.row.AlarmStateName == lang.AlarmRecord_HT_UnconfirmedUnresumed"
                        >{{ computedData(scope.row[key], key) }}</span>
                        <span
                            class="nosad"
                            v-else-if="scope.row.AlarmStateName == lang.AlarmRecord_HT_ConfirmedNoRecovered"
                        >{{ computedData(scope.row[key], key) }}</span>
                        <span class="nosad1"  v-else-if="scope.row.AlarmStateName == lang.AlarmRecord_HT_UnconfirmedResumption">{{ computedData(scope.row[key], key) }}</span>
                        <span   v-else>{{ computedData(scope.row[key], key) }}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="操作" v-for="(item, index) in operation" :key="index"  :show-overflow-tooltip="true">
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
            comitdata: [],
            comitdata1: [],
            zoom: 1,
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
    },
    mounted(){
        console.log(this.$refs.metable)
        this.zoom = window.screen.width / 1920 < 0.8 ? 0.8 : window.screen.width / 1920
        setTimeout(()=>{
            // let a = $(".content-container").height() - this.zoom * 160 - $(".page-container").height() * this.zoom;
            // $('.table-container').css({
            //     height: `${a}px`
            // });
        })
        // $(".table-container1").height($(".alarm-container").height() - $(".pages-container").height())
        this.$nextTick(() => {
          this.$refs.metable.doLayout(); //解决表格错位
        })
    }
};
</script>

<style lang="scss" scoped>
.table-container {
    height: 100%;
    width: 100%;
}
.item{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
// .sad{
//     color: red;
// }
// .sad:hover{
//     color: black;
// }
</style>
