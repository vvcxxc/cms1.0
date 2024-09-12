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
            :header-cell-style="{ background: ($store.state.color == 'grey') ? '#D9DBDE' : '#5a6c98', color: ($store.state.color == 'grey') ? '#000' : '#fff', 'border-left': '1px solid #cccccc', height: '50px', padding: '0' }"
            header-row-class-name="light-blue" row-class-name="high-light" height="100%" width="100%"
            :style="{ fontSize: ' 15px' }" :row-style="{ height: '50px' }">
            <template slot="empty">
                <!-- <no-data :tip="tip" v-if="!tip"></no-data>
                <span v-else-if="tip === 'nodata'">暂无数据</span>-->
                <span>{{ lang.SCMSConsoleWebApiMySql_NoData }}</span>
            </template>
            <el-table-column type="index" label="序号" align="center" :show-overflow-tooltip="true"
                width="80"></el-table-column>
            <el-table-column label="操作" align="center" :show-overflow-tooltip="true" width="80">
                <template slot-scope="scope">
                    <div class="table-btn-container">
                        <div class="btn-icon" @click="handleEdit(scope.row)"> <img
                                src="../../assets/images/check.png" /></div>
                    </div>
                </template>
            </el-table-column>
            <el-table-column v-for="(value, key) in tableHead" :key="key" :label="value" align="center"
                :show-overflow-tooltip="true">
                <template slot-scope="scope">
                    <div class="item">

                        <span>{{ scope.row[key] }}</span>
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
            dell: require('../../assets/images/icon_dell.png'),
            lang: JSON.parse(localStorage.getItem('languages'))[localStorage.getItem('currentLang')]
        };
    },

    methods: {
        handleEdit(row) {
            this.$emit('handleEdit', row);
        },

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

.table-btn-container {
    display: flex;
    align-items: center;

    .btn-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 60px;
        height: 31px;
        background: #FFFFFF;
        border-radius: 12px;
        opacity: 1;
        border: 1px solid #386df0;
        margin-right: 10px;
        color: #499CCA;
        cursor: pointer;

        img {
            width: 16px;
            height: 16px;
        }
    }

    .btn-icon:active {
        background: #E4E4E4;
    }
}
</style>
