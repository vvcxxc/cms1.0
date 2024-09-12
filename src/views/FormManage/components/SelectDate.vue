<!--
- 日期选择
-->
<template>
    <div class="select-date component-content" :class="last ? 'last-compoennt-content' : ''">
      <div class="component-title">
        {{formData.componentAttribute.title}}
        <span class="font-2" v-if="formData.componentAttribute && !formData.componentAttribute.required">({{lang.EquipmentAccount_Optional}})</span>
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
          <div class="input-group">
            <img :src="dateIcon" class="date-icon" alt=""/>
            <el-date-picker
                type="datetime"
                v-model="formData.value.Value"
                @change="handleChange"
                :clearable="false"
            >
            </el-date-picker>
          </div>
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
      dateIcon: require('../../../assets/images/date.png'),
      warning: require('../../../assets/images/warning.png'),
      lang: JSON.parse(localStorage.getItem('languages'))[localStorage.getItem('currentLang')]
    }
  },
  methods: {
    GMTToStr(time) {
      let date = new Date(time);
      let m = date.getMonth() + 1,
          mm = '-' + (m < 10 ? '0' + m : m);
      let d = date.getDate(),
          dd = '-' + (d < 10 ? '0' + d : d);
      let h = date.getHours(),
          hh = h < 10 ? '0' + h : h;
      let i = date.getMinutes(),
          ii = i < 10 ? '0' + i : i;
      let s = date.getSeconds(),
          ss = s < 10 ? '0' + s : s;
      return (
        date.getFullYear() + mm + dd + ' ' + hh + ':' + ii + ':' + ss
      );
    },
    handleChange(){
      this.formData.value.Value = this.GMTToStr(this.formData.value.Value)
    },
  },
  mounted(){
    console.log(this.formData)
  }
}
</script>
<style lang='scss'>
.select-date{
  .input-group{
    .el-date-editor.el-input{
      width: 230px;
      .el-input__inner{
        padding: 0 30px 0 12px;
        background-color: transparent;
        border: 0;
        color: #7C7F8E;
        font-family: DIN;
        font-size: 14px;
        font-weight: 500;
      }
    }
    .el-input__prefix{
      display: none;
    }
  }
}
</style>
<style lang='scss' scoped>
  .component-content{
    position: relative;
    padding: 8px 26px;
    display: flex;
    align-items: center;
    overflow: hidden;

    .component-title{
      flex: 1;
      font-size: 14px;
      font-weight: 400;
      color: #7C7F8E;

      .font-2 {
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
      position: relative;
      font-size: 14px;
      font-weight: 500;
      color: #7C7F8E;

      .input-group{
        background: #F8F8F8;
      }
      .date-icon{
        position: absolute;
        top: 10px;
        right: 10px;
        z-index: 0;
        width: 18px;
        height: 18px;
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