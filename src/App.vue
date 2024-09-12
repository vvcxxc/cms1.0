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
	data(){
		return{
		
		}
	},
	
	mounted(){
	
// 		setTimeout(()=>{
// $('#app').css({
// 			'zoom':window.screen.width/1920
// 		})
// 		},1000)
		this.$store.state.color = 'blackBlue'
		console.log(this.$store.state.color)
		
	},
	created(){
		 this.$axios({
                  method: 'post',
                  url: '/api/UserManage/UserManage_GetRightTree',
              }).then(res => {
                  this.$store.state.btnPowerData = res.data.data
              }).catch((err)=>{
                  console.log('err',err)
              })
	}
}
</script>
<style lang="scss">
@import '../src/assets/sass/table.scss';
@import '~../src/assets/sass/tree.scss';
#app {
	height: 100%;
	font-family: '思源黑体 CN';
	overflow: auto;
}
.v-content__wrap{
	overflow: hidden;
	// overflow:auto;
	// padding-bottom:102px; 
}
body{
	height: 100%;
	overflow: hidden;
}
</style>
