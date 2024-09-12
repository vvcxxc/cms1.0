<!--
 * @Description: 这是开关页面（组件）
 * @Date: 2019-11-13 15:34:44
 * @Author: Tao
 * @LastEditors: Tao
 * @LastEditTime: 2021-02-22 15:50:33
 -->
<template>
<div>
      <div v-for="(item,index) in dataValue" :key="index">
        <div v-if="show" 
        @contextmenu.prevent 
        @mousedown="downClick(item,$event)" 
        @mouseup="seupClick(item,$event)"  
        @click.stop="switchFun($event,item)" 
        name="switch" :class="item.class" class="Switch8a switch-btn" 
        :style="'position:absolute; left:' + item.left + 'px; top:' + item.top + 'px; width:' 
        + item.width + 'px; height:' + item.height + 'px; opacity:' + item.opacity+';transform:rotate(' + item.rotate + 'deg);zIndex:'+item.ZIndex">
                
                <div v-if="item.ModeType==2?true:false"  :name="item.ModeType" class="switch_Box" 
                    style="width:100%;height:100%;position:relative;margin-left:1px">
                    <div v-if="item.FormType==6?false:true"  data="开关" :data1="item.textBl" class="switch_dom" :style="'width:' + item.wBlValue 
                        + 'px; height:' +item.hBlValue + 'px; position:absolute;right:0px;top:0px;left:0px;bottom:0;margin:auto;border:1px solid #707070;border-radius:' 
                        + item.CornerRadius + 'px'">
                        <div class="switch_dom1" :style="'overflow:hidden;width:100%;height:100%;position:relative;lineHeight:' 
                             + item.hBlValue + 'px;boxShadow:' + item.Shadow">
                            <input style="pointer-events: none;" :data-form="item.FormType" :data-mode="item.ModeType" data="开关" :class="item.class + 'ipt'"
                         
                          
                            type="checkbox" class="hidden-checkbox" name="" value="ddd">
                            <span id="switch-area" class="switch-area" :style="'backgroundColor:' + item.OffColor + '; border-radius:' 
                            + item.CornerRadius + 'px'"></span>
                            
                            <span class="switch-text" :style ="'width:'+(100-30)+'%;fontSize:' + item.fontSize + 'px;fontFamily:' 
                            + item.family+'; color:' + item.Background + ';fontWeight:'+item.Blod+';user-select:none;'">{{item.OffText}}</span>
                            <span class="switch-toggle" :style="'border-radius:' + (item.FormType ==3?'50%' :item.CornerRadius + 'px')"></span>
                        </div>
                    </div>

                    <div v-if="item.FormType==6?true:false" data="其他" class="switch_dom" :style="'width:' + item.wBlValue+ 'px; height:'
                        + item.hBlValue + 'px; position:absolute;top:0;left:0;bottom:0;right:0px;margin:auto'">
                        <div class="switch_dom1" :style="'width:100%;height:100%;position:relative;lineHeight:' 
                            + item.hBlValue + 'px;boxShadow:' + item.Shadow">
                            <input style="pointer-events: none;" :data-form="item.FormType" :data-mode="item.ModeType" data="其他" :class="item.class + 'ipt'"
                        
                        
                            type="checkbox" class="hidden-checkbox" name="" value="ddd">
                            <span id="switch-area" class="switch-area2" :style="'backgroundColor:' + item.OffColor 
                            + '; border-radius:8px;width:100%;height:'+ item.RHeightBl + 'px'"></span>
           
                            <span class="switch-text" :style ="'width:'+(100-40)+'%;fontSize:' + item.fontSize + 'px;fontFamily:' + item.family+'; color:' 
                            + item.Background + ';fontWeight:'+item.Blod + ';user-select:none'">{{item.OffText}}</span>
                            <span class="switch-toggle2" :style="'width:'+item.hBlValue + 'px;height:'+item.hBlValue + 'px'"></span>
                            <span class="switch-toggle3" :style="'width:'+item.RHeightBl + 'px;height:'+item.RHeightBl + 'px'">
                                <span class="switch-toggle4"></span>
                            </span>
                        </div>
                    </div>
                </div>
 
                <div v-if="item.ModeType==1?true:false" data="原位"  :name="item.ModeType" class="switch_Box" 
                    style="width:100%;height:100%;position:relative;margin-left:1px">
                    <div class="switch_dom" :style="'overflow:hidden;width:' + (item.width-2) + 'px; height:'
                        + (item.height-2) + 'px; position:absolute;top:0;left:0;bottom:0;right:0px;margin:auto;border-radius:' + item.CornerRadius + 'px;border:'
                        +(item.FormType ==5?'0px':'1px')+' solid #707070;'">
                        <div class="switch_dom1" :style="'overflow:hidden;width:100%;height:100%;position:relative;lineHeight:' 
                        + (item.height-2) + 'px;boxShadow:' + item.Shadow">
                            <input style="pointer-events: none;" :data-form="item.FormType" :data-mode="item.ModeType" data="原位" :class="item.class + 'ipt'"
                           
                            type="checkbox" class="hidden-checkbox" name="" value="ddd">
                            <span id="switch-area" class="switch-area" :name="item.FormType" :style="'backgroundColor:' 
                            + (item.FormType ==5 ?'#00000000':item.OffColor) + '; border-radius:' + (item.CornerRadius ) + 'px'"></span>
                            <span class="switch-text1" :style ="'fontSize:' + item.fontSize + 'px;fontFamily:' + item.family
                            +'; color:' + (item.FormType==5?'#aaaaaa':item.Background) + ';fontWeight:'+item.Blod
                            +';user-select:none'">{{item.OffText}}</span>
                        </div>
                    </div>
                </div>
        </div>
        <!-- 开关弹窗提示 -->
        <div v-show="commerPopShow" style="width:100%;height:100%;position:fixed;z-index:99">
            <div v-if="commerPopShow" class="commerPop_outPop">
            <div class="commerPop_outHead">
                <i class="warning el-icon-warning"></i>
                <span class="text">提示</span>
            </div>
            <div class="commerPop_conter">写入数据失败，请尝试重新操作</div>
            <div class="commerPop_btn">
                <div @click="commerNoFun" class="commerPop_no">确定</div>
            </div>
            </div>
        </div>
        <!-- 权限提示 -->
        <div v-show="commerPopShow1" style="width:100%;height:100%;position:fixed;z-index:2147483647">
            <div v-if="commerPopShow1" class="commerPop_outPop">
            <div class="commerPop_outHead">
                <i class="warning el-icon-warning"></i>
                <span class="text">提示</span>
            </div>
            <div class="commerPop_conter">该账户无操作权限</div>
            <div class="commerPop_btn">
                <div class="commerPop_no" @click="Jurisdiction()">确定</div>
            </div>
            </div>
        </div>
    </div>
