<!--
 * @Description: 报警管理
 * @Date: 2019-11-23 11:54:01
 * @Author: 随风
 * @LastEditors: 随风
 * @LastEditTime: 2019-11-27 14:53:55
 -->
<template>
	<div class="warehousingManagement">
		<div class="warehousingManagement-content">
			<div class="left-container">
				<div class="nav" :class="{ active: activeIndex == index }" v-for="(item, index) in leftList"
					:key="item.Id" @click="tabActive(index)">
					<div class="border"></div>
					{{ item.Type }}
				</div>
			</div>
			<div class="right-container">
				<my-search :searchList="searchList" :searchData="searchData" @setParams="setParams" ref="time"
					@xdEditProduct="xdEditProduct" @xdDelProduct="xdDelProduct"></my-search>
				<div class="myTable">
					<el-table :data="tableData" height="100%" border ref="multipleTable" highlight-current-row stripe
						tooltip-effect="dark" style="width: 100%" :header-cell-style="{
							background: '#5a6c98',
							color: '#fff',
							'border-left': '1px solid #cccccc',
							height: '50px',
							'font-size': '14px',
							padding: '0'
						}" @current-change="handlexdCurrentChange" @select="selectFn" @select-all="selectFn">
						<el-table-column type="selection" width="80" :show-overflow-tooltip="true"></el-table-column>
						<el-table-column type="index" label="序号" width="80"
							:show-overflow-tooltip="true"></el-table-column>
						<el-table-column prop="SEQ" label="车身号（SEQ）" :show-overflow-tooltip="true"></el-table-column>
						<el-table-column prop="ProcessBarcode" label="过程条码"
							:show-overflow-tooltip="true"></el-table-column>
						<el-table-column prop="CarNo" label="绑定小车" :show-overflow-tooltip="true"></el-table-column>
						<el-table-column prop="StatusDisplayName" label="产品状态"
							:show-overflow-tooltip="true"></el-table-column>
						<el-table-column prop="LastModificationTime" label="记录时间"
							:show-overflow-tooltip="true"></el-table-column>
					</el-table>
				</div>
				<my-page :pageData="pageData" @req="req"></my-page>
			</div>
		</div>
		<tip-pop v-if="isTipShow" :tipText="tipText" :noCancel="noCancel" @tipCallBack="tipCallBack"></tip-pop>
		<wmEdit v-if="isxdEditShow" :title="xdTitle" :data="xdSelectRow" @xdEditPopCallBack="xdEditPopCallBack" />
	</div>
</template>

