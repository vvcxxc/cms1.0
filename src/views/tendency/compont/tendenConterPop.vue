<!--
 * @Description: 这是添加修改页面页面（组件）
 * @Date: 2019-12-18 10:28:00
 * @Author: Tao
 * @LastEditors: Tao
 * @LastEditTime: 2021-04-09 14:04:29
 -->
<template>
    <div class="tenPop_box" :style="{zoom:zoom11}">
        <div class="CurveArrPopcover" v-if="addCurveArrName"></div>
        <div v-drager class="tenPop_fool" :style="{zoom1}">
            <div class="tenPop_title">{{TitleText}}</div>
            <span @click="off" class="tenPop_i el-icon-close"></span>
        </div>
        <div class="tenPop_conter" :style="{height: 825*zoom1+'px'}">
            <div class="tenPop_conterBox" :style="{height: 826*zoom1+'px'}">
                <div class="tenPop_conterFool" :style="{height: 370*zoom1+'px'}">
                    <div class="conterFool_fool">
                        <span>{{lang.FormulaManage_AddProject_DeviceName}}</span>
                        <el-select @focus='sx'  @change="equipmentFun()" class="conterFool_select" v-model="equipmentValue" :placeholder="lang.AlarmRecord_HT_Unlimited">
                            <el-option
                            v-for="item in equipment"
                            size="mini"
                            :key="'1' + item.DeviceName"
                            :label="item.DisplayDeviceName"
                            :value="item.DeviceName">
                            </el-option>
                        </el-select>
                         <span>{{lang.FormulaManage_AddProject_VariableGroup}}</span>
                        <el-select @focus='sx'  @change="groupNameFun()" class="conterFool_select" v-model="groupNameValue" :placeholder="lang.AlarmRecord_HT_Unlimited">
                            <el-option
                            v-for="item in groupName"
                            :key="'2' + item.GroupName"
                            :label="item.GroupName"
                            :value="item.GroupName">
                            </el-option>
                        </el-select>
                         <span>{{lang.FormulaManage_AddProject_DataGrid_VariableType}}：</span>
                        <el-select @focus='sx' @change="dataTypeFun()" class="conterFool_select conterFool_select1" v-model="dataTypeValue" :placeholder="lang.AlarmRecord_HT_Unlimited">
                            <el-option
                            v-for="(item) in dataType"
                            :key="'3' + item.Value"
                            :label="item.Text"
                            :value="item.Value">
                            </el-option>
                        </el-select>
                        <input class="conterFool_text" v-model="keyword" :placeholder="lang.FormulaManage_AddProject_Keyword" type="text" :style="{fontSize: 16*zoom1+'px',height:30*zoom1+'px'}" />
                        <div @click="inquire" class="conterFool_btn" :style="{fontSize: 16*zoom1+'px',height:30*zoom1+'px',lineHeight:30*zoom1+'px'}">{{lang.FormulaManage_AddProject_Select}}</div>
                    </div>
                    <div class="conterFool_middle" :style="{height:255*zoom1+'px'}">
                        <el-table
                            border
                            :height="250*zoom1"
                            class="conterFool_middle"
                            ref="multipleTable"
                            :data="tableDataList"
                            tooltip-effect="dark"
                            style="width: 100%"
                            @selection-change="handleSelectionChange">
                            <template slot="empty">
                                <span>{{lang.SCMSConsoleWebApiMySql_NoData}}</span>
                            </template>
                            <el-table-column
                                type="selection"
                                width="60">
                            </el-table-column>
                            <el-table-column
                                :label="lang.FormulaManage_AddProject_DataGrid_DeviceName"
                                prop="Device"
                                width="215">
                            </el-table-column>
                            <el-table-column
                                prop="DateType"
                                :label="lang.FormulaManage_AddProject_DataGrid_VariableType"
                                width="215">
                            </el-table-column>
                            <el-table-column
                                :label="lang.FormulaManage_AddProject_DataGrid_Name"
                                prop="Name"
                                width="215">
                            </el-table-column>
                              <el-table-column
                                :label="lang.FormulaManage_AddProject_DataGrid_Describe"
                                prop="Descript"
                                width="215">
                            </el-table-column>
                            <el-table-column
                                :label="lang.FormulaManage_AddProject_DataGrid_VariableAddress"
                                prop="Address"
                                width="215"
                            show-overflow-tooltip>
                            </el-table-column>
                        </el-table>
                    </div>
                    <div class="conterFool_bottom" :style="{zoom1}">
                       <div @click="jump" class="bottom_jump">{{lang.DataGrid_Reaction_TurnPage}}</div>
                          <div class="bottom_input">
                           <span>{{lang.DataGrid_Reaction_The}}</span>
                           <input v-model="num" class="text" type="text"/>
                           <span>{{lang.DataGrid_Reaction_Page}}</span>
                       </div>
                       <div @click="end" class="bottom_end"> {{lang.DataGrid_Reaction_EndPage}}</div>
                        <div ref="next" @click="next" class="bottom_next">{{lang.DataGrid_Reaction_NextPage}}</div>
                        <div ref="last" @click="last"  class="bottom_last">{{lang.DataGrid_Reaction_LastPage}}</div>
                        <div @click="firest" class="bottom_firest">{{lang.DataGrid_Reaction_FirstPage}}</div>
                        <div class="bottom_text">
                         <span>{{lang.DataGrid_Reaction_HT_ATotalOf}}{{TotalCount}}{{lang.DataGrid_Reaction_HT_RecordsAndTheCurrent}}{{PageIndex}}{{lang.DataGrid_Reaction_HT_Page}}{{TotalPage}}{{lang.DataGrid_Reaction_HT_RecordsAnd}}{{PageSize}}{{lang.DataGrid_Reaction_HT_PerPage}}</span>
                       </div>
                    </div>
                </div>

                <div class="tenPop_conterMiddle" :style="{zoom1}">
                    <el-button @click="addCurve" class="add" type="primary">{{lang.NewTrendChart_SeriesGroupsSetting_Add}}</el-button>
                    <el-button @click="deleteCurve()" class="remove" type="info">{{lang.NewTrendChart_SeriesGroupsSetting_Remove}}</el-button>
                </div>

                <div class="tenPop_conterBottom" :style="{height: 320*zoom1+'px'}">
                   <div class="conterBottom_fool" :style="{zoom1}">
                      <span class="text">{{lang.NewTrendChart_SeriesGroupsSetting_Selected}}</span>
                      <div @click="addReferenceLine" class="addLine">{{lang.NewTrendChart_SeriesGroupsSetting_AddReferenceLine}}</div>
                   </div>
                   <div class="conterBottom_conter" :style="{height:250*zoom1+'px'}">
                       <div class="conter" :style="{height: 50*zoom1+'px',lineHeight: 50*zoom1+'px',fontSize:16*zoom1+'px'}">
                           <div class="conter_1" :style="{height: 50*zoom1+'px',lineHeight: 50*zoom1+'px'}">
                               <el-checkbox @change="CheckAllChange1" v-model="checkedAll" :style="{zoom1}"></el-checkbox>
                            </div>
                            <div class="conter_2" :style="{height: 50*zoom1+'px',lineHeight: 50*zoom1+'px'}">{{lang.NewTrendChart_SeriesGroupsSetting_DataGrid_TagName}}</div>
                            <div class="conter_3" :style="{height: 50*zoom1+'px',lineHeight: 50*zoom1+'px'}">{{lang.NewTrendChart_SeriesGroupsSetting_DataGrid_Type}}</div>
                            <div class="conter_4" :style="{height: 50*zoom1+'px',lineHeight: 50*zoom1+'px'}">{{lang.NewTrendChart_SeriesGroupsSetting_DataGrid_Colour}}</div>
                            <div class="conter_5" :style="{height: 50*zoom1+'px',lineHeight: 50*zoom1+'px'}">{{lang.NewTrendChart_SeriesGroupsSetting_DataGrid_LineName}}</div>
                            <div class="conter_6" :style="{height: 50*zoom1+'px',lineHeight: 50*zoom1+'px'}">{{lang.NewTrendChart_SeriesGroupsSetting_DataGrid_Unit}}</div>
                            <div class="conter_7" :style="{height: 50*zoom1+'px',lineHeight: 50*zoom1+'px'}">{{lang.NewTrendChart_SeriesGroupsSetting_DataGrid_Digit}}</div>
                            <div class="conter_8" :style="{height: 50*zoom1+'px',lineHeight: 50*zoom1+'px'}">{{lang.NewTrendChart_SeriesGroupsSetting_DataGrid_Max}}</div>
                            <div class="conter_9" :style="{height: 50*zoom1+'px',lineHeight: 50*zoom1+'px'}">{{lang.NewTrendChart_SeriesGroupsSetting_DataGrid_Min}}</div>
                            <div class="conter_10" :style="{height: 50*zoom1+'px',lineHeight: 50*zoom1+'px'}">{{lang.NewTrendChart_SeriesGroupsSetting_DataGrid_Desc}}</div>
                       </div>

                        <div class="conter_box" v-for="(item,index) in addCurveArr" :key="index">
                           <div class="conter_box_1" :style="{height: 50*zoom1+'px',lineHeight: 50*zoom1+'px'}">
                              <input @click="checkboxDe(item,index)" type="checkbox" class="checkbox" :style="{zoom1}">
                            </div>
                            <div class="conter_box_2" :style="{height: 50*zoom1+'px',lineHeight: 50*zoom1+'px'}">{{item.TagName}}</div>
                            <div class="conter_box_3" :style="{height: 50*zoom1+'px',lineHeight: 50*zoom1+'px'}">
                                <el-select @focus='sx' @change="selectValue(item,index)" v-model="item.value" :placeholder="lang.SCMSConsoleWebApiMySql_PleChoose">
                                    <el-option
                                    v-for="item in item.type"
                                    :key="'4' + item.value"
                                    :label="item.label"
                                    :value="item.value">
                                    </el-option>
                                </el-select>
                            </div>
                            <div class="conter_box_4" :style="{height: 50*zoom1+'px',lineHeight: 50*zoom1+'px'}">
                                <el-color-picker
                                    v-model="item.Stroke"
                                    show-alpha
                                    @change="colorFun(item,index)"
                                    :style="{height: 40*zoom1+'px'}"
                                    :predefine="predefineColors">
                                </el-color-picker>
                            </div>
                         
                            <div class="conter_box_5" :style="{height: 50*zoom1+'px',lineHeight: 50*zoom1+'px'}">
                                <input v-model="item.Name" type="text" />
                            </div>
                            <div class="conter_box_6" :style="{height: 50*zoom1+'px',lineHeight: 50*zoom1+'px'}">
                                 <input v-model="item.curvePt" type="text" />
                            </div>
                            <div class="conter_box_7" :style="{height: 50*zoom1+'px',lineHeight: 50*zoom1+'px'}">
                                 <input v-model="item.curveFo" type="text" />
                            </div>
                            <div class="conter_box_8" :style="{height: 50*zoom1+'px',lineHeight: 50*zoom1+'px'}">
                                 <input v-model="item.curveMax" type="text" />
                            </div>
                            <div class="conter_box_9" :style="{height: 50*zoom1+'px',lineHeight: 50*zoom1+'px'}">
                                 <input v-model="item.curveNin" type="text" />
                            </div>
                            <div class="conter_box_10" :style="{height: 50*zoom1+'px',lineHeight: 50*zoom1+'px'}">
                                 <input v-model="item.Descript" type="text" />
                            </div>
                       </div>
                   </div>
                </div>
                <div class="tenPop_btn" :style="{zoom1}">
                   <el-button @click="btnFunction" class="btn_add" type="primary">{{addQuer}}</el-button>
                   <el-button @click="cancelFun" class="btn_cen" type="info">{{lang.PopupCommon_Cancel}}</el-button>
                   <el-button @click="addCurveArrFun" v-if="addShow" class="btn_qure" type="primary">{{addText}}</el-button>
                </div>
            </div>
        </div>

         <!-- 弹窗 -->
        <div v-if="NumShow" class="deletePop" :style="{zoom1}">
            <div class="title1">
                <span class="title_i el-icon-warning"></span>
                <span class="text">{{lang.HT_MessageBoxCaption_Tips}}</span>
            </div>
            <div class="delete_text">
                {{tips}}
            </div>
            <div class="delete_btn">
                <div @click="confirmation()" class="confir">{{lang.MessageBox_Confrim}}</div>
            </div>
        </div>

        <!-- 添加参考线 -->
        <div v-if="referenceShow" class="referencePop" :style="{zoom1}">
            <div class="title">
                <span @click="referenOff" class="referen_i el-icon-close"></span>
                <span class="text">{{lang.NewTrendChart_AddConsultLine_Title}}</span>
            </div>
            <div class="middle">
                <div class="middle_box">
                    <span class="text">{{lang.NewTrendChart_AddConsultLine_Name}} </span>
                    <input class="inp" v-model="referenName" type="text" />
                </div>
                <div class="middle_box">
                    <span class="text">{{lang.NewTrendChart_AddConsultLine_Description}} </span>
                    <input class="inp" v-model="referenDescript" type="text" />
                </div>
                <div class="middle_box">
                    <span class="text">{{lang.NewTrendChart_AddConsultLine_Value}} </span>
                    <input class="inp" v-model="referenNum" type="text" />
                </div>
                 <div class="btn">
                    <el-button @click="btnQue" class="btn_que" type="primary">{{lang.PopupCommon_Sure}}</el-button>
                    <el-button @click="referenOff" class="btn_cle" type="info">{{lang.PopupCommon_Cancel}}</el-button>
                 </div>
            </div>


              <!-- 弹窗 -->
            <div v-if="referenceConfirShow" class="deletePop" :style="{zoom1}">
                <div class="title1">
                    <span class="title_i el-icon-warning"></span>
                    <span class="text">{{lang.HT_MessageBoxCaption_Tips}}</span>
                </div>
                <div class="delete_text delete_text11">
                    {{referenText}}
                </div>
                <div class="delete_btn">
                    <div @click="referenConfir()" class="confir">{{lang.MessageBox_Confrim}}</div>
                </div>
            </div>
        </div>
        
        <!-- 添加曲线弹窗 -->
        <div v-if="addCurveArrName" class="CurveArrPop" :style="{zoom1}">
            <div class="title">
                <span @click="curveArrNameOff" class="referen_i el-icon-close"></span>
                <span class="text">{{curveArrText}}</span>
            </div>
            <div class="middle">
                <div class="first">
                    <span class="text">{{lang.NewTrendChart_AddToSeriesGroup_GroupName}} </span>
                    <input class="inp" @input="addName()" v-model="addCurveArrNameText" type="text" />
                </div>
                 <div class="btn">
                    <el-button @click="addCurveBtnQue" class="btn_que" type="primary">{{lang.PopupCommon_Sure}}</el-button>
                    <el-button @click="curveArrNameOff" class="btn_cle" type="info">{{lang.PopupCommon_Cancel}}</el-button>
                 </div>
            </div>

              <!-- 弹窗 -->
            <div v-if="addCurveArrNameShow" class="deletePop">
                <div class="title1">
                    <span class="title_i el-icon-warning"></span>
                    <span class="text">{{lang.HT_MessageBoxCaption_Tips}}</span>
                </div>
                <div class="delete_text delete_text11">
                    {{addCurveArrHint}}
                </div>
                <div class="delete_btn">
                    <div @click="addCurveArrNameConfir()" class="confir">{{lang.MessageBox_Confrim}}</div>
                </div>
            </div>
        </div>

          <!-- 弹窗 -->
            <div v-if="addCurveArrNameShow" class="deletePop" :style="{zoom1}">
                <div class="title1">
                    <span class="title_i el-icon-warning"></span>
                    <span class="text">{{lang.HT_MessageBoxCaption_Tips}}</span>
                </div>
                <div class="delete_text delete_text11">
                    {{addCurveArrHint}}
                </div>
                <div class="delete_btn">
                    <div @click="addCurveArrNameConfir()" class="confir">{{lang.MessageBox_Confrim}}</div>
                </div>
            </div>

            <!-- 提示信息弹窗 -->
            <div v-if="save" class="deletePop">
                <div class="title1 tipword">
                    <span class="title_i el-icon-warning"></span>
                    <span class="text">{{lang.HT_MessageBoxCaption_Tips}}</span>
                </div>
                <div class="delete_text delete_text11">
                    {{tipword}}
                </div>
                <div class="delete_btn">
                    <div @click="closePop()" class="confir">{{lang.MessageBox_Confrim}}</div>
                </div>
            </div>
    </div>
