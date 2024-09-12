<!--
 * @Description: 文档管理设备资料界面
 * @Date: 2019-11-25 19:07:09
 * @Author: 随风
 * @LastEditors: Tao
 * @LastEditTime: 2021-02-22 09:36:01
 -->
<template>
    <div
        class="public-table"
        @click="changeselect = false"
      
    >
            <div class="loadcover" element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(0, 0, 0, 0.4)"  v-loading="this.$store.state.isShow" v-show="this.$store.state.isShow" style="position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;"></div>
        <div
            class="look"
            v-show="offdecive"
            @click="selectword3 = false"
        >
            <div class="looktop" :style="{ height: a11 * 60 + 'px' }"></div>
            <div
                class="lookhead"
                :style="{
                    height: a11 * 60 + 'px',
                    fontSize: 18 * a11 + 'px',
                    lineHeight: a11 * 60 + 'px'
                }"
                :class="[
                    { fcolor: $store.state.color == 'grey' },
                    { colordiv: $store.state.color == 'grey' }
                ]"
            >
                {{lang.FileManage_AddAssociatedEquipment}}
                <img
                    :src="no2"
                    alt
                    class="no"
                    @click.stop="cancel11"
                    :style="{
                        right: 20 * a11 + 'px',
                        bottom: 15 * a11 + 'px',
                        width: 24 * a11 + 'px',
                        height: 24 * a11 + 'px'
                    }"
                    v-if="$store.state.color == 'grey'"
                />
                <img
                    :src="no"
                    alt
                    class="no"
                    :style="{
                        right: 20 * a11 + 'px',
                        bottom: 15 * a11 + 'px',
                        width: 24 * a11 + 'px',
                        height: 24 * a11 + 'px'
                    }"
                    @click.stop="cancel11"
                    v-else
                />
            </div>
            <div class="lookcontent">
                <div class="lookselect" :style="{ height: 436 * a11 + 'px' }">
                    <div
                        class="search"
                        :style="{
                          zoom:a11
                        }"
                    >
                        <span
                            class="sblx1"
                           
                            >{{lang.EquipmentAccount_EquipmentType1}}</span
                        >
                        <div
                            class="seleword2"
                         
                            @click.stop="selectword2"
                        >
                            <div class="seleword1">
                                {{ oneselect }}
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
                                <span
                                    class="custom-tree-node"
                                    slot-scope="{ node, data }"
                                >
                                    <span>
                                        <img
                                            v-show="data.file"
                                            :src="data.file"
                                            alt
                                            class="img11"
                                        />
                                        <i :class="data.icon"></i>
                                        {{ node.label }}
                                    </span>
                                </span>
                            </el-tree>
                        </div>
                        <input
                            type="text"
                            class="tinput1"
                            :placeholder="lang.AlarmRecord_Time_Keyword"
                            v-model="projectkeyword"
                        />
                        <span class="lookfor1"  @click="lookforsearch"
                            >{{lang.AlarmRecord_Time_Select}}</span
                        >
                    </div>
                    <div class="table" :style="{
                            width: 950 * a11 + 'px',
                            height: 340 * a11 + 'px'
                        }">
                        <el-table
                              :data="projectlistdata"
                            height="100%"
                            border
                            highlight-current-row
                            :style="{
                                fontSize: a11 * 15 + 'px',
                                width: '100%'
                            }"
                            @row-click="handleRowChange1"
                            :header-cell-style="{
                                background:
                                    $store.state.color == 'grey'
                                        ? '#D9DBDE'
                                        : '#E1EDFA',
                                color:
                                    $store.state.color == 'grey'
                                        ? '#000'
                                        : '#769DE7',
                                'border-left': '1px solid #cccccc',
                                height: 50 * a11 + 'px',
                                padding: '0'
                            }"
                        >
                            <template slot="empty">
                                <span>{{lang.SCMSConsoleWebApiMySql_NoData}}</span>
                            </template>
                            <el-table-column
                                prop="DeviceName"
                                :label="lang.EquipmentAccount_EquipmentName"
                                :show-overflow-tooltip="true"
                            ></el-table-column>
                            <el-table-column
                                prop="DeviceNo"
                                :label="lang.EquipmentAccount_EquipmentNumber"
                                :show-overflow-tooltip="true"
                            ></el-table-column>
                            <el-table-column
                                prop="DevicePath"
                                :label="lang.EquipmentAccount_EquipmentType"
                                :show-overflow-tooltip="true"
                            ></el-table-column>
                            <el-table-column
                                prop="DeviceModel"
                                :label="lang.EquipmentAccount_EquipmentModel"
                                :show-overflow-tooltip="true"
                            ></el-table-column>
                        </el-table>
                    </div>
                </div>
            </div>
            <div class="cancel" :style="{
                    height: 40 * a11 + 'px',
                    lineHeight: 40 * a11 + 'px',
                    width: 100 * a11 + 'px',
                    right: 150 * a11 + 'px',
                    bottom: 10 + 'px',
                    fontSize: 14 * a11 + 'px'
                }" @click="cancel11">{{lang.PopupCommon_Cancel}}</div>
            <div     :style="{
                    height: 40 * a11 + 'px',
                    lineHeight: 40 * a11 + 'px',
                    width: 100 * a11 + 'px',
                    right: 30 * a11 + 'px',
                    bottom: 10 + 'px',
                    fontSize: 14 * a11 + 'px'
                }"  class="pre" @click="pre1">{{lang.PopupCommon_Sure}}</div>
        </div>
        <div
            class="search-container"
            :style="{
                zoom:a11
            }"
        >
            <span class="sblx" 
                >{{lang.EquipmentAccount_EquipmentType1}}</span
            >
            <div
                class="seleword"
              
                @click.stop="selectword1"
            >
                <div class="seleword1 seleword11">
                    {{ Meter }}
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
                            <img
                                v-show="data.file"
                                :src="data.file"
                                alt
                                class="img11"
                            />
                            <i :class="data.icon"></i>
                            {{ node.label }}
                        </span>
                    </span>
                </el-tree>
            </div>

            <span
                class="sp4 tinput"
                :style="{
                    marginLeft: 230 + 'px'
                }"
                >{{lang.FileManage_AddTime1}}</span
            >

            <el-date-picker
                v-model="value1"
              @focus="sx()"
                type="datetime"
                :placeholder="lang.SCMSConsoleWebApiMySql_PleChooseDate"
                value-format="yyyy-MM-dd HH:mm:ss"
            ></el-date-picker>
            <span class="demonstration">-</span>
            <el-date-picker
                v-model="value2"
                type="datetime"
                :placeholder="lang.SCMSConsoleWebApiMySql_PleChooseDate"
                value-format="yyyy-MM-dd HH:mm:ss"
              @focus="sx()"
            ></el-date-picker>
            <input
               
                type="text"
               :placeholder="lang.AlarmRecord_Time_Keyword"
                v-model="keyword"
            />
            <div
                class="sad"
                @click="sad"
               
            >
                {{lang.RoleManage_Query}}
            </div>
            <div
                class="add"
                @click="add"
               
            >
                {{lang.RoleManage_Add}}
            </div>
            <div
                class="move"
                @click="del"
               
            >
                {{lang.RoleManage_Delete}}
            </div>
        </div>
        <div class="table-container table-container1">
            <el-table
                ref="multipleTable"
                :data="tableData1"
                stripe
                height="100%"
                tooltip-effect="dark"
                :style="{ fontSize: a11 * 15 + 'px', width:'100% '}"
                @select="select"
                :row-style="{ height: 50 * a11 + 'px' }"
                @select-all="selectall"
                border
                highlight-current-row
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
                <el-table-column
                    type="selection"
                    :width="a11>1?60*a11+'px':60+'px'"
                    :show-overflow-tooltip="true"
                    fixed
                ></el-table-column>
                <el-table-column
                    :label="lang.AlarmRecord_HT_AlarmPointManageUC_SerialNumber"
                    :width="120 * a11"
                    prop="Number"
                    :show-overflow-tooltip="true"
                    fixed
                >
                    <template slot-scope="scope">{{
                        scope.row.Number
                    }}</template>
                </el-table-column>
                <el-table-column
                    prop="name"
                    :label="lang.RoleManage_Operation"
                      :width="215 * a11"
                   
                    fixed
                >
                    <template slot-scope="scope">
                        <!-- <i class="el-icon-share"></i> -->
                        <div
                            class="img"
                            :style="{zoom:a11}"
                            @click="handleEdit11(scope.$index, scope.row)"
                        >
                           <div> {{lang.FileManage_Download}}</div> 
                        </div>
                        <div
                            class="img"
 :style="{zoom:a11}"
                            @click="handleEdit1(scope.$index, scope.row)"
                        >
                            <img   :src="pensoil" alt />
                            {{ scope.row.phone }}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="DataTitle"
                    :label="lang.FileManage_DataTitle"
                    :width="200 * a11"
                    :show-overflow-tooltip="true"
                    fixed
                ></el-table-column>
                <el-table-column
                    prop="DataType"
                    :label="lang.FileManage_DataType"
                    :width="200 * a11"
                    :show-overflow-tooltip="true"
                >
                    <template slot-scope="scope">
                        <span v-if="scope.row.DataType == 1">{{lang.FileManage_OperationManual}}</span>
                        <span v-else-if="scope.row.DataType == 2">{{lang.FileManage_InstallationInstructions}}</span>
                        <span v-else-if="scope.row.DataType == 3">{{lang.FileManage_MaintenanceManual}}</span>
                        <span v-else-if="scope.row.DataType == 4">{{lang.FileManage_CommonProblemsAndCountermeasures}}</span>
                        <span v-else-if="scope.row.DataType == 5">{{lang.FileManage_EquipmentDrawings}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="DataPath"
                    :label="lang.EquipmentAccount_EquipmentType"
                    :width="200 * a11"
                    :show-overflow-tooltip="true"
                ></el-table-column>
                <el-table-column
                    prop="DeviceName"
                    :label="lang.EquipmentAccount_EquipmentName"
                    :width="200 * a11"
                    :show-overflow-tooltip="true"
                ></el-table-column>
                <el-table-column
                    prop="AddPerson"
                    :label="lang.FileManage_AddPerson"
                    :width="300 * a11"
                    :show-overflow-tooltip="true"
                ></el-table-column>
                <el-table-column
                    prop="AddTime"
                    :label="lang.FileManage_AddTime"
                    :width="300 * a11"
                    :show-overflow-tooltip="true"
                ></el-table-column>
            </el-table>
        </div>
        <div class="pages-container" :style="{ zoom: a11 }">
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
        <div class="sestion sestion1" v-show="changetrue">
            <div
                class="sestionheader"
                :class="{ colordiv: $store.state.color == 'grey' }"
            >
                <div class="sestionheader1"></div>
                <span
                    class="head"
                    v-if="sestion == 1"
                    :class="{ fcolor: $store.state.color == 'grey' }"
                    >{{lang.FileManage_AddEquipmentData}}</span
                >
                <span
                    class="head"
                    v-else-if="sestion == 2"
                    :class="{ fcolor: $store.state.color == 'grey' }"
                    >{{lang.FileManage_ViewSOP}}</span
                >
                <span
                    class="head"
                    v-else-if="sestion == 3"
                    :class="{ fcolor: $store.state.color == 'grey' }"
                    >{{lang.FileManage_EditEquipmentData}}</span
                >
                <img
                    :src="no2"
                    alt
                    class="no"
                    @click.stop="cancel"
                    v-if="$store.state.color == 'grey'"
                />
                <img :src="no" alt class="no" @click.stop="cancel" v-else />
            </div>
            <div class="sestioncontain">
                <div class="overflow">
                    <div class="fl">
                        <div class="margin" >
                            <span>{{lang.FileManage_DataTitle}}</span>
                            <input
                                type="text"
                                v-if="sestion == 1"
                                v-model="meaddtable.DataTitle"
                            />
                            <input
                                type="text"
                                v-else-if="sestion == 2"
                                v-model="meaddtable.DataTitle"
                                disabled
                            />
                            <input
                                type="text"
                                v-else-if="sestion == 3"
                                v-model="meaddtable.DataTitle"
                            />
                        </div>
                        <div class="margin">
                            <span>{{lang.EquipmentAccount_EquipmentName}}</span>
                            <div v-if="sestion == 1" class="input1">
                                <span>{{ meaddtable.DeviceName }}</span>
                                <div class="inputimg" @click="getdevice">
                                    <img :src="diji" alt />
                                </div>
                            </div>
                            <div v-else-if="sestion == 2" class="input1">
                                <span>{{ meaddtable.DeviceName }}</span>
                                <div class="inputimg">
                                    <img :src="diji" alt />
                                </div>
                            </div>
                            <div v-else-if="sestion == 3" class="input1">
                                <span>{{ meaddtable.DeviceName }}</span>
                                <div class="inputimg" @click="getdevice">
                                    <img :src="diji" alt />
                                </div>
                            </div>
                        </div>
                        <div class="margin">
                            <div class="twoge">
                                <a href="javascript:;" class="file">
                                    {{lang.FileManage_Upload}}
                                    <form>
                                        <input
                                            type="file"
                                            ref="file"
                                            id="uploadFile"
                                            @change="changeName($event)"
                                            class="outputlist_upload"
                                        />
                                    </form>
                                </a>
                                <div class="nosc" @click="nosc">{{lang.RoleManage_Delete}}</div>
                            </div>
                            <span class="sc">{{lang.FileManage_DataUpload}}</span>
                        </div>
                    </div>
                    <div class="zr">
                        <div class="margin" >
                            <span class="me">{{lang.FileManage_DataType}}</span>
                            <select
                                name
                                id
                                v-model="meaddtable.DataType"
                                v-if="sestion == 1"
                            >
                                <option
                                    :value="item.value"
                                    v-for="(item, index) in supermin"
                                    :key="index"
                                    >{{ item.label }}</option
                                >
                            </select>
                            <select
                                name
                                id
                                v-model="meaddtable.DataType"
                                v-else-if="sestion == 2"
                                disabled
                            >
                                <option
                                    :value="item.value"
                                    v-for="(item, index) in supermin"
                                    :key="index"
                                    >{{ item.label }}</option
                                >
                            </select>
                            <select
                                name
                                id
                                v-model="meaddtable.DataType"
                                v-else-if="sestion == 3"
                            >
                                <option
                                    :value="item.value"
                                    v-for="(item, index) in supermin"
                                    :key="index"
                                    >{{ item.label }}</option
                                >
                            </select>
                        </div>
                    </div>

                        <textarea
                            name
                            id
                            v-if="sestion == 1"
                            v-model="filename"
                            disabled
                        ></textarea>
                        <textarea
                            name
                            id
                            v-else-if="sestion == 2"
                            placeholder
                            v-model="filename"
                            disabled
                        ></textarea>
                        <textarea
                            name
                            id
                            disabled
                            v-else-if="sestion == 3"
                            :placeholder="!filename?'':lang.EquipmentAccount_EquipmentRemarkTag"
                            v-model="filename"
                        ></textarea>
                 
                </div>
                <div
                    class="Preservation"
                    v-if="sestion == 1 || sestion == 3"
                    @click="nopre($event)"
                >
                    {{lang.PopupCommon_Save}}
                </div>
                <div
                    class="cancel"
                    @click="cancel"
                    v-if="sestion == 1 || sestion == 3"
                >
                    {{lang.PopupCommon_Cancel}}
                </div>
            </div>
        </div>
        <div class="Choice" v-if="cancel1" ref="kongtiao">
            <div class="choicehead">
                <div
                    class="choicehead1"
                    :class="{ colordiv: $store.state.color == 'grey' }"
                ></div>
                <sapn
                    v-if="select1 == 1"
                    :class="{ fcolor: $store.state.color == 'grey' }"
                    >{{lang.EquipmentAccount_SelectEquipmentType}}</sapn
                >
                <sapn v-if="select1 == 2">{{lang.SCMSConsoleWebApiMySql_SelectInstallPosition}}</sapn>
                <div class="img" @click="cancel2">
                    <img
                        :src="no2"
                        alt
                        class="no"
                        v-if="$store.state.color == 'grey'"
                    />
                    <img :src="no" alt class="no" v-else />
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
                            <img
                                v-show="data.file"
                                :src="data.file"
                                alt
                                class="img1"
                            />
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
                            <img
                                v-show="data.file"
                                :src="data.file"
                                alt
                                class="img1"
                            />
                            <i :class="data.icon"></i>
                            {{ node.label }}
                        </span>
                    </span>
                </el-tree>
            </div>
            <div
                class="Preservation Preservation1"
                v-if="sestion == 3"
                @click="Preservation2"
            >
               {{lang.PopupCommon_Sure}}
            </div>
            <div
                class="Preservation Preservation1"
                v-if="sestion == 2"
                @click="Preservation3"
            >
                {{lang.PopupCommon_Sure}}
            </div>
            <div class="cancel cancle1" @click="cancel2">{{lang.PopupCommon_Cancel}}</div>
        </div>
        <div
            class="tip"
            v-show="tipchange"
        >
         <div
                class="tiphead"
                style="position:absolute;width: 380px;height: 40px;"
            ></div>
            <div class="tiptop">
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
        <div class="cover3" v-if="changetrue"></div>
        <div class="cover2" v-if="tipchange"></div>
        <div class="cover4" v-if="offdecive"></div>
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
            a2: 1,
            nowIndex: 1,

            oneselectid: '',
            Meterid: '',
            aaa: false,
            bbb: false,
            pdyd1: true,
            pdyd2: true,
            pdyd3: true,
            nowpage: 1,
            sametimearr: [
                '操作手册',
                '安装说明',
                '维护手册',
                '常见问题处理对策',
                '设备图纸'
            ],
            // 1-操作手册，2-安装说明，3-维护手册，4-常见问题处理对策，5-设备图纸
            supermin: [
                {
                    label: '操作手册',
                    value: 1
                },
                {
                    label: '安装说明',
                    value: 2
                },
                {
                    label: '维护手册',
                    value: 3
                },
                {
                    label: '常见问题处理对策',
                    value: 4
                },
                {
                    label: '设备图纸',
                    value: 5
                },
            ],
            taskname: '',
            offdecive: false,
            nowtimr1: '',
            wantnowdata: { DeviceName: '' },
            value1: new Date(new Date().toLocaleDateString()),
            value2: new Date(
                new Date(new Date().toLocaleDateString()).getTime() +
                    24 * 60 * 60 * 1000 -
                    1
            ),
            deltrue: true,
            changeselect: false,
            tipword: '',
            tableData1: [],
            tipchange: false,
            gth: require('../../assets/images/gth.png'),
            moveDataelse: {
                x: null,
                y: null
            },
            xiala: require('../../assets/images/ziyuan4.png'),
            person: ['SuperAdmin', 'Guest'],
            select1: 1,
            person1: ['是', '否'],
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
            selectword3: false,
            outputs: [],
            tableData: [],
            multipleSelection: [],
            excelData: [],
            selectname: [],
            selectname1: [],
            abc: '',
            a11: 1,
            cancel1: false,
            Meter: '',
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
            antable: [],
            muchdata: '',
            a: 1,
            data6: [],
            longinnum: '',
            deldata: {},
            delarray: [],
            yesdel: '',
            meaddtable: {
                Operate: '1',
                DID: '',
                DataTitle: '', //资料标题
                DataType: 1, //资料类型，1-操作手册，2-安装说明，3-维护手册，4-常见问题处理对策，5-设备图纸
                AID: '', //关联设备台账的id
                FileName: '', //文件名称
                FileType: '', //文件类型
                AddPerson: '', //添加人
                AddTime: '', //添加时间，
                DeviceName: '点击选择'
            },
            oldName: '',
            projectlistdata: [],
            projectlistdata1: [],
            projectkeyword: '',
            ztarr: ['不限', '未开始', '进行中', '已延误'],
            leixinarr: ['不限', '计划维修', '故障维修'],
            oneselect: '',
            data7: [],
            changetrue: false,
            argID: [],
            wo: '',
            file: '',
            filename: '',
            guid: '',
            filesize: '',
            jurisdiction:[],
            buttonarr:[],
            cxid:'',
            cxshow:true,
            tjid:'',
            tjshow:true,
            scid:'',
            scshow:true,
            xzid:'',
            xzshow:true,
            xgid:'',
            xgshow:true,
            lang: JSON.parse(localStorage.getItem('languages'))[localStorage.getItem('currentLang')]
        };
    },

    created() {
        this.getLangData()
        this.getEquipmentType();
        this.req(1);
        this.time4 = this.getNowTime();
    },
    watch: {
        device(newval) {
            if (newval == '在用') {
                this.sbnum = 1;
            } else if (newval == '停用') {
                this.sbnum = 2;
            } else if (newval == '报废') {
                this.sbnum = 3;
            }
        },
        warry(newval) {
            if (newval == '在用') {
                this.warrynum = 1;
            } else if (newval == '保外') {
                this.warrynum = 2;
            }
        }
    },

    methods: {
        getLangData() {
            this.sametimearr = [
                this.lang.FileManage_OperationManual,
                this.lang.FileManage_InstallationInstructions,
                this.lang.FileManage_MaintenanceManual,
                this.lang.FileManage_CommonProblemsAndCountermeasures,
                this.lang.FileManage_EquipmentDrawings,
            ],
            this.supermin = [
                {
                    label: this.lang.FileManage_OperationManual,
                    value: 1
                },
                {
                    label: this.lang.FileManage_InstallationInstructions,
                    value: 2
                },
                {
                    label: this.lang.FileManage_MaintenanceManual,
                    value: 3
                },
                {
                    label: this.lang.FileManage_CommonProblemsAndCountermeasures,
                    value: 4
                },
                {
                    label: this.lang.FileManage_EquipmentDrawings,
                    value: 5
                },
            ]
            this.person1 = [this.lang.ProcessParameterReport_HT_Yes, this.lang.ProcessParameterReport_HT_No]
            this.warry = this.lang.EquipmentAccount_Inside
            this.device = this.lang.EquipmentAccount_Used
            this.Meter1 = this.lang.AlarmRecord_HT_Unlimited
            this.Meter2 = this.lang.AlarmRecord_HT_Unlimited
            this.Preservation = this.lang.EquipmentAccount_ClickSelect
            this.Preservation1 = this.lang.EquipmentAccount_ClickSelect
            this.Preservation5 = this.lang.EquipmentAccount_ClickSelect
            this.meaddtable.DataType = 1
            this.meaddtable.DeviceName = this.lang.EquipmentAccount_ClickSelect
        },
        nosc() {
            this.file = '';
            this.filename = '';
              document.getElementById('uploadFile').value=''
        },
        cancel11() {
            this.aid = ''
            this.wantword = ''
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

        selectword2() {
            console.log(this.selectname);
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
                    $('.sblx1')[0].clientWidth +
                    10 +
                    'px',
                top:
                    $('.lookfor1')[0].offsetTop +
                    $('.seleword1')[0].clientHeight +
                    'px'
            });
            console.log(this.selectword3);
        },
        pre1() {
            if (this.sestion == 1) {
                this.meaddtable.DeviceName = this.wantword;
                this.meaddtable.AID = this.aid;
                console.log(this.meaddtable);
                console.log(this.meaddtable);
                if (!this.meaddtable.DeviceName) {
                    this.tipword = this.lang.FileManage_SelectEquipment;
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
                    this.pyyd1 = true;
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
                    this.pyyd1 = true;
                    return
                }
                console.log(this.wantnowdata);
                this.meaddtable.AID = this.aid;
                this.meaddtable.DeviceName = this.wantword;
                this.cancel11()
            }
        },
        handleRowChange1(row, event, column) {
            this.wantword = row.DeviceName;
            this.aid = row.AID;
            console.log(row);
        },
        findPathByLeafId(id, node, path) {
            if (!path) {
                path = [];
            }
            for (let i = 0; i < node.length; i++) {
                var temPath = path.concat();

                if (id == node[i].RightID) {
                    temPath.push(node[i]);
                    return temPath;
                }
                if (node[i].Children) {
                    var findResult = this.findPathByLeafId(
                        id,
                        node[i].Children,
                        temPath
                    );
                    if (findResult) {
                        return findResult;
                    }
                }
            }
        },
        GetUrlParam(paraName) {
            let url = document.location.toString();
            let arrObj = url.split('?');
            if (arrObj.length > 1) {
                let arrPara = arrObj[1].split('&');
                let arr;
                for (let i = 0; i < arrPara.length; i++) {
                    arr = arrPara[i].split('=');
                    if (arr && arr[0] == paraName) {
                        return arr[1];
                    }
                }
                return '';
            } else {
                return '';
            }
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
        changeName(event) {
            console.log(event.target.files[0]);

            this.file = event.target.files[0];
            this.filesize = event.target.files[0].size;
            if (event.target.files[0].size > 20971520) {
                this.filename = '文件不能大于20M';
            } else {
                this.filename = event.target.files[0].name;
            }
        },
        newguid() {
            let guid = '';
            for (let i = 1; i <= 32; i++) {
                let n = Math.floor(Math.random() * 16.0).toString(16);
                guid += n;
                if (i == 8 || i == 12 || i == 16 || i == 20) guid += '-';
            }
            return guid;
        },
        yes1() {
            this.tipchange = false;
            console.log(this.argID);
            this.$axios({
                method: 'post',
                url: `/api/FileManage/FileManage_RemoveDeviceData`,
                data: this.argID
            }).then(res => {
                console.log(res);
                this.tipword = this.lang.FormulaManage_HT_DeletedSuccessfully;
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
                this.pyyd1 = true;
                this.argID = [];
                this.deltrue = true;
                this.getsetime();
            });
        },
        del() {
            if (!this.scshow) {
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
                this.pdyd3 = true;
                return;
            }
            if (this.argID.length !== 0) {
                this.tipword = this.lang.EquipmentAccount_SureToDelete;
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
                this.pyyd1 = true;
                this.deltrue = false;
            } else {
                this.deltrue = true;
                this.tipword = this.lang.EquipmentAccount_CheckTheDeleteItem;
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
                this.pyyd1 = true;
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
            if (this.tipword == this.lang.SCMSConsoleWebApiMySql_TimeFormatIsIncorrect) {
                this.$axios
                    .post(`/api/FileManage/FileManage_GstDeviceDataInitTime`)
                    .then(res => {
                        console.log('sss', res);
                        this.value1 = res.data.data.StartTime;
                        this.value2 = res.data.data.EndTime;
                    });
            }

            this.tipchange = false;
        },
        getdevice() {
            this.$axios
                .post(`/api/FileManage/FileManage_GstEquipmentAccount`)
                .then(res => {
                    console.log(res);
                    this.projectlistdata = res.data.data;
                    this.projectlistdata1 = res.data.data;
                         setTimeout(() => {
                        $('.look').css({
                            width: this.a11 * 1120 + 'px',
                            height: 600 * this.a11 + 'px',
                            left: `calc(50% - ${($('.look').width() / 2) *
                                this.a11}px)`,
                            top: `calc(50% - ${($('.look').height() / 2) *
                                this.a11}px)`
                        });
                        $('.lookcontent').css({
                            paddingLeft: 60 * this.a11 + 'px',
                            paddingRight: 30 * this.a11 + 'px',
                            paddingTop: 30 * this.a11 + 'px'
                        });
                        $('.tinput1').css({
                            marginLeft: 230 + 'px',
                          
                        });
                        this.offdecive = true;
                        this.move('look', 'looktop');
                    })
                    this.pdyd3 = true;
                    this.selectword3 = false;
                    this.projectkeyword = '';
                });
        },
        nopre(event) {
            let afname;
            var $this = this
            if (!$this.filename) {
                afname = "";
            } else {
                afname = $this.filename;
            }
            if (
                !JSON.parse(sessionStorage.getItem('userInfo1')) ||
                JSON.parse(sessionStorage.getItem('userInfo1')) == null
            ) {
                $this.abc = JSON.parse(
                    sessionStorage.getItem('sightseerInfo1')
                ).SCMSUserName;
            } else {
                $this.abc = JSON.parse(
                    sessionStorage.getItem('userInfo1')
                ).SCMSUserName;
            }
            console.log($this.meaddtable);
            console.log($this.sestion);
            console.log($this.filesize);
            console.log($this.file);
            if ($this.sestion == 1) {
                if ($this.filesize < 20971520 && $this.filesize) {
                    //   alert("123")
                    event.preventDefault(); //取消默认行为
                    $this.guid = $this.newguid();
                    let formData = new FormData();
                    // 向 formData 对象中添加文件
                    formData.append('file', $this.file);
                    $this.$axios({
                        method: 'post',
                        url: `/api/FileManage/FileManage_UpLoad?argGuid={${$this.guid}}`,
                        data: formData
                    }).then(res => {
                        let a = $this.meaddtable.DataType;
                        // if (a == 'FileManage_OperationManual') {
                        //     a = 1;
                        // } else if (a == $this.lang.FileManage_InstallationInstructions) {
                        //     a = 2;
                        // } else if (a == $this.lang.FileManage_MaintenanceManual) {
                        //     a = 3;
                        // } else if (a == $this.lang.FileManage_CommonProblemsAndCountermeasures) {
                        //     a = 4;
                        // } else if (a == $this.lang.FileManage_EquipmentDrawings) {
                        //     a = 5;
                        // }
                        $this.$axios
                            .post(
                                `/api/FileManage/FileManage_AddDeviceData?argDataTitle=${$this.meaddtable.DataTitle}&argDataType=${a}&argAID=${$this.meaddtable.AID}&argAddPerson=${$this.abc}&argImportFileName=${afname}&argGuid=${$this.guid}`
                            )
                            .then(res1 => {
                                this.filesize  = 0
                                 setTimeout(() => {
                        $('.tip').css({
                            zoom: $this.a11,
                            left: `calc(50% - ${($('.tip').width() / 2) *
                                $this.a11}px)`,
                            top: `calc(50% - ${($('.tip').height() / 2) *
                                $this.a11}px)`
                        });
                        $this.tipchange = true;
                        $this.move('tip', 'tiphead');
                    });
                                $this.pyyd1 = true;
                                console.log(res1);
                                if (res1.data.code == 1) {
                                    if (res1.data.msg == 'AID不能为空') {
                                        $this.tipword = $this.lang.FileManage_SelectEquipmentName;
                                    } else {
                                        $this.tipword = res1.data.msg;
                                    }
                                } else {
                                    $this.tipword = $this.lang.EquipmentAccount_SuccessfullyAdded;
                                    $this.changetrue = false;
                                    $this.getsetime();
                                }
                            });
                    });
                    //创建 formData 对象
                } else {
                    $this.guid = $this.newguid();
                    let a = $this.meaddtable.DataType;
                    // if (a == 'FileManage_OperationManual') {
                    //     a = 1;
                    // } else if (a == $this.lang.FileManage_InstallationInstructions) {
                    //     a = 2;
                    // } else if (a == $this.lang.FileManage_MaintenanceManual) {
                    //     a = 3;
                    // } else if (a == $this.lang.FileManage_CommonProblemsAndCountermeasures) {
                    //     a = 4;
                    // } else if (a == $this.lang.FileManage_EquipmentDrawings) {
                    //     a = 5;
                    // }
                    $this.$axios
                        .post(
                            `/api/FileManage/FileManage_AddDeviceData?argDataTitle=${$this.meaddtable.DataTitle}&argDataType=${a}&argAID=${$this.meaddtable.AID}&argAddPerson=${$this.abc}&argImportFileName=${afname}&argGuid=${$this.guid}`
                        )
                        .then(res1 => {
                             setTimeout(() => {
                        $('.tip').css({
                            zoom: $this.a11,
                            left: `calc(50% - ${($('.tip').width() / 2) *
                                $this.a11}px)`,
                            top: `calc(50% - ${($('.tip').height() / 2) *
                                $this.a11}px)`
                        });
                        $this.tipchange = true;
                        $this.move('tip', 'tiphead');
                    });
                            $this.pyyd1 = true;
                            console.log(res1);
                            if (res1.data.code == 1) {
                                if (res1.data.msg == 'AID不能为空') {
                                    $this.tipword = $this.lang.FileManage_SelectEquipmentName;
                                } else {
                                    $this.tipword = res1.data.msg;
                                }
                            } else {
                                $this.tipword = $this.lang.EquipmentAccount_SuccessfullyAdded;
                                $this.changetrue = false;
                                $this.getsetime();
                            }
                        });
                }
            } else if ($this.sestion == 3) {
                
                if ($this.filesize < 20971520 && $this.filesize) {
                    event.preventDefault(); //取消默认行为
                    let formData = new FormData();
                    // 向 formData 对象中添加文件
                    formData.append('file', $this.file);

                    $this.$axios({
                        method: 'post',
                        url: `/api/FileManage/FileManage_UpLoad?argGuid={${$this.meaddtable.DID}}`,
                        data: formData
                    }).then(res => {
                        let a = $this.meaddtable.DataType;
                            this.filesize  = 0
                        // if (a == 'FileManage_OperationManual') {
                        //     a = 1;
                        // } else if (a == $this.lang.FileManage_InstallationInstructions) {
                        //     a = 2;
                        // } else if (a == $this.lang.FileManage_MaintenanceManual) {
                        //     a = 3;
                        // } else if (a == $this.lang.FileManage_CommonProblemsAndCountermeasures) {
                        //     a = 4;
                        // } else if (a == $this.lang.FileManage_EquipmentDrawings) {
                        //     a = 5;
                        // }
                        // console.log($this.meaddtable);
                        let c = JSON.stringify($this.tableData1);
                        let b = JSON.stringify(c);
                        for (let i = 0; i < c.length; i++) {
                            if (!$this.meaddtable.DataTitle) {
                                 setTimeout(() => {
                        $('.tip').css({
                            zoom: $this.a11,
                            left: `calc(50% - ${($('.tip').width() / 2) *
                                $this.a11}px)`,
                            top: `calc(50% - ${($('.tip').height() / 2) *
                                $this.a11}px)`
                        });
                        $this.tipchange = true;
                        $this.move('tip', 'tiphead');
                    });
                                $this.pyyd1 = true;
                                $this.tipword = $this.lang.FileManage_DataTitleIsEmpty;
                                return;
                            } else if (
                                $this.meaddtable.DataTitle == c[i].DataTitle
                            ) {
                                 setTimeout(() => {
                        $('.tip').css({
                            zoom: $this.a11,
                            left: `calc(50% - ${($('.tip').width() / 2) *
                                $this.a11}px)`,
                            top: `calc(50% - ${($('.tip').height() / 2) *
                                $this.a11}px)`
                        });
                        $this.tipchange = true;
                        $this.move('tip', 'tiphead');
                    });
                                $this.pyyd1 = true;
                                $this.tipword = $this.lang.FileManage_DataTitleIsExist;
                                console.log(c[i].DataTitle);
                                return;
                            }
                        }
                        if (
                            $this.tipword !== $this.lang.FileManage_DataTitleIsExist ||
                            $this.tipword !== $this.lang.FileManage_DataTitleIsEmpty
                        ) {
                            $this.$axios
                                .post(
                                    `/api/FileManage/FileManage_ModifyDeviceData?argDataTitle=${$this.meaddtable.DataTitle}&argDataType=${a}&argAID=${$this.meaddtable.AID}&argImportFileName=${afname}&argDataID=${$this.meaddtable.DID}`
                                )
                                .then(res1 => {
                                     setTimeout(() => {
                        $('.tip').css({
                            zoom: $this.a11,
                            left: `calc(50% - ${($('.tip').width() / 2) *
                                $this.a11}px)`,
                            top: `calc(50% - ${($('.tip').height() / 2) *
                                $this.a11}px)`
                        });
                        $this.tipchange = true;
                        $this.move('tip', 'tiphead');
                    });
                                    $this.pyyd1 = true;
                                    if(res.data.code == 0){
   $this.tipword = $this.lang.FormulaManage_HT_FormulaSetting_ModifiedSuccessfully;
                                    }else{
                                    //   $this.tipword = res.data.msg  
                                      $this.tipword = res1.data.data
                                    }
                                 
                                    $this.changetrue = false;
                                    $this.getsetime();
                                })
                                .catch(error => {
                                    console.log(error);
                                });
                        }
                    });
                    //创建 formData 对象
                } else {
                    //  $this.guid = $this.newguid();
                    let a = $this.meaddtable.DataType;
                    // if (a == 'FileManage_OperationManual') {
                    //     a = 1;
                    // } else if (a == $this.lang.FileManage_InstallationInstructions) {
                    //     a = 2;
                    // } else if (a == $this.lang.FileManage_MaintenanceManual) {
                    //     a = 3;
                    // } else if (a == $this.lang.FileManage_CommonProblemsAndCountermeasures) {
                    //     a = 4;
                    // } else if (a == $this.lang.FileManage_EquipmentDrawings) {
                    //     a = 5;
                    // }
                    // console.log($this.meaddtable);
                    let c = JSON.stringify($this.tableData1);
                    let b = JSON.stringify(c);
                    for (let i = 0; i < c.length; i++) {
                        if (!$this.meaddtable.DataTitle) {
                             setTimeout(() => {
                        $('.tip').css({
                            zoom: $this.a11,
                            left: `calc(50% - ${($('.tip').width() / 2) *
                                $this.a11}px)`,
                            top: `calc(50% - ${($('.tip').height() / 2) *
                                $this.a11}px)`
                        });
                        $this.tipchange = true;
                        $this.move('tip', 'tiphead');
                    });
                            $this.pyyd1 = true;
                            $this.tipword = $this.lang.FileManage_DataTitleIsEmpty;
                            return;
                        } else if (
                            $this.meaddtable.DataTitle == c[i].DataTitle
                        ) {
                             setTimeout(() => {
                        $('.tip').css({
                            zoom: $this.a11,
                            left: `calc(50% - ${($('.tip').width() / 2) *
                                $this.a11}px)`,
                            top: `calc(50% - ${($('.tip').height() / 2) *
                                $this.a11}px)`
                        });
                        $this.tipchange = true;
                        $this.move('tip', 'tiphead');
                    });
                            $this.pyyd1 = true;
                            $this.tipword = $this.lang.FileManage_DataTitleIsExist;
                            console.log(c[i].DataTitle);
                            return;
                        }
                    }
                    if (
                        $this.tipword !== $this.lang.FileManage_DataTitleIsExist ||
                        $this.tipword !== $this.lang.FileManage_DataTitleIsEmpty
                    ) {
                        $this.$axios
                            .post(
                                `/api/FileManage/FileManage_ModifyDeviceData?argDataTitle=${$this.meaddtable.DataTitle}&argDataType=${a}&argAID=${$this.meaddtable.AID}&argImportFileName=${afname}&argDataID=${$this.meaddtable.DID}`
                            )
                            .then(res1 => {
                                if (res1.data.code === 0) {
                                    setTimeout(() => {
                                        $('.tip').css({
                                            zoom: $this.a11,
                                            left: `calc(50% - ${($('.tip').width() / 2) *
                                                $this.a11}px)`,
                                            top: `calc(50% - ${($('.tip').height() / 2) *
                                                $this.a11}px)`
                                        });
                                        $this.tipchange = true;
                                        $this.move('tip', 'tiphead');
                                    });
                                    $this.pyyd1 = true;
                                    if(res1.data.code == 0){
                                        $this.tipword = $this.lang.FormulaManage_HT_FormulaSetting_ModifiedSuccessfully;
                                    }else{
                                      $this.tipword = res1.data.msg  
                                    }
                                    $this.changetrue = false;
                                    $this.getsetime();
                                } else {
                                    setTimeout(() => {
                                        $('.tip').css({
                                            zoom: $this.a11,
                                            left: `calc(50% - ${($('.tip').width() / 2) *
                                                $this.a11}px)`,
                                            top: `calc(50% - ${($('.tip').height() / 2) *
                                                $this.a11}px)`
                                        });
                                        $this.tipchange = true;
                                        $this.move('tip', 'tiphead');
                                        $this.pyyd1 = true;
                                        $this.tipword = res1.data.msg
                                    });
                                }
                            })
                            .catch(error => {
                                console.log(error);
                            });
                    }
                }
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
                            zoom: this.a11,
                            left: `calc(50% - ${($('.tip').width() / 2) *
                                this.a11}px)`,
                            top: `calc(50% - ${($('.tip').height() / 2) *
                                this.a11}px)`
                        });
                        this.tipchange = true;
                        this.move('tip', 'tiphead');
                    });
                this.pyyd1 = true;
                this.tipword =  this.lang.RoleManage_HT_PEAPositiveInteger;
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
                        this.pyyd1 = true;
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
            console.log(this.PageData);
            if (
                this.PageData.PageIndex < this.PageData.TotalPage &&
                this.PageData.PageIndex !== this.PageData.TotalPage
            ) {
                // alert("s")
                this.PageData.PageIndex++;
                this.onetable();
            }
        },
        end() {
            this.PageData.PageIndex = this.PageData.TotalPage;
            this.onetable();
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
                 sx(){
            let that = this
            setTimeout(()=>{
for(let i=0;i<$('.el-picker-panel').length;i++){
                $('.el-picker-panel')[i].style.zoom = that.a11
            }
            })
              
        },
        Preservation2() {
            this.Preservation = this.Preservation1;
            if (this.Preservation1 == this.lang.EquipmentAccount_EquipmentType) {
                this.tipword = this.lang.EquipmentAccount_SelectEquipmentType1;
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
                this.pyyd1 = true;
            } else if (this.Preservation5 == this.lang.EquipmentAccount_InstallPosition) {
                this.tipword = this.lang.EquipmentAccount_SelectInstallPosition;
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
                this.pyyd1 = true;
            } else {
                this.cancel1 = false;
            }
        },
        select(a, b) {
            this.argID = [];

            let i = 0;
            for (i in a) {
                this.argID.push(a[i].DID);
            }
        },
        selectall(a, b) {
            this.argID = [];

            let i = 0;
            for (i in a) {
                this.argID.push(a[i].DID);
            }
        },
        Preservation3() {
            this.Preservation = this.Preservation1;
            if (this.pen.DeviceType == this.lang.EquipmentAccount_EquipmentType) {
                this.tipword = this.lang.EquipmentAccount_SelectEquipmentType1;
                this.pen.DeviceType = this.lang.EquipmentAccount_ClickSelect;
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
                this.pyyd1 = true;
            } else if (this.pen.InstallationLocation == this.lang.EquipmentAccount_InstallPosition) {
                this.tipword = this.lang.EquipmentAccount_SelectInstallPosition;
                this.pen.InstallationLocation = this.lang.EquipmentAccount_ClickSelect;
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
                this.pyyd1 = true;
            } else {
                this.cancel1 = false;
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
        handleEdit(a, b) {
            this.sestion = 2;
            console.log(b);
            this.meaddtable = b;
            this.meaddtable.PeriodValue = parseInt(this.meaddtable.PeriodValue);
            if (this.meaddtable.SOPType == 1) {
                this.meaddtable.SOPType = this.lang.RoleManage_Operation;
            } else if (this.meaddtable.SOPType == 2) {
                this.meaddtable.SOPType = this.lang.FileManage_Maintenance;
            } else if (this.meaddtable.SOPType == 3) {
                this.meaddtable.SOPType = this.lang.FileManage_Repair;
            }
            if (this.meaddtable.ReminderTimeUnit == 1) {
                this.meaddtable.ReminderTimeUnit = '小时';
            } else if (this.meaddtable.ReminderTimeUnit == 2) {
                this.meaddtable.ReminderTimeUnit = '天';
            } else if (this.meaddtable.ReminderTimeUnit == 3) {
                this.meaddtable.ReminderTimeUnit = '周';
            } else if (this.meaddtable.ReminderTimeUnit == 4) {
                this.meaddtable.ReminderTimeUnit = '月';
            }
            setTimeout(() => {
                $('.sestion').css({
                    zoom: this.a11,
                    left: `calc(50% - ${($('.sestion').width() / 2) *
                        this.a11}px)`,
                    top: `calc(50% - ${($('.sestion').height() / 2) *
                        this.a11}px)`
                });
                this.changetrue = true;
                this.move('sestion', 'sestionheader1');
            });
            this.pdyd2 = true;
        },
        handleEdit11(a, b) {
            if (!this.xzshow) {
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
                this.pdyd3 = true;
                return;
            }
            console.log(b);
            if (b.FileName == null) {
                this.tipword = this.lang.FileManage_DataFileNotExist;
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
                this.pyyd1 = true;
            } else {
                //  var data = require(`../../download/f617b2a2-a3b1-bc20-6a59-12c2a4ee47fe/bj.png`)
                // this.$axios({
                //                 method: 'get',
                //                 url: `..\\nginx-1.17.3\\html\\Page\\dist\\download\\${b.FileName}`,
                //             }).then(res => {

                //               console(res)
                //             })
                // console.log(data);
                this.$axios
                    .post(
                        `/api/FileManage/FileManage_SetDownLoad?argID=${b.DID}`
                    )
                    .then(res => {
                        console.log('1102===>', res);
                        //         console.log(res)
                        //         this.$axios({
                        //         method: 'get',
                        //         url: `/download/${b.FileName}`,
                        //     }).then(res => {

                        //       console.log(res)
                        //     })
                        
                        var aa = document.createElement('a');
                        aa.href = `/download/${b.FileName}`;
                        aa.setAttribute('download', b.FileName);
                        aa.click();
                        // window.location.href = `/download/${b.FileName}`
                    });
            }
        },
        handleEdit1(a, b) {
            if (!this.xgshow) {
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
                this.pdyd3 = true;
                return;
            }
            this.sestion = 3;
            this.filename = '';
            this.file = '';
            console.log(b);
            this.meaddtable = b;
            if (b.FileName !== null) {
                this.filename = b.FileName;
            }
            if (b.FileName == "''") {
                this.filename = '';
            }

            this.meaddtable.PeriodValue = parseInt(this.meaddtable.PeriodValue);
            if (this.meaddtable.PeriodUnit == 1) {
                this.meaddtable.PeriodUnit = '小时';
            } else if (this.meaddtable.PeriodUnit == 2) {
                this.meaddtable.PeriodUnit = '天';
            } else if (this.meaddtable.PeriodUnit == 3) {
                this.meaddtable.PeriodUnit = '周';
            } else if (this.meaddtable.PeriodUnit == 4) {
                this.meaddtable.PeriodUnit = '月';
            }
            if (this.meaddtable.ReminderTimeUnit == 1) {
                this.meaddtable.ReminderTimeUnit = '小时';
            } else if (this.meaddtable.ReminderTimeUnit == 2) {
                this.meaddtable.ReminderTimeUnit = '天';
            } else if (this.meaddtable.ReminderTimeUnit == 3) {
                this.meaddtable.ReminderTimeUnit = '周';
            } else if (this.meaddtable.ReminderTimeUnit == 4) {
                this.meaddtable.ReminderTimeUnit = '月';
            }
            setTimeout(() => {
                $('.sestion').css({
                    zoom: this.a11,
                    left: `calc(50% - ${($('.sestion').width() / 2) *
                        this.a11}px)`,
                    top: `calc(50% - ${($('.sestion').height() / 2) *
                        this.a11}px)`
                });
                this.changetrue = true;
                this.move('sestion', 'sestionheader1');
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
            if (!this.tjshow) {
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
                this.pdyd3 = true;
                return;
            }
            this.meaddtable = {
                Operate: '1',
                DID: '',
                DataTitle: '', //资料标题
                DataType: 1, //资料类型，1-操作手册，2-安装说明，3-维护手册，4-常见问题处理对策，5-设备图纸
                AID: '', //关联设备台账的id
                FileName: '', //文件名称
                FileType: '', //文件类型
                AddPerson: '', //添加人
                AddTime: '', //添加时间，
                DeviceName: this.lang.EquipmentAccount_ClickSelect
            };
            this.filename = '';
            this.meaddtable.CurrentStartTime = this.gettimenowtime();
            this.meaddtable.CurrentEndTime = this.gettimenowtime();
            this.meaddtable.MaturityTime = this.gettimenowtime();
            setTimeout(() => {
                $('.sestion').css({
                    zoom: this.a11,
                    left: `calc(50% - ${($('.sestion').width() / 2) *
                        this.a11}px)`,
                    top: `calc(50% - ${($('.sestion').height() / 2) *
                        this.a11}px)`
                });
                this.changetrue = true;
                this.move('sestion', 'sestionheader1');
            });
            this.pdyd2 = true;
            this.sestion = 1;
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
                    $('.seleword11')[0].clientHeight +
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

        onetable() {
            let c = this.Meter;
            if (this.Meterid == '11111111-1111-1111-1111-111111111111') {
                c = '';
            } else {
                c = this.Meter;
            }

            this.$axios
                .post(
                    `/api/FileManage/FileManage_GstDeviceData?argDeviceType=${c}&argStartTime=${this.value1}&argEndTime=${this.value2}&argKeyword=${this.keyword}&argPageSize=${this.PageData.PageSize}&argPageIndex=${this.PageData.PageIndex}`
                )
                .then(res => {
                    if (res.data.code == 0) {
                        var data = [];
                        res.data.data.DataList.forEach(item => {
                            data.push(item.AID);
                        });

                        this.$axios({
                            method: 'POST',
                            url: '/api/EquipmentAccount/GetPaths',
                            data: data
                        }).then(res1 => {
                            this.tableData1 = res.data.data.DataList;
                            if (res.data.data.length == 0) {
                                this.PageData = {
                                    PageSize: 50,
                                    TotalCount: 0,
                                    TotalPage: 1,
                                    PageIndex: 1,
                                    LastEnabled: false,
                                    NextEnabled: false
                                };
                            } else {
                                this.PageData = res.data.data.ParameterList;
                            }
                            let i = 0;
                            for (i in this.tableData1) {
                                let a = i;
                                this.tableData1[i].Number = ++a;
                                // if (this.tableData1[i].DataType == 1) {
                                //     this.tableData1[i].DataType = this.lang.FileManage_OperationManual;
                                // } else if (this.tableData1[i].DataType == 2) {
                                //     this.tableData1[i].DataType = this.lang.FileManage_InstallationInstructions;
                                // } else if (this.tableData1[i].DataType == 3) {
                                //     this.tableData1[i].DataType = this.lang.FileManage_MaintenanceManual;
                                // } else if (this.tableData1[i].DataType == 4) {
                                //     this.tableData1[i].DataType =
                                //         this.lang.FileManage_CommonProblemsAndCountermeasures;
                                // } else if (this.tableData1[i].DataType == 5) {
                                //     this.tableData1[i].DataType = this.lang.FileManage_EquipmentDrawings;
                                // }
                                this.tableData1[i].AddTime = this.gettime(
                                    this.tableData1[i].AddTime
                                );

                                if (this.tableData1[i].IsEnabled == true) {
                                    this.tableData1[i].IsEnabled = this.lang.ProcessParameterReport_HT_Yes;
                                } else if (
                                    this.tableData1[i].IsEnabled == false
                                ) {
                                    this.tableData1[i].IsEnabled = this.lang.ProcessParameterReport_HT_No;
                                }
                                if (this.tableData1[i].PeriodUnit == 1) {
                                    this.tableData1[i].PeriodValue =
                                        this.tableData1[i].PeriodValue + '小时';
                                } else if (this.tableData1[i].PeriodUnit == 2) {
                                    this.tableData1[i].PeriodValue =
                                        this.tableData1[i].PeriodValue + '天';
                                } else if (this.tableData1[i].PeriodUnit == 3) {
                                    this.tableData1[i].PeriodValue =
                                        this.tableData1[i].PeriodValue + '周';
                                } else if (this.tableData1[i].PeriodUnit == 4) {
                                    this.tableData1[i].PeriodValue =
                                        this.tableData1[i].PeriodValue + '月';
                                }
                            }
                            var that = this;
                            Object.keys(res1.data.data.Equipment).forEach(
                                function(key) {
                                    that.tableData1.forEach(item => {
                                        if (item.AID == key) {
                                            item.DataPath =
                                                res1.data.data.Equipment[
                                                    key
                                                ].DevicePath;
                                        }
                                    });
                                }
                            );
                            this.nowpage = this.PageData.PageIndex;
                            let avc = JSON.stringify(this.tableData1);
                            this.antable = JSON.parse(avc);
                            console.log(this.tableData1);
                            // res1.data.data.Equipment.forEach((item)=>{
                            //     console.log(item)
                            // })
                        });
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
                        this.pyyd1 = true;
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
            if (!this.cxshow && a !== 1) {
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
                this.pdyd3 = true;
                return;
            }
            if (
                new Date(this.value1).getTime() >
                new Date(this.value2).getTime()
            ) {
                this.tipword = this.lang.AlarmRecord_HT_TheQueryDate;
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
                this.pdyd3 = true;
                return;
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
                .post(`/api/FileManage/FileManage_GstEquipmentType`)
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
                .post(`/api/FileManage/FileManage_GstDeviceDataInitTime`)
                .then(res => {
                    console.log('sss', res);
                    this.value1 = res.data.data.StartTime;
                    this.value2 = res.data.data.EndTime;
                })
                .then(() => {
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
            let a = this.a11 * 120 + 'px';
            $('.table-container').css({
                height: `calc(100% - ${a})`
            });
        });
        this.value1 = this.GMTToStr(this.value1);
        this.value2 = this.GMTToStr(this.value2);
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
        this.$axios
            .post(`/api/UserManage/UserManage_GstUserWithNoPage`)
            .then(res => {
                console.log('ss', res);
                this.person = res.data.data;
            });
        this.getsetime();

        this.jurisdiction = this.$store.state.btnPowerData;
        this.buttonarr = this.findPathByLeafId(
            this.GetUrlParam('id'),
            this.jurisdiction
        )[0].Children;
        this.buttonarr.forEach(item => {
            if (item.RightName == '设备资料-查询按钮') {
                this.cxid = item.RightID;
            } else if (item.RightName == '设备资料-添加按钮') {
                this.tjid = item.RightID;
            } else if (item.RightName == '设备资料-删除按钮') {
                this.scid = item.RightID;
            } else if (item.RightName == '设备资料-下载按钮') {
                this.xzid = item.RightID;
            } else if (item.RightName == '设备资料-修改按钮') {
                this.xgid = item.RightID;
            }
        });
        var userid = '';
        if (!JSON.parse(sessionStorage.getItem('userInfo1'))) {
            userid = JSON.parse(sessionStorage.getItem('sightseerInfo1'))
                .SCMSUserID;
        } else {
            userid = JSON.parse(sessionStorage.getItem('userInfo1')).SCMSUserID;
        }
        this.$axios({
            method: 'post',
            url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.cxid}`
        })
            .then(res => {
                this.cxshow = res.data.data;
            })
            .catch(err => {
                console.log('err', err);
            });
        this.$axios({
            method: 'post',
            url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.tjid}`
        })
            .then(res => {
                this.tjshow = res.data.data;
            })
            .catch(err => {
                console.log('err', err);
            });
        this.$axios({
            method: 'post',
            url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.scid}`
        })
            .then(res => {
                this.scshow = res.data.data;
            })
            .catch(err => {
                console.log('err', err);
            });
        this.$axios({
            method: 'post',
            url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.xzid}`
        })
            .then(res => {
                this.xzshow = res.data.data;
            })
            .catch(err => {
                console.log('err', err);
            });
        this.$axios({
            method: 'post',
            url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.xgid}`
        })
            .then(res => {
                this.xgshow = res.data.data;
            })
            .catch(err => {
                console.log('err', err);
            });
    }
};
</script>

<style lang="scss" scoped>
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
    .tipword {
        width: 100%;
        text-align: center;
    }
    .tipdetermine {
        cursor: pointer;
        color: #ea9328;
        width: 310px;
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
    height: 60px;
    line-height: 60px;
    padding: 0px 22px 0px 22px;
    padding-right: 0 !important;
    padding-left: 10px !important;
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
        width: 80px;
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
    height: 150px;
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
.twoge {
    position: absolute;
    overflow: hidden;
    left: 150px;
    top: 200px;
    width: 240px;
    .file {
        cursor: pointer;
        height: 36px;
        width: 100px;
        line-height: 36px;
        background-color: #386df0;
        border: none;
        color: #fff;
        float: left;
    }
    .nosc {
        cursor: pointer;
        height: 36px;
        width: 100px;
        background-color: #999;
        border: none;
        color: #fff;
        float: left;
        line-height: 36px;
        text-align: center;
        border-radius: 5px;
        position: relative;
        top: 10px;
        left: 10px;
    }
}
textarea {
    position: relative;
    left: 80px;
    top: 30px;
}
.Preservation1 {
    margin-right: 33px;
    margin-top: 30px;
}
.cancel {
    cursor: pointer;
    width: 100px;
    height: 34px;
    // margin-top: 10px;
    // margin-right: 10px;
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
        cursor: pointer;
        color: #ea9328;
        width: 310px;
        line-height: 30px;
        text-align: center;
        margin-left: 35px;
        height: 30px;
        background-color: #f3e3ad;
    }

    .delclass {
        width: 330px;
        line-height: 30px;
           position: absolute;
        bottom: 10px;
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
    width: 65px;
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
        padding: 30px 30px 0px 30px;
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
    height: 300px;
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
    left: 100px;
    width: calc(100% - 130px);
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
    position: absolute;
    right: 30px;
    bottom: 35px;
    color: #ffffff;
    border-radius: 3px;
    text-align: center;
     
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
   right: 150px;
    bottom: 35px;
    background-color: #999999;
     position: absolute;
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
    height: 500px !important;
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
        width: 200px ;
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
        top: 0;
        bottom: 0;
        margin: auto;
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
        width: 100%;
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
                width: 200px ;
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
    .outputlist_upload {
        opacity: 0 !important;
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
        background-color: #999999;
        float: right;
        color: #ffffff;
        border-radius: 3px;
        text-align: center;
        line-height: 34px;
    }
    .table {
        width: 100% ;
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
.me {
    width: 60px;
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
.sc {
    position: relative;
    top: 5px;
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
.seleword {
    display: inline-block;
    width: 13%;
    height: 40px;
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto;
    background: #fff;
    text-indent: 1em;
    line-height: 40px;
    .seleword1 {
        width: calc(100%);
        position: relative;
        height: 100%;
        padding-right: 20px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        word-break: break-all;
        img {
            position: absolute;
            right: 2px;
            width: 20px;
            height: 20px;
            top: 10px;
        }
    }
    // align-content: bottom;
}
.tinput {
}
.tinput1 {
    // margin-left: 23% !important;
}
.seleword2 {
    display: inline-block;
    width: 21%;
    height: 30px;
    position: absolute;
    top: 0px;
    bottom: 0;
    margin: auto;
    background: #fff;
    text-indent: 1em;
    line-height: 30px;
    .seleword1 {
        width: calc(100%);
        position: relative;
        height: 100%;
        padding-right: 20px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        word-break: break-all;
        img {
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
  
}
.sblx {
    display: inline-block;
}
.sblx1{
    display: inline-block;
}
.img {
    div{
        font-size:14px;
    }
}
</style>
