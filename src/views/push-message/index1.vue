<template>
  <div class="alarm-container flex" :style="{zoom:zoomValue}">
    <!-- 导航 -->
    <div class="tabs">
      <div
        v-for="(item,i) in menuList"
        :key="i"
        @click="linkPage(item.path)"
        class="itme flex"
        :class="$route.path === item.path ? 'select-itme' : ''"
      >
        <div class="block"></div>
        <div class="text font-1">{{item.name}}</div>
      </div>
    </div>

    <!-- 内容 -->
    <div class="container">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      lang: JSON.parse(localStorage.getItem('languages'))[localStorage.getItem('currentLang')],
      menuList: [
        {
          name: '报警消息',
          path: '/MsgPush/alarm-message'
        },
        {
          name: '代办消息',
          path: '/MsgPush/todo-message'
        },
        {
          name: '推送日志',
          path: '/MsgPush/push-log'
        },
      ],
      zoomValue: 0,
      activeName: 'second',
    };
  },
  mounted() {
    this.init()
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
      $('.alarm-container').css({marginTop, height:`calc(100% - ${height})`});
    },
    // 跳转页面
    linkPage(path) {
      if (this.$route.path === path) return;
      if (!path) {
        this.$router.push({path: this.menuList[0].path});
        return;
      }
      this.$router.push({path});
    },
    init() {
      this.menuList[0].name = this.lang['报警消息'];
      this.menuList[1].name = this.lang.PushMessage_ToDoMessage;
      this.menuList[2].name = this.lang.PushMessage_PushLog;
      this.initContainerSize()
      // console.log('比例', this.zoomValue);
      this.linkPage(this.menuList[0].path)
    }
  }
};
</script>

<style lang='scss' scoped>
@import "@/assets/style/push-message.scss";
.alarm-container {
  width: 100%;
  height: 100%;
  padding: 20px 20px;
  background: #EEEEEE;
  .tabs {
    width: 188px;
    min-width: 188px;
    height: 100%;
    background: #E9EEEF;
    border: 1px solid #E4E4E4;

    .itme {
      width: 100%;
      height: 50px;
      line-height: 50px;
      background: #F4F7F7;
      cursor: pointer;
      .block {
        width: 5px;
        min-width: 5px;
        height: 100%;
        background: #4270E4;
        opacity: 0;
      }
      .text {
        width: 100%;
        height: 100%;
        padding: 0 0 0 20px;
      }
    }
    .itme:hover, .select-itme {
      background: #FFFFFF;
      .block {
        opacity: 1;
      }
      .text {
        font-weight: bold;
        color: #4270E4;
      }
    }

  }

  .container {
    width: calc(100% - 188px);
    height: 100%;
    background: white;
  }
}
</style>