<!--
 * @Description: 易损件管理操作记录界面
 * @Date: 2019-11-25 19:07:09
 * @Author: 随风
 * @LastEditors: 随风
 * @LastEditTime: 2019-11-27 21:22:27
 -->
<template>
    <div class="public-table" :class="{blackBlueBg: $store.state.color === 'blackBlue'}" @click=" changeselect = false" >
          			<div class="loadcover" element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(0, 0, 0, 0.4)"  v-loading="this.$store.state.isShow" v-show="this.$store.state.isShow" style="position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;"></div>
        <div class="search-container" :style="{zoom:a11}">
            <span class="sblx">{{lang.EquipmentAccount_EquipmentType1}}</span>
               <div class="seleword" @click.stop="selectword1">
             <div class="seleword1">
                  {{Meter}}
               <img :src="xiala" alt />
             </div>
            </div>
            <div class="selectword" v-show="changeselect">
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

            <span class="sp4 tinput">{{lang.EquipmentAccount_OperatingTimeRange}}</span>

            <el-date-picker
                :key="$store.state.color === 'blackBlue' ? 'blackBlueBg' : 'normal'"
                :popper-class="$store.state.color === 'blackBlue' ? 'blackBlueBg' : 'normal'"
              @focus='sx()'
                v-model="value1"
                type="datetime"
                :placeholder="lang.SCMSConsoleWebApiMySql_PleChooseDate"
                value-format="yyyy-MM-dd HH:mm:ss"
                :style="{width:'220px'}"
            ></el-date-picker>
            <span class="demonstration">-</span>
            <el-date-picker
                :key="$store.state.color === 'blackBlue' ? 'blackBlueBg' : 'normal'"
                :popper-class="$store.state.color === 'blackBlue' ? 'blackBlueBg' : 'normal'"
              @focus='sx()'
                v-model="value2"
                type="datetime"
                :placeholder="lang.SCMSConsoleWebApiMySql_PleChooseDate"
                value-format="yyyy-MM-dd HH:mm:ss"
                :style="{width:'220px'}"
            ></el-date-picker>
            <input type="text" :placeholder="lang.AlarmRecord_Time_Keyword" v-model="keyword" />
            <div class="sad" @click="sad">{{lang.AlarmRecord_Time_Select}}</div>
        </div>
        <div class="table-container">
            <el-table
                ref="multipleTable"
                :data="tableData1"
             :style="{ fontSize: a11 * 15 + 'px', width: '100%' }"
                 :row-style="{ height: 50 * a11 + 'px' }"
             :header-cell-style="{
                    background:($store.state.color=='grey')?'#D9DBDE':($store.state.color==='blackBlue' ? '#18254E' : '#5a6c98'),
                    color:($store.state.color=='grey')?'#000':'#fff',
                    'border-left': $store.state.color==='blackBlue' ? '1px solid #304171' : '1px solid #cccccc',
                    height: 50 * a11 + 'px',
                    padding: '0'
                }"
                stripe
                height="100%"
                tooltip-effect="dark"
                border
                highlight-current-row

            >
                <template slot="empty">
                    <span>{{lang.SCMSConsoleWebApiMySql_NoData}}</span>
                </template>
                <el-table-column :label="lang.AlarmRecord_HT_AlarmPointManageUC_SerialNumber" :width="120*a11" prop="Number" >
                    <template slot-scope="scope">{{ scope.row.Number }}</template>
                </el-table-column>

                <el-table-column
                    prop="VulnerablePartName"
                    :label="lang.EquipmentAccount_VulnerablePartName"
                    :width="320*a11"
                    show-overflow-tooltip
                ></el-table-column>
                <el-table-column
                    prop="VulnerablePartNo"
                    :label="lang.EquipmentAccount_VulnerablePartNo"
                    :width="300*a11"
                    show-overflow-tooltip
                ></el-table-column>
                <el-table-column prop="UsindDevice" :label="lang.EquipmentAccount_UsingDevice" :width="230*a11" show-overflow-tooltip></el-table-column>
                <el-table-column prop="OperateDesc" :label="lang.LogManage_OperationRecord_DataGrid_Describe" :width="230*a11" show-overflow-tooltip></el-table-column>
                <el-table-column prop="Operator" :label="lang.EquipmentAccount_Operator" :width="230*a11" show-overflow-tooltip></el-table-column>
                <el-table-column prop="OperateTime" :label="lang.EquipmentAccount_OperatingTime"  :width="200*a11" show-overflow-tooltip></el-table-column>
                <el-table-column prop="Remarks" :label="lang.MaintenanceManage_Remark"  :width="200*a11" show-overflow-tooltip></el-table-column>
            </el-table>
        </div>
        <div class="pages-container" :style="{zoom:a11}">
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
        <div class="sestion" ref="kongtiao1" v-if="setionchange">
            <div class="sestionheader">
                <div
                    class="sestionheader1"
                    @mousedown="mouseDownHandleelse1($event)"
                    @mouseup="mouseUpHandleelse1($event)"
                ></div>
                <span class="head" v-if="sestion == 1">{{lang.RepairManage_ViewRepairPlan}}</span>
                <img :src="no" alt class="no" @click.stop="setionchange = false" />
            </div>
            <div class="sestioncontain">
                <div class="homesetion">
                    <div class="hometop">
                        {{lang.EquipmentAccount_BasicInformation}}
                        <div class="line"></div>
                    </div>
                </div>
                <div class="overflow">
                    <div class="fl">
                        <span>{{lang.RepairManage_RepairName}}</span>
                        <input
                            type="text"
                            v-if="sestion == 1"
                            :value="sesstion.TaskName"
                            :disabled="disabled"
                        />
                        <input type="text" v-if="sestion == 3" v-model="tip.DeviceName" />
                        <input type="text" v-if="sestion == 2" v-model="pen.DeviceName" />
                        <div class="margin">
                            <span class="mi">{{lang.AlarmStatistics_AlarmStatisticsUserControl_StartTime}}</span>
                            <div class="inpimg">
                                <img :src="rili" alt class="inpimg1" />
                                <input
                                    type="text"
                                    v-if="sestion == 1"
                                    :value="sesstion.StartTime"
                                    :disabled="disabled"
                                />
                            </div>
                        </div>
                        <div class="margin">
                            <span class="sp6">{{lang.RepairManage_RepairCycle}}</span>
                            <div class="is">
                                <input
                                    type="text"
                                    v-if="sestion == 1"
                                    :value="sesstion.PeriodValue"
                                    :disabled="disabled"
                                />
                                <input
                                    type="text"
                                    v-if="sestion == 3"
                                    v-model="tip.AssetsNo"
                                    :disabled="disabled"
                                />
                                <input
                                    type="text"
                                    v-if="sestion == 2"
                                    v-model="pen.AssetsNo"
                                    :disabled="disabled"
                                />
                                <select name id v-model="sesstion.PeriodUnit" disabled>
                                    <option
                                        v-for="(item,index) in sametimearr"
                                        :key="index"
                                        :value="item"
                                    >{{item}}</option>
                                </select>
                            </div>
                        </div>
                        <div class="margin">
                            <span class="sp6">{{lang.EquipmentAccount_AdvanceReminder}}</span>
                            <div class="is">
                                <input
                                    type="text"
                                    v-if="sestion == 1"
                                    :value="sesstion.ReminderTimeValue"
                                    :disabled="disabled"
                                    :placeholder="lang.EquipmentAccount_Optional"
                                />
                                <select name id v-model="sesstion.ReminderTimeUnit" disabled>
                                    <option
                                        v-for="(item,index) in sametimearr"
                                        :key="index"
                                        :value="item"
                                    >{{item}}</option>
                                </select>
                            </div>
                        </div>
                        <div class="margin">
                            <span>{{lang.RepairManage_RepairPerson}}</span>
                            <select name id disabled>
                                <option value>{{sesstion.RepairPerson}}</option>
                            </select>
                            <!-- <input
                                type="text"
                                v-if="sestion == 1"
                                :value="sesstion.RepairPerson"
                                :disabled="disabled"
                                placeholder="选填"
                            />-->
                        </div>
                    </div>
                    <div class="zr">
                        <div>
                            <span>{{lang.RepairManage_RepairEquipment}}</span>
                            <input
                                type="text"
                                v-if="sestion == 1"
                                :value="sesstion.DeviceName"
                                :disabled="disabled"
                            />
                        </div>
                        <div class="margin">
                            <span>{{lang.AlarmStatistics_AlarmStatisticsUserControl_EndTime}}</span>
                            <div class="inpimg">
                                <img :src="rili" alt class="inpimg1" />
                                <input
                                    type="text"
                                    v-if="sestion == 1"
                                    :value="sesstion.EndTime"
                                    :disabled="disabled"
                                    :placeholder="lang.EquipmentAccount_Optional"
                                />
                            </div>

                            <input
                                type="text"
                                v-if="sestion == 2"
                                v-model="pen.DeviceModel"
                                :disabled="disabled"
                                :placeholder="lang.EquipmentAccount_Optional"
                            />
                            <input
                                type="text"
                                v-if="sestion == 3"
                                v-model="tip.DeviceModel"
                                :disabled="disabled"
                                :placeholder="lang.EquipmentAccount_Optional"
                            />
                        </div>
                        <div class="margin">
                            <span>{{lang.EquipmentAccount_MaturityTime}}</span>
                            <div class="inpimg">
                                <img :src="rili" alt class="inpimg1" />
                                <input type="text" :value="sesstion.MaturityTime" disabled />
                            </div>
                        </div>
                        <div class="margin">
                            <span>{{lang.SCMSConsoleWebApiMySql_Enable}}</span>
                            <select v-model="person1" :disabled="disabled">
                                <option v-for="(item,index) in person" :key="index" :value="item">{{lang.ProcessParameterReport_HT_Yes}}</option>
                            </select>
                        </div>
                    </div>
                    <div class="overflow overflow1">
                        <span class="remarks">{{lang.SCMSConsoleWebApiMySql_PlanContent}}</span>
                        <textarea
                            name
                            id
                            v-if="sestion == 1"
                            :value="sesstion.PlanContent"
                            :disabled="disabled"
                        ></textarea>
                        <textarea
                            name
                            id
                            v-if="sestion == 2"
                            :placeholder="lang.EquipmentAccount_EquipmentRemarkTag"
                            v-model="pen.Remarks"
                            :disabled="disabled"
                        ></textarea>
                        <textarea
                            name
                            id
                            v-if="sestion == 3"
                            :placeholder="lang.EquipmentAccount_EquipmentRemarkTag"
                            v-model="tip.Remarks"
                            :disabled="disabled"
                        ></textarea>
                    </div>
                </div>
                <div class="homesetion">
                    <div class="hometop">
                        {{lang.RepairManage_RepairInfo}}
                        <div class="line"></div>
                    </div>
                </div>
                <div class="overflow">
                    <div class="fl">
                        <span>{{lang.RepairManage_RepairResult}}</span>
                        <select name id disabled>
                            <option value>{{sesstion.RepairResult}}</option>
                        </select>
                    </div>
                </div>
                <div class="overflow">
                    <span class="remarks">{{lang.RepairManage_RepairDescribe}}</span>
                    <textarea
                        name
                        id
                        v-if="sestion == 1"
                        :value="sesstion.CloseRemarks"
                        :disabled="disabled"
                    ></textarea>
                    <textarea
                        name
                        id
                        v-if="sestion == 2"
                        :placeholder="lang.EquipmentAccount_EquipmentRemarkTag"
                        v-model="pen.Remarks"
                        :disabled="disabled"
                    ></textarea>
                    <textarea
                        name
                        id
                        v-if="sestion == 3"
                        :placeholder="lang.EquipmentAccount_EquipmentRemarkTag"
                        v-model="tip.Remarks"
                        :disabled="disabled"
                    ></textarea>
                </div>
                <div class="box">
                    <el-checkbox v-model="sesstion.SynchronizeToSOP" disabled>{{lang.MaintenanceManage_SynchronizeToSOP}}</el-checkbox>
                </div>
                <div class="Preservation" v-if="sestion == 2" @click="preservation6">{{lang.PopupCommon_Save}}</div>
                <div class="Preservation" v-if="sestion == 3" @click="preservation">{{lang.PopupCommon_Save}}</div>
                <div class="cancel" v-if="sestion == 2 || sestion == 3" @click="cancel">{{lang.PopupCommon_Cancel}}</div>
            </div>
        </div>
        <div class="tip" ref="kongtiao2" v-show="tipchange" :style="{zoom:a11}">
              <div
                class="tiphead"
                style="position:absolute;width: 380px;height: 40px;"
            ></div>
            <div
                class="tiptop"
               
            >
                <img :src="gth" alt />
                <span>{{lang.HT_MessageBoxCaption_Tips}}</span>
            </div>
            <div class="tipcontanin">
                <div class="tipword">{{tipword}}</div>
                <div class="tipdetermine" @click="tip1" v-if="deltrue">{{lang.MessageBox_Confrim}}</div>
                <div class="delclass" v-if="!deltrue">
                    <div class="one" @click="no1">{{lang.MessageBox_NO}}</div>
                    <div class="two" @click="yes1">{{lang.MessageBox_YES}}</div>
                </div>
            </div>
        </div>
        <div class="cover1" v-if="setionchange"></div>
        <div class="cover3" v-if="cancel1"></div>
        <div class="cover2" v-if="tipchange"></div>
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
            a1: 1,
            a11:1,
            a2: 1,
            value1: new Date(new Date().toLocaleDateString()),
            value2: new Date(
                new Date(new Date().toLocaleDateString()).getTime() +
                    24 * 60 * 60 * 1000 -
                    1
            ),
            deltrue: true,
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
            sametimearr: ['小时', '天', '周', '月'],
            tableData1: [],
            tipchange: false,
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
            PageData: {
                PageSize: 50,
                TotalCount: 0,
                TotalPage: 1,
                PageIndex: 1,
                LastEnabled: false,
                NextEnabled: false
            },
              xiala:require('../../assets/images/ziyuan4.png'),
            aaa: false,
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
            oldName: '',
            ztarr: ['不限', '已关闭', '已完成', '超时完成', '已过期'],
            leixinarr: ['不限', '计划维修', '故障维修'],
            setionchange: false,
            nowIndex: 1,
            pageDate: {
                pageIndex: 1,
                pagesize: 50,
                togeIndex: 0,
                togesize: 0
            },
              jurisdiction:[],
            buttonarr:[],
            cxid:'',
            cxshow:true,
            lang: JSON.parse(localStorage.getItem('languages'))[localStorage.getItem('currentLang')]
        };
    },

    created() {
        this.getLangData()
        this.jurisdiction = this.$store.state.btnPowerData
     this.buttonarr = this.findPathByLeafId(this.GetUrlParam('id'),this.jurisdiction)[0].Children
        console.log("nut",this.buttonarr)
          this.buttonarr.forEach((item)=>{
              if(item.RightName == "操作记录-查询按钮"){
                 this.cxid = item.RightID
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
        this.getEquipmentType();
        this.req(1);
        this.time4 = this.getNowTime();
    },
    methods: {
                sx(){
            let that = this
            setTimeout(()=>{
for(let i=0;i<$('.el-picker-panel').length;i++){
                $('.el-picker-panel')[i].style.zoom = that.a11
            }
            })
              
        },
        getLangData () {
            this.sametimearr = [this.lang.HMI_HT_LineChartWindowViewModel_Hour, this.lang.MaintenanceManage_Day, this.lang.HMI_HT_LineChartWindowViewModel_Week, this.lang.HMI_HT_LineChartWindowViewModel_Month]
            this.warrantystatus = [this.lang.EquipmentAccount_Inside, this.lang.EquipmentAccount_Outside]
            this.devicestatus = [this.lang.EquipmentAccount_Used, this.lang.EquipmentAccount_Stopped, this.lang.EquipmentAccount_Abandoned]
            this.warry = this.lang.EquipmentAccount_Inside
            this.device = this.lang.EquipmentAccount_Used
            this.Meter1 = this.lang.AlarmRecord_HT_Unlimited
            this.Meter2 = this.lang.AlarmRecord_HT_Unlimited
            this.ztarr = [this.lang.AlarmRecord_HT_Unlimited, this.lang.MaintenanceManage_Closed, this.lang.MaintenanceManage_Completed, this.lang.MaintenanceManage_TimeoutCompleted, this.lang.MaintenanceManage_Expired]
            this.leixinarr = [this.lang.AlarmRecord_HT_Unlimited, this.lang.RepairManage_PlanRepair, this.lang.RepairManage_FaultRepair]
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
                this.$axios
                .post(
                    `/api/VulnerablePartManage/VulnerablePartManage_GstPlanInitTime`
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
            }
            this.tipchange = false;
        },
        move(name, namehead) {
          //  $(`.${name}`).addClass('center')
           let left = ($(`.${name}`).width())/2+'px'
           let top = ($(`.${name}`).height())/2+'px'
             $(`.${name}`)[0].style.left = `calc(50% - ${left})`;
           $(`.${name}`)[0].style.top = `calc(50% - ${top})`;
            $(`.${name}`)[0].addEventListener('mousedown', function(e) {
                
                console.log(e.target.className.toLocaleLowerCase());
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
            let moveLeft = event.pageX - 350 + 'px';
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
        },

        handleEdit(a, b) {
            console.log(a);
            console.log(b);
            this.setionchange = true;
            this.sestion = 1;
            this.disabled = true;
            this.sesstion = b;
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
                    $('.sad')[0].offsetTop +
                    $('.seleword1')[0].clientHeight +2+
                    'px'
            });
            this.changeselect = !this.changeselect;
        },
        cancel2() {
            if (this.Preservation == this.lang.EquipmentAccount_EquipmentType) {
                this.Preservation = this.lang.EquipmentAccount_ClickSelect
            } else if (this.Preservation5 == this.lang.EquipmentAccount_InstallPosition) {
                this.Preservation5 = this.lang.EquipmentAccount_ClickSelect
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
            if (1 < this.PageData.PageIndex && this.PageData.PageIndex !== 1) {
                this.PageData.PageIndex--;

                this.onetable();
            }
        },
        next() {
            if (
                this.PageData.PageIndex < this.PageData.TotalPage 
            ) {
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
            }
            console.log(c);
            console.log(this.Meterid);
            this.$axios
                .post(
                    `/api/VulnerablePartManage/VulnerablePartManage_GstRecord?argDeviceType=${c}&argStartTime=${this.value1}&argRecordStatus=${a}&argEndTime=${this.value2}&argKeyword=${this.keyword}&argPageSize=${this.PageData.PageSize}&argPageIndex=${this.PageData.PageIndex}`
                )
                .then(res => {
                    if (res.data.code == 0) {
                        this.tableData1 = res.data.data.DataList;
                        this.PageData = res.data.data.ParameterList;
                        let i = 0;
                        for (i in this.tableData1) {
                            this.tableData1[i].OperateTime = this.gettime(
                                this.tableData1[i].OperateTime
                            );
                        }
                       
                    } else {
                           setTimeout(() => {
                        $('.tip').css({
                            zoom: this.a11,
                            left: `calc(50% - ${($('.tip').width() / 2) *
                                this.a11}px)`,
                            top: `calc(50% - ${($('.tip').height() / 2) *
                                this.a11}px)`
                        });
                        this.tipchange = true;
                        this.move('tip', 'tiphead');
                    });
                        this.tipword = res.data.msg;
                        this.tableData1 = [];
                        this.PageData = {
                            PageSize: 50,
                            TotalCount: 0,
                            TotalPage: 1,
                            PageIndex: 1,
                            LastEnabled: false,
                            NextEnabled: false
                        };
                    }

                   this.nowpage = this.PageData.PageIndex;
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

        jump() {
            if (!this.isPositiveInteger(this.nowpage)) {
                   setTimeout(() => {
                        $('.tip').css({
                            zoom: this.a11,
                            left: `calc(50% - ${($('.tip').width() / 2) *
                                this.a11}px)`,
                            top: `calc(50% - ${($('.tip').height() / 2) *
                                this.a11}px)`
                        });
                        this.tipchange = true;
                        this.move('tip', 'tiphead');
                    });
                this.tipword = this.lang.RoleManage_HT_PEAPositiveInteger;
                   setTimeout(() => {
                        $('.tip').css({
                            zoom: this.a11,
                            left: `calc(50% - ${($('.tip').width() / 2) *
                                this.a11}px)`,
                            top: `calc(50% - ${($('.tip').height() / 2) *
                                this.a11}px)`
                        });
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
                        $('.tip').css({
                            zoom: this.a11,
                            left: `calc(50% - ${($('.tip').width() / 2) *
                                this.a11}px)`,
                            top: `calc(50% - ${($('.tip').height() / 2) *
                                this.a11}px)`
                        });
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
                        $('.tip').css({
                            zoom: this.a11,
                            left: `calc(50% - ${($('.tip').width() / 2) *
                                this.a11}px)`,
                            top: `calc(50% - ${($('.tip').height() / 2) *
                                this.a11}px)`
                        });
                        this.tipchange = true;
                        this.move('tip', 'tiphead');
                    });
                 this.tipword = this.lang.NoOperationAuthority;
                return
            }
            if (
                new Date(this.value1).getTime() >
                new Date(this.value2).getTime()
            ) {
                   setTimeout(() => {
                        $('.tip').css({
                            zoom: this.a11,
                            left: `calc(50% - ${($('.tip').width() / 2) *
                                this.a11}px)`,
                            top: `calc(50% - ${($('.tip').height() / 2) *
                                this.a11}px)`
                        });
                        this.tipchange = true;
                        this.move('tip', 'tiphead');
                    });
                this.tipword = this.lang.AlarmRecord_HT_TheQueryDate
                return
            }
              this.onetable();
        },
        setParams(params) {
            this.searchData = params;
        },
        anythingdata() {
            let rang = this.Meter;
            if (this.Meterid == '11111111-1111-1111-1111-111111111111') {
                rang = '';
            }
            this.$axios({
                method: 'post',
                url: `/api/EquipmentAccount/EquipmentAccount_GstEquipment?argDeviceType=${rang}&argKeyword=${this.keyword}&argPageSize=${this.PageData.TotalCount}&argPageIndex=${this.pageindex}`
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
        isPositiveInteger(s) {
            //是否为正整数
            var re = /^[0-9]+$/;
            return re.test(s);
        },
        req(pageIndex, s) {
            if (s == 'jump') {
                if (!this.isPositiveInteger(pageIndex)) {
                       setTimeout(() => {
                        $('.tip').css({
                            zoom: this.a11,
                            left: `calc(50% - ${($('.tip').width() / 2) *
                                this.a11}px)`,
                            top: `calc(50% - ${($('.tip').height() / 2) *
                                this.a11}px)`
                        });
                        this.tipchange = true;
                        this.move('tip', 'tiphead');
                    });
                    this.w = this.lang.RoleManage_HT_PEAPositiveInteger;
                    this.w1 = true;
                    return;
                } else {
                    if (
                        pageIndex !== 1 &&
                        pageIndex !== this.PageData.TotalPage
                    ) {
                        if (
                            pageIndex < 1 ||
                            pageIndex > this.PageData.TotalPage
                        ) {
                               setTimeout(() => {
                        $('.tip').css({
                            zoom: this.a11,
                            left: `calc(50% - ${($('.tip').width() / 2) *
                                this.a11}px)`,
                            top: `calc(50% - ${($('.tip').height() / 2) *
                                this.a11}px)`
                        });
                        this.tipchange = true;
                        this.move('tip', 'tiphead');
                    });
                            this.w = this.lang.DataGrid_Reaction_HT_PEThePageNumber;
                            this.w1 = true;
                            return;
                        }
                    }
                }
            }
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
        getsetime() {
            // this.$axios
            //     .post(
            //         `/api/VulnerablePartManage/VulnerablePartManage_GstPlanInitTime`
            //     )
            //     .then(res => {
            //         console.log('sss', res);
            //         this.value1 = res.data.data.StartTime;
            //         this.value2 = res.data.data.EndTime;
            //         let a = new Date(
            //             new Date(new Date().toLocaleDateString()).getTime() +
            //                 24 * 60 * 60 * 1000 -
            //                 1
            //         ).getTime();
            //         if (new Date(this.value2).getTime() < a) {
            //             this.value2 = this.GMTToStr(
            //                 new Date(
            //                     new Date().toLocaleDateString()
            //                 ).getTime() +
            //                     24 * 60 * 60 * 1000 -
            //                     1
            //             );
            //         }
            //     })
            //     .then(() => {
            //         this.sad(1);
            //     })
            //     .catch(() => {
                    this.value1 = this.GMTToStr(this.value1);
                    this.value2 = this.GMTToStr(this.value2);
                    this.sad(1);
                // });
        }
    },
    mounted() {
           this.a11 = Number(parseFloat(window.screen.width / 1920).toFixed(2));
        if (this.a11 < 1) {
            this.a11 = 0.8;
        }
        setTimeout(() => {
            let a = this.a11 * 120 + 'px';
            $('.table-container').css({
                height: `calc(100% - ${a})`
            });
        });
        this.value1 = this.GMTToStr(this.value1);
        this.value2 = this.GMTToStr(this.value2);
        this.getsetime();
        this.$axios
            .post(`/api/UserManage/UserManage_GstUserWithNoPage`)
            .then(res => {
                console.log('ss', res);
                this.person = res.data.data;
            });
        console.log(this.tableData);
    }
};
</script>

<style lang='scss' scoped>
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
    z-index: 30;
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
    .tipword {
        width: 100%;
        text-align: center;
        margin-top: 50px;
    }
    .tipdetermine {
        cursor: pointer;
        color: #ea9328;
        width: 310px;
        line-height: 30px;
        text-align: center;
        // margin-top: 40px;
        position: absolute;
        bottom: 20px;
        right: 0;
        left: 0;
        margin: auto;
        // margin-left: 35px;
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
    justify-content: space-between;
    background-color: #ddd;
    width: 100%;
    font-size: 16px;
    color: #7f6f79;
    height: 60px !important;
    line-height: 60px;
    padding: 0px 22px 0px 22px;
    select {
        height: 40px;
        text-indent: 0.5em;
        width: 200px;
    }
    input {
        width: 200px;
        height: 40px;
        margin-left: 10px;
        text-indent: 1em;
        border: none;
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
    .search-container {
        height: 60px;
    }
    .table-container {
        border: 1px solid #cccccc;
    }
    .page-container {
        height: 60px;
    }

    &.blackBlueBg{
        .el-tree{
            background: #1D2846;
            color: #C6CAD8;
        }

        .seleword,.seleword2{
            background: #1D2846;
            border: 1px solid #445992;
            color: #C6CAD8;
        }
        .search-container{
            background: #0B1530;
            border-color: #38415A;
            color: #E4E4E4;
            .selectword{
                background: #1D2846;
                border: 1px solid #445992;
            }
            .addBtn{
                background-color: transparent;
                border: 1px solid #46BE05;
                color: #46BE05;
            }
            .deleteBtn{
                background-color: #4F5871;
                border: 1px solid #4F5871;
                color: #fff;
            }
        }
        .table-container{
            border-color: transparent;
        }
        .img{
            border-color: #5C6A95;
            background-color: transparent;
        }

        .boxsad{
            background: #233056;
            color: #fff;
        }

        .addPop{
            background: #233056;
            color: #fff;

            .addPop_list{
                background-color: #1A2544;
                border: 1px solid #2A3058;
            }
            
            .addPop_table .inspection_btn .deleteBtn{
                background-color: #4F5871;
                border: 1px solid #4F5871;
                color: #fff;
            }
        }
        .addEquipment{
            background: #233056;
            color: #fff;

            .conter{
                background: #28355B;
                border-color: #445992;
            }
        }
            
        .equipmentBtn_delete, .spotcheckBtn_delete{
            background-color: #4F5871!important;
            color: #fff!important;
        }

        .look{
            background: #233056;

            .lookselect{
                background: #28355B;
                border-color: #445992;
                color: #fff;

                .table{
                    border-color: #2A3058;
                }
                .el-table--border th.gutter:last-of-type{
                    background-color: #344c8f;
                }
            }
        }

        select{
            background: #1D2846!important;
            border-color: #445992;

            &:disabled{
                background: #35446D!important;
                border-color: #445992;
            }

            &:focus{
                border-color: #B2C0E4
            }
        }
        .showtext{
            color: #fff;
        }
        .el-checkbok{
            color: #fff;

            &:disabled{
                color: #6D789A;
            }
        }

        .sestion{
            border-color: transparent;

            .sestioncontain{
                background: #233056;
            }
            span{
                color:#fff;
            }
            .input1{
                color: #C6CAD8;
                background: #35446D;
                border-color: #445992;
            }
            .hometop-title{
                background-color: transparent;
            }

            .line{
                background-color: #445992;
            }
        }
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
    z-index: 11;
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
    z-index: 9;
    position: fixed;
    top: 0;
    left: 0;
}
.cover2 {
    width: 100%;
    height: 100%;
    z-index: 29;
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
    z-index: 10;
    box-shadow: 0px 0px 8px black;
    position: fixed;
    top: 120px;
    left: 590px;
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
            z-index: 50;
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
    .line {
        position: absolute;
        height: 2px;
        width: 86%;
        top: 0;
        bottom: 0;
        margin: auto;
        right: 0;
        background-color: #dddddd;
    }
    span {
        color: #363636;
        font-size: 14px;
        margin-right: 20px;
    }
}
.overflow1 {
    position: relative;
    left: -20px;
    bottom: -10px;
}
.overflow {
    overflow: hidden;
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
        z-index: 50;
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
        border: none;
        border: 1px solid #e0e0e0;
        // background-color: #f4f4f4;
    }
    .remarks {
        position: relative;
        top: -100px;
    }
    .fl {
        float: left;
        width: 50%;
    }
    .zr {
        width: 50%;
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
 .seleword{
    display: inline-block;
    width: 13%;
    height: 40px;
    position: absolute;
    top: 12px;
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
    display: inline-block;
}
</style>

