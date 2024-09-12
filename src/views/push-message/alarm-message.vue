<template>
  <div class="alarm-message flex">
    <div class="form flex">
      <span>{{lang.PushMessage_SearchKey}}：</span>
      <el-select v-model="queryType" :placeholder="lang.PushMessage_PleaseSelect"
        style="margin: 0 10px 0 0 ; width: 140px;"
        size="medium"
      >
        <el-option
          v-for="item in options.searchType"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-input v-model="queryKey" size="medium" :placeholder="lang.PushMessage_PleaseEnter"
        style="margin: 0 10px 0 0; width: 180px;"
      ></el-input>
      <el-button @click="query('id')" type="primary" size="mini">{{ lang.PushMessage_Query }}</el-button>
      <el-button type="primary" size="mini" class="yellow-btn"
        @click="showPushAccountConfig"
      >{{ lang.PushMessage_Config }}</el-button>
    </div>
    <div class="content flex">
      <push-task :showbjtscz="showbjtscz" :taskList="taskList" @selectTask="selectTask" class="push-task"></push-task>
      <push-content :showbjtsck="showbjtsck" :contentList="contentList" @selectContent="selectContent" class="push-content"></push-content>
      <account-config :showbjpz="showbjpz" :accountList="accountList" class="push-account-cconfig"></account-config>
    </div>

    <!-- 推送用户配置 -->
    <el-dialog
      :title="lang.PushMessage_PushUserConfig"
      width="80%"
      class="push-content-details-dialog flex"
      :visible.sync="pushAccountConfig.dialog"
      :before-close="() => {pushAccountConfig.dialog = false}"
    >
      <push-account-config 
        v-if="pushAccountConfig.dialog" 
        :contentData="contentData"
        @hidePushAccountConfig="hidePushAccountConfig"
      ></push-account-config>
    </el-dialog>

    <!-- 无权限提示框 -->
    <div v-if="isTipsPop" class="TipsPop-box">
      <TipsPop :popText="TipsPopText"></TipsPop>
    </div>
  </div>
