<!--
 * @Description: 这是排班页面（组件）
 * @Date: 2020-11-10 11:40:55
 * @Author: Tao
 * @LastEditors: Tao
 * @LastEditTime: 2021-04-08 11:29:32
-->
<template>
    <div class="Scheduling_box" ref="box">
        <div class="Scheduling_head" ref="head">
            <template v-if="isFrequencyShow">
                <div class="timeText left">
                    {{ lang.ProcessParameterReport_HT_Date }}
                </div>
                <div class="yearTime left">
                    <el-date-picker
                        v-model="dataTimeValue"
                        @change="dataTimeChange()"
                        @focus="getZoom()"
                        type="date"
                        :placeholder="lang.DatePickerTextBox_watermark"
                    >
                    </el-date-picker>
                </div>
                <!-- <div @click="switchFun()" class="monthBtn left">{{lang.ScheduleManage_Preview_Month_View}}</div> -->
                <div class="line left"></div>
                <div class="weeksText left">
                    {{ lang.DataGrid_Reaction_The }}
                </div>
                <div class="weeks left">
                    <div @click="upWeek()" class="up"></div>
                    <div class="weekText">{{ newWeek }}</div>
                    <div @click="downWeek()" class="down"></div>
                </div>
                <div class="weeksText2 left">
                    {{ lang.HMI_HT_LineChartWindowViewModel_Week }}
                </div>
                <div class="weeksTime left">
                    {{ weekStartTime }}-{{ weekendTime }}
                </div>
                <div @click="quoteFun()" class="quoteBtn left">
                    引用
                </div>
                <!-- <div class="line left"></div>
                 <div @click="importFun()" class="importBtn left">
                    {{ lang.ScheduleManage_Import }}
                </div>
                <div @click="exportFun()" class="exportBtn left">
                    {{ lang.AlarmRecord_HT_AlarmPointManageUC_Export }}
                </div> -->
                <div @click="setFun()" class="setBtn left">
                    设置
                </div>
            </template>
            <template v-if="isMonthlyViewShow" style="border: 1px solid blue">
                <div @click="headRetrun()" class="head_return left">
                    {{ lang.AlarmStatistics_AlarmStatisticsUserControl_Back }}
                </div>
                <div class="line left"></div>
                <div class="head_yueText left">
                    {{ lang.ScheduleManage_Month_View }}
                </div>
            </template>
        </div>

        <div class="Scheduling_middle">
            <Frequency ref="frequency" v-if="isFrequencyShow"></Frequency>
            <MonthlyView
                :setData="setData"
                v-if="isMonthlyViewShow"
            ></MonthlyView>
        </div>

        <!-- 弹窗组件 -->
        <setPop :setData="setData" v-if="isSetShow"></setPop>
        <importPop v-if="isImportShow"></importPop>
        <exportPop v-if="isExportShow"></exportPop>
        <TisPop
            :tipType="tipType"
            :tipText="tipText"
            :tipValue="tipValue"
            v-if="isTisShow"
        ></TisPop>
        <exportPdf
            ref="exportPdf"
            v-if="isExportPdfShow"
            :setData="setData"
        ></exportPdf>
        <div
            v-if="
                isSetShow ||
                    isImportShow ||
                    isExportShow ||
                    isTisShow ||
                    isExportPdfShow
            "
            class="box"
        ></div>
        <tip-pop
            v-if="isTipShow"
            :tipText="tipWord"
            :noCancel="noCancel"
            @tipCallBack="tipCallBack"
        ></tip-pop>
    </div>
</template>

<script>
import moment from 'moment'; //导入文件
import Frequency from './component/Frequency';
import MonthlyView from './component/MonthlyView';
import setPop from './component/setPop.vue';
import importPop from './component/importPop';
import exportPop from './component/exportPop';
import TisPop from './component/TisPop';
import exportPdf from './component/exportPdf';
import TipPop from '../../components/public/tipPop.vue';

