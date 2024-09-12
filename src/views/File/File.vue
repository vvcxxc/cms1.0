<!--
 * @Description: 报警管理
 * @Date: 2019-11-23 11:54:01
 * @Author: 随风
 * @LastEditors: 随风
 * @LastEditTime: 2019-11-27 14:53:55
 -->
<template>
	<div class="alarm-container">
		<aside class="left-container"  :class="{colordiv:$store.state.color=='grey'}" :style="[{width:200*(width/1920)+'px'}]">
			<left-nav @tabComponent="tabComponent"></left-nav>
		</aside>
		<section class="content-container">
		<component :is="componentName"></component>
		</section>
	</div>
</template>

<script>
import LeftNav from '../../components/leftNav/LeftNav.vue';
import Agency from '../../components/File/Agency.vue';
import plan from '../../components/File/plan.vue';
export default {
	components: {
		LeftNav,
		Agency,
		plan,
	},
	data() {
		return {
			componentName: 'Agency',
			width:1920,
			zoom:1,
		};
	},
	mounted(){
		this.width = window.screen.width
		this.zoom = (this.width/1920)>1?1:(this.width/1920)
		setTimeout(()=>{
		$('.alarm-container').css({
        marginTop:$('.v-toolbar').height()*$('.v-toolbar')[0].style.zoom+10+'px'
		});
		let a = 200*(this.width/1920)+'px'
		$('.content-container').css({
				width:`calc(100% - ${a})`
		})
		})
	
	},
	created() {},
	methods: {
		tabComponent(index) {
			let componentObj = {
				0: Agency,
				1: plan,
			};
			this.componentName = componentObj[index];
		}
	}
};
</script>

<style lang='scss' scoped>
.alarm-container {
	// width: 100%;
	// height: 100%;
	// flex: 1;
	height: 86vh;
	overflow: hidden;
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
	flex: 1;
	// width: 80%;
	background-color: #fff;
	border: 1px solid #e4e4e4;
	border-left: none;
}
.colordiv{
 background-color: #D9DBDE;
}
</style>
