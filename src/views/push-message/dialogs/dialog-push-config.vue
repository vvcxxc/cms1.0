<template>
  <el-dialog
    :title="title"
    :visible="visible"
    custom-class="common_dialog"
    @open="open"
    @close="close"
    width="1100px"
    top="8vh"
  >
    <div class="wrap" >
      <div class="wrap_row" >
        <div class="wrap_item_label">推送条件：</div>
        <div class="content_row_block" >
          <el-select class="common_select wrap_item_condition" v-model="formData.ScmsMsgPushConfig.ConditionType" >
            <el-option
              v-for="item in config.select.deliverys"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <template v-if="config.origin === '报警消息推送'" > <!-- 报警消息推送处理 -->
            <span v-if="formData.ScmsMsgPushConfig.ConditionType === 4" >，即报警触发超过 <el-input style="width:180px" v-model="formData.ScmsMsgPushConfig.PushConditionConfig.Timeout"  class="common_input">
                <template slot="append">
                  <el-select class="common_select" style="width:80px"  v-model="formData.ScmsMsgPushConfig.PushConditionConfig.Unit" >
                    <el-option
                      v-for="item in timeType"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </template>
              </el-input>无人确认时
            </span>
            <span v-if="formData.ScmsMsgPushConfig.ConditionType === 5" >，即报警
            <el-select class="common_select" style="width:80px"  v-model="formData.ScmsMsgPushConfig.PushConditionConfig.Action" >
              <el-option
                v-for="item in config.select.triggers"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            超过
            <el-input style="width:180px" v-model="formData.ScmsMsgPushConfig.PushConditionConfig.Timeout" class="common_input">
                <template slot="append">
                  <el-select class="common_select" style="width:80px"  v-model="formData.ScmsMsgPushConfig.PushConditionConfig.Unit" >
                    <el-option
                      v-for="item in timeType"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </template>
              </el-input>仍未恢复时
            </span>
          </template>

          <template v-if="config.origin === '代办消息推送'" > <!-- 报警消息推送处理 -->
            <span v-if="formData.ScmsMsgPushConfig.ConditionType === 4" >，即代办
            <el-select class="common_select" style="width:140px"  v-model="formData.time" >
              <el-option
                v-for="item in config.select.triggers"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            超过
            <el-input style="width:180px" class="common_input">
                <template slot="append">
                  <el-select class="common_select" style="width:80px"  v-model="formData.time" >
                    <el-option
                      v-for="item in timeType"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </template>
              </el-input>无人确认时
            </span>
            <span v-if="formData.ScmsMsgPushConfig.ConditionType === 5" >，即代办
            <el-select class="common_select" style="width:140px"  v-model="formData.time" >
              <el-option
                v-for="item in config.select.triggers"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            超过
            <el-input style="width:180px" class="common_input">
                <template slot="append">
                  <el-select class="common_select" style="width:80px"  v-model="formData.time" >
                    <el-option
                      v-for="item in timeType"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </template>
              </el-input>无人处理时
            </span>
          </template>

        </div>
      </div>

      <div class="wrap_row wrap_item" >
        <div class="wrap_item_label">推送内容</div>
      </div>

      <div class="wrap_content">
        <div class="content_left">
          <div class="content_row" >推送消息格式</div>
          <div class="content_row" >
            <div class="content_row_label" >标题：</div>
            <div class="content_row_block" >
                <div class="content_row_title" id="rowTitle" :contenteditable="true" @click="clickEdit" @blur="blurEdit">
              </div>
            </div>
          </div>
          <div class="content_row_main" >
            <div class="content_row_label" >正文：</div>
            <!-- <div class="content_row_text" contenteditable id="rowText" @click="handleClick" @keydown.right="handleKeyRight" @keydown.delete="handleDelete" >
              <template v-for="(item, index) in textData" >
                <span :key="index" :data-index="item.id" :class="{color_yellow: item.isAdd}" @click.stop="setSelect">{{item.name}}</span>
              </template>
            </div> -->
            <!-- <div class="content_row_text" id="rowText" :contenteditable="false" @keydown.delete="handleDelete" >
              <template v-for="(item, index) in textData" >
                <span :key="index" class="text_item"  :data-index="item.id" :contenteditable="true" :class="{color_yellow: item.isAdd}">{{item.name}}</span>
              </template>
            </div> -->
            <div class="content_row_text" id="rowText" :contenteditable="true" @click="clickEdit" @blur="blurEdit">
              <!-- <template v-for="(item, index) in textData" >
                <template v-if="index === 0 " >&zwnj;</template>
                  <span :key="index" class="text_item" tab-index="-1" :data-index="item.id" :contenteditable="false" :class="{color_yellow: item.isAdd}">{{item.name}}</span>
                <template v-if="index === textData.length - 1" >&zwnj;</template>
              </template> -->
            </div>
            <span id="hideDom" class="hideDom" ></span>
          </div>
        </div>
        <div class="content_right">
          <div class="content_row" >推送信息配置</div>
          <div class="content_row_table" >
            <el-table
              ref="table"
              class="common_table"
              :data="pushInfoData"
              :border="true"
              height="100%"
              :header-cell-style="{ background: '#DCF0F9', color: '#4976E5' }"
              tooltip-effect="dark"
            >
              <el-table-column label="序号" show-overflow-tooltip align="center" width="70px">
                <template slot-scope="scope">{{scope.$index + 1}}</template>
              </el-table-column>
              <el-table-column prop="Key" show-overflow-tooltip label="内容信息" align="center"></el-table-column>
              <el-table-column prop="title1" show-overflow-tooltip label="标题" align="center" width="80px">
                <template slot-scope="scope">
                  <span class="color_yellow" @click="addTitle(scope.row)">添加</span>
                </template>
              </el-table-column>
              <el-table-column prop="title2" show-overflow-tooltip label="正文" align="center" width="80px">
                <template slot-scope="scope">
                  <span class="color_yellow" @click="addText(scope.row)">添加</span>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>

      <div class="wrap_row" >
        <div class="wrap_item_label">推送名单：</div>
        <div class="wrap_item_list" >
          <div class="item_list_input" >{{formData.ShowUsers}}</div>
          <div class="item_list_choice" @click="openUser">选择</div>
        </div>
      </div>

      <div class="wrap_row" >
        <div class="wrap_item_label">推送方式：</div>
        <div class="wrap_item_remind" >
          <!-- <el-checkbox-group class="common_checkbox_group"  v-model="checkList">
            <el-checkbox label="APP推送"></el-checkbox>
            <el-checkbox label="短信"></el-checkbox>
          </el-checkbox-group> -->
          <el-checkbox class="common_checkbox" v-model="formData.ScmsMsgPushConfig.IsAPP">APP推送</el-checkbox>
        </div>
      </div>

      <div class="wrap_row" >
        <div class="wrap_item_label">推送提醒：</div>
        <div class="content_row_block" >
          <el-select class="common_select wrap_item_condition" v-model="formData.ScmsMsgPushConfig.ReminderType" >
            <el-option
              v-for="item in reminds"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <span v-if="formData.ScmsMsgPushConfig.ReminderType === 1" >&nbsp;，即满足推送条件时仅推送提醒一次</span>
          <span v-if="formData.ScmsMsgPushConfig.ReminderType === 2" >&nbsp;，即每
            <el-input style="width:180px" v-model="formData.ScmsMsgPushConfig.PushReminderConfig.Cycle" class="common_input">
              <template slot="append">
                 <el-select class="common_select" style="width:80px" v-model="formData.ScmsMsgPushConfig.PushReminderConfig.Unit" >
                  <el-option
                    v-for="item in timeType"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </template>
            </el-input>
            为周期，若仍满足推送条件则再次推送，推送上限次数为&nbsp;<el-input style="width:80px" v-model="formData.ScmsMsgPushConfig.PushReminderConfig.UpperLimit" class="common_input" />&nbsp;次
          </span>
        </div>
      </div>

    </div>
    <span slot="footer" class="dialog-footer">
      <el-button class="d_footer_cancel" @click="close">取消</el-button>
      <el-button class="d_footer_sure" @click="confirm">确定</el-button>
    </span>
    <dialog-relate-table
      :appendToBody="true"
      ref="relateDialog"
      :visible="showUser"
      :config="tableConfig"
      @addToReceiveData="addToReceiveData"
      @removeReceiveData="removeReceiveData"
      @searchData="searchRelateData"
      @close="closeRelateTable"
      @confirm="confirmRelateTable"
    />
  </el-dialog>
