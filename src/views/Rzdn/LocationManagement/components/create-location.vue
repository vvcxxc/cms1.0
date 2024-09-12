<template>
  <div class="create-location">
    <el-form :model="formData" ref="myForm" label-width="100px" >
      <el-form-item label="工位名称：" prop="WorkStationName">
        <el-input v-model="formData.WorkStationName"></el-input>
      </el-form-item>
      <el-form-item label="完工信号：" prop="OKSignal" class="">
        <div class="flex">
          <el-input v-model="formData.OKSignal" :disabled="true" style="width: calc(100% - 70px);"></el-input>
          <el-button class="select-variable-btn" type="primary" @click="()=>{selectVariableConfig.state = 'show'}">选择</el-button>
        </div>
      </el-form-item>
      
      <el-form-item label="工位类型：" prop="Type">
        <el-select :disabled="!this.formData.WorkStationId ? false : true" v-model="formData.Type" style="width: 100%;">
          <el-option label="生产工位" :value="1"></el-option>
          <el-option label="成品工位" :value="2"></el-option>
          <el-option label="检测工位" :value="3"></el-option>
        </el-select>
      </el-form-item>
      <!-- 新增需求内容 -->
      <el-form-item label="设备状态：" prop="StatusSignal" class="">
        <div class="flex">
          <el-input v-model="formData.StatusSignal" :disabled="true" style="width: calc(100% - 70px);"></el-input>
          <el-button class="select-variable-btn" type="primary" @click="openDevice">设置</el-button>
        </div>
      </el-form-item>

      <el-form-item label="过程提示：" prop="SwitchingSignal" class="">
        <div class="flex">
          <el-input v-model="formData.SwitchingSignal" :disabled="true" style="width: calc(100% - 70px);"></el-input>
          <el-button class="select-variable-btn" type="primary" @click="openProcess">设置</el-button>
        </div>
      </el-form-item>

      <el-form-item label="用户管理：" prop="SCMSUserName" class="">
        <div class="flex">
          <el-input v-model="formData.SCMSUserName" :disabled="true" style="width: calc(100% - 70px);"></el-input>
          <el-button class="select-variable-btn" type="primary" @click="openUser">设置</el-button>
        </div>
      </el-form-item>

      <!-- <el-form-item label="用户管理：" class="">
        <div class="flex">
          <el-input v-model="scmsName" :disabled="true" style="width: calc(100% - 70px);"></el-input>
          <el-button class="select-variable-btn" type="primary" @click="openUser">设置</el-button>
        </div>
      </el-form-item> -->

    </el-form>
    <div class="myForm-foot flex">
      <el-button @click="cancelForm()">取消</el-button>
      <el-button type="primary" @click="submitForm()">确认</el-button>
    </div>

    <!-- 选择变量 -->
    <select-variable2
      :state="selectVariableConfig.state"
      :list="selectVariableConfig.list"
      @callback="selectVariableCallback"
    ></select-variable2>
    <!-- 新增需求弹窗 -->
    <!-- 设备状态 -->
    <new-device-dialog
      title="设备状态"
      ref="device"
      :statusSignal="formData.StatusSignal"
      :visible="deviceShow"
      @close="deviceClose"
      @confirm="deviceConfirm"
    />
    <!-- 过程提示 -->
    <new-process-dialog
      title="过程提示"
      ref="process"
      :switchingSignal="formData.SwitchingSignal"
      :visible="processShow"
      @close="processClose"
      @confirm="processConfirm"
    />
    <!-- 用户管理 -->
    <new-user-dialog
      title="用户管理"
      :visible="userShow"
      :userIds="formData.SCMSUserIDArray"
      @close="userClose"
      @confirm="userConfirm"
    />
  </div>
