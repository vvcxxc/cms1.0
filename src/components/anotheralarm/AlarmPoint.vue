<!--
 * @Description: 报警记录报警点管理界面
 * @Date: 2019-11-24 14:31:33
 * @Author: 随风
 * @LastEditors: 随风
 * @LastEditTime: 2019-12-01 18:54:54
 -->
<template>
    <div class="public-table" >
              			<div class="loadcover" element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(0, 0, 0, 0.4)"  v-loading="this.$store.state.isShow" v-show="this.$store.state.isShow" style="position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;"></div>
        <div class="search-container" :style="{zoom}">
            <my-search
                :searchList="searchList"
                :searchData="searchData"
                @setParams="setParams"
                @change="change"
                @exportTable="exportTable"
                @preservation="preservation"
                ref="time"
            ></my-search>
        </div>
        <div class="table-container">
            <my-table :data="data" :tableHead="tableHead" @itcover='itcover' @changedata="changedata" ref="child"></my-table>
        </div>
        <div class="pages-container">
            <my-page :pageData="pageData" @req="req"></my-page>
        </div>
        <div class="tip" ref="kongtiao2" v-show="tipchange" :style="{zoom}">
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
            <div class="tipcontanin">
                <div class="tipword" v-if="deltrue">{{tipword}}</div>
                <div class="w" v-if="!deltrue">{{tipword}}</div>
                <div class="tipdetermine" @click="tip1" v-if="deltrue">{{lang.MessageBox_Confrim}}</div>
            </div>
        </div>
        <div class="cover2" v-if="tipchange"></div>
    </div>
</template>

