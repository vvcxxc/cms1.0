<!--
 * @Description: 这是时间控件页面（组件）
 * @Date: 2019-11-18 15:00:18
 * @Author: Tao
 * @LastEditors: Tao
 * @LastEditTime: 2021-02-05 18:13:56
 -->
<template>
    <div>
        <div
            class="time DateTimePicker28a"
            v-for="(item, index) in dataValue"
            :key="index"
        >
            <div
                @mouseup="upFun(item, $event)"
                @mousedown="downFun(item, $event)"
                @dblclick="opendb(item)"
                @contextmenu.prevent
                name="DateTimePicker"
                :class="item.class"
                :style="
                    'position:absolute; left:' +
                    item.left +
                    'px; top:' +
                    item.top +
                    'px; boxSizing:border-box; text-align:center;line-height:' +
                    (item.height - 1) +
                    'px; width:' +
                    item.width +
                    'px; height:' +
                    item.height +
                    'px;' +
                    ';opacity:' +
                    item.opacity +
                    'overflow:hidden;zIndex:' +
                    (Number(item.ZIndex) + 1) +
                    ';border:' +
                    item.borderColor +
                    ' ' +
                    item.BorderThickness +
                    'px solid;background:' +
                    item.backColor +
                    ';transform:rotate(' +
                    item.rotate +
                    'deg);boxShadow:' +
                    item.Shadow
                     + `;${item.showBorder ? `border: ${item.BorderThickness}px solid ${item.borderStyle}` : `padding: ${item.BorderThickness}px`}`
                "
            >
                <el-date-picker
                    v-if="show"
                    :time-arrow-control="false"
                    :disabled="item.disabled"
                    :class="item.class + 'picker'"
                    @change="DateTimeFun(item)"
                    @click.native="ClickTimeFun(item)"
                    :style="
                        'text-align:center;width:100%; height:100%;' +
                        ';opacity:' +
                        item.opacity +
                        'overflow:hidden;zIndex:' +
                        item.ZIndex
                    "
                    v-model="item.value"
                    type="datetime"
                    :placeholder="lang.SCMSConsoleWebApiMySql_PleChooseDate"
                    default-time="12:00:00"
                ></el-date-picker>
            </div>
        </div>

        <!-- <div v-show="commerPopShow1" style="width:100%;height:100%;position:fixed;z-index:2147483647">
            <div v-if="commerPopShow1" class="commerPop_outPop">
            <div class="commerPop_outHead">
                <i class="warning el-icon-warning"></i>
                <span class="text">提示</span>
            </div>
            <div class="commerPop_conter">该账户无操作权限</div>
            <div class="commerPop_btn">
                <div class="commerPop_yes" @click="Jurisdiction()" style="width:310px;margin-left:25px">确定</div>
            </div>
            </div>
        </div> -->
    </div>
</template>

