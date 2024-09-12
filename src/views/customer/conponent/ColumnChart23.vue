<!--
 * @Description: 这是柱形图组件页面（组件）
 * @Date: 2019-12-16 13:18:06
 * @Author: Tao
 * @LastEditors: Tao
 * @LastEditTime: 2021-02-25 18:11:10
 -->
<template>
  <div>
    <div v-if="show">
      <div v-for="(item,index) in dataValue" :key="index">
        <dataColumn ref="dataColumn" :item="item" :class="item.class" :drawLineShow="item.drawLineShow" 
        :valueData1="valueData" :data="item.ColumnChartItemList" :AllData="data" :dataId="dataId">
        </dataColumn>
      </div>
    </div>
  </div>
</template>

<script>
import dataColumn from './ColumnChart'
export default {
    name:'columnChart',
    components:{
      dataColumn
    },
  data() {
    return {
        textblockData:[],
        cla:[],
        dataValue:[],
        show:true,
        chartdataArr:[],
        ZIndex:'',
        BarArr23:'',
        valueData:[]
    };
  },
props:['dae','chartdata','contentName','ViewName','dataId','item'],
watch:{
      dae:{
        deep:true,
        handler(val){
          this.data = val;
          if(val){
            this.dataValue = []
             setTimeout(()=>{
              this.init() 
            },1000)
          }
           //图表自适应
            this.$nextTick(()=>{
              if(this.$refs.dataColumn){
                const list = this.$refs.dataColumn
                for(let i=0;i<list.length;i++){
                  this.$refs.dataColumn[i].echartsResize()
                }
              }
          })
               this.data = val;
               if(val){
                 this.dataValue = []
                  setTimeout(()=>{
                   this.init() 
                 },1000)
               }
                //图表自适应
                 this.$nextTick(()=>{
                   if(this.$refs.dataColumn){
                     const list = this.$refs.dataColumn
                     for(let i=0;i<list.length;i++){
                       this.$refs.dataColumn[i].echartsResize()
                     }
                   }
               })
            }
      },
      chartdata:{
        handler(val){
          this.init();
        }
      }
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
        if(this.chartdata.Bar != undefined){
            this.chartdataArr = this.chartdata.Bar
        }
            this.data = this.dae
            this.Name = 'barchart'
            this.textblockData=[]
            this.cla=[]
                //数据筛选
            var dataAll = this.data.Controls.ControlList
             //根据控件名筛选
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
           this.ColumnChartItemList = this.data.Data.BarChartItemList
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
              for(let j=0;j<this.ColumnChartItemList.length;j++){
                //实时渲染相对应的柱形图图表数据
                if(this.ColumnChartItemList[j].name == this.textblockData[i].Name){
                var drawLineShow = false
                // console.log('contentName',this.contentName,this.ViewName)
                if(this.contentName == this.ViewName){
                  if(this.chartdata.Bar != undefined){
                       this.BarArr23 = []
                       this.valueData = []
                       for(var w=0;w<this.chartdata.Bar.length;w++){
                      
                        if(this.ColumnChartItemList[j].name == this.chartdata.Bar[w].name){
                            this.BarArr23 = this.chartdata.Bar[w]
                        }
                        this.valueData.push(this.chartdata.Bar[w])
                       }
                  }else{
                    if(this.chartdata.length != undefined){
                       this.BarArr23 = []
                       this.valueData = []
                      for(var w1=0;w1<this.chartdata.length;w1++){
                       
                         if(this.ColumnChartItemList[j].name == this.chartdata[w1].name){
                             this.BarArr23 = this.chartdata[w1]
                         }
                         this.valueData.push(this.chartdata[w1])
                        }
                    }
                  }
                }else{
                  drawLineShow = true
                }
                //图表样式
                          var value = {
                              width : this.textblockData[i].PropertyList.Width,
                              height : this.textblockData[i].PropertyList.Height,
                              rotate : this.textblockData[i].PropertyList.RotateAngle,
                              top : this.textblockData[i].PropertyList.Top,
                              left : this.textblockData[i].PropertyList.Left,
                              opacity : this.textblockData[i].PropertyList.Opacity / 100,
                              class:this.textblockData[i].Name,
                              ColumnChartItemList:this.ColumnChartItemList[j],
                              valueData:this.BarArr23,
                              drawLineShow:drawLineShow,
                              ZIndex:this.ZIndex
                          }
                        this.dataValue.push(value)
                    }
                }
            }
        },
    },
}
</script>
<style lang="scss" scoped>
div{
    display: inline-block;
}
</style>