<!--
 * @description: 设备总览页面
 * @since: 2019-11-08 15:00:48
 * @Author: jawnwa22
 * @LastEditors: jawnwa22
 * @LastEditTime: 2019-11-11 10:13:58
 -->
<template>
    <div class="tapwater">
        <div class="linebox">
            <div class="table clearfix">
               
            </div>
            <div class="time">
               <el-date-picker
                        v-model="value1"
                        type="datetime"
                        :placeholder="lang.SCMSConsoleWebApiMySql_PleChooseDate"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        :style="{width:'220px'}"
                    ></el-date-picker>
                    <span class="i">-</span>
                    <el-date-picker
                        v-model="value2"
                        type="datetime"
                        :placeholder="lang.SCMSConsoleWebApiMySql_PleChooseDate"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        :style="{width:'220px'}"
                    ></el-date-picker>
                    <div class="query" @click="search">{{lang.AlarmRecord_History_Select}}</div>
                   </div>
            <div class="tabledata" :style="{width: '100%', height: '100%'}" id="outTable">
                <el-table
                    :data="tableData"
                    height="77%"
                    stripe
                    ref="multipleTable"
                    :header-cell-style="{background:'#5a6c98',color:'#ffffff', border:'1px solid #cccccc',height:'50px',padding:'0'}"
                    @row-click="handleRowChange1"
                    @select="select"
                    @cell-mouse-leave="leave"
                    @cell-dblclick="twoclick"
                >
                    <template slot="empty">
                        <span>{{lang.SCMSConsoleWebApiMySql_NoData}}</span>
                    </template>
                    <el-table-column prop="number" :label="lang['当前系统日期时间']" width="120">
                        <template slot-scope="scope">
                            <span v-if="a !== scope.row.id">{{scope.row.number}}</span>
                            <input type="text" v-model="scope.row.number" v-else />
                        </template>
                    </el-table-column>
                    <el-table-column prop="time" :label="lang.QualityManage_SampleChoseWindow_DataGrid_RecordingTime" width="500">
                        <template slot-scope="scope">
                            <span v-if="b !== scope.row.id">{{scope.row.time}}</span>
                            <input type="text" v-model="scope.row.time" v-else />
                        </template>
                    </el-table-column>
                    <el-table-column prop="value" :label="lang.QualityManage_SampleChoseWindow_DataGrid_TestItemValue" width="500">
                        <template slot-scope="scope">
                            <span v-if="c !== scope.row.id">{{scope.row.value}}</span>
                            <input type="text" v-model="scope.row.value" v-else />
                        </template>
                    </el-table-column>
                    <el-table-column prop="array" :label="lang.QualityManage_SampleChoseWindow_DataGrid_Group" width="500">
                        <template slot-scope="scope">
                            <span v-if="d !== scope.row.id">{{scope.row.array}}</span>
                            <input type="text" v-model="scope.row.array" v-else />
                        </template>
                    </el-table-column>
                    <el-table-column
                        type="selection"
                        :label="lang.QualityManage_SampleChoseUserControl_SelectedAsASample"
                        width="400"
                        Boolean="isEditdisplay"
                    ></el-table-column>
                </el-table>
                          <div class="pages-container">
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
            </div>
      
        </div>
        <div class="tip" ref="kongtiao3" v-if="tipchange1">
            <div
                class="tiptop"
                @mousedown="mouseDownHandleelse3($event)"
                @mouseup="mouseUpHandleelse3($event)"
            >
                <img :src="gth" alt />
                <span>{{lang.HT_MessageBoxCaption_Tips}}</span>
            </div>
            <div class="tipcontanin">
                <div class="w">{{w}}</div>
                <div class="tipdetermine" @click="tip2">{{lang.MessageBox_Confrim}}</div>
            </div>
        </div>
        <div class="cover3" v-if="tipchange1"></div>
    </div>
</template>

