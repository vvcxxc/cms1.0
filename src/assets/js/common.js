import Vue from 'vue'

export default {
  install(Vue, options) {

    Vue.prototype.message_OK = (ref, message) => {
      ref.$message({
        message,
        type: 'success',
        duration: 2000
      })
    }

    Vue.prototype.message_WARN = (ref, message) => {
      ref.$message({
        message,
        type: 'warning',
        duration: 2000
      })
    }

    Vue.prototype.message_INFO = (ref, message) => {
      ref.$message({
        message,
        type: 'info',
        duration: 2000
      })
    }

    Vue.prototype.message_ERROR = (ref, message) => {
      ref.$message({
        message,
        type: 'error',
        duration: 2000
      })
    }

    Vue.prototype.confirm_Pop = (ref, message, success, tiplang={ tips: '提示', yes: '是（Yes）', no:'否（No）' }) => {
      ref.$confirm(message, tiplang.tips, {
        customClass: 'confirmDialog',
        cancelButtonText: tiplang.no,
        confirmButtonText: tiplang.yes,
        closeOnClickModal: false,
        type: 'warning',
        callback: (info) => {
          if (info === 'confirm') {
            success()
          }
        }
      })
    }

    Vue.prototype.confirm_Pop2 = (ref, message, tiplang={ tips: '提示', yes: '确认' }) => {
      ref.$alert(message, tiplang.tips, {
        customClass: 'confirmDialog confirmDialog2',
        confirmButtonText: tiplang.yes,
        closeOnClickModal: false,
        type: 'warning',
        callback: (info) => {
          // if (info === 'confirm') {
          //   success()
          // }
        }
      })
    }

    // 点击取消也有回调
    Vue.prototype.confirm_Pop3 = (ref, message, success, tiplang = { tips: '提示', yes: '是（Yes）', no:'否（No）' }) => {
      ref.$confirm(message, tiplang.tips, {
        customClass: 'confirmDialog',
        cancelButtonText: tiplang.no,
        confirmButtonText: tiplang.yes,
        closeOnClickModal: false,
        type: 'warning',
        callback: (info) => {
          success(info)
        }
      })
    }

  }
}
