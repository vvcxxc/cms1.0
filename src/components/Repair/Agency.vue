<!--
 * @Description: 维修管理待办维修界面
 * @Date: 2019-11-25 19:07:09
 * @Author: 随风
 * @LastEditors: Tao
 * @LastEditTime: 2020-08-06 18:14:48
 -->
<template>
    <div class="public-table" :class="{blackBlueBg: $store.state.color === 'blackBlue'}" @click=" changeselect = false">
          			<div class="loadcover" element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(0, 0, 0, 0.4)"  v-loading="this.$store.state.isShow" v-show="this.$store.state.isShow" style="position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;"></div>
        <div class="look"  v-show="offdecive" @click=" selectword3 = false" :style="{width:1120*zoomValue+'px',height:600*zoomValue+'px'}">
            <div
                class="looktop"
                :style="{height:60*zoomValue+'px'}"
            ></div>
            <div
                class="lookhead"
                 :style="{height:60*zoomValue+'px',lineHeight:60*zoomValue+'px',fontSize:16*zoomValue+'px'}"
                :class="[{colordiv:$store.state.color=='grey'},{fcolor:$store.state.color=='grey'}]"
            >
                {{lang.FileManage_AddAssociatedEquipment}}
                <img
                    :src="no2"
                    alt
                    class="no"
                    :style="{width:24*zoomValue+'px',height:24*zoomValue+'px'}"
                    @click="cancel11"
                    v-if="$store.state.color=='grey'"
                />
                <img   :style="{width:24*zoomValue+'px',height:24*zoomValue+'px'}" :src="no" alt class="no" @click="cancel11" v-else />
            </div>
            <div class="lookcontent">
                <div class="lookselect" :style="{width:1000*zoomValue+'px',height:436*zoomValue+'px'}">
                    <div class="search" :style="{zoom:zoomValue}">
                        <span>{{lang.EquipmentAccount_EquipmentType1}}</span>
                                    <div class="seleword2" @click.stop="selectword2">
             <div class="seleword1">
                  {{oneselect}}
               <img :src="xiala" alt />
             </div>
            </div>
                        <div class="selectword selectword2" v-if="selectword3">
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
                        <input type="text"  class="tinput1" :placeholder="lang.AlarmRecord_Time_Keyword" v-model="projectkeyword" />
                        <span class="lookfor1" @click="lookforsearch">{{lang.RoleManage_Query}}</span>
                    </div>
                    <div class="table" :style="{width:950*zoomValue+'px',height:350*zoomValue+'px'}">
                        <el-table
                            :data="projectlistdata"
                            height="100%"
                            border
                              :style="{width: 950*zoomValue+'px',fontSize: 14*zoomValue+'px'}"
                            style="width: 100%"
                            @row-click="handleRowChange1"
                            highlight-current-row
                             :header-cell-style="[{
                            background:($store.state.color=='grey')?'#D9DBDE':($store.state.color==='blackBlue' ? '#344C8F' : '#5a6c98'),
                            color:($store.state.color=='grey')?'#000':'#fff',
                            'border-left': $store.state.color==='blackBlue' ? '1px solid #8B98B8' : '1px solid #cccccc',
                            height:50*zoomValue+'px',
                            fontSize: 14*zoomValue+'px',
                           padding:'0'}]"
                        >
                            <template slot="empty">
                                <span>{{lang.SCMSConsoleWebApiMySql_NoData}}</span>
                            </template>
                            <el-table-column prop="DeviceName" :label="lang.EquipmentAccount_EquipmentName"  :show-overflow-tooltip="true"></el-table-column>
                            <el-table-column prop="DeviceNo" :label="lang.EquipmentAccount_EquipmentNumber"  :show-overflow-tooltip="true"></el-table-column>
                            <el-table-column prop="DevicePath" :label="lang.EquipmentAccount_EquipmentType"  :show-overflow-tooltip="true"></el-table-column>
                            <el-table-column prop="DeviceModel" :label="lang.EquipmentAccount_EquipmentModel"  :show-overflow-tooltip="true"></el-table-column>
                        </el-table>
                    </div>
                </div>
            </div>
            <div class="cancel cancel5" @click="cancel11" :style="{zoom:zoomValue}">{{lang.PopupCommon_Cancel}}</div>
            <div class="pre" @click="pre1" :style="{zoom:zoomValue}">{{lang.PopupCommon_Sure}}</div>
        </div>
        <div class="search-container" ref="search" :style="{zoom:zoomValue}">
            <div>
                <span class="sblx">{{lang.EquipmentAccount_EquipmentType1}}</span>
                   <div class="seleword" @click.stop="selectword1">
             <div class="seleword1 seleword3">
                  {{Meter}}
               <img :src="xiala" alt />
             </div>
            </div>
                <span class="sp1 tinput">{{lang.MaintenanceManage_TaskStatus1}}</span>
                <select v-model="Meter1">
                    <option v-for="(item,index) in ztarr" :key="index" :value="item">{{item}}</option>
                </select>
                <span class="sp1 ">{{lang.RepairManage_TaskType1}}</span>
                <select name id v-model="Meter2" class="txt">
                    <option v-for="(item,index) in leixinarr" :key="index" :value="item">{{item}}</option>
                </select>
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
            </div>
            <div class="fr">
                <div class="add" @click="add">{{lang.RoleManage_Add}}</div>
                <div class="move" @click="del">{{lang.RoleManage_Delete}}</div>
            </div>

            <span>{{lang.RepairManage_TaskStartTime1}}</span>

            <el-date-picker
                :key="$store.state.color === 'blackBlue' ? 'blackBlueBg' : 'normal'"
                :popper-class="$store.state.color === 'blackBlue' ? 'blackBlueBg' : 'normal'"
                v-model="value1"
                type="datetime"
                @focus="getZoom()"
                :placeholder="lang.SCMSConsoleWebApiMySql_PleChooseDate"
                value-format="yyyy-MM-dd HH:mm:ss"
                :style="{width:'220px'}"
            ></el-date-picker>
            <span class="demonstration">-</span>
            <el-date-picker
                :key="$store.state.color === 'blackBlue' ? 'blackBlueBg' : 'normal'"
                :popper-class="$store.state.color === 'blackBlue' ? 'blackBlueBg' : 'normal'"
                v-model="value2"
                type="datetime"
                @focus="getZoom()"
                :placeholder="lang.SCMSConsoleWebApiMySql_PleChooseDate"
                value-format="yyyy-MM-dd HH:mm:ss"
                :style="{width:'220px'}"
            ></el-date-picker>
            <input type="text" :placeholder="lang.AlarmRecord_Time_Keyword" v-model="keyword" />
            <div class="sad" @click="sad(2)">{{lang.RoleManage_Query}}</div>
        </div>
        <div class="table-container table-container1" ref="table">
            <el-table
                ref="multipleTable"
           
                :data="tableData1"
                stripe
                height="100%"
                tooltip-effect="dark"
                @row-click="handleRowChange"
                border
                highlight-current-row
                :style="{
                    fontSize: zoomValue * 15 + 'px',
                    width: '100%',
                }"
                :row-style="{ height: 50 * zoomValue + 'px' }"
                :header-cell-style="{
                    background:($store.state.color=='grey')?'#D9DBDE':($store.state.color==='blackBlue' ? '#18254E' : '#5a6c98'),
                    color:($store.state.color=='grey')?'#000':'#fff',
                    'border-left': $store.state.color==='blackBlue' ? '1px solid #304171' : '1px solid #cccccc',
                    height: 50 * zoomValue + 'px',padding:'0'}"
            >
                <template slot="empty">
                    <span>{{lang.SCMSConsoleWebApiMySql_NoData}}</span>
                </template>
                <el-table-column :label="lang.AlarmRecord_HT_AlarmPointManageUC_SerialNumber" :width="120*zoomValue" prop="Number"  :show-overflow-tooltip="true" fixed>
                    <template slot-scope="scope">
                        <div class="item">
                            <span
                                class="sad"
                                v-if="scope.row.Foreground=='#ff0000'"
                            >{{scope.row.Number}}</span>
                            <span v-else>{{scope.row.Number}}</span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="name" :label="lang.RoleManage_Operation" :width="400*zoomValue"   fixed>
                    <template slot-scope="scope">
                        <!-- <i class="el-icon-share"></i> -->
                        <div class="img" :style="{zoom:zoomValue}" @click="handleEdit111(scope.$index, scope.row)">{{lang.MaintenanceManage_Submit}}</div>
                        <div class="img" :style="{zoom:zoomValue}" @click="handleEdit3(scope.$index, scope.row)">{{lang.MaintenanceManage_Close}}</div>
                        <div class="img" :style="{zoom:zoomValue}" @click="handleEdit11(scope.$index, scope.row)">
                            <img :src="look" alt />
                            {{scope.row.phone}}
                        </div>
                        <div
                            class="img"
                            :style="{zoom:zoomValue}"
                            @click="handleEdit1(scope.$index, scope.row)"
                            v-if="scope.row.TaskType == lang.RepairManage_FaultRepair"
                        >
                            <img :src="pensoil" alt />
                            {{scope.row.phone}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="TaskName" :label="lang.RepairManage_TaskName" :width="200*zoomValue"  :show-overflow-tooltip="true">
                    <template slot-scope="scope">
                        <div class="item">
                            <span
                                class="sad"
                                v-if="scope.row.Foreground=='#ff0000'"
                            >{{scope.row.TaskName}}</span>
                            <span v-else>{{scope.row.TaskName}}</span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="TaskType" :label="lang.RepairManage_TaskType" :width="200*zoomValue"  :show-overflow-tooltip="true">
                    <template slot-scope="scope">
                        <div class="item">
                            <span
                                class="sad"
                                v-if="scope.row.Foreground=='#ff0000'"
                            >{{scope.row.TaskType}}</span>
                            <span v-else>{{scope.row.TaskType}}</span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="StartTime" :label="lang.RepairManage_TaskStartTime" :width="200*zoomValue"   :show-overflow-tooltip="true">
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
                <el-table-column prop="EndTime" :label="lang.RepairManage_TaskEndTime" :width="200*zoomValue"   :show-overflow-tooltip="true">
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
                <el-table-column prop="Status" :label="lang.MaintenanceManage_TaskStatus" :width="300*zoomValue"   :show-overflow-tooltip="true">
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
                <el-table-column prop="RepairPerson" :label="lang.RepairManage_RepairPerson" :width="300*zoomValue"  :show-overflow-tooltip="true">
                    <template slot-scope="scope">
                        <div class="item">
                            <span
                                class="sad"
                                v-if="scope.row.Foreground=='#ff0000'"
                            >{{scope.row.RepairPerson}}</span>
                            <span v-else>{{scope.row.RepairPerson}}</span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="DeviceName" :label="lang.EquipmentAccount_EquipmentName" :width="300*zoomValue"  :show-overflow-tooltip="true">
                    <template slot-scope="scope">
                        <div class="item">
                            <span
                                class="sad"
                                v-if="scope.row.Foreground=='#ff0000'"
                            >{{scope.row.DeviceName}}</span>
                            <span v-else>{{scope.row.DeviceName}}</span>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="pages-container" ref="page">
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
        <div class="sestion sestion1"  v-show="change11">
            <div class="sestionheader" :class="{colordiv:$store.state.color=='grey'}">
                <div
                    class="sestionheader1"
                 
                ></div>
                <span
                    class="head"
                    v-if="sestion == 1"
                    :class="{fcolor:$store.state.color=='grey'}"
                >{{lang.RepairManage_AddFaultRepairTask}}</span>
                <span
                    class="head"
                    v-else-if="sestion == 2 && mesad3"
                    :class="{fcolor:$store.state.color=='grey'}"
                >{{lang.RepairManage_ViewRepairPlanContent}}</span>
                <span
                    class="head"
                    v-else-if="sestion == 2  && !mesad3"
                    :class="{fcolor:$store.state.color=='grey'}"
                >{{lang.RepairManage_ViewFaultRepairTask}}</span>
                <span
                    class="head"
                    v-else-if="sestion == 3"
                    :class="{fcolor:$store.state.color=='grey'}"
                >{{lang.RepairManage_EditFaultRepairTask}}</span>
                <img :src="no2" alt class="no" @click="cancel" v-if="$store.state.color=='grey'" />
                <img :src="no" alt class="no" @click="cancel" v-else />
            </div>
            <div class="sestioncontain">
                <div class="homesetion">
                    <div class="hometop">
                        <p class="hometop-title" >{{lang.EquipmentAccount_BasicInformation}}</p>
                        <div class="line"></div>
                    </div>
                </div>
                <div class="overflow">
                    <div class="zl">
                        <div class="margin" >
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
                        <div class="margin margin-date">
                            <span>{{lang.RepairManage_TaskStartTime}}</span>
                            <template>
                                <div class="block" v-if="sestion == 1">
                                    <el-date-picker
                                        v-model="nowtime1"
                                        type="datetime"
                                        :key="$store.state.color === 'blackBlue' ? 'blackBlueBg' : 'normal'"
                                        :popper-class="$store.state.color === 'blackBlue' ? 'blackBlueBg' : 'normal'"
                                       
                                        :placeholder="lang.SCMSConsoleWebApiMySql_PleChooseDate"
                                        value-format="yyyy-MM-dd HH:mm:ss"
                                    ></el-date-picker>
                                </div>
                                <div class="block" v-else-if="sestion == 2">
                                    <el-date-picker
                                        v-model="wantnowdata.StartTime"
                                        type="datetime"
                                        :key="$store.state.color === 'blackBlue' ? 'blackBlueBg' : 'normal'"
                                        :popper-class="$store.state.color === 'blackBlue' ? 'blackBlueBg' : 'normal'"
                                       
                                        :placeholder="lang.SCMSConsoleWebApiMySql_PleChooseDate"
                                        value-format="yyyy-MM-dd HH:mm:ss"
                                        disabled
                                    ></el-date-picker>
                                </div>
                                <div class="block" v-else-if="sestion == 3">
                                    <el-date-picker
                                        v-model="wantnowdata.StartTime"
                                        type="datetime"
                                        :key="$store.state.color === 'blackBlue' ? 'blackBlueBg' : 'normal'"
                                        :popper-class="$store.state.color === 'blackBlue' ? 'blackBlueBg' : 'normal'"
                                       
                                        :placeholder="lang.SCMSConsoleWebApiMySql_PleChooseDate"
                                        value-format="yyyy-MM-dd HH:mm:ss"
                                    ></el-date-picker>
                                </div>
                            </template>
                        </div>
                        <div class="margin" v-if="sestion == 2 && mesad3">
                            <span class="sp6">{{lang.MaintenanceManage_RepeatTaskCycle}}</span>
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

                             <el-tooltip popper-class="atooltip" effect="dark" :content="lang.MaintenanceManage_TaskStartTimeToolTip" placement="bottom">
                                <div class="showtext">
                                  <i class="el-icon-question"></i>
                                </div>
                            </el-tooltip>
                        </div>
                        <div class="margin" v-if="sestion == 2 && mesad3">
                            <span class="sp6">{{lang.MaintenanceManage_TaskAdvanceReminder}}</span>
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
                            
                            <el-tooltip popper-class="atooltip" effect="dark" :content="lang.MaintenanceManage_RepeatTaskCycleToolTip" placement="bottom">
                                <div class="showtext" >
                                  <i class="el-icon-question"></i>
                                </div>
                            </el-tooltip>

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
                            <select name id v-model="wantnowdata.RepairPerson" v-else-if="sestion == 3">
                                <option
                                    :value="item"
                                    v-for="(item,index) in supermin"
                                    :key="index"
                                >{{item}}</option>
                            </select>
                        </div>
                    </div>
                    <div class="zr">
                        <div class="margin" >
                            <span>{{lang.RepairManage_RepairEquipment}}</span>
                            <div v-if="sestion == 1" class="input1">
                                <input type="text" v-model="Preservation" disabled>
                                <div class="inputimg" @click="getdevice">
                                    <img :src="diji" alt />
                                </div>
                            </div>
                            <div v-else-if="sestion == 2" class="input1">
                                  <input type="text" v-model="wantnowdata.DeviceName" disabled>
                                <div class="inputimg">
                                    <img :src="diji" alt />
                                </div>
                            </div>
                            <div v-else-if="sestion == 3" class="input1">
                                 <input type="text" v-model="wantnowdata.DeviceName" disabled>
                                <div class="inputimg" @click="getdevice">
                                    <img :src="diji" alt />
                                </div>
                            </div>
                        </div>
                        <div class="margin">
                            <span>{{lang.MaintenanceManage_TaskExecutionDuration}}</span>
                            <template>
                                <div class="block" v-if="sestion == 1">
                                          <div class="is">
                                <input
                                    type="text"
                                    v-if="sestion == 1"
                                   v-model="rwtime"
                               
                                />
                                <select name id v-model="rwselect" >
                                    <option
                                        v-for="(item,index) in sametimearr"
                                        :key="index"
                                        :value="item"
                                    >{{item}}</option>
                                </select>
                            </div>
                            
                                    <!-- <el-date-picker
                                        v-model="nowtime2"
                                        type="datetime"
                                        placeholder="选择日期时间"
                                        value-format="yyyy-MM-dd HH:mm:ss"
                                    ></el-date-picker> -->
                                </div>
                                <div class="block" v-else-if="sestion == 2">
                                          <div class="is">
                                <input
                                    type="text"
                                    v-if="sestion == 2"
                                    v-model="wantnowdata.rwtime"
                                    :disabled="disabled"
                                />
                                <select name id v-model="wantnowdata.rwselect" disabled>
                                    <option
                                        v-for="(item,index) in sametimearr"
                                        :key="index"
                                        :value="item"
                                    >{{item}}</option>
                                </select>
                            </div>
                                    <!-- <el-date-picker
                                        v-model="wantnowdata.EndTime"
                                        type="datetime"
                                        placeholder="选择日期时间"
                                        value-format="yyyy-MM-dd HH:mm:ss"
                                        disabled
                                    ></el-date-picker> -->
                                </div>

                                <div class="block" v-else-if="sestion == 3">
                                          <div class="is">
                                <input
                                    type="text"
                                    v-if="sestion == 3"
                                   v-model="wantnowdata.rwtime"
                                  
                                />
                                <select name id v-model="wantnowdata.rwselect" >
                                    <option
                                        v-for="(item,index) in sametimearr"
                                        :key="index"
                                        :value="item"
                                    >{{item}}</option>
                                </select>
                            </div>
                                    <!-- <el-date-picker
                                        v-model="wantnowdata.EndTime"
                                        type="datetime"
                                        placeholder="选择日期时间"
                                        value-format="yyyy-MM-dd HH:mm:ss"
                                    ></el-date-picker> -->
                                </div>
                            </template>
                        </div>
                        <div class="margin" v-if="sestion == 2 &&mesad3">
                            <span>{{lang.MaintenanceManage_PlanEndTime}}</span>
                            <div class="inpimg">
                                <img :src="rili" alt class="inpimg1" />
                                <input type="text" :value="wantnowdata.MaturityTime" disabled />
                            </div>
                        </div>
                        <div class="margin" v-if="sestion == 2 && mesad3">
                            <span>{{lang.MaintenanceManage_PlanExecutionStatus}}</span>
                            <select v-model="person1" :disabled="disabled">
                                <option v-for="(item,index) in person" :key="index" :value="item">{{lang.MaintenanceManage_Enable}}</option>
                            </select>
                        </div>
                    </div>
                    <div class="overflow overflow1" style="display: flex" >
                        <span>{{lang.AlarmRecord_FaultRetrieva_DataGrid_Description}}</span>
                        <textarea name id v-if="sestion == 1" v-model="addremarks"></textarea>
                        <textarea
                            name
                            id
                            v-else-if="sestion == 2"
                           
                            v-model="wantnowdata.PlanContent"
                            disabled
                        ></textarea>
                        <textarea
                            name
                            id
                            v-else-if="sestion == 3"
                            v-model="w"
                        ></textarea>
                    </div>
                </div>
                <div class="Preservation" v-if="sestion == 1 || sestion == 3" @click="nopre">{{lang.PopupCommon_Save}}</div>
                <div class="cancel" @click="cancel" v-if="sestion == 1 || sestion == 3">{{lang.PopupCommon_Cancel}}</div>
            </div>
        </div>
        <div class="sestion sestion23"  v-show="mesad2" :class="[{ssion:sestion == 1 && mesad1}]" :style="{zoom: zoomValue}" >
            <div class="sestionheader" :class="{colordiv:$store.state.color=='grey'}">
                <div
                    class="sestionheader1"
                ></div>
                <span
                    class="head"
                    v-if="sestion == 1 && mesad1"
                    :class="{fcolor:$store.state.color=='grey'}"
                >{{lang.RepairManage_SubmitFaultRepairTask}}</span>
                <span
                    class="head"
                    v-if="sestion == 1 && !mesad1"
                    :class="{fcolor:$store.state.color=='grey'}"
                >{{lang.RepairManage_SubmitTaskExecutionResults}}</span>
                <img
                    :src="no2"
                    alt
                    class="no"
                    @click.stop="mesad2 = false"
                    v-if="$store.state.color=='grey'"
                />
                <img :src="no" alt class="no" @click.stop="mesad2 = false" v-else />
            </div>
            <div class="sestioncontain">
                <div class="homesetion">
                    <div class="hometop">
                        <p class="hometop-title" >{{lang.EquipmentAccount_BasicInformation}}</p>
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
                            <span class="mi" >{{ !mesad1 ? lang.RepairManage_TaskStartTime : lang.NewTrendChart_NewTrendChartUserControl_StartTime}}</span>
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
                        <div class="margin" v-if="!mesad1">
                            <span class="sp6">{{lang.MaintenanceManage_RepeatTaskCycle}}</span>
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
                        <div class="margin" v-if="!mesad1">
                            <span class="sp6">{{lang.MaintenanceManage_TaskAdvanceReminder}}</span>
                            <div class="is">
                                <input
                                    type="text"
                                    v-if="sestion == 1"
                                    :value="sesstion.ReminderTimeValue"
                                    :disabled="disabled"
                                    placeholder="选填"
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
                            <span>{{!mesad1 ? lang.MaintenanceManage_TaskExecutionDuration : lang.NewTrendChart_NewTrendChartUserControl_EndTime}}</span>
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
                        <div class="margin" v-if="!mesad1">
                            <span>{{lang.MaintenanceManage_PlanEndTime}}</span>
                            <div class="inpimg">
                                <img :src="rili" alt class="inpimg1" />
                                <input type="text" :value="sesstion.MaturityTime" disabled />
                            </div>
                        </div>
                        <div class="margin" v-if="!mesad1">
                            <span>{{lang.MaintenanceManage_PlanExecutionStatus}}</span>
                            <select v-model="person1" :disabled="disabled">
                                <option v-for="(item,index) in person" :key="index" :value="item">{{lang.MaintenanceManage_Enable}}</option>
                            </select>
                        </div>
                    </div>
                    <div class="overflow overflow1">
                        <span class="remarks">{{!mesad1 ? lang.MaintenanceManage_TaskExecutionContent: lang.AlarmRecord_FaultRetrieva_DataGrid_Description}}</span>
                        <textarea
                            name
                            id
                            v-if="sestion == 1"
                            v-model="sesstion.PlanContent"
                            :disabled="disabled"
                        ></textarea>
                        <textarea
                            name
                            id
                            v-if="sestion == 2"
                         
                            v-model="sesstion.PlanContent"
                            :disabled="disabled"
                        ></textarea>
                        <textarea
                            name
                            id
                            v-if="sestion == 3"
                         
                            v-model="sesstion.PlanContent"
                            :disabled="disabled"
                        ></textarea>
                    </div>
                </div>
                <div class="homesetion">
                    <div class="hometop">
                        <p class="hometop-title" >{{lang.RepairManage_RepairInfo}}</p>
                        <div class="line"></div>
                    </div>
                </div>
                <div class="overflow">
                    <div class="fl">
                        <span>{{lang.RepairManage_RepairResult}}</span>
                        <select name id v-model="over">
                            <option v-for="(item,index) in arr" :value="item" :key="index">{{item}}</option>
                        </select>
                    </div>
                </div>
                <div class="overflow">
                    <span class="remarks">{{lang.RepairManage_RepairDescribe}}</span>
                    <textarea name id v-if="sestion == 1" v-model="w1"></textarea>
                    <textarea
                        name
                        id
                        v-if="sestion == 2"
                     
                        v-model="pen.Remarks"
                        :disabled="disabled"
                    ></textarea>
                    <textarea
                        name
                        id
                        v-if="sestion == 3"
                     
                        v-model="tip.Remarks"
                        :disabled="disabled"
                    ></textarea>
                </div>
                <div class="box">
                    <el-checkbox v-model="sesstion.SynchronizeToSOP">{{lang.MaintenanceManage_SynchronizeToSOP}}</el-checkbox>
                </div>
                <div class="Preservation" @click="pre12">{{lang.PopupCommon_Save}}</div>
                <div class="cancel" @click="cancel">{{lang.PopupCommon_Cancel}}</div>
            </div>
        </div>

        <div class="Choice" v-if="cancel1" ref="kongtiao" >
            <div class="choicehead">
                <div
                    class="choicehead1"
                    @mousedown="mouseDownHandleelse($event)"
                    @mouseup="mouseUpHandleelse($event)"
                ></div>
                <sapn v-if="select1 == 1">{{lang.EquipmentAccount_SelectEquipmentType}}</sapn>
                <sapn v-if="select1 == 2">{{lang.SCMSConsoleWebApiMySql_SelectInstallPosition}}</sapn>
                <div class="img" @click="cancel2">
                    <img :src="no" alt v-if="$store.state.color=='grey'" />
                    <img :src="no2" v-else />
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
        <div class="tip"  v-show="tipchange"  :style="{zoom: zoomValue}">
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
        <div class="boxsad" v-show="daibang" :style="{zoom: zoomValue}">
            <div
                class="tiptop"
           
            >
                <div class="tiphead" :class="{colordiv:$store.state.color=='grey'}">
                    <span :class="{fcolor:$store.state.color=='grey'}" v-if="mesad1">{{lang.RepairManage_CloseTaskTitle}}</span>
                      <span :class="{fcolor:$store.state.color=='grey'}" v-else>{{lang.RepairManage_CloseTaskTitle}}</span>
                   
                </div>
                 <img
                        :src="no2"
                        alt
                        class="no"
                        @click.stop="cancel"
                        v-if="$store.state.color=='grey'"
                    />
                    <img :src="no" alt class="no" @click.stop="cancel" v-else />
                <div class="t">
                    <span class="w">{{lang.MaintenanceManage_Remark}}</span>
                    <textarea name id cols="30" rows="10" :placeholder="lang.MaintenanceManage_InputCloseReason" v-model="gbword"></textarea>
                </div>
                <!-- <img :src="gth" alt /> -->

                <div class="Preservation" @click="gb">{{lang.PopupCommon_Sure}}</div>
                <div class="cancel" @click.stop="cancel">{{lang.PopupCommon_Cancel}}</div>
            </div>
        </div>
        <div class="cover1" v-if="change"></div>
        <div class="cover3" v-if="cancel1"></div>
        <div class="cover2" v-if="tipchange"></div>
        <div class="cover4" v-if="offdecive" @click=" selectword3 = false"></div>
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
            value1: new Date(new Date().toLocaleDateString()),
            value2: new Date(
                new Date(new Date().toLocaleDateString()).getTime() +
                    24 * 60 * 60 * 1000 -
                    1
            ),
            rwtime:1,
            rwselect:'小时',
            nowtime1: '',
            w1: '',
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
              xiala:require('../../assets/images/ziyuan4.png'),
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
            antable: [],
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
            pdyd1:true,
            pdyd2:true,
            pdyd3:true,
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
            taskname: '',
            c: '',
            arr: ['已处理', '未发现原因'],
            abc: '',
            mesad1: false,
            a1: 1,
            a2: 1,
            mesad2: false,
            mesad3: false,
            onestaion: '',
            nowIndex: 1,
            pageDate: {
                pageIndex: 1,
                pagesize: 50,
                togeIndex: 1,
                togesize: 0
            },
            aaa: false,
            bbb: false,
            nowpage: 1,
            w: '',
              jurisdiction:[],
            buttonarr:[],
            dbcxid:'',
            dbcxshow:true,
            dbtjid:'',
            dbtjshow:true,
            dbscid:"",
            dbscshow:true,
            dbtijid:'',
            dbtijshow:true,
            dbgbid:'',
            dbgbshow:true,
            dbckid:"",
            dbckshow:true,
            dbbjid:'',
            dbbjshow:true,
            lang: JSON.parse(localStorage.getItem('languages'))[localStorage.getItem('currentLang')],
            zoomValue: 0,
        };
    },

    created() {
        this.$nextTick(() => {
            this.zoomValue = Number(parseFloat(window.screen.width/1920).toFixed(2)) <= 0.8 ? 0.8 : Number(parseFloat(window.screen.width/1920).toFixed(2))
             this.$store.state.zoom = this.zoomValue
            this.$refs.search.style.zoom = this.zoomValue
                     let that = this;
         $('body')[0].addEventListener("mousemove",function(){
         
         setTimeout(()=>{
for(let i=0;i<$('.atooltip').length;i++){
    
                $('.atooltip')[i].style.zoom = that.zoomValue
            }
            })
     })
            this.$refs.page.style.zoom = this.zoomValue
            // this.$refs.table.style.height = `calc((100% - 122px) * ${this.zoomValue})`
            this.$refs.table.style.height = `calc((100% - 160px))`
        })
        this.getLangData()
              this.jurisdiction = this.$store.state.btnPowerData
     this.buttonarr = this.findPathByLeafId(this.GetUrlParam('id'),this.jurisdiction)[0].Children
        console.log("nut",this.buttonarr)
          this.buttonarr.forEach((item)=>{
              if(item.RightName == "代办维修-查询按钮"){
                 this.dbcxid = item.RightID
              }else if(item.RightName == "代办维修-添加按钮"){
                this.dbtjid = item.RightID
              }else if(item.RightName == "代办维修-提交按钮"){
                this.dbtijid = item.RightID
              }else if(item.RightName == "代办维修-删除按钮"){
                this.dbscid = item.RightID
              }else if(item.RightName == "代办维修-关闭按钮"){
                this.dbgbid = item.RightID
              }else if(item.RightName == "代办维修-查看按钮"){
                this.dbckid = item.RightID
              }else if(item.RightName == "代办维修-编辑按钮"){
                this.dbbjid = item.RightID
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
                  url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.dbcxid}`,
              }).then(res => {
                  this.dbcxshow = res.data.data
              
              }).catch((err)=>{
                  console.log('err',err)
              })
               this.$axios({
                  method: 'post',
                  url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.dbtjid}`,
              }).then(res => {
                  this.dbtjshow = res.data.data
              
              }).catch((err)=>{
                  console.log('err',err)
              })
               this.$axios({
                  method: 'post',
                  url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.dbscid}`,
              }).then(res => {
                  this.dbscshow = res.data.data
              
              }).catch((err)=>{
                  console.log('err',err)
              })
               this.$axios({
                  method: 'post',
                  url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.dbtijid}`,
              }).then(res => {
                  this.dbtijshow = res.data.data
              
              }).catch((err)=>{
                  console.log('err',err)
              })
              this.$axios({
                  method: 'post',
                  url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.dbgbid}`,
              }).then(res => {
                  this.dbgbshow = res.data.data
              
              }).catch((err)=>{
                  console.log('err',err)
              })
              this.$axios({
                  method: 'post',
                  url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.dbckid}`,
              }).then(res => {
                  this.dbckshow = res.data.data
              
              }).catch((err)=>{
                  console.log('err',err)
              })
              this.$axios({
                  method: 'post',
                  url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.dbbjid}`,
              }).then(res => {
                  this.dbbjshow = res.data.data
              
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
    watch: {
        rwtime(val){
         console.log(val)
        },
            VpowerData(val){
                this.jurisdiction = this.$store.state.btnPowerData
     this.buttonarr = this.findPathByLeafId(this.GetUrlParam('id'),this.jurisdiction)[0].Children
        console.log("nut",this.buttonarr)
          this.buttonarr.forEach((item)=>{
              if(item.RightName == "代办维修-查询按钮"){
                 this.dbcxid = item.RightID
              }else if(item.RightName == "代办维修-添加按钮"){
                this.dbtjid = item.RightID
              }else if(item.RightName == "代办维修-提交按钮"){
                this.dbtijid = item.RightID
              }else if(item.RightName == "代办维修-删除按钮"){
                this.dbscid = item.RightID
              }else if(item.RightName == "代办维修-关闭按钮"){
                this.dbgbid = item.RightID
              }else if(item.RightName == "代办维修-查看按钮"){
                this.dbcxid = item.RightID
              }else if(item.RightName == "代办维修-编辑按钮"){
                this.dbbjid = item.RightID
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
                  url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.dbcxid}`,
              }).then(res => {
                  this.dbcxshow = res.data.data
              
              }).catch((err)=>{
                  console.log('err',err)
              })
               this.$axios({
                  method: 'post',
                  url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.dbtjid}`,
              }).then(res => {
                  this.dbtjshow = res.data.data
              
              }).catch((err)=>{
                  console.log('err',err)
              })
               this.$axios({
                  method: 'post',
                  url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.dbscid}`,
              }).then(res => {
                  this.dbscshow = res.data.data
              
              }).catch((err)=>{
                  console.log('err',err)
              })
               this.$axios({
                  method: 'post',
                  url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.dbtijid}`,
              }).then(res => {
                  this.dbtijshow = res.data.data
              
              }).catch((err)=>{
                  console.log('err',err)
              })
              this.$axios({
                  method: 'post',
                  url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.dbgbid}`,
              }).then(res => {
                  this.dbgbshow = res.data.data
              
              }).catch((err)=>{
                  console.log('err',err)
              })
              this.$axios({
                  method: 'post',
                  url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.dbckid}`,
              }).then(res => {
                  this.dbckshow = res.data.data
              
              }).catch((err)=>{
                  console.log('err',err)
              })
              this.$axios({
                  method: 'post',
                  url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.dbbjid}`,
              }).then(res => {
                  this.dbbjshow = res.data.data
              
              }).catch((err)=>{
                  console.log('err',err)
              })

            },
        w(val) {
            console.log(val);
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
            this.rwselect = this.lang.HMI_HT_LineChartWindowViewModel_Hour
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
        getZoom() {
              let that = this
            setTimeout(()=>{
for(let i=0;i<$('.el-picker-panel').length;i++){
                $('.el-picker-panel')[i].style.zoom = that.zoomValue
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
        isPositiveInteger(s) {
            //是否为正整数
            var re = /^[0-9]+$/;
            return re.test(s);
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
                this.pdyd3 = true;
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
                           this.pdyd3 = true;
                        return;
                    }
                }
            }

            this.PageData.PageIndex = this.nowpage;
            this.onetable();
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
                this.PageData.PageIndex < this.PageData.TotalPage &&
                this.PageData.PageIndex !== this.PageData.TotalPage
            ) {
                this.PageData.PageIndex++;
                this.onetable();
            }
        },
        end() {
            this.PageData.PageIndex = this.PageData.TotalPage;
            this.onetable();
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
                       this.pdyd3 = true;
                } else {
                    this.offdecive = false;
                                                this.$store.state.div = 'sestion1'
this.$store.state.divtop = 'sestionheader1'  
                }
            } else if (this.sestion == 3) {
                console.log(this.wantnowdata);
                this.AID = this.aid;
                this.wantnowdata.DeviceName = this.wantword;
                this.offdecive = false;
                                            this.$store.state.div = 'sestion1'
this.$store.state.divtop = 'sestionheader1'  
            }
            this.$nextTick(() => {
                this.$refs.search.style.top = 0
                this.$refs.search.style.left = 0
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
        no1() {
            this.tipchange = false;
            this.deltrue = true;
        },
        getdevice() {
            this.$axios
                .post(`/api/RepairManage/RepairManage_GstEquipmentAccount`)
                .then(res => {
                    console.log(res);
                    this.projectlistdata = res.data.data;
                    this.projectlistdata1 = res.data.data;
                    setTimeout(() => {
                            $('.look').css({
                                left: `calc(50% - ${($('.look').width() / 2) *
                                    this.zoomValue}px)`,
                                top: `calc(50% - ${($('.look').height() / 2) *
                                    this.zoomValue}px)`
                            });
                            this.$store.state.div = 'look'
this.$store.state.divtop = 'looktop'  
this.offdecive = true;
this.$store.commit('move')
                        });
                    
                    this.pdyd2 = true;
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
                       this.pdyd3 = true;
                    this.deltrue = true;
                    this.getsetime();
                });
        },
        del() {
             if(!this.dbscshow){
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
                   this.pdyd3 = true;
                 this.tipword = this.lang.NoOperationAuthority;
                return
            }
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
                       this.pdyd3 = true;
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
                       this.pdyd3 = true;
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
                   this.pdyd3 = true;
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
                                        this.$store.state.div = 'sestion1'
this.$store.state.divtop = 'sestionheader1'  
            this.$nextTick(() => {
                this.$refs.search.style.top = 0
                this.$refs.search.style.left = 0
            })
            
        },
        preservation() {
            let i = 0;
            if (
                !JSON.parse(sessionStorage.getItem('userInfo1')) ||
                JSON.parse(sessionStorage.getItem('userInfo1')) == null
            ) {
                this.longinnum = JSON.parse(
                    sessionStorage.getItem('sightseerInfo1')
                ).SCMSUserName;
            } else {
                this.longinnum = JSON.parse(
                    sessionStorage.getItem('userInfo1')
                ).SCMSUserName;
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
                   this.pdyd3 = true;
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
                   this.pdyd3 = true;
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
                   this.pdyd3 = true;
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
                   this.pdyd3 = true;
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
                   this.pdyd3 = true;
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
                   this.pdyd3 = true;
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
                   this.pdyd3 = true;
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
                   this.pdyd3 = true;
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
                   this.pdyd3 = true;
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
                   this.pdyd3 = true;
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
                           this.pdyd3 = true;
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
                 this.$axios
                .post(`/api/RepairManage/RepairManage_GstTaskInitTime`)
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
            this.pdyd2 = false;
            let moveLeft = event.pageX - 550 + 'px';
            let moveTop = event.pageY - 30 + 'px';
            this.$refs.kongtiao5.style.left = moveLeft;
            this.$refs.kongtiao5.style.top = moveTop;
        },
        mouseMoveHandleelse1(event) {
            this.pdyd1 = false;
            let moveLeft = event.pageX - 350 + 'px';
            let moveTop = event.pageY - 30 + 'px';
            this.$refs.kongtiao1.style.left = moveLeft;
            this.$refs.kongtiao1.style.top = moveTop;
        },
        mouseMoveHandleelse2(event) {
            this.pdyd3= false;
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
            let ss = JSON.stringify(this.antable);
            this.tableData1 = JSON.parse(ss);
            this.daibang = false;
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
                   this.pdyd3 = true;
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
                   this.pdyd3 = true;
                   this.pdyd3 = true;
            } else {
                this.cancel1 = false;
            }
        },
        Preservation3() {
            this.Preservation = this.Preservation1;
            if (this.pen.DeviceType == this.lang.EquipmentAccount_EquipmentType) {
                this.tipword = this.lang.EquipmentAccount_SelectEquipmentType1
                this.pen.DeviceType = this.lang.EquipmentAccount_ClickSelect;
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
                   this.pdyd3 = true;
            } else if (this.pen.InstallationLocation == this.lang.EquipmentAccount_InstallPosition) {
                this.tipword = this.lang.EquipmentAccount_SelectInstallPosition
                this.pen.InstallationLocation = this.lang.EquipmentAccount_ClickSelect;
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
                   this.pdyd3 = true;
            } else {
                this.cancel1 = false;
            }
        },
        handleEdit11(a, b) {
             if(!this.dbckshow){
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
                   this.pdyd3 = true;
                 this.tipword = this.lang.NoOperationAuthority;
                return
            }
            console.log(a);
            console.log(b);
            this.sestion = 2;
            if (!b.DeviceName == null) {
                b.DeviceName = this.lang.EquipmentAccount_ClickSelect;
            }
              var startime1 = moment(b.StartTime)
              var endtime1 = moment(b.EndTime)
            var jsvalue1 = endtime1.diff(startime1,'hours')
            var ss1 = b.StartTime.slice(8)
            var ee1 = b.EndTime.slice(8)
            var cc1 = ss1 == ee1
           if(cc1){
                jsvalue1 = endtime1.diff(startime1,'months')
              b.rwtime = jsvalue1
              b.rwselect = this.lang.HMI_HT_LineChartWindowViewModel_Month
           }else{
               if(jsvalue1 % 168 == 0){
                 b.rwtime = jsvalue1 / 168
                 b.rwselect = this.lang.HMI_HT_LineChartWindowViewModel_Week
               }else if(jsvalue1 % 24 == 0){
                 b.rwtime = jsvalue1 / 24
                 b.rwselect = this.lang.MaintenanceManage_Day
               }else{
                 b.rwtime = jsvalue1
                 b.rwselect = this.lang.HMI_HT_LineChartWindowViewModel_Hour
               }
           }
            this.wantnowdata = b;
            this.w = this.wantnowdata.PlanContent;
                                setTimeout(() => {
                            $('.sestion1').css({
                                zoom: this.zoomValue,
                                left: `calc(50% - ${($('.sestion1').width() / 2) *
                                    this.zoomValue}px)`,
                                top: `calc(50% - ${($('.sestion1').height() / 2) *
                                    this.zoomValue}px)`
                            });
                            this.$store.state.div = 'sestion1'
this.$store.state.divtop = 'sestionheader1'  
  this.change11 = true;
this.$store.commit('move')
                        });
          
            this.pdyd1 = true;
            if (this.wantnowdata.PeriodUnit == 1) {
                this.wantnowdata.PeriodUnit = this.lang.HMI_HT_LineChartWindowViewModel_Hour;
            } else if (this.wantnowdata.PeriodUnit == 2) {
                this.wantnowdata.PeriodUnit = this.lang.MaintenanceManage_Day;
            } else if (this.wantnowdata.PeriodUnit == 3) {
                this.wantnowdata.PeriodUnit = this.lang.HMI_HT_LineChartWindowViewModel_Week;
            } else if (this.wantnowdata.PeriodUnit == 4) {
                this.wantnowdata.PeriodUnit = this.lang.HMI_HT_LineChartWindowViewModel_Month;
            }
            if (this.wantnowdata.ReminderTimeUnit == 1) {
                this.wantnowdata.ReminderTimeUnit = this.lang.HMI_HT_LineChartWindowViewModel_Hour;
            } else if (this.wantnowdata.ReminderTimeUnit == 2) {
                this.wantnowdata.ReminderTimeUnit = this.lang.MaintenanceManage_Day;
            } else if (this.wantnowdata.ReminderTimeUnit == 3) {
                this.wantnowdata.ReminderTimeUnit = this.lang.HMI_HT_LineChartWindowViewModel_Week;
            } else if (this.wantnowdata.ReminderTimeUnit == 4) {
                this.wantnowdata.ReminderTimeUnit = this.lang.HMI_HT_LineChartWindowViewModel_Month;
            }
            if (this.wantnowdata.TaskType == this.lang.RepairManage_FaultRepair) {
                this.mesad3 = false;
            } else {
                this.mesad3 = true;
            }
             var startime = moment(this.wantnowdata.CurrentStartTime)
              var endtime = moment(this.wantnowdata.CurrentEndTime)
            var jsvalue = endtime.diff(startime,'hours')
            var ss = this.wantnowdata.CurrentStartTime.slice(8)
            var ee = this.wantnowdata.CurrentEndTime.slice(8)
            var cc = ss == ee
           if(cc){
                jsvalue = endtime.diff(startime,'months')
                this.meaddtable.rwtime = jsvalue
                this.meaddtable.rwselect = this.lang.HMI_HT_LineChartWindowViewModel_Month
           }else{
               if(jsvalue % 168 == 0){
                   this.meaddtable.rwtime = jsvalue / 168
                   this.meaddtable.rwselect = this.lang.HMI_HT_LineChartWindowViewModel_Week
               }else if(jsvalue % 24 == 0){
                   this.meaddtable.rwtime = jsvalue / 24
                   this.meaddtable.rwselect = this.lang.MaintenanceManage_Day
               }else{
                   this.meaddtable.rwtime = jsvalue
                   this.meaddtable.rwselect = this.lang.HMI_HT_LineChartWindowViewModel_Hour
               }
           }
        },
        handleEdit3(a, b) {
             if(!this.dbgbshow){
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
                   this.pdyd3 = true;
                 this.tipword = this.lang.NoOperationAuthority;
                return
            }
            this.gbword = ''
            console.log(b);
            setTimeout(() => {
                            $('.boxsad').css({
                                zoom: this.zoom,
                                left: `calc(50% - ${($('.boxsad').width() / 2) *
                                    this.zoom}px)`,
                                top: `calc(50% - ${($('.boxsad').height() / 2) *
                                    this.zoom}px)`
                            });
                            this.$store.state.div = 'boxsad'
this.$store.state.divtop = 'tiphead'  
 this.daibang = true;
this.$store.commit('move')
                        });
           
            this.aid = b.ID;
 if (b.TaskType == this.lang.RepairManage_FaultRepair) {
                this.mesad1 = true;
            } else {
                this.mesad1 = false;
            }
            // this.change11 = true;
        },
        handleEdit111(a, b) {
             if(!this.dbtjshow){
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
                   this.pdyd3 = true;
                 this.tipword = this.lang.NoOperationAuthority;
                return
            }
            this.w1 = ''
            console.log(b);
            this.sestion = 1;
            this.sesstion = b;
            this.over = this.lang.RepairManage_Processed
            this.w = this.sesstion.PlanContent;
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
            if (this.sesstion.TaskType == this.lang.RepairManage_FaultRepair) {
                this.mesad1 = true;
            } else {
                this.mesad1 = false;
            }
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

            this.pdyd1 = true;
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
                console.log(this.addremarks);
                if(this.rwselect == this.lang.HMI_HT_LineChartWindowViewModel_Hour){
                this.nowtime2 = 
                moment(this.nowtime1).add(Number(this.rwtime),"hours").format("YYYY-MM-DD HH:mm:ss")
            }else if(this.rwselect == this.lang.MaintenanceManage_Day){
                this.nowtime2 = 
                moment(this.nowtime1).add(Number(this.rwtime),"days").format("YYYY-MM-DD HH:mm:ss")
            }else if(this.rwselect == this.lang.HMI_HT_LineChartWindowViewModel_Week){
                this.nowtime2 = 
                moment(this.nowtime1).add(Number(this.rwtime),"weeks").format("YYYY-MM-DD HH:mm:ss")
            }else if(this.rwselect == this.lang.HMI_HT_LineChartWindowViewModel_Month){
                this.nowtime2= 
                moment(this.nowtime1).add(Number(this.rwtime),"months").format("YYYY-MM-DD HH:mm:ss")
            }
             
                console.log(this.deviceperson)
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
                       this.pdyd3 = true;
                    if (res.data.msg == '请求成功') {
                        this.tipword = this.lang.EquipmentAccount_SuccessfullyAdded
                        this.change11 = false;
                        this.getsetime();
                    } else if (res.data.msg == /* '维修设备id格式应为GUID！' */ this.lang.SCMSConsoleWebApiMySql_RepairDeviceIDMustGuid) {
                        this.tipword = this.lang.RepairManage_SelectRepairEquipment
                    } else {
                        this.tipword = res.data.msg;
                    }
                });
            } else if (this.sestion == 3) {
                console.log(this.wantnowdata)
               if(this.wantnowdata.rwselect == this.lang.HMI_HT_LineChartWindowViewModel_Hour){
                this.wantnowdata.EndTime = 
                moment(this.wantnowdata.EndTime).add(Number(this.wantnowdata.rwtime),"hours").format("YYYY-MM-DD HH:mm:ss")
            }else if(this.wantnowdata.rwselect == this.lang.MaintenanceManage_Day){
                this.wantnowdata.EndTime = 
                moment(this.wantnowdata.EndTime).add(Number(this.wantnowdata.rwtime),"days").format("YYYY-MM-DD HH:mm:ss")
            }else if(this.wantnowdata.rwselect == this.lang.HMI_HT_LineChartWindowViewModel_Week){
                this.wantnowdata.EndTime = 
                moment(this.wantnowdata.EndTime).add(Number(this.wantnowdata.rwtime),"weeks").format("YYYY-MM-DD HH:mm:ss")
            }else if(this.wantnowdata.rwselect == this.lang.HMI_HT_LineChartWindowViewModel_Month){
                this.wantnowdata.EndTime= 
                moment(this.wantnowdata.EndTime).add(Number(this.wantnowdata.rwtime),"months").format("YYYY-MM-DD HH:mm:ss")
            }
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
                        PlanContent: this.w,
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
                       this.pdyd3 = true;
                    if (res.data.msg == '请求成功') {
                        this.tipword = this.lang.FormulaManage_HT_FormulaSetting_ModifiedSuccessfully
                        this.change11 = false;
                        this.getsetime();
                    } else {
                        this.tipword = res.data.msg;
                    }
                });
            }
        },
        handleEdit1(a, b) {
        
                this.sestion = 3;
             if(!this.dbbjshow){
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
                   this.pdyd3 = true;
                 this.tipword = this.lang.NoOperationAuthority;
                return
            }
                setTimeout(() => {
                            $('.sestion1').css({
                                zoom: this.zoomValue,
                                left: `calc(50% - ${($('.sestion1').width() / 2) *
                                    this.zoomValue}px)`,
                                top: `calc(50% - ${($('.sestion1').height() / 2) *
                                    this.zoomValue}px)`
                            });
                            this.$store.state.div = 'sestion1'
this.$store.state.divtop = 'sestionheader1'  
  this.change11 = true;
this.$store.commit('move')
                        });
            this.pdyd1 = true;
            if (b.DeviceName == null) {
                b.DeviceName = this.lang.EquipmentAccount_ClickSelect;
            }
            this.ID = b.ID;
            this.AID = b.AID;
            console.log(b)
             var startime = moment(b.StartTime)
              var endtime = moment(b.EndTime)
            var jsvalue = endtime.diff(startime,'hours')
            var ss = b.StartTime.slice(8)
            var ee = b.EndTime.slice(8)
            var cc = ss == ee
           if(cc){
                jsvalue = endtime.diff(startime,'months')
              b.rwtime = jsvalue
              b.rwselect = this.lang.HMI_HT_LineChartWindowViewModel_Month
           }else{
               if(jsvalue % 168 == 0){
                 b.rwtime = jsvalue / 168
                 b.rwselect = this.lang.HMI_HT_LineChartWindowViewModel_Week
               }else if(jsvalue % 24 == 0){
                 b.rwtime = jsvalue / 24
                 b.rwselect = this.lang.MaintenanceManage_Day
               }else{
                 b.rwtime = jsvalue
                 b.rwselect = this.lang.HMI_HT_LineChartWindowViewModel_Hour
               }
           }
            this.wantnowdata = b;
            
            this.w = b.PlanContent;
        
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
             if(!this.dbtjshow){
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
                   this.pdyd3 = true;
                 this.tipword = this.lang.NoOperationAuthority;
                return
            }
            this.sestion = 1;
                  setTimeout(() => {
                            $('.sestion1').css({
                                zoom: this.zoomValue,
                                left: `calc(50% - ${($('.sestion1').width() / 2) *
                                    this.zoomValue}px)`,
                                top: `calc(50% - ${($('.sestion1').height() / 2) *
                                    this.zoomValue}px)`
                            });
                            this.$store.state.div = 'sestion1'
this.$store.state.divtop = 'sestionheader1'  
  this.change11 = true;
this.$store.commit('move')
                        });
            this.pdyd1 = true;
            this.addremarks = '';
            this.Preservation = this.lang.EquipmentAccount_ClickSelect;
            this.rwtime = 1;
            this.rwselect = this.lang.HMI_HT_LineChartWindowViewModel_Hour;
            this.aid = ''
               this.nowtime1 = this.gettimenowtime();
      
        this.nowtime1 =  moment(this.nowtime1).add(1,'hours').format("YYYY-MM-DD HH:mm:ss")
        
            // console.log(this.wantnowdata);
            // this.wantnowdata = {
            //     AID: '0080a9e9-c04a-4c39-bbca-6e36bc66771d',
            //     CloseRemarks: null,
            //     DeviceName: '唐僧',
            //     EndTime: '2020-02-23 17:42:45',
            //     FinishTime: '/Date(1582191975000)/',
            //     Foreground: '#ff0000',
            //     ID: '32e5c872-bc3d-4077-9897-6be57df33b4c',
            //     MaturityTime: '2020-02-20 17:46:15',
            //     Number: 1,
            //     PeriodUnit: 0,
            //     PeriodValue: 0,
            //     PlanContent: null,
            //     ReminderTimeUnit: 0,
            //     ReminderTimeValue: 0,
            //     RepairPerson: 'SuperAdmin',
            //     RepairResult: 0,
            //     StartTime: '2020-02-21 17:42:45',
            //     Status: this.lang.MaintenanceManage_NotStarted,
            //     SynchronizeToSOP: false,
            //     TaskName: 'www',
            //     TaskType: this.lang.RepairManage_FaultRepair
            // };
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
                    $('.move')[0].offsetTop +
                    $('.seleword3')[0].clientHeight+4 +
                    'px'
            });
            this.changeselect = !this.changeselect;
            var $this = this
            // this.$nextTick(() => {
            //     let trees = document.querySelectorAll('.selectword')
            //     trees.forEach(item => {
            //         item.style.transformOrigin =  `215px 170px`
            //         item.style.transform = `scale(${$this.zoomValue})`
            //     })
            // })
            
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
                this.Preservation = this.lang.EquipmentAccount_ClickSelect;
            } else if (this.Preservation5 == this.lang.EquipmentAccount_InstallPosition) {
                this.Preservation5 = this.lang.EquipmentAccount_ClickSelect;
            } else {
                this.cancel1 = false;
            }
            this.cancel1 = false;
        },
        pre12() {
            console.log(this.sesstion);
            console.log(this.sesstion.ID);
            console.log(this.over);
            console.log(this.sesstion.CloseRemarks);
            console.log(this.sesstion.SynchronizeToSOP);
            console.log(this.abc);
            console.log(this.w1);
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
                    `/api/RepairManage/RepairManage_SubmitUpcoming?argTID=${this.sesstion.ID}&stringResult=${this.over}&argDesc=${this.w1}&argSaveToSOP=${this.sesstion.SynchronizeToSOP}&argLoginUserName=${this.abc}`
                )
                .then(res => {
                    console.log('zf', res);
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
                       this.pdyd3 = true;
                    this.tipword = this.lang.MaintenanceManage_SubmittedSuccessfully
                    this.getsetime();
                    this.mesad2 = false;
                });
        },
        onetable() {
            let c = this.Meter;
            if (this.Meterid == '11111111-1111-1111-1111-111111111111') {
                c = '';
            } else {
                c = this.Meter;
            }
            // this.value1 = JSON.stringify(this.value1);
            // this.value2 = JSON.stringify(this.value2);
            let a = this.Meter1;
            let b = this.Meter2;
            if (a == this.lang.MaintenanceManage_NotStarted) {
                a = 0;
            } else if (a == this.lang.MaintenanceManage_Ongoing) {
                a = 2;
            } else if (a == this.lang.MaintenanceManage_Delayed) {
                a = 3;
            } else if (a == this.lang.AlarmRecord_HT_Unlimited) {
                a = '';
            }
            if (b == this.lang.RepairManage_PlanRepair) {
                b = 1;
            } else if (b == this.lang.RepairManage_FaultRepair) {
                b = 2;
            } else if (b == this.lang.AlarmRecord_HT_Unlimited) {
                b = '';
            }
            this.$axios
                .post(
                    `/api/RepairManage/RepairManage_GstTask?argDeviceType=${c}&argTaskStatus=${a}&argTaskType=${b}&argStartTime=${this.value1}&argEndTime=${this.value2}&argKeyword=${this.keyword}&argPageSize=${this.PageData.PageSize}&argPageIndex=${this.PageData.PageIndex}`
                )
                .then(res => {
                    console.log("----ers",res)
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
                            this.tableData1[i].MaturityTime = this.gettime(
                                this.tableData1[i].MaturityTime
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
                            }
                            if (this.tableData1[i].TaskType == 1) {
                                this.tableData1[i].TaskType = this.lang.RepairManage_PlanRepair;
                            } else if (this.tableData1[i].TaskType == 2) {
                                this.tableData1[i].TaskType = this.lang.RepairManage_FaultRepair;
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
                           this.pdyd3 = true;
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
            if(!this.dbcxshow&&a!==1){
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
                   this.pdyd3 = true;
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
                   this.pdyd3 = true;
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
            this.$axios
                .post(
                    `/api/RepairManage/RepairManage_CloseUpcomming?argTID=${this.aid}&argDesc=${this.gbword}`
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
                       this.pdyd3 = true;
                    this.getsetime();
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
        getsetime() {
            this.$axios
                .post(`/api/RepairManage/RepairManage_GstTaskInitTime`)
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
        this.$axios
            .post(`/api/UserManage/UserManage_GstUserWithNoPage`)
            .then(res => {
                console.log('ss', res);
                this.supermin = res.data.data;
                this.person = res.data.data;
            });
        console.log(this.tableData);
     
        if (
            !JSON.parse(sessionStorage.getItem('userInfo1')) ||
            JSON.parse(sessionStorage.getItem('userInfo1')) == null
        ) {
            this.abc = JSON.parse(
                sessionStorage.getItem('sightseerInfo1')
            ).SCMSUserName;
        } else {
            this.abc = JSON.parse(
                sessionStorage.getItem('userInfo1')
            ).SCMSUserName;
        }
          this.jurisdiction = this.$store.state.btnPowerData
     this.buttonarr = this.findPathByLeafId(this.GetUrlParam('id'),this.jurisdiction)[0].Children
        console.log("nut",this.buttonarr)
          this.buttonarr.forEach((item)=>{
              if(item.RightName == "代办维修-查询按钮"){
                 this.dbcxid = item.RightID
              }else if(item.RightName == "代办维修-添加按钮"){
                this.dbtjid = item.RightID
              }else if(item.RightName == "代办维修-提交按钮"){
                this.dbtijid = item.RightID
              }else if(item.RightName == "代办维修-删除按钮"){
                this.dbscid = item.RightID
              }else if(item.RightName == "代办维修-关闭按钮"){
                this.dbgbid = item.RightID
              }else if(item.RightName == "代办维修-查看按钮"){
                this.dbcxid = item.RightID
              }else if(item.RightName == "代办维修-编辑按钮"){
                this.dbbjid = item.RightID
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
                  url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.dbcxid}`,
              }).then(res => {
                  this.dbcxshow = res.data.data
              
              }).catch((err)=>{
                  console.log('err',err)
              })
               this.$axios({
                  method: 'post',
                  url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.dbtjid}`,
              }).then(res => {
                  this.dbtjshow = res.data.data
              
              }).catch((err)=>{
                  console.log('err',err)
              })
               this.$axios({
                  method: 'post',
                  url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.dbscid}`,
              }).then(res => {
                  this.dbscshow = res.data.data
              
              }).catch((err)=>{
                  console.log('err',err)
              })
               this.$axios({
                  method: 'post',
                  url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.dbtijid}`,
              }).then(res => {
                  this.dbtijshow = res.data.data
              
              }).catch((err)=>{
                  console.log('err',err)
              })
              this.$axios({
                  method: 'post',
                  url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.dbgbid}`,
              }).then(res => {

                  this.dbgbshow = res.data.data
              
              }).catch((err)=>{
                  console.log('err',err)
              })
              this.$axios({
                  method: 'post',
                  url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.dbckid}`,
              }).then(res => {
                
                  this.dbckshow = res.data.data
              
              }).catch((err)=>{
                  console.log('err',err)
              })
              this.$axios({
                  method: 'post',
                  url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.dbbjid}`,
              }).then(res => {
                  this.dbbjshow = res.data.data
              
              }).catch((err)=>{
                  console.log('err',err)
              })
    }
};
</script>

<style lang='scss' scoped>
.item{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
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
        margin-right: 80px;
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
         color: #000;
    }
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
    .tiphead {
        width: 100%;
        position: relative;
        height: 60px;
        background-color: #4270e4;
        text-align: center;
        line-height: 60px;
        color: #fff;
     
    }
    .tipttop {
        position: absolute;
    }
}
.box {
    position: relative;
    top: 10px;
    left: 95px;
}
.sp6 {
    position: relative;
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
    .tipword {
        width: 100%;
        text-align: center;
        margin-top: 50px;
    }
    .tipdetermine {
        color: #ea9328;
        cursor: pointer;
        width: 310px;
        line-height: 30px;
        text-align: center;
        // margin-top: 40px;
        position: absolute;
        bottom: 20px;
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
    justify-content: space-between;
    background-color: #ddd;
    width: 100%;
    font-size: 16px;
    color: #7f6f79;
    height: 130px !important;
    line-height: 60px;
    padding: 0px 22px 0px 22px;
    select {
        border: 0;
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
            .add{
                background-color: transparent;
                border: 1px solid #46BE05;
                color: #46BE05;
            }
            .move{
                background-color: #4F5871;
                border: 1px solid #4F5871;
                color: #fff;
            }
            select{
                border-width: 1px;
                border-style: solid;
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

            .w{
                color: #fff;
            }
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
        .input1{
            input{
                border-width: 0!important;
                background-color: transparent!important;
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
}
.overflow1 {
    position: relative;
    left: -20px;
    height: 130px;
    bottom: -10px;
}
.sestion {
    .sp1 {
        margin-left: 10px;
    }
    .is {
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
        color: #363636;
        font-size: 14px;
        // margin-right: 20px;
     
    }
    .sestioncontain{
        span{
            width: 100px;
            display: inline-block;
            text-align: left;
        }
    }
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
    width: calc(100% - 100px);
    height: 120px;
    border: none;
    border: 1px solid #e0e0e0;
    resize: none;
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
    top: 172px;
    left: 312px;
    z-index: 11999999;
    width: 230px;
    overflow: auto;
    height: auto;
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
    // z-index: 23999999;
    z-index: 23;
    // 此处z-index过大会导致tooltip 提示信息被遮盖，无法显示
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
    z-index: 39999999;
    position: fixed;
    top: 0;
    left: 0;
}
.cover3 {
    width: 100%;
    height: 100%;
    z-index: 19999999;
    position: fixed;
    top: 0;
    left: 0;
}
.sestion1 {
    height: 510px !important;
    top: 260px;
    // z-index: 26999999 !important;
    z-index: 26 !important;
    // 此处z-index过大会导致tooltip 提示信息被遮盖，无法显示
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
            // bottom: 15px;
            bottom: 0;
            top: 0;
            margin: auto;
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
        height: 60px;
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
            position: relative;
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
        width: 950px ;
        margin-left: 23px;
        height: 320px ;
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
    z-index: 50999999;
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
.input1 input{
    border: none;
    width: calc(100% - 42px);
    overflow:hidden; white-space:nowrap; text-overflow:ellipsis; 
}
.ssion{
    height: 700px !important;
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
    left: 153px !important;
}
.sblx{
    display: inline-block;
}
.cancel5{
   position: absolute !important;
   bottom: 20px !important;
   right: 0px !important;
}
.img{
   font-size: 16px;
}
</style>

