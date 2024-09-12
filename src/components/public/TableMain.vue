<!--
 * @Description: 表格组件
 * @Date: 2019-11-24 14:58:56
 * @Author: 随风
 * @LastEditors: 随风
 * @LastEditTime: 2019-11-28 16:08:08
 -->
<template>
    <div class="table-container">
        <el-table
            :data="data"
           :style="{ fontSize: zoom * 15 + 'px', width: '100%' }"
               :row-style="{ height: 50 * zoom + 'px' }" 
            border
              highlight-current-row
                :header-cell-style="{
                    background:
                        $store.state.color == 'grey' ? '#D9DBDE' : '#5a6c98',
                    color: $store.state.color == 'grey' ? '#000' : '#fff',
                    'border-left': '1px solid #cccccc',
                    height: 50 * zoom + 'px',
                    padding: '0'
                }"
            row-class-name="high-light"
            height="100%"
            width="100%"
        >
            <template slot="empty">
                <!-- <no-data :tip="tip" v-if="!tip"></no-data>
                <span v-else-if="tip === 'nodata'">暂无数据</span>-->
                <span>{{lang.SCMSConsoleWebApiMySql_NoData}}</span>
            </template>

            <el-table-column
                v-for="(value, key) in tableHead"
                :key="key"
                :label="value"
                align="left"
            >
                <template slot-scope="scope">
                    <div class="item">
                        <span
                            class="sad"
                            v-if="scope.row.AlarmStateName == lang.AlarmRecord_HT_UnconfirmedUnresumed"
                        >{{ computedData(scope.row[key], key) }}</span>
                        <span v-else>{{ computedData(scope.row[key], key) }}</span>
                    </div>
                </template>
            </el-table-column>
           <el-table-column prop="name" :label="lang.RoleManage_Operation"  :width="200*zoom">
                 <template slot-scope="scope">
                      <div class="img" :style="{zoom}" @click="handleEdit2(scope.$index, scope.row)" v-show="scope.row.UserAccount !== 'SuperAdmin'">
                            <img :src="pensoil" alt />
                            <!-- {{scope.row.phone}} -->
                        </div>
                            <div class="img" :style="{zoom}" @click="handleEdit1(scope.$index, scope.row)"  v-show="scope.row.UserAccount !== 'SuperAdmin'&& scope.row.UserAccount !== 'guest'">
                            <img :src="dell" alt />
                        </div>
                    </template>
             </el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
    props: ['data', 'tableHead', 'operation', 'tip','zoom'],
    data() {
        return {
            pensoil: require('../../assets/images/icon_pensoil.png'),
            dell: require('../../assets/images/icon_dell.png'),
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
        handleEdit1(a,b){
          this.$emit('func',b,this.scshow);
       },
       handleEdit2(a,b){
        this.$emit('funcn',b,this.bjshow);
       },
        computedData(value, key) {
            // if (key === 'AlarmTime' || key === 'RecoverTime') {
            // }
            if (key === 'AlarmState') {
                let stateObj = {
                    0: this.lang.AlarmRecord_HT_ConfirmedRecovery,
                    1: this.lang.AlarmRecord_HT_UnconfirmedResumption,
                    2: this.lang.AlarmRecord_HT_ConfirmedNoRecovered,
                    3: this.lang.AlarmRecord_HT_UnconfirmedUnresumed
                };
                return stateObj[value] || '--';
            }
            if (key === 'DeviceStatus') {
                let statusObj = {
                    1: this.lang.EquipmentAccount_Used,
                    2: this.lang.EquipmentAccount_Stopped,
                    3: this.lang.EquipmentAccount_Abandoned
                };
                return statusObj[value] || '--';
            }
            if (key === 'QualityStatus') {
                let statusObj = {
                    1: this.lang.EquipmentAccount_Inside,
                    2: this.lang.EquipmentAccount_Outside
                };
                return statusObj[value] || '--';
            }
            return value || '--';
        }
    }
};
</script>

<style lang="scss" scoped>
.table-container {
    height: 100%;
    border: 1px solid #cccccc;
    width: 100%;
}
.img{
width: 60px;
height: 30px;
border-radius: 15px;
position: relative;
border: 1px  solid #cccccc;
display: inline-block;
margin-left: 10px;
background-color: #ffffff;
img{
    width: 24px;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    cursor: pointer;
    right: 0;
    margin: auto;
    height: 24px;
}
}
.colordiv {
    background-color: #d9dbde !important;
}
.colortip {
    background-color: #efeff0 !important;
}
// .sad{
//     color: red;
// }
// .sad:hover{
//     color: black;
// }
</style>