</template>
<script>
import PushTask from '@/components/push-message/push-task.vue';
import PushContent from '@/components/push-message/push-content.vue';
import AccountConfig from '@/components/push-message/account-config.vue';
import PushAccountConfig from '@/components/push-message/push-account-config.vue';
import TipsPop from '../customer/TipsPop.vue'
export default {
  components: { PushTask, PushContent, AccountConfig, PushAccountConfig, TipsPop },
  data() {
    return {
      lang: JSON.parse(localStorage.getItem('languages'))[localStorage.getItem('currentLang')],
      options: {
        searchType: [
          {
            value: 'task',
            label: '任务名称'
          },
          {
            value: 'content',
            label: '内容名称'
          },
          {
            value: 'account',
            label: '推送账户'
          },
        ],
      },
      
      queryType: 'task',
      queryKey: '',
      
      taskData: null, // 任务数据
      contentData: null, // 内容数据

      localData: {
        contentList: [],
        accountList: []
      },
      taskList: [],
      contentList: [],
      accountList: [],

      pushAccountConfig: {
        dialog: false
      },

      // 权限变量
      TipsPopText: '该用户没有操作权限',
      isTipsPop: false,
      buttonid: {},
      bjpzcz: false,
      showbjtscz: true,
      showbjpz: true,
      showbjtsck: true
    };
  },
  methods: {
    // 设置消息数据
    setMsgData(data) {
      this.taskList = data.TaskList;
      this.contentList = [];
      this.accountList = [];
      this.localData.contentList = data.ContentList;
      this.localData.accountList = data.UserConfigList;
    },
    // 搜索任务
    queryTask() {
      this.taskData = null;
      this.$api.pushMessage.getTaskList({
        key: this.queryKey,
        type: 1,
        pageIndex: '',
        pageSize: ''
      }).then(ref => {
        // console.log("任务", JSON.parse(JSON.stringify(ref.data.data)));
        this.setMsgData(ref.data.data)
      }, err => {
        console.log('失败回调', err);
      })
    },
    // 获取内容列表-关键字
    getContentByKey() {
      this.$api.pushMessage.getContentByKey({
        key: this.queryKey,
        pageIndex: '',
        pageSize: ''
      }).then(ref => {
        // console.log("内容-key", JSON.parse(JSON.stringify(ref.data.data)));
        this.setMsgData(ref.data.data)
      }, err => {
        console.log('失败回调', err);
      })
    },
    // 获取内容列表-本地
    getContentByLocal() {
      let arr = [];
      this.localData.contentList.forEach((item) => {
        if (item.TaskId === this.taskData.TaskId) arr.push(item)
      });
      // console.log("内容-Local", JSON.parse(JSON.stringify(arr)));
      this.contentList = arr
    },
    // 获取已配置用户列表-关键字
    getUserConfigByKey() {
      this.$api.pushMessage.getUserConfigByKey({
        key: this.queryKey,
        pageIndex: '',
        pageSize: ''
      }).then(ref => {
        // console.log("配置-key", JSON.parse(JSON.stringify(ref.data.data)));
        this.setMsgData(ref.data.data)
      }, err => {
        console.log('失败回调', err);
      })
    },
    // 获取已配置用户列表-本地
    getUserConfigByLocal() {
      let arr = [];
      this.localData.accountList.forEach((item) => {
        if (item.ConfigId === this.contentData.ConfigId) arr.push(item)
      });
      // console.log("配置-Local", JSON.parse(JSON.stringify(arr)));
      this.accountList = arr
    },
    query(id) {
      let _query = () => {
        switch (this.queryType) {
          case 'task':
            this.queryTask();
            break;
          case 'content':
            this.getContentByKey();
            break;
          case 'account':
            this.getUserConfigByKey()
            break;
          default:
            this.queryTask();
            break;
        }
      }
      if (this.queryKey && !this.queryType) {
        this.$message.warning('请选择类型');
        return;
      }
      if (!id) {
        _query()
        return;
      }
      this.isPower(this.buttonid.bjcxid).then((val)=>{
        if (!val) {
          this.isTipsPop = true;
          return;
        }
        _query()
      })
    },

    // 选择任务
    selectTask(taskData) {
      // console.log("选择任务", JSON.parse(JSON.stringify(taskData)));
      this.taskData = taskData;
      this.getContentByLocal()
    },
    // 选择内容
    selectContent(contentData) {
      // console.log("选择内容", JSON.parse(JSON.stringify(contentData)));
      this.contentData = contentData;
      this.getUserConfigByLocal()
    },

    // 筛选按钮数据
    powerBtn() {
      var powerData = this.$store.state.btnPowerData
      var btnList = [] // 按钮数据列表
      var btnObj = {} // 按钮对象是为了能根据key快速查询对应的按钮数据
      // 获取按钮权限ID
      for (let i = 0, iLen = powerData.length; i < iLen; i++) {
        const Children = powerData[i].Children;
        for (let n = 0, nLen = Children.length; n < nLen; n++) {
          const item = Children[n];
          if (item.RightDesc === '消息推送') {
              btnList = item.Children;
              break
          }
        }
        if (btnList.length) break;
      }
      btnList.forEach((item) => {
        btnObj[item.RightDesc] = item
      });
      this.buttonid = {
        bjtsczid:btnObj['报警信息-推送任务操作按钮'].RightID,
        bjtsckid:btnObj['报警信息-推送内容查看按钮'].RightID,
        bjcxid:btnObj['报警信息-查询按钮'].RightID,
        bjpzcz:btnObj['报警信息-账户配置操作按钮'].RightID,
        bjpzid:btnObj['报警信息-配置按钮'].RightID,
        tsrzcxid:btnObj['推送日志-查询按钮'].RightID
      }
      this.isPower(this.buttonid.bjtsczid).then((val)=>{
        this.showbjtscz = val
      })
      this.isPower(this.buttonid.bjpzcz).then((val)=>{
        this.showbjpz = val
      })
      this.isPower(this.buttonid.bjtsckid).then((val)=>{
        this.showbjtsck = val
      })
    },
    // 该用户是否有权限
    isPower(id) {
      return new Promise((resolve, reject) => {
        var userinfo = JSON.parse(sessionStorage.getItem('userInfo1'));
        var sightseerInfo1 = JSON.parse(sessionStorage.getItem('sightseerInfo1'));
        var argUserID = (userinfo != null) ? argUserID = userinfo.SCMSUserID : argUserID = sightseerInfo1.SCMSUserID
        this.$axios({ // 权限配置请求接口
          method: 'post',
          url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${argUserID}&argRightID=${id}`,
        }).then(res => {
          resolve(res.data.data)
        },err => {
          console.log('该用户是否有权限-报错', err)
        })
      })
    },
    // 设置账户通知配置
    showPushAccountConfig() {
      if (!this.contentData) {
        this.$message.warning('请选择内容');
        return;
      }
      this.isPower(this.buttonid.bjpzid).then(val => {
        if (!val) {
          this.isTipsPop = true
          return;
        }
        this.pushAccountConfig.dialog = true
      })
    },
    // 关闭账户通知配置 状态state: 'confirm'确定   'cancel'取消
    hidePushAccountConfig(state) {
      if (state === 'cancel') {
        this.pushAccountConfig.dialog = false
        return;
      }
      this.pushAccountConfig.dialog = false
      let oldContentData = JSON.parse(JSON.stringify(this.contentData));
      this.contentData = null
      setTimeout(() => {
        this.contentData = oldContentData
      }, 500);
    },
    showtip(){
      this.isTipsPop = true
    },
    //关闭弹窗提示
    clonePopFun() {
      this.isTipsPop = false
    },
    translation() {
      this.TipsPopText = this.lang.NoOperationAuthority
      this.options.searchType[0].label = this.lang.RepairManage_TaskName;
      this.options.searchType[1].label = this.lang.MsgPush_Log_ContentName;
      this.options.searchType[2].label = this.lang.PushMessage_PushAccount;
    },
    async init() {
      this.translation();
      await this.powerBtn()
      this.query();
    }
  },
  created() {
    this.init()
  }
};
</script>

<style lang='scss' scoped>
@import "@/assets/style/push-message.scss";
.alarm-message {
  width: 100%;
  height: 100%;
  padding: 10px 20px;
  flex-direction: column;
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
  }
}
.push-task {
  width: 30%;
  height: 100%;
  padding: 0 10px 0 0;
  flex-direction: column;
}
.push-content {
  width: 35%;
  height: 100%;
  padding: 0 10px 0 0;
  flex-direction: column;
}
.push-account-cconfig {
  width: 35%;
  height: 100%;
  flex-direction: column;
}
.push-content-details-dialog {
  margin: 0;
}
.push-content-details-dialog ::v-deep .el-dialog {
  max-width: 1120px;
  height: 820px;
  margin: 0 !important;
  // margin-top: 0;
  .el-dialog__body {
    width: 100%;
    height: calc(100% - 45px);
    overflow-y: auto;
    background: #EEEEEE;
  }
}
.TipsPop-box{
  position: absolute;
  top:0;
  bottom:0;
  left:0;
  right: 0;
  margin: auto;
  width: 100%;
  height: 100%;
  z-index: 999;
}
</style>