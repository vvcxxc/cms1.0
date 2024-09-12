<!--
 * @Description: 这是控制按钮控件页面（组件）
 * @Date: 2019-11-12 17:40:04
 * @Author: Tao
 * @LastEditors: Tao
 * @LastEditTime: 2021-02-26 19:53:47
 -->
<template>
    <div>
        <div v-for="(item,index) in dataValue" :key="index">
            <div v-if="show"
                 :class="item.class" @dblclick="opendb(item)" @contextmenu.prevent @mouseup="seupClick(item,$event)"
                 name="cornerbutton" class="CornerButton6aa" @mousedown="downFun(item,$event)" 
                :style="'position:absolute;' + 'left:' + item.left + 'px; top:' + item.top 
                + 'px; text-align:center; line-height:' + (item.height - item.BorderThickness * 2) 
                + 'px; width:'+ item.width + 'px; height:'+ item.height + 'px; borderRadius:' 
                + item.radiusLeft + 'px ' + item.radiusTop + 'px ' + item.radiusRight + 'px ' 
                + item.radiusButton + 'px; fontFamily:'+ item.family + '; fontSize:'+ item.fontSize 
                + 'px; opacity:' + item.opacity + '; transform:rotate(' + item.rotate + 'deg);'
                + 'boxSizing:border-box;padding:' + item.BorderThickness + 'px;background:' + item.BorderBrush 
                + ';overflow:hidden;white-space:nowrap;boxShadow:'+item.Shadow + ';zIndex:'+item.ZIndex"
            >
                <span class="contenText" :style="'position:absolute;left:0;top:0;right:0;bottom:0;margin:auto;line-height:'
                +item.height + 'px;color:' + item.Foreground+';fontWeight:' + item.Blod">{{item.text}}</span>
                <div class="conten" :style="'width:100%;height:100%;background:' + item.Background + ';borderRadius:' 
                    + (Number(item.radiusLeft) -1) + 'px ' + (Number(item.radiusTop) -1) + 'px ' + (Number(item.radiusRight) -1) + 'px ' 
                    + (Number(item.radiusButton) -1) + 'px;boxShadow:' + item.Shadow2">
                   
                </div>
            </div>
          
<div v-show="commerPopShow" style="width:100%;height:100%;position:fixed;z-index:2147483647">
        <div v-if="commerPopShow" class="commerPop_outPop">
        <div class="commerPop_outHead">
            <i class="warning el-icon-warning"></i>
            <span class="text">{{lang.HT_MessageBoxCaption_Tips}}</span>
        </div>
        <div class="commerPop_conter">{{commerText}}</div>
        <div class="commerPop_btn">
            <div @click="commerNoFun" class="commerPop_no">{{lang.MessageBox_NO}}</div>
            <div @click="commerYesFun" class="commerPop_yes">{{lang.MessageBox_YES}}</div>
        </div>
        </div>
</div>

<div v-show="commerPopShow1" style="width:100%;height:100%;position:fixed;z-index:2147483647">
        <div v-if="commerPopShow1" class="commerPop_outPop">
        <div class="commerPop_outHead">
            <i class="warning el-icon-warning"></i>
            <span class="text">提示</span>
        </div>
        <div class="commerPop_conter">该账户无操作权限</div>
        <div class="commerPop_btn">
            
            <div class="commerPop_yes" @click="Jurisdiction()" style="width:310px;margin-left:25px">确定</div>
        </div>
        </div>
</div>


        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            text: '',
            height: 0,
            width: 0,
            bd: 2, //未知
            left: 0,
            top: 0,
            fontSize: 0,
            family: '',
            radiusLeft: 0,
            radiusTop: 0,
            radiusRight: 0,
            radiusButton: 0,
            opacity: 0,
            rotate: 0,
            BorderBrush: '',
            Background: '',
            Foreground: '',
            show: true,
            textblockData: [],
            dataValue: [],
            commerPopShow:false,
            commerPopShow1:false,
            commerText:'',
            commonValue:'',
            ZIndex:'',
            lang: JSON.parse(localStorage.getItem('languages'))[localStorage.getItem('currentLang')]
        };
    },
    props: ['dae','dataId'],
    watch: {
        dae: {
            handler(val) {
                this.data = val;
                if(val){
                    this.init();
                }
            }
        }
    },
    created() {
        this.data = this.dae;
        this.Name = 'cornerbutton';
        if(this.data){
            this.init();
        }
    },
    methods: {
        init() {
            //数据筛选
            var dataAll = this.data.Controls.ControlList;
            this.textblockData = [];
            for (var i = 0; i < dataAll.length; i++) {
                if (dataAll[i].ControlType == this.Name) {
                    this.textblockData.push(dataAll[i]);
                }
            }
            if (this.textblockData.length != 0) {
                this.show = true;
            } else {
                this.show = false;
            }
            //赋值
            if (this.show) {
                this.gitValue();
            }
        },
        commerNoFun(){
              this.commerPopShow = false
        },
        commerYesFun(){
              this.commerPopShow = false
                //请求接口
                                        this.$axios({
                                  method:'post',
                                  url:`/api/base/CheckTags`,
                                  data:this.commonValue
                             }).then((res1)=>{
                                  if(res1.data.code === 0){
                                this.commerPopShow = false
                                 this.commerPopShow1value =  '该账户无操作权限'
                                  this.$axios({
                    method: 'post',
                    url: '/api/Base/PostIOServiceTest',
                    data:this.commonValue
                }).then(res => {
                }).catch(function(error) {
                    console.log('err',error);
                });
                            //   this.$axios({                      //下发请求接口
                            //       method: 'post',
                            //       url: '/api/Base/PostIOServiceTest',
                            //       data:item.commonIDarr
                            //   }).then(res => {
                            //       console.log('res',res)
                            //   }).catch(function(error) {
                            //     console.log('err',error);
                            //   });
                                  }else{
                       console.log("res1",res1)
                               this.commerPopShow1 = true   
                               this.commerPopShow1value = res1.data.msg
                                  }
                               
                              })
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
          if(e.which == 1){ //鼠标左键松开
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
                  })
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
                      })
                  }
           }
        },200)
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
               })          
             }
        },200)
     },
        //鼠标按下事件
        downFun(item,e){
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
              
                      self.jurisdictionShow(item).then(val => { 
                          if(EventType.length){
                            if(self.CanExcuteShow){
                                    self.commerPopShow1 = true
                                    return
                                }else{
                                    for(var j=0;j<EventType.length;j++){
                                    Typearr.push(EventType[j].Script)
                                    }
                                    self.$parent.scriptData(Typearr,'控制按钮',item,'','','')
                                }
                          }else{
                              this.issueFun(item)
                          }
                      })
                
            
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
                 })
                }
            }
            
         
        },

                //下发
             issueFun(item){
            console.log('item66',item)
              if(item.commonIDarr.length !=0){
                      if(!this.CanExcuteShow){
                          if(item.HasText == true){
                              this.commerPopShow = true
                              this.commerText = item.WindowText
                              this.commonValue = item.commonIDarr
                          }else{
                              this.commerPopShow = false
                                this.$axios({
                                  method:'post',
                                  url:`/api/base/CheckTags?tagname=${item.commonIDarr[0].Name}&value=${item.commonIDarr[0].Value}`,
                                  data:item.commonIDarr
                             }).then((res1)=>{
                                 console.log("res1",res1.data)
                                  if(res1.data.code === 0){
                                this.commerPopShow = false
                                 this.commerPopShow1value =  '该账户无操作权限'
                              console.log('66666',item.commonIDarr)
                              this.$axios({                      //下发请求接口
                                  method: 'post',
                                  url: '/api/Base/PostIOServiceTest',
                                  data:item.commonIDarr
                              }).then(res => {
                                  console.log('res',res)
                              }).catch(function(error) {
                                console.log('err',error);
                              });
                                  }else{
                       console.log("res1",res1)
                               this.commerPopShow1 = true   
                               this.commerPopShow1value = res1.data.msg
                                  }
                               
                              })
                          }
                      }else{
                          this.commerPopShow1 = true
                      }
              }
        },
       
        //赋值
        gitValue() {
            this.dataValue = [];
            for (var i = 0; i < this.textblockData.length; i++) {
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

                var commonData = this.data.Data.CommonButtonGroupList
                var commonIdData = this.data.Data.CommonButtonList
                var commonidArr = []
                var foreOp
                var foreColor
                var backOp 
                var backColor
                var borderOp
                var borderColor
                var radius
                //渐变色变量
                 var foregoundArr = JSON.parse(this.textblockData[i].PropertyList.Foreground)
                 var backgroundArr = JSON.parse(this.textblockData[i].PropertyList.Background)
                 var borderbrushArr = JSON.parse(this.textblockData[i].PropertyList.BorderBrush)
                 var lagel1
                 var gradient2 
                 var lagel2
                 var gradient1
                 var lagel3
                 var gradient3
                 var clipText
                 var backgroundColor
                 //阴影
                var borderSadow = JSON.parse(this.textblockData[i].PropertyList.Shadow)
                var InnerShadow
                var OuterShadow
                var Shadow
                var Shadow2
                
                if(commonData.length !=0 && commonIdData.length != 0){
                    for(var j=0;j<commonData.length;j++){
                        if(this.textblockData[i].Name == commonData[j].ElementName){
                            
                            for(var k=0;k<commonIdData.length;k++){
                                if(commonData[j].GroupID == commonIdData[k].GroupID){
                                    var value1 = {
                                        "Name":commonIdData[k].TagName,
                                        "Value":commonIdData[k].TagValue
                                    }
                                    commonidArr.push(value1)
                                }
                            }
                             //阴影
                                Shadow = ''
                                if(borderSadow.InnerShadow != undefined){
                                    InnerShadow = borderSadow.InnerShadow.OffsetX + 'px ' +  borderSadow.InnerShadow.OffsetY 
                                                + 'px ' +  borderSadow.InnerShadow.BlurRadius.toFixed(0) + 'px ' 
                                                +  borderSadow.InnerShadow.Color  + ' inset'
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
                                    Shadow = OuterShadow
                                    Shadow2 = InnerShadow
                                }else if(InnerShadow.length == 0){
                                    Shadow = OuterShadow
                                    Shadow2 = ''
                                }else if(OuterShadow.length == 0){
                                    Shadow = ''
                                    Shadow2 = InnerShadow
                                }

                            //字体颜色渐变
                            if(foregoundArr.ColorType == 'SolidColor'){
                                    foreColor = '#' + foregoundArr.Data.Color.slice(3) + foregoundArr.Data.Color.slice(1, 3);
                                    clipText = 'none'
                                    backgroundColor = 'none'
                            }else{
                                    foreColor = 'transparent'
                                    clipText = 'text'
                                    backgroundColor = ''
                                    lagel1 = foregoundArr.Data.Angel.toFixed(0)
                                for(var g2=0;g2<foregoundArr.Data.GradientStops.length;g2++){
                                    gradient2 = foregoundArr.Data.GradientStops[g2]
                                    backgroundColor = backgroundColor + ',' + gradient2.Color + ' ' + (gradient2.Offset*100).toFixed(0) + '%'
                                }
                                    backgroundColor = '-webkit-linear-gradient('+lagel1+'deg'+backgroundColor+')';
                            }
                            //边框色渐变
                            if(borderbrushArr.ColorType == 'SolidColor'){
                                borderColor = '#' + borderbrushArr.Data.Color.slice(3) + borderbrushArr.Data.Color.slice(1, 3)
                            }else{
                                    borderColor = ''
                                    lagel3 = borderbrushArr.Data.Angel.toFixed(0)
                                for(var f2=0;f2<borderbrushArr.Data.GradientStops.length;f2++){
                                    gradient3 = borderbrushArr.Data.GradientStops[f2]
                                    borderColor = borderColor + ',' + gradient3.Color + ' ' + (gradient3.Offset*100).toFixed(0) + '%'
                                }
                                    borderColor = '-webkit-linear-gradient('+lagel3+'deg'+borderColor+')';
                            }
                            //背景色渐变
                            if(backgroundArr.ColorType == 'SolidColor'){
                                backColor = '#' + backgroundArr.Data.Color.slice(3) + backgroundArr.Data.Color.slice(1, 3)
                                if(backgroundArr.Data.Color.slice(3) == 'FFFFFF' && backgroundArr.Data.Color.slice(1, 3) != "FF"){
                                    borderColor = '#FFFFFF' + backgroundArr.Data.Color.slice(1, 3)
                                }
                            }else{
                                    backColor = ''
                                    lagel2 = backgroundArr.Data.Angel.toFixed(0)
                                for(var h2=0;h2<backgroundArr.Data.GradientStops.length;h2++){
                                    gradient1 = backgroundArr.Data.GradientStops[h2]
                                    backColor = backColor + ',' + gradient1.Color + ' ' + (gradient1.Offset*100).toFixed(0) + '%'
                                }
                                    backColor = '-webkit-linear-gradient('+lagel2+'deg'+backColor+')';
                            }
                         
                            radius = this.textblockData[i].PropertyList.CornerRadius;
                            var value = {
                                width: this.textblockData[i].PropertyList.Width,
                                height: this.textblockData[i].PropertyList.Height,
                                rotate: this.textblockData[i].PropertyList.RotateAngle,
                                top: this.textblockData[i].PropertyList.Top,
                                left: this.textblockData[i].PropertyList.Left,
                                opacity: this.textblockData[i].PropertyList.Opacity / 100,
                                text: this.textblockData[i].PropertyList.Content,
                                fontSize: this.textblockData[i].PropertyList.FontSize,
                                family: this.textblockData[i].PropertyList.FontFamily,
                                BorderThickness: this.textblockData[i].PropertyList.BorderThickness,
                                Foreground: foreColor,
                                Background: backColor,
                                BorderBrush: borderColor,
                                radiusLeft: radius.split(',')[0],
                                radiusTop: radius.split(',')[1],
                                radiusRight: radius.split(',')[2],
                                radiusButton: radius.split(',')[3],
                                class:this.textblockData[i].Name,
                                commonIDarr:commonidArr,
                                WindowText:commonData[j].WindowText,
                                HasText:commonData[j].HasText,
                                backgroundColor:backgroundColor,
                                clipText:clipText,
                                Shadow:Shadow,
                                Shadow2:Shadow2,
                                 Blod:this.textblockData[i].PropertyList.Blod == 'True' ? 'bold' : '',
                                ZIndex:this.ZIndex
                            };
                            this.dataValue.push(value);
                           
                            break;
                        }else{
                            if(j == commonData.length-1){
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
                                    Shadow = OuterShadow
                                    Shadow2 = InnerShadow
                                }else if(InnerShadow.length == 0){
                                    Shadow = OuterShadow
                                    Shadow2 = ''
                                }else if(OuterShadow.length == 0){
                                    Shadow = ''
                                    Shadow2 = InnerShadow
                                }

                                //字体颜色渐变
                                    if(foregoundArr.ColorType == 'SolidColor'){
                                            foreColor = '#' + foregoundArr.Data.Color.slice(3) + foregoundArr.Data.Color.slice(1, 3);
                                            clipText = 'none'
                                            backgroundColor = 'none'
                                    }else{
                                            foreColor = 'transparent'
                                            clipText = 'text'
                                            backgroundColor = ''
                                            lagel1 = foregoundArr.Data.Angel.toFixed(0)
                                        for(var g1=0;g1<foregoundArr.Data.GradientStops.length;g1++){
                                            gradient2 = foregoundArr.Data.GradientStops[g1]
                                            backgroundColor = backgroundColor + ',' + gradient2.Color + ' ' + (gradient2.Offset*100).toFixed(0) + '%'
                                        }
                                            backgroundColor = '-webkit-linear-gradient('+lagel1+'deg'+backgroundColor+')';
                                    }
                                    //边框色渐变
                                    if(borderbrushArr.ColorType == 'SolidColor'){
                                        borderColor = '#' + borderbrushArr.Data.Color.slice(3) + borderbrushArr.Data.Color.slice(1, 3)
                                    }else{
                                            borderColor = ''
                                            lagel3 = borderbrushArr.Data.Angel.toFixed(0)
                                        for(var f1=0;f1<borderbrushArr.Data.GradientStops.length;f1++){
                                            gradient3 = borderbrushArr.Data.GradientStops[f1]
                                            borderColor = borderColor + ',' + gradient3.Color + ' ' + (gradient3.Offset*100).toFixed(0) + '%'
                                        }
                                            borderColor = '-webkit-linear-gradient('+lagel3+'deg'+borderColor+')';
                                    }
                                    //背景色渐变
                                    if(backgroundArr.ColorType == 'SolidColor'){
                                        backColor = '#' + backgroundArr.Data.Color.slice(3) + backgroundArr.Data.Color.slice(1, 3)
                                        if(backgroundArr.Data.Color.slice(3) == 'FFFFFF' && backgroundArr.Data.Color.slice(1, 3) != "FF"){
                                            borderColor = '#FFFFFF' + backgroundArr.Data.Color.slice(1, 3)
                                        }
                                    }else{
                                            backColor = ''
                                            lagel2 = backgroundArr.Data.Angel.toFixed(0)
                                        for(var h1=0;h1<backgroundArr.Data.GradientStops.length;h1++){
                                            gradient1 = backgroundArr.Data.GradientStops[h1]
                                            backColor = backColor + ',' + gradient1.Color + ' ' + (gradient1.Offset*100).toFixed(0) + '%'
                                        }
                                            backColor = '-webkit-linear-gradient('+lagel2+'deg'+backColor+')';
                                    }
                                   

                                radius = this.textblockData[i].PropertyList.CornerRadius;
                                var value5 = {
                                    width: this.textblockData[i].PropertyList.Width,
                                    height: this.textblockData[i].PropertyList.Height,
                                    rotate: this.textblockData[i].PropertyList.RotateAngle,
                                    top: this.textblockData[i].PropertyList.Top,
                                    left: this.textblockData[i].PropertyList.Left,
                                    opacity: this.textblockData[i].PropertyList.Opacity / 100,
                                    text: this.textblockData[i].PropertyList.Content,
                                    fontSize: this.textblockData[i].PropertyList.FontSize,
                                    family: this.textblockData[i].PropertyList.FontFamily,
                                    BorderThickness: this.textblockData[i].PropertyList.BorderThickness,
                                    Foreground: foreColor,
                                    Background: backColor,
                                    BorderBrush: borderColor,
                                    radiusLeft: radius.split(',')[0],
                                    radiusTop: radius.split(',')[1],
                                    radiusRight: radius.split(',')[2],
                                    radiusButton: radius.split(',')[3],
                                    class:this.textblockData[i].Name,
                                    commonIDarr:commonidArr,
                                    WindowText:'',
                                    HasText:'',
                                    backgroundColor:backgroundColor,
                                    clipText:clipText,
                                    Shadow:Shadow,
                                    Shadow2:Shadow2,
                                     Blod:this.textblockData[i].PropertyList.Blod == 'True' ? 'bold' : '',
                                    ZIndex:this.ZIndex
                                };
                                this.dataValue.push(value5);
                            }
                        } 
                    }
                }else{
                    //阴影
                    Shadow = ''
                    if(borderSadow.InnerShadow != undefined){
                        InnerShadow = borderSadow.InnerShadow.OffsetX + 'px ' +  borderSadow.InnerShadow.OffsetY 
                                      + 'px ' +  borderSadow.InnerShadow.BlurRadius.toFixed(0) + 'px ' 
                                      +  borderSadow.InnerShadow.Color  + ' inset'
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
                        Shadow = OuterShadow
                        Shadow2 = InnerShadow
                    }else if(InnerShadow.length == 0){
                        Shadow = OuterShadow
                        Shadow2 = ''
                    }else if(OuterShadow.length == 0){
                        Shadow = ''
                        Shadow2 = InnerShadow
                    }
                   
                   //字体颜色渐变
                    if(foregoundArr.ColorType == 'SolidColor'){
                            foreColor = '#' + foregoundArr.Data.Color.slice(3) + foregoundArr.Data.Color.slice(1, 3);
                            clipText = 'none'
                            backgroundColor = 'none'
                    }else{
                            foreColor = 'transparent'
                            clipText = 'text'
                            backgroundColor = ''
                            lagel1 = foregoundArr.Data.Angel.toFixed(0)
                        for(var g=0;g<foregoundArr.Data.GradientStops.length;g++){
                            gradient2 = foregoundArr.Data.GradientStops[g]
                            backgroundColor = backgroundColor + ',' + gradient2.Color + ' ' + (gradient2.Offset*100).toFixed(0) + '%'
                        }
                            backgroundColor = '-webkit-linear-gradient('+lagel1+'deg'+backgroundColor+')';
                    }
                        //边框色渐变
                        if(borderbrushArr.ColorType == 'SolidColor'){
                            borderColor = '#' + borderbrushArr.Data.Color.slice(3) + borderbrushArr.Data.Color.slice(1, 3)
                        }else{
                                 borderColor = ''
                                 lagel3 = borderbrushArr.Data.Angel.toFixed(0)
                             for(var f=0;f<borderbrushArr.Data.GradientStops.length;f++){
                                gradient3 = borderbrushArr.Data.GradientStops[f]
                                borderColor = borderColor + ',' + gradient3.Color + ' ' + (gradient3.Offset*100).toFixed(0) + '%'
                            }
                                borderColor = '-webkit-linear-gradient('+lagel3+'deg'+borderColor+')';
                        }
                    //背景色渐变
                    if(backgroundArr.ColorType == 'SolidColor'){
                        backColor = '#' + backgroundArr.Data.Color.slice(3) + backgroundArr.Data.Color.slice(1, 3)
                        if(backgroundArr.Data.Color.slice(3) == 'FFFFFF' && backgroundArr.Data.Color.slice(1, 3) != "FF"){
                            borderColor = '#FFFFFF' + backgroundArr.Data.Color.slice(1, 3)
                        }
                    }else{
                            backColor = ''
                            lagel2 = backgroundArr.Data.Angel.toFixed(0)
                        for(var h=0;h<backgroundArr.Data.GradientStops.length;h++){
                            gradient1 = backgroundArr.Data.GradientStops[h]
                            backColor = backColor + ',' + gradient1.Color + ' ' + (gradient1.Offset*100).toFixed(0) + '%'
                        }
                            backColor = '-webkit-linear-gradient('+lagel2+'deg'+backColor+')';
                    }
                    radius = this.textblockData[i].PropertyList.CornerRadius;
                    var value8 = {
                        width: this.textblockData[i].PropertyList.Width,
                        height: this.textblockData[i].PropertyList.Height,
                        rotate: this.textblockData[i].PropertyList.RotateAngle,
                        top: this.textblockData[i].PropertyList.Top,
                        left: this.textblockData[i].PropertyList.Left,
                        opacity: this.textblockData[i].PropertyList.Opacity / 100,
                        text: this.textblockData[i].PropertyList.Content,
                        fontSize: this.textblockData[i].PropertyList.FontSize,
                        family: this.textblockData[i].PropertyList.FontFamily,
                        BorderThickness: this.textblockData[i].PropertyList.BorderThickness,
                        Foreground: foreColor,
                        Background: backColor,
                        BorderBrush: borderColor,
                        radiusLeft: radius.split(',')[0],
                        radiusTop: radius.split(',')[1],
                        radiusRight: radius.split(',')[2],
                        radiusButton: radius.split(',')[3],
                        class:this.textblockData[i].Name,
                        commonIDarr:commonidArr,
                        WindowText:'',
                        HasText:'',
                        backgroundColor:backgroundColor,
                        clipText:clipText,
                        Shadow:Shadow,
                        Shadow2:Shadow2,
                         Blod:this.textblockData[i].PropertyList.Blod == 'True' ? 'bold' : '',
                         ZIndex:this.ZIndex
                    };
                    this.dataValue.push(value8);
                }

            }
        }
    }
};
</script>

<style lang='scss' scoped>
.CornerButton6aa {
    display: inline-block;
    user-select:none;
    cursor: pointer;
    box-sizing: border-box;
}

.CornerButton6aa:hover{
  background-color: #71A2C7ff !important;
  background: #71A2C7ff !important;
}

.CornerButton6aa:hover .conten{
  background-color: #71A2C7ff !important;
  background: #4EBAF3ff !important;
}
.CornerButton6aa:active{
  background-color: #71A2C7ff !important;
  background: #71A2C7ff !important;

}
.CornerButton6aa:active .conten{
  background-color: #A7DDFDff !important;
  background: #A7DDFDff !important;
    box-shadow: 4px 4px 20px #3c99c9 inset;
}

.commerPop_outPop{
    width:360px;
    height:190px;
     box-shadow: 2px 2px 8px 2px rgba(0,0,0,0.1);
     position: fixed;
     left:0;
     right:0;
     top:0;
     bottom:0;
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