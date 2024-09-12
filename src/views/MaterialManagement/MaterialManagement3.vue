<template>
    <div class="material-management2">
        <div class="material-management2-box">
            <div class="material-content1">
                <div class="material-title">物料BOM管理</div>

                <div class="material-search">
                    <div>机型</div>
                    <el-select
                        v-model="DrawingNo"
                        filterable
                        :style="[
                            { fontSize: '16px' },
                            { width: '120px' },
                            { height: '40px' },
                            { marginLeft: '15px' },
                            { marginRight: '15px' }
                        ]"
                    >
                        <el-option
                            v-for="item in DrawingNoList"
                            :key="item"
                            :label="item"
                            :value="item"
                        ></el-option>
                    </el-select>
                    <div class="btn greenBtn" @click="openAddOrEditBOM('add')">
                        新建BOM表
                    </div>
                    <div
                        class="btn yellowBtn"
                        @click="openAddOrEditBOM('edit')"
                    >
                        修改BOM表
                    </div>
                    <!-- <div class="btn">
                        导入
                        <a href="javascript:;" class="file">
                            <input
                                type="file"
                                ref="upload"
                                accept=".xls, .xlsx"
                                class="outputlist_upload"
                            />
                        </a>
                    </div> -->
                    <el-upload
                        action="#"
                        accept=".xls, .xlsx"
                        :show-file-list="false"
                        :http-request="uploadFn"
                    >
                        <div class="btn" @click="beforeImport">
                            导入
                        </div>
                    </el-upload>

                    <div class="btn" @click="exportFn">导出</div>
                </div>
                <div class="material-table">
                    <el-table
                        :data="BomsList"
                        border
                        highlight-current-row
                        header-row-class-name="light-blue"
                        row-class-name="high-light"
                        height="100%"
                        width="100%"
                        :style="{ 'font-size': 14 + 'px' }"
                        ref="BomsListtable"
                        :header-cell-style="{
                            background:
                                $store.state.color == 'grey'
                                    ? '#D9DBDE'
                                    : '#5a6c98',
                            color:
                                $store.state.color == 'grey' ? '#000' : '#fff',
                            'border-left': '1px solid #cccccc',
                            height: 50 + 'px',
                            'font-size': 14 + 'px',
                            padding: '0'
                        }"
                        @row-click="selectBomsList"
                    >
                        <template slot="empty">
                            <span>暂无数据</span>
                        </template>

                        <el-table-column
                            label="序号"
                            prop="Number"
                            width="100"
                        ></el-table-column>
                        <el-table-column
                            label="物料描述"
                            prop="ComponentDesc"
                            :show-overflow-tooltip="true"
                        >
                        </el-table-column>
                        <el-table-column
                            label="父级物料图号"
                            prop="ParentComponentNo"
                            :show-overflow-tooltip="true"
                        >
                        </el-table-column>
                        <el-table-column
                            label="物料图号"
                            prop="ComponentNo"
                            :show-overflow-tooltip="true"
                        >
                        </el-table-column>
                        <el-table-column
                            label="单位"
                            prop="Unit"
                            :show-overflow-tooltip="true"
                        >
                        </el-table-column>
                        <el-table-column
                            label="单次使用量"
                            prop="OnceUsage"
                            :show-overflow-tooltip="true"
                        >
                        </el-table-column>
                        <!-- <el-table-column
                            label="工序"
                            prop="WorkStepName"
                            :show-overflow-tooltip="true"
                        >
                        </el-table-column> -->
                    </el-table>
                </div>
            </div>
            <div class="material-content2">
                <div class="material-title">物料批次管理</div>
                <div class="material-search">
                    <!-- <div>工序</div>
                    <el-input
                        v-model="curBOMItem.WorkStepName"
                        disabled
                        :style="[
                            { fontSize: '16px' },
                            { width: '120px' },
                            { height: '40px' },
                            { marginLeft: '15px' },
                            { marginRight: '15px' }
                        ]"
                    ></el-input> -->
                    <div>料仓</div>
                    <el-select
                        v-model="rightDeviceId"
                        filterable
                        :style="[
                            { fontSize: '16px' },
                            { width: '120px' },
                            { height: '40px' },
                            { marginLeft: '15px' },
                            { marginRight: '15px' }
                        ]"
                    >
                        <el-option
                            v-for="item in rightDeviceIdList"
                            :key="item.Id"
                            :label="item.Name"
                            :value="item.Id"
                        ></el-option>
                    </el-select>
                    <div class="btn greenBtn" @click="openComponentEntryShow">
                        物料录入
                    </div>
                    <div class="btn yellowBtn" @click="openscheduleSettings">
                        计划设置
                    </div>
                    <div class="btn cancleBtn" @click="beforeDelRightItem">
                        删除
                    </div>
                    <div
                        class="btn greenBtn"
                        @click="openSupplierInformationShow"
                    >
                        供应商设置
                    </div>
                    <!-- <div class="btn" @click="exportFn0">导出</div> -->
                </div>
                <div class="material-table">
                    <el-table
                        :data="rightList"
                        border
                        highlight-current-row
                        header-row-class-name="light-blue"
                        row-class-name="high-light"
                        height="100%"
                        width="100%"
                        :style="{ 'font-size': 14 + 'px' }"
                        :header-cell-style="{
                            background:
                                $store.state.color == 'grey'
                                    ? '#D9DBDE'
                                    : '#5a6c98',
                            color:
                                $store.state.color == 'grey' ? '#000' : '#fff',
                            'border-left': '1px solid #cccccc',
                            height: 50 + 'px',
                            'font-size': 14 + 'px',
                            padding: '0'
                        }"
                        @row-click="selectRightListItem"
                    >
                        <template slot="empty">
                            <span>暂无数据</span>
                        </template>
                        <el-table-column
                            label="序号"
                            prop="Number"
                            width="100"
                        ></el-table-column>
                        <el-table-column
                            label="物料图号"
                            prop="ComponentNo"
                            :show-overflow-tooltip="true"
                        >
                        </el-table-column>
                        <el-table-column
                            label="供应商代号"
                            prop="SupplierNo"
                            :show-overflow-tooltip="true"
                        >
                        </el-table-column>

                        <el-table-column
                            label="批次号"
                            prop="BatchNo"
                            :show-overflow-tooltip="true"
                        >
                        </el-table-column>
                        <el-table-column
                            label="供应商名称"
                            prop="SupplierName"
                            :show-overflow-tooltip="true"
                        >
                        </el-table-column>

                        <el-table-column
                            label="物料总量"
                            prop="Total"
                            :show-overflow-tooltip="true"
                        >
                        </el-table-column>

                        <el-table-column
                            label="物料剩余量"
                            prop="Rest"
                            :show-overflow-tooltip="true"
                        >
                        </el-table-column>
                        <el-table-column
                            label="计划用量（今日）"
                            prop="TodayPlan"
                            width="150"
                            :show-overflow-tooltip="true"
                        >
                        </el-table-column>
                        <el-table-column
                            label="当前用量"
                            prop="Usage"
                            :show-overflow-tooltip="true"
                        >
                        </el-table-column>
                        <el-table-column label="操作">
                            <template slot-scope="scope">
                                <div
                                    class="editbtn"
                                    @click="editBatchFn(scope.row)"
                                >
                                    编辑
                                </div>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </div>
        </div>

        <div
            class="SupplierInformation"
            ref="SupplierInformation"
            v-if="SupplierInformationShow"
        >
            <div class="poptop">
                <div
                    class="tiptop-drag"
                    @mousedown="mouseDownHandleelse7($event)"
                    @mouseup="mouseUpHandleelse($event)"
                ></div>
                <span>供应商信息</span>
                <img
                    class="closeWind"
                    @click="closeSupplierInformationShow"
                    src="../../assets/images/close-big-default.png"
                    alt=""
                />
            </div>
            <div class="PopContent">
                <div class="addOrEditBOM-search">
                    <div class="addOrEditBOM-right">
                        <div
                            class="btn greenBtn"
                            @click="openAddSupplierInformationShow"
                        >
                            添加
                        </div>
                        <div
                            class="btn greyBtn"
                            @click="delSupplierInformation"
                        >
                            删除
                        </div>
                    </div>
                </div>
                <div class="addOrEditBOM-content">
                    <el-table
                        :data="SupplierList"
                        highlight-current-row
                        height="100%"
                        width="100%"
                        :header-cell-style="{
                            background: '#DCF0F9',
                            color: '#4270E4',
                            'border-left': '1px solid #cccccc',
                            height: 50 + 'px',
                            'font-size': 14 + 'px',
                            padding: '0'
                        }"
                        @row-click="selectSupplierList"
                    >
                        <template slot="empty">
                            <span>暂无数据</span>
                        </template>
                        <el-table-column
                            label="序号"
                            type="index"
                            width="100"
                        ></el-table-column>
                        <el-table-column label="供应商代号" prop="No">
                            <template slot-scope="scope">
                                <el-input v-model="scope.row.No" />
                            </template>
                        </el-table-column>
                        <el-table-column label="供应商名称" prop="Name">
                            <template slot-scope="scope">
                                <el-input v-model="scope.row.Name" />
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                <div class="addOrEditBOM-footer">
                    <div
                        class="btn cancleBtn"
                        @click="closeSupplierInformationShow"
                    >
                        取消
                    </div>
                    <div class="btn" @click="sumbitSupplierInformationShow">
                        确定
                    </div>
                </div>
            </div>
        </div>

        <!-- <div
            class="addSupplierInformation"
            ref="addSupplierInformationPop"
            v-if="AddSupplierInformationShow"
        >
            <div class="Materialtop">
                <div
                    class="material-drag"
                    @mousedown="mouseDownHandleelse8($event)"
                    @mouseup="mouseUpHandleelse($event)"
                ></div>
                <span>添加供应商信息</span>
                <img
                    @click="closeAddSupplierInformationShow"
                    class="closMaterial"
                    src="../../assets/images/close-big-default.png"
                    alt=""
                />
            </div>
            <div class="addMaterial-content">
                <div class="addMaterial-item">
                    <div class="addMaterial-key">供应商代号</div>
                    <input
                        class="addMaterial-input"
                        v-model="addSupplierInput1"
                    />
                </div>
                <div class="addMaterial-item">
                    <div class="addMaterial-key">供应商名称</div>
                    <input
                        class="addMaterial-input"
                        v-model="addSupplierInput2"
                    />
                </div>
            </div>
            <div class="addMaterial-footer">
                <div
                    class="btn cancleBtn"
                    @click="closeAddSupplierInformationShow"
                >
                    取消
                </div>
                <div class="btn" @click="sumbitAddSupplierInformationShow">
                    确定
                </div>
            </div>
        </div> -->

        <div
            class="ComponentEntry"
            ref="ComponentEntry"
            v-if="ComponentEntryShow"
        >
            <div class="poptop">
                <div
                    class="tiptop-drag"
                    @mousedown="mouseDownHandleelse11($event)"
                    @mouseup="mouseUpHandleelse($event)"
                ></div>
                <span>组件录入</span>
                <img
                    class="closeWind"
                    @click="closeComponentEntryShow"
                    src="../../assets/images/close-big-default.png"
                    alt=""
                />
            </div>
            <div class="PopContent">
                <div class="addOrEditBOM-search">
                    <el-input
                        v-model="scanInput"
                        placeholder="扫描二维码"
                        :style="[
                            { fontSize: '16px' },
                            { width: '300px' },
                            { height: '40px' },
                            { margin: '0 10px 0 0' }
                        ]"
                        @input="checkScan()"
                    ></el-input>
                    <div class="btn greenBtn" @click="addTempScanList">
                        添加
                    </div>
                    <div class="btn greyBtn" @click="delTempScanList">删除</div>
                </div>
                <div class="addOrEditBOM-content">
                    <el-table
                        :data="scanList"
                        height="100%"
                        width="100%"
                        :header-cell-style="{
                            background: '#DCF0F9',
                            color: '#4270E4',
                            'border-left': '1px solid #cccccc',
                            height: 50 + 'px',
                            'font-size': 14 + 'px',
                            padding: '0'
                        }"
                        highlight-current-row
                        @row-click="selectScanTemp"
                    >
                        <template slot="empty">
                            <span>暂无数据</span>
                        </template>
                        <el-table-column
                            label="序号"
                            type="index"
                            width="100"
                        ></el-table-column>
                        <el-table-column label="物料图号" prop="ComponentNo">
                            <template slot-scope="scope">
                                <el-input v-model="scope.row.ComponentNo" />
                            </template>
                        </el-table-column>
                        <el-table-column label="供应商代号" prop="SupplierNo">
                            <template slot-scope="scope">
                                <el-input v-model="scope.row.SupplierNo" />
                            </template>
                        </el-table-column>
                        <el-table-column label="批次号" prop="BatchNo">
                            <template slot-scope="scope">
                                <el-input v-model="scope.row.BatchNo" />
                            </template>
                        </el-table-column>
                        <el-table-column label="物料总量">
                            <template slot-scope="scope">
                                <el-input v-model="scope.row.Total" />
                            </template>
                        </el-table-column>
                        <el-table-column label="单位">
                            <template>
                                {{ this.curBOMItem.Unit }}
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                <div class="addOrEditBOM-footer">
                    <div class="btn cancleBtn" @click="closeComponentEntryShow">
                        取消
                    </div>
                    <div class="btn" @click="sumbitComponentEntryShow">
                        确定
                    </div>
                </div>
            </div>
        </div>

        <div
            class="scheduleSettings"
            ref="scheduleSettings"
            v-if="scheduleSettingsShow"
        >
            <div class="poptop">
                <div
                    class="tiptop-drag"
                    @mousedown="mouseDownHandleelse10($event)"
                    @mouseup="mouseUpHandleelse($event)"
                ></div>
                <span>计划设置</span>
                <img
                    class="closeWind"
                    @click="closescheduleSettings"
                    src="../../assets/images/close-big-default.png"
                    alt=""
                />
            </div>
            <div class="PopContent">
                <div class="addOrEditBOM-search"></div>
                <div class="addOrEditBOM-content">
                    <el-table
                        :data="BatchPlanList"
                        height="100%"
                        width="100%"
                        :header-cell-style="{
                            background: '#DCF0F9',
                            color: '#4270E4',
                            'border-left': '1px solid #cccccc',
                            height: 50 + 'px',
                            'font-size': 14 + 'px',
                            padding: '0'
                        }"
                    >
                        <template slot="empty">
                            <span>暂无数据</span>
                        </template>
                        <el-table-column
                            label="序号"
                            prop="Number"
                            width="100"
                        ></el-table-column>
                        <el-table-column
                            label="组件描述"
                            prop="CompentDesc"
                        ></el-table-column>
                        <el-table-column
                            label="组件编码"
                            prop="CompentNo"
                        ></el-table-column>
                        <el-table-column
                            label="工序"
                            prop="Device"
                        ></el-table-column>
                        <el-table-column
                            label="计划用量（今日）"
                            prop="PlanAmount"
                        >
                            <template slot-scope="scope">
                                <el-input v-model="scope.row.PlanAmount" />
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                <div class="addOrEditBOM-footer">
                    <div class="btn cancleBtn" @click="closescheduleSettings">
                        取消
                    </div>
                    <div class="btn" @click="sumbitscheduleSettings">确定</div>
                </div>
            </div>
        </div>

        <div class="addOrEditBOM" ref="addOrEditBOM" v-if="addOrEditBOMShow">
            <div class="poptop">
                <div
                    class="tiptop-drag"
                    @mousedown="mouseDownHandleelse3($event)"
                    @mouseup="mouseUpHandleelse($event)"
                ></div>
                <span v-show="addOrEditBOMType == 'add'">新增BOM表</span>
                <span v-show="addOrEditBOMType == 'edit'">修改BOM表</span>
                <img
                    @click="closeAddOrEditBOM"
                    class="closeWind"
                    src="../../assets/images/close-big-default.png"
                    alt=""
                />
            </div>
            <div class="PopContent">
                <div class="addOrEditBOM-search">
                    <div>机型：</div>
                    <el-input
                        :disabled="addOrEditBOMType == 'edit'"
                        v-model="addOrEditBOMInput1"
                        placeholder="请输入"
                        :style="[
                            { fontSize: '16px' },
                            { width: '300px' },
                            { height: '40px' },
                            { margin: '0 10px' }
                        ]"
                    ></el-input>
                    <div class="addOrEditBOM-right">
                        <div class="btn greenBtn" @click="addTempBomList">
                            添加
                        </div>
                        <div class="btn greyBtn" @click="delTempBomList">
                            删除
                        </div>
                    </div>
                </div>
                <div class="addOrEditBOM-content">
                    <el-table
                        :data="addOrEditBOMList"
                        height="100%"
                        width="100%"
                        ref="addOrEditBOMListTable"
                        :header-cell-style="{
                            background: '#DCF0F9',
                            color: '#4270E4',
                            'border-left': '1px solid #cccccc',
                            height: 50 + 'px',
                            'font-size': 14 + 'px',
                            padding: '0'
                        }"
                        highlight-current-row
                        @row-click="selectAddOrEditBOMTemp"
                    >
                        <template slot="empty">
                            <span>暂无数据</span>
                        </template>

                        <el-table-column
                            label="序号"
                            type="index"
                            width="100"
                        ></el-table-column>
                        <el-table-column
                            label="物料描述"
                            :show-overflow-tooltip="true"
                            ><template slot-scope="scope">
                                <el-input v-model="scope.row.ComponentDesc" />
                            </template>
                        </el-table-column>
                        <el-table-column
                            label="父级物料图号"
                            :show-overflow-tooltip="true"
                            ><template slot-scope="scope">
                                <el-input
                                    v-model="scope.row.ParentComponentNo"
                                />
                            </template>
                        </el-table-column>
                        <el-table-column
                            label="物料图号"
                            :show-overflow-tooltip="true"
                        >
                            <template slot-scope="scope">
                                <el-input v-model="scope.row.ComponentNo" />
                            </template>
                        </el-table-column>
                        <el-table-column
                            label="单位"
                            :show-overflow-tooltip="true"
                        >
                            <template slot-scope="scope">
                                <el-input v-model="scope.row.Unit" />
                            </template>
                        </el-table-column>
                        <el-table-column
                            label="单次使用量"
                            :show-overflow-tooltip="true"
                        >
                            <template slot-scope="scope">
                                <el-input v-model="scope.row.OnceUsage" />
                            </template>
                        </el-table-column>
                        <!-- <el-table-column
                            label="工序"
                            :show-overflow-tooltip="true"
                        >
                            <template slot-scope="scope">
                                <el-select v-model="scope.row.DeviceId">
                                    <el-option
                                        v-for="item in MaterielDevicesList"
                                        :key="item.Id"
                                        :label="item.Name"
                                        :value="item.Id"
                                    ></el-option>
                                </el-select>
                            </template>
                        </el-table-column> -->
                    </el-table>
                </div>
                <div class="addOrEditBOM-footer">
                    <div class="btn cancleBtn" @click="closeAddOrEditBOM">
                        取消
                    </div>
                    <div class="btn" @click="sumbitAddOrEditBOM">确定</div>
                </div>
            </div>
        </div>

        <div class="tip" ref="kongtiao2" v-if="tipchange">
            <div
                class="tiptop"
                @mousedown="mouseDownHandleelse2($event)"
                @mouseup="mouseUpHandleelse($event)"
            >
                <img :src="require('../../assets/images/gth.png')" alt />
                <span>提示</span>
            </div>
            <div class="tipcontanin">
                <div class="tipword" v-if="deltrue">{{ tipword }}</div>
                <div class="w" v-if="!deltrue">{{ tipword }}</div>
                <div class="tipdetermine" @click="tip1" v-if="deltrue">
                    确定
                </div>
                <div class="delclass" v-if="!deltrue">
                    <div class="one" @click="no1">否</div>
                    <div class="two" @click="yes1">是</div>
                </div>
            </div>
        </div>
        <div class="cover1" v-if="setionchange"></div>
        <EditBatchPop
            v-if="editBatchShow"
            :row="editBatchRow"
            @callback="editBatchClose"
        />
    </div>
</template>

<script>
import XLSX from 'xlsx';
import EditBatchPop from './EditBatchPop';
export default {
    components: { EditBatchPop },
    data() {
        return {
            editBatchShow: false,
            editBatchRow: null,
            lang: JSON.parse(localStorage.getItem('languages'))[
                localStorage.getItem('currentLang')
            ],
            deltrue: true,
            tipword: '',
            tipchange: false,
            scheduleSettingsShow: false,
            addMaterialShow: false,
            jurisdictionRadio: 1,
            SupplierInformationShow: false,
            // AddSupplierInformationShow: false,
            ComponentEntryShow: false,
            addOrEditBOMShow: false,
            addOrEditBOMType: '', //add 、 edit
            addOrEditBOMList: [],
            delAddOrEditBOMs: [], //勾选列表，删除用
            rowNum: 1, //计数器，保持唯一性
            addOrEditBOMInput1: '',
            DrawingNoList: [],
            DrawingNo: '',
            BomsList: [],
            curBOMItem: {}, //左列表选中项
            curRightItem: {}, //右列表选中项
            MaterielDevicesList: [],
            MaterielDevices: {},
            rightDeviceIdList: [],
            rightDeviceId: '',
            rightList: [],
            scanInput: '',
            scanList: [],
            delScans: [], //勾选列表，删除用
            BatchPlanList: [], //计划设置
            addSupplierInput1: '',
            addSupplierInput2: '',
            SupplierList: [], //供应商
            curSupplierItem: [], //供应商勾选列表，删除用
            jurisdiction: [],
            buttonarr: [],
            scpcid: '',
            xjbomid: '',
            wllrid: '',
            bjwlpcid: '',
            jhszid: '',
            gysszid: '',
            drid: '',
            xgbomid: '',
            dcid: '',
            scpcshow: true,
            xjbomshow: true,
            wllrshow: true,
            bjwlpcshow: true,
            jhszshow: true,
            gysszshow: true,
            drshow: true,
            xgbomshow: true,
            dcshow: true
        };
    },
    computed: {
        setionchange() {
            return (
                this.addOrEditBOMShow ||
                this.SupplierInformationShow ||
                this.AddSupplierInformationShow ||
                this.ComponentEntryShow ||
                this.scheduleSettingsShow
            );
        },
        VpowerData() {
            return this.$store.state.btnPowerData;
        }
    },
    watch: {
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
                    // this.threeselect = this.projectlist3[0].Value;
                    this.threeselect = '不限';
                }
            }
            this.watchdata();
        },
        threeselect(val) {
            this.watchdata();
        },
        DrawingNo(n) {
            this.getBomsByDrawingNo();
        },
        curBOMItem(n) {
            //左列表选中
            this.getBatchesByBomIdAndGranaryId();
        },
        rightDeviceId(n) {
            //右侧列表
            if (n) {
                this.getBatchesByBomIdAndGranaryId();
            } else {
                this.rightList = [];
            }
        },
        VpowerData(val) {
            this.getPower();
        }
    },
    mounted() {
        this.getPower();
        this.getGranariesByDeviceId();
        this.$refs.upload.addEventListener('change', e => {
            //绑定监听表格导入事件
            this.readExcel(e);
        });
    },
    created() {
        this.getDrawingNos();
        this.getMaterielDevices();
    },
    methods: {
        getPower() {
            this.jurisdiction = this.$store.state.btnPowerData;
            console.log('saddasdas', this.GetUrlParam('id'));
            console.log('asddaadsads', this.jurisdiction);
            this.buttonarr = this.findPathByLeafId(
                this.GetUrlParam('id'),
                this.jurisdiction
            )[0].Children;
            console.log('nbb', this.buttonarr);
            this.buttonarr.forEach(item => {
                if (item.RightName == '物料BOM表-删除批次') {
                    this.scpcid = item.RightID;
                } else if (item.RightName == '物料BOM表-新建BOM') {
                    this.xjbomid = item.RightID;
                } else if (item.RightName == '物料BOM表-物料录入') {
                    this.wllrid = item.RightID;
                } else if (item.RightName == '物料BOM表-编辑物料批次') {
                    this.bjwlpcid = item.RightID;
                } else if (item.RightName == '物料BOM表-计划设置') {
                    this.jhszid = item.RightID;
                } else if (item.RightName == '物料BOM表-供应商设置') {
                    this.gysszid = item.RightID;
                } else if (item.RightName == '物料BOM表-导入按钮') {
                    this.drid = item.RightID;
                } else if (item.RightName == '物料BOM表-修改BOM') {
                    this.xgbomid = item.RightID;
                } else if (item.RightName == '物料BOM表-导出按钮') {
                    this.dcid = item.RightID;
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
                url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.scpcid}`
            })
                .then(res => {
                    this.scpcshow = res.data.data;
                })
                .catch(err => {
                    console.log('err', err);
                });

            this.$axios({
                method: 'post',
                url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.xjbomid}`
            })
                .then(res => {
                    this.xjbomshow = res.data.data;
                })
                .catch(err => {
                    console.log('err', err);
                });
            this.$axios({
                method: 'post',
                url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.wllrid}`
            })
                .then(res => {
                    this.wllrshow = res.data.data;
                })
                .catch(err => {
                    console.log('err', err);
                });
            this.$axios({
                method: 'post',
                url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.bjwlpcid}`
            })
                .then(res => {
                    this.bjwlpcshow = res.data.data;
                })
                .catch(err => {
                    console.log('err', err);
                });
            this.$axios({
                method: 'post',
                url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.jhszid}`
            })
                .then(res => {
                    this.jhszshow = res.data.data;
                })
                .catch(err => {
                    console.log('err', err);
                });
            this.$axios({
                method: 'post',
                url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.gysszid}`
            })
                .then(res => {
                    this.gysszshow = res.data.data;
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
                url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.xgbomid}`
            })
                .then(res => {
                    this.xgbomshow = res.data.data;
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
        editBatchFn(row) {
            if (!this.bjwlpcshow) {
                this.tipword = '该用户没有权限操作';
                this.tipchange = true;
                return;
            }
            this.editBatchRow = row;
            this.editBatchShow = true;
        },
        editBatchClose(str) {
            this.editBatchShow = false;
            this.editBatchRow = null;
            if (str) {
                this.tipchange = true;
                this.tipword = str;
            }
            this.getBatchesByBomIdAndGranaryId();
        },
        getDrawingNos() {
            this.$axios({
                method: 'GET',
                url: `/api/MaterielBom/GetDrawingNos`
            }).then(res => {
                if (res.data.code === 0) {
                    this.DrawingNoList = res.data.data;
                    this.DrawingNo = res.data.data[0];
                } else {
                    this.tipword = res.data.msg;
                    this.tipchange = true;
                }
            });
        },
        getBomsByDrawingNo() {
            this.curBOMItem = {};
            this.$axios({
                method: 'GET',
                url: `/api/MaterielBom/GetBomsByDrawingNo?drawingNo=${this.DrawingNo}`
            }).then(res => {
                if (res.data.code === 0) {
                    this.BomsList = res.data.data;
                    this.curBOMItem = null;
                    if (res.data.data.length) {
                        this.curBOMItem = res.data.data[0];
                    } else {
                        this.curBOMItem = {};
                    }
                    this.$refs.BomsListtable.setCurrentRow(this.BomsList[0]);
                } else {
                    this.tipword = res.data.msg;
                    this.tipchange = true;
                }
            });
        },
        //工序
        getMaterielDevices() {
            this.MaterielDevices = {};
            this.$axios({
                method: 'GET',
                url: `/api/MaterielBom/GetMaterielDevices`
            }).then(res => {
                if (res.data.code === 0) {
                    this.MaterielDevicesList = res.data.data;
                    if (res.data.data.length) {
                        this.MaterielDevices = res.data.data[0];
                    } else {
                        this.MaterielDevices = {};
                    }
                } else {
                    this.tipword = res.data.msg;
                    this.tipchange = true;
                }
            });
        },
        getGranariesByDeviceId() {
            this.rightDeviceId = '';
            this.$axios({
                method: 'GET',
                url: `/api/MaterielBom/GetGranaries`
            }).then(res => {
                if (res.data.code === 0) {
                    this.rightDeviceIdList = res.data.data;
                    if (res.data.data.length) {
                        this.rightDeviceId = res.data.data[0].Id;
                    } else {
                        this.rightDeviceId = '';
                    }
                } else {
                    this.tipword = res.data.msg;
                    this.tipchange = true;
                }
            });
        },
        getBatchesByBomIdAndGranaryId() {
            if (!this.curBOMItem || !this.curBOMItem.Id) {
                this.rightList = [];
                return;
            }
            this.$axios({
                method: 'GET',
                url: `/api/MaterielBom/GetBatchesByBomIdAndGranaryId?bomId=${this.curBOMItem.Id}&granaryId=${this.rightDeviceId}`
            }).then(res => {
                if (res.data.code === 0) {
                    this.rightList = res.data.data;
                } else {
                    this.tipword = res.data.msg;
                    this.tipchange = true;
                }
            });
        },
        selectBomsList(selection) {
            this.curBOMItem = selection;
        },
        selectRightListItem(selection) {
            this.curRightItem = selection;
        },
        openscheduleSettings() {
            if (!this.jhszshow) {
                this.tipword = '该用户没有权限操作';
                this.tipchange = true;
                return;
            }
            this.$axios({
                method: 'GET',
                url: `/api/MaterielBom/GetBatchPlans?bomId=${this.curBOMItem.Id}&granaryId=${this.rightDeviceId}`
            }).then(res => {
                if (res.data.code === 0) {
                    this.BatchPlanList = res.data.data;
                    this.scheduleSettingsShow = true;
                } else {
                    this.tipword = res.data.msg;
                    this.tipchange = true;
                }
            });
        },
        closescheduleSettings() {
            this.scheduleSettingsShow = false;
        },
        sumbitscheduleSettings() {
            this.$axios({
                method: 'post',
                url: `/api/MaterielBom/ModifyBatchPlans`,
                data: this.BatchPlanList
            }).then(res => {
                if (res.data.code === 0) {
                    this.tipword = '设置成功';
                    this.tipchange = true;
                    this.closescheduleSettings();
                    this.getBatchesByBomIdAndGranaryId();
                } else {
                    this.tipword = res.data.msg;
                    this.tipchange = true;
                }
            });
        },
        openAddOrEditBOM(type) {
            if (type == 'add' && !this.xjbomshow) {
                this.tipword = '该用户没有权限操作';
                this.tipchange = true;
                return;
            }
            if (type == 'edit' && !this.xgbomshow) {
                this.tipword = '该用户没有权限操作';
                this.tipchange = true;
                return;
            }
            this.addOrEditBOMShow = true;
            this.addOrEditBOMType = type;
            if (type == 'add') {
                this.addOrEditBOMList = [
                    {
                        rowNum: this.rowNum,
                        ComponentDesc: '',
                        ComponentNo: '',
                        Unit: '',
                        OnceUsage: '',
                        DeviceId: ''
                    }
                ];
                this.rowNum += 1;
            }
            if (type == 'edit') {
                this.addOrEditBOMInput1 = this.DrawingNo;
                this.addOrEditBOMList = [];
                this.BomsList.map(_ => {
                    this.addOrEditBOMList.push({
                        ..._,
                        rowNum: this.rowNum
                    });
                    this.rowNum += 1;
                });
            }
        },
        addTempBomList() {
            this.addOrEditBOMList.push({
                rowNum: this.rowNum,
                ComponentDesc: '',
                ComponentNo: '',
                Unit: '',
                OnceUsage: '',
                DeviceId: ''
            });
            this.rowNum += 1;
        },
        selectAddOrEditBOMTemp(selection) {
            this.delAddOrEditBOMs = [{ ...selection }];
        },
        delTempBomList() {
            console.log('eee');
            for (let i = 0; i < this.delAddOrEditBOMs.length; i++) {
                let val = this.delAddOrEditBOMs;
                val.forEach((val, index) => {
                    this.addOrEditBOMList.forEach((v, i) => {
                        if (val.rowNum === v.rowNum) {
                            this.addOrEditBOMList.splice(i, 1);
                        }
                    });
                });
            }
        },
        closeAddOrEditBOM() {
            this.addOrEditBOMInput1 = '';
            this.addOrEditBOMList = [];
            this.delAddOrEditBOMs = [];
            this.addOrEditBOMShow = false;
            this.addOrEditBOMType = '';
        },
        sumbitAddOrEditBOM() {
            if (this.addOrEditBOMType == 'add') {
                this.$axios({
                    method: 'post',
                    url: `/api/MaterielBom/AddBoms`,
                    data: {
                        DrawingNo: this.addOrEditBOMInput1,
                        Boms: this.addOrEditBOMList.map((_, idx) => ({
                            ..._,
                            Number: Number(idx) + 1
                        }))
                    }
                }).then(res => {
                    if (res.data.code === 0) {
                        this.tipword = '新建成功';
                        this.tipchange = true;
                        this.closeAddOrEditBOM();
                        this.getDrawingNos();
                    } else {
                        this.tipword = res.data.msg;
                        this.tipchange = true;
                    }
                });
            } else if (this.addOrEditBOMType == 'edit') {
                this.$axios({
                    method: 'post',
                    url: `/api/MaterielBom/ModifyBoms`,
                    data: {
                        DrawingNo: this.addOrEditBOMInput1,
                        Boms: this.addOrEditBOMList.map((_, idx) => ({
                            ..._,
                            Number: Number(idx) + 1
                        }))
                    }
                }).then(res => {
                    if (res.data.code === 0) {
                        this.tipword = '修改成功';
                        this.tipchange = true;
                        this.closeAddOrEditBOM();
                        this.getDrawingNos();
                    } else {
                        this.tipword = res.data.msg;
                        this.tipchange = true;
                    }
                });
            }
            this.getBomsByDrawingNo();
        },
        addTempScanList() {
            this.scanList.push({
                rowNum: this.rowNum,
                ComponentNo: '',
                SupplierNo: '',
                BatchNo: '',
                Total: ''
            });
            this.rowNum += 1;
        },
        selectScanTemp(selection) {
            this.delScans = [{ ...selection }];
        },
        delTempScanList() {
            for (let i = 0; i < this.delScans.length; i++) {
                let val = this.delScans;
                val.forEach((val, index) => {
                    this.scanList.forEach((v, i) => {
                        if (val.rowNum === v.rowNum) {
                            this.scanList.splice(i, 1);
                        }
                    });
                });
            }
        },
        closeComponentEntryShow() {
            this.scanList = [];
            this.delScans = [];
            this.ComponentEntryShow = false;
        },
        sumbitComponentEntryShow() {
            this.$axios({
                method: 'post',
                url: `/api/MaterielBom/AddBatches`,
                data: {
                    BomId: this.curBOMItem.Id,
                    GranaryId: this.rightDeviceId,
                    Batches: this.scanList.map((_, idx) => ({
                        ..._,
                        Number: Number(idx) + 1
                    }))
                }
            }).then(res => {
                if (res.data.code === 0) {
                    this.tipword = '录入成功';
                    this.tipchange = true;
                    this.closeComponentEntryShow();
                    this.getBatchesByBomIdAndGranaryId();
                } else {
                    this.tipword = res.data.msg;
                    this.tipchange = true;
                }
            });
        },
        checkScan() {
            if (this.scanInput.endsWith('|')) {
                let arr = this.scanInput.split('|');
                console.log('arr', arr);
                if (arr.length == 7) {
                    this.scanList.push({
                        rowNum: this.rowNum,
                        ComponentNo: arr[1],
                        SupplierNo: arr[2],
                        BatchNo: arr[3],
                        Total: ''
                    });
                    this.rowNum += 1;
                    this.scanInput = '';
                }
            }
        },
        beforeDelRightItem() {
            if (!this.scpcshow) {
                this.tipword = '该用户没有权限操作';
                this.tipchange = true;
                return;
            }
            this.tipword = '是否删除当前选择的组件';
            this.tipchange = true;
            this.deltrue = false;
        },
        no1() {
            this.deltrue = true;
            this.tipchange = false;
        },
        yes1() {
            this.no1();
            this.delRightItem();
        },
        delRightItem() {
            this.$axios({
                method: 'delete',
                url: `/api/MaterielBom/DeleteBatch?id=${this.curRightItem.Id}`
            }).then(res => {
                if (res.data.code === 0) {
                    this.tipword = '删除成功';
                    this.tipchange = true;
                    this.getBatchesByBomIdAndGranaryId();
                } else {
                    this.tipword = res.data.msg;
                    this.tipchange = true;
                }
            });
        },
        openSupplierInformationShow() {
            if (!this.gysszshow) {
                this.tipword = '该用户没有权限操作';
                this.tipchange = true;
                return;
            }
            this.$axios({
                method: 'GET',
                url: `/api/MaterielBom/GetSupplierInfo`
            }).then(res => {
                if (res.data.code === 0) {
                    this.SupplierList = [];
                    res.data.data.map(_ => {
                        this.SupplierList.push({
                            ..._,
                            rowNum: this.rowNum
                        });
                        this.rowNum += 1;
                    });
                    this.SupplierInformationShow = true;
                } else {
                    this.tipword = res.data.msg;
                    this.tipchange = true;
                }
            });
        },
        closeSupplierInformationShow() {
            this.SupplierInformationShow = false;
        },
        selectSupplierList(selection) {
            this.curSupplierItem = [{ ...selection }];
        },
        delSupplierInformation() {
            for (let i = 0; i < this.curSupplierItem.length; i++) {
                let val = this.curSupplierItem;
                val.forEach((val, index) => {
                    this.SupplierList.forEach((v, i) => {
                        if (val.rowNum === v.rowNum) {
                            this.SupplierList.splice(i, 1);
                        }
                    });
                });
            }
        },
        sumbitSupplierInformationShow() {
            this.$axios({
                method: 'post',
                url: `/api/MaterielBom/ModifySupplierInfo`,
                data: this.SupplierList.map((_, idx) => ({
                    ..._,
                    Number: Number(idx) + 1
                }))
            }).then(res => {
                if (res.data.code === 0) {
                    this.tipword = '设置成功';
                    this.tipchange = true;
                    this.closeSupplierInformationShow();
                } else {
                    this.tipword = res.data.msg;
                    this.tipchange = true;
                }
            });
        },
        openAddSupplierInformationShow() {
            // this.AddSupplierInformationShow = true; //弹窗
            //取消新增弹窗，改为直接加一条空数据编辑
            this.SupplierList.push({
                rowNum: this.rowNum,
                No: '',
                Name: ''
            });
            rowNum += 1;
        },
        // closeAddSupplierInformationShow() {
        //     this.addSupplierInput1 = '';
        //     this.addSupplierInput2 = '';
        //     this.AddSupplierInformationShow = false;
        // },
        // sumbitAddSupplierInformationShow() {
        //     if (this.SupplierList.find((_) => _.No == this.addSupplierInput1)) {
        //         this.tipword = '供应商已存在';
        //         this.tipchange = true;
        //         return;
        //     }
        //     this.SupplierList.push({
        //         No: this.addSupplierInput1,
        //         Name: this.addSupplierInput2,
        //     });
        //     this.closeAddSupplierInformationShow();
        // },
        openComponentEntryShow() {
            if (!this.wllrshow) {
                this.tipword = '该用户没有权限操作';
                this.tipchange = true;
                return;
            }
            this.ComponentEntryShow = true;
        },

        readExcel(e) {
            //表格导入
            this.daorudata = [];
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
                    for (a in ws) {
                        ws[a].Number = ws[a]['序号'];
                        ws[a].DrawingNo = ws[a]['图号'];
                        ws[a].ComponentDesc = ws[a]['组件描述'];
                        ws[a].ComponentNo = ws[a]['组件编码'];
                        ws[a].Unit = ws[a]['单位'];
                        ws[a].OnceUsage = ws[a]['单次使用量'];
                        ws[a].DeviceName = ws[a]['工序'];
                    }
                    let b = 0;
                    for (b in ws) {
                        delete ws[b]['序号'];
                        delete ws[b]['图号'];
                        delete ws[b]['组件描述'];
                        delete ws[b]['组件编码'];
                        delete ws[b]['单位'];
                        delete ws[b]['单次使用量'];
                        delete ws[b]['工序'];
                    }

                    this.$axios({
                        method: 'post',
                        url: `/api/MaterielBom/ImportBoms`,
                        data: ws
                    }).then(res => {
                        if (res.data.code === 0) {
                            this.tipword = '导入成功';
                            this.tipchange = true;
                            this.getDrawingNos();
                        } else {
                            this.tipword = res.data.msg;
                            this.tipchange = true;
                        }
                    });
                } catch (e) {
                    return false;
                }
            };
            fileReader.readAsBinaryString(files[0]);
        },
        exportFn0() {
            let filterVal = [
                'Number',
                'ComponentNo',
                'SupplierNo',
                'BatchNo',
                'Total'
            ];
            let title = [
                '序号',
                '组件编码',
                '供应商编号',
                '批次号',
                '组件总量'
            ];
            let tableList = this.rightList.map((_, idx) => ({
                ..._,
                Number: Number(idx) + 1
            }));
            require.ensure([], () => {
                const {
                    expor_json_to_excel
                } = require('../../vendor/Export2Excel');
                let excelDatas = [
                    {
                        tHeader: title,
                        filterVal: filterVal,
                        tableDatas: tableList,
                        sheetName: 'sheet1'
                    },
                    {
                        tHeader: title,
                        filterVal: filterVal,
                        tableDatas: tableList,
                        sheetName: 'sheet1'
                    } //不知道源码为啥删一次，写两次才正常
                ];
                this.json2excel(excelDatas, '物料批次', true, 'xlsx');
            });
        },
        downloadFile(file, fileName) {
            const blob = new Blob([file]);
            // 兼容不同浏览器的URL对象
            const url = window.URL || window.webkitURL;
            // 创建下载链接
            const downloadHref = url.createObjectURL(blob);
            // 创建a标签并为其添加属性
            let downloadLink = document.createElement('a');
            downloadLink.href = downloadHref;
            downloadLink.download = fileName;
            // 触发点击事件执行下载
            downloadLink.click();
            window.URL.revokeObjectURL(url);
        },
        uploadFn(file) {
            let formData = new FormData();
            formData.append('file', file.file);
            this.$axios({
                method: 'post',
                url: `/api/MaterielBom/ImportBom`,
                data: formData
            }).then(res => {
                if (res.data.code == 0) {
                    this.tipchange = true;
                    this.tipword = `导入成功！`;
                    this.onetable();
                } else {
                    this.tipchange = true;
                    this.tipword = res.data.msg;
                }
            });
        },
        beforeImport(e) {
            if (!this.drshow) {
                this.tipword = '该用户没有权限操作';
                this.tipchange = true;
                e.preventDefault();
                return false;
            }
        },
        exportFn() {
            if (!this.dcshow) {
                this.tipword = '该用户没有权限操作';
                this.tipchange = true;
                return;
            }
            this.$axios({
                method: 'get',
                url: `/api/MaterielBom/ExportBom`,
                responseType: 'blob'
            }).then(res => {
                this.downloadFile(res.data, '物料BOM.xls');
            });

            // let filterVal = [
            //     'Number',
            //     'DrawingNo',
            //     'ComponentDesc',
            //     'ComponentNo',
            //     'Unit',
            //     'OnceUsage',
            //     'WorkStepName'
            // ];
            // let title = [
            //     '序号',
            //     '图号',
            //     '组件描述',
            //     '组件编码',
            //     '单位',
            //     '单次使用量',
            //     '工序'
            // ];
            // let tableList = this.BomsList.map((_, idx) => ({
            //     ..._,
            //     DrawingNo: this.DrawingNo,
            //     Number: Number(idx) + 1
            // }));
            // require.ensure([], () => {
            //     const {
            //         expor_json_to_excel
            //     } = require('../../vendor/Export2Excel');
            //     let excelDatas = [
            //         {
            //             tHeader: title,
            //             filterVal: filterVal,
            //             tableDatas: tableList,
            //             sheetName: 'sheet1'
            //         },
            //         {
            //             tHeader: title,
            //             filterVal: filterVal,
            //             tableDatas: tableList,
            //             sheetName: 'sheet1'
            //         } //不知道源码为啥删一次，写两次才正常
            //     ];
            //     this.json2excel(excelDatas, '物料BOM', true, 'xlsx');
            // });
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

        tip1() {
            this.tipchange = false;
        },
        mouseDownHandleelse2(event) {
            event.currentTarget.style.cursor = 'move';
            window.onmousemove = this.mouseMoveHandleelse2;
        },
        mouseMoveHandleelse2(event) {
            let moveLeft = event.pageX - 190 + 'px';
            let moveTop = event.pageY - 20 + 'px';
            this.$refs.kongtiao2.style.left = moveLeft;
            this.$refs.kongtiao2.style.top = moveTop;
        },
        mouseDownHandleelse3(event) {
            event.currentTarget.style.cursor = 'move';
            window.onmousemove = this.mouseMoveHandleelse3;
            event.stopPropagation();
        },

        mouseMoveHandleelse3(event) {
            let moveLeft = event.pageX - 800 + 'px';
            let moveTop = event.pageY - 20 + 'px';
            this.$refs.addOrEditBOM.style.left = moveLeft;
            this.$refs.addOrEditBOM.style.top = moveTop;
        },
        mouseDownHandleelse7(event) {
            event.currentTarget.style.cursor = 'move';
            window.onmousemove = this.mouseMoveHandleelse7;
            event.stopPropagation();
        },
        mouseMoveHandleelse7(event) {
            let moveLeft = event.pageX - 800 + 'px';
            let moveTop = event.pageY - 20 + 'px';
            this.$refs.SupplierInformation.style.left = moveLeft;
            this.$refs.SupplierInformation.style.top = moveTop;
        },
        // mouseDownHandleelse8(event) {
        //     event.currentTarget.style.cursor = 'move';
        //     window.onmousemove = this.mouseMoveHandleelse8;
        //     event.stopPropagation();
        // },

        // mouseMoveHandleelse8(event) {
        //     let moveLeft = event.pageX - 400 + 'px';
        //     let moveTop = event.pageY - 20 + 'px';
        //     this.$refs.addSupplierInformationPop.style.left = moveLeft;
        //     this.$refs.addSupplierInformationPop.style.top = moveTop;
        // },
        mouseDownHandleelse9(event) {
            event.currentTarget.style.cursor = 'move';
            window.onmousemove = this.mouseMoveHandleelse9;
            event.stopPropagation();
        },
        mouseMoveHandleelse9(event) {
            let moveLeft = event.pageX - 400 + 'px';
            let moveTop = event.pageY - 20 + 'px';
            this.$refs.scheduleSettings.style.left = moveLeft;
            this.$refs.scheduleSettings.style.top = moveTop;
        },
        mouseDownHandleelse10(event) {
            event.currentTarget.style.cursor = 'move';
            window.onmousemove = this.mouseMoveHandleelse10;
            event.stopPropagation();
        },
        mouseMoveHandleelse10(event) {
            let moveLeft = event.pageX - 700 + 'px';
            let moveTop = event.pageY - 20 + 'px';
            this.$refs.scheduleSettings.style.left = moveLeft;
            this.$refs.scheduleSettings.style.top = moveTop;
        },
        mouseDownHandleelse11(event) {
            event.currentTarget.style.cursor = 'move';
            window.onmousemove = this.mouseMoveHandleelse11;
            event.stopPropagation();
        },
        mouseMoveHandleelse11(event) {
            let moveLeft = event.pageX - 700 + 'px';
            let moveTop = event.pageY - 20 + 'px';
            this.$refs.ComponentEntry.style.left = moveLeft;
            this.$refs.ComponentEntry.style.top = moveTop;
        },
        mouseUpHandleelse(event) {
            window.onmousemove = null;
            event.currentTarget.style.cursor = 'move';
        }
    }
};
</script>

<style lang="scss" scoped>
.material-management2 {
    width: 100%;
    height: calc(100% - 130px);
    color: #000;
    margin-top: 100px;
    background-color: #eee;
    padding: 20px 10px;
    box-sizing: border-box;

    .material-management2-box {
        width: 100%;
        height: 100%;
        background-color: #fff;
        padding: 20px 10px;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
    }

    .material-content1,
    .material-content2 {
        width: 700px;
        height: 100%;
        background-color: #fff;
        padding: 0 20px;
        box-sizing: border-box;
        border: 1px solid #dddddd;
        .material-title {
            width: 100%;
            height: 45px;
            display: flex;
            align-items: center;
            justify-content: flex-start;
            color: #4270e4;
            text-indent: 5px;
            font-size: 18px;
            font-weight: 500;
        }
        .material-title::before {
            content: '';
            height: 21px;
            width: 2px;
            background-color: #4270e4;
        }
        .material-search {
            width: 100%;
            height: 60px;
            background-color: #dddddd;
            display: flex;
            align-items: center;
            padding: 0 16px;
            box-sizing: border-box;
            position: relative;

            .search-right {
                position: absolute;
                right: 0;
                top: 50%;
                transform: translate(0, -50%);
                height: 100%;
                width: 250px;
                display: flex;
                align-items: center;
                justify-content: flex-end;
                padding-right: 15px;
                .ExportBtn {
                    background: #fff;
                    color: #4270e4;
                    border: 1px solid #4270e4;
                }
            }
        }
        .material-table {
            width: 100%;
            height: calc(100% - 125px);
            margin-top: 10px;
            .editbtn {
                border-radius: 4px;
                width: 80px;
                height: 30px;
                display: flex;
                align-items: center;
                justify-content: center;
                background-color: #386df0;
                color: #fff;
                cursor: pointer;
            }
        }
    }

    .material-content2 {
        width: calc(100% - 715px);
    }
    .btn {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100px;
        height: 40px;
        background-color: #4270e4;
        border-radius: 4px;
        color: #fff;
        font-weight: 600;
        margin-right: 10px;
        cursor: pointer;
        position: relative;
        .file {
            width: 100%;
            height: 100%;
            position: absolute;
            z-index: 5;
            left: 0;
            top: 0;
            opacity: 0;
            input {
                width: 100%;
                height: 100%;
                cursor: pointer;
            }
        }
    }
    .greenBtn {
        background: #fff;
        color: #46be05;
        border: 1px solid #46be05;
    }
    .yellowBtn {
        background: #fff;
        color: #fda100;
        border: 1px solid #fda100;
    }
    .blueBtn {
        background: #fff;
        color: #00affd;
        border: 1px solid #00affd;
    }
    .redBtn {
        background: #fff;
        color: #ec808d;
        border: 1px solid #ec808d;
    }
    .greyBtn {
        background: #fff;
        color: #999999;
        border: 1px solid #999999;
    }
    .cancleBtn {
        background: #999999;
        color: #fff;
    }
}
.verification,
.addSupplierInformation,
.jurisdiction,
.addMaterial {
    position: fixed;
    width: 560px;
    height: 465px;
    z-index: 7;
    top: 150px;
    left: 630px;
    box-shadow: 0px 0px 8px black;
    background-color: #f3f3f4;
    .Materialtop {
        width: 100%;
        height: 40px;
        background-color: #386df0;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #fff;
        position: relative;
        .material-drag {
            width: calc(100% - 50px);
            height: 100%;
            position: absolute;
            left: 0;
            top: 0;
        }
        .closMaterial {
            position: absolute;
            right: 15px;
            top: 50%;
            transform: translate(0, -50%);
            width: 25px;
            height: 25px;
            cursor: pointer;
        }
        span {
            color: #ffffff;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
        }
    }
    .addMaterial-content {
        width: 100%;
        height: calc(100% - 100px);
        padding-right: 52px;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        justify-content: center;
        .addMaterial-item {
            display: flex;
            align-items: center;
            justify-content: flex-end;
            margin-bottom: 10px;
            .addMaterial-key {
                margin-right: 10px;
            }
            .addMaterial-input {
                width: 359px;
                height: 45px;
                background: #fff;
                border: 1px solid #dddddd;
                opacity: 1;
            }
        }
    }
    .addMaterial-footer {
        width: 100%;
        height: 60px;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        padding-right: 52px;
        box-sizing: border-box;
    }
}
.verification {
    width: 500px;
    height: 260px;
    top: 250px;
    z-index: 8;
}
.addSupplierInformation {
    width: 500px;
    height: 260px;
    top: 250px;
    z-index: 11;
    .addMaterial-input {
        width: 300px !important;
    }
}

.jurisdiction {
    width: 315px;
    height: 260px;
    top: 250px;
    z-index: 9;
    .jurisdiction-content {
        width: 100%;
        height: calc(100% - 100px);
        padding-right: 52px;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        justify-content: center;
    }
}
.SupplierInformation,
.pickKey,
.scheduleSettings,
.ComponentEntry,
.SupplierInformation,
.addOrEditBOM {
    position: fixed;
    width: 1230px;
    height: 770px;
    z-index: 6;
    top: 110px;
    left: 330px;
    box-shadow: 0px 0px 8px black;
    background-color: #f3f3f4;
    .poptop {
        width: 100%;
        height: 40px;
        background-color: #386df0;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #fff;
        position: relative;
        .tiptop-drag {
            width: calc(100% - 50px);
            height: 100%;
            position: absolute;
            left: 0;
            top: 0;
        }
        .closeWind {
            position: absolute;
            right: 15px;
            top: 50%;
            transform: translate(0, -50%);
            width: 25px;
            height: 25px;
            cursor: pointer;
        }
        span {
            color: #ffffff;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
        }
    }
    .PopContent {
        width: 100%;
        height: calc(100% - 40px);
        background-color: #eeeeee;
        padding: 0 21px;
        box-sizing: border-box;
        .pickKeyContent {
            margin-top: 15px;
            width: 100%;
            height: calc(100% - 60px);
            border: 1px solid #cccccc;
            background: #f4f4f4;
            padding: 0 21px;
            box-sizing: border-box;
        }
        .addOrEditBOM-search {
            width: 100%;
            height: 60px;
            display: flex;
            align-items: center;
            box-sizing: border-box;
            position: relative;
            font-size: 14px;
            .addOrEditBOM-right {
                position: absolute;
                right: 0;
                top: 50%;
                transform: translate(0, -50%);
                height: 100%;
                width: 250px;
                display: flex;
                align-items: center;
                justify-content: flex-end;
                padding-right: 15px;
            }
        }
        .addOrEditBOM-content {
            width: 100%;
            height: calc(100% - 120px);
            display: flex;
            .addOrEditBOM-group {
                width: 180px;
                height: 100%;
                background: #f4f4f4;
                border: 1px solid #dddddd;
                .group-label {
                    width: 100%;
                    height: 40px;
                    display: flex;
                    align-items: center;
                    text-indent: 15px;
                    cursor: pointer;
                }
                .select-group {
                    background: #fff;
                    color: #386df0;
                }
                .select-group::before {
                    content: '';
                    height: 100%;
                    width: 4px;
                    background-color: #4270e4;
                }
            }
            .addOrEditBOM-table {
                width: calc(100% - 180px);
                height: 100%;
                background: #fff;
                border: 1px solid #dddddd;
            }
        }
        .addOrEditBOM-footer {
            width: 100%;
            height: 60px;
            display: flex;
            align-items: center;
            justify-content: flex-end;
        }
    }
}
.scheduleSettings {
    width: 900px;
    height: 750px;
    left: 450px;
    top: 110px;
    z-index: 10;
}
.pickKey {
    height: 600px;
}
.SupplierInformation {
    width: 900px;
    height: 500px;
    left: 450px;
    top: 200px;
    z-index: 10;
}
.tip {
    position: fixed;
    width: 380px;
    min-height: 200px;
    height: auto;
    padding-bottom: 10px;
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
    .tipword {
        width: 100%;
        padding: 40px;
        text-align: center;
        padding-bottom: 0;
    }
    .w {
        width: 100%;
        margin-top: 40px;
        text-align: center;
    }
    .tipdetermine {
        color: #ea9328;
        width: 310px;
        line-height: 30px;
        cursor: pointer;
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
.cover1 {
    width: 100%;
    height: 100%;
    z-index: 4;
    position: fixed;
    top: 0;
    left: 0;
}
</style>
