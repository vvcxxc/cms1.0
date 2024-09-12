import axios from "@/plugins/axios";
export default {
  /**
   * @description 获取推送任务列表
   * @params 参数: {
      type: 1,
      key: '',
      pageIndex: '',
      pageSize: ''
    }*/
  getTaskList(params) {
    return axios.get("/api/PushAlarm/GetPushAlarmTask", {params})
  },

  /**
   * @description 设置任务是否激活
   * @params 参数: {
      taskId: 1, // 任务id
      enable: true // true启用 false停用
    }*/
  enableTask(params) {
    return axios.post("/api/PushAlarm/SetTaskEnable", params)
  },

  /**
   * @description: 根据任务ID获取内容列表
   * @params {
      taskId: 'a01', // 任务id
      key: '', // 关键字
      pageIndex: '', // 当前页
      pageSize: '' // 每页显示数目
    }
   */
  getContentByTaskId(params) {
    return axios.get("/api/PushAlarm/GetContentByTaskId", {params})
  },

  /**
   * @description: 获取内容列表(不需要任务ID)
   * @params {
      key: '', // 关键字
      pageIndex: '', // 当前页
      pageSize: '' // 每页显示数目
    } 
   */
  getContentByKey(params) {
    return axios.get("/api/PushAlarm/GetContentByKey", {params})
  },

  /**
   * @description: 获取已关联报警点列表
   * @params {
      configId: 'a01', // 内容ID
    } 
   */
  getAlarmList(params) {
    return axios.get("/api/PushAlarm/GetAlarmList", {params})
  },

  /**
   * @description: 获取全部用户配置(用于用户配置窗体)
   * @params {
      configId: 'a01', // 内容配置ID
      roleID: 'a01', // 角色ID
      key: '' // 关键字
    } 
   */
  getUserConfigByAll(params) {
    return axios.get("/api/PushAlarm/GetUserConfigTemplate", {params})
  },

  /**
   * @description: 获取已配置用户列表(需要内容id)
   * @params {
      configId: 'a01', // 内容id
      pageIndex: '', // 当前页
      pageSize: '' // 每页显示数目
    }
   */
  getUserConfigByContentId(params) {
    return axios.get("/api/PushAlarm/GetUserbyConfigId", {params})
  },

  /**
   * @description: 根据关键字获取已配置用户列表(不要内容id)
   * @params {
      key: '', // 关键字
      pageIndex: '', // 当前页
      pageSize: '' // 每页显示数目
    }
   */
  getUserConfigByKey(params) {
    return axios.get("/api/PushAlarm/GetUserbyKey", {params})
  },

  /**
   * @description: 设置用户配置是否激活
   * @params {
      configId: 'a01', // 内容id
      enable: true, // 是否激活
      channelType: 1, // 推送渠道类型(目前只有APP)： APP消息=1	短信=2	邮件=3
    }
   */
  setUserConfigEnable(params) {
    return axios.get("/api/PushAlarm/SetUserConfigEnable", {params})
  },

  /**
   * @description: 设置用户配置
   * @params {
      configId: 'a01', // 内容配置id
      ChannelAssociateUser: [
        {
          PushChannelType: 1, // 推送类型(目前只有APP)： APP消息=1	短信=2	邮件=3
          UserList: ['a01'] // 用户id列表
        },
        {
          PushChannelType: 2,
          UserList: []
        },
        {
          PushChannelType: 3,
          UserList: []
        },
      ] // 用户id列表
    } 
   */
  setUserConfig(params) {
    return axios.post("/api/PushAlarm/SetUserConfig", params)
  },

  /**
   * @description: 获取推送日志列表
   * @params 参数：{
      taskType: '0', // 报警类型1  不限0
      channlType: '0', // 推送渠道：不限0 APP消息推送1
      key: '', // 关键字
      pushStatus: '0', // 推送状态: 不限0 全部成功1 部分成功2 全部失败3
      startTime: '2021-01-01 00:00:00', // 开始时间
      endTime: '2021-01-02 00:00:00', // 结束时间
      pageIndex: '', // 当前页
      pageSize: '' // 每页显示数目
    }
    * @date 返回数据：{
        TaskName: '', // 任务名称
        ConfigName: '', // 内容名称
        Status: '', // 状态
        Mark: '', // 备注
        TaskTypeStr: '', // 推送消息类型
        PushChannelStr: '', // 推送渠道
        PushTime: '' // 推送时间
    }
   */
  getPushLog(params) {
    return axios.get("/api/PushAlarm/GetLog", {params})
  },
};