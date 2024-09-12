<!--
 * @Description: 保养管理待办保养界面
 * @Date: 2019-11-25 19:07:09
 * @Author: 随风
 * @LastEditors: Tao
 * @LastEditTime: 2020-08-06 17:46:58
 -->
<template>
    <div class="public-table bygl" @click="changeselect = false" >
          			<div class="loadcover" element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(0, 0, 0, 0.4)"  v-loading="this.$store.state.isShow" v-show="this.$store.state.isShow" style="position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;"></div>
        <div class="look" ref="kongtiao5" v-if="offdecive">
            <div
                class="looktop"
                @mousedown="mouseDownHandleelse5($event)"
                @mouseup="mouseUpHandleelse5($event)"
            ></div>
            <div class="lookhead">
                {{lang.FileManage_AddAssociatedEquipment}}
                <img :src="no" alt @click="cancel11" />
            </div>
            <div class="lookcontent">
                <div class="lookselect">
                    <div class="search">
                        <span>{{lang.EquipmentAccount_EquipmentType1}}</span>
                        <select name id v-model="oneselect" @click="selectword2">
                            <option :value="oneselect">{{oneselect}}</option>
                        </select>
                        <div class="selectword selectword2" v-show="selectword3">
                            <el-tree
                                :data="data7"
                                @node-click="handleNodeClic7"
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
                        <input type="text" :placeholder="lang.AlarmRecord_FaultAddAndModify_KeyWord" v-model="projectkeyword" />
                        <span class="lookfor1" @click="lookforsearch">{{lang.AlarmRecord_Time_Select}}</span>
                    </div>
                    <div class="table"> 
                        <el-table
                            :data="projectlistdata"
                            height="100%"
                            border
                            highlight-current-row
                            style="width: 100%"
                            @row-click="handleRowChange1"
                           :header-cell-style="[{background:(($store.state.color=='grey')?'#D9DBDE':'#E1EDFA')},
                           {color:(($store.state.color=='grey')?'#000':'#769DE7')}, 
                           {'border-left':'1px solid #cccccc',
                            height:50*zoom+'px',
                            fontSize: 14*zoom+'px',
                           padding:'0'}]"
                        >
                            <template slot="empty">
                                <span>{{lang.SCMSConsoleWebApiMySql_NoData}}</span>
                            </template>
                            <el-table-column prop="DeviceName" :label="lang.EquipmentAccount_EquipmentName"  :show-overflow-tooltip="true"></el-table-column>
                            <el-table-column prop="DeviceNo" :label="lang.EquipmentAccount_EquipmentNumber"  :show-overflow-tooltip="true"></el-table-column>
                            <el-table-column prop="DeviceType" :label="lang.EquipmentAccount_EquipmentType"  :show-overflow-tooltip="true"></el-table-column>
                            <el-table-column prop="DeviceModel" :label="lang.EquipmentAccount_EquipmentModel"  :show-overflow-tooltip="true"></el-table-column>
                        </el-table>
                    </div>
                </div>
            </div>
            <div class="cancel" @click="cancel11">{{lang.PopupCommon_Cancel}}</div>
            <div class="pre" @click="pre1">{{lang.PopupCommon_Sure}}</div>
        </div>
        <div class="search-container"
            :style="{
              zoom
            }">
            <span class="title sblx" >{{lang.EquipmentAccount_EquipmentType1}}</span>
       <div class="seleword" @click.stop="selectword1" >
             <div class="seleword1">
                  {{Meter}}
               <img :src="xiala" alt class="selimg"/>
             </div>
            </div>
            <span class="sp1 tinput title" :style="[{fontSize: 16*1+'px'},{marginLeft: 230*1+'px!important'}]">{{lang.MaintenanceManage_TaskStatus1}}</span>
            <select v-model="Meter1" class="seleword11">
                <option v-for="(item,index) in ztarr" :key="index" :value="item">{{item}}</option>
            </select>
            <div class="selectword " v-show="changeselect" >
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
            <span class="sp1 title" >{{lang.MaintenanceManage_ThisTimeStartTime1}}</span>

            <el-date-picker
                v-model="value1"
                type="datetime"
                :placeholder="lang.SCMSConsoleWebApiMySql_PleChooseDate"
                value-format="yyyy-MM-dd HH:mm:ss"
                @focus='sx'
            ></el-date-picker>
            <span class="demonstration" :style="{fontSize: 16*1+'px'}">-</span>
            <el-date-picker
                v-model="value2"
                type="datetime"
                :placeholder="lang.SCMSConsoleWebApiMySql_PleChooseDate"
                value-format="yyyy-MM-dd HH:mm:ss"
                 @focus='sx'
            ></el-date-picker>
            <input type="text" :placeholder="lang.AlarmRecord_Time_Keyword" v-model="keyword" />
            <div class="sad" @click="sad" >{{lang.AlarmRecord_Time_Select}}</div>
        </div>
        <div class="table-container table-container1">
            <el-table
                ref="multipleTable"
              
                :data="tableData1"
                stripe
                height="100%"
                tooltip-effect="dark"
                @row-click="handleRowChange"
                :style="{width: '100%',fontSize: 14*zoom+'px'}"
                border
                highlight-current-row
                :header-cell-style="{
                    background:($store.state.color=='grey')?'#D9DBDE':'#5a6c98',
                    color:($store.state.color=='grey')?'#000':'#fff',
                    'border-left':'1px solid #cccccc',
                    height:50*zoom+'px',
                    fontSize: 14*zoom+'px',
                    padding:'0'}"
            >
                <template slot="empty">
                    <span>{{lang.SCMSConsoleWebApiMySql_NoData}}</span>
                </template>
                <el-table-column :label="lang.AlarmRecord_HT_AlarmPointManageUC_SerialNumber" :width="120 * zoom" prop="Number"  :show-overflow-tooltip="true"  fixed>
                    <template slot-scope="scope">
                        <div class="item">
                            <span
                                class="sad"
                                 v-if="scope.row.Foreground == '#ff0000'"
                            >{{scope.row.Number}}</span>
                            <span v-else>{{scope.row.Number}}</span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="name" :label="lang.RoleManage_Operation" :width="400 * zoom"  fixed>
                    <template slot-scope="scope">
                        <!-- <i class="el-icon-share"></i> -->
                        <div class="img" @click="handleEdit111(scope.$index, scope.row)" :style="{width:60*zoom+'px',height: 30*zoom+'px',lineHeight: 30*zoom+'px',marginLeft: 10*zoom+'px'}">{{lang.MaintenanceManage_Submit}}</div>
                        <div class="img" @click="handleEdit3(scope.$index, scope.row)" :style="{width:60*zoom+'px',height: 30*zoom+'px',lineHeight: 30*zoom+'px',marginLeft: 10*zoom+'px'}">{{lang.MaintenanceManage_Close}}</div>
                        <div class="img" @click="handleEdit11(scope.$index, scope.row)" :style="{width:60*zoom+'px',height: 30*zoom+'px',lineHeight: 30*zoom+'px',marginLeft: 10*zoom+'px'}">
                            <img :src="look" alt :style="{width: 24*zoom+'px',height: 24*zoom+'px'}"/>
                            {{scope.row.phone}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="PlanName" :label="lang.MaintenanceManage_PlanName" :width="200 * zoom" :show-overflow-tooltip="true">
                    <template slot-scope="scope">
                        <div class="item">
                            <span
                                class="sad"
                                 v-if="scope.row.Foreground == '#ff0000'"
                            >{{scope.row.PlanName}}</span>
                            <span v-else>{{scope.row.PlanName}}</span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="StartTime" :label="lang.ProcessParameterConfigure_ProduceManageUserControl_DataGrid1_PlanningStartTime" :width="200 * zoom" :show-overflow-tooltip="true">
                    <template slot-scope="scope">
                        <div class="item">
                            <span
                                class="sad"
                                 v-if="scope.row.Foreground == '#ff0000'"
                            >{{scope.row.StartTime}}</span>
                            <span v-else>{{scope.row.StartTime}}</span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="EndTime" :label="lang.ProcessParameterConfigure_ProduceManageUserControl_DataGrid1_PlanEndTime" :width="200 * zoom" :show-overflow-tooltip="true">
                    <template slot-scope="scope">
                        <div class="item">
                            <span
                                class="sad"
                                 v-if="scope.row.Foreground == '#ff0000'"
                            >{{scope.row.EndTime}}</span>
                            <span v-else>{{scope.row.EndTime}}</span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="Status" :label="lang.MaintenanceManage_TaskStatus" :width="200 * zoom" :show-overflow-tooltip="true">
                    <template slot-scope="scope">
                        <div class="item">
                            <span
                                class="sad"
                                 v-if="scope.row.Foreground == '#ff0000'"
                            >{{scope.row.Status}}</span>
                            <span v-else>{{scope.row.Status}}</span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="MaintenancePerson"
                    :label="lang.MaintenanceManage_MaintenancePerson"
                    :width="200 * zoom"
                   :show-overflow-tooltip="true"
                >
                    <template slot-scope="scope">
                        <div class="item">
                            <span
                                class="sad"
                                v-if="scope.row.Foreground == '#ff0000'"
                            >{{scope.row.MaintenancePerson}}</span>
                            <span v-else>{{scope.row.MaintenancePerson}}</span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="DeviceName" :label="lang.EquipmentAccount_EquipmentName" :width="300 * zoom" :show-overflow-tooltip="true">
                    <template slot-scope="scope">
                        <div class="item">
                            <span
                                class="sad"
                                 v-if="scope.row.Foreground == '#ff0000'"
                            >{{scope.row.DeviceName}}</span>
                            <span v-else>{{scope.row.DeviceName}}</span>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="pages-container">
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
        <div class="sestion sestion1" ref="kongtiao1" v-if="change11" :style="{width: 800*zoom+'px',height: 800*zoom+'px'}"> 
            <div class="sestionheader">
                <div
                    class="sestionheader1"
                    @mousedown="mouseDownHandleelse1($event)"
                    @mouseup="mouseUpHandleelse1($event)"
                ></div>
                <span class="head" v-if="sestion == 1">{{lang.RepairManage_AddFaultRepairTask}}</span>
                <span class="head" v-else-if="sestion == 2 && mesad3">{{lang.RepairManage_ViewRepairPlan}}</span>
                <span class="head" v-else-if="sestion == 2  && !mesad3">{{lang.RepairManage_ViewRepairPlanContent}}</span>
                <span class="head" v-else-if="sestion == 3">{{lang.RepairManage_EditFaultRepairTask}}</span>
                <img :src="no" alt class="no" @click.stop="cancel" />
            </div>
            <div class="sestioncontain">
                <div class="homesetion">
                    <div class="hometop">
                        <p class="hometop-title">{{lang.EquipmentAccount_BasicInformation}}</p>
                        <div class="line"></div>
                    </div>
                </div>
                <div class="overflow">
                    <div class="zl">
                        <div class="margin" :style="{marginTop:8*zoom+'px',height: 40*zoom+'px',fontSize:14*zoom+'px'}">
                            <span>{{lang.RepairManage_RepairName}}</span>
                            <input type="text" v-if="sestion == 1" v-model="taskname" />
                            <input
                                type="text"
                                v-else-if="sestion == 2"
                                v-model="wantnowdata.TaskName"
                                disabled
                            />
                            <input type="text" v-else-if="sestion == 3" v-model="wantnowdata.TaskName" />
                        </div>
                        <div class="margin" :style="{marginTop:8*zoom+'px',height: 40*zoom+'px',fontSize:14*zoom+'px'}">
                            <span>{{lang.AlarmStatistics_AlarmStatisticsUserControl_StartTime}}</span>
                            <template>
                                <div class="block" v-if="sestion == 1">
                                    <el-date-picker
                                        v-model="nowtime1"
                                        type="datetime"
                                        :placeholder="lang.SCMSConsoleWebApiMySql_PleChooseDate"
                                        value-format="yyyy-MM-dd HH:mm:ss"
                                        disabled
                                    ></el-date-picker>
                                </div>
                                <div class="block" v-else-if="sestion == 2">
                                    <el-date-picker
                                        v-model="wantnowdata.StartTime"
                                        type="datetime"
                                        :placeholder="lang.SCMSConsoleWebApiMySql_PleChooseDate"
                                        value-format="yyyy-MM-dd HH:mm:ss"
                                        disabled
                                    ></el-date-picker>
                                </div>
                                <div class="block" v-else-if="sestion == 3">
                                    <el-date-picker
                                        v-model="wantnowdata.StartTime"
                                        type="datetime"
                                        :placeholder="lang.SCMSConsoleWebApiMySql_PleChooseDate"
                                        value-format="yyyy-MM-dd HH:mm:ss"
                                        disabled
                                    ></el-date-picker>
                                </div>
                            </template>
                        </div>
                        <div class="margin" v-if="sestion == 2 &&mesad3">
                            <span class="sp6">{{lang.RepairManage_RepairCycle}}</span>
                            <div class="is">
                                <input
                                    type="text"
                                    v-if="sestion == 2"
                                    v-model="wantnowdata.PeriodValue"
                                    :disabled="disabled"
                                />
                                <select name id v-model="wantnowdata.PeriodUnit" disabled>
                                    <option
                                        v-for="(item,index) in sametimearr"
                                        :key="index"
                                        :value="item"
                                    >{{item}}</option>
                                </select>
                            </div>
                        </div>
                        <div class="margin" v-if="sestion == 2 && mesad3">
                            <span class="sp6">{{lang.EquipmentAccount_AdvanceReminder}}</span>
                            <div class="is">
                                <input
                                    type="text"
                                    v-if="sestion == 2"
                                    :value="wantnowdata.ReminderTimeValue"
                                    :disabled="disabled"
                                />
                                <select name id v-model="wantnowdata.ReminderTimeUnit" disabled>
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
                            <select name id v-model="deviceperson" v-if="sestion == 1">
                                <option
                                    :value="item"
                                    v-for="(item,index) in supermin"
                                    :key="index"
                                >{{item}}</option>
                            </select>
                            <select
                                name
                                id
                                v-model="wantnowdata.RepairPerson"
                                v-else-if="sestion == 2"
                                disabled
                                style="background:#EBEBE4"
                            >
                                <option>{{wantnowdata.RepairPerson}}</option>
                            </select>
                            <select
                                name
                                id
                                v-model="wantnowdata.RepairPerson"
                                v-else-if="sestion == 3"
                            >
                                <option>{{wantnowdata.RepairPerson}}</option>
                            </select>
                        </div>
                    </div>
                    <div class="zr">
                        <div class="margin" >
                            <span>{{lang.RepairManage_RepairEquipment}}</span>
                            <div v-if="sestion == 1" class="input1">
                                <span>{{Preservation}}</span>
                                <div class="inputimg" @click="getdevice">
                                    <img :src="diji" alt />
                                </div>
                            </div>
                            <div v-else-if="sestion == 2" class="input1">
                                <span>{{wantnowdata.DeviceName}}</span>
                                <div class="inputimg">
                                    <img :src="diji" alt />
                                </div>
                            </div>
                            <div v-else-if="sestion == 3" class="input1">
                                <span>{{wantnowdata.DeviceName}}</span>
                                <div class="inputimg" @click="getdevice">
                                    <img :src="diji" alt />
                                </div>
                            </div>
                        </div>
                        <div class="margin" >
                            <span>{{lang.AlarmStatistics_AlarmStatisticsUserControl_EndTime}}</span>
                            <template>
                                <div class="block" v-if="sestion == 1">
                                    <el-date-picker
                                        v-model="nowtime2"
                                        type="datetime"
                                        :placeholder="lang.SCMSConsoleWebApiMySql_PleChooseDate"
                                        value-format="yyyy-MM-dd HH:mm:ss"
                                    ></el-date-picker>
                                </div>
                                <div class="block" v-else-if="sestion == 2">
                                    <el-date-picker
                                        v-model="wantnowdata.EndTime"
                                        type="datetime"
                                        :placeholder="lang.SCMSConsoleWebApiMySql_PleChooseDate"
                                        value-format="yyyy-MM-dd HH:mm:ss"
                                        disabled
                                    ></el-date-picker>
                                </div>

                                <div class="block" v-else-if="sestion == 3">
                                    <el-date-picker
                                        v-model="wantnowdata.EndTime"
                                        type="datetime"
                                        :placeholder="lang.SCMSConsoleWebApiMySql_PleChooseDate"
                                        value-format="yyyy-MM-dd HH:mm:ss"
                                    ></el-date-picker>
                                </div>
                            </template>
                        </div>
                        <div class="margin" v-if="sestion == 2 &&mesad3">
                            <span>{{lang.EquipmentAccount_MaturityTime}}</span>
                            <div class="inpimg">
                                <img :src="rili" alt class="inpimg1" />
                                <input type="text" :value="wantnowdata.MaturityTime" disabled />
                            </div>
                        </div>
                        <div class="margin" v-if="sestion == 2 && mesad3">
                            <span>{{lang.SCMSConsoleWebApiMySql_Enable}}</span>
                            <select v-model="person1" :disabled="disabled">
                                <option v-for="(item,index) in person" :key="index" :value="item">{{lang.ProcessParameterReport_HT_Yes}}</option>
                            </select>
                        </div>
                    </div>
                    <div class="overflow overflow1">
                        <span class="remarks">{{lang.AlarmRecord_FaultRetrieva_DataGrid_Description}}</span>
                        <textarea name id v-if="sestion == 1" :value="addremarks"></textarea>
                        <textarea
                            name
                            id
                            v-else-if="sestion == 2"
                            :placeholder="lang.EquipmentAccount_EquipmentRemarkTag"
                            v-model="wantnowdata.CloseRemarks"
                            disabled
                        ></textarea>
                        <textarea
                            name
                            id
                            v-else-if="sestion == 3"
                            :placeholder="lang.EquipmentAccount_EquipmentRemarkTag"
                            v-model="wantnowdata.CloseRemarks"
                        ></textarea>
                    </div>
                </div>
                <div class="Preservation" v-if="sestion == 1 || sestion == 3" @click="nopre">{{lang.PopupCommon_Save}}</div>
                <div class="cancel" @click="cancel" v-if="sestion == 1 || sestion == 3">{{lang.PopupCommon_Cancel}}</div>
            </div>
        </div>
        <div class="sestion sestion23" ref="kongtiao1" v-show="mesad2">
            <div class="sestionheader" :class="{colordiv:$store.state.color=='grey'}" >
                <div
                    class="sestionheader1"
                ></div>
                <span class="head" v-if="sestion == 2"   :class="{fcolor:$store.state.color=='grey'}">{{lang.MaintenanceManage_ViewMaintenanceExecutionResults}}</span>
                <span class="head" v-if="sestion == 1"   :class="{fcolor:$store.state.color=='grey'}">{{lang.SCMSConsoleWebApiMySql_SubmitMaintenanceExecutionResults}}</span>
                  <img :src="no2" alt class="no" @click.stop="mesad2 = false" v-if="$store.state.color=='grey'" />
                <img :src="no" alt class="no" @click.stop="mesad2 = false" v-else />
            </div>
            <div class="sestioncontain" >
                <div class="homesetion" >
                    <div class="hometop">
                        <p class="hometop-title" >{{lang.MaintenanceManage_MaintenanceInfo}}</p>
                        <div class="line"></div>
                    </div>
                </div>
                <div class="overflow" >
                    <div class="zl">
                        <div class="margin" >
                            <span >{{lang.MaintenanceManage_PlanName}}</span>
                            <input type="text" :value="sesstion.PlanName" disabled />
                        </div>
                        <div class="margin" >
                                <span  class="mi">{{lang.EquipmentAccount_EquipmentName}}</span>
                                <input type="text" :value="sesstion.DeviceName" disabled />
                            </div>
                        <div class="margin">
                            <span class="mi" >{{lang.MaintenanceManage_TaskStartTime}}</span>
                            <div class="inpimg">
                                <img :src="rili" alt class="inpimg1"/>
                                <input type="text" :value="sesstion.StartTime" disabled  />
                            </div>
                            
                             <el-tooltip   popper-class="atooltip" effect="dark" :content="lang.MaintenanceManage_TaskStartTimeToolTip" placement="bottom">
                                <div class="showtext" @mouseenter="atooltip">
                                  <i class="el-icon-question"></i>
                                </div>
                            </el-tooltip>

                        </div>
                        <div class="margin" >
                            <span class="sp6" >{{lang.MaintenanceManage_RepeatTaskCycle}}</span>
                            <div class="is" >
                                <input type="text" :value="sesstion.PeriodValue" disabled  />
                                <select name id v-model="sesstion.PeriodUnit" disabled  >
                                    <option
                                        v-for="(item,index) in sametimearr"
                                        :key="index"
                                        :value="item"
                                    >{{item}}</option>
                                </select>
                            </div>
                            
                            <el-tooltip   popper-class="atooltip" effect="dark" :content="lang.MaintenanceManage_RepeatTaskCycleToolTip" placement="bottom">
                                <div class="showtext" @mouseenter="atooltip">
                                  <i class="el-icon-question"></i>
                                </div>
                            </el-tooltip>

                        </div>
                        <div class="margin" >
                            <span class="sp6" >{{lang.MaintenanceManage_TaskAdvanceReminder}}</span>
                            <div class="is" >
                                <input
                                    type="text"
                                    :value="sesstion.ReminderTimeValue"
                                    disabled
                                    :placeholder="lang.EquipmentAccount_Optional"
                                   
                                />
                                <select name id v-model="sesstion.ReminderTimeUnit" disabled >
                                    <option
                                        v-for="(item,index) in sametimearr"
                                        :key="index"
                                        :value="item"
                                    >{{item}}</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="zr">
                        <div class="margin" >
                            <span  class="me">{{lang.MaintenanceManage_MaintenancePerson}}</span>
                            <select name id disabled >
                                <option value>{{sesstion.MaintenancePerson}}</option>
                            </select>
                        </div>
                        <div class="margin margin1" ></div>
                        <div class="margin" >
                            <span >{{lang.MaintenanceManage_TaskExecutionDuration}}</span>
                            <div class="is" >
                                <input type="text" @input="endValue()" v-model="sesstion.EndTimeValue" disabled />
                              
                                <select disabled name id @change="endValue()" v-model="sesstion.endTimeUnit"  >
                                    <option v-for="(item,index) in sametimearr" :key="index" :value="item">{{item}}</option>
                                </select>
                             
                            </div>
                            <!-- <div class="inpimg">
                                <img :src="rili" alt class="inpimg1" />
                                <input
                                    type="text"
                                    :value="sesstion.EndTime"
                                    disabled
                                    placeholder="选填"
                                />
                            </div> -->
                        </div>
                        <div class="margin" >
                            <span >{{lang.MaintenanceManage_PlanEndTime}}</span>
                            <div class="inpimg">
                                <img :src="rili" alt class="inpimg1" />
                                <input type="text" :value="sesstion.MaturityTime" disabled  />
                            </div>
                        </div>
                        <div class="margin" >
                            <span >{{lang.MaintenanceManage_PlanExecutionStatus}}</span>
                            <select v-model="person1" disabled >
                                <option v-for="(item,index) in person" :key="index" :value="item">{{lang.MaintenanceManage_Enable}}</option>
                            </select>
                        </div>
                    </div>
                    <div class="margin-remark" >
                        <span>{{lang.MaintenanceManage_TaskExecutionContent}}</span>
                        <textarea name id :value="sesstion.Remarks" disabled class="tet2"></textarea>
                    </div>
                </div>
                <div class="homesetion">
                    <div class="hometop">
                        <p class="hometop-title" >{{lang.MaintenanceManage_MaintenanceDetail}}</p>
                        <div class="line"></div>
                    </div>
                </div>
                <div class="overflow" >
                    <div class="margin-remark" v-if="sestion == 1" >
                        <span>{{lang.MaintenanceManage_ResultsOfExecution}}</span>
                        <textarea name id v-model="w" class="tet2"></textarea>
                    </div>
                </div>
                <div class="overflow" >
                    <div class="margin-remark" v-if="sestion == 2" >
                        <span>{{lang.MaintenanceManage_ResultsOfExecution}}</span>
                        <textarea name id v-model="w" disabled class="tet2"></textarea>
                    </div>
                </div>

                <div class="box" v-if="sestion == 1">
                    <el-checkbox v-model="sesstion.SynchronizeToSOP">{{lang.MaintenanceManage_SynchronizeToSOP}}</el-checkbox>
                </div>
                <div class="box" v-if="sestion == 2">
                    <el-checkbox v-model="sesstion.SynchronizeToSOP" disabled>{{lang.MaintenanceManage_SynchronizeToSOP}}</el-checkbox>
                </div>
                <div class="Preservation" @click="pre12" v-if="sestion == 1">{{lang.PopupCommon_Save}}</div>
                <div class="cancel" @click="cancel" v-if="sestion == 1">{{lang.PopupCommon_Cancel}}</div>
            </div>
        </div>

        <div class="Choice" v-if="cancel1" ref="kongtiao">
            <div class="choicehead">
                <div
                    class="choicehead1"
                    @mousedown="mouseDownHandleelse($event)"
                    @mouseup="mouseUpHandleelse($event)"
                ></div>
                <sapn v-if="select1 == 1">{{lang.EquipmentAccount_SelectEquipmentType}}</sapn>
                <sapn v-if="select1 == 2">{{lang.SCMSConsoleWebApiMySql_SelectInstallPosition}}</sapn>
                <div class="img" @click="cancel2">
                    <img :src="no" alt />
                </div>
            </div>
            <div class="choicecontant">
                <el-tree
                    :data="data5"
                    @node-click="handleNodeClick"
                    node-key="node.id"
                    default-expand-all
                    icon-class="el-icon-arrow-up"
                    v-if="sestion == 3"
                >
                    <span class="custom-tree-node" slot-scope="{ node, data }">
                        <span>
                            <img v-show="data.file" :src="data.file" alt class="img1" />
                            <i :class="data.icon"></i>
                            {{ node.label }}
                        </span>
                    </span>
                </el-tree>
                <el-tree
                    :data="data5"
                    @node-click="handleNodeClick1"
                    node-key="node.id"
                    default-expand-all
                    icon-class="el-icon-arrow-up"
                    v-if="sestion == 2"
                >
                    <span class="custom-tree-node" slot-scope="{ node, data }">
                        <span>
                            <img v-show="data.file" :src="data.file" alt class="img1" />
                            <i :class="data.icon"></i>
                            {{ node.label }}
                        </span>
                    </span>
                </el-tree>
            </div>
            <div class="Preservation Preservation1" v-if="sestion == 3" @click="Preservation2">{{lang.PopupCommon_Sure}}</div>
            <div class="Preservation Preservation1" v-if="sestion == 2" @click="Preservation3">{{lang.PopupCommon_Sure}}</div>
            <div class="cancel cancle1" @click="cancel2">{{lang.PopupCommon_Cancel}}</div>
        </div>
        <div class="tip" ref="kongtiao2" v-show="tipchange" >
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
        <div class="boxsad" v-show="daibang">
            <div
                class="tqp"
             
            ></div>
            <div class="tiphead"  :class="[{colordiv:$store.state.color=='grey'},{fcolor:$store.state.color=='grey'}]">
                <span  :class="{fcolor:$store.state.color=='grey'}">{{lang.MaintenanceManage_CloseTaskTitle}}</span>
                <img
                    :src="no2"
                    alt
                    class="no"
                    @click="cancel"
                    v-if="$store.state.color=='grey'"
                />
                <img :src="no" alt class="no" @click="cancel" v-else />
            </div>

            <div class="t">
                <span class="w">{{lang.MaintenanceManage_Remark}}</span>
                <textarea name id cols="30" rows="10" :placeholder="lang.MaintenanceManage_InputCloseReason" v-model="gbword"></textarea>
                <div class="Preservation" @click="gb">{{lang.PopupCommon_Sure}}</div>
                <div class="cancel" @click.stop="cancel">{{lang.PopupCommon_Cancel}}</div>

                <!-- <img :src="gth" alt /> -->
            </div>
        </div>
        <div class="cover1" v-if="change"></div>
        <div class="cover3" v-if="cancel1"></div>
        <div class="cover2" v-if="tipchange"></div>
        <div class="cover4" v-if="offdecive"></div>
        <div class="cover5" v-if="change11"></div>
        <div class="cover6" v-if="mesad2"></div>
        <div class="cover7" v-if="daibang"></div>
    </div>
</template>

<script>
import MySearch from '../public/search01.vue';
// import MyPage from '../public/Pages.vue';
import XLSX from 'xlsx';
import moment from 'moment'//导入文件

export default {
    components: {
        // MySearch,
        // MyPage
    },
    data() {
        return {
            w: 'qweqw0',
            checked: true,
            aaa: false,
            bbb: false,
            a1: 1,
            a2: 1,
            nowpage: 1,
            value1: new Date(new Date().toLocaleDateString()),
            value2: new Date(
                new Date(new Date().toLocaleDateString()).getTime() +
                    24 * 60 * 60 * 1000 -
                    1
            ),
            nowtime1: '',

            nowtime2: '',
            data7: [],
            deltrue: true,
            changeselect: false,
            tipword: '',
            argID: '',
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
            ID: '',
            daibang: false,
            change1: false,
            nowIndex: 1,
            pageDate: {
                pageIndex: 1,
                pagesize: 50,
                togeIndex: 0,
                togesize: 0
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
            oneselect: '',
            oneselectid: '',
            over: '已处理',
            tableData1: [],
            antable: [],
            tipchange: false,
            gth: require('../../assets/images/gth.png'),
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
            change11: false,
            PageData: {
                PageSize: 50,
                TotalCount: 0,
                TotalPage: 1,
                PageIndex: 1,
                LastEnabled: false,
                NextEnabled: false
            },
            outputs: [],
            tableData: [],
            multipleSelection: [],
            excelData: [],
            selectname: [],
            selectname1: [],
            cancel1: false,
            Meter: '',
            Meterid: '',
            wantnowdata: '',
            Meter1: '不限',
            Meter2: '不限',
            aid: '',
            AID: '',
            wantword: '',
            look: require('../../assets/images/icon_look.png'),
            no: require('../../assets/images/no.png'),
            no2: require('../../assets/images/no2.png'),
            pensoil: require('../../assets/images/icon_pensoil.png'),
            diji: require('../../assets/images/icon_diji.png'),
            rili: require('../../assets/images/rili.png'),
            change: false,
            keyword: '',
            sesstion: '',
            disabled: '',
            pagesize: 50,
            pageindex: 1,
            sestion: 1,
            Preservation: '点击选择',
            Preservation1: '点击选择',
            Preservation5: '点击选择',
            hastip: 1,
            sbnum: 1,
            time4: '',
            muchdata: '',
            a: 1,
            sametimearr: ['小时', '天', '周', '月'],
            data6: [],
            selectword3: false,
            longinnum: '',
            deldata: {},
            delarray: [],
            yesdel: '',
            projectkeyword: '',
            gbword: '',
            oldName: '',
            offdecive: false,
            projectlistdata: [],
            projectlistdata1: [],
            ztarr: ['不限', '未开始', '进行中', '已延误'],
            leixinarr: ['不限', '计划维修', '故障维修'],
            projectlistdataL: {},
            supermin: ['SuperAdmin', 'Guest'],
            deviceperson: 'SuperAdmin',
            addremarks: '',
              xiala:require('../../assets/images/ziyuan4.png'),
            taskname: '',
            c: '',
            arr: ['已处理', '未发现原因'],
            abc: '',
            mesad1: false,
            mesad2: false,
            mesad3: false,
            onestaion: '',
            cxid:'',
            cxshow:true,
            tjid:'',
            tjshow:true,
            gbid:'',
            gbshow:true,
            ckid:'',
            ckshow:true,
            zoom: 1,
            lang: JSON.parse(localStorage.getItem('languages'))[localStorage.getItem('currentLang')]
        };
    },

    created() {
        this.getLangData()
        this.getEquipmentType();
        this.req(1);
        this.time4 = this.getNowTime();
                    this.jurisdiction = this.$store.state.btnPowerData
     this.buttonarr = this.findPathByLeafId(this.GetUrlParam('id'),this.jurisdiction)[0].Children
      console.log("buttonarr",this.buttonarr)
        this.buttonarr.forEach((item)=>{
         if(item.RightName == "代办保养-查询按钮"){
          this.cxid = item.RightID
         }else if(item.RightName == "代办保养-提交按钮"){
          this.tjid = item.RightID
         }else if(item.RightName == "代办保养-关闭按钮"){
          this.gbid = item.RightID
         }else if(item.RightName == "代办保养-查看按钮"){
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
      console.log("buttonarr",this.buttonarr)
        this.buttonarr.forEach((item)=>{
         if(item.RightName == "代办保养-查询按钮"){
          this.cxid = item.RightID
         }else if(item.RightName == "代办保养-提交按钮"){
          this.tjid = item.RightID
         }else if(item.RightName == "代办保养-关闭按钮"){
          this.gbid = item.RightID
         }else if(item.RightName == "代办保养-查看按钮"){
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
           },
        device(newval) {
            if (newval == this.lang.EquipmentAccount_Used) {
                this.sbnum = 1;
            } else if (newval == this.lang.EquipmentAccount_Stopped) {
                this.sbnum = 2;
            } else if (newval == this.lang.EquipmentAccount_Abandoned) {
                this.sbnum = 3;
            }
        },
        w(val) {
            console.log(val);
        },
        warry(newval) {
            if (newval == this.lang.EquipmentAccount_Used) {
                this.warrynum = 1;
            } else if (newval == this.lang.EquipmentAccount_Outside) {
                this.warrynum = 2;
            }
        }
    },

    methods: {
        getLangData() {
            this.over =  this.lang.RepairManage_Processed
            this.warrantystatus =  [this.lang.EquipmentAccount_Inside, this.lang.EquipmentAccount_Outside]
            this.devicestatus =  [this.lang.EquipmentAccount_Used, this.lang.EquipmentAccount_Stopped, this.lang.EquipmentAccount_Abandoned]
            this.warry =  this.lang.EquipmentAccount_Inside
            this.device =  this.lang.EquipmentAccount_Used
            this.Meter1 =  this.lang.AlarmRecord_HT_Unlimited
            this.Meter2 =  this.lang.AlarmRecord_HT_Unlimited
            this.Preservation =  this.lang.EquipmentAccount_ClickSelect
            this.Preservation1 =  this.lang.EquipmentAccount_ClickSelect
            this.Preservation5 =  this.lang.EquipmentAccount_ClickSelect
            this.sametimearr =  [this.lang.HMI_HT_LineChartWindowViewModel_Hour, this.lang.MaintenanceManage_Day, this.lang.HMI_HT_LineChartWindowViewModel_Week, this.lang.HMI_HT_LineChartWindowViewModel_Month]
            this.ztarr =  [this.lang.AlarmRecord_HT_Unlimited, this.lang.MaintenanceManage_NotStarted, this.lang.MaintenanceManage_Ongoing, this.lang.MaintenanceManage_Delayed]
            this.leixinarr =  [this.lang.AlarmRecord_HT_Unlimited, this.lang.RepairManage_PlanRepair, this.lang.RepairManage_FaultRepair]
            this.arr =  [this.lang.RepairManage_Processed, this.lang.RepairManage_NoCauseWasFound]
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
        pre1() {
            if (this.sestion == 1) {
                this.Preservation = this.wantword;
                console.log(this.Preservation);
                if (!this.Preservation) {
                    this.tipword = this.lang.FileManage_SelectEquipment;
                        setTimeout(() => {
                            $('.tip').css({
                                zoom: this.zoom,
                                left: `calc(50% - ${($('.tip').width() / 2) *
                                    this.zoom}px)`,
                                top: `calc(50% - ${($('.tip').height() / 2) *
                                    this.zoom}px)`
                            });
                            this.$store.state.div = 'tip'
this.$store.state.divtop = 'tiphead'  
this.tipchange = true
this.$store.commit('move')
                        });
                } else {
                    this.offdecive = false;
                }
            } else if (this.sestion == 3) {
                console.log(this.wantnowdata);
                this.AID = this.aid;
                this.wantnowdata.DeviceName = this.wantword;
                this.offdecive = false;
            }
        },
                 sx(){
            let that = this
            setTimeout(()=>{
for(let i=0;i<$('.el-picker-panel').length;i++){
                $('.el-picker-panel')[i].style.zoom = that.zoom
            }
            })
              
        },
           atooltip(){
           let that = this
            setTimeout(()=>{
for(let i=0;i<$('.atooltip').length;i++){
                $('.atooltip')[i].style.zoom = this.zoom
            }
            })
        },
        handleNodeClic6(data) {
            this.Meter = data.label;
            this.Meterid = data.NID;
            this.changeselect = false;
        },
        handleNodeClic7(data) {
            this.oneselect = data.label;
            this.oneselectid = data.NID;
            this.selectword3 = false;
        },
         isPositiveInteger(s) {
            //是否为正整数
            var re = /^[0-9]+$/;
            return re.test(s);
        },
        no1() {
            this.tipchange = false;
            this.deltrue = true;
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
     jump() {
            if (!this.isPositiveInteger(this.nowpage)) {
                    setTimeout(() => {
                            $('.tip').css({
                                zoom: this.zoom,
                                left: `calc(50% - ${($('.tip').width() / 2) *
                                    this.zoom}px)`,
                                top: `calc(50% - ${($('.tip').height() / 2) *
                                    this.zoom}px)`
                            });
                            this.$store.state.div = 'tip'
this.$store.state.divtop = 'tiphead'  
this.tipchange = true
this.$store.commit('move')
                        });
                this.tipword = this.lang.RoleManage_HT_PEAPositiveInteger;
                    setTimeout(() => {
                            $('.tip').css({
                                zoom: this.zoom,
                                left: `calc(50% - ${($('.tip').width() / 2) *
                                    this.zoom}px)`,
                                top: `calc(50% - ${($('.tip').height() / 2) *
                                    this.zoom}px)`
                            });
                            this.$store.state.div = 'tip'
this.$store.state.divtop = 'tiphead'  
this.tipchange = true
this.$store.commit('move')
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
                                zoom: this.zoom,
                                left: `calc(50% - ${($('.tip').width() / 2) *
                                    this.zoom}px)`,
                                top: `calc(50% - ${($('.tip').height() / 2) *
                                    this.zoom}px)`
                            });
                            this.$store.state.div = 'tip'
this.$store.state.divtop = 'tiphead'  
this.tipchange = true
this.$store.commit('move')
                        });
                        return;
                    }
                }
            }

            this.PageData.PageIndex = this.nowpage;
            this.onetable();
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
        getdevice() {
            this.$axios
                .post(
                    `/api/MaintenanceManage/MaintenanceManage_GstEquipmentAccount`
                )
                .then(res => {
                    console.log(res);
                    this.projectlistdata = res.data.data;
                    this.projectlistdata1 = res.data.data;
                    this.offdecive = true;
                    this.selectword3 = false;
                    this.projectkeyword = '';
                });
        },
        yes1() {
            this.tipchange = false;
            this.$axios
                .post(
                    `/api/RepairManage/RepairManage_DeleteUpcoming?argID=${this.argID}`
                )
                .then(res => {
                    console.log(res);
                    this.tipword = this.lang.FormulaManage_HT_DeletedSuccessfully;
                        setTimeout(() => {
                            $('.tip').css({
                                zoom: this.zoom,
                                left: `calc(50% - ${($('.tip').width() / 2) *
                                    this.zoom}px)`,
                                top: `calc(50% - ${($('.tip').height() / 2) *
                                    this.zoom}px)`
                            });
                            this.$store.state.div = 'tip'
this.$store.state.divtop = 'tiphead'  
this.tipchange = true
this.$store.commit('move')
                        });
                    this.deltrue = true;
                    this.getsetime();
                });
        },
        del() {
            if (this.c.TaskType !== this.lang.RepairManage_PlanRepair) {
                if (this.argID !== '') {
                    this.tipword = this.lang.EquipmentAccount_SureToDelete
                        setTimeout(() => {
                            $('.tip').css({
                                zoom: this.zoom,
                                left: `calc(50% - ${($('.tip').width() / 2) *
                                    this.zoom}px)`,
                                top: `calc(50% - ${($('.tip').height() / 2) *
                                    this.zoom}px)`
                            });
                            this.$store.state.div = 'tip'
this.$store.state.divtop = 'tiphead'  
this.tipchange = true
this.$store.commit('move')
                        });
                    this.deltrue = false;
                } else {
                    this.deltrue = true;
                    this.tipword = this.lang.RepairManage_SelectTask
                        setTimeout(() => {
                            $('.tip').css({
                                zoom: this.zoom,
                                left: `calc(50% - ${($('.tip').width() / 2) *
                                    this.zoom}px)`,
                                top: `calc(50% - ${($('.tip').height() / 2) *
                                    this.zoom}px)`
                            });
                            this.$store.state.div = 'tip'
this.$store.state.divtop = 'tiphead'  
this.tipchange = true
this.$store.commit('move')
                        });
                }
            } else {
                this.tipword = this.lang.RepairManage_CannotDeletePlanRepairType
                    setTimeout(() => {
                            $('.tip').css({
                                zoom: this.zoom,
                                left: `calc(50% - ${($('.tip').width() / 2) *
                                    this.zoom}px)`,
                                top: `calc(50% - ${($('.tip').height() / 2) *
                                    this.zoom}px)`
                            });
                            this.$store.state.div = 'tip'
this.$store.state.divtop = 'tiphead'  
this.tipchange = true
this.$store.commit('move')
                        });
                this.deltrue = true;
            }
        },
        preservation6() {
            this.anythingdata();
            let i = 0;
            if (this.pen.DepreciationLife == null) {
                this.pen.DepreciationLife = '';
            }
            if (this.pen.PurchaseAmount == null) {
                this.pen.PurchaseAmount = '';
            }
            if (this.device == this.lang.EquipmentAccount_Used) {
                this.sbnum = 1;
            } else if (this.device == this.lang.EquipmentAccount_Stopped) {
                this.sbnum = 2;
            } else if (this.device == this.lang.EquipmentAccount_Abandoned) {
                this.sbnum = 3;
            }
            if (this.warry == this.lang.EquipmentAccount_Inside) {
                this.warrynum = 1;
            } else if (this.warry == this.lang.EquipmentAccount_Outside) {
                this.warrynum = 2;
            }
            for (i in this.muchdata) {
                if (i == this.a) {
                    this.hastip = 1;
                    continue;
                } else if (this.muchdata[i].DeviceName == this.pen.DeviceName) {
                    this.hastip = 2;
                    break;
                } else {
                    this.hastip = 1;
                }
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
        cancel11() {
            this.offdecive = false;
        },
        preservation() {
            let i = 0;
            if (
                !JSON.parse(sessionStorage.getItem('userInfo1')) ||
                JSON.parse(sessionStorage.getItem('userInfo1')) == null
            ) {
                this.longinnum = JSON.parse(
                    sessionStorage.getItem('sightseerInfo1')
                ).SCMSUserAccount;
            } else {
                this.longinnum = JSON.parse(
                    sessionStorage.getItem('userInfo1')
                ).SCMSUserAccount;
            }
            for (i in this.muchdata) {
                if (this.muchdata[i].DeviceName == this.tip.DeviceName) {
                    this.hastip = 2;
                    break;
                } else {
                    this.hastip = 1;
                }
            }
            if (!this.tip.DeviceName) {
                this.tipword = this.lang.EquipmentAccount_EquipmentNameIsEmpty
                    setTimeout(() => {
                            $('.tip').css({
                                zoom: this.zoom,
                                left: `calc(50% - ${($('.tip').width() / 2) *
                                    this.zoom}px)`,
                                top: `calc(50% - ${($('.tip').height() / 2) *
                                    this.zoom}px)`
                            });
                            this.$store.state.div = 'tip'
this.$store.state.divtop = 'tiphead'  
this.tipchange = true
this.$store.commit('move')
                        });
            } else if (this.hastip == 2) {
                this.tipword = this.lang.EquipmentAccount_EquipmentNameIsExist
                    setTimeout(() => {
                            $('.tip').css({
                                zoom: this.zoom,
                                left: `calc(50% - ${($('.tip').width() / 2) *
                                    this.zoom}px)`,
                                top: `calc(50% - ${($('.tip').height() / 2) *
                                    this.zoom}px)`
                            });
                            this.$store.state.div = 'tip'
this.$store.state.divtop = 'tiphead'  
this.tipchange = true
this.$store.commit('move')
                        });
            } else if (!this.tip.DeviceNo) {
                this.tipword = this.lang.EquipmentAccount_EquipmentNumberIsEmpty
                    setTimeout(() => {
                            $('.tip').css({
                                zoom: this.zoom,
                                left: `calc(50% - ${($('.tip').width() / 2) *
                                    this.zoom}px)`,
                                top: `calc(50% - ${($('.tip').height() / 2) *
                                    this.zoom}px)`
                            });
                            this.$store.state.div = 'tip'
this.$store.state.divtop = 'tiphead'  
this.tipchange = true
this.$store.commit('move')
                        });
            } else if (this.Preservation == this.lang.EquipmentAccount_ClickSelect) {
                this.tipword = this.lang.EquipmentAccount_EquipmentTypeIsEmpty
                    setTimeout(() => {
                            $('.tip').css({
                                zoom: this.zoom,
                                left: `calc(50% - ${($('.tip').width() / 2) *
                                    this.zoom}px)`,
                                top: `calc(50% - ${($('.tip').height() / 2) *
                                    this.zoom}px)`
                            });
                            this.$store.state.div = 'tip'
this.$store.state.divtop = 'tiphead'  
this.tipchange = true
this.$store.commit('move')
                        });
            } else if (!this.tip.AssetsNo) {
                this.tipword = this.lang.EquipmentAccount_AssetNumberIsEmpty
                    setTimeout(() => {
                            $('.tip').css({
                                zoom: this.zoom,
                                left: `calc(50% - ${($('.tip').width() / 2) *
                                    this.zoom}px)`,
                                top: `calc(50% - ${($('.tip').height() / 2) *
                                    this.zoom}px)`
                            });
                            this.$store.state.div = 'tip'
this.$store.state.divtop = 'tiphead'  
this.tipchange = true
this.$store.commit('move')
                        });
            } else if (this.Preservation5 == this.lang.EquipmentAccount_ClickSelect) {
                this.tipword = this.lang.EquipmentAccount_InstallPositionIsEmpty
                    setTimeout(() => {
                            $('.tip').css({
                                zoom: this.zoom,
                                left: `calc(50% - ${($('.tip').width() / 2) *
                                    this.zoom}px)`,
                                top: `calc(50% - ${($('.tip').height() / 2) *
                                    this.zoom}px)`
                            });
                            this.$store.state.div = 'tip'
this.$store.state.divtop = 'tiphead'  
this.tipchange = true
this.$store.commit('move')
                        });
            } else if (
                isNaN(this.tip.DepreciationLife) &&
                !this.tip.DepreciationLife.length == 0
            ) {
                this.tipword = this.lang.EquipmentAccount_PeriodOfDepreciationMustBePositiveInteger
                    setTimeout(() => {
                            $('.tip').css({
                                zoom: this.zoom,
                                left: `calc(50% - ${($('.tip').width() / 2) *
                                    this.zoom}px)`,
                                top: `calc(50% - ${($('.tip').height() / 2) *
                                    this.zoom}px)`
                            });
                            this.$store.state.div = 'tip'
this.$store.state.divtop = 'tiphead'  
this.tipchange = true
this.$store.commit('move')
                        });
            } else if (
                !/(^[1-9]\d*$)/.test(this.tip.DepreciationLife) &&
                !this.tip.DepreciationLife.length == 0
            ) {
                this.tipword = this.lang.EquipmentAccount_PeriodOfDepreciationMustBePositiveInteger
                    setTimeout(() => {
                            $('.tip').css({
                                zoom: this.zoom,
                                left: `calc(50% - ${($('.tip').width() / 2) *
                                    this.zoom}px)`,
                                top: `calc(50% - ${($('.tip').height() / 2) *
                                    this.zoom}px)`
                            });
                            this.$store.state.div = 'tip'
this.$store.state.divtop = 'tiphead'  
this.tipchange = true
this.$store.commit('move')
                        });
            } else if (
                isNaN(this.tip.PurchaseAmount) &&
                !this.tip.PurchaseAmount.length == 0
            ) {
                this.tipword = this.lang.EquipmentAccount_PeriodOfDepreciationMustBePositiveInteger
                    setTimeout(() => {
                            $('.tip').css({
                                zoom: this.zoom,
                                left: `calc(50% - ${($('.tip').width() / 2) *
                                    this.zoom}px)`,
                                top: `calc(50% - ${($('.tip').height() / 2) *
                                    this.zoom}px)`
                            });
                            this.$store.state.div = 'tip'
this.$store.state.divtop = 'tiphead'  
this.tipchange = true
this.$store.commit('move')
                        });
            } else if (
                !/(^[1-9]\d*$)/.test(this.tip.PurchaseAmount) &&
                !this.tip.PurchaseAmount.length == 0
            ) {
                this.tipword = this.lang.EquipmentAccount_PeriodOfDepreciationMustBePositiveInteger
                    setTimeout(() => {
                            $('.tip').css({
                                zoom: this.zoom,
                                left: `calc(50% - ${($('.tip').width() / 2) *
                                    this.zoom}px)`,
                                top: `calc(50% - ${($('.tip').height() / 2) *
                                    this.zoom}px)`
                            });
                            this.$store.state.div = 'tip'
this.$store.state.divtop = 'tiphead'  
this.tipchange = true
this.$store.commit('move')
                        });
            } else {
                this.$axios
                    .post(
                        `/api/EquipmentAccount/EquipmentAccount_SetEquipmentAccount?argClass={"AID":"11111111-1111-1111-1111-111111111111","DeviceName":"${this.tip.DeviceName}","DeviceNo":"${this.tip.DeviceNo}","DeviceType":"${this.Preservation}","DeviceModel":"${this.tip.DeviceModel}","AssetsNo":"${this.tip.AssetsNo}","InstallationLocation":"${this.Preservation5}","Department":"${this.tip.Department}","PersonInCharge":"${this.person1}","Manufactor":"${this.tip.Manufactor}","DepreciationLife":"${this.tip.DepreciationLife}","PurchaseTime":"${this.time1}","PurchaseAmount":"${this.tip.PurchaseAmount}","Salesman":"${this.tip.Salesman}","Contact":"${this.tip.Contact}","CheckTime":"${this.time2}","EnableTime":"${this.time3}","DeviceStatus":${this.sbnum},"QualityStatus":${this.warrynum},"Remarks":"${this.tip.Remarks}","AddTime":"${this.time4}"}&argOperateType=1&argOldName=2019-11-26 11:56:15&argLoginUserName=${this.longinnum}&argPageSize=50&argPageIndex=1`
                    )
                    .then(res => {
                        this.tipword = this.lang.EquipmentAccount_SuccessfullyAdded
                            setTimeout(() => {
                            $('.tip').css({
                                zoom: this.zoom,
                                left: `calc(50% - ${($('.tip').width() / 2) *
                                    this.zoom}px)`,
                                top: `calc(50% - ${($('.tip').height() / 2) *
                                    this.zoom}px)`
                            });
                            this.$store.state.div = 'tip'
this.$store.state.divtop = 'tiphead'  
this.tipchange = true
this.$store.commit('move')
                        });
                        this.getEquipmentType();
                        this.req(1);
                        this.change = false;
                    })
                    .then(() => {
                        (this.tip.DeviceName = ''),
                            (this.tip.DeviceNo = ''),
                            (this.Preservation = ''),
                            (this.tip.DeviceModel = ''),
                            (this.tip.AssetsNo = ''),
                            (this.tip.Department = ''),
                            (this.tip.Manufactor = ''),
                            (this.tip.DepreciationLife = ''),
                            (this.tip.PurchaseAmount = ''),
                            (this.tip.Salesman = ''),
                            (this.tip.Contact = ''),
                            (this.tip.Remarks = ''),
                            (this.person1 = 'SuperAdmin'),
                            (this.sbnum = ''),
                            (this.warrynum = '');
                        this.device = this.lang.EquipmentAccount_Used;
                        this.warry = this.lang.EquipmentAccount_Inside;
                    })
                    .catch(err => {});
            }
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
        mouseDownHandleelse(event) {
            event.currentTarget.style.cursor = 'move';
            window.onmousemove = this.mouseMoveHandleelse;
        },
        mouseDownHandleelse12(event) {
            event.currentTarget.style.cursor = 'move';
            window.onmousemove = this.mouseMoveHandleelse12;
        },
        mouseDownHandleelse1(event) {
            event.currentTarget.style.cursor = 'move';
            window.onmousemove = this.mouseMoveHandleelse1;
        },
        mouseDownHandleelse2(event) {
            event.currentTarget.style.cursor = 'move';
            window.onmousemove = this.mouseMoveHandleelse2;
        },
        mouseDownHandleelse5(event) {
            event.currentTarget.style.cursor = 'move';
            window.onmousemove = this.mouseMoveHandleelse5;
        },
        mouseMoveHandleelse(event) {
            let moveLeft = event.pageX - 350 + 'px';
            let moveTop = event.pageY - 30 + 'px';
            this.$refs.kongtiao.style.left = moveLeft;
            this.$refs.kongtiao.style.top = moveTop;
        },
        mouseMoveHandleelse12(event) {
            let moveLeft = event.pageX - 250 + 'px';
            let moveTop = event.pageY - 30 + 'px';
            this.$refs.kongtiao12.style.left = moveLeft;
            this.$refs.kongtiao12.style.top = moveTop;
        },
        mouseMoveHandleelse5(event) {
            let moveLeft = event.pageX - 550 + 'px';
            let moveTop = event.pageY - 30 + 'px';
            this.$refs.kongtiao5.style.left = moveLeft;
            this.$refs.kongtiao5.style.top = moveTop;
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
        mouseUpHandleelse12(event) {
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
        mouseUpHandleelse5(event) {
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
            this.change11 = false;
            this.mesad2 = false;
            this.daibang = false;
            let ss = JSON.stringify(this.antable);
            this.tableData1 = JSON.parse(ss);
        },
        Preservation2() {
            this.Preservation = this.Preservation1;
            if (this.Preservation1 == this.lang.EquipmentAccount_EquipmentType) {
                this.tipword = this.lang.EquipmentAccount_SelectEquipmentType1
                    setTimeout(() => {
                            $('.tip').css({
                                zoom: this.zoom,
                                left: `calc(50% - ${($('.tip').width() / 2) *
                                    this.zoom}px)`,
                                top: `calc(50% - ${($('.tip').height() / 2) *
                                    this.zoom}px)`
                            });
                            this.$store.state.div = 'tip'
this.$store.state.divtop = 'tiphead'  
this.tipchange = true
this.$store.commit('move')
                        });
            } else if (this.Preservation5 == this.lang.EquipmentAccount_InstallPosition) {
                this.tipword = this.lang.EquipmentAccount_SelectInstallPosition
                    setTimeout(() => {
                            $('.tip').css({
                                zoom: this.zoom,
                                left: `calc(50% - ${($('.tip').width() / 2) *
                                    this.zoom}px)`,
                                top: `calc(50% - ${($('.tip').height() / 2) *
                                    this.zoom}px)`
                            });
                            this.$store.state.div = 'tip'
this.$store.state.divtop = 'tiphead'  
this.tipchange = true
this.$store.commit('move')
                        });
            } else {
                this.cancel1 = false;
            }
        },
        Preservation3() {
            this.Preservation = this.Preservation1;
            if (this.pen.DeviceType == this.lang.EquipmentAccount_EquipmentType) {
                this.tipword = this.lang.EquipmentAccount_SelectEquipmentType1
                this.pen.DeviceType = this.lang.EquipmentAccount_ClickSelect
                    setTimeout(() => {
                            $('.tip').css({
                                zoom: this.zoom,
                                left: `calc(50% - ${($('.tip').width() / 2) *
                                    this.zoom}px)`,
                                top: `calc(50% - ${($('.tip').height() / 2) *
                                    this.zoom}px)`
                            });
                            this.$store.state.div = 'tip'
this.$store.state.divtop = 'tiphead'  
this.tipchange = true
this.$store.commit('move')
                        });
            } else if (this.pen.InstallationLocation == this.lang.EquipmentAccount_InstallPosition) {
                this.tipword = this.lang.EquipmentAccount_SelectInstallPosition
                this.pen.InstallationLocation = this.lang.EquipmentAccount_ClickSelect
                    setTimeout(() => {
                            $('.tip').css({
                                zoom: this.zoom,
                                left: `calc(50% - ${($('.tip').width() / 2) *
                                    this.zoom}px)`,
                                top: `calc(50% - ${($('.tip').height() / 2) *
                                    this.zoom}px)`
                            });
                            this.$store.state.div = 'tip'
this.$store.state.divtop = 'tiphead'  
this.tipchange = true
this.$store.commit('move')
                        });
            } else {
                this.cancel1 = false;
            }
        },
        handleEdit11(a, b) {
             if(!this.ckshow){
                   setTimeout(() => {
                            $('.tip').css({
                                zoom: this.zoom,
                                left: `calc(50% - ${($('.tip').width() / 2) *
                                    this.zoom}px)`,
                                top: `calc(50% - ${($('.tip').height() / 2) *
                                    this.zoom}px)`
                            });
                            this.$store.state.div = 'tip'
this.$store.state.divtop = 'tiphead'  
this.tipchange = true
this.$store.commit('move')
                        });
               this.tipword = this.lang.NoOperationAuthority;
               return
            }
            this.disabled = false;

            this.sestion = 2;
                     setTimeout(() => {
                            $('.sestion23').css({
                                zoom: this.zoom,
                                left: `calc(50% - ${($('.sestion23').width() / 2) *
                                    this.zoom}px)`,
                                top: `calc(50% - ${($('.sestion23').height() / 2) *
                                    this.zoom}px)`
                            });
                            this.$store.state.div = 'sestion23'
this.$store.state.divtop = 'sestionheader1'  
this.mesad2 = true;
this.$store.commit('move')
                        });
            if (!b.DeviceName == null) {
                b.DeviceName = this.lang.EquipmentAccount_ClickSelect
            }
            this.sesstion = b;
            
                this.sesstion.EndTimeValue='',
                this.sesstion.endTimeUnit=this.lang.HMI_HT_LineChartWindowViewModel_Hour

                 //初始化时间
                var startime = moment(this.sesstion.StartTime)
                var endtime = moment(this.sesstion.EndTime)
                var jsvalue = endtime.diff(startime,'hours')
                var ss = this.sesstion.StartTime.slice(8)
                var ee = this.sesstion.EndTime.slice(8)
                var cc = ss == ee
                if(cc){
                        jsvalue = endtime.diff(startime,'months')
                        this.sesstion.EndTimeValue = jsvalue
                        this.sesstion.endTimeUnit = this.lang.HMI_HT_LineChartWindowViewModel_Month
                }else{
                    if(jsvalue % 168 == 0){
                        this.sesstion.EndTimeValue = jsvalue / 168
                        this.sesstion.endTimeUnit = this.lang.HMI_HT_LineChartWindowViewModel_Week
                    }else if(jsvalue % 24 == 0){
                        this.sesstion.EndTimeValue = jsvalue / 24
                        this.sesstion.endTimeUnit = this.lang.MaintenanceManage_Day
                    }else{
                        this.sesstion.EndTimeValue = jsvalue
                        this.sesstion.endTimeUnit = this.lang.HMI_HT_LineChartWindowViewModel_Hour
                    }
                }

            this.w = this.sesstion.CloseRemarks;
            if (this.sesstion.PeriodUnit == 1) {
                this.sesstion.PeriodUnit = this.lang.HMI_HT_LineChartWindowViewModel_Hour;
            } else if (this.sesstion.PeriodUnit == 2) {
                this.sesstion.PeriodUnit = this.lang.MaintenanceManage_Day;
            } else if (this.sesstion.PeriodUnit == 3) {
                this.sesstion.PeriodUnit = this.lang.HMI_HT_LineChartWindowViewModel_Week;
            } else if (this.sesstion.PeriodUnit == 4) {
                this.sesstion.PeriodUnit = this.lang.HMI_HT_LineChartWindowViewModel_Month;
            }
            if (this.sesstion.ReminderTimeUnit == 1) {
                this.sesstion.ReminderTimeUnit = this.lang.HMI_HT_LineChartWindowViewModel_Hour;
            } else if (this.sesstion.ReminderTimeUnit == 2) {
                this.sesstion.ReminderTimeUnit = this.lang.MaintenanceManage_Day;
            } else if (this.sesstion.ReminderTimeUnit == 3) {
                this.sesstion.ReminderTimeUnit = this.lang.HMI_HT_LineChartWindowViewModel_Week;
            } else if (this.sesstion.ReminderTimeUnit == 4) {
                this.sesstion.ReminderTimeUnit = this.lang.HMI_HT_LineChartWindowViewModel_Month;
            }
        },
        handleEdit3(a, b) {
               if(!this.gbshow){
                   setTimeout(() => {
                            $('.tip').css({
                                zoom: this.zoom,
                                left: `calc(50% - ${($('.tip').width() / 2) *
                                    this.zoom}px)`,
                                top: `calc(50% - ${($('.tip').height() / 2) *
                                    this.zoom}px)`
                            });
                            this.$store.state.div = 'tip'
this.$store.state.divtop = 'tiphead'  
this.tipchange = true
this.$store.commit('move')
                        });
               this.tipword = this.lang.NoOperationAuthority;
               return
            }
            this.gbword = ''
           
            this.aid = b.TID;
                  setTimeout(() => {
                        $('.boxsad').css({
                            zoom: this.zoom,
                            left: `calc(50% - ${($('.boxsad').width() / 2) *
                                this.zoom}px)`,
                            top: `calc(50% - ${($('.boxsad').height() / 2) *
                                this.zoom}px)`
                        });
                        this.daibang = true;
                        this.$store.state.div = 'boxsad'
                        this.$store.state.divtop = 'tqp'  
                        this.$store.commit('move')
                    });
           
            // this.change11 = true;
        },
        handleEdit111(a, b) {
            if(!this.tjshow){
                   setTimeout(() => {
                            $('.tip').css({
                                zoom: this.zoom,
                                left: `calc(50% - ${($('.tip').width() / 2) *
                                    this.zoom}px)`,
                                top: `calc(50% - ${($('.tip').height() / 2) *
                                    this.zoom}px)`
                            });
                            this.$store.state.div = 'tip'
this.$store.state.divtop = 'tiphead'  
this.tipchange = true
this.$store.commit('move')
                        });
               this.tipword = this.lang.NoOperationAuthority;
               return
            }
            this.disabled = false;
            this.sestion = 1;
                     setTimeout(() => {
                            $('.sestion23').css({
                                zoom: this.zoom,
                                left: `calc(50% - ${($('.sestion23').width() / 2) *
                                    this.zoom}px)`,
                                top: `calc(50% - ${($('.sestion23').height() / 2) *
                                    this.zoom}px)`
                            });
                            this.$store.state.div = 'sestion23'
this.$store.state.divtop = 'sestionheader1'  
this.mesad2 = true;
this.$store.commit('move')
                        });
            this.sesstion = b;
            
            this.sesstion.EndTimeValue='',
            this.sesstion.endTimeUnit=this.lang.HMI_HT_LineChartWindowViewModel_Hour
        
            //初始化时间
            var startime = moment(this.sesstion.StartTime)
            var endtime = moment(this.sesstion.EndTime)
            var jsvalue = endtime.diff(startime,'hours')
            var ss = this.sesstion.StartTime.slice(8)
            var ee = this.sesstion.EndTime.slice(8)
            var cc = ss == ee
            if(cc){
                    jsvalue = endtime.diff(startime,'months')
                    this.sesstion.EndTimeValue = jsvalue
                    this.sesstion.endTimeUnit = this.lang.HMI_HT_LineChartWindowViewModel_Month
            }else{
                if(jsvalue % 168 == 0){
                    this.sesstion.EndTimeValue = jsvalue / 168
                    this.sesstion.endTimeUnit = this.lang.HMI_HT_LineChartWindowViewModel_Week
                }else if(jsvalue % 24 == 0){
                    this.sesstion.EndTimeValue = jsvalue / 24
                    this.sesstion.endTimeUnit = this.lang.MaintenanceManage_Day
                }else{
                    this.sesstion.EndTimeValue = jsvalue
                    this.sesstion.endTimeUnit = this.lang.HMI_HT_LineChartWindowViewModel_Hour
                }
            }

            this.w = this.sesstion.CloseRemarks;
            if (this.sesstion.PeriodUnit == 1) {
                this.sesstion.PeriodUnit = this.lang.HMI_HT_LineChartWindowViewModel_Hour;
            } else if (this.sesstion.PeriodUnit == 2) {
                this.sesstion.PeriodUnit = this.lang.MaintenanceManage_Day;
            } else if (this.sesstion.PeriodUnit == 3) {
                this.sesstion.PeriodUnit = this.lang.HMI_HT_LineChartWindowViewModel_Week;
            } else if (this.sesstion.PeriodUnit == 4) {
                this.sesstion.PeriodUnit = this.lang.HMI_HT_LineChartWindowViewModel_Month;
            }
            if (this.sesstion.ReminderTimeUnit == 1) {
                this.sesstion.ReminderTimeUnit = this.lang.HMI_HT_LineChartWindowViewModel_Hour;
            } else if (this.sesstion.ReminderTimeUnit == 2) {
                this.sesstion.ReminderTimeUnit = this.lang.MaintenanceManage_Day;
            } else if (this.sesstion.ReminderTimeUnit == 3) {
                this.sesstion.ReminderTimeUnit = this.lang.HMI_HT_LineChartWindowViewModel_Week;
            } else if (this.sesstion.ReminderTimeUnit == 4) {
                this.sesstion.ReminderTimeUnit = this.lang.HMI_HT_LineChartWindowViewModel_Month;
            }
            if (this.sesstion.RepairResult == 1) {
                this.sesstion.RepairResult = this.lang.RepairManage_Processed;
            } else if (this.sesstion.RepairResult == 2) {
                this.sesstion.RepairResult = this.lang.RepairManage_NoCauseWasFound;
            }

            // this.change11 = true;
        },
        handleRowChange(row, event, column) {
            this.c = row;
            console.log(this.c);
            this.argID = row.ID;
        },
        handleRowChange1(row, event, column) {
            this.wantword = row.DeviceName;
            this.aid = row.AID;
            console.log(row);
        },
        gettimenowtime() {
            {
                var now = new Date();

                var year = now.getFullYear(); //年
                var month = now.getMonth() + 1; //月
                var day = now.getDate(); //日

                var hh = now.getHours(); //时
                var mm = now.getMinutes(); //分
                var ss = now.getSeconds(); //秒

                var clock = year + '-';

                if (month < 10) clock += '0';

                clock += month + '-';

                if (day < 10) clock += '0';

                clock += day + ' ';

                if (hh < 10) clock += '0';

                clock += hh + ':';
                if (mm < 10) clock += '0';
                clock += mm + ':';

                if (ss < 10) clock += '0';
                clock += ss;
                return clock;
            }
        },
        nopre() {
            if (this.sestion == 1) {
                this.$axios({
                    method: 'post',
                    url: `/api/RepairManage/RepairManage_SaveUpcoming`,
                    data: {
                        Operate: '1',
                        TaskName: this.taskname,
                        AID: this.aid,
                        StartTime: this.nowtime1,
                        EndTime: this.nowtime2,
                        PlanContent: this.addremarks,
                        RepairPerson: this.deviceperson
                    }
                }).then(res => {
                    console.log(res);
                        setTimeout(() => {
                            $('.tip').css({
                                zoom: this.zoom,
                                left: `calc(50% - ${($('.tip').width() / 2) *
                                    this.zoom}px)`,
                                top: `calc(50% - ${($('.tip').height() / 2) *
                                    this.zoom}px)`
                            });
                            this.$store.state.div = 'tip'
this.$store.state.divtop = 'tiphead'  
this.tipchange = true
this.$store.commit('move')
                        });
                    if (res.data.msg == '请求成功') {
                        this.tipword = this.lang.EquipmentAccount_SuccessfullyAdded;
                        this.change11 = false;
                        this.getsetime();
                    } else {
                        this.tipword = res.data.msg;
                    }
                });
            } else if (this.sestion == 3) {
                this.$axios({
                    method: 'post',
                    url: `/api/RepairManage/RepairManage_SaveUpcoming`,
                    data: {
                        TID: this.ID,
                        Operate: '2',
                        TaskName: this.wantnowdata.TaskName,
                        AID: this.AID,
                        StartTime: this.wantnowdata.StartTime,
                        EndTime: this.wantnowdata.EndTime,
                        PlanContent: this.addremarks,
                        RepairPerson: this.wantnowdata.RepairPerson
                    }
                }).then(res => {
                    console.log(res);
                        setTimeout(() => {
                            $('.tip').css({
                                zoom: this.zoom,
                                left: `calc(50% - ${($('.tip').width() / 2) *
                                    this.zoom}px)`,
                                top: `calc(50% - ${($('.tip').height() / 2) *
                                    this.zoom}px)`
                            });
                            this.$store.state.div = 'tip'
this.$store.state.divtop = 'tiphead'  
this.tipchange = true
this.$store.commit('move')
                        });
                    if (res.data.msg == '请求成功') {
                        this.tipword = this.lang.FormulaManage_HT_FormulaSetting_ModifiedSuccessfully;
                        this.change11 = false;
                        this.getsetime();
                    } else {
                        this.tipword = res.data.msg;
                    }
                });
            }
        },
        handleEdit1(a, b) {
            this.change11 = true;
            if (b.DeviceName == null) {
                b.DeviceName = this.lang.EquipmentAccount_ClickSelect
            }
            this.ID = b.ID;
            this.AID = b.AID;
            this.wantnowdata = b;
            this.sestion = 3;
            console.log(b);
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
        add() {
            this.sestion = 1;
            this.change11 = true;
            console.log(this.sesstion);
            this.taskname = '';
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
                    $('.seleword11')[0].offsetTop +
                    $('.seleword11')[0].clientHeight +
                    'px'
            });
            this.changeselect = !this.changeselect;
        },
        lookforsearch() {
            let i = this.projectlistdata1;
            let a = 0;
            let reg = new RegExp(this.projectkeyword);
            this.projectlistdata = [];
            for (a in i) {
                if (!this.projectkeyword) {
                    if (
                        this.oneselectid ==
                            '11111111-1111-1111-1111-111111111111' ||
                        this.oneselect == ''
                    ) {
                        this.projectlistdata = i;
                    } else if (this.oneselect == i[a].DeviceType) {
                        this.projectlistdata.push(i[a]);
                    }
                } else {
                    console.log(this.oneselect);
                    console.log(a);
                    if (
                        this.oneselectid ==
                            '11111111-1111-1111-1111-111111111111' ||
                        this.oneselect == ''
                    ) {
                        if (
                            reg.test(i[a].DeviceName) ||
                            reg.test(i[a].DeviceNo) ||
                            reg.test(i[a].DeviceModel) ||
                            reg.test(i[a].PersonInCharge)
                        ) {
                            this.projectlistdata.push(i[a]);

                            console.log('1');

                            console.log('asd', this.projectlistdata);
                        } else {
                            console.log(reg.test(i[a].DeviceName));
                            console.log(reg.test(i[a].DeviceNo));
                            console.log(reg.test(i[a].DeviceModel));
                            console.log('2');
                        }
                    } else if (this.oneselect == i[a].DeviceType) {
                        if (
                            reg.test(i[a].DeviceName) ||
                            reg.test(i[a].DeviceNo) ||
                            reg.test(i[a].DeviceModel) ||
                            reg.test(i[a].PersonInCharge)
                        ) {
                            this.projectlistdata.push(i[a]);
                            console.log('3');
                        } else {
                            console.log('4');
                        }
                    }
                }
            }
        },
        selectword2() {
            let i = 0;
            let j = 1;
            for (i in this.selectname) {
                if (this.a2 == 1) {
                    if (this.selectname[i].NodeName == this.lang.EquipmentAccount_EquipmentType) {
                        this.selectname[i].NID =
                            '11111111-1111-1111-1111-111111111111';
                    }
                    this.a2 = 2;
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
            this.data7 = [];
            this.data7.push(this.selectname[0]);
            this.selectword3 = !this.selectword3;
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
        pre12() {
            console.log(this.sesstion);
            console.log(this.sesstion.ID);
            console.log(this.over);
            console.log(this.w);
            console.log(this.sesstion.SynchronizeToSOP);
            console.log(this.abc);
              if(!this.w){
                this.w = ''
            }
            if (this.sesstion.CloseRemarks == null) {
                this.sesstion.CloseRemarks = '';
            }
            if (this.over == this.lang.RepairManage_Processed) {
                this.over = 1;
            } else {
                this.over = 2;
            }
            this.$axios
                .post(
                    `/api/MaintenanceManage/MaintenanceManage_SubmitUpcomingTask?argTID=${this.sesstion.TID}&argDesc=${this.w}&argSaveToSOP=${this.sesstion.SynchronizeToSOP}&argLoginUserName=${this.abc}`
                )
                .then(res => {
                    console.log(
                        `/api/MaintenanceManage/MaintenanceManage_SubmitUpcomingTask?argTID=${this.sesstion.TID}&argDesc=${this.w}&argSaveToSOP=${this.sesstion.SynchronizeToSOP}&argLoginUserName=${this.abc}`
                    );
                    console.log('sss', res);
                    if (res.data.code == 0) {
                        this.tipword = this.lang.MaintenanceManage_SubmittedSuccessfully
                    } else {
                        this.tipword = res.data.msg;
                    }
                        setTimeout(() => {
                            $('.tip').css({
                                zoom: this.zoom,
                                left: `calc(50% - ${($('.tip').width() / 2) *
                                    this.zoom}px)`,
                                top: `calc(50% - ${($('.tip').height() / 2) *
                                    this.zoom}px)`
                            });
                            this.$store.state.div = 'tip'
this.$store.state.divtop = 'tiphead'  
this.tipchange = true
this.$store.commit('move')
                        });

                    this.sad(1);
                    this.mesad2 = false;
                });
        },
        onetable() {
            // this.value1 = JSON.stringify(this.value1);
            // this.value2 = JSON.stringify(this.value2);
            let c = this.Meter;
            if (this.Meterid == '11111111-1111-1111-1111-111111111111') {
                c = '';
            } else {
                c = this.Meter;
            }
            let a = this.Meter1;

            if (a == this.lang.MaintenanceManage_NotStarted) {
                a = 0;
            } else if (a == this.lang.MaintenanceManage_Ongoing) {
                a = 2;
            } else if (a == this.lang.MaintenanceManage_Delayed) {
                a = 3;
            } else if (a == this.lang.AlarmRecord_HT_Unlimited) {
                a = '';
            } else if (a == this.lang.MaintenanceManage_Closed) {
                a = 4;
            } else if (a == this.lang.MaintenanceManage_Completed) {
                a = 5;
            } else if (a == this.lang.MaintenanceManage_TimeoutCompleted) {
                a = 6;
            } else if (a == this.lang.MaintenanceManage_Expired) {
                a = 7;
            }

            this.$axios
                .post(
                    `/api/MaintenanceManage/MaintenanceManage_GstTask?argDeviceType=${c}&argTaskStatus=${a}&argStartTime=${this.value1}&argEndTime=${this.value2}&argKeyword=${this.keyword}&argPageSize=${this.PageData.PageSize}&argPageIndex=${this.PageData.PageIndex}`
                )
                .then(res => {
                    console.log(res);
                    if (res.data.code == 0) {
                              if(res.data.data.length==0){
                         this.tableData1 = [];
                            this.PageData ={
                            PageSize: 50,
                            TotalCount: 0,
                            TotalPage: 1,
                            PageIndex: 1,
                            LastEnabled: false,
                            NextEnabled: false
                        }
                              }else{
                                   res.data.data.DataList = res.data.data.DataList.filter(function(
                            item
                        ) {
                            return item.Status < 4;
                        });
                        this.tableData1 = res.data.data.DataList;
   this.PageData = res.data.data.ParameterList;
                              }
                        let i = 0;
                        for (i in this.tableData1) {
                            this.tableData1[i].StartTime = this.gettime(
                                this.tableData1[i].StartTime
                            );
                            let a = i;
                            this.tableData1[i].Number = ++a;
                            this.tableData1[i].EndTime = this.gettime(
                                this.tableData1[i].EndTime
                            );
                            this.tableData1[i].MaturityTime = this.gettime(
                                this.tableData1[i].MaturityTime
                            );
                            this.tableData1[i].RemindTime = this.gettime(
                                this.tableData1[i].RemindTime
                            );
                            this.tableData1[i].FinishTime = this.gettime(
                                this.tableData1[i].FinishTime
                            );
                            if (
                                this.tableData1[i].Status == 0 ||
                                this.tableData1[i].Status == 1
                            ) {
                                this.tableData1[i].Status = this.lang.MaintenanceManage_NotStarted;
                            } else if (this.tableData1[i].Status == 2) {
                                this.tableData1[i].Status = this.lang.MaintenanceManage_Ongoing;
                            } else if (this.tableData1[i].Status == 3) {
                                this.tableData1[i].Status = this.lang.MaintenanceManage_Delayed;
                            } else if (this.tableData1[i].Status == 4) {
                                this.tableData1[i].Status = this.lang.MaintenanceManage_Closed;
                            } else if (this.tableData1[i].Status == 5) {
                                this.tableData1[i].Status = this.lang.MaintenanceManage_Completed;
                            } else if (this.tableData1[i].Status == 6) {
                                this.tableData1[i].Status = this.lang.MaintenanceManage_TimeoutCompleted;
                            } else if (this.tableData1[i].Status == 7) {
                                this.tableData1[i].Status = this.lang.MaintenanceManage_Expired;
                            }
                        }
                    } else {
                            setTimeout(() => {
                            $('.tip').css({
                                zoom: this.zoom,
                                left: `calc(50% - ${($('.tip').width() / 2) *
                                    this.zoom}px)`,
                                top: `calc(50% - ${($('.tip').height() / 2) *
                                    this.zoom}px)`
                            });
                            this.$store.state.div = 'tip'
this.$store.state.divtop = 'tiphead'  
this.tipchange = true
this.$store.commit('move')
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
        sad(a) {
              
          if(!this.cxshow&&a!==1){
            
                     setTimeout(() => {
                            $('.tip').css({
                                zoom: this.zoom,
                                left: `calc(50% - ${($('.tip').width() / 2) *
                                    this.zoom}px)`,
                                top: `calc(50% - ${($('.tip').height() / 2) *
                                    this.zoom}px)`
                            });
                            this.$store.state.div = 'tip'
this.$store.state.divtop = 'tiphead'  
this.tipchange = true
this.$store.commit('move')
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
                                zoom: this.zoom,
                                left: `calc(50% - ${($('.tip').width() / 2) *
                                    this.zoom}px)`,
                                top: `calc(50% - ${($('.tip').height() / 2) *
                                    this.zoom}px)`
                            });
                            this.$store.state.div = 'tip'
this.$store.state.divtop = 'tiphead'  
this.tipchange = true
this.$store.commit('move')
                        });
                this.tipword = this.lang.AlarmRecord_HT_TheQueryDate
                return
            }
              this.onetable();
            // this.getEquipmentType();
        },
        setParams(params) {
            this.searchData = params;
        },
        gb() {
            console.log(`/api/MaintenanceManage/MaintenanceManage_CloseUpcomingTask?argTID=${this.aid}&argDesc=${this.gbword}`)
            this.$axios
                .post(
                    `/api/MaintenanceManage/MaintenanceManage_CloseUpcomingTask?argTID=${this.aid}&argRemarks=${this.gbword}`
                )
                .then(res => {
                    console.log(res);
                    (this.tipword = this.lang.MaintenanceManage_ClosedSuccessfully), (this.daibang = false);
                        setTimeout(() => {
                            $('.tip').css({
                                zoom: this.zoom,
                                left: `calc(50% - ${($('.tip').width() / 2) *
                                    this.zoom}px)`,
                                top: `calc(50% - ${($('.tip').height() / 2) *
                                    this.zoom}px)`
                            });
                            this.$store.state.div = 'tip'
this.$store.state.divtop = 'tiphead'  
this.tipchange = true
this.$store.commit('move')
                        });
                    this.sad(1);
                });
        },
        somethingdata() {
            let rang = this.Meter;
            if (this.Meterid == '11111111-1111-1111-1111-111111111111') {
                rang = '';
            }
            this.$axios({
                method: 'post',
                url: `/api/EquipmentAccount/EquipmentAccount_GstEquipment?argDeviceType=${rang}&argKeyword=${this.keyword}&argPageSize=${this.pagesize}&argPageIndex=${this.pageindex}`
            })
                .then(res => {
                    let i = 0;
                    let a = 0;
                    for (i in res.data.data.DataList) {
                        res.data.data.DataList[i].number = ++i;
                        a = --i;
                        if (res.data.data.DataList[a].DeviceStatus == 1) {
                            res.data.data.DataList[a].DeviceStatus = this.lang.EquipmentAccount_Used;
                        } else if (
                            res.data.data.DataList[a].DeviceStatus == 2
                        ) {
                            res.data.data.DataList[a].DeviceStatus = this.lang.EquipmentAccount_Stopped;
                        } else if (
                            res.data.data.DataList[a].DeviceStatus == 3
                        ) {
                            res.data.data.DataList[a].DeviceStatus = this.lang.EquipmentAccount_Abandoned;
                        }
                        if (res.data.data.DataList[a].QualityStatus == 1) {
                            res.data.data.DataList[a].QualityStatus = this.lang.EquipmentAccount_Inside;
                        } else if (
                            res.data.data.DataList[a].QualityStatus == 2
                        ) {
                            res.data.data.DataList[a].QualityStatus = this.lang.EquipmentAccount_Outside;
                        }
                    }
                    this.tableData = res.data.data.DataList;
                })
                .catch(function(error) {
                    console.log(error);
                });
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
                .post(
                    `/api/MaintenanceManage/MaintenanceManage_GstEquipmentType`
                )
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
        getsetime() {
            this.$axios
                .post(
                    `/api/MaintenanceManage/MaintenanceManage_GstTaskInitTime`
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
        
        this.zoom = window.screen.width / 1920 < 0.8 ? 0.8 : window.screen.width / 1920
       let that = this;
         $('body')[0].addEventListener("mousemove",function(){
         that.atooltip()
     })

        this.getsetime();
        console.log(this.tableData);
        this.nowtime1 = this.gettimenowtime();
        this.nowtime2 = this.gettimenowtime();
        if (
            !JSON.parse(sessionStorage.getItem('userInfo1')) ||
            JSON.parse(sessionStorage.getItem('userInfo1')) == null
        ) {
            this.abc = JSON.parse(
                sessionStorage.getItem('sightseerInfo1')
            ).SCMSUserAccount;
        } else {
            this.abc = JSON.parse(
                sessionStorage.getItem('userInfo1')
            ).SCMSUserAccount;
        }
          this.$axios.post(`/api/UserManage/UserManage_GstUserWithNoPage`).then(res => {
              console.log("ss",res)
              this.person = res.data.data;
              this.supermin = res.data.data;
          })
            this.jurisdiction = this.$store.state.btnPowerData
     this.buttonarr = this.findPathByLeafId(this.GetUrlParam('id'),this.jurisdiction)[0].Children
      console.log("buttonarr",this.buttonarr)
        this.buttonarr.forEach((item)=>{
         if(item.RightName == "代办保养-查询按钮"){
          this.cxid = item.RightID
         }else if(item.RightName == "代办保养-提交按钮"){
          this.tjid = item.RightID
         }else if(item.RightName == "代办保养-关闭按钮"){
          this.gbid = item.RightID
         }else if(item.RightName == "代办保养-查看按钮"){
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
};
</script>

<style lang='scss' scoped>
.margin1 {
    // height: 36px;
}
.margin-remark {
    width: 100%;
    display: flex;
    padding-top: 13px;
    >span {
       display: inline-block;
       width: 100px; 
    }
}
.item{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.me {
    display: inline-block;
    width: 55px;
}
.showtext{
    // position: absolute;
    width: 10px;
    height: 10px;
    margin-left: 5px;
    // top: 8px;
    // right: 15px;
}
.boxsad {
    position: fixed;
    width: 530px;
    height: 250px;
    z-index: 30999999;
    .cancel {
        margin-top: 10px;
        margin-right: 20px;
    }
    .Preservation {
        margin-top: 10px;
        margin-right: 60px;
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
.box {
    position: relative;
    top: 10px;
    left: 118px;
}
.sp6 {
    position: relative;
    // top: -10px;
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
    top: -60px;
}
.tip {
    position: fixed;
    width: 380px;
    height: 200px;
    z-index: 100999999;
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
        padding: 12px;
        display: flex;
        text-align: center;
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
        bottom: 10px;
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
    padding: 0px 22px 0px 22px;
    select {
        height: 40px;
        text-indent: 0.5em;
        width: 200px;
        border: 0;
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
    .add {
        width: 120px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        background-color: #ffffff;
        margin-left: 10px;
        border-radius: 4px;
        color: #46be05;
        font-weight: 600;
        display: inline-block;
        border: 1px solid #46be05;
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
.selectword2 {
    position: absolute !important;
    top: 70px !important;
    left: 175px !important;
}
.import {
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
    color: #fda100;
    margin-top: 10px;
    overflow: hidden;
}
.export {
    border: 1px solid #fda100;
    background-color: #ffffff;
    color: #fda100;
    width: 120px;
    height: 38px;
    display: block;
    border-radius: 4px;
    text-align: center;
    line-height: 38px;
    cursor: pointer;
    float: left;
    margin-left: 10px;
    margin-top: 10px;
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
.remarks {
    position: relative;
    top: -100px;
    display: inline-block;
}
.overflow1 {

    // position: relative;
    // left: -20px;
    // bottom: -10px;
    display: flex;
    margin-left: 0px !important;
    padding-top: 10px;
}
.sestion {
    .sp1 {
        margin-left: 10px;
    }
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
    width: 800px;
    height: 800px;
    z-index: 10999999;
    position: fixed;
    top: 20%;
    // left: 590px;
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
         width: 100px;
        color: #363636;
        font-size: 14px;
        // margin-right: 20px;
        text-align: center;
    }
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
    .zl {
        float: left;
        width: 50%;
    }
    .zr {
        width: 50%;
        float: right;
    }
}
.margin {
    position: relative;
    margin-top: 10px;
    display: flex;
    height: 40px;
    align-items: center;

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
    width: calc(100% - 105px);
    height: 120px;
    border: none;
    border: 1px solid #e0e0e0;
    // background-color: #f4f4f4;
}
.table-container {
    height: calc(100% - 90px);
    overflow: auto;
}
.Preservation {
    width: 100px;
    height: 34px;
    cursor: pointer;
    background-color: #386df0;
    float: right;
    color: #ffffff;
    border-radius: 3px;
    text-align: center;
    margin-top: 20px;
    line-height: 34px;
}
select {
    background-color: #fff !important;
}
.Preservation1 {
    margin-right: 33px;
    margin-top: 30px;
}
.cancel {
    cursor: pointer;
    width: 100px;
    height: 34px;
    margin-top: 20px;
    margin-right: 10px;
    background-color: #999999;
    float: right;
    color: #ffffff;
    border-radius: 3px;
    text-align: center;
    line-height: 34px;
}
.cancle1 {
    margin-top: 30px;
}
.Choice {
    width: 700px;
    height: 500px;
    position: fixed;
    top: 200px;
    left: 610px;
    background-color: #eeeeee;
    box-shadow: 0px 0px 8px black;
    z-index: 20999999;
    .choicehead {
        height: 50px;

        background-color: #386df0;
        color: #ffffff;
        line-height: 50px;
        text-align: center;
        position: relative;
        .img {
            position: absolute;
            top: 10px;
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
    .choicecontant {
        width: 620px;
        height: 330px;
        background-color: #ffffff;
        margin-left: 40px;
        margin-top: 30px;
        overflow: auto;
    }
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
.cover7 {
    width: 100%;
    height: 100%;
    z-index: 29999999;
    position: fixed;
    top: 0;
    left: 0;
}
.cover5 {
    width: 100%;
    height: 100%;
    z-index: 23999999;
    position: fixed;
    top: 0;
    left: 0;
}
.cover2 {
    width: 100%;
    height: 100%;
    z-index: 99999999;
    position: fixed;
    top: 0;
    left: 0;
}
.cover4 {
    width: 100%;
    height: 100%;
    z-index: 29999999;
    position: fixed;
    top: 0;
    left: 0;
}
.cover6 {
    width: 100%;
    height: 100%;
    // z-index: 39999999;
    z-index: 39;
    // 此处z-index过大会导致tooltip 提示信息被遮盖，无法显示
    position: fixed;
    top: 0;
    left: 0;
}
.cover3 {
    width: 100%;
    height: 100%;
    // z-index: 19999999;
    position: fixed;
    top: 0;
    left: 0;
}
.sestion1 {
    height: 470px !important;
    top: 260px;
    z-index: 26999999 !important;
}
.tqp {
    width: 100%;
    height: 60px;
    position: absolute;
    z-index: 30999999;
}
.look {
    z-index: 30999999;
    width: 1120px;
    top: 150px;
    left: 400px;
    position: fixed;
    height: 600px;
    background-color: #eeeeee;
    box-shadow: 0px 0px 8px black;
    select {
        width: 200px !important;
        option {
            display: none;
        }
    }
    span {
        font-size: 20px;
    }
    .lookfor1 {
        display: inline-block;
        background-color: #6086e6;
        text-align: center;
        line-height: 30px;
        border: 1px solid #6086e6;
        border-radius: 4px;
        width: 100px;
        height: 30px;
        cursor: pointer;
        position: relative;
        top: 3px;
        color: #fff;
    }
    .lookhead {
        width: 100%;
        height: 60px;
        text-align: center;
        line-height: 60px;
        font-size: 18px;
        background-color: #386df0;
        position: relative;
        color: #ffffff;
        img {
            z-index: 12999999;
            width: 24px;
            height: 24px;
            cursor: pointer;
            position: absolute;
            right: 20px;
            bottom: 15px;
        }
    }
    .lookselect {
        width: 1000px;
        height: 436px;
        background-color: #f4f4f4;
        overflow: hidden;
        border: 1px solid #cccccc;
    }
    .looktop {
        width: 100%;
        height: 50px;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 11999999;
    }
    .lookcontent {
        padding: 30px 30px 0px 60px;
        width: 100%;
        position: relative;

        .search {
            .add {
                display: inline-block;
                background-color: #ffffff;
                text-align: center;
                line-height: 30px;
                border: 1px solid #46be05;
                border-radius: 4px;
                width: 100px;
                height: 30px;
                cursor: pointer;
                position: relative;
                top: 3px;
                margin-left: 15px;
                color: #46be05;
            }
            .del {
                display: inline-block;
                background-color: #ffffff;
                text-align: center;
                line-height: 30px;
                border: 1px solid #aaaaaa;
                border-radius: 4px;
                width: 100px;
                height: 30px;
                margin-left: 15px;
                cursor: pointer;
                position: relative;
                top: 3px;
                color: #aaaaaa;
            }
            .lookname {
                margin-left: 320px;
            }
            span {
                font-size: 16px;
                margin-right: 10px;
            }

            select {
                width: 130px;
                height: 30px;
                border: none;
                border: 1px solid #cccccc;
                margin-right: 20px;
            }
            padding-left: 23px;
            height: 50px;
            line-height: 45px;
            input {
                height: 30px;
                text-indent: 0.5em;
                width: 200px !important;
                margin-right: 10px;
                border: none;
            }
            .inputname {
                display: inline-block;
                margin: 0px;
                width: 600px;
            }
            .lookfor {
                display: inline-block;
                background-color: #ffffff;
                text-align: center;
                line-height: 30px;
                border: 1px solid #6086e6;
                border-radius: 4px;
                width: 120px;
                height: 30px;
                cursor: pointer;
                position: relative;
                top: 3px;
                color: #6086e6;
            }
        }
    }
    .pre {
        width: 100px;
        height: 36px;
        text-align: center;
        line-height: 36px;
        position: absolute;
        background-color: #386df0;
        border-radius: 4px;
        color: #fff;
        cursor: pointer;
        font-size: 14px;
        right: 60px;
        bottom: 20px;
    }

    .cancel {
        cursor: pointer;
        width: 100px;
        height: 34px;
        margin-top: 20px;
        margin-right: 170px;
        background-color: #999999;
        float: right;
        color: #ffffff;
        border-radius: 3px;
        text-align: center;
        line-height: 34px;
    }
    .table {
        width: 950px !important;
        margin-left: 23px;
        height: 320px !important;
        border: 1px solid #ccc;
    }
}
select[disabled] {
    background-color: #ebebe4 !important;
}
select {
    background-color: #fff !important;
}
.sestion23 {
    // z-index: 50999999;
    z-index: 50;
    // 此处z-index过大会导致tooltip 提示信息被遮盖，无法显示
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
.yd{
   margin: auto;
     top: 0 !important;
    right: 0 !important;
    bottom: 0 !important;
    left: 0 !important;   
}
img{
    cursor: pointer;
}
.remarks3{
    position: relative;
    top:30px !important;   
    left: -350px !important;   
}
.tet2{
    width: calc(100% - 129px) !important;   
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
.selimg{
    position:absolute;
    top:0 !important;
    bottom:0;
    margin:auto;
}
.sblx{
    display:inline-block;
}
.zr{
    .margin{
        height: 36px !important;
    }
}
.zl{
    .margin{
        height: 36px !important;
    }
}
</style>

