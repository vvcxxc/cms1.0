<!--
 * @Description: 报警管理
 * @Date: 2019-11-23 11:54:01
 * @Author: 随风
 * @LastEditors: 随风
 * @LastEditTime: 2019-11-27 14:53:55
 -->
<template>
    <div class="alarm-container">
        <aside
            class="left-container"
            :class="{ colordiv: $store.state.color == 'grey' }"
        >
            <left-nav @tabComponent="tabComponent"></left-nav>
        </aside>
        <section class="content-container">
            <component :is="componentName"></component>
        </section>
    </div>
</template>

<script>
import LeftNav from '../../components/leftNav/LeftNav.vue';
import Agency from '../../components/Vulnerableparts/Agency.vue';
import plan from '../../components/Vulnerableparts/plan.vue';
export default {
    components: {
        LeftNav,
        Agency,
        plan
    },
    data() {
        return {
            componentName: 'Agency',
            width: 1920
        };
    },
    created() {},
    mounted() {
        this.width = window.screen.width;
    },
    methods: {
        tabComponent(index) {
            let componentObj = {
                0: Agency,
                1: plan
            };
            this.componentName = componentObj[index];
        }
    }
};
</script>

<style lang="scss" scoped>
.alarm-container {
    // width: 100%;
    // height: 100%;
    // flex: 1;
    height: 100vh;
    overflow: hidden;
    color: #000;
    display: flex;
    background-color: #eee;
    padding: 100px 10px 30px;
    box-sizing: border-box;
}
aside {
    // width: 20%;
    width: 200px;
    height: 100%;
    background-color: #e9eeef;
    box-sizing: border-box;
    // border: 1px solid #e4e4e4;
}
.content-container {
    width: calc(100% - 200px);
    // width: 80%;
    background-color: #fff;
    border: 1px solid #e4e4e4;
    border-left: none;
}
.colordiv {
    background-color: #d9dbde;
}
</style>
