<template>
    <div class="root flex">
        <div class="flex">
            <div class="select-text">查询时间：</div>
            <el-date-picker
                :key="
                    $store.state.color === 'blackBlue'
                        ? 'blackBlueBg'
                        : 'normal'
                "
                :popper-class="
                    $store.state.color === 'blackBlue'
                        ? 'blackBlueBg'
                        : 'normal'
                "
                :clearable="false"
                v-model="date"
                type="month"
                placeholder="请选择时间"
                :style="{ width: 200 + 'px' }"
                value-format="yyyy-MM"
            ></el-date-picker>
            <el-button class="select-btn" @click="select">查询</el-button>
        </div>
        <div class="flex">
            <button class="btns" @click="handleEvent('dyyl')">打印预览</button>
            <button class="btns" @click="handleEvent('bgdy')">报表打印</button>
            <button class="btns export-btn" @click="handleEvent('dc')">
                导出
            </button>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        let myDate = new Date();
        let year = myDate.getFullYear();
        let month = myDate.getMonth() + 1;
        month = month < 10 ? '0' + month : month;
        let time = year + '-' + month;
        return {
            date: time,
        };
    },
    methods: {
        select() {
            this.$emit('select', { date: this.date });
        },
        handleEvent(str) {
            this.$emit('handleEvent', str);
        },
    },
};
</script>

<style lang="scss" scoped>
.root {
    justify-content: space-between;
    height: 60px;

    .select-text {
        font-size: 16px;
        font-weight: 400;
        color: #e4e4e4;
        margin-left: 20px;
        margin-right: 6px;
    }

    .select-btn {
        width: 120px;
        height: 40px;
        line-height: 0;
        background: #386df0;
        border-radius: 4px;
        color: #ffffff;
        font-size: 16px;
        font-weight: bold;
        margin-left: 10px;
        border: 0;
    }

    .btns {
        width: 120px;
        height: 36px;
        line-height: 36px;
        border: 2px solid #46be05;
        border-radius: 4px;
        font-size: 16px;
        font-weight: bold;
        color: #46be05;
        background: #0b1530;
        margin-left: 10px;
        cursor: pointer;
    }

    .export-btn {
        border-color: #fda100;
        color: #fda100;
        margin-right: 22px;
    }

    ::v-deep .el-icon-date:before {
        content: '\E71F';
    }
}

.flex {
    display: flex;
    flex-direction: row;
    align-items: center;
}
</style>