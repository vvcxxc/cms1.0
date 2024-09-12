<!--
 * @Description: 维修管理维修计划界面
 * @Date: 2019-11-25 19:07:09
 * @Author: 随风
 * @LastEditors: Tao
 * @LastEditTime: 2020-08-06 18:17:14
 -->
<template>
    <div class="public-table bygl" @click="changeselect = false">
          			<div class="loadcover" element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(0, 0, 0, 0.4)"  v-loading="this.$store.state.isShow" v-show="this.$store.state.isShow" style="position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;"></div>
        <div class="look" :style="{width:1120*zoomValue+'px',height:600*zoomValue+'px'}"  v-show="offdecive" @click="selectword3 = false" >
            <div
                class="looktop"
                :style="{height:60*zoomValue+'px'}"
            ></div>
            <div class="lookhead"   :style="{fontSize:16*zoomValue+'px',height:60*zoomValue+'px',lineHeight:60*zoomValue+'px'}" :class="[{fcolor:$store.state.color=='grey'},{colordiv:$store.state.color=='grey'}]">
                {{lang.FileManage_AddAssociatedEquipment}}
                  <img    :style="{width:24*zoomValue+'px',height:24*zoomValue+'px'}" :src="no2" alt class="no"  @click.stop="cancel11" v-if="$store.state.color=='grey'"/>
                <img    :style="{width:24*zoomValue+'px',height:24*zoomValue+'px'}" :src="no" alt class="no"  @click.stop="cancel11" v-else/>
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
                        <input type="text " class="tinput1" :placeholder="lang.AlarmRecord_Time_Keyword" v-model="projectkeyword" />
                        <span class="lookfor1" @click="lookforsearch">{{lang.RoleManage_Query}}</span>
                    </div>
                    <div class="table" :style="{width:950*zoomValue+'px',height:350*zoomValue+'px'}">
                        <el-table
                            :data="projectlistdata"
                            height="100%"
                            border
                                 :style="{width: 950*zoomValue+'px',fontSize: 14*zoomValue+'px'}"
                            @row-click="handleRowChange1"
                           highlight-current-row
                :header-cell-style="[{background:(($store.state.color=='grey')?'#D9DBDE':'#E1EDFA')},
                           {color:(($store.state.color=='grey')?'#000':'#769DE7')}, 
                           {'border-left':'1px solid #cccccc',
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
            <div class="cancel cancel5" :style="{zoom:zoomValue}" @click="cancel11">{{lang.PopupCommon_Cancel}}</div>
            <div class="pre" :style="{zoom:zoomValue}" @click="pre1">{{lang.PopupCommon_Sure}}</div>
        </div>
        <div class="search-container" ref="search" :style="{zoom:zoomValue}">
            <span class="sblx">{{lang.EquipmentAccount_EquipmentType1}}</span>
               <div class="seleword" @click.stop="selectword1">
             <div class="seleword1 seleword3">
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

            <span class="sp4 tinput">{{lang.RepairManage_TaskStartTime1}}</span>

            <el-date-picker
                v-model="value1"
                type="datetime"
                @focus="getZoom()"
                :placeholder="lang.SCMSConsoleWebApiMySql_PleChooseDate"
                value-format="yyyy-MM-dd HH:mm:ss"
               
            ></el-date-picker>
            <span class="demonstration">-</span>
            <el-date-picker
                v-model="value2"
                type="datetime"
                @focus="getZoom()"
                :placeholder="lang.SCMSConsoleWebApiMySql_PleChooseDate"
                value-format="yyyy-MM-dd HH:mm:ss"
               
            ></el-date-picker>
            <input type="text" :placeholder="lang.AlarmRecord_Time_Keyword" v-model="keyword" />
            <div class="sad"  @click="sad">{{lang.RoleManage_Query}}</div>
            <div class="add"  @click="add">{{lang.RoleManage_Add}}</div>
            <div class="move"  @click="del">{{lang.RoleManage_Delete}}</div>
        </div>
        <div class="table-container table-container1">
            <el-table
                
                ref="multipleTable"
                :data="tableData1"
                stripe
                height="100%"
                tooltip-effect="dark"
                style="width: 1690px"
                @select="select"
                 border
                @select-all="selectall"
                :style="{
                    fontSize: zoomValue * 15 + 'px',
                    width: '100%',
                }"
                :row-style="{ height: 50 * zoomValue + 'px' }"
                 highlight-current-row
               :header-cell-style="{background:($store.state.color=='grey')?'#D9DBDE':'#5a6c98',color:($store.state.color=='grey')?'#000':'#fff','border-left':'1px solid #cccccc',height: 50 * zoomValue + 'px',padding:'0'}"
            >
                <template slot="empty">
                    <span>{{lang.SCMSConsoleWebApiMySql_NoData}}</span>
                </template>
                <el-table-column type="selection" :width="zoomValue>1?60*zoomValue:60"  :show-overflow-tooltip="true" ></el-table-column>
                <el-table-column :label="lang.AlarmRecord_HT_AlarmPointManageUC_SerialNumber" :width="120*zoomValue" prop="Number"  :show-overflow-tooltip="true" >
                    <template slot-scope="scope">{{ scope.row.Number }}</template>
                </el-table-column>
                <el-table-column prop="name" :label="lang.RoleManage_Operation" :width="200*zoomValue"   >
                    <template slot-scope="scope">
                        <!-- <i class="el-icon-share"></i> -->
                        <div class="img" :style="{zoom:zoomValue}" @click="handleEdit(scope.$index, scope.row)">
                            <img :src="look" alt />
                            {{scope.row.phone}}
                        </div>
                        <div class="img" :style="{zoom:zoomValue}" @click="handleEdit1(scope.$index, scope.row)">
                            <img :src="pensoil" alt />
                            {{scope.row.phone}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="PlanName"
                    :label="lang.MaintenanceManage_PlanName"
                     :width="200*zoomValue"
                     :show-overflow-tooltip="true"
                    
                ></el-table-column>
                <el-table-column prop="PeriodValue" :label="lang.RepairManage_RepairCycle" :width="200*zoomValue"  :show-overflow-tooltip="true"></el-table-column>
                <el-table-column
                    prop="CurrentStartTime"
                    :label="lang.MaintenanceManage_ThisTimeStartTime"
                   :width="200*zoomValue"
                    :show-overflow-tooltip="true"
                ></el-table-column>
                <el-table-column
                    prop="CurrentEndTime"
                    :label="lang.MaintenanceManage_ThisTimeEndTime"
                   :width="200*zoomValue"
                    :show-overflow-tooltip="true"
                ></el-table-column>
                <el-table-column prop="IsEnabled" :label="lang.MaintenanceManage_PlanExecutionStatus"  :width="300*zoomValue"  :show-overflow-tooltip="true"></el-table-column>
                <el-table-column
                    prop="NextStartTime"
                    :label="lang.MaintenanceManage_NextTimeStartTime"
                    :width="300*zoomValue"
                     :show-overflow-tooltip="true"
                ></el-table-column>
                <el-table-column
                    prop="NextEndTime"
                    :label="lang.MaintenanceManage_NextTimeEndTime"
                    :width="300*zoomValue"
                     :show-overflow-tooltip="true"
                ></el-table-column>
                <el-table-column prop="DeviceName" :label="lang.EquipmentAccount_EquipmentName" :width="300*zoomValue"  :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="RepairPerson" :label="lang.RepairManage_RepairPerson" :width="300*zoomValue"  :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="PlanContent" :label="lang.MaintenanceManage_TaskExecutionContent" :width="300*zoomValue"  :show-overflow-tooltip="true"></el-table-column>
            </el-table>
        </div>
        <div class="pages-container" ref="page" >
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
        <div class="sestion sestion1" v-show="changetrue" :style="{zoom:zoomValue}">
            <div class="sestionheader" :class="{colordiv:$store.state.color=='grey'}">
                <div
                    class="sestionheader1"
                   
                ></div>
                <span class="head" v-if="sestion == 1" :class="{fcolor:$store.state.color=='grey'}">{{lang.RepairManage_AddRepairPlan}}</span>
                <span class="head" v-else-if="sestion == 2" :class="{fcolor:$store.state.color=='grey'}">{{lang.RepairManage_ViewRepairPlan}}</span>
                <span class="head" v-else-if="sestion == 3" :class="{fcolor:$store.state.color=='grey'}">{{lang.RepairManage_EditRepairPlan}}</span>
                <img :src="no2" alt class="no"  @click.stop="cancel" v-if="$store.state.color=='grey'"/>
                <img :src="no" alt class="no"  @click.stop="cancel" v-else/>
            </div>
            <div class="sestioncontain">
                <div class="homesetion">
                    <div class="hometop">
                        <p class="hometop-title">{{lang.EquipmentAccount_BasicInformation}}</p>
                        <div class="line"></div>
                    </div>
                </div>
                <div class="overflow overflow10">
                    <div class="zl">
                        <div class="margin" >
                            <span>{{lang.RepairManage_RepairName}}</span>
                            <input type="text" v-if="sestion == 1" v-model="meaddtable.PlanName" />
                            <input
                                type="text"
                                v-else-if="sestion == 2"
                                v-model="meaddtable.PlanName"
                                disabled
                            />
                            <input type="text" v-else-if="sestion == 3" v-model="meaddtable.PlanName" />
                            <input type="text" v-else-if="sestion == 3" v-model="wantnowdata.TaskName" />
                        </div>
                        <div class="margin margin-date">
                            <span>{{lang.RepairManage_TaskStartTime}}</span>
                            <template>
                                <div class="block" v-if="sestion == 1">
                                    <el-date-picker
                                        v-model="meaddtable.CurrentStartTime "
                                        type="datetime"
                                        :placeholder="lang.SCMSConsoleWebApiMySql_PleChooseDate"
                                        value-format="yyyy-MM-dd HH:mm:ss"
                                    ></el-date-picker>
                                </div>
                                <div class="block" v-else-if="sestion == 2">
                                    <el-date-picker
                                        v-model="meaddtable.CurrentStartTime "
                                        type="datetime"
                                        :placeholder="lang.SCMSConsoleWebApiMySql_PleChooseDate"
                                        value-format="yyyy-MM-dd HH:mm:ss"
                                        disabled
                                    ></el-date-picker>
                                </div>
                                <div class="block" v-else-if="sestion == 3">
                                    <el-date-picker
                                        v-model="meaddtable.CurrentStartTime"
                                        type="datetime"
                                        :placeholder="lang.SCMSConsoleWebApiMySql_PleChooseDate"
                                        value-format="yyyy-MM-dd HH:mm:ss"
                                    ></el-date-picker>
                                </div>
                            </template>
                           <div class="is3">
                                  <el-tooltip popper-class="atooltip" effect="dark" :content="lang.MaintenanceManage_TaskStartTimeToolTip" placement="bottom">
                                <div class="showtext">
                                  <i class="el-icon-question"></i>
                                </div>
                            </el-tooltip>
                           </div>
                        </div>
                        <div class="margin">
                            <span class="sp6">{{lang.MaintenanceManage_RepeatTaskCycle}}</span>
                            <div class="is">
                                <input
                                    type="text"
                                    v-if="sestion == 1"
                                    v-model="meaddtable.PeriodValue"
                                />
                                <input
                                    type="text"
                                    v-if="sestion == 2"
                                    v-model="meaddtable.PeriodValue"
                                    disabled
                                />
                                <input
                                    type="text"
                                    v-if="sestion == 3"
                                    v-model="meaddtable.PeriodValue"
                                />
                                <select name id v-model="meaddtable.PeriodUnit" v-if="sestion == 1">
                                    <option
                                        v-for="(item,index) in sametimearr"
                                        :key="index"
                                        :value="item"
                                    >{{item}}</option>
                                </select>
                                <select
                                    name
                                    id
                                    v-model="meaddtable.PeriodUnit"
                                    v-if="sestion == 2"
                                    disabled
                                >
                                    <option
                                        v-for="(item,index) in sametimearr"
                                        :key="index"
                                        :value="item"
                                    >{{item}}</option>
                                </select>
                                <select name id v-model="meaddtable.PeriodUnit" v-if="sestion == 3">
                                    <option
                                        v-for="(item,index) in sametimearr"
                                        :key="index"
                                        :value="item"
                                    >{{item}}</option>
                                </select>
                            </div>
                            <div class="is2">
<el-tooltip popper-class="atooltip" effect="dark" :content="lang.MaintenanceManage_RepeatTaskCycleToolTip" placement="bottom">
                                <div class="showtext">
                                  <i class="el-icon-question"></i>
                                </div>
                            </el-tooltip>
                            </div>
                             
                        </div>
                        <div class="margin">
                            <span class="sp6">{{lang.MaintenanceManage_TaskAdvanceReminder}}</span>
                            <div class="is">
                                <input
                                    type="text"
                                    v-if="sestion == 1"
                                    v-model="meaddtable.ReminderTimeValue"
                                />
                                <input
                                    type="text"
                                    v-if="sestion == 2"
                                    v-model="meaddtable.ReminderTimeValue"
                                    disabled
                                />
                                <input
                                    type="text"
                                    v-if="sestion == 3"
                                    v-model="meaddtable.ReminderTimeValue"
                                />
                                <select
                                    name
                                    id
                                    v-model="meaddtable.ReminderTimeUnit"
                                    v-if="sestion == 1"
                                >
                                    <option
                                        v-for="(item,index) in sametimearr"
                                        :key="index"
                                        :value="item"
                                    >{{item}}</option>
                                </select>
                                <select
                                    name
                                    id
                                    v-model="meaddtable.ReminderTimeUnit"
                                    v-if="sestion == 2"
                                    disabled
                                >
                                    <option
                                        v-for="(item,index) in sametimearr"
                                        :key="index"
                                        :value="item"
                                    >{{item}}</option>
                                </select>
                                <select
                                    name
                                    id
                                    v-model="meaddtable.ReminderTimeUnit"
                                    v-if="sestion == 3"
                                >
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
                            <select name id v-model="meaddtable.RepairPerson " v-if="sestion == 1">
                                <option
                                    :value="item"
                                    v-for="(item,index) in supermin"
                                    :key="index"
                                >{{item}}</option>
                            </select>
                            <select
                                name
                                id
                                v-model="meaddtable.RepairPerson "
                                v-else-if="sestion == 2"
                                disabled
                            >
                                <option
                                    :value="item"
                                    v-for="(item,index) in supermin"
                                    :key="index"
                                >{{item}}</option>
                            </select>
                            <select
                                name
                                id
                                v-model="meaddtable.RepairPerson "
                                v-else-if="sestion == 3"
                            >
                                <option
                                    :value="item"
                                    v-for="(item,index) in supermin"
                                    :key="index"
                                >{{item}}</option>
                            </select>
                        </div>
                    </div>
                    <div class="zr">
                        <div class="margin">
                            <span>{{lang.RepairManage_RepairEquipment}}</span>
                            <div v-if="sestion == 1" class="input1">
                                <span>{{meaddtable.DeviceName}}</span>
                                <div class="inputimg" @click="getdevice">
                                    <img :src="diji" alt />
                                </div>
                            </div>
                            <div v-else-if="sestion == 2" class="input1">
                                <span>{{meaddtable.DeviceName}}</span>
                                <div class="inputimg">
                                    <img :src="diji" alt />
                                </div>
                            </div>
                            <div v-else-if="sestion == 3" class="input1">
                                <span>{{meaddtable.DeviceName}}</span>
                                <div class="inputimg" @click="getdevice">
                                    <img :src="diji" alt />
                                </div>
                            </div>
                        </div>
                        <div class="margin">
                            <span class="sp6">{{lang.MaintenanceManage_TaskExecutionDuration}}</span>
                                <div class="is">
                                <input
                                    type="text"
                                    v-if="sestion == 1"
                                    v-model="meaddtable.wxtime"
                                />
                                <input
                                    type="text"
                                    v-if="sestion == 2"
                                    v-model="meaddtable.wxtime"
                                    disabled
                                />
                                <input
                                    type="text"
                                    v-if="sestion == 3"
                                    v-model="meaddtable.wxtime"
                                />
                                <select
                                    name
                                    id
                                    v-model="meaddtable.wxselect"
                                    v-if="sestion == 1"
                                >
                                    <option
                                        v-for="(item,index) in sametimearr"
                                        :key="index"
                                        :value="item"
                                    >{{item}}</option>
                                </select>
                                <select
                                    name
                                    id
                                    v-model="meaddtable.wxselect"
                                    v-if="sestion == 2"
                                    disabled
                                >
                                    <option
                                        v-for="(item,index) in sametimearr"
                                        :key="index"
                                        :value="item"
                                    >{{item}}</option>
                                </select>
                                <select
                                    name
                                    id
                                    v-model="meaddtable.wxselect"
                                    v-if="sestion == 3"
                                >
                                    <option
                                        v-for="(item,index) in sametimearr"
                                        :key="index"
                                        :value="item"
                                    >{{item}}</option>
                                </select>
                            </div>
                            <!-- <template>
                                <div class="block" v-if="sestion == 1">
                                    <el-date-picker
                                        v-model="meaddtable.CurrentEndTime "
                                        type="datetime"
                                        placeholder="选择日期时间"
                                        value-format="yyyy-MM-dd HH:mm:ss"
                                    ></el-date-picker>
                                </div>
                                <div class="block" v-else-if="sestion == 2">
                                    <el-date-picker
                                        v-model="meaddtable.CurrentEndTime "
                                        type="datetime"
                                        placeholder="选择日期时间"
                                        value-format="yyyy-MM-dd HH:mm:ss"
                                        disabled
                                    ></el-date-picker>
                                </div>

                                <div class="block" v-else-if="sestion == 3">
                                    <el-date-picker
                                        v-model="meaddtable.CurrentEndTime "
                                        type="datetime"
                                        placeholder="选择日期时间"
                                        value-format="yyyy-MM-dd HH:mm:ss"
                                    ></el-date-picker>
                                </div>
                            </template> -->
                        </div>
                        <div class="margin margin-date">
                            <span>{{lang.MaintenanceManage_PlanEndTime}}</span>
                            <template>
                                <div class="block" v-if="sestion == 1">
                                    <el-date-picker
                                        v-model="meaddtable.MaturityTime  "
                                        type="datetime"
                                        :placeholder="lang.SCMSConsoleWebApiMySql_PleChooseDate"
                                        value-format="yyyy-MM-dd HH:mm:ss"
                                    ></el-date-picker>
                                </div>
                                <div class="block" v-else-if="sestion == 2">
                                    <el-date-picker
                                        v-model="meaddtable.MaturityTime "
                                        type="datetime"
                                        :placeholder="lang.SCMSConsoleWebApiMySql_PleChooseDate"
                                        value-format="yyyy-MM-dd HH:mm:ss"
                                        disabled
                                    ></el-date-picker>
                                </div>
                                <div class="block" v-else-if="sestion == 3">
                                    <el-date-picker
                                        v-model="meaddtable.MaturityTime "
                                        type="datetime"
                                        :placeholder="lang.SCMSConsoleWebApiMySql_PleChooseDate"
                                        value-format="yyyy-MM-dd HH:mm:ss"
                                    ></el-date-picker>
                                </div>
                            </template>
                        </div>
                        <div class="margin">
                            <span>{{lang.MaintenanceManage_PlanExecutionStatus}}</span>
                            <select v-model="meaddtable.IsEnabled" v-if="sestion == 1">
                                <option
                                    v-for="(item,index) in person1"
                                    :key="index"
                                    :value="item"
                                >{{item}}</option>
                            </select>
                            <select v-model="meaddtable.IsEnabled" v-if="sestion == 2" disabled>
                                <option
                                    v-for="(item,index) in person1"
                                    :key="index"
                                    :value="item"
                                >{{item}}</option>
                            </select>
                            <select v-model="meaddtable.IsEnabled" v-if="sestion == 3">
                                <option
                                    v-for="(item,index) in person1"
                                    :key="index"
                                    :value="item"
                                >{{item}}</option>
                            </select>
                        </div>
                    </div>
                    <div class="margin-textarea">
                        <span>{{lang.MaintenanceManage_TaskExecutionContent}}</span>
                        <textarea name id v-if="sestion == 1" v-model="meaddtable.PlanContent"></textarea>
                        <textarea
                            name
                            id
                            v-else-if="sestion == 2"
                            placeholder
                            v-model="w"
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
        <div class="Choice" v-if="cancel1" ref="kongtiao">
            <div class="choicehead">
                <div
                    class="choicehead1"
                    @mousedown="mouseDownHandleelse($event)"
                    @mouseup="mouseUpHandleelse($event)"
                ></div>
            <sapn v-if="select1 == 1" :class="{fcolor:$store.state.color=='grey'}">{{lang.EquipmentAccount_SelectEquipmentType}}</sapn>
                <sapn v-if="select1 == 2" >{{lang.SCMSConsoleWebApiMySql_SelectInstallPosition}}</sapn>
                <div class="img" @click="cancel2">
                   <img :src="no2" alt class="no"   v-if="$store.state.color=='grey'"/>
                <img :src="no" alt class="no"  v-else/>
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
        <div class="tip" v-show="tipchange" >
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
        <div class="cover1" v-if="change"></div>
        <div class="cover3" v-if="cancel1"></div>
        <div class="cover2" v-if="tipchange"></div>
        <div class="cover4" v-if="offdecive" @click="selectword3 = false"></div>
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
            w:'123123',
            sametimearr: ['小时', '天', '周', '月'],
            supermin: ['SuperAdmin', 'Guest'],
            taskname: '',
            offdecive: false,
            nowtimr1: '',
            wantnowdata: '',
            value1: new Date(new Date().toLocaleDateString()),
            value2: new Date(
                new Date(new Date().toLocaleDateString()).getTime() +
                    24 * 60 * 60 * 1000 -
                    1
            ),
            deltrue: true,
            changeselect: false,
            tipword: '',
                 xiala:require('../../assets/images/ziyuan4.png'),
            tableData1: [],
            antable:[],
            tipchange: false,
            gth: require('../../assets/images/gth.png'),
            moveDataelse: {
                x: null,
                y: null
            },
            person: ['SuperAdmin', 'Guest'],
            select1: 1,
            person1: ['启用', '停止'],
            warry: '保内',
            device: '在用',
            searchData: {
                argDeviceType: '',
                argKeyword: ''
            },
            time1: '',
            time2: '',
                 nowIndex: 1,
            pageDate: {
                pageIndex: 1,
                pagesize: 50,
                togeIndex: 0,
                togesize: 0
            },
             aaa: false,
            bbb: false,
            nowpage: 1,
            time3: '',
            PageData: {
                 PageSize: 50,
                TotalCount: 0,
                TotalPage: 1,
                PageIndex: 1,
                LastEnabled: false,
                NextEnabled: false
            },
            selectword3: false,
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
            Preservation: '点击选择',
            Preservation1: '点击选择',
            Preservation5: '点击选择',
            hastip: 1,
            sbnum: 1,
            time4: '',
            muchdata: '',
            a: 1,
            data6: [],
            OldPlanName:'',
            longinnum: '',
            deldata: {},
            delarray: [],
            yesdel: '',
            meaddtable: {
                Operate: '1',
                PID: '',
                OldPlanName: '',
                PlanName: '',
                AID: '',
                PeriodValue: '',
                PeriodUnit: '小时',
                PeriodTotalMinute: '',
                MaturityTime: '',
                ReminderTimeValue: '',
                ReminderTimeUnit: '小时',
                ReminderTimeTotalMinute: '',
                IsEnabled: '启用',
                RepairPerson: 'SuperAdmin',
                PlanContent: '',
                CurrentStartTime: '',
                CurrentEndTime: '',
                DeviceName: '点击选择'
            },
              pdyd1:true,
            pdyd2:true,
            pdyd3:true,
            oldName: '',
            projectlistdata: [],
            projectlistdata1: [],
            projectkeyword: '',
            ztarr: ['不限', '未开始', '进行中', '已延误'],
            leixinarr: ['不限', '计划维修', '故障维修'],
            oneselect: '',
            oneselectid: '',
            data7: [],
            changetrue: false,
            argID: [],
               jurisdiction:[],
            buttonarr:[],
            jhcxid:'',
            jhcxshow:true,
            jhtjid:'',
            jhtjshow:true,
            jhscid:'',
            jhscshow:true,
            jhckid:'',
            jhckshow:true,
            jhbjid:'',
            jhbjshow:true,
            lang: JSON.parse(localStorage.getItem('languages'))[localStorage.getItem('currentLang')],
            zoomValue: 0
        };
    },

    created() {
        this.$nextTick(() => {
            this.zoomValue = Number(parseFloat(window.screen.width/1920).toFixed(2)) <= 0.72 ? 0.72 : Number(parseFloat(window.screen.width/1920).toFixed(2))
            this.$refs.search.style.zoom = this.zoomValue
            this.$refs.page.style.zoom = this.zoomValue
        })
        this.getLangData()
                 this.jurisdiction = this.$store.state.btnPowerData
     this.buttonarr = this.findPathByLeafId(this.GetUrlParam('id'),this.jurisdiction)[0].Children
        console.log("nut",this.buttonarr)
          this.buttonarr.forEach((item)=>{
         if(item.RightName =="维修计划-查询按钮"){
          this.jhcxid = item.RightID
         }else if(item.RightName == "维修计划-添加按钮"){
          this.jhtjid = item.RightID
         }else if(item.RightName == "维修计划-删除按钮"){
          this.jhscid = item.RightID
         }else if(item.RightName == "维修计划-查看按钮"){
          this.jhckid = item.RightID
         }else if(item.RightName == "维修计划-编辑按钮"){
          this.jhbjid = item.RightID
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
                  url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.jhcxid}`,
              }).then(res => {
                  this.jhcxshow = res.data.data
              
              }).catch((err)=>{
                  console.log('err',err)
              })
                this.$axios({
                  method: 'post',
                  url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.jhtjid}`,
              }).then(res => {
                  this.jhtjshow = res.data.data
              
              }).catch((err)=>{
                  console.log('err',err)
              })
                this.$axios({
                  method: 'post',
                  url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.jhscid}`,
              }).then(res => {
                  this.jhscshow = res.data.data
              
              }).catch((err)=>{
                  console.log('err',err)
              })
                this.$axios({
                  method: 'post',
                  url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.jhckid}`,
              }).then(res => {
                  this.jhckshow = res.data.data
              
              }).catch((err)=>{
                  console.log('err',err)
              })
                this.$axios({
                  method: 'post',
                  url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.jhbjid}`,
              }).then(res => {
                  this.jhbjshow = res.data.data
              
              }).catch((err)=>{
                  console.log('err',err)
              })
        this.getEquipmentType();
        this.req(1);
        this.time4 = this.getNowTime();
        
    },
    watch: {
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
            this.sametimearr = [this.lang.HMI_HT_LineChartWindowViewModel_Hour, this.lang.MaintenanceManage_Day, this.lang.HMI_HT_LineChartWindowViewModel_Week, this.lang.HMI_HT_LineChartWindowViewModel_Month]
            this.person1 = [this.lang.MaintenanceManage_Enable, this.lang.MaintenanceManage_Stop]
            this.warry = this.lang.EquipmentAccount_Inside
            this.device = this.lang.EquipmentAccount_Used
            this.Meter1 = this.lang.AlarmRecord_HT_Unlimited
            this.Meter2 = this.lang.AlarmRecord_HT_Unlimited
            this.Preservation = this.lang.EquipmentAccount_ClickSelect
            this.Preservation1 = this.lang.EquipmentAccount_ClickSelect
            this.Preservation5 = this.lang.EquipmentAccount_ClickSelect
            this.ztarr = [this.lang.AlarmRecord_HT_Unlimited, this.lang.MaintenanceManage_NotStarted, this.lang.MaintenanceManage_Ongoing, this.lang.MaintenanceManage_Delayed]
            this.leixinarr = [this.lang.AlarmRecord_HT_Unlimited, this.lang.RepairManage_PlanRepair, this.lang.RepairManage_FaultRepair]
            this.meaddtable.PeriodUnit = this.lang.HMI_HT_LineChartWindowViewModel_Hour,
            this.meaddtable.ReminderTimeUnit = this.lang.HMI_HT_LineChartWindowViewModel_Hour,
            this.meaddtable.IsEnabled = this.lang.MaintenanceManage_Enable,
            this.meaddtable.DeviceName = this.lang.EquipmentAccount_ClickSelect
        },
        getZoom() {
            var $this = this
            this.$nextTick(() => {
                let dates = [...document.querySelectorAll('.el-picker-panel.el-date-picker')]
                dates.forEach(item => {
                    item.style.zoom = $this.zoomValue
                })
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
        cancel11() {
                                        this.$store.state.div = 'sestion1'
this.$store.state.divtop = 'sestionheader1'
            this.offdecive = false;
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
        mouseDownHandleelse5(event) {
            event.currentTarget.style.cursor = 'move';
            window.onmousemove = this.mouseMoveHandleelse5;
        },
        mouseUpHandleelse5(event) {
            window.onmousemove = null;
            event.currentTarget.style.cursor = 'move';
        },
        mouseMoveHandleelse5(event) {
            this.pdyd3 = false;
            let moveLeft = event.pageX - 550 + 'px';
            let moveTop = event.pageY - 30 + 'px';
            this.$refs.kongtiao5.style.left = moveLeft;
            this.$refs.kongtiao5.style.top = moveTop;
        },
        selectword2() {
            console.log(this.selectname);
            let i = 0;
            let j = 1;
            for (i in this.selectname) {
                if(this.a2 == 1){
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
            console.log(this.selectword3);
        },
        pre1() {
            if (this.sestion == 1) {
                this.meaddtable.DeviceName = this.wantword;
                this.meaddtable.AID = this.aid;
                console.log(this.meaddtable);
                if (!this.meaddtable.DeviceName) {
                    this.tipword = this.lang.FileManage_SelectEquipment;
                 setTimeout(() => {
                            $('.tip').css({
                                zoom: this.zoomValue,
                                left: `calc(50% - ${($('.tip').width() / 2) *
                                    this.zoomValue}px)`,
                                top: `calc(50% - ${($('.tip').height() / 2) *
                                    this.zoomValue}px)`
                            });
                            this.$store.state.div = 'tip'
this.$store.state.divtop = 'tiphead'  
this.tipchange = true
this.$store.commit('move')
                        });
                    this.pdyd1 = true;
                } else {
                                                this.$store.state.div = 'sestion1'
this.$store.state.divtop = 'sestionheader1'
                    this.offdecive = false;
                }
            } else if (this.sestion == 3) {
                                            this.$store.state.div = 'sestion1'
this.$store.state.divtop = 'sestionheader1'
                console.log(this.wantnowdata);
                console.log(this.meaddtable.DeviceName);
                this.AID = this.aid;
                this.meaddtable.DeviceName = this.wantword;
                this.offdecive = false;
            }
        },
        handleRowChange1(row, event, column) {
            this.wantword = row.DeviceName;
            this.aid = row.AID;
            console.log(row);
        },
        lookforsearch() {
            let i = this.projectlistdata1;
            let a = 0;
            let reg = new RegExp(this.projectkeyword);
            this.projectlistdata = [];
            for (a in i) {
                if (!this.projectkeyword) {
                    if (this.oneselectid == '11111111-1111-1111-1111-111111111111' || this.oneselect == '') {
                        this.projectlistdata = i;
                    } else if (this.oneselect == i[a].DeviceType) {
                        this.projectlistdata.push(i[a]);
                    }
                } else {
                    console.log(this.oneselect);
                    console.log(a);
                    if (this.oneselectid == '11111111-1111-1111-1111-111111111111' || this.oneselect == '') {
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
        handleNodeClic7(data) {
            this.oneselect = data.label;
            this.oneselectid = data.NID;
            this.selectword3 = false;
        },
        handleNodeClic6(data) {
            this.Meter = data.label;
            this.Meterid = data.NID;
            this.changeselect = false;
        },
        no1() {
            this.tipchange = false;
            this.deltrue = true;
        },
        yes1() {
            this.tipchange = false;
            this.$axios({
                method: 'post',
                url: `/api/RepairManage/RepairManage_DeletePlan`,
                data: this.argID
            })
            .then(res => {
                console.log(res);
                this.tipword = this.lang.FormulaManage_HT_DeletedSuccessfully;
                   setTimeout(() => {
                            $('.tip').css({
                                zoom: this.zoomValue,
                                left: `calc(50% - ${($('.tip').width() / 2) *
                                    this.zoomValue}px)`,
                                top: `calc(50% - ${($('.tip').height() / 2) *
                                    this.zoomValue}px)`
                            });
                            this.$store.state.div = 'tip'
this.$store.state.divtop = 'tiphead'  
this.tipchange = true
this.$store.commit('move')
                        });
                 this.pdyd1 = true;
                this.deltrue = true;
                this. getsetime();
            });
        },
        del() {
              if(!this.jhscshow){
             setTimeout(() => {
                            $('.tip').css({
                                zoom: this.zoomValue,
                                left: `calc(50% - ${($('.tip').width() / 2) *
                                    this.zoomValue}px)`,
                                top: `calc(50% - ${($('.tip').height() / 2) *
                                    this.zoomValue}px)`
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
            if (this.argID.length !== 0) {
                this.tipword = this.lang.EquipmentAccount_SureToDelete
                  setTimeout(() => {
                            $('.tip').css({
                                zoom: this.zoomValue,
                                left: `calc(50% - ${($('.tip').width() / 2) *
                                    this.zoomValue}px)`,
                                top: `calc(50% - ${($('.tip').height() / 2) *
                                    this.zoomValue}px)`
                            });
                            this.$store.state.div = 'tip'
this.$store.state.divtop = 'tiphead'  
this.tipchange = true
this.$store.commit('move')
                        });
                 this.pdyd1 = true;
                 this.pdyd1 = true;
                this.deltrue = false;
            } else {
                this.deltrue = true;
                this.tipword = this.lang.EquipmentAccount_CheckTheDeleteItem
                  setTimeout(() => {
                            $('.tip').css({
                                zoom: this.zoomValue,
                                left: `calc(50% - ${($('.tip').width() / 2) *
                                    this.zoomValue}px)`,
                                top: `calc(50% - ${($('.tip').height() / 2) *
                                    this.zoomValue}px)`
                            });
                            this.$store.state.div = 'tip'
this.$store.state.divtop = 'tiphead'  
this.tipchange = true
this.$store.commit('move')
                        });
                 this.pdyd1 = true;
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

        tip1() {
            if(this.tipword == this.lang.SCMSConsoleWebApiMySql_TimeFormatIsIncorrect){
                   this.$axios.post(`/api/RepairManage/RepairManage_GstPlanInitTime`).then(res =>{
                console.log("sss",res)
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
                  
                    this.pdyd3 = true;
                    this.selectword3 = false;
                    this.projectkeyword = '';
                });
        },
        nopre() {
            if (this.sestion == 1) {
                  if(this.meaddtable.wxselect == this.lang.HMI_HT_LineChartWindowViewModel_Hour){
                this.meaddtable.CurrentEndTime = 
                moment(this.meaddtable.CurrentStartTime).add(Number(this.meaddtable.wxtime),"hours").format("YYYY-MM-DD HH:mm:ss")
            }else if(this.meaddtable.wxselect == this.lang.MaintenanceManage_Day){
                this.meaddtable.CurrentEndTime = 
                moment(this.meaddtable.CurrentStartTime).add(Number(this.meaddtable.wxtime),"days").format("YYYY-MM-DD HH:mm:ss")
            }else if(this.meaddtable.wxselect == this.lang.HMI_HT_LineChartWindowViewModel_Week){
                this.meaddtable.CurrentEndTime = 
                moment(this.meaddtable.CurrentStartTime).add(Number(this.meaddtable.wxtime),"weeks").format("YYYY-MM-DD HH:mm:ss")
            }else if(this.meaddtable.wxselect == this.lang.HMI_HT_LineChartWindowViewModel_Month){
                this.meaddtable.CurrentEndTime= 
                moment(this.meaddtable.CurrentStartTime).add(Number(this.meaddtable.wxtime),"months").format("YYYY-MM-DD HH:mm:ss")
            }
        
                if (this.meaddtable.PeriodUnit == this.lang.HMI_HT_LineChartWindowViewModel_Hour) {
                    this.meaddtable.PeriodUnit = 1;
                } else if (this.meaddtable.PeriodUnit == this.lang.MaintenanceManage_Day) {
                    this.meaddtable.PeriodUnit = 2;
                } else if (this.meaddtable.PeriodUnit == this.lang.HMI_HT_LineChartWindowViewModel_Week) {
                    this.meaddtable.PeriodUnit = 3;
                } else if (this.meaddtable.PeriodUnit == this.lang.HMI_HT_LineChartWindowViewModel_Month) {
                    this.meaddtable.PeriodUnit = 4;
                }
                if (this.meaddtable.ReminderTimeUnit == this.lang.HMI_HT_LineChartWindowViewModel_Hour) {
                    this.meaddtable.ReminderTimeUnit = 1;
                } else if (this.meaddtable.ReminderTimeUnit == this.lang.MaintenanceManage_Day) {
                    this.meaddtable.ReminderTimeUnit = 2;
                } else if (this.meaddtable.ReminderTimeUnit == this.lang.HMI_HT_LineChartWindowViewModel_Week) {
                    this.meaddtable.ReminderTimeUnit = 3;
                } else if (this.meaddtable.ReminderTimeUnit == this.lang.HMI_HT_LineChartWindowViewModel_Month) {
                    this.meaddtable.ReminderTimeUnit = 4;
                }
                if (this.meaddtable.IsEnabled == this.lang.MaintenanceManage_Enable) {
                    this.meaddtable.IsEnabled = true;
                } else if (this.meaddtable.IsEnabled == this.lang.MaintenanceManage_Stop) {
                    this.meaddtable.IsEnabled = false;
                }
                console.log(this.meaddtable)
                this.$axios({
                    method: 'post',
                    url: `/api/RepairManage/RepairManage_SavePlan`,
                    data: this.meaddtable
                }).then(res => {
                    console.log(res);
                        setTimeout(() => {
                            $('.tip').css({
                                zoom: this.zoomValue,
                                left: `calc(50% - ${($('.tip').width() / 2) *
                                    this.zoomValue}px)`,
                                top: `calc(50% - ${($('.tip').height() / 2) *
                                    this.zoomValue}px)`
                            });
                            this.$store.state.div = 'tip'
this.$store.state.divtop = 'tiphead'  
this.tipchange = true
this.$store.commit('move')
                        });
                     this.pdyd1 = true;
                    if (res.data.msg == '请求成功') {
                        this.tipword = this.lang.EquipmentAccount_SuccessfullyAdded
                        this.changetrue = false;
                        this. getsetime();
                    } else if (res.data.msg == 'AID格式应为GUID！') {
                        this.tipword = this.lang.RepairManage_SelectRepairEquipment
                          if (this.meaddtable.PeriodUnit == 1) {
                            this.meaddtable.PeriodUnit = this.lang.HMI_HT_LineChartWindowViewModel_Hour;
                        } else if (this.meaddtable.PeriodUnit == 2) {
                            this.meaddtable.PeriodUnit = this.lang.MaintenanceManage_Day;
                        } else if (this.meaddtable.PeriodUnit == 3) {
                            this.meaddtable.PeriodUnit = this.lang.HMI_HT_LineChartWindowViewModel_Week;
                        } else if (this.meaddtable.PeriodUnit == 4) {
                            this.meaddtable.PeriodUnit = this.lang.HMI_HT_LineChartWindowViewModel_Month;
                        }
                        if (this.meaddtable.ReminderTimeUnit == 1) {
                            this.meaddtable.ReminderTimeUnit = this.lang.HMI_HT_LineChartWindowViewModel_Hour;
                        } else if (this.meaddtable.ReminderTimeUnit == 2) {
                            this.meaddtable.ReminderTimeUnit = this.lang.MaintenanceManage_Day;
                        } else if (this.meaddtable.ReminderTimeUnit == 3) {
                            this.meaddtable.ReminderTimeUnit = this.lang.HMI_HT_LineChartWindowViewModel_Week;
                        } else if (this.meaddtable.ReminderTimeUnit == 4) {
                            this.meaddtable.ReminderTimeUnit = this.lang.HMI_HT_LineChartWindowViewModel_Month;
                        }
                        if (this.meaddtable.IsEnabled == true) {
                            this.meaddtable.IsEnabled = this.lang.MaintenanceManage_Enable;
                        } else if (this.meaddtable.IsEnabled == false) {
                            this.meaddtable.IsEnabled = this.lang.MaintenanceManage_Stop;
                        }
                    } else {
                         if (this.meaddtable.PeriodUnit == 1) {
                            this.meaddtable.PeriodUnit = this.lang.HMI_HT_LineChartWindowViewModel_Hour;
                        } else if (this.meaddtable.PeriodUnit == 2) {
                            this.meaddtable.PeriodUnit = this.lang.MaintenanceManage_Day;
                        } else if (this.meaddtable.PeriodUnit == 3) {
                            this.meaddtable.PeriodUnit = this.lang.HMI_HT_LineChartWindowViewModel_Week;
                        } else if (this.meaddtable.PeriodUnit == 4) {
                            this.meaddtable.PeriodUnit = this.lang.HMI_HT_LineChartWindowViewModel_Month;
                        }
                        if (this.meaddtable.ReminderTimeUnit == 1) {
                            this.meaddtable.ReminderTimeUnit = this.lang.HMI_HT_LineChartWindowViewModel_Hour;
                        } else if (this.meaddtable.ReminderTimeUnit == 2) {
                            this.meaddtable.ReminderTimeUnit = this.lang.MaintenanceManage_Day;
                        } else if (this.meaddtable.ReminderTimeUnit == 3) {
                            this.meaddtable.ReminderTimeUnit = this.lang.HMI_HT_LineChartWindowViewModel_Week;
                        } else if (this.meaddtable.ReminderTimeUnit == 4) {
                            this.meaddtable.ReminderTimeUnit = this.lang.HMI_HT_LineChartWindowViewModel_Month;
                        }
                        if (this.meaddtable.IsEnabled == true) {
                            this.meaddtable.IsEnabled = this.lang.MaintenanceManage_Enable;
                        } else if (this.meaddtable.IsEnabled == false) {
                            this.meaddtable.IsEnabled = this.lang.MaintenanceManage_Stop;
                        }
                        this.tipword = res.data.msg;
                    }
                });
            } else if (this.sestion == 3) {
                   if(this.meaddtable.wxselect == this.lang.HMI_HT_LineChartWindowViewModel_Hour){
                this.meaddtable.CurrentEndTime = 
                moment(this.meaddtable.CurrentStartTime).add(Number(this.meaddtable.wxtime),"hours").format("YYYY-MM-DD HH:mm:ss")
            }else if(this.meaddtable.wxselect == this.lang.MaintenanceManage_Day){
                this.meaddtable.CurrentEndTime = 
                moment(this.meaddtable.CurrentStartTime).add(Number(this.meaddtable.wxtime),"days").format("YYYY-MM-DD HH:mm:ss")
            }else if(this.meaddtable.wxselect == this.lang.HMI_HT_LineChartWindowViewModel_Week){
                this.meaddtable.CurrentEndTime = 
                moment(this.meaddtable.CurrentStartTime).add(Number(this.meaddtable.wxtime),"weeks").format("YYYY-MM-DD HH:mm:ss")
            }else if(this.meaddtable.wxselect == this.lang.HMI_HT_LineChartWindowViewModel_Month){
                this.meaddtable.CurrentEndTime= 
                moment(this.meaddtable.CurrentStartTime).add(Number(this.meaddtable.wxtime),"months").format("YYYY-MM-DD HH:mm:ss")
            }
                if (this.meaddtable.PeriodUnit == this.lang.HMI_HT_LineChartWindowViewModel_Hour) {
                    this.meaddtable.PeriodUnit = 1;
                } else if (this.meaddtable.PeriodUnit == this.lang.MaintenanceManage_Day) {
                    this.meaddtable.PeriodUnit = 2;
                } else if (this.meaddtable.PeriodUnit == this.lang.HMI_HT_LineChartWindowViewModel_Week) {
                    this.meaddtable.PeriodUnit = 3;
                } else if (this.meaddtable.PeriodUnit == this.lang.HMI_HT_LineChartWindowViewModel_Month) {
                    this.meaddtable.PeriodUnit = 4;
                }
                if (this.meaddtable.ReminderTimeUnit == this.lang.HMI_HT_LineChartWindowViewModel_Hour) {
                    this.meaddtable.ReminderTimeUnit = 1;
                } else if (this.meaddtable.ReminderTimeUnit == this.lang.MaintenanceManage_Day) {
                    this.meaddtable.ReminderTimeUnit = 2;
                } else if (this.meaddtable.ReminderTimeUnit == this.lang.HMI_HT_LineChartWindowViewModel_Week) {
                    this.meaddtable.ReminderTimeUnit = 3;
                } else if (this.meaddtable.ReminderTimeUnit == this.lang.HMI_HT_LineChartWindowViewModel_Month) {
                    this.meaddtable.ReminderTimeUnit = 4;
                }
                if (this.meaddtable.IsEnabled == this.lang.MaintenanceManage_Enable) {
                    this.meaddtable.IsEnabled = true;
                } else if (this.meaddtable.IsEnabled == this.lang.MaintenanceManage_Stop) {
                    this.meaddtable.IsEnabled = false;
                }
                this.meaddtable.Operate = 2;
                this.meaddtable.PlanContent = this.w;
                this.meaddtable.OldPlanName  = this.OldPlanName;
                console.log(this.meaddtable)
                this.$axios({
                    method: 'post',
                    url: `/api/RepairManage/RepairManage_SavePlan`,
                    data: this.meaddtable
                }).then(res => {
                    console.log(res);
                     setTimeout(() => {
                            $('.tip').css({
                                zoom: this.zoomValue,
                                left: `calc(50% - ${($('.tip').width() / 2) *
                                    this.zoomValue}px)`,
                                top: `calc(50% - ${($('.tip').height() / 2) *
                                    this.zoomValue}px)`
                            });
                            this.$store.state.div = 'tip'
this.$store.state.divtop = 'tiphead'  
this.tipchange = true
this.$store.commit('move')
                        });
                     this.pdyd1 = true;
                    if (res.data.msg == '请求成功') {
                        this.tipword = this.lang.FormulaManage_HT_FormulaSetting_ModifiedSuccessfully
                        this.changetrue = false;
                        this.getsetime();
                    } else {
                         if (this.meaddtable.PeriodUnit == 1) {
                            this.meaddtable.PeriodUnit = this.lang.HMI_HT_LineChartWindowViewModel_Hour;
                        } else if (this.meaddtable.PeriodUnit == 2) {
                            this.meaddtable.PeriodUnit = this.lang.MaintenanceManage_Day;
                        } else if (this.meaddtable.PeriodUnit == 3) {
                            this.meaddtable.PeriodUnit = this.lang.HMI_HT_LineChartWindowViewModel_Week;
                        } else if (this.meaddtable.PeriodUnit == 4) {
                            this.meaddtable.PeriodUnit = this.lang.HMI_HT_LineChartWindowViewModel_Month;
                        }
                        if (this.meaddtable.ReminderTimeUnit == 1) {
                            this.meaddtable.ReminderTimeUnit = this.lang.HMI_HT_LineChartWindowViewModel_Hour;
                        } else if (this.meaddtable.ReminderTimeUnit == 2) {
                            this.meaddtable.ReminderTimeUnit = this.lang.MaintenanceManage_Day;
                        } else if (this.meaddtable.ReminderTimeUnit == 3) {
                            this.meaddtable.ReminderTimeUnit = this.lang.HMI_HT_LineChartWindowViewModel_Week;
                        } else if (this.meaddtable.ReminderTimeUnit == 4) {
                            this.meaddtable.ReminderTimeUnit = this.lang.HMI_HT_LineChartWindowViewModel_Month;
                        }
                        if (this.meaddtable.IsEnabled == true) {
                            this.meaddtable.IsEnabled = this.lang.MaintenanceManage_Enable;
                        } else if (this.meaddtable.IsEnabled == false) {
                            this.meaddtable.IsEnabled = this.lang.MaintenanceManage_Stop;
                        }
                        this.tipword = res.data.msg;
                    }
                });
            }
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
            this.pdyd2 = false;
            let moveLeft = event.pageX - 350 + 'px';
            let moveTop = event.pageY - 30 + 'px';
            this.$refs.kongtiao1.style.left = moveLeft;
            this.$refs.kongtiao1.style.top = moveTop;
        },
        mouseMoveHandleelse2(event) {
            this.pdyd1 = false;
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
            this.changetrue = false;
               let ss = JSON.stringify(this.antable);
            this.tableData1 = JSON.parse(ss);
        },
        Preservation2() {
            this.Preservation = this.Preservation1;
            if (this.Preservation1 == this.lang.EquipmentAccount_EquipmentType) {
                this.tipword = this.lang.EquipmentAccount_SelectEquipmentType1
                 setTimeout(() => {
                            $('.tip').css({
                                zoom: this.zoomValue,
                                left: `calc(50% - ${($('.tip').width() / 2) *
                                    this.zoomValue}px)`,
                                top: `calc(50% - ${($('.tip').height() / 2) *
                                    this.zoomValue}px)`
                            });
                            this.$store.state.div = 'tip'
this.$store.state.divtop = 'tiphead'  
this.tipchange = true
this.$store.commit('move')
                        });
                 this.pdyd1 = true;
            } else if (this.Preservation5 == this.lang.EquipmentAccount_InstallPosition) {
                this.tipword = this.lang.EquipmentAccount_SelectInstallPosition
               setTimeout(() => {
                            $('.tip').css({
                                zoom: this.zoomValue,
                                left: `calc(50% - ${($('.tip').width() / 2) *
                                    this.zoomValue}px)`,
                                top: `calc(50% - ${($('.tip').height() / 2) *
                                    this.zoomValue}px)`
                            });
                            this.$store.state.div = 'tip'
this.$store.state.divtop = 'tiphead'  
this.tipchange = true
this.$store.commit('move')
                        });
                 this.pdyd1 = true;
            } else {
                this.cancel1 = false;
            }
        },
        select(a, b) {
            this.argID = [];

            let i = 0;
            for (i in a) {
                this.argID.push(a[i].ID);
            }
        },
        selectall(a, b) {
            this.argID = [];

            let i = 0;
            for (i in a) {
                this.argID.push(a[i].ID);
            }
        },
        Preservation3() {
            this.Preservation = this.Preservation1;
            if (this.pen.DeviceType == this.lang.EquipmentAccount_EquipmentType) {
                this.tipword = this.lang.EquipmentAccount_SelectEquipmentType1
                this.pen.DeviceType = this.lang.EquipmentAccount_ClickSelect;
                  setTimeout(() => {
                            $('.tip').css({
                                zoom: this.zoomValue,
                                left: `calc(50% - ${($('.tip').width() / 2) *
                                    this.zoomValue}px)`,
                                top: `calc(50% - ${($('.tip').height() / 2) *
                                    this.zoomValue}px)`
                            });
                            this.$store.state.div = 'tip'
this.$store.state.divtop = 'tiphead'  
this.tipchange = true
this.$store.commit('move')
                        });
                 this.pdyd1 = true;
            } else if (this.pen.InstallationLocation == this.lang.EquipmentAccount_InstallPosition) {
                this.tipword = this.lang.EquipmentAccount_SelectInstallPosition
                this.pen.InstallationLocation = this.lang.EquipmentAccount_ClickSelect;
                  setTimeout(() => {
                            $('.tip').css({
                                zoom: this.zoomValue,
                                left: `calc(50% - ${($('.tip').width() / 2) *
                                    this.zoomValue}px)`,
                                top: `calc(50% - ${($('.tip').height() / 2) *
                                    this.zoomValue}px)`
                            });
                            this.$store.state.div = 'tip'
this.$store.state.divtop = 'tiphead'  
this.tipchange = true
this.$store.commit('move')
                        });
                 this.pdyd1 = true;
            } else {
                this.cancel1 = false;
            }
        },
        handleEdit(a, b) {
              if(!this.jhcxshow){
           setTimeout(() => {
                            $('.tip').css({
                                zoom: this.zoomValue,
                                left: `calc(50% - ${($('.tip').width() / 2) *
                                    this.zoomValue}px)`,
                                top: `calc(50% - ${($('.tip').height() / 2) *
                                    this.zoomValue}px)`
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
            this.w = '';
            this.sestion = 2;
            console.log(b);
            
            this.meaddtable = b;
            this.w = b.PlanContent;
            this.meaddtable.PeriodValue = parseInt(this.meaddtable.PeriodValue);
            if (this.meaddtable.PeriodUnit == 1) {
                this.meaddtable.PeriodUnit = this.lang.HMI_HT_LineChartWindowViewModel_Hour;
            } else if (this.meaddtable.PeriodUnit == 2) {
                this.meaddtable.PeriodUnit = this.lang.MaintenanceManage_Day;
            } else if (this.meaddtable.PeriodUnit == 3) {
                this.meaddtable.PeriodUnit = this.lang.HMI_HT_LineChartWindowViewModel_Week;
            } else if (this.meaddtable.PeriodUnit == 4) {
                this.meaddtable.PeriodUnit = this.lang.HMI_HT_LineChartWindowViewModel_Month;
            }
            if (this.meaddtable.ReminderTimeUnit == 1) {
                this.meaddtable.ReminderTimeUnit = this.lang.HMI_HT_LineChartWindowViewModel_Hour;
            } else if (this.meaddtable.ReminderTimeUnit == 2) {
                this.meaddtable.ReminderTimeUnit = this.lang.MaintenanceManage_Day;
            } else if (this.meaddtable.ReminderTimeUnit == 3) {
                this.meaddtable.ReminderTimeUnit = this.lang.HMI_HT_LineChartWindowViewModel_Week;
            } else if (this.meaddtable.ReminderTimeUnit == 4) {
                this.meaddtable.ReminderTimeUnit = this.lang.HMI_HT_LineChartWindowViewModel_Month;
            }
              var startime = moment(this.meaddtable.CurrentStartTime)
            var endtime = moment(this.meaddtable.CurrentEndTime)
            var jsvalue = endtime.diff(startime,'hours')
            var ss = this.meaddtable.CurrentStartTime.slice(8)
            var ee = this.meaddtable.CurrentEndTime.slice(8)
            var cc = ss == ee
            console.log('jsvalue==>',jsvalue)
           if(cc){
                jsvalue = endtime.diff(startime,'months')
                this.meaddtable.wxtime = jsvalue
                this.meaddtable.wxselect = this.lang.HMI_HT_LineChartWindowViewModel_Month
           }else{
               if(jsvalue % 168 == 0){
                   this.meaddtable.wxtime = jsvalue / 168
                   this.meaddtable.wxselect = this.lang.HMI_HT_LineChartWindowViewModel_Week
               }else if(jsvalue % 24 == 0){
                   this.meaddtable.wxtime = jsvalue / 24
                   this.meaddtable.wxselect = this.lang.MaintenanceManage_Day
               }else{
                   this.meaddtable.wxtime = jsvalue
                   this.meaddtable.wxselect = this.lang.HMI_HT_LineChartWindowViewModel_Hour
               }
           }
           setTimeout(() => {
                            $('.sestion1').css({
                                zoom: this.zoom,
                                left: `calc(50% - ${($('.sestion1').width() / 2) *
                                    this.zoom}px)`,
                                top: `calc(50% - ${($('.sestion1').height() / 2) *
                                    this.zoom}px)`
                            });
                            this.$store.state.div = 'sestion1'
this.$store.state.divtop = 'sestionheader1'  
    this.changetrue = true;
this.$store.commit('move')
                        });
        
            this.pdyd2 = true;
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
                                zoom: this.zoomValue,
                                left: `calc(50% - ${($('.tip').width() / 2) *
                                    this.zoomValue}px)`,
                                top: `calc(50% - ${($('.tip').height() / 2) *
                                    this.zoomValue}px)`
                            });
                            this.$store.state.div = 'tip'
this.$store.state.divtop = 'tiphead'  
this.tipchange = true
this.$store.commit('move')
                        });
                 this.pdyd1 = true;
                this.tipword = this.lang.RoleManage_HT_PEAPositiveInteger;
              setTimeout(() => {
                            $('.tip').css({
                                zoom: this.zoomValue,
                                left: `calc(50% - ${($('.tip').width() / 2) *
                                    this.zoomValue}px)`,
                                top: `calc(50% - ${($('.tip').height() / 2) *
                                    this.zoomValue}px)`
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
                                zoom: this.zoomValue,
                                left: `calc(50% - ${($('.tip').width() / 2) *
                                    this.zoomValue}px)`,
                                top: `calc(50% - ${($('.tip').height() / 2) *
                                    this.zoomValue}px)`
                            });
                            this.$store.state.div = 'tip'
this.$store.state.divtop = 'tiphead'  
this.tipchange = true
this.$store.commit('move')
                        });
                         this.pdyd1 = true;
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
        handleEdit1(a, b) {
              if(!this.jhbjshow){
           setTimeout(() => {
                            $('.tip').css({
                                zoom: this.zoomValue,
                                left: `calc(50% - ${($('.tip').width() / 2) *
                                    this.zoomValue}px)`,
                                top: `calc(50% - ${($('.tip').height() / 2) *
                                    this.zoomValue}px)`
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
            this.sestion = 3;
              this.w = '';
            console.log(b);
            let aaa = JSON.stringify(b.PlanName);
            this.OldPlanName = JSON.parse(aaa);
            this.meaddtable = b;
              this.w = b.PlanContent;
            this.meaddtable.PeriodValue = parseInt(this.meaddtable.PeriodValue);
            if (this.meaddtable.PeriodUnit == 1) {
                this.meaddtable.PeriodUnit = this.lang.HMI_HT_LineChartWindowViewModel_Hour;
            } else if (this.meaddtable.PeriodUnit == 2) {
                this.meaddtable.PeriodUnit = this.lang.MaintenanceManage_Day;
            } else if (this.meaddtable.PeriodUnit == 3) {
                this.meaddtable.PeriodUnit = this.lang.HMI_HT_LineChartWindowViewModel_Week;
            } else if (this.meaddtable.PeriodUnit == 4) {
                this.meaddtable.PeriodUnit = this.lang.HMI_HT_LineChartWindowViewModel_Month;
            }
            if (this.meaddtable.ReminderTimeUnit == 1) {
                this.meaddtable.ReminderTimeUnit = this.lang.HMI_HT_LineChartWindowViewModel_Hour;
            } else if (this.meaddtable.ReminderTimeUnit == 2) {
                this.meaddtable.ReminderTimeUnit = this.lang.MaintenanceManage_Day;
            } else if (this.meaddtable.ReminderTimeUnit == 3) {
                this.meaddtable.ReminderTimeUnit = this.lang.HMI_HT_LineChartWindowViewModel_Week;
            } else if (this.meaddtable.ReminderTimeUnit == 4) {
                this.meaddtable.ReminderTimeUnit = this.lang.HMI_HT_LineChartWindowViewModel_Month;
            }
                    var startime = moment(this.meaddtable.CurrentStartTime)
            var endtime = moment(this.meaddtable.CurrentEndTime)
            var jsvalue = endtime.diff(startime,'hours')
            var ss = this.meaddtable.CurrentStartTime.slice(8)
            var ee = this.meaddtable.CurrentEndTime.slice(8)
            var cc = ss == ee
            console.log('jsvalue==>',jsvalue)
           if(cc){
                jsvalue = endtime.diff(startime,'months')
                this.meaddtable.wxtime = jsvalue
                this.meaddtable.wxselect = this.lang.HMI_HT_LineChartWindowViewModel_Month
           }else{
               if(jsvalue % 168 == 0){
                   this.meaddtable.wxtime = jsvalue / 168
                   this.meaddtable.wxselect = this.lang.HMI_HT_LineChartWindowViewModel_Week
               }else if(jsvalue % 24 == 0){
                   this.meaddtable.wxtime = jsvalue / 24
                   this.meaddtable.wxselect = this.lang.MaintenanceManage_Day
               }else{
                   this.meaddtable.wxtime = jsvalue
                   this.meaddtable.wxselect = this.lang.HMI_HT_LineChartWindowViewModel_Hour
               }
           }
            this.meaddtable.PID = b.ID;
             setTimeout(() => {
                            $('.sestion1').css({
                                zoom: this.zoom,
                                left: `calc(50% - ${($('.sestion1').width() / 2) *
                                    this.zoom}px)`,
                                top: `calc(50% - ${($('.sestion1').height() / 2) *
                                    this.zoom}px)`
                            });
                            this.$store.state.div = 'sestion1'
this.$store.state.divtop = 'sestionheader1'  
    this.changetrue = true;
this.$store.commit('move')
                        });
             this.pdyd2 = true;
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
              if(!this.jhtjshow){
          setTimeout(() => {
                            $('.tip').css({
                                zoom: this.zoomValue,
                                left: `calc(50% - ${($('.tip').width() / 2) *
                                    this.zoomValue}px)`,
                                top: `calc(50% - ${($('.tip').height() / 2) *
                                    this.zoomValue}px)`
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
            this.meaddtable = {
                Operate: '1',
                PID: '',
                OldPlanName: '',
                PlanName: '',
                AID: '',
                PeriodValue: '2',
                PeriodUnit: this.lang.HMI_HT_LineChartWindowViewModel_Hour,
                PeriodTotalMinute: '',
                MaturityTime: '',
                ReminderTimeValue: '1',
                ReminderTimeUnit: this.lang.HMI_HT_LineChartWindowViewModel_Hour,
                wxtime:1,
                wxselect:this.lang.HMI_HT_LineChartWindowViewModel_Hour,
                ReminderTimeTotalMinute: '',
                IsEnabled: this.lang.MaintenanceManage_Enable,
                RepairPerson: 'SuperAdmin',
                PlanContent: '',
                CurrentStartTime: '',
                CurrentEndTime: '',
                DeviceName: this.lang.EquipmentAccount_ClickSelect
            };
            this.meaddtable.CurrentStartTime = this.gettimenowtime();
             this.meaddtable.CurrentStartTime = 
                moment(this.meaddtable.CurrentStartTime).add(Number(1),"hours").format("YYYY-MM-DD HH:mm:ss")
            this.meaddtable.MaturityTime =  moment(this.meaddtable.CurrentStartTime).add(Number(1),"weeks").format("YYYY-MM-DD HH:mm:ss")
             setTimeout(() => {
                            $('.sestion1').css({
                                zoom: this.zoom,
                                left: `calc(50% - ${($('.sestion1').width() / 2) *
                                    this.zoom}px)`,
                                top: `calc(50% - ${($('.sestion1').height() / 2) *
                                    this.zoom}px)`
                            });
                            this.$store.state.div = 'sestion1'
this.$store.state.divtop = 'sestionheader1'  
    this.changetrue = true;
this.$store.commit('move')
                        });
             this.pdyd2 = true;
            this.sestion = 1;
        },
        selectword1() {
            let i = 0;
            let j = 1;
            for (i in this.selectname) {
            if(this.a1 == 1){
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

        onetable() {
             let c =this.Meter;
            if(this.Meterid == '11111111-1111-1111-1111-111111111111'){
                c = ''
            }else{
                c=this.Meter
            }
            this.$axios
                .post(
                    `/api/RepairManage/RepairManage_GstPlan?argDeviceType=${c}&argStartTime=${this.value1}&argEndTime=${this.value2}&argKeyword=${this.keyword}&argPageSize=${this.PageData.PageSize}&argPageIndex=${this.PageData.PageIndex}`
                )
                .then(res => {
                    console.log( `/api/RepairManage/RepairManage_GstPlan?argDeviceType=${c}&argStartTime=${this.value1}&argEndTime=${this.value2}&argKeyword=${this.keyword}}&argPageSize=${this.PageData.PageSize}&argPageIndex=${this.PageData.PageIndex}`)
                    console.log("ada",res)
                      if (res.data.code == 0) {
                         this.tableData1 = res.data.data.DataList;
                        this.PageData = res.data.data.ParameterList;
                    let i = 0;
                    for (i in this.tableData1) {
                        this.tableData1[i].CurrentStartTime = this.gettime(
                            this.tableData1[i].CurrentStartTime
                        );
                        this.tableData1[i].CurrentEndTime = this.gettime(
                            this.tableData1[i].CurrentEndTime
                        );
                        this.tableData1[i].NextStartTime = this.gettime(
                            this.tableData1[i].NextStartTime
                        );
                        this.tableData1[i].NextEndTime = this.gettime(
                            this.tableData1[i].NextEndTime
                        );
                        this.tableData1[i].MaturityTime = this.gettime(
                            this.tableData1[i].MaturityTime
                        );
                        if (this.tableData1[i].IsEnabled == true) {
                            this.tableData1[i].IsEnabled = this.lang.MaintenanceManage_Enable;
                        } else if (this.tableData1[i].IsEnabled == false) {
                            this.tableData1[i].IsEnabled = this.lang.MaintenanceManage_Stop;
                        }
                        if (this.tableData1[i].PeriodUnit == 1) {
                            this.tableData1[i].PeriodValue =
                                this.tableData1[i].PeriodValue + this.lang.HMI_HT_LineChartWindowViewModel_Hour;
                        } else if (this.tableData1[i].PeriodUnit == 2) {
                            this.tableData1[i].PeriodValue =
                                this.tableData1[i].PeriodValue + this.lang.MaintenanceManage_Day;
                        } else if (this.tableData1[i].PeriodUnit == 3) {
                            this.tableData1[i].PeriodValue =
                                this.tableData1[i].PeriodValue + this.lang.HMI_HT_LineChartWindowViewModel_Week;
                        } else if (this.tableData1[i].PeriodUnit == 4) {
                            this.tableData1[i].PeriodValue =
                                this.tableData1[i].PeriodValue + this.lang.HMI_HT_LineChartWindowViewModel_Month;
                        }
                    }
                  
                    
                      }else{
                          setTimeout(() => {
                            $('.tip').css({
                                zoom: this.zoomValue,
                                left: `calc(50% - ${($('.tip').width() / 2) *
                                    this.zoomValue}px)`,
                                top: `calc(50% - ${($('.tip').height() / 2) *
                                    this.zoomValue}px)`
                            });
                            this.$store.state.div = 'tip'
this.$store.state.divtop = 'tiphead'  
this.tipchange = true
this.$store.commit('move')
                        });
                           this.pdyd1 = true;
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
                        let avc = JSON.stringify(this.tableData1);
                     this.antable = JSON.parse(avc);
                        this.nowpage = this.PageData.PageIndex;
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
              if(!this.jhcxshow&&a!==1){
           setTimeout(() => {
                            $('.tip').css({
                                zoom: this.zoomValue,
                                left: `calc(50% - ${($('.tip').width() / 2) *
                                    this.zoomValue}px)`,
                                top: `calc(50% - ${($('.tip').height() / 2) *
                                    this.zoomValue}px)`
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
                                zoom: this.zoomValue,
                                left: `calc(50% - ${($('.tip').width() / 2) *
                                    this.zoomValue}px)`,
                                top: `calc(50% - ${($('.tip').height() / 2) *
                                    this.zoomValue}px)`
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
         getsetime(){
            this.$axios.post(`/api/RepairManage/RepairManage_GstPlanInitTime`).then(res =>{
                console.log("sss",res)
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
          this.$axios
            .post(`/api/UserManage/UserManage_GstUserWithNoPage`)
            .then(res => {
                console.log('ss', res);
                this.supermin = res.data.data;
                this.person = res.data.data;
            });
        this.getsetime();
        console.log(this.tableData);
        let that = this;
         $('body')[0].addEventListener("mousemove",function(){
            setTimeout(()=>{
for(let i=0;i<$('.atooltip').length;i++){
                $('.atooltip')[i].style.zoom = that.zoomValue
            }
            })
     })
    }
};
</script>

<style lang='scss' scoped>
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
.sestion {
    width: 750px;
    height: 750px;
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
        margin-right: 20px;
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
        top: 30px;
        left: 20px;
    }
    .zl {
        float: left;
        width: 49%;
    }
    .zr {
        width: 49%;
        float: right;
    }
}
.margin-textarea {
    display: flex;
    overflow: hidden;
    width: 100%;
    padding-top: 10px;
    >textarea{
        width: calc(100% - 126px);
    }
}
.margin {
    margin-top: 10px;
    height: 40px;
    display: flex;
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
    margin-top: 10px;
    line-height: 34px;
}
.Preservation1 {
    margin-right: 33px;
    margin-top: 30px;
}
.cancel {
    cursor: pointer;
    width: 100px;
    height: 34px;
    margin-top: 10px;
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
    position: fixed;
    top: 172px;
    left: 312px;
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
.cover3 {
    width: 100%;
    height: 100%;
    z-index: 19999999;
    position: fixed;
    top: 0;
    left: 0;
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
    left: 95px;
}
.sp6 {
    // position: relative;
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
    .sp1 {
        margin-left: 10px;
    }
    justify-content: space-between;
    background-color: #ddd;
    width: 100%;
    font-size: 16px;
    color: #7f6f79;

    line-height: 60px;
    padding: 0px 18px 0px 18px;
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
    bottom: -10px;
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
        margin-right: 20px;
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
        top: 30px;
    }
    .fl {
        float: left;
        width: 50%;
    }
    .zr {
        width: 49%;
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
    // margin-top: 20px;
    position: relative;
    line-height: 34px;
    top: -8px;
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
    position: relative;
    top: -8px;
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
.sblx{
    display: inline-block
}
.selectword {
    position: absolute;
    top: 172px;
    left: 312px;
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
    height: 530px !important;
    // top: 260px;
    // z-index: 26999999 !important;
    z-index:26 !important;
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
        bottom: 10px;
    }
    .cancel {
        cursor: pointer;
        width: 100px;
        height: 34px;
        margin-top: 40px;
        margin-right: 170px;
        background-color: #999999;
        float: right;
        color: #ffffff;
        border-radius: 3px;
        text-align: center;
        line-height: 34px;
    }
    .table {
        width: 950px;
        margin-left: 23px;
        height: 320px;
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
img {
    cursor: pointer;
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
.fcolor{
    color: #000!important;
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
.overflow10 span{
    display: inline-block;
    width: 100px;
    text-align: right;
}
.overflow10{
    margin: 0 0 10px 0 !important;
}
.overflow1{
    margin: 0 !important;
    position: relative;
    top: -10px;
    textarea{
         position: relative;
         left: 140px;
    }
}
.is2{
    position: absolute;
    top: 210px;
    left: 392px;

}
.is3{
    position: absolute;
    top: 159px;
    left: 392px;
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
.cancel5{
   position: absolute !important;
       width: 100px !important;
    height: 36px !important;
    text-align: center;
    line-height: 36px !important;
    border-radius: 4px !important;
    cursor: pointer;
    font-size: 14px;
    right: 30px !important;
    bottom: 10px !important;
    top: auto !important;
}
.lookhead{
    img{
        top:0 !important;
        bottom:0 !important;
        margin:auto;
    }
}
</style>

