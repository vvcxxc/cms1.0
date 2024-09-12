<!--
 * @Description: 搜索框组件
 * @Date: 2019-11-24 14:57:05
 * @Author: 随风
 * @LastEditors: 随风
 * @LastEditTime: 2019-11-29 16:34:35
 -->
<template>
    <div class="search-container">
        <div class="search-left">
            <div class="search-item" v-for="(item, index) in searchList" :key="index">

                <div
                    class="title"
                    :class="{ mr10: item.title == '至' }"
                    v-if="item.type !== 'key'"
                >{{ item.title }}</div>
                
                <el-select
                    v-if="item.type === 'select'"
                    clearable
                    filterable
                    v-model="searchData[item.model]"
                    class="search-select"
                    @change="change(item, $event)"
                >
                    <!-- <el-option label="全部" value="全部"></el-option> -->
                    <el-option
                        v-for="(options, optionsIndex) in item.optionList"
                        :key="optionsIndex"
                        :label="item.label ? options[item.label] : options"
                        :value="item.value ? options[item.value] : options"
                    ></el-option>
                </el-select>
                <el-date-picker
                    v-if="item.type === 'time'"
                    v-model="searchData[item.model]"
                    type="datetime"
                    :placeholder="lang.SCMSConsoleWebApiMySql_PleChooseDate"
                    default-time="12:00:00"
                        value-format="yyyy-MM-dd HH:mm:ss"
                ></el-date-picker>
				<!-- <span>-</span> -->
                <el-date-picker
                    v-if="item.type === 'datetimerange'"
                    v-model="searchData[item.model]"
                    type="datetimerange"
                    range-separator="-"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                        value-format="yyyy-MM-dd HH:mm:ss"
                ></el-date-picker>
                <el-input
                    v-if="item.type === 'key'"
                    v-model="searchData[item.model]"
                    :placeholder="item.placeholder || lang.AlarmRecord_Time_Keyword"
                    clearable
                ></el-input>
            </div>
            <div class="btn pointer importtant" @click="search">{{lang.RoleManage_Query}}</div>
            <div class="btn pointer export" @click="exportTable">{{lang.AlarmRecord_HT_AlarmPointManageUC_Export}}</div>
            <div class="confirm" @click="confirm">{{lang.AlarmRecord_Time_Sure}}</div>
            <div class="allconfirm" @click="allconfirm">{{lang.AlarmRecord_Time_AllSure}}</div>
        </div>
        <!-- <div class="fr">
            <div class="import">导入</div>
            <div class="export">导出</div>
        </div> -->
    </div>
</template>

<script>
export default {
    props: ['searchList', 'searchData', 'styleList'],
    data() {
        return {
            lang: JSON.parse(localStorage.getItem('languages'))[localStorage.getItem('currentLang')]
        };
    },
    methods: {
        search() {
           
            this.$emit('setParams', this.searchData);
            this.$parent.req(1);
        },
        exportTable(){
          this.$emit('exportTable');
        },
        confirm(){
        this.$emit('confirm');
        },
        allconfirm(){
        this.$emit('allconfirm');
        },
        change(item, e) {
            if (
                item.model === 'argAlarmArray' ||
                item.model === 'argAlarmGroupId'
            ) {
                this.$emit('change', e,item);
            }
        }
    },
    mounted(){
        this.search();
    }
};
</script>

<style lang="scss" scoped>
%flex {
    display: flex;
    align-items: center;
}

.search-container {
    @extend %flex;
    justify-content: space-between;
    background-color: #ddd;
    width: 100%;
	position: relative;
}
span{
	position: absolute;
	left: 315px;

}
.importtant{
   right: 420px;
   position: absolute;
   bottom: 10px;
}
.search-left {
    @extend %flex;
    flex-wrap: wrap;
    margin-bottom: 10px;
    .search-item {
        @extend %flex;
        margin: 10px;
        margin-bottom: 0;
        .mr10 {
            margin-right: 10px;
        }
    }
    .btn {
        @extend %flex;
        justify-content: center;
        width: 120px;
        height: 40px;
        background-color: #4270e4;
        border-radius: 4px;
        color: #fff;
        margin-top: 10px;
        font-weight: 600;
        margin-left: 10px;

    }
}
.import {
    border: 1px solid #fda100;
    background-color: #ffffff;
    width: 120px;
    height: 38px;
    margin-top: 11px;
    display: block;
    border-radius: 4px;
    text-align: center;
    line-height: 38px;
    cursor: pointer;
    float: left;
    color: #fda100;
}
.export {
   position: absolute;
   right: 290px;
   bottom: 10px;
}
.fr {
    width: 260px;
    height: 100%;
}
.el-select{
    width: 310px;
}
.el-input{
    width: 200px;
}
.confirm{
    width: 120px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    background-color:#ff6600;
     font-weight: 600;
      border-radius: 4px;
      color: #fff;
      position: absolute;
      bottom: 10px;
      cursor: pointer;
      right: 160px;
    
}
.allconfirm{
    width: 120px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    background-color:#ff6600;
     font-weight: 600;
      border-radius: 4px;
      color: #fff;
      position: absolute;
      bottom: 10px;
      right: 30px;;
          cursor: pointer;
}
</style>
