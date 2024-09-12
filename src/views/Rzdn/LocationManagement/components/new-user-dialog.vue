<template>
  <Dialog
    :visible="visible"
    width="840px"
    customClass="common_dialog location_dialog"
    showFlex
    toBody
    top="22vh"
    :title="title"
    @open="open"
    @close="close"
    @ok="confirm"
  >
    <div class="container" >
      <div class="table" >
        <Table
          isSelection
          ref="usetTable"
          :columnList="columnList"
          :tableDataList="tableData"
          @selectionChange="selectionChange"
        >
        </Table>
      </div>
    </div>
  </Dialog>
</template>

<script>
import Dialog from '@/newComponents/Dialog.vue'
import Table from '@/newComponents/Table.vue'
import { GetUserManagement } from '@/api/rzdn/new-location-management.js'

export default {
  components: { Dialog, Table },
  props: {
    title: {
      type: String,
      default: ''
    },
    userIds: {
      type: Array,
      default: () => []
    },
    visible: {
      type: Boolean,
      default: false
    },
  },
  data() {
    return {
      columnList: [
        {
          label: '序号',
          prop: 'index',
          width: '60px',
        },
        {
          label: '用户账号',
          prop: 'SCMSUserAccount',
        },
        {
          label: '用户名称',
          prop: 'SCMSUserName',
        },
        {
          label: '角色名称',
          prop: 'SCMSRoleName',
        },
        {
          label: '手机',
          prop: 'Phone',
        },
        {
          label: '邮箱',
          prop: 'Email',
        },
      ],
      tableData: [],
      multipleSelection: []
    }
  },
  methods: {
    open() {
      this.getUserData()
    },
    selectionChange(selection) {
      this.multipleSelection = selection
    },
    getUserData() {
      let $this = this
      GetUserManagement().then(res => {
        if (res.data.code === 0) {
          $this.tableData = res.data.data
          if ($this.userIds.length !== 0) {
            $this.$nextTick(() => {
              $this.tableData.forEach(item => {
                if ($this.userIds.includes(item.SCMSUserID)) {
                  $this.$refs.usetTable.$refs.table.toggleRowSelection(item, true)
                }
              })
            })
          }
        } else {
          $this.confirm_Pop2($this, res.data.msg)
        }
      })
    },
    close() {
      this.tableData = []
      this.multipleSelection = []
      this.$emit('close')
    },
    confirm() {
      this.$emit('confirm', this.multipleSelection)
    },
  }
}
</script>

<style lang="scss" scoped>
.container {
  height: 400px;
  overflow: auto;
}
.table {
  height: calc(100%);
}
.sort-icon {
  cursor: pointer;
  display: flex;
  justify-content: center;
}
</style>