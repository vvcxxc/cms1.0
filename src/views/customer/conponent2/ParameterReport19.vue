<!--
 * @Description: 这是图片页面（组件）
 * @Date: 2019-11-12 17:40:04
 * @Author: Tao
 * @LastEditors: Tao
 * @LastEditTime: 2020-09-10 17:07:54
 -->
<template>
<div>
   <div v-for="(item,index) in dataValue" :key="index">
  <div v-if="show" class="imgVue" :style="'width:'+ item.width + 'px; height:' + item.height + 'px; opacity:' + item.opacity 
      + '; position:absolute; left:' + item.left  + 'px; top:' + item.top + 'px; transform:rotate(' + item.rotate + ');'" >
        <img class="boximg" :src="item.source" :style="'width:' + item.W + ';height:' + item.H ">
      </div>
  </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
        width:0,
        height:0,
        left:0,
        top:0,
        opacity:0,
        rotate:0,
        show:true,
        sourcearr:[],
        imgArr:[],
        textblockData:[],
        dataValue:[]
    };
  },
  props:['dae','name'],
     watch:{
      dae:{
        handler(val){
          this.data = val;
          if(val){
            this.init();
          }
        }
      }
    },
  created(){
   
    this.data = this.dae
      this.Name = 'parameterreport'
    this.init()
     
  },

  methods: {
    init(){
            //数据筛选
      var dataAll = this.data.Controls.ControlList
      this.textblockData = []
      for(var i=0;i<dataAll.length;i++){
        if(dataAll[i].ControlType == this.Name){
                this.textblockData.push(dataAll[i].PropertyList)
                }

      }

       if(this.textblockData.length>0){
                this.show = true
            }else{
                this.show = false
            }
 
      //赋值
      if(this.show){
        this.gitValue()
        this.imgArr = []
        
      }

    },
    //赋值
    gitValue(){
       this.dataValue = []
      for(let item of this.textblockData){
        var j = item.Source.slice(0,item.Source.length-3)
        var jc = item.Source.slice(item.Source.length-3,item.Source.length)
        this.dataValue.push({
          width:item.Width,
          height:item.Height,
          rotate:item.RotateAngle,
          top:item.Top,
          left:item.Left,
          opacity:item.Opacity / 100,
          // source:require(`../ViewImage/${this.name}/${j}jpg`),
          source: jc == 'JPG' ? require(`../ViewImage/${this.name}/${j}jpg`) : require(`../ViewImage/${this.name}/${item.Source}`),
          W:Number(item.Width)<Number(item.Height) ? '100%' : '',
          H:Number(item.Height)<Number(item.Width) ? '100%' : ''
        })
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.imgVue{
   display: inline-block;
   position: relative;
   
    img{
      position: absolute;
      top:0;
      left:0;
      right:0;
      bottom: 0;
      max-width:100%;
      max-height:100%;
      margin: auto;
      
    }
}

</style>