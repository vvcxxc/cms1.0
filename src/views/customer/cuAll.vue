<!--
 * @Description: 这是***页面（组件）
 * @Date: 2021-01-05 10:45:32
 * @Author: Tao
 * @LastEditors: Tao
 * @LastEditTime: 2021-01-14 11:50:39
-->
<template>
  <div style="margin-top:100px;margin-left:100px">
      <div >
        <input id="mymap" type="checkbox">
      </div>
      <div class="dd"></div>
      <div @click="createPicture()">导出</div>
  </div>
</template>

<script>
import html2canvas from "html2canvas"
  export default {
    data() {
      return {
     
      };
    },
    created(){
      
    },

    methods: {
        //导出
      createPicture() {
          var cloneDom = $('#mymap')
          var dom = cloneDom.clone(true)
          $('.dd').append(dom)

          var aa = $('.dd')
          console.log('ddomm',aa[0])

            html2canvas(aa[0]).then(canvas => {
                this.imgmap = canvas.toDataURL()
                document.execCommand
                if (window.navigator.msSaveOrOpenBlob) {
                    var bstr = atob(this.imgmap.split(',')[1])
                    var n = bstr.length
                    var u8arr = new Uint8Array(n)
                    while (n--) {
                        u8arr[n] = bstr.charCodeAt(n)
                    }
                    var blob = new Blob([u8arr])
                    window.navigator.msSaveOrOpenBlob(blob, '曲线' + '.' + 'png')
                
                } else {
                    // 这里就按照chrome等新版浏览器来处理
                    const a = document.createElement('a')
                    a.href = this.imgmap
                    a.setAttribute('download', '曲线')
                    a.click()
                }
			});
		},

    }
  };
</script>