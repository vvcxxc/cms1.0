/* 全局过滤器 */
export function filterCondition (val) {
  if (val === 1) {
    return '报警触发时'
  }
  if (val === 2) {
    return '报警确认时'
  }
  if (val === 3) {
    return '报警恢复时'
  }
  if (val === 4) {
    return '报警超时未确认'
  }
  if (val === 5) {
    return '报警超时未恢复'
  }
}

export function filterRemind (val) {
  if (val === 1) {
    return '弱提醒'
  }
  if (val === 2) {
    return '强提醒'
  }
}