<!--
 * @description: 质量管理cpk分析界面
 * @since: 2019-11-08 15:00:48
 * @Author: jawnwa22
 * @LastEditors: jawnwa22
 * @LastEditTime: 2019-11-11 10:13:58
 -->
<template>
    <div class="tapwater cpktable" :class="{blackBlueBg: $store.state.color === 'blackBlue'}"
                    :style="{top:100*zoomValue+'px'}"
                  >
                    			<div class="loadcover" element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(0, 0, 0, 0.4)"  v-loading="this.$store.state.isShow" v-show="this.$store.state.isShow" style="position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;"></div>
        <div class="linebox" >
            <!-- <div class="table clearfix" ref="search">
                <div class="fl">
                    <span class="ss">{{lang.QualityManage_SampleChoseWindow_StartTime}}</span>
                    <el-date-picker
                        v-model="value1"
                        type="datetime"
                        @focus="sx()"
                        :placeholder="lang.SCMSConsoleWebApiMySql_PleChooseDate"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        :style="{width:'220px'}"
                    ></el-date-picker>
                    <span class="ss">{{lang.QualityManage_SampleChoseWindow_EndTime}}</span>
                    <el-date-picker
                        v-model="value2"
                        type="datetime"
                        @focus="sx()"
                        :placeholder="lang.SCMSConsoleWebApiMySql_PleChooseDate"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        :style="{width:'220px'}"
                    ></el-date-picker>
                    <span class="ss">{{lang.QualityManage_SampleChoseWindow_RandomSamplesNumber}}</span>
                    <input type="text" class="sji" v-model="Number1" />
                    <div class="query" @click="search">{{lang.QualityManage_SampleChoseUserControl_Select}}</div>
                    <div class="overQuery" @click="haschange">{{all}}</div>
                    <div class="query" @click="save">{{lang.QualityManage_SampleChoseUserControl_Save}}</div>
                    <div class="line" :class="{line1:PrMethod == lang.QualityManage_HT_ItemEditWindowViewModel_Automatic}"></div>
                    <div class="query newadd" @click="add">{{lang.QualityManage_SampleChoseUserControl_New}}</div>
                    <div class="query newdel" @click="del">{{lang.QualityManage_SampleChoseUserControl_Delete}}</div>
                    <div class="line" :class="{line1:PrMethod == lang.QualityManage_HT_ItemEditWindowViewModel_Automatic}"></div>
                    <div class="query df" @click="mode" v-if="PrMethod == lang.QualityManage_HT_ItemEditWindowViewModel_Automatic">{{lang.QualityManage_SampleChoseUserControl_Import}}</div>
                    <div class="query dr" v-if="PrMethod == lang.QualityManage_HT_ItemEditWindowViewModel_Manual">
                        <a href="javascript:;" class="file">
                            <span>{{lang.QualityManage_SampleChoseUserControl_Import}}</span>
                            <input
                                type="file"
                                ref="upload"
                                accept=".xls, .xlsx"
                                class="outputlist_upload"
                                @change="readExcel"
                            />
                        </a>
                    </div>
                    <div class="query dc" @click="exportTable">{{lang.QualityManage_SampleChoseUserControl_Export}}</div>
                    <div class="line" :class="{line1:PrMethod == lang.QualityManage_HT_ItemEditWindowViewModel_Automatic}"></div>
                    <div class="query js" @click="js">{{lang.QualityManage_SampleChoseUserControl_Calculation}}</div>
                </div>
                <div class="fr">
                    <div class="query q1" @click="changetime">{{lang.QualityManage_SampleChoseUserControl_Return}}</div>
                </div>
            </div> -->

            <div class="table clearfix" ref="search">
                <!-- <div class="fl"> -->
                    <span class="ss">{{lang.QualityManage_SampleChoseWindow_StartTime}}</span>
                    <el-date-picker
                        :key="$store.state.color === 'blackBlue' ? 'blackBlueBg' : 'normal'"
                        :popper-class="$store.state.color === 'blackBlue' ? 'blackBlueBg' : 'normal'"
                        v-model="value1"
                        type="datetime"
                        @focus="sx()"
                        :placeholder="lang.SCMSConsoleWebApiMySql_PleChooseDate"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        :style="{width:'220px'}"
                    ></el-date-picker>
                    <span class="ss">{{lang.QualityManage_SampleChoseWindow_EndTime}}</span>
                    <el-date-picker
                        :key="$store.state.color === 'blackBlue' ? 'blackBlueBg' : 'normal'"
                        :popper-class="$store.state.color === 'blackBlue' ? 'blackBlueBg' : 'normal'"
                        v-model="value2"
                        type="datetime"
                        @focus="sx()"
                        :placeholder="lang.SCMSConsoleWebApiMySql_PleChooseDate"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        :style="{width:'220px'}"
                    ></el-date-picker>
                    <span class="ss">{{lang.QualityManage_SampleChoseWindow_RandomSamplesNumber}}</span>
                    <input type="text" class="sji" v-model="Number1" />
                    <div class="query" @click="search">{{lang.QualityManage_SampleChoseUserControl_Select}}</div>
                    <div class="overQuery" @click="haschange">{{all}}</div>
                    <div class="query" @click="save">{{lang.QualityManage_SampleChoseUserControl_Save}}</div>
                    <!-- <div class="line" :class="{line1:PrMethod == lang.QualityManage_HT_ItemEditWindowViewModel_Automatic}"></div>
                    <div class="query newadd" @click="add">{{lang.QualityManage_SampleChoseUserControl_New}}</div>
                    <div class="query newdel" @click="del">{{lang.QualityManage_SampleChoseUserControl_Delete}}</div>
                    <div class="line" :class="{line1:PrMethod == lang.QualityManage_HT_ItemEditWindowViewModel_Automatic}"></div>
                    <div class="query df" @click="mode" v-if="PrMethod == lang.QualityManage_HT_ItemEditWindowViewModel_Automatic">{{lang.QualityManage_SampleChoseUserControl_Import}}</div>
                    <div class="query dr" v-if="PrMethod == lang.QualityManage_HT_ItemEditWindowViewModel_Manual">
                        <a href="javascript:;" class="file">
                            <span>{{lang.QualityManage_SampleChoseUserControl_Import}}</span>
                            <input
                                type="file"
                                ref="upload"
                                accept=".xls, .xlsx"
                                class="outputlist_upload"
                                @change="readExcel"
                            />
                        </a>
                    </div>
                    <div class="query dc" @click="exportTable">{{lang.QualityManage_SampleChoseUserControl_Export}}</div>
                    <div class="line" :class="{line1:PrMethod == lang.QualityManage_HT_ItemEditWindowViewModel_Automatic}"></div>
                    <div class="query js" @click="js">{{lang.QualityManage_SampleChoseUserControl_Calculation}}</div> -->
                    <div class="line" :class="{line1:PrMethod == lang.QualityManage_HT_ItemEditWindowViewModel_Automatic}"></div>
                <!-- </div> -->
            <!-- </div> 
            <div class="table clearfix" ref="btns"> -->
                <!-- <div class="fl"> -->
                    <!-- <div class="line" :class="{line1:PrMethod == lang.QualityManage_HT_ItemEditWindowViewModel_Automatic}"></div> -->
                    <div class="query newadd" @click="add">{{lang.QualityManage_SampleChoseUserControl_New}}</div>
                    <div class="query newdel" @click="del">{{lang.QualityManage_SampleChoseUserControl_Delete}}</div>
                    <div class="line" :class="{line1:PrMethod == lang.QualityManage_HT_ItemEditWindowViewModel_Automatic}"></div>
                    <div class="query df" @click="mode" v-if="PrMethod == lang.QualityManage_HT_ItemEditWindowViewModel_Automatic">{{lang.QualityManage_SampleChoseUserControl_Import}}</div>
                    <div class="query dr"  v-if="PrMethod == lang.QualityManage_HT_ItemEditWindowViewModel_Manual">
                        <a href="javascript:;" class="file" >
                            <span>{{lang.QualityManage_SampleChoseUserControl_Import}}</span>
                            <input
                                type="file"
                                ref="upload"
                                accept=".xls, .xlsx"
                                class="outputlist_upload"
                                @change="readExcel"
                            />
                        </a>
                    </div>
                    <!-- <div class="query dc" @click="exportTable">{{lang.QualityManage_SampleChoseUserControl_Export}}</div> -->
                    <el-button class="query dc" :disabled="tableData.length === 0" style="line-height: 1;font-family: '思源黑体 CN';margin-left:0;" @click="exportTable">{{lang.QualityManage_SampleChoseUserControl_Export}}</el-button>
                    <div class="line" :class="{line1:PrMethod == lang.QualityManage_HT_ItemEditWindowViewModel_Automatic}"></div>
                    <div class="query js" @click="js">{{lang.QualityManage_SampleChoseUserControl_Calculation}}</div>
                    <div class="query q1" @click="changetime">{{lang.QualityManage_SampleChoseUserControl_Return}}</div>
                <!-- </div> -->
            </div>
            <div class="tabledata mmm" :style="{width: '100%'}" id="outTable">
                <el-table
                    :data="tableData"
                    highlight-current-row
                    stripe
                    ref="multipleTable"
                    border
                    height="100%"
                    :style="{
                        fontSize: zoomValue * 15 + 'px',
                        width: '100%',
                    }"
                    :row-style="{ height: 50 * zoomValue + 'px' }"
                    :header-cell-style="{
                        background:($store.state.color=='grey')?'#D9DBDE':($store.state.color==='blackBlue' ? '#18254E' : '#5a6c98'),
                        color:($store.state.color=='grey')?'#000':'#fff',
                        'border-left': $store.state.color==='blackBlue' ? '1px solid #304171' : '1px solid #cccccc',
                        height: 50 * zoomValue + 'px',
                        padding:'0'
                    }"
                    @row-click="handleRowChange1"
                    @cell-mouse-leave="leave"
                    @cell-dblclick="twoclick"
                >
                    <template slot="empty">
                        <span>{{lang.SCMSConsoleWebApiMySql_NoData}}</span>
                    </template>
                    <el-table-column prop="number" :label="lang.QualityManage_SampleChoseWindow_DataGrid_Number" :width="120 * zoomValue">
                        <template slot-scope="scope">
                            <span v-if="a !== scope.row.sampleid">{{scope.row.number}}</span>
                            <input
                                type="text"
                                v-model="scope.row.number"
                                v-else
                                @change="xg(scope.row.number,scope.row,'number')"
                            />
                        </template>
                    </el-table-column>
                    <el-table-column prop="time" :label="lang.QualityManage_SampleChoseWindow_DataGrid_RecordingTime" :width="500 * zoomValue">
                        <template slot-scope="scope">
                            <span v-if="b !== scope.row.sampleid">{{scope.row.time}}</span>
                            <input
                                type="text"
                                v-model="scope.row.time"
                                v-else
                                @change="xg(scope.row,'time')"
                            />
                        </template>
                    </el-table-column>
                    <el-table-column prop="value" :label="lang.QualityManage_SampleChoseWindow_DataGrid_TestItemValue" :width="500 * zoomValue">
                        <template slot-scope="scope">
                            <span v-if="c !== scope.row.sampleid">{{scope.row.value}}</span>
                            <input
                                type="text"
                                v-model="scope.row.value"
                                v-else
                                @change="xg(scope.row,'value')"
                            />
                        </template>
                    </el-table-column>
                    <el-table-column prop="array" :label="lang.QualityManage_SampleChoseWindow_DataGrid_Group" :width="500 * zoomValue">
                        <template slot-scope="scope">
                            <span v-if="d !== scope.row.sampleid">{{scope.row.array}}</span>
                            <input
                                type="text"
                                v-model="scope.row.array"
                                v-else
                                @change="xg(scope.row,'array')"
                            />
                        </template>
                    </el-table-column>
                    <el-table-column :label="lang.QualityManage_SampleChoseUserControl_SelectedAsASample" :width="230 * zoomValue">
                        <template slot-scope="scope">
                            <el-checkbox
                                v-model="scope.row.isEditdisplay"
                                @change="select(scope.row)"
                            ></el-checkbox>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <div class="tip" ref="kongtiao3" v-show="tipchange1" :style="{zoom:zoomValue}">
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
            <div class="tipcontanin" :class="{tipcontanin1:(!deltrue||ccc)}">
                <span>{{w}}</span>
            </div>
            <div class="tipfooter">
                <div class="tipdetermine" @click="tip2" v-if="deltrue">{{lang.MessageBox_Confrim}}</div>
                <div class="delclass" v-if="!deltrue">
                    <div class="one" @click="no1">{{lang.MessageBox_NO}}</div>
                    <div class="two" @click="yes1">{{lang.MessageBox_YES}}</div>
                </div>
            </div>
        </div>
        <div class="cover3" v-if="tipchange1"></div>
    </div>
