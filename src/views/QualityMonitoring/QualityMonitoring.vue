<template>
    <div class="material-management">
        <div class="material-content" id="linebox">
            <div class="material-search">
                <div>时间范围</div>
                <el-date-picker
                    :disabled="curCodeType == 2"
                    v-model="timevalue1"
                    type="date"
                    value-format="yyyy-MM-dd"
                    :style="[
                        { fontSize: '16px' },
                        { width: '210px' },
                        { height: '40px' },
                        { marginLeft: '10px' },
                        { marginRight: '10px' }
                    ]"
                ></el-date-picker>
                <div>-</div>
                <el-date-picker
                    :disabled="curCodeType == 2"
                    v-model="timevalue2"
                    type="date"
                    value-format="yyyy-MM-dd"
                    :style="[
                        { fontSize: '16px' },
                        { width: '210px' },
                        { height: '40px' },
                        { marginLeft: '10px' },
                        { marginRight: '10px' }
                    ]"
                ></el-date-picker>
                <div>班次</div>
                <el-select
                    v-model="curShift"
                    :style="[
                        { fontSize: '16px' },
                        { width: '120px' },
                        { height: '40px' },
                        { marginLeft: '10px' },
                        { marginRight: '10px' }
                    ]"
                >
                    <el-option
                        v-for="item in shiftList"
                        :key="'key1' + item.key + item.label"
                        :label="item.label"
                        :value="item.key"
                    ></el-option>
                </el-select>
                <div>漆包线供应商</div>
                <el-select
                    v-model="curSupplier"
                    :style="[
                        { fontSize: '16px' },
                        { width: '120px' },
                        { height: '40px' },
                        { marginLeft: '10px' },
                        { marginRight: '10px' }
                    ]"
                >
                    <el-option
                        v-for="item in supplierList"
                        :key="'key2' + item.key + item.label"
                        :label="item.label"
                        :value="item.key"
                    ></el-option>
                </el-select>
                <el-select
                    v-model="curCodeType"
                    :style="[
                        { fontSize: '16px' },
                        { width: '120px' },
                        { height: '40px' },
                        { marginLeft: '10px' },
                        { marginRight: '10px' }
                    ]"
                >
                    <el-option label="产品编码" :value="1"></el-option>
                    <el-option label="物料编码" :value="2"></el-option>
                </el-select>
                <el-input
                    v-model="searchInput"
                    placeholder="请输入关键字"
                    clearable
                    :style="[
                        { fontSize: '16px' },
                        { width: '150px' },
                        { height: '40px' },
                        { marginRight: '10px' }
                    ]"
                ></el-input>

                <div class="btn" @click="beforegetData">查询</div>
                <div
                    :class="
                        leftListCur.IsRepaired
                            ? 'btn greenBtn'
                            : 'btn cancleBtn disableBtn'
                    "
                    @click="beforeOpenAddOrEditBOM('add')"
                >
                    数据录入
                </div>
                <div
                    :class="
                        leftListCur.IsRepaired
                            ? 'btn yellowBtn'
                            : 'btn cancleBtn disableBtn'
                    "
                    @click="beforeOpenAddOrEditBOM('edit')"
                >
                    数据修改
                </div>

                <div class="btn ExportBtn" @click="exportTable">导出</div>
            </div>
            <div class="material-form">
                <div class="material-echart" id="myChart"></div>
                <div class="material-table">
                    <div class="barBox" id="scroll"></div>
                    <div class="material-group">
                        <div
                            :class="
                                leftListCur.WID == item.WID
                                    ? 'group-label select-group'
                                    : 'group-label'
                            "
                            v-for="item in leftList"
                            :key="'key4' + item.WID"
                            @click="changeLeftCur(item)"
                        >
                            {{ item.WorkName }}
                            <!-- <el-tooltip
                                effect="dark"
                                :content="
                                    item.Manual ? '合格状态' : '不合格状态'
                                "
                                placement="top"
                            >
                                <div
                                    :class="
                                        item.hege
                                            ? 'group-point green-point'
                                            : 'group-point red-point'
                                    "
                                ></div
                            ></el-tooltip> -->
                        </div>
                    </div>
                    <div class="material-data" id="box">
                        <div class="material-data-content" id="content">
                            <div class="data-line0">
                                <div
                                    class="data-key01"
                                    :style="{
                                        width: leftListCur.IsRepaired
                                            ? '1260px'
                                            : '1410px'
                                    }"
                                >
                                    {{ leftListCur.WorkName }}
                                </div>
                                <div class="data-key02">
                                    {{ leftListCur.WorkName }}
                                </div>
                                <div
                                    v-if="leftListCur.MaterielProjects.length"
                                    class="data-key01"
                                    :style="{
                                        backgroundColor: '#00affd',
                                        width:
                                            150 *
                                                6 *
                                                leftListCur.MaterielProjects
                                                    .length +
                                            'px'
                                    }"
                                >
                                    {{ leftListCur.WorkName }}
                                </div>
                            </div>
                            <div class="data-line sticky1">
                                <template
                                    v-if="leftListCur.IsRepaired"
                                    class="data-leftTitle"
                                >
                                    <div class="data-key t1">序号</div>
                                    <div class="data-key">班次</div>
                                    <div class="data-key">人员名称</div>
                                    <div class="data-key">机型（即图号）</div>
                                    <div class="data-key t5">电机编号</div>
                                    <div class="data-key">漆包线供应商</div>
                                    <div class="data-key">检查结果</div>
                                    <div class="data-key t8">记录时间</div>
                                </template>
                                <template v-else class="data-leftTitle">
                                    <div class="data-key t1">序号</div>
                                    <div class="data-key">日期</div>
                                    <div class="data-key">班次</div>
                                    <div class="data-key">人员名称</div>
                                    <div class="data-key t5">产品编码</div>
                                    <div class="data-key">机型</div>
                                    <div class="data-key">产品是否合格</div>
                                    <div class="data-key">不合格原因</div>
                                    <div class="data-key t8">记录时间</div>
                                </template>

                                <div class="data-key2">
                                    <div class="data-key2-up">
                                        <div
                                            class="data-key2-label"
                                            :style="{
                                                width: 150 * item.num + 'px'
                                            }"
                                            v-for="item in gongweiList"
                                            :key="'key5' + item.key"
                                        >
                                            {{ item.key }}
                                        </div>

                                        <div
                                            class="data-key2-label mater"
                                            :style="{
                                                width: 150 * 6 + 'px',
                                                borderBottom:
                                                    '1px solid #e4e4e4'
                                            }"
                                            v-for="item in leftListCur.MaterielProjects"
                                            :key="'key5' + item.MID"
                                        >
                                            {{ item.MaterielName }}
                                        </div>
                                    </div>
                                    <div class="data-key2-down">
                                        <div
                                            :class="
                                                item.PID == proNameId
                                                    ? 'data-key2-label curBorder'
                                                    : 'data-key2-label'
                                            "
                                            v-for="item in leftListCur.Projects"
                                            :key="'key6' + item.PID"
                                            @click="changePrint(item)"
                                        >
                                            {{ item.ProjectName }}
                                        </div>
                                        <div
                                            class="data-key2-label mater"
                                            v-for="item in leftListCur.MaterielProjects.map(
                                                i => [
                                                    '物料描述',
                                                    '物料图号',
                                                    '供应商代号',
                                                    '批次号',
                                                    '生产日期',
                                                    '型号'
                                                ]
                                            ).flat()"
                                            :key="'key6' + item"
                                        >
                                            {{ item }}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="data-line sticky2">
                                <div class="data-key3 t1">//</div>
                                <div class="data-key3">//</div>
                                <div class="data-key3">//</div>
                                <div class="data-key3">//</div>
                                <div class="data-key3 t5">//</div>
                                <div
                                    class="data-key3"
                                    v-if="!leftListCur.IsRepaired"
                                >
                                    //
                                </div>

                                <div class="data-key3">//</div>
                                <div class="data-key3">//</div>
                                <div class="data-key3 t8">//</div>
                                <div
                                    class="data-key4"
                                    v-for="item in leftListCur.Projects"
                                    :key="'key7' + item.PID"
                                >
                                    {{ item.Unit }}
                                </div>
                                <div
                                    class="data-key4 mater"
                                    v-for="item in leftListCur.MaterielProjects.map(
                                        i => [
                                            '物料描述',
                                            '物料图号',
                                            '供应商代号',
                                            '批次号',
                                            '生产日期',
                                            '型号'
                                        ]
                                    ).flat()"
                                    :key="'key7' + item"
                                >
                                    //
                                </div>
                            </div>

                            <div>
                                <div
                                    class="data-line"
                                    v-for="item in tableList"
                                    :key="'key8' + item.Number"
                                >
                                    <template
                                        v-if="leftListCur.IsRepaired"
                                        class="data-leftTitle"
                                    >
                                        <div class="data-value t1">
                                            {{ item.Number }}
                                        </div>
                                        <div class="data-value">
                                            {{ item.Shift }}
                                        </div>
                                        <div class="data-value">
                                            {{ item.Person }}
                                        </div>
                                        <div class="data-value">
                                            {{ item.DrawingNo }}
                                        </div>
                                        <el-tooltip
                                            class="item"
                                            effect="dark"
                                            :content="item.ProductID"
                                            placement="top"
                                        >
                                            <div class="data-value t5-value">
                                                {{ item.ProductID }}
                                            </div>
                                        </el-tooltip>
                                        <div class="data-value">
                                            {{ item.Supplier }}
                                        </div>
                                        <div class="data-value">
                                            {{ item.IsQualifiedText }}
                                        </div>
                                        <div class="data-value t8">
                                            {{ item.RecordTime }}
                                        </div>
                                    </template>
                                    <template v-else class="data-leftTitle">
                                        <div class="data-value t1">
                                            {{ item.Number }}
                                        </div>
                                        <div class="data-value">
                                            {{ item.Date }}
                                        </div>
                                        <div class="data-value">
                                            {{ item.Shift }}
                                        </div>
                                        <div class="data-value">
                                            {{ item.Person }}
                                        </div>
                                        <el-tooltip
                                            class="item"
                                            effect="dark"
                                            :content="item.ProductID"
                                            placement="top"
                                        >
                                            <div class="data-value t5-value">
                                                {{ item.ProductID }}
                                            </div>
                                        </el-tooltip>

                                        <div
                                            class="data-value"
                                            v-if="!leftListCur.IsRepaired"
                                        >
                                            {{ item.DrawingNo }}
                                        </div>

                                        <div class="data-value">
                                            {{ item.IsQualifiedText }}
                                        </div>
                                        <div class="data-value">
                                            {{ item.Reason }}
                                        </div>
                                        <div class="data-value t8">
                                            {{ item.RecordTime }}
                                        </div>
                                    </template>
                                    <div
                                        :class="
                                            k.Red
                                                ? 'data-value color2'
                                                : 'data-value'
                                        "
                                        v-for="k in item.ProjectDatas"
                                        :key="'key9' + k.PID"
                                    >
                                        {{
                                            k.IsParameterCollect ? '' : k.Value
                                        }}

                                        <div
                                            class="chartBtn"
                                            v-if="k.IsParameterCollect"
                                            @click="openChart(k, item)"
                                        >
                                            <img
                                                src="../../../assets/images/chart.svg"
                                            />
                                        </div>
                                    </div>

                                    <div
                                        class="data-value"
                                        v-for="k in item.MaterielDatas"
                                        :key="'key9' + k"
                                    >
                                        {{ k.Value }}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
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
                <span v-show="addOrEditBOMType == 'add'"
                    >数据录入（{{ leftListCur.WorkName }}）</span
                >
                <span v-show="addOrEditBOMType == 'edit'"
                    >数据修改（{{ leftListCur.WorkName }}）</span
                >
                <img
                    @click="closeAddOrEditBOM"
                    class="closeWind"
                    src="../../assets/images/close-big-default.png"
                    alt=""
                />
            </div>
            <div class="PopContent">
                <div class="addOrEditBOM-search">
                    <div>扫码输入:</div>
                    <el-input
                        placeholder="请输入"
                        clearable
                        v-model="scanInput"
                        @keyup.enter.native="enterFun"
                        :style="[
                            { fontSize: '16px' },
                            { width: '210px' },
                            { height: '40px' },
                            { marginLeft: '15px' }
                        ]"
                    ></el-input>

                    <div class="addOrEditBOM-right">
                        <div
                            class="btn blueBtn"
                            v-if="addOrEditBOMType == 'edit'"
                            @click="enterFun"
                        >
                            查询
                        </div>
                        <div
                            class="btn greyBtn"
                            v-if="addOrEditBOMType == 'add'"
                            @click="delTempPopList"
                        >
                            删除
                        </div>
                    </div>
                </div>
                <div class="addOrEditBOM-content">
                    <el-table
                        :data="popList"
                        height="100%"
                        width="100%"
                        ref="mmtable"
                        :header-cell-style="{
                            background: '#DCF0F9',
                            color: '#4270E4',
                            'border-left': '1px solid #cccccc',
                            height: 50 + 'px',
                            'font-size': 14 + 'px',
                            padding: '0'
                        }"
                        @select="selectFn"
                        @select-all="selectFn"
                    >
                        <template slot="empty">
                            <span>暂无数据</span>
                        </template>
                        <el-table-column type="selection" width="80" />
                        <el-table-column
                            label="序号"
                            type="index"
                            width="80"
                        ></el-table-column>
                        <el-table-column
                            v-for="item in popTitleList"
                            :key="'key10' + item.key"
                            :label="item.key"
                            :prop="item.value"
                            width="180"
                        >
                            <template slot-scope="scope">
                                <span
                                    v-if="
                                        item.value == 'time' ||
                                            item.value == 'Shift' ||
                                            item.value == 'Person' ||
                                            item.value == 'ProductID' ||
                                            item.value == 'DrawingNo'
                                    "
                                >
                                    {{ scope.row[item.value] }}
                                </span>
                                <el-select
                                    v-else-if="item.value == 'IsQualifiedText'"
                                    v-model="scope.row.IsQualifiedText"
                                >
                                    <el-option
                                        label="合格"
                                        :value="true"
                                    ></el-option>
                                    <el-option
                                        label="不合格"
                                        :value="false"
                                    ></el-option>
                                </el-select>

                                <el-input
                                    v-else
                                    v-model="scope.row[item.value]"
                                />
                            </template>
                        </el-table-column>
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
        <div class="cover2" v-if="tipchange"></div>
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
                    <div class="one">否</div>
                    <div class="two">是</div>
                </div>
            </div>
        </div>
        <exportTasble v-if="isExport"></exportTasble>
        <checkAccount
            @cancelFn="cancelFn"
            @sumbitFn="openAddOrEditBOM"
            @tipShow="tipShow"
            :doubleSign="doubleSign"
            :elementName="elementName"
            :argChildMenuID="$route.query.id"
            :checkAccountSecond="checkAccountSecond"
            v-if="checkAccountShow"
        />
        <div class="chartPop" v-if="chartShow">
            <div class="myDialog">
                <div class="popHeader">
                    {{ chartName }}
                    <img
                        class="popHeaderimg"
                        src="../../assets/images/no3.png"
                        alt=""
                        @click="closeChart('no')"
                    />
                </div>

                <div class="popContent" id="itemChart"></div>
                <div class="popBtn">
                    <el-button
                        class="pop-sumbit"
                        @click="closeChart('no')"
                        style="background: rgba(56, 109, 240);;color:#fff;"
                    >
                        确定
                    </el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
