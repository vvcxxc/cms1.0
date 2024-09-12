<template>
  <el-main>
    <div id="divPlugin" class="plugin"></div> 
    <el-button @click="clickLogin">开始登录</el-button>
    <el-button @click="clickStartRealPlay">开始预览</el-button>
  </el-main>
</template>
 <script>
    export default {
        data() {
            return {
                g_iWndIndex: 0,
                szDeviceIdentify: '',
                deviceport: '',
                channels: [],
                ip: '192.168.1.209',
                port: '80',
                username: 'admin',
                password: 'qm123456',
                iRtspPort: ''
            }
        },
        mounted() {
            alert("asda")
            this.init()
        },
        methods: {
            // 初始化
            init() {
                // 初始化插件参数及插入插件
                WebVideoCtrl.I_InitPlugin('100%', '100%', {
                  bWndFull: true, // 但窗口双击全屏
                  iPackageType: 2, // 封装格式 无插件只能是2
                  iWndowType: 1, // 分屏类型 1*1 2*2 ....
                  bNoPlugin: true, // 开启无插件模式
                  cbInitPluginComplete: function () {
                    console.log("初始化成功！");
                    WebVideoCtrl.I_InsertOBJECTPlugin("divPlugin");
                  }
                });
            },
            // 登录
            clickLogin() {
                if (!this.ip || !this.port) {
                    return
                }
                let that = this
                this.szDeviceIdentify = this.ip+"_"+this.port
                WebVideoCtrl.I_Login(this.ip, 1, this.port, this.username, this.password,                 
                {
                  success: function(xmlDoc) {
                    that.getChannelInfo() // 获取模拟通道
                    that.getDevicePort() // 获取端口 （影响不大）
                  }   
                })
            },
            // 获取模拟媒体通道
            getChannelInfo() {
               let self = this
               if (!this.szDeviceIdentify) {
                   return
               }
            //    WebVideoCtrl.I_GetAnalogChannelInfo(self.szDeviceIdentify, {
            //      async: false,
            //      success: function (xmlDoc) {
            //        let oChannels = $(xmlDoc).find("VideoInputChannel");
            //        console.log('获取模拟通道成功', oChannels)
            //        $.each(oChannels, function (i) {
                      let id = $(this).find("id").eq(0).text(),
                      name = $(this).find("name").eq(0).text();
                    //   if (!name) {
                    //       name = "Camera " + (i < 9 ? "0" + (i + 1) : (i + 1));
                    //   }
                      this.channels.push({
                          id: id,
                      })
                    // });
                //  },
            //      error: function (status, xmlDoc) {
            //          console.log('获取模拟通道失败', status, xmlDoc)
            //      }
            //   });
            },
            // 获取端口 不会对预览效果造成影响
            getDevicePort() {
               if (!this.szDeviceIdentify) {
                  return
               }
               var oPort = WebVideoCtrl.I_GetDevicePort(this.szDeviceIdentify);
               console.log('获取通道端口号', oPort)
               if (oPort != null) {
                  this.deviceport = oPort.iDevicePort;
                  this.iRtspPort= oPort.iRtspPort;
               }
            },
            // 开始预览
            clickStartRealPlay() {
                let self = this
                let oWndInfo = WebVideoCtrl.I_GetWindowStatus(self.g_iWndIndex),
                iChannelID = self.channels[0].id
                if (!this.szDeviceIdentify) {
                    return;
                }
                var startRealPlay = function () {
                    WebVideoCtrl.I_StartRealPlay(self.szDeviceIdentify, {
                        iRtspPort: parseInt(self.deviceport, 10), // RTSP端口必须是int
                        iStreamType: 1, // 码流类型：1-主码流 必须int
                        iChannelID: parseInt(iChannelID, 10), // 播放通道 必须int
                        bZeroChannel: false, // 是否播放零通道 默认false
                        success: function () {
                            console.log("预览成功")
                        },
                        error: function (status, xmlDoc) {
                            console.log("预览失败", status, xmlDoc)
                        }
                    });
                };
                if (oWndInfo != null) {// 已经在播放了，先停止
                    WebVideoCtrl.I_Stop({
                        success: function () {
                            startRealPlay();
                        }
                    });
                } else {
                    startRealPlay();
                }
            }
        }
    }
</script>
<style>
.plugin{
  width:500px;
  height:300px;
}
</style>