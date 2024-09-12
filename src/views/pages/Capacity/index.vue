<template>
    <div ref="menuRef" class="Capacity">
        <section :style="{ width: `calc(100%)` }">
            <component :is="componentName"></component>
        </section>
    </div>
</template>

<script>
import { defineComponent, ref } from '@vue/composition-api';
import CapacityReport from './pages/CapacityReport';
import { useMenuHeight } from '../hooks/use-menu-height';

export default defineComponent({
    name: 'Capacity',
    components: { CapacityReport },
    setup() {
        const componentName = ref('CapacityReport');
        const { menuRef } = useMenuHeight();

        return { componentName, menuRef };
    }
});
</script>
<style lang="scss" scoped>
.left-container {
    min-width: 120px;
}

aside {
    width: 200px;
    height: 100%;
    background-color: #e9eeef;
    box-sizing: border-box;
    flex-shrink: 0;
}
.content-container {
    background-color: #fff;
    border: 1px solid #e4e4e4;
    border-left: none;
    width: 100%;
    overflow: auto;
}
.colorDiv {
    background-color: #d9dbde !important;
}
.Capacity {
    color: #000;
    margin-top: 100px;
    display: flex;
    background-color: #eee;
    padding: 20px 10px;
    box-sizing: border-box;
}
.no_permission {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
