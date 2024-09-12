myChart = echarts.init(document.getElementById('chart'));
 
  var yA = [0.85, 0.86, 0.87, 0.75, 0.79,
            0.87, 0.96, 0.77, 0.87, 0.85,
            0.86, 0.83, 0.82, 0.81, 0.89,
            0.77, 0.86, 0.71, 0.84, 0.85,
            0.87, 0.84, 0.82, 0.71, 0.99]

  var arrnumber = 5;
  var mininter = 0.01;
  var USL = 0.95;
  var LSL = 0.6;



  //确定横坐标轴上下限
  if ((Math.max(yA) > USL)) {
      var uplimit = Math.max(yA) + mininter;
  }
  else {
      var uplimit = USL + mininter;
  }

  if (Math.min(yA) < LSL) {
      var downlimit = Math.min(yA) - mininter;
  }
  else {
      var downlimit = LSL - mininter;
  }

  //确定横坐标每组宽度
  var det = ((Math.max.apply(null, yA) - Math.min.apply(null, yA)) / arrnumber);

  var X_Y = new Array();
  for (var i = 0; i < arrnumber; i++) {
      X_Y[i] = new Array();
      X_Y[i][0] = Math.min.apply(null, yA)+i*det;
      var lit = Math.min.apply(null, yA) +(i+1)*det;
      var ss = 0
      for (var j = 0; j < yA.length; j++) {
          if (yA[j] >= X_Y[i][0] && yA[j] < lit) {
              ss = ss + 1;
          }
          if (i == arrnumber - 1 && j == yA.length - 1) {
              ss = ss + 1;
          }
      }
      //X_Y[i][1] = ss;
  }


//正态曲线





          // See https://github.com/ecomfe/echarts-stat
        //var bins = ecStat.histogram(girth, 'scott');
        var bins = ecStat.histogram(yA, 'scott');

        var interval;
        var min = Infinity;
        var max = -Infinity;


        data = echarts.util.map(X_Y, function (item, index) {
            //var x0 = X_Y[index][0].toFixed(2);
            //var x1 = (X_Y[index][0] + det).toFixed(2);
            //interval = det.toFixed(2);
            var x0 = X_Y[index][0];
            var x1 = X_Y[index][0]+det;
            interval = det;
            min = Math.min(min, x0);
            max = Math.max(max, x1);
            return [x0, x1, item[1]];
        });

        function renderItem(params, api) {
            var yValue = api.value(2);
            var start = api.coord([api.value(0), yValue]);
            var size = api.size([api.value(1) - api.value(0), yValue]);
            var style = api.style();

            return {
                type: 'rect',
                shape: {
                    x: start[0] + 1,
                    y: start[1],
                    width: size[0] - 2,
                    height: size[1]
                },
                style: style
            };
        }

        option = {
            title: {
                text: 'CPK计算分析图',
                subtext: '温度检测',
                //sublink: 'https://github.com/ecomfe/echarts-stat',
                left: 'center',
                top: 10
            },
            color: ['rgb(25, 183, 207)'],
            grid: {
                top: 80,
                containLabel: true
            },
            xAxis: [{
                type: 'value',
                min: min - interval,
                max: max + interval,
                interval: interval
            }],
            yAxis: [{
                type: 'value',
            }],
            series: [{
                name: 'height',
                type: 'custom',
                renderItem: renderItem,
                label: {
                    normal: {
                        show: true,
                        position: 'insideTop'
                    }
                },
                encode: {
                    x: [0, 1],
                    y: 2,
                    tooltip: 2,
                    label: 2
                },
                data: data
            }]
        };



















        myChart.setOption(option);















        //初始化模拟数组，一共5组25个变量
        var xA = new Array();

        for (var i = 1; i < 26; i++) {
            xA.push(i);
        }
        var yA = [0.85, 0.86, 0.87, 0.75, 0.79,
                 0.87, 0.96, 0.77, 0.87, 0.85,
                 0.86, 0.83, 0.82, 0.81, 0.89,
                  0.77, 0.86, 0.71, 0.84, 0.85,
                 0.87, 0.84, 0.82, 0.71, 0.99]

        var arrnumber = 5;
        var mininter = 0.01;
        var USL = 0.95;
        var LSL = 0.6;



        //确定横坐标轴上下限
        if ((Math.max(yA) > USL)) {
            var uplimit = Math.max(yA) + mininter;
        }
        else {
            var uplimit = USL + mininter;
        }

        if (Math.min(yA) < LSL) {
            var downlimit = Math.min(yA) - mininter;
        }
        else {
            var downlimit = LSL - mininter;
        }

        //确定横坐标每组宽度
        var det = (Math.max.apply(null, yA) - Math.min.apply(null, yA)) / arrnumber;

        var X_Y = new Array();
        for (var i = 0; i < arrnumber; i++) {
            X_Y[i] = new Array();
            X_Y[i][0] = Math.min.apply(null, yA);
            X_Y[i][1] = Math.min.apply(null, yA) + det;
            var ss = 0
            for (var j = 0; j < yA.length; j++) {
                if (yA[j] >= X_Y[i][0] && yA[j] < X_Y[i][1]) {
                    ss = ss + 1;
                }
                if (i == arrnumber - 1 && j == yA.length - 1) {
                    ss = ss + 1;
                }
            }
            X_Y[i][2] = ss;
        }


        renderItem = {
            type: 'rect',
            shape: {
                x: X_Y[1][0],
                y: X_Y[1][1],
                width: det,
                height: 24
            },
        }

        var yB = new Array();
        for (var i = 1; i < X_Y.length; i++) {
            yB.push(X_Y[i][2]);
        }





        var UCLR = 0.9;
        var LCLR = 0.7;





        option = {
            title: {
                text: 'CPK计算分析图',
                subtext: '温度检测',
                left: "center"
            },
            tooltip: {
                trigger: 'axis'
            },
            calculable: true,
            xAxis: [{
                type: 'category',
                boundaryGap: false,
                //data: xA
            }],
            yAxis: [{
                type: 'value',
                axisLabel: {
                    formatter: '{value} °C'
                },
                name: '温度频数'
            }],
            series: [{
                //renderItem: renderItem,
                name: '检测温度',
                type: 'bar',
                data: X_Y,
                renderItem: function (params, api) {
                    var categoryIndex = api.value(0);
                    var start = api.coord([api.value(1), categoryIndex]);
                    var end = api.coord([api.value(2), categoryIndex]);
                    var height = api.size([0, 1])[1] * 0.6;

                    return {
                        type: 'rect',
                        shape: echarts.graphic.clipRectByRect({
                            x: start[0],
                            y: start[1] - height / 2,
                            width: end[0] - start[0],
                            height: height
                        }, {
                            x: params.coordSys.x,
                            y: params.coordSys.y,
                            width: params.coordSys.width,
                            height: params.coordSys.height
                        }),
                        style: api.style()
                    };
                },
            }]
        };