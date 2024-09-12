<template>
    <BaseDialog
        :title="$$t(`报警设置`)"
        v-model="visible"
        width="900px"
        :show-close="false"
        @open="open"
    >
        <el-form size="medium" :model="formData" ref="formRef">
            <el-form-item>
                <el-button type="primary" @click="add">
                    {{ $$t(`新增`) }}
                </el-button>
                <el-button type="info" @click="del">
                    {{ $$t(`删除`) }}
                </el-button>
            </el-form-item>
            <!-- {{ tableData }} -->
            <Table
                :data="tableData"
                ref="tableRef"
                border
                height="400"
                selection
                @selection-change="handleSelectionChange"
                highlight-selection-row
            >
                <el-table-column prop="Reason" :label="$$t(`报警产生原因`)">
                    <el-form-item
                        slot-scope="{ row }"
                        prop="0"
                        :rules="{
                            validator: (rule, value, callback) =>
                                [undefined, ''].includes(row.Reason)
                                    ? callback($$t(`必填`))
                                    : callback(),
                            trigger: 'blur'
                        }"
                    >
                        <el-input v-model="row.Reason"></el-input>
                    </el-form-item>
                </el-table-column>
                <el-table-column prop="Method" :label="$$t(`解决方法`)">
                    <el-form-item
                        slot-scope="{ row }"
                        prop="0"
                        :rules="{
                            validator: (rule, value, callback) =>
                                [undefined, ''].includes(row.Method)
                                    ? callback($$t(`必填`))
                                    : callback(),
                            trigger: 'blur'
                        }"
                    >
                        <el-input v-model="row.Method"></el-input>
                    </el-form-item>
                </el-table-column>
            </Table>
        </el-form>
        <template #footer>
            <div class="footer">
                <el-button type="info" @click="handleClose">{{
                    $$t(`取消`)
                }}</el-button>
                <el-button type="primary" @click="submit">{{
                    $$t(`保存`)
                }}</el-button>
            </div>
        </template>
    </BaseDialog>
</template>
<script>
import {
    defineComponent,
    ref,
    reactive,
    computed,
    onMounted
} from '@vue/composition-api';
import { Message } from 'element-ui';
import BaseDialog from '../../dialog/BaseDialog.vue';
import Table from '../../components/Table/index.vue';
import { SPCAnalysisApi } from '../api';
import store from '@/store';

export default defineComponent({
    name: 'AlarmSetDialog',
    components: {
        Table,
        BaseDialog
    },
    props: {
        value: {
            type: Boolean,
            default: false
        }
    },
    emits: ['confirm'],
    setup(props, { emit }) {
        const visible = computed({
            get() {
                return props.value;
            },
            set(val) {
                emit('input', val);
            }
        });

        const open = async () => {
            const res = await SPCAnalysisApi.QueryAlartSetting();
            if (res.data.code === 0) {
                tableData.value = res.data.data || [];
            }
        };
        const handleClose = () => {
            visible.value = false;
            emit('close');
        };
        const formData = reactive({});
        const formRef = ref(null);
        const tableRef = ref(null);
        const tableData = ref([]);
        const selection = ref([]);
        const handleSelectionChange = val => {
            selection.value = val;
        };
        const add = () => {
            tableData.value.push({
                Id: '00000000-0000-0000-0000-000000000000',
                key: Date.now()
            });
        };
        const DelItems = reactive([]);
        const del = () => {
            selection.value.forEach(item => {
                const index = tableData.value.findIndex(
                    e => e.Id === item.Id || (item.key && e.key === item.key)
                );
                tableData.value.splice(index, 1);
            });
            DelItems.push(
                ...selection.value
                    .filter(
                        e => e.Id !== '00000000-0000-0000-0000-000000000000'
                    )
                    .map(e => e.Id)
            );
        };
        const submit = () => {
            formRef.value.validate(async valid => {
                if (valid) {
                    const res = await SPCAnalysisApi.AddOrEditAlartSetting({
                        Items: tableData.value,
                        DelItems,
                        LoginName: store.state.user.SCMSUserName
                    });
                    if (res.data.code === 0) {
                        DelItems.length = 0;
                        handleClose();
                    }
                }
            });
        };

        return {
            visible,
            formRef,
            tableRef,
            formData,
            tableData,

            open,
            handleClose,
            handleSelectionChange,
            add,
            del,
            submit
        };
    }
});
</script>
<style lang="scss" scoped>
::v-deep {
    .el-table {
        .el-form-item {
            margin-bottom: 0;
            .el-form-item__error {
                position: relative;
            }
        }
    }
}
.footer {
    display: flex;
    margin-top: 20px;
    align-items: center;
    justify-content: flex-end;
    .confirm {
        background: #386df0;
        color: #fff;
    }
}
</style>
