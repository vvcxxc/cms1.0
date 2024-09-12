<!--
 * @Description:易损件管理易损件台帐界面
 * @Date: 2019-11-25 19:07:09
 * @Author: 随风
 * @LastEditors: Tao
 * @LastEditTime: 2020-10-14 18:24:12
 -->
<template>
    <div class="public-table" @click=" changeselect = false">
        <!-- 测试模块 -->
        <!-- <div style="position: fixed;z-index: 99;left: 0;top: 0;background: green;padding: 10px;">
            <button @click="addInfo">添加</button><br>
            <button @click="createDeviceShow('create')">添加新</button><br>
            <button @click="createDeviceCallback('cancel')">隐藏新</button><br>
            <button class="file">
                导入
                <input
                @click="dr($event)"
                    type="file"
                    ref="upload"
                    accept=".xls, .xlsx"
                    class="outputlist_upload"
                    @change="readExcel"
                />
            </button>
            <button @click="exportTable">导出</button><br>
        </div> -->

        <div class="loadcover" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.4)"  v-loading="this.$store.state.isShow" v-show="this.$store.state.isShow" style="position: absolute;width: 100%;height: 100%;top: 0;left: 0;"></div>
        <div class="selectvar selectvar3" ref="kongtiao3" v-show="yx" :style="{width:1120*a11+'px',height:600*a11+'px'}">
            <div
                class="selectvartop"
                :style="{height:60*a11+'px',lineHeight:60*a11+'px',fontSize:18*a11+'px'}" 
            ></div>
            <div class="selectvarhead"   :style="{height:60*a11+'px',lineHeight:60*a11+'px',fontSize:18*a11+'px'}"     :class="[{colordiv:$store.state.color=='grey'},{fcolor:$store.state.color=='grey'}]">
                {{lang.CruxParameterConfigure_SelectVariable_SelectionVariables}}
                <img :src="no" alt  :style="{width:24*a11+'px',height:24*a11+'px'}" />
                  <img
                    :src="no2"
                    alt
                    class="no"
                    @click.stop="varcancel"
                    v-if="$store.state.color=='grey'"
                />
                <img :src="no" alt class="no" @click.stop="varcancel" :style="{width:24*a11+'px',height:24*a11+'px'}" v-else />
            </div>
            <div class="selectvarcontent"  :style="{paddingTop:30*a11+'px'}">
                <div class="selecectvarselect"  :style="{width:1000*a11+'px',height:436*a11+'px'}">
                    <div class="search"  :style="{zoom:a11}">
                        <span>{{lang.FormulaManage_AddProject_DeviceName}}</span>
                        <select name id v-model="oneselect1">
                            <option
                                v-for="(item,index) in projectlist"
                                :key="index"
                                :value="item.DeviceName"
                            >{{item.DisplayDeviceName}}</option>
                        </select>
                        <span>{{lang.FormulaManage_AddProject_VariableGroup}}</span>
                        <select name id v-model="twoselect1">
                            <option
                                v-for="(item,index) in projectlist2"
                                :key="index"
                                :value="item.GroupName"
                            >{{item.GroupName}}</option>
                        </select>
                        <span>{{lang.FormulaManage_AddProject_VariableType}}</span>
                        <select name id v-model="threeselect1">
                            <option
                                v-for="(item,index) in projectlist3"
                                :key="index"
                                :value="item.Value"
                            >{{item.Text}}</option>
                        </select>
                        <input type="text" :placeholder="lang.AlarmRecord_Time_Keyword" v-model="selectvarword" />
                        <span class="selectvarfor" @click="lookforsearch2">{{lang.RoleManage_Query}}</span>
                    </div>
                    <div class="selectvartable" :style="{height:320*a11+'px',width:950*a11+'px'}">
                        <el-table
                            :data="selecttabledata"
                            height="100%"
                            border
                              @row-click="handleRowChange5"
                            style="width: 100%"
                             :style="{ fontSize: a11 * 15 + 'px', width: '100%' }"
                 :row-style="{ height: 50 * a11 + 'px' }"
                 :header-cell-style="{
                    background:
                        $store.state.color == 'grey' ? '#D9DBDE' : '#E1EDFA',
                    color: $store.state.color == 'grey' ? '#000' : '#769DE7',
                    'border-left': '1px solid #cccccc',
                    height: 50 * a11 + 'px',
                    padding: '0'
                }"
                               highlight-current-row
                                  
                        >
                            <template slot="empty">
                                <span>{{lang.SCMSConsoleWebApiMySql_NoData}}</span>
                            </template>
                            <el-table-column prop="Device" :label="lang.FormulaManage_AddProject_DataGrid_DeviceName" :width="180*a11"></el-table-column>
                            <el-table-column prop="DateType" :label="lang.FormulaManage_AddProject_DataGrid_VariableType" :width="180*a11"></el-table-column>
                            <el-table-column prop="Name" :label="lang.FormulaManage_AddProject_DataGrid_Name" :width="180*a11"></el-table-column>
                            <el-table-column prop="Descript" :label="lang.FormulaManage_AddProject_DataGrid_Describe" :width="180*a11"></el-table-column>
                            <el-table-column prop="Address" :label="lang.FormulaManage_AddProject_DataGrid_VariableAddress" :width="280*a11"></el-table-column>
                        </el-table>
                    </div>
                    <div class="selectvarpage" :style="{zoom:a11}">
                        <div class="pageword">
                            {{lang.DataGrid_Reaction_HT_ATotalOf}}
                            <span>{{ PageData1.TotalCount}}</span>{{lang.DataGrid_Reaction_HT_RecordsAndTheCurrent}}
                            <span>{{ PageData1.PageIndex}}</span>{{lang.DataGrid_Reaction_HT_Page}}
                            <span>{{ PageData1.TotalPage}}</span>{{lang.DataGrid_Reaction_HT_RecordsAnd}}
                            <span>{{ PageData1.PageSize}}</span>{{lang.DataGrid_Reaction_HT_PerPage}}
                        </div>
                        <div class="pageoperation">
                            <span class="btn" @click="start1">{{lang.DataGrid_Reaction_FirstPage}}</span>
                            <span
                                class="btn"
                                @click="prev1"
                                :class="{nopage:!PageData1.LastEnabled}"
                            >{{lang.DataGrid_Reaction_LastPage}}</span>
                     
                            <span
                                class="btn"
                                @click="next1"
                                :class="{nopage:!PageData1.NextEnabled}"
                            >{{lang.DataGrid_Reaction_NextPage}}</span>

                            <span class="btn" @click="end1">{{lang.DataGrid_Reaction_EndPage}}</span>
                            <div class="inputnumber">
                                {{lang.DataGrid_Reaction_The}}
                                <input type="text" v-model="nowpage1" /> {{lang.DataGrid_Reaction_Page}}
                            </div>

                            <span class="btn" @click="jump1">{{lang.DataGrid_Reaction_TurnPage}}</span>
                        </div>
                    </div>
                </div>
                <div class="cancel" :style="{zoom:a11}" @click.stop="varcancel">{{lang.PopupCommon_Cancel}}</div>
                <div class="pre" :style="{zoom:a11}" @click.stop="varpre">{{lang.PopupCommon_Save}}</div>
            </div>
        </div>
        <div class="look wantlook"  v-show="ischange">
            <div
                class="looktop"
                :style="{height:60*a11+'px'}"
            ></div>
            <div class="lookhead"  >
                <span v-if="iswant == 1">{{lang.VulnerablePartManage_ReplaceDevice}}</span>
                <span v-if="iswant == 2">{{lang.VulnerablePartManage_ExtendDeviceLife}}</span>
                <img :src="no" alt @click="cancel" />
            </div>
            <div class="lookcontent" v-if="iswant == 1">
                <div class="wantdiv">
                    <span class="wantsp">{{lang.EquipmentAccount_StartDate}}</span>
                    <div class="div1">
                        <template>
                            <div class="block">
                                <el-date-picker
                                    v-model="wanttime"
                                    type="datetime"
                                    :placeholder="lang.SCMSConsoleWebApiMySql_PleChooseDate"
                                    value-format="yyyy-MM-dd HH:mm:ss"
                                ></el-date-picker>
                            </div>
                        </template>
                    </div>
                </div>
                <div class="wantdiv">
                    <span class="wantsp ss">{{lang.MaintenanceManage_Remark}}</span>
                    <textarea name id cols="30" rows="10" :placeholder="lang.VulnerablePartManage_RemarkDescription" v-model="vrmark"></textarea>
                </div>
                <div class="pre" @click="gpre">{{lang.PopupCommon_Save}}</div>
                <div class="cancel" @click="cancel">{{lang.PopupCommon_Cancel}}</div>
            </div>

            <!-- 延长器件寿命-弹窗内容 -->
            <div class="lookcontent" v-if="iswant == 2">
                <div class="wantdiv">
                    <span class="wantsp">{{lang.VulnerablePartManage_TimeExpand}}</span>
                    <div class="div1">
                        <input type="text" v-model="timevalue" />
                        <select name id v-model="sss" class="nans">
                            <option
                                v-for="(item,index) in ['小时', '天', '月', '年', '次']"
                                :key="index"
                                :value="item"
                            >{{item}}</option>
                        </select>
                    </div>
                </div>
                <div class="wantdiv">
                    <span class="wantsp ss">{{lang.MaintenanceManage_Remark}}</span>
                    <textarea name id cols="30" rows="10" :placeholder="lang.VulnerablePartManage_RemarkDescription" v-model="vrmark"></textarea>
                </div>
                <div class="pre" @click="prolongDeviceLife">{{lang.PopupCommon_Save}}</div>
                <div class="cancel" @click="cancel">{{lang.PopupCommon_Cancel}}</div>
            </div>


        </div>
        <div class="look look222" ref="kongtiao5" v-show="offdecive" @click="selectword3 = false"  :style="{width:1120*a11+'px',height:600*a11+'px'}">
            <div
                class="looktop"
                 :style="{height:60*a11+'px'}"
            ></div>
            <div class="lookhead"  :style="{height:60*a11+'px',lineHeight:60*a11+'px',fontSize:18*a11+'px'}"   :class="[{colordiv:$store.state.color=='grey'},{fcolor:$store.state.color=='grey'}]">
                {{lang.VulnerablePartManage_AddDevice}}
                  <img
                    :src="no2"
                    alt
                    class="no"
                    @click="cancel11"
                    :style="{width:24*a11+'px',height:24*a11+'px'}"
                    v-if="$store.state.color=='grey'"
                />
                <img    :style="{width:24*a11+'px',height:24*a11+'px'}" :src="no" alt class="no" @click="cancel11" v-else />
            </div>
            <div class="lookcontent" :style="{paddingTop:30*a11+'px'}">
                <div class="lookselect" :style="{width:1000*a11+'px',height:436*a11+'px'}">
                    <div class="search" :style="{zoom:a11}">
                        <span class="sblx1">{{lang.EquipmentAccount_EquipmentType1}}</span>
                                         <div class="seleword2" @click.stop="selectword2">
             <div class="seleword1">
                  {{oneselect}}
               <img :src="xiala" alt />
             </div>
            </div>
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
                        <input type="text " class="tinput1" :placeholder="lang.AlarmRecord_Time_Keyword" v-model="projectkeyword" />
                        <span class="lookfor1" @click="lookforsearch">{{lang.RoleManage_Query}}</span>
                    </div>
                    <div class="table" :style="{height:340*a11+'px'}">
                        <el-table
                            :data="projectlistdata"
                            height="100%"
                            border
                            style="width: 100%"
                            @row-click="handleRowChange1"
                            highlight-current-row
                                                  :style="{ fontSize: a11 * 15 + 'px', width: '100%' }"
                 :row-style="{ height: 50 * a11 + 'px' }"
                 :header-cell-style="{
                    background:
                        $store.state.color == 'grey' ? '#D9DBDE' : '#E1EDFA',
                    color: $store.state.color == 'grey' ? '#000' : '#769DE7',
                    'border-left': '1px solid #cccccc',
                    height: 50 * a11 + 'px',
                    padding: '0'
                }"
                        >
                            <template slot="empty">
                                <span>{{lang.SCMSConsoleWebApiMySql_NoData}}</span>
                            </template>
                            <el-table-column prop="DeviceName" :label="lang.EquipmentAccount_EquipmentName"></el-table-column>
                            <el-table-column prop="DeviceNo" :label="lang.EquipmentAccount_EquipmentNumber"></el-table-column>
                            <el-table-column prop="DevicePath" :label="lang.EquipmentAccount_EquipmentType"></el-table-column>
                            <el-table-column prop="DeviceModel" :label="lang.EquipmentAccount_EquipmentModel"></el-table-column>
                        </el-table>
                    </div>
                </div>
            </div>
            <div class="cancel cancel11" @click="cancel11" :style="{zoom:a11}">{{lang.PopupCommon_Cancel}}</div>
            <div class="pre" @click="pre1" :style="{zoom:a11}">{{lang.PopupCommon_Sure}}</div>
        </div>
        <div class="search-container" :style="{zoom:a11}">
            <div>
                <span class="sblx">{{lang.EquipmentAccount_EquipmentType1}}</span>
                   <div class="seleword" @click.stop="selectword1">
             <div class="seleword1">
                  {{Meter}}
               <img :src="xiala" alt />
             </div>
            </div>
                <span class="spge tinput">{{lang.VulnerablePartManage_ChangeDateRange}}</span>

                <el-date-picker
                    v-model="value1"
                    @focus='sx()'
                    type="datetime"
                    :placeholder="lang.SCMSConsoleWebApiMySql_PleChooseDate"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    :style="{width:'220px'}"
                ></el-date-picker>
                <span class="demonstration">-</span>
                <el-date-picker
                    v-model="value2"
                     @focus='sx()'
                    type="datetime"
                    :placeholder="lang.SCMSConsoleWebApiMySql_PleChooseDate"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    :style="{width:'220px'}"
                ></el-date-picker>
                <input type="text" :placeholder="lang.AlarmRecord_Time_Keyword" v-model="keyword" />
                <div class="sad" @click="sad">{{lang.RoleManage_Query}}</div>
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
            <div class="myd">
                <!-- <div class="add" @click="addInfo">{{lang.RoleManage_Add}}</div> -->
                <div class="add" @click="createDeviceShow('create')">{{lang.RoleManage_Add}}</div>
                <div class="move" @click="del">{{lang.RoleManage_Delete}}</div>
                <div class="import">
                    <a href="javascript:;" class="file">
                        {{lang.QualityManage_SampleChoseUserControl_Import}}
                        <input
                         @click="dr($event)"
                            type="file"
                            ref="upload"
                            accept=".xls, .xlsx"
                            class="outputlist_upload"
                            @change="readExcel"
                        />
                    </a>
                </div>
                <div class="export" @click="exportTable">{{lang.QualityManage_SampleChoseUserControl_Export}}</div>
            </div>
        </div>
        <div class="table-container table-container1">
            <el-table
                ref="multipleTable"
                :data="tableData1"
                stripe
                height="100%"
                tooltip-effect="dark"
              
                @select="select3"
                @select-all="select2"
                   border
                  highlight-current-row
                :style="{ fontSize: a11 * 15 + 'px', width: '100%' }"
                 :row-style="{ height: 50 * a11 + 'px' }"
             :header-cell-style="{
                    background:
                        $store.state.color == 'grey' ? '#D9DBDE' : '#5a6c98',
                    color: $store.state.color == 'grey' ? '#000' : '#fff',
                    'border-left': '1px solid #cccccc',
                    height: 50 * a11 + 'px',
                    padding: '0'
                }"
            >
                <template slot="empty">
                    <span>{{lang.SCMSConsoleWebApiMySql_NoData}}</span>
                </template>
                <el-table-column type="selection" :width="a11>1?60*a11:60" fixed></el-table-column>
                <el-table-column :label="lang.AlarmRecord_HT_AlarmPointManageUC_SerialNumber" :width="lang.AlarmRecord_HT_AlarmPointManageUC_SerialNumber=='Serial number'?145*a11:100*a11" prop="Number" fixed>
                    <template slot-scope="scope">
                        <div class="item">
                            <span
                                class="sad"
                                v-if="scope.row.TaskType == lang.RepairManage_FaultRepair"
                            >{{scope.row.Number}}</span>
                            <span v-else>{{scope.row.Number}}</span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="name" :label="lang.RoleManage_Operation" :width="320*a11" fixed>
                    <template slot-scope="scope">
                        <div
                            v-if="scope.row.Status == lang.SCMSConsoleWebApiMySql_Reminded"
                            class="img"
                              :style="{zoom:a11}"
                            @click="handleEdit7(scope.$index, scope.row) "
                        >{{lang.VulnerablePartManage_Change}}</div>
                        
                        <!-- 延长器件寿命-显示弹窗 -->
                        <!-- @click="handleEdit8(scope.$index, scope.row)" -->
                        <div
                            v-if="scope.row.Status == lang.SCMSConsoleWebApiMySql_Reminded"
                            class="img"
                            :style="{zoom:a11}"
                            @click="prolongDeviceLifeShow('show', scope.row)"
                        >{{lang.VulnerablePartManage_Extend}}</div>

                        <div class="img" @click="createDeviceShow('check', scope.row, scope.$index)"   :style="{zoom:a11}">
                            <img :src="look" alt />
                            {{scope.row.phone}}
                        </div>
                        <div class="img" @click="createDeviceShow('edit', scope.row, scope.$index)"   :style="{zoom:a11}">
                            <img :src="pensoil" alt />
                            {{scope.row.phone}}
                        </div>
                        <!-- <div class="img" @click="checkInfo(scope.$index, scope.row)"   :style="{zoom:a11}">
                            <img :src="look" alt />
                            {{scope.row.phone}}
                        </div>
                        <div class="img" @click="editInfo(scope.$index, scope.row)"   :style="{zoom:a11}">
                            <img :src="pensoil" alt />
                            {{scope.row.phone}}
                        </div> -->
                    </template>
                </el-table-column>

                <el-table-column
                    prop="VulnerablePartName"
                    :label="lang.EquipmentAccount_VulnerablePartName"
                    :width="200*a11"
                    fixed
                    show-overflow-tooltip
                >
                    <template slot-scope="scope">
                        <div class="item">
                            <span
                                class="sad"
                                v-if="scope.row.TaskType == lang.RepairManage_FaultRepair"
                            >{{scope.row.TaskName}}</span>
                            <span v-else>{{scope.row.VulnerablePartName}}</span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="VulnerablePartNo"
                    :label="lang.EquipmentAccount_VulnerablePartNo"
                    :width="200*a11"
                    show-overflow-tooltip
                >
                    <template slot-scope="scope">
                        <div class="item">
                            <span
                                class="sad"
                                v-if="scope.row.TaskType == lang.RepairManage_FaultRepair"
                            >{{scope.row.TaskType}}</span>
                            <span v-else>{{scope.row.VulnerablePartNo}}</span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="UsingDevice" :label="lang.EquipmentAccount_UsingDevice" :width="200*a11" show-overflow-tooltip>
                    <template slot-scope="scope">
                        <div class="item">
                            <span
                                class="sad"
                                v-if="scope.row.TaskType == lang.RepairManage_FaultRepair"
                            >{{scope.row.StartTime}}</span>
                            <span v-else>{{scope.row.UsingDevice}}</span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="VulnerablePartModel"
                    :label="lang.EquipmentAccount_VulnerablePartModel"
                    :width="200*a11"
                    show-overflow-tooltip
                >
                    <template slot-scope="scope">
                        <div class="item">
                            <span
                                class="sad"
                                v-if="scope.row.TaskType == lang.RepairManage_FaultRepair"
                            >{{scope.row.EndTime}}</span>
                            <span v-else>{{scope.row.VulnerablePartModel}}</span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="MaturityTime" :label="lang.EquipmentAccount_MaturityTime" :width="300*a11" show-overflow-tooltip>
                    <template slot-scope="scope">
                        <div class="item">
                            <span
                                class="sad"
                                v-if="scope.row.TaskType == lang.RepairManage_FaultRepair"
                            >{{scope.row.Status}}</span>
                            <span v-else>{{scope.row.MaturityTime}}</span>
                        </div>
                    </template>
                </el-table-column>

                <!-- 剩余寿命 -->
                <el-table-column prop="ResidualLife" :label="lang.EquipmentAccount_ResidualLife" :width="300*a11" show-overflow-tooltip>
                    <template slot-scope="scope">
                        <div class="item">
                            <span 
                                :class="scope.row.TaskType === lang.RepairManage_FaultRepair ? 'sad' : ''"
                            >{{ scope.row.ResidualLife }}</span>
                        </div>
                    </template>
                </el-table-column>


                <el-table-column prop="EnableTime" :label="lang.EquipmentAccount_StartDate" :width="300*a11" show-overflow-tooltip>
                    <template slot-scope="scope">
                        <div class="item">
                            <span
                                class="sad"
                                v-if="scope.row.TaskType == lang.RepairManage_FaultRepair"
                            >{{scope.row.DeviceName}}</span>
                            <span v-else>{{scope.row.EnableTime}}</span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="LifeCycleValue"
                    :label="lang.EquipmentAccount_LifeCycle"
                    :width="300*a11"
                    show-overflow-tooltip
                >
                    <template slot-scope="scope">
                        <div class="item">
                            <span
                                class="sad"
                                v-if="scope.row.TaskType == lang.RepairManage_FaultRepair"
                            >{{scope.row.DeviceName}}</span>
                            <span v-else>{{scope.row.LifeCycleValue}}</span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="TimerType" label="统计类型" :width="300*a11" show-overflow-tooltip>
                    <template slot-scope="scope">
                        <div class="item">
                            <span
                                class="sad"
                                v-if="scope.row.TaskType == lang.RepairManage_FaultRepair"
                            >{{scope.row.DeviceName}}</span>
                            <span v-else>{{scope.row.TimerType}}</span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="RunningSignal"
                    label="统计信号"
                    :width="300*a11"
                    show-overflow-tooltip
                >
                    <template slot-scope="scope">
                        <div class="item">
                            <span
                                class="sad"
                                v-if="scope.row.TaskType == lang.RepairManage_FaultRepair"
                            >{{scope.row.DeviceName}}</span>
                            <span v-else>{{scope.row.RunningSignal}}</span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="ReminderTimeValue"
                    :label="lang.EquipmentAccount_AdvanceReminder"
                    :width="300*a11"
                    show-overflow-tooltip
                >
                    <template slot-scope="scope">
                        <div class="item">
                            <span
                                class="sad"
                                v-if="scope.row.TaskType == lang.RepairManage_FaultRepair"
                            >{{scope.row.DeviceName}}</span>
                            <span v-else>{{scope.row.ReminderTimeValue}}</span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="Executor" :label="lang.EquipmentAccount_Executor" :width="300*a11" show-overflow-tooltip>
                    <template slot-scope="scope">
                        <div class="item">
                            <span
                                class="sad"
                                v-if="scope.row.TaskType == lang.RepairManage_FaultRepair"
                            >{{scope.row.DeviceName}}</span>
                            <span v-else>{{scope.row.Executor}}</span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="UseNumber" :label="lang.EquipmentAccount_UseNumber" :width="300*a11" show-overflow-tooltip>
                    <template slot-scope="scope">
                        <div class="item">
                            <span
                                class="sad"
                                v-if="scope.row.TaskType == lang.RepairManage_FaultRepair"
                            >{{scope.row.DeviceName}}</span>
                            <span v-else>{{scope.row.UseNumber}}</span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="Price" :label="lang.EquipmentAccount_DevicePrice" :width="300*a11" show-overflow-tooltip>
                    <template slot-scope="scope">
                        <div class="item">
                            <span
                                class="sad"
                                v-if="scope.row.TaskType == lang.RepairManage_FaultRepair"
                            >{{scope.row.DeviceName}}</span>
                            <span v-else>{{scope.row.Price}}</span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="Manufactor" :label="lang.EquipmentAccount_Supplier" :width="300*a11" show-overflow-tooltip>
                    <template slot-scope="scope">
                        <div class="item">
                            <span
                                class="sad"
                                v-if="scope.row.TaskType == lang.RepairManage_FaultRepair"
                            >{{scope.row.DeviceName}}</span>
                            <span v-else>{{scope.row.Manufactor}}</span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="Remarks" :label="lang.EquipmentAccount_DeviceRemark" :width="300*a11" show-overflow-tooltip>
                    <template slot-scope="scope">
                        <div class="item">
                            <span
                                class="sad"
                                v-if="scope.row.TaskType == lang.RepairManage_FaultRepair"
                            >{{scope.row.DeviceName}}</span>
                            <span v-else>{{scope.row.Remarks}}</span>
                        </div>
                    </template>
                </el-table-column>
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
        <div class="sestion" v-show="change11" :style="{zoom:a11}">
            <!-- v-if="change11" -->
            <div class="sestionheader" :class="{colordiv:$store.state.color=='grey'}">
                <div
                    class="sestionheader1"
                ></div>
                <span class="head" v-if="sestion == 1" :class="{fcolor:$store.state.color=='grey'}">{{lang.VulnerablePartManage_AddDeviceInfo}}</span>
                <span class="head" v-else-if="sestion == 2" :class="{fcolor:$store.state.color=='grey'}">{{lang.VulnerablePartManage_ViewDeviceInfo}}</span>
                <span class="head" v-else-if="sestion == 3" :class="{fcolor:$store.state.color=='grey'}">{{lang.VulnerablePartManage_EditDeviceInfo}}</span>
                  <img
                    :src="no2"
                    alt
                    class="no"
                    @click.stop="cancel"
                    v-if="$store.state.color=='grey'"
                />
                <img :src="no" alt class="no" @click.stop="cancel" v-else />
            </div>
            <div class="sestioncontain">
                <div class="homesetion">
                    <div class="hometop">
                        <div class="linetop1 hometop-title">
                              {{lang.EquipmentAccount_BasicInformation}}
                        </div>
                     
                        <div class="line linetop2"></div>
                    </div>
                </div>
                <div class="overflow">
                    <div>
                        <div class="zl" >
                            <div class="margin">
                                <span>{{lang.EquipmentAccount_VulnerablePartName}}</span>
                                <input
                                    type="text"
                                    v-if="sestion == 1"
                                    v-model="wantnowdata.VulnerablePartName"
                                />
                                <input
                                    type="text"
                                    v-else-if="sestion == 2"
                                    v-model="wantnowdata.VulnerablePartName"
                                    disabled
                                />
                                <input
                                    type="text"
                                    v-else-if="sestion == 3"
                                    v-model="wantnowdata.VulnerablePartName"
                                />
                            </div>
                            <div class="margin">
                                <span>{{lang.EquipmentAccount_UsingDevice}}</span>
                                <div v-if="sestion == 1" class="input1">
                                    <span>{{wantnowdata.UsingDevice}}</span>
                                    <div class="inputimg" @click="getdevice">
                                        <img :src="diji" alt />
                                    </div>
                                </div>
                                <div v-else-if="sestion == 2" class="input1">
                                    <span>{{wantnowdata.UsingDevice}}</span>
                                    <div class="inputimg">
                                        <!-- <img :src="diji" alt /> -->
                                    </div>
                                </div>
                                <div v-else-if="sestion == 3" class="input1">
                                    <span>{{wantnowdata.UsingDevice}}</span>
                                    <div class="inputimg" @click="getdevice">
                                        <img :src="diji" alt />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="zr">
                            <div class="margin" >
                                <span>{{lang.EquipmentAccount_VulnerablePartNo}}</span>
                                <input
                                    type="text"
                                    v-if="sestion == 1"
                                    v-model="wantnowdata.VulnerablePartNo"
                                />
                                <input
                                    type="text"
                                    v-else-if="sestion == 2"
                                    v-model="wantnowdata.VulnerablePartNo"
                                    disabled
                                />
                                <input
                                    type="text"
                                    v-else-if="sestion == 3"
                                    v-model="wantnowdata.VulnerablePartNo"
                                />
                            </div>
                            <div class="margin">
                                <span>{{lang.VulnerablePartManage_VulnerablePartType}}</span>
                                <input
                                    type="text"
                                    v-if="sestion == 1"
                                    v-model="wantnowdata.VulnerablePartModel"
                                />
                                <input
                                    type="text"
                                    v-else-if="sestion == 2"
                                    v-model="wantnowdata.VulnerablePartModel"
                                    disabled
                                />
                                <input
                                    type="text"
                                    v-else-if="sestion == 3"
                                    v-model="wantnowdata.VulnerablePartModel"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="homesetion">
                    <div class="hometop">
                        <div class="linetop3 hometop-title">
                            {{lang.VulnerablePartManage_LifeInfo}}
                        </div>
                       
                        <div class="line linetop4"></div>
                    </div>
                </div>
                <div>
                    <div class="overflow" style="overflow: inherit;">
                        <div>
                            <div class="zl">

                                <!-- 启用日期 -->
                                <div class="margin margin-date">
                                    <span>{{lang.EquipmentAccount_StartDate}}</span>
                                    <template>
                                        <div class="block" v-if="sestion == 1">
                                            <el-date-picker
                                                v-model="wantnowdata.EnableTime"
                                                type="datetime"
                                                :placeholder="lang.SCMSConsoleWebApiMySql_PleChooseDate"
                                                value-format="yyyy-MM-dd HH:mm:ss"
                                            ></el-date-picker>
                                        </div>
                                        <div class="block" v-else-if="sestion == 2">
                                            <el-date-picker
                                                v-model="wantnowdata.EnableTime"
                                                type="datetime"
                                                :placeholder="lang.SCMSConsoleWebApiMySql_PleChooseDate"
                                                value-format="yyyy-MM-dd HH:mm:ss"
                                                disabled
                                            ></el-date-picker>
                                        </div>
                                        <div class="block" v-else-if="sestion == 3">
                                            <el-date-picker
                                                v-model="wantnowdata.EnableTime"
                                                type="datetime"
                                                :placeholder="lang.SCMSConsoleWebApiMySql_PleChooseDate"
                                                value-format="yyyy-MM-dd HH:mm:ss"
                                            ></el-date-picker>
                                        </div>
                                    </template>
                                </div>

                                <!-- 寿命周期 -->
                                <div class="margin">
                                    <span class="sp6">{{lang.EquipmentAccount_LifeCycle}}</span>
                                    <div class="is" v-if="sestion == 1">
                                        <input type="text" v-model="wantnowdata.LifeCycleValue" />
                                        <select name id v-model="wantnowdata.LifeCycleUnit">
                                            <option
                                                v-for="(item,index) in sametimearr"
                                                :key="index"
                                                :value="item"
                                            >{{item}}</option>
                                        </select>
                                    </div>
                                    <div class="is" v-if="sestion == 2">
                                        <input
                                            type="text"
                                            v-model="wantnowdata.LifeCycleValue"
                                            disabled
                                        />
                                        <select
                                            name
                                            id
                                            v-model="wantnowdata.LifeCycleUnit"
                                            disabled
                                        >
                                            <option
                                                v-for="(item,index) in sametimearr"
                                                :key="index"
                                                :value="item"
                                            >{{item}}</option>
                                        </select>
                                    </div>
                                    <div class="is" v-if="sestion == 3">
                                        <input type="text" v-model="wantnowdata.LifeCycleValue" />
                                        <select name id v-model="wantnowdata.LifeCycleUnit">
                                            <option
                                                v-for="(item,index) in sametimearr"
                                                :key="index"
                                                :value="item"
                                            >{{item}}</option>
                                        </select>
                                    </div>
                                </div>

                                <!-- 统计系数 -->
                                <div class="margin statisticalCoefficient"
                                    v-if="['使用次数'].includes(wantnowdata.TimerType)"
                                >
                                    <span style="position: relative;">
                                        <i class="el-icon-question" 
                                        style="position: absolute;left: -16px;top: 3px;"
                                        title="所在设备生产一个产品，器件被使用的次数。"
                                        ></i>
                                        <span>统计系数</span>
                                    </span>

                                    <el-input-number 
                                        v-model="wantnowdata.Coefficient"
                                        :disabled="sestion === 2 ? true : false"
                                        :min="0"
                                        style="width: 240px;"
                                    ></el-input-number>
                                </div>

                                <!-- 执行人 -->
                                <div class="margin">
                                    <span class="sp12">{{lang.PointInspectionManage_Executor}}</span>
                                    <select
                                        name
                                        id
                                        v-model="wantnowdata.Executor"
                                        v-if="sestion == 1"
                                    >
                                        <option
                                            :value="item"
                                            v-for="(item,index) in person"
                                            :key="index"
                                        >{{item}}</option>
                                    </select>
                                    <select
                                        name
                                        id
                                        v-model="wantnowdata.Executor"
                                        v-else-if="sestion == 2"
                                        disabled
                                    >
                                        <option
                                            :value="item"
                                            v-for="(item,index) in person"
                                            :key="index"
                                        >{{item}}</option>
                                    </select>
                                    <select
                                        name
                                        id
                                        v-model="wantnowdata.Executor"
                                        v-else-if="sestion == 3"
                                    >
                                        <option
                                            :value="item"
                                            v-for="(item,index) in person"
                                            :key="index"
                                        >{{item}}</option>
                                    </select>
                                </div>
                            </div>
                            <div class="zr">
                                
                                <!-- 统计类型 -->
                                <div class="margin">
                                    <span>统计类型</span>
                                    <select name id v-model="wantnowdata.TimerType"
                                        v-if="sestion === 1"
                                        class="typetime"
                                        @change="StatisticalTypeChange"
                                    >
                                        <option
                                            v-for="(item, i) in supermin1"
                                            :key="i"
                                            :value="item"
                                        >{{item}}</option>
                                    </select>
                                    <select name id v-model="wantnowdata.TimerType"
                                        v-else-if="sestion === 2"
                                        disabled
                                        style="background:#EBEBE4"
                                        class="typetime"
                                    >
                                        <option
                                            v-for="(item, i) in supermin1"
                                            :key="i"
                                            :value="item"
                                        >{{item}}</option>
                                    </select>
                                    <select name id v-model="wantnowdata.TimerType"
                                        v-else-if="sestion === 3"
                                        class="typetime"
                                        @change="StatisticalTypeChange"
                                    >
                                        <option
                                            v-for="(item, i) in supermin1"
                                            :key="i"
                                            :value="item"
                                        >{{item}}</option>
                                    </select>
                                </div>

                                <!-- 统计信号 -->
                                <div class="margin">
                                    <span>统计信号</span>
                                    <div v-if="sestion == 1" class="input1">
                                        <span>{{wantnowdata.RunningSignal}}</span>
                                        <div
                                            class="inputimg1"
                                            :class="{handle:pdyx}"
                                            @click="yunxing"
                                        >
                                            <img :src="diji" alt />
                                        </div>
                                    </div>
                                    <div v-else-if="sestion == 2" class="input1">
                                           <span>{{wantnowdata.RunningSignal}}</span>
                            
                                        <div class="inputimg1">
                                            <!-- <img :src="diji" alt /> -->
                                        </div>
                                    </div>
                                    <div v-else-if="sestion == 3" class="input1">
                                       <span>{{wantnowdata.RunningSignal}}</span>
                                        <div
                                            class="inputimg1"
                                            :class="{handle:pdyx}"
                                            @click="yunxing"
                                        >
                                            <img :src="diji" alt />
                                        </div>
                                    </div>
                                </div>

                                <!-- 提前提醒 -->
                                <div class="margin">
                                    <span class="sp6">{{lang.EquipmentAccount_AdvanceReminder}}</span>
                                    <div class="is" v-if="sestion == 1">
                                        <input type="text" v-model="wantnowdata.ReminderTimeValue" />
                                        <select name id v-model="wantnowdata.ReminderTimeUnit">
                                            <option
                                                v-for="(item,index) in sametimearr"
                                                :key="index"
                                                :value="item"
                                            >{{item}}</option>
                                        </select>
                                    </div>
                                    <div class="is" v-if="sestion == 2">
                                        <input
                                            type="text"
                                            v-model="wantnowdata.ReminderTimeValue"
                                            disabled
                                        />
                                        <select
                                            name
                                            id
                                            v-model="wantnowdata.ReminderTimeUnit"
                                            disabled
                                        >
                                            <option
                                                v-for="(item,index) in sametimearr"
                                                :key="index"
                                                :value="item"
                                            >{{item}}</option>
                                        </select>
                                    </div>
                                    <div class="is" v-if="sestion == 3">
                                        <input type="text" v-model="wantnowdata.ReminderTimeValue" />
                                        <select name id v-model="wantnowdata.ReminderTimeUnit">
                                            <option
                                                v-for="(item,index) in sametimearr"
                                                :key="index"
                                                :value="item"
                                            >{{item}}</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="homesetion">
                        <div class="hometop">
                            <div class="linetop5 hometop-title">
                                {{lang.EquipmentAccount_OtherInformation}}
                            </div>
                           
                            <div class="line linetop6"></div>
                        </div>
                    </div>
                    <div class="overflow">
                        <div>
                            <div class="zl">
                                <div class="margin" >
                                    <span>{{lang.EquipmentAccount_UseNumber}}</span>
                                    <input
                                        type="text"
                                        v-if="sestion == 1"
                                        v-model="wantnowdata.UseNumber"
                                    />
                                    <input
                                        type="text"
                                        v-else-if="sestion == 2"
                                        v-model="wantnowdata.UseNumber"
                                        disabled
                                    />
                                    <input
                                        type="text"
                                        v-else-if="sestion == 3"
                                        v-model="wantnowdata.UseNumber"
                                    />
                                </div>
                                <div class="margin">
                                    <span class="sp12">{{lang.EquipmentAccount_Supplier}}</span>
                                    <input
                                        type="text"
                                        v-if="sestion == 1"
                                        v-model="wantnowdata.Manufactor"
                                    />
                                    <input
                                        type="text"
                                        v-else-if="sestion == 2"
                                        v-model="wantnowdata.Manufactor"
                                        disabled
                                    />
                                    <input
                                        type="text"
                                        v-else-if="sestion == 3"
                                        v-model="wantnowdata.Manufactor"
                                    />
                                </div>
                            </div>
                            <div class="zr">
                                <div class="margin" >
                                    <span>{{lang.EquipmentAccount_DevicePrice}}</span>
                                    <input
                                        type="text"
                                        v-if="sestion == 1"
                                        v-model="wantnowdata.Price"
                                    />
                                    <input
                                        type="text"
                                        v-else-if="sestion == 2"
                                        v-model="wantnowdata.Price"
                                        disabled
                                    />
                                    <input
                                        type="text"
                                        v-else-if="sestion == 3"
                                        v-model="wantnowdata.Price"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="overflow overflow1">
                        <span>{{lang.EquipmentAccount_DeviceRemark}}</span>
                        <textarea
                            name
                            id
                            v-if="sestion == 1"
                            v-model="wantnowdata.Remarks"
                            :placeholder="lang.VulnerablePartManage_RemarkDescription"
                        ></textarea>
                        <textarea
                            name
                            id
                            v-else-if="sestion == 2"
                            :placeholder="lang.VulnerablePartManage_RemarkDescription"
                            v-model="wantnowdata.Remarks"
                            disabled
                        ></textarea>
                        <textarea
                            name
                            id
                            v-else-if="sestion == 3"
                            :placeholder="lang.VulnerablePartManage_RemarkDescription"
                            v-model="wantnowdata.Remarks"
                        ></textarea>
                    </div>
                </div>
                <div class="Preservation" v-if="sestion == 1 || sestion == 3" @click="nopre">{{lang.PopupCommon_Save}}</div>
                <div class="cancel" @click="cancel" v-if="sestion == 1 || sestion == 3">{{lang.PopupCommon_Cancel}}</div>
            </div>
        </div>
        <div class="tip"  v-show="tipchange" :style="{zoom:a11}">
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
        <div class="boxsad" ref="kongtiao12" v-if="daibang">
            <div
                class="tiptop"
                @mousedown="mouseDownHandleelse12($event)"
                @mouseup="mouseUpHandleelse12($event)"
            >
                <div class="tiphead">
                    <span>{{lang.PointInspectionManage_CloseToDoPointPatrolTask}}</span>
                    <img :src="no" alt class="no" @click.stop="cancel" />
                </div>
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
        <div class="cover4" v-if="offdecive" @click="selectword3 = false"></div>
        <div class="cover5" v-if="change11"></div>
        <div class="cover6" v-if="mesad2"></div>
        <div class="cover7" v-if="daibang"></div>
        <div class="cover4" v-if="ischange"></div>
        <div class="cover8" v-if="yx"></div>
        
        <!-- 延长器件寿命 -->
        <prolong-device-life 
            v-if="ProlongDeviceLifeDialog.show"
            :editData="ProlongDeviceLifeDialog.editData"
            @callback="ProlongDeviceLifeCallback"
        ></prolong-device-life>

        <!-- 添加/编辑器件信息 -->
        <create-device
            :state="createDeviceDialog.state"
            :editData="createDeviceDialog.editData"
            @callback="createDeviceCallback"
        ></create-device>
    </div>
