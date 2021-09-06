<template>
  <div ref="Bar2" class="cnm" />
</template>

<script>
import * as echarts from 'echarts'
export default {
  name: 'BarCharts2',
  mounted() {
    const chart1 = echarts.init(this.$refs['Bar2'])
    const option = {
      xAxis: {
        show: false,
        min: 0,
        max: 100
      },
      yAxis: { show: false, type: 'category' },
      series: {
        type: 'bar',
        data: [78],
        silent: true,
        showBackground: true,
        itemStyle: {
          color: 'brown'
        },
        barWidth: 15,
        label: {
          show: true,
          formatter: '|',
          color: 'orange',
          position: 'right'
        }
      },
      grid: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
      }
    }
    chart1.setOption(option)
  }
}
</script>
