<template>
    <EditButton :text="$$t(`变量配置`)" @click="open">
        <BaseDialog
            v-model="visible"
            :title="$$t(`变量配置`)"
            width="1100px"
            :close-on-click-modal="false"
            append-to-body
            @close="visible = false"
            @confirm="submit"
            :confirmText="$$t(`保存`)"
        >
            <div class="var-config">
                <div class="tabs__content--actions">
                    <EditButton
                        :text="$$t(`删除`)"
                        color="#bfbfbf"
                        type="other"
                        @click="onDel"
                    />
                    <EditButton
                        :text="$$t(`添加`)"
                        color="#00e609"
                        type="other"
                        @click="onAdd"
                    />
                </div>
                <Table
                    :data="dataSource"
                    selection
                    style="margin-top: 10px; height: 400px"
                    height="100%"
                    @cell-mouse-enter="handleMouseEnter"
                    @cell-mouse-leave="handleMouseLeave"
                    @select="handleSelect"
                    @select-all="handleSelect"
                >
                    <el-table-column width="180" :label="$$t(`排序`)">
                        <template v-slot="{ row, $index }">
                            <div style="display: flex">
                                <div
                                    class="sort"
                                    @click="onSort(0, row, $index)"
                                >
                                    <div class="sort__icon up"></div>
                                </div>
                                <div
                                    class="sort"
                                    @click="onSort(1, row, $index)"
                                >
                                    <div class="sort__icon down"></div>
                                </div>
                            </div>
                        </template>
                    </el-table-column>
                    <template v-for="item in columns">
                        <el-table-column
                            v-if="item.isVar"
                            :prop="item.prop"
                            :label="item.label"
                            :width="item.width"
                            align="center"
                        >
                            <template slot="header" slot-scope="scope">
                                <div class="table-header">
                                    <span style="color: red">*</span>
                                    <span>{{ scope.column.label }}</span>
                                </div>
                            </template>
                            <template v-slot="{ row }">
                                <VariableInput
                                    v-model="row[item.prop]"
                                    style="width: 100%"
                                    :disabled="false"
                                    :iconDisabled="
                                        Boolean(row.deviceId) &&
                                            item.prop !== 'watchVariable'
                                    "
                                />
                            </template>
                        </el-table-column>
                        <el-table-column
                            v-else
                            :prop="item.prop"
                            :label="item.label"
                            align="center"
                        >
                            <template slot="header" slot-scope="scope">
                                <div class="table-header">
                                    <span style="color: red">*</span>
                                    <span>{{ scope.column.label }}</span>
                                </div>
                            </template>
                            <template v-slot="{ row }">
                                <el-input v-model="row[item.prop]" />
                            </template>
                        </el-table-column>
                    </template>
                </Table>
            </div>
        </BaseDialog>
    </EditButton>
</template>

<script>
import EditButton from '@/views/pages/components/edit-button/index.vue';
import VariableInput from '@/views/pages/components/variable-input/index.vue';
import Table from '@/views/pages/components/Table/index.vue';
import BaseDialog from '@/views/pages/components/BaseDialog/index.vue';

import { nextTick } from 'vue';
import { CapacityApi } from '../api';
import _ from 'lodash';
export default {
    name: 'VarConfig',
    components: { BaseDialog, EditButton, VariableInput, Table },
    props: {},
    emits: ['init'],
    data() {
        return {
            visible: false,
            columns: [
                { label: '设备名称', prop: 'DeviceName' },
                { label: '产量变量', prop: 'CapacityTagName', isVar: 1 },
                { label: '合格数变量', prop: 'OkTagName', isVar: 1 },
                { label: '不合格数变量', prop: 'NgTagName', isVar: 1 }
            ],
            dataSource: [],
            tableIndex: null,
            tableSelect: []
        };
    },
    watch: {},
    methods: {
        open() {
            this.visible = true;
            CapacityApi.GetConfigList().then(res => {
                if (res.data.code === 0) {
                    this.dataSource = res.data.data;
                }
            });
        },
        submit() {
            CapacityApi.Save(
                this.dataSource.map((item, index) => ({
                    ...item,
                    Sort: index + 1
                }))
            ).then(res => {
                if (res.data.code === 0) {
                    this.$message.success('保存成功');
                    this.visible = false;
                    this.$emit('init');
                }
            });
        },
        onAdd() {
            const target = {
                uuid: new Date().getTime(),
                id: 0,
                Sort: this.dataSource.length + 1
            };
            this.dataSource.push(target);
        },
        onDel() {
            const selectSourceMap = new Set(
                this.tableSelect.map(item => item.uuid || item.Id)
            );
            const list = this.dataSource.reduce((acc, item) => {
                if (selectSourceMap.has(item.uuid || item.Id)) {
                    selectSourceMap.delete(item.uuid || item.Id);
                } else {
                    acc.push(item);
                }
                return acc;
            }, []);

            this.dataSource = [...list];
        },
        async onSort(type, row, index) {
            const data = [...this.dataSource];
            // 0 - 上移 ; 1 - 下移
            if (type === 0) {
                // 上移逻辑
                if (index > 0) {
                    const temp = data[index - 1];
                    data[index - 1] = data[index];
                    data[index] = temp;
                }
            } else if (type === 1) {
                // 下移逻辑
                if (index < data.length - 1) {
                    const temp = data[index + 1];
                    data[index + 1] = data[index];
                    data[index] = temp;
                }
            }
            this.dataSource = [
                ...data.map((item, index) => {
                    return { ...item, Sort: index + 1 };
                })
            ];
        },
        handleMouseEnter(row) {
            const index = this.dataSource.findIndex(
                item => item.uuid === row.uuid
            );
            this.tableIndex = index;
        },
        handleMouseLeave() {
            this.tableIndex = null;
        },
        handleSelect(selection, row) {
            this.tableSelect = selection;
        }
    }
};
</script>

<style lang="scss" scoped>
.tabs__content--actions {
    display: flex;
    justify-content: flex-end;
}
.sort {
    width: 58px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #e4e4e4;
    border-radius: 4px;
    margin-left: 10px;
    cursor: pointer;

    &__icon {
        display: inline-block;
        width: 18px;
        height: 16px;
        background-size: 100% 100%;
        background-image: url('../../../../assets/images/icon_up.png');
    }
    .down {
        transform: rotate(180deg);
    }
}
</style>
