<!--
 * @Description: 点巡检管理点巡检标准界面
 * @Date: 2019-11-25 19:07:09
 * @Author: 随风
 * @LastEditors: Tao
 * @LastEditTime: 2020-12-21 11:30:49
 -->
<template>
    <div class="public-table" @click="changeselect = false">
        <div
            class="loadcover"
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(0, 0, 0, 0.4)"
            v-loading="this.$store.state.isShow"
            v-show="this.$store.state.isShow"
            style="position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;"
        ></div>
        <div
            class="search-container"
            :style="{
                zoom
            }"
        >
            <span class="sblx">{{ lang.EquipmentAccount_EquipmentType1 }}</span>
            <div class="seleword seleword3" @click.stop="selectword1">
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
            />
            <div class="sad" @click="sad">{{ lang.RoleManage_Query }}</div>
            <div class="deleteBtn" @click="deldata1">
                {{ lang.RoleManage_Delete }}
            </div>
            <div @click="addPopFun" class="addBtn">
                {{ lang.RoleManage_Add }}
            </div>
        </div>
        <div class="table-container">
            <el-table
                ref="multipleTable"
                :data="tableData1"
                stripe
                height="100%"
                tooltip-effect="dark"
                :style="{
                    width: 1700 * zoom + 'px',
                    fontSize: 14 * zoom + 'px'
                }"
                @select="select3"
                @select-all="select2"
                border
                highlight-current-row
                :header-cell-style="{
                    background:
                        $store.state.color == 'grey' ? '#D9DBDE' : '#5a6c98',
                    color: $store.state.color == 'grey' ? '#000' : '#fff',
                    'border-left': '1px solid #cccccc',
                    height: 50 * zoom + 'px',
                    fontSize: 14 * zoom + 'px',
                    padding: '0'
                }"
            >
                <template slot="empty">
                    <span>{{ lang.SCMSConsoleWebApiMySql_NoData }}</span>
                </template>
                <el-table-column
                    type="selection"
                    :width="60 * zoom"
                    :show-overflow-tooltip="true"
                    fixed
                ></el-table-column>
                <el-table-column
                    :label="lang.RoleManage_NO"
                    :width="100 * zoom"
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
                    :width="200 * zoom"
                    fixed
                >
                    <template slot-scope="scope">
                        <!-- <i class="el-icon-share"></i> -->
                        <div
                            class="img"
                            @click="handleEdit(scope.$index, scope.row)"
                            :style="{
                                width: 60 * zoom + 'px',
                                height: 30 * zoom + 'px',
                                lineHeight: 30 * zoom + 'px',
                                marginLeft: 10 * zoom + 'px'
                            }"
                        >
                            <img
                                :src="look"
                                alt
                                :style="{
                                    width: 24 * zoom + 'px',
                                    height: 24 * zoom + 'px'
                                }"
                            />
                            {{ scope.row.phone }}
                        </div>
                        <!-- <i class="el-icon-share"></i> -->
                        <div
                            class="img"
                            @click="handleEdit1(scope.$index, scope.row)"
                            :style="{
                                width: 60 * zoom + 'px',
                                height: 30 * zoom + 'px',
                                lineHeight: 30 * zoom + 'px',
                                marginLeft: 10 * zoom + 'px'
                            }"
                        >
                            <img
                                :src="pensoil"
                                alt
                                :style="{
                                    width: 24 * zoom + 'px',
                                    height: 24 * zoom + 'px'
                                }"
                            />
                            {{ scope.row.phone }}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="Name"
                    :label="lang.PointInspectionManage_StandardName"
                    :show-overflow-tooltip="true"
                ></el-table-column>
                <el-table-column
                    prop="DevicesStr"
                    :label="lang.PointInspectionManage_AssociatedEquipment"
                    :show-overflow-tooltip="true"
                ></el-table-column>
                <el-table-column
                    prop="Requirement"
                    :label="
                        lang.PointInspectionManage_PatrolInspectionRequirements
                    "
                    :show-overflow-tooltip="true"
                ></el-table-column>
            </el-table>
        </div>
        <div class="pages-container">
            <div class="page">
                <div class="pageword">
                    {{ lang.DataGrid_Reaction_HT_ATotalOf }}
                    <span>{{ PageData.TotalCount }}</span
                    >{{ lang.DataGrid_Reaction_HT_RecordsAndTheCurrent }}
                    <span>{{ PageData.PageIndex }}</span
                    >{{ lang.DataGrid_Reaction_HT_Page }}
                    <span>{{ PageData.TotalPage }}</span
                    >{{ lang.DataGrid_Reaction_HT_RecordsAnd }}
                    <span>{{ PageData.PageSize }}</span
                    >{{ lang.DataGrid_Reaction_HT_PerPage }}
                </div>
                <div class="pageoperation">
                    <span class="btn" @click="start">{{
                        lang.DataGrid_Reaction_FirstPage
                    }}</span>
                    <span
                        class="btn"
                        :class="{ nopage: !PageData.LastEnabled }"
                        @click="abck"
                        >{{ lang.DataGrid_Reaction_LastPage }}</span
                    >
                    <span
                        class="btn"
                        :class="{ nopage: !PageData.NextEnabled }"
                        @click="next"
                        >{{ lang.DataGrid_Reaction_NextPage }}</span
                    >
                    <span class="btn" @click="end">{{
                        lang.DataGrid_Reaction_EndPage
                    }}</span>
                    <div class="inputnumber">
                        {{ lang.DataGrid_Reaction_The }}
                        <input type="text" v-model="nowpage" />
                        {{ lang.DataGrid_Reaction_Page }}
                    </div>

                    <span class="btn" @click="jump">{{
                        lang.DataGrid_Reaction_TurnPage
                    }}</span>
                </div>
            </div>
        </div>
        <div class="tip" ref="kongtiao2" v-show="tipchange">
            <div
                class="tiphead"
                style="position:absolute;width: 380px;height: 40px;"
            ></div>
            <div class="tiptop">
                <img :src="gth" alt />
                <span>{{ lang.HT_MessageBoxCaption_Tips }}</span>
            </div>
            <div class="tipcontanin">
                <div class="tipword">{{ tipword }}</div>
            </div>
            <div class="tipdetermine" @click="tip1" v-if="deltrue">
                {{ lang.MessageBox_Confrim }}
            </div>
            <div class="delclass" v-if="!deltrue">
                <div class="one" @click="no1">{{ lang.MessageBox_NO }}</div>
                <div class="two" @click="yes1">{{ lang.MessageBox_YES }}</div>
            </div>
        </div>
        <div class="cover3" v-if="cancel1"></div>
        <div class="cover2" v-if="tipchange"></div>

        <div
            v-show="addPopShow"
            class="addPop"
            ref="kongtiao5"
            :style="{ width: 1400 * zoom + 'px', height: 750 * zoom + 'px' }"
        >
            <div class="looktop"></div>
            <span
                @click.stop="addPopOff"
                class="i-c el-icon-close"
                :class="{ a: $store.state.color == 'grey' }"
            ></span>
            <div
                class="head"
                :class="{ colordiv: $store.state.color == 'grey' }"
            >
                <span
                    class="text"
                    v-if="sestion == 3"
                    :class="{ fcolor: $store.state.color == 'grey' }"
                    >{{ lang.PointInspectionManage_AddPatrolStandard }}</span
                >
                <span
                    class="text"
                    v-if="sestion == 1"
                    :class="{ fcolor: $store.state.color == 'grey' }"
                    >{{ lang.PointInspectionManage_ViewPatrolStandard }}</span
                >
                <span
                    class="text"
                    v-if="sestion == 2"
                    :class="{ fcolor: $store.state.color == 'grey' }"
                    >{{ lang.PointInspectionManage_EditPatrolStandard }}</span
                >
            </div>
            <div class="addPop_name">
                <div class="addPop_name1">
                    <span class="addPop_name1Text">{{
                        lang.PointInspectionManage_StandardName
                    }}</span>
                    <input
                        v-model="name1Text"
                        class="addPop_name1Ipt"
                        type="text"
                        v-if="sestion == 3"
                    />
                    <input
                        v-model="sesstion.Name"
                        class="addPop_name1Ipt"
                        type="text"
                        v-if="sestion == 2"
                    />
                    <input
                        v-model="sesstion.Name"
                        class="addPop_name1Ipt"
                        type="text"
                        v-if="sestion == 1"
                        disabled
                    />
                </div>
                <div class="addPop_name2">
                    <span class="addPop_name2Text">{{
                        lang.PointInspectionManage_PatrolInspectionRequirements
                    }}</span>
                    <input
                        v-model="name2Text"
                        class="addPop_name2Ipt"
                        type="text"
                        v-if="sestion == 3"
                    />
                    <input
                        v-model="sesstion.Requirement"
                        class="addPop_name2Ipt"
                        type="text"
                        v-if="sestion == 2"
                    />
                    <input
                        v-model="sesstion.Requirement"
                        class="addPop_name2Ipt"
                        type="text"
                        v-if="sestion == 1"
                        disabled
                    />
                </div>
            </div>
            <div
                class="addPop_equipment"
                v-if="addPopShow"
                :style="{ height: 200 * zoom + 'px' }"
            >
                <div class="addPop_equipmentBtn">
                    <span class="equipmentBtn_text">{{
                        lang.PointInspectionManage_AssociatedEquipment
                    }}</span>
                    <div
                        @click="addequipmentPopFun"
                        class="equipmentBtn_add"
                        v-if="sestion !== 1"
                    >
                        {{ lang.RoleManage_Add }}
                    </div>
                    <div
                        @click="inspectionDeleteFun"
                        class="equipmentBtn_delete"
                        v-if="sestion !== 1"
                    >
                        {{ lang.RoleManage_Delete }}
                    </div>
                </div>
                <div
                    class="addPop_equipmentList"
                    :style="{ height: 150 * zoom + 'px' }"
                >
                    <div
                        class="middle_title"
                        :style="{
                            height: 40 * zoom + 'px',
                            lineHeight: 40 * zoom + 'px',
                            fontSize: 16 * zoom + 'px'
                        }"
                    >
                        <div
                            class="ipt"
                            :style="{
                                height: 40 * zoom + 'px',
                                lineHeight: 40 * zoom + 'px',
                                fontSize: 16 * zoom + 'px'
                            }"
                        >
                            <input
                                @click="checkAllFun1"
                                ref="checkiptAll1"
                                type="checkbox"
                            />
                        </div>
                        <div
                            class="num"
                            :style="{
                                height: 40 * zoom + 'px',
                                lineHeight: 40 * zoom + 'px',
                                fontSize: 16 * zoom + 'px'
                            }"
                        >
                            {{ lang.RoleManage_NO }}
                        </div>
                        <div
                            class="name"
                            :style="{
                                height: 40 * zoom + 'px',
                                lineHeight: 40 * zoom + 'px',
                                fontSize: 16 * zoom + 'px'
                            }"
                        >
                            {{ lang.EquipmentAccount_EquipmentName }}
                        </div>
                        <div
                            class="id"
                            :style="{
                                height: 40 * zoom + 'px',
                                lineHeight: 40 * zoom + 'px',
                                fontSize: 16 * zoom + 'px'
                            }"
                        >
                            {{ lang.EquipmentAccount_EquipmentNumber }}
                        </div>
                        <div
                            class="type"
                            :style="{
                                height: 40 * zoom + 'px',
                                lineHeight: 40 * zoom + 'px',
                                fontSize: 16 * zoom + 'px'
                            }"
                        >
                            {{ lang.EquipmentAccount_EquipmentType }}
                        </div>
                        <div
                            class="typeNum"
                            :style="{
                                height: 40 * zoom + 'px',
                                lineHeight: 40 * zoom + 'px',
                                fontSize: 16 * zoom + 'px'
                            }"
                        >
                            {{ lang.EquipmentAccount_EquipmentModel }}
                        </div>
                        <div
                            class="action"
                            :style="{
                                height: 40 * zoom + 'px',
                                lineHeight: 40 * zoom + 'px',
                                fontSize: 16 * zoom + 'px'
                            }"
                        >
                            操作
                        </div>
                    </div>
                    <div v-if="sestion == 3">
                        <div v-for="(i, ind) in checkArr" :key="ind">
                            <div
                                class="middle_conter"
                                :style="{
                                    height: 40 * zoom + 'px',
                                    lineHeight: 40 * zoom + 'px',
                                    fontSize: 16 * zoom + 'px'
                                }"
                            >
                                <div
                                    class="ipt"
                                    :style="{
                                        height: 40 * zoom + 'px',
                                        lineHeight: 40 * zoom + 'px',
                                        fontSize: 16 * zoom + 'px'
                                    }"
                                >
                                    <input
                                        @click="checkFun1(i, ind)"
                                        ref="checkipt1"
                                        type="checkbox"
                                    />
                                </div>
                                <div
                                    class="num"
                                    :style="{
                                        height: 40 * zoom + 'px',
                                        lineHeight: 40 * zoom + 'px',
                                        fontSize: 16 * zoom + 'px'
                                    }"
                                >
                                    {{ ind + 1 }}
                                </div>
                                <div
                                    class="name"
                                    :style="{
                                        height: 40 * zoom + 'px',
                                        lineHeight: 40 * zoom + 'px',
                                        fontSize: 16 * zoom + 'px'
                                    }"
                                >
                                    {{ i.DeviceName }}
                                </div>
                                <div
                                    class="id"
                                    :style="{
                                        height: 40 * zoom + 'px',
                                        lineHeight: 40 * zoom + 'px',
                                        fontSize: 16 * zoom + 'px'
                                    }"
                                >
                                    {{ i.DeviceNo }}
                                </div>
                                <div
                                    class="type"
                                    :style="{
                                        height: 40 * zoom + 'px',
                                        lineHeight: 40 * zoom + 'px',
                                        fontSize: 16 * zoom + 'px'
                                    }"
                                >
                                    <el-tooltip
                                        class="item"
                                        effect="dark"
                                        :content="i.DetailDeviceType"
                                        placement="top-start"
                                    >
                                        <span>{{ i.DetailDeviceType }}</span>
                                    </el-tooltip>
                                </div>
                                <div
                                    class="typeNum"
                                    :style="{
                                        height: 40 * zoom + 'px',
                                        lineHeight: 40 * zoom + 'px',
                                        fontSize: 16 * zoom + 'px'
                                    }"
                                >
                                    {{ i.DeviceModel }}
                                </div>
                                <div
                                    class="action"
                                    :style="{
                                        height: 40 * zoom + 'px',
                                        lineHeight: 40 * zoom + 'px',
                                        fontSize: 16 * zoom + 'px'
                                    }"
                                >
                                    <div
                                        class="checkSopBtn"
                                        @click="openSopListPop('关联设备', i)"
                                    >
                                        上传文件
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-if="sestion == 1">
                        <div v-for="(i, ind) in checkArr" :key="ind">
                            <div
                                class="middle_conter"
                                :style="{
                                    height: 40 * zoom + 'px',
                                    lineHeight: 40 * zoom + 'px',
                                    fontSize: 16 * zoom + 'px'
                                }"
                            >
                                <div
                                    class="ipt"
                                    :style="{
                                        height: 40 * zoom + 'px',
                                        lineHeight: 40 * zoom + 'px',
                                        fontSize: 16 * zoom + 'px'
                                    }"
                                >
                                    <input
                                        @click="checkFun1(i, ind)"
                                        ref="checkipt1"
                                        type="checkbox"
                                    />
                                </div>
                                <div
                                    class="num"
                                    :style="{
                                        height: 40 * zoom + 'px',
                                        lineHeight: 40 * zoom + 'px',
                                        fontSize: 16 * zoom + 'px'
                                    }"
                                >
                                    {{ ind + 1 }}
                                </div>
                                <div
                                    class="name"
                                    :style="{
                                        height: 40 * zoom + 'px',
                                        lineHeight: 40 * zoom + 'px',
                                        fontSize: 16 * zoom + 'px'
                                    }"
                                >
                                    {{ i.DeviceName }}
                                </div>
                                <div
                                    class="id"
                                    :style="{
                                        height: 40 * zoom + 'px',
                                        lineHeight: 40 * zoom + 'px',
                                        fontSize: 16 * zoom + 'px'
                                    }"
                                >
                                    {{ i.DeviceNo }}
                                </div>
                                <div
                                    class="type"
                                    :style="{
                                        height: 40 * zoom + 'px',
                                        lineHeight: 40 * zoom + 'px',
                                        fontSize: 16 * zoom + 'px'
                                    }"
                                >
                                    <el-tooltip
                                        class="item"
                                        effect="dark"
                                        :content="i.DetailDeviceType"
                                        placement="top-start"
                                    >
                                        <span>{{ i.DetailDeviceType }}</span>
                                    </el-tooltip>
                                </div>
                                <div
                                    class="typeNum"
                                    :style="{
                                        height: 40 * zoom + 'px',
                                        lineHeight: 40 * zoom + 'px',
                                        fontSize: 16 * zoom + 'px'
                                    }"
                                >
                                    {{ i.DeviceModel }}
                                </div>
                                <div
                                    class="action"
                                    :style="{
                                        height: 40 * zoom + 'px',
                                        lineHeight: 40 * zoom + 'px',
                                        fontSize: 16 * zoom + 'px'
                                    }"
                                >
                                    <div
                                        class="checkSopBtn"
                                        @click="openSopListPop('关联设备', i)"
                                    >
                                        上传文件
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-if="sestion == 2">
                        <div v-for="(i, ind) in checkArr" :key="ind">
                            <div
                                class="middle_conter"
                                :style="{
                                    height: 40 * zoom + 'px',
                                    lineHeight: 40 * zoom + 'px',
                                    fontSize: 16 * zoom + 'px'
                                }"
                            >
                                <div
                                    class="ipt"
                                    :style="{
                                        height: 40 * zoom + 'px',
                                        lineHeight: 40 * zoom + 'px',
                                        fontSize: 16 * zoom + 'px'
                                    }"
                                >
                                    <input
                                        @click="checkFun1(i, ind)"
                                        ref="checkipt1"
                                        type="checkbox"
                                    />
                                </div>
                                <div
                                    class="num"
                                    :style="{
                                        height: 40 * zoom + 'px',
                                        lineHeight: 40 * zoom + 'px',
                                        fontSize: 16 * zoom + 'px'
                                    }"
                                >
                                    {{ ind + 1 }}
                                </div>
                                <div
                                    class="name"
                                    :style="{
                                        height: 40 * zoom + 'px',
                                        lineHeight: 40 * zoom + 'px',
                                        fontSize: 16 * zoom + 'px'
                                    }"
                                >
                                    {{ i.DeviceName }}
                                </div>
                                <div
                                    class="id"
                                    :style="{
                                        height: 40 * zoom + 'px',
                                        lineHeight: 40 * zoom + 'px',
                                        fontSize: 16 * zoom + 'px'
                                    }"
                                >
                                    {{ i.DeviceNo }}
                                </div>
                                <div
                                    class="type"
                                    :style="{
                                        height: 40 * zoom + 'px',
                                        lineHeight: 40 * zoom + 'px',
                                        fontSize: 16 * zoom + 'px'
                                    }"
                                >
                                    <el-tooltip
                                        class="item"
                                        effect="dark"
                                        :content="i.DetailDeviceType"
                                        placement="top-start"
                                    >
                                        <span>{{ i.DetailDeviceType }}</span>
                                    </el-tooltip>
                                </div>
                                <div
                                    class="typeNum"
                                    :style="{
                                        height: 40 * zoom + 'px',
                                        lineHeight: 40 * zoom + 'px',
                                        fontSize: 16 * zoom + 'px'
                                    }"
                                >
                                    {{ i.DeviceModel }}
                                </div>
                                <div
                                    class="action"
                                    :style="{
                                        height: 40 * zoom + 'px',
                                        lineHeight: 40 * zoom + 'px',
                                        fontSize: 16 * zoom + 'px'
                                    }"
                                >
                                    <div
                                        class="checkSopBtn"
                                        @click="openSopListPop('关联设备', i)"
                                    >
                                        上传文件
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div
                class="addPop_spotcheck"
                v-if="addPopShow"
                :style="{ height: 240 * zoom + 'px' }"
            >
                <div class="addPop_spotcheckBtn">
                    <span class="spotcheckBtn_text">{{
                        lang.PointInspectionManage_PointInspectionItems
                    }}</span>
                    <div
                        @click="spotcheckBtnFun"
                        class="spotcheckBtn_add"
                        v-if="sestion !== 1"
                    >
                        添加
                    </div>
                    <div
                        @click="inspectionDeleteFun1"
                        class="spotcheckBtn_delete"
                        v-if="sestion !== 1"
                    >
                        {{ lang.RoleManage_Delete }}
                    </div>
                </div>
                <div
                    class="addPop_spotcheckList"
                    :style="{ height: 200 * zoom + 'px' }"
                >
                    <div
                        class="middle_title"
                        :style="{
                            height: 40 * zoom + 'px',
                            lineHeight: 40 * zoom + 'px',
                            fontSize: 16 * zoom + 'px'
                        }"
                    >
                        <div
                            class="ipt"
                            :style="{
                                height: 40 * zoom + 'px',
                                lineHeight: 40 * zoom + 'px',
                                fontSize: 16 * zoom + 'px'
                            }"
                        >
                            <input
                                @click="checkIptAll2"
                                ref="checkiptAll22"
                                type="checkbox"
                            />
                        </div>
                        <div
                            class="id"
                            :style="{
                                height: 40 * zoom + 'px',
                                lineHeight: 40 * zoom + 'px',
                                fontSize: 16 * zoom + 'px'
                            }"
                        >
                            {{ lang.RoleManage_NO }}
                        </div>
                        <div
                            class="name"
                            :style="{
                                height: 40 * zoom + 'px',
                                lineHeight: 40 * zoom + 'px',
                                fontSize: 16 * zoom + 'px'
                            }"
                        >
                            {{ lang.PointInspectionManage_ItemName }}
                        </div>
                        <div
                            class="type"
                            :style="{
                                height: 40 * zoom + 'px',
                                lineHeight: 40 * zoom + 'px',
                                fontSize: 16 * zoom + 'px'
                            }"
                        >
                            {{
                                lang.NewTrendChart_SeriesGroupsSetting_DataGrid_Type
                            }}
                        </div>
                        <div
                            class="topNum"
                            :style="{
                                height: 40 * zoom + 'px',
                                lineHeight: 40 * zoom + 'px',
                                fontSize: 16 * zoom + 'px'
                            }"
                        >
                            {{ lang.PointInspectionManage_Upper }}
                        </div>
                        <div
                            class="bottomNum"
                            :style="{
                                height: 40 * zoom + 'px',
                                lineHeight: 40 * zoom + 'px',
                                fontSize: 16 * zoom + 'px'
                            }"
                        >
                            {{ lang.PointInspectionManage_Lower }}
                        </div>
                        <div
                            class="zhi"
                            :style="{
                                height: 40 * zoom + 'px',
                                lineHeight: 40 * zoom + 'px',
                                fontSize: 16 * zoom + 'px'
                            }"
                        >
                            {{ lang.PointInspectionManage_ReferenceValue }}
                        </div>
                        <div
                            class="option"
                            :style="{
                                height: 40 * zoom + 'px',
                                lineHeight: 40 * zoom + 'px',
                                fontSize: 16 * zoom + 'px'
                            }"
                        >
                            {{ lang.PointInspectionManage_CorrectOption }}
                        </div>
                        <div
                            class="Explain"
                            :style="{
                                height: 40 * zoom + 'px',
                                lineHeight: 40 * zoom + 'px',
                                fontSize: 16 * zoom + 'px'
                            }"
                        >
                            {{ lang.PointInspectionManage_Explain }}
                        </div>
                        <div
                            class="action"
                            :style="{
                                height: 40 * zoom + 'px',
                                lineHeight: 40 * zoom + 'px',
                                fontSize: 16 * zoom + 'px'
                            }"
                        >
                            操作
                        </div>
                        <div
                            class="action2"
                            :style="{
                                height: 40 * zoom + 'px',
                                lineHeight: 40 * zoom + 'px',
                                fontSize: 16 * zoom + 'px',
                                width: sestion == 1 ? '16.9%' : '8.3%'
                            }"
                        >
                            文件名
                        </div>
                        <div
                            v-if="sestion != 1"
                            class="action3"
                            :style="{
                                height: 40 * zoom + 'px',
                                lineHeight: 40 * zoom + 'px',
                                fontSize: 16 * zoom + 'px'
                            }"
                        >
                            操作
                        </div>
                    </div>
                    <div v-if="sestion == 3">
                        <div v-for="(item, index) in SpotcheckArr" :key="index">
                            <div
                                class="middle_conter"
                                :style="{
                                    height: 40 * zoom + 'px',
                                    lineHeight: 40 * zoom + 'px',
                                    fontSize: 16 * zoom + 'px'
                                }"
                            >
                                <div
                                    class="ipt"
                                    :style="{
                                        height: 40 * zoom + 'px',
                                        lineHeight: 40 * zoom + 'px',
                                        fontSize: 16 * zoom + 'px'
                                    }"
                                >
                                    <input
                                        @click="checkIpt2(item, index)"
                                        ref="checkipt22"
                                        type="checkbox"
                                    />
                                </div>
                                <div
                                    class="id"
                                    :style="{
                                        height: 40 * zoom + 'px',
                                        lineHeight: 40 * zoom + 'px',
                                        fontSize: 16 * zoom + 'px'
                                    }"
                                >
                                    {{ index + 1 }}
                                </div>
                                <div class="name">
                                    <input v-model="item.name" type="text" />
                                </div>
                                <div
                                    class="type"
                                    :style="{
                                        height: 40 * zoom + 'px',
                                        lineHeight: 40 * zoom + 'px',
                                        fontSize: 16 * zoom + 'px'
                                    }"
                                >
                                    <el-select
                                        @change="ProjectTypeFun(item, 3)"
                                        v-model="item.value"
                                        :placeholder="
                                            lang.SCMSConsoleWebApiMySql_PleChoose
                                        "
                                        :style="{
                                            height: 32 * zoom + 'px',
                                            lineHeight: 32 * zoom + 'px',
                                            fontSize: 16 * zoom + 'px'
                                        }"
                                    >
                                        <el-option
                                            v-for="item in item.type"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value"
                                        ></el-option>
                                    </el-select>
                                </div>
                                <div
                                    class="topNum"
                                    :style="{
                                        height: 40 * zoom + 'px',
                                        lineHeight: 40 * zoom + 'px',
                                        fontSize: 16 * zoom + 'px'
                                    }"
                                >
                                    <input
                                        style="padding-left:10px"
                                        v-model="item.topNum"
                                        type="text"
                                    />
                                </div>
                                <div
                                    class="bottomNum"
                                    :style="{
                                        height: 40 * zoom + 'px',
                                        lineHeight: 40 * zoom + 'px',
                                        fontSize: 16 * zoom + 'px'
                                    }"
                                >
                                    <input
                                        style="padding-left:10px"
                                        v-model="item.bottomNum"
                                        type="text"
                                    />
                                </div>
                                <div
                                    class="zhi"
                                    :style="{
                                        height: 40 * zoom + 'px',
                                        lineHeight: 40 * zoom + 'px',
                                        fontSize: 16 * zoom + 'px'
                                    }"
                                >
                                    <input
                                        style="padding-left:10px"
                                        v-model="item.zhi"
                                        type="text"
                                    />
                                </div>
                                <div
                                    class="option"
                                    :style="{
                                        height: 40 * zoom + 'px',
                                        lineHeight: 40 * zoom + 'px',
                                        fontSize: 16 * zoom + 'px'
                                    }"
                                >
                                    <input
                                        style="padding-left:10px"
                                        v-model="item.option"
                                        type="text"
                                    />
                                </div>
                                <div
                                    class="Explain"
                                    :style="{
                                        height: 40 * zoom + 'px',
                                        lineHeight: 40 * zoom + 'px',
                                        fontSize: 16 * zoom + 'px'
                                    }"
                                >
                                    <input v-model="item.Explain" type="text" />
                                </div>
                                <div
                                    class="action"
                                    :style="{
                                        height: 40 * zoom + 'px',
                                        lineHeight: 40 * zoom + 'px',
                                        fontSize: 16 * zoom + 'px'
                                    }"
                                >
                                    <el-upload
                                        action="#"
                                        accept=".png,.jpg,.jpeg,.pdf"
                                        :show-file-list="false"
                                        :http-request="
                                            file => uploadFn(item, file)
                                        "
                                    >
                                        <div class="checkSopBtn">
                                            上传文件
                                        </div>
                                    </el-upload>
                                </div>

                                <div
                                    class="action2"
                                    :style="{
                                        height: 40 * zoom + 'px',
                                        lineHeight: 40 * zoom + 'px',
                                        fontSize: 16 * zoom + 'px'
                                    }"
                                    @click="openViewSop(item)"
                                >
                                    <span
                                        v-if="
                                            !item.FileName ||
                                                item.FileName.endsWith('pdf') ||
                                                item.FileName.endsWith('PDF')
                                        "
                                        :style="{
                                            color: '#4270e4'
                                        }"
                                        >{{ item.FileName }}</span
                                    >
                                    <img
                                        v-else
                                        class="table-img"
                                        :src="imgSrc(item.PID)"
                                    />
                                </div>
                                <div
                                    class="action3"
                                    :style="{
                                        height: 40 * zoom + 'px',
                                        lineHeight: 40 * zoom + 'px',
                                        fontSize: 16 * zoom + 'px'
                                    }"
                                >
                                    <div class="checkSopBtn">
                                        删除文件1
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-if="sestion == 2">
                        <div v-for="(item, index) in SpotcheckArr" :key="index">
                            <div
                                class="middle_conter"
                                :style="{
                                    height: 40 * zoom + 'px',
                                    lineHeight: 40 * zoom + 'px',
                                    fontSize: 16 * zoom + 'px'
                                }"
                            >
                                <div
                                    class="ipt"
                                    :style="{
                                        height: 40 * zoom + 'px',
                                        lineHeight: 40 * zoom + 'px',
                                        fontSize: 16 * zoom + 'px'
                                    }"
                                >
                                    <input
                                        @click="checkIpt2(item, index)"
                                        ref="checkipt22"
                                        type="checkbox"
                                    />
                                </div>
                                <div
                                    class="id"
                                    :style="{
                                        height: 40 * zoom + 'px',
                                        lineHeight: 40 * zoom + 'px',
                                        fontSize: 16 * zoom + 'px'
                                    }"
                                >
                                    {{ index + 1 }}
                                </div>
                                <div
                                    class="name"
                                    :style="{
                                        height: 40 * zoom + 'px',
                                        lineHeight: 40 * zoom + 'px',
                                        fontSize: 16 * zoom + 'px'
                                    }"
                                >
                                    <input
                                        v-model="item.ProjectName"
                                        type="text"
                                    />
                                </div>
                                <div
                                    class="type"
                                    :style="{
                                        height: 40 * zoom + 'px',
                                        lineHeight: 40 * zoom + 'px',
                                        fontSize: 16 * zoom + 'px'
                                    }"
                                >
                                    <el-select
                                        @change="ProjectTypeFun(item, 2)"
                                        v-model="item.Type"
                                        :placeholder="
                                            lang.SCMSConsoleWebApiMySql_PleChoose
                                        "
                                        :style="{
                                            height: 32 * zoom + 'px',
                                            lineHeight: 32 * zoom + 'px',
                                            fontSize: 16 * zoom + 'px'
                                        }"
                                    >
                                        <el-option
                                            v-for="item in type1"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value"
                                        ></el-option>
                                    </el-select>
                                </div>
                                <div
                                    class="topNum"
                                    :style="{
                                        height: 40 * zoom + 'px',
                                        lineHeight: 40 * zoom + 'px',
                                        fontSize: 16 * zoom + 'px'
                                    }"
                                >
                                    <input v-model="item.Upper" type="text" />
                                </div>
                                <div
                                    class="bottomNum"
                                    :style="{
                                        height: 40 * zoom + 'px',
                                        lineHeight: 40 * zoom + 'px',
                                        fontSize: 16 * zoom + 'px'
                                    }"
                                >
                                    <input v-model="item.Lower" type="text" />
                                </div>
                                <div
                                    class="zhi"
                                    :style="{
                                        height: 40 * zoom + 'px',
                                        lineHeight: 40 * zoom + 'px',
                                        fontSize: 16 * zoom + 'px'
                                    }"
                                >
                                    <input
                                        v-model="item.Reference"
                                        type="text"
                                    />
                                </div>
                                <div
                                    class="option"
                                    :style="{
                                        height: 40 * zoom + 'px',
                                        lineHeight: 40 * zoom + 'px',
                                        fontSize: 16 * zoom + 'px'
                                    }"
                                >
                                    <input v-model="item.Right" type="text" />
                                </div>
                                <div
                                    class="Explain"
                                    :style="{
                                        height: 40 * zoom + 'px',
                                        lineHeight: 40 * zoom + 'px',
                                        fontSize: 16 * zoom + 'px'
                                    }"
                                >
                                    <input v-model="item.Remarks" type="text" />
                                </div>
                                <div
                                    class="action"
                                    :style="{
                                        height: 40 * zoom + 'px',
                                        lineHeight: 40 * zoom + 'px',
                                        fontSize: 16 * zoom + 'px'
                                    }"
                                >
                                    <el-upload
                                        action="#"
                                        accept=".png,.jpg,.jpeg,.pdf"
                                        :show-file-list="false"
                                        :http-request="
                                            file => uploadFn(item, file)
                                        "
                                    >
                                        <div class="checkSopBtn">
                                            上传文件
                                        </div>
                                    </el-upload>
                                </div>
                                <div
                                    class="action2"
                                    :style="{
                                        height: 40 * zoom + 'px',
                                        lineHeight: 40 * zoom + 'px',
                                        fontSize: 16 * zoom + 'px'
                                    }"
                                    @click="openViewSop(item)"
                                >
                                    <span
                                        v-if="
                                            !item.FileName ||
                                                item.FileName.endsWith('pdf') ||
                                                item.FileName.endsWith('PDF')
                                        "
                                        :style="{
                                            color: '#4270e4'
                                        }"
                                        >{{ item.FileName }}</span
                                    >
                                    <img
                                        v-else
                                        class="table-img"
                                        :src="imgSrc(item.PID)"
                                    />
                                </div>
                                <div
                                    class="action3"
                                    :style="{
                                        height: 40 * zoom + 'px',
                                        lineHeight: 40 * zoom + 'px',
                                        fontSize: 16 * zoom + 'px'
                                    }"
                                >
                                    <div
                                        class="checkSopBtn"
                                        @click="delFileFn(item)"
                                    >
                                        删除文件
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-if="sestion == 1">
                        <div v-for="(item, index) in SpotcheckArr" :key="index">
                            <div
                                class="middle_conter"
                                :style="{
                                    height: 40 * zoom + 'px',
                                    lineHeight: 40 * zoom + 'px',
                                    fontSize: 16 * zoom + 'px'
                                }"
                            >
                                <div
                                    class="ipt"
                                    :style="{
                                        height: 40 * zoom + 'px',
                                        lineHeight: 40 * zoom + 'px',
                                        fontSize: 16 * zoom + 'px'
                                    }"
                                >
                                    <input
                                        @click="checkIpt2(item, index)"
                                        ref="checkipt22"
                                        type="checkbox"
                                    />
                                </div>
                                <div
                                    class="id"
                                    :style="{
                                        height: 40 * zoom + 'px',
                                        lineHeight: 40 * zoom + 'px',
                                        fontSize: 16 * zoom + 'px'
                                    }"
                                >
                                    {{ index + 1 }}
                                </div>
                                <div
                                    class="name"
                                    :style="{
                                        height: 40 * zoom + 'px',
                                        lineHeight: 40 * zoom + 'px',
                                        fontSize: 16 * zoom + 'px'
                                    }"
                                >
                                    <input
                                        v-model="item.ProjectName"
                                        type="text"
                                        disabled
                                    />
                                </div>
                                <div
                                    class="type"
                                    :style="{
                                        height: 40 * zoom + 'px',
                                        lineHeight: 40 * zoom + 'px',
                                        fontSize: 16 * zoom + 'px'
                                    }"
                                >
                                    <el-select
                                        @change="ProjectTypeFun(item, 1)"
                                        v-model="item.Type"
                                        :placeholder="
                                            lang.SCMSConsoleWebApiMySql_PleChoose
                                        "
                                        disabled
                                        :style="{
                                            height: 32 * zoom + 'px',
                                            lineHeight: 32 * zoom + 'px',
                                            fontSize: 16 * zoom + 'px'
                                        }"
                                    >
                                        <el-option
                                            v-for="item in item.type"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value"
                                        ></el-option>
                                    </el-select>
                                </div>
                                <div
                                    class="topNum"
                                    :style="{
                                        height: 40 * zoom + 'px',
                                        lineHeight: 40 * zoom + 'px',
                                        fontSize: 16 * zoom + 'px'
                                    }"
                                >
                                    <input
                                        v-model="item.Upper"
                                        type="text"
                                        disabled
                                    />
                                </div>
                                <div
                                    class="bottomNum"
                                    :style="{
                                        height: 40 * zoom + 'px',
                                        lineHeight: 40 * zoom + 'px',
                                        fontSize: 16 * zoom + 'px'
                                    }"
                                >
                                    <input
                                        v-model="item.Lower"
                                        type="text"
                                        disabled
                                    />
                                </div>
                                <div
                                    class="zhi"
                                    :style="{
                                        height: 40 * zoom + 'px',
                                        lineHeight: 40 * zoom + 'px',
                                        fontSize: 16 * zoom + 'px'
                                    }"
                                >
                                    <input
                                        v-model="item.Reference"
                                        type="text"
                                        disabled
                                    />
                                </div>
                                <div
                                    class="option"
                                    :style="{
                                        height: 40 * zoom + 'px',
                                        lineHeight: 40 * zoom + 'px',
                                        fontSize: 16 * zoom + 'px'
                                    }"
                                >
                                    <input
                                        v-model="item.Right"
                                        type="text"
                                        disabled
                                    />
                                </div>
                                <div
                                    class="Explain"
                                    :style="{
                                        height: 40 * zoom + 'px',
                                        lineHeight: 40 * zoom + 'px',
                                        fontSize: 16 * zoom + 'px'
                                    }"
                                >
                                    <input
                                        v-model="item.Remarks"
                                        type="text"
                                        disabled
                                    />
                                </div>
                                <div
                                    class="action"
                                    :style="{
                                        height: 40 * zoom + 'px',
                                        lineHeight: 40 * zoom + 'px',
                                        fontSize: 16 * zoom + 'px'
                                    }"
                                >
                                    <div class="checkSopBtn">
                                        上传文件
                                    </div>
                                </div>
                                <div
                                    class="action2"
                                    :style="{
                                        height: 40 * zoom + 'px',
                                        lineHeight: 40 * zoom + 'px',
                                        fontSize: 16 * zoom + 'px',
                                        width: '16.9%'
                                    }"
                                    @click="openViewSop(item)"
                                >
                                    <span
                                        v-if="
                                            !item.FileName ||
                                                item.FileName.endsWith('pdf') ||
                                                item.FileName.endsWith('PDF')
                                        "
                                        :style="{
                                            color: '#4270e4'
                                        }"
                                        >{{ item.FileName }}</span
                                    >
                                    <img
                                        v-else
                                        class="table-img"
                                        :src="imgSrc(item.PID)"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="addPop_fool">
                <div
                    @click="InspectionQureyFun"
                    class="fool_qurey"
                    v-if="sestion !== 1"
                >
                    {{ lang.PopupCommon_Sure }}
                </div>
                <div
                    @click="InspectionDeleteFun"
                    class="fool_delete"
                    v-if="sestion !== 1"
                >
                    {{ lang.PopupCommon_Cancel }}
                </div>
            </div>
        </div>

        <div
            v-show="equipmentShow"
            class="addEquipment"
            ref="kongtiao6"
            @click="treetrue = false"
        >
            <div class="looktop1"></div>
            <span
                @click="addEquipmentOffFun"
                class="i-c el-icon-close"
                :class="{ a: $store.state.color == 'grey' }"
            ></span>
            <div
                class="head"
                :class="{ colordiv: $store.state.color == 'grey' }"
            >
                <span
                    class="text"
                    :class="{ fcolor: $store.state.color == 'grey' }"
                    >{{ lang.FileManage_AddAssociatedEquipment }}</span
                >
            </div>
            <div class="conter" v-if="equipmentShow">
                <div class="conter_title">
                    <span class="name_text">{{
                        lang.EquipmentAccount_EquipmentType
                    }}</span>
                    <div class="seleword2" @click.stop="treechange">
                        <div class="seleword1">
                            {{ Meter3 }}
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
                            <span
                                class="custom-tree-node"
                                slot-scope="{ node, data }"
                            >
                                <span class="custom-tree-item">
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
                        class="conter_ipt tinput1"
                        v-model="keyWord1"
                        type="text"
                        :placeholder="lang.AlarmRecord_Time_Keyword"
                    />
                    <div @click="addQueryBtnFun" class="conter_btn">
                        {{ lang.AlarmRecord_Time_Select }}
                    </div>
                </div>
                <div class="conter_middle">
                    <div class="middle_title">
                        <div class="ipt">
                            <input
                                @click="checkAllFun"
                                ref="checkiptAll"
                                type="checkbox"
                            />
                        </div>
                        <div class="name">
                            {{ lang.EquipmentAccount_EquipmentName }}
                        </div>
                        <div class="id">
                            {{ lang.EquipmentAccount_EquipmentNumber }}
                        </div>
                        <div class="type">
                            {{ lang.EquipmentAccount_EquipmentType }}
                        </div>
                        <div class="typeNum">
                            {{ lang.EquipmentAccount_EquipmentModel }}
                        </div>
                    </div>

                    <div>
                        <div
                            class="middle_conter"
                            v-for="(it, ind) in EquipmentTypeAll"
                            :key="ind"
                        >
                            <div class="ipt">
                                <input
                                    @click="checkFun(it, ind)"
                                    ref="checkipt"
                                    type="checkbox"
                                />
                            </div>
                            <div class="name">{{ it.DeviceName }}</div>
                            <div class="id">{{ it.DeviceNo }}</div>
                            <div class="type">{{ it.DetailDeviceType }}</div>
                            <div class="typeNum">{{ it.DeviceModel }}</div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="fool">
                <div @click="foolQueryFun" class="fool_quer">
                    {{ lang.PopupCommon_Sure }}
                </div>
                <div @click="foolCancel" class="fool_cancel">
                    {{ lang.PopupCommon_Cancel }}
                </div>
            </div>
        </div>

        <div v-if="tipsShow" class="TipsPop">
            <div class="head">{{ lang.HT_MessageBoxCaption_Tips }}</div>
            <div class="conter">
                <span>{{ TipsText }}</span>
            </div>
            <div class="fool">
                <div @click="querBtnFun" class="queryBtn">
                    {{ lang.PopupCommon_Sure }}
                </div>
            </div>
        </div>
        <div class="cover6" v-if="addPopShow"></div>
        <div
            class="cover7"
            v-if="equipmentShow"
            @click="treetrue = false"
        ></div>
        <SopListPop
            v-if="SopListPopShow"
            title="查看附件"
            :hiddenBtn="sestion == 1"
            :SopListPopType="SopListPopType"
            :SopListPopItem="SopListPopItem"
            @callback="sopListPopCallback"
        ></SopListPop>
        <tip-pop
            v-if="isTipShow"
            :tipText="tipText"
            :noCancel="noCancel"
            @tipCallBack="tipCallBack"
        ></tip-pop>
        <ViewSop
            v-if="sopShow"
            :defaultSrc="defaultSrc"
            title="查看文件"
            :sopData="sopData"
            @callback="viewSopCallback"
        />
    </div>
