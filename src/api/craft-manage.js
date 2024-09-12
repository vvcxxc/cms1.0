// 工艺管理API
import axios from "@/plugins/axios";

// === 订单 开始 ========================
/**
 * @description: 查询工艺编排记录
 * @params 参数：{
    startTime: '2022-11-29 00:00:00', // 开始时间
    endTime: '2022-11-29 23:59:59', // 结束时间
    status: 0, // 订单状态（0.未编排、1.已编排、2.已下发）该字段可不传，后台已写死2
    keyWord: '', // 关键字
    pageIndex: '', // 当前页
    pageSize: '', // 一页有多少条数据
  }
  * @date 数据结构：[{
    Id: '', // 主单据Id
    PlanNo: '', // 计划号
    OrderNo: '', // 订单号
    Type: '', // 类型
    FormulaNo: '', // 配方号
    BomName: '', // 工艺路线
    BomDescription: '', // 工艺说明
    ProductName: '', // 产品名称
    ProductNo: '', // 产品编号
    BatchNo: '', // 批次号
    PushTime: '', // 下发时间
  }]
 */
function queryHistory(params) {
  return axios.get(`/api/ProductionVoucher/QueryHistory`, {params})
}
/**
 * @description: 获取订单状态列表
  * @date 数据结构：[{
    Text: '',
    Value: '0',
  }]
 */
function getStatus() {
  return axios.get(`/api/ProductionVoucher/GetStatus`)
}
/**
 * @description: 获取生产作业单列表
 * @params 参数：{
    startTime: '2022-11-29 00:00:00', // 开始时间
    endTime: '2022-11-29 23:59:59', // 结束时间
    status: 0, // 订单状态（0.未编排、1.已编排、2.已下发）
    keyWord: '', // 关键字
    pageIndex: '', // 当前页
    pageSize: '', // 一页有多少条数据
  }
  * @date 数据结构：[{
    Id: '', // 主单据Id
    StatusDescription: '', // 订单状态
    PlanNo: '', // 计划号
    OrderNo: '', // 订单号
    Type: '', // 类型
    FormulaNo: '', // 配方号
    BomName: '', // 工艺路线
    BomDescription: '', // 工艺说明
    ProductName: '', // 产品名称
    ProductNo: '', // 产品编号
    BatchNo: '', // 批次号
    PlanStartTime: '', // 计划开始时间
    PlanEndTime: '', // 计划结束时间
    PushTime: '', // 下发时间
  }]
 */
function query(params) {
  return axios.get(`/api/ProductionVoucher/Query`, {params})
}
/**
 * @description: 获取生产作业单详情
 * @params 参数：{
    voucherId: '', // 主单据Id
    boilerGroup: '0' // 0-水锅 1-油锅 2-乳化锅
  }
  * @date 数据结构：[{
    "BoilerGroup": 0,
    "GroupDescription": "水锅",
    "Details": [{
      "Id": 5,
      "VoucherId": 33, // 主单据Id
      "BoilerGroup": 0, // 所属那个锅
      "BoilerGroupDescription": "水锅", // 锅组描述
      "SortNumber": 1, // 序号
      "MaterialNo": "C20140122174224514",// 原料编号 
      "MaterialName": null, // 原料名称（需要权限才能看）
      "Ratio": "0.892698%", // 占比（原料重量占该生产类别总重量的比例，百分数，百分号前保留小数点后6位）
      "FormulaQty": 112.02, // 配方量描述
      "FormulaQtyDescription": "112.02kg", // 配方量描述-说明
      "Qty": 1, // 用量（kg、保留小数点后6位）
      "QtyDescription": "1.00kg" // 用量描述
    }]
  }]
 */
function getDetails(id) {
  return axios.get(`/api/ProductionVoucher/GetDetails?voucherId=${id}`)
}

/**
 * @description: 获取生产作业单详情
  * @params 参数：{
    voucherId: '', // 主单据Id
  }
  * @date 数据结构：{
      // 订单信息
    PlanNo: '', // 计划号
    OrderNo: '', // 订单号
    PlanQty: '', // 计划产量
    ProductName: '', // 产品名称
    ProductNo: '', // 产品编号
    BatchNo: '', // 批次号
    Type: '', // 类型
    PlanStartTime: '', // 计划开始时间
    PlanEndTime: '', // 计划结束时间
    
    // 配方信息
    FormulaNo: '', // 配方号
    VersionNo: '', // 版本号
    BomDescription: '', // 工艺说明
    BomName: '', // 工艺路线

    // 原料清单
    ProductionGroupList: [ 'A相', 'B相', 'C相' ], // 所有组
    SeletedProductionGroupList: [ 'A相' ], // 已选组
    VoucherMaterials: [{
      ProductionGroup: '', // 属于那个组
      ProductionProcedure: '', // 工序
      MaterialNo: '', // 原料编号
      MaterialName: '', // 原料名称
      FormulaQty: 0, // 配方量（只允许输入大于零的数值，kg、保留小数点后6位）
      UpperLimit: 0, // 上线
      LowerLimit: 0 // 下限
    }]
  }
 */
