import elDragDialog from './el-drag-dialog/drag'

const directives = {
  elDragDialog
}

export default {
  install(Vue) {
    Object.keys(directives).forEach((key) => {
      Vue.directive(key, directives[key])
    })
  },
}