<script>
import MySearch from '../../components/public/search15.vue';
import MyPage from '../../components/public/Pages.vue';
import TipPop from '../../components/public/tipPop.vue';
import wmEdit from './wmEdit.vue';
export default {
	components: {
		MySearch,
		MyPage,
		TipPop,
		wmEdit
	},
	data() {
		return {
			isTipShow: false,
			tipText: '',
			noCancel: true,
			activeIndex: 0,
			leftList: [],
			searchData: {
				startTime: '',
				endTime: '',
				status: '',
				argKeyword: '',
			},
			pageData: {
				PageSize: 50,
				TotalCount: 0,
				TotalPage: 0,
				PageIndex: 1,
				LastEnabled: false,
				NextEnabled: false,
			},
			tableData: [],
			selection: [],
			searchList: [
				{
					title: '查询时间范围：',
					model: 'startTime',
					type: 'time'
				},
				{
					title: '-  ',
					model: 'endTime',
					type: 'time'
				},
				{
					title: '产品状态：',
					model: 'status',
					type: 'select',
					optionList: [],
					value: 'Value',
					label: 'Text'
				},
				{
					model: 'argKeyword',
					type: 'key'
				}
			],
			isxdEditShow: false,
			xdTitle: '新建',
			xdSelectRow: null,
			btnDisable: false,
			buttonarr: [],
			jurisdiction: [],
			scid: '',
			xgid: '',
			scshow: true,
			xgshow: true,

		};
	},

	mounted() {
		let startTime = this.$getDate(
			new Date(new Date().toLocaleDateString()).getTime()
		);
		let endTime = this.$getDate(
			new Date(new Date().toLocaleDateString()).getTime() +
			24 * 60 * 60 * 1000 -
			1
		);
		Object.assign(this.searchData, {
			startTime,
			endTime,
		});
		this.$axios({
			method: 'get',
			url: '/api/Option/GetProductStatus',
		}).then((res) => {
			if (res.data.code == 0) {
				let temp = res.data.data
				temp.unshift({
					Value: '',
					Text: '全部'
				});
				this.searchList[2].optionList = temp;
			} else {
				this.isTipShow = true;
				this.tipText = res.data.msg;
				this.noCancel = true;
			}
		});
		this.$axios({
			method: 'get',
			url: '/api/Product/GetAllList',
		}).then((res) => {
			if (res.data.code == 0) {
				this.leftList = res.data.data;
				this.activeIndex = 0;
				this.req(1)
			} else {
				this.isTipShow = true;
				this.tipText = res.data.msg;
				this.noCancel = true;
			}
		});
		this.btnPowerData();
	},
	watch: {
		VpowerData(val) {
			this.btnPowerData();
		}
	},
	computed: {
		VpowerData() {
			return this.$store.state.btnPowerData;
		},
	},
	methods: {
		btnPowerData() {
			this.jurisdiction = this.$store.state.btnPowerData
			this.buttonarr = this.findPathByLeafId(this.GetUrlParam('id'), this.jurisdiction)[0].Children
			console.log('this.buttonarr', this.buttonarr);
			this.buttonarr.forEach((item) => {
				if (item.RightName == "修改") {
					this.xgid = item.RightID
				} else if (item.RightName == "删除") {
					this.scid = item.RightID
				}
			})
			var userid = ''
			if (!JSON.parse(sessionStorage.getItem('userInfo1'))) {
				userid = JSON.parse(
					sessionStorage.getItem('sightseerInfo1')
				).SCMSUserID;
			} else {
				userid = JSON.parse(
					sessionStorage.getItem('userInfo1')
				).SCMSUserID;
			}

			this.$axios({
				method: 'post',
				url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.xgid}`
			})
				.then(res => {
					this.xgshow = res.data.data;
				})
			this.$axios({
				method: 'post',
				url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.scid}`
			})
				.then(res => {
					this.scshow = res.data.data;
				})
		},
		findPathByLeafId(id, node, path) {
			if (!path) {
				path = [];
			}
			for (let i = 0; i < node.length; i++) {
				var temPath = path.concat();

				if (id == node[i].RightID) {
					temPath.push(node[i]);
					return temPath;
				}
				if (node[i].Children) {
					var findResult = this.findPathByLeafId(
						id,
						node[i].Children,
						temPath
					);
					if (findResult) {
						return findResult;
					}
				}
			}
		},
		GetUrlParam(paraName) {
			let url = document.location.toString();
			let arrObj = url.split('?');
			if (arrObj.length > 1) {
				let arrPara = arrObj[1].split('&');
				let arr;
				for (let i = 0; i < arrPara.length; i++) {
					arr = arrPara[i].split('=');
					if (arr && arr[0] == paraName) {
						return arr[1];
					}
				}
				return '';
			} else {
				return '';
			}
		},
		selectFn(selection, row) {
			this.selection = selection;
		},
		handlexdCurrentChange(row) {
			this.xdSelectRow = row;
		},
		xdEditPopCallBack(str, val) {
			if (str === 'yes') {
				this.$axios({
					method: 'put',
					url: `/api/InboundInfo/Update/${val.Id}`,
					data: {
						Status: val.Status
					},
				}).then((res) => {
					this.isTipShow = true;
					this.tipText = res.data.msg;
					this.noCancel = true;
					if (res.data.code == 0) {
						this.tipText = `修改成功`;
						this.isxdEditShow = false;
						this.req(1);
					}
				});
			} else {
				this.isxdEditShow = false;
			}
		},
		tipCallBack(str) {
			if (str == 'yes') {
				if (this.selection.some(_ => _.StatusDisplayName != '待上料')) {
					this.tipText = '只允许删除待上料产品，请检查！';
					this.isTipShow = true;
					this.noCancel = true;
					return;
				}
				this.$axios({
					method: 'delete',
					url: `/api/InboundInfo/DeleteMany`,
					data: this.selection.map(_ => _.Id)
				}).then((res) => {
					this.isTipShow = true;
					this.noCancel = true;
					if (res.data.code == 0) {
						this.tipText = '删除成功';
						this.xdSelectRow = null;
						this.req(1);
					} else {
						this.tipText = res.data.msg;
					}
				});
			} else {
				this.isTipShow = false;
			}
		},
		xdEditProduct() {
			if (!this.xgshow) {
				this.tipText = '该账户没有权限！';
				this.isTipShow = true;
				return;
			}
			if (!this.xdSelectRow) {
				this.isTipShow = true;
				this.tipText = '请选择修改项';
				return;
			}
			this.xdTitle = '修改';
			this.isxdEditShow = true;
		},
		xdDelProduct() {
			if (!this.scshow) {
				this.tipText = '该账户没有权限！';
				this.isTipShow = true;
				return;
			}
			this.type = 'xd';
			this.isTipShow = true;
			this.tipText = '是否确定要删除勾选项？';
			this.noCancel = false;
			if (!this.selection.length) {
				this.noCancel = true;
				this.tipText = '请选择删除项';
			}
		},
		setParams(params) {
			// if (!this.cxshow) {
			// 	this.tipText = '该账户没有权限！';
			// 	this.isTipShow = true;
			// 	return;
			// }
			this.searchData = params;
			this.req(1);
		},
		req(pageIndex, s) {
			if (s == 'jump') {
				if (!this.isPositiveInteger(pageIndex)) {
					this.isTipShow = true;
					this.tipText = this.lang.DataGrid_Reaction_HT_PEAPositiveInteger;

					return;
				} else {
					if (
						pageIndex !== 1 &&
						pageIndex !== this.pageData.TotalPage
					) {
						if (
							pageIndex < 1 ||
							pageIndex > this.pageData.TotalPage
						) {

							this.isTipShow = true;
							this.tipText = this.lang.DataGrid_Reaction_HT_PEThePageNumber;
							return;
						}
					}
				}
			}
			this.$axios
				.get(
					`/api/InboundInfo/GetPagedList?category=${this.leftList[this.activeIndex].Code}&startTime=${this.searchData.startTime}&endTime=${this.searchData.endTime}&status=${this.searchData.status}&filter=${this.searchData.argKeyword}&pageIndex=${pageIndex}&pageSize=${this.pageData.PageSize} `
				)
				.then(res => {

					if (res.data.code == 0) {
						this.tableData = res.data.data.DataList;
						this.pageData = res.data.data.ParameterList;
					} else {
						this.tipText = res.data.msg;
						this.isxdEditShow = false;
					}
				})
				.catch(err => { });
		},
		tabActive(index) {
			this.activeIndex = index;
			this.req(1)
		}
	}
};
</script>

