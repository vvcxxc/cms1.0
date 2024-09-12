<template>
    <div class="root flex">
        <div class="flex">
            <div class="select-text">窑炉选择：</div>
            <el-select v-model="value" placeholder="请选择" :style="{ width: 174 + 'px' }" :popper-append-to-body="false">
                <el-option v-for="item in selectList" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
            </el-select>
            <div class="select-text">查询时间：</div>
            <el-date-picker :key="
                $store.state.color === 'blackBlue'
                    ? 'blackBlueBg'
                    : 'normal'
            " :popper-class="
                    $store.state.color === 'blackBlue'
                        ? 'blackBlueBg'
                        : 'normal'
                " :clearable="false" v-model="date" type="date" placeholder="请选择时间" :style="{ width: 200 + 'px' }"
                value-format="yyyy-MM-dd"></el-date-picker>
            <el-button class="select-btn" @click="select">查询</el-button>
        </div>
        <div class="flex">
            <button class="btns export-btn" @click="exportTable">导出</button>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        let time = this.$getDate(
            new Date(new Date().toLocaleDateString()).getTime()
        );
        return {
            value: 1,
            date: time,
            selectList: [
            ],
        };
    },
    created() {
        this.$axios({
            method: 'get',
            url: '/api/MainWindowData/GetKilnList',
        }).then((res) => {
            this.selectList = res.data.data.map((item) => ({
                label: item.Name,
                value: item.Id,
                KType: item.KType,
            }));
            this.value = this.selectList[0].value;
        });
    },
    methods: {
        select() {
            let KType = this.selectList.find(_ => _.value == this.value).KType
            const obj = {
                value: this.value,
                date: this.date,
                KType
            };
            this.$emit('select', obj);
        },
        exportTable() {
            this.$emit('exportTable');
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

    ::v-deep .el-input__inner {
        border-radius: 0;
        height: 36px;
        line-height: 36px;
        // width: 174px;
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
}

.flex {
    display: flex;
    flex-direction: row;
    align-items: center;
}
</style>