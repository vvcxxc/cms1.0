<!--
 * @Description: 这是排班管理页面模块（组件）
 * @Date: 2020-11-27 10:07:43
 * @Author: Tao
 * @LastEditors: Tao
 * @LastEditTime: 2021-03-01 14:37:36
-->
<template>
    <div class="scheduleMange_box float">
        <div class="scheduleMange_left left" ref="left">
            <div
                @click="pageClick('1')"
                :class="
                    scheduling == 1
                        ? 'scheduleMange_left_box active'
                        : 'scheduleMange_left_box'
                "
            >
                {{ lang.ScheduleManage_Scheduling_Management }}
            </div>
            <div
                @click="pageClick('2')"
                :class="
                    scheduling == 2
                        ? 'scheduleMange_left_box active'
                        : 'scheduleMange_left_box'
                "
            >
                {{ lang.ScheduleManage_Team_Management }}
            </div>
            <div
                @click="pageClick('3')"
                :class="
                    scheduling == 3
                        ? 'scheduleMange_left_box active'
                        : 'scheduleMange_left_box'
                "
            >
                班次管理
            </div>
        </div>
        <div class="scheduleMange_right left" ref="right">
            <scheduling v-if="scheduling == 1"></scheduling>
            <team v-if="scheduling == 2"></team>
            <shift v-if="scheduling == 3"></shift>
        </div>
    </div>
</template>
<script>
import scheduling from './Scheduling.vue';
import team from './Team';
import shift from './Shift';

export default {
    components: {
        scheduling,
        team,
        shift
    },
    data() {
        return {
            scheduling: 1,
            lang: JSON.parse(localStorage.getItem('languages'))[
                localStorage.getItem('currentLang')
            ],
            zoomValue: 1
        };
    },
    created() {
        this.$nextTick(() => {
            this.$refs.left.style.zoom = this.zoomValue;
        });
    },
    methods: {
        pageClick(text) {
            this.scheduling = text;
        }
    }
};
</script>
<style lang="scss" scoped>
.scheduleMange_box {
    position: relative;
    width: calc(100% - 20px);
    height: calc(100% - 130px);
    margin: auto;
    margin-top: 100px;
    .left {
        float: left;
    }
    .float:after {
        content: '';
        display: block;
        height: 0;
        clear: both;
        visibility: hidden;
    }
    .float {
        zoom: 1;
    }
    .scheduleMange_left {
        width: 210px;
        height: 100%;
        background: #e9eeef;
        border: 1px solid #e9eeef;
        .scheduleMange_left_box {
            width: 210px;
            height: 50px;
            background: #e9eeee;
            border: 1px solid #e4e4e4;
            border-top: none;
            border-left: none;
            font-size: 18px;
            font-family: Source Han Sans CN;
            font-weight: 400;
            color: #666666;
            padding-left: 30px;
            line-height: 50px;
            cursor: pointer;
            user-select: none;
            position: relative;
        }
        .active {
            background: #fff;
            font-size: 18px;
            font-family: Source Han Sans CN;
            font-weight: 400;
            color: #4270e4;
        }
        .active::before {
            content: '';
            position: absolute;
            left: 0;
            top: 0;
            width: 5px;
            height: 100%;
            background: #4270e4;
        }
    }
    .scheduleMange_right {
        width: calc(100% - 210px);
        height: 100%;
    }
}
</style>
