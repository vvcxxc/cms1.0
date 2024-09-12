<!--
 * @Description: 备件管理备件台账界面
 * @Date: 2019-11-25 19:07:09
 * @Author: 随风
 * @LastEditors: Tao
 * @LastEditTime: 2020-07-31 14:06:28
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
            class="search-container"
            :class="{ colordiv: $store.state.color == 'grey' }"
            :style="{
               zoom:a11
            }"
        >
            <span class="sblx" 
                >{{lang.SparePartsManage_TypeSpareParts_C}}</span
            >
            <div
                class="seleword"
                @click.stop="selectword1"
               
            >
                <div class="seleword1">
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
            <input
                type="text"
                class="tinput"
               :placeholder="lang.AlarmRecord_Time_Keyword"
                v-model="keyword"
                :style="[
                 
                    { marginLeft: 220 * 1 + 10 + 'px' }
                ]"
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
            <div class="fr">
                <a
                    href="javascript:;"
                    class="file"
                
                >
                    {{lang.QualityManage_SampleChoseUserControl_Import}}
                    <input
                        @click="dr($event)"
                        type="file"
                        ref="upload"
                        accept=".xls, .xlsx"
                        class="outputlist_upload"
                    />
                </a>
                <div
                    class="export"
                    @click="exportTable"
                  
                >
                    {{lang.QualityManage_SampleChoseUserControl_Export}}
                </div>
            </div>
        </div>
        <div class="table-container table-container1">
            <el-table
                ref="multipleTable"
                :data="tableData"
                stripe
                border
                :style="{ fontSize: a11 * 15 + 'px', width: '100%' }"
                height="100%"
                :row-style="{ height: 50 * a11 + 'px' }"
                tooltip-effect="dark"
                highlight-current-row
                :header-cell-style="{
                    background:
                        $store.state.color == 'grey' ? '#D9DBDE' : '#5a6c98',
                    color: $store.state.color == 'grey' ? '#000' : '#fff',
                    'border-left': '1px solid #cccccc',
                    height: 50 * a11 + 'px',
                    padding: '0'
                }"
                @select="select"
                @select-all="selectall"
            >   
                <template slot="empty">
                    <span>{{lang.SCMSConsoleWebApiMySql_NoData}}</span>
                </template>
                <el-table-column
                    type="selection"
                    :width="60*a11<60?60:60*a11"
                    fixed
                ></el-table-column>
                <el-table-column
                    :label="lang.RoleManage_NO"
                    :width="100 * a11"
                    prop="number"
                    fixed
                >
                    <template slot-scope="scope">{{
                        scope.row.number
                    }}</template>
                </el-table-column>
                <el-table-column prop="name" :label="lang.RoleManage_Operation"  :width="200 * a11" fixed>
                    <template slot-scope="scope">
                        <!-- <i class="el-icon-share"></i> -->
                        <div
                            class="img"
                             :style="{zoom:a11}"
                            @click="handleEdit(scope.$index, scope.row)"
                        >
                            <img  :src="look" alt />
                            {{ scope.row.phone }}
                        </div>
                        <div
                            class="img"
                            :style="{zoom:a11}"
                            @click="handleEdit1(scope.$index, scope.row)"
                        >
                            <img  :src="pensoil" alt />
                            {{ scope.row.phone }}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="SparePartName"
                    :label="lang.SparePartsManage_NameSpareParts"
                    :width="200 * a11"
                    show-overflow-tooltip
                ></el-table-column>
                <el-table-column
                    prop="SparePartNo"
                    :label="lang.SparePartsManage_SparePartNo"
                    :width="200 * a11"
                    show-overflow-tooltip
                ></el-table-column>
                <el-table-column
                    prop="DetailType"
                    :label="lang.SparePartsManage_TypeSpareParts"
                    :width="200 * a11"
                    show-overflow-tooltip
                ></el-table-column>
                <el-table-column
                    prop="SparePartModel"
                    :label="lang.SparePartsManage_SparePartsModel"
                    :width="200 * a11"
                    show-overflow-tooltip
                ></el-table-column>
                <el-table-column
                    prop="Manufactor"
                    :label="lang.SparePartsManage_Manufacturer"
                    :width="300 * a11"
                    show-overflow-tooltip
                ></el-table-column>
                <el-table-column
                    prop="DetailWarehouseLocation"
                    :label="lang.SparePartsManage_WarehouseLocation"
                    :width="300 * a11"
                    show-overflow-tooltip
                ></el-table-column>
                <el-table-column
                    prop="ServiceLife"
                    :label="lang.SparePartsManage_ServiceLife"
                    :width="300 * a11"
                    show-overflow-tooltip
                ></el-table-column>
                <el-table-column
                    prop="Unit"
                    :label="lang.SparePartsManage_Uom"
                    :width="300 * a11"
                    show-overflow-tooltip
                ></el-table-column>
                <el-table-column
                    prop="UnitPrice"
                    :label="lang.SparePartsManage_SparePartsUnit"
                    :width="300 * a11"
                    show-overflow-tooltip
                ></el-table-column>
                <el-table-column
                    prop="StockUpper"
                    :label="lang.SparePartsManage_InventoryCeiling"
                    :width="300 * a11"
                    show-overflow-tooltip
                ></el-table-column>
                <el-table-column
                    prop="StockLower"
                    :label="lang.SparePartsManage_InventoryLowerLimit"
                    :width="300 * a11"
                    show-overflow-tooltip
                ></el-table-column>
                <el-table-column
                    prop="CurrentStock"
                    :label="lang.SparePartsManage_CurrentInventory"
                    :width="300 * a11"
                    show-overflow-tooltip
                ></el-table-column>
                <el-table-column
                    prop="Remarks"
                    :label="lang.SparePartsManage_Remark"
                    :width="300 * a11"
                    show-overflow-tooltip
                ></el-table-column>
            </el-table>
        </div>
        <div class="pages-container">
            <my-page :pageData="PageData" @req="req"></my-page>
        </div>
        <div class="sestion" v-show="change" >
            <div
                class="sestionheader"
                :class="{ colordiv: $store.state.color == 'grey' }"
            >
                <div class="sestionheader1"></div>
                <span
                    class="head"
                    v-if="sestion == 1"
                    :class="{ fcolor: $store.state.color == 'grey' }"
                    >{{lang.SparePartsManage_ViewSpareParts}}</span
                >
                <span
                    class="head"
                    v-if="sestion == 2"
                    :class="{ fcolor: $store.state.color == 'grey' }"
                    >{{lang.SparePartsManage_EditSpareParts}}</span
                >
                <span
                    class="head"
                    v-if="sestion == 3"
                    :class="{ fcolor: $store.state.color == 'grey' }"
                    >{{lang.SparePartsManage_AddSpareParts}}</span
                >
                <img
                    :src="no2"
                    alt
                    class="no"
                    @click.stop="change = false"
                    v-if="$store.state.color == 'grey'"
                />
                <img
                    :src="no"
                    alt
                    class="no"
                    @click.stop="change = false"
                    v-else
                />
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
                <div class="overflow xgtooltip">
                    <div class="zl">
                        <div class="margin" >
                            <span>{{lang.SparePartsManage_NameSpareParts}}</span>
                            <input
                                type="text"
                                v-if="sestion == 1"
                                :value="sesstion.SparePartName"
                                :disabled="disabled"
                            />
                            <input
                                type="text"
                                v-if="sestion == 3"
                                v-model="tip.SparePartName"
                            />
                            <input
                                type="text"
                                v-if="sestion == 2"
                                v-model="pen.SparePartName"
                            />
                        </div>
                        <div class="margin">
                            <span class="mi">{{lang.SparePartsManage_TypeSpareParts}}</span>
                            <div v-if="sestion == 1" class="input1">
                                <el-tooltip
                                    class="item"
                                    effect="dark"
                                    popper-class="atooltip"
                                    :content="sesstion.DetailType"
                                    placement="top-start"
                                >
                                    <span>{{ sesstion.DetailType }}</span>
                                </el-tooltip>
                                <div class="inputimg">
                                    <img :src="diji" alt />
                                </div>
                            </div>
                            <div
                                v-if="sestion == 2 || sestion == 3"
                                class="input1"
                            >
                                <el-tooltip
                                    v-if="sestion == 2"
                                    class="item"
                                    popper-class="atooltip"
                                    effect="dark"
                                    :content="pen.DetailType"
                                    placement="top-start"
                                >
                                    <span>{{ pen.DetailType }}</span>
                                </el-tooltip>
                                <el-tooltip
                                    v-if="sestion == 3"
                                    class="item"
                                    effect="dark"
                                    popper-class="atooltip"
                                    :content="wselectname2"
                                    placement="top-start"
                                >
                                    <span>{{ wselectname2 }}</span>
                                </el-tooltip>
                                <div
                                    class="inputimg"
                                    @click.stop="inputclick1()"
                                >
                                    <img :src="diji" alt />
                                </div>
                            </div>
                        </div>
                        <div class="margin">
                            <span>{{lang.SparePartsManage_Manufacturer}}</span>
                            <input
                                type="text"
                                v-if="sestion == 1"
                                :value="sesstion.Manufactor"
                                :disabled="disabled"
                            />
                            <input
                                type="text"
                                v-if="sestion == 3"
                                v-model="tip.Manufactor"
                                :disabled="disabled"
                            />
                            <input
                                type="text"
                                v-if="sestion == 2"
                                v-model="pen.Manufactor"
                                :disabled="disabled"
                            />
                        </div>
                        <div class="margin">
                            <span>{{lang.SparePartsManage_ServiceLife}}</span>
                            <template>
                                <div class="block">
                                    <el-date-picker
                                        v-model="sesstion.ServiceLife"
                                        type="datetime"
                                        :placeholder="lang.SCMSConsoleWebApiMySql_PleChooseDate"
                                        value-format="yyyy-MM-dd HH:mm:ss"
                                        :disabled="disabled"
                                        v-if="sestion == 1"
                                    ></el-date-picker>
                                    <el-date-picker
                                        v-model="pen.ServiceLife"
                                        type="datetime"
                                        :placeholder="lang.SCMSConsoleWebApiMySql_PleChooseDate"
                                        value-format="yyyy-MM-dd HH:mm:ss"
                                        :disabled="disabled"
                                        v-if="sestion == 2"
                                    ></el-date-picker>
                                    <el-date-picker
                                        v-model="time1"
                                        type="datetime"
                                        :placeholder="lang.SCMSConsoleWebApiMySql_PleChooseDate"
                                        value-format="yyyy-MM-dd HH:mm:ss"
                                        :disabled="disabled"
                                        v-if="sestion == 3"
                                    ></el-date-picker>
                                </div>
                            </template>
                        </div>
                    </div>
                    <div class="zr">
                        <div class="margin">
                            <span>{{lang.SparePartsManage_SparePartNo}}</span>
                            <input
                                type="text"
                                v-if="sestion == 1"
                                :value="sesstion.SparePartNo"
                                :disabled="disabled"
                            />
                            <input
                                type="text"
                                v-if="sestion == 2"
                                v-model="pen.SparePartNo"
                                :disabled="disabled"
                            />
                            <input
                                type="text"
                                v-if="sestion == 3"
                                v-model="tip.SparePartNo"
                                :disabled="disabled"
                            />
                        </div>
                        <div class="margin">
                            <span>{{lang.SparePartsManage_SparePartsModel}}</span>
                            <input
                                type="text"
                                v-if="sestion == 1"
                                :value="sesstion.SparePartModel"
                                :disabled="disabled"
                            />
                            <input
                                type="text"
                                v-if="sestion == 2"
                                v-model="pen.SparePartModel"
                                :disabled="disabled"
                            />
                            <input
                                type="text"
                                v-if="sestion == 3"
                                v-model="tip.SparePartModel"
                                :disabled="disabled"
                            />
                        </div>
                        <div class="margin">
                            <span>{{lang.SparePartsManage_WarehouseLocation}}</span>
                            <div v-if="sestion == 1" class="input1">
                                <el-tooltip
                                    class="item"
                                    effect="dark"
                                    popper-class="atooltip"
                                    :content="sesstion.DetailWarehouseLocation"
                                    placement="top-start"
                                >
                                    <span>{{
                                        sesstion.DetailWarehouseLocation
                                    }}</span>
                                </el-tooltip>
                                <div class="inputimg">
                                    <img :src="diji" alt />
                                </div>
                            </div>
                            <div
                                class="input1"
                                v-if="sestion == 2 || sestion == 3"
                            >
                                <el-tooltip
                                    v-if="sestion == 2"
                                    popper-class="atooltip"
                                    class="item"
                                    effect="dark"
                                    :content="pen.DetailWarehouseLocation"
                                    placement="top-start"
                                >
                                    <span>{{
                                        pen.DetailWarehouseLocation
                                    }}</span>
                                </el-tooltip>
                                <el-tooltip
                                    v-if="sestion == 3"
                                    class="item"
                                    effect="dark"
                                    popper-class="atooltip"
                                    :content="wselectname3"
                                    placement="top-start"
                                >
                                    <span>{{ wselectname3 }}</span>
                                </el-tooltip>
                                <div class="inputimg" @click="inputclick2()">
                                    <img :src="diji" alt />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="homesetion">
                    <div class="hometop">
                          <div class="linetop3 hometop-title">
                            {{lang.EquipmentAccount_OtherInformation}}
                        </div>
                       
                        <div class="line linetop4"></div>
                    </div>
                </div>
                <div class="overflow">
                    <div class="zl">
                        <div class="margin" >
                            <span>{{lang.SparePartsManage_Uom}}</span>
                            <input
                                type="text"
                                v-if="sestion == 1"
                                :value="sesstion.Unit"
                                :disabled="disabled"
                            />
                            <input
                                type="text"
                                v-if="sestion == 2"
                                v-model="pen.Unit"
                                :disabled="disabled"
                            />
                            <input
                                type="text"
                                v-if="sestion == 3"
                                v-model="tip.Unit"
                                :disabled="disabled"
                            />
                        </div>
                        <div class="margin">
                            <span>{{lang.SparePartsManage_InventoryCeiling}}</span>
                            <input
                                type="text"
                                v-if="sestion == 1"
                                :value="sesstion.StockUpper"
                                :disabled="disabled"
                            />
                            <input
                                type="text"
                                v-if="sestion == 2"
                                v-model="pen.StockUpper"
                                :disabled="disabled"
                            />
                            <input
                                type="text"
                                v-if="sestion == 3"
                                v-model="tip.StockUpper"
                                :disabled="disabled"
                            />
                        </div>
                        <div class="margin">
                            <span>{{lang.SparePartsManage_CurrentInventory}}</span>
                            <input
                                type="text"
                                v-if="sestion == 1"
                                :value="sesstion.CurrentStock"
                                :disabled="disabled"
                            />
                            <input
                                type="text"
                                v-if="sestion == 2"
                                v-model="pen.CurrentStock"
                                :disabled="disabled"
                            />
                            <input
                                type="text"
                                v-if="sestion == 3"
                                v-model="tip.CurrentStock"
                                :disabled="disabled"
                            />
                        </div>
                    </div>
                    <div class="zr">
                        <div class="margin" >
                            <span>{{lang.SparePartsManage_SparePartsUnit}}</span>
                            <input
                                type="text"
                                v-if="sestion == 1"
                                :value="sesstion.UnitPrice"
                                :disabled="disabled"
                            />
                            <input
                                type="text"
                                v-if="sestion == 2"
                                v-model="pen.UnitPrice"
                                :disabled="disabled"
                            />
                            <input
                                type="text"
                                v-if="sestion == 3"
                                v-model="tip.UnitPrice"
                                :disabled="disabled"
                            />
                        </div>
                        <div class="margin">
                            <span>{{lang.SparePartsManage_InventoryLowerLimit}}</span>
                            <input
                                type="text"
                                v-if="sestion == 1"
                                :value="sesstion.StockLower"
                                :disabled="disabled"
                            />
                            <input
                                type="text"
                                v-if="sestion == 2"
                                v-model="pen.StockLower"
                                :disabled="disabled"
                            />
                            <input
                                type="text"
                                v-if="sestion == 3"
                                v-model="tip.StockLower"
                                :disabled="disabled"
                            />
                        </div>
                    </div>
                </div>
                <div class="overflow overflow1">
                    <span class="remarks">{{lang.SparePartsManage_Remark}}</span>
                    <textarea
                        name
                        id
                        v-if="sestion == 1"
                        :value="sesstion.Remarks"
                        :disabled="disabled"
                    ></textarea>
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
                <div
                    class="Preservation"
                    v-if="sestion == 2"
                    @click="preservation6"
                >
                    {{lang.PopupCommon_Save}}
                </div>
                <div
                    class="Preservation"
                    v-if="sestion == 3"
                    @click="preservation"
                >
                  {{lang.PopupCommon_Save}}
                </div>
                <div
                    class="cancel"
                    v-if="sestion == 2 || sestion == 3"
                    @click="cancel"
                >
                   {{lang.PopupCommon_Cancel}}
                </div>
            </div>
        </div>
        <div class="Choice" v-show="cancel1">
            <div
                class="choicehead"
                :class="{ colordiv: $store.state.color == 'grey' }"
            >
                <div class="choicehead1"></div>
                <sapn
                    v-if="select1 == 1"
                    :class="{ fcolor: $store.state.color == 'grey' }"
                    >{{lang.EquipmentAccount_SelectEquipmentType}}</sapn
                >
                <sapn
                    v-if="select1 == 2"
                    :class="{ fcolor: $store.state.color == 'grey' }"
                    >{{lang.SCMSConsoleWebApiMySql_SelectWarehouseLocation}}</sapn
                >
                <div class="img" @click="cancel2">
                    <img :src="no2" alt v-if="$store.state.color == 'grey'" />
                    <img :src="no" alt v-else />
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
                    v-if="sestion == 2"
                    icon-class="el-icon-arrow-up"
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
        <div class="tip" v-show="tipchange">
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
        <div class="cover3" v-if="cancel1"></div>
        <div class="cover2" v-if="tipchange"></div>
    </div>
