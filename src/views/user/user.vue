<!--
 * @Description: 用户管理
 * @Date: 2019-11-26 10:13:02
 * @Author: 随风
 * @LastEditors: 随风
 * @LastEditTime: 2019-11-27 14:47:42
 -->
<template>
	<div class="alarm-container" :class="{blackBlueBg: $store.state.color === 'blackBlue'}">
		<section class="content-container">
			<component :is="componentName"></component>
		</section>
	</div>
</template>

<script>
import User from '../../components/user/User.vue';
export default {
	components: {
		User
	},
	data() {
		return {
			componentName: 'User'
		};
	},
	mounted(){
	setTimeout(()=>{
	let a1 = $('.v-toolbar').height()*$('.v-toolbar')[0].style.zoom+10+$('.v-footer').height()*$('.v-footer')[0].style.zoom+'px'
	$('.alarm-container').css({
        marginTop:$('.v-toolbar').height()*$('.v-toolbar')[0].style.zoom+10+'px',
		height:`calc(100% - ${a1})`
		});
		let a = $('.left-container').width()+'px'
		$('.content-container').css({
			width:`calc(100%)`
		})
		})
	},
	created() {},
	methods: {
		tabComponent(index) {
			let componentObj = {
				0: User
			};
			this.componentName = componentObj[index];
		}
	}
};
</script>

<style lang='scss' scoped>
.alarm-container {
	width: 100%;
	// height: 100%;
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