</div>
</template>

<script> 

export default{
    data(){
        return{
           show:true,
           textblockData:[],
           dataValue:[],
           commerPopShow:false,
           commerPopShow1:false,
           ZIndex:'',
           resData:[],  //初始化请求变量值
           varArr:[],   //变量名
           lang: JSON.parse(localStorage.getItem('languages'))[localStorage.getItem('currentLang')]
        }
    },
    props:['dae','dataId'],
    watch:{
      dae:{
            deep:true,
            handler(val){
                this.msgHub2 = window.$.connection.redisMonitor
                if(this.msgHub2){
                    this.msgHub2.server.removeVariables(this.varArr)
                }
                this.data = val;
                if(val){
                    this.init();
                }
            }
      }
    },
    beforeDestroy(){
       if(this.$store.state.websocketsShow != null){
           this.msgHub2 = window.$.connection.redisMonitor
           if(this.msgHub2){
               this.msgHub2.server.removeVariables(this.varArr)
           }
       }
    },
    created(){

    },
    mounted(){
        this.data = this.dae
        this.Name = 'switch'
        if(this.data){
            this.init()
        }
    },
    methods:{
        init(){
             //数据筛选
            var dataAll = this.data.Controls.ControlList
            this.textblockData = []
            this.cla = []
            for(var i=0;i<dataAll.length;i++){
                if(dataAll[i].ControlType.slice(0,6) == this.Name){
                        this.textblockData.push(dataAll[i])
                        if(dataAll != null){
                            this.cla.push(dataAll[i].Name)
                        }
                }
            }
            //根据控件名称取样式内容
            this.Sarr = []
            for(var k=0;k<this.data.Data.SwitchList.length;k++){
                var name = this.data.Data.SwitchList[k].ElementName
                var nameNull =  this.data.Data.SwitchList[k].TagName
                var index =  this.cla.indexOf(name) 
                if(index != -1 && nameNull != null){
                this.Sarr.push(this.data.Data.SwitchList[k].ElementName)
                }
            }
            var a = new Set(this.Sarr)
            this.Starr = [...a]
            if(this.textblockData.length!=0){
                this.show = true
            }else{
                this.show = false
            }
            //赋值
            if(this.show){
                this.gitValue()
                this.switchAxios()
            } 
            this.JoinVarFun()
    },
    //关闭弹窗
    commerNoFun(){
        this.commerNoFun = false
    },
    //加入变量   主页面也有加入变量
      JoinVarFun(){
        if(this.$store.state.websocketsShow != null){
            let arr  = []
            arr = new Set(this.Arr)
            arr = [...arr]
            this.varArr = arr
            this.msgHub2 = window.$.connection.redisMonitor
            if(this.msgHub2){
              this.msgHub2.server.addVariables(this.varArr)
            }  
        }
      },
       //筛选变量组方法
      judgeFun(data){
            for(let f=0;f<this.Starr.length;f++){
                    var iptDom = document.querySelector(`.${this.Starr[f]}ipt`)

                    if(typeof(data[f].Value) == 'string'){
                        if(isNaN(Number(data[f].Value))){
                         
                            if(data[f].Value.toLowerCase() == 'true'){
                                    data[f].Value = true
                            }else{
                                data[f].Value = false
                            }
                        }else{
                             if(Number(data[f].Value) == 0){
                                data[f].Value = false
                            }else{
                                data[f].Value = true
                            }
                        }
                    }else if(typeof(data[f].Value) == 'number'){
                        if(data[f].Value == 0){
                            data[f].Value = false
                        }else{
                            data[f].Value = true
                        }
                    }
                    iptDom.setAttribute("data-value",data[f].Value);
                    // iptDom.setAttribute("data-value",true);
                    var form = iptDom.getAttribute('data-form')
                    var mode = iptDom.getAttribute('data-mode')
                    if(data[f].Value == true){
                        for(let h=0;h<this.dataValue.length;h++){
                            if(this.Starr[f] == this.dataValue[h].class){
                                iptDom.checked = data[f].Value
                                // iptDom.checked = true
                                if(form !=5){
                                    iptDom.nextElementSibling.style.backgroundColor = this.dataValue[h].OnColor
                                    var arrName = iptDom.nextElementSibling.nextElementSibling.style.transform
                                    var index1 =  arrName.indexOf('(')
                                    var index2 =  arrName.indexOf(')')
                                    var value = arrName.slice(index1+1,index2)

                                    var type = iptDom.getAttribute('data')
                             
                                    
                                    if(Number(value) > 1){
                                        var Num = Number(value) * 10
                                        if(type != '原位'){
                                            iptDom.nextElementSibling.nextElementSibling.style.left=`${Num}%`
                                        }
                                    }

                                    }
                                    if(mode ==1 && form ==5){
                                        iptDom.nextElementSibling.nextElementSibling.style.color = this.dataValue[h].OnColor
                                        iptDom.nextElementSibling.style.backgroundColor = "#00000000"
                                    }
                                    if(mode ==2 && form ==6){
                                        iptDom.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.style.borderColor=this.dataValue[h].OnColor
                                        iptDom.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.childNodes[0].style.backgroundColor = this.dataValue[h].OnColor
                                        iptDom.nextElementSibling.nextElementSibling.nextElementSibling.style.backgroundColor='#fff'
                                    }
                                    iptDom.nextElementSibling.nextElementSibling.innerHTML = this.dataValue[h].OnText      
                            }
                        }
                    }else{
                        iptDom.checked = ''
                        for(let h=0;h<this.dataValue.length;h++){
                            if(this.Starr[f] == this.dataValue[h].class){
                                if(form !=5){
                                        iptDom.nextElementSibling.style.backgroundColor =  this.dataValue[h].OffColor
                                    }
                                    if(mode ==1 && form ==5){
                                        iptDom.nextElementSibling.nextElementSibling.style.color = '#aaaaaa'
                                        iptDom.nextElementSibling.style.backgroundColor = "#00000000"
                                    }
                                    if(mode && form ==6){
                                        iptDom.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.style.borderColor='#aaaaaa'
                                        iptDom.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.childNodes[0].style.backgroundColor = '#aaaaaa'
                                        iptDom.nextElementSibling.nextElementSibling.nextElementSibling.style.backgroundColor='#fff'
                                    }
                                        iptDom.nextElementSibling.nextElementSibling.innerHTML = this.dataValue[h].OffText
                            }
                        }
                    }
            }
      },
   //初始化请求，websocket初始不给值自己查询一遍
    switchAxios(){
       this.resData = []
       let AxiosData = this.data.Data.SwitchList
       this.Arr = []
       for(var i=0;i<AxiosData.length;i++){
           for(var j=0;j<this.Starr.length;j++){
               if(AxiosData[i].ElementName == this.Starr[j]){
                  this.Arr.push(AxiosData[i].TagName)
               }
           }
       }
           //请求接口
        this.$axios({
              method: 'post',
              url: '/api/Base/PostRediusTest',
              data: this.Arr
          }).then(res => {
              console.log('进来接口88')
              this.resData.push(res.data.data)
               this.judgeFun(res.data.data)
          }).catch(function(error) {
            console.log('err',error);
        });
    },
    //websocket触发该方法
      axioImg2(resArr){
           //防止多次触发
        if(this.Arr){
            let index = this.Arr.indexOf(resArr.name)
            let resShow = false
            if(index != -1){
              for(let i=0;i<this.resData[0].length;i++){
                if(this.resData[0][i].Name == this.Arr[index]){
                    resShow = this.resData[0][i].Value.toString() == resArr.value.toString()?false:true
                }
              }
            }
            if(!resShow){
              return
            }
        }
          //改变值执行方法
          if(this.resData.length){
              for(let z=0;z<this.resData[0].length;z++){
                if(resArr.name == this.resData[0][z].Name){
                  this.resData[0][z].Value = resArr.value
                }
              }
              this.judgeFun(this.resData[0]) 
          }
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
     },
     //鼠标按下
     downClick(item,e){
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

    //点击事件
    switchFun(e,item){
     this.jurisdictionShow(item).then(val => { 
         if(item.TagName != ''){ 
             if(!this.CanExcuteShow){
                    var valueShow
                    var arr = []
                    var iptDom = document.querySelector(`.${item.class}ipt`)
                    var ss = JSON.parse(sessionStorage.getItem('variable'))
                    var variableName
                    for(let o=0;o<ss.length;o++){
                        if(item.TagName == ss[o].TagName){
                          variableName = ss[o].TagType
                        }
                    }

                    if(iptDom.checked){
                        // 二进制变量，文本变量8位字符集，文本变量16位字符集，日期，时间，日期时间，字符串
                        if(variableName == this.lang['二进制变量'] || variableName == this.lang['文本变量8位字符集'] || variableName == this.lang['文本变量16位字符集']  
                        || variableName == this.lang['时间'] || variableName == this.lang['日期'] || variableName == this.lang['日期时间'] || variableName == this.lang['字符串']){
                            valueShow = false
                        }else{
                            valueShow = 0
                        }
                    }else{
                        if(variableName == this.lang['二进制变量'] || variableName == this.lang['文本变量8位字符集'] || variableName == this.lang['文本变量16位字符集']  
                        || variableName == this.lang['时间'] || variableName == this.lang['日期'] || variableName == this.lang['日期时间'] || variableName == this.lang['字符串']){
                            valueShow = true
                        }else{
                            valueShow = 1
                        }
                    }
                    var value = {
                        "Name" : item.TagName,
                        "Value": valueShow
                    }
                    arr.push(value)
                    this.$axios({
                    method: 'post',
                    url: '/api/Base/PostIOServiceTest',
                    data: arr
                    }).then(res => {

                     if(res.data.data == false){
                            this.commerNoFun = true
                            return
                        }
                    }).catch(function(error) {
                        console.log('err',error);
                    });
             }else{
                     var iptCheck = document.querySelector(`.${item.class}ipt`).checked
                     if(iptCheck == true){
                         document.querySelector(`.${item.class}ipt`).checked = false
                     }else{
                         document.querySelector(`.${item.class}ipt`).checked = true
                     }
                    this.commerPopShow1 = true
             }
         }else{
             //没有变量走接口默认开关
                var iptCheck1 = document.querySelector(`.${item.class}ipt`).checked
                if(iptCheck1 == true){
                    document.querySelector(`.${item.class}ipt`).checked = false
                    document.querySelector(`.${item.class}ipt`).nextElementSibling.nextElementSibling.innerHTML = 'Off'
                    $(`.${item.class}`).find('#switch-area')[0].style.background= "rgb(221, 221, 221)"
                }else{
                    document.querySelector(`.${item.class}ipt`).checked = true
                    document.querySelector(`.${item.class}ipt`).nextElementSibling.nextElementSibling.innerHTML = 'On'
                    $(`.${item.class}`).find('#switch-area')[0].style.background= "rgb(221, 221, 221)"
                }
         }
     })
    },

         gitValue(){
            this.dataValue = []
            var switchlist = this.data.Data.SwitchList
            var foreOp
            var foreColor
            var backOp
            var backColor
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

                  var ForegroundArr = JSON.parse(this.textblockData[i].PropertyList.Foreground).Data.Color
                  var BackgroundArr = JSON.parse(this.textblockData[i].PropertyList.Background).Data.Color
                //阴影
                 var borderSadow = JSON.parse(this.textblockData[i].PropertyList.Shadow)
                 var InnerShadow
                 var OuterShadow
                 var Shadow
                  if(switchlist.length != 0){
                      for(var j=0;j<switchlist.length;j++){
                          if(switchlist[j].ElementName == this.textblockData[i].Name){
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
                                  foreOp = ForegroundArr.slice(1,3)
                                  foreColor = ForegroundArr.slice(3)
                                  backOp = BackgroundArr.slice(1,3)
                                  backColor = BackgroundArr.slice(3)
                                  console.log('开关1111')
                                  //开关比例换算
                                  var widthBl
                                  var heightBl
                                  var RHeightBl = ''
                                  var wBlValue
                                  var hBlValue 
                                  var textBl
                                  if(switchlist[j].FormType == 6){
                                    //  120  28
                                    widthBl = this.textblockData[i].PropertyList.Width / 120 
                                    heightBl = this.textblockData[i].PropertyList.Height / 42 
                                    RHeightBl = this.textblockData[i].PropertyList.Height / 28 
                                    if(widthBl > heightBl){
                                        textBl = heightBl
                                        wBlValue = heightBl * 120
                                        hBlValue = this.textblockData[i].PropertyList.Height - 4
                                        RHeightBl = (this.textblockData[i].PropertyList.Height - 4) * 0.66
                                    }else{
                                        textBl = widthBl
                                        wBlValue = this.textblockData[i].PropertyList.Width - 4
                                        hBlValue = (widthBl * 42) 
                                        RHeightBl = widthBl * 28 
                                    }
                                  }else{
                                    //   100 28
                                    //104 32
                                    widthBl = this.textblockData[i].PropertyList.Width / 104
                                    heightBl = this.textblockData[i].PropertyList.Height / 32
                                     if(widthBl > heightBl){
                                         textBl = heightBl
                                        wBlValue = (heightBl * 104) - 4
                                        hBlValue = this.textblockData[i].PropertyList.Height  - 4
                                    }else{
                                        textBl = widthBl
                                        wBlValue = this.textblockData[i].PropertyList.Width  - 4
                                        hBlValue = (widthBl * 32)  - 4
                                    }
                                  }
                                  var value = {
                                      width:this.textblockData[i].PropertyList.Width,
                                      height:this.textblockData[i].PropertyList.Height,
                                      rotate:this.textblockData[i].PropertyList.RotateAngle,
                                      wBlValue:wBlValue,
                                      hBlValue:hBlValue,
                                      RHeightBl:RHeightBl,
                                      top:this.textblockData[i].PropertyList.Top,
                                      left:this.textblockData[i].PropertyList.Left,
                                      opacity:this.textblockData[i].PropertyList.Opacity / 100,
                                      family:this.textblockData[i].PropertyList.FontFamily,
                                      Background:"#" + backColor ,
                                      Foreground:"#" + foreColor ,
                                      fontSize:Number(this.textblockData[i].PropertyList.FontSize)*textBl,
                                      class:this.textblockData[i].Name,
                                      OnColor:switchlist[j].OnColor == null?'':'#'+switchlist[j].OnColor.slice(3) + switchlist[j].OnColor.slice(1,3),
                                      OffColor:switchlist[j].OffColor,
                                      OnText:switchlist[j].OnText,
                                      OffText:switchlist[j].OffText,
                                      CornerRadius:switchlist[j].CornerRadius,
                                      ModeType:switchlist[j].ModeType,
                                      FormType:switchlist[j].FormType,
                                      ColorType:switchlist[j].ColorType,
                                      TagID:switchlist[j].TagID,
                                      TagName:switchlist[j].TagName,
                                      Shadow:Shadow,
                                      Blod:this.textblockData[i].PropertyList.Blod == 'True' ? 'bold' : '',
                                      ZIndex:this.ZIndex,
                                      textBl:textBl
                                  }
                                  this.dataValue.push(value)
                                  break;
                         }
                         else{
                             if(j == switchlist.length-1){

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
                                foreOp = ForegroundArr.slice(1,3)
                                foreColor = ForegroundArr.slice(3)
                                backOp = BackgroundArr.slice(1,3)
                                backColor = BackgroundArr.slice(3)

                                //开关比例换算
                                  var widthBl1
                                  var heightBl1
                                  var RHeightBl1 = ''
                                  var wBlValue1
                                  var hBlValue1
                                  var textBl1
                                  console.log('333')
                                    //   100 28
                                    widthBl1 = this.textblockData[i].PropertyList.Width / 104
                                    heightBl1 = this.textblockData[i].PropertyList.Height / 32
                                     if(widthBl1 > heightBl1){
                                        wBlValue1 = (heightBl1 * 104) - 4
                                        hBlValue1 = this.textblockData[i].PropertyList.Height - 4
                                        textBl1 = heightBl1 - 4
                                       
                                    }else{
                                        textBl1 = widthBl1
                                        wBlValue1 = this.textblockData[i].PropertyList.Width  - 4
                                        hBlValue1 = (widthBl1 * 32) - 4 
                                    }
                                    
                                    
                               
                                var value1 = {
                                    width:this.textblockData[i].PropertyList.Width, 
                                    height:this.textblockData[i].PropertyList.Height,
                                    rotate:this.textblockData[i].PropertyList.RotateAngle,
                                    wBlValue:wBlValue1,
                                    hBlValue:hBlValue1,
                                    RHeightBl:RHeightBl1,
                                    top:this.textblockData[i].PropertyList.Top,
                                    left:this.textblockData[i].PropertyList.Left,
                                    opacity:this.textblockData[i].PropertyList.Opacity / 100,
                                    family:this.textblockData[i].PropertyList.FontFamily,
                                    Background:"#" + backColor ,
                                    Foreground:"#" + foreColor ,
                                    fontSize:Number(this.textblockData[i].PropertyList.FontSize) * textBl1,
                                    class:this.textblockData[i].Name,
                                    OnColor:'#DDDDDD',
                                    OffColor:'#DDDDDD',
                                    OnText:'On',
                                    OffText:'Off',
                                    CornerRadius:0,
                                    ModeType:2,
                                    FormType:0,
                                    ColorType:7,
                                    TagID:'',
                                    TagName:'',
                                    Shadow:Shadow,
                                    Blod:this.textblockData[i].PropertyList.Blod == 'True' ? 'bold' : '',
                                    ZIndex:this.ZIndex,
                                    textBl:textBl1
                                }
                                this.dataValue.push(value1)
                             }
                         }
                     }
                  }else{
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
                        foreOp = ForegroundArr.slice(1,3)
                        foreColor = ForegroundArr.slice(3)
                        backOp = BackgroundArr.slice(1,3)
                        backColor = BackgroundArr.slice(3)
                        //开关比例换算
                        var widthBl2
                        var heightBl2
                        var RHeightBl2 = ''
                        var wBlValue2
                        var hBlValue2
                        var textBl2
                         console.log('444')
                        widthBl2 = this.textblockData[i].PropertyList.Width / 104
                        heightBl2 = this.textblockData[i].PropertyList.Height / 32 
                            if(widthBl2 > heightBl2){
                            textBl2 = heightBl2
                            wBlValue2 = heightBl2 * 104 - 4
                            hBlValue2 = this.textblockData[i].PropertyList.Height - 4 
                        }else{
                            // textBl2 = widthBl2
                            textBl2 = 1
                            wBlValue2 = this.textblockData[i].PropertyList.Width - 4 
                            hBlValue2 = widthBl2 * 32 - 4
                        }
                      
                        var value8 = {
                            width:this.textblockData[i].PropertyList.Width,
                            height:this.textblockData[i].PropertyList.Height,
                            rotate:this.textblockData[i].PropertyList.RotateAngle,
                            RHeightBl:RHeightBl2,
                            wBlValue:wBlValue2,
                            hBlValue:hBlValue2,
                            top:this.textblockData[i].PropertyList.Top,
                            left:this.textblockData[i].PropertyList.Left,
                            opacity:this.textblockData[i].PropertyList.Opacity / 100,
                            family:this.textblockData[i].PropertyList.FontFamily,
                            Background:"#" + backColor ,
                            Foreground:"#" + foreColor ,
                            fontSize:Number(this.textblockData[i].PropertyList.FontSize)*textBl2,
                            class:this.textblockData[i].Name,
                            OnColor:'#DDDDDD',
                            OffColor:'#DDDDDD',
                            OnText:'On',
                            OffText:'Off',
                            CornerRadius:0,
                            ModeType:2,
                            FormType:0,
                            ColorType:7,
                            TagID:'',
                            TagName:'',
                            Shadow:Shadow,
                            Blod:this.textblockData[i].PropertyList.Blod == 'True' ? 'bold' : '',
                            ZIndex:this.ZIndex,
                            textBl:textBl2
                        }
                        this.dataValue.push(value8)
                  }
              }
        }
    }
}

