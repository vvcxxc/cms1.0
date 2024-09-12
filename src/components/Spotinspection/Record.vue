<!--
 * @Description: 点巡检管理点巡检记录界面
 * @Date: 2019-11-25 19:07:09
 * @Author: 随风
 * @LastEditors: Tao
 * @LastEditTime: 2020-08-06 17:55:12
 -->
<template>
    <div
        class="public-table"
        @click="changeselect = false"
        v-loading="this.$store.state.isShow"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.4)"
    >
        <div
            class="search-container"
            :style="{
                zoom
            }"
        >
            <span class="title sblx">{{
                lang.EquipmentAccount_EquipmentType1
            }}</span>
            <div class="seleword seleword3" @click.stop="selectword1">
                <div class="seleword1">
                    {{ Meter }}
                    <img :src="xiala" alt />
                </div>
            </div>
            <span class="sp1 tinput title">{{
                lang.MaintenanceManage_TaskStatus1
            }}</span>
            <select v-model="Meter1" style="width: 150px">
                <option
                    v-for="(item, index) in ztarr"
                    :key="index"
                    :value="item"
                    >{{ item }}</option
                >
            </select>
            <div class="selectword selectword3" v-show="changeselect">
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

            <span class="sp4 title">{{
                lang.MaintenanceManage_CompletionTime1
            }}</span>

            <el-date-picker
                v-model="value1"
                type="datetime"
                :placeholder="lang.SCMSConsoleWebApiMySql_PleChooseDate"
                value-format="yyyy-MM-dd HH:mm:ss"
                @focus="sx"
            ></el-date-picker>
            <span class="demonstration">-</span>
            <el-date-picker
                v-model="value2"
                type="datetime"
                :placeholder="lang.SCMSConsoleWebApiMySql_PleChooseDate"
                value-format="yyyy-MM-dd HH:mm:ss"
                @focus="sx"
            ></el-date-picker>
            <input
                type="text"
                :placeholder="lang.AlarmRecord_Time_Keyword"
                v-model="keyword"
            />
            <div class="sad" @click="sad">{{ lang.RoleManage_Query }}</div>
            <div class="export" @click="exportTab">导出</div>
        </div>
        <div class="table-container table-container1">
            <el-table
                ref="multipleTable"
                :data="tableData1"
                stripe
                height="100%"
                tooltip-effect="dark"
                border
                :style="{
                    width: 1700 * zoom + 'px',
                    fontSize: 14 * zoom + 'px'
                }"
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
                    :label="lang.RoleManage_NO"
                    :width="100 * zoom"
                    prop="Number"
                    :show-overflow-tooltip="true"
                >
                    <template slot-scope="scope">{{
                        scope.row.Number
                    }}</template>
                </el-table-column>
                <el-table-column
                    prop="name"
                    :label="lang.RoleManage_Operation"
                    :width="180 * zoom"
                >
                    <template slot-scope="scope">
                        <!-- <i class="el-icon-share"></i> -->
                        <div
                            class="img"
                            @click="handleEdit(scope.$index, scope.row, false)"
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
                        <div
                            class="img"
                            @click="handleEdit(scope.$index, scope.row, true)"
                            :style="{
                                width: 60 * zoom + 'px',
                                height: 30 * zoom + 'px',
                                lineHeight: 30 * zoom + 'px',
                                marginLeft: 10 * zoom + 'px'
                            }"
                        >
                            <img
                                :src="edit"
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
                    :label="lang.MaintenanceManage_PlanName"
                    :width="150 * zoom"
                    :show-overflow-tooltip="true"
                ></el-table-column>
                <el-table-column
                    prop="PlanTypeDesc"
                    label="计划类型"
                    :width="150 * zoom"
                    :show-overflow-tooltip="true"
                ></el-table-column>
                <el-table-column
                    prop="ClassShift"
                    label="班次-班组"
                    :width="150 * zoom"
                    :show-overflow-tooltip="true"
                ></el-table-column>

                <el-table-column
                    prop="StartTime"
                    :label="
                        lang.ProcessParameterConfigure_ProduceManageUserControl_DataGrid1_PlanningStartTime
                    "
                    :width="300 * zoom"
                    :show-overflow-tooltip="true"
                ></el-table-column>
                <el-table-column
                    prop="EndTime"
                    :label="
                        lang.ProcessParameterConfigure_ProduceManageUserControl_DataGrid1_PlanEndTime
                    "
                    :width="300 * zoom"
                    :show-overflow-tooltip="true"
                ></el-table-column>
                <el-table-column
                    prop="Status"
                    :label="lang.PointInspectionManage_PlanStatus"
                    :show-overflow-tooltip="true"
                    :width="100 * zoom"
                ></el-table-column>
                <el-table-column
                    prop="FinishTime"
                    :label="lang.MaintenanceManage_CompletionTime"
                    :width="300 * zoom"
                    :show-overflow-tooltip="true"
                ></el-table-column>
                <el-table-column
                    prop="Executor"
                    :label="lang.PointInspectionManage_Inspector"
                    :width="200 * zoom"
                    :show-overflow-tooltip="true"
                ></el-table-column>
                <el-table-column
                    prop="DevicesStr"
                    :label="lang.EquipmentAccount_EquipmentName"
                    :width="200 * zoom"
                    :show-overflow-tooltip="true"
                ></el-table-column>
                <el-table-column
                    prop="CloseRemarks"
                    :label="lang.MaintenanceManage_Remark"
                    :width="200 * zoom"
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
        <div
            class="sestion"
            ref="kongtiao1"
            v-if="setionchange"
            :style="{ width: 800 * zoom + 'px', height: 740 * zoom + 'px' }"
        >
            <div
                class="sestionheader"
                :class="{ colordiv: $store.state.color == 'grey' }"
            >
                <div class="sestionheader1"></div>
                <span
                    class="head"
                    v-if="sestion == 1"
                    :class="{ fcolor: $store.state.color == 'grey' }"
                    >{{
                        lang.PointInspectionManage_ViewPointPatrolTaskContent
                    }}</span
                >
                <span
                    class="head"
                    v-if="sestion == 2"
                    :class="{ fcolor: $store.state.color == 'grey' }"
                    >修改点巡检任务结果</span
                >
                <img
                    :src="no2"
                    alt
                    class="no"
                    @click.stop="setionchange = false"
                    v-if="$store.state.color == 'grey'"
                />
                <img
                    :src="no"
                    alt
                    class="no"
                    @click.stop="setionchange = false"
                    v-else
                />
            </div>
            <div class="sestioncontain">
                <div class="homesetion">
                    <div class="hometop">
                        <div>
                            {{
                                lang.PointInspectionManage_PointPatrolInformation
                            }}
                        </div>
                        <div class="line"></div>
                    </div>
                </div>
                <div class="overflow">
                    <div>
                        <div class="fl">
                            <span>{{ lang.MaintenanceManage_PlanName }}</span>
                            <input
                                type="text"
                                :value="sesstion.Name"
                                disabled
                            />
                        </div>
                        <div class="fl">
                            <div>
                                <span>{{
                                    lang.PointInspectionManage_Inspector
                                }}</span>
                                <input
                                    type="text"
                                    :value="sesstion.Executor"
                                    disabled
                                />
                            </div>
                        </div>
                    </div>
                    <div>
                        <div class="fl">
                            <span class="mi">{{
                                lang.AlarmStatistics_AlarmStatisticsUserControl_StartTime
                            }}</span>
                            <div class="inpimg">
                                <img :src="rili" alt class="inpimg1" />
                                <input
                                    type="text"
                                    :value="sesstion.StartTime"
                                    disabled
                                />
                            </div>
                        </div>
                        <div class="fl">
                            <span>{{
                                lang.AlarmStatistics_AlarmStatisticsUserControl_EndTime
                            }}</span>
                            <div class="inpimg">
                                <img :src="rili" alt class="inpimg1" />
                                <input
                                    type="text"
                                    :value="sesstion.EndTime"
                                    disabled
                                />
                            </div>
                        </div>
                    </div>
                    <div class="rwnrdiv">
                        <span class="rwnr">{{
                            lang.MaintenanceManage_TaskExecutionContent
                        }}</span>
                        <input
                            name
                            id
                            :value="sesstion.Remarks"
                            disabled
                            style="width:610px;margin-bottom:10px"
                        />
                    </div>
                </div>
                <div class="homesetion">
                    <div class="hometop">
                        <div>
                            {{
                                lang.PointInspectionManage_PatrolInspectionDetails
                            }}
                        </div>
                        <div class="line"></div>
                    </div>
                </div>
                <div class="mx1">
                    <div
                        class="twice"
                        v-for="(item, index) in projectarr"
                        :key="index"
                        :class="{ bgcolor: sestion == 2 }"
                    >
                        <div class="inptwice">
                            <div class="fl">
                                <span>{{
                                    lang.EquipmentAccount_EquipmentName
                                }}</span>
                                <input
                                    type="text"
                                    :value="item.DeviceName"
                                    disabled
                                />
                            </div>
                            <div class="zr">
                                <span>{{
                                    lang.PointInspectionManage_PatrolInspectionItems
                                }}</span>
                                <input
                                    type="text"
                                    :value="item.StandardName"
                                    disabled
                                />
                                <div
                                    class="sopBtn"
                                    @click="openSopListPop(item)"
                                >
                                    查看文件
                                </div>
                            </div>
                        </div>
                        <div>
                            <span class="sl">{{
                                lang.PointInspectionManage_PointInspectionItems
                            }}</span>

                            <div
                                v-for="(item1, index1) in item.Projects"
                                :key="index1"
                                style="display: inline-block; width: 87%; float: right;"
                            >
                                <div class="mx">
                                    <div class="num">{{ item1.Number }}</div>
                                    <div class="nur">
                                        <div class="nurword">
                                            {{
                                                lang.PointInspectionManage_ItemName
                                            }}
                                            {{ item1.ProjectName }}
                                        </div>
                                        <template v-if="item1.Type == 1">
                                            <div class="nl">
                                                {{
                                                    lang.PointInspectionManage_Upper
                                                }}
                                                <input
                                                    type="text"
                                                    :value="item1.Upper"
                                                    disabled
                                                />
                                            </div>
                                            <div class="nl">
                                                {{
                                                    lang.PointInspectionManage_Lower
                                                }}
                                                <input
                                                    type="text"
                                                    :value="item1.Lower"
                                                    disabled
                                                />
                                            </div>
                                            <div class="nl">
                                                {{
                                                    lang.PointInspectionManage_ReferenceValue
                                                }}
                                                <input
                                                    type="text"
                                                    :value="item1.Reference"
                                                    disabled
                                                />
                                            </div>
                                            <div class="nl">
                                                {{
                                                    lang.PointInspectionManage_RealValue
                                                }}
                                                <input
                                                    type="text"
                                                    v-model="item1.Answer"
                                                    :disabled="!isEdit"
                                                    class="blueword"
                                                    :class="{
                                                        redword:
                                                            !isEdit &&
                                                            (item1.Answer <
                                                                100 ||
                                                                item1.Answer >
                                                                    200)
                                                    }"
                                                />
                                            </div>
                                        </template>
                                        <template v-if="item1.Type == 2">
                                            <div>{{ item1.Remarks }}</div>
                                            <div>
                                                <!-- <el-radio v-model="item1.Answer" v-for="(item2,index2) in item1.Referencearr" :key="index2" :label="item2" :disabled="!isEdit">{{item2}}</el-radio> -->
                                                <el-radio
                                                    :label="1"
                                                    v-model="item1.Answer"
                                                    :disabled="!isEdit"
                                                    >{{
                                                        lang.ProcessParameterReport_HT_Yes
                                                    }}</el-radio
                                                >
                                                <el-radio
                                                    :label="0"
                                                    v-model="item1.Answer"
                                                    :disabled="!isEdit"
                                                    >{{
                                                        lang.ProcessParameterReport_HT_Null
                                                    }}</el-radio
                                                >
                                            </div>
                                        </template>
                                        <template v-if="item1.Type == 3">
                                            <div class="nl" style="width:97%">
                                                {{
                                                    lang.PointInspectionManage_SituationDescription
                                                }}
                                                <input
                                                    style="width:85%"
                                                    type="text"
                                                    v-model="item1.Answer"
                                                    :disabled="!isEdit"
                                                />
                                            </div>
                                        </template>
                                        <template v-if="item1.Type == 4">
                                            <div>{{ item1.Remarks }}</div>
                                            <div>
                                                <el-checkbox
                                                    v-for="(item2,
                                                    index2) in item1.Referencearr"
                                                    :key="index2"
                                                    :label="item2"
                                                    :checked="
                                                        item1.check.includes(
                                                            item2
                                                        )
                                                    "
                                                    @change="
                                                        ch(item1, item2, $event)
                                                    "
                                                    :disabled="!isEdit"
                                                    >{{ item2 }}</el-checkbox
                                                >
                                            </div>
                                        </template>
                                    </div>
                                    <div class="item-sop" v-if="item1.FileName">
                                        <div>文件名称:</div>
                                        <div
                                            class="sop"
                                            v-if="
                                                item1.FileName.endsWith(
                                                    'pdf'
                                                ) ||
                                                    item1.FileName.endsWith(
                                                        'PDF'
                                                    )
                                            "
                                            @click="openViewSop(item1)"
                                        >
                                            {{ scope.row.FileName }}
                                        </div>
                                        <img
                                            class="sopImg"
                                            v-else
                                            :src="
                                                imgSrc(item1.StandardProjectId)
                                            "
                                            @click="openViewSop(item1)"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    class="Preservation"
                    v-if="sestion == 2"
                    @click="preservation6"
                >
                    {{ lang.PopupCommon_Sure }}
                </div>
                <div
                    class="cancel"
                    v-if="sestion == 2 || sestion == 3"
                    @click="cancel"
                >
                    {{ lang.PopupCommon_Cancel }}
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
                <div class="tipdetermine" @click="tip1" v-if="deltrue">
                    {{ lang.MessageBox_Confrim }}
                </div>
                <div class="delclass" v-if="!deltrue">
                    <div class="one" @click="no1">{{ lang.MessageBox_NO }}</div>
                    <div class="two" @click="yes1">
                        {{ lang.MessageBox_YES }}
                    </div>
                </div>
            </div>
        </div>
        <div class="cover1" v-if="setionchange"></div>
        <div class="cover3" v-if="cancel1"></div>
        <div class="cover2" v-if="tipchange"></div>
        <ViewSop
            v-if="sopShow"
            :defaultSrc="defaultSrc"
            title="查看文件"
            :sopData="sopData"
            @callback="viewSopCallback"
        />
        <SopListPop
            v-if="SopListPopShow"
            title="查看附件"
            SopListPopType="查看文件"
            :hiddenBtn="true"
            :SopListPopItem="SopListPopItem"
            @callback="sopListPopCallback"
        ></SopListPop>
        <tip-pop
            v-if="isTipShow"
            :tipText="tipText"
            :noCancel="noCancel"
            @tipCallBack="tipCallBack"
        ></tip-pop>
    </div>
