
<!-- 生产管理 -->
<template>
	<div class="alarm-container">
        <aside class="left-container" :class="{colordiv:$store.state.color=='grey'}">
            <left-nav @tabComponent="tabComponent"></left-nav>
        </aside>
        <section class="content-container">
            <component :is="componentName"></component>
        </section>
	</div>
</template>

<script>
import LeftNav from '../../components/leftNav/LeftNav.vue';
import Plan from './components/plan.vue';
import History from './components/history.vue';
import Record from './components/record.vue';
export default {
	components: {
		LeftNav,
		Plan,
		History,
		Record
	},
	data() {
		return {
			componentName: 'Plan',
			color:'',
			zoom: 1
		};
	},
	created() {},
	mounted(){
		this.color = this.$store.state.color;
	},
	methods: {
		tabComponent(index) {
			let componentObj = {
				0: Plan,
				1: History,
				2: Record
			};
			this.componentName = componentObj[index];
		}
	}
};
</script>

<style lang='scss' scoped>
.alarm-container {
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
	width: 200px;
	height: 100%;
	background-color: #e9eeef;
	box-sizing: border-box;
}
.content-container {
	flex: 1;
	background-color: #fff;
	border: 1px solid #e4e4e4;
	border-left: none;
		width: calc(100% - 189px);
}
.colordiv{
    background-color: #D9DBDE;
}
</style>
