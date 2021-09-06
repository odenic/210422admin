<template>
  <div ref="chart" class="visited-chart" />
</template>

<script>
import * as echarts from 'echarts'

export default {
  name: 'VisitedChart',
  mounted() {
    const myChart = echarts.init(this.$refs.chart)
    const option = {
      title: {
        text: '访问量趋势',
        textStyle: {
          fontSize: 14
        },
        top: '5%'
      },
      tooltip: {
        show: true,
        trigger: 'axis',
        axisPointer: {
          type: 'line',
          lineStyle: {
            width: 50,
            color: 'rgba(0, 0, 0, .1)'
          }
        }
      },
      xAxis: {
        data: [
          '一月',
          '二月',
          '三月',
          '四月',
          '五月',
          '六月',
          '七月',
          '八月',
          '九月',
          '十月',
          '十一月',
          '十二月'
        ]
      },
      yAxis: {},
      series: {
        name: '销售量',
        type: 'bar',
        data: [22, 12, 33, 15, 28, 44, 11, 23, 37, 33, 15, 28, 44],
        barWidth: 30
      },
      grid: {
        left: '3%',
        right: '3%',
        top: '20%',
        bottom: 0,
        containLabel: true
      }
    }
    myChart.setOption(option)
  }
}
</script>

<style scoped>
.visited-chart {
  width: 100%;
  height: 300px;
}
</style>
