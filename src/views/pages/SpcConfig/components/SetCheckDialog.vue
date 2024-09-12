<template>
    <BaseDialog
        :title="$$t(`${value.type === 1 ? '新增' : '修改'}检测项目`)"
        :value="value.type !== 0"
        width="1200px"
        :show-close="false"
        @open="open"
    >
        <el-form size="medium" :model="formData" ref="formRef">
            <el-form-item>
                <h3
                    slot="label"
                    style="width: 920px; text-align: left;color: #386df0;"
                >
                    {{ $$t('检测项目') }}
                </h3>
                <template v-if="value.type === 1">
                    <el-button type="success" plain @click="add">
                        {{ $$t(`添加项目`) }}
                    </el-button>
                    <el-button type="info" plain @click="del">
                        {{ $$t(`删除项目`) }}
                    </el-button>
                </template>
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
                <el-table-column prop="ParameterName" :label="$$t(`参数名`)">
                    <el-form-item
                        slot-scope="{ row }"
                        prop="0"
                        :rules="{
                            validator: (a, b, cb) =>
                                validator(row.ParameterName, cb),
                            trigger: 'blur'
                        }"
                    >
                        <el-input v-model="row.ParameterName"></el-input>
                    </el-form-item>
                </el-table-column>
                <el-table-column
                    prop="VariableName"
                    :label="$$t(`变量名`)"
                    width="200px"
                >
                    <el-form-item
                        slot-scope="{ row, $index }"
                        prop="0"
                        :rules="{
                            validator: (a, b, cb) =>
                                validator(row.VariableName, cb),
                            trigger: 'blur'
                        }"
                    >
                        <el-input v-model="row.VariableName">
                            <template slot="suffix">
                                <span
                                    style="background: #409EFF;color: white;cursor: pointer;"
                                    @click="handleChoose($index)"
                                    >···</span
                                >
                            </template>
                        </el-input>
                    </el-form-item>
                </el-table-column>
                <el-table-column prop="SubgroupCapacity">
                    <template #header>
                        <span @click="handleHelp">
                            {{ $$t(`子组容量`) }}
                            <i class="el-icon-question"></i>
                        </span>
                    </template>
                    <el-form-item
                        slot-scope="{ row }"
                        prop="0"
                        :rules="{
                            validator: (a, b, cb) => {
                                const val = row.SubgroupCapacity;
                                [undefined, ''].includes(val) &&
                                    cb($$t(`必填`));
                                return /^[1-9]\d*$/.test(val)
                                    ? cb()
                                    : cb($$t('请输入正整数'));
                            },
                            trigger: 'blur'
                        }"
                    >
                        <el-input
                            v-model="row.SubgroupCapacity"
                            type="number"
                        ></el-input>
                    </el-form-item>
                </el-table-column>
                <el-table-column prop="UpperLimit" :label="$$t(`上限值`)">
                    <el-form-item
                        slot-scope="{ row }"
                        prop="0"
                        :rules="{
                            validator: (a, b, cb) => {
                                const val = row.UpperLimit;
                                [undefined, ''].includes(val) &&
                                    cb($$t(`必填`));
                                return /^\d+(\.\d{1,5})?$/.test(val)
                                    ? cb()
                                    : cb($$t('最多五位小数'));
                            },
                            trigger: 'blur'
                        }"
                    >
                        <el-input
                            v-model="row.UpperLimit"
                            type="number"
                            @input="val => row.UpperLimit"
                        ></el-input>
                    </el-form-item>
                </el-table-column>
                <el-table-column prop="LowerLimit" :label="$$t(`下限值`)">
                    <el-form-item
                        slot-scope="{ row }"
                        prop="0"
                        :rules="{
                            validator: (a, b, cb) => {
                                const val = row.LowerLimit;
                                [undefined, ''].includes(val) &&
                                    cb($$t(`必填`));
                                return /^\d+(\.\d{1,5})?$/.test(val)
                                    ? cb()
                                    : cb($$t('最多五位小数'));
                            },
                            trigger: 'blur'
                        }"
                    >
                        <el-input v-model="row.LowerLimit"></el-input>
                    </el-form-item>
                </el-table-column>
                <el-table-column prop="TargetValue" :label="$$t(`目标值`)">
                    <el-form-item
                        slot-scope="{ row }"
                        prop="0"
                        :rules="{
                            validator: (a, b, cb) => {
                                const val = row.TargetValue;
                                [undefined, ''].includes(val) &&
                                    cb($$t(`必填`));
                                return /^\d+(\.\d{1,5})?$/.test(val)
                                    ? cb()
                                    : cb($$t('最多五位小数'));
                            },
                            trigger: 'blur'
                        }"
                    >
                        <el-input v-model="row.TargetValue"></el-input>
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

        <variable-select
            v-if="isVariableShow"
            :data="chooseArr"
            @variableSelectCallBack="variableSelectCallBack"
        />
    </BaseDialog>
