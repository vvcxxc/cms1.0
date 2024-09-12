<!--
 * @Description: 这是参数配置页面（组件）
 * @Date: 2019-11-28 10:59:10
 * @Author: Tao
 * @LastEditors: Tao
 * @LastEditTime: 2020-08-06 18:02:55
 -->
<template>
    <div class="container" :class="{blackBlueBg: $store.state.color === 'blackBlue'}">
        <div class="cover12" v-if="tipchange"></div>
        <div class="tip" ref="kongtiao8" :class="{blackBlueBg: $store.state.color === 'blackBlue'}" v-show="tipchange" :style="{zoom:a11}">
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
                <div class="tipword" v-if="deltrue">{{tipword}}</div>
                <div class="w" v-if="!deltrue">{{tipword}}</div>
                <div class="delclass" v-if="!deltrue">
                    <div class="one" @click="no1">{{lang.MessageBox_NO}}</div>
                    <div class="two" @click="yes1">{{lang.MessageBox_YES}}</div>
                </div>
                <div class="tipdetermine" @click="tip1" v-if="deltrue">{{lang.MessageBox_Confrim}}</div>
            </div>
        </div>
        <div class="table" :class="{colortip:$store.state.color=='grey'}">
            <div class="first">
                <div class="firsthead" :style="{ fontSize: 20 * a11 + 'px' }">{{lang.ProcessParameterConfigure_ProcessParameterConfigureUserControl_SectionManagement}}</div>
                <div class="firsttable">
                    <div class="firstselect" :style="{zoom:a11}">
                        <div class="firstadd" @click="addone">
                            <!-- <img :src="hao" alt /> -->
                            {{lang.ProcessParameterConfigure_ProcessParameterConfigureUserControl_NewSection}}
                        </div>
                        <div class="firstchange" @click="changeone">{{lang.ProcessParameterConfigure_ProcessParameterConfigureUserControl_Amendment}}</div>
                        <div class="firstdel" @click="onedel">{{lang.ProcessParameterConfigure_ProcessParameterConfigureUserControl_Delete}}</div>
                    </div>
                    <el-table
                        ref="multipleTable3"
                        :data="tableData"
                        stripe
                        border
                        :height="`calc(100% - `+(a11*76)+`px)`"
                        class="eltable"
                        :style="{ fontSize: a11 * 15 + 'px', width: a11 * 1690 + 'px',height:`calc(100% - `+(a11*76)+`px)`}"
                        @row-click="handleRowChange"
                        highlight-current-row
                        :row-style="{ height: 50 * a11 + 'px' }"
                        :header-cell-style="{
                            background:($store.state.color=='grey')?'#D9DBDE':($store.state.color==='blackBlue' ? '#18254E' : '#5a6c98'),
                            color:($store.state.color=='grey')?'#000':'#fff',
                            'border-left': $store.state.color==='blackBlue' ? '1px solid #304171' : '1px solid #cccccc',
                            height: 50 * a11 + 'px',
                            padding: '0'
                        }"
                    >
                        <template slot="empty">
                            <span>{{lang.SCMSConsoleWebApiMySql_NoData}}</span>
                        </template>
                        <el-table-column :label="lang.ProcessParameterConfigure_ProcessParameterConfigureUserControl_Operation" :width="100*a11" >
                            <template
                                slot-scope="scope"
                                :class="{tdone:tdone == oneworkduan}"
                                class="s"
                            >
                                <div class="img" @click.stop="onetop(scope.row)" :style="{zoom:a11}">
                                    <div class="up">
                                        <img :src="up" alt />
                                        {{scope.row.phone}}
                                    </div>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column
                            :label="lang.ProcessParameterConfigure_ProcessParameterConfigureUserControl_DataGrid_SerialNumber"
                            :width="lang.ProcessParameterConfigure_ProcessParameterConfigureUserControl_DataGrid_SerialNumber=='Serial number'?130*a11:100*a11"
                            prop="Number"
                            :class="{tdone:tdone == oneworkduan}"
                            class="s"
                            :show-overflow-tooltip="true"
                        ></el-table-column>

                        <el-table-column
                            prop="WorkName"
                            :label="lang.ProcessParameterConfigure_ProcessParameterConfigureUserControl_DataGrid_SectionName"
                            :class="{tdone:tdone == oneworkduan}"
                            :minWidth="lang.ProcessParameterConfigure_ProcessParameterConfigureUserControl_DataGrid_SectionName=='Process name'?130*a11:110*a11"
                            :show-overflow-tooltip="true"
                        ></el-table-column>
                    </el-table>
                </div>
            </div>
            <div class="second">
                <div class="firsthead" :style="{ fontSize: 20 * a11 + 'px' }">{{lang.ProcessParameterConfigure_ProcessParameterConfigureUserControl_ProcessManagement}}</div>
                <div class="firsttable">
                    <div class="firstselect" :style="{zoom:a11}">
                        <div class="firstadd" @click="addtwo">
                            <!-- <img :src="hao" alt /> -->{{lang.ProcessParameterConfigure_ProcessParameterConfigureUserControl_NewProcess}}
                        </div>
                        <div class="firstchange" @click="changetwo">{{lang.ProcessParameterConfigure_ProcessParameterConfigureUserControl_Amendment}}</div>
                        <div class="firstdel" @click="deltwo">{{lang.ProcessParameterConfigure_ProcessParameterConfigureUserControl_Delete}}</div>
                        <div class="nosix" @click="nosix">{{lang.ProcessParameterConfigure_ProcessParameterConfigureUserControl_FailureReasonConfig}}</div>
                    </div>
                    <el-table
                        ref="multipleTable1"
                        :data="tableData1"
                        stripe
                        class="eltable"
                           :height="`calc(100% - `+(a11*78)+`px)`"
                         :style="{ fontSize: a11 * 15 + 'px', width: a11 * 1690 + 'px',height:`calc(100% - `+(a11*78)+`px)` }"
                        highlight-current-row
                        @row-click="handleRowChange1"
                         :row-style="{ height: 50 * a11 + 'px' }"
                    :header-cell-style="{
                    background:($store.state.color=='grey')?'#D9DBDE':($store.state.color==='blackBlue' ? '#18254E' : '#5a6c98'),
                    color:($store.state.color=='grey')?'#000':'#fff',
                    'border-left': $store.state.color==='blackBlue' ? '1px solid #304171' : '1px solid #cccccc',
                    height: 50 * a11 + 'px',
                    padding: '0'
                }"
                    >
                        <template slot="empty">
                            <span>{{lang.SCMSConsoleWebApiMySql_NoData}}</span>
                        </template>
                        <el-table-column :label="lang.ProcessParameterConfigure_ProcessParameterConfigureUserControl_Operation" :width="100*a11" :show-overflow-tooltip="true">
                            <template slot-scope="scope">
                                <div class="img" @click.stop="twotop(scope.row)" :style="{zoom:a11}">
                                    <div class="up">
                                        <img :src="up" alt />
                                        {{scope.row.phone}}
                                    </div>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column :label="lang.ProcessParameterConfigure_ProcessParameterConfigureUserControl_DataGrid_SerialNumber" prop="Number" :width="lang.ProcessParameterConfigure_ProcessParameterConfigureUserControl_DataGrid_SerialNumber=='Serial number'?130*a11:100*a11" :show-overflow-tooltip="true"></el-table-column>

                        <el-table-column
                            prop="StepName"
                            :label="lang.ProcessParameterConfigure_ProcessParameterConfigureUserControl_DataGrid_ProcedureName"
                            :width="145*a11"
                           :show-overflow-tooltip="true"
                        ></el-table-column>
                        <el-table-column
                            prop="ProductIDTagName"
                            :label="lang.ProcessParameterConfigure_ProcessParameterConfigureUserControl_DataGrid_ProductID"
                             :width="145*a11"
                            :show-overflow-tooltip="true"
                        ></el-table-column>
                        <el-table-column
                            prop="FinishTagName1"
                            :label="lang.ProcessParameterConfigure_ProcessParameterConfigureUserControl_DataGrid_CompletionSignal"
                             :width="160*a11"
                           :show-overflow-tooltip="true"
                        ></el-table-column>
                        <el-table-column
                            prop="FinishType"
                            :label="lang.ProcessParameterConfigure_ProcessParameterConfigureUserControl_DataGrid_WhetherItIsRelated"
                             :width="165*a11"
                            :show-overflow-tooltip="true"
                        >
                            <template slot-scope="scope">
                                <span v-if="scope.row.FinishType == 1">{{lang.ProcessParameterConfigure_HT_ProcessParameterConfigureUserControlViewModel_No}}</span>
                                <span v-else>{{lang.ProcessParameterConfigure_HT_ProcessParameterConfigureUserControlViewModel_Yes}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column :label="lang.ProcessParameterConfigure_ProcessParameterConfigureUserControl_DataGrid_AssociatedSignal"  :width="300*a11" :show-overflow-tooltip="true">
                            <template slot-scope="scope">
                                <span v-if="scope.row.FinishType == 2">{{scope.row.FinishTagName2}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column :label="lang.ProcessParameterConfigure_ProcessParameterConfigureUserControl_DataGrid_QualifiedSignal"  :width="300*a11" :show-overflow-tooltip="true">
                            <template slot-scope="scope">
                                <span
                                    v-if="scope.row.QualitiedType == 3"
                                >{{scope.row.IsQualitiedTagName}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="QualitiedType"
                            :label="lang.ProcessParameterConfigure_ProcessParameterConfigureUserControl_DataGrid_IsItAbsolutely"
                             :width="300*a11"
                            :show-overflow-tooltip="true"
                        >
                            <template slot-scope="scope">
                                <span v-if="scope.row.QualitiedType == 1">{{lang.ProcessParameterConfigure_HT_ProcessParameterConfigureUserControlViewModel_AbsolutelyQualified}}</span>
                                <span v-else-if="scope.row.QualitiedType == 2">{{lang.ProcessParameterConfigure_HT_ProcessParameterConfigureUserControlViewModel_AbsolutelyUnqualified}}</span>
                                <span v-else-if="scope.row.QualitiedType == 3">{{lang.ProcessParameterConfigure_HT_ProcessParameterConfigureUserControlViewModel_No}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="address"
                            :label="lang.ProcessParameterConfigure_ProcessParameterConfigureUserControl_DataGrid_WhetherConfigFailReason"
                             :width="320*a11"
                            :show-overflow-tooltip="true"
                        >
                            <template slot-scope="scope">
                                <span v-if="scope.row.ReasonType == 1">{{lang.ProcessParameterConfigure_HT_ProcessParameterConfigureUserControlViewModel_Int}}</span>
                                <span v-else-if="scope.row.ReasonType == 2">{{lang.ProcessParameterConfigure_HT_ProcessParameterConfigureUserControlViewModel_Bool}}</span>
                                <span
                                    v-else-if="scope.row.ReasonType == 0"
                                >{{lang.ProcessParameterConfigure_HT_ProcessParameterConfigureUserControlViewModel_No}}</span>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </div>
            <div class="third">
                <div class="firsthead" :style="{ fontSize: 20 * a11 + 'px' }">{{lang.ProcessParameterConfigure_ProcessParameterConfigureUserControl_ProjectManagement}}</div>
                <div class="firsttable">
                    <div class="firstselect" :style="{zoom:a11}">
                        <div class="firstadd firstsoming" @click="addsomepro">
                            <!-- <img :src="hao" alt /> -->{{lang.ProcessParameterConfigure_ProcessParameterConfigureUserControl_NewBatchProjects}}
                        </div>
                        <div class="firstchange" @click="changeproject">{{lang.ProcessParameterConfigure_ProcessParameterConfigureUserControl_Amendment}}</div>
                        <div class="firstdel" @click="delthree">{{lang.ProcessParameterConfigure_ProcessParameterConfigureUserControl_Delete}}</div>
                    </div>
                    <el-table
                        ref="multipleTable2"
                        :data="tableData2"
                        stripe
                          :row-style="{ height: 50 * a11 + 'px' }"
                        class="eltable"
                      :height="`calc(100% - `+(a11*80)+`px)`"
                       :style="{
                                fontSize: a11 * 15 + 'px',
                                width: 1658*1658+'px',
                                height:`calc(100% - `+(a11*80)+`px)`
                            }"
                        highlight-current-row
                        @row-click="handleRowChange2"
                        :header-cell-style="{   
                        background:($store.state.color=='grey')?'#D9DBDE':($store.state.color==='blackBlue' ? '#18254E' : '#5a6c98'),
                        color:($store.state.color=='grey')?'#000':'#fff',
                        'border-left': $store.state.color==='blackBlue' ? '1px solid #304171' : '1px solid #cccccc',
                    height: 50 * a11 + 'px',
                    padding: '0'
                }"
                    >
                        <template slot="empty">
                            <span>{{lang.SCMSConsoleWebApiMySql_NoData}}</span>
                        </template>
                        <el-table-column prop="name" :label="lang.ProcessParameterConfigure_ProcessParameterConfigureUserControl_Operation" :width="100*a11" :show-overflow-tooltip="true">
                            <template slot-scope="scope">
                                <div class="img" @click.stop="threetop(scope.row)" :style="{zoom:a11}">
                                    <div class="up" >
                                        <img :src="up" alt />
                                        {{scope.row.phone}}
                                    </div>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column :label="lang.ProcessParameterConfigure_ProcessParameterConfigureUserControl_DataGrid_SerialNumber" prop="Number" :width="120*a11" :show-overflow-tooltip="true"></el-table-column>

                        <el-table-column
                            prop="ProjectName"
                            :label="lang.ProcessParameterConfigure_ProcessParameterConfigureUserControl_DataGrid_ProjectName"
                            :width="190*a11"
                            :show-overflow-tooltip="true"
                        ></el-table-column>
                        <el-table-column prop="Upper" :label="lang.ProcessParameterConfigure_ProcessParameterConfigureUserControl_DataGrid_Upper" :width="110*a11" :show-overflow-tooltip="true"></el-table-column>
                        <el-table-column prop="Lower" :label="lang.ProcessParameterConfigure_ProcessParameterConfigureUserControl_DataGrid_Lower" :width="110*a11" :show-overflow-tooltip="true"></el-table-column>
                        <el-table-column prop="Unit" :label="lang.ProcessParameterConfigure_ProcessParameterConfigureUserControl_DataGrid_Unit" :width="145*a11" :show-overflow-tooltip="true"></el-table-column>
                        <el-table-column
                            prop="Digit"
                            :label="lang.ProcessParameterConfigure_ProcessParameterConfigureUserControl_DataGrid_Digit"
                           :width="300*a11"
                            :show-overflow-tooltip="true"
                        ></el-table-column>
                        <el-table-column
                            prop="ProjectValueTagName"
                            :label="lang.ProcessParameterConfigure_ProcessParameterConfigureUserControl_DataGrid_ProjectVariableName"
                           :width="300*a11"
                            :show-overflow-tooltip="true"
                        ></el-table-column>
                    </el-table>
                </div>
            </div>
        </div>
        <div class="onework" v-show="onework">
            <div class="oneworkhead" :class="{colordiv:$store.state.color=='grey'}">
                <div
                    class="oneworktop"
                ></div>
                <span v-if="onechange == 1" :class="{fcolor:$store.state.color=='grey'}">{{lang.ProcessParameterConfigure_HT_WorkSectionSetting1ViewModel_ModifySection}}</span>
                <span v-if="onechange == 2" :class="{fcolor:$store.state.color=='grey'}">{{lang.ProcessParameterConfigure_HT_WorkSectionSetting1ViewModel_NewSection}}</span>
                <img :src="no2" alt class="no" @click="cancel" v-if="$store.state.color=='grey'" />
                <img :src="no" alt class="no" @click="cancel" v-else />
            </div>
            <div class="oneworkname">
                <span>{{lang.ProcessParameterConfigure_ProcessParameterConfigureUserControl_DataGrid_SectionName}}</span>
                <input type="text" v-model="oneObj" />
            </div>
            <div class="cancel" @click="cancel">{{lang.PopupCommon_Cancel}}</div>
            <div class="pre" @click="onepre">{{lang.PopupCommon_Save}}</div>
        </div>
        <div class="twowork" v-show="twowork" ref="kongtiao2" >
            <div class="oneworkhead" :class="{colordiv:$store.state.color=='grey'}">
                <div
                    class="twoworktop"
                ></div>
                <span v-if="onechange == 1" :class="{fcolor:$store.state.color=='grey'}">{{lang.ProcessParameterConfigure_HT_WorkStepSetting1ViewModel_ModifyingProcess}}</span>
                <span v-if="onechange == 2" :class="{fcolor:$store.state.color=='grey'}">{{lang.ProcessParameterConfigure_HT_WorkStepSetting1ViewModel_NewProcess}}</span>
                <img :src="no2" alt class="no" @click="cancel" v-if="$store.state.color=='grey'" />
                <img :src="no" alt class="no" @click="cancel" v-else />
            </div>
            <div class="twoworkcontent">
                <div class="inp">
                    <span>{{lang.ProcessParameterConfigure_WorkStepSetting1_ProcedureName}}</span>
                    <input type="text" v-model="twoObj.OriginalStepName" />
                </div>
                <div class="inp inp1">
                    <span>{{lang.ProcessParameterConfigure_WorkStepSetting1_ProductID}}</span>
                    <input type="text" disabled v-model="twoObj.ProductID" :placeholder="lang.ProcessParameterConfigure_HT_WorkStepSetting1ViewModel_Null" />
                    <span class="select" @click="look2">{{lang.ProcessParameterConfigure_WorkStepSetting1_Choice}}</span>
                </div>
                <div class="inp2">
                    <el-checkbox v-model="aaa" @change="sc">{{lang.ProcessParameterConfigure_WorkStepSetting1_AutomaticGenerated}}</el-checkbox>
                </div>
                <div class="inp inp1">
                    <span class="spanlf">{{lang.ProcessParameterConfigure_WorkStepSetting1_CompletionSignal}}</span>
                    <input type="text" disabled v-model="twoObj.FinishTag1" />
                    <span class="select" @click="look3">{{lang.ProcessParameterConfigure_WorkStepSetting1_Choice}}</span>
                </div>
                <div class="inp3">
                    <el-checkbox style="display:block" v-model="bbb" @change="gl">{{lang.ProcessParameterConfigure_WorkStepSetting1_WhetherRelated}}</el-checkbox>
                    <input style="width:331px !important;margin-left:81px;margin-top:10px" type="text" :placeholder="lang.ProcessParameterConfigure_HT_WorkStepSetting1ViewModel_Null" name id class="txt" disabled v-model="twoObj.FinishTag2"/>
                    <span style="margin-top:10px;" class="txtselect" @click="look1" :class="{newtxtselect:twoObj.IsRelated}">{{lang.ProcessParameterConfigure_WorkStepSetting1_Choice}}</span>
                </div>
                <div class="inp inp1">
                    <span class="spanlf">{{lang.ProcessParameterConfigure_WorkStepSetting1_QualifiedSignal}}</span>
                    <input type="text" disabled v-model="twoObj.IsQualitiedTagName" :placeholder="lang.ProcessParameterConfigure_HT_WorkStepSetting1ViewModel_Null" />
                    <span class="select" @click="look">{{lang.ProcessParameterConfigure_WorkStepSetting1_Choice}}</span>
                </div>
                <div class="inp3">
                    <el-checkbox v-model="ccc" @change="jd">{{lang.ProcessParameterConfigure_HT_WorkStepSetting1ViewModel_AbsolutelyQualified}}</el-checkbox>
                    <!-- <select name id class="txt" :disabled="!ccc" v-model="twoworkdata.AbsoQualTag">
                        <option v-for="(item,index) in pd" :value="item" :key="index">{{item}}</option>
                    </select> -->
                </div>
                <div class="cancel" @click="cancel">{{lang.PopupCommon_Cancel}}</div>
                <div class="pre" @click="gxpre">{{lang.PopupCommon_Save}}</div>
            </div>
        </div>
        <div class="look" v-show="lookchange" :style="{width:1120*a11+'px',height:600*a11+'px'}">
            <div
                class="looktop"
                :style="{height:60*a11+'px'}"
            ></div>
            <div
                class="lookhead"
                 :style="{height:60*a11+'px',fontSize:18*a11+'px',lineHeight:60*a11+'px'}"
                :class="[{colordiv:$store.state.color=='grey'},{fcolor:$store.state.color=='grey'}]"
            >
                {{lang.ProcessParameterConfigure_SelectVariable_SelectionVariables}}
                <img
                    :src="no2"
                    alt
                    class="no"
                    @click="cancel1"
                    v-if="$store.state.color=='grey'"
                     :style="{height:24*a11+'px',width:24*a11+'px'}"
                />
                <img  :style="{height:24*a11+'px',width:24*a11+'px'}" :src="no" alt class="no" @click="cancel1" v-else />
            </div>
            <div class="lookcontent" :style="{paddingTop:30*a11+'px'}">
                <div class="lookselect" :style="{width:1000*a11+'px',height:436*a11+'px'}">
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
                    <div class="table" :style="{height:320*a11+'px'}">
                        <el-table
                            :data="projectlistdata"
                            height="100%"
                            border
                            @row-click="handleRowChange5"
                            style="width: 100%"
                            highlight-current-row
                         :style="{ fontSize: a11 * 15 + 'px', width: '100%' }"
                 :row-style="{ height: 50 * a11 + 'px' }"
                 :header-cell-style="{
                    background:($store.state.color=='grey')?'#D9DBDE':($store.state.color==='blackBlue' ? '#344C8F' : '#5a6c98'),
                    color:($store.state.color=='grey')?'#000':'#fff',
                    'border-left': $store.state.color==='blackBlue' ? '1px solid #8B98B8' : '1px solid #cccccc',
                    height: 50 * a11 + 'px',
                    padding: '0'
                }"
                        >
                            <template slot="empty">
                                <span>{{lang.SCMSConsoleWebApiMySql_NoData}}</span>
                            </template>
                            <el-table-column prop="Device" :label="lang.FormulaManage_AddProject_DataGrid_DeviceName" :width="180*a11" :show-overflow-tooltip="true"></el-table-column>
                            <el-table-column prop="DateType" :label="lang.FormulaManage_AddProject_DataGrid_VariableType" :width="180*a11" :show-overflow-tooltip="true"></el-table-column>
                            <el-table-column prop="Name" :label="lang.FormulaManage_AddProject_DataGrid_Name" :width="180*a11" :show-overflow-tooltip="true"></el-table-column>
                            <el-table-column prop="Descript" :label="lang.FormulaManage_AddProject_DataGrid_Describe" :width="180*a11" :show-overflow-tooltip="true"></el-table-column>
                            <el-table-column prop="Address" :label="lang.FormulaManage_AddProject_DataGrid_VariableAddress" :width="280*a11" :show-overflow-tooltip="true"></el-table-column>
                        </el-table>
                    </div>

                    <!-- <div class="page"> -->
                    <div class="page" :style="{zoom:a11}">
                        <div class="pageword" style="text-align:left" >
                            {{lang.DataGrid_Reaction_HT_ATotalOf}}
                            <span>{{pageDate.TotalCount}}</span>{{lang.DataGrid_Reaction_HT_RecordsAndTheCurrent}}
                            <span>{{pageDate.PageIndex}}</span>{{lang.DataGrid_Reaction_HT_Page}}
                            <span>{{pageDate.TotalPage}}</span>{{lang.DataGrid_Reaction_HT_RecordsAnd}}
                            <span>{{pageDate.PageSize}}</span>{{lang.DataGrid_Reaction_HT_PerPage}}
                        </div>
                        <div class="pageoperation">
                            <span class="btn" @click="start">{{lang.DataGrid_Reaction_FirstPage}}</span>
                            <span
                                class="btn"
                                :class="{nopage:!pageDate.LastEnabled}"
                                @click="abck"
                            >{{lang.DataGrid_Reaction_LastPage}}</span>
                            <span
                                class="btn"
                                :class="{nopage:!pageDate.NextEnabled}"
                                @click="next"
                            >{{lang.DataGrid_Reaction_NextPage}}</span>
                            <span class="btn" @click="end">{{lang.DataGrid_Reaction_EndPage}}</span>
                            <div class="inputnumber">
                                {{lang.DataGrid_Reaction_The}}
                                <input type="text" v-model="nowpage" /> {{lang.DataGrid_Reaction_Page}}
                            </div>

                            <span class="btn" @click="jump">{{lang.DataGrid_Reaction_TurnPage}}</span>
                        </div>
                        <!-- </div> -->
                    </div>
                </div>
                <div class="cancel" @click="cancel1" :style={zoom:a11}>{{lang.PopupCommon_Cancel}}</div>
                <div class="pre" @click="blpre"  :style={zoom:a11}>{{lang.PopupCommon_Save}}</div>
            </div>
        </div>
        <div class="Unqualified" ref="kongtiao4" v-show="unsixth" :style="{zoom:a11}">
            <div class="Unqualifiedhead" :class="{colordiv:$store.state.color=='grey'}">
                <div
                    class="Unqualifiedtop"
               
                ></div>
                <span :class="{fcolor:$store.state.color=='grey'}">{{lang.ProcessParameterConfigure_ProcessParameterConfigureUserControl_FailureReasonConfig}}</span>
                <img :src="no2" alt class="no" @click="cancel" v-if="$store.state.color=='grey'" />
                <img :src="no" alt class="no" @click="cancel" v-else />
            </div>
            <div class="Unqualifiedcontent">
                <div class="Unqualifiedsetinon">
                    <el-radio v-model="radio" label="1" @change="int">{{lang.ProcessParameterConfigure_UnQualitiedReason_Integer}}</el-radio>
                    <el-radio v-model="radio" label="2" @change="bluer">{{lang.ProcessParameterConfigure_UnQualitiedReason_Boolean}}</el-radio>
                    <div class="add btn" @click="addnewblue">{{lang.ProcessParameterConfigure_UnQualitiedReason_New}}</div>
                    <div class="change btn" @click="changenewblue">{{lang.ProcessParameterConfigure_UnQualitiedReason_Modify}}</div>
                    <div class="del btn" @click="delnewblue">{{lang.ProcessParameterConfigure_UnQualitiedReason_Delete}}</div>
                    <div class="unsix" v-if="radio == 1">
                        {{lang.ProcessParameterConfigure_UnQualitiedReason_IntegerVariable}}
                        <input type="text" disabled v-if="sixData" v-model="sbint" />
                        <span class="select" @click="look6">{{lang.ProcessParameterConfigure_UnQualitiedReason_Select}}</span>
                    </div>
                    <div :class="[{table1:radio == '2'},{table2:radio == '1'}]">
                        <el-table
                            ref="multipleTable"
                            :data="sixData"
                            stripe
                            border
                            class="eltable"
                            height="100%"
                            width="100%"
                            @row-click="mewant"
                            highlight-current-row
                            :header-cell-style="{
                                background:($store.state.color=='grey')?'#D9DBDE':($store.state.color==='blackBlue' ? '#344C8F' : '#5a6c98'),
                                color:($store.state.color=='grey')?'#000':'#fff',
                                'border-left': $store.state.color==='blackBlue' ? '1px solid #8B98B8' : '1px solid #cccccc',
                                height:'50px',
                                padding:'0'
                            }"
                            
                        >
                            <template slot="empty">
                                <span>{{lang.SCMSConsoleWebApiMySql_NoData}}</span>
                            </template>
                            <el-table-column :label="lang.ProcessParameterConfigure_UnQualitiedReason_SerialNumber" prop="Number" width="100" :show-overflow-tooltip="true"></el-table-column>

                            <el-table-column
                                prop="Value"
                                :label="lang.ProcessParameterConfigure_UnQualitiedReason_IdentificationValue"
                                width="100"
                                key="1"
                                v-if="radio == '1'"
                                :show-overflow-tooltip="true"
                            ></el-table-column>
                            <el-table-column
                                prop="Reason"
                                :label="lang.ProcessParameterConfigure_UnQualitiedReason_ReasonDescription"
                                key="2"
                                v-if="radio == '1'"
                                width="436"
                                :show-overflow-tooltip="true"
                            >
                                <template slot-scope="scope">{{ scope.row.Reason }}</template>
                            </el-table-column>
                            <el-table-column
                                prop="TagName"
                                :label="lang.ProcessParameterConfigure_UnQualitiedReason_BooleanVariable"
                                width="218"
                                key="3"
                                v-if="radio == '2'"
                               :show-overflow-tooltip="true"
                            ></el-table-column>
                            <el-table-column
                                prop="Upper"
                                :label="lang.ProcessParameterConfigure_UnQualitiedReason_AutomaticReset"
                                width="100"
                                key="4"
                                v-if="radio == '2'"
                                :show-overflow-tooltip="true"
                            >
                                <template slot-scope="scope">
                                    <span v-if="scope.row.IsReset">{{lang.ProcessParameterConfigure_HT_ProcessParameterConfigureUserControlViewModel_Yes}}</span>
                                    <span v-if="!scope.row.IsReset">{{lang.ProcessParameterConfigure_HT_ProcessParameterConfigureUserControlViewModel_No}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="Reason"
                                :label="lang.ProcessParameterConfigure_UnQualitiedReasonBool_ReasonDescription"
                                v-if="radio == '2'"
                                key="5"
                                width="218"
                                :show-overflow-tooltip="true"
                            ></el-table-column>
                        </el-table>
                    </div>
                </div>
                <div class="cancel" @click="cancel">{{lang.PopupCommon_Cancel}}</div>
                <div class="pre" @click="gaipre">{{lang.PopupCommon_Save}}</div>
            </div>
        </div>
        <div class="newblue" ref="kongtiao5" v-show="newblue" :style="{zoom:a11}">
            <div class="newbluehead" :class="{colordiv:$store.state.color=='grey'}">
                <div
                    class="newbluetop"
                
                ></div>
                <span v-if="radio == 1" :class="{fcolor:$store.state.color=='grey'}">{{oneword}}</span>
                <span v-if="radio == 2" :class="{fcolor:$store.state.color=='grey'}">{{twoword}}</span>
                <img :src="no2" alt class="no" @click="cancel5" v-if="$store.state.color=='grey'" />
                <img :src="no" alt class="no" @click="cancel5" v-else />
            </div>
            <div class="newbluecontent">
                <div class="newbluesetion" v-if="radio == 1">
                    <div class="top">
                        <span>{{lang.ProcessParameterConfigure_UnQualitiedReason_IdentificationValue}}</span>
                        <input type="text" v-model="sbvalue" />
                    </div>
                    <div class="top">
                        <span class="spword">{{lang.ProcessParameterConfigure_UnQualitiedReason_ReasonDescription}}</span>
                        <textarea name id v-model="sbreason"></textarea>
                    </div>
                    <div class="cancel" @click="cancel5">{{lang.PopupCommon_Cancel}}</div>
                    <div class="pre" @click="addnewbluepre">{{lang.PopupCommon_Save}}</div>
                </div>
                <div class="newbluesetion" v-if="radio == 2">
                    <div class="top">
                        <span>{{lang.ProcessParameterConfigure_UnQualitiedReason_BooleanVariable}}</span>
                        <input type="text" v-model="sbblue" disabled style="width:280px" />
                        <span class="bluerspan" @click="look5">{{lang.ProcessParameterConfigure_UnQualitiedReason_Select}}</span>
                    </div>
                    <div class="bluer">
                        <el-checkbox v-model="ddd" >{{lang.ProcessParameterConfigure_UnQualitiedReasonBool_WhetherResetAutomatically}}</el-checkbox>
                    </div>

                    <div class="top">
                        <span class="spword spword1">{{lang.ProcessParameterConfigure_UnQualitiedReasonBool_ReasonDescription}}</span>
                        <textarea name id v-model="sbreason" class="textar1"></textarea>
                    </div>
                    <div class="cancel" @click="cancel51">{{lang.PopupCommon_Cancel}}</div>
                    <div class="pre" @click="addnewbluepre1">{{lang.PopupCommon_Save}}</div>
                </div>
            </div>
        </div>
        <div class="changpro" ref="kongtiao6" v-show="projectchange" :style="{zoom:a11}">
            <div class="changehead">
                <div
                    class="changetop"
                ></div>
                <span>{{lang.ProcessParameterConfigure_ModifyWorkProject1_ModificationItem}}</span>
                <img :src="no2" alt class="no" @click="cancel" v-if="$store.state.color=='grey'" />
                <img :src="no" alt class="no" @click="cancel" v-else />
            </div>
            <div class="changecontent">
                <div class="changestion">
                    <span>{{lang.ProcessParameterConfigure_ProcessParameterConfigureUserControl_DataGrid_ProjectName}}</span>
                    <input type="text" v-model="threeObj.OriginalProjectName" />
                </div>
                <div class="changestion inp">
                    <span>{{lang.ProcessParameterConfigure_ProcessParameterConfigureUserControl_DataGrid_ProjectVariableName}}</span>
                    <input type="text" disabled v-model="threeObj.ProjectValueTagName" />
                    <span class="select" @click="look4">{{lang.ProcessParameterConfigure_WorkStepSetting1_Choice}}</span>
                </div>
                <div class="changestion">
                    <span>{{lang.ProcessParameterConfigure_ProcessParameterConfigureUserControl_DataGrid_Upper}}</span>
                    <input type="text" v-model="threeObj.Upper" />
                </div>
                <div class="changestion">
                    <span>{{lang.ProcessParameterConfigure_ProcessParameterConfigureUserControl_DataGrid_Lower}}</span>
                    <input type="text" v-model="threeObj.Lower" />
                </div>
                <div class="changestion">
                    <span>{{lang.ProcessParameterConfigure_ProcessParameterConfigureUserControl_DataGrid_Unit}}</span>
                    <input type="text" v-model="threeObj.Unit" />
                </div>
                <div class="changestion">
                    <span>{{lang.ProcessParameterConfigure_ProcessParameterConfigureUserControl_DataGrid_Digit}}</span>
                    <input type="text" v-model="threeObj.Digit" />
                </div>
                <div class="cancel" @click="cancel">{{lang.PopupCommon_Cancel}}</div>
                <div class="pre" @click="changethree">{{lang.PopupCommon_Save}}</div>
            </div>
        </div>
        <div class="addsomepro" ref="kongtiao7" v-show="someprochange" :style="{width:1310*a11+'px',height:850*a11+'px'}">
            <div class="addsomeprohead" :style="{height:a11*60+'px',lineHeight:a11*60+'px'}">
                <div
                    class="addsomeprotop"
                 :style="{height:a11*60+'px'}"
                ></div>
                <span :style="{fontSize:a11*18+'px'}">{{lang.ProcessParameterConfigure_AddWorkProject1_NewBatchProjects}}</span>
                <img :style="{width:a11*24+'px',height:a11*24+'px'}" :src="no2" alt class="no" @click="cancel" v-if="$store.state.color=='grey'" />
                <img :style="{width:a11*24+'px',height:a11*24+'px'}" :src="no" alt class="no" @click="cancel" v-else />
                <div class="lookselect" :style="{height:((820-(50*a11)))*a11+'px'}">
                    <div class="onecentent" :style="{height:350*a11+'px'}">
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
                        <div class="table tablecsbbone" :style="{height:250*a11+'px'}">
                            <el-table
                                :data="projectlistdata"
                                height="100%"
                                border
                                ref="multipleTable"
                                @select="select"
                                highlight-current-row
                                @select-all="selectall"
                                :style="{ fontSize: a11 * 15 + 'px', width: '100%' }"
                 :row-style="{ height: 50 * a11 + 'px' }"
                 :header-cell-style="{
                    background:($store.state.color=='grey')?'#D9DBDE':($store.state.color==='blackBlue' ? '#344C8F' : '#5a6c98'),
                    color:($store.state.color=='grey')?'#000':'#fff',
                    'border-left': $store.state.color==='blackBlue' ? '1px solid #8B98B8' : '1px solid #cccccc',
                    height: 50 * a11 + 'px',
                    padding: '0'
                }"
                            >
                                <template slot="empty">
                                    <span>{{lang.SCMSConsoleWebApiMySql_NoData}}</span>
                                </template>
                                <el-table-column type="selection" :width="a11>1?60*a11:60"></el-table-column>
                                <el-table-column prop="Device" :label="lang.FormulaManage_AddProject_DataGrid_DeviceName" :width="180*a11" :show-overflow-tooltip="true"></el-table-column>
                                <el-table-column prop="DateType" :label="lang.FormulaManage_AddProject_DataGrid_VariableType" :width="180*a11" :show-overflow-tooltip="true"></el-table-column>
                                <el-table-column prop="Name" :label="lang.FormulaManage_AddProject_DataGrid_Name" :width="180*a11" :show-overflow-tooltip="true"></el-table-column>
                                <el-table-column prop="Descript" :label="lang.FormulaManage_AddProject_DataGrid_Describe" :width="180*a11" :show-overflow-tooltip="true"></el-table-column>
                                <el-table-column prop="Address" :label="lang.FormulaManage_AddProject_DataGrid_VariableAddress" :show-overflow-tooltip="true"></el-table-column>
                            </el-table>
                        </div>
                        <!-- <div class="page1"> -->

                        <div class="page cp" :style="{height:64*a11+'px'}">
                            <div class="pageword" style="text-align:left" :style="{zoom:(a11-0.2)}">
                                {{lang.DataGrid_Reaction_HT_ATotalOf}}
                                <span>{{pageDate.TotalCount}}</span>{{lang.DataGrid_Reaction_HT_RecordsAndTheCurrent}}
                                <span>{{pageDate.PageIndex}}</span>{{lang.DataGrid_Reaction_HT_Page}}
                                <span>{{pageDate.TotalPage}}</span>{{lang.DataGrid_Reaction_HT_RecordsAnd}}
                                <span>{{pageDate.PageSize}}</span>{{lang.DataGrid_Reaction_HT_PerPage}}
                            </div>
                            <div class="pageoperation" :style="{zoom:(a11-0.2)}">
                                <span class="btn" @click="start">{{lang.DataGrid_Reaction_FirstPage}}</span>
                                <span
                                    class="btn"
                                    :class="{nopage:pageData.LastEnabled}"
                                    @click="abck"
                                >{{lang.DataGrid_Reaction_LastPage}}</span>
                                <span
                                    class="btn"
                                    :class="{nopage:pageData.NextEnabled}"
                                    @click="next"
                                >{{lang.DataGrid_Reaction_NextPage}}</span>
                                <span class="btn" @click="end">{{lang.DataGrid_Reaction_EndPage}}</span>
                                <div class="inputnumber">
                                    {{lang.DataGrid_Reaction_The}}
                                    <input type="text" v-model="nowpage" /> {{lang.DataGrid_Reaction_Page}}
                                </div>

                                <span class="btn" @click="jump">{{lang.DataGrid_Reaction_TurnPage}}</span>
                                <!-- </div> -->
                            </div>
                        </div>
                    </div>
                    <div class="btn tran-part" :style="{zoom:a11}">
                        <div class="add" @click="addwantproject">{{lang.ProcessParameterConfigure_AddWorkProject1_Add}}</div>
                        <div class="remove" @click="removeproject">{{lang.ProcessParameterConfigure_AddWorkProject1_Remove}}</div>
                    </div>
                    <div class="twocontent" :style="{height:a11*300+'px'}">
                        <div class="selectword" :style="{zoom:a11}">{{lang.ProcessParameterConfigure_AddWorkProject1_SelectedItems}}</div>
                        <div class="table table1 tablecsbbtwo" :style="{height:250*a11+'px'}">
                            <el-table
                                :data="projectlistdata1"
                                height="100%"
                                border
                                highlight-current-row
                                @select="select1"
                                @select-all="selectall1"
                                style="width: 100%"
                                 :style="{ fontSize: a11 * 15 + 'px', width: '100%' }"
                 :row-style="{ height: 50 * a11 + 'px' }"
                 :header-cell-style="{
                    background:($store.state.color=='grey')?'#D9DBDE':($store.state.color==='blackBlue' ? '#344C8F' : '#5a6c98'),
                    color:($store.state.color=='grey')?'#000':'#fff',
                    'border-left': $store.state.color==='blackBlue' ? '1px solid #8B98B8' : '1px solid #cccccc',
                    height: 50 * a11 + 'px',
                    padding: '0'
                }"
                            >
                                <template slot="empty">
                                    <span>{{lang.SCMSConsoleWebApiMySql_NoData}}</span>
                                </template>
                                <el-table-column type="selection" :width="a11>1?60*a11:60" :show-overflow-tooltip="true"></el-table-column>
                                <el-table-column prop="ProjectName" :label="lang.ProcessParameterConfigure_AddWorkProject1_DataGrid_ProjectName" :show-overflow-tooltip="true">
                                    <template slot-scope="scope">
                                        <div class="item">
                                            <input
                                                type="text"
                                                style="text-indent:0.5em"
                                                :style="{width:180*a11+'px',height:30*a11+'px',fontSize: a11 * 15 + 'px'}"
                                                v-model="scope.row.ProjectName"
                                                @change="haschange1(scope.row)"
                                            />
                                        </div>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="Upper" :label="lang.ProcessParameterConfigure_ProcessParameterConfigureUserControl_DataGrid_Upper" :show-overflow-tooltip="true">
                                    <template slot-scope="scope">
                                        <div class="item">
                                            <input
                                                type="text"
                                                style="text-indent:0.5em"
                                                 :style="{width:180*a11+'px',height:30*a11+'px',fontSize: a11 * 15 + 'px'}"
                                                v-model="scope.row.Upper"
                                                @change="haschange1(scope.row)"
                                            />
                                        </div>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="Lower" :label="lang.ProcessParameterConfigure_ProcessParameterConfigureUserControl_DataGrid_Lower" :show-overflow-tooltip="true">
                                    <template slot-scope="scope">
                                        <div class="item">
                                            <input
                                                type="text"
                                                style="text-indent:0.5em"
                                                  :style="{width:180*a11+'px',height:30*a11+'px',fontSize: a11 * 15 + 'px'}"
                                                v-model="scope.row.Lower"
                                                @change="haschange1(scope.row)"
                                            />
                                        </div>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="Unit" :label="lang.ProcessParameterConfigure_ProcessParameterConfigureUserControl_DataGrid_Unit" :show-overflow-tooltip="true">
                                    <template slot-scope="scope">
                                        <div class="item">
                                            <input
                                                type="text"
                                                style="text-indent:0.5em"
                                                  :style="{width:180*a11+'px',height:30*a11+'px',fontSize: a11 * 15 + 'px'}"
                                                v-model="scope.row.Unit"
                                                @change="haschange1(scope.row)"
                                            />
                                        </div>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="Digit" :label="lang.ProcessParameterConfigure_ProcessParameterConfigureUserControl_DataGrid_Digit" :show-overflow-tooltip="true"> 
                                    <template slot-scope="scope">
                                        <div class="item">
                                            <input
                                                type="text"
                                                style="text-indent:0.5em"
                                                  :style="{width:180*a11+'px',height:30*a11+'px',fontSize: a11 * 15 + 'px'}"
                                                v-model="scope.row.Digit"
                                                @change="haschange1(scope.row)"
                                            />
                                        </div>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="ProjectValueTagName" :label="lang.ProcessParameterConfigure_ProcessParameterConfigureUserControl_DataGrid_ProjectVariableName" :show-overflow-tooltip="true"></el-table-column>
                            </el-table>
                        </div>
                    </div>
                   
                </div>
              
            </div>
               <div class="cancel"  @click="cancel" :style="{zoom:a11}">{{lang.PopupCommon_Cancel}}</div>
                    <div class="pre" @click="pre11" :style="{zoom:a11}">{{lang.PopupCommon_Save}}</div>
        </div>
        <div class="cover1" v-if="onework"></div>
        <div class="cover2" v-if="twowork"></div>
        <div class="cover3" v-if="lookchange"></div>
        <div class="cover4" v-if="newblue"></div>
        <div class="cover5" v-if="unsixth"></div>
        <div class="cover6" v-if="projectchange"></div>
        <div class="cover7" v-if="someprochange"></div>
    </div>
