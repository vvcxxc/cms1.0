<!-- 表格 -->
<template>
  <div class="my-table">
    <!-- 头部 -->
    <div class="my-head flex">
      <div class="column column-1">工序</div>
      <div class="column column-2">工步</div>
      <div class="column column-3">
        <div class="row">{{ title == "线体平均节拍" ? '平均时长（s）' : '时间（s）' }}</div>
        <div class="row flex">
          <div class="item">开始</div>
          <div class="item">持续</div>
          <div class="item">结束</div>
        </div>
      </div>
      <div class="column column-4 flex">
        <span>{{ dT ? '时间范围内平均时长' : '循环时间' }}</span>
        <el-checkbox v-if="auxiliaryWire" v-model="auxiliaryWireConfig.show">辅助线</el-checkbox>
      </div>
      <div class="totalTime" v-if="totalTime">{{ totalTime }}</div>
    </div>
    <!-- 内容 -->
    <div class="my-content flex" v-loading="this.$store.state.isShow">

      <!-- 头部 -->
      <div class="my-content-head flex">
        <div class="left">
          <span>人工动作时序：</span>
          <el-switch v-model="formData.qq1" @change="changeRengongShow" />
        </div>
        <div class="right flex">
          <div class="item flex">
            <div class="icon state-1"></div>
            <div>{{ title == "线体平均节拍" ? '人工动作平均时长' : '人工动作实际时长' }}</div>
          </div>
          <div class="item flex">
            <div class="icon state-2"></div>
            <div>{{ title == "线体平均节拍" ? '设备动作平均时长' : '设备动作实际时长' }}</div>
          </div>
          <div class="item flex">
            <div class="icon state-3 flex"></div>
            <div>{{ title == "线体平均节拍" ? '上下限范围内的平均时长' : '上下限范围内的时长' }}</div>
          </div>
          <div class="item flex">
            <div class="icon state-4"></div>
            <div>{{ title == "线体平均节拍" ? '超出上限的平均时长' : '超出上限的时长' }}</div>
          </div>
          <div class="item flex">
            <div class="icon state-5"></div>
            <div>{{ title == "线体平均节拍" ? '未达下限的平均时长' : '未达下限的时长' }}</div>
          </div>
        </div>
      </div>

      <!-- 内容 -->
      <div class="container flex">
        <!-- 表格 -->
        <div class="container-table">
          <div class="item flex" v-for="(item, i) in tableData.items" :key="i">
            <div class="left">{{ item.Name }}</div>
            <div class="right">
              <div class="row title flex">
                <div>
                  <span v-if="item.Code">产品码：{{ item.Code }}</span>
                </div>
                <div>时长：{{ item.Value }}s</div>
              </div>
              <div class="row flex" v-for="(workingProcedure, n) in item.children" :key="n">
                <div class="column column-1">{{ workingProcedure.WorkStep }}</div>
                <div class="column column-2">{{ workingProcedure.Start }}</div>
                <div class="column column-3" :style="{
                  background: workingProcedure.OverstepUpperLimit ? 'pink' : ''
                }">{{ workingProcedure.Duration }}</div>
                <div class="column column-4">{{ workingProcedure.Finish }}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- 图表 -->
        <div id="container-echarts" class="container-echarts" :style="`height:${(echartsData.row.length * 40) + 47}px;`">
          <!-- 栅格 -->
          <div class="row flex" v-for="(row, i) in echartsData.row" :key="i">
            <div class="box" v-for="(box, n) in row" :key="n">
              <!-- {{ box.title }} -->
            </div>
          </div>

          <!-- 刻度线 -->
          <div v-for="item in scaleLine.list" :key="item.id" class="scale-line" :style="scaleLineStyle(item)">
            <div class="content">
              <div class="value">{{ item.value }}s</div>
              <div class="line"></div>
            </div>
          </div>

          <!-- 进度条 -->
          <div class="progress-bar">
            <div class="container">
              <div class="group" v-for="item in progressBarList.list" :key="item.id">
                <div v-for="element in item.list" :key="element.id" class="box">
                  <div v-if="!element.IsManual || (element.IsManual && rengongShow)"
                    :class="element.IsManual ? 'isManualBar' : 'bar'" :style="progressBarStyle(element)">
                    <div class="redBar" v-if="element.OverstepUpperLimit" :style="progressRedStyle(element)"></div>
                    <div class="greyBar" v-if="element.NotReachedLowerLimit" :style="progressGreyStyle(element)"></div>
                    <div class="follwdiv" :style="{ left: `${leftP}px`, top: `${topP}px` }">
                      工步：{{ element.workStep }}<br />
                      开始时间：{{ element.start }}s<br />
                      结束时间：{{ element.end }}s<br />
                      {{ title == "线体平均节拍" ? '平均' : '持续' }}时长：{{ element.duration }}s<br />
                      上限值：{{ element.UpperLimit }}s<br />
                      下限值：{{ element.LowerLimit }}s<br />
                      <span v-if="element.OverstepUpperLimit" :style="{ color: '#F65757' }">超时：{{
                        element.OverstepUpperLimit
                      }}s</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 辅助线 -->
          <div v-if="auxiliaryWireConfig.show" id="auxiliary-wire" class="flex" style="left: 350px;"
            @mousedown="auxiliaryWireMove()"></div>
        </div>
      </div>

      <!-- 底部滚动条 -->
      <div id="bottom-scroll-bar" class="bottom-scroll-bar">
        <div id="bottom-scroll-bar-slider" class="slider" style="left: 0px;" @mousedown="bottomScrollBarMove()"></div>
      </div>

    </div>
  </div>