</template>

<script>
import ViewSop from '../Vulnerableparts/ViewSop.vue';
import TipPop from '../public/tipPop.vue';
import SopListPop from './SopListPop.vue';

export default {
    components: {
        TipPop,
        ViewSop,
        SopListPop
    },
    data() {
        return {
            isTipShow: false,
            tipText: '',
            noCancel: true,
            SopListPopType: '',
            SopListPopItem: null,
            SopListPopShow: false,
            sopData: [],
            sopPopTitle: '',
            sopShow: false,
            defaultSrc: '',
            value1: new Date(new Date().toLocaleDateString()),
            value2: new Date(
                new Date(new Date().toLocaleDateString()).getTime() +
                    24 * 60 * 60 * 1000 -
                    1
            ),
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
            edit: require('@/assets/images/icon_pensoil.png'),
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
            hastip: 1,
            sbnum: 1,
            projectarr: [],
            time4: '',
            muchdata: '',
            a: 1,
            data6: [],
            longinnum: '',
            a1: 1,
            a2: 1,
            deldata: {},
            delarray: [],
            yesdel: '',
            oldName: '',
            ztarr: ['不限', '已关闭', '已完成', '超时完成', '已过期'],
            leixinarr: ['不限', '计划维修', '故障维修'],
            setionchange: false,
            nowIndex: 1,
            cxid: '',
            xiala: require('../../assets/images/ziyuan4.png'),
            cxshow: true,
            ckid: '',
            ckshow: true,
            pageDate: {
                pageIndex: 1,
                pagesize: 50,
                togeIndex: 0,
                togesize: 0
            },
            isEdit: false,
            zoom: 1,
            lang: JSON.parse(localStorage.getItem('languages'))[
                localStorage.getItem('currentLang')
            ]
        };
    },

    created() {
        this.getLangData();
        this.jurisdiction = this.$store.state.btnPowerData;
        this.buttonarr = this.findPathByLeafId(
            this.GetUrlParam('id'),
            this.jurisdiction
        )[0].Children;
        this.buttonarr.forEach(item => {
            if (item.RightName == '点巡检记录-查询按钮') {
                this.cxid = item.RightID;
            } else if (item.RightName == '点巡检记录-查看按钮') {
                this.ckid = item.RightID;
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
            url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.ckid}`
        })
            .then(res => {
                this.ckshow = res.data.data;
            })
            .catch(err => {
                console.log('err', err);
            });
        this.getEquipmentType();
        this.req(1);
        this.time4 = this.getNowTime();
    },
    methods: {
        tipCallBack(str) {
            this.isTipShow = false;
        },
        openSopListPop(item) {
            this.SopListPopItem = item;
            this.SopListPopShow = true;
        },
        sopListPopCallback() {
            this.SopListPopType = '';
            this.SopListPopItem = null;
            this.SopListPopShow = false;
        },
        openViewSop(item) {
            this.defaultSrc = this.imgSrc(item.StandardProjectId);
            this.sopData = [this.defaultSrc];
            this.sopShow = true;
        },
        imgSrc(_id) {
            const apiHref = window.location.host.includes('localhost')
                ? '192.168.2.73:8802'
                : window.location.host;
            let str = `http://${apiHref}/api/PointInspectionManage/PointInspectionManage_GetByStandardProjectId?standardProjectId=${_id}`;
            str = str.replace(/\\/g, '\\\\');
            return str;
        },
        viewSopCallback() {
            this.sopShow = false;
        },
        ch(obj, key, check) {
            if (!check) {
                obj.check.splice(obj.check.indexOf(key), 1);
            } else {
                obj.check.push(key);
            }
            console.log(obj, this.projectarr);
        },
        move(name, namehead) {
            //  $(`.${name}`).addClass('center')
            let left = $(`.${name}`).width() / 2 + 'px';
            let top = $(`.${name}`).height() / 2 + 'px';
            $(`.${name}`)[0].style.left = `calc(50% - ${left})`;
            $(`.${name}`)[0].style.top = `calc(50% - ${top})`;
        },
        sx() {
            let that = this;
            setTimeout(() => {
                for (let i = 0; i < $('.el-picker-panel').length; i++) {
                    $('.el-picker-panel')[i].style.zoom = that.zoom;
                }
                for (let i = 0; i < $('.el-select-dropdown').length; i++) {
                    $('.el-select-dropdown')[i].style.zoom = that.zoom;
                }
            });
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
        preservation6() {
            this.tipchange = true;
            this.deltrue = false;
            this.tipword = '是否保存当前修改?';
        },
        no1() {
            this.tipchange = false;
        },
        yes1() {
            let ProjectAnswerGroup = [];
            this.projectarr.forEach(pr => {
                let { Projects } = pr;
                console.log('++++', pr);
                Projects.forEach(item => {
                    console.log(item);
                    let Answer = '';
                    if (item.Type === 4) {
                        let list = item.Reference.split('|');
                        list.forEach(e => {
                            Answer += item.check.includes(e) ? '1' : '0';
                        });
                        // Answer = item.check.toString().replace(/,/g, "")
                    } else if (item.Type === 2) {
                        Answer = item.Answer == 1 ? '10' : '01';
                    } else {
                        Answer = item.Answer;
                    }
                    ProjectAnswerGroup.push({
                        ProjectID: item.PID,
                        Answer
                    });
                });
            });
            this.$axios
                .post(
                    '/api/PointInspectionManage/PointInspectionManage_ModifyRecord',
                    {
                        TaskID: this.sesstion.ID,
                        ProjectAnswerGroup
                    }
                )
                .then(res => {
                    if (res.data.code === 0) {
                        this.no1();
                        this.tipchange = false;
                        this.setionchange = false;
                    }
                    this.tipchange = true;
                    this.deltrue = true;
                    this.tipword = res.data.msg;
                    setTimeout(() => {
                        this.move('tip', 'tiphead');
                    });
                    this.onetable();
                });
        },
        handleEdit(a, bb, isEdit) {
            console.log(a, bb, isEdit);
            let b = JSON.parse(JSON.stringify(bb));
            if (!this.ckshow) {
                setTimeout(() => {
                    this.tipchange = true;
                    this.move('tip', 'tiphead');
                });
                this.tipword = this.lang.NoOperationAuthority;
                return;
            }
            this.isEdit = isEdit;
            this.sestion = !isEdit ? 1 : 2;
            b.Devices.forEach(item => {
                item.Projects.forEach(items => {
                    if (items.Type == 2) {
                        items.Referencearr = items.Reference.split('|');
                        if (items.Answer == '01') {
                            items.Answer = 0;
                        } else if (items.Answer == '10') {
                            items.Answer = 1;
                        }
                    } else if (items.Type == 4) {
                        items.Referencearr = items.Reference.split('|');
                        items.check = [];
                        if (items.Answer) {
                            for (let i = 0; i < items.Answer.length; i++) {
                                console.log(
                                    '+++',
                                    items.Answer[i],
                                    items.Answer[i] == '1'
                                );
                                if (items.Answer[i] == '1') {
                                    items.check.push(items.Referencearr[i]);
                                }
                            }
                        }
                        console.log('++++: ', items);
                    }
                });
            });
            this.setionchange = true;
            setTimeout(() => {
                this.move('sestion', 'sestionheader1');
            });

            this.disabled = true;
            this.sesstion = b;
            console.log(b.Devices);
            b.Devices[0].ID = b.ID;
            this.projectarr = JSON.parse(JSON.stringify(b.Devices));
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
            //  console.log(this.PageData)
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
        toNumber(value) {
            return Number(value);
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
                    `/api/PointInspectionManage/PointInspectionManage_GstRecord?argDeviceType=${c}&argStartTime=${this.value1}&argTaskStatus=${a}&argEndTime=${this.value2}&argKeyword=${this.keyword}&argPageSize=${this.PageData.PageSize}&argPageIndex=${this.PageData.PageIndex}`
                )
                .then(res => {
                    console.log(res);
                    if (res.data.code == 0) {
                        this.tableData1 = res.data.data.DataList;
                        this.PageData = res.data.data.ParameterList;
                        let i = 0;
                        for (i in this.tableData1) {
                            this.tableData1[i].EndTime = this.gettime(
                                this.tableData1[i].EndTime
                            );
                            this.tableData1[i].FinishTime = this.gettime(
                                this.tableData1[i].FinishTime
                            );
                            this.tableData1[i].StartTime = this.gettime(
                                this.tableData1[i].StartTime
                            );
                            let a = i;
                            this.tableData1[i].Number = ++a;
                            if (this.tableData1[i].Status == 4) {
                                this.tableData1[
                                    i
                                ].Status = this.lang.MaintenanceManage_Closed;
                            } else if (this.tableData1[i].Status == 5) {
                                this.tableData1[
                                    i
                                ].Status = this.lang.MaintenanceManage_Completed;
                            } else if (this.tableData1[i].Status == 6) {
                                this.tableData1[
                                    i
                                ].Status = this.lang.MaintenanceManage_TimeoutCompleted;
                            } else if (this.tableData1[i].Status == 7) {
                                this.tableData1[
                                    i
                                ].Status = this.lang.MaintenanceManage_Expired;
                            } else if (
                                this.tableData1[i].Status == 1 ||
                                this.tableData1[i].Status == 0
                            ) {
                                this.tableData1[
                                    i
                                ].Status = this.lang.MaintenanceManage_NotStarted;
                            } else if (this.tableData1[i].Status == 2) {
                                this.tableData1[
                                    i
                                ].Status = this.lang.MaintenanceManage_Ongoing;
                            } else if (this.tableData1[i].Status == 3) {
                                this.tableData1[
                                    i
                                ].Status = this.lang.MaintenanceManage_Delayed;
                            }
                        }
                    } else {
                        this.tipchange = true;
                        setTimeout(() => {
                            this.move('tip', 'tiphead');
                        });
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
                        return;
                    }
                }
            }

            this.PageData.PageIndex = this.nowpage;
            this.onetable();
        },
        sad(a) {
            if (!this.cxshow && a !== 1) {
                setTimeout(() => {
                    this.tipchange = true;
                    this.move('tip', 'tiphead');
                });
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
                this.tipword = this.lang.AlarmRecord_HT_TheQueryDate;
                return;
            }
            this.onetable();
        },
        exportTab() {
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
            this.$axios({
                method: 'get',
                url: `/api/PointInspectionManage/Export?argDeviceType=${c}&argStartTime=${encodeURIComponent(
                    this.value1
                )}&argTaskStatus=${encodeURIComponent(a)}
                        &argEndTime=${encodeURIComponent(
                            this.value2
                        )}&argKeyword=${encodeURIComponent(this.keyword)}`,
                responseType: 'blob'
            }).then(res => {
                const blob = new Blob([res.data], {
                    type: 'application/x-xls;charset=utf-8'
                });
                // 兼容不同浏览器的URL对象
                // @ts-expect-error
                const url = window.URL || window.webkitURL || window.moxURL;
                // 创建下载链接
                const downloadHref = url.createObjectURL(blob);
                // 创建a标签并为其添加属性
                let downloadLink = document.createElement('a');
                downloadLink.href = downloadHref;
                downloadLink.download = '点巡检记录.xls';
                // 触发点击事件执行下载
                downloadLink.click();
                window.URL.revokeObjectURL(url);
            });
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
            // this.$axios
            //     .post(
            //         `/api/PointInspectionManage/PointInspectionManage_GstRecordInitTime`
            //     )
            //     .then(res => {
            //         console.log('sss', res);
            //         this.value1 = res.data.data.StartTime;
            //         this.value2 = res.data.data.EndTime;
            //         let a = new Date(
            //             new Date(new Date().toLocaleDateString()).getTime() +
            //                 24 * 60 * 60 * 1000 -
            //                 1
            //         ).getTime();
            //         if (new Date(this.value2).getTime() < a) {
            //             this.value2 = this.GMTToStr(
            //                 new Date(
            //                     new Date().toLocaleDateString()
            //                 ).getTime() +
            //                     24 * 60 * 60 * 1000 -
            //                     1
            //             );
            //         }
            //     })
            //     .then(() => {
            //         this.sad(1);
            //     })
            // .catch(() => {
            this.value1 = this.GMTToStr(this.value1);
            this.value2 = this.GMTToStr(this.value2);
            this.sad(1);
            // });
        }
    },
    mounted() {
        this.value1 = this.GMTToStr(this.value1);
        this.value2 = this.GMTToStr(this.value2);
        this.getsetime();
        console.log(this.tableData);
    }
};
</script>

<style lang="scss" scoped>
.public-table {
    .el-radio__label {
        padding-left: 5px;
    }
}
</style>

<style lang="scss" scoped>
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
    z-index: 30;
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
        line-height: 30px;
        text-align: center;
        margin-left: 35px;
        height: 30px;
        background-color: #f3e3ad;
    }

    .delclass {
        width: 330px;
        line-height: 30px;
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
    .title {
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
        border: 1px solid #e0e0e0;
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
        vertical-align: middle;
        cursor: pointer;
    }

    .export {
        width: 120px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        border: 1px solid #fda100;
        background-color: #fff;
        margin-top: 10px;
        border-radius: 4px;
        color: #fda100;
        font-weight: 600;
        float: right;
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
    z-index: 29;
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
    left: 500px;
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
    .hometop {
        display: flex;
        width: 100%;

        div {
            margin-right: 10px;
        }

        .line {
            flex: 1;
            height: 1px;
            background-color: #dddddd;
            margin-top: 11px;
        }
    }
    span {
        color: #363636;
        font-size: 14px;
        margin-right: 20px;
        vertical-align: middle;
        line-height: 1;
    }
}
.overflow1 {
    position: relative;
    left: -20px;
}
.overflow {
    // overflow: hidden;
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
        display: inline-block;
        width: 50%;
        margin-bottom: 10px;

        span {
            display: inline-block;
            width: 65px;
            text-align: right;
        }
    }
    .zr {
        width: 25%;
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
.twice {
    float: left;
    .mx {
        // float: right;
        // width: 87%;
        border-bottom: 1px solid #cccccc;
        padding-bottom: 10px;
        padding-top: 10px;
        overflow: hidden;

        .num {
            float: left;
            width: 24px;
            height: 24px;
            color: #fff;
            border-radius: 50%;
            text-align: center;
            background-color: #386df0;
        }
        .item-sop {
            font-size: 14px;
            padding-top: 5px;
            width: 100%;
            display: flex;
            .sop {
                margin-left: 5px;
                color: #386df0;
                cursor: pointer;
            }
            .sopImg {
                height: 28px;
                margin-left: 10px;
                margin-bottom: 10px;
                cursor: pointer;
            }
        }
        .nur {
            .nurword {
                font-size: 14px;
                margin-left: 10px;
            }
            float: right;
            font-size: 12px;
            width: calc(100% - 24px);
            line-height: 25px;
            .nl {
                margin: 10px 0 0 10px;
                float: left;
                margin-right: 20px;
                input {
                    margin-left: 10px;
                    height: 24px;
                    text-indent: 1em;
                    width: 65px;
                }
            }
        }
    }
    .sl {
        display: inline-block;
        margin-top: 10px;
        margin-left: 10px;
        vertical-align: top;
    }
    width: 670px;
    padding-bottom: 20px;
    border: 2px solid #cccccc;
    margin: 20px 0px 0px 20px;
    background: #eeeeee;
    .inptwice {
        overflow: hidden;

        margin-top: 20px;
        margin-bottom: 20px;
        .fl {
            float: left;
            margin-left: 10px;
            span {
                display: inline-block;
                max-width: 90px;
                line-height: 1;
                vertical-align: middle;
            }
            input {
                width: 200px;
                height: 36px;
                text-indent: 1em;
            }
        }
        .zr {
            float: right;
            margin-right: 10px;
            span {
                display: inline-block;
                max-width: 90px;
                line-height: 1;
                vertical-align: middle;
            }
            input {
                width: 150px;
                text-indent: 1em;
                height: 36px;
            }
            .sopBtn {
                display: inline-block;
                width: 80px;
                height: 36px;
                border-radius: 8px;
                color: #fff;
                background: #386df0;
                cursor: pointer;
                text-align: center;
                line-height: 36px;
                font-size: 14px;
                margin-left: 15px;
            }
        }
    }
}
.blueword {
    color: #386df0;
}
.redword {
    color: red !important;
}
.mx1 {
    width: 100%;
    height: 400px;
    overflow: auto;
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
.rwnrdiv {
    width: 695px;
    height: 46px;
    // overflow: hidden;
    position: relative;
    align-items: center;
    display: flex;
    input {
        position: absolute;
        right: 0;
    }
}
.rwnr {
    display: inline-block;
    width: 85px;
    left: -15px;
    height: 30px;
    text-align: right;
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto;
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
.Preservation {
    width: 100px;
    height: 34px;
    cursor: pointer;
    margin-top: 5px;
    background-color: #386df0;
    color: #ffffff;
    border-radius: 3px;
    text-align: center;
    float: right;
    line-height: 34px;
}
.cancel {
    cursor: pointer;
    width: 100px;
    height: 34px;
    float: right;
    margin-right: 20px;
    margin-top: 5px;
    background-color: #999999;
    color: #ffffff;
    border-radius: 3px;
    text-align: center;
    line-height: 34px;
}
</style>