</template>

<script>
export default {
    name:'tendenConterPop',
    props:['type','data','Name'],
   
    data(){
        return{
            num:1,
            save: false,
            tipword: '',
            checkedAll:false,
            CheckedCitie:false,
            addText:'添加为曲线组',
            addQuer:'',
            addShow:true,
            addCurveArrNameShow:false,//添加曲线弹窗确认文本
            referenceConfirShow:false,//参考线弹窗确认
            referenText:'',//参考线弹窗确认文本
            NumShow:false, //分页数值弹窗
            referenceShow:false, //参考线弹窗
            addCurveArrName:false,
            screenDate:[],//筛选数据
            equipment:[],//设备
            equipmentValue:'',//设备名
            groupName:[],//组名
            groupNameValue:'',//组名
            dataType:[],//数据类型
            dataTypeValue:'',//数据类型名
            keyword:'',//关键字
            PageSize:50,//当前数量
            PageIndex:1,//当前页数
            TotalCount:'',//总数
            TotalPage:'',//总页数
            tableDataList:[],//查询数据
            addCurveArr:[],//添加曲线数组
            multipleSelection:[],//添加曲线数组
            curvePt:'',//添加曲线属性
            curveFo:'2',//添加曲线属性
            curveMax:'100',//添加曲线属性
            curveNin:'0',//添加曲线属性
            Stroke:'',//添加曲线属性
            curveDeleteIndex:[],//删除下标
            referenDescript:'',
            referenName:'',
            referenNum:'',
            pickerColor:'',
            addCurveArrNameText:'',
            addCurveArrHint:'请输入曲线组名',
            curveArrText:'请输入曲线组名',
            NameArr:[],
            NameArrIndex:[],
            describeArrIndex:[],
            describeArr:[],
            
            //颜色
            colorArr:'',
            color: '#ff4500',
            defaultColor:[
                '#FFC0CB',
                '#FF0000',
                '#0000FF',
                '#FFA500',
                '#FFFF00',
                '#008000',
                '#800080',
                
            ],
            predefineColors: [
              '#000000',
                '#434343','#666666','#cccccc','#d9d9d9','#ffffff','#980000','#ff0000', '#ff9900',
                '#ffff00','#00ff00','#00ffff','#4a86e8',
                '#0000ff',
                '#9900ff',
                '#ff00ff',
                '#e6b8af',
                '#f4cccc',
                '#fce5cd',
                '#fff2cc',
                '#d9ead3',
                '#d0e0e3',
                '#c9daf8',
                '#cfe2f3',
                '#d9d2e9',
                '#ead1dc',
                '#dd7e6b',
                '#ea9999',
                '#f9cb9c',
                '#ffe599',
                '#b6d7a8',
                '#a2c4c9',
                '#a4c2f4',
                '#9fc5e8',
                '#b4a7d6',
                '#d5a6bd',
                '#cc4125',
                '#e06666',
                '#f6b26b',
                '#ffd966',
                '#93c47d',
                '#76a5af',
                '#6d9eeb',
                '#6fa8dc',
                '#8e7cc3',
                '#c27ba0',
                '#6aa84f',
                '#45818e',
                '#3c78d8',
                '#3d85c6',
                '#674ea7',
                '#a64d79',
                '#5b0f00',
                '#660000',
                '#783f04',
                '#7f6000',
                '#274e13',
                '#0c343d',
                '#1c4587',
                '#073763',
                '#20124d',
                '#4c1130'
              ],
              zoom1:1,
              tips: '',
            lang: JSON.parse(localStorage.getItem('languages'))[localStorage.getItem('currentLang')]
            }
    },
     created(){
       this.init()
       this.getLangData()
       this.tips = this.lang.DataGrid_Reaction_HT_PEThePageNumber
     },
    mounted(){
        this.zoom11 = window.screen.width / 1920 < 0.8 ? 0.8 : window.screen.width / 1920
        this.zoom1 = 1
      
    },
       directives: {
            drag: function(el) {
                 console.log('el',$(el).parents('.tenPop_box'))
                 
                let dragBox =el      //获取当前元素
                dragBox.onmousedown = e => {
                    if($(e.path[0]).attr('class')!=='tenPop_title'&&$(e.path[0]).attr('class')!=='tenPop_fool'){
                        return
                    }
                    // if($(e))
                    console.log()
                    //算出鼠标相对元素的位置
                    let disX = e.clientX;
                    let disY = e.clientY - $(el).parents('.tenPop_box')[0].offsetTop;
                    document.onmousemove = e => {
                        //用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
                        let left = e.clientX - disX ;
                        let top = e.clientY - disY;
                        //移动当前元素
                        $(el).parents('.tenPop_box')[0].style.left = left + "px";
                        $(el).parents('.tenPop_box')[0].style.top = top + "px";
                    };
                    document.onmouseup = e => {
                          document.onmousemove = null;
                        document.onmouseup = null;
                    };
                };
            }
        },
    methods:{
                                      sx(){
                                        
            let that = this
            setTimeout(()=>{
for(let i=0;i<$('.el-picker-panel').length;i++){
                $('.el-picker-panel')[i].style.zoom1 = that.zoom11
            }
            for(let i=0;i<$('.el-select-dropdown').length;i++){
                $('.el-select-dropdown')[i].style.zoom1 = that.zoom11
            }
            })
              
        },
        getLangData() {
            this.addText = this.lang.NewTrendChart_SeriesGroupsSetting_AddToGroup
            this.addCurveArrHint = this.lang.NewTrendChart_AddToSeriesGroupViewModel_InputGroupName
            this.curveArrText = this.lang.NewTrendChart_AddToSeriesGroupViewModel_Input
        },
        init(){
            //判断
             if(this.type == 't'){
             this.TitleText = this.lang.NewTrendChart_SingleChartUC_ChooseSeries
             this.addQuer = this.lang.NewTrendChart_SeriesGroupsSettingViewModel_Temporary
             this.addShow = true
         }else{
             this.TitleText = this.lang.NewTrendChart_SeriesGroupsSettingViewModel_ModifyGroup
              this.addQuer = this.lang.NewTrendChart_SeriesGroupsSettingViewModel_Save
               this.addShow = false
         }
         this.screenAxios()
        //修改
         if(this.type == 'x'){
             console.log('sss',this.data)
             this.$axios({
                 method:'post',
                 url:"/api/NewTrendChart/QuerySeries?gid=" + this.data,
                 gid:this.data
             }).then((res)=>{
                 var resdata = res.data.data
                 for(var i=0;i<resdata.length;i++){
                    var value = {
                        NameB:resdata[i].Name,
                        NameA:'',
                        NameC:'',
                        curveMax:resdata[i].MaxValue,
                        curveNin:resdata[i].MinValue,
                        Descript:resdata[i].Description,
                        TagName:resdata[i].TagName == null ? this.lang.NewTrendChart_Group_Nothing : resdata[i].TagName,
                        Name:resdata[i].Name,
                        curveFo:resdata[i].Digit == -1 ? '' : resdata[i].Digit,
                        Address:resdata[i].TagName == '' ? this.lang.NewTrendChart_Group_Nothing :resdata[i].TagName,
                        value:resdata[i].Type,
                        type:resdata[i].Type == 3 ? [{
                                value: 3,
                                label: this.lang.NewTrendChart_CommonClass_Consult
                                }] :  [{
                                value: 1,
                                label: this.lang.NewTrendChart_CommonClass_Line
                                }, {
                                value: 2,
                                label: this.lang.NewTrendChart_CommonClass_Column
                                }] ,
                        curvePt:resdata[i].Unit == null ? '' : resdata[i].Unit,
                       
                        Stroke: resdata[i].Stroke
                    }
                    this.addCurveArr.push(value)
                 }
             })
         }

        },
        //关闭
        off(){
            this.$parent.off()
        },
        //全选
        handleSelectionChange(val) {
            for(var i=0;i<val.length;i++){
                if(val[i].DateType == this.lang['F32位浮点数IEEE754'] || val[i].DateType == this.lang['F64位浮点数IEEE754']){
                      this.curveFo = 2
                }else{
                    this.curveFo = ''
                }
                this.curveFo = val[i].Digit
                val[i].curvePt = this.curvePt
                val[i].curveFo = this.curveFo
                val[i].curveMax = this.curveMax
                val[i].curveNin = this.curveNin
                val[i].Stroke = this.color
                val[i].TagName = val[i].Name
                val[i].type =  [{
                    value: 1,
                    label: this.lang.NewTrendChart_CommonClass_Line
                    }, {
                    value: 2,
                    label: this.lang.NewTrendChart_CommonClass_Column
                    }]
                val[i].value= 1
            }
            var aa = JSON.stringify(val)
            var bb = JSON.parse(aa)
            this.multipleSelection = bb;
       
      },

      //修改保存
      btnFunction(){
        var left = this
        var $this = this
        if(this.type == 'x'){   //修改
            this.addCurveArrNameText = this.Name
            this.curveArrText = this.lang.NewTrendChart_AddToSeriesGroupViewModel_Modify
            this.Name = this.addCurveArrNameText
            let daiti = JSON.parse(JSON.stringify(this.addCurveArr))
            daiti.forEach(item => {
                item.type = item.value
                item.digit =  item.curveFo
                item.MaxValue = item.curveMax
                item.MinValue = item.curveNin
                item.Description = item.Descript
            })
            
            this.$axios({
                 method:'post',
                 url:`api/NewTrendChart/CheckSeriesArg`,
                 data: daiti
             }).then((res)=>{
                if (res.data.code !== 0) {
                    
                     $this.addCurveArrHint = res.data.msg
                     $this.addCurveArrNameShow = true
                     return
                 }
                this.addCurveArrName = true
             })
            // var nameArr1 = []
            //  for(var r=0;r<this.addCurveArr.length;r++){
            //    for(var a=0;a<this.addCurveArr.length;a++){
            //          if(this.addCurveArr[r].Name == this.addCurveArr[a].Name && r != a){
            //               this.addCurveArrNameShow = true
            //               let msg = this.lang.NewTrendChart_SeriesGroupsSettingViewModel_LineNameRepeat
            //                     let firstL = msg.indexOf('{')
            //                     let firstR = msg.indexOf('}') + 1
            //                     let str1 = msg.slice(firstL, firstR)
            //                     msg = msg.replace(str1, `<${Number(r)+1}>`)
            //                     this.addCurveArrHint= msg
            //                 //   this.addCurveArrHint='请'+(Number(r)+1) + '行曲线名已存在，曲线名不能重复'
            //                   return
            //          }
            //      }
            //      //行最大值
            //           if(this.addCurveArr[r].curveMax.toString().length > 0){
            //               console.log('zuidd',this.addCurveArr[r].curveMax)
            //               if(Number(this.addCurveArr[r].curveMax) == null){
            //                     this.addCurveArrNameShow = true

            //                     let msg = this.lang.NewTrendChart_SeriesGroupsSettingViewModel_InputMaxCorrectly
            //                     let firstL = msg.indexOf('{')
            //                     let firstR = msg.indexOf('}') + 1
            //                     let str1 = msg.slice(firstL, firstR)
            //                     msg = msg.replace(str1, `<${Number(r)+1}>`)
            //                 //    this.addCurveArrHint='请正确输入第'+(Number(r)+1) + '行最大值'
            //                     this.addCurveArrHint= msg
            //                    return
            //               }
            //           }else{
            //                 this.addCurveArrNameShow = true
            //                 let msg = this.lang.NewTrendChart_SeriesGroupsSettingViewModel_InputMaxCorrectly
            //                 let firstL = msg.indexOf('{')
            //                 let firstR = msg.indexOf('}') + 1
            //                 let str1 = msg.slice(firstL, firstR)
            //                 msg = msg.replace(str1, `<${Number(r)+1}>`)
            //                  this.addCurveArrHint= msg
            //                 // this.addCurveArrHint='请正确输入第'+(Number(r)+1) + '行最大值'
            //                 return
            //           }
                
            //     //行最小值
            //      if(this.addCurveArr[r].curveNin.toString().length > 0){
            //          if(Number(this.addCurveArr[r].curveNin) == null){
            //                this.addCurveArrNameShow = true

            //                 let msg = this.lang.NewTrendChart_SeriesGroupsSettingViewModel_InputMinCorrectly
            //                 let firstL = msg.indexOf('{')
            //                 let firstR = msg.indexOf('}') + 1
            //                 let str1 = msg.slice(firstL, firstR)
            //                 msg = msg.replace(str1, `<${Number(r)+1}>`)
            //                  this.addCurveArrHint= msg
            //             //   this.addCurveArrHint='请正确输入第'+(Number(r)+1) + '行最小值'
            //               return
            //          }
            //      }else{
            //             this.addCurveArrNameShow = true
            //             let msg = this.lang.NewTrendChart_SeriesGroupsSettingViewModel_InputMinCorrectly
            //             let firstL = msg.indexOf('{')
            //             let firstR = msg.indexOf('}') + 1
            //             let str1 = msg.slice(firstL, firstR)
            //             msg = msg.replace(str1, `<${Number(r)+1}>`)
            //                 this.addCurveArrHint= msg
            //             // this.addCurveArrHint='请正确输入第'+(Number(r)+1) + '行最小值'
            //             return
            //      }

            //     if(isNaN(Number(this.addCurveArr[r].curveMax))){
            //         this.addCurveArrNameShow = true
            //         let msg = this.lang.NewTrendChart_SeriesGroupsSettingViewModel_InputMaxCorrectly
            //         let firstL = msg.indexOf('{')
            //         let firstR = msg.indexOf('}') + 1
            //         let str1 = msg.slice(firstL, firstR)
            //         msg = msg.replace(str1, `<${Number(r)+1}>`)
            //         this.addCurveArrHint= msg
            //         //  this.addCurveArrHint='请正确输入第'+(Number(r)+1) + '行最大值'
            //          return
            //     } 
            //      if(isNaN(Number(this.addCurveArr[r].curveNin))){
            //         this.addCurveArrNameShow = true
            //         let msg = this.lang.NewTrendChart_SeriesGroupsSettingViewModel_InputMinCorrectly
            //         let firstL = msg.indexOf('{')
            //         let firstR = msg.indexOf('}') + 1
            //         let str1 = msg.slice(firstL, firstR)
            //         msg = msg.replace(str1, `<${Number(r)+1}>`)
            //         this.addCurveArrHint= msg
            //         //  this.addCurveArrHint='请正确输入第'+(Number(r)+1) + '行最小值'
            //          return
            //     } 
            //       if(this.addCurveArr[r].type[0].label != this.lang.NewTrendChart_CommonClass_Consult){
            //           if(Number(this.addCurveArr[r].curveMax) < Number(this.addCurveArr[r].curveNin)){
            //             this.addCurveArrNameShow = true
            //             let msg = this.lang.NewTrendChart_SeriesGroupsSettingViewModel_MaxBigMin
            //             let firstL = msg.indexOf('{')
            //             let firstR = msg.indexOf('}') + 1
            //             let str1 = msg.slice(firstL, firstR)
            //             msg = msg.replace(str1, `<${Number(r)+1}>`)
            //             this.addCurveArrHint= msg
            //             //   this.addCurveArrHint='第'+(Number(r)+1) + '行最大值必须大于最小值'
            //               return
            //           }
            //       }else{
            //            if(Number(this.addCurveArr[r].curveMax) != Number(this.addCurveArr[r].curveNin)){
            //                 this.addCurveArrNameShow = true
            //                 let msg = this.lang.NewTrendChart_SeriesGroupsSettingViewModel_MaxEqualMin
            //                 let firstL = msg.indexOf('{')
            //                 let firstR = msg.indexOf('}') + 1
            //                 let str1 = msg.slice(firstL, firstR)
            //                 msg = msg.replace(str1, `<${Number(r)+1}>`)
            //                 this.addCurveArrHint= msg
            //             //   this.addCurveArrHint='第'+(Number(r)+1) + '行参考线的最大值和最小值必须相等'
            //               return
            //           }
            //       }
            //  }

        }else{
             let daiti = JSON.parse(JSON.stringify(this.addCurveArr))
            daiti.forEach(item => {
                item.type = item.value
                item.digit = item.curveFo
                item.MaxValue = item.curveMax
                item.MinValue = item.curveNin
                item.Description = item.Descript
            })
            this.$axios({
                 method:'post',
                 url:`api/NewTrendChart/CheckSeriesArg`,
                 data:daiti
             }).then((res)=>{
                 if (res.data.code !== 0) {
                     $this.addCurveArrHint = res.data.msg
                     $this.addCurveArrNameShow = true
                     return
                 } else {
                    let dataArr = []
                    let dataArr1 = []
                    for(var j=0;j<$this.addCurveArr.length;j++){
                        var value1={
                            Descript:$this.addCurveArr[j].Descript,
                            Description:$this.addCurveArr[j].Descript,
                            Stroke:$this.addCurveArr[j].Stroke,
                            Unit:$this.addCurveArr[j].curvePt,
                            Name:$this.addCurveArr[j].Name
                        }

                        var value = {
                            SID:$this.guid(),
                            Number:j+1,
                            Description:$this.addCurveArr[j].Descript,
                            TagName:$this.addCurveArr[j].Name,
                            Digit:$this.addCurveArr[j].curveFo == ''? 0 : $this.addCurveArr[j].curveFo,
                            DisplayName: $this.addCurveArr[j].Name,
                            MaxValue:$this.addCurveArr[j].curveMax,
                            MinValue:$this.addCurveArr[j].curveNin,
                            Type:$this.addCurveArr[j].value,
                            Name:$this.addCurveArr[j].Name
                        }
                        dataArr.push(value)
                        dataArr1.push(value1)
                    }


                    for(var d=0;d<this.NameArr.length;d++){
                        var ine = this.NameArrIndex[d]
                        dataArr[ine].Name = this.NameArr[d]
                    }
                    // describeArrIndex
                    for(var d1=0;d1<this.describeArr.length;d1++){
                        var ine2 = this.describeArrIndex[d1]
                        dataArr[ine2].Description = this.describeArr[d1]
                    }
                    for(var d2=0;d2<this.NameArr.length;d2++){
                        var ine3 = this.NameArrIndex[d2]
                        dataArr1[ine3].Name = this.NameArr[d2]
                    }
                    // describeArrIndex
                    for(var d3=0;d3<this.describeArr.length;d3++){
                        var ine4 = this.describeArrIndex[d3]
                        dataArr1[ine4].Description = this.describeArr[d3]
                    }

                var self = this
                    setTimeout(function(){
                        self.$parent.curveName(0,0,dataArr,1,dataArr1,1)
                        self.$parent.off()
                    },2)
                 }
             })
            // if(this.addCurveArr.length){
            //      var nameArr = []
            //      for(var i=0;i<this.addCurveArr.length;i++){
            //         for(var a1=0;a1<this.addCurveArr.length;a1++){
            //          if(this.addCurveArr[i].Name == this.addCurveArr[a1].Name && i != a1){
            //               this.addCurveArrNameShow = true
            //                 let msg = this.lang.NewTrendChart_SeriesGroupsSettingViewModel_LineNameRepeat
            //                 let firstL = msg.indexOf('{')
            //                 let firstR = msg.indexOf('}') + 1
            //                 let str1 = msg.slice(firstL, firstR)
            //                 msg = msg.replace(str1, `<${Number(i)+1}>`)
            //                 this.addCurveArrHint= msg
            //                 //   this.addCurveArrHint='请'+(Number(i)+1) + '行曲线名已存在，曲线名不能重复'
            //                   return
            //          }
            //      } 
            //         //行最大值
            //           if(this.addCurveArr[i].curveMax.toString().length > 0){
            //               if(Number(this.addCurveArr[i].curveMax) == null){
            //                    this.addCurveArrNameShow = true
            //                    let msg = this.lang.NewTrendChart_SeriesGroupsSettingViewModel_InputMaxCorrectly
            //                     let firstL = msg.indexOf('{')
            //                     let firstR = msg.indexOf('}') + 1
            //                     let str1 = msg.slice(firstL, firstR)
            //                     msg = msg.replace(str1, `<${Number(i)+1}>`)
            //                     this.addCurveArrHint = msg
            //                 //   this.addCurveArrHint='请正确输入第'+(Number(i)+1) + '行最大值'
            //                   return
            //              }
            //           }else{
            //                this.addCurveArrNameShow = true
            //                let msg = this.lang.NewTrendChart_SeriesGroupsSettingViewModel_InputMaxCorrectly
            //                     let firstL = msg.indexOf('{')
            //                     let firstR = msg.indexOf('}') + 1
            //                     let str1 = msg.slice(firstL, firstR)
            //                     msg = msg.replace(str1, `<${Number(i)+1}>`)
            //                     this.addCurveArrHint = msg
            //                 //   this.addCurveArrHint='请正确输入第'+(Number(i)+1) + '行最大值'
            //                   return
            //           }
                
            //     //行最小值
            //       if(this.addCurveArr[i].curveNin.toString().length > 0){
            //           if(Number(this.addCurveArr[i].curveNin) == null){
            //                this.addCurveArrNameShow = true
            //                let msg = this.lang.NewTrendChart_SeriesGroupsSettingViewModel_InputMinCorrectly
            //                 let firstL = msg.indexOf('{')
            //                 let firstR = msg.indexOf('}') + 1
            //                 let str1 = msg.slice(firstL, firstR)
            //                 msg = msg.replace(str1, `<${Number(i)+1}>`)
            //                     this.addCurveArrHint= msg
            //             //    this.addCurveArrHint='请正确输入第'+(Number(i)+1) + '行最小值'
            //                return
            //           }
            //       }else{
            //             this.addCurveArrNameShow = true
            //             let msg = this.lang.NewTrendChart_SeriesGroupsSettingViewModel_InputMinCorrectly
            //                 let firstL = msg.indexOf('{')
            //                 let firstR = msg.indexOf('}') + 1
            //                 let str1 = msg.slice(firstL, firstR)
            //                 msg = msg.replace(str1, `<${Number(i)+1}>`)
            //                     this.addCurveArrHint= msg
            //             // this.addCurveArrHint='请正确输入第'+(Number(i)+1) + '行最小值'
            //             return
            //       }

            //     if(isNaN(Number(this.addCurveArr[i].curveMax))){
            //         this.addCurveArrNameShow = true
            //         let msg = this.lang.NewTrendChart_SeriesGroupsSettingViewModel_InputMaxCorrectly
            //                     let firstL = msg.indexOf('{')
            //                     let firstR = msg.indexOf('}') + 1
            //                     let str1 = msg.slice(firstL, firstR)
            //                     msg = msg.replace(str1, `<${Number(i)+1}>`)
            //                     this.addCurveArrHint = msg
            //         //  this.addCurveArrHint='请正确输入第'+(Number(i)+1) + '行最大值'
            //          return
            //     } 
            //      if(isNaN(Number(this.addCurveArr[i].curveNin))){
            //          console.log('ee2')
            //         this.addCurveArrNameShow = true
            //         let msg = this.lang.NewTrendChart_SeriesGroupsSettingViewModel_InputMinCorrectly
            //         let firstL = msg.indexOf('{')
            //         let firstR = msg.indexOf('}') + 1
            //         let str1 = msg.slice(firstL, firstR)
            //         msg = msg.replace(str1, `<${Number(i)+1}>`)
            //             this.addCurveArrHint= msg
            //         //  this.addCurveArrHint='请正确输入第'+(Number(i)+1) + '行最小值'
            //          return
            //     } 
                     
            //      if(this.addCurveArr[i].type[0].label != this.lang.NewTrendChart_CommonClass_Consult){
            //          if(Number(this.addCurveArr[i].curveMax) < Number(this.addCurveArr[i].curveNin)){
            //              this.addCurveArrNameShow = true
            //              let msg = this.lang.NewTrendChart_SeriesGroupsSettingViewModel_MaxBigMin
            //             let firstL = msg.indexOf('{')
            //             let firstR = msg.indexOf('}') + 1
            //             let str1 = msg.slice(firstL, firstR)
            //             msg = msg.replace(str1, `<${Number(i)+1}>`)
            //                 this.addCurveArrHint= msg
            //             //  this.addCurveArrHint='第'+(Number(i)+1) + '行最大值必须大于最小值'
            //              return
            //          }
            //      }else{
            //           if(Number(this.addCurveArr[i].curveMax) != Number(this.addCurveArr[i].curveNin)){
            //              this.addCurveArrNameShow = true
            //              let msg = this.lang.NewTrendChart_SeriesGroupsSettingViewModel_MaxEqualMin
            //             let firstL = msg.indexOf('{')
            //             let firstR = msg.indexOf('}') + 1
            //             let str1 = msg.slice(firstL, firstR)
            //             msg = msg.replace(str1, `<${Number(i)+1}>`)
            //                 this.addCurveArrHint= msg
            //             //  this.addCurveArrHint='第'+(Number(i)+1) + '行参考线的最大值和最小值必须相等'
            //              return
            //          }
            //      }
            //     }
            //     let dataArr = []
            //     let dataArr1 = []
            //     for(var j=0;j<this.addCurveArr.length;j++){
            //         var value1={
            //             Descript:this.addCurveArr[j].Descript,
            //             Description:this.addCurveArr[j].Descript,
            //             Stroke:this.addCurveArr[j].Stroke,
            //             Unit:this.addCurveArr[j].curvePt,
            //             Name:this.addCurveArr[j].Name
            //         }

            //         var value = {
            //             SID:this.guid(),
            //             Number:j+1,
            //             Description:this.addCurveArr[j].Descript,
            //             TagName:this.addCurveArr[j].Name,
            //             Digit:this.addCurveArr[j].curveFo == ''? 0 : this.addCurveArr[j].curveFo,
            //             MaxValue:this.addCurveArr[j].curveMax,
            //             MinValue:this.addCurveArr[j].curveNin,
            //             Type:this.addCurveArr[j].value,
            //             Name:this.addCurveArr[j].Name
            //         }

            //         dataArr.push(value)
            //         dataArr1.push(value1)
            //     }


            //      for(var d=0;d<this.NameArr.length;d++){
            //         var ine = this.NameArrIndex[d]
            //         dataArr[ine].Name = this.NameArr[d]
            //     }
            //     // describeArrIndex
            //      for(var d1=0;d1<this.describeArr.length;d1++){
            //         var ine2 = this.describeArrIndex[d1]
            //         dataArr[ine2].Description = this.describeArr[d1]
            //     }
            //        for(var d2=0;d2<this.NameArr.length;d2++){
            //         var ine3 = this.NameArrIndex[d2]
            //         dataArr1[ine3].Name = this.NameArr[d2]
            //     }
            //     // describeArrIndex
            //      for(var d3=0;d3<this.describeArr.length;d3++){
            //         var ine4 = this.describeArrIndex[d3]
            //         dataArr1[ine4].Description = this.describeArr[d3]
            //     }
            //    console.log('查询',dataArr,dataArr1,this.describeArr.length,this.NameArr.length)

            //    var self = this
            //     setTimeout(function(){
            //         self.$parent.curveName(0,0,dataArr,1,dataArr1,1)
            //         self.$parent.off()
            //     },2)
            // }else{
            //     this.addCurveArrNameShow = true
            //     this.addCurveArrHint= this.lang.NewTrendChart_SeriesGroupsSettingViewModel_AddLine
            // }

    
          
        }
      },
      //取消
      cancelFun(){
         this.$parent.off()
      },
      //获取筛选条件
      screenAxios(){
          this.$axios({
              method:"post",
              url:"/api/NewTrendChart/GstFilterCondition"
              }).then((res)=>{
                  //初始化
                  this.equipment = res.data.data
                  this.groupName = res.data.data[0].Groups
                  this.dataType = res.data.data[0].Groups[0].DataTypes
                  this.equipmentValue = res.data.data[0].DeviceName
                  this.groupNameValue = res.data.data[0].Groups[0].GroupName
                  this.dataTypeValue = res.data.data[0].Groups[0].DataTypes[0].Value
                  this.screenDate = res.data.data
                 //请求查询数据
                   this.inquireAxios()

            }).catch(function (error) {
                    // console.log(error);
                })
      },
      
      //选择设备
      equipmentFun(){
          this.groupNameValue = this.lang.AlarmRecord_HT_Unlimited
          this.dataTypeValue = this.lang.AlarmRecord_HT_Unlimited
        for(var i=0;i<this.screenDate.length;i++){
            if(this.screenDate[i].DeviceName == this.equipmentValue){
                 this.groupName = this.screenDate[i].Groups
                 this.dataType =  this.groupName[0].DataTypes
                 //请求查询数据
                 this.PageIndex = 1
                 this.inquireAxios()
            }
        }
      },
      //选择组名
      groupNameFun(){
         for(var i=0;i<this.groupName.length;i++){
             if(this.groupName[i].GroupName == this.groupNameValue){
                this.dataType = this.groupName[i].DataTypes
             }
         }
        this.dataTypeValue = this.lang.AlarmRecord_HT_Unlimited
        this.inquireAxios()
      },
      //
      dataTypeFun(){
        this.dataTypeValue = this.dataTypeValue
        this.inquireAxios()
      },
      //查询变量组
      inquireAxios(){
            this.$axios({
              method:"post",
              url:"/api/NewTrendChart/GstVariableList?argDevice=" + this.equipmentValue.replace(/#/, "%23") + "&argGroup=" + this.groupNameValue + "&argDataType="+ this.dataTypeValue + "&argKeyWord="+ this.keyword + "&argPageSize="+ this.PageSize +"&argPageIndex="+ this.PageIndex +"",
              argDevice:this.equipmentValue.replace(/#/, "%23"),
              argGroup:this.groupNameValue,
              argDataType:this.dataTypeValue,
              argKeyWord:this.keyword,
              argPageSize:this.PageSize,
              argPageIndex:this.PageIndex,
              }).then((res)=>{

                if(res.data.data.ParameterList.TotalPage == 1){
                    this.$refs.next.style.color = '#F9D79C'
                    this.$refs.next.style.borderColor = '#F8CA7A'
                    this.$refs.next.style.background = '#F9F9F9'
                    this.$refs.last.style.color = '#F9D79C'
                    this.$refs.last.style.borderColor = '#F8CA7A'
                    this.$refs.last.style.background = '#F9F9F9'
                }
                var aa = []
                var dataArr = res.data.data.DataList.concat(aa)
                dataArr = dataArr.map(item => ({
                    ...item,
                    DisplayName: item.Name
                }))
                this.tableDataList = dataArr
                console.log('this.==>',this.tableDataList)
                this.PageSize = res.data.data.ParameterList.PageSize
                this.PageIndex = res.data.data.ParameterList.PageIndex
                this.TotalCount = res.data.data.ParameterList.TotalCount
                this.TotalPage = res.data.data.ParameterList.TotalPage
            }).catch(function (error) {
                    // console.log(error);
                })

      },
      //点击查询 jump end next last firest
      inquire(){
            this.PageIndex = 1
           //请求查询数据
            this.inquireAxios()
      },
      isPositiveInteger(s) {
            //是否为正整数
            var re = /^[0-9]+$/;
            return re.test(s);
        },
      //跳转
        jump(){
            if(this.PageIndex != this.num){
                if (!this.isPositiveInteger(this.num)) { 
                        this.tips = this.lang.DataGrid_Reaction_HT_PEAPositiveInteger
                        this.NumShow = true
                        return
                    }
                if(this.num>this.TotalPage || this.num < 1){ 
                    this.tips = this.lang.DataGrid_Reaction_HT_PEThePageNumber
                    this.NumShow = true
                }else{
                    this.PageIndex = this.num
                    this.inquireAxios()
                }
            }

        },
        // 末页
        end(){
        this.PageIndex = this.TotalPage
        this.num = this.PageIndex
        this.$refs.next.style.color = '#F9D79C'
        this.$refs.next.style.borderColor = '#F8CA7A'
        this.$refs.next.style.background = '#F9F9F9'
        this.$refs.last.style.color = '#FDA100'
        this.$refs.last.style.borderColor = '#FDA100'
        this.$refs.last.style.background = '#fff'
        //请求查询数据
        this.inquireAxios()
        },
        //下一页FDA100
        next(){
          if(this.PageIndex<this.TotalPage){
              this.$refs.last.style.color = '#FDA100'
              this.$refs.last.style.borderColor = '#FDA100'
              this.$refs.last.style.background = '#fff'
              this.$refs.next.style.color = '#FDA100'
              this.$refs.next.style.borderColor = '#FDA100'
              this.$refs.next.style.background = '#fff'
              this.PageIndex = this.PageIndex + 1
              this.num = this.PageIndex
              //请求查询数据
              this.inquireAxios()
          }else{
            this.$refs.next.style.color = '#F9D79C'
            this.$refs.next.style.borderColor = '#F8CA7A'
            this.$refs.next.style.background = '#F9F9F9'
          }
        },
        // 上一页
        last(){
        if(this.PageIndex>1){
             this.$refs.last.style.color = '#FDA100'
              this.$refs.last.style.borderColor = '#FDA100'
              this.$refs.last.style.background = '#fff'
              this.$refs.next.style.color = '#FDA100'
              this.$refs.next.style.borderColor = '#FDA100'
              this.$refs.next.style.background = '#fff'
            this.PageIndex = this.PageIndex - 1
            this.num = this.PageIndex
            //请求查询数据
            this.inquireAxios()
        }else{
            this.$refs.last.style.color = '#F9D79C'
            this.$refs.last.style.borderColor = '#F8CA7A'
            this.$refs.last.style.background = '#F9F9F9'
        } 
        },
        //首页 
        firest(){
            this.PageIndex = 1
            this.num = this.PageIndex
            this.$refs.last.style.color = '#F9D79C'
            this.$refs.last.style.borderColor = '#F8CA7A'
            this.$refs.last.style.background = '#F9F9F9'
            this.$refs.next.style.color = '#FDA100'
            this.$refs.next.style.borderColor = '#FDA100'
            this.$refs.next.style.background = '#fff'
            //请求查询数据
            this.inquireAxios()
        },
        //跳转弹窗确认
        confirmation(){
            var left = this
           
            this.NumShow = false
        },
        //添加曲线
        addCurve(){
            
           var addCarr = this.addCurveArr
           console.log('this.addCurveArr',this.addCurveArr,this.multipleSelection)
           var addCArr = []
         if(this.addCurveArr.length){
             //TagName  Name
            //不重复添加
            //  for(let i=0;i<this.multipleSelection.length;i++){
            //         for(var o=0;o<this.addCurveArr.length;o++){
            //             if(this.addCurveArr[o].TagName ==  this.multipleSelection[i].TagName){
            //                 continue
            //             }else{
            //                 if(o == this.addCurveArr.length - 1)
            //                 addCArr.push(this.multipleSelection[i])
            //             }
            //         }
            //  }
            var NameArr = []
             for(let i=0;i<this.addCurveArr.length;i++){
                NameArr.push(this.addCurveArr[i].Name)
            }
            for(let o=0;o<this.multipleSelection.length;o++){
                var index = NameArr.indexOf(this.multipleSelection[o].TagName)
                if(index == -1){
                    NameArr.push(this.multipleSelection[o].TagName)
                     var ide12 = Number((addCArr.length+1+this.addCurveArr.length)) % 7
                    this.multipleSelection[o].Stroke = this.defaultColor[ide12]
                    addCArr.push(this.multipleSelection[o])
                }
            }

             this.addCurveArr = this.addCurveArr.concat(addCArr)
             //默认色
              for(var j=0;j<this.addCurveArr.length;j++){

                  var ide1 = Number((j+1)) % 7
                //   if(!this.addCurveArr[j].changecolor){
                //     this.addCurveArr[j].Stroke = this.defaultColor[ide1]
                //   }
                   
                     this.addCurveArr[j].TagName = this.addCurveArr[j].TagName
                      this.addCurveArr[j].NameA = ''
                      this.addCurveArr[j].NameC = ''
                    
                 }
                  this.addCurveArr =  this.addCurveArr

         }else{
            
             this.addCurveArr = this.multipleSelection
                console.log('ss',this.addCurveArr)
             //默认色
              for(var d=0;d<this.addCurveArr.length;d++){
                    var ide =Number((d+1)) % 7
                     this.addCurveArr[d].Stroke = this.defaultColor[ide]
                     this.addCurveArr[d].TagName = this.addCurveArr[d].TagName
                
                     this.addCurveArr[d].NameA = ''
                     this.addCurveArr[d].NameC = ''
                 }
                  this.addCurveArr =  this.addCurveArr.concat()
         }
         console.log('添加数值',this.addCurveArr)
           this.$refs.multipleTable.clearSelection();
        },
        //移除曲线
        deleteCurve(){
            if(this.checkedAll){
                this.addCurveArr= []
                this.checkedAll = false
                
            }else{

                var chebox = document.querySelectorAll('.checkbox')
                 let firest = false
                for(var j=0;j<this.curveDeleteIndex.length;j++){
                    let deleteIndex
                    if(firest && deleteIndex != 0){
                        deleteIndex = this.curveDeleteIndex[j] - 1
                    }else{
                        deleteIndex = this.curveDeleteIndex[j]
                    }
                    this.addCurveArr.splice(deleteIndex,1)
                    firest = true
                     
                }
                 //全选
               for(var i=0;i<chebox.length;i++){
                   chebox[i].checked = false
               }
               this.curveDeleteIndex = []
            }
        },
        //颜色选择器
        colorFun(item,index){
            
             let addCurveArrList = this.addCurveArr
             var colorHex = this.colorRGBtoHex(item.Stroke)
            this.addCurveArr[index].Stroke = colorHex
            this.addCurveArr[index].changecolor = true
            this.addCurveArr = []
            this.addCurveArr = addCurveArrList
           
        },

        //图表类型
        selectValue(item,index){
            if(item.value != 3){
                let addCurveType = this.addCurveArr
                this.addCurveArr[index].value = item.value
                this.addCurveArr = []
                this.addCurveArr = addCurveType
            }
            
       
        },
       
       //单选
       checkboxDe(item,index){
           var chebox = document.querySelectorAll('.checkbox')
           if(chebox[index].checked){
                 this.curveDeleteIndex.push(index)
           }else{
               var ind = this.curveDeleteIndex.indexOf(index)
                this.curveDeleteIndex.splice(ind,1)
           }
        
          //全选
           for(var i=0;i<chebox.length;i++){
              if(chebox[i].checked){
                this.checkedAll = true
              }else{
                   this.checkedAll = false
                   break
              }
           }
       },
       //全选
       CheckAllChange1(){
            var chebox = document.querySelectorAll('.checkbox')
               for(var i=0;i<chebox.length;i++){
               chebox[i].checked = this.checkedAll
           }
       },
       //添加参考线
       addReferenceLine(){
            this.referenNum = ''
            this.referenDescript = ''
            this.referenName = ''
           
          this.referenceShow = true
       },
       //关闭弹窗
       referenOff(){
            this.referenceShow = false
       },

       //参考线弹窗确定
       btnQue(){
           if(this.referenName == ''){
               this.referenText = this.lang.NewTrendChart_AddConsultLineViewModel_InputName
             this.referenceConfirShow = true
             return
           }else if(this.referenNum == ''){
             this.referenText= this.lang.NewTrendChart_AddConsultLineViewModel_InputValue
             this.referenceConfirShow = true
             return
           }else{
                 if(this.referenNum == null){
                this.referenText = this.lang.NewTrendChart_AddConsultLineViewModel_InputValueCorrectly
                this.referenceConfirShow = true
                 return
             }
              if(isNaN(this.referenNum)){
                this.referenText = this.lang.NewTrendChart_AddConsultLineViewModel_InputValueCorrectly
                this.referenceConfirShow = true
                 return
             }
           }

        //   var value = {
        //                 NameB:resdata[i].Name,
        //                 NameA:'',
        //                 NameC:'',
        //                 curveMax:resdata[i].MaxValue,
        //                 curveNin:resdata[i].MinValue,
        //                 Descript:resdata[i].Description,
        //                 TagName:resdata[i].TagName == null ? '无' : resdata[i].TagName,
        //                 Name:resdata[i].Name,
        //                 curveFo:resdata[i].Digit == -1 ? '' : resdata[i].Digit,
        //                 Address:resdata[i].TagName == '' ? '无' :resdata[i].TagName,
        //                 value:resdata[i].Type,
        //                 type:resdata[i].Type == 3 ? [{
        //                         value: 3,
        //                         label: '参考线'
        //                         }] :  [{
        //                         value: 1,
        //                         label: '折线图'
        //                         }, {
        //                         value: 2,
        //                         label: '柱状图'
        //                         }] ,
        //                 curvePt:resdata[i].Unit == null ? '' : resdata[i].Unit,
                       
        //                 Stroke: resdata[i].Stroke
        //             }
          
           var value = {
               NameB:this.referenName == ''? this.lang.NewTrendChart_Group_Nothing : this.referenName,
               TagName: this.lang.NewTrendChart_Group_Nothing,
               NameA:'',
               NameC:'',
               curveMax:this.referenNum,
               curveNin:this.referenNum,
               Descript:this.referenDescript,
               Name:this.referenName == ''? this.lang.NewTrendChart_Group_Nothing : this.referenName,
               Address:this.lang.NewTrendChart_Group_Nothing,
               value:3,
               type: [{
                    value: 3,
                    label: this.lang.NewTrendChart_CommonClass_Consult
                    }],
               curvePt:'',
               curveFo:'',
               Stroke: this.color
          }
           this.addCurveArr.push(value)
           this.referenceShow = false
           console.log(JSON.parse(JSON.stringify(this.addCurveArr)))
           console.log(JSON.parse(JSON.stringify(this.defaultColor)))
            for(var j=0;j<this.addCurveArr.length;j++){
                var ide1 = (j+1) % 7
            
                this.addCurveArr[this.addCurveArr.length-1].Stroke = this.defaultColor[ide1]
            
            }
            console.log(JSON.parse(JSON.stringify(this.addCurveArr)))
            this.addCurveArr =  this.addCurveArr

       },

       //参考线弹窗的弹窗确定
       referenConfir(){
         this.referenceConfirShow = false  
       },
       //添加曲线组
       addCurveArrFun(){
        var $this = this
        if(this.addCurveArr.length){
            let a = JSON.parse(JSON.stringify(this.addCurveArr))
            a.forEach(item => {
                item.type = item.value
                item.digit =  item.curveFo
                item.MaxValue = item.curveMax
                item.MinValue = item.curveNin
                item.Description = item.Descript
            })
            this.$axios({
                 method:'post',
                 url:`api/NewTrendChart/CheckSeriesArg`,
                 data:a
             }).then((res)=>{
                if (res.data.code !== 0) {
                     $this.addCurveArrHint = res.data.msg
                     $this.addCurveArrNameShow = true
                     return
                 }
                this.addCurveArrNameText = ''
                this.addCurveArrName = true
             })
            //    var left1 = this
 
            
            // console.log('添加曲线')
            // var nameArr = []

            
            // for(let i=0;i<this.addCurveArr.length;i++){
              
   
            //      for(var a=0;a<this.addCurveArr.length;a++){
            //          if(this.addCurveArr[i].Name == this.addCurveArr[a].Name && i != a){
            //               this.addCurveArrNameShow = true
            //               let msg = this.lang.NewTrendChart_SeriesGroupsSettingViewModel_LineNameRepeat
            //                 let firstL = msg.indexOf('{')
            //                 let firstR = msg.indexOf('}') + 1
            //                 let str1 = msg.slice(firstL, firstR)
            //                 msg = msg.replace(str1, `<${Number(i)+1}>`)
            //                     this.addCurveArrHint= msg
            //                 //   this.addCurveArrHint='请'+(Number(i)+1) + '行曲线名已存在，曲线名不能重复'
            //                   return
            //          }
            //      }
               
             

            //         //行最大值
            //           if(this.addCurveArr[i].curveMax.toString().length >0){
            //               if(Number(this.addCurveArr[i].curveMax) == null){
            //                    this.addCurveArrNameShow = true
            //                    let msg = this.lang.NewTrendChart_SeriesGroupsSettingViewModel_InputMaxCorrectly
            //                 let firstL = msg.indexOf('{')
            //                 let firstR = msg.indexOf('}') + 1
            //                 let str1 = msg.slice(firstL, firstR)
            //                 msg = msg.replace(str1, `<${Number(i)+1}>`)
            //                     this.addCurveArrHint= msg
            //                 //   this.addCurveArrHint='请正确输入第'+(Number(i)+1) + '行最大值'
            //                   return
            //              }
            //           }else{
            //                   this.addCurveArrNameShow = true
            //                   let msg = this.lang.NewTrendChart_SeriesGroupsSettingViewModel_InputMaxCorrectly
            //                 let firstL = msg.indexOf('{')
            //                 let firstR = msg.indexOf('}') + 1
            //                 let str1 = msg.slice(firstL, firstR)
            //                 msg = msg.replace(str1, `<${Number(i)+1}>`)
            //                     this.addCurveArrHint= msg
            //                 //   this.addCurveArrHint='请正确输入第'+(Number(i)+1) + '行最大值'
            //                   return
            //           }
                        
            //           //行最小值
            //         if(this.addCurveArr[i].curveNin.toString().length > 0){
            //             if(Number(this.addCurveArr[i].curveNin) == null){
            //                   this.addCurveArrNameShow = true
            //                   let msg = this.lang.NewTrendChart_SeriesGroupsSettingViewModel_InputMinCorrectly
            //                 let firstL = msg.indexOf('{')
            //                 let firstR = msg.indexOf('}') + 1
            //                 let str1 = msg.slice(firstL, firstR)
            //                 msg = msg.replace(str1, `<${Number(i)+1}>`)
            //                     this.addCurveArrHint= msg
            //                 //  this.addCurveArrHint='请正确输入第'+(Number(i)+1) + '行最小值'
            //                  return
            //             }
            //         }else{
            //              this.addCurveArrNameShow = true
            //              let msg = this.lang.NewTrendChart_SeriesGroupsSettingViewModel_InputMinCorrectly
            //                 let firstL = msg.indexOf('{')
            //                 let firstR = msg.indexOf('}') + 1
            //                 let str1 = msg.slice(firstL, firstR)
            //                 msg = msg.replace(str1, `<${Number(i)+1}>`)
            //                     this.addCurveArrHint= msg
            //             // this.addCurveArrHint='请正确输入第'+(Number(i)+1) + '行最小值'
            //             return
            //         }
    
            //         if(isNaN(Number(this.addCurveArr[i].curveMax))){
            //             this.addCurveArrNameShow = true
            //             let msg = this.lang.NewTrendChart_SeriesGroupsSettingViewModel_InputMaxCorrectly
            //                 let firstL = msg.indexOf('{')
            //                 let firstR = msg.indexOf('}') + 1
            //                 let str1 = msg.slice(firstL, firstR)
            //                 msg = msg.replace(str1, `<${Number(i)+1}>`)
            //                     this.addCurveArrHint= msg
            //             //  this.addCurveArrHint='请正确输入第'+(Number(i)+1) + '行最大值'
            //              return
            //         }
            //          if(isNaN(Number(this.addCurveArr[i].curveNin))){
            //             this.addCurveArrNameShow = true
            //             let msg = this.lang.NewTrendChart_SeriesGroupsSettingViewModel_InputMinCorrectly
            //                 let firstL = msg.indexOf('{')
            //                 let firstR = msg.indexOf('}') + 1
            //                 let str1 = msg.slice(firstL, firstR)
            //                 msg = msg.replace(str1, `<${Number(i)+1}>`)
            //                     this.addCurveArrHint= msg
            //             //  this.addCurveArrHint='请正确输入第'+(Number(i)+1) + '行最小值'
            //              return
            //         } 
                    

            //        if(this.addCurveArr[i].type[0].label != this.lang.NewTrendChart_CommonClass_Consult){
            //              if(Number(this.addCurveArr[i].curveMax) < Number(this.addCurveArr[i].curveNin)){
            //                  this.addCurveArrNameShow = true
            //                  let msg = this.lang.NewTrendChart_SeriesGroupsSettingViewModel_MaxBigMin
            //                 let firstL = msg.indexOf('{')
            //                 let firstR = msg.indexOf('}') + 1
            //                 let str1 = msg.slice(firstL, firstR)
            //                 msg = msg.replace(str1, `<${Number(i)+1}>`)
            //                     this.addCurveArrHint= msg
            //                 //  this.addCurveArrHint='第'+(Number(i)+1)+ '行最大值必须大于最小值'
            //                  return
            //              }
            //     }else{
            //         if(Number(this.addCurveArr[i].curveMax) != Number(this.addCurveArr[i].curveNin)){
            //                  this.addCurveArrNameShow = true
            //                  let msg = this.lang.NewTrendChart_SeriesGroupsSettingViewModel_MaxEqualMin
            //                 let firstL = msg.indexOf('{')
            //                 let firstR = msg.indexOf('}') + 1
            //                 let str1 = msg.slice(firstL, firstR)
            //                 msg = msg.replace(str1, `<${Number(i)+1}>`)
            //                     this.addCurveArrHint= msg
            //                 //  this.addCurveArrHint='第'+(Number(i)+1)+ '行参考线的最大值和最小值必须相等'
            //                  return
            //              }
            //     }

            //  }
            //    this.addCurveArrNameText = ''
            //    this.addCurveArrName = true
              
               
           
        }else{
              var left = this

            this.addCurveArrNameShow = true
            this.addCurveArrHint=this.lang.NewTrendChart_SeriesGroupsSettingViewModel_AddLine
        }

       },

            addName(){
                var left = this

            },
       //关闭添加曲线组
       curveArrNameOff(){
         this.addCurveArrName = false
          var left = this

       },
       //确认添加曲线按钮
       addCurveBtnQue(){
           if(this.type == 'x'){
                var left = this
              
               console.log('修改曲线组')

                let UpdateArr = []
            for(var i=0;i<this.addCurveArr.length;i++){
                var value = {
                   Number:i+1,
                   TagName:this.addCurveArr[i].TagName == this.lang.NewTrendChart_Group_Nothing ? null : this.addCurveArr[i].TagName,
                   Stroke:"#FF" + this.addCurveArr[i].Stroke.slice(1),
                   Name:this.addCurveArr[i].Name,
                   Description:this.addCurveArr[i].Descript,
                   Unit:this.addCurveArr[i].curvePt,
                   Digit:this.addCurveArr[i].curveFo,
                   MaxValue:Number(this.addCurveArr[i].curveMax),
                   MinValue:Number(this.addCurveArr[i].curveNin),
                   Type:this.addCurveArr[i].value,
                }
              
                UpdateArr.push(value)
            }
            
            var data = {
                 argGroupId : this.data,
                 argGroupName : this.addCurveArrNameText,
                 argSeries:UpdateArr
            }
       
            this.$axios({
                method:'post',
                url:"/api/NewTrendChart/UpdateSeriesGroup",
                data:data
            }).then((res)=>{
                 if(res.data.code == 0){
                          this.addCurveArrNameShow = true
                          this.addCurveArrHint = this.lang.NewTrendChart_ChartSettingViewModel_SaveSuccess
                          this.$parent.$parent.axiosId()
                          this.CurveArrNameConfig = 0
                     } else {
                         this.tipword = res.data.msg
                         this.save = true
                     }

               this.NameArrIndex = []
               this.NameArr=[]
               
            }).catch(function (error) {
                console.log(error);
            })


           }else{
                var left1 = this
              

                 console.log('添加曲线组',this.addCurveArr)

               if(this.addCurveArrNameText.trim() == ''){
                   this.addCurveArrHint = this.lang.NewTrendChart_AddToSeriesGroupViewModel_InputGroupName
                   this.addCurveArrNameShow = true
                  this.CurveArrNameConfig = 1
               }else{
                    let arr = []
                for(var k=0;k<this.addCurveArr.length;k++){
                    var value1 = {
                        Number:k + 1,
                        TagName:this.addCurveArr[k].TagName == this.lang.NewTrendChart_Group_Nothing ? null : this.addCurveArr[k].TagName,
                        Stroke:this.addCurveArr[k].Stroke?"#FF" + this.addCurveArr[k].Stroke.slice(1):'',
                        Name:this.addCurveArr[k].Name,
                        Description:this.addCurveArr[k].Descript,
                        Unit:this.addCurveArr[k].curvePt == ''? null : this.addCurveArr[k].curvePt,
                        Digit:this.addCurveArr[k].curveFo ==''? null :!isNaN(this.addCurveArr[k].curveFo)?Number(this.addCurveArr[k].curveFo):this.addCurveArr[k].curveFo,
                        MaxValue:Number(this.addCurveArr[k].curveMax),
                        MinValue:Number(this.addCurveArr[k].curveNin),
                        Type:this.addCurveArr[k].value
                    }
    
                    arr.push(value1)
                }


                var data1 = {
                    argGroupName:this.addCurveArrNameText,
                    argSeries:arr
                }
              
                 this.$axios({
                  method:"post",
                  url:"/api/NewTrendChart/AddSeriesGroup",
                  data:data1,
                  }).then((res)=>{
                      console.log('res',res)
                     if(res.data.data == '保存成功！' || res.data.data == 'Save successfully!'){
                          this.addCurveArrNameShow = true
                          this.addCurveArrHint = this.lang.NewTrendChart_SeriesGroupsSettingViewModel_SaveSuccess
                          this.$parent.$parent.axiosId()
                          this.CurveArrNameConfig = 0
                     }else if(res.data.msg == this.lang.NewTrendChart_AddToSeriesGroupViewModel_GroupNameExist){
                         this.addCurveArrNameShow = true
                          this.addCurveArrHint = this.lang.NewTrendChart_AddToSeriesGroupViewModel_GroupNameExist
                          this.CurveArrNameConfig = 1
                          
                     }else{
                         this.addCurveArrNameShow = true
                          this.addCurveArrHint = res.data.msg
                          this.CurveArrNameConfig = 1
                     }
                     this.NameArrIndex = []
                     this.NameArr=[]
                 
                    }).catch(function (error) {
                        console.log(error);
                    })
            }
           }


       },
       //确认添加曲线组
       addCurveArrNameConfir(){
            var left1 = this
    
                console.log('已输入')
         this.addCurveArrNameShow = false
        //  this.addCurveArrName = false
         if(this.CurveArrNameConfig == 0){
             this.off()
         }
       },

       closePop () {
           this.save = false
       },
       //RGB转16进制
        colorRGBtoHex(color) {
           var values = color

        .replace(/rgba?\(/, '')

        .replace(/\)/, '')

        .replace(/[\s+]/g, '')

        .split(',');

      var a = parseFloat(values[3] || 1),

        r = Math.floor(a * parseInt(values[0]) + (1 - a) * 255),

        g = Math.floor(a * parseInt(values[1]) + (1 - a) * 255),

        b = Math.floor(a * parseInt(values[2]) + (1 - a) * 255);

      return "#" +

        ("0" + r.toString(16)).slice(-2) +

        ("0" + g.toString(16)).slice(-2) +

        ("0" + b.toString(16)).slice(-2);
            // var rgb = color.split(',');
            // var r = parseInt(rgb[0].split('(')[1]);
            // var g = parseInt(rgb[1]);
            // var b = parseInt(rgb[2].split(')')[0]);
            // var a = parseInt(parseFloat(rgb[3].split(')')[0])*255);
            // var hex = "#" + ((1 << 24) + (r << 16) + (g << 8) + b+a).toString(16).slice(1);
            // return hex;
        },


        guid() {
           function S4() {
                return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
            }
            return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
        }
      
       
    }
    
}
</script>
<style lang="scss">
.el-color-picker__trigger{
    height: inherit;
}
    .el-table__header-wrapper{
        background: #DCF0F9;   
    }
   .el-table .cell{
       
        white-space: nowrap;
     
    }
.conterFool_fool{

    .el-select .el-input__inner {
        width: 100%;
        height:30px;
    }
                    

    .el-input__icon{
      line-height: 0px;
    }
}

.conterBottom_conter{
     .el-select .el-input__inner {
        width: 120px;
        height:30px;
    }
    .el-input__icon{
      line-height: 0px;
    }

}
.tenPop_btn{

.el-button{
    padding:0;
}
}


.conterFool_middle{
    .el-table__row:hover{
        background: #fff;
    }
   .el-table th{
       background: #DCF0F9;
       color:#5883E7;
       border-right:1px solid #e4e4e4;
   }
   
 
    
    .el-checkbox__input.is-indeterminate .el-checkbox__inner{
        background-color:#fff !important;
        border-color:#DCDFE6 !important;
        
    }

  .el-checkbox__input.is-checked .el-checkbox__inner{
        background-color:#fff !important;
        border-color:#DCDFE6 !important;
    }
    .el-checkbox__inner{
        width:24px;
        height:24px;
    }
    .el-checkbox__inner::after{
       border-bottom:2px solid #84D063;
       border-right:2px solid #84D063;
       width:6px;
       height:15px;
       left:8px;
       top:1px;
    }
}

    .el-table--border::after, .el-table--group::after, .el-table::before{
    z-index:-1    
    }
.conterBottom_conter{
     .el-checkbox__input.is-indeterminate .el-checkbox__inner{
        background-color:#fff !important;
        border-color:#DCDFE6 !important;
    }
    .el-checkbox__input.is-checked .el-checkbox__inner{
        background-color:#fff !important;
        border-color:#DCDFE6 !important;
    }
     .el-checkbox__inner{
        width:24px;
        height:24px;
    }
    .el-checkbox__inner::after{
      border-bottom:2px solid #84D063;
       border-right:2px solid #84D063;
       width:6px;
       height:15px;
       left:8px;
       top:1px;
    }
}
</style>

<style lang="scss" scoped>
     


    .tenPop_box{
        width:1300px;
        height:885px;
        box-shadow: 2px 2px 8px 2px rgba(0,0,0,0.6);
        // background: red;

        .referencePop{
            position: absolute;
            left:0;
            right:0;
            bottom:0;
            top:0;
            margin: auto;
            width:540px;
            height:360px;
            box-shadow: 2px 2px 8px 2px rgba(0,0,0,0.6);
            z-index: 999;

            .title{
                width:100%;
                height:60px;
                background: #386DF0;
                text-align: center;
                line-height: 60px;

                .text{
                   font-size: 22px;
                   color:#fff;
                   margin-left:60px;
                }
                
                .referen_i{
                    cursor: pointer;
                    float: right;
                    font-size: 40px;
                    color:#FFF;
                    margin-top:10px;
                    margin-right:10px;

                }

                
            }

            .middle{
                width:100%;
                height:calc(100% - 60px);
                background: #EEEEEE;
                text-align: center;
                .middle_box:first-child {
                    padding-top:55px;
                }
                .middle_box{
                    padding-top:15px;
                    .text{
                        font-size: 16px;
                        margin-right:15px;
                        display: inline-block;
                        width: 80px;
                        text-align: right;
                    }
                    .inp{
                        width:355px;
                        height:35px;
                    }
                }
                
                .first{
                    padding-top:55px;

                    .text{
                        font-size: 16px;
                        margin-right:10px;
                    }
                    .inp{
                        width:355px;
                        height:35px;
                    }

                }

                .btn{
                    width:75%;
                    margin: 15px auto;

                    .btn_que{
                        width:100px;
                        height:35px;
                        float: right;
                        margin-left: 15px;
                        line-height: 10px;
                        background: #386DF0;
                    }
                    .btn_cle{
                        float: right;
                        width:100px;
                        height:35px;
                        line-height: 10px;
                        background: #999999;
                    }
                }

            }

        }

        .deletePop{
            position: absolute;
            left:0;
            right:0;
            bottom:0;
            top:0;
            margin: auto;
            width:385px;
            height:205px;
            background: #fff;
            z-index: 9999;
            .title1{
                width:100%;
                height:40px;
                background: #FFBC3D;
                text-align: center;
                line-height: 40px;
                color:#fff;

                .title_i{
                    color: #fff;
                    margin-right:5px;
                }
            }

            .delete_text{
                width:330px;
                height:120px;
                margin:auto;
                // word-break: break-all;
                // word-wrap: break-word;
                text-align: center;
                display: flex;
                align-items: center;
                justify-content: center;
            }

            .delete_text11{
                text-align: center;
            }

            .delete_btn{
                width:100%;
                height:45px;
                margin:auto;

                .confir{
                    width:280px;
                    height:30px;
                    background: #F3E3AD;
                    color:#EBA241;
                    text-align: center;
                    line-height: 30px;
                    margin:auto;
                    cursor: pointer;
                }

             
            }

        }
         
        .CurveArrPop{
            position: absolute;
            left:0;
            right:0;
            bottom:0;
            top:-5px;
            margin: auto;
            width:540px;
            height:250px;
            box-shadow: 2px 2px 8px 2px rgba(0,0,0,0.6);
            z-index:999;

            .title{
                width:100%;
                height:60px;
                background: #386DF0;
                text-align: center;
                line-height: 60px;

                .text{
                   margin-left:60px;
                   font-size: 22px;
                   color:#fff;
                }
                
                .referen_i{
                    cursor: pointer;
                    float: right;
                    font-size: 40px;
                    color:#FFF;
                    margin-top:10px;
                    margin-right:10px;

                }

                
            }

            .middle{
                width:100%;
                height:calc(100% - 60px);
                background: #EEEEEE;
                text-align: center;
                
                .first{
                    padding-top:55px;

                    .text{
                        font-size: 16px;
                        margin-right:10px;
                    }
                    .inp{
                        width:355px;
                        height:35px;
                    }

                }

                .btn{
                    width:75%;
                    margin: 15px auto;

                    .btn_que{
                        width:100px;
                        height:35px;
                        float: right;
                        margin-left: 15px;
                        line-height: 10px;
                        background:#386DF0 ;

                    }
                    .btn_cle{
                        float: right;
                        width:100px;
                        height:35px;
                        line-height: 10px;
                        background: #999;
                    }
                }

            }

        }

        .tenPop_fool{
            position: relative;
            width:100%;
            height:60px;
            text-align: center;
            line-height: 60px;
            background: #386DF0;
            color:#fff;
            font-size: 24px;
             
            .tenPop_i{
                position: absolute;
                right:10px;
                top:10px;
                bottom:0;
                margin:auto 0;
                font-size: 42px;
            }
          
        }
        
        .tenPop_conter{
            position: relative;
            width:100%;
            // height:100%;
            height:calc(100% - 60px);
            background: #eee;

            .tenPop_conterBox{
               position: relative;
               width:90%;
               height:826px;
               margin: 0 auto;

            .tenPop_conterFool{
                position: relative;;
                top:10px;
                left:0;
                right:0;
                margin:0 auto;
                width:100%;
                height:370px;
                border:1px solid #E4E4E4;
                background: #F4F4F4;

                .conterFool_fool{
                    width:97%;
                    height:55px;
                    margin:auto;
                    font-size:12px;
                    padding-top:10px;

                    .conterFool_select{
                       width:150px;
                       height:30px;
                       margin-right:15px;
                    }
                    .conterFool_select1{
                       width:174px;
                       height:30px;
                       margin-right:15px;
                    }

                    .conterFool_text{
                        width:150px;
                        height:30px;
                        font-size:16px;
                        margin-right:15px;
                        padding-left:10px;
                    }

                    .conterFool_btn{
                        font-size: 16px;
                        box-sizing: border-box;
                        cursor: pointer;
                        display: inline-block;
                        text-align: center;
                        line-height: 30px;
                        color:#386DF0;
                        width:100px;
                        height:30px;
                        border:1px solid #386DF0;
                        border-radius: 4px;
                        background: #fff;
                    }
                }

                .conterFool_middle{
                    width:97%;
                    margin: auto;
                    height:255px;
                    overflow: auto;
                }

                .conterFool_bottom{
                    width:97%;
                    margin: auto;
                    height:60px;
                    padding-top:15px;

                    .bottom_text{
                        float: left;
                        color:#929292;
                        font-size: 14px;
                    }
                     .bottom_firest{
                         width:65px;
                         height:30px;
                         line-height: 28px;
                         text-align:center;
                         color:#FDA100;
                         border: 1px solid #FDA100;
                         box-sizing: border-box;
                        float: right;
                        border-radius: 5px;
                        margin-left:10px;
                        cursor: pointer;
                    }
                     .bottom_last{
                         cursor: pointer;
                         width:80px;
                         height:30px;
                          line-height: 28px;
                         text-align:center;
                         color:#F9D79C;
                         border: 1px solid #F8CA7A;
                         box-sizing: border-box;
                         background: #f9f9f9;
                       float: right;
                       border-radius: 5px;
                       margin-left:10px;
                    }
                     .bottom_next{
                         cursor: pointer;
                        float: right;
                          width:80px;
                         height:30px;
                          line-height: 28px;
                         text-align:center;
                         color:#FDA100;
                         border: 1px solid #FDA100;
                         box-sizing: border-box;
                         border-radius: 5px;
                         margin-left:10px;
                    }
                     .bottom_end{
                         cursor: pointer;
                        float: right;
                          width:80px;
                         height:30px;
                          line-height: 28px;
                         text-align:center;
                         color:#FDA100;
                         border: 1px solid #FDA100;
                         box-sizing: border-box;
                         border-radius: 5px;
                         margin-left:10px;
                    }
                     .bottom_input{
                         float: right;
                         margin-left:10px;
                         color:#9C9C9C;
                         .text{
                            display: inline-block;
                            width:65px;
                            height:30px;
                            margin:0 5px;
                            text-align: center;
                            color:#FDA100;
                         }
                    }
                      .bottom_jump{
                          cursor: pointer;
                         float: right;
                           width:80px;
                         height:30px;
                          line-height: 28px;
                         text-align:center;
                         color:#FDA100;
                         border: 1px solid #FDA100;
                         box-sizing: border-box;
                         border-radius: 5px;
                         margin-left:10px;
                    }

                }
            }

            .tenPop_conterMiddle{
                width:100%;
                height:50px;
                margin-top:10px;
                position: relative;
                
                
                
                .remove{
                    position: absolute;
                    top:10px;
                    left:52%;
                    width:120px;
                    height:30px;
                    line-height: 5px;
                    text-align: center;
                    background: #999;
                }
                
                .add{
                     position: absolute;
                    width:120px;
                    height:30px;
                    top:10px;
                    left:40%;
                    line-height: 5px;
                    text-align: center;
                    background: #386DF0;
                    
                }
            }
            
            .tenPop_conterBottom{
                width:100%;
                height:320px;
                border:1px solid #E4E4E4;
                background: #F4F4F4;

                .conterBottom_fool{
                    width:97%;
                    margin: auto;
                    height:60px;

                    .text{
                        float: left;
                        color:#537CE6;
                        margin-top:15px;
                    }

                    .addLine{
                        cursor: pointer;
                        width:150px;
                        height:30px;
                        line-height: 30px;
                        margin-top:15px;
                        text-align: center;
                        float: right;
                        color:#46BE05;
                        border:1px solid #46BE05;
                        box-sizing: border-box;

                    }

                }
                .conterBottom_conter{
                    width:97%;
                    height:250px;
                    margin:auto;
                    overflow-y: auto;
                    background: #fff;

                    .conter{
                        width:calc(60px + 140px + 140px + 100px + 180px + 120px + 120px + 100px + 100px + 200px);
                        height:50px;
                        position: sticky;
                        top: 0;
                        left: 0;
                        z-index: 998;
                    }

                    .conter_1,
                    .conter_2,
                    .conter_3,
                    .conter_4,
                    .conter_5,
                    .conter_6,
                    .conter_7,
                    .conter_8,
                    .conter_9,
                    .conter_10{
                        height:100%;
                        background: #DCF0F9;
                        border-right:1px solid #A7D0E2;
                        box-sizing: border-box;
                        float: left;
                        line-height: 50px;
                        padding-left:10px;
                        color:#4270E4;
                    }

                    .conter_1{
                        width:60px;
                    }
                    .conter_2{
                        width:215px;
                       
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;

                    }
                    .conter_3{
                       width:120px;
                      
                    }
                    .conter_4{
                    
                    width:80px;
                    }
                    .conter_5{
                     width:180px;
                    }
                    .conter_6{
                     width:105px;
                  
                    }
                    .conter_7{
                     width:120px;
                    }
                    .conter_8{
                     width:100px;
                    }
                    .conter_9{
                     width:100px;
                    }
                    .conter_10{
                     width:180px;
                    }
                    
                    .conter_box{
                       float: left;
                       width:1260px;
                       height:50px;
                       border-bottom:1px solid #E4E4E4;
                    }
                  

                    .conter_box_1,
                    .conter_box_2,
                    .conter_box_3,
                    .conter_box_4,
                    .conter_box_5,
                    .conter_box_6,
                    .conter_box_7,
                    .conter_box_8,
                    .conter_box_9,
                    .conter_box_10{
                        height:100%;
                        float: left;
                        padding-left:5px;
                        line-height: 50px;
                        padding-left:10px;
                    }

                    .conter_box_1{
                        width:60px;

                        input[type="checkbox"] {
        
                        // margin:0 10px 0 15px;
                        top:0;
                        left:0;
                        width:22px;
                        height:22px;  
                        display: inline-block;
                        text-align: center;
                        vertical-align: middle;
                        line-height: 24px;
                        z-index: 11;
                        position: relative;
                        outline: none;
                        -webkit-appearance: none;
                        border:1px solid #B0B0B0;
                        color: red;
        
                    }
                    input[type=checkbox]:after {
                        position: absolute;
                        width:22px;
                        height: 22px;
                        top: -1px;
                        left:-1px;
                        content: " ";
                        display: inline-block;
                        visibility: visible;
                        text-align: center;
                        line-height: 24px;
                        }
                        input[type=checkbox]:checked:after {
                        //   font-family: "iconfont";
                            content: "✓";
                            font-size: 14px;
                            // background-color:#fff;
                            border:none;
                            font-weight:bold;
                            // color:red;
                            color:#46BE05;
                        }
                    }
                    .conter_box_2{
                        width:215px;
                        font-size: 12px;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;

                    }
                    .conter_box_3{
                       width:120px;
                       padding:0;
                    }
                    .conter_box_4{
                    width:80px;
                    padding:0;
                    text-align: center;
                    margin-top:5px;
                    }
                    .conter_box_5{
                     width:180px;
                     input{
                         width:165px;
                         height:30px;
                     }
                    }
                    .conter_box_6{
                      padding:0;
                     width:105px;
                      input{
                         width:100px;
                         height:30px;
                     }
                    }
                    .conter_box_7{
                     width:120px;
                     padding-left:5px;
                      input{
                         width:105px;
                         height:30px;
                     }
                    }
                    .conter_box_8{
                        padding-left:5px;
                     width:100px;
                      input{
                         width:85px;
                         height:30px;
                     }
                    }
                    .conter_box_9{
                    padding-left:5px;
                     width:100px;
                      input{
                         width:85px;
                         height:30px;
                     }
                    }
                    .conter_box_10{
                     width:180px;
                      input{
                         width:175px;
                         height:30px;
                     }
                    }


                }
            }

            .tenPop_btn{
                width:100%;
                height:70px;

                .btn_add{
                    float: right;
                    width:100px;
                    height:35px;
                    margin-right:15px;
                     margin-top:20px;
                    margin-left:10px;
                    background: #386DF0;
                }
                .btn_qure{
                    float: right;
                    width:100px;
                    height:35px;
                     margin-top:20px;
                     text-align: center;
                     background: #386DF0;
                }
                .btn_cen{
                    float: right;
                    width:100px;
                    height:35px;
                     margin-top:20px;
                     background: #999;
                }
            }

            }

        }
    }
.CurveArrPopcover{
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    z-index: 998;
    left: 0;
    margin: auto;
    width: 100%;
    height: 100%;
}
</style>




