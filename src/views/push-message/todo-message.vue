<template>
  <div class="alarm-message flex">
    <div class="form" >
      <search-form :config="searchConfig" :formData="formData" @searchData="searchData"/>
    </div>
    <div class="content">
      <push-left-group
        class="push-task"
        :tableData="leftData"
        ref="leftTable"
        :currentRow="leftCurrentRow"
        :powers="powerBtn.groupBtn"
        :config="config"
        @rowClick="leftRowClick"
        @refreshData="refreshLeftData"
      />
      <push-middle-task
        class="push-content"
        :tableData="middleData"
        ref="middleTable"
        :formData="formData"
        :parentCurrentRow="leftCurrentRow"
        :currentRow="middleCurrentRow"
        :powers="powerBtn.taskBtn"
        :config="config"
        @rowClick="middleRowClick"
        @refreshData="refreshMiddleData"
      />
      <push-right-config
        class="push-account-cconfig"
        :tableData="rightData"
        ref="rightTable"
        :parentCurrentRow="middleCurrentRow"
        :currentRow="rightCurrentRow"
        :powers="powerBtn.configBtn"
        :config="config"
        @rowClick="rightRowClick"
        @refreshData="refreshRightData"
      />
    </div>
  </div>
</template>
<script>
import SearchForm from './components/search-form'
import PushLeftGroup from './components/push-left-group'
import PushMiddleTask from './components/push-middle-task'
import PushRightConfig from './components/push-right-config'
import { getGroup, getTask, getConfig } from '@/api/push-message/index'
import { getPowerById } from '@/api/common.js'
import { findPathByLeafId, getUrlParam } from '@/utils/index.js'

