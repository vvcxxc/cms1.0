<template>
    <div class="root">
        <div class="select-text">窑炉选择：</div>
        <el-select
            v-model="value"
            placeholder="请选择"
            :popper-append-to-body="false"
        >
            <el-option
                v-for="item in selectList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            >
            </el-option>
        </el-select>
        <el-button class="select-btn" @click="select">查询</el-button>
    </div>
</template>
<script>
export default {
    data() {
        return {
            value: 1,
            selectList: [
                {
                    label: '窑炉1',
                    value: 1,
                },
                {
                    label: '窑炉2',
                    value: 2,
                },
                {
                    label: '窑炉3',
                    value: 3,
                },
                {
                    label: '窑炉4',
                    value: 4,
                },
                {
                    label: '窑炉5',
                    value: 5,
                },
                {
                    label: '窑炉6',
                    value: 6,
                },
                {
                    label: '窑炉7',
                    value: 7,
                },
                {
                    label: '窑炉8',
                    value: 8,
                },
                {
                    label: '窑炉9',
                    value: 9,
                },
                {
                    label: '窑炉10',
                    value: 10,
                },
                {
                    label: '窑炉11',
                    value: 11,
                },
                {
                    label: '窑炉12',
                    value: 12,
                },
            ],
        };
    },
    created() {
        this.$axios({
            method: 'get',
            url: '/api/TechnologicalProcess/GetKilnsTypesList',
        }).then((res) => {
            this.selectList = res.data.data.map((item) => ({
                label: item.Name,
                value: item.Id,
            }));
            this.value = this.selectList[0].value;
        });
    },
    methods: {
        select() {
            this.$emit('select', this.value);
        },
    },
};
</script>

<style lang="scss" scoped>
.root {
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 60px;
    .select-text {
        font-size: 16px;
        font-weight: 400;
        color: #e4e4e4;
        margin-left: 20px;
        margin-right: 6px;
    }
    ::v-deep .el-input__inner {
        border-radius: 0;
        height: 36px;
        line-height: 36px;
        width: 174px;
        background: #1d2846;
        border: 1px solid #445992 !important;
        font-size: 16px;
        color: #c6cad8;
    }
    ::v-deep .el-input__icon {
        line-height: 36px;
    }
    ::v-deep .el-select-dropdown {
        background-color: #1d2846;
        border: 1px solid #445992;
    }
    ::v-deep .el-select-dropdown__item {
        font-size: 16px;
        color: #c6cad8;
    }
    ::v-deep .el-select-dropdown__item.hover,
    .el-select-dropdown__item:hover {
        background-color: #2a3a65;
    }
    ::v-deep .el-select-dropdown__item.selected {
        font-size: 16px;
        font-weight: 400;
        color: #409eff;
    }
    ::v-deep .el-popper[x-placement^='bottom'] .popper__arrow::after {
        border-bottom-color: #1d2846;
    }
    ::v-deep .el-select-dropdown .el-select-dropdown__item {
        border-bottom: 0 !important;
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
}
</style>