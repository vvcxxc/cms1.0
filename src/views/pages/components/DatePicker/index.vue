<template>
    <div class="date-picker-component">
        <el-date-picker
            popper-class="light-datetime-picker"
            style="width: 200px;"
            v-bind="$attrs"
        ></el-date-picker>
    </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
export default defineComponent({
    components: {}
});
</script>
<style lang="scss">
.light-datetime-picker {
    .el-input__inner {
        background: #fff !important;
        box-shadow: 0 0 0 1px
            var(--el-input-border-color, var(--el-border-color)) inset !important;
    }
    .el-input.is-disabled .el-input__inner {
        background: var(--el-disabled-bg-color) !important;
    }

    &.el-popper.is-light {
        max-width: inherit !important;
        background-color: #fff !important;
        color: #000 !important;
        .el-popper__arrow:before {
            background-color: #fff !important;
        }
    }
}
</style>
<style lang="scss" scoped>
.date-picker-component {
    :deep(.el-input__inner) {
        color: var(
            --el-input-text-color,
            var(--el-text-color-regular)
        ) !important;
    }
}
</style>
