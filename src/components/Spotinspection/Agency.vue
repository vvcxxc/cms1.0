<!--
 * @Description: 点巡检管理待办点巡检界面
 * @Date: 2019-11-25 19:07:09
 * @Author: 随风
 * @LastEditors: Tao
 * @LastEditTime: 2020-08-06 17:53:22
 -->
<template>
    <div class="public-table public-table1" @click="changeselect = false">
          			<div class="loadcover" element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(0, 0, 0, 0.4)"  v-loading="this.$store.state.isShow" v-show="this.$store.state.isShow" style="position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;"></div>
        <div class="boxsad" ref="kongtiao12" v-show="daibang" :style="{zoom}">
            <div
                class="tqw"
            >
                   </div>
                <div class="tiphead"  :class="{colordiv:$store.state.color=='grey'}" >
                    <span  :class="{fcolor:$store.state.color=='grey'}">{{lang.PointInspectionManage_CloseToDoPointPatrolTask}}</span>
                       <img
                    :src="no2"
                    alt
                    class="no"
                    @click.stop="cancel"
                    v-if="$store.state.color=='grey'"
                />
                <img :src="no" alt class="no" @click.stop="cancel" v-else />
                </div>
                <div class="t" >
                    <span class="w">{{lang.MaintenanceManage_Remark}}</span>
                    <textarea name id cols="30" rows="10" :placeholder="lang.MaintenanceManage_InputCloseReason" v-model="gbword"></textarea>
                       <div class="Preservation" @click="gb">{{lang.PopupCommon_Sure}}</div>
                <div class="cancel" @click.stop="cancel">{{lang.PopupCommon_Cancel}}</div>
                </div>
                <!-- <img :src="gth" alt /> -->

             
            </div>
 
        <div class="search-container" :style="{zoom}">
            <span class="title sblx" >{{lang.EquipmentAccount_EquipmentType1}}</span>
            <div class="seleword seleword3" @click.stop="selectword1" >
             <div class="seleword1">
                  {{Meter}}
               <img :src="xiala" alt  />
             </div>
            </div>

            <span class="sp1 tinput title" >{{lang.MaintenanceManage_TaskStatus1}}</span>
            <select v-model="Meter1" >
                <option v-for="(item,index) in ztarr" :key="index" :value="item">{{item}}</option>
            </select>
            <div class="selectword" v-show="changeselect" >
                <el-tree
                    :data="data6"
                    @node-click="handleNodeClic6"
                    node-key="node.id"
                    default-expand-all
                    icon-class="el-icon-arrow-up"
                >
                    <span class="custom-tree-node" slot-scope="{ node, data }">
                        <span>
                            <img v-show="data.file" :src="data.file" alt class="img11" />
                            <i :class="data.icon"></i>
                            {{ node.label }}
                        </span>
                    </span>
                </el-tree>
            </div>

            <span class="sp4 title">{{lang.MaintenanceManage_ThisTimeStartTime1}}</span>

            <el-date-picker
                v-model="value1"
                type="datetime"
                :placeholder="lang.SCMSConsoleWebApiMySql_PleChooseDate"
                value-format="yyyy-MM-dd HH:mm:ss"
                @focus='sx'
            ></el-date-picker>
            <span class="demonstration title" >-</span>
            <el-date-picker
                v-model="value2"
                type="datetime"
                :placeholder="lang.SCMSConsoleWebApiMySql_PleChooseDate"
                value-format="yyyy-MM-dd HH:mm:ss"
               @focus='sx'
            ></el-date-picker>
            <input type="text" :placeholder="lang.AlarmRecord_Time_Keyword" v-model="keyword" :style="{width:155*1+'px',height: 40*1+'px',marginLeft: 10*1+'px',fontSize: 16*1+'px'}"/>
            <div class="sad" @click="sad" :style="{width:120*1+'px',height: 40*1+'px',lineHeight: 40*1+'px',marginLeft: 10*1+'px',fontSize: 16*1+'px'}">{{lang.RoleManage_Query}}</div>
        </div>
        <div class="table-container">
            <el-table
                ref="multipleTable"
                 
                :data="tableData1"
                stripe
                height="100%"
                tooltip-effect="dark"
                :style="{width: 1700*zoom+'px', fontSize: 14*zoom+'px'}"
                border
                highlight-current-row
              :header-cell-style="{background:($store.state.color=='grey')?'#D9DBDE':'#5a6c98',
                    color:($store.state.color=='grey')?'#000':'#fff',
                    'border-left':'1px solid #cccccc',
                    height:50*zoom+'px',
                    fontSize: 14*zoom+'px',
                    padding:'0'}"
            >
                <template slot="empty">
                    <span>{{lang.SCMSConsoleWebApiMySql_NoData}}</span>
                </template>
                <el-table-column :label="lang.NewTrendChart_SingleChartUC_No" :width="100 * zoom" prop="Number"  :show-overflow-tooltip="true" fixed>
                    <template slot-scope="scope">{{ scope.row.Number }}</template>
                </el-table-column>
                <el-table-column prop="name" :label="lang.NewTrendChart_SingleChartUC_Operate" :width="300 * zoom"   fixed>
                    <template slot-scope="scope">
                        <!-- <i class="el-icon-share"></i> -->
                        <div class="img" @click="handleEdit1(scope.$index, scope.row)" :style="{width:60*zoom+'px',height: 30*zoom+'px',lineHeight: 30*zoom+'px',marginLeft: 10*zoom+'px'}">{{lang.MaintenanceManage_Submit}}</div>
                        <div class="img" @click="handleEdit3(scope.$index, scope.row)" :style="{width:60*zoom+'px',height: 30*zoom+'px',lineHeight: 30*zoom+'px',marginLeft: 10*zoom+'px'}">{{lang.MaintenanceManage_Close}}</div>
                        <div class="img" @click="handleEdit(scope.$index, scope.row)" :style="{width:60*zoom+'px',height: 30*zoom+'px',lineHeight: 30*zoom+'px',marginLeft: 10*zoom+'px'}">
                            <img :src="look" alt :style="{width: 24*zoom+'px',height: 24*zoom+'px'}"/>
                            {{scope.row.phone}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="Name" :label="lang.MaintenanceManage_PlanName"  :show-overflow-tooltip="true">
                    <template slot-scope="scope">
                        <div class="item">
                            <span
                                class="sad"
                                v-if="scope.row.Foreground=='#ff0000'"
                            >{{scope.row.Name}}</span>
                            <span v-else>{{scope.row.Name}}</span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="StartTime" :label="lang.ProcessParameterConfigure_ProduceManageUserControl_DataGrid1_PlanningStartTime"  :show-overflow-tooltip="true">
                    <template slot-scope="scope">
                        <div class="item">
                            <span
                                class="sad"
                                v-if="scope.row.Foreground=='#ff0000'"
                            >{{scope.row.StartTime}}</span>
                            <span v-else>{{scope.row.StartTime}}</span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="EndTime" :label="lang.ProcessParameterConfigure_ProduceManageUserControl_DataGrid1_PlanEndTime"  :show-overflow-tooltip="true">
                    <template slot-scope="scope">
                        <div class="item">
                            <span
                                class="sad"
                               v-if="scope.row.Foreground=='#ff0000'"
                            >{{scope.row.EndTime}}</span>
                            <span v-else>{{scope.row.EndTime}}</span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="Status" :label="lang.MaintenanceManage_TaskStatus"  :show-overflow-tooltip="true">
                    <template slot-scope="scope">
                        <div class="item">
                            <span
                                class="sad"
                            v-if="scope.row.Foreground=='#ff0000'"
                            >{{scope.row.Status}}</span>
                            <span v-else>{{scope.row.Status}}</span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="Executor" :label="lang.PointInspectionManage_Inspector"  :show-overflow-tooltip="true">
                    <template slot-scope="scope">
                        <div class="item">
                            <span
                                class="sad"
                            v-if="scope.row.Foreground=='#ff0000'"
                            >{{scope.row.Executor}}</span>
                            <span v-else>{{scope.row.Executor}}</span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="DevicesStr" :label="lang.EquipmentAccount_EquipmentName"  :show-overflow-tooltip="true">
                    <template slot-scope="scope">
                        <div class="item">
                            <span
                                class="sad"
                            v-if="scope.row.Foreground=='#ff0000'"
                            >{{scope.row.DevicesStr}}</span>
                            <span v-else>{{scope.row.DevicesStr}}</span>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="pages-container" :style="{zoom}">
            <div class="page">
                <div class="pageword">
                    {{lang.DataGrid_Reaction_HT_ATotalOf}}
                 <span>{{PageData.TotalCount}}</span>{{lang.DataGrid_Reaction_HT_RecordsAndTheCurrent}}
                    <span>{{PageData.PageIndex}}</span>{{lang.DataGrid_Reaction_HT_Page}}
                    <span>{{PageData.TotalPage}}</span>{{lang.DataGrid_Reaction_HT_RecordsAnd}}
                    <span>{{PageData.PageSize}}</span>{{lang.DataGrid_Reaction_HT_PerPage}}
                </div>
                <div class="pageoperation">
                    <span class="btn" @click="start">{{lang.DataGrid_Reaction_FirstPage}}</span>
                      <span class="btn" :class="{nopage:!PageData.LastEnabled}" @click="abck">{{lang.DataGrid_Reaction_LastPage}}</span>
                 <span class="btn" :class="{nopage:!PageData.NextEnabled}" @click="next">{{lang.DataGrid_Reaction_NextPage}}</span>
                    <span class="btn" @click="end">{{lang.DataGrid_Reaction_EndPage}}</span>
                    <div class="inputnumber">
                        {{lang.DataGrid_Reaction_The}}
                        <input type="text" v-model="nowpage" /> {{lang.DataGrid_Reaction_Page}}
                    </div>

                    <span class="btn" @click="jump">{{lang.DataGrid_Reaction_TurnPage}}</span>
                </div>
            </div>
        </div>
        <div class="sestion" ref="kongtiao1" v-show="setionchange" :style="{width:800*zoom+'px',height: 740*zoom+'px'}">
            <div class="sestionheader"  :class="{colordiv:$store.state.color=='grey'}" :style="{zoom}">
                <div
                    class="sestionheader1"

                ></div>
                <span class="head" v-if="sestion == 1" :class="{fcolor:$store.state.color=='grey'}">{{lang.PointInspectionManage_ViewPointPatrolTaskContent}}</span>
                <span class="head" v-if="sestion == 2" :class="{fcolor:$store.state.color=='grey'}">{{lang.PointInspectionManage_SubmitPointPatrolTaskResult}}</span>
                 <img
                    :src="no2"
                    alt
                    class="no"
                    @click.stop="setionchange = false"
                    v-if="$store.state.color=='grey'"
                />
                <img :src="no" alt class="no" @click.stop="setionchange = false" v-else />
            </div>
            <div class="sestioncontain" :style="{zoom}">
                <div class="homesetion">
                    <div class="hometop">
                        <div>{{lang.PointInspectionManage_PointPatrolInformation}}</div>
                        <div class="line"></div>
                    </div>
                </div>
                <div class="overflow">
                    <div>
                        <div class="fl">
                            <span>{{lang.MaintenanceManage_PlanName}}</span>
                            <input type="text" :value="sesstion.Name" disabled />
                        </div>
                        <div class="fl">
                            <div>
                                <span>{{lang.PointInspectionManage_Inspector}}</span>
                                <input type="text" :value="sesstion.Executor" disabled />
                            </div>
                        </div>
                    </div>
                    <div>
                        <div class="fl">
                            <span class="mi">{{lang.AlarmStatistics_AlarmStatisticsUserControl_StartTime}}</span>
                            <div class="inpimg">
                                <img :src="rili" alt class="inpimg1" />
                                <input type="text" :value="sesstion.StartTime" disabled />
                            </div>
                        </div>
                        <div class="fl">
                            <span>{{lang.AlarmStatistics_AlarmStatisticsUserControl_EndTime}}</span>
                            <div class="inpimg">
                                <img :src="rili" alt class="inpimg1" />
                                <input type="text" :value="sesstion.EndTime" disabled />
                            </div>
                        </div>
                    </div>
                    <div>
                        <span class="rwnr">{{lang.MaintenanceManage_TaskExecutionContent}}</span>
                        <input name id :value="sesstion.Remarks" disabled style="width:610px;margin-bottom:10px"/>
                    </div>
                </div>
                <div class="homesetion">
                    <div class="hometop">
                        <div>{{lang.PointInspectionManage_PatrolInspectionDetails}}</div>
                        <div class="line"></div>
                    </div>
                </div>
                <div class="mx1">
                    <div
                        class="twice"
                        v-for="(item,index) in projectarr"
                        :key="index"
                        :class="{bgcolor:sestion == 2}"
                    >
                        <div class="inptwice">
                            <div class="fl" >
                                <span>{{lang.EquipmentAccount_EquipmentName}}</span>
                                <input type="text" :value="item.DeviceName" disabled />
                            </div>
                            <div class="zr">
                                <span>{{lang.PointInspectionManage_PatrolInspectionItems}}</span>
                                <input type="text" :value="item.StandardName" disabled />
                            </div>
                        </div>
                        <div>

                            <span class="sl" style="display:inline-block;width: 60px;" >{{lang.PointInspectionManage_PointInspectionItems}}</span>

                            <div  v-for="(item1,index1) in item.Projects" :key="index1" style="display: inline-block;width: 85%;float:right;">

                                <div class="mx" v-if="item1.Type==1">
                                    <div class="num">{{item1.Number}}</div>
                                    <div class="nur">
                                        <div class="nurword">{{lang.PointInspectionManage_ItemName}} {{item1.ProjectName}}</div>
                                        <div class="nl">
                                            {{lang.PointInspectionManage_Upper}}
                                            <input type="text" :value="item1.Upper" disabled />
                                        </div>
                                        <div class="nl">
                                            {{lang.PointInspectionManage_Lower}}
                                            <input type="text" :value="item1.Lower" disabled />
                                        </div>
                                        <div class="nl">
                                            {{lang.PointInspectionManage_ReferenceValue}}
                                            <input type="text" :value="item1.Reference" disabled />
                                        </div>
                                        <div class="nl">
                                            {{lang.PointInspectionManage_RealValue}}
                                            <input
                                                type="text"
                                                v-model="item1.Answer"
                                                :disabled="disabled"
                                                class="blueword"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div class="mx" v-if="item1.Type==2">
                                    <div class="num">{{item1.Number}}</div>
                                    <div class="nur">
                                        <div class="nurword">{{lang.PointInspectionManage_ItemName}} {{item1.ProjectName}}</div>
                                        <div>{{item1.Remarks}}</div>
                                        <!-- Referencearr -->
                                        <div>
                                            <el-radio v-model="item1.Answer"   v-for="(item2,index2) in item1.Referencearr" :key="index2" :label="item2"    :disabled="disabled">{{item2}}</el-radio>
                                        
                                            <!-- <el-radio :label="item1.Right">是</el-radio>
                                            <el-radio :label="item1.Right">否</el-radio> -->
                                        </div>

                                    </div>
                                </div>

                                <div class="mx" v-if="item1.Type==3">
                                    <div class="num">{{item1.Number}}</div>
                                    <div class="nur">
                                        <div class="nurword">{{lang.PointInspectionManage_ItemName}} {{item1.ProjectName}}</div>
                                    <div class="nl" style="width:97%">
                                            {{lang.PointInspectionManage_SituationDescription}}
                                            <input style="width:85%" type="text" v-model="item1.Answer"    :disabled="disabled" />
                                        </div>

                                    </div>
                                </div>

                                <div class="mx" v-if="item1.Type==4">
                                    <div class="num">{{item1.Number}}</div>
                                    <div class="nur">
                                        <div class="nurword">{{lang.PointInspectionManage_ItemName}} {{item1.ProjectName}}</div>
                                        <div>{{item1.Remarks}}</div>
                                        
                                        <div>

                                            <el-checkbox  v-for="(item2,index2) in item1.Referencearr" :key="index2" :label="item2"    :disabled="disabled" @change="checked=>ch(index,index1,index2,checked)">{{item2}}</el-checkbox>                       
                                        </div>

                                    </div>
                                </div>


                            </div>
                        </div>
                        
                    </div>
                </div>

                <div class="Preservation" v-if="sestion == 2" @click="preservation6">{{lang.PopupCommon_Sure}}</div>
                <div class="cancel" v-if="sestion == 2 || sestion == 3" @click="cancel">{{lang.PopupCommon_Cancel}}</div>
            </div>
        </div>
        <div class="tip" ref="kongtiao2" v-show="tipchange" :style="{width: 380*zoom+'px',height:220*zoom+'px'}">
            <div
                class="tiphead"
                style="position:absolute;width: 380px;height: 40px;"
            ></div>
            <div
                class="tiptop"
                :style="{zoom}"
            >
                <img :src="gth" alt />
                <span>{{lang.HT_MessageBoxCaption_Tips}}</span>
            </div>
            <div class="tipcontanin" :style="{zoom}">
                <div class="tipword"><span>{{tipword}}</span></div>
                <div class="tipdetermine" @click="tip1" v-if="deltrue">{{lang.MessageBox_Confrim}}</div>
                <div class="delclass" v-if="!deltrue">
                    <div class="one" @click="no1">{{lang.MessageBox_NO}}</div>
                    <div class="two" @click="yes1">{{lang.MessageBox_YES}}</div>
                </div>
            </div>
        </div>
        <div class="cover1" v-if="setionchange" :style="{zoom}"></div>
        <div class="cover3" v-if="cancel1" :style="{zoom}"></div>
        <div class="cover2" v-if="tipchange" :style="{zoom}"></div>
        <div class="cover7" v-if="daibang" :style="{zoom}"></div>
    </div>
</template>

<script>
import MySearch from '../public/search01.vue';
// import MyPage from '../public/Pages.vue';
import XLSX from 'xlsx';
export default {
    components: {
        // MySearch,
        // MyPage
    },
    data() {
        return {
            checked: {},
            value1: new Date(new Date().toLocaleDateString()),
            value2: new Date(
                new Date(new Date().toLocaleDateString()).getTime() +
                    24 * 60 * 60 * 1000 -
                    1
            ),
            deltrue: true,
            actice: '',
            changeselect: false,
            tipword: '',
            tip: {
                DeviceName: '',
                AssetsNo: '',
                Department: '',
                DeviceNo: '',
                DeviceModel: '',
                Manufactor: '',
                Salesman: '',
                DepreciationLife: '',
                PurchaseAmount: '',
                Contact: '',
                Remarks: ''
            },
            pen: {
                DeviceName: '',
                AssetsNo: '',
                Department: '',
                DeviceNo: '',
                DeviceModel: '',
                Manufactor: '',
                Salesman: '',
                DepreciationLife: '',
                PurchaseAmount: '',
                Contact: '',
                Remarks: ''
            },
            projectarr: [],
            sametimearr: ['小时', '天', '周', '月'],
            tableData1: [],
            tipchange: false,
            aid: '',
            gth: require('../../assets/images/gth.png'),
            rili: require('../../assets/images/rili.png'),
            moveDataelse: {
                x: null,
                y: null
            },
            person: ['SuperAdmin', 'Guest'],
            warrantystatus: ['保内', '保外'],
            devicestatus: ['在用', '停用', '报废'],
            data5: [],
            select1: 1,
            person1: 'SuperAdmin',
            warry: '保内',
            device: '在用',
            searchData: {
                argDeviceType: '',
                argKeyword: ''
            },
            time1: '',
            time2: '',
            time3: '',
            a1: 1,
            a2: 1,
            PageData: {
                PageSize: 50,
                TotalCount: 0,
                TotalPage: 1,
                PageIndex: 1,
                LastEnabled: false,
                NextEnabled: false
            },
            aaa: false,
            daibang: false,
            bbb: false,
            nowpage: 1,
            outputs: [],
            tableData: [],
            multipleSelection: [],
            excelData: [],
            selectname: [],
            selectname1: [],
            cancel1: false,
            Meter: '',
            Meterid: '',
            Meter1: '不限',
            Meter2: '不限',
            look: require('../../assets/images/icon_look.png'),
            no: require('../../assets/images/no.png'),
            no2: require('../../assets/images/no2.png'),
            pensoil: require('../../assets/images/icon_pensoil.png'),
            diji: require('../../assets/images/icon_diji.png'),
            change: false,
            keyword: '',
            sesstion: '',
            disabled: '',
            pagesize: 50,
            pageindex: 1,
            sestion: 1,
            hastip: 1,
            sbnum: 1,
            time4: '',
            muchdata: '',
            a: 1,
            data6: [],
            longinnum: '',
            deldata: {},
            delarray: [],
            yesdel: '',
            gbword: '',
            oldName: '',
            antable:[],
            ztarr: ['不限', '未开始','进行中','已延误'],
            leixinarr: ['不限', '计划维修', '故障维修'],
            setionchange: false,
            nowIndex: 1,
            cxid:'',
            cxshow:true,
            ckid:'',
            ckshow:true,
            tjid:'',
            tjshow:true,
                  xiala:require('../../assets/images/ziyuan4.png'),
            gbid:'',
            gbshow:true,
            pageDate: {
                pageIndex: 1,
                pagesize: 50,
                togeIndex: 0,
                togesize: 0
            },
            zoom: 1,
            lang: JSON.parse(localStorage.getItem('languages'))[localStorage.getItem('currentLang')]
        };
    },
    watch: {
         VpowerData(val){
              this.jurisdiction = this.$store.state.btnPowerData
     this.buttonarr = this.findPathByLeafId(this.GetUrlParam('id'),this.jurisdiction)[0].Children
        this.buttonarr.forEach((item)=>{
         if(item.RightName == "代办点巡检-查询按钮"){
          this.cxid = item.RightID
         }else if(item.RightName == "代办点巡检-提交按钮"){
          this.tjid = item.RightID
         }else if(item.RightName == "代办点巡检-关闭按钮"){
          this.gbid = item.RightID
         }else if(item.RightName == "代办点巡检-查看按钮"){
          this.ckid = item.RightID
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
                  url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.gbid}`,
              }).then(res => {
                  this.gbshow = res.data.data
              
              }).catch((err)=>{
                  console.log('err',err)
              })
                this.$axios({
                  method: 'post',
                  url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.ckid}`,
              }).then(res => {
                  this.ckshow = res.data.data
              
              }).catch((err)=>{
                  console.log('err',err)
              })
         }
         
    },
    created() {
        this.getLangData()
                 this.jurisdiction = this.$store.state.btnPowerData
     this.buttonarr = this.findPathByLeafId(this.GetUrlParam('id'),this.jurisdiction)[0].Children
        this.buttonarr.forEach((item)=>{
         if(item.RightName == "代办点巡检-查询按钮"){
          this.cxid = item.RightID
         }else if(item.RightName == "代办点巡检-提交按钮"){
          this.tjid = item.RightID
         }else if(item.RightName == "代办点巡检-关闭按钮"){
          this.gbid = item.RightID
         }else if(item.RightName == "代办点巡检-查看按钮"){
          this.ckid = item.RightID
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
                  url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.gbid}`,
              }).then(res => {
                  this.gbshow = res.data.data
              
              }).catch((err)=>{
                  console.log('err',err)
              })
                this.$axios({
                  method: 'post',
                  url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.ckid}`,
              }).then(res => {
                  this.ckshow = res.data.data
              
              }).catch((err)=>{
                  console.log('err',err)
              })
        this.getEquipmentType();
        this.req(1);
        this.time4 = this.getNowTime();
    },
        computed:{
        VpowerData() {
                    return this.$store.state.btnPowerData;
        },
    },
    methods: {
        getLangData() {
            this.sametimearr =  [this.lang.HMI_HT_LineChartWindowViewModel_Hour, this.lang.MaintenanceManage_Day, this.lang.HMI_HT_LineChartWindowViewModel_Week, this.lang.HMI_HT_LineChartWindowViewModel_Month]
            this.warrantystatus = [this.lang.EquipmentAccount_Inside, this.lang.EquipmentAccount_Outside]
            this.devicestatus = [this.lang.EquipmentAccount_Used, this.lang.EquipmentAccount_Stopped, this.lang.EquipmentAccount_Abandoned]
            this.warry = this.lang.EquipmentAccount_Inside
            this.device = this.lang.EquipmentAccount_Used
            this.Meter1 = this.lang.AlarmRecord_HT_Unlimited
            this.Meter2 = this.lang.AlarmRecord_HT_Unlimited
            this.ztarr = [this.lang.AlarmRecord_HT_Unlimited, this.lang.MaintenanceManage_NotStarted, this.lang.MaintenanceManage_Ongoing, this.lang.MaintenanceManage_Delayed]
            this.leixinarr = [this.lang.AlarmRecord_HT_Unlimited, this.lang.RepairManage_PlanRepair, this.lang.RepairManage_FaultRepair]
        },
        ch(a,b,c,d){
            if(d){
          this.projectarr[a].Projects[b].check[c] = 1
            }else{
             this.projectarr[a].Projects[b].check[c] = 0
            }
            console.log(this.projectarr)
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
        handleNodeClic6(data) {
            this.Meter = data.label;
            this.Meterid = data.NID;
            this.changeselect = false;
        },
        tip1() {
            if(this.tipword == this.lang.SCMSConsoleWebApiMySql_TimeFormatIsIncorrect){
                    this.value1=new Date(new Date().toLocaleDateString());
            this.value2=new Date(
                new Date(new Date().toLocaleDateString()).getTime() +
                    24 * 60 * 60 * 1000 -
                    1
                      );
            }
            this.tipchange = false;
        },
        gb() {
            this.$axios
                .post(
                    `/api/PointInspectionManage/PointInspectionManage_CloseTask?argTaskID=${this.aid}&argCloseRemarks=${this.gbword}`
                )
                .then(res => {
                    console.log(res);
                    (this.tipword = this.lang.MaintenanceManage_ClosedSuccessfully), (this.daibang = false);
                      setTimeout(() => {
             this.tipchange = true;
                this.move('tip', 'tiphead');
            });
                    this.sad(1);
                    this.gbword = ''
                });
        },
        mouseDownHandleelse12(event) {
            event.currentTarget.style.cursor = 'move';
            window.onmousemove = this.mouseMoveHandleelse12;
        },
        mouseMoveHandleelse12(event) {
            let moveLeft = event.pageX - 250 + 'px';
            let moveTop = event.pageY - 30 + 'px';
            this.$refs.kongtiao12.style.left = moveLeft;
            this.$refs.kongtiao12.style.top = moveTop;
        },
        mouseUpHandleelse12(event) {
            window.onmousemove = null;
            event.currentTarget.style.cursor = 'move';
        },
        mouseDownHandleelse(event) {
            event.currentTarget.style.cursor = 'move';
            window.onmousemove = this.mouseMoveHandleelse;
        },
        mouseDownHandleelse1(event) {
            event.currentTarget.style.cursor = 'move';
            window.onmousemove = this.mouseMoveHandleelse1;
        },
        mouseDownHandleelse2(event) {
            event.currentTarget.style.cursor = 'move';
            window.onmousemove = this.mouseMoveHandleelse2;
        },
        mouseMoveHandleelse(event) {
            let moveLeft = event.pageX - 350 + 'px';
            let moveTop = event.pageY - 30 + 'px';
            this.$refs.kongtiao.style.left = moveLeft;
            this.$refs.kongtiao.style.top = moveTop;
        },
        mouseMoveHandleelse1(event) {
            let moveLeft = event.pageX - 750 + 'px';
            let moveTop = event.pageY - 30 + 'px';
            this.$refs.kongtiao1.style.left = moveLeft;
            this.$refs.kongtiao1.style.top = moveTop;
        },
        mouseMoveHandleelse2(event) {
            let moveLeft = event.pageX - 190 + 'px';
            let moveTop = event.pageY - 20 + 'px';
            this.$refs.kongtiao2.style.left = moveLeft;
            this.$refs.kongtiao2.style.top = moveTop;
        },
        mouseUpHandleelse(event) {
            window.onmousemove = null;
            event.currentTarget.style.cursor = 'move';
        },
        mouseUpHandleelse1(event) {
            window.onmousemove = null;
            event.currentTarget.style.cursor = 'move';
        },
        mouseUpHandleelse2(event) {
            window.onmousemove = null;
            event.currentTarget.style.cursor = 'move';
        },
        handleNodeClick(data) {
            if (this.select1 == 1) {
                this.Preservation1 = data.label;
            } else if (this.select1 == 2) {
                this.Preservation5 = data.label;
            }
        },
        handleNodeClick1(data) {
            if (this.select1 == 1) {
                this.pen.DeviceType = data.label;
            } else if (this.select1 == 2) {
                this.pen.InstallationLocation = data.label;
            }
        },
        importfxx(obj) {
            console.log(obj);
        },
        cancel() {
            this.change = false;
            this.setionchange = false;
            this.daibang = false;
            this.gbword = ''
                let ss = JSON.stringify(this.antable);
            this.tableData1 = JSON.parse(ss);
        },

        handleEdit(a, b) {
              if(!this.ckshow){
               this.tipword = this.lang.NoOperationAuthority;
                 setTimeout(() => {
             this.tipchange = true;
                this.move('tip', 'tiphead');
            });
               return
            }
            console.log(a);
            console.log(b);
            b.Devices.forEach((item)=>{
                item.Projects.forEach((items)=>{
                     if(items.Type==2){
                         items.Right = null
                         items.Referencearr = items.Reference.split('|')
                     }else if(items.Type==4){
                         
                         items.Referencearr = items.Reference.split('|')
                        //  if(!items.Answer){
                               items.check = []
                              items.Referencearr.forEach((item2)=>{
                                    items.check.push(0)
                              })
                           
                        //  }else{
                        //      let arr = items.Right.split('|')
                        //      console.log('kkk',items.check,items.Right)
                        //      items.check = []
                        //      items.Referencearr.forEach((item2)=>{
                        //         items.check.push(arr.some(_=>_==item2)?1:0)
                        //      })
                        //  }
                     }
                     
                })
            })
              setTimeout(() => {
               this.setionchange = true;
                this.move('sestion', 'sestionheader1');
            });
            this.sestion = 1;
            this.disabled = true;
            this.sesstion = b;
            this.projectarr = b.Devices;
            console.log('sszz==>',a,b)

        },
        handleEdit3(a, b) {
               if(!this.gbshow){
               this.tipword = this.lang.NoOperationAuthority;
                 setTimeout(() => {
             this.tipchange = true;
                this.move('tip', 'tiphead');
            });
               return
            }
             setTimeout(() => {
              this.daibang = true;
                this.move('boxsad', 'tqw');
            });

            this.aid = b.ID;
            // this.change11 = true;
        },
        handleEdit1(a, b) {
            
            if(!this.tjshow){
               this.tipword = this.lang.NoOperationAuthority;
                 setTimeout(() => {
             this.tipchange = true;
                this.move('tip', 'tiphead');
            });
               return
            }
            console.log(a);
            console.log(b);
                  b.Devices.forEach((item)=>{
                item.Projects.forEach((items)=>{
                     if(items.Type==2){
                         items.Right = null
                         items.Referencearr = items.Reference.split('|')
                     }else if(items.Type==4){
                         items.Referencearr = items.Reference.split('|')
                        //  if(!items.Right){
                              items.check = []
                             items.Referencearr.forEach((item2)=>{
                                items.check.push(0)
                             })
                            
                        //  }else{
                        //      let arr = items.Right.split('|')
                        //      console.log('kkk',items.check,items.Right)
                        //      items.check = []
                        //      items.Referencearr.forEach((item2)=>{
                        //         items.check.push(arr.some(_=>_==item2)?1:0)
                        //      })
                        //  }
                     }
                     
                })
            })
              setTimeout(() => {
               this.setionchange = true;
                this.move('sestion', 'sestionheader1');
            });
            this.sestion = 2;
            this.disabled = false;
            this.sesstion = b;
            this.projectarr = b.Devices;
            console.log(this.projectarr);
            
        },
        getNowTime() {
            let date = new Date();
            let y = date.getFullYear();
            let MM = date.getMonth() + 1;
            MM = MM < 10 ? '0' + MM : MM;
            let d = date.getDate();
            d = d < 10 ? '0' + d : d;
            let h = date.getHours();
            h = h < 10 ? '0' + h : h;
            let m = date.getMinutes();
            m = m < 10 ? '0' + m : m;
            let s = date.getSeconds();
            s = s < 10 ? '0' + s : s;
            return y + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s;
        },

        selectword1() {
            let i = 0;
            let j = 1;
            for (i in this.selectname) {
                if (this.a1 == 1) {
                    if (this.selectname[i].NodeName == this.lang.EquipmentAccount_EquipmentType) {
                        this.selectname[i].NID =
                            '11111111-1111-1111-1111-111111111111';
                    }
                    this.a1 = 2;
                }

                this.selectname[i].id = this.selectname[i].NID;
                this.selectname[i].label = this.selectname[i].NodeName;
                this.selectname[i].children = [];
                for (j in this.selectname) {
                    if (this.selectname[i].NID == this.selectname[j].FatherID) {
                        this.selectname[i].children.push(this.selectname[j]);
                    }
                    if (this.selectname[i].children.length !== 0) {
                        this.selectname[
                            i
                        ].file = require('../../assets/images/icon_file.png');
                    }
                }
            }
            this.data6 = [];
            this.data6.push(this.selectname[0]);
              $(`.selectword`).css({
                left:
                    $('.sblx')[0].offsetLeft + $('.sblx')[0].clientWidth + 'px',
                top:
                    $('.seleword3')[0].offsetTop +
                    $('.seleword3')[0].clientHeight +
                    'px'
            });
            this.changeselect = !this.changeselect;
        },
        cancel2() {
            if (this.Preservation == this.lang.EquipmentAccount_EquipmentType) {
                this.Preservation = this.lang.EquipmentAccount_ClickSelect;
            } else if (this.Preservation5 == this.lang.EquipmentAccount_InstallPosition) {
                this.Preservation5 = this.lang.EquipmentAccount_ClickSelect;
            } else {
                this.cancel1 = false;
            }
            this.cancel1 = false;
        },
       start() {
            this.PageData.PageIndex = 1;
            this.onetable();
        },
        abck() {
            if ((1 < this.PageData.PageIndex) &&(  this.PageData.PageIndex!==1)) {
                this.PageData.PageIndex--;

                this.onetable();
            }
        },
      next() {
            if ((this.PageData.PageIndex <  this.PageData.TotalPage)&&(this.PageData.PageIndex!==this.PageData.TotalPage)) {
                this.PageData.PageIndex++;
                this.onetable();
            }
        },
        end() {
            this.PageData.PageIndex = this.PageData.TotalPage;
            this.onetable();
        },
        onetable() {
            let c = this.Meter;
            if (this.Meterid == '11111111-1111-1111-1111-111111111111') {
                c = '';
            } else {
                c = this.Meter;
            }
            let a = this.Meter1;

            if (a == this.lang.MaintenanceManage_Closed) {
                a = 4;
            } else if (a == this.lang.MaintenanceManage_Completed) {
                a = 5;
            } else if (a == this.lang.MaintenanceManage_TimeoutCompleted) {
                a = 6;
            } else if (a == this.lang.AlarmRecord_HT_Unlimited) {
                a = '';
            } else if (a == this.lang.MaintenanceManage_Expired) {
                a = 7;
            } else if (a == this.lang.MaintenanceManage_NotStarted) {
                a = 0;
            } else if (a == this.lang.MaintenanceManage_Ongoing) {
                a = 2;
            } else if (a == this.lang.MaintenanceManage_Delayed) {
                a = 3;
            } else if (a == this.lang.MaintenanceManage_Expired) {
                a = 7;
            }

            this.$axios
                .post(
                    `/api/PointInspectionManage/PointInspectionManage_GstTask?argDeviceType=${c}&argStartTime=${this.value1}&argTaskStatus=${a}&argEndTime=${this.value2}&argKeyword=${this.keyword}&argPageSize=${this.PageData.PageSize}&argPageIndex=${this.PageData.PageIndex}`
                )
                .then(res => {
                    console.log(res)
                     if (res.data.code == 0) {
                        this.tableData1 = res.data.data.DataList;
                        this.PageData = res.data.data.ParameterList;
                    let i = 0;
                    for (i in this.tableData1) {
                        this.tableData1[i].StartTime = this.gettime(
                            this.tableData1[i].StartTime
                        );
                        this.tableData1[i].EndTime = this.gettime(
                            this.tableData1[i].EndTime
                        );
                        let a = i;
                        this.tableData1[i].Number = ++a;
                        if (this.tableData1[i].Status == 4) {
                            this.tableData1[i].Status = this.lang.MaintenanceManage_Closed;
                        } else if (this.tableData1[i].Status == 5) {
                            this.tableData1[i].Status = this.lang.MaintenanceManage_Completed;
                        } else if (this.tableData1[i].Status == 6) {
                            this.tableData1[i].Status = this.lang.MaintenanceManage_TimeoutCompleted;
                        } else if (this.tableData1[i].Status == 7) {
                            this.tableData1[i].Status = this.lang.MaintenanceManage_Expired;
                        } else if (
                            this.tableData1[i].Status == 1 ||
                            this.tableData1[i].Status == 0
                        ) {
                            this.tableData1[i].Status = this.lang.MaintenanceManage_NotStarted;
                        } else if (this.tableData1[i].Status == 2) {
                            this.tableData1[i].Status = this.lang.MaintenanceManage_Ongoing;
                        } else if (this.tableData1[i].Status == 3) {
                            this.tableData1[i].Status = this.lang.MaintenanceManage_Delayed;
                        }
                    }
                     }else{
                        setTimeout(() => {
             this.tipchange = true;
                this.move('tip', 'tiphead');
            });
                        this.tipword = res.data.msg;
                        this.tableData1 = [];
                        this.PageData ={
                            PageSize: 50,
                            TotalCount: 0,
                            TotalPage: 1,
                            PageIndex: 1,
                            LastEnabled: false,
                            NextEnabled: false
                        };
                     }
                  
                   this.nowpage = this.PageData.PageIndex;
                     let avc = JSON.stringify(this.tableData1);
                    this.antable = JSON.parse(avc);
                    console.log(res);
                });
        },
        gettime(val) {
            var date = new Date(
                parseInt(val.replace('/Date(', '').replace(')/', ''), 10)
            );
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
          isPositiveInteger(s) {
            //是否为正整数
            var re = /^[0-9]+$/;
            return re.test(s);
        },
       jump() {
            if (!this.isPositiveInteger(this.nowpage)) {
                  setTimeout(() => {
             this.tipchange = true;
                this.move('tip', 'tiphead');
            });
                this.tipword = this.lang.RoleManage_HT_PEAPositiveInteger;
                  setTimeout(() => {
             this.tipchange = true;
                this.move('tip', 'tiphead');
            });
                return;
            } else {
                if (
                    this.nowpage !== 1 &&
                    this.nowpage !== this.PageData.TotalPage
                ) {
                    if (
                        this.nowpage < 1 ||
                        this.nowpage > this.PageData.TotalPage
                    ) {
                        this.tipword = this.lang.DataGrid_Reaction_HT_PEThePageNumber;
                          setTimeout(() => {
             this.tipchange = true;
                this.move('tip', 'tiphead');
            });
                        return;
                    }
                }
            }

            this.PageData.PageIndex = this.nowpage;
            this.onetable();
        },
        sad(a) {
            if(!this.cxshow&&a!==1){
             setTimeout(() => {
             this.tipchange = true;
                this.move('tip', 'tiphead');
            });
                this.tipword =this.lang.NoOperationAuthority;
                return
            }
            if (
                new Date(this.value1).getTime() >
                new Date(this.value2).getTime()
            ) {
                  setTimeout(() => {
             this.tipchange = true;
                this.move('tip', 'tiphead');
            });
                this.tipword = this.lang.AlarmRecord_HT_TheQueryDate;
                return
            }
            this.onetable();
        },
        setParams(params) {
            this.searchData = params;
        },
                  sx(){
            let that = this
            setTimeout(()=>{
for(let i=0;i<$('.el-picker-panel').length;i++){
                $('.el-picker-panel')[i].style.zoom = that.zoom
            }
            })
                  },
        preservation6() {
            let i = 0;
            let a = [];
           
            let c = 0;
            for (c in this.projectarr) {
                for (i in this.projectarr[c].Projects) {
                     let b = {
                Answer:"",
                ProjectID:""
            };
                    b.ProjectID = this.projectarr[c].Projects[i].PID;
                   
                    b.Answer = this.projectarr[c].Projects[i].Answer;
                     if(this.projectarr[c].Projects[i].Type==2){
                        if(this.projectarr[c].Projects[i].Answer=='是'){
                            b.Answer = '10'
                        }else  if(this.projectarr[c].Projects[i].Answer=='否'){
                             b.Answer = '01'
                        }
                    }
                     if(this.projectarr[c].Projects[i].Type==4){
                        console.log('mmm', this.projectarr[c].Projects[i].check)
                       b.Answer = ''
                       b.Answer = this.projectarr[c].Projects[i].check.toString().replace(/,/g, "")
                    }
                    console.log(b)
                    a.push(b)
                }
            }

            console.log(a);
            console.log(this.projectarr);
            console.log(this.sesstion.ID);
            this.$axios({
                method: 'post',
                url: `/api/PointInspectionManage/PointInspectionManage_FinishTask`,
                data: {
                    TaskID: this.sesstion.ID,
                    ProjectAnswerGroup: a
                }
            }).then(res => {
                  setTimeout(() => {
             this.tipchange = true;
                this.move('tip', 'tiphead');
            });
                console.log(res);
                if (res.data.code !== 0) {
                    this.tipword = res.data.msg;
                } else {
                    this.tipword = this.lang.MaintenanceManage_SubmittedSuccessfully;

                    this.sad(1);
                    this.cancel();
                }
                a = [];
            });
        },
        anythingdata() {
            let rang = this.Meter;
            if (this.Meterid == '11111111-1111-1111-1111-111111111111') {
                rang = '';
            }
            this.$axios({
                method: 'post',
                url: `/api/EquipmentAccount/EquipmentAccount_GstEquipment?argDeviceType=${rang}&argKeyword=${this.keyword}&argPageSize=${this.pageData.TotalCount}&argPageIndex=${this.pageindex}`
            })
                .then(res => {
                    let i = 0;
                    for (i in res.data.data.DataList) {
                        res.data.data.DataList[i].number = ++i;
                    }
                    this.muchdata = res.data.data.DataList;
                })
                .catch(function(error) {
                    console.log(error);
                });
        },
        // 获取所有设备类型和安装位置
        getEquipmentType() {
            this.$axios
                .post(`/api/EquipmentAccount/EquipmentAccount_GstEquipmentType`)
                .then(res => {
                    this.a1 = 1;
                    this.a2 = 1;
                    this.selectname1 = [
                        ...res.data.data.filter(val => {
                            return val.NodeType === 2;
                        })
                    ];
                    this.selectname = [
                        ...res.data.data.filter(val => {
                            return val.NodeType === 1;
                        })
                    ];
                    this.selectname.unshift({
                        NodeName: this.lang.EquipmentAccount_EquipmentType
                    });
                    this.selectname1.unshift({
                        NodeName: this.lang.EquipmentAccount_InstallPosition
                    });
                })
                .then(() => {
                    this.somethingdata();
                })
                .catch(err => {});
        },
        req(pageIndex) {
            let params = Object.assign(this.searchData, {
                argPageIndex: pageIndex,
                argPageSize: this.PageData.PageSize
            });
            this.$axios
                .post(
                    `/api/EquipmentAccount/EquipmentAccount_GstEquipment`,
                    null,
                    {
                        params
                    }
                )
                .then(res => {
                    if (res.data.code == 0) {
                        this.data = res.data.data.DataList;
                        this.PageData = res.data.data.ParameterList;
                    }
                    this.pageindex = pageIndex;
                    this.pagesize = this.PageData.PageSize;
                })
                .then(() => {
                    this.somethingdata();
                })
                .catch(err => {});
        },
               move(name, namehead) {
          //  $(`.${name}`).addClass('center')
           let left = ($(`.${name}`).width())/2+'px'
           let top = ($(`.${name}`).height())/2+'px'
             $(`.${name}`)[0].style.left = `calc(50% - ${left})`;
           $(`.${name}`)[0].style.top = `calc(50% - ${top})`;
            $(`.${name}`)[0].addEventListener('mousedown', function(e) {
                
                console.log(e.target.className.toLocaleLowerCase());
                console.log(namehead)
                if (e.target.className.toLocaleLowerCase() == namehead) {
                    $(`.${name}`).removeClass('center')
                    window.event.stopPropagation();
                    var x = 0;
                    var y = 0;
                    var l = 0;
                    var t = 0;
                    var isDown = false;
                    x = window.event.clientX;
                    y = window.event.clientY;
                    //获取左部和顶部的偏移量
                    l = $(`.${name}`)[0].offsetLeft;
                    t = $(`.${name}`)[0].offsetTop;
                    //开关打开
                    isDown = true;
                    var pdmove = false;

                     
                    //设置样式
                    $('body')[0].style.cursor = 'move';

                    $('body')[0].addEventListener('mousemove', function(e) {
                        pdmove = true;
                        if (isDown == false) {
                            return;
                        }
                        //获取x和y
                        var nx = window.event.clientX;
                        var ny = window.event.clientY;

                        //计算移动后的左偏移量和顶部的偏移量
                        var nl = nx - (x - l);
                        var nt = ny - (y - t);
                        console.log(nx)
                        console.log(x)
                        console.log(l)
                        $(`.${name}`)[0].style.left = nl + 'px';
                        $(`.${name}`)[0].style.top = nt + 'px';
                    });
                    $('body')[0].addEventListener('mouseup', function(e) {
                        //开关关闭
                        isDown = false;
                        $('body')[0].style.cursor = 'default';
                    });
                }
            });
        },
        getsetime() {
            this.$axios
                .post(
                    `/api/PointInspectionManage/PointInspectionManage_GstTaskInitTime`
                )
                .then(res => {
                    console.log('sss', res);
                    this.value1 = res.data.data.StartTime;
                    this.value2 = res.data.data.EndTime;
                    let a = new Date(
                        new Date(new Date().toLocaleDateString()).getTime() +
                            24 * 60 * 60 * 1000 -
                            1
                    ).getTime();
                    if (new Date(this.value2).getTime() < a) {
                        this.value2 = this.GMTToStr(
                            new Date(
                                new Date().toLocaleDateString()
                            ).getTime() +
                                24 * 60 * 60 * 1000 -
                                1
                        );
                    }
                })
                .then(() => {
                    this.sad(1);
                })
                .catch(() => {
                    this.value1 = this.GMTToStr(this.value1);
                    this.value2 = this.GMTToStr(this.value2);
                    this.sad(1);
                });
        }
    },
    mounted() {
        this.value1 = this.GMTToStr(this.value1);
        this.value2 = this.GMTToStr(this.value2);
        this.getsetime();

        this.zoom = window.screen.width / 1920 < 0.76 ? 0.76 : window.screen.width / 1920
        setTimeout(()=>{
            if(window.screen.width <= 1280 &&  localStorage.getItem('currentLang') === 'Main_Language_EN'){
                $(".search-container .title").css({maxWidth:'75px', lineHeight: 1})
            }
            $(".el-date-editor--datetime>.el-input__inner").css({height: 40+'px', lineHeight: 40+'px' })
          
        })
    }
};
</script>

<style lang="scss" scoped>
.public-table1{

    .el-radio__label{
        padding-left:5px;
    }

}

</style>

<style lang='scss' scoped>
select {
    background-color: #fff;
}
.box {
    position: relative;
    top: 10px;
    left: 95px;
}
.sp6 {
    position: relative;
    top: -10px;
}
.inpimg {
    position: relative;
    display: inline-block;
}
.inpimg1 {
    width: 24px;
    height: 24px;
    position: absolute;
    right: 8px;
    top: 5px;
}
.sp4 {
    margin-left: 10px;
}
.fr {
    float: right;
    position: relative;
}
.tip {
    position: fixed;
    width: 380px;
    height: 200px;
    z-index: 30999999;
    top: 350px;
    left: 750px;
    box-shadow: 0px 0px 8px black;
    background-color: #f3f3f4;
    .tiptop {
        width: 380px;
        height: 40px;
        background-color: #ffbc3d;
        img {
            width: 20px;
            height: 20px;
            margin-top: 10px;
            margin-left: 160px;
        }
        span {
            color: #ffffff;
            position: relative;
            top: -5px;
            margin-left: 7px;
        }
    }
    .tipcontanin {
        height: calc(100% - 40px);
    }
    .tipword {
        width: 100%;
        height: 75%;
        padding: 0 20px;
        display: flex;
        // text-align: center;
        justify-content: center;
        align-items: center;
    }
    .tipdetermine {
        color: #ea9328;
        cursor: pointer;
        width: 310px;
        line-height: 30px;
        text-align: center;
        // margin-top: 40px;
        position: absolute;
        bottom: 13px;
        margin-left: 35px;
        height: 30px;
        background-color: #f3e3ad;
    }

    .delclass {
        width: 330px;
        line-height: 30px;
        margin-top: 40px;
        margin-left: 25px;
        height: 30px;
        .one {
            cursor: pointer;
            display: inline-block;
            height: 30px;
            width: 160px;
            text-align: center;
            background-color: #e0e0e0;
            color: #7e7e7e;
        }
        .two {
            cursor: pointer;
            display: inline-block;
            height: 30px;
            margin-left: 10px;
            width: 160px;
            background-color: #f3e3ad;
            text-align: center;
            color: #eeb764;
        }
    }
}

.file {
    position: relative;
    display: inline-block;
    background: #ffffff;
    border: 1px solid #fda100;
    border-radius: 4px;
    width: 120px;
    overflow: hidden;
    color: #fda100;
    text-align: center;
    text-indent: 0;
    height: 40px;
    line-height: 40px;
    cursor: pointer;
    float: left;
    margin-top: 10px;
    text-decoration: none;
}
.demonstration {
    margin: 0px 5px;
}
.file input {
    position: absolute;
    font-size: 100px;
    right: 0;
    top: 0;
    left: 0;
    opacity: 0;
    cursor: pointer;
    #upload {
        cursor: pointer;
    }
}
.search-container {
    position: relative;
    .sp1 {
        margin-left: 10px;
    }
    .title{
        display: inline-block;
        line-height: 1;
        vertical-align: middle;
    }
    justify-content: space-between;
    background-color: #ddd;
    width: 100%;
    font-size: 16px;
    color: #7f6f79;
    line-height: 60px;
    padding: 0px 15px 0px 15px;
    select {
        height: 40px;
        text-indent: 0.5em;
        width: 200px;
        border: 1px solid #e0e0e0;
    }
    input {
        width: 200px;
        height: 40px;
        margin-left: 10px;
        text-indent: 1em;
        border: 1px solid rgb(244,244,244);
    }
    .sad {
        width: 120px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        background-color: #4270e4;
        margin-left: 10px;
        border-radius: 4px;
        color: #ffffff;
        font-weight: 600;
        display: inline-block;
        cursor: pointer;
    }

    .move {
        width: 120px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        background-color: #999999;
        margin-left: 10px;
        border-radius: 4px;
        color: #ffffff;
        font-weight: 600;
        display: inline-block;
        cursor: pointer;
    }
}

.fr {
    width: 260px;
    height: 100%;
    display: inline-block;
    float: right;
}
.public-table {
    display: flex;
    flex-direction: column;
    height: 100%;

    .table-container {
        border: 1px solid #cccccc;
    }
    .page-container {
        height: 60px;
    }
}
.table-container .img {
    width: 60px;
    height: 30px;
    border-radius: 15px;
    border: 1px solid #cccccc;
    position: relative;
    display: inline-block;
    margin-left: 10px;
    float: left;
    text-align: center;
    line-height: 30px;
    font-weight: bold;
    color: #5cbfcd;
    cursor: pointer;
    background-color: #fff;
    left: 10px;
    img {
        width: 24px;
        height: 24px;
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        cursor: pointer;
        margin: auto;
    }
}
img {
    cursor: pointer;
}
.table-container {
    height: calc(100% - 90px);
    overflow: auto;
}

.img1 {
    width: 24px;
    height: 24px;
    vertical-align: bottom;
}
.sestionheader1 {
    width: 100%;
    position: absolute;
    height: 50px;
}
.choicehead1 {
    width: 100%;
    position: absolute;
    height: 50px;
}

.selectword {
    position: absolute;
    z-index: 11999999;
    width: 230px;
    overflow: auto;
    // height: 350px;
    background-color: #ffffff;
    border: 1px solid #ccc;
}
.img11 {
    width: 25px;
    height: 25px;
    position: relative;
    top: 10px;
}
.firstselect {
    option {
        display: none;
    }
}
.cover1 {
    width: 100%;
    height: 100%;
    z-index: 9999999;
    position: fixed;
    top: 0;
    left: 0;
}
.cover2 {
    width: 100%;
    height: 100%;
    z-index: 29999999;
    position: fixed;
    top: 0;
    left: 0;
}
.sestion {
    width: 800px;
    .is {
        display: inline-block;
        width: 240px;
        overflow: hidden;
        height: 36px;
        input {
            float: left;
            width: 160px;
        }
        select {
            width: 80px;
            float: left;
        }
    }
    select {
        background-color: #ebebe4;
    }
    height: 800px;
    z-index: 10999999;
    box-shadow: 0px 0px 8px black;
    position: fixed;
    top: 120px;
    left: 500px;
    border: 1px solid #cccccc;
    .sestionheader {
        background-color: #386df0;
        height: 50px;
        color: #ffffff;
        font-weight: 600;
        text-align: center;
        line-height: 50px;
        width: 100%;
        position: relative;
        .head {
            color: #ffffff;
            font-weight: 600;
            font-size: 16px;
        }
        .no {
            position: absolute;
            top: 0;
            z-index: 50999999;
            bottom: 0;
            margin: auto;
            height: 25px;
            width: 25px;
            right: 10px;
        }
    }
    .sestioncontain {
        width: 100%;
        height: calc(100% - 50px);
        background-color: #eeeeee;
        padding: 1px 30px 0px 30px;
    }
    .homesetion {
        width: 100%;
        height: 20px;
        border-left: 3px solid #386df0;
        padding-left: 10px;
        color: #386df0;
        font-weight: 600;
        margin-top: 20px;
        position: relative;
        font-size: 16px;
    }
    .hometop{
        display: flex;
        width: 100%;

        div{
            margin-right: 10px;
        }

        .line {
            flex: 1;
            height: 1px;
            background-color: #dddddd;
            margin-top: 11px;
        }
    }
    span {
        color: #363636;
        font-size: 14px;
        margin-right: 20px;
        vertical-align: middle;
        line-height: 1;
    }
}
.overflow1 {
    position: relative;
    left: -20px;
}
.overflow {
    // overflow: hidden;
    width: 100%;
    margin-top: 15px;
    margin-left: 20px;
    input {
        text-indent: 0.5em;
        width: 240px;
        height: 36px;
        border: none;
        border: 1px solid #e0e0e0;
        // background-color: #f4f4f4;
    }
    .input1 {
        text-indent: 0.5em;
        width: 240px;
        height: 36px;
        display: inline-block;
        background-color: #f4f4f4;

        line-height: 36px;
        border: 1px solid #e0e0e0;
        position: relative;
        span {
            color: #cecece;
        }
    }
    .inputimg {
        z-index: 50999999;
        position: absolute;
        right: 7px;
        top: 0;
        cursor: pointer;
        height: 36px;
        width: 36px;
        img {
            width: 100%;
            height: 100%;
        }
    }
    select {
        text-indent: 0.5em;
        width: 240px;
        height: 36px;
        border: 1px solid #e0e0e0;
        // background-color: #f4f4f4;
    }
    .remarks {
        position: relative;
        top: -100px;
    }
    .fl {
        display: inline-block;
        width: 50%;
        margin-bottom: 10px;
        
        span{
            display: inline-block;
            width: 85px;
            text-align: right;
        }
    }
    .zr {
        width: 25%;
        float: right;
    }
}
.margin {
    margin-top: 10px;
}
.indent {
    text-indent: 1em;
    width: 57px;
    display: inline-block;
    height: auto;
}
.block {
    display: inline-block;
}
textarea {
    text-indent: 0.5em;
    width: calc(100% - 100px);
    height: 120px;
    border: none;
    border: 1px solid #e0e0e0;
    // background-color: #f4f4f4;
}
.page {
    .btn {
        cursor: pointer;
    }
    width: 100%;
    height: 50px;
    line-height: 50px;
    color: #ababab;
    padding-left: 10px;
    font-size: 14px;
    overflow: hidden;
    .nopage {
        border: 2px solid #fed286 !important;
        color: #fed286;
    }
    .pageword {
        float: left;
    }
    .pageoperation {
        float: right;
        span {
            border: 2px solid #fda100;
            padding: 3px 8px;
            border-radius: 5px;
            color: #fda100;
            margin-left: 10px;
        }
        .inputnumber {
            display: inline-block;
            margin-left: 10px;
            input {
                width: 66px;
                height: 30px;
                text-align: center;
                color: #fda100;
            }
        }
    }
}
.twice {
    float: left;
    .mx {
        // float: right;
        // width: 87%;
        border-bottom: 1px solid #cccccc;
        padding-bottom: 10px;
        padding-top:10px;
        overflow: hidden;

        .num {
            float: left;
            width: 24px;
            height: 24px;
            color: #fff;
            border-radius: 50%;
            text-align: center;
            background-color: #386df0;
        }
        .nur {
            .nurword {
                font-size: 14px;
                margin-left: 10px;
            }
            float: right;
            font-size: 12px;
            width: calc(100% - 24px);
            line-height: 25px;
            .nl {
                margin: 10px 0 0 10px;
                float: left;
                margin-right: 20px;
                input {
                    margin-left: 10px;
                    height: 24px;
                    text-indent: 1em;
                    width: 65px;
                }
            }
        }
    }
    .sl {
        display: inline-block;
        margin-top: 10px;
        margin-left: 10px;
        vertical-align: top;
    }
    width: 670px;
    padding-bottom: 20px;
    border: 2px solid #cccccc;
    margin: 20px 0px 0px 20px;
    background: #eeeeee;
    .inptwice {
        overflow: hidden;

        margin-top: 20px;
        margin-bottom: 20px;
        .fl {
            float: left;
            margin-left: 10px;
            span{
                display: inline-block;
                max-width: 90px;
                line-height: 1;
                vertical-align: middle;
            }
            input {
                width: 200px;
                height: 36px;
                text-indent: 1em;
            }
        }
        .zr {
            float: right;
            margin-right: 10px;
            span{
                display: inline-block;
                max-width: 90px;
                line-height: 1;
                vertical-align: middle;
            }
            input {
                width: 200px;
                text-indent: 1em;
                height: 36px;
            }
        }
    }
}
.blueword {
    color: #386df0;
}
.Preservation {
    width: 100px;
    height: 34px;
    cursor: pointer;
    background-color: #386df0;
    color: #ffffff;
    border-radius: 3px;
    text-align: center;
    float: right;
    line-height: 34px;
}
.cancel {
    cursor: pointer;
    width: 100px;
    height: 34px;
    float: right;
    margin-right: 20px;
    background-color: #999999;
    color: #ffffff;
    border-radius: 3px;
    text-align: center;
    line-height: 34px;
}
.bgcolor:hover {
    background-color: #fff;
}
.boxsad {
    position: fixed;
    width: 530px;
    height: 250px;
    z-index: 30999999;
    .cancel {
        margin-top: 0px;
        margin-right: 20px;
    }
    .Preservation {
        margin-top: 0px;
        margin-right: 56px;
    }
    background-color: #eeeeee;
    top: 300px;
    left: 700px;
    .t {
        width: 100%;
        height: calc(100% - 60px);
        padding: 10px 20px;
    }
    .w {
        margin-right: 10px;
        position: relative;
        top: -80px;
    }
    .tiphead {
        width: 100%;
        position: relative;
        height: 60px;
        background-color: #4270e4;
        text-align: center;
        line-height: 60px;
        color: #fff;
        .no {
            position: absolute;
            top: 15px;
            width: 25px;
            height: 25px;
            right: 20px;
            cursor: pointer;
            z-index: 50999999;
            img {
                width: 100%;
                height: 100%;
            }
        }
    }
    .tipttop {
        position: absolute;
    }
}
.cover7 {
    width: 100%;
    height: 100%;
    z-index: 29999999;
    position: fixed;
    top: 0;
    left: 0;
}
.mx1 {
    width: 100%;
    height: 400px;
    overflow: auto;
}
.tqw{
    width: 100%;
    height: 60px;
    z-index: 30999999;
    top: 0;
    position: absolute;
}
img{
    cursor: pointer;
}
.fcolor {
    color: #000 !important;
    // position: absolute;
    // top: 0;
    // left: 0;
    // margin: auto;
    // width: 100%;
    // display: inline-block;
}
.colordiv {
    background-color: #d9dbde !important;
}
.colortip {
    background-color: #efeff0 !important;
}
.rwnr{
    display: inline-block;
    width: 85px;
    width: 85px;
    vertical-align: middle;
    line-height: 1;
}
.overflow1{
    margin-left: 0;
    input{
   position: relative;
    left: 95px;
    }
 
}
  .seleword{
    display: inline-block;
    width: 13%;
    height: 40px;
    position: absolute;
    top: 10px;
    background: #fff;
    text-indent: 1em;
    line-height: 40px;
    .seleword1{
        width: calc(100%);
        position: relative;
        height: 100%;
        padding-right: 20px;
         white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    word-break: break-all;
    border: 1px solid rgb(244,244,244);
        img{
            position: absolute;
            right: 2px;
            width: 20px;
            height: 20px;
            top: 10px;
        }
    }
    // align-content: bottom;
}
.tinput{
    margin-left: 15% !important;
}
.tinput1{
    margin-left: 23% !important;
}
 .seleword2{
    display: inline-block;
    width: 21%;
    height: 30px;
    position: absolute;
    top: 10px;
    background: #fff;
    text-indent: 1em;
    line-height: 30px;
    .seleword1{
        width: calc(100%);
        position: relative;
        height: 100%;
        padding-right: 20px;
         white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    word-break: break-all;
        img{
            position: absolute;
            right: 2px;
            width: 20px;
            height: 20px;
            top: 5px;
        }
    }
    // align-content: bottom;
}
.selectword2 {
    position: absolute !important;
    top: 41px !important;
    left: 113px !important;
}
.sblx{
    display:inline-block;
}
</style>

