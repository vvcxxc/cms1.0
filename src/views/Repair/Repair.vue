<!--
 * @Description: 报警管理
 * @Date: 2019-11-23 11:54:01
 * @Author: 随风
 * @LastEditors: 随风
 * @LastEditTime: 2019-11-27 14:53:55
 -->
<template>
	<div class="alarm-container">
	 <aside class="left-container"  :class="{colordiv:$store.state.color=='grey'}" :style="[{width:200+'px'}]">
			<left-nav @tabComponent="tabComponent"></left-nav>
		</aside>
		<section class="content-container" ref="content" >
			<component :is="componentName"></component>
		</section>
	</div>
</template>

<script>
import LeftNav from '../../components/leftNav/LeftNav.vue';
import Agency from '../../components/Repair/Agency.vue';
import plan from '../../components/Repair/plan.vue';
import Record from '../../components/Repair/Record.vue';
export default {
	components: {
		LeftNav,
		Agency,
		plan,
        Record
	},
	data() {
		return {
			componentName: 'Agency',
			zoomValue: 0,
            zoom: 1,
		};
	},
	created() {
		
	},
	mounted(){
	},
	methods: {
		tabComponent(index) {
			let componentObj = {
				0: Agency,
				1: plan,
                2: Record
			};
			this.componentName = componentObj[index];
		}
	}
};
</script>

<style lang='scss' scoped>
.alarm-container {
    // width: clac(100% -40px);
    // height: 100%;
    height: 86vh;
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
    width: calc(100% - 220px);
    overflow: auto;
    background-color: #fff;
    border: 1px solid #e4e4e4;
    border-left: none;
    box-sizing: border-box;
}
.colordiv{
 background-color: #D9DBDE;
}
</style>
