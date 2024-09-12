<template>
    <Dialog
        v-model="$props.visible"
        :title="'判定登录'"
        width="400px"
        :show-close="false"
        :append-to-body="true"
        :confirmText="'登 录'"
        @close="submit('close')"
        @confirm="submit('confirm')"
    >
        <el-form ref="loginRef" inline :model="form" :rules="rules">
            <el-form-item prop="username" :label="`账号`">
                <el-input v-model="form.username"></el-input>
            </el-form-item>
            <el-form-item prop="password" :label="`密码`">
                <el-input type="password" v-model="form.password"></el-input>
            </el-form-item>
        </el-form>
    </Dialog>
</template>

<script>
import { defineComponent, ref } from '@vue/composition-api';
import Dialog from '@/views/pages/components/BaseDialog/index.vue';

export default defineComponent({
    props: {
        visible: Boolean
    },
    components: {
        Dialog
    },
    emits: ['confirm', 'cancel'],
    setup(props, { emit }) {
        const loginRef = ref(null);
        const rules = {
            username: {
                required: true,
                message: '请输入账号',
                trigger: 'blur'
            },
            password: {
                required: true,
                message: '请输入密码',
                trigger: 'blur'
            }
        };
        const form = ref({
            username: '',
            password: ''
        });
        const submit = type => {
            ({
                confirm: () => {
                    loginRef.value.validate(valid => {
                        if (valid) {
                            emit('confirm', form.value);
                            loginRef.value.resetFields();
                        }
                    });
                },
                close: () => {
                    emit('cancel');
                    loginRef.value.resetFields();
                }
            }[type]());
        };
        return {
            loginRef,
            rules,
            form,
            submit
        };
    }
});
</script>
