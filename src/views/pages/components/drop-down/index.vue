<template>
    <div>
        <el-dropdown @command="handleCommand">
            <span>
                <slot />
            </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item
                    v-for="item in options"
                    :key="item.value"
                    :command="item"
                    v-bind="item"
                >
                    {{ item.label }}
                </el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
    </div>
</template>
<script lang="ts">
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
    name: 'DropDown',
    props: {
        prop: {
            type: String,
            default: '',
            required: true,
        },
        options: {
            type: Array,
            default: () => [],
        },
    },
    setup(props, ctx) {
        const handleCommand = (item) => {
            ctx.emit('onCommand', {
                key: props.prop,
                data: item,
            });
        };

        return { handleCommand };
    },
});
</script>
<style lang="scss" scoped>
</style>
