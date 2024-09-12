<template>
  <div class="page">
    <div class="body flex">
      <div class="query flex">
        <div>
          <span class="title">{{ lang.PushMessage_UserRole }}</span>
          <el-select v-model="form.roleId" :placeholder="lang.PushMessage_PleaseSelect" style="margin: 0 0 0 10px;">
            <el-option
              v-for="item in roleList"
              :key="item.SCMSRoleID"
              :label="item.SCMSRoleName"
              :value="item.SCMSRoleID">
            </el-option>
          </el-select>
        </div>
        <div>
          <el-input v-model="form.key" class="value" :placeholder="lang.MsgPush_Log_KeyWord"></el-input>
          <el-button type="primary" @click="query">{{ lang.PushMessage_Query }}</el-button>
        </div>
      </div>

      <el-table
        :data="list"
        :border="true"
        height="250"
        :header-cell-style="{ background: '#DCF0F9', color: '#4270E4' }"
      >
        <!-- <el-table-column type="selection" width="55"></el-table-column> -->
        <el-table-column prop="lineCheckbox" width="50" :label="''">
          <template slot="header" slot-scope="scope">
            <el-checkbox v-model="pushAppAll" @change="(value) => {setAllPushApp('pushApp', value)}">{{""}}</el-checkbox>
            <span class="header-search">{{scope.column.label}}</span>
          </template>
          <template slot-scope="scope">
            <el-checkbox v-model="scope.row.pushApp" @change="judgeChannelIsAllselect('pushApp')">{{""}}</el-checkbox>
          </template>
        </el-table-column>
        
        <el-table-column :label="lang.PushMessage_SerialNumber" show-overflow-tooltip align="center">
          <template slot-scope="scope">{{scope.$index + 1}}</template>
        </el-table-column>
        
        <el-table-column prop="SCMSUserName" show-overflow-tooltip :label="lang.PushMessage_UserName">
          <template slot-scope="scope">
            <div class="single-line-text" :title="scope.row.SCMSUserName">{{ scope.row.SCMSUserName }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="RoleName" show-overflow-tooltip :label="lang.PushMessage_Role">
          <template slot-scope="scope">
            <div class="single-line-text" :title="scope.row.RoleName">{{ scope.row.RoleName }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="Phone" show-overflow-tooltip :label="lang.PushMessage_Phone" width="120px"></el-table-column>
        <el-table-column prop="Email" show-overflow-tooltip :label="lang.PushMessage_Email" width="170px"></el-table-column>
        <el-table-column prop="pushApp" show-overflow-tooltip :label="lang.PushMessage_PushApp">
          <template slot="header" slot-scope="scope">
            <el-checkbox v-model="pushAppAll" @change="(value) => {setAllPushApp('pushApp', value)}">{{""}}</el-checkbox>
            <span>{{scope.column.label}}</span>
          </template>
          <template slot-scope="scope">
            <el-checkbox v-model="scope.row.pushApp" @change="judgeChannelIsAllselect('pushApp')">{{""}}</el-checkbox>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="pushSms" :label="lang.PushMessage_PushSms">
          <template slot="header" slot-scope="scope">
            <el-checkbox>{{""}}</el-checkbox>
            <span>{{scope.column.label}}</span>
          </template>
          <template>
            <el-checkbox>{{""}}</el-checkbox>
          </template>
        </el-table-column>
        <el-table-column prop="pushEmail" :label="lang.PushMessage_PushEmail">
          <template slot="header" slot-scope="scope">
            <el-checkbox>{{""}}</el-checkbox>
            <span>{{scope.column.label}}</span>
          </template>
          <template>
            <el-checkbox>{{""}}</el-checkbox>
          </template>
        </el-table-column> -->
      </el-table>
    </div>
    <div class="foot flex">
      <el-button type="info" @click="() => { this.$emit('hidePushAccountConfig', 'cancel') }">{{ lang.PushMessage_Cancel }}</el-button>
      <el-button type="primary" @click="setUserConfig">{{ lang.PushMessage_Confirm }}</el-button>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    contentData: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      lang: JSON.parse(localStorage.getItem('languages'))[localStorage.getItem('currentLang')],
      form: {
        configId: '',
        roleId: '',
        key: ''
      },
      pushAppAll: false,
      roleList: [],
      list: []
    };
  },
  methods: {
    // 获取消息推送状态 
    getMsgPushState(list) {
      let pushApp = false;
      let pushSms = false;
      let pushEmail = false;
      list.forEach((item) => {
        if (item.ChannelType === 1) pushApp = item.IsChecked;
        if (item.ChannelType === 2) pushSms = item.IsChecked;
        if (item.ChannelType === 3) pushEmail = item.IsChecked;
      });
      return {
        pushApp,
        pushSms,
        pushEmail
      }
    },
    query() {
      this.$api.pushMessage.getUserConfigByAll(this.form).then(ref => {
        console.log("获取全部用户配置", JSON.parse(JSON.stringify(ref.data.data)));
        let list = [];
        let pushAppAll = true;
        let pushSmsAll = true;
        let pushEmailAll = true;

        ref.data.data.UserList.forEach((item) => {
          let PushState = this.getMsgPushState(item.ChannelTypeDecriptions)
          list.push({
            ...item,
            ...PushState
          })

          if (!PushState.pushApp && pushAppAll) pushAppAll = false;
          if (!PushState.pushSms && pushSmsAll) pushSmsAll = false;
          if (!PushState.pushEmail && pushEmailAll) pushEmailAll = false;
        });

        this.pushAppAll = pushAppAll;
        this.pushSmsAll = pushSmsAll;
        this.pushEmailAll = pushEmailAll;

        this.list = list;
        this.roleList = [
          ...[{
            SCMSRoleID: '',
            SCMSRoleName: this.lang.PushMessage_Unlimited,
          }],
          ...ref.data.data.RoleList
        ];
      }, err => {
        console.log('失败回调', err);
      })
    },
    // 设置全部APP消息通知 type: pushApp pushSms pushEmail
    setAllPushApp(type, value) {
      this.list.forEach((item) => {
        item[type] = value
      })
    },

    // 判断渠道是否已经全部选择
    judgeChannelIsAllselect(type) {
      let stateList = [];
      var state = false;
      this.list.forEach((item) => {
        stateList.push(item[type])
      });
      if (stateList.indexOf(true) >= 0 && stateList.indexOf(false) < 0) state = true;
      switch (type) {
        case 'pushApp':
          this.pushAppAll = state;
          break;
        default:
          break;
      }
    },
    // 设置用户配置
    setUserConfig() {
      var pushAppList = [];
      // var pushSmsList = [];
      // var pushEmailList = [];

      this.list.forEach((item) => {
        if (item.pushApp) pushAppList.push(item.SCMSUserID);
        // if (item.pushApp) pushSmsList.push(item.SCMSUserID);
        // if (item.pushApp) pushEmailList.push(item.SCMSUserID);
      });

      this.$api.pushMessage.setUserConfig({
        configId: this.form.configId,
        ChannelAssociateUser: [
          {
            PushChannelType: 1,
            UserList: pushAppList
          },
          // {
          //   PushChannelType: 2,
          //   UserList: pushSmsList
          // },
          // {
          //   PushChannelType: 3,
          //   UserList: pushEmailList
          // },
        ]
      }).then(ref => {
        // this.$message.success(ref.data.msg);
        this.$emit('hidePushAccountConfig', 'confirm');
      }, err => {
        console.log('失败回调', err);
      })
    }
  },
  watch: {
    "contentData": {
      deep: true,
      immediate: true,
      handler: function (newVal, oldVal) {
        // console.log("账户-弹窗", JSON.parse(JSON.stringify(newVal)));
        if (!newVal) return;
        this.form.configId = newVal.ConfigId;
        console.log(this.lang);
        this.query()
      }
    }
  }
};
</script>

<style lang='scss' scoped>
@import "@/assets/style/push-message.scss";
::v-deep .el-input__inner {
  height: 38px;
}

::v-deep .el-table--border td {
  border-right: 1px solid #EBEEF5;
  // border-left: 1px solid #EBEEF5;
}
::v-deep .el-table th>.cell {
  white-space: nowrap;
}

.page {
  width: 100%;
  height: 100%;
  .body {
    width: 100%;
    height: calc(100% - 70px);
    overflow-y: auto;
    flex-direction : column;
    .query {
      width: 100%;
      padding: 0 0 20px 0;
      justify-content: space-between;
      .title {
        font-size: 16px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #333333;
      }
      .value {
        width: 200px;
        margin: 0 10px 0 0;
      }
    }
  }
  .foot {
    width: 100%;
    height: 70px;
    padding: 30px 0 0 0;
    justify-content: flex-end;
  }
}

</style>