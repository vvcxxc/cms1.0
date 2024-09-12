<!--
- 单行文本 || 实时变量
-->
<template>
    <div class="single-line-text component-content" :class="last ? 'last-compoennt-content' : ''">
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
          <label class="input-group">
            <input type="text" 
              v-model="dataValue" 
              @input="change"
              :placeholder="formData.componentAttribute.SampleContent" 
            />
            <div class="unit">{{formData.componentAttribute.unit}}</div>
          </label>
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
    let defaultData = ""
    if(this.formData.componentAttribute.unit.length > 0){
      defaultData = this.formData.value.Value2.slice(0, this.formData.value.Value2.length - this.formData.componentAttribute.unit.length)
    }else{
      defaultData = this.formData.value.Value2
    }
    if(this.formData.componentAttribute.type === 'number' || this.formData.type === "realTimeVariable"){
      this.$nextTick(()=>{
        this.numberChange(defaultData)
      })
    }
    return {
      dataValue: defaultData,
      color: this.formData.value.Color === '' ? '#000' : this.formData.value.Color,
      thresholdFeedback: [...this.formData.componentAttribute.thresholdFeedback],
      warning: require('../../../assets/images/warning.png'),
      lang: JSON.parse(localStorage.getItem('languages'))[localStorage.getItem('currentLang')]
    }
  },
  watch:{
    dataValue(newValue, oldValue){
      if(this.formData.componentAttribute.type === 'number' || this.formData.type === "realTimeVariable"){
        this.formData.value.Value = newValue.replace(/,/g, "") + this.formData.componentAttribute.unit
        this.formData.value.Value2 = newValue.replace(/,/g, "") + this.formData.componentAttribute.unit
      }else{
        this.formData.value.Value = newValue + this.formData.componentAttribute.unit
        this.formData.value.Value2 = newValue + this.formData.componentAttribute.unit
      }
    }
  },
  methods: {
    /*  
    * 千分位化
    */
    thousandth(num){
      num = num.toString()
      let integer = num; // 整数
      let decimal = ""; // 小数
      let point = ""; // 小数点
      let haveDecimal = num.split(".");
      if (haveDecimal.length > 1) {
          integer = haveDecimal[0];
          decimal = haveDecimal[1];
          point = "."
      }
      integer = integer.replace(/\d{1,3}(?=(\d{3})+$)/g, '$&,');
      return integer + point + decimal
    },
    /**
     * 数值型输入框需要千分位处理  
    */
    numberChange(value){
        value = value.replace(" ", "").split(",").join("");
        let obj = Number(value);
        if (typeof obj === 'number' && !isNaN(obj)) {
            this.dataValue = this.thousandth(value);
        }
    },
    change(e){
      let val = e.target.value;
      if(this.formData.componentAttribute.type === 'number' || this.formData.type === "realTimeVariable"){
        let value = val.replace(/[^\d{1,}\.\d{1,}|\d{1,}]/g, '')
        this.numberChange(value)
      }
      setTimeout(()=>{
        this.checkData(this.formData.value.Value)
      }, 500)
    },
    checkData(val){
      let isErr = false;
      for(let i=0; i<this.thresholdFeedback.length;i++){
        let {condition, value} = this.thresholdFeedback[i]
        if(!isErr){
          if(condition === '数值范围'){
            let numberRange = value.split(",")
            if(val !== "" && !isNaN(Number(val)) && val >= Number(numberRange[0]) && val <= Number(numberRange[1])){
              isErr = true
            }
          }else if(condition === '文本序列'){
            let textRange = value.split(",")
            if(textRange.some(text=> val === text)){
              isErr = true
            }
          }else{
            if(!isNaN(Number(val))){
              if(val !== "" && eval(`${val}${condition}${value}`)){
                isErr = true
              }
            }else if(isNaN(Number(val)) && condition === "=="){ //文本只对==有效
              if(val !== "" && val === value){
                isErr = true
              }
            }
          }
        }
      }
      if(isErr){
        this.$emit('exception', {
          type: "add", 
          id: this.formData.id
        })
      }else{
        this.$emit('exception', {
          type: "del", 
          id: this.formData.id
        })
      }
    }
  },
  mounted(){
    this.checkData(this.formData.value.Value2)
  }
}
</script>
<style lang='scss' scoped>
  .component-content{
    position: relative;
    padding: 8px 26px;
    flex-wrap: wrap;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    overflow: hidden;

    .component-title{
      line-height: 28px;
      font-size: 14px;
      font-weight: 400;
      color: #7C7F8E;
      min-width: 300px;
      padding: 8px 0;
      font-family: 'SourceHanSansCN-Normal';

      .font-2 {
          font-size: 12px;
          font-weight: 500;
          line-height: 20px;
          color: #999;
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
      min-width: 116px;
      flex: 1;

      .input-group{
        flex: 1;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        min-width: 116px;
        color:#333;
        background: #f8f8f8;
        padding: 6px 9px 6px 0;
        box-sizing: border-box;

        input{
          flex: 1;
          min-width: 116px;
          height: auto;
          min-height: 28px;
          background: #F8F8F8;
          border: none;
          padding: 0 6px;
          width: calc(100% - 70px);
          line-height: 1;
          box-sizing: border-box;
          font-size: 14px;
          color: #333;
          font-family: 'SourceHanSansCN-Normal';
        }
      }
      .unit{
        font-size: 14px;
        line-height: 20px;
        font-weight: 400;
        color: #00B2A5;
        max-width: 70px;
        word-break: break-all;
        text-align: left; 
        font-family: 'SourceHanSansCN-Normal';
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