function getOrder(id) {
  return axios.get(`/api/ProductionVoucher/Get?voucherId=${id}`)
}
/**
 * @description: 创建生产作业单
  * @params 参数：{
    // 订单信息
    PlanNo: '', // 计划号
    OrderNo: '', // 订单号
    PlanQty: '', // 计划产量
    ProductName: '', // 产品名称
    ProductNo: '', // 产品编号
    BatchNo: '', // 批次号
    Type: '', // 类型
    PlanStartTime: '', // 计划开始时间
    PlanEndTime: '', // 计划结束时间
    
    // 配方信息
    FormulaNo: '', // 配方号
    VersionNo: '', // 版本号
    BomDescription: '', // 工艺说明
    BomName: '', // 工艺路线

    // 原料清单
    // 生产组别
    ProductionGroupList: [ 'A相', 'B相', 'C相' ], // 所有组
    SeletedProductionGroupList: [ 'A相' ], // 已选组
    VoucherMaterials: [{
      ProductionGroup: '', // 属于那个组
      ProductionProcedure: '', // 工序
      MaterialNo: '', // 原料编号
      MaterialName: '', // 原料名称
      FormulaQty: 0, // 配方量（只允许输入大于零的数值，kg、保留小数点后6位）
      UpperLimit: 0, // 上线
      LowerLimit: 0 // 下限
    }]
  }
 */
function createOrder(params) {
  return axios.post(`/api/ProductionVoucher/Create`, params)
}
/**
 * @description: 更新生产作业单
  * @params 参数：{
    // 订单信息
    Id: '', // 主单据Id
    PlanNo: '', // 计划号
    OrderNo: '', // 订单号
    PlanQty: '', // 计划产量
    ProductName: '', // 产品名称
    ProductNo: '', // 产品编号
    BatchNo: '', // 批次号
    Type: '', // 类型
    PlanStartTime: '', // 计划开始时间
    PlanEndTime: '', // 计划结束时间
    
    // 配方信息
    FormulaNo: '', // 配方号
    VersionNo: '', // 版本号
    BomDescription: '', // 工艺说明
    BomName: '', // 工艺路线

    // 原料清单
    // 生产组别
    ProductionGroupList: [ 'A相', 'B相', 'C相' ], // 所有组
    SeletedProductionGroupList: [ 'A相' ], // 已选组
    VoucherMaterials: [{
      ProductionGroup: '', // 属于那个组
      ProductionProcedure: '', // 工序
      MaterialNo: '', // 原料编号
      MaterialName: '', // 原料名称
      FormulaQty: 0, // 配方量（只允许输入大于零的数值，kg、保留小数点后6位）
      UpperLimit: 0, // 上线
      LowerLimit: 0 // 下限
    }]
  }
 */
function updateOrder(params) {
  return axios.put(`/api/ProductionVoucher/Update`, params)
}

/**
 * @description: 下发生产作业单
  * @params 参数：{
    ids: ['1', '2'], // 主单据Id
  }
 */
function pushOrder(ids) {
  return axios.post(`/api/ProductionVoucher/Push`, ids)
}
/**
 * @description: 删除生产作业单
  * @params 参数：{
    ids: ['1', '2'], // 主单据Id
  }
 */
function deleteOrder(ids) {
  return axios.delete(`/api/ProductionVoucher/Delete/`, {
    data: ids
  })
}
/**
 * @description: 完成编排 订单状态: 未编排 => 已编排
 * @params 参数：voucherId: '', // 主单据Id
 */
function completeOrder(voucherId) {
  return axios.post(`/api/ProductionVoucher/Complete/${voucherId}`)
}
// === 订单 结束 ========================



// === 原料 开始 ========================

/**
 * @description: 获取原料清单
 * @params 参数：voucherId: '', // 主单据Id
  * @date 数据结构：[{
      "ProductionGroup": "",
      "ProductionProcedure": null,
      "Materials": [{
        "Id": 1,
        "VoucherId": 1, // 单据标识 
        "ProductionGroup": "", // 生产组别
        "ProductionProcedure": null, // 工序
        "MaterialNo": "aaa001", // 原料编号
        "MaterialName": "保湿剂", // 原料名称
        "Ratio": "50%", // 占比（原料重量占该生产类别总重量的比例，百分数，百分号前保留小数点后6位） 
        "FormulaQty": 100,
        "FormulaQtyDescription": "100.00kg",
        "RemainQty": 100,
        "RemainQtyDescription": "100.00kg",
        "UpperLimit": null,
        "LowerLimit": null
      }]
    }]
 */
function getMaterials(voucherId) {
  return axios.get(`/api/ProductionVoucher/GetMaterials?voucherId=${voucherId}`)
}
/**
 * @description: 添加原料
  * @params 参数：{
    VoucherId: '', // 单据id
    BoilerGroup: '', // 所属那个组
    "Materials": [{ // 需要添加的原料
      "SortNumber": 0, // 序号
      "MaterialNo": "string", // 原料编号 
      "Qty": 0 // 用量（只允许输入大于零的数值，kg、保留小数点后6位）
    }]
  }
 */
function addMaterials(params) {
  return axios.post(`/api/ProductionVoucher/AddMaterials`, params)
}
/**
 * @description: 移除原料
  * @params 参数：{
    VoucherId: '', // 单据id
    DetailId: '', // 原料id
  }
 */
function removeMaterial(params) {
  return axios.post(`/api/ProductionVoucher/RemoveMaterial`, params)
}
/**
 * @description: 原料排序
  * @params 参数：{
    Id: '', // id
    VoucherId: '', // 单据id
    SortNumber: '', // 序号
  }
 */
function arrange(params) {
  return axios.post(`/api/ProductionVoucher/Arrange`, params)
}
// === 原料 结束 ========================

export {
  // 订单
  queryHistory,
  getStatus,
  query,
  getDetails,
  getOrder,
  createOrder,
  updateOrder,
  pushOrder,
  deleteOrder,
  completeOrder,
  
  // 原料
  getMaterials,
  addMaterials,
  removeMaterial,
  arrange,
}