</template>

<script>
import { createRandomId } from '@/utils/index'
import dialogRelateTable from './dialog-relate-table.vue'
import { getRoles } from '@/api/common.js'
import { getPushUsers } from '@/api/push-message/index'

export default {
  name: 'dialogPushConfig',
  components: { dialogRelateTable },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    config: {
      type: Object,
      default: () => {}
    },
    formData: {
      type: Object,
      default: () => {}
    },
    pushInfoData: {
      type: Array,
      default: () => {}
    },
  },
  data() {
    return {
      showUser: false,
      textarea: '',
      textData: [
        {
          id: 0,
          isAdd: true,
          name: '@报警时间',
        },
        {
          id: 1,
          isAdd: true,
          name: '@报警变量',
        },
        {
          id: 2,
          isAdd: true,
          name: '@报警地址',
        },
        {
          id: 3,
          isAdd: true,
          name: '@报警组',
        },
      ],
      reminds: [
        {
          label: '弱提醒',
          value: 1
        },
        {
          label: '强提醒',
          value: 2
        },
      ],
      timeType: [
        {
          label: '分钟',
          value: 'M'
        },
        {
          label: '小时',
          value: 'H'
        }
      ],
      checkList: [],
      tableConfig: {
        title: '推送用户配置', //第一个表格处标题
        subTitle: '已选用户', // 第一个表格处标题
        formConfig: {   // 第一个表格查询内容 1.form: 查询控件+查询按钮 2.buttons: 按钮
          form: [
            {
              type: 'select',
              width: '280px',
              labelWidth: '90px',
              prop: 'RoleId',
              name: '用户角色',
              options: []
            },
            {
              type: 'input',
              width: '280px',
              prop: 'Keyword',
            },
            {
              type: 'btn_plain',
              name: '查询',
            }
          ],
        },
        formData: {
          RoleId: null,
          Keyword: '',
        },
        sendData: [],
        receiveData: [],
        tableColumns: [  // 表头
          {
            label: '序号',
            width: '60px',
            index: '',
          },
          {
            label: '用户名称',
            prop: 'RoleName'
          },
          {
            label: '角色',
            prop: 'UserName'
          },
          {
            label: '手机',
            prop: 'Phone'
          },
          {
            label: '邮箱',
            prop: 'Email'
          },
        ],
      },
      lastselection: '',
    }
  },
  methods: {
    open () {
      this.renderEditor('rowTitle', this.formData.ScmsMsgPushConfig.TitleMessageConfigs)
      this.renderEditor('rowText', this.formData.ScmsMsgPushConfig.TextMessageConfigs)
    },
    renderEditor (eleId, data) {
      let $this = this
      this.$nextTick(() => {
        let rowText = document.getElementById(eleId)
        // let lastIndex = data.findLastIndex(f => f.isAdd = true)
        data.forEach((item, index) => {
          if (item.Type === 1) {
            let inp = document.createElement("input")
            inp.setAttribute("value", item.Value)
            inp.setAttribute("class", 'text_item color_yellow')
            inp.setAttribute("disabled", 'true')
            inp.style.width = this.input_resize(item.Value) + 'px'
            rowText.appendChild(inp)
          }
          if (item.Type === 0) {
            let text = document.createTextNode(item.Value)
            rowText.appendChild(text)
          }
        })
      })
    },
    input_resize(html) {
        let hideDom = document.getElementById('hideDom')
        hideDom.innerHTML = html;
        return parseInt(hideDom.getBoundingClientRect().width)
    },
    close () {
      let rowText = document.getElementById('rowText')
      rowText.innerHTML = ''
      let rowTitle = document.getElementById('rowTitle')
      rowTitle.innerHTML = ''
      this.$emit('close')
    },
    confirm () {
      this.getRowTitleFormData()
      this.getRowTextFormData()
      this.$emit('confirm', this.formData)
    },
    getRowTitleFormData() {
      let rowTitle = document.getElementById('rowTitle')
      let $this = this
      this.formData.ScmsMsgPushConfig.TitleMessageConfigs = []
      rowTitle.childNodes.forEach(item => {
        if (item.nodeName === 'INPUT') {
          $this.formData.ScmsMsgPushConfig.TitleMessageConfigs.push({
            Type: 1,
            Value: item.value
          })
        }
        if (item.nodeName === '#text') {
          $this.formData.ScmsMsgPushConfig.TitleMessageConfigs.push({
            Type: 0,
            Value: item.textContent
          })
        }
      })
    },
    getRowTextFormData() {
      let rowText = document.getElementById('rowText')
      let $this = this
      this.formData.ScmsMsgPushConfig.TextMessageConfigs = []
      rowText.childNodes.forEach(item => {
        if (item.nodeName === 'INPUT') {
          $this.formData.ScmsMsgPushConfig.TextMessageConfigs.push({
            Type: 1,
            Value: item.value
          })
        }
        if (item.nodeName === '#text') {
          $this.formData.ScmsMsgPushConfig.TextMessageConfigs.push({
            Type: 0,
            Value: item.textContent
          })
        }
      })
    },
    addTitle(row) {
      let rowTitle = document.getElementById('rowTitle')
      let selObj = window.getSelection()
      // if(this.lastselection === ''){
      //   // 如果div没有光标，则在div内容末尾插入
      //   selObj.selectAllChildren(rowTitle)
      //   this.lastselection = window.getSelection().getRangeAt(0)
      //   selObj.collapseToEnd(this.lastselection)

      // }
      // 创建一个元素
      const span = document.createElement('span')
      span.setAttribute('class', 'text_item color_yellow')
      span.setAttribute('contenteditable', false)
      // span.innerText = `@${row.Key}`
      let inp = document.createElement("input")
      inp.setAttribute("value", '@'+ row.Key)
      inp.setAttribute("class", 'text_item color_yellow')
      inp.setAttribute("disabled", 'true')
      inp.style.width = this.input_resize('@'+ row.Key) + 'px'
      // 将按钮插入
      // this.lastselection.insertNode(inp)
      rowTitle.appendChild(inp)
    },
    addText(row) {
      let rowText = document.getElementById('rowText')
      let selObj = window.getSelection()
      // if(this.lastselection === ''){
      //   // 如果div没有光标，则在div内容末尾插入
      //   selObj.selectAllChildren(rowText)
      //   this.lastselection = window.getSelection().getRangeAt(0)
      //   selObj.collapseToEnd(this.lastselection)

      // }
      // 创建一个元素
      const span = document.createElement('span')
      span.setAttribute('class', 'text_item color_yellow')
      span.setAttribute('contenteditable', false)
      // span.innerText = `@${row.Key}`
      let inp = document.createElement("input")
      inp.setAttribute("value", '@'+ row.Key)
      inp.setAttribute("class", 'text_item color_yellow')
      inp.setAttribute("disabled", 'true')
      inp.style.width = this.input_resize('@'+ row.Key) + 'px'
      // 将按钮插入
      // this.lastselection.insertNode(inp)
      rowText.appendChild(inp)
    },
    /* 富文本部分 */
    blurEdit () {
      // this.lastselection = window.getSelection().getRangeAt(0)
    },
    clickEdit (e) {
      let selObj = window.getSelection()
      let range = selObj.getRangeAt(0)
      if(e.target.nodeName === 'INPUT') {
        // range.setStart(e.target, 0)
        // range.setEnd(e.target, 0)
        range.selectNode(e.target)
        range.setStart(e.target, 0)
        // range.setEnd(e.target, 1)
      }
    },
    handleDelete(e) {
      // e.preventDefault()
      let selObj = window.getSelection ? window.getSelection() : document.selection
      // if(selObj.focusNode.indexOf('&zwnj') !== -1) {
      //   console.log('1111111111')
      // }
      // var range = selObj.createRange ? selObj.createRange() : selObj.getRangeAt(0)
      // range.moveToElementText(selObj.focusNode.parentElement)
      // range.collapse(false);
      // range.select()
      // let range  = selObj.getRangeAt(0)
      // console.log('11111', selObj)
      // let index = Number(selObj.focusNode.parentElement.dataset.index)
      // this.showText = false
      // this.textData.splice(index, 1)
      // this.showText = true
      console.log(selObj.focusNode)
    },
    /* 推送用户配置弹窗 */
    openUser () {
      this.getRoleData()
      this.getTableData()
      this.showUser = true
    },
    getTableData () {
      let $this = this
      let postData = {
        RoleId: this.tableConfig.formData.RoleId,
        Keyword: this.tableConfig.formData.Keyword,
      }
      getPushUsers(postData).then(res => {
        $this.tableConfig.sendData = res.data.data
      })
    },
    getRoleData () {
      let $this = this
      getRoles().then(res => {
        $this.tableConfig.formConfig.form[0].options = res.data.data.map(item => ({
          label: item.SCMSRoleName,
          value: item.SCMSRoleID
        }))
         $this.tableConfig.formConfig.form[0].options.unshift({ label: '不限', value: null})
      })
    },
    addToReceiveData (multipleSelection) {
      if (this.tableConfig.receiveData.length === 0) {
        this.tableConfig.receiveData = this.tableConfig.receiveData.concat(multipleSelection)
      } else {
        multipleSelection.forEach(item => {
          let index = this.tableConfig.receiveData.findIndex(f => f.NO === item.NO)
          if (index === -1) { // 不存在，添加
            this.tableConfig.receiveData.push(item)
          }
        })
      }
    },
    removeReceiveData (multipleSelection) {
      multipleSelection.forEach(item => {
        let index = this.tableConfig.receiveData.findIndex(f => f.NO === item.NO)
        this.tableConfig.receiveData.splice(index, 1)
      })
    },
    searchRelateData (searchData) {
      let $this = this
      getPushUsers(searchData).then(res => {
        $this.tableConfig.sendData = res.data.data
      })
    },
    closeRelateTable() {
      this.showUser = false
    },
    confirmRelateTable() {
      this.closeRelateTable()
    },
  }
}
</script>

