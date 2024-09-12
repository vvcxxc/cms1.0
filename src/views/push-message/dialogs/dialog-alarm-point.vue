<template>
  <el-dialog
    :title="lang.PushMessage_LinkAlarmControl"
    :visible="visible"
    :append-to-body="appendToBody"
    custom-class="common_dialog"
    v-el-drag-dialog
    @open="open"
    @close="close"
    width="800px"
    top="12vh"
  >
    <div class="wrap" >
      <div class="wrap_item">{{lang.PushMessage_ScreenList}}</div>
      <!-- <div class="all_check" >
        <el-checkbox class="common_checkbox" v-model="checkAll" @change="setAllCheck">全选</el-checkbox>
      </div> -->
      <div class="wrap_content" >
        <el-tree
          :data="treeData"
          :props="defaultProps"
          class="common_tree alarm_tree"
          show-checkbox
          @check="nodeCheck"
          default-expand-all
          node-key="Id"
          ref="tree">
        </el-tree>
      </div>

    </div>
    <span slot="footer" class="dialog-footer">
      <el-button class="d_footer_cancel" @click="close">{{lang.PushMessage_Cancel}}</el-button>
      <el-button class="d_footer_sure"  @click="confirm">{{lang.PopupCommon_Sure}}</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { flatTree, getNodeById } from '@/utils/index.js'
import { getAlarmTree } from '@/api/push-message/index'

export default {
  name: 'dialogAlarmPoint',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    appendToBody: {
      type: Boolean,
      default: false,
    },
    checkedList: {
      type: Array,
      default: () => []
    },
  },
  data() {
    return {
      lang: JSON.parse(localStorage.getItem('languages'))[localStorage.getItem('currentLang')],
      formData: {
        name: ''
      },
      defaultProps: {
        children: 'Children',
        label: 'ItemName'
      },
      checkAll: false,
      treeData: [/* {
        Id: "d463fc5a-2c71-46e8-8ef3-5317ffab66cb",
        ItemName: "全选",
        Children: [{
          Id: "4c1438c1-7f06-4a62-9c8d-5134fa0e1559",
          ItemName: "test1",
          Children: [{
            Id: "75d9ad18-430f-4ad5-ab02-a6468c319f34",
            ItemName: "AlarmUserControl2",
            Children: null,
            AlarmIds: []
          }],
          AlarmIds: null
        }],
        AlarmIds: null
      } */],
    }
  },
  methods: {
    setAllCheck(val) {
      if (val) {
        this.$refs.tree.setCheckedNodes(this.treeData)
      } else {
        this.$refs.tree.setCheckedKeys([])
      }
    },
    nodeCheck () {
      // let checks = this.$refs.tree.getCheckedKeys()
      // let arrTree =  flatTree(this.treeData, { children: 'Children', id: 'id' })
      // if (arrTree.length === checks.length) {
      //   this.checkAll = true
      // } else {
      //   this.checkAll = false
      // }
    },
    open() {
      this.getTreeData()
    },
    getTreeData () {
      let $this = this
      getAlarmTree().then(res => {
        $this.treeData = res.data.data
        let arrTree =  flatTree(res.data.data,{children: 'Children', id: 'Id'})
        let checkedNode = []
        arrTree.forEach(item => {
          if (item.AlarmIds && item.AlarmIds.length !== 0) {
            $this.checkedList.forEach(check => {  // 判断设置勾选
              if (item.AlarmIds.findIndex(f => f === check) !== -1) {
                checkedNode = checkedNode.concat(getNodeById(JSON.parse(JSON.stringify(res.data.data)), item.Id, {children: 'Children', id: 'Id'}))
              }
            })
          }
        })
        $this.$nextTick(() => {
          $this.$refs.tree.setCheckedNodes(checkedNode)
        })
      })
    },
    close () {
      this.$emit('close')
    },
    confirm () {
      let checkedNodes = this.$refs.tree.getCheckedNodes()
      let checkedIds = []
      checkedNodes.forEach(item => {
        if (item.AlarmIds && item.AlarmIds.length !== 0) {
          checkedIds = checkedIds.concat(item.AlarmIds)
        }
      })
      this.$emit('confirm', checkedIds)
    },
  }
}
</script>

<style lang='scss' scoped>
::v-deep .alarm_tree.el-tree{
  background-color: transparent;
  .el-tree-node__content {
    >label.el-checkbox {
      position: absolute;
      left: -20px;
      .el-checkbox__inner {
        width: 20px;
        height: 20px;
        &::after {
          border-width: 2px;
          width: 5px;
          height: 10px;
          left: 5px;
        }
      }
    }
  }
}

.wrap {
  height: 570px;
  border: 1px solid #C4C4C4;
  padding: 0 20px 20px 20px;
  background: #F6F3F7;
}
.wrap_item {
  padding-left: 15px;
  font-weight: bold;
  position: relative;
  height: 50px;
  display:flex;
  align-items: center;
  &::before {
    content: "";
    position: absolute;
    width: 3px;
    height: 20px;
    left: 0;
    background: #508BEB;
  }
}
.wrap_content {
  height: calc(100% - 50px - 38px);
  padding: 0 20px 0 40px;
}
.all_check {
  height: 38px;
  display: flex;
  padding-left: 20px;
  align-items: center;
  background: #DCF0F9;
}

</style>