<!--
 * @Description: 这是数值输入页面（组件）
 * @Date: 2019-11-13 09:30:56
 * @Author: Tao
 * @LastEditors: Tao
 * @LastEditTime: 2021-01-26 09:41:05
 -->
<template>
<div>
<Keycom :showkey='showkey' :keyclass='keyclass' :keytext='keytext' @getnum='getnum' @closeshow='closeshow'></Keycom>
   <div v-for="(item,index) in dataValue" :key="index">

      <div v-if="show"
      @dblclick="opendb(item)" @contextmenu.prevent @mousedown="downClick(item,$event)" @mouseup="seupClick(item,$event)"
       class="TextBox11aa contenBox" :style="'width:' + item.width + 'px; height:' 
          + item.height + 'px; position:absolute; left:' + item.left + 'px; top:' + item.top 
          + 'px; transform:rotate(' + item.rotate + 'deg); opacity:' + item.opacity + '; fontFamily:'
          + item.fontFamily + '; fontSize:' + item.FontSize + 'px; background:' + item.BorderBrush
          + ';boxSizing:border-box; padding:' + item.BorderThickness + 'px;overflow:hidden;white-space:nowrap;boxShadow:'+item.Shadow + ';zIndex:'+ item.ZIndex">

          <div class="conten" :style="'width:100%;height:100%;background:' + item.Background + ';boxShadow:' 
          + item.Shadow + ';'">
            <input autocomplete="off"  @keyup.enter="keupFun(item)" name="datatextbox" :class="'aa'+item.class" v-model="item.text"
             :style="'height:'+(item.height -item.BorderThickness*2)+'px;border:none;width:'
             + (item.width - item.BorderThickness*2)+'px;background:transparent;textAlign:center;color:'
             + item.Foreground+';fontWeight:'+item.Blod + ';text-decoration:'+item.TextDecorations" type="text" />
     
          </div>

      </div>


</div>

<div v-show="TextBoxShow" style="width:100%;height:100%;position:fixed;z-index:2147483647">
    <div v-if="TextBoxShow" class="TextBoxPop_outPop">
      <div class="TextBoxPop_outHead">
          <i class="warning el-icon-warning"></i>
          <span class="text">{{lang.HT_MessageBoxCaption_Tips}}</span>
      </div>
    <div class="TextBoxPop_conter">{{TipsText}}</div>
    <div class="TextBoxPop_btn">
        <div @click="Pop_ConfigFun" class="TextBoxPop_confirm">{{lang.MessageBox_Confrim}}</div>
    </div>
    </div>
</div>

<div v-show="commerPopShow1" style="width:100%;height:100%;position:fixed;z-index:2147483647">
        <div v-if="commerPopShow1" class="commerPop_outPop">
        <div class="commerPop_outHead">
            <i class="warning el-icon-warning"></i>
            <span class="text">{{lang.HT_MessageBoxCaption_Tips}}</span>
        </div>
        <div class="commerPop_conter">{{lang.NoOperationAuthority}}</div>
        <div class="commerPop_btn">
            <div class="commerPop_yes" @click="Jurisdiction()" style="width:310px;margin-left:25px">{{lang.MessageBox_Confrim}}</div>
        </div>
        </div>
</div>


    </div>
</template>