<style lang='scss' scoped>
.wrap_row {
  display: flex;
  align-items: center;
  position: relative;
  box-sizing: border-box;
  height: 50px;
  .wrap_item_label {
    width: 80px;
  }
  .wrap_item_condition {
    width: 200px;
  }
}
.hideDom {
  position: fixed;
  left: -50%;
  top: -50%;
  opacity: 0;
}
.wrap_item {
  padding-left: 15px;
  font-weight: bold;
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
  height: 360px;
  padding: 0 20px 15px 20px;
  border: 1px solid #C4C4C4;
  display: flex;
  margin-bottom: 10px;
  .content_left {
    width: 50%;
  }
  .content_right {
    width: 50%;
    padding-left: 20px;
  }
}
.content_row {
  height: 40px;
  display: flex;
  align-items: center;
}
.content_row_label {
  width: 60px;
}
.content_row_block {
  width: 100%;
  height: 42px;
}
.content_row_title {
  width: 100%;
  height: 100%;
  outline: none;
  background: #fff;
  padding-top: 10px;
  overflow: auto
}
.content_row_text {
  width: 100%;
  border: 1px solid #DCDFE6;
  outline: none;
  background: #fff;
}
.content_row_main {
  display: flex;
  margin-top: 10px;
  height: calc(100% - 40px - 40px - 10px);
}
.content_row_table {
  width: 100%;
  height: calc(100% - 40px);
}
::v-deep .color_yellow {
  cursor: pointer;
  color: #FFA34A
}
::v-deep .text_item {
 background: transparent;
 border: none;
}

.wrap_item_list {
  width: 100%;
  display: flex;
  align-items: center;
}

.item_list_input {
  width: calc(100% - 120px);
  height: 40px;
  background: #fff;
  padding-left: 20px;
  border: 1px solid #cccccc;
  border-right: none;
  display: flex;
  align-items: center;
}
.item_list_choice {
  height: 40px;
  cursor: pointer;
  line-height: 40px;
  width: 120px;
  text-align: center;
  background: #CBD5EE;
  color: #386DF0;
}
</style>