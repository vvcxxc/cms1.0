<!--
 * @Description: 这是引用数据弹窗页面（组件）
 * @Date: 2020-11-19 09:25:59
 * @Author: Tao
 * @LastEditors: Tao
 * @LastEditTime: 2021-03-01 14:23:41
-->
<template>
    <div class="import_box" :style="{zoom: zoomValue}" >
         <div  v-drag class="head">{{lang.ScheduleManage_Import}}
           <div @click="can()" class="headImg"></div>
        </div>
        <div class="import_middle">
            <div class="import_text">{{lang.ScheduleManage_Upload_Schedule}}</div>
            <div class="import_select">
                <el-upload
                    class="upload-demo"
                    ref="upload"
                    :action="url"
                    :on-remove="handleRemove"
                    :on-change="change"
                    :on-success="successFun"
                    :on-error="error"
                    :file-list="fileList"
                    :auto-upload="false">
                    <div class="select_rect left"></div>
                    <div type="primary" slot="trigger" class="select_btn left">{{lang.ScheduleManage_Export_Choice}}</div>
                    <div @click="importFun()" class="import_ban">{{lang.ScheduleManage_Download_Template}}</div>
                    <div class="import_btn">
                        <div @click="submitUpload()" class="confirm">{{lang.ScheduleManage_Import}}</div>
                        <div @click="can()" class="cancel">{{lang.PopupCommon_Cancel}}</div>
                    </div>
                </el-upload>
            </div>
        </div>
    </div>
</template>
<script>
import moment from 'moment'//导入文件
export default {
    data(){
        return{
            fileList: [],
            url: `/api/class/Import?argLanguage=${localStorage.getItem('currentLang')}`,
            lang: JSON.parse(localStorage.getItem('languages'))[localStorage.getItem('currentLang')],
            zoomValue: 0,
        }
    },
     directives: {
            drag: function(el) {
                let dragBox = el; //获取当前元素
                dragBox.onmousedown = e => {
                let box = document.querySelector('.import_box')
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
        created () {
          this.$nextTick(() => {
                this.zoomValue = Number(parseFloat(window.screen.width/1920).toFixed(2)) <= 0.8 ? 0.8 : Number(parseFloat(window.screen.width/1920).toFixed(2))
            })  
        },
    methods:{
      importFun(){
        var year = moment().format("YYYY")
        var month = moment().format("MM")
        window.open(
            `/api/class/DownloadTemplate?year=${year}&month=${month}&argLanguage=${localStorage.getItem('currentLang')}`
        );
      },
      //导入方法
      submitUpload() {
        this.$refs.upload.submit();
      },
      //删除方法
      handleRemove(file, fileList) {
        console.log('eeee',file, fileList,this.fileList);
      },
      //监听上传前变化
      change(file,fileList){
          fileList = []
          this.fileList = []
          this.fileList.push(file)
          fileList.push(file)
      },
      error(err, file, fileList){
          console.log('err',err,file,fileList)
      },
      successFun(response, file, fileList){
          if(response.code == 1){
                this.$parent.Pshow(response.msg,'1','模板失败')
                this.fileList = []
                fileList = []
                document.querySelector('.el-upload-list__item').remove()
          }else{
              this.$parent.Pshow(this.lang.FormulaManage_HT_ImportSuccess,'1','模板成功')
          }
      },
      //关闭弹窗
      can(){
          this.$parent.cancelFun()
      }
        
    }
    
}
</script>
<style lang="scss">
.import_box{
    .el-upload-list{
         position: absolute;
         top: 118px;
         left:41px;
         width:248px;
         height: 40px;
         overflow: hidden;
    }
    .el-upload-list__item:first-child{
        background: #fff !important;
        margin-top:0px;
    }

}
</style>
<style??? lang="scss" scoped>
.import_box{
    width:400px;
    height: 267px;
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
    .import_middle{
        width:100%;
        height: calc(227px - 30px);
        box-sizing: border-box;
        .import_text{
            margin-top:30px;
            margin-left:40px;
            margin-bottom:20px;
            font-size: 16px;
            font-family: Microsoft YaHei;
            font-weight: bold;
            color: #222222;
            line-height: 20px;
            user-select: none;
        }
        .import_select{
            width:100%;
            height: 40px;
            padding-left:40px;
            .select_rect{
                width:250px;
                height: 40px;
                margin-right:10px;
                background: #FFFFFF;
                border: 1px solid #DDDDDD;
            }
            .select_btn{
                width:60px;
                height: 40px;
                text-align: center;
                line-height: 40px;
                border-radius: 4px;
                user-select: none;
                cursor: pointer;
                background: #386DF0;
                color: #fff;
                font-size: 14px;
            }
        }
        .import_ban{
            margin-top:4px;
            font-size: 16px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            text-decoration: underline;
            color: #084DF7;
            user-select: none;
            cursor: pointer;
        }
        .import_btn{
            overflow: hidden;
            margin-top:11px;
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

</style???>