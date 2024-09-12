<!--
 * @Description: 分页组件
 * @Date: 2019-11-24 14:57:49
 * @Author: 随风
 * @LastEditors: 随风
 * @LastEditTime: 2019-11-27 15:55:08
 -->
<template>
	<section class="page-container tablepage">
		<div class="left">
			{{lang.DataGrid_Reaction_HT_ATotalOf}}{{ pageData.TotalCount }}{{lang.DataGrid_Reaction_HT_RecordsAndTheCurrent}}{{pageData.PageIndex }}{{lang.DataGrid_Reaction_Page}}
			{{lang.DataGrid_Reaction_HT_ATotalOf}}{{ TotalPage }}{{lang.DataGrid_Reaction_HT_RecordsAnd}}{{ pageData.PageSize }}{{lang.DataGrid_Reaction_HT_PerPage}}
		</div>
		<div class="right">
			<div class="btn" @click="jump('first')">
				{{lang.DataGrid_Reaction_FirstPage}}
			</div>
			<div :class="{nopage:pageData.LastEnabled}" class="btn" @click="jump('prev')">
				{{lang.DataGrid_Reaction_LastPage}}
			</div>
			<div :class="{nopage:pageData.NextEnabled}" class="btn" @click="jump('next')">
				{{lang.DataGrid_Reaction_NextPage}}
			</div>
			<div class="btn" @click="jump('last')">
				{{lang.DataGrid_Reaction_EndPage}}
			</div>
			<div class="input">
				{{lang.DataGrid_Reaction_The}}
				<el-input class="pages" v-model="targetPage"></el-input>
				{{lang.DataGrid_Reaction_Page}}
			</div>
			<div class="btn" @click="jump('jump')">
				{{lang.DataGrid_Reaction_TurnPage}}
			</div>
		</div>
	</section>
</template>

<script>
export default {
	props: ['pageData'],
	data() {
		return {
			targetPage: 1,
			lang: JSON.parse(localStorage.getItem('languages'))[localStorage.getItem('currentLang')]
		};
	},
	watch: {
		pageData: {
			handler: function(data) {
				this.targetPage = data.PageIndex
			},
			deep: true
		}
	},
	created() {
		this.targetPage = this.pageData.PageIndex;
	},
	computed:{
		TotalPage(){
			let num = 0
			if(this.pageData.TotalCount <= 0){
				num = 0
			}else{
				num = Math.ceil(Number(this.pageData.TotalCount)/Number(this.pageData.PageSize))
			}
			return num
		}

	},
	methods: {
		jump(flag) {
			if (flag === 'first') {//首页
				if (this.targetPage == 1) {
					return;
				}
				this.targetPage = 1;
				this.$emit('changePage', this.targetPage,'first');
				return;
			}
			if (flag === 'last') {//末页
				if (this.targetPage == this.TotalPage||this.TotalPage==0) {
					return;
				}
				this.targetPage = this.TotalPage;
				this.$emit('changePage', this.targetPage,'last');
				return;
			}
			if (flag === 'prev') {//上一页
				if (this.targetPage == 1) {
					return;
				}
				this.targetPage--;
				this.$emit('changePage', this.targetPage,'prev');
				return;
			}
			if (flag === 'next') {//下一页
				if (
					this.targetPage == this.TotalPage ||
					this.TotalPage == 0
				) {
					return;
				}
				this.targetPage++;
				this.$emit('changePage', this.targetPage,'next');
				return;
			}
			this.handlePage();
			if (this.targetPage == this.pageData.PageIndex) {
				return;
			}
			this.$emit('changePage', this.targetPage,'specified');//指定页面
		},
		handlePage() {
			if (
				this.targetPage === '' ||
				!/^\d+$/.test(this.targetPage) ||
				this.targetPage == 0
			) {
				this.targetPage = this.pageData.PageIndex;
				return;
			}
			if (this.targetPage > this.TotalPage) {
				if (this.TotalPage == 0) {
					this.targetPage = 1;
					return;
				}
				this.targetPage = this.TotalPage;
			}
		}
	}
};
</script>

<style lang='scss' scoped>
%flex {
	display: flex;
	align-items: center;
}
.page-container {
	font-size: 14px;
	// margin-top:10px;
    width:100%;
	@extend %flex;
	justify-content: space-between;
	color: #888;
	box-sizing: border-box;
}
.left {
	margin-left: 10px;
}
.right {
	@extend %flex;
	.input {
		@extend %flex;
		margin: 0 10px;
	}
	.btn {
		@extend %flex;
		justify-content: center;
		width: 67px;
		height: 23px;
		border-radius: 4px;
		border: solid 1px #fda100;
		color: #fda100;
		margin-right: 10px;
		cursor: pointer;
	}
}
 .nopage {
        border: 1px solid #fed286 !important;
        color: #fed286 !important;
    }
		.pages {
			margin: 0 5px;
		}
</style>
