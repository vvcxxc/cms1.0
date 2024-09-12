<!--
 * @Description: 报警管理
 * @Date: 2019-11-23 11:54:01
 * @Author: 随风
 * @LastEditors: 随风
 * @LastEditTime: 2019-11-27 14:53:55
 -->
<template>
	<div class="FormManageNew-container">

		<div class="FormManageNew-flex">
			<div class="FormManageNew-item">
				<div class="item-header">
					<div class="item-title">配方</div>
				</div>

				<div class="item-search">
					<div class="search-left">
						<div class="search-btn" @click="openEditTemplate">模板管理</div>
						<div class="search-btn add" @click="openEditFormua('添加配方')">添加</div>
						<div class="search-btn del" @click="delForm">删除</div>
						<!-- <div class="search-btn add" @click="getData">刷新</div> -->
					</div>
					<div class="search-right">
						<div class="search-btn type" @click="openEditType">型号管理</div>
					</div>
				</div>
				<div class="item-table">
					<el-table ref="formualTable" @row-click="tableRowClick" highlight-current-row
						:cell-style="{ borderColor: '#E4E7ED' }"
						:header-cell-style="{ background: '#5a6c98', color: '#fff' }" :data="dataList1" border
						height="100%">
						<template slot="empty">
							<span>暂无数据</span>
						</template>
						<!-- <el-table-column prop="Device" label="状态" :show-overflow-tooltip="true">
							<template slot-scope="scope">
								<div class="green" v-if="scope.row.IsApp">应用中</div>
								<div v-else>未下发</div>
							</template>
						</el-table-column> -->
						<el-table-column prop="Name" label="配方名称" :show-overflow-tooltip="true"></el-table-column>
						<el-table-column prop="Number" label="配方号" :show-overflow-tooltip="true"></el-table-column>
						<el-table-column prop="ProductTypeCode" label="产品型号"
							:show-overflow-tooltip="true"></el-table-column>
						<el-table-column prop="FormulaDescription" label="配方描述"
							:show-overflow-tooltip="true"></el-table-column>
						<el-table-column prop="Address" label="操作" width="220px">
							<template slot-scope="scope">
								<!-- <div class="table-action" @click="openEditGroup('设备分组', scope.row)">
									<img src="../../assets/images/group.png" alt />
								</div> -->
								<div class="table-action" @click="openEditFormua('修改配方', scope.row)">
									<img src="../../assets/images/icon_pensoil.png" alt />
								</div>
								<div class="table-action" @click="openEditFormua('复制配方', scope.row)">
									<img src="../../assets/images/check.svg" alt />
								</div>
							</template>
						</el-table-column>
					</el-table>
				</div>

			</div>

			<div class="FormManageNew-item">
				<div class="item-header">
					<div class="item-title">配方内容</div>
				</div>

				<div class="item-search">
					<div class="search-left">

						<div class="search-btn log" @click="openLog">监控日志</div>
						<div class="search-btn" @click="refreshFn">刷新实时值</div>
						<div class="search-btn" @click="coverFn">覆盖配方值</div>
						<el-upload action="#" :show-file-list="false" :http-request="uploadFile">
							<div class="search-btn log" @click="checkDrPower">导入</div>
						</el-upload>

						<div class="search-btn log" @click="exportFn">导出</div>
					</div>
					<div class="search-right">
						<div class="search-btn log" @click="saveFn">保存</div>
					</div>
				</div>

				<div class="item-table">
					<el-table @row-click="tableRowClick2" highlight-current-row :cell-style="{ borderColor: '#E4E7ED' }"
						:header-cell-style="{ background: '#5a6c98', color: '#fff' }" :data="rightList" border
						height="100%">
						<template slot="empty">
							<span>暂无数据</span>
						</template>
						<el-table-column type="index" label="序号" width="60px"></el-table-column>
						<el-table-column prop="contentgroup" label="分组" :show-overflow-tooltip="true">
							<template slot-scope="scope">
								<div class="yes2" v-if="scope.row.IsApp">
									<img class="yes2-content" src="../../assets/images/yes2.png" />
									{{ scope.row.ContentGroup }}
								</div>
								<div class="yes2" v-else>
									{{ scope.row.ContentGroup }}
								</div>

							</template>
						</el-table-column>
						<el-table-column prop="ProjectContent" label="配方项目" :show-overflow-tooltip="true"></el-table-column>
						<el-table-column prop="ProjectDescription" label="项目描述"
							:show-overflow-tooltip="true"></el-table-column>
						<el-table-column prop="Value" label="配方值" :show-overflow-tooltip="true">
							<template slot-scope="scope">
								<el-input v-model="scope.row.Value" />
							</template>
						</el-table-column>
						<el-table-column prop="RealValue" label="实时值" :show-overflow-tooltip="true">
							<template slot-scope="scope">
								<div class="green" v-if="scope.row.CompareRes">{{ scope.row.RealValue }}</div>
								<div v-else>{{ scope.row.RealValue }}</div>
							</template>
						</el-table-column>
					</el-table>
				</div>
			</div>
		</div>


		<EditFormua v-if="EditFormuaShow" :title="EditFormuaTitle" :selectItem="EditFormuaRow"
			@callback="EditFormuaCallBack"></EditFormua>
		<EditGroup v-if="EditGroupShow" :title="EditGroupTitle" :selectItem="EditGroupRow"
			@callback="openEditGroupCallBack"></EditGroup>

		<EditType v-if="EditTypeShow" @callback="openEditTypeCallBack">
		</EditType>
		<EditTemplate v-if="EditTemplateShow" @callback="openEditTemplateCallBack"></EditTemplate>
		<Log v-if="logShow" @callback="logCallBack"></Log>
		<tip-pop v-if="isTipShow" :tipText="tipText" :noCancel="noCancel" @tipCallBack="tipCallBack"></tip-pop>

	</div>
