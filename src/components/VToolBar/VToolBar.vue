<!--
 * @description: 顶部导航栏
 * @since: 2019-11-07 20:40:08
 * @Author: jawnwa22
 * @LastEditors: Tao
 * @LastEditTime: 2021-04-07 13:47:49
 -->
<template>
  <header
    class="v-toolbar"
    @click="yifu = false; showscreen = false"
    :class="{ colordiv: $store.state.color == 'grey' }"
  >
    <div @click="warnIfon1" class="v-toolbar__content">
      <div class="header-top">
        <div class="logo-content">
          <img class="logo" src alt />
        </div>
        <div class="divider"></div>
        <div class="title">{{ TitleText }}</div>
        <div class="v-spacer"></div>
        <div class="header-screen" @click.stop="appchange">
          <img src="../../assets/images/app.png" alt class="app-class" />
        </div>
        <div class="app-list" :class="{ colortip: $store.state.color == 'grey' }" v-show="appShow">
          <ul>
            <li @click="appdownloadcode('移动端下载')">{{ lang.AppDownload }}</li>
            <li @click="appdownloadcode('工程码')">{{ lang.EngineeringCode }}</li>
          </ul>
        </div>
        <div class="header-screen" @click.stop="screenchange">
          <img src="../../assets/images/tv.png" alt />
        </div>
        <div
          class="screen-arr"
          :class="{ colortip: $store.state.color == 'grey' }"
          v-show="showscreen"
        >
          <ul>
            <li @click="activechange('one')">
              <img v-if="activeli == 'one'" src="../../assets/images/screen_selected.png" alt />
              <img v-else src="../../assets/images/screen_normal.png" alt />
              <div class="screen_word">{{ lang.FitScreen }}</div>
            </li>
            <li @click="activechange('two')">
              <img v-if="activeli == 'two'" src="../../assets/images/original_selected.png" alt />
              <img v-else src="../../assets/images/original_normal.png" alt />
              <div class="screen_word">{{ lang.OriginalSize }}</div>
            </li>
            <li @click="activechange('three')">
              <img v-if="activeli == 'three'" src="../../assets/images/width_selected.png" alt />
              <img v-else src="../../assets/images/width_normal.png" alt />
              <div class="screen_word">{{ lang.FitWidth }}</div>
            </li>
            <li @click="activechange('four')">
              <img v-if="activeli == 'four'" src="../../assets/images/high_selected.png" alt />
              <img v-else src="../../assets/images/hight_normal.png" alt />
              <div class="screen_word">{{ lang.FitHeight }}</div>
            </li>
          </ul>
        </div>
        <div class="warn-info1" @click.stop="yifuchange">
          <img src="../../assets/images/yifu.png" ref="warn_infoImg" />
        </div>
        <div
          class="warn_pop1"
          v-show="yifu"
          @click.stop="yifu2"
          :class="{ colortip: $store.state.color == 'grey' }"
        >
          <div class="left">
            <div class="radio">
              <div>
                <div class="white" :class="{ selectradio: selectradio }" @click="white"></div>
              </div>
              <span>{{ lang.StandardWhite }}</span>
            </div>
          </div>
          <div class="right">
            <div class="radio">
              <div>
                <div class="lai" :class="{ selectradio: !selectradio }" @click="lai"></div>
              </div>
              <span>{{ lang.BusinessGrey }}</span>
            </div>
          </div>
        </div>
        <div @click.stop="warnIfon()" class="warn-info">
          <img src="../../assets/images/warn.png" class="warn_infoImg" ref="warn_infoImg" />
          <span ref="warn_text" class="warn_text">{{ TotalNum }}</span>
        </div>

        <div @click.stop="login" class="user-info">
          <img
            src="~@/assets/images/icon_user_info.png"
            alt
            class="user-info-icon"
            ref="user_infoImg"
          />
        </div>
      </div>
      <div class="header-nav">
        <div v-if="header_login" @click.stop="headerFun()" class="header_login">...</div>
        <div class="nav-item" v-for="(item, index) in Menus" :key="index">
          <router-link
            class="link-to"
            @click.native="sad1(item)"
            :to="{ path: item.to, query: { id: item.id/* , title: item.title  */} }"
            :class="{ 'now': now === item.title ? true : false }"
          >{{ item.title }}</router-link>
          <div
            v-if="item.children && item.children.length > 0"
            class="nav-newItem"
            :class="{ colortip: $store.state.color == 'grey' }"
          >
            <div
              v-for="(newItem, newIndex) in item.children"
              :key="newIndex"
              class="newItem"
              :class="{ colortip: $store.state.color == 'grey' }"
            >
              <router-link
                class="link-to"
                @click="fff(newItem.id)"
                :to="{ path: newItem.to, query: { id: newItem.id/* , title: newItem.title  */} }"
                v-if="item.children"
                :class="{ 'nowchildren': nowchildrem === newItem.title ? true : false }"
                @click.native="sad2(newItem, item)"
              >{{ newItem.title }}</router-link>
            </div>
          </div>
        </div>
      </div>

      <div v-if="headerNav2Show" class="header-nav header-nav2">
        <div class="nav-item nav-item1" v-for="(item, index) in Menus2" :key="index">
          <router-link
            class="link-to"
            :to="{ path: item.to, query: { id: item.id/* , title: item.title  */} }"
            :class="{ 'now': now === item.title ? true : false }"
            @click.native.stop="sad1(item)"
          >{{ item.title }}</router-link>
          <div
            v-if="item.children && item.children.length > 0"
            class="nav-newItem"
            :class="{ colortip: $store.state.color == 'grey' }"
          >
            <div
              v-for="(newItem, newIndex) in item.children"
              :key="newIndex"
              class="newItem"
              :class="{ colortip: $store.state.color == 'grey' }"
            >
              <router-link
                class="link-to"
                :to="{ path: newItem.to, query: { id: newItem.id/* , title: newItem.title */ } }"
                v-if="item.children"
                :class="{ 'nowchildren': nowchildrem === newItem.title ? true : false }"
                @click.native.stop="sad2(newItem, item)"
              >{{ newItem.title }}</router-link>
            </div>
          </div>
        </div>
      </div>

      <div v-show="wranShow" @click="warnIfon2" class="warn_popBox"></div>
      <div v-show="loginShow" @click="loginIfon" class="warn_popBox"></div>
      <div v-show="yifu" @click="yifu1" class="warn_popBox"></div>
      <div v-show="showscreen" @click="screenchange1" class="warn_popBox"></div>
      <div v-show="appShow" @click="appchange1" class="warn_popBox"></div>
    </div>

    <div v-show="wranShow" class="warn_pop" :class="{ colordiv: $store.state.color == 'grey' }">
      <div @click="warnFun('易损件寿命管理')" class="warn_row1">
        <span class="text">{{ lang.ToDoWearingParts }}</span>
        <span class="num">{{ vulnerablePartNum }}</span>
      </div>
      <div @click="warnFun('点巡检管理')" class="warn_row1">
        <span class="text">{{ lang.PointInspectionManage_ToDoInspection }}</span>
        <span class="num">{{ pointInspectionNum }}</span>
      </div>
      <div @click="warnFun('保养管理')" class="warn_row1">
        <span class="text">{{ lang.MaintenanceManage_ToDoMaintenance }}</span>
        <span class="num">{{ maintainNum }}</span>
      </div>

      <div @click="warnFun('维修管理')" class="warn_row1">
        <span class="text">{{ lang.RepairManage_ToDoRepair }}</span>
        <span class="num">{{ repairNum }}</span>
      </div>
    </div>

    <div v-show="loginShow" class="login_pop" :class="{ colordiv: $store.state.color == 'grey' }">
      <div class="login_row1">
        <span class="text">{{ userName1 }}</span>
        <span class="name">{{ userName }}</span>
      </div>
      <div @click="modifyFun" class="login_row2">
        <div class="el-icon-lock lock"></div>
        <span class="mofi">{{ localData.Main_Record_ChangePassword }}</span>
      </div>

      <div @click="softwareFun" class="login_row2">
        <div class="warn_img el-icon-warning-outline"></div>
        <span>{{ localData.Main_Record_SoftwareInfo }}</span>
      </div>

      <div @click="outlogin" class="login_row2">
        <div class="loginImg"></div>
        <span class="loginOut">{{ localData.Main_Record_Logout }}</span>
      </div>
    </div>

    <!-- 关于软件弹窗 -->
    <div v-show="softwareShow" class="software">
      <div class="software_head">
        <span>{{ lang.AboutUsView_AboutSoftWare }}</span>
        <i @click="softwareCloseFun" class="close el-icon-close"></i>
      </div>
      <div class="software_conter">
        <div class="software_imgBox">
          <img class="software_img" />
        </div>
        <div class="software_right">
          <div class="software_text">{{ wareTitleText }}</div>
        </div>
      </div>
      <div class="software_fool">
        <span class="text">Powered by SYC</span>
        <div class="software_img2"></div>
      </div>
    </div>
    <!-- 关于app二维码弹窗 -->
    <div
      v-show="appCodeShow"
      class="software"
      :class="{ appsoftware: appTitle == lang.EngineeringCode }"
    >
      <div class="software_head" :class="{ colordiv: $store.state.color == 'grey' }">
        <!-- <span>{{lang.AboutUsView_AboutSoftWare}}</span> -->
        <span :class="{ colordiv1: $store.state.color == 'grey' }">{{ appTitle }}</span>
        <i
          @click="softwareCloseFun"
          class="close el-icon-close"
          :class="{ colordiv1: $store.state.color == 'grey' }"
        ></i>
      </div>
      <div class="app-conter">
        <div v-show="appTitle == lang.AppDownload">
          <div class="app-conter-head">
            <div
              class="head-item"
              :class="!apptype ? 'head-item-selected' : ''"
              @click.stop="apptypechange(0)"
            >Android</div>
            <div
              class="head-item"
              :class="apptype ? 'head-item-selected' : ''"
              @click.stop="apptypechange(1)"
            >IOS</div>
          </div>
          <div class="app-conter-body">
            <div v-show="!apptype" class="app-android-class">
              <div id="appAndroidImg" class="app-android-img">
                <img :src="androidImgUrl" />
              </div>
              <div class="app-android-v">{{ appVersion }}</div>
              <div class="app-android-btn">
                <!-- <div class="app-btn-copyimg" @click.stop="copyImage('appAndroidImg')">{{lang.CopyPicture}}</div> -->
                <div class="app-btn-keepimg" @click.stop="keepImgFun(0)">{{ lang.SavePicture }}</div>
              </div>
            </div>
            <div v-show="apptype" class="app-ios-class">
              <div class="app-ios-item">
                <div class="ios-text">
                  <div>
                    <div class="ios-tags-icon">1</div>
                    <!-- 安装TestFlight -->
                    {{ lang.InstallTestFlight }}
                  </div>
                  <div class="ios-tips">
                    <!-- 可在App Store搜素或扫描下方二维码下裁 -->
                    {{ lang.AppStoreSearch }}
                  </div>
                </div>
                <div class="app-android-class app-ios-top">
                  <div class="app-android-img ios-left">
                    <img :src="TestFlightImgUrl" />
                  </div>
                  <div class="app-android-v ios-left-text">
                    <!-- TestFlight下载 -->
                    {{ lang.TestFlightDownload }}
                  </div>
                  <div class="app-android-btn">
                    <!-- <div class="app-btn-copyimg">{{lang.CopyPicture}}</div> -->
                    <div class="app-btn-keepimg" @click.stop="keepImgFun(1)">{{ lang.SavePicture }}</div>
                  </div>
                </div>
              </div>
              <div class="app-ios-item">
                <div class="ios-text">
                  <div>
                    <div class="ios-tags-icon">2</div>
                    <!-- 安装盛云圈移动端 -->
                    {{ lang.InstallShengYunquan }}
                  </div>
                  <div class="ios-tips">
                    <!-- 扫描下方二维码，跳转至TestFlight中下载 -->
                    {{ lang.ScanBarcode }}
                  </div>
                </div>
                <div class="app-android-class app-ios-top">
                  <div class="app-android-img">
                    <img :src="iosImgUrl" />
                  </div>
                  <div class="app-android-v">{{ appVersion }}</div>
                  <div class="app-android-btn">
                    <!-- <div class="app-btn-copyimg">{{lang.CopyPicture}}</div> -->
                    <div class="app-btn-keepimg" @click.stop="keepImgFun(2)">{{ lang.SavePicture }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          v-show="appTitle == lang.EngineeringCode"
          class="app-conter-body app-engineering-conter"
        >
          <div class="app-android-class engineering-top">
            <div class="app-engineering-img">
              <div class="app-android-img engineering-bg">
                <img :src="engineeringImgUrl" />
              </div>
              <div class="app-engineering-text">{{ engineeringName }}</div>
            </div>
            <div class="engineering-tips">{{ lang.DownloadApp_ToCheck }}</div>
            <div class="app-android-btn">
              <!-- <div class="app-btn-copyimg">{{lang.CopyPicture}}</div> -->
              <div class="app-btn-keepimg" @click.stop="keepImgFun(3)">{{ lang.SavePicture }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-show="loginShow1" class="login_outPop">
      <div class="login_outHead">
        <i class="warning el-icon-warning"></i>
        <span class="text">{{ lang.HT_MessageBoxCaption_Tips }}</span>
      </div>
      <div class="login_conter">
        <div>{{ `${lang.Main_MessageBox_IfLoginOut} &lt;${userName1 == lang.SuperAdmin ? 'SuperAdmin' : userName1}&gt; ?` }}</div>
      </div>
      <div class="login_btn">
        <div @click="login_no" class="login_no">{{ lang.MessageBox_NO }}</div>
        <div @click="login_yes" class="login_yes">{{ lang.MessageBox_YES }}</div>
      </div>
    </div>

    <div v-show="loginShow2" class="login_outPop">
      <div class="login_outHead">
        <i class="warning el-icon-warning"></i>
        <span class="text">{{ lang.Main_MessageBox_Title_Tips }}</span>
      </div>
      <div class="login_conter">
        <div>{{ lang.Main_MessageBox_LoginOutYes }}</div>
      </div>
      <div class="login_btn">
        <div @click="login_confirm" class="login_confirm">{{ lang.PopupCommon_Sure }}</div>
      </div>
    </div>

    <div v-show="warnPopShow" class="login_outPop">
      <div class="login_outHead">
        <i class="warning el-icon-warning"></i>
        <span class="text">{{ lang.Main_MessageBox_Title_Tips }}</span>
      </div>
      <div class="login_conter">
        <div>{{ lang.MainWindowViewModel_ModuleIsNotActive }}</div>
      </div>
      <div class="login_btn">
        <div @click="warn_confirm" class="login_confirm">{{ lang.PopupCommon_Sure }}</div>
      </div>
    </div>

    <div v-show="modifyPopShow" class="login_outPop">
      <div class="login_outHead">
        <i class="warning el-icon-warning"></i>
        <span class="text">{{ lang.Main_MessageBox_Title_Tips }}</span>
      </div>
      <div class="login_conter">
        <div>{{ modifyText }}</div>
      </div>
      <div class="login_btn">
        <div @click="lock_confirm" class="login_confirm">{{ lang.PopupCommon_Sure }}</div>
      </div>
    </div>

    <div v-show="modifyShow" class="modify_pop">
      <div class="modify_popHead">
        <div>{{ lang.AboutUsView_ChangePassword }}</div>
        <i @click="closeFun" class="el-icon-close close"></i>
      </div>
      <div class="modify_conter">
        <div class="Original_password">
          <div class="text1">{{ lang.AboutUsView_OldPassword }}</div>
          <div class="ip1">
            <el-input
              show-password
              v-model="Original_password"
              :placeholder="lang.AboutUsView_PEOriginalPassword"
            ></el-input>
          </div>
        </div>
        <div class="New_password">
          <div class="text2">{{ lang.AboutUsView_NewPassword }}</div>

          <div class="ipt2">
            <el-input
              show-password
              v-model="New_password"
              :placeholder="lang.AboutUsView_PEPassword"
            ></el-input>
          </div>
        </div>
        <div class="confirm_password">
          <div class="text3">{{ lang.AboutUsView_ConfirmPassword }}</div>
          <div class="ipt3">
            <el-input
              show-password
              v-model="confirm_password"
              :placeholder="lang.AboutUsView_PEPasswordAgain"
            ></el-input>
          </div>
        </div>
        <div class="modify_fool">
          <div @click="modify_confim" class="modify_Btnconfim">{{ lang.PopupCommon_Sure }}</div>
          <div @click="closeFun" class="modify_Btncencel">{{ lang.PopupCommon_Cancel }}</div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import Nav from './Nav.js';
import '../../../public/jquery.signalR-2.4.1.js'
import Utils from '../../assets/js/util.js'
export default {
  data() {
    return {
      now: '全厂管网图',
      activeli: 'two',
      Nav,
      Menus: [],
      Menus2: [],
      nowchildrem: '',
      text: '',
      title: '',
      aaa: '',
      routeData: [],
      wranShow: false,
      loginShow: false,
      softwareShow: false,
      userName: '',
      userName1: '',
      loginShow2: false,
      loginShow1: false,
      warnPopShow: false,
      userid: '',
      routerShow: true,
      modifyShow: false, //修改密码弹窗
      lockShow: false, //修改密码
      vulnerablePartNum: 0, //易损件
      pointInspectionNum: 0, //点巡检
      maintainNum: 0, //保养
      repairNum: 0, //维修
      TotalNum: 0, //总数
      Original_password: '', //原密码
      New_password: '', //新密码
      confirm_password: '', //确认密码
      modifyText: '', //修改密码提示文本
      modifyPopShow: false,
      selectradio: true,
      yifu: false,
      showscreen: false,
      color: '',
      header_login: false,
      headerNav2Show: false,
      TitleText: '',
      wareTitleText: '',
      userTime: null,
      tt: null,
      touristTime: null,
      localData: {
        Main_Record_SoftwareInfo: '',
        Main_Record_ChangePassword: '',
        Main_Record_Logout: '',
        SuperAdmin: '',
      },
      lang: '',
      appShow: false,
      appCodeShow: false,
      appTitle: '',
      apptype: 0,
      androidImgUrl: '',
      TestFlightImgUrl: '',
      iosImgUrl: '',
      appVersion: '',
      engineeringImgUrl: '',
      engineeringName: ''
    };
  },
  watch: {
    $route(a) {
      this.$store.state.routename = a;
    },
    Menus(val) {
      console.log(val)
    }
  },
  destroyed() {
    clearInterval(this.userTime)
    clearInterval(this.touristTime)
  },
  
  mounted() {
    // this.$nextTick(() => {
    //     this.lang = JSON.parse(localStorage.getItem('languages'))[localStorage.getItem('currentLang')]
    // })
    //  if(window.screen.width>1920){
    let a = Number(parseFloat(window.screen.width / 1920).toFixed(2))
    if (a < 1) {
      a = 0.8
    }
    $('.v-toolbar').css({
      zoom: a
    })
    //  }else{
    //  $('.v-toolbar').css({
    //      zoom:1
    //  })
    //  }
    let screen = JSON.parse(sessionStorage.getItem('screen'))
    if (!screen) {
      this.activeli = 'one';
    } else {
      this.activeli = screen
    }
    //    setTimeout(()=>{
    let width = 0
    let Menusone = []
    let Menustwo = []

    for (let i = 0; i < $('.nav-item').length; i++) {
      width += $('.nav-item')[i].cliWidth
      console.log($('.nav-item')[i])
      if (width >= (window.screen.width - (150 * a))) {
        Menusone.push(this.Menus[i])
      } else {
        Menustwo.push(this.Menus[i])
      }
    }
    this.Menus = JSON.parse(JSON.stringify(Menusone))
    this.Menus2 = JSON.parse(JSON.stringify(Menustwo))
    //    },3000)
    // this.changemenu()
    // let _this = this
    // window.onresize = changewidth(function(){
    //     _this.routerAxio()
    // });
    // function changewidth(fn){
    //     let t=true
    //     return function(){
    //             if(t){
    //                 setTimeout(() =>{
    //                   fn()
    //                   t=true
    //                 },500)
    //             }
    //     }
    // }
    //最小化过久websockets会断开
    document.addEventListener('webkitvisibilitychange', () => {
      var hidden = event.target.webkitHidden;
      if (!hidden) {
        //websockets建立连接
        this.ChartTime()
      }
    });
    //监听浏览器是否有同时登录多个，有多个时之前的页面跳转至登录页面
    setTimeout(() => {
      this.userTime = setInterval(() => {
        let userName = localStorage.getItem('isUser')
        let userType
        if (sessionStorage.getItem('userInfo1') == null) {
          userType = undefined
        } else {
          userType = sessionStorage.getItem('userInfo1').SCMSUserName
        }
        if (userType != undefined) {
          let tourist = localStorage.getItem('tourist')
          if (userName != this.$store.state.userId) {
            this.$router.push('/login');
          }
          if (tourist != this.tt) {
            this.$router.push('/login');
          }
        }
      }, 1000);
    }, 2000);

    this.tt = this.$moment().valueOf()
    localStorage.setItem('tourist', this.tt)
    //   setTimeout(() => {    
    //       this.touristTime = setInterval(()=>{
    //           let userType = sessionStorage.getItem('userInfo1')
    //            if(userType == 'null' || userType == null){
    //                let tourist = localStorage.getItem('tourist')
    //                if(tourist != this.tt){
    //                    this.$router.push('/login');
    //                }
    //            }
    //        },1000)
    //   },2000)
    //登录成功 登录logo切换图片
    this.color = this.$store.state.color;
    if (this.color == 'grey') {
      this.selectradio = false;
    } else {
      this.selectradio = true;
    }
    this.routerAxio();
    var userinfo = JSON.parse(sessionStorage.getItem('userInfo1'));
    if (userinfo == null) {
      this.userid = '';
      this.$refs.user_infoImg.src = require('../../assets/images/icon_user_info.png');
    } else {
      this.$refs.user_infoImg.src = require('../../assets/images/登录成功.png');
      this.userid = '157143fe-7626-472b-a3b0-188616f94f6e';
    }
    //配置页面logo
    this.initTextLogo()


  },
  created() {
    var $this = this
    this.$axios({
      method: 'post',
      url: `/api/main/Main_GetStaticMultiLanguage`,
    }).then(res => {
      if (res.data.code === 0) {
        let currentLang = localStorage.getItem('currentLang')
        let langType = currentLang ? currentLang : 'Main_Language_ZH'
        localStorage.setItem('languages', JSON.stringify(res.data.data))
        localStorage.setItem('currentLang', langType)
        $this.getLocalData()
        $this.lang = JSON.parse(localStorage.getItem('languages'))[localStorage.getItem('currentLang')]
      }
    }).catch(err => {
      // console.log('err', err);
    });
    //websockets建立连接
    this.ChartTime()

    //标准模块按钮权限
    this.powerBtn()

    //导航栏过多换行显示默认为false
    var self = this
    window.onclick = function () {
      self.headerNav2Show = false
    }
  },
  methods: {
    functionA(arr){
     Utils.$emit('demo',arr)
    },
    //保存app图片
    keepImgFun(type) {
      if (type == 0) {
        this.downloadIamge(this.androidImgUrl, 'CMS-android-App')
      } else if (type == 1) {
        this.downloadIamge(this.TestFlightImgUrl, 'CMS-TestFlight')
      } else if (type == 2) {
        this.downloadIamge(this.iosImgUrl, 'CMS-ios-App')
      } else if (type == 3) {
        this.downloadIamge('/api/data/doget?url='+this.engineeringImgUrl,'CMS-engineering')
      }

    },
   
    apptypechange(type) {
      this.apptype = type
      if (!this.apptype) {
        this.androidImgUrl = '/api/app/DownloadQRCode'
      } else {
        this.TestFlightImgUrl = '/api/app/GetQrCode?type=1'
        this.iosImgUrl = '/api/app/GetQrCode?type=2'
      }

    },
    //app选择
    appdownloadcode(type) {
      this.appShow = false
      this.appCodeShow = true
      if (type == '移动端下载') {
        this.appTitle = this.lang.AppDownload
        if (!this.apptype) {
          this.androidImgUrl = '/api/app/DownloadQRCode'
        } else {
          this.TestFlightImgUrl = '/api/app/GetQrCode?type=1'
          this.iosImgUrl = '/api/app/GetQrCode?type=2'
        }
        //获取app版本号
        this.$axios({
          method: 'get',
          url: '/api/app/GetAppVersion',
        }).then(res => {
          console.log(res)
          this.appVersion = res.data
          // var ww = res.data + ';' + 'msgHubFun()'
          // eval(ww);
        })

      } else if (type == '工程码') {
        //   this.engineeringImgUrl = 
        this.appTitle = this.lang.EngineeringCode
        this.$axios({
          method: 'get',
          url: '/api/app/GetAppInfo',
        }).then(res => {
          let data = res.data
          let ServiceAddress = data.ServiceAddress
          let projectName = data.ProjectName
          let Version = data.Version
          this.engineeringImgUrl = 'http://' + ServiceAddress + '/api/View/GetProjectQrCode?projectName=' + projectName + '&includeIcon=True&transparent=False'
          // let url = 'http://' + ServiceAddress + '/api/View/GetProjectQrCode?projectName=' + projectName + '&includeIcon=True&transparent=False'
          this.engineeringName = projectName + '  V' + Version
          // this.$axios({
          //   method: 'get',
          //   url: url,
          // }).then(res => {
          //   this.engineeringImgUrl = 'data:;base64,'+res

          // })

        })

      }

    },
    //复制图片
    copyImage(id) {
      var range = document.createRange();
      range.selectNode(document.getElementById(id));
      window.getSelection().addRange(range);
      document.execCommand("Copy");
    },
    //下载图片
    downloadIamge(url, name) {
      // 将图片的src属性作为URL地址
      console.log(url)
      var a = document.createElement('a')
      var event = new MouseEvent('click')
      a.download = name || '下载图片名称'
      a.href = url
      a.dispatchEvent(event)
    },
    getLocalData() {
      let languages = JSON.parse(localStorage.getItem('languages'))
      let currentLang = localStorage.getItem('currentLang')
      this.localData.Main_Record_SoftwareInfo = languages[currentLang].Main_Record_SoftwareInfo
      this.localData.Main_Record_Logout = languages[currentLang].Main_Record_Logout
      this.localData.SuperAdmin = languages[currentLang].SuperAdmin
      this.localData.Main_Record_ChangePassword = languages[currentLang].Main_Record_ChangePassword
    },
    changemenu() {
      console.log('menu', this.Menus)
      console.log('123', this.Menus2)
    },

    // 修改自适应
    activechange(type) {
      this.activeli = type
      if (type == 'one') {
        this.$store.state.screentype = 1
      } else if (type == 'two') {
        this.$store.state.screentype = 2
      } else if (type == 'three') {
        this.$store.state.screentype = 3
      } else if (type == 'four') {
        this.$store.state.screentype = 4
      }
      sessionStorage.setItem('screen', JSON.stringify(type));
    },
    screenchange1() {
      this.showscreen = false
    },
    screenchange() {
      this.showscreen = !this.showscreen
      this.wranShow = false;
      this.loginShow = false;
      this.yifu = false
      this.appShow = !this.appShow
    },
    //图表实时、查询连接
    ChartTime() {
      window.msgHubFun = this.msgHubFun
      this.$axios({                      //权限配置请求接口
        method: 'get',
        url: '/api/hubs',
      }).then(res => {
        var ww = res.data + ';' + 'msgHubFun()'
        eval(ww);
      })
    },
    msgHubFun() {
      window.$.connection.hub.url = "/api/hubs/chart";
      this.msgHub = window.$.connection.chart;
      window.$.connection.hub.logging = false;
      this.msgHub.client.ReceivedError = function (content) {
      };
      var self = this
      try {
        //二次开发图表实时刷新调用客户端方法 接收值
        window.$.connection.subchart.client.ReceivedRealyData = function (content) {
          setTimeout(() => {    //同时调用多次会直接替换延迟50毫秒保证每次替换的值都有被监听到
            self.$store.state.typeNum = '2'                      //图表类型监听
            self.$store.state.contentData = content.Data   //图表监听动态数值 弹窗使用
            self.$store.state.contentName = content.ViewName
          }, 50)
        };
      } catch(err) {
        console.log(err)
      }
      try {
        //二次开发图表历史查询调用客户端方法  接收值
        window.$.connection.subchart.client.ReceivedQueryData = function (content) {
          setTimeout(() => {
            self.$store.state.typeNum = '1'                       //图表类型监听
            self.$store.state.contentData = content.Data   //图表监听动态数值 弹窗使用
            self.$store.state.contentName = content.ViewName
          }, 50)
        };
      } catch (err) {
        console.log(err)
      }
      try {
        window.$.connection.redisMonitor.client.RecivedRedisControlChanged = function(name,value,arr,b){
          console.log("下拉框",name,value,arr,b)
          self.functionA(arr)
        }
      } catch(err) {
        console.log(err)
      }
      try {
        //静态图片接收值
        window.$.connection.staticImageHub.client.updateWebStaticImages = function (data) {
          console.log("过来玩图片呀",data)
          setTimeout(() => {
            self.$store.state.staticImagearr = data
          }, 50)
        }
      } catch (err) {
        console.log(err)
      }
      try {
        //二次开发报警控件实时值调用客户端方法 接收值
        window.$.connection.redisMonitor.client.ReceivedAlarms = function (name, value) {
          let data = {
            name: name,
            value: value
          }
          setTimeout(() => {
            self.$store.state.ReceivedAlarms = data
          }, 50)
        }
      } catch (err) {
        console.log(err)
      }
      try {
        //主页面报警提醒消息实时值调用方法 接收值
        window.$.connection.redisMonitor.client.ReceivedDeviceMessageRemind = (content) => {
          this.vulnerablePartNum = content.vulnerablePartNum > 99 ? '99+' : content.vulnerablePartNum
          this.pointInspectionNum = content.pointInspectionNum > 99 ? '99+' : content.pointInspectionNum
          this.maintainNum = content.vulnerablePartNum > 99 ? '99+' : content.maintainNum
          this.repairNum = content.repairNum > 99 ? '99+' : content.repairNum
          var TotalNum = content.vulnerablePartNum + content.pointInspectionNum + content.maintainNum + content.repairNum
          this.TotalNum = TotalNum > 99 ? '99+' : TotalNum
          if (this.TotalNum == 0) {
            this.TotalNum = this.TotalNum
            if (document.querySelector('.warn_infoImg') != undefined) {
              document.querySelector('.warn_infoImg').src = require('../../assets/images/6d9a1ee3e274d5e414e1475c0bae615.png')
              document.querySelector('.warn_text').style.background = '#999'
              document.querySelector('.warn_text').innerHTML = this.TotalNum
            }
          } else {
            this.TotalNum = this.TotalNum
            if (document.querySelector('.warn_infoImg') != undefined) {
              document.querySelector('.warn_text').style.background = '#4270E4'
              document.querySelector('.warn_text').innerHTML = this.TotalNum
              document.querySelector('.warn_infoImg').src = require('../../assets/images/warn.png')
            }
          }
        }
      } catch(err) {
        console.log(err)
      }
      try {
        //二次开发页面脚本事件调用方法
        window.$.connection.chart.client.ReceivedExecuteScript = function (name, value) {

          //              name = [
          //                  {
          //                      Control: "FlowPipe2",
          // Property: "background",
          // Value: "Red"
        //                  }
          //              ]
          console.log('脚本数据', name)
          setTimeout(() => {
            self.$store.state.scriptData = ''
            self.$store.state.scriptData = name
          }, 50)
        }
      } catch (err) {
        console.log(err)
      }
      try {
        //二次开发页面实时监听变量点 接收值
        window.$.connection.redisMonitor.client.RecivedRedisChanged = function (name, value) {
          self.$store.state.monitorShow = value   //流动控件监听  弹窗使用
          self.$store.state.monitorName = name
          //变化时推送变量触发组件方法
          var data = {
            name: name,
            value: value
          }
          setTimeout(() => {
            self.$store.state.varChange = data  //监听变量变化
          }, 50)
        }
      } catch (err) {
        console.log(err)
      }
      try {
        //二次开发页面查询控件定时触发调用方法
        this.msgHub.client.ReceivedQueryTrigger = function (content) {
          setTimeout(() => {
            self.$store.state.setTiemValue = content  //图表定时触发监听 弹窗使用
          }, 50)
        };
        console.log("触发1",this.$route)
        console.time();
      } catch (err) {
        console.log(err)
      }
      try {
        //websockets建立连接在Vuex监听
        window.$.connection.hub.start().done(() => {
          console.timeEnd();
          console.log("触发",this.$route)
          
          setTimeout(() => {
            this.$store.state.websocketsShow = 'true'
            console.log("web改变了")
            window.$.connection.subchart.server.joinView(`${this.$route.params.pathMatch}`, localStorage.getItem('currentLang'))
          }, 50)
        }).fail(function () {
          console.log("Connect fail")
        });
      } catch(err) {
        console.log(err)
      }
    },
    //查询id
    fff(id) {
      //注册在路径在的id是用于二次开发页面 控件是否有权限的参数
      console.log('eeeeeefff', id)
    },
    //按钮初始化权限信息
    powerBtn() {
      this.loading = true
      this.$axios({
        method: 'post',
        url: '/api/UserManage/UserManage_GetRightTree',
      }).then(res => {
        this.$store.state.btnPowerData = res.data.data
      }).catch((err) => {
        console.log('err', err)
      })
    },
    //配置logo标题
    initTextLogo() {
      this.$axios({
        method: 'post',
        url: `/api/Main/Main_GetProjectInfo`,
      }).then(res => {
        console.log("saffasafsasfasfsd")
        if (res.data.data.HasConfig == 1) {
          this.TitleText = res.data.data.Config.TitleText
          document.querySelector('.logo').src = `/images/${res.data.data.Config.TitleLogo}`
          this.wareTitleText = res.data.data.Config.InfoText
          document.querySelector('.software_img').src = `/images/${res.data.data.Config.PropagandaLogo}`
        }
      }).catch(err => {
        console.log('err', err);
      });
    },
    //皮肤选择
    yifu2() {
      this.yifu = true;
      this.showscreen = false;
    },
    //点击皮肤选择
    yifuchange() {
      this.yifu = !this.yifu;
      this.wranShow = false;
      this.loginShow = false;
      this.showscreen = false
    },
    //点击登录
    login() {
      var userinfo = JSON.parse(sessionStorage.getItem('userInfo1'));
      this.wranShow = false;
      this.yifu = false;
      this.showscreen = false
      if (userinfo == null) {   //没有用登录跳转至登录页面
        this.$router.push('/login');
      } else {         //有用户登录出现关于用户弹窗
        if (userinfo.SCMSUserName == 'SuperAdmin') {
          this.lockShow = true;
        } else {
          this.lockShow = false;
        }
        this.userName = userinfo.SCMSUserAccount;
        this.userName1 = userinfo.SCMSUserName == 'SuperAdmin' ? this.localData.SuperAdmin : userinfo.SCMSUserName;
        this.loginShow = true;
      }
    },
    //修改密码
    modifyFun() {
      var userinfo = JSON.parse(sessionStorage.getItem('userInfo1'));
      if (userinfo.SCMSUserName == 'SuperAdmin') {
        this.modifyPopShow = true;
        this.modifyText = this.lang.CanNotModifyAdminPassword;
        return
      }
      this.modifyShow = true;
      this.loginShow = false;
    },
    //关闭修改密码
    closeFun() {
      this.modifyShow = false;
      this.Original_password = '';
      this.New_password = '';
      this.confirm_password = '';
    },
    //修改密码提示弹窗
    lock_confirm() {
      this.modifyPopShow = false;
      if (this.modifyText == this.lang.AboutUsView_HT_PasswordHasUpdated) {
        this.modifyShow = false;
        this.Original_password = '';
        this.New_password = '';
        this.confirm_password = '';
      }
    },
    //确认密码
    modify_confim() {
      var userinfo = JSON.parse(sessionStorage.getItem('userInfo1'));
      var userinfoId = userinfo.SCMSUserID;
      this.$axios({
        method: 'post',
        url: `/api/Main/Main_SetPassword?argLoginUserID=${userinfoId}&argOldPassword=${this.Original_password}&argNewPassword=${this.New_password}&argAgainPassword=${this.confirm_password}`,
        argLoginUserID: userinfoId,
        argOldPassword: this.Original_password,
        argNewPassword: this.New_password,
        argAgainPassword: this.confirm_password
      })
        .then(res => {
          this.modifyPopShow = true;
          if (res.data.code == 1) {
            this.modifyText = res.data.msg;
          } else {
            this.modifyText = this.lang.AboutUsView_HT_PasswordHasUpdated;
          }
        })
        .catch(err => {
          console.log('修改err', err);
        });
    },
    //显示app图标
    appchange() {
      this.appShow = true
    },
    appchange1() {
      this.appShow = false
    },
    //退出登录
    outlogin() {
      this.loginShow = false;
      this.loginShow1 = true;
    },
    //关闭用户注销确认弹窗
    login_no() {
      this.loginShow1 = false;
    },
    //关闭用户注销确认弹窗 且注销
    login_yes() {
      this.loginShow1 = false;
      this.loginShow2 = true;
      var name = JSON.parse(sessionStorage.getItem('userInfo1')).SCMSUserName
      sessionStorage.setItem('userInfo1', null);
      localStorage.setItem('tourist', this.tt)
      this.$refs.user_infoImg.src = require('../../assets/images/icon_user_info.png');
      this.routerAxio();
      this.$axios({
        method: "post",
        url: "/api/Login/Login_UserLogInOutRecord?UserName=" + name + '&Type=Main_Record_WebLoginOut',
        UserName: name,
        argPassword: '网页注销',
      }).then((res) => {
        console.log('sss', res.data.data)
      })
    },
    //点击出现换行导航栏
    headerFun() {
      this.headerNav2Show = !this.headerNav2Show
      if (this.headerNav2Show) {
        this.headerNav2Show = true
      } else {
        this.headerNav2Show = false
      }
    },
    //关闭弹窗
    login_confirm() {
      this.loginShow2 = false;
      this.$router.push('/')
      this.routerAxio()
    },
    //开启关于软件弹窗
    softwareFun() {
      this.loginShow = false;
      this.softwareShow = true;
    },
    //关闭关于软件弹窗
    softwareCloseFun() {
      this.softwareShow = false;
      this.appCodeShow = false
    },
    //开启提醒窗
    warnIfon() {
      this.wranShow = true;
      this.yifu = false;
      this.showscreen = false
      this.loginShow = false;
    },
    //关闭提醒窗
    warnIfon1() {
      this.wranShow = false;
      this.loginShow = false;
    },
    //关闭提醒窗
    warnIfon2() {
      this.wranShow = false;
    },
    loginIfon() {
      this.loginShow = false;
    },
    //关闭提醒提示
    warn_confirm() {
      this.warnPopShow = false;
    },

    //提醒跳转
    warnFun(text) {
      var textShow = false;
      for (var i = 0; i < this.routeData.length; i++) {
        if (text == this.routeData[i].title) {
          textShow = false;
          this.wranShow = false;
          if (text == '易损件寿命管理') {
            this.$router.push('/VulnerablePartManage');
          } else if (text == '点巡检管理') {
            this.$router.push('/PointInspectionManage');
          } else if (text == '保养管理') {
            this.$router.push('/MaintenanceManage');
          } else if (text == '维修管理') {
            this.$router.push('/RepairManage');
          }
          return;
        } else {
          if (this.routeData[i].children != null) {
            var data = this.routeData[i].children;
            for (var j = 0; j < data.length; j++) {
              if (text == data[j].title) {
                textShow = false;
                this.wranShow = false;
                if (text == '易损件寿命管理') {
                  this.$router.push('/VulnerablePartManage');
                } else if (text == '点巡检管理') {
                  this.$router.push('/PointInspectionManage');
                } else if (text == '保养管理') {
                  this.$router.push('/MaintenanceManage');
                } else if (text == '维修管理') {
                  this.$router.push('/RepairManage');
                }
                return;
              } else {
                textShow = true;
                this.wranShow = false;
              }
            }
          } else {
            textShow = true;
            this.wranShow = false;
          }
        }
      }
      if (textShow) {
        this.warnPopShow = true;
      }
    },
    //页面监听路由是同页面发生改变
    sad1(item) {
      this.aaa = item.title;
      console.log('页面监听路由是同页面发生改变', item)
      //主菜单只有一个子菜单的情况
      if (item.children.length === 0) {
        this.$router.push('/');
        this.$router.push({
          path: item.to,
          query: {
            id: item.id
          }
        });
        this.now = item.title;
        this.nowchildrem = '';
      }

      if (item.children == null) {
        this.now = item.title;
        this.nowchildrem = '';
      }
    },
    //改变皮肤颜色
    white() {
      this.selectradio = true;
      this.$store.state.color = 'white';
      this.color = this.$store.state.color;
      this.$store.commit('changecolor', 'white');
    },
    //改变皮肤颜色
    lai() {
      this.selectradio = false;
      this.$store.state.color = "grey";
      this.$store.commit('changecolor', 'grey');
    },
    //关闭皮肤弹窗
    yifu1() {
      this.yifu = false;
      this.showscreen = false
    },
    //页面监听路由是同页面发生改变
    sad2(newItem, item) {
      var title = newItem.title;
      if (this.title == newItem.to) {

        this.$router.push('/');
        this.$router.push({
          path: newItem.to,
          query: {
            id: newItem.id
          }
        });
      }
      this.title = newItem.to;
      this.nowchildrem = newItem.title;
      this.now = item.title;
      this.$router.push({
        path: newItem.to,
        query: {
          id: newItem.id,
          // title: newItem.title,
        }
      });
    },

    //请求路由信息
    async routerAxio() {

      var userinfo = JSON.parse(sessionStorage.getItem('userInfo1'));
      if (userinfo == null) {
        this.userid = '';
      } else {
        this.userid = userinfo.SCMSUserID;
      }
      //请求权限的
      await this.$axios({
        method: 'post',
        url: '/api/Main/Main_GetMenuKey?argUserID=' + this.userid,
        // argUserID: this.userid
      }).then(ress => {
        console.log(ress.data.data)
        //游客信息
        this.$axios({
          method: 'post',
          url: '/api/Login/Login_GetGuest'
        }).then(res => {
          var sightseerInfo = res.data.data;

          sessionStorage.setItem(
            'sightseerInfo1',
            JSON.stringify(sightseerInfo)
          );
        });
        //缓存请求全部的菜单信息
        this.$axios({
          method: 'post',
          url: '/api/Main/Main_GetNavigation'
        }).then(res => {
          sessionStorage.setItem('MenuInfo', JSON.stringify(res.data.data));
        }).catch(err => {
          console.log('res缓存请求err')
        });

        //缓存变量类型
        this.$axios({
          method: 'post',
          url: '/api/Base/GetSCMSTags'
        }).then(res => {
          sessionStorage.setItem('variable', JSON.stringify(res.data.data));
        }).catch(err => {
          console.log('res缓存请求err')
        });


        //请求权限
        this.routeData = ress.data.data;
        if (ress.data.code == 0) {
          // 如果主菜单下只有一个子菜单且子菜单为变量实时监测，则不显示该主菜单
          ress.data.data.forEach((item, index) => {
            if (item.children.length === 0 && item.permission === 'VariableMonitor') {
              ress.data.data.splice(index, 1)
            }
          })
          this.Menus = ress.data.data;
          console.log(ress.data.data)

          if (this.Menus.length != 0) {

            if (this.$route.path == '/onePath') {
              var onePath;
              var oneId
              if (ress.data.data[0].children == null || ress.data.data[0].children.length == 0) {
                onePath = ress.data.data[0].to;
                oneId = ress.data.data[0].id;
              } else {
                onePath = ress.data.data[0].children[0].to;
                oneId = ress.data.data[0].children[0].id;
              }
              this.$router.push({ path: onePath, query: { id: oneId } });
            }
            let i = 0;
            console.log(this.Menus)
            for (i in this.Menus) {
              // console.log(this.Menus)
              if (this.Menus[i].children && this.Menus[i].children.length > 0) {
                this.Menus[i].to = '';
              }
            }
            //计算第一行个数
            var cliWidth = document.body.clientWidth - 60;
            console.log("cliWidth", cliWidth)
            let MenusArr = []
            for (let j = 0; j < this.Menus.length; j++) {
              MenusArr.push(this.Menus[j].title)
            }
            var MenusSum = 0
            var MenusIndex = 0
            for (let m = 0; m < $('.header-nav').find('.nav-item').length; m++) {
              console.log($('.header-nav').find('.nav-item')[m])
            }
            console.log($($('.header-nav')[0]).children())
            console.log("MenusArr", MenusArr)
            let a11111 = Number(parseFloat(window.screen.width / 1920).toFixed(2))
            if (a11111 < 1) {
              a11111 = 0.8
            }

            for (let k = 0; k < MenusArr.length; k++) {
              var MenusSize = MenusArr[k].length
              let numL = (MenusSize * 18) > (110) ? ((MenusSize * 18) + 30) : (110)
              MenusSum = MenusSum + numL
              if (MenusSum > cliWidth / a11111) {
                MenusIndex = k
                this.header_login = true
                this.headerNav2Show = false
                break;
              }
            }
            var Menus8 = JSON.stringify(this.Menus)
            Menus8 = JSON.parse(Menus8)
            this.Menus2 = Menus8.slice(MenusIndex)
            if (MenusIndex != 0) {
              // this.Menus.splice(MenusIndex)
            }
            var MenusSum2 = 0
            var MenusArr2 = []
            MenusArr2 = MenusArr.splice(MenusIndex)
            for (var f = 0; f < MenusArr2.length; f++) {
              var MenusSize2 = MenusArr2[f].length

              let numL = (MenusSize2 * 18) > 100 ? ((MenusSize2 * 18) + 30) : 100
              MenusSum2 = MenusSum2 + numL
            }
            document.querySelector('.header-nav2').style.width = MenusSum2 + 'px'

            this.$nextTick(function () {
              if (this.$route.path == '/onePath') {
                this.nowchildrem = this.Menus[0].children[0].title;
                this.now = this.Menus[0].title;
              } else {
                for (let i = 0; i < this.Menus.length; i++) {
                  if (this.Menus[i].path) {
                    if (this.$route.path == this.Menus[i].path) {
                      this.now = this.Menus[i].title;
                    } else {
                      for (let j = 0; j < this.Menus[i].children.length; j++) {
                        if (this.$route.path == this.Menus[i].children[j].to) {
                          this.nowchildrem = this.Menus[i].children[j].title;
                        }
                      }
                    }
                  } else {
                    for (let j = 0; j < this.Menus[i].children.length; j++) {
                      if (this.$route.path == this.Menus[i].children[j].to) {
                        this.now = this.Menus[i].title;
                        this.nowchildrem = this.Menus[i].children[j].title;
                      }
                    }
                  }
                }
              }
            });
          } else {
            var loginShow = sessionStorage.getItem('loginShow')
            if (loginShow == null) {
              this.$router.push('/login');
              setTimeout(function () {
                sessionStorage.setItem(
                  'loginShow',
                  JSON.stringify('false')
                );
              }, 200)
            } else {
              this.$router.push('/');
            }
          }
        }

      }).catch(err => { });
      let width = 0
      let Menusone = []
      let Menustwo = []
      let a = Number(parseFloat(window.screen.width / 1920).toFixed(2))
      if (a < 1) {
        a = 0.8
      }
      for (let i = 0; i < $('.nav-item').length; i++) {
        width += $('.nav-item')[i].clientWidth
        console.log($('.nav-item')[i].clientWidth)
        if (width <= (window.screen.width / a - (150))) {
          Menusone.push(this.Menus[i])
        } else {
          Menustwo.push(this.Menus[i])
        }
      }
      this.Menus = JSON.parse(JSON.stringify(Menusone))
      this.Menus2 = JSON.parse(JSON.stringify(Menustwo))
    }
  }
};
</script>

<style lang="scss" scoped>
.header_login {
  position: absolute;
  top: 50px;
  right: 10px;
  width: 30px;
  height: 40px;
  background: #e9eeef;
  cursor: pointer;
  padding-left: 8px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  z-index: 999999;
}
.header_login:hover {
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);
}
.v-toolbar {
  min-width: 1200px;
  width: 100%;
  position: fixed;
  background: #fff;
  z-index: 99999;
  // z-index: 0;
  height: 90px;
  box-shadow: 0px 0px 10px 0px rgba(72, 82, 93, 0.5);
}
.modify_pop {
  width: 480px;
  height: 330px;
  box-shadow: 2px 2px 8px 2px rgba(0, 0, 0, 0.6);
  background: #eeeeee;
  position: absolute;
  left: 0;
  right: 0;
  top: 260px;
  margin: auto;
  z-index: 10;
  .modify_conter {
    width: 400px;
    height: 270px;
    margin: 0 auto;
    padding-top: 10px;
  }
  .modify_fool {
    width: 100%;
    height: 40px;
    position: relative;
    margin-top: 20px;

    .modify_Btncencel {
      position: absolute;
      right: 90px;
      top: 0;
      width: 80px;
      height: 40px;
      display: inline-block;
      border-radius: 4px;
      background: #999999;
      color: #fff;
      text-align: center;
      line-height: 40px;
      cursor: pointer;
    }
    .modify_Btnconfim {
      position: absolute;
      right: 0;
      top: 0;
      width: 80px;
      height: 40px;
      display: inline-block;
      border-radius: 4px;
      background: #386df0;
      color: #fff;
      text-align: center;
      line-height: 40px;
      cursor: pointer;
    }
  }

  .Original_password {
    width: 100%;
    height: 40px;
    overflow: hidden;
    margin-top: 15px;

    .text1 {
      float: left;
      width: 110px;
      height: 40px;
      text-align: right;
      margin-right: 18px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .ip1 {
      float: left;
      width: 270px;
      height: 40px;
    }
  }
  .New_password {
    width: 100%;
    height: 40px;
    overflow: hidden;
    margin-top: 15px;

    .text2 {
      float: left;
      width: 110px;
      height: 40px;
      text-align: right;
      margin-right: 18px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .ipt2 {
      float: left;
      width: 270px;
      height: 40px;
    }
  }
  .confirm_password {
    width: 100%;
    height: 45px;
    overflow: hidden;
    margin-top: 15px;

    .text3 {
      float: left;
      width: 110px;
      height: 40px;
      text-align: right;
      margin-right: 18px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .ipt3 {
      float: left;
      width: 270px;
      height: 40px;
    }
  }

  .modify_popHead {
    position: relative;
    width: 100%;
    height: 60px;
    background: #386df0;
    color: #fff;
    text-align: center;
    line-height: 60px;
    font-size: 20px;
  }
  .close {
    position: absolute;
    right: 12px;
    top: 16px;
    width: 24px;
    height: 24px;
    cursor: pointer;
    font-size: 26px;
  }
}

.login_outPop {
  width: 360px;
  height: 190px;
  box-shadow: 2px 2px 8px 2px rgba(0, 0, 0, 0.6);
  position: absolute;
  left: 0;
  right: 0;
  top: 260px;
  margin: auto;
  z-index: 11;
  background: #fff;
  .login_btn {
    overflow: hidden;
    margin-top: 10px;
    .login_confirm {
      width: 305px;
      height: 30px;
      line-height: 30px;
      background: #f3e3ad;
      color: #ecaa4e;
      margin-left: 30px;
      text-align: center;
      cursor: pointer;
    }
    .login_no {
      width: 155px;
      height: 30px;
      float: left;
      background: #e0e0e0;
      color: #8e8e8e;
      text-align: center;
      line-height: 30px;
      margin-left: 22px;
      cursor: pointer;
    }
    .login_yes {
      width: 155px;
      height: 30px;
      float: left;
      background: #f3e3ad;
      color: #ecaa4e;
      margin-left: 5px;
      text-align: center;
      line-height: 30px;
      cursor: pointer;
    }
  }
  .login_conter {
    display: flex;
    align-items: center;
    font-size: 16px;
    width: 100%;
    height: 100px;
    text-align: center;
    // line-height: 100px;
    vertical-align: middle;
    padding: 0 20px;

    div {
      width: 100%;
    }
  }

  .login_outHead {
    width: 100%;
    height: 30px;
    background: #ffbc3d;
    text-align: center;
    line-height: 30px;

    .warning {
      color: #fff;
      margin-right: 5px;
    }
    .text {
      font-size: 16px;
      color: #fff;
    }
  }
}

.software {
  width: 800px;
  height: 500px;
  position: absolute;
  left: 0;
  background: #eeeeee;
  right: 0;
  margin: auto;
  margin-top: 100px;
  box-shadow: 2px 2px 8px 2px rgba(0, 0, 0, 0.6);
  .software_head {
    width: 100%;
    height: 60px;
    background: #386df0;
    text-align: center;
    line-height: 60px;
    color: #fff;
    position: relative;
    font-size: 20px;
  }
  .software_conter {
    width: 90%;
    height: 345px;
    margin: auto;
    border-bottom: 1px solid #cccccc;
    box-sizing: border-box;
    position: relative;
    overflow: hidden;
    .software_imgBox {
      width: 400px;
      height: 300px;
      background-size: cover;
      position: relative;
      left: 0;
      top: 25px;
      bottom: 0;
      margin: auto 0;
      float: left;
    }
    .software_right {
      float: right;
      margin-top: 25px;
      width: 320px;
      height: 300px;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .software_img {
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      right: 0;
      margin: auto;
    }
    img {
      max-width: 100%;
      max-height: 100%;
    }
    .software_text {
      font-size: 18px;
      color: #333333;
      white-space: pre-wrap;
      text-decoration: none;
    }
  }
  .software_fool {
    width: 90%;
    height: 73px;
    margin: auto;
    position: relative;
    .software_img2 {
      position: absolute;
      right: 15px;
      top: 30px;
      width: 140px;
      height: 30px;
      background: url("../../assets/images/syclogo.png");
      background-size: cover;
    }
    .text {
      position: absolute;
      top: 34px;
      left: 15px;
      font-size: 16px;
    }
  }
  .close {
    position: absolute;
    top: 10px;
    right: 10px;
    color: #fff;
    font-size: 40px;
    cursor: pointer;
  }
}
.warn_popBox {
  position: absolute;
  width: 1920px;
  height: 1080px;
  z-index: 11;
}
.login_pop {
  position: absolute;
  width: 195px;
  padding-bottom: 10px;
  background: #fff;
  box-shadow: 2px 2px 8px 2px rgba(0, 0, 0, 0.6);
  top: 50px;
  right: 18px;
  padding-top: 10px;
  z-index: 12;
  box-sizing: border-box;
  .warn_img {
    font-size: 20px;
    margin-left: 5px;
    margin-right: 8px;
  }
  .login_row1 {
    width: 90%;
    // height: 75px;
    margin: auto;
    text-align: center;
    cursor: pointer;
    // overflow: auto;
    .text {
      display: block;
      padding: 10px 0;
      font-size: 17px;
      color: #5b83e7;
    }
    .name {
      font-size: 16px;
      display: block;
      padding-bottom: 10px;
      color: #5b83e7;
    }
  }
  .login_row1:hover {
    background: #e7eef5;
  }
  .login_row2:hover {
    background: #e7eef5;
  }
  .login_row2 {
    width: 90%;
    height: 40px;
    margin: 2px auto 0;
    overflow: hidden;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    .lock {
      font-size: 23px;
      margin-left: 5px;
      margin-right: 8px;
    }
    .loginImg {
      width: 19px;
      height: 19px;
      background: url("../../assets/images/login_porper2.png");
      background-size: cover;
      margin-left: 5px;
      margin-right: 8px;
    }
  }
}
.warn_pop1 {
  position: absolute;
  top: 50px;
  right: 190px;
  width: 190px;
  height: 100px;
  background: #fff;
  box-shadow: 0px 0px 8px 0px rgba(72, 82, 93, 0.5);
  border-radius: 4px;
  z-index: 12;
  overflow: hidden;
  display: flex;
  align-items: center;
  .left {
    flex: 1;
    height: 100%;
    display: flex;
    align-items: center;
    .radio {
      flex: 1;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      > div {
        width: 100%;
        display: flex;
        justify-content: center;
      }
      > span {
        text-align: center;
        font-size: 12px;
      }
    }
    .white {
      width: 39px;
      height: 39px;
      background: rgba(255, 255, 255, 1);
      border: 1px solid rgba(198, 198, 200, 1);
      border-radius: 50%;
      margin-bottom: 10px;
    }
  }
  .right {
    flex: 1;
    height: 100%;
    display: flex;
    align-items: center;
    .radio {
      flex: 1;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      > div {
        width: 100%;
        display: flex;
        justify-content: center;
      }
      > span {
        text-align: center;
        font-size: 12px;
      }
    }
    .lai {
      width: 39px;
      height: 39px;
      background: rgba(217, 219, 222, 1);
      border: 1px solid rgba(198, 198, 200, 1);
      border-radius: 50%;
      margin-bottom: 10px;
    }
  }
}
.selectradio {
  border: 2px solid rgba(70, 118, 248, 1) !important;
}
.warn_pop {
  position: absolute;
  top: 50px;
  right: 60px;
  width: 180px;
  height: 180px;
  background: #fff;
  box-shadow: 2px 2px 8px 2px rgba(0, 0, 0, 0.6);
  padding-top: 10px;
  box-sizing: border-box;
  z-index: 12;

  .warn_row1:hover {
    background: #e7eef5;
  }

  .warn_row1 {
    width: 90%;
    height: 40px;
    margin: auto;
    line-height: 40px;
    font-size: 15px;
    overflow: hidden;
    cursor: context-menu;

    .text {
      float: left;
    }
    .num {
      float: right;
      color: #5e86e7;
    }
  }
}

.header-top {
  @include vc;
  height: 40px;
  // height:4.1vh;
  .logo-content {
    @include vc;
    max-width: 250px;
    height: 30px;
    margin-top: 10px;

    img {
      max-width: 100%;
      max-height: 100%;
      object-fit: contain;
    }
    padding: 0 38px;

    .scms {
      color: #333333;
      font-size: 20px;
    }
  }
  .app-class {
    height: 80%;
    width: 80%;
    margin-top: 10%;
    margin-left: 10%;
  }
  .divider {
    width: 1px;
    height: 24px;
    background-color: #bbbbbb;
  }
  .title {
    margin-left: 30px;
    color: #333333;
    font-size: 20px;
  }
  .warn-info {
    width: 70px;
    height: 40px;
    padding-left: 5px;
    box-sizing: border-box;
    margin-right: 25px;
    position: relative;
    cursor: pointer;

    img {
      width: 25px;
      height: auto;
      margin-top: 7px;
    }

    .warn_text {
      display: inline-block;
      border-radius: 8px;
      background: blue;
      color: #fff;
      width: 32px;
      height: 20px;
      margin-left: 5px;
      text-align: center;
      line-height: 20px;
      position: absolute;
      top: 9px;
      left: 28px;
    }
  }
  .warn-info1 {
    width: 40px;
    height: 40px;
    margin-right: 25px;
    border-radius: 4px;
    position: relative;
    cursor: pointer;

    img {
      width: 27px;
      height: 23px;
      top: 0;
      bottom: 0;
      right: 0;
      left: 0;
      position: absolute;
      margin: auto;
    }
  }

  .user-info:hover {
    box-shadow: 2px 2px 8px 2px rgba(0, 0, 0, 0.6);
  }
  .warn-info1:hover {
    box-shadow: 2px 2px 8px 2px rgba(0, 0, 0, 0.6);
  }
  .logout:hover {
    box-shadow: 2px 2px 8px 2px rgba(0, 0, 0, 0.6);
  }
  .warn-info:hover {
    box-shadow: 2px 2px 8px 2px rgba(0, 0, 0, 0.6);
  }

  .user-info {
    @include center;
    width: 40px;
    height: 40px;
    margin-right: 25px;
    cursor: pointer;

    .user-info-icon {
      width: 24px;
      height: auto;
    }
  }
  .logout {
    width: 40px;
    height: 40px;
    margin-right: 25px;
    cursor: pointer;

    @include center;
    .logout-icon {
      width: 18px;
      height: auto;
    }
  }
}

.header-nav2 {
  background: #fff;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);
  margin-top: 10px;
  float: right;
}

.header-nav {
  height: 50px;
  // height:5.2vh;
  padding-left: 20px;
  @include vc;
  .nav-item {
    position: relative;
    height: 40px;
    // height:110px;
    text-align: center;
    .link-to {
      white-space: nowrap;
      padding: 8px 10px;
      margin: 0 5px;
      min-width: 100px;
      display: inline-block;
      box-sizing: border-box;
      text-decoration: none;
      color: #767a84;
      font-size: 16px;
      &:hover {
        color: #4270e4;
        font-weight: bold;
      }
    }
    .nav-newItem {
      position: absolute;
      top: 35px;
      display: none;
      max-height: 750px;
      overflow: auto;
      padding-bottom: 10px;
      background: #fff;
      text-align: center;
      box-shadow: 0px 3px 5px 0px rgba(72, 82, 93, 0.5);
      .newItem {
        background-color: #fff;
        height: 40px;
        line-height: 40px;
      }
    }
    &:hover .nav-newItem {
      display: block;
    }
  }
}
.now {
  border-bottom: 3px solid #4270e4;
  color: #4270e4 !important;
}
.nowchildren {
  border-bottom: 3px solid #4270e4;
  color: #4270e4 !important;
}
.header-nav .nav-item .nav-newItem .newItem {
  line-height: 30px;
}
.newItem:hover {
  background-color: #e7eef5 !important;
}
.colordiv {
  background-color: #d9dbde !important;
}
.colortip {
  background-color: #efeff0 !important;
}
.header-screen {
  width: 40px;
  height: 40px;
  margin-right: 20px;
  border-radius: 4px;
  position: relative;
  cursor: pointer;
  img {
    width: 100%;
    height: 100%;
  }
}
.header-screen:hover {
  box-shadow: 2px 2px 8px 2px rgba(0, 0, 0, 0.6);
}

.screen-arr {
  position: absolute;
  top: 50px;
  right: 245px;
  width: 165px;
  height: 150px;
  background: #fff;
  -webkit-box-shadow: 0px 0px 8px 0px rgb(72 82 93 / 50%);
  box-shadow: 0px 0px 8px 0px rgb(72 82 93 / 50%);
  border-radius: 4px;
  z-index: 12;
  overflow: hidden;
  ul {
    width: 100%;
    height: 100%;
    list-style: none;
    padding: 10px;
    padding-bottom: 0px;
    li {
      width: 50%;
      height: 50%;
      float: left;
      cursor: pointer;
      position: relative;
      .screen_word {
        font-size: 8px;
        height: calc(100% - 35px);
        line-height: 32px;
        width: 100%;
        text-align: center;
        position: absolute;
        bottom: 0;
      }
      img {
        width: 35px;
        height: 35px;
        position: absolute;
        left: 0;
        top: 0px;
        right: 0;
        margin: auto;
      }
    }
  }
}
.app-list {
  position: absolute;
  top: 50px;
  right: 245px;
  width: 160px;
  height: 100px;
  background: #fff;
  -webkit-box-shadow: 0px 0px 8px 0px rgb(72 82 93 / 50%);
  box-shadow: 0px 0px 8px 0px rgb(72 82 93 / 50%);
  border-radius: 4px;
  z-index: 12;
  overflow: hidden;
  ul {
    width: 100%;
    height: 100%;
    list-style: none;
    padding: 10px;
    // padding-bottom: 0px;
    font-size: 16px;
    color: #222222;
    li {
      width: 100%;
      height: 50%;
      float: left;
      cursor: pointer;
      position: relative;
      line-height: 40px;
      .screen_word {
        font-size: 8px;
        height: calc(100% - 35px);
        line-height: 32px;
        width: 100%;
        text-align: center;
        position: absolute;
        bottom: 0;
      }
      &:hover {
        background: #e7eef5;
      }
    }
  }
}
.app-conter {
  // padding-top: 20px;
  width: 90%;
  height: calc(100% - 60px);
  margin: auto;
  // border-bottom: 1px solid #cccccc;
  box-sizing: border-box;
  position: relative;
  overflow: hidden;
  .app-conter-head {
    margin: 20px 0;
    .head-item {
      width: 50%;
      display: inline-block;
      text-align: center;
      height: 40px;
      line-height: 40px;
      background: #dcdcdc;
      border-bottom: 3px solid #d2d2d2;
      box-sizing: border-box;
      &:hover {
        background: #e5e5e5;
      }
    }
    .head-item-selected {
      color: #1d89ed;
      border-bottom: 3px solid #1d89ed;
    }
  }
  .app-conter-body {
    background: #e5e5e5;
    height: 340px;
    border: 1px solid #d5d5d5;
    border-radius: 6px;
    position: relative;
    .app-android-class {
      position: absolute;
      top: 15%;
      // background: #222222;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      flex-direction: column;
      width: 100%;
      align-items: center;

      .app-android-img {
        // position: absolute;
        width: 180px;
        height: 180px;
        background: #34bc83;
        border-radius: 5px;
        padding: 10px;
        // left: 50%;
        // margin-left: -80px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .app-android-v {
        font-size: 16px;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: #34bc83;
        padding: 10px 0;
      }
    }
    .app-ios-class {
      overflow: hidden;
      height: 100%;
      .app-ios-item {
        float: left;
        width: 50%;
        position: relative;
        height: 100%;
        .ios-tags-icon {
          box-sizing: border-box;
          background: rgba(0, 0, 0, 0.2);
          border: 2px solid #9c9c9c;
          border-radius: 4px;
          width: 24px;
          height: 24px;
          display: inline-block;
          text-align: center;
        }
        .ios-tips {
          font-size: 12px;
          font-family: Source Han Sans CN;
          font-weight: 400;
          color: #666666;
          padding-left: 24px;
        }
        .ios-text {
          padding: 10px;
          padding-left: 20px;
        }
        .app-ios-top {
          top: 20%;
        }
        .ios-left {
          background: #1678ff;
        }
        .ios-left-text {
          color: #1678ff;
        }
      }
    }
    .app-android-btn {
      box-sizing: border-box;
      .app-btn-copyimg {
        box-sizing: border-box;
        background: #ffffff;
        border: 1px solid #dcdcdc;
        border-radius: 4px;
        display: inline-block;
        padding: 10px 20px;
        font-size: 14px;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: #5e5d5d;
        margin-right: 30px;
        cursor: pointer;
      }
      .app-btn-keepimg {
        background: #386df0;
        // border: 1px solid #386df0;
        border-radius: 4px;
        display: inline-block;
        padding: 10px 20px;
        font-size: 14px;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: #ffffff;
        cursor: pointer;
      }
    }
  }
  .app-engineering-conter {
    background: #eeeeee;
    height: 100%;
    border: 0px;
    border-radius: 0px;
    position: relative;
    .app-engineering-img {
      background: #e5e5e5;
      border: 1px solid #d5d5d5;
      border-radius: 6px;
      padding: 20px;
    }
    .engineering-top {
      top: 10%;
    }
    .app-engineering-text {
      font-size: 16px;
      font-family: Source Han Sans CN;
      font-weight: 400;
      color: #2b2b2b;
      text-align: center;
      padding: 20px 0 0;
    }
    .engineering-bg {
      background: #ffffff !important;
    }
    .engineering-tips {
      font-size: 14px;
      font-family: Source Han Sans CN;
      font-weight: 400;
      color: #ff9018;
      padding: 20px 0;
    }
  }
}
.colordiv1 {
  color: #333333 !important;
}
.appsoftware {
  width: 600px !important;
}

// .v-toolbar{
//     display: none;
// }
</style>