</template>

<script>
// import MyPage from '../../../components/public/Pages.vue';
import XLSX from 'xlsx';
export default {
    components: {
        // MySearch,
        // MyPage
    },
    data() {
        return {
            oneno: [],
            twono: [],
            twoword: '',
            bbb: false,
            ddd: false,
            one: 1,
            istwo: false,
            deltrue: true,
            tipword: '',
            tipchange: false,
            oneword: '',
            sbint: '',
            a: 1,
            pdyd1: true,
            pdyd2: true,
            pdyd3: true,
            pdyd4: true,
            pdyd5: true,
            pdyd6: true,
            // gth: require('../../assets/images/icon_gth.png'),
            gth: require('../../../assets/images/gth.png'),
            radio: '2',
            newblue: false,
            unsixth: false,
            two: 1,
            sbblue: '',
            PID: '',
            oneworkdata: '',
            adata: [],
            pageData: {
                PageSize: 50,
                TotalCount: 0,
                TotalPage: 0,
                PageIndex: 1,
                LastEnabled: false,
                NextEnabled: false
            },
            tdone: '',
            tdtwo: '',
            tdtree: '',
            checked1: false,
            checked2: false,
            checked3: false,
            projectchange: false,
            up: require('../../../assets/images/icon_up.png'),
            hao: require('../../../assets/images/hao.png'),
            tableData: [],
            tableData1: [],
            tableData2: [],
            wantdata: '',
            sixData: [],
            onework: false,
            twowork: false,
            someprochange: false,
            oneworkduan: '',
            workproject: '',
            onechange: 1,
            oneworkname: '',
            nowIndex: 1,
            pageDate: {
                PageIndex: 1,
                PageSize: 50,
                TotalPage: 0,
                TotalCount: 0
            },
            aaa1: false,
            bbb1: false,
            nowpage: 1,
            twoworkdata: {
                WID: '',
                StepName: '无',
                IsAuto: false,
                ProductID: '无',
                IsRelated: false,
                FinishTag1: '无',
                FinishTag2: '无',
                IsAbsolute: true,
                AbsoQualTag: '绝对合格，不需判断',
                IsQualTag: '无',
                SID: ''
            },
            aaa: false,
            ccc: false,

            pd: ['绝对合格，不需判断', '绝对不合格，无需判断'],
            lookchange: false,
            daiti: '',
            unsixdata: {},
            projectlist: '',
            projectlist2: '',
            projectlistdata: [],
            oneselect: '',
            twoselect: '',
            sbreason: '',
            sbvalue: '',
            threeselect: '',
            projectkeyword: '',
            projectlist3: '',
            projectlistdata1: [],
            projectlistdata2: '',
            projectlistdata3: '',
            projectchangedata: [],
            mewntchangedata: '',
            daiti1: '',
            daiti2: '',
            nowtwo: 0,
            argWorkProjects: '',
            no: require('../../../assets/images/no.png'),
            no2: require('../../../assets/images/no2.png'),
            tjgxid:'',
            tjgxshow:true,
            xggxid:'',
            xggxshow:true,
            scgxid:'',
            scgxshow:true,
            gxsyid:'',
            gxsyshow:true,
            tjgwid:'',
            tjgwshow:true,
            xggwid:'',
            xggwshow:true,
            scgwid:'',
            scgwshow:true,
            bhgid:'',
            bhgshow:true,
            gwsyid:'',
            gwsyshow:true,
            plxjid:'',
            plxjshow:true,
            xmxgid:'',
            xmxgshow:true,
            xmscid:'',
            xmscshow:true,
            xmsyid:'',
            xmsyshow:true,

            oneObj: "",
            twoObj: {
                WID: '',
                StepName: '',
                IsAuto: false,
                ProductID: '无',
                IsRelated: false,
                FinishTag1: '无',
                FinishTag2: '无',
                IsAbsolute: false,
                AbsoQualTag: '',
                IsQualTag: '无',
                SID: ''
            },
            threeObj: {
                Digit: '',
                Lower: '',
                Number: '',
                OriginalProjectName: '',
                PID: '',
                ProjectName: '',
                ProjectValueTagName: '',
                SID: '',
                Type: '',
                Unit: '',
                Upper: ''
            },

            lang: JSON.parse(localStorage.getItem('languages'))[localStorage.getItem('currentLang')]
        };
    },
       computed:{
        VpowerData() {
                    return this.$store.state.btnPowerData;
        },
    },
    created(){
               this.a11 = Number(parseFloat(window.screen.width / 1920).toFixed(2));
        if (this.a11 < 1) {
            this.a11 = 0.67;
        }
          setTimeout(() => {
            let a = this.a11 * 130 + 'px';
            $('.container').css({
                height: `calc(100% - ${a})`,
                marginTop:100*this.a11 + 'px'
            });
        });
        this.getLangData()
            this.jurisdiction = this.$store.state.btnPowerData
     this.buttonarr = this.findPathByLeafId(this.GetUrlParam('id'),this.jurisdiction)[0].Children
         console.log("2312",this.buttonarr)
          this.buttonarr.forEach((item)=>{
         if(item.RightName == "工序管理-新建工序按钮"){
          this.tjgxid = item.RightID
         }else if(item.RightName == "工序管理-修改按钮"){
          this.xggxid = item.RightID
         }else if(item.RightName == "工序管理-删除按钮"){
          this.scgxid = item.RightID
         }else if(item.RightName == "工序管理-工序上移按钮"){
          this.gxsyid = item.RightID
         }else if(item.RightName == "工位管理-新建工位按钮"){
          this.tjgwid = item.RightID
         }else if(item.RightName == "工位管理-修改按钮"){
          this.xggwid = item.RightID
         }else if(item.RightName == "工位管理-删除按钮"){
          this.scgwid = item.RightID
         }else if(item.RightName == "工位管理-不合格原因配置"){
          this.bhgid = item.RightID
         }else if(item.RightName =="工位管理-工位上移按钮"){
          this.gwsyid = item.RightID
         }else if(item.RightName =="参数管理-批量新建参数"){
          this.plxjid = item.RightID
         }else if(item.RightName =="参数管理-修改按钮"){
          this.xmxgid = item.RightID
         }else if(item.RightName =="参数管理-删除按钮"){
          this.xmscid = item.RightID
         }else if(item.RightName =="参数管理-参数上移按钮"){
          this.xmsyid = item.RightID
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
                  url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.tjgxid}`,
              }).then(res => {
                  this.tjgxshow = res.data.data
              
              }).catch((err)=>{
                  console.log('err',err)
              })
              this.$axios({
                  method: 'post',
                  url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.xggxid}`,
              }).then(res => {
                  this.xggxshow = res.data.data
              
              }).catch((err)=>{
                  console.log('err',err)
              })
                   this.$axios({
                  method: 'post',
                  url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.scgxid}`,
              }).then(res => {
                  this.scgxshow = res.data.data
              
              }).catch((err)=>{
                  console.log('err',err)
              })
                         this.$axios({
                  method: 'post',
                  url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.tjgwid}`,
              }).then(res => {
                  this.tjgwshow = res.data.data
              
              }).catch((err)=>{
                  console.log('err',err)
              })
                         this.$axios({
                  method: 'post',
                  url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.xggwid}`,
              }).then(res => {
                  this.xggwshow = res.data.data
              
              }).catch((err)=>{
                  console.log('err',err)
              })
                         this.$axios({
                  method: 'post',
                  url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.scgwid}`,
              }).then(res => {
                  this.scgwshow = res.data.data
              
              }).catch((err)=>{
                  console.log('err',err)
              })
                         this.$axios({
                  method: 'post',
                  url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.bhgid}`,
              }).then(res => {
                  this.bhgshow = res.data.data
              
              }).catch((err)=>{
                  console.log('err',err)
              })
                         this.$axios({
                  method: 'post',
                  url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.gwsyid}`,
              }).then(res => {
                  this.gwsyshow = res.data.data
              
              }).catch((err)=>{
                  console.log('err',err)
              })
                         this.$axios({
                  method: 'post',
                  url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.plxjid}`,
              }).then(res => {
                  this.plxjshow = res.data.data
              
              }).catch((err)=>{
                  console.log('err',err)
              })
                         this.$axios({
                  method: 'post',
                  url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.xmxgid}`,
              }).then(res => {
                  this.xmxgshow = res.data.data
              
              }).catch((err)=>{
                  console.log('err',err)
              })
                         this.$axios({
                  method: 'post',
                  url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.xmscid}`,
              }).then(res => {
                  this.xmscshow = res.data.data
              
              }).catch((err)=>{
                  console.log('err',err)
              })
                         this.$axios({
                  method: 'post',
                  url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.xmsyid}`,
              }).then(res => {
                  this.xmsyshow = res.data.data
              
              }).catch((err)=>{
                  console.log('err',err)
              })
               this.$axios({
                  method: 'post',
                  url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.gxsyid}`,
              }).then(res => {
                  this.gxsyshow = res.data.data
                
              }).catch((err)=>{
                  console.log('err',err)
              })
    },
    watch: {
        tableData(val){
          this.$refs.multipleTable3.setCurrentRow(val[0],true)
        },
         tableData1(val){
          this.$refs.multipleTable1.setCurrentRow(val[0],true)
        },
         tableData2(val){
          this.$refs.multipleTable2.setCurrentRow(val[0],true)
        },
         VpowerData(val){
                 this.jurisdiction = this.$store.state.btnPowerData
     this.buttonarr = this.findPathByLeafId(this.GetUrlParam('id'),this.jurisdiction)[0].Children
         console.log("2312",this.buttonarr)
          this.buttonarr.forEach((item)=>{
         if(item.RightName == "工序管理-新建工序按钮"){
          this.tjgxid = item.RightID
         }else if(item.RightName == "工序管理-修改按钮"){
          this.xggxid = item.RightID
         }else if(item.RightName == "工序管理-删除按钮"){
          this.scgxid = item.RightID
         }else if(item.RightName == "工序管理-工序上移按钮"){
          this.gxsyid = item.RightID
         }else if(item.RightName == "工位管理-新建工位按钮"){
          this.tjgwid = item.RightID
         }else if(item.RightName == "工位管理-修改按钮"){
          this.xggwid = item.RightID
         }else if(item.RightName == "工位管理-删除按钮"){
          this.scgwid = item.RightID
         }else if(item.RightName == "工位管理-不合格原因配置"){
          this.bhgid = item.RightID
         }else if(item.RightName =="工位管理-工位上移按钮"){
          this.gwsyid = item.RightID
         }else if(item.RightName =="参数管理-批量新建参数"){
          this.plxjid = item.RightID
         }else if(item.RightName =="参数管理-修改按钮"){
          this.xmxgid = item.RightID
         }else if(item.RightName =="参数管理-删除按钮"){
          this.xmscid = item.RightID
         }else if(item.RightName =="参数管理-参数上移按钮"){
          this.xmsyid = item.RightID
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
                  url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.tjgxid}`,
              }).then(res => {
                  this.tjgxshow = res.data.data
              
              }).catch((err)=>{
                  console.log('err',err)
              })
              this.$axios({
                  method: 'post',
                  url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.xggxid}`,
              }).then(res => {
                  this.xggxshow = res.data.data
              
              }).catch((err)=>{
                  console.log('err',err)
              })
                   this.$axios({
                  method: 'post',
                  url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.scgxid}`,
              }).then(res => {
                  this.scgxshow = res.data.data
              
              }).catch((err)=>{
                  console.log('err',err)
              })
                         this.$axios({
                  method: 'post',
                  url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.tjgwid}`,
              }).then(res => {
                  this.tjgwshow = res.data.data
              
              }).catch((err)=>{
                  console.log('err',err)
              })
                         this.$axios({
                  method: 'post',
                  url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.xggwid}`,
              }).then(res => {
                  this.xggwshow = res.data.data
              
              }).catch((err)=>{
                  console.log('err',err)
              })
                         this.$axios({
                  method: 'post',
                  url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.scgwid}`,
              }).then(res => {
                  this.scgwshow = res.data.data
              
              }).catch((err)=>{
                  console.log('err',err)
              })
                         this.$axios({
                  method: 'post',
                  url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.bhgid}`,
              }).then(res => {
                  this.bhgshow = res.data.data
              
              }).catch((err)=>{
                  console.log('err',err)
              })
                this.$axios({
                  method: 'post',
                  url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.gxsyid}`,
              }).then(res => {
                  this.gxsyshow = res.data.data
                
              }).catch((err)=>{
                  console.log('err',err)
              })
                         this.$axios({
                  method: 'post',
                  url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.gwsyid}`,
              }).then(res => {
                  this.gwsyshow = res.data.data
              
              }).catch((err)=>{
                  console.log('err',err)
              })
                         this.$axios({
                  method: 'post',
                  url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.plxjid}`,
              }).then(res => {
                  this.plxjshow = res.data.data
              
              }).catch((err)=>{
                  console.log('err',err)
              })
                         this.$axios({
                  method: 'post',
                  url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.xmxgid}`,
              }).then(res => {
                  this.xmxgshow = res.data.data
              
              }).catch((err)=>{
                  console.log('err',err)
              })
                         this.$axios({
                  method: 'post',
                  url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.xmscid}`,
              }).then(res => {
                  this.xmscshow = res.data.data
              
              }).catch((err)=>{
                  console.log('err',err)
              })
                         this.$axios({
                  method: 'post',
                  url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.xmsyid}`,
              }).then(res => {
                  this.xmsyshow = res.data.data
              
              }).catch((err)=>{
                  console.log('err',err)
              })

         },
        itemname(newval) {
            this.itemname = newval;
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
            console.log('sad');
            for (i in this.projectlist2) {
                if (val == this.projectlist2[i].GroupName) {
                    this.projectlist3 = this.projectlist2[i].DataTypes;
                    // this.threeselect = this.projectlist3[0].Value;
                    this.threeselect = this.lang.AlarmRecord_HT_Unlimited
                }
            }
            this.watchdata();
        },
        threeselect(val) {
            this.watchdata();
        }
    },
    methods: {
        getLangData() {
            this.twoworkdata = {
                WID: '',
                a11:1,
                StepName: this.lang.ProcessParameterConfigure_HT_WorkStepSetting1ViewModel_Null,
                IsAuto: false,
                ProductID: this.lang.ProcessParameterConfigure_HT_WorkStepSetting1ViewModel_Null,
                IsRelated: false,
                FinishTag1: this.lang.ProcessParameterConfigure_HT_WorkStepSetting1ViewModel_Null,
                FinishTag2: this.lang.ProcessParameterConfigure_HT_WorkStepSetting1ViewModel_Null,
                IsAbsolute: true,
                AbsoQualTag: this.lang.ProcessParameterConfigure_HT_WorkStepSetting1ViewModel_AbsolutelyQualified,
                IsQualTag: this.lang.ProcessParameterConfigure_HT_WorkStepSetting1ViewModel_Null,
                SID: ''
            }
            this.twoObj = {
                WID: '',
                StepName: '',
                IsAuto: false,
                ProductID: this.lang.ProcessParameterConfigure_HT_WorkStepSetting1ViewModel_Null,
                IsRelated: false,
                FinishTag1: this.lang.ProcessParameterConfigure_HT_WorkStepSetting1ViewModel_Null,
                FinishTag2: this.lang.ProcessParameterConfigure_HT_WorkStepSetting1ViewModel_Null,
                IsAbsolute: false,
                AbsoQualTag: '',
                IsQualTag: this.lang.ProcessParameterConfigure_HT_WorkStepSetting1ViewModel_Null,
                SID: ''
            }
            this.pd = [this.lang.ProcessParameterConfigure_HT_WorkStepSetting1ViewModel_AbsolutelyQualified, this.lang.ProcessParameterConfigure_HT_WorkStepSetting1ViewModel_AbsolutelyUnqualified]
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
        int() {
            this.twono = this.sixData;
            let a = JSON.stringify(this.oneno);
            this.sixData = JSON.parse(a);
            // this.intdata();
            console.log(this.sixData);
            this.mewntchangedata = '';
        },
        bluer() {
            this.oneno = this.sixData;
            let a = JSON.stringify(this.twono);
            this.sixData = JSON.parse(a);
            // this.sixData = [];
            // this.blurdata();
            // console.log(this.sixData);
            this.mewntchangedata = '';
        },
        blurdata() {
            this.$axios
                .post(
                    `/api/ProcessParameterConfigure/GstUnQualBoolList?argSId=${this.workproject}`
                )
                .then(res => {
                    this.sixData = res.data.data;
                    console.log('aaa', res);
                });
        },
        mewant(a) {
            console.log(a);
            this.mewntchangedata = a;
        },
        pre11() {
            console.log(this.workproject)
            this.argWorkProjects = this.projectlistdata1;
            if (this.argWorkProjects.length == 0) {
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
                this.tipword = this.lang.ProcessParameterConfigure_HT_AddWorkProject1ViewModel_PleaseAddProject;
            } else {
                console.log(this.argWorkProjects, this.workproject)
                this.$axios({
                    method: 'post',
                    url: '/api/ProcessParameterConfigure/BatchAddProject',
                    data: {
                        argWorkProjects: this.argWorkProjects,
                        argSId: this.workproject
                    }
                }).then(res => {
                    this.pdyd5 = true;
                        setTimeout(() => {
                        $('.tip').css({
                            zoom: this.a11,
                            left: `calc(50% - ${($('.tip').width() / 2) * this.a11}px)`,
                            top: `calc(50% - ${($('.tip').height() / 2) * this.a11}px)`
                        });
                        this.tipchange = true;
                        this.move('tip', 'tiphead');
                    });
                    if (res.data.msg == '请求成功') {
                        this.tipword = res.data.data;
                        this.someprochange = false;
                        this.getthreedata();
                    } else {
                        this.tipword = res.data.msg;
                    }
                });
            }
        },
        addwantproject() {
            // this.projectlistdata1 = [];
            if (this.adata.length !== 0) {
                let a = JSON.stringify(this.adata);
                let b = JSON.parse(a);
                for (let i = 0; i < b.length; i++) {
                    this.projectlistdata1.push(b[i]);
                }
                for (let j = 0; j < this.projectlistdata1.length; j++) {
                    this.projectlistdata1[j].Number = j;
                }
                this.$refs.multipleTable.clearSelection();
                this.adata = [];
            } else {
                let a = JSON.stringify(this.projectlistdata2);
                let b = JSON.parse(a);
                console.log(b);
                for (let i = 0; i < b.length; i++) {
                    this.projectlistdata1.push(b[i]);
                }
                for (let j = 0; j < this.projectlistdata1.length; j++) {
                    this.projectlistdata1[j].Number = j;
                }
                this.$refs.multipleTable.clearSelection();
                this.projectlistdata2 = [];
            }
        },
        selectall(a) {
            let i = 0;
            for (i in a) {
                a[i].Upper = 100;
                a[i].Lower = 0;
                a[i].ProjectName = a[i].Name;
                a[i].ProjectValueTagName = a[i].Name;
                a[i].Unit = '//';
                a[i].DataType = a[i].DateType;
                if (
                    a[i].DateType == this.lang['F64位浮点数IEEE754'] ||
                    a[i].DateType == this.lang['F32位浮点数IEEE754']
                ) {
                    a[i].Digit = 2;
                } else {
                    a[i].Digit = '';
                }
            }
            this.adata = a;
        },
        removeproject() {
            this.projectlistdata1 = this.projectlistdata1.filter(item => {
                let arrlist = this.projectlistdata3.map(v => v.Number);
                return !arrlist.includes(item.Number);
            });
        },
        selectall1(a) {
            this.projectlistdata3 = a;
        },
        select1(a) {
            this.projectlistdata3 = a;

            console.log(a);
        },
        select(a) {
            //
            let i = 0;
            for (i in a) {
                a[i].Upper = 100;
                a[i].Lower = 0;
                a[i].ProjectName = a[i].Name;
                a[i].ProjectValueTagName = a[i].Name;
                a[i].Unit = '//';
                a[i].DataType = a[i].DateType;
                if (
                    a[i].DateType == this.lang['F64位浮点数IEEE754'] ||
                    a[i].DateType == this.lang['F32位浮点数IEEE754']
                ) {
                    a[i].Digit = 2;
                } else {
                    a[i].Digit = '';
                }
            }
            this.projectlistdata2 = a;
            console.log(a);
        },
        gbgl() {
            // this.twoworkdata.IsRelated = !this.twoworkdata.IsRelated;
            console.log(this.twoworkdata.IsRelated);
        },
        lookforsearch() {
            this.watchdata();
        },
        tip1() {
            this.tipchange = false;
            this.haschange = 1;
        },
        no1() {
            this.a = '';
            this.tipchange = false;
            this.deltrue = true;
        },
        haschange1(a, b) {
            console.log(a);
        },
        yes1() {
            if (this.a == 1) {
                this.$axios
                    .post(
                        `/api/ProcessParameterConfigure/DelWorkSection?argWId=${this.oneworkduan}`
                    )
                    .then(res => {
                        this.pdyd5 = true;
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
                        if (res.data.msg == '请求成功') {
                            this.tipword = res.data.data;
                            this.onework = false;
                            this.deltrue = true;
                            this.getonedata();
                        } else {
                            this.tipword = res.data.msg;
                            this.deltrue = true;
                        }
                    });
            } else if (this.a == 2) {
                console.log(this.workproject);
                this.$axios
                    .post(
                        `/api/ProcessParameterConfigure/DelWorkStep?argSId=${this.workproject}`
                    )
                    .then(res => {
                        this.pdyd5 = true;
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
                        if (res.data.msg == '请求成功') {
                            this.tipword = res.data.data;
                            this.onework = false;
                            this.deltrue = true;
                            this.gettwodata();
                        } else {
                            this.tipword = res.data.msg;
                            this.deltrue = true;
                        }
                    });
            } else if (this.a == 3) {
                console.log(this.PID);
                this.$axios
                    .post(
                        `/api/ProcessParameterConfigure/DelProject?argPId=${this.PID}`
                    )
                    .then(res => {
                        this.pdyd5 = true;
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
                        if (res.data.msg == '请求成功') {
                            this.tipword = res.data.data;
                            this.onework = false;
                            this.deltrue = true;
                            this.getthreedata();
                        } else {
                            this.tipword = res.data.msg;
                            this.deltrue = true;
                        }
                    });
            } else if (this.a == 4) {
                this.tipchange = false;
                //     let a = 0;
                // for(a=0;a<this.sixData.length;a++){
                //     if(this.mewntchangedata.Number == this.sixData[a].Number){
                //         this.sixData.splice(a,1);
                //     }
                // }
                //    for(a=0;a<this.sixData.length;a++){
                //        let b = a+1;
                //        this.sixData[a].Number = b;
                //    }
                if (this.radio == 1) {
                    this.deltrue = true;
                    console.log(this.sixData);
                    console.log(this.mewntchangedata);
                    let i;
                    for (i = 0; i < this.sixData.length; i++) {
                        if (
                            this.sixData[i].Number ==
                            this.mewntchangedata.Number
                        ) {
                            this.sixData.splice(i, 1);
                        }
                    }
                    for (i = 0; i < this.sixData.length; i++) {
                        let j = i + 1;
                        this.sixData[i].Number = j;
                    }
                    for (i = 0; i < this.oneno.length; i++) {
                        if (
                            this.oneno[i].Number == this.mewntchangedata.Number
                        ) {
                            this.oneno.splice(i, 1);
                        }
                    }
                    for (i = 0; i < this.oneno.length; i++) {
                        let j = i + 1;
                        this.oneno[i].Number = j;
                    }
                } else if (this.radio == 2) {
                    this.deltrue = true;

                    let i;
                    for (i = 0; i < this.sixData.length; i++) {
                        if (
                            this.sixData[i].Number ==
                            this.mewntchangedata.Number
                        ) {
                            this.sixData.splice(i, 1);
                        }
                    }
                    for (i = 0; i < this.sixData.length; i++) {
                        let j = i + 1;
                        this.sixData[i].Number = j;
                    }
                    for (i = 0; i < this.twono.length; i++) {
                        if (
                            this.twono[i].Number == this.mewntchangedata.Number
                        ) {
                            this.twono.splice(i, 1);
                        }
                    }
                    for (i = 0; i < this.twono.length; i++) {
                        let j = i + 1;
                        this.twono[i].Number = j;
                    }
                }
            }
        },
        pre1() {},
        onedel() {
               if(!this.scgxshow){
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
                    this.tipword =this.lang.NoOperationAuthority;
                    return;
            }
            this.a = 1;
            this.pdyd5 = true;
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
            this.tipword = this.lang.ProcessParameterConfigure_HT_ProcessParameterConfigureUserControlViewModel_MessDeleteSection;
            this.deltrue = false;
        },
        delthree() {
               if(!this.xmscshow){
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
                    this.tipword =this.lang.NoOperationAuthority;
                    return;
            }
            this.a = 3;
            this.pdyd5 = true;
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
            if (!this.PID) {
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
                this.tipword = this.lang.ProcessParameterConfigure_HT_ProcessParameterConfigureUserControlViewModel_SelectProject;
            } else {
                this.tipword = this.lang.ProcessParameterConfigure_HT_ProcessParameterConfigureUserControlViewModel_MessDeleteItem;
                this.deltrue = false;
            }
        },
        deltwo() {
             if(!this.scgwshow){
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
                    this.tipword =this.lang.NoOperationAuthority;
                    return;
            }
            if(this.tableData1.length === 0){
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
                this.tipword =this.lang.ProcessParameterConfigure_HT_ProcessParameterConfigureUserControlViewModel_SelectProcess;
                return;
            }
            this.a = 2;
            this.pdyd5 = true;
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
            this.tipword = this.lang.ProcessParameterConfigure_HT_ProcessParameterConfigureUserControlViewModel_MessDeleteProcess;
            this.deltrue = false;
        },
        onepre() {
            
            if (this.onechange == 2) {
                // this.oneworkduan = '';
                
                let a  = ''
                this.$axios
                    .post(
                        `/api/ProcessParameterConfigure/AddWorkSection?argWId=${a}&argName=${this.oneObj}`
                    )
                    .then(res => {
                        this.pdyd5 = true;
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
                        if (res.data.msg == '请求成功') {
                            this.tipword = res.data.data;
                            this.onework = false;
                            this.getonedata();
                        } else {
                            this.tipword = res.data.msg;
                        }
                    });
            } else {
                this.$axios
                    .post(`/api/ProcessParameterConfigure/AddWorkSection?argWId=${this.oneworkduan}&argName=${this.oneObj}`)
                    .then(res => {
                        this.pdyd5 = true;
                        setTimeout(() => {
                            $('.tip').css({
                                zoom: this.a11,
                                left: `calc(50% - ${($('.tip').width() / 2) * this.a11}px)`,
                                top: `calc(50% - ${($('.tip').height() / 2) * this.a11}px)`
                            });
                            this.tipchange = true;
                            this.move('tip', 'tiphead');
                        });
                        if (res.data.msg == '请求成功') {
                            this.tipword = res.data.data;
                            console.log("ddddddddddddddddd")
                            this.oneworkname = this.oneObj;
                            this.onework = false;
                            this.getonedata();
                        } else {
                            this.tipword = res.data.msg;
                        }
                    });
            }
        },
        addsomepro() {
            if(!this.plxjshow){
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
                this.tipword =this.lang.NoOperationAuthority;
                return;
            }
                     if(this.tableData1.length === 0){
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
                 this.tipword =this.lang.ProcessParameterConfigure_HT_ProcessParameterConfigureUserControlViewModel_SelectProcess;
                return;
            }
            let that = this
              setTimeout(() => {
                            $('.addsomepro').css({
                                left: `calc(50% - ${($('.addsomepro').width() / 2) *
                                    this.a11}px)`,
                                top: `calc(50% - ${($('.addsomepro').height() / 2) *
                                    this.a11}px)`
                            });
                              that.someprochange = true;
                             
                            this.move('addsomepro', 'addsomeprotop');
                        });
           setTimeout(()=>{
                if(that.a11>1){
                                  console.log( $('.tablecsbbone').find('.el-table__body-wrapper')[0])
                                  
                                  $('.tablecsbbone').find('.el-table__body-wrapper')[0].style.height = that.a11*156+'px'
                                  console.log($('.tablecsbbone').find('.el-table__body-wrapper')[0].style.height)
                                  
                                   $('.tablecsbbtwo').find('.el-table__body-wrapper')[0].style.height = that.a11*150+'px'
                              }
           },1000)
            this.addproject();
            this.watchdata();
            this.projectlistdata1 = [];
        },
        changeproject() {
            
            if(!this.xmxgshow){
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
                this.tipword =this.lang.NoOperationAuthority;
                return;
            }
            if(this.tableData2.length === 0){
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
                this.tipword =this.lang.ProcessParameterConfigure_HT_ProcessParameterConfigureUserControlViewModel_SelectProject;
                return;
            }
            let a = JSON.stringify(this.twoworkdata);
            this.daiti1 = JSON.parse(a);
            let a1 = JSON.stringify(this.projectchangedata);
            this.threeObj = {...this.projectchangedata}
            this.daiti2 = JSON.parse(a1);
            setTimeout(() => {
                $('.changpro').css({
                    zoom: this.a11,
                    left: `calc(50% - ${($('.changpro').width() / 2) * this.a11}px)`,
                    top: `calc(50% - ${($('.changpro').height() / 2) * this.a11}px)`
                });
                this.projectchange = true;
                this.move('changpro', 'changetop');
            });
          
        },
        intdata() {
            this.$axios
                .post(
                    `/api/ProcessParameterConfigure/GstUnQualIntList?argSId=${this.workproject}`
                )
                .then(res => {
                    this.sixData = res.data.data;
                    console.log('aaa', this.sixData);
                });
        },
        nosix() {
             if(!this.bhgshow){
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
                this.tipword =this.lang.NoOperationAuthority;
                return;
            }
            if(this.workproject === ''){
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
                this.tipword =this.lang.ProcessParameterConfigure_HT_ProcessParameterConfigureUserControlViewModel_SelectProcess;
                return;
            }
            this.$axios
                .post(
                    `/api/ProcessParameterConfigure/QueryUnqualifiedReason?id=${this.workproject}`
                )
                .then(res => {
                    this.twono = [];
                    this.oneno = [];
                    this.sbint = '';
                    console.log(res.data.data);
                    this.unsixdata = res.data.data.Step;
                    if (res.data.data.Step.ReasonType == 1) {
                        this.radio = '1';
                        this.$axios
                            .post(
                                `/api/ProcessParameterConfigure/GstUnQualIntList?argSId=${this.workproject}`
                            )
                            .then(res => {
                                console.log(res);
                                this.sixData = res.data.data.Datas;
                                this.sbint = res.data.data.TagName;
                                 setTimeout(() => {
this.unsixth = true;
    this.move('Unqualified', 'unqualifiedtop');
                    });
                                this.pdyd4 = true;
                            });
                    } else {
                        this.radio = '2';
                        this.$axios
                            .post(
                                `/api/ProcessParameterConfigure/GstUnQualBoolList?argSId=${this.workproject}`
                            )
                            .then(res => {
                                console.log(res);
                                 this.sixData = res.data.data;
                                // this.sbint = this.sixData[0].Variable;
                                this.pdyd4 = true;
                                 setTimeout(() => {
this.unsixth = true;
    this.move('Unqualified', 'unqualifiedtop');
                    });
                            });
                    }
                       let a = JSON.stringify(this.twoworkdata);
            this.daiti1 = JSON.parse(a);
                let a1 = JSON.stringify(this.projectchangedata);
            this.daiti2 = JSON.parse(a1);
                    // console.log(res.data);
                    // let i = 0;
                    // for (i in res.data.data.BoolReason) {
                    //     res.data.data.BoolReason[i].Number = ++i;
                    // }
                    // this.sixData = res.data.data.BoolReason;
                    // console.log(this.sixData);
                });
        },
        onetop(a) {
             if(!this.gxsyshow){
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
                    this.tipword =this.lang.NoOperationAuthority;
                    return;
            }
            console.log(a);
            this.$axios
                .post(
                    `/api/ProcessParameterConfigure/MoveUpSection?argWId=${a.WID}`
                )
                .then(res => {
                    console.log(res);
                    this.getonedata();
                });
        },
        twotop(a) {
             if(!this.gwsyshow){
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
                    this.tipword =this.lang.NoOperationAuthority;
                    return;
            }
            this.$axios
                .post(
                    `/api/ProcessParameterConfigure/MoveUpStep?argSID=${a.SID}`
                )
                .then(res => {
                    console.log(res);
                    this.gettwodata();
                });
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
        threetop(a) {
              if(!this.xmsyshow){
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
                    this.tipword =this.lang.NoOperationAuthority;
                    return;
            }
            this.$axios
                .post(
                    `/api/ProcessParameterConfigure/MoveUpProject?argPID=${a.PID}`
                )
                .then(res => {
                    console.log(res);
                    this.getthreedata();
                });
        },
        handleEdit() {},
        watchdata() {
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
                url:`/api/ProcessParameterConfigure/GstVariableList`,
                data:{
                    argDevice:this.oneselect,
                    argGroup:this.twoselect,
                    argDataType:arr,
                    argKeyWord:this.projectkeyword,
                    argPageSize:this.pageDate.PageSize,
                    argPageIndex:this.pageDate.PageIndex

                }
            }).then(res => {
                    console.log('ss', res);
                    this.projectlistdata =  res.data.data.DataList;

                    this.pageDate = res.data.data.ParameterList;
                    this.nowpage = this.pageDate.PageIndex;
                    console.log('sss', this.pageDate);
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
        blpre() {
            if (!this.wantdata) {
                this.pdyd5 = true;
                setTimeout(() => {
                    $('.tip').css({
                        zoom: this.a11,
                        left: `calc(50% - ${($('.tip').width() / 2) * this.a11}px)`,
                        top: `calc(50% - ${($('.tip').height() / 2) * this.a11}px)`
                    });
                    this.tipchange = true;
                    this.move('tip', 'tiphead');
                });
                this.tipword = this.lang.QualityManage_HT_ChoseProcessItemWindowViewModel_PsaVariable;
            } else {
                if (this.one == 1) {
                    // twoworkdata.ProductID
                    let isInt = false;
                    if(localStorage.getItem('currentLang') === "Main_Language_EN"){
                        isInt = /Int/.test(this.wantdata.DateType)
                    }else{
                        isInt = /整型/.test(this.wantdata.DateType)
                    }
                    if (this.wantdata.DateType !== this.lang['二进制变量'] && !isInt) {
                        if (this.istwo == this.lang.ProcessParameterConfigure_ProcessParameterConfigureUserControl_DataGrid_QualifiedSignal) {
                            // 合格信号
                            // this.tipword = this.istwo + '请选择<二进制>变量!';
                            this.tipword = this.lang.ProcessParameterConfigure_HT_SelectVariableViewModel_QualifiedSelectBinary
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
                        } else if (this.istwo == this.lang.ProcessParameterConfigure_ProcessParameterConfigureUserControl_DataGrid_CompletionSignal) {
                            // 完工信号
                            // this.tipword = this.istwo + '请选择<二进制>变量!';
                            this.tipword = this.lang.ProcessParameterConfigure_HT_SelectVariableViewModel_CompletionSelectBinary
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
                        } else if (this.istwo == this.lang.ProcessParameterConfigure_ProcessParameterConfigureUserControl_DataGrid_AssociatedSignal) {
                            // 关联信号
                            // this.tipword = this.istwo + '请选择<二进制>变量!';
                            this.tipword = this.lang.ProcessParameterConfigure_HT_SelectVariableViewModel_AssociatedSelectBinary
                            this.pdyd5 = true;
                            setTimeout(() => {
                                $('.tip').css({
                                    zoom: this.a11,
                                    left: `calc(50% - ${($('.tip').width() / 2) * this.a11}px)`,
                                    top: `calc(50% - ${($('.tip').height() / 2) * this.a11}px)`
                                });
                                this.tipchange = true;
                                this.move('tip', 'tiphead');
                            });
                        } else {
                            this.twoObj.ProductID = this.wantdata.Name;
                            this.lookchange = false;
                        }
                    } else {
                        if (this.istwo == this.lang.ProcessParameterConfigure_ProcessParameterConfigureUserControl_DataGrid_QualifiedSignal) {
                            this.twoObj.IsQualTag = this.wantdata.Name;
                            this.twoObj.IsQualitiedTagName = this.wantdata.Name;
                            this.lookchange = false;
                        } else if (this.istwo == this.lang.ProcessParameterConfigure_ProcessParameterConfigureUserControl_DataGrid_CompletionSignal) {
                            this.twoObj.FinishTag1 = this.wantdata.Name;
                            this.lookchange = false;
                        } else if (this.istwo == this.lang.ProcessParameterConfigure_ProcessParameterConfigureUserControl_DataGrid_AssociatedSignal) {
                           
                            this.twoObj.FinishTag2 = this.wantdata.Name;
                            this.lookchange = false;
                        } else {
                            this.twoObj.ProductID = this.wantdata.Name;
                            this.lookchange = false;
                        }
                    }
                } else if (this.one == 2) {
                    this.threeObj.ProjectValueTagName = this.wantdata.Name;
                    this.lookchange = false;
                } else if (this.one == 3) {
                    if (
                        this.wantdata.DateType == this.lang['有符号32位整型'] ||
                        this.wantdata.DateType == this.lang['无符号8位整型'] ||
                        this.wantdata.DateType == this.lang['有符号8位整型'] ||
                        this.wantdata.DateType == this.lang['有符号16位整型'] ||
                        this.wantdata.DateType == this.lang['无符号16位整型'] ||
                        this.wantdata.DateType == this.lang['无符号32位整型'] ||
                        this.wantdata.DateType == this.lang['无符号64位整型']
                    ) {
                        this.sbint = this.wantdata.Name;
                        this.lookchange = false;
                    } else {
                        this.pdyd5 = true;
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
                        // this.tipword = '整型识别变量，请选择<整型>变量！';
                        this.tipword = this.lang.ProcessParameterConfigure_HT_SelectVariableViewModel_IntegerSelectInteger
                    }
                } else if (this.one == 4) {
                    if (this.wantdata.DateType !== this.lang['二进制变量']) {
                        // this.tipword = '布尔型请选择二进制变量!';
                        this.tipword = this.lang.ProcessParameterConfigure_HT_SelectVariableViewModel_BooleanSelectBinary
                        this.pdyd5 = true;
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
                    } else {
                        this.sbblue = this.wantdata.Name;
                        this.lookchange = false;
                    }
                }
            }
        },

        addproject(arr) {
                let resarr;
            if(arr){
 console.log("数组",arr)
 resarr = arr
            }else{
                resarr = ''
            }
       

            var $this = this
            this.pageDate.PageIndex = 1
            this.$axios({
                url:`/api/ProcessParameterConfigure/GstCondition`,
                method:'post',
                data:resarr
            }).then(res => {
                  
                    console.log(":sadasdsaddas",res)
                    $this.projectlist = res.data.data;
                    $this.projectlist2 = JSON.parse(JSON.stringify($this.projectlist[0].Groups));
                    $this.projectlist3 = JSON.parse(JSON.stringify($this.projectlist2[0].DataTypes));
                    $this.oneselect = JSON.parse(JSON.stringify($this.projectlist[0].DeviceName));
                    $this.twoselect = JSON.parse(JSON.stringify($this.projectlist2[0].GroupName));
                    // this.threeselect = this.projectlist3[0].Value;
                    $this.threeselect = JSON.parse(JSON.stringify($this.lang.AlarmRecord_HT_Unlimited))
                })
                .then(() => {
                    this.watchdata();
                    this.lookforsearch1 = true;
                });
        },
        gxpre() {
           
            if (this.onechange == 2) {
                console.log('新建');
                this.twoObj.WID = this.oneworkduan;
                delete this.twoObj.SID;
                if (this.twoObj.AbsoQualTag == this.lang.ProcessParameterConfigure_HT_WorkStepSetting1ViewModel_AbsolutelyQualified) {
                    this.twoObj.AbsoQualTag = 1;
                } else {
                    this.twoObj.AbsoQualTag = 2;
                }
                this.twoObj.StepName = this.twoObj.OriginalStepName
                console.log(this.twoObj);
                this.$axios({
                    method: 'post',
                    url: '/api/ProcessParameterConfigure/AddWorkStep',
                    data: this.twoObj
                }).then(res => {
                    if (res.data.msg == '请求成功') {
                        this.tipword = res.data.data;
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
                        this.twowork = false;
                        this.gettwodata();
                  
                    } else {
                        console.log(res);
                        this.tipword = res.data.msg;
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
                        console.log(this.twoworkdata);
                        if (this.twoObj.AbsoQualTag == 1) {
                            this.twoObj.AbsoQualTag = this.lang.ProcessParameterConfigure_HT_WorkStepSetting1ViewModel_AbsolutelyQualified;
                        } else {
                            this.twoObj.AbsoQualTag = this.lang.ProcessParameterConfigure_HT_WorkStepSetting1ViewModel_AbsolutelyUnqualified
                        }
                    }
                });
            } else {
                console.log('修改');
                this.twoObj.WID = this.oneworkduan;

                console.log('修改属性', this.twoObj);
                if (this.twoObj.AbsoQualTag == this.lang.ProcessParameterConfigure_HT_WorkStepSetting1ViewModel_AbsolutelyQualified) {
                    this.twoObj.AbsoQualTag = 1;
                } else {
                    this.twoObj.AbsoQualTag = 2;
                }
                this.twoObj.IsQualTag = this.twoObj.IsQualitiedTagName;
                let xgdata = JSON.parse(JSON.stringify(this.twoObj))
                xgdata.StepName = xgdata.OriginalStepName
                this.$axios({
                    method: 'post',
                    url: '/api/ProcessParameterConfigure/AddWorkStep',
                    data: xgdata
                }).then(res => {
                    console.log(res);
                    console.log(this.twoObj)
                    if (res.data.msg == '请求成功') {
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
                        this.twowork = false;
                        this.gettwodata();
                    } else {
                        this.pdyd5 = true;
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
                        if (this.twoObj.AbsoQualTag == 1) {
                            this.twoObj.AbsoQualTag = this.lang.ProcessParameterConfigure_HT_WorkStepSetting1ViewModel_AbsolutelyQualified;
                        } else {
                            this.twoObj.AbsoQualTag = this.lang.ProcessParameterConfigure_HT_WorkStepSetting1ViewModel_AbsolutelyUnqualified
                        }
                    }
                    this.twoworkdata = {...this.twoObj}
                });
            }
            console.log(this.twoObj);
        },
        addnewblue() {
            this.sbblue = '';
            this.ddd = false;
            this.two = 1;
            this.sbvalue = '';
            this.sbreason = '';
             setTimeout(() => {
this.newblue = true;
    this.move('newblue', 'newbluetop');
                    });
            this.oneword = this.lang.ProcessParameterConfigure_HT_UnQualitiedReasonIntViewModel_NewIntegerReason;
            this.twoword = this.lang.ProcessParameterConfigure_HT_UnQualitiedReasonBoolViewModel_NewBoolreason;
        },
        changenewblue() {
            this.oneword = this.lang.ProcessParameterConfigure_HT_UnQualitiedReasonIntViewModel_ModifyIntegerReason;
            this.twoword = this.lang.ProcessParameterConfigure_HT_UnQualitiedReasonBoolViewModel_ModifyBoolReason;
            this.two = 2;
            if (!this.mewntchangedata) {
                this.tipword = this.lang.ProcessParameterConfigure_HT_UnQualitiedReasonViewModel_PSFailureReason;
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
                 setTimeout(() => {
this.newblue = true;
    this.move('newblue', 'newbluetop');
                    });
                this.sbreason = this.mewntchangedata.Reason;
                this.sbvalue = this.mewntchangedata.Value;
                this.sbblue = this.mewntchangedata.TagName;
                this.ddd = this.mewntchangedata.IsReset;
            }
        },
        addnewbluepre() {
            if (String(this.sbvalue).trim() === '') {
                this.tipword = this.lang.ProcessParameterConfigure_HT_UnQualitiedReasonIntViewModel_PEIntegerIdentification;
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
            if (!/^(\-|\+)?\d+$/.test(this.sbvalue)) {
                this.tipword = this.lang.ProcessParameterConfigure_HT_UnQualitiedReasonIntViewModel_SaveFailedNumbers;
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
            if (!this.sbreason) {
                this.tipword = this.lang.ProcessParameterConfigure_HT_UnQualitiedReasonBoolViewModel_PEReason;
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
            if (this.radio == '1') {
                if (this.two == 1) {
                    let a = {
                        Value: Number(this.sbvalue),
                        Reason: this.sbreason,
                        Number: this.sixData.length + 1
                    };
                    // let c = JSON.stringify(this.sbvalue);
                    // let cc = JSON.parse(c);
                    var cc = JSON.parse(JSON.stringify(this.sbvalue));
                    if (this.sixData.length !== 0) {
                        var list = []
                        this.sixData.forEach(item => {
                            list.push(Number(item.Value))
                        })
                        if (list.includes(Number(this.sbvalue))) {
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
                            this.tipword = this.lang.ProcessParameterConfigure_HT_UnQualitiedReasonIntViewModel_SaveFailedRepeat;
                            return
                        } else {
                            this.sixData.push(a);
                            this.newblue = false;
                            return
                        }
                        // for (let a1 = 0; a1 < this.sixData.length; a1++) {
                        //     if ( a.Value == this.sixData[a1].Value &&a.Value !== cc ) {
                        //     setTimeout(() => {
                        //             $('.tip').css({
                        //                 zoom: this.a11,
                        //                 left: `calc(50% - ${($('.tip').width() / 2) *
                        //                     this.a11}px)`,
                        //                 top: `calc(50% - ${($('.tip').height() / 2) *
                        //                     this.a11}px)`
                        //             });
                        //             this.tipchange = true;
                        //             this.move('tip', 'tiphead');
                        //         });
                        //         this.pdyd5 = true;
                        //         this.tipword = this.lang.ProcessParameterConfigure_HT_UnQualitiedReasonIntViewModel_SaveFailedRepeat;
                        //         break;
                        //     } else {
                        //         this.sixData.push(a);
                        //         this.newblue = false;
                        //         break;
                        //     }
                        // }
                    } else {
                        this.sixData.push(a);

                        this.newblue = false;
                    }
                } else if (this.two == 2) {
                    var cc = JSON.parse(JSON.stringify(this.sbvalue));
                    if (this.sixData.length !== 0) {
                        var list = []
                        this.sixData.forEach(item => {
                            list.push(Number(item.Value))
                        })
                        
                        if (list.includes(Number(this.sbvalue)) && Number(this.mewntchangedata.Value) !== Number(this.sbvalue)) {
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
                            this.tipword = this.lang.ProcessParameterConfigure_HT_UnQualitiedReasonIntViewModel_SaveFailedRepeat;
                            return;
                        }
                        // for (var a1 = 0; a1 < this.sixData.length; a1++) {
                        //     if (this.sbvalue == this.sixData[a1].Value && this.sbvalue !== cc) {
                        //         debugger
                        //         setTimeout(() => {
                        //             $('.tip').css({
                        //                 zoom: this.a11,
                        //                 left: `calc(50% - ${($('.tip').width() / 2) *
                        //                     this.a11}px)`,
                        //                 top: `calc(50% - ${($('.tip').height() / 2) *
                        //                     this.a11}px)`
                        //             });
                        //             this.tipchange = true;
                        //             this.move('tip', 'tiphead');
                        //         });
                        //         this.pdyd5 = true;
                        //         this.tipword = this.lang.ProcessParameterConfigure_HT_UnQualitiedReasonIntViewModel_SaveFailedRepeat;
                        //         return;
                        //     }
                        // }
                        for (let a1 = 0; a1 < this.sixData.length; a1++) {
                            if (
                                this.mewntchangedata.Number ==
                                this.sixData[a1].Number
                            ) {
                                this.newblue = false;

                                this.sixData[a1].Value = Number(this.sbvalue);
                                this.sixData[a1].Reason = this.sbreason;
                            }
                        }
                    }
                }
            }
        },
        addnewbluepre1() {
            if (!this.sbblue) {
                // this.tipword = '请选择布尔型识别值!';
                this.tipword = this.lang.ProcessParameterConfigure_HT_UnQualitiedReasonBoolViewModel_PSBooleanVariable
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
            if (!this.sbreason) {
                this.tipword = this.lang.ProcessParameterConfigure_HT_UnQualitiedReasonBoolViewModel_PEReason;
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
            if (this.radio == 2) {
                if (this.two == 1) {
                    console.log(this.ddd);
                    let a = {
                        IsReset: this.ddd,
                        Reason: this.sbreason,
                        TagName: this.sbblue,
                        Number: this.sixData.length + 1
                    };
                    if (this.sixData.length !== 0) {
                        this.sixData.push(a);

                        this.newblue = false;
                    } else {
                        this.sixData.push(a);

                        this.newblue = false;
                    }
                    console.log(this.sixData);
                } else if (this.two == 2) {
                    if (this.sixData.length !== 0) {
                        for (let a1 = 0; a1 < this.sixData.length; a1++) {
                            if (
                                this.mewntchangedata.Number ==
                                this.sixData[a1].Number
                            ) {
                                this.newblue = false;
                                this.sixData[a1].IsReset = this.ddd
                                    ? true
                                    : false
                                this.sixData[a1].TagName = this.sbblue
                                this.sixData[a1].Reason = this.sbreason;
                            }
                        }
                    }
                }
            }
        },
        delnewblue() {
            console.log(this.radio);
            this.a = 4;
            if (!this.mewntchangedata) {
                this.tipword = this.lang.ProcessParameterConfigure_HT_UnQualitiedReasonViewModel_PSFailureReason;
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
                this.deltrue = false;
                this.pdyd5 = true;
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
                if (this.radio == '1') {
                    this.tipword = this.lang.ProcessParameterConfigure_HT_UnQualitiedReasonViewModel_MessDeleteIntReason
                } else {
                    this.tipword = this.lang.ProcessParameterConfigure_HT_UnQualitiedReasonViewModel_MessDeleteBoolReason
                }
            }
        },
        look2() {
            this.one = 1;
            this.istwo = false;
             setTimeout(() => {
                            $('.look').css({
                         
                                left: `calc(50% - ${($('.look').width() / 2) *
                                    this.a11}px)`,
                                top: `calc(50% - ${($('.look').height() / 2) *
                                    this.a11}px)`
                            });
                             this.lookchange = true;
                            this.move('look', 'looktop');
                        });
          
            this.pdyd3 = true;
            console.log('1', this.bbb);
            this.addproject();
        },

        look3() {
            this.one = 1;
            this.istwo = this.lang.ProcessParameterConfigure_ProcessParameterConfigureUserControl_DataGrid_CompletionSignal
                   setTimeout(() => {
                            $('.look').css({
                               
                                left: `calc(50% - ${($('.look').width() / 2) *
                                    this.a11}px)`,
                                top: `calc(50% - ${($('.look').height() / 2) *
                                    this.a11}px)`
                            });
                             this.lookchange = true;
                            this.move('look', 'looktop');
                        });
            this.pdyd3 = true;
            this.addproject();
        },
        look() {
            this.one = 1;
            this.istwo = this.lang.ProcessParameterConfigure_ProcessParameterConfigureUserControl_DataGrid_QualifiedSignal
                  setTimeout(() => {
                            $('.look').css({
                                
                                left: `calc(50% - ${($('.look').width() / 2) *
                                    this.a11}px)`,
                                top: `calc(50% - ${($('.look').height() / 2) *
                                    this.a11}px)`
                            });
                             this.lookchange = true;
                            this.move('look', 'looktop');
                        });
            this.pdyd3 = true;
            this.addproject();
        },
        look4() {
            this.one = 2;

                   setTimeout(() => {
                            $('.look').css({
                             
                                left: `calc(50% - ${($('.look').width() / 2) *
                                    this.a11}px)`,
                                top: `calc(50% - ${($('.look').height() / 2) *
                                    this.a11}px)`
                            });
                             this.lookchange = true;
                            this.move('look', 'looktop');
                        });
            this.pdyd3 = true;
          
            this.addproject();
        },
        look6() {
            this.one = 3;

                  setTimeout(() => {
                            $('.look').css({
                              
                                left: `calc(50% - ${($('.look').width() / 2) *
                                    this.a11}px)`,
                                top: `calc(50% - ${($('.look').height() / 2) *
                                    this.a11}px)`
                            });
                             this.lookchange = true;
                            this.move('look', 'looktop');
                        });
            this.pdyd3 = true;
              let arr = [ "有符号8位整型", "无符号8位整型", "有符号16位整型", "无符号16位整型", "有符号32位整型", "无符号32位整型", "有符号64位整型", "无符号64位整型"]
                
            this.addproject(arr);
        },
        look5() {
            this.one = 4;
            this.pdyd3 = true;
                 setTimeout(() => {
                            $('.look').css({
                            
                                left: `calc(50% - ${($('.look').width() / 2) *
                                    this.a11}px)`,
                                top: `calc(50% - ${($('.look').height() / 2) *
                                    this.a11}px)`
                            });
                             this.lookchange = true;
                            this.move('look', 'looktop');
                        });
                   let arr = ['不限','二进制变量']
            this.addproject(arr);
        },
        look1() {
            this.one = 1;
            this.istwo = this.lang.ProcessParameterConfigure_ProcessParameterConfigureUserControl_DataGrid_AssociatedSignal
            if (this.twoObj.IsRelated) {
                this.pdyd3 = true;
                       setTimeout(() => {
                            $('.look').css({
                             
                                left: `calc(50% - ${($('.look').width() / 2) *
                                    this.a11}px)`,
                                top: `calc(50% - ${($('.look').height() / 2) *
                                    this.a11}px)`
                            });
                             this.lookchange = true;
                            this.move('look', 'looktop');
                        });
                     
                this.addproject();
            }
        },
        changeone() {
            if(!this.xggxshow){
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
                this.tipword =this.lang.NoOperationAuthority;
                return;
            }
            this.oneworkname = this.daiti
            let a = JSON.stringify(this.oneworkname);
            this.daiti = JSON.parse(a);
            
            this.onechange = 1;
            console.log("----", this.oneworkname)
            this.oneObj = this.oneworkname
            // if (this.oneworkname !== '') {
                setTimeout(() => {
                    $('.onework').css({
                        zoom: this.a11,
                        left: `calc(50% - ${($('.onework').width() / 2) * this.a11}px)`,
                        top: `calc(50% - ${($('.onework').height() / 2) * this.a11}px)`
                    });
                    this.onework  = true;
                    this.move('onework', 'oneworktop');
                })
                this.pdyd1 = true;
            // }
        },
        changethree() {
          this.threeObj.DataType = this.threeObj.Type
          console.log(this.projectchangedata)
             let xgdata = JSON.parse(JSON.stringify(this.threeObj))
                xgdata.ProjectName = xgdata.OriginalProjectName
            this.$axios({
                method: 'post',
                url: '/api/ProcessParameterConfigure/UpdateProject',
                data: xgdata
            }).then(res => {
                if (res.data.msg == '请求成功') {
                    this.tipword = res.data.data;
                    this.projectchange = false;
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
                    this.projectchangedata = this.threeObj;
                    this.pdyd5 = true;
                    this.twowork = false;
                    this.getthreedata();
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
                    this.pdyd5 = true;
                    this.tipword = res.data.msg;
                }
            });
            // this.$axios({
            //     method:'post',
            //     url:`/api/ProcessParameterConfigure/UpdateProject`,
            //     data:
            // }).then(res => {

            // }
        },
        tableRowClassName(row) {
            return 'row-bg';
        },
        cancel1() {
            this.lookchange = false;
        },
        addone() {
            if(!this.tjgxshow){
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
                this.tipword =this.lang.NoOperationAuthority;
                return;
            }
            
            this.onechange = 2;
            setTimeout(() => {
                $('.onework').css({
                    zoom: this.a11,
                    left: `calc(40% - ${($('.oneworktop').width() / 2) * this.a11}px)`,
                    top: `calc(40% - ${($('.oneworktop').height() / 2) * this.a11}px)`
                });
                this.onework  = true;
                this.move('onework', 'oneworktop');
            })
            this.pdyd1 = true;
            this.oneObj = '';
            this.oneworkname = '';
        },
        changetwo() {
            if(!this.xggwshow){
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
                this.tipword =this.lang.NoOperationAuthority;
                return;
            }
            if(this.tableData1.length === 0){
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
                this.tipword =this.lang.ProcessParameterConfigure_HT_ProcessParameterConfigureUserControlViewModel_SelectProcess;
                return;
            }
            
            this.onechange = 1;
            setTimeout(() => {
                $('.twowork ').css({
                    zoom: this.a11,
                    left: `calc(50% - ${($('.twowork ').width() / 2) * this.a11}px)`,
                    top: `calc(50% - ${($('.twowork ').height() / 2) * this.a11}px)`
                });
                this.twowork = true;
                this.move('twowork', 'twoworktop');
            });
            
            let a = JSON.stringify(this.twoworkdata);
            this.daiti1 = JSON.parse(a);
            let a1 = JSON.stringify(this.projectchangedata);
            this.twoObj = {...this.twoworkdata}
            this.ccc = this.twoObj.IsAbsolute;
            this.aaa = this.twoObj.IsAuto;
            this.bbb = this.twoObj.IsRelated;

            this.pdyd2 = true;
            this.daiti2 = JSON.parse(a1);
        },
        addtwo() {
             if(!this.tjgwshow){
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
                this.tipword =this.lang.NoOperationAuthority;
                return;
            }
            this.aaa = false;
            this.bbb = false;
            this.ccc = false;
            
            this.onechange = 2;
            setTimeout(() => {
                $('.twowork ').css({
                    zoom: this.a11,
                    left: `calc(50% - ${($('.twowork ').width() / 2) * this.a11}px)`,
                    top: `calc(50% - ${($('.twowork ').height() / 2) * this.a11}px)`
                });
                this.twowork = true;
                this.move('twowork', 'twoworktop');
            });
            this.pdyd2 = true;

            this.twoObj = {
                WID: '',
                StepName: '',
                IsAuto: false,
                ProductID: this.lang.ProcessParameterConfigure_HT_WorkStepSetting1ViewModel_Null,
                IsRelated: false,
                FinishTag1: this.lang.ProcessParameterConfigure_HT_WorkStepSetting1ViewModel_Null,
                FinishTag2: this.lang.ProcessParameterConfigure_HT_WorkStepSetting1ViewModel_Null,
                IsAbsolute: false,
                AbsoQualTag: this.lang.ProcessParameterConfigure_HT_WorkStepSetting1ViewModel_AbsolutelyQualified,
                IsQualTag: this.lang.ProcessParameterConfigure_HT_WorkStepSetting1ViewModel_Null,
                SID: ''
            };
        },
        cancel() {
            console.log(this.daiti, this.twoworkdata)
            this.oneworkname = this.daiti;
            if(!this.onework){
                this.twoworkdata = this.daiti1
                // this.twoworkdata.AbsoQualTag = this.daiti1.AbsoQualTag;
                // this.twoworkdata.FinishTag1 = this.daiti1.FinishTag1;
                // this.twoworkdata.FinishTag2 = this.daiti1.FinishTag2;
                // this.twoworkdata.FinishTagName1 = this.daiti1.FinishTagName1;
                // this.twoworkdata.FinishTagName2 = this.daiti1.FinishTagName2;
                // this.twoworkdata.FinishType = this.daiti1.FinishType;
                // this.twoworkdata.IntTypeTagName = this.daiti1.IntTypeTagName;
                // this.twoworkdata.IsAbsolute = this.daiti1.IsAbsolute;
                // this.twoworkdata.IsAuto = this.daiti1.IsAuto;
                // this.twoworkdata.IsQualTag = this.daiti1.IsQualTag;
                // this.twoworkdata.AbsoQualTag = this.daiti1.AbsoQualTag;
                // this.twoworkdata.IsQualitiedTagName = this.daiti1.IsQualitiedTagName;
                // this.twoworkdata.IsRelated = this.daiti1.IsRelated;
                // this.twoworkdata.ProductID = this.daiti1.ProductID;
                // this.twoworkdata.ProductIDTagName = this.daiti1.ProductIDTagName;
                // this.twoworkdata.QualitiedType = this.daiti1.QualitiedType;
                // this.twoworkdata.ReasonType = this.daiti1.ReasonType;
                // this.twoworkdata.StepName = this.daiti1.StepName;
            }
            if(this.projectchangedata && !this.onework){
                 this.projectchangedata = this.daiti2
                // this.projectchangedata.Type = this.daiti2.Type;
                // this.projectchangedata.Digit = this.daiti2.Digit;
                // this.projectchangedata.Lower = this.daiti2.Lower;
                // this.projectchangedata.ProjectName = this.daiti2.ProjectName;
                // this.projectchangedata.ProjectValueTagName = this.daiti2.ProjectValueTagName;
                // this.projectchangedata.Unit = this.daiti2.Unit;
                // this.projectchangedata.Upper = this.daiti2.Upper;
            }
           
            this.onework = false;
            this.twowork = false;
         
            this.unsixth = false;
            this.projectchange = false;
            this.someprochange = false;
        },
        cancel5() {
            this.newblue = false;
        },
        cancel51() {
            this.newblue = false;
        },
        mouseUpHandleelse1(event) {
            window.onmousemove = null;
            event.currentTarget.style.cursor = 'move';
        },
        mouseDownHandleelse1(event) {
            event.currentTarget.style.cursor = 'move';
            window.onmousemove = this.mouseMoveHandleelse1;
        },
        mouseMoveHandleelse1(event) {
            this.pdyd1 = false;
            let moveLeft = event.pageX - 350 + 'px';
            let moveTop = event.pageY - 30 + 'px';
            this.$refs.kongtiao1.style.left = moveLeft;
            this.$refs.kongtiao1.style.top = moveTop;
        },
        mouseUpHandleelse2(event) {
            window.onmousemove = null;
            event.currentTarget.style.cursor = 'move';
        },
        mouseDownHandleelse2(event) {
            event.currentTarget.style.cursor = 'move';
            window.onmousemove = this.mouseMoveHandleelse2;
        },
        mouseMoveHandleelse2(event) {
            this.pdyd2 = false;
            let moveLeft = event.pageX - 350 + 'px';
            let moveTop = event.pageY - 30 + 'px';
            this.$refs.kongtiao2.style.left = moveLeft;
            this.$refs.kongtiao2.style.top = moveTop;
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
            this.pdyd3 = false;
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
            console.log('sadasd');
            event.currentTarget.style.cursor = 'move';
            window.onmousemove = this.mouseMoveHandleelse4;
        },
        mouseMoveHandleelse4(event) {
            this.pdyd4 = false;
            let moveLeft = event.pageX - 400 + 'px';
            let moveTop = event.pageY - 30 + 'px';
            this.$refs.kongtiao4.style.left = moveLeft;
            this.$refs.kongtiao4.style.top = moveTop;
        },
        mouseUpHandleelse5(event) {
            window.onmousemove = null;
            event.currentTarget.style.cursor = 'move';
        },
        mouseDownHandleelse5(event) {
            event.currentTarget.style.cursor = 'move';
            window.onmousemove = this.mouseMoveHandleelse5;
        },
        mouseMoveHandleelse5(event) {
            let moveLeft = event.pageX - 250 + 'px';
            let moveTop = event.pageY - 30 + 'px';
            this.$refs.kongtiao5.style.left = moveLeft;
            this.$refs.kongtiao5.style.top = moveTop;
        },
        mouseUpHandleelse6(event) {
            window.onmousemove = null;
            event.currentTarget.style.cursor = 'move';
        },
        mouseDownHandleelse6(event) {
            console.log('sadasd');
            event.currentTarget.style.cursor = 'move';
            window.onmousemove = this.mouseMoveHandleelse6;
        },

        mouseMoveHandleelse6(event) {
            let moveLeft = event.pageX - 300 + 'px';
            let moveTop = event.pageY - 30 + 'px';
            this.$refs.kongtiao6.style.left = moveLeft;
            this.$refs.kongtiao6.style.top = moveTop;
        },
        mouseUpHandleelse7(event) {
            window.onmousemove = null;
            event.currentTarget.style.cursor = 'move';
        },
        mouseDownHandleelse7(event) {
            console.log('sadasd');
            event.currentTarget.style.cursor = 'move';
            window.onmousemove = this.mouseMoveHandleelse7;
        },
        mouseMoveHandleelse7(event) {
            let moveLeft = event.pageX - 660 + 'px';
            let moveTop = event.pageY - 30 + 'px';
            this.$refs.kongtiao7.style.left = moveLeft;
            this.$refs.kongtiao7.style.top = moveTop;
        },
        gaipre() {
            if (this.radio == '1') {
                console.log(this.sixData);
                let a = 0;
                for (a in this.sixData) {
                    if (!this.sixData[a].RID) {
                        this.sixData[a].RID = '00000000-0000-0000-0000-000000000000';
                    }
                }
                console.log(this.workproject)
                console.log(this.sbint)
                console.log(this.sixData)
                this.$axios({
                    method: 'post',
                    url: '/api/ProcessParameterConfigure/SaveUnQualInt',
                    data: {
                        SID: this.workproject,
                        Variable: this.sbint,
                        UnQualIntList: this.sixData
                    }
                }).then(res => {
                    console.log(res);
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
                    if (res.data.code == 0) {
                        this.tipword = res.data.data;
                        this.unsixth = false;
                    } else {
                        this.tipword = res.data.msg;
                    }
                });
            } else {
                let a = 0;
                for (a in this.sixData) {
                    if (!this.sixData[a].RID) {
                        this.sixData[a].RID = '00000000-0000-0000-0000-000000000000';
                    }
                    if (this.sixData[a].IsReset == this.lang.ProcessParameterConfigure_HT_ProcessParameterConfigureUserControlViewModel_Yes) {
                        this.sixData[a].IsReset = true;
                    } else if (this.sixData[a].IsReset == this.lang.ProcessParameterConfigure_HT_ProcessParameterConfigureUserControlViewModel_No) {
                        this.sixData[a].IsReset = false;
                    }
                }
                console.log(this.sixData);
                console.log(this.workproject);

                this.$axios({
                    method: 'post',
                    url: '/api/ProcessParameterConfigure/SaveUnQualBool',
                    data: {
                        SID: this.workproject,
                        UnQualBoolList: this.sixData
                    }
                }).then(res => {
                    console.log(res);
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
                    if (res.data.code == 0) {
                        this.tipword = res.data.data;
                        this.unsixth = false;
                    } else {
                        this.tipword = res.data.msg;
                    }
                });
            }
        },
        handleRowChange(row, event, column) {
            this.oneworkduan = row.WID;
            this.daiti = row.OriginalWorkName;
            this.oneworkname = row.OriginalWorkName;
            this.gettwodata();
        },
        handleRowChange5(a) {
            this.wantdata = a;
            console.log(a);
            this.projectchangedata.DataType = a.DateType;
        },
        handleRowChange1(row, event, column) {
            this.nowtwo = row.Number - 1;
            this.workproject = row.SID;
            this.getthreedata();
            this.daiti1 = row;
            this.twoworkdata = row;
            this.twoworkdata.ProductID = row.ProductIDTagName === this.lang.ProcessParameterConfigure_WorkStepSetting1_AutomaticGenerated ? this.lang.ProcessParameterConfigure_HT_WorkStepSetting1ViewModel_Null :  row.ProductIDTagName;
            this.twoworkdata.FinishTag1 = row.FinishTagName1;
            this.twoworkdata.FinishTag2 = row.FinishTagName2;
            if (row.FinishType == 1) {
                this.twoworkdata.IsRelated = false;
            } else {
                this.twoworkdata.IsRelated = true;
            }
            this.bbb = this.twoworkdata.IsRelated;
            if (row.QualitiedType == 1) {
                this.twoworkdata.AbsoQualTag = this.lang.ProcessParameterConfigure_HT_WorkStepSetting1ViewModel_AbsolutelyQualified;
                this.twoworkdata.IsAbsolute = true;
            } else if (row.QualitiedType == 2) {
                this.twoworkdata.AbsoQualTag = this.lang.ProcessParameterConfigure_HT_WorkStepSetting1ViewModel_AbsolutelyUnqualified
                this.twoworkdata.IsAbsolute = true;
            } else {
                this.twoworkdata.AbsoQualTag = this.lang.ProcessParameterConfigure_HT_WorkStepSetting1ViewModel_AbsolutelyQualified
                this.twoworkdata.IsAbsolute = false;
            }
            this.ccc = this.twoworkdata.IsAbsolute;

            if (row.ProductIDTagName == this.lang.ProcessParameterConfigure_WorkStepSetting1_AutomaticGenerated) {
                this.twoworkdata.IsAuto = true;
            } else {
                this.twoworkdata.IsAuto = false;
            }
            this.aaa = this.twoworkdata.IsAuto;
            if(!this.twoworkdata.IsRelated){
                this.twoworkdata.FinishTag2 = ''
            }
            // this.twoworkdata.IsQualTag = row.IsQualitiedTagName;

            //         this.aaa = this.twoworkdata.IsAuto;
            console.log(this.aaa);
            console.log(row.ProductIDTagName);
            // console.log(this.bbb);
            // console.log(this.twoworkdata.IsAuto);
            // console.log(this.ccc);
        },
        handleRowChange2(row, event, column) {
            this.projectchangedata = {...row};
            console.log(this.projectchangedata);
            this.PID = row.PID;
            console.log(row);
        },
        mouseUpHandleelse8(event) {
            window.onmousemove = null;
            event.currentTarget.style.cursor = 'move';
        },
        mouseDownHandleelse8(event) {
            event.currentTarget.style.cursor = 'move';
            window.onmousemove = this.mouseMoveHandleelse8;
        },
        mouseMoveHandleelse8(event) {
            this.pdyd5 = false;
            let moveLeft = event.pageX - 250 + 'px';
            let moveTop = event.pageY - 30 + 'px';
            this.$refs.kongtiao8.style.left = moveLeft;
            this.$refs.kongtiao8.style.top = moveTop;
        },
        sc() {
            this.twoObj.IsAuto = !this.twoObj.IsAuto;
            this.aaa = this.twoObj.IsAuto;
            console.log(this.twoObj);
        },
        gl() {
            
            this.twoObj.IsRelated = !this.twoObj.IsRelated;
            this.bbb = this.twoObj.IsRelated;
            console.log(this.twoObj);
        },
        jd() {
            this.twoObj.IsAbsolute = !this.twoObj.IsAbsolute;
            this.ccc = this.twoObj.IsAbsolute;
        },
        getonedata() {
            var $this = this
            this.$axios
                .post(`/api/ProcessParameterConfigure/QueryWorkSections`)
                .then(res => {
                    $this.tableData = res.data.data;
                    $this.oneworkduan = $this.tableData[0].WID;
                    $this.tdone = $this.oneworkduan;
                    $this.oneworkname = $this.tableData[0].OriginalWorkName;
                    $this.daiti = res.data.data[0].OriginalWorkName
                })
                .then(() => {
                    this.gettwodata();
                });
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
                this.tipword = this.lang.DataGrid_Reaction_HT_PEAPositiveInteger
                return;
            } else {
                if (
                    this.nowpage !== 1 &&
                    this.nowpage !== this.pageDate.TotalPage
                ) {
                    if (
                        this.nowpage < 1 ||
                        this.nowpage > this.pageDate.TotalPage
                    ) {
                        this.tipword = this.lang.DataGrid_Reaction_HT_PEThePageNumber
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
            this.pageDate.PageIndex = this.nowpage;
            this.watchdata();
        },
        start() {
            this.pageDate.PageIndex = 1;
            // this.onetable();
            this.watchdata();
        },
        abck() {
            if (this.pageDate.LastEnabled) {
                this.pageDate.PageIndex--;

                this.watchdata();
            }
            console.log(this.pageDate.LastEnabled);
            // this.onetable();
        },
        next() {
            if (this.pageDate.NextEnabled) {
                this.pageDate.PageIndex++;
                this.watchdata();

                // this.onetable();
            }
            console.log('sss', this.pageDate);
        },
        end() {
            this.pageDate.PageIndex = this.pageDate.TotalPage;
            this.watchdata();
            // this.onetable();
        },
        gettwodata() {
            console.log('asd', this.oneworkduan);
            var $this = this
            this.$axios
                .post(
                    `/api/ProcessParameterConfigure/QueryWorkSteps?id=${this.oneworkduan}`
                )
                .then(res => {
                    console.log("saddsadsa",JSON.parse(JSON.stringify(res)))
                    $this.tableData1 = res.data.data;
                    if (res.data.data.length == 0) {
                        $this.workproject = '';
                    } else {
                        $this.workproject = $this.tableData1[0].SID;
                        $this.twoworkdata = $this.tableData1[0];
                       this.daiti1 = $this.tableData1[0]
                        $this.twoworkdata.ProductID = $this.tableData1[0].ProductIDTagName === this.lang.ProcessParameterConfigure_WorkStepSetting1_AutomaticGenerated ? this.lang.ProcessParameterConfigure_HT_WorkStepSetting1ViewModel_Null : $this.tableData1[0].ProductIDTagName;
                        $this.twoworkdata.FinishTag1 = $this.tableData1[0].FinishTagName1;
                        $this.twoworkdata.FinishTag2 = $this.tableData1[0].FinishTagName2;
                        if ($this.tableData1[0].FinishType == 1) {
                            $this.twoworkdata.IsRelated = false;
                        } else {
                            $this.twoworkdata.IsRelated = true;
                        }
                        $this.bbb = $this.twoworkdata.IsRelated;
                        if ($this.tableData1[0].QualitiedType == 1) {
                            $this.twoworkdata.AbsoQualTag = $this.lang.ProcessParameterConfigure_HT_WorkStepSetting1ViewModel_AbsolutelyQualified
                            $this.twoworkdata.IsAbsolute = true;
                        } else {
                            $this.twoworkdata.AbsoQualTag = $this.lang.ProcessParameterConfigure_HT_WorkStepSetting1ViewModel_AbsolutelyUnqualified
                            $this.twoworkdata.IsAbsolute = false;
                        }

                        if ($this.twoworkdata.ProductIDTagName == this.lang.ProcessParameterConfigure_WorkStepSetting1_AutomaticGenerated ||$this.twoworkdata.ProductIDTagName == ''||$this.twoworkdata.ProductIDTagName =='Automatic generated') {
                            $this.twoworkdata.IsAuto = true;
                        } else {
                              $this.twoworkdata.IsAuto = false;
                          
                        }
                        $this.ccc = $this.twoworkdata.IsAbsolute;
                        $this.aaa = $this.twoworkdata.IsAuto;
                        $this.twoworkdata.IsQualTag = $this.tableData1[0].IsQualitiedTagName;
                        // this.twoworkdata.IsAuto = this.tableData1[0].IsAbsolute;
                        // this.twoworkdata.ProductID = this.tableData1[0].ProductIDTagName;
                        // this.twoworkdata.IsRelated = this.tableData1[0].FinishType;
                    }
                })
                .then(() => {
                    this.getthreedata();
                });
        },
        getthreedata() {
            console.log(this.workproject)
            this.$axios.post(`/api/ProcessParameterConfigure/QueryWorkProjects?id=${this.workproject}`)
            .then(res => {
                console.log("数值",res);
                this.tableData2 = res.data.data;
                this.projectchangedata = {...this.tableData2[0]} || {};
                this.daiti2 = {...this.tableData2[0]} || {};
                this.PID = '';
                console.log(this.workproject)
                console.log(this.twoworkdata)
            })
            .catch(() => {
                this.tableData2 = [];
            });
        }
    },
    mounted() {
               this.a11 = Number(parseFloat(window.screen.width / 1920).toFixed(2));
        if (this.a11 < 1) {
            this.a11 = 0.67;
        }
          setTimeout(() => {
            let a = this.a11 * 130 + 'px';
            $('.container').css({
                height: `calc(100% - ${a})`,
                marginTop:100*this.a11 + 'px'
            });
        });
        this.getonedata();
        this.tableRowClassName();
    }
};
</script>
<style lang="scss">
.container{
    &.blackBlueBg{
        .lookselect,.Unqualifiedsetinon{
            .el-table__body-wrapper{
                background-color: #1A2544!important;
                
                tr{
                    td{
                        background-color: #1A2544!important;
                        border-bottom-color: #445992!important;
                    }
                }
            }
        }
        .el-table{
            tr{
                &.current-row{
                    &>td{
                        background-color: #273E7E!important;
                        border-color: transparent;
                    }
                }
                td{
                    background-color: #0E1732;
                    border-color: transparent;
                    border-bottom-color: #1D2B55;
                }
            }
        }
        .el-table--border th.gutter:last-of-type{
            background-color: #344c8f;
            border-bottom-color: #344c8f;
        }
        .el-table--striped .el-table__body tr.el-table__row--striped td{
            background-color: #121C3A;
            border-bottom-color: #1D2B55;
        }
        .el-table--enable-row-hover .el-table__body tr:hover > td{
            background-color: #2A3A65;
        }
        .el-checkbox__label{
            color: #fff;
        }
        .el-checkbox__input.is-checked + .el-checkbox__label{
            color: #fff;
        }
        .el-checkbox__inner::after{
            content: '';
            border-color: #84D063;
        }

        .el-checkbox__input.is-checked .el-checkbox__inner{
            background-color: #18254E;
            border-color: #445992;
        }
        .el-checkbox__input.is-focus .el-checkbox__inner{
            border-color: #B2C0E4;
        }

        .Unqualifiedsetinon{
            .el-radio__input{
                & + .el-radio__label{
                    color: #fff;
                }

                .el-radio__inner{
                    background: #18254E;
                    border-color: #445992;
                }
            }

            .add{
                background-color: transparent!important;
                border: 1px solid #46BE05!important;
                color: #46BE05!important;
            }
            .change{
                background-color: transparent!important;
                border: 1px solid #FDA917!important;
                color: #FDA917!important;
            }
            .del{
                background-color: #4F5871!important;
                border: 1px solid #4F5871!important;
                color: #fff!important;
            }
        }
    }
}
</style>
<style lang="scss" scoped>
.spword1 {
    top: -130px !important;
}
.bluer {
    margin: 10px;
    margin-left: 90px;
}
.textar1 {
    height: 150px !important;
}
.bluerspan {
    width: 70px;
    height: 40px;
    display: inline-block;
    text-align: center !important;
    line-height: 35px;
    background-color: #fff;
    border-radius: 5px;
    margin-left: 10px;
    border: 1px solid #4a79ee;
    color: #4a79ee;
    cursor: pointer;
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
.addsomepro {
    width: 1310px;
    height: 820px;
    left: 250px;
    background-color: #eeeeee;
    position: fixed;
    top: 110px;
    z-index: 80999999;
    box-shadow: 0px 0px 8px black;
    .table {
        width: calc(100% - 46px) !important;
        margin-left: 23px;
        border: 1px solid #ccc;
    }
    .btn {
        width: 100%;
        height: 50px;
        position: relative;
        padding: 10px 0px;
    }
    .add {
        width: 120px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        border-radius: 5px;
        position: absolute;
        background-color: #386df0;
        margin-left: 450px;
        cursor: pointer;
        font-size: 16px;
    }
    .remove {
        font-size: 16px;
        width: 120px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        border-radius: 5px;
        position: absolute;
        background-color: #999999;
        margin-left: 580px;
        cursor: pointer;
    }
    .addsomeprohead {
        width: 100%;
        height: 60px;
        text-align: center;
        line-height: 60px;
        font-size: 18px;
        background-color: #386df0;
        position: relative;
        color: #ffffff;
        span {
            font-size: 18px;
        }
        .page1 {
            padding: 0px 20px;
            font-size: 12px !important;
        }
        img {
            z-index: 12999999;
            width: 24px;
            cursor: pointer;
            height: 24px;
            position: absolute;
            right: 20px;
            bottom: 0px;
            top:0;
            margin:auto;
        }
    }
    .lookselect {
        padding: 10px 60px 0px 60px;
        position: relative;
        height: calc(100% - 60px);
    }
    .onecentent {
        width: 100%;
        height: 350px;
        border: 1px solid #cccccc;
        background-color: #f4f4f4;
    }
    .twocontent {
        width: 100%;
        height: 300px;
        border: 1px solid #cccccc;
        background-color: #f4f4f4;
        .selectword {
            color: #386df0;
            height: 40px !important;
            text-align: left;
            font-size: 18px;
            padding-left: 20px;
            line-height: 40px !important;
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
        z-index: 999;
        background-color: #386df0;
        border-radius: 4px;
        color: #fff;
        cursor: pointer;
        font-size: 14px;
        right: 70px;
        bottom: 10px;
    }
    .addsomeprotop {
        width: 100%;
        height: 60px;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 11999999;
    }
    .search {
        text-align: left;
        color: #818181;
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
            border: 1px solid #ccc;
        }
        .inputname {
            margin: 0px 10px;
            width: 600px;
        }
        .lookfor {
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
    }
}

.changpro {
    width: 600px;
    height: 532px;
    background-color: #eeeeee;
    position: fixed;
    top: 250px;
    box-shadow: 0px 0px 8px black;
    left: 660px;
    z-index: 28999999;
    position: fixed;
    input {
        width: 350px;
        height: 45px;
        margin-left: 20px;
        border: none;
        text-indent: 1em;
        border: 1px solid #ccc;
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
        bottom: 40px;
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
        bottom: 40px;
    }
    .inp {
        .select {
            width: 70px;
            height: 40px;
            display: inline-block;
            text-align: center;
            line-height: 40px;
            background-color: #fff;
            border-radius: 5px;
            margin-left: 10px;
            border: 1px solid #4a79ee;
            color: #4a79ee;
            cursor: pointer;
        }
        input {
            width: 270px;
        }
    }
   
    span {
        font-size: 14px;
        width: 170px;
        text-align: right;
        display: inline-block;
    }
    .changecontent {
        width: 100%;
        height: calc(100% - 60px);
        padding: 30px 0px 0px 0px;
    }
    .changestion {
        margin-top: 10px;
    }
    .changehead {
        width: 100%;
        height: 60px;
        text-align: center;
        line-height: 60px;
        font-size: 18px;
        background-color: #386df0;
        position: relative;
        color: #ffffff;
        span {
            font-size: 18px;
        }
        img {
            z-index: 12999999;
            cursor: pointer;
            width: 24px;
            height: 24px;
            position: absolute;
            right: 20px;
            bottom: 15px;
        }
    }
    .changetop {
        width: 100%;
        height: 50px;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 11999999;
        height: 60px;
     
    }
    .changehead{
   span{
           width: 120px !important;
           text-align: center !important; 
        }
    }
}
.newblue {
    z-index: 28999999;
    position: fixed;
    width: 600px;
    height: 400px;
    background-color: #eeeeee;
    position: fixed;
    top: 250px;
    box-shadow: 0px 0px 8px black;
    left: 660px;
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
    .newbluecontent {
        width: 100%;
        height: calc(100% - 60px);
        font-size: 14px;
        .newbluesetion {
            padding: 30px 70px;
        }
        .spword {
            position: relative;
            top: -140px;
        }
        input {
            text-indent: 1em;
            margin-left: 20px;
            width: 365px;
            height: 44px;
            border: none;
            border: 1px solid #cccccc;
        }
        textarea {
            width: 365px;
            height: 173px;
            text-indent: 1em;
            margin-left: 20px;
            border: none;
            border: 1px solid #cccccc;
        }
        span {
            display: inline-block;
            width: 70px;
            text-align: right;
        }
        .top {
            margin-top: 10px;
        }
    }
    .newbluehead {
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
            cursor: pointer;
            height: 24px;
            position: absolute;
            right: 20px;
            bottom: 15px;
        }
    }
    .newbluetop {
        width: 100%;
        height: 50px;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 11999999;
    }
}
.Unqualified {
    width: 800px;
    height: 500px;
    background-color: #eeeeee;
    position: fixed;
    top: 200px;
    box-shadow: 0px 0px 8px black;
    left: 560px;
    z-index: 25999999;
    .Unqualifiedhead {
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
            cursor: pointer;
            height: 24px;
            position: absolute;
            right: 20px;
            bottom: 15px;
        }
    }
    .Unqualifiedtop {
        width: 100%;
        height: 50px;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 11999999;
    }
    .Unqualifiedcontent {
        width: 100%;
        height: calc(100% - 60px);
        position: relative;
        .Unqualifiedsetinon {
            position: absolute;
            width: 680px;
            height: 340px;
            left: 0;
            right: 0;
            top: 30px;
            margin: auto;
            background-color: #f4f4f4;
            border: 1px solid #ccc;
            padding: 20px;
            .table1 {
                width: 100%;
                height: 268px;
                margin-top: 10px;
                border: 1px solid #ccc;
            }
            .table2 {
                width: 100%;
                height: 218px;

                margin-top: 10px;
                border: 1px solid #ccc;
            }
        }
        .btn {
            position: absolute;
            width: 100px;
            height: 30px;
            text-align: center;
            line-height: 30px;
            border-radius: 5px;
            cursor: pointer;
        }
        .add {
            top: 0;
            background-color: #fff;
            border: 1px solid #46be05;
            color: #46be05;
            top: 15px;
            right: 240px;
        }
        .change {
            top: 0;
            background-color: #fff;
            border: 1px solid #fda100;
            color: #fda100;
            top: 15px;
            right: 130px;
        }
        .unsix {
            margin-top: 20px;
            font-size: 14px;
            input {
                width: 160px;
                height: 30px;
                margin-left: 10px;
            }
            .select {
                width: 100px;
                height: 30px;
                display: inline-block;
                text-align: center;
                line-height: 30px;
                background-color: #fff;
                border-radius: 5px;
                margin-left: 10px;
                border: 1px solid #4a79ee;
                color: #4a79ee;
                cursor: pointer;
            }
        }
        .del {
            top: 0;
            background-color: #aaaaaa;
            border: 1px solid #aaaaaa;
            color: #f2f2f2;
            top: 15px;
            right: 20px;
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
            right: 170px;
            bottom: 10px;
        }
        .pre {
            width: 100px;
            height: 36px;
            text-align: center;
            line-height: 36px;
            position: absolute;
            right: 60px;
            background-color: #386df0;
            border-radius: 4px;
            color: #fff;
            cursor: pointer;
            font-size: 14px;

            bottom: 10px;
        }
    }
}
.newtxtselect {
    color: #4270e4 !important;
    border: 1px solid #4270e4 !important;
    background-color: #fff !important;
}
.page {
    width: 100%;
    height: 50px;
    // padding: 20px;
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
            bottom: 0px;
            top:0px;
            margin:auto;
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
            right: 60px;
            bottom: 10px;
        }
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
                border: 1px solid #ccc;
            }
            .inputname {
                margin: 0px 10px;
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
        width: calc(100% - 46px) !important;
        margin-left: 23px;
        border: 1px solid #ccc;
    }
}
.spanlf {
    position: relative;
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
    z-index: 99999999;
    position: fixed;
    top: 0;
    left: 0;
}
.cover2 {
    width: 100%;
    height: 100%;
    z-index: 19999999;
    position: fixed;
    top: 0;
    left: 0;
}
.cover3 {
    width: 100%;
    height: 100%;
    z-index: 29999999;
    position: fixed;
    top: 0;
    left: 0;
}
.cover4 {
    width: 100%;
    height: 100%;
    z-index: 27999999;
    position: fixed;
    top: 0;
    left: 0;
}
.cover5 {
    width: 100%;
    height: 100%;
    z-index: 24999999;
    position: fixed;
    top: 0;
    left: 0;
}
.cover6 {
    width: 100%;
    height: 100%;
    z-index: 27999999;
    position: fixed;
    top: 0;
    left: 0;
}
.cover7 {
    width: 100%;
    height: 100%;
    z-index: 24999999;
    position: fixed;
    top: 0;
    left: 0;
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
.twowork {
    position: fixed;
    z-index: 20999999;
    overflow: hidden;
    box-shadow: 0px 0px 8px black;
    background-color: #eeeeee;
    width: 640px;
    height: 586px;
    top: 170px;
    left: 640px;
    select {
        height: 40px;
        text-indent: 1em;
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
    }
    .twoworkcontent {
        width: 100%;
        padding: 28px 0px 0px 74px;
        height: calc(100% - 60px);
        span {
            font-size: 14px;
            width: 60px;
            text-align: right;
            margin-right: 20px;
            display: inline-block;
        }
        input {
            width: 400px;
            border: none;
            border: 1px solid #cccccc;
            text-indent: 1em;
            height: 40px;
        }
        .inp {
            margin-top: 15px;
            display: flex;
            align-items: center;
        }
        .inp1 {
            position: relative;
            input {
                width: 330px;
            }
            .select {
                position: absolute;
                right: 60px;
                color: #4270e4;
                border: 1px solid #4270e4;
                border-radius: 5px;
                text-align: center;
                line-height: 36px;
                margin-left: 10px;
                cursor: pointer;
                width: 67px;
                display: inline-block;
                height: 36px;
                background-color: #fff;
            }
        }
    }
    .txtselect {
        position: absolute;
        color: #f7f7f7;
        font-size: 16px !important;
        border-radius: 5px;
        text-align: center !important;
        line-height: 36px;
        margin-left: 10px;
        cursor: pointer;
        width: 67px !important;
        display: inline-block;
        height: 36px;
        background-color: #bbbbbb;
    }
    .oneworkhead {
        background-color: #386df0;
        width: 100%;
        height: 60px;
        line-height: 60px;
        color: #fff;
        text-align: center;
        font-size: 18px;
        position: relative;
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
    .twoworktop {
        position: absolute;
        width: 100%;
        height: 60px;
    }
    .txt {
        width: 210px !important;
        margin-left: 15px;
    }
}

.container {
    // position: fixed;
    // top: 100px;
    height: calc(100% - 130px);
    background-color: #ececec;
    padding: 20px;
    width: 100%;

    &.blackBlueBg{
        background-color: #06091F;

        .table{
            background-color: #081027;

            .up{
                background-color: transparent;
                border-color: #5C6A95;
            }
            
            .firsthead{
                color: #4270E4;
            }
            .firsttable{
                border-color: #1E244B;
                background: #081027;
            }
            .firstselect{
                background: #0B1530;
                border: 1px solid #38415A;

                .firstadd{
                    color: #46BE05;
                    border-color: #46BE05;
                    background-color: transparent;
                }
                .firstchange{
                    color: #FDAE22;
                    border-color: #FDAE22;
                    background-color: transparent;
                }
                .nosix{
                    color: #4270E4;
                    border-color: #4270E4;
                    background-color: transparent;
                }
                .firstdel{
                    background: #4F5871;
                    border-color: #4F5871;
                }
            }
        }

        .onework,.twowork,.look,.newblue,.changpro{
            color: #fff;
            background: #233056;

            .select{
                background-color: transparent;
                border-color: #fff;
                color: #fff;
            }
        }

        .page{
            .btn{
                &.nopage{
                    border-color: #2E437E!important;
                    color: #8798C9!important;
                }
            }
        }

        input,textarea{
            color: #C6CAD8;
            background: #1D2846;
            border-color: #445992;

            &:focus{
                border-color: #B2C0E4;
            }

            &:disabled{
                background-color: #35446D;
                border-color: #445992;
                color: #8798C9;
            }

            &::-webkit-input-placeholder{
                color: #8798C9;
            }
        }

        .lookselect{
            background: #28355B;
            border-color: #445992;

            .search{
                color: #fff;
            }

            .table{
                border-color: transparent;
                background-color: #28355B;
                padding: 0;
            }

            select{
                background: #1D2846;
                border-color: #445992;
                color: #C6CAD8;

                &:focus{
                    border-color: #B2C0E4;
                }
            }
            .lookfor1{
                background-color: transparent;
                color:#fff;
                border-color: #fff;
            }
        }

        .addsomepro{
            background: #222D50;

            .onecentent,.twocontent{
                background: #28355B;
                border: 1px solid #445992;

                .selectword{
                    color: #4270E4;
                }
            }
        }

        .twowork{
            .twoworkcontent{
                .inp1{
                    .select{
                        background-color: transparent;
                        border-color: #fff;
                        color: #fff;
                    }
                }
                .txtselect{
                    color: #fff;
                }
                .newtxtselect{
                    background-color: transparent!important;
                    border-color: #fff!important;
                    color: #fff!important;
                }
            }
        }

        .bluerspan{
            background-color: transparent;
            border-color: #fff;
            color: #fff;
        }

        .tran-part{
            color: #fff!important;
            border: 0!important;
        }

        .Unqualified{
            background: #233056;

            .Unqualifiedsetinon{
                background: #28355B;
                border-color: #445992;
                color: #fff;

                .table1,.table2{
                    border-color: transparent;
                }

                .select{
                    background-color: transparent;
                    border-color: #fff;
                    color: #fff;
                }
            }
        }
    }

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
            width: 58px;
            height: 27px;
            background-color: #fff;
            border: 1px solid #cccccc;
            border-radius: 4px;
            position: relative;
            margin-left: 10px;
            img {
                position: absolute;
                top: 0;
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
        line-height: 35px;
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
        line-height: 35px;
        // width: 110px;
        padding: 0 12px;
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
            cursor: pointer;
            position: absolute;
            width: 10px;
            left: 10px;
            top: 13px;
            height: 10px;
        }
    }
    .firstchange {
        cursor: pointer;
        margin-left: 10px;
        margin-top: 8px;
        height: 40px;
        line-height: 35px;
        width: 110px;
        border-radius: 4px;
        border: 2px solid #fcae38;
        background-color: #fff;
        color: #fcae38;
        font-weight: 600;
        float: left;
        text-align: center;
    }
    .firstsoming {
        // width: 140px;
    }
    .nosix {
        cursor: pointer;
        margin-left: 10px;
        margin-top: 8px;
        height: 40px;
        line-height: 35px;
        // width: 150px;
        padding: 0 12px;
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
    .w {
        width: 100%;
        height: 75%;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 12px;
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
        bottom: 13px;
        // margin-left: 35px;
        right: 0;
        left: 0;
        margin: auto;
        height: 30px;
        background-color: #f3e3ad;
    }
    .delclass {
        width: 330px;
        line-height: 30px;
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
select[disabled] {
    background-color: #ebebe4 !important;
}
.addsomeprotop{
    img{
        top:0 !important;
        bottom: 0;
        margin:auto;
    }
}
.page {
    .btn {
        cursor: pointer;
    }
    width: 100%;
    height: 64px;
    // line-height: 20px;
    align-items: center;
    color: #ababab;
    padding: 0 20px;
    font-size: 14px;
    overflow: hidden;
    display: flex;
    .nopage {
        border: 2px solid #fed286 !important;
        color: #fed286;
    }
    .pageword {
        float: left;
        flex: 1.1;
        transform-origin: left top;
    }
    .pageoperation {
        transform-origin: right top !important;
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
                border: 1px solid #ccc;
                height: 30px;
                text-align: center;
                color: #fda100;
            }
        }
    }
}
.el-table .row-bg {
    background: #5cb85c;
}
.colordiv {
    background-color: #d9dbde !important;
}
.colortip {
    background-color: #efeff0 !important;
}
.cp {
    position: relative;
    // top: -8px;
}
.fcolor {
    color: #000 !important;
}
.img {
    cursor: pointer;
}
.table1 {
    input {
        width:calc(100% - 2px) !important;
    }
}
.cover12 {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 99999999;
}
</style>