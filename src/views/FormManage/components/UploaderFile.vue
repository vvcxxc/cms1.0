<!--
- 附件上传
-->
<template>
  <div class="component-uploaderFile component-content">
    <div class="uploader-file">
      <div class="component-title">
          {{formData.componentAttribute.title}}
          <span
            class="font-2"
            v-if="!formData.componentAttribute.required"
          >({{lang.EquipmentAccount_Optional}})</span>
          <span class="min-icon" v-if="formData.componentAttribute.tipText">
            <el-tooltip
              class="item"
              effect="dark"
              placement="bottom-start"
              v-if="formData.componentAttribute.tipText !== ''"
            >
              <div slot="content">
                <div class="tooltip-content">{{formData.componentAttribute.tipText}}</div>
              </div>
              <img :src="warning" class="icon-warning" alt>
            </el-tooltip>
          </span>
      </div>
      <div class="file-list">
        <div v-for="(item,idx) in filelistData" :key="idx" class="list-item" @click="handlePreview(item)">
          <div class="file-content"> 
              <my-media :nowmedia="item"/>
              <div class="mask"></div>
          </div>
          <i class="close" @click.stop="closeUpload(idx)"></i>
        </div>
        <video muted controls id="eff" :src="currentVideo" style="display:none"></video>
        <div class="el-upload" v-show="isShow">
            <div class="file-item-plus" @click="uploadClick">
              <div class="plus-min-img"></div>
              <div class="plus-btn"></div>
            </div>
            <input type="file" name="file" accept=".png,.jpg,.jpeg,.flv,.mp4" ref="upload" class="el-upload__input" @change="upload">
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import MyMedia from './Media.vue'
import flvjs from 'flv.js/dist/flv.min.js'
export default {
    components: {
      MyMedia
    },
    props: {
      formData: {
        type: Object,
        required: false,
        default: ()=>{
          return {}
        }
      },
      appFormDataId:{
        type: String,
        default: ""
      },
      appFormId:{
        type: String,
        default: ""
      }
    },
    data() {
      return {
        warning: require('../../../assets/images/warning.png'),
        filelistData: [], //当前列表文件
        delFileList: [], //删除的文件
        isShow: true,
        currentVideo: '',
        lang: JSON.parse(localStorage.getItem('languages'))[localStorage.getItem('currentLang')]
      };
    },
    watch: {
      filelistData(){
        if(this.filelistData.length > 0){
          if(this.filelistData[0].type === 'img'){
            this.isShow = !(this.filelistData.length >= 3)
          }else{
            this.isShow = false
          }
        }else{
          this.isShow = true
        }
      }
    },
    methods: {
      submitFile(){
        let addFileList = []
        this.filelistData.forEach(item=>{
          if(item.isLink){
            addFileList.push(item.files)
          }
        })
        return {
          controlId: this.formData.id,
          appFormId: this.appFormId,
          appFormDataId: this.appFormDataId,
          delFileList: this.delFileList,
          addFileList,
          filelistData: this.filelistData,
        }
      },
      closeUpload(idx){
        if(!this.filelistData[idx].isLink){
          this.delFileList.push(this.filelistData[idx].files)
        }
        let list = [...this.filelistData]
        list.splice(idx, 1)
        this.filelistData = [...list]
      },
      uploadClick(){
        this.$refs.upload.click();
      },
      handlePreview(item){
        this.$emit("handlePreview", {
          index: 0,
          ...item
        })
      },
      upload(e){
        let file = e.target.files[0]
        let choiceType = ['image/png', 'image/jpeg', 'video/mp4', '.flv']
        let fileUrl = URL.createObjectURL(file)
        let fileType = "";

        if(choiceType.indexOf(file.type) >= 0){
          fileType = file.type
        }else if(file.name.substring(file.name.length-4) === choiceType[3]){
          fileType = 'video/flv'
        }else{
          this.$emit("uploadErr", this.lang.APPFormManage_UnsupportedFileFormat)
          return
        }
        console.log(this.filelistData.length > 1, fileType.includes("video"))
        if(this.filelistData.length > 0 && fileType.includes("video")){
          this.$emit("uploadErr", this.lang.APPFormManage_AttachmentsCannotMixed)
          return
        }
        if(fileType.includes("video")){
          let url = URL.createObjectURL(this.$refs.upload.files[0]);
          var videoElement = document.getElementById('eff')
          var flvPlayer = flvjs.createPlayer({
            type: fileType.includes('flv') ? 'flv' : 'mp4',
            isLive: true,
            url: url
          })
          this.currentVideo = url
          flvPlayer.attachMediaElement(videoElement)
          flvPlayer.load();
          flvPlayer.play();
          setTimeout(()=>{
            if(flvPlayer.duration > 10){
              this.$emit("uploadErr", this.lang.APPFormManage_VideoLengthTooLong)
              return
            }else{
              this.filelistData.push({
                type: 'video',
                appFormId: this.appFormId,
                controlId: this.formData.id,
                appFormDataId: this.appFormDataId,
                flv: fileType.includes('flv') ? 'flv' : 'mp4',
                file: url,
                files: file,
                isLink: true
              })
            }
          }, 500)
        }else{
          this.filelistData.push({
            type: 'img',
            appFormId: this.appFormId,
            controlId: this.formData.id,
            appFormDataId: this.appFormDataId,
            flv: 'mp4',
            file: fileUrl,
            files: file,
            isLink: true
          })
        }
        //清空上传文件的值
        this.$refs.upload.value = ""
      }
    },
    mounted() {
      let formDataId = this.appFormDataId
      this.$axios({
        method: 'GET',
        url:'/api/AppForm/GetAttachments',
        params: {
          appFormId: this.appFormId,
          appFormDataId: formDataId,
          controlId: this.formData.id
        }
      }).then(res=>{
        res.data.data.Files.forEach(file=>{
          this.filelistData.push({
            appFormId: this.appFormId,
            controlId: this.formData.id,
            appFormDataId: this.appFormDataId,
            type: file.includes('png') || file.includes('jpg') ? 'img' : 'video',
            flv: file.includes('flv') ? 'flv' : 'mp4',
            file,
            files: file
          })
        })
      })
    }
};
</script>
<style lang='scss' scoped>
.component-uploaderFile {
    background: #fff;
    
    .el-upload{
      width: 80px;
      height: 80px;
    }

    .list-item{
      border-radius: 8px;
      border: 1px solid #b9b6b6;
      margin-right: 16px;
      margin-bottom: 10px;
      width: 80px;
      height: 80px;
      position: relative;
      text-align: center;
      background: #F7F8FA;
      cursor: pointer;

      .file-content{
        width: 100%;
        height: 100%;
        border-radius: 8px;
        overflow: hidden;
        display: flex;

        .mask{
          position: absolute;
          width: 100%;
          height: 100%;
        }
      }

      .close{
        display: none;
        position: absolute;
        z-index: 10;
        width: 22px;
        height: 22px;
        right: -8px;
        top: -10px;
        background-color: #ff6b79;
        border-radius: 11px 11px;
        background-image: url('../../../assets/images/close-big-default.png');
        background-size: 70% 70%;
        background-repeat: no-repeat;
        background-position: center;
        cursor: pointer;
        font-size: 0;
      }

      &:hover{
        .close{
          display: block;
        }
      }

      img, video{
        width: auto;
        height: auto;
        max-width: 100%;
        max-height: 100%;
        margin: auto;
        vertical-align: middle;
      }
    }

    .uploader-file {
        padding: 0;
        box-sizing: border-box;
        width: 100%;

        .file-list {
            margin-top: 10px;
            width: 100%;
            height: auto;
            display: flex;
            flex-wrap: wrap;

            .file-item-plus {
                width: 80px;  
                height: 80px;
                background: #ededed;
                overflow: inherit;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                border-radius: 8px;
                border: 1px dashed #bbbbbb;
                position: relative;
                .plus-min-img {
                    width: 27px;
                    height: 27px;
                    background-image: url('../../../assets/images/min-img.png');
                    background-size: 100% 100%;
                    background-repeat: no-repeat;
                }
                .plus-btn {
                    width: 100%;
                    height: 100%;
                    position: absolute;
                    z-index: 2;
                    opacity: 0;
                }
            }
        }
    }
}
.component-content{
    position: relative;
    padding: 8px 26px;
    flex-wrap: wrap;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    overflow: hidden;

    .component-title{
      line-height: 28px;
      font-size: 14px;
      font-weight: 400;
      color: #7C7F8E;
      min-width: 300px;
      padding: 8px 0;

      .font-2 {
          font-size: 12px;
          font-weight: 500;
          line-height: 20px;
          color: #7C7F8E;
      }

      .icon-warning{
        margin-left: 2px;
        width: 14px;
        height: 14px;
        vertical-align: middle;
      }
    }

    &::after{
      position: absolute;
      content: "";
      left: 16px;
      right: 16px;
      bottom: 1px;
      height: 1px;
      background: #EBEBEB;
    }
  }
  .tooltip-content{
    max-width: 300px;
  }
</style>