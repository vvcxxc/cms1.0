<!--
 * @Description: 这是仪表盘组件页面（组件）
 * @Date: 2019-12-16 09:39:03
 * @Author: Tao
 * @LastEditors: Tao
 * @LastEditTime: 2020-12-31 10:58:27
 -->
<template>
  <div>
    <div v-if="show">
      <div v-for="(item,index) in dataValue" :key="index">
        <dataDash :item="item" :type="type" :class="item.class" :drawLineShow="item.drawLineShow" 
        :valueData1="valueData" :data="item.DashBoardChartItemList"  :dataId="dataId" :AllData="data">
        </dataDash>
      </div>
    </div>
  </div>
</template>

<script>

import dataDash from './DashBoardchart'

  export default {
  name: 'hello',
  components:{
   dataDash
  },
  data () {
    return {
      textblockData:[],
      cla:[],
      dataValue:[],
      Value:0,
      show:true,
      timer21:'',
      DashBoardChartItemList:'',
      ZIndex:'',
      BarArr:'',
      valueData:[]
    }
  },
  props:['dae','chartdata','contentName','ViewName','type','dataId'],
  watch:{
      dae:{
        deep:true,
        handler(val){
             clearInterval(this.timer21);
             this.data = val;
             if(val){
               this.init();
             }
        }
      },
       chartdata:{
        handler(val){
          this.init();
        }
      }
    },
    destroyed(){
      clearInterval(this.timer21);
    },
    beforeDestroy(){
      clearInterval(this.timer21);
    },
  mounted(){
     if(this.dae){
      this.init()
    }
  },
  methods: {
    init(){
      this.data = this.dae
      this.Name = 'dashboardchart'
       //数据筛选
      var dataAll = this.data.Controls.ControlList
      this.textblockData = []
      this.cla = []
      for(var i=0;i<dataAll.length;i++){
        //根据控件筛选
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
     this.DashBoardChartItemList = this.data.Data.DashBoardChartItemList
      //赋值
      if(this.show){
        this.gitValue()
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
        for(let j=0;j<this.DashBoardChartItemList.length;j++){
          //实时渲染相对应的仪表盘图表数据
          if(this.DashBoardChartItemList[j].name == this.textblockData[i].Name){
              var drawLineShow = false
            if(this.contentName == this.ViewName){
              if(this.chartdata.Dashboard != undefined){
                        this.BarArr = []
                        this.valueData = []
                        for(var w=0;w<this.chartdata.Dashboard.length;w++){
                          if(this.DashBoardChartItemList[j].name == this.chartdata.Dashboard[w].name){
                              this.BarArr = this.chartdata.Dashboard[w]
                          }
                          this.valueData.push(this.chartdata.Dashboard[w])
                        }
                }else{
                  if(this.chartdata.length != undefined){
                    this.BarArr = []
                    this.valueData = []
                    for(var w1=0;w1<this.chartdata.length;w1++){
                          if(this.DashBoardChartItemList[j].name == this.chartdata[w1].name){
                              this.BarArr = this.chartdata[w1]
                          }
                           this.valueData.push(this.chartdata[w1])
                    }
                  }
                }
            }else{
              drawLineShow = false
            }
              var value = {
                width : this.textblockData[i].PropertyList.Width,
                height : this.textblockData[i].PropertyList.Height,
                rotate : this.textblockData[i].PropertyList.RotateAngle,
                top : this.textblockData[i].PropertyList.Top,
                left : this.textblockData[i].PropertyList.Left,
                opacity : this.textblockData[i].PropertyList.Opacity / 100,
                class:this.textblockData[i].Name,
                DashBoardChartItemList:this.DashBoardChartItemList[j],
                valueData: this.BarArr,
                drawLineShow:drawLineShow,
                ZIndex:this.ZIndex
              }
            this.dataValue.push(value)
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