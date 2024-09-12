<!--
 * @Description: 这是配方管理页面（组件）
 * @Date: 2019-11-28 10:59:10
 * @Author: Tao
 * @LastEditors: Tao
 * @LastEditTime: 2020-11-12 19:49:02
 -->
<template>
    <div class="container lookcontentw">
        <div class="cover11" v-if="tipchange"></div>
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
                <span  v-if="deltrue">{{tipword}}</span>
                <span v-if="!deltrue">{{tipword}}</span>
                
            </div>
            <div class="delclass" v-if="!deltrue">
                    <div class="one" @click="no1">{{lang.MessageBox_NO}}</div>
                    <div class="two" @click="yes1">{{lang.MessageBox_YES}}</div>
                </div>
                <div class="tipdetermine" @click="tip1" v-if="deltrue">{{lang.MessageBox_Confrim}}</div>
        </div>
        <div class="cover11" v-if="processMess"></div>
        <div class="tip processMess" v-show="processMess" :style="{zoom:a11}">
            <div class="messhead"></div>
            <div class="messtop">
                <span>{{lang.FormulaManage_HT_ApplicateProgress_Title}}</span>
                <img :src="no" alt class="no" @click="closeIssue"/>
            </div>
            <div>
                <div class="precesstip">{{lang.FormulaManage_HT_ApplicateProgress_HintMessage}}</div>
                <div class="processtrack">
                    <div class="process" :style="{width: process+'%'}"></div>
                    <div class="processtraj">{{process}}%</div>
                </div>
                <div class="process-error" v-show="processErr" >{{lang.FormulaManage_HT_ApplicateProgress_ErrorMessage}}</div>
            </div>
        </div>
        <div class="table" :class="{colortip:$store.state.color=='grey'}" >
            <div class="first">
                <div class="firsthead" :style="{ fontSize: 20 * a11 + 'px' }">{{lang.FormulaManage_FormulaTemplateManagement}}</div>
                <div class="firsttable">
                    <div class="firstselect" :style="{zoom:a11}">
                        <div class="firstadd" @click="oneadd">
                            <!-- <img :src="hao" alt /> -->
                            {{lang.FormulaManage_Template}}
                        </div>
                    </div>
                    <el-table
                        ref="multipleTable3"
                        :data="tableData"
                        stripe
                        border
                        :height="`calc(100% - `+(a11*76)+`px)`"
                        class="eltable"
                        :style="{ fontSize: a11 * 15 + 'px', width: a11 * 1690 + 'px',height:`calc(100% - `+(a11*76)+`px)`}"
                        highlight-current-row
                        @row-click="handleRowChange"
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
                        <el-table-column :label="lang.FormulaManage_DataGrid_FormulaTemplate"  :min-width="230 * a11" prop="Name" :show-overflow-tooltip="true"></el-table-column>
                        <el-table-column prop="name" :label="lang.FormulaManage_DataGrid_Operation"  :width="145 * a11" >
                            <template slot-scope="scope">
                                <!-- <i class="el-icon-share"></i> -->
                                <div class="img" >
                                    <div
                                        class="up"
                                        :style="{width:a11*50+'px',height:25*a11+'px'}"
                                        @click.stop="onechange(scope.$index, scope.row)"
                                    >
                                        <img :style="{width:a11*20+'px',height:20*a11+'px'}" :src="pensoil" alt />
                                        {{scope.row.phone}}
                                    </div>
                                    <div :style="{width:a11*50+'px',height:25*a11+'px'}" class="up" @click.stop="onedel(scope.$index, scope.row)">
                                        <img :style="{width:a11*20+'px',height:20*a11+'px'}" :src="del" alt />
                                        {{scope.row.phone}}
                                    </div>
                                </div>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </div>
            <div class="second">
                <div class="firsthead" :style="{ fontSize: 20 * a11 + 'px' }">{{lang.FormulaManage_FormulaManagement}}</div>
                <div class="firsttable">
                    <div class="firstselect secondselect" :style="{zoom:a11}">
                        <div class="firstadd" @click="twoadd">
                            <!-- <img :src="hao" alt /> -->
                            {{lang.FormulaManage_Formula}}
                        </div>
                        <div class="firstchange" @click="yyong">{{lang.FormulaManage_Application}}</div>
                        <!-- <div class="set">
                            <span>配方名</span>
                            <select name id v-model="itemname">
                                <option
                                    v-for="(item,index) in tablename"
                                    :key="index"
                                    :value="item"
                                >{{item}}</option>
                            </select>
                        </div>-->
                        <div class="set">
                            <!-- <span>关键字</span> -->
                            <input type="text" name id v-model="tablekeyword" :placeholder="lang.FormulaManage_Keyword" />
                        </div>
                        <div class="search" @click="search">{{lang.FormulaManage_Search}}</div>
                    </div>
                    <el-table
                        ref="multipleTable1"
                        :data="tableData1"
                        stripe
                        border
                        class="eltable1"
                        
                         :height="`calc(100% - `+(a11*78)+`px)`"
                        :style="{ fontSize: a11 * 15 + 'px', width: a11 * 1690 + 'px',height:`calc(100% - `+(a11*78)+`px)` }"
                        highlight-current-row
                        @row-click="handleRowChange1"
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
                        <el-table-column :label="lang.FormulaManage_DataGrid_AppliedYesorno" :show-overflow-tooltip="true" :width="lang.FormulaManage_DataGrid_AppliedYesorno=='Whether it has been applied'?230*a11:120 * a11">
                            <template slot-scope="scope">
                                <div class="elcheck"   :style="{width:a11*20+'px',height:20*a11+'px'}">
                                    <img :src="yes" alt v-if="scope.row.IsApp" />
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="Name" :label="lang.FormulaManage_DataGrid_Name" :width="115 * a11" :show-overflow-tooltip="true"></el-table-column>
                        <el-table-column
                            prop="Number"
                           :label="lang.FormulaManage_DataGrid_Number"
                           :width="lang.FormulaManage_DataGrid_Number=='Recipe number'?140 * a11:100*a11"
                            :show-overflow-tooltip="true"
                        ></el-table-column>
                        <el-table-column
                            prop="FormulaDescription"
                             :label="lang.FormulaManage_DataGrid2_Describe"
                            :min-width="220 * a11"
                            :show-overflow-tooltip="true"
                        ></el-table-column>
                        <el-table-column prop="name" :label="lang.FormulaManage_DataGrid_Operation"   :show-overflow-tooltip="true" :width="207*a11+'px'">
                            <template slot-scope="scope">
                                <!-- <i class="el-icon-share"></i> -->
                                <div class="img">
                                    <div class="up" :style="{width:a11*50+'px',height:25*a11+'px'}">
                                        <img
                                        :style="{width:a11*20+'px',height:20*a11+'px'}"
                                            :src="pensoil"
                                            alt
                                            @click.stop="twochange(scope.$index, scope.row)"
                                        />
                                        {{scope.row.phone}}
                                    </div>
                                    <div class="up" :style="{width:a11*50+'px',height:25*a11+'px'}" @click.stop="twodel(scope.$index, scope.row)">
                                        <img :style="{width:a11*20+'px',height:20*a11+'px'}" :src="del" alt />
                                        {{scope.row.phone}}
                                    </div>
                                </div>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </div>
            <div class="third">
                <div class="firsthead" :style="{ fontSize: 20 * a11 + 'px' }">{{lang.FormulaManage_FormulaContent}}</div>
                <div class="firsttable">
                    <div class="firstselect thirdselect" :style="{zoom:a11}">
                        <div class="important">
                            <a href="javascript:;" class="file" @click="dr($event)">
                                {{lang.FormulaManage_Import}}
                                <input
                                    type="file"
                                    ref="upload"
                                    accept=".xls, .xlsx"
                                    class="outputlist_upload"
                                    @change="readExcel"
                                />
                            </a>
                        </div>
                        <div class="export" @click="exportdata">{{lang.FormulaManage_Export}}</div>
                        <div class="firstchange1" @click="cover">{{lang.FormulaManage_Cover}}</div>
                        <div class="formulaname">
                            <span>{{lang.FormulaManage_FormulaName3}}{{Name}}</span>
                        </div>
                    </div>
                    <el-table
                        ref="multipleTabl2"
                        :data="tableData2"
                        :row-style="{ height: 50 * a11 + 'px' }"
                        stripe
                        border
                        class="eltable1"
                         :height="`calc(100% - `+(a11*136)+`px)`"
                       :style="{
                                fontSize: a11 * 15 + 'px',
                                width: 1658*1658+'px',
                                height:`calc(100% - `+(a11*136)+`px)`
                            }"
                        highlight-current-row
                        @row-click="handleRowChange2"
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
                        <el-table-column :label="lang.FormulaManage_DataGrid_Content" :min-width="140 * a11" prop="ProjectContent" :show-overflow-tooltip="true"></el-table-column>

                        <el-table-column prop="Value"  :label="lang.FormulaManage_DataGrid_FormulaValue" :width="130 * a11" :show-overflow-tooltip="true"></el-table-column>
                        <el-table-column
                            prop="Value12"
                             :label="lang.FormulaManage_DataGrid_RealTimeValue"
                           :width="lang.FormulaManage_DataGrid_RealTimeValue=='Real-time value'?140 * a11:130 * a11"
                            :show-overflow-tooltip="true"
                        >
                            <template slot-scope="scope">
                                <span :class="{red:!scope.row.CompareRes}">{{scope.row.Value12}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="ProjectDescription"
                            :label="lang.FormulaManage_DataGrid3_Describe"
                            width="140"
                           :show-overflow-tooltip="true"
                        ></el-table-column>
                        <el-table-column prop="name" :label="lang.FormulaManage_DataGrid3_Operation" :show-overflow-tooltip="true">
                            <template slot-scope="scope">
                                <div class="img"   @click="handleEdit(scope.$index, scope.row)">
                                    <div class="up"    :style="{width:a11*50+'px',height:25*a11+'px'}" @click="threechange(scope.$index, scope.row)">
                                        <img :src="pensoil" alt  :style="{width:a11*20+'px',height:20*a11+'px'}" />
                                        {{scope.row.phone}}
                                    </div>
                                </div>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </div>
        </div>
        <div class="look lookq"  :style="{
                    height: a11 * 600 + 'px',
                    width:1120*a11+'px'
                }"  v-show="onetable" >
            <div
                class="looktop"
                :style="{
                    height: a11 * 60 + 'px',
                    fontSize: 18 * a11 + 'px',
                    lineHeight: a11 * 60 + 'px'
                }"
               
            ></div>
            <div class="lookhead"  :style="{
                    height: a11 * 60 + 'px',
                    fontSize: 18 * a11 + 'px',
                    lineHeight: a11 * 60 + 'px'
                }"  :class="{colordiv:$store.state.color=='grey'}">
                <span :style="{  fontSize: 18 * a11 + 'px'}" v-if="lookfalse" :class="{fcolor:$store.state.color=='grey'}">{{lang.FormulaManage_HT_FormulaTemplateSetting_ModifyRecipeTemplate}}</span>
                <span :style="{  fontSize: 18 * a11 + 'px'}" v-else :class="{fcolor:$store.state.color=='grey'}">{{lang.FormulaManage_HT_FormulaTemplateSetting_NewRecipeTemplate}}</span>
                <img :style="{width:24*a11+'px',height:24*a11+'px',right:20*a11+'px'}" :src="no2" alt class="no" @click="cancel" v-if="$store.state.color=='grey'" />
                <img :style="{width:24*a11+'px',height:24*a11+'px',right:20*a11+'px'}" :src="no" alt class="no" @click="cancel" v-else />
            </div>
            <div class="lookcontent">
                <div class="lookselect"  :style="{height:436*a11+'px'}">
                    <div class="search" :style="{zoom:a11}">
                        <span style="color:blue">{{lang.FormulaManage_FormulaTemplateSetting_FormulaProject}}</span>
                        <span class="lookname">{{lang.FormulaManage_FormulaTemplateSetting_FormulaTemplateName}}</span>
                        <input type="text" v-model="workname" />
                        <span class="add" @click="addproject">{{lang.FormulaManage_FormulaTemplateSetting_Add}}</span>
                        <span class="del" @click="delclick">{{lang.FormulaManage_FormulaTemplateSetting_Delete}}</span>
                    </div>
                    <div class="table" :style="{width:1000*a11+'px',height:320*a11+'px',marginLeft:23*a11+'px'}">
                        <el-table
                            :data="lookdata"
                            height="100%"
                            border
                             :row-style="{height:50*a11+'px'}"
                            :style="{ fontSize: a11 * 15 + 'px', width: '100%' }"
                            style="width: 100%"
                            @select="lookdataselect"
                            @select-all="lookdataselect1"
                            :header-cell-style="{background:(($store.state.color=='grey')?'#D9DBDE':'#E1EDFA'),color:(($store.state.color=='grey')?'#000':'#5281E5'), 'border-left':'1px solid #cccccc', height: 50*a11+'px',padding:'0'}"
                        >
                            <template slot="empty">
                                <span>{{lang.SCMSConsoleWebApiMySql_NoData}}</span>
                            </template>
                            <el-table-column type="selection" :width="60*a11<60?60:a11*60" :show-overflow-tooltip="true"></el-table-column>
                            <el-table-column prop="ProjectContent" :label="lang.FormulaManage_FormulaTemplateSetting_DataGrid_Content" :width="220*a11" :show-overflow-tooltip="true">
                                <template slot-scope="scope">
                                    <input
                                        type="text"
                                        :style="{height:30*a11+'px',fontSize:15*a11+'px'}"
                                        v-model="scope.row.OriginalProjectContent"
                                        @change="haschange1(scope.row)"
                                    />
                                </template>
                            </el-table-column>
                            <el-table-column prop="Unit" :label="lang.FormulaManage_FormulaTemplateSetting_DataGrid_Unit" :width="200*a11" :show-overflow-tooltip="true">
                                <template slot-scope="scope">
                                    <input
                                        type="text"
                                        :style="{height:30*a11+'px',fontSize:15*a11+'px'}"
                                        v-model="scope.row.Unit"
                                        @change="haschange1(scope.row)"
                                    />
                                </template>
                            </el-table-column>
                            <el-table-column prop="Digit" :label="lang.FormulaManage_FormulaTemplateSetting_DataGrid_Digit" :width="200*a11" :show-overflow-tooltip="true">
                                <template slot-scope="scope">
                                    <input
                                        type="text"
                                        :style="{height:30*a11+'px',fontSize:15*a11+'px'}"
                                        v-model="scope.row.Digit"
                                        @change="haschange1(scope.row)"
                                    />
                                </template>
                            </el-table-column>
                            <el-table-column prop="ProjectDescription" :label="lang.FormulaManage_FormulaTemplateSetting_DataGrid_Description" width="220" :show-overflow-tooltip="true">
                                <template slot-scope="scope">
                                    <input
                                        type="text"
                                        :style="{height:30*a11+'px',fontSize:15*a11+'px'}"
                                        v-model="scope.row.ProjectDescription"
                                        @change="haschange1(scope.row)"
                                    />
                                </template>
                            </el-table-column>
                            <el-table-column prop="ContentGroup" :label="lang.FormulaManage_FormulaTemplateSetting_DataGrid_Group" :width="200*a11" :show-overflow-tooltip="true">
                                <template slot-scope="scope">
                                    <input
                                        type="text"
                                        :style="{height:30*a11+'px',fontSize:15*a11+'px'}"
                                        v-model="scope.row.ContentGroup"
                                        @change="haschange1(scope.row)"
                                    />
                                </template>
                            </el-table-column>
                            <el-table-column prop="VariableName" :label="lang.FormulaManage_FormulaTemplateSetting_DataGrid_VariableName" :width="280*a11" :show-overflow-tooltip="true"></el-table-column>
                            <el-table-column prop="DataType" :label="lang.FormulaManage_FormulaTemplateSetting_DataGrid_VariableType" :width="200*a11" :show-overflow-tooltip="true"></el-table-column>
                            <el-table-column prop="Address" :label="lang.FormulaManage_FormulaTemplateSetting_DataGrid_VariableAddress" :width="200*a11" :show-overflow-tooltip="true"></el-table-column>
                            <el-table-column prop="VariableDescription" :label="lang.FormulaManage_FormulaTemplateSetting_DataGrid_VariableDescription" :width="220*a11" :show-overflow-tooltip="true"></el-table-column>
                        </el-table>
                    </div>
                </div>
                <div class="cancel" @click="cancel" :style="{bottom:20*a11+'px',width:100*a11+'px',height:36*a11+'px',lineHeight:36*a11+'px',fontSize:14*a11+'px',right:180*a11+'px',bottom:20*a11+'px'}">{{lang.FormulaManage_AddProject_Cancel}}</div>
                <div class="pre" @click="preonetable" :style="{bottom:20*a11+'px',width:100*a11+'px',height:36*a11+'px',lineHeight:36*a11+'px',fontSize:14*a11+'px',right:60*a11+'px',bottom:20*a11+'px'}">{{lang.FormulaManage_HT_FormulaSetting_Save}}</div>
            </div>
        </div>
        <div class="look look22" :style="{
                    height: a11 * 600 + 'px',
                    width:1120*a11+'px'
                }"  v-show="lookforsearch1" >
            <div
                class="looktop"
                  :style="{
                    height: a11 * 60 + 'px',
                    fontSize: 18 * a11 + 'px',
                    lineHeight: a11 * 60 + 'px'
                }"
            ></div>
            <div
                class="lookhead"
                :style="{
                    height: a11 * 60 + 'px',
                    fontSize: 18 * a11 + 'px',
                    lineHeight: a11 * 60 + 'px'
                }"
                :class="[{colordiv:$store.state.color=='grey'},{fcolor:$store.state.color=='grey'}]"
            >
                {{lang.CruxParameterConfigure_SelectVariable_SelectionVariables}}
                <img
                :style="{width:24*a11+'px',height:24*a11+'px',right:20*a11+'px'}"
                    :src="no2"
                    alt
                    class="no"
                    @click="cancel1"
                    v-if="$store.state.color=='grey'"
                />
                <img :style="{width:24*a11+'px',height:24*a11+'px',right:20*a11+'px'}" :src="no" alt class="no" @click="cancel1" v-else />
            </div>
            <div class="lookcontent ">
                <div class="lookselect" :style="{height:436*a11+'px'}" >
                    <div class="search" :style="{zoom:a11}">
                        <span>{{lang.FormulaManage_AddProject_DeviceName}}</span>
                        <select name id v-model="oneselect">
                            <option
                                v-for="(item,index) in projectlist"
                                :key="index"
                                :value="item.DeviceName"
                            >{{item.DisplayDeviceName}}</option>
                        </select>
                        <span>{{lang.FormulaManage_AddProject_VariableGroup}}</span>
                        <select name id v-model="twoselect">
                            <option
                                v-for="(item,index) in projectlist2"
                                :key="index"
                                :value="item.GroupName"
                            >{{item.GroupName}}</option>
                        </select>
                        <span>{{lang.FormulaManage_AddProject_VariableType}}</span>
                        <select name id v-model="threeselect">
                            <option
                                v-for="(item,index) in projectlist3"
                                :key="index"
                                :value="item.Value"
                            >{{item.Text}}</option>
                        </select>
                        <input type="text" :placeholder="lang.FormulaManage_AddProject_Keyword" v-model="projectkeyword" />
                        <span class="lookfor1" @click="lookforsearch">{{lang.FormulaManage_AddProject_Select}}</span>
                    </div>
                    <div class="table" :style="{width:1000*a11+'px',height:320*a11+'px',marginLeft:23*a11+'px'}">
                        <el-table
                            :data="projectlistdata"
                            :row-style="{height:50*a11+'px'}"
                            :style="{ fontSize: a11 * 15 + 'px', width: '100%' }"
                            height="100%"
                            border
                            style="width: 100%"
                            @select="select"
                            @select-all="selectall"
                          :header-cell-style="{background:(($store.state.color=='grey')?'#D9DBDE':'#E1EDFA'),color:(($store.state.color=='grey')?'#000':'#5281E5'), 'border-left':'1px solid #cccccc', height: 50*a11+'px',padding:'0'}"
                        >
                            <template slot="empty">
                                <span>{{lang.SCMSConsoleWebApiMySql_NoData}}</span>
                            </template>
                            <el-table-column type="selection"  :width="a11>1?60*a11:60" :show-overflow-tooltip="true"></el-table-column>
                            <el-table-column prop="Device" :label="lang.FormulaManage_AddProject_DataGrid_DeviceName" :width="180*a11" :show-overflow-tooltip="true">
                                <template slot-scope="scope">{{scope.row.Device}}</template>
                            </el-table-column>
                            <el-table-column prop="DateType" :label="lang.FormulaManage_AddProject_DataGrid_VariableType" :width="180*a11" :show-overflow-tooltip="true">
                                <template slot-scope="scope">{{scope.row.DateType}}</template>
                            </el-table-column>
                            <el-table-column prop="Name" :label="lang.FormulaManage_AddProject_DataGrid_Name" :width="180*a11" :show-overflow-tooltip="true">
                                <template slot-scope="scope">{{scope.row.Name}}</template>
                            </el-table-column>
                            <el-table-column prop="Descript" :label="lang.FormulaManage_AddProject_DataGrid_Describe" :width="180*a11" :show-overflow-tooltip="true">
                                <template slot-scope="scope">{{scope.row.Descript}}</template>
                            </el-table-column>
                            <el-table-column prop="Address" :label="lang.FormulaManage_AddProject_DataGrid_VariableAddress" :width="280*a11" :show-overflow-tooltip="true">
                                <template slot-scope="scope">{{scope.row.Address}}</template>
                            </el-table-column>
                        </el-table>
                    </div>
                    <div class="page" :style="{zoom:a11}">
                        <div class="pageword">
                            {{lang.DataGrid_Reaction_HT_ATotalOf}}
                            <span>{{pageData.TotalCount}}</span>{{lang.DataGrid_Reaction_HT_RecordsAndTheCurrent}}
                            <span>{{pageData.PageIndex}}</span>{{lang.DataGrid_Reaction_HT_Page}}
                            <span>{{pageData.TotalPage}}</span>{{lang.DataGrid_Reaction_HT_RecordsAnd}}
                            <span>{{pageData.PageSize}}</span>{{lang.DataGrid_Reaction_HT_PerPage}}
                        </div>
                        <div class="pageoperation">
                            <span class="btn" @click="start">{{lang.DataGrid_Reaction_FirstPage}}</span>
                            <span
                                class="btn"
                                :class="{nopage:!pageData.LastEnabled}"
                                @click="abck"
                            >{{lang.DataGrid_Reaction_LastPage}}</span>
                            <span
                                class="btn"
                                :class="{nopage:!pageData.NextEnabled}"
                                @click="next"
                            >{{lang.DataGrid_Reaction_NextPage}}</span>
                            <span class="btn" @click="end">{{lang.DataGrid_Reaction_EndPage}}</span>
                            <div class="inputnumber">
                                {{lang.DataGrid_Reaction_The}}
                                <input type="text" v-model="nowpage" class="ti" /> {{lang.DataGrid_Reaction_Page}}
                            </div>

                            <span class="btn" @click="jump">{{lang.DataGrid_Reaction_TurnPage}}</span>
                        </div>
                        <!-- </div> -->
                    </div>
                </div>
                <div class="cancel" @click="cancel1" :style="{bottom:20*a11+'px',width:100*a11+'px',height:36*a11+'px',lineHeight:36*a11+'px',fontSize:14*a11+'px',right:180*a11+'px',bottom:20*a11+'px'}">{{lang.FormulaManage_AddProject_Cancel}}</div>
                <div class="pre" @click="pre" :style="{bottom:20*a11+'px',width:100*a11+'px',height:36*a11+'px',lineHeight:36*a11+'px',fontSize:14*a11+'px',right:60*a11+'px',bottom:20*a11+'px'}">{{lang.PopupCommon_Sure}}</div>
            </div>
        </div>
        <div class="onelook"  v-show="twolook">
            <div
                class="onelooktop"
            ></div>
            <div class="onelookhead" :class="{colordiv:$store.state.color=='grey'}">
                <span v-if="twolookfalse == false" :class="{fcolor:$store.state.color=='grey'}">{{lang.FormulaManage_HT_FormulaSetting_NewFormula}}</span>
                <span v-else :class="{fcolor:$store.state.color=='grey'}">{{lang.FormulaManage_HT_FormulaSetting_Modify}}</span>
                <img :src="no2" alt class="no" @click="cancel" v-if="$store.state.color=='grey'" />
                <img :src="no" alt class="no" @click="cancel" v-else />
            </div>
            <div class="onelookcontent">
                <div class="first">
                    {{lang.FormulaManage_FormulaSetting_FormulaName}}
                    <input type="text" v-model="twoworkdata.Name" />
                </div>
                <div class="first">
                    {{lang.FormulaManage_FormulaSetting_Number}}
                    <input type="text" v-model="twoworkdata.Number" />
                </div>
                <div class="second">
                    {{lang.FormulaManage_FormulaSetting_Description}}
                    <input type="text" v-model="twoworkdata.FormulaDescription" />
                </div>
                <div class="thirld" @click="nowdata" v-if="twolookfalse == false">{{lang.FormulaManage_FormulaSetting_Update}}</div>
                <div class="thirld" @click="nowdata1" v-if="twolookfalse == true">{{lang.FormulaManage_FormulaSetting_Update}}</div>
            </div>
            <div class="onelookcontent1">
                <div v-for="(item,index) in Project22" :key="index">
                    <div class="linebox" style="margin-top:10px;display:table">
                        <div style="text-align: center;display:table-cell;white-space:nowrap;word-break:keep-all;" >{{item[0].ContentGroup}}</div>
                        <div style="display:table-cell;width:100%;text-align: center;" class="line">
                            <div class="aa"></div>
                        </div>
                    </div>

                     <div style="overflow:hidden;margin-left:60px;">
                        <div style="float:left;width:245px;margin-top:20px" v-for="(it,ind) in item" :key="ind">
                            <span style="font-size:16px;display:block;font-size:15px">{{it.ProjectContent}}</span>
                            <div style="overflow:hidden">

                            <input @input="projectArrFun(it.PID,it.Value)" style="height:45px;border:1px solid #ddd;width:205px;float:left;" type="text" v-model="it.Value" />
                            <span style="width:30px;margin-left:8px;float:left;font-size:14px;height:45px;line-height:45px;overflow:hidden">{{it.Unit==null?'':it.Unit}}</span>
                            </div>
                        </div>
                    </div>

                    <!-- <div class="first first1">
                        <div class="pro" v-for="(it,ind) in item" :key="ind">
                            <span>{{it.ProjectContent}}</span>
                            <input type="text" v-model="it.Value" />
                        </div>
                    </div>-->
                </div>

                <div class="cancel" @click="cancel">{{lang.FormulaManage_FormulaValueSetting_Cancel}}</div>
                <div class="pre" @click="twopre">{{lang.FormulaManage_FormulaValueSetting_Save}}</div>
            </div>
        </div>
        <div class="cover1" v-if="onetable"></div>
        <div class="cover1" v-if="twolook"></div>
        <!-- <div class="cover5" v-if="tipchange"></div> -->
        <div class="onework"  v-show="threelook" :style="{zoom:a11}">
            <div
                    class="oneworktop"
                ></div>
            <div class="oneworkhead">
                
                <span>{{lang.FormulaManage_FormulaValueSetting_ModifyTheFormula}}</span>
                <img :src="no2" alt class="no" @click="cancel" v-if="$store.state.color=='grey'" />
                <img :src="no" alt class="no" @click="cancel" v-else />
            </div>
            <div class="oneworkname">
                <span>{{threename}}</span>
                <input type="text" v-model="oneworkname1" />
            </div>
            <div class="cancel" @click="cancel">{{lang.FormulaManage_FormulaSetting_Cancel}}</div>
            <div class="pre" @click="pre2">{{lang.FormulaManage_FormulaSetting_Save}}</div>
        </div>
        <!-- <div class="cover5" v-if="tipchange"></div> -->
    </div>
