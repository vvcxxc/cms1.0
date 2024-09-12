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
  drag(el) {
    let dragBox = el; //获取当前元素
    dragBox.onmousedown = e => {
        let disX = e.clientX;  //算出鼠标相对元素的位置
        let disY = e.clientY;
        document.onmousemove = e => {
            let left = e.clientX - disX; //用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
            let top = e.clientY - disY;
            $(el).parents('.Popshow')[0].style.left = left + "px"; //移动当前元素
            $(el).parents('.Popshow')[0].style.top = top + "px";
        };
        document.onmouseup = e => {
            document.onmousemove = null;
            document.onmouseup = null;
        };
    };
}
}