<!-- 添加原料 -->
<template>
  <el-dialog title="添加原料" width="900px" class="add-raw-material" center :visible.sync="dialogShow"
    :close-on-click-modal="false" :close-on-press-escape="false" @close="onSubmit('cancel')">
    <template #title>
      <div class="dialog-title">
        添加原料
        <img :src="eye ? require('../../../assets/images/eye.svg') :
          require('../../../assets/images/eye-close.svg')" @click="eveFn" />

      </div>
    </template>

    <div class="add-raw-material-content">

      <div class="group" v-for="(item, i) in list" :key="i">
        <div class="head flex">
          <div class="title">{{ item.ProductionGroup }}</div>
          <!-- 工序 -->
          <div class="work-sequence flex">
            <div class="title">工序：</div>
            <div class="text">{{ item.ProductionProcedure }}</div>
          </div>
        </div>
        <el-table class="my-table" :data="item.List" border :height="280">
          <el-table-column align="center" label="序号" type="index" width="50"></el-table-column>
          <el-table-column align="center" label="原料编号" prop="MaterialNo" ></el-table-column>
          <el-table-column align="center" label="原料名称" prop="MaterialName" width="180" v-if="eye"></el-table-column>
          <el-table-column align="center" label="占比" prop="RatioDescription" width="80"></el-table-column>
          <el-table-column align="center" label="投料量(kg)" prop="FormulaQtyDescription" width="100"></el-table-column>
          <el-table-column align="center" label="剩余量(kg)" prop="RemainQtyDescription" width="100"></el-table-column>
          <el-table-column align="center" label="用量(kg)" prop="BomName" width="150" >
            <template slot-scope="scope">
              <el-input-number :disabled="scope.row.RemainQty === 0" v-model="scope.row.Qty" :min="0"
                :controls="false" style="width: 120px;"></el-input-number>
            </template>
          </el-table-column>
        </el-table>
      </div>

    </div>
    <span slot="footer" class="dialog-footer">
      <el-button size="mini" type="primary" @click="onSubmit('confirm')">确认</el-button>
      <el-button size="mini" @click="onSubmit('cancel')">取消</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { addMaterials } from '@/api/craft-manage'

