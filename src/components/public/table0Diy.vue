<!--
 * @Description: 表格组件
 * @Date: 2019-11-24 14:58:56
 * @Author: 随风
 * @LastEditors: Tao
 * @LastEditTime: 2020-08-06 18:11:11
 -->
<template>
    <div class="table-container">
        <el-table
            :data="data"
            border
            ref="myTable"
            highlight-current-row
            header-row-class-name="light-blue"
            :row-class-name="tableRowClassName"
            height="100%"
            width="100%"
            @select="select"
            @select-all="selectall"
            style="font-size: 14px"
            :header-cell-style="{
                background:
                    $store.state.color == 'grey' ? '#D9DBDE' : '#5a6c98',
                color: $store.state.color == 'grey' ? '#000' : '#fff',
                'border-left': '1px solid #cccccc',
                height: '50px',
                'font-size': '14px',
                padding: '0'
            }"
            @row-click="click1"
        >
            <template slot="empty">
                <span>{{
                    noDataText || lang.SCMSConsoleWebApiMySql_NoData
                }}</span>
            </template>
            <el-table-column
                type="selection"
                width="55"
                v-if="showSelection"
            ></el-table-column>
            <el-table-column
                label="序号"
                width="100"
                type="index"
                :show-overflow-tooltip="true"
            ></el-table-column>
            <el-table-column
                v-for="(value, key) in tableHead"
                :key="key"
                :label="typeof value === 'object' ? value.name : value"
                align="left"
                :min-width="
                    typeof value === 'object' && value.width ? value.width : 150
                "
                :show-overflow-tooltip="true"
                :sortable="sortable && sortable.includes(key)"
            >
                <template slot-scope="scope">
                    <template v-if="typeof value === 'object'">
                        <slot
                            v-if="value.slot"
                            :name="value.slot"
                            :scope="scope.row"
                        ></slot>
                        <div
                            v-else-if="value.computed"
                            v-html="
                                value.computed(scope.row[key], key, scope.row)
                            "
                        ></div>
                        <div v-else class="item">
                            <el-tooltip
                                :content="computedData(scope.row[key], key)"
                                placement="top"
                            >
                                <span>{{
                                    computedData(scope.row[key], key)
                                }}</span></el-tooltip
                            >
                        </div>
                    </template>
                    <div class="item" v-else>
                        <el-tooltip
                            :content="computedData(scope.row[key], key)"
                            placement="top"
                        >
                            <span>{{
                                computedData(scope.row[key], key)
                            }}</span></el-tooltip
                        >
                    </div>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
    /**
     * tableHead 2种格式：字符串或者对象。slot 跟 computed只显示其中一种，插槽优先
     * {
            OptionList: {
                name: '操作',
                width: 300,
                slot: 'OptionList' // 插槽
            },
            AlarmTagName: {
                name: '计划状态',
                computed: (row, key)=>{ // 自定义显示内容，可返回 html 或者 string
                    return '<div>key</div>'
                }
            },
            AlarmTagAddress: '图号',
        }
     */
    props: [
        'data',
        'tableHead',
        'operation',
        'tip',
        'sortable',
        'showSelection',
        'noDataText'
    ],
    data() {
        return {
            pensoil: require('../../assets/images/icon_pensoil.png'),
            dell: require('../../assets/images/icon_dell.png'),

            comitdata: [],
            comitdata1: [],
            lang: JSON.parse(localStorage.getItem('languages'))[
                localStorage.getItem('currentLang')
            ]
        };
    },
    updated() {
        if (this.$refs.myTable && this.$refs.myTable.doLayout) {
            this.$refs.myTable.doLayout();
        }
    },
    methods: {
        tableRowClassName({ row, rowIndex }) {
            row.$index = rowIndex;
        },
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
            console.log(this.comitdata1, selection);
            this.$emit('func1', this.comitdata1, selection);
            this.comitdata1 = [];
        },
        click1(i) {
            this.$emit('rowClick', i);
        },
        computedData(value, key) {
            return value;
        }
    },
    mounted() {}
};
</script>

<style lang="scss" scoped>
.table-container {
    height: 100%;
    width: 1690px;
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
        width: 24px;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        cursor: pointer;
        right: 0;
        margin: auto;
        height: 24px;
    }
}
</style>