</template>

<script>
import MySearch from '../public/search01.vue';
// import MyPage from '../public/Pages.vue';
import ProlongDeviceLife from './prolong-device-life.vue';
import CreateDevice from './create-device.vue';
import { getStatisticalTypeValue, getLifeCycleUnitValue } from './index';
import XLSX from 'xlsx';
// import { export_json_to_excel } from 'Export2Excel';
export default {
    components: {
        // MySearch,
        // MyPage
        ProlongDeviceLife,
        CreateDevice,
    },
    data() {
        return {
            // 延长器件寿命-弹窗
            ProlongDeviceLifeDialog: {
                show: false,
                editData: null,
            },
            // 添加/编辑器件信息-弹窗
            createDeviceDialog: {
                state: 'hide',
                editData: null,
            },


            a11:1,
            oneselect1: '',
            twoselect1: '',
            threeselect1: '',
            projectlist: '',
            projectlist2: '',
            projectlist3: '',
              pdyd1:true,
            pdyd2:true,
            pdyd3:true,
            list: [],
            nowpage1: 1,
            sss: '小时',
            wantnowdata: {
                Selected: false, //是否选中
                ID: '',
                Number: '', //序号
                VulnerablePartName: '', //器件名称
                VulnerablePartNo: '', //器件编号
                AID: '', //器件编号
                UsingDevice: '点击选择', //使用设备
                VulnerablePartModel: '', //器件型号
                MaturityTime: '', //到期时间
                ResidualLife: '', //剩余寿命
                EnableTime: '', //启用日期
                LifeCycleValue: '', //寿命周期
                LifeCycleUnit: '小时', //寿命周期类型：1-小时 2-天 3-月 4-年
                LifeCycleDisplayName: '', //寿命周期在表格显示
                TimerType: '标准时间', //统计类型,统计信号为空时，计时类型为标准时间，否则为运行时间
                RunningSignal: '点击选择', // 统计信号
                ReminderTimeValue: 1, //提前提醒
                ReminderTimeUnit: '小时', //提前提醒类型：1-小时 2-天 3-月 4-年
                ReminderTimeDisplayName: '', //提前提醒
                Executor: 'SuperAdmin', //执行人员
                UseNumber: '', //使用数量
                Price: '', //器件价格
                Manufactor: '', //供应商
                Remarks: '', //备注
                Status: '提醒了', //状态,1为提醒了，2为未提醒
                Coefficient: 1, // 统计系数
            },
            pdyx: false,
            value1: new Date(new Date().toLocaleDateString()),
            value2: new Date(
                new Date(new Date().toLocaleDateString()).getTime() +
                    24 * 60 * 60 * 1000 -
                    1
            ),
            nowtime1: '',

            nowtime2: '',
            data7: [],
            antable:[],
            deltrue: true,
            changeselect: false,
            tipword: '',
            argID: '',
            ID: '',
            daibang: false,
            change1: false,
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
            person: ['SuperAdmin', 'Guest'],
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
            selecttabledata: [],
           PageData: {
                PageSize: 50,
                TotalCount: 0,
                TotalPage: 1,
                PageIndex: 1,
                LastEnabled: false,
                NextEnabled: false
            },
            PageData1: {
                PageSize: 50,
                TotalCount: 0,
                TotalPage: 0,
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
            Meter1: '不限',
            Meter2: '不限',
            aid: '',
            zy: '',
            AID: '',
            wanttime: '',
            wantword: '',
            selectvarword: '',
            look: require('../../assets/images/icon_look.png'),
            no: require('../../assets/images/no.png'),
            no2: require('../../assets/images/no2.png'),
            pensoil: require('../../assets/images/icon_pensoil.png'),
            diji: require('../../assets/images/icon_diji.png'),
            rili: require('../../assets/images/rili.png'),
               xiala:require('../../assets/images/ziyuan4.png'),
            change: false,
            keyword: '',
            sesstion: '',
            disabled: '',
            pagesize: 50,
            pageindex: 1,
            sestion: 1, // 模式 1-添加 2-查看 3-编辑
            Preservation: '点击选择',
            Preservation1: '点击选择',
            Preservation5: '点击选择',
            hastip: 1,
            sbnum: 1,
            time4: '',
            muchdata: '',
            a: 1,
            sametimearr: ['小时', '天', '月', '年'],
            data6: [],
            selectword3: false,
            a1: 1,
            a2: 1,
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
            supermin1: ['标准时间', '运行时间', '使用次数'],
            deviceperson: 'SuperAdmin',
            addremarks: '',
            taskname: '',
            c: '',
            arr: ['已处理', '未发现原因'],
            abc: '',
            mesad1: false,
            mesad2: false,
            mesad3: false,
            onestaion: '',
            one: 1,
            daorudata: [],
            iswant: 1,
            vrmark: '',
            timevalue: '',
            yx:false,
            ischange: false,
            tyname:'',
            jurisdiction:[],
            buttonarr:[],
            xcid:'',
            cxshow:true,
            tjid:'',
            tjshow:true,
            scid:'',
            scshow:true,
            drid:'',
            drshow:true,
            dcid:'',
            dcshow:true,
            ckid:'',
            ckshow:true,
            bjid:'',
            bjshow:true,
            ghid:"",
            ghshow:true,
            ycid:'',
            ycshow:true,
            lang: JSON.parse(localStorage.getItem('languages'))[localStorage.getItem('currentLang')]
        };
    },

    created() {
        this.getLangData()
           this.jurisdiction = this.$store.state.btnPowerData
     this.buttonarr = this.findPathByLeafId(this.GetUrlParam('id'),this.jurisdiction)[0].Children
        console.log("nut",this.buttonarr)
           this.buttonarr.forEach((item)=>{
                 if(item.RightName == "易损件台账-查询按钮"){
                 this.cxid = item.RightID
              }else if(item.RightName == "易损件台账-添加按钮"){
                this.tjid = item.RightID
              }else if(item.RightName == "易损件台账-删除按钮"){
                this.scid = item.RightID
              }else if(item.RightName == "易损件台账-导入按钮"){
                this.drid = item.RightID
              }else if(item.RightName == "易损件台账-导出按钮"){
                this.dcid = item.RightID
              }else if(item.RightName == "易损件台账-查看按钮"){
                this.ckid = item.RightID
              }else if(item.RightName == "易损件台账-编辑按钮"){
                this.bjid = item.RightID
              }else if(item.RightName == "易损件台账-更换按钮"){
                this.ghid = item.RightID
              }else if(item.RightName == "易损件台账-延长按钮"){
                this.ycid = item.RightID
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
                  url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.drid}`,
              }).then(res => {
                  this.drshow = res.data.data
              
              }).catch((err)=>{
                  console.log('err',err)
              })
                   this.$axios({
                  method: 'post',
                  url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.dcid}`,
              }).then(res => {
                  this.dcshow = res.data.data
              
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
                   this.$axios({
                  method: 'post',
                  url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.ghid}`,
              }).then(res => {
                  this.ghshow = res.data.data
              
              }).catch((err)=>{
                  console.log('err',err)
              })
                   this.$axios({
                  method: 'post',
                  url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.ycid}`,
              }).then(res => {
                  this.ycshow = res.data.data
              
              }).catch((err)=>{
                  console.log('err',err)
              })
        this.getEquipmentType();
        this.req(1);
        this.time4 = this.getNowTime();
    },
    watch: {
               VpowerData(val){
                this.jurisdiction = this.$store.state.btnPowerData
     this.buttonarr = this.findPathByLeafId(this.GetUrlParam('id'),this.jurisdiction)[0].Children
        console.log("nut",this.buttonarr)
           this.buttonarr.forEach((item)=>{
                 if(item.RightName == "易损件台账-查询按钮"){
                 this.cxid = item.RightID
              }else if(item.RightName == "易损件台账-添加按钮"){
                this.tjid = item.RightID
              }else if(item.RightName == "易损件台账-删除按钮"){
                this.scid = item.RightID
              }else if(item.RightName == "易损件台账-导入按钮"){
                this.drid = item.RightID
              }else if(item.RightName == "易损件台账-导出按钮"){
                this.dcid = item.RightID
              }else if(item.RightName == "易损件台账-查看按钮"){
                this.ckid = item.RightID
              }else if(item.RightName == "易损件台账-编辑按钮"){
                this.bjid = item.RightID
              }else if(item.RightName == "易损件台账-更换按钮"){
                this.ghid = item.RightID
              }else if(item.RightName == "易损件台账-延长按钮"){
                this.ycid = item.RightID
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
                  url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.drid}`,
              }).then(res => {
                  this.drshow = res.data.data
              
              }).catch((err)=>{
                  console.log('err',err)
              })
                   this.$axios({
                  method: 'post',
                  url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.dcid}`,
              }).then(res => {
                  this.dcid = res.data.data
              
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
                  this.bjshpw = res.data.data
              
              }).catch((err)=>{
                  console.log('err',err)
              })
                   this.$axios({
                  method: 'post',
                  url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.ghid}`,
              }).then(res => {
                  this.ghshow = res.data.data
              
              }).catch((err)=>{
                  console.log('err',err)
              })
                   this.$axios({
                  method: 'post',
                  url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.ycid}`,
              }).then(res => {
                  this.ycshow = res.data.data
              
              }).catch((err)=>{
                  console.log('err',err)
              })
               },
                
        oneselect1(val) {
            let i = 0;
            for (i in this.projectlist) {
                if (val == this.projectlist[i].DeviceName) {
                    this.projectlist2 = this.projectlist[i].Groups;
                    this.twoselect1 = this.projectlist[i].Groups[0].GroupName;
                }
            }
            this.watchdata();
        },
        twoselect1(val) {
            let i = 0;
            let types = [this.lang.AlarmRecord_HT_Unlimited, '二进制变量', '有符号8位整型','无符号8位整型','有符号16位整型','无符号16位整型','有符号32位整型','无符号32位整型','有符号64位整型','无符号64位整型','F32位浮点数IEEE754','F64位浮点数IEEE754']
            for (i in this.projectlist2) {
                if (val == this.projectlist2[i].GroupName) {
                    this.projectlist3 = this.projectlist3 = this.projectlist2[0].DataTypes.filter(
                        (item)=> {
                            /* return item.Value == this.lang.AlarmRecord_HT_Unlimited || item.Value == '二进制变量' */
                            return types.includes(item.Value)
                        }
                    );
                    this.threeselect1 = /* this.projectlist3[0].Value; */ this.lang.AlarmRecord_HT_Unlimited
                }
            }
            this.watchdata();
        },
        threeselect1(val) {
            this.watchdata();
        }
    },
    computed:{
        VpowerData() {
                    return this.$store.state.btnPowerData;
        },
    },
    methods: {
        getLangData() {
            this.sss = this.lang.HMI_HT_LineChartWindowViewModel_Hour
            this.wantnowdata.UsingDevice = this.lang.EquipmentAccount_ClickSelect
            this.wantnowdata.LifeCycleUnit = this.lang.HMI_HT_LineChartWindowViewModel_Hour
            this.wantnowdata.TimerType = this.lang.VulnerablePartManage_StandardTime
            this.wantnowdata.RunningSignal = this.lang.EquipmentAccount_ClickSelect
            this.wantnowdata.ReminderTimeUnit = this.lang.HMI_HT_LineChartWindowViewModel_Hour
            this.wantnowdata.Status = this.lang.SCMSConsoleWebApiMySql_Reminded
            this.over = this.lang.RepairManage_Processed
            this.warry = this.lang.EquipmentAccount_Inside
            this.device = this.lang.EquipmentAccount_Used
            this.Meter1 = this.lang.AlarmRecord_HT_Unlimited
            this.Meter2 = this.lang.AlarmRecord_HT_Unlimited
            this.Preservation = this.lang.EquipmentAccount_ClickSelect
            this.Preservation1 = this.lang.EquipmentAccount_ClickSelect
            this.Preservation5 = this.lang.EquipmentAccount_ClickSelect
            this.sametimearr =  [this.lang.HMI_HT_LineChartWindowViewModel_Hour, this.lang.MaintenanceManage_Day, this.lang.HMI_HT_LineChartWindowViewModel_Month, this.lang.HMI_HT_LineChartWindowViewModel_Year],
            this.ztarr = [this.lang.AlarmRecord_HT_Unlimited, this.lang.MaintenanceManage_NotStarted, this.lang.MaintenanceManage_Ongoing, this.lang.MaintenanceManage_Delayed]
            this.leixinarr = [this.lang.AlarmRecord_HT_Unlimited, this.lang.RepairManage_PlanRepair, this.lang.RepairManage_FaultRepair]
            this.supermin1 = [this.lang.VulnerablePartManage_StandardTime, this.lang.VulnerablePartManage_RunningTime, '使用次数']
            this.arr = [this.lang.RepairManage_Processed, this.lang.RepairManage_NoCauseWasFound]
        },
         dr(e){
                     
            if(!this.drshow){
                  setTimeout(() => {
                        $('.tip').css({
                            zoom: this.a11,
                          
                        });
                        this.tipchange = true;
                        this.move('tip', 'tiphead');
                    });
            this.tipword = this.lang.NoOperationAuthority;
            e.preventDefault();
            return
            }
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
        lookforsearch2() {
            this.watchdata();
        },
        // 导入表格
        readExcel(e) {
            console.clear();
            this.daorudata = [];
            const files = e.target.files;
            if (files.length <= 0) {
                console.log('没有文件名');
                return false;
            } else if (!/\.(xls|xlsx)$/.test(files[0].name.toLowerCase())) {
                this.$Message.error('上传格式不正确，请上传xls或者xlsx格式');
                return false;
            }
            const fileReader = new FileReader();
            fileReader.onload = ev => {
                const data = ev.target.result;
                const workbook = XLSX.read(data, { type: 'binary' });
                const wsname = workbook.SheetNames[0]; // 取第一张表
                const initTableData = XLSX.utils.sheet_to_json(workbook.Sheets[wsname]); // 生成表格数据
                console.log("初始表格数据", JSON.parse(JSON.stringify(initTableData)));

                let newTableData = [] // 新表格数据
                for (let i = 0, iLen = initTableData.length; i < iLen; i++) {
                  const item = initTableData[i]
                  newTableData.push({
                    No: item['序号'],
                    VulnerablePartName: item['器件名称'],
                    VulnerablePartNo: item['器件编号'],
                    UsingDevice: item['使用设备'],
                    VulnerablePartModel: item['器件型号'],
                    MaturityTime: item['到期时间'],
                    ResidualLife: item['剩余寿命'],
                    EnableTime: item['启用日期'],
                    LifeCycle: item['寿命周期'],
                    TimerType: item['统计类型'],
                    RunningSignal: item['统计信号'],
                    ReminderTime: item['提前提醒'],
                    Executor: item['执行人员'],
                    UseNumber: item['使用数量'],
                    Price: item['器件价格'],
                    Manufactor: item['供应商'],
                    Remarks: item['器件备注'],
                    LoginUserName: this.abc,
                    // AddTime: this.getNowTime(),
                  })
                }

                console.log("准备提交的表格数据", JSON.parse(JSON.stringify(newTableData)));
                this.$api.agency.vulnerablePartManageImport(newTableData).then(ref => {
                    console.log('导入结果', ref);
                    if (ref.data.code === 1) {
                        this.$message({
                            message: ref.data.msg,
                            type: 'warning'
                        });
                        return
                    }
                    this.$message({
                        message: ref.data.data,
                        type: 'success'
                    });
                }, err => {
                    console.log('失败回调', err);
                })
            };
            fileReader.readAsBinaryString(files[0]);
        },
        // 导出表格
        exportTable() {
            console.clear();
            if(!this.dcshow) {
                setTimeout(() => {
                    $('.tip').css({zoom: this.a11});
                    this.tipchange = true;
                    this.move('tip', 'tiphead');
                });
                this.tipword = this.lang.NoOperationAuthority;
                return
            }
            
            if(this.PageData.TotalCount >= 150000) {
                setTimeout(() => {
                    $('.tip').css({zoom: this.a11});
                    this.tipchange = true;
                    this.move('tip', 'tiphead');
                });
                this.tipword = this.lang.SCMSConsoleWebApiMySql_ExportedDataNotSupportMoreThan150000
                return;
            }
            require.ensure([], () => {
                // 表头
                const tHeader = [
                    this.lang.AlarmRecord_HT_AlarmPointManageUC_SerialNumber,
                    this.lang.EquipmentAccount_VulnerablePartName,
                    this.lang.EquipmentAccount_VulnerablePartNo,
                    this.lang.EquipmentAccount_UsingDevice,
                    this.lang.EquipmentAccount_VulnerablePartModel,
                    this.lang.EquipmentAccount_MaturityTime,
                    this.lang.EquipmentAccount_ResidualLife,
                    this.lang.EquipmentAccount_StartDate,
                    this.lang.EquipmentAccount_LifeCycle,
                    // this.lang.EquipmentAccount_TimerType,
                    '统计类型',
                    // this.lang.EquipmentAccount_RunningSignal,
                    '统计信号',
                    this.lang.EquipmentAccount_AdvanceReminder,
                    this.lang.EquipmentAccount_Executor,
                    this.lang.EquipmentAccount_UseNumber,
                    this.lang.EquipmentAccount_DevicePrice,
                    this.lang.EquipmentAccount_Supplier,
                    this.lang.EquipmentAccount_DeviceRemark
                ];
                // console.log('表头', tHeader);
                
                // 字段值
                const filterVal = [
                    'Number',
                    'VulnerablePartName',
                    'VulnerablePartNo',
                    'UsingDevice',
                    'VulnerablePartModel',
                    'MaturityTime',
                    'ResidualLife',
                    'EnableTime',
                    'LifeCycleDisplayName', // 寿命周期-名称
                    'TimerType', // 统计类型
                    'RunningSignal', // 统计信号
                    'ReminderTimeDisplayName', // 提前提醒-名称
                    'Executor',
                    'UseNumber',
                    'Price',
                    'Manufactor',
                    'Remarks'
                ];

                const c = this.Meterid == '11111111-1111-1111-1111-111111111111' ? '' : this.Meter;
                this.$axios.post( `/api/VulnerablePartManage/VulnerablePartManage_GstPlan?argDeviceType=${c}&argStartTime=${this.value1}&argEndTime=${this.value2}&argKeyword=${this.keyword}&argPageSize=${this.PageData.TotalCount}&argPageIndex=1`).then(res =>{
                    let dataList = res.data.data.DataList // 表格数据
                    // console.log('表格数据', res);
                    console.log("表格数据-后台", JSON.parse(JSON.stringify(dataList)));
                    
                     // 数据格式转换
                    dataList.forEach(item => {
                        item.EnableTime = this.gettime(item.EnableTime) // 启用日期
                        // 寿命周期
                        // const lifeCycleUnit = getLifeCycleUnitValue(item.LifeCycleUnit)
                        // if (lifeCycleUnit) {
                        //     console.log(`寿命周期值是：${item.LifeCycleValue}；单位是${lifeCycleUnit}`);
                        //     item.LifeCycleDisplayName = item.LifeCycleValue + lifeCycleUnit
                        // }
                    })

                    const excelDatas = [
                        {
                            tHeader: tHeader,
                            filterVal: filterVal,
                            tableDatas: dataList.splice(0, 20000),
                            sheetName: 'sheet1'
                        },
                        {
                            tHeader: tHeader,
                            filterVal: filterVal,
                            tableDatas: dataList.splice(0, 1000),
                            sheetName: 'sheet2'
                        },
                    ];

                    console.log("输出表格数据", JSON.parse(JSON.stringify(excelDatas)));
                    this.json2excel(excelDatas, this.lang.VulnerablePartManage_VulnerablePartsAccount, true, 'xlsx');
                })
            });
        },
        json2excel(tableJson, filenames, autowidth, bookTypes) {
            var that = this;
            //这个是引用插件
            import('@/vendor/Export2Excel').then(excel => {
                var tHeader = [];
                var dataArr = [];
                var sheetnames = [];
                for (var i in tableJson) {
                    tHeader.push(tableJson[i].tHeader);
                    dataArr.push(
                        that.formatJson(
                            tableJson[i].filterVal,
                            tableJson[i].tableDatas
                        )
                    );
                    sheetnames.push(tableJson[i].sheetName);
                }
                console.log('dataArr', dataArr);
                excel.export_json_to_excel({
                    header: tHeader,
                    data: dataArr,
                    sheetname: sheetnames,
                    filename: filenames,
                    autoWidth: autowidth,
                    bookType: bookTypes
                });
            });
        },
        formatJson(filterVal, jsonData) {
            return jsonData.map(v => filterVal.map(j => v[j]));
        },
        select2(a) {
            console.log(a);
            this.list = a;
        },
        select3(a) {
            console.log(a);
            this.list = a;
        },
        pre1() {
            if (this.sestion == 1) {
                this.wantnowdata.UsingDevice = this.wantword;
                this.wantnowdata.AID = this.aid;
                if (this.wantnowdata.UsingDevice == this.lang.EquipmentAccount_ClickSelect || this.wantnowdata.UsingDevice == '') {
                    this.tipword = this.lang.FileManage_SelectEquipment;
                       setTimeout(() => {
                        $('.tip').css({
                            zoom: this.a11,
                          
                        });
                        this.tipchange = true;
                        this.move('tip', 'tiphead');
                    });
                    this.pdyd3 = true;
                } else {
                    this.offdecive = false;
                }
            } else if (this.sestion == 3) {
                if (!this.aid) {
                    this.tipword = this.lang.FileManage_SelectEquipment;
                    setTimeout(() => {
                        $('.tip').css({
                            zoom: this.a11,
                          
                        });
                        this.tipchange = true;
                        this.move('tip', 'tiphead');
                    });
                    this.pdyd3 = true;
                    return
                }
                console.log(this.wantnowdata);
                this.wantnowdata.AID = this.aid;
                this.wantnowdata.UsingDevice = this.wantword;
                this.offdecive = false;
                this.cancel11()
            }
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
                        $('.look222').css({
                            // zoom: this.a11,
                            left: `calc(50% - ${($('.look222').width() / 2) *
                                this.a11}px)`,
                            top: `calc(50% - ${($('.look222').height() / 2) *
                                this.a11}px)`
                        });
                        this.offdecive  = true;
                        this.move('look222', 'looktop');
                    });
                    this.offdecive = true;
                    this.pdyd2 = true;
                    this.selectword3 = false;
                    this.projectkeyword = '';
                });
        },
        yes1() {
            this.tipchange = false;
            console.log(this.list);
            this.$axios({
                method: 'post',
                url: `/api/VulnerablePartManage/VulnerablePartManage_DeleteAcount`,
                data: {
                    list: this.list,
                    LoginUserName: this.abc
                }
            }).then(res => {
                console.log(res);
                this.list = [];
                this.tipword = this.lang.FormulaManage_HT_DeletedSuccessfully;
                   setTimeout(() => {
                        $('.tip').css({
                            zoom: this.a11,
                          
                        });
                        this.tipchange = true;
                        this.move('tip', 'tiphead');
                    });
                this.pdyd3 = true;
                this.deltrue = true;
                this.getsetime();
            });
        },
        del() {
             if(!this.scshow){
              setTimeout(() => {
                        $('.tip').css({
                            zoom: this.a11,
                          
                        });
                        this.tipchange = true;
                        this.move('tip', 'tiphead');
                    });
                   this.pdyd3 = true;
                 this.tipword = this.lang.NoOperationAuthority;
                return
            }
            if (this.list.length !== 0) {
                this.tipword = this.lang.EquipmentAccount_SureToDelete
                   setTimeout(() => {
                        $('.tip').css({
                            zoom: this.a11,
                          
                        });
                        this.tipchange = true;
                        this.move('tip', 'tiphead');
                    });
                this.pdyd3 = true;
                this.deltrue = false;
            } else {
                this.tipword = this.lang.EquipmentAccount_CheckTheDeleteItem
                   setTimeout(() => {
                        $('.tip').css({
                            zoom: this.a11,
                          
                        });
                        this.tipchange = true;
                        this.move('tip', 'tiphead');
                    });
                this.pdyd3 = true;
                this.deltrue = true;
            }
        },
        sx(){
            let that = this
            setTimeout(()=>{
for(let i=0;i<$('.el-picker-panel').length;i++){
                $('.el-picker-panel')[i].style.zoom = that.a11
            }
            })
              
        },
          handleRowChange5(a) {
            // this.wantdata = a;
            console.log(a);
            this.tyname = a.Name;
            // this.wantnowdata.RunningSignal = a.Name;
            
            // this.projectchangedata.DataType = a.DateType;
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
        start1() {
            this.PageData1.PageIndex = 1;
            // this.onetable();
            this.watchdata();
             this.nowpage1 = this.PageData1.PageIndex;

        },
        prev1() {
            if (this.PageData1.LastEnabled) {
                this.PageData1.PageIndex--;
                   this.nowpage1 = this.PageData1.PageIndex;
                this.watchdata();
            }

            // this.onetable();
        },
        isPositiveInteger(s) {
            //是否为正整数
            var re = /^[0-9]+$/;
            return re.test(s);
        },
        next1() {
            if (this.PageData1.NextEnabled) {
                this.PageData1.PageIndex++;
                this.watchdata();
                this.nowpage1 = this.PageData1.PageIndex;
                console.log(this.PageData1)
                // this.onetable();
            }
        },
        jump1() {
             if (!this.isPositiveInteger(this.nowpage1)) {
                      setTimeout(() => {
                        $('.tip').css({
                            zoom: this.a11,
                          
                        });
                        this.tipchange = true;
                        this.move('tip', 'tiphead');
                    });
                    this.pdyd3 = true;
                    this.tipword = this.lang.RoleManage_HT_PEAPositiveInteger;
                      setTimeout(() => {
                        $('.tip').css({
                            zoom: this.a11,
                          
                        });
                        this.tipchange = true;
                        this.move('tip', 'tiphead');
                    });
                    return;
                } else {
                    if (
                        this.nowpage1!== 1 &&
                        this.nowpage1 !==  this.PageData1.TotalPage
                    ) {
                        if (
                            this.nowpage1 < 1 ||
                            this.nowpage1 >  this.PageData1.TotalPage
                        ) {
                            this.tipword = this.lang.DataGrid_Reaction_HT_PEThePageNumber;
                              setTimeout(() => {
                        $('.tip').css({
                            zoom: this.a11,
                          
                        });
                        this.tipchange = true;
                        this.move('tip', 'tiphead');
                    });
                            this.pdyd3 = true;
                            return;
                        }
                    }
                }
            if (this.nowpage1 <= this.PageData1.TotalPage) {
                this.PageData1.PageIndex = this.nowpage1;
                // this.onetable();
                this.watchdata();
            }
        },
        end1() {
            this.PageData1.PageIndex = this.PageData1.TotalPage;
            this.watchdata();
             this.nowpage1 = this.PageData1.PageIndex;
            // this.onetable();
        },
        cancel11() {
            this.aid = '';
            this.wantword = ''
            this.offdecive = false;
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
        mouseUpHandleelse3(event) {
            window.onmousemove = null;
            console.log('ssssssssssss');
            event.currentTarget.style.cursor = 'move';
        },
        mouseDownHandleelse3(event) {
            event.currentTarget.style.cursor = 'move';
            window.onmousemove = this.mouseMoveHandleelse3;
        },
        mouseMoveHandleelse3(event) {
            let moveLeft = event.pageX - 550 + 'px';
            let moveTop = event.pageY - 30 + 'px';
            this.$refs.kongtiao3.style.left = moveLeft;
            this.$refs.kongtiao3.style.top = moveTop;
        },
        mouseDownHandleelse(event) {
            event.currentTarget.style.cursor = 'move';
            window.onmousemove = this.mouseMoveHandleelse;
        },
        mouseDownHandleelse18(event) {
          
            event.currentTarget.style.cursor = 'move';
            window.onmousemove = this.mouseMoveHandleelse18;
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
        mouseMoveHandleelse18(event) {
            console.log("we",event.pageX)
            let moveLeft = event.pageX - 350 + 'px';
            console.log(moveLeft)
            let moveTop = event.pageY - 30 + 'px';
            this.$refs.kongtiao18.style.left = moveLeft;
            this.$refs.kongtiao18.style.top = moveTop;
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
            this.pdyd3 = false;
            let moveLeft = event.pageX - 190 + 'px';
            let moveTop = event.pageY - 20 + 'px';
            this.$refs.kongtiao2.style.left = moveLeft;
            this.$refs.kongtiao2.style.top = moveTop;
        },
        mouseUpHandleelse(event) {
            window.onmousemove = null;
            event.currentTarget.style.cursor = 'move';
        },
        mouseUpHandleelse18(event) {
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
            this.ischange = false;
            this.change = false;
            this.change11 = false;
            this.mesad2 = false;
            this.daibang = false;
            let ss = JSON.stringify(this.antable);
            this.tableData1 = JSON.parse(ss);
            console.log(this.antable)
        },
        Preservation2() {
            this.Preservation = this.Preservation1;
            if (this.Preservation1 == this.lang.EquipmentAccount_EquipmentType) {
                this.tipword = this.lang.EquipmentAccount_SelectEquipmentType1
                    setTimeout(() => {
                        $('.tip').css({
                            zoom: this.a11,
                          
                        });
                        this.tipchange = true;
                        this.move('tip', 'tiphead');
                    });
                this.pdyd3 = true;
            } else if (this.Preservation5 == this.lang.EquipmentAccount_InstallPosition) {
                this.tipword = this.lang.EquipmentAccount_SelectInstallPosition
                    setTimeout(() => {
                        $('.tip').css({
                            zoom: this.a11,
                          
                        });
                        this.tipchange = true;
                        this.move('tip', 'tiphead');
                    });
                this.pdyd3 = true;
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
                            zoom: this.a11,
                          
                        });
                        this.tipchange = true;
                        this.move('tip', 'tiphead');
                    });
                this.pdyd3 = true;
            } else if (this.pen.InstallationLocation == this.lang.EquipmentAccount_InstallPosition) {
                this.tipword = this.lang.EquipmentAccount_SelectInstallPosition
                this.pen.InstallationLocation = this.lang.EquipmentAccount_ClickSelect
                    setTimeout(() => {
                        $('.tip').css({
                            zoom: this.a11,
                          
                        });
                        this.tipchange = true;
                        this.move('tip', 'tiphead');
                    });
                this.pdyd3 = true;
            } else {
                this.cancel1 = false;
            }
        },
        handleEdit7(a, b) {
               if(!this.ghshow){
               setTimeout(() => {
                        $('.tip').css({
                            zoom: this.a11,
                          
                        });
                        this.tipchange = true;
                        this.move('tip', 'tiphead');
                    });
                   this.pdyd3 = true;
                 this.tipword = this.lang.NoOperationAuthority;
                return
            }
            this.vrmark = ''
            this.zy = b;
            this.iswant = 1;
                   setTimeout(() => {
                        $('.look').css({
                            zoom: this.a11,
                            left: `calc(50% - ${($('.look').width() / 2) *
                                this.a11}px)`,
                            top: `calc(50% - ${($('.look').height() / 2) *
                                this.a11}px)`
                        });
                       this.ischange = true;
                        this.move('look', 'looktop');
                    });
          
            this.wanttime = this.getNowTime();
        },
        gpre() {
            console.log(this.zy);
            this.$axios
                .post(
                    `/api/VulnerablePartManage/VulnerablePartManage_Replace?argPID=${this.zy.ID}&argEnableTime=${this.wanttime}&argRemarks=${this.vrmark}&argLoginUserName=${this.abc}`
                )
                .then(res => {
                       setTimeout(() => {
                        $('.tip').css({
                            zoom: this.a11,
                          
                        });
                        this.tipchange = true;
                        this.move('tip', 'tiphead');
                    });
                    this.pdyd3 = true;
                    if (res.data.msg == '请求成功') {
                        this.tipword = this.lang.SCMSConsoleWebApiMySql_ReplacementSucceeded
                        this.ischange = false;
                        this.getsetime();
                    } else {
                        this.tipword = res.data.msg;
                    }
                });
        },


        // 延长器件寿命-显示/隐藏
        prolongDeviceLifeShow(state, row){
            switch (state) {
                case 'show':
                    this.ProlongDeviceLifeDialog.show = true
                    this.ProlongDeviceLifeDialog.editData = row
                    break;
                case 'hide':
                    this.ProlongDeviceLifeDialog.show = false
                    this.ProlongDeviceLifeDialog.editData = null
                    break;
                default:
                    break;
            }
        },
        // 延长器件寿命-回调
        ProlongDeviceLifeCallback(data) {
            if (data === 'cancel') {
                this.prolongDeviceLifeShow('hide')
                return
            }
            this.prolongDeviceLifeShow('hide')
            this.getsetime();
        },

        // 器件信息-添加/编辑/查看
        createDeviceShow(state, row, index){
            // console.clear();
            // console.log('添加/编辑器件信息-显示', state, index, row);
            if (row) this.createDeviceDialog.editData = row
            this.createDeviceDialog.state = state
        },
        // 添加/编辑器件信息-回调
        createDeviceCallback(state) {
            if (state === 'confirm') {
                this.getsetime();
            }
            this.createDeviceDialog.state = 'hide'
        },

        handleEdit8(a, b) {
            console.log(a,b);
            // this.sametimearr = ['小时', '天', '月', '年', '次']
            if(!this.ycshow) {
                setTimeout(() => {
                    $('.tip').css({zoom: this.a11});
                    this.tipchange = true;
                    this.move('tip', 'tiphead');
                });
                this.pdyd3 = true;
                this.tipword = this.lang.NoOperationAuthority;
                return
            }
            this.vrmark = ''
            this.timevalue = ''
            this.zy = b;
            this.iswant = 2;
            setTimeout(() => {
                $('.look').css({
                    zoom: this.a11,
                    left: `calc(50% - ${($('.look').width() / 2) * this.a11}px)`,
                    top: `calc(50% - ${($('.look').height() / 2) * this.a11}px)`
                });
                this.ischange = true;
                this.move('look', 'looktop');
            });
        },

        // 延长器件寿命-保存
        prolongDeviceLife() {
            console.log(this.zy);
            if (this.sss == this.lang.HMI_HT_LineChartWindowViewModel_Hour) {
                this.sss = 1;
            } else if (this.sss == this.lang.MaintenanceManage_Day) {
                this.sss = 2;
            } else if (this.sss == this.lang.HMI_HT_LineChartWindowViewModel_Month) {
                this.sss = 3;
            } else if (this.sss == this.lang.HMI_HT_LineChartWindowViewModel_Year) {
                this.sss = 4;
            }
            let a = this.getNowTime();
            this.$axios
                .post(
                    `/api/VulnerablePartManage/VulnerablePartManage_Extend?argPID=${this.zy.ID}&argTime=${this.timevalue}&argTimeUnit=${this.sss}&argEnableTime=${this.zy.EnableTime}&argRemarks=${this.vrmark}&argLoginUserName=${this.abc}`
                )
                .then(res => {
                       setTimeout(() => {
                        $('.tip').css({
                            zoom: this.a11,
                          
                        });
                        this.tipchange = true;
                        this.move('tip', 'tiphead');
                    });
                    this.pdyd3 = true;
                    if (res.data.msg == '请求成功') {
                        this.tipword = this.lang.SCMSConsoleWebApiMySql_ExtensionSucceeded
                        this.ischange = false;
                        this.getsetime();
                    } else {
                        if (this.sss == 1) {
                            this.sss = this.lang.HMI_HT_LineChartWindowViewModel_Hour
                        } else if (this.sss == 2) {
                            this.sss = this.lang.MaintenanceManage_Day
                        } else if (this.sss == 3) {
                            this.sss = this.lang.HMI_HT_LineChartWindowViewModel_Month
                        } else if (this.sss == 4) {
                            this.sss = this.lang.HMI_HT_LineChartWindowViewModel_Year
                        }
                        this.tipword = res.data.msg;
                    }
                })
                .then(() => {
                    if (this.sss == 1) {
                        this.sss = this.lang.HMI_HT_LineChartWindowViewModel_Hour
                    } else if (this.sss == 2) {
                        this.sss = this.lang.MaintenanceManage_Day
                    } else if (this.sss == 3) {
                        this.sss = this.lang.HMI_HT_LineChartWindowViewModel_Month
                    } else if (this.sss == 4) {
                        this.sss = this.lang.HMI_HT_LineChartWindowViewModel_Year
                    }
                });
        },
        // 添加器件信息
        addInfo() {
            if(!this.tjshow) {
                setTimeout(() => {
                    $('.tip').css({zoom: this.a11});
                    this.tipchange = true;
                    this.move('tip', 'tiphead');
                });
                this.pdyd3 = true;
                this.tipword = this.lang.NoOperationAuthority;
                return
            }
            this.sestion = 1;
            setTimeout(() => {
                $('.sestion').css({
                    zoom: this.a11,
                    left: `calc(50% - ${($('.sestion').width() / 2) * this.a11}px)`,
                    top: `calc(50% - ${($('.sestion').height() / 2) * this.a11}px)`
                });
                this.change11 = true;
                setTimeout(()=>{
                    let w =  $('.linetop1').width() + 20 +'px'
                    let w1 =  $('.linetop3').width() + 20 +'px'
                    let w2 =  $('.linetop5').width() + 20 +'px'
                    $('.linetop2').css({width:`calc(100% - ${w})`})
                    $('.linetop4').css({width:`calc(100% - ${w1})`})
                    $('.linetop6').css({width:`calc(100% - ${w2})`})
                })
                this.move('sestion', 'sestionheader1');
            })

            this.pdyd1 = true;
            this.wantnowdata = {
                Selected: false, //是否选中
                ID: '',
                Number: '', //序号
                VulnerablePartName: '', //器件名称
                VulnerablePartNo: '', //器件编号
                AID: '', //器件编号
                UsingDevice: this.lang.EquipmentAccount_ClickSelect, //使用设备
                VulnerablePartModel: '', //器件型号
                MaturityTime: '', //到期时间
                ResidualLife: '', //剩余寿命
                EnableTime: '', //启用日期
                LifeCycleValue: '', //寿命周期
                LifeCycleUnit: this.lang.HMI_HT_LineChartWindowViewModel_Hour, //寿命周期类型：1-小时 2-天 3-月 4-年
                LifeCycleDisplayName: '', //寿命周期在表格显示
                TimerType: this.lang.VulnerablePartManage_StandardTime, //统计类型,统计信号为空时，计时类型为标准时间，否则为运行时间
                RunningSignal: this.lang.EquipmentAccount_ClickSelect, //统计信号
                ReminderTimeValue: '', //提前提醒
                ReminderTimeUnit: this.lang.HMI_HT_LineChartWindowViewModel_Hour, //提前提醒类型：1-小时 2-天 3-月 4-年
                ReminderTimeDisplayName: '', //提前提醒
                Executor: 'SuperAdmin', //执行人员
                UseNumber: '', //使用数量
                Price: '', //器件价格
                Manufactor: '', //供应商
                Remarks: '', //备注
                Status: this.lang.SCMSConsoleWebApiMySql_Reminded, //状态,1为提醒了，2为未提醒
                Coefficient: 1,
            };
            this.wantnowdata.EnableTime = this.getNowTime();
            this.wantnowdata.OldVulnerablePartName = this.wantnowdata.VulnerablePartName;
            console.log(this.wantnowdata);
            console.log(this.sestion);
        },
        // 查看器件信息
        checkInfo(a, b) {
            if(!this.ckshow) {
                setTimeout(() => {
                    $('.tip').css({zoom: this.a11});
                    this.tipchange = true;
                    this.move('tip', 'tiphead');
                });
                this.pdyd3 = true;
                this.tipword = this.lang.NoOperationAuthority;
                return
            }

            this.sestion = 2;
            this.wantnowdata = b;
            setTimeout(() => {
                $('.sestion').css({
                    zoom: this.a11,
                    left: `calc(50% - ${($('.sestion').width() / 2) * this.a11}px)`,
                    top: `calc(50% - ${($('.sestion').height() / 2) * this.a11}px)`
                });
                this.change11 = true;
                setTimeout(()=>{
                    let w =  $('.linetop1').width() + 20 +'px'
                    let w1 =  $('.linetop3').width() + 20 +'px'
                    let w2 =  $('.linetop5').width() + 20 +'px'
                    $('.linetop2').css({width:`calc(100% - ${w})`})
                    $('.linetop4').css({width:`calc(100% - ${w1})`})
                    $('.linetop6').css({width:`calc(100% - ${w2})`})
                })
                this.move('sestion', 'sestionheader1');
            })
            this.pdyd1 = true;
            if (this.wantnowdata.LifeCycleUnit == 1) {
                this.wantnowdata.LifeCycleUnit = this.lang.HMI_HT_LineChartWindowViewModel_Hour
            } else if (this.wantnowdata.LifeCycleUnit == 2) {
                this.wantnowdata.LifeCycleUnit = this.lang.MaintenanceManage_Day
            } else if (this.wantnowdata.LifeCycleUnit == 3) {
                this.wantnowdata.LifeCycleUnit = this.lang.HMI_HT_LineChartWindowViewModel_Month
            } else if (this.wantnowdata.LifeCycleUnit == 4) {
                this.wantnowdata.LifeCycleUnit = this.lang.HMI_HT_LineChartWindowViewModel_Year
            }
            if (this.wantnowdata.ReminderTimeUnit == 1) {
                this.wantnowdata.ReminderTimeUnit = this.lang.HMI_HT_LineChartWindowViewModel_Hour
            } else if (this.wantnowdata.ReminderTimeUnit == 2) {
                this.wantnowdata.ReminderTimeUnit = this.lang.MaintenanceManage_Day
            } else if (this.wantnowdata.ReminderTimeUnit == 3) {
                this.wantnowdata.ReminderTimeUnit = this.lang.HMI_HT_LineChartWindowViewModel_Month
            } else if (this.wantnowdata.ReminderTimeUnit == 4) {
                this.wantnowdata.ReminderTimeUnit = this.lang.HMI_HT_LineChartWindowViewModel_Year
            }
            this.wantnowdata.ReminderTimeValue = parseInt(
                this.wantnowdata.ReminderTimeValue
            );
            this.wantnowdata.LifeCycleValue = parseInt(
                this.wantnowdata.LifeCycleValue
            );
            console.log(this.wantnowdata);
            console.log('sadasdadasdasdasdasd');
        },
        // 编辑器件信息
        editInfo(a, b) {
            if(!this.bjshow) {
                setTimeout(() => {
                    $('.tip').css({zoom: this.a11});
                    this.tipchange = true;
                    this.move('tip', 'tiphead');
                });
                this.pdyd3 = true;
                this.tipword = this.lang.NoOperationAuthority;
                return
            }
            this.sestion = 3;
            setTimeout(() => {
                $('.sestion').css({
                    zoom: this.a11,
                    left: `calc(50% - ${($('.sestion').width() / 2) * this.a11}px)`,
                    top: `calc(50% - ${($('.sestion').height() / 2) * this.a11}px)`
                });
                this.change11 = true;
                setTimeout(()=>{
                    let w =  $('.linetop1').width() + 20 +'px'
                    let w1 =  $('.linetop3').width() + 20 +'px'
                    let w2 =  $('.linetop5').width() + 20 +'px'
                    $('.linetop2').css({width:`calc(100% - ${w})`})
                    $('.linetop4').css({width:`calc(100% - ${w1})`})
                    $('.linetop6').css({width:`calc(100% - ${w2})`})
                })
                this.move('sestion', 'sestionheader1');
            })
            this.pdyd1 = true;
            this.wantnowdata = b;
            this.wantnowdata.PID = b.ID;


            console.log("器件信息", JSON.parse(JSON.stringify(this.wantnowdata)));
            if (this.wantnowdata.TimerType === '使用次数') {
                this.sametimearr = ['次']
            } else {
                this.sametimearr = ['小时', '天', '月', '年']
            }

            // 寿命周期-单位
            if (this.wantnowdata.LifeCycleUnit == 1) {
                this.wantnowdata.LifeCycleUnit = this.lang.HMI_HT_LineChartWindowViewModel_Hour;
            } else if (this.wantnowdata.LifeCycleUnit == 2) {
                this.wantnowdata.LifeCycleUnit = this.lang.MaintenanceManage_Day;
            } else if (this.wantnowdata.LifeCycleUnit == 3) {
                this.wantnowdata.LifeCycleUnit = this.lang.HMI_HT_LineChartWindowViewModel_Month;
            } else if (this.wantnowdata.LifeCycleUnit == 4) {
                this.wantnowdata.LifeCycleUnit = this.lang.HMI_HT_LineChartWindowViewModel_Year;
            } else if (this.wantnowdata.LifeCycleUnit == 5) {
                this.wantnowdata.LifeCycleUnit = '次';
            }

            // 提前提醒-单位
            if (this.wantnowdata.ReminderTimeUnit == 1) {
                this.wantnowdata.ReminderTimeUnit = this.lang.HMI_HT_LineChartWindowViewModel_Hour;
            } else if (this.wantnowdata.ReminderTimeUnit == 2) {
                this.wantnowdata.ReminderTimeUnit = this.lang.MaintenanceManage_Day;
            } else if (this.wantnowdata.ReminderTimeUnit == 3) {
                this.wantnowdata.ReminderTimeUnit = this.lang.HMI_HT_LineChartWindowViewModel_Month;
            } else if (this.wantnowdata.ReminderTimeUnit == 4) {
                this.wantnowdata.ReminderTimeUnit = this.lang.HMI_HT_LineChartWindowViewModel_Year;
            } else if (this.wantnowdata.ReminderTimeUnit == 5) {
                this.wantnowdata.ReminderTimeUnit = '次';
            }

            // 提前提醒-值
            this.wantnowdata.ReminderTimeValue = parseInt(this.wantnowdata.ReminderTimeValue);
            this.wantnowdata.LifeCycleValue = parseInt(this.wantnowdata.LifeCycleValue);
            if(this.wantnowdata.RunningSignal == null){
                this.wantnowdata.RunningSignal = this.lang.EquipmentAccount_ClickSelect
            }
            this.wantnowdata.OldVulnerablePartName = JSON.parse(JSON.stringify(this.wantnowdata.VulnerablePartName))
        },
        // 提交器件信息
        nopre() {
            console.clear();
            // 转换单位
            const conversionUnit = () => {
                // 寿命周期-单位
                const LifeCycleUnit = getLifeCycleUnitValue(this.wantnowdata.LifeCycleUnit)
                if (LifeCycleUnit) {
                    this.wantnowdata.LifeCycleUnit = LifeCycleUnit
                } else {
                    console.log('寿命周期-单位有误');
                    return false
                }
                // 提前提醒-单位
                const ReminderTimeUnit = getLifeCycleUnitValue(this.wantnowdata.ReminderTimeUnit)
                if (ReminderTimeUnit) {
                    this.wantnowdata.ReminderTimeUnit = ReminderTimeUnit
                } else {
                    console.log('提前提醒-单位有误');
                    return false
                }

                // 统计类型
                const SelectedTimerType = getStatisticalTypeValue(this.wantnowdata.SelectedTimerType || this.wantnowdata.TimerType)
                if (SelectedTimerType) {
                    this.wantnowdata.SelectedTimerType = SelectedTimerType
                } else {
                    console.log('统计类型有误');
                    return false
                }
            }
            if (conversionUnit() === false) return

            this.wantnowdata.LifeCycleTotalMinute = this.wantnowdata.LifeCycleValue;
            this.wantnowdata.AddTime = this.getNowTime();
            this.wantnowdata.Status = '1';
            this.wantnowdata.AlarmTime = '1';
            this.wantnowdata.RunMinute = '1';
            this.wantnowdata.AlarmMinute = '1';
            this.wantnowdata.LoginUserName = this.abc;
            
            if (!this.wantnowdata.LifeCycleValue) {
                this.tipchange = true;
                this.tipword = '寿命周期不允许为空，请重新输入';
                conversionUnit()
                return
            }

            if (this.sestion == 1) { // 添加模式
                this.wantnowdata.Operate = 1;
                console.log("器件信息", JSON.parse(JSON.stringify(this.wantnowdata)));
                console.log("", JSON.parse(JSON.stringify({
                    "1启用日期": this.wantnowdata.EnableTime,
                    "2.0统计类型(中文)": this.wantnowdata.TimerType,
                    "2.1统计类型(值)": this.wantnowdata.SelectedTimerType,
                    "3.0寿命周期(值)": this.wantnowdata.LifeCycleValue,
                    "3.1寿命周期(单位)": this.wantnowdata.LifeCycleUnit,
                    "4运行信号": this.wantnowdata.RunningSignal,
                    "5统计系数": this.wantnowdata.Coefficient,
                    "6.0提前提醒(值)": this.wantnowdata.ReminderTimeValue,
                    "6.1提前提醒(单位)": this.wantnowdata.ReminderTimeUnit,
                    "7执行人": this.wantnowdata.Executor,
                })));
                this.$axios({
                    method: 'post',
                    url: `/api/VulnerablePartManage/VulnerablePartManage_SaveAcount`,
                    data: this.wantnowdata
                }).then(res => {
                    console.log('提交器件信息.添加', res);
                    if (res.data.code === 1) {
                        this.tipchange = true;
                        this.tipword = res.data.msg;
                        return
                    }

                    setTimeout(() => {
                        $('.tip').css({zoom: this.a11});
                        this.tipchange = true;
                        this.move('tip', 'tiphead');
                    });
                    this.pdyd3 = true;
                    if (res.data.msg == '请求成功') {
                        this.tipword = this.lang.EquipmentAccount_SuccessfullyAdded
                        this.change11 = false;
                        this.getsetime();
                    } else {
                        if(res.data.msg == "设备id格式应为GUID！"){
                            this.tipword = this.lang.VulnerablePartManage_DeviceChoice
                        }else{
                            this.tipword = res.data.msg;
                        }
                    }
                });
            } else if (this.sestion == 3) { // 编辑模式
                this.wantnowdata.Operate = 2;

                console.log("器件信息", JSON.parse(JSON.stringify(this.wantnowdata)));
                console.log("", JSON.parse(JSON.stringify({
                    "1启用日期": this.wantnowdata.EnableTime,
                    "2.0统计类型(中文)": this.wantnowdata.TimerType,
                    "2.1统计类型(值)": this.wantnowdata.SelectedTimerType,
                    "3.0寿命周期(值)": this.wantnowdata.LifeCycleValue,
                    "3.1寿命周期(单位)": this.wantnowdata.LifeCycleUnit,
                    "4运行信号": this.wantnowdata.RunningSignal,
                    "5统计系数": this.wantnowdata.Coefficient,
                    "6.0提前提醒(值)": this.wantnowdata.ReminderTimeValue,
                    "6.1提前提醒(单位)": this.wantnowdata.ReminderTimeUnit,
                    "7执行人": this.wantnowdata.Executor,
                })));

                this.$axios({
                    method: 'post',
                    url: `/api/VulnerablePartManage/VulnerablePartManage_SaveAcount`,
                    data: this.wantnowdata
                }).then(res => {
                    console.log('提交器件信息.编辑', res);
                    if (res.data.code === 1) {
                        this.tipchange = true;
                        this.tipword = res.data.msg;
                        return
                    }
                    setTimeout(() => {
                        $('.tip').css({zoom: this.a11});
                        this.tipchange = true;
                        this.move('tip', 'tiphead');
                    });
                    this.pdyd3 = true;
                    if (res.data.msg == '请求成功') {
                        this.tipword = this.lang.FormulaManage_HT_FormulaSetting_ModifiedSuccessfully;
                        this.change11 = false;
                        this.getsetime();
                    } else {
                        this.tipword = res.data.msg;
                    }
                });
            }
            conversionUnit()
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
       jump() {
            if (!this.isPositiveInteger(this.nowpage)) {
               setTimeout(() => {
                        $('.tip').css({
                            zoom: this.a11,
                          
                        });
                        this.tipchange = true;
                        this.move('tip', 'tiphead');
                    });
                this.pdyd3 = true;
                this.tipword = this.lang.RoleManage_HT_PEAPositiveInteger;
               setTimeout(() => {
                        $('.tip').css({
                            zoom: this.a11,
                          
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
                          
                        });
                        this.tipchange = true;
                        this.move('tip', 'tiphead');
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
                    $('.seleword')[0].clientHeight +2+
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
              $(`.selectword2`).css({
                left:
                    $('.sblx1')[0].offsetLeft +
                    $('.sblx1')[0].clientWidth +10+
                    'px',
                       top:
                    $('.lookfor1')[0].offsetTop +
                    $('.seleword1')[0].clientHeight +2+
                    'px'
            });
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
            console.log(this.sesstion.CloseRemarks);
            console.log(this.sesstion.SynchronizeToSOP);
            console.log(this.abc);
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
                    `/api/RepairManage/RepairManage_SubmitUpcoming?argTID=${this.sesstion.ID}&stringResult=${this.over}&argDesc=${this.sesstion.CloseRemarks}&argSaveToSOP=${this.sesstion.SynchronizeToSOP}&argLoginUserName=${this.abc}`
                )
                .then(res => {
                    setTimeout(() => {
                        $('.tip').css({
                            zoom: this.a11,
                          
                        });
                        this.tipchange = true;
                        this.move('tip', 'tiphead');
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
                    `/api/VulnerablePartManage/VulnerablePartManage_GstPlan?argDeviceType=${c}&argStartTime=${this.value1}&argEndTime=${this.value2}&argKeyword=${this.keyword}&argPageSize=${this.PageData.PageSize}&argPageIndex=${this.PageData.PageIndex}`
                )
                .then(res => {
                      if (res.data.code == 0) {
                                this.tableData1 = res.data.data.DataList;
                        this.PageData = res.data.data.ParameterList;
                    let i = 0;
                    for (i in this.tableData1) {
                        this.tableData1[i].EnableTime = this.gettime(
                            this.tableData1[i].EnableTime
                        );
                        if (this.tableData1[i].LifeCycleUnit == 1) {
                            this.tableData1[i].LifeCycleValue =
                                this.tableData1[i].LifeCycleValue + this.lang.HMI_HT_LineChartWindowViewModel_Hour;
                        } else if (this.tableData1[i].LifeCycleUnit == 2) {
                            this.tableData1[i].LifeCycleValue =
                                this.tableData1[i].LifeCycleValue + this.lang.MaintenanceManage_Day;
                        } else if (this.tableData1[i].LifeCycleUnit == 3) {
                            this.tableData1[i].LifeCycleValue =
                                this.tableData1[i].LifeCycleValue + this.lang.HMI_HT_LineChartWindowViewModel_Month;
                        } else if (this.tableData1[i].LifeCycleUnit == 4) {
                            this.tableData1[i].LifeCycleValue =
                                this.tableData1[i].LifeCycleValue + this.lang.HMI_HT_LineChartWindowViewModel_Year;
                        }
                        if (this.tableData1[i].ReminderTimeUnit == 1) {
                            this.tableData1[i].ReminderTimeValue =
                                this.tableData1[i].ReminderTimeValue + this.lang.HMI_HT_LineChartWindowViewModel_Hour;
                        } else if (this.tableData1[i].ReminderTimeUnit == 2) {
                            this.tableData1[i].ReminderTimeValue =
                                this.tableData1[i].ReminderTimeValue + this.lang.MaintenanceManage_Day;
                        } else if (this.tableData1[i].ReminderTimeUnit == 3) {
                            this.tableData1[i].ReminderTimeValue =
                                this.tableData1[i].ReminderTimeValue + this.lang.HMI_HT_LineChartWindowViewModel_Month;
                        } else if (this.tableData1[i].ReminderTimeUnit == 4) {
                            this.tableData1[i].ReminderTimeValue =
                                this.tableData1[i].ReminderTimeValue + this.lang.HMI_HT_LineChartWindowViewModel_Year;
                        }
                        if (this.tableData1[i].Status == 1) {
                            this.tableData1[i].Status = this.lang.SCMSConsoleWebApiMySql_Reminded
                        } else if (this.tableData1[i].Status == 0) {
                            this.tableData1[i].Status = this.lang.SCMSConsoleWebApiMySql_NotRemind
                        }
                    }
               
                      }else{
                      setTimeout(() => {
                        $('.tip').css({
                            zoom: this.a11,
                          
                        });
                        this.tipchange = true;
                        this.move('tip', 'tiphead');
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
                    console.log(this.tableData1);
                      let avc = JSON.stringify(this.tableData1);
                    this.antable = JSON.parse(avc);
                });
        },
        varcancel(){
         this.yx = false;
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
                            zoom: this.a11,
                          
                        });
                        this.tipchange = true;
                        this.move('tip', 'tiphead');
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
                            zoom: this.a11,
                          
                        });
                        this.tipchange = true;
                        this.move('tip', 'tiphead');
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
                            zoom: this.a11,
                          
                        });
                        this.tipchange = true;
                        this.move('tip', 'tiphead');
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
                            res.data.data.DataList[a].DeviceStatus = this.lang.EquipmentAccount_Used
                        } else if (
                            res.data.data.DataList[a].DeviceStatus == 2
                        ) {
                            res.data.data.DataList[a].DeviceStatus = this.lang.EquipmentAccount_Stopped
                        } else if (
                            res.data.data.DataList[a].DeviceStatus == 3
                        ) {
                            res.data.data.DataList[a].DeviceStatus = this.lang.EquipmentAccount_Abandoned
                        }
                        if (res.data.data.DataList[a].QualityStatus == 1) {
                            res.data.data.DataList[a].QualityStatus = this.lang.EquipmentAccount_Inside
                        } else if (
                            res.data.data.DataList[a].QualityStatus == 2
                        ) {
                            res.data.data.DataList[a].QualityStatus = this.lang.EquipmentAccount_Outside
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
        varpre(){
          if(!this.tyname){
              setTimeout(() => {
                        $('.tip').css({
                            zoom: this.a11,
                          
                        });
                        this.tipchange = true;
                        this.move('tip', 'tiphead');
                    });
              this.pdyd3 = true;
              this.tipword = this.lang.QualityManage_HT_ChoseProcessItemWindowViewModel_PsaVariable
          }else{
              this.wantnowdata.RunningSignal = this.tyname;
              this.yx = false;
          }
           
        },
        // 统计类型值改变
        StatisticalTypeChange() {
            if ( this.wantnowdata.TimerType === this.lang.VulnerablePartManage_RunningTime ) {
                this.pdyx = true;
            } else {
                this.pdyx = false;
            }

            if (this.wantnowdata.TimerType === '使用次数') {
                this.sametimearr = ['次']
                this.wantnowdata.LifeCycleUnit = "次"
                this.wantnowdata.ReminderTimeUnit = "次"
            } else {
                this.sametimearr = ['小时', '天', '月', '年']
                this.wantnowdata.LifeCycleUnit = "小时"
                this.wantnowdata.ReminderTimeUnit = "小时"
                this.wantnowdata.Coefficient = 1
            }
        },
        // 统计信号-显示
        yunxing() {
            if (this.wantnowdata.TimerType === '标准时间') return
            this.addproject();
            setTimeout(() => {
                $('.selectvar ').css({
                    left: `calc(50% - ${($('.selectvar ').width() / 2) * this.a11}px)`,
                    top: `calc(50% - ${($('.selectvar ').height() / 2) * this.a11}px)`
                });
                this.yx = true;
                this.move('selectvar ', 'selectvartop');
            });
        },
        // 统计信号-
        addproject() {
            var $this = this
            this.$axios
                .post(`/api/ProcessParameterConfigure/GstCondition`)
                .then(res => {
                    $this.projectlist = res.data.data;
                    $this.projectlist2 = $this.projectlist[0].Groups;
                    let types = [this.lang.AlarmRecord_HT_Unlimited, '二进制变量', '有符号8位整型','无符号8位整型','有符号16位整型','无符号16位整型','有符号32位整型','无符号32位整型','有符号64位整型','无符号64位整型','F32位浮点数IEEE754','F64位浮点数IEEE754']
                    $this.projectlist3 = $this.projectlist2[0].DataTypes.filter(
                        function(item) {
                            // return item.Value == $this.lang.AlarmRecord_HT_Unlimited || item.Value == '二进制变量'
                            return types.includes(item.Value)
                        }
                    );
                    $this.oneselect1 = $this.projectlist[0].DeviceName;
                    $this.twoselect1 = $this.projectlist2[0].GroupName;
                    $this.threeselect1 = /* $this.projectlist3[0].Value; */$this.lang.AlarmRecord_HT_Unlimited
                })
                .then(() => {
                    $this.watchdata();
                    $this.lookforsearch1 = true;
                });
        },

        // 获取所有设备类型和安装位置
        getEquipmentType() {
            this.$axios
                .post(`/api/EquipmentAccount/EquipmentAccount_GstEquipmentType`)
                .then(res => {
                    this.a1 = 1;
                    this.a2 = 1;
                    console.log(res);
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
        watchdata() {
            let arr = []
            if(this.threeselect1== this.lang.AlarmRecord_HT_Unlimited){
                this.projectlist3.filter(f => f.Value !== this.lang.AlarmRecord_HT_Unlimited).forEach(item => {
                    arr.push(item.Value)
                })
            }else{
                arr.push(this.threeselect1)
            }
            this.$axios({
                method:'post',
                url:`/api/ProcessParameterConfigure/GstVariableList`,
                data:{
                    argDevice:this.oneselect1,
                    argGroup:this.twoselect1,
                    argDataType:arr,
                    argKeyWord:this.selectvarword,
                    argPageSize:this.PageData1.PageSize,
                    argPageIndex:this.PageData1.PageIndex

                }
            }).then(res => {
                    console.log(res);
                    this.selecttabledata = res.data.data.DataList;

                    this.PageData1 = res.data.data.ParameterList;
                    //     this.pageDate.togesize = this.projectlistdata.length;
                    //     this.pageDate.togeIndex = Math.ceil(
                    //         this.projectlistdata.length / 50
                    //     );
                    //     let a = this.nowIndex - 1;
                    //     if (this.pageDate.togesize <= 50) {
                    //         let b = this.pageDate.togesize;
                    //         this.pageDate.pageIndex = this.nowIndex;
                    //     } else {
                    //         let b = this.nowIndex * 1 + 1;
                    //         this.pageDate.pageIndex = this.nowIndex;
                    //         this.projectlistdata = this.projectlistdata.splice(
                    //             a * 1,
                    //             50
                    //         );
                    //         // let c = 0;
                    //         // for(c in this.projectlistdata){
                    //         //     let d = (parseInt(c)+1);
                    //         //     this.projectlistdata[c].Number = d;
                    //         // }
                    //     }
                    //     if (this.nowIndex >= this.pageDate.togeIndex) {
                    //         this.aaa1 = false;
                    //     } else {
                    //         this.aaa1 = true;
                    //     }
                    //     if (this.nowIndex < this.pageDate.togeIndex) {
                    //         this.bbb1 = false;
                    //     } else {
                    //         this.bbb1 = true;
                    //     }
                    //     this.nowpage = 1;
                });
        },
        
        getsetime() {
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
         this.a11 = Number(parseFloat(window.screen.width / 1920).toFixed(2));
        if (this.a11 < 1) {
            this.a11 = 0.8;
        }
        setTimeout(() => {
            let a = this.a11 * 170 + 'px';
            $('.table-container').css({
                height: `calc(100% - ${a})`
            });
        });
        this.value1 = this.GMTToStr(this.value1);
        this.value2 = this.GMTToStr(this.value2);
        this.getsetime();
        console.log(this.tableData);
        this.nowtime1 = this.gettimenowtime();
        this.nowtime2 = this.gettimenowtime();
        if (!JSON.parse(sessionStorage.getItem('userInfo1'))|(JSON.parse(sessionStorage.getItem('userInfo1')) == null)) {
            this.abc = JSON.parse(
                sessionStorage.getItem('sightseerInfo1')
            ).SCMSUserName;
        } else {
            this.abc = JSON.parse(
                sessionStorage.getItem('userInfo1')
            ).SCMSUserName;
        }
         this.$axios
            .post(`/api/UserManage/UserManage_GstUserWithNoPage`)
            .then(res => {
                console.log('ss', res);
                this.person = res.data.data;
            });
        this.$refs.upload.addEventListener('change', e => {
            //绑定监听表格导入事件
            // this.readExcel(e);
        });
          this.jurisdiction = this.$store.state.btnPowerData
     this.buttonarr = this.findPathByLeafId(this.GetUrlParam('id'),this.jurisdiction)[0].Children
        console.log("nut",this.buttonarr)
           this.buttonarr.forEach((item)=>{
                 if(item.RightName == "易损件台账-查询按钮"){
                 this.cxid = item.RightID
              }else if(item.RightName == "易损件台账-添加按钮"){
                this.tjid = item.RightID
              }else if(item.RightName == "易损件台账-删除按钮"){
                this.scid = item.RightID
              }else if(item.RightName == "易损件台账-导入按钮"){
                this.drid = item.RightID
              }else if(item.RightName == "易损件台账-导出按钮"){
                this.dcid = item.RightID
              }else if(item.RightName == "易损件台账-查看按钮"){
                this.ckid = item.RightID
              }else if(item.RightName == "易损件台账-编辑按钮"){
                this.bjid = item.RightID
              }else if(item.RightName == "易损件台账-更换按钮"){
                this.ghid = item.RightID
              }else if(item.RightName == "易损件台账-延长按钮"){
                this.ycid = item.RightID
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
                  url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.drid}`,
              }).then(res => {
                  this.drshow = res.data.data
              
              }).catch((err)=>{
                  console.log('err',err)
              })
                   this.$axios({
                  method: 'post',
                  url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.dcid}`,
              }).then(res => {
                  this.dcshow = res.data.data
              
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
                  this.bjshpw = res.data.data
              
              }).catch((err)=>{
                  console.log('err',err)
              })
                   this.$axios({
                  method: 'post',
                  url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.ghid}`,
              }).then(res => {
                  this.ghshow = res.data.data
              
              }).catch((err)=>{
                  console.log('err',err)
              })
                   this.$axios({
                  method: 'post',
                  url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.ycid}`,
              }).then(res => {
                  this.ycshow = res.data.data
              
              }).catch((err)=>{
                  console.log('err',err)
              })
    }
};
</script>

<style lang='scss' scoped>
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
// .sp6 {
//     position: relative;
//     top: -10px;
// }
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
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 12px;
        text-align: center;
    }
    .tipdetermine {
        cursor: pointer;
        color: #ea9328;
        width: 310px;
        position: absolute;
        bottom: 13px;
        right: 0;
        left: 0;
        margin: auto;
        line-height: 30px;
        text-align: center;
        margin-top: 40px;
        margin-left: 35px;
        height: 30px;
        background-color: #f3e3ad;
    }

    .delclass {
        width: 330px;
        line-height: 30px;
        // margin-top: 40px;
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
.spge {
    margin-left: 10px;
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
    height: 110px !important;
    line-height: 50px;
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
.selectword2 {
    position: absolute !important;
    // top: 70px !important;
    // left: 175px !important;
}
.import {
    border: 1px solid #fda100;
    background-color: #ffffff;
    width: 120px;
    height: 38px;
    display: block;
    border-radius: 4px;
    margin-left: 10px;
    position: relative;
    top: 12px;
    text-align: center;
    line-height: 38px;
    cursor: pointer;
    display: inline-block;
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
    display: inline-block;
    border-radius: 4px;
    text-align: center;
    line-height: 38px;
    cursor: pointer;

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
    // position: relative;
    // left: -20px;
    // bottom: -10px;
    display: flex;
    margin-top: 10px;

}

.sestion {
    width: 800px;
    height: 760px;
    position: fixed;
    top: 120px;
    left: 590px;
    border: 1px solid #cccccc;
    box-shadow: 0px 0px 8px black;
    z-index: 11999999;
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
        width: 80px;
        text-align: left;
        align-items: center;
    }
}

.overflow {
    overflow: hidden;
    width: 100%;
    // margin-top: 15px;
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
    .handle {
        cursor: pointer;
    }
    .inputimg1 {
        z-index: 50999999;
        position: absolute;
        right: 7px;
        top: 0;

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
    width: calc(100% - 120px);
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
.nans {
    option {
        display: block !important;
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
.cover8 {
    width: 100%;
    height: 100%;
    z-index: 29999999;
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
    z-index: 1099999;
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
    height: 470px !important;
    top: 260px;
    z-index: 26999999 !important;
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
        bottom: -55px;
        position: absolute;
        height: 36px;
        right: 195px;
        // margin-top: 20px;
        // margin-right: 170px;
        background-color: #999999;
        float: right;
        color: #ffffff;
        border-radius: 3px;
        text-align: center;
        line-height: 34px;
    }
    .table {
        // width: 950px !important;
        margin-left: 23px;
          width: calc(100% - 46px) !important;
        // height: 320px !important;
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
.sp12 {
    display: inline-block;
    width: 56px;
    text-align: right;
}
.wantlook {
    width: 600px !important;
    height: 400px !important;
    left: 800px ;
    .lookcontent {
        padding-top: 0px !important;
    }
    .pre {
        bottom: -55px;
        right: 90px;
    }
}
.wantdiv {
    margin-top: 40px;
    span {
        font-size: 14px;
    }
    textarea {
        margin-left: 30px;
        width: 360px;
    }
    .wantsp {
        display: inline-block;
        width: 60px;
        text-align: right;
    }
}
.div1 {
    float: right;
    height: 40px;
    width: 360px;
    overflow: hidden;
    margin-right: 60px;
    .block {
        width: 360px;
    }
    input {
        width: 240px;
        float: left;
        height: 30px;
        border: 1px solid #ccc;
        //  border:none
    }
    select {
        width: 120px !important;
        height: 30px;
        float: right;
        border: 1px solid #ccc;
        // border:none
    }
}
.ss {
    position: relative;
    top: -100px;
}
.file {
    margin-top: 0px !important;
    border: none !important;
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
.myd {
    position: relative;
    top: -10px;
}
.cancel11 {
    bottom: 10px !important;
    right: 160px !important;
}
.selectvar {
    .cancel {
        width: 100px;
        height: 36px;
        text-align: center;
        line-height: 36px;
        position: absolute;
        background-color: #999999;
        border-radius: 4px;
        color: #fff;
        cursor: pointer;
        font-size: 14px;
        z-index: 100999999;
        right: 180px;
        bottom: 10px;
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
        right: 70px;
        bottom: 10px;
    }
    z-index: 30999999;
    width: 1120px;
    top: 150px;
    left: 400px;
    position: fixed;
    height: 600px;
    background-color: #eeeeee;
    box-shadow: 0px 0px 8px black;
    .selectvarhead {
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
    .selecectvarselect {
        width: 1000px;
        height: 436px;
        background-color: #f4f4f4;
        overflow: hidden;
        border: 1px solid #cccccc;
    }
    .selectvartop {
        width: 100%;
        height: 50px;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 11999999;
    }
    .selectvarcontent {
        padding: 30px 30px 0px 60px;
        width: 100%;
        .search {
            span {
                font-size: 12px;
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
                width: 130px !important;
                margin-right: 10px;
                border: none;
            }
            .inputname {
                margin: 0px 10px;
                width: 600px;
            }
            .selectvarfor {
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
    .selectvartable {
        width: 100%;
        margin-left: 23px;
        // height: 320px !important;
        border: 1px solid #ccc;
    }
}
.selectvarpage {
    margin-top: 12px;
    .btn {
        cursor: pointer;
    }
    width: 100%;
    height: 50px;
    color: #ababab;
    padding:0 10px;
    font-size: 13px;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .nopage {
        border: 2px solid #fed286 !important;
        color: #fed286;
    }
    .pageoperation {
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
.seleword{
    display: inline-block;
    width: 13%;
    height: 40px;
    position: absolute;
    top: 8px;
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
    // top: 41px !important;
    // left: 113px !important;
}
.sblx{
    display: inline-block;
}
.linetop1{
    display: inline-block;
}
.linetop3{
    display: inline-block;
}
.linetop5{
    display: inline-block;
}
.sblx1{
    display: inline-block;
}
.img{
    font-size:16px;
}
.lookhead{
    img{
        top:0 !important;
        bottom:0 !important;
        margin:auto;
    }
}
.selectvar3{
     img{
        top:0 !important;
        bottom:0 !important;
        margin:auto;
    }
}
.look222{
    zoom: 1 !important;
}

.statisticalCoefficient ::v-deep .el-input-number__decrease,
.statisticalCoefficient ::v-deep .el-input-number__increase {
    height: 34px;
    top: 2px;
}
</style>

