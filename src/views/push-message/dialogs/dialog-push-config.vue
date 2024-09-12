<template>
  <el-dialog
    :title="title"
    :visible="visible"
    v-el-drag-dialog
    custom-class="common_dialog"
    @open="open"
    @close="close"
    width="1100px"
    top="8vh"
  >
    <div class="wrap" >
      <div class="wrap_row" >
        <div class="wrap_item_label">{{lang.PushMessage_PushCondition}}：</div>
        <div class="content_row_block content_width" >
          <el-select class="common_select wrap_item_condition" v-model="formData.ScmsMsgPushConfig.ConditionType" 
            @change="changePushCondition"
          >
            <el-option
              v-for="item in config.select.deliverys"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <template v-if="config.origin === '报警消息推送'" > <!-- 报警消息推送处理 -->
            <span v-if="formData.ScmsMsgPushConfig.ConditionType === 4" >，{{lang.PushMessage_AlarmTriggerMorethan}} <el-input style="width:200px" v-model="formData.ScmsMsgPushConfig.PushConditionConfig.Timeout"  class="common_input">
                <template slot="append">
                  <el-select class="common_select" style="width:100px"  v-model="formData.ScmsMsgPushConfig.PushConditionConfig.Unit" >
                    <el-option
                      v-for="item in timeType"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </template>
              </el-input>{{lang.PushMessage_NooneConfirm}}
            </span>
            <span v-if="formData.ScmsMsgPushConfig.ConditionType === 5" >，{{lang.PushMessage_IEAlarm}}
            <el-select class="common_select" style="width:100px"  v-model="formData.ScmsMsgPushConfig.PushConditionConfig.Action" >
              <el-option
                v-for="item in config.select.triggers"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            {{lang.PushMessage_exceed}}
            <el-input style="width:200px" v-model="formData.ScmsMsgPushConfig.PushConditionConfig.Timeout" class="common_input">
                <template slot="append">
                  <el-select class="common_select" style="width:100px"  v-model="formData.ScmsMsgPushConfig.PushConditionConfig.Unit" >
                    <el-option
                      v-for="item in timeType"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </template>
              </el-input>{{lang.PushMessage_WhenNotRecovered}}
            </span>
          </template>

          <template v-if="config.origin === '代办消息推送'" > <!-- 报警消息推送处理 -->
            <!-- <span v-if="formData.ScmsMsgPushConfig.ConditionType === 102" >，{{lang.PushMessage_IEAgency}}
            <el-select class="common_select" style="width:140px"  v-model="formData.ScmsMsgPushConfig.PushConditionConfig.Action" >
              <el-option
                v-for="item in config.select.triggers"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            {{lang.PushMessage_exceed}}
            <el-input style="width:200px" v-model="formData.ScmsMsgPushConfig.PushConditionConfig.Timeout" class="common_input">
                <template slot="append">
                  <el-select class="common_select" style="width:100px"  v-model="formData.ScmsMsgPushConfig.PushConditionConfig.Unit" >
                    <el-option
                      v-for="item in timeType"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </template>
              </el-input>{{lang.PushMessage_NooneConfirm}}
            </span> -->
            <span v-if="formData.ScmsMsgPushConfig.ConditionType === 103" >，{{lang.PushMessage_IEAgency}}
            <el-select class="common_select" style="width:140px"  v-model="formData.ScmsMsgPushConfig.PushConditionConfig.Action" >
              <el-option
                v-for="item in config.select.triggers"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            {{lang.PushMessage_exceed}}
            <el-input style="width:200px" v-model="formData.ScmsMsgPushConfig.PushConditionConfig.Timeout" class="common_input">
                <template slot="append">
                  <el-select class="common_select" style="width:100px"  v-model="formData.ScmsMsgPushConfig.PushConditionConfig.Unit" >
                    <el-option
                      v-for="item in timeType"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </template>
              </el-input>{{lang.PushMessage_NooneDealed}}
            </span>
          </template>

        </div>
      </div>

      <div class="wrap_row wrap_item" >
        <div class="wrap_item_label">{{lang.PushMessage_PushContent}}</div>
      </div>

      <div class="wrap_content">
        <div class="content_left">
          <div class="content_row" >{{lang.PushMessage_PushMsgFormat}}</div>
          <div class="content_row" >
            <div class="content_row_label" >{{lang.PushMessage_Title}}：</div>
            <div class="content_row_block" >
              <el-tooltip class="item" effect="dark" placement="bottom">
                <div slot="content" >
                  <span v-for="(item, index) in pushMessageTitleText" :key="index" >
                    {{item.Value}}  <template v-if="item.Value === '\r\n' || item.Value === ''" ><br/></template>
                  </span>
                </div>
                <div class="content_row_title" id="rowTitle" :contenteditable="true" @click="clickEdit" @keyup="changePushMessageTitle"></div>
              </el-tooltip>
            </div>
          </div>
          <div class="content_row_main" >
            <div class="content_row_label" >{{lang.PushMessage_MainText}}：</div>
            <div class="content_row_text" id="rowText" :contenteditable="true" @click="clickEdit" @keyup="delHtml" ></div>
            <span id="hideDom" class="hideDom" ></span>
          </div>
        </div>
        <div class="content_right">
          <div class="content_row" >{{lang.PushMessage_PushInfoConfig}}</div>
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
              <el-table-column :label="lang.PushMessage_SerialNumber" show-overflow-tooltip align="center" width="120px">
                <template slot-scope="scope">{{scope.$index + 1}}</template>
              </el-table-column>
              <el-table-column prop="Translated" show-overflow-tooltip :label="lang.PushMessage_ContentMessage" align="center"></el-table-column>
              <el-table-column prop="title1" show-overflow-tooltip :label="lang.PushMessage_Title" align="center" width="80px">
                <template slot-scope="scope">
                  <span class="color_yellow" @click="addTitle(scope.row)">{{lang.RoleManage_Add}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="title2" show-overflow-tooltip :label="lang.PushMessage_MainText" align="center" width="80px">
                <template slot-scope="scope">
                  <span class="color_yellow" @click="addText(scope.row)">{{lang.RoleManage_Add}}</span>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>

      <div class="wrap_row" >
        <div class="wrap_item_label">{{lang.PushMessage_PushList}}：</div>
        <div class="wrap_item_list content_width" >
          <div class="item_list_input" >{{formData.ShowUsers}}</div>
          <div class="item_list_choice" @click="openUser">{{lang.ProcessParameterConfigure_UnQualitiedReason_Select}}</div>
        </div>
      </div>

      <div class="wrap_row" >
        <div class="wrap_item_label" >{{lang.PushMessage_PushMode}}：</div>
        <div class="wrap_item_remind" >
          <!-- <el-checkbox-group class="common_checkbox_group"  v-model="checkList">
            <el-checkbox label="APP推送"></el-checkbox>
            <el-checkbox label="短信"></el-checkbox>
          </el-checkbox-group> -->
          <el-checkbox class="common_checkbox" v-model="formData.ScmsMsgPushConfig.IsAPP">{{lang.PushMessage_AppPush}}</el-checkbox>
        </div>
      </div>

      <div class="wrap_row" >
        <div class="wrap_item_label">{{lang.PushMessage_PushRemind}}：</div>
        <div class="content_row_block content_width" >
          <el-select class="common_select wrap_item_reminder" :disabled="pushRemindConfig.disabled" v-model="formData.ScmsMsgPushConfig.ReminderType">
            <el-option
              v-for="item in reminds"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <span v-if="formData.ScmsMsgPushConfig.ReminderType === 1" >&nbsp;，{{lang.PushMessage_WeakRemark}}</span>
          <span v-if="formData.ScmsMsgPushConfig.ReminderType === 2" >&nbsp;，{{lang.PushMessage_StrongRemark1}}
            <el-input style="width:200px" v-model="formData.ScmsMsgPushConfig.PushReminderConfig.Cycle" class="common_input">
              <template slot="append">
                 <el-select class="common_select" style="width:100px" v-model="formData.ScmsMsgPushConfig.PushReminderConfig.Unit" >
                  <el-option
                    v-for="item in timeType"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </template>
            </el-input>
            {{lang.PushMessage_StrongRemark}}&nbsp;<el-input style="width:80px" v-model="formData.ScmsMsgPushConfig.PushReminderConfig.UpperLimit" class="common_input" />&nbsp;{{lang.PushMessage_StrongRemark2}}
          </span>
        </div>
      </div>

    </div>
    <span slot="footer" class="dialog-footer">
      <el-button class="d_footer_cancel" @click="close">{{lang.PopupCommon_Cancel}}</el-button>
      <el-button class="d_footer_sure" @click="confirm">{{lang.PopupCommon_Sure}}</el-button>
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
import { getPushUsers, getPushUserByIds } from '@/api/push-message/index'

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
      lang: JSON.parse(localStorage.getItem('languages'))[localStorage.getItem('currentLang')],
      showUser: false,
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
              inputWidth: '190px',
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
      pushRemindConfig: { // 推送提醒相关配置
        disabled: false // 是否禁用
      },
      cloneFormData: {},
    }
  },
  methods: {
    // 推送消息格式-标题内容改变
    changePushMessageTitle() {
      this.getRowTitleFormData()
      let rowTitle = document.getElementById('rowTitle')
      if (rowTitle.innerHTML === '<br>') {
        rowTitle.innerHTML = ''
      }
      if (rowTitle.lastChild && rowTitle.lastChild.nodeName === 'DIV') {
        // if (rowTitle.lastChild.innerHTML === '<br>') {
        //   rowTitle.removeChild(rowTitle.lastChild)
        // } else {
          let str = rowTitle.lastChild.innerHTML
          rowTitle.lastChild.innerHTML = ''
          let pre = document.createElement("pre")
          pre.style.fontFamily = '思源黑体  CN'
          pre.style.display = 'inline-block'
          pre.innerHTML = str
          rowTitle.appendChild(pre)
        // }
      }
      const title = this.formData.ScmsMsgPushConfig.TitleMessageConfigs
    },
    delHtml (e) {
      let rowText = document.getElementById('rowText')
      if (rowText.innerHTML === '<br>') {
        rowText.innerHTML = ''
      }
      if (e.keyCode === 13) { // enter键 解决首行头部换行光标消失问题
        if (rowText.firstChild.nodeName === 'DIV' && rowText.firstChild.firstChild.nodeName === 'PRE') {
          rowText.firstChild.innerHTML = '<br/>'
        }
      }
    },
    changePushCondition(val) {
      switch (this.config.origin) {
        case '报警消息推送':
          if ([2, 3].includes(val)) {
            this.pushRemindConfig.disabled = true
            this.formData.ScmsMsgPushConfig.ReminderType = this.reminds[0].value
          } else {
            this.pushRemindConfig.disabled = false
            // this.formData.ScmsMsgPushConfig.ReminderType = this.reminds[1].value
            if (this.title === '新建推送配置') { // 设置报警超时未确认、报警超时未恢复默认值  -- 新增
              if (val === 4) {
                this.formData.ScmsMsgPushConfig.PushConditionConfig.Unit = 'M'
                this.formData.ScmsMsgPushConfig.PushConditionConfig.Timeout = 5
              }
              if (val === 5) {
                this.formData.ScmsMsgPushConfig.PushConditionConfig.Unit = 'M'
                this.formData.ScmsMsgPushConfig.PushConditionConfig.Timeout = 30
              }
            }
            if (this.title === '编辑推送配置') {
              if (val === this.cloneFormData.ScmsMsgPushConfig.ConditionType) {
                this.formData.ScmsMsgPushConfig.PushConditionConfig.Unit = this.cloneFormData.ScmsMsgPushConfig.PushConditionConfig.Unit
                this.formData.ScmsMsgPushConfig.PushConditionConfig.Timeout = this.cloneFormData.ScmsMsgPushConfig.PushConditionConfig.Timeout
              } else {
                if (val === 4) {
                  this.formData.ScmsMsgPushConfig.PushConditionConfig.Unit = 'M'
                  this.formData.ScmsMsgPushConfig.PushConditionConfig.Timeout = 5
                }
                if (val === 5) {
                  this.formData.ScmsMsgPushConfig.PushConditionConfig.Unit = 'M'
                  this.formData.ScmsMsgPushConfig.PushConditionConfig.Timeout = 30
                }
              }
            }
          }
          break;
        case '代办消息推送':
          if ([102].includes(val)) {
            this.pushRemindConfig.disabled = true
            this.formData.ScmsMsgPushConfig.ReminderType = this.reminds[0].value
          } else {
            this.pushRemindConfig.disabled = false
            // this.formData.ScmsMsgPushConfig.ReminderType = this.reminds[1].value
            if (this.title === '新建推送配置') { // 设置报警超时未确认、报警超时未恢复默认值  -- 新增
              if (val === 103) {
                this.formData.ScmsMsgPushConfig.PushConditionConfig.Unit = 'M'
                this.formData.ScmsMsgPushConfig.PushConditionConfig.Timeout = 30
              }
            }
            if (this.title === '编辑推送配置') {
              if (val === this.cloneFormData.ScmsMsgPushConfig.ConditionType) {
                this.formData.ScmsMsgPushConfig.PushConditionConfig.Unit = this.cloneFormData.ScmsMsgPushConfig.PushConditionConfig.Unit
                this.formData.ScmsMsgPushConfig.PushConditionConfig.Timeout = this.cloneFormData.ScmsMsgPushConfig.PushConditionConfig.Timeout
              } else {
                if (val === 103) {
                  this.formData.ScmsMsgPushConfig.PushConditionConfig.Unit = 'M'
                  this.formData.ScmsMsgPushConfig.PushConditionConfig.Timeout = 30
                }
              }
            }
          }
          break;
        default:
          break;
      }
    },
    open () {
      this.reminds = [
        {
          label: this.lang.PushMessage_WeakRemind,
          value: 1
        },
        {
          label: this.lang.PushMessage_StrongRemind,
          value: 2
        },
      ]
      this.timeType = [
        {
          label: this.lang.PushMessage_Minute,
          value: 'M'
        },
        {
          label: this.lang.PushMessage_Hour,
          value: 'H'
        }
      ],
      this.tableConfig =  {
        title: this.lang.PushMessage_PushUserConfig, //第一个表格处标题
        subTitle: this.lang.PushMessage_ChoseUser, // 第一个表格处标题
        formConfig: {   // 第一个表格查询内容 1.form: 查询控件+查询按钮 2.buttons: 按钮
          form: [
            {
              type: 'select',
              inputWidth: '190px',
              prop: 'RoleId',
              name: this.lang.PushMessage_UserRole,
              options: []
            },
            {
              type: 'input',
              width: '280px',
              prop: 'Keyword',
            },
            {
              type: 'btn_plain',
              name: this.lang.PushMessage_Query,
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
            label: this.lang.PushMessage_SerialNumber,
            width: '120px',
            index: '',
          },
          {
            label: this.lang.PushMessage_UserName,
            prop: 'UserName'
          },
          {
            label: this.lang.PushMessage_Role,
            prop: 'RoleName'
          },
          {
            label: this.lang.PushMessage_Phone,
            prop: 'Phone'
          },
          {
            label: this.lang.PushMessage_Email,
            prop: 'Email'
          },
        ],
      }
      if(this.title === '编辑推送配置') {
        this.cloneFormData = structuredClone(this.formData) // eslint-disable-line
      }
      this.changePushCondition(this.formData.ScmsMsgPushConfig.ConditionType) // 设置推送提醒回显
      this.renderEditor('rowTitle', this.formData.ScmsMsgPushConfig.TitleMessageConfigs)
      this.renderEditor('rowText', this.formData.ScmsMsgPushConfig.TextMessageConfigs)
    },
    renderEditor (eleId, data) {
      let $this = this
      this.$nextTick(() => {
        let rowText = document.getElementById(eleId)
        let rowIndex = 0  // 使用rowIndex设置换行，如果rowIndex === 0 说明这是一个换行转折，将div设置为空。如果rowIndex>=1,则需要添加div进行换行
        data.forEach((item, index) => {
          if (item.Type === 1) {
            rowIndex = 0
            let inp = document.createElement("input")
            inp.setAttribute("value", item.Value)
            inp.setAttribute("class", 'text_item color_yellow')
            inp.setAttribute("disabled", 'true')
            inp.style.width = this.input_resize(item.Value) + 'px'
            rowText.appendChild(inp)
          }
          if (item.Type === 0) {
            if (item.Value.indexOf("\r\n") !== -1) {
              let div = document.createElement("div")
              if (rowIndex >= 1) {
                div.innerHTML = '<br>'
              } else {
                div.innerHTML = ''
                rowIndex++
              }
              rowText.appendChild(div)
            } else {
              rowIndex = 0
              let pre = document.createElement("pre")
              pre.style.fontFamily = '思源黑体  CN'
              pre.style.display = 'inline-block'
              pre.innerHTML = item.Value
              rowText.appendChild(pre)
            }
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
      this.cloneFormData = {}
      this.$emit('close')
    },
    confirm () {
      this.getRowTitleFormData()
      this.getRowTextFormData()
      this.$emit('confirm', this.formData)
    },
    getRowTitleFormData() {
      let rowTitle = document.getElementById('rowTitle')
      // let $this = this
      // this.formData.ScmsMsgPushConfig.TitleMessageConfigs = []
      // rowTitle.childNodes.forEach(item => {
      //   if (item.nodeName === 'INPUT') {
      //     $this.formData.ScmsMsgPushConfig.TitleMessageConfigs.push({
      //       Type: 1,
      //       Value: item.value
      //     })
      //   }
      //    if (item.nodeName === 'BR') {
      //      $this.formData.ScmsMsgPushConfig.TitleMessageConfigs.push({
      //       Type: 0,
      //       Value: `\r\n` + item.textContent
      //     })
      //   }
      //   if (item.nodeName === 'DIV') {
      //     if (item.innerHTML === '<br>') {
      //       $this.formData.ScmsMsgPushConfig.TitleMessageConfigs.push({
      //         Type: 0,
      //         Value: `\r\n` + item.textContent
      //       })
      //     } else {
      //       $this.formData.ScmsMsgPushConfig.TitleMessageConfigs.push({
      //         Type: 0,
      //         Value: item.textContent
      //       })
      //     }
      //   }
      //   if (item.nodeName === 'PRE') {
      //     $this.formData.ScmsMsgPushConfig.TitleMessageConfigs.push({
      //       Type: 0,
      //       Value: item.textContent
      //     })
      //   }
      //   if (item.nodeName === '#text') {
      //     $this.formData.ScmsMsgPushConfig.TitleMessageConfigs.push({
      //       Type: 0,
      //       Value: item.textContent
      //     })
      //   }
      // })
      const list = []
      const loop = (childNodes) => {
        for (let i = 0, iLen = childNodes.length; i < iLen; i++) {
          const item = childNodes[i]
          // console.log({
          //   '1完整': item,
          //   '1标签': item.nodeName,
          //   '2内容': item.textContent,
          // });
          const addElement = {
            INPUT: () => {
              list.push({
                Type: 1,
                Value: item.value
              })
            },
            BR: () => {
              list.push({
                Type: 0,
                Value: `\r\n` + item.textContent
              })
            },
            DIV: () => {
              list.push({
                Type: 0,
                Value: `\r\n` /* + item.textContent */
              })
              loop(item.childNodes)
              // console.log('这是div', item.childNodes);
            },
            PRE: () => {
              if (item.childNodes <= 1) {
                list.push({
                  Type: 0,
                  Value: item.textContent
                })
              } else {
                loop(item.childNodes)
              }
            },
            FONT: () => {
              loop(item.childNodes)
            },
            SPAN: () => {
              list.push({
                Type: 0,
                Value: item.textContent
              })
            },
            '#text': () => {
              list.push({
                Type: 0,
                Value: item.textContent
              })
            },
          }
          addElement[item.nodeName]()
        }
      }
      loop(rowTitle.childNodes)
      this.formData.ScmsMsgPushConfig.TitleMessageConfigs = list
    },
    getRowTextFormData() {
      let rowText = document.getElementById('rowText')
      const list = []
      const loop = (childNodes) => {
        for (let i = 0, iLen = childNodes.length; i < iLen; i++) {
          const item = childNodes[i]
          // console.log({
          //   '1完整': item,
          //   '1标签': item.nodeName,
          //   '2内容': item.textContent,
          // });
          const addElement = {
            INPUT: () => {
              list.push({
                Type: 1,
                Value: item.value
              })
            },
            BR: () => {
              list.push({
                Type: 0,
                Value: `\r\n` + item.textContent
              })
            },
            DIV: () => {
              list.push({
                Type: 0,
                Value: `\r\n` /* + item.textContent */
              })
              loop(item.childNodes)
              // console.log('这是div', item.childNodes);
            },
            PRE: () => {
              if (item.childNodes <= 1) {
                list.push({
                  Type: 0,
                  Value: item.textContent
                })
              } else {
                loop(item.childNodes)
              }
            },
            FONT: () => {
              loop(item.childNodes)
            },
            SPAN: () => {
              list.push({
                Type: 0,
                Value: item.textContent
              })
            },
            '#text': () => {
              list.push({
                Type: 0,
                Value: item.textContent
              })
            },
          }
          addElement[item.nodeName]()
        }
      }
      loop(rowText.childNodes)
      this.formData.ScmsMsgPushConfig.TextMessageConfigs = list
    },
    addTitle(row) {
      let rowTitle = document.getElementById('rowTitle')
      // 创建一个元素
      const span = document.createElement('span')
      span.setAttribute('class', 'text_item color_yellow')
      span.setAttribute('contenteditable', false)
      let inp = document.createElement("input")
      inp.setAttribute("value", '@'+ row.Key)
      inp.setAttribute("class", 'text_item color_yellow')
      inp.setAttribute("disabled", 'true')
      inp.style.width = this.input_resize('@'+ row.Key) + 'px'
      // 将按钮插入
      // this.lastselection.insertNode(inp)
      if (rowTitle.lastChild && rowTitle.lastChild.nodeName === 'DIV') {
        if (rowTitle.lastChild.innerHTML === '<br>') {
          rowTitle.removeChild(rowTitle.lastChild)
        } else {
          let str = rowTitle.lastChild.innerHTML
          rowTitle.lastChild.innerHTML = ''
          let pre = document.createElement("pre")
          pre.style.fontFamily = '思源黑体  CN'
          pre.style.display = 'inline-block'
          pre.innerHTML = str
          rowTitle.appendChild(pre)
        }
      }
      rowTitle.appendChild(inp)
      this.changePushMessageTitle()
    },
    addText(row) {
      let rowText = document.getElementById('rowText')
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
      if (rowText.lastChild && rowText.lastChild.nodeName === 'DIV') {
        if (rowText.lastChild.innerHTML === '<br>') {
          rowText.removeChild(rowText.lastChild)
        } else {
          let str = rowText.lastChild.innerHTML
          rowText.lastChild.innerHTML = ''
          let pre = document.createElement("pre")
          pre.style.fontFamily = '思源黑体  CN'
          pre.style.display = 'inline-block'
          pre.innerHTML = str
          rowText.appendChild(pre)
        }
      }
      // this.lastselection.insertNode(inp)
      rowText.appendChild(inp)
    },
    /* 富文本部分 */
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
    /* 推送用户配置弹窗 */
    openUser () {
      if (this.formData.UserIds.length !== 0) {
        this.getExistUsers()
      }
      this.getRoleData()
      this.getTableData()
      this.showUser = true
    },
    getExistUsers () {
      let $this = this
      getPushUserByIds(this.formData.UserIds).then(res => {
        $this.tableConfig.receiveData = res.data.data
      })
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
         $this.tableConfig.formConfig.form[0].options.unshift({ label: this.lang.LogManage_HT_Unlimited, value: null})
      })
    },
    addToReceiveData (multipleSelection) {
      let $this = this
      if (this.tableConfig.receiveData.length === 0) {
        $this.tableConfig.receiveData = $this.tableConfig.receiveData.concat(multipleSelection)
      } else {
        multipleSelection.forEach(item => {
          let index = $this.tableConfig.receiveData.findIndex(f => f.UserID === item.UserID)
          if (index === -1) { // 不存在，添加
            $this.tableConfig.receiveData.push(item)
          }
        })
      }
    },
    removeReceiveData (multipleSelection) {
      multipleSelection.forEach(item => {
        let index = this.tableConfig.receiveData.findIndex(f => f.UserID === item.UserID)
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
      this.tableConfig.receiveData = []
      this.showUser = false
    },
    confirmRelateTable(data) {
      this.$emit('confirmRelateTable', data)
      this.closeRelateTable()
    },
  },
  computed: {
    pushMessageTitleText(){
      const list = this.formData.ScmsMsgPushConfig.TitleMessageConfigs
      // let title = ''
      // for (let i = 0, iLen = list.length; i < iLen; i++) {
      //   const item = list[i]
      //   title += item.Value
      // }
      return list
    }
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
    width: 115px;
  }
  .content_width {
    width: calc(100% - 115px);
  }
  .wrap_item_condition {
    width: 210px;
  }
  .wrap_item_reminder {
    width: 170px;
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
  min-width: 50px;
}
.content_row_block {
  width: calc(100% - 50px);
  height: 42px;
}
.content_row_title {
  width: 100%;
  height: 100%;
  outline: none;
  background: #fff;
  // padding-top: 10px;
  padding-left: 6px;
  line-height: 42px;
  overflow: hidden;
  overflow-y: auto;
}
.content_row_text {
  width: 100%;
  border: 1px solid #DCDFE6;
  outline: none;
  background: #fff;
  padding-left: 6px;
  overflow: hidden;
  overflow-y: auto;
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