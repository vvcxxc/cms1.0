<!--
 * @Description: 分页组件
 * @Date: 2019-11-24 14:57:49
 * @Author: 随风
 * @LastEditors: 随风
 * @LastEditTime: 2019-11-27 15:55:08
 -->
<template>
	<section class="page-container">
		<div class="left">
			{{lang.DataGrid_Reaction_HT_ATotalOf}}{{ pageData.TotalCount }}{{lang.DataGrid_Reaction_HT_RecordsAndTheCurrent}}{{ pageData.PageIndex }}{{lang.DataGrid_Reaction_Page}}
			{{lang.DataGrid_Reaction_HT_ATotalOf}}{{ pageData.TotalPage }}{{lang.DataGrid_Reaction_HT_RecordsAnd}}{{ pageData.PageSize }}{{lang.DataGrid_Reaction_HT_PerPage}}
		</div>
		<div class="right">
			<div class="btn" @click="jump('first')">
				{{lang.DataGrid_Reaction_FirstPage}}
			</div>
			<div class="btn" @click="jump('prev')">
				{{lang.DataGrid_Reaction_LastPage}}
			</div>
			<div class="btn" @click="jump('next')">
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
	created() {
		this.targetPage = this.pageData.PageIndex;
	},
	methods: {
		jump(flag) {
			if (flag === 'first') {
				if (this.targetPage == 1) {
					return;
				}
				this.targetPage = 1;
				this.$emit('req', this.targetPage,flag);
				return;
			}
			if (flag === 'last') {
				console.log(this.targetPage)
				if (this.targetPage == this.pageData.TotalPage) {
					return;
				}
				this.targetPage = this.pageData.TotalPage;
				this.$emit('req', this.targetPage,flag);
				return;
			}
			if (flag === 'prev') {
				console.log(this.targetPage)
				if (this.targetPage == 1) {
					return;
				}
				this.targetPage = --this.pageData.PageIndex;
				this.$emit('req', this.targetPage,flag);
				return;
			}
			if (flag === 'next') {
				if (
					this.targetPage == this.pageData.TotalPage ||
					this.pageData.TotalPage == 0
				) {
					return;
				}
							this.targetPage = ++this.pageData.PageIndex;

				this.$emit('req', this.targetPage,flag);
				return;
			}
			// this.handlePage();
			// if (this.targetPage == this.pageData.PageIndex) {
			// 	return;
			// }
			this.$emit('req', this.targetPage,flag);
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
			if (this.targetPage > this.pageData.TotalPage) {
				if (this.pageData.TotalPage == 0) {
					this.targetPage = 1;
					return;
				}
				this.targetPage = this.pageData.TotalPage;
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
		width: 80px;
		height: 28px;
		background-color: #fff;
		border-radius: 4px;
		border: solid 1px #fda100;
		color: #fda100;
		margin-right: 10px;
		cursor: pointer;
	}
}
</style>