<style lang='scss' scoped>
.warehousingManagement {
	width: 100%;
	height: calc(100% - 130px);
	color: #000;
	margin-top: 100px;
	display: flex;
	background-color: #eee;
	padding: 20px 10px;
	box-sizing: border-box;

	.warehousingManagement-content {
		width: 100%;
		height: 100%;
		display: flex;

		.left-container {
			width: 225px;
			height: 100%;
			box-sizing: border-box;
			min-width: 100px;
			background-color: #E4E4E4;
			border: 1px solid #E4E4E4;
			box-sizing: border-box;

			.nav {
				height: 50px;
				display: flex;
				align-items: center;
				position: relative;
				cursor: pointer;
				padding-left: 15px;
				opacity: 0.5;
				background-color: #F4F7F7;

				&.active {
					background-color: #fff;
					opacity: 1;
					color: #4270e4;
					font-weight: 600;

					.border {
						position: absolute;
						left: -5px;
						width: 5px;
						height: 100%;
						background-color: #4270e4;
					}
				}
			}
		}

		.right-container {
			width: calc(100% - 225px);
			height: 100%;
			box-sizing: border-box;
			min-width: 100px;
			background-color: #fff;

			.myTable {
				width: 100%;
				height: calc(100% - 120px);
			}
		}
	}
}
</style>
