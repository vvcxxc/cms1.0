<template>
  <div class="page">
    <div class="container">
      <header ref="search">
        <search-form :formData="searchFormData" :config="formConfig" @searchData="searchData" @btnClick="btnClick" />
      </header>
      <main :style="{ height: wrapHeight }">
        <Table
          :tableDataList="tableData"
          :columnList="columnList"
          isSelection
          @selectionChange="selectionChange"
        >
          <template #header-SubgroupCapacity="{scope}">
            <div class="slot_header" >
              <i class="slot_tip el-icon-question" @click="tipClick"></i>
              <span>{{scope.column.label}}</span>
            </div>
          </template>
        </Table>
      </main>
      <footer>
        <Page :pageData="pageData" @changePage="changePage" />
      </footer>
    </div>

    <!-- 弹窗 -->
    <child-group
      :visible="childGroupShow"
      @close="childGroupClose"
    />
    <add-dialog
      :visible="addShow"
      :title="addTitle"
      :concatData="addConcatData"
      @close="addClose"
      @confirm="addConfirm"
    />
    <record-dialog
      :visible="recordShow"
      @close="recordClose"
    />
  </div>
</template>

<script>
import SearchForm from '@/newComponents/Search-form.vue'
import Table from '@/newComponents/Table.vue'
import Page from '@/newComponents/Page.vue'
import ChildGroup from './dialogs/dialog-child-group.vue'
import AddDialog from './dialogs/dialog-add.vue'
import RecordDialog from './dialogs/dialog-record.vue'
import { GetSPCConfig, AddSPCConfig, EditSPCConfig, RestoreSPCConfig, DeleteSPCConfig, SPCConfigExport } from '@/api/rzdn/spcSetting.js'
import { getRightTree, getPowerById } from '@/api/rzdn/common.js'
import { findPathByLeafId, getUrlParam } from '@/util/index.js'

