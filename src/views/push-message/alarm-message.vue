<template>
  <div class="alarm-message flex">
    <div class="form" >
      <search-form :config="searchConfig" :formData="formData" @searchData="searchData"/>
    </div>
    <div class="content">
      <push-left-group
        :tableData="leftData"
        ref="leftTable"
        @rowClick="leftRowClick"
        :currentRow="leftCurrentRow"
        :config="config"
        @refreshData="refreshLeftData"
        class="push-task"
      />
      <push-middle-task
        :tableData="middleData"
        ref="middleTable"
        :formData="formData"
        @rowClick="middleRowClick"
        :parentCurrentRow="leftCurrentRow"
        :currentRow="middleCurrentRow"
        :config="config"
        @refreshData="refreshMiddleData"
        class="push-content"
      />
      <push-right-config
        :tableData="rightData"
        ref="rightTable"
        @rowClick="rightRowClick"
        :parentCurrentRow="middleCurrentRow"
        :currentRow="rightCurrentRow"
        :config="config"
        @refreshData="refreshRightData"
        class="push-config"
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

export default {
  name: 'AlarmMessage',
  components: { SearchForm, PushLeftGroup, PushMiddleTask, PushRightConfig },
  data() {
    return {
      lang: JSON.parse(localStorage.getItem('languages'))[localStorage.getItem('currentLang')],
      leftData: [],
      leftCurrentRow: null,
      middleData: [],
      middleCurrentRow: null,
      rightData: [],
      rightCurrentRow: null,
      searchConfig: {
        form: [
          {
            type: 'select',
            width: '300px',
            labelWidth: '150px',
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
            prop: 'Keyword',
          },
          {
            type: 'btn',
            name: '查询',
          }
        ],
      },
      formData: {
        GroupType: 1,
        SearchType: 1,
        Keyword: ''
      },
      config: {
        origin: '报警消息推送'
      },
    };
  },
  mounted(){
    this.searchData(this.formData)
  },
  methods: {
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
        }
      })
    },
    leftRowClick (row) {
      this.leftCurrentRow = row
      this.getMiddleData()
    },
    /* 中间事件 */
    async refreshMiddleData (type = '') {
      await this.getMiddleData()
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
           this.rightData = []
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
.push-config {
  width: 50%;
  height: 100%;
  flex-direction: column;
}
</style>