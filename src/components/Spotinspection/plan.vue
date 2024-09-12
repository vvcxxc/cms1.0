
<!--
 * @Description: 点巡检管理点巡检计划界面
 * @Date: 2019-11-25 19:07:09
 * @Author: 随风
 * @LastEditors: Tao
 * @LastEditTime: 2020-12-21 11:26:04
 -->
<template>
    <div class="public-table ysj search-containersb" @click="changeselect = false">
          			<div class="loadcover" element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(0, 0, 0, 0.4)"  v-loading="this.$store.state.isShow" v-show="this.$store.state.isShow" style="position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;"></div>
        <div class="search-container"
            :style="{
          zoom
        }">
            <!-- <span class="title sblx" >{{lang.EquipmentAccount_EquipmentType1}}</span>
             <div class="seleword seleword3" @click.stop="selectword1" >
             <div class="seleword1">
                  {{Meter}}
               <img :src="xiala" alt />
             </div>
            </div>
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
            </div> -->

            <span class="sp4 tinput title" >{{lang.MaintenanceManage_ThisTimeStartTime1}}</span>

            <el-date-picker
                v-model="value1"
                type="datetime"
                :placeholder="lang.SCMSConsoleWebApiMySql_PleChooseDate"
                value-format="yyyy-MM-dd HH:mm:ss"
                @focus='sx'
            ></el-date-picker>
            <span class="demonstration title">-</span>
            <el-date-picker
                v-model="value2"
                type="datetime"
                :placeholder="lang.SCMSConsoleWebApiMySql_PleChooseDate"
                value-format="yyyy-MM-dd HH:mm:ss"
                 @focus='sx'
            ></el-date-picker>
            <input type="text" :placeholder="lang.AlarmRecord_Time_Keyword" v-model="keyword" />
            <div class="sad" @click="sad" >{{lang.RoleManage_Query}}</div>
            <div class="addBtn" @click="addPopFun" >{{lang.RoleManage_Add}}</div>
            <div class="deleteBtn" @click="deldata1" >{{lang.RoleManage_Delete}}</div>
        </div>
        <div class="table-container table-container1">
            <el-table
                ref="multipleTable"
        
                :data="tableData1"
                stripe
                height="100%"
                tooltip-effect="dark"
                :style="{width: 1700*zoom+'px', fontSize: 14*zoom+'px'}"
                @select="select3"
                @select-all="select2"
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
                <el-table-column type="selection" :width="60*zoom" :show-overflow-tooltip="true" fixed></el-table-column>
                <el-table-column :label="lang.RoleManage_NO" :width="100*zoom" prop="Number"  :show-overflow-tooltip="true" fixed>
                    <template slot-scope="scope">{{ scope.row.Number }}</template>
                </el-table-column>
                <el-table-column prop="name" :label="lang.RoleManage_Operation" :width="200*zoom"  fixed>
                    <template slot-scope="scope">
                        <!-- <i class="el-icon-share"></i> -->
                        <div class="img" @click="handleEdit(scope.$index, scope.row)" :style="{width:60*zoom+'px',height: 30*zoom+'px',lineHeight: 30*zoom+'px',marginLeft: 10*zoom+'px'}">
                            <img :src="look" alt :style="{width: 24*zoom+'px',height: 24*zoom+'px'}"/>
                            {{scope.row.phone}}
                        </div>
                        <div class="img" @click="handleEdit2(scope.$index, scope.row)" :style="{width:60*zoom+'px',height: 30*zoom+'px',lineHeight: 30*zoom+'px',marginLeft: 10*zoom+'px'}">
                            <img :src="pensoil" alt :style="{width: 24*zoom+'px',height: 24*zoom+'px'}"/>
                            {{scope.row.phone}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="Name" :label="lang.MaintenanceManage_PlanName" :width="200*zoom" :show-overflow-tooltip="true" fixed></el-table-column>
                <el-table-column prop="PeriodStr" :label="lang.MaintenanceManage_RepeatTaskCycle" :width="200*zoom" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="CurrentStartTime" :label="lang.MaintenanceManage_ThisTimeStartTime" :width="300*zoom" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="CurrentEndTime" :label="lang.MaintenanceManage_ThisTimeEndTime" :width="300*zoom" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="IsEnabled" :label="lang.MaintenanceManage_PlanExecutionStatus"  :width="200*zoom" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="NextStartTime" :label="lang.MaintenanceManage_NextTimeStartTime" :width="300*zoom" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="NextEndTime" :label="lang.MaintenanceManage_NextTimeEndTime" :width="300*zoom" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="DevicesStr" :label="lang.EquipmentAccount_EquipmentName" :width="200*zoom" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="Executor" :label="lang.PointInspectionManage_Executor" :width="200*zoom" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="Remarks" :label="lang.MaintenanceManage_TaskExecutionContent" :width="200*zoom" :show-overflow-tooltip="true"></el-table-column>
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
        <div class="tip" ref="kongtiao2" v-show="tipchange" :style="{zoom}">
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
        <!-- <div class="cover1" v-if="setionchange"></div> -->
        <div class="cover3" v-if="cancel1" :style="{zoom}"></div>
        <div class="cover2" v-if="tipchange" :style="{zoom}"></div>
        <div v-show="addShow" class="addPop" ref="kongtiao5"  :style="{height:760*1+'px',width: 1000*1+'px',zoom}">
            <div   
                
                class="looktop"
            
              
            ></div>
            <span @click.stop="addPopcancel" class="i-c el-icon-close" :class="{a:$store.state.color=='grey'}" :style="{}"></span>
            <div class="head"    :class="{colordiv:$store.state.color=='grey'}" :style="{}">
                <span class="text" v-if="sestion == 3"    :class="{fcolor:$store.state.color=='grey'}">{{lang.PointInspectionManage_AddInspectionPlan}}</span>
                <span class="text" v-if="sestion == 1"    :class="{fcolor:$store.state.color=='grey'}">{{lang.PointInspectionManage_ViewInspectionPlan}}</span>
                <span class="text" v-if="sestion == 2"    :class="{fcolor:$store.state.color=='grey'}">{{lang.PointInspectionManage_EditInspectionPlan}}</span>
            </div>
            <div class="addPop_table" :style="{height:346+'px'}">
                <div class="table_name table_name1" :style="{marginTop: 35+'px',height: 35+'px'}">
                    <div class="form-block" >
                        <span class="name_text" :style="{fontSize: 16+'px',marginRight: 15+'px',width: 100+'px'}">{{lang.MaintenanceManage_PlanName}}</span>
                        <input class="name_ipt" v-model="planName" type="text" v-if="sestion == 3" :style="{width: 280*1+'px', height: 32*1+'px', lineHeight: 32*1+'px', fontSize: 16*1+'px'}" />
                        <input
                            class="name_ipt"
                            v-model="sesstion.Name"
                            type="text"
                            v-if="sestion == 1"
                            disabled
                            :style="{width: 280*1+'px', height: 32*1+'px', lineHeight: 32*1+'px', fontSize: 16*1+'px'}"
                        />
                        <input class="name_ipt" v-model="sesstion.Name" type="text" v-if="sestion == 2" :style="{width: 280*1+'px', height: 32*1+'px', lineHeight: 32*1+'px', fontSize: 16*1+'px'}" />
                    </div>
                    <div class="form-block" >
                        <span class="porper_text" :style="{fontSize: 16*1+'px',marginRight: 15*1+'px',width: 115*1+'px'}">{{lang.PointInspectionManage_Inspector}}</span>

                        <el-select
                            class="porper_ipt"
                            v-model="userValue"
                            @focus="sx"
                            :placeholder="lang.SCMSConsoleWebApiMySql_PleChoose"
                            v-if="sestion == 3"
                            :style="{width: 280+'px', height: 32+'px',}"
                        >
                            <el-option
                                v-for="item in useroptions"
                                :key="item.value"
                                :label="item.value"
                                :value="item.value"
                            ></el-option>
                        </el-select>
                        <el-select
                            class="porper_ipt"
                            v-model="userValue"
                             @focus="sx"
                            :placeholder="lang.SCMSConsoleWebApiMySql_PleChoose"
                            v-if="sestion == 1"
                            disabled
                             :style="{width: 280+'px', height: 32+'px',}"
                        >
                            <el-option
                                v-for="item in useroptions"
                                :key="item.value"
                                :label="item.value"
                                :value="item.value"
                            ></el-option>
                        </el-select>
                        <el-select
                            class="porper_ipt"
                             @focus="sx"
                            v-model="sesstion.Executor"
                            :placeholder="lang.SCMSConsoleWebApiMySql_PleChoose"
                            v-if="sestion == 2"
                           :style="{width: 280+'px', height: 32+'px',  }"
                        >
                            <el-option
                                v-for="item in useroptions"
                                :key="item.value"
                                :label="item.value"
                                :value="item.value"
                            ></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="table_name" :style="{marginTop: 15*1+'px',height: 35*1+'px'}">
                    <div class="form-block" >
                        <span class="name_text" :style="{fontSize: 16*1+'px',marginRight: 15*1+'px',width:100*1+'px'}">{{lang.RepairManage_TaskStartTime}}</span>
                        <el-date-picker
                            @change="starFun"
                            v-model="startime"
                            type="datetime"
                            v-if="sestion == 3"
                            :placeholder="lang.SCMSConsoleWebApiMySql_PleChooseDate"
                      :style="{width:'280px'}"
                        ></el-date-picker>
                        <el-date-picker
                            @change="starFun"
                            v-model="sesstion.CurrentStartTime"
                            type="datetime"
                            v-if="sestion == 1"
                            disabled
                            :placeholder="lang.SCMSConsoleWebApiMySql_PleChooseDate"
                    :style="{width:'280px'}"
                        ></el-date-picker>
                        <el-date-picker
                            @change="starFun"
                            v-model="sesstion.CurrentStartTime"
                            type="datetime"
                            v-if="sestion == 2"
                            :placeholder="lang.SCMSConsoleWebApiMySql_PleChooseDate"
                           :style="{width:'280px'}"
                        ></el-date-picker>
                    </div>
                    <div class="form-block" >
                    <span class="time_text" :style="{fontSize: 16*1+'px',marginRight: 15*1+'px',width:115*1+'px'}">{{lang.MaintenanceManage_TaskExecutionDuration}}</span>
                    
                            <div class="is1" :style="{width: 300*1+'px'}">
                                <input type="text" @input="endValue()" v-if="sestion == 1" v-model="sesstion.rwtime" disabled :style="{width: 180*1+'px', height: 32*1+'px', lineHeight: 32*1+'px', fontSize:16*1+'px'}"/>
                                <input type="text" @input="endValue()" v-if="sestion == 2" v-model="sesstion.rwtime" :style="{width: 180*1+'px', height: 32*1+'px', lineHeight: 32*1+'px', fontSize:16*1+'px'}"/>
                                <input type="text" @input="endValue()" v-if="sestion == 3" v-model="rwtime" :style="{width: 180*1+'px', height: 32*1+'px', lineHeight: 32*1+'px', fontSize:16*1+'px'}" />
                                  <el-select
                                   @focus="sx"
                            class="sl1"
                            :style="{width: 100+'px',height: 32+'px'}"
                            v-model="sesstion.rwselect"
                            :placeholder="lang.SCMSConsoleWebApiMySql_PleChoose"
                            v-if="sestion == 1"
                    disabled
                        >
                            <el-option
                            
                                v-for="item in TimeOptions1"
                                :key="item.value"
                              :label="item.label"
                                :value="item.value"
                            ></el-option>
                        </el-select>
                             <el-select
                            class="sl1"
                        @focus="sx"
                          :style="{width: 100+'px',height: 32+'px'}"
                            v-model="sesstion.rwselect"
                            :placeholder="lang.SCMSConsoleWebApiMySql_PleChoose"
                            v-if="sestion == 2"
                            @change="changerwselect"
                        
                        >
                            <el-option
                              
                                v-for="item in TimeOptions1"
                                :key="item.value"
                               :label="item.label"
                                :value="item.value"
                            ></el-option>
                        </el-select>
                             <el-select
                            class="sl1"
                           @focus="sx"
                            v-model="rwselect"
                           :style="{width: 100+'px',height: 32+'px'}"
                            :placeholder="lang.SCMSConsoleWebApiMySql_PleChoose"
                            v-if="sestion == 3"
                    
                        >
                            <el-option
                                v-for="item in TimeOptions1"
                                :key="item.value"
                               :label="item.label"
                                :value="item.value"
                            ></el-option>
                        </el-select>
                                <!-- <select name id @change="endValue()" v-model="sesstion.endTimeUnit" v-if="sestion == 1">
                                    <option v-for="(item,index) in sametimearr" :key="index" :value="item">{{item}}</option>
                                </select>
                                <select name id @change="endValue()" v-model="sesstion.endTimeUnit" v-if="sestion == 2" disabled>
                                    <option v-for="(item,index) in sametimearr" :key="index" :value="item">{{item}}</option>
                                </select>
                                <select name id @change="endValue()" v-model="sesstion.endTimeUnit" v-if="sestion == 3">
                                    <option v-for="(item,index) in sametimearr" :key="index" :value="item">{{item}}</option>
                                </select> -->
                            </div>
                            </div>
                    <!-- <el-date-picker
                        @change="endFun"
                        v-model="endtime"
                        type="datetime"
                        v-if="sestion == 3"
                        placeholder="选择日期时间"
                    ></el-date-picker>
                    <el-date-picker
                        @change="endFun"
                        v-model="sesstion.CurrentEndTime"
                        type="datetime"
                        v-if="sestion == 1"
                        disabled
                        placeholder="选择日期时间"
                    ></el-date-picker>
                    <el-date-picker
                        @change="endFun"
                        v-model="sesstion.CurrentEndTime"
                        type="datetime"
                        v-if="sestion == 2"
                        placeholder="选择日期时间"
                    ></el-date-picker> -->
                </div>
                   <el-tooltip   popper-class="atooltip" effect="dark" :content="lang.MaintenanceManage_TaskStartTimeToolTip" placement="bottom" >
                                <div class="showtext1" :style="{top:150*1+'px',left:475*1+'px',height:16*1+'px',width:16*1+'px'}">
                                  <i class="el-icon-question" :style="{}"></i>
                                </div>
                            </el-tooltip>
                <div class="table_inspection" :style="{marginTop: 15*1+'px',height: 35*1+'px'}">
                    <div class="inspection_left">
                        <span class="name_text" :style="{fontSize: 16*1+'px',marginRight: 15*1+'px',width:100*1+'px'}">{{lang.MaintenanceManage_RepeatTaskCycle}}</span>
                        <input
                            class="name_ipt"
                            v-model="inspecionNum"
                            type="number"
                            v-if="sestion == 3"
                            @blur="inspecionNum = inspecionNum === '' ? 1 :inspecionNum"
                            :style="{width: 180*1+'px',height: 32*1+'px', lineHeight: 32*1+'px',fontSize: 16*1+'px'}"
                        />
                        <input
                            class="name_ipt"
                            v-model="sesstion.a"
                            type="number"
                            v-if="sestion == 1"
                            disabled
                            @blur="sesstion.a = sesstion.a === '' ? 0 :sesstion.a"
                            :style="{width: 180*1+'px',height: 32*1+'px', lineHeight: 32*1+'px',fontSize: 16*1+'px'}"
                        />
                        <input
                            class="name_ipt"
                            v-model="sesstion.a"
                            type="number"
                            @blur="blurData($event, 'a')"
                            v-if="sestion == 2"
                            :style="{width: 180*1+'px',height: 32*1+'px', lineHeight: 32*1+'px',fontSize: 16*1+'px'}"
                        />
                        <el-select
                         @focus="sx"
                            class="porper_ipt"
                            @change="timeValueFun"
                            v-model="timeValue"
                            :placeholder="lang.SCMSConsoleWebApiMySql_PleChoose"
                            v-if="sestion == 3"
                           :style="{width: 100+'px',height: 32+'px'}"
                        >
                            <el-option
                                @change="timeValueFun"
                                v-for="item in TimeOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                            ></el-option>
                        </el-select>
                        <el-select
                         @focus="sx"
                            class="porper_ipt"
                            @change="timeValueFun"
                            v-model="sesstion.PeriodUnit"
                            :placeholder="lang.SCMSConsoleWebApiMySql_PleChoose"
                            v-if="sestion == 1"
                            disabled
                           :style="{width: 100+'px',height: 32+'px'}"
                        >
                            <el-option
                                @change="timeValueFun"
                                v-for="item in TimeOptions"
                                :key="item.value"
                                :label="sesstion.PeriodUnit"
                                :value="sesstion.PeriodUnit"
                            ></el-option>
                        </el-select>
                        <el-select
                         @focus="sx"
                            class="porper_ipt"
                            @change="timeValueFun"
                            v-model="sesstion.PeriodUnit"
                            :placeholder="lang.SCMSConsoleWebApiMySql_PleChoose"
                            v-if="sestion == 2"
                         :style="{width: 100+'px',height: 32+'px'}"
                        >
                            <el-option
                                @change="timeValueFun"
                                v-for="item in TimeOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                            ></el-option>
                        </el-select>
                    </div>

                    <div class="inspection_right">
                        <span class="time_text" :style="{fontSize: 16*1+'px',marginRight: 15*1+'px',width:115*1+'px'}">{{lang.MaintenanceManage_PlanEndTime}}</span>
                        <el-date-picker
                            @change="expireFun"
                            v-if="sestion == 3"
                            v-model="Expiretime"
                            type="datetime"
                            :placeholder="lang.SCMSConsoleWebApiMySql_PleChooseDate"
                           :style="{width:'280px'}"
                        ></el-date-picker>
                        <el-date-picker
                            @change="expireFun"
                            v-if="sestion == 1"
                            v-model="sesstion.MaturityTime"
                            type="datetime"
                            disabled
                            :placeholder="lang.SCMSConsoleWebApiMySql_PleChooseDate"
                            :style="{width:'280px'}"
                        ></el-date-picker>
                        <el-date-picker
                            @change="expireFun"
                            v-if="sestion == 2"
                            v-model="sesstion.MaturityTime"
                            type="datetime"
                            :placeholder="lang.SCMSConsoleWebApiMySql_PleChooseDate"
                            :style="{width:'280px'}"
                        ></el-date-picker>
                    </div>
                </div>
                <el-tooltip   popper-class="atooltip" effect="dark" :content="lang.MaintenanceManage_RepeatTaskCycleToolTip" placement="bottom">
                                <div class="showtext" :style="{top: 200*1+'px',left:475*1+'px'}">
                                  <i class="el-icon-question" ></i>
                                </div>
                            </el-tooltip>
                <div class="table_inspection" :style="{marginTop: 15*1+'px',height: 35*1+'px'}">
                    <div class="inspection_left">
                        <span class="name_text" :style="{fontSize: 16*1+'px',marginRight: 15*1+'px',width:100*1+'px'}">{{lang.MaintenanceManage_TaskAdvanceReminder}}</span>
                        <input
                            class="name_ipt"
                            v-model="inspectionNum2"
                            type="number"
                            v-if="sestion == 3"
                            @blur="inspectionNum2 = inspectionNum2=== '' ? 1 : inspectionNum2"
                            :style="{width: 180*1+'px',height: 32*1+'px', lineHeight: 32*1+'px',fontSize: 16*1+'px'}"
                        />
                        <input
                            class="name_ipt"
                            v-model="sesstion.b"
                            type="number"
                            disabled
                            v-if="sestion == 1"
                            @blur="sesstion.b = sesstion.b=== '' ? 0 : sesstion.b"
                            :style="{width: 180*1+'px',height: 32*1+'px', lineHeight: 32*1+'px',fontSize: 16*1+'px'}"
                        />
                        <input
                            class="name_ipt"
                            v-model="sesstion.b"
                            type="number"
                            v-if="sestion == 2"
                            @blur="blurData($event, 'b')"
                            :style="{width: 180*1+'px',height: 32*1+'px',fontSize: 16*1+'px'}"
                        />
                        <el-select
                         @focus="sx"
                            class="porper_ipt"
                            v-model="sesstion.ReminderTimeUnit"
                            :placeholder="lang.SCMSConsoleWebApiMySql_PleChoose"
                            v-if="sestion == 1"
                            disabled
                             :style="{width: 100+'px',height: 32+'px'}"
                        >
                            <el-option
                                @change="timeValueeFun()"
                                v-for="item in TimeeOptions"
                                :key="item.value"
                                :label="sesstion.ReminderTimeUnit"
                                :value="sesstion.ReminderTimeUnit"
                            ></el-option>
                        </el-select>
                        <el-select
                         @focus="sx"
                            class="porper_ipt"
                            v-model="sesstion.ReminderTimeUnit"
                            :placeholder="lang.SCMSConsoleWebApiMySql_PleChoose"
                            v-if="sestion == 2"
                             :style="{width: 100+'px',height: 32+'px'}"
                        >
                            <el-option
                                @change="timeValueeFun()"
                                v-for="item in TimeeOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                            ></el-option>
                        </el-select>
                        <el-select
                         @focus="sx"
                            class="porper_ipt"
                            v-model="timeValuee"
                            :placeholder="lang.SCMSConsoleWebApiMySql_PleChoose"
                            v-if="sestion == 3"
                            :style="{width: 100+'px',height: 32+'px'}"
                        >
                            <el-option
                                @change="timeValueeFun()"
                                v-for="item in TimeeOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                            ></el-option>
                        </el-select>
                    </div>
                    <div class="inspection_right">
                        <span class="name-text" :style="{fontSize: 16*1+'px',marginRight: 15*1+'px',width:115*1+'px'}">{{lang.MaintenanceManage_PlanExecutionStatus}}</span>
                        <el-select  @focus="sx" v-model="hsavalue" :placeholder="lang.SCMSConsoleWebApiMySql_PleChoose" v-if="sestion == 3" :style="{width: 280+'px'}">
                            <el-option
                                v-for="item in hasoptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                            ></el-option>
                        </el-select>
                        <el-select
                         @focus="sx"
                            v-model="sesstion.IsEnabled"
                            :placeholder="lang.SCMSConsoleWebApiMySql_PleChoose"
                            v-if="sestion == 1"
                            disabled
                          :style="{width: 280+'px'}"
                        >
                            <el-option
                                v-for="item in hasoptions"
                                :key="item.value"
                                :label="sesstion.IsEnabled"
                                :value="sesstion.IsEnabled"
                            ></el-option>
                        </el-select>
                        <el-select
                         @focus="sx"
                            v-model="sesstion.IsEnabled"
                            :placeholder="lang.SCMSConsoleWebApiMySql_PleChoose"
                            v-if="sestion == 2"
                           :style="{width: 280+'px'}"
                        >
                            <el-option
                                v-for="item in hasoptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                            ></el-option>
                        </el-select>
                    </div>
                </div>
                <!-- 任务执行内容 -->
                <div class="inspection_ipt" :style="{height: 90*1+'px',marginTop: 15*1+'px'}">
                    <div class="inspection_left" :style="{width:80*1+'px',height: 90*1+'px'}">
                        <span class="name_text" :style="{fontSize: 16*1+'px',marginRight: 15*1+'px',width:100*1+'px'}">{{lang.MaintenanceManage_TaskExecutionContent}}</span>
                    </div>
                    <div class="inspection_right">
                        <input
                            type="text"
                            v-model="sesstion.Remarks"
                            class="inspecion_ipt"
                            v-if="sestion == 1"
                            disabled
                            :style="{width: 720*1+'px',height:90*1+'px',left:36*1+'px',fontSize:16*1+'px'}"
                        />
                        <input
                            type="text"
                            v-model="sesstion.Remarks"
                            class="inspecion_ipt"
                            v-if="sestion == 2"
                            :style="{width: 720*1+'px',height:90*1+'px',left:36*1+'px',fontSize:16*1+'px'}"
                        />
                        <input
                            type="text"
                            v-model="RemarksText"
                            class="inspecion_ipt"
                            v-if="sestion == 3"
                            :style="{width: 720*1+'px',height:90*1+'px',left:36*1+'px',fontSize:16*1+'px'}"
                        />
                    </div>
                </div>

                <div class="inspection_btn" >
                    <span class="name_text">{{lang.PointInspectionManage_PatrolInspectionEquipment}}</span>
                    <div class="addBtn" @click="inspectionAddFun" v-if="sestion !== 1">{{lang.RoleManage_Add}}</div>
                    <div @click="inspectionDeleteFun" class="deleteBtn" v-if="sestion !== 1">{{lang.RoleManage_Delete}}</div>
                    <div class="topBtn" v-if="sestion !== 1" @click="shang">{{lang.PointInspectionManage_MoveUp}}</div>
                    <div class="bottomBtn" v-if="sestion !== 1" @click="xia">{{lang.PointInspectionManage_MoveDown}}</div>
                </div>
            </div>
            <div class="addPop_list" >
                <div class="list_title">
                    <div class="ipt">
                        <input @click="checkAllFun1" ref="checkiptAll1" type="checkbox" />
                    </div>
                    <div class="id">{{lang.AlarmRecord_HT_AlarmPointManageUC_SerialNumber}}</div>
                    <div class="name">{{lang.EquipmentAccount_EquipmentName}}</div>
                    <div class="num">{{lang.EquipmentAccount_EquipmentNumber}}</div>
                    <div class="setType">{{lang.EquipmentAccount_EquipmentType}}</div>
                    <div class="typeNum">{{lang.EquipmentAccount_EquipmentModel}}</div>
                    <div class="type">{{lang.NewTrendChart_SeriesGroupsSetting_DataGrid_Type}}</div>
                </div>
                <div v-if="sestion == 3">
                    <div v-for="(i,ind) in checkArr" :key="ind" @click="checkArrdata(i,3,ind)">
                        <div class="list_conter">
                            <div class="ipt" :class="{nowcheck:nowcheck == i.Number}">
                                <input @click="checkFun1(i,ind)" ref="checkipt1" type="checkbox" />
                            </div>
                            <div class="id" :class="{nowcheck:nowcheck == i.Number}">{{ind + 1}}</div>
                            <div
                                class="name"
                                :class="{nowcheck:nowcheck == i.Number}"
                            >{{i.DeviceName}}</div>
                            <div class="num" :class="{nowcheck:nowcheck == i.Number}">{{i.DeviceNo}}</div>
                            <div
                                class="setType"
                                :class="{nowcheck:nowcheck == i.Number}"
                            >{{i.DeviceType}}</div>
                            <div
                                class="typeNum"
                                :class="{nowcheck:nowcheck == i.Number}"
                            >{{i.DeviceModel}}</div>
                            <div class="type" :class="{nowcheck:nowcheck == i.Number}">
                                <el-select
                                 @focus="sx"
                                    @change="typeFun(i,ind)"
                                    v-model="i.value"
                                    :placeholder="lang.SCMSConsoleWebApiMySql_PleChoose"
                                >
                                    <el-option
                                        v-for="item in i.type"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value"
                                    ></el-option>
                                </el-select>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-if="sestion == 1">
                    <div v-for="(i,ind) in checkArr" :key="ind" @click="checkArrdata(i,1,ind)">
                        <div class="list_conter">
                            <div class="ipt" :class="{nowcheck:nowcheck == i.Number}">
                                <input @click="checkFun1(i,ind)" ref="checkipt1" type="checkbox" />
                            </div>
                            <div class="id" :class="{nowcheck:nowcheck == i.Number}">{{ind + 1}}</div>
                            <div
                                class="name"
                                :class="{nowcheck:nowcheck == i.Number}"
                            >{{i.DeviceName}}</div>
                            <div class="num" :class="{nowcheck:nowcheck == i.Number}">{{i.DeviceNo}}</div>
                            <div
                                class="setType"
                                :class="{nowcheck:nowcheck == i.Number}"
                            >{{i.DeviceType}}</div>
                            <div
                                class="typeNum"
                                :class="{nowcheck:nowcheck == i.Number}"
                            >{{i.DeviceModel}}</div>
                            <div class="type">
                                <el-select
                                 @focus="sx"
                                    @change="typeFun(i,ind)"
                                    v-model="i.Name"
                                    :placeholder="lang.SCMSConsoleWebApiMySql_PleChoose"
                                    disabled
                                >
                                    <el-option
                                        v-for="item in i.type"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value"
                                    ></el-option>
                                </el-select>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-if="sestion == 2">
                    <div v-for="(i,ind) in checkArr" :key="ind" @click="checkArrdata(i,2,ind)">
                        <div class="list_conter">
                            <div class="ipt" :class="{nowcheck:nowcheck == i.Number}">
                                <input @click="checkFun1(i,ind)" ref="checkipt1" type="checkbox" />
                            </div>
                            <div class="id" :class="{nowcheck:nowcheck == i.Number}">{{ind + 1}}</div>
                            <div
                                class="name"
                                :class="{nowcheck:nowcheck == i.Number}"
                            >{{i.DeviceName}}</div>
                            <div class="num" :class="{nowcheck:nowcheck == i.Number}">{{i.DeviceNo}}</div>
                            <div
                                class="setType"
                                :class="{nowcheck:nowcheck == i.Number}"
                            >{{i.DeviceType}}</div>
                            <div
                                class="typeNum"
                                :class="{nowcheck:nowcheck == i.Number}"
                            >{{i.DeviceModel}}</div>
                            <div class="type" :class="{nowcheck:nowcheck == i.Number}">
                                <el-select
                                 @focus="sx"
                                    v-model="i.Name"
                                    @change="currStationChange(i)"
                                    :placeholder="lang.SCMSConsoleWebApiMySql_PleChoose"
                                >
                                    <el-option
                                        v-for="item in i.type"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value"
                                    ></el-option>
                                </el-select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="addPop_fool" v-if="sestion !== 1">
                <div @click="addQuerFun" class="fool_quer">{{lang.PopupCommon_Sure}}</div>
                <div class="fool_cancel" @click="addPopcancel">{{lang.PopupCommon_Cancel}}</div>
            </div>
            <!-- <div v-if="tipchange" class="TipsPop">
                <div class="head">{{lang.HT_MessageBoxCaption_Tips}}</div>
                <div class="conter">
                    <div>{{tipword}}</div>
                </div>
                <div class="fool">
                    <div @click="tipsQueryFun" class="queryBtn">{{lang.PopupCommon_Sure}}</div>
                </div>
            </div> -->
        </div>

        <div v-show="equipmentShow" class="addEquipment" ref="kongtiao6" @click="treetrue = false"  :style="{zoom}">
            <div
                class="looktop1"
         
                
            ></div>
            <span @click.stop="offPopEquipment" class="i-c el-icon-close" :class="{a:$store.state.color=='grey'}"></span>
            <div class="head" :class="{colordiv:$store.state.color=='grey'}">
                <span class="text"   :class="{fcolor:$store.state.color=='grey'}">{{lang.FileManage_AddAssociatedEquipment}}</span>
            </div>
            <div class="conter" v-if="equipmentShow">
                <div class="conter_title">
                    <span class="name_text">{{lang.EquipmentAccount_EquipmentType}}</span>
                            <div class="seleword2" @click.stop="treechange">
             <div class="seleword1">
                  {{Meter3}}
               <img :src="xiala" alt />
             </div>
            </div>

                    <div class="selectword selectword2" v-if="treetrue">
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

                    <input class="conter_ipt tinput1" type="text" v-model="keyWord" :placeholder="lang.AlarmRecord_Time_Keyword" />
                    <div @click="queryBtnFun" class="conter_btn">{{lang.AlarmRecord_Time_Select}}</div>
                </div>
                <div class="conter_middle">
                    <div class="middle_title">
                        <div class="ipt">
                            <input @click="checkAllFun" ref="checkiptAll" type="checkbox" />
                        </div>
                        <div class="name">{{lang.EquipmentAccount_EquipmentName}}</div>
                        <div class="id">{{lang.EquipmentAccount_EquipmentNumber}}</div>
                        <div class="type">{{lang.EquipmentAccount_EquipmentType}}</div>
                        <div class="typeNum">{{lang.EquipmentAccount_EquipmentModel}}</div>
                    </div>

                    <div v-for="(item,index) in EquipmentTypeAll" :key="index">
                        <div class="middle_conter">
                            <div class="ipt">
                                <input @click="checkFun(item,index)" ref="checkipt" type="checkbox" />
                            </div>
                            <div class="name">{{item.DeviceName}}</div>
                            <div class="id">{{item.DeviceNo}}</div>
                            <div class="type">{{item.DeviceType}}</div>
                            <div class="typeNum">{{item.DeviceModel}}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="fool">
                <div @click="EquipmentQuerFun" class="fool_quer">{{lang.PopupCommon_Sure}}</div>
                <div @click="EquipmentCancelFun" class="fool_cancel">{{lang.PopupCommon_Cancel}}</div>
            </div>
        </div>
        <div class="cover6" v-if="addShow" :style="{zoom}"></div>
        <div class="cover7" v-if="equipmentShow" @click="treetrue =false" :style="{zoom}"></div>
    </div>
</template>

<script>
import MySearch from '../public/search01.vue';
import moment from 'moment'
// import MyPage from '../public/Pages.vue';
import XLSX from 'xlsx';
export default {
    components: {
        // MySearch,
        // MyPage
    },
    data() {
        return {
               pdyd1:true,
            pdyd2:true,
            pdyd3:true,
            nowcheck: '',
            pddata: 1,
            value1: new Date(new Date().toLocaleDateString()),
            value2: new Date(
                new Date(new Date().toLocaleDateString()).getTime() +
                    24 * 60 * 60 * 1000 -
                    1
            ),
            deltrue: true,
            changeselect: false,
            tipword: '',
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
            Meter3id: '',
            PageData: {
                PageSize: 50,
                TotalCount: 0,
                TotalPage: 1,
                PageIndex: 1,
                LastEnabled: false,
                NextEnabled: false
            },
            aaa: false,
            bbb: false,
            nowpage: 1,
            outputs: [],
            tableData: [],
            alcheckArr:[],
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
            a1: 1,
            a2: 1,
            sestion: 1,
            hastip: 1,
            sbnum: 1,
            time4: '',
            muchdata: '',
            checkArr1: '',
            a: 1,
            data6: [],
            longinnum: '',
            list: '',
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

            //
            hasoptions: [
                {
                    value: '启用',
                    label: '启用'
                },
                {
                    value: '停止',
                    label: '停止'
                }
            ],
    TimeOptions1: [
                {
                    value: '小时',
                    label: '小时'
                },
                {
                    value: '天',
                    label: '天'
                },
                {
                    value: '周',
                    label: '周'
                },
                {
                    value: '月',
                    label: '月'
                }
            ],

            TimeOptions: [
                {
                    value: '小时',
                    label: '小时'
                },
                {
                    value: '天',
                    label: '天'
                },
                {
                    value: '周',
                    label: '周'
                },
                {
                    value: '月',
                    label: '月'
                }
            ],

            TimeeOptions: [
                {
                    value: '小时',
                    label: '小时'
                },
                {
                    value: '天',
                    label: '天'
                },
                {
                    value: '周',
                    label: '周'
                },
                {
                    value: '月',
                    label: '月'
                }
            ],
                 xiala:require('../../assets/images/ziyuan4.png'),
            hsavalue: '启用',
            addShow: false, //弹窗是否显示
            equipmentShow: false,
            timeValue: '小时',
            timeValuee: '小时',
            userValue: '',
            Expiretime: '', //到期时间
            startime: '', //开始时间
            endtime: '',
            Meter3: '',
            ExpiretimeS: '', //时间戳
            endtimeS: '', //时间戳
            startimeS: '', //时间戳,
            treetrue: false,
            planName: '',
            rwselect:'小时',
            inspecionNum: 2,
            inspectionNum2: 1,
            reduceTime: '',
            EquipmentTypeAll: [],
            deviceType: '',
            keyWord: '',
            checkArr: [],
            checkArr2:[],
            checkDeleArr: [],
            RemarksText: '',
            ValueSID: '',
            SID: '',
            yidata: '',
            jurisdiction:[],
            buttonarr:[],
            cxid:'',
            cxshow:true,
            tjid:"",
            tjshow:true,
            scid:'',
            scshow:true,
            ckid:'',
            ckshow:true,
            bjid:'',
            bjshow:true,
            zxtime:1,
            rwtime:1,
            zoom:1,
            lang: JSON.parse(localStorage.getItem('languages'))[localStorage.getItem('currentLang')]
        };
    },

    created() {
        this.getLangData()
              this.jurisdiction = this.$store.state.btnPowerData
     this.buttonarr = this.findPathByLeafId(this.GetUrlParam('id'),this.jurisdiction)[0].Children
     console.log("dsad",this.buttonarr)
         this.buttonarr.forEach((item)=>{
         if(item.RightName == "点巡检计划-查询按钮"){
          this.cxid = item.RightID
         }else if(item.RightName == "点巡检计划-添加按钮"){
          this.tjid = item.RightID
         }else if(item.RightName == "点巡检计划-删除按钮"){
          this.scid = item.RightID
         }else if(item.RightName == "点巡检计划-查看按钮"){
          this.ckid = item.RightID
         }else if(item.RightName == "点巡检计划-编辑按钮"){
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
                  url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.scid}`,
              }).then(res => {
                  this.scshow = res.data.data
              
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
               this.$axios({
                  method: 'post',
                  url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.bjid}`,
              }).then(res => {
                  this.bjshow = res.data.data
              
              }).catch((err)=>{
                  console.log('err',err)
              })
        this.getEquipmentType();
        this.req(1);
        this.time4 = this.getNowTime();
        this.InspectingPeopleAxios();
        // this.getDate();
        this.initTime();
    },
    methods: {
        blurData(e, type) {
            e.target.value = e.target.value === '' ? 1 : e.target.value 
            this.sesstion[type] = Number(e.target.value)
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
            this.hasoptions = [
                {
                    value: this.lang.MaintenanceManage_Enable,
                    label: this.lang.MaintenanceManage_Enable
                },
                {
                    value: this.lang.MaintenanceManage_Stop,
                    label: this.lang.MaintenanceManage_Stop
                }
            ]
            this.TimeOptions1 = [
                {
                    value: this.lang.HMI_HT_LineChartWindowViewModel_Hour,
                    label: this.lang.HMI_HT_LineChartWindowViewModel_Hour
                },
                {
                    value: this.lang.MaintenanceManage_Day,
                    label: this.lang.MaintenanceManage_Day
                },
                {
                    value: this.lang.HMI_HT_LineChartWindowViewModel_Week,
                    label: this.lang.HMI_HT_LineChartWindowViewModel_Week
                },
                {
                    value: this.lang.HMI_HT_LineChartWindowViewModel_Month,
                    label: this.lang.HMI_HT_LineChartWindowViewModel_Month
                }
            ]
            this.TimeOptions = [
                {
                    value: this.lang.HMI_HT_LineChartWindowViewModel_Hour,
                    label: this.lang.HMI_HT_LineChartWindowViewModel_Hour
                },
                {
                    value: this.lang.MaintenanceManage_Day,
                    label: this.lang.MaintenanceManage_Day
                },
                {
                    value: this.lang.HMI_HT_LineChartWindowViewModel_Week,
                    label: this.lang.HMI_HT_LineChartWindowViewModel_Week
                },
                {
                    value: this.lang.HMI_HT_LineChartWindowViewModel_Month,
                    label: this.lang.HMI_HT_LineChartWindowViewModel_Month
                }
            ]
            this.TimeeOptions = [
                {
                    value: this.lang.HMI_HT_LineChartWindowViewModel_Hour,
                    label: this.lang.HMI_HT_LineChartWindowViewModel_Hour
                },
                {
                    value: this.lang.MaintenanceManage_Day,
                    label: this.lang.MaintenanceManage_Day
                },
                {
                    value: this.lang.HMI_HT_LineChartWindowViewModel_Week,
                    label: this.lang.HMI_HT_LineChartWindowViewModel_Week
                },
                {
                    value: this.lang.HMI_HT_LineChartWindowViewModel_Month,
                    label: this.lang.HMI_HT_LineChartWindowViewModel_Month
                }
            ]
            this.hsavalue = this.lang.MaintenanceManage_Enable
            this.timeValue = this.lang.HMI_HT_LineChartWindowViewModel_Hour
            this.timeValuee = this.lang.HMI_HT_LineChartWindowViewModel_Hour
            this.rwselect = this.lang.HMI_HT_LineChartWindowViewModel_Hour
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
        changerwselect(a,b){
         this.sesstion.rwselect = a
          let dai = JSON.parse(JSON.stringify(this.sesstion))
          this.sesstion = dai
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
        currStationChange(val) {
            // debugger
            this.$forceUpdate();
            let arr =  JSON.parse(JSON.stringify(this.checkArr))
            if(arr.length<=this.alcheckArr.length){
                arr = this.alcheckArr
            }
            this.$nextTick(function() {
                for (var i = 0; i < this.checkArr.length; i++) {
                    for (var j = 0; j < arr[0].type.length; j++) {
                        if (
                            this.checkArr[i].Name ==
                            this.checkArr[0].type[j].value
                        ) {
                            this.checkArr[i].SID = arr[0].type[j].ID;
                        }
                    }
                }
            });
        },
        checkArrdata(i, a, b) {
            this.nowcheck = i.Number;
            this.yidata = i;
            this.yinum = b;
            console.log('eee',this.nowcheck,this.yinum)
        },
        swapArray(arr, index1, index2) {
            arr[index1] = arr.splice(index2, 1, arr[index1])[0];
            return arr;
        },
        shang() {
            if (this.yinum !== 0) {
                this.swapArray(this.checkArr, this.yinum, this.yinum - 1);
                this.yinum--;
            }
         
        },
        xia() {
       
            if (this.yinum + 1 !== this.checkArr.length) {
                this.swapArray(this.checkArr, this.yinum, this.yinum + 1);
                this.yinum++;
            }

        },

        deldata1() {
              if(!this.scshow){
                     setTimeout(() => {
             this.tipchange = true;
                this.move('tip', 'tiphead');
            });
                 this.pdyd1 = true;
                this.tipword = this.lang.NoOperationAuthority;
                return
            }
            let i = 0;
            let a = [];
            for (i in this.list) {
                a.push(this.list[i].ID);
            }
            if (a.length == 0) {
                this.tipword = this.lang.EquipmentAccount_CheckTheDeleteItem;
                  setTimeout(() => {
             this.tipchange = true;
                this.move('tip', 'tiphead');
            });
                this.pdyd1 = true;
            } else {
              this.tipword = this.lang.EquipmentAccount_SureToDelete;
                setTimeout(() => {
             this.tipchange = true;
                this.move('tip', 'tiphead');
            });
               this.pdyd1 = true;
              this.deltrue = false;
            }
        },
        yes1(){
               let a = [];
               let i = 0;
            for (i in this.list) {
                a.push(this.list[i].ID);
            }
              this.$axios({
                    method: 'post',
                    url:
                        '/api/PointInspectionManage/PointInspectionManage_DeletePlan',
                    data: a
                }).then(res => {
                    console.log(res);
                    this.list = [];
                    this.deltrue = true;
                    this.tipword = res.data.data;
                      setTimeout(() => {
             this.tipchange = true;
                this.move('tip', 'tiphead');
            });
                     this.pdyd1 = true;
                    this.sad(1);
                });
        },
        no1(){
         this.deltrue = true;
            this.tipchange = false;
        },
        //类型选择赋值SID
        typeFun(i, index) {
            for (var j = 0; j < i.type.length; j++) {
                if (i.type[j].value == i.value) {
                    this.EquipmentTypeAll[index].SIDValue = i.SID[j].label;
                }
            }
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
                                       sx(){
                                        
            let that = this
            setTimeout(()=>{
for(let i=0;i<$('.el-picker-panel').length;i++){
                $('.el-picker-panel')[i].style.zoom = that.zoom
            }
            for(let i=0;i<$('.el-select-dropdown').length;i++){
                $('.el-select-dropdown')[i].style.zoom = that.zoom
            }
            })
              
        },
        //选择时间
        timeValueFun() {},
        //添加查询
        queryBtnFun() {
            this.addPopAxios();
        },
        treechange() {
            this.selectword2();
        },
                sx1(){
            let that = this
            setTimeout(()=>{
for(let i=0;i<$('.el-select__caret').length;i++){
    console.log($('.el-select__caret')[i])
              
            }
            })
              
        },
        //开启添加弹窗
        addPopFun() {
            
              if(!this.tjshow){
                     setTimeout(() => {
             this.tipchange = true;
                this.move('tip', 'tiphead');
            });
                 this.pdyd1 = true;
                this.tipword = this.lang.NoOperationAuthority;
                return
            }
            
            this.getDate();
            this.nowcheck = '';
            this.sestion = 3;
            this.SpotcheckArr = [];
            this.AllShow = [];
            this.checkArr = [];
            this.checkDeleArr1 = [];
            this.planName = '';
            this.inspecionNum = 2;
            this.inspectionNum2 = 1;
            this.timeValue = this.lang.HMI_HT_LineChartWindowViewModel_Hour;
            this.timeValuee = this.lang.HMI_HT_LineChartWindowViewModel_Hour;
            this.hsavalue = this.lang.MaintenanceManage_Enable;
            this.RemarksText = '';
            this.rwselect = this.lang.HMI_HT_LineChartWindowViewModel_Hour;
                setTimeout(() => {
            this.addShow = true;
            this.sx1()
                this.move('addPop', 'looktop');
            });
               this.userValue = 'SuperAdmin'
              this.pdyd3 = true;
            this.rwtime = 1
                 this.Expiretime = moment(this.startime).add(Number(6),"days").format("YYYY-MM-DD HH:mm:ss")
           
        },
                                sx(){
            let that = this
            setTimeout(()=>{
for(let i=0;i<$('.el-picker-panel').length;i++){
                $('.el-picker-panel')[i].style.zoom = that.zoom
            }
            for(let i=0;i<$('.el-select-dropdown').length;i++){
                $('.el-select-dropdown')[i].style.zoom = that.zoom
            }
            })
              
        },
        //关闭添加弹窗
        addPopcancel() {
                let ss = JSON.stringify(this.antable);
            this.tableData1 = JSON.parse(ss);
            this.addShow = false;
        },
        //关闭设备关联弹窗
        offPopEquipment() {
            this.equipmentShow = false;

            if (this.sestion == 3) {
                this.checkArr = this.checkArr11;
            } else {
                this.checkArr = this.checkArr1;
            }
        },
        //关闭设备弹窗
        EquipmentCancelFun() {
             this.checkArr2 = []
            // console.log('(this.sestion',this.sestion)
            // if (this.sestion == 3) {
            //     // this.checkArr = [];
            //     this.checkArr = this.checkArr11;
            // } else {
            //     this.checkArr = this.checkArr1;
            // }

            this.equipmentShow = false;
        },
        //确定设备弹窗
        EquipmentQuerFun() {
            
            let arr = JSON.parse(JSON.stringify(this.checkArr))
            // if(arr.length<this.alcheckArr.length){
            //     arr = this.alcheckArr
            // }
             var checkArr2arr = []
             if (this.checkArr2.length === 0) {
                this.tipchange = true;
                this.tipword = this.lang.FileManage_SelectEquipment;
                return
             }
            for(let i=0;i<arr.length;i++){
                checkArr2arr.push(arr[i].AID)
            }
            var check = []
            for(let j=0;j<this.checkArr2.length;j++){
                var index = checkArr2arr.indexOf(this.checkArr2[j].AID)
                if(index == -1){
                    check.push(this.checkArr2[j])
                }
            }

            this.checkArr = JSON.parse(JSON.stringify(this.checkArr.concat(check)))
            this.equipmentShow = false;
            for (let i = 0; i < this.checkArr.length; i++) {
                this.checkArr[i].Number = i + 1;
            }
             this.checkArr2 = []
        },
        //开启设备关联弹窗
        inspectionAddFun() {
            
            this.nowcheck = this.yinum+1
            this.checkArr11 = this.checkArr

              setTimeout(() => {
            this.equipmentShow= true;
                this.move('addEquipment', 'looktop1');
            });
            this.pdyd2 = true;
            this.deviceType = '';
            this.treetrue = false;
            this.keyWord = '';
            this.Meter3 = '';
            this.addPopAxios();
        },
        //删除设备
        inspectionDeleteFun() {
            this.nowcheck = ''
            this.alcheckArr = JSON.parse(JSON.stringify(this.checkArr))
            if (this.AllShow == true) {
                this.checkArr = [];
                this.$refs.checkiptAll1.checked = false;
            }

            if (this.checkDeleArr.length != 0) {
                // var tt = false;
                // for (var i = 0; i < this.checkDeleArr.length; i++) {
                //     var ind = this.checkDeleArr[i];
                //     if (tt) {
                //         ind = ind - 1;
                //     }

                //     this.checkArr.splice(ind, 1);
                //     tt = true;
                // }
                  var deleteArr = []
                for(let i=0;i<this.checkDeleArr.length;i++){
                    deleteArr.push(this.checkArr[this.checkDeleArr[i]])
                }
                for(let k=0;k<this.checkArr.length;k++){
                    var index = deleteArr.indexOf(this.checkArr[k])
                    if(index != -1){
                        this.checkArr.splice(k, 1);
                        k--
                    }
                }

                var checkDom = this.$refs.checkipt1;
                for (var j = 0; j < checkDom.length; j++) {
                    checkDom[j].checked = false;
                }
                this.checkDeleArr = [];
            }
             this.AllShow = false
        },
        // 巡检人接口
        InspectingPeopleAxios() {
            this.$axios({
                method: 'post',
                url:
                    '/api/UserManage/UserManage_GstUser?argPageSize=100&argPageIndex=1&argKeyWord=',
                argPageSize: 100,
                argPageIndex: 1,
                argKeyWord: ''
            })
                .then(res => {
                    console.log("巡检人",res)
                    var data = res.data.data.DataList;
                    this.useroptions = [];
                    this.userValue = data[0].UserAccount;
                    for (var i = 0; i < data.length; i++) {
                        var value = {
                            value: data[i].UserAccount,
                            label: data[i].UserAccount
                        };
                        this.useroptions.push(value);
                    }
                   
                })
                .catch(function(error) {
                    // console.log(error);
                });
        },
        //初始化时间
        getDate() {
            var myDate = new Date(); //获取当前年
            var year = myDate.getFullYear(); //获取当前月
            var month = myDate.getMonth() + 1;
            var mothe = month > 9 ? month : '0' + month; //获取当前日
            var date = myDate.getDate();
            var da = date > 9 ? date : '0' + date;
            var h = myDate.getHours()+1; //获取当前小时数(0-23)
            var he = h > 9 ? h : '0' + h;
            var m = myDate.getMinutes(); //获取当前分钟数(0-59)
            var me = m > 9 ? m : '0' + m;
            var s = myDate.getSeconds();
            var se = s > 9 ? s : '0' + s;
            var now =
                year + '-' + mothe + '-' + da + ' ' + he + ':' + me + ':' + se; //获取当前时间

            this.startime = now;
            this.endtime = now;
            this.Expiretime = now;
        },
        //转为日期时间
        getTime(dt) {
            dt = new Date(dt)
            var year = dt.getFullYear(); //获取当前月
            var month = dt.getMonth() + 1;
            var mothe = month > 9 ? month : '0' + month; //获取当前日
            var date = dt.getDate();
            var da = date > 9 ? date : '0' + date;
            var h = dt.getHours(); //获取当前小时数(0-23)
            var he = h > 9 ? h : '0' + h;
            var m = dt.getMinutes(); //获取当前分钟数(0-59)
            var me = m > 9 ? m : '0' + m;
            var s = dt.getSeconds();
            var se = s > 9 ? s : '0' + s;
            var str =
                year + '-' + mothe + '-' + da + ' ' + he + ':' + me + ':' + se; //获取当前时间
            return str;
        },
        datatime(data) {
            let time = data;
            time = time.replace(/-/g, '/'); // 把所有-转化成/
            let timestamp = new Date(time).getTime();
            return timestamp;
        },
            endValue(time,stime,endtime){
            if(time == this.lang.HMI_HT_LineChartWindowViewModel_Hour){
               return moment(stime).add(Number(endtime),"hours").format("YYYY-MM-DD HH:mm:ss")
            }else if(time == this.lang.MaintenanceManage_Day){
              return  moment(stime).add(Number(endtime),"days").format("YYYY-MM-DD HH:mm:ss")
            }else if(time == this.lang.HMI_HT_LineChartWindowViewModel_Week){
              return  moment(stime).add(Number(endtime),"weeks").format("YYYY-MM-DD HH:mm:ss")
            }else if(time == this.lang.HMI_HT_LineChartWindowViewModel_Month){
               return moment(stime).add(Number(endtime),"months").format("YYYY-MM-DD HH:mm:ss")
            }
        },
        initTime() {
            var da1 = this.startime;
            this.datatime(da1);
            this.startimeS = this.datatime(da1);

            var da2 = this.Expiretime;
            this.datatime(da2);
            this.ExpiretimeS = this.datatime(da2);

            var da3 = this.endtime;
            this.datatime(da3);
            this.endtimeS = this.datatime(da3);
        },
        //选择时间
        starFun() {
            var da = this.getTime(this.startime);
            this.datatime(da);
            this.startimeS = this.datatime(da);
        },
        expireFun() {
            var da = this.getTime(this.Expiretime);
            this.datatime(da);
            this.ExpiretimeS = this.datatime(da);
        },
        endFun() {
            var da = this.getTime(this.endtime);
            this.datatime(da);
            this.endtimeS = this.datatime(da);
        },
        //添加弹窗确定按钮
        addQuerFun() {
            console.log('确定了',this.sestion)
            if (this.sestion == 3) {
              
                 if(this.rwselect == this.lang.HMI_HT_LineChartWindowViewModel_Hour){
               this.endtime  = 
                moment(this.startime).add(Number(this.rwtime),"hours").format("YYYY-MM-DD HH:mm:ss")
            }else if(this.rwselect == this.lang.MaintenanceManage_Day){
               this.endtime  = 
                moment(this.startime).add(Number(this.rwtime),"days").format("YYYY-MM-DD HH:mm:ss")
            }else if(this.rwselect == this.lang.HMI_HT_LineChartWindowViewModel_Week){
               this.endtime  = 
                moment(this.startime).add(Number(this.rwtime),"weeks").format("YYYY-MM-DD HH:mm:ss")
            }else if(this.rwselect == this.lang.HMI_HT_LineChartWindowViewModel_Month){
               this.endtime = 
                moment(this.startime).add(Number(this.rwtime),"months").format("YYYY-MM-DD HH:mm:ss")
            }
                if (this.planName == '') {
                      setTimeout(() => {
             this.tipchange = true;
                this.move('tip', 'tiphead');
            });
                     this.pdyd1 = true;
                    this.tipword = this.lang.MaintenanceManage_PlanNameIsEmpty
                    return;
                }
                var newDate = new Date().getTime();
                if (newDate > this.startime) {
                      setTimeout(() => {
             this.tipchange = true;
                this.move('tip', 'tiphead');
            });
                     this.pdyd1 = true;
                    this.tipword = this.lang.PointInspectionManage_StartTimeMustBeGreaterThanCurrentTime
                    return;
                }
                if (this.endtime <= this.startime) {
                      setTimeout(() => {
             this.tipchange = true;
                this.move('tip', 'tiphead');
            });
                     this.pdyd1 = true;
                    this.tipword = this.lang.PointInspectionManage_EndTimeMustBeGreaterThanStartTime
                    return;
                }
                //巡检周期判断
                if (this.inspecionNum == '') {
                    setTimeout(() => {
                        this.tipchange = true;
                        this.move('tip', 'tiphead');
                    });
                    this.pdyd1 = true;
                    this.tipword = this.lang.PointInspectionManage_PatrolCycleIsEmpty
                    return;
                } else {
                    var type = Number(this.inspecionNum);
                    if (type.toString() == 'true') {
                        setTimeout(() => {
                            this.tipchange = true;
                            this.move('tip', 'tiphead');
                        });
                        this.pdyd1 = true;
                        this.tipword = this.lang.PointInspectionManage_PatrolCycleMustBePositiveInteger
                        return;
                    } else {
                        if (this.inspecionNum <= 0) {
                            setTimeout(() => {
                            this.tipchange = true;
                                this.move('tip', 'tiphead');
                            });
                            this.pdyd1 = true;
                            this.tipword = this.lang.PointInspectionManage_PatrolCycleMustBePositiveInteger
                            return;
                        } else {
                            var endStarTime = this.endtimeS - this.startimeS;

                            if (this.timeValue == this.lang.HMI_HT_LineChartWindowViewModel_Hour) {
                                this.PeriodUnit = 1;
                                var time11 = this.inspecionNum * 60 * 60 * 1000;
                                this.reduceTime = this.inspecionNum;

                                if (time11 <= endStarTime) {
                                    setTimeout(() => {
                                        this.tipchange = true;
                                        this.move('tip', 'tiphead');
                                    });
                                    this.pdyd1 = true;
                                    this.tipword = this.lang.PointInspectionManage_CycleTimeLessThanDifferenceBetweenStartEndTime
                                    return;
                                }
                            } else if (this.timeValue == this.lang.MaintenanceManage_Day) {
                                this.PeriodUnit = 2;
                                var time22 =
                                    this.inspecionNum * 24 * 60 * 60 * 1000;
                                this.reduceTime = this.inspecionNum * 24;
                                if (time22 <= endStarTime) {
                                    setTimeout(() => {
                                        this.tipchange = true;
                                        this.move('tip', 'tiphead');
                                    });
                                    this.pdyd1 = true;
                                    this.tipword = this.lang.PointInspectionManage_CycleTimeLessThanDifferenceBetweenStartEndTime
                                    return;
                                }
                            } else if (this.timeValue == this.lang.HMI_HT_LineChartWindowViewModel_Week) {
                                this.PeriodUnit = 3;
                                var time33 =
                                    this.inspecionNum *
                                    (24 * 7) *
                                    60 *
                                    60 *
                                    1000;
                                this.reduceTime = this.inspecionNum * (24 * 7);
                                if (time33 <= endStarTime) {
                                    setTimeout(() => {
                                        this.tipchange = true;
                                        this.move('tip', 'tiphead');
                                    });
                                    this.pdyd1 = true;
                                    this.tipword = this.lang.PointInspectionManage_CycleTimeLessThanDifferenceBetweenStartEndTime
                                    return;
                                }
                            } else {
                                this.PeriodUnit = 4;
                                var time44 =
                                    this.inspecionNum *
                                    (24 * 7 * 30) *
                                    60 *
                                    60 *
                                    1000;
                                this.reduceTime =
                                    this.inspecionNum * (24 * 7 * 30);
                                if (time44 <= endStarTime) {
                                    setTimeout(() => {
                                        this.tipchange = true;
                                        this.move('tip', 'tiphead');
                                    });
                                    this.pdyd1 = true;
                                    this.tipword = this.lang.PointInspectionManage_CycleTimeLessThanDifferenceBetweenStartEndTime
                                    return;
                                }
                            }

                            if (this.checkArr.length == 0) {
                                setTimeout(() => {
                                    this.tipchange = true;
                                    this.move('tip', 'tiphead');
                                });
                                this.pdyd1 = true;
                                this.tipword = this.lang.PointInspectionManage_PleaseAddPatrolInspectionEquipment
                                return;
                            }
                        }
                    }
                }
                //注意
                if (this.checkArr.length == 0) {
                    setTimeout(() => {
                        this.tipchange = true;
                        this.move('tip', 'tiphead');
                    });
                    this.pdyd1 = true;
                    this.tipword = this.lang.PointInspectionManage_PleaseAddPatrolInspectionEquipment
                    return;
                }
                //checkArr
                for (var s = 0; s < this.checkArr.length; s++) {
                    if (this.checkArr[s].type.length == 0) {
                        setTimeout(() => {
                            this.tipchange = true;
                            this.move('tip', 'tiphead');
                        });
                        this.pdyd1 = true;
                        let msg = this.lang.PointInspectionManage_RowSelectInspectionItems
                        let firstL = msg.indexOf('{')
                        let firstR = msg.indexOf('}') + 1
                        let str1 = msg.slice(firstL, firstR)
                        msg = msg.replace(str1, `${s + 1}`)
                        // this.tipword = `请选择巡检设备第${s + 1}行的巡检项目！`;
                        this.tipword =msg
                        return;
                    }
                }

                //巡检判断结束
                if (this.Expiretime <= this.endtime) {
                    setTimeout(() => {
                    this.tipchange = true;
                        this.move('tip', 'tiphead');
                    });
                    this.pdyd1 = true;
                    this.tipword = this.lang.PointInspectionManage_ExpirationTimeMustBeGreaterThanEndTime
                    return;
                }
                if (this.inspectionNum2 == '') {
                    setTimeout(() => {
                        this.tipchange = true;
                        this.move('tip', 'tiphead');
                    });
                    this.pdyd1 = true;
                    this.tipword = this.lang.PointInspectionManage_AdvanceReminderIsEmpty
                    return;
                } else {
                    var type1 = Number(this.inspectionNum2);
                    if (type == true && type !== 1) {
                        setTimeout(() => {
                        this.tipchange = true;
                            this.move('tip', 'tiphead');
                        });            
                        this.pdyd1 = true;
                        this.pdyd1 = true;
                        this.tipword = this.lang.PointInspectionManage_AdvanceReminderMustNotLessThan0
                        return;
                    } else {
                        if (this.inspectionNum2 < 0) {
                              setTimeout(() => {
             this.tipchange = true;
                this.move('tip', 'tiphead');
            });
                             this.pdyd1 = true;
                            this.tipword = this.lang.PointInspectionManage_AdvanceReminderMustNotLessThan0
                            return;
                        } else {
                            var time55;
                            if (this.timeValuee == this.lang.HMI_HT_LineChartWindowViewModel_Hour) {
                                this.ReminderTimeUnit = 1;
                                time55 = this.inspectionNum2;
                            } else if (this.timeValuee == this.lang.MaintenanceManage_Day) {
                                this.ReminderTimeUnit = 2;
                                time55 = this.inspectionNum2 * 24;
                            } else if (this.timeValuee == this.lang.HMI_HT_LineChartWindowViewModel_Week) {
                                this.ReminderTimeUnit = 3;
                                time55 = this.inspectionNum2 * 24 * 7;
                            } else if (this.timeValuee == this.lang.HMI_HT_LineChartWindowViewModel_Month) {
                                this.ReminderTimeUnit = 4;
                                time55 = this.inspectionNum2 * 24 * 30;
                            }
                        }
                    }
                }

                this.dataValue = {
                    PlanName: this.planName,
                    Executor: this.userValue,
                    StartTime: this.getTime(this.startime),
                    EndTime: this.getTime(this.endtime),
                    MaturityTime: this.getTime(this.Expiretime),
                    PeriodValue: Number(this.inspecionNum),
                    PeriodUnit: this.PeriodUnit,
                    ReminderTimeValue: Number(this.inspectionNum2),
                    ReminderTimeUnit: this.ReminderTimeUnit,
                    IsEnabled: this.hsavalue == this.lang.MaintenanceManage_Enable ? true : false,
                    Remarks: this.RemarksText,
                    DeviceAndStandardGroup: []
                };
                   
                var checkArrSid = [];
                for (var t = 0; t < this.checkArr.length; t++) {
                    checkArrSid.push(this.checkArr[t].AID);
                }

                 console.log('EquipmentTypeAll555',this.EquipmentTypeAll,this.checkArr,checkArrSid)
                console.log( this.dataValue)
              
                for (var w = 0; w < this.EquipmentTypeAll.length; w++) {
                    var indexof = checkArrSid.indexOf(
                        this.EquipmentTypeAll[w].AID
                    );

                    if (indexof != -1) {
                        var value1 = {
                            DeviceID: this.EquipmentTypeAll[w].AID,
                            StandardID: this.EquipmentTypeAll[w].SIDValue
                        };
                        this.dataValue.DeviceAndStandardGroup.push(value1);
                    }
                }
              
                this.$axios({
                    method: 'post',
                    url:
                        '/api/PointInspectionManage/PointInspectionManage_AddPlan',
                    data: this.dataValue
                })
                    .then(res => {
                        console.log('resrr', res);
                        if (res.data.code == 0) {
                              setTimeout(() => {
             this.tipchange = true;
                this.move('tip', 'tiphead');
            });
                             this.pdyd1 = true;
                            this.tipword = res.data.data;
                            this.addShow = false;
                            this.getsetime();
                        } else {
                              setTimeout(() => {
             this.tipchange = true;
                this.move('tip', 'tiphead');
            });
                             this.pdyd1 = true;
                            this.tipword = res.data.msg;
                        }
                    })
                    .catch(function(error) {
                        console.log('errss', error);
                    });

                console.log('EquipmentTypeAll', this.EquipmentTypeAll);
            } else {
                if (this.sesstion.PeriodUnit == this.lang.HMI_HT_LineChartWindowViewModel_Hour) {
                    this.sesstion.PeriodUnit = 1;
                } else if (this.sesstion.PeriodUnit == this.lang.MaintenanceManage_Day) {
                    this.sesstion.PeriodUnit = 2;
                } else if (this.sesstion.PeriodUnit == this.lang.HMI_HT_LineChartWindowViewModel_Week) {
                    this.sesstion.PeriodUnit = 3;
                } else if (this.sesstion.PeriodUnit == this.lang.HMI_HT_LineChartWindowViewModel_Month) {
                    this.sesstion.PeriodUnit = 4;
                }
                if (this.sesstion.ReminderTimeUnit == this.lang.HMI_HT_LineChartWindowViewModel_Hour) {
                    this.sesstion.ReminderTimeUnit = 1;
                } else if (this.sesstion.ReminderTimeUnit == this.lang.MaintenanceManage_Day) {
                    this.sesstion.ReminderTimeUnit = 2;
                } else if (this.sesstion.ReminderTimeUnit == this.lang.HMI_HT_LineChartWindowViewModel_Week) {
                    this.sesstion.ReminderTimeUnit = 3;
                } else if (this.sesstion.ReminderTimeUnit == this.lang.HMI_HT_LineChartWindowViewModel_Month) {
                    this.sesstion.ReminderTimeUnit = 4;
                }
                if (this.sesstion.IsEnabled == this.lang.MaintenanceManage_Enable) {
                    this.sesstion.IsEnabled = true;
                } else if (this.sesstion.IsEnabled == this.lang.MaintenanceManage_Stop) {
                    this.sesstion.IsEnabled = false;
                }
                let a = [
                    // {
                    //     DeviceID: this.checkArr[0].AID,
                    //     StandardID: this.checkArr[0].SID
                    // }
                ];
                let i = 1;

                for (i = 0; i in this.checkArr; i++) {
                    let b = {};
                    b.DeviceID = this.checkArr[i].AID;
                    b.StandardID = this.checkArr[i].SID;
                    a.push(b);
                }
                 if(this.sesstion.rwselect == this.lang.HMI_HT_LineChartWindowViewModel_Hour){
              this.sesstion.CurrentEndTime = 
                moment(this.sesstion.CurrentStartTime).add(Number(this.sesstion.rwtime),"hours").format("YYYY-MM-DD HH:mm:ss")
            }else if(this.sesstion.rwselect == this.lang.MaintenanceManage_Day){
              this.sesstion.CurrentEndTime = 
                moment(this.sesstion.CurrentStartTime).add(Number(this.sesstion.rwtime),"days").format("YYYY-MM-DD HH:mm:ss")
            }else if(this.sesstion.rwselect == this.lang.HMI_HT_LineChartWindowViewModel_Week){
              this.sesstion.CurrentEndTime = 
                moment(this.sesstion.CurrentStartTime).add(Number(this.sesstion.rwtime),"weeks").format("YYYY-MM-DD HH:mm:ss")
            }else if(this.sesstion.rwselect == this.lang.HMI_HT_LineChartWindowViewModel_Month){
              this.sesstion.CurrentEndTime= 
                moment(this.sesstion.CurrentStartTime).add(Number(this.sesstion.rwtime),"months").format("YYYY-MM-DD HH:mm:ss")
            }
              //判断是否存在相同设备或未选择的巡检项目
              if(a.length){
                  var StandardIDArr = []
                  var isStandard = true
                  var StandardIndex
                  for(let o=0;o<a.length;o++){
                      if(typeof(a[o].StandardID) != 'string'){
                        setTimeout(() => {
                            this.tipchange = true;
                            this.move('tip', 'tiphead');
                        });
                        this.pdyd1 = true;
                        let msg = this.lang.PointInspectionManage_RowSelectInspectionItems
                        let firstL = msg.indexOf('{')
                        let firstR = msg.indexOf('}') + 1
                        let str1 = msg.slice(firstL, firstR)
                        msg = msg.replace(str1, `${o + 1}`)

                        //  this.tipword = `请选择巡检设备第${o + 1}行的巡检项目！`;
                        this.tipword = msg
                        return;
                      }else{
                          console.log('a[o]',a[o])
                          StandardIDArr.push(a[o].DeviceID)
                      }
                  }
                  var indexArr = []
                  for(let o1=0;o1<StandardIDArr.length;o1++){
                      let ind = indexArr.indexOf(StandardIDArr[o1])
                       if(ind == -1){
                          indexArr.push(StandardIDArr[o1])
                       }else{
                           isStandard = false
                           StandardIndex = o1
                       }
                  }
                  if(!isStandard){
                        setTimeout(() => {
             this.tipchange = true;
                this.move('tip', 'tiphead');
            });
                      this.pdyd1 = true;
                        let msg = this.lang.PointInspectionManage_RowEquipmentSameStandardAlreadyExists
                        let firstL = msg.indexOf('{')
                        let firstR = msg.indexOf('}') + 1
                        let str1 = msg.slice(firstL, firstR)
                        msg = msg.replace(str1, `${StandardIndex + 1}`)

                    //   this.tipword = `巡检设备第${StandardIndex + 1}行已存在相同标准的设备，请重新选择`;
                        this.tipword = msg
                       return;
                  }
                
              }

                this.$axios({
                    method: 'post',
                    url:
                        '/api/PointInspectionManage/PointInspectionManage_ModifyPlan',
                    data: {
                        ProjectID: this.sesstion.ID,
                        PlanName: this.sesstion.Name,
                        Executor: this.sesstion.Executor,
                        StartTime: this.sesstion.CurrentStartTime,
                        EndTime: this.sesstion.CurrentEndTime,
                        MaturityTime: this.sesstion.MaturityTime,
                        PeriodValue: this.sesstion.a,
                        PeriodUnit: this.sesstion.PeriodUnit,
                        ReminderTimeValue: this.sesstion.b,
                        ReminderTimeUnit: this.sesstion.ReminderTimeUnit,
                        IsEnabled: this.sesstion.IsEnabled,
                        Remarks: this.sesstion.Remarks,
                        DeviceAndStandardGroup: a
                    }
                }).then(res => {
                    if (res.data.code == 0) {
                        this.sad(1);
                        this.addShow = false;
                          setTimeout(() => {
             this.tipchange = true;
                this.move('tip', 'tiphead');
            });
                         this.pdyd1 = true;
                        this.tipword = this.lang.FormulaManage_HT_FormulaSetting_ModifiedSuccessfully
                    } else {
                          setTimeout(() => {
             this.tipchange = true;
                this.move('tip', 'tiphead');
            });
            
                         this.pdyd1 = true;
                         console.log('aaa',this.checkArr)


                        this.tipword = res.data.msg;
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

                        if (this.sesstion.IsEnabled == true) {
                            this.sesstion.IsEnabled = this.lang.MaintenanceManage_Enable
                        } else if (this.sesstion.IsEnabled == false) {
                            this.sesstion.IsEnabled = this.lang.MaintenanceManage_Stop
                        }
                    }
                });
            }
        },

        //确认{{lang.HT_MessageBoxCaption_Tips}}
        tipsQueryFun() {
            this.tipchange = false;
        },
        //添加弹窗初始化
        initPopData(num, dataAll){
            
            this.$axios({
                method: 'post',
                url: `/api/EquipmentAccount/EquipmentAccount_GstEquipment?argDeviceType=${this.deviceType}&argKeyword=${this.keyWord}&argPageIndex=${num}&argPageSize=50`,
                argDeviceType: this.deviceType,
                argKeyword: this.keyWord,
                argPageIndex: num,
                argPageSize: 50
            }).then(res => {
                console.log('设备',res.data.data.DataList)
                dataAll.push(...res.data.data.DataList)

                this.$axios({
                    method: 'post',
                    url: `/api/PointInspectionManage/PointInspectionManage_GstStandard?argDeviceType&argKeyword&argPageSize=50000000&argPageIndex=${num}`,
                    argDeviceType: '',
                    argKeyword: ''
                }).then(res => {
                    
                    var data = res.data.data.DataList;
                    console.log('添加',data)
                    var AIDShow = false;
                    this.EquipmentTypeAll = [];
                    for (let i = 0; i < dataAll.length; i++) {
                        this.typeArr = [];
                        this.SID = [];

                        var value = {
                            DeviceName: dataAll[i].DeviceName,
                            DeviceNo: dataAll[i].DeviceNo,
                            DeviceModel: dataAll[i].DeviceModel,
                            DeviceType: dataAll[i].DetailDeviceType,
                            type: this.typeArr,
                            AID: dataAll[i].AID,
                            value: '',
                            SID: '',
                            SIDValue: ''
                        };

                        //比较AID
                        for (var e = 0; e < data.length; e++) {
                            if (data[e].Devices.length != 0) {
                                for (
                                    var d = 0;
                                    d < data[e].Devices.length;
                                    d++
                                ) {
                                    if (
                                        data[e].Devices[d].AID ==
                                        dataAll[i].AID
                                    ) {
                                        var value1 = {
                                            label: data[e].Name,
                                            value: data[e].Name
                                        };
                                        this.typeArr.push(value1);
                                        var value2 = {
                                            label:
                                                data[e].Projects[0].SID,
                                            value:
                                                data[e].Projects[0].SID
                                        };
                                        this.SID.push(value2);
                                        AIDShow = true;
                                        // break;
                                    }
                                    // else{
                                    //     AIDShow = false
                                    //     this.typeArr = [];
                                    //     this.SID = [];
                                    // }
                                }
                                // if(AIDShow){
                                //     break;
                                // }
                            } else {
                                AIDShow = false;
                                this.typeArr = [];
                                this.SID = [];
                            }
                        }
                        value.type = this.typeArr;
                        value.SID = this.SID;
                        if (this.typeArr.length != 0) {
                            value.value = this.typeArr[0].value;
                            value.SIDValue = this.SID[0].label;
                        }
                        this.AID = value.AID;

                        this.EquipmentTypeAll.push(value);
                    }

                    console.log(
                        'EquipmentTypeAll',
                        this.EquipmentTypeAll
                    );
                })
                .catch(function(error) {
                    console.log('err111111111111111111111', error);
                });
                
                if(res.data.data.ParameterList.NextEnabled){
                    this.initPopData(num+1, dataAll)
                    return 
                }
            })
            .catch(function(error) {
                console.log('err', error);
            });
        },
        // EquipmentTypeName
        addPopAxios() {
            if (this.Meter3id == '11111111-1111-1111-1111-111111111111') {
                this.deviceType = '';
            }
            let dataAll = []
            this.initPopData(1, dataAll)
        },
        //设备管理单选框
        checkFun(item, index) {
            var checkDom = this.$refs.checkipt;
            if (checkDom[index].checked) {
                // this.checkArr.push(item);
                this.checkArr2.push(item)
            } else {
                var a = this.checkArr.indexOf(item);
                // this.checkArr.splice(a, 1);
                 this.checkArr2.splice(a, 1);
            }

            //全选框是否选中
            for (var i = 0; i < checkDom.length; i++) {
                if (checkDom[i].checked) {
                    this.$refs.checkiptAll.checked = true;
                } else {
                    this.$refs.checkiptAll.checked = false;
                    break;
                }
            }
   
        },
        //全选框
        checkAllFun() {
            
            if (this.$refs.checkiptAll.checked) {
                if(this.checkArr.length != 0){
                     this.checkArr2 =  []
                    for(var j=0;j<this.EquipmentTypeAll.length;j++){
                        // this.checkArr.push(this.EquipmentTypeAll[j])
                        this.checkArr2.push(this.EquipmentTypeAll[j])
                    }
                }else{
                    // this.checkArr = this.EquipmentTypeAll;
                    this.checkArr2 = JSON.parse(JSON.stringify(this.EquipmentTypeAll))
                }
                for (let i1 = 0; i1 < this.checkArr2.length; i1++) {
                    // this.checkArr[i1].Number = i1 + 1;
                    this.checkArr2[i1].Number = i1 + 1;
                }
            } else {
                // this.checkArr = this.checkArr11;
                this.checkArr2 = []
            }
            var checkDom = this.$refs.checkipt;
            for (var i = 0; i < checkDom.length; i++) {
                checkDom[i].checked = this.$refs.checkiptAll.checked;
            }
           
        },
        //添加弹窗单选框
        checkFun1(item, index) {
            
            var checkDom = this.$refs.checkipt1;

            if (checkDom[index].checked) {
                this.checkDeleArr.push(index);
            } else {
                var a = this.checkDeleArr.indexOf(index);
                this.checkDeleArr.splice(a, 1);
            }

            //全选框是否选中
            for (var i = 0; i < checkDom.length; i++) {
                if (checkDom[i].checked) {
                    this.$refs.checkiptAll1.checked = true;
                } else {
                    this.$refs.checkiptAll1.checked = false;
                    break;
                }
            }
        },
        select2(a) {
            this.list = a;
        },
        select3(a) {
            this.list = a;
        },
        checkAllFun1() {
            if (this.$refs.checkiptAll1.checked) {
                this.AllShow = true;
            } else {
                this.AllShow = false;
            }

            var checkDom = this.$refs.checkipt1;
            for (var i = 0; i < checkDom.length; i++) {
                checkDom[i].checked = this.$refs.checkiptAll1.checked;
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
        handleNodeClic7(data) {
            this.Meter3 = data.label;
            this.Meter3id = data.NID;

            this.treetrue = false;
            this.deviceType = this.Meter3;
        },

        tip1() {
            this.tipchange = false;
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
            console.log("ss")
            this.change = false;
            this.setionchange = false;
            let ss = JSON.stringify(this.antable);
            this.tableData1 = JSON.parse(ss);
        },

        handleEdit(a, b) {
        
              if(!this.ckshow){
                     setTimeout(() => {
             this.tipchange = true;
                this.move('tip', 'tiphead');
            });
                 this.pdyd1 = true;
                this.tipword = this.lang.NoOperationAuthority;
                return
            }
            this.nowcheck = '';
            this.setionchange = true;
            this.sestion = 1;
            this.disabled = true;
              setTimeout(() => {
            this.addShow = true;
               this.sx1()
                this.move('addPop', 'looktop');
            });
             this.pdyd3 = true;
            b.a = parseInt(b.PeriodStr);
            b.b = parseInt(b.ReminderTimeValue);
            if (b.PeriodUnit == 1) {
                b.PeriodUnit = this.lang.HMI_HT_LineChartWindowViewModel_Hour;
            } else if (b.PeriodUnit == 2) {
                b.PeriodUnit = this.lang.MaintenanceManage_Day;
            } else if (b.PeriodUnit == 3) {
                b.PeriodUnit =this.lang.HMI_HT_LineChartWindowViewModel_Week;
            } else if (b.PeriodUnit == 4) {
                b.PeriodUnit = this.lang.HMI_HT_LineChartWindowViewModel_Month;
            }
            if (b.ReminderTimeUnit == 1) {
                b.ReminderTimeUnit = this.lang.HMI_HT_LineChartWindowViewModel_Hour;
            } else if (b.ReminderTimeUnit == 2) {
                b.ReminderTimeUnit = this.lang.MaintenanceManage_Day;
            } else if (b.ReminderTimeUnit == 3) {
                b.ReminderTimeUnit = this.lang.HMI_HT_LineChartWindowViewModel_Week;
            } else if (b.ReminderTimeUnit == 4) {
                b.ReminderTimeUnit = this.lang.HMI_HT_LineChartWindowViewModel_Month;
            }
            if (b.IsEnabled == false) {
                b.IsEnabled = this.lang.MaintenanceManage_Stop
            } else {
                b.IsEnabled = this.lang.MaintenanceManage_Enable
            }
            let aaa = b.MaturityTime.indexOf('/');
            if (aaa == 0) {
                b.MaturityTime = this.gettime(b.MaturityTime);
            }
            this.$axios({
                method: 'post',
                url: `/api/PointInspectionManage/PointInspectionManage_GstStandard?argDeviceType&argKeyword&argPageSize=50000000&argPageIndex=1`,
                argDeviceType: '',
                argKeyword: ''
            }).then(res => {
                console.log(res)
                console.log(b)
                for (let i = 0; i < res.data.data.DataList.length; i++) {
                    for (let j = 0; j < b.Devices.length; j++) {
                        if (b.Devices[j].SID == res.data.data.DataList[i].ID) {
                            b.Devices[j].Name = res.data.data.DataList[i].Name;
                            for(let a =0;a<res.data.data.DataList[i].Devices.length;a++){
                                if(b.Devices[j].AID==res.data.data.DataList[i].Devices[a].AID){
                                    b.Devices[j].DeviceType = res.data.data.DataList[i].Devices[a].DevicePath
                                }
                            }
                            // b.Devices[j].DeviceType = res.data.data[i].DevicePath;
                        }
                    }
                }
            //                       for(let i=0;b.Devices.length;i++){
            //       b.Devices[i].DeviceType =  b.Devices[i].DetailDeviceType
            // }
           
                this.checkArr = b.Devices;
            });

            this.sesstion = b;
            var startime = moment( this.sesstion.CurrentStartTime)
            var endtime = moment( this.sesstion.CurrentEndTime)
            var jsvalue = endtime.diff(startime,'hours')
            var ss =  this.sesstion.CurrentStartTime.slice(8)
            var ee =  this.sesstion.CurrentEndTime.slice(8)
            var cc = ss == ee
            console.log('jsvalue==>',jsvalue)
           if(cc){
                jsvalue = endtime.diff(startime,'months')
                 this.sesstion.rwtime = jsvalue
                 this.sesstion.rwselect = this.lang.HMI_HT_LineChartWindowViewModel_Month
           }else{
               if(jsvalue % 168 == 0){
                    this.sesstion.rwtime = jsvalue / 168
                    this.sesstion.rwselect = this.lang.HMI_HT_LineChartWindowViewModel_Week
               }else if(jsvalue % 24 == 0){
                    this.sesstion.rwtime = jsvalue / 24
                    this.sesstion.rwselect = this.lang.MaintenanceManage_Day
               }else{
                    this.sesstion.rwtime = jsvalue
                    this.sesstion.rwselect = this.lang.HMI_HT_LineChartWindowViewModel_Hour
               }
           }
        },
        handleEdit2(a, b) {
           
              if(!this.bjshow){
                     setTimeout(() => {
             this.tipchange = true;
                this.move('tip', 'tiphead');
            });
                 this.pdyd1 = true;
                this.tipword = this.lang.NoOperationAuthority;
                return
            }
            this.nowcheck = '';
            this.setionchange = true;
            this.sestion = 2;
            this.disabled = true;
              setTimeout(() => {
            this.addShow = true;
               this.sx1()
                this.move('addPop', 'looktop');
            });
             this.pdyd3 = true;
            b.a = parseInt(b.PeriodStr);
            b.b = parseInt(b.ReminderTimeValue);
         
            if (b.PeriodUnit == 1) {
                b.PeriodUnit = this.lang.HMI_HT_LineChartWindowViewModel_Hour;
            } else if (b.PeriodUnit == 2) {
                b.PeriodUnit = this.lang.MaintenanceManage_Day;
            } else if (b.PeriodUnit == 3) {
                b.PeriodUnit = this.lang.HMI_HT_LineChartWindowViewModel_Week;
            } else if (b.PeriodUnit == 4) {
                b.PeriodUnit = this.lang.HMI_HT_LineChartWindowViewModel_Month;
            }
            if (b.ReminderTimeUnit == 1) {
                b.ReminderTimeUnit = this.lang.HMI_HT_LineChartWindowViewModel_Hour;
            } else if (b.ReminderTimeUnit == 2) {
                b.ReminderTimeUnit = this.lang.MaintenanceManage_Day;
            } else if (b.ReminderTimeUnit == 3) {
                b.ReminderTimeUnit = this.lang.HMI_HT_LineChartWindowViewModel_Week;
            } else if (b.ReminderTimeUnit == 4) {
                b.ReminderTimeUnit = this.lang.HMI_HT_LineChartWindowViewModel_Month;
            }
            if (b.IsEnabled == false) {
                b.IsEnabled = this.lang.MaintenanceManage_Stop
            } else {
                b.IsEnabled = this.lang.MaintenanceManage_Enable
            }
            let aaa = b.MaturityTime.indexOf('/');
            if (aaa == 0) {
                b.MaturityTime = this.gettime(b.MaturityTime);
            }

            this.$axios({
                method: 'post',
                url: `/api/PointInspectionManage/PointInspectionManage_GstStandard?argDeviceType&argKeyword&argPageSize=50000000&argPageIndex=1`,
                argDeviceType: '',
                argKeyword: ''
            }).then(res => {
                
                console.log(res)
                var a = [];
               
                       for (let j = 0; j < b.Devices.length; j++) {
                          let a1 = []
                            for (let z = 0; z < res.data.data.DataList.length; z++) {
                        if (res.data.data.DataList[z].DevicesStr.includes(b.Devices[j].DeviceName)) {
                            let b1 = {}
                             b1.value = res.data.data.DataList[z].Name;
                    b1.ID = res.data.data.DataList[z].ID;
                    b1.label = res.data.data.DataList[z].Name;
                    a1.push(b1);
                        }
                        }
                   a.push(a1)
                   
                }
                 console.log(a)
                for (let i = 0; i < res.data.data.DataList.length; i++) {
                    for (let j = 0; j < b.Devices.length; j++) {
                        b.Devices[j].type = a[j];

                        if (b.Devices[j].SID == res.data.data.DataList[i].ID) {
                            b.Devices[j].Name = res.data.data.DataList[i].Name;
                             for(let a =0;a<res.data.data.DataList[i].Devices.length;a++){
                                if(b.Devices[j].AID==res.data.data.DataList[i].Devices[a].AID){
                                    b.Devices[j].DeviceType = res.data.data.DataList[i].Devices[a].DevicePath
                                }
                            }
                        }
                    }
                }
            //                       for(let i=0;b.Devices.length;i++){
            //       b.Devices[i].DeviceType =  b.Devices[i].DetailDeviceType
            // }
                    console.log(b)
              
                this.checkArr = b.Devices;
                  console.log(this.checkArr)
                this.checkArr1 = b.Devices;
            });
            this.sesstion = b;
                    var startime = moment( this.sesstion.CurrentStartTime)
            var endtime = moment( this.sesstion.CurrentEndTime)
            var jsvalue = endtime.diff(startime,'hours')
            var ss =  this.sesstion.CurrentStartTime.slice(8)
            var ee =  this.sesstion.CurrentEndTime.slice(8)
            var cc = ss == ee
            console.log('jsvalue==>',jsvalue)
           if(cc){
                jsvalue = endtime.diff(startime,'months')
                 this.sesstion.rwtime = jsvalue
                 this.sesstion.rwselect = this.lang.HMI_HT_LineChartWindowViewModel_Month
           }else{
               if(jsvalue % 168 == 0){
                    this.sesstion.rwtime = jsvalue / 168
                    this.sesstion.rwselect = this.lang.HMI_HT_LineChartWindowViewModel_Week
               }else if(jsvalue % 24 == 0){
                    this.sesstion.rwtime = jsvalue / 24
                    this.sesstion.rwselect = this.lang.MaintenanceManage_Day
               }else{
                    this.sesstion.rwtime = jsvalue
                    this.sesstion.rwselect = this.lang.HMI_HT_LineChartWindowViewModel_Hour
               }
           }
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
            this.treetrue = !this.treetrue;
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
        isPositiveInteger(s) {
            //是否为正整数
            var re = /^[0-9]+$/;
            return re.test(s);
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
                    `/api/PointInspectionManage/PointInspectionManage_GstPlan?argDeviceType=${c}&argStartTime=${this.value1}&argEndTime=${this.value2}&argKeyword=${this.keyword}&argPageSize=${this.PageData.PageSize}&argPageIndex=${this.PageData.PageIndex}`
                )
                .then(res => {
                    console.log("this",res)
                    if (res.data.code == 0) {
                        this.tableData1 = res.data.data.DataList;
                         console.log('this.tableData1',this.tableData1)
                        this.PageData = res.data.data.ParameterList;
                        let i = 0;
                        for (i in this.tableData1) {
                            this.tableData1[i].CurrentStartTime = 
                                this.tableData1[i].CurrentStartTime
                             this.tableData1[i].CurrentEndTime =  
                                this.tableData1[i].CurrentEndTime
                             this.tableData1[i].NextStartTime =  
                                this.tableData1[i].NextStartTime
                             this.tableData1[i].NextEndTime =  
                                this.tableData1[i].NextEndTime
                             let a = i;
                            this.tableData1[i].Number = ++a;
                            if (this.tableData1[i].LifeCycleUnit == 1) {
                                this.tableData1[i].LifeCycleValue =
                                    this.tableData1[i].LifeCycleValue + this.lang.HMI_HT_LineChartWindowViewModel_Hour
                            } else if (this.tableData1[i].LifeCycleUnit == 2) {
                                this.tableData1[i].LifeCycleValue =
                                    this.tableData1[i].LifeCycleValue + this.lang.MaintenanceManage_Day
                            } else if (this.tableData1[i].LifeCycleUnit == 3) {
                                this.tableData1[i].LifeCycleValue =
                                    this.tableData1[i].LifeCycleValue + this.lang.HMI_HT_LineChartWindowViewModel_Month
                            } else if (this.tableData1[i].LifeCycleUnit == 4) {
                                this.tableData1[i].LifeCycleValue =
                                    this.tableData1[i].LifeCycleValue + this.lang.HMI_HT_LineChartWindowViewModel_Year
                            }
                            if (this.tableData1[i].ReminderTimeUnit == 1) {
                                this.tableData1[i].ReminderTimeValue =
                                    this.tableData1[i].ReminderTimeValue +
                                    this.lang.HMI_HT_LineChartWindowViewModel_Hour
                            } else if (
                                this.tableData1[i].ReminderTimeUnit == 2
                            ) {
                                this.tableData1[i].ReminderTimeValue =
                                    this.tableData1[i].ReminderTimeValue + this.lang.MaintenanceManage_Day
                            } else if (
                                this.tableData1[i].ReminderTimeUnit == 3
                            ) {
                                this.tableData1[i].ReminderTimeValue =
                                    this.tableData1[i].ReminderTimeValue + this.lang.HMI_HT_LineChartWindowViewModel_Month
                            } else if (
                                this.tableData1[i].ReminderTimeUnit == 4
                            ) {
                                this.tableData1[i].ReminderTimeValue =
                                    this.tableData1[i].ReminderTimeValue + this.lang.HMI_HT_LineChartWindowViewModel_Year
                            }
                           if(this.tableData1[i].IsEnabled){
                               this.tableData1[i].IsEnabled = this.lang.MaintenanceManage_Enable
                           }else{
                               this.tableData1[i].IsEnabled = this.lang.MaintenanceManage_Stop
                           }
                        }
                        console.log('this.tableData1',this.tableData1)
                    } else {
                          setTimeout(() => {
             this.tipchange = true;
                this.move('tip', 'tiphead');
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

                    this.nowpage = this.PageData.PageIndex;
                    let avc = JSON.stringify(this.tableData1);
                    this.antable = JSON.parse(avc);
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
             this.tipchange = true;
                this.move('tip', 'tiphead');
            });
                 this.pdyd1 = true;
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
                         this.pdyd1 = true;
                        return;
                    }
                }
            }

            this.PageData.PageIndex = this.nowpage;
            this.onetable();
        },
        mouseDownHandleelse5(event) {
            event.currentTarget.style.cursor = 'move';
            window.onmousemove = this.mouseMoveHandleelse5;
        },
        mouseMoveHandleelse5(event) {
            this.pdyd3 = false;
            let moveLeft = event.pageX - 550 + 'px';
            let moveTop = event.pageY - 30 + 'px';
            this.$refs.kongtiao5.style.left = moveLeft;
            this.$refs.kongtiao5.style.top = moveTop;
        },
        mouseUpHandleelse5(event) {
            window.onmousemove = null;
            event.currentTarget.style.cursor = 'move';
        },
        mouseDownHandleelse6(event) {
            event.currentTarget.style.cursor = 'move';
            window.onmousemove = this.mouseMoveHandleelse6;
        },
        mouseMoveHandleelse6(event) {
            this.pdyd2 = false;
            let moveLeft = event.pageX - 600 + 'px';
            let moveTop = event.pageY - 30 + 'px';
            this.$refs.kongtiao6.style.left = moveLeft;
            this.$refs.kongtiao6.style.top = moveTop;
        },
        mouseUpHandleelse6(event) {
            window.onmousemove = null;
            event.currentTarget.style.cursor = 'move';
        },
        sad(a) {
            if(!this.cxshow&&a!==1){
                     setTimeout(() => {
             this.tipchange = true;
                this.move('tip', 'tiphead');
            });
                 this.pdyd1 = true;
                this.tipword = this.lang.NoOperationAuthority;
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
                 this.pdyd1 = true;
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
                    `/api/PointInspectionManage/PointInspectionManage_GstPlanInitTime`
                )
                .then(res => {
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
        this.zoom = window.screen.width / 1920 < 0.75 ?  0.75 : window.screen.width / 1920
         let that = this;
         $('body')[0].addEventListener("mousemove",function(){
         
         setTimeout(()=>{
for(let i=0;i<$('.atooltip').length;i++){
    
                $('.atooltip')[i].style.zoom = that.zoom
               
            console.log($('.atooltip')[i].style.zoom )
            }
            })
     })
        this.$axios.post(`/api/UserManage/UserManage_GstUserWithNoPage`).then(res => {
              console.log("ss",res)
              this.useroptions = res.data.data;
          })
      
        this.value1 = this.GMTToStr(this.value1);
        this.value2 = this.GMTToStr(this.value2);
        this.getsetime();
    }
};
</script>

<style lang="scss">

.ysj{
    select {
        background-color: #fff;
    }
    .addEquipment {
        option {
            display: none;
        }
        .el-input--suffix .el-input__inner {
            width: 180px;
            // height: 30px;
            // line-height: 32px;
        }
    }
    .addPop {
        .table_name {
            .el-input--suffix .el-input__inner {
                width: inherit;
                height: 100%;
                // height: 32px;
                // line-height: 32px;
            }
        }

        .inspection_left {
            .el-input--suffix .el-input__inner {
                width: inherit;
                // height: 30px;
                // line-height: 30px;
            }
        }
        .el-select>.el-input{
            height: inherit;
            font-size: inherit;
            .el-input__inner{
                width: 100%!important;
                height: inherit !important;;
            }
        }
    }
    .inspection_right {
        .el-input--suffix .el-input__inner {
            width: inherit;
            height: 100%;
            // height: 32px;
            // line-height: 32px;
        }
    }
}

</style>

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
    z-index: 3000999999;
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
        position: absolute;
        bottom: 20px;
        left: 0;
        right: 0;
        margin: 0 auto;
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
    .addBtn {
        color: #46be05;
        border: 1px solid #46be05;
        box-sizing: border-box;
        width: 120px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        background-color: #fff;
        margin-left: 10px;
        border-radius: 4px;
        font-weight: 600;
        display: inline-block;
        cursor: pointer;
    }
    .deleteBtn {
        color: #fff;

        width: 120px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        background-color: #999999;
        margin-left: 10px;
        border-radius: 4px;
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

    .addEquipment {
        .looktop1 {
            position: absolute;
            width: 100%;
            height: 60px;
        }
        width: 1130px;
        height: 600px;
        background: #eeeeee;
        position: fixed;
        top: 100px;
        left: 500px;
        z-index: 999999999;
        box-shadow: 2px 2px 8px 2px rgba(0, 0, 0, 0.6);
        .i-c {
            margin-top: 12px;
            right: 10px;
            cursor: pointer;
            position: absolute;
            z-index: 1000999999;
            // background-color: #000;
            display: block;
        }
        .head {
            width: 100%;
            height: 60px;
            background: #386df0;
            text-align: center;
            line-height: 60px;
            color: #fff;

            .text {
                font-size: 24px;
            }
        }

        .conter {
            width: 95%;
            height: 440px;
            border: 1px solid #ddd;
            box-sizing: border-box;
            margin: 0 auto;
            background: #f4f4f4;
            margin-top: 15px;

            // .selectword2 {
            //     position: absolute !important;
            //     left: 138px !important;
            //     top: 122px !important;
            //     z-index: 999 !important;
            // }

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

            .conter_title {
                position: relative;
                width: 100%;
                height: 30px;
                margin-top: 15px;
                margin-bottom: 15px;

                .option2 {
                    opacity: 0;
                }

                .conter_ipt {
                    width: 180px;
                    height: 30px;
                }

                .name_text {
                    margin-left: 15px;
                    margin-right: 15px;
                }

                .conter_ipt {
                    width: 180px;
                    height: 30px;
                    margin-left: 15px;
                }
                .conter_btn {
                    display: inline-block;
                    width: 100px;
                    height: 30px;
                    background: #386df0;
                    color: #fff;
                    cursor: pointer;
                    text-align: center;
                    line-height: 30px;
                    border-radius: 4px;
                    margin-left: 15px;
                }
            }
        }
        .conter_middle {
            width: 100%;
            height: 360px;
            background: #fff;
            overflow: auto;

            .middle_title {
                width: 100%;
                height: 40px;
                box-sizing: border-box;
                overflow: hidden;
                line-height: 40px;
                background: #dcf0f9;

                .id {
                    float: left;
                    width: 22%;
                    height: 40px;
                    padding-left: 5px;
                    border-right: 1px solid #ddd;
                }
                .type {
                    float: left;
                    width: 22%;
                    height: 40px;
                    padding-left: 5px;
                    border-right: 1px solid #ddd;
                }
                .typeNum {
                    float: left;
                    width: 22%;
                    height: 40px;
                    padding-left: 5px;
                    border-right: 1px solid #ddd;
                }
                .ipt {
                    float: left;
                    width: 12%;
                    height: 40px;
                    padding-left: 5px;
                    border-right: 1px solid #ddd;
                }
                .name {
                    float: left;
                    width: 22%;
                    height: 40px;
                    padding-left: 5px;
                    border-right: 1px solid #ddd;
                }
            }

            .middle_conter {
                width: 100%;
                height: 40px;
                box-sizing: border-box;
                overflow: hidden;
                line-height: 40px;
                border-bottom: 1px solid #ddd;

                .id {
                    float: left;
                    width: 22%;
                    height: 40px;
                    padding-left: 5px;
                    border-right: 1px solid #ddd;
                }
                .type {
                    float: left;
                    width: 22%;
                    height: 40px;
                    padding-left: 5px;
                    border-right: 1px solid #ddd;
                }
                .typeNum {
                    float: left;
                    width: 22%;
                    height: 40px;
                    padding-left: 5px;
                    border-right: 1px solid #ddd;
                }
                .ipt {
                    float: left;
                    width: 12%;
                    height: 40px;
                    padding-left: 5px;
                    border-right: 1px solid #ddd;
                }
                .name {
                    float: left;
                    width: 22%;
                    height: 40px;
                    padding-left: 5px;
                    border-right: 1px solid #ddd;
                }
            }
        }
        .fool {
            width: 80%;
            height: 40px;
            overflow: hidden;
            margin: 0 auto;
            line-height: 40px;
            margin-top: 13px;

            .fool_cancel {
                float: right;
                margin-left: 15px;
                display: inline-block;
                width: 100px;
                height: 30px;
                border-radius: 4px;
                cursor: pointer;
                text-align: center;
                line-height: 30px;
                font-size: 16px;
                color: #fff;
                background: #999;
            }
            .fool_quer {
                float: right;
                margin-left: 15px;
                display: inline-block;
                width: 100px;
                height: 30px;
                border-radius: 4px;
                cursor: pointer;
                text-align: center;
                line-height: 30px;
                font-size: 16px;
                color: #fff;
                background: #4270e4;
            }
        }
    }

    .addPop {
        width: 1000px;
        height: 760px;
        background: #eeeeee;
        position: fixed;
        top: 150px;
        left: 500px;
        .i-c {
            margin-top: 12px;
            right: 10px;
            cursor: pointer;
            position: absolute;
            z-index: 1000999999;
            // background-color: #000;
            display: block;
        }
        .looktop {
            position: absolute;
            width: 100%;
            height: 60px;
        }
        // margin: auto;
        z-index: 199999999;
        box-shadow: 2px 2px 8px 2px rgba(0, 0, 0, 0.6);

        .TipsPop {
            width: 380px;
            height: 200px;
            box-shadow: 2px 2px 8px 2px rgba(0, 0, 0, 0.6);
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: #fff;
            margin: auto;

            .head {
                width: 100%;
                height: 40px;
                background: #ffbc3d;
                text-align: center;
                line-height: 40px;
                color: #fff;
                font-size: 16px;
                font-weight: bold;
            }
            .conter {
                width: 80%;
                height: 120px;
                margin: auto;
                padding-top: 20px;
                box-sizing: border-box;
            }
            .fool {
                width: 100%;
                height: 40px;
                overflow: hidden;

                .queryBtn {
                    width: 80%;
                    height: 30px;
                    margin: 0 auto;
                    border-radius: 4px;
                    line-height: 30px;
                    text-align: center;
                    cursor: pointer;
                    background: #f3e3ad;
                    color: #ea9328;
                }
            }
        }

        .head {
            width: 100%;
            height: 60px;
            background: #386df0;
            text-align: center;
            line-height: 60px;
            color: #fff;

            .text {
                font-size: 24px;
            }
        }
        .form-block {
            display: flex;
            width: 50%;
            height: 100%;
        }

        .addPop_table {
            width: 85%;
            margin: 0 auto;
            height: 346px;

            .table_name {
                margin-top: 15px;
                width: 100%;
                height: 35px;
                // overflow: hidden;
                display: flex;
                .name_text {
                    font-size: 16px;
                    display: inline-block;
                    width: 100px;
                    text-align: left;
                    margin-right: 15px;
                }
                .name_ipt {
                    width: 280px;
                    height: 30px;
                    line-height: 30px;
                }
                .porper_text {
                    margin-right: 15px;
                    display: inline-block;
                    width: 115px;
                    // margin-left: 37px;
                    text-align: left;
                }
                .time_text {
                    margin-right: 15px;
                    width: 115px;
                    // margin-left: 100px;
                    text-align: left;
                    display: inline-block;
                }
            }

            .table_name1 {
                margin-top: 35px;
            }

            .table_inspection {
                margin-top: 15px;
                width: 100%;
                height: 40px;
                // overflow: hidden;
                // line-height: 35px;
                display: flex;
                align-items: center;
                .inspection_left {
                    display: flex;
                    // width: 50%;
                    height: 100%;
                    flex: 1;
                    .name_text {
                        font-size: 16px;
                        display: inline-block;
                        width: 100px;
                        text-align: left;
                        margin-right: 15px;
                        
                    }

                    .name_ipt {
                        width: 180px;
                        height: 30px;
                    }
                }

                .inspection_right {
                    display: flex;
                    width: 50%;
                    height: 100%;
                    flex: 1;
                    .time_text {
                        width: 115px;
                        // margin-left: 100px;
                        text-align: left;
                        display: inline-block;
                        margin-right: 15px;
                    }
                    .name-text {
                        width: 115px;
                        margin-right: 15px;
                        // margin-left: 17px;
                        text-align: left;
                    }
                }
            }

            .inspection_ipt {
                margin-top: 15px;
                width: 100%;
                height: 90px;
                .inspection_left {
                    display: inline-block;
                    width: 80px;
                    height: 90px;
                    vertical-align: middle;

                    .name_text {
                        display: inline-block;
                        width: 100px;
                        text-align: left;
                        margin-right: 15px;
                    }
                }
                .inspection_right {
                    display: inline-block;

                    .inspecion_ipt {
                        height: 90px;
                        width: 720px;
                        position: relative;
                        left: 36px;
                    }
                }
            }
            .inspection_btn {
                width: 100%;
                height: 30px;
                margin-top: 15px;

                .addBtn {
                    margin-left: 15px;
                    display: inline-block;
                    width: 100px;
                    height: 30px;
                    border-radius: 4px;
                    cursor: pointer;
                    text-align: center;
                    line-height: 30px;
                    font-size: 16px;
                    color: #fff;
                    background: #4270e4;
                }

                .deleteBtn {
                    margin-left: 15px;
                    display: inline-block;
                    width: 100px;
                    height: 30px;
                    border-radius: 4px;
                    cursor: pointer;
                    text-align: center;
                    line-height: 30px;
                    font-size: 16px;
                    color: #fff;
                    background: #aaaaaa;
                }
                .topBtn {
                    margin-left: 15px;
                    display: inline-block;
                    width: 100px;
                    height: 30px;
                    border-radius: 4px;
                    cursor: pointer;
                    text-align: center;
                    line-height: 30px;
                    font-size: 16px;
                    color: #fff;
                    background: #fda100;
                }
                .bottomBtn {
                    margin-left: 15px;
                    display: inline-block;
                    width: 100px;
                    height: 30px;
                    border-radius: 4px;
                    cursor: pointer;
                    text-align: center;
                    line-height: 30px;
                    font-size: 16px;
                    color: #fff;
                    background: #fda100;
                }
            }
        }
        .list_title > div {
            height: 50px !important;
        }
        .addPop_list {
            width: 85%;
            height: 265px;
            margin: 0 auto;
            overflow: auto;
            background: #fff;

            .list_title {
                overflow: hidden;
                width: 980px;
                height: 50px;
                position: sticky;
                top: 0;
                z-index: 100999999;

                .ipt {
                    float: left;
                    width: 8%;
                    height: 40px;
                    line-height: 40px;
                    background: #dcf0f9;
                    color: #6d94ea;
                    padding-left: 5px;
                    box-sizing: border-box;
                    border-right: 1px solid #ddd;
                }
                .id {
                    float: left;
                    width: 12%;
                    height: 40px;
                    line-height: 40px;
                    background: #dcf0f9;
                    color: #6d94ea;
                    padding-left: 5px;
                    box-sizing: border-box;
                    border-right: 1px solid #ddd;
                }
                .num {
                    float: left;
                    width: 20%;
                    height: 40px;
                    line-height: 40px;
                    background: #dcf0f9;
                    color: #6d94ea;
                    padding-left: 5px;
                    box-sizing: border-box;
                    border-right: 1px solid #ddd;
                }
                .name {
                    float: left;
                    float: left;
                    width: 15%;
                    height: 40px;
                    line-height: 40px;
                    background: #dcf0f9;
                    color: #6d94ea;
                    padding-left: 5px;
                    box-sizing: border-box;
                    border-right: 1px solid #ddd;
                }
                .type {
                    float: left;
                    float: left;
                    width: 15%;
                    height: 40px;
                    line-height: 40px;
                    background: #dcf0f9;
                    color: #6d94ea;
                    padding-left: 5px;
                    box-sizing: border-box;
                    border-right: 1px solid #ddd;
                }
                .typeNum {
                    float: left;
                    float: left;
                    width: 15%;
                    height: 40px;
                    line-height: 40px;
                    background: #dcf0f9;
                    color: #6d94ea;
                    padding-left: 5px;
                    box-sizing: border-box;
                    border-right: 1px solid #ddd;
                }
                .setType {
                    float: left;
                    float: left;
                    width: 15%;
                    height: 40px;
                    line-height: 40px;
                    background: #dcf0f9;
                    color: #6d94ea;
                    padding-left: 5px;
                    box-sizing: border-box;
                    border-right: 1px solid #ddd;
                }
            }
            .list_conter {
                overflow: hidden;
                width: 980px;
                height: 40px;
                border-bottom: 1px solid #ddd;
                box-sizing: border-box;

                .ipt {
                    float: left;
                    width: 8%;
                    height: 40px;
                    line-height: 40px;
                    background: #fff;
                    color: #000;
                    padding-left: 5px;
                    box-sizing: border-box;
                    border-right: 1px solid #ddd;
                }
                .id {
                    float: left;
                    width: 12%;
                    height: 40px;
                    line-height: 40px;
                    background: #fff;
                    color: #000;
                    padding-left: 5px;
                    box-sizing: border-box;
                    border-right: 1px solid #ddd;
                }
                .num {
                    float: left;
                    width: 20%;
                    height: 40px;
                    line-height: 40px;
                    background: #fff;
                    color: #000;
                    padding-left: 5px;
                    box-sizing: border-box;
                    border-right: 1px solid #ddd;
                }
                .name {
                    float: left;
                    float: left;
                    width: 15%;
                    height: 40px;
                    line-height: 40px;
                    background: #fff;
                    color: #000;
                    padding-left: 5px;
                    box-sizing: border-box;
                    border-right: 1px solid #ddd;
                }
                .type {
                    float: left;
                    float: left;
                    width: 15%;
                    height: 40px;
                    line-height: 40px;
                    background: #fff;
                    color: #000;
                    padding-left: 5px;
                    box-sizing: border-box;
                    border-right: 1px solid #ddd;
                }
                .typeNum {
                    float: left;
                    float: left;
                    width: 15%;
                    height: 40px;
                    line-height: 40px;
                    background: #fff;
                    color: #000;
                    padding-left: 5px;
                    box-sizing: border-box;
                    border-right: 1px solid #ddd;
                }
                .setType {
                    float: left;
                    float: left;
                    width: 15%;
                    height: 40px;
                    line-height: 40px;
                    background: #fff;
                    color: #000;
                    padding-left: 5px;
                    box-sizing: border-box;
                    border-right: 1px solid #ddd;
                }
            }
        }
        .addPop_fool {
            width: 80%;
            height: 40px;
            overflow: hidden;
            margin: 0 auto;
            line-height: 40px;
            margin-top: 13px;

            .fool_cancel {
                float: right;
                margin-left: 15px;
                display: inline-block;
                width: 100px;
                height: 30px;
                border-radius: 4px;
                cursor: pointer;
                text-align: center;
                line-height: 30px;
                font-size: 16px;
                color: #fff;
                background: #999;
            }
            .fool_quer {
                float: right;
                margin-left: 15px;
                display: inline-block;
                width: 100px;
                height: 30px;
                border-radius: 4px;
                cursor: pointer;
                text-align: center;
                line-height: 30px;
                font-size: 16px;
                color: #fff;
                background: #4270e4;
            }
        }
    }
    input[type='checkbox'] {
        top: -1px;
        left: 0;
        width: 24px;
        height: 24px;
        display: inline-block;
        text-align: center;
        vertical-align: middle;
        line-height: 24px;
        z-index: 11999999;
        position: relative;
        outline: none;
        -webkit-appearance: none;
        border: 1px solid #b0b0b0;
        // -webkit-tab-highlight-color: rgba(0,0,0,0);
        color: #fff;
        // background: #DEDEDE;
    }
    input[type='checkbox']:after {
        position: absolute;
        width: 24px;
        height: 24px;
        top: -1px;
        left: -1px;
        content: ' ';
        display: inline-block;
        visibility: visible;
        text-align: center;
        line-height: 24px;
    }
    input[type='checkbox']:checked:after {
        //   font-family: "iconfont";
        content: '✓';
        font-size: 14px;
        // background-color:#fff;
        border: none;
        font-weight: bold;
        color: #99d276;
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
    z-index: 1229999999;
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
            z-index: 5099999;
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
.cover7 {
    width: 100%;
    height: 100%;
    z-index: 200999999;
    position: fixed;
    top: 0;
    left: 0;
}
.cover6 {
    width: 100%;
    height: 100%;
    z-index: 190999999;
    position: fixed;
    top: 0;
    left: 0;
}
.nowcheck {
    background-color: rgb(217, 229, 243) !important;
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
.a::before{
    color: #000 !important;
}
.showtext{
    position: absolute;
    top: 200px;
    left: 475px;
    cursor: pointer;
}
.showtext1{
    cursor: pointer;
    position: absolute;
    top: 150px;
    left: 475px;
}
   .is1 {
        display: inline-block;
        // position: absolute;
        width: 300px;
        // overflow: hidden;
        height: 32px;
        input {
            position: relative;
            top: 1px;
            float: left;
            height: 30px;
            width: 180px;
        }
        .sl1 {
            // width: 100px;
            // height: 30px;
            float: left;
            .el-input__inner{
                width: inherit !important;
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
    border: 1px solid rgb(244, 244, 244);
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
    top: 3px;
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
    top: 34px !important;
    left: 94px !important;
}
.sblx{
    display:inline-block;
}
</style>

