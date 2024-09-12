<template>
    <div class="root flex">
        <div class="flex">
            <div class="select-text">消耗选择：</div>
            <el-select
                v-model="value"
                placeholder="请选择"
                :style="{ width: 174 + 'px' }"
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
            <div class="select-text">查询时间：</div>
            <el-date-picker
                v-if="type === 'month'"
                v-model="date2"
                type="month"
                placeholder="请选择时间"
                value-format="yyyy-MM"
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
            >
            </el-date-picker>
            <el-date-picker
                v-else
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
                type="date"
                placeholder="请选择时间"
                :style="{ width: 200 + 'px' }"
                value-format="yyyy-MM-dd"
            ></el-date-picker>
            <el-button class="select-btn" @click="select">查询</el-button>
        </div>
        <div class="flex">
            <button class="btns" @click="handleEvent('dyyl')">打印预览</button>
            <button class="btns" @click="handleEvent('bgdy')">报表打印</button>
            <button v-show="flag" class="btns" @click="handleEvent('bgbc')">
                报表保存
            </button>
            <button class="btns export-btn" @click="exportTable">导出</button>
        </div>
    </div>
</template>

<script>
export default {
    props: ['flag', 'type'],
    data() {
        let myDate = new Date();
        let year = myDate.getFullYear();
        let month = myDate.getMonth() + 1;
        month = month < 10 ? '0' + month : month;
        let time2 = year + ' ' + month;
        let time = this.$getDate(
            new Date(new Date().toLocaleDateString()).getTime()
        );
        return {
            value: '',
            date2: time2,
            date: time,
            selectList: [],
        };
    },
    created() {
        this.$axios({
            method: 'get',
            url: '/api/EnergyConsumptionReport/GetEnergyTypesList',
        }).then((res) => {
            this.selectList = res.data.data.map((item) => ({
                label: item.Name,
                value: item.Id,
            }));
            this.value = this.selectList.length ? this.selectList[0].value : '';
        });
    },
    methods: {
        select() {
            const obj = {
                label: this.selectList.length
                    ? this.selectList.filter(
                          (item) => item.value == this.value
                      )[0].label
                    : '氮气',
                value: this.value,
                date: this.type === 'month' ? this.date2 : this.date,
            };
            this.$emit('select', obj);
        },
        handleEvent(str) {
            this.$emit('handleEvent', str);
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