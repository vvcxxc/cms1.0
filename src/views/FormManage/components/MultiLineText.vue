<!--
- 多行文本
-->
<template>
    <div class="multi-line-text component-content" :class="last ? 'last-compoennt-content' : ''">
      <div class="component-title">
        {{formData.componentAttribute.title}}
        <span class="font-2" v-if="formData.componentAttribute && !formData.componentAttribute.required">(选填)</span>
        <el-tooltip 
          class="item" 
          effect="dark" 
          placement="bottom-start"
          v-if="formData.componentAttribute.tipText !== ''"
        >
          <div slot="content">
            <div class="tooltip-content">{{formData.componentAttribute.tipText}}</div>
          </div>
          <img :src="warning" class="icon-warning" alt=""/>
        </el-tooltip>
      </div>
      <div class="component-value">
          <textarea v-model="formData.value.Value">
          </textarea>
      </div>
    </div>
</template>
<script>
export default {
  props:{
    formData: {
      type: Object,
      required: false,
      default: ()=>{
        return {}
      }
    },
    last:{
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      warning: require('../../../assets/images/warning.png')
    }
  },
  methods: {
  },
  mounted(){
    console.log(this.formData)
  }
}
</script>
<style lang='scss' scoped>
  .component-content{
    position: relative;
    padding: 10px 16px;
    overflow: hidden;

    .component-title{
      align-items: center;
      font-family: Source Han Sans CN;
      font-size: 14px;
      font-weight: 400;
      color: #7C7F8E;
      line-height: 28px;

      .font-2 {
          font-family: PingFang SC;
          font-size: 12px;
          font-weight: 500;
          color: #7C7F8E;
      }

      .icon-warning{
        margin-left: 2px;
        width: 14px;
        height: 14px;
        vertical-align: middle;
      }
    }

    .component-value{
      margin-top: 10px;
      position: relative;
      font-size: 14px;
      font-family: DIN;
      font-weight: 500;
      color: #7C7F8E;

      textarea{
        padding: 10px 12px;
        width: 100%;
        height: 120px;
        color: #7C7F8E;
        background: #F6F6F6;
        border-radius: 4px;
        border: 0;
        resize: none;
      }
    }

    &::after{
      position: absolute;
      content: "";
      left: 16px;
      right: 16px;
      bottom: 1px;
      height: 1px;
      background: #EBEBEB;
    }
  }
  .tooltip-content{
    max-width: 300px;
  }
</style>