<template>
  <div class="content column-start-center">
    <div class="column-start-center basic_layer" v-for="(item,index) in formatData" :key="index">
      <div
        class="row-flex-start basic_banner"
        :class="{
          'c_c': item.expand && item.children.length>0,
        }"
        @click="()=>{item.expand=!item.expand}"
      >
        <div
          class="reTree_icon"
          :class="{
          'reTree_default_icon': item.children.length===0,
          'reTree_collapse_icon': item.expand && item.children.length>0,
          'reTree_expand_icon': !item.expand && item.children.length>0,
        }"
        ></div>
        <div class="layer_text nowrap">{{item.label}}</div>
      </div>
      <template v-if="item.expand&&item.children.length>0">
        <div
          class="column-start-center second_layer linkLine_default"
          v-for="(second,s_index) in item.children"
          :key="s_index"
          :class="{
          'linkLine_first': s_index===0,
          'linkLine_last': s_index===(item.children.length-1) ,
        }"
        >
          <div
            class="row-flex-start basic_banner"
            @click="()=>{second.expand=!second.expand}"
            :class="{
          'c_c': second.expand && second.children.length>0,
        }"
          >
            <div
              class="reTree_icon"
              :class="{
          'reTree_default_icon': second.children.length===0,
          'reTree_collapse_icon': second.expand && second.children.length>0,
          'reTree_expand_icon': !second.expand && second.children.length>0,
        }"
            ></div>
            <div class="layer_text nowrap">{{second.label}}</div>
          </div>
          <template v-if="second.expand&&second.children.length>0">
            <div
              class="row-flex-start third_layer linkLine_first"
              v-for="(third,t_index) in second.children"
              :key="t_index"
              :class="{
          'linkLine_first': t_index===0,
          'linkLine_last': t_index===second.children.length-1 ,
        }"
            >{{third.label}}</div>
          </template>
        </div>
      </template>
    </div>
  </div>
</template>
<script>
export default {
  props: ["pd"],
  data() {
    return {};
  },
  created() {
    // console.log(this.formatData);
  },
  methods: {
    preDealData(list) {
      list.forEach(x => {
        if (!x.expand) this.$set(x, "expand", false);
        if (x.children && x.children.length > 0) this.preDealData(x.children);
      });
      return list;
    }
  },
  computed: {
    formatData: function() {
      return this.preDealData(this.pd);
    }
  }
};
</script>
<style lang="scss" scoped>
.reTree_icon {
  width: 17px;
  height: 17px;
  margin-right: 10px;
}

.basic_layer {
  width: 100%;
  position: relative;
  color: #606764;
  cursor: pointer;
  font-size: 14px;
  margin-bottom: 13px;
  .layer_text {
    height: 17px;
    flex: 1;
    display: inline-block;
  }
}
.first_vertical_line {
  content: "";
  position: absolute;
  // height: calc(100% - 38px);
  width: 1px;
  left: 6px;
  top: 17px;
  background: #c3c5c8;
}

.basic_banner {
  position: relative;
  width: 100%;
  margin-bottom: 13px;
}
.second_layer {
  position: relative;
  width: 100%;
  cursor: pointer;
  padding-left: 25px;
}
.third_layer {
  position: relative;
  padding-bottom: 15px;
  width: 100%;
  padding-left: 40px;
  color: #999999;
}

.second_layer::before {
  content: "";
  position: absolute;
  height: 1px;
  width: 16px;
  left: 9px;
  top: 9px;
  background: #c3c5c8;
}
.third_layer::before {
  content: "";
  position: absolute;
  height: 1px;
  width: 20px;
  left: 9px;
  top: 9px;
  background: #c3c5c8;
}

.linkLine_default::after {
  content: "";
  position: absolute;
  height: 100%;
  width: 1px;
  left: 9px;
  top: 0px;
  background: #c3c5c8;
}
.linkLine_first::after {
  content: "";
  position: absolute;
  /* 为了触顶 */
  top: -13px;
  height: calc(100% + 13px);
  width: 1px;
  left: 9px;
  background: #c3c5c8;
}
.linkLine_last::after {
  content: "";
  position: absolute;
  height: 9px;
  width: 1px;
  left: 9px;
  top: 0px;
  background: #c3c5c8;
}

.reTree_collapse_icon {
  background: url("../../assets/images/jia.svg") no-repeat center center;
  color: blue;
  background-size: contain;
  display: inline-block;
}

.reTree_default_icon {
  background: url("../../assets/images/jia.svg") no-repeat center center;
   display: inline-block;
}

.reTree_expand_icon {
 background: url("../../assets/images/jian.svg") no-repeat center center;
  display: inline-block;
  background-size: contain;
}

.reTree_focus_icon {
  background: url("../../assets/images/jian.svg") no-repeat center center;
   display: inline-block;
  background-size: contain;
}
.c_c {
  color: #7fb9a2;
}
</style>