</template>
<script>
import { LOG10E } from 'mathjs';

export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    auxiliaryWire: {
      type: Boolean,
      required: false,
      default: false
    },
    dataObj: {
      required: true,
    },
    rengongShow: {
      type: Boolean,
      required: false,
    },
    dT: {
      type: String,
      required: false,
    },
    totalTime: {
      type: String,
      required: false,
    },
  },
  data() {
    return {
      formData: {
        qq1: true,
      },
      // 表格数据
      tableData: {
        items: []
      },
      // 图表数据
      echartsData: {
        row: [],
        columnNumber: 0, // 有多少列
      },
      // 刻度线
      scaleLine: {
        list: [] // 有多少条
      },
      // 进度条
      progressBarList: {
        list: [] // 有多少条
      },
      // 辅助线
      auxiliaryWireConfig: {
        show: false
      },
      topP: 0,
      leftP: 0
    }
  },
  watch: {
    dataObj: {
      deep: true,
      immediate: true,
      handler: function (newVal, oldVal) {
        if (!newVal || !newVal.TimeSequences || !newVal.TimeSequences.length) {
          this.tableData.items = [];
          this.echartsData = {
            row: [],
            columnNumber: 0, // 有多少列
          };
          this.scaleLine = {
            list: [],
          };
          this.progressBarList = {
            list: [],
          };
          return
        }
        this.queryData()
      }
    }
  },
  methods: {
    changeRengongShow() {
      this.$emit('changeRengongShow', this.formData.qq1);
    },
    createRandomId() {
      return (Math.random() * 10000000).toString(16).substr(0, 4) + (new Date()).getTime() + Math.random().toString().substr(2, 5);
    },
    queryData() {
      const data = JSON.parse(JSON.stringify(this.dataObj))
      data.ProcessDurations.forEach(item => {
        item.children = (
          item.Code ?
            data.TimeSequences.filter(item2 => item2.WorkProcess == item.Name && item2.ProductCode == item.Code) :
            data.TimeSequences.filter(item2 => item2.WorkProcess == item.Name)
        )
      })
      this.tableData.items = data.ProcessDurations
      console.log("this.tableData.items", this.tableData.items)
      let maxEnd = 0 // 最大结束时间；最大时长，查询结束最大值就行了
      let maxRow = -1 // 最大行
      let progressBarList = [] // 进度条
      for (const item of data.ProcessDurations) {
        maxRow += 2
        const group = []
        for (const element of item.children) {
          maxRow += 1
          if ((Number(element.Finish) + Number(element.NotReachedLowerLimit)) > maxEnd) maxEnd = (Number(element.Finish) + Number(element.NotReachedLowerLimit))
          group.push({
            id: this.createRandomId(),
            start: element.Start,
            duration: element.Duration,
            end: element.Finish,
            OverstepUpperLimit: element.OverstepUpperLimit,
            NotReachedLowerLimit: element.NotReachedLowerLimit,
            IsManual: element.IsManual,
            UpperLimit: element.UpperLimit,
            LowerLimit: element.LowerLimit,
            workStep: element.WorkStep
          })
        }
        progressBarList.push({
          id: this.createRandomId(),
          list: group
        })
      }
      this.progressBarList.list = progressBarList
      //除以10
      maxEnd = Math.ceil(maxEnd / 10)
      this.echartsData.columnNumber = maxEnd

      // 渲染图表
      let _row = [] // 行
      for (let i = 0; i < maxRow; i++) {
        let _box = [] // 列
        for (let n = 0; n < maxEnd; n++) {
          _box.push({
            title: `${i},${n}`,
          })
        }
        _row.push(_box)
      }
      this.echartsData.row = _row

      // 刻度线
      const scaleLine = []
      for (let i = 0, iLen = _row[0].length; i < iLen; i++) {
        if (i % 10 === 0) {
          scaleLine.push({
            id: this.createRandomId(),
            value: i * 10
          })
        }
      }
      this.scaleLine.list = scaleLine
      console.log(
        `1.行数：${this.echartsData.row.length};
        2.列数：${this.echartsData.columnNumber}`,
      )
    },
    scaleLineStyle(data) {
      let style = ''
      const left = ((data.value / 10) * 40) + 7
      style += `left:${left}px;`
      return style
    },
    progressBarStyle(data) {
      let style = ''
      const width = data.duration * 40 / 10
      const left = data.start * 40 / 10
      style += `width:${width}px; left:${left}px;`
      if (data.OverstepUpperLimit || data.NotReachedLowerLimit) {
        style += `borderRight: none;`
      }
      return style
    },
    progressRedStyle(data) {
      let style = ''
      const width = data.OverstepUpperLimit * 40 / 10
      style += `width:${width}px;`
      return style
    },
    progressGreyStyle(data) {
      let style = ''
      const width = data.NotReachedLowerLimit * 40 / 10
      style += `width:${width}px;`
      return style
    },
    // 底部滚动条移动
    bottomScrollBarMove() {
      const config = {
        moveDomId: 'bottom-scroll-bar-slider', // 移动元素ID
        maxDistance: 0, // 最大移动距离
        initX: 0, // 鼠标初始坐标
      }
      const parentDom = document.getElementById('bottom-scroll-bar').getBoundingClientRect() // 父级元素
      const moveDom = document.getElementById(config.moveDomId)
      const domRect = moveDom.getBoundingClientRect()
      config.maxDistance = parentDom.width - domRect.width

      let mousedownHandler = () => { }
      let mousemoveHandler = () => { }
      let mouseupHandler = () => { }
      // 删除绑定事件
      const cancel = () => {
        document.removeEventListener('mousedown', mousedownHandler)
        document.removeEventListener('mousemove', mousemoveHandler)
        document.removeEventListener('mouseup', mouseupHandler)
      }

      // 设置X轴滚动条
      const setScrollX = (percentage) => {
        const dom = document.getElementById('container-echarts')
        const domRect = dom.getBoundingClientRect()
        const width = this.echartsData.columnNumber * 40
        const maxX = width - domRect.width
        const setVal = maxX * percentage
        // console.log({
        //   '0宽度': width,
        //   '1最大滚动': maxX,
        //   '3设置滚动': setVal,
        // });
        document.getElementById('container-echarts').scrollLeft = setVal; // 设置
      }

      document.addEventListener(
        'mousedown',
        (mousedownHandler = (e) => {
          // console.log('鼠标-按下👇');
          config.initX = e.pageX
          const moveDom = document.getElementById(config.moveDomId)
          config.initLeft = Number(moveDom.style.left.replace("px", ""))
        })
      )
      document.addEventListener(
        'mousemove',
        (mousemoveHandler = (e) => {

          const move = e.pageX - config.initX // 鼠标移动距离
          const newLeft = config.initLeft + move // 移动元素的新偏移
          const percentage = newLeft / config.maxDistance // 百分比

          // console.log({
          //   '初始left': config.initLeft,
          //   '鼠标移动距离': move,
          //   '最大移动距离': config.maxDistance,
          //   '当前left': left,
          //   '百分比': percentage,
          // });
          setScrollX(percentage)

          if (percentage >= 0 && percentage <= 1) {
            document.getElementById(config.moveDomId).style.left = newLeft + 'px'
          } else if (percentage < 0) {
            document.getElementById(config.moveDomId).style.left = 1 + 'px'
          } else if (percentage > 1) {
            document.getElementById(config.moveDomId).style.left = (config.maxDistance - 1) + 'px'
          }

          e.preventDefault()
          return
        })
      )
      document.addEventListener(
        'mouseup',
        (mouseupHandler = () => {
          // console.log('鼠标-释放👆');
          cancel()
        })
      )
    },
    // 辅助线移动
    auxiliaryWireMove() {
      const config = {
        moveDomId: 'auxiliary-wire', // 移动元素ID
        maxDistance: this.echartsData.columnNumber * 40, // 最大移动距离
        initX: 0, // 鼠标初始坐标
      }

      let mousedownHandler = () => { }
      let mousemoveHandler = () => { }
      let mouseupHandler = () => { }
      // 删除绑定事件
      const cancel = () => {
        document.removeEventListener('mousedown', mousedownHandler)
        document.removeEventListener('mousemove', mousemoveHandler)
        document.removeEventListener('mouseup', mouseupHandler)
      }

      document.addEventListener(
        'mousedown',
        (mousedownHandler = (e) => {
          // console.log('鼠标-按下👇');
          config.initX = e.pageX
          const moveDom = document.getElementById(config.moveDomId)
          config.initLeft = Number(moveDom.style.left.replace("px", ""))
        })
      )
      document.addEventListener(
        'mousemove',
        (mousemoveHandler = (e) => {
          const move = e.pageX - config.initX // 鼠标移动距离
          const newLeft = config.initLeft + move // 移动元素的新偏移

          // console.log({
          //   '初始left': config.initLeft,
          //   '鼠标移动距离': move,
          //   '最大移动距离': config.maxDistance,
          //   '当前left': left,
          // });

          if (newLeft >= 0 && newLeft <= config.maxDistance) {
            document.getElementById(config.moveDomId).style.left = newLeft + 'px'
          }
          e.preventDefault()
          return
        })
      )
      document.addEventListener(
        'mouseup',
        (mouseupHandler = () => {
          // console.log('鼠标-释放👆');
          cancel()
        })
      )
    },
    // 侦听键盘事件
    listenerKeydownFn() {
      document.addEventListener(
        'wheel',
        (e) => {
          if (e.shiftKey) {
            e.stopPropagation()
            e.preventDefault()
            return false
          }
        },
        { passive: false } // 阻止默认事件
      )
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.listenerKeydownFn()
      this.changeRengongShow()
      document.addEventListener(
        'mousemove',
        (e) => {
          this.topP = e.pageY;
          this.leftP = e.pageX;
        }
      )
    })
  },
}
</script>
<style lang="scss" scoped>
$color1: #E4E4E4;