export default {
  name: 'SPCSetting',
  components: { SearchForm, Table, Page, ChildGroup, AddDialog, RecordDialog },
  data() {
    return {
      wrapHeight: 'calc(100% - 60px - 60px)',
      /* searchform */
      searchFormData: {
        keyword: '',
      },
      formConfig: {
        form: [
          {
            type: 'input',
            prop: 'keyword'
          },
          {
            type: 'btn',
            name: '查询'
          }
        ],
        buttons: [
          {
            styles: {
              color: '#46BE05',
              borderColor: '#46BE05',
              backgroundColor: '#fff'
            },
            btnName: '新增',
          },
          {
            styles: {
              color: '#F2A23A',
              borderColor: '#F2A23A',
              backgroundColor: '#fff'
            },
            btnName: '修改',
          },
          {
            styles: {
              color: '#F2A23A',
              borderColor: '#F2A23A',
              backgroundColor: '#fff'
            },
            btnName: '恢复修改',
          },
          {
            styles: {
              color: '#2C9893',
              borderColor: '#2C9893',
              backgroundColor: '#fff'
            },
            btnName: '修改记录',
          },
          {
            styles: {
              color: '#DF5151',
              borderColor: '#DF5151',
              backgroundColor: '#fff'
            },
            btnName: '删除',
          },
          {
            styles: {
              color: '#1B8BF4',
              borderColor: '#1B8BF4',
              backgroundColor: '#fff'
            },
            btnName: '导出',
          },
          {
            styles: {
              color: '#5881E7',
              borderColor: '#5881E7',
              backgroundColor: '#fff'
            },
            btnName: 'SPC分析',
          },
        ]
      },
      /* Table */
      columnList: [
        {
          label: '序号',
          prop: 'SerialNumber',
          width: '110px',
        },
        {
          label: '参数名',
          prop: 'ParameterName',
        },
        {
          label: '变量名',
          prop: 'VariableName',
        },
        {
          label: '子组容量',
          prop: 'SubgroupCapacity',
        },
        {
          label: '上限值',
          prop: 'UpperLimit',
        },
        {
          label: '下限值',
          prop: 'LowerLimit',
        },
        {
          label: '目标值',
          prop: 'TargetValue',
        }
      ],
      tableData: [],
      multipleSelection: [],
      addConcatData: [],
      /* footer */
      pageData: {
        PageIndex: 1,
        TotalCount: 0,
        PageSize: 50
      },
      /* 弹窗 */
      childGroupShow: false,
      addShow: false,
      addTitle: '',
      recordShow: false,
      // 权限
      powerBtn: {
        spcDatas: {
          analy: false,
          upd: false,
          updRecord: false,
          del: false,
          export: false,
          reUpd: false,
          add: false,
          search: false,
        },
      },
    }
  },
  mounted() {
    this.getData()
    this.changeTableHeight()
    window.onresize = () => {
      this.changeTableHeight()
    }
  },
  created() {
    // 获取权限
    this.getPower()
  },
  methods: {
    // 权限
    getPower() {
      let $this = this
      getRightTree().then(res => {
        let powers = res.data.data
        let btnObj = {}
        let buttonarr = findPathByLeafId(getUrlParam('id'), powers)[0].Children
        buttonarr.forEach((item) => {
          btnObj[item.RightDesc] = item
        });
        $this.powerBtn.spcDatas = {
          analyId: btnObj['SPC配置-SPC分析'].RightID,
          updId: btnObj['SPC配置-修改'].RightID,
          updRecordId: btnObj['SPC配置-修改记录'].RightID,
          delId: btnObj['SPC配置-删除'].RightID,
          exportId: btnObj['SPC配置-导出'].RightID,
          reUpdId: btnObj['SPC配置-恢复修改'].RightID,
          addId: btnObj['SPC配置-新增'].RightID,
          searchId: btnObj['SPC配置-查询'].RightID,
        }

        let userid = '';
        if (!JSON.parse(sessionStorage.getItem('userInfo1'))) {
          userid = JSON.parse(sessionStorage.getItem('sightseerInfo1')).SCMSUserID;
        } else {
          userid = JSON.parse(sessionStorage.getItem('userInfo1')).SCMSUserID;
        }
        /* 获取按钮权限 */
        $this.getPowerBtn(userid, $this.powerBtn.spcDatas.analyId, 'spcDatas', 'analy')
        $this.getPowerBtn(userid, $this.powerBtn.spcDatas.updId, 'spcDatas', 'upd')
        $this.getPowerBtn(userid, $this.powerBtn.spcDatas.updRecordId, 'spcDatas', 'updRecord')
        $this.getPowerBtn(userid, $this.powerBtn.spcDatas.delId, 'spcDatas', 'del')
        $this.getPowerBtn(userid, $this.powerBtn.spcDatas.exportId, 'spcDatas', 'export')
        $this.getPowerBtn(userid, $this.powerBtn.spcDatas.reUpdId, 'spcDatas', 'reUpd')
        $this.getPowerBtn(userid, $this.powerBtn.spcDatas.addId, 'spcDatas', 'add')
        $this.getPowerBtn(userid, $this.powerBtn.spcDatas.searchId, 'spcDatas', 'search')
      })
    },
    getPowerBtn(userid, btnId, prop, innerProp) {
      let $this = this
      getPowerById(userid, btnId).then(res => {
        $this.powerBtn[prop][innerProp] = res.data.data
      })
    },
    searchData() {
      if (!this.powerBtn.spcDatas.search) {
        this.confirm_Pop2(this, '该账户无操作权限！')
        return
      }
      this.pageData.PageIndex = 1
      this.getData()
    },
    getData() {
      let postData = {
        PageNum: this.pageData.PageIndex,
        PageSize: this.pageData.PageSize,
        Payload: {
          KeyWord: this.searchFormData.keyword
        }
      }
      let $this = this
      GetSPCConfig(postData).then(res => {
        if (res.data.IsSuccess) {
          $this.pageData.TotalCount = res.data.Data.Total
          $this.tableData = res.data.Data.Result.map((item, index) => ({
            SerialNumber: (index + 1) + ($this.pageData.PageIndex - 1) * $this.pageData.PageSize,
            ...item
          }))
        } else {
          $this.confirm_Pop2($this, res.data.Msg)
        }
      })
    },
    childGroupClose() {
      this.childGroupShow = false
    },
    addClose() {
      this.addTitle = ''
      this.addShow = false
    },
    addConfirm(data) {
      let postData = data.map(item => ({
        ...item,
        Operator: JSON.parse(sessionStorage.getItem('userInfo1')) ? JSON.parse(sessionStorage.getItem('userInfo1')).SCMSUserName : 'Guest'
      }))
      let $this = this
      if (this.addTitle === '新增检测项目') {
        AddSPCConfig(postData).then(res => {
          if (res.data.IsSuccess) {
            $this.getData()
            $this.message_Success($this, '新增成功')
            $this.addClose()
          } else {
            $this.confirm_Pop2($this, res.data.Msg)
          }
        })
      }
      if (this.addTitle === '修改检测项目') {
        EditSPCConfig(postData).then(res => {
          if (res.data.IsSuccess) {
            $this.getData()
            $this.message_Success($this, '修改成功')
            $this.addClose()
          } else {
            $this.confirm_Pop2($this, res.data.Msg)
          }
        })
      }
    },
    recordClose() {
      this.recordShow = false
    },
    selectionChange(val) {
      this.multipleSelection = val
    },
    btnClick(item) {
      if (item.btnName === '新增') {
        if (!this.powerBtn.spcDatas.add) {
          this.confirm_Pop2(this, '该账户无操作权限！')
          return
        }
        this.addSPC()
      }
      if (item.btnName === '修改') {
        if (!this.powerBtn.spcDatas.upd) {
          this.confirm_Pop2(this, '该账户无操作权限！')
          return
        }
        if (this.multipleSelection.length === 0) {
          this.confirm_Pop2(this, '请先勾选数据')
          return
        }
        this.updSPC()
      }
      if (item.btnName === '恢复修改') {
        if (!this.powerBtn.spcDatas.reUpd) {
          this.confirm_Pop2(this, '该账户无操作权限！')
          return
        }
        if (this.multipleSelection.length === 0) {
          this.confirm_Pop2(this, '请先勾选数据')
          return
        }
        this.recoverSPC()
      }
      if (item.btnName === '修改记录') {
        if (!this.powerBtn.spcDatas.updRecord) {
          this.confirm_Pop2(this, '该账户无操作权限！')
          return
        }
        this.recordSPC()
      }
      if (item.btnName === '删除') {
        if (!this.powerBtn.spcDatas.del) {
          this.confirm_Pop2(this, '该账户无操作权限！')
          return
        }
        if (this.multipleSelection.length === 0) {
          this.confirm_Pop2(this, '请先勾选数据')
          return
        }
        this.delSPC()
      }
      if (item.btnName === '导出') {
        if (!this.powerBtn.spcDatas.export) {
          this.confirm_Pop2(this, '该账户无操作权限！')
          return
        }
        if (this.tableData.length === 0) {
          this.confirm_Pop2(this, '暂无数据， 无法导出')
          return
        }
        this.exportExcel()
      }
      if (item.btnName === 'SPC分析') {
        if (!this.powerBtn.spcDatas.analy) {
          this.confirm_Pop2(this, '该账户无操作权限！')
          return
        }
        if (this.multipleSelection.length > 1) {
          this.confirm_Pop2(this, '最多选择一条数据进行spc分析')
          return
        }
        let SPCConfigId = null
        if (this.multipleSelection.length !== 0) {
          SPCConfigId = this.multipleSelection[0].SPCConfigId
        }
        this.$router.push({
          path: '/SYC_AnalysisModel_Module',
          query: { SPCConfigId }
        })
      }
    },
    addSPC() {
      this.addTitle = "新增检测项目"
      this.addConcatData = []
      this.addShow = true
    },
    updSPC() {
      this.addTitle = "修改检测项目"
      this.addConcatData = this.multipleSelection.map((item, index) => ({
        ...item,
        SerialNumber: index + 1,
      }))
      this.addShow = true
    },
    recoverSPC() {
      let $this = this
      let postData = this.multipleSelection.map((item, index) => ({
        SerialNumber: item.SerialNumber,
        SPCConfigId: item.SPCConfigId,
        Operator: JSON.parse(sessionStorage.getItem('userInfo1')) ? JSON.parse(sessionStorage.getItem('userInfo1')).SCMSUserName : 'Guest'
      }))
      RestoreSPCConfig(postData).then(res => {
        if (res.data.IsSuccess) {
          $this.getData()
          $this.message_Success($this, '恢复成功')
        } else {
          $this.confirm_Pop2($this, res.data.Msg)
        }
      })
    },
    recordSPC() {
      this.recordShow = true
    },
    delSPC() {
      let $this = this
      let ids = this.multipleSelection.map(item => item.SPCConfigId)
      this.confirm_Pop($this, '是否确认删除？', function () {
        DeleteSPCConfig({SPCConfigIds: ids}).then(res => {
          if (res.data.IsSuccess) {
            $this.getData()
            $this.message_Success($this, '删除成功')
          } else {
            $this.confirm_Pop2($this, res.data.Msg)
          }
        })
      })
    },
    exportExcel() {
      let postData = {
        PageNum: this.pageData.PageIndex,
        PageSize: this.pageData.PageSize,
        Payload: {
            KeyWord: this.searchFormData.keyword
        }
      }
      let $this = this
      SPCConfigExport(postData).then(res => {
        if (res.status === 200) {
          $this.downloadFile(res.data, `SPC配置.xlsx`)
        } else {
          $this.confirm_Pop2($this, res.data.msg)
        }
      })
    },
    tipClick() {
      this.childGroupShow = true
    },
    changePage(pageIndex) {
      this.pageData.PageIndex = pageIndex
      this.getData()
    },
    changeTableHeight() {
      let $this = this
      this.$nextTick(() => {
          $this.wrapHeight = `calc(100% - ${this.$refs.search.clientHeight + 60}px)`
      })
    },
  },
}
</script>

<style lang='scss' scoped>
.page {
  width: 100%;
  height: 100%;
  margin-top: calc(40px + 50px);
  height: calc(100% - 40px - 50px - 30px);
  box-sizing: border-box;
  overflow: auto;
  background: #EEEEEE;
  padding: 20px;
  .container {
    width: 100%;
    height: 100%;
    border: 2px solid #E7E7E7;
    background: #fff;
    box-sizing: border-box;
    padding: 10px 20px 0px 20px;
  }
}

header {
  width: 100%;
  line-height: 59px;
  padding: 0 10px;
  background-color: #DFDCDD;
  box-sizing: border-box;
}
main {
  width: 100%;
  height: calc(100% - 60px - 60px);
}
footer {
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
}

.slot_header {
  display: flex;
  align-items: center;
  .slot_tip {
    margin-right: 5px;
    font-size: 17px;
    cursor: pointer;
  }
}


</style>