<script>
import Keycom from './Keycom'
import moment from 'moment'//导入文件
export default {
  components: {
    Keycom,  //数字键盘
   },
    data() {
        return {
        showkey:false,
        keyclass:'',
        keytext:'',
        text:'', //未知
        height:0,
        width:0,
        left:0,
        top:0,
        rotate:0,
        opacity:0,
        fontFamily:'',
        FontSize:0,
        Background:'',
        Foreground:'',
        show:true,
        textblockData:[],
        dataValue:[],
        TextBoxShow:false,
        TipsText:'',
        commerPopShow1:false,
        ZIndex:'',
        lang: JSON.parse(localStorage.getItem('languages'))[localStorage.getItem('currentLang')]
        }
    },
    props:['dae','dataId'],
    watch:{
      dae:{
        handler(val){
          this.data = val;
          if(val){
            this.init();
          }
        }
      }
    },
    created(){
      this.data = this.dae
        this.Name = 'datatextbox'
        if(this.data){
          this.init()
        }
    },
    methods: {
        // 关闭键盘
      closeshow(){
         this.showkey = false
      },  
               getnum(value,keyclass){
    let classarrr = ''
     this.dataValue.forEach((item)=>{
       if(item.class == keyclass){
         item.text = value
         classarrr = item
       }
     })
     if(classarrr){
       let e = {
         path:[]
       }
       e.path.push($('.'+classarrr.class))
       this.keupFun(classarrr,e)
     }
    },
      init(){
         //数据筛选
          this.textblockData = []
          var dataAll = this.data.Controls.ControlList
          for(var i=0;i<dataAll.length;i++){
              if(dataAll[i].ControlType == this.Name){
                this.textblockData.push(dataAll[i])
              }
          }
          if(this.textblockData.length!=0){
            this.show = true
          }else{
            this.show = false
          }
          //赋值
            this.gitValue()
      },
      //确定
      Pop_ConfigFun(){
        this.TextBoxShow = false
      },

      //确认
    Jurisdiction(){
        this.commerPopShow1 = false
    },
     jurisdictionShow(item){
          return new Promise((resolve, reject) => {
            var userinfoID
              if(JSON.parse(sessionStorage.getItem('userInfo1')) == null){
                  userinfoID = JSON.parse(sessionStorage.getItem('sightseerInfo1')).SCMSUserID;
              }else{
                  userinfoID = JSON.parse(sessionStorage.getItem('userInfo1')).SCMSUserID;
              }
              var argChildMenuID = this.dataId
              var elementName = item.class
                this.$axios({                      //权限配置请求接口
                    method: 'post',
                    url: `/api/UserManage/UserManage_CanExcuteAuthorityControl?argUserID=${userinfoID}&argChildMenuID=${argChildMenuID}&argElementName=${elementName}`,
                    argUserID:userinfoID,
                    argChildMenuID:argChildMenuID,
                    argElementName:elementName,
                }) .then(res => {
                  if( res.data.data.CanExcute == 0){
                        this.CanExcuteShow=true
                        resolve('成功了')
                  }else{
                      this.CanExcuteShow=false
                      resolve('成功了')
                  }
            })
       })
        },


      //鼠标松开
     seupClick(item,e){
       clearTimeout(this.timeoutID);
       var self = this
       var EventScriptList = this.data.Data.EventScriptList
       var EventType = []
       var EventType1 = []
       var Typearr  = []
       for(var i=0;i<EventScriptList.length;i++){
           if(item.class == EventScriptList[i].ElementName 
              && EventScriptList[i].EventType == 'MouseLeftButtonUp'){
              EventType.push(EventScriptList[i])
           }else if(item.class == EventScriptList[i].ElementName 
              && EventScriptList[i].EventType == 'MouseRightButtonUp'){
             EventType1.push(EventScriptList[i])
           }
       }

        this.timeoutID = window.setTimeout(function() {
          if(e.which == 1){  //鼠标左键松开
              if(EventType.length){
               self.jurisdictionShow(item).then(val => { 
                  if(self.CanExcuteShow){
                    self.commerPopShow1 = true
                    return
                  }else{
                    for(var j=0;j<EventType.length;j++){
                      Typearr.push(EventType[j].Script)
                    }
                    self.$parent.scriptData(Typearr,'','','','','')
                  }
              });
              }
           }else if(e.which == 3){ //鼠标右键松开
                  if(EventType1.length){
                     self.jurisdictionShow(item).then(val => { 
                         if(self.CanExcuteShow){
                          self.commerPopShow1 = true
                          return
                        }else{
                          for(var j1=0;j1<EventType1.length;j1++){
                             Typearr.push(EventType1[j1].Script)
                           }
                        self.$parent.scriptData(Typearr,'','','','','')
                        }
                    });
                  }
           }
        },200)
     },
     //鼠标按下
     downClick(item,e){
                 this.keyclass = item.class
       console.log(this.data.Data.KeyboardControlList)
       this.data.Data.KeyboardControlList.forEach((item1)=>{
          if(item1.IsPopupKeyboard){
             this.showkey = true;
            this.keytext = item.text
            }
       })
        // clearTimeout(this.timeoutID);
        var self = this
        var EventScriptList = this.data.Data.EventScriptList
        var EventType = []
        var EventType1 = []
        var Typearr = []
        for(var i=0;i<EventScriptList.length;i++){
           if(item.class == EventScriptList[i].ElementName 
              && EventScriptList[i].EventType == 'MouseLeftButtonDown'){
              EventType.push(EventScriptList[i])
           }else if(item.class == EventScriptList[i].ElementName 
                    && EventScriptList[i].EventType == 'MouseRightButtonDown'){
                      EventType1.push(EventScriptList[i])
                    }
        }
        // this.timeoutID = window.setTimeout(function() {
          if(e.which == 1){  //鼠标左键按下
              if(EventType.length){
                self.jurisdictionShow(item).then(val => { 
                     if(self.CanExcuteShow){
                        self.commerPopShow1 = true
                        return
                    }else{
                      for(var j=0;j<EventType.length;j++){
                       Typearr.push(EventType[j].Script)
                     }
                    self.$parent.scriptData(Typearr,'','','','','')
                    }
                });

              }
          
          }else if(e.which == 3){ //鼠标右键按下
               if(EventType1.length){
                 self.jurisdictionShow(item).then(val => { 
                       if(self.CanExcuteShow){
                        self.commerPopShow1 = true
                        return
                      }else{
                        for(var j1=0;j1<EventType1.length;j1++){
                            Typearr.push(EventType1[j1].Script)
                        }
                      self.$parent.scriptData(Typearr,'','','','','')
                      }
                  });
               }
          }
        // },200)
     },
      //鼠标双击
     opendb(item){
        // clearTimeout(this.timeoutID);
        setTimeout(()=>{
          var EventScriptList = this.data.Data.EventScriptList
          var EventType = []
          var Typearr = []
          for(var i=0;i<EventScriptList.length;i++){
               if(item.class == EventScriptList[i].ElementName && EventScriptList[i].EventType == 'MouseDoubleClick'){
                   EventType.push(EventScriptList[i])
               }
          }
           if(EventType.length){
             this.jurisdictionShow(item).then(val => { 
                  if(this.CanExcuteShow){
                         this.commerPopShow1 = true
                         return
                   }else{
                     for(var j=0;j<EventType.length;j++){
                         Typearr.push(EventType[j].Script)
                       }
                    this.$parent.scriptData(Typearr,'','','','','')
                   }
             });
           }
        },200)
     },

      //时间格式化
        getTime(dt){
            var year = dt.getFullYear();        //获取当前月
            var month = dt.getMonth() + 1;
            var mothe = month > 9 ? month : '0' + month            //获取当前日
            var date = dt.getDate();
            var da = date >9 ? date : '0' + date
            var h = dt.getHours(); //获取当前小时数(0-23)
            var he = h > 9 ? h : '0' + h
            var m = dt.getMinutes(); //获取当前分钟数(0-59)
            var me = m > 9 ? m : '0' + m
            var s = dt.getSeconds();
            var se = s > 9 ? s : '0' + s
            var str = year + '-' + mothe + '-' + da + ' ' + he + ':' + me + ':' +se         //获取当前时间
            return str;
        },
      //回车事件
      keupFun(item){  //回车事件

        if(item.TagName != ''){
             this.jurisdictionShow(item).then(val => { 
               if(this.CanExcuteShow){
                 this.commerPopShow1 = true
                 return
               }else{

                 var value
                 var arr = []

                  var ss = JSON.parse(sessionStorage.getItem('variable'))
                      var variableName
                      for(let o=0;o<ss.length;o++){
                          if(item.TagName == ss[o].TagName){
                            variableName = ss[o].TagType
                          }
                      }
        
        
                if(variableName == this.lang['二进制变量']){
                  var text1 = item.text.toLowerCase()
                    if(text1 == 'false' || text1 == 'true' || text1 == '0' || text1 == '1'){
                       value = {
                          "Name":item.TagName,
                            "Value":text1
                       }
                        arr.push(value)
                       //请求接口
                                                                          this.$axios({
                                  method:'post',
                                  url:`/api/base/CheckTags`,
                                  data:arr
                             }).then((res1)=>{
                                  if(res1.data.code === 0){
                                  this.$axios({
                    method: 'post',
                    url: '/api/Base/PostIOServiceTest',
                    data:arr
                }).then(res => {
                }).catch(function(error) {
                    console.log('err',error);
                });
                                  }else{
                     this.TextBoxShow = true
                        // this.TipsText='请输入正确的【二进制变量】值，如true、false、0和1！'
                        this.TipsText=res1.data.msg
                                  }
                               
                              })
                    }else{
                        this.TextBoxShow = true
                        // this.TipsText='请输入正确的【二进制变量】值，如true、false、0和1！'
                        this.TipsText=`${this.lang.SCMSExplorerData_ProtocolDataType_PECorrect}${this.lang['二进制变量']}${this.lang.SCMSExplorerData_ProtocolDataType_Bool}`
                    }
        
                }else if(variableName == this.lang['有符号8位整型']){
                  this.judgeFun(item.text,127,-128,item.MaxValue,item.MinValue,variableName,item)
        
                }else if(variableName == this.lang['无符号8位整型']){
                   this.judgeFun(item.text,255,0,item.MaxValue,item.MinValue,variableName,item)
        
                }else if(variableName == this.lang['有符号16位整型']){
                    this.judgeFun(item.text,32767,-32768,item.MaxValue,item.MinValue,variableName,item)
        
                }else if(variableName == this.lang['无符号16位整型']){
                    this.judgeFun(item.text,65535,0,item.MaxValue,item.MinValue,variableName,item)
        
                }else if(variableName == this.lang['有符号32位整型']){
                    this.judgeFun(item.text,2147483647,-2147483648,item.MaxValue,item.MinValue,variableName,item)
        
                }else if(variableName == this.lang['无符号32位整型']){
                    this.judgeFun(item.text,4294967295,0,item.MaxValue,item.MinValue,variableName,item)
        
                }else if(variableName == this.lang['有符号64位整型']){
                  this.judgeFun(item.text,9223372036854775807,-9223372036854775808,item.MaxValue,item.MinValue,variableName,item)
        
                }else if(variableName == this.lang['无符号64位整型']){
                   this.judgeFun(item.text,18446744073709551615,0,item.MaxValue,item.MinValue,variableName,item)
        
                }else if(variableName == this.lang['F32位浮点数IEEE754']){
                  this.judgeFun(item.text,3.40282347E+38,-3.40282347E+38,item.MaxValue,item.MinValue,variableName,item)
                }else if(variableName == this.lang['F64位浮点数IEEE754']){
                  this.judgeFun(item.text,1.7976931348623157E+308,-1.7976931348623157E+308,item.MaxValue,item.MinValue,variableName,item)
                }
                else if(variableName == this.lang['日期']){
                     this.DateFun(item.text,variableName,item)
                }else if(variableName == this.lang['时间']){
                  if(item.text==''){
                     this.TextBoxShow = true
                    //  this.TipsText=`请输入正确的【时间】值，如12:00:00`
                      this.TipsText=`${this.lang.SCMSExplorerData_ProtocolDataType_PECorrect}${this.lang['时间']}${this.lang.SCMSExplorerData_ProtocolDataType_Time}`
                     return
                  }
                  var time = moment('2020-02-02 '+ item.text).format('LTS')
                     if(time == 'Invalid date'){
                      this.TextBoxShow = true
                    //  this.TipsText=`请输入正确的【时间】值，如12:00:00`
                    this.TipsText=`${this.lang.SCMSExplorerData_ProtocolDataType_PECorrect}${this.lang['时间']}${this.lang.SCMSExplorerData_ProtocolDataType_Time}`
                  }else{
                     var value4 = {
                          "Name":item.TagName,
                            "Value":time
                       }
                        arr.push(value4)
                        
                       //请求接口
                                                                                      this.$axios({
                                  method:'post',
                                  url:`/api/base/CheckTags`,
                                  data:arr
                             }).then((res1)=>{
                                  if(res1.data.code === 0){
                                  this.$axios({
                    method: 'post',
                    url: '/api/Base/PostIOServiceTest',
                    data:arr
                }).then(res => {
                }).catch(function(error) {
                    console.log('err',error);
                });
                                  }else{
                     this.TextBoxShow = true
                        // this.TipsText='请输入正确的【二进制变量】值，如true、false、0和1！'
                        this.TipsText=res1.data.msg
                                  }
                               
                              })
                  }
        
                }else if(variableName == this.lang['日期时间']){
        
                  this.DateFun(item.text,variableName,item)
        
                }else if(variableName == this.lang['字符串']){
                       var value3 = {
                          "Name":item.TagName,
                            "Value":item.text
                       }
                        arr.push(value3)
                       //请求接口
                                                                                                 this.$axios({
                                  method:'post',
                                  url:`/api/base/CheckTags`,
                                  data:arr
                             }).then((res1)=>{
                                  if(res1.data.code === 0){
                                  this.$axios({
                    method: 'post',
                    url: '/api/Base/PostIOServiceTest',
                    data:arr
                }).then(res => {
                }).catch(function(error) {
                    console.log('err',error);
                });
                                  }else{
                     this.TextBoxShow = true
                        // this.TipsText='请输入正确的【二进制变量】值，如true、false、0和1！'
                        this.TipsText=res1.data.msg
                                  }
                               
                              })
                }
               }
             })
        }

      },
       
       //数值
      judgeFun(num,max,min,MaxValue,MinValue,TagType,item){
        var arr = []
           var text2 = Number(num)

          //  if(num.length ==0){
          //     this.TextBoxShow = true
          //     // this.TipsText=`请输入正确的【${TagType}】整数值，范围为：${min} - ${max}`
          //     this.TipsText=`${this.lang.SCMSExplorerData_ProtocolDataType_PECorrect}${TagType}${this.lang.SCMSExplorerData_ProtocolDataType_Integer}${min} - ${max}`
          //     return
          //  }

          //  if(isNaN(text2)){
          //     this.TextBoxShow = true
          //     // this.TipsText=`请输入正确的【${TagType}】整数值，范围为：${min} - ${max}`
          //     this.TipsText=`${this.lang.SCMSExplorerData_ProtocolDataType_PECorrect}${TagType}${this.lang.SCMSExplorerData_ProtocolDataType_Integer}${min} - ${max}`
          //     return
          //  }

          // if(text2 == '' && text2 != 0){
          //     this.TextBoxShow = true
          //   //  this.TipsText=`请输入正确的【${TagType}】整数值，范围为：${min} - ${max}`
          //    this.TipsText=`${this.lang.SCMSExplorerData_ProtocolDataType_PECorrect}${TagType}${this.lang.SCMSExplorerData_ProtocolDataType_Integer}${min} - ${max}`
          //    return
          // }
          // if(text2 >= min && text2<= max){
          //    if(MaxValue != null){
             
          //      if(text2 > MaxValue){
          //        this.TextBoxShow = true
          //       //  this.TipsText=`操作无效，输入值<${text2}>大于最大值<${MaxValue}>!`
          //         let msg = this.lang.HMI_HT_HMIUserControlViewModel_InputGreaterThanMaximumValue
          //         let firstL = msg.indexOf('<')
          //         let firstR = msg.indexOf('>') + 1
          //         let lastL = msg.lastIndexOf('<')
          //         let lastR = msg.lastIndexOf('>') + 1
          //         let str1 = msg.slice(firstL, firstR)
          //         let str2 = msg.slice(lastL, lastR)
          //         msg = msg.replace(str1, `<${text2}>`)
          //         msg = msg.replace(str2, `<${MaxValue}>`)
          //         this.TipsText=`${msg}`

          //        return
          //      }
          //      if(text2 < MinValue){
          //        this.TextBoxShow = true
          //       //  this.TipsText=`操作无效，输入值<${text2}>小于最小值<${MinValue}>!`
          //         let msg = this.lang.HMI_HT_HMIUserControlViewModel_InputLessThanMinimumValue
          //         let firstL = msg.indexOf('<')
          //         let firstR = msg.indexOf('>') + 1
          //         let lastL = msg.lastIndexOf('<')
          //         let lastR = msg.lastIndexOf('>') + 1
          //         let str1 = msg.slice(firstL, firstR)
          //         let str2 = msg.slice(lastL, lastR)
          //         msg = msg.replace(str1, `<${text2}>`)
          //         msg = msg.replace(str2, `<${MinValue}>`)
          //         this.TipsText=`${msg}`
          //        return
          //      }
          //    }
 
               var value = {
                  "Name":item.TagName,
                    "Value":text2
               }
                arr.push(value)
               //请求接口
                                                                                         this.$axios({
                                  method:'post',
                                  url:`/api/base/CheckTags`,
                                  data:arr
                             }).then((res1)=>{
                                  if(res1.data.code === 0){
                                  this.$axios({
                    method: 'post',
                    url: '/api/Base/PostIOServiceTest',
                    data:arr
                }).then(res => {
                }).catch(function(error) {
                    console.log('err',error);
                });
                                  }else{
                     this.TextBoxShow = true
                        // this.TipsText='请输入正确的【二进制变量】值，如true、false、0和1！'
                        this.TipsText=res1.data.msg
                                  }
                               
                              })

          // }else{
          //    this.TextBoxShow = true
          //   //  this.TipsText=`请输入正确的【${TagType}】整数值，范围为：${min} - ${max}`
          //   this.TipsText=`${this.lang.SCMSExplorerData_ProtocolDataType_PECorrect}${TagType}${this.lang.SCMSExplorerData_ProtocolDataType_Integer}${min} - ${max}`
          // }
      },
      //日期
      DateFun(text,TagType,item){
          var index = 6 ;var index1 = 6 ;var index2 = 6
         var index3 = 6 ;var index4 = 6 ;var index5 = 6
         var Indexarr = []
         var showV = false
         var showV1 = false
         var textValue = text.toString()
         var d = /\./
         if(textValue.search("-") != -1){
             index1 = textValue.search("-")
         }
          if(textValue.search("/") != -1){
             index2 = textValue.search("/")
         }
          if(textValue.search(d) != -1){
             index3 = textValue.search(d)
         }
          if(textValue.search(",") != -1){
             index4 = textValue.search(",")
         }
          if(textValue.search(" ") != -1){
             index5 = textValue.search(" ")
         }
         Indexarr.push(index1) ;Indexarr.push(index5)
         Indexarr.push(index4) ;Indexarr.push(index3)
         Indexarr.push(index2)
         index = Math.min.apply(Math, Indexarr);
         if(index==1){
          textValue = '200' + textValue
         }else if(index == 2){
           var tt = textValue.slice(0,1)
           if(tt >= 5){
              textValue = '19' + textValue
           }else{
            textValue = '20' + textValue
           }
         }else if(index==3){
            var tt1 = textValue.slice(0,1)
            var tt2 = textValue.slice(1,2)
            var tt3 = textValue.slice(2,3)

            if(tt1 == 0&&tt2 == 0&&tt3 == 0){
                this.TextBoxShow = true
                if(TagType == this.lang['日期时间']){
                    // this.TipsText=`请输入正确的【${TagType}】值，如1999-01-01 00:00:00或1999.01.01 00:00:00`
                    this.TipsText=`${this.lang.SCMSExplorerData_ProtocolDataType_PECorrect}${TagType}${this.lang.SCMSExplorerData_ProtocolDataType_Datetime}`
                }else{
                  // this.TipsText=`请输入正确的【${TagType}】值，如1999-01-01或1999.01.01`
                  this.TipsText=`${this.lang.SCMSExplorerData_ProtocolDataType_PECorrect}${TagType}${this.lang.SCMSExplorerData_ProtocolDataType_Date}`
                }
                return
            }
            if(tt1 == 0){
              showV1 = false
            
                textValue = '1' + textValue
                    showV1 = true
            }else{
              textValue = '0' + textValue
            }
         }else if(index ==4){
            var tt4 = textValue.slice(0,1)
            var tt5 = textValue.slice(1,2)
            var tt6 = textValue.slice(2,3)
            var tt7 = textValue.slice(3,4)
            showV = false

            if(tt4 == 0&&tt5 == 0&&tt6 == 0 && tt7==0){
                this.TextBoxShow = true
                 if(TagType == this.lang['日期时间']){
                    // this.TipsText=`请输入正确的【${TagType}】值，如1999-01-01 00:00:00或1999.01.01 00:00:00`
                    this.TipsText=`${this.lang.SCMSExplorerData_ProtocolDataType_PECorrect}${TagType}${this.lang.SCMSExplorerData_ProtocolDataType_Datetime}`
                }else{
                  // this.TipsText=`请输入正确的【${TagType}】值，如1999-01-01或1999.01.01`
                  this.TipsText=`${this.lang.SCMSExplorerData_ProtocolDataType_PECorrect}${TagType}${this.lang.SCMSExplorerData_ProtocolDataType_Date}`
                }
                return
            }
            if(tt4 == 0&&tt5 == 0){
              var dd1 = textValue.slice(1)
              textValue = '1' + dd1
              showV = true
            }

         }else if(index >=5){
             this.TextBoxShow = true
             if(TagType == this.lang['日期时间']){
                    // this.TipsText=`请输入正确的【${TagType}】值，如1999-01-01 00:00:00或1999.01.01 00:00:00`
                    this.TipsText=`${this.lang.SCMSExplorerData_ProtocolDataType_PECorrect}${TagType}${this.lang.SCMSExplorerData_ProtocolDataType_Datetime}`
                }else{
                  // this.TipsText=`请输入正确的【${TagType}】值，如1999-01-01或1999.01.01`
                  this.TipsText=`${this.lang.SCMSExplorerData_ProtocolDataType_PECorrect}${TagType}${this.lang.SCMSExplorerData_ProtocolDataType_Date}`
                }
             return
         }
         var a
          if(TagType == this.lang['日期时间']){
             var f = /:/
             a = moment(textValue).format('YYYY/MM/DD h:mm:ss')
         
             var aindex = f.test(textValue)

             if(aindex == -1){
               a = a + ' 00:00:00'
             }
          }else{
             a = moment(textValue).format('YYYY/MM/DD')
          }

          if(a == 'Invalid date'){
              this.TextBoxShow = true
             if(TagType == this.lang['日期时间']){
                    // this.TipsText=`请输入正确的【${TagType}】值，如1999-01-01 00:00:00或1999.01.01 00:00:00`
                    this.TipsText=`${this.lang.SCMSExplorerData_ProtocolDataType_PECorrect}${TagType}${this.lang.SCMSExplorerData_ProtocolDataType_Datetime}`
                }else{
                  // this.TipsText=`请输入正确的【${TagType}】值，如1999-01-01或1999.01.01`
                  this.TipsText=`${this.lang.SCMSExplorerData_ProtocolDataType_PECorrect}${TagType}${this.lang.SCMSExplorerData_ProtocolDataType_Date}`
                }
          }else{
            var arr = []
            var dd2 = a.slice(1)
            if(showV == true){
              a = '0' + dd2
            }
            if(showV1 == true){
              a = '0' + dd2
            }
              var value = {
                  "Name":item.TagName,
                    "Value":a
               }
                arr.push(value)
               //请求接口
                                                                                         this.$axios({
                                  method:'post',
                                  url:`/api/base/CheckTags`,
                                  data:arr
                             }).then((res1)=>{
                                  if(res1.data.code === 0){
                                  this.$axios({
                    method: 'post',
                    url: '/api/Base/PostIOServiceTest',
                    data:arr
                }).then(res => {
                }).catch(function(error) {
                    console.log('err',error);
                });
                                  }else{
                     this.TextBoxShow = true
                        // this.TipsText='请输入正确的【二进制变量】值，如true、false、0和1！'
                        this.TipsText=res1.data.msg
                                  }
                               
                              })
          
          }
      },

     

        //赋值
        gitValue(){
          this.dataValue = []
        for(var i=0;i<this.textblockData.length;i++){
          
          //加层级zIndex
           var ZIndexs = this.data.Data.ZIndexs
           if(ZIndexs){
             for(let item in ZIndexs){
               if(this.textblockData[i].Name == item){
                 this.ZIndex = ZIndexs[item]
                 break
               }
             }
           }else{
              this.ZIndex = ''
           }


            var InputDataList = this.data.Data.InputDataList
            var foreOp
            var foreColor
            var backOp
            var backColor
            var borderColor

            //渐变色变量
            var foregoundArr = JSON.parse(this.textblockData[i].PropertyList.Foreground)
            var backgroundArr = JSON.parse(this.textblockData[i].PropertyList.Background)
            var borderbrushArr = JSON.parse(this.textblockData[i].PropertyList.BorderBrush)
            var lagel
            var gradient
            var lagel1
            var gradient1
            var lagel2
            var gradient2
          
            var clipText
            var backgroundColor
            //阴影
          var borderSadow = JSON.parse(this.textblockData[i].PropertyList.Shadow)
          var InnerShadow
          var OuterShadow
          var Shadow

            if(InputDataList.length != 0){
              for(var j=0;j<InputDataList.length;j++){
                if(InputDataList[j].ElementName == this.textblockData[i].Name){
                  //待优化
                  //阴影
                    Shadow = ''
                    if(borderSadow.InnerShadow != undefined){
                        InnerShadow = borderSadow.InnerShadow.OffsetX + 'px ' +  borderSadow.InnerShadow.OffsetY 
                                    + 'px ' +  borderSadow.InnerShadow.BlurRadius.toFixed(0) + 'px ' 
                                    + borderSadow.InnerShadow.Color + ' inset'
                    }else{
                        InnerShadow = ''
                    }
                    if(borderSadow.OuterShadow != undefined){
                        OuterShadow = borderSadow.OuterShadow.OffsetX + 'px ' +  borderSadow.OuterShadow.OffsetY 
                                    + 'px ' +  borderSadow.OuterShadow.BlurRadius.toFixed(0) + 'px ' 
                                    +  borderSadow.OuterShadow.Color
                    }else{
                        OuterShadow = ''
                    }
                      if(InnerShadow.length && OuterShadow.length){
                        Shadow = InnerShadow + ',' + OuterShadow
                    }else if(InnerShadow.length == 0){
                        Shadow = OuterShadow
                    }else if(OuterShadow.length == 0){
                        Shadow = InnerShadow
                    }
                      //边框色渐变
                      if(borderbrushArr.ColorType == 'SolidColor'){
                          borderColor = '#' + borderbrushArr.Data.Color.slice(3) + borderbrushArr.Data.Color.slice(1, 3)
                      }else{
                              borderColor = ''
                              lagel1 = borderbrushArr.Data.Angel.toFixed(0)
                          for(var f1=0;f1<borderbrushArr.Data.GradientStops.length;f1++){
                              gradient1 = borderbrushArr.Data.GradientStops[f1]
                              borderColor = borderColor + ',' + gradient1.Color + ' ' + (gradient1.Offset*100).toFixed(0) + '%'
                          }
                              borderColor = '-webkit-linear-gradient('+lagel1+'deg'+borderColor+')';
                      }
                    //背景色渐变
                    if(backgroundArr.ColorType == 'SolidColor'){
                        backColor = '#' + backgroundArr.Data.Color.slice(3) + backgroundArr.Data.Color.slice(1, 3)
                        if(backgroundArr.Data.Color.slice(3) == 'FFFFFF' && backgroundArr.Data.Color.slice(1, 3) != "FF"){
                            backColor = '#FFFFFF' + backgroundArr.Data.Color.slice(1, 3)
                        }
                    }else{
                            backColor = ''
                            lagel = backgroundArr.Data.Angel.toFixed(0)
                        for(var h1=0;h1<backgroundArr.Data.GradientStops.length;h1++){
                            gradient = backgroundArr.Data.GradientStops[h1]
                            backColor = backColor + ',' + gradient.Color + ' ' + (gradient.Offset*100).toFixed(0) + '%'
                        }
                            backColor = '-webkit-linear-gradient('+lagel+'deg'+backColor+')';
                    }

                     //字体颜色渐变
                      if(foregoundArr.ColorType == 'SolidColor'){
                              foreColor = '#' + foregoundArr.Data.Color.slice(3) + foregoundArr.Data.Color.slice(1, 3);
                              clipText = 'none'
                              backgroundColor = 'none'
                      }else{
                              // foreColor = 'transparent'
                               foreColor = '#000'
                              clipText = 'text'
                              backgroundColor = ''
                              lagel2 = foregoundArr.Data.Angel.toFixed(0)
                          for(var g=0;g<foregoundArr.Data.GradientStops.length;g++){
                              gradient2 = foregoundArr.Data.GradientStops[g]
                              backgroundColor = backgroundColor + ',' + gradient2.Color + ' ' + (gradient2.Offset*100).toFixed(0) + '%'
                          }
                              backgroundColor = '-webkit-linear-gradient('+lagel2+'deg'+backgroundColor+')';
                      }

                    var value = {
                    width:this.textblockData[i].PropertyList.Width,
                    height:this.textblockData[i].PropertyList.Height,
                    rotate:this.textblockData[i].PropertyList.RotateAngle,
                    top:this.textblockData[i].PropertyList.Top,
                    left:this.textblockData[i].PropertyList.Left,
                    opacity:this.textblockData[i].PropertyList.Opacity / 100,
                    FontSize:this.textblockData[i].PropertyList.FontSize,
                    family:this.textblockData[i].PropertyList.FontFamily,
                    BorderBrush:borderColor,
                    Background:backColor,
                    class:this.textblockData[i].Name,
                    MaxValue:InputDataList[j].MaxValue,
                    MinValue:InputDataList[j].MinValue,
                    TagName:InputDataList[j].TagName,
                    TagDataType:InputDataList[j].TagDataType,
                    text:'',
                    BorderThickness:this.textblockData[i].PropertyList.BorderThickness,
                    Shadow:Shadow,
                    inputWidth:'2',
                    Foreground:foreColor,
                    Blod:this.textblockData[i].PropertyList.Blod == 'True' ? 'bold' : '',
                    TextDecorations:this.textblockData[i].PropertyList.TextDecorations == 'False' ? 'none' : 'underline',
                    ZIndex:this.ZIndex
                  }
                  this.dataValue.push(value)
                  break;
                }else{
                    if(j == InputDataList.length-1){
                       //待优化
                      //阴影
                      Shadow = ''
                      if(borderSadow.InnerShadow != undefined){
                          InnerShadow = borderSadow.InnerShadow.OffsetX + 'px ' +  borderSadow.InnerShadow.OffsetY 
                                      + 'px ' +  borderSadow.InnerShadow.BlurRadius.toFixed(0) + 'px ' 
                                      +  borderSadow.InnerShadow.Color + ' inset'
                      }else{
                          InnerShadow = ''
                      }
                      if(borderSadow.OuterShadow != undefined){
                          OuterShadow = borderSadow.OuterShadow.OffsetX + 'px ' +  borderSadow.OuterShadow.OffsetY 
                                      + 'px ' +  borderSadow.OuterShadow.BlurRadius.toFixed(0) + 'px ' 
                                      +  borderSadow.OuterShadow.Color
                      }else{
                          OuterShadow = ''
                      }
                        if(InnerShadow.length && OuterShadow.length){
                          Shadow = InnerShadow + ',' + OuterShadow
                      }else if(InnerShadow.length == 0){
                          Shadow = OuterShadow
                      }else if(OuterShadow.length == 0){
                          Shadow = InnerShadow
                      }
                      //边框色渐变
                      if(borderbrushArr.ColorType == 'SolidColor'){
                          borderColor = '#' + borderbrushArr.Data.Color.slice(3) + borderbrushArr.Data.Color.slice(1, 3)
                      }else{
                              borderColor = ''
                              lagel1 = borderbrushArr.Data.Angel.toFixed(0)
                          for(var f2=0;f2<borderbrushArr.Data.GradientStops.length;f2++){
                              gradient1 = borderbrushArr.Data.GradientStops[f2]
                              borderColor = borderColor + ',' + gradient1.Color + ' ' + (gradient1.Offset*100).toFixed(0) + '%'
                          }
                              borderColor = '-webkit-linear-gradient('+lagel1+'deg'+borderColor+')';
                      }
                      //背景色渐变
                      if(backgroundArr.ColorType == 'SolidColor'){
                          backColor = '#' + backgroundArr.Data.Color.slice(3) + backgroundArr.Data.Color.slice(1, 3)
                          if(backgroundArr.Data.Color.slice(3) == 'FFFFFF' && backgroundArr.Data.Color.slice(1, 3) != "FF"){
                              backColor = '#FFFFFF' + backgroundArr.Data.Color.slice(1, 3)
                          }
                      }else{
                              backColor = ''
                              lagel = backgroundArr.Data.Angel.toFixed(0)
                          for(var h2=0;h2<backgroundArr.Data.GradientStops.length;h2++){
                              gradient = backgroundArr.Data.GradientStops[h2]
                              backColor = backColor + ',' + gradient.Color + ' ' + (gradient.Offset*100).toFixed(0) + '%'
                          }
                              backColor = '-webkit-linear-gradient('+lagel+'deg'+backColor+')';
                      }
                        //字体颜色渐变
                      if(foregoundArr.ColorType == 'SolidColor'){
                              foreColor = '#' + foregoundArr.Data.Color.slice(3) + foregoundArr.Data.Color.slice(1, 3);
                              clipText = 'none'
                              backgroundColor = 'none'
                      }else{
                              // foreColor = 'transparent'
                              foreColor = '#000'
                              clipText = 'text'
                              backgroundColor = ''
                              lagel2 = foregoundArr.Data.Angel.toFixed(0)
                          for(var g1=0;g1<foregoundArr.Data.GradientStops.length;g1++){
                              gradient2 = foregoundArr.Data.GradientStops[g1]
                              backgroundColor = backgroundColor + ',' + gradient2.Color + ' ' + (gradient2.Offset*100).toFixed(0) + '%'
                          }
                              backgroundColor = '-webkit-linear-gradient('+lagel2+'deg'+backgroundColor+')';
                      }
                            var value5 = {
                            width:this.textblockData[i].PropertyList.Width,
                            height:this.textblockData[i].PropertyList.Height,
                            rotate:this.textblockData[i].PropertyList.RotateAngle,
                            top:this.textblockData[i].PropertyList.Top,
                            left:this.textblockData[i].PropertyList.Left,
                            opacity:this.textblockData[i].PropertyList.Opacity / 100,
                            FontSize:this.textblockData[i].PropertyList.FontSize,
                            family:this.textblockData[i].PropertyList.FontFamily,
                            BorderBrush:borderColor,
                            Background:backColor,
                            class:this.textblockData[i].Name,
                            MaxValue:'',
                            MinValue:'',
                            TagName:'',
                            TagDataType:'',
                            text:'数值输入',
                            BorderThickness:this.textblockData[i].PropertyList.BorderThickness,
                            Shadow:Shadow,
                            inputWidth:'55',
                            Foreground:foreColor,
                            Blod:this.textblockData[i].PropertyList.Blod == 'True' ? 'bold' : '',
                            TextDecorations:this.textblockData[i].PropertyList.TextDecorations == 'False' ? 'none' : 'underline',
                            ZIndex:this.ZIndex
                          }
                          this.dataValue.push(value5)
                    }
                }
                
              }
            }else{
               //待优化
              //阴影
              Shadow = ''
              if(borderSadow.InnerShadow != undefined){
                  InnerShadow = borderSadow.InnerShadow.OffsetX + 'px ' +  borderSadow.InnerShadow.OffsetY 
                              + 'px ' +  borderSadow.InnerShadow.BlurRadius.toFixed(0) + 'px ' 
                              +  borderSadow.InnerShadow.Color + ' inset'
              }else{
                  InnerShadow = ''
              }
              if(borderSadow.OuterShadow != undefined){
                  OuterShadow = borderSadow.OuterShadow.OffsetX + 'px ' +  borderSadow.OuterShadow.OffsetY 
                              + 'px ' +  borderSadow.OuterShadow.BlurRadius.toFixed(0) + 'px ' 
                              +  borderSadow.OuterShadow.Color
              }else{
                  OuterShadow = ''
              }
                if(InnerShadow.length && OuterShadow.length){
                  Shadow = InnerShadow + ',' + OuterShadow
              }else if(InnerShadow.length == 0){
                  Shadow = OuterShadow
              }else if(OuterShadow.length == 0){
                  Shadow = InnerShadow
              }
                //边框色渐变
                if(borderbrushArr.ColorType == 'SolidColor'){
                    borderColor = '#' + borderbrushArr.Data.Color.slice(3) + borderbrushArr.Data.Color.slice(1, 3)
                }else{
                        borderColor = ''
                        lagel1 = borderbrushArr.Data.Angel.toFixed(0)
                    for(var f3=0;f3<borderbrushArr.Data.GradientStops.length;f3++){
                        gradient1 = borderbrushArr.Data.GradientStops[f3]
                        borderColor = borderColor + ',' + gradient1.Color + ' ' + (gradient1.Offset*100).toFixed(0) + '%'
                    }
                        borderColor = '-webkit-linear-gradient('+lagel1+'deg'+borderColor+')';
                }
               //背景色渐变
              if(backgroundArr.ColorType == 'SolidColor'){
                  backColor = '#' + backgroundArr.Data.Color.slice(3) + backgroundArr.Data.Color.slice(1, 3)
                  if(backgroundArr.Data.Color.slice(3) == 'FFFFFF' && backgroundArr.Data.Color.slice(1, 3) != "FF"){
                        backColor = '#FFFFFF' + backgroundArr.Data.Color.slice(1, 3)
                  }
              }else{
                      backColor = ''
                      lagel = backgroundArr.Data.Angel.toFixed(0)
                  for(var h3=0;h3<backgroundArr.Data.GradientStops.length;h3++){
                      gradient = backgroundArr.Data.GradientStops[h3]
                      backColor = backColor + ',' + gradient.Color + ' ' + (gradient.Offset*100).toFixed(0) + '%'
                  }
                      backColor = '-webkit-linear-gradient('+lagel+'deg'+backColor+')';
              }
              
               //字体颜色渐变
              if(foregoundArr.ColorType == 'SolidColor'){
                      foreColor = '#' + foregoundArr.Data.Color.slice(3) + foregoundArr.Data.Color.slice(1, 3);
                      clipText = 'none'
                      backgroundColor = 'none'
              }else{
                      // foreColor = 'transparent'
                      foreColor = '#000'
                      clipText = 'text'
                      backgroundColor = ''
                      lagel2 = foregoundArr.Data.Angel.toFixed(0)
                  for(var g2=0;g2<foregoundArr.Data.GradientStops.length;g2++){
                      gradient2 = foregoundArr.Data.GradientStops[g2]
                      backgroundColor = backgroundColor + ',' + gradient2.Color + ' ' + (gradient2.Offset*100).toFixed(0) + '%'
                  }
                      backgroundColor = '-webkit-linear-gradient('+lagel2+'deg'+backgroundColor+')';
              }
                    var value9 = {
                    width:this.textblockData[i].PropertyList.Width,
                    height:this.textblockData[i].PropertyList.Height,
                    rotate:this.textblockData[i].PropertyList.RotateAngle,
                    top:this.textblockData[i].PropertyList.Top,
                    left:this.textblockData[i].PropertyList.Left,
                    opacity:this.textblockData[i].PropertyList.Opacity / 100,
                    FontSize:this.textblockData[i].PropertyList.FontSize,
                    family:this.textblockData[i].PropertyList.FontFamily,
                    BorderBrush:borderColor,
                    Background:backColor,
                    class:this.textblockData[i].Name,
                    MaxValue:'',
                    MinValue:'',
                    TagName:'',
                    TagDataType:'',
                    text:'数值输入',
                    BorderThickness:this.textblockData[i].PropertyList.BorderThickness,
                    Shadow:Shadow,
                    inputWidth:'55',
                    Foreground:foreColor,
                    Blod:this.textblockData[i].PropertyList.Blod == 'True' ? 'bold' : '',
                    TextDecorations:this.textblockData[i].PropertyList.TextDecorations == 'False' ? 'none' : 'underline',
                    ZIndex:this.ZIndex
                  }
                  this.dataValue.push(value9)
            }
      }
        }
    }
}
</script>

