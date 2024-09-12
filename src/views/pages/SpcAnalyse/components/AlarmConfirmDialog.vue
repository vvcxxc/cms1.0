<template>
    <BaseDialog
        color="#ffbc3d"
        :title="$$t(`报警确认`)"
        v-model="visible"
        width="1300px"
        :show-close="false"
        @open="open"
    >
        <el-form size="small" :model="formData" ref="formRef">
            <el-form-item :label="$$t('用户权限')">
                <div style="display: flex;align-items: center;">
                    <el-button
                        :type="isRight ? `success` : `danger`"
                        size="large"
                        circle
                    >
                    </el-button>
                    <el-button
                        type="success"
                        size="mini"
                        @click="visibleValid = true"
                    >
                        {{ $$t(`验证`) }}
                    </el-button>
                </div>
            </el-form-item>
            <Table :data="tableData" ref="tableRef" border height="400">
                <el-table-column type="index" width="55" :label="$$t(`序号`)" />
                <el-table-column prop="CreateTime" :label="$$t(`报警时间`)" />
                <el-table-column
                    prop="ParameterName"
                    :label="$$t(`报警站位`)"
                />
                <el-table-column prop="ErrorType" :label="$$t(`错误类型`)" />
                <el-table-column prop="Spot" :label="$$t(`点数`)" />
                <el-table-column prop="Reason" :label="$$t(`原因`)">
                    <el-form-item
                        slot-scope="{ row, $index }"
                        prop="0"
                        :rules="{
                            validator: (rule, value, callback) =>
                                (currIndex === undefined ||
                                    currIndex === $index) &&
                                [null, undefined, ''].includes(row.Reason)
                                    ? callback($$t(`请选择原因`))
                                    : callback(),
                            trigger: 'blur'
                        }"
                    >
                        <el-select
                            v-model="row.Reason"
                            @change="v => ReasonChange(v, row)"
                        >
                            <el-option
                                v-for="item in reason"
                                :label="item"
                                :value="item"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                </el-table-column>
                <el-table-column prop="Handle" :label="$$t(`处理方法`)">
                    <el-form-item
                        slot-scope="{ row, $index }"
                        prop="0"
                        :rules="{
                            validator: (rule, value, callback) =>
                                (currIndex === undefined ||
                                    currIndex === $index) &&
                                [null, undefined, ''].includes(row.Handle)
                                    ? callback($$t(`处理方法必填`))
                                    : callback(),
                            trigger: 'blur'
                        }"
                    >
                        <el-input v-model="row.Handle"></el-input>
                    </el-form-item>
                </el-table-column>
                <el-table-column prop="Remarks" :label="$$t(`备注`)">
                    <el-form-item slot-scope="{ row }">
                        <el-input v-model="row.Remarks"></el-input>
                    </el-form-item>
                </el-table-column>
                <el-table-column :label="$$t(`操作`)" width="80">
                    <el-form-item slot-scope="{ $index }">
                        <el-button
                            type="warning"
                            @click="submit($index)"
                            :disabled="!isRight"
                        >
                            {{ $$t(`确认`) }}
                        </el-button>
                    </el-form-item>
                </el-table-column>
            </Table>
        </el-form>
        <template #footer>
            <div class="footer">
                <el-button type="info" @click="handleClose">{{
                    $$t(`取消`)
                }}</el-button>
                <el-button
                    type="warning"
                    @click="submit()"
                    :disabled="!isRight"
                    >{{ $$t(`全部确认`) }}</el-button
                >
            </div>
        </template>
        <ValidDialog
            v-model="visibleValid"
            @confirm="isRight = true"
        ></ValidDialog>
    </BaseDialog>
</template>
<script>
import { defineComponent, ref, reactive, computed } from '@vue/composition-api';
import BaseDialog from '../../dialog/BaseDialog.vue';
import ValidDialog from './ValidDialog.vue';
import Table from '../../components/Table/index.vue';
import { SPCAnalysisApi } from '../api';
import store from '@/store';

export default defineComponent({
    name: 'AlarmConfirmDialog',
    components: {
        BaseDialog,
        Table,
        ValidDialog
    },
    props: {
        value: {
            type: Boolean,
            default: false
        },
        tableData: {
            type: Array,
            default: () => []
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
            isRight.value = false
            const res = await SPCAnalysisApi.GetReason();
            if (res.data.code === 0) {
                reason.value = res.data.data || [];
            }
            const user = JSON.parse(sessionStorage.getItem('userInfo1')) || {};
            isRight.value = user.SCMSUserName === 'SuperAdmin';
        };
        const handleClose = () => {
            visible.value = false;
            emit('close');
        };
        const isRight = ref(false);
        const formData = reactive({});
        const formRef = ref(null);
        const tableRef = ref(null);
        const visibleValid = ref(false);
        const currIndex = ref(undefined);
        const reason = ref([]);
        const handle = ref([]);
        const ReasonChange = (reason, row) => {
            SPCAnalysisApi.GetHandleFromReason(null, {
                reason
            }).then(res => {
                if (res.data.code === 0) {
                    row.Handle = res.data.data || '';
                }
            });
        };
        const submit = curr => {
            currIndex.value = curr;
            formRef.value.validate(async valid => {
                if (valid) {
                    const res = await SPCAnalysisApi.AlarmAllSure(
                        currIndex.value === undefined
                            ? props.tableData
                            : [props.tableData[currIndex.value]],
                        {
                            loginUserName: store.state.user.SCMSUserName
                        }
                    );
                    if (res.data.code === 0) {
                        emit('confirm');
                        if (currIndex.value === undefined) {
                            handleClose();
                        }
                    }
                }
            });
        };

        return {
            visible,
            formRef,
            tableRef,
            formData,
            visibleValid,
            currIndex,
            reason,
            handle,
            isRight,

            open,
            handleClose,
            submit,
            ReasonChange
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
