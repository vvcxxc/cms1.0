
/* 全局过滤器 */
export function filterCondition (val, {
    PushMessage_WhenTriggered,
    PushMessage_WhenConfirmed,
    PushMessage_WhenRecovered,
    PushMessage_WhenTimeoutNotConfirmed,
    PushMessage_WhenTimeoutNotRecovered,
    PushMessage_WhenReminding,
    PushMessage_WhenDone,
    PushMessage_WhenTimeoutNotDeal
  }) {
  // debugger
  if (val === 1) {
    return PushMessage_WhenTriggered
  }
  if (val === 2) {
    return PushMessage_WhenConfirmed
  }
  if (val === 3) {
    return PushMessage_WhenRecovered
  }
  if (val === 4) {
    return PushMessage_WhenTimeoutNotConfirmed
  }
  if (val === 5) {
    return PushMessage_WhenTimeoutNotRecovered
  }
  if (val === 101) {
    return PushMessage_WhenReminding
  }
  if (val === 102) {
    return PushMessage_WhenDone
  }
  if (val === 103) {
    return PushMessage_WhenTimeoutNotDeal
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