<script>
import MySearch from '../public/search07.vue';
import MyTable from '../public/table03.vue';
import MyPage from '../public/Pages.vue';
export default {
    components: {
        MySearch,
        MyTable,
        MyPage
    },
    data() {
        return {
            deltrue: true,
            tipword: '',
            tipchange: false,
            gth: require('../../assets/images/gth.png'),
            searchList: [
                {
                    title: '报警组：',
                    model: 'aArrayName',
                    type: 'select',
                    optionList: [],
                    value: 'value',
                    label: 'label'
                },
                {
                    title: '报警设备：',
                    model: 'argAlarmDevice',
                    type: 'select',
                    optionList: [],
                    value: 'value',
                    label: 'label'
                },
                {
                    title: '报警类别：',
                    model: 'argAlarmType',
                    type: 'select',
                    optionList: [],
                    value: 'value',
                    label: 'label'
                },
                {
                    model: 'argKeyword',
                    type: 'key'
                }
            ],
            searchData: {
                argAlarmGroupId: '',
                argAlarmDevice: '',
                argAlarmType: '',
                argKeyword: '',
                aArrayName: ''
            },
            tableHead: {
                Number: '序号',
                Group: '报警组',
                Device: '报警设备',
                Name: '变量名',
                Address: '变量地址',
                DataType: '数据类型',
                Desc: '变量描述',
                AlarmType: '报警类别'
            },
            data: [],
            changedata1: [],
            enddata: '',
            a: '',
            b: '',
            haschange:2,
            daochu: '',
            pageData: {
                PageSize: 50,
                TotalCount: 0,
                TotalPage: 0,
                PageIndex: 1,
                LastEnabled: false,
                NextEnabled: false
            },
            zoom: 1,
            lang: JSON.parse(localStorage.getItem('languages'))[localStorage.getItem('currentLang')]
        };
    },
    created() {
        this.getLangData()
        this.init();
        let argStartTime = this.$getDate(
            new Date(new Date().toLocaleDateString()).getTime()
        );
        let argEndTime = this.$getDate(
            new Date(new Date().toLocaleDateString()).getTime() +
                24 * 60 * 60 * 1000 -
                1
        );
        Object.assign(this.searchData, {
            argStartTime,
            argEndTime
        });
        this.getAlarmDevice();
        this.getAlarmType();
        this.req(1);
    },
    mounted(){
        this.zoom = window.screen.width / 1920 < 0.8 ? 0.8 : window.screen.width / 1920
    },
    methods: {
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
        getLangData() {
            this.searchList = [
                {
                    title: this.lang.AlarmRecord_HT_AlarmPointManageUC_AlarmGroup + '：',
                    model: 'aArrayName',
                    type: 'select',
                    optionList: [],
                    value: 'value',
                    label: 'label'
                },
                {
                    title: this.lang.AlarmRecord_HT_AlarmPointManageUC_AlarmDevice + '：',
                    model: 'argAlarmDevice',
                    type: 'select',
                    optionList: [],
                    value: 'value',
                    label: 'label'
                },
                {
                    title: this.lang.AlarmRecord_HT_AlarmPointManageUC_AlarmCategory + '：',
                    model: 'argAlarmType',
                    type: 'select',
                    optionList: [],
                    value: 'value',
                    label: 'label'
                },
                {
                    model: 'argKeyword',
                    type: 'key'
                }
            ]
            this.tableHead = {
                Number: this.lang.AlarmRecord_HT_AlarmPointManageUC_SerialNumber,
                Group: this.lang.AlarmRecord_HT_AlarmPointManageUC_AlarmGroup,
                Device: this.lang.AlarmRecord_HT_AlarmPointManageUC_AlarmDevice,
                Name: this.lang.AlarmRecord_HT_AlarmPointManageUC_VariableName,
                Address: this.lang.AlarmRecord_HT_AlarmPointManageUC_VariableAddress,
                DataType: this.lang.AlarmRecord_HT_AlarmPointManageUC_TypeOfData,
                Desc: this.lang.AlarmRecord_HT_AlarmPointManageUC_VariableDescription,
                AlarmType: this.lang.AlarmRecord_HT_AlarmPointManageUC_AlarmCategory
            }
        },
        itcover(){
      setTimeout(() => {
                     this.tipchange = true;
                        this.move('tip', 'tiphead');
                    });
                this.w1 = true;
                // this.tipword = this.lang.NoOperationAuthority;
                this.tipword = this.lang.NoOperationAuthority
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
        mouseUpHandleelse2(event) {
            window.onmousemove = null;
            event.currentTarget.style.cursor = 'move';
        },
        tip1() {
              if(this.tipword==this.lang.NoOperationAuthority||this.w==this.lang.NoOperationAuthority){
             this.tipchange = false;
             return;
            }
            this.tipchange = false;
           
        },
        preservation(a) {
            
            if(!a){
                setTimeout(() => {
                     this.tipchange = true;
                        this.move('tip', 'tiphead');
                    });
                this.w1 = true;
                // this.tipword = this.lang.NoOperationAuthority;
                this.tipword = this.lang.NoOperationAuthority
                return
            }
            console.log(this.enddata)
            console.log(this.data)
            if (this.haschange == 2) {
                this.$axios({
                    method: 'post',
                    url: '/api/AlarmRecord/AlarmRecord_SetAlarmPoint',
                    data: this.data
                }).then(res => {
                    if (res.data.code == 0) {
                            setTimeout(() => {
                     this.tipchange = true;
                        this.move('tip', 'tiphead');
                    });
                        this.tipword = this.lang.AlarmRecord_HT_AlarmPointManageUC_SuccessfullySaved;
                        this.$refs.child.c1();
                         this.haschange = 2;
                    } else {
                            setTimeout(() => {
                     this.tipchange = true;
                        this.move('tip', 'tiphead');
                    });
                        this.tipword = res.data.msg;
                        this.haschange = 2;
                    }
                    //  this.req(this.pageData.PageIndex);

                    console.log(res);
                });
            }
        },
        changedata(data) {
            let i = 0;
            for (i in data) {
                data[i].AlarmID = data[i].ID;
                data[i].TagName = data[i].Name;
            }
            this.enddata = data;
            this.haschange = 2;
        },
        exportTable(a) {
              if(!a){
                setTimeout(() => {
                     this.tipchange = true;
                        this.move('tip', 'tiphead');
                    });
                this.w1 = true;
                // this.tipword = this.lang.NoOperationAuthority;
                this.tipword = this.lang.NoOperationAuthority
                return
            }
              if(this.pageData.TotalCount>=150000){
                                setTimeout(() => {
                     this.tipchange = true;
                        this.move('tip', 'tiphead');
                    });
                            this.tipword = this.lang.SCMSConsoleWebApiMySql_ExportedDataNotSupportMoreThan150000
                            return;
                        }
            if (this.searchData.argAlarmGroupId == this.lang.AlarmRecord_HT_AlarmPointManageUC_Unlimited) {
                this.searchData.argAlarmGroupId = '';
            }
            if (this.searchData.argAlarmDevice == this.lang.AlarmRecord_HT_AlarmPointManageUC_Unlimited) {
                this.a = '';
            }
            if (this.searchData.argAlarmType == this.lang.AlarmRecord_HT_AlarmPointManageUC_Unlimited) {
                this.b = '';
            }

            console.log(this.searchData);
            this.$axios
                .post(
                    `/api/AlarmRecord/AlarmRecord_GstAlarmPoint?argAlarmGroupId=${this.searchData.argAlarmGroupId}&argAlarmDevice=${this.a}&argAlarmType=${encodeURIComponent(this.b)}&argKeyword=${encodeURIComponent(this.searchData.argKeyword)}&argPageIndex=1&argPageSize=${this.pageData.TotalCount}`
                )
                .then(res => {
                    console.log('res', res);
                    console.log(this.b);
                    if (res.data.code == 0) {
                        let i = 0;
                        for (i in res.data.data.DataList) {
                            res.data.data.DataList[i].Number = ++i;

                            let a = i - 1;
                            if (res.data.data.DataList[a].Address == '') {
                                res.data.data.DataList[a].Address = '无';
                            }
                        }
                        this.daochu = res.data.data.DataList;
                    }
                })
                .then(() => {
                    require.ensure([], () => {
                        const {
                            export_json_to_excel
                        } = require('../../vendor/Export2Excel');
                        const tHeader = [];
                        for (var i in this.tableHead) {
                            tHeader.push(this.tableHead[i]);
                        }
                        tHeader.push(this.lang.AlarmRecord_HT_AlarmPointManageUC_Condition, this.lang.AlarmRecord_HT_AlarmPointManageUC_Limit, this.lang.AlarmRecord_HT_AlarmPointManageUC_AlarmText, this.lang.AlarmRecord_HT_AlarmPointManageUC_AlarmLevel);
                        const filterVal = [];
                        for (var key in this.tableHead) {
                            if (this.tableHead.hasOwnProperty(key)) {
                                filterVal.push(key);
                            }
                        }

                        filterVal.push('Condition', 'Limit', 'Text', 'Level');
                               if (140000 < this.daochu.length&&this.daochu.length<= 150000) {
                            this.excelDatas = [
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.daochu.splice(0, 20000),
                                    sheetName: 'sheet1'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.daochu.splice(0, 10000),
                                    sheetName: 'sheet2'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.daochu.splice(0, 10000),
                                    sheetName: 'sheet3'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.daochu.splice(0, 10000),
                                    sheetName: 'sheet4'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.daochu.splice(0, 10000),
                                    sheetName: 'sheet5'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.daochu.splice(0, 10000),
                                    sheetName: 'sheet6'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.daochu.splice(0, 10000),
                                    sheetName: 'sheet7'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.daochu.splice(0, 10000),
                                    sheetName: 'sheet8'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.daochu.splice(0, 10000),
                                    sheetName: 'sheet9'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.daochu.splice(0, 10000),
                                    sheetName: 'sheet10'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.daochu.splice(0, 10000),
                                    sheetName: 'sheet11'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.daochu.splice(0, 10000),
                                    sheetName: 'sheet12'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.daochu.splice(0, 10000),
                                    sheetName: 'sheet13'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.daochu.splice(0, 10000),
                                    sheetName: 'sheet14'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.daochu.splice(0, 10000),
                                    sheetName: 'sheet15'
                                }
                            ];
                        } else if (130000 < this.daochu.length&&this.daochu.length<= 140000) {
                            this.excelDatas = [
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.daochu.splice(0, 20000),
                                    sheetName: 'sheet1'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.daochu.splice(0, 10000),
                                    sheetName: 'sheet2'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.daochu.splice(0, 10000),
                                    sheetName: 'sheet3'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.daochu.splice(0, 10000),
                                    sheetName: 'sheet4'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.daochu.splice(0, 10000),
                                    sheetName: 'sheet5'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.daochu.splice(0, 10000),
                                    sheetName: 'sheet6'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.daochu.splice(0, 10000),
                                    sheetName: 'sheet7'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.daochu.splice(0, 10000),
                                    sheetName: 'sheet8'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.daochu.splice(0, 10000),
                                    sheetName: 'sheet9'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.daochu.splice(0, 10000),
                                    sheetName: 'sheet10'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.daochu.splice(0, 10000),
                                    sheetName: 'sheet11'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.daochu.splice(0, 10000),
                                    sheetName: 'sheet12'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.daochu.splice(0, 10000),
                                    sheetName: 'sheet13'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.daochu.splice(0, 10000),
                                    sheetName: 'sheet14'
                                }
                            ];
                        } else if (120000 < this.daochu.length&&this.daochu.length<= 130000) {
                             this.excelDatas = [
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.daochu.splice(0, 20000),
                                    sheetName: 'sheet1'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.daochu.splice(0, 10000),
                                    sheetName: 'sheet2'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.daochu.splice(0, 10000),
                                    sheetName: 'sheet3'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.daochu.splice(0, 10000),
                                    sheetName: 'sheet4'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.daochu.splice(0, 10000),
                                    sheetName: 'sheet5'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.daochu.splice(0, 10000),
                                    sheetName: 'sheet6'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.daochu.splice(0, 10000),
                                    sheetName: 'sheet7'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.daochu.splice(0, 10000),
                                    sheetName: 'sheet8'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.daochu.splice(0, 10000),
                                    sheetName: 'sheet9'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.daochu.splice(0, 10000),
                                    sheetName: 'sheet10'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.daochu.splice(0, 10000),
                                    sheetName: 'sheet11'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.daochu.splice(0, 10000),
                                    sheetName: 'sheet12'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.daochu.splice(0, 10000),
                                    sheetName: 'sheet13'
                                }
                            ];
                        }else if (110000 < this.daochu.length &&this.daochu.length<= 120000) {
                             this.excelDatas = [
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.daochu.splice(0, 20000),
                                    sheetName: 'sheet1'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.daochu.splice(0, 10000),
                                    sheetName: 'sheet2'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.daochu.splice(0, 10000),
                                    sheetName: 'sheet3'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.daochu.splice(0, 10000),
                                    sheetName: 'sheet4'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.daochu.splice(0, 10000),
                                    sheetName: 'sheet5'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.daochu.splice(0, 10000),
                                    sheetName: 'sheet6'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.daochu.splice(0, 10000),
                                    sheetName: 'sheet7'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.daochu.splice(0, 10000),
                                    sheetName: 'sheet8'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.daochu.splice(0, 10000),
                                    sheetName: 'sheet9'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.daochu.splice(0, 10000),
                                    sheetName: 'sheet10'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.daochu.splice(0, 10000),
                                    sheetName: 'sheet11'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.daochu.splice(0, 10000),
                                    sheetName: 'sheet12'
                                },
                            ];
                        }else if (100000 < this.daochu.length &&this.daochu.length<= 110000) {
                             this.excelDatas = [
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.daochu.splice(0, 20000),
                                    sheetName: 'sheet1'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.daochu.splice(0, 10000),
                                    sheetName: 'sheet2'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.daochu.splice(0, 10000),
                                    sheetName: 'sheet3'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.daochu.splice(0, 10000),
                                    sheetName: 'sheet4'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.daochu.splice(0, 10000),
                                    sheetName: 'sheet5'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.daochu.splice(0, 10000),
                                    sheetName: 'sheet6'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.daochu.splice(0, 10000),
                                    sheetName: 'sheet7'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.daochu.splice(0, 10000),
                                    sheetName: 'sheet8'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.daochu.splice(0, 10000),
                                    sheetName: 'sheet9'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.daochu.splice(0, 10000),
                                    sheetName: 'sheet10'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.daochu.splice(0, 10000),
                                    sheetName: 'sheet11'
                                },
                            ];
                        }else if (90000 < this.daochu.length&&this.daochu.length<= 100000) {
                             this.excelDatas = [
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.daochu.splice(0, 20000),
                                    sheetName: 'sheet1'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.daochu.splice(0, 10000),
                                    sheetName: 'sheet2'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.daochu.splice(0, 10000),
                                    sheetName: 'sheet3'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.daochu.splice(0, 10000),
                                    sheetName: 'sheet4'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.daochu.splice(0, 10000),
                                    sheetName: 'sheet5'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.daochu.splice(0, 10000),
                                    sheetName: 'sheet6'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.daochu.splice(0, 10000),
                                    sheetName: 'sheet7'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.daochu.splice(0, 10000),
                                    sheetName: 'sheet8'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.daochu.splice(0, 10000),
                                    sheetName: 'sheet9'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.daochu.splice(0, 10000),
                                    sheetName: 'sheet10'
                                },
                            ];
                        }else if (80000 < this.daochu.length&&this.daochu.length <= 90000) {
                             this.excelDatas = [
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.daochu.splice(0, 20000),
                                    sheetName: 'sheet1'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.daochu.splice(0, 10000),
                                    sheetName: 'sheet2'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.daochu.splice(0, 10000),
                                    sheetName: 'sheet3'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.daochu.splice(0, 10000),
                                    sheetName: 'sheet4'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.daochu.splice(0, 10000),
                                    sheetName: 'sheet5'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.daochu.splice(0, 10000),
                                    sheetName: 'sheet6'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.daochu.splice(0, 10000),
                                    sheetName: 'sheet7'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.daochu.splice(0, 10000),
                                    sheetName: 'sheet8'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.daochu.splice(0, 10000),
                                    sheetName: 'sheet9'
                                },
                            ];
                        }else if (70000 < this.daochu.length&&this.daochu.length <= 80000) {
                             this.excelDatas = [
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.daochu.splice(0, 20000),
                                    sheetName: 'sheet1'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.daochu.splice(0, 10000),
                                    sheetName: 'sheet2'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.daochu.splice(0, 10000),
                                    sheetName: 'sheet3'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.daochu.splice(0, 10000),
                                    sheetName: 'sheet4'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.daochu.splice(0, 10000),
                                    sheetName: 'sheet5'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.daochu.splice(0, 10000),
                                    sheetName: 'sheet6'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.daochu.splice(0, 10000),
                                    sheetName: 'sheet7'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.daochu.splice(0, 10000),
                                    sheetName: 'sheet8'
                                },
                            ];
                        }else if (60000 < this.daochu.length&&this.daochu.length <= 70000) {
                             this.excelDatas = [
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.daochu.splice(0, 20000),
                                    sheetName: 'sheet1'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.daochu.splice(0, 10000),
                                    sheetName: 'sheet2'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.daochu.splice(0, 10000),
                                    sheetName: 'sheet3'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.daochu.splice(0, 10000),
                                    sheetName: 'sheet4'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.daochu.splice(0, 10000),
                                    sheetName: 'sheet5'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.daochu.splice(0, 10000),
                                    sheetName: 'sheet6'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.daochu.splice(0, 10000),
                                    sheetName: 'sheet7'
                                },
                            ];
                        }else if (50000 < this.daochu.length&&this.daochu.length <= 60000) {
                             this.excelDatas = [
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.daochu.splice(0, 20000),
                                    sheetName: 'sheet1'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.daochu.splice(0, 10000),
                                    sheetName: 'sheet2'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.daochu.splice(0, 10000),
                                    sheetName: 'sheet3'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.daochu.splice(0, 10000),
                                    sheetName: 'sheet4'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.daochu.splice(0, 10000),
                                    sheetName: 'sheet5'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.daochu.splice(0, 10000),
                                    sheetName: 'sheet6'
                                },
                            ];
                        }else if (40000 < this.daochu.length&&this.daochu.length <= 50000) {
                             this.excelDatas = [
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.daochu.splice(0, 20000),
                                    sheetName: 'sheet1'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.daochu.splice(0, 10000),
                                    sheetName: 'sheet2'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.daochu.splice(0, 10000),
                                    sheetName: 'sheet3'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.daochu.splice(0, 10000),
                                    sheetName: 'sheet4'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.daochu.splice(0, 10000),
                                    sheetName: 'sheet5'
                                },
                            ];
                        }else if (30000 < this.daochu.length&&this.daochu.length <= 40000) {
                             this.excelDatas = [
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.daochu.splice(0, 20000),
                                    sheetName: 'sheet1'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.daochu.splice(0, 10000),
                                    sheetName: 'sheet2'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.daochu.splice(0, 10000),
                                    sheetName: 'sheet3'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.daochu.splice(0, 10000),
                                    sheetName: 'sheet4'
                                },
                            ];
                        }else if (20000 < this.daochu.length&&this.daochu.length <= 30000) {
                             this.excelDatas = [
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.daochu.splice(0, 20000),
                                    sheetName: 'sheet1'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.daochu.splice(0, 10000),
                                    sheetName: 'sheet2'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.daochu.splice(0, 10000),
                                    sheetName: 'sheet3'
                                },
                            ];
                        }else if (10000 < this.daochu.length&&this.daochu.length <= 20000) {
                               this.excelDatas = [
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.daochu.splice(0, 20000),
                                    sheetName: 'sheet1'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.daochu.splice(0, 10000),
                                    sheetName: 'sheet2'
                                },
                                
                            ];
                        }else if (0 < this.daochu.length&&this.daochu.length <= 10000) {
                           this.excelDatas = [
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.daochu.splice(0, 20000),
                                    sheetName: 'sheet1'
                                },
                                {
                                    tHeader: tHeader,
                                    filterVal: filterVal,
                                    tableDatas: this.daochu.splice(0, 1000),
                                    sheetName: 'sheet2'
                                },
                               
                            ];
                        }

                        this.json2excel(this.excelDatas, this.lang.AlarmRecord_HT_AlarmPointManageUC_AlarmPointManagement, true, 'xlsx');
                        // const list = this.daochu;
                        // const data = this.formatJson(filterVal, list);
                        // console.log(tHeader);
                        // console.log(filterVal);
                        // console.log(list);
                        // export_json_to_excel(tHeader, data, '报警点');
                    });
                })
                .catch(err => {});
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
        init() {
            // 自来水系统：仪表类型，仪表名称
            // 设备监控系统：车间，设备名称
            // 变配电系统：配电室，控制柜
            let data = '设备';
            this.$axios
                .post(`/api/Main/Main_GetProjectName`)
                .then(res => {})
                .catch(err => {});
        },
        change(e, item) {
            let data = this.deviceList[e];
            if (data.length > 0) {
                this.searchList[1].optionList = [];
                data.map(item => {
                    this.searchList[1].optionList.push({
                        value: item,
                        label: item
                    });
                });
            }
        },
        setParams(params,a) {
                if(!a){
                setTimeout(() => {
                     this.tipchange = true;
                        this.move('tip', 'tiphead');
                    });
                this.w1 = true;
                // this.tipword = this.lang.NoOperationAuthority;
                this.tipword = this.lang.NoOperationAuthority
                return
            }
            this.searchData = params;
        },
        // 获取仪表
        getAlarmDevice() {
            this.$axios
                .post(`/api/AlarmRecord/AlarmRecord_GstAlarmGroup`)
                .then(res => {
                    if (res.data.code == 0) {
                        this.searchList[0].optionList = [];
                        let data = res.data.data;
                        data.map(item => {
                            this.searchList[0].optionList.push({
                                value: item.aArrayId,
                                label: item.aArrayName
                            });
                        });
                        this.searchList[0].optionList.unshift({
                            value: '',
                            label: this.lang.AlarmRecord_HT_AlarmPointManageUC_Unlimited
                        });
                        this.searchData.argAlarmGroupId = this.searchList[0].optionList[0].label;
                        this.searchData.aArrayName = this.searchList[0].optionList[0].value;
                    }
                })
                .catch(err => {});
            this.$axios
                .post(`/api/AlarmRecord/AlarmRecord_GstAlarmDevice2`)
                .then(res => {
                    if (res.data.code == 0) {
                        this.searchList[1].optionList = [];
                        let data = res.data.data;
                        data.map(item => {
                            // this.searchList[1].optionList.push({
                            //     value: item.Value,
                            //     label: item.Text
                            // });
                             this.searchList[1].optionList.push({
                                value: item,
                            });
                        });
                        this.searchList[1].optionList.unshift({
                            value: this.lang.AlarmRecord_HT_AlarmPointManageUC_Unlimited
                        });
                        this.searchData.argAlarmDevice = this.searchList[1].optionList[0].value;
                    }
                })
                .catch(err => {});
        },
        // 获取报警类别
        getAlarmType() {
            this.$axios
                .post(`/api/AlarmRecord/AlarmRecord_GstAlarmType2`)
                .then(res => {
                    if (res.data.code == 0) {
                        // res.data.data.unshift(this.lang.AlarmRecord_HT_AlarmPointManageUC_Unlimited);
                        this.searchList[2].optionList = [];
                        let data = res.data.data;
                        data.map(item => {
                            // this.searchList[2].optionList.push({
                            //     value: item.Value,
                            //     label: item.Text
                            // });
                            this.searchList[2].optionList.push({
                                value: item,
                            });
                        });
                        // this.searchList[2].optionList.unshift({
                        //     value: this.lang.AlarmRecord_HT_Unlimited,
                        //     label: this.lang.AlarmRecord_HT_Unlimited
                        // });
                        this.searchList[2].optionList.unshift({
                            value: this.lang.AlarmRecord_HT_Unlimited,
                        });
                        this.searchData.argAlarmType = this.searchList[2].optionList[0].value;
                    }
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
                     this.tipchange = true;
                        this.move('tip', 'tiphead');
                    });
                    this.tipword = this.lang.DataGrid_Reaction_HT_PEAPositiveInteger;
                        setTimeout(() => {
                     this.tipchange = true;
                        this.move('tip', 'tiphead');
                    });
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
                            this.tipword = this.lang.DataGrid_Reaction_HT_PEThePageNumber;
                                setTimeout(() => {
                     this.tipchange = true;
                        this.move('tip', 'tiphead');
                    });
                            return;
                        }
                    }
                }
            }

            this.a = this.searchData.argAlarmDevice;
            this.b = this.searchData.argAlarmType;
            let c = this.searchData.argAlarmGroupId;
            if (this.searchData.argAlarmDevice == this.lang.AlarmRecord_HT_AlarmPointManageUC_Unlimited) {
                this.a = '';
            }
            if (this.searchData.argAlarmType == this.lang.AlarmRecord_HT_AlarmPointManageUC_Unlimited) {
                this.b = '';
            }
            if (this.searchData.argAlarmGroupId == this.lang.AlarmRecord_HT_AlarmPointManageUC_Unlimited) {
                c = '';
            }
            let params = Object.assign(this.searchData, {
                argPageIndex: pageIndex,
                argPageSize: this.pageData.PageSize
            });
            console.log(
                `/api/AlarmRecord/AlarmRecord_GstAlarmPoint?argAlarmGroupId=${c}&argAlarmDevice=${this.a}&argAlarmType=${this.b}&argKeyword=${this.searchData.argKeyword}&argPageIndex=${pageIndex}&argPageSize=50`
            );
            this.$axios
                .post(
                    `/api/AlarmRecord/AlarmRecord_GstAlarmPoint?argAlarmGroupId=${c}&argAlarmDevice=${this.a}&argAlarmType=${encodeURIComponent(this.b)}&argKeyword=${encodeURIComponent(this.searchData.argKeyword)}&argPageIndex=${pageIndex}&argPageSize=50`
                )
                .then(res => {
                    console.log(res);
                    console.log('asd', c);
                    console.log(this.b);
                    if (res.data.code == 0) {
                        let i = 0;
                        for (i in res.data.data.DataList) {
                            res.data.data.DataList[i].Number = ++i;

                            let a = i - 1;
                            if (res.data.data.DataList[a].Address == '') {
                                res.data.data.DataList[a].Address = '无';
                            }
                        }
                        this.data = res.data.data.DataList;
                        this.pageData = res.data.data.ParameterList;
                    } else {
                        this.w = res.data.msg;
                        this.w1 = true;
                            setTimeout(() => {
                     this.tipchange = true;
                        this.move('tip', 'tiphead');
                    });
                    }
                })
                .catch(err => {});
        }
    }
};
</script>

<style lang="scss" scoped>
.public-table {
    display: flex;
    flex-direction: column;
    height: 100%;
    .table-container {
        flex: 1;
        // overflow: auto;
    }
    .page-container {
        height: 60px;
    }
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
    .w {
        width: 100%;
        margin-top: 40px;
        text-align: center;
    }
    .tipdetermine {
        cursor: pointer;
        color: #ea9328;
        cursor: pointer;
        width: 310px;
        line-height: 30px;
        text-align: center;
        // margin-top: 40px;
        position: absolute;
        bottom: 20px;
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
            display: inline-block;
            height: 30px;
            width: 160px;
            text-align: center;
            background-color: #e0e0e0;
            color: #7e7e7e;
        }
        .two {
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
    position: fixed;
    width: 100%;
    top: 0;
    left: 0;
    height: 100%;
}
</style>
