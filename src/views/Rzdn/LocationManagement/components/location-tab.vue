<!-- 工位选项卡 -->
<template>
  <div class="location-tab">
    <div class="options" v-if="list.length">
      <div 
        v-for="(item, i) in list"
        :key="i"
        class="itme flex" 
        :class="item.WorkStationId === current.WorkStationId ? 'select-itme' : ''" 
        @click="selectLocation(item)"
      >
        {{item.WorkStationName}}
      </div>
    </div>
    <div class="no-data flex" v-else>
      <div>暂无工位</div>
    </div>
  </div>
</template>
<script>
import { getUserInfo } from "@/util/user"
export default {
  data() {
    return {
      list: [],
      current: {},
    }
  },
  methods: {
    getLocationReport() {
      let userInfo = getUserInfo()
      if (!userInfo) {
        this.confirm_Pop2(this, '缺少用户数据')
        return
      }
      this.$api.locationManagement.getLocationReport(userInfo.SCMSUserID).then(ref => {
        const list = ref.data.data
        // console.log("工位列表", JSON.parse(JSON.stringify(list)));
        // list = []
        this.list = list
        if (list.length) this.selectLocation(list[0])
      }, err => {
        console.log('失败回调', err);
      })
    },
    selectLocation(item) {
      this.current = item
      this.$emit("change", item);
    },
    init() {
      this.getLocationReport()
    }
  },
  mounted() {
    this.init()
  },
};
</script>

<style lang='scss' scoped>
@import "../index.scss";
.location-tab {
  width: 100%;
  height: 100%;
  .itme {
    width: 100%;
    height: 40px;
    margin: 0 0 10px 0;
    line-height: 40px;
    text-align: center;
    background: white;
    border-radius: 6px;
    cursor: pointer;
  }
  .itme:hover, .select-itme {
    color: #EEEEEE;
    background: #4270E4;
  }
  .no-data {
    width: 100%;
    height: 100%;
  }
}
</style>