</template>
<script>
import { defineComponent, ref, reactive } from '@vue/composition-api';
import { Message } from 'element-ui';
import BaseDialog from '../../dialog/BaseDialog.vue';
import Table from '../../components/Table/index.vue';
import { SPCConfigApi } from '../api';
import VariableSelect from '@/components/public/variableSelect.vue';

export default defineComponent({
    name: 'SetCheckDialog',
    components: {
        Table,
        BaseDialog,
        VariableSelect
    },
    props: {
        value: {
            type: Object,
            default: () => {}
        }
    },
    emits: ['confirm', 'close', 'handleHelp'],
    setup(props, { emit }) {
        const open = async () => {
            const strategy = {
                1: () => (tableData.value = []),
                2: () => {
                    tableData.value = props.value.data;
                    tableData.value.length === 0 && handleClose();
                }
            };
            strategy[props.value.type]();
        };
        const handleClose = () => {
            emit('close');
        };
        const handleHelp = () => {
            emit('handleHelp');
        };
        const formData = reactive({});
        const formRef = ref(null);
        const tableRef = ref(null);
        const tableData = ref([]);
        const selection = ref([]);
        const chooseIndex = ref(null);
        const handleChoose = index => {
            chooseIndex.value = index;
            isVariableShow.value = true;
        };
        const isVariableShow = ref(false);
        const chooseArr = ref([]);
        // 弹窗回调
        const variableSelectCallBack = (str, val) => {
            isVariableShow.value = false;
            if (str == 'yes') {
                tableData.value[chooseIndex.value].VariableName = val.Name;
            }
        };
        const handleSelectionChange = val => {
            selection.value = val;
        };
        const add = () => {
            tableData.value.push({
                Id: '00000000-0000-0000-0000-000000000000',
                key: Date.now(),
                VariableName: ''
            });
        };
        const del = () => {
            selection.value.forEach(item => {
                const index = tableData.value.findIndex(
                    e => e.Id === item.Id || (item.key && e.key === item.key)
                );
                tableData.value.splice(index, 1);
            });
        };
        const validator = (val, callback) =>
            [undefined, ''].includes(val) ? callback($$t(`必填`)) : callback();
        const submit = () => {
            formRef.value.validate(async valid => {
                if (valid) {
                    const user =
                        JSON.parse(
                            sessionStorage.getItem('userInfo1') || '{}'
                        ) || {};
                    tableData.value.forEach(item => {
                        item.UpdateBy = user.SCMSUserName || 'Guest';
                    });
                    const strategy = {
                        1: async () => {
                            return await SPCConfigApi.InsertMany(
                                tableData.value
                            );
                        },
                        2: async () => {
                            return await SPCConfigApi.UpdateMany(
                                tableData.value
                            );
                        }
                    };
                    const res = await strategy[props.value.type]();
                    if (res.data.code === 0) {
                        Message.success($$t(`操作成功`));
                        handleClose();
                        emit('confirm');
                    }
                }
            });
        };

        return {
            formRef,
            tableRef,
            formData,
            tableData,

            open,
            handleHelp,
            handleClose,
            handleSelectionChange,
            add,
            del,
            validator,
            submit,
            handleChoose,
            isVariableShow,
            chooseArr,
            variableSelectCallBack
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
