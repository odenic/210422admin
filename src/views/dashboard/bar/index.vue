<template>
  <div ref="Bar" class="cnm" />
</template>

<script>
import * as echarts from 'echarts'
export default {
  name: 'BarCharts',
  mounted() {
    const chart1 = echarts.init(this.$refs['Bar'])
    var option = {
      tooltip: {},
      xAxis: {
        data: [
          '衬衫',
          '羊毛衫',
          '雪纺衫',
          '裤子',
          '高跟鞋',
          '袜子',
          '衬衫',
          '羊毛衫',
          '雪纺衫',
          '裤子',
          '高跟鞋',
          '袜子'
        ],
        show: false
      },
      yAxis: {
        show: false
      },
      grid: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
      },
      series: [
        {
          name: '销量',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20, 20, 36, 10, 10, 20, 55],
          silent: true
        }
      ]
    }
    chart1.setOption(option)
  }
}
</script>
<style></style>
