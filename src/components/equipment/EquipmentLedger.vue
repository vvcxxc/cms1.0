<!--
 * @Description: 设备台账界面
 * @Date: 2019-11-25 19:07:09
 * @Author: 随风
 * @LastEditors: Tao
 * @LastEditTime: 2021-02-25 12:17:29
 -->
<template>
    <div
        class="public-table  sbtz"
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
                >{{lang.EquipmentAccount_EquipmentType1}}</span
            >
            <div
                class="seleword"
                @click.stop="selectword1('seleword')"

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
                :id="cxid"
             
            >
                {{lang.UserManage_Query}}
            </div>
            <div
                class="add"
                @click="add"
                :id="tjid"
             
            >
                {{lang.UserManage_Add}}
            </div>
            <div
                class="move"
                @click="del"
                :id="scid"
             
            >
                 {{lang.RoleManage_Delete}}
            </div>
            <div class="fr" :id="drid">
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
                    :id="dcid"
                   
                >
                   {{lang.QualityManage_SampleChoseUserControl_Export}}
                </div>

            </div>
        </div>
        <div class="table-container table-container1">
            <el-table
                ref="multipleTable"
                :data="tableData"
                border
                highlight-current-row
                header-row-class-name="light-blue"
                :style="{ fontSize: a11 * 15 + 'px', width: '100%' }"
                stripe
                :row-style="{height:50*a11+'px'}"
                height="100%"
                tooltip-effect="dark"
                :header-cell-style="{
                    background:
                        $store.state.color == 'grey' ? '#D9DBDE' : '#5a6c98',
                    color: $store.state.color == 'grey' ? '#000' : '#fff',
                    'border-left': '1px solid #cccccc',
                    height: 50*a11+'px',
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
                    :show-overflow-tooltip="true"
                ></el-table-column>
                <el-table-column
                    :label="lang.AlarmRecord_HT_AlarmPointManageUC_SerialNumber"
                    :width="lang.AlarmRecord_HT_AlarmPointManageUC_SerialNumber=='Serial number'?130*a11:100 * a11"
                    prop="number"
                    :show-overflow-tooltip="true"
                    fixed
                >
                    <template slot-scope="scope">{{
                        scope.row.number
                    }}</template>
                </el-table-column>
                <el-table-column
                    prop="name"
                    :label="lang.RoleManage_Operation"
                     :width="210 * a11"
                 
                    fixed
                >
                    <template slot-scope="scope">
                        <!-- <i class="el-icon-share"></i> -->
                        <div
                            class="img"
                            :style="{zoom:a11}"
                            @click="handleEdit(scope.$index, scope.row)"
                        >
                            <img :src="look" alt />
                            {{ scope.row.phone }}
                        </div>
                        <div
                            class="img"
                             :style="{zoom:a11}"
                            @click="handleEdit1(scope.$index, scope.row, scope)"
                        >
                            <img :src="pensoil" alt  />
                            {{ scope.row.phone }}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="DeviceName"
                    :label="lang.EquipmentAccount_EquipmentName"
                    :width="200 * a11"
                    :show-overflow-tooltip="true"
                ></el-table-column>
                <el-table-column
                    prop="DeviceNo"
                    :label="lang.EquipmentAccount_EquipmentNumber"
                    :width="200 * a11"
                    :show-overflow-tooltip="true"
                ></el-table-column>
                <el-table-column
                    prop="DetailDeviceType"
                    :label="lang.EquipmentAccount_EquipmentType"
                    :width="200 * a11"
                    :show-overflow-tooltip="true"
                ></el-table-column>
                <el-table-column
                    prop="DeviceModel"
                    :label="lang.EquipmentAccount_EquipmentModel"
                    :width="200 * a11"
                    :show-overflow-tooltip="true"
                ></el-table-column>
                <el-table-column
                    prop="AssetsNo"
                    :label="lang.EquipmentAccount_AssetNumber"
                    :width="300 * a11"
                    :show-overflow-tooltip="true"
                ></el-table-column>
                <el-table-column
                    prop="DetailInstallationLocation"
                    :label="lang.EquipmentAccount_InstallPosition"
                    :width="300 * a11"
                    :show-overflow-tooltip="true"
                ></el-table-column>
                <el-table-column
                    prop="Department"
                    :label="lang.EquipmentAccount_Department"
                    :width="300 * a11"
                    :show-overflow-tooltip="true"
                ></el-table-column>
                <el-table-column
                    prop="PersonInCharge"
                    :label="lang.EquipmentAccount_Person"
                    :width="300 * a11"
                    :show-overflow-tooltip="true"
                ></el-table-column>
                <el-table-column
                    prop="Manufactor"
                    :label="lang.EquipmentAccount_Manufacturer"
                    :width="300 * a11"
                    :show-overflow-tooltip="true"
                ></el-table-column>
                <el-table-column
                    prop="DepreciationLife"
                    :label="lang.EquipmentAccount_PeriodOfDepreciation"
                    :width="300 * a11"
                    :show-overflow-tooltip="true"
                ></el-table-column>
                <el-table-column
                    prop="PurchaseTime"
                    :label="lang.EquipmentAccount_PurchaseDate"
                    :width="300 * a11"
                    :show-overflow-tooltip="true"
                ></el-table-column>
                <el-table-column
                    prop="PurchaseAmount"
                    :label="lang.EquipmentAccount_PurchaseAmount"
                    :width="300 * a11"
                    :show-overflow-tooltip="true"
                ></el-table-column>
                <el-table-column
                    prop="Salesman"
                    :label="lang.EquipmentAccount_Salesman"
                    :width="300 * a11"
                    :show-overflow-tooltip="true"
                ></el-table-column>
                <el-table-column
                    prop="Contact"
                    :label="lang.EquipmentAccount_Contact"
                    :width="300 * a11"
                    :show-overflow-tooltip="true"
                ></el-table-column>
                <el-table-column
                    prop="CheckTime"
                    :label="lang.EquipmentAccount_AcceptanceDate"
                    :width="300 * a11"
                    :show-overflow-tooltip="true"
                ></el-table-column>
                <el-table-column
                    prop="EnableTime"
                    :label="lang.EquipmentAccount_StartDate"
                    :width="300 * a11"
                    :show-overflow-tooltip="true"
                ></el-table-column>
                <el-table-column
                    prop="DeviceStatus"
                    :label="lang.EquipmentAccount_EquipmentStatus"
                    :width="300 * a11"
                    :show-overflow-tooltip="true"
                ></el-table-column>
                <el-table-column
                    prop="QualityStatus"
                    :label="lang.EquipmentAccount_WarrantyStatus"
                    :width="300 * a11"
                    :show-overflow-tooltip="true"
                ></el-table-column>
                <el-table-column
                    prop="Remarks"
                    :label="lang.EquipmentAccount_EquipmentRemark"
                    :width="300 * a11"
                    :show-overflow-tooltip="true"
                ></el-table-column>
            </el-table>
        </div>
        <div class="pages-container">
            <my-page :pageData="PageData" @req="req"></my-page>
        </div>
        <div
            class="sestion sbtz"
            v-show="change"
            ref="kongtiao1"
            :style="{ zoom: a11 }"
        >
            <div class="sestionheader"  :class="{ colordiv: $store.state.color == 'grey' }">
                <div
                    class="sestionheader1"
                   
                >
                  </div>
                    <span
                        class="head"
                        v-if="sestion == 1"
                        :class="{ fcolor: $store.state.color == 'grey' }"
                        >{{lang.EquipmentAccount_ViewEquipmentInfo}}</span
                    >
                    <span
                        class="head"
                        v-if="sestion == 2"
                        :class="{ fcolor: $store.state.color == 'grey' }"
                        >{{lang.EquipmentAccount_EditEquipmentInfo}}</span
                    >
                    <span
                        class="head"
                        v-if="sestion == 3"
                        :class="{ fcolor: $store.state.color == 'grey' }"
                        >{{lang.EquipmentAccount_AddEquipmentInfo}}</span
                    >
              
                <img
                    :src="no2"
                    alt
                    class="no"
                    @click="change = false"
                    v-if="$store.state.color == 'grey'"
                />
                <img :src="no" alt class="no" @click="change = false" v-else />
            </div>

            <div class="sestioncontain">
                <div class="homesetion">
                    <div class="hometop">
                        <div class="linetop1 hometop-title">
                               {{lang.EquipmentAccount_BasicInformation}}
                        </div>
                        
                        <div class="line linetop4"></div>
                    </div>
                </div>
                <div class="overflow xgtooltip">
                    <div class="zl">
                        <div class="margin" >
                            <span>{{lang.EquipmentAccount_EquipmentName}}</span>
                            <input
                                type="text"
                                v-if="sestion == 1"
                                :value="sesstion.DeviceName"
                                :disabled="disabled"
                            />
                            <input
                                type="text"
                                v-if="sestion == 3"
                                v-model="tip.DeviceName"
                            />
                            <input
                                type="text"
                                v-if="sestion == 2"
                                v-model="pen.DeviceName"
                            />
                        </div>
                        <div class="margin ">
                            <span class="mi">{{lang.EquipmentAccount_EquipmentType}}</span>
                            <div v-if="sestion == 1" class="input1">
                                <el-tooltip
                                 popper-class="atooltip"
                                    class="item"
                                    effect="dark"
                                    :content="sesstion.DetailDeviceType"
                                    placement="top-start"
                                >
                                    <span @mouseenter="atooltip">{{ sesstion.DetailDeviceType }}</span>
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
                                     popper-class="atooltip"
                                    class="item"
                                    effect="dark"
                                    :content="pen.DetailDeviceType"
                                    placement="top-start"
                                >
                                    <span @mouseenter="atooltip">{{ pen.DetailDeviceType }}</span>
                                </el-tooltip>
                                <el-tooltip
                                    v-if="sestion == 3"
                                     popper-class="atooltip"
                                    class="item"
                                    effect="dark"
                                    :content="wselectname2"
                                    placement="top-start"
                                >
                                    <span @mouseenter="atooltip">{{ wselectname2 }}</span>
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
                            <span>{{lang.EquipmentAccount_AssetNumber}}</span>
                            <input
                                type="text"
                                v-if="sestion == 1"
                                :value="sesstion.AssetsNo"
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
                        </div>
                        <div class="margin">
                            <span>{{lang.EquipmentAccount_Department}}</span>
                            <input
                                type="text"
                                v-if="sestion == 1"
                                :value="sesstion.Department"
                                :disabled="disabled"
                                :placeholder="lang.EquipmentAccount_Optional"
                            />
                            <input
                                type="text"
                                v-if="sestion == 2"
                                v-model="pen.Department"
                                :disabled="disabled"
                                :placeholder="lang.EquipmentAccount_Optional"
                            />
                            <input
                                type="text"
                                v-if="sestion == 3"
                                v-model="tip.Department"
                                :disabled="disabled"
                                :placeholder="lang.EquipmentAccount_Optional"
                            />
                        </div>
                    </div>
                    <div class="zr">
                        <div class="margin" >
                            <span>{{lang.EquipmentAccount_EquipmentNumber}}</span>
                            <input
                                type="text"
                                v-if="sestion == 1"
                                :value="sesstion.DeviceNo"
                                :disabled="disabled"
                            />
                            <input
                                type="text"
                                v-if="sestion == 2"
                                v-model="pen.DeviceNo"
                                :disabled="disabled"
                            />
                            <input
                                type="text"
                                v-if="sestion == 3"
                                v-model="tip.DeviceNo"
                                :disabled="disabled"
                            />
                        </div>
                        <div class="margin">
                            <span>{{lang.EquipmentAccount_EquipmentModel}}</span>
                            <input
                                type="text"
                                v-if="sestion == 1"
                                :value="sesstion.DeviceModel"
                                :disabled="disabled"
                                :placeholder="lang.EquipmentAccount_Optional"
                            />
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
                        <div class="margin">
                            <span>{{lang.EquipmentAccount_InstallPosition}}</span>

                            <div class="input1" v-if="sestion == 1">
                                <el-tooltip
                                    class="item"
                                     popper-class="atooltip"
                                    effect="dark"
                                    :content="
                                        sesstion.DetailInstallationLocation
                                    "
                                    placement="top-start"
                                >
                                    <span @mouseenter="atooltip">{{
                                        sesstion.DetailInstallationLocation
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
                                    class="item"
                                    effect="dark"
                                     popper-class="atooltip"
                                    :content="pen.DetailInstallationLocation"
                                    placement="top-start"
                                >
                                    <span @mouseenter="atooltip">{{
                                        pen.DetailInstallationLocation
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
                                    <span @mouseenter="atooltip">{{ wselectname3 }}</span>
                                </el-tooltip>
                                <div class="inputimg" @click="inputclick2()">
                                    <img :src="diji" alt />
                                </div>
                            </div>
                        </div>
                        <div class="margin">
                            <span class="indent">{{lang.EquipmentAccount_Person}}</span>
                            <select v-model="person1" :disabled="disabled">
                                <option
                                    v-for="(item, index) in person"
                                    :key="index"
                                    :value="item"
                                    >{{ item }}</option
                                >
                            </select>
                        </div>
                    </div>
                </div>
                <div class="homesetion">
                    <div class="hometop">
                        <div class="linetop2 hometop-title">
                               {{lang.EquipmentAccount_OtherInformation}}
                        </div>
                      
                        <div class="line linetop3"></div>
                    </div>
                </div>
                <div class="overflow">
                    <div class="zl">
                        <div class="margin" >
                            <span>{{lang.EquipmentAccount_Manufacturer}}</span>
                            <input
                                type="text"
                                v-if="sestion == 1"
                                :value="sesstion.Manufactor"
                                :disabled="disabled"
                                :placeholder="lang.EquipmentAccount_Optional"
                            />
                            <input
                                type="text"
                                v-if="sestion == 2"
                                v-model="pen.Manufactor"
                                :disabled="disabled"
                                :placeholder="lang.EquipmentAccount_Optional"
                            />
                            <input
                                type="text"
                                v-if="sestion == 3"
                                v-model="tip.Manufactor"
                                :disabled="disabled"
                                :placeholder="lang.EquipmentAccount_Optional"
                            />
                        </div>
                        <div class="margin">
                            <span>{{lang.EquipmentAccount_PurchaseDate}}</span>
                            <template>
                                <div class="block">
                                    <el-date-picker
                                        v-model="sesstion.PurchaseTime"
                                        type="datetime"
                                        :placeholder="lang.SCMSConsoleWebApiMySql_PleChooseDate"
                                        value-format="yyyy-MM-dd HH:mm:ss"
                                        :disabled="disabled"
                                        v-if="sestion == 1"
                                    ></el-date-picker>
                                    <el-date-picker
                                        v-model="pen.PurchaseTime"
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
                        <div class="margin">
                            <span>{{lang.EquipmentAccount_Salesman}}</span>
                            <input
                                type="text"
                                v-if="sestion == 1"
                                :value="sesstion.Salesman"
                                :disabled="disabled"
                                :placeholder="lang.EquipmentAccount_Optional"
                            />
                            <input
                                type="text"
                                v-if="sestion == 2"
                                v-model="pen.Salesman"
                                :disabled="disabled"
                                :placeholder="lang.EquipmentAccount_Optional"
                            />
                            <input
                                type="text"
                                v-if="sestion == 3"
                                v-model="tip.Salesman"
                                :disabled="disabled"
                                :placeholder="lang.EquipmentAccount_Optional"
                            />
                        </div>
                        <div class="margin">
                            <span>{{lang.EquipmentAccount_AcceptanceDate}}</span>
                            <template>
                                <div class="block">
                                    <el-date-picker
                                        v-model="sesstion.CheckTime"
                                        type="datetime"
                                        :placeholder="lang.SCMSConsoleWebApiMySql_PleChooseDate"
                                        value-format="yyyy-MM-dd HH:mm:ss"
                                        :disabled="disabled"
                                        v-if="sestion == 1"
                                    ></el-date-picker>
                                    <el-date-picker
                                        v-model="pen.CheckTime"
                                        type="datetime"
                                        :placeholder="lang.SCMSConsoleWebApiMySql_PleChooseDate"
                                        value-format="yyyy-MM-dd HH:mm:ss"
                                        :disabled="disabled"
                                        v-if="sestion == 2"
                                    ></el-date-picker>
                                    <el-date-picker
                                        v-model="time2"
                                        type="datetime"
                                        :placeholder="lang.SCMSConsoleWebApiMySql_PleChooseDate"
                                        value-format="yyyy-MM-dd HH:mm:ss"
                                        :disabled="disabled"
                                        v-if="sestion == 3"
                                    ></el-date-picker>
                                </div>
                            </template>
                        </div>
                        <div class="margin">
                            <span>{{lang.EquipmentAccount_EquipmentStatus}}</span>
                            <select :disabled="disabled" v-model="device">
                                <option
                                    v-for="(item, index) in devicestatus"
                                    :key="index"
                                    :value="item"
                                    >{{ item }}</option
                                >
                            </select>
                        </div>
                    </div>
                    <div class="zr">
                        <div class="margin" >
                            <span>{{lang.EquipmentAccount_PeriodOfDepreciation}}</span>
                            <input
                                type="text"
                                v-if="sestion == 1"
                                :value="sesstion.DepreciationLife"
                                :disabled="disabled"
                                :placeholder="lang.EquipmentAccount_Optional"
                            />
                            <input
                                type="text"
                                v-if="sestion == 2"
                                v-model="pen.DepreciationLife"
                                :disabled="disabled"
                                :placeholder="lang.EquipmentAccount_Optional"
                            />
                            <input
                                type="text"
                                v-if="sestion == 3"
                                v-model="tip.DepreciationLife"
                                :disabled="disabled"
                                :placeholder="lang.EquipmentAccount_Optional"
                            />
                        </div>
                        <div class="margin">
                            <span>{{lang.EquipmentAccount_PurchaseAmount}}</span>
                            <input
                                type="text"
                                v-if="sestion == 1"
                                :value="sesstion.PurchaseAmount"
                                :disabled="disabled"
                                :placeholder="lang.EquipmentAccount_Optional"
                            />
                            <input
                                type="text"
                                v-if="sestion == 2"
                                v-model="pen.PurchaseAmount"
                                :disabled="disabled"
                                :placeholder="lang.EquipmentAccount_Optional"
                            />
                            <input
                                type="text"
                                v-if="sestion == 3"
                                v-model="tip.PurchaseAmount"
                                :disabled="disabled"
                                :placeholder="lang.EquipmentAccount_Optional"
                            />
                        </div>
                        <div class="margin">
                            <span>{{lang.EquipmentAccount_Contact}}</span>
                            <input
                                type="text"
                                v-if="sestion == 1"
                                :value="sesstion.Contact"
                                :disabled="disabled"
                                :placeholder="lang.EquipmentAccount_Optional"
                            />
                            <input
                                type="text"
                                v-if="sestion == 2"
                                v-model="pen.Contact"
                                :disabled="disabled"
                                :placeholder="lang.EquipmentAccount_Optional"
                            />
                            <input
                                type="text"
                                v-if="sestion == 3"
                                v-model="tip.Contact"
                                :disabled="disabled"
                                :placeholder="lang.EquipmentAccount_Optional"
                            />
                        </div>
                        <div class="margin">
                            <span>{{lang.EquipmentAccount_StartDate}}</span>
                            <template>
                                <div class="block">
                                    <el-date-picker
                                        v-model="sesstion.EnableTime"
                                        type="datetime"
                                        :placeholder="lang.SCMSConsoleWebApiMySql_PleChooseDate"
                                        value-format="yyyy-MM-dd HH:mm:ss"
                                        :disabled="disabled"
                                        v-if="sestion == 1"
                                    ></el-date-picker>
                                    <el-date-picker
                                        v-model="pen.EnableTime"
                                        type="datetime"
                                        :placeholder="lang.SCMSConsoleWebApiMySql_PleChooseDate"
                                        value-format="yyyy-MM-dd HH:mm:ss"
                                        :disabled="disabled"
                                        v-if="sestion == 2"
                                    ></el-date-picker>
                                    <el-date-picker
                                        v-model="time3"
                                        type="datetime"
                                        :placeholder="lang.SCMSConsoleWebApiMySql_PleChooseDate"
                                        value-format="yyyy-MM-dd HH:mm:ss"
                                        :disabled="disabled"
                                        v-if="sestion == 3"
                                    ></el-date-picker>
                                </div>
                            </template>
                        </div>
                        <div class="margin">
                            <span>{{lang.EquipmentAccount_WarrantyStatus}}</span>
                            <select v-model="warry" :disabled="disabled">
                                <option
                                    v-for="(item, index) in warrantystatus"
                                    :key="index"
                                    :value="item"
                                    >{{ item }}</option
                                >
                            </select>
                        </div>
                    </div>
                </div>
                <div class="overflow overflow1">
                    <span class="overflow-remarks">{{lang.EquipmentAccount_EquipmentRemark}}</span>
                    <textarea
                        name
                        id
                        v-if="sestion == 1"
                        :placeholder="lang.EquipmentAccount_EquipmentRemarkTag"
                        :value="sesstion.Remarks"
                        :disabled="disabled"
                    ></textarea>
                    <textarea
                        name
                        id
                        v-if="sestion == 2"
                        :placeholder="lang.EquipmentAccount_EquipmentRemarkTag"
                        v-model="pen.Remarks"
                        :disabled="disabled"
                    ></textarea>
                    <textarea
                        name
                        id
                        v-if="sestion == 3"
                        :placeholder="lang.EquipmentAccount_EquipmentRemarkTag"
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
                <span
                    v-if="select1 == 1"
                    :class="{ fcolor: $store.state.color == 'grey' }"
                    >{{lang.EquipmentAccount_SelectEquipmentType}}</span
                >
                <span
                    v-if="select1 == 2"
                    :class="{ fcolor: $store.state.color == 'grey' }"
                    >{{lang.SCMSConsoleWebApiMySql_SelectInstallPosition}}</span
                >
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
        <div class="tip" v-show="tipchange">
            <div class="tiphead" style="position:absolute;width: 380px;height: 40px;"></div>
            <div class="tiptop">
                <img :src="gth" alt />
                <span>{{lang.HT_MessageBoxCaption_Tips}}</span>
            </div>
            <div class="tipcontanin">
                <div class="tipword">{{ tipword }}</div>
                <div class="tipdetermine" @click="tip1" v-if="deltrue">
                   {{lang.MessageBox_Confrim}}
                </div>

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
            a11: 1,
            deltrue: true,
            wselectname3: '',
            changeselect: false,
            tipword: '',
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
            tipchange: false,
            gth: require('../../assets/images/gth.png'),
            moveDataelse: {
                x: null,
                y: null
            },
            person: [],
            warrantystatus: ['保内', '保外'],
            devicestatus: ['在用', '停用', '报废'],
            data5: [],
            select1: 1,
            pdyd2: true,
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
            PageData: {
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
            wselectname2: '',
            Preservation: '点击选择',
            Preservation1: '点击选择',
            Preservation5: '点击选择',
            hastip: 1,
            sbnum: 1,
            time4: '',
            muchdata: '',
            pdyd1: true,
            pdyd3: true,
            a: 1,
            data6: [],
            longinnum: '',
            deldata: {},
            delarray: [],
            yesdel: '',
            oldName: '',
            a1: 1,
            a2: 1,
            Meterid: '',
            jurisdiction:[],
            buttonarr:[],
            cxid:'',
            tjid:'',
            scid:'',
            drid:'',
            dcid:'',
            ckid:'',
            bjid:'',
             xiala:require('../../assets/images/ziyuan4.png'),
            cxshow:true,
            tjshow:true,
            scshow:true,
            drshow:true,
            dcshow:true,
            ckshow:true,
            bjshow:true,
            gsb:1,
            gaz:1,
            lang: JSON.parse(localStorage.getItem('languages'))[localStorage.getItem('currentLang')]
        };
    },

    created() {
        this.getLangData()
        this.getEquipmentType();
        this.req(1);
        this.time4 = this.getNowTime();
        this.jurisdiction = this.$store.state.btnPowerData;
        console.log("saddasdas",this.GetUrlParam('id'))
        console.log("asddaadsads",this.jurisdiction)
        this.buttonarr = this.findPathByLeafId(
            this.GetUrlParam('id'),
            this.jurisdiction
        )[0].Children;
        console.log('nbb', this.buttonarr);
        this.buttonarr.forEach(item => {
            if (item.RightName == '设备台账-查询按钮') {
                this.cxid = item.RightID;
            } else if (item.RightName == '设备台账-添加按钮') {
                this.tjid = item.RightID;
            } else if (item.RightName == '设备台账-删除按钮') {
                this.scid = item.RightID;
            } else if (item.RightName == '设备台账-导入按钮') {
                this.drid = item.RightID;
            } else if (item.RightName == '设备台账-导出按钮') {
                this.dcid = item.RightID;
            } else if (item.RightName == '设备台账-查看按钮') {
                this.ckid = item.RightID;
            } else if (item.RightName == '设备台账-编辑按钮') {
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
    },
    watch: {
        VpowerData(val) {
            this.jurisdiction = this.$store.state.btnPowerData;
            this.buttonarr = this.findPathByLeafId(
                this.GetUrlParam('id'),
                this.jurisdiction
            )[0].Children;
            console.log('nbb', this.buttonarr);
            this.buttonarr.forEach(item => {
                if (item.RightName == '设备台账-查询按钮') {
                    this.cxid = item.RightID;
                } else if (item.RightName == '设备台账-添加按钮') {
                    this.tjid = item.RightID;
                } else if (item.RightName == '设备台账-删除按钮') {
                    this.scid = item.RightID;
                } else if (item.RightName == '设备台账-导入按钮') {
                    this.drid = item.RightID;
                } else if (item.RightName == '设备台账-导出按钮') {
                    this.dcid = item.RightID;
                } else if (item.RightName == '设备台账-查看按钮') {
                    this.ckid = item.RightID;
                } else if (item.RightName == '设备台账-编辑按钮') {
                    this.bjid = item.RightID;
                }
                var userid = '';
                if (!JSON.parse(sessionStorage.getItem('userInfo1'))) {
                    userid = JSON.parse(
                        sessionStorage.getItem('sightseerInfo1')
                    ).SCMSUserID;
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
    computed: {
        VpowerData() {
            return this.$store.state.btnPowerData;
        }
    },
    methods: {
        getLangData() {
            this.warrantystatus = [this.lang.EquipmentAccount_Inside, this.lang.EquipmentAccount_Outside]
            this.devicestatus = [this.lang.EquipmentAccount_Used, this.lang.EquipmentAccount_Stopped, this.lang.EquipmentAccount_Abandoned]
            this.warry = this.lang.EquipmentAccount_Inside
            this.device = this.lang.EquipmentAccount_Used
        },
           atooltip(){
           let that = this
            setTimeout(()=>{
for(let i=0;i<$('.atooltip').length;i++){
                $('.atooltip')[i].style.zoom = that.a11
            }
            })
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
                        type: 'binary'
                    });
                    const wsname = workbook.SheetNames[0]; //取第一张表
                    const ws = XLSX.utils.sheet_to_json(
                        workbook.Sheets[wsname]
                    ); //生成json表格内容
                    let a = 0;
                    console.log(ws);
                    for (a in ws) {
                        ws[a].No = ws[a][this.lang.AlarmRecord_HT_AlarmPointManageUC_SerialNumber];
                        ws[a].DeviceName = ws[a][this.lang.EquipmentAccount_EquipmentName];
                        ws[a].DetailDeviceType = ws[a][this.lang.EquipmentAccount_EquipmentType]
                        ws[a].DetailInstallationLocation = ws[a][this.lang.EquipmentAccount_InstallPosition]
                        ws[a].DeviceNo = ws[a][this.lang.EquipmentAccount_EquipmentNumber]
                        ws[a].DevicePath = ws[a][this.lang.EquipmentAccount_EquipmentType],
                        ws[a].InstallPath = ws[a][this.lang.EquipmentAccount_InstallPosition],
                        ws[a].DeviceType = ws[a][this.lang.EquipmentAccount_EquipmentType],
                        ws[a].InstallationLocation = ws[a][this.lang.EquipmentAccount_InstallPosition],
                            // ws[a].DeviceType = (ws[a].设备类型.split('>')[ws[a].设备类型.split('>').length-1]);
                        ws[a].DeviceModel = ws[a][this.lang.EquipmentAccount_EquipmentModel];
                        ws[a].AssetsNo = ws[a][this.lang.EquipmentAccount_AssetNumber];
                        // ws[a].InstallationLocation = (ws[a].安装位置.split('>')[ws[a].安装位置.split('>').length-1]);
                        ws[a].Department = ws[a][this.lang.EquipmentAccount_Department];
                        ws[a].PersonInCharge = ws[a][this.lang.EquipmentAccount_Person];
                        ws[a].Manufactor = ws[a][this.lang.EquipmentAccount_Manufacturer];
                        ws[a].DepreciationLife = ws[a][this.lang.EquipmentAccount_PeriodOfDepreciation];
                        ws[a].PurchaseTime = ws[a][this.lang.EquipmentAccount_PurchaseDate];
                        ws[a].PurchaseAmount = ws[a][this.lang.EquipmentAccount_PurchaseAmount];
                        ws[a].Salesman = ws[a][this.lang.EquipmentAccount_Salesman];
                        ws[a].Contact = ws[a][this.lang.EquipmentAccount_Contact];
                        ws[a].CheckTime = !ws[a].验收时间
                            ? ws[a][this.lang.EquipmentAccount_AcceptanceDate]
                            : ws[a].验收时间;
                        ws[a].EnableTime = ws[a][this.lang.EquipmentAccount_StartDate];
                        ws[a].DeviceStatus = ws[a][this.lang.EquipmentAccount_EquipmentStatus];
                        ws[a].QualityStatus = ws[a][this.lang.EquipmentAccount_WarrantyStatus];
                        ws[a].Remarks = ws[a][this.lang.EquipmentAccount_EquipmentRemark];
                    }
                    let b = 0;
                    for (b in ws) {
                        delete ws[b][this.lang.AlarmRecord_HT_AlarmPointManageUC_SerialNumber]
                        delete ws[b][this.lang.EquipmentAccount_EquipmentName]
                        delete ws[b][this.lang.EquipmentAccount_EquipmentNumber]
                        delete ws[b][this.lang.EquipmentAccount_EquipmentType]
                        delete ws[b][this.lang.EquipmentAccount_EquipmentModel]
                        delete ws[b][this.lang.EquipmentAccount_AssetNumber]
                        delete ws[b][this.lang.EquipmentAccount_InstallPosition]
                        delete ws[b][this.lang.EquipmentAccount_Department]
                        delete ws[b][this.lang.EquipmentAccount_Person]
                        delete ws[b][this.lang.EquipmentAccount_Manufacturer]
                        delete ws[b][this.lang.EquipmentAccount_PeriodOfDepreciation]
                        delete ws[b][this.lang.EquipmentAccount_PurchaseDate]
                        delete ws[b][this.lang.EquipmentAccount_PurchaseAmount]
                        delete ws[b][this.lang.EquipmentAccount_Salesman]
                        delete ws[b][this.lang.EquipmentAccount_Contact]
                        delete ws[b][this.lang.EquipmentAccount_AcceptanceDate]
                        delete ws[b][this.lang.EquipmentAccount_StartDate]
                        delete ws[b][this.lang.EquipmentAccount_EquipmentStatus]
                        delete ws[b][this.lang.EquipmentAccount_WarrantyStatus]
                        delete ws[b][this.lang.EquipmentAccount_EquipmentRemark]
                        delete ws[b][this.lang.EquipmentAccount_AcceptanceDate]
                    }
                    console.log(ws);
                    this.daorudata = ws;
                    let aaa = '';
                    if (
                        !JSON.parse(sessionStorage.getItem('userInfo1')) ||
                        JSON.parse(sessionStorage.getItem('userInfo1')) == null
                    ) {
                        aaa = JSON.parse(
                            sessionStorage.getItem('sightseerInfo1')
                        ).SCMSUserName;
                    } else {
                        aaa = JSON.parse(sessionStorage.getItem('userInfo1'))
                            .SCMSUserName;
                    }
                    let x = 0;
                    for (x in this.daorudata) {
                        this.daorudata[x].LoginUserName = aaa;
                        if (this.daorudata[x].DepreciationLife == '') {
                            this.daorudata[x].DepreciationLife = null;
                            console.log('sssssssssssssssssssss1');
                        }
                        if (this.daorudata[x].PurchaseAmount == '') {
                            this.daorudata[x].PurchaseAmount = null;
                            console.log('sssssssssssssssssssss2');
                        }
                    }
                    console.log(
                        `/api/EquipmentAccount/EquipmentAccount_ImportAccount`
                    );
                    console.log(this.daorudata);
                    this.$axios({
                        method: 'post',
                        url: `/api/EquipmentAccount/EquipmentAccount_ImportAccount`,
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
                        this.pdyd3 = true;
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
            this.delarray = [];
            let i = 0;
            for (i in selection) {
                selection[i].ID = selection[i].AID;
                if (!JSON.parse(sessionStorage.getItem('userInfo1'))) {
                    selection[i].Operator = JSON.parse(
                        sessionStorage.getItem('sightseerInfo1')
                    ).SCMSUserName;
                } else {
                    selection[i].Operator = JSON.parse(
                        sessionStorage.getItem('userInfo1')
                    ).SCMSUserName;
                }
                selection[i].OperateTime = this.time4;
            }
            this.delarray = selection;

            // console.log(this.)
        },
        selectall(selection) {
            this.delarray = [];
            let i = 0;
            for (i in selection) {
                selection[i].ID = selection[i].AID;
                if (!JSON.parse(sessionStorage.getItem('userInfo1'))) {
                    selection[i].Operator = JSON.parse(
                        sessionStorage.getItem('sightseerInfo1')
                    ).SCMSUserName;
                } else {
                    selection[i].Operator = JSON.parse(
                        sessionStorage.getItem('userInfo1')
                    ).SCMSUserName;
                }
                selection[i].OperateTime = this.time4;
            }
            this.delarray = selection;
        },
        handleNodeClic6(data) {
            this.Meter = data.label;
            this.Meterid = data.NID;
            console.log(data);
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
                url: `/api/EquipmentAccount/EquipmentAccount_DeleteEquipmentAccount`,
                data: this.delarray
            })

                .then(res => {
                    this.getEquipmentType();
                    this.req(1);
                })
                .then(() => {})
                .catch(err => {});
            setTimeout(() => {
                this.tipword = this.lang.FormulaManage_HT_DeletedSuccessfully

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
                this.deltrue = true;
            }, 1000);
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
               this.lang.NoOperationAuthority
                return;
            }
            if (!this.delarray.length == 0) {
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
                this.pdyd3 = true;
                this.deltrue = false;
            } else {
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
                this.pdyd3 = true;
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
                this.tipword = `该账户无操作权限！`;
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
                this.tipword = this.lang.NoOperationAuthority;
                return;
            }
            let rang = this.Meter;
            if (this.Meterid == '11111111-1111-1111-1111-111111111111"') {
                rang = '';
            }
            this.$axios({
                method: 'post',
                url: `/api/EquipmentAccount/EquipmentAccount_GstEquipment?argDeviceType=${rang}&argKeyword=${this.keyword}&argPageSize=${this.PageData.TotalCount}&argPageIndex=${this.pageindex}`
            })
                .then(res => {
                    let i = 0;
                    let a = 0;
                    for (i in res.data.data.DataList) {
                        if (!res.data.data.DataList[i].DetailDeviceType) {
                            res.data.data.DataList[i].DetailDeviceType =
                                res.data.data.DataList[i].DeviceType;
                        }
                        if (
                            !res.data.data.DataList[i]
                                .DetailInstallationLocation
                        ) {
                            res.data.data.DataList[
                                i
                            ].DetailInstallationLocation =
                                res.data.data.DataList[i].InstallationLocation;
                        }
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
                        if (res.data.data.DataList[a].Contact == null) {
                            res.data.data.DataList[a].Contact = '';
                        }
                        if (res.data.data.DataList[a].Department == null) {
                            res.data.data.DataList[a].Department = '';
                        }

                        if (res.data.data.DataList[a].DeviceModel == null) {
                            res.data.data.DataList[a].DeviceModel = '';
                        }
                        if (res.data.data.DataList[a].Manufactor == null) {
                            res.data.data.DataList[a].Manufactor = '';
                        }
                        if (res.data.data.DataList[a].PurchaseAmount == null) {
                            res.data.data.DataList[a].PurchaseAmount = '';
                        }
                        if (
                            res.data.data.DataList[a].DepreciationLife == null
                        ) {
                            res.data.data.DataList[a].DepreciationLife = '';
                        }
                        if (res.data.data.DataList[a].Remarks == null) {
                            res.data.data.DataList[a].Remarks = '';
                        }
                        if (res.data.data.DataList[a].Salesman == null) {
                            res.data.data.DataList[a].Salesman = '';
                        }
                    }
                    this.muchdata = res.data.data.DataList;
                    this.muchdata = !this.muchdata
                        ? [
                              {
                                  number: '',
                                  DeviceName: '',
                                  DeviceNo: '',
                                  DetailDeviceType: '',
                                  DeviceModel: '',
                                  AssetsNo: '',
                                  DetailInstallationLocation: '',
                                  Department: '',
                                  PersonInCharge: '',
                                  Manufactor: '',
                                  DepreciationLife: '',
                                  PurchaseTime: '',
                                  PurchaseAmount: '',
                                  Salesman: '',
                                  Contact: '',
                                  CheckTime: '',
                                  EnableTime: '',
                                  DeviceStatus: '',
                                  QualityStatus: '',
                                  Remarks: ''
                              }
                          ]
                        : this.muchdata;
                })
                .then(() => {
                    require.ensure([], () => {
                        const {
                            export_json_to_excel
                        } = require('../../vendor/Export2Excel');
                        const tHeader = [
                            this.lang.AlarmRecord_HT_AlarmPointManageUC_SerialNumber,
                            this.lang.EquipmentAccount_EquipmentName,
                            this.lang.EquipmentAccount_EquipmentNumber,
                            this.lang.EquipmentAccount_EquipmentType,
                            this.lang.EquipmentAccount_EquipmentModel,
                            this.lang.EquipmentAccount_AssetNumber,
                            this.lang.EquipmentAccount_InstallPosition,
                            this.lang.EquipmentAccount_Department,
                            this.lang.EquipmentAccount_Person,
                            this.lang.EquipmentAccount_Manufacturer,
                            this.lang.EquipmentAccount_PeriodOfDepreciation,
                            this.lang.EquipmentAccount_PurchaseDate,
                            this.lang.EquipmentAccount_PurchaseAmount,
                            this.lang.EquipmentAccount_Salesman,
                            this.lang.EquipmentAccount_Contact,
                            this.lang.EquipmentAccount_AcceptanceDate,
                            this.lang.EquipmentAccount_StartDate,
                            this.lang.EquipmentAccount_EquipmentStatus,
                            this.lang.EquipmentAccount_WarrantyStatus,
                            this.lang.EquipmentAccount_EquipmentRemark
                        ];
                        const filterVal = [
                            'number',
                            'DeviceName',
                            'DeviceNo',
                            'DetailDeviceType',
                            'DeviceModel',
                            'AssetsNo',
                            'DetailInstallationLocation',
                            'Department',
                            'PersonInCharge',
                            'Manufactor',
                            'DepreciationLife',
                            'PurchaseTime',
                            'PurchaseAmount',
                            'Salesman',
                            'Contact',
                            'CheckTime',
                            'EnableTime',
                            'DeviceStatus',
                            'QualityStatus',
                            'Remarks'
                        ];
                        console.log('sda', tHeader);
                        console.log('sad', filterVal);
                        console.log(this.muchdata);
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
                                    tableDatas: [],
                                    sheetName: 'sheet2'
                                }
                            ];
                        }

                        this.json2excel(
                            this.excelDatas,
                            this.lang.EquipmentAccount_EquipmentAccount,
                            true,
                            'xlsx'
                        );
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
            this.$axios
                .post(
                    `/api/EquipmentAccount/EquipmentAccount_SetEquipmentAccount?argClass={
                        "DeviceName":"${this.pen.DeviceName}",
                        "DevicePath":"${this.pen.DetailDeviceType}",
                        "InstallPath":"${this.pen.DetailInstallationLocation === this.lang.EquipmentAccount_ClickSelect ? '' : this.pen.DetailInstallationLocation}",
                        "DeviceNo":"${this.pen.DeviceNo}",
                        "DeviceType":"${this.pen.DeviceType === this.lang.EquipmentAccount_ClickSelect ? '' : this.pen.DeviceType}",
                        "DeviceModel":"${this.pen.DeviceModel}",
                        "AssetsNo":"${this.pen.AssetsNo}",
                        "InstallationLocation":"${this.pen.InstallationLocation === this.lang.EquipmentAccount_ClickSelect ? '' : this.pen.InstallationLocation}",
                        "Department":"${this.pen.Department}",
                        "PersonInCharge":"${this.person1}",
                        "Manufactor":"${this.pen.Manufactor}",
                        "DepreciationLife":"${this.pen.DepreciationLife}",
                        "PurchaseTime":"${this.pen.PurchaseTime}",
                        "PurchaseAmount":"${this.pen.PurchaseAmount}",
                        "Salesman":"${this.pen.Salesman}",
                        "Contact":"${this.pen.Contact}",
                        "CheckTime":"${this.pen.CheckTime}",
                        "EnableTime":"${this.pen.EnableTime}",
                        "DeviceStatus":${this.sbnum},
                        "QualityStatus":${this.warrynum},
                        "DetailDeviceType":"${this.pen.DetailDeviceType === this.lang.EquipmentAccount_ClickSelect ? '' : this.pen.DetailDeviceType}",
                        "DetailInstallationLocation":"${this.pen.DetailInstallationLocation === this.lang.EquipmentAccount_ClickSelect ? '' : this.pen.DetailInstallationLocation}",
                        "Remarks":"${this.pen.Remarks}",
                        "AddTime":"${this.time4}",
                        "AID":"${this.pen.AID}",}&argOperateType=2&argOldName=${this.oldName}&argLoginUserName=${this.longinnum}&argPageSize=50&argPageIndex=1`
                )
                .then(res => {
                    if (res.data.code == 0) {
                        this.tipword = this.lang.FormulaManage_HT_FormulaSetting_ModifiedSuccessfully;

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
                        this.getEquipmentType();
                        this.change = false;
                    } else {
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
                        this.pdyd3 = true;
                    }

                    console.log(res);
                })
                .then(() => {})
                .catch(err => {});
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

            //   &DetailInstallationLocation:${this.DetailInstallationLocation}
            this.$axios
                .post(
                    `/api/EquipmentAccount/EquipmentAccount_SetEquipmentAccount?argClass={"AID":"11111111-1111-1111-1111-111111111111","DeviceName":"${
                        this.tip.DeviceName
                    }","DeviceNo":"${this.tip.DeviceNo}","DeviceType":"${
                        this.wselectname2 === this.lang.EquipmentAccount_ClickSelect ? '' :
                        this.wselectname2.split('>')[
                            this.wselectname2.split('>').length - 1
                        ]
                    }","DeviceModel":"${this.tip.DeviceModel}","AssetsNo":"${
                        this.tip.AssetsNo
                    }","InstallationLocation":"${
                        this.wselectname3 === this.lang.EquipmentAccount_ClickSelect ? '' :
                        this.wselectname3.split('>')[
                            this.wselectname3.split('>').length - 1
                        ]
                    }","Department":"${
                        this.tip.Department
                    }","PersonInCharge":"${this.person1}","Manufactor":"${
                        this.tip.Manufactor
                    }","DepreciationLife":"${
                        this.tip.DepreciationLife
                    }","PurchaseTime":"${this.time1}","PurchaseAmount":"${
                        this.tip.PurchaseAmount
                    }","Salesman":"${this.tip.Salesman}","Contact":"${
                        this.tip.Contact
                    }","DevicePath":"${this.wselectname2}","InstallPath":"${
                        this.wselectname3  === this.lang.EquipmentAccount_ClickSelect ? '' : this.wselectname3
                    }","CheckTime":"${this.time2}","EnableTime":"${
                        this.time3
                    }","DeviceStatus":${this.sbnum},"QualityStatus":${
                        this.warrynum
                    },"Remarks":"${this.tip.Remarks}","AddTime":"${
                        this.time4
                    }","DetailDeviceType":"${
                        this.wselectname2 === this.lang.EquipmentAccount_ClickSelect ? '' : this.wselectname2
                    }","DetailInstallationLocation":"${
                        this.wselectname3 === this.lang.EquipmentAccount_ClickSelect ? '' : this.wselectname3
                    }"}&argOperateType=1&argOldName=2019-11-26 11:56:15&argLoginUserName=${
                        this.longinnum
                    }&argPageSize=50&argPageIndex=1`
                )
                .then(res => {
                    console.log(res);
                    if (res.data.code == 0) {
                        this.tipword = this.lang.EquipmentAccount_SuccessfullyAdded;

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
                        this.getEquipmentType();
                        this.req(1);
                        this.change = false;
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
                    } else {
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
                        this.pdyd3 = true;
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
            console.log('data', data.NodeType);
            this.dataArr = [];
            this.dataArr.unshift(data.NodeName);
            if (this.select1 == 1) {
                if (data.NodeType == 1) {
                    if (data.NodeType != 2) {
                        if (data.NodeDepth > 2) {
                            this.selectname2(data);
                        }
                    }
                }
                console.log(this.dataArr);

                if (this.dataArr) {
                    this.Preservation1 = this.dataArr.join('>');
                } else {
                    this.Preservation1 = data.label;
                }
            } else if (this.select1 == 2) {
                if (data.NodeType == 2) {
                    this.dataArr2 = [];
                    this.dataArr2.unshift(data.NodeName);
                    if (data.NodeDepth > 2) {
                        this.selectname3(data);
                    }
                }

                if (this.dataArr2.length !== 0) {
                    this.Preservation5 = this.dataArr2.join('>');
                } else {
                    this.Preservation5 = data.label;
                }
            }
        },
        handleNodeClick1(data) {
            console.log(data);
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

                // this.Preservation1 = data.label;
                if (this.dataArr.length !== 0) {
                    this.pen.DetailDeviceType = this.dataArr.join('>');
                    this.Preservation1 = this.dataArr.join('>');
                } else {
                    this.pen.DetailDeviceType = data.label;
                    this.Preservation1 = data.label;
                }
            } else if (this.select1 == 2) {
                this.gaz = 2;
                this.dataArr2 = [];
                this.dataArr2.unshift(data.NodeName);
                if (data.NodeType == 2) {
                    if (data.NodeDepth > 2) {
                        this.selectname3(data);
                    }
                }

                if (this.dataArr2.length !== 0) {
                    this.pen.InstallationLocation = this.dataArr2.join('>');

                    this.Preservation5 = this.dataArr2.join('>');
                } else {
                    this.pen.InstallationLocation = data.label;

                    this.Preservation5 = data.label;
                }
            }
        },
        importfxx(obj) {
            console.log(obj);
        },
        cancel() {
            this.change = false;
        },
        Preservation2() {
            if (this.sestion == 3) {
                if (this.select1 == 1) {
                    if (!this.Preservation1) {
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
                        this.pdyd3 = true;
                    } else {
                        this.wselectname2 = this.Preservation1;
                        this.cancel1 = false;
                    }
                } else if (this.select1 == 2) {
                    if (!this.Preservation5) {
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
                    this.pdyd3 = true;
                } else {
                    this.pen.DetailDeviceType = this.Preservation1;
                    this.pen.DeviceType = this.Preservation1.split('>')[
                        this.Preservation1.split('>').length - 1
                    ];
                    this.cancel1 = false;
                }
            }
            if (this.gaz == 2) {
                if (!this.Preservation5) {
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
                    this.pdyd3 = true;
                } else {
                    this.pen.DetailInstallationLocation = this.Preservation5;
                    this.pen.InstallationLocation = this.Preservation5.split(
                        '>'
                    )[this.Preservation5.split('>').length - 1];
                    this.cancel1 = false;
                }
            }

            this.gaz = 1;
            this.gsb = 1;

            // }
        },
        handleEdit(a, b) {
            console.log(b);
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
            let c = JSON.stringify(b);
            this.sesstion = JSON.parse(c);
            // this.sesstion.CheckTime = Date(
            //     this.sesstion.CheckTime.replace(/[^0-9]/gi, '')
            // );
            // this.sesstion.EnableTime = Date(
            //     this.sesstion.EnableTime.replace(/[^0-9]/gi, '')
            // );
            // this.sesstion.PurchaseTime = Date(
            //     this.sesstion.PurchaseTime.replace(/[^0-9]/gi, '')
            // );
            console.log(this.sesstion);

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
                let w1 =  $('.linetop2').width() + 20 +'px'
                $('.linetop4').css({
                    width:`calc(100% - ${w})`
                })
                $('.linetop3').css({
                    width:`calc(100% - ${w1})`
                })
                })
                this.move('sestion', 'sestionheader1');
            });
            this.device = this.sesstion.DeviceStatus;
            this.warry = this.sesstion.QualityStatus;
            this.person1 = this.sesstion.PersonInCharge;
            let i = 0;
            for (i in this.sesstion) {
                console.log(this.sesstion[i]);
                if (this.sesstion[i] == 'null') {
                    this.sesstion[i] = null;
                }
            }
            console.log(this.sesstion);
        },
        handleEdit1(a, b, d) {
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
                  this.tipword = this.lang.NoOperationAuthority;
                return;
            }
            Object.keys(b).forEach(function(key) {
                if (b[key] == null) {
                    b[key] = '';
                }
            });

            this.add();
            this.a = a;
            this.sestion = 2;
            this.disabled = false;
            let c = JSON.stringify(b);

            this.pen = JSON.parse(c);
            console.log(this.pen);
            this.oldName = JSON.parse(c).DeviceName;

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
                let w1 =  $('.linetop2').width() + 20 +'px'
                $('.linetop4').css({
                    width:`calc(100% - ${w})`
                })
                $('.linetop3').css({
                    width:`calc(100% - ${w1})`
                })
                })
                this.move('sestion', 'sestionheader1');
            });
            console.log(this.sesstion);
            this.device = this.pen.DeviceStatus;
            this.warry = this.pen.QualityStatus;
            this.person1 = this.pen.PersonInCharge;
            // if (this.sesstion.DeviceStatus == 1) {
            //     this.sesstion.DeviceStatus = '在用';
            //     this.device = '在用';

            // } else if (this.sesstion.DeviceStatus == 2) {
            //     this.sesstion.DeviceStatus = '停用';
            //     this.sesstion.DeviceStatus = '停用';
            // } else if (this.sesstion.DeviceStatus == 3) {
            //     this.sesstion.DeviceStatus = '报废';
            //      this.device = '报废';
            // }
            // if (this.sesstion.QualityStatus == 1) {
            //     this.sesstion.QualityStatus = '保内';
            // } else if (this.sesstion.QualityStatus == 2) {
            //     this.sesstion.QualityStatus = '保外';
            // }
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
                this.tipword = this.lang.NoOperationAuthority;
                return;
            }
            console.log('ee2', this.wselectname2, this.wselectname3);
            this.wselectname2 = '';
            this.wselectname3 = '';
            (this.tip = {
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
            }),
                (this.pen = {
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
                }),
                (this.pdyd1 = true);
            (this.wselectname2 = this.lang.EquipmentAccount_ClickSelect),
                (this.wselectname3 = this.lang.EquipmentAccount_ClickSelect),
                (this.device = this.lang.EquipmentAccount_Used);
            this.person1 = 'SuperAdmin';

            this.warry = this.lang.EquipmentAccount_Inside;
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

            this.sesstion = '';
            this.time1 = this.getNowTime();
            this.time2 = this.getNowTime();
            this.time3 = this.getNowTime();
            this.time4 = this.getNowTime();
            this.sestion = 3;
            this.disabled = false;

            setTimeout(() => {
                $('.sestion').css({
                    zoom: this.a11,
                    left: `calc(50% - ${($('.sestion').width() / 2) *
                        this.a11}px)`,
                    top: `calc(50% - ${($('.sestion').height() / 2) *
                        this.a11}px)`
                });
                this.move('sestion', 'sestionheader1');
                this.change = true;
                 setTimeout(()=>{
                       let w =  $('.linetop1').width() + 20 +'px'
                let w1 =  $('.linetop2').width() + 20 +'px'
                $('.linetop4').css({
                    width:`calc(100% - ${w})`
                })
                $('.linetop3').css({
                    width:`calc(100% - ${w1})`
                })
                })
            });
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
            for (i in this.selectname1) {
                if (this.a2 == 1) {
                    if (this.selectname1[i].NodeName == this.lang.EquipmentAccount_InstallPosition) {
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
            this.anythingdata();
        },
        selectword1(a) {
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
                    $('.seleword1')[0].clientHeight +
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
                this.tipword =  this.lang.NoOperationAuthority;
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
            this.$axios({
                method: 'post',
                url: `/api/EquipmentAccount/EquipmentAccount_GstEquipment?argDeviceType=${rang}&argKeyword=${this.keyword}&argPageSize=${this.pagesize}&argPageIndex=${this.pageindex}`
            })
                .then(res => {
                    this.PageData = res.data.data.ParameterList;
                    let i = 0;
                    let a = 0;
                    for (i in res.data.data.DataList) {
                        if (!res.data.data.DataList[i].DetailDeviceType) {
                            res.data.data.DataList[i].DetailDeviceType =
                                res.data.data.DataList[i].DeviceType;
                        }
                        if (
                            !res.data.data.DataList[i]
                                .DetailInstallationLocation
                        ) {
                            res.data.data.DataList[
                                i
                            ].DetailInstallationLocation =
                                res.data.data.DataList[i].InstallationLocation;
                        }
                        if (res.data.data.DataList[i].Contact == 'null') {
                            res.data.data.DataList[i].Contact = ' ';
                        }
                        if (res.data.data.DataList[i].Department == 'null') {
                            res.data.data.DataList[i].Department = ' ';
                        }
                        if (
                            res.data.data.DataList[i].DepreciationLife == 'null'
                        ) {
                            res.data.data.DataList[i].DepreciationLife = ' ';
                        }
                        if (res.data.data.DataList[i].DeviceModel == 'null') {
                            res.data.data.DataList[i].DeviceModel = ' ';
                        }
                        if (res.data.data.DataList[i].Manufactor == 'null') {
                            res.data.data.DataList[i].Manufactor = ' ';
                        }
                        if (
                            res.data.data.DataList[i].PurchaseAmount == 'null'
                        ) {
                            res.data.data.DataList[i].PurchaseAmount = ' ';
                        }
                        if (res.data.data.DataList[i].Remarks == 'null') {
                            res.data.data.DataList[i].Remarks = ' ';
                        }
                        if (res.data.data.DataList[i].Salesman == 'null') {
                            res.data.data.DataList[i].Salesman = ' ';
                        }
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
                    console.log('res', res);
                })
                .catch(function(error) {
                    console.log(error);
                });
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
                this.tipword = this.lang.NoOperationAuthority;
                e.preventDefault();
                return;
            }
        },
        anythingdata() {
            let rang = this.Meter;
            if (this.Meterid == '11111111-1111-1111-1111-111111111111"') {
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
                    console.log(res);
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
        isPositiveInteger(s) {
            //是否为正整数
            var re = /^[0-9]+$/;
            return re.test(s);
        },
        req(pageIndex, s) {
            console.log('ssssss');
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
                    this.pdyd3 = true;
                    this.tipword = this.lang.RoleManage_HT_PEAPositiveInteger;

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
                            this.tipword = this.lang.DataGrid_Reaction_HT_PEThePageNumber;

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
                            this.pdyd3 = true;
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
        }
    },
    mounted() {
        this.a11 = Number(parseFloat(window.screen.width / 1920).toFixed(2));
        if (this.a11 < 1) {
            this.a11 = 0.8;
        }
        let that = this;
         $('body')[0].addEventListener("mousemove",function(){
         that.atooltip()
     })
        console.log(this.a11)
        setTimeout(() => {
            let a = this.a11 * 120 + 'px';
            $('.table-container').css({
                height: `calc(100% - ${a})`
            });
        });
        this.$refs.upload.addEventListener('change', e => {
            //绑定监听表格导入事件
            this.readExcel(e);
        });
        this.$axios
            .post(`/api/UserManage/UserManage_GstUserWithNoPage`)
            .then(res => {
                console.log('ss', res);
                this.person = res.data.data;
            });
    }
};
</script>
<style>
.margin .el-input__inner{
    text-indent: 0.5em;
    width: 230px;
    height: 36px;
    border: none;
    border: 1px solid #e0e0e0;
}
</style>

<style lang="scss" scoped>
.linetop1{
    display: inline-block;
}
.linetop2{
    display: inline-block;
}
.yd3 {
    margin: auto;
    top: 0 !important;
    right: 0 !important;
    bottom: 0 !important;
    left: 0 !important;
}
.tip {
    position: fixed;
    width: 380px;
    height: 200px;
    z-index: 399999900;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
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
    .tipcontanin{
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
        position: absolute;
        bottom: 10px;
        left: 35px;
        height: 30px;
        background-color: #f3e3ad;
    }
    .delclass {
        width: 330px;
        line-height: 30px;
        position: absolute;
        left: 25px;
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
    height: 60px;
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
        width: 7%;
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
        width: 7%;
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
        width: 7%;
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
    width: 7%;
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
.yd1 {
    margin: auto;
    top: 0 !important;
    right: 0 !important;
    bottom: 0 !important;
    left: 0 !important;
}
.yd2 {
    margin: auto;
    top: 0 !important;
    right: 0 !important;
    bottom: 0 !important;
    left: 0 !important;
}
.yd3 {
    margin: auto;
}

.sestion {
    width: 750px;
    height: 780px;
    z-index: 199999900;
    position: fixed;
    top: 60px;
    left: 0;
    right: 0;
    bottom: 0;

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
            z-index: 199999950;
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
        width: 100px;
        text-align: center;
        margin-right: 20px;
    }
}

.overflow1 {
    display: flex;
}
.overflow {
    overflow: hidden;
    width: 100%;
    margin-top: 15px;
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
        overflow: hidden;
        line-height: 40px;
        border: 1px solid #e0e0e0;
        position: relative;
        span {
            color: #cecece;
        }
    }
    .inputimg {
        z-index: 199999950;
        position: absolute;
        right: 7px;
        top: 0;
        cursor: pointer;
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
    margin-top: 8px;
    display: flex;
    align-items: center;
    height: 40px;
}
.indent {
    text-indent: 1em;
    width: 57px;
    display: inline-block;
    height: auto;
}
.block {
    display: inline-block;
    position: relative;
    left: -5px;
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
    top: 0px;
    left: 0px;
    bottom: 0px;
    right: 0px;
    background-color: #eeeeee;
    box-shadow: 0px 0px 8px black;
    z-index: 299999900;
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
            z-index: 299999950;
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
    span {
        color: #fff;
    }
}
.choicehead1 {
    width: 100%;
    position: absolute;
    height: 50px;
}

.selectword {
    position: absolute;
    // top: 0;
    // left: 0;
    z-index: 19999991;
    // width: 200px;
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
    z-index: 99999990;
    position: fixed;
    top: 0;
    left: 0;
}
.cover2 {
    width: 100%;
    height: 100%;
    z-index: 290;
    position: fixed;
    top: 0;
    left: 0;
}
.cover3 {
    width: 100%;
    height: 100%;
    z-index: 199999990;
    position: fixed;
    top: 0;
    left: 0;
}
select {
    background-color: #fff;
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
img {
    cursor: pointer;
}
.outputlist_upload {
    left: -10px !important;
    width: 100% !important;
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
}
.sblx {
    display: inline-block;
}

</style>
