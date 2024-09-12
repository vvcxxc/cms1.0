import request from "@/plugins/axios";

export function GetProductModelInfo() {
  return request({
    url:  `/api/Order/GetProductModelInfo`,
    method: 'get',
  })
}

export function GetFormularInfo(data) {
  return request({
    url:  `/api/Order/GetFormularInfo`,
    method: 'post',
    data
  })
}

export function GetOrder(orderId) {
  return request({
    url:  `/api/Order/GetOrder?OrderId=${orderId}`,
    method: 'get',
  })
}

export function GetWorkStationRecords(data) {
  return request({
    url:  `/api/Order/GetWorkStationRecords`,
    method: 'post',
    data
  })
}

export function DeleteWorkStationRecords(data) {
  return request({
    url:  `/api/Order/DeleteWorkStationRecords`,
    method: 'post',
    data
  })
}

export function GetOrders(data) {
  return request({
    url:  `/api/Order/GetOrders`,
    method: 'post',
    data
  })
}

export function AddOrder(data) {
  return request({
    url:  `/api/Order/AddOrder`,
    method: 'post',
    data
  })
}

export function UpdateOrder(id,data) {
  return request({
    url:  `/api/Order/UpdateOrder?oldOrderId=${id}`,
    method: 'post',
    data
  })
}

export function StartData(orderId) {
  return request({
    url: `/api/Order/Start?OrderId=${orderId}`,
    method: 'get',
  })
}

export function ConfirmStart(data) {
  return request({
    url:  `/api/Order/ConfirmStart`,
    method: 'post',
    data
  })
}

export function PauseData(orderId) {
  return request({
    url:  `/api/Order/Pause?OrderId=${orderId}`,
    method: 'get',
  })
}

export function FinishData(data) {
  return request({
    url:  `/api/Order/Finish`,
    method: 'post',
    data
  })
}

export function DeleteData(data) {
  return request({
    url:  `/api/Order/Delete`,
    method: 'post',
    data
  })
}

export function Detail(productNo) {
  return request({
    url:  `/api/Order/Detail?productNo=${productNo}`,
    method: 'get',
  })
}