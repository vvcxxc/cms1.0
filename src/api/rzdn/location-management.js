import axios from "@/plugins/axios";
export default {


  // === 工位报表 开始 =====================
  // 获取工位搜索字段
  getLocationReportSearchFields(id) {
    return axios.get(`/api/LocationReport/GetSearchFields?stationId=${id}`)
  },
  /**
   * @description 获取工位报表
   * @params 参数: {
      StationId: 0, // 工位id
      SearchFieldId: '', // 字段
      Keyword: '', // 关键词
      StartTime: '', // 开始时间
      EndTime: '', // 结束时间
      Page: 0 // 第几页
    }
    */
  getLocationReports(params) {
    return axios.post("/api/LocationReport/GetLocationReports", params)
  },

  // 获取列数据
  getColumnInfos(id) {
    return axios.get(`/api/LocationReport/GetColumnInfos?stationId=${id}`)
  },
  // === 工位报表 结束 =====================

  // === 首件报表 开始 =====================
  // 获取工位搜索字段
  getFirstArticleReportSearchFields(id) {
    return axios.get(`/api/FirstArticleReport/GetSearchFields?stationId=${id}`)
  },
  // 获取列数据
  getFirstArticleReportColumnInfos(id) {
    return axios.get(`/api/FirstArticleReport/GetColumnInfos?stationId=${id}`)
  },

  /**
   * @description 获取工位报表
   * @params 参数: {
      StationId: 0, // 工位id
      SearchFieldId: '', // 字段
      Keyword: '', // 关键词
      StartTime: '', // 开始时间
      EndTime: '', // 结束时间
      Page: 0 // 第几页
    }
    */
  getFirstArticleReportLocation(params) {
    return axios.post("/api/FirstArticleReport/GetLocationReports", params)
  },


  /**
   * @description 首件测试-获取
   * @params 参数: {
      StationId: 0, // 工位id
      TableId: 0, // 表格id
    }
    */
  getFirstArticleResult(params) {
    return axios.post("/api/FirstArticleReport/GetFirstArticleResult", params)
  },
  /**
   * @description 首件测试-保存
   * @params 参数: {
      "Items": [
        {
          "ID": "string",
          "Value": "string"
        }
      ],
      StationId: 0, // 工位id
      TableId: 0, // 表格id
    }
    */
  SaveFirstArticleResult(params) {
    return axios.post("/api/FirstArticleReport/SaveFirstArticleResult", params)
  },
  // === 首件报表 结束 =====================
  



  // === 工位 开始 =====================
  // 获取工位列表
  getLocationReport(sCMSUserID) {
    return axios.get(`/api/LocationSetting/GetLocationReport?sCMSUserID=${sCMSUserID}`)
  },
  getLocationReportNoId() {
    return axios.get(`/api/LocationSetting/GetLocationReport`)
  },
  /**
   * @description 新建工位
   * @params 参数: {
      WorkStationName: '操作工位1', // 工位名称 
      OKSignal: 'OKSignal', // 完工信号
      Type: 2, // 工位类型：1 生产工位 2 成品工位 3 检测工位
    }
    */
  addLocation(params) {
    return axios.post("/api/LocationSetting/AddLocation", params)
  },
  /**
   * @description 编辑工位
   * @params 参数: {
      WorkStationName: '操作工位1', // 工位名称 
      OKSignal: 'OKSignal', // 完工信号
      Type: 2, // 工位类型：1 生产工位 2 成品工位 3 检测工位
    }
    */
  modifyLocation(params) {
    return axios.patch("/api/LocationSetting/ModifyLocation", params)
  },
  /**
   * @description 删除工位
   * @params id: '123', // 工位id
    */
  deleteLocation(id) {
    return axios.delete(`/api/LocationSetting/DeleteLocation?id=${id}`)
  },
  /**
   * @description 工位排序
   * @params id: '123', // 工位id
    */
  sortLocation(id) {
    return axios.post(`/api/LocationSetting/MoveLocation?id=${id}`)
  },
  // === 工位 结束 =====================

  // === 弹窗管理 开始 =====================
  // 获取弹窗管理列表
  getPopupManagement() {
    return axios.get("/api/LocationSetting/GetPopupManagement")
  },
  /**
   * @description 弹窗管理-保存
   * @params 参数: [{
      ID: -16593365970001064, // id
      Tootip: "2", // 提示文本
      Single: "$Time", // 触发信号(变量)
    }]
    */
  savePopupManagement(params) {
    return axios.post(`/api/LocationSetting/SavePopupManagement`, params)
  },
  /**
   * @description 弹窗管理-删除
   * @params [1, 2, 3], // id
    */
  deletePopupManagement(params) {
    return axios.delete(`/api/LocationSetting/DeletePopupManagement`, {data: params})
  },
  
  // 下发复位信号
  setServiceSignal(OKSignal) {
    return axios.post(`/api/LocationSetting/SetServiceSignal?signal=${OKSignal}`)
  },
  // === 弹窗管理 结束 =====================

  // === 参数信息 开始 =====================
  // 获取参数信息报表
  getParameterReport(id) {
    return axios.get(`/api/LocationSetting/GetParameterReport?workStationId=${id}`)
  },
  /**
   * @description 批量编辑参数
   * @params 参数: [{
      "WorkStationId": 1, // 工位id
      "ParameterId": 1, // 参数id，值为0就是新建
      "ParameterName": "参数名称", // 参数名称
      "Type": 1, // 参数类型
      "VariableName": "变量名称" // 变量名称
    }]
    */
  saveParameterInfo(params) {
    return axios.patch(`/api/LocationSetting/SaveParameterInfo`, params)
  },
  /**
   * @description 获取参数类型选项
   * @params id: '123', // 工位类型
    */
  getParameterType(id) {
    return axios.get(`/api/LocationSetting/GetParameterType?locationType=${id}`)
  },
  /**
   * @description 删除参数信息
   * @params [1, 2, 3], // 参数信息id
    */
   deleteParameterInfo(params) {
    return axios.delete(`/api/LocationSetting/DeleteParameterInfo`, {data: params})
  },
  // === 参数信息 结束 =====================


  // 获取订单字段
  getOrderField() {
    return axios.get(`/api/LocationSetting/GetOrderField`)
  },

   // 获取物料管理类型
   GetMaterialType(id) {
    return axios.get(`/api/LocationSetting/GetMaterialType?keyword=${id}`)
  },


  // === 首件测试 开始 =====================
  // 获取首件测试列表
  getFristArticleTestingReport(id) {
    return axios.get(`/api/LocationSetting/GetFristArticleTestingReport?workStationId=${id}`)
  },
  // 获取首件测试-记录类型
  getFristArticleTesting() {
    return axios.get("/api/LocationSetting/GetFristArticleTesting")
  },
  /**
   * @description 首件测试-保存
   * @params 参数: [{
      FristArticleTestingId: 123123213, // id
      Type: 1, // 记录类型
      Name: "裁线" // 名称
    }]
    */
  saveFristArticleTesting(params) {
    return axios.post(`/api/LocationSetting/SaveFristArticleTesting`, params)
  },
  /**
   * @description 首件测试-删除
   * @params [1, 2, 3], // id
    */
   delectFristArticleTesting(params) {
    return axios.delete(`/api/LocationSetting/DelectFristArticleTesting`, {data: params})
  },
  // === 首件测试 结束 =====================

  // === 指导书 开始 =====================
  // 获取当前运行中订单的信息
  getCurrentOrderInfo() {
    return axios.get(`/api/Order/GetCurrentOrderInfo`)
  },
  /**
   * @description 指导书(多个)
   * @params 参数: {
      "FormulaId": "1", // 配方id
      "StationId": 1 // 工位id
    }
    */
  getGuideBooks(params) {
    return axios.post(`/api/GuidingBook/GetGuideBooks`, params)
  },
  /**
   * @description 指导书(单个)
   * @params 参数: {
      "CurrentId": 0, // 当前指导书id；当前指导书id没有可不传
      "FormulaId": "string", // 配方id
      "StationId": 0 // 工位id
    }
    */
  getGuideBook(params) {
    return axios.post(
      `/api/GuidingBook/GetGuideBook`, 
      params, 
      { responseType: 'blob' }
    )
  },

  // 根据id获取PDF
  getFileByID(id) {
    return axios.get(
      `/api/GuidingBook/GetFileByID/${id}`, 
      { responseType: 'blob' }
    )
  },
  // === 指导书 结束 =====================

  // 获取产品编号工位ID
  getProductionNumberLocationID() {
    return axios.get(`/api/LocationSetting/GetProductionNumberLocationID`)
  },
};