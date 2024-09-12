// 实时时序-测试数据
const realtimeSequenceData = [
  {
    product: 'Id001', // 产品码
    duration: 120, // 时长
    workingProcedureName: '前地板ML20', // 工序
    workingProcedureList: [
      {
        name: '人工上件1',
        start: 10,
        duration: 10,
        end: 20,
        artificial: 20, // 人工动作实际时长
        device: 20, // 设备动作实际时长
        range: 20, // 上下限范围内的时长
        upperLimit: 20, // 超出上限的时长
        lowerLimit: 20, // 未达下限的时长
      }
    ],
  }, 
  {
    product: 'Id002', // 产品码
    duration: 360, // 时长
    workingProcedureName: '前地板ML20', // 工序
    workingProcedureList: [
      {
        name: '人工上件2',
        start: 10,
        duration: 15,
        end: 25,
        artificial: 20,
        device: 20,
        range: 20,
        upperLimit: 20,
        lowerLimit: 20,
      }, {
        name: '人工上件3',
        start: 20,
        duration: 10,
        end: 30,
      },
    ],
  }, 
  {
    product: 'Id003', // 产品码
    duration: 360, // 时长
    workingProcedureName: '前地板ML20', // 工序
    workingProcedureList: [
      {
        name: '人工上件4',
        start: 10,
        duration: 15,
        end: 25,
      }, {
        name: '人工上件5',
        start: 20,
        duration: 10,
        end: 30,
      }, {
        name: '人工上件6',
        start: 30,
        duration: 15,
        end: 45,
      }, 
    ],
  },
  {
    product: 'Id004', // 产品码
    duration: 360, // 时长
    workingProcedureName: '前地板ML20', // 工序
    workingProcedureList: [
      {
        name: '人工上件1',
        start: 10,
        duration: 15,
        end: 25,
      }, {
        name: '人工上件2',
        start: 20,
        duration: 10,
        end: 30,
      }, {
        name: '人工上件3',
        start: 0,
        duration: 15,
        end: 15,
      }, 
    ],
  },
]

export {
  realtimeSequenceData
}