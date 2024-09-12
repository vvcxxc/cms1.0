<!--
 * @Description: 这是多窗口页面（组件）
 * @Date: 2019-11-27 14:39:57
 * @Author: Tao
 * @LastEditors: Tao
 * @LastEditTime: 2020-09-22 13:11:22
   TODO:主要是用来做历史记录的
 -->
<template>
<div class="tendenCOnter">
<tendencyTwo ref="mychild32"  :ide="ide1" :ShowtextTo="Showtext1" :curveIDTo="curveID1" :timeShowTo="timeShow1" :showTime="show1" class="Two_1" :id='qscxchart1'></tendencyTwo>
<tendencyTwo ref="mychild4"  :ide="ide2" :ShowtextTo="Showtext1" :curveIDTo="curveID1" :timeShowTo="timeShow1" :showTime="show1" class="Two_2" :id='qscxchart2'></tendencyTwo>
<tendencyTwo ref="mychild5"  :ide="ide3" :ShowtextTo="Showtext1" :curveIDTo="curveID1" :timeShowTo="timeShow1" :showTime="show1" class="Two_3" :id='qscxchart3'></tendencyTwo>
<tendencyTwo ref="mychild6"  :ide="ide4" :ShowtextTo="Showtext1" :curveIDTo="curveID1" :timeShowTo="timeShow1" :showTime="show1" class="Two_4" :id='qscxchart4'></tendencyTwo>
</div>
</template>

<script>
import tendencyTwo from './tendenConter3.vue'

export default {
	name:'tendencytwo',
  props:['show1',"curveID1","timeShow1","Showtext1"],
	components:{
   tendencyTwo
	},
	data(){
		return{
			qscxchart1:"qscxchart1",
			qscxchart2:"qscxchart2",
			qscxchart3:'qscxchart3',
			qscxchart4:'qscxchart4',
			ide1:0,
			ide2:0,
			ide3:0,
			ide4:0,
			child2Show:true,
			zoom:1,
		}
	},
	mounted(){
        let a = 30*this.zoom+'px'
		$('.Two_1').css({
			height:`calc(50% - ${a})`
		})
			$('.Two_2').css({
			height:`calc(50% - ${a})`
		})
			$('.Two_3').css({
			height:`calc(50% - ${a})`
		})
			$('.Two_4').css({
			height:`calc(50% - ${a})`
		})
	},
watch:{
	curveID1(){
		if(this.curveID1.length==3){
			this.ide1=0
			this.ide2=1
			this.ide3=2
			this.ide4=0
		}else if(this.curveID1.length==1){
			this.ide1=0
			this.ide2=0
			this.ide3=0
			this.ide4=0
		}else if(this.curveID1.length==2){
			this.ide1=0
			this.ide2=1
			this.ide3=0
			this.ide4=0
		}else if(this.curveID1.length==4){
			this.ide1=0
			this.ide2=1
			this.ide3=2
			this.ide4=3
		}else{
			this.ide1=0
			this.ide2=1
			this.ide3=2
			this.ide4=3
		}

	}

},
  created(){
	this.init()  
  },
	methods:{
		child2(){
			if(this.child2Show){
				this.child2Show = false
					this.$refs.mychild32.huanyuan()
					this.$refs.mychild4.huanyuan()
					this.$refs.mychild5.huanyuan()
					this.$refs.mychild6.huanyuan()
			}
		},
		axiosSet2(){
			this.$refs.mychild32.axiosSet()
			this.$refs.mychild4.axiosSet()
			this.$refs.mychild5.axiosSet()
			this.$refs.mychild6.axiosSet()
		},

	init(){
		if(this.curveID1.length==3){
			this.ide1=0
			this.ide2=1
			this.ide3=2
			this.ide4=0
		}else if(this.curveID1.length==1){
			this.ide1=0
			this.ide2=0
			this.ide3=0
			this.ide4=0
		}else if(this.curveID1.length==2){
			this.ide1=0
			this.ide2=1
			this.ide3=0
			this.ide4=0
		}else if(this.curveID1.length==4){
			this.ide1=0
			this.ide2=1
			this.ide3=2
			this.ide4=3
		}else{
			this.ide1=0
			this.ide2=1
			this.ide3=2
			this.ide4=3
		}
	}
	}
}
</script>

<style>

</style>

<style lang="scss" scoped>
.tendenCOnter{
    width:100%;
		margin:auto;
    height:100%;
		background-color: #EEEEEE;

		.Two_1{
			float: left;
			width:49.5%;
			height:calc(50% - 70px);
			margin-right:1%;
			border:1px solid #d5d5d5;
			margin-bottom:1%;
		}
		.Two_2{
			float: left;
			width:49.5%;
				height:calc(50% - 70px);
			border:1px solid #d5d5d5;
			margin-bottom:1%;
		}
		.Two_3{
			float: left;
			width:49.5%;
				height:calc(50% - 70px);
			border:1px solid #d5d5d5;
			margin-right:1%;
		}
		.Two_4{
			float: left;
			width:49.5%;
			height:calc(50% - 70px);
			border:1px solid #d5d5d5;
		}
}

</style>