<!--
 * @Description: 搜索框组件
 * @Date: 2019-11-24 14:57:05
 * @Author: 随风
 * @LastEditors: 随风
 * @LastEditTime: 2019-11-29 16:34:35
 -->
<template>
    <div class="search-container">
        <div class="search-left">
            <div class="search-item" v-for="(item, index) in searchList" :key="index">
                <div
                    class="title"
                    :class="{ mr10: item.title == '至' }"
                    v-if="item.type !== 'key'"
                >{{ item.title }}</div>

                <el-select
                    v-if="item.type === 'select'"
                    clearable
                    filterable
                    v-model="searchData[item.model]"
                    class="search-select"
                    @change="change(item, $event)"
                >
  
                    <!-- <el-option label="全部" value="全部"></el-option> -->
                    <el-option
                        v-for="(options, optionsIndex) in item.optionList"
                        :key="optionsIndex"
                        :label="item.label ? options[item.label] : options"
                        :value="item.value ? options[item.value] : options"
                    ></el-option>
                </el-select>
                                 <div class="cs" v-if="item.title == '任务类型：'"></div>
                <el-date-picker
                    v-if="item.type === 'time'"
                    v-model="searchData[item.model]"
                    type="datetime"
                    :placeholder="lang.SCMSConsoleWebApiMySql_PleChooseDate"
                    default-time="12:00:00"
                     value-format="yyyy-MM-dd HH:mm:ss"
                ></el-date-picker>
                <!-- <span>-</span> -->
                <el-date-picker
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
                    :placeholder="item.placeholder || lang.AlarmRecord_Time_Keyword"
                    clearable
                ></el-input>
            </div>
            <div class="btn" @click="search">{{lang.QualityManage_QualityManageUserControl_Add}}</div>
            <div class="btn change" @click="search1">{{lang.QualityManage_QualityManageUserControl_Modify}}</div>
            <div class="btn del" @click="search3">{{lang.QualityManage_QualityManageUserControl_Delete}}</div>
            <div class="btn add" @click="search2">{{lang.QualityManage_QualityManageUserControl_ViewCurve}}</div>
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
            glxzid:"",
            glxzshow:true,
            glxgid:'',
            glxgshow:true,
            glscid:'',
            glscshow:true,
            xzid:'',
            xzshow:true,
            xgid:'',
            xgshow:true,
            scid:'',
            scshow:true,
            cpkid:'',
            cpkshow:true,
            lang: JSON.parse(localStorage.getItem('languages'))[localStorage.getItem('currentLang')]
        };
    },
     watch:{
        VpowerData(val){
                 this.jurisdiction = this.$store.state.btnPowerData
     this.buttonarr = this.findPathByLeafId(this.GetUrlParam('id'),this.jurisdiction)[0].Children
        console.log("nut",this.buttonarr)
            this.buttonarr.forEach((item)=>{
         if(item.RightName =="检测项目管理-新增"){
          this.glxzid = item.RightID
         }else if(item.RightName == "检测项目管理-修改"){
          this.glxgid = item.RightID
         }else if(item.RightName == "检测项目管理-删除"){
          this.glscid = item.RightID
         }else if(item.RightName == "新增按钮"){
          this.xzid = item.RightID
         }else if(item.RightName == "修改按钮"){
          this.xgid = item.RightID
         }else if(item.RightName == "删除按钮"){
          this.scid = item.RightID
         }else if(item.RightName == "CPK分析"){
          this.cpkid = item.RightID
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
                  url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.glxzid}`,
              }).then(res => {
                  this.glxzshow = res.data.data
              
              }).catch((err)=>{
                  console.log('err',err)
              })
               this.$axios({
                  method: 'post',
                  url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.glxgid}`,
              }).then(res => {
                  this.glxgshow = res.data.data
              
              }).catch((err)=>{
                  console.log('err',err)
              })
                   this.$axios({
                  method: 'post',
                  url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.xgid}`,
              }).then(res => {
                  this.xgshow = res.data.data
              
              }).catch((err)=>{
                  console.log('err',err)
              })
               this.$axios({
                  method: 'post',
                  url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.glscid}`,
              }).then(res => {
                  this.glscshow = res.data.data
              
              }).catch((err)=>{
                  console.log('err',err)
              })
               this.$axios({
                  method: 'post',
                  url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.xzid}`,
              }).then(res => {
                  this.xzshow = res.data.data
              
              }).catch((err)=>{
                  console.log('err',err)
              })
               this.$axios({
                  method: 'post',
                  url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.xgid}`,
              }).then(res => {
                  this.xgid = res.data.data
              
              }).catch((err)=>{
                  console.log('err',err)
              })
               this.$axios({
                  method: 'post',
                  url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.scid}`,
              }).then(res => {
                  this.scshow = res.data.data
              
              }).catch((err)=>{
                  console.log('err',err)
              })
               this.$axios({
                  method: 'post',
                  url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.cpkid}`,
              }).then(res => {
                  this.cpkshow = res.data.data
              
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
    created(){
     this.jurisdiction = this.$store.state.btnPowerData
     this.buttonarr = this.findPathByLeafId(this.GetUrlParam('id'),this.jurisdiction)[0].Children
        console.log("nut",this.buttonarr)
            this.buttonarr.forEach((item)=>{
         if(item.RightName =="检测项目管理-新增"){
          this.glxzid = item.RightID
         }else if(item.RightName == "检测项目管理-修改"){
          this.glxgid = item.RightID
         }else if(item.RightName == "检测项目管理-删除"){
          this.glscid = item.RightID
         }else if(item.RightName == "新增按钮"){
          this.xzid = item.RightID
         }else if(item.RightName == "修改按钮"){
          this.xgid = item.RightID
         }else if(item.RightName == "删除按钮"){
          this.scid = item.RightID
         }else if(item.RightName == "CPK分析"){
          this.cpkid = item.RightID
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
                  url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.glxzid}`,
              }).then(res => {
                  this.glxzshow = res.data.data
              
              }).catch((err)=>{
                  console.log('err',err)
              })
               this.$axios({
                  method: 'post',
                  url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.glxgid}`,
              }).then(res => {
                  this.glxgshow = res.data.data
              
              }).catch((err)=>{
                  console.log('err',err)
              })
                   this.$axios({
                  method: 'post',
                  url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.xgid}`,
              }).then(res => {
                  this.xgshow = res.data.data
              
              }).catch((err)=>{
                  console.log('err',err)
              })
               this.$axios({
                  method: 'post',
                  url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.glscid}`,
              }).then(res => {
                  this.glscshow = res.data.data
              
              }).catch((err)=>{
                  console.log('err',err)
              })
               this.$axios({
                  method: 'post',
                  url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.xzid}`,
              }).then(res => {
                  this.xzshow = res.data.data
              
              }).catch((err)=>{
                  console.log('err',err)
              })
               this.$axios({
                  method: 'post',
                  url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.xgid}`,
              }).then(res => {
                  this.xgid = res.data.data
              
              }).catch((err)=>{
                  console.log('err',err)
              })
               this.$axios({
                  method: 'post',
                  url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.scid}`,
              }).then(res => {
                  this.scshow = res.data.data
              
              }).catch((err)=>{
                  console.log('err',err)
              })
               this.$axios({
                  method: 'post',
                  url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.cpkid}`,
              }).then(res => {
                  this.cpkshow = res.data.data
              
              }).catch((err)=>{
                  console.log('err',err)
              })
    },
    methods: {
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
            this.$emit('setParams',this.xzshow);
            
        },
         search1(){
        this.$emit('confirm',this.xgshow);
        },
         search2(){
        this.$emit('feixi',this.cpkshow);
        },
         search3(){
        this.$emit('deldata',this.scshow);
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
    width: 100%;
    position: relative;
}
span {
    position: absolute;
    left: 315px;
}
.importtant {
    right: 160px;
    position: absolute;
    bottom: 10px;
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
            margin-right: 10px;
        }
    }
    .btn {
        @extend %flex;
        justify-content: center;
        width: 120px;
        cursor: pointer;
        height: 40px;
        border: 2px solid #46be05;
        color: #46be05;
        background-color: #ffffff;
        border-radius: 4px;
        margin-top: 10px;
        font-weight: 600;
        margin-left: 20px;
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
    position: absolute;
    right: 30px;
    bottom: 10px;
    background-color:#79d088 !important;
}
.fr {
    width: 260px;
    height: 100%;
}
.el-select {
    width: 180px;
}
.add{
    background-color: #fff !important;
    color: #4270e4 !important;
    border: 2px solid #4270e4 !important;
    cursor: pointer;
    position: absolute;
    top: 0;
    right: 20px;
}
.del{
   
    cursor: pointer;
    border: 1px solid #999999 !important;
    background-color: #999999 !important;
    color: #fff !important;
}
.cs{
    margin-right: 500px;
    float: left;
    visibility: hidden;
}
.change{
    color: #fda100 !important;
    border: 2px solid #fda100 !important;
}
</style>
