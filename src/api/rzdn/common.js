/*
 * @Author       : conghui li conghui.li@shengyc.com
 * @Date         : 2022-09-29 18:10:21
 * @LastEditors  : conghui li conghui.li@shengyc.com
 * @LastEditTime : 2022-09-30 16:22:43
 */
import request from "@/plugins/axios";

export function GstCondition(data) {
  return request({
    url:  `/api/ProcessParameterConfigure/GstCondition`,
    method: 'post',
    data
  })
}

// {"argDevice":"不限","argGroup":"不限","argDataType":["日期","时间","日期时间"],"argKeyWord":"","argPageSize":50,"argPageIndex":1}
export function GstVariableList(data) {
  return request({
    url:  `/api/ProcessParameterConfigure/GstVariableList`,
    method: 'post',
    data
  })
}

export function GetVariable(data) {
  return request({
    url:  `/api/SPC/GetVariable`,
    method: 'post',
    data
  })
}

export function Login_GstLoginIsSuccess(userName, password) {
  return request({
    url:  `/api/Login/Login_GstLoginIsSuccess?argUserAccount=${userName}&argPassword=${password}`,
    method: 'post',
  })
}

// 打印
export function StartPrinting(printerID,data) {
  return request({
    url:  `/api/LocationSetting/StartPrinting?printerID=${printerID}`,
    method: 'post',
    data
  })
}

// 扫码枪
export function MaterialMistakeProofing(code) {
  return request({
    url:  `/api/LocationSetting/MaterialMistakeProofing?code=${code}`,
    method: 'post',
  })
}


// 获取按钮权限
export function getPowerById(userid, btnId) {
  return request({
    url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${btnId}`,
    method: 'post',
  })
}

export function getRightTree() {
  return request({
    url: `/api/UserManage/UserManage_GetRightTree`,
    method: 'post',
  })
}

/**
 * 打印成品工位标签
 * @param {string} contentId 产品编码
 * @param {string} printerID 打印机id
 * @returns 
 */
export function printerFinishedProductLabel(contentId, printerID) {
  return request({
    url: `/api/LocationReport/PrinterFinishedProductLabel?content=${contentId}&printerID=${printerID}`,
    method: 'post',
  })
}

/**
 * 获取产品编号索引
 * @param {number} stationId 工位id
 * @returns 产品编号索引
 */
export function getProductionNumberID(stationId) {
  return request({
    url: `/api/LocationReport//GetProductionNumberID?stationId=${stationId}`,
    method: 'get',
  })
}