export default {
    name: 'Scheduling',
    data() {
        return {
            isTipShow: false,
            tipWord: '',
            noCancel: true,
            isSetShow: false, //设置弹窗
            isImportShow: false, //导入弹窗
            isExportShow: false, //导出弹窗
            isFrequencyShow: true, //周班次
            isMonthlyViewShow: false, //月视图
            isExportPdfShow: false, //导出pdf
            isTisShow: false, //提示弹窗
            tipType: '2', //提示弹窗类型
            tipText:
                '引用会清除当前周的排班信息，确认引用第45周排班表到第52周？', //提示弹窗文本
            tipValue: '', //提示弹窗是谁的
            weekNum: 30,
            dataTimeValue: '', //日期值
            weekStartTime: null, //周开始日期
            weekendTime: null, //周结束日期
            newWeek: null, //当前选中的周数
            weekTime: null, //当前选中的周日期
            setData: {}, //样式设置弹窗
            refFirstDate: null,
            refLastDate: null,
            firstDate: null,
            lastDate: null,
            left: '',
            lang: JSON.parse(localStorage.getItem('languages'))[
                localStorage.getItem('currentLang')
            ],
            zoomValue: 1,
            jurisdiction: [],
            buttonarr: [],
            ysid: '',
            yyid: '',
            szid: '',
            ysshow: true,
            yyshow: true,
            szshow: true
        };
    },
    components: {
        Frequency, //周班次组件
        MonthlyView, //月视图组件
        setPop, //设置弹窗组件
        importPop, //导入数据弹窗组件
        exportPop, //导出组件
        TisPop, //提示弹窗组件
        exportPdf, //Pdf弹窗
        TipPop
    },
    created() {
        this.$nextTick(() => {
            // this.$refs.box.style.zoom = this.zoomValue
            this.$refs.head.style.zoom = this.zoomValue;
        });
        this.getLangData();
        this.dataTimeValue = moment().format('YYYY-MM-DD'); //初始化日期
        var newTime = moment().format();
        this.weekRange(newTime);
    },
    watch: {
        VpowerData(val) {
            this.getPower();
        }
    },
    computed: {
        VpowerData() {
            return this.$store.state.btnPowerData;
        }
    },
    mounted() {
        this.getPower();
    },
    methods: {
        getPower() {
            this.jurisdiction = this.$store.state.btnPowerData;
            this.buttonarr = this.findPathByLeafId(
                this.GetUrlParam('id'),
                this.jurisdiction
            )[0].Children;
            console.log(' this.buttonarr', this.buttonarr);
            this.buttonarr.forEach(item => {
                if (item.RightName == '排班管理-预览月视图') {
                    this.ysid = item.RightID;
                } else if (item.RightName == '排班管理-引用按钮') {
                    this.yyid = item.RightID;
                } else if (item.RightName == '排班管理-设置按钮') {
                    this.szid = item.RightID;
                }
            });
            var userid = '';
            if (!JSON.parse(sessionStorage.getItem('userInfo1'))) {
                userid = JSON.parse(sessionStorage.getItem('sightseerInfo1'))
                    .SCMSUserID;
            } else {
                userid = JSON.parse(sessionStorage.getItem('userInfo1'))
                    .SCMSUserID;
            }
            this.$axios({
                method: 'post',
                url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.ysid}`
            })
                .then(res => {
                    this.ysshow = res.data.data;
                })
                .catch(err => {
                    console.log('err', err);
                });
            this.$axios({
                method: 'post',
                url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.yyid}`
            })
                .then(res => {
                    this.yyshow = res.data.data;
                })
                .catch(err => {
                    console.log('err', err);
                });
            this.$axios({
                method: 'post',
                url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.szid}`
            })
                .then(res => {
                    this.szshow = res.data.data;
                })
                .catch(err => {
                    console.log('err', err);
                });
        },
        findPathByLeafId(id, node, path) {
            if (!path) {
                path = [];
            }
            for (let i = 0; i < node.length; i++) {
                var temPath = path.concat();

                if (id == node[i].RightID) {
                    temPath.push(node[i]);
                    return temPath;
                }
                if (node[i].Children) {
                    var findResult = this.findPathByLeafId(
                        id,
                        node[i].Children,
                        temPath
                    );
                    if (findResult) {
                        return findResult;
                    }
                }
            }
        },
        GetUrlParam(paraName) {
            let url = document.location.toString();
            let arrObj = url.split('?');
            if (arrObj.length > 1) {
                let arrPara = arrObj[1].split('&');
                let arr;
                for (let i = 0; i < arrPara.length; i++) {
                    arr = arrPara[i].split('=');
                    if (arr && arr[0] == paraName) {
                        return arr[1];
                    }
                }
                return '';
            } else {
                return '';
            }
        },

        getLangData() {
            let msg = this.lang.ScheduleManage_ReferenceConfirm;
            let firstL = msg.indexOf('{');
            let firstR = msg.indexOf('}') + 1;
            let lastL = msg.lastIndexOf('{');
            let lastR = msg.lastIndexOf('}') + 1;
            let str1 = msg.slice(firstL, firstR);
            let str2 = msg.slice(lastL, lastR);
            msg = msg.replace(str1, `<45>`);
            msg = msg.replace(str2, `<52>`);
            this.tipText = msg;
        },
        getZoom() {
            var $this = this;
            this.$nextTick(() => {
                let dates = [
                    ...document.querySelectorAll(
                        '.el-picker-panel.el-date-picker'
                    )
                ];
                dates.forEach(item => {
                    item.style.zoom = $this.zoomValue;
                });
            });
        },
        //获取周开始日期和结束日期
        weekRange(time) {
            this.weekTime = time;
            this.newWeek = moment(time).format('WW'); //当前周
            var neewWeekYear = moment(time).format('YYYY'); //当前周的年
            var neewWeekMM = moment(time).format('MM'); //当前周的月
            if (neewWeekMM == '01') {
                //跨年
                let nextYear = moment(neewWeekYear)
                    .add(-1, 'y')
                    .format('YYYY');
                let endyyyy = moment(nextYear)
                    .endOf('year')
                    .format('YYYY-MM-DD');
                let endww = moment(endyyyy).format('WW');
                if (this.newWeek == endww) {
                    this.weekendTime = moment()
                        .day('Monday')
                        .year(nextYear)
                        .week(this.newWeek)
                        .format('YYYY/MM/DD'); //周数结束时间
                    let weekOfday = moment(this.weekendTime).format('E'); //判断是周的第几天
                    this.weekendTime = moment(this.weekendTime)
                        .add(7 - weekOfday, 'days')
                        .format('YYYY/MM/DD');
                } else {
                    this.weekendTime = moment()
                        .day('Monday')
                        .year(neewWeekYear)
                        .week(this.newWeek)
                        .format('YYYY/MM/DD'); //周数结束时间
                    let weekOfday = moment(this.weekendTime).format('E'); //判断是周的第几天
                    this.weekendTime = moment(this.weekendTime)
                        .add(7 - weekOfday, 'days')
                        .format('YYYY/MM/DD');
                    this.weekStartTime = moment(this.weekendTime)
                        .subtract(6, 'days')
                        .format('YYYY/MM/DD'); //周数开始时间
                }
            } else {
                this.weekendTime = moment()
                    .day('Monday')
                    .year(neewWeekYear)
                    .week(this.newWeek)
                    .format('YYYY/MM/DD'); //周数结束时间
                let weekOfday = moment(this.weekendTime).format('E'); //判断是周的第几天
                this.weekendTime = moment(this.weekendTime)
                    .add(7 - weekOfday, 'days')
                    .format('YYYY/MM/DD');
                this.weekStartTime = moment(this.weekendTime)
                    .subtract(6, 'days')
                    .format('YYYY/MM/DD'); //周数开始时间
            }
        },
        //选择日期改周
        dataTimeChange() {
            if (this.dataTimeValue != null) {
                var time = moment(this.dataTimeValue).format('YYYY-MM-DD');
                this.$refs.frequency.FiveWeek(time);
            }
        },
        //设置组件 修改成功重新刷新班次组件页面
        tipFn(str) {
            this.tipText = str;
            this.tipType = '1';
            this.isTisShow = true;
        },
        initFrequency() {
            this.$refs.frequency.againInit();
        },
        //给设置弹窗初始化赋值
        colorSize(data) {
            this.setData = data;
        },
        //切换到月视图
        switchFun() {
            this.isMonthlyViewShow = true;
            this.isFrequencyShow = false;
        },
        //切换班次
        headRetrun() {
            this.isMonthlyViewShow = false;
            this.isFrequencyShow = true;
        },
        tipCallBack(str) {
            this.isTipShow = false;
            this.noCancel = true;
        },
        //引用
        quoteFun() {
            if (!this.yyshow) {
                this.isTipShow = true;
                this.tipWord = `该用户没有权限操作`;
                return;
            }
            var a = this.$refs.frequency.newTimeFun();
            this.refFirstDate = this.weekStartTime;
            this.refLastDate = this.weekendTime;
            this.firstDate = a.firstTime;
            this.lastDate = a.lastTime;
            console.log('a', a);
            var afterWeek = moment(this.refLastDate).format('WW'); //当前周
            var beforWeek = moment(this.lastDate).format('WW'); //当前周
            var newTimeWeek = moment(this.refLastDate).format('ww');
            var newTimeYYYY = moment(this.refLastDate).format('YYYY');
            var clickTimeWeek = moment(this.lastDate).format('ww');
            var clickTimeYYYY = moment(this.lastDate).format('YYYY');
            if (Number(clickTimeYYYY) < Number(newTimeYYYY)) {
                this.Pshow(
                    this.lang.SCMSConsoleWebApiMySql_CannotReferencePastWeeks,
                    '1'
                );
                return;
            } else if (Number(clickTimeYYYY) == Number(newTimeYYYY)) {
                if (Number(clickTimeWeek) < Number(newTimeWeek)) {
                    this.Pshow(
                        this.lang
                            .SCMSConsoleWebApiMySql_CannotReferencePastWeeks,
                        '1'
                    );
                    return;
                } else if (Number(clickTimeWeek) == Number(newTimeWeek)) {
                    console.log(clickTimeWeek, newTimeWeek);
                    var weekEndTime = moment()
                        .day('Monday')
                        .year(clickTimeYYYY)
                        .week(clickTimeWeek)
                        .format('YYYY/MM/DD'); //周数结束时间
                    var weekStartTime = moment(weekEndTime)
                        .subtract(6, 'days')
                        .format('DD'); //周数开始时间
                    var newTimeDD = moment().format('DD');
                    console.log(weekStartTime, newTimeDD);
                    if (weekStartTime != newTimeDD) {
                        this.Pshow('引用周为当前周，无需引用', '1');
                        return;
                    }
                }
            }
            if (this.refFirstDate == this.firstDate) {
                this.Pshow(this.lang.ScheduleManage_ReferenceInvalid, '1');
            } else {
                let msg = this.lang.ScheduleManage_ReferenceConfirm;
                let firstL = msg.indexOf('{');
                let firstR = msg.indexOf('}') + 1;
                let lastL = msg.lastIndexOf('{');
                let lastR = msg.lastIndexOf('}') + 1;
                let str1 = msg.slice(firstL, firstR);
                let str2 = msg.slice(lastL, lastR);
                msg = msg.replace(str1, `<${afterWeek}>`);
                msg = msg.replace(str2, `<${beforWeek}>`);

                this.Pshow(
                    /* `引用会清除当前周的排班信息，确认引用第${afterWeek}周排班表到第${beforWeek}周？` */ msg,
                    '2',
                    '引用周'
                );
            }
        },
        //引用周成功 重新刷新班次组件
        quoterAxios() {
            this.$axios({
                method: 'get',
                url: `/api/class/RefClass?refFirstDate=${this.refFirstDate}&refLastDate=${this.refLastDate}&firstDate=${this.firstDate}&lastDate=${this.lastDate}`,
                refFirstDate: this.refFirstDate,
                refLastDate: this.refLastDate,
                firstDate: this.firstDate,
                lastDate: this.lastDate
            })
                .then(res => {
                    if (res.data.code == 1) {
                        this.Pshow(res.data.msg, '1');
                        this.$refs.frequency.FiveWeek(this.lastDate);
                    } else {
                        this.Pshow(res.data.msg, '1');
                        this.$refs.frequency.FiveWeek(this.lastDate);
                    }
                })
                .catch(err => {
                    console.log('err', err);
                });
        },
        //导入
        importFun() {
            this.isImportShow = true;
        },
        //导出
        exportFun() {
            this.isExportShow = true;
        },
        //点击导出pdf
        exportPdfFun() {
            this.isExportPdfShow = true;
        },
        //点击设置
        setFun() {
            if (!this.szshow) {
                this.isTipShow = true;
                this.tipWord = `该用户没有权限操作`;
                return;
            }
            this.isSetShow = true;
        },
        //下一周
        downWeek() {
            var nextWeek = moment(this.weekTime)
                .add(-1, 'w')
                .format(); //上一周
            this.weekRange(nextWeek);
        },
        //上一周
        upWeek() {
            var nextWeek = moment(this.weekTime)
                .add(1, 'w')
                .format(); //下一周
            this.weekRange(nextWeek);
        },
        //关闭弹窗
        cancelFun(text) {
            if (text == '模板失败') {
                this.isTisShow = false;
            } else {
                this.isTisShow = false;
                this.isSetShow = false;
                this.isImportShow = false;
                this.isExportShow = false;
                this.isExportPdfShow = false;
            }
        },
        //提示弹窗
        Pshow(text, type, tt) {
            this.tipText = text;
            this.tipType = type;
            this.isTisShow = true;
            this.tipValue = tt;
        }
    }
};
</script>
<style lang="scss">
.Scheduling_box {
    .Scheduling_head {
        display: flex;
        .el-date-editor.el-input {
            width: 100%;
            height: 100%;
        }
        .el-input__inner {
            height: 30px !important;
            line-height: 30px !important;
        }
        .el-input__icon {
            line-height: 30px !important;
        }
    }
}
</style>
<style lang="scss" scoped>
@import '../../assets/style/ScheduleMange/Scheduling';
</style>
