<template>
  <div>
    <el-dialog
      title="添加器件信息"
      width="800px"
      class="create-device flex"
      :visible.sync="dialogVisible"
      :before-close="() => {submit('cancel')}"
      append-to-body
      :close-on-click-modal="false"
    >
      <div class="create-device-content">
        
        <!-- 表单 -->
        <el-form ref="myform" class="from" :model="formData" label-width="90px">
          <!-- 基本信息 -->
          <el-row>
            <el-col :span="24" class="title flex">
              <div class="block"></div>
              <div class="text">基本信息</div>
              <div class="lin"></div>
            </el-col>
            <el-col :span="12">
              <el-form-item label="器件名称">
                <el-input v-model="formData.VulnerablePartName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="器件编号">
                <el-input v-model="formData.VulnerablePartNo"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="使用设备">
                <div class="layout-1">
                  <el-input v-model="formData.UsingDevice" disabled placeholder="点击选择"></el-input>
                  <img @click="()=>{associationDeviceConfig.state = 'show'}" :src="icons.diji" class="icon"/>
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="器件类型">
                <el-input v-model="formData.VulnerablePartModel"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <!-- 寿命信息 -->
          <el-row>
            <el-col :span="24" class="title flex">
              <div class="block"></div>
              <div class="text">寿命信息</div>
              <div class="lin"></div>
            </el-col>
            <el-col :span="12">
              <el-form-item label="启用日期" prop="EnableTime">
                <el-date-picker
                  v-model="formData.EnableTime"
                  type="datetime"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  format="yyyy-MM-dd HH:mm:ss"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="统计类型">
                <el-select v-model="formData.SelectedTimerType">
                  <el-option
                      v-for="item in options.statisticalType"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="寿命周期">
                <div class="layout-2">
                  <el-input v-model="formData.LifeCycleValue"></el-input>
                  <el-select v-model="formData.LifeCycleUnit">
                    <el-option
                      v-for="item in options.unit"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="统计信号">
                <div class="layout-1">
                  <el-input v-model="formData.RunningSignal" disabled placeholder="点击选择"></el-input>
                  <img @click="selectVariableShow" :src="icons.diji" class="icon"/>
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="12" class="coefficient" v-show="formData.SelectedTimerType === 3">
              <i class="el-icon-question" 
                title="所在设备生产一个产品，器件被使用的次数。"
              ></i>
              <el-form-item label="统计系数">
                <el-input-number 
                  v-model="formData.Coefficient"
                  :min="0"
                ></el-input-number>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="提前提醒">
                <div class="layout-2">
                  <el-input v-model="formData.ReminderTimeValue"></el-input>
                  <el-select v-model="formData.ReminderTimeUnit">
                    <el-option
                      v-for="item in options.unit"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="执行人">
                <el-select v-model="formData.Executor">
                  <el-option
                    v-for="item in options.userList"
                    :key="item"
                    :label="item"
                    :value="item">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>

          <!-- 其他信息 -->
          <el-row>
            <el-col :span="24" class="title flex">
              <div class="block"></div>
              <div class="text">其他信息</div>
              <div class="lin"></div>
            </el-col>
            <el-col :span="12">
              <el-form-item label="使用数量">
                <el-input v-model="formData.UseNumber"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="器件价格">
                <el-input v-model="formData.Price"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="供应商">
                <el-input v-model="formData.Manufactor"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="器件备注">
                <el-input 
                  v-model="formData.Remarks"
                  type="textarea"
                  :rows="4"
                  placeholder="对备注的说明备注"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>

        <!-- 底部 -->
        <div class="foot flex" v-if="state !== 'check'">
            <div class="btn cancel" @click="submit('cancel')">取消</div>
            <div class="btn confirm" @click="submit('confirm')">保存</div>
        </div>

        <!-- 遮罩层 -->
        <div class="masklayer" v-if="state === 'check'"></div>
      </div>
    </el-dialog>

    <!-- 选择变量 -->
    <select-variable2
      :state="selectVariableConfig.state"
      :list="selectVariableConfig.list"
      @callback="selectVariableCallback"
    ></select-variable2>

    <!-- 关联设备 -->
    <association-device
      :state="associationDeviceConfig.state"
      :editData="associationDeviceConfig.editData"
      @callback="associationDeviceCallback"
    ></association-device>
  </div>
