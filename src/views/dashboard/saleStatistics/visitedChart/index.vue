<template>
  <div ref="chart" class="visited-chart" />
</template>

<script>
import * as echarts from 'echarts'

export default {
  name: 'VisitedChart',
  props: {
    name: {
      type: String,
      default: ''
    },
    data: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      myChart: undefined,
      option: {
        title: {
          text: this.name,
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
          data: this.data,
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
    }
  },
  watch: {
    name(n) {
      this.option.title.text = n
      this.myChart.setOption(this.option)
    },
    data: {
      deep: true,
      handler(n) {
        this.option.series.data = n
        this.myChart.setOption(this.option)
      }
    }
  },
  mounted() {
    this.myChart = echarts.init(this.$refs.chart)
    this.myChart.setOption(this.option)
  }
}
</script>

<style scoped>
.visited-chart {
  width: 1200px;
  height: 300px;
}
</style>
