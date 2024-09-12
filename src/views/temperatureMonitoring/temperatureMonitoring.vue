<template>
  <div class="temperatureMonitoring-Page" :class="{ blackBlueBg: $store.state.color === 'blackBlue' }">
    <div class="page-center">
      <div class="select">
        <div class="select-text">窑炉选择：</div>
        <el-select v-model="curSelectItem" placeholder="Select" :popper-append-to-body="false">
          <el-option v-for="item in KilnsList" :key="item.Id" :label="item.Name" :value="item.Id"></el-option>
        </el-select>
        <el-button class="select-btn" @click="searchTemperatureMonitoringSentToPage">查询</el-button>
      </div>
      <div class="content">
        <div class="content-left">
          <div class="box1">
            <div class="box1-item">
              <div>气站电磁阀启动指示</div>
              <div :class="!tableInfo.ValveOpen ? 'cir-g' : 'cir-r'" />
            </div>
            <div class="box1-item">
              <div>气站电磁阀</div>
              <div :class="!tableInfo.Valve ? 'cir-g' : 'cir-r'" />
            </div>
            <!-- <div class="box1-item">
              <div>气站电磁阀闭</div>
              <div :class="!tableInfo.ValveClose?'cir-g':'cir-r'"/>
            </div> -->
          </div>
          <div class="box2">
            <div class="box2-title">处理炉</div>
            <div class="box2-label">
              <div class="box2-label-title">烧嘴1:</div>
              <div class="box2-label-info">
                <div class="box2-info-item">
                  <div>着火</div>
                  <div :class="!tableInfo.JetIgnition1 ? 'cir-g' : 'cir-r'" />
                </div>
                <!-- <div class="box2-info-item">
                  <div>点火</div>
                  <div :class="!tableInfo.JetOnFire1?'cir-g':'cir-r'"/>
                </div> -->
              </div>
            </div>
            <div class="box2-label">
              <div class="box2-label-title">烧嘴2:</div>
              <div class="box2-label-info">
                <div class="box2-info-item">
                  <div>着火</div>
                  <div :class="!tableInfo.JetIgnition2 ? 'cir-g' : 'cir-r'" />
                </div>
                <!-- <div class="box2-info-item">
                  <div>点火</div>
                  <div :class="!tableInfo.JetOnFire2?'cir-g':'cir-r'"/>
                </div> -->
              </div>
            </div>
          </div>

          <div class="box3">
            <div class="box3-item-t">
              <div class="box3-item-title">处理炉</div>
              <div class="box3-item-input-R">
                <div class="box3-item-input-R-item">
                  <div class="box3-item-input-s">{{ tableInfo.KilnTemperature1 }}</div>
                  <div class="box3-item-input-s">{{ tableInfo.KilnTemperature2 }}</div>
                  <div class="box3-item-unit">℃</div>
                </div>
                <div class="box3-item-input-R-item">
                  <div class="box3-item-input-s">{{ tableInfo.KilnTemperature3 }}</div>
                  <div class="box3-item-input-s">{{ tableInfo.KilnTemperature4 }}</div>
                  <div class="box3-item-unit">℃</div>
                </div>
                <div class="box3-item-input-R-item">
                  <div class="box3-item-input-s">{{ tableInfo.KilnTemperature5 }}</div>
                  <div class="box3-item-input-s">{{ tableInfo.KilnTemperature6 }}</div>
                  <div class="box3-item-unit">℃</div>
                </div>
              </div>
            </div>
            <div class="box3-item">
              <div class="box3-item-title">冷却水</div>
              <div class="box3-item-input-l">{{ tableInfo.CoolWaterSurplus }}</div>
              <div class="box3-item-unit">M³</div>
            </div>
            <div class="box3-item">
              <div class="box3-item-title">排烟风机</div>
              <div class="box3-item-input-l">{{ tableInfo.SmokeExhaustFan }}</div>
              <div class="box3-item-unit">kw</div>
              <div :class="!tableInfo.SmokeExhaustFanState ? 'cir-g' : 'cir-r'"></div>
            </div>
            <div class="box3-item">
              <div class="box3-item-title">废热风机</div>
              <div class="box3-item-input-l">{{ tableInfo.WasteHeatFan }}</div>
              <div class="box3-item-unit">kw</div>
              <div :class="!tableInfo.WasteHeatFanState ? 'cir-g' : 'cir-r'"></div>
            </div>
            <div class="box3-item">
              <div class="box3-item-title">烧成时间</div>
              <div class="box3-item-input-s">
                {{ isBSystem ? 15 : tableInfo.BurningTimeHour }}
              </div>
              <div class="box3-item-unit-m">H</div>
              <div class="box3-item-input-s">
                {{ isBSystem ? 0 : tableInfo.BurningTimeMinute }}
              </div>
              <div class="box3-item-unit-m">M</div>
            </div>
          </div>
        </div>
        <div class="content-right">
          <div class="right-title">温度控制（℃）</div>

          <div class="right-table">
            <div class="clomn">
              <div class="row"></div>
              <div class="row">电压</div>
              <div class="row">电流</div>
              <div class="row">实温</div>
              <div class="row">设温</div>
              <div class="row">目标</div>
              <div class="row">输出</div>
              <div class="row">报警</div>
              <div class="row">状态</div>
            </div>
            <div class="clomn" v-for="item in t1" :key="item.Name">
              <div class="row">{{ item.Name }}</div>
              <div class="row">{{ item.Voltage }}</div>
              <div class="row">{{ item.Electricity }}</div>
              <div class="row">{{ item.RealTemperature }}</div>
              <div class="row">{{ item.SetTemperature }}</div>
              <div class="row">{{ item.Target }}</div>
              <div class="row">{{ item.Output }}</div>
              <div class="row">{{ item.BAlarm }}</div>
              <div class="row">{{ item.State }}</div>
            </div>
          </div>
          <div class="right-title">温度控制（℃）</div>

          <div class="right-table">
            <div class="clomn">
              <div class="row"></div>
              <div class="row">电压</div>
              <div class="row">电流</div>
              <div class="row">实温</div>
              <div class="row">设温</div>
              <div class="row">目标</div>
              <div class="row">输出</div>
              <div class="row">报警</div>
              <div class="row">状态</div>
            </div>
            <div class="clomn" v-for="item in t2" :key="item.Name">
              <div class="row">{{ item.Name }}</div>
              <div class="row">{{ item.Voltage }}</div>
              <div class="row">{{ item.Electricity }}</div>
              <div class="row">{{ item.RealTemperature }}</div>
              <div class="row">{{ item.SetTemperature }}</div>
              <div class="row">{{ item.Target }}</div>
              <div class="row">{{ item.Output }}</div>
              <div class="row">{{ item.BAlarm }}</div>
              <div class="row">{{ item.State }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      timer: 0,
      empyt: '',
      KilnsList: [],
      curSelectItem: '', //下拉框显示的
      realCurSelectItem: '', //按了查询后更新
      tableInfo: {
        ControlInfo: []
      },
      t1: [],
      t2: [],
      isBSystem: false
    };
  },
  methods: {
    searchTemperatureMonitoringSentToPage() {
      this.realCurSelectItem = this.curSelectItem;
      clearInterval(this.timer);
      this.TemperatureMonitoringSentToPage();
      this.timer = setInterval(() => {
        this.TemperatureMonitoringSentToPage(); //轮询实时刷新
      }, 5000);
    },
    TemperatureMonitoringSentToPage() {
      this.$axios
        .post(
          `/api/TechnologicalProcess/TemperatureMonitoringSentToPage?KilnID=${Number(
            this.realCurSelectItem
          )}&isSystemB=${this.isBSystem ? true : false}`
        )
        .then(res => {
          if (res.data.code == 0) {
            let data = res.data.data;
            this.tableInfo = data;
            this.t1 = data.ControlInfo.filter(_ => {
              return _.Name.indexOf('T') >= 0;
            });
            this.t1.push(
              data.ControlInfo.find(_ => {
                return _.Name == '处理炉';
              })
            );
            this.t2 = data.ControlInfo.filter(_ => {
              return _.Name.indexOf('U') >= 0;
            });
            this.t2.push(
              data.ControlInfo.find(_ => {
                return _.Name == '炉压';
              })
            );
          }
        });
    },
    //获取窑炉列表
    GetKilnsTypesList() {
      this.$axios
        .get(`/api/MainWindowData/GetKilnsTypesList`)
        .then(res => {
          if (res.data.code == 0) {
            this.KilnsList = res.data.data;
            this.curSelectItem = res.data.data[0].Id;
            this.realCurSelectItem = res.data.data[0].Id;
            this.TemperatureMonitoringSentToPage();
            this.timer = setInterval(() => {
              this.TemperatureMonitoringSentToPage(); //轮询实时刷新
            }, 5000);
          }
        });
    }
  },
  mounted() {
    this.isBSystem = eval(sessionStorage.getItem('isBSystem')) || false;
    this.GetKilnsTypesList();
  },
  beforeDestroy() {
    clearInterval(this.timer);
  }
};
</script>
<style lang="scss" scoped>
.temperatureMonitoring-Page {
  height: calc(100% - 160px);
  margin: 20px;
  margin-top: 110px;
  background-color: #081027;
  color: #fff;

  &.blackBlueBg {
    background-color: #081027;
    box-shadow: 0 3px 6px 0 rgb(0 0 0 / 16%);
    color: #fff;
  }

  .page-center {
    width: 100%;
    height: 100%;
    background: #081027;
    border: 2px solid #2a3058;

    .select {
      height: 60px;
      background: #0b1530;
      border-bottom: 1px solid #38415a;
      display: flex;
      flex-direction: row;
      align-items: center;

      .select-text {
        font-size: 16px;
        font-weight: 400;
        color: #e4e4e4;
        margin-left: 20px;
        margin-right: 6px;
      }

      ::v-deep .el-input__inner {
        border-radius: 0;
        height: 36px;
        line-height: 36px;
        width: 174px;
        background: #1d2846;
        border: 1px solid #445992 !important;
        font-size: 16px;
        color: #c6cad8;
      }

      ::v-deep .el-input__icon {
        line-height: 36px;
      }

      .select-btn {
        width: 120px;
        height: 40px;
        line-height: 0;
        background: #386df0;
        color: #fff;
        border-radius: 4px;
        font-size: 16px;
        font-weight: bold;
        margin-left: 10px;
        border: 0;
      }
    }

    .content {
      width: 100%;
      height: calc(100% - 60px);
      padding: 22px 20px;
      box-sizing: border-box;
      display: flex;
      flex-direction: row;

      .content-left {
        width: 412px;
        height: 100%;
        background: #0e1732;
        border: 1px solid #2a3058;
        margin-right: 20px;
        padding: 16px;
        box-sizing: border-box;
        overflow-y: scroll;

        .cir-g,
        .cir-r {
          width: 25px;
          height: 25px;
          background: #9ee179;
          border-radius: 50%;
        }

        .cir-r {
          background: #df5f5f;
        }

        .box1 {
          border-bottom: 1px dashed #445992;
          padding-top: 20px;
          box-sizing: border-box;

          .box1-item {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            font-size: 16px;
            font-weight: 400;
            width: 100%;
            height: auto;
            margin-bottom: 25px;
          }
        }

        .box2 {
          border-bottom: 1px dashed #445992;
          padding: 22px 35px 40px 7px;

          .box2-title {
            padding-left: 30px;
            box-sizing: border-box;
            position: relative;
            margin-bottom: 20px;
          }

          .box2-title::before {
            content: '';
            width: 10px;
            height: 10px;
            background: #386df0;
            border-radius: 50%;
            position: absolute;
            top: 50%;
            left: 8px;
            transform: translate(0, -50%);
          }

          .box2-label {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;

            .box2-label-title {
              width: 115px;
              font-size: 16px;
            }

            .box2-label-info {
              flex: 1;
              display: flex;
              flex-direction: row;
              justify-content: space-between;
              align-items: center;

              .box2-info-item {
                display: flex;
                flex-direction: row;
                justify-content: flex-start;
                align-items: center;

                div {
                  margin-right: 10px;
                }
              }
            }
          }

          .box2-label:last-child {
            margin-bottom: 0;
          }
        }

        .box3 {
          padding: 35px 0 0 4px;

          .box3-item,
          .box3-item-t {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            margin-bottom: 33px;

            .box3-item-title {
              width: 80px;
              font-size: 16px;
            }

            .box3-item-input-R {
              width: calc(100% - 80px);
              height: auto;

              .box3-item-input-R-item {
                display: flex;
                justify-content: flex-start;
                align-items: center;
                margin-bottom: 25px;

                .box3-item-input-s {
                  margin-right: 5px;
                }

                .box3-item-input-s:last-child {
                  margin-right: 10px;
                }
              }

              .box3-item-input-R-item:last-child {
                margin-bottom: 0;
              }
            }

            .box3-item-input-l,
            .box3-item-input-s {
              width: 190px;
              height: 36px;
              background: #1d2846;
              border: 1px solid #445992;
              display: flex;
              justify-content: center;
              align-items: center;
              margin-right: 20px;
            }

            .box3-item-input-s {
              width: 100px;
              margin-right: 0;
            }

            .box3-item-unit {
              font-size: 16px;
              color: #7481a8;
              margin-right: 30px;
            }

            .box3-item-unit-m {
              font-size: 16px;
              width: 32px;
              color: #7481a8;
              text-align: center;
            }
          }

          .box3-item-t {
            align-items: flex-start;
            margin-bottom: 28px;
          }
        }
      }

      .content-left::-webkit-scrollbar {
        width: 0 !important;
      }

      .content-right {
        width: calc(100% - 412px);
        height: 100%;
        overflow-y: scroll;

        .right-title {
          padding-left: 30px;
          box-sizing: border-box;
          position: relative;
          margin-bottom: 10px;
        }

        .right-title::before {
          content: '';
          width: 10px;
          height: 10px;
          background: #386df0;
          border-radius: 50%;
          position: absolute;
          top: 50%;
          left: 8px;
          transform: translate(0, -50%);
        }

        .right-table {
          width: 100%;
          margin-bottom: 20px;
          display: flex;
          background: #0e1732;
          color: #fff;

          .clomn {
            flex: 1;
            height: auto;
            border-right: #304171 0.5px solid;

            .row {
              border-bottom: #304171 0.5px solid;
              width: 100%;
              height: 36px;
              display: flex;
              align-items: center;
              justify-content: center;
              color: #9aa3be;
            }

            .row:nth-child(2n) {
              background: #121c3a;
            }

            .row:first-child {
              background: #18254e;
              color: #fff;
            }
          }

          .clomn:first-child {
            .row {
              background: #18314e;
              color: #fff;
            }
          }
        }
      }

      .content-right::-webkit-scrollbar {
        width: 0 !important;
      }
    }
  }
}
</style>