<template>
  <div class="push-left" >
    <div class="push_header">
      <span class="push_title" >推送分组</span>
      <div class="btns" >
        <div class="btn_add" @click="openGroup" >
          <img src="../../../assets/images/组 11@2x.png" />
        </div>
        <div class="btn_upd" @click="editGroup" >
          <img src="../../../assets/images/形状 7@2x.png" />
        </div>
        <div class="btn_del" @click="delGroup">
          <img src="../../../assets/images/icon_dell.png" />
        </div>
      </div>
    </div>
    <div class="push_main">
      <el-table
        ref="table"
        class="common_table"
        :data="tableData"
        :border="true"
        height="100%"
        highlight-current-row
        @row-click="tableRowClick"
        :header-cell-style="{ background: '#5A6C98', color: '#FFFFFF' }"
        tooltip-effect="dark"
      >
        <el-table-column label="序号" show-overflow-tooltip align="center" min-width="40">
          <template slot-scope="scope">{{scope.$index + 1}}</template>
        </el-table-column>
        <el-table-column prop="IsLive" show-overflow-tooltip label="操作" align="center">
          <template slot-scope="scope">
            <div class="slot_switch" >
              <el-switch
                v-model="scope.row.IsLive"
                inactive-text="暂停"
                active-text="启用"
                inactive-color="#DCDCDC"
                active-color="#D9E2FA"
                class="my-switch"
                @change="changeSwitch(scope.row, $event)"
              ></el-switch>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="Name" :show-overflow-tooltip="true" label="分组名称" ></el-table-column>
      </el-table>
    </div>

    <!-- 弹窗 -->
    <dialog-group :visible="groupShow" :title="groupTitle" :formData="formData" @close="closeGroup" @confirm="confirmGroup" />
  </div>
</template>

<script>
import { dialogGroup } from '@/views/push-message/dialogs/index'
import { addGroup, delGroup, updGroup, switchGroupPush } from '@/api/push-message/index'

export default {
  name: 'PushLeftGroup',
  components: { dialogGroup },
  props: {
    tableData: {
      type: Array,
      default: () => []
    },
    currentRow: {
      type: Object,
      default: () => {}
    },
    config: {
      type: Object,
      default: () => {}
    },
  },
  data() {
    return {
      lang: JSON.parse(localStorage.getItem('languages'))[localStorage.getItem('currentLang')],
      groupShow: false,
      groupTitle: '',
      formData: {
        CreateTime: "",
        Id: "",
        IsLive: null,
        Name: "",
        Sequence: null,
        Type: null,
      },
    }
  },
  methods: {
    tableRowClick(row) {
      this.$emit('rowClick', row)
    },
    openGroup() {
      this.groupTitle = '新增推送分组'
      this.groupShow = true
      this.formData = {
        CreateTime: "",
        Id: "",
        IsLive: null,
        Name: "",
        Sequence: null,
        Type: null,
      }
    },
    editGroup() {
      if (this.currentRow === null) {
        this.message_WARN(this, '请先选择分组')
        return
      }
      this.groupTitle = '编辑推送分组'
      this.formData = {
        CreateTime: this.currentRow.CreateTime,
        Id: this.currentRow.Id,
        IsLive: this.currentRow.IsLive,
        Name: this.currentRow.Name,
        Sequence: this.currentRow.Sequence,
        Type: this.currentRow.Type,
      }
      this.groupShow = true
    },
    delGroup () {
      if (this.currentRow === null) {
        this.message_WARN(this, '请先选择分组')
        return
      }
      let $this = this
      this.confirm_Pop(this, '是否确认删除选中分组？', function () {
        delGroup([$this.currentRow.Id]).then(res => {
          if (res.data.code === 0) {
            $this.message_OK($this, '删除成功')
            $this.$emit('refreshData')
          } else {
            $this.message_ERROR($this, res.data.msg)
          }
        })
      })
    },
    changeSwitch (row, value) {
      let $this = this
      let postData = {
        EntityId: row.Id,
        IsLive: value
      }
      switchGroupPush(postData).then(res => {
        // $this.message_OK($this, '操作成功')
        // $this.$emit('refreshData')
      })
    },
    closeGroup () {
      this.groupTitle = ''
      this.groupShow = false
      this.formData = {
        CreateTime: "",
        Id: "",
        IsLive: null,
        Name: "",
        Sequence: null,
        Type: null,
      }
    },
    confirmGroup (data, title) {
      let $this = this
      /* 新增 */
      if (title === '新增推送分组') {
        let postData = {
          Name: data.Name,
        }
        if (this.config.origin === '报警消息推送') {
          postData.Type = 1
        }
        if (this.config.origin === '代办消息推送') {
          postData.Type = 2
        }
        addGroup(postData).then(res => {
          if (res.data.code === 0) {
            $this.message_OK($this, '新增分组成功')
            $this.$emit('refreshData')
            $this.closeGroup()
          } else {
            $this.message_ERROR($this, res.data.msg)
          }
        })
      }
      /* 编辑 */
      if (title === '编辑推送分组') {
        let postData = {
          Id: data.Id,
          Name: data.Name,
          IsLive: data.IsLive
        }
        updGroup(postData).then(res => {
          if (res.data.code === 0) {
            $this.message_OK($this, '编辑分组成功')
            $this.$emit('refreshData')
            $this.closeGroup()
          } else {
            $this.message_ERROR($this, res.data.msg)
          }
        })
      }
    }
  }
}
</script>

<style lang='scss' scoped>
@import "@/assets/style/push-message.scss";
</style>