</template>

<script>
import EditFormua from './component/EditFormua.vue';
import EditGroup from './component/EditGroup.vue';
import Log from './component/Log.vue';
import EditType from './component/EditType.vue';
import EditTemplate from './component/EditTemplate.vue';
import TipPop from '../../components/public/tipPop.vue';
import XLSX from 'xlsx';
export default {
	components: {
		EditFormua,
		EditGroup,
		EditType,
		EditTemplate,
		TipPop,
		Log,
	},
	data() {
		return {
			lang: JSON.parse(localStorage.getItem('languages'))[localStorage.getItem('currentLang')],
			isTipShow: false,
			tipText: '',
			noCancel: true,
			currentRow: null,
			tableData: [],

			EditFormuaRow: null,
			EditFormuaShow: false,
			EditFormuaTitle: '',

			EditGroupTitle: '',
			EditGroupShow: false,
			EditGroupRow: null,

			EditTypeShow: false,
			EditTemplateShow: false,
			logShow: false,
			curLeft: {},
			curRight: {},
			dataList1: [],
			jurisdiction: [],
			buttonarr: [],

			bjmbid: '',
			bjmbshow: true,
			xjglid: '',
			xjglshow: true,
			bjpfid: '',
			bjpfshow: true,
			scpfid: '',
			scpfshow: true,
			fzpfid: '',
			fzpfshow: true,
			drid: '',
			drshow: true,
			dcid: '',
			dcshow: true,
			fgid: '',
			fgshow: true,
			xgid: '',
			xgshow: true,
			sxsszid: '',
			sxsszshow: true,
			pfxfid: '',
			pfxfshow: true,
			xhszid: '',
			xhszshow: true,
			jkrzid: '',
			jkrzshow: true,
			xfsbzid: '',
			xfsbzshow: true,
		};
	},
	mounted() {
		this.getPower()
		this.getData()
	},
	watch: {
		'$store.state.btnPowerData': {
			//脚本事件
			deep: true,
			handler: function (n, o) {
				this.getPower()
			}
		},
	},
	computed: {
		rightList() {
			if (!this.curLeft || !this.curLeft.TemplateProjects || !this.curLeft.TemplateProjects.length) {
				return []
			}
			return this.curLeft.TemplateProjects
		}
	},
	methods: {
		findPathByLeafId(id, node, path) {
			if (!path) {
				path = []
			}
			for (let i = 0; i < node.length; i++) {
				var temPath = path.concat();

				if (id == node[i].RightID) {
					temPath.push(node[i])
					return temPath
				}
				if (node[i].Children) {
					var findResult = this.findPathByLeafId(id, node[i].Children, temPath)
					if (findResult) {
						return findResult
					}
				}
			}
		},
		GetUrlParam(paraName) {
			let url = document.location.toString();
			let arrObj = url.split("?");
			if (arrObj.length > 1) {
				let arrPara = arrObj[1].split("&");
				let arr;
				for (let i = 0; i < arrPara.length; i++) {
					arr = arrPara[i].split("=");
					if (arr && arr[0] == paraName) {

						return arr[1]
					}
				}
				return ''
			} else {
				return ''
			}
		},
		getPower() {
			this.jurisdiction = this.$store.state.btnPowerData
			this.buttonarr = this.findPathByLeafId(this.GetUrlParam('id'), this.jurisdiction)[0].Children
			console.log('666', this.buttonarr, this.buttonarr.map(_ => _.RightName))
			this.buttonarr.forEach((item) => {
				if (item.RightName == "模板管理按钮") {
					this.bjmbid = item.RightID
				} else if (item.RightName == "添加配方按钮") {
					this.xjglid = item.RightID
				} else if (item.RightName == "编辑配方按钮") {
					this.bjpfid = item.RightID
				} else if (item.RightName == "删除配方按钮") {
					this.scpfid = item.RightID
				} else if (item.RightName == "导入按钮") {
					this.drid = item.RightID
				} else if (item.RightName == "导出按钮") {
					this.dcid = item.RightID
				} else if (item.RightName == "覆盖配方值按钮") {
					this.fgid = item.RightID
				} else if (item.RightName == "保存按钮") {
					this.xgid = item.RightID
				} else if (item.RightName == "复制配方按钮") {
					this.fzpfid = item.RightID
				} else if (item.RightName == "刷新实时值按钮") {
					this.sxsszid = item.RightID
				} else if (item.RightName == "配方下发按钮") {
					this.pfxfid = item.RightID
				} else if (item.RightName == "型号设置按钮") {
					this.xhszid = item.RightID
				} else if (item.RightName == "监控日志按钮") {
					this.jkrzid = item.RightID
				} else if (item.RightName == "下发设备组设置") {
					this.xfsbzid = item.RightID
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
				url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.bjmbid}`,
			}).then(res => {
				this.bjmbshow = res.data.data

			}).catch((err) => {
				console.log('err', err)
			})

			this.$axios({
				method: 'post',
				url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.xjglid}`,
			}).then(res => {
				this.xjglshow = res.data.data

			}).catch((err) => {
				console.log('err', err)
			})

			this.$axios({
				method: 'post',
				url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.bjpfid}`,
			}).then(res => {
				this.bjpfshow = res.data.data

			}).catch((err) => {
				console.log('err', err)
			})
			this.$axios({
				method: 'post',
				url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.scpfid}`,
			}).then(res => {
				this.scpfshow = res.data.data

			}).catch((err) => {
				console.log('err', err)
			})
			this.$axios({
				method: 'post',
				url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.fzpfid}`,
			}).then(res => {
				this.fzpfshow = res.data.data

			}).catch((err) => {
				console.log('err', err)
			})
			this.$axios({
				method: 'post',
				url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.drid}`,
			}).then(res => {
				this.drshow = res.data.data

			}).catch((err) => {
				console.log('err', err)
			})
			this.$axios({
				method: 'post',
				url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.dcid}`,
			}).then(res => {
				this.dcshow = res.data.data

			}).catch((err) => {
				console.log('err', err)
			})
			this.$axios({
				method: 'post',
				url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.fgid}`,
			}).then(res => {
				this.fgshow = res.data.data

			}).catch((err) => {
				console.log('err', err)
			})

			this.$axios({
				method: 'post',
				url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.xgid}`,
			}).then(res => {

				this.xgshow = res.data.data

			}).catch((err) => {
				console.log('err', err)
			})
			this.$axios({
				method: 'post',
				url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.pfxfid}`,
			}).then(res => {

				this.pfxfshow = res.data.data

			}).catch((err) => {
				console.log('err', err)
			})
			this.$axios({
				method: 'post',
				url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.sxsszid}`,
			}).then(res => {

				this.sxsszshow = res.data.data

			}).catch((err) => {
				console.log('err', err)
			})
			this.$axios({
				method: 'post',
				url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.xhszid}`,
			}).then(res => {

				this.xhszshow = res.data.data

			}).catch((err) => {
				console.log('err', err)
			})
			this.$axios({
				method: 'post',
				url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.jkrzid}`,
			}).then(res => {

				this.jkrzshow = res.data.data

			}).catch((err) => {
				console.log('err', err)
			})
			this.$axios({
				method: 'post',
				url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.xfsbzid}`,
			}).then(res => {

				this.xfsbzshow = res.data.data

			}).catch((err) => {
				console.log('err', err)
			})
		},
		delForm() {
			if (!this.scpfshow) {
				this.tipText = this.lang.NoOperationAuthority;
				this.isTipShow = true;
				return
			}
			this.$axios({
				method: 'post',
				url: `/api/FormulaManage/FormulaManage_VerifyDel?argFId=${this.curLeft.FID}`,
			})
				.then(res => {
					if (res.data.code == 0) {
						this.noCancel = false;
						this.tipText = `是否删除${this.curLeft.Name}配方？`;
						this.isTipShow = true;
					} else {
						this.isTipShow = true;
						this.tipText = res.data.msg;
					}
				})


		},
		tipCallBack(str) {
			console.log(str)
			let userid = ''
			if (!JSON.parse(sessionStorage.getItem('userInfo1'))) {
				userid = JSON.parse(
					sessionStorage.getItem('sightseerInfo1')
				).SCMSUserName;
			} else {
				userid = JSON.parse(
					sessionStorage.getItem('userInfo1')
				).SCMSUserName;
			}
			if (str == 'yes') {
				this.$axios({
					method: 'post',
					url: `/api/FormulaManage/FormulaManage_DelFormula?argFId=${this.curLeft.FID}&loginUserName=${userid}`,
				})
					.then(res => {
						if (res.data.code == 0) {
							this.isTipShow = true;
							this.tipText = '删除成功！';
							this.getData()
						} else {
							this.isTipShow = true;
							this.tipText = res.data.msg;
						}
					})
			}
			this.isTipShow = false;
			this.noCancel = true;
		},
		tableRowClick(row) {
			this.curLeft = row;
			if (this.curLeft && this.curLeft.Projects && this.curLeft.Projects.length) {
				this.$nextTick(() => {
					this.$refs.projTable.setCurrentRow(this.curLeft.Projects[0]);
				})
			}
		},
		getData(noRestIdx) {
			this.$axios({
				method: 'post',
				url: `/api/FormulaManage/QueryFormulas`,
			})
				.then(res => {
					if (res.data.code == 0) {
						this.dataList1 = res.data.data;
						if (this.dataList1.length) {
							if (noRestIdx) {
								let _obj = this.dataList1.find((item) => item.FID == this.curLeft.FID)
								this.curLeft = _obj || this.dataList1[0];
							} else {
								this.curLeft = this.dataList1[0]
							}
							this.$refs.formualTable.setCurrentRow(this.curLeft);
							this.tableRowClick(this.curLeft)
						} else {
							this.curLeft = {};
						}
					} else {
						this.isTipShow = true;
						this.tipText = res.data.msg;
					}
				})
		},
		checkDrPower(e) {
			if (!this.drshow) {
				this.tipText = this.lang.NoOperationAuthority;
				this.isTipShow = true;
				e.stopPropagation()
				e.preventDefault()
				return
			}

		},
		uploadFile(file) {
			let userid = ''
			if (!JSON.parse(sessionStorage.getItem('userInfo1'))) {
				userid = JSON.parse(
					sessionStorage.getItem('sightseerInfo1')
				).SCMSUserName;
			} else {
				userid = JSON.parse(
					sessionStorage.getItem('userInfo1')
				).SCMSUserName;
			}
			let formData = new FormData()
			formData.append('file', file.file)
			this.$axios({
				method: 'post',
				url: `/api/FormulaManage/FormulaManage_ImportFormula?loginUserName=${userid}`,
				data: formData
			}).then(res => {
				if (res.data.code == 0) {
					this.tipText = this.lang.FormulaManage_HT_ImportSuccess
					this.isTipShow = true;
					this.req(1)
				} else {
					this.tipText = res.data.msg;
					this.isTipShow = true;
				}
			})
		},

		tableRowClick2(row) {
			this.EditContentSelectItem = row
		},
		refreshFn() {
			if (!this.sxsszshow) {
				this.tipText = this.lang.NoOperationAuthority;
				this.isTipShow = true;
				return
			}
			this.$axios({
				method: 'post',
				url: `/api/FormulaManage/RefresuCurrentValue2`,
				data: this.curLeft.TemplateProjects || []
			}).then(res2 => {
				if (res2.data.code == 0) {
					this.curLeft.TemplateProjects.forEach((item) => {
						if (res2.data.data.some(item2 => item.PID == item2.PID)) {
							let _obj = res2.data.data.find(item2 => item.PID == item2.PID);
							item.RealValue = _obj.CurrentValue;
							item.CompareRes = _obj.CompareRes;
						}
					})
				} else {
					this.tipText = res2.data.msg;
					this.isTipShow = true;
				}
			})
		},
		coverFn() {
			if (!this.fgshow) {
				this.tipText = this.lang.NoOperationAuthority;
				this.isTipShow = true;
				return
			}
			let _name = '';
			if (!JSON.parse(sessionStorage.getItem('userInfo1'))) {
				_name = JSON.parse(
					sessionStorage.getItem('sightseerInfo1')
				).SCMSUserName;
			} else {
				_name = JSON.parse(
					sessionStorage.getItem('userInfo1')
				).SCMSUserName;
			}
			this.$axios({
				method: 'post',
				url: `/api/FormulaManage/ModifyFormula?tid=${this.curLeft.TID}&fid=${this.curLeft.FID}&update=0&LoginUserName=${_name}`,
			}).then(res => {
				if (res.data.code == 0) {
					this.tipText = '覆盖成功！'
					this.isTipShow = true;
					//覆盖成功不查询 只把值覆盖过去
					this.rightList.forEach((item) => {
						item.Value = item.RealValue
					})
				} else {
					this.tipText = res.data.msg;
					this.isTipShow = true;
				}
			})
		},
		saveFn() {
			if (!this.xgshow) {
				this.tipText = this.lang.NoOperationAuthority;
				this.isTipShow = true;
				return
			}
			if (!this.curLeft) {
				return
			}
			let _name = '';
			if (!JSON.parse(sessionStorage.getItem('userInfo1'))) {
				_name = JSON.parse(
					sessionStorage.getItem('sightseerInfo1')
				).SCMSUserName;
			} else {
				_name = JSON.parse(
					sessionStorage.getItem('userInfo1')
				).SCMSUserName;
			}
			this.$axios({
				method: 'post',
				url: `/api/FormulaManage/FormulaManage_UpdateFormula?SkipCheckTemplateProject=${false}&LoginUserName=${_name}`,
				data: { ...this.curLeft, Items: this.curLeft.TemplateProjects, LoginUserName: _name }
			}).then(res => {
				if (res.data.code == 0) {
					this.tipText = '保存成功！'
					this.isTipShow = true;
					// this.getData() //和运行版保持一致，保存后不刷新
				} else {
					this.tipText = res.data.msg;
					this.isTipShow = true;
				}
			})

		},
		exportFn() {
			if (!this.dcshow) {
				this.tipText = this.lang.NoOperationAuthority;
				this.isTipShow = true;
				return
			}
			this.$axios({
				method: 'post',
				url: `/api/FormulaManage/ExportAllFormulas`,
				responseType: 'blob',
			}).then(res => {
				if (res.status === 200) {
					this.downloadFile(res.data, '配方.xls')
				} else {
					this.tipText = res.data.msg;
					this.isTipShow = true;
				}
			})
		},
		openLog() {
			if (!this.jkrzshow) {
				this.tipText = this.lang.NoOperationAuthority;
				this.isTipShow = true;
				return
			}
			this.logShow = true;
		},
		logCallBack() {
			this.logShow = false;
		},
		openEditFormua(type, row) {
			if (type == '添加配方' && !this.xjglshow) {
				this.tipText = this.lang.NoOperationAuthority;
				this.isTipShow = true;
				return
			}
			if (type == '修改配方' && !this.bjpfshow) {
				this.tipText = this.lang.NoOperationAuthority;
				this.isTipShow = true;
				return
			}
			if (type == '复制配方' && !this.fzpfshow) {
				this.tipText = this.lang.NoOperationAuthority;
				this.isTipShow = true;
				return
			}
			this.EditFormuaTitle = type;
			this.EditFormuaRow = row;
			this.EditFormuaShow = true;
		},
		EditFormuaCallBack(str) {
			this.EditFormuaTitle = '';
			this.EditFormuaRow = null;
			this.EditFormuaShow = false;
			console.log(this.EditFormuaShow)
			if (str) {
				this.isTipShow = true;
				this.tipText = str;
			}
			this.getData(true)
		},


		openEditGroup(type, row) {
			if (type == '设备分组' && !this.xfsbzshow) {
				this.tipText = this.lang.NoOperationAuthority;
				this.isTipShow = true;
				return
			}
			this.EditGroupTitle = type;
			this.EditGroupRow = row;
			this.EditGroupShow = true;
		},
		openEditGroupCallBack(str) {
			this.EditGroupTitle = '';
			this.EditGroupRow = null;
			this.EditGroupShow = false;
			if (str) {
				this.isTipShow = true;
				this.tipText = str;
			}
			this.getData(true)
		},

		openEditType() {
			if (!this.xhszshow) {
				this.tipText = this.lang.NoOperationAuthority;
				this.isTipShow = true;
				return
			}
			this.EditTypeShow = true;
		},
		openEditTypeCallBack(str) {
			this.EditTypeShow = false;
			if (str) {
				this.isTipShow = true;
				this.tipText = str;
			}
			this.getData()
		},

		openEditTemplate() {
			if (!this.bjmbshow) {
				this.tipText = this.lang.NoOperationAuthority;
				this.isTipShow = true;
				return
			}
			this.EditTemplateShow = true;
		},
		openEditTemplateCallBack(str) {
			this.EditTemplateShow = false;
			if (str) {
				this.isTipShow = true;
				this.tipText = str;
			}
			this.getData()
		},


	}
};
</script>

