/*
 * @Description: 这是***页面（组件）
 * @Date: 2020-11-24 17:21:51
 * @Author: Tao
 * @LastEditors: Tao
 * @LastEditTime: 2021-03-01 11:44:23
 */
import html2Canvas from 'html2canvas'
import JsPDF from 'jspdf'
export default{
  install (Vue, options) {
    Vue.prototype.getPdf = function (idStr, title) {
      html2Canvas(document.querySelector('#' + idStr), {
        allowTaint: true
      }).then(function (canvas) {
        let contentWidth = canvas.width;
        let contentHeight = canvas.height;
        //一页pdf显示html页面生成的canvas高度;
        let pageHeight = (contentWidth / 592.28) * 841.89;
        //未生成pdf的html页面高度
        let leftHeight = contentHeight;
        //页面偏移
        let position = 0;
        //a4纸的尺寸[595.28,841.89]，html页面生成的canvas在pdf中图片的宽高
        let imgWidth = 595.28;
        let imgHeight = (592.28 / contentWidth) * contentHeight;
        let pageData = canvas.toDataURL("image/jpeg", 1.0);
        let dpiX = 97;
        let dpiY = 96;

        //l:横向， p：纵向；单位： in:英寸，mm毫米；画布大小：a3,a4,leter,[]（当内容为数组时，为自定义大小）
        let PDF = new JsPDF("l", "in", [(contentWidth+15)/dpiX,(contentHeight+10)/dpiY]);  // 自定义页面大小
        if (leftHeight <= pageHeight) {
            PDF.addImage(pageData, "JPEG", 5/dpiX,5/dpiY); 
        } else {
            while (leftHeight > 0) {
                PDF.addImage(pageData, "JPEG", 0, position);
                leftHeight -= pageHeight;
                position -= 841.89;
                if (leftHeight > 0) {
                    PDF.addPage();
                }
            }
        }
        PDF.save(title + ".pdf");
      }
      )
    }
  }
}