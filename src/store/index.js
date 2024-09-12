/*
 * @Description: 这是***页面（组件）
 * @Date: 2020-05-07 11:28:19
 * @Author: Tao
 * @LastEditors: Tao
 * @LastEditTime: 2021-01-21 14:37:10
 */ 
import { composition } from "mathjs";
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    a: {

    },
    Showtext:0,
    oksh:false,
    tendencyoption:'',
    okgo:1,
    showTime:true,
    report:false,
    one:1,
    b: '显示选中',
    c: 1,
    routename:'',
    changeroute:false,
    LOADING: false,
    isShow:false,
    color:'',
    treeleft:false,
    treeid:'',
    treedata:'',
    tableData:[],
    endy:'',
    change:1,
    pdid:false,
    pageleft:0,
    WindowWB:'',     //二次开发自适应比例   
    isInit:'',     //报表是否是自适应
    contentData:null,  //图表动态数值  （皆用于弹窗）
    contentName:null,  //图表动态数值
    typeNum:'',        //图表类型
    setTiemValue:null, //图表定时触发
    monitorShow:'false',  //流动控件监听
    varChange:null,   //变量监听
    monitorName:null, //流动控件监听
    btnPowerData:[], //按钮权限
    websocketsShow:null,//监听websockets连接
    ReceivedAlarms:null,//报警控件消息
    scriptData:'',//脚本事件
    userId:null,//用户登录
    screentype:1,//自适应类型
    div:'',
    dittop:'',
    zoom:1
    
  },
  mutations: {
    move(name) {
      let left = ($(`.${name.div}`).width())/2+'px'
      let top = ($(`.${name.div}`).height())/2+'px'
        $(`.${name.div}`)[0].style.left = `calc(50% - ${left})`;
      $(`.${name.div}`)[0].style.top = `calc(50% - ${top})`;
      console.log(name)
      console.log((`.${name.div}`)[0])
      
      $(`.${name.div}`)[0].addEventListener('mousedown', function(e) {
        setTimeout(()=>{
           console.log("name",name)
for(let i=0;i<$('.el-picker-panel').length;i++){
 console.log($('.el-picker-panel')[i])
           $('.el-picker-panel')[i].style.zoom = name.zoom
       }
       })
        console.log(e)
          console.log(e.target.className.toLocaleLowerCase());
          if (e.target.className.toLocaleLowerCase() == name.divtop) {
              window.event.stopPropagation();
              var x = 0;
              var y = 0;
              var l = 0;
              var t = 0;
              var isDown = false;
              x = window.event.clientX;
              y = window.event.clientY;
              //获取左部和顶部的偏移量
              l = $(`.${name.div}`)[0].offsetLeft;
              t = $(`.${name.div}`)[0].offsetTop;
              //开关打开
              isDown = true;
              var pdmove = false;

              //设置样式
              $('body')[0].style.cursor = 'move';

              $('body')[0].addEventListener('mousemove', function(e) {
                  pdmove = true;
                  if (isDown == false) {
                      return;
                  }
                  //获取x和y
                  var nx = window.event.clientX;
                  var ny = window.event.clientY;

                  //计算移动后的左偏移量和顶部的偏移量
                  var nl = nx - (x - l);
                  var nt = ny - (y - t);
                  $(`.${name.div}`)[0].style.left = nl + 'px';
                  $(`.${name.div}`)[0].style.top = nt + 'px';
              });
              $('body')[0].addEventListener('mouseup', function(e) {
                  //开关关闭
                  isDown = false;
                  $('body')[0].style.cursor = 'default';
              });
          }
      });
   },
       //  计算自定义区间
       getarea(num,type,zf){
        let altype = JSON.parse(JSON.stringify(type))
        if(zf == -1){
          if(altype == 'min'){
            altype = 'max'
          }else{
            altype = 'min'
          }
        }
        num = Math.abs(num)
        if(num == 0){
            return 0
        }
        let splitnum = 1;
        let daitnum = String(num);
        if(dainum.split('.')>1){
            for(let i=0;i<=String(dainump[0]).length;i++){
                splitnum = splitnum*10
            }
        }
        num = num/splitnum
        let endnum = '';
        let breaknum = '';
        for(let i=0;i<numlength;i++){
            endnum+=numlength[i]
            if(numlength[i]!=='.'){
                if(Number(numlength[i])>0){
                    breaknum = Number(numlength[i])
                    endnum  = Number(endnum)
                    break;
                }
            }
        }
        if(altype == 'min'){
          let end = (this.$math.format(endnum/breaknum,{precision:14}))*5
          if((end*5)>(num))end=(end*5)
          return end*zf*splitnum
        }else{
          let end = (this.$math.format(endnum*10/breaknum,{precision:14}))*5
          if((end/5)>(num))end=(end/5)
          return end*zf*splitnum
        }
       
      },
    changecolor(state,n){
      state.color = n;
      console.log(state.color)
    },
    mutationsAddCount(state, n) {
      return (state.a = n)

    },
    mutationsAddCount1(state, n) {
      return (state.b = n)
    },
    mutationsAddCount2(state, n) {
      return (state.c = n)
    },
    showLoading(state) {
      state.LOADING = true
    },
    hideLoading(state) {
      state.LOADING = false
    }
  },
  actions: {},
  modules: {}
});
