/*
 * @Description: 这是***页面（组件）
 * @Date: 2019-11-18 19:49:08
 * @Author: 随风
 * @LastEditors: Tao
 * @LastEditTime: 2021-03-01 13:33:40
 */
import Vue from 'vue';
import VueI18n from 'vue-i18n'  // 国际化 i8n
import messages from './lang/index'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './store/index.js'
import axios from 'axios';
import Blob from './vendor/Blob.js'
import Export2Excel from './vendor/Export2Excel.js'
// import './../public/echarts.js'
// import './../public/Alarm.js'
import * as echarts from 'echarts5';
import VCharts from 'v-charts'
import VueCron from 'vue-cron'
import * as math from 'mathjs'
// import echarts from 'echarts' //引入echarts

import {TimePicker,DatePicker,Table,Select,Tree} from 'element-ui';
import './plugins/axios';
import App from './App.vue';
import router from './router';
import store from './store';
import vueXlsxTable from 'vue-xlsx-table'
import './common/font.css'
import common from './assets/js/common'

import Print from './plugins/print'

import '@/api/index'; // 导入API插件
import $ from 'jquery'

import "@/assets/sass/common.scss";
import "@/assets/sass/reset.scss";
import "@/assets/sass/rewrite.scss"
import moment from 'moment'//导入文件
import VideoPlayer from 'vue-video-player'
import * as filters from './filters' // global filters
// import 'videojs-flash';
// import 'videojs-contrib-hls'
require('video.js/dist/video-js.css')
require('vue-video-player/src/custom-theme.css')
import domtoimage from 'dom-to-image';
// const hls =require("videojs-contrib-hls")

Vue.use(Print) // 注册
Vue.use(common)
// register global utility filters
Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
})
// Vue.use(hls)
Vue.prototype.$moment = moment;//赋值使用
import JsEncrypt from 'jsencrypt'
// 将jsencrypt压入到Vue
Vue.prototype.$jsEncrypt = JsEncrypt
import htmlToPdf from '@/views/scheduleManage/component/htmlToPdf.js'
Vue.use(htmlToPdf)
moment.locale('zh-cn');//需要汉化

Vue.use(TimePicker);
Vue.use(DatePicker);
Vue.use(Table);
Vue.use(Select);
Vue.use(Tree);
Vue.use(VueCron);
Vue.use(VideoPlayer);
Vue.use(vueXlsxTable, {rABS: false})
Vue.use(VueI18n)
// Vue.prototype.$echarts = echarts
/* Vue.use(ElementUI) */
Vue.use(VCharts)

Vue.prototype.$axios = axios
Vue.prototype.$math = math
Vue.config.productionTip = false;

/*---------使用语言包合并element 多语言-----------*/
const i18n = new VueI18n({
    locale: localStorage.getItem('currentLang') ? localStorage.getItem('currentLang') : 'Main_Language_ZH' ,    // 语言标识
    //this.$i18n.locale // 通过切换locale的值来实现语言切换
    messages/* : {
      'Main_Language_ZH': require('./lang/Main_Language_ZH'),   // 中文语言包
      'Main_Language_EN': require('./lang/Main_Language_EN')    // 英文语言包
    } */
 })
 
    
//  游客登录获取多语言信息
    axios({
        method: 'post',
        url: `/api/main/Main_GetStaticMultiLanguage`,
    }) .then(res => {
        if (res.data.code === 0) {
              let currentLang = localStorage.getItem('currentLang')
              let lang = currentLang ? currentLang : 'Main_Language_ZH'
              localStorage.setItem('languages', JSON.stringify(res.data.data))
              localStorage.setItem('currentLang', lang)
              i18n.locale = lang
        }
    }).catch(err => {
        // console.log('err', err);
    });

 Vue.use(ElementUI, {
     i18n: (key, value) => i18n.t(key, value)
 })


Object.assign(Vue.prototype, {
    $getDate: val => {
        if (val) {
            let date = new Date(val);
            let month = date.getMonth() + 1;
            month = month < 10 ? `0${month}` : month;
            let day = date.getDate();
            day = day < 10 ? `0${day}` : day;
            let hour = date.getHours();
            hour = hour < 10 ? `0${hour}` : hour;
            let minute = date.getMinutes();
            minute = minute < 10 ? `0${minute}` : minute;
            let second = date.getSeconds();
            second = second < 10 ? `0${second}` : second;
            let str = `${date.getFullYear()}-${month}-${day} ${hour}:${minute}:${second}`;
            return str;
        }
        return '';
    }
});
Object.assign(Vue.prototype, {
    $echarts:echarts
});
//定义一个请求拦截器
axios.interceptors.request.use(function(config){
//   console.log(echarts)
   if(config.url!==`/api/ParameterReport/SearchItemData`){
    if(config.url!==`/api/ParameterReport/SearchExtensionData`){
        if(config.url!==`/api/HMI/HMI_ExecuteScript`){
            if(config.url !== '/api/Main/Main_GetDeviceMessageRemind'){
                if(config.url.slice(0,33)!=='/api/control/GetChartControlNames'){
                    if(config.url.slice(0,24)!=='/api/Base/PostRediusTest'){
                        if(config.url!=='/api/HMI/HMI_GstAlarms'){
                            if(config.url!=='/api/HMI/HMI_ExecuteScript'){
                                if(config.url.slice(0,52)!=='/api/UserManage/UserManage_CanExcuteAuthorityControl'){
                                    if(config.url.slice(0,46)!== `/api/ProcessParameterConfigure/GstVariableList`){
                                    if(config.url != '/api/Base/PostIOServiceTest'){
                                        if(config.url.slice(0,26)!='/api/control/GetDataColumn'){
                                            if(config.url.slice(0,46)!='/api/ProcessParameterConfigure/GstVariableList'){
  // console.log('ee88',config.url)          
                                           if(config.url.slice(0,43)!=`/api/ProcessParameterConfigure/GstCondition`){
                                             store.state.isShow=true; //在请求发出之前进行一些操作
                                            }
                                            }
                                          
                                        }
                                        }
                                    }
                                }
                            }
                           
                        }
                     
                    }
                }
           
            }
        }
    }
   }
    config.headers.common['argLanguage'] = localStorage.getItem('currentLang') ? localStorage.getItem('currentLang') : 'Main_Language_ZH'
//    if (config.method === 'post') {
//         config.params = {
//             argLanguage: localStorage.getItem('currentLang')
//         }
//     }
    
    return config
  })
//   console.log(router)
//   const VueRouterPush = router.prototype.push
//   router.prototype.push = function push(to){
//       return VueRouterPush.call(this,to).catch(err => err)
//   }
  //定义一个响应拦截器
  axios.interceptors.response.use(function(config){
    if(config.config.url!==`/api/ParameterReport/SearchItemData`){
        if(config.config.url!==`/api/ParameterReport/SearchExtensionData`){
            if(config.config.url!==`/api/HMI/HMI_ExecuteScript`){
    if(config.config.url !== '/api/Main/Main_GetDeviceMessageRemind'){
        if(config.config.url.slice(0,24)!=='/api/Base/PostRediusTest'){
            if(config.config.url!=='/api/HMI/HMI_GstAlarms'){
                if(config.config.url!=='/api/HMI/HMI_ExecuteScript'){
                    if(config.config.url.slice(0,52)!=='/api/UserManage/UserManage_CanExcuteAuthorityControl'){
                        if(config.config.url!=='/api/ParameterReport/SearchItemData'){
                            // if(config.config.url!=='/api/control/GetDataColumn'){
                                if(config.config.url.slice(0,33)!=='/api/control/GetChartControlNames'){
                                // console.log("这里3",config)
                                store.state.isShow=false;//在这里对返回的数据进行处理
                                // console.log*（
                            }
                                // }
                        }
                    }
                }
            }
                       
                    }
                }
              
            }
         
        }
           
    }
    return config
   
  })
new Vue({
    router,
    store,
    i18n, // 挂载 i8n， 页面可通过 $t访问
    render: h => h(App)
}).$mount('#app')
