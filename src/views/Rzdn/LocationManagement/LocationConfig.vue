<template>
  <div id="location-management" class="flex" :style="{zoom:zoomValue}">
    <!-- 工位设置 -->
    <location-management class="location-management" @current-change="handleCurrentChange"></location-management>

    <!-- 参数信息 -->
    <div class="parameter-nodata flex" v-if="!locationData">请选择工位</div>
    <parameter-info v-if="locationData" :locationData="locationData"></parameter-info>
  </div>
</template>
<script>
import LocationManagement from './components/location-management.vue';
import ParameterInfo from './components/parameter-info.vue';
import { throttle } from 'lodash';
export default {
  components: {LocationManagement, ParameterInfo},
  data() {
    return {
      zoomValue: 0,
      locationData: null,
      tableMaxHeight: 500
    };
  },
  methods: {
    // 初始化容器尺寸
    initContainerSize() {
      this.zoomValue = Number(parseFloat(window.screen.width / 1920).toFixed(2)) <= 0.8 ? 0.8 : Number(parseFloat(window.screen.width / 1920).toFixed(2))
      var toolbarH = $('.v-toolbar').height();
      var toolbarZ = $('.v-toolbar')[0].style.zoom;
      var footerH = $('.v-footer').height();
      var footerZ = $('.v-footer')[0].style.zoom;
      var marginTop = toolbarH * toolbarZ + 'px';
      let height = toolbarH * toolbarZ + footerH * footerZ + 'px';
      $('#location-management').css({marginTop, height:`calc(100% - ${height - 30})`});
    },
    // 工位管理-选择行
    handleCurrentChange(data) {
      // console.log('祖宗.选择行', data);
      this.locationData = data
    },
    init() {
      this.initContainerSize()
    }
  },
  mounted() {
    this.init()
  },
  created() {
    this.tableMaxHeight = document.body.offsetHeight
    window.onresize = throttle(() => {
      this.tableMaxHeight = document.body.offsetHeight
    }, 100)
  }
};
</script>

<style lang='scss' scoped>
@import "@/assets/style/push-message.scss";
#location-management {
  width: 100%;
  // height: 100%;
  height: calc(100% - 120px);
  padding: 20px 20px;
  background: #EEEEEE;
  .parameter-nodata {
    width: 50%;
    height: 100%;
    padding: 0 0 0 10px;
    background: white;
  }
}
</style>