</template>
<script>
import SelectVariable2 from '@/newComponents/select-variable2.vue';
import AssociationDevice from './association-device.vue';
import { getCurrentTime } from './index';

export default {
  components: { SelectVariable2, AssociationDevice },
  props: {
    state: { // 创建-create 查看-check 编辑-edit 隐藏-hide
      type: String,
      required: false,
      default: ''
    },
    editData: {
      type: Object,
      required: false,
      default: ()=> {
        return null
      }
    },
  },
  data() {
    return {
      icons: {
        diji: require('@/assets/images/icon_diji.png'),
      },
      dialogVisible: false,
      
      formData2: { // 还原数据用
        LoginUserName: "", // 登录用户名
        Operate: 1, // 新增-1 编辑-2
        PID: 1, // 新增不传 编辑要传

        VulnerablePartName: '', // 器件名称
        VulnerablePartNo: '', // 器件编号
        UsingDevice: '', // 使用设备
        AID: '', // 使用设备ID
        VulnerablePartModel: '', // 器件类型

        EnableTime: '', // 启用日期
        SelectedTimerType: '', // 统计类型 标准-1 运行-2 次数-3
        LifeCycleValue: '', // 寿命周期-值
        LifeCycleUnit: 4, // 寿命周期-单位
        RunningSignal: '', // 统计信号
        Coefficient: '', // 统计系数
        ReminderTimeValue: '', // 提前提醒-值
        ReminderTimeUnit: 4, // 提前提醒-单位
        Executor: '', // 执行人

        UseNumber: '', // 使用数量
        Price: '', // 器件价格
        Manufactor: '', // 供应商
        Remarks: '', // 器件备注
      },
      formData: {
        LoginUserName: "", // 登录用户名
        Operate: 1, // 新增-1 编辑-2
        PID: 1, // 新增不传 编辑要传

        VulnerablePartName: '', // 器件名称
        VulnerablePartNo: '', // 器件编号
        UsingDevice: '', // 使用设备
        AID: '', // 使用设备ID
        VulnerablePartModel: '', // 器件类型

        EnableTime: '', // 启用日期
        SelectedTimerType: '', // 统计类型 标准-1 运行-2 次数-3
        LifeCycleValue: '', // 寿命周期-值
        LifeCycleUnit: 4, // 寿命周期-单位
        RunningSignal: '', // 统计信号
        Coefficient: '', // 统计系数
        ReminderTimeValue: '', // 提前提醒-值
        ReminderTimeUnit: 4, // 提前提醒-单位
        Executor: '', // 执行人

        UseNumber: '', // 使用数量
        Price: '', // 器件价格
        Manufactor: '', // 供应商
        Remarks: '', // 器件备注
      },
      selectVariableConfig: {
        state: 'hide',
        list: [],
      },
      associationDeviceConfig: {
        state: 'hide',
        editData: null
      },

      options: {
        userList: [],
        unit: [
          { label: '小时', value: 4 },
          { label: '年', value: 1 },
          { label: '月', value: 2 },
          { label: '日', value: 3 },
        ],
        statisticalType: [
          { label: '标准时间', value: 1 },
          { label: '运行时间', value: 2 },
          { label: '使用次数', value: 3 },
        ]
      }
    }
  },
  methods: {
    // 获取用户列表
    getUserList() {
      return this.$api.agency.gstUserWithNoPage().then(ref => {
        const list = ref.data.data
        this.options.userList = list
        // console.log("用户列表", JSON.parse(JSON.stringify(list)));
      }, err => {
        console.log('失败回调', err);
      })
    },
    getLoginUserName() {
      let name = ''
      if (sessionStorage.getItem('sightseerInfo1')) {
        name = JSON.parse(sessionStorage.getItem('sightseerInfo1')).SCMSUserName;
      }else if (sessionStorage.getItem('userInfo1')) {
        name = JSON.parse(sessionStorage.getItem('userInfo1')).SCMSUserName;
      } else {
        console.log('暂无登录用户信息');
      }
      return name
    },
    // 选择变量-显示
    selectVariableShow() {
      // 统计类型为标准时间，统计信号不可选择
      if (this.formData.SelectedTimerType === 1) return

      this.selectVariableConfig.state = 'show'
    },
    // 关联设备-回调
    associationDeviceCallback(state, data) {
      // console.log("关联设备-回调", state, data);
      if (state === 'confirm' && data) {
        this.formData.UsingDevice = data.DeviceName
        this.formData.AID = data.AID
        this.associationDeviceConfig.editData = data
      }
      this.associationDeviceConfig.state = 'hide'
    },
    // 选择变量-回调
    selectVariableCallback(state, list) {
      // console.log('选择变量-回调', JSON.parse(JSON.stringify(list)));
      if (state === 'confirm' && list.length) {
        this.selectVariableConfig.list = [{Name: list[0].Name}]
        this.formData.RunningSignal = list[0].Name
      }
      this.selectVariableConfig.state = 'hide'
    },
    submit(type) {
      // console.log('表单数据', JSON.parse(JSON.stringify(this.formData)));
      if (!type || type === 'cancel') {
        this.$emit("callback", 'cancel');
        return
      }

      const emptyValidator = [
        { field: 'VulnerablePartName', msg: '器件名称不能为空' },
        { field: 'VulnerablePartNo', msg: '器件编号不能为空' },
        { field: 'UsingDevice', msg: '请选择使用设备' },
        { field: 'VulnerablePartModel', msg: '器件类型不能为空' },
        { field: 'EnableTime', msg: '请选择启用日期' },
        { field: 'SelectedTimerType', msg: '请选择统计类型' },
        { field: 'LifeCycleValue', msg: '寿命周期不能为空' },
        { field: 'LifeCycleUnit', msg: '请选择寿命周期单位' },
        { field: 'RunningSignal', msg: '请选择统计信号' },
        { field: 'ReminderTimeValue', msg: '提前提醒不能为空' },
        { field: 'ReminderTimeUnit', msg: '请选择提前提醒单位' },
        { field: 'Executor', msg: '请选择执行人' },
        // { field: 'UseNumber', msg: '使用数量不能为空' },
        // { field: 'Price', msg: '器件价格不能为空' },
        // { field: 'Manufactor', msg: '供应商不能为空' },
      ]
      for (let i = 0, iLen = emptyValidator.length; i < iLen; i++) {
        const item = emptyValidator[i];
        const val = this.formData[item.field]

        // 统计类型为标准时间，统计信号不可选择
        if (item.field === 'RunningSignal') {
          if (this.formData.SelectedTimerType === 1 && val) {
            this.confirm_Pop2(this, '统计类型为标准时间，统计信号不可选择')
            continue
          } else if (this.formData.SelectedTimerType === 1 && !val) {
            continue
          }
        }


        if (!val) {
          this.confirm_Pop2(this, item.msg)
          return
        }
      }

      // console.log('formData', JSON.parse(JSON.stringify(this.formData)));
      // if (window) return
      this.$api.agency.saveAcount(this.formData).then(ref => {
        // console.log('保存/编辑结果', ref);
        if (ref.data.code === 0) {
          this.$emit("callback", 'confirm');
          return
        }
        this.confirm_Pop2(this, ref.data.msg)
      }, err => {
        console.log('失败回调', err);
      })
    },
    setFormData () {
      if (!this.editData) {
        console.log('editData数据缺失');
        return
      }
      // console.log('组件.editData', JSON.parse(JSON.stringify(this.editData)));
      let newData = JSON.parse(JSON.stringify(this.editData))

      // 由于后台不保存 SelectedTimerType-统计类型 字段导致前端只能根据LifeCycleUnit判断
      if (newData.LifeCycleUnit === 5) {
        newData.SelectedTimerType = 3
      } else {
        newData.SelectedTimerType = ''
      }

      if (this.state === 'edit') newData.Operate = 2
      newData.PID = newData.ID
      newData.LoginUserName = this.getLoginUserName()

      this.formData = newData
    },
    initFormData() {
      let newData = JSON.parse(JSON.stringify(this.formData2))
      const time = getCurrentTime();

      newData.LoginUserName = this.getLoginUserName();
      newData.EnableTime = `${time.y}-${time.m}-${time.d} ${time.h}:${time.u}:${time.s}`

      if (this.options.userList && this.options.userList.length) {
        newData.Executor = this.options.userList[0]
      }

      this.formData = newData
    },
    async init() {
      await this.getUserList()
      if (this.state === 'check' || this.state === 'edit') {
        this.setFormData();
      } else {
        this.initFormData();
      }
      this.dialogVisible = true
    }
  },
  watch: {
    "state": {
      handler: function(state) {
        const fun = {
          create: ()=> {
            this.init()
          },
          check: ()=> {
            this.init()
          },
          edit: ()=> {
            this.init()
          },
          hide: ()=> {
            this.dialogVisible = false
          },
        }
        if (state && fun[state]) fun[state]()
      }
    },
    "formData.SelectedTimerType": {
      handler: function(value) {
        console.log('统计类型.改变', value);

        // 统计类型为标准时间，统计信号不可选择
        if (value === 1) this.formData.RunningSignal = ''

        if (value === 3) {
          this.options.unit = [{ label: '次', value: 5 }]
          this.formData.LifeCycleUnit = 5
          this.formData.ReminderTimeUnit = 5
          this.formData.Coefficient = 1
        } else {
          this.formData.LifeCycleUnit = 4
          this.formData.ReminderTimeUnit = 4
          this.formData.Coefficient = ''
          this.options.unit = [
            { label: '小时', value: 4 },
            { label: '年', value: 1 },
            { label: '月', value: 2 },
            { label: '日', value: 3 },
          ]
        }
      }
    },
  },
};
</script>
<style lang='scss' scoped>
.flex {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.layout-1 {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  ::v-deep .el-input__inner {
    display: block;
  }
  .icon {
    width: 36px;
    height: 36px;
    cursor: pointer;
  }
}
.layout-2 {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  .el-input {
    width: calc(100% - 80px) !important;
  }
  .el-select {
    width: 80px !important;
  }
}

.create-device {
  ::v-deep .el-dialog {
    margin: 0 !important;
    margin-top: 0 !important;
    .el-dialog__header {
      height: 50px;
      padding: 0;
      line-height: 50px;
      text-align: center;
      background: #386DF0;
      .el-dialog__title {
        color: #FFFFFF;
      }
      .el-dialog__close {
        margin: -8px -11px 0 0;
        font-size: 30px;
        color: white;
      }
    }
    .el-dialog__body {
      padding: 10px 40px 30px 40px;
      background: #EEEEEE;
    }
    .el-form-item__label {
      padding: 0 30px 0 0;
    }
    .el-input__inner {
      height: 36px;
      border-radius: 0;
    }
    .el-date-editor.el-input, .el-date-editor.el-input__inner {
      width: 100%;
    }
    .el-select {
      width: 100%;
    }
  }

  .create-device-content {
    position: relative;
    // 表单
    .from {
      ::v-deep .el-col {
        padding: 0 10px;
        position: relative;
      }
      ::v-deep .el-form-item {
        margin-bottom: 10px;
      }
      // 标题
      .title {
        margin: 0 0 10px 0;
        padding: 0;
        .block {
          width: 6px;
          height: 20px;
          margin: 0 10px 0 0;
          background: #386DF0;
        }
        .text {
          min-width: 80px;
          color: #386DF0;
          font-size: 17px;
          font-weight: bold;
        }
        .lin {
          width: 100%;
          border-top: 3px solid #DDDDDD;
        }
      }

      // 统计系数
      .coefficient {
        .el-icon-question {
          position: absolute;
          left: -5px;
          top: 13px;
        }
        .el-input-number {
          width: 100%;
        }
        ::v-deep .el-input-number__decrease,
        ::v-deep .el-input-number__increase {
          height: 34px;
          top: 2px;
        }
      }
    }

    // 底部
    .foot {
      justify-content: flex-end;
      .btn {
        width: 100px;
        height: 40px;
        margin: 0 0 0 20px;
        line-height: 40px;
        text-align: center;
        color: white;
        border-radius: 4px;
        cursor: pointer;
      }
      .cancel {
        background: #999999;
      }
      .confirm {
        background: #386DF0;
      }
    }

    .masklayer {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 1;
    }
  }
}
</style>