<!--
 * @Description: 搜索框组件
 * @Date: 2019-11-24 14:57:05
 * @Author: 随风
 * @LastEditors: 随风
 * @LastEditTime: 2019-11-29 16:34:35
 -->
<template>
    <div class="search-container" :class="{ colordiv: $store.state.color == 'grey' }"
        :style="{lineHeight: 40*zoom+'px',height: 60*zoom+'px'}">
        <div class="search-left" :style="[{ fontSize: 16 * zoom + 'px' }]">
            <div class="search-item" v-for="(item, index) in searchList" :key="index">
                <div class="title" :class="{ mr10: item.title == '至' }" v-if="item.type !== 'key'">{{ item.title }}
                </div>
                <el-select v-if="item.type === 'select'" clearable filterable v-model="searchData[item.model]"
                    class="search-select" @change="change(item, $event)">
                    <!-- <el-option label="全部" value="全部"></el-option> -->
                    <el-option v-for="(options, optionsIndex) in item.optionList" :key="optionsIndex"
                        :label="item.label ? options[item.label] : options"
                        :value="item.value ? options[item.value] : options"></el-option>
                </el-select>
                <el-date-picker v-if="item.type === 'time'" v-model="searchData[item.model]" type="datetime"
                    :placeholder="lang.SCMSConsoleWebApiMySql_PleChooseDate" default-time="12:00:00"
                    value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
                <!-- <span>-</span> -->
                <el-date-picker v-if="item.type === 'datetimerange'" v-model="searchData[item.model]"
                    type="datetimerange" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期"
                    value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
                <el-input v-if="item.type === 'key'" v-model="searchData[item.model]"
                    :placeholder="item.placeholder || lang.AlarmRecord_Time_Keyword" clearable></el-input>

            </div>
            <div class="btn pointer importtant" :style="[{ fontSize: 16 * zoom + 'px' },
            { height: 40 * zoom + 'px' },
            { width: 100 * zoom + 'px' },
            { left: 1110 * zoom + 'px' },
            { lineHeight: 40 * zoom + 'px' }
            ]" :id='cxid' @click="search">{{ lang.AlarmStatistics_AlarmStatisticsUserControl_Query }}</div>

            <div class="edit" :style="[{ fontSize: 16 * zoom + 'px' },
            { height: 40 * zoom + 'px' },
            { width: 100 * zoom + 'px' },
            { right: 120 * zoom + 'px' },
            { lineHeight: 40 * zoom + 'px' }
            ]" @click="xdEditProduct">修改</div>
            <div class="cencle" :style="[{ fontSize: 16 * zoom + 'px' },
            { height: 40 * zoom + 'px' },
            { width: 100 * zoom + 'px' },
            { right: 10 * zoom + 'px' },
            { lineHeight: 40 * zoom + 'px' }
            ]" @click="xdDelProduct">删除</div>

        </div>
        <div>
        </div>

    </div>
</template>

<script>
export default {
    props: ['searchList', 'searchData'],
    data() {
        return {
            zoom: 1,
            zoom1: 1,
            lang: JSON.parse(localStorage.getItem('languages'))[localStorage.getItem('currentLang')]
        };
    },
    watch: {

    },

    computed: {
        VpowerData() {
            return this.$store.state.btnPowerData;
        },
    },
    mounted() {
        this.zoom = 1;
        this.zoom1 = window.screen.width / 1920 < 0.8 ? 0.8 : window.screen.width / 1920
        setTimeout(() => {
            $(".search-item").css({ marginLeft: 10 * this.zoom, height: 40 * this.zoom })
            $(".search-select").css({ width: 160 * this.zoom, height: 40 * this.zoom })
            $(".el-input--suffix").css({ fontSize: 16 * this.zoom, height: 40 * this.zoom })

            if (window.screen.width <= 1280) {
                $(".search-item .title").css({ maxWidth: '80px', lineHeight: 1 })
            }
        })

    },
    methods: {
        getZoom() {
            let that = this
            setTimeout(() => {
                for (let i = 0; i < $('.el-picker-panel').length; i++) {
                    $('.el-picker-panel')[i].style.zoom = that.zoom1
                }
                for (let i = 0; i < $('.el-select-dropdown').length; i++) {
                    $('.el-select-dropdown')[i].style.zoom = that.zoom1
                }
            })

        },
        search() {
            this.searchData.argAlarmGroupId = this.searchData.aArrayName;
            this.$emit('setParams', this.searchData);
        },

        change(item, e) {
            this.searchData.argAlarmGroupId = this.searchData.aArrayName;
            if (
                item.model === 'argAlarmArray' ||
                item.model === 'aArrayName'
            ) {
                this.$emit('change', e);
            }
        },
        xdEditProduct() { this.$emit('xdEditProduct'); },
        xdDelProduct() { this.$emit('xdDelProduct'); },
    },

};
</script>

<style lang="scss" scoped>
%flex {
    display: flex;
    align-items: center;
}

.search-container {
    @extend %flex;
    justify-content: space-between;
    background-color: #ddd;
    width: 100%;
    position: relative;
}

span {
    position: absolute;
    left: 315px;
}

.importtant {
    right: 230px;
    position: absolute;
}

.search-left {
    @extend %flex;
    flex-wrap: wrap;

    .search-item {
        @extend %flex;

        // margin: 10px;
        // margin-bottom: 0;
        .mr10 {
            margin-right: 10px;
        }

        .title {
            line-height: 1;
            padding-right: 8px;
            // word-break: break-all;
        }
    }

    .btn {
        @extend %flex;
        justify-content: center;
        width: 120px;
        height: 40px;
        line-height: initial;
        background-color: #4270e4;
        border-radius: 4px;
        color: #fff;
        font-weight: 600;
    }
}

.add {
    position: absolute;
    border: 1px solid #46BE05;
    background-color: #ffffff;
    width: 120px;
    height: 38px;
    display: block;
    border-radius: 4px;
    text-align: center;
    line-height: 38px;
    cursor: pointer;
    color: #46BE05;
}

.edit {
    position: absolute;
    border: 1px solid #FDAE22;
    background-color: #ffffff;
    width: 120px;
    height: 38px;
    display: block;
    border-radius: 4px;
    text-align: center;
    line-height: 38px;
    cursor: pointer;
    color: #FDAE22;
}

.cencle {
    position: absolute;
    background-color: #AAAAAA;
    width: 120px;
    height: 38px;
    display: block;
    border-radius: 4px;
    text-align: center;
    line-height: 38px;
    cursor: pointer;
    float: left;
    margin-left: 10px;
    color: #fff;
}

.fr {
    width: 260px;
    height: 100%;
}

.el-select {
    width: 180px;
}

.colordiv {
    background-color: #D9DBDE;
}
</style>
