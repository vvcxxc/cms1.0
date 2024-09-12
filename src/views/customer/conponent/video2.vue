<template>
    <div 
      @dblclick="opendb(play)" 
      @contextmenu.prevent 
      @mousedown="downClick(play,$event)" 
      @mouseup="seupClick(play,$event)"
      class="mide"
      :class="play.class"
      name="mediaplayer"
      :style="'width:'+ play.Width + 'px; height:'+ play.Height + 'px;'">
        <!-- <video-player
        :style="'width:'+ play.Width + 'px; height:'+ play.Height + 'px;'"
        v-if="!play.flv"
            class="video-player vjs-custom-skin"
            ref="videoPlayer"
            :playsinline="true"
            :options="playerOptions"
            @play='onPlayerPlay($event)'
        ></video-player> -->
     <video muted controls :style="'width:'+ play.Width + 'px; height:'+ play.Height + 'px;'" src="" :id="id" loop :ref="id"
     
     ></video>
     <div class="cover" v-if='videoshow' @click="tip1()"></div>
        <div v-show="showtip" style="width:100%;height:100%;position:fixed;z-index:2147483647">
          <div v-if="showtip" class="commerPop_outPop">
          <div class="commerPop_outHead">
              <i class="warning el-icon-warning"></i>
              <span class="text">提示</span>
          </div>
          <div class="commerPop_conter">该账户无操作权限</div>
          <div class="commerPop_btn">
              <div class="commerPop_yes" @click="nowtip()" style="width:310px;margin-left:25px">确定</div>
          </div>
          </div>
    </div>
      <!-- 权限弹窗 -->
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

