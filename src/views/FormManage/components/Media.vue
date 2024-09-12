<template>
   <div class="tablemedia">
      <video muted controls  v-if='nowmedia.type=="video"' id="flv">
      </video>
      <img :src="src" alt="" v-else>
   </div>

</template>
<script>
import flvjs from 'flv.js/dist/flv.min.js'
export default {
    props: ['nowmedia'],
    data() {
        return {
          src:''
        };
    },

    created(){

  },


    mounted(){
      if(this.nowmedia.type=="video"&&this.nowmedia.flv=="mp4"){
        this.nowmedia.isLink ? this.src = this.nowmedia.file :
        this.src = `/api/AppForm/GetAttachment?appFormId=${this.nowmedia.appFormId}&controlId=${this.nowmedia.controlId}&appFormDataId=${this.nowmedia.appFormDataId}&fileName=${this.nowmedia.file}`
       this.createVideo('mp4');
      }else if(this.nowmedia.type=="video"&&this.nowmedia.flv=="flv"){
        this.nowmedia.isLink ? this.src = this.nowmedia.file :
         this.src = `/api/AppForm/GetAttachment?appFormId=${this.nowmedia.appFormId}&controlId=${this.nowmedia.controlId}&appFormDataId=${this.nowmedia.appFormDataId}&fileName=${this.nowmedia.file}`
        this.createVideo('flv');
      }else{
        this.nowmedia.isLink ? this.src = this.nowmedia.file :
        this.src = `/api/AppForm/GetAttachment?appFormId=${this.nowmedia.appFormId}&controlId=${this.nowmedia.controlId}&appFormDataId=${this.nowmedia.appFormDataId}&fileName=${this.nowmedia.file}`
      }
    
    },
    methods:{
        createVideo(type){
          if (flvjs.isSupported()) {
            var videoElement = document.getElementById('flv')
            var flvPlayer = flvjs.createPlayer({
              type: type,
              isLive: true,
              url: this.src
            })
            flvPlayer.attachMediaElement(videoElement)
            flvPlayer.load()
            flvPlayer.play()
          }
      },
    },
};
</script>
<style lang="scss" scoped>
.tablemedia{
  width: 100%;
  height: 100%;
  video{
  width: 100%;
  height: 100%;
  }
  img{
  object-fit: contain;
  width: 100%;
  height: 100%;
  }
}
</style>