<style lang='scss' scoped>
.FormManageNew-container {
	width: 100vw;
	height: 100vh;
	padding: 100px 10px 40px;
	box-sizing: border-box;

	.FormManageNew-flex {
		width: 100%;
		height: 100%;
		display: flex;

		.FormManageNew-item {
			flex: 1;
			height: 100%;
			padding: 0 10px;
			border: 1px solid #ddd;
			margin-right: 10px;

			.item-header {
				height: 50px;
				display: flex;
				align-items: center;

				.item-title {
					color: #386df0;
					font-size: 16px;
					border-left: 3px solid #386df0;
					padding-left: 5px;
				}
			}

			.item-search {
				width: 100%;
				height: 50px;
				background-color: #dddddd;
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding-left: 10px;

				.search-left,
				.search-right {
					display: flex;
					align-items: center;

				}

				.search-btn {
					cursor: pointer;
					margin-right: 10px;
					height: 36px;
					width: 100px;
					border-radius: 4px;
					border: 1px solid #fcae38;
					background-color: #fff;
					color: #fcae38;
					display: flex;
					align-items: center;
					justify-content: center;
					position: relative;

					a {
						opacity: 0;
						position: absolute;
						left: 0;
						top: 0;
						width: 100%;
						height: 100%;
						z-index: 2;

						input {
							position: absolute;
							left: 0;
							top: 0;
							width: 100%;
							height: 100%;
						}
					}
				}

				.add {
					border: 1px solid #61D731;
					color: #61D731;
				}

				.del {
					background-color: #aaaaaa;
					border: none;
					color: #fff;
				}

				.type {
					background-color: #fcae38;
					border: none;
					color: #fff;
				}

				.log {
					border: 1px solid #5279DD;
					color: #5279DD;
				}
			}

			.item-table {
				margin-top: 10px;
				width: 100%;
				height: calc(100% - 120px);
				border: 1px solid #ddd;

				.green {
					color: #61D731;
				}

				.yes2 {
					display: flex;
					align-items: center;
					padding-left: 20px;
					position: relative;
					line-height: 1;

					.yes2-content {
						width: 16px;
						height: 16px;
						position: absolute;
						left: 0;
						top: 50%;
						transform: translate(0, -50%);
					}
				}

				.table-action {
					width: 50px;
					float: left;
					height: 25px;
					border-radius: 13px;
					background-color: #fff;
					border: 1px solid #cccccc;
					position: relative;
					margin-left: 5px;
					cursor: pointer;

					img {
						position: absolute;
						top: 0;
						width: 20px;
						height: 20px;
						bottom: 0;
						left: 0;
						right: 0;
						margin: auto;
					}
				}
			}

		}

		.FormManageNew-item:last-child {
			margin-right: 0;
		}
	}

}
</style>
