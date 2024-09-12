<template>
    <el-table :ref="refName" :data="tableDataList" :stripe="showStripe" height="100%" :max-height="maxHeight" tooltip-effect="dark" border
        highlight-current-row :header-cell-style="headerCellStyle" header-cell-class-name="my-table"
        cell-class-name="my-cell" @select-all="selectAll" @select="select" @selection-change="selectionChange"
        @sort-change="sortChange" @current-change="currentChange" @row-click="rowClick" >
        <el-table-column v-if="isSelection" :key="Math.random()" type="selection" width="55"></el-table-column>
        <!-- <template > -->
        <el-table-column v-for="(item,index) in columnList" :key="Math.random() + index" show-overflow-tooltip :prop="item.prop"
            :label="item.label" :sortable="item.sortable" :width="item.width" :fixed="item.fixed">
            <!-- 表头slot  -->
            <template slot="header" slot-scope="scope">
                <slot :name="'header-' + item.prop" :scope="scope">
                    <span>{{ item.label }}</span>
                </slot>
            </template>
            <!-- 表体slot -->
            <template slot-scope="scope">
                <slot :name="item.prop" :scope="scope">
                    <span>{{ scope.row[item.prop] }}</span>
                </slot>
            </template>
        </el-table-column>
        <!-- </template> -->
    </el-table>
</template>
<script>
export default {
    props: {
        maxHeight: { //最大高度
            type: String,
            default: null
        },
        showStripe: { // 是否显示斑马纹
            type: Boolean,
            default: true
        },
        isSelection: {//是否显示多选
            type: Boolean,
            default: false
        },
        columnList: {//表格头部列表
            type: Array,
            default: () => {
                return []
            }
        },
        tableDataList: {//表格数据列表
            type: Array,
            default: () => {
                return []
            }
        },
        checkedTableList: {//默认选中列表
            type: Array,
            default: () => {
                return []
            }
        },
        refName: {
            type: String,
            default: 'table'
        },
        thColor: {
            type: String,
            default: '#fff'
        },
        thBackColor: {
            type: String,
            default: '#5a6c98'
        }

    },
    data() {
        return {
        }
    },
    computed: {
        headerCellStyle: function () {
            let style = {
                background: this.$store.state.color == 'grey' ? '#D9DBDE' : this.thBackColor,
                color: this.$store.state.color == 'grey' ? '#000' : this.thColor,
                borderLeft: '1px solid #cccccc',
                height: '50px',
                fontSize: '14px',
                padding: '0',

            }
            return style
        },

    },
    methods: {
        select(selection) {
            this.$emit('select', selection)
        },
        selectAll(selection) {
            this.$emit('selectAll', selection)
        },
        selectionChange(selection) {
            this.$emit('selectionChange', selection)
        },
        sortChange({ column, prop, order }) {
            this.$emit('sortChange', { column, prop, order })
        },
        currentChange(currentRow, oldCurrentRow) {
            this.$emit('currentChange', currentRow, oldCurrentRow)
        },
        rowClick(row, column, event) {
            this.$emit('rowClick', row, column, event)
        }
    },
    mounted() {
    },

}
</script>
<style lang="scss" scope>
.my-table {
    font-family: "思源黑体 CN";

    .cell {
        // white-space: nowrap;
    }

    .caret-wrapper {
        position: absolute;
        top: 50%;
        right: 5px;
        margin-top: -17px;
    }
}

.my-cell {
    min-height: 30px;
    overflow: hidden;
    white-space: nowrap;

}
</style>