<!--
 * @Description: 这是图片页面（组件）
 * @Date: 2019-11-12 17:40:04
 * @Author: Tao
 * @LastEditors: Tao
 * @LastEditTime: 2021-03-18 11:49:07
 -->
<template>
<div>
   <div  @contextmenu.prevent  v-for="(item,index) in dataValue" :key="index">
  <div v-if="show" name="staticimage" 
   @contextmenu.prevent 
   @dblclick="opendb(item)"
   @mousedown="downClick(item,$event)" 
   @mouseup="seupClick(item,$event)"
      :class="item.class" class="imgVue" :style="'width:'+ item.width + 'px; height:' + item.height + 'px; opacity:' + item.opacity 
      + '; position:absolute; left:' + item.left  + 'px; top:' + item.top + 'px; transform:rotate(' + item.rotate + 'deg);zIndex:'+item.ZIndex" >
        <img class="boximg" :src="encodeURIComponent(item.source)" :class="{cimg:bl==1}">
      </div>

    <!-- 权限弹窗 -->
    <!-- <div v-show="commerPopShow1" style="width:100%;height:100%;position:fixed;z-index:2147483647">
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
    </div> -->
  </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
        width:0,
        height:0,
        left:0,
        top:0,
        opacity:0,
        rotate:0,
        show:true,
        sourcearr:[],
        imgArr:[],
        textblockData:[],
        dataValue:[],
        commerPopShow1:false,
        ZIndex:'',
            bl:'',
        lang: JSON.parse(localStorage.getItem('languages'))[localStorage.getItem('currentLang')]
    };
  },
  props:['dae','name','dataId'],
     watch:{
         screen(val){
     this.bl = JSON.parse(JSON.stringify(val))
      if(window.screen.width==1920&&window.screen.height==1080){
          this.bl = 2
        }
          //  console.log("val",val)
      },
      dae:{
        deep:true,
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
    this.Name = 'staticimage'
    if(this.data){
      this.init()
    }
  },
   computed:{
    screen(){
      return this.$store.state.screentype
    }
 },
    mounted(){
      console.log("--------------------")
       let screen = JSON.parse(sessionStorage.getItem('screen'))
        if(!screen){
         this.bl = 2;
        }else if(screen == 'one'){
        this.bl = 1
        }else if(screen == 'two'){
        this.bl = 2
        }else if(screen == 'three'){
        this.bl = 3
        }else if(screen == 'four'){
        this.bl = 4
        }
        if(window.screen.width==1920&&window.screen.height==1080){
          this.bl = 2
        }
    },
  methods: {
    axioImg2(arr){
      console.log('这里还有图片可以玩哟',arr)
      console.log(this.dataValue)
      arr.forEach((item)=>{
        this.dataValue.forEach((item1)=>{
          if(item.ControlName == item1.class){
            item1.source = item.PictureUrl
          }
        })
      })
    },
    init(){
      this.dataValue = []
            //数据筛选
      var dataAll = this.data.Controls.ControlList
      this.textblockData = []
      for(var i=0;i<dataAll.length;i++){
        if(dataAll[i].ControlType == this.Name){
                this.textblockData.push(dataAll[i])
                }
      }
       if(this.textblockData.length>0){
                this.show = true
            }else{
                this.show = false
            }
 
      //赋值
      if(this.show){
        this.gitValue()
        this.imgArr = []
      }
    },

     //确认
        Jurisdiction(){
          this.$emit('shownotip')
            //  this.commerPopShow1 = false
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

    //鼠标松开
     seupClick(item,e){
      //  clearTimeout(this.timeoutID);
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
                    // self.commerPopShow1 = true
                    self.$emit('showtip',self.lang.NoOperationAuthority) 
                    return
                  }else{
                    for(var j=0;j<EventType.length;j++){
                      Typearr.push(EventType[j].Script)
                    }
                    self.$parent.scriptData(Typearr,'','','','','')
                  }
                })

              }
           }else if(e.which == 3){  //鼠标右键松开
                  if(EventType1.length){
                    self.jurisdictionShow(item).then(val => { 
                       if(self.CanExcuteShow){
                          // self.commerPopShow1 = true
                          self.$emit('showtip',self.lang.NoOperationAuthority) 
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
          if(e.which == 1){   //鼠标左键按下
              if(EventType.length){
                self.jurisdictionShow(item).then(val => {
                  if(self.CanExcuteShow){
                    // self.commerPopShow1 = true
                    self.$emit('showtip',self.lang.NoOperationAuthority) 
                    return
                  }else{
                    for(var j=0;j<EventType.length;j++){
                     Typearr.push(EventType[j].Script)
                    }
                    self.$parent.scriptData(Typearr,'','','','','')
                  }
                })
              }
          
          }else if(e.which == 3){  //鼠标右键按下
               if(EventType1.length){
                 self.jurisdictionShow(item).then(val => {
                   if(self.CanExcuteShow){
                    // self.commerPopShow1 = true
                    self.$emit('showtip',self.lang.NoOperationAuthority) 
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
                    //  this.commerPopShow1 = true
                    this.$emit('showtip',this.lang.NoOperationAuthority) 
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


    //赋值
    gitValue(){
       this.$nextTick(function(){
       this.dataValue = []
      for(let item of this.textblockData){
         //加层级zIndex
        var ZIndexs = this.data.Data.ZIndexs
        if(ZIndexs){
          for(let i in ZIndexs){
            if(item.Name == i){
              this.ZIndex = ZIndexs[i]
              break
            }
          }
        }else{
          this.ZIndex = ''
        }

        console.log(item.PropertyList.Source, this.name)
        var j 
        var jc
        var SourceSrc
          console.log(item)
        if(item.PropertyList.Source != null){
        
          j = item.PropertyList.Source.slice(0,item.PropertyList.Source.length-3)
          jc = item.PropertyList.Source.slice(item.PropertyList.Source.length-3,item.PropertyList.Source.length)
         if(item.PropertyList.Source.includes('http:')){
                SourceSrc = `${item.PropertyList.Source}`
          }else{
              SourceSrc = jc == 'JPG' ? `/ViewImage/${this.name}/${j}jpg` : `/ViewImage/${this.name}/${item.PropertyList.Source}`
          }
      
          // SourceSrc = jc == 'JPG' ? require(`../../../ViewImage/${this.name}/${j}jpg`) : require(`../../../ViewImage/${this.name}/${item.PropertyList.Source}`)
        }else{
           SourceSrc = require(`../../../assets/images/DynamicPicture.png`)
        }

        
        this.dataValue.push({
          width:item.PropertyList.Width,
          height:item.PropertyList.Height,
          rotate:item.PropertyList.RotateAngle,
          top:item.PropertyList.Top,
          left:item.PropertyList.Left,
          opacity:item.PropertyList.Opacity / 100,
          source: SourceSrc,
          W:Number(item.PropertyList.Width)<Number(item.PropertyList.Height) ? '100%' : '',
          H:Number(item.PropertyList.Height)<Number(item.PropertyList.Width) ? '100%' : '',
          class:item.Name,
          ZIndex:this.ZIndex
        })
         
      }
       })
    }
  }
  
};
</script>

<style lang="scss" scoped>
.cimg{
  object-fit: contain !important;
}
.imgVue{
   display: inline-block;
   position: relative;
    img{
      position: absolute;
      top:0;
      left:0;
      right:0;
      bottom: 0;
      object-fit: contain;
      max-height:100%;
      max-width: 100%;
      margin: auto;
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