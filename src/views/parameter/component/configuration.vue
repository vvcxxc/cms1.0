<!--
 * @Description: 这是参数报表页面（组件）
 * @Date: 2019-11-28 10:59:10
 * @Author: Tao
 * @LastEditors: Tao
 * @LastEditTime: 2021-04-08 15:25:35
 -->
<template>
    <div v-loading="loading || loading2 || loading3" ref="head" class="tapwater" :style="{ zoom: zoomValue }">
        <div class="linebox" id="linebox">
            <div class="query-table clearfix">
                <div class="fl">
                    <span>完工时间范围</span>
                    <el-date-picker @change="stateTime" @focus="getZoom()" v-model="value1"
                        :disabled="selectVale == lang.ProcessParameterReport_HT_AccurateMatching" type="datetime"
                        :placeholder="lang.SCMSConsoleWebApiMySql_PleChooseDate" value-format="yyyy-MM-dd HH:mm:ss"
                        :style="{ width: '160px' }"></el-date-picker>
                    <span>-</span>
                    <el-date-picker @change="entTime" @focus="getZoom()" v-model="value2"
                        :disabled="selectVale == lang.ProcessParameterReport_HT_AccurateMatching" type="datetime"
                        :placeholder="lang.SCMSConsoleWebApiMySql_PleChooseDate" value-format="yyyy-MM-dd HH:mm:ss"
                        :style="{ width: '160px' }"></el-date-picker>
                    <span>产品型号</span>
                    <el-select style="margin-left:5px;width:120px" v-model="ProductTypeCode" @focus="getZoom()"
                        :placeholder="lang.SCMSConsoleWebApiMySql_PleChoose">
                        <el-option label="全部" value="全部"> </el-option>
                        <el-option v-for="item in ProductTypeList" :key="item.ProductTypeCode" :label="item.ProductTypeCode"
                            :value="item.ProductTypeCode">
                        </el-option>
                    </el-select>
                    <span>是否合格</span>
                    <el-select style="margin-left:5px;width:80px" v-model="QualitiedType" @focus="getZoom()"
                        :placeholder="lang.SCMSConsoleWebApiMySql_PleChoose">
                        <el-option label="全部" value="全部"> </el-option>
                        <el-option label="是" value="是"> </el-option>
                        <el-option label="否" value="否"> </el-option>
                    </el-select>
                    <span>类型</span>
                    <el-select style="margin-left:5px;width:80px" v-model="WorkType" @focus="getZoom()"
                        :placeholder="lang.SCMSConsoleWebApiMySql_PleChoose">
                        <el-option label="全部" value="全部"> </el-option>
                        <el-option label="正常" value="正常"> </el-option>
                        <el-option label="返修" value="返修"> </el-option>
                        <el-option label="报废" value="报废"> </el-option>
                        <el-option label="未加工" value="未加工"> </el-option>
                    </el-select>
                    <!-- <el-select style="margin-left:5px;width:100px" v-model="QueryKeyType" @focus="getZoom()"
                        :placeholder="lang.SCMSConsoleWebApiMySql_PleChoose">
                        <el-option label="产品ID" value="产品ID"> </el-option>
                        <el-option label="订单号" value="订单号"> </el-option>
                        <el-option label="参数内容" value="参数内容"> </el-option>
                        <el-option label="操作人" value="操作人"> </el-option>
                    </el-select>
                    <el-select style="margin-left:5px;width:100px" v-model="selectVale" @focus="getZoom()"
                        :placeholder="lang.SCMSConsoleWebApiMySql_PleChoose">
                        <el-option v-for="item in selectOptions" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select> -->
                    <el-select style="margin-left:5px;width:100px" v-model="QueryKeyType" @focus="getZoom()"
                        :placeholder="lang.SCMSConsoleWebApiMySql_PleChoose">
                        <el-option label="产品ID" value="产品ID"> </el-option>
                        <el-option label="工单号" value="工单号"> </el-option>
                        <el-option label="物料码" value="物料码"> </el-option>
                    </el-select>
                    <input style="margin-left:5px;width:120px" type="text" v-model="codeText" placeholder="请输入关键字"
                        class="txt">
                    <div class="query" @click="changetime()">{{ lang.FormulaManage_AddProject_Select }}</div>
                    <div class="set" @click="openDisplaySettings">显示设置</div>
                    <!-- <div class="edit" @click="openProductScrapping">产品解绑</div>
                    <div class="query" @click="openDataUpdate">数据修改</div> -->
                    <div class="export" @click="exportTable()">导出</div>
                </div>
            </div>
            <div id="conter" class="conter">
                <div class="report-banner">
                    <div class="banner-item" style="grid-row-start: span 2;">
                        <div class="item-content">
                            <div class="item-label">投料数</div>
                            <div class="item-unit"><div class="item-num">{{ TouLiaoNum }}</div>件</div>
                        </div>
                    </div>
                    <div class="banner-item">
                        <div class="item-content">
                            <div class="item-label">总产量</div>
                            <div class="item-num">{{ TotalNum }}</div>
                            <div class="item-unit">件</div>
                        </div>
                    </div>
                    <div class="banner-item">
                        <div class="item-content">
                            <div class="item-label">OK数</div>
                            <div class="item-num">{{ OKNum }}</div>
                            <div class="item-unit">件</div>
                        </div>
                    </div>
                    <div class="banner-item">
                        <div class="item-content">
                            <div class="item-label">NG数</div>
                            <div class="item-num red">{{ NGNum }}</div>
                            <div class="item-unit">件</div>
                        </div>
                    </div>
                    <div class="banner-item">
                        <div class="item-content">
                            <div class="item-label">一次合格率</div>
                            <div class="item-num green">{{ OneQualifiedRate }}</div>
                            <div class="item-unit">%</div>
                        </div>
                    </div>
                    <div class="banner-item" style="grid-row: span 2;">
                        <div class="item-content">
                            <div class="item-label">总合格率</div>
                            <div class="item-unit"><div class="item-num green">{{ TotalRate }}</div>%</div>
                        </div>
                    </div>
                    <div class="banner-item">
                        <div class="item-content">
                            <div class="item-label">返修数</div>
                            <div class="item-num">{{ RepairNum }}</div>
                            <div class="item-unit">件</div>
                        </div>
                    </div>
                    <div class="banner-item">
                        <div class="item-content">
                            <div class="item-label">返修OK数</div>
                            <div class="item-num">{{ RepairOKNum }}</div>
                            <div class="item-unit">件</div>
                        </div>
                    </div>
                    <div class="banner-item">
                        <div class="item-content">
                            <div class="item-label">报废数</div>
                            <div class="item-num red">{{ ScrapNum }}</div>
                            <div class="item-unit">件</div>
                        </div>
                    </div>
                    <div class="banner-item">
                        <div class="item-content">
                            <div class="item-label">返修合格率</div>
                            <div class="item-num green">{{ RepairQualifiedRate }}</div>
                            <div class="item-unit">%</div>
                        </div>
                    </div>
                </div>
                <div class="report-page">
                    <div class="charts">
                        <div class="chart-label">
                            <div class="c-w">
                                <div class="c-i"></div>
                            </div>
                            {{ tableData.chartTitle }}
                        </div>
                        <div class="mychart" id="mychart"></div>
                    </div>
                    <div class="table">
                        <div class="table-l">
                            <div class="l-item" v-for="item in tableData.leftarr" :key="item.WID" @click="changeLeft(item)"
                                :style="leftItemStyle(tableData.curLeft && item.WID == tableData.curLeft.WID, item.displayColor)">
                                {{ item.WorkName }}
                                <div class="l-icon"></div>
                            </div>
                        </div>
                        <div class="table-r" v-if="tableData.curLeft">
                            <div class="table-box">
                                <!-- 拒绝el-table,从你我做起，eltable加载七八百条数据就卡的飞起 -->
                                <table cellspacing="0" cellpadding="1">
                                    <thead>
                                        <!-- <tr>
                                            <th colspan="5" rowspan="1" class="blue-th">{{
                                                lang.ProcessParameterReport_HT_Information }}</th>
                                            <th :colspan="tableData.curLeft.WorkSteps.reduce((sum, w) => { return w.Projects.length + sum }, 1)"
                                                rowspan="1">
                                                {{ tableData.curLeft.WorkName }}</th>
                                        </tr> -->
                                        <tr>
                                            <th colspan="1" rowspan="2" class="blue-th no1">{{
                                                lang.ProcessParameterReport_HT_SerialNumber }}</th>
                                            <th colspan="1" rowspan="2" class="blue-th no2">
                                                {{ lang.ProcessParameterReport_HT_ProductID }}</th>

                                            <th colspan="1" rowspan="2" class="blue-th no3">产品型号</th>
                                            <th colspan="1" rowspan="2" class="blue-th no3">工单号</th>
                                            <th colspan="1" rowspan="2" class="blue-th no3">类型</th>
                                            <th colspan="1" rowspan="2" class="blue-th no4">{{
                                                lang.ProcessParameterReport_HT_IsProductQualified }}</th>
                                            <th colspan="1" rowspan="2" class="blue-th no5">{{
                                                lang.ProcessParameterReport_HT_ReasonForFailure }}</th>
                                            <th colspan="1" rowspan="2" class="blue-th no6">完工时间</th>
                                            <th :colspan="item.Projects.length" rowspan="1"
                                                v-for="(item, idx)  in tableData.curLeft.WorkSteps"
                                                :key="item.SID + idx + 'S1'">
                                                {{ item.StepName }}</th>
                                        </tr>
                                        <tr>
                                            <template v-for="(item, idx) in tableData.curLeft.WorkSteps">
                                                <th colspan="1" rowspan="1" v-for="item2 in item.Projects "
                                                    :key="item2.PID + 'P1'"
                                                    :class="{ 'hover-border': true, 'blue-Border': tableData.curPid == item2.PID }"
                                                    @click="clickHeader(item2.PID)">
                                                    {{ item2.ProjectName }}
                                                </th>
                                            </template>
                                        </tr>
                                        <tr>
                                            <th colspan="1" rowspan="1" class="blue-th no1">//</th>
                                            <th colspan="1" rowspan="1" class="blue-th no2">//</th>
                                            <th colspan="1" rowspan="1" class="blue-th no3">//</th>
                                            <th colspan="1" rowspan="1" class="blue-th no3">//</th>
                                            <th colspan="1" rowspan="1" class="blue-th no3">//</th>
                                            <th colspan="1" rowspan="1" class="blue-th no4">//</th>
                                            <th colspan="1" rowspan="1" class="blue-th no5">//</th>
                                            <th colspan="1" rowspan="1" class="blue-th no6">//</th>
                                            <template v-for="(item, idx)  in tableData.curLeft.WorkSteps">
                                                <th colspan="1" rowspan="1" v-for="item2 in item.Projects "
                                                    :key="item2.PID + 'P2'">
                                                    {{ item2.Unit }}
                                                </th>
                                            </template>
                                        <tr>
                                        </tr>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="item in tableData.dataList" :key="item.Number + 'data'">
                                            <td class="no1">{{ item.Number }}</td>
                                            <td class="no2">{{ item.ProductID }}</td>
                                            <td class="no3">{{ item.ProductTypeCode }}</td>
                                            <td class="no3">{{ item.OrderNumber }}</td>

                                            <td class="no3">{{ item.WorkTypeText }}</td>
                                            <td class="no4" :style="{ color: !item.IsQualified ? '#f56c6c' : '#000' }">{{
                                                item.IsQualifiedText
                                            }}</td>
                                            <el-tooltip effect="dark" :content="item.Reason" placement="top">
                                                <td class="no5" :style="{ color: !item.IsQualified ? '#f56c6c' : '#000' }">
                                                    {{ item.Reason }}
                                                </td>
                                            </el-tooltip>
                                            <td class="no6">{{ item.RecordTime }}</td>
                                            <template v-for="(item2, _idx) in tableData.curLeft.WorkSteps">
                                                <td colspan="1" rowspan="1" v-for="item3 in item2.Projects "
                                                    :key="item3.PID + 'P3'"
                                                    :style="{ color: returnProject(item, item3.PID).Red ? '#f56c6c' : '#000' }">
                                                    {{ returnProject(item, item3.PID).Value }}
                                                </td>
                                            </template>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
        <!-- 导出弹窗 -->
        <exportTasble v-if="isExport"></exportTasble>
        <!-- 提示弹窗和遮罩层 -->
        <TipsPop :popText="TipsPopText" v-if="isTipsPop"></TipsPop>
        <div v-if="isTipsPop || isExport" class="mask_box"></div>
        <ProductScrapping v-if="ProductScrappingShow" @callback="ProductScrappingCallback"></ProductScrapping>
        <DataUpdate v-if="DataUpdateShow" @callback="DataUpdateCallback"></DataUpdate>
        <DisplaySettings v-if="DisplaySettingsShow" @callback="DisplaySettingsCallback"></DisplaySettings>
    </div>
