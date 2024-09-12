<template>
  <Dialog
    :title="title"
    :visible="visible"
    width="1100px"
    customClass="common_dialog"
    @close="close"
    @open="open"
    top="14vh"
  >
    <div class="wrap" >
      <div class="wrap_main" >
        <Table
          :columnList="columnList"
          :tableDataList="tableData"
          thColor="#4270E4"
          thBackColor="#DCF0F9"
        >
        </Table>
      </div>
    </div>
    <template #common-footer>
      <el-button class="common_button common_button_remove" style="padding: 10px 35px" @click="close">关闭</el-button>
      <el-button class="common_button common_button_search" style="padding: 10px 35px" @click="exportExcel">导出</el-button>
    </template>
  </Dialog>
</template>

<script>
import Dialog from '@/newComponents/Dialog.vue'
import Table from '@/newComponents/Table.vue'
import { GetSPCSample, ExportReportSPCSample } from '@/api/rzdn/spcAnaly.js'

export default {
  components: { Dialog, Table },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: '样本实时数据'
    },
    infoData: {
      type: Object,
      default: () => {}
    },
    timeRange: {
      type: Array,
      default: () => []
    },
  },
  data() {
    return {
      columnList: [
        // {
        //   label: '序号',
        //   prop: 'SerialNumber',
        //   fixed: true,
        //   width: '60px'
        // },
        // {
        //   label: '分析时间',
        //   fixed: true,
        //   prop: 'CreateTime',
        //   width: '160px'
        // },
        // {
        //   label: '班次',
        //   fixed: true,
        //   prop: 'Shift',
        // },
        // {
        //   label: '样本1',
        //   prop: 'SampleValue1',
        // },
        // {
        //   label: '状态',
        //   prop: 'State',
        // },
        // {
        //   label: '平均值',
        //   prop: 'Ave',
        // },
        // {
        //   label: '标准差',
        //   prop: 'StandardDeviation',
        // },
        // {
        //   label: '极差',
        //   prop: 'Range',
        // },
        // {
        //   label: '最大值',
        //   prop: 'Max',
        // },
        // {
        //   label: '最小值',
        //   prop: 'Min',
        // }
      ],
      tableData: [],
    }
  },
  methods: {
    open() {
      let $this = this
      let postData = {
        SPCConfigId: this.infoData.SPCConfigId,
        IsRealTime: this.infoData.IsRealTime,
        StartDateTime: this.timeRange[0],
        EndDateTime: this.timeRange[1]
      }
      GetSPCSample(postData).then(res => {
        if (res.data.IsSuccess) {
          $this.columnList = res.data.Data.Titles.map(item => ({
            label: item.Label,
            prop: item.Prop,
            fixed: item.Prop === 'SerialNumber' ? true : false,
            width: item.Prop === 'CreateTime' ? '160px' : ''
          }))
          $this.tableData = res.data.Data.Rows
        } else {
          $this.confirm_Pop2($this, res.data.Msg)
        }
      })
    },
    close() {
      this.$emit('close')
    },
    exportExcel() {
      let $this = this
      let postData = {
        SPCConfigId: this.infoData.SPCConfigId,
        IsRealTime: this.infoData.IsRealTime,
        StartDateTime: this.timeRange[0],
        EndDateTime: this.timeRange[1]
      }
      ExportReportSPCSample(postData).then(res => {
        if (res.status === 200) {
          $this.downloadFile(res.data, `样本数据.xlsx`)
        } else {
          $this.confirm_Pop2($this, res.data.Msg)
        }
      })
    },
  }
}
</script>

<style lang="scss" scoped>
.wrap {
  height: 520px;
}
.wrap_main {
  height: 100%;
  width: 100%;
  border: 1px solid #E4E4E4;
  box-sizing: border-box;
}

</style>