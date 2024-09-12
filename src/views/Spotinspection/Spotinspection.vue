<!--
 * @Description: 报警管理
 * @Date: 2019-11-23 11:54:01
 * @Author: 随风
 * @LastEditors: 随风
 * @LastEditTime: 2019-11-27 14:53:55
 -->
<template>
	<div class="alarm-container" :class="{blackBlueBg: $store.state.color === 'blackBlue'}" ref="alarmContainer">
		 <aside class="left-container"  :class="{colordiv:$store.state.color=='grey'}" :style="[{width:200*(width/1920)+'px'}]">
			<left-nav @tabComponent="tabComponent"></left-nav>
		</aside>
		<section class="content-container" :style="{width: 'calc(100% - ' + 200*zoom + 'px)'}">
			<component :is="componentName"></component>
		</section>
	</div>
</template>

<script>
import LeftNav from '../../components/leftNav/LeftNav.vue';
import Agency from '../../components/Spotinspection/Agency.vue';
import plan from '../../components/Spotinspection/plan.vue';
import standard from '../../components/Spotinspection/standard.vue';
import Record from '../../components/Spotinspection/Record.vue';
export default {
	components: {
		LeftNav,
		Agency,
		plan,
        standard,
        Record
	},
	data() {
		return {
			componentName: 'Agency',
			width: 1920,
			zoom: 1
		};
	},
	created() {},
	mounted(){
		this.width = window.screen.width
		this.zoom = this.width / 1920 < 0.8 ? 0.8 : this.width / 1920
		setTimeout(()=>{
			this.$refs.alarmContainer.style.marginTop = $('.v-toolbar').height() * this.zoom + 10 +'px'
		})
		this.color = this.$store.state.color;
	},
	methods: {
		tabComponent(index) {
			let componentObj = {
				0: Agency,
				1: plan,
                2: standard,
                3: Record
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
