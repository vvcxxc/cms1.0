import axios from "@/plugins/axios";
export default {
  /**
   * @description 延长器件寿命
   * @params 参数: {
      argPID: '',
      argTime: 0, // 延长次数
      argTimeUnit: 1, // 延长次数-单位 1-小时 2-天 3-月 4-年 5-次
      argRemarks: '', // 备注
      argEnableTime: '', // 启用时间
      argLoginUserName: '', // 用户名
    }
    */
  prolongDeviceLife(params) {
    return axios.get(`/api/VulnerablePartManage/VulnerablePartManage_Extend?argPID=${params.argPID}&argTime=${params.argTime}&argTimeUnit=${params.argTimeUnit}&argRemarks=${params.argRemarks}&argLoginUserName=${params.argLoginUserName}`)
  },
  /**
   * @description 器件信息-新增/编辑
   * @params 参数: {
      LoginUserName: "", // 登录用户名
      Operate: 1, // 新增-1 编辑-2
      PID: 1, // 新增不传 编辑要传

      VulnerablePartName: '', // 器件名称
      VulnerablePartNo: '', // 器件编号
      UsingDevice: '', // 使用设备
      AID: '', // 使用设备ID
      VulnerablePartModel: '', // 器件类型

      EnableTime: '', // 启用日期
      SelectedTimerType: '', // 统计类型 标准-1 运行-2 次数-3
      LifeCycleValue: '', // 寿命周期-值
      LifeCycleUnit: '', // 寿命周期-单位
      RunningSignal: '', // 统计信号
      Coefficient: '', // 统计系数
      ReminderTimeValue: '', // 提前提醒-值
      ReminderTimeUnit: '', // 提前提醒-单位
      Executor: '', // 执行人

      UseNumber: '', // 使用数量
      Price: '', // 器件价格
      Manufactor: '', // 供应商
      Remarks: '', // 器件备注
    }
    */
  saveAcount(params) {
    return axios.post(`/api/VulnerablePartManage/VulnerablePartManage_SaveAcount`, params)
  },
  /**
   * @description 导入
   * @params 参数: {
      No: item['序号'],
      VulnerablePartName: item['器件名称'],
      VulnerablePartNo: item['器件编号'],
      UsingDevice: item['使用设备'],
      VulnerablePartModel: item['器件型号'],
      MaturityTime: item['到期时间'],
      ResidualLife: item['剩余寿命'],
      EnableTime: item['启用日期'],
      LifeCycleValue: item['寿命周期'],
      TimerType: item['统计类型'],
      RunningSignal: item['统计信号'],
      ReminderTimeValue: item['提前提醒'],
      Executor: item['执行人员'],
      UseNumber: item['使用数量'],
      Price: item['器件价格'],
      Manufactor: item['供应商'],
      Remarks: item['器件备注'],
      LoginUserName: '', // 登录人员名称
    }
    */
  vulnerablePartManageImport(params) {
    return axios.post(`/api/VulnerablePartManage/VulnerablePartManage_Import`, params)
  },
  // 关联设备（设备台账）
  gstEquipmentAccount() {
    return axios.post("/api/RepairManage/RepairManage_GstEquipmentAccount")
  },
  // 获取用户
  gstUserWithNoPage() {
    return axios.post("/api/UserManage/UserManage_GstUserWithNoPage")
  },


  
};