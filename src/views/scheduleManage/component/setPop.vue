<!--
 * @Description: 这是设置弹窗页面（组件）
 * @Date: 2020-11-19 09:26:10
 * @Author: Tao
 * @LastEditors: Tao
 * @LastEditTime: 2021-03-03 13:28:41
-->
<template>
    <div class="set_box" :style="{zoom: zoomValue}" >
        <div  v-drager class="head">{{lang.ScheduleManage_Style_Settings}}
           <div @click.stop="can()" class="headImg"></div>
        </div>
        <div class="set_middle">
            <div class="set_color">{{lang.ScheduleManage_ShiftColor}}</div>
            <div class="set_banColor">
                <div v-for="(item,index) in setData" :key="index" style="overflow:hidden;float:left">
                    <div class="morn_text left">{{item.name}}:</div>
                    <div class="morn_color left">
                        <el-color-picker
                            v-model="item.color"
                            show-alpha
                            :predefine="predefineColors">
                        </el-color-picker>
                    </div>
                </div>
            </div>
            <div class="set_color">{{lang.ScheduleManage_ShiftText}}</div>
            <div class="set_text">
                 <span class="left setText">{{lang.ScheduleManage_FontSize}}</span>
                 <el-radio size="medium" v-model="radio" label="1">{{lang.ScheduleManage_FontSize_Big}}</el-radio>
                 <el-radio size="medium" v-model="radio" label="2">{{lang.ScheduleManage_FontSize_Medium}}</el-radio>
                 <el-radio size="medium" v-model="radio" label="3">{{lang.ScheduleManage_FontSize_Small}}</el-radio>
            </div>
            <div class="set_textColor">
                <span class="textColor left">{{lang.ScheduleManage_FontColor}}</span>
                <el-color-picker
                        v-model="textColor"
                        show-alpha
                        :predefine="predefineColors">
                </el-color-picker>
            </div>
            <div class="set_btn">
                <div @click="confirmFun()" class="confirm">{{lang.PopupCommon_Sure}}</div>
                <div @click="can()" class="cancel">{{lang.PopupCommon_Cancel}}</div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            textColor:'#fff',
            radio:"1",
            predefineColors: [
                '#000000',
                '#333333',
                '#7F7F7F',
                '#ff4500',
                '#ff8c00',
                '#ffd700',
                '#70B606',
                '#AEDADB',
                '#1DBCB8',
                '#1A99EC',
                '#0055BE',
                '#c71585',
                'rgb(255, 120, 0)',
                'hsv(51, 100, 98)',
                'hsl(181, 100%, 37%)',
                'rgb(255, 0, 0)',
            ],
            lang: JSON.parse(localStorage.getItem('languages'))[localStorage.getItem('currentLang')],
            zoomValue: 0,
        }
    },
    props:['setData'],
     directives: {
            drag: function(el) {
                let dragBox = el; //获取当前元素
                dragBox.onmousedown = e => {
                let box = document.querySelector('.set_box')
                    //算出鼠标相对元素的位置
                    let disX = e.clientX - dragBox.offsetLeft;
                    let disY = e.clientY - dragBox.offsetTop;
                    document.onmousemove = e => {
                        //用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
                        let left = e.clientX - (Number(disX));
                        let top = e.clientY - (Number(disY));
                        //移动当前元素
                        box.style.left = left + "px";
                        box.style.top = top + "px";
                    };
                    document.onmouseup = e => {
                          document.onmousemove = null;
                          document.onmouseup = null;
                    };
                };
            }
        },
    created(){
            this.$nextTick(() => {
                this.zoomValue = Number(parseFloat(window.screen.width/1920).toFixed(2)) <= 0.8 ? 0.8 : Number(parseFloat(window.screen.width/1920).toFixed(2))
            })
            this.textColor = this.colorConvert(this.setData[0].textColor)        //初始化赋值
            this.radio = this.setData[0].fontSize=='22'?'1':this.setData[0].fontSize=="16"?'2':'3'   
            for(let i=0;i<this.setData.length;i++){
                if(this.setData[i].color.length>7){
                    this.setData[i].color = this.colorConvert(this.setData[i].color)
                }
            }
    },
    methods:{
        //{{lang.PopupCommon_Sure}}
        confirmFun(){
            var value2 = {}
                for(let h=0;h<this.setData.length;h++){
                    var o = {}
                    var color
                      if(this.setData[h].color.slice(0,1) != '#'){
                          color = this.hexify(this.setData[h].color);
                      }else{
                          color = this.setData[h].color
                      }
                    var str = `o.id_${this.setData[h].id}='${color}'`
                    eval(str);
                    Object.assign(value2,o);
                }
     
            var textcolor = this.hexify(this.textColor)  //字体颜色
            var sizeBig,sizeMedium,sizeSmall           //文字大小
           if(this.radio == '1'){
               sizeBig = true
               sizeMedium = false
               sizeSmall = false
           }else if(this.radio == '2'){
               sizeBig = false
               sizeMedium = true
               sizeSmall = false
           }else{
               sizeBig = false
               sizeMedium = false
               sizeSmall = true
           }
            var data =  {          //参数
                "ShiftColorMap":value2,
                "fontColor":textcolor,
                "FontBig":sizeBig,
                "FontMedium":sizeMedium,
                "FontSmall":sizeSmall
            }
            this.$axios({
                method:"post",
                url:`/api/class/SetFontSettings`,
                data:data,
            }).then((res)=>{
                this.$parent.initFrequency()
                this.$parent.cancelFun()
            }).catch((err)=>{
                console.log('err',err)
            })
         
        },
        //取消
        can(){
            this.$parent.cancelFun()
        },
        //将16进制带透明的改为rgba
        colorConvert(color) {
            let a, b, c, d
            if (color[0] === "#") {
                a = parseInt(color[1] + color[2], 16)
                b = parseInt(color[3] + color[4], 16)
                c = parseInt(color[5] + color[6], 16)
                d = parseInt(color[7] + color[8], 16)
                  if(isNaN(d)){
                      return 'rgba('+a+','+b+','+c+')'
                  }else{
                      return 'rgba('+a+','+b+','+c+','+d+')'
                  }
            } 
        },
        //rgba转为16进制
        hexify(color) {
            var values = color
            .replace(/rgba?\(/, '')
            .replace(/\)/, '')
            .replace(/[\s+]/g, '')
            .split(',');
            var a = parseFloat(values[3] || 1),
            r = Math.floor(a * parseInt(values[0]) + (1 - a) * 255),
            g = Math.floor(a * parseInt(values[1]) + (1 - a) * 255),
            b = Math.floor(a * parseInt(values[2]) + (1 - a) * 255);
            return "#" +
            ("0" + r.toString(16)).slice(-2) +
            ("0" + g.toString(16)).slice(-2) +
            ("0" + b.toString(16)).slice(-2) +
            ("0" + b.toString(16)).slice(-2)
        },
        
    }
    
}
</script>
<style lang="scss">
.set_box{
        .el-color-picker__icon{
            display: none;
        }
        .el-color-picker{
            width:28px;
            height: 28px;
        }
        .el-color-picker__trigger{
            padding:0px !important;
            width:28px;
            height: 28px;
        }
        .el-radio__label{
            font-size: 16px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: #222222;
        }
}
// 13 16 22
</style>
<style lang="scss" scoped>
.set_box{
    width:448px;
    height:354px;
    position:absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    z-index: 12;
    box-shadow:-7px 7px 50px 0px rgba(51,51,51,0.5);
    background: #EEEEEE;
    .left{
        float: left;
    }
    .head{
        position: relative;
        line-height: 40px;
        text-align: center;
        width:100%;
        height:40px;
        background:rgba(56, 109, 240, 1);
        font-size:16px;
        font-family:Microsoft YaHei;
        font-weight:bold;
        color:rgba(238,238,238,1);
        user-select: none;
        .headImg{
            position: absolute;
            right: 12px;
            top: 13px;
            width:16px;
            height: 16px;
            background: url('../../../assets/images/no.png');
            background-size:cover ;
            cursor: pointer;
        }
    }
        .set_middle{
            width:100%;
            height: 314px;
            padding-left:40px;
            .set_color{
                margin-top:10px;
                font-size: 16px;
                font-family: Microsoft YaHei;
                font-weight: bold;
                color: #222222;
            }
            .set_banColor{
                width: 100%;
                margin-top:19px;
                line-height: 28px;
                overflow: hidden;
                .morn_text,.noon_text,.night_text,.rest_text{
                    font-size: 16px;
                    font-family: Microsoft YaHei;
                    font-weight: 400;
                    color: #222222;
                    margin-right:6px;
                }
                .morn_color,.noon_color,.night_color,.rest_color{
                    margin-right:36px;
                }
        }
        .set_text{
            font-size: 16px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: #222222;
            line-height: 20px;
            margin-top:20px;
        }
        .set_textColor{
            width:100%;
            height: 28px;
            line-height: 28px;
            margin-top:20px;
            .textColor{
                font-size: 16px;
                font-family: Microsoft YaHei;
                font-weight: 400;
                color: #222222;
                margin-right:17px;
            }
        }
        .setText{
            margin-right:20px;
        }
        .set_btn{
            position:absolute;
            top:283px;
            right:13px;
            overflow: hidden;
            margin-top:20px;
            .confirm,.cancel{
                float: right;
                width: 100px;
                height: 40px;
                border-radius: 4px;
                text-align: center;
                line-height: 40px;
                cursor: pointer;
                user-select: none;
                color:#fff;
            }
            .cancel{
                background: #949BAC;
            }
            .confirm{
                background: #4270E4;
                margin-left:20px;
                margin-right:20px;
            }
        }
    }
}

</style>