<style lang="scss" scoped>
.TextBox11aa{
  display:inline-block;
}


.TextBox11aa:hover{
  background-color: #BEE6FD !important;
  background: #BEE6FD !important;
}

.TextBoxPop_outPop{
     width:380px;
     height:190px;
    box-shadow: 2px 2px 8px 2px rgba(0,0,0,0.03);
     position:absolute;
     left:0;
     right:0;
     top:0;
     bottom: 0;
     margin:auto;
     z-index: 98;
     background: #fff;
     .TextBoxPop_btn{
         overflow: hidden;
         margin-top:10px;
         .TextBoxPop_confirm{
             width:305px;
             height:30px;
             line-height: 30px;
              background: #F3E3AD;
             color:#ECAA4E;
             margin-left:30px;
             text-align: center;
             cursor: pointer;
         }
         .TextBoxPop_no{
             width:155px;
             height:30px;
             float: left;
              background: #E0E0E0;
              color:#8E8E8E;
              text-align: center;
              line-height: 30px;
              margin-left:22px;
              cursor: pointer;
         }
         .TextBoxPop_yes{
             width:155px;
             height:30px;
             float: left;
             background: #F3E3AD;
             color:#ECAA4E;
             margin-left:5px;
             text-align: center;
              line-height: 30px;
              cursor: pointer;
         }
     }
     .TextBoxPop_conter{
        //  font-size:16px;
        //  width:90%;
        //  margin:0 auto;
        //  height:100px;
        //  padding-top:27px;
        // //  text-align: center;
        // //  line-height: 100px;
        width: 100%;
        height: 58%;
        padding: 12px;
        display: flex;
        text-align: center;
        justify-content: center;
        align-items: center;
     }

     .TextBoxPop_outHead{
         width:100%;
         height:30px;
         background: #FFBC3D;
         text-align: center;
         line-height: 30px;

         .warning{
           color:#fff;
           margin-right:5px;
         }
         .text{
           font-size: 16px;
           color:#fff;
         }
     }

}

  .commerPop_outPop{
    width:360px;
    height:190px;
     box-shadow: 2px 2px 8px 2px rgba(0,0,0,0.1);
     position: absolute;
     left:0;
     right:0;
     top:260px;
     margin:auto;
     z-index: 99;
     background: #fff;
     .commerPop_btn{
         overflow: hidden;
         margin-top:10px;
         .commerPop_confirm{
             width:305px;
             height:30px;
             line-height: 30px;
              background: #F3E3AD;
             color:#ECAA4E;
             margin-left:30px;
             text-align: center;
             cursor: pointer;
         }
         .commerPop_no{
             width:155px;
             height:30px;
             float: left;
              background: #E0E0E0;
              color:#8E8E8E;
              text-align: center;
              line-height: 30px;
              margin-left:22px;
              cursor: pointer;
         }
         .commerPop_yes{
             width:155px;
             height:30px;
             float: left;
             background: #F3E3AD;
             color:#ECAA4E;
             margin-left:5px;
             text-align: center;
              line-height: 30px;
              cursor: pointer;
         }
     }
     .commerPop_conter{
         font-size:16px;
         width:100%;
         height:100px;
         text-align: center;
         line-height: 100px;
     }

     .commerPop_outHead{
         width:100%;
         height:30px;
         background: #FFBC3D;
         text-align: center;
         line-height: 30px;

         .warning{
           color:#fff;
           margin-right:5px;
         }
         .text{
           font-size: 16px;
           color:#fff;
         }
     }

}
</style>