<script>
import moment from 'moment'; //导入文件
export default {
    data() {
        return {
            textblockData: [],
            dataValue: [],
            show: false,
            value3: '',
            commerPopShow1: false,
            ZIndex: '',
            lang: JSON.parse(localStorage.getItem('languages'))[
                localStorage.getItem('currentLang')
            ],
        };
    },
    props: ['dae', 'dataId'],
    watch: {
        dae: {
            deep: true,
            handler(val) {
                this.data = val;
                if (val) {
                    this.init();
                }
            },
        },
    },
    mounted() {
        this.data = this.dae;
        this.Name = 'associatedatetimepicker';
        if (this.data) {
            this.init();
            this.TimeValueFun();
        }
    },
    methods: {
        init() {
            //数据筛选
            this.textblockData = [];
            var dataAll = this.data.Controls.ControlList;
            for (var i = 0; i < dataAll.length; i++) {
                if (dataAll[i].ControlType == this.Name) {
                    this.textblockData.push(dataAll[i]);
                }
            }
            if (this.textblockData.length != 0) {
                this.show = true;
            } else {
                this.show = false;
            }
            //赋值
            if (this.show) {
                this.gitValue();
            }
        },
        //权限接口请求
        jurisdictionShow(item) {
            return new Promise((resolve, reject) => {
                var userinfoID;
                if (JSON.parse(sessionStorage.getItem('userInfo1')) == null) {
                    userinfoID = JSON.parse(
                        sessionStorage.getItem('sightseerInfo1')
                    ).SCMSUserID;
                } else {
                    userinfoID = JSON.parse(
                        sessionStorage.getItem('userInfo1')
                    ).SCMSUserID;
                }
                var argChildMenuID = this.dataId;
                var elementName = item.class;
                this.$axios({
                    //权限配置请求接口
                    method: 'post',
                    url: `/api/UserManage/UserManage_CanExcuteAuthorityControl?argUserID=${userinfoID}&argChildMenuID=${argChildMenuID}&argElementName=${elementName}`,
                    argUserID: userinfoID,
                    argChildMenuID: argChildMenuID,
                    argElementName: elementName,
                }).then((res) => {
                    if (res.data.data.CanExcute == 0) {
                        this.CanExcuteShow = true;
                        resolve('成功了');
                    } else {
                        this.CanExcuteShow = false;
                        resolve('成功了');
                    }
                });
            });
        },
        //鼠标按下事件
        downFun(item, e) {
            var self = this;
            var EventScriptList = this.data.Data.EventScriptList;
            var EventType = [];
            var EventType1 = [];
            var Typearr = [];
            for (var i = 0; i < EventScriptList.length; i++) {
                if (
                    item.class == EventScriptList[i].ElementName &&
                    EventScriptList[i].EventType == 'MouseLeftButtonDown'
                ) {
                    EventType.push(EventScriptList[i]);
                } else if (
                    item.class == EventScriptList[i].ElementName &&
                    EventScriptList[i].EventType == 'MouseRightButtonDown'
                ) {
                    EventType1.push(EventScriptList[i]);
                }
            }
            if (e.which == 1) {
                //鼠标左键按下
                if (EventType.length) {
                    self.jurisdictionShow(item).then((val) => {
                        if (self.CanExcuteShow) {
                            // self.commerPopShow1 = true
                            self.$emit(
                                'showtip',
                                self.lang.NoOperationAuthority
                            );
                            return;
                        } else {
                            for (var j = 0; j < EventType.length; j++) {
                                Typearr.push(EventType[j].Script);
                            }
                            self.$parent.scriptData(
                                Typearr,
                                '',
                                '',
                                '',
                                '',
                                ''
                            );
                        }
                    });
                }
            } else if (e.which == 3) {
                //鼠标右键按下
                if (EventType1.length) {
                    self.jurisdictionShow(item).then((val) => {
                        if (self.CanExcuteShow) {
                            // self.commerPopShow1 = true
                            self.$emit(
                                'showtip',
                                self.lang.NoOperationAuthority
                            );
                            return;
                        } else {
                            for (var j1 = 0; j1 < EventType1.length; j1++) {
                                Typearr.push(EventType1[j1].Script);
                            }
                            self.$parent.scriptData(
                                Typearr,
                                '',
                                '',
                                '',
                                '',
                                ''
                            );
                        }
                    });
                }
            }
        },

        opendb(item) {
            //鼠标双击
            setTimeout(() => {
                var EventScriptList = this.data.Data.EventScriptList;
                var EventType = [];
                var Typearr = [];
                for (var i = 0; i < EventScriptList.length; i++) {
                    if (
                        item.class == EventScriptList[i].ElementName &&
                        EventScriptList[i].EventType == 'MouseDoubleClick'
                    ) {
                        EventType.push(EventScriptList[i]);
                    }
                }
                if (EventType.length) {
                    this.jurisdictionShow(item).then((val) => {
                        if (this.CanExcuteShow) {
                            //    this.commerPopShow1 = true
                            this.$emit(
                                'showtip',
                                this.lang.NoOperationAuthority
                            );
                            return;
                        } else {
                            for (var j = 0; j < EventType.length; j++) {
                                Typearr.push(EventType[j].Script);
                            }
                            this.$parent.scriptData(
                                Typearr,
                                '',
                                '',
                                '',
                                '',
                                ''
                            );
                        }
                    });
                }
            }, 200);
        },

        upFun(item, e) {
            //鼠标抬起
            //脚本事件
            clearTimeout(this.timeoutID);
            var self = this;
            var EventScriptList = this.data.Data.EventScriptList;
            var EventType = [];
            var EventType1 = [];
            var Typearr = [];
            for (var i = 0; i < EventScriptList.length; i++) {
                if (
                    item.class == EventScriptList[i].ElementName &&
                    EventScriptList[i].EventType == 'MouseLeftButtonUp'
                ) {
                    EventType.push(EventScriptList[i]);
                } else if (
                    item.class == EventScriptList[i].ElementName &&
                    EventScriptList[i].EventType == 'MouseRightButtonUp'
                ) {
                    EventType1.push(EventScriptList[i]);
                }
            }
            this.timeoutID = window.setTimeout(function () {
                if (e.which == 1) {
                    //鼠标左键松开
                    if (EventType.length) {
                        self.jurisdictionShow(item).then((val) => {
                            if (self.CanExcuteShow) {
                                // self.commerPopShow1 = true
                                self.$emit(
                                    'showtip',
                                    self.lang.NoOperationAuthority
                                );
                                return;
                            } else {
                                for (var j = 0; j < EventType.length; j++) {
                                    Typearr.push(EventType[j].Script);
                                }
                                self.$parent.scriptData(
                                    Typearr,
                                    '',
                                    '',
                                    '',
                                    '',
                                    ''
                                );
                            }
                        });
                    }
                } else if (e.which == 3) {
                    //鼠标右键松开
                    if (EventType1.length) {
                        self.jurisdictionShow(item).then((val) => {
                            if (self.CanExcuteShow) {
                                //   self.commerPopShow1 = true
                                self.$emit(
                                    'showtip',
                                    self.lang.NoOperationAuthority
                                );
                                return;
                            } else {
                                for (var j1 = 0; j1 < EventType1.length; j1++) {
                                    Typearr.push(EventType1[j1].Script);
                                }
                                self.$parent.scriptData(
                                    Typearr,
                                    '',
                                    '',
                                    '',
                                    '',
                                    ''
                                );
                            }
                        });
                    }
                }
            }, 200);
        },
        //所有值
        TimeValueFun() {
            let timeData = [];
            for (let i = 0; i < this.dataValue.length; i++) {
                var value = {
                    name: this.dataValue[i].class,
                    value: this.dataValue[i].value,
                };
                timeData.push(value);
            }
            return timeData;
        },

        //初始化值
        timeInit(arr) {
            for (let i = 0; i < this.dataValue.length; i++) {
                let index = arr.indexOf(this.dataValue[i].class);
                if (index != -1) {
                    this.TimePickerListFun(
                        this.data.Data.AssociateDateTimePickerList,
                        this.dataValue[i].class
                    );
                    this.dataValue[i].value = this.resultTime;
                }
            }
        },

        //时间赋值方法
        TimePickerListFun(AssociateDateTimePickerList, className) {
            for (let f = 0; f < AssociateDateTimePickerList.length; f++) {
                if (AssociateDateTimePickerList[f].ElementName == className) {
                    let time1;
                    if (
                        AssociateDateTimePickerList[f].InitialTime == '当前时刻'
                    ) {
                        time1 = moment().format('YYYY-MM-DD HH:mm:ss');
                        this.BeforeTimeFun(
                            time1,
                            AssociateDateTimePickerList[f]
                        );
                    } else if (
                        AssociateDateTimePickerList[f].InitialTime == '当前小时'
                    ) {
                        time1 = moment().format('YYYY-MM-DD HH:00:00');
                        this.BeforeTimeFun(
                            time1,
                            AssociateDateTimePickerList[f]
                        );
                    } else if (
                        AssociateDateTimePickerList[f].InitialTime == '当前日期'
                    ) {
                        time1 = moment().format('YYYY-MM-DD 00:00:00');
                        this.BeforeTimeFun(
                            time1,
                            AssociateDateTimePickerList[f]
                        );
                    } else if (
                        AssociateDateTimePickerList[f].InitialTime == '当前周'
                    ) {
                        var newDa = moment().format('YYYY-MM-DD 00:00:00');
                        var date = moment(newDa);
                        var dow = date.day();
                        time1 = date
                            .subtract(dow - 1, 'days')
                            .format('YYYY-MM-DD'); //本周一
                        time1 = time1 + ' 00:00:00';
                        this.BeforeTimeFun(
                            time1,
                            AssociateDateTimePickerList[f]
                        );
                    } else if (
                        AssociateDateTimePickerList[f].InitialTime == '当前月份'
                    ) {
                        time1 = moment().format('YYYY-MM-01 00:00:00');
                        this.BeforeTimeFun(
                            time1,
                            AssociateDateTimePickerList[f]
                        );
                    } else if (
                        AssociateDateTimePickerList[f].InitialTime == '当前季度'
                    ) {
                        let currentQuarter = moment().quarter(); // 当前是第几季度
                        let currentYear = moment().year();
                        time1 = moment()
                            .startOf('quarter')
                            .format('YYYY-MM-DD 00:00:00');
                        this.BeforeTimeFun(
                            time1,
                            AssociateDateTimePickerList[f]
                        );
                    } else if (
                        AssociateDateTimePickerList[f].InitialTime == '当前年份'
                    ) {
                        time1 = moment().format('YYYY-01-01 00:00:00');
                        this.BeforeTimeFun(
                            time1,
                            AssociateDateTimePickerList[f]
                        );
                    }
                }
            }
        },
        //计算时间值
        BeforeTimeFun(time1, AssociateDateTimePickerList) {
            let BeforeTimeYear = Number(
                AssociateDateTimePickerList.BeforeTimeYear
            );
            let BeforeTimeMonth = Number(
                AssociateDateTimePickerList.BeforeTimeMonth
            );
            let BeforeTimeDay = Number(
                AssociateDateTimePickerList.BeforeTimeDay
            );
            let BeforeTimeHour = Number(
                AssociateDateTimePickerList.BeforeTimeHour
            );
            let BeforeTimeMinute = Number(
                AssociateDateTimePickerList.BeforeTimeMinute
            );
            let BeforeTimeSecond = Number(
                AssociateDateTimePickerList.BeforeTimeSecond
            );
            this.resultTime = moment(time1)
                .subtract(BeforeTimeSecond, 'seconds')
                .subtract(BeforeTimeMinute, 'minute')
                .subtract(BeforeTimeHour, 'hours')
                .subtract(BeforeTimeDay, 'days')
                .subtract(BeforeTimeMonth, 'months')
                .subtract(BeforeTimeYear, 'years')
                .format('YYYY-MM-DD HH:mm:ss');
        },

        //  时分秒
        getCurrentTime(time) {
            var date = time; //获取年份
            var year = date.getFullYear(); //获取当前月
            var month = date.getMonth() + 1;
            var mothe = month > 9 ? month : '0' + month; //获取当前日
            var date1 = date.getDate();
            var da = date1 > 9 ? date1 : '0' + date1;
            var h = date.getHours(); //获取当前小时数(0-23)
            var he = h > 9 ? h : '0' + h;
            var m = date.getMinutes(); //获取当前分钟数(0-59)
            var me = m > 9 ? m : '0' + m;
            var s = date.getSeconds();
            var se = s > 9 ? s : '0' + s;
            var str =
                year + '-' + mothe + '-' + da + ' ' + he + ':' + me + ':' + se;
            return str;
        },
        //替换为日期格式时间
        DateTimeFun(item) {
            var itemVa = this.getCurrentTime(item.value);
            item.value = itemVa;
        },
        //时间选择
        ClickTimeFun(item) {
            this.jurisdictionShow(item).then((val) => {
                if (this.CanExcuteShow) {
                    // this.commerPopShow1 = true
                    this.$emit('showtip', this.lang.NoOperationAuthority);
                    item.disabled = true;
                    document.querySelector('.el-picker-panel').style.display =
                        'none';
                } else {
                    item.disabled = false;
                }
            });
        },
        //确认
        Jurisdiction() {
            // this.commerPopShow1 = false
            this.$emit('shownotip');
        },
        //渐变色+阴影
        colorFun(borderSadow, foregoundArr, borderbrushArr, backgroundArr) {
            //阴影
            var Shadow = '';
            var Shadow2;
            var InnerShadow;
            var OuterShadow;
            var foreColor;
            var backgroundColor;
            var clipText;
            var borderColor;
            var backColor;

            var lagel1;
            var lagel2;
            var lagel3;
            var gradient1;
            var gradient2;
            var gradient3;
            if (borderSadow.InnerShadow != undefined) {
                InnerShadow =
                    borderSadow.InnerShadow.OffsetX +
                    'px ' +
                    borderSadow.InnerShadow.OffsetY +
                    'px ' +
                    borderSadow.InnerShadow.BlurRadius.toFixed(0) +
                    'px ' +
                    borderSadow.InnerShadow.Color +
                    ' inset';
            } else {
                InnerShadow = '';
            }
            if (borderSadow.OuterShadow != undefined) {
                OuterShadow =
                    borderSadow.OuterShadow.OffsetX +
                    'px ' +
                    borderSadow.OuterShadow.OffsetY +
                    'px ' +
                    borderSadow.OuterShadow.BlurRadius.toFixed(0) +
                    'px ' +
                    borderSadow.OuterShadow.Color;
            } else {
                OuterShadow = '';
            }

            if (InnerShadow.length && OuterShadow.length) {
                Shadow = OuterShadow;
                Shadow2 = InnerShadow;
            } else if (InnerShadow.length == 0) {
                Shadow = OuterShadow;
                Shadow2 = '';
            } else if (OuterShadow.length == 0) {
                Shadow = '';
                Shadow2 = InnerShadow;
            }

            //字体颜色渐变
            if (foregoundArr.ColorType == 'SolidColor') {
                foreColor =
                    '#' +
                    foregoundArr.Data.Color.slice(3) +
                    foregoundArr.Data.Color.slice(1, 3);
                clipText = 'none';
                backgroundColor = 'none';
            } else {
                foreColor = 'transparent';
                clipText = 'text';
                backgroundColor = '';
                lagel1 = foregoundArr.Data.Angel.toFixed(0);
                for (
                    var g2 = 0;
                    g2 < foregoundArr.Data.GradientStops.length;
                    g2++
                ) {
                    gradient2 = foregoundArr.Data.GradientStops[g2];
                    backgroundColor =
                        backgroundColor +
                        ',' +
                        gradient2.Color +
                        ' ' +
                        (gradient2.Offset * 100).toFixed(0) +
                        '%';
                }
                backgroundColor =
                    '-webkit-linear-gradient(' +
                    lagel1 +
                    'deg' +
                    backgroundColor +
                    ')';
            }
            //边框色渐变
            let showBorder = false
            let borderStyle = ''
            if (borderbrushArr.ColorType == 'SolidColor') {
                borderColor =
                    '#' +
                    borderbrushArr.Data.Color.slice(3) +
                    borderbrushArr.Data.Color.slice(1, 3);
            } else {
                borderColor = '';
                lagel3 = borderbrushArr.Data.Angel.toFixed(0);
                for (
                    var f2 = 0;
                    f2 < borderbrushArr.Data.GradientStops.length;
                    f2++
                ) {
                    gradient3 = borderbrushArr.Data.GradientStops[f2];
                    borderColor =
                        borderColor +
                        ',' +
                        gradient3.Color +
                        ' ' +
                        (gradient3.Offset * 100).toFixed(0) +
                        '%';
                }
                borderColor =
                    '-webkit-linear-gradient(' +
                    lagel3 +
                    'deg' +
                    borderColor +
                    ')';
            }

            //背景色渐变
            if (backgroundArr.ColorType == 'SolidColor') {
                backColor ='#' + backgroundArr.Data.Color.slice(3) +backgroundArr.Data.Color.slice(1, 3);
                if (backgroundArr.Data.Color.slice(3) == 'FFFFFF' &&backgroundArr.Data.Color.slice(1, 3) != 'FF') {
                    borderColor = '#FFFFFF' + backgroundArr.Data.Color.slice(1, 3);
                    showBorder = true
                    borderStyle = `#${borderbrushArr.Data.Color.slice(3)}`
                }
            } else {
                backColor = '';
                lagel2 = backgroundArr.Data.Angel.toFixed(0);
                for (
                    var h2 = 0;
                    h2 < backgroundArr.Data.GradientStops.length;
                    h2++
                ) {
                    gradient1 = backgroundArr.Data.GradientStops[h2];
                    backColor =
                        backColor +
                        ',' +
                        gradient1.Color +
                        ' ' +
                        (gradient1.Offset * 100).toFixed(0) +
                        '%';
                }
                backColor =
                    '-webkit-linear-gradient(' +
                    lagel2 +
                    'deg' +
                    backColor +
                    ')';
            }
            var value = {
                Shadow: Shadow,
                Shadow2: Shadow2,
                InnerShadow: InnerShadow,
                OuterShadow: OuterShadow,
                foreColor: foreColor,
                backgroundColor: backgroundColor,
                clipText: clipText,
                borderColor: borderColor,
                backColor: backColor,
                showBorder,
                borderStyle
            };
            return value;
        },

        //赋值
        gitValue() {
            this.dataValue = [];
            for (let i = 0; i < this.textblockData.length; i++) {
                //加层级zIndex
                var ZIndexs = this.data.Data.ZIndexs;
                if (ZIndexs) {
                    for (let item in ZIndexs) {
                        if (this.textblockData[i].Name == item) {
                            this.ZIndex = ZIndexs[item];
                            break;
                        }
                    }
                } else {
                    this.ZIndex = '';
                }

                //渐变色变量
                var foregoundArr = JSON.parse(
                    this.textblockData[i].PropertyList.Foreground
                );
                var backgroundArr = JSON.parse(
                    this.textblockData[i].PropertyList.Background
                );
                var borderbrushArr = JSON.parse(
                    this.textblockData[i].PropertyList.BorderBrush
                );
                var clipText;
                var backgroundColor;
                var borderSadow = JSON.parse(
                    this.textblockData[i].PropertyList.Shadow
                );
                var InnerShadow;
                var OuterShadow;
                var Shadow;
                var Shadow2;

                var PressButtonList = this.data.Data.PressButtonList;
                var foreOp;
                var foreColor;
                var backOp;
                var backColor;
                var borderOp;
                var borderColor;
                var radius;

                if (PressButtonList.length != 0) {
                    for (let j = 0; j < PressButtonList.length; j++) {
                        if (
                            PressButtonList[j].ElementName ==
                            this.textblockData[i].Name
                        ) {
                            let AssociateDateTimePickerList =
                                this.data.Data.AssociateDateTimePickerList;
                            this.TimePickerListFun(
                                AssociateDateTimePickerList,
                                this.textblockData[i].Name
                            );
                            //渐变色
                            let colorData = this.colorFun(
                                borderSadow,
                                foregoundArr,
                                borderbrushArr,
                                backgroundArr
                            );
                            Shadow = colorData.Shadow;
                            Shadow2 = colorData.Shadow2;
                            InnerShadow = colorData.InnerShadow;
                            OuterShadow = colorData.OuterShadow;
                            foreColor = colorData.foreColor;
                            backgroundColor = colorData.backgroundColor;
                            clipText = colorData.clipText;
                            borderColor = colorData.borderColor;
                            backColor = colorData.backColor;

                            radius =
                                this.textblockData[i].PropertyList.CornerRadius;
                            var value = {
                                width: this.textblockData[i].PropertyList.Width,
                                height: this.textblockData[i].PropertyList
                                    .Height,
                                rotate: this.textblockData[i].PropertyList
                                    .RotateAngle,
                                top: this.textblockData[i].PropertyList.Top,
                                left: this.textblockData[i].PropertyList.Left,
                                opacity:
                                    this.textblockData[i].PropertyList.Opacity /
                                    100,
                                class: this.textblockData[i].Name,
                                value: this.resultTime,
                                BorderThickness:
                                    this.textblockData[i].PropertyList
                                        .BorderThickness,
                                borderColor: borderColor,
                                backColor: backColor,
                                Shadow: Shadow,
                                disabled: false,
                                ZIndex: this.ZIndex,
                                family: this.textblockData[i].PropertyList
                                    .FontFamily,
                            };
                            this.dataValue.push(value);

                            setTimeout(() => {
                                var dom = document.querySelector(
                                    `.${this.textblockData[i].Name}picker`
                                );
                                let BorderThickness =
                                    this.textblockData[i].PropertyList
                                        .BorderThickness;
                                dom.querySelector(
                                    `.el-input__inner`
                                ).style.background = colorData.backColor;
                                dom.querySelector(
                                    `.el-input__inner`
                                ).style.color = colorData.foreColor;
                                dom.querySelector(
                                    `.el-input__inner`
                                ).style.boxShadow = colorData.Shadow2;
                                dom.querySelector(
                                    `.el-input__inner`
                                ).style.fontSize =
                                    this.textblockData[i].PropertyList
                                        .FontSize + 'px';
                                let TextDecorations =
                                    this.textblockData[i].PropertyList
                                        .TextDecorations == 'False'
                                        ? 'none'
                                        : 'underline';
                                dom.querySelector(
                                    `.el-input__inner`
                                ).style.textDecoration = TextDecorations;

                                dom.querySelector(
                                    `.el-input__inner`
                                ).style.fontFamily =
                                    this.textblockData[
                                        i
                                    ].PropertyList.FontFamily;

                                dom.querySelector(
                                    `.el-input__prefix .el-input__icon`
                                ).style.setProperty(
                                    'line-height',
                                    `${BorderThickness}px`,
                                    'important'
                                );
                            }, 300);

                            break;
                        } else {
                            if (j == PressButtonList.length - 1) {
                                let AssociateDateTimePickerList =
                                    this.data.Data.AssociateDateTimePickerList;
                                this.TimePickerListFun(
                                    AssociateDateTimePickerList,
                                    this.textblockData[i].Name
                                );

                                //渐变色
                                let colorData = this.colorFun(
                                    borderSadow,
                                    foregoundArr,
                                    borderbrushArr,
                                    backgroundArr
                                );
                                Shadow = colorData.Shadow;
                                Shadow2 = colorData.Shadow2;
                                InnerShadow = colorData.InnerShadow;
                                OuterShadow = colorData.OuterShadow;
                                foreColor = colorData.foreColor;
                                backgroundColor = colorData.backgroundColor;
                                clipText = colorData.clipText;
                                borderColor = colorData.borderColor;
                                backColor = colorData.backColor;

                                radius =
                                    this.textblockData[i].PropertyList
                                        .CornerRadius;
                                var value5 = {
                                    width: this.textblockData[i].PropertyList
                                        .Width,
                                    height: this.textblockData[i].PropertyList
                                        .Height,
                                    rotate: this.textblockData[i].PropertyList
                                        .RotateAngle,
                                    top: this.textblockData[i].PropertyList.Top,
                                    left: this.textblockData[i].PropertyList
                                        .Left,
                                    opacity:
                                        this.textblockData[i].PropertyList
                                            .Opacity / 100,
                                    class: this.textblockData[i].Name,
                                    value: this.resultTime,
                                    BorderThickness:
                                        this.textblockData[i].PropertyList
                                            .BorderThickness,
                                    borderColor: borderColor,
                                    Shadow: Shadow,
                                    disabled: false,
                                    ZIndex: this.ZIndex,
                                    family: this.textblockData[i].PropertyList
                                        .FontFamily,
                                    showBorder: colorData.showBorder,
                                    borderStyle: colorData.borderStyle
                                };
                                this.dataValue.push(value5);

                                setTimeout(() => {
                                    var dom = document.querySelector(
                                        `.${this.textblockData[i].Name}picker`
                                    );
                                    let BorderThickness =
                                        this.textblockData[i].PropertyList
                                            .BorderThickness;
                                    dom.querySelector(
                                        `.el-input__inner`
                                    ).style.background = colorData.backColor;
                                    dom.querySelector(
                                        `.el-input__inner`
                                    ).style.color = colorData.foreColor;
                                    dom.querySelector(
                                        `.el-input__inner`
                                    ).style.boxShadow = colorData.Shadow2;
                                    dom.querySelector(
                                        `.el-input__inner`
                                    ).style.fontSize =
                                        this.textblockData[
                                            i
                                        ].PropertyList.FontSize;
                                    let TextDecorations =
                                        this.textblockData[i].PropertyList
                                            .TextDecorations == 'False'
                                            ? 'none'
                                            : 'underline';
                                    dom.querySelector(
                                        `.el-input__inner`
                                    ).style.textDecoration = TextDecorations;

                                    dom.querySelector(
                                        `.el-input__inner`
                                    ).style.fontFamily =
                                        this.textblockData[
                                            i
                                        ].PropertyList.FontFamily;

                                    dom.querySelector(
                                        `.el-input__prefix .el-input__icon`
                                    ).style.setProperty(
                                        'line-height',
                                        `${BorderThickness}px`,
                                        'important'
                                    );
                                }, 300);
                            }
                        }
                    }
                } else {
                    let AssociateDateTimePickerList =
                        this.data.Data.AssociateDateTimePickerList;
                    this.TimePickerListFun(
                        AssociateDateTimePickerList,
                        this.textblockData[i].Name
                    );

                    //渐变色
                    let colorData = this.colorFun(
                        borderSadow,
                        foregoundArr,
                        borderbrushArr,
                        backgroundArr
                    );
                    Shadow = colorData.Shadow;
                    Shadow2 = colorData.Shadow2;
                    InnerShadow = colorData.InnerShadow;
                    OuterShadow = colorData.OuterShadow;
                    foreColor = colorData.foreColor;
                    backgroundColor = colorData.backgroundColor;
                    clipText = colorData.clipText;
                    borderColor = colorData.borderColor;
                    backColor = colorData.backColor;

                    radius = this.textblockData[i].PropertyList.CornerRadius;
                    var value8 = {
                        width: this.textblockData[i].PropertyList.Width,
                        height: this.textblockData[i].PropertyList.Height,
                        rotate: this.textblockData[i].PropertyList.RotateAngle,
                        top: this.textblockData[i].PropertyList.Top,
                        left: this.textblockData[i].PropertyList.Left,
                        opacity:
                            this.textblockData[i].PropertyList.Opacity / 100,
                        class: this.textblockData[i].Name,
                        value: this.resultTime,
                        disabled: false,
                        BorderThickness:
                            this.textblockData[i].PropertyList.BorderThickness,
                        borderColor: borderColor,
                        Shadow: Shadow,
                        size: this.textblockData[i].PropertyList.FontSize,
                        ZIndex: this.ZIndex,
                        family: this.textblockData[i].PropertyList.FontFamily,
                    };
                    this.dataValue.push(value8);

                    setTimeout(() => {
                        var dom = document.querySelector(
                            `.${this.textblockData[i].Name}picker`
                        );
                        let BorderThickness =
                            this.textblockData[i].PropertyList.BorderThickness;
                        dom.querySelector(`.el-input__inner`).style.background =
                            colorData.backColor;
                        dom.querySelector(`.el-input__inner`).style.color =
                            colorData.foreColor;
                        dom.querySelector(`.el-input__inner`).style.boxShadow =
                            colorData.Shadow2;
                        dom.querySelector(`.el-input__inner`).style.fontSize =
                            this.textblockData[i].PropertyList.FontSize + 'px';
                        let TextDecorations =
                            this.textblockData[i].PropertyList
                                .TextDecorations == 'False'
                                ? 'none'
                                : 'underline';
                        dom.querySelector(
                            `.el-input__inner`
                        ).style.textDecoration = TextDecorations;

                        dom.querySelector(`.el-input__inner`).style.fontFamily =
                            this.textblockData[i].PropertyList.FontFamily;

                        dom.querySelector(
                            `.el-input__prefix .el-input__icon`
                        ).style.setProperty(
                            'line-height',
                            `${BorderThickness}px`,
                            'important'
                        );
                    }, 300);
                }
            }
        },
    },
};
</script>

