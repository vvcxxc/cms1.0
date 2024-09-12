<!--
 * @Description: 日志
 * @Date: 2019-11-25 19:37:10
 * @Author: 随风
 * @LastEditors: 随风
 * @LastEditTime: 2019-11-27 21:27:47
 -->
<template>
	<div class="alarm-container" ref="alarmContainer">
		<aside class="left-container"  :class="{colordiv:$store.state.color=='grey'}">
			<left-nav @tabComponent="tabComponent"></left-nav>
		</aside>
		<section class="content-container">
			<keep-alive><component :is="componentName"></component></keep-alive>
		</section>
	</div>
</template>

<script>
import LeftNav from '../../components/leftNav/LeftNav.vue';
import LoginLog from '../../components/log/LoginLog.vue';
import OperationLog from '../../components/log/OperationLog.vue';
export default {
	components: {
		LeftNav,
		LoginLog,
		OperationLog
	},
	data() {
		return {
			componentName: 'LoginLog',
			width:1920,
			zoom: 1,
		};
	},
	// mounted(){
    //  let a = $('.left-container').width()+'px';
	//  $('.alarm-container').css({

	//  })
	// //  $('.alarm-container').css({
    // //     marginTop:$('.v-toolbar').height()*$('.v-toolbar')[0].style.zoom+10+'px'
    // //   })
	// },
	mounted(){
		this.width = window.screen.width
		setTimeout(()=>{
		let a = 200+'px'
		$('.content-container').css({
				width:`calc(100% - ${a})`
		})
		})
	
	},
	created() {
		
	},
	methods: {
		tabComponent(index) {
			let componentObj = {
				0: LoginLog,
				1: OperationLog
			};
			this.componentName = componentObj[index];
		}
	}
};
</script>

<style lang='scss' scoped>
.left-container{
	min-width: 120px;
}
.alarm-container {
	height: calc(100% - 110px);
	color: #000;
	margin-top: 100px;
	display: flex;
	background-color: #eee;
	padding: 20px 10px;
	box-sizing: border-box;
}
aside {
	// width: 20%;
	width: 200px;
	height: 100%;
	background-color: #e9eeef;
	box-sizing: border-box;
	// border: 1px solid #e4e4e4;
}
.content-container {
	// flex: 1;
	// width: 80%;
	// width: calc(100% - 200px);
	background-color: #fff;
	border: 1px solid #e4e4e4;
	border-left: none;
	width: 100%;
}
.colordiv {
    background-color: #d9dbde !important;
}
</style>

