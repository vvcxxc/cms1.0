<!--
 * @Description: 这是周班次页面（组件）
 * @Date: 2020-11-19 09:15:19
 * @Author: Tao
 * @LastEditors: Tao
 * @LastEditTime: 2021-03-02 09:22:11
-->
<template>
    <div class="Frequency_box">
        <div class="frequency_head" ref="head">
            <div @click="leftDownFun()" class="head_left left">
                <i class="el-icon-arrow-left head_icon"></i>
            </div>
            <div
                class="head_week left"
                @click="weekClick($event, item)"
                v-for="(item, index) in timeArr"
                :key="index"
            >
                <div :class="index == 2 ? 'weekActive' : ''" class="week_text">
                    {{ item.week
                    }}{{ lang.HMI_HT_LineChartWindowViewModel_Week }}
                </div>
                <div :class="index == 2 ? 'weekActive' : ''" class="week_time">
                    {{ item.startTime }}-{{ item.endTime }}
                </div>
            </div>
            <div @click="rightDownFun()" class="head_right left">
                <i class="el-icon-arrow-right head_icon"></i>
            </div>
        </div>
        <div class="frequency_middle">
            <div class="middle_head">
                <div class="middle_head_text left">
                    <div class="head_text1">
                        <div
                            class="head_textValue left"
                            v-for="(ite, ind) in weekTimeDay"
                            :key="ind"
                        >
                            {{ ite }}
                        </div>
                    </div>
                    <div class="head_text2">
                        <div class="head_textValue left">
                            {{ lang.ScheduleManage_MondayLong }}
                        </div>
                        <div class="head_textValue left">
                            {{ lang.ScheduleManage_TuesdayLong }}
                        </div>
                        <div class="head_textValue left">
                            {{ lang.ScheduleManage_WednesdayLong }}
                        </div>
                        <div class="head_textValue left">
                            {{ lang.ScheduleManage_ThursdayLong }}
                        </div>
                        <div class="head_textValue left">
                            {{ lang.ScheduleManage_FridayLong }}
                        </div>
                        <div class="head_textValue left">
                            {{ lang.ScheduleManage_SaturdayLong }}
                        </div>
                        <div class="head_textValue left">
                            {{ lang.ScheduleManage_SundayLong }}
                        </div>
                    </div>
                </div>
            </div>
            <div class="middle_conter">
                <div
                    v-for="(ite, ind) in weekTimeDay"
                    :key="ind"
                    class="conter-item"
                >
                    <div
                        v-for="(item, idx) in weekDataList[ind]"
                        :key="idx"
                        class="conter-shift"
                        :style="{
                            background: compareDateShiftNow(ite, item)
                                ? '#81d3f8'
                                : compareDateShiftprev(ite, item)
                                ? '#ededed'
                                : compareDateBeforeToday(ite)
                                ? '#fff'
                                : '#ededed'
                        }"
                    >
                        <div class="shift-team">
                            <div class="team-name">
                                <div class="name">
                                    {{ item.Class ? item.Class.sName : '' }}
                                </div>
                                <!-- <div class="after">A1</div> -->
                            </div>
                            <div class="team-shift">
                                {{ item.Shift ? item.Shift.sCategory : '' }}
                            </div>
                        </div>
                        <div class="shift-time">
                            <div class="dur">
                                {{ item.Shift ? item.Shift.Time : '' }}
                            </div>
                            <div class="hour">
                                {{ item.Shift ? item.Shift.Duration : '' }}
                            </div>
                        </div>
                        <div class="shift-action">
                            <div
                                class="edit"
                                :style="{
                                    color: compareDateShiftNow(ite, item)
                                        ? '#02a7f0' //可以编辑不能删除
                                        : compareDateShiftprev(ite, item)
                                        ? '#ccc'
                                        : compareDateBeforeToday(ite)
                                        ? '#02a7f0'
                                        : '#ccc'
                                }"
                                @click="openShiftPop('编辑排班', ite, item)"
                            >
                                编辑
                            </div>
                            <div
                                class="edit"
                                @click="delShift(ite, item)"
                                :style="{
                                    color: compareDateShiftNow(ite, item)
                                        ? '#ccc' //可以编辑不能删除
                                        : compareDateShiftprev(ite, item)
                                        ? '#ccc'
                                        : compareDateBeforeToday(ite)
                                        ? '#02a7f0'
                                        : '#ccc'
                                }"
                            >
                                删除
                            </div>
                            <div
                                class="edit"
                                @click="openShiftPop('查看排班', ite, item)"
                            >
                                查看
                            </div>
                        </div>
                    </div>
                    <div
                        class="add-shift"
                        v-if="compareDateBeforeToday(ite)"
                        @click="openShiftPop('添加排班', ite)"
                    >
                        添加排班
                    </div>
                </div>
            </div>
        </div>
        <TeamShiftPop
            v-if="shiftPopShow"
            :date="shiftPopDate"
            :title="shiftPopTitle"
            :selectItem="shiftPopSelectItem"
            @callback="shiftPopCallback"
        />
        <tip-pop
            v-if="isTipShow"
            :tipText="tipText"
            :noCancel="noCancel"
            @tipCallBack="tipCallBack"
        ></tip-pop>
    </div>
