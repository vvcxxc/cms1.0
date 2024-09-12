<template>
  <div id="page-body" class="flex" :style="{zoom:zoomValue}">
    <!-- 工位选项卡 -->
    <location-tab v-if="locationTabShow" @change="locationTabChange"></location-tab>

    <!-- 内容 -->
    <div v-if="location" class="container flex">
      <!-- 新需求添加内容 -->
      <div class="newContent" >
        <div class="new-item" >
          <div>设备状态：</div>
          <div :class="{redText: newData.ServiceStatusTextColor == '2'}">{{newData.ServiceStatusTootipText}}</div>
        </div>
        <div class="new-item" >
          <div>过程提示：</div>
          <div>{{newData.TootipText}}</div>
        </div>
      </div>
      <!-- 头部表单 -->
      <div id="head-form" class="flex" >

        <!-- 数据 -->
        <div class="head-form-right flex">
          <div class="item flex">
            <div class="text">订单号：</div>
            <div class="number">{{ info.OrderId }}</div>
          </div>
          <div class="item flex">
            <div class="text">产品型号：</div>
            <div class="number">{{info.DisplayModel}}</div>
          </div>
          <div class="item flex">
            <div class="text">指导书名称：</div>
            <div class="number">{{ pdfData.current.Name }}</div>
          </div>
        </div>

        <!-- 按钮 -->
        <div class="head-form-left flex">
            <el-button type="primary" style="width: 100px;" @click="needPower('首件报表-上一页按钮', () => {nextPdf('prev')})">上一页</el-button>
            <el-button type="primary" style="width: 100px;" @click="needPower('首件报表-下一页按钮', () => {nextPdf('next')})">下一页</el-button>
            <el-select 
              v-model="pdfData.current.ID" 
              placeholder="请选择PDF"
              style="width: 100px; margin-left: 10px;"
              @change="needPower('首件报表-选择按钮', changePdf)"
            >
              <el-option
                v-for="item in pdfData.list"
                :key="item.ID"
                :label="item.Name"
                :value="item.ID">
              </el-option>
            </el-select>
        </div>
      </div>

      <!-- PDF -->
      <div class="pdf">
        <pdf-book v-if="pdfData.file" :pdfUrl="pdfData.file"></pdf-book>
        <div v-else class="flex no-data">暂无数据</div>
      </div>
    </div>
    <div v-else class="flex no-data">暂无数据</div>

    <!-- 作业指导书管理 -->
    <recipe-dialog
      title="作业指导书管理"
      :visible="dialogVisible"
      @close="() => {dialogVisible = false}"
    />
  </div>
</template>
<script>
import LocationTab from './components/location-tab.vue'
import RecipeDialog from './components/dialog-recipe.vue'
import PdfBook from '@/views/Rzdn/Formula/components/PdfBook.vue'
import { initContainerSize } from './index'
import { GetServiceStatusAndProcessTooltipAndProdcutionType } from '@/api/rzdn/new-location-management.js'
import userMixins from "@/mixins/userMixins";

