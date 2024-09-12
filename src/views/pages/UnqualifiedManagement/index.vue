<template>
    <div ref="menuRef" class="UnqualifiedManagement">
        <aside
            class="left-container"
            :class="{ colorDiv: $store.state.color == 'grey' }"
            :style="[{ width: 200 + 'px' }]"
        >
            <left-nav @tabComponent="tabComponent"></left-nav>
        </aside>

        <section
            class="QualityMain_wrap"
            :style="{ width: `calc(100% - 200px)` }"
        >
            <component :is="componentName"></component>
        </section>
    </div>
</template>

<script>
import { defineComponent, ref } from '@vue/composition-api';
import JudgmentRecord from './pages/JudgmentRecord.vue';
import ToDoUnqualified from './pages/ToDoUnqualified.vue';
import { useMenuHeight } from '../hooks/use-menu-height';
import LeftNav from '../../../components/leftNav/LeftNav.vue';

export default defineComponent({
    name: 'UnqualifiedManagement',
    components: { ToDoUnqualified, JudgmentRecord, LeftNav },
    setup() {
        const componentName = ref('ToDoUnqualified');
        const { menuRef } = useMenuHeight();

        const tabComponent = index => {
            let componentObj = {
                0: ToDoUnqualified,
                1: JudgmentRecord
            };
            componentName.value = componentObj[index];
        };

        return { componentName, tabComponent, menuRef };
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
.UnqualifiedManagement {
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
