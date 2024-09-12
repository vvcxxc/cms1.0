<template>
    <div class="currentTitlePage">
        <div class="boundary"></div>
        <span>{{ title }}</span>
        <div v-if="line" class="line"></div>
    </div>
</template>

<script>
export default {
    props: ['title','line'],
    data() {
        return {};
    },
};
</script>

<style lang="scss" scoped>
.currentTitlePage {
    width: 100%;
    height: 30px;
    line-height: 30px;
    color: #386df0;
    font-weight: 500;
    font-size: 20px;
    display: flex;
    position: relative;

    .boundary {
        width: 3px;
        height: 30px;
        background: #386df0;
        margin-right: 5px;
    }

    .line {
        width: calc(100% - 110px);
        position: absolute;
        right: 0;
        top: 50%;
        height: 1px;
        background-color: #DDDDDD;
    }
}
</style>