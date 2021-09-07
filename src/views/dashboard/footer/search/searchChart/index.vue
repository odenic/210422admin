<template>
  <div class="search">
    <div class="search-header">
      <span class="search-title">{{ searchData.title }}</span>
      <svg
        t="1628558206925"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="1972"
        width="16"
        height="16"
      >
        <path
          d="M512 0a512 512 0 1 0 0 1024A512 512 0 0 0 512 0z m0 896A384 384 0 0 1 512 128a384 384 0 0 1 0 768z m29.696-194.88c-11.136 10.112-24.96 17.344-31.488 15.36-6.08-1.792-9.536-7.424-8.384-13.056l89.344-248c7.424-31.488-12.736-60.16-55.424-63.872-44.8 0-110.976 40.128-151.232 90.944 0 6.08-1.344 21.12 0.128 30.208l53.632-54.208c11.008-10.176 23.808-17.344 30.336-15.424 6.592 1.92 10.112 8.384 8 14.464l-88.704 246.848c-10.176 28.864 9.152 57.152 56.192 63.616 68.928 0 109.888-39.168 150.208-89.984 0-6.08 2.368-22.08 0.96-31.104l-53.568 54.208zM575.744 192c-35.584 0-64.448 25.728-64.448 63.808 0 37.952 28.864 63.744 64.448 63.744 35.648 0 64.448-25.728 64.448-63.744 0-38.08-28.8-63.808-64.448-63.808z"
          p-id="1973"
          fill="#bfbfbf"
        />
      </svg>
    </div>
    <div>
      <span class="search-count">{{ searchData.count }}</span>
      <span class="search-precent">{{ Math.abs(searchData.precent) }}</span>
      <svg
        v-if="searchData.precent > 0"
        t="1628558608250"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="5011"
        width="12"
        height="12"
      >
        <path
          d="M77.01369341 651.62563145L465.92050279 226.34930347a61.20218114 61.20218114 0 0 1 45.97224413-20.80173438A61.20218114 61.20218114 0 0 1 557.86856617 226.34930346L946.773588 651.62563145c18.98558228 20.05275039 24.85232562 49.27921402 15.04045657 75.09324227s-33.49334857 43.83969546-61.01448826 46.29221581l-777.49364709 0c-27.62660522-2.34705484-51.41176271-20.26546899-61.22541931-46.1867503-9.92090966-25.91949376-4.05416635-55.03870431 14.9332035-75.19870778z"
          p-id="5012"
          fill="#d81e06"
        />
      </svg>
      <svg
        v-else
        t="1628558630690"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="5276"
        width="12"
        height="12"
      >
        <path
          d="M919.8 381.1L555.2 779.8a57.377 57.377 0 0 1-43.1 19.5c-16.5 0-32.2-7.1-43.1-19.5L104.4 381.1c-17.8-18.8-23.3-46.2-14.1-70.4s31.4-41.1 57.2-43.4h728.9c25.9 2.2 48.2 19 57.4 43.3 9.3 24.3 3.8 51.6-14 70.5z"
          p-id="5277"
          fill="#1afa29"
        />
      </svg>
    </div>
    <div ref="charts" class="charts" />
  </div>
</template>

<script>
import * as echarts from 'echarts'
import { mapState } from 'vuex'
import resize from '@/mixins/resize'

export default {
  name: 'SearchChart',
  mixins: [resize],
  props: {
    searchData: Object
  },
  computed: {
    ...mapState('charts', ['data'])
  },
  mounted() {
    this.myEcharts = echarts.init(this.$refs.charts)
    this.myEcharts.setOption({
      xAxis: {
        // 等分
        type: 'category',
        // 去掉两边留白
        boundaryGap: false,
        // 不显示
        show: false
      },
      yAxis: {
        show: false
      },
      series: {
        type: 'line',
        data: this.searchData.data,
        // 平滑曲线显示
        smooth: true,
        // 拐点样式
        itemStyle: {
          opacity: 0
        },
        // 线样式
        lineStyle: {
          color: '#975fe4'
        },
        // 区域样式
        areaStyle: {
          // 颜色渐变
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: '#975fe4' // 0% 处的颜色
              },
              {
                offset: 1,
                color: '#fff' // 100% 处的颜色
              }
            ],
            global: false // 缺省为 false
          }
        },
        // 不响应和触发鼠标事件
        silent: true
      },
      grid: {
        left: 0,
        top: 0,
        bottom: 0,
        right: 0
      }
    })
  }
}
</script>

<style lang="sass" scoped>
.search
  margin-bottom: 20px
.search-hAeader
  color: gray
  font-size: 16px
  display: flex
  align-items: center
  margin: 10px 0 20px
.search-title
  margin-right: 10px
.search-count
  font-size: 25px
  margin-right: 30px
.search-precent
  color: gray
  margin-right: 5px
.charts
  width: 100%
  height: 50px
</style>