</template>

<script>
// import MyPage from '../public/Pages.vue';
import SopListPop from './SopListPop.vue';
import TipPop from '../public/tipPop.vue';
import ViewSop from '../Vulnerableparts/ViewSop.vue';

export default {
    components: {
        TipPop,
        SopListPop,
        ViewSop
    },
    data() {
        return {
            isTipShow: false,
            tipText: '',
            noCancel: true,
            lang: JSON.parse(localStorage.getItem('languages'))[
                localStorage.getItem('currentLang')
            ],
            SopListPopType: '',
            SopListPopItem: null,
            SopListPopShow: false,
            value1: new Date(new Date().toLocaleDateString()),
            value2: new Date(
                new Date(new Date().toLocaleDateString()).getTime() +
                    24 * 60 * 60 * 1000 -
                    1
            ),
            xiala: require('../../assets/images/ziyuan4.png'),
            EquipmentTypeAll: [],
            Meter3: '',
            Meter3id: '',
            deltrue: true,
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
            antable: [],
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
            treetrue: false,
            pdyd1: true,
            pdyd2: true,
            pdyd3: true,
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
            sestion: 1,
            hastip: 1,
            sbnum: 1,
            time4: '',
            muchdata: '',
            a: 1,
            data6: [],
            longinnum: '',
            deldata: {},
            delarray: [],
            yesdel: '',
            oldName: '',
            ztarr: ['不限', '已关闭', '已完成', '超时完成', '已过期'],
            leixinarr: ['不限', '计划维修', '故障维修'],
            setionchange: false,
            a1: 1,
            a2: 1,
            nowIndex: 1,
            pageDate: {
                pageIndex: 1,
                pagesize: 50,
                togeIndex: 0,
                togesize: 0
            },
            //
            addPopShow: false,
            equipmentShow: false,
            deviceType: '',
            keyWord1: '',
            checkArr: [],
            checkDeleArr: [],
            checkDeleArr1: [],
            SpotcheckArr: [],
            tipsShow: false,
            type1: [
                {
                    label: '数值',
                    value: 1
                },
                {
                    label: '判断',
                    value: 2
                },
                {
                    label: '文本',
                    value: 3
                },
                {
                    label: '选项',
                    value: 4
                }
            ],
            name1Text: '', //名称
            name2Text: '',
            TipsText: '标准名称不能为空',
            cxid: '',
            cxshow: true,
            tjid: '',
            tjshow: true,
            scid: '',
            scshow: true,
            ckid: '',
            ckshow: true,
            bjid: '',
            bjshow: true,
            zoom: 1,
            sopData: [],
            sopPopTitle: '',
            sopShow: false,
            defaultSrc: ''
        };
    },

    created() {
        this.getLangData();
        this.jurisdiction = this.$store.state.btnPowerData;
        this.buttonarr = this.findPathByLeafId(
            this.GetUrlParam('id'),
            this.jurisdiction
        )[0].Children;
        console.log('sda', this.buttonarr);
        this.buttonarr.forEach(item => {
            if (item.RightName == '点巡检标准-查询按钮') {
                this.cxid = item.RightID;
            } else if (item.RightName == '点巡检标准-添加按钮') {
                this.tjid = item.RightID;
            } else if (item.RightName == '点巡检标准-删除按钮') {
                this.scid = item.RightID;
            } else if (item.RightName == '点巡检标准-查看按钮') {
                this.ckid = item.RightID;
            } else if (item.RightName == '点巡检标准-编辑按钮') {
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
            url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.ckid}`
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
        this.addPopAxios();
    },

    methods: {
        imgSrc(_id) {
            const apiHref = window.location.host.includes('localhost')
                ? '192.168.2.73:8802'
                : window.location.host;
            let str = `http://${apiHref}/api/PointInspectionManage/PointInspectionManage_GetByStandardProjectId?standardProjectId=${_id}`;
            str = str.replace(/\\/g, '\\\\');
            return str;
        },
        openViewSop(item) {
            this.defaultSrc = this.imgSrc(item.PID);
            this.sopData = [this.defaultSrc];
            this.sopShow = true;
        },
        viewSopCallback() {
            this.sopShow = false;
        },
        tipCallBack(str) {
            this.isTipShow = false;
        },
        delFileFn(item) {
            this.$axios({
                method: 'post',
                url: `/api/PointInspectionManage/PointInspectionManage_DeleteProjectFile?standardProjectId=${item.PID}`
            }).then(res => {
                if (res.data.code == 0) {
                    this.isTipShow = true;
                    this.tipText = `删除成功！`;
                    item.FileName = '';
                } else {
                    this.isTipShow = true;
                    this.tipText = res.data.msg;
                }
            });
        },
        uploadFn(item, file) {
            console.log('pppp', item, file);
            if (file.file.size / 1024 / 1024 > 10) {
                console.log(file.file.size);
                this.isTipShow = true;
                this.tipText = `文件超出10M，请重新选择`;
                return;
            }
            let userid = '';
            if (!JSON.parse(sessionStorage.getItem('userInfo1'))) {
                userid = JSON.parse(sessionStorage.getItem('sightseerInfo1'))
                    .SCMSUserAccount;
            } else {
                userid = JSON.parse(sessionStorage.getItem('userInfo1'))
                    .SCMSUserAccount;
            }
            let formData = new FormData();
            console.log('file', file);
            formData.append('file', file.file);
            this.$axios({
                method: 'post',
                url: `/api/PointInspectionManage/PointInspectionManage_AddProjectFile?standardProjectId=${item.PID}`,
                data: formData
            }).then(res => {
                if (res.data.code == 0) {
                    this.isTipShow = true;
                    this.tipText = `上传成功！`;
                    item.FileName = file.file.name;
                } else {
                    this.isTipShow = true;
                    this.tipText = res.data.msg;
                }
            });
        },
        openSopListPop(type, item) {
            console.log(type, item);
            this.SopListPopType = type;
            this.SopListPopItem = item;
            this.SopListPopShow = true;
        },
        sopListPopCallback() {
            this.SopListPopType = '';
            this.SopListPopItem = null;
            this.SopListPopShow = false;
        },
        getLangData() {
            this.sametimearr = [
                this.lang.HMI_HT_LineChartWindowViewModel_Hour,
                this.lang.MaintenanceManage_Day,
                this.lang.HMI_HT_LineChartWindowViewModel_Week,
                this.lang.HMI_HT_LineChartWindowViewModel_Month
            ];
            this.warrantystatus = [
                this.lang.EquipmentAccount_Inside,
                this.lang.EquipmentAccount_Outside
            ];
            this.devicestatus = [
                this.lang.EquipmentAccount_Used,
                this.lang.EquipmentAccount_Stopped,
                this.lang.EquipmentAccount_Abandoned
            ];
            this.warry = this.lang.EquipmentAccount_Inside;
            this.device = this.lang.EquipmentAccount_Used;
            this.Meter1 = this.lang.AlarmRecord_HT_Unlimited;
            this.Meter2 = this.lang.AlarmRecord_HT_Unlimited;
            this.ztarr = [
                this.lang.AlarmRecord_HT_Unlimited,
                this.lang.MaintenanceManage_Closed,
                this.lang.MaintenanceManage_Completed,
                this.lang.MaintenanceManage_TimeoutCompleted,
                this.lang.MaintenanceManage_Expired
            ];
            this.leixinarr = [
                this.lang.AlarmRecord_HT_Unlimited,
                this.lang.RepairManage_PlanRepair,
                this.lang.RepairManage_FaultRepair
            ];
            this.type1 = [
                {
                    label: this.lang.PointInspectionManage_Value,
                    value: 1
                },
                {
                    label: this.lang.PointInspectionManage_Judge,
                    value: 2
                },
                {
                    label: this.lang.PointInspectionManage_Text,
                    value: 3
                },
                {
                    label: this.lang.PointInspectionManage_Option,
                    value: 4
                }
            ];
            this.TipsText = this.lang.PointInspectionManage_StandardNameIsEmpty;
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
        ProjectTypeFun(item, text) {
            if (text == 3) {
                console.log('item', item);
                if (item.value == '2') {
                    item.topNum = '';
                    item.bottomNum = '';
                    item.zhi = `${this.lang.ProcessParameterReport_HT_Yes}|${this.lang.ProcessParameterReport_HT_No}`;
                    item.option = this.lang.ProcessParameterReport_HT_Yes;
                }
                if (item.value == '3') {
                    item.topNum = '';
                    item.bottomNum = '';
                    item.zhi = '';
                    item.option = '';
                }
                if (item.value == '4') {
                    item.topNum = '';
                    item.bottomNum = '';
                    item.zhi = '1|2|3';
                    item.option = '';
                }
                if (item.value == '1') {
                    item.topNum = '200';
                    item.bottomNum = '100';
                    item.zhi = '150';
                    item.option = '';
                }
            }

            if (text == 2) {
                console.log('item22', item);
                if (item.Type == '2') {
                    item.Upper = '';
                    item.Lower = '';
                    item.Reference = `${this.lang.ProcessParameterReport_HT_Yes}|${this.lang.ProcessParameterReport_HT_No}`;
                    item.Right = this.lang.ProcessParameterReport_HT_Yes;
                }
                if (item.Type == '3') {
                    item.Upper = '';
                    item.Lower = '';
                    item.Reference = '';
                    item.Right = '';
                }
                if (item.Type == '4') {
                    item.Upper = '';
                    item.Lower = '';
                    item.Reference = '1|2|3';
                    item.Right = '';
                }
                if (item.Type == '1') {
                    item.Upper = '200';
                    item.Lower = '100';
                    item.Reference = '150';
                    item.Right = '';
                }
            }
        },

        no1() {
            this.deltrue = true;
            this.tipchange = false;
        },
        //关闭{{lang.HT_MessageBoxCaption_Tips}}弹窗
        querBtnFun() {
            this.tipsShow = false;
        },
        //添加弹窗查询
        addQueryBtnFun() {
            this.addPopAxios();
        },
        //巡检确定
        InspectionQureyFun() {
            if (this.sestion == 3) {
                if (this.name1Text == '') {
                    this.tipsShow = true;
                    this.TipsText = this.lang.PointInspectionManage_StandardNameIsEmpty;
                    return;
                }
                if (this.checkArr.length == 0) {
                    this.tipsShow = true;
                    this.TipsText = this.lang.PointInspectionManage_AddAssociatedEquipment;
                    return;
                }
                if (this.SpotcheckArr.length == 0) {
                    this.tipsShow = true;
                    this.TipsText = this.lang.PointInspectionManage_AddPointInspectionItems;
                    return;
                } else {
                    // for (var i = 0; i < this.SpotcheckArr.length; i++) {
                    //     console.log('SpotcheckArr', this.SpotcheckArr[i]);
                    //     if (this.SpotcheckArr[i].name == '' && this.SpotcheckArr[i].Type !== 2) {
                    //         // 判断类型不需要校验上下限
                    //         this.tipsShow = true;
                    //         let msg = this.lang.PointInspectionManage_RowPointInspectionItemsIsEmpty
                    //         let firstL = msg.indexOf('{')
                    //         let firstR = msg.indexOf('}') + 1
                    //         let str1 = msg.slice(firstL, firstR)
                    //         msg = msg.replace(str1, `<${i + 1}>`)
                    //         this.TipsText = msg
                    //         // this.TipsText =
                    //         //     '点检项目第' + (i + 1) + '行项目名不能为空！';
                    //         return;
                    //     } else if (this.SpotcheckArr[i].Explain == '') {
                    //         this.tipsShow = true;
                    //         let msg = this.lang.PointInspectionManage_RowExplainIsEmpty
                    //         let firstL = msg.indexOf('{')
                    //         let firstR = msg.indexOf('}') + 1
                    //         let str1 = msg.slice(firstL, firstR)
                    //         msg = msg.replace(str1, `<${i + 1}>`)
                    //         this.TipsText = msg
                    //         // this.TipsText =
                    //         //     '点检项目第' + (i + 1) + '行说明不能为空！';
                    //         return;
                    //     }
                    // }
                }

                console.log('checkArr', this.checkArr);

                this.dataValue = {
                    StandardName: this.name1Text,
                    Requriement: this.name2Text,
                    DevicesID: [],
                    StandDeviceMaps: [],
                    PointProjects: []
                };

                for (var e = 0; e < this.checkArr.length; e++) {
                    this.dataValue.DevicesID.push(this.checkArr[e].AID);
                    console.log('this.checkArr[e]', this.checkArr[e]);
                    this.dataValue.StandDeviceMaps.push({
                        DeviceeId: this.checkArr[e].AID,
                        StandardDeviceeId: this.checkArr[e].StandardDeviceId
                    });
                }
                for (var j = 0; j < this.SpotcheckArr.length; j++) {
                    // var typeValue;
                    // if (this.SpotcheckArr[j].value == this.lang.PointInspectionManage_Value) {
                    //     typeValue = 1;
                    // } else if (this.SpotcheckArr[j].value == this.lang.PointInspectionManage_Judge) {
                    //     typeValue = 2;
                    // } else if (this.SpotcheckArr[j].value == this.lang.PointInspectionManage_Text) {
                    //     typeValue = 3;
                    // } else if (this.SpotcheckArr[j].value == this.lang.PointInspectionManage_Option) {
                    //     typeValue = 4;
                    // }
                    var value = {
                        ProjectName: this.SpotcheckArr[j].name,
                        Type: /* typeValue */ this.SpotcheckArr[j].value,
                        Upper: this.SpotcheckArr[j].topNum,
                        Lower: this.SpotcheckArr[j].bottomNum,
                        Reference: this.SpotcheckArr[j].zhi,
                        Right: this.SpotcheckArr[j].option,
                        Remarks: this.SpotcheckArr[j].Explain,
                        PID: this.SpotcheckArr[j].PID,
                        StandardProjectId: this.SpotcheckArr[j].PID
                    };
                    this.dataValue.PointProjects.push(value);
                }

                console.log('aa', this.dataValue);

                // var data1 = JSON.stringify(this.dataValue);
                this.$axios({
                    method: 'post',
                    url:
                        '/api/PointInspectionManage/PointInspectionManage_AddStandard',
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
                            this.addPopShow = false;
                            this.sad(1);
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
                        console.log('err==>', error);
                    });
            } else {
                let i = 0;
                let a = [];
                let StandDeviceMaps = [];
                for (i in this.checkArr) {
                    a.push(this.checkArr[i].AID);
                    StandDeviceMaps.push({
                        DeviceeId: this.checkArr[i].AID,
                        StandardDeviceeId: this.checkArr[i].StandardDeviceId
                    });
                }
                let j = 0;
                for (j in this.SpotcheckArr) {
                    this.SpotcheckArr[j].StandardProjectId = this.SpotcheckArr[
                        j
                    ].PID;
                    if (
                        this.SpotcheckArr[j].Type ==
                        this.lang.PointInspectionManage_Value
                    ) {
                        this.SpotcheckArr[j].Type = 1;
                    } else if (
                        this.SpotcheckArr[j].Type ==
                        this.lang.PointInspectionManage_Judge
                    ) {
                        this.SpotcheckArr[j].Type = 2;
                    } else if (
                        this.SpotcheckArr[j].Type ==
                        this.lang.PointInspectionManage_Text
                    ) {
                        this.SpotcheckArr[j].Type = 3;
                    } else if (
                        this.SpotcheckArr[j].Type ==
                        this.lang.PointInspectionManage_Option
                    ) {
                        this.SpotcheckArr[j].Type = 4;
                    }
                }
                let SpotcheckArr = JSON.parse(
                    JSON.stringify(this.SpotcheckArr)
                );
                SpotcheckArr.forEach(item => {
                    delete item.type;
                });

                console.log(this.SpotcheckArr);
                this.$axios({
                    method: 'post',
                    url:
                        '/api/PointInspectionManage/PointInspectionManage_ModifyStandard',
                    data: {
                        StandardID: this.sesstion.ID,
                        StandardName: this.sesstion.Name,
                        Requriement: this.sesstion.Requirement,
                        DevicesID: a,
                        StandDeviceMaps,
                        PointProjects: SpotcheckArr
                    }
                }).then(res => {
                    if (res.data.code == 0) {
                        this.sad(1);
                        this.tipword = res.data.data;
                        setTimeout(() => {
                            this.tipchange = true;
                            this.move('tip', 'tiphead');
                        });
                        this.pdyd1 = true;
                        this.addPopShow = false;
                    } else {
                        this.tipword = res.data.msg;
                        setTimeout(() => {
                            this.tipchange = true;
                            this.move('tip', 'tiphead');
                        });
                        this.pdyd1 = true;
                        let j = 0;
                        for (j in this.SpotcheckArr) {
                            if (this.SpotcheckArr[j].Type == 1) {
                                this.SpotcheckArr[
                                    j
                                ].Type = this.lang.PointInspectionManage_Value;
                            } else if (this.SpotcheckArr[j].Type == 2) {
                                this.SpotcheckArr[
                                    j
                                ].Type = this.lang.PointInspectionManage_Judge;
                            } else if (this.SpotcheckArr[j].Type == 3) {
                                this.SpotcheckArr[
                                    j
                                ].Type = this.lang.PointInspectionManage_Text;
                            } else if (this.SpotcheckArr[j].Type == 4) {
                                this.SpotcheckArr[
                                    j
                                ].Type = this.lang.PointInspectionManage_Option;
                            }
                        }
                    }
                });
            }
        },

        //开启弹窗
        addPopFun() {
            if (!this.tjshow) {
                setTimeout(() => {
                    this.tipchange = true;
                    this.move('tip', 'tiphead');
                });
                this.pdyd1 = true;
                this.tipword = this.lang.NoOperationAuthority;
                return;
            }
            this.name1Text = '';
            this.name2Text = '';
            this.sestion = 3;
            this.SpotcheckArr = [];
            this.checkArr = [];
            this.checkDeleArr1 = [];
            this.checkDeleArr = [];
            this.AllShow = false;
            setTimeout(() => {
                this.addPopShow = true;
                this.move('addPop ', 'looktop');
            });
            this.pdyd3 = true;
        },
        //关闭弹窗
        addPopOff() {
            this.addPopShow = false;
        },
        InspectionDeleteFun() {
            let ss = JSON.stringify(this.antable);
            this.tableData1 = JSON.parse(ss);
            this.addPopShow = false;
        },
        //关闭设备弹窗
        addEquipmentOffFun() {
            this.keyWord1 = '';
            this.equipmentShow = false;
            //  this.checkArr = this.checkArr11;
            this.checkArr2 = [];
        },
        foolCancel() {
            this.keyWord1 = '';
            this.equipmentShow = false;
            this.checkArr2 = [];
            // this.checkArr = this.checkArr11;
        },

        //开启设备弹窗
        addequipmentPopFun() {
            this.checkArr2 = [];
            var self = this;
            setTimeout(() => {
                this.equipmentShow = true;
                this.move('addEquipment', 'looktop1');
            });
            this.pdyd2 = true;
            this.addPopAxios();
            setTimeout(function() {
                self.addPopAxios();
            }, 500);
        },
        guid() {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
                /[xy]/g,
                function(c) {
                    var r = (Math.random() * 16) | 0,
                        v = c == 'x' ? r : (r & 0x3) | 0x8;
                    return v.toString(16);
                }
            );
        },
        //设备确定
        foolQueryFun() {
            // this.equipmentShow = false;
            this.keyWord1 = '';
            var checkArr2arr = [];
            for (let i = 0; i < this.checkArr.length; i++) {
                checkArr2arr.push(this.checkArr[i].AID);
            }
            var check = [];
            for (let j = 0; j < this.checkArr2.length; j++) {
                var index = checkArr2arr.indexOf(this.checkArr2[j].AID);
                if (index == -1) {
                    check.push({
                        ...this.checkArr2[j],
                        StandardDeviceId: this.guid()
                    });
                }
            }
            console.log('check', check);
            this.checkArr = JSON.parse(
                JSON.stringify(this.checkArr.concat(check))
            );

            this.equipmentShow = false;
            for (let i = 0; i < this.checkArr.length; i++) {
                this.checkArr[i].Number = i + 1;
            }
            this.checkArr2 = [];
        },
        //添加点检数据
        spotcheckBtnFun() {
            var value = {
                name: '',
                ProjectName: '',
                type: [
                    {
                        label: this.lang.PointInspectionManage_Value,
                        value: 1
                    },
                    {
                        label: this.lang.PointInspectionManage_Judge,
                        value: 2
                    },
                    {
                        label: this.lang.PointInspectionManage_Text,
                        value: 3
                    },
                    {
                        label: this.lang.PointInspectionManage_Option,
                        value: 4
                    }
                ],
                PID: this.guid(),
                topNum: 200,
                Upper: 200,
                bottomNum: 100,
                Lower: 100,
                zhi: 150,
                Reference: 150,
                option: '',
                Right: '',
                Explain: '',
                Remarks: '',
                value: 1,
                Type: this.lang.PointInspectionManage_Value
            };
            this.SpotcheckArr.push(value);
        },

        //添加弹窗初始化数据
        initPopData(num, dataAll) {
            this.$axios({
                method: 'post',
                url: `/api/EquipmentAccount/EquipmentAccount_GstEquipment?argDeviceType=${this.deviceType}&argKeyword=${this.keyWord1}&argPageIndex=${num}&argPageSize=50`,
                argDeviceType: this.deviceType,
                argKeyword: this.keyWord1,
                argPageIndex: num,
                argPageSize: 50
            })
                .then(res => {
                    dataAll.push(...res.data.data.DataList);

                    this.$axios({
                        method: 'post',
                        url: `/api/PointInspectionManage/PointInspectionManage_GstStandard?argDeviceType=''&argKeyword=''&argPageSize=50000000&argPageIndex=${num}`,
                        argDeviceType: '',
                        argKeyword: ''
                    })
                        .then(res => {
                            console.log('res', res.data.data);
                            var data = res.data.data;
                            this.EquipmentTypeAll = [];

                            for (let i = 0; i < dataAll.length; i++) {
                                this.typeArr = [];
                                this.SID = [];
                                if (!dataAll[i].DetailDeviceType) {
                                    dataAll[i].DetailDeviceType =
                                        dataAll[i].DeviceType;
                                }
                                var value = {
                                    DeviceName: dataAll[i].DeviceName,
                                    DeviceNo: dataAll[i].DeviceNo,
                                    DeviceModel: dataAll[i].DeviceModel,
                                    DeviceType: dataAll[i].DeviceType,
                                    DetailDeviceType:
                                        dataAll[i].DetailDeviceType,
                                    type: this.typeArr,
                                    AID: dataAll[i].AID,
                                    SID: this.SID,
                                    value: ''
                                };

                                for (var e = 0; e < data.length; e++) {
                                    if (
                                        data[e].Devices[0].DeviceName ==
                                        dataAll[i].DeviceName
                                    ) {
                                        var value1 = {
                                            label: data[e].Name,
                                            value: e
                                        };
                                        this.typeArr.push(value1);
                                        var value2 = {
                                            label: data[e].Projects[0].SID,
                                            value: e
                                        };
                                        this.SID.push(value2);
                                    }
                                }
                                value.type = this.typeArr;
                                value.SID = this.SID;

                                this.EquipmentTypeAll.push(value);
                            }

                            this.EquipmentTypeAll = this.EquipmentTypeAll;
                            console.log(
                                'EquipmentTypeAll',
                                this.EquipmentTypeAll
                            );
                            //   this.checkArr = this.EquipmentTypeAll
                        })
                        .catch(function(error) {
                            console.log('err', error);
                        });
                    if (res.data.data.ParameterList.NextEnabled) {
                        this.initPopData(num + 1, dataAll);
                        return;
                    }
                })
                .catch(function(error) {
                    console.log('err', error);
                });
        },
        move(name, namehead) {
            //  $(`.${name}`).addClass('center')
            let left = $(`.${name}`).width() / 2 + 'px';
            let top = $(`.${name}`).height() / 2 + 'px';
            $(`.${name}`)[0].style.left = `calc(50% - ${left})`;
            $(`.${name}`)[0].style.top = `calc(50% - ${top})`;
        },
        //添加弹窗初始化数据
        addPopAxios() {
            if (this.Meter3id == '11111111-1111-1111-1111-111111111111') {
                this.deviceType = '';
            }
            let dataAll = [];
            this.initPopData(1, dataAll);
        },

        //设备管理单选框
        checkFun(item, index) {
            console.log('item', item, index);
            var checkDom = this.$refs.checkipt;
            if (checkDom[index].checked) {
                this.checkArr2.push(item);
            } else {
                var a = this.checkArr.indexOf(item);
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
                if (this.checkArr.length != 0) {
                    this.checkArr2 = [];
                    for (var j = 0; j < this.EquipmentTypeAll.length; j++) {
                        // this.checkArr.push(this.EquipmentTypeAll[j])
                        this.checkArr2.push(this.EquipmentTypeAll[j]);
                    }
                } else {
                    // this.checkArr = this.EquipmentTypeAll;
                    this.checkArr2 = JSON.parse(
                        JSON.stringify(this.EquipmentTypeAll)
                    );
                }
                for (let i1 = 0; i1 < this.checkArr2.length; i1++) {
                    // this.checkArr[i1].Number = i1 + 1;
                    this.checkArr2[i1].Number = i1 + 1;
                }
            } else {
                // this.checkArr = this.checkArr11;
                this.checkArr2 = [];
            }
            var checkDom = this.$refs.checkipt;
            for (var i = 0; i < checkDom.length; i++) {
                checkDom[i].checked = this.$refs.checkiptAll.checked;
            }
        },

        //添加弹窗单选框
        checkFun1(item, index) {
            console.log('item999', item, index);
            var checkDom = this.$refs.checkipt1;
            console.log('eeee', checkDom);
            console.log('aa', this.checkArr, checkDom, checkDom[index].checked);

            if (checkDom[index].checked) {
                this.checkDeleArr.push(index);
            } else {
                var a = this.checkDeleArr.indexOf(index);
                this.checkDeleArr.splice(a, 1);
            }
            console.log('checkDeleArr', this.checkDeleArr);
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
        checkAllFun1() {
            console.log('this.$refs.checkipt1', this.$refs.checkipt1);
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
        select2(a) {
            console.log(a);
            this.list = a;
        },
        select3(a) {
            console.log(a);
            this.list = a;
        },
        //添加点检单选框
        checkIpt2(item, index) {
            console.log('eee');
            var checkDom = this.$refs.checkipt22;

            if (checkDom[index].checked) {
                this.checkDeleArr1.push(index);
            } else {
                var a = this.checkDeleArr1.indexOf(index);
                this.checkDeleArr1.splice(a, 1);
            }

            //全选框是否选中
            for (let i = 0; i < checkDom.length; i++) {
                if (checkDom[i].checked) {
                    this.$refs.checkiptAll22.checked = true;
                } else {
                    this.$refs.checkiptAll22.checked = false;
                    break;
                }
            }
        },
        treechange() {
            this.selectword2();
        },
        selectword2() {
            let i = 0;
            let j = 1;
            for (i in this.selectname) {
                if (this.a2 == 1) {
                    if (
                        this.selectname[i].NodeName ==
                        this.lang.EquipmentAccount_EquipmentType
                    ) {
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

        checkIptAll2() {
            if (this.$refs.checkiptAll22.checked) {
                this.AllShow1 = true;
            } else {
                this.AllShow1 = false;
            }

            var checkDom = this.$refs.checkipt22;
            for (var i = 0; i < checkDom.length; i++) {
                checkDom[i].checked = this.$refs.checkiptAll22.checked;
            }
        },

        //删除设备
        inspectionDeleteFun() {
            this.nowcheck = '';
            console.log('AllShow', this.AllShow);
            if (this.AllShow == true) {
                this.checkArr = [];
                this.$refs.checkiptAll1.checked = false;
            }

            if (this.checkDeleArr.length != 0) {
                // var tt = false;
                // console.log('this.checkDeleArr',this.checkDeleArr)
                // for (var i = 0; i < this.checkDeleArr.length; i++) {
                //     var ind = this.checkDeleArr[i];
                //     if (tt) {
                //         ind = ind - 1;
                //     }
                //     console.log('ss',tt,ind)
                //     this.checkArr.splice(ind, 1);
                //     tt = true;
                // }
                var deleteArr = [];
                for (let i = 0; i < this.checkDeleArr.length; i++) {
                    deleteArr.push(this.checkArr[this.checkDeleArr[i]]);
                }
                for (let k = 0; k < this.checkArr.length; k++) {
                    var index = deleteArr.indexOf(this.checkArr[k]);
                    if (index != -1) {
                        this.checkArr.splice(k, 1);
                        k--;
                    }
                }

                var checkDom = this.$refs.checkipt1;
                for (var j = 0; j < checkDom.length; j++) {
                    checkDom[j].checked = false;
                }
                this.checkDeleArr = [];
            }
            this.AllShow = false;
        },

        //删除点检
        inspectionDeleteFun1() {
            if (this.AllShow1) {
                this.SpotcheckArr = [];
                this.$refs.checkiptAll22.checked = false;
                this.AllShow1 = false;
            }

            if (this.$refs.checkipt22.length == 1) {
                this.$refs.checkiptAll22.checked = false;
            }

            if (this.checkDeleArr1.length != 0) {
                // var tt = false;
                // for (var i = 0; i < this.checkDeleArr1.length; i++) {
                //     var ind = this.checkDeleArr1[i];
                //     if (tt) {
                //         ind = ind - 1;
                //     }

                //     this.SpotcheckArr.splice(ind, 1);
                //     tt = true;
                // }
                var deleteArr = [];
                for (let i = 0; i < this.checkDeleArr1.length; i++) {
                    deleteArr.push(this.SpotcheckArr[this.checkDeleArr1[i]]);
                }
                for (let k = 0; k < this.SpotcheckArr.length; k++) {
                    var index = deleteArr.indexOf(this.SpotcheckArr[k]);
                    if (index != -1) {
                        this.SpotcheckArr.splice(k, 1);
                        k--;
                    }
                }

                var checkDom = this.$refs.checkipt22;
                for (var j = 0; j < checkDom.length; j++) {
                    checkDom[j].checked = false;
                }
                this.checkDeleArr1 = [];
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
        tip1() {
            this.tipchange = false;
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
            this.setionchange = false;
        },
        yes1() {
            let a = [];
            let i = 0;
            for (i in this.list) {
                a.push(this.list[i].ID);
            }
            this.$axios({
                method: 'post',
                url:
                    '/api/PointInspectionManage/PointInspectionManage_DeleteStandard',
                data: a
            }).then(res => {
                console.log(res);
                this.tipword = this.lang.FormulaManage_HT_DeletedSuccessfully;
                setTimeout(() => {
                    this.tipchange = true;
                    this.move('tip', 'tiphead');
                });
                this.pdyd1 = true;
                this.deltrue = true;
                this.sad(1);
            });
        },
        deldata1() {
            if (!this.scshow) {
                setTimeout(() => {
                    this.tipchange = true;
                    this.move('tip', 'tiphead');
                });
                this.pdyd1 = true;
                this.tipword = this.lang.NoOperationAuthority;
                return;
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
        handleNodeClic7(data) {
            this.Meter3 = data.label;
            this.Meter3id = data.NID;
            console.log(this.Meter3id);
            this.treetrue = false;
            this.deviceType = this.Meter3;
        },
        handleEdit(a, b) {
            if (!this.ckshow) {
                setTimeout(() => {
                    this.tipchange = true;
                    this.move('tip', 'tiphead');
                });
                this.pdyd1 = true;
                this.tipword = this.lang.NoOperationAuthority;
                return;
            }
            console.log(a);
            console.log(b);
            this.checkArr = [];
            let c = 0;
            let cc = 0;
            for (c in b.Devices) {
                if (b.Devices[c].a == '') {
                    b.Devices.splice(c, 1);
                    c--;
                }
            }
            for (c in b.Projects) {
                if (b.Projects[c].topNum) {
                    b.Projects.splice(c);
                    c--;
                }
            }
            this.setionchange = true;
            setTimeout(() => {
                this.addPopShow = true;
                this.move('addPop ', 'looktop');
            });
            this.pdyd3 = true;
            this.sestion = 1;
            this.disabled = true;
            this.sesstion = b;
            this.checkArr = b.Devices;
            this.SpotcheckArr = b.Projects;
            let j = 0;
            for (j in this.SpotcheckArr) {
                if (this.SpotcheckArr[j].Type == 1) {
                    this.SpotcheckArr[
                        j
                    ].Type = this.lang.PointInspectionManage_Value;

                    console.log(this.SpotcheckArr[j].a);
                } else if (this.SpotcheckArr[j].Type == 2) {
                    this.SpotcheckArr[
                        j
                    ].Type = this.lang.PointInspectionManage_Judge;
                } else if (this.SpotcheckArr[j].Type == 3) {
                    this.SpotcheckArr[
                        j
                    ].Type = this.lang.PointInspectionManage_Text;
                } else if (this.SpotcheckArr[j].Type == 4) {
                    this.SpotcheckArr[
                        j
                    ].Type = this.lang.PointInspectionManage_Option;
                }
            }
            console.log(this.SpotcheckArr);
        },
        handleEdit1(a, b) {
            if (!this.bjshow) {
                setTimeout(() => {
                    this.tipchange = true;
                    this.move('tip', 'tiphead');
                });
                this.pdyd1 = true;
                this.tipword = this.lang.NoOperationAuthority;
                return;
            }
            console.log(a);
            console.log(b);
            this.SpotcheckArr = [];
            this.checkArr = [];
            let aa = '';
            let c = 0;
            let cc = 0;
            for (c in b.Devices) {
                if (b.Devices[c].a == '') {
                    b.Devices.splice(c, 1);
                    c--;
                }
            }
            for (c in b.Projects) {
                if (b.Projects[c].topNum) {
                    b.Projects.splice(c, 1);
                    c--;
                }
            }
            aa = b;

            this.setionchange = true;
            setTimeout(() => {
                this.addPopShow = true;
                this.move('addPop ', 'looktop');
            });
            this.pdyd3 = true;
            this.sestion = 2;
            this.disabled = true;
            this.sesstion = b;
            this.checkArr = b.Devices;
            //
            let j = 0;
            for (j in this.SpotcheckArr) {
                if (this.SpotcheckArr[j].Type == 1) {
                    this.SpotcheckArr[
                        j
                    ].Type = this.lang.PointInspectionManage_Value;

                    console.log(this.SpotcheckArr[j].a);
                } else if (this.SpotcheckArr[j].Type == 2) {
                    this.SpotcheckArr[
                        j
                    ].Type = this.lang.PointInspectionManage_Judge;
                } else if (this.SpotcheckArr[j].Type == 3) {
                    this.SpotcheckArr[
                        j
                    ].Type = this.lang.PointInspectionManage_Text;
                } else if (this.SpotcheckArr[j].Type == 4) {
                    this.SpotcheckArr[
                        j
                    ].Type = this.lang.PointInspectionManage_Option;
                }
            }
            console.log(this.SpotcheckArr);
            console.log('asdasdwwwwwwwwwwwwwwwwwwww', aa);
            this.SpotcheckArr = aa.Projects;
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
                    if (
                        this.selectname[i].NodeName ==
                        this.lang.EquipmentAccount_EquipmentType
                    ) {
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
        cancel2() {
            if (this.Preservation == this.lang.EquipmentAccount_EquipmentType) {
                this.Preservation = this.lang.EquipmentAccount_ClickSelect;
            } else if (
                this.Preservation5 == this.lang.EquipmentAccount_InstallPosition
            ) {
                this.Preservation5 = this.lang.EquipmentAccount_ClickSelect;
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
                    `/api/PointInspectionManage/PointInspectionManage_GstStandard?argDeviceType=${c}&argKeyword=${this.keyword}&argPageSize=${this.PageData.PageSize}&argPageIndex=${this.PageData.PageIndex}`
                )
                .then(res => {
                    console.log(
                        `/api/PointInspectionManage/PointInspectionManage_GstStandard?argDeviceType=${c}&argKeyword=${this.keyword}&argPageSize=${this.PageData.PageSize}&argPageIndex=${this.PageData.PageIndex}`
                    );
                    if (res.data.code == 0) {
                        this.tableData1 = res.data.data.DataList;
                        this.PageData = res.data.data.ParameterList;
                        console.log(res);
                        console.log(this.tableData1);
                        let i = 0;
                        for (i in this.tableData1) {
                            let a = i;
                            this.tableData1[i].Number = ++a;
                        }
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
        isPositiveInteger(s) {
            //是否为正整数
            var re = /^[0-9]+$/;
            return re.test(s);
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
        sad(a) {
            if (!this.ckshow && a !== 1) {
                setTimeout(() => {
                    this.tipchange = true;
                    this.move('tip', 'tiphead');
                });
                this.pdyd1 = true;
                this.tipword = this.lang.NoOperationAuthority;
                return;
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
                this.tipword = this.lang.AlarmRecord_HT_TheQueryDate;
                return;
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
        }
    },
    mounted() {
        this.value1 = this.GMTToStr(this.value1);
        this.value2 = this.GMTToStr(this.value2);
        this.sad(1);
        console.log(this.tableData);
    }
};
</script>

<style lang="scss">
.type {
    .el-select {
        .el-input {
            height: 100%;
            width: 90%;
            font-size: inherit;
        }
        .el-input.is-disabled {
            .el-input__inner {
                border-color: #e4e7ed;
            }
        }
        .el-input__inner {
            height: 100%;
            border-radius: 2px;
            border-color: rgb(118, 118, 118);
        }
    }
}
</style>

<style lang="scss" scoped>
.public-table {
    .el-input__inner {
        height: 30px;
        line-height: 30px;
        width: 96%;
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
}
.tip {
    position: fixed;
    width: 380px;
    height: 200px;
    z-index: 3000;
    top: 350px !important;
    left: 750px !important;
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
        // width: 100%;
        // text-align: center;
        margin-top: 50px;
    }
    .tipdetermine {
        cursor: pointer;
        color: #ea9328;
        width: 310px;
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
        position: absolute;
        right: 10px;
        top: 10px;
        bottom: 0;
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
        position: absolute;
        right: 150px;
        top: 0;
        bottom: 0;
        margin: auto;
        border-radius: 4px;
        font-weight: 600;
        display: inline-block;
        cursor: pointer;
    }

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
        border: 1px solid rgb(244, 244, 244);
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
        z-index: 999;

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
            height: 55%;
            margin: auto;
            text-align: center;
            box-sizing: border-box;

            display: flex;
            align-items: center;
            justify-content: center;
            white-space: normal;
            word-break: break-all;
            text-align: left;
            margin: auto;
        }
        .fool {
            width: 100%;
            height: 40px;
            margin-top: 10px;
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

    input[type='checkbox'] {
        top: -1px;
        left: 0;
        width: 24px;
        height: 24px;
        display: inline-block;
        text-align: center;
        vertical-align: middle;
        line-height: 24px;
        z-index: 11;
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

    .addPop {
        width: 1000px;
        height: 900px;
        box-shadow: 2px 2px 8px 2px rgba(0, 0, 0, 0.6);
        position: fixed;
        top: 50px;
        left: 500px;
        background: #eeeeee;
        z-index: 199;
        .i-c {
            margin-top: 12px;
            right: 10px;
            cursor: pointer;
            position: absolute;
            z-index: 1000;
            // background-color: #000;
            display: block;
        }
        .looktop {
            position: absolute;
            width: 100%;
            height: 60px;
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

        .addPop_name {
            width: 90%;
            margin: 0 auto;
            height: 160px;
            .addPop_name1 {
                width: 100%;
                height: 35px;
                margin-bottom: 15px;
                padding-top: 25px;
                box-sizing: border-box;
                display: flex;
                align-items: center;
                .addPop_name1Text {
                    width: 120px;
                    font-size: 16px;
                    margin-right: 15px;
                }
                .addPop_name1Ipt {
                    width: 765px;
                    height: 35px;
                }
            }
            .addPop_name2 {
                width: 100%;
                height: 80px;
                padding-top: 25px;
                box-sizing: border-box;
                display: flex;
                align-items: center;
                .addPop_name2Text {
                    width: 120px;
                    font-size: 16px;
                    margin-right: 15px;
                }
                .addPop_name2Ipt {
                    width: 765px;
                    height: 80px;
                }
            }
        }

        .addPop_equipment {
            width: 90%;
            margin: 0 auto;
            height: 300px;

            .addPop_equipmentBtn {
                width: 100%;
                height: 30px;
                margin-top: 10px;

                .equipmentBtn_text {
                    font-size: 16px;
                }

                .equipmentBtn_add {
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

                .equipmentBtn_delete {
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
            }

            .addPop_equipmentList {
                width: 100%;
                height: 250px;
                background: #fff;
                margin-top: 10px;
                box-sizing: border-box;
                overflow: auto;

                .middle_title {
                    width: 100%;
                    height: 40px;
                    box-sizing: border-box;
                    overflow: hidden;
                    line-height: 40px;
                    background: #dcf0f9;
                    position: sticky;
                    top: 0;
                    z-index: 100;
                    .num {
                        float: left;
                        width: 12%;
                        height: 40px;
                        padding-left: 5px;
                        border-right: 1px solid #ddd;
                    }

                    .id {
                        float: left;
                        width: 20%;
                        height: 40px;
                        padding-left: 5px;
                        border-right: 1px solid #ddd;
                    }
                    .type {
                        float: left;
                        width: 15%;
                        height: 40px;
                        padding-left: 5px;
                        border-right: 1px solid #ddd;
                    }
                    .typeNum {
                        float: left;
                        width: 15%;
                        height: 40px;
                        padding-left: 5px;
                        border-right: 1px solid #ddd;
                    }
                    .ipt {
                        float: left;
                        width: 8%;
                        height: 40px;
                        padding-left: 5px;
                        border-right: 1px solid #ddd;
                    }
                    .name {
                        float: left;
                        width: 20%;
                        height: 40px;
                        padding-left: 5px;
                        border-right: 1px solid #ddd;
                    }
                    .action {
                        float: left;
                        width: 10%;
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
                    background: #fff;
                    border-bottom: 1px solid #ddd;
                    box-sizing: border-box;

                    .num {
                        float: left;
                        width: 12%;
                        height: 40px;
                        padding-left: 5px;
                        border-right: 1px solid #ddd;
                    }

                    .id {
                        float: left;
                        width: 20%;
                        height: 40px;
                        padding-left: 5px;
                        border-right: 1px solid #ddd;
                    }
                    .type {
                        float: left;
                        width: 15%;
                        height: 40px;
                        padding-left: 5px;
                        border-right: 1px solid #ddd;
                    }
                    .typeNum {
                        float: left;
                        width: 15%;
                        height: 40px;
                        padding-left: 5px;
                        border-right: 1px solid #ddd;
                    }
                    .ipt {
                        float: left;
                        width: 8%;
                        height: 40px;
                        padding-left: 5px;
                        border-right: 1px solid #ddd;
                    }
                    .name {
                        float: left;
                        width: 20%;
                        height: 40px;
                        padding-left: 5px;
                        border-right: 1px solid #ddd;
                    }
                    .action {
                        float: left;
                        width: 10%;
                        height: 40px;
                        padding-left: 5px;
                        border-right: 1px solid #ddd;
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
                    z-index: 11;
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
            }
        }

        .addPop_spotcheck {
            width: 90%;
            height: 290px;
            margin: 0 auto;

            .addPop_spotcheckBtn {
                width: 100%;
                height: 30px;
                margin-top: 10px;

                .spotcheckBtn_text {
                    font-size: 16px;
                }

                .spotcheckBtn_add {
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

                .spotcheckBtn_delete {
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
            }

            .addPop_spotcheckList {
                width: 100%;
                height: 250px;
                background: #fff;
                margin-top: 10px;
                overflow: auto;

                .middle_title {
                    width: 100%;
                    height: 40px;
                    box-sizing: border-box;
                    overflow: hidden;
                    line-height: 40px;
                    background: #dcf0f9;

                    .ipt {
                        width: 5%;
                        height: 40px;
                        float: left;
                        box-sizing: border-box;
                        padding-left: 5px;
                        border-right: 1px solid #ddd;
                    }
                    .id {
                        width: 5%;
                        height: 40px;
                        float: left;
                        box-sizing: border-box;
                        padding-left: 5px;
                        border-right: 1px solid #ddd;
                    }
                    .name {
                        width: 11.6%;
                        height: 40px;
                        float: left;
                        box-sizing: border-box;
                        padding-left: 5px;
                        border-right: 1px solid #ddd;
                    }
                    .type {
                        width: 8.3%;
                        height: 40px;
                        float: left;
                        box-sizing: border-box;
                        padding-left: 5px;
                        border-right: 1px solid #ddd;
                    }
                    .topNum {
                        width: 8.3%;
                        height: 40px;
                        float: left;
                        box-sizing: border-box;
                        padding-left: 5px;
                        border-right: 1px solid #ddd;
                    }
                    .bottomNum {
                        width: 8.3%;
                        height: 40px;
                        float: left;
                        box-sizing: border-box;
                        padding-left: 5px;
                        border-right: 1px solid #ddd;
                    }
                    .zhi {
                        width: 8.3%;
                        height: 40px;
                        float: left;
                        box-sizing: border-box;
                        padding-left: 5px;
                        border-right: 1px solid #ddd;
                    }
                    .option {
                        width: 8.3%;
                        height: 40px;
                        float: left;
                        box-sizing: border-box;
                        padding-left: 5px;
                        border-right: 1px solid #ddd;
                    }
                    .Explain {
                        width: 11.6%;
                        height: 40px;
                        float: left;
                        box-sizing: border-box;
                        padding-left: 5px;
                        border-right: 1px solid #ddd;
                    }
                    .action {
                        float: left;
                        width: 8.3%;
                        height: 40px;
                        padding-left: 5px;
                        border-right: 1px solid #ddd;
                    }
                    .action2 {
                        float: left;
                        width: 8.3%;
                        height: 40px;
                        padding-left: 5px;
                        border-right: 1px solid #ddd;
                        overflow: hidden;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                        .table-img {
                            margin-top: 2px;
                            height: 35px;
                        }
                    }
                    .action3 {
                        float: left;
                        width: 8.6%;
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
                    background: #fff;
                    border-bottom: 1px solid #ddd;

                    .ipt {
                        width: 5%;
                        height: 40px;
                        float: left;
                        box-sizing: border-box;
                        padding-left: 5px;
                        border-right: 1px solid #ddd;
                    }
                    .id {
                        width: 5%;
                        height: 40px;
                        float: left;
                        box-sizing: border-box;
                        padding-left: 5px;
                        border-right: 1px solid #ddd;
                    }
                    .name {
                        width: 11.6%;
                        height: 40px;
                        float: left;
                        box-sizing: border-box;
                        padding-left: 5px;
                        border-right: 1px solid #ddd;

                        input {
                            width: 80%;
                            height: 80%;
                            font-size: inherit;
                        }
                    }
                    .type {
                        width: 8.3%;
                        height: 40px;
                        float: left;
                        box-sizing: border-box;
                        padding-left: 5px;
                        border-right: 1px solid #ddd;
                    }
                    .topNum {
                        width: 8.3%;
                        height: 40px;
                        float: left;
                        box-sizing: border-box;
                        padding-left: 5px;
                        border-right: 1px solid #ddd;

                        input {
                            width: 80%;
                            height: 80%;
                            font-size: inherit;
                        }
                    }
                    .bottomNum {
                        width: 8.3%;
                        height: 40px;
                        float: left;
                        box-sizing: border-box;
                        padding-left: 5px;
                        border-right: 1px solid #ddd;

                        input {
                            width: 80%;
                            height: 80%;
                            font-size: inherit;
                        }
                    }
                    .zhi {
                        width: 8.3%;
                        height: 40px;
                        float: left;
                        box-sizing: border-box;
                        padding-left: 5px;
                        border-right: 1px solid #ddd;

                        input {
                            width: 80%;
                            height: 80%;
                            font-size: inherit;
                        }
                    }
                    .option {
                        width: 8.3%;
                        height: 40px;
                        float: left;
                        box-sizing: border-box;
                        padding-left: 5px;
                        border-right: 1px solid #ddd;

                        input {
                            width: 80%;
                            height: 80%;
                            font-size: inherit;
                        }
                    }
                    .Explain {
                        width: 11.6%;
                        height: 40px;
                        float: left;
                        box-sizing: border-box;
                        padding-left: 5px;
                        border-right: 1px solid #ddd;

                        input {
                            width: 80%;
                            height: 80%;
                            font-size: inherit;
                        }
                    }
                    .action {
                        float: left;
                        width: 8.3%;
                        height: 40px;
                        padding-left: 5px;
                        border-right: 1px solid #ddd;
                    }
                    .action2 {
                        float: left;
                        width: 8.3%;
                        height: 40px;
                        padding-left: 5px;
                        border-right: 1px solid #ddd;
                        overflow: hidden;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                        .table-img {
                            margin-top: 2px;
                            height: 35px;
                        }
                    }
                    .action3 {
                        float: left;
                        width: 8.6%;
                        height: 40px;
                        padding-left: 5px;
                        border-right: 1px solid #ddd;
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
                z-index: 11;
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
        }

        .addPop_fool {
            width: 90%;
            margin: 0 auto;
            height: 40px;
            overflow: hidden;
            margin-top: 15px;

            .fool_delete {
                color: #fff;
                width: 100px;
                height: 30px;
                line-height: 30px;
                text-align: center;
                background-color: #999999;
                margin-left: 10px;
                border-radius: 4px;
                float: right;
                cursor: pointer;
            }

            .fool_qurey {
                color: #fff;
                width: 100px;
                height: 30px;
                line-height: 30px;
                text-align: center;
                background-color: #386df0;
                margin-left: 10px;
                border-radius: 4px;
                float: right;
                cursor: pointer;
            }
        }
    }

    .addEquipment {
        .i-c {
            margin-top: 12px;
            right: 10px;
            cursor: pointer;
            position: absolute;
            z-index: 1000;
            // background-color: #000;
            display: block;
        }
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
        z-index: 999;
        box-shadow: 2px 2px 8px 2px rgba(0, 0, 0, 0.6);

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
            height: 55%;
            border: 1px solid #ddd;
            box-sizing: border-box;
            margin: 0 auto;
            background: #f4f4f4;

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
                    display: inline-block;
                    margin-left: 15px;
                    position: relative;
                    top: 4px;
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
            position: absolute;
            bottom: 20px;
            right: 30px;
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
    z-index: 1229;
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
    z-index: 10;
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
        z-index: 50;
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
    height: 60px;
    line-height: 60px;
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
    z-index: 200;
    position: fixed;
    top: 0;
    left: 0;
}
.cover6 {
    width: 100%;
    height: 100%;
    z-index: 190;
    position: fixed;
    top: 0;
    left: 0;
}
// .selectword2 {
//     position: absolute !important;
//     left: 138px !important;
//     top: 122px !important;
//     z-index: 999 !important;
// }
.yd {
    margin: auto;
    top: 0 !important;
    right: 0 !important;
    bottom: 0 !important;
    left: 0 !important;
}
.conter_ipt {
    option {
        display: none;
    }
}
img {
    cursor: pointer;
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
.a::before {
    color: #000 !important;
}
.seleword {
    display: inline-block;
    width: 13%;
    height: 40px;
    position: absolute;
    top: 12px;
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
        border: 1px solid rgb(244, 244, 244);
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
    margin-left: 15% !important;
}
.tinput1 {
    margin-left: 23% !important;
}
.seleword2 {
    display: inline-block;
    width: 21%;
    height: 30px;
    position: absolute;
    top: 3px;
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
    top: 34px !important;
    left: 94px !important;
}
.sblx {
    display: inline-block;
}
.conter {
    span {
        word-break: keep-all;
        width: auto;
        display: block;
        white-space: pre-wrap;
        word-wrap: break-word;
        overflow: hidden;
    }
    .custom-tree-item {
    }
}
.tipcontanin {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 30px;
    height: 75px;
}
.checkSopBtn {
    width: 70px;
    height: 32px;
    line-height: 32px;
    text-align: center;
    background-color: #4270e4;
    border-radius: 4px;
    color: #ffffff;
    cursor: pointer;
    font-size: 14px;
    margin-left: 5px;
    margin-top: 3px;
}
</style>
