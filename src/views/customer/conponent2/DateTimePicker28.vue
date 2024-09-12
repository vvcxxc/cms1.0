<!--
 * @Description: 这是时间控件页面（组件）
 * @Date: 2019-11-18 15:00:18
 * @Author: Tao
 * @LastEditors: Tao
 * @LastEditTime: 2021-01-07 10:01:37
 -->
<template>
    <div class="time">
        <div class="DateTimePicker28a" v-for="(item,index) in dataValue" :key="index">
            <el-date-picker
                v-if="show"
                :class="item.class"
              
                :style="'position:absolute; left:' + item.left + 'px; top:' + item.top 
                + 'px; boxSizing:border-box; text-align:center;line-height:' + item.height
                + 'px; width:'+ item.width + 'px; height:'+ item.height + 'px;'
                + ';opacity:' + item.opacity + ';border: 1px solid #AAAAAA;overflow:hidden'"
                v-model="item.value"
                :placeholder="lang.SCMSConsoleWebApiMySql_PleChooseDate"
            ></el-date-picker>
        </div>
    </div>
</template>

<script>
import moment from 'moment'//导入文件
export default {
    data() {
        return {
            textblockData: [],
            dataValue: [],
            show: false,
            value3: '',
            lang: JSON.parse(localStorage.getItem('languages'))[localStorage.getItem('currentLang')]
        };
    },
    props: ['dae', 'dataId'],
    watch: {
        dae: {
            handler(val) {
                this.data = val;
                if(val){
                    this.init();
                }
            }
        }
    },
    created() {
        this.data = this.dae;
        this.Name = 'associatedatetimepicker';
        if(this.data){
            this.init();
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
        


        //  时分秒
        getCurrentTime() {
            //创建对象
            var date = new Date() //获取年份
          
            var y = date.getFullYear();   //获取月份  返回0-11
            var m = date.getMonth() + 1;   // 获取日
            var d = date.getDate();   //获取星期几  返回0-6   (0=星期天)
            var w = date.getDay();    //星期几
            var ww = ' 星期' + '日一二三四五六'.charAt(date.getDay());   //时
            var h = date.getHours();    //分
            var minute = date.getMinutes();  //秒
            var s = date.getSeconds();  //毫秒
            var sss = date.getMilliseconds();

            if (m < 10) {
                m = '0' + m;
            }
            if (d < 10) {
                d = '0' + d;
            }
            if (h < 10) {
                h = '0' + h;
            }
            if (minute < 10) {
                minute = '0' + minute;
            }
            if (s < 10) {
                s = '0' + s;
            }
            if (sss < 10) {
                sss = '00' + sss;
            } else if (sss < 100) {
                sss = '0' + sss;
            }
            return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + s;
        },
     
        //赋值
        gitValue() {
            this.dataValue = [];
            for (var i = 0; i < this.textblockData.length; i++) {
                var PressButtonList = this.data.Data.PressButtonList;
                var foreOp;
                var foreColor;
                var backOp;
                var backColor;
                var borderOp;
                var borderColor;
                var radius;

                if (PressButtonList.length != 0) {
                    for (var j = 0; j < PressButtonList.length; j++) {
                        if (PressButtonList[j].ElementName ==this.textblockData[i].Name) {
                             var nowtime1 = this.getCurrentTime();
                                 for (let i = 0;i < this.dae.Data.AssociateDateTimePickerList.length;i++) {
                                    if (this.textblockData[i].Name ==this.dae.Data.AssociateDateTimePickerList[i].ElementName) {
                                        let time = this.dae.Data.AssociateDateTimePickerList[i];
                                        let itemtime = new Date(nowtime);
                                        itemtime.setSeconds(itemtime.getSeconds() + parseFloat(time.BeforeTimeSecond));
                                        itemtime.setMinutes(itemtime.getMinutes() +parseFloat(time.BeforeTimeMinute));
                                        itemtime.setHours(itemtime.getHours() +parseFloat(time.BeforeTimeHour));
                                        itemtime.setDate(itemtime.getDate() +parseFloat(time.BeforeTimeDay));
                                        itemtime.setMonth(itemtime.getMonth() +parseFloat(time.BeforeTimeMonth));
                                        itemtime.setFullYear(itemtime.getFullYear() +parseFloat(time.BeforeTimeYear));
                                        nowtime1 = itemtime;
                                    }
                                }
                            radius = this.textblockData[i].PropertyList.CornerRadius;
                            var value = {
                                width: this.textblockData[i].PropertyList.Width,
                                height: this.textblockData[i].PropertyList.Height,
                                rotate: this.textblockData[i].PropertyList.RotateAngle,
                                top: this.textblockData[i].PropertyList.Top,
                                left: this.textblockData[i].PropertyList.Left,
                                opacity:this.textblockData[i].PropertyList.Opacity /100,
                                class: this.textblockData[i].Name,
                                value: nowtime1
                            };
                            this.dataValue.push(value);
                            break;
                        } else {
                            if (j == PressButtonList.length - 1) {
                                 var nowtime2 = this.getCurrentTime();
                                 for (let i = 0;i < this.dae.Data.AssociateDateTimePickerList.length;i++) {
                                    if (this.textblockData[i].Name ==this.dae.Data.AssociateDateTimePickerList[i].ElementName) {
                                        let time = this.dae.Data.AssociateDateTimePickerList[i];
                                        let itemtime = new Date(nowtime);
                                        itemtime.setSeconds(itemtime.getSeconds() + parseFloat(time.BeforeTimeSecond));
                                        itemtime.setMinutes(itemtime.getMinutes() +parseFloat(time.BeforeTimeMinute));
                                        itemtime.setHours(itemtime.getHours() +parseFloat(time.BeforeTimeHour));
                                        itemtime.setDate(itemtime.getDate() +parseFloat(time.BeforeTimeDay));
                                        itemtime.setMonth(itemtime.getMonth() +parseFloat(time.BeforeTimeMonth));
                                        itemtime.setFullYear(itemtime.getFullYear() +parseFloat(time.BeforeTimeYear));
                                        nowtime2 = itemtime;
                                    }
                                }
                                radius = this.textblockData[i].PropertyList.CornerRadius;
                                var value5 = {
                                    width: this.textblockData[i].PropertyList.Width,
                                    height: this.textblockData[i].PropertyList.Height,
                                    rotate: this.textblockData[i].PropertyList.RotateAngle,
                                    top: this.textblockData[i].PropertyList.Top,
                                    left: this.textblockData[i].PropertyList.Left,
                                    opacity: this.textblockData[i].PropertyList.Opacity / 100,
                                    class: this.textblockData[i].Name,
                                    value: nowtime2
                                };
                                this.dataValue.push(value5);
                            }
                        }
                    }
                } else {
                
                    radius = this.textblockData[i].PropertyList.CornerRadius;
                    for (
                        let i = 0;
                        i < this.dae.Data.AssociateDateTimePickerList.length;
                        i++
                    ) {
                            var nowtime = this.getCurrentTime();
                        if (
                            this.textblockData[i].Name ==
                            this.dae.Data.AssociateDateTimePickerList[i]
                                .ElementName
                        ) {
                            let time = this.dae.Data
                                .AssociateDateTimePickerList[i];
                            let itemtime = new Date(nowtime);
                            itemtime.setSeconds(
                                itemtime.getSeconds() -
                                    parseFloat(time.BeforeTimeSecond)
                            );
                            itemtime.setMinutes(
                                itemtime.getMinutes() -
                                    parseFloat(time.BeforeTimeMinute)
                            );
                            itemtime.setHours(
                                itemtime.getHours() -
                                    parseFloat(time.BeforeTimeHour)
                            );
                            itemtime.setDate(
                                itemtime.getDate() -
                                    parseFloat(time.BeforeTimeDay)
                            );
                            itemtime.setMonth(
                                itemtime.getMonth() -
                                    parseFloat(time.BeforeTimeMonth)
                            );
                            itemtime.setFullYear(
                                itemtime.getFullYear() -
                                    parseFloat(time.BeforeTimeYear)
                            );
                            
                            nowtime = itemtime;
                                var value8 = {
                        width: this.textblockData[i].PropertyList.Width,
                        height: this.textblockData[i].PropertyList.Height,
                        rotate: this.textblockData[i].PropertyList.RotateAngle,
                        top: this.textblockData[i].PropertyList.Top,
                        left: this.textblockData[i].PropertyList.Left,
                        opacity:this.textblockData[i].PropertyList.Opacity / 100,
                        class: this.textblockData[i].Name,
                        value: nowtime
                    };
                    this.dataValue.push(value8);
                        }
                    }

                
                }
            }
        }
    }
};
</script>

<style lang="scss">
.DateTimePicker28a {
    // .el-input__prefix{
    //     left:-3px !important;
    // }
    .el-input--suffix .el-input__inner {
        height: 34px !important;
        border: none !important;
    }
}
</style>

<style lang="scss" scoped>
.DateTimePicker28a {
    display: inline-block;
    user-select: none;
    cursor: pointer;
    box-sizing: border-box;
    position: relative;
}
.textimportInput {
    // border:none;
    height: 34px;
}
</style>