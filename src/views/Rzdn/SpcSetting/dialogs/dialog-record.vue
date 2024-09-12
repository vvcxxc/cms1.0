<template>
  <Dialog
    :title="title"
    :visible="visible"
    width="1300px"
    customClass="common_dialog"
    @open="open"
    @close="close"
    top="10vh"
  >
    <div class="wrap" >
      <div class="wrap_header">
        <search-form :formData="searchFormData" :config="formConfig" @searchData="searchData" @btnClick="btnClick" />
      </div>
      <div class="wrap_main" >
        <Table
          :columnList="columnList"
          :tableDataList="tableData"
          thColor="#4270E4"
          thBackColor="#DCF0F9"
        >
          <template #index="{scope}">
            <div>
              {{scope.$index + 1}}
            </div>
          </template>
          <!-- <template #IsAlarmShutDown="{scope}">
            <div>
              {{scope.row.IsAlarmShutDown ? '是' : '否'}}
            </div>
          </template>
          <template #IsControlLine="{scope}">
            <div>
              {{scope.row.IsControlLine ? '是' : '否'}}
            </div>
          </template> -->
        </Table>
      </div>
    </div>
    <template #common-footer >
      <el-button class="common_button" :style="{background: '#386DF0', borderColor: '#386DF0', color: '#fff'}" @click="close">关闭</el-button>
    </template>
  </Dialog>
</template>

<script>
import moment from 'moment'
import Dialog from '@/newComponents/Dialog.vue'
import SearchForm from '@/newComponents/Search-form.vue'
import Table from '@/newComponents/Table.vue'
import Page from '@/newComponents/Page.vue'
import { GetEditRecordDTO, EditRecordExport } from '@/api/rzdn/spcSetting.js'

export default {
  components: { Dialog, SearchForm, Table },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: 'SPC配置修改记录'
    },
    toBody: {
      type: Boolean,
      default: false,
    }
  },
  data() {
    return {
      searchFormData: {
        timeRange: [moment(new Date()).format('YYYY-MM-DD') + ' 00:00:00', moment(new Date()).format('YYYY-MM-DD') + ' 23:59:59'],
      },
      formConfig: {
        form: [
          {
            type: 'date-time-range2',
            name: '修改时间：',
            prop: 'timeRange',
          },
          {
            type: 'btn',
            name: '查询',
          }
        ],
        buttons: [
          {
            styles: {
              color: '#fff',
              borderColor: '#386DF0',
              backgroundColor: '#386DF0'
            },
            btnName: '导出',
          },
        ]
      },
      columnList: [
        {
          label: '序号',
          prop: 'index',
          width: '60px'
        },
        {
          label: '修改时间',
          prop: 'UpdateDateTime',
          width: '160px'
        },
        {
          label: '修改人',
          prop: 'Operator',
        },
        {
          label: '修改项目',
          prop: 'ParameterName',
        },
        {
          label: '规格上限值',
          prop: 'UpperLimit',
        },
        {
          label: '规格下限值',
          prop: 'LowerLimit',
        },
        {
          label: '目标值',
          prop: 'TargetValue',
        },
        {
          label: '判异模式',
          prop: 'Pattern',
        },
        // {
        //   label: '报警是否停机',
        //   prop: 'IsAlarmShutDown',
        //   width: '120px'
        // },
        // {
        //   label: '控制线是否自动',
        //   prop: 'IsControlLine',
        //   width: '120px'
        // }
      ],
      tableData: [],
      childGroupShow: false,
      variableShow: false
    }
  },
  methods: {
    open() {
      this.getData()
    },
    getData() {
      let postData = {
        StartDateTime: this.searchFormData.timeRange[0],
        EndDateTime: this.searchFormData.timeRange[1]
      }
      let $this = this
      GetEditRecordDTO(postData).then(res => {
        if (res.data.IsSuccess) {
          $this.tableData = res.data.Data
        } else {
          $this.confirm_Pop2($this, res.data.Msg)
        }
      })
    },
    searchData() {
      this.getData()
    },
    btnClick (item) {
      if (item.btnName === '导出') {
        if (this.tableData.length === 0) {
          this.confirm_Pop2(this, '暂无数据， 无法导出')
          return
        }
        this.exportExcel()
      }
    },
    exportExcel() {
      let $this = this
      let postData = {
        StartDateTime: this.searchFormData.timeRange[0],
        EndDateTime: this.searchFormData.timeRange[1]
      }
      EditRecordExport(postData).then(res => {
        if (res.status === 200) {
          $this.downloadFile(res.data, `SPC配置修改记录.xlsx`)
        } else {
          $this.message_ERROR($this, res.data.msg)
        }
      })
    },
    changePage(pageIndex) {
      this.getData()
    },
    openVariablePop() {
      this.variableShow = true
    },
    tipClick() {
      this.childGroupShow = true
    },
    childGroupClose() {
      this.childGroupShow = false
    },
    close() {
      this.$emit('close')
    },
  }
}
</script>

<style lang="scss" scoped>
.wrap {
  height: 620px;
  box-sizing: border-box;
}
.wrap_header {
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.wrap_main {
  height: calc(100% - 50px);
  width: 100%;
  border: 1px solid #E4E4E4;
  box-sizing: border-box;
}

</style>