</script>

<style lang="scss" scoped>
.Switch8a{
    display: inline-block;
}
.switch_dom:hover .switch-area{
     background: #BEE6FD !important;
}
.switch_dom:hover .switch-area{
    border:1px solid #2872A9 !important;
}
 .switch_dom:hover  .switch-area2{
     background: #BEE6FD !important;
      border:1px solid #2872A9 !important;
 }
 .switch_dom:hover .switch-toggle2{
      background: #BEE6FD !important;
       border:1px solid #2872A9 !important;
 }
.switch-text1{
    display:inline-block;
    position:absolute;
    top:0;
    left:0;
    right:0;
    bottom:0;
    margin:auto;
    text-align:center;
}
.switch-toggle4{
    display: inline-block;
    position: absolute;
    top:-29%;
    left:41%;
    content: '';
    width:14%;
    height:40%;
}
  .switch-btn{
        width: 105px;
        height: 25px;
        position: relative;
        top: 1px;
    }
    .hidden-checkbox,
    .switch-area2,
    .switch-area,
    .switch-toggle2,
    .switch-toggle3,
    .switch-toggle{
        position: absolute;
        top: 0;
        left: 0;
    }
    .hidden-checkbox{
        width: 100%;
        height: 100%;
        opacity: 0;
        z-index: 10;
        cursor: pointer;
    }
    .switch-area2{
        position: absolute;
        top: 0;
        left: 0;
        bottom:0;
        right:0;
        margin:auto 0;
        border-radius:8px;
    }
    .switch-area{
        width: 100%;
        height: 100%;
    }
    .switch-text{
        position: absolute;
        top: 0;
        left: 27%;
        padding-left: 2px;
        width:calc(100% - 30%);
        display: flex;
        display: inline-block;
        text-align: center;
        overflow: hidden;
        white-space:nowrap;
        word-break: break-all
    }
    .switch-toggle3{
        position: absolute;
        top:0;
        bottom:0;
        left:3.5%;
        margin:auto 0;
        border: 2px solid #aaa;
        border-radius: 50%;
        background-color: #fff;
    }
    .switch-toggle2{
         position: absolute;
        top:0;
        bottom:0;
        left:-2%;
        margin:auto 0;
        border-radius: 50%;
        background-color: #fff;
    }
    .switch-toggle{
         position: absolute;
        top:0;
        bottom:0;
        left:6%;
        margin:auto 0;
        width: 20%;
        height: 70%;
        border: 1px solid #B3B3B3;
        background-color: #fff;
    }
    .hidden-checkbox:checked ~ .switch-toggle2{
         position: absolute;
         top:0;
         bottom:0;
         left:78%;
         margin:auto 0;
    }
     .hidden-checkbox:checked ~ .switch-toggle3{
         position: absolute;
         top:0;
         bottom:0;
         left:84.5%;
         margin:auto 0;
    }
    .hidden-checkbox:checked ~ .switch-toggle{
         position: absolute;
         top:0;
         bottom:0;
         left:75%;
         margin:auto 0;
    }
    .hidden-checkbox:checked ~ .switch-text{
        left: 0%;
    }
    .switch-text,
    .switch-area,
    .switch-toggle2,
    .switch-toggle3,
    .switch-toggle{
        -webkit-transition: All 0.9s ease; 
        -moz-transition: All 0.9s ease; 
        -o-transition: All 0.9s ease;
        transition: All 0.9s ease; 
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
     z-index: 100;
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
             width:250px;
             height:30px;
             margin:0 auto;
             background: #F3E3AD;
             color:#ECAA4E;
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
