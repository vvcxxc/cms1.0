import axios from "@/plugins/axios";

const scms = {
  /**
   * @description: 请求登陆接口模版
   * @param {type} 
   * @return: 
   */
  login({username, password}) {
    return axios.post("/login", {
      username,
      password
    })
  },

  // 获取变量条件
  getCondition() {
    return axios.post("/api/ProcessParameterConfigure/GstCondition")
  },
  /**
   * @description 获取变量列表
   * @params 参数: {
      argDevice: "不限", // 设备
      argGroup: "不限", // 组名
      argDataType: ["日期", "时间", "日期时间"], // 数据类型；如果不限的话就全部传入
      argKeyWord: "", // 关键字
      argPageSize: 50, // 一页多少数据
      argPageIndex: 1 // 页码
    }
   */
  getVariableList(params) {
    return axios.post("/api/ProcessParameterConfigure/GstVariableList", params)
  },
}


export default scms;