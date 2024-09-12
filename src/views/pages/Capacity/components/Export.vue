<template>
    <EditButton :text="$$t(`导出`)" @click="open">
        <BaseDialog
            v-model="visible"
            :title="$$t(`导出`)"
            :close-on-click-modal="false"
            append-to-body
            @close="visible = false"
            @confirm="submit"
        >
            <div
                style="margin-bottom: 10px;gap: 10px;display: flex;align-items: center;"
            >
                <span>{{ $$t('生产时间') }}</span>
                <el-date-picker
                    v-model="search.StartTime"
                    type="datetime"
                    value-format="yyyy-MM-dd HH:mm:ss"
                />
                -
                <el-date-picker
                    v-model="search.EndTime"
                    type="datetime"
                    value-format="yyyy-MM-dd HH:mm:ss"
                />
            </div>
            <div
                style="margin-bottom: 10px;gap: 10px;display: flex;align-items: center;"
            >
                <span>{{ $$t('设备名称') }}</span>
                <el-select
                    v-model="search.DevicedIds"
                    multiple
                    placeholder="请选择"
                >
                    <el-option
                        v-for="item in options"
                        :key="item.Id"
                        :label="item.DeviceName"
                        :value="item.Id"
                    >
                    </el-option>
                </el-select>
            </div>
        </BaseDialog>
    </EditButton>
</template>

<script>
import EditButton from '@/views/pages/components/edit-button/index.vue';
import VariableInput from '@/views/pages/components/variable-input/index.vue';
import Table from '@/views/pages/components/Table/index.vue';
import BaseDialog from '@/views/pages/components/BaseDialog/index.vue';

import { CapacityApi } from '../api';
import _ from 'lodash';

export default {
    name: 'VarConfig',
    components: { BaseDialog, EditButton, VariableInput, Table },
    props: {
        tableParams: {
            props: {
                type: Object
            }
        }
    },
    data() {
        return {
            search: {
                StartTime: '',
                EndTime: '',
                DevicedIds: []
            },
            options: [],
            visible: false
        };
    },
    watch: {},
    methods: {
        open() {
            this.visible = true;
            this.search.StartTime = this.tableParams.StartTime;
            this.search.EndTime = this.tableParams.EndTime;
            CapacityApi.GetConfigList().then(res => {
                if (res.data.code === 0) {
                    this.options = res.data.data;
                    this.search.DevicedIds = this.options.map(e => e.Id);
                }
            });
        },
        submit() {
            CapacityApi.ExportCapacityRecordAsync(this.search).then(res => {
                this.downloadFile(res.data, '产能报表.xlsx');
                this.visible = false;
            });
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
