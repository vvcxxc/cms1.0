<!--
 * @Description: 这是***页面（组件）
 * @Date: 2020-06-30 19:24:34
 * @Author: Tao
 * @LastEditors: Tao
 * @LastEditTime: 2021-01-27 19:22:11
-->
<template>
<!-- <div v-if="show"> -->
     <div>
     <div
            v-for="(item,key) in textblockData"
            :key="key"
            class='divvideo'
            :style="'position:absolute;' + 'left:' + item.PropertyList.Left + 'px; top:' + item.PropertyList.Top  + 'px; width:'+ item.PropertyList.Width + 'px; height:'+ item.PropertyList.Height + 'px;'+'RotateAngle:'+item.PropertyList.RotateAngle+';Opacity:'+(parseInt(item.PropertyList.Opacity)/100)+';zIndex:'+item.PropertyList.ZIndex"
        >
     <Video2 :dataId="dataId" :data="data" :play="item.PropertyList" :name='name' :id="item.Name"></Video2>
     </div> 
</div>
</template>
<script>
import Video2 from'./video2'
export default {
    name:'video',
    components:{
       Video2
    },
    data(){
        return{
             data:'',
             Name:'mediaplayer',
             textblockData:'',
             show:false
        }
    },
    props: ['dae','name','dataId'],
        watch: {
        dae: {
            deep:true,
            handler(val) {
                this.Name = 'mediaplayer';
                this.data = val;
                this.init();
            }
        }
    },
       mounted() {
        this.data = this.dae;
        if(this.data){
            this.Name = 'mediaplayer';
            this.init();
        }
    },
    methods:{
        init(){
            this.textblockData = [];
            var dataAll = this.data.Controls.ControlList;
          
            for (var i = 0; i < dataAll.length; i++) {
                if (dataAll[i].ControlType == this.Name) {
                    this.textblockData.push(dataAll[i]);
                  
                }
            }
            //加层级
            for(let j=0;j<this.textblockData.length;j++){
                this.textblockData[j].PropertyList.class = this.textblockData[j].Name
                 var ZIndexs = this.data.Data.ZIndexs
                 if(ZIndexs){
                    for(let item in ZIndexs){
                        if(this.textblockData[j].Name == item){
                            this.textblockData[j].PropertyList.ZIndex = ZIndexs[item]
                            break
                        }
                    }
                 }else{
                     this.textblockData[j].PropertyList.ZIndex = ''
                 }
            }
            if(this.textblockData.length){
                console.log("sdasd",this.textblockData)
                this.textblockData[0].PropertyList.name = "a"
                if(this.textblockData[1]){
                    this.textblockData[1].PropertyList.name = "b"
                }
                    
               //    this.textblockData[2].PropertyList.name = "c"
               //   this.textblockData[3].PropertyList.name = "d"
               if (this.textblockData.length != 0) {
                   this.show = true;
               } else {
                   this.show = false;
               }
            }
          
        }
    }
}

</script>