</template>

<script>
// vue文件中引入echarts工具
import XLSX from 'xlsx';
import moment from 'moment'
// import FileSaver from 'file-saver';
let echarts = require('echarts/lib/echarts');
require('echarts/lib/chart/line');
// 以下的组件按需引入
require('echarts/lib/component/tooltip'); // tooltip组件
require('echarts/lib/component/title'); //  title组件
require('echarts/lib/component/legend'); // legend组件
export default {
    name: 'tapwater',
    data() {
        return {
            pdyd3: true,
            PrMethod: '',
            deltrue:true,
            tablenumber: 30,
            deldatal: [],
            data: '',
            drr: '',
            ccc:false,
            all: '显示选中',
            tipchange1: false,
            tip: 'noData',
            w: '',
            gth: require('../../assets/images/gth.png'),
            value1: new Date(new Date().toLocaleDateString()),
            value2: new Date(
                new Date(new Date().toLocaleDateString()).getTime() +
                    24 * 60 * 60 * 1000 -
                    1
            ),
            tablenames: '',
            Meter: '',
            chardata: '',
            a: true,
            b: true,
            c: true,
            d: true,
            couponSelected: '',
            starttime: '',
            endtime: '',
            change: 2,
            tableData: [],
            hasnum: 1,
            sum: 0,
            Number1: '',
            tabledata1: '',
            wanttable: [],
            outputs: [],
            handleRow: {},
            lang: JSON.parse(localStorage.getItem('languages'))[localStorage.getItem('currentLang')],
            zoomValue: 0,
        };
    },
    methods: {
        getLangData() {
            this.all = this.lang.QualityManage_HT_SampleChoseUserControlViewModel_DisplaySelected
        },
        getZoom() {
            var $this = this
            this.$nextTick(() => {
                let dates = [...document.querySelectorAll('.el-picker-panel.el-date-picker')]
                dates.forEach(item => {
                    item.style.transformOrigin =  `0% 0%`
                    item.style.transform = `scale(${$this.zoomValue})`
                })
            })
            
        },
        uuid() {
            var s = [];
            var hexDigits = '0123456789abcdef';
            for (var i = 0; i < 36; i++) {
                s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
            }
            s[14] = '4'; // bits 12-15 of the time_hi_and_version field to 0010
            s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
            s[8] = s[13] = s[18] = s[23] = '-';

            var uuid = s.join('');
            return uuid;
        },
        mode() {
             setTimeout(() => {
this.tipchange1 = true;
    this.move('tip', 'tiphead');
                    });
            this.pdyd3 = true;
            this.w = this.lang.QualityManage_HT_SampleChoseUserControlViewModel_AutomaticConditionsSelectStartEndTime
            console.log(this.data);
            this.ccc = true;
            this.PrMethod = this.data.PrMethod;
            console.log(this.PrMethod);
        },
        pditem(row){
            var date = row
            console.log(date)
	if (date === undefined || date === null || date === "") {
		return null;
	}
	//非时间格式问题  返回Invalid date
    let retFormat = moment(date).format('YYY-MM-DD hh:mm:ss');
    console.log("ssda",typeof(date))
	if (retFormat === "Invalid date"||typeof(date) == 'string'||typeof(date) == 'number'){
		return row;
    }
    
	return moment(date).format('YYYY-MM-DD hh:mm:ss')
        },
        handleAddClick() {
            let a1 = {
                num: this.Number1,
                starttime: this.GMTToStr(this.value1),
                endtime:  this.GMTToStr(this.value2),
                data: this.tabledata1
            };
            this.$store.commit('mutationsAddCount', a1);
        },

        readExcel(e) {
            var $this = this
            this.all = this.lang.QualityManage_HT_SampleChoseUserControlViewModel_DisplaySelected;
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
            console.log("+++++",fileReader)
            fileReader.onload = ev => {
               
                try {
                    console.log("走这里了")
                    const data = ev.target.result;
                    const workbook = XLSX.read(data, {
                        type: 'binary',
                        cellDates: true
                    });
                    //   console.log(workbook)
                    const wsname = workbook.SheetNames[0]; //取第一张表
                     
                    const ws = XLSX.utils.sheet_to_json(
                        workbook.Sheets[wsname],
                        {
                            defval: ''
                        }
                    ); //生成json表格内容
                    console.log(ws)
                    let timearr = []
                    console.log(ws)
                    ws.forEach((item)=>{
                        if (item["记录时间"] && item["记录时间"].length === undefined) {
                            item["记录时间"] = moment(new Date(item["记录时间"])).add(43, 'second').format('YYYY-MM-DD HH:mm:ss')
                        }else if(item["Recording time"] && item["Recording time"].length === undefined){
                            item["Recording time"] = moment(new Date(item["Recording time"])).add(43, 'second').format('YYYY-MM-DD HH:mm:ss')
                        }
                        
                        console.log(item["记录时间"] === undefined)
                        console.log(item["Recording time"] === undefined)

                        if(item["记录时间"] !== undefined){
                            item["记录时间"] = this.pditem(item["记录时间"])
                            timearr.push(item["记录时间"])
                        }else if(item["Recording time"] !== undefined){
                            item["Recording time"] = this.pditem(item["Recording time"])
                            timearr.push(item["Recording time"])
                        }
                    })
                   console.log(timearr)
                    // timearr = this.pditem(timearr,'记录时间')
                    
                    this.$axios({
                        method:'POST',
                        url:'/api/QualityManage/verificationtime',
                        data:timearr
                    }).then(res=>{
                        console.log(res)
                       if(res.data.code!==0){
                             setTimeout(() => {
                                this.tipchange1 = true;
                                this.move('tip', 'tiphead');
                            });
                            this.pdyd3 = true;
                            this.w = res.data.msg;
 
                       }else{
                           let recordtime = res.data.data
                           console.log(recordtime)
                                let b = 0;
                    for (b in workbook.Strings) {
                        if (!workbook.Strings[0].t == '序号' || !workbook.Strings[0].t == 'Serial number') {
                            return false;
                        } else if (!workbook.Strings[1].t == '记录时间' || !workbook.Strings[1].t == 'Recording time') {
                            return false;
                        } else if (!workbook.Strings[2].t == '检测项目值' || !workbook.Strings[2].t == 'Detect item value') {
                            return false;
                        } else if (!workbook.Strings[3].t == '分组' || !workbook.Strings[3].t == 'Group') {
                            return false;
                        }
                    }
                    let a = 0;
                    // recordtime.forEach((item)=>{
                    //     item.replace('.','-')
                    //      item.replace('年','-')
                    //       item.replace('月','-')
                    //        item.replace('日','-')
                    // })
                    for (a in ws) {
                        ws[a].number = ws[a]['序号'] || ws[a]['Serial number'];
                        ws[a].value = ws[a]['检测项目值'] || ws[a]['Detect item value'];
                        ws[a].time = moment(recordtime[a]).format('YYYY-MM-DD HH:mm:ss')
                        // ws[a].sampleid = $this.uuid();
                        ws[a].isEditdisplay = true;
                        ws[a].array = ws[a]['组别'] || ws[a]['Group'];
                        // if (ws[a].hasOwnProperty('分组')) {
                        //     ws[a].array = ws[a].分组;
                        // } else {
                        //     ws[a].array = null;
                        // }
                    }
                    let c = 0;
                    for (c in ws) {
                        delete ws[c]['序号'];
                        delete ws[c]['检测项目值'];
                        delete ws[c]['组别'];
                        delete ws[c]['分组'];
                        delete ws[c]['记录时间'];

                        delete ws[c]['Serial number'];
                        delete ws[c]['Recording time'];
                        delete ws[c]['Detect item value'];
                        delete ws[c]['Group'];
                    }

                    this.$axios({
                        method:'POST',
                        url:`/api/QualityManage/verificationImport`,
                        data:{
                            "importList": ws,
                            "capacity": ws.length
                        }
                    }).then(res=>{
                        this.$refs.upload.value=null;
                        console.log(res)
                        if(res.data.code !== 0){
                             setTimeout(() => {
                                this.tipchange1 = true;
                                this.move('tip', 'tiphead');
                            });
                            this.w = res.data.msg;
                        }else{
                            console.log(ws)
                        let newWs = res.data.data
                    
                        let a1 = parseInt(this.data.PrSampleNumber);
                        console.log("this",this.data)
                        if (newWs.length % this.data.PrSampleNumber !== 0) {
                            console.log('------------')
                             setTimeout(() => {
                                this.tipchange1 = true;
                                this.move('tip', 'tiphead');
                            });
                            this.pdyd3 = true;
                            this.ccc = true;
                            this.w = this.lang.QualityManage_HT_SampleChoseUserControlViewModel_ImportedSamplesNoIntegerMultiple
                        }else {
                        
                            let a3 = 0;
                            for(a3 = 0;a3<newWs.length;a3++){
                                let a4 = a3+1;
                                newWs[a3].number = a4;
                                newWs[a3].array = Math.ceil(parseInt(a4)/a1)
                            }
                            console.log(newWs)
                            this.tablenumber = 30;
                            this.tabledata1 = [];
                            this.tableData = [];
                            this.$refs.multipleTable.bodyWrapper.scrollTop = 0;
                            if (newWs.length <= 30) {
                                this.tableData = [...newWs];
                                let a = JSON.stringify(newWs);
                                let a1 = JSON.stringify(newWs);
                                this.tabledata1 = JSON.parse(a);
                                this.deldatal = JSON.parse(a1);
                            } else {
                                this.tabledata1 = [...newWs];
                                let a = JSON.stringify(newWs);
                                let a1 = JSON.stringify(newWs);
                                this.deldatal = JSON.parse(a1);
                                this.tableData = JSON.parse(a).splice(0, 30);
                            }
                            this.$store.state.a.data = this.tabledata1;
                            this.$store.state.a.starttime =  this.value1 ;
                            this.$store.state.a.endtime = this.value2;
                            this.$store.state.a.num = this.Number1;
                            this.dom = this.$refs.multipleTable.bodyWrapper;
                            this.dom.addEventListener('scroll', () => {
                                console.log(this.all);
                                if (this.all == this.lang.QualityManage_HT_SampleChoseUserControlViewModel_DisplaySelected) {
                                    if (this.tabledata1.length > 30) {
                                        // 滚动距离
                                        let scrollTop = this.dom.scrollTop;
                                        // 变量windowHeight是可视区的高度
                                        let windowHeight = this.dom.clientHeight || this.dom.clientHeight;
                                        // 变量scrollHeight是滚动条的总高度
                                        let scrollHeight = this.dom.scrollHeight || this.dom.scrollHeight;
                                        if (scrollTop + windowHeight === scrollHeight) {
                                            // 获取到的不是全部数据 当滚动到底部 继续获取新的数据
                                            // if (!this.allData) this.getMoreLog();
                                            //    console.log((this.tableData1.length/this.tableDate.length)>=30);
                                            if (this.tabledata1.length - this.tableData.length >= 30) {
                                                for (let i = this.tablenumber; i < this.tablenumber + 30; i++) {
                                                    this.tableData.push(this.tabledata1[i]);
                                                }
                                                this.tablenumber = this.tablenumber + 30;

                                                // console.log(this.tabledata1);
                                                console.log(this.tableData.length);
                                                console.log(this.tableData);
                                                console.log(this.tablenumber);
                                            } else if (this.tabledata1.length % this.tableData.length > 0) {
                                                console.log(this.tablenumber + (this.tabledata1.length % this.tableData.length));
                                                for (let i = this.tablenumber; i < this.tabledata1.length; i++) {
                                                    this.tableData.push(this.tabledata1[i]);
                                                }
                                            } else {
                                                return;
                                            }
                                        }
                                    }
                                }
                            });
                        }

                        console.log(newWs);
                        console.log(this.tableData);

                        that.outputs = []; //清空接收数据
                        //编辑数据
                        for (var i = 0; i < newWs.length; i++) {
                            var sheetData = {
                                address: newWs[i].addr,
                                value: newWs[i].value
                            };
                            that.outputs.push(sheetData);
                        }
                        this.$refs.upload.value = '';
                        }
                        })
                        }
                    })
               
                } catch (e) {
                    console.log(e)
                    return false;
                }
            };
            fileReader.readAsBinaryString(files[0]);
        },
        save() {
            console.log(this.data);
            if (this.data.PrMethod == this.lang.QualityManage_HT_ItemEditWindowViewModel_Automatic) {
                 setTimeout(() => {
this.tipchange1 = true;
    this.move('tip', 'tiphead');
                    });
                this.pdyd3 = true;
                this.w = this.lang.QualityManage_HT_SampleChoseUserControlViewModel_NoSaveAutomaticConditions;
            } else {
                console.log(this.tableData);
                var a = JSON.parse(JSON.stringify(this.tableData));
                let i = 0;
                for (i in a) {
                    (a[i].PrMethod = this.lang.QualityManage_ItemEditWindow_Manual), (a[i].PrId = this.data.PrId);
                }
                if (a.length == 0) {
                     setTimeout(() => {
this.tipchange1 = true;
    this.move('tip', 'tiphead');
                    });
                    this.pdyd3 = true;
                    this.w = this.lang.QualityManage_HT_SampleChoseUserControlViewModel_NoSamplesToSave;
                } else {
                    let c = 0;
                    var d = false;
                    for (c in a) {
                        let b = parseInt(c) + 1;
                        if (!a[c].number) {
                             setTimeout(() => {
this.tipchange1 = true;
    this.move('tip', 'tiphead');
                    });
                            this.pdyd3 = true;
                            this.w = this.lang.QualityManage_HT_SampleChoseUserControlViewModel_SaveFailed;
                            d = false;
                        } else if (!a[c].time || !a[c].value) {
                             setTimeout(() => {
this.tipchange1 = true;
    this.move('tip', 'tiphead');
                    });
                            this.pdyd3 = true;
                            // this.w = `记录${b}缺少配置信息！`;
                            this.w = `${this.lang.QualityManage_HT_SampleChoseUserControlViewModel_Recording} <${b}> ${this.lang.QualityManage_HT_SampleChoseUserControlViewModel_MissingConfigurationInformation}`
                            d = false;
                        } else if (!this.CheckDateTime(a[c].time)) {
                             setTimeout(() => {
this.tipchange1 = true;
    this.move('tip', 'tiphead');
                    });
                            this.pdyd3 = true;
                            this.ccc = true;
                            
                            let msg = this.lang.QualityManage_HT_SampleChoseUserControlViewModel_RecordingTimeError
                            let firstL = msg.indexOf('<')
                            let firstR = msg.indexOf('>') + 1
                            let lastL = msg.lastIndexOf('<')
                            let lastR = msg.lastIndexOf('>') + 1
                            let str1 = msg.slice(firstL, firstR)
                            let str2 = msg.slice(lastL, lastR)
                            msg = msg.replace(str1, `<${b}>`)
                            msg = msg.replace(str2, `<${b}>`)

                            // this.w = `导入表格第<${b}>行【记录时间】<${b}>错误,格式例如2018-12-08 15：00：00`;
                            this.w = msg
                            d = false;
                        } else if (isNaN(a[c].value)) {
                             setTimeout(() => {
this.tipchange1 = true;
    this.move('tip', 'tiphead');
                    });
                            this.pdyd3 = true;
                            this.ccc = true;

                            let msg = this.lang.QualityManage_HT_SampleChoseUserControlViewModel_DetectItemValueNocorrect
                            let firstL = msg.indexOf('<')
                            let firstR = msg.indexOf('>') + 1
                            let str1 = msg.slice(firstL, firstR)
                            msg = msg.replace(str1, `<${b}>`)
                            // this.w = `保存表格第<${b}>行【检测项目值】字段格式不正确,请输入正确数值！`;
                            this.w = msg
                            d = false;
                        } else {
                            d = true;
                        }
                    }

                    // var a = this.tableData.length + 1;
                    // this.tableData.push({
                    //     array: null,
                    //     isEditdisplay: false,
                    //     number: a,
                    //     sampleid: '3d98185b-b3ea-4ba4-baa5-26b0c1419693',
                    //     time: '',
                    //     value: ''
                    // });
                }
            }
            this.$nextTick(function() {
                console.log(a);
                if (d) {
                    this.$axios({
                        method: 'post',
                        url: '/api/QualityManage/saveSample',
                        data: a
                    }).then(res => {
                        console.log(res);
                        if (res.data.code == 0) {
                             setTimeout(() => {
this.tipchange1 = true;
    this.move('tip', 'tiphead');
                    });
                            this.pdyd3 = true;
                            this.w = this.lang.QualityManage_HT_SampleChoseUserControlViewModel_SuccessfullySaved;
                        }
                    });
                }
            });
        },

        CheckDateTime(str) {
            var reg = /^(\d+)-(\d{1,2})-(\d{1,2}) (\d{1,2}):(\d{1,2}):(\d{1,2})$/;
            var r = str.match(reg);
            if (r == null) return false;
            r[2] = r[2] - 1;
            var d = new Date(r[1], r[2], r[3], r[4], r[5], r[6]);
            if (d.getFullYear() != r[1]) return false;
            if (d.getMonth() != r[2]) return false;
            if (d.getDate() != r[3]) return false;
            if (d.getHours() != r[4]) return false;
            if (d.getMinutes() != r[5]) return false;
            if (d.getSeconds() != r[6]) return false;
            return true;
        },

        getnowtime() {
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
        },
//         js() {
//             console.log("=======", [...this.tabledata1])
//             this.$store.commit('mutationsAddCount2', 2);
//             this.wanttable = [];
//             let i = 0;
//             for (i in this.tabledata1) {
//                 console.log(this.tabledata1[i].isEditdisplay)
//                 if (this.tabledata1[i].isEditdisplay) {
//                     this.wanttable.push(this.tabledata1[i]);
//                 }
//             }
//             let j = 0;
//             let times = 0
//             for (j in this.wanttable) {
//                 this.wanttable[j].PrSampleNumber = this.data.PrSampleNumber;
//                 this.wanttable[j].PrUpLimit = this.data.PrUpLimit;
//                 this.wanttable[j].PrDownLimit = this.data.PrDownLimit;
//                 this.wanttable[j].PrRule = this.data.PrRule;
//                 this.wanttable[j].PrType = this.data.PrType;
//                 if (this.wanttable.length >=2  && this.wanttable[0].value !== this.wanttable[j].value) {
//                     times++
//                 }

//             }
//             this.$store.state.tableData = this.tabledata1;
//             this.$store.state.b = this.all;
//             console.log('ss', this.wanttable);
//             console.log(this.data);
//             if (this.wanttable.length === 0) {
//                   setTimeout(() => {
// this.tipchange1 = true;
//     this.move('tip', 'tiphead');
//                     });
//                 this.pdyd3 = true;
//                 this.w = `${this.lang.QualityManage_HT_SampleChoseUserControlViewModel_SamplesShouldNotBeZero}`
//                 return
//             }
//             if (times === 0) {
//                 this.tipchange1 = true;
//                 this.pdyd3 = true;
//                 // this.w = '标准差计算结果为0，请重新选择样本'
//                 this.w = this.lang.QualityManage_HT_SampleChoseUserControlViewModel_SamplesGroupMoreThanOne
//                 return
//             }
//             if (this.wanttable.length % this.data.PrSampleNumber !== 0) {
//                  setTimeout(() => {
// this.tipchange1 = true;
//     this.move('tip', 'tiphead');
//                     });
//                 this.pdyd3 = true;
//                 this.w = `${this.lang.QualityManage_HT_SampleChoseUserControlViewModel_SamplesShouldBeSubgroupCapacity}${this.data.PrSampleNumber}${this.lang.QualityManage_HT_SampleChoseUserControlViewModel_IntegerMultiple}`;
//             } else {
//                 this.$axios({
//                     method:'post',
//                     url:`/api/QualityManage/judgepanyi`,
//                     data:this.wanttable
//                 }).then(res =>{
//                     console.log("样本",res)
//                     if(res.data.code == 0){
//                         this.$axios({
//                             method:'post',
//                             url:'/api/QualityManage/samplefromlist',
//                             data:this.wanttable,
//                         }).then(res1 =>{
//                             console.log("网页",res1)
//                             if (res1.data.code == 0) {
//                                 let aa = JSON.stringify(res1.data.data);
//                                 let bb = JSON.stringify(this.data);
//                                 this.$store.state.one = 1;
//                                 this.$router.replace({
//                                         path: '/table',
//                                         query: { id: aa, id1: bb }
//                                     });
//                                 }
//                            }).catch(() => {
//                                   setTimeout(() => {
// this.tipchange1 = true;
//     this.move('tip', 'tiphead');
//                     });
//                             this.pdyd3 = true;
//                             this.w = this.lang.QualityManage_HT_SampleChoseUserControlViewModel_NoSamplesSelected;
//                            })
//                     }else{
//                          setTimeout(() => {
// this.tipchange1 = true;
//     this.move('tip', 'tiphead');
//                     });
//                         this.pdyd3 = true;
//                         this.deltrue = false;
//                         this.w = `样本数量不足，无法满足${res.data.msg}判异规则的最小样本数 点击是（跳过这条规则判断，进行满足的规则判断） 点击是否 (不进行计算）`;
//                     }
//                 })

//             }

//             console.log(this.wanttable);
//         },
        js () {
            this.$store.commit('mutationsAddCount2', 2);
            this.wanttable = [];
            let i = 0;
            for (i in this.tabledata1) {
                console.log(this.tabledata1[i].isEditdisplay)
                if (this.tabledata1[i].isEditdisplay) {
                    this.wanttable.push(this.tabledata1[i]);
                }
            }
            let j = 0;
            let times = 0
            for (j in this.wanttable) {
                this.wanttable[j].PrSampleNumber = this.data.PrSampleNumber;
                this.wanttable[j].PrUpLimit = this.data.PrUpLimit;
                this.wanttable[j].PrDownLimit = this.data.PrDownLimit;
                this.wanttable[j].PrRule = this.data.PrRule;
                this.wanttable[j].PrType = this.data.PrType;
                if (this.wanttable.length >=2  && this.wanttable[0].value !== this.wanttable[j].value) {
                    times++
                }

            }
            this.$store.state.tableData = this.tabledata1;
            this.$store.state.b = this.all;
            this.$axios({
                method:'post',
                url:'/api/QualityManage/samplefromlist',
                data:this.wanttable,
            }).then(res1 =>{
                if (res1.data.code == 0) {
                    let aa = JSON.stringify(res1.data.data);
                    let bb = JSON.stringify(this.data);
                    this.$store.state.one = 1;
                    this.$router.replace({
                            path: '/table',
                            query: { id: aa, id1: bb }
                        });
                    } else {
                        this.tipchange1 = true;
                        this.move('tip', 'tiphead');
                        this.pdyd3 = true;
                        this.w = res1.data.msg
                    }
                })

        },
        no1(){
           this.tipchange1 = false;
           this.deltrue = true;
        },
        yes1(){
                this.$axios({
                               method:'post',
                               url:'/api/QualityManage/samplefromlist',
                               data:this.wanttable,
                           }).then(res1 =>{
                                 console.log("网页",res1)
                                if (res1.data.code == 0) {
                                let aa = JSON.stringify(res1.data.data);
                                let bb = JSON.stringify(this.data);
                                this.$store.state.one = 1;
                                 this.$router.push({
                                     path: '/table',
                                      query: { id: aa, id1: bb }
                                       });
                                }
                           }).catch(() => {
                                  setTimeout(() => {
this.tipchange1 = true;
    this.move('tip', 'tiphead');
                    });
                            this.pdyd3 = true;
                            this.w = this.lang.QualityManage_HT_SampleChoseUserControlViewModel_NoSamplesSelected;
                           })
        },
        twoclick(a1, b1, c1, d1) {
            let i = 0;

            //  for(i in this.tableData){
            //      if(a1.sampleid == this.tableData[i].sampleid){
            if (b1.property == 'number') {
                this.a = a1.sampleid;
            } else if (b1.property == 'time') {
                this.b = a1.sampleid;
            } else if (b1.property == 'value') {
                this.c = a1.sampleid;
            } else if (b1.property == 'array') {
                this.d = a1.sampleid;
            }
        },
        leave() {
            this.a = false;
            this.b = false;
            this.c = false;
            this.d = false;
        },
        add() {
            if (this.data.PrMethod == this.lang.QualityManage_HT_ItemEditWindowViewModel_Automatic) {
                 setTimeout(() => {
this.tipchange1 = true;
    this.move('tip', 'tiphead');
                    });
                this.pdyd3 = true;
                this.w = this.lang.QualityManage_HT_SampleChoseUserControlViewModel_SamplesNoAddedAutomaticConditions;
            } else {
                var a = this.tableData.length + 1;
                let id = new Date().getTime();
                this.tableData.push({
                    array: null,
                    isEditdisplay: false,
                    number: a,
                    sampleid: id,
                    time: '',
                    value: ''
                });
            }
        },
        del() {
            //自动模式下不能删除样本
            console.log(this.data);
            if (this.data.PrMethod == this.lang.QualityManage_HT_ItemEditWindowViewModel_Automatic) {
                 setTimeout(() => {
this.tipchange1 = true;
    this.move('tip', 'tiphead');
                    });
                this.pdyd3 = true;
                this.w = this.lang.QualityManage_HT_SampleChoseUserControlViewModel_SamplesNoDeletedAutomaticConditions;
                return;
            }

            if(!this.handleRow.number){
                 setTimeout(() => {
this.tipchange1 = true;
    this.move('tip', 'tiphead');
                    });
                this.pdyd3 = true;
                this.w = this.lang.QualityManage_HT_SampleChoseUserControlViewModel_PSSampleRecordToDelete;
                return;
            }

            this.deldatal.forEach((item, index)=>{
                if(item.number === this.handleRow.number){
                    this.deldatal.splice(index,1)
                }
            })
            
            this.tableData.forEach((item, index)=>{
                if(item.number === this.handleRow.number){
                    this.tableData.splice(index,1)
                    this.handleRow = {}
                }
            })

            // let a1 = [];
            // let j = 0;
            // let j1 = 0;

            // let i = 0;
            // let i1 = 0;
            // for (i in this.tableData) {
            //     let c = parseInt(i) + 1;
            //     this.tableData[i].number = c;
            // }
            
            // for (i = 0; i < this.tabledata1.length; i++) {
            //     if (this.tabledata1[i].isEditdisplay == false) {
            //         a1.push(this.tabledata1[i]);
            //     }
            // }
            // console.log(a1)
            // for (i1 in a1) {
            //     let c = parseInt(i1) + 1;
            //     a1[i1].number = c;
            // }
            // console.log('a1', a1);
            // this.$refs.multipleTable.bodyWrapper.scrollTop = 0;
            // if (a1.length <= 30) {
            //     this.tableData = a1;
            //     let a2 = JSON.stringify(a1);
            //     this.tabledata1 = JSON.parse(a2);
            // } else {
            //     this.tabledata1 = a1;
            //     let a2 = JSON.stringify(a1);
            //     this.tableData = JSON.parse(a2).splice(0, 30);
            // }
            // this.dom = this.$refs.multipleTable.bodyWrapper;
            // this.dom.addEventListener('scroll', () => {
            //     if (this.all == this.lang.QualityManage_HT_SampleChoseUserControlViewModel_DisplaySelected) {
            //         if (this.tabledata1.length > 30) {
            //             // 滚动距离
            //             let scrollTop = this.dom.scrollTop;
            //             // 变量windowHeight是可视区的高度
            //             let windowHeight =
            //                 this.dom.clientHeight || this.dom.clientHeight;
            //             // 变量scrollHeight是滚动条的总高度
            //             let scrollHeight =
            //                 this.dom.scrollHeight || this.dom.scrollHeight;
            //             if (scrollTop + windowHeight === scrollHeight) {
            //                 // 获取到的不是全部数据 当滚动到底部 继续获取新的数据
            //                 // if (!this.allData) this.getMoreLog();
            //                 //    console.log((this.tableData1.length/this.tableDate.length)>=30);
            //                 if (
            //                     this.tabledata1.length -
            //                         this.tableData.length >=
            //                     30
            //                 ) {
            //                     for (
            //                         let i = this.tablenumber;
            //                         i < this.tablenumber + 30;
            //                         i++
            //                     ) {
            //                         this.tableData.push(this.tabledata1[i]);
            //                     }
            //                     this.tablenumber = this.tablenumber + 30;

            //                     // console.log(this.tabledata1);
            //                     console.log(this.tableData.length);
            //                     console.log(this.tableData);
            //                     console.log(this.tablenumber);
            //                 } else if (
            //                     this.tabledata1.length % this.tableData.length >
            //                     0
            //                 ) {
            //                     console.log(
            //                         this.tablenumber +
            //                             (this.tabledata1.length %
            //                                 this.tableData.length)
            //                     );
            //                     for (
            //                         let i = this.tablenumber;
            //                         i < this.tabledata1.length;
            //                         i++
            //                     ) {
            //                         this.tableData.push(this.tabledata1[i]);
            //                     }
            //                 } else {
            //                     return;
            //                 }
            //             }
            //         }
            //     }
            // });
            // console.log(this.tabledata1);
            // console.log(this.deldatal);

            // this.deldatal = [];
            // let a = JSON.stringify(this.tableData);
            // this.tabledata1 = JSON.parse(a);
        },
        xg(a, b, c) {
            //   console.log(a)
            //   console.log(b)
            //   console.log(c)
            if (b == 'number') {
                let j = 0;
                for (j in this.tabledata1) {
                    if (a.sampleid == this.tabledata1[j].sampleid) {
                        this.tabledata1[j].number = a.number;
                    }
                }
            } else if (b == 'time') {
                let j = 0;
                for (j in this.tabledata1) {
                    if (a.sampleid == this.tabledata1[j].sampleid) {
                        this.tabledata1[j].time = a.time;
                    }
                }
            } else if (b == 'value') {
                let j = 0;
                for (j in this.tabledata1) {
                    if (a.sampleid == this.tabledata1[j].sampleid) {
                        this.tabledata1[j].value = a.value;
                    }
                }
            } else if (b == 'array') {
                let j = 0;
                for (j in this.tabledata1) {
                    if (a.sampleid == this.tabledata1[j].sampleid) {
                        this.tabledata1[j].array = a.array;
                    }
                }
            }
        },
        select(a, b, c2) {
            console.log(c2);
            console.log(a); 
            console.log(b);
            // let i = 0;
            // let j = 0;
            // for (i in a) {
            //     for (j in this.tabledata1) {
            //         if (a.sampleid == this.tabledata1[j].sampleid) {
            //             this.tabledata1[j].isEditdisplay = a.isEditdisplay;
            //         }
            //     }
            // }
            this.tabledata1.forEach(item=>{
                if (a.number == item.number) {
                    item.isEditdisplay = a.isEditdisplay;
                }
            })
            // let c = 0;
            // let c1 = 10;
            // for (c in a) {
            //     for (c1 in this.tabledata1) {
            //         if (a[c].sampleid == this.tabledata1[c1].sampleid) {
            //             this.tabledata1[c1].isEditdisplay = true;
            //         } else {
            //             this.tabledata1[c1].isEditdisplay = false;
            //         }
            //     }
            // }
            this.deldatal = [];
            let i = 0;
            for (i = 0; i < this.tabledata1.length; i++) {
                if (this.tabledata1[i].isEditdisplay == true) {
                    this.deldatal.push(a);
                }
            }
            console.log(this.deldatal);
            console.log(this.tabledata1)
            this.$store.state.tableData = [...this.tabledata1];
            let a1 = {
                num: this.Number1,
                starttime: this.value1,
                endtime: this.value2,
                data: [...this.tabledata1]
            };
            this.$store.commit('mutationsAddCount', a1);
        },
        selectall(a) {
            let i = 0;
            let j = 0;
            for (i in a) {
                for (j in this.tableData) {
                    if (a[i].sampleid == this.tableData[j].sampleid) {
                        this.tableData[j].isEditdisplay = true;
                    }
                }
            }
            let c = JSON.stringify(this.tableData);
            this.tabledata1 = JSON.parse(c);
            console.log(this.tabledata1);
        },
        changetime4() {
            var a = '2018/12/8 星期六 15:00:00';

            console.log(this.GMTToStr(a));
        },
        handleRowChange1(a, b, c) {
            this.handleRow = a
            console.log(a);
        },
        haschange() {
            if (this.all == this.lang.QualityManage_HT_SampleChoseUserControlViewModel_DisplaySelected) {
                this.all = this.lang.QualityManage_HT_SampleChoseUserControlViewModel_DisplayAll;
                this.$refs.multipleTable.bodyWrapper.scrollTop = 0;
                this.$store.commit('mutationsAddCount1', this.all);
                this.$store.state.b = this.all;
                console.log(this.all);
                console.log(this.$store.state.b);
                this.tableData = [];
                let i = 0;
                for (i in this.tabledata1) {
                    if (this.tabledata1[i].isEditdisplay == true) {
                        this.tableData.push(this.tabledata1[i]);
                    }
                }
                console.log(this.tableData1);
            } else {
                this.tableData = [];

                this.all = this.lang.QualityManage_HT_SampleChoseUserControlViewModel_DisplaySelected;
                this.$store.commit('mutationsAddCount1', this.all);
                  this.$store.state.b = this.all;
                let a = JSON.stringify(this.tabledata1);
                if (JSON.parse(a).length < 30) {
                    this.tableData = JSON.parse(a);
                } else {
                    this.tablenumber = 30;
                    this.$refs.multipleTable.bodyWrapper.scrollTop = 0;
                    for (let i = 0; i < 30; i++) {
                        this.tableData.push(this.tabledata1[i]);
                    }
                }

                console.log('q23', this.tableData);

                // this.search()
            }
        },
        sad11() {},
        tip2() {
            this.tipchange1 = false;
            this.ccc = false;
        },
        mouseDownHandleelse3(event) {
            event.currentTarget.style.cursor = 'move';
            window.onmousemove = this.mouseMoveHandleelse3;
        },
        mouseMoveHandleelse3(event) {
            this.pdyd3 = false;
            let moveLeft = event.pageX - 190 + 'px';
            let moveTop = event.pageY - 20 + 'px';
            this.$refs.kongtiao3.style.left = moveLeft;
            this.$refs.kongtiao3.style.top = moveTop;
        },
        mouseUpHandleelse3(event) {
            window.onmousemove = null;
            event.currentTarget.style.cursor = 'move';
        },
        exportTable() {
            var s = JSON.stringify(this.tabledata1)
            var a = JSON.stringify(this.tableData)
            let exportData = []
            // this.tabledata1.forEach(item => {
            //     if (item.isEditdisplay) {
            //         exportData.push(item)
            //     }
            // })
            if (this.all === this.lang.QualityManage_HT_SampleChoseUserControlViewModel_DisplaySelected) {
                exportData = [...this.tabledata1]
            } else {
                exportData = [...this.tableData]
            }
            
            // let exportData = [...this.deldatal]
            require.ensure([], () => {
                
                const { export_json_to_excel } = require('../../vendor/Export2Excel');
                const tHeader = [this.lang.QualityManage_SampleChoseWindow_DataGrid_Number, this.lang.QualityManage_SampleChoseWindow_DataGrid_RecordingTime, this.lang.QualityManage_SampleChoseWindow_DataGrid_TestItemValue, this.lang.QualityManage_SampleChoseWindow_DataGrid_Group];
                const filterVal = ['number', 'time', 'value', 'array'];
                      if( exportData.length>=150000){
                             setTimeout(() => {
this.tipchange1 = true;
    this.move('tip', 'tiphead');
                    });
                            this.w = this.lang.SCMSConsoleWebApiMySql_ExportedDataNotSupportMoreThan150000
                            return;
                        }
                        if (140000 < exportData.length&&exportData.length<= 150000) {
                            this.excelDatas = [
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: exportData.splice(0, 20000),
                                    sheetName: 'sheet1'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: exportData.splice(0, 10000),
                                    sheetName: 'sheet2'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: exportData.splice(0, 10000),
                                    sheetName: 'sheet3'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: exportData.splice(0, 10000),
                                    sheetName: 'sheet4'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: exportData.splice(0, 10000),
                                    sheetName: 'sheet5'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: exportData.splice(0, 10000),
                                    sheetName: 'sheet6'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: exportData.splice(0, 10000),
                                    sheetName: 'sheet7'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: exportData.splice(0, 10000),
                                    sheetName: 'sheet8'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: exportData.splice(0, 10000),
                                    sheetName: 'sheet9'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: exportData.splice(0, 10000),
                                    sheetName: 'sheet10'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: exportData.splice(0, 10000),
                                    sheetName: 'sheet11'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: exportData.splice(0, 10000),
                                    sheetName: 'sheet12'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: exportData.splice(0, 10000),
                                    sheetName: 'sheet13'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: exportData.splice(0, 10000),
                                    sheetName: 'sheet14'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: exportData.splice(0, 10000),
                                    sheetName: 'sheet15'
                                }
                            ];
                        } else if (130000 < exportData.length&&exportData.length<= 140000) {
                            this.excelDatas = [
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: exportData.splice(0, 20000),
                                    sheetName: 'sheet1'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: exportData.splice(0, 10000),
                                    sheetName: 'sheet2'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: exportData.splice(0, 10000),
                                    sheetName: 'sheet3'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: exportData.splice(0, 10000),
                                    sheetName: 'sheet4'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: exportData.splice(0, 10000),
                                    sheetName: 'sheet5'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: exportData.splice(0, 10000),
                                    sheetName: 'sheet6'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: exportData.splice(0, 10000),
                                    sheetName: 'sheet7'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: exportData.splice(0, 10000),
                                    sheetName: 'sheet8'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: exportData.splice(0, 10000),
                                    sheetName: 'sheet9'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: exportData.splice(0, 10000),
                                    sheetName: 'sheet10'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: exportData.splice(0, 10000),
                                    sheetName: 'sheet11'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: exportData.splice(0, 10000),
                                    sheetName: 'sheet12'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: exportData.splice(0, 10000),
                                    sheetName: 'sheet13'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: exportData.splice(0, 10000),
                                    sheetName: 'sheet14'
                                }
                            ];
                        } else if (120000 < exportData.length&&exportData.length<= 130000) {
                             this.excelDatas = [
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: exportData.splice(0, 20000),
                                    sheetName: 'sheet1'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: exportData.splice(0, 10000),
                                    sheetName: 'sheet2'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: exportData.splice(0, 10000),
                                    sheetName: 'sheet3'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: exportData.splice(0, 10000),
                                    sheetName: 'sheet4'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: exportData.splice(0, 10000),
                                    sheetName: 'sheet5'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: exportData.splice(0, 10000),
                                    sheetName: 'sheet6'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: exportData.splice(0, 10000),
                                    sheetName: 'sheet7'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: exportData.splice(0, 10000),
                                    sheetName: 'sheet8'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: exportData.splice(0, 10000),
                                    sheetName: 'sheet9'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: exportData.splice(0, 10000),
                                    sheetName: 'sheet10'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: exportData.splice(0, 10000),
                                    sheetName: 'sheet11'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: exportData.splice(0, 10000),
                                    sheetName: 'sheet12'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: exportData.splice(0, 10000),
                                    sheetName: 'sheet13'
                                }
                            ];
                        }else if (110000 < exportData.length &&exportData.length<= 120000) {
                             this.excelDatas = [
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: exportData.splice(0, 20000),
                                    sheetName: 'sheet1'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: exportData.splice(0, 10000),
                                    sheetName: 'sheet2'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: exportData.splice(0, 10000),
                                    sheetName: 'sheet3'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: exportData.splice(0, 10000),
                                    sheetName: 'sheet4'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: exportData.splice(0, 10000),
                                    sheetName: 'sheet5'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: exportData.splice(0, 10000),
                                    sheetName: 'sheet6'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: exportData.splice(0, 10000),
                                    sheetName: 'sheet7'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: exportData.splice(0, 10000),
                                    sheetName: 'sheet8'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: exportData.splice(0, 10000),
                                    sheetName: 'sheet9'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: exportData.splice(0, 10000),
                                    sheetName: 'sheet10'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: exportData.splice(0, 10000),
                                    sheetName: 'sheet11'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: exportData.splice(0, 10000),
                                    sheetName: 'sheet12'
                                },
                            ];
                        }else if (100000 < exportData.length &&exportData.length<= 110000) {
                             this.excelDatas = [
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: exportData.splice(0, 20000),
                                    sheetName: 'sheet1'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: exportData.splice(0, 10000),
                                    sheetName: 'sheet2'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: exportData.splice(0, 10000),
                                    sheetName: 'sheet3'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: exportData.splice(0, 10000),
                                    sheetName: 'sheet4'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: exportData.splice(0, 10000),
                                    sheetName: 'sheet5'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: exportData.splice(0, 10000),
                                    sheetName: 'sheet6'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: exportData.splice(0, 10000),
                                    sheetName: 'sheet7'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: exportData.splice(0, 10000),
                                    sheetName: 'sheet8'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: exportData.splice(0, 10000),
                                    sheetName: 'sheet9'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: exportData.splice(0, 10000),
                                    sheetName: 'sheet10'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: exportData.splice(0, 10000),
                                    sheetName: 'sheet11'
                                },
                            ];
                        }else if (90000 < exportData.length&&exportData.length<= 100000) {
                             this.excelDatas = [
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: exportData.splice(0, 20000),
                                    sheetName: 'sheet1'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: exportData.splice(0, 10000),
                                    sheetName: 'sheet2'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: exportData.splice(0, 10000),
                                    sheetName: 'sheet3'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: exportData.splice(0, 10000),
                                    sheetName: 'sheet4'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: exportData.splice(0, 10000),
                                    sheetName: 'sheet5'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: exportData.splice(0, 10000),
                                    sheetName: 'sheet6'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: exportData.splice(0, 10000),
                                    sheetName: 'sheet7'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: exportData.splice(0, 10000),
                                    sheetName: 'sheet8'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: exportData.splice(0, 10000),
                                    sheetName: 'sheet9'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: exportData.splice(0, 10000),
                                    sheetName: 'sheet10'
                                },
                            ];
                        }else if (80000 < exportData.length&&exportData.length <= 90000) {
                             this.excelDatas = [
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: exportData.splice(0, 20000),
                                    sheetName: 'sheet1'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: exportData.splice(0, 10000),
                                    sheetName: 'sheet2'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: exportData.splice(0, 10000),
                                    sheetName: 'sheet3'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: exportData.splice(0, 10000),
                                    sheetName: 'sheet4'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: exportData.splice(0, 10000),
                                    sheetName: 'sheet5'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: exportData.splice(0, 10000),
                                    sheetName: 'sheet6'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: exportData.splice(0, 10000),
                                    sheetName: 'sheet7'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: exportData.splice(0, 10000),
                                    sheetName: 'sheet8'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: exportData.splice(0, 10000),
                                    sheetName: 'sheet9'
                                },
                            ];
                        }else if (70000 < exportData.length&&exportData.length <= 80000) {
                             this.excelDatas = [
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: exportData.splice(0, 20000),
                                    sheetName: 'sheet1'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: exportData.splice(0, 10000),
                                    sheetName: 'sheet2'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: exportData.splice(0, 10000),
                                    sheetName: 'sheet3'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: exportData.splice(0, 10000),
                                    sheetName: 'sheet4'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: exportData.splice(0, 10000),
                                    sheetName: 'sheet5'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: exportData.splice(0, 10000),
                                    sheetName: 'sheet6'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: exportData.splice(0, 10000),
                                    sheetName: 'sheet7'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: exportData.splice(0, 10000),
                                    sheetName: 'sheet8'
                                },
                            ];
                        }else if (60000 < exportData.length&&exportData.length <= 70000) {
                             this.excelDatas = [
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: exportData.splice(0, 20000),
                                    sheetName: 'sheet1'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: exportData.splice(0, 10000),
                                    sheetName: 'sheet2'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: exportData.splice(0, 10000),
                                    sheetName: 'sheet3'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: exportData.splice(0, 10000),
                                    sheetName: 'sheet4'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: exportData.splice(0, 10000),
                                    sheetName: 'sheet5'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: exportData.splice(0, 10000),
                                    sheetName: 'sheet6'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: exportData.splice(0, 10000),
                                    sheetName: 'sheet7'
                                },
                            ];
                        }else if (50000 < exportData.length&&exportData.length <= 60000) {
                             this.excelDatas = [
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: exportData.splice(0, 20000),
                                    sheetName: 'sheet1'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: exportData.splice(0, 10000),
                                    sheetName: 'sheet2'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: exportData.splice(0, 10000),
                                    sheetName: 'sheet3'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: exportData.splice(0, 10000),
                                    sheetName: 'sheet4'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: exportData.splice(0, 10000),
                                    sheetName: 'sheet5'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: exportData.splice(0, 10000),
                                    sheetName: 'sheet6'
                                },
                            ];
                        }else if (40000 < exportData.length&&exportData.length <= 50000) {
                             this.excelDatas = [
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: exportData.splice(0, 20000),
                                    sheetName: 'sheet1'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: exportData.splice(0, 10000),
                                    sheetName: 'sheet2'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: exportData.splice(0, 10000),
                                    sheetName: 'sheet3'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: exportData.splice(0, 10000),
                                    sheetName: 'sheet4'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: exportData.splice(0, 10000),
                                    sheetName: 'sheet5'
                                },
                            ];
                        }else if (30000 < exportData.length&&exportData.length <= 40000) {
                             this.excelDatas = [
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: exportData.splice(0, 20000),
                                    sheetName: 'sheet1'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: exportData.splice(0, 10000),
                                    sheetName: 'sheet2'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: exportData.splice(0, 10000),
                                    sheetName: 'sheet3'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: exportData.splice(0, 10000),
                                    sheetName: 'sheet4'
                                },
                            ];
                        }else if (20000 < exportData.length&&exportData.length <= 30000) {
                             this.excelDatas = [
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: exportData.splice(0, 20000),
                                    sheetName: 'sheet1'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: exportData.splice(0, 10000),
                                    sheetName: 'sheet2'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: exportData.splice(0, 10000),
                                    sheetName: 'sheet3'
                                },
                            ];
                        }else if (10000 < exportData.length&&exportData.length <= 20000) {
                               this.excelDatas = [
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: exportData.splice(0, 20000),
                                    sheetName: 'sheet1'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: exportData.splice(0, 10000),
                                    sheetName: 'sheet2'
                                },
                                
                            ];
                        }else if (0 < exportData.length&&exportData.length <= 10000) {
                           this.excelDatas = [
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: exportData.splice(0, 20000),
                                    sheetName: 'sheet1'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: exportData.splice(0, 1000),
                                    sheetName: 'sheet2'
                                },
                               
                            ];
                        }
                        console.log(this.excelDatas)
                        this.json2excel(this.excelDatas, this.lang.QualityMain, true, 'xlsx');
                            this.tabledata1 = JSON.parse(s)
                            this.tableData = JSON.parse(a)
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
        search() {
            this.tablenumber = 30;
            this.tabledata1 = [];
            this.tableData = [];
            this.value1 = this.GMTToStr(this.value1);
            this.value2 = this.GMTToStr(this.value2);

        
            this.all = this.lang.QualityManage_HT_SampleChoseUserControlViewModel_DisplaySelected;
            this.$store.commit('mutationsAddCount1', this.all);
            this.$store.state.b = this.all;
            if (!this.Number1) {
                 setTimeout(() => {
                        this.tipchange1 = true;
                        this.move('tip', 'tiphead');
                    });
                this.pdyd3 = true;
                this.w = this.lang.QualityManage_HT_SampleChoseUserControlViewModel_RandomSamplesNoEmpty;
            } else {
                console.log(this.data.PrName);
                var re = /^[0-9]+$/;
                if (re.test(this.Number1)) {
                    if (this.Number1 % parseInt(this.data.PrSampleNumber) == 0) {
                        this.$axios
                            .post(
                                `/api/QualityManage/SearchSample?SampleNumber=${this.Number1}&PrSampleNumber=${this.data.PrSampleNumber}&PrMethod=${this.data.PrMethod}&PrVariableName=${this.data.PrName}&StartTime=${this.value1}&EndTime=${this.value2}&variablename=${this.data.PrVariableName}&prid=${this.data.PrId}`
                            )
                            .then(res => {
                                console.log(res)
                                this.$store.state.a.starttime =  this.value1;
                                this.$store.state.a.endtime = this.value2;
                                this.$store.state.a.num = this.Number1;
                                this.$store.state.one  = 2;
                                if (res.data.code == 1) {
                                    setTimeout(() => {
                                        this.tipchange1 = true;
                                        this.move('tip', 'tiphead');
                                    });
                                    this.pdyd3 = true;
                                    this.w = res.data.msg;
                                } else {
                                    if(res.data.data.length < 30){
                                        this.tableData = [...res.data.data]
                                    }else{
                                        for (let n = 0; n < 30; n++) {
                                            this.tableData.push(res.data.data[n]);
                                        }
                                    }
                                    console.log(res.data.data.length);
                                    this.tabledata1 = res.data.data;
                                    this.handleAddClick();
                                    this.dom = this.$refs.multipleTable.bodyWrapper;
                                    this.dom.addEventListener('scroll', () => {
                                        if (this.all == this.lang.QualityManage_HT_SampleChoseUserControlViewModel_DisplaySelected) {
                                            console.log(this.tabledata1);
                                            if (this.tabledata1.length > 30) {
                                                // 滚动距离
                                                let scrollTop = this.dom
                                                    .scrollTop;
                                                // 变量windowHeight是可视区的高度
                                                let windowHeight =
                                                    this.dom.clientHeight ||
                                                    this.dom.clientHeight;
                                                // 变量scrollHeight是滚动条的总高度
                                                let scrollHeight =
                                                    this.dom.scrollHeight ||
                                                    this.dom.scrollHeight;
                                                if (
                                                    scrollTop + windowHeight ===
                                                    scrollHeight
                                                ) {
                                                    // 获取到的不是全部数据 当滚动到底部 继续获取新的数据
                                                    // if (!this.allData) this.getMoreLog();
                                                    //    console.log((this.tableData1.length/this.tableDate.length)>=30);
                                                    if (
                                                        this.tabledata1.length -
                                                            this.tableData
                                                                .length >=
                                                        30
                                                    ) {
                                                        for (
                                                            let i = this
                                                                .tablenumber;
                                                            i <
                                                            this.tablenumber +
                                                                30;
                                                            i++
                                                        ) {
                                                            this.tableData.push(
                                                                this.tabledata1[
                                                                    i
                                                                ]
                                                            );
                                                        }
                                                        this.tablenumber =
                                                            this.tablenumber +
                                                            30;

                                                        // console.log(this.tabledata1);
                                                        console.log(
                                                            this.tableData
                                                                .length
                                                        );
                                                        console.log(
                                                            this.tableData
                                                        );
                                                        console.log(
                                                            this.tablenumber
                                                        );
                                                    } else if (
                                                        this.tabledata1.length %
                                                            this.tableData
                                                                .length >
                                                        0
                                                    ) {
                                                        console.log(
                                                            this.tablenumber +
                                                                (this.tabledata1
                                                                    .length %
                                                                    this
                                                                        .tableData
                                                                        .length)
                                                        );
                                                        for (
                                                            let i = this
                                                                .tablenumber;
                                                            i <
                                                            this.tabledata1
                                                                .length;
                                                            i++
                                                        ) {
                                                            this.tableData.push(
                                                                this.tabledata1[
                                                                    i
                                                                ]
                                                            );
                                                        }
                                                    } else {
                                                        return;
                                                    }
                                                }
                                            }
                                        }
                                    });
                                }
                            });
                    } else {
                        setTimeout(() => {
                            this.tipchange1 = true;
                            this.move('tip', 'tiphead');
                        });
                        this.pdyd3 = true;
                        this.w = `${this.lang.QualityManage_HT_SampleChoseUserControlViewModel_SamplesShouldBeSubgroupCapacity}${this.data.PrSampleNumber}${this.lang.QualityManage_HT_SampleChoseUserControlViewModel_IntegerMultiple}`;
                    }
                } else {
                     setTimeout(() => {
                        this.tipchange1 = true;
                        this.move('tip', 'tiphead');
                    });
                    this.pdyd3 = true;
                    this.w = this.lang.QualityManage_HT_SampleChoseUserControlViewModel_PEPositiveInteger;
                }
            }
        },
        sx(){
            console.log("吃饭")
            let that = this
            setTimeout(()=>{
                for(let i=0;i<$('.el-picker-panel').length;i++){
                    $('.el-picker-panel')[i].style.zoom = that.zoomValue
                }
        })
              
        },
        changetime() {
            this.$store.state.tableData = this.tabledata1;
            this.$store.state.b = this.all;
            this.$store.state.one = 2;
            this.$store.commit('mutationsAddCount2', 1);
            this.$router.push({ path: '/QualityMain' });
        },
        changetime1() {
            console.log(this.data);
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
        getMoreLog() {}
    },
    mounted() {
        this.$nextTick(() => {
            this.zoomValue = Number(parseFloat(window.screen.width/2000).toFixed(2)) <= 0.66 ? 0.66 : Number(parseFloat(window.screen.width/1920).toFixed(2))
            this.$refs.search.style.zoom = this.zoomValue
            // console.log(this.$refs.btns)
            // this.$refs.btns.style.zoom = this.zoomValue
        })

        this.getLangData()
        this.data = JSON.parse(this.$route.query.id)
        this.PrMethod = this.data.PrMethod;

        if(this.$store.state.one !== 1){
            if(this.$store.state.pdid){
              if(this.$store.state.a.data.length !==0){
            this.value1 = this.$store.state.a.starttime;
            this.value2 = this.$store.state.a.endtime;
            this.Number1 = this.$store.state.a.num;
            this.all = this.$store.state.b;
            this.tabledata1 = this.$store.state.a.data;
             
            this.dom = this.$refs.multipleTable.bodyWrapper;
            if(this.all == this.lang.QualityManage_HT_SampleChoseUserControlViewModel_DisplaySelected){
                    for (let n = 0; n < 30; n++) {
                                        this.tableData.push(this.tabledata1[n]);
                                    }
            }else{
                let i =0;
                  for (i in this.tabledata1) {
                    if (this.tabledata1[i].isEditdisplay == true) {
                        this.tableData.push(this.tabledata1[i]);
                    }
                }
            }
        this.dom.addEventListener('scroll', () => {
            console.log('ss');
            if (this.all == this.lang.QualityManage_HT_SampleChoseUserControlViewModel_DisplaySelected) {
               
                if (this.tabledata1.length > 30) {
                    // 滚动距离
                    let scrollTop = this.dom.scrollTop;
                    // 变量windowHeight是可视区的高度
                    let windowHeight =
                        this.dom.clientHeight || this.dom.clientHeight;
                    // 变量scrollHeight是滚动条的总高度
                    let scrollHeight =
                        this.dom.scrollHeight || this.dom.scrollHeight;
                    if (scrollTop + windowHeight === scrollHeight) {
                        // 获取到的不是全部数据 当滚动到底部 继续获取新的数据
                        // if (!this.allData) this.getMoreLog();
                        //    console.log((this.tableData1.length/this.tableDate.length)>=30);
                        if (
                            this.tabledata1.length - this.tableData.length >=
                            30
                        ) {
                            for (
                                let i = this.tablenumber;
                                i < this.tablenumber + 30;
                                i++
                            ) {
                                this.tableData.push(this.tabledata1[i]);
                            }
                            this.tablenumber = this.tablenumber + 30;
                        } else if (
                            this.tabledata1.length % this.tableData.length >
                            0
                        ) {
                            console.log(
                                this.tablenumber +
                                    (this.tabledata1.length %
                                        this.tableData.length)
                            );
                            for (
                                let i = this.tablenumber;
                                i < this.tabledata1.length;
                                i++
                            ) {
                                this.tableData.push(this.tabledata1[i]);
                            }
                        } else {
                            return;
                        }
                    }
                }
            }
        });
              }
           

        }
        }else{
            if(this.$store.state.a.data){
         if(this.$store.state.a.data.length !== 0){
             this.$store.state.a.data.forEach(item => {
                 if (item.isEditdisplay == true) {
                     this.deldatal.push({
                        array: item.array,
                        isEditdisplay: item.isEditdisplay,
                        number: item.number,
                        sampleid: item.sampleid,
                        time: item.time,
                        value: item.value
                     })
                 }
             })
                this.value1 = this.$store.state.a.starttime;
            this.value2 = this.$store.state.a.endtime;
            this.Number1 = this.$store.state.a.num;
            this.tabledata1 = this.$store.state.a.data;
                 this.all = this.$store.state.b;
            if(this.all == this.lang.QualityManage_HT_SampleChoseUserControlViewModel_DisplaySelected){
                    for (let n = 0; n < 30; n++) {
                                        this.tableData.push(this.tabledata1[n]);
                                    }
            }else{
                let i =0;
                  for (i in this.tabledata1) {
                    if (this.tabledata1[i].isEditdisplay == true) {
                        this.tableData.push(this.tabledata1[i]);
                    }
                }
            }
            this.dom = this.$refs.multipleTable.bodyWrapper;
        this.dom.addEventListener('scroll', () => {
            if (this.all == this.lang.QualityManage_HT_SampleChoseUserControlViewModel_DisplaySelected) {
                if (this.tabledata1.length > 30) {
                    // 滚动距离
                    let scrollTop = this.dom.scrollTop;
                    // 变量windowHeight是可视区的高度
                    let windowHeight =
                        this.dom.clientHeight || this.dom.clientHeight;
                    // 变量scrollHeight是滚动条的总高度
                    let scrollHeight =
                        this.dom.scrollHeight || this.dom.scrollHeight;
                    if (scrollTop + windowHeight === scrollHeight) {
                        // 获取到的不是全部数据 当滚动到底部 继续获取新的数据
                        // if (!this.allData) this.getMoreLog();
                        //    console.log((this.tableData1.length/this.tableDate.length)>=30);
                        if (
                            this.tabledata1.length - this.tableData.length >=
                            30
                        ) {
                            for (
                                let i = this.tablenumber;
                                i < this.tablenumber + 30;
                                i++
                            ) {
                                this.tableData.push(this.tabledata1[i]);
                            }
                            this.tablenumber = this.tablenumber + 30;
                        } else if (
                            this.tabledata1.length % this.tableData.length >
                            0
                        ) {
                            console.log(
                                this.tablenumber +
                                    (this.tabledata1.length %
                                        this.tableData.length)
                            );
                            for (
                                let i = this.tablenumber;
                                i < this.tabledata1.length;
                                i++
                            ) {
                                this.tableData.push(this.tabledata1[i]);
                            }
                        } else {
                            return;
                        }
                    }
                }
            }
        });
            }
            }
   
        }

        let hisData = JSON.parse(window.sessionStorage.getItem("cpk"))
        if(this.data.PrId === hisData.id && hisData.data){
            this.tableData = [...hisData.data]
            this.tabledata1 = [...hisData.data]
        }
    },
    beforeDestroy(){
        console.log(this.tableData)
        window.sessionStorage.setItem("cpk",JSON.stringify({
            data: this.deldatal,
            id: this.data.PrId
        }))
    },
    watch: {
        tableData(val){
            this.$refs.multipleTable.doLayout();
        }
    }
};
</script>
<style>
.el-date-editor .el-input__inner{
    text-indent: 0;
}
</style>
<style lang="scss" scoped>
// @import '../../sass/tree.scss';
// @import '~../src/assets/sass/tree.scss';x
.time {
    display: inline-block;
}
.sum {
    margin-top: 5px;
    color: #9d9d9d;
}
.fl {
    float: left;
    display: flex;
    align-items: center;
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
    background-color: #eeeeee;

    &.blackBlueBg{
        background: #06091F;

        .linebox{
            background: #081027;
            border-color: #38415A;
        }
        .table{
            background: #0B1530;
            border-color: #38415A;
            color: #E4E4E4;

            .newdel{
                background-color: #4F5871!important;
                border-color: #4F5871!important;
                color: #fff;
            }
            .dr,.dc{
                background-color: transparent!important;
                border-color: #FDA100!important;
                color: #FDA100!important;
            
                .file{
                    background-color: transparent;
                    border-color: transparent;
                }
            }
            .js{
                background-color: transparent!important;
                border-color: #4ABFCD!important;
                color: #4ABFCD!important;
            }
        }
    }

    .linebox {
        height: 100%;
        width: 100%;
        background-color: #ffffff;
        border: 1px solid #d5d5d5;
        overflow: hidden;
    }
    .table {
        height: 60px;
        line-height: 60px;
        margin: 12px 15px 10px 15px;
        background-color: #dddddd;
        overflow: hidden;
        font-size: 14px;
        color: #6b6668;
        display: flex;
        align-items: center;
        span {
            margin-left: 5px;
            line-height: initial;
            display: inline-block;
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
    }
    .ql{
        margin-left: 5px !important;
    }
    .query {
        background-color: #4270e4;
        margin-right: 5px;

        span{
            line-height: 38px;
        }
    }
    .overQuery {
        display: inline-block;
        height: 40px;
        text-align: center;
        line-height: 40px;
        color: #ffffff;
        border-radius: 5px;
        font-weight: 600;
        cursor: pointer;
        padding: 0 10px;
        background-color: #4270e4;
        margin-right: 5px;
        white-space: nowrap;
    }
    .export {
        background-color: #ff6600;
        margin-right: 20px;
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
.tabledata {
    padding: 10px;
    width: 100%;
    height: calc(100% - 60px - 22px);
    
    table {
        width: 100%;
        background-color: #ffffff;
        color: #9d9d9d;
        border-right: 1px solid #cccccc;
        border-left: 1px solid #cccccc;
    }
    .number {
        width: 160px !important;
    }
    .center {
        padding-left: 190px;
    }
    .middle {
        padding: 0 10px;
    }
    .bottomtable {
        border-bottom: 1px solid #cccccc;
    }
}
tr {
    height: 40px;
    line-height: 40px;
}
.topline > td {
    border-top: 1px solid #cccccc;
    border-bottom: 1px solid #cccccc;
}
select {
    text-indent: 0.5em;
}
.query:hover {
    cursor: pointer;
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
        padding: 30px;
        // text-align: center;
        padding-bottom: 0;
    }
    .w {
        width: 100%;
        height: auto;
        position: absolute;
         top: 0;
         bottom: 0;
         left: 0;
         right: 0;
         margin: auto;
        text-align: center;
    }
    .tipdetermine {
        margin: auto;
        color: #ea9328;
        width: 310px;
        line-height: 30px;
        cursor: pointer;
        text-align: center;
        height: 30px;
        background-color: #f3e3ad;
    }
    .delclass {
        width: 330px;
        line-height: 30px;
        bottom: 10px;
        position: absolute;
        height: 30px;
        left: 25px;
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
            margin-left: 5px;
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
    z-index: 29999999;
    position: fixed;
    top: 0;
    left: 0;
}
.cover3 {
    width: 100%;
    height: 100%;
    z-index: 299999;
    position: fixed;
    top: 0;
    left: 0;
}
.sji {
    width: 60px !important;
    margin-right: 5px;
}
.line {
    width: 2px;
    height: 38px;
    display: inline-block;
    vertical-align: middle;
    // position: absolute;
    top: 46px;
    background-color: #aaaaaa;
}
.line1 {
    top: 42px !important;
}
.newadd {
    margin-left: 5px;
    background-color: #46be05 !important;
}
.newdel {
    background-color: #999999 !important;
}
.dc {
    position: relative;
    margin-left: 5px;
    padding: 0;
       display: inline-block;
    background: #ffffff !important;
    border: 2px solid #fda100;
    border-radius: 4px;
    text-align: center;
    // text-indent: 0;
    height: 40px;
    line-height: 40px;
    cursor: pointer;
    color: #fda100 !important;
    width: 100px;
}
.dr {
    margin-left: 5px;
    position: relative;
    background-color: #ddd !important;
    color: #ddd !important;
    border: 2px solid #ddd !important;

    width: 100px;
}
.js {
    background-color: #ffffff !important;
    color: #4abfcd !important;
    border: 2px solid #4abfcd !important;
    margin-left: 5px;
}
.df {
    margin: 0 10px;
    display: inline-block;
    background: #ffffff !important;
    border: 2px solid #fda100;
    border-radius: 4px;
    text-align: center;
    // text-indent: 0;
    height: 40px;
    line-height: 40px;
    cursor: pointer;
    color: #fda100 !important;
    width: 100px;
}
.file {
    // position: relative;
    position: absolute;
    display: inline-block;
    background: #ffffff;
    border: 2px solid #fda100;
    border-radius: 4px;
    width: 100px;
    top: -2px;

    color: #fda100;
    left: 0;
    text-align: center;
    // text-indent: 0;
    height: 40px;
    line-height: 40px;
    cursor: pointer;
    // // float: left;
    text-decoration: none;
    span {
        margin-left: 0 !important;
        display: block;

        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
    }
}
.file input {
    position: absolute;
    width: 100%;
    right: 0;
    top: 0;
    left: 0;
    opacity: 0;
    cursor: pointer;
    #upload {
        cursor: pointer;
    }
}
.ss {
    margin-right: 8px;
    display: inline-block;
    // max-width: 50px;
}
.q1 {
    position: relative;
    margin-right: 0!important;
    // top: 2px;
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
.tipcontanin{
    display: flex;
    align-items: center;
    height: 110px;
    padding: 0 25px;
    text-align: center;
    padding: 0 40px;
    // line-height: 100px;
    position: relative;
}

.tipcontanin span {
    display: block;
    width: 100%;
}
.tipfooter{
    height: 50px;
    padding: 10px 0;
    text-align: center;
}
.tipcontanin1{
    line-height:25px;
    text-align: left;
    padding: 15px 40px;
    font-size: 15px;
    
}
</style>
<style>
.tabledata th.gutter:last-of-type {
    display: block!important;
    width: 17px!important;
}
</style>