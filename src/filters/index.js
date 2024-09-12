/* 订单管理过滤器 */
export function orderManageStatus(value) {
  if (value === 1) {
    return '生产中'
  }
  if (value === 2) {
    return '暂停'
  }
  if (value === 3) {
    return '待生产'
  }
  if (value === 4) {
    return '完成'
  }
}

export function orderManageResult(value) {
  if (value) {
    return '合格'
  } else {
    return '不合格'
  }
}