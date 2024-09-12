import request from "@/plugins/axios"

/* 报警消息 */

// 分组接口
export function getGroup (data) {
  return request({
    url: '/api/PushAlarm/QueryPushGroup',
    method: 'post',
    data,
  })
}

export function addGroup (data) {
  return request({
    url: '/api/PushAlarm/AddPushGroup',
    method: 'post',
    data,
  })
}

export function updGroup (data) {
  return request({
    url: '/api/PushAlarm/UpdatePushGroup',
    method: 'post',
    data,
  })
}

export function delGroup (data) {
  return request({
    url: '/api/PushAlarm/DeletePushGroup',
    method: 'post',
    data,
  })
}

export function switchGroupPush (data) {
  return request({
    url: '/api/PushAlarm/UpdatePushGroupStatus',
    method: 'post',
    data,
  })
}

// 任务接口
export function getTask (data) {
  return request({
    url: '/api/PushAlarm/QueryPushTask',
    method: 'post',
    data,
  })
}

export function addTask (data) {
  return request({
    url: '/api/PushAlarm/AddPushTask',
    method: 'post',
    data,
  })
}

export function updTask (data) {
  return request({
    url: '/api/PushAlarm/UpdatePushTask',
    method: 'post',
    data,
  })
}

export function delTask (data) {
  return request({
    url: '/api/PushAlarm/DeletePushTask',
    method: 'post',
    data,
  })
}

export function copyTask(data) {
  return request({
    url: '/api/PushAlarm/CopyPushTask',
    method: 'post',
    data,
  })
}

export function getRelateAlarmPoint (data) {
  return request({
    url: '/api/PushAlarm/QueryLinkAlarms',
    method: 'post',
    data
  })
}


export function getAlarmTree () {
  return request({
    url: '/api/PushAlarm/QueryAlarmControls',
    method: 'post',
  })
}

export function getAlarmPoint (data) {
  return request({
    url: '/api/PushAlarm/QueryAlarms',
    method: 'post',
    data
  })
}

export function getPlans (data) {
  return request({
    url: `/api/PushAlarm/QueryPlans`,
    method: 'post',
    data
  })
}

export function getPushOrigin () {
  return request({
    url: `/api/PushAlarm/QueryPushTaskDataSource`,
    method: 'get',
  })
}

export function getDynamicColumns (data) {
  return request({
    url: `/api/PushAlarm/QueryDataGridConfig?taskType=${data}`,
    method: 'get',
  })
}

// 配置接口
export function getConfig (data) {
  return request({
    url: '/api/PushAlarm/QueryPushConfig',
    method: 'post',
    data
  })
}

export function addConfig (data) {
  return request({
    url: '/api/PushAlarm/AddPushConfig',
    method: 'post',
    data
  })
}

export function updConfig (data) {
  return request({
    url: '/api/PushAlarm/UpdatePushConfig',
    method: 'post',
    data
  })
}

export function delConfig (data) {
  return request({
    url: '/api/PushAlarm/DeletePushConfig',
    method: 'post',
    data
  })
}

export function switchConfigPush (data) {
  return request({
    url: '/api/PushAlarm/UpdatePushConfigStatus',
    method: 'post',
    data
  })
}

export function getPushInfoConfig (type) {
  return request({
    url: `/api/PushAlarm/QueryPushConfigMessageConfig?taskType=${type}`,
    method: 'get',
  })
}

export function getPushUsers (data) {
  return request({
    url: `/api/UserManage/UserManage_GetUsers?roleId=${data.RoleId}&keyword=${data.Keyword}`,
    method: 'get',
  })
}

export function getPushUserByIds(data) {
  return request({
    url: `/api/UserManage/UserManage_GetUsersByIds`,
    method: 'post',
    data
  })
}

/* 推送日志 */
export function getMessageType(data) {
  return request({
    url: `/api/PushAlarm/GetTypes`,
    method: 'get',
    data
  })
}
