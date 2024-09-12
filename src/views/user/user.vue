<!--
 * @Description: 用户管理
 * @Date: 2019-11-26 10:13:02
 * @Author: 随风
 * @LastEditors: 随风
 * @LastEditTime: 2019-11-27 14:47:42
 -->
<template>
	<div class="alarm-container">
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