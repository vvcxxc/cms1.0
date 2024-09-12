<template>
  <el-form
    ref="form"
    :model="formData"
    :rules="rules"
    :label-position="labelPosition"
    :label-width="labelWidth"
    label-suffix=":"
    class="common_form"
  >
    <el-col :span="item.span ? item.span : 24" v-for="(item, index) in formItem" :key="index">
      <template v-if="item.type === 'input'" >
        <el-form-item :label="item.label" :prop="item.prop" >
          <el-input :disabled="item.disabled" @blur="handleBlur($event, item)" :show-password="item.showPassword" v-model="formData[item.prop]" >
            <template :slot="item.slotName">
              <!-- <div @click="suffixClick(item)" class="append">选择</div> -->
              <slot :name="item.prop" :scope="item" :data="formData" ></slot>
            </template>
          </el-input>
        </el-form-item>
      </template>

      <template v-if="item.type === 'select'" >
        <el-form-item :label="item.label" :prop="item.prop" >
          <el-select v-model="formData[item.prop]" @change="handleChange($event, item)" class="common_select" placeholder="请选择">
            <el-option
              v-for="item in item.options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </template>

      <template v-if="item.type === 'date'" >
        <el-form-item :label="item.label" :prop="item.prop" >
          <el-date-picker
            class="form-date"
            v-model="formData[item.prop]"
            value-format="yyyy-MM-dd HH:mm:ss"
            type="date"
            placeholder="请选择日期">
          </el-date-picker>
        </el-form-item>
      </template>

      <template v-if="item.type === 'date-time'" >
        <el-form-item :label="item.label" :prop="item.prop" >
          <el-date-picker
            class="form-date"
            v-model="formData[item.prop]"
            value-format="yyyy-MM-dd HH:mm:ss"
            :default-time="item.defaultTime"
            type="datetime"
            placeholder="请选择日期">
          </el-date-picker>
        </el-form-item>
      </template>

    </el-col>
  </el-form>
</template>
<script>
export default {
  props: {
    labelPosition: {
      type: String,
      default: 'right'
    },
    labelWidth: {
      type: String,
      default: '100px'
    },
    formData: {
      type: Object,
      default: () => {}
    },
    formItem: {
      type: Array,
      default: () => []
    },
    rules: {
      type: Object,
      default: () => {}
    },
  },
  data() {
    return {
    }
  },
  methods: {
    handleBlur(value, item) {
      this.$emit('inputBlur', value, item)
    },
    handleChange(value, item) {
      this.$refs.form.validateField([item.prop])
      this.$emit('selectChange', value, item)
    },
  },
}
</script>
<style lang="scss" scoped >
::v-deep .el-input {
  .el-input-group__append, .el-input-group__prepend {
    cursor: pointer;
    padding: 0;
  }
}

::v-deep .common_select.el-select {
  width: 100%;
}

.common_form {
  width: 100%;
  height: 100%;
}

.form-date {
  width: 100%;
}

</style>