<template>
  <div class="create-location">
    <el-form :model="form" label-width="140px">
      <el-form-item 
        v-for="(item, i) in items" :key="i"
        :label="item.Name" :prop="item.ID"
      >
        <el-radio-group v-if="item.Items" v-model="form[item.ID]">
          <el-radio 
            v-for="(item, i) in item.Items" :key="i"
            :label="item"
          ></el-radio>
        </el-radio-group>
        <el-input v-else v-model="form[item.ID]"></el-input>
      </el-form-item>
      <el-form-item class="flex">
        <el-button @click="submit('cancel')">取消</el-button>
        <el-button type="primary" @click="submit('confirm')">确认</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  props: {
    stationId: {
      type: Number,
      required: false,
      default: ()=> {
        return null
      }
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
      form: {},
      items: [],
    }
  },
  methods: {
    // 获取数据
    getFirstArticleResult() {
      this.$api.locationManagement.getFirstArticleResult({
      StationId: this.stationId,
      TableId: this.editData.TableId
    }).then(ref => {
        const data = ref.data.data
        // console.log("获取数据", JSON.parse(JSON.stringify(data)));
        this.items = data.Items
        let obj = {}
        for (let i = 0, iLen = this.items.length; i < iLen; i++) {
          const item = this.items[i]
          obj[item.ID] = item.Value
        }
        this.form = JSON.parse(JSON.stringify(obj))
        // console.log("form", JSON.parse(JSON.stringify(this.form)));
      }, err => {
        console.log('失败回调', err);
      })
    },
    async submit(model) {
      if (model === 'cancel') {
        this.$emit('callback', 'cancel')
        return
      }
      let Items = []
      for (let i = 0, iLen = this.items.length; i < iLen; i++) {
        const item = this.items[i]
        const value = this.form[item.ID] || ''
        Items.push({
            ID: item.ID,
            Value: value
        })
      }
      this.$api.locationManagement.SaveFirstArticleResult({
        Items,
        StationId: this.stationId,
        TableId: this.editData.TableId
      }).then(ref => {
        // console.log('保存', ref);
        if (ref.data.code === 1) {
          this.$message({
            message: ref.data.msg,
            type: 'warning'
          });
          return
        }
        this.$message({
          message: ref.data.msg,
          type: 'success'
        });
        this.$emit("callback", 'success');
      }, err => {
        console.log('失败回调', err);
      })
    },
    init() {
      if (!this.stationId || !this.editData) return
      // console.log(this.stationId, JSON.parse(JSON.stringify(this.editData)));
      this.getFirstArticleResult()
    }
  },
  watch: {
    "editData": {
      immediate: true,
      handler: function(){
        this.init()
      }
    }
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