</template>
<script>
import moment from 'moment'; //导入文件
import TeamShiftPop from './TeamShiftPop.vue';
import TipPop from '../../../components/public/tipPop.vue';

export default {
    components: {
        TipPop,
        TeamShiftPop
    },
    data() {
        return {
            fontColor: '',
            fontSize: 16,
            isTipShow: false,
            tipText: '',
            noCancel: true,
            shiftPopShow: false,
            shiftPopDate: '',
            shiftPopTitle: '',
            shiftPopSelectItem: null,
            weekData: [], //当前周的数据
            timeArr: [], //当前五周
            weekTime: null, //当前选中周的时间(上俩周或下周的点)
            newWeekTime: null, //当前点击选中的周
            weekTimeDay: [], //当前选中周的天arr
            operateValue: false,
            lang: JSON.parse(localStorage.getItem('languages'))[
                localStorage.getItem('currentLang')
            ],
            zoomValue: 0,
            firstTime: '',
            lastTime: ''
        };
    },
    created() {
        this.$nextTick(() => {
            this.zoomValue =
                Number(parseFloat(window.screen.width / 1920).toFixed(2)) <= 0.8
                    ? 0.8
                    : Number(parseFloat(window.screen.width / 1920).toFixed(2));
            this.$refs.head.style.zoom = this.zoomValue;
        });
        //初始化当前五周
        var newTime = moment().format();
        this.FiveWeek(newTime);
    },
    computed: {
        weekDataList() {
            if (this.weekData) {
                return [
                    this.weekData.MonSchedule || [],
                    this.weekData.TuesSchedule || [],
                    this.weekData.WedSchedule || [],
                    this.weekData.ThurSchedule || [],
                    this.weekData.FriSchedule || [],
                    this.weekData.SatSchedule || [],
                    this.weekData.SunSchedule || []
                ];
            } else {
                return [[], [], [], [], [], [], []];
            }
        }
    },
    methods: {
        tipCallBack(str) {
            this.isTipShow = false;

            this.noCancel = true;
            if (str == 'yes') {
                this.$axios({
                    method: 'post',
                    url: `api/Class/Delete/${this.delItem.Id}`
                }).then(res => {
                    if (res.data.code == 0) {
                        this.isTipShow = true;
                        this.tipText = '删除成功！';
                        this.againInit();
                    } else {
                        this.isTipShow = true;
                        this.tipText = res.data.msg;
                    }
                });
            }
            this.delItem = null;
        },
        delShift(ite, item) {
            if (
                this.compareDateShiftNow(ite, item) ||
                this.compareDateShiftprev(ite, item) ||
                !this.compareDateBeforeToday(ite)
            ) {
                return;
            }
            console.log('item', item);
            this.delItem = item;
            this.isTipShow = true;
            this.noCancel = false;
            this.tipText = `是否确认删除选中排班？`;
        },
        openShiftPop(t, d, r) {
            console.log(t, d, r);
            if (
                t == '编辑排班' &&
                (this.compareDateShiftprev(d, r) ||
                    !this.compareDateBeforeToday(d))
            ) {
                return;
            }
            console.log('weekData', this.weekData);
            this.shiftPopShow = true;
            this.shiftPopDate = d;
            this.shiftPopTitle = t;
            this.shiftPopSelectItem = r;
        },
        shiftPopCallback(r) {
            if (r) {
                this.isTipShow = true;
                this.tipText = r;
            }
            this.shiftPopShow = false;
            this.shiftPopTitle = '';
            this.shiftPopSelectItem = null;
            this.againInit();
        },
        //重新请求
        againInit() {
            this.gatData(true);
        },
        //父组件引用周需知道当前选中的是第几周
        newTimeFun() {
            return this.newWeekTime;
        },
        //将字体颜色大小，班次颜色赋予弹窗
        colorSize(data) {
            this.$parent.colorSize(data);
        },
        //点击icon 上一周
        leftDownFun() {
            var beforWeek = moment(this.weekTime)
                .add(-2, 'w')
                .format();
            this.FiveWeek(beforWeek);
        },
        //点击icon 下一周
        rightDownFun() {
            var nextWeek = moment(this.weekTime)
                .add(2, 'w')
                .format(); //下下一周
            this.FiveWeek(nextWeek);
        },
        //请求班组  判断该班组是否存在
        teamAxions() {
            return new Promise((resolve, reject) => {
                var teamArr = [];
                this.$axios({
                    method: 'get',
                    url: `/api/class/query?key=`
                }).then(res => {
                    for (let i = 0; i < res.data.data.length; i++) {
                        teamArr.push(res.data.data[i].sId);
                    }
                    resolve(teamArr);
                });
            });
        },
        //计算第几周第几年
        weekFun(dataTime, num) {
            var beforWeek2 = moment(dataTime)
                .add(num, 'w')
                .format('WW'); //周
            var beforWeek2Year = moment(dataTime)
                .add(num, 'w')
                .format('YYYY'); //年
            var beforWeek2MM = moment(dataTime)
                .add(num, 'w')
                .format('MM'); //月
            var value = {};
            if (beforWeek2MM == '01') {
                //跨年
                let nextYear = moment(beforWeek2Year)
                    .add(-1, 'y')
                    .format('YYYY');
                let endyyyy = moment(nextYear)
                    .endOf('year')
                    .format('YYYY-MM-DD');
                let endww = moment(endyyyy).format('WW');
                if (endww == beforWeek2) {
                    return (value = {
                        year: nextYear,
                        week: beforWeek2
                    });
                } else {
                    return (value = {
                        year: beforWeek2Year,
                        week: beforWeek2
                    });
                }
            } else {
                return (value = {
                    year: beforWeek2Year,
                    week: beforWeek2
                });
            }
        },
        //初始化当前5周并请求数据
        FiveWeek(dataTime) {
            this.removeDomFun('color');
            this.weekTime = dataTime;
            this.timeArr = [];
            var value = {};
            value = this.weekFun(dataTime, -2);
            this.timeArr.push(value);
            value = this.weekFun(dataTime, -1);
            this.timeArr.push(value);
            value = this.weekFun(dataTime, 0);
            this.timeArr.push(value);
            value = this.weekFun(dataTime, 1);
            this.timeArr.push(value);
            value = this.weekFun(dataTime, 2);
            this.timeArr.push(value);
            for (let i = 0; i < this.timeArr.length; i++) {
                var weekEndTime = moment()
                    .day('Monday')
                    .year(this.timeArr[i].year)
                    .week(this.timeArr[i].week)
                    .format('YYYY/MM/DD'); //周数结束时间
                var weekOfday = moment(weekEndTime).format('E'); //判断是周的第几天
                weekEndTime = moment(weekEndTime)
                    .add(7 - weekOfday, 'days')
                    .format('YYYY/MM/DD');
                var weekStartTime = moment(weekEndTime)
                    .subtract(6, 'days')
                    .format('YYYY/MM/DD'); //周数开始时间
                this.timeArr[i].startTime = weekStartTime;
                this.timeArr[i].endTime = weekEndTime;
            }
            this.weekInit(this.timeArr[2].startTime, this.timeArr[2].endTime);
        },
        //初始化当前班组数据
        weekInit(firstTime, lastTime) {
            this.newWeekTime = {
                lastTime: lastTime,
                firstTime: firstTime
            };
            this.operateValue;
            var newTimeWeek = moment().format('ww');
            var newTimeYYYY = moment().format('YYYY');
            var clickTimeWeek = moment(lastTime).format('ww');
            var clickTimeYYYY = moment(lastTime).format('YYYY');
            if (Number(clickTimeYYYY) > Number(newTimeYYYY)) {
                this.operateValue = false;
            } else if (Number(clickTimeYYYY) == Number(newTimeYYYY)) {
                if (Number(clickTimeWeek) >= Number(newTimeWeek)) {
                    this.operateValue = false;
                } else {
                    this.operateValue = true;
                }
            } else if (Number(clickTimeYYYY) < Number(newTimeYYYY)) {
                this.operateValue = true;
            }
            this.weekTimeDay = [];
            for (let i = 6; i >= 0; i--) {
                var time = moment(lastTime)
                    .subtract(i, 'days')
                    .format('YYYY MM/DD');
                var item = moment(lastTime)
                    .subtract(i, 'days')
                    .format('YYYY-MM-DD');
                this.weekTimeDay.push(time);
            }
            var showCss;
            if (
                Number(clickTimeYYYY) == Number(newTimeYYYY) &&
                Number(clickTimeYYYY) == Number(newTimeYYYY)
            ) {
                showCss = true;
            } else {
                showCss = false;
            }

            this.firstTime = firstTime;
            this.lastTime = lastTime;
            this.gatData();
        },
        gatData(b) {
            this.$axios({
                method: 'get',
                url: `/api/class/GetClass?firstTime=${this.firstTime}&lastTime=${this.lastTime}`,
                firstTime: this.firstTime,
                lastTime: this.lastTime
            })
                .then(res => {
                    this.weekData = res.data.data.scheduleShowModels;
                    this.fontColor = res.data.data.fontColor;
                    this.fontSize = res.data.data.fontSize;
                })
                .catch(function(err) {
                    console.log('err', err);
                });
        },
        //头部周点击
        weekClick(e, item) {
            this.removeDomFun('noColor');
            //选择计划高亮        --样式
            let path = e.path || (e.composedPath && e.composedPath());
            var className = path[0].getAttribute('class');
            if (className == 'head_week left') {
                path[0].querySelector('.week_text').classList.add('weekActive');
                path[0].querySelector('.week_time').classList.add('weekActive');
            } else if (className == 'week_text') {
                path[0].classList.add('weekActive');
                path[0].parentNode
                    .querySelector('.week_time')
                    .classList.add('weekActive');
            } else {
                path[0].classList.add('weekActive');
                path[0].parentNode
                    .querySelector('.week_text')
                    .classList.add('weekActive');
            }
            this.weekInit(item.startTime, item.endTime);
        },

        //默认清除高亮
        removeDomFun(text) {
            var textdom = document.querySelectorAll('.week_text');
            var timedom = document.querySelectorAll('.week_time');
            for (let i = 0; i < textdom.length; i++) {
                if (text == 'color') {
                    if (i != 2) {
                        textdom[i].classList.remove('weekActive');
                        timedom[i].classList.remove('weekActive');
                    } else {
                        textdom[i].classList.add('weekActive');
                        timedom[i].classList.add('weekActive');
                    }
                } else {
                    textdom[i].classList.remove('weekActive');
                    timedom[i].classList.remove('weekActive');
                }
            }
        },
        //今天的班次
        compareDateBeforeToday(item) {
            var time1 = moment(item).format('YYYYMMDD');
            var time2 = moment().format('YYYYMMDD');
            return time1 >= time2;
        },
        //今天，当前班次
        compareDateShiftNow(da, item) {
            var time1 = moment(da).format('YYYYMMDD');
            var time2 = moment().format('YYYYMMDD');
            if (time1 == time2) {
                let st = item.Shift.Time.split('-')[0];
                let ed = item.Shift.Time.split('-')[1];
                if (item.Shift.Type == '当天') {
                    if (
                        moment().format('HH:mm') > st &&
                        moment().format('HH:mm') < ed
                    ) {
                        return true;
                    } else {
                        return false;
                    }
                } else {
                    if (moment().format('HH:mm') > st) {
                        return true;
                    } else {
                        return false;
                    }
                }
            } else {
                return false;
            }
        },
        //今天，已经过去班次
        compareDateShiftprev(da, item) {
            var time1 = moment(da).format('YYYYMMDD');
            var time2 = moment().format('YYYYMMDD');
            if (time1 == time2) {
                let st = item.Shift.Time.split('-')[0];
                let ed = item.Shift.Time.split('-')[1];
                if (item.Shift.Type == '当天') {
                    if (moment().format('HH:mm') > ed) {
                        return true;
                    } else {
                        return false;
                    }
                } else {
                    return false;
                }
            } else {
                return false;
            }
        }
    }
};
</script>
<style lang="scss">
.Frequency_box {
    .frequency_middle {
        .el-select {
            width: 100%;
        }
        .el-input--suffix .el-input__inner {
            border-radius: 0px;
            height: 155px !important;
            width: 100% !important;
            text-align: center !important;
        }
        .el-input__suffix-inner {
            display: none;
        }
    }
}
</style>
<style lang="scss" scoped>
@import '../../../assets/style/ScheduleMange/Frequency';
</style>
