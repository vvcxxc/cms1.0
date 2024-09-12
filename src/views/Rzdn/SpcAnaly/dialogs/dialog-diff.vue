<template>
  <Dialog
    :title="title"
    :visible="visible"
    width="1000px"
    customClass="common_dialog"
    @close="close"
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
      <div class="wrap_footer" >
        <span>注：除超限报警外，其余八种可以独立选择是否需要报警；</span>
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
    title: {
      type: String,
      default: '判异规则选择'
    },
  },
  data() {
    return {
      columnList: [
        {
          label: '规则编号',
          prop: 'ruleNo',
          width: '110px'
        },
        {
          label: '现行编号',
          prop: 'nowNo',
        },
        {
          label: '规则依据',
          prop: 'ruleBy',
        }
      ],
      tableData: [
        {
          ruleNo: 'R0',
          nowNo: '超出规则限',
          ruleBy: '超出规格限',
        },
        {
          ruleNo: 'R1',
          nowNo: '[1]个点落在[3]倍sigma区以外',
          ruleBy: '[m]个点落在[n]倍sigma区以外',
        },
        {
          ruleNo: 'R2',
          nowNo: '连续[9]点落在中心线同一侧',
          ruleBy: '连续[m]点落在中心线同一侧',
        },
        {
          ruleNo: 'R3',
          nowNo: '连续[6]点递增或递减',
          ruleBy: '连续[m]点递增或递减',
        },
        {
          ruleNo: 'R4',
          nowNo: '连续[14]点相邻点交替上下',
          ruleBy: '连续[m]点相邻点交替上下',
        },
        {
          ruleNo: 'R5',
          nowNo: '连续[3]点中有[2]点落在中心线同一侧[2]倍sigma以外',
          ruleBy: '连续[m]点中有[n]点落在中心线同一侧[k]倍sigma以外',
        },
        {
          ruleNo: 'R6',
          nowNo: '连续[5]点中有[4]点落在中心线同一侧[1]倍sigma以外',
          ruleBy: '连续[m]点中有[n]点落在中心线同一侧[k]倍sigma以外',
        },
        {
          ruleNo: 'R7',
          nowNo: '连续[15]点落在中心线两侧[1]倍sigma区域以内',
          ruleBy: '连续[m]点落在中心线两侧[n]倍sigma区域以内',
        },
        {
          ruleNo: 'R8',
          nowNo: '连续[8]点落在中心线两侧且无一落在[1]倍sigma区域以内',
          ruleBy: '连续[m]点落在中心线两侧且无一落在[n]倍sigma区域以内',
        },
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
  height: 520px;
}
.wrap_main {
  height: calc(100% - 30px);
  width: 100%;
  border: 1px solid #E4E4E4;
  box-sizing: border-box;
}
.wrap_footer {
  height: 30px;
  display: flex;
  align-items: flex-end;
  color: #0783F7;
}

</style>