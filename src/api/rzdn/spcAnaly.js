import request from "@/plugins/axios";

export function SPCAnalysis(data) {
  return request({
    url: `/api/SPC/SPCAnalysis`,
    method: 'post',
    data
  })
}

export function GetSPCSample(data) {
  return request({
    url: `/api/SPC/GetSPCSample`,
    method: 'post',
    data
  })
}

export function EditSPCConfigLimit(SPCConfigId, UpperLimit, LowerLimit) {
  return request({
    url: `/api/SPC/EditSPCConfigLimit?SPCConfigId=${SPCConfigId}&UpperLimit=${UpperLimit}&LowerLimit=${LowerLimit}`,
    method: 'get',
  })
}

export function ExportReportSPCSample(data) {
  return request({
    url:  `/api/SPC/ExportReportSPCSample`,
    method: 'post',
    responseType: 'blob',
    data
  })
}

export function ExportSPCReport(SPCConfigId, IsRealTime, StartDateTime, EndDateTime, data) {
  return request({
    url:  `/api/SPC/ExportSPCReport?SPCConfigId=${SPCConfigId}&IsRealTime=${IsRealTime}&StartDateTime=${StartDateTime}&EndDateTime=${EndDateTime}`,
    method: 'post',
    responseType: 'blob',
    data
  })
}

export function SelectAlarmMode(SpcConfigId, ShutDown) {
  return request({
    url: `/api/SPC/SelectAlarmMode?SpcConfigId=${SpcConfigId}&ShutDown=${ShutDown}`,
    method: 'get',
  })
}

export function SetWarnInfo(data) {
  return request({
    url: `/api/SPC/SetWarnInfo`,
    method: 'post',
    data
  })
}

export function GetAlarmRecord(data) {
  return request({
    url: `/api/SPC/GetAlarmRecord`,
    method: 'post',
    data
  })
}

export function GetWarnInfo() {
  return request({
    url: `/api/SPC/GetWarnInfo`,
    method: 'get',
  })
}

export function ConfirmAlarm(data) {
  return request({
    url: `/api/SPC/ConfirmAlarm`,
    method: 'post',
    data
  })
}

export function ExportAlarmRecord(data) {
  return request({
    url: `/api/SPC/ExportAlarmRecord`,
    method: 'post',
    responseType: 'blob',
    data
  })
}

export function ResetPopUp() {
  return request({
    url:  `/api/SPC/ResetPopUp`,
    method: 'get',
  })
}
