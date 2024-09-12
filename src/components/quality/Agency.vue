<!--
 * @Description: 质量管理界面
 * @Date: 2019-11-24 14:31:33
 * @Author: 随风
 * @LastEditors: Tao
 * @LastEditTime: 2020-08-06 18:09:35
 -->
<template>
    <div class="public-table" >
          			<div class="loadcover" element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(0, 0, 0, 0.4)"  v-loading="this.$store.state.isShow" v-show="this.$store.state.isShow" style="position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;"></div>
        <div class="search-container" ref="search" >
            <my-search
                @setParams="setParams"
                @change="change"
                @confirm="confirm"
                @feixi="feixi"
                @deldata="deldata"
            ></my-search>
        </div>
        <div class="look lookq" ref="kongtiao5" v-show="offdecive1" :style="{zoom: zoomValue}" >
            <div
                class="looktop"
               
            ></div>
            <div
                class="lookhead"
                :class="[{colordiv:$store.state.color=='grey'},{fcolor:$store.state.color=='grey'}]"
            >
                {{lang.QualityManage_ItemEditWindow_RuleOfDiscrimination}}
                <img
                    :src="no2"
                    alt
                    class="no"
                    @click="cancel11"
                    v-if="$store.state.color=='grey'"
                />
                <img :src="no" alt class="no" @click="cancel11" v-else />
            </div>
            <div class="lookcontent">
                <div class="lookselect">
                    <div class="table1">
                        <el-table
                            highlight-current-row
                            :data="projectlistdata"
                            height="100%"
                            border
                            style="width: 100%"
                            @select="select"
                            ref="www"
                            @select-all="selectall"
                            :header-cell-style="[{background:(($store.state.color=='grey')?'#D9DBDE':'#dcf0f9')},{color:(($store.state.color=='grey')?'#000':'#5883e7')}, {'border-left':'1px solid #cccccc',height:'50px',padding:'0'}]"
                        >
                            <template slot="empty">
                                <span>{{lang.SCMSConsoleWebApiMySql_NoData}}</span>
                            </template>
                            <el-table-column type="selection" :width="60*zoomValue" fixed></el-table-column>
                            <el-table-column prop="RuleName" :label="lang.QualityManage_RuleChoseWindow_DataGrid_RuleNumber" :show-overflow-tooltip="true" width="200"></el-table-column>
                            <el-table-column prop="RuleChose" :label="lang.QualityManage_RuleChoseWindow_DataGrid_CurrentRules" :show-overflow-tooltip="true" width="400"></el-table-column>
                            <el-table-column prop="RuleDec" :label="lang.QualityManage_RuleChoseWindow_DataGrid_RuleBasis" :show-overflow-tooltip="true" width="400"></el-table-column>
                        </el-table>
                    </div>
                </div>
            </div>
            <div class="wechange" @click="pdchnage">{{lang.QualityManage_RuleChoseWindow_Modify}}</div>
            <div class="cancel" @click="cancel11">{{lang.PopupCommon_Cancel}}</div>
            <div class="pre" @click="pre11">{{lang.PopupCommon_Sure}}</div>
        </div>
        <div class="cover5" v-if="offdecive"></div>
        <div class="look lookw" ref="kongtiao5" v-show="offdecive"  :style="{zoom: zoomValue}" >
            <div
                class="looktop"

            ></div>
            <div
                class="lookhead"
                :class="[{colordiv:$store.state.color=='grey'},{fcolor:$store.state.color=='grey'}]"
            >
                {{lang.QualityManage_ChoseProcessItem_SelectItem}}
                 <img
                    :src="no2"
                    alt
                    class="no"
                    @click="cancel11"
                    v-if="$store.state.color=='grey'"
                />
                <img :src="no" alt class="no" @click="cancel11" v-else />
            </div>
            <div class="lookcontent">
                <div class="lookselect">
                    <div class="search">
                        <span class="keyword">{{lang.FormulaManage_AddProject_Keyword}}</span>
                        <input type="text" :placeholder="lang.FormulaManage_AddProject_Keyword" v-model="projectkeyword" />
                        <span class="lookfor1" @click="lookforsearch">{{lang.FormulaManage_AddProject_Select}}</span>
                    </div>
                    <div class="table">
                        <el-table
                            :data="projectlistdata"
                            height="100%"
                            border
                            style="width: 100%"
                            @row-click="handleRowChange1"
                            highlight-current-row
                            :header-cell-style="[{background:(($store.state.color=='grey')?'#D9DBDE':'#dcf0f9')},{color:(($store.state.color=='grey')?'#000':'#5883e7')}, {'border-left':'1px solid #cccccc',height:'50px',padding:'0'}]"
                        >
                            <template slot="empty">
                                <span>{{lang.SCMSConsoleWebApiMySql_NoData}}</span>
                            </template>
                            <el-table-column prop="ProjectName" :label="lang.QualityManage_ChoseProcessItem_ProjectName" :show-overflow-tooltip="true"></el-table-column>
                            <el-table-column prop="ProjectValueTagName" :label="lang.QualityManage_ChoseProcessItem_Name" :show-overflow-tooltip="true"></el-table-column>
                        </el-table>
                    </div>
                    <div class="pages-container">
                        <div class="page" style="font-size: 13px" >
                            <div class="pageword">
                                {{lang.DataGrid_Reaction_HT_ATotalOf}}
                                <span>{{pageDate1.togesize}}</span>{{lang.DataGrid_Reaction_HT_RecordsAndTheCurrent}}
                                <span>{{pageDate1.pageIndex}}</span>{{lang.DataGrid_Reaction_HT_Page}}
                                <span>{{pageDate1.togeIndex}}</span>{{lang.DataGrid_Reaction_HT_RecordsAnd}}
                                <span>{{pageDate1.pagesize}}</span>{{lang.DataGrid_Reaction_HT_PerPage}}
                            </div>
                            <div class="pageoperation">
                                <span class="btn" @click="start1">{{lang.DataGrid_Reaction_FirstPage}}</span>
                                <span class="btn" :class="{nopage:aaa1}" @click="abck1">{{lang.DataGrid_Reaction_LastPage}}</span>
                                <span class="btn" :class="{nopage:bbb1}" @click="next1">{{lang.DataGrid_Reaction_NextPage}}</span>
                                <span class="btn" @click="end1">{{lang.DataGrid_Reaction_EndPage}}</span>
                                <div class="inputnumber">
                                    {{lang.DataGrid_Reaction_The}}
                                    <input type="text" v-model="nowpage1" /> {{lang.DataGrid_Reaction_Page}}
                                </div>

                                <span class="btn" @click="jump1">{{lang.DataGrid_Reaction_TurnPage}}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="cancel" @click="cancel11">{{lang.PopupCommon_Cancel}}</div>
            <div class="pre" @click="pre1">{{lang.PopupCommon_Sure}}</div>
        </div>
        <div class="cover4" v-if="changetrue"></div>
        <div class="sestion sestion1" ref="kongtiao1" v-show="changetrue"  :style="{zoom: zoomValue}" >
            <div class="sestionheader" :class="{colordiv:$store.state.color=='grey'}">
                <div
                    class="sestionheader1"
                 
                ></div>
                <span
                    class="head"
                    v-if="sestion == 1"
                    :class="{fcolor:$store.state.color=='grey'}"
                >{{lang.QualityManage_QualityManageUserControl_Add}}</span>
                <span
                    class="head"
                    v-else-if="sestion == 2"
                    :class="{fcolor:$store.state.color=='grey'}"
                >{{lang.QualityManage_QualityManageUserControl_Modify}}</span>
                <span
                    class="head"
                    v-else-if="sestion == 3"
                    :class="{fcolor:$store.state.color=='grey'}"
                >{{lang.QualityManage_QualityManageUserControl_Modify}}</span>
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
                <div class="view">
                    <span>{{lang.QualityManage_ItemEditWindow_SamplingMode}}</span>
                    <template>
                        <el-radio v-model="radio" label="1">{{lang.QualityManage_ItemEditWindow_Manual}}</el-radio>
                        <el-radio v-model="radio" label="2">{{lang.QualityManage_ItemEditWindow_Automatic}}</el-radio>
                    </template>
                </div>
                <div class="overflow">
                    <div class="fl">
                        <div class="margin">
                            <span>{{lang.QualityManage_ItemEditWindow_TestingItems}}</span>
                            <input type="text" v-if="sestion == 1" v-model="meaddtable.PrName" />
                            <input type="text" v-else-if="sestion == 2" v-model="meaddtable.PrName" />
                            <input type="text" v-else-if="sestion == 3" v-model="meaddtable.PrName" />
                        </div>
                        <div class="margin">
                            <span>{{lang.QualityManage_ItemEditWindow_SpecificationUpper}}</span>
                            <input type="text" v-if="sestion == 1" v-model="meaddtable.PrUpLimit" />
                            <input
                                type="text"
                                v-else-if="sestion == 2"
                                v-model="meaddtable.PrUpLimit"
                            />
                            <input
                                type="text"
                                v-else-if="sestion == 3"
                                v-model="meaddtable.PrUpLimit"
                            />
                        </div>
                        <div class="margin">
                            <span>{{lang.QualityManage_ItemEditWindow_SpecificationLower}}</span>
                            <input type="text" v-if="sestion == 1" v-model="meaddtable.PrDownLimit" />
                            <input
                                type="text"
                                v-else-if="sestion == 2"
                                v-model="meaddtable.PrDownLimit"
                            />
                            <input
                                type="text"
                                v-else-if="sestion == 3"
                                v-model="meaddtable.PrDownLimit"
                            />
                        </div>
                        <div class="margin">
                            <span class="me">{{lang.QualityManage_ItemEditWindow_TargetValue}}</span>
                            <input type="text" v-if="sestion == 1" v-model="meaddtable.PrgoalValue" />
                            <input
                                type="text"
                                v-else-if="sestion == 2"
                                v-model="meaddtable.PrgoalValue"
                                disabled
                            />
                            <input
                                type="text"
                                v-else-if="sestion == 3"
                                v-model="meaddtable.PrgoalValue"
                            />
                        </div>
                    </div>
                    <div class="zr">
                        <div class="margin">
                            <span class="me">{{lang.QualityManage_ItemEditWindow_GraphClass}}</span>
                            <select name id v-model="dt " v-if="sestion == 1">
                                <option
                                    :value="item"
                                    v-for="(item,index) in supermin"
                                    :key="index"
                                >{{item}}</option>
                            </select>
                            <select name id v-model="dt " v-else-if="sestion == 2">
                                <option
                                    :value="item"
                                    v-for="(item,index) in supermin"
                                    :key="index"
                                >{{item}}</option>
                            </select>
                            <select name id v-model="dt " v-else-if="sestion == 3">
                                <option
                                    :value="item"
                                    v-for="(item,index) in supermin"
                                    :key="index"
                                >{{item}}</option>
                            </select>
                        </div>
                        <div class="margin">
                            <span>{{lang.QualityManage_ItemEditWindow_VariableAssociation}}</span>
                            <div v-if="sestion == 1" class="input1">
                                <span>{{meaddtable.PrVariableName}}</span>
                                <div class="inputimg" @click="getdevice" v-if="radio == '2'">
                                    <img :src="diji" alt />
                                </div>
                                <div class="inputimg" v-if="radio == '1'">
                                    <img :src="diji" alt />
                                    <div class="zimg"></div>
                                </div>
                            </div>
                            <div v-else-if="sestion == 2" class="input1">
                                <span>{{meaddtable.PrVariableName}}</span>
                                <div class="inputimg" v-if="radio == '2'">
                                    <img :src="diji" alt />
                                </div>
                                 <div class="inputimg" v-if="radio == '1'">
                                    <img :src="diji" alt />
                                    <div class="zimg"></div>
                                </div>
                            </div>
                            <div v-else-if="sestion == 3" class="input1">
                                <span>{{meaddtable.PrVariableName}}</span>
                                <div class="inputimg" @click="getdevice" v-if="radio == '2'">
                                    <img :src="diji" alt />
                                </div>
                                 <div class="inputimg" v-if="radio == '1'">
                                    <img :src="diji" alt />
                                    <div class="zimg"></div>
                                </div>
                            </div>
                        </div>
                        <div class="margin">
                            <span>{{lang.QualityManage_ItemEditWindow_SubgroupCapacity}}</span>
                            <select v-model="meaddtable.PrSampleNumber" v-if="sestion == 1">
                                <option
                                    v-for="(item,index) in person1"
                                    :key="index"
                                    :value="item"
                                >{{item}}</option>
                            </select>
                            <select
                                v-model="meaddtable.PrSampleNumber"
                                v-if="sestion == 2"
                                disabled
                            >
                                <option
                                    v-for="(item,index) in person1"
                                    :key="index"
                                    :value="item"
                                >{{item}}</option>
                            </select>
                            <select v-model="meaddtable.PrSampleNumber" v-if="sestion == 3">
                                <option
                                    v-for="(item,index) in person1"
                                    :key="index"
                                    :value="item"
                                >{{item}}</option>
                            </select>
                        </div>
                        <div class="margin">
                            <span>{{lang.QualityManage_ItemEditWindow_RuleOfDiscrimination}}</span>
                            <div v-if="sestion == 1" class="input1">
                                <span>{{meaddtable.PrRule}}</span>
                                <div class="inputimg" @click="getdevice1">
                                    <img :src="diji" alt />
                                </div>
                            </div>
                            <div v-else-if="sestion == 2" class="input1">
                                <span>{{meaddtable.PrRule}}</span>
                                <div class="inputimg">
                                    <img :src="diji" alt />
                                </div>
                            </div>
                            <div v-else-if="sestion == 3" class="input1">
                                <span>{{meaddtable.PrRule}}</span>
                                <div class="inputimg" @click="getdevice1">
                                    <img :src="diji" alt />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="Preservation" v-if="sestion == 1 || sestion == 3" @click="nopre">{{lang.PopupCommon_Save}}</div>

                <div class="cancel" @click="cancel" v-if="sestion == 1 || sestion == 3">{{lang.PopupCommon_Cancel}}</div>
            </div>
        </div>
        <div class="table-container table-container1">
            <el-table
                
                ref="multipleTable"
                :data="table"
                stripe
                border
                height="100%"
                tooltip-effect="dark"
                :style="{
                    fontSize: zoomValue * 15 + 'px',
                    width: '100%',
                }"
                @row-click="handleRowChange11"
                highlight-current-row
                :row-style="{ height: 50 * zoomValue + 'px' }"
                :header-cell-style="{background:($store.state.color=='grey')?'#D9DBDE':'#5a6c98',color:($store.state.color=='grey')?'#000':'#fff','border-left':'1px solid #cccccc',height:'50px',padding:'0',height: 50 * zoomValue + 'px'}"
            >
                <template slot="empty">
                    <span>{{lang.SCMSConsoleWebApiMySql_NoData}}</span>
                </template>
                <el-table-column :label="lang.QualityManage_QualityManageUserControl_DataGrid_IdNumber" :width="150*zoom" prop="item.PrNumber" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="item.PrName" :label="lang.QualityManage_QualityManageUserControl_DataGrid_TestingItems" :width="200*zoom" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="item.PrMethod" :label="lang.QualityManage_QualityManageUserControl_DataGrid_SamplingMode"  :width="200*zoom" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="item.PrType" :label="lang.QualityManage_QualityManageUserControl_DataGrid_ControlChartType"  :width="200*zoom" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="item.PrSampleNumber" :label="lang.QualityManage_QualityManageUserControl_DataGrid_SubgroupQuantity"  :width="200*zoom" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="item.PrUpLimit" :label="lang.QualityManage_QualityManageUserControl_DataGrid_SpecificationUpper"  :width="200*zoom" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="item.PrgoalValue" :label="lang.QualityManage_QualityManageUserControl_DataGrid_TargetValue"  :width="300*zoom" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="item.PrDownLimit" :label="lang.QualityManage_QualityManageUserControl_DataGrid_SpecificationLower"  :width="300*zoom" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="item.PrRule" :label="lang.QualityManage_QualityManageUserControl_DataGrid_RuleOfDiscrimination"  :width="300*zoom" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="item.UpdateUser" :label="lang.QualityManage_QualityManageUserControl_DataGrid_UpdateUser"  :width="300*zoom" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="item.UpdateTime" :label="lang.QualityManage_QualityManageUserControl_DataGrid_UpdateTime"  :width="300*zoom" :show-overflow-tooltip="true"></el-table-column>
            </el-table>
        </div>
        <div class="pages-container" ref="page" >
            <div class="page">
                <div class="pageword">
                    {{lang.DataGrid_Reaction_HT_ATotalOf}}
                    <span>{{pageDate.togesize}}</span>{{lang.DataGrid_Reaction_HT_RecordsAndTheCurrent}}
                    <span>{{pageDate.pageIndex}}</span>{{lang.DataGrid_Reaction_HT_Page}}
                    <span>{{pageDate.togeIndex}}</span>{{lang.DataGrid_Reaction_HT_RecordsAnd}}
                    <span>{{pageDate.pagesize}}</span>{{lang.DataGrid_Reaction_HT_PerPage}}
                </div>
                <div class="pageoperation">
                    <span class="btn" @click="start">{{lang.DataGrid_Reaction_FirstPage}}</span>
                    <span class="btn" :class="{nopage:aaa}" @click="abck">{{lang.DataGrid_Reaction_LastPage}}</span>
                    <span class="btn" :class="{nopage:bbb}" @click="next">{{lang.DataGrid_Reaction_NextPage}}</span>
                    <span class="btn" @click="end">{{lang.DataGrid_Reaction_EndPage}}</span>
                    <div class="inputnumber">
                        {{lang.DataGrid_Reaction_The}}
                        <input type="text" v-model="nowpage" /> {{lang.DataGrid_Reaction_Page}}
                    </div>

                    <span class="btn" @click="jump">{{lang.DataGrid_Reaction_TurnPage}}</span>
                </div>
            </div>
        </div>
        <div class="tip" ref="kongtiao2" v-show="tipchange"  :style="{zoom: zoomValue}">
           <div
                class="tiphead"
                style="position:absolute;width: 380px;height: 40px;"
            ></div>
            <div
                class="tiptop"
                @mousedown="mouseDownHandleelse2($event)"
                @mouseup="mouseUpHandleelse2($event)"
            >
                <img :src="gth" alt />
                <span>{{lang.HT_MessageBoxCaption_Tips}}</span>
            </div>
            <div class="tipcontanin">
                <div class="tipword" :class="w2" v-if="deltrue">{{tipword}}</div>
                <div class="w" v-if="w1">{{tipword}}</div>
                <div class="tipdetermine" @click="tip1" v-if="deltrue">{{lang.MessageBox_Confrim}}</div>
                <div class="delclass" v-if="!deltrue">
                    <div class="one" @click="no1">{{lang.MessageBox_NO}}</div>
                    <div class="two" @click="yes1">{{lang.MessageBox_YES}}</div>
                </div>
            </div>
        </div>
        <div class="pychange" ref="kongtiao22" v-show="py" :style="{zoom: zoomValue}">
            <div
                class="pytop"
            ></div>
            <div class="pyhead" :class="{colordiv:$store.state.color=='grey'}">
                <img :src="no2" alt class="no" @click="cancelq" v-if="$store.state.color=='grey'" />
                <img :src="no" alt class="no" @click="cancelq" v-else />
                <span :class="{fcolor:$store.state.color=='grey'}">{{lang.QualityManage_ModifyRuleWindow_ModifyInterface}}</span>
            </div>
            <div class="pycontent">
                <div class="mt">
                    <span v-if="arr.length >= 1">[m]</span>
                    <input type="text" v-model="arr[0]" v-if="arr.length >= 1" />
                </div>
                <div class="mt">
                    <span v-if="arr.length >= 2">[n]</span>
                    <input type="text" v-model="arr[1]" v-if="arr.length >= 2" />
                </div>
                <div class="mt">
                    <span v-if="arr.length >= 3">[k]</span>
                    <input type="text" v-model="arr[2]" v-if="arr.length >= 3" />
                    <div class="Preservationq" @click="Preservationq">{{lang.PopupCommon_Sure}}</div>
                    <div class="cancelq" @click="cancelq">{{lang.PopupCommon_Cancel}}</div>
                </div>
            </div>
        </div>
        <div class="cover2" v-if="tipchange"></div>
    </div>
