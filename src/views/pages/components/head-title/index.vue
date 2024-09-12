<template>
    <div class="head-title">
        <span>{{ title }}</span>
    </div>
</template>
  
<script lang="ts">
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
    name: 'HeadTitle',

    props: {
        title: {
            type: String,
            default: '',
        },
    },

    setup() {
        return {};
    },
});
</script>
    
<style lang="scss" scoped>
.head-title {
    width: 100%;
    display: flex;
    border-left: 3px solid #386df0;

    span {
        font-size: 18px;
        margin-left: 6px;
        color: #386df0;
    }
}
</style>