</template>

<script>
// import MyPage from '../../components/public/page.vue';
import XLSX from 'xlsx';
import Index from '../../pages/Index.vue';
export default {
    components: {
        // Index
        // MyPage
    },
    data() {
        return {
            time:'',
            yy: 2,
            wd: 1,
            path: '',
            a11:1,
            nowIndex: 1,
            pageDate: {
                pageIndex: 1,
                pagesize: 50,
                togeIndex: 0,
                togesize: 0
            },
            aaa1: false,
            bbb1: false,
            nowpage: 1,
            ai: '',
            deltrue: true,
            processMess: false,
            processErr: false,
            tipword: '123',
            tipchange: false,
            bbb: false,
            // gth: require('../../assets/images/icon_gth.png'),
            gth: require('../../assets/images/gth.png'),
            up: require('../../assets/images/icon_up.png'),
            del: require('../../assets/images/icon_dell.png'),
            pensoil: require('../../assets/images/icon_pensoil.png'),
            hao: require('../../assets/images/hao.png'),
            no: require('../../assets/images/no.png'),
            yes: require('../../assets/images/Yes.png'),
            tableData: [],
            tableData1: [],
            tableData2: [],
            tableData4: [],
            onetable: false,
            lookdata: [],
            threelook: false,
            lookfalse: false,
            workname: '',
            twolookfalse: false,
            twolook: false,
            no2: require('../../assets/images/no2.png'),
            c1: '',
            twoworkdata: {
                FormulaDescription: '',
                Name: '',
                Number: ''
            },
            tablename: [],
            tablekeyword: '',
            Name: '',
            itemname: '',
            CurrentValue: '',
            Project: [],
            Project22: [],
            a: {},
            oneworkname1: '',
            threename: '',
            thead: ['配方名称', '配方号', '配方描述'],
            tbody: [],
            ttop: '',
            projectlist: '',
            projectlist2: '',
            projectlist3: '',
            pageData: {
                PageSize: 50,
                TotalCount: 0,
                TotalPage: 1,
                PageIndex: 1,
                LastEnabled: false,
                NextEnabled: false
            },
            projectlistdata: [],
            oneselect: '',
            twoselect: '',
            threeselect: '',
            pdyd2: true,
            pdyd3: true,
            pdyd4: true,
            pdyd5: true,
            projectkeyword: '',
            lookforsearch1: false,
            comitdata: [],
            a1: '',
            b1: '',
            pdif: false,
            projectdata1: '',
            projectdata2: '',
            threeid: '',
            threevalue: '',
            expname: '',
            aaa: 1,
            ProjectContent: '',
            TID: '',
            FID: '',
            pdyd1: true,
            jurisdiction:[],
            buttonarr:[],
            xjmbid:'',
            xjmbshow:true,
            bjmbid:'',
            bjmbshow:true,
            scmbid:'',
            scmbshow:true,
            xjglid:'',
            xjglshow:true,
            yypfid:'',
            yypfshow:true,
            bjpfid:'',
            bjpfshow:true,
            scpfid:'',
            scpfshow:true,
            sspfid:'',
            sspfshow:true,
            drid:'',
            drshow:true,
            dcid:'',
            dcshow:true,
            fgid:'',
            fgshow:true,
            xgid:'',
            xgshow:true,
            proInterval: null,
            process: 0,
            isssuing: false,   // 是否下发完成
            lang: JSON.parse(localStorage.getItem('languages'))[localStorage.getItem('currentLang')]
        };
    },
    beforeDestroy(){
        //清除定时器
        clearInterval(this.time)
        clearInterval(this.proInterval)
    },
    watch: {
         tableData(val){
          this.$refs.multipleTable3.setCurrentRow(val[0],true)
        },
         tableData1(val){
          this.$refs.multipleTable1.setCurrentRow(val[0],true)
        },
          VpowerData(val){
                 this.jurisdiction = this.$store.state.btnPowerData
     this.buttonarr = this.findPathByLeafId(this.GetUrlParam('id'),this.jurisdiction)[0].Children
      console.log(this.buttonarr)
               this.buttonarr.forEach((item)=>{
         if(item.RightName =="配方模板管理-新建模板"){
          this.xjmbid = item.RightID
         }else if(item.RightName == "配方模板管理-编辑模板"){
          this.bjmbid = item.RightID
         }else if(item.RightName == "配方模板管理-删除模板"){
          this.scmbid = item.RightID
         }else if(item.RightName == "配方管理-新建配方"){
          this.xjglid = item.RightID
         }else if(item.RightName == "配方管理-应用配方"){
          this.yypfid = item.RightID
         }else if(item.RightName == "配方管理-编辑配方"){
          this.bjpfid = item.RightID
         }else if(item.RightName == "配方管理-删除配方"){
          this.scpfid = item.RightID
         }else if(item.RightName == "配方管理-搜索配方"){
          this.sspfid = item.RightID
         }else if(item.RightName == "配方内容-导入"){
          this.drid = item.RightID
         }else if(item.RightName == "配方内容-导出"){
          this.dcid = item.RightID
         }else if(item.RightName == "配方内容-覆盖配方值"){
          this.fgid = item.RightID
         }else if(item.RightName == "配方内容-修改配方值"){
          this.xgid = item.RightID
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
                  url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.xjmbid}`,
              }).then(res => {
                  this.xjmbshow = res.data.data
              
              }).catch((err)=>{
                  console.log('err',err)
              })
              this.$axios({
                  method: 'post',
                  url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.bjmbid}`,
              }).then(res => {
                  this.bjmbshow = res.data.data
              
              }).catch((err)=>{
                  console.log('err',err)
              })
              this.$axios({
                  method: 'post',
                  url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.scmbid}`,
              }).then(res => {
                  this.scmbshow = res.data.data
              
              }).catch((err)=>{
                  console.log('err',err)
              })
              this.$axios({
                  method: 'post',
                  url: `/api/UserManage/y?argUserID=${userid}&argRightID=${this.xjglid}`,
              }).then(res => {
                  this.xjglshow = res.data.data
              
              }).catch((err)=>{
                  console.log('err',err)
              })
              this.$axios({
                  method: 'post',
                  url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.yypfid}`,
              }).then(res => {
                  this.yypfshow = res.data.data
              
              }).catch((err)=>{
                  console.log('err',err)
              })
              this.$axios({
                  method: 'post',
                  url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.bjpfid}`,
              }).then(res => {
                  this.bjpfshow = res.data.data
              
              }).catch((err)=>{
                  console.log('err',err)
              })
              this.$axios({
                  method: 'post',
                  url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.scpfid}`,
              }).then(res => {
                  this.scpfshow = res.data.data
              
              }).catch((err)=>{
                  console.log('err',err)
              })
              this.$axios({
                  method: 'post',
                  url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.sspfid}`,
              }).then(res => {
                  this.sspfshow = res.data.data
              
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
                  url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.fgid}`,
              }).then(res => {
                  this.fgshow = res.data.data
              
              }).catch((err)=>{
                  console.log('err',err)
              })
              
              this.$axios({
                  method: 'post',
                  url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.xgid}`,
              }).then(res => {
           
                  this.xgshow = res.data.data
              
              }).catch((err)=>{
                  console.log('err',err)
              })
          },
          
        itemname(newval) {
            this.itemname = newval;
        },
        threeselect(val) {
            this.watchdata();
        },

        oneselect(val) {
            let i = 0;
            for (i in this.projectlist) {
                if (val == this.projectlist[i].DeviceName) {
                    this.projectlist2 = this.projectlist[i].Groups;
                    this.twoselect = this.projectlist[i].Groups[0].GroupName;
                }
            }
            this.watchdata();
        },
        twoselect(val) {
            let i = 0;
            for (i in this.projectlist2) {
                if (val == this.projectlist2[i].GroupName) {
                    this.projectlist3 = this.projectlist2[i].DataTypes;
                    this.threeselect = this.lang.AlarmRecord_HT_Unlimited
                }
            }
            this.watchdata();
        }
    },
    beforeRouteLeave (to, from, next){
         clearInterval(this.time)
         clearInterval(this.proInterval)
         next();
    },
    methods: {
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
        getLangData() {
           this.thead = [this.lang.FormulaManage_FormulaSetting_FormulaName, this.lang.FormulaManage_FormulaSetting_Number, this.lang.FormulaManage_FormulaSetting_Description] 
        },
        //监听改变数组内容
        projectArrFun(id, value) {
            for (var i = 0; i < this.Project.length; i++) {
                if (id == this.Project[i].PID) {
                    this.Project[i].Value = value;
                }
            }
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
        readExcel(e) {
            console.log("-----------------------------")
            //表格导入
            var that = this;
            const files = e.target.files;
            if (files.length <= 0) {
                //如果没有文件名
                return false;
            } else if (!/\.(xls|xlsx)$/.test(files[0].name.toLowerCase())) {
                this.$Message.error('上传格式不正确，请上传xls或者xlsx格式');
                return false;
            }

            const fileReader = new FileReader();
            fileReader.onload = ev => {
                try {
                    const data = ev.target.result;
                    const workbook = XLSX.read(data, {
                        type: 'binary',
                    });
                    const wsname = workbook.SheetNames[0]; //取第一张表
                    const ws = XLSX.utils.sheet_to_json(
                        workbook.Sheets[wsname],
                        {
                            defval: ''
                        }
                    ); //生成json表格内容
                  
                    let i = 0;
                    let a = 0;
                    let c = [];
                    for (a in ws) {
                        ws[a].Name = ws[a][this.lang.FormulaManage_FormulaSetting_FormulaName];
                        ws[a].Number = ws[a][this.lang.FormulaManage_FormulaSetting_Number];
                        ws[a].FormulaDescription = ws[a][this.lang.FormulaManage_FormulaSetting_Description];
                    }

                    let b = 0;
                    for (b in ws) {
                        delete ws[b][this.lang.FormulaManage_FormulaSetting_FormulaName];
                        delete ws[b][this.lang.FormulaManage_FormulaSetting_Number];
                        delete ws[b][this.lang.FormulaManage_FormulaSetting_Description];
                    }
                    let d = ws;
                    let x = 0;

                    let c1 = 0;
                    let VariableName = [];
                    for (b in ws) {
                        for (a in ws[b]) {
                            c.push(ws[b][a]);
                            if(a !== 'Name' && a !== 'Number' && a !== 'FormulaDescription' && a != '__EMPTY'){
                                VariableName.push(a)
                            }
                        }
                        ws[b].Contents = c;
                        c = [];
                    }
                    for (i in ws) {
                        ws[i].Contents.splice(ws[i].Contents.length-3, 3);
                    }
                    this.$axios({
                        method: 'post',
                        url: `/api/FormulaManage/FormulaManage_ImportFormula`,
                        data: {
                            argTId: this.oneworkduan,
                            argFormulaParamList: ws,
                            VariableName
                        }
                    }).then(res => {
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
                        this.pdyd5 = true;
                        console.log('sss==>', res);
                        console.log(res.data.code);
                        if (res.data.code == 0) {
                            this.tipword = this.lang.FormulaManage_HT_ImportSuccess

                            this.gettwodata();
                        } else {
                            this.tipword = res.data.msg;
                            this.gettwodata();
                        }
                    });
                    that.outputs = []; //清空接收数据
                    this.$refs.upload.value = '';
                } catch (e) {
                    // this.$nextTick(function() {
                    //
                    // });
                    return false;
                }
            };
            fileReader.readAsBinaryString(files[0]);
        },
    dr(e){
        if(!this.drshow){
            this.tipword =  this.lang.NoOperationAuthority;
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
            this.pdyd5 = true;
             e.preventDefault();
            return
            }
    },
        no1() {
            this.tipchange = false;
            this.deltrue = true;
            this.yy = '';
        },
         getPrecess() {
            var $this = this
            $this.$axios.get('/api/FormulaManage/FormulaManage_GetApplicateProgress').then(res=>{   // 持续下发中 || 下发已完成
                let result = res.data.data
                $this.isssuing = false
                console.log('aaaaaaaaaaaaaaaaaaa', result.finish ,result.total, result.finish/result.total)
                // $this.process = (result.finish/result.total).toFixed(2)*100
                $this.process = Math.round(result.finish/result.total* 100)
                $this.process = isNaN($this.process) ? 0 : $this.process
                // $this.process = (14/50).toFixed(2)*100
                if(result.code === 1){
                    // $this.processMess = true
                    // this.process = (result.finish/result.total).toFixed(2)*100
                    $this.yy = 2;
                    $this.gettwodata();
                }else{
                    clearInterval($this.proInterval)
                    setTimeout(() => {  // 下发完成后，延迟300ms关闭下发弹窗
                        $('.tip').css({
                            zoom: $this.a11,
                            left: `calc(50% - ${($('.tip').width() / 2) *
                                $this.a11}px)`,
                            top: `calc(50% - ${($('.tip').height() / 2) *
                                $this.a11}px)`
                        });
                        $this.tipchange = true;
                        $this.processMess = false
                        $this.deltrue = true;
                        $this.yy = 2;
                        $this.process = 0
                        $this.gettwodata();
                        $this.move('tip', 'tiphead');
                    }, 300);
                    $this.pdyd5 = true;
                    if (res.data.code == 0) {
                        $this.isssuing = true
                        this.tipword = res.data.data.msg
                        // $this.tipword = `下发成功${res.data.data.finish}条，下发失败${res.data.data.total - res.data.data.finish}条`;
                        // let msg = $this.lang.FormulaManage_HT_ApplicateProgress_FinishMessage
                        // let firstL = msg.indexOf('{')
                        // let firstR = msg.indexOf('}') + 1
                        // let lastL = msg.lastIndexOf('{')
                        // let lastR = msg.lastIndexOf('}') + 1
                        // let str1 = msg.slice(firstL, firstR)
                        // let str2 = msg.slice(lastL, lastR)
                        // msg = msg.replace(str1, `<${res.data.data.finish}>`)
                        // msg  = msg.replace(str2, `<${res.data.data.total - res.data.data.finish}>`)
                        // $this.tipword = msg
                    } else {
                        $this.tipword = $this.lang.FormulaManage_HT_Failure;
                    }
                }
            })
        },
        yes1() {
            var $this = this
            this.process = 0
            this.processErr = false
            if (this.yy == 1) {
                this.$axios
                    .post(`/api/FormulaManage/FormulaManage_ApplicateFormula?argFId=${this.workproject}`).then(res => {     // 开始下发
                        if(res.data.code === 0){
                            if (res.data.data.code === 1) {
                                $this.processMess = true
                                this.move('processMess', 'messtop');
                                $this.getPrecess()
                                $this.proInterval = setInterval(()=>{
                                    $this.getPrecess()
                                }, 500)
                            }
                        }
                    })
                    // .then(() => {
                    //     this.yy = 2;
                    //     this.gettwodata();
                    // });
            } else {
                if (this.aaa == 1) {
                    console.log('asd111');
                    this.$axios
                        .post(
                            `/api/FormulaManage/Export?tid=${this.oneworkduan}`
                        )
                        .then(res => {
                            if (res.data.data.Formulas.length !== 0) {
                                console.log('ssss');
                                let ii = 0;
                                let i = 0;
                                let a = 0;
                                this.thead = [this.lang.FormulaManage_HT_FormulaName, this.lang.FormulaManage_HT_FormulaNumber, this.lang.FormulaManage_HT_FormulaDescription];
                                this.ttop = [];
                                this.tbody = [];
                                for (i in res.data.data.ProjectNames) {
                                    this.thead.push(
                                        res.data.data.ProjectNames[i]
                                    );
                                }
                                for (ii in res.data.data.Formulas) {
                                    for (a in res.data.data.Formulas[ii]
                                        .Projects) {
                                        res.data.data.Formulas[ii].Projects[a][
                                            `${a}`
                                        ] =
                                            res.data.data.Formulas[ii].Projects[
                                                a
                                            ].Value;
                                    }
                                }
                                // for (a in res.data.data.Formulas) {
                                //     res.data.data.Formulas[a].Projects =
                                //         res.data.data.Formulas[a].Projects[0].Value;
                                // }
                                for (var key in res.data.data.Formulas[0]) {
                                    if (key !== 'FIndex') {
                                        if (
                                            res.data.data.Formulas[0].hasOwnProperty(
                                                key
                                            )
                                        ) {
                                            this.tbody.push(key);
                                        }
                                    }
                                }
                                this.tbody.pop();
                                let aaa = 0;
                                for (aaa in res.data.data.Formulas[0]
                                    .Projects) {
                                    this.tbody.push(aaa);
                                }
                                let a1 = 0;
                                let a2 = 0;
                                for (a1 in res.data.data.Formulas) {
                                    for (a2 in res.data.data.Formulas[a1]
                                        .Projects) {
                                        res.data.data.Formulas[a1][`${a2}`] =
                                            res.data.data.Formulas[a1].Projects[
                                                a2
                                            ].Value;
                                    }
                                }
                                this.ttop = res.data.data.Formulas;
                            } else {
                                console.log('s');
                                this.thead = [];
                                this.tbody = [];
                                this.ttop = [];
                            }
                            // let aa = value1
                            // let aaa = [{a:2},{b:3}]
                            // for(ii in aaa){
                            //     aaa[ii][`value+${ii}`] = 1;
                            // }
                        })
                        .then(() => {
                            console.log(this.thead);
                            console.log(this.tbody);
                            console.log(this.ttop);
                            require.ensure([], () => {
                                const {
                                    export_json_to_excel
                                } = require('../../vendor/Export2Excel');
                                const tHeader = this.thead;
                                const filterVal = this.tbody;
                                          if (140000 < this.ttop.length&&this.ttop.length<= 150000) {
                            this.excelDatas = [
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.ttop.splice(0, 20000),
                                    sheetName: 'sheet1'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.ttop.splice(0, 10000),
                                    sheetName: 'sheet2'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.ttop.splice(0, 10000),
                                    sheetName: 'sheet3'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.ttop.splice(0, 10000),
                                    sheetName: 'sheet4'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.ttop.splice(0, 10000),
                                    sheetName: 'sheet5'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.ttop.splice(0, 10000),
                                    sheetName: 'sheet6'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.ttop.splice(0, 10000),
                                    sheetName: 'sheet7'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.ttop.splice(0, 10000),
                                    sheetName: 'sheet8'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.ttop.splice(0, 10000),
                                    sheetName: 'sheet9'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.ttop.splice(0, 10000),
                                    sheetName: 'sheet10'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.ttop.splice(0, 10000),
                                    sheetName: 'sheet11'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.ttop.splice(0, 10000),
                                    sheetName: 'sheet12'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.ttop.splice(0, 10000),
                                    sheetName: 'sheet13'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.ttop.splice(0, 10000),
                                    sheetName: 'sheet14'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.ttop.splice(0, 10000),
                                    sheetName: 'sheet15'
                                }
                            ];
                        } else if (130000 < this.ttop.length&&this.ttop.length<= 140000) {
                            this.excelDatas = [
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.ttop.splice(0, 20000),
                                    sheetName: 'sheet1'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.ttop.splice(0, 10000),
                                    sheetName: 'sheet2'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.ttop.splice(0, 10000),
                                    sheetName: 'sheet3'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.ttop.splice(0, 10000),
                                    sheetName: 'sheet4'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.ttop.splice(0, 10000),
                                    sheetName: 'sheet5'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.ttop.splice(0, 10000),
                                    sheetName: 'sheet6'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.ttop.splice(0, 10000),
                                    sheetName: 'sheet7'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.ttop.splice(0, 10000),
                                    sheetName: 'sheet8'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.ttop.splice(0, 10000),
                                    sheetName: 'sheet9'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.ttop.splice(0, 10000),
                                    sheetName: 'sheet10'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.ttop.splice(0, 10000),
                                    sheetName: 'sheet11'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.ttop.splice(0, 10000),
                                    sheetName: 'sheet12'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.ttop.splice(0, 10000),
                                    sheetName: 'sheet13'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.ttop.splice(0, 10000),
                                    sheetName: 'sheet14'
                                }
                            ];
                        } else if (120000 < this.ttop.length&&this.ttop.length<= 130000) {
                             this.excelDatas = [
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.ttop.splice(0, 20000),
                                    sheetName: 'sheet1'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.ttop.splice(0, 10000),
                                    sheetName: 'sheet2'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.ttop.splice(0, 10000),
                                    sheetName: 'sheet3'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.ttop.splice(0, 10000),
                                    sheetName: 'sheet4'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.ttop.splice(0, 10000),
                                    sheetName: 'sheet5'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.ttop.splice(0, 10000),
                                    sheetName: 'sheet6'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.ttop.splice(0, 10000),
                                    sheetName: 'sheet7'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.ttop.splice(0, 10000),
                                    sheetName: 'sheet8'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.ttop.splice(0, 10000),
                                    sheetName: 'sheet9'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.ttop.splice(0, 10000),
                                    sheetName: 'sheet10'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.ttop.splice(0, 10000),
                                    sheetName: 'sheet11'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.ttop.splice(0, 10000),
                                    sheetName: 'sheet12'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.ttop.splice(0, 10000),
                                    sheetName: 'sheet13'
                                }
                            ];
                        }else if (110000 < this.ttop.length &&this.ttop.length<= 120000) {
                             this.excelDatas = [
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.ttop.splice(0, 20000),
                                    sheetName: 'sheet1'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.ttop.splice(0, 10000),
                                    sheetName: 'sheet2'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.ttop.splice(0, 10000),
                                    sheetName: 'sheet3'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.ttop.splice(0, 10000),
                                    sheetName: 'sheet4'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.ttop.splice(0, 10000),
                                    sheetName: 'sheet5'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.ttop.splice(0, 10000),
                                    sheetName: 'sheet6'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.ttop.splice(0, 10000),
                                    sheetName: 'sheet7'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.ttop.splice(0, 10000),
                                    sheetName: 'sheet8'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.ttop.splice(0, 10000),
                                    sheetName: 'sheet9'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.ttop.splice(0, 10000),
                                    sheetName: 'sheet10'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.ttop.splice(0, 10000),
                                    sheetName: 'sheet11'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.ttop.splice(0, 10000),
                                    sheetName: 'sheet12'
                                },
                            ];
                        }else if (100000 < this.ttop.length &&this.ttop.length<= 110000) {
                             this.excelDatas = [
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.ttop.splice(0, 20000),
                                    sheetName: 'sheet1'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.ttop.splice(0, 10000),
                                    sheetName: 'sheet2'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.ttop.splice(0, 10000),
                                    sheetName: 'sheet3'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.ttop.splice(0, 10000),
                                    sheetName: 'sheet4'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.ttop.splice(0, 10000),
                                    sheetName: 'sheet5'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.ttop.splice(0, 10000),
                                    sheetName: 'sheet6'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.ttop.splice(0, 10000),
                                    sheetName: 'sheet7'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.ttop.splice(0, 10000),
                                    sheetName: 'sheet8'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.ttop.splice(0, 10000),
                                    sheetName: 'sheet9'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.ttop.splice(0, 10000),
                                    sheetName: 'sheet10'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.ttop.splice(0, 10000),
                                    sheetName: 'sheet11'
                                },
                            ];
                        }else if (90000 < this.ttop.length&&this.ttop.length<= 100000) {
                             this.excelDatas = [
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.ttop.splice(0, 20000),
                                    sheetName: 'sheet1'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.ttop.splice(0, 10000),
                                    sheetName: 'sheet2'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.ttop.splice(0, 10000),
                                    sheetName: 'sheet3'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.ttop.splice(0, 10000),
                                    sheetName: 'sheet4'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.ttop.splice(0, 10000),
                                    sheetName: 'sheet5'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.ttop.splice(0, 10000),
                                    sheetName: 'sheet6'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.ttop.splice(0, 10000),
                                    sheetName: 'sheet7'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.ttop.splice(0, 10000),
                                    sheetName: 'sheet8'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.ttop.splice(0, 10000),
                                    sheetName: 'sheet9'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.ttop.splice(0, 10000),
                                    sheetName: 'sheet10'
                                },
                            ];
                        }else if (80000 < this.ttop.length&&this.ttop.length <= 90000) {
                             this.excelDatas = [
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.ttop.splice(0, 20000),
                                    sheetName: 'sheet1'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.ttop.splice(0, 10000),
                                    sheetName: 'sheet2'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.ttop.splice(0, 10000),
                                    sheetName: 'sheet3'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.ttop.splice(0, 10000),
                                    sheetName: 'sheet4'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.ttop.splice(0, 10000),
                                    sheetName: 'sheet5'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.ttop.splice(0, 10000),
                                    sheetName: 'sheet6'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.ttop.splice(0, 10000),
                                    sheetName: 'sheet7'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.ttop.splice(0, 10000),
                                    sheetName: 'sheet8'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.ttop.splice(0, 10000),
                                    sheetName: 'sheet9'
                                },
                            ];
                        }else if (70000 < this.ttop.length&&this.ttop.length <= 80000) {
                             this.excelDatas = [
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.ttop.splice(0, 20000),
                                    sheetName: 'sheet1'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.ttop.splice(0, 10000),
                                    sheetName: 'sheet2'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.ttop.splice(0, 10000),
                                    sheetName: 'sheet3'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.ttop.splice(0, 10000),
                                    sheetName: 'sheet4'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.ttop.splice(0, 10000),
                                    sheetName: 'sheet5'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.ttop.splice(0, 10000),
                                    sheetName: 'sheet6'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.ttop.splice(0, 10000),
                                    sheetName: 'sheet7'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.ttop.splice(0, 10000),
                                    sheetName: 'sheet8'
                                },
                            ];
                        }else if (60000 < this.ttop.length&&this.ttop.length <= 70000) {
                             this.excelDatas = [
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.ttop.splice(0, 20000),
                                    sheetName: 'sheet1'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.ttop.splice(0, 10000),
                                    sheetName: 'sheet2'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.ttop.splice(0, 10000),
                                    sheetName: 'sheet3'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.ttop.splice(0, 10000),
                                    sheetName: 'sheet4'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.ttop.splice(0, 10000),
                                    sheetName: 'sheet5'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.ttop.splice(0, 10000),
                                    sheetName: 'sheet6'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.ttop.splice(0, 10000),
                                    sheetName: 'sheet7'
                                },
                            ];
                        }else if (50000 < this.ttop.length&&this.ttop.length <= 60000) {
                             this.excelDatas = [
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.ttop.splice(0, 20000),
                                    sheetName: 'sheet1'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.ttop.splice(0, 10000),
                                    sheetName: 'sheet2'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.ttop.splice(0, 10000),
                                    sheetName: 'sheet3'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.ttop.splice(0, 10000),
                                    sheetName: 'sheet4'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.ttop.splice(0, 10000),
                                    sheetName: 'sheet5'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.ttop.splice(0, 10000),
                                    sheetName: 'sheet6'
                                },
                            ];
                        }else if (40000 < this.ttop.length&&this.ttop.length <= 50000) {
                             this.excelDatas = [
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.ttop.splice(0, 20000),
                                    sheetName: 'sheet1'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.ttop.splice(0, 10000),
                                    sheetName: 'sheet2'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.ttop.splice(0, 10000),
                                    sheetName: 'sheet3'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.ttop.splice(0, 10000),
                                    sheetName: 'sheet4'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.ttop.splice(0, 10000),
                                    sheetName: 'sheet5'
                                },
                            ];
                        }else if (30000 < this.ttop.length&&this.ttop.length <= 40000) {
                             this.excelDatas = [
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.ttop.splice(0, 20000),
                                    sheetName: 'sheet1'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.ttop.splice(0, 10000),
                                    sheetName: 'sheet2'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.ttop.splice(0, 10000),
                                    sheetName: 'sheet3'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.ttop.splice(0, 10000),
                                    sheetName: 'sheet4'
                                },
                            ];
                        }else if (20000 < this.ttop.length&&this.ttop.length <= 30000) {
                             this.excelDatas = [
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.ttop.splice(0, 20000),
                                    sheetName: 'sheet1'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.ttop.splice(0, 10000),
                                    sheetName: 'sheet2'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.ttop.splice(0, 10000),
                                    sheetName: 'sheet3'
                                },
                            ];
                        }else if (10000 < this.ttop.length&&this.ttop.length <= 20000) {
                               this.excelDatas = [
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.ttop.splice(0, 20000),
                                    sheetName: 'sheet1'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.ttop.splice(0, 10000),
                                    sheetName: 'sheet2'
                                },
                                
                            ];
                        }else if (0 < this.ttop.length&&this.ttop.length <= 10000) {
                           this.excelDatas = [
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.ttop.splice(0, 20000),
                                    sheetName: 'sheet1'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.ttop.splice(0, 1000),
                                    sheetName: 'sheet2'
                                },
                               
                            ];
                        }

                        this.json2excel(this.excelDatas, this.lang.Formula, true, 'xlsx');
                                // const list = this.ttop;

                                // const data = this.formatJson(filterVal, list);
                                // export_json_to_excel(tHeader, data, '配方管理');
                                this.tipchange = false;
                                this.deltrue = true;
                            });
                        });
                } else if (this.aaa == 2) {
                    console.log('sad');
                    console.log(this.TID);
                    console.log(
                        `/api/FormulaManage/FormulaManage_DelFormulaTemplate?argTId=${this.TID}`
                    );
                    this.$axios
                        .post(
                            `/api/FormulaManage/FormulaManage_DelFormulaTemplate?argTId=${this.TID}`
                        )
                        .then(res => {
                            console.log('aa', res);
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
                            this.pdyd5 = true;
                            this.tipword = res.data.data;
                        })
                        .then(() => {
                            this.deltrue = true;
                            this.getonedata();
                        });
                } else {
                    console.log(this.FID);
                    this.$axios
                        .post(
                            `/api/FormulaManage/FormulaManage_DelFormula?argFId=${this.FID}`
                        )
                        .then(res => {
                            console.log('aa', res);
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
                            this.pdyd5 = true;
                            this.tipword = res.data.data;
                        })
                        .then(() => {
                            this.deltrue = true;
                            this.gettwodata();
                        });
                }
            }
        },
        pre2() {
            let userid = ''
            if (!JSON.parse(sessionStorage.getItem('userInfo1'))) {
                userid = JSON.parse(
                    sessionStorage.getItem('sightseerInfo1')
                ).SCMSUserAccount;
            } else {
                userid = JSON.parse(
                    sessionStorage.getItem('userInfo1')
                ).SCMSUserAccount;
            }
            let postData = {
                argCId: this.threeid,
                argName: this.threevalue,
                argValue: this.oneworkname1,
                loginUserName: userid
            }
            this.$axios.post(`/api/FormulaManage/FormulaManage_UpdateFormulaValue`, postData)
                .then(res => {
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
                    this.pdyd5 = true;

                    if (res.data.msg == '请求成功') {
                        this.tipword = res.data.data;
                        this.threelook = false;
                    } else {
                        this.tipword = res.data.msg;
                    }
                })
                .then(() => {
                    this.getthreedata();
                });
        },
        onedel(a, b) {
               if(!this.scmbshow){
            this.tipword = this.lang.NoOperationAuthority;
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
            this.pdyd5 = true;
            return
            }
            this.tipword =
                this.lang.FormulaManage_HT_messDeleteTheRecipeTemplate;
            this.deltrue = false;
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
            this.pdyd5 = true;
            this.TID = b.TID;
            this.aaa = 2;
        },
        twodel(a, b) {
            if (b.IsApp) {  // 是否被应用
                    this.tipword = this.lang.FormulaManage_HT_CanNotDeleteFormula;
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
                    this.pdyd5 = true;
                    return
            }
            if(!this.scpfshow){
                this.tipword = this.lang.NoOperationAuthority;
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
                this.pdyd5 = true;
                return
            }
            if(b.IsApp){
                            this.tipword = '不能删除正在使用配方!';
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
            this.pdyd5 = true;
            return
            }
            console.log(a)
            console.log(b)
            this.FID = b.FID;
            this.aaa = 3;
            this.tipword = this.lang.FormulaManage_HT_messDeleteTheRecipe;
            this.deltrue = false;
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
            this.pdyd5 = true;
        },
        tip1() {
            console.log(this.projectlistdata);
            this.tipchange = false;
            console.log(this.projectlistdata);
            // this.haschange = 1;
        },
        preonetable() {
            console.log(this.lookdata);
            console.log(this.pdif);
            if(this.lookdata.length === 0){
                setTimeout(() => {
                    $('.tip').css({
                        zoom: this.a11,
                        left: `calc(50% - ${($('.tip').width() / 2) * this.a11}px)`,
                        top: `calc(50% - ${($('.tip').height() / 2) * this.a11}px)`
                    });
                    this.tipchange = true;
                    this.move('tip', 'tiphead');
                });
                this.tipword = this.lang.FormulaManage_HT_FormulaTemplateSetting_ProjectCannotBeNull
                return;
            }

            let a = 0;
            this.deltrue = true;
            for (a in this.lookdata) {
                // this.lookdata.Name = this.lookdata[a].pro
                if (!this.lookdata[a].hasOwnProperty('ContentGroup')) {
                    this.lookdata[a].ContentGroup = '';
                }
            }
            if (!this.workname) {
                this.tipword = this.lang.FormulaManage_HT_FormulaTemplateSetting_PERecipeTemplateName;
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
                this.pdyd5 = true;
            } else {
                if (this.lookdata.length == 0) {
                    let lookdata = JSON.parse(JSON.stringify(this.lookdata))
                       lookdata.forEach((item)=>{
                        item.ProjectContent = item.OriginalProjectContent
                    })
                    if (!this.lookfalse) {
                        console.log('Sssssssssss');
                        this.$axios({
                            method: 'post',
                            url: `/api/FormulaManage/FormulaManage_AddFormulaTemplate`,
                            data: {
                                Name: this.workname,
                                Projects: lookdata
                            }
                        }).then(res => {
                            // console.log()
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
                            this.pdyd5 = true;
                            // this.tipword = res.data.msg;
                            if (res.data.msg == '请求成功') {
                                this.tipword = this.lang.FormulaManage_HT_FormulaTemplateSetting_CreateSuccess;
                                this.getonedata();
                                this.onetable = false;
                            } else {
                                console.log(this.lookdata);
                                this.tipword = res.data.msg;
                            }
                        });
                    } else {
                          let userid = ''
            if (!JSON.parse(sessionStorage.getItem('userInfo1'))) {
                userid = JSON.parse(
                    sessionStorage.getItem('sightseerInfo1')
                ).SCMSUserName;
            } else {
                userid = JSON.parse(
                    sessionStorage.getItem('userInfo1')
                ).SCMSUserName;
            }
                        console.log('Sssssssssss');
                        this.$axios({
                            method: 'post',
                            url: `/api/FormulaManage/FormulaManage_UpdateFormulaTemplate`,
                            data: {
                                TID: this.oneworkduan,
                                Name: this.workname,
                                Projects: this.lookdata,
                                LoginUserName: userid
                            }
                        }).then(res => {
                            console.log(res);
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
                            this.pdyd5 = true;
                            console.log('sssssssssssssssssss');
                            if (res.data.msg == '请求成功') {
                                this.tipword = this.lang.FormulaManage_HT_FormulaTemplateSetting_ModifiedSuccessfully;
                                this.onetable = false;

                                this.getonedata();
                            } else {
                                this.tipword = res.data.msg;
                            }
                        });
                    }
                } else {
                    let b = 0;
                    for (b in this.lookdata) {
                        b;
                        if (!this.lookdata[b].Unit) {
                            this.lookdata[b].Unit = '';
                        }
                    }
                    let i = 0;
                    for (i in this.lookdata) {
                        if (this.lookdata[i].ContentGroup == '') {
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
                            this.pdyd5 = true;
                            if (this.lookdata[i].Name == undefined) {
                                // this.tipword = `请输入项目${this.lookdata[i].ProjectContent}的分组！`;
                                let firstL = this.lang.FormulaManage_HT_FormulaTemplateSetting_PEGroupingOfItem.indexOf('{')
                                let firstR = this.lang.FormulaManage_HT_FormulaTemplateSetting_PEGroupingOfItem.indexOf('}') + 1
                                let str1 = this.lang.FormulaManage_HT_FormulaTemplateSetting_PEGroupingOfItem.slice(firstL, firstR)
                                let msg = this.lang.FormulaManage_HT_FormulaTemplateSetting_PEGroupingOfItem.replace(str1, `{${this.lookdata[i].ProjectContent}}`)
                                this.tipword = msg

                            } else {
                                // this.tipword = `请输入项目${this.lookdata[i].Name}的分组！`;
                                let firstL = this.lang.FormulaManage_HT_FormulaTemplateSetting_PEGroupingOfItem.indexOf('{')
                                let firstR = this.lang.FormulaManage_HT_FormulaTemplateSetting_PEGroupingOfItem.indexOf('}') + 1
                                let str1 = this.lang.FormulaManage_HT_FormulaTemplateSetting_PEGroupingOfItem.slice(firstL, firstR)
                                let msg = this.lang.FormulaManage_HT_FormulaTemplateSetting_PEGroupingOfItem.replace(str1, `{${this.lookdata[i].Name}}`)
                                this.tipword = msg
                            }

                            this.pdif = false;
                            break;
                        } else {
                            this.pdif = true;
                        }
                    }
                    if (this.pdif) {
                        if (!this.lookfalse) {
                            console.log('Sssssssssss1');
                            console.log(this.lookdata);
                            
                               let lookdata = JSON.parse(JSON.stringify(this.lookdata))
                    lookdata.forEach((item)=>{
                        item.ProjectContent = item.OriginalProjectContent
                    })
                    
                            this.$axios({
                                method: 'post',
                                url: `/api/FormulaManage/FormulaManage_AddFormulaTemplate`,
                                data: {
                                    Name: this.workname,
                                    Projects: lookdata
                                }
                            }).then(res => {
                                
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
                                this.pdyd5 = true;
                                if (res.data.msg == '请求成功') {
                                    this.tipword = this.lang.FormulaManage_HT_FormulaTemplateSetting_CreateSuccess;
                                    this.onetable = false;
                                    this.getonedata();
                                } else {
                                    // let aa = 0;
                                    // for (
                                    //     aa = 0;
                                    //     aa < this.lookdata.length;
                                    //     aa++
                                    // ) {
                                    //     if (isNaN(this.lookdata[aa].Digit)) {
                                    //         this.lookdata[aa].Digit = '';
                                    //     }
                                    // }
                                    this.tipword = res.data.msg;
                                }
                            });
                        } else {
                            console.log('Ssssssssss2');
                            let cloneLookdata = JSON.parse(JSON.stringify(this.lookdata))
                            for (let i = 0; i < cloneLookdata.length; i++) {
                                // cloneLookdata[i].Digit = parseInt(cloneLookdata[i].Digit);
                                cloneLookdata[i].ProjectContent = cloneLookdata[i].OriginalProjectContent
                            }
                            this.$axios({
                                method: 'post',
                                url: `/api/FormulaManage/FormulaManage_UpdateFormulaTemplate`,
                                data: {
                                    TID: this.oneworkduan,
                                    Name: this.workname,
                                    Projects: cloneLookdata
                                }
                            }).then(res => {
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
                                this.pdyd5 = true;

                                if (res.data.msg == '请求成功') {
                                    this.tipword = this.lang.FormulaManage_HT_FormulaTemplateSetting_ModifiedSuccessfully;
                                    this.getonedata();
                                    this.onetable = false;
                                } else {
                                    // let aa = 0;
                                    // for (
                                    //     aa = 0;
                                    //     aa < this.lookdata.length;
                                    //     aa++
                                    // ) {
                                    //     if (isNaN(this.lookdata[aa].Digit)) {
                                    //         this.lookdata[aa].Digit = '';
                                    //     }
                                    // }
                                    this.tipword = res.data.msg;
                                }
                            });
                        }
                    }
                }
            }
        },
        uuid() {
            var s = [];
            var hexDigits = '0123456789abcdef';
            for (var i = 0; i < 36; i++) {
                s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
            }
            s[14] = '4'; // bits 12-15 of the time_hi_and_version field to 0010
            s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
            s[8] = s[13] = s[18] = s[23] = '-';

            var uuid = s.join('');
            return uuid;
        },
        pre() {
            this.lookforsearch1 = false;
            console.log(this.comitdata);
            console.log(this.lookdata);
            let i = 0;
            for (i in this.comitdata) {
                this.comitdata[i].AlarmMsg = this.comitdata[i].Address;
                this.comitdata[i].PID = this.uuid();
                // if (
                //     this.comitdata[i].DateType == this.lang['F32位浮点数IEEE754'] ||
                //     this.comitdata[i].DateType == this.lang['F64位浮点数IEEE754']
                // ) {
                //     this.comitdata[i].Digit = 2;
                // } else {
                //     this.comitdata[i].Digit = '';
                // }
                this.comitdata[i].ProjectContent = this.comitdata[i].Name;
                this.comitdata[i].OriginalProjectContent = this.comitdata[i].Name;
                this.comitdata[i].ProjectDescription = this.comitdata[i].Descript;
                this.comitdata[i].VariableDescription = this.comitdata[i].Descript;
                this.comitdata[i].DataType = this.comitdata[i].DateType;
                this.comitdata[i].VariableName = this.comitdata[i].Name;
            }
            let a = 0;
            let a1 = 0;

            for (a in this.comitdata) {
                this.lookdata.push(this.comitdata[a]);
            }
            for (a1 in this.lookdata) {
                this.lookdata[a1].number = a1;

                // if (this.lookdata[a1].Digit == NaN) {
                //     this.lookdata[a1].Digit = '';
                // }
            }
            this.comitdata = [];
            let res = new Map();
            this.lookdata = this.unique(this.lookdata);
            console.log('this', this.lookdata);
        },

        unique(arr) {
            const res = new Map();
            return arr.filter(
                arr => !res.has(arr.ProjectContent) && res.set(arr.ProjectContent, 1)
            );
        },
        select(selection, row) {
            this.comitdata = selection;
        },
        selectall(selection, row) {
            this.comitdata = selection;
        },
        exportdata() {
               if(!this.dcshow){
            this.tipword = this.lang.NoOperationAuthority;
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
            this.pdyd5 = true;
            return
            }
            this.aaa = 1;
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
            this.pdyd5 = true;
            // this.tipword = `是否导出${this.expname}所有配方`;
            // this.tipword =`${this.lang.FormulaManage_HT_messExportTheFile} <${this.expname}> ${this.lang.FormulaManage_HT_AllRecipes}`
            let msg = this.lang.FormulaManage_HT_messExportTheFile
            let firstL = msg.indexOf('{')
            let firstR = msg.indexOf('}') + 1
            let str1 = msg.slice(firstL, firstR)
            msg = msg.replace(str1, `<${this.expname}>`)
            this.tipword =`${msg}`
            this.deltrue = false;
        },
        formatJson(filterVal, jsonData) {
            return jsonData.map(v => filterVal.map(j => v[j]));
        },
        haschange1(a) {
            let i = 0;
            for (i in this.lookdata) {
                if (this.lookdata[i].number == a.number) {
                    this.lookdata[i] = a;
                }
            }
            console.log(this.lookdata);
        },
        cover() {
               if(!this.fgshow){
            this.tipword = this.lang.NoOperationAuthority;
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
            this.pdyd5 = true;
            return
            }
            if(!this.workproject){
                this.tipword = '请选择配方！';
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
            this.pdyd5 = true;
            return
            }
            setTimeout(() => {
                        $('.onelook').css({
                            zoom: this.a11,
                            left: `calc(50% - ${($('.onelook').width() / 2) *
                                this.a11}px)`,
                            top: `calc(50% - ${($('.onelook').height() / 2) *
                                this.a11}px)`
                        });
                        this.twolook = true;
                        this.move('onelook', 'onelooktop');
                    });
            this.pdyd3 = true;
            this.twolookfalse = true;
            this.$axios
                .post(
                    `/api/FormulaManage/ModifyFormula?tid=${this.oneworkduan}&fid=${this.workproject}&update=0`
                )
                .then(res => {
                    this.Project = [];
                    this.ai = true;
                    this.Project = res.data.data.TemplateProjects;
                    let aa = 0;
                    for (aa in this.Projects) {
                        this.Projects[aa].CurrentValue = '';
                    }
                    this.twoworkdata.Name = res.data.data.Name
                    this.twoworkdata.FormulaDescription = res.data.data.FormulaDescription
                })
                .then(() => {
                    let a = this.Project;
                    this.$axios({
                    method:'post',
                    url:'/api/FormulaManage/RefresuCurrentValue1',
                    data:a
                    }).then(res1 => {
                            console.log(res1)
                            let i = 0;
                            for (i in res1.data.data) {
                                this.Project[i].Value =
                                    res1.data.data[i].CurrentValue;
                            }
                                        //  this.Project22 = [];
                    var indexArr = [];
                    let aa = JSON.stringify(this.Project);
                    console.log(aa);
                    let a1 = JSON.parse(aa);
                    let project = [];
                    let p2 = []
                    for (let i = 0; i < a1.length; i++) {
                        var index = indexArr.indexOf(a1[i].ContentGroup);

                        if (index == -1) {
                            project = [];
                            indexArr.push(a1[i].ContentGroup);
                            project.push(a1[i]);
                            p2.push(project);
                        } else {
                            for (var j = 0; j < p2.length; j++) {
                                if (
                                    p2[j][0].ContentGroup ==
                                    a1[i].ContentGroup
                                ) {
                                    p2[j].push(a1[i]);
                                }
                            }
                        }
                    }
                    this.Project22 = p2;
                   
                });
                        });
       
        },

        lookforsearch() {
            this.watchdata();
        },
        nowdata() {
            this.$axios
                .post(
                `/api/FormulaManage/QueryFormulaTemplateProjectsAndAddFormula?tid=${this.oneworkduan}`
                )
                .then(res => {
                    console.log(res)
                    //    this.Project = [];
                    this.ai = true;
                    this.c1 = res.data.data.Projects;
                    let aa = 0;
                    for (aa in this.c1) {
                        this.c1[aa].CurrentValue = '';
                    }
                })
                .then(() => {
                    this.$axios({
                        method:'post',
                        url:'/api/FormulaManage/RefresuCurrentValue1',
                        data:this.c1
                    }).then(res1 => {
                            let i = 0;
                            console.log(res1);
                            for (i in res1.data.data) {
                                this.Project[i].Value =
                                    res1.data.data[i].CurrentValue;
                            }
                            //   this.Project22 = [];
                            let p2 = [];
                            var indexArr = [];
                            let aa = JSON.stringify(this.Project);
                            console.log(aa);
                            let a1 = JSON.parse(aa);
                            let project = [];
                            for (let i = 0; i < a1.length; i++) {
                                var index = indexArr.indexOf(
                                    a1[i].ContentGroup
                                );

                                if (index == -1) {
                                    project = [];
                                    indexArr.push(a1[i].ContentGroup);
                                    project.push(a1[i]);
                                   p2.push(project);
                                } else {
                                    for (
                                        var j = 0;
                                        j <p2.length;
                                        j++
                                    ) {
                                        if (
                                           p2[j][0].ContentGroup ==
                                            a1[i].ContentGroup
                                        ) {
                                           p2[j].push(a1[i]);
                                        }
                                    }
                                }
                            }
                            this.Project22 = p2;
                            console.log(this.Project22);
                        });
                });
            // this.$axios
            //     .post(
            //         `/api/FormulaManage/QueryFormulaTemplateProjectsAndAddFormula?tid=${this.oneworkduan}`
            //     )
            //     .then(res => {
            //         this.Project = [];
            //         let i = 0;
            //         for (i in res.data.data.Projects) {
            //             this.Project.push(res.data.data.Projects[i]);
            //         }
            //     })
            //     .then(() => {
            //         this.Project = JSON.stringify(this.Project);
            //         this.$axios
            //             .post(
            //                 `/api/FormulaManage/RefresuCurrentValue1?projects=${this.Project}`
            //             )
            //             .then(res1 => {
            //             });
            //     });
        },
        yyong() {
         
            if(!this.yypfshow){
                this.tipword = this.lang.NoOperationAuthority;
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
                this.pdyd5 = true;
                return
            }
              if(!this.workproject){
       this.tipword = '请选择配方！';
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
                this.pdyd5 = true;
                return
           }
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
            this.pdyd5 = true;
            this.tipword = this.lang.FormulaManage_HT_MessFormulaAvailable;
            this.deltrue = false;
            this.yy = 1;
        },
        nowdata3() {
            console.log('22');
            this.$axios
                .post(
                    `/api/FormulaManage/QueryFormulaTemplateProjectsAndAddFormula?tid=${this.oneworkduan}`
                )
                .then(res => {
                    console.log('res', res.data.data);

                    // this.Project22 = [];
                    var project = [];
                    this.Project = [];
                     let p2 = [];
                    let i = 0;
                    for (i in res.data.data.Projects) {
                        this.Project.push(res.data.data.Projects[i]);
                    }

                    var indexArr = [];
                    for (let i = 0; i < res.data.data.Projects.length; i++) {
                        var index = indexArr.indexOf(
                            res.data.data.Projects[i].ContentGroup
                        );

                        if (index == -1) {
                            project = [];
                            indexArr.push(
                                res.data.data.Projects[i].ContentGroup
                            );
                            project.push(res.data.data.Projects[i]);
                           p2.push(project);
                        } else {
                            for (var j = 0; j <p2.length; j++) {
                                if (
                                   p2[j][0].ContentGroup ==
                                    res.data.data.Projects[i].ContentGroup
                                ) {
                                   p2[j].push(
                                        res.data.data.Projects[i]
                                    );
                                }
                            }
                        }
                    }
                    this.Project22 = p2;
                });

            console.log('22', this.Project);
        },
        req(a) {
            this.pageData.PageIndex = a;
            this.watchdata();
        },
        nowdata1() {
            console.log('11');
            this.$axios
                .post(
                    `/api/FormulaManage/ModifyFormula?tid=${this.twoworkdata.TID}&fid=${this.twoworkdata.FID}&update=0`
                )
                .then(res => {
                    let i = 0;
                    this.Project = [];
                    // this.Project22 = [];
                    let p2 = [];
                    for (i in res.data.data.TemplateProjects) {
                        this.Project.push(res.data.data.TemplateProjects[i]);
                    }
                    this.twoworkdata.Name = res.data.data.Name
                    this.twoworkdata.FormulaDescription = res.data.data.FormulaDescription
                })
                .then(() => {
                    let a = this.Project;
                    this.$axios({
                        method:'post',
                        url:'/api/FormulaManage/RefresuCurrentValue1',
                        data:a
                    }) .then(res1 => {
                            console.log(res1);
                            let i = 0;
                            for (i in res1.data.data) {
                                this.Project[i].Value =
                                    res1.data.data[i].CurrentValue;
                            }
                            let p2 = [];
                            var indexArr = [];
                            let aa = JSON.stringify(this.Project);
                            console.log(aa);
                            let a1 = JSON.parse(aa);
                            let project = [];
                            for (let i = 0; i < a1.length; i++) {
                                var index = indexArr.indexOf(
                                    a1[i].ContentGroup
                                );

                                if (index == -1) {
                                    project = [];
                                    indexArr.push(a1[i].ContentGroup);
                                    project.push(a1[i]);
                                   p2.push(project);
                                } else {
                                    for (
                                        var j = 0;
                                        j <p2.length;
                                        j++
                                    ) {
                                        if (
                                           p2[j][0].ContentGroup ==
                                            a1[i].ContentGroup
                                        ) {
                                           p2[j].push(a1[i]);
                                        }
                                    }
                                }
                            }
                            this.Project22 = p2;
                            console.log(this.Project22);
                        });
                });
        },
        search() {
            console.log('点击搜索')
               if(!this.sspfshow){
            this.tipword =  this.lang.NoOperationAuthority;
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
            this.pdyd5 = true;
            return
            }
            let i = this.tableData4;
            let a = 0;

            let reg = new RegExp(this.tablekeyword);
            console.log(this.tableData4);
            this.tableData1 = [];
            for (a in i) {
                if (this.tablekeyword !== '') {
                    // if (this.tablekeyword == i[a].Name || this.tablekeyword == i[a].FormulaDescription) {
                    //     this.tableData1.push(i[a]);
                    // }
                 
                    i[a].FormulaDescription = i[a].FormulaDescription == null?'':i[a].FormulaDescription
                      if (i[a].Name.indexOf(this.tablekeyword) != -1 ||  i[a].FormulaDescription.indexOf(this.tablekeyword) != -1) {
                        this.tableData1.push(i[a]);
                    }
                } else {
                    this.tableData1.push(i[a]);
                    // if (this.itemname == i[a].Name) {
                    //     if (reg.test(i[a].FormulaDescription)) {
                    //         this.tableData1.push(i[a]);
                    //     } else {
                    //         this.tableData1 = [];
                    //     }
                    // }
                }
            }
            console.log('++++++++++++++++++++++++++++', this.tableData1)
            if(this.tableData1.length == 0){
                this.tableData2 = []
            }else{
                this.workproject = this.tableData1[0].FID
                this.getthreedata()
            }
        },
        closeIssue() {
            if (this.isssuing) {
                this.processMess = false;
            } else {
                this.processErr = true
            }
        },
        cancel() {
            this.gettwodata()
            this.onetable = false;
            this.twolook = false;
            this.threelook = false;
        },
        handleEdit(a) {},
        cancel1() {
            this.lookforsearch1 = false;
        },
        handleRowChange(row, event, column) {
            console.log(row);
            this.expname = row.Name;
            this.oneworkduan = row.TID;
            this.workname = row.OriginalName;
            this.nowdata3();
            this.gettwodata();
        },
        handleRowChange1(row, event, column) {
            console.log(row);
            this.twoworkdata = row;
            this.Name = row.Name;
            this.workproject = row.FID;
            var that = this
              clearInterval(this.time)
            this.time = setInterval(()=>{
                // console.log("32212")
              that.getthreedata();
            },1000)
           
        },
        handleRowChange2(row, event, column) {
            this.projectchangedata = row;
            this.CurrentValue = row.Value;
            // this.twoworkdata.Name = row.VariableName;
            // this.twoworkdata.FormulaDescription = row.ProjectDescription;
            // this.twoworkdata.Number = row.Number;
        },
        lookdataselect(a, b) {
            this.projectdata1 = a;
        },
        lookdataselect1(a, b) {
            this.projectdata1 = a;
        },
        delclick() {
            this.lookdata = this.lookdata.filter(item => {
                let a = this.projectdata1.map(v => v.number);
                return !a.includes(item.number);
            });
            for (let i = 0; i < this.lookdata.length; i++) {
                this.lookdata[i].number = i;
            }
            this.projectdata1 = [];
        },
        getonedata() {
            this.$axios
                .post(`/api/FormulaManage/QueryFormulaTemplates`)
                .then(res => {
                   console.log(res.data.data)
                   console.log(this.lang)
                    this.tableData = res.data.data;
                    this.expname = res.data.data[0].Name;
                    this.oneworkduan = this.tableData[0].TID;
                    this.nowdata3();
                })
                .then(() => {
                    if (!this.oneworkduan) {
                        this.tableData1 = [];
                        this.tableData2 = [];
                    } else {
                        this.gettwodata();
                    }
                    if(this.tableData == []){
                        this.tableData1 = [];
                        this.tableData2 = [];
                    }
                });
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
                this.pdyd5 = true;
                this.tipword = this.lang.DataGrid_Reaction_HT_PEAPositiveInteger;
                return;
            } else {
                if (
                    this.nowpage !== 1 &&
                    this.nowpage !== this.pageData.TotalPage
                ) {
                    if (
                        this.nowpage < 1 ||
                        this.nowpage > this.pageData.TotalPage
                    ) {
                        this.tipword =this.lang.DataGrid_Reaction_HT_PEThePageNumber;
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
                        this.pdyd5 = true;
                        return;
                    }
                }
            }

            this.pageData.PageIndex = this.nowpage;
            this.watchdata();
        },
        start() {
            this.pageData.PageIndex = 1;
            // this.onetable();
            this.watchdata();
        },
        isPositiveInteger(s) {
            //是否为正整数
            var re = /^[0-9]+$/;
            return re.test(s);
        },
        abck() {
            if (1 < this.pageData.PageIndex && this.pageData.PageIndex !== 1) {
                this.pageData.PageIndex--;

                this.watchdata();
            }
            // this.onetable();
        },
        next() {
            if (
                this.pageData.PageIndex < this.pageData.TotalPage &&
                this.pageData.PageIndex !== this.pageData.TotalPage
            ) {
                this.pageData.PageIndex++;
                this.watchdata();
            }
        },
        end() {
            this.pageData.PageIndex = this.pageData.TotalPage;
            this.watchdata();
            // this.onetable();
        },
        gettwodata() {
           
           
            this.$axios
                .post(
                    `/api/FormulaManage/FormulaTemplateChange?tid=${this.oneworkduan}`
                )
                .then(res => {
                    this.tableData1 = res.data.data;
                    this.tableData4 = res.data.data;
                    this.tableData2 = [];
                    this.tablename = [];
                    let i = 0;
                    for (i in this.tableData1) {
                        this.tablename.push(this.tableData1[i].Name);
                    }
                    // if(this.tableData1.length === 0){
                    //     this.Name = ""
                    //     this.twoworkdata = this.tableData1[0]
                    // }else{
                    //     this.Name = this.tableData1[0].Name;
                    //     this.twoworkdata = this.tableData1[0];
                    // }
                    this.Name = this.tableData1.length > 0 ? this.tableData1[0].Name : "";
                    this.twoworkdata = this.tableData1.length > 0 ? this.tableData1[0] : [];
                    if (res.data.data.length == 0) {
                        this.workproject = '';
                    } else {
                        this.workproject = this.tableData1[0].FID;
                    }
                    this.$axios
                        .post(
                            `/api/FormulaManage/ModifyFormula?tid=${res.data.data[0].TID}&fid=${res.data.data[0].FID}&update=0`
                        )
                        .then(res1 => {
                            console.log(res1.data)
                            // this.twoworkdata.Name = res1.data.data.Name
                            // this.twoworkdata.FormulaDescription = res1.data.data.FormulaDescription
                            if (res1.data.data.TemplateProjects.length !== 0) {
                                this.CurrentValue = res1.data.data.TemplateProjects[0].Value;
                            }
                        });
                })
                .then(() => {
                    if (!this.workproject) {
                        this.tableData2 = [];
                    } else {
                        clearInterval(this.time)
                         var that = this
                        this.time = setInterval(()=>{
                            // console.log("32212")
                            that.getthreedata();
                        },1000)
                      
                    }
                        if(this.tableData1 == []){
                        this.tableData2 = [];
                    }
                });
        },
        getthreedata() {
            
            this.$axios
                .post(
                    `/api/FormulaManage/FormulaChange?fid=${this.workproject}`
                )
                .then(res => {
                    // console.log(res)
                    this.$axios({
                        method:'post',
                        url:'/api/FormulaManage/RefresuCurrentValue2',
                        data:res.data.data
                    }).then(res1 => {
                            // console.log('ssssssssa');
                            let a = 0;
                            for (a in res1.data.data) {
                                res.data.data[a].Value12 =
                                    res1.data.data[a].CurrentValue;
                                res.data.data[a].CompareRes =
                                    res1.data.data[a].CompareRes;
                            }
                            this.tableData2 = res.data.data;
                        });
                })
                .catch(() => {
                    this.tableData2 = [];
                });
        },
        addproject() {
            this.$axios
                .post(`/api/FormulaManage/FormulaManage_GstCondition`)
                .then(res => {
                    this.projectlist = res.data.data;
                    this.projectlist2 = this.projectlist[0].Groups;
                    this.projectlist3 = this.projectlist2[0].DataTypes;
                    this.oneselect = this.projectlist[0].DeviceName;
                    this.twoselect = this.projectlist2[0].GroupName;
                    this.threeselect = this.lang.AlarmRecord_HT_Unlimited
                    this.nowpage = 1;
                })
                .then(() => {
                    this.watchdata();
                    setTimeout(()=>{
         $('.look22').css({
                            left: `calc(50% - ${($('.look').width() / 2) *
                                this.a11}px)`,
                            top: `calc(50% - ${($('.look').height() / 2) *
                                this.a11}px)`
                        });
                        this.move('look22', 'looktop')
                    this.lookforsearch1 = true;
                    })
             
                    this.pdyd2 = true;
                });
        },
        watchdata() {
            // console.log(this.pageData);
             let arr = []
            if(this.threeselect == this.lang.AlarmRecord_HT_Unlimited){
                this.projectlist3.filter(f => f.Value !== this.lang.AlarmRecord_HT_Unlimited).forEach(item => {
                    arr.push(item.Value)
                })
            }else{
                arr.push(this.threeselect)
            }
              this.$axios({
                method:'post',
                url:`/api/FormulaManage/FormulaManage_GstVariableList`,
                data:{
                    argDevice:this.oneselect,
                    argGroup:this.twoselect,
                    argDataType:arr,
                    argKeyWord:this.projectkeyword,
                    argPageSize:this.pageData.PageSize,
                    argPageIndex:this.pageData.PageIndex

                }
            }).then(res => {
                    // console.log(`/api/FormulaManage/FormulaManage_GstVariableList?argDevice=${this.oneselect}&argGroup=${this.twoselect}&argDataType=${this.threeselect}&argKeyWord=${this.projectkeyword}&argPageSize=${this.pageData.PageSize}&argPageIndex=${this.pageData.PageIndex}`)

                    // console.log(res);
                    this.projectlistdata = res.data.data.DataList;
                    this.pageData = res.data.data.ParameterList;
                    this.nowpage = this.pageData.PageIndex;
                    // this.pageData = res.data.data.ParameterList;
                    // this.pageDate.togesize = this.projectlistdata.length;
                    // this.pageDate.togeIndex = Math.ceil(
                    //     this.projectlistdata.length / 50
                    // );
                    // let a = this.nowIndex - 1;
                    // if (this.pageDate.togesize <= 50) {
                    //     let b = this.pageDate.togesize;
                    //     this.pageDate.pageIndex = this.nowIndex;
                    // } else {
                    //     let b = this.nowIndex * 1 + 1;
                    //     this.pageDate.pageIndex = this.nowIndex;
                    //     this.projectlistdata = this.projectlistdata.splice(
                    //         a * 1,
                    //         50
                    //     );
                    // let c = 0;
                    // for(c in this.projectlistdata){
                    //     let d = (parseInt(c)+1);
                    //     this.projectlistdata[c].Number = d;
                    // }
                    //     }
                    //     if (this.nowIndex >= this.pageDate.togeIndex) {
                    //         this.aaa = false;
                    //     } else {
                    //         this.aaa = true;
                    //     }
                    //     if (this.nowIndex < this.pageDate.togeIndex) {
                    //         this.bbb = false;
                    //     } else {
                    //         this.bbb = true;
                    //     }
                    //     this.nowpage = 1;
                });
        },
        oneadd() {
            if(!this.xjmbshow){
                this.tipword = this.lang.NoOperationAuthority;
                setTimeout(() => {
                    $('.tip').css({
                        zoom: this.a11,
                        left: `calc(50% - ${($('.tip').width() / 2) * this.a11}px)`,
                        top: `calc(50% - ${($('.tip').height() / 2) * this.a11}px)`
                    });
                    this.tipchange = true;
                    this.move('tip', 'tiphead');
                });
                this.pdyd5 = true;
                return
            }
            setTimeout(() => {
                $('.lookq').css({
                    left: `calc(50% - ${($('.look').width() / 2) * this.a11}px)`,
                    top: `calc(50% - ${($('.look').height() / 2) * this.a11}px)`
                });
                this.move('lookq', 'looktop')
                this.onetable = true;
            })
            this.pdyd1 = true;
            this.lookfalse = false;
            this.lookdata = [];
            this.workname = '';
        },
        twoadd() {
               if(!this.xjglshow){
            this.tipword = this.lang.NoOperationAuthority;
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
            this.pdyd5 = true;
            return
            }
            // this.Project22 = [];
            let p2 = [];
            this.deltrue = true;
            for (let i = 0; i < this.Project.length; i++) {
                this.Project[i].Value = '';
            }
            if (this.Project.length !== 0) {
                this.ai = true;
            } else {
                this.ai = false;
            }
            this.twoworkdata = {
                FormulaDescription: '',
                Name: '',
                Number: ''
            };
            var indexArr = [];
            let aa = JSON.stringify(this.Project);
            console.log(aa);
            let a1 = JSON.parse(aa);
            let project = [];
            for (let i = 0; i < a1.length; i++) {
                var index = indexArr.indexOf(a1[i].ContentGroup);

                if (index == -1) {
                    project = [];
                    indexArr.push(a1[i].ContentGroup);
                    project.push(a1[i]);
                   p2.push(project);
                } else {
                    for (var j = 0; j <p2.length; j++) {
                        if (
                           p2[j][0].ContentGroup ==
                            a1[i].ContentGroup
                        ) {
                           p2[j].push(a1[i]);
                        }
                    }
                }
            }
            
            this.Project22 = p2;
            console.log(this.Project22);
            console.log(this.Project);
            setTimeout(() => {
                        $('.onelook').css({
                            zoom: this.a11,
                            left: `calc(50% - ${($('.onelook').width() / 2) *
                                this.a11}px)`,
                            top: `calc(50% - ${($('.onelook').height() / 2) *
                                this.a11}px)`
                        });
                        this.twolook = true;
                        this.move('onelook', 'onelooktop');
                    });
            this.pdyd3 = true;
            this.twolookfalse = false;
            this.$axios
                .post(
                    `/api/FormulaManage/QueryFormulaTemplateProjectsAndAddFormula?tid=${this.oneworkduan}`
                )
                .then(res => {
                    // this.CurrentValue = res.data.data.Projects[0].Value;
                    // this.ProjectContent =
                    //     res.data.data.Projects[0].ProjectContent;
                });
        },
        twopre() {
            this.deltrue = true;
            let a = { Name: this.ProjectContent, Value: this.CurrentValue };
            let b = [];
            b.push(a);
            let i = 0;
            for (i in this.Project) {
                this.Project[i].Name = this.Project[i].ProjectContent;
            }
            if (this.twolookfalse == false) {
                this.$axios({
                    method: 'post',
                    url: `/api/FormulaManage/FormulaManage_AddFormula`,
                    data: {
                        TID: this.oneworkduan,
                        Name: this.twoworkdata.Name,
                        Number: this.twoworkdata.Number,
                        FormulaDescription: this.twoworkdata.FormulaDescription,
                        Items: this.Project
                    }
                })
                    .then(res => {
                        if (res.data.msg !== '请求成功') {
                            this.tipword = res.data.msg;
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
                            this.pdyd5 = true;
                        } else {
                            this.tipword = res.data.data;
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
                            this.pdyd5 = true;
                            this.twolook = false;
                            this.gettwodata();
                        }
                    })
                    .then(() => {
                        b = [];
                    });
            } else {
                console.log(`/api/FormulaManage/FormulaManage_UpdateFormula`);
                console.log(
                    'TID:' + this.oneworkduan,
                    'FID:' + this.twoworkdata.FID,
                    'Name:' + this.twoworkdata.Name,
                    'Number:' + this.twoworkdata.Number,
                    'FormulaDescription:' + this.twoworkdata.FormulaDescription,
                    'Items:' + this.Project
                );
                      var userid = ''
      if (!JSON.parse(sessionStorage.getItem('userInfo1'))) {
                userid = JSON.parse(
                    sessionStorage.getItem('sightseerInfo1')
                ).SCMSUserAccount;
            } else {
                userid = JSON.parse(
                    sessionStorage.getItem('userInfo1')
                ).SCMSUserAccount;
            }
                let a = { Name: this.ProjectContent, Value: this.CurrentValue };
                this.twoworkdata.TemplateProjects.push(a);
                this.$axios({
                    method: 'post',
                    url: `/api/FormulaManage/FormulaManage_UpdateFormula`,
                    data: {
                        TID: this.oneworkduan,
                        FID: this.twoworkdata.FID,
                        Name: this.twoworkdata.Name,
                        Number: this.twoworkdata.Number,
                        FormulaDescription: this.twoworkdata.FormulaDescription,
                        Items: this.Project,
                        LoginUserName:userid
                    }
                })
                    .then(res => {
                        console.log(this.Project);
                        if (res.data.msg !== '请求成功') {
                            console.log(res);
                            this.tipword = res.data.msg;
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
                            this.pdyd5 = true;
                        } else {
                            this.tipword = res.data.data;
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
                            this.pdyd5 = true;
                            this.twolook = false;
                            this.gettwodata();
                        }
                    })
                    .then(() => {});
            }
        },
        threechange(row, event, column) {
               if(!this.xgshow){
            this.tipword = this.lang.NoOperationAuthority;
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
            this.pdyd5 = true;
            return
            }
            this.deltrue = true;
           setTimeout(() => {
                        $('.onework').css({
                            zoom: this.a11,
                            left: `calc(50% - ${($('.oneworktop').width() / 2) *
                                this.a11}px)`,
                            top: `calc(50% - ${($('.oneworktop').height() / 2) *
                                this.a11}px)`
                        });
                      this.threelook = true;
                        this.move('onework', 'oneworktop');
                    });
           
            this.pdyd4 = true;
            this.threevalue = event.VariableName;
            this.threeid = event.CID;
            this.threename = event.ProjectContent;
            this.oneworkname1 = event.Value;
        },
        twochange(row, event, column) {
             let event1 = JSON.parse(JSON.stringify(event))
             if(!this.bjpfshow){
            this.tipword = this.lang.NoOperationAuthority;
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
            this.pdyd5 = true;
            return
            }
            this.deltrue = true;
            if (this.Project.length !== 0) {
                this.ai = true;
            } else {
                this.ai = false;
            }
            setTimeout(() => {
                        $('.onelook').css({
                            zoom: this.a11,
                            left: `calc(50% - ${($('.onelook').width() / 2) *
                                this.a11}px)`,
                            top: `calc(50% - ${($('.onelook').height() / 2) *
                                this.a11}px)`
                        });
                        this.twolook = true;
                        this.move('onelook', 'onelooktop');
                    });
            this.pdyd3 = true;
            this.twolookfalse = true;
            this.twoworkdata = event1;
            this.$axios
                .post(
                    `/api/FormulaManage/ModifyFormula?tid=${event1.TID}&fid=${event.FID}&update=0`
                )
                .then(res => {
                    
                    console.log(res);
                    let i = 0;
                    this.Project = [];
                    // this.Project22 = [];
                    let p2 = [];
                    for (i in res.data.data.TemplateProjects) {
                        this.Project.push(res.data.data.TemplateProjects[i]);
                    }
                    var indexArr = [];
                    let aa = JSON.stringify(this.Project);
                    console.log(aa);
                    let a1 = JSON.parse(aa);
                    let project = [];
                    for (let i = 0; i < a1.length; i++) {
                        var index = indexArr.indexOf(a1[i].ContentGroup);

                        if (index == -1) {
                            project = [];
                            indexArr.push(a1[i].ContentGroup);
                            project.push(a1[i]);
                           p2.push(project);
                        } else {
                            for (var j = 0; j <p2.length; j++) {
                                if (
                                   p2[j][0].ContentGroup ==
                                    a1[i].ContentGroup
                                ) {
                                   p2[j].push(a1[i]);
                                }
                            }
                        }
                    }
                    this.Project22 = p2;
                    this.twoworkdata.Name = res.data.data.Name
                    this.twoworkdata.FormulaDescription = res.data.data.FormulaDescription
                });
        },
        onechange(row, event, column) {
               if(!this.bjmbshow){
            this.tipword = this.lang.NoOperationAuthority;
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
            this.pdyd5 = true;
            return
            }
            
            this.deltrue = true;
            if (this.Project !== 0) {
                this.ai = true;
            } else {
                this.ai = false;
            }
            this.lookfalse = true;
            this.oneworkduan = event.TID;
            this.workname = event.OriginalName;
            this.gettwodata();
            this.$axios
                .post(
                    `/api/FormulaManage/QueryFormulaTemplateProjectsAndAddFormula?tid=${this.oneworkduan}`
                )
                .then(res => {
                    this.lookdata = res.data.data.Projects;
                    this.workname = res.data.data.OriginalName;
                    let a = 0;
                    for (a = 0; a < this.lookdata.length; a++) {
                        this.lookdata[a].number = a;
                    }
                })
                .then(() => {});
              setTimeout(() => {
                $('.lookq').css({
                            left: `calc(50% - ${($('.look').width() / 2) *
                                this.a11}px)`,
                            top: `calc(50% - ${($('.look').height() / 2) *
                                this.a11}px)`
                        });
                        this.move('lookq', 'looktop')
         this.onetable = true;
          })
            this.pdyd1 = true;
        },
        mouseUpHandleelse3(event) {
            window.onmousemove = null;
            event.currentTarget.style.cursor = 'move';
        },
        mouseDownHandleelse3(event) {
            event.currentTarget.style.cursor = 'move';
            window.onmousemove = this.mouseMoveHandleelse3;
        },
        mouseMoveHandleelse3(event) {
            this.pdyd1 = false;
            let moveLeft = event.pageX - 550 + 'px';
            let moveTop = event.pageY - 30 + 'px';
            this.$refs.kongtiao3.style.left = moveLeft;
            this.$refs.kongtiao3.style.top = moveTop;
        },
        mouseUpHandleelse4(event) {
            window.onmousemove = null;
            event.currentTarget.style.cursor = 'move';
        },
        mouseDownHandleelse4(event) {
            event.currentTarget.style.cursor = 'move';
            window.onmousemove = this.mouseMoveHandleelse4;
        },
        mouseMoveHandleelse4(event) {
            this.pdyd3 = false;
            let moveLeft = event.pageX - 450 + 'px';
            let moveTop = event.pageY - 30 + 'px';
            this.$refs.kongtiao4.style.left = moveLeft;
            this.$refs.kongtiao4.style.top = moveTop;
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
    },
    computed:{
        VpowerData() {
            return this.$store.state.btnPowerData;
        },
    },
    created(){
          this.a11 = Number(parseFloat(window.screen.width / 1920).toFixed(2));
        if (this.a11 < 1) {
            this.a11 = 0.74;
        }
    },
    mounted() {
         this.a11 = Number(parseFloat(window.screen.width / 1920).toFixed(2));
        if (this.a11 < 1) {
            this.a11 = 0.74;
        }
          setTimeout(() => {
            let a = this.a11 * 130 + 'px';
            $('.container').css({
                height: `calc(100% - ${a})`,
                marginTop:100*this.a11 + 'px'
            });
        });
        this.getLangData()
        this.getonedata();
                     this.jurisdiction = this.$store.state.btnPowerData
     this.buttonarr = this.findPathByLeafId(this.GetUrlParam('id'),this.jurisdiction)[0].Children
     console.log("buttom1",this.buttonarr)
               this.buttonarr.forEach((item)=>{
         if(item.RightName =="配方模板管理-新建模板"){
          this.xjmbid = item.RightID
         }else if(item.RightName == "配方模板管理-编辑模板"){
          this.bjmbid = item.RightID
         }else if(item.RightName == "配方模板管理-删除模板"){
          this.scmbid = item.RightID
         }else if(item.RightName == "配方管理-新建配方"){
          this.xjglid = item.RightID
         }else if(item.RightName == "配方管理-应用配方"){
          this.yypfid = item.RightID
         }else if(item.RightName == "配方管理-编辑配方"){
          this.bjpfid = item.RightID
         }else if(item.RightName == "配方管理-删除配方"){
          this.scpfid = item.RightID
         }else if(item.RightName == "配方管理-搜索配方"){
          this.sspfid = item.RightID
         }else if(item.RightName == "配方内容-导入"){
          this.drid = item.RightID
         }else if(item.RightName == "配方内容-导出"){
          this.dcid = item.RightID
         }else if(item.RightName == "配方内容-覆盖配方值"){
          this.fgid = item.RightID
         }else if(item.RightName == "配方内容-修改配方值"){
          this.xgid = item.RightID
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
                  url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.xjmbid}`,
              }).then(res => {
                  this.xjmbshow = res.data.data
              
              }).catch((err)=>{
                  console.log('err',err)
              })
              this.$axios({
                  method: 'post',
                  url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.bjmbid}`,
              }).then(res => {
                  this.bjmbshow = res.data.data
              
              }).catch((err)=>{
                  console.log('err',err)
              })
              this.$axios({
                  method: 'post',
                  url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.scmbid}`,
              }).then(res => {
                  this.scmbshow = res.data.data
              
              }).catch((err)=>{
                  console.log('err',err)
              })
              this.$axios({
                  method: 'post',
                  url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.xjglid}`,
              }).then(res => {
                  this.xjglshow = res.data.data
              
              }).catch((err)=>{
                  console.log('err',err)
              })
              this.$axios({
                  method: 'post',
                  url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.yypfid}`,
              }).then(res => {
                  this.yypfshow = res.data.data
              
              }).catch((err)=>{
                  console.log('err',err)
              })
              this.$axios({
                  method: 'post',
                  url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.bjpfid}`,
              }).then(res => {
                  this.bjpfshow = res.data.data
              
              }).catch((err)=>{
                  console.log('err',err)
              })
              this.$axios({
                  method: 'post',
                  url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.scpfid}`,
              }).then(res => {
                  this.scpfshow = res.data.data
              
              }).catch((err)=>{
                  console.log('err',err)
              })
              this.$axios({
                  method: 'post',
                  url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.sspfid}`,
              }).then(res => {
                  this.sspfshow = res.data.data
              
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
                  url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.fgid}`,
              }).then(res => {
                  this.fgshow = res.data.data
              
              }).catch((err)=>{
                  console.log('err',err)
              })
              this.$axios({
                  method: 'post',
                  url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.xgid}`,
              }).then(res => {
                  this.xgshow = res.data.data
              
              }).catch((err)=>{
                  console.log('err',err)
              })
        this.$refs.upload.addEventListener('change', e => {
            // this.readExcel(e);
        });
    }
};
</script>

<style lang="scss" scoped>
.file {
    position: relative;
    display: inline-block;
    background: #ffffff;
    border: 2px solid #386df0;
    border-radius: 4px;
    width: 120px;
    overflow: hidden;
    color: #386df0;
    position: relative;
    top: -10px;
    text-align: center;
    text-indent: 0;
    height: 40px;
    line-height: 40px;
    cursor: pointer;
    float: left;
    margin-top: 10px;
    text-decoration: none;
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
.container {
    top: 100px;
    height: calc(100% - 130px);
    background-color: #ececec;
    padding: 20px;
    width: 100%;
    .table {
        width: 100%;
        height: 100%;
        background-color: #fff;
        padding: 20px 10px 10px 10px;
        overflow: hidden;
        .firsthead {
            color: #386df0;
            font-size: 15px;
            font-weight: 600;
            border-left: 3px solid #386df0;
            padding-left: 5px;
        }
        .first {
            height: 100%;
            width: 22%;
            padding: 0 5px;
            float: left;
            td {
                background-color: #d4defb;
            }
        }
        .second {
            height: 100%;
            width: 42%;
            padding: 0 5px;
            float: left;
        }

        .third {
            height: 100%;
            width: 36%;
            padding: 0 5px;
            float: left;
        }
        .firsttable {
            margin-top: 20px;
            width: 100%;
            height: calc(100% - 40px);
            border: 1px solid #cccccc;
        }
        .up {
            width: 50px;
            float: left;
            height: 25px;
            background-color: #fff;
            border: 1px solid #cccccc;
            border-radius: 4px;
            position: relative;
            margin-left: 5px;
            img {
                position: absolute;
                top: 0;
                width: 20px;
                height: 20px;
                bottom: 0;
                left: 0;
                right: 0;
                margin: auto;
            }
        }
    }
}
.eltable {
    height: calc(100% - 76px);
    overflow: auto;
}
.firstselect {
    width: 100%;
    height: 56px;
    margin-bottom: 10px;
    overflow: hidden;
    background-color: #dddddd;
    .firstdel {
        height: 40px;
        cursor: pointer;
        line-height: 40px;
        width: 105px;
        margin: 8px 0px 0px 10px;
        border-radius: 4px;
        border: 2px solid #aaaaaa;
        background-color: #aaaaaa;
        color: #fff;
        font-weight: 600;
        float: left;
        text-align: center;
    }
    .firstadd {
        position: relative;
        cursor: pointer;
        height: 40px;
        line-height: 36px;
        // width: 110px;
        padding: 0 10px;
        border-radius: 4px;
        border: 2px solid #6eca3c;
        background-color: #fff;
        color: #6eca3c;
        font-weight: 600;
        float: left;
        margin-left: 10px;
        margin-top: 8px;
        text-align: center;
        img {
            position: absolute;
            width: 10px;
            left: 10px;
            top: 13px;
            height: 10px;
        }
    }
    .firstchange {
        margin-left: 10px;
        margin-top: 8px;
        height: 40px;
        line-height: 36px;
        // width: 110px;
        cursor: pointer;
        border-radius: 4px;
        border: 2px solid #fcae38;
        background-color: #fff;
        color: #fcae38;
        font-weight: 600;
        float: left;
        text-align: center;
    }
    .firstchange {
        // cursor: pointer;
        margin-left: 10px;
        margin-top: 8px;
        height: 40px;
        line-height: 36px;
        // width: 110px;
        padding: 0 10px;
        border-radius: 4px;
        border: 2px solid #fcae38;
        background-color: #fff;
        color: #fcae38;
        font-weight: 600;
        float: left;
        text-align: center;
    }
    .firstchange1 {
        cursor: pointer;
        margin-left: 10px;
        margin-top: 10px;
        height: 40px;
        line-height: 36px;
        // width: 110px;
        padding: 0 10px;
        padding: 0 20px;
        border-radius: 4px;
        border: 2px solid #fcae38;
        background-color: #fff;
        color: #fcae38;
        font-weight: 600;
        float: left;
        text-align: center;
    }
    .firstsoming {
        width: 140px;
    }
    .nosix {
        cursor: pointer;
        margin-left: 10px;
        margin-top: 8px;
        height: 40px;
        line-height: 40px;
        width: 150px;
        border-radius: 4px;
        border: 2px solid #4a79ee;
        background-color: #fff;
        color: #4a79ee;
        font-weight: 600;
        float: left;
        text-align: center;
    }
}
.firsttable {
    padding: 10px 10px 0px 10px;
}
.thirdselect {
    overflow: hidden;
    height: 110px;
    .important {
        width: 120px;
        float: left;
        height: 40px;
        background-color: #fff;
        text-align: center;
        line-height: 40px;
        color: #386df0;
        border-radius: 5px;
        cursor: pointer;
        margin: 10px;
        font-weight: bold;
        

        .outputlist_upload{
            height: 100%;
        }
    }
    .export {
        width: 120px;
        float: left;
        height: 40px;
        background-color: #fff;
        border: 2px solid #386df0;
        text-align: center;
        line-height: 40px;
        color: #386df0;
             font-weight: bold;
        border-radius: 5px;
        cursor: pointer;
        margin: 10px;
    }
    .firstchange {
        width: 120px;
        margin-right: 200px;
    }
    .formulaname {
        float: left;
        width: 100%;
        margin: 10px;
    }
}
.secondselect {
    height: 56px;
    .firstchange {
        margin-right: 20px;
    }
    .search {
        float: left;
        margin-top: 10px;
        margin-left: 10px;
        width: 120px;
        height: 36px;
        text-align: center;
        line-height: 36px;
        background-color: #386df0;
        border-radius: 5px;
        color: #fff;
        cursor: pointer;
    }

    .set {
        float: left;
        span {
            margin-left: 10px;
            margin-right: 5px;
        }
        select {
            margin-top: 10px;
            width: 200px;
            text-indent: 1em;
            height: 36px;
            line-height: 36px;
        }
        input {
            margin-top: 10px;
            width: 200px;
            text-indent: 1em;
            height: 36px;
            line-height: 36px;
        }
    }
}
.elcheck {
    width: 20px;
    height: 20px;
    border: 1px solid #386df0;
    border-radius: 5px;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
}
.onelook {
    z-index: 30999999;
    width: 900px;
    top: 110px;
    left: 400px;
    position: fixed;
    height: 800px;
    background-color: #eeeeee;
    box-shadow: 0px 0px 8px black;
    .thirld {
        float: right;
        // width: 120px;
        padding: 0 10px;
        color: #fff;
        margin-top: 15px;
        cursor: pointer;
        height: 35px;
        line-height: 35px;
        text-align: center;
        background-color: #386df0;
        border-radius: 5px;
    }
    .first {
        float: left;
        margin-left: 60px;
        width: 220px;

        font-size: 16px !important;

        input {
            text-indent: 1em;
            width: 220px;
            height: 45px;
            border: none;
            margin-top: 5px;
            border: 1px solid #ccc;
        }
    }
    .second {
        width: 760px;
        float: left;
        margin-left: 60px;
        margin-top: 20px;
        input {
            width: 760px;
            margin-top: 5px;
            text-indent: 1em;
            height: 45px;
            border: 1px solid #ccc;
        }
    }
    span {
        font-size: 20px;
    }
    .onelookhead {
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
    .onelooktop {
        width: 100%;
        height: 60px;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 11999999;
    }
    .onelookcontent {
        width: 100%;
        padding: 30px 40px 0px 40px;
        height: 260px;
        overflow: hidden;
    }
    .onelookcontent1 {
        width: 100%;
        padding: 0px 40px 0px 40px;
        height: 405px;
        overflow: auto;
        .linebox {
            // margin-bottom: 20px;
            padding-left: 10px;
            width: calc(100% - 60px);
            line-height: 20px;
            margin-left: 60px;
            height: 20px;
            position: relative;
            color: #386df0;
            border-left: 2px solid #386df0;
        }
        .line {
            position: relative;
            // width: calc(100% - 30px);
            height: 2px;
            // top: 0;
            // bottom: 0;
            // margin: auto;
            // right: 0;
            // background-color: #dddddd;

            .aa{
                width:100%;
                background-color: #dddddd;
                height:2px;

            }
        }
    }
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

        right: 180px;
        bottom: 20px;
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
    span {
        font-size: 16px;
    }
    .lookfor1 {
        display: inline-block;
        background-color: #ffffff;
        text-align: center;
        line-height: 30px;
        border: 1px solid #6086e6;
        border-radius: 4px;
        width: 100px;
        height: 30px;
        cursor: pointer;
        position: relative;
        top: 3px;
        color: #6086e6;
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
            bottom: 0;
            top: 0;
            position: absolute;
            margin: auto;
        }
    }
    .lookselect {
        width: 100%;
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
        padding: 30px 30px 0px 30px;
        width: 100%;

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

            right: 180px;
            bottom: 20px;
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
                margin-left: 190px;
            }
            span {
                font-size: 16px;
            }

            select {
                width: 130px;
                height: 30px;
                border: none;
                border: 1px solid #cccccc;
                margin-right: 18px;
            }
            padding-left: 23px;
            height: 50px;
            line-height: 45px;
            input {
                height: 30px;
                text-indent: 0.5em;
                width: 180px !important;
                margin-right: 10px;
                border: 1px solid #ccc;
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
    .table {
        width: 950px ;
        margin-left: 23px;
        height: 320px ;
        border: 1px solid #ccc;
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
.cover5 {
    // position: fixed;
    // top: 0;
    // left: 0;
    // width: 100%;
    // height: 100%;
    // z-index: 90;
    background-color: fuchsia;
}
.cover2 {
    width: 100%;
    height: 100%;
    z-index: 9999999;
    position: fixed;
    top: 0;
    left: 0;
}
.cover3 {
    width: 100%;
    height: 100%;
    z-index: 99999999;
    position: fixed;
    top: 0;
    left: 0;
}
img {
    width: 100%;
    cursor: pointer;
}
.onework {
    position: fixed;
    width: 500px;
    overflow: hidden;
    height: 252px;
    z-index: 10999999;
    box-shadow: 0px 0px 8px black;
    background-color: #eeeeee;
    top: 324px;
    left: 710px;
    .oneworkhead {
        background-color: #386df0;
        width: 100%;
        height: 50px;
        line-height: 50px;
        color: #fff;
        text-align: center;
        font-size: 18px;
        position: relative;
    }
    .oneworktop {
        position: absolute;
        width: 100%;
        height: 50px;
        z-index: 200;
    }
    .no {
        top: 0;
        position: absolute;
        z-index: 50999999;
        bottom: 0;
        cursor: pointer;
        margin: auto;
        height: 25px;
        width: 25px;
        right: 10px;
    }
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
        left: 210px;
        top: 170px;
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
        left: 320px;
        top: 170px;
    }
    img {
        width: 100%;
        height: 100%;
    }
    .oneworkname {
        position: absolute;
        top: 90px;
        left: 60px;

        input {
            width: 300px;
            height: 46px;
            border: none;
            border: 1px solid #cccccc;
            text-indent: 1em;
        }
        span {
            font-size: 14px;
            margin-right: 10px;
        }
    }
}
.tip {
    position: fixed;
    width: 380px;
    height: 200px;
    z-index: 1009999999;
    top: 350px;
    left: 750px;
    box-shadow: 0px 0px 8px black;
    background-color: #f3f3f4;

    .messhead{
        position:absolute;
        width: 100%;
        height: 58px;
    }

    .messtop{
        width: 100%;
        position: relative;
        text-align:center;
        line-height: 58px;
        height: 58px;
        background: #386df0;
        color: #fff;
        font-size: 18px;
        
        .no {
            top: 0;
            position: absolute;
            z-index: 50999999;
            bottom: 0;
            cursor: pointer;
            margin: auto;
            height: 25px;
            width: 25px;
            right: 10px;
        }
    }

    .precesstip{
        margin:60px 10% 4px;
        font-size:14px;
    }
    .processtrack{
        position:relative;
        margin:0 10%;
        width: 80%;
        height: 16px;
        border:1px solid #afafaf;
        border-radius: 8px;
        overflow:hidden;

        .process{
            background: #00c297;height:100%
        }
        .processtraj{
            position:absolute;
            left: 50%;
            top:-3px;
            font-size:12px;
            margin-left: -32px;
            color:#000;
        }
    }
    .process-error {
        font-size: 14px;
        margin: 10px 10% 0 10%;
        color: red;
    }
    .tipcontanin{
            display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    height: 110px;
    padding: 0 25px;
    text-align: center;
    padding: 0 40px;
    position: relative;
    span{
        width: 100%;
    }
    }
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
        margin-top: 40px;
        text-align: center;
    }
    .w {
        width: 100%;
        margin-top: 40px;
        text-align: center;
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
        // line-height: 30px;
        // margin-top: 40px;
        position: absolute;
        bottom: 18px;
        margin-left: 25px;
        height: 30px;
        .one {
            display: inline-block;
            height: 30px;
            width: 160px;
            cursor: pointer;
            text-align: center;
            background-color: #e0e0e0;
            color: #7e7e7e;
        }
        .two {
            display: inline-block;
            height: 30px;
            cursor: pointer;
            margin-left: 10px;
            width: 160px;
            background-color: #f3e3ad;
            text-align: center;
            color: #eeb764;
        }
    }
}
.page {
    .btn {
        cursor: pointer;
    }
    width: calc(100%);
    height: 50px;
    justify-content: center;
    color: #ababab;
    padding-left: 10px;
    font-size: 13px;
    overflow: hidden;
    display: flex;
    justify-content: space-between;
    align-items:center;
   justify-content:center;
    .nopage {
        border: 2px solid #fed286 !important;
        color: #fed286 !important;
    }
    .pageword {
        float: left;
        width: 45%;
    }
    .pageoperation {
   
        float: right;
        span {
            border: 2px solid #fda100;
            padding: 3px 8px;
            border-radius: 5px;
            background-color: #fff;
            // display: inline-block;
            color: #fda100;
            margin-left: 10px;
            font-size: 16px;
        }
        .inputnumber {
            display: inline-block;
            margin-left: 10px;
            input {
                width: 66px;
                height: 29px;
                // text-align: center;
                color: #fda100;

                border: 1px solid #fda100;
            }
        }
    }
}
.first1 {
    width: 760px !important;
    height: 350px !important;
    overflow: auto;
}
.pro {
    width: 200px;
    float: left;
    margin-right: 40px;
    span {
        font-size: 15px !important;
    }
}
.op {
    opacity: 0;
}
.red {
    color: red !important;
}
.ti {
    height: 29px;
    background: #fff !important;
}
.fcolor {
    color: #000 !important;
}
.colordiv {
    background-color: #d9dbde !important;
}
.colortip {
    background-color: #efeff0 !important;
}
.yd {
    margin: auto;
    top: 0 !important;
    right: 0 !important;
    bottom: 0 !important;
    left: 0 !important;
}
.yd1 {
    margin: auto;
    top: 1 !important;
    right: 0 !important;
    bottom: 0 !important;
    left: 0 !important;
}
img {
    cursor: pointer;
}
.cover11 {
    z-index: 999999;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}
input{
    text-indent: 1em;
}
.table{
    input{
        width: 100%;
    }
}
.processMess{
 width: 590px;
 height: 260px;
}
</style>