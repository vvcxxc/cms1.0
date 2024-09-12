<template>
  <Dialog
    :title="title"
    :visible="visible"
    width="1100px"
    customClass="common_dialog"
    @close="close"
    top="14vh"
  >
    <div class="wrap" >
      <div class="wrap_header" >
        <search-from :formData="searchFormData" :config="formConfig" @searchData="searchData" @btnClick="btnClick" />
      </div>
      <div class="wrap_main" >
        <Table
          :columnList="columnList"
          :tableDataList="tableData"
          isSelection
          thColor="#4270E4"
          thBackColor="#DCF0F9"
        >
          <template #index="{ scope }">
            <span>{{scope.$index + 1}}</span>
          </template>
        </Table>
      </div>
    </div>
  </Dialog>
</template>

<script>
import moment from 'moment'
import SearchFrom from '@/newComponents/Search-form.vue'
import Dialog from '@/newComponents/Dialog.vue'
import Table from '@/newComponents/Table.vue'
import { GetAlarmRecord, ExportAlarmRecord } from '@/api/rzdn/spcAnaly.js'

export default {
  components: { SearchFrom, Dialog, Table },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: '报警记录'
    },
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
            name: '报警时间：',
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
              color: '#1B8BF4',
              borderColor: '#1B8BF4',
              backgroundColor: '#fff'
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
          label: '报警时间',
          prop: 'CreateTime',
          width: '160px'
        },
        {
          label: '报警变量名',
          prop: 'ParameterName'
        },
        {
          label: '图表类型',
          prop: 'ChartType'
        },
        {
          label: '报警类型',
          prop: 'ErrorType'
        },
        {
          label: '点数',
          prop: 'Spot'
        },
        {
          label: '原因',
          prop: 'Reason'
        },
        {
          label: '处理方法',
          prop: 'Handle'
        },
        {
          label: '备注',
          prop: 'Remarks'
        },
        {
          label: '处理人',
          prop: 'HandleBy'
        }
      ],
      tableData: [],
    }
  },
  methods: {
    searchData() {
      let postData = {
        StartDateTime: this.searchFormData.timeRange[0],
        EndDateTime: this.searchFormData.timeRange[1],
        IsHandle: true
      }
      let $this = this
      GetAlarmRecord(postData).then(res => {
        if (res.data.IsSuccess) {
          $this.tableData = res.data.Data
        } else {
          // $this.confirm_Pop2($this, res.data.Msg)
          $this.confirm_Pop2($this, res.data.Msg)
        }
      })
    },
    btnClick(item) {
      let $this = this
      if (item.btnName === '导出') {
        $this.exportExcel()
      }
    },
    exportExcel() {
      let $this = this
      let postData = {
        StartDateTime: this.searchFormData.timeRange[0],
        EndDateTime: this.searchFormData.timeRange[1],
        IsHandle: true
      }
      ExportAlarmRecord(postData).then(res => {
        if (res.status === 200) {
          $this.downloadFile(res.data, `报警记录.xlsx`)
        } else {
          $this.confirm_Pop2($this, res.data.Msg)
        }
      })
    },
    close() {
      this.$emit('close')
    },
  },
}
</script>

<style lang="scss" scoped>
.wrap {
  height: 520px;
}
.wrap_header {
  height: 50px;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  align-items: center;
}
.wrap_main {
  height: calc(100% - 50px);
  width: 100%;
  border: 1px solid #E4E4E4;
  box-sizing: border-box;
}
.setting_header_btn {
  padding: 10px 35px !important;
}
</style>