</template>

<script>
// vue文件中引入echarts工具
let echarts = require('echarts/lib/echarts')
import html2canvas from "html2canvas"
import TipsPop from '../../customer/TipsPop'
import exportTasble from './exportTablePop'
import ProductScrapping from './ProductScrapping'
import DataUpdate from './DataUpdate'
import DisplaySettings from './DisplaySettings'
export default {
    name: 'tapwater',
    components: {
        TipsPop,
        exportTasble,
        ProductScrapping,
        DataUpdate,
        DisplaySettings
    },
    data() {
        return {
            ProductScrappingShow: false,
            DataUpdateShow: false,
            DisplaySettingsShow: false,
            value1: new Date(new Date().toLocaleDateString()),
            value2: new Date(
                new Date(new Date().toLocaleDateString()).getTime() +
                24 * 60 * 60 * 1000 - 1
            ),
            starttime: '',
            endtime: '',
            change: 2,
            timevalue2: '',
            timevalue1: '',
            oldTimeValue1: '',
            oldTimeValue2: "",
            codeText: '',//产品码
            loading: false,
            loading2: false,
            loading3: false,
            queryId: '',
            exportId: '',
            scrappingId: '',
            displaySettingId: '',
            dataUpdateId: '',
            TipsPopText: '该用户没有操作权限',
            isTipsPop: false,
            isExport: false,
            exportCodeText: '',
            selectOptions: [{
                value: '模糊匹配',
                label: '模糊匹配'
            }, {
                value: '精准匹配',
                label: '精准匹配'
            }],
            selectVale: '模糊匹配',
            lang: JSON.parse(localStorage.getItem('languages'))[localStorage.getItem('currentLang')],
            zoomValue: 0,
            tableData: {
                leftarr: [],
                curLeft: null,
                dataList: [],
                curPid: '',
                chartTitle: ''
            },
            PageContext: {},
            ProductTypeList: [],
            ProductTypeCode: '全部',
            QualitiedType: '全部',
            WorkType: '全部',
            QueryKeyType: '产品ID',
            "TouLiaoNum": 0,
            "TotalNum": 0,
            "RepairNum": 0,
            "OKNum": 0,
            "RepairOKNum": 0,
            "NGNum": 0,
            "ScrapNum": 0,
            "OneQualifiedRate": 0.0,
            "RepairQualifiedRate": 0.0,
            "TotalRate": 100.0
        };
    },
    created() {
        this.$nextTick(() => {
            this.zoomValue = Number(parseFloat(window.screen.width / 1920).toFixed(2)) <= 0.9 ? 0.9 : Number(parseFloat(window.screen.width / 1920).toFixed(2))

        })
        this.getLangData()
        this.getDate1()
        this.allConfigure()
        this.powerBtn()
        //重新改变图表大小
        $(window).bind("resize",
            function () {
                let _dom = document.getElementById('mychart')
                let myChart = echarts.init(_dom);
                myChart.resize()
            }
        );
    },
    watch: {
        VpowerData(val) {  //监听按钮权限
            this.powerBtn()
        },
        "tableData.curLeft": {
            deep: true,
            immediate: true,
            handler: function (val, oldVal) {
                if (!val || !val.WID) return;
                if (oldVal && (val.WID === oldVal.WID)) return;
                this.Search();
            }
        },

    },
    computed: {
        VpowerData() {
            return this.$store.state.btnPowerData;
        },
    },
    methods: {
        openDisplaySettings() {
            this.isPower(this.displaySettingId).then((val) => {
                if (val) {
                    this.DisplaySettingsShow = true;
                } else {
                    this.isTipsPop = true
                    this.TipsPopText = '该用户没有操作权限！'
                }
            })
        },
        DisplaySettingsCallback(type, str) {
            this.DisplaySettingsShow = false;
            if (str) {
                this.isTipsPop = true
                this.TipsPopText = str
            }
            if (type == 'yes') {
                this.PageContext = {}//重置查询，回去第一页
                this.QueryReportData(true);
            }
        },
        openProductScrapping() {
            this.isPower(this.scrappingId).then((val) => {
                if (val) {
                    this.ProductScrappingShow = true;
                } else {
                    this.isTipsPop = true
                    this.TipsPopText = '该用户没有操作权限！'
                }
            })

        },
        ProductScrappingCallback(type, str) {
            this.ProductScrappingShow = false;
            if (str) {
                this.isTipsPop = true
                this.TipsPopText = str
            }
            if (type == 'yes') {
                this.PageContext = {}//重置查询，回去第一页
                this.QueryReportData(true);
            }
        },
        openDataUpdate() {
            this.isPower(this.dataUpdateId).then((val) => {
                if (val) {
                    this.DataUpdateShow = true;
                } else {
                    this.isTipsPop = true
                    this.TipsPopText = '该用户没有操作权限！'
                }
            })

        },
        DataUpdateCallback(type, str) {
            this.DataUpdateShow = false;
            if (str) {
                this.isTipsPop = true
                this.TipsPopText = str
            }
            if (type == 'yes') {
                this.PageContext = {}//重置查询，回去第一页
                this.QueryReportData(true);
            }
        },
        leftItemStyle(selected, displayColor) {
            if (selected) {
                return {
                    backgroundColor: displayColor || '#808080',
                    color: '#fff',
                    border: 'none',
                }
            }
            return {
                backgroundColor: '#fff',
                color: displayColor || '#808080',
                border: displayColor ? `1px solid ${displayColor}` : '1px solid #808080',
            }
        },
        getLangData() {
            this.selectOptions = [
                {
                    value: this.lang.ProcessParameterReport_HT_FuzzyMatching,
                    label: this.lang.ProcessParameterReport_HT_FuzzyMatching,
                }, {
                    value: this.lang.ProcessParameterReport_HT_AccurateMatching,
                    label: this.lang.ProcessParameterReport_HT_AccurateMatching
                }
            ]
            this.selectVale = this.lang.ProcessParameterReport_HT_FuzzyMatching
        },
        //关闭弹窗提示
        clonePopFun() {
            this.isTipsPop = false
        },
        // 筛选按钮数据
        powerBtn() {
            var powerData = this.$store.state.btnPowerData
            var btnList = [] // 按钮数据列表
            var btnObj = {} // 按钮对象是为了能根据key快速查询对应的按钮数据
            // 获取按钮权限ID
            for (let i = 0, iLen = powerData.length; i < iLen; i++) {
                const Children = powerData[i].Children;
                for (let n = 0, nLen = Children.length; n < nLen; n++) {
                    const item = Children[n];
                    if (item.RightID === this.$route.query.id) {
                        btnList = item.Children;
                        break
                    }
                }
                if (btnList.length) break;
            }
            btnList.forEach((item) => {
                btnObj[item.RightDesc] = item
            });
            console.log("btnObj", btnObj)
            this.exportId = btnObj['参数报表-导出按钮'].RightID
            this.queryId = btnObj['参数报表-查询按钮'].RightID
            this.displaySettingId = btnObj['参数报表-显示设置按钮'].RightID
        },
        // 该用户是否有权限
        isPower(id) {
            if (!id) {
                this.isTipsPop = true
                this.TipsPopText = 'ID不能为空';
                return;
            }
            return new Promise((resolve, reject) => {
                var userinfo = JSON.parse(sessionStorage.getItem('userInfo1'));
                var sightseerInfo1 = JSON.parse(sessionStorage.getItem('sightseerInfo1'));
                var argUserID = (userinfo != null) ? argUserID = userinfo.SCMSUserID : argUserID = sightseerInfo1.SCMSUserID
                this.$axios({
                    method: 'post',
                    url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${argUserID}&argRightID=${id}`,
                }).then(res => {
                    resolve(res.data.data)
                }, err => {
                    console.log('该用户是否有权限-报错', err)
                })
            })
        },

        clickHeader(id) {
            this.tableData.curPid = id
            this.drawLine()
        },

        returnProject(row, pid) {
            // let _obj = row.ProjectDatas.find(item => item.PID == pid)
            let _obj = row.ProjectDatas[pid]
            return _obj || {}
        },

        //查询所有报表的所有配置
        allConfigure() {

            this.$axios({
                method: 'post',
                url: '/api/FormulaManage/QueryProductType',
            }).then(res => {
                if (res.data.code == 0) {
                    this.ProductTypeList = res.data.data || [];
                    // if (this.ProductTypeList.length) {
                    //     this.ProductTypeCode = this.ProductTypeList[0].ProductTypeCode
                    // }
                    ///////////////
                    this.$axios({
                        method: 'post',
                        url: '/api/ProcessParameterReport/QueryWorkSections',
                    }).then(res => {
                        console.log('allConfigure', res.data.data)
                        if (!res.data.data || !res.data.data.length) {
                            this.$message.warning('请配置工序！');
                            return
                        }
                        let arr = res.data.data.filter(item => item.WorkSteps.length).map((item) => ({
                            ...item,
                            WorkSteps: item.WorkSteps.filter((item2) => item2.Projects.length).map((item2) => {
                                item2.Projects.unshift()
                                return item2
                            })
                        }));
                        this.tableData.leftarr = arr;
                        this.tableData.curLeft = this.tableData.leftarr[0];
                        this.$nextTick(() => {
                            this.tableScroll()
                        })
                    })
                } else {
                    this.isTipsPop = true
                    this.TipsPopText = res.data.msg
                }
            })



        },
        tableScroll() {
            let _dom = document.getElementsByClassName('table-r')[0]
            let that = this;
            //记录初始滚动条高度
            let beforeScrollTop = _dom.scrollTop;
            _dom.addEventListener('scroll', () => {
                // 滚动距离
                let scrollTop = _dom.scrollTop
                // 变量windowHeight是可视区的高度
                let windowHeight = _dom.clientHeight || _dom.clientHeight
                // 变量scrollHeight是滚动条的总高度
                let scrollHeight = _dom.scrollHeight || _dom.scrollHeight
                //滚动高度差，向下滚动才触发加载更多，横向滚动不触发
                let delta = scrollTop - beforeScrollTop;
                if (delta > 0 && (scrollTop + windowHeight === scrollHeight)) {
                    // 获取到的不是全部数据 当滚动到底部 继续获取新的数据
                    console.log("loadMorePage")
                    that.QueryReportData();
                }
            })

        },
        changeLeft(curLeft) {
            this.tableData.curLeft = null
            this.tableData.curLeft = curLeft
        },

        Search() {
            this.tableData.dataList = [];
            let _id = this.tableData.curPid
            this.tableData.curPid = ''
            this.tableData.curPid = _id
            this.PageContext = {}//重置查询，回去第一页
            this.QueryReportData(true);
            sessionStorage.setItem('configurationData', JSON.stringify({}));
        },


        //查询报表数据
        QueryReportData(first) {
            this.loading3 = true
            var accurate
            //1是模糊 2是精准
            if (this.selectVale == this.lang.ProcessParameterReport_HT_FuzzyMatching) {
                accurate = 1
            } else {
                accurate = 2
            }
            if (this.QueryKeyType == '物料码' || this.QueryKeyType == '工单号') {
                accurate = 2
            }

if(first){
    this.$axios({
                method: 'post',
                url: `/api/ProcessParameterReport/QueryReportTotal`,

                data: {
                    WID: this.tableData.curLeft.WID,
                    StartTime: this.timevalue1,
                    EndTime: this.timevalue2,
                    Code: this.codeText,
                    Accurate: accurate,
                    PageContext: this.PageContext,
                    ProductTypeCode: this.ProductTypeCode,
                    QualitiedType: this.QualitiedType,
                    WorkType: this.WorkType,
                    QueryKeyType: this.QueryKeyType
                },
            }).then(res => {
                let data = res.data.data
                this.TouLiaoNum = data.TouLiaoNum;
                this.TotalNum = data.TotalNum;
                this.RepairNum = data.RepairNum;
                this.OKNum = data.OKNum;
                this.RepairOKNum = data.RepairOKNum;
                this.NGNum = data.NGNum;
                this.ScrapNum = data.ScrapNum;
                this.OneQualifiedRate = data.OneQualifiedRate;
                this.RepairQualifiedRate = data.RepairQualifiedRate;
                this.TotalRate = data.TotalRate;
            })
}
            this.$axios({
                method: 'post',
                url: `/api/ProcessParameterReport/QueryReportData?wid=${this.tableData.curLeft.WID}&startTime=${this.timevalue1}&endTime=${this.timevalue2}&code=${this.codeText}&accurate=${accurate}`,
                data: {
                    WID: this.tableData.curLeft.WID,
                    StartTime: this.timevalue1,
                    EndTime: this.timevalue2,
                    Code: this.codeText,
                    Accurate: accurate,
                    PageContext: this.PageContext,
                    ProductTypeCode: this.ProductTypeCode,
                    QualitiedType: this.QualitiedType,
                    WorkType: this.WorkType,
                    QueryKeyType: this.QueryKeyType
                },
            }).then(res => {
                this.loading3 = false
                let data = res.data.data
 

                let temp = this.tableData.leftarr;
                if (data.color && data.color.length) {
                    temp.forEach((item, idx) => {
                        item.displayColor = data.color[idx] == 1 ? '#7ABD7A' : data.color[idx] == 2 ? '#F96363' : '#808080'
                    })
                } else {
                    temp.forEach((item, idx) => {
                        item.displayColor = '#808080'
                    })
                }
                this.tableData.leftarr = temp;
                // ProjectDatas转化为映射
                data.data.forEach(e => {
                    e.ProjectDatas = e.ProjectDatas.reduce((t, c) => {
                        t[c.PID] = c
                        return t
                    }, {})
                    return e
                })
                this.tableData.dataList = this.tableData.dataList.concat(data.data || []);

                this.PageContext = data.PageContext

                //查第一页的逻辑放这里面
                //查第一页时顺便查下曲线
                //跟运行版不同，运行版的QueryReportData是查第一页loadmorepage是查下一页，web的第一页和下一页都是QueryReportData

            })
                if (first) {
                    this.tableData.curPid = '';
                    if (this.tableData.curLeft.WorkSteps.length && this.tableData.curLeft.WorkSteps[0].Projects.length) {
                        this.tableData.curPid = this.tableData.curLeft.WorkSteps[0].Projects[0].PID
                    }
                    this.drawLine()
                }
        },

        //初始化时间
        getDate1() {
            var myDate = new Date(); //获取当前年
            var year = myDate.getFullYear();        //获取当前月
            var month = myDate.getMonth() + 1;
            var mothe = month > 9 ? month : '0' + month            //获取当前日
            var date = myDate.getDate();
            var da = date > 9 ? date : '0' + date
            var h = myDate.getHours(); //获取当前小时数(0-23)
            var he = h > 9 ? h : '0' + h
            var m = myDate.getMinutes(); //获取当前分钟数(0-59)
            var me = m > 9 ? m : '0' + m
            var s = myDate.getSeconds();
            var se = s > 9 ? s : '0' + s
            this.timevalue1 = year + '/' + mothe + '/' + da + ' ' + '00:00:00'       //获取当前时间
            this.timevalue2 = year + '.' + mothe + '.' + da + ' ' + '23:59:59'
            this.oldTimeValue1 = year + '/' + mothe + '/' + da + ' ' + '00:00:00'       //获取当前时间
            this.oldTimeValue2 = year + '/' + mothe + '/' + da + ' ' + '23:59:59'       //获取当前时间
        },
        getZoom() {
            this.$nextTick(() => {
                let dates = [...document.querySelectorAll('.el-picker-panel.el-date-picker')]
                dates.forEach(item => {
                    item.style.zoom = this.zoomValue
                })
                let drops = [...document.querySelectorAll('.el-select-dropdown.el-popper')]
                drops.forEach(item => {
                    item.style.zoom = this.zoomValue
                })
            })

        },
        //改数据格式
        stateTime() {
            this.timevalue1 = this.value1.replace(/-/g, "/")
            var sTime = this.$moment(this.timevalue1).format('YYYY-MM-DD HH:mm:ss')
            var eTime = this.$moment(this.timevalue2).format('YYYY-MM-DD HH:mm:ss')
            var diffs = this.$moment(eTime).diff(this.$moment(sTime), 'seconds')
            if (diffs < 0) {
                this.timevalue1 = this.$moment(this.oldTimeValue1).format('YYYY-MM-DD HH:mm:ss')
                this.value1 = this.$moment(this.oldTimeValue1).format('YYYY-MM-DD HH:mm:ss')
                this.isTipsPop = true
                this.TipsPopText = this.lang.ProcessParameterReport_HT_TimeCompare
            } else if (diffs == 0) {
                this.timevalue1 = this.oldTimeValue1
                this.timevalue2 = this.oldTimeValue2
                this.value1 = this.$moment(this.oldTimeValue1).format('YYYY-MM-DD HH:mm:ss')
                this.isTipsPop = true
                this.TipsPopText = '开始时间不能等于结束时间'

            } else {
                this.oldTimeValue1 = sTime
            }

        },
        entTime() {
            this.timevalue2 = this.value2.replace(/-/g, ".")
            var sTime = this.$moment(this.timevalue1).format('YYYY-MM-DD HH:mm:ss')
            var eTime = this.$moment(this.timevalue2).format('YYYY-MM-DD HH:mm:ss')
            var diffs = this.$moment(eTime).diff(this.$moment(sTime), 'seconds')
            if (diffs < 0) {
                this.timevalue2 = this.$moment(this.oldTimeValue2).format('YYYY-MM-DD HH:mm:ss')
                this.value2 = this.$moment(this.oldTimeValue2).format('YYYY-MM-DD HH:mm:ss')
                this.isTipsPop = true
                this.TipsPopText = this.lang.ProcessParameterReport_HT_TimeCompare
            } else if (diffs == 0) {
                this.timevalue2 = this.oldTimeValue2
                this.value2 = this.$moment(this.oldTimeValue2).format('YYYY-MM-DD HH:mm:ss')
                this.isTipsPop = true
                this.TipsPopText = '开始时间不能等于结束时间'

            } else {
                this.oldTimeValue2 = eTime
            }

        },
        //查询
        changetime() {
            this.isPower(this.queryId).then((val) => {
                if (val) {
                    this.Search()
                } else {
                    this.isTipsPop = true
                    this.TipsPopText = '该用户没有操作权限！'
                }
            })
        },
        //导出xlsx
        exportXlsxFun() {
            this.isExport = false
            var accurate
            //1是模糊 2是精准
            if (this.selectVale == this.lang.ProcessParameterReport_HT_FuzzyMatching) {
                accurate = 1
            } else {
                accurate = 2
            }
            if (this.QueryKeyType == '物料码' || this.QueryKeyType == '工单号') {
                accurate = 2
            }
            window.open(
                `/api/ProcessParameterReport/Export?wid=${this.tableData.curLeft.WID}&startTime=${this.timevalue1}&endTime=${this.timevalue2}&code=${this.exportCodeText}&accurate=${accurate}&argLanguage=${localStorage.getItem('currentLang')}`
            );
        },
        //导出图片
        exportPngFun() {
            this.loading = true
            html2canvas(document.getElementById('linebox')).then(canvas => {
                this.imgmap = canvas.toDataURL()
                document.execCommand
                if (window.navigator.msSaveOrOpenBlob) {
                    var bstr = atob(this.imgmap.split(',')[1])
                    var n = bstr.length
                    var u8arr = new Uint8Array(n)
                    while (n--) {
                        u8arr[n] = bstr.charCodeAt(n)
                    }
                    var blob = new Blob([u8arr])
                    window.navigator.msSaveOrOpenBlob(blob, '曲线' + '.' + 'png')
                    this.loading = false
                } else {
                    const a = document.createElement('a')// 这里就按照chrome等新版浏览器来处理
                    a.href = this.imgmap
                    a.setAttribute('download', 'chart-download')
                    a.click()
                    this.loading = false
                }
                this.isExport = false
            });
        },
        //关闭弹窗
        exportClose() {
            this.isExport = false
        },
        //开启导出弹窗
        exportTable() {
            this.isPower(this.exportId).then((val) => {
                if (val) {
                    this.isExport = true

                } else {
                    this.isTipsPop = true
                    this.TipsPopText = '该用户没有操作权限！'
                }
            })

        },
        formatJson(filterVal, jsonData) {
            return jsonData.map(v => filterVal.map(j => v[j]));
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
        // 基于准备好的dom，初始化echarts实例
        drawLine() {
            let SID = '';
            this.tableData.curLeft.WorkSteps.forEach(item => {
                let _obj = item.Projects.find(item2 => item2.PID == this.tableData.curPid)
                if (_obj) {
                    SID = item.SID
                }
            })
            let configurationData = JSON.parse(sessionStorage.getItem('configurationData')) || {}
            console.log('line', SID, configurationData)
            if (configurationData[SID] && configurationData[SID].length) {
                this.printLine(configurationData[SID])
            } else {
                var accurate
                //1是模糊 2是精准
                if (this.selectVale == this.lang.ProcessParameterReport_HT_FuzzyMatching) {
                    accurate = 1
                } else {
                    accurate = 2
                }
                if (this.QueryKeyType == '物料码' || this.QueryKeyType == '工单号') {
                    accurate = 2
                }
                this.loading2 = true
                this.$axios({
                    method: 'post',
                    url: `/api/ProcessParameterReport/QueryReportChartData`,
                    data: {
                        SID: SID,
                        WID: this.tableData.curLeft.WID,
                        StartTime: this.timevalue1,
                        EndTime: this.timevalue2,
                        Code: this.codeText,
                        Accurate: accurate,

                        ProductTypeCode: this.ProductTypeCode,
                        QualitiedType: this.QualitiedType,
                        WorkType: this.WorkType,
                        QueryKeyType: this.QueryKeyType
                    },
                }).then(res => {
                    this.loading2 = false
                    let _data = res.data.data.data
                    configurationData[SID] = _data
                    sessionStorage.setItem('configurationData', JSON.stringify(configurationData));
                    this.printLine(_data)
                })
            }


        },
        printLine(_data) {
            let temp = [], xList = [], stepName = '';
            let Upper = 100, Lower = 0, proName = '';

            _data.forEach(item => {
                let _obj = item.ProjectDatas.find(_ => _.PID == this.tableData.curPid)
                if (_obj) {
                    temp.push(Number(_obj.Value))
                }
            })

            xList = _data.map(item => item.ProductID)
            this.tableData.curLeft.WorkSteps.forEach(item => {
                let _obj = item.Projects.find(item3 => item3.PID == this.tableData.curPid)
                if (_obj) {
                    Upper = _obj.Upper
                    Lower = _obj.Lower
                    proName = _obj.ProjectName;
                    stepName = item.StepName
                }
            })
            this.tableData.chartTitle = `${this.tableData.curLeft.WorkName}-${stepName}-${proName}曲线图`
            let uList = temp.map(_ => Upper)
            let lList = temp.map(_ => Lower)
            let option = {
                title: {
                    text: ' '
                },
                tooltip: {
                    trigger: 'axis'
                },
                color: ['#7ABD7A', '#FF7474', '#FF7474'],
                legend: {
                    right: '4%',
                    data: [proName, this.lang.CruxParameterConfigure_CruxParameterConfigureUserControl_DataGrid_Upper, this.lang.ProcessParameterConfigure_ProcessParameterReportUserControl_Lower]
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },

                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: xList
                },
                yAxis: {
                    type: 'value'
                },
                visualMap: [{
                    type: 'piecewise',
                    show: false,
                    dimension: 1,
                    seriesIndex: 1, //第一部分数据  
                    pieces: [
                        {
                            max: Lower, // 没有设置最小值，表明当前范围 [-Infinity, max] 变色
                            color: '#FF8484'
                        },
                        {
                            min: Upper, // 没有设置最大值，表明当前范围 [min, Infinity] 变色
                            color: '#FF8484'
                        }
                    ],
                    outOfRange: { // 在选中范围外  
                        color: '#7ABD7A',
                    }
                }],
                series: [
                    {
                        name: this.lang.CruxParameterConfigure_CruxParameterConfigureUserControl_DataGrid_Upper,
                        type: 'line',
                        symbol: 'none',
                        data: uList,
                        lineStyle: {
                            normal: {
                                color: '#FF7474',
                                width: 1,
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: '#FF7474',
                            }
                        },
                    },
                    {
                        name: proName,
                        type: 'line',
                        symbol: 'none',
                        data: temp,
                    },
                    {
                        name: this.lang.ProcessParameterConfigure_ProcessParameterReportUserControl_Lower,
                        type: 'line',
                        symbol: 'none',
                        data: lList,
                        lineStyle: {
                            normal: {
                                color: '#FF7474',
                                width: 1,
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: '#FF7474',
                            }
                        },
                    },
                ]
            };
            let _dom = document.getElementById('mychart')
            let myChart = echarts.init(_dom);
            myChart.clear()
            myChart.setOption(option, true);

        }
    },
    //渲染后计算宽度
    mounted() {
        this.DomArr = []

    },
};
</script>

<style lang="scss">
.tapwater {
    .fl .el-input--prefix .el-input__inner {
        padding-left: 25px !important;
    }

    .table input {
        text-indent: 4px;
    }
}
</style>

<style lang="scss" scoped>
.mask_box {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    width: 100%;
    height: 100%;
    z-index: 999;
}

.conter {
    width: 100%;
    height: calc(100% - 60px);
}

.border1 {
    border: 1px solid blue;
}

.border2 {
    border: 1px solid #000;
}

.color2 {
    color: red
}

.color1 {
    color: #000;
}

.fl {
    float: left;
}

.fr {
    float: right;
}

.clearfix::after {
    content: '';
    height: 0;
    line-height: 0;
    clear: both;
    visibility: hidden;
}

.clearfix {
    zoom: 1;
}

.tapwater {
    position: fixed;
    top: 100px;
    height: calc(100% - 130px);
    padding: 20px;
    width: 100%;
    min-width: 1280px;
    overflow: auto;
    background-color: #eeeeee;
    box-sizing: border-box;

    .linebox {
        height: 100%;
        width: 100%;
        background-color: #ffffff;
        border: 1px solid #d5d5d5;
        overflow: auto;
    }

    .query-table {
        height: 60px;
        background-color: #dddddd;
        line-height: 60px;
        overflow: hidden;
        font-size: 14px;
        color: #6b6668;

        span {
            margin: 0 5px;
        }

        .tablename {
            height: 40px;
            width: 250px;
        }

        .tabledatetime {
            height: 40px;
            width: 178px;
        }

        .starttime {
            height: 40px;
            width: 210px;
            display: inline-block;
            margin-left: 18px;
            background-color: #ffffff;
            line-height: 40px;
            padding-left: 12px;
        }

        .endtime {
            height: 40px;
            width: 210px;
            display: inline-block;
            background-color: #ffffff;
            line-height: 40px;
            padding-left: 12px;
        }
    }

    .query,
    .set,
    .edit,
    .export {
        display: inline-block;
        height: 40px;
        width: 100px;
        text-align: center;
        line-height: 40px;
        color: #ffffff;
        border-radius: 5px;
        font-weight: 600;
        cursor: pointer;
        margin-left: 10px;
        box-sizing: border-box;
    }

    .query {
        background-color: #4270e4;
    }

    .set {
        background-color: #a0a0a0;
    }

    .edit {
        background-color: #f59a23;
    }

    .export {
        background-color: #ffffff;
        color: #4270e4;
        border: 2px solid #4270e4;
    }

    .container {
        display: inline-block;
        height: 40px;

        .block {
            display: inline-block;
        }
    }

    .separate {
        position: relative;
        left: 7px;
    }
}



.txt {
    // width: 300px;
    border: none;
    width: 200px;
    text-indent: 1em;
    margin-left: 10px;
    height: 40px;
}
</style>
<style  lang="scss"  >
.report-banner {
    width: 100%;
    min-height: 120px;
    box-sizing: border-box;
    padding: 10px 16px;
    display: grid;
    grid-template-columns: 11% auto auto auto auto 11%;
    gap: 8px;

    .banner-item {
        width: 100%;
        height: 100%;
        background: #ededed;
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;

        .item-content {
            display: flex;
            align-items: flex-end;
            justify-content: center;
            flex-wrap: wrap;

            .item-label {
                font-size: 24px;
                font-weight: bold;
                line-height: 1;
            }

            .item-num {
                font-size: 30px;
                font-weight: bolder;
                line-height: 1;
                margin: 0 3px;
            }

            .item-unit {
                display: flex;
                flex-wrap: nowrap;
                align-items: flex-end;
                line-height: 1;
            }

            .red {
                color: #db2e28;
            }

            .green {
                color: #7ABD7A;
            }
        }
    }
}

.report-page {
    width: 100%;
    height: calc(100% - 80px);
    box-sizing: border-box;
    padding: 0 16px 10px;

    /* 滚动条样式 */
    ::-webkit-scrollbar {
        width: 9px;
        height: 9px;
    }

    ::-webkit-scrollbar-thumb {
        border-radius: 5px;
        border-style: dashed;
        background-color: #757575;
        border-color: transparent;
        border-width: 2px;
        background-clip: padding-box;
    }

    ::-webkit-scrollbar-thumb:hover {
        background-clip: border-box;

    }

    ::-webkit-scrollbar-thumb:active {
        background-color: #326CF3;

    }

    /*定义水平和垂直滚动条两者的交界处（拐角）*/
    ::-webkit-scrollbar-corner {
        background-color: transparent;
    }

    .el-scrollbar .el-scrollbar__thumb {
        background: #000;
    }

    /* page部分 */
    * {
        padding: 0;
        margin: 0;
    }


    .charts {
        width: 100%;
        height: 300px;
        padding-bottom: 16px;
        box-sizing: border-box;
        border: 1px solid #EEF0F5;
        position: relative;
        border-top-left-radius: 8px;
        overflow: hidden;
    }

    .chart-label {
        position: absolute;
        left: 0;
        top: 0;
        padding: 8px 60px 8px 16px;
        font-size: 16px;
        color: #4270E4;
        background-color: #E7EDF6;
        font-weight: bolder;
        display: flex;
        align-items: center;
    }

    .c-w {
        width: 12px;
        height: 12px;
        border-radius: 6px;
        background: #B5C7F1;
        margin-right: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .c-i {
        width: 8px;
        height: 8px;
        border-radius: 4px;
        background: #4270E4;
    }

    .mychart {
        width: 100%;
        height: 100%;
    }

    .table {
        width: 100%;
        height: calc(100% - 300px);
        margin-top: 10px;
        display: flex;
        padding-bottom: 10px;
        box-sizing: border-box;
    }

    .table-l {
        height: 100%;
        width: 200px;
        padding-left: 24px;
        overflow-y: auto;
    }

    .l-item {
        width: 160px;
        height: 40px;
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 8px;
        margin-bottom: 16px;
        cursor: pointer;
        position: relative;
    }

    .l-item:hover .l-icon {
        width: 12px;
        height: 12px;
        border-radius: 6px;
        background-color: #326CF3;
        position: absolute;
        top: 50%;
        left: -5px;
        transform: translate(-100%, -50%);
    }



    /* 表格样式 */
    .table-r {
        height: 100%;
        width: calc(100% - 200px);
        overflow: auto;
        position: relative;
        border: 1px solid #808080;
        box-sizing: border-box;
    }

    .table-box {
        width: fit-content;
        height: fit-content;
    }

    table {
        height: 100%;
        table-layout: fixed;
        width: 100%;
        display: block;
    }

    table thead tr th {
        background-color: #7ABD7A;
        color: #fff;
        position: sticky;
        top: 0;
    }

    table thead tr:nth-child(2) th {
        top: 30px;
    }

    table thead tr:nth-child(3) th {
        top: 60px;
    }

    table thead tr:nth-child(4) th {
        top: 90px;
    }

    .blue-th {
        background-color: #4270E4;
    }

    th,
    td {
        height: 30px;
        min-width: 100px;
        word-break: keep-all;
        border: 1px solid #E2E2E2;
        box-sizing: border-box;
        text-align: center;
        background-color: #fff;
    }

    th {
        border: 1px solid #fff;
    }

    .no1 {
        min-width: 80px;
        /* position: sticky;
    z-index: 10;
    left: 0; */
    }

    .no2 {
        min-width: 110px;
    }

    .no3 {
        min-width: 207px;
    }

    .no4 {
        min-width: 123px;
    }

    .no5 {
        min-width: 190px;
        max-width: 860px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    .no6 {
        min-width: 160px;
    }

    .hover-border:hover {
        border: 1px solid #326CF3;
        box-sizing: border-box;
        cursor: pointer;
    }

    .blue-Border {
        background-color: #F8AD3D;
    }
}
</style>
