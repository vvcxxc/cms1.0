/*
  参数类型：
  1.过程参数-1、合格信号-5、扫码枪-6：跳出变量选择弹窗；
  2.订单字段-2：订单字段弹窗
  3.物料防错-3、产品编号-4：选择按钮不可用(点了没反应)
*/

// 初始化容器尺寸
const initContainerSize = (DOM) => {
  const zoom = Number(parseFloat(window.screen.width / 1920).toFixed(2)) <= 0.8 ? 0.8 : Number(parseFloat(window.screen.width / 1920).toFixed(2))
  var toolbarH = $('.v-toolbar').height();
  var toolbarZ = $('.v-toolbar')[0].style.zoom;
  var footerH = $('.v-footer').height();
  var footerZ = $('.v-footer')[0].style.zoom;
  var marginTop = toolbarH * toolbarZ + 'px';
  let height = toolbarH * toolbarZ + footerH * footerZ + 'px';
  $(DOM).css({marginTop, height:`calc(100% - ${height})`});
  return zoom
}

// 随机数字，可用作id
const randomNumber = () => {
  const a  = Date.parse(new Date()).toString()
  const b = parseInt(Math.random() * (10000 - 1000 + 1) + 1000);
  return Number(a + b)
}

// 获取今天时间 state: StartTime-开始  EndTime-结束
const toDay = (state) => {
  const y = new Date().getFullYear();
  let m = new Date().getMonth() + 1;
  let d = new Date().getDate();
  const time = state === 'StartTime' ? '00:00:00' : '23:59:59';
  // 补零
  m = (m < 10) ? "0" + m : m
  d = (d < 10) ? "0" + d : d;
  return `${y}-${m}-${d} ${time}`
}

/**
 * @description 根据条件清除数组
 * @params arr1 // 被清除数组
 * @params arr2 // 清除目标数组
 * @params key // 关键字
 * @return newList // 新数组
  */
const clearArray = (arr1, arr2, key) => {
  let newList = []
  for (let i = 0, iLen = arr1.length; i < iLen; i++) {
    const item = arr1[i]
    let isDel = false
    for (let n = 0, nLen = arr2.length; n < nLen; n++) {
      if (item[key] === arr2[n]) {
        isDel = true
        break
      }
    }
    if (!isDel) newList.push(item)
  }
  return newList
}

/**
 * @description 验证数据是否被改动
 * @params object1 // 标准数据
 * @params object2 // 待验证数据
 * @return true已改 false未改
  */
const dataIsChange = (object1, object2) => {
  var isChange = false;
  var obj1 = JSON.parse(JSON.stringify(object1))
  var obj2 = JSON.parse(JSON.stringify(object2))
  function recursive(obj1, obj2) {
    for (var key in obj1) {
      var item1 = obj1[key];
      var item2 = obj2[key];
      if ((item1 instanceof Array) && (item2 instanceof Array)) {
          if (item1.length !== item2.length) {
              isChange = true
              return
          }
          recursive(item1, item2)
      } else if (typeof item1 !== "object" && item2 === undefined) {
          isChange = true
      } else if (typeof item1 === "object" && item2 === undefined) {
          isChange = true
      } else if (typeof item1 === "object" && typeof item2 === "object") {
          recursive(item1, item2)
      } else if (item1 === undefined && item2) {
          isChange = true
      } else if (item1 !== item2) {
          isChange = true
      }
    }
  }

  if (object1.length !== object2.length) return true

  recursive(obj1, obj2)
  return isChange
}

// 获取订单字段
const getOrderField = async () => {
  return window.api.locationManagement.getOrderField().then(ref => {
    return ref.data.data
  }, err => {
    console.log(err);
  })
}

const GetMaterialType = async (i) => {
  return window.api.locationManagement.GetMaterialType(i).then(ref => {
    return ref.data.data
  }, err => {
    console.log(err);
  })
}

/**
 * @description 获取订单字段文本
 * @params {Object} row // {
      "WorkStationId": 1, // 工位id
      "ParameterId": 1, // 参数id，值为0就是新建
      "ParameterName": "参数名称", // 参数名称
      "Type": 1, // 参数类型
      "VariableName": "变量名称" // 变量名称
    }
 * @params {Array} list  // [{Item1: 1, Item2: "订单号"}]
  */
const getOrderFieldsText = (row, list) => {
  if ([4].includes(row.Type)) return '-'
  if (row.Type !== 2) return row.VariableName
  for (let i = 0, iLen = list.length; i < iLen; i++) {
    const item = list[i]
    if (Number(row.VariableName) === item.Item1) {
      return item.Item2
    }
  }
  return ''
}

export {
  initContainerSize,
  randomNumber,
  toDay,
  clearArray, 
  dataIsChange, 
  getOrderField, 
  getOrderFieldsText,
  GetMaterialType 
}
