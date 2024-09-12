<template>
  <el-dialog
    :title="config.title"
    :visible="visible"
    :append-to-body="appendToBody"
    v-el-drag-dialog
    custom-class="common_dialog"
    @open="open"
    @close="close"
    width="1200px"
    top="8vh"
  >
    <div class="wrap" >
      <div class="wrap_top">
        <div class="wrap_block">
          <search-form :config="config.formConfig" :formData="config.formData" @searchData="searchData"/>
        </div>
        <div class="wrap_main">
          <el-table
              ref="sendTable"
              class="common_table"
              :data="config.sendData"
              :border="true"
              height="100%"
              @selection-change="handleTableDataSelection"
              :header-cell-style="{ background: '#DCF0F9', color: '#4976E5' }"
              tooltip-effect="dark"
            >
              <el-table-column type="selection" width="55"></el-table-column>
              <el-table-column v-for="(item, index) in config.tableColumns" :key="index" :prop="item.prop" show-overflow-tooltip :label="item.label" :width="item.width" align="center">
                <template slot-scope="scope" >
                  <span v-if="item.label === lang.PushMessage_SerialNumber">{{scope.$index + 1}}</span>
                  <span v-else >{{scope.row[item.prop]}}</span>
                </template>
              </el-table-column>

            </el-table>
        </div>
      </div>
      <div class="wrap_middle">
        <el-button class="common_button_add" @click="addToReceiveData">{{lang.RoleManage_Add}}</el-button>
        <el-button class="common_button_remove" @click="removeReceiveData">{{lang.UserManage_DomainText2}}</el-button>
      </div>
      <div class="wrap_bottom">
        <div class="wrap_block">
          <div class="wrap_block_label color_blue">{{config.subTitle}}</div>
        </div>
        <div class="wrap_main">
          <el-table
              ref="receiveTable"
              class="common_table"
              :data="config.receiveData"
              :border="true"
              height="100%"
              @selection-change="handleReceiveDataSelection"
              :header-cell-style="{ background: '#DCF0F9', color: '#4976E5' }"
              tooltip-effect="dark"
            >
              <el-table-column type="selection" width="55"></el-table-column>
              <el-table-column v-for="(item, index) in config.tableColumns" :key="index" :prop="item.prop" show-overflow-tooltip :label="item.label" :width="item.width" align="center">
                <template slot-scope="scope" >
                  <span v-if="item.label === lang.PushMessage_SerialNumber">{{scope.$index + 1}}</span>
                  <span v-else >{{scope.row[item.prop]}}</span>
                </template>
              </el-table-column>
            </el-table>
        </div>
      </div>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button class="d_footer_cancel" @click="close">{{lang.PushMessage_Cancel}}</el-button>
      <el-button class="d_footer_sure"  @click="confirm">{{lang.PushMessage_Save}}</el-button>
    </span>
  </el-dialog>
</template>

<script>
import searchForm from '@/views/push-message/components/search-form.vue'

export default {
  name: 'dialogRelateTable',
  components: { searchForm },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    appendToBody: {
      type: Boolean,
      default: false
    },
    config: {
      type: Object,
      default: () => ({
        searchList: []
      })
    },
  },
  data() {
    return {
      lang: JSON.parse(localStorage.getItem('languages'))[localStorage.getItem('currentLang')],
      tableDataMultipleSelection: [],
      ReceiveDataMultipleSelection: [],
    }
  },
  methods: {
    open () {
      this.$emit('searchData', this.config.formData)
    },
    close () {
      // // this.config.receiveData = []
      // this.formData = {
      //   EntityId: null,
      //   AlarmType: null,
      //   DataType: null,
      //   Keyword: '',
      // },
      this.$emit('close')
    },
    confirm () {
      this.$emit('confirm', this.config.receiveData)
    },
    searchData(formData) {
      this.$emit('searchData', this.config.formData)
    },
    handleTableDataSelection (val) {
      this.tableDataMultipleSelection = val;
    },
    addToReceiveData() {
      // if (this.config.receiveData.length === 0) {
      //   this.config.receiveData = this.config.receiveData.concat(this.tableDataMultipleSelection)
      // } else {
      //   this.tableDataMultipleSelection.forEach(item => {
      //     let index = this.config.receiveData.findIndex(f => f.ID === item.ID)
      //     if (index === -1) { // 不存在，添加
      //       this.config.receiveData.push(item)
      //     }
      //   })
      // }
      this.$emit('addToReceiveData', this.tableDataMultipleSelection)
      this.$refs.sendTable.clearSelection()
      this.tableDataMultipleSelection = []
    },
    handleReceiveDataSelection (val) {
      this.ReceiveDataMultipleSelection = val
    },
    removeReceiveData () {
      // this.ReceiveDataMultipleSelection.forEach(item => {
      //   let index = this.config.receiveData.findIndex(f => f.ID === item.ID)
      //   this.config.receiveData.splice(index, 1)
      // })
      this.$emit('removeReceiveData', this.ReceiveDataMultipleSelection)
    },
  }
}
</script>

<style lang='scss' scoped>
.wrap {
  height: 600px;
  .wrap_top {
    height: calc(100% / 2 - 33px);
    border: 1px solid #C4C4C4;
    padding: 0 20px 15px 20px;
  }
  .wrap_middle {
    height: 66px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .wrap_bottom {
    height: calc(100% / 2 - 33px);
    border: 1px solid #C4C4C4;
    padding: 0 20px 15px 20px;
  }
  .wrap_block {
    height: 60px;
    display: flex;
    align-items: center;
    >div+div {
      margin-right: 15px;
    }
    .wrap_block_label {
      width: 100%;
    }
    .wrap_block_select {
      width: 190px;
    }
    .wrap_block_input {
      width: 260px;
    }
  }
  .wrap_main {
    height: calc(100% - 60px);
  }
}
.color_blue {
  color: #386DF0;
}
</style>