</template>
<script>
import SelectVariable2 from '@/newComponents/select-variable2.vue';
import NewDeviceDialog from './new-device-dialog.vue';
import NewProcessDialog from './new-process-dialog.vue';
import NewUserDialog from './new-user-dialog.vue'
import { SaveServiceStatus, SaveProcessTootip, GetServiceStatus, GetProcessTootip } from '@/api/rzdn/new-location-management.js'

export default {
  components: { SelectVariable2, NewDeviceDialog, NewProcessDialog, NewUserDialog },
  props: {
    editData: {
      type: Object,
      required: false,
      default: ()=> {
        return {
          WorkStationId: '',
          WorkStationName: '',
          OKSignal: '',
          Type: '',
          StatusSignal: '',
          SwitchingSignal: '',
          SCMSUserID: '',
          SCMSUserIDArray: [],
          SCMSUserName: '',
        }
      }
    },
  },
  data() {
    return {
      formData: {
        WorkStationName: '',
        OKSignal: '',
        Type: '',
        StatusSignal: '',
        SwitchingSignal: '',
        SCMSUserID: '',
        SCMSUserIDArray: [],
        SCMSUserName: '',
      },
      rules: {
        WorkStationName: [{ required: true, message: '请输入工位名称', trigger: 'blur' }],
        OKSignal: [{ required: true, message: '请选择完工信号', trigger: 'blur' }],
        Type: [{ required: true, message: '请选择工位类型', trigger: 'change' }],
      },
      selectVariableConfig: {
        state: 'hide',
        list: [],
      },
      /* 新增需求部分 */
      deviceShow: false,
      processShow: false,
      userShow: false,
      deviceTimes: 0,
      processTimes: 0,
    }
  },
  // computed: {
  //   scmsName: function() {
  //     let str = ``
  //     this.formData.SCMSUserID.forEach((item, index) => {
  //       if (index === 0) {
  //         str += `${item.SCMSUserName} `
  //       } else {
  //         str += `| ${item.SCMSUserName} `
  //       }
  //     })
  //     return str
  //   },
  // },
  methods: {
    // 选择变量-回调
    selectVariableCallback(state, list) {
      if (state === 'confirm' && list.length) {
        this.formData.OKSignal = list[0].Name
        this.selectVariableConfig.list = [{Name: list[0].Name}]
      }
      this.selectVariableConfig.state = 'hide'
    },

    // 重置数据
    resetData() {
      this.formData = {
        WorkStationName: '',
        OKSignal: '',
        Type: '',
        StatusSignal: '',
        SwitchingSignal: '',
        SCMSUserID: '',
        SCMSUserIDArray: [],
        SCMSUserName: '',
      }
      this.$refs.myForm.resetFields();
    },

    // 取消表单
    cancelForm() {
      /* 清除设备状态信息 */
      this.$refs.device.multipleSelection = []
      this.$refs.device.tableData = []
      this.$refs.device.selectVariableConfig.list = []
      /* 清除过程提示信息 */
      this.$refs.process.multipleSelection = []
      this.$refs.process.tableData = []
      this.$refs.process.selectVariableConfig.list = []

      this.resetData()
      this.$emit("callback", 'cancel');
    },

    async addLocation() {
      let $this = this
      console.log('aaaaaaaaaa', this.formData)
      this.$api.locationManagement.addLocation(this.formData).then(async (ref) => {
        if (ref.data.code === 0) {
          $this.confirm_Pop2(this, '保存成功')
          // 成功之后调用 设备状态、过程提示保存接口
          /* 设备状态、过程提示接口调用 */
          let devicePostData = $this.$refs.device.tableData.map(item => ({
            ...item,
            WorkStation_ID: ref.data.data.WorkStationId
          }))

          await SaveServiceStatus(ref.data.data.WorkStationId, $this.formData.StatusSignal, devicePostData).then(res => {
            if (res.data.code === 0) {
              console.log('设备')
            } else {
              $this.confirm_Pop2($this, res.data.msg)
            }
          })

          let processPostData = $this.$refs.process.tableData.map(item => ({
            ...item,
            WorkStation_ID: ref.data.data.WorkStationId
          }))

          await SaveProcessTootip(ref.data.data.WorkStationId, $this.formData.SwitchingSignal, processPostData).then(res => {
            if (res.data.code === 0) {
              console.log('过程')
            } else {
              $this.confirm_Pop2($this, res.data.msg)
            }
          })
          $this.$emit('callback', 'success')
        } else {
          $this.confirm_Pop2(this, ref.data.msg)
        }
      }, err => {
        console.log('失败回调', err);
      })
    },
    async modifyLocation() {
      let $this = this
      this.$api.locationManagement.modifyLocation(this.formData).then(async (ref) => {
        if (ref.data.code === 0) {
          this.confirm_Pop2(this, '保存成功')
          // 成功之后调用 设备状态、过程提示保存接口
          let devicePostData = $this.$refs.device.tableData.map(item => ({
            ...item,
            WorkStation_ID: $this.formData.WorkStationId
          }))
          /* 设备状态、过程提示接口调用 */
          await SaveServiceStatus($this.formData.WorkStationId, $this.formData.StatusSignal, devicePostData).then(res => {
            if (res.data.code === 0) {
              console.log('设备')
            } else {
              $this.confirm_Pop2($this, res.data.msg)
            }
          })

          let processPostData = $this.$refs.process.tableData.map(item => ({
            ...item,
            WorkStation_ID: $this.formData.WorkStationId
          }))


          await SaveProcessTootip($this.formData.WorkStationId, $this.formData.SwitchingSignal, processPostData).then(res => {
            if (res.data.code === 0) {
              console.log('过程')
            } else {
              $this.confirm_Pop2($this, res.data.msg)
            }
          })
          this.$emit('callback', 'success')
        } else {
          this.confirm_Pop2(this, ref.data.msg)
        }
      }, err => {
        console.log('失败回调', err);
        this.$message({
          message: err,
          type: 'error'
        });
      })
    },
    // 提交表单
    async submitForm() {
      console.clear();
      console.log(JSON.parse(JSON.stringify(this.formData)));
      let index = 0
      const arr = [
        { key: 'WorkStationName', msg: '请填写工位名称'},
        { key: 'OKSignal', msg: '请选择完工信号'},
        { key: 'Type', msg: '请选择工位类型'},
        { key: 'StatusSignal', msg: '请选择设备状态'},
        { key: 'SwitchingSignal', msg: '请选择过程提示'},
      ]
      let msgText = ''
      let newData = {
        WorkStationName: this.formData.WorkStationName,
        OKSignal: this.formData.OKSignal,
        Type: this.formData.Type,
        StatusSignal: this.formData.StatusSignal,
        SwitchingSignal: this.formData.SwitchingSignal
      }
      for (const key in newData) {
        const value = newData[key];
        if (!value && !msgText) msgText = arr[index].msg
        index++
      }
      if (msgText) {
        this.confirm_Pop2(this, msgText)
        return
      }

      /* 新增需求部分处理 */
      // 设备状态
      for(let deviceIndex = 0, len = this.$refs.device.tableData.length; deviceIndex < len; deviceIndex++) {
        if(this.$refs.device.tableData[deviceIndex].OKNumber === '' || this.$refs.device.tableData[deviceIndex].OKNumber === undefined) {
          this.confirm_Pop2(this, `设备状态： 序号【${deviceIndex + 1}】数值不能为空`)
          return
        }
        if(this.$refs.device.tableData[deviceIndex].TootipText === '' || this.$refs.device.tableData[deviceIndex].TootipText === undefined) {
          this.confirm_Pop2(this, `设备状态：序号【${deviceIndex + 1}】提示文本不能为空`)
          return
        }
      }
      // 过程提示
      for(let processIndex = 0, len = this.$refs.process.tableData.length; processIndex < len; processIndex++) {
        if(this.$refs.process.tableData[processIndex].TootipText === '' || this.$refs.process.tableData[processIndex].TootipText === undefined) {
          this.confirm_Pop2(this, `过程提示：序号【${processIndex + 1}】过程提示内容不能为空`)
          return
        }
      }
      if (this.formData.WorkStationId) {
        this.modifyLocation()
      } else {
        this.addLocation()
      }
    },
    init() {
      if (this.editData) {
        this.formData = JSON.parse(JSON.stringify(this.editData))
      } else {
        this.formData = {
          WorkStationName: '',
          OKSignal: '',
          Type: '',
          StatusSignal: '',
          SwitchingSignal: '',
          SCMSUserID: '',
          SCMSUserIDArray: [],
          SCMSUserName: '',
        }
      }
    },
    /* 新增需求部分 */
    openDevice() {
      let $this = this
      console.log('aaaaaaaaaaaaaaa',this.formData.WorkStationId)
      if (this.formData.WorkStationId) {
        // 修改
        if ($this.deviceTimes === 0) {
          GetServiceStatus({ sid: this.formData.WorkStationId}).then(res => {
            if (res.data.code === 0) {
              $this.deviceTimes++
              $this.$refs.device.tableData = res.data.data.map((item, index) => ({
                ...item,
                myId: index,
              }))
              $this.deviceShow = true
            } else {
              $this.confirm_Pop2($this, res.data.msg)
            }
          })
        } else {
          $this.deviceShow = true
        }
      } else {
        // 新增
        $this.deviceShow = true
      }

    },
    deviceClose() {
      this.deviceShow = false
    },
    deviceConfirm(sign, tabldData) {
      this.formData.StatusSignal = sign
      this.deviceClose()
    },
    openProcess() {
      let $this = this
      console.log('aaaaaaaaaaaaaaa',this.formData.WorkStationId)
        if (this.formData.WorkStationId) {
          // 修改
          if ($this.processTimes === 0) {
            GetProcessTootip({ sid: this.formData.WorkStationId}).then(res => {
              if (res.data.code === 0) {
                $this.processTimes++
                $this.$refs.process.tableData = res.data.data.map((item, index) => ({
                  ...item,
                  myId: index,
                }))
                $this.processShow = true
              } else {
                $this.confirm_Pop2($this, res.data.msg)
              }
            })
        } else {
          $this.processShow = true
        }
      } else {
        // 新增
        $this.processShow = true
      }
    },
    processClose() {
      this.processShow = false
    },
    processConfirm(sign, tabldData) {
      this.formData.SwitchingSignal = sign
      this.processClose()
    },
    openUser() {
      this.userShow = true
    },
    userClose() {
      this.userShow = false
    },
    userConfirm(selectData) {
      this.formData.SCMSUserID = []
      this.formData.SCMSUserIDArray = []
      this.formData.SCMSUserName = ''
      selectData.forEach((item, index) => {
        if (index === 0) {
          this.formData.SCMSUserName += `${item.SCMSUserName} `
        } else {
          this.formData.SCMSUserName += `| ${item.SCMSUserName} `
        }
        this.formData.SCMSUserIDArray.push(item.SCMSUserID)
      })
      this.formData.SCMSUserID = this.formData.SCMSUserIDArray.join('|')
      this.userClose()
    },
  },
  mounted() {
    this.init()
  },
};
</script>

<style lang='scss' scoped>
@import "../index.scss";
.select-variable-btn {
  width: 70px;
  height: 40px;
  padding: 0;
  line-height: 40px;
  border-radius: 0;
}
.myForm-foot {
  justify-content: flex-end;
  .el-button {
    width: 100px;
  }
}
.create-location ::v-deep .el-dialog {
  margin-top: 0 !important
}
.create-location ::v-deep .el-input {
  border-radius: 0 !important
}
.create-location ::v-deep .el-input__inner {
  border-radius: 0 !important
}
</style>