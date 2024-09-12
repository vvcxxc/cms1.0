<template>
    <BaseDialog
        :title="$$t(`权限验证`)"
        v-model="visible"
        width="400px"
        :show-close="false"
        @open="open"
        append-to-body
    >
        <el-form
            size="medium"
            :model="formData"
            ref="formRef"
            label-width="60px"
            :rules="rules"
        >
            <el-form-item :label="$$t('账号')" prop="account">
                <el-input v-model="formData.account" />
            </el-form-item>
            <el-form-item :label="$$t('密码')" prop="password">
                <el-input type="password" v-model="formData.password" />
            </el-form-item>
        </el-form>
        <template #footer>
            <div class="footer">
                <el-button type="info" @click="handleClose">{{
                    $$t(`取消`)
                }}</el-button>
                <el-button type="primary" @click="submit">{{
                    $$t(`确定`)
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
import { SPCAnalysisApi } from '../api';
import store from '@/store';

export default defineComponent({
    name: 'ValidDialog',
    components: {
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
            if (formRef.value) formRef.value.resetFields();
        };
        const handleClose = () => {
            visible.value = false;
            emit('close');
        };
        const formData = ref({});
        const formRef = ref(null);
        const rules = {
            account: {
                required: true,
                message: $$t('请输入账号'),
                trigger: 'blur'
            },
            password: {
                required: true,
                message: $$t('请输入密码'),
                trigger: 'blur'
            }
        };
        const submit = () => {
            formRef.value.validate(async valid => {
                if (valid) {
                    const res = await SPCAnalysisApi.CheckPower(formData.value);
                    if (res.data.code === 0) {
                        handleClose();
                        emit('confirm');
                    }
                }
            });
        };

        return {
            visible,
            formRef,
            rules,
            formData,

            open,
            handleClose,
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