export default {
  props: {
    dialogVisible: {
      type: Boolean,
      required: true,
      default: false
    },
    boilerGroup: {
      type: Number,
      required: true,
      default: 0 // 0-水锅 1-油锅 2-乳化锅
    },
    list: {
      type: Array,
      required: false,
      default: () => {
        return [{
          "ProductionGroup": "",
          "ProductionProcedure": null,
          "List": [{
            "Id": 1,
            "VoucherId": 1,
            "ProductionGroup": "",
            "ProductionProcedure": null,
            "MaterialNo": "aaa001",
            "MaterialName": "保湿剂",
            "Ratio": "50%",
            "FormulaQty": 100,
            "FormulaQtyDescription": "100.00kg",
            "RemainQty": 100,
            "RemainQtyDescription": "100.00kg",
            "UpperLimit": null,
            "LowerLimit": null
          }]
        }]
      }
    },
  },
  data() {
    return {
      dialogShow: false,
      tableData: [],
      eye: false,
      cxid: "",
      cxshow: true,
      jurisdiction: [],
      buttonarr: []
    };
  },
  watch: {
    "dialogVisible": {
      handler: function (val) {
        this.dialogShow = val
        if (val) this.init();
      }
    }
  },
  methods: {
    findPathByLeafId(id, node, path) {
      if (!path) {
        path = []
      }
      for (let i = 0; i < node.length; i++) {
        var temPath = path.concat();

        if (id == node[i].RightID) {
          temPath.push(node[i])
          return temPath
        }
        if (node[i].Children) {
          var findResult = this.findPathByLeafId(id, node[i].Children, temPath)
          if (findResult) {
            return findResult
          }
        }
      }
    },
    GetUrlParam(paraName) {
      let url = document.location.toString();
      let arrObj = url.split("?");
      if (arrObj.length > 1) {
        let arrPara = arrObj[1].split("&");
        let arr;
        for (let i = 0; i < arrPara.length; i++) {
          arr = arrPara[i].split("=");
          if (arr && arr[0] == paraName) {

            return arr[1]
          }
        }
        return ''
      } else {
        return ''
      }
    },
    eveFn() {
      if (!this.cxshow) {
        this.confirm_Pop2(this, '该账户没有权限！', { tips: '提示', yes: '确定' })
        return
      }
      this.eye = !this.eye;
    },
    onSubmit(state) { // state: confirm-确定 cancel-取消
      if (state === 'cancel') {
        this.$emit('callback', state)
        return
      }

      let Materials = []
      for (const item of this.list) {
        const list = []
        for (const element of item.List) {
          if (!element.Qty) continue
          list.push({
            MaterialNo: element.MaterialNo,
            Qty: element.Qty
          })
        }
        Materials = [
          ...Materials,
          ...list
        ]
      }

      // console.log('Materials', JSON.parse(JSON.stringify(Materials)));
      if (!Materials.length) {
        this.confirm_Pop2(this, '请填写添加原料用量', { tips: '提示', yes: '确定' })
        return
      }
      addMaterials({
        VoucherId: this.list[0].List[0].VoucherId,
        BoilerGroup: this.boilerGroup,
        Materials
      }).then(res => {
        console.log('添加原料-结果', JSON.parse(JSON.stringify(res.data.data)));
        if (res.data.code !== 0) {
          this.confirm_Pop2(this, res.data.msg, { tips: '提示', yes: '确定' })
          console.log('错误');
          return
        }
        this.$emit('callback', state)
      }, err => {
        console.log('失败回调', err);
      })
    },
    async init() {
      console.log('添加原料-初始化', JSON.parse(JSON.stringify(this.list)));
      this.jurisdiction = this.$store.state.btnPowerData
      this.buttonarr = this.findPathByLeafId(this.GetUrlParam('id'), this.jurisdiction)[0].Children
      console.log("this.buttonarr", this.buttonarr)
      this.buttonarr.forEach((item) => {
        if (item.RightName == "展示/隐藏原料名称") {
          this.cxid = item.RightID
        }
      })
      var userid = ''
      if (!JSON.parse(sessionStorage.getItem('userInfo1'))) {
        userid = JSON.parse(
          sessionStorage.getItem('sightseerInfo1')
        ).SCMSUserID;
      } else {
        userid = JSON.parse(
          sessionStorage.getItem('userInfo1')
        ).SCMSUserID;
      }


      this.$axios({
        method: 'post',
        url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.cxid}`,
      }).then(res => {
        this.cxshow = res.data.data

      }).catch((err) => {
        console.log('err', err)
      })


    },
  },
};
</script>

<style lang="scss" scoped>
@import "../index.scss";

.add-raw-material {
  .dialog-title {
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;

    img {
      width: 25px;
      height: 20px;
      cursor: pointer;
      margin-left: 5px;
    }
  }

  .add-raw-material-content {
    max-height: 500px;
    overflow-y: auto;

    &>.group {
      margin: 20px 0 0 0;

      &>.head {
        margin: 0 0 10px 0;
        align-items: flex-start;

        &>.title {
          width: 100px;
          height: 50px;
          margin: 0 10px 0 0;
          line-height: 50px;
          font-size: 18px;
          text-align: center;
          color: white;
          background-color: #37C2FD;
          border-radius: 20px 0 20px 0;
        }

        &>.work-sequence {
          width: calc(100% - 110px);
          height: 100%;
          min-height: 50px;
          padding: 10px;
          background-color: #F7F9D7;
          align-items: flex-start;

          &>.title {
            width: 45px;
          }

          &>.text {
            width: calc(100% - 45px);
          }
        }
      }
    }
  }
}
</style>