.flex {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

::v-deep .is-checked {
  .el-switch__core {
    background: #4270E4;

    &::after {
      background-color: white !important;
    }
  }
}

.my-table {
  width: 100%;
  height: 100%;
  padding: 14px 20px;
  box-sizing: border-box;

  &>.my-head {
    width: 100%;
    height: 80px;
    margin: 0 0 10px 0;
    font-size: 16px;
    font-weight: 400;
    color: #4270E4;
    background-color: #EEF3FF;
    border: 1px solid #BACAF2;
    justify-content: space-between;
    position: relative;

    .totalTime {
      position: absolute;
      right: 20px;
      bottom: 5px;
    }

    &>.column {
      height: 100%;
      line-height: 1;
      font-weight: bold;
      font-size: 18px;
      display: flex;
      align-items: center;
      justify-content: center;
      word-break: break-all;
      border-right: 1px solid #BACAF2;
    }

    &>.column:last-child {
      border-right: none;
    }

    &>.column-1 {
      width: 60px;
      min-width: 60px;
    }

    &>.column-2 {
      width: 160px;
      min-width: 160px;
    }

    &>.column-3 {
      width: 200px;
      min-width: 200px;
      height: 100%;
      display: block !important;

      &>.row {
        width: 100%;
        height: 50%;
        line-height: 40px;
        text-align: center;

        &>.item {
          width: 33.33333333%;
          border-top: 1px solid #BACAF2;
          border-right: 1px solid #BACAF2;
          line-height: 40px;
          text-align: center;
        }

        &>.item:last-child {
          border-right: none;
        }
      }
    }

    &>.column-4 {
      width: 100%;
      height: 100%;

      ::v-deep .el-checkbox {
        margin: 0 0 0 10px;

        .el-checkbox__label {
          padding: 0 0 0 5px;
        }
      }
    }
  }

  &>.my-content {
    width: 100%;
    height: calc(100% - 90px);
    padding: 10px 10px 10px 0px;
    background-color: #F8F8F8;
    flex-direction: column;
    position: relative;

    &>.my-content-head {
      width: calc(100% - 440px);
      justify-content: space-between;
      margin: 0 0 0 440px;

      // background: red;
      &>.right {
        .item {
          margin: 0 0 0 20px;

          .icon {
            width: 18px;
            height: 18px;
            margin: 0 10px 0 0;
            background: #FFFFFF;
          }

          .state-1 {
            border: 1px solid #46BE05;
          }

          .state-2 {
            border: 1px solid #4270E4;
          }

          .state-3 {
            width: 54px;
            background: rgba(255, 255, 255, 0);

            &::after {
              display: block;
              content: "";
              width: 18px;
              height: 18px;
              margin: 0 10px 0 0;
              background: #D8E3FF;
            }

            &::before {
              display: block;
              content: "";
              width: 18px;
              height: 18px;
              margin: 0 10px 0 0;
              background: #D4FBBF;
            }
          }

          .state-4 {
            background-color: #F65757;
          }

          .state-5 {
            background-color: #BBBBBB;
          }
        }
      }
    }

    &>.container {
      width: 100%;
      height: calc(100% - 25px);

      position: relative;
      overflow-y: auto;
      align-items: flex-start;

      &>.container-table {
        width: 420px;
        padding: 30px 0 0 0;

        &>.item {
          width: 100%;
          // margin: 0 0 40px 0;
          margin: 0 0 38px 0;
          background-color: white;
          border: 1px solid $color1;
          justify-content: space-between;
          border-right: 1px solid $color1;

          &:last-child {
            margin: 0 0 0 0;
          }

          &>.left {
            width: 60px;
            // height: 100%;
            height: 40px;
            text-align: center;
            word-break: break-all;
          }

          &>.right {
            width: calc(100% - 60px);
            line-height: 40px;
            border-left: 1px solid $color1;

            &>.row {
              width: 100%;
              height: 40px;
              border-bottom: 1px solid $color1;

              &>.column {
                // height: 100%;
                height: 40px;
                padding: 0 10px;
                border-right: 1px solid $color1;
                line-height: 1;
                display: flex;
                align-items: center;
              }

              &>.column:last-child {
                border-right: none;
              }

              &>.column-1 {
                width: 160px;
                min-width: 160px;
              }

              &>.column-2 {
                width: 66px;
                min-width: 66px;
              }

              &>.column-3 {
                width: 66px;
                min-width: 66px;
              }

              &>.column-4 {
                width: 66px;
                min-width: 66px;
              }
            }

            &>.row:last-child {
              border-bottom: none;
            }

            &>.title {
              padding: 5px 10px;
              background-color: #EEEEEE;
              justify-content: space-between;
            }
          }
        }
      }

      .container-echarts {
        width: calc(100% - 437px);
        min-height: 100%;
        padding: 30px 0 0 7px;
        margin: 0 0 0 15px;
        position: relative;
        overflow-x: auto;
        overflow-y: hidden;

        // 栅格
        .row {
          height: 40px;
          border-bottom: 1px solid $color1;
          justify-content: flex-start;
          position: relative;

          .box {
            width: 40px;
            min-width: 40px;
            height: 40px;
            min-height: 40px;
            text-align: center;
            line-height: 40px;
            background-color: white;
            border-right: 1px solid $color1;
            border-bottom: 1px solid $color1;
          }

          &>.box:last-child {
            border-right: none;
          }

          &:first-child {
            .box {
              border-top: 1px solid $color1;
            }
          }
        }

        // 刻度线
        .scale-line {
          position: absolute;
          top: 0;
          width: 1px;
          height: inherit;

          .content {
            width: 100%;
            height: 100%;
            padding: 5px 0 0 0;
            position: relative;

            .value {
              width: 100px;
              height: 24px;
              text-align: center;
              transform: translate(-50%, 0);
            }

            .line {
              width: 1px;
              height: calc(100% - 25px);
              border-left: 1px solid #999999;
            }
          }
        }

        // 进度条
        .progress-bar {
          width: 100%;
          height: 100%;
          position: absolute;
          top: 0;
          left: 0;

          .container {
            width: 100%;
            height: 100%;
            position: relative;
            padding: 0 0 0 7px;

            .group {
              width: 100%;
              position: relative;
              // margin: 40px 0 0 0;
              padding: 80px 0 0 0;

              .box {
                height: 40px;
                padding: 4px 0 5px 0;
                position: relative;

                .bar,
                .isManualBar {
                  // width: 100%;
                  height: 30px;
                  position: absolute;
                  background-color: #D8E3FF;
                  border: 1px solid #4270E4;

                  .redBar {
                    position: absolute;
                    right: 0;
                    top: 50%;
                    transform: translate(0, -50%);
                    height: 30px;
                    border: 1px solid #4270E4;
                    border-left: none;
                    background-color: #F65757;
                  }

                  .greyBar {
                    position: absolute;
                    right: 0;
                    top: 50%;
                    transform: translate(100%, -50%);
                    height: 30px;
                    border-left: 1px solid #4270E4;
                    border-right: 1px solid #BBBBBB;
                    background-color: #BBBBBB;
                  }

                  .follwdiv {
                    display: none;
                    position: fixed;
                    background-color: rgba(0, 0, 0, .7);
                    color: #fff;
                    border-radius: 4px;
                    padding: 16px;
                    z-index: 10;
                    transform: translate(5px, -50%);
                  }
                }

                .bar:hover .follwdiv,
                .isManualBar:hover .follwdiv {
                  display: block;
                }

                .isManualBar {
                  background-color: #D4FBBF;
                  border: 1px solid #46BE05;
                }

              }

              &:first-child {
                // margin: 30px 0 0 0;
                padding: 70px 0 0 0;
              }
            }
          }
        }

        // 辅助线
        #auxiliary-wire {
          position: absolute;
          top: 0;
          width: 10px;
          height: 100%;
          // background-color: #46BE05;
          cursor: w-resize;

          &::before {
            content: "";
            display: block;
            width: 1px;
            height: 100%;
            border-left: 2px solid #4270E4;
          }
        }
      }
    }

    // 底部滚动条
    .bottom-scroll-bar {
      width: calc(100% - 447px);
      height: 18px;
      padding: 2px 0;
      position: absolute;
      right: 11px;
      bottom: 8px;
      background-color: #F1F1F1;

      .slider {
        width: 100px;
        height: 100%;
        position: relative;
        background-color: #C0C0C0;

        &:hover {
          background-color: #A8A8A8;
        }
      }
    }
  }
}
</style>