export default {
  name: 'AlarmMessage',
  components: { SearchForm, PushLeftGroup, PushMiddleTask, PushRightConfig },
  data() {
    return {
      lang: JSON.parse(localStorage.getItem('languages'))[localStorage.getItem('currentLang')],
      leftData: [],
      leftCurrentRow: null,
      middleCurrentRow: null,
      middleData: [],
      rightData: [],
      rightCurrentRow: null,
      searchConfig: {
        form: [
          {
            type: 'select',
            labelWidth: '200px',
            prop: 'SearchType',
            name: '搜索关键字：',
            options: [
              {
                label: '分组名称',
                value: 1
              },
              {
                label: '任务名称',
                value: 2
              },
              {
                label: '推送名单',
                value: 3
              },
            ]
          },
          {
            type: 'input',
            width: '280px',
            prop: 'keyword',
          },
          {
            type: 'btn',
            powerShow: true,
            name: '查询',
          }
        ],
      },
      formData: {
        GroupType: 2,
        SearchType: 1,
        Keyword: ''
      },
      config: {
        origin: '代办消息推送'
      },
      /* 权限处理 */
      powerBtn: {
        groupBtn: {
          searchId: '',
          addId: '',
          updId: '',
          delId: '',
          handleId: '',
          search: true,
          add: true,
          upd: true,
          del: true,
          handle: true,
        },
        taskBtn: {
          copy: true,
          add: true,
          upd: true,
          del: true,
          copyId: '',
          addId: '',
          updId: '',
          delId: '',
        },
        configBtn: {
          add: true,
          upd: true,
          del: true,
          handle: true,
          addId: '',
          updId: '',
          delId: '',
          handleId: '',
        },
      }
    };
  },
  async created () {
    // 权限
    await this.getPower()
  },
  mounted(){
    this.searchConfig = {
       form: [
          {
            type: 'select',
            inputWidth: '200px',
            prop: 'SearchType',
            name: this.lang.PushMessage_PleaseEnterKeyword + "：",
            options: [
              {
                label: this.lang.PushMessage_GroupName,
                value: 1
              },
              {
                label: this.lang.PushMessage_TaskName,
                value: 2
              },
              {
                label: this.lang.PushMessage_PushList,
                value: 3
              },
            ]
          },
          {
            type: 'input',
            width: '280px',
            prop: 'Keyword',
          },
          {
            type: 'btn',
            powerShow: true,
            name: this.lang.PushMessage_Query,
          }
        ],
    }
    this.searchData(this.formData)
  },
  methods: {
     // 权限
    getPower() {
      let $this = this
      let powers = this.$store.state.btnPowerData
      this.buttonarr = findPathByLeafId(getUrlParam('id'), powers)[0].Children
      this.buttonarr.forEach((item) => {
        // 分组按钮权限
        if (item.RightDesc === '待办消息-查询按钮') {
            this.powerBtn.groupBtn.searchId = item.RightID;
        }
        if (item.RightDesc === '待办消息-新增推送分组按钮') {
            this.powerBtn.groupBtn.addId = item.RightID;
        }
        if (item.RightDesc === '待办消息-编辑推送分组按钮') {
            this.powerBtn.groupBtn.updId = item.RightID;
        }
        if (item.RightDesc === '待办消息-删除推送分组按钮') {
            this.powerBtn.groupBtn.delId = item.RightID;
        }
        if (item.RightDesc === '待办消息-操作推送分组按钮') {
            this.powerBtn.groupBtn.handleId = item.RightID;
        }
        // 任务按钮权限
        if (item.RightDesc === '待办消息-复制推送任务按钮') {
            this.powerBtn.taskBtn.copyId = item.RightID;
        }
        if (item.RightDesc === '待办消息-新增推送任务按钮') {
            this.powerBtn.taskBtn.addId = item.RightID;
        }
        if (item.RightDesc === '待办消息-编辑推送任务按钮') {
            this.powerBtn.taskBtn.updId = item.RightID;
        }
        if (item.RightDesc === '待办消息-删除推送任务按钮') {
            this.powerBtn.taskBtn.delId = item.RightID;
        }
        // 配置按钮权限
        if (item.RightDesc === '待办消息-新增推送配置按钮') {
            this.powerBtn.configBtn.addId = item.RightID;
        }
        if (item.RightDesc === '待办消息-编辑推送配置按钮') {
            this.powerBtn.configBtn.updId = item.RightID;
        }
        if (item.RightDesc === '待办消息-删除推送配置按钮') {
            this.powerBtn.configBtn.delId = item.RightID;
        }
        if (item.RightDesc === '待办消息-操作推送配置按钮') {
            this.powerBtn.configBtn.handleId = item.RightID;
        }
      });
      var userid = '';
      if (!JSON.parse(sessionStorage.getItem('userInfo1'))) {
        userid = JSON.parse(sessionStorage.getItem('sightseerInfo1')).SCMSUserID;
      } else {
        userid = JSON.parse(sessionStorage.getItem('userInfo1')).SCMSUserID;
      }

       /* 获取按钮权限 */
      //  分组按钮
      getPowerById(userid, this.powerBtn.groupBtn.searchId).then(res => {
        $this.searchConfig.form[2].powerShow = res.data.data
      })
      this.getPowerBtn(userid, this.powerBtn.groupBtn.addId, 'groupBtn', 'add')
      this.getPowerBtn(userid, this.powerBtn.groupBtn.updId, 'groupBtn', 'upd')
      this.getPowerBtn(userid, this.powerBtn.groupBtn.delId, 'groupBtn', 'del')
      this.getPowerBtn(userid, this.powerBtn.groupBtn.handleId, 'groupBtn', 'handle')
      // 任务按钮
      this.getPowerBtn(userid, this.powerBtn.taskBtn.copyId, 'taskBtn', 'copy')
      this.getPowerBtn(userid, this.powerBtn.taskBtn.addId, 'taskBtn', 'add')
      this.getPowerBtn(userid, this.powerBtn.taskBtn.updId, 'taskBtn', 'upd')
      this.getPowerBtn(userid, this.powerBtn.taskBtn.delId, 'taskBtn', 'del')
      // 配置按钮
      this.getPowerBtn(userid, this.powerBtn.configBtn.addId, 'configBtn', 'add')
      this.getPowerBtn(userid, this.powerBtn.configBtn.updId, 'configBtn', 'upd')
      this.getPowerBtn(userid, this.powerBtn.configBtn.delId, 'configBtn', 'del')
      this.getPowerBtn(userid, this.powerBtn.configBtn.handleId, 'configBtn', 'handle')
    },
    getPowerBtn(userid, btnId, prop, innerProp) {
      let $this = this
      getPowerById(userid, btnId).then(res => {
        $this.powerBtn[prop][innerProp] = res.data.data
      })
    },
    async searchData(formData) {
      let $this = this
      await this.getLeftData(formData)
    },
    /* 左侧事件 */
    async refreshLeftData (type = '') {
      await this.getLeftData(this.formData)
    },
    async getLeftData (data) {
      let $this = this
      let postData = {
        GroupType: data.GroupType,
        Keyword:  data.SearchType === 1 ? data.Keyword : '',
        SearchType: data.SearchType
      }
      await getGroup(data).then((res) => {
        this.leftData = res.data.data
        this.setLeftCurrentRow()
      })
    },
    setLeftCurrentRow () {
      this.$nextTick(() => {
        if (this.leftData.length !== 0) {
          this.leftCurrentRow = this.leftData[0]
          if (this.$refs.leftTable) {
            this.$refs.leftTable.$refs.table.setCurrentRow(this.leftData[0])
            this.getMiddleData()
          }
        } else {
          this.leftCurrentRow = null
          this.middleData = []
          this.rightData = []
        }
      })
    },
    leftRowClick (row) {
      this.leftCurrentRow = row
      this.getMiddleData()
    },
    /* 中间事件 */
    async refreshMiddleData (type = '') {
      await this.getMiddleData(this.formData)
    },
    async getMiddleData () {
      let $this = this
      let postData = {
        GroupId: this.leftCurrentRow.Id,
        Keyword: this.formData.SearchType === 2 ? this.formData.Keyword : '',
      }
      await getTask(postData).then(res => {
        this.middleData = res.data.data
        this.setMiddleCurrentRow()
      })
    },
    middleRowClick(row) {
      this.middleCurrentRow = row
      this.getRightData()
    },
    setMiddleCurrentRow () {
      this.$nextTick(() => {
         if (this.middleData.length !== 0) {
           this.middleCurrentRow = this.middleData[0]
           if (this.$refs.middleTable) {
             this.$refs.middleTable.$refs.table.setCurrentRow(this.middleData[0])
             this.getRightData()
           }
         } else {
           this.middleCurrentRow = null
         }
      })
    },
    /* 右侧事件 */
    refreshRightData (type = '') {
      this.getRightData()
    },
    getRightData () {
      let $this = this
      let postData = {
        TaskId: this.middleCurrentRow.Id,
        Keyword: this.formData.SearchType === 3 ? this.formData.Keyword : '',
      }
      getConfig(postData).then(res => {
        this.rightData = res.data.data
        this.setRightCurrentRow()
      })
    },
    setRightCurrentRow () {
      this.$nextTick(() => {
         if (this.rightData.length !== 0) {
           this.rightCurrentRow = this.rightData[0]
           if (this.$refs.rightTable) {
             this.$refs.rightTable.$refs.table.setCurrentRow(this.rightData[0])
           }
         } else {
           this.rightCurrentRow = null
         }
      })
    },
    rightRowClick(row) {
      this.rightCurrentRow = row
    }
  }
};
</script>

<style lang='scss' scoped>
.alarm-message {
  width: 100%;
  height: 100%;
  padding: 10px 20px;
  flex-direction: column;
  background-color: #EEEEEE;
  & > .form {
    width: 100%;
    height: 60px;
    padding: 10px 0 10px 10px;
    justify-content: flex-start;
    background: #DDDDDD;
  }
  & > .content {
    width: 100%;
    height: calc(100% - 60px);
    display: flex;
  }
}
.push-task {
  width: 25%;
  height: 100%;
  padding: 0 10px 0 0;
  flex-direction: column;
}
.push-content {
  width: 25%;
  height: 100%;
  padding: 0 10px 0 0;
  flex-direction: column;
}
.push-account-cconfig {
  width: 50%;
  height: 100%;
  flex-direction: column;
}
</style>