<style lang="scss">
.DateTimePicker28a {
    .el-input--suffix .el-input__inner {
        height: 34px !important;
        border: none !important;
    }

    .el-input--suffix .el-input__inner {
        height: 100% !important;
    }
    .el-input__suffix {
        display: none !important;
    }
    .el-input__prefix {
        line-height: 0px !important;
    }
    .el-input__inner {
        border-radius: 0px;
    }
}
</style>

<style lang="scss" scoped>
.DateTimePicker28a {
    display: inline-block;
    user-select: none;
    cursor: pointer;
    box-sizing: border-box;
}
.textimportInput {
    // border:none;
    height: 34px;
}
.commerPop_outPop {
    width: 360px;
    height: 190px;
    box-shadow: 2px 2px 8px 2px rgba(0, 0, 0, 0.1);
    position: absolute;
    left: 0;
    right: 0;
    top: 260px;
    margin: auto;
    z-index: 100;
    background: #fff;
    .commerPop_btn {
        overflow: hidden;
        margin-top: 10px;
        .commerPop_confirm {
            width: 305px;
            height: 30px;
            line-height: 30px;
            background: #f3e3ad;
            color: #ecaa4e;
            margin-left: 30px;
            text-align: center;
            cursor: pointer;
        }
        .commerPop_no {
            width: 155px;
            height: 30px;
            float: left;
            background: #e0e0e0;
            color: #8e8e8e;
            text-align: center;
            line-height: 30px;
            margin-left: 22px;
            cursor: pointer;
        }
        .commerPop_yes {
            width: 155px;
            height: 30px;
            float: left;
            background: #f3e3ad;
            color: #ecaa4e;
            margin-left: 5px;
            text-align: center;
            line-height: 30px;
            cursor: pointer;
        }
    }
    .commerPop_conter {
        font-size: 16px;
        width: 100%;
        height: 100px;
        text-align: center;
        line-height: 100px;
    }

    .commerPop_outHead {
        width: 100%;
        height: 30px;
        background: #ffbc3d;
        text-align: center;
        line-height: 30px;

        .warning {
            color: #fff;
            margin-right: 5px;
        }
        .text {
            font-size: 16px;
            color: #fff;
        }
    }
}
</style>