</template>

<script>
import MySearch from '../public/search01.vue';
import MyPage from '../public/Pages.vue';
import XLSX from 'xlsx';
export default {
    components: {
        // MySearch,

        MyPage
    },
    data() {
        return {
            deltrue: true,
            changeselect: false,
            tipword: '',
            xiala: require('../../assets/images/ziyuan4.png'),
            tip: {
                SparePartName: '',
                SparePartNo: '',
                SparePartType: '',
                SparePartModel: '',
                Manufactor: '',
                WarehouseLocation: '',
                ServiceLife: '',
                Unit: '',
                UnitPrice: '',
                StockUpper: '',
                StockLower: '',
                CurrentStock: '',
                Remarks: '',
                UserName: ''
            },
            pen: {
                AID: '',
                SparePartName: '',
                SparePartNo: '',
                SparePartType: '',
                SparePartModel: '',
                Manufactor: '',
                WarehouseLocation: '',
                ServiceLife: '',
                Unit: '',
                UnitPrice: '',
                StockUpper: '',
                StockLower: '',
                CurrentStock: '',
                Remarks: '',
                UserName: ''
            },
            tipchange: false,
            a1: 1,
            a2: 1,
            gth: require('../../assets/images/gth.png'),
            moveDataelse: {
                x: null,
                y: null
            },
            pdyd1: true,
            pdyd2: true,
            pdyd3: true,
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
            wselectname2: '',
            wselectname3: '',
            time1: '',
            time2: '',
            time3: '',
            PageData: {
                PageSize: 50,
                TotalCount: 0,
                TotalPage: 0,
                PageIndex: 1,
                LastEnabled: false,
                NextEnabled: false
            },
            daorudata: {},
            tableData: [],
            multipleSelection: [],
            excelData: [],
            selectname: [],
            selectname1: [],
            cancel1: false,
            Meter: '',
            Meterid: '',
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
            longinnum: '',
            deldata: {},
            delarray: 0,
            yesdel: '',
            oldName: '',
               jurisdiction:[],
            buttonarr:[],
            cxid:'',
            tjid:'',
            scid:'',
            drid:'',
            dcid:'',
            ckid:'',
            bjid:'',
            cxshow:true,
            tjshow:true,
            scshow:true,
            drshow:true,
            dcshow:true,
            ckshow:true,
            bjshow:true,
            gsb:1,
            gaz:1,
            a11: 1,
            lang: JSON.parse(localStorage.getItem('languages'))[localStorage.getItem('currentLang')]
        };
    },
    computed: {
        VpowerData() {
            return this.$store.state.btnPowerData;
        }
    },
    created() {
        this.getLangData()
        this.jurisdiction = this.$store.state.btnPowerData;
        this.buttonarr = this.findPathByLeafId(
            this.GetUrlParam('id'),
            this.jurisdiction
        )[0].Children;
        console.log('nut', this.buttonarr);
        this.buttonarr.forEach(item => {
            if (item.RightName == '备件台账-查询按钮') {
                this.dbcxid = item.RightID;
            } else if (item.RightName == '备件台账-添加按钮') {
                this.dbtjid = item.RightID;
            } else if (item.RightName == '备件台账-删除按钮') {
                this.dbtijid = item.RightID;
            } else if (item.RightName == '备件台账-导入按钮') {
                this.dbscid = item.RightID;
            } else if (item.RightName == '备件台账-导出按钮') {
                this.dbgbid = item.RightID;
            } else if (item.RightName == '备件台账-查看按钮') {
                this.dbcxid = item.RightID;
            } else if (item.RightName == '备件台账-编辑按钮') {
                this.dbbjid = item.RightID;
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
            url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.drid}`
        })
            .then(res => {
                this.drshow = res.data.data;
            })
            .catch(err => {
                console.log('err', err);
            });
        this.$axios({
            method: 'post',
            url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.dcid}`
        })
            .then(res => {
                this.dcshow = res.data.data;
            })
            .catch(err => {
                console.log('err', err);
            });

        this.$axios({
            method: 'post',
            url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.ckid}`
        })
            .then(res => {
                this.ckshow = res.data.data;
            })
            .catch(err => {
                console.log('err', err);
            });

        this.$axios({
            method: 'post',
            url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.bjid}`
        })
            .then(res => {
                this.bjshow = res.data.data;
            })
            .catch(err => {
                console.log('err', err);
            });
        this.getEquipmentType();
        this.req(1);
        this.time4 = this.getNowTime();
    },
    watch: {
        VpowerData(val) {
            this.jurisdiction = this.$store.state.btnPowerData;
            this.buttonarr = this.findPathByLeafId(
                this.GetUrlParam('id'),
                this.jurisdiction
            )[0].Children;
            console.log('nut', this.buttonarr);
            this.buttonarr.forEach(item => {
                if (item.RightName == '备件台账-查询按钮') {
                    this.cxid = item.RightID;
                } else if (item.RightName == '备件台账-添加按钮') {
                    this.tjid = item.RightID;
                } else if (item.RightName == '备件台账-删除按钮') {
                    this.scid = item.RightID;
                } else if (item.RightName == '备件台账-导入按钮') {
                    this.drid = item.RightID;
                } else if (item.RightName == '备件台账-导出按钮') {
                    this.dcid = item.RightID;
                } else if (item.RightName == '备件台账-查看按钮') {
                    this.ckid = item.RightID;
                } else if (item.RightName == '备件台账-编辑按钮') {
                    this.bjid = item.RightID;
                }
            });
            var userid = '';
            if (!JSON.parse(sessionStorage.getItem('userInfo1'))) {
                userid = JSON.parse(sessionStorage.getItem('sightseerInfo1'))
                    .SCMSUserID;
            } else {
                userid = JSON.parse(sessionStorage.getItem('userInfo1'))
                    .SCMSUserID;
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
                url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.drid}`
            })
                .then(res => {
                    this.drshow = res.data.data;
                })
                .catch(err => {
                    console.log('err', err);
                });
            this.$axios({
                method: 'post',
                url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.dcid}`
            })
                .then(res => {
                    this.dcshow = res.data.data;
                })
                .catch(err => {
                    console.log('err', err);
                });

            this.$axios({
                method: 'post',
                url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.ckid}`
            })
                .then(res => {
                    this.ckshow = res.data.data;
                })
                .catch(err => {
                    console.log('err', err);
                });

            this.$axios({
                method: 'post',
                url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.bjid}`
            })
                .then(res => {
                    this.bjshow = res.data.data;
                })
                .catch(err => {
                    console.log('err', err);
                });
        },
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
            this.warrantystatus = [this.lang.EquipmentAccount_Inside, this.lang.EquipmentAccount_Outside]
            this.devicestatus = [this.lang.EquipmentAccount_Used, this.lang.EquipmentAccount_Stopped, this.lang.EquipmentAccount_Abandoned]
            this.warry = this.lang.EquipmentAccount_Inside
            this.device = this.lang.EquipmentAccount_Used
            this.Preservation = this.lang.EquipmentAccount_ClickSelect
            this.Preservation1 = this.lang.EquipmentAccount_ClickSelect
            this.Preservation5 = this.lang.EquipmentAccount_ClickSelect
        },
        inputclick2() {
            this.select1 = 2;
            this.data5 = [];
            this.data5.push(this.selectname1[0]);
            this.pdyd2 = true;
            this.Preservation5 = '';
            this.gaz = this.sestion == 2 ? 2 : 1;
            setTimeout(() => {
                $('.Choice').css({
                    zoom: this.a11,
                    left: `calc(50% - ${($('.Choice').width() / 2) *
                        this.a11}px)`,
                    top: `calc(50% - ${($('.Choice').height() / 2) *
                        this.a11}px)`
                });

                this.move('Choice', 'choicehead1');
                this.cancel1 = true;
            });
        },
        inputclick1() {
            this.select1 = 1;
            this.data5 = [];
            this.data5.push(this.selectname[0]);
            this.pdyd2 = true;
            this.Preservation1 = '';
            this.gsb = this.sestion == 2 ? 2 : 1;
            setTimeout(() => {
                $('.Choice').css({
                    zoom: this.a11,
                    left: `calc(50% - ${($('.Choice').width() / 2) *
                        this.a11}px)`,
                    top: `calc(50% - ${($('.Choice').height() / 2) *
                        this.a11}px)`
                });
                this.cancel1 = true;
                this.move('Choice', 'choicehead1');
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
        readExcel(e) {
            //表格导入
            var that = this;
            const files = e.target.files;
            console.log(files.length);
            if (files.length <= 0) {
                //如果没有文件名

                return false;
            } else if (!/\.(xls||xlsx)$/.test(files[0].name.toLowerCase())) {
                this.$Message.error('上传格式不正确，请上传xls或者xlsx格式');

                return false;
            }

            const fileReader = new FileReader();
            console.log(fileReader);
            fileReader.onload = ev => {
                try {
                    const data = ev.target.result;
                    const workbook = XLSX.read(data, {
                        type: 'binary'
                    });
                    const wsname = workbook.SheetNames[0]; //取第一张表
                    const ws = XLSX.utils.sheet_to_json(
                        workbook.Sheets[wsname]
                    ); //生成json表格内容
                    console.log(ws);
                    let a = 0;
                    for (a in ws) {
                        ws[a].No = ws[a][this.lang.RoleManage_NO];
                        ws[a].SparePartName = ws[a][this.lang.SparePartsManage_NameSpareParts];
                        ws[a].SparePartNo = ws[a][this.lang.SparePartsManage_SparePartNo];
                        ws[a].SparePartModel = ws[a][this.lang.SparePartsManage_TypeSpareParts];
                        ws[a].SparePartType = ws[a][this.lang.SparePartsManage_TypeSpareParts];
                        ws[a].SparePartModel = ws[a][this.lang.SparePartsManage_SparePartsModel];
                        ws[a].Manufactor = ws[a][this.lang.SparePartsManage_Manufacturer];
                        ws[a].WarehouseLocation = ws[a][this.lang.SparePartsManage_WarehouseLocation];
                        ws[a].ServiceLife = ws[a][this.lang.SparePartsManage_ServiceLife];
                        ws[a].Unit = ws[a][this.lang.SparePartsManage_Uom];
                        ws[a].UnitPrice = ws[a][this.lang.SparePartsManage_SparePartsUnit];
                        ws[a].StockUpper = ws[a][this.lang.SparePartsManage_InventoryCeiling];
                        ws[a].StockLower = ws[a][this.lang.SparePartsManage_InventoryLowerLimit];
                        ws[a].CurrentStock = ws[a][this.lang.SparePartsManage_CurrentInventory];
                        ws[a].Remarks = ws[a][this.lang.SparePartsManage_Remark];
                    }
                    let b = 0;
                    for (b in ws) {
                        delete ws[b][this.lang.RoleManage_NO];
                        delete ws[b][this.lang.SparePartsManage_NameSpareParts];
                        delete ws[b][this.lang.SparePartsManage_SparePartNo];
                        delete ws[b][this.lang.SparePartsManage_TypeSpareParts];
                        delete ws[b][this.lang.SparePartsManage_SparePartsModel];
                        delete ws[b][this.lang.SparePartsManage_Manufacturer];
                        delete ws[b][this.lang.SparePartsManage_WarehouseLocation];
                        delete ws[b][this.lang.SparePartsManage_ServiceLife];
                        delete ws[b][this.lang.SparePartsManage_Uom];
                        delete ws[b][this.lang.SparePartsManage_SparePartsUnit];
                        delete ws[b][this.lang.SparePartsManage_InventoryCeiling];
                        delete ws[b][this.lang.SparePartsManage_InventoryLowerLimit];
                        delete ws[b][this.lang.SparePartsManage_CurrentInventory];
                        delete ws[b][this.lang.SparePartsManage_Remark];
                    }
                    console.log(ws);
                    this.daorudata.argSparePartAccounts = ws;
                    if (
                        !JSON.parse(sessionStorage.getItem('userInfo1')) ||
                        JSON.parse(sessionStorage.getItem('userInfo1')) == null
                    ) {
                        this.daorudata.argOperator = JSON.parse(
                            sessionStorage.getItem('sightseerInfo1')
                        ).SCMSUserAccount;
                    } else {
                        this.daorudata.argOperator = JSON.parse(
                            sessionStorage.getItem('userInfo1')
                        ).SCMSUserAccount;
                    }
                    console.log(this.daorudata);
                    this.$axios({
                        method: 'post',
                        url: `/api/SparePartsManage/SparePartsManage_Input`,
                        data: this.daorudata
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
                        this.pdyd1 = true;
                        if (res.data.msg == '请求成功') {
                            res.data.msg = this.lang.FormulaManage_HT_ImportSuccess;
                        }
                        this.tipword = res.data.msg;
                        this.req(1);
                    });
                    that.outputs = []; //清空接收数据
                    for (var i = 0; i < ws.length; i++) {
                        var sheetData = {
                            address: ws[i].addr,
                            value: ws[i].value
                        };
                        that.outputs.push(sheetData);
                    }
                    this.$refs.upload.value = '';
                } catch (e) {
                    return false;
                }
            };
            fileReader.readAsBinaryString(files[0]);
        },
        select(selection, row) {
            if (
                !JSON.parse(sessionStorage.getItem('userInfo1')) ||
                JSON.parse(sessionStorage.getItem('userInfo1')) == null
            ) {
                this.deldata.argUserName = JSON.parse(
                    sessionStorage.getItem('sightseerInfo1')
                ).SCMSUserAccount;
            } else {
                this.deldata.argUserName = JSON.parse(
                    sessionStorage.getItem('userInfo1')
                ).SCMSUserAccount;
            }
            let i = 0;
            this.deldata.argSparePartIds = [];
            for (i in selection) {
                this.deldata.argSparePartIds.push(selection[i].AID);
            }
            if (selection.length !== 0) {
                this.delarray = 1;
            } else {
                this.delarray = 0;
            }
        },
        selectall(selection) {
            if (
                !JSON.parse(sessionStorage.getItem('userInfo1')) ||
                JSON.parse(sessionStorage.getItem('userInfo1')) == null
            ) {
                this.deldata.argUserName = JSON.parse(
                    sessionStorage.getItem('sightseerInfo1')
                ).SCMSUserAccount;
            } else {
                this.deldata.argUserName = JSON.parse(
                    sessionStorage.getItem('userInfo1')
                ).SCMSUserAccount;
            }
            let i = 0;
            this.deldata.argSparePartIds = [];
            for (i in selection) {
                this.deldata.argSparePartIds.push(selection[i].AID);
            }
            if (selection.length !== 0) {
                this.delarray = 1;
            } else {
                this.delarray = 0;
            }
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
            console.log(this.deldata);
            this.$axios({
                method: 'post',
                url: `/api/SparePartsManage/SparePartsManage_DeleteSparePart`,
                data: this.deldata
            })

                .then(res => {
                    console.log('asddasdasd', res);
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
                    this.pdyd1 = true;
                    this.deltrue = true;
                    this.getEquipmentType();
                    this.req(1);
                })

                .catch(err => {});
        },
        del() {
            if (!this.scshow) {
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
                this.pdyd1 = true;
                this.tipword = this.lang.NoOperationAuthority;
                return;
            }
            if (this.delarray !== 0) {
                this.tipword = this.lang.EquipmentAccount_SureToDelete
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
                this.pdyd1 = true;
                this.deltrue = false;
                this.delarray = 0;
            } else {
                this.tipword = this.lang.EquipmentAccount_CheckTheDeleteItem
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
                this.pdyd1 = true;
            }
        },
        exportTable() {
            if (!this.dcshow) {
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
                this.pdyd1 = true;
                return;
            }
            if (this.PageData.TotalCount >= 150000) {
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
                this.tipword = this.lang.SCMSConsoleWebApiMySql_ExportedDataNotSupportMoreThan150000
                return;
            }
            let rang = this.Meter;
            if (this.Meterid == '11111111-1111-1111-1111-111111111111') {
                rang = '';
            }
            this.$axios({
                method: 'post',
                url: `/api/SparePartsManage/SparePartsManage_GstSpareParts?argPageSize=${this.PageData.TotalCount}&argPageIndex=${this.pageindex}&argKeyword=${this.keyword}&argSparePartType=${rang}`
            })
                .then(res => {
                    console.log(res);
                    let i = 0;
                    for (i in res.data.data.DataList) {
                        if (!res.data.data.DataList[i].DetailType) {
                            res.data.data.DataList[i].DetailType =
                                res.data.data.DataList[i].SparePartType;
                        }
                        if (
                            !res.data.data.DataList[i].DetailWarehouseLocation
                        ) {
                            res.data.data.DataList[i].DetailWarehouseLocation =
                                res.data.data.DataList[i].WarehouseLocation;
                        }
                        res.data.data.DataList[i].number = ++i;
                    }
                    this.muchdata = res.data.data.DataList;
                    this.muchdata = !this.muchdata
                        ? [
                              {
                                  number: '',
                                  SparePartName: '',
                                  SparePartNo: '',
                                  DetailType: '',
                                  SparePartModel: '',
                                  Manufactor: '',
                                  DetailWarehouseLocation: '',
                                  ServiceLife: '',
                                  Unit: '',
                                  UnitPrice: '',
                                  StockUpper: '',
                                  StockLower: '',
                                  CurrentStock: '',
                                  Remarks: ''
                              }
                          ]
                        : this.muchdata;
                    console.log(this.muchdata[0]);
                })
                .then(() => {
                    require.ensure([], () => {
                        const {
                            export_json_to_excel
                        } = require('../../vendor/Export2Excel');
                        const tHeader = [
                            this.lang.RoleManage_NO,
                            this.lang.SparePartsManage_NameSpareParts,
                            this.lang.SparePartsManage_SparePartNo,
                            this.lang.SparePartsManage_TypeSpareParts,
                            this.lang.SparePartsManage_SparePartsModel,
                            this.lang.SparePartsManage_Manufacturer,
                            this.lang.SparePartsManage_WarehouseLocation,
                            this.lang.SparePartsManage_ServiceLife,
                            this.lang.SparePartsManage_Uom,
                            this.lang.SparePartsManage_SparePartsUnit,
                            this.lang.SparePartsManage_InventoryCeiling,
                            this.lang.SparePartsManage_InventoryLowerLimit,
                            this.lang.SparePartsManage_CurrentInventory,
                            this.lang.SparePartsManage_Remark
                        ];
                        const filterVal = [
                            'number',
                            'SparePartName',
                            'SparePartNo',
                            'DetailType',
                            'SparePartModel',
                            'Manufactor',
                            'DetailWarehouseLocation',
                            'ServiceLife',
                            'Unit',
                            'UnitPrice',
                            'StockUpper',
                            'StockLower',
                            'CurrentStock',
                            'Remarks'
                        ];
                        if (
                            140000 < this.muchdata.length &&
                            this.muchdata.length <= 150000
                        ) {
                            this.excelDatas = [
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.muchdata.splice(0, 20000),
                                    sheetName: 'sheet1'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.muchdata.splice(0, 10000),
                                    sheetName: 'sheet2'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.muchdata.splice(0, 10000),
                                    sheetName: 'sheet3'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.muchdata.splice(0, 10000),
                                    sheetName: 'sheet4'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.muchdata.splice(0, 10000),
                                    sheetName: 'sheet5'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.muchdata.splice(0, 10000),
                                    sheetName: 'sheet6'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.muchdata.splice(0, 10000),
                                    sheetName: 'sheet7'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.muchdata.splice(0, 10000),
                                    sheetName: 'sheet8'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.muchdata.splice(0, 10000),
                                    sheetName: 'sheet9'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.muchdata.splice(0, 10000),
                                    sheetName: 'sheet10'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.muchdata.splice(0, 10000),
                                    sheetName: 'sheet11'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.muchdata.splice(0, 10000),
                                    sheetName: 'sheet12'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.muchdata.splice(0, 10000),
                                    sheetName: 'sheet13'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.muchdata.splice(0, 10000),
                                    sheetName: 'sheet14'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.muchdata.splice(0, 10000),
                                    sheetName: 'sheet15'
                                }
                            ];
                        } else if (
                            130000 < this.muchdata.length &&
                            this.muchdata.length <= 140000
                        ) {
                            this.excelDatas = [
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.muchdata.splice(0, 20000),
                                    sheetName: 'sheet1'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.muchdata.splice(0, 10000),
                                    sheetName: 'sheet2'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.muchdata.splice(0, 10000),
                                    sheetName: 'sheet3'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.muchdata.splice(0, 10000),
                                    sheetName: 'sheet4'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.muchdata.splice(0, 10000),
                                    sheetName: 'sheet5'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.muchdata.splice(0, 10000),
                                    sheetName: 'sheet6'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.muchdata.splice(0, 10000),
                                    sheetName: 'sheet7'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.muchdata.splice(0, 10000),
                                    sheetName: 'sheet8'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.muchdata.splice(0, 10000),
                                    sheetName: 'sheet9'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.muchdata.splice(0, 10000),
                                    sheetName: 'sheet10'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.muchdata.splice(0, 10000),
                                    sheetName: 'sheet11'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.muchdata.splice(0, 10000),
                                    sheetName: 'sheet12'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.muchdata.splice(0, 10000),
                                    sheetName: 'sheet13'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.muchdata.splice(0, 10000),
                                    sheetName: 'sheet14'
                                }
                            ];
                        } else if (
                            120000 < this.muchdata.length &&
                            this.muchdata.length <= 130000
                        ) {
                            this.excelDatas = [
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.muchdata.splice(0, 20000),
                                    sheetName: 'sheet1'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.muchdata.splice(0, 10000),
                                    sheetName: 'sheet2'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.muchdata.splice(0, 10000),
                                    sheetName: 'sheet3'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.muchdata.splice(0, 10000),
                                    sheetName: 'sheet4'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.muchdata.splice(0, 10000),
                                    sheetName: 'sheet5'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.muchdata.splice(0, 10000),
                                    sheetName: 'sheet6'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.muchdata.splice(0, 10000),
                                    sheetName: 'sheet7'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.muchdata.splice(0, 10000),
                                    sheetName: 'sheet8'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.muchdata.splice(0, 10000),
                                    sheetName: 'sheet9'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.muchdata.splice(0, 10000),
                                    sheetName: 'sheet10'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.muchdata.splice(0, 10000),
                                    sheetName: 'sheet11'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.muchdata.splice(0, 10000),
                                    sheetName: 'sheet12'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.muchdata.splice(0, 10000),
                                    sheetName: 'sheet13'
                                }
                            ];
                        } else if (
                            110000 < this.muchdata.length &&
                            this.muchdata.length <= 120000
                        ) {
                            this.excelDatas = [
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.muchdata.splice(0, 20000),
                                    sheetName: 'sheet1'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.muchdata.splice(0, 10000),
                                    sheetName: 'sheet2'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.muchdata.splice(0, 10000),
                                    sheetName: 'sheet3'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.muchdata.splice(0, 10000),
                                    sheetName: 'sheet4'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.muchdata.splice(0, 10000),
                                    sheetName: 'sheet5'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.muchdata.splice(0, 10000),
                                    sheetName: 'sheet6'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.muchdata.splice(0, 10000),
                                    sheetName: 'sheet7'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.muchdata.splice(0, 10000),
                                    sheetName: 'sheet8'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.muchdata.splice(0, 10000),
                                    sheetName: 'sheet9'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.muchdata.splice(0, 10000),
                                    sheetName: 'sheet10'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.muchdata.splice(0, 10000),
                                    sheetName: 'sheet11'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.muchdata.splice(0, 10000),
                                    sheetName: 'sheet12'
                                }
                            ];
                        } else if (
                            100000 < this.muchdata.length &&
                            this.muchdata.length <= 110000
                        ) {
                            this.excelDatas = [
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.muchdata.splice(0, 20000),
                                    sheetName: 'sheet1'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.muchdata.splice(0, 10000),
                                    sheetName: 'sheet2'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.muchdata.splice(0, 10000),
                                    sheetName: 'sheet3'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.muchdata.splice(0, 10000),
                                    sheetName: 'sheet4'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.muchdata.splice(0, 10000),
                                    sheetName: 'sheet5'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.muchdata.splice(0, 10000),
                                    sheetName: 'sheet6'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.muchdata.splice(0, 10000),
                                    sheetName: 'sheet7'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.muchdata.splice(0, 10000),
                                    sheetName: 'sheet8'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.muchdata.splice(0, 10000),
                                    sheetName: 'sheet9'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.muchdata.splice(0, 10000),
                                    sheetName: 'sheet10'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.muchdata.splice(0, 10000),
                                    sheetName: 'sheet11'
                                }
                            ];
                        } else if (
                            90000 < this.muchdata.length &&
                            this.muchdata.length <= 100000
                        ) {
                            this.excelDatas = [
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.muchdata.splice(0, 20000),
                                    sheetName: 'sheet1'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.muchdata.splice(0, 10000),
                                    sheetName: 'sheet2'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.muchdata.splice(0, 10000),
                                    sheetName: 'sheet3'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.muchdata.splice(0, 10000),
                                    sheetName: 'sheet4'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.muchdata.splice(0, 10000),
                                    sheetName: 'sheet5'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.muchdata.splice(0, 10000),
                                    sheetName: 'sheet6'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.muchdata.splice(0, 10000),
                                    sheetName: 'sheet7'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.muchdata.splice(0, 10000),
                                    sheetName: 'sheet8'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.muchdata.splice(0, 10000),
                                    sheetName: 'sheet9'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.muchdata.splice(0, 10000),
                                    sheetName: 'sheet10'
                                }
                            ];
                        } else if (
                            80000 < this.muchdata.length &&
                            this.muchdata.length <= 90000
                        ) {
                            this.excelDatas = [
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.muchdata.splice(0, 20000),
                                    sheetName: 'sheet1'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.muchdata.splice(0, 10000),
                                    sheetName: 'sheet2'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.muchdata.splice(0, 10000),
                                    sheetName: 'sheet3'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.muchdata.splice(0, 10000),
                                    sheetName: 'sheet4'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.muchdata.splice(0, 10000),
                                    sheetName: 'sheet5'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.muchdata.splice(0, 10000),
                                    sheetName: 'sheet6'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.muchdata.splice(0, 10000),
                                    sheetName: 'sheet7'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.muchdata.splice(0, 10000),
                                    sheetName: 'sheet8'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.muchdata.splice(0, 10000),
                                    sheetName: 'sheet9'
                                }
                            ];
                        } else if (
                            70000 < this.muchdata.length &&
                            this.muchdata.length <= 80000
                        ) {
                            this.excelDatas = [
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.muchdata.splice(0, 20000),
                                    sheetName: 'sheet1'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.muchdata.splice(0, 10000),
                                    sheetName: 'sheet2'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.muchdata.splice(0, 10000),
                                    sheetName: 'sheet3'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.muchdata.splice(0, 10000),
                                    sheetName: 'sheet4'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.muchdata.splice(0, 10000),
                                    sheetName: 'sheet5'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.muchdata.splice(0, 10000),
                                    sheetName: 'sheet6'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.muchdata.splice(0, 10000),
                                    sheetName: 'sheet7'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.muchdata.splice(0, 10000),
                                    sheetName: 'sheet8'
                                }
                            ];
                        } else if (
                            60000 < this.muchdata.length &&
                            this.muchdata.length <= 70000
                        ) {
                            this.excelDatas = [
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.muchdata.splice(0, 20000),
                                    sheetName: 'sheet1'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.muchdata.splice(0, 10000),
                                    sheetName: 'sheet2'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.muchdata.splice(0, 10000),
                                    sheetName: 'sheet3'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.muchdata.splice(0, 10000),
                                    sheetName: 'sheet4'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.muchdata.splice(0, 10000),
                                    sheetName: 'sheet5'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.muchdata.splice(0, 10000),
                                    sheetName: 'sheet6'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.muchdata.splice(0, 10000),
                                    sheetName: 'sheet7'
                                }
                            ];
                        } else if (
                            50000 < this.muchdata.length &&
                            this.muchdata.length <= 60000
                        ) {
                            this.excelDatas = [
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.muchdata.splice(0, 20000),
                                    sheetName: 'sheet1'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.muchdata.splice(0, 10000),
                                    sheetName: 'sheet2'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.muchdata.splice(0, 10000),
                                    sheetName: 'sheet3'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.muchdata.splice(0, 10000),
                                    sheetName: 'sheet4'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.muchdata.splice(0, 10000),
                                    sheetName: 'sheet5'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.muchdata.splice(0, 10000),
                                    sheetName: 'sheet6'
                                }
                            ];
                        } else if (
                            40000 < this.muchdata.length &&
                            this.muchdata.length <= 50000
                        ) {
                            this.excelDatas = [
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.muchdata.splice(0, 20000),
                                    sheetName: 'sheet1'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.muchdata.splice(0, 10000),
                                    sheetName: 'sheet2'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.muchdata.splice(0, 10000),
                                    sheetName: 'sheet3'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.muchdata.splice(0, 10000),
                                    sheetName: 'sheet4'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.muchdata.splice(0, 10000),
                                    sheetName: 'sheet5'
                                }
                            ];
                        } else if (
                            30000 < this.muchdata.length &&
                            this.muchdata.length <= 40000
                        ) {
                            this.excelDatas = [
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.muchdata.splice(0, 20000),
                                    sheetName: 'sheet1'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.muchdata.splice(0, 10000),
                                    sheetName: 'sheet2'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.muchdata.splice(0, 10000),
                                    sheetName: 'sheet3'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.muchdata.splice(0, 10000),
                                    sheetName: 'sheet4'
                                }
                            ];
                        } else if (
                            20000 < this.muchdata.length &&
                            this.muchdata.length <= 30000
                        ) {
                            this.excelDatas = [
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.muchdata.splice(0, 20000),
                                    sheetName: 'sheet1'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.muchdata.splice(0, 10000),
                                    sheetName: 'sheet2'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.muchdata.splice(0, 10000),
                                    sheetName: 'sheet3'
                                }
                            ];
                        } else if (
                            10000 < this.muchdata.length &&
                            this.muchdata.length <= 20000
                        ) {
                            this.excelDatas = [
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.muchdata.splice(0, 20000),
                                    sheetName: 'sheet1'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.muchdata.splice(0, 10000),
                                    sheetName: 'sheet2'
                                }
                            ];
                        } else if (
                            0 < this.muchdata.length &&
                            this.muchdata.length <= 10000
                        ) {
                            this.excelDatas = [
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.muchdata.splice(0, 20000),
                                    sheetName: 'sheet1'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.muchdata.splice(0, 1000),
                                    sheetName: 'sheet2'
                                }
                            ];
                        }

                        this.json2excel(
                            this.excelDatas,
                            this.lang.SparePartsManage_SparePartsAccount,
                            true,
                            'xlsx'
                        );
                        // const list = this.muchdata;
                        // const data = this.formatJson(filterVal, list);
                        // export_json_to_excel(tHeader, data, '备件台账');
                    });
                })
                .catch(function(error) {
                    console.log(error);
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
        preservation6() {
            this.anythingdata();
            let i = 0;
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
            if (
                !JSON.parse(sessionStorage.getItem('userInfo1')) ||
                JSON.parse(sessionStorage.getItem('userInfo1')) == null
            ) {
                this.searchData.OperatorName = JSON.parse(
                    sessionStorage.getItem('sightseerInfo1')
                ).SCMSUserAccount;
                this.pen.UserName = JSON.parse(
                    sessionStorage.getItem('sightseerInfo1')
                ).SCMSUserAccount;
            } else {
                this.searchData.OperatorName = JSON.parse(
                    sessionStorage.getItem('userInfo1')
                ).SCMSUserAccount;
                this.pen.UserName = this.searchData.OperatorName = JSON.parse(
                    sessionStorage.getItem('userInfo1')
                ).SCMSUserAccount;
            }

            this.pen.SparePartType = this.pen.DetailType;
            this.pen.WarehouseLocation = this.pen.DetailWarehouseLocation;
            console.log(this.pen);
            this.$axios({
                method: 'post',
                url: `/api/SparePartsManage/SparePartsManage_UpdateSparePart?&argPageSize=50&argPageIndex=1`,
                data: this.pen
            })
                .then(res => {
                    if (res.data.msg !== '请求成功') {
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
                        this.pdyd1 = true;
                        this.tipword = res.data.msg;
                    } else {
                        this.tipword = this.lang.FormulaManage_HT_FormulaSetting_ModifiedSuccessfully
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
                        this.pdyd1 = true;
                        this.change = false;
                        this.getEquipmentType();
                    }
                })
                .catch(err => {});
        },
        preservation() {
            let i = 0;
            if (
                !JSON.parse(sessionStorage.getItem('userInfo1')) ||
                JSON.parse(sessionStorage.getItem('userInfo1')) == null
            ) {
                this.searchData.OperatorName = JSON.parse(
                    sessionStorage.getItem('sightseerInfo1')
                ).SCMSUserAccount;
                this.tip.UserName = JSON.parse(
                    sessionStorage.getItem('sightseerInfo1')
                ).SCMSUserAccount;
            } else {
                this.searchData.OperatorName = JSON.parse(
                    sessionStorage.getItem('userInfo1')
                ).SCMSUserAccount;
                this.tip.UserName = this.searchData.OperatorName = JSON.parse(
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
            if (this.Preservation == this.lang.EquipmentAccount_ClickSelect) {
                this.tip.SparePartType = '';
            } else {
                this.tip.SparePartType = this.Preservation;
            }

            if (this.Preservation5 == this.lang.EquipmentAccount_ClickSelect) {
                this.tip.WarehouseLocation = '';
            } else {
                this.tip.WarehouseLocation = this.Preservation5;
            }
            this.tip.ServiceLife = this.time1;
            if (this.wselectname2 !== this.lang.EquipmentAccount_ClickSelect) {
                this.tip.DetailType = this.wselectname2;
                this.tip.SparePartType = this.wselectname2.split('>')[
                    this.wselectname2.split('>').length - 1
                ];
            } else {
                this.tip.DetailType = '';
                this.tip.SparePartType = '';
            }
            if (this.wselectname3 !== this.lang.EquipmentAccount_ClickSelect) {
                this.tip.DetailWarehouseLocation = this.wselectname3;
                this.tip.WarehouseLocation = this.wselectname3.split('>')[
                    this.wselectname3.split('>').length - 1
                ];
            } else {
                this.tip.DetailWarehouseLocation = '';
                this.tip.WarehouseLocation = '';
            }
            console.log('wselectname3', this.wselectname3, this.wselectname2);
            console.log('eee', this.tip);

            this.$axios({
                method: 'post',
                url: `/api/SparePartsManage/SparePartsManage_AddSparePart?&argPageSize=50&argPageIndex=1`,
                data: this.tip
            })
                .then(res => {
                    if (res.data.msg !== '请求成功') {
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
                        this.pdyd1 = true;
                        this.tipword = res.data.msg;
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
                        this.pdyd1 = true;
                        this.tipword = this.lang.EquipmentAccount_SuccessfullyAdded
                        this.getEquipmentType();
                        this.req(1);
                        this.change = false;
                    }
                })
                .catch(err => {});
        },
        tip1() {
            this.tipchange = false;
        },
        selectname2(data) {
            if (data.NodeDepth > 2) {
                for (let i = 0; i < this.selectname.length; i++) {
                    if (data.FatherID == this.selectname[i].NID) {
                        this.dataArr.unshift(this.selectname[i].NodeName);
                        if (this.selectname[i].NodeDepth >= 2) {
                            this.selectname2(this.selectname[i]);
                        }
                    }
                }
                console.log('dataArr', this.dataArr);
            }
        },
        selectname3(data) {
            if (data.NodeDepth > 2) {
                for (let i = 0; i < this.selectname1.length; i++) {
                    if (data.FatherID == this.selectname1[i].NID) {
                        this.dataArr2.unshift(this.selectname1[i].NodeName);
                        if (this.selectname1[i].NodeDepth >= 2) {
                            this.selectname3(this.selectname1[i]);
                        }
                    }
                }
            }
        },

        handleNodeClick(data) {
            if (this.select1 == 1) {
                this.dataArr = [];
                this.dataArr.unshift(data.NodeName);
                if (data.NodeType == 1) {
                    if (data.NodeType != 2) {
                        if (data.NodeDepth > 2) {
                            this.selectname2(data);
                        }
                    }
                }
                // this.Preservation1 = data.label;
                if (this.dataArr) {
                    this.Preservation1 = this.dataArr.join('>');
                } else {
                    this.Preservation1 = data.label;
                }
            } else if (this.select1 == 2) {
                this.dataArr2 = [];
                this.dataArr2.unshift(data.NodeName);
                if (data.NodeType == 2) {
                    if (data.NodeDepth > 2) {
                        this.selectname3(data);
                    }
                }
                if (this.dataArr2.length !== 0) {
                    this.Preservation5 = this.dataArr2.join('>');
                } else {
                    this.Preservation5 = data.label;
                }
                // this.Preservation5 = data.label;
            }
        },
        handleNodeClick1(data) {
            if (this.select1 == 1) {
                this.gsb = 2;
                this.dataArr = [];
                if (data.NodeType == 1) {
                    if (data.NodeType != 2) {
                        if (data.NodeDepth > 2) {
                            this.dataArr.unshift(data.NodeName);
                            this.selectname2(data);
                        }
                    }
                }
                if (this.dataArr.length !== 0) {
                    this.pen.SparePartType = this.dataArr.join('>');
                    this.Preservation1 = this.dataArr.join('>');
                } else {
                    this.pen.SparePartType = data.label;
                    this.Preservation1 = data.label;
                }
            } else if (this.select1 == 2) {
                this.gaz = 2;
                this.dataArr2 = [];
                if (data.NodeType == 2) {
                    if (data.NodeDepth > 2) {
                        this.dataArr2.unshift(data.NodeName);
                        this.selectname3(data);
                    }
                }

                if (this.dataArr2.length !== 0) {
                    this.pen.WarehouseLocation = this.dataArr2.join('>');
                    this.Preservation5 = this.dataArr2.join('>');
                } else {
                    this.pen.WarehouseLocation = data.label;
                    this.Preservation5 = data.label;
                }
            }
        },
        importfxx(obj) {
            console.log(obj);
        },
        cancel() {
            this.change = false;
            let ss = JSON.stringify(this.antable);
            this.tableData = JSON.parse(ss);
        },
        Preservation2() {
            if (this.sestion == 3) {
                if (this.select1 == 1) {
                    if (!this.Preservation1) {
                        this.tipword = this.lang.SparePartsManage_SparePartsType_Select
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
                    } else {
                        this.wselectname2 = this.Preservation1;
                        this.cancel1 = false;
                    }
                } else if (this.select1 == 2) {
                    if (!this.Preservation5) {
                        this.tipword = this.lang.SparePartsManage_WarehouseLocation_Select
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
                    } else {
                        this.wselectname3 = this.Preservation5;
                        this.cancel1 = false;
                    }
                }
            }
        },
        Preservation3() {
            if (this.gsb == 2) {
                if (!this.Preservation1) {
                    this.tipword = this.lang.SparePartsManage_SparePartsType_Select
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
                } else {
                    this.pen.DetailDeviceType = this.Preservation1;
                    this.pen.DetailType = this.Preservation1;
                    this.cancel1 = false;
                }
            }
            if (this.gaz == 2) {
                if (!this.Preservation5) {
                    this.tipword = this.lang.SparePartsManage_WarehouseLocation_Select
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
                } else {
                    this.pen.DetailWarehouseLocation = this.Preservation5;
                    this.pen.DetailInstallationLocation = this.Preservation5;
                    this.pen.InstallationLocation = this.Preservation5;
                    this.cancel1 = false;
                }
            }

            this.gaz = 1;
            this.gsb = 1;
        },
        handleEdit(a, b) {
            if (!this.ckshow) {
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
                return;
            }
            this.sestion = 1;
            this.disabled = true;
            this.sesstion = b;
            setTimeout(() => {
                $('.sestion').css({
                    zoom: this.a11,
                    left: `calc(50% - ${($('.sestion').width() / 2) *
                        this.a11}px)`,
                    top: `calc(50% - ${($('.sestion').height() / 2) *
                        this.a11}px)`
                });
                this.change = true;
                        setTimeout(()=>{
                       let w =  $('.linetop1').width() + 20 +'px'
                let w1 =  $('.linetop3').width() + 20 +'px'
                $('.linetop2').css({
                    width:`calc(100% - ${w})`
                })
                $('.linetop4').css({
                    width:`calc(100% - ${w1})`
                })
                })
                this.move('sestion', 'sestionheader1');
            });
            this.pdyd2 = true;
        },
        handleEdit1(a, b) {
            if (!this.bjshow) {
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
                this.tipword =this.lang.NoOperationAuthority;
                return;
            }
            this.add();
            this.a = a;
            this.sestion = 2;
            this.disabled = false;
            this.pen = b;
            this.oldName = b.DeviceName;
            setTimeout(() => {
                $('.sestion').css({
                    zoom: this.a11,
                    left: `calc(50% - ${($('.sestion').width() / 2) *
                        this.a11}px)`,
                    top: `calc(50% - ${($('.sestion').height() / 2) *
                        this.a11}px)`
                });
                this.change = true;
                            setTimeout(()=>{
                       let w =  $('.linetop1').width() + 20 +'px'
                let w1 =  $('.linetop3').width() + 20 +'px'
                $('.linetop2').css({
                    width:`calc(100% - ${w})`
                })
                $('.linetop4').css({
                    width:`calc(100% - ${w1})`
                })
                })
                this.move('sestion', 'sestionheader1');
            });
            this.pdyd2 = true;
            console.log(this.pen);
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
                this.pdyd1 = true;
                this.tipword =  this.lang.NoOperationAuthority;
                return;
            }
            this.wselectname2 = this.lang.EquipmentAccount_ClickSelect;
            this.wselectname3 = this.lang.EquipmentAccount_ClickSelect;
            this.sesstion = '';
            this.time1 = this.getNowTime();
            (this.tip = {
                SparePartName: '',
                SparePartNo: '',
                SparePartType: '',
                SparePartModel: '',
                Manufactor: '',
                WarehouseLocation: '',
                ServiceLife: '',
                Unit: '',
                UnitPrice: '',
                StockUpper: '',
                StockLower: '',
                CurrentStock: '',
                Remarks: '',
                UserName: '',
                a11: 1
            }),
                (this.sestion = 3);
            this.disabled = false;
            setTimeout(() => {
                $('.sestion').css({
                    zoom: this.a11,
                    left: `calc(50% - ${($('.sestion').width() / 2) *
                        this.a11}px)`,
                    top: `calc(50% - ${($('.sestion').height() / 2) *
                        this.a11}px)`
                });
                this.change = true;
                            setTimeout(()=>{
                       let w =  $('.linetop1').width() + 20 +'px'
                let w1 =  $('.linetop3').width() + 20 +'px'
                $('.linetop2').css({
                    width:`calc(100% - ${w})`
                })
                $('.linetop4').css({
                    width:`calc(100% - ${w1})`
                })
                })
                this.move('sestion', 'sestionheader1');
            });
            this.pdyd2 = true;

            let i = 0;
            let j = 1;
            for (i in this.selectname) {
                if (this.a1 == 1) {
                    if (this.selectname[i].NodeName == this.lang.SparePartsManage_TypeSpareParts) {
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
            for (i in this.selectname1) {
                if (this.a2 == 1) {
                    if (this.selectname1[i].NodeName == this.lang.SparePartsManage_WarehouseLocation) {
                        this.selectname1[i].NID =
                            '22222222-2222-2222-2222-222222222222';
                    }
                    this.a2 = 2;
                }

                this.selectname1[i].id = this.selectname1[i].NID;
                this.selectname1[i].label = this.selectname1[i].NodeName;
                this.selectname1[i].children = [];
                for (j in this.selectname1) {
                    if (
                        this.selectname1[i].NID == this.selectname1[j].FatherID
                    ) {
                        this.selectname1[i].children.push(this.selectname1[j]);
                    }
                    if (this.selectname1[i].children.length !== 0) {
                        this.selectname1[
                            i
                        ].file = require('../../assets/images/icon_file.png');
                    }
                }
            }
            console.log(this.selectname);
            // this.anythingdata();
        },
        selectword1() {
            let i = 0;
            let j = 1;
            for (i in this.selectname) {
                if (this.a1 == 1) {
                    if (this.selectname[i].NodeName == this.lang.SparePartsManage_TypeSpareParts) {
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
            console.log(this.selectname[0]);
            this.data6 = [];
            this.data6.push(this.selectname[0]);
            $(`.selectword`).css({
                left:
                    $('.sblx')[0].offsetLeft + $('.sblx')[0].clientWidth + 'px',
                top:
                    $('.sad')[0].offsetTop +
                    $('.seleword1')[0].clientHeight +
                    'px'
            });
            this.changeselect = !this.changeselect;
        },
        dr(e) {
            if (!this.drshow) {
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
                this.pdyd1 = true;
                this.tipword =this.lang.NoOperationAuthority;
                e.preventDefault();
                return;
            }
        },
        cancel2() {
            if (this.Preservation == this.lang.SparePartsManage_TypeSpareParts) {
                this.Preservation = this.lang.EquipmentAccount_ClickSelect
            } else if (this.Preservation5 == this.lang.SparePartsManage_WarehouseLocation) {
                this.Preservation5 = this.lang.EquipmentAccount_ClickSelect
            } else {
                this.cancel1 = false;
            }
            this.cancel1 = false;
        },
        sad() {
            if (!this.cxshow) {
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
                this.pdyd1 = true;
                this.tipword =this.lang.NoOperationAuthority;
                return;
            }
            this.getEquipmentType();
        },
        setParams(params) {
            this.searchData = params;
        },
        somethingdata() {
            let rang = this.Meter;
            if (this.Meterid == '11111111-1111-1111-1111-111111111111') {
                rang = '';
            }
            console.log(
                `/api/SparePartsManage/SparePartsManage_GstSpareParts?argSparePartType=${rang}&argKeyword=${this.keyword}&argPageSize=${this.pagesize}&argPageIndex=${this.pageindex}`
            );
            this.$axios({
                method: 'post',
                url: `/api/SparePartsManage/SparePartsManage_GstSpareParts?argSparePartType=${rang}&argKeyword=${this.keyword}&argPageSize=${this.pagesize}&argPageIndex=${this.pageindex}`
            })
                .then(res => {
                    console.log('asdas', res);
                    let i = 0;
                    let a = 0;
                    for (i in res.data.data.DataList) {
                        if (!res.data.data.DataList[i].DetailType) {
                            res.data.data.DataList[i].DetailType =
                                res.data.data.DataList[i].SparePartType;
                        }
                        if (
                            !res.data.data.DataList[i].DetailWarehouseLocation
                        ) {
                            res.data.data.DataList[i].DetailWarehouseLocation =
                                res.data.data.DataList[i].WarehouseLocation;
                        }
                        res.data.data.DataList[i].number = ++i;
                    }

                    this.tableData = res.data.data.DataList;
                    let avc = JSON.stringify(this.tableData);
                    this.antable = JSON.parse(avc);
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
                url: `/api/SparePartsManage/SparePartsManage_GstSpareParts?argDeviceType=${rang}&argKeyword=${this.keyword}&argPageSize=${this.PageData.TotalCount}&argPageIndex=${this.pageindex}`
            })
                .then(res => {
                    let i = 0;
                    for (i in res.data.data.DataList) {
                        res.data.data.DataList[i].number = ++i;
                    }
                    this.muchdata = res.data.data.DataList;
                    console.log(this.muchdata);
                })
                .catch(function(error) {
                    console.log(error);
                });
        },
        // 获取所有备件类型和库房位置
        getEquipmentType() {
            this.$axios
                .post(
                    `/api/SparePartsManage/SparePartsManage_GstSparePartsType`
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
                        NodeName: this.lang.SparePartsManage_TypeSpareParts
                    });
                    this.selectname1.unshift({
                        NodeName: this.lang.SparePartsManage_WarehouseLocation
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
                    this.pdyd1 = true;
                    this.tipword = this.lang.RoleManage_HT_PEAPositiveInteger;
                    // this.w1 = true;
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
                                    left: `calc(50% - ${($('.tip').width() /
                                        2) *
                                        this.a11}px)`,
                                    top: `calc(50% - ${($('.tip').height() /
                                        2) *
                                        this.a11}px)`
                                });
                                this.tipchange = true;
                                this.move('tip', 'tiphead');
                            });
                            this.pdyd1 = true;
                            this.tipword =this.lang.DataGrid_Reaction_HT_PEThePageNumber;
                            //  this.w1 = true;
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
                    `/api/SparePartsManage/SparePartsManage_GstSpareParts?argSparePartType&argKeyword`,
                    null,
                    {
                        params
                    }
                )
                .then(res => {
                    if (this.tipword == this.lang.FormulaManage_HT_ImportSuccess) {
                        res.data.data.DataList.forEach(item => {
                            item.SparePartModel = item.SparePartType;
                        });
                    }
                    console.log('sad', res);
                    if (res.data.code == 0) {
                        this.data = res.data.data.DataList;

                        this.PageData = res.data.data.ParameterList;
                    }
                    console.log(this.data);
                    this.pageindex = pageIndex;
                    this.pagesize = this.PageData.PageSize;
                })
                .then(() => {
                    this.somethingdata();
                })
                .catch(err => {});
        }
    },
    mounted() {
        this.a11 = Number(parseFloat(window.screen.width / 1920).toFixed(2));
        if (this.a11 < 1) {
            this.a11 = 0.8;
        }
        let that = this;
               $('body')[0].addEventListener("mousemove",function(){
            setTimeout(()=>{
for(let i=0;i<$('.atooltip').length;i++){
                $('.atooltip')[i].style.zoom = that.a11
            }
            })
     })
        setTimeout(() => {
            let a = this.a11 * 120 + 'px';
            $('.table-container').css({
                height: `calc(100% - ${a})`
            });
        });
        this.jurisdiction = this.$store.state.btnPowerData;
        this.buttonarr = this.findPathByLeafId(
            this.GetUrlParam('id'),
            this.jurisdiction
        )[0].Children;
        console.log('nut', this.buttonarr);
        this.buttonarr.forEach(item => {
            if (item.RightName == '备件台账-查询按钮') {
                this.cxid = item.RightID;
            } else if (item.RightName == '备件台账-添加按钮') {
                this.tjid = item.RightID;
            } else if (item.RightName == '备件台账-删除按钮') {
                this.scid = item.RightID;
            } else if (item.RightName == '备件台账-导入按钮') {
                this.drid = item.RightID;
            } else if (item.RightName == '备件台账-导出按钮') {
                this.dcid = item.RightID;
            } else if (item.RightName == '备件台账-查看按钮') {
                this.ckid = item.RightID;
            } else if (item.RightName == '备件台账-编辑按钮') {
                this.bjid = item.RightID;
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
            url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.drid}`
        })
            .then(res => {
                this.drshow = res.data.data;
            })
            .catch(err => {
                console.log('err', err);
            });
        this.$axios({
            method: 'post',
            url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.dcid}`
        })
            .then(res => {
                this.dcshow = res.data.data;
            })
            .catch(err => {
                console.log('err', err);
            });

        this.$axios({
            method: 'post',
            url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.ckid}`
        })
            .then(res => {
                this.ckshow = res.data.data;
            })
            .catch(err => {
                console.log('err', err);
            });

        this.$axios({
            method: 'post',
            url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.bjid}`
        })
            .then(res => {
                this.bjshow = res.data.data;
            })
            .catch(err => {
                console.log('err', err);
            });
        this.$refs.upload.addEventListener('change', e => {
            //绑定监听表格导入事件
            this.readExcel(e);
        });
    }
};
</script>

<style lang="scss" scoped>
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
        margin-top: 50px;
    }
    .tipdetermine {
        cursor: pointer;
        color: #ea9328;
        width: 310px;
        line-height: 30px;
        text-align: center;
       position: absolute;
       bottom: 10px;
       left: 40px;

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
    // margin-top: 10px;
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
.search-container {
    position: relative;
    justify-content: space-between;
    background-color: #ddd;
    width: 100%;
    font-size: 16px;
    color: #7f6f79;
    // height: 60px !important;
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
        position: relative;
        top: 2px;
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
        position: relative;
        top: 2px;
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
        position: relative;
        top: 2px;
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
    position: relative;
    top: 2px;
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

    overflow: hidden;
}
.export {
    position: relative;
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
}

.fr {
    // width: 260px;
    height: 100%;
    display: flex;
    align-items: center;
    // display: inline-block;
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
        margin: auto;
    }
}
.sestion {
    width: 750px;
    height: 670px;
    z-index: 10999999;
    position: fixed;
    top: 180px;
    left: 590px;
    border: 1px solid #cccccc;
    box-shadow: 0px 0px 8px black;
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
        width: 70px;
        text-align: center;
    }
}

.overflow {
    overflow: hidden;
    width: 100%;
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
        display: inline-block;
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
.overflow1 {
    margin-top: 10px;
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
    // background-color: #f4f4f4;
}
.table-container {
    height: calc(100% - 90px);
    overflow: auto;
}
.Preservation {
    width: 100px;
    cursor: pointer;
    height: 34px;
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
    position: absolute;
    // top: 172px;
    // left: 312px;

    z-index: 11999999;

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
.sblx {
    display: inline-block;
}
.linetop1{
    display: inline-block;
}
.linetop3{
    display: inline-block;
}
</style>
