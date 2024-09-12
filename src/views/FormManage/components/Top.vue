<!--
 * @Description: 搜索框组件
 * @Date: 2019-11-24 14:57:05
 * @Author: 随风
 * @LastEditors: 随风
 * @LastEditTime: 2019-11-29 16:34:35
 -->
<template>
    <div class="search-container" >
        <div class="word1">{{lang.APPFormManage_FeedbackStatus}}：</div>
        <div  style="width:135px;marginLeft:10px">
      <el-select @focus="sx" v-model="value" placeholder="请选择">
            <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            >
            </el-option>
        </el-select>
        </div>
  
        <div class="word1" style="marginLeft:10px">{{lang.APPFormManage_InsertAt}}：</div>
        <el-date-picker
            @focus="sx"
            v-model="startime"
            type="datetime"
            placeholder="选择日期时间"
        >
        </el-date-picker>
        <div style="marginLeft:5px;marginRight:5px">-</div>
        <el-date-picker
            @focus="sx"
            v-model="endtime"
            type="datetime"
            placeholder="选择日期时间"
        >
        </el-date-picker>
        <div style="width:180px;marginLeft:10px">
            <el-input v-model="input" :placeholder="lang.APPFormManage_Keyword"></el-input>
        </div>

        <div class="btn pointer" @click="search">
            {{ lang.APPFormManage_Query }}
        </div>
        <div class="fr">
            <div class="import import1" @click="change">
               {{ lang.APPFormManage_Modify }}
            </div>
            <div class="import" @click="del">
                <!-- <img :src="delimg" alt=""> -->
               {{ lang.APPFormManage_Delete }}
            </div>
            <div class="export" @click="exportdata">
              {{ lang.APPFormManage_Export }}
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            delimg:require('../../../assets/images/reddel.png'),
            lang: JSON.parse(localStorage.getItem('languages'))[
                localStorage.getItem('currentLang')
            ],
            toplist:{
             leftid:'',
             IsNormal:'',
             From:'',
             To:'',
             SearchFields:null,
             Keyword:'',
             PageIndex:1,
             PageSize:50
            },
            inputwidth: '220px',
            options: [
                {
                    value: '不限',
                    label: '不限'
                },
                {
                    value: '异常',
                    label: '异常'
                },
                {
                    value: '正常',
                    label: '正常'
                }
            ],
            // startime: '2021-10-1 00:00:00',
            startime: new Date(
                new Date(new Date().toLocaleDateString()).getTime() -
                    24 * 60 * 60 * 1000*6
            ),
            endtime: new Date(
                new Date(new Date().toLocaleDateString()).getTime() +
                    24 * 60 * 60 * 1000 -
                    1
            ),
            input: '',
            value: '不限',
            zoomValue: 1
        };
    },
    methods: {
      getleftdata(data){
          
          this.toplist.AppFormId = data.id 
          this.toplist.PageIndex = 1
          this.toplist.PageSize = 50
            this.search('left')
        },
        changepage(data){
        this.toplist.PageIndex = data
        this.search()
        },
       exportdata(){
        this.$emit('exportdata',this.toplist)
       },
       change(){
       this.$emit('change')
       },
       del(){
        this.$emit('del')
       },
       search(left){
           
            this.toplist.Keyword = this.input;
            this.toplist.From = this.GMTToStr(this.startime);
            this.toplist.To = this.GMTToStr(this.endtime);
            this.toplist.IsNormal = this.value==this.lang.APPFormManage_Status_Unlimited?'':this.value==this.lang.APPFormManage_Status_Normal?true:false
             if (
                new Date(this.startime).getTime() >
                new Date(this.endtime).getTime()
            ) {
             this.$emit('search',this.toplist,this.lang.AlarmRecord_HT_TheQueryDate,left) 
            }else{
             this.$emit('search',this.toplist,'',left) 
            }
           
       },
        GMTToStr(time) {
            let date = new Date(time);
            let m = date.getMonth() + 1,
                mm = '-' + (m < 10 ? '0' + m : m);
            let d = date.getDate(),
                dd = '-' + (d < 10 ? '0' + d : d);
            let h = date.getHours(),
                hh = h < 10 ? '0' + h : h;
            let i = date.getMinutes(),
                ii = i < 10 ? '0' + i : i;
            let s = date.getSeconds(),
                ss = s < 10 ? '0' + s : s;
            return (
                date.getFullYear() + mm + dd + ' ' + hh + ':' + ii + ':' + ss
            );
        },
        sx() {
            let that = this;
            setTimeout(() => {
                for (let i = 0; i < $('.el-picker-panel').length; i++) {
                    $('.el-picker-panel')[i].style.zoom = that.zoomValue;
                }
                for (let i = 0; i < $('.el-select-dropdown').length; i++) {
                    $('.el-select-dropdown')[i].style.zoom = that.zoomValue;
                }
            });
        }
    },
    mounted() {
        
        this.value = JSON.parse(JSON.stringify(this.lang.APPFormManage_Status_Unlimited));
        this.options = [
                {
                    value: this.lang.APPFormManage_Status_Unlimited,
                    label: this.lang.APPFormManage_Status_Unlimited
                },
                {
                    value: this.lang.APPFormManage_Status_Normal,
                    label: this.lang.APPFormManage_Status_Normal
                },
                {
                    value: this.lang.APPFormManage_Status_Abnormal,
                    label: this.lang.APPFormManage_Status_Abnormal
                }
            ],
        this.startime = this.GMTToStr(this.startime);
        this.endtime = this.GMTToStr(this.endtime);
        this.zoomValue =
            Number(parseFloat(window.screen.width / 1920).toFixed(2)) <= 0.7
                ? 0.7
                : Number(parseFloat(window.screen.width / 1920).toFixed(2));
        
    }
};
</script>

<style lang="scss" scoped>
%flex {
    display: flex;
    align-items: center;
}
.search-container {
    // zoom: 0.8;
    @extend %flex;
    padding: 10px;
    // justify-content: space-between;
    background-color: #ddd;
    width: 100%;
    position: relative;
    // height: 40px;
    // display: block !important;
    display: -webkit-box !important;
}
span {
    position: absolute;
    left: 315px;
}

.btn {
    @extend %flex;
    justify-content: center;
    width: 112px;
    height: 40px;
    background-color: #4270e4;
    border-radius: 4px;
    color: #fff;
    line-height: 40px;
    margin-left: 10px;
}
.import {
    border: 2px solid #FF3B3B;
    background-color: #ffffff;
    width: 112px;
    height: 38px;
    display: block;
    border-radius: 4px;
    text-align: center;
    line-height: 34px;
    cursor: pointer;
    float: right;
    color: #FF3B3B;
    font-weight: bold;
    margin-left: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    img{
        height: 20px;
        margin-right: 3px;
    }
}
.export {
    border: 2px solid #fda100;
    background-color: #ffffff;
    color: #fda100;
    width: 112px;
    height: 38px;
    display: block;
      font-weight: bold;
    border-radius: 4px;
    text-align: center;
    line-height: 34px;
    cursor: pointer;
    float: right;
    margin-left: 10px;
}
.fr {
    width: 360px;
    height: 100%;
    position: absolute;
    right: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.import1 {
   border: 2px solid #4270E4;
    background-color: #ffffff;
    width: 112px;
    height: 38px;
    display: block;
    border-radius: 4px;
    text-align: center;
    line-height: 34px;
    cursor: pointer;
    float: right;
    color: #4270E4;
    font-weight: bold;
    margin-left: 10px;
}
.word1 {
    // width: 100px;
}
</style>
