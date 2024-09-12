<template>
  <Dialog
    :title="title"
    :visible="visible"
    width="680px"
    :toBody="toBody"
    customClass="common_dialog"
    @close="close"
  >
    <div class="wrap" >
      <div class="wrap_header">
        <span>注：设置不同的子组容量，SPC分析展示的控制图类型不同；</span>
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
        </Table>
      </div>
    </div>
    <template #common-footer>
      <el-button class="common_button common_button_search" @click="close">关闭</el-button>
    </template>
  </Dialog>
</template>

<script>
import Dialog from '@/newComponents/Dialog.vue'
import Table from '@/newComponents/Table.vue'

export default {
  components: { Dialog, Table },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    toBody: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: '子组容量设置'
    },
  },
  data() {
    return {
      columnList: [
        {
          label: '序号',
          prop: 'index',
          width: '110px',
        },
        {
          label: '子组容量',
          prop: 'capacity',
        },
        {
          label: '控制图类型',
          prop: 'type',
        },
      ],
      tableData: [
        {
          capacity: '1',
          type: 'IMR控制图'
        },
        {
          capacity: '2-9',
          type: 'X-R控制图'
        },
        {
          capacity: '>10',
          type: 'X-S控制图'
        }
      ],
    }
  },
  methods: {
    close() {
      this.$emit('close')
    },
  }
}
</script>

<style lang="scss" scoped>
.wrap {
  height: 420px;
}
.wrap_header {
  height: 40px;
  display: flex;
  align-items: center;
  color: #0080F7;
}
.wrap_main {
  height: calc(100% - 40px);
  width: 100%;
}

</style>