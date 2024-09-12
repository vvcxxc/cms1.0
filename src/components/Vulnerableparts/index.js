/**
 * @description 获取统计类型的值
 * @params {string | number} key 
 * @return {number} 统计类型的值
  */
const getStatisticalTypeValue = (key) => {
  if (!key) {
    console.log('参数缺失');
    return
  }
  const list = {
    '标准时间': {value: 1},
    '运行时间': {value: 2},
    '使用次数': {value: 3},
    1: {value: '标准时间'},
    2: {value: '运行时间'},
    3: {value: '使用次数'},
  }

  if (list[key]) {
    return list[key].value
  } else {
    return null
  }
}

/**
 * @description 获取寿命周期类型的值
 * @params {string} key 
 * @params {string} model 需要获取的值 text-获取文本 num-获取数字
 * @return {number} 统计类型的值
  */
 const getLifeCycleUnitValue = (key) => {
  if (!key) {
    console.log('参数缺失');
    return
  }
  const list = {
    1: {value: '小时'},
    2: {value: '天'},
    3: {value: '月'},
    4: {value: '年'},
    5: {value: '次'},
    '小时': {value: 1},
    '天': {value: 2},
    '月': {value: 3},
    '年': {value: 4},
    '次': {value: 5},
  }
  if (list[key]) {
    return list[key].value
  } else {
    return null
  }
}

/**
 * @describe 获取当前时间
 * @return {
 *    y: String // 年 2021
 *    m: String // 月 01
 *    d: String // 日 15
 *    h: String // 时 22
 *    u: String // 分 56
 *    s: String // 秒 07
 * }
 */
const getCurrentTime = () => {
  var y = new Date().getFullYear().toString();
  var m = (new Date().getMonth() + 1).toString();
  var d = new Date().getDate().toString();
  var h = new Date().getHours().toString();
  var u = new Date().getMinutes().toString();
  var s = new Date().getSeconds().toString();
  m = (Number(m) < 10) ? '0' + m : m.toString()
  d = (Number(d) < 10) ? '0' + d : d.toString()
  h = (Number(h) < 10) ? '0' + h : h.toString()
  u = (Number(u) < 10) ? '0' + u : u.toString()
  s = (Number(s) < 10) ? '0' + s : s.toString()
  return {y, m, d, h, u, s}
}

export {
  getStatisticalTypeValue, 
  getLifeCycleUnitValue,
  getCurrentTime,
}
