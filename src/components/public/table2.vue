<!--
 * @Description: 表格组件
 * @Date: 2019-11-24 14:58:56
 * @Author: 随风
 * @LastEditors: 随风
 * @LastEditTime: 2019-11-28 16:08:08
 -->
<template>
    <div class="table-container table-container1">
        <el-table
            :data="data"
             highlight-current-row
            border
            header-row-class-name="light-blue"
            row-class-name="high-light"
            height="100%"
            width="100%"
            :style="{'font-size': 14 + 'px'}"
             :header-cell-style="{
                 background:($store.state.color=='grey')?'#D9DBDE':'#5a6c98',
                 color:($store.state.color=='grey')?'#000':'#fff',
                 'border-left':'1px solid #cccccc',
                 height:50 +'px',
                'font-size': 14 + 'px',
                 padding:'0'
                }"
        >
            <template slot="empty">
                <!-- <no-data :tip="tip" v-if="!tip"></no-data>
                <span v-else-if="tip === 'nodata'">暂无数据</span>-->
                <span>{{lang.SCMSConsoleWebApiMySql_NoData}}</span>
            </template>
            <el-table-column prop="name" :label="lang.AlarmRecord_History_Search" :width="200">
                <template slot-scope="scope">
                    <!-- <i class="el-icon-share"></i> -->
                    <div class="img look" @click="handleEdit(scope.$index, scope.row)">
                        <img :src="look" alt />
                        {{scope.row.phone}}
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="name" :label="lang.AlarmRecord_History_Entry" :width="200">
                <template slot-scope="scope">
                    <!-- <i class="el-icon-share"></i> -->
                    <div class="img pensoil" @click="handleEdit1(scope.$index, scope.row)">
                        <img :src="pensoil" alt />
                        {{scope.row.phone}}
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                v-for="(value, key) in tableHead"
                :key="key"
                :label="value"
                align="left"
                 :width="190"
            >
                <template slot-scope="scope">
                    <div class="item">
                        <span
                            class="sad"
                            v-if="scope.row.AlarmState == 3"
                        >{{ computedData(scope.row[key], key) }}</span>
                        <span v-else>{{ computedData(scope.row[key], key) }}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="操作" v-for="(item, index) in operation" :key="index">
                <!-- <div>safa</div> -->
                <!-- <template slot-scope="scope">
					<div class="btn-container">
						<div v-if="(item.title = 'edit')">修改</div>
					</div>
                </template>-->
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
    props: ['data', 'tableHead', 'operation', 'tip'],
    data() {
        return {
            look: require('../../assets/images/icon_look.png'),
            pensoil: require('../../assets/images/icon_pensoil.png'),
            jurisdiction:[],
            buttonarr:[],
            ckid:"",
            ckshow:true,
            bjid:"",
            bjshow:'',
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
     this.buttonarr.forEach((item)=>{
         if(item.RightName == '历史报警-故障快速检索'){
          this.ckid = item.RightID
         }else if(item.RightName == '历史报警-故障处理流程录入'){
              this.bjid = item.RightID
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
                  url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.ckid}`,
              }).then(res => {
                  this.ckshow = res.data.data
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
        }
    },
    mounted(){
        this.jurisdiction = this.$store.state.btnPowerData
     this.buttonarr = this.findPathByLeafId(this.GetUrlParam('id'),this.jurisdiction)[0].Children
     this.buttonarr.forEach((item)=>{
         if(item.RightName == '历史报警-故障快速检索'){
          this.ckid = item.RightID
         }else if(item.RightName == '历史报警-故障处理流程录入'){
              this.bjid = item.RightID
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
                  url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.ckid}`,
              }).then(res => {
                  this.ckshow = res.data.data
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
        handleEdit(a, b) {
            this.$emit('handleEdit', a, b,this.ckshow);
        },
        handleEdit1(a, b) {
            this.$emit('handleEdit1', a, b,this.bjshow);
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
    width: 100%;
}
.table-container .img {
    width: 60px;
    height: 30px;
    border-radius: 5px;
    position: relative;
    display: inline-block;
    margin-left: 35px;
    background-color: #ffffff;
    img {
        width: 24px;
        height: 24px;
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        margin: auto;
    }
}
.look {
    border: 1px solid #4572e4;
}
.pensoil {
    border: 1px solid #47b6c3;
}
// .sad{
//     color: red;
// }
// .sad:hover{
//     color: black;
// }
img{
    cursor: pointer;
}
</style>
