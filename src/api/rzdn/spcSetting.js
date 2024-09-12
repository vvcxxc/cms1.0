import request from "@/plugins/axios";

export function AddSPCConfig(data) {
  return request({
    url: `/api/SPC/AddSPCConfig`,
    method: 'post',
    data
  })
}

export function EditSPCConfig(data) {
  return request({
    url: `/api/SPC/EditSPCConfig`,
    method: 'post',
    data
  })
}

export function RestoreSPCConfig(data) {
  return request({
    url: `/api/SPC/RestoreSPCConfig`,
    method: 'post',
    data
  })
}

export function GetEditRecordDTO(data) {
  return request({
    url: `/api/SPC/GetEditRecordDTO`,
    method: 'post',
    data
  })
}

export function GetSPCConfig(data) {
  return request({
    url: `/api/SPC/GetSPCConfig`,
    method: 'post',
    data
  })
}

export function DeleteSPCConfig(data) {
  return request({
    url: `/api/SPC/DeleteSPCConfig`,
    method: 'post',
    data
  })
}

export function IsProcessParameter(serialNumber, variableName) {
  return request({
    url:  `/api/SPC/IsProcessParameter?serialNumber=${serialNumber}&variableName=${variableName}`,
    method: 'get',
  })
}

export function SPCConfigExport(data) {
  return request({
    url:  `/api/SPC/SPCConfigExport`,
    method: 'post',
    responseType: 'blob',
    data
  })
}

export function EditRecordExport(data) {
  return request({
    url:  `/api/SPC/EditRecordExport`,
    method: 'post',
    responseType: 'blob',
    data
  })
}