<!--
 * @Description: 搜索框组件
 * @Date: 2019-11-24 14:57:05
 * @Author: 随风
 * @LastEditors: 随风
 * @LastEditTime: 2019-11-29 16:34:35
 -->
<template>
    <div class="search-container" :class="{colordiv:$store.state.color=='grey', blackBlueBg: $store.state.color === 'blackBlue'}" :style="{lineHeight: 40*zoom+'px',height: 60*zoom+'px'}">
        <div class="search-left" :style="[{fontSize:16*zoom+'px'}]">
            <div class="search-item" v-for="(item, index) in searchList" :key="index">
                <div
                    class="title"
                    :class="{ mr10: item.title == '-' }"
                    v-if="item.type !== 'key'"
                >{{ item.title }}</div>

                <el-select
                    v-if="item.type === 'select'"
                    :popper-append-to-body="false"
                    clearable
                    filterable
                    v-model="searchData[item.model]"
                    class="search-select"
                    :placeholder="lang.SCMSConsoleWebApiMySql_PleChoose"
                    @change="change(item.model, $event)"
                    @focus="getZoom()"
                >
                    <!-- <el-option label="全部" value="全部"></el-option> -->
                    <el-option
                        v-for="(options, optionsIndex) in item.optionList"
                        :key="optionsIndex"
                        :label="item.label ? options[item.label] : options"
                        :value="item.value ? options[item.value] : options"
                    ></el-option>
                </el-select>
                <el-date-picker
                    :key="$store.state.color === 'blackBlue' ? 'blackBlueBg' : 'normal'"
                    :popper-class="$store.state.color === 'blackBlue' ? 'blackBlueBg' : 'normal'"
                    v-if="item.type === 'time'"
                    v-model="searchData[item.model]"
                    type="datetime"
                    :placeholder="lang.SCMSConsoleWebApiMySql_PleChooseDate"
                    default-time="12:00:00"
                     value-format="yyyy-MM-dd HH:mm:ss"
                ></el-date-picker>
                <!-- <span>-</span> -->
                <el-date-picker
                    :key="$store.state.color === 'blackBlue' ? 'blackBlueBg' : 'normal'"
                    :popper-class="$store.state.color === 'blackBlue' ? 'blackBlueBg' : 'normal'"
                    v-if="item.type === 'datetimerange'"
                    v-model="searchData[item.model]"
                    type="datetimerange"
                    range-separator="-"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                     value-format="yyyy-MM-dd HH:mm:ss"
                ></el-date-picker>
                <el-input
                    v-if="item.type === 'key'"
                    v-model="searchData[item.model]"
                    :placeholder="item.placeholder || lang.AlarmRecord_History_Keyword"
                    clearable
                    :style="{width: 215 * zoom +'px'}"
                ></el-input>
            </div>
            <div class="btn pointer importtant" @click="search"
                :style="[{fontSize:16*zoom+'px'},
                    {height: 40*zoom+'px'},
                    {width: 100*zoom+'px'},
                    {right: 230*zoom+'px'},
                    {lineHeight: 40*zoom+'px'}
                ]"
             :id='cxid'>{{lang.AlarmStatistics_AlarmStatisticsUserControl_Query}}</div>
             <div class="import" @click="preservation" 
                :style="[{fontSize:16*zoom+'px'},
                    {height: 40*zoom+'px'},
                    {width: 100*zoom+'px'},
                    {right: 120*zoom+'px'},
                    {lineHeight: 40*zoom+'px'}
                ]" :id="bcid">{{lang.AlarmRecord_HT_AlarmPointManageUC_Save}}</div>
            <div class="export" @click="exportTable" 
                :style="[{fontSize:16*zoom+'px'},
                    {height: 40*zoom+'px'},
                    {width: 100*zoom+'px'},
                    {right: 10*zoom+'px'},
                    {lineHeight: 40*zoom+'px'}
                ]" :id="dcid">{{lang.AlarmRecord_HT_AlarmPointManageUC_Export}}</div>

        </div>
        <div>
        </div>
        <!-- <div class="fr">
           
        </div>-->
    </div>
</template>

<script>
export default {
    props: ['searchList', 'searchData'],
    data() {
        return {
            jurisdiction:[],
            buttonarr:[],
            cxid:"",
            bcid:'',
            dcid:'',
            cxshow:true,
            bcshow:true,
            dcshow:true,
            zoom: 1,
             zoom1: 1,
            lang: JSON.parse(localStorage.getItem('languages'))[localStorage.getItem('currentLang')]
        };
    },
      watch:{
        VpowerData(val){
          this.jurisdiction = this.$store.state.btnPowerData
     this.buttonarr = this.findPathByLeafId(this.GetUrlParam('id'),this.jurisdiction)[0].Children
     console.log("butt",this.buttonarr)
     this.buttonarr.forEach((item)=>{
         if(item.RightName == "报警点管理-查询按钮"){
          this.cxid = item.RightID
         }else if(item.RightName == "报警点管理-保存按钮"){
          this.bcid = item.RightID
         }else if(item.RightName == "报警点管理-导出按钮"){
           this.dcid = item.RightID
         }
     })
     var userid = ''
      if (!JSON.parse(sessionStorage.getItem('userInfo1'))) {
                userid = JSON.parse(
                    sessionStorage.getItem('sightseerInfo1')
                ).SCMSUserID;
            } else {
                userid = JSON.parse(
                    sessionStorage.getItem('userInfo1')
                ).SCMSUserID;
            }
              this.$axios({
                  method: 'post',
                  url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.cxid}`,
              }).then(res => {
                  this.cxshow = res.data.data
                  console.log("这里",this.cxshow)
              }).catch((err)=>{
                  console.log('err',err)
              })
                 this.$axios({
                  method: 'post',
                  url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.bcid}`,
              }).then(res => {
                  this.bcshow = res.data.data
              }).catch((err)=>{
                  console.log('err',err)
              })
                 this.$axios({
                  method: 'post',
                  url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.dcid}`,
              }).then(res => {
                  this.dcshow = res.data.data
              }).catch((err)=>{
                  console.log('err',err)
              })
        }
    },
    
     computed:{
        VpowerData() {
                    return this.$store.state.btnPowerData;
        },
    },
    mounted(){
        this.zoom = 1;
        this.zoom1 = window.screen.width / 1920 < 0.8 ? 0.8 : window.screen.width / 1920
        setTimeout(()=>{
            $(".search-item").css({marginLeft: 10*this.zoom, height: 40* this.zoom})
            $(".search-select").css({width: 160 * this.zoom, height: 40* this.zoom})
            $(".el-input--suffix").css({fontSize: 16 * this.zoom, height: 40* this.zoom})
            
            if(window.screen.width <= 1280){
                $(".search-item .title").css({maxWidth:'80px', lineHeight: 1})
            }
        })
    this.jurisdiction = this.$store.state.btnPowerData
     this.buttonarr = this.findPathByLeafId(this.GetUrlParam('id'),this.jurisdiction)[0].Children
     console.log("butt",this.buttonarr)
     this.buttonarr.forEach((item)=>{
         if(item.RightName == "报警点管理-查询按钮"){
          this.cxid = item.RightID
         }else if(item.RightName == "报警点管理-保存按钮"){
          this.bcid = item.RightID
         }else if(item.RightName == "报警点管理-导出按钮"){
           this.dcid = item.RightID
         }
     })
     var userid = ''
      if (!JSON.parse(sessionStorage.getItem('userInfo1'))) {
                userid = JSON.parse(
                    sessionStorage.getItem('sightseerInfo1')
                ).SCMSUserID;
            } else {
                userid = JSON.parse(
                    sessionStorage.getItem('userInfo1')
                ).SCMSUserID;
            }
              this.$axios({
                  method: 'post',
                  url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.cxid}`,
              }).then(res => {
                  this.cxshow = res.data.data
                  
              }).catch((err)=>{
                  console.log('err',err)
              })
                 this.$axios({
                  method: 'post',
                  url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.bcid}`,
              }).then(res => {
                  this.bcshow = res.data.data
              }).catch((err)=>{
                  console.log('err',err)
              })
                 this.$axios({
                  method: 'post',
                  url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.dcid}`,
              }).then(res => {
                  this.dcshow = res.data.data
              }).catch((err)=>{
                  console.log('err',err)
              })
    },
    methods: {
        getZoom() {
                     let that = this
            setTimeout(()=>{
for(let i=0;i<$('.el-picker-panel').length;i++){
                $('.el-picker-panel')[i].style.zoom = that.zoom1
            }
            for(let i=0;i<$('.el-select-dropdown').length;i++){
                $('.el-select-dropdown')[i].style.zoom = that.zoom1
            }
            })
            
        },
          findPathByLeafId(id,node,path){
        if(!path){
             path = []
         }
        for(let i=0;i<node.length;i++){
          var temPath = path.concat();
        
          if(id == node[i].RightID){
                temPath.push(node[i])
           return temPath
          }
          if(node[i].Children){
           var findResult = this.findPathByLeafId(id,node[i].Children,temPath)
           if(findResult){
           return findResult
           }
          }
        }
        },
          GetUrlParam(paraName) {
        let url = document.location.toString();
        let arrObj = url.split("?");
        if (arrObj.length > 1) {
            let arrPara = arrObj[1].split("&");
            let arr;
           for(let i=0;i<arrPara.length;i++){
            arr = arrPara[i].split("=");
            if(arr&&arr[0] == paraName){
              
               return arr[1]
            }
           }
           return ''
        }else {
            return ''
        }
          },
        search() {
     
            this.searchData.argAlarmGroupId =   this.searchData.aArrayName;
            this.$emit('setParams', this.searchData,this.cxshow);
          if(this.cxshow){
             this.$parent.req(1);
            }
        },
        exportTable() {
            this.$emit('exportTable',this.dcshow);
        },
           preservation(){
             this.$emit('preservation',this.bcshow);
        },
        change(item, e) {
            console.log(this.searchData);
            console.log(item);
            console.log(e);
             this.searchData.argAlarmGroupId =   this.searchData.aArrayName;
            if (
                item.model === 'argAlarmArray' ||
                item.model === 'aArrayName'
            ) {
                this.$emit('change', e);
            }
        }
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

    &.blackBlueBg{
        .import{
            background: transparent;
            border: 2px solid #4ABFCD;
            color: #4ABFCD;
        }
        .export{
            background: transparent;
            border: 2px solid #FDA100;
            color: #FDA100;
        }
    }
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

        .title{
            line-height: 1;
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
.import {
    position: absolute;
    border: 1px solid #4abfcd;
    background-color: #ffffff;
    width: 120px;
    height: 38px;
    display: block;
    border-radius: 4px;
    text-align: center;
    line-height: 38px;
    cursor: pointer;
    
    color: #4abfcd;
}
.export {
    position: absolute;
    border: 1px solid #fda100;
    background-color: #ffffff;
    width: 120px;
    height: 38px;
    display: block;
    border-radius: 4px;
    text-align: center;
    line-height: 38px;
    cursor: pointer;
    float: left;
    margin-left: 10px;
    color: #fda100;
}
.fr {
    width: 260px;
    height: 100%;
}
.el-select {
    width: 180px;
}
.colordiv{
 background-color: #D9DBDE;
}
</style>
