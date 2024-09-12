<!--
 * @Description: 这是读写框页面（组件）
 * @Date: 2019-11-18 15:23:41
 * @Author: Tao
 * @LastEditors: Tao
 * @LastEditTime: 2021-02-24 13:18:14
 -->
<template>
<div>
   <Keycom :showkey='showkey' :keyclass='keyclass' :keytext='keytext' @getnum='getnum' @closeshow='closeshow'></Keycom>
    
  <div v-for="(item,index) in dataValue" :key="index">
    <div v-if="show" 
      @dblclick="opendb(item)" 
      @contextmenu.prevent 
      @mousedown="downClick(item,$event)" 
      @mouseup="seupClick(item,$event)"
      class="RWTextBox13a contenBox" type="text" 
      :style="'width:' + item.width + 'px; height:' +item.height + 'px; position:absolute; left:' 
      + item.left + 'px; top:' + item.top + 'px; transform:rotate(' + item.rotate + 'deg); opacity:' 
      + item.opacity + '; fontFamily:' + item.fontFamily + '; fontSize:' + item.FontSize + 'px; background:' 
      + item.BorderBrush + '; fontWeight:' + item.Blod +';boxSizing:border-box; padding:'+ item.BorderThickness 
      + 'px;overflow:hidden;white-space:nowrap;boxShadow:' + item.Shadow+';zIndex:'+item.ZIndex">

        <div class="conten" 
        :style="'width:100%;height:100%;background:' + item.Background + ';boxShadow:' 
        + item.Shadow + ';boxSizing:border-box;fontSize:' +item.FontSize + 'px'">
          <input autocomplete="off" 
          @focus="focusFun(item)" 
          @input="inputFun(item)" 
          @blur="blurFun(item)" 
          @keyup.enter="keupFun(item,$event)" 
          name="rwtextbox" :class="'aa'+item.class"  type="text" v-model="item.text" 
          :style="'height:' +(item.height -item.BorderThickness*2)+'px;border:none;width:'
          + (item.width - item.BorderThickness*2)+'px;background:transparent;textAlign:center;color:'
          + item.Foreground + ';fontWeight:' + item.Blod+';text-decoration:'+item.TextDecorations
          +';fontSize:'+item.FontSize + 'px'" />
        </div>
    </div>
  </div>
    <!-- 读写框数值是否符合提示弹窗 -->
    <div v-show="TextBoxShow" style="width:100%;height:100%;position:fixed;z-index:997">
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
     <!-- 权限弹窗 -->
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
          text:'读写值', //未知
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
          textBbockArr:[],
          cla:[],
          digit:[], //之前数值显示小数位
          digitArr:[], //后续补充恢复小数位
          TextBoxShow:false,
          TipsText:'',
          ValueArr:[],
          commerPopShow1:false,
          ZIndex:'',
          isOriginal:true,
          resData:[],  //初始化请求变量值
          varArr:[],   //变量名
          lang: JSON.parse(localStorage.getItem('languages'))[localStorage.getItem('currentLang')]
        }
    },
    props:['dae','dataId'],
    watch:{
      dae:{
        deep:true,
        handler(n,o){
          this.msgHub2 = window.$.connection.redisMonitor
          if(this.msgHub2){
            this.msgHub2.server.removeVariables(this.varArr)
          }
           this.data = n;
            if(this.data){
              setTimeout(()=>{
                this.ValueArr = []
                this.init();
              },200)
            }
        }
      }
    },
     destroyed(){
        this.msgHub2 = window.$.connection.redisMonitor
        if(this.msgHub2){
          this.msgHub2.server.removeVariables(this.varArr)
        }
      },
    mounted(){
      this.data = this.dae
      this.Name = 'rwtextbox'
      if(this.data){
        this.init()
      }
    },
    methods: {
      getPointNum(num, n) {
			 if(isNaN(num)||num===null){
		     return null
	         }else{
        
		     return Number(num).toFixed(n)
             }
		  },
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
     //确定
      Pop_ConfigFun(){
        document.querySelector('.TextBoxPop_outPop').style.display = 'none'
        document.querySelector('.TextBoxPop_conter').style.textAlign='none'
        this.TextBoxShow= false
      },

      //确认
      Jurisdiction(){
          this.commerPopShow1 = false
      },
    //权限配置请求接口
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
              this.$axios({                      
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
        //读写框变化禁止改变值
        inputFun(item){
          item.isShow = false
        },
        //读写框聚焦禁止改变值
        focusFun(item){
           item.isShow = false
        },
        //读写框离焦允许改变值
        blurFun(item){
          if(this.isOriginal){
            item.isShow = true
            //恢复原来值
            this.originalFun(item)
          }
        },
        //恢复原来值
      originalFun(item){
        for(let i=0;i<this.arr.length;i++){
              if(item.TagName == this.arr[i]){
                //是否有小数位
                for(let j=0;j<this.digitArr.length;j++){
                   if(this.digitArr[j].name == item.class){
                     if(this.digitArr[j].digit != null && this.digitArr[j].digit.length != 0){
                        item.text = this.getPointNum(Number(this.ValueArr[i]),this.digitArr[j].digit)
                     }else{
                       item.text = this.ValueArr[i]
                     }
                   }
                }

                //为日期格式恢复
                if(item.TagDataType == this.lang['日期']){
                  this.originalTimeFun(i,item,this.lang['日期'])
                }else if(item.TagDataType == this.lang['时间']){
                  this.originalTimeFun(i,item,this.lang['时间'])
                }else if(item.TagDataType == this.lang['日期时间']){
                  this.originalTimeFun(i,item,this.lang['日期时间'])
                }
                item.isShow = true
              }
        }
      },

      //还原时间方法
      originalTimeFun(i,item,type){
        let value = /Date/
        let valueShow = value.test(this.ValueArr[i])
        if(valueShow){
          let index = this.ValueArr[i].search("-")
          let value2 = this.ValueArr[i].slice(8,index-3)
          let time = this.timestampToTime(value2)
          if(type == this.lang['日期']){
              item.text = this.$moment(time).format('YYYY/MM/DD')
          }else if(type == this.lang['时间']){
            item.text = this.$moment(time).format('hh:mm:ss')
          }else if(type == this.lang['日期时间']){
            item.text = this.$moment(time).format('YYYY/MM/DD hh:mm:ss')
          }
        }else{
          if(type == this.lang['日期']){
              // item.text = this.$moment(this.ValueArr[i]).format('YYYY/MM/DD')
              item.text = this.ValueArr[i]
          }else if(type == this.lang['时间']){
            // let time = '2020/01/01 '+this.ValueArr[i]
            // item.text = this.$moment(time).format('hh:mm:ss')
            item.text = this.ValueArr[i]
          }else if(type == this.lang['日期时间']){
            // item.text = this.$moment(this.ValueArr[i]).format('YYYY/MM/DD hh:mm:ss')
            item.text = this.ValueArr[i]
          }
        }
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
          if(e.which == 1){   //鼠标左键松开
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
           }else if(e.which == 3){  //鼠标右键松开
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
          if(item1.ElementName == item.class){
            if(item1.IsPopupKeyboard){
             this.showkey = true;
            this.keytext = item.text
            }
       
          }
       })
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
          }else if(e.which == 3){  //鼠标右键按下
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
     },
      //鼠标双击
     opendb(item){
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
      //回车事件  下发
      keupFun(item,e){
         var value
         var arr = []
         if(item.TagName != ''){
           this.jurisdictionShow(item).then(val => { 
             
              if(this.CanExcuteShow){
                    this.commerPopShow1 = true
                    return
              }else{
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
                          this.isOriginal = false  //下发禁止离焦触发
                          //请求接口 //下发数据
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
                             if(res.data.data == true){
                          
                                 item.isShow = true
                                 this.isOriginal = false
                                //  setTimeout(()=>{
                                //     e.path[0].blur()
                                //  },300)
                             }else{
                                this.TextBoxShow = true
                                setTimeout(()=>{
                                  document.querySelector('.TextBoxPop_outPop').style.display='block'
                                  document.querySelector('.TextBoxPop_conter').style.textAlign='center'
                                  document.querySelector('.TextBoxPop_conter').innerHTML=this.lang.FormulaManage_HT_PleaseTryAgainIfYouFail
                                })
                                 this.isOriginal = true;
                               //恢复原来值
                                  setTimeout(()=>{
                                      e.path[0].blur()
                                  },300)
                             }
                           }).catch((error)=> {
                              this.TextBoxShow = true
                              setTimeout(()=>{
                                document.querySelector('.TextBoxPop_outPop').style.display='block'
                                document.querySelector('.TextBoxPop_conter').style.textAlign='center'
                                document.querySelector('.TextBoxPop_conter').innerHTML=this.lang.FormulaManage_HT_PleaseTryAgainIfYouFail
                              })
                               this.isOriginal = true;
                              //恢复原来值
                              setTimeout(()=>{
                                  e.path[0].blur()
                              },300)
                           });
                                  }else{
                         this.TextBoxShow = true
                              setTimeout(()=>{
                                document.querySelector('.TextBoxPop_outPop').style.display='block'
                                document.querySelector('.TextBoxPop_conter').style.textAlign='center'
                                document.querySelector('.TextBoxPop_conter').innerHTML=res1.data.msg
                              })
                              //恢复原来值
                               this.isOriginal = true;
                              setTimeout(()=>{
                                    e.path[0].blur()
                              },300)
                                  }
                               
                              })

                       }else{
                          this.TextBoxShow = true
                          setTimeout(()=>{
                            document.querySelector('.TextBoxPop_outPop').style.display='block'
                            // document.querySelector('.TextBoxPop_conter').innerHTML='请输入正确的【二进制变量】值，如true、false、0和1！'
                            document.querySelector('.TextBoxPop_conter').innerHTML=`${this.lang.SCMSExplorerData_ProtocolDataType_PECorrect}${this.lang['二进制变量']}${this.lang.SCMSExplorerData_ProtocolDataType_Bool}`

                          })
                       }
                   }else if(variableName == this.lang['有符号8位整型']){
                     this.judgeFun(item.text,127,-128,item.MaxValue,item.MinValue,variableName,item,'整',e)
                     return
                   }else if(variableName == this.lang['无符号8位整型']){
                      this.judgeFun(item.text,255,0,item.MaxValue,item.MinValue,variableName,item,'整',e)
                      return
                   }else if(variableName == this.lang['有符号16位整型']){
                       this.judgeFun(item.text,32767,-32768,item.MaxValue,item.MinValue,variableName,item,'整',e)
                       return
                   }else if(variableName == this.lang['无符号16位整型']){
                       this.judgeFun(item.text,65535,0,item.MaxValue,item.MinValue,variableName,item,'整',e)
                       return
           
                   }else if(variableName == this.lang['有符号32位整型']){
                       this.judgeFun(item.text,2147483647,-2147483648,item.MaxValue,item.MinValue,variableName,item,'整',e)
                       return
                   }else if(variableName == this.lang['无符号32位整型'] || variableName == this.lang['定时器']){
                       this.judgeFun(item.text,4294967295,0,item.MaxValue,item.MinValue,variableName,item,'整',e)
                       return
                   }else if(variableName == this.lang['有符号64位整型']){
                     this.judgeFun(item.text,9223372036854775807,-9223372036854775808,item.MaxValue,item.MinValue,variableName,item,'整',e)
                     return
                   }else if(variableName == this.lang['无符号64位整型']){
                      this.judgeFun(item.text,18446744073709551615,0,item.MaxValue,item.MinValue,variableName,item,'整',e)
                       return
                   }else if(variableName == this.lang['F32位浮点数IEEE754']){
                     this.judgeFun(item.text,3.40282347E+38,-3.40282347E+38,item.MaxValue,item.MinValue,variableName,item,'浮',e)
                     return
                   }else if(variableName == this.lang['F64位浮点数IEEE754']){
                     this.judgeFun(item.text,1.7976931348623157E+308,-1.7976931348623157E+308,item.MaxValue,item.MinValue,variableName,item,'浮',e)
                     return
                   }
                   else if(variableName == this.lang['日期']){
                        this.DateFun(item.text,variableName,item,e)
                        return
                   }else if(variableName == this.lang['时间']){
                     if(item.text==''){
                        this.TextBoxShow = true
                        setTimeout(()=>{
                          document.querySelector('.TextBoxPop_outPop').style.display='block'
                          // document.querySelector('.TextBoxPop_conter').innerHTML=`请输入正确的【时间】值，如12:00:00`
                          document.querySelector('.TextBoxPop_conter').innerHTML=`${this.lang.SCMSExplorerData_ProtocolDataType_PECorrect}${this.lang['时间']}${this.lang.SCMSExplorerData_ProtocolDataType_Time}`
                        })
                        return
                     }
                     var time = moment('2020-02-02 '+ item.text).format('LTS')
                        if(time == 'Invalid date'){
                           this.TextBoxShow = true
                           setTimeout(()=>{
                             document.querySelector('.TextBoxPop_outPop').style.display='block'
                            //  document.querySelector('.TextBoxPop_conter').innerHTML=`请输入正确的【时间】值，如12:00:00`
                            document.querySelector('.TextBoxPop_conter').innerHTML=`${this.lang.SCMSExplorerData_ProtocolDataType_PECorrect}${this.lang['时间']}${this.lang.SCMSExplorerData_ProtocolDataType_Time}`
                           })
                     }else{
                      let Max = item.MaxValue;
                       let Min = item.MinValue
                       if(Max){
                         Max = Number(Max)
                       }else{
                         Max = ''
                       }
                         if(Min){
                         Min = Number(Min)
                       }else{
                         Min = ''
                       }
                        var value4 = {
                             "Name":item.TagName,
                               "Value":time,
                               Max:Max,
                               Min:Min
                          }
                            arr.push(value4)
                            this.isOriginal = false  //下发禁止离焦触发
                          //请求接口 //下发数据
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
                              if(res.data.data==true){
                             
                                  item.isShow = true
                                  item.isOriginal = false
                                  // setTimeout(()=>{
                                  //     e.path[0].blur()
                                  // },300)
                              
                              }else{
                                  this.TextBoxShow = true
                                  setTimeout(()=>{
                                    document.querySelector('.TextBoxPop_outPop').style.display='block'
                                    document.querySelector('.TextBoxPop_conter').style.textAlign='center'
                                    document.querySelector('.TextBoxPop_conter').innerHTML=this.lang.FormulaManage_HT_PleaseTryAgainIfYouFail
                                  })
                                  //恢复原来值
                                   this.isOriginal = true;
                                  setTimeout(()=>{
                                      e.path[0].blur()
                                  },300)
                              }
                           }).catch((error)=> {
                             this.TextBoxShow = true
                              setTimeout(()=>{
                                document.querySelector('.TextBoxPop_outPop').style.display='block'
                                document.querySelector('.TextBoxPop_conter').style.textAlign='center'
                                document.querySelector('.TextBoxPop_conter').innerHTML=this.lang.FormulaManage_HT_PleaseTryAgainIfYouFail
                              })
                             //恢复原来值
                              this.isOriginal = true;
                                setTimeout(()=>{
                                    e.path[0].blur()
                                },300)
                           });
                                  }else{
                          this.TextBoxShow = true
                              setTimeout(()=>{
                                document.querySelector('.TextBoxPop_outPop').style.display='block'
                                document.querySelector('.TextBoxPop_conter').style.textAlign='center'
                                document.querySelector('.TextBoxPop_conter').innerHTML=res1.data.msg
                              })
                              //恢复原来值
                               this.isOriginal = true;
                              setTimeout(()=>{
                                    e.path[0].blur()
                              },300)
                                  }
                               
                              })

                     }
                      return
                   }else if(variableName == this.lang['日期时间']){
                     this.DateFun(item.text,variableName,item,e)
                     return
                   }else if(variableName == this.lang['字符串'] || variableName == this.lang['文本变量8位字符集'] || variableName == this.lang['文本变量16位字符集']   || variableName == this.lang['宽字符串']){
                    //  if(variableName == this.lang['文本变量8位字符集'] || variableName == this.lang['文本变量16位字符集']  ){
                    //     if(item.text.length>=2){
                    //        this.TextBoxShow = true
                    //             setTimeout(()=>{
                    //               document.querySelector('.TextBoxPop_outPop').style.display='block'
                    //               document.querySelector('.TextBoxPop_conter').style.textAlign='center'
                    //               document.querySelector('.TextBoxPop_conter').innerHTML=`请输入单个字符串的文本变量值!`
                    //             })
                    //            //恢复原来值
                    //             this.originalFun(item)
                    //     }
                    //   }

                          var value3 = {
                             "Name":item.TagName,
                             "Value":item.text
                          }
                            arr.push(value3)
                            this.isOriginal = false  //下发禁止离焦触发
                          //请求接口 //下发数据
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
                             if(res.data.data == true){
                            
                                 item.isShow = true
                                 this.isOriginal = false
                                //  setTimeout(()=>{
                                //       e.path[0].blur()
                                //   },300)
                             
                             }else{
                               this.TextBoxShow = true
                                setTimeout(()=>{
                                  document.querySelector('.TextBoxPop_outPop').style.display='block'
                                  document.querySelector('.TextBoxPop_conter').style.textAlign='center'
                                  document.querySelector('.TextBoxPop_conter').innerHTML=this.lang.FormulaManage_HT_PleaseTryAgainIfYouFail
                                })
                               //恢复原来值
                                this.isOriginal = true;
                                setTimeout(()=>{
                                      e.path[0].blur()
                                },300)
                             }
                           }).catch((error)=> {
                              this.TextBoxShow = true
                              setTimeout(()=>{
                                document.querySelector('.TextBoxPop_outPop').style.display='block'
                                document.querySelector('.TextBoxPop_conter').style.textAlign='center'
                                document.querySelector('.TextBoxPop_conter').innerHTML=this.lang.FormulaManage_HT_PleaseTryAgainIfYouFail
                              })
                               //恢复原来值
                                this.isOriginal = true;
                                setTimeout(()=>{
                                      e.path[0].blur()
                                },300)
                           });
                                  }else{
                         this.TextBoxShow = true
                              setTimeout(()=>{
                                document.querySelector('.TextBoxPop_outPop').style.display='block'
                                document.querySelector('.TextBoxPop_conter').style.textAlign='center'
                                document.querySelector('.TextBoxPop_conter').innerHTML=res1.data.msg
                              })
                              //恢复原来值
                               this.isOriginal = true;
                              setTimeout(()=>{
                                    e.path[0].blur()
                              },300)
                                  }
                               
                              })
                      
                           return
                   }
                  }
           })
         }
      },
           //下发接口
      tagAxios(arr,item,e){
                   //请求接口 //下发数据
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
                   if(res.data.data == true){
                         item.isShow = true
                         this.isOriginal = false  //下发允许离焦触发
                          // setTimeout(()=>{
                          //     e.path[0].blur()
                          // },300)
                   }else{
                       this.TextBoxShow = true
                       setTimeout(()=>{
                         document.querySelector('.TextBoxPop_outPop').style.display='block'
                         document.querySelector('.TextBoxPop_conter').style.textAlign='center'
                         document.querySelector('.TextBoxPop_conter').innerHTML=this.lang.FormulaManage_HT_PleaseTryAgainIfYouFail
                       })
                     //恢复原来值
                      this.isOriginal = true;
                      setTimeout(()=>{
                          e.path[0].blur()
                      },300)
                   }
                }).catch((error)=> {
                    this.TextBoxShow = true
                    setTimeout(()=>{
                      document.querySelector('.TextBoxPop_outPop').style.display='block'
                      document.querySelector('.TextBoxPop_conter').style.textAlign='center'
                      document.querySelector('.TextBoxPop_conter').innerHTML=this.lang.FormulaManage_HT_PleaseTryAgainIfYouFail
                    })
                    //恢复原来值
                     this.isOriginal = true;
                    setTimeout(()=>{
                        e.path[0].blur()
                    },300)
                });
                                  }else{
                this.TextBoxShow = true
                              setTimeout(()=>{
                                document.querySelector('.TextBoxPop_outPop').style.display='block'
                                document.querySelector('.TextBoxPop_conter').style.textAlign='center'
                                document.querySelector('.TextBoxPop_conter').innerHTML=res1.data.msg
                              })
                              //恢复原来值
                               this.isOriginal = true;
                              setTimeout(()=>{
                                    e.path[0].blur()
                              },300)
                                  }
                             })
             
      },
      //数值类型判断
      judgeFun(num,max,min,MaxValue,MinValue,TagType,item,type,e){
                var arr = []
           var text2 = Number(num)
       if(MaxValue){
             MaxValue = Number(MaxValue)
        }else{
          MaxValue = ''
        }
        if(MinValue){
             MinValue = Number(MinValue)
        }else{
          MinValue  = ''
        }
        var arr = []
           var text2 = Number(num)
      //      if(num.length == 0){
      //         this.TextBoxShow = true
      //         setTimeout(()=>{
      //           document.querySelector('.TextBoxPop_outPop').style.display='block'
      //           // document.querySelector('.TextBoxPop_conter').innerHTML=`请输入正确的【${TagType}】整数值，范围为：${min} - ${max}`
      //           document.querySelector('.TextBoxPop_conter').innerHTML=`${this.lang.SCMSExplorerData_ProtocolDataType_PECorrect}${TagType}${this.lang.SCMSExplorerData_ProtocolDataType_Integer}${min} - ${max}`
      //         })
      //        return
      //      }

      //      if(TagType==this.lang['F32位浮点数IEEE754'] || TagType==this.lang['F64位浮点数IEEE754'] || this.lang['无符号64位整型'] || this.lang['有符号64位整型']){
      //          this.CheckTagFun(TagType,num,MaxValue,MinValue).then(val=>{
      //            if(val){
      //               let value = {
      //                 "Name":item.TagName,
      //                 "Value":num
      //               }
      //               arr.push(value)
      //               this.isOriginal = false  //下发禁止离焦触发
      //               this.tagAxios(arr,item,e)
      //            }
      //          })

      //      }else if(isNaN(text2)){
      //         this.TextBoxShow = true
      //         setTimeout(()=>{
      //           document.querySelector('.TextBoxPop_outPop').style.display='block'
      //           // document.querySelector('.TextBoxPop_conter').innerHTML=`请输入正确的【${TagType}】整数值，范围为：${min} - ${max}`
      //           document.querySelector('.TextBoxPop_conter').innerHTML=`${this.lang.SCMSExplorerData_ProtocolDataType_PECorrect}${TagType}${this.lang.SCMSExplorerData_ProtocolDataType_Integer}${min} - ${max}`

      //         })
      //         return
      //      }
      //     if(text2 == '' && text2 != 0){
      //        this.TextBoxShow = true
      //        setTimeout(()=>{
      //          document.querySelector('.TextBoxPop_outPop').style.display='block'
      //         //  document.querySelector('.TextBoxPop_conter').innerHTML=`请输入正确的【${TagType}】整数值，范围为：${min} - ${max}`
      //         document.querySelector('.TextBoxPop_conter').innerHTML=`${this.lang.SCMSExplorerData_ProtocolDataType_PECorrect}${TagType}${this.lang.SCMSExplorerData_ProtocolDataType_Integer}${min} - ${max}`
      //        })
      //        return
      //     }
      //     if(text2 >= min && text2<= max){
      //       if(type == '整'){
      //         let indexNum = num.indexOf('.')
      //         if(indexNum != -1){
      //           this.TextBoxShow = true
      //             setTimeout(()=>{
      //                document.querySelector('.TextBoxPop_outPop').style.display='block'
      //               //  document.querySelector('.TextBoxPop_conter').innerHTML=`请输入正确的【${TagType}】整数值，范围为：${min} - ${max}`
      //               document.querySelector('.TextBoxPop_conter').innerHTML=`${this.lang.SCMSExplorerData_ProtocolDataType_PECorrect}${TagType}${this.lang.SCMSExplorerData_ProtocolDataType_Integer}${min} - ${max}`
      //             })
      //            return
      //         }
      //       }
      //        if(MaxValue != null){
      //          if(text2 > MaxValue){
      //             this.TextBoxShow = true
      //             setTimeout(()=>{
      //               document.querySelector('.TextBoxPop_outPop').style.display='block'
      //               // document.querySelector('.TextBoxPop_conter').innerHTML=`操作无效，输入值<${text2}>大于最大值<${MaxValue}>!`
      //               let msg = this.lang.HMI_HT_HMIUserControlViewModel_InputGreaterThanMaximumValue
      //               let firstL = msg.indexOf('<')
      //               let firstR = msg.indexOf('>') + 1
      //               let lastL = msg.lastIndexOf('<')
      //               let lastR = msg.lastIndexOf('>') + 1
      //               let str1 = msg.slice(firstL, firstR)
      //               let str2 = msg.slice(lastL, lastR)
      //               msg = msg.replace(str1, `<${text2}>`)
      //               msg = msg.replace(str2, `<${MaxValue}>`)
      //               document.querySelector('.TextBoxPop_conter').innerHTML=`${msg}`
      //             })
      //            return
      //          }
      //          if(text2 < MinValue){
      //             this.TextBoxShow = true
      //             setTimeout(()=>{
      //               document.querySelector('.TextBoxPop_outPop').style.display='block'
      //               // document.querySelector('.TextBoxPop_conter').innerHTML=`操作无效，输入值<${text2}>小于最小值<${MinValue}>!`
      //               let msg = this.lang.HMI_HT_HMIUserControlViewModel_InputLessThanMinimumValue
      //               let firstL = msg.indexOf('<')
      //               let firstR = msg.indexOf('>') + 1
      //               let lastL = msg.lastIndexOf('<')
      //               let lastR = msg.lastIndexOf('>') + 1
      //               let str1 = msg.slice(firstL, firstR)
      //               let str2 = msg.slice(lastL, lastR)
      //               msg = msg.replace(str1, `<${text2}>`)
      //               msg = msg.replace(str2, `<${MinValue}>`)
      //               document.querySelector('.TextBoxPop_conter').innerHTML=`${msg}`
      //             })
      //            return
      //          }
      //        }
              let value = {
                      "Name":item.TagName,
                      "Value":text2,
                       Min:MinValue,
                       Max:MaxValue,
                  }
                arr.push(value)
                this.isOriginal = false  //下发禁止离焦触发
             this.tagAxios(arr,item,e)
          // }else{
          //    this.TextBoxShow = true
          //    setTimeout(()=>{
          //      document.querySelector('.TextBoxPop_outPop').style.display='block'
          //     //  document.querySelector('.TextBoxPop_conter').innerHTML=`请输入正确的【${TagType}】整数值，范围为：${min} - ${max}`
          //       document.querySelector('.TextBoxPop_conter').innerHTML=`${this.lang.SCMSExplorerData_ProtocolDataType_PECorrect}${TagType}${this.lang.SCMSExplorerData_ProtocolDataType_Integer}${min} - ${max}`
          //    })
          // }
      },
           //校验64位数值类型
      CheckTagFun(type,text,max,min){
        return new Promise((resolve, reject) => {
            max = max == null?'':max
            min = min == null?'':min
             let type12 = ''
             let lang = JSON.parse(localStorage.getItem('languages'))[localStorage.getItem('currentLang')]
             console.log(lang)
             for(let i in lang){
          if(lang[i]==type11){
            type12 = i
        }
              }
              this.$axios({                      
                  method: 'post',
                  url: `/api/Base/CheckTag?y=${type12}&aValue=${text}&argMax=${max}&argMin=${min}`,
                  argType:type12,
                  argValue:text,
                  argMax:max,
                  argMin:min              
              }) .then(res => {
                if( res.data.code == 0){
                      resolve(true)
                }else{
                    this.TextBoxShow = true
                    setTimeout(()=>{
                      document.querySelector('.TextBoxPop_outPop').style.display='block'
                      document.querySelector('.TextBoxPop_conter').style.textAlign='center'
                      document.querySelector('.TextBoxPop_conter').innerHTML=`${res.data.msg}`
                    })
                      resolve(false)
                }
            })
          })
      },
       //日期格式判断
      DateFun(text,TagType,item,e){
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
            let timeYY =  this.$moment().format('YYYY')
            textValue = timeYY.slice(0,2) + textValue
           }
         }else if(index==3){
            var tt1 = textValue.slice(0,1)
            var tt2 = textValue.slice(1,2)
            var tt3 = textValue.slice(2,3)
            if(tt1 == 0&&tt2 == 0&&tt3 == 0){
                this.TextBoxShow = true
                setTimeout(()=>{
                  document.querySelector('.TextBoxPop_outPop').style.display='block'
                  if(TagType == this.lang['日期时间']){
                      // document.querySelector('.TextBoxPop_conter').innerHTML=`请输入正确的【${TagType}】值，如1999-01-01 00:00:00或1999.01.01 00:00:00`
                      document.querySelector('.TextBoxPop_conter').innerHTML=`${this.lang.SCMSExplorerData_ProtocolDataType_PECorrect}${TagType}${this.lang.SCMSExplorerData_ProtocolDataType_Datetime}`

                  }else{
                    // document.querySelector('.TextBoxPop_conter').innerHTML=`请输入正确的【${TagType}】值，如1999-01-01或1999.01.01`
                    document.querySelector('.TextBoxPop_conter').innerHTML=`${this.lang.SCMSExplorerData_ProtocolDataType_PECorrect}${TagType}${this.lang.SCMSExplorerData_ProtocolDataType_Date}`
                  }
                })
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
               setTimeout(()=>{
                 document.querySelector('.TextBoxPop_outPop').style.display='block'
                 if(TagType == this.lang['日期时间']){
                    // document.querySelector('.TextBoxPop_conter').innerHTML=`请输入正确的【${TagType}】值，如1999-01-01 00:00:00或1999.01.01 00:00:00`
                    document.querySelector('.TextBoxPop_conter').innerHTML=`${this.lang.SCMSExplorerData_ProtocolDataType_PECorrect}${TagType}${this.lang.SCMSExplorerData_ProtocolDataType_Datetime}`
                }else{
                  // document.querySelector('.TextBoxPop_conter').innerHTML=`请输入正确的【${TagType}】值，如1999-01-01或1999.01.01`
                  document.querySelector('.TextBoxPop_conter').innerHTML=`${this.lang.SCMSExplorerData_ProtocolDataType_PECorrect}${TagType}${this.lang.SCMSExplorerData_ProtocolDataType_Date}`
                }
               })
                return
            }
            if(tt4 == 0&&tt5 == 0){
              var dd1 = textValue.slice(1)
              textValue = '1' + dd1
              showV = true
            }
         }else if(index >=5){
            this.TextBoxShow = true
            setTimeout(()=>{
              document.querySelector('.TextBoxPop_outPop').style.display='block'
              if(TagType == this.lang['日期时间']){
                    //  document.querySelector('.TextBoxPop_conter').innerHTML=`请输入正确的【${TagType}】值，如1999-01-01 00:00:00或1999.01.01 00:00:00`
                    document.querySelector('.TextBoxPop_conter').innerHTML=`${this.lang.SCMSExplorerData_ProtocolDataType_PECorrect}${TagType}${this.lang.SCMSExplorerData_ProtocolDataType_Datetime}`
                 }else{
                    // document.querySelector('.TextBoxPop_conter').innerHTML=`请输入正确的【${TagType}】值，如1999-01-01或1999.01.01`
                    document.querySelector('.TextBoxPop_conter').innerHTML=`${this.lang.SCMSExplorerData_ProtocolDataType_PECorrect}${TagType}${this.lang.SCMSExplorerData_ProtocolDataType_Date}`
                 }
            })
             return
         }
         var a
          if(TagType == this.lang['日期时间']){
             var f = /:/
             a = moment(textValue).format('YYYY/MM/DD HH:mm:ss')
             var aindex = f.test(textValue)
             if(aindex == -1){
               a = a + ' 00:00:00'
             }
          }else{
             a = moment(textValue).format('YYYY/MM/DD')
          }
          if(a == 'Invalid date'){
             this.TextBoxShow = true
             setTimeout(()=>{
               document.querySelector('.TextBoxPop_outPop').style.display='block'
               if(TagType == this.lang['日期时间']){
                    //  document.querySelector('.TextBoxPop_conter').innerHTML=`请输入正确的【${TagType}】值，如1999-01-01 00:00:00或1999.01.01 00:00:00`
                    document.querySelector('.TextBoxPop_conter').innerHTML=`${this.lang.SCMSExplorerData_ProtocolDataType_PECorrect}${TagType}${this.lang.SCMSExplorerData_ProtocolDataType_Datetime}`
                }else{
                  // document.querySelector('.TextBoxPop_conter').innerHTML=`请输入正确的【${TagType}】值，如1999-01-01或1999.01.01`
                  document.querySelector('.TextBoxPop_conter').innerHTML=`${this.lang.SCMSExplorerData_ProtocolDataType_PECorrect}${TagType}${this.lang.SCMSExplorerData_ProtocolDataType_Date}`
                }
             })
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
                this.isOriginal = false  //下发禁止离焦触发
               //请求接口  //下发数据
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
                  if(res.data.data == true){
                 
                      this.isOriginal = false
                      item.isShow = true
                      // setTimeout(()=>{
                      //     e.path[0].blur()
                      // },300)
                   
                  }else{
                    this.TextBoxShow = true
                    setTimeout(()=>{
                      document.querySelector('.TextBoxPop_outPop').style.display='block'
                      document.querySelector('.TextBoxPop_conter').style.textAlign='center'
                      document.querySelector('.TextBoxPop_conter').innerHTML=this.lang.FormulaManage_HT_PleaseTryAgainIfYouFail
                    })
                     //恢复原来值
                      this.isOriginal = true;
                     setTimeout(()=>{
                          e.path[0].blur()
                      },300)
                  }
                }).catch((error)=> {
                    this.TextBoxShow = true
                    setTimeout(()=>{
                      document.querySelector('.TextBoxPop_outPop').style.display='block'
                      document.querySelector('.TextBoxPop_conter').style.textAlign='center'
                      document.querySelector('.TextBoxPop_conter').innerHTML=this.lang.FormulaManage_HT_PleaseTryAgainIfYouFail
                    })
                     //恢复原来值
                      this.isOriginal = true;
                       setTimeout(()=>{
                          e.path[0].blur()
                      },300)
                });
                                  }else{
                          this.TextBoxShow = true
                              setTimeout(()=>{
                                document.querySelector('.TextBoxPop_outPop').style.display='block'
                                document.querySelector('.TextBoxPop_conter').style.textAlign='center'
                                document.querySelector('.TextBoxPop_conter').innerHTML=res1.data.msg
                              })
                              //恢复原来值
                               this.isOriginal = true;
                              setTimeout(()=>{
                                    e.path[0].blur()
                              },300)
                                  }
                               
                              })

          }
      },

      init(){
        //数据筛选
        this.textblockData = []
        var dataAll = this.data.Controls.ControlList
        this.cla = []
        for(var i=0;i<dataAll.length;i++){
        if(dataAll[i].ControlType == this.Name){
            this.textblockData.push(dataAll[i])
            this.cla.push(dataAll[i].Name)
          }
        }
     if(this.textblockData.length!=0){
          this.show = true
      }else{
          this.show = false
      }
      //赋值
        this.gitValue()
      if(this.show){
         this.axio();
         this.JoinVarFun();
      }
      },
     //排序
       compare(property){
            return function(a,b){
                var value1 = a[property];
                var value2 = b[property];
                return value1 - value2;
            }
        },
         //加入变量   主页面也有加入变量
      JoinVarFun(){
        this.arrFun()
        let arr  = []
        arr = new Set(this.arr)
        arr = [...arr]
        this.varArr = arr
        this.msgHub2 = window.$.connection.redisMonitor
        if(this.msgHub2){
          this.msgHub2.server.addVariables(arr)
        }  
      },

      //筛选变量组方法
      arrFun(){
        this.data = this.dae
        let arr = []
        this.textBbockArr = []
        this.textBType= []
        this.digit = []
        this.digitArr = []
        for(var i=0;i<this.data.Data.RWDataList.length;i++){
          var a = this.cla.indexOf(this.data.Data.RWDataList[i].ElementName)
           if(a != -1){
                const value = {
                  name:this.data.Data.RWDataList[i].ElementName,
                  digit:this.data.Data.RWDataList[i].DecimalCount
                }
                arr.push(this.data.Data.RWDataList[i].TagName)
                this.digit.push(this.data.Data.RWDataList[i].DecimalCount)
                this.digitArr.push(value)
                this.textBbockArr.push(this.data.Data.RWDataList[i].ElementName)
                this.textBType.push(this.data.Data.RWDataList[i].TagDataType)
           }     
        }
        this.dataAnimationList = []
        this.dataAnimationList = this.data.Data.DataStatusTextColorEffectAnimationList
        this.dataAnimationList2 = this.textblockData
        this.arr = arr
      },

       //Date  type判断 时间戳"\/Date(1562601600000-0000)\/"和字符串 俩种格式判断
      timeDateFun(num1,DataValue,ind,dataTextColorList,DefaultColor,Dom,type){
        var time
        if(type){
          var index = num1.search("-")
          var value2 = num1.slice(8,index-3)
          time = this.timestampToTime(value2)

        }else{
          time = num1
        }
       

            if(this.textBType[ind] == this.lang['日期时间']){
                if(this.ValueArr[ind] != DataValue){
                      var index9 = this.cla.indexOf(this.textBbockArr[ind])
                      if(this.dataValue[index9] != undefined){
                        if(this.dataValue[index9].isShow){
                        this.dataValue[index9].text = time
                          // this.dataValue[index9].text =  this.$moment(time).format('YYYY/MM/DD hh:mm:ss')
                        }
                      }
                    }
                    if(this.DataAnima[ind].HasColorEffect){
                      for(var w2=0;w2<this.dataAnimationList.length;w2++){
                        if(this.textBbockArr[ind] == this.dataAnimationList[w2].ElementName){
                            dataTextColorList.push(this.dataAnimationList[w2])
                        }
                          if(this.textBbockArr[ind] == this.dataAnimationList2[ind].Name){
                              var color5 = JSON.parse(this.dataAnimationList2[ind].PropertyList.Foreground)
                              if(color5.Data.Color == undefined){
                                DefaultColor = '#000'
                              }else{
                                DefaultColor = '#' + color5.Data.Color.slice(3) + color5.Data.Color.slice(1,3)
                              }
                          }
                      }
                        dataTextColorList = dataTextColorList.sort(this.compare('NO'))
                      for(var y2=0;y2<dataTextColorList.length;y2++){
                          this.timeColorFun(time,dataTextColorList[y2],Dom,DefaultColor)
                      }
                    }
                
            }else if(this.textBType[ind] == this.lang['日期']){   
              if(this.ValueArr[ind] != DataValue){
                var index10 = this.cla.indexOf(this.textBbockArr[ind])
                if(this.dataValue[index10] != undefined){
                  if(this.dataValue[index10].isShow){
                    // this.dataValue[index10].text = this.$moment(time).format('YYYY/MM/DD')
                    this.dataValue[index10].text = time
                  }
                }
              }
                  if(this.DataAnima[ind].HasColorEffect){
                    for(var w3=0;w3<this.dataAnimationList.length;w3++){
                      if(this.textBbockArr[ind] == this.dataAnimationList[w3].ElementName){
                          //默认色
                          dataTextColorList.push(this.dataAnimationList[w3])
                      }
                        if(this.textBbockArr[ind] == this.dataAnimationList2[ind].Name){
                              var color4 = JSON.parse(this.dataAnimationList2[ind].PropertyList.Foreground)
                              if(color4.Data.Color == undefined){
                                  DefaultColor = '#000'
                              }else{
                                DefaultColor = '#' + color4.Data.Color.slice(3) + color4.Data.Color.slice(1,3)
                              }
                          }
                    }
                      dataTextColorList = dataTextColorList.sort(this.compare('NO'))
                    for(var y3=0;y3<dataTextColorList.length;y3++){
                        this.timeColorFun(time,dataTextColorList[y3],Dom,DefaultColor)
                    }
                  }
              
            }else if(this.textBType[ind] == this.lang['时间']){
                  if(this.ValueArr[ind] != DataValue){
                    var index11 = this.cla.indexOf(this.textBbockArr[ind])
                    if(this.dataValue[index11]){
                        // if(type == false){
                          // time = '2020/01/01 '+time
                        // }
                        if(this.dataValue[index11].isShow){
                        // this.dataValue[index11].text = this.$moment(time).format('hh:mm:ss')
                        this.dataValue[index11].text = time
                        }
                    }
                  }
                      if(this.DataAnima[ind].HasColorEffect){
                        for(var w4=0;w4<this.dataAnimationList.length;w4++){
                          if(this.textBbockArr[ind] == this.dataAnimationList[w4].ElementName){
                            //默认色
                              dataTextColorList.push(this.dataAnimationList[w4])
                          }
                            if(this.textBbockArr[ind] == this.dataAnimationList2[ind].Name){
                              var color3 = JSON.parse(this.dataAnimationList2[ind].PropertyList.Foreground)
                              if(color3.Data.Color == undefined){
                                  DefaultColor = '#000'
                              }else{
                                DefaultColor = '#' + color3.Data.Color.slice(3) + color3.Data.Color.slice(1,3)
                              }
                          }
                        }
                          dataTextColorList = dataTextColorList.sort(this.compare('NO'))
                        for(var y4=0;y4<dataTextColorList.length;y4++){
                            this.timeColorFun(time,dataTextColorList[y4],Dom,DefaultColor)
                        }
                      }
            }else{
              if(this.ValueArr[ind] != DataValue){
                  var index12 = this.cla.indexOf(this.textBbockArr[ind])
                  if(this.dataValue[index12] != undefined){
                    
                    if(this.dataValue[index12].isShow){
                      this.dataValue[index12].text = time
                    }
                  }
              }
                  if(this.DataAnima[ind].HasColorEffect){
                    for(var w5=0;w5<this.dataAnimationList.length;w5++){
                          if(this.textBbockArr[ind] == this.dataAnimationList[w5].ElementName){
                              dataTextColorList.push(this.dataAnimationList[w5])
                          }
                          if(this.textBbockArr[ind] == this.dataAnimationList2[ind].Name){
                          var color2 = JSON.parse(this.dataAnimationList2[ind].PropertyList.Foreground)
                          if(color2.Data.Color == undefined){
                              DefaultColor = '#000'
                            }else{
                              DefaultColor = '#' + color2.Data.Color.slice(3) + color2.Data.Color.slice(1,3)
                            }
                        }
                        }
                        dataTextColorList = dataTextColorList.sort(this.compare('NO'))
                        for(var y5=0;y5<dataTextColorList.length;y5++){
                            this.timeColorFun(time,dataTextColorList[y5],Dom,DefaultColor)
                        }
                  }
              }
      },

       //条件判断方法
      judgeFun1(data){
          this.ElementNameHas = ['1']
              if(data.length){
                for(var i=0;i<this.textBbockArr.length;i++){
                  var Dom = '.aa' + this.textBbockArr[i]
                   //默认色
                  var DefaultColor = ''
                  var dataTextColorList = []
                  if(this.digit[i] != null && this.digit[i].length != 0){
                   var fix = Number(this.digit[i])
                   var num = data[i].Value
                   Number(num).toFixed(fix)
                        var numText = document.querySelector(Dom).value
                          if(data[i].Value == null){
                                 document.querySelector(Dom).value = '???'
                                 var index155 = this.cla.indexOf(this.textBbockArr[i])
                                 if(this.dataValue[index155] != undefined){
                                   this.dataValue[index155].text = '???'
                                 }
                          }else{
                            if(this.ValueArr[i] != data[i].Value){
                                var index8 = this.cla.indexOf(this.textBbockArr[i])
                                if(this.dataValue[index8] != undefined){
                                  if(this.dataValue[index8].isShow){
                                      this.dataValue[index8].text = this.getPointNum(Number(num),toFixed(fix))
                                  }
                                }
                              }
                                 if(this.DataAnima[i].HasColorEffect){
                                   for(var w=0;w<this.dataAnimationList.length;w++){
                                     if(this.textBbockArr[i] == this.dataAnimationList[w].ElementName){
                                         dataTextColorList.push(this.dataAnimationList[w])
                                     }
                                      if(this.textBbockArr[i] == this.dataAnimationList2[i].Name){
                                                var color6 = JSON.parse(this.dataAnimationList2[i].PropertyList.Foreground)
                                                if(color6.Data.Color == undefined){
                                                    DefaultColor = '#000'
                                                }else{
                                                  DefaultColor = '#' + color6.Data.Color.slice(3) + color6.Data.Color.slice(1,3)
                                                }
                                            }
                                   }
                                   dataTextColorList = dataTextColorList.sort(this.compare('NO'))
                                   for(var y=0;y<dataTextColorList.length;y++){
                                       this.textColorFun(data[i].Value,dataTextColorList[y],Dom,DefaultColor)
                                   }
                                 }
                          }
                  }else{
                    var num1 = data[i].Value
                    var value = /Date/
                    var valueShow = value.test(num1)
                     if(valueShow){
                         this.timeDateFun(num1,data[i].Value,i,dataTextColorList,DefaultColor,Dom,valueShow)
                     }else{
                          if(data[i].Value == null){
                               var index133 = this.cla.indexOf(this.textBbockArr[i])
                               if(this.dataValue[index133] != undefined){
                                 this.dataValue[index133].text = '???'
                               }
                          }else{
                            if(this.ValueArr[i] != data[i].Value){
                              var Value13 =   data[i].Value == null ? '???' : data[i].Value
                              var value14 = data[i].Value == null ? '???' : data[i].Value
                              var index13 = this.cla.indexOf(this.textBbockArr[i])
                              if(this.dataValue[index13] != undefined){
                                if(this.dataValue[index13].isShow == true){
                                  this.dataValue[index13].text = value14
                                }
                              }
                            }
                            if(this.DataAnima[i].HasColorEffect){
                              for(var w1=0;w1<this.dataAnimationList.length;w1++){
                                  if(this.textBbockArr[i] == this.dataAnimationList[w1].ElementName){
                                      dataTextColorList.push(this.dataAnimationList[w1])
                                  }
                                  if(this.textBbockArr[i] == this.dataAnimationList2[i].Name){
                                    var color1 = JSON.parse(this.dataAnimationList2[i].PropertyList.Foreground)
                                    if(color1.Data.Color == undefined){
                                          DefaultColor = '#000'
                                    }else{
                                          DefaultColor = '#' + color1.Data.Color.slice(3) + color1.Data.Color.slice(1,3)
                                    }
                                  }
                              }
                                dataTextColorList = dataTextColorList.sort(this.compare('NO'))
                                for(var y1=0;y1<dataTextColorList.length;y1++){
                                    this.textColorFun(data[i].Value,dataTextColorList[y1],Dom,DefaultColor)
                                }
                            }
                            
                            this.timeDateFun(num1,data[i].Value,i,dataTextColorList,DefaultColor,Dom,valueShow)

                          }
                     }
                  }
                }
                var ValueArr1 = []
                for(var e=0;e<this.textBbockArr.length;e++){
                   ValueArr1.push(data[e].Value)
                }
                this.ValueArr = ValueArr1
              }
      },

      //数值请求
      axio(){
        this.resData = []
        this.DataAnima = this.data.Data.RWDataList
        this.arrFun()
        //请求接口
        this.$axios({
          method:"post",
          url:"/api/Base/PostRediusTest?varNameString=" + name,
          data:this.arr
        }).then((res)=>{
            this.resData.push(res.data.data)
            this.judgeFun1(res.data.data)
        }).catch(function (error) {
                console.log('err',error);
        })
      },
      //websocket触发该方法
      axioImg2(resArr){
        if(this.arr){
          let index = this.arr.indexOf(resArr.name)
          let resShow = false
          if(index != -1){
            for(let i=0;i<this.resData[0].length;i++){
              if(this.resData[0][i].Name == this.arr[index]){
                resShow = this.resData[0][i].Value.toString() == resArr.value.toString()?false:true
              }
            }
          }
          if(!resShow){
            return
          }
        }
        if(this.resData.length){
          for(let z=0;z<this.resData[0].length;z++){
            if(resArr.name == this.resData[0][z].Name){
              this.resData[0][z].Value = resArr.value
            }
          }
          this.judgeFun1(this.resData[0]) 
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
          var RWDataList = this.data.Data.RWDataList
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
          if(RWDataList.length != 0 ){
            for(var j=0;j<RWDataList.length;j++){
               if(RWDataList[j].ElementName == this.textblockData[i].Name){
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
                              + borderSadow.OuterShadow.Color
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
                    borderColor = '#FFFFFF' + backgroundArr.Data.Color.slice(1, 3)
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
                   Foreground:foreColor,
                   Background:backColor,
                   class:this.textblockData[i].Name,
                   Blod:this.textblockData[i].PropertyList.Blod == 'True' ? 'bold' : '',
                   MaxValue:RWDataList[j].MaxValue,
                   MinValue:RWDataList[j].MinValue,
                   TagName:RWDataList[j].TagName,
                   TagDataType:RWDataList[j].TagDataType,
                   text:'Loading...',
                   backgroundColor:backgroundColor,
                   BorderBrush:borderColor,
                   BorderThickness:this.textblockData[i].PropertyList.BorderThickness,
                   Shadow:Shadow,
                   TextDecorations:this.textblockData[i].PropertyList.TextDecorations == 'False' ? 'none' : 'underline',
                   ZIndex:this.ZIndex,
                   isShow:true
                 }
                 this.dataValue.push(value)
                 break;
               }else{
                  if(j == RWDataList.length-1){
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
                                      + borderSadow.OuterShadow.Color
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
                              borderColor = '#FFFFFF' + backgroundArr.Data.Color.slice(1, 3)
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
                          for(var g2=0;g2<foregoundArr.Data.GradientStops.length;g2++){
                              gradient2 = foregoundArr.Data.GradientStops[g2]
                              backgroundColor = backgroundColor + ',' + gradient2.Color + ' ' + (gradient2.Offset*100).toFixed(0) + '%'
                          }
                              backgroundColor = '-webkit-linear-gradient('+lagel2+'deg'+backgroundColor+')';
                      }
                        var value4 = {
                          width:this.textblockData[i].PropertyList.Width,
                          height:this.textblockData[i].PropertyList.Height,
                          rotate:this.textblockData[i].PropertyList.RotateAngle,
                          top:this.textblockData[i].PropertyList.Top,
                          left:this.textblockData[i].PropertyList.Left,
                          opacity:this.textblockData[i].PropertyList.Opacity / 100,
                          FontSize:this.textblockData[i].PropertyList.FontSize,
                          family:this.textblockData[i].PropertyList.FontFamily,
                          Foreground:foreColor,
                          Background:backColor,
                          class:this.textblockData[i].Name,
                          Blod:this.textblockData[i].PropertyList.Blod == 'True' ? 'bold' : '',
                          MaxValue:'',
                          MinValue:'',
                          TagName:'',
                          TagDataType:'',
                          text:'读写框',
                          backgroundColor:backgroundColor,
                          BorderBrush:borderColor,
                          BorderThickness:this.textblockData[i].PropertyList.BorderThickness,
                          Shadow:Shadow,
                          TextDecorations:this.textblockData[i].PropertyList.TextDecorations == 'False' ? 'none' : 'underline',
                          ZIndex:this.ZIndex,
                          isShow:true
                        }
                        this.dataValue.push(value4)
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
                              + borderSadow.InnerShadow.Color + ' inset'
              }else{
                  InnerShadow = ''
              }
              if(borderSadow.OuterShadow != undefined){
                  OuterShadow = borderSadow.OuterShadow.OffsetX + 'px ' +  borderSadow.OuterShadow.OffsetY 
                              + 'px ' +  borderSadow.OuterShadow.BlurRadius.toFixed(0) + 'px ' 
                              + borderSadow.OuterShadow.Color
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
                    borderColor = '#FFFFFF' + backgroundArr.Data.Color.slice(1, 3)
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
                  for(var g3=0;g3<foregoundArr.Data.GradientStops.length;g3++){
                      gradient2 = foregoundArr.Data.GradientStops[g3]
                      backgroundColor = backgroundColor + ',' + gradient2.Color + ' ' + (gradient2.Offset*100).toFixed(0) + '%'
                  }
                      backgroundColor = '-webkit-linear-gradient('+lagel2+'deg'+backgroundColor+')';
              }
                 var value2 = {
                   width:this.textblockData[i].PropertyList.Width,
                   height:this.textblockData[i].PropertyList.Height,
                   rotate:this.textblockData[i].PropertyList.RotateAngle,
                   top:this.textblockData[i].PropertyList.Top,
                   left:this.textblockData[i].PropertyList.Left,
                   opacity:this.textblockData[i].PropertyList.Opacity / 100,
                   FontSize:this.textblockData[i].PropertyList.FontSize,
                   family:this.textblockData[i].PropertyList.FontFamily,
                   Foreground:foreColor,
                   Background:backColor,
                   class:this.textblockData[i].Name,
                   Blod:this.textblockData[i].PropertyList.Blod == 'True' ? 'bold' : '',
                   MaxValue:'',
                   MinValue:'',
                   TagName:'',
                   TagDataType:'',
                   text:'读写框',
                   backgroundColor:backgroundColor,
                   BorderBrush:borderColor,
                   BorderThickness:this.textblockData[i].PropertyList.BorderThickness,
                   Shadow:Shadow,
                   TextDecorations:this.textblockData[i].PropertyList.TextDecorations == 'False' ? 'none' : 'underline',
                   ZIndex:this.ZIndex,
                   isShow:true
                 }
                 this.dataValue.push(value2)
          }
    
      }
        },
      //时间戳转时间
      timestampToTime(timestamp) {
        var date1 = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
          var year = date1.getFullYear();
          var month = date1.getMonth() + 1;
          var mothe = date1 > 9 ? month : '0' + month
            var date = date1.getDate();
            var da = date >9 ? date : '0' + date
            var h = date1.getHours(); //获取当前小时数(0-23)
            var he = h > 9 ? h : '0' + h
            var m = date1.getMinutes(); //获取当前分钟数(0-59)
            var me = m > 9 ? m : '0' + m
            var s = date1.getSeconds();
            var se = s > 9 ? s : '0' + s
          return  year + '/' + mothe + '/' + da + ' ' + he + ':' + me + ':' +se
        },
        //时间颜色改变
        timeColorFun(Value,textColorListArr,Dom,DefaultColor){
              var result
              var resValue = textColorListArr.Compare
              var Runsymbol =  textColorListArr.Condition
              var resValueNumber = Value
               if(Runsymbol == '=='){
                result = resValue == resValueNumber ? true :false 
              }else if(Runsymbol == '!='){
                result = resValue != resValueNumber ? true :false 
              }
              var dd = this.ElementNameHas.indexOf(textColorListArr.ElementName)
              if(dd != -1){
                return
              }
               if(result){
                  this.ElementNameHas.push(textColorListArr.ElementName)
                  document.querySelector(Dom).style.color =  textColorListArr.Color
              }else{
                  if(DefaultColor != ''){
                    document.querySelector(Dom).style.color = DefaultColor       
                  }else{
                    document.querySelector(Dom).style.color = '#000'       
                  }
            }
        },
       //数值，字符串颜色改变
        textColorFun(Value,textColorListArr,Dom,DefaultColor){
              var result
              var resValue
              var Runsymbol
              var ArrValue
              var resValueNumber = Value
              resValue = Value.toLowerCase()
              ArrValue = textColorListArr.Compare == null ?  textColorListArr.Compare : textColorListArr.Compare.toLowerCase()
              Runsymbol = textColorListArr.Condition
               if(resValue == 'TRUE' || resValue == 'True' || resValue == 'true'){
                  resValue = 1
              }else if(resValue == 'FALSE' || resValue =='False' || resValue =='false'){
                  resValue = 0
              }else if(isNaN(resValueNumber)&&!isNaN(Date.parse(resValueNumber))){
                    resValue = Value
              }else if(typeof(Number(resValueNumber)) == 'number'&&Number(resValueNumber)){
                resValue = Number(Value)
              }else{
                resValue = Value
              }
               if(ArrValue == 'TRUE' || ArrValue == 'True' || ArrValue == 'true' ){
                  ArrValue =  1
              }else if(ArrValue == 'FALSE' || ArrValue =='False' || ArrValue =='false'){
                ArrValue =  0
              }
              else if(isNaN(resValueNumber)&&!isNaN(Date.parse(resValueNumber))){
                    ArrValue =  textColorListArr.Compare
              }else if(typeof(Number(resValueNumber)) == 'number'){
                ArrValue = Number( textColorListArr.Compare)
              }else{
                ArrValue =  textColorListArr.Compare
              }
              if(Runsymbol == '=='){
                result = resValue == ArrValue ? true :false 
              }else if(Runsymbol == '>'){
                result = resValue > ArrValue ? true :false 
              }else if(Runsymbol == '<'){
                result = resValue < ArrValue ? true :false 
              }else if(Runsymbol == '<='){
                result = resValue <= ArrValue ? true :false 
              }else if(Runsymbol == ">="){
                result = resValue >= ArrValue ? true :false 
              }else if(Runsymbol == '!='){
                result = resValue != ArrValue ? true :false 
              }
               var continue1 = false
              var dd = this.ElementNameHas.indexOf(textColorListArr.ElementName)
              if(dd != -1){
                return
              }

              if(result){
                this.ElementNameHas.push(textColorListArr.ElementName)
                document.querySelector(Dom).style.color =  textColorListArr.Color
              }else{
                if(DefaultColor != ''){
                  document.querySelector(Dom).style.color = DefaultColor       
                }else{
                    document.querySelector(Dom).style.color = '#000'       
                }   
            }
        },
    }
}
</script>
<style lang="scss" scoped>
.RWTextBox13a{
  display:inline-block;
}
.RWTextBox13a:hover{
  background-color: #BEE6FD !important;
  background: #BEE6FD !important;
}
.TextBoxPop_outPop{
     display: none;
     width:380px;
     height:190px;
     box-shadow: 2px 2px 8px 2px rgba(0,0,0,0.03);
     position: absolute;
     left:0;
     right:0;
     top:0;
     bottom:0;
     margin:auto;
     z-index: 998;
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
         font-size:16px;
        //  width:90%;
         margin:0 auto;
         height:100px;
         padding-top:27px;
        display: flex;
        align-items: center;
        justify-content: center;
        // width: 100%;
        // height: 58%;
        // padding: 12px;
        // display: flex;
        // text-align: center;
        // justify-content: center;
        // align-items: center;
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