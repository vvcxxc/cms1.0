<!--
 * @Description: 这是饼图页面（组件）
 * @Date: 2019-11-12 17:40:04
 * @Author: Tao
 * @LastEditors: Tao
 * @LastEditTime: 2020-12-31 11:09:17
 -->
<template>
  <div>
    <div v-if="show">
      <div v-for="(item,index) in dataValue" :key="index">
          <datadd :item="item" :dataId="dataId" :drawLineShow="item.drawLineShow" 
          :valueData1="valueData" :AllData="data" :data="item.PieChartItemListdata" >
        </datadd>
      </div>
    </div>
  </div>
</template>

<script>
import datadd from './Piecharvue'
  export default {
  name: 'hello',
  components:{
    datadd
  },
  data () {
    return {
      PieChartItemListdata:[],
      textblockData:[],
      cla:[],
      dataValue:[],
      show:true,
      ZIndex:'',
      BarArr:'',
      valueData:[]
    }
  },
  props:['dae','chartdata','contentName','ViewName','dataId'],
  watch:{
      dae:{
        deep:true,
        handler(val){
            this.data = val;
            if(val){
              this.init();
            }
        }
      },
       chartdata:{
        handler(val){
          // console.log("val",val)
          this.init();
        }
      },
    },
    beforeDestroy(){

    },
    mounted(){
       if(this.dae){
        this.init()
      }
    },
  methods: {
    init(){
      this.data = this.dae
      this.Name = 'piechart'
      this.PieChartItemListdata = []
        //数据筛选
      var dataAll = this.data.Controls.ControlList
      this.textblockData = []
      this.cla = []
      for(var i=0;i<dataAll.length;i++){
        if(dataAll[i].ControlType == this.Name){
           this.textblockData.push(dataAll[i])
           this.cla.push(dataAll[i].Name)
        }
      }
      if(this.textblockData.length!=0){
        this.show = true
      }else{
        this.show = false
      }
       this.PieChartItemListdata = this.data.Data.PieChartItemList
         //赋值
         if(this.show){
          if(this.data.Data.PieChartItemList.length != 0){
              this.gitValue()
              this.PieChartData = this.data.Data.PieChartItemList[0].PieEchartAttribute
            }else{
              this.dataValue = []
            }
         }
    },
     //赋值
    gitValue(){
         this.dataValue = []
         for(let i=0;i<this.textblockData.length;i++){
           //加层级zIndex 
          var ZIndexs = this.data.Data.ZIndexs
          if(ZIndexs){
            for(let item in ZIndexs){
              if(this.textblockData[i].Name == item){
                this.ZIndex = ZIndexs[item]
                break
              }
            }
          }else{
              this.ZIndex = ''
          }
  
            for(let j=0;j<this.PieChartItemListdata.length;j++){
             //实时渲染相对应的饼图图表数据
              if(this.PieChartItemListdata[j].name == this.textblockData[i].Name){
                  
                  var drawLineShow = false
                   if(this.contentName == this.ViewName){
                     if(this.chartdata.Pie != undefined){
                          this.BarArr = []
                          this.valueData = []
                          for(var w=0;w<this.chartdata.Pie.length;w++){
                           if(this.PieChartItemListdata[j].name == this.chartdata.Pie[w].name){
                               this.BarArr = this.chartdata.Pie[w]
                           }
                           this.valueData.push(this.chartdata.Pie[w])
                          }
                     }else{
                       if(this.chartdata.length != undefined){
                          this.BarArr = []
                          this.valueData = []
                         for(var w1=0;w1<this.chartdata.length;w1++){
                            if(this.PieChartItemListdata[j].name == this.chartdata[w1].name){
                                this.BarArr = this.chartdata[w1]
                            }
                            this.valueData.push(this.chartdata[w1])
                           }
                       }
                     }
                   }else{
                     drawLineShow = true
                   }
                var value = {
                  width: this.textblockData[i].PropertyList.Width,
                  height : this.textblockData[i].PropertyList.Height,
                  rotate : this.textblockData[i].PropertyList.RotateAngle,
                  top : this.textblockData[i].PropertyList.Top,
                  left : this.textblockData[i].PropertyList.Left,
                  opacity : this.textblockData[i].PropertyList.Opacity / 100,
                  class:this.textblockData[i].Name,
                  PieChartItemListdata:this.PieChartItemListdata[j],
                  valueData:this.BarArr,
                  drawLineShow:drawLineShow,
                  ZIndex:this.ZIndex
                }
                this.dataValue.push(value)
                // console.log("this.dataValue",this.dataValue)
              }
            }
         }
           
    },

  }
}

</script>

<style scoped>
div{
  display: inline-block;
}
</style>