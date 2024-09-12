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

    Vue.prototype.confirm_Pop = (ref, message, success) => {
      ref.$confirm(message, '提示', {
        customClass: 'confirmDialog',
        cancelButtonText: '取消',
        confirmButtonText: '确定',
        closeOnClickModal: false,
        type: 'warning',
        callback: (info) => {
          if (info === 'confirm') {
            success()
          }
        }
      })
    }

  }
}
