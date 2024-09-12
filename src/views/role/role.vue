<!--
 * @Description: 角色管理
 * @Date: 2019-11-26 10:13:21
 * @Author: 随风
 * @LastEditors: 随风
 * @LastEditTime: 2019-11-27 14:17:12
 -->
<template>
	<div class="alarm-container">
		<!-- <aside class="left-container">
			<left-nav @tabComponent="tabComponent"></left-nav>
		</aside> -->
		<section class="content-container">
			<component :is="componentName"></component>
		</section>
	</div>
</template>

<script>
import LeftNav from '../../components/leftNav/LeftNav.vue';
import Role from '../../components/role/Role.vue';
export default {
	components: {
		LeftNav,
		Role
	},
	data() {
		return {
			componentName: 'Role'
		};
	},
	created() {},
	mounted(){
	setTimeout(()=>{
	let a1 = $('.v-toolbar').height()*$('.v-toolbar')[0].style.zoom+10+$('.v-footer').height()*$('.v-footer')[0].style.zoom+'px'
		let a = $('.left-container').width()+'px'
		$('.content-container').css({
			width:`calc(100% - ${a})`
		})
		})
	},
	methods: {}
};
</script>

<style lang='scss' scoped>
.alarm-container {
	width: 100%;
	// height: 100%;
	height: calc(100% - 130px);
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
	 width: 100%;
	background-color: #fff;
	border: 1px solid #e4e4e4;
	border-left: none;
}
</style>
