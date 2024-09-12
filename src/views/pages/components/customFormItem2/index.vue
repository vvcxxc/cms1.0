<template>
    <div class="variable">
        <div class="variable--title" :style="{ width: width }" v-show="title">
            {{ title }}
        </div>
        <el-input
            :model-value="modelValue"
            v-bind="combineAttrs($attrs, $props)"
        >
            <template #append>
                <div
                    :class="[
                        'variable__icon',
                        isReadOnly ? 'variable__icon--disabled' : '',
                        $props.iconDisabled ? 'icon-disabled' : '',
                    ]"
                    @click="handleButtonClick"
                >
                    <span :class="['span-class']">选择</span>
                </div>
            </template>
        </el-input>
    </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import _ from 'lodash';

export default defineComponent({
    name: 'CustomFormItem2',
    props: {
        title: {
            type: String,
            default: '',
        },
        UUID: {
            type: String,
            default: '',
        },
        modelValue: {
            type: String,
            default: '',
        },
        config: {
            type: Object,
            default: () => ({}),
        },
        width: {
            type: String,
            default: '80px',
        },
        isReadOnly: {
            type: Boolean,
            default: false,
        },
        iconDisabled: {
            type: Boolean,
            default: false,
        },
    },
    setup(props, { emit }) {
        const handleButtonClick = async () => {
            if (props.isReadOnly) {
                return;
            }
            emit('handleClick');
        };

        const combineAttrs = (attrs, props, omitPropNames) => {
            const newObject = { ...attrs, ...props };
            return _.omit(newObject, omitPropNames);
        };

        return {
            combineAttrs,
            handleButtonClick,
        };
    },
});
</script>
<style lang="scss" scoped>
.variable {
    display: inline-flex;
    align-items: center;

    &--title {
        font-size: 14px;
        font-weight: bold;
        width: 80px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    &__icon {
        cursor: pointer;
        line-height: 1;
        font-size: 12px;
        padding: 8px 2px;
        color: #4c4e52;

        span {
            border: 1px solid var(--cs-border-color);
            border-radius: 2px;
        }

        &--disabled {
            cursor: not-allowed;
        }
    }

    :deep .cs-input__inner {
        height: 30px;
    }

    ::v-deep .cs-input__wrapper {
        border-right: none;
        box-shadow: none;
    }

    ::v-deep .cs-input-group__append {
        box-shadow: none;
        border: 1px solid var(--cs-border-color);
        border-left: none;
        position: relative;
        right: 1px;
        z-index: 2;
    }

    ::v-deep .cs-input-group__prepend {
        padding: 0 6px !important;
    }
}
.icon-disabled {
    cursor: no-drop;
}
</style>