</template>

<script>
import MySearch from '../public/plansearch10.vue';
import MyTable from '../public/table012.vue';
import MyPage from '../public/Pages.vue';
export default {
    props: ['table', 'd'],
    components: {
        MySearch
        // MyPage
    },
    data() {
        return {
            py: false,
            arr: ['1', '2', '3'],
            wantchange: '',
            wantword: '',
            wantword1: '',
            person1: [
                2,
                3,
                4,
                5,
                6,
                7,
                8,
                9,
            ],
            deltrue: true,
            pdyd1: true,
            pdyd2: true,
            pdyd3: true,
            pdyd4: true,
            tipword: '',
            pydata: [],
            tipchange: false,
            gth: require('../../assets/images/gth.png'),
            searchList: [
                // {
                // 	title: '报警时间范围：',
                // 	model: 'value1',
                // 	type: 'datetimerange'
                // },
            ],
            w2: false,
            searchData: {
                argAlarmArray: '',
                argDevice: '',
                argAlarmType: '',
                argStatus: '',
                argStartTime: '',
                argEndTime: '',
                argKeyword: '',
                argPageSize: 50,
                argPageIndex: 1
            },
            tableHead: {
                AlarmTime: '编号',
                AlarmTime1: '检测项目',
                AlarmTagName: '采样方式',
                AlarmTagAddress: '控制图类型',
                AlarmDevice: '子组数量',
                AlarmType: '规格上限',
                AlarmGroup: '目标值',
                AlarmGroup1: '规格下限',
                AlarmGroup2: '判异规则',
                AlarmGroup3: '更新用户',
                AlarmGroup4: '更新时间'
            },
            data: [],
            radio: '2',
            daochu: '',
            pageData: {
                PageSize: 50,
                TotalCount: 0,
                TotalPage: 0,
                PageIndex: 1,
                LastEnabled: false,
                NextEnabled: false
            },
            nowIndex1: 1,
            pageDate1: {
                pageIndex: 1,
                pagesize: 50,
                togeIndex: 0,
                togesize: 0
            },
            aaa1: false,
            bbb1: false,
            nowpage1: 1,
            offdecive: false,
            deviceList: [],
            confirmdata: '',
            length: [],
            enddata: {},
            time4: '',
            w1: false,
            w: '',
            nowIndex: 1,
            pageDate: {
                pageIndex: 1,
                pagesize: 50,
                togeIndex: 0,
                togesize: 0
            },

            aaa: false,
            bbb: false,
            supermin: ['XR','IMR','XS'],
            nowpage: 1,
            sestion: 1,
            projectlistdata: '',
            projectlistdata1: '',
            projectkeyword: '',
            no: require('../../assets/images/no.png'),
            no2: require('../../assets/images/no2.png'),
            dt:'XR',
            meaddtable: {
                PrDownLimit: '1',
                PrId: '0ae4ac52-88ee-44de-94fa-e433ffda1562',
                PrLineId: '4f45e76d-854b-4120-8740-9c735bf1016c',
                PrMethod: '手动',
                PrName: '123',
                PrNumber: '20200212140005',
                PrRule: 'R4',
                PrSampleNumber: '1',
                PrType: 'XR',
                PrUpLimit: '123',
                PrVariableId: '00000000-0000-0000-0000-000000000000',
                PrVariableName: 'c',
                PrWorkshopId: null,
                PrgoalValue: '12',
                UpdateTime: '2020-02-12 14:00:05',
                UpdateUser: 'Guest'
            },
            offdecive1: false,
            wantchange3: '',
            changetrue: false,
            diji: require('../../assets/images/icon_diji.png'),
            lang: JSON.parse(localStorage.getItem('languages'))[localStorage.getItem('currentLang')],
            zoomValue: 0,
            zoom: 0
        };
    },
    watch:{
        dt(val){
            if(val == 'IMR'){
                this.meaddtable.PrSampleNumber = 1;
                this.person1 = [1]
            }else if(val == 'XR'){
                this.person1 = [2,
                3,
                4,
                5,
                6,
                7,
                8,
                9];
                    this.meaddtable.PrSampleNumber = 2;
            }else if(val == 'XS'){
                  this.person1 = [ 10,
                11,
                12,
                13,
                14,
                15,
                16,
                17,
                18,
                19,
                20,
                21,
                22,
                23,
                24,
                25];
                    this.meaddtable.PrSampleNumber = 10;
            }
        }
    },
    created() {
        this.$nextTick(() => {
            this.zoomValue = Number(parseFloat(window.screen.width/1920).toFixed(2)) <= 0.8 ? 0.8 : Number(parseFloat(window.screen.width/1920).toFixed(2))
            this.$refs.search.style.zoom = this.zoomValue
            this.$refs.page.style.zoom = this.zoomValue
        })
        this.getLangData()
        console.log('sadas');
    },
    methods: {
        getLangData() {
            this.tableHead =  {
                AlarmTime: this.lang.QualityManage_QualityManageUserControl_DataGrid_IdNumber,
                AlarmTime1: this.lang.QualityManage_QualityManageUserControl_DataGrid_TestingItems,
                AlarmTagName: this.lang.QualityManage_QualityManageUserControl_DataGrid_SamplingMode,
                AlarmTagAddress: this.lang.QualityManage_QualityManageUserControl_DataGrid_ControlChartType,
                AlarmDevice: this.lang.QualityManage_QualityManageUserControl_DataGrid_SubgroupQuantity,
                AlarmType: this.lang.QualityManage_QualityManageUserControl_DataGrid_SpecificationUpper,
                AlarmGroup: this.lang.QualityManage_QualityManageUserControl_DataGrid_TargetValue,
                AlarmGroup1: this.lang.QualityManage_QualityManageUserControl_DataGrid_SpecificationLower,
                AlarmGroup2: this.lang.QualityManage_QualityManageUserControl_DataGrid_RuleOfDiscrimination,
                AlarmGroup3: this.lang.QualityManage_QualityManageUserControl_DataGrid_UpdateUser,
                AlarmGroup4: this.lang.QualityManage_QualityManageUserControl_DataGrid_UpdateTime
            }
        },
        deldata(a) {
            
            console.log(this.wantchange)
              if(!a){
                   setTimeout(() => {
this.tipchange = true;
    this.move('tip', 'tiphead');
                    });
                this.pdyd3 = true;
                this.tipword = this.lang.NoOperationAuthority;
                return
            }
            if (!this.wantchange) {
                 setTimeout(() => {
this.tipchange = true;
    this.move('tip', 'tiphead');
                    });
                this.pdyd3 = true;
                this.tipword = this.lang.QualityManage_HT_QualityManageUserControlViewModel_PSItemDelete;
            } else {
                this.$axios
                    .post(
                        `/api/QualityManage/tecpkItem?prid=${this.wantchange.item.PrId}`
                    )
                    .then(res => {
                        console.log(res);
                        this.wantchange = ''
                        this.getonedata1();
                    });
            }
        },
        cancelq() {
            this.py = false;
        },
        Preservationq() {
            if (this.arr.length == 3) {
                console.log(this.arr);
                this.$axios({
                    url:'/api/QualityManage/ModifyRuleList',
                    method:'post',
                    data:{
                        name:this.pydata[0].RuleName,
                        type:this.pydata[0].RuleType,
                        m_Nvalue:this.arr[1],
                        m_Kvalue:this.arr[2]
                    }
                }).then(res => {
                       
                        console.log(res);
                        if(res.data.code === 1){
                             setTimeout(() => {
this.tipchange = true;
    this.move('tip', 'tiphead');
                    });
                            this.tipword = res.data.msg
                        }else{
                            this.py = false;
                            this.getdevice3();
                        }
                    });
            } else if (this.arr.length == 2) {
                this.$axios({
                      url:'/api/QualityManage/ModifyRuleList',
                      method:'post',
                    data:{
                        name:this.pydata[0].RuleName,
                        type:this.pydata[0].RuleType,
                        m_Mvalue:this.arr[0],
                        m_Nvalue:this.arr[1],
                        m_Kvalue:'1'
                    }
                }).then(res => {
                        console.log(res);
                        if(res.data.code === 1){
                             setTimeout(() => {
this.tipchange = true;
    this.move('tip', 'tiphead');
                    });
                            this.tipword = res.data.msg
                        }else{
                            this.py = false;
                            this.getdevice3();
                        }
                    });
                console.log(this.pydata[0]);
            } else {
                this.$axios({
                      url:'/api/QualityManage/ModifyRuleList',
                      method:'post',
                    data:{
                        name:this.pydata[0].RuleName,
                        type:this.pydata[0].RuleType,
                        m_Mvalue:this.arr[0],
                        m_Nvalue:'1',
                        m_Kvalue:'1'
                    }
                }).then(res => {
                        console.log(res);
                        if(res.data.code === 1){
                             setTimeout(() => {
this.tipchange = true;
    this.move('tip', 'tiphead');
                    });
                            this.tipword = res.data.msg
                        }else{
                            this.py = false;
                            this.getdevice3();
                        }
                    });
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
        feixi(a) {
              if(!a){
                   setTimeout(() => {
this.tipchange = true;
    this.move('tip', 'tiphead');
                    });
                this.pdyd3 = true;
                this.tipword = this.lang.NoOperationAuthority;
                return
            }
            if (!this.wantchange) {
                this.tipword = this.lang.QualityManage_HT_QualityManageUserControlViewModel_PSCurveItemToView;
                 setTimeout(() => {
this.tipchange = true;
    this.move('tip', 'tiphead');
                    });
                this.pdyd3 = true;
            } else {
                if (this.wantchange.item.PrMethod == this.lang.QualityManage_HT_ItemEditWindowViewModel_Manual) {
                    this.w2 = true;
                    this.pdyd3 = true;
                     setTimeout(() => {
this.tipchange = true;
    this.move('tip', 'tiphead');
                    });
                    this.tipword = this.lang.QualityManage_HT_SampleChoseUserControlViewModel_ManualModeImportPoints;
                } else {
                    this.wantchange3 = JSON.stringify(this.wantchange.item);
                    this.$store.state.change = 1;
                    if(this.$store.state.changeid == this.wantchange.item.PrId){
                      this.$store.state.pdid = true;
                    }else{
                        this.$store.state.pdid = false;
                    }
                    this.$store.state.changeid = this.wantchange.item.PrId;
               
                    this.$router.push({
                        path: '/cpk',
                        query: { id: this.wantchange3 }
                    });
                }
            }
        },
        lookforsearch() {
            this.$axios
                .post(`/api/QualityManage/QueryProcessItem`)
                .then(res => {
                    this.projectlistdata1 = res.data.data;
                    let i = this.projectlistdata1;
                    let a = 0;
                    let reg = new RegExp(this.projectkeyword);

                    this.projectlistdata = [];
                    for (a in i) {
                        if (this.projectkeyword !== '') {
                            console.log(i[a].ProjectName);
                            if (
                                reg.test(i[a].ProjectName) ||
                                reg.test(i[a].ProjectValueTagName)
                            ) {
                                console.log('1111');
                                this.projectlistdata.push(i[a]);
                            }
                        } else {
                            this.projectlistdata = res.data.data;
                        }
                    }
                    this.pageDate1.togesize = this.projectlistdata.length;
                    this.pageDate1.togeIndex = Math.ceil(
                        this.projectlistdata.length / 50
                    );
                    let aa = this.nowIndex1 - 1;
                    if (aa * 50 + 50 > this.pageDate1.togesize) {
                        let b = this.pageDate1.togesize;
                        this.pageDate1.pageIndex = this.nowIndex1;
                    } else {
                        let b = this.nowIndex1 * 50 + 50;
                        this.pageDate1.pageIndex = this.nowIndex1;
                        this.projectlistdata = this.projectlistdata.splice(
                            aa * 50,
                            b
                        );
                    }
                    if (this.nowIndex1 >= this.pageDate1.togeIndex) {
                        this.aaa1 = false;
                    } else {
                        this.aaa1 = true;
                    }
                    if (this.nowIndex1 < this.pageDate1.togeIndex) {
                        this.bbb1 = false;
                    } else {
                        this.bbb1 = true;
                    }
                    this.nowpage1 = 1;
                    console.log(this.projectlistdata1);
                    console.log(this.projectlistdata);
                });
        },
        handleRowChange1(row, event, column) {
            this.wantword = row;
        },
        handleRowChange11(row, event, column) {
            this.wantchange = row;
            this.dt = row.item.PrType;
            console.log(this.wantchange);
        },
        select(row, event, column) {
            console.log(row, event, column)
            this.pydata = row;
            let a = 0;
            let b = [];
            for (a = 0; a < this.projectlistdata.length; a++) {
                b.push(this.projectlistdata[a].RuleName);
            }
            this.pydata = this.pydata.sort((a1, b1) => {
                return b.indexOf(a1.RuleName) - b.indexOf(b1.RuleName);
            });
            console.log(row);
            console.log(this.pydata);
            console.log(this.projectlistdata);
        },
        selectall(row, event, column) {
            this.pydata = row;
        },
        pre1() {
            if(this.wantword == ''){
                 setTimeout(() => {
this.tipchange = true;
    this.move('tip', 'tiphead');
                    });
                this.pdyd3 = true;
                this.tipword = this.lang.CruxParameterConfigure_SelectVariableView_PleaseSelectVariable
                return
            }
            this.meaddtable.PrVariableName = this.wantword.ProjectValueTagName;
            this.meaddtable.PrVariableId = this.wantword.SID;
            this.offdecive = false;
        },
        pre11() {
            let i = 0;
            let c = '';
            console.log(this.pydata)
            if(this.pydata.length === 0){
                this.tipword = this.lang.QualityManage_HT_RuleChoseWindowViewModel_PsRuleOfJudgment
                 setTimeout(() => {
this.tipchange = true;
    this.move('tip', 'tiphead');
                    });
                this.pdyd3 = true;
                return 
            }
            if (!this.meaddtable.PrRule) {
                for (i in this.pydata) {
                    c = c + ',' + this.pydata[i].RuleName;
                }
                c = c.substr(1);
                this.meaddtable.PrRule = '';
                this.meaddtable.PrRule = c;
                this.pydata = [];
            } else {
                for (i in this.pydata) {
                    c = c + ',' + this.pydata[i].RuleName;
                }
                this.meaddtable.PrRule = '';
                this.meaddtable.PrRule = this.meaddtable.PrRule + c;
                this.pydata = [];
            }

            if (this.meaddtable.PrRule.substr(0, 1) == ',') {
                this.meaddtable.PrRule = this.meaddtable.PrRule.substr(1);
            }
            this.offdecive1 = false;
        },
        cancel() {
            this.changetrue = false;
        },
        getdevice() {
            this.$axios
                .post(`/api/QualityManage/QueryProcessItem`)
                .then(res => {
                    console.log(res);
                    this.projectlistdata1 = res.data.data;
                    this.projectlistdata = res.data.data;
                     setTimeout(() => {
this.offdecive = true;
    this.move('lookw', 'looktop');
                    });
                    this.pdyd2 = true;
                    this.selectword3 = false;
                    this.projectkeyword = '';
                    this.pageDate1.togesize = this.projectlistdata.length;
                    this.pageDate1.togeIndex = Math.ceil(
                        this.projectlistdata.length / 50
                    );
                    let a = this.nowIndex1 - 1;
                    if (a * 50 + 50 > this.pageDate1.togesize) {
                        let b = this.pageDate1.togesize;
                        this.pageDate1.pageIndex = this.nowIndex1;
                    } else {
                        let b = this.nowIndex1 * 50 + 50;
                        this.pageDate1.pageIndex = this.nowIndex1;
                        this.projectlistdata = this.projectlistdata.splice(
                            a * 50,
                            b
                        );
                    }
                    if (this.nowIndex1 <= 1) {
                        this.aaa1 = true;
                    } else {
                        this.aaa1 = false;
                    }
                    if (this.nowIndex1 < this.pageDate1.togeIndex) {
                        this.bbb1 = false;
                    } else {
                        this.bbb1 = true;
                    }
                    this.nowpage1 = 1;
                    console.log(this.projectlistdata1);
                    console.log(this.nowIndex1);
                    console.log(this.projectlistdata);
                });
        },
        getdevice3() {
            this.$axios.post(`/api/QualityManage/LoadRuleList`).then(res => {
                console.log(res);
                this.projectlistdata = res.data.data;
                this.projectlistdata1 = res.data.data;
                 setTimeout(() => {
this.offdecive1 = true;
    this.move('lookq', 'looktop');
                    });
                this.pdyd2 = true;
                this.selectword3 = false;
                this.projectkeyword = '';
                let i = 0;
                let j = 0;
                let a = [];
                for (j = 0; j < this.pydata.length; j++) {
                    a.push(this.pydata[j].RuleName);
                }
                this.pydata = [];
                this.$nextTick(function() {
                    this.projectlistdata.forEach(row => {
                        for (i in a) {
                            if (a[i] == row.RuleName) {
                                console.log(row);
                                this.pydata.push(row);
                                this.$refs.www.toggleRowSelection(row);
                            }
                        }
                    });
                });
            });
        },
        getdevice1() {
            this.$axios.post(`/api/QualityManage/LoadRuleList`).then(res => {
                console.log(res);
                this.projectlistdata = res.data.data;
                this.projectlistdata1 = res.data.data;
                 setTimeout(() => {
this.offdecive1 = true;
    this.move('lookq', 'looktop');
                    });
                this.pdyd2 = true;
                this.selectword3 = false;
                this.projectkeyword = '';
                let a = this.meaddtable.PrRule.split(',');

                let i = 0;
                this.$nextTick(function() {
                    this.projectlistdata.forEach(row => {
                        for (i in a) {
                            if (a[i] == row.RuleName) {
                                console.log(row);
                                this.pydata.push(row);
                                this.$refs.www.toggleRowSelection(row);
                            }
                        }
                    });
                });
            });
        },
        confirm(a) {
            if(!a){
                 setTimeout(() => {
this.tipchange = true;
    this.move('tip', 'tiphead');
                    });
                this.pdyd3 = true;
                this.tipword = this.lang.NoOperationAuthority;
                return
            }
            if (!this.wantchange) {
                 setTimeout(() => {
this.tipchange = true;
    this.move('tip', 'tiphead');
                    });
                this.pdyd3 = true;
                this.tipword = this.lang.QualityManage_HT_QualityManageUserControlViewModel_PSItemThatNeedsToBeModified;
            } else {
                this.meaddtable = {...this.wantchange.item};
                // this.meaddtable.OriginalPrName = this.wantchange.OriginalPrName
                this.meaddtable.PrName = this.wantchange.OriginalPrName
                //重置参数值
                this.dt = this.wantchange.item.PrType;
                this.meaddtable.PrSampleNumber = this.wantchange.item.PrSampleNumber;
                if (this.meaddtable.PrMethod == this.lang.QualityManage_HT_ItemEditWindowViewModel_Automatic) {
                    this.radio = '2';
                } else {
                    this.radio = '1';
                }
                 setTimeout(() => {
this.changetrue = true;
    this.move('sestion1', 'sestionheader1');
                    });
                console.log(this.wantchange.item)
                this.pdyd1 = true;
                this.sestion = 3;
            }
        },
        start() {
            this.nowIndex = 1;
            this.getonedata1();
        },
        abck() {
            if (1 < this.nowIndex) {
                this.nowIndex--;
                this.getonedata1();
            }
        },
        jump() {
            if (this.nowpage <= this.pageDate.togeIndex) {
                this.nowIndex = this.nowpage;
                this.getonedata1();
            } else {
                if (!this.isPositiveInteger(this.nowpage)) { 
                     setTimeout(() => {
this.tipchange = true;
    this.move('tip', 'tiphead');
                    });
                    this.tipword = this.lang.RoleManage_HT_PEAPositiveInteger;
                    return
                }
                  setTimeout(() => {
this.tipchange = true;
    this.move('tip', 'tiphead');
                    });
                this.tipword = this.lang.DataGrid_Reaction_HT_PEThePageNumber;
                return;
            }
        },
        next() {
            if (this.pageDate.togeIndex > this.nowIndex) {
                this.nowIndex++;
                this.getonedata1();
            }
        },
        end() {
            this.nowIndex = this.pageDate.togeIndex;
            this.getonedata1();
        },
        start1() {
            this.nowIndex1 = 1;
            this.getdevice();
        },
        abck1() {
            if (1 < this.nowIndex1) {
                this.nowIndex1--;
                this.getdevice();
            }
        },
        isPositiveInteger(s) {
            //是否为正整数
            var re = /^[0-9]+$/;
            return re.test(s);
        },
        jump1() {
            if (this.nowpage1 <= this.pageDate1.togeIndex) {
                this.nowIndex1 = this.nowpage1;
                this.getdevice();
            } else {
                if (!this.isPositiveInteger(this.nowpage1)) { 
                   setTimeout(() => {
this.tipchange = true;
    this.move('tip', 'tiphead');
                    });
                    this.tipword = this.lang.RoleManage_HT_PEAPositiveInteger;
                    return
                }
                  setTimeout(() => {
this.tipchange = true;
    this.move('tip', 'tiphead');
                    });
                this.tipword = this.lang.DataGrid_Reaction_HT_PEThePageNumber;
                return;
            }
        },
        next1() {
            if (this.pageDate1.togeIndex > this.nowIndex1) {
                this.nowIndex1++;
                this.getdevice();
            }
        },
        end1() {
            this.nowIndex1 = this.pageDate1.togeIndex;
            this.getdevice();
        },
        sad() {
            console.log(this.table);
        },
        no1() {
            this.tipchange = false;
        },
        yes1() {
            this.tipchange = false;
            // this.searchData.argOperatorName = JSON.parse(
            //     sessionStorage.getItem('userInfo')
            // ).SCMSUserAccount;
            // this.$axios({
            //     method: 'post',
            //     url: `/api/CustomAlarmRecord/CustomAlarmRecord_AllAlarmConfirmation?argAlarmArray=${this.searchData.argAlarmArray}&argDevice=${this.searchData.argDevice}&argAlarmType=${this.searchData.argAlarmType}&argStatus=${this.searchData.argStatus}&argStartTime=${this.searchData.argStartTime}&argEndTime=${this.searchData.argEndTime}&argKeyword&argOperatorName=${this.searchData.argOperatorName}`
            // })
            //     .then(res => {
            //         this.req(this.pageData.pageIndex);
            //         if (res.data.data) {
            //             this.tipword = `${res.data.data}`;
            //              setTimeout(() => {

            //             this.deltrue = true;
            //         }
            //     })

            //     .catch(err => {});
        },
        tip1() {
            this.tipchange = false;
            this.w1 = false;
            this.length = [];
            if (this.w2) {
                this.wantchange3 = JSON.stringify(this.wantchange.item);
                    this.$store.state.change = 1;
                    if(this.$store.state.changeid == this.wantchange.item.PrId){
                      this.$store.state.pdid = true;
                    }else{
                        this.$store.state.pdid = false;
                    }
                    this.$store.state.changeid = this.wantchange.item.PrId;
                this.$router.push({
                    path: '/cpk',
                    query: { id: this.wantchange3 }
                });
            }
            this.w2 = false;
        },
        pdchnage() {
            if (this.pydata.length == 0) {
                 setTimeout(() => {
this.tipchange = true;
    this.move('tip', 'tiphead');
                    });
                this.pdyd3 = true;
                this.tipword = this.lang.QualityManage_HT_RuleChoseWindowViewModel_PSRuleModified;
            }
            if (this.pydata.length > 1) {
                 setTimeout(() => {
this.tipchange = true;
    this.move('tip', 'tiphead');
                    });
                this.pdyd3 = true;
                this.tipword = this.lang.QualityManage_HT_RuleChoseWindowViewModel_CanOnlySelectASingleRuleToModify;
            } else if (this.pydata[0].RuleType == 0) {
                 setTimeout(() => {
this.tipchange = true;
    this.move('tip', 'tiphead');
                    });
                this.pdyd3 = true;
                // this.tipword = `${this.pydata[0].RuleName}规则不能改`;
                this.tipword = this.lang.QualityManage_HT_RuleChoseWindowViewModel_R0RulesCannotBeModified
            } else {
                 setTimeout(() => {
this.py = true;
    this.move('pychange', 'pytop');
                    });
                this.arr = this.pydata[0].RuleValue.split(',');
            }
        },
        cancel11() {
            this.offdecive = false;
            this.offdecive1 = false;
            this.pydata = []
        },
        mouseDownHandleelse5(event) {
            event.currentTarget.style.cursor = 'move';
            window.onmousemove = this.mouseMoveHandleelse5;
        },
        mouseUpHandleelse5(event) {
            window.onmousemove = null;
            event.currentTarget.style.cursor = 'move';
        },
        mouseUpHandleelse2(event) {
            window.onmousemove = null;
            event.currentTarget.style.cursor = 'move';
        },
        mouseMoveHandleelse5(event) {
            this.pdyd2 = false;
            let moveLeft = event.pageX - 550 + 'px';
            let moveTop = event.pageY - 30 + 'px';
            this.$refs.kongtiao5.style.left = moveLeft;
            this.$refs.kongtiao5.style.top = moveTop;
        },
        mouseDownHandleelse2(event) {
            event.currentTarget.style.cursor = 'move';
            window.onmousemove = this.mouseMoveHandleelse2;
        },
        mouseMoveHandleelse2(event) {
            this.pdyd3 = false;
            let moveLeft = event.pageX - 190 + 'px';
            let moveTop = event.pageY - 20 + 'px';
            this.$refs.kongtiao2.style.left = moveLeft;
            this.$refs.kongtiao2.style.top = moveTop;
        },
        mouseDownHandleelse22(event) {
            event.currentTarget.style.cursor = 'move';
            window.onmousemove = this.mouseMoveHandleelse22;
        },
        mouseMoveHandleelse22(event) {
            let moveLeft = event.pageX - 300 + 'px';
            let moveTop = event.pageY - 30 + 'px';
            this.$refs.kongtiao22.style.left = moveLeft;
            this.$refs.kongtiao22.style.top = moveTop;
        },
        mouseUpHandleelse22(event) {
            window.onmousemove = null;
            event.currentTarget.style.cursor = 'move';
        },
        mouseDownHandleelse1(event) {
            event.currentTarget.style.cursor = 'move';
            window.onmousemove = this.mouseMoveHandleelse1;
        },
        mouseUpHandleelse1(event) {
            window.onmousemove = null;
            event.currentTarget.style.cursor = 'move';
        },
        mouseMoveHandleelse1(event) {
            this.pdyd1 = false;
            let moveLeft = event.pageX - 400 + 'px';
            let moveTop = event.pageY - 30 + 'px';
            this.$refs.kongtiao1.style.left = moveLeft;
            this.$refs.kongtiao1.style.top = moveTop;
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
        getdata(data, data1) {
            this.confirmdata = data;
            this.length = data1;
        },
        getdata1(data, data1) {
            this.confirmdata = data;
            this.length = data1;
        },
        change(e, item) {
            console.log(this.table);
        },
        setParams(a) {
            if(!a){
                   setTimeout(() => {
this.tipchange = true;
    this.move('tip', 'tiphead');
                    });
                this.pdyd3 = true;
                this.tipword = this.lang.NoOperationAuthority;
                return
            }
            
            console.log("-----------")
            console.log('this.table');
            console.log(this.table);
            console.log(this.d);
            if (this.d.hasOwnProperty('idd')) {
                 setTimeout(() => {
this.tipchange = true;
    this.move('tip', 'tiphead');
                    });
                this.pdyd3 = true;
                this.tipword = this.lang.QualityManage_HT_QualityManageUserControlViewModel_NoAddRecordsUnderRootNode;
            } else {
                this.wantword = ''
                 setTimeout(() => {
this.changetrue = true;
    this.move('sestion1', 'sestionheader1');
                    });
                this.pdyd1 = true;
                this.sestion = 1;
                this.meaddtable.PrSampleNumber = '2'
                this.meaddtable = {
                    PrDownLimit: '',
                    PrId: '',
                    PrLineId: '',
                    PrMethod: this.lang.QualityManage_HT_ItemEditWindowViewModel_Automatic,
                    PrName: '',
                    PrNumber: '',
                    PrRule: '',
                    PrSampleNumber: '2',
                    PrType: 'XR',
                    PrUpLimit: '',
                    PrVariableId: '',
                    PrVariableName: '',
                    PrWorkshopId: null,
                    PrgoalValue: '',
                    UpdateTime: '',
                    UpdateUser: ''
                };
            }
        },
        getonedata() {
            this.$axios.post(`/api/QualityManage/InsertRoot`).then(res => {
                console.log(res.data.data);
                res.data.data[0].idd = '';
                this.d = res.data.data[0];
                this.$axios
                    .post(
                        `/api/QualityManage/loadInspectItemGrid?prid=${res.data.data[0].ID}&type=${res.data.data[0].ItemType}`
                    )
                    .then(res => {
                        console.log('issssssssssssssssssssssssssssss', res);
                        this.table = res.data.data;
                        let i = 0;
                        for (i in res.data.data) {
                            res.data.data[i].item.UpdateTime = this.gettime(
                                res.data.data[i].item.UpdateTime
                            );
                        }
                        this.pageDate.togesize = this.table.length;
                        this.pageDate.togeIndex = Math.ceil(
                            this.table.length / 50
                        );
                        let a = this.nowIndex - 1;
                        if (this.nowIndex * 50 + 50 > this.pageDate.togesize) {
                            let b = this.pageDate.togesize;
                            this.pageDate.pageIndex = this.nowIndex;
                            this.table = this.table.splice(a * 50, b);
                        } else {
                            let b = this.nowIndex * 50 + 50;
                            this.pageDate.pageIndex = this.nowIndex;
                            this.table = this.table.splice(a * 50, b);
                        }
                        if (this.nowIndex >= this.pageDate.togeIndex) {
                            this.aaa = false;
                        } else {
                            this.aaa = true;
                        }
                        if (this.nowIndex < this.pageDate.togeIndex) {
                            this.bbb = false;
                        } else {
                            this.bbb = true;
                        }
                        this.nowpage = 1;
                    });
            });
        },
        nopre() {
            console.log("this.meaddtable",this.meaddtable)
            if (!this.meaddtable.PrName) {
                 setTimeout(() => {
this.tipchange = true;
    this.move('tip', 'tiphead');
                    });
                this.pdyd3 = true;
                this.tipword = this.lang.QualityManage_HT_ItemEditWindowViewModel_TestItemNotEmpty;
            } else if (!this.meaddtable.PrUpLimit) {
                 setTimeout(() => {
this.tipchange = true;
    this.move('tip', 'tiphead');
                    });
                this.pdyd3 = true;
                this.tipword = this.lang.QualityManage_HT_ItemEditWindowViewModel_UpperLimitNoEmpty;
            } else if (!this.meaddtable.PrDownLimit) {
                 setTimeout(() => {
this.tipchange = true;
    this.move('tip', 'tiphead');
                    });
                this.pdyd3 = true;
                this.tipword = this.lang.QualityManage_HT_ItemEditWindowViewModel_LowerLimitNoEmpty;
            } else if (!this.meaddtable.PrgoalValue) {
                 setTimeout(() => {
this.tipchange = true;
    this.move('tip', 'tiphead');
                    });
                this.pdyd3 = true;
                this.tipword = this.lang.QualityManage_HT_ItemEditWindowViewModel_TargetValueNoEmpty;
            } else if (this.radio !== '1' && !this.meaddtable.PrVariableName) {
                 setTimeout(() => {
this.tipchange = true;
    this.move('tip', 'tiphead');
                    });
                this.pdyd3 = true;
                this.tipword = this.lang.QualityManage_HT_ItemEditWindowViewModel_AutomaticVariableNoEmpty;
            } else if (!this.meaddtable.PrRule) {
                 setTimeout(() => {
this.tipchange = true;
    this.move('tip', 'tiphead');
                    });
                this.pdyd3 = true;
                this.tipword = this.lang.QualityManage_HT_ItemEditWindowViewModel_JudgmentRuleNoEmpty;
            } else if (isNaN(this.meaddtable.PrUpLimit)) {
                 setTimeout(() => {
this.tipchange = true;
    this.move('tip', 'tiphead');
                    });
                this.pdyd3 = true;
                this.tipword = this.lang.QualityManage_HT_ItemEditWindowViewModel_UpperLimitFormatIncorrect;
            } else if (isNaN(this.meaddtable.PrDownLimit)) {
                 setTimeout(() => {
this.tipchange = true;
    this.move('tip', 'tiphead');
                    });
                this.pdyd3 = true;
                this.tipword = this.lang.QualityManage_HT_ItemEditWindowViewModel_LowerFormatIncorrect;
            } else if (isNaN(this.meaddtable.PrgoalValue)) {
                 setTimeout(() => {
this.tipchange = true;
    this.move('tip', 'tiphead');
                    });
                this.pdyd3 = true;
                this.tipword = this.lang.QualityManage_HT_ItemEditWindowViewModel_TargetValueFormatIncorrect;
            }else if (
                parseFloat(this.meaddtable.PrDownLimit) >=
                    parseFloat(this.meaddtable.PrUpLimit) ||
                parseFloat(this.meaddtable.PrDownLimit) >=
                    parseFloat(this.meaddtable.PrgoalValue) ||
                parseFloat(this.meaddtable.PrgoalValue) >=
                    parseFloat(this.meaddtable.PrUpLimit)
            ) {
                
                 setTimeout(() => {
this.tipchange = true;
    this.move('tip', 'tiphead');
                    });
                this.pdyd3 = true;
                this.tipword = this.lang.QualityManage_HT_ItemEditWindowViewModel_UpperGreaterTargetGreaterLower;
            } else {
                if (this.sestion == 1) {
                    this.meaddtable.PrId = this.d.ID;
                    this.meaddtable.PrLineId = this.d.ID;
                    this.meaddtable.PrWorkshopId  = this.d.ID;
                    this.meaddtable.type = this.lang.QualityManage_HT_ItemEditWindowViewModel_New;
                    if (this.radio == '1') {
                        this.meaddtable.PrMethod = this.lang.QualityManage_HT_ItemEditWindowViewModel_Manual;
                    } else {
                        this.meaddtable.PrMethod = this.lang.QualityManage_HT_ItemEditWindowViewModel_Automatic;
                    }
                    if (!JSON.parse(sessionStorage.getItem('userInfo1'))) {
                        this.meaddtable.loginUserID = JSON.parse(
                            sessionStorage.getItem('sightseerInfo1')
                        ).SCMSUserID;
                        this.meaddtable.UpdateUser = JSON.parse(
                            sessionStorage.getItem('sightseerInfo1')
                        ).SCMSUserName;
                    } else {
                        this.meaddtable.loginUserID = JSON.parse(
                            sessionStorage.getItem('userInfo1')
                        ).SCMSUserID;
                        this.meaddtable.UpdateUser = JSON.parse(
                            sessionStorage.getItem('userInfo1')
                        ).SCMSUserName;
                    }
                    this.meaddtable.PrType = this.dt;
                    this.meaddtable.UpdateTime = this.getNowTime();
                    console.log(`/api/QualityManage/addnewcpkitem`);
                    console.log(this.meaddtable);
                    this.$axios({
                        method: 'post',
                        url: `/api/QualityManage/addnewcpkitem`,
                        data: this.meaddtable
                    }).then(res => {
                        if(res.data.code == 0){
                       console.log(res);
                        console.log(this.meaddtable);
                        this.changetrue = false;
                        this.getonedata1();
                        }else{
                              setTimeout(() => {
this.tipchange = true;
    this.move('tip', 'tiphead');
                    });
                this.pdyd3 = true;
                this.tipword = res.data.msg;
                        }
                    
                    });
                } else {
                    // this.meaddtable.PrId = this.d.ID;
                    this.meaddtable.PrLineId = this.d.ID;
                    this.meaddtable.type = this.lang.QualityManage_HT_ItemEditWindowViewModel_Modify;

                    if (this.radio == 1) {
                        this.meaddtable.PrMethod = this.lang.QualityManage_HT_ItemEditWindowViewModel_Manual;
                    } else {
                        this.meaddtable.PrMethod = this.lang.QualityManage_HT_ItemEditWindowViewModel_Automatic;
                    }
                    if (!JSON.parse(sessionStorage.getItem('userInfo'))) {
                        this.meaddtable.loginUserID = JSON.parse(
                            sessionStorage.getItem('sightseerInfo1')
                        ).SCMSUserID;
                        this.meaddtable.UpdateUser = JSON.parse(
                            sessionStorage.getItem('sightseerInfo1')
                        ).SCMSUserName;
                    } else {
                        this.meaddtable.loginUserID = JSON.parse(
                            sessionStorage.getItem('userInfo1')
                        ).SCMSUserID;
                        this.meaddtable.UpdateUser = JSON.parse(
                            sessionStorage.getItem('userInfo1')
                        ).SCMSUserName;
                    }
                    console.log(this.meaddtable);
                     this.meaddtable.PrType = this.dt;
                    this.meaddtable.UpdateTime = this.getNowTime();
                    this.$axios({
                        method: 'post',
                        url: `/api/QualityManage/addnewcpkitem`,
                        data: this.meaddtable
                    }).then(res => {
                              if(res.data.code == 0){
                      console.log(res);
                        this.changetrue = false;
                        this.getonedata1();
                        }else{
                              setTimeout(() => {
this.tipchange = true;
    this.move('tip', 'tiphead');
                    });
                this.pdyd3 = true;
                this.tipword = res.data.msg;
                        }
                    
                     
                    });
                }
            }
            this.wantchange.item.PrRule = this.meaddtable.PrRule
        },
        getonedata1() {
            console.log(this.d.ID, this.d.ItemType)
            this.$axios
                .post(
                    `/api/QualityManage/loadInspectItemGrid?prid=${this.d.ID}&type=${this.d.ItemType}`
                )
                .then(res => {
                    console.log(res);
                    let i = 0;
                    for (i in res.data.data) {
                        res.data.data[i].item.UpdateTime = this.gettime(
                            res.data.data[i].item.UpdateTime
                        );
                    }
                    this.table = res.data.data;
                    this.pageDate.togesize = this.table.length;
                    this.pageDate.togeIndex = Math.ceil(this.table.length / 50);
                    let a = this.nowIndex - 1;
                    if (this.pageDate.togesize <= 50) {
                        let b = this.pageDate.togesize;
                        this.pageDate.pageIndex = this.nowIndex;
                    } else {
                        let b = this.nowIndex * 1 + 1;
                        this.pageDate.pageIndex = this.nowIndex;
                        this.table = this.table.splice(a * 1, 50);
                        // let c = 0;
                        // for(c in this.table){
                        //     let d = (parseInt(c)+1);
                        //     this.table[c].Number = d;
                        // }
                    }
                    if (this.nowIndex >= this.pageDate.togeIndex) {
                        this.aaa = false;
                    } else {
                        this.aaa = true;
                    }
                    if (this.nowIndex < this.pageDate.togeIndex) {
                        this.bbb = false;
                    } else {
                        this.bbb = true;
                    }
                    this.nowpage = 1;
                });
        }
    },
    mounted() {
        this.getonedata();
        this.$nextTick(() => {
            this.$refs.www.doLayout(); //解决表格错位
        });
    }
};
</script>

<style lang="scss" scoped>
.public-table {
    display: flex;
    flex-direction: column;
    height: 100%;
    .table-container {
        // flex: 1;
        overflow: auto;
    }
    .page-container {
        height: 60px;
    }
}
.tip {
    position: fixed;
    width: 380px;
    height: 200px;
    z-index: 98;
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
    .w2 {
        padding: 30px !important;
        text-align: left !important;
    }
    .tipdetermine {
        color: #ea9328;
        width: 310px;
        cursor: pointer;
        line-height: 30px;
        text-align: center;
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
.cover2 {
    width: 100%;
    height: 100%;
    z-index: 29;
    position: fixed;
    top: 0;
    left: 0;
}
.cover4 {
    width: 100%;
    height: 100%;
    z-index: 25;
    position: fixed;
    top: 0;
    left: 0;
}
.cover5 {
    width: 100%;
    height: 100%;
    z-index: 29;
    position: fixed;
    top: 0;
    left: 0;
}
.page {
    display: flex;
    justify-content: space-between;
    .btn {
        cursor: pointer;
    }
    width: calc(100% - 20px);
    padding: 0 10px;
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
.selectword {
    position: fixed;
    top: 172px;
    left: 312px;
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
.cover3 {
    width: 100%;
    height: 100%;
    z-index: 19;
    position: fixed;
    top: 0;
    left: 0;
}
.margin1 {
    height: 36px;
}
.me {
    display: inline-block;
    width: 55px;
}
.boxsad {
    position: fixed;
    width: 530px;
    height: 250px;
    z-index: 30;
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
            z-index: 50;
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
.sestion1 {
    height: 430px !important;
    top: 260px;
    z-index: 26 !important;
    width: 920px !important;
}
.sestion {
    width: 750px;
    height: 750px;
    z-index: 10;
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
        padding: 1px 50px 0px 50px;
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
    // margin-top: 15px;
    // margin-left: 20px;
    input {
        text-indent: 0.5em;
        width: 240px;
        height: 40px;
        border: none;
        border: 1px solid #e0e0e0;
        // background-color: #f4f4f4;
    }
    .input1 {
        text-indent: 0.5em;
        width: 240px;
        height: 40px;
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
        height: 40px;
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
    z-index: 10;
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
        padding: 30px 80px 0px 80px;
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
        flex: 1.2;
        text-align: right;
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
    // margin-top: 15px;
    // margin-left: 20px;
    input {
        text-indent: 0.5em;
        width: 240px;
        height: 40px;
        border: none;
        border: 1px solid #e0e0e0;
        // background-color: #f4f4f4;
    }
    .input1 {
        text-indent: 0.5em;
        width: 240px;
        height: 40px;
        display: inline-block;
        background-color: #f4f4f4;

        line-height: 40px;
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
        height: 40px;
        width: 40px;
        img {
            width: 100%;
            height: 100%;
        }
    }
    select {
        text-indent: 0.5em;
        width: 240px;
        height: 40px;
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
    margin-top: 20px;
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
    margin-right: 40px;
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
.sp6 {
    position: relative;
    top: -10px;
}
.sestionheader1 {
    width: 100%;
    position: absolute;
    height: 50px;
}
.view {
    padding-left: 20px;
    padding-bottom: 10px;
}
.mt {
    margin-bottom: 20px;
    span {
        display: inline-block;
        width: 80px;
        text-align: right;
    }
    input {
        text-indent: 0.5em;
        margin-left: 20px;
        height: 40px;
        width: 300px;
    }
}
.pychange {
    z-index: 60;
    width: 600px;
    top: 250px;
    left: 600px;
    position: fixed;
    background-color: #eeeeee;
    box-shadow: 0px 0px 8px black;
    .pytop {
        width: 100%;
        height: 60px;
        position: absolute;
        top: 0;
        z-index: 61;
        left: 0;
    }
    .pycontent {
        padding: 30px 60px 60px 60px;
        width: 100%;
        position: relative;
    }
    .pyhead {
        width: 100%;
        height: 60px;
        text-align: center;
        line-height: 60px;
        font-size: 18px;
        background-color: #386df0;
        position: relative;
        color: #ffffff;
        img {
            z-index: 62;
            width: 24px;
            height: 24px;
            cursor: pointer;
            position: absolute;
            right: 20px;
            bottom: 15px;
        }
    }
}
.look {
    z-index: 30;
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
    >span {
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
            z-index: 12;
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
        z-index: 11;
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
            }
            .keyword {
                margin-right: 580px;
                color: #4270e4;
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
    .table1 {
        height: 440px !important;
    }
}
.wechange {
    cursor: pointer;
    width: 100px;
    height: 34px;
    margin-top: 10px;
    margin-right: 10px;
    background-color: #4abfcd;
    bottom: 20px;
    left: 60px;
    color: #ffffff;
    border-radius: 3px;
    text-align: center;
    line-height: 34px;
    position: absolute;
}
.cancelq {
    cursor: pointer;
    width: 100px;
    height: 34px;
    background-color: #999999;
    position: absolute;
    color: #ffffff;
    border-radius: 3px;
    text-align: center;
    line-height: 34px;
    bottom: 20px;
    right: 180px;
}
.Preservationq {
    width: 100px;
    right: 60px;
    position: absolute;
    height: 34px;
    bottom: 20px;
    cursor: pointer;
    background-color: #386df0;
    color: #ffffff;
    border-radius: 3px;
    text-align: center;
    line-height: 34px;
}
.yd {
    margin: auto;
    top: 0 !important;
    right: 0 !important;
    bottom: 0 !important;
    left: 0 !important;
}
img {
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
.yd {
    margin: auto;
    top: 0 !important;
    right: 0 !important;
    bottom: 0 !important;
    left: 0 !important;
}
img {
    cursor: pointer;
}
.zimg{
    position: absolute;
    top: 0;
    right: -7px;
    cursor: default;
    width: 100%;
    opacity: 0.5;
    height: 100%;
    background: #ccc;
}
</style>
