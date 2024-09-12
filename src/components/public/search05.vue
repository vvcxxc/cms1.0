<!--
 * @Description: 搜索框组件
 * @Date: 2019-11-24 14:57:05
 * @Author: 随风
 * @LastEditors: 随风
 * @LastEditTime: 2019-11-29 16:34:35
 -->
<template>
    <div class="search-container" :class="{colordiv:$store.state.color=='grey'}" :style="{lineHeight: 40*1+'px',height: 60*1+'px'}">
        <div class="search-left" :style="[{fontSize:16*1+'px'}]">
            <div class="search-item" v-for="(item, index) in searchList" :key="index">
                <div
                    class="title"
                    :class="{ mr10: item.title == '-' }"
                    v-if="item.type !== 'key'"
                >{{ item.title }}</div>

                <el-select
                    v-if="item.type === 'select'"
                    clearable
                    filterable
                    v-model="searchData[item.model]"
                    class="search-select"
                    :placeholder="lang.SCMSConsoleWebApiMySql_PleChoose"
                    @change="change(item, $event)"
                    @focus="sx()"
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
                    v-if="item.type === 'time'"
                    v-model="searchData[item.model]"
                    type="datetime"
                    @focus="sx()"
                    :placeholder="lang.SCMSConsoleWebApiMySql_PleChooseDate"
                    default-time="12:00:00"
                     value-format="yyyy-MM-dd HH:mm:ss"
                ></el-date-picker>
                <!-- <span>-</span> -->
                <el-date-picker
                    v-if="item.type === 'datetimerange'"
                    v-model="searchData[item.model]"
                    type="datetimerange"
                    @focus="sx()"
                    range-separator="-"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                     value-format="yyyy-MM-dd HH:mm:ss"
                ></el-date-picker>
                <el-input
                    v-if="item.type === 'key'"
                    v-model="searchData[item.model]"
                    :placeholder="lang.AlarmRecord_Time_Keyword"
                    clearable
                    :style="[{fontSize:16*1+'px'},
                        {width: 215*1+'px'},
                        {height: 40*1+'px'}
                    ]"
                ></el-input>
            </div>
            <div class="btn pointer importtant" @click="search" :id="cxid" 
                :style="[{fontSize:16*1+'px'},
                    {height: 40*1+'px'},
                    {width: 100*1+'px'},
                    {marginLeft: 10*1+'px'},
                    {marginTop: 10*1+'px'},
                 ]"
            >{{lang.AlarmRecord_Time_Select}}</div>
            <div class="btn pointer export" @click="confirm" :id="qrid" 
                :style="[
                    {fontSize:16*1+'px'},
                    {height: 40*1+'px'},
                    {width: 100*1+'px'},
                    {marginLeft: 10*1+'px'},
                    {marginTop: 10*1+'px'},
                 ]"
            >{{lang.AlarmRecord_Time_Sure}}</div>
            <div class="allconfim" @click="allconfirm" :id="allqrid" 
                :style="[
                    {fontSize:16*1+'px'},
                    {height: 40*1+'px'},
                    {width: 100*1+'px'},
                     {marginLeft: 10*1+'px'},
                    {marginTop: 10*1+'px'},
                 ]"
            >{{lang.AlarmRecord_Time_AllSure}}</div>
        </div>
        
        <!-- <div class="fr">
            <div class="import">导入</div>
            <div class="export">导出</div>
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
            zoom1:1,
            qrid:'',
            allqrid:'',
            cxshow:true,
            qrshow:true,
            allqrshow:true,
            zoom:1,
            lang: JSON.parse(localStorage.getItem('languages'))[localStorage.getItem('currentLang')]
        };
    },
     watch:{
         ss(){
        //   alert("ss")
         },
        VpowerData(val){
          this.jurisdiction = this.$store.state.btnPowerData
     this.buttonarr = this.findPathByLeafId(this.GetUrlParam('id'),this.jurisdiction)[0].Children
     this.buttonarr.forEach((item)=>{
         if(item.RightName == '实时报警-查询按钮'){
          this.cxid = item.RightID
         }else if(item.RightName == '实时报警-报警确认按钮'){
          this.qrid = item.RightID
         }else if(item.RightName == '实时报警-全部确认按钮'){
           this.allqrid = item.RightID
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
                  url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.qrid}`,
              }).then(res => {
                  this.qrshow = res.data.data
              }).catch((err)=>{
                  console.log('err',err)
              })
                 this.$axios({
                  method: 'post',
                  url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.allqrid}`,
              }).then(res => {
                  this.allqrshow = res.data.data
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
        this.zoom = 1
         this.zoom1 = window.screen.width / 1920 < 0.8 ? 0.8 : window.screen.width / 1920
        setTimeout(()=>{
            $(".search-item").css({marginLeft: 10*this.zoom, marginRight: 0, height: 40* this.zoom})
            $(".el-input__icon").css({lineHeight: 40* this.zoom+'px'})
            $(".search-select").css({width: 120 * this.zoom, height: 40* this.zoom})
            $(".el-date-editor").css({width: 210 * this.zoom, height: 40* this.zoom})
             $(".el-input--suffix").css({fontSize: 16 * this.zoom, height: 40* this.zoom})
            $(".el-select-dropdown__item").css({fontSize: 14 * this.zoom, height: 40* this.zoom})
            // if(window.screen.width <= 1280 &&  localStorage.getItem('currentLang') === 'Main_Language_EN'){
            //     $(".search-container .title").css({maxWidth:'75px', lineHeight: 1})
            // }
        })

    this.jurisdiction = this.$store.state.btnPowerData
     this.buttonarr = this.findPathByLeafId(this.GetUrlParam('id'),this.jurisdiction)[0].Children
     this.buttonarr.forEach((item)=>{
         if(item.RightName == '实时报警-查询按钮'){
          this.cxid = item.RightID
         }else if(item.RightName == '实时报警-报警确认按钮'){
          this.qrid = item.RightID
         }else if(item.RightName == '实时报警-全部确认按钮'){
           this.allqrid = item.RightID
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
                  url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.qrid}`,
              }).then(res => {
                  this.qrshow = res.data.data
              }).catch((err)=>{
                  console.log('err',err)
              })
                 this.$axios({
                  method: 'post',
                  url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.allqrid}`,
              }).then(res => {
                  this.allqrshow = res.data.data
              }).catch((err)=>{
                  console.log('err',err)
              })
    },
    methods: {
                        sx(){
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
        getZoom() {
            var $this = this
            this.$nextTick(() => {
                let dates = [...document.querySelectorAll('.el-picker-panel.el-date-picker')]
                dates.forEach(item => {
                    item.style.transformOrigin =  `-210% -43%`
                    item.style.transform = `scale(${$this.zoom})`
                })
                let drops = [...document.querySelectorAll('.el-select-dropdown.el-popper')]
                drops.forEach(item => {  
                    item.style.zoom = $this.zoom
                })
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
            this.$emit('setParams', this.searchData,this.cxshow);
            if(this.cxshow){
             this.$parent.req(1);
            }
           
        },
          allconfirm(){
        this.$emit('allconfirm',this.allqrshow);
        },
         confirm(){
        this.$emit('confirm',this.qrshow);
        },
        exportTable() {
            this.$emit('exportTable');
        },
        change(item, e) {
            if (
                item.model === 'argAlarmArray' ||
                item.model === 'argAlarmGroupId'
            ) {
                this.$emit('change', e,item);
            }
        }
    }
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
    // width: 1690px;
    position: relative;
}
span {
    position: absolute;
    left: 315px;
}
 
.search-left {
    @extend %flex;
    flex-wrap: wrap;
    margin-bottom: 10px;
    .search-item {
        @extend %flex;
        margin: 10px;
        margin-bottom: 0;
        .mr10 {
            // margin-right: 10px;
            position: relative;
            left: -4px;
        }
    }
    .btn {
        @extend %flex;
        justify-content: center;
        width: 100px;
        height: 40px;
        line-height: initial;
        background-color: #4270e4;
        border-radius: 4px;
        color: #fff;
        margin-top: 10px;
        font-weight: 600;
        margin-left: 10px;
        text-align: center;
    }
}
.import {
    border: 1px solid #fda100;
    background-color: #ffffff;
    width: 120px;
    height: 38px;
    margin-top: 11px;
    display: block;
    border-radius: 4px;
    text-align: center;
    line-height: 38px;
    cursor: pointer;
    float: left;
    color: #fda100;
}
.export {
    // bottom: 10px;
    background-color:#79d088 !important;
}
.fr {
    width: 220px;
    height: 100%;
}
.el-select {
    width: 150px;
}
.colordiv{
 background-color: #D9DBDE;
}
.allconfim{
    width: 100px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    background-color:#ff6600;
     font-weight: 600;
      border-radius: 4px;
      color: #fff;
          cursor: pointer;
}
.el-input__icon{
    line-height: unset;
}
</style>
