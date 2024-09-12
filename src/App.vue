<!--
 * @Description: 这是***页面（组件）
 * @Date: 2019-11-12 15:34:55
 * @Author: Tao
 * @LastEditors: Tao
 * @LastEditTime: 2021-01-18 14:50:53
 -->
<template>
	<div id="app">
		<router-view />
	</div>
</template>
<script>
export default {
	data() {
		return {

		}
	},
	methods:{
        round(v, e) {
			var t = 1;
			for (; e > 0; t *= 10, e--);
			for (; e < 0; t /= 10, e++);
			return Math.round(v * t) / t;
		},
	},
    beforeCreate() {
        let zoom = window.screen.width / 1920 < 0.8 ? 0.8 : window.screen.width / 1920;
        this.$nextTick(()=>{
            document.querySelector('body').setAttribute('style', 'zoom:' + zoom)
        })
    },
	mounted() {
		let that =  this
		// Number.prototype.tocyxFixed = function(length) {
		// 	var s = this + '';
		// 	var len = length || 0;
		// 	var result = s;
		// 	var arr = s.split('.');

		// 	//整数
		// 	if (arr.length < 2) {
		// 		if (len > 0) {
		// 			result += '.';
		// 			for (var i = 1; i <= len; i++) {
		// 				result += '0';
		// 			}
		// 		}
		// 		return result;
		// 	}

		// 	//小数
		// 	var first = arr[0];
		// 	var second = arr[1];

		// 	//小数点位数等于length
		// 	if (second.length == len) {
		// 		return result;
		// 	}

		// 	//小数点位数小于length
		// 	if (second.length < len) {
		// 		for (var k = 1; k <= len - second.length; k++) {
		// 			result += '0';
		// 		}
		// 		return result;
		// 	}

		// 	//小数点位数大于length
		// 	result = that.round(s, length)
		// 	return result;
		// };
		// 	Number.prototype.toFixed = function(n) {
		// 	if (this === null) {
		// 		let str = null;
		// 		return str;
		// 	} else {
		// 		let str = String(this);
		// 		let str1 = String(this);

		// 		if (str.indexOf('.') > -1) {
		// 			let index = str.indexOf('.');
		// 			if (n >= (str.length - index - 1)) {
		// 				str1 = str.substring(0, index + n + 1);

		// 			} else {
		// 				//                    str1 = Number(str).tocyxFixed(n);
		// 				if (Number(str) >= 0) {
		// 					str1 = Number(str).tocyxFixed(n);
		// 				} else {
		// 					let str3 = Math.abs(Number(str))
		// 					str1 = -Number(str3).tocyxFixed(n);

		// 				}
		// 			}

		// 			str1 = Number(str1);
		// 			return str1;
		// 		} else {
		// 			return str;
		// 		}
		// 	}
		// };
	
// 		setTimeout(()=>{
// $('#app').css({
// 			'zoom':window.screen.width/1920
// 		})
// 		},1000)
		// setTimeout(() => {
		// 	$('#app').css({
		// 		'zoom': window.screen.width / 1920
		// 	})
		// }, 1000)
		this.$store.state.color = 'white'
		console.log(this.$store.state.color)

	},
	created() {
		this.$axios({
			method: 'post',
			url: '/api/UserManage/UserManage_GetRightTree',
		}).then(res => {
			this.$store.state.btnPowerData = res.data.data
		}).catch((err) => {
			console.log('err', err)
		})
	}
}
</script>
<style lang="scss">
@import "../src/assets/sass/table.scss";
@import "~../src/assets/sass/tree.scss";
#app {
	height: 100%;
	font-family: "思源黑体 CN";
	overflow: auto;
}
.v-content__wrap {
	overflow: hidden;
	// overflow:auto;
	// padding-bottom:102px;
}
body {
	height: 100%;
	overflow: hidden;
}
</style>
