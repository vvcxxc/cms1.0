/* 通用api */
import request from "@/plugins/axios"

// 报警类别
export function getAlarmTypeList () {
  return request({
    url: '/api/AlarmRecord/AlarmRecord_GstAlarmType',
    method: 'post',
  })
}
// 报警组
export function getAlarmGroupList() {
  return request({
    url: '/api/AlarmRecord/AlarmRecord_GstAlarmGroup',
    method: 'post',
  })
}

// 获取角色
export function getRoles() {
  return request({
    url: '/api/UserManage/UserManage_GstRole',
    method: 'post',
  })
}

// 获取设备类型
export function getDevices() {
  return request({
    url: '/api/EquipmentAccount/EquipmentAccount_GstEquipmentType',
    method: 'post',
  })
}