<template>
  <div ref="Line" class="cnm" />
</template>

<script>
import * as echarts from 'echarts'
import { mapState } from 'vuex'
export default {
  name: 'BarCharts',
  computed: {
    ...mapState('charts', ['data'])
  },
  mounted() {
    const chart1 = echarts.init(this.$refs['Line'])
    var option1 = {
      tooltip: {},
      xAxis: {
        data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子', '裤子', '高跟鞋', '袜子', '裤子', '高跟鞋', '袜子'],
        show: false
      },
      yAxis: {
        show: false
      },
      grid: {
        left: -20,
        right: -20,
        top: 0,
        bottom: 0
      },
      series: [{
        name: '销量',
        type: 'line',
        data: this.data.chartData.visitTrend,
        itemStyle: {
          opacity: 0
        },
        smooth: true,
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
              offset: 0, color: '#975fe4' // 0% 处的颜色
            }, {
              offset: 1, color: '#fff' // 100% 处的颜色
            }]
          }
        },
        lineStyle: {
          color: '#975fe4'
        },
        silent: true
      }]
    }
    chart1.setOption(option1)
  }
}
</script>

<style>
.cnm {
  width: 320px;
  height: 100px;
  display: table-cell;
  vertical-align: bottom;
  padding-bottom: 10px;
  border-bottom: 1px solid rgb(238, 234, 234);
}
</style>
