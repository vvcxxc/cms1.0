<!--
- 折叠面板
-->
<template>
    <div class="fold-list fold-component-content">
      <el-collapse v-model="activeName" accordion>
        <el-collapse-item :title="formData.componentAttribute.title" :name="formData.id">
          <slot></slot>
        </el-collapse-item>
      </el-collapse>
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
    }
  },
  data() {
    return {
      activeName: this.formData.id
    }
  },
  watch:{
    dataValue(newValue){
      this.formData.value = newValue + this.formData.componentAttribute.unit
    }
  },
  methods: {
  },
  mounted(){
    console.log(this.formData)
  }
}
</script>

<style lang='scss'>
  .fold-component-content{
    width: 100%;
    height: auto;
    background: #ffffff;
    padding: 8px 16px;
    box-sizing: border-box;
    margin: 10px 0;
    border-radius: 6px;

    .el-collapse-item__content{
      .component-content{
        padding: 8px 16px;

        &::after{
          left: 0;
          right: 0;
        }
      }
    }

    &:first-child{
      margin-top: 0;
    }

    &:last-child{
      margin-bottom: 0;
    }

    .el-collapse-item__header{
      height: auto;
      line-height: 1;
      font-size: 16px;
      font-family: PingFang SC;
      font-weight: 600;
      color: #7C7F8E;
      border: 0;

      .el-collapse-item__arrow{
        color: #00B2A5;
        font-size: 16px;
      }
    }
   
   .el-collapse{
     border: 0;
   }
   .el-collapse-item__wrap{
     border: 0;
   }
   .el-collapse-item__content{
     padding: 0;
   }
  }

</style>