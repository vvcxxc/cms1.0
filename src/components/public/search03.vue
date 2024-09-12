<!--
 * @Description: 搜索框组件
 * @Date: 2019-11-24 14:57:05
 * @Author: 随风
 * @LastEditors: 随风
 * @LastEditTime: 2019-11-29 16:34:35
 -->
<template>
    <div class="search-container search-containersb" :style="[{zoom:a1}]">
        <div class="search-left">
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
                   :style="[{height:40*1+'px'},{fontSize:16*1+'px'},{width:230*1+'px'}]"
                   :placeholder="lang.SCMSConsoleWebApiMySql_PleChooseDate"
                    default-time="12:00:00"
                    @focus="sx"
                        value-format="yyyy-MM-dd HH:mm:ss"
                ></el-date-picker>
				<!-- <span>-</span> -->
                <el-date-picker
                    v-if="item.type === 'datetimerange'"
                    v-model="searchData[item.model]"
                    type="datetimerange"
                   :style="[{height:40*1+'px'},{fontSize:16*1+'px'},{width:230*1+'px'}]"
                    range-separator="-"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    @focus="sx"
                        value-format="yyyy-MM-dd HH:mm:ss"
                ></el-date-picker>
                <el-input
                    v-if="item.type === 'key'"
                     :style="[{height:40*1+'px'},{fontSize:16*1+'px'},{width:275*1+'px'}]"
                    v-model="searchData[item.model]"
                    :placeholder="item.placeholder || lang.AlarmRecord_Time_Keyword"
                    clearable
                ></el-input>
            </div>

            <div class="btn pointer" @click="search"  :style="[{height:40*1+'px'},{fontSize:16*1+'px'},{width:120*1+'px'}]">{{lang.LogManage_LoginRecord_Select}}</div>

        </div>
        <!-- <div class="fr">
            <div class="import">导入</div>
            <div class="export">导出</div>
        </div> -->
    </div>
</template>

<script>
export default {
    props: ['searchList', 'searchData'],
    data() {
        return {
            jurisdiction:[],
            buttonarr:[],
            cxid:'',
            cxshow:true,
            czid:'',
            czshow:true,
             a1:1,
            lang: JSON.parse(localStorage.getItem('languages'))[localStorage.getItem('currentLang')]
        };
    },
     computed:{
        VpowerData() {
                    return this.$store.state.btnPowerData;
        },
    },
      watch: {
         VpowerData(val){
                 this.jurisdiction = this.$store.state.btnPowerData
     this.buttonarr = this.findPathByLeafId(this.GetUrlParam('id'),this.jurisdiction)[0].Children
     console.log('nbb',this.buttonarr)
      this.buttonarr.forEach((item)=>{
         if(item.RightName == "用户登录记录-查询按钮"){
          this.cxid = item.RightID
         }else if(item.RightName == "用户操作记录-查询按钮"){
           this.czid = item.RightID
         }
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
                  url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.czid}`,
              }).then(res => {
                  this.czshow = res.data.data
              
              }).catch((err)=>{
                  console.log('err',err)
              })
      })
         }
      },
    methods: {
                   sx(){
            console.log("吃饭")
            let that = this
            setTimeout(()=>{
for(let i=0;i<$('.el-picker-panel').length;i++){
                $('.el-picker-panel')[i].style.zoom = that.a1
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
            if(this.searchList[2].placeholder=='请输入操作员名'){
               this.$emit('setParams', this.searchData,this.czshow);
            }else{
                 this.$emit('setParams', this.searchData,this.cxshow);
            }
           
            if(this.cxshow||this.czshow){
                  this.$parent.req(1);
            }
          
        },
        exportTable(){
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
    },
    mounted(){
    setTimeout(()=>{
        $(".el-input__icon").css({lineHeight: 40*this.a1+'px'})
    })
           this.jurisdiction = this.$store.state.btnPowerData
     this.buttonarr = this.findPathByLeafId(this.GetUrlParam('id'),this.jurisdiction)[0].Children
     console.log('nbb',this.buttonarr)
      this.buttonarr.forEach((item)=>{
         if(item.RightName == "用户登录记录-查询按钮"){
          this.cxid = item.RightID
         }else if(item.RightName == "用户操作记录-查询按钮"){
           this.czid = item.RightID
         }
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
                  url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.czid}`,
              }).then(res => {
                  this.czshow = res.data.data
              
              }).catch((err)=>{
                  console.log('err',err)
              })
      })
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
span{
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
        // height: 40px;
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
   margin-left: 10px ;
}
.fr {
    width: 260px;
    height: 100%;
}
.el-select{
    width: 280px;
}
</style>
