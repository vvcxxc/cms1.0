<!--
 * @Description: 搜索框组件
 * @Date: 2019-11-24 14:57:05
 * @Author: 随风
 * @LastEditors: 随风
 * @LastEditTime: 2019-11-29 16:34:35
 -->
<template>
    <div class="search-container juese" :class="{blackBlueBg: $store.state.color === 'blackBlue'}">
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
                    value-format="yyyy-MM-dd HH:mm:ss"
                    end-placeholder="结束日期"
                ></el-date-picker>
                <el-input
                    v-if="item.type === 'key'"
                    v-model="searchData[item.model]"
                    :placeholder="item.placeholder || lang.AlarmRecord_Time_Keyword"
                    :style="{width: '375px'}"
                    class="role-input"
                    clearable
                ></el-input>
            </div>

            <div class="btn pointer" @click="search">{{lang.RoleManage_Query}}</div>
            <div class="btn pointer add" @click="add">
                <div class="addimg">
                    <img :src="addfile" alt />
                </div>{{lang.RoleManage_Add}}
            </div>
            <!-- <div class="btn pointer export" @click="exportTable">导出</div> -->
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
            addfile: require('../../assets/images/icon_addfile.png'),
                  jurisdiction:[],
            buttonarr:[],
            cxid:'',
            tjid:'',
            bjid:'',
            scid:'',
            cxshow:true,
            tjshow:true,
            bjshow:true,
            scshow:true,
            lang: JSON.parse(localStorage.getItem('languages'))[localStorage.getItem('currentLang')]
        };
    },
        computed:{
        VpowerData() {
                    return this.$store.state.btnPowerData;
        },
    },
      watch:{
            VpowerData(val){
                this.jurisdiction = this.$store.state.btnPowerData
     this.buttonarr = this.findPathByLeafId(this.GetUrlParam('id'),this.jurisdiction)[0].Children
        console.log("nut",this.buttonarr)
        if(this.searchList[0].placeholder== this.lang.RoleManage_QueryInfo){
          this.buttonarr.forEach((item)=>{
              if(item.RightName == '查询按钮'){
                 this.cxid = item.RightID
              }else if(item.RightName == '添加按钮'){
                this.tjid = item.RightID
              }else if(item.RightName == "编辑按钮"){
                this.bjid = item.RightID
              }else if(item.RightName == "删除按钮"){
                this.scid = item.RightID
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
                  url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.tjid}`,
              }).then(res => {
                  this.tjshow = res.data.data
              
              }).catch((err)=>{
                  console.log('err',err)
              })
               this.$axios({
                  method: 'post',
                  url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.bjid}`,
              }).then(res => {
                  this.bjshow = res.data.data
              
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
        }
            }
      },
      created(){
          this.jurisdiction = this.$store.state.btnPowerData
     this.buttonarr = this.findPathByLeafId(this.GetUrlParam('id'),this.jurisdiction)[0].Children
        console.log("nut",this.buttonarr)
          this.buttonarr.forEach((item)=>{
              if(item.RightName == '查询按钮'){
                 this.cxid = item.RightID
              }else if(item.RightName == '添加按钮'){
                this.tjid = item.RightID
              }else if(item.RightName == "编辑按钮"){
                this.bjid = item.RightID
              }else if(item.RightName == "删除按钮"){
                this.scid = item.RightID
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
                  url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.tjid}`,
              }).then(res => {
                  this.tjshow = res.data.data
              
              }).catch((err)=>{
                  console.log('err',err)
              })
               this.$axios({
                  method: 'post',
                  url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.bjid}`,
              }).then(res => {
                  this.bjshow = res.data.data
              
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
            this.$emit('setParams', this.searchData,this.cxshow);
            if(this.cxshow){
          this.$parent.req(1);
            }
          
        },
        add(){
            this.$emit('add',this.tjshow);
        },
        exportTable() {
            this.$emit('exportTable');
        },
        change(item, e) {
            if (
                item.model === 'argAlarmArray' ||
                item.model === 'argAlarmGroupId'
            ) {
                this.$emit('change', e);
            }
        }
    }
};
</script>

<style lang="scss">
    .role-input {
        .el-input__inner {
            height: 40px;
        }
    }
</style>
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
        .add{
            background-color: transparent!important;;
            border: 2px solid #46BE05;
        }
    }
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
            margin-right: 10px;
        }
    }
    .btn {
        @extend %flex;
        justify-content: center;
        width: 120px;
        height: 40px;
        background-color: #4270e4;
        border-radius: 4px;
        color: #fff;
        margin-top: 10px;
        font-weight: 600;
        margin-left: 10px;
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
    margin-left: 10px;
}
.fr {
    width: 260px;
    height: 100%;
}
.el-input {
    width: 300px;
}
.add {
    background-color: #ffffff !important;
    color: #46be05 !important;
    border-radius: 5px;
    position: absolute;
    bottom: 10px;
    right: 20px;
    border: 1px solid #46be05;
}
.addimg {
    img {
        width: 20px;
        position: relative;
        top: 4px;
        right: 1px;
        height: 20px;
    }
}
</style>
