<!--
 * @Description: 这是双窗口页面（组件）
 * @Date: 2019-11-27 13:05:15
 * @Author: Tao
 * @LastEditors: Tao
 * @LastEditTime: 2020-09-22 13:35:38
 -->
<template>
<div class="tendenCOnter" :class="{blackBlueBg: $store.state.color === 'blackBlue'}">
<tendencyTwo ref="mychild22" :key='keyone' :ty="1" :ide="ide1" :ShowtextTo="Showtext" :moreWindowTo="moreWindow" :curveIDTo="curveID" :timeShowTo="timeShow" :showTime="show" class="Two_1" :id='qscxcharttwo'></tendencyTwo>
<tendencyTwo ref="mychild23" :key='keytwo' :ty="2" :ide="ide2" :ShowtextTo="Showtext" :curveIDTo="curveID" :timeShowTo="timeShow" :showTime="show" class="Two_2" :id='qscxcharttree'></tendencyTwo>
</div>
</template>

<script>
import tendencyTwo from './tendenConter.vue'

export default {
	name:'tendencytwo',
    props:['show',"curveID","timeShow","moreWindow","Showtext"],
	components:{
      tendencyTwo
	},
	data(){
		return{
			ide1:0,
			ide2:0,
			child2Show:true,
			zoom: 1,
			keyone:1,
			keytwo:2,
			qscxcharttree:'qscxcharttree',
			qscxcharttwo:'qscxcharttwo'
		}
	},
	created(){
            this.init()
	},
	mounted(){
		this.zoom = window.screen.width / 1920 < 0.8 ? 0.8 : window.screen.width / 1920
	  this.zoom = 1
	},
	methods:{
		                                  sx(){
                                        
            let that = this
            setTimeout(()=>{
for(let i=0;i<$('.el-picker-panel').length;i++){
                $('.el-picker-panel')[i].style.zoom = that.zoom1
            }
            for(let i=0;i<$('.el-select-dropdown').length;i++){
                $('.el-select-dropdown')[i].style.zoom = that.zoom1
            }
            })
              
        },
		axiosSet2(){
			this.$refs.mychild22.axiosSet()
			this.$refs.mychild23.axiosSet()
		},
		child2(){
			if(this.child2Show){
				this.child2Show = false
				this.$refs.mychild22.huanyuan()
				this.$refs.mychild23.huanyuan()
			}
		},

		init(){
			if(this.curveID.length==1){
				this.ide1=0
				this.ide2=0
			}else{
				this.ide1=0
				this.ide2=1
			}
		}
	}
}
</script>

<style lang="scss" scoped>
.tendenCOnter{
    width:100%;
	margin: auto;
	overflow: hidden;
    height:100%;
	// min-width: 1280px;
	background-color: #EEEEEE;

	&.blackBlueBg{
		background-color: #081027;

		.Two_1,.Two_2{
			background-color: #081027;
			border-color: #38415A;
		}
	}

		.Two_1{
			display: flex;
			flex-flow: column;
			float: left;
			width:49.5%;
			height:100%;
			margin-right:1%;
            border:1px solid #d5d5d5;
		}
		.Two_2{
			display: flex;
			flex-flow: column;
			float: left;
			width:49.5%;
			height:100%;
            border:1px solid #d5d5d5;
		}
}

</style>