</template>
<script>
import flvjs from 'flv.js/dist/flv.min.js'
export default {
    props: ['play','name','id','data','dataId'],
    data() {
        return {
          showtip:false,
          videoshow:false,
          videoid:'',
            commerPopShow1:false,
            src:'',
            playerOptions: {
                playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
                autoplay: true, //如果true,浏览器准备好时开始回放。
                muted: true, // 默认情况下将会消除任何音频。
                loop: true, // 导致视频一结束就重新开始。
                preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
                language: 'zh-CN',
                aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
                fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
                sources: [
                    {
                       type: "", //这里的种类支持很多种：基本视频格式、直播、流媒体等，具体可以参看git网址项目
                        src: '' //url地址
                    }
                ],
                 
                // poster: '../../static/images/test.jpg', //你的封面地址
                // width: document.documentElement.clientWidth, //播放器宽度
                notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
                controlBar: {
                    timeDivider: true,
                    durationDisplay: true,
                    remainingTimeDisplay: false,
                    fullscreenToggle: true //全屏按钮
                }
            }
        };
    },

    created(){
      if(this.play.Source){
      if(this.play.Source.indexOf('.flv')!==-1){
      this.play.flv=true;
        }else{
      this.play.flv=false;
        }
      }else{
          this.play.flv=false;
      }

  },

   destroyed(){
     $("#"+this.id).innerHTML = ''
   },
  
    mounted(){
      this.jurisdictionShow1(this.play)
      // this.$store.state.btnPowerData.forEach((item)=>{
      //      item.Children.forEach((item1)=>{
      //          if(item1.RightName == this.name){
      //     item1.Children.forEach((item2)=>{
      //          if(item2.RightName == this.id){
      //            this.videoid = item2.RightID
      //          }
      //     })
      //   }
      //      })
      // })
     
      //                  var userid = ''
      // if (!JSON.parse(sessionStorage.getItem('userInfo1'))) {
      //           userid = JSON.parse(
      //               sessionStorage.getItem('sightseerInfo1')
      //           ).SCMSUserID;
      //       } else {
      //           userid = JSON.parse(
      //               sessionStorage.getItem('userInfo1')
      //           ).SCMSUserID;
      //       }
      //          this.$axios({
      //             method: 'post',
      //             url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.videoid}`,
      //         }).then(res => {
      //           console.log(res)
      //             this.videoshow = res.data.data
              
      //         }).catch((err)=>{
      //             console.log('err',err)
      //         })
      
    //   "GZSY_FinalRender_V30.mp4"
        if(this.play.flv){
        
          console.log('name',this.name)
           console.log('Source',this.play.Source)
          // 本地调试
          //  this.src = require(`../../../ViewMedia/${this.name}/${this.play.Source}`);
          // 服务器端
          this.src = `/ViewMedia/${this.name}/${this.play.Source}`
          this.createVideo();
        }else{
             console.log('name',this.name)
           console.log('Source',this.play.Source)
          // 本地调试
          //  this.src = require(`../../../ViewMedia/${this.name}/${this.play.Source}`)
          // 服务器端
          this.src = `/ViewMedia/${this.name}/${this.play.Source}`
          this.createVideo1();
        }

    },
    methods:{
      intovideo(name,src){
        if(this.id == name){
                if(this.play.flv){
                  if (flvjs.isSupported()) {
                    let videoElement = document.getElementById(this.id)
                    let flvPlayer = flvjs.createPlayer({
                      type: 'flv',
                      isLive: true,
                      url: src
                    })
                    flvPlayer.attachMediaElement(videoElement)
                    flvPlayer.load()
                    flvPlayer.play()
                  }
            
               
              }else{
                  if (flvjs.isSupported()) {
                    let videoElement = document.getElementById(this.id)
                    let flvPlayer = flvjs.createPlayer({
                      type: 'mp4',
                      isLive: true,
                      url: src
                    })
                    flvPlayer.attachMediaElement(videoElement)
                    flvPlayer.load()
                    flvPlayer.play()
                  }
              }
        }
      },
        nowtip(){
   this.showtip = false
  },
  tip1(){
    console.log("21231")
 this.showtip = true
  },
      createVideo(){
          if (flvjs.isSupported()) {
            var videoElement = document.getElementById(this.id)
            var flvPlayer = flvjs.createPlayer({
              type: 'flv',
              isLive: true,
              url: this.src
            })
            flvPlayer.attachMediaElement(videoElement)
            flvPlayer.load()
            flvPlayer.play()
          }
      },
      createVideo1(){
          if (flvjs.isSupported()) {
            var videoElement = document.getElementById(this.id)
            var flvPlayer = flvjs.createPlayer({
              type: 'mp4',
              isLive: true,
              url: this.src
            })
            flvPlayer.attachMediaElement(videoElement)
            flvPlayer.load()
            flvPlayer.play()
          }
      },
      onPlayerPlay(player){
            const mPlayer = this.$refs.videoPlayer.player;
            mPlayer.play();
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
                    self.$parent.$parent.scriptData(Typearr,'','','','','')
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
                        self.$parent.$parent.scriptData(Typearr,'','','','','')
                        }
                    });
                  }
           }
        },200)
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
                    self.$parent.$parent.scriptData(Typearr,'','','','','')
                    }
                });
              }
          }else if(e.which == 3){   //鼠标右键按下
               if(EventType1.length){
                 self.jurisdictionShow(item).then(val => { 
                       if(self.CanExcuteShow){
                        self.commerPopShow1 = true
                        return
                      }else{
                        for(var j1=0;j1<EventType1.length;j1++){
                            Typearr.push(EventType1[j1].Script)
                        }
                      self.$parent.$parent.scriptData(Typearr,'','','','','')
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
                    this.$parent.$parent.scriptData(Typearr,'','','','','')
                   }
             });
           }
        },200)
     },
     
        //确认
        Jurisdiction(){
             this.commerPopShow1 = false
        },
        //权限配置请求接口
        jurisdictionShow(item){
          console.log('item==>',item)
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
                        // this.videoshow = true
                        this.CanExcuteShow=true
                        resolve('成功了')
                  }else{
                      this.CanExcuteShow=false
                      //  this.videoshow = false
                      resolve('成功了')
                  }
            })
       })
      },
            jurisdictionShow1(item){
          console.log('item==>',item)
          return new Promise((resolve, reject) => {
            var userinfoID
              if(JSON.parse(sessionStorage.getItem('userInfo1')) == null){
                  userinfoID = JSON.parse(sessionStorage.getItem('sightseerInfo1')).SCMSUserID;
              }else{
                  userinfoID = JSON.parse(sessionStorage.getItem('userInfo1')).SCMSUserID;
              }
              var argChildMenuID = this.dataId
              var elementName = item.class
              console.log("2222222222")
                this.$axios({                      
                    method: 'post',
                    url: `/api/UserManage/UserManage_CanExcuteAuthorityControl?argUserID=${userinfoID}&argChildMenuID=${argChildMenuID}&argElementName=${elementName}`,
                    argUserID:userinfoID,
                    argChildMenuID:argChildMenuID,
                    argElementName:elementName,
                }) .then(res => {
                  console.log("er",res)
                  if( res.data.data.CanExcute == 0){
                        this.videoshow = true
                        // this.CanExcuteShow=true
                        resolve('成功了')
                  }else{
                      // this.CanExcuteShow=false
                       this.videoshow = false
                      resolve('成功了')
                  }
            })
       })
      },
    },
};
</script>
<style lang="scss" scoped>
.mide{
  .commerPop_outPop{
    width:360px;
    height:190px;
     box-shadow: 2px 2px 8px 2px rgba(0,0,0,0.1);
     position: fixed;
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
}
.cover{
  width: 100%;
  height: 100%;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  position: absolute;
}
</style>