<!--
 * @Description: 矩阵设定页面（组件）
 * @Date: 2021-08-12 15:23:41
 * @Author: Li
 * @LastEditors: Li
 * @LastEditTime: 2021-02-28 15:12:44
 -->
<template>
  <div>
    <Keycom :showkey='showkey' :keyclass='keyclass' :keytext='keytext' @getnum='getnum' @closeshow='closeshow'></Keycom>
    <div v-for="(item, index) in dataValue" :key="index">
      <div v-if="show"
        @dblclick="opendb(item)"
        @mousedown="downClick(item, $event)"
        @mouseup="seupClick(item, $event)"
        @contextmenu.prevent
        :class="`matrixgridSet ${item.class}`"
        name="matrixgridset"
        :style="`width: ${item.width}px; height: ${item.height}px; position: absolute; left: ${item.left}px; top: ${item.top}px;
        transform: rotate(${item.rotate}deg); opacity: ${item.opacity}; background: ${item.BorderBrush}; padding: ${item.BorderThickness}px; 
        fontFamily: ${item.family};boxSizing: border-box; overflow: hidden; white-space: nowrap;box-shadow: ${item.Shadow}; zIndex: ${item.ZIndex}`"
      >
        <div class="matrixgrid-table">
          <template v-for="(data, idx) in item.gridList">
            <div v-if="data.type && data.type === 'spaceRow'" :key="idx"
              class="matrixgrid-space" :style="`height: ${item.spaceHeight}px`"
            ></div>
            <div v-else class="matrixgrid-row" :key="idx">
              <template v-for="(cell, cellIndex) in data">
                <!-- 空隙 -->
                <div class="matrixgrid-space" :key="cellIndex"
                    v-if="cell.type && cell.type === 'spaceColumn'"
                    :style="`width:${item.spaceWidth}px`"></div>
                <!-- 设定 -->
                <div class="matrixgrid-cell" :key="cellIndex" v-else 
                  :style="`background: ${item.Background};text-decoration: ${item.TextDecorations};color: ${item.Foreground};
                    font-weight: ${item.Blod}; font-size: ${item.FontSize}px
                  `">
                  <div class="matrixgrid-set" :data-name="cell.TagName" v-if="Marry.length!==0">
                    <input type="text" v-model="cell.Value"
                      :style="`background-image: ${item.fontColor};-webkit-background-clip: ${item.backgroundClip}; 
                              -webkit-text-fill-color: ${item.textFillColor};text-decoration: ${item.TextDecorations};`"
                        @focus="focusFun(item)"
                        @input="inputFun(item)"
                        @blur="blurFun(cell,item, $event)"
                        @keyup.enter="keupFun(cell, item, $event)"
                    />
                      <button class="add" @click="add(cell, item, $event)"></button>
                      <button class="subtract" @click="subtract(cell, item, $event)"></button>
                  </div>
                </div>
              </template>
            </div>
          </template>
        </div>
      </div>
    </div>

    <!-- 读写框数值是否符合提示弹窗 -->
    <!-- <div v-show="TextBoxShow" style="width: 100%; height: 100%; position: fixed; z-index: 997">
      <div v-if="TextBoxShow" class="TextBoxPop_outPop">
        <div class="TextBoxPop_outHead">
          <i class="warning el-icon-warning"></i>
          <span class="text">{{lang.HT_MessageBoxCaption_Tips}}</span>
        </div>
        <div class="TextBoxPop_conter">{{ TipsText }}</div>
        <div class="TextBoxPop_btn">
          <div @click="Pop_ConfigFun" class="TextBoxPop_confirm"> {{lang.MessageBox_Confrim}} </div>
        </div>
      </div>
    </div> -->

    <!-- 权限弹窗 -->
    <!-- <div v-show="commerPopShow1" style="width: 100%;height: 100%;position: fixed;z-index: 2147483647;">
      <div v-if="commerPopShow1" class="commerPop_outPop">
        <div class="commerPop_outHead">
          <i class="warning el-icon-warning"></i>
          <span class="text">{{lang.HT_MessageBoxCaption_Tips}}</span>
        </div>
        <div class="commerPop_conter">{{lang.NoOperationAuthority}}</div>
        <div class="commerPop_btn">
          <div class="commerPop_yes" @click="Jurisdiction()" style="width: 310px; margin-left: 25px">
            {{lang.lang.MessageBox_Confrim}}
          </div>
        </div>
      </div>
    </div> -->

  </div>
</template>
<script>
import Keycom from './Keycom.vue';
export default {
  components: {
    Keycom,  //数字键盘
  },
  data() {
    return {
      Marry:[],
      showkey: false,
      keyclass: '',
      keytext: '',
      show: true,
      textblockData: [],
      dataValue: [],
      textBbockArr: [],
      cla: [],
      TextBoxShow: false,
      TipsText: '',
      ValueArr: [],
      commerPopShow1: false,
      ZIndex: '',
      isOriginal: true,
      resData: [], //初始化请求变量值
      varArr: [], //变量名
      lang: JSON.parse(localStorage.getItem('languages'))[
        localStorage.getItem('currentLang')
      ],
    };
  },
  props: ['dae', 'dataId'],
  watch: {
    dae: {
      deep: true,
      handler(n, o) {
        this.msgHub2 = window.$.connection.redisMonitor;
        if (this.msgHub2) {
          this.msgHub2.server.removeVariables(this.varArr);
        }
        this.data = n;
        if (this.data) {
          setTimeout(() => {
            this.ValueArr = [];
            this.init();
          }, 200);
        }
      },
    },
  },
  mounted() {
    this.data = this.dae;
    this.Name = 'matrixgridset';
    if (this.data) {
      this.init();
    }
  },
  methods: {
    getnum(value, keyclass) {
      let classarrr = '';
      this.dataValue.forEach((item) => {
        if (item.class == keyclass) {
          item.text = value;
          classarrr = item;
        }
      });
      if (classarrr) {
        let e = {
          path: [],
        };
        e.path.push($('.' + classarrr.class));
        this.keupFun(classarrr, e);
      }
    },
    //确定
    Pop_ConfigFun() {
      // document.querySelector('.TextBoxPop_outPop').style.display = 'none';
      // document.querySelector('.TextBoxPop_conter').style.textAlign = 'none';
      // this.TextBoxShow = false;
      this.$emit('shownotip')
    },
    // 关闭键盘
    closeshow() {
      this.showkey = false;
    },
    //确认
    Jurisdiction() {
      // this.commerPopShow1 = false;
      this.$emit('shownotip')
    },
    //权限配置请求接口
    jurisdictionShow(item) {
      return new Promise((resolve, reject) => {
        var userinfoID;
        if (JSON.parse(sessionStorage.getItem('userInfo1')) == null) {
          userinfoID = JSON.parse(
            sessionStorage.getItem('sightseerInfo1')
          ).SCMSUserID;
        } else {
          userinfoID = JSON.parse(
            sessionStorage.getItem('userInfo1')
          ).SCMSUserID;
        }
        var argChildMenuID = this.dataId;
        var elementName = item.class;
        this.$axios({
          method: 'post',
          url: `/api/UserManage/UserManage_CanExcuteAuthorityControl?argUserID=${userinfoID}&argChildMenuID=${argChildMenuID}&argElementName=${elementName}`,
          argUserID: userinfoID,
          argChildMenuID: argChildMenuID,
          argElementName: elementName,
        }).then((res) => {
          if (res.data.data.CanExcute == 0) {
            this.CanExcuteShow = true;
            resolve('成功了');
          } else {
            this.CanExcuteShow = false;
            resolve('成功了');
          }
        });
      });
    },
    //读写框变化禁止改变值
    inputFun(item) {
      item.isShow = false;
    },
    //读写框聚焦禁止改变值
    focusFun(item) {
      item.isShow = false;
    },
    //读写框离焦允许改变值
    blurFun(cell, item) {
      if (this.isOriginal) {
        item.isShow = true;
        console.log(cell)
        console.log(item)
        //恢复原来值
        // setTimeout(() => {
            this.originalFun({...item,...cell});
        // }, 2000);
      
      }
    },
    //恢复原来值
    originalFun(item) {
       
      for(let i=0; i<this.cla.length; i++){
        if(item.class === this.cla[i]){
          let currentNode = this.dataValue[i].gridList[item.Row][item.Column]
          let idx = this.varArr.indexOf(item.TagName)
          let val = this.ValueArr[idx]
          console.log(this.ValueArr)
          console.log("val",this.varArr)
          console.log("val",val)
          currentNode.Value = val
        }
      }
    },
    //加
    add(cell, item, e){
      if(e.target.getAttribute('disabled') === 'disabled'){
        return
      }

      this.isOriginal = false; //下发禁止离焦触发
      let adjust = /E/.test(item.AdjustmentValue)
      let pointNum = /\./.test(cell.Value)
      let adjustValue = item.AdjustmentValue
      let val = null;

      if(isNaN(Number(cell.Value))){
        val = "0"
      }else{
        val = this.toFixed(Number(cell.Value)).toString()
      }

      if(adjust){
        adjustValue = this.toFixed(Number(adjustValue)).toString()
      }else if(pointNum){
        //取最大小数位
        let index = cell.Value.indexOf(".")
        let pointNumLen = cell.Value.toString().substr(index + 1).length
        if(!/E/.test(adjustValue) && /\./.test(adjustValue)){
          let adjusIndex = adjustValue.indexOf(".")
          let adjustPointLen = adjustValue.toString().substr(adjusIndex + 1).length
          pointNumLen = pointNumLen > adjustPointLen ? pointNumLen : adjustPointLen
        }
        this.keupFun(cell, item, e, (parseFloat(cell.Value) + Number(adjustValue)).toFixed(pointNumLen).toString())
        return
      }
      this.keupFun(cell, item, e, (BigInt(val) + BigInt(adjustValue)).toString())  
    },
    //减
    subtract(cell, item, e){
      if(e.target.getAttribute('disabled') === 'disabled'){
        return
      }

      this.isOriginal = false; //下发禁止离焦触发
      let adjust = /E/.test(item.AdjustmentValue)
      let pointNum = /\./.test(cell.Value)
      let adjustValue = item.AdjustmentValue
      let val = null;

      if(isNaN(Number(cell.Value))){
        val = "0"
      }else{
        val = this.toFixed(Number(cell.Value)).toString()
      }

      if(adjust){
        adjustValue = this.toFixed(Number(adjustValue)).toString()
      }else if(pointNum){
        //取最大小数位
        let index = cell.Value.indexOf(".")
        let pointNumLen = cell.Value.toString().substr(index + 1).length
        if(!/E/.test(adjustValue) && /\./.test(adjustValue)){
          let adjusIndex = adjustValue.indexOf(".")
          let adjustPointLen = adjustValue.toString().substr(adjusIndex + 1).length
          pointNumLen = pointNumLen > adjustPointLen ? pointNumLen : adjustPointLen
        }
        this.keupFun(cell, item, e, (parseFloat(cell.Value) - Number(adjustValue)).toFixed(pointNumLen).toString())
        return
      }
      this.keupFun(cell, item, e, (BigInt(val) - BigInt(adjustValue)).toString())
    },
    //鼠标松开
    seupClick(item, e) {
      clearTimeout(this.timeoutID);
      var self = this;
      var EventScriptList = this.data.Data.EventScriptList;
      var EventType = [];
      var EventType1 = [];
      var Typearr = [];
      for (var i = 0; i < EventScriptList.length; i++) {
        if (item.class == EventScriptList[i].ElementName && EventScriptList[i].EventType == 'MouseLeftButtonUp') {
          EventType.push(EventScriptList[i]);
        } else if (item.class == EventScriptList[i].ElementName && EventScriptList[i].EventType == 'MouseRightButtonUp') {
          EventType1.push(EventScriptList[i]);
        }
      }
      this.timeoutID = window.setTimeout(function () {
        if (e.which == 1) {
          //鼠标左键松开
          if (EventType.length) {
            self.jurisdictionShow(item).then((val) => {
              if (self.CanExcuteShow) {
                // self.commerPopShow1 = true;
                self.$emit('showtip',self.lang.NoOperationAuthority)
                return;
              } else {
                for (var j = 0; j < EventType.length; j++) {
                  Typearr.push(EventType[j].Script);
                }
                self.$parent.scriptData(Typearr, '', '', '', '', '');
              }
            });
          }
        } else if (e.which == 3) {
          //鼠标右键松开
          if (EventType1.length) {
            self.jurisdictionShow(item).then((val) => {
              if (self.CanExcuteShow) {
                // self.commerPopShow1 = true;
                self.$emit('showtip',self.lang.NoOperationAuthority)
                return;
              } else {
                for (var j1 = 0; j1 < EventType1.length; j1++) {
                  Typearr.push(EventType1[j1].Script);
                }
                self.$parent.scriptData(Typearr, '', '', '', '', '');
              }
            });
          }
        }
      }, 200);
    },
    //鼠标按下
    downClick(item, e) {
      this.keyclass = item.class;
      this.data.Data.KeyboardControlList.forEach((item1) => {
        if (item1.ElementName == item.class) {
          if (item1.IsPopupKeyboard) {
            this.showkey = true;
            this.keytext = item.text;
          }
        }
      });

      var self = this;
      var EventScriptList = this.data.Data.EventScriptList;
      var EventType = [];
      var EventType1 = [];
      var Typearr = [];
      for (var i = 0; i < EventScriptList.length; i++) {
        if (item.class == EventScriptList[i].ElementName && EventScriptList[i].EventType == 'MouseLeftButtonDown') {
          EventType.push(EventScriptList[i]);
        } else if (item.class == EventScriptList[i].ElementName && EventScriptList[i].EventType == 'MouseRightButtonDown') {
          EventType1.push(EventScriptList[i]);
        }
      }
      if (e.which == 1) {
        //鼠标左键按下
        if (EventType.length) {
          self.jurisdictionShow(item).then((val) => {
            if (self.CanExcuteShow) {
              // self.commerPopShow1 = true;
              self.$emit('showtip',self.lang.NoOperationAuthority)
              return;
            } else {
              for (var j = 0; j < EventType.length; j++) {
                Typearr.push(EventType[j].Script);
              }
              self.$parent.scriptData(Typearr, '', '', '', '', '');
            }
          });
        }
      } else if (e.which == 3) {
        //鼠标右键按下
        if (EventType1.length) {
          self.jurisdictionShow(item).then((val) => {
            if (self.CanExcuteShow) {
              // self.commerPopShow1 = true;
              self.$emit('showtip',self.lang.NoOperationAuthority)
              return;
            } else {
              for (var j1 = 0; j1 < EventType1.length; j1++) {
                Typearr.push(EventType1[j1].Script);
              }
              self.$parent.scriptData(Typearr, '', '', '', '', '');
            }
          });
        }
      }
    },
    //鼠标双击
    opendb(item) {
      setTimeout(() => {
        var EventScriptList = this.data.Data.EventScriptList;
        var EventType = [];
        var Typearr = [];
        for (var i = 0; i < EventScriptList.length; i++) {
          if (item.class == EventScriptList[i].ElementName && EventScriptList[i].EventType == 'MouseDoubleClick') {
            EventType.push(EventScriptList[i]);
          }
        }
        if (EventType.length) {
          this.jurisdictionShow(item).then((val) => {
            if (this.CanExcuteShow) {
              // this.commerPopShow1 = true;
              this.$emit('showtip',this.lang.NoOperationAuthority)
              return;
            } else {
              for (var j = 0; j < EventType.length; j++) {
                Typearr.push(EventType[j].Script);
              }
              this.$parent.scriptData(Typearr, '', '', '', '', '');
            }
          });
        }
      }, 200);
    },
    //回车事件  下发
    keupFun(item, parent, e, statist=null) {
      let issVal = e.target.value
      if(statist !== null){
        issVal =statist
      }
      var value;
      var arr = [];
      if (item.TagName != '') {
        this.jurisdictionShow(item).then((val) => {
          if (this.CanExcuteShow) {
            // this.commerPopShow1 = true;
            this.$emit('showtip',this.lang.NoOperationAuthority)
            return;
          } else {
            var ss = JSON.parse(sessionStorage.getItem('variable'));
            var variableName;
            for (let o = 0; o < ss.length; o++) {
              if (item.TagName == ss[o].TagName) {
                variableName = ss[o].TagType;
              }
            }
            if (variableName == this.lang['二进制变量']) {
              var text1 = issVal.toLowerCase();
              if (text1 == 'false' || text1 == 'true' || text1 == '0' || text1 == '1') {
                value = {
                  Name: item.TagName,
                  Value: text1,
                };
                arr.push(value);
                this.isOriginal = false; //下发禁止离焦触发
                //请求接口 //下发数据
                                  this.$axios({
                                  method:'post',
                                  url:`/api/base/CheckTags`,
                                  data:arr
                             }).then((res1)=>{
                                  if(res1.data.code === 0){
                          this.$emit('shownotip')
                           
                this.$axios({
                  method: 'post',
                  url: '/api/Base/PostIOServiceTest',
                  data: arr,
                }).then((res) => {
                  if (res.data.data == true) {
                    item.isShow = true;
                    this.isOriginal = false;
                    // setTimeout(() => {
                    //   e.path[0].blur();
                    // }, 300);
                  } else {
                      this.isOriginal = true;
                      this.$emit('showtip',this.lang.FormulaManage_HT_PleaseTryAgainIfYouFail)
                    //恢复原来值
                    setTimeout(() => {e.path[0].blur();}, 300);
                  }
                }).catch((error) => {
                    this.$emit('showtip',this.lang.FormulaManage_HT_PleaseTryAgainIfYouFail)
                      this.isOriginal = true;
                  //恢复原来值
                  setTimeout(() => {
                    e.path[0].blur();
                  }, 300);
                });
                                  }else{
  this.$emit('showtip',res1.data.msg)
    this.isOriginal = true;
                  //恢复原来值
                  setTimeout(() => {
                    e.path[0].blur();
                  }, 300);
                                  }
                               
                              })
            

              } else {
                this.$emit('showtip',this.lang.SCMSExplorerData_ProtocolDataType_PECorrect+this.lang['二进制变量']+this.lang.SCMSExplorerData_ProtocolDataType_Bool)
              }
            // }else if(variableName == this.lang['有符号8位整型']){
            //   this.judgeFun(issVal,127,-128,item.MaxValue,item.MinValue,variableName,{...parent, ...item},'整',e)
            //   return
            // }else if(variableName == this.lang['无符号8位整型']){
            //   this.judgeFun(issVal,255,0,item.MaxValue,item.MinValue,variableName,{...parent,...item},'整',e)
            //   return
            // }else if(variableName == this.lang['有符号16位整型']){
            //     this.judgeFun(issVal,32767,-32768,item.MaxValue,item.MinValue,variableName,{...parent, ...item},'整',e)
            //     return
            // }else if(variableName == this.lang['无符号16位整型']){
            //     this.judgeFun(issVal,65535,0,item.MaxValue,item.MinValue,variableName,{...parent, ...item},'整',e)
            //     return
            // }else if(variableName == this.lang['有符号32位整型']){
            //     this.judgeFun(issVal,2147483647,-2147483648,item.MaxValue,item.MinValue,variableName,{...parent, ...item},'整',e)
            //     return
            // }else if(variableName == this.lang['无符号32位整型'] || variableName == this.lang['定时器']){
            //     this.judgeFun(issVal,4294967295,0,item.MaxValue,item.MinValue,variableName,{...parent, ...item},'整',e)
            //     return
            // }else if(variableName == this.lang['有符号64位整型']){
            //   this.judgeFun(issVal,"9223372036854775807","-9223372036854775808",item.MaxValue,item.MinValue,variableName,{...parent, ...item},'整',e)
            //   return
            // }else if(variableName == this.lang['无符号64位整型']){
            //   this.judgeFun(issVal,"18446744073709551615",0,item.MaxValue,item.MinValue,variableName,{...parent, ...item},'整',e)
            //     return
            // }else if(variableName == this.lang['F32位浮点数IEEE754']){
            //   this.judgeFun(issVal,3.40282347E+38,-3.40282347E+38,item.MaxValue,item.MinValue,variableName,{...parent, ...item},'浮',e)
            //   return
            // }else if(variableName == this.lang['F64位浮点数IEEE754']){
            //   this.judgeFun(issVal,1.7976931348623157E+308,-1.7976931348623157E+308,item.MaxValue,item.MinValue,variableName,{...parent, ...item},'浮',e)
            //   return
            }else{
              
              let TagName = JSON.parse(JSON.stringify(item.TagName))
              let data11 = {...parent, ...item}
              data11.TagName = TagName
              //  console.log(5454)
              // console.log(data11)
              this.filtrateVariable(data11, issVal, e)
              return;
            }
          }
        });
      }
    },
    //科学计数转为10进制数
    toFixed(x) {
      if (Math.abs(x) < 1.0) {
        var e = parseInt(x.toString().split('e-')[1]);
        if (e) {
            x *= Math.pow(10,e-1);
            x = '0.' + (new Array(e)).join('0') + x.toString().substring(2);
        }
      } else {
        var e = parseInt(x.toString().split('+')[1]);
        if (e > 20) {
            e -= 20;
            x /= Math.pow(10,e);
            x += (new Array(e+1)).join('0');
        }
      }
      return x;
    },
    //校验64位数值类型
    CheckTagFun(type, text, max, min) {
      return new Promise((resolve, reject) => {
        max = max == null ? '' : this.toFixed(max).toString();
        min = min == null ? '' : this.toFixed(min).toString();
        let val = this.toFixed(Number(text)).toString()
         let type12 = ''
           let type11 = JSON.parse(JSON.stringify(type))
             let lang = JSON.parse(localStorage.getItem('languages'))[localStorage.getItem('currentLang')]
             console.log(lang)
             for(let i in lang){
          if(lang[i]==type11){
            type12 = i
        }
              }
       this.$axios({
          method: 'post',
          url: `/api/Base/CheckTag?argType=${type12}&argValue=${val}&argMax=${max}&argMin=${min}`,
          argType: type12,
          argValue: val,
          argMax: max,
          argMin: min,
        }).then((res) => {
          if (res.data.code == 0) {
            resolve(true);
          } else {
            this.$emit('showtip',res.data.msg)
            // this.TextBoxShow = true;
            // setTimeout(() => {
            //   document.querySelector('.TextBoxPop_outPop').style.display = 'block';
            //   document.querySelector('.TextBoxPop_conter').style.textAlign = 'center';
            //   document.querySelector('.TextBoxPop_conter').innerHTML = `${res.data.msg}`;
            // });
            resolve(false);
          }
        });
      });
    },
    //下发接口
    tagAxios(arr, item, e) {
      //请求接口 //下发数据
                             this.$axios({
                                  method:'post',
                                  url:`/api/base/CheckTags`,
                                  data:arr
                             }).then((res1)=>{
                                  if(res1.data.code === 0){
                                this.$emit('shownotip')
                            
      this.$axios({
        method: 'post',
        url: '/api/Base/PostIOServiceTest',
        data: arr,
      }).then((res) => {
        this.isOriginal = true; //下发允许离焦触发
        if (res.data.data == true) {
          item.isShow = true;
            this.isOriginal = false;
          // setTimeout(() => {
          //   e.path[0].blur();
          // }, 300);
        } else {
          this.$emit('showtip',this.lang.FormulaManage_HT_PleaseTryAgainIfYouFail)
            this.isOriginal = true;
          //恢复原来值
          setTimeout(() => {
            e.path[0].blur();
          }, 300);
        }
      }).catch((error) => {
        this.$emit('showtip',this.lang.FormulaManage_HT_PleaseTryAgainIfYouFail)
          this.isOriginal = true;
        //恢复原来值
        setTimeout(() => {
          e.path[0].blur();
        }, 300);
      });
                                  }else{
                                      this.isOriginal = true;
                                      
                        this.$emit('showtip',res1.data.msg)
                          setTimeout(() => {
          e.path[0].blur();
        }, 300);
                                  }
                               
                              })

    },
    //筛选共同下发的变量
    filtrateVariable(item, text2, e){
      var arr = [];
      arr.push({
        Name: item.TagName,
        Value: text2,
      })
      let matriGridList = []
      let matriGridListName = []
      this.data.Data.MatrixGridAnimationList.forEach((grid, gridIndex)=>{
        let list = []
        if(item.matrixGridElementName === grid.ElementName){
          let len = grid.MatrixGridList.length, //每组长度（不包含边距）
              row = (grid.Row + 1) / 2, //行
              column = (grid.Column + 1) / (len + 1), //列
              groupLen = column * row //每行的数据长度 12

          for(let r=0; r < row; r++){
            let rowList = []
            for(let c=0; c < column; c++){
              let cellList = []
              for(let le=0; le < len; le++){
                cellList.push({
                  ...grid.MatrixGridDatas[groupLen * le + c + r * column], 
                  IsSetMatrix: grid.MatrixGridList[le].IsSetMatrix,
                  Value: 0
                })
              }
              if(c < (column - 1)){
                cellList.push({
                  type: "spaceColumn",
                  IsSetMatrix: false
                })
              }
              rowList.push(cellList)
            }
            list.push(rowList)
            if(r < (row - 1)){
              list.push({
                type: "spaceRow",
                IsSetMatrix: false
              })
            }
          }
        }
        matriGridList.push(list)
        matriGridListName.push(grid.ElementName)
      })
      
      let currentMatri = matriGridList[matriGridListName.indexOf(item.matrixGridElementName)]
      if(item.type === 0){//行设定
        currentMatri[item.Row].forEach(val => {
          if(Array.isArray(val)){
            arr.push({
              Name: val[item.Column+1].TagName,
              Value: text2
            })
          }
        })
      }else if(item.type === 1){ //列设定
        for(let i=0;i < currentMatri.length; i++){
          if(Array.isArray(currentMatri[i])){
            let len = 0
            currentMatri[i].forEach(itemRow=>{
              len += itemRow.length - 1
              if(len > item.Column){
                let groudIdx = item.Column - len + itemRow.length
                if(groudIdx > 0){
                  arr.push({
                    Name: itemRow[groudIdx].TagName,
                    Value: text2
                  })
                }
              }
            })
          }
        }
      }else if(item.type === 2){ //整体设定
        currentMatri.forEach(val => {
          if(Array.isArray(val)){
            val.forEach(valItem=>{
              arr.push({
                Name: valItem[item.Column + 1].TagName,
                Value: text2
              })
            })
          }
        })
      }
      this.isOriginal = false; //下发禁止离焦触发
      this.tagAxios(arr, item, e);
    },
    //数值类型判断
    judgeFun(num, max, min, MaxValue, MinValue, TagType, item, type, e) {
      var text2 = Number(num);
      if (num.length == 0) {
         this.$emit('showtip',this.lang.SCMSExplorerData_ProtocolDataType_PECorrect+TagType+this.lang.SCMSExplorerData_ProtocolDataType_Integer+min+'-'+max)
        // this.TextBoxShow = true;
        // setTimeout(() => {
        //   document.querySelector('.TextBoxPop_outPop').style.display = 'block';
        //   document.querySelector('.TextBoxPop_conter').innerHTML = `${this.lang.SCMSExplorerData_ProtocolDataType_PECorrect}${TagType}${this.lang.SCMSExplorerData_ProtocolDataType_Integer}${min} - ${max}`;
        // });
        return;
      }

      //特殊类型设定
      if (TagType == this.lang['F32位浮点数IEEE754'] ||  TagType == this.lang['F64位浮点数IEEE754'] || TagType == this.lang['无符号64位整型'] || TagType == this.lang['有符号64位整型']) {
        this.CheckTagFun(TagType, num, max, min).then((val) => {
          if (val) {
            this.filtrateVariable(item, num, e)
          }
        });
      } else {
        if (isNaN(text2)) {
          this.$emit('showtip',this.lang.SCMSExplorerData_ProtocolDataType_PECorrect+TagType+this.lang.SCMSExplorerData_ProtocolDataType_Integer+min+'-'+max)
          // this.TextBoxShow = true;
          // setTimeout(() => {
          //   document.querySelector('.TextBoxPop_outPop').style.display = 'block';
          //   document.querySelector('.TextBoxPop_conter').innerHTML = `${this.lang.SCMSExplorerData_ProtocolDataType_PECorrect}${TagType}${this.lang.SCMSExplorerData_ProtocolDataType_Integer}${min} - ${max}`;
          // });
          return;
        }

        if (text2 == '' && text2 != 0) {
          this.$emit('showtip',this.lang.SCMSExplorerData_ProtocolDataType_PECorrect+TagType+this.lang.SCMSExplorerData_ProtocolDataType_Integer+min+'-'+max)
          // this.TextBoxShow = true;
          // setTimeout(() => {
          //   document.querySelector('.TextBoxPop_outPop').style.display = 'block';
          //   document.querySelector('.TextBoxPop_conter').innerHTML = `${this.lang.SCMSExplorerData_ProtocolDataType_PECorrect}${TagType}${this.lang.SCMSExplorerData_ProtocolDataType_Integer}${min} - ${max}`;
          // });
          return;
        }

        if (text2 >= min && text2 <= max) {
          if (type == '整') {
            let indexNum = num.indexOf('.');
            if (indexNum != -1) {
              this.$emit('showtip',this.lang.SCMSExplorerData_ProtocolDataType_PECorrect+TagType+this.lang.SCMSExplorerData_ProtocolDataType_Integer+min+'-'+max)
              // this.TextBoxShow = true;
              // setTimeout(() => {
              //   document.querySelector('.TextBoxPop_outPop').style.display = 'block';
              //   document.querySelector('.TextBoxPop_conter').innerHTML = `${this.lang.SCMSExplorerData_ProtocolDataType_PECorrect}${TagType}${this.lang.SCMSExplorerData_ProtocolDataType_Integer}${min} - ${max}`;
              // });
              return;
            }
          }
          if (MaxValue != null) {
            if (text2 > MaxValue) {
              // this.TextBoxShow = true;
              setTimeout(() => {
                document.querySelector('.TextBoxPop_outPop').style.display = 'block';
                let msg = this.lang.HMI_HT_HMIUserControlViewModel_InputGreaterThanMaximumValue;
                let firstL = msg.indexOf('<');
                let firstR = msg.indexOf('>') + 1;
                let lastL = msg.lastIndexOf('<');
                let lastR = msg.lastIndexOf('>') + 1;
                let str1 = msg.slice(firstL, firstR);
                let str2 = msg.slice(lastL, lastR);
                msg = msg.replace(str1, `<${text2}>`);
                msg = msg.replace(str2, `<${MaxValue}>`);
                this.$emit('showtip',msg)
                // document.querySelector('.TextBoxPop_conter').innerHTML = `${msg}`;
              });
              return;
            }
            if (text2 < MinValue) {
              // this.TextBoxShow = true;
              setTimeout(() => {
                document.querySelector('.TextBoxPop_outPop').style.display = 'block';
                let msg = this.lang.HMI_HT_HMIUserControlViewModel_InputLessThanMinimumValue;
                let firstL = msg.indexOf('<');
                let firstR = msg.indexOf('>') + 1;
                let lastL = msg.lastIndexOf('<');
                let lastR = msg.lastIndexOf('>') + 1;
                let str1 = msg.slice(firstL, firstR);
                let str2 = msg.slice(lastL, lastR);
                msg = msg.replace(str1, `<${text2}>`);
                msg = msg.replace(str2, `<${MinValue}>`);
                this.$emit('showtip',msg)
                // document.querySelector('.TextBoxPop_conter').innerHTML = `${msg}`;
              });
              return;
            }
          }

          this.filtrateVariable(item, text2, e)
        } else {
          this.$emit('showtip',this.lang.SCMSExplorerData_ProtocolDataType_PECorrect+TagType+this.lang.SCMSExplorerData_ProtocolDataType_Integer+min+'-'+max)
          // this.TextBoxShow = true;
          // setTimeout(() => {
          //   document.querySelector('.TextBoxPop_outPop').style.display = 'block';
          //   document.querySelector('.TextBoxPop_conter').innerHTML = `${this.lang.SCMSExplorerData_ProtocolDataType_PECorrect}${TagType}${this.lang.SCMSExplorerData_ProtocolDataType_Integer}${min} - ${max}`;
          // });
        }
      }
    },
    init() {

      //数据筛选
      this.textblockData = [];
      let dataAll = this.data.Controls.ControlList;
      this.cla = [];
      for (var i = 0; i < dataAll.length; i++) {
        if (dataAll[i].ControlType == this.Name) {
          this.textblockData.push(dataAll[i]);
          this.cla.push(dataAll[i].Name);
        }
      }
      if (this.textblockData.length != 0) {
        this.show = true;
      } else {
        this.show = false;
      }
      //赋值
      this.gitValue();
      if (this.show) {
        this.axio();
        this.JoinVarFun();
      }
    },
    //加入变量   主页面也有加入变量
    JoinVarFun() {
      if (this.$store.state.websocketsShow != null) {
        this.arrFun();
        let arr = [];
        arr = new Set(this.arr);
        arr = [...arr];
        this.varArr = arr;
        this.msgHub2 = window.$.connection.redisMonitor;
        if (this.msgHub2) {
          this.msgHub2.server.addVariables(arr);
        }
      }
    },
    //筛选变量组方法
    arrFun() {
      this.data = this.dae;
      let arr = [];
      this.textBbockArr = [];
      this.textBType = [];
      for (var i = 0; i < this.data.Data.MatrixGridSetAnimationList.length; i++) {
        var a = this.cla.indexOf(this.data.Data.MatrixGridSetAnimationList[i].ElementName);
        if (a != -1) {
          for(let j=0;j<this.data.Data.MatrixGridSetAnimationList[i].MatrixGridDatas.length;j++){
            arr.push(
              this.data.Data.MatrixGridSetAnimationList[i].MatrixGridDatas[j].TagName
            );
          }
          this.textBbockArr.push(
            this.data.Data.MatrixGridSetAnimationList[i].ElementName
          );
          this.textBType.push(
            this.data.Data.MatrixGridSetAnimationList[i].TagDataType
          );
        }
      }
      this.dataAnimationList = [];
      this.dataAnimationList = this.data.Data.DataStatusTextColorEffectAnimationList;
      this.dataAnimationList2 = this.textblockData;
      this.arr = arr;
    },
    setValue(data, list){
      data.forEach(item=>{
        if(Array.isArray(item)){
          this.setValue(item, list)
        }else{
          list.forEach(element => {
            if(item.TagName === element.Name){
              item.Value = element.Value
            }
          });
        }
      })
    },
    //条件判断方法
    judgeFun1(data) {
      
      if (data.length) {
        for (var i = 0; i < this.textBbockArr.length; i++) {
          if (data[i].Value == null) {
            var index133 = this.cla.indexOf(this.textBbockArr[i]);
            if (this.dataValue[index133] != undefined) {
              this.dataValue[index133].text = '???';
            }
          } else {
            this.dataValue.forEach(item=>{
              this.setValue(item.gridList, data)
            })
          }
        }
      }
      let ValueArr1 = [],
          ValueArr2 = []
      data.forEach(item=>{
        ValueArr1.push(item.Value)
        ValueArr2.push(item.Name)
      })
      this.ValueArr = ValueArr1
      this.varArr = ValueArr2
    },
    //数值请求
    axio() {
      this.resData = [];
      this.DataAnima = this.data.Data.MatrixGridSetAnimationList;
      this.arrFun();
      //请求接口
      this.$axios({
        method: 'post',
        url: '/api/Base/PostRediusTest?varNameString=' + name,
        data: this.arr,
      }).then((res) => {
        this.resData.push(res.data.data);
        this.judgeFun1(res.data.data);
      }).catch(function (error) {
        console.log('err', error);
      });
    },
    //websocket触发该方法
    axioImg2(resArr) {
      if (this.arr) {
        let index = this.arr.indexOf(resArr.name);
        let resShow = false;
        if (index != -1) {
          for (let i = 0; i < this.resData[0].length; i++) {
            if (this.resData[0][i].Name == this.arr[index]) {
              resShow = this.resData[0][i].Value.toString() == resArr.value.toString() ? false : true;
            }
          }
        }
        if (!resShow) {
          return;
        }
      }
      if (this.resData.length) {
        for (let z = 0; z < this.resData[0].length; z++) {
          if (resArr.name == this.resData[0][z].Name) {
            this.resData[0][z].Value = resArr.value;
          }
        }
        this.judgeFun1(this.resData[0]);
      }
    },
    //获取变量的数据类型
    getDataType(item){
      var ss = JSON.parse(sessionStorage.getItem('variable'));
      for (let o = 0; o < ss.length; o++) {
        if (item.TagName == ss[o].TagName) {
          return ss[o].TagType;
        }
      }
    },
    //赋值
    gitValue() {
      this.dataValue = [];
      for (var i = 0; i < this.textblockData.length; i++) {
        //加层级zIndex
        var ZIndexs = this.data.Data.ZIndexs;
        if (ZIndexs) {
          for (let item in ZIndexs) {
            if (this.textblockData[i].Name == item) {
              this.ZIndex = ZIndexs[item];
              break;
            }
          }
        } else {
          this.ZIndex = '';
        }
        let PropertyList = this.textblockData[i].PropertyList
        let MatrixGridSetAnimationList = this.data.Data.MatrixGridSetAnimationList;
        this.Marry = this.data.Data.MatrixGridSetAnimationList;
        //渐变色变量
        let Shadow = JSON.parse(PropertyList.Shadow),         //阴影
            fontColor = JSON.parse(PropertyList.Foreground),    //字体颜色
            background = JSON.parse(PropertyList.Background),   //背景颜色
            BorderBrush = JSON.parse(PropertyList.BorderBrush)  //边框颜色
     
        if (MatrixGridSetAnimationList.length != 0) {
          for ( let j = 0; j < MatrixGridSetAnimationList.length; j++ ) {
            if (MatrixGridSetAnimationList[j].ElementName == this.textblockData[i].Name) {
                let tableStyle = {
                  width: this.textblockData[i].PropertyList.Width,
                  height: this.textblockData[i].PropertyList.Height,
                  rotate: this.textblockData[i].PropertyList.RotateAngle,
                  top: this.textblockData[i].PropertyList.Top,
                  left: this.textblockData[i].PropertyList.Left,
                  opacity: this.textblockData[i].PropertyList.Opacity / 100,
                  FontSize: this.textblockData[i].PropertyList.FontSize,
                  family: this.textblockData[i].PropertyList.FontFamily,
                  class: this.textblockData[i].Name,
                  Blod: this.textblockData[i].PropertyList.IsBlod == 'True' ? 'bold' : '',
                  TagName: MatrixGridSetAnimationList[j].TagName,
                  TagDataType: MatrixGridSetAnimationList[j].TagDataType,
                  BorderThickness: this.textblockData[i].PropertyList.BorderThickness,
                  Shadow: Shadow,
                  TextDecorations: this.textblockData[i].PropertyList.TextDecorations == 'False' ? 'none' : 'underline',
                  ZIndex: this.ZIndex,
                  isShow: true,
                  spaceWidth: this.textblockData[i].PropertyList.SpaceColumnWidth,
                  spaceHeight: this.textblockData[i].PropertyList.SpaceRowHeight,
                  matrixGridElementName: MatrixGridSetAnimationList[j].MatrixGridElementName,
                  AdjustmentValue: this.textblockData[i].PropertyList.AdjustmentValue
                };
                //判断borderShadow是否为空对象
                if(Object.getOwnPropertyNames(Shadow).length !== 0){
                  let ShadowObj = Shadow.InnerShadow === undefined ? Shadow.OuterShadow : Shadow.InnerShadow
                  let shadowType = Shadow.InnerShadow === undefined ? "" : "inset"
                  tableStyle.Shadow = `${ShadowObj.OffsetX}px ${ShadowObj.OffsetY}px ${parseInt(ShadowObj.BlurRadius)}px ${ShadowObj.Color} ${shadowType}`
                }else{
                  tableStyle.Shadow = ""
                }
                //字体渐变
                if(fontColor.ColorType == 'SolidColor'){
                  tableStyle.fontColor = this.formatColor(fontColor.Data.Color);
                  tableStyle.backgroundClip = "none"
                  tableStyle.textFillColor = this.formatColor(fontColor.Data.Color)
                }else{
                  let backgroundColor = ''
                  for(let g=0;g< fontColor.Data.GradientStops.length;g++){
                    let gradient2 = fontColor.Data.GradientStops[g]
                    backgroundColor = backgroundColor + ',' + gradient2.Color + ' ' + parseInt(gradient2.Offset*100) + '%'
                  }

                  tableStyle.fontColor = '-webkit-linear-gradient('+ parseInt(fontColor.Data.Angel) +'deg'+backgroundColor+')';
                  tableStyle.backgroundClip = "text"
                  tableStyle.textFillColor = "transparent"
                }
                //背景渐变色
                if(background.ColorType === "SolidColor"){
                  console.log(this.formatColor(background.Data.Color))
                  //FBD7C8FF
                  //FBD7C8A7
                  tableStyle.Background = this.formatColor(background.Data.Color)
                }else{
                  let backColor = ''
                  for(var h1=0;h1<background.Data.GradientStops.length;h1++){
                    let gradient = background.Data.GradientStops[h1]
                    backColor = backColor + ',' + gradient.Color + ' ' + parseInt(gradient.Offset*100) + '%'
                  }
                  tableStyle.Background = '-webkit-linear-gradient('+ parseInt(background.Data.Angel) +'deg'+backColor+')';
                }
                //边框渐变
                if(BorderBrush.ColorType == 'SolidColor'){
                  tableStyle.BorderBrush = this.formatColor(BorderBrush.Data.Color);
                }else{
                  let borderColor = ''
                  for(let g=0;g< BorderBrush.Data.GradientStops.length;g++){
                    let gradient = BorderBrush.Data.GradientStops[g]
                    borderColor = borderColor + ',' + gradient.Color + ' ' + parseInt(gradient.Offset*100) + '%'
                  }
                  tableStyle.BorderBrush = '-webkit-linear-gradient('+ parseInt(BorderBrush.Data.Angel) +'deg'+borderColor+')';
                }

                let gridList = [], //整理后的
                  len = MatrixGridSetAnimationList[j].MatrixGridSetAmount, //每组长度（不包含边距）
                  row = (MatrixGridSetAnimationList[j].Row + 1) / 2, //行
                  column = (MatrixGridSetAnimationList[j].Column + 1) / (len + 1) //列

                //整体设定
                if(MatrixGridSetAnimationList[j].MatrixGridType === 2){
                  let rowList = []
                  MatrixGridSetAnimationList[j].MatrixGridDatas.forEach(item=>{
                    rowList.push({...item, Value: "???", type: 2, variableType: this.getDataType(item)})
                  })
                  gridList.push(rowList)
                }else if(MatrixGridSetAnimationList[j].MatrixGridType === 1){
                  let rowList = []
                  column = MatrixGridSetAnimationList[j].MatrixGridDatas
                  for(let c=0; c < column.length; c++){
                    rowList.push({...column[c], Value: "???", type: 1, variableType: this.getDataType(column[c])})
                    if((c + 1) % len === 0 && c < column.length - 1){
                      rowList.push({
                        type: "spaceColumn",
                            default:true,
                        IsSetMatrix: false
                      })
                    }
                  }
                  gridList.push(rowList)
                }else{
                  //行设定 MatrixGridType: 0
                  for(let r=0; r < row; r++){
                    let rowList = []
                    for(let c=0; c < column; c++){
                      for(let le=0; le < len; le++){
                        rowList.push({
                          ...MatrixGridSetAnimationList[j].MatrixGridDatas[r*len + c + le], 
                          Value: "???", 
                          type: 0, 
                            default:true,
                          variableType: this.getDataType(MatrixGridSetAnimationList[j].MatrixGridDatas[r*len + c + le])
                        })
                      }
                    }
                    gridList.push(rowList)
                    if(r < (row - 1)){
                      gridList.push({
                         default:true,
                        type: "spaceRow",
                        IsSetMatrix: false
                      })
                    }
                  }
                }
              tableStyle.gridList = gridList
              this.dataValue.push(tableStyle);
              break;
            }
          }
        }else{
           let PropertyList = this.textblockData[i].PropertyList
                   let tableStyle = {
                  width: this.textblockData[i].PropertyList.Width,
                  height: this.textblockData[i].PropertyList.Height,
                  rotate: this.textblockData[i].PropertyList.RotateAngle,
                  top: this.textblockData[i].PropertyList.Top,
                  left: this.textblockData[i].PropertyList.Left,
                  opacity: this.textblockData[i].PropertyList.Opacity / 100,
                  FontSize: this.textblockData[i].PropertyList.FontSize,
                  family: this.textblockData[i].PropertyList.FontFamily,
                  class: this.textblockData[i].Name,
                  Blod: this.textblockData[i].PropertyList.IsBlod == 'True' ? 'bold' : '',
                  TagName: '',
                  TagDataType: '',
                  BorderThickness: this.textblockData[i].PropertyList.BorderThickness,
                  Shadow: Shadow,
                  TextDecorations: this.textblockData[i].PropertyList.TextDecorations == 'False' ? 'none' : 'underline',
                  ZIndex: this.ZIndex,
                  isShow: true,
                  spaceWidth: this.textblockData[i].PropertyList.SpaceColumnWidth,
                  spaceHeight: this.textblockData[i].PropertyList.SpaceRowHeight,
                  matrixGridElementName: '',
                  gridList:[],
                  AdjustmentValue: this.textblockData[i].PropertyList.AdjustmentValue
                };
                //判断borderShadow是否为空对象
                if(Object.getOwnPropertyNames(Shadow).length !== 0){
                  let ShadowObj = Shadow.InnerShadow === undefined ? Shadow.OuterShadow : Shadow.InnerShadow
                  let shadowType = Shadow.InnerShadow === undefined ? "" : "inset"
                  tableStyle.Shadow = `${ShadowObj.OffsetX}px ${ShadowObj.OffsetY}px ${parseInt(ShadowObj.BlurRadius)}px ${ShadowObj.Color} ${shadowType}`
                }else{
                  tableStyle.Shadow = ""
                }
                //字体渐变
                if(fontColor.ColorType == 'SolidColor'){
                  tableStyle.fontColor = this.formatColor(fontColor.Data.Color);
                  tableStyle.backgroundClip = "none"
                  tableStyle.textFillColor = this.formatColor(fontColor.Data.Color)
                }else{
                  let backgroundColor = ''
                  for(let g=0;g< fontColor.Data.GradientStops.length;g++){
                    let gradient2 = fontColor.Data.GradientStops[g]
                    backgroundColor = backgroundColor + ',' + gradient2.Color + ' ' + parseInt(gradient2.Offset*100) + '%'
                  }

                  tableStyle.fontColor = '-webkit-linear-gradient('+ parseInt(fontColor.Data.Angel) +'deg'+backgroundColor+')';
                  tableStyle.backgroundClip = "text"
                  tableStyle.textFillColor = "transparent"
                }
                //背景渐变色
                if(background.ColorType === "SolidColor"){
                  console.log(this.formatColor(background.Data.Color))
                  //FBD7C8FF
                  //FBD7C8A7
                  tableStyle.Background = this.formatColor(background.Data.Color)
                }else{
                  let backColor = ''
                  for(var h1=0;h1<background.Data.GradientStops.length;h1++){
                    let gradient = background.Data.GradientStops[h1]
                    backColor = backColor + ',' + gradient.Color + ' ' + parseInt(gradient.Offset*100) + '%'
                  }
                  tableStyle.Background = '-webkit-linear-gradient('+ parseInt(background.Data.Angel) +'deg'+backColor+')';
                }
                //边框渐变
                if(BorderBrush.ColorType == 'SolidColor'){
                  tableStyle.BorderBrush = this.formatColor(BorderBrush.Data.Color);
                }else{
                  let borderColor = ''
                  for(let g=0;g< BorderBrush.Data.GradientStops.length;g++){
                    let gradient = BorderBrush.Data.GradientStops[g]
                    borderColor = borderColor + ',' + gradient.Color + ' ' + parseInt(gradient.Offset*100) + '%'
                  }
                  tableStyle.BorderBrush = '-webkit-linear-gradient('+ parseInt(BorderBrush.Data.Angel) +'deg'+borderColor+')';
                }
                              let gridList = [], //整理后的
                  len = 1, //每组长度（不包含边距）
                  row = 1, //行
                  column = 4, //列
                  groupLen = row * column //每行的数据长度 12
              for(let r=0; r < row; r++){
                let rowList = []
                for(let c=0; c < column; c++){
                  // let grid = []
                  for(let le=0; le < len; le++){
                    rowList.push({
                      IsSetMatrix:false,
                      Value: "",
                      Background: tableStyle.Background,
                      fontColor: tableStyle.fontColor,
                      backgroundClip: tableStyle.backgroundClip,
                      textFillColor: tableStyle.textFillColor,
                      default:false,
                      isChange: false
                    })
                  }
                  if(c < (column - 1)){
                    rowList.push({
                        default:false,
                      type: "spaceColumn",
                      IsSetMatrix: false
                    })
                  }
                }
                gridList.push(rowList)
                if(r < (row - 1)){
                  gridList.push({
                    type: "spaceRow",
                      default:false,
                    IsSetMatrix: false
                  })
                }
              }
               tableStyle.gridList = gridList
                this.dataValue.push(tableStyle);
        }
      }
    },
    //16进制颜色转换
    formatColor(color) {
      if(color.length === 9){
        console.log(color)
        console.log("00000-----", color.slice(3) + color.slice(1, 3))
        return '#' + color.slice(3) + color.slice(1, 3);
      }else{
        return color
      }
    },
  },
};
</script>
<style lang="scss" scoped>
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
        //  font-size:16px;
        //  width:90%;
        //  margin:0 auto;
        //  height:100px;
        // //  padding-top:27px;
        // display: flex;
        // align-items: center;
        // justify-content: center;
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
.matrixgridSet{
  position: relative;

  &::after{
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 0;
    box-shadow: inherit;
  }
}
.matrixgrid-table {
  width: 100%;
  height: 100%;
  background: #fff;
  display: flex;
  flex-flow: column;
  user-select: none;

  .matrixgrid-row {
    flex: 1;
    display: flex;
    height: 100%;
  }

  .matrixgrid-space {
    background: #fff;
  }

  .matrixgrid-cell {
    flex: 1;
    padding: 7px;
    font-size: 14px;
    border: 1px solid #fff;
    text-align: center;
    box-sizing: border-box;
  }
  .matrixgrid-set {
    position: relative;
    z-index: 9;
    height: 100%;
    margin-right: 30px;

    input {
      width: 100%;
      height: 100%;
      text-decoration: inherit;
      background: transparent;
      text-align: center;
      color: inherit;
      font-weight: inherit;
      font-size: inherit;
      overflow: auto;

      &:disabled{
        &:hover {
          border-color: transparent;
          background: transparent;
        }
      }

      &:hover {
        border-color: #779AEE;
        background: #eff4fe;
      }

      &:focus {
        border-color: #779aee;
        background: #eff4fe;
      }
    }

    .add {
      position: absolute;
      top: 0;
      right: -30px;
      width: 20px;
      height: 50%;
      border: 0;
      border-radius: 1px;
      background: url(../../../assets/images/Default-shang.png) no-repeat;
      background-size: 100% 100%;
      cursor: pointer;

      &:disabled{
        &:hover{
          background: url(../../../assets/images/Default-shang.png) no-repeat;
          background-size: 100% 100%;
          cursor: default;
        }
      }

      &:hover {
        background: url(../../../assets/images/Click-shang.png) no-repeat;
        background-size: 100% 100%;
      }
    }
    
    .subtract {
      position: absolute;
      top: 51%;
      right: -30px;
      width: 20px;
      height: 50%;
      border: 0;
      border-radius: 1px;
      background: url(../../../assets/images/Default-xia.png) no-repeat;
      background-size: 100% 100%;
      cursor: pointer;

      &:disabled{
        &:hover{
          background: url(../../../assets/images/Default-xia.png) no-repeat;
          background-size: 100% 100%;
          cursor: default;
        }
      }

      &:hover {
        background: url(../../../assets/images/Click-xia.png) no-repeat;
        background-size: 100% 100%;
      }
    }
  }
}
</style>