<script>
// vue文件中引入echarts工具
import XLSX from 'xlsx';
import FileSaver from 'file-saver';
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
               nowIndex: 1,
            pageDate: {
                pageIndex: 1,
                pagesize: 50,
                togeIndex: 0,
                togesize: 0
            },
               pageData: {
                PageSize: 50,
                TotalCount: 0,
                TotalPage: 0,
                PageIndex: 1,
                LastEnabled: false,
                NextEnabled: false
            },
            aaa: false,
            daibang: false,
            bbb: false,
            nowpage: 1,
            data: '',
            all:'显示选中',
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
            a:true,
            b:true,
            c:true,
            d:true,
            couponSelected: '',
            starttime: '',
            endtime: '',
            change: 2,
            tableData: [],
            hasnum: 1,
            sum: 0,
            Number1: '',
            tabledata1: '',
            wanttable:[],
            outputs:[],
            lang: JSON.parse(localStorage.getItem('languages'))[localStorage.getItem('currentLang')]
        };
    },

    methods: {
            getLangData() {
                this.all = this.lang.QualityManage_HT_SampleChoseUserControlViewModel_DisplaySelected
            },
           start() {
            this.nowIndex = 1;
            this.onetable();
        },
        abck() {
            if (1 < this.nowIndex) {
                this.nowIndex--;

                this.onetable();
            }
        },
          next() {
            if (this.pageDate.togeIndex > this.nowIndex) {
                this.nowIndex++;
                this.onetable();
            }
        },
          jump() {
            if (this.nowpage <= this.pageDate.togeIndex) {
                this.nowIndex = this.nowpage;
                this.onetable();
            }
        },
        end() {
            this.nowIndex = this.pageDate.togeIndex;
            this.onetable();
        },
        onetable(){

        },
           readExcel(e) {
            //表格导入
         var that = this;
    const files = e.target.files;
    console.log(files);
    if(files.length<=0){//如果没有文件名
    return false;
    }else if(!/\.(xls|xlsx)$/.test(files[0].name.toLowerCase())){
    this.$Message.error('上传格式不正确，请上传xls或者xlsx格式');
    return false;
    }
 
    const fileReader = new FileReader();
    fileReader.onload = (ev) => {
    try {
        const data = ev.target.result;
        const workbook = XLSX.read(data, {
        type: 'binary'
        });
        const wsname = workbook.SheetNames[0];//取第一张表
        const ws = XLSX.utils.sheet_to_json(workbook.Sheets[wsname]);//生成json表格内容
         console.log(workbook)
        let b = 0;
        for(b in workbook.Strings){
            if(!workbook.Strings[0].t == this.lang.QualityManage_SampleChoseWindow_DataGrid_Number){
                return false
            }else if(!workbook.Strings[1].t == this.lang.QualityManage_SampleChoseWindow_DataGrid_RecordingTime){
                return false;
            }else if(!workbook.Strings[2].t == this.lang.QualityManage_SampleChoseWindow_DataGrid_TestItemValue){
                return false;
            }else if(!workbook.Strings[3].t == this.lang.QualityManage_SampleChoseWindow_DataGrid_Group){
                return false;
            }
        } 
        let a = 0;
                    for (a in ws) {
                        ws[a].number = ws[a][this.lang.QualityManage_SampleChoseWindow_DataGrid_Number];
                        ws[a].value = ws[a][this.lang.QualityManage_SampleChoseWindow_DataGrid_TestItemValue];
                        ws[a].time = ws[a][this.lang.QualityManage_SampleChoseWindow_DataGrid_RecordingTime];
                        if(ws[a].hasOwnProperty(this.lang.QualityManage_SampleChoseWindow_DataGrid_Group)){
                              ws[a].array = ws[a][this.lang.QualityManage_SampleChoseWindow_DataGrid_Group]
                        }else{
                             ws[a].array = null;
                        }
                      
                    }
                    this.tableData = ws
              console.log(ws);
              console.log(this.tableData);
              
        that.outputs = [];//清空接收数据
        //编辑数据
        for(var i= 0;i<ws.length;i++){
        var sheetData = {
            address: ws[i].addr,
            value: ws[i].value
        }
        that.outputs.push(sheetData);
        }
        this.$refs.upload.value = '';
 
    } catch (e) {
 
        return false;
    }
    };
    fileReader.readAsBinaryString(files[0]);
       
        },
        save(){
            console.log(this.data)
            if (this.data.PrMethod == this.lang.QualityManage_HT_ItemEditWindowViewModel_Automatic) {
                this.tipchange1 = true;
                this.w = this.lang.QualityManage_HT_SampleChoseUserControlViewModel_NoSaveAutomaticConditions;
            } else {
                console.log(this.tableData);
                 var a=JSON.parse(JSON.stringify(this.tableData));
                let i =0;
                for(i in a){
                    a[i].PrMethod = this.lang.QualityManage_HT_ItemEditWindowViewModel_Manual,
                    a[i].PrId = this.data.PrId;
                }
                if(a.length == 0){
                    this.tipchange1 = true;
                    this.w = this.lang.QualityManage_HT_SampleChoseUserControlViewModel_NoSamplesToSave
                }else{
                    let c= 0;
                    var d = false;
                    for(c in a){
                        let b =parseInt(c)+1;
                        if(!a[c].number){
                             this.tipchange1 = true;
                             this.w = this.lang.QualityManage_HT_SampleChoseUserControlViewModel_SaveFailed
                             d = false;
                        }else if(!a[c].time||!a[c].value){
                              this.tipchange1 = true;
                               this.w =`${this.lang.QualityManage_HT_SampleChoseUserControlViewModel_Recording}${b}${this.lang.QualityManage_HT_SampleChoseUserControlViewModel_MissingConfigurationInformation}`
                               d = false;
                        }else if(!this.CheckDateTime(a[c].time)){
                                this.tipchange1 = true;
                                let msg = this.lang.QualityManage_HT_SampleChoseUserControlViewModel_RecordingTimeError
                                let firstL = msg.indexOf('>')
                                let firstR = msg.indexOf('<') + 1
                                let lastL = msg.lastIndexOf('>')
                                let lastR = msg.lastIndexOf('<') + 1
                                let str1 = msg.slice(firstL, firstR)
                                let str2 = msg.slice(lastL, lastR)
                                msg = msg.replace(str1, `<${b}>`)
                                msg = msg.replace(str2, `<${b}>`)         
                            //  this.w =`导入表格第<${b}>行【记录时间】<${b}>错误,格式例如2018-12-08 15：00：00`
                            this.w = msg
                             d = false;
                        }else if(isNaN(a[c].value)){
                               this.tipchange1 = true;
                                let msg = this.lang.QualityManage_HT_SampleChoseUserControlViewModel_DetectItemValueError
                                let firstL = msg.indexOf('>')
                                let firstR = msg.indexOf('<') + 1
                                let str1 = msg.slice(firstL, firstR)
                                msg = msg.replace(str1, `<${b}>`)
                            //  this.w =`导入表格第<${b}>行【检测项目值】字段格式不正确,请输入正确数值！`
                            this.w = msg
                             d = false;
                        }else{
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
            this.$nextTick(function(){
                console.log(a)
                if(d){
                   this.$axios({
                            method:'post',
                            url:'/api/QualityManage/saveSample',
                            data:a
                        }).then(res =>{
                            console.log(res)
                            if(res.code == 0){
                                  this.tipchange1 = true;
                    this.w = this.lang.QualityManage_HT_SampleChoseUserControlViewModel_SuccessfullySaved
                     this.search();

                            }
                        })
                }
                
            }
            )
        },
      
 CheckDateTime(str){
var reg = /^(\d+)-(\d{1,2})-(\d{1,2}) (\d{1,2}):(\d{1,2}):(\d{1,2})$/;
var r = str.match(reg);
if(r==null)return false;
r[2]=r[2]-1;
var d= new Date(r[1], r[2],r[3], r[4],r[5], r[6]);
if(d.getFullYear()!=r[1])return false;
if(d.getMonth()!=r[2])return false;
if(d.getDate()!=r[3])return false;
if(d.getHours()!=r[4])return false;
if(d.getMinutes()!=r[5])return false;
if(d.getSeconds()!=r[6])return false;
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
          js(){
             this.wanttable = [];
             let i = 0;
             for(i in this.tableData){
                 if(this.tableData[i].isEditdisplay){
                       this.wanttable.push(this.tableData[i]);
                 }
             }
            let j = 0;
               for(j in this.wanttable){
                   this.wanttable[j].PrSampleNumber = this.data.PrSampleNumber;
                   this.wanttable[j].PrUpLimit = this.data.PrUpLimit;
                   this.wanttable[j].PrDownLimit = this.data.PrDownLimit;
                   this.wanttable[j].PrRule = this.data.PrRule;
               }
                this.$nextTick(function(){
                   this.$axios({
                            method:'post',
                            url:'/api/QualityManage/sampleFromlist',
                            data:this.wanttable
                        }).then(res =>{
                            console.log(res.data.data)
                              let aa = JSON.stringify(res.data.data);
                              let bb =  JSON.stringify(this.data);
                            if(res.data.code == 0){
                                 this.$router.push({
                        path: '/table',
                        query: { id: aa,id1: bb}
                    });
                            }
                             
                        })
                
                
            }),
            
             console.log(this.wanttable)
        },
        twoclick(a1,b1,c1,d1){
         let i = 0;
         
        //  for(i in this.tableData){
        //      if(a1.sampleid == this.tableData[i].sampleid){
            if(b1.property == 'number'){
                 this.a = a1.id;
            }else if(b1.property == 'time'){
                 this.b= a1.id;
            }else if(b1.property == 'value'){
                this.c = a1.id;
            }else if(b1.property == 'array'){
                this.d = a1.id;
            }
               
              
                
               
        },
        leave(){
           this.a = false;
           this.b = false;
           this.c = false;
           this.d = false;
        },
        add() {
            if (this.data.PrMethod == this.lang.QualityManage_HT_ItemEditWindowViewModel_Automatic) {
                this.tipchange1 = true;
                this.w = this.lang.QualityManage_HT_SampleChoseUserControlViewModel_SamplesNoAddedAutomaticConditions;
            } else {
                var a = this.tableData.length + 1;
                this.tableData.push({
                    array: null,
                    isEditdisplay: false,
                    number: a,
                    sampleid: '3d98185b-b3ea-4ba4-baa5-26b0c1419693',
                    time: '',
                    value: ''
                });
            }
        },
        del(){
            let j = 0;
                for (j in this.tableData) {
                    if (this.tableData[j].isEditdisplay) {
                        this.tableData.splice(j,1);
                    }
                }
        },
        select(a) {
            let i = 0;
            let j = 0;
            for (i in a) {
                for (j in this.tableData) {
                    if (a[i].sampleid == this.tableData[j].sampleid) {
                        this.tableData[j].isEditdisplay = true;
                    }
                }
            }
        },
        changetime4() {
            var a = '2018/12/8 星期六 15:00:00';

            console.log(this.GMTToStr(a));
        },
        handleRowChange1(a, b, c) {
           console.log(a)
        },
        haschange() {
            if(this.all == this.lang.QualityManage_HT_SampleChoseUserControlViewModel_DisplaySelected){
                this.all = this.lang.QualityManage_HT_SampleChoseUserControlViewModel_DisplayAll;
                 this.tableData = [];
            let i = 0;
            for (i in this.tabledata1) {
                if (this.tabledata1[i].isEditdisplay) {
                    this.tableData.push(this.tabledata1[i]);
                }
            }

            this.$nextTick(function() {
                this.tableData.forEach(row => {
                    this.$refs.multipleTable.toggleRowSelection(row);
                });
            });
            }else{
                this.search()
            }
           
        },
        sad11() {},
        tip2() {
            this.tipchange1 = false;
        },
        mouseDownHandleelse3(event) {
            event.currentTarget.style.cursor = 'move';
            window.onmousemove = this.mouseMoveHandleelse3;
        },
        mouseMoveHandleelse3(event) {
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
         require.ensure([], () => {
                        const {
                            export_json_to_excel
                        } = require('../../vendor/Export2Excel');
                        const tHeader = [
                            this.lang.QualityManage_SampleChoseWindow_DataGrid_Number,
                            this.lang.QualityManage_SampleChoseWindow_DataGrid_RecordingTime,
                            this.lang.QualityManage_SampleChoseWindow_DataGrid_TestItemValue,
                            this.lang.QualityManage_SampleChoseWindow_DataGrid_Group,
                        ];
                        const filterVal = [
                            'number',
                            'time',
                            'value',
                            'array',
                        ];
                        const list = this.tableData;
                        const data = this.formatJson(filterVal, list);
                        export_json_to_excel(tHeader, data, this.lang.QualityMain);
                    })
            
        },
        formatJson(filterVal, jsonData) {
            return jsonData.map(v => filterVal.map(j => v[j]));
        },
        search() {
            this.value1 = this.GMTToStr(this.value1);
            this.value2 = this.GMTToStr(this.value2);
            if (!this.Number1) {
                this.tipchange1 = true;
                this.w = this.lang.QualityManage_HT_SampleChoseUserControlViewModel_RandomSamplesNoEmpty
            } else {
                var re = /^[0-9]+$/;
                if (re.test(this.Number1)) {
                    if (
                        this.Number1 % parseInt(this.data.PrSampleNumber) ==
                        0
                    ) {
                        this.$axios
                            .post(
                                `/api/QualityManage/SearchSample?SampleNumber=${this.Number1}&PrSampleNumber=${this.data.PrSampleNumber}&PrMethod=${this.data.PrMethod}&PrVariableName=${this.data.PrName}&StartTime=${this.value1}&EndTime=${this.value2}&variablename=${this.data.PrVariableName}&prid=${this.data.PrId}`
                            )
                            .then(res => {
                                if (res.data.code == 1) {
                                    this.tipchange1 = true;
                                    this.w = this.lang.QualityManage_HT_SampleChoseUserControlViewModel_NoSampleData
                                } else {
                                    let i = 0;
                                    let abc = 0;
                                    for (i in res.data.data) {
                                        abc++;
                                        var reg = /[\u4e00-\u9fa5]/g;
                                        res.data.data[i].time = this.GMTToStr(
                                            res.data.data[i].time.replace(
                                                reg,
                                                ''
                                            )
                                        );
                                      res.data.data[i].id = abc;
                                    }
                                    this.tableData = res.data.data;

                                    this.tabledata1 = res.data.data;

                                    this.$nextTick(function() {
                                        this.tableData.forEach(row => {
                                            if (row.isEditdisplay) {
                                                this.$refs.multipleTable.toggleRowSelection(
                                                    row
                                                );
                                            }
                                        });
                                    });
                                }
                            });
                    } else {
                        this.tipchange1 = true;
                        this.w = `${this.lang.QualityManage_HT_SampleChoseUserControlViewModel_SamplesShouldBeSubgroupCapacity}${this.data.PrSampleNumber}${this.lang.QualityManage_HT_SampleChoseUserControlViewModel_IntegerMultiple}`;
                    }
                } else {
                    this.tipchange1 = true;
                    this.w = this.lang.QualityManage_HT_SampleChoseUserControlViewModel_PEPositiveInteger
                }
            }
        },
        changetime() {
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
        }
    },
    mounted() {
        this.getLangData()
    }
};
</script>
<style lang="scss" scoped>
// @import '../../sass/tree.scss';
// @import '~../src/assets/sass/tree.scss';
.time {
    display: inline-block;
}
.sum {
    margin-top: 5px;
    color: #9d9d9d;
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
    background-color: #eeeeee;
    .linebox {
        height: 100%;
        width: 100%;
        background-color: #ffffff;
        border: 1px solid #d5d5d5;
        overflow: hidden;
    }
    .table {
        height: 60px;
        margin: 12px 20px 10px 20px;
        background-color: #dddddd;
        line-height: 60px;
        overflow: hidden;
        font-size: 14px;
        color: #6b6668;
        span {
            margin-left: 18px;
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
    .query {
        background-color: #4270e4;
        margin-right: 10px;
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
    width: calc(100%-20px);
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
        // text-align: center;
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
    z-index: 29;
    position: fixed;
    top: 0;
    left: 0;
}
.sji {
    width: 100px !important;
    margin-right: 10px;
}
.line {
    width: 2px;
    height: 38px;
    display: inline-block;
    position: absolute;
    top: 46px;
    background-color: #aaaaaa;
}
.newadd {
    margin-left: 15px;
    background-color: #46be05 !important;
}
.newdel {
    background-color: #999999 !important;
}
.dc {
    background-color: #ffffff !important;
    color: #f6af34 !important;
    border: 2px solid #f6af34 !important;
}
.dr {
    margin-left: 15px;
       background-color: #ddd !important;
    color: #ddd !important;
    border: 2px solid #ddd !important;
}
.js {
    background-color: #ffffff !important;
    color: #4abfcd !important;
    border: 2px solid #4abfcd !important;
    margin-left: 15px;
}
.file {
    position: relative;
    display: inline-block;
    background: #ffffff;
    border: 1px solid #fda100;
    border-radius: 4px;
    width: 100px;
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
.i{
    margin: 0px 10px;
}
.query{
    margin: 0px 10px
}
.time{
    padding: 0px 20px;
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
</style>