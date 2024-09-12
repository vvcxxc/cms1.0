<!--
 * @Description: 这是导出弹窗页面（组件）
 * @Date: 2020-11-19 09:25:59
 * @Author: Tao
 * @LastEditors: Tao
 * @LastEditTime: 2021-03-01 11:43:28
-->
<template>
    <div class="export_box">
        <div  v-drag class="head">{{lang.AlarmRecord_HT_AlarmPointManageUC_Export}}
           <div @click="can()" class="headImg"></div>
        </div>
        <div class="export_middle">
            <div class="export_time">
                <div class="startText left">{{lang.ScheduleManage_StartDate}}</div>
                <div class="startTime left">
                     <el-date-picker
                        v-model="startValue"
                        type="month"
                        :placeholder="lang.ScheduleManage_StartDate_Select">
                     </el-date-picker>
                </div>
                <div class="endText left">{{lang.ScheduleManage_EndDate}}</div>
                <div class="endTime left">
                    <el-date-picker
                        v-model="endValue"
                        type="month"
                        :placeholder="lang.ScheduleManage_EndDate_Select">
                    </el-date-picker>
                </div>
            </div>
            <div class="export_type">
                 <span class="left type_text">{{lang.ScheduleManage_Export_Type}}</span>
                 <el-radio  v-model="radio" label="1">{{lang.ScheduleManage_Export_MonthlyView}}</el-radio>
                 <el-radio  v-model="radio" label="2">{{lang.ScheduleManage_Export_Schedule}}</el-radio>
            </div>
            <div class="export_btn">
                <div @click="confirmFun()" class="confirm">{{lang.PopupCommon_Sure}}</div>
                <div @click="can()" class="cancel">{{lang.PopupCommon_Cancel}}</div>
            </div>
        </div>
    </div>
</template>
<script>
import moment from 'moment'//导入文件
export default {
    data(){
        return{
            startValue:'',
            endValue:'',
            radio:'2',
            lang: JSON.parse(localStorage.getItem('languages'))[localStorage.getItem('currentLang')]
        }
    },
     directives: {
            drag: function(el) {
                let dragBox = el; //获取当前元素
                dragBox.onmousedown = e => {
                let box = document.querySelector('.export_box')
                    //算出鼠标相对元素的位置
                    let disX = e.clientX - dragBox.offsetLeft;
                    let disY = e.clientY - dragBox.offsetTop;
                    document.onmousemove = e => {
                        //用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
                        let left = e.clientX - (Number(disX));
                        let top = e.clientY - (Number(disY));
                        //移动当前元素
                        box.style.left = left + "px";
                        box.style.top = top + "px";
                    };
                    document.onmouseup = e => {
                          document.onmousemove = null;
                          document.onmouseup = null;
                    };
                };
            }
        },
    created(){
            var newTime = moment().format("YYYY-MM")
            this.startValue = newTime
            this.endValue = newTime
    },

    methods:{
        //点击确定
        confirmFun(){
            //radio 1==>pdf  2==>excel
            console.log('startValue',this.startValue,this.endValue)
            this.startValue = moment(this.startValue).format("YYYY-MM")
            this.endValue = moment(this.endValue).format("YYYY-MM")
            if(this.radio=='2'){
                 window.open(
                   `/api/class/Export?startTime=${this.startValue}&endTime=${this.endValue}&argLanguage=${localStorage.getItem('currentLang')}`
                );
                this.$parent.Pshow(this.lang.AlarmRecord_HT_AlarmPointManageUC_ExportSuccess,'1')
            }else{
                this.$parent.exportPdfFun()
                setTimeout(()=>{
                    this.$parent.$refs.exportPdf.initPdfTime(this.startValue)
                },100)
            }
        },
        //关闭弹窗
        can(){
            this.$parent.cancelFun()
        }
        
    }
    
}
</script>
<style lang="scss">
.export_box{
    .el-radio__label{
        font-size: 16px;
        color:#222222;
    }
    .el-input--prefix .el-input__inner{
        width:160px;
        height: 35px;
    }
}
</style>
<style lang="scss" scoped>
.export_box{
    width:618px;
    height: 246px;
    position:absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    z-index: 12;
    box-shadow:-7px 7px 50px 0px rgba(51,51,51,0.5);
    background: #EEEEEE;
    .left{
        float: left;
    }
    .head{
        position: relative;
        line-height: 40px;
        text-align: center;
        width:100%;
        height:40px;
        background:rgba(56, 109, 240, 1);
        font-size:16px;
        font-family:Microsoft YaHei;
        font-weight:bold;
        color:rgba(238,238,238,1);
        user-select: none;
        .headImg{
            position: absolute;
            right: 12px;
            top: 13px;
            width:16px;
            height: 16px;
            background: url('../../../assets/images/no.png');
            background-size:cover ;
            cursor: pointer;
        }
    }
    .export_middle{
        width:100%;
        height: calc(206px - 40px);
        box-sizing: border-box;
        .export_time{
            margin-top:30px;
            width:100%;
            height: 40px;
            line-height: 40px;
            padding:0px 40px;
            overflow: hidden;
            .startText{
                font-size: 16px;
                margin-right: 20px;
            }
            .startTime{
                width: 160px;
                height: 40px;
                margin-right:50px;
            }
            .endText{
                font-size: 16px;
                margin-right:20px;
            }
            .endTime{
                width:160px;
                height: 40px;
                
            }
        }
        .export_type{
            margin-top:22px;
            .type_text{
                margin-left:40px;
                margin-right:20px;
                color:#222222;
                font-size: 16px;
            }

        }
        .export_btn{
            overflow: hidden;
            margin-top:22px;
            .confirm,.cancel{
                float: right;
                width: 100px;
                height: 40px;
                border-radius: 4px;
                text-align: center;
                line-height: 40px;
                cursor: pointer;
                user-select: none;
                color:#fff;
            }
            .cancel{
                background: #949BAC;
            }
            .confirm{
                background: #4270E4;
                margin-left:20px;
                margin-right:20px;
            }

        }
    }
}

</style>