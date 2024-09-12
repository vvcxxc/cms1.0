<!--
 * @Description: 表格组件
 * @Date: 2019-11-24 14:58:56
 * @Author: 随风
 * @LastEditors: Tao
 * @LastEditTime: 2020-08-06 16:20:05
 -->
<template>
    <div class="table-container table-container1" :class="{blackBlueBg: $store.state.color==='blackBlue'}">
        <el-table
            :data="data"
             highlight-current-row
           
            border
            header-row-class-name="light-blue"
            row-class-name="high-light"
            height="100%"
            width="100%"
            :style="{'font-size': 14*zoom + 'px'}"
             :header-cell-style="{
                background:($store.state.color=='grey')?'#D9DBDE':($store.state.color==='blackBlue' ? '#18254E' : '#5a6c98'),
                color:($store.state.color=='grey')?'#000':'#fff',
                'border-left': $store.state.color==='blackBlue' ? '1px solid #304171' : '1px solid #cccccc',
                 height: 50*zoom+'px',
                'font-size': 14*zoom + 'px',
                 padding:'0'
            }"
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
                :min-width="180*zoom"
                :show-overflow-tooltip="true"
            >
                <template slot-scope="scope">
                    <div class="item">
                        <span
                            class="sad"
                            v-if="scope.row.AlarmState == 3"
                        >{{ computedData(scope.row[key], key) }}
                        </span>
                   
                        <span v-else>{{ computedData(scope.row[key], key) }}</span>
                    </div>
                </template>
            </el-table-column>
                 <el-table-column 
                   prop="Condition" 
                   :label="lang.AlarmRecord_HT_AlarmPointManageUC_Condition"  
                   :min-width="220*zoom"
                   :show-overflow-tooltip="true"
                   >
                   <template slot-scope="scope">
                    <div class="item">
                        <div class="itemcover" v-if="!bjshow" @click="itcover"></div>
                        <select name="" id="" :style="{width:178*zoom+'px',height:30*zoom+'px',fontSize:15*zoom+'px',textIndent:'0.5em'}" v-model="scope.row.Condition" @change="haschange(scope)">
                            <option :value="item" v-for="(item,index) in scope.row.ConditionList" :key="index">{{item}}</option>
                        </select>
                    </div>
                </template>
             </el-table-column>
              <el-table-column 
                  prop="Limit" 
                  :label="lang.AlarmRecord_HT_AlarmPointManageUC_Limit"  
                  :min-width="220*zoom"
                  :show-overflow-tooltip="true">
                   <template slot-scope="scope">
                    <div class="item">
                        <div class="itemcover" v-if="!bjshow" @click="itcover"></div>
                        <input type="text" :style="{width:178*zoom+'px',height:30*zoom+'px',fontSize:15*zoom+'px',textIndent:'0.5em'}" v-model="scope.row.Limit"  @change="haschange(scope)">
                    </div>
                </template>
             </el-table-column>
             <el-table-column 
                prop="Text" 
                :label="lang.AlarmRecord_HT_AlarmPointManageUC_AlarmText"  
                :min-width="220*zoom"
                :show-overflow-tooltip="true">
                   <template slot-scope="scope">
                    <div class="item">
                        <div class="itemcover" v-if="!bjshow" @click="itcover"></div>
                        <input type="text" :style="{width:178*zoom+'px',height:30*zoom+'px',fontSize:15*zoom+'px',textIndent:'0.5em'}" v-model="scope.row.Text" @change="haschange(scope)">
                    </div>
                </template>
             </el-table-column>
            <el-table-column 
                prop="Level" 
                :label="lang.AlarmRecord_HT_AlarmPointManageUC_AlarmLevel"  
                :min-width="220*zoom"
                :show-overflow-tooltip="true">
                   <template slot-scope="scope">
                    <div class="item">
                        <div class="itemcover" v-if="!bjshow" @click="itcover"></div>
                        <select name="" id="" :style="{width:178*zoom+'px',height:30*zoom+'px',fontSize:15*zoom+'px',textIndent:'0.5em'}" v-model="scope.row.Level" @change="haschange(scope)">
                            <option value="H">H</option>
                            <option value="HH">HH</option>
                            <option value="L">L</option>
                            <option value="LL">LL</option>
                        </select>
                    </div>
                </template>
             </el-table-column>
            <el-table-column 
                label="操作" 
                v-for="(item, index) in operation" 
                :key="index"
                :show-overflow-tooltip="true">
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
              changedata:{},
            changedata1:[],
             jurisdiction:[],
            buttonarr:[],
            bjid:"",
            bjshow:'',
            zoom: 1,
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
         if(item.RightName == '报警点管理-编辑表格'){
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
                  url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.bjid}`,
              }).then(res => {
                  this.bjshow = res.data.data
              
              }).catch((err)=>{
                  console.log('err',err)
              })
        }
    },
    mounted(){
        this.zoom = window.screen.width / 1920 < 0.8 ? 0.8 : window.screen.width / 1920
 this.jurisdiction = this.$store.state.btnPowerData
     this.buttonarr = this.findPathByLeafId(this.GetUrlParam('id'),this.jurisdiction)[0].Children
     this.buttonarr.forEach((item)=>{
         if(item.RightName == '报警点管理-编辑表格'){
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
                  url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.bjid}`,
              }).then(res => {
                  this.bjshow = res.data.data
                  
              }).catch((err)=>{
                  console.log('err',err)
              })
    },
    methods: {
        itcover(){
            this.$emit('itcover')
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
        sad(a) {},
        
unique(arr) {
  const res = new Map();
  return arr.filter((arr) => !res.has(arr.ID) && res.set(arr.ID, 1))
},
c1(){
 this.changedata1 = [];
},
          haschange(a){
             
        //     console.log(a.row.Text);
        // this.changedata.AlarmID = a.row.ID;
        //    this.changedata.Number = a.row.Number;
        //    this.changedata.DataType = a.row.DataType;
        //    this.changedata.TagName = a.row.Name;
        //    this.changedata.Condition = a.row.Condition;
        //    this.changedata.Limit = a.row.Limit;
        //    this.changedata.Text = a.row.Text;
        //    this.changedata.Level = a.row.Level;
            this.changedata1.push(a.row);
            this.changedata1 = this.unique(this.changedata1);
            
            console.log(this.changedata1);
            this.$emit('changedata',this.changedata1)
           
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
<style>
.el-tooltip__popper{
    max-width:300px;
    }

</style>
<style lang="scss" scoped>
.table-container {
    height: 100%;
    width: 100%;
}
.item{
    overflow: hidden;
    position: relative;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.table-container .img {
    width: 100px;
    height: 40px;
    border-radius: 10px;
    position: relative;
    display: inline-block;
    margin-left: 10px;
    background-color: #ffffff;
    left: 10px;
    img {
            cursor: pointer;
        width: 32px;
        height: 32px;
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        margin: auto;
    }
   
}
 .look{
        border: 1px solid #4572e4;
    }
.pensoil{
     border: 1px solid #47b6c3;
}
.itemcover{
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
}
// .sad{
//     color: red;
// }
// .sad:hover{
//     color: black;
// }
</style>
