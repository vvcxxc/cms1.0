<!--
 * @Description: 报警管理
 * @Date: 2019-11-23 11:54:01
 * @Author: 随风
 * @LastEditors: 随风
 * @LastEditTime: 2019-11-27 14:53:55
 -->
<template>
	<div class="alarm-container" :class="{ blackBlueBg: $store.state.color === 'blackBlue' }">
		<aside class="left-container" :class="{ colordiv: $store.state.color == 'grey' }"
			:style="[{ width: 200 * (width / 1920) + 'px' }]">
			<left-nav @tabComponent="tabComponent"></left-nav>
		</aside>
		<section class="content-container">
			<component :is="componentName"></component>
		</section>
	</div>
</template>

<script>
import LeftNav from '../../components/leftNav/LeftNav.vue';
import CurrentAlarm from '../../components/anotheralarm/CurrentAlarm.vue';
import AlarmPoint from '../../components/anotheralarm/AlarmPoint.vue';
import HistoryAlarm from '../../components/anotheralarm/HistoryAlarm.vue';
import CurrentAlarmB from '../../components/anotheralarm/CurrentAlarmBsystem.vue';
import HistoryAlarmB from '../../components/anotheralarm/HistoryAlarmBsystem.vue';
export default {
	components: {
		LeftNav,
		CurrentAlarm,
		HistoryAlarm,
		AlarmPoint,
		CurrentAlarmB,
		HistoryAlarmB
	},
	data() {
		return {
			componentName: 'CurrentAlarm',
			color: '',
			width: 1920,
			zoom: 1,
			isBSystem: false
		};
	},
	created() {
		this.isBSystem = eval(sessionStorage.getItem('isBSystem'));
		this.componentName = this.isBSystem ? 'CurrentAlarmB' : 'CurrentAlarm'
	},
	mounted() {
		this.width = window.screen.width
		this.zoom = this.width / 1920 < 0.8 ? 0.8 : this.width / 1920
		setTimeout(() => {
			$('.alarm-container').css({
				marginTop: $('.v-toolbar').height() * $('.v-toolbar')[0].style.zoom + 10 + 'px',
			});
			let a = 200 * this.zoom + 'px'
			$('.content-container').css({
				width: `calc(100% - ${a})`
			})
		})
		this.color = this.$store.state.color;
	},
	methods: {
		tabComponent(index) {
			let componentObj = this.isBSystem ?
				{
					0: CurrentAlarmB,
					1: HistoryAlarmB,
				} : {
					0: CurrentAlarm,
					1: HistoryAlarm,
					2: AlarmPoint
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
	width: calc(100% - 189px);
}

.colordiv {
	background-color: #D9DBDE;
}
</style>
