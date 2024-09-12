<template>
  <div>
    <div v-if="show">
      <div  v-for="(item,index) in dataValue" :key="index">
        <PloylineColumn ref="PloylineColumn" :drawLineShow="item.drawLineShow" :valueData1="valueData" 
          :class="item.class" :data="item.PolylineColumnChartItemList" :dataId="dataId" :item="item" :AllData="data">
        </PloylineColumn>
      </div>
    </div>
  </div>
</template>

<script>
import PloylineColumn from './PolyLineColumnChart'
export default {
  name:'PolylineColumnChart',
  components:{
     PloylineColumn
  },
  data() {
    return {
        show:true,
        textblockData:[],
        cla:[],
        dataValue:[],
        ZIndex:'',
        BarArr24:'',
        valueData:[]
    };
  },
   props:['dae','chartdata','contentName','ViewName','dataId'],
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
                 if(this.$refs.PloylineColumn){
                   const list = this.$refs.PloylineColumn
                   for(let i=0;i<list.length;i++){
                     this.$refs.PloylineColumn[i].echartsResize()
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
      this.data =this.dae
      this.Name = 'linebarchart'
      this.textblockData = []
      this.cla = []
        //数据筛选
      var dataAll = this.data.Controls.ControlList
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
         this.PolylineColumnChartItemList = this.data.Data.LineBarChartItemList
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

        for(let j=0;j<this.PolylineColumnChartItemList.length;j++){
          if(this.PolylineColumnChartItemList[j].name == this.textblockData[i].Name){
             //实时渲染相对应的仪表盘图表数据
            var drawLineShow = false
             if(this.contentName == this.ViewName){
               if(this.chartdata.LineBar != undefined){
               
                      this.BarArr24 = []
                      this.valueData = []
                     for(var w=0;w<this.chartdata.LineBar.length;w++){
                       if(this.PolylineColumnChartItemList[j].name == this.chartdata.LineBar[w].name){
                         this.BarArr24 = this.chartdata.LineBar[w]
                       }
                       this.valueData.push(this.chartdata.LineBar[w])
                     }
               }
               else{
               
                   if(this.chartdata.length != undefined){

                        this.BarArr24 = []
                        this.valueData = []
                        for(var w1=0;w1<this.chartdata.length;w1++){
                          
                           if(this.PolylineColumnChartItemList[j].name == this.chartdata[w1].name){
                               this.BarArr24 = this.chartdata[w1]
                           }
                            this.valueData.push(this.chartdata[w1])
                           }
                   }
               }
             }else{
               drawLineShow =true
             }

            var value = {
              width: this.textblockData[i].PropertyList.Width,
              height: this.textblockData[i].PropertyList.Height,
              rotate: this.textblockData[i].PropertyList.RotateAngle,
              top: this.textblockData[i].PropertyList.Top,
              left :this.textblockData[i].PropertyList.Left,
              opacity: this.textblockData[i].PropertyList.Opacity / 100,
              class:this.textblockData[i].Name,
              PolylineColumnChartItemList:this.PolylineColumnChartItemList[j],
              drawLineShow:drawLineShow,
              // valueData:[],
              ZIndex:this.ZIndex
            }
          
              this.dataValue.push(value)
           
          }
        }
      
      }
    },

  }
};
</script>

<style scoped>
div{
  display: inline-block;
}
</style>