<!--
 * @Description: 这是折线图页面（组件）
 * @Date: 2019-12-16 10:43:29
 * @Author: Tao
 * @LastEditors: Tao
 * @LastEditTime: 2020-12-31 11:03:11
 -->
<template>
 <div>
 <div v-if="show">
     <div v-for="(item,index) in dataValue" :key="index">
        <dataLineChart ref="dataLineChart" :item="item" :drawLineShow="item.drawLineShow" :dataId="dataId" :AllData="data"
        :valueData1="valueData" :data="item.LineChartItemList" :class="item.class" ></dataLineChart>
</div>
</div>
</div>
</template>

<script>
import dataLineChart from './LineChart'

export default {
    name:'LineChart',
    components:{
       dataLineChart
    },
    data() {
        return {
            lineData: [],
            serieArr: [],
            legendData: [],
            textblockData:[],
            cla:[],
            dataValue:[],
            show:true,
            ZIndex:'',
            BarArr22:'',
            valueData:[]
        };
    },
    props:['dae','chartdata','contentName','ViewName','dataId'],
     watch:{
      dae:{
        deep:true,
        handler(val){
         
             this.data = val;
             console.log("vvvv",val)
             if(val){
               this.dataValue = []
                setTimeout(()=>{
                 this.init() 
               },1000)
             }
               //图表自适应
               this.$nextTick(()=>{
                 if(this.$refs.dataLineChart){
                   const list = this.$refs.dataLineChart
                   for(let i=0;i<list.length;i++){
                     this.$refs.dataLineChart[i].echartsResize()
                   }
                 }
             })
        }
      },
       chartdata:{
        handler(val){
        console.log("chartdata",val)
          this.init();
        }
      },
    },
    destroyed(){
    },
    mounted(){
       if(this.dae){
        this.init()     
      }
    },
    methods: {
        init(){
         
         this.data = this.dae
        this.Name = 'linechart';
              //数据筛选
        var dataAll = this.data.Controls.ControlList;
        this.textblockData = []
        this.cla = []
        for (var i = 0; i < dataAll.length; i++) {
            if (dataAll[i].ControlType == this.Name) {
                this.textblockData.push(dataAll[i])
                this.cla.push(dataAll[i].Name)
            }
        }

        if(this.textblockData.length!=0){
            this.show = true
        }else{
            this.show = false
        }
       this.LineChartItemList = this.data.Data.LineChartItemList
        // console.log('vvvv',JSON.parse(this.LineChartItemList[1]))
        //赋值
          if(this.show){
            this.gitValue()
          }
        },
        //赋值
        gitValue() {
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

                for(let j=0;j<this.LineChartItemList.length;j++){
                   //实时渲染相对应的仪表盘图表数据
                   if(this.LineChartItemList[j].name == this.textblockData[i].Name){
                      var drawLineShow = false
                 console.log('788',this.contentName ,'--',this.ViewName);
                      if(this.contentName == this.ViewName){
                                
                     
                        if(this.chartdata.Line != undefined){
                            this.BarArr22 = []
                            this.valueData = []
                            for(var w=0;w<this.chartdata.Line.length;w++){
                              if(this.LineChartItemList[j].name == this.chartdata.Line[w].name){
                                  this.BarArr22 = this.chartdata.Line[w]
                              }
                               this.valueData.push(this.chartdata.Line[w])
                            }
                        }else{
                          if(this.chartdata.length != undefined){
                              this.BarArr22 = []
                               this.valueData = []
                            for(var w1=0;w1<this.chartdata.length;w1++){
                                if(this.LineChartItemList[j].name == this.chartdata[w1].name){
                                    this.BarArr22 = this.chartdata[w1]
                                }
                                 this.valueData.push(this.chartdata[w1])
                              }
                          }
                        }
                      }else{
                        drawLineShow = true
                      }
                    
                      var value = {
                        width : this.textblockData[i].PropertyList.Width,
                        height : this.textblockData[i].PropertyList.Height,
                        rotate : this.textblockData[i].PropertyList.RotateAngle,
                        class:this.textblockData[i].Name,
                        top : this.textblockData[i].PropertyList.Top,
                        left : this.textblockData[i].PropertyList.Left,
                        opacity : this.textblockData[i].PropertyList.Opacity / 100,
                        LineChartItemList:this.LineChartItemList[j],
                        drawLineShow:drawLineShow,
                        ZIndex:this.ZIndex
                      }
                        this.dataValue.push(value)
                   }
                }
                  //  console.log(" this.dataValue", this.dataValue)
                  //  console.log("this.valueData",this.valueData)
              }
        },
    }
};
</script>

<style scoped>
div {
    display: inline-block;
}
</style>