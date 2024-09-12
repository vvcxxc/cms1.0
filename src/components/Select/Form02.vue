<template>
    <div class="root">
        <div class="flex title2 texts">
            <div class="left-text">项目</div>
            <div class="right-text">故障时间/min</div>
        </div>
        <div
            v-for="(item, index) in listData"
            :key="index"
            class="flex texts"
            :style="{
                color: '#9AA3BE',
                background: (index + 1) % 2 == 0 ? '#0E1732' : '#121C3A',
            }"
        >
            <div class="left-text">{{ item.label }}</div>
            <div v-if="!flag" class="right-text">
                {{ item.value }}
            </div>
            <el-input v-else v-model="item.value" @input="handleChange" />
        </div>
    </div>
</template>

<script>
export default {
    props: ['list', 'flag'],
    data() {
        return {
            listData: [],
        };
    },
    watch: {
        list() {
            this.listData = [...this.list];
        },
    },
    created() {
        this.listData = [...this.list];
    },
    methods: {
        handleChange(val) {
            this.$emit('handleChange', this.listData);
        },
    },
};
</script>

<style lang="scss" scoped>
.root {
    .flex {
        display: flex;
        flex-direction: row;
    }

    ::v-deep .el-input__inner {
        border: 0 !important;
        border-bottom: 1px solid #1d2b55 !important;
        border-radius: 0;
        padding: 0;
        text-align: center;
        background: transparent;
        font-size: 16px;
        color: #9aa3be;
    }

    .texts {
        height: 40px;
        line-height: 40px;
        text-align: center;
        color: #ffffff;
        border-bottom: 1px solid #1d2b55;
    }

    .title2 {
        background: #18314e;
    }

    .left-text {
        width: 117px;
        flex: none;
        border-right: 1px solid #304171;
    }
    .right-text {
        flex: 1;
        text-align: center;
    }
}
</style>