let echarts = require('echarts/lib/echarts');
import html2canvas from 'html2canvas';
import exportTasble from '../parameter/component/exportTablePop.vue';
import checkAccount from '../../components/checkAccount/checkAccount.vue';
export default {
    components: {
        exportTasble,
        checkAccount
    },
    data() {
        return {
            checkAccountShow: false,
            checkAccountSecond: 60,
            doubleSign: false,
            elementName: '',
            tempType: '',
            pidArr: [],
            proName: '',
            proNameId: '',
            ProductIDArr: [],
            UpperArr: [],
            LowerArr: [],
            leftList: [],
            leftListCur: {},
            searchData: {
                argType: '',
                argKeyword: ''
            },
            pageData: {
                PageSize: 50,
                TotalCount: 0,
                TotalPage: 0,
                PageIndex: 1,
                LastEnabled: false,
                NextEnabled: false
            },
            deltrue: true,
            tipword: '',
            tipchange: false,
            verificationPopShow: false,
            addOrEditBOMShow: false,
            addOrEditBOMType: '',
            timevalue2: '',
            timevalue1: '',

            shiftList: [],
            curShift: '',
            supplierList: [],
            curSupplier: '',
            curCodeType: 1,

            searchInput: '',
            tableList: [],

            scanInput: '',
            popList: [],
            curPopShift: '',
            curPopPerson: '',
            delPopData: [],
            rowNum: 1,

            isExport: false,
            exportId: '',
            queryId: '',
            enterId: '',
            editId: '',

            chartShow: false,
            chartName: ''
        };
    },
    watch: {
        leftListCur: {
            deep: true,
            handler(val) {
                if (val.WID) {
                    this.getData();
                }
            }
        },
        VpowerData(val) {
            //监听按钮权限
            this.powerBtn();
        }
    },
    computed: {
        VpowerData() {
            return this.$store.state.btnPowerData;
        },
        gongweiList() {
            let o = this.leftListCur.Projects.map(item => item.StepName);
            let n = [...new Set(o)];
            let arr = [];
            n.map(_ => {
                let num = 0;
                o.map(_2 => _ == _2 && num++);
                arr.push({ key: _, num });
            });

            console.log('getArrItemNum', arr);
            return arr;
        }
    },

    methods: {
        openChart(item3, item) {
            console.log('item3', item3);
            console.log('item', item);
            this.chartShow = true;
            this.chartName = item3.ProjectName;
            this.$nextTick(() => {
                this.$axios({
                    method: 'get',
                    url: `/api/ProcessParameterReport/GetPressureDockParams?ProductId=${item.ProductID}&ProjectId=${item3.PID}`
                }).then(res => {
                    if (res.data.code == 0) {
                        let option = {
                            legend: {
                                data: [
                                    '上限值',
                                    item3.ProjectName,
                                    '参考上限',
                                    '下限值'
                                ],
                                right: 10,
                                top: 0
                            },
                            tooltip: {
                                trigger: 'axis'
                            },
                            xAxis: {
                                type: 'category',
                                data: res.data.data.xAxis
                            },
                            yAxis: {
                                type: 'value'
                            },
                            series: [
                                {
                                    name: '上限值',
                                    type: 'line',
                                    symbol: 'none',
                                    data: res.data.data.xAxis.map(
                                        _ => res.data.data.upperLimit
                                    ),
                                    lineStyle: {
                                        normal: {
                                            color: '#d9001b',
                                            width: 1
                                        }
                                    },
                                    itemStyle: {
                                        normal: {
                                            color: '#d9001b'
                                        }
                                    }
                                },
                                {
                                    name: item3.ProjectName,
                                    data: res.data.data.series,
                                    type: 'line',
                                    lineStyle: {
                                        normal: {
                                            color: '#02a7f0',
                                            width: 1
                                        }
                                    },
                                    itemStyle: {
                                        normal: {
                                            color: '#02a7f0'
                                        }
                                    }
                                },
                                {
                                    name: '参考上限',
                                    data: res.data.data.upperseries,
                                    type: 'line',
                                    lineStyle: {
                                        normal: {
                                            color: '#7e57c2',
                                            width: 1
                                        }
                                    },
                                    itemStyle: {
                                        normal: {
                                            color: '#7e57c2'
                                        }
                                    }
                                },
                                {
                                    name: '下限值',
                                    type: 'line',
                                    symbol: 'none',
                                    data: res.data.data.xAxis.map(
                                        _ => res.data.data.lowerLimit
                                    ),
                                    lineStyle: {
                                        normal: {
                                            color: '#f59a23',
                                            width: 1
                                        }
                                    },
                                    itemStyle: {
                                        normal: {
                                            color: '#f59a23'
                                        }
                                    }
                                }
                            ]
                        };
                        let _dom = document.getElementById('itemChart');
                        let myChart = echarts.init(_dom);
                        myChart.clear();
                        myChart.setOption(option, true);
                    } else {
                        this.isTipsPop = true;
                        this.TipsPopText = res.data.msg;
                    }
                });
            });
        },
        closeChart() {
            this.chartShow = false;
            this.chartName = '';
        },
        enterFun() {
            if (this.addOrEditBOMType == 'add') {
                let ProjectName = this.leftList
                    .find(_ => _.WID == this.leftListCur.WID)
                    .Projects.map(_ => _.ProjectName);
                let obj = {
                    rowNum: this.rowNum,
                    Shift: this.curPopShift,
                    Person: this.curPopPerson,
                    DrawingNo:
                        this.scanInput.trim().length >= 5
                            ? this.scanInput.trim().slice(0, 5)
                            : '',
                    ProductID: this.scanInput,
                    Supplier: '',
                    IsQualifiedText: true,
                    time: this.getDateTime()
                };
                ProjectName.map(_ => {
                    obj[_] = '';
                });
                this.popList.push(obj);
                this.scanInput = '';
                this.rowNum += 1;
            } else if (this.addOrEditBOMType == 'edit') {
                this.popList = [];
                this.$axios({
                    method: 'get',
                    url: `/api/ProcessParameterReport/GetDataByCode?&code=${this.scanInput}&wid=${this.leftListCur.WID}`
                }).then(res => {
                    if (res.data.code == 0) {
                        let ProjectNameItem = this.leftList
                            .find(_ => _.WID == this.leftListCur.WID)
                            .Projects.map(_ => {
                                return {
                                    ProjectName: _.ProjectName,
                                    PID: _.PID
                                };
                            });
                        res.data.data.forEach(_ => {
                            let obj2 = {
                                Id: _.Id,
                                rowNum: this.rowNum,
                                Shift: _.Shift,
                                Person: _.Person,
                                DrawingNo: _.DrawingNo,
                                ProductID: _.ProductID,
                                Supplier: _.Supplier,
                                IsQualifiedText: _.IsQualified,
                                time: _.RecordTime
                            };
                            _.ProjectDatas.map(_2 => {
                                ProjectNameItem.map(_3 => {
                                    if (_3.PID == _2.PID) {
                                        obj2[_3.ProjectName] = _2.Value;
                                    }
                                });
                            });
                            this.popList.push(obj2);
                            this.scanInput = '';
                            this.rowNum += 1;
                        });
                    } else {
                        this.tipchange = true;
                        this.tipword = res.data.msg;
                    }
                });
            }
        },
        delTempPopList() {
            for (let i = 0; i < this.delPopData.length; i++) {
                let val = this.delPopData;
                val.forEach((val, index) => {
                    this.popList.forEach((v, i) => {
                        if (val.rowNum === v.rowNum) {
                            this.popList.splice(i, 1);
                        }
                    });
                });
            }
        },
        selectFn(row) {
            this.delPopData = row;
        },
        changeLeftCur(item) {
            this.leftListCur = item;
        },
        beforeOpenAddOrEditBOM(type) {
            console.log('111');
            let _id =
                type == 'add'
                    ? this.enterId
                    : type == 'edit'
                    ? this.editId
                    : '';
            this.isPower(_id).then(val => {
                if (val) {
                    if (!this.leftListCur.IsRepaired) {
                        return;
                    }
                    let userinfoID;
                    if (
                        JSON.parse(sessionStorage.getItem('userInfo1')) == null
                    ) {
                        userinfoID = JSON.parse(
                            sessionStorage.getItem('sightseerInfo1')
                        ).SCMSUserID;
                    } else {
                        userinfoID = JSON.parse(
                            sessionStorage.getItem('userInfo1')
                        ).SCMSUserID;
                    }
                    let argChildMenuID = this.$route.query.id;
                    this.elementName =
                        type == 'add'
                            ? '参数报表-数据录入按钮'
                            : type == 'edit'
                            ? '参数报表-数据修改按钮'
                            : '';
                    this.$axios({
                        method: 'post',
                        url: `/api/UserManage/UserManage_CanExcuteSignatureControl?argUserID=${userinfoID}&argChildMenuID=${argChildMenuID}&argElementName=${this.elementName}`
                    }).then(res => {
                        if (res.data.code == 0) {
                            this.tempType = type;
                            if (res.data.data.CanExcute == 0) {
                                //需再校验
                                this.checkAccountShow = true;
                                this.checkAccountSecond = res.data.data.Second;
                                this.doubleSign =
                                    res.data.data.SignatureType == 2
                                        ? true
                                        : false;
                            } else {
                                //无需再校验
                                this.openAddOrEditBOM();
                            }
                        } else {
                            this.tipchange = true;
                            this.tipword = res.data.msg;
                        }
                    });
                } else {
                    this.tipchange = true;
                    this.tipword = '没有查询权限';
                }
            });
        },
        cancelFn() {
            this.tempType = '';
            this.checkAccountShow = false;
        },
        tipShow(msg) {
            this.tipchange = true;
            this.tipword = msg;
        },
        openAddOrEditBOM() {
            let type = this.tempType;
            this.cancelFn();
            this.popList = [];
            let titleList = [
                { key: '班次', value: 'Shift' },
                { key: '人员名称', value: 'Person' },
                { key: '机型（即图号）', value: 'DrawingNo' },
                { key: '电机编号', value: 'ProductID' },
                { key: '漆包线供应商', value: 'Supplier' },
                { key: '检查结果', value: 'IsQualifiedText' },
                { key: '记录时间', value: 'time' }
            ];
            this.leftList
                .find(_ => _.WID == this.leftListCur.WID)
                .Projects.map(_ => {
                    titleList.push({
                        key: _.ProjectName,
                        value: _.ProjectName,
                        init: ''
                    });
                });
            this.popTitleList = titleList;

            this.addOrEditBOMShow = true;
            this.addOrEditBOMType = type;

            this.$axios({
                method: 'get',
                url: `/api/ProcessParameterReport/GetShiftPersonByWId?wid=${this.leftListCur.WID}`
            }).then(res => {
                if (res.data.code == 0) {
                    this.curPopShift = res.data.data.Shift;
                    this.curPopPerson = res.data.data.Person;
                } else {
                    this.tipchange = true;
                    this.tipword = res.data.msg;
                }
            });
        },
        sumbitAddOrEditBOM() {
            if (this.addOrEditBOMType == 'add') {
                this.$axios({
                    method: 'post',
                    url: '/api/ProcessParameterReport/InputData',
                    data: {
                        WID: this.leftListCur.WID,
                        Items: this.popList.map((_, idx) => ({
                            Number: Number(idx) + 1,
                            Shift: _.Shift,
                            Person: _.Person,
                            DrawingNo: _.DrawingNo,
                            ProductID: _.ProductID,
                            SupplierNo: _.Supplier,
                            RecordTime: _.time,
                            CheckResult: _.IsQualifiedText,
                            Params: {
                                ..._
                            }
                        }))
                    }
                }).then(res => {
                    if (res.data.code == 0) {
                        this.tipchange = true;
                        this.tipword = '新增成功';
                        this.closeAddOrEditBOM();
                    } else {
                        this.tipchange = true;
                        this.tipword = res.data.msg;
                    }
                });
            } else if (this.addOrEditBOMType == 'edit') {
                this.$axios({
                    method: 'post',
                    url: '/api/ProcessParameterReport/ModifyData',
                    data: {
                        WID: this.leftListCur.WID,
                        Items: this.popList.map((_, idx) => ({
                            Number: Number(idx) + 1,
                            Id: _.Id,
                            SupplierNo: _.Supplier,
                            CheckResult: _.IsQualifiedText,
                            Params: {
                                ..._
                            }
                        }))
                    }
                }).then(res => {
                    if (res.data.code == 0) {
                        this.tipchange = true;
                        this.tipword = '修改成功';
                        this.closeAddOrEditBOM();
                    } else {
                        this.tipchange = true;
                        this.tipword = res.data.msg;
                    }
                });
            }
        },
        closeAddOrEditBOM() {
            this.addOrEditBOMShow = false;
            this.addOrEditBOMType = '';
            this.scanInput = '';
            this.popList = [];
            this.delPopData = [];
            this.curPopShift = '';
            this.curPopPerson = '';
        },
        tip1() {
            this.tipchange = false;
        },
        isPositiveInteger(s) {
            //是否为正整数
            var re = /^[0-9]+$/;
            return re.test(s);
        },
        req(pageIndex, s) {
            if (s == 'jump') {
                if (!this.isPositiveInteger(pageIndex)) {
                    //
                    return;
                } else {
                    if (
                        pageIndex !== 1 &&
                        pageIndex !== this.pageData.TotalPage
                    ) {
                        if (
                            pageIndex < 1 ||
                            pageIndex > this.pageData.TotalPage
                        ) {
                            //
                            return;
                        }
                    }
                }
            }
            //axios
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
            let moveLeft = event.pageX - 900 + 'px';
            let moveTop = event.pageY - 20 + 'px';
            this.$refs.addOrEditBOM.style.left = moveLeft;
            this.$refs.addOrEditBOM.style.top = moveTop;
        },
        mouseDownHandleelse5(event) {
            event.currentTarget.style.cursor = 'move';
            window.onmousemove = this.mouseMoveHandleelse5;
            event.stopPropagation();
        },

        mouseMoveHandleelse5(event) {
            let moveLeft = event.pageX - 400 + 'px';
            let moveTop = event.pageY - 20 + 'px';
            this.$refs.verificationPop.style.left = moveLeft;
            this.$refs.verificationPop.style.top = moveTop;
        },
        mouseUpHandleelse(event) {
            window.onmousemove = null;
            event.currentTarget.style.cursor = 'move';
        },

        //初始化时间
        getDate1() {
            let myDate = new Date(); //获取当前年
            let year = myDate.getFullYear(); //获取当前月
            let month = myDate.getMonth() + 1;
            let mothe = month > 9 ? month : '0' + month; //获取当前日
            let date = myDate.getDate();
            let da = date > 9 ? date : '0' + date;
            let h = myDate.getHours(); //获取当前小时数(0-23)
            let he = h > 9 ? h : '0' + h;
            let m = myDate.getMinutes(); //获取当前分钟数(0-59)
            let me = m > 9 ? m : '0' + m;
            let s = myDate.getSeconds();
            let se = s > 9 ? s : '0' + s;
            this.timevalue2 = year + '-' + mothe + '-' + da;
            let myDate0 = new Date(
                new Date(new Date().toLocaleDateString()).getTime() -
                    1000 * 60 * 60 * 24 * 6 //7天
            );
            let year0 = myDate0.getFullYear(); //获取当前月
            let month0 = myDate0.getMonth() + 1;
            let mothe0 = month0 > 9 ? month0 : '0' + month0; //获取当前日
            let date0 = myDate0.getDate();
            let da0 = date0 > 9 ? date0 : '0' + date0;
            let h0 = myDate0.getHours(); //获取当前小时数(0-23)
            let he0 = h0 > 9 ? h0 : '0' + h0;
            let m0 = myDate0.getMinutes(); //获取当前分钟数(0-59)
            let me0 = m0 > 9 ? m0 : '0' + m0;
            let s0 = myDate0.getSeconds();
            let se0 = s0 > 9 ? s0 : '0' + s0;
            this.timevalue1 = year0 + '-' + mothe0 + '-' + da0;
        },
        getDateTime() {
            let myDate = new Date(); //获取当前年
            let year = myDate.getFullYear(); //获取当前月
            let month = myDate.getMonth() + 1;
            let mothe = month > 9 ? month : '0' + month; //获取当前日
            let date = myDate.getDate();
            let da = date > 9 ? date : '0' + date;
            let h = myDate.getHours(); //获取当前小时数(0-23)
            let he = h > 9 ? h : '0' + h;
            let m = myDate.getMinutes(); //获取当前分钟数(0-59)
            let me = m > 9 ? m : '0' + m;
            let s = myDate.getSeconds();
            let se = s > 9 ? s : '0' + s;
            return (
                year + '-' + mothe + '-' + da + ' ' + he + ':' + me + ':' + se
            );
        },
        allConfigure() {
            return new Promise((resolve, reject) => {
                this.$axios({
                    method: 'post',
                    url: '/api/ProcessParameterReport/QueryWorkSections'
                })
                    .then(res => {
                        if (res.data.code == 0) {
                            // res.data.data[0].MaterielProjects = [
                            //     {
                            //         MID: 1,
                            //         SID: 1,
                            //         MaterielName: 'test',
                            //         StepName: 's1',
                            //         ProjectName: '工艺1',
                            //         Number: 1
                            //     }
                            // ];
                            console.log('allConfigure2', res.data.data);
                            this.leftList = res.data.data;
                            this.leftListCur = res.data.data[0];
                            // this.leftListCur = {
                            //     IsRepaired: true,
                            //     WID: 111,
                            //     WorkName: '123',
                            //     Projects: [{ StepName: '12' }],
                            // };
                        } else {
                            this.tipchange = true;
                            this.tipword = res.data.msg;
                        }
                        resolve(res);
                    })
                    .catch(e => {
                        reject(e);
                    });
            });
        },
        getShift() {
            return new Promise((resolve, reject) => {
                this.$axios({
                    method: 'get',
                    url: '/api/ProcessParameterReport/GetShifts'
                })
                    .then(res => {
                        if (res.data.code == 0) {
                            let obj = res.data.data;
                            let temp = [];
                            for (let k in obj) {
                                temp.push({ key: k, label: obj[k] });
                            }
                            this.shiftList = temp;
                            this.curShift = temp[0].key;
                        } else {
                            this.tipchange = true;
                            this.tipword = res.data.msg;
                        }
                        resolve(res);
                    })
                    .catch(e => {
                        reject(e);
                    });
            });
        },
        getSuppliers() {
            return new Promise((resolve, reject) => {
                this.$axios({
                    method: 'get',
                    url: '/api/ProcessParameterReport/GetSuppliers'
                })
                    .then(res => {
                        if (res.data.code == 0) {
                            let obj = res.data.data;
                            let temp = [];
                            for (let k in obj) {
                                temp.push({ key: k, label: obj[k] });
                            }
                            this.supplierList = temp;
                            // this.curSupplier = temp[0].key;
                            this.curSupplier = ''; //''代表全部,后端过来时在下标0，但按for in循环''会被排到最后
                        } else {
                            this.tipchange = true;
                            this.tipword = res.data.msg;
                        }
                        resolve(res);
                    })
                    .catch(e => {
                        reject(e);
                    });
            });
        },
        beforegetData() {
            this.isPower(this.queryId).then(val => {
                if (val) {
                    this.getData();
                } else {
                    this.tipchange = true;
                    this.tipword = '没有查询权限';
                }
            });
        },
        getData() {
            this.$axios({
                method: 'post',
                url: `/api/ProcessParameterReport/QueryReportData?startTime=${this.timevalue1}&endTime=${this.timevalue2}&code=${this.searchInput}&shift=${this.curShift}&supplier=${this.curSupplier}&accurate=${this.curCodeType}&wid=${this.leftListCur.WID}`
            }).then(res => {
                if (res.data.code == 0) {
                    this.tableList = res.data.data.data;

                    this.pidArr = res.data.data.data
                        .filter(
                            _ =>
                                _.ProjectDatas &&
                                _.ProjectDatas.length &&
                                _.ProjectDatas[0].Value
                        )
                        .map(_ => _.ProjectDatas[0].Value);
                    this.proName = this.leftListCur.Projects[0].StepName;
                    this.proNameId = this.leftListCur.Projects[0].PID;
                    this.ProductIDArr = res.data.data.data
                        .filter(
                            _ =>
                                _.ProjectDatas &&
                                _.ProjectDatas.length &&
                                _.ProjectDatas[0].Value
                        )
                        .map(_ => _.ProductID);
                    this.UpperArr = this.ProductIDArr.map(
                        _ => this.leftListCur.Projects[0].Upper
                    );
                    this.LowerArr = this.ProductIDArr.map(
                        _ => this.leftListCur.Projects[0].Lower
                    );
                    this.printEchart();
                } else {
                    this.tipchange = true;
                    this.tipword = res.data.msg;
                }
            });
        },
        changePrint(item) {
            this.pidArr = this.tableList
                .filter(
                    _ =>
                        _.ProjectDatas &&
                        _.ProjectDatas.length &&
                        _.ProjectDatas[0].Value
                )
                .map(_ => _.ProjectDatas.find(_2 => _2.PID == item.PID).Value);
            this.proName = this.leftListCur.Projects.find(
                _ => _.PID == item.PID
            ).StepName;
            this.proNameId = item.PID;
            this.ProductIDArr = this.tableList
                .filter(
                    _ =>
                        _.ProjectDatas &&
                        _.ProjectDatas.length &&
                        _.ProjectDatas[0].Value
                )
                .map(_ => _.ProductID);

            let Upper = this.leftListCur.Projects.find(_ => _.PID == item.PID)
                .Upper;
            let Lower = this.leftListCur.Projects.find(_ => _.PID == item.PID)
                .Lower;
            this.UpperArr = this.ProductIDArr.map(_ => Upper);
            this.LowerArr = this.ProductIDArr.map(_ => Lower);
            this.printEchart();
        },
        printEchart() {
            let myChart = echarts.init(document.getElementById('myChart')); // 绘制图表
            myChart.clear();
            myChart.setOption({
                title: {
                    text: ''
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data: ['上限', this.proName, '下限'],
                    icon: 'line'
                },
                grid: {
                    left: '4%',
                    right: '4%',
                    bottom: '4%',
                    containLabel: true
                },
                xAxis: {
                    type: 'category',
                    data: this.ProductIDArr,
                    axisLine: { show: true } //轴线不显示
                },
                yAxis: {
                    type: 'value',
                    min: 'dataMin',
                    max: 'dataMax'
                },
                series: [
                    {
                        symbol: 'none',
                        name: '上限',
                        type: 'line',
                        animation: false,
                        data: this.UpperArr,
                        itemStyle: {
                            normal: {
                                lineStyle: {
                                    color: 'red', //改变折线颜色
                                    width: 1
                                }
                            }
                        }
                    },
                    {
                        symbol: 'none',
                        name: this.proName,
                        type: 'line',
                        data: this.pidArr,
                        animation: false,
                        color: 'green',
                        itemStyle: {
                            normal: {
                                lineStyle: {
                                    color: 'green', //改变折线颜色
                                    width: 1
                                }
                            }
                        }
                    },
                    {
                        symbol: 'none',
                        name: '下限',
                        type: 'line',
                        data: this.LowerArr,
                        animation: false,
                        itemStyle: {
                            normal: {
                                lineStyle: {
                                    color: 'blue', //改变折线颜色
                                    width: 1
                                }
                            }
                        }
                    }
                ]
            });
        },
        //导出xlsx
        exportXlsxFun() {
            this.isExport = false;
            window.open(
                `/api/ProcessParameterReport/Export?startTime=${
                    this.timevalue1
                }&endTime=${this.timevalue2}&code=${this.searchInput}&shift=${
                    this.curShift
                }&supplier=${this.curSupplier}&accurate=${
                    this.curCodeType
                }&wid=${
                    this.leftListCur.WID
                }&argLanguage=${localStorage.getItem('currentLang')}`
            );
        },
        //导出图片
        exportPngFun() {
            this.loading = true;
            html2canvas(document.getElementById('linebox')).then(canvas => {
                this.imgmap = canvas.toDataURL();
                console.log('this.imgmap:', this.imgmap);
                document.execCommand;
                if (window.navigator.msSaveOrOpenBlob) {
                    var bstr = atob(this.imgmap.split(',')[1]);
                    var n = bstr.length;
                    var u8arr = new Uint8Array(n);
                    while (n--) {
                        u8arr[n] = bstr.charCodeAt(n);
                    }
                    var blob = new Blob([u8arr]);
                    window.navigator.msSaveOrOpenBlob(
                        blob,
                        '参数报表' + '.' + 'png'
                    );
                    this.loading = false;
                } else {
                    const a = document.createElement('a'); // 这里就按照chrome等新版浏览器来处理
                    a.href = this.imgmap;
                    a.setAttribute('download', 'chart-download');
                    a.click();
                    this.loading = false;
                }
                this.isExport = false;
            });
        },
        //关闭弹窗
        exportClose() {
            this.isExport = false;
        },
        //开启导出弹窗
        exportTable() {
            this.isPower(this.exportId).then(val => {
                if (val) {
                    this.isExport = true;
                } else {
                    this.isTipsPop = true;
                }
            });
        },
        powerBtn() {
            var powerData = this.$store.state.btnPowerData;
            if (!powerData.length) return; //不然页面会崩
            var btnList = []; // 按钮数据列表
            var btnObj = {}; // 按钮对象是为了能根据key快速查询对应的按钮数据
            // 获取按钮权限ID
            for (let i = 0, iLen = powerData.length; i < iLen; i++) {
                const Children = powerData[i].Children;
                for (let n = 0, nLen = Children.length; n < nLen; n++) {
                    const item = Children[n];
                    if (item.RightID === this.$route.query.id) {
                        btnList = item.Children;
                        break;
                    }
                }
                if (btnList.length) break;
            }
            btnList.forEach(item => {
                btnObj[item.RightDesc] = item;
            });
            this.exportId = btnObj['参数报表-导出按钮']
                ? btnObj['参数报表-导出按钮'].RightID
                : '';
            this.queryId = btnObj['参数报表-查询按钮']
                ? btnObj['参数报表-查询按钮'].RightID
                : '';
            this.enterId = btnObj['参数报表-数据录入按钮']
                ? btnObj['参数报表-数据录入按钮'].RightID
                : '';
            this.editId = btnObj['参数报表-数据修改按钮']
                ? btnObj['参数报表-数据修改按钮'].RightID
                : '';
        },
        // 该用户是否有权限
        isPower(id) {
            if (!id) {
                this.tipchange = true;
                this.tipword = 'ID不能为空';
                return;
            }
            return new Promise((resolve, reject) => {
                var userinfo = JSON.parse(sessionStorage.getItem('userInfo1'));
                var sightseerInfo1 = JSON.parse(
                    sessionStorage.getItem('sightseerInfo1')
                );
                var argUserID =
                    userinfo != null
                        ? (argUserID = userinfo.SCMSUserID)
                        : (argUserID = sightseerInfo1.SCMSUserID);
                this.$axios({
                    // 权限配置请求接口
                    method: 'post',
                    url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${argUserID}&argRightID=${id}`
                }).then(
                    res => {
                        resolve(res.data.data);
                    },
                    err => {
                        console.log('该用户是否有权限-报错', err);
                    }
                );
            });
        }
    },
    mounted() {
        console.log('mounted');
        this.getDate1();
        this.powerBtn();
        Promise.all([
            this.allConfigure(),
            this.getShift(),
            this.getSuppliers()
        ]).then(res => {
            this.getData();
        });
    }
};
</script>
<style lang="scss">
.material-management {
    .el-icon-arrow-up:before {
        content: '';
        background: url('../../assets/images/Default-shang.png') no-repeat;
        background-size: 20px 12px;
        width: 20px;
        height: 12px;
        position: absolute;
        left: 0;
        top: 14px;
    }
}
</style>
<style lang="scss" scoped>
.material-management {
    width: 100%;
    height: calc(100% - 130px);
    color: #000;
    margin-top: 100px;
    background-color: #eee;
    padding: 20px 10px;
    box-sizing: border-box;
    .material-content {
        width: 100%;
        height: 100%;
        background-color: #fff;
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
            }
            .ExportBtn {
                background: #fff;
                color: #4270e4;
                border: 1px solid #4270e4;
            }
        }
        .material-form {
            width: 100%;
            height: calc(100% - 60px);
            padding: 10px;
            box-sizing: border-box;
            .material-echart {
                width: 100%;
                height: 390px;
                border: 1px solid #d5d5d5;
            }
            .material-table {
                width: 100%;
                height: calc(100% - 390px);
                padding-top: 10px;
                box-sizing: border-box;
                display: flex;
                position: relative;

                .material-group {
                    height: 100%;
                    width: 270px;
                    background: #f9f9f9;
                    border: 1px solid #dddddd;
                    overflow-y: auto;
                    .group-label {
                        width: 100%;
                        height: 40px;
                        display: flex;
                        align-items: center;
                        padding-left: 15px;
                        cursor: pointer;
                        position: relative;
                        .group-point {
                            position: absolute;
                            right: 10px;
                            top: 50%;
                            transform: translate(0, -50%);
                            width: 10px;
                            height: 10px;
                            border-radius: 2px;
                        }
                        .green-point {
                            background: #75c15f;
                        }
                        .red-point {
                            background: #e66443;
                        }
                    }
                    .group-label:hover {
                        background: #dbdbdb;
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
                        position: absolute;
                        left: 0;
                        top: 0;
                    }
                }
                // .material-group::-webkit-scrollbar {
                //     width: 0px !important;
                // }
                .material-data {
                    height: 100%;
                    width: calc(100% - 280px);
                    margin-left: 10px;
                    border: 1px solid #e4e4e4;
                    overflow-y: auto;
                    overflow-x: auto;

                    .material-data-content {
                        width: fit-content;
                        height: auto;
                        position: relative;

                        .sticky1 {
                            position: sticky;
                            top: 50px;
                            z-index: 10;
                        }
                        .sticky2 {
                            position: sticky;
                            top: 130px;
                            z-index: 10;
                        }
                        .data-line0 {
                            width: 100%;
                            height: auto;
                            display: flex;
                            position: sticky;
                            top: 0;
                            z-index: 10;
                            .data-key01 {
                                width: 1260px;
                                height: 50px;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                border-right: 1px solid #ffffff;
                                border-bottom: 1px solid #ffffff;
                                background: #d9dce2;
                                color: #333333;
                                font-weight: bolder;
                            }
                            .data-key02 {
                                flex: auto;
                                height: 50px;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                border-right: 1px solid #ffffff;
                                border-bottom: 1px solid #ffffff;
                                background: #d4e5db;
                                color: #333333;
                                font-weight: bolder;
                            }
                        }

                        .data-line {
                            width: fit-content;
                            height: auto;
                            display: flex;
                            .data-leftTitle {
                                width: fit-content;
                                height: auto;
                            }
                            .data-key,
                            .data-key3 {
                                width: 150px;
                                height: 80px;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                border-right: 1px solid #ffffff;
                                background: #d9dce2;
                                color: #333333;
                            }
                            .data-key3,
                            .data-key4 {
                                width: 150px;
                                height: 40px;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                border-top: 1px solid #ffffff;
                                border-right: 1px solid #ffffff;
                                background: #d9dce2;
                                color: #333333;
                            }
                            .data-key4 {
                                background: #d4e5db;
                            }
                            .data-key2 {
                                border-right: 1px solid #ffffff;
                                background: #d4e5db;
                                color: #333333;
                                width: fit-content;
                                height: 80px;
                                //    display: flex;
                                // align-items: center;
                                // justify-content: center;
                                // flex-direction: column;
                                .data-key2-up {
                                    width: 100%;
                                    height: 40px;
                                    border-bottom: 1px solid #ffffff;
                                    box-sizing: border-box;
                                    display: flex;
                                    align-items: center;
                                    justify-content: center;
                                    .data-key2-label {
                                        width: 150px;
                                        height: 40px;
                                        border-right: 1px solid #ffffff;
                                        display: flex;
                                        align-items: center;
                                        justify-content: center;
                                        line-height: 1;
                                    }
                                }
                                .data-key2-down {
                                    width: fit-content;
                                    display: flex;
                                    .data-key2-label {
                                        width: 150px;
                                        height: 40px;
                                        border-right: 1px solid #ffffff;
                                        display: flex;
                                        align-items: center;
                                        justify-content: center;
                                        cursor: pointer;
                                        line-height: 1;
                                    }

                                    .curBorder {
                                        border: 2px solid #386df0;
                                        border-right: 2px solid #386df0;
                                    }
                                }
                            }

                            .data-value {
                                height: 50px;
                                width: 150px;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                border-right: 1px solid #e4e4e4;
                                border-bottom: 1px solid #e4e4e4;
                                background: #fff;
                                word-break: break-all;
                                line-height: 1;
                                .chartBtn {
                                    width: 24px;
                                    height: 20px;
                                    margin-left: 5px;
                                    cursor: pointer;
                                    border-radius: 4px;
                                    border: #757575 1px solid;
                                    display: inline-block;
                                    padding: 1px 1px;
                                    box-sizing: border-box;
                                    vertical-align: middle;
                                    line-height: 1;

                                    img {
                                        width: 100%;
                                        height: 100%;
                                        line-height: 1;
                                    }
                                }
                            }
                            .mater {
                                background-color: #00affd;
                            }

                            .t1 {
                                width: 80px;
                                // position: sticky;
                                // left: 0;
                            }
                            .t5,
                            .t5-value {
                                width: 250px;
                            }
                            .t5-value {
                                word-break: unset;
                                white-space: nowrap;
                                overflow: hidden;
                                text-overflow: ellipsis;
                                display: unset;
                                line-height: 50px;
                                text-align: center;
                            }

                            .t8 {
                                width: 180px;
                            }
                        }
                    }
                }
            }
        }
        .pages-container {
            width: 100%;
            height: 60px;
        }
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
        margin-left: 10px;
        cursor: pointer;
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
    .greyBtn {
        background: #fff;
        color: #999999;
        border: 1px solid #999999;
    }
    .cancleBtn {
        background: #999999;
        color: #fff;
    }
    .disableBtn {
        cursor: default;
    }
}

.verification,
.jurisdiction,
.addMaterial {
    position: fixed;
    width: 560px;
    height: 465px;
    z-index: 17;
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
    z-index: 18;
}
.addOrEditBOM {
    position: fixed;
    width: 1440px;
    height: 770px;
    z-index: 15;
    top: 110px;
    left: 260px;
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
        .addOrEditBOM-search {
            width: 100%;
            height: 70px;
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
            height: calc(100% - 130px);

            background: #fff;
            border: 1px solid #dddddd;
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

.color2 {
    color: red;
}
.cover2 {
    width: 100%;
    height: 100%;
    z-index: 29;
    position: fixed;
    top: 0;
    left: 0;
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
    .tipword {
        width: 100%;
        padding: 30px;
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
.chartPop {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 101;

    .myDialog {
        position: relative;
        width: 1000px;
        height: auto;
        top: 50%;
        transform: translateY(-50%);
        margin: auto;
        background: rgba(238, 238, 238);
        box-shadow: 0px 0px 21px rgba(45, 46, 46, 0.43);

        .popHeader {
            width: 100%;
            height: 60px;
            background: rgba(56, 109, 240);
            line-height: 60px;
            text-align: center;
            color: #ffffff;
            font-size: 20px;
            position: relative;

            img {
                width: 60px;
                height: 60px;
                position: absolute;
                top: 0px;
                right: 0px;
                cursor: pointer;
            }
        }

        .popContent {
            width: 100%;
            height: 500px;
            padding: 20px 30px;
            padding-bottom: 0;
        }

        .popBtn {
            width: 100%;
            height: 60px;
            text-align: center;
            // line-height: 60px;

            .btn {
                width: 100px;
                height: 38px;
                background: rgba(153, 153, 153);
                border-radius: 4px;
                font-size: 16px;
                color: #ffffff;
                margin-left: 20px;
                border: 1px solid #999999;
            }
        }
    }
}
</style>