export default {
  components: {LocationTab, RecipeDialog, PdfBook},
  mixins: [userMixins],
  data() {
    return {
      zoomValue: 0,
      info: {},
      locationTabShow: false,
      location: null, // 工位数据
      pdfData: {
        current: {
          ID: null,
          Name: ""
        }, // 当前PDF数据
        list: [],
        file: null
      },
      dialogVisible: false,
      newData: {
        processText: '',
        decideText: '',
        productText: ''
      },
      timer: null
    };
  },
  methods: {
    getNewData() {
      let $this = this
      GetServiceStatusAndProcessTooltipAndProdcutionType(this.location.WorkStationId).then(res => {
        if (res.data.code === 0) {
          $this.newData = res.data.data
        } else {
          $this.confirm_Pop2($this, res.data.msg)
        }
      })
    },
    // 订单信息
    getOrderInfo() {
      this.locationTabShow = false
      this.$api.locationManagement.getCurrentOrderInfo().then(ref => {
        const data = ref.data.data
        console.log("订单信息", JSON.parse(JSON.stringify(data)));
        this.info = data || {}
        this.locationTabShow = true
      }, err => {
        console.log('失败回调', err);
      })
      // if (window) return
    },
    // 选择工位
    locationTabChange(data) {
      // console.clear();
      // console.log("选择工位", JSON.parse(JSON.stringify(data)));
      this.location = data
      if (data && data.WorkStationId && this.info && this.info.FormularId) {
        this.getBooks(this.info.FormularId, data.WorkStationId)
        clearInterval(this.timer)
        this.getNewData()
        this.timer = setInterval(() => {
          this.getNewData()
        }, 1000)
      } else {
        console.log('参数不全');
      }
    },
    // 根据工位获取指导书(多个)
    getBooks(FormulaId, StationId) {
      this.pdfData = {
        current: {
          ID: null,
          Name: ""
        },
        list: [],
        file: null
      }
      this.$api.locationManagement.getGuideBooks({ FormulaId, StationId }).then(ref => {
        const list = ref.data.data
        if (!list || !list.length) {
          console.log("指导书(多个)返回数据有误", ref);
          return
        }
        // console.log('指导书(多个)', JSON.parse(JSON.stringify(list)));
        this.pdfData.list = list
        this.pdfData.current.ID = list[0].ID
        this.changePdf(list[0].ID)
      }, err => {
        console.log('失败回调', err);
      })
    },

    // 获取指导书(单个)
    getBook() {
      this.pdfData.file = `/api/GuidingBook/GetFileByID/${this.pdfData.current.ID}`
      // this.pdfData.file = null
      // this.$api.locationManagement.getFileByID(this.pdfData.current.ID).then(ref => {
      //   // console.log("指导书(单个)", ref);
      //   var blob = new Blob([ref.data], {type: 'application/pdf;chartset=UTF-8'})
      //   this.pdfData.file = URL.createObjectURL(blob)
      // }, err => {
      //   console.log('失败回调', err);
      // })
    },
    // 选择PDF
    changePdf(id) {
      // console.clear();
      // console.log('', JSON.parse(JSON.stringify({
      //   '1PDF完整数据': this.pdfData,
      //   '2选择PDF': id,
      // })));
      let name = ''
      id = id || this.pdfData.current.ID
      for (let i = 0, iLen = this.pdfData.list.length; i < iLen; i++) {
        const item = this.pdfData.list[i]
        if (item.ID === id) {
          name = item.Name
          break
        }
      }
      if (!name) {
        this.$message({ message: '找不到PDF文件名称', type: 'error' });
        return
      }
      this.pdfData.current.Name = name
      this.getBook()
    },

    // 切换文件
    nextPdf(state) {
      if (!this.pdfData.list.length) return
      let index = -1;
      for (let i = 0, iLen = this.pdfData.list.length; i < iLen; i++) {
        const item = this.pdfData.list[i]
        if (item.ID === this.pdfData.current.ID) {
          index = i
          break
        }
      }
      const fun = {
        prev: () => {
          if (index === 0) {
            index = this.pdfData.list.length -1
          } else {
            index--
          }
        },
        next: () => {
          if (index === this.pdfData.list.length -1) {
            index = 0
          } else {
            index++
          }
        },
      }
      if (!fun[state]) return
      fun[state]()
      const id = this.pdfData.list[index].ID
      this.pdfData.current.ID = id
      // console.log('', JSON.parse(JSON.stringify({
      //   '1PDF完整数据': this.pdfData,
      //   '2选择PDF': this.pdfData.current.ID,
      //   '3状态': state,
      //   '4.1最终index': index,
      //   '4.2最终id': id,
      // })));
      this.changePdf(id)
    },
    init() {
      console.clear();
      setTimeout(() => { this.zoomValue = initContainerSize('#page-body') }, 500);
      this.getOrderInfo()
    }
  },
  mounted() {
    // this.init()
    setTimeout(() => {
      this.init()
    }, 1000);
  },
  destroyed(){
    clearInterval(this.timer)
  }
};
</script>

<style lang='scss' scoped>
@import "@/assets/style/push-message.scss";
#page-body {
  width: 100%;
  height: 100%;
  padding: 20px 20px;
  background: #EEEEEE;
  align-items: flex-start;
  .no-data {
    width: 100%;
    height: 100%;
    background: white;
  }
  .location-tab {
    width: 120px;
    min-width: 120px;
    height: 100%;
    padding: 0 10px 0 0;
    .itme {
      width: 100%;
      height: 40px;
      margin: 0 0 10px 0;
      line-height: 40px;
      text-align: center;
      background: white;
      border-radius: 6px;
      cursor: pointer;
    }
    .itme:hover, .select-itme {
      color: #EEEEEE;
      background: #4270E4;
    }
  }

  .container {
    width: 100%;
    height: 100%;
    flex-direction : column;
    
    & > #head-form {
      width: 100%;
      justify-content: space-between;
      flex-wrap:wrap;
      
      // 左
      & > .head-form-left {
        padding: 0 0 10px 0;
        justify-content: flex-start;
        .item {
          margin: 0 10px 0 0;
          .title {
            font-size: 16px;
            font-family: Source Han Sans CN;
            font-weight: 400;
            color: #6c6d6d;
            line-height: 20px;
          }
        }
      }
      
      // 右
      & > .head-form-right {
        padding: 0 0 10px 0;
        & > .item {
            margin: 0 20px 0 0;
            line-height: 40px;
            text-align: center;
          .text {
            height: 40px;
          }
          .number {
            height: 40px;
            padding: 0 20px;
            font-weight: bold;
            background: white;
            border: 1px solid black;
          }
        }
      }
    }

    .pdf {
      width: 100%;
      height: 100%;
      .pdf-class {
        width: 100%;
        height: 100%;
      }
    }
    
  }
}
.newContent {
  width: 100%;
  height: 100px;
  color: #386DF0;
  display: flex;
  align-items: center;
  background: linear-gradient(to right,#E8EDFF, #BCD5FF);
  margin-bottom: 10px;
  background-size: 100% 100%;
  box-sizing: border-box;
  padding-left: 30px;
  position: relative;
  font-size: 22px;
  &::before{
    content: '';
    width: 25px;
    height: 25px;
    position: absolute;
    left: 0;
    background: url('../../../assets/images/icon_mess@2x.png');
    background-size: 100% 100%;
  }
}
.new-item{
  display: flex;
  >div:last-child {
    min-width: 90px;
  }
  &+.new-item {
    margin-left: 20px;
  }
}

.redText {
  color: #F05E38;
}
</style>