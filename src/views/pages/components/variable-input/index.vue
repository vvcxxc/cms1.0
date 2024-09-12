<template>
    <div style="height: 36px; line-height: 36px">
        <div class="component">
            <el-input
                v-model="variableValue"
                size="medium"
                :disabled="disabled"
                :placeholder="$$t(`请选择`)"
                v-bind="inputAttr"
            />
            <div class="component-img" @click="openVariable">
                <span class="img"></span>
            </div>
        </div>
        <VariableSelect
            v-if="isVariableShow"
            v-bind="variableAttr"
            @variableSelectCallBack="callback"
        />
    </div>
</template>
<script>
import { defineComponent, ref, computed } from '@vue/composition-api';
import VariableSelect from '@/views/pages/dialog/variable-select.vue';

export default defineComponent({
components: { VariableSelect },
    props: {
        value: {
            type: String,
            default: '',
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        inputAttr: {
            type: Object,
            default: () => ({}),
        },
        variableAttr: {
            type: Object,
            default: () => ({}),
        },
    },
    setup(props, ctx) {
        const isVariableShow = ref(false);

        const variableValue = computed({
            get: () => {
                return props.value;
            },
            set: (v) => {
                ctx.emit('input', v);
            },
        });
        const openVariable = () => {
            if (!props.disabled) isVariableShow.value = true;
        };
        const callback = (str, val) => {
            isVariableShow.value = false;

            if (str === 'yes') {
                variableValue.value = val.Name;
            }
        };
        return { variableValue, isVariableShow, openVariable, callback };
    },
});
</script>
<style lang="scss" scoped>
.component {
    display: flex;
    &-img {
        width: 36px;
        height: 36px;
        background: #f2f2f2;
        position: relative;
        top: 1px;
        flex-shrink: 0;

        span {
            position: absolute;
            top: 8px;
            left: 6px;
            width: 20px;
            height: 20px;
            cursor: pointer;
            background-size: 100% 100%;
            background-image: url('../../../../assets/images/pages/variable-normal.png');
            z-index: 1;
        }

        &:hover {
            span {
                background-image: url('../../../../assets/images/pages/variable-hover.png');
            }
        }
    }
}
</style>