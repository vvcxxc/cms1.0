/* 新增需求部分接口 */
import request from "@/plugins/axios";

/* 设备状态 */
export function GetServiceStatus(params) {
  return request({
    url:  `api/LocationSetting/GetServiceStatus`,
    method: 'get',
    params
  })
}

export function GetColorType() {
  return request({
    url:  `api/LocationSetting/GetColorType`,
    method: 'get',
  })
}

export function SaveServiceStatus(sid, statusSingle, data) {
  return request({
    url:  `api/LocationSetting/SaveServiceStatus?sid=${sid}&statusSingle=${statusSingle}`,
    method: 'patch',
    data
  })
}

/* 过程提示 */
export function GetProcessTootip(params) {
  return request({
    url:  `api/LocationSetting/GetProcessTootip`,
    method: 'get',
    params
  })
}

export function SaveProcessTootip(sid, statusSingle, data) {
  return request({
    url:  `api/LocationSetting/SaveProcessTootip?sid=${sid}&switchingSignal=${statusSingle}`,
    method: 'patch',
    data
  })
}


/* 用户管理弹窗 */
export function GetUserManagement() {
  return request({
    url:  `api/LocationSetting/GetUserManagement`,
    method: 'get',
  })
}

// 工位看板
export function GetServiceStatusAndProcessTooltipAndProdcutionType(sid) {
  return request({
    url:  `api/LocationSetting/GetServiceStatusAndProcessTooltipAndProdcutionType?sid=${sid}`,
    method: 'get',
  })
}