<template>
  <el-card class="category">
    <template #header>
      <div class="category-header">
        <span>销售额类别占比</span>
        <el-radio-group v-model="category" size="small">
          <el-radio-button label="全部渠道" />
          <el-radio-button label="线上" />
          <el-radio-button label="门店" />
        </el-radio-group>
      </div>
    </template>

    <div ref="charts" class="charts" />
  </el-card>
</template>

<script>
import * as echarts from 'echarts'
import 'echarts/extension/bmap/bmap'
import { mapState } from 'vuex'
import resize from '@/mixins/resize'

export default {
  name: 'Category',
  mixins: [resize],
  data() {
    return {
      category: '全部渠道',
      options: {
        title: {
          text: '占比',
          left: 'center',
          top: '43%',
          textStyle: {
            fontSize: 14,
            fontWeight: 200,
            color: '#000'
          },
          subtextStyle: {
            fontSize: 30,
            color: '#000'
          },
          padding: 0
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: ['40%', '70%'],
            itemStyle: {
              borderColor: '#fff',
              borderWidth: 2
            },
            label: {
              formatter: '{b}: {c}',
              position: 'outside'
            },
            data: this.chartsData
          }
        ]
      }
    }
  },
  computed: {
    ...mapState('charts', ['data']),
    chartsData() {
      const data = []
      if (this.data.chartData) {
        if (this.category === '全部渠道') {
          const arr = []
          this.data.chartData.saleRank.online.value.map((item, index) =>
            arr.push(item + this.data.chartData.saleRank.shop.value[index])
          )
          this.data.chartData.saleRank.online.name.map((item, index) =>
            data.push({ value: arr[index], name: item })
          )
          return data
        } else if (this.category === '线上') {
          this.data.chartData.saleRank.online.name.map((item, index) =>
            data.push({
              value: this.data.chartData.saleRank.online.value[index],
              name: item
            })
          )
          return data
        } else if (this.category === '门店') {
          this.data.chartData.saleRank.online.name.map((item, index) =>
            data.push({
              value: this.data.chartData.saleRank.shop.value[index],
              name: item
            })
          )
          return data
        }
      }
      return []
    }
  },
  watch: {
    options: {
      deep: true,
      handler(n) {
        this.myEcharts.setOption(n)
      }
    },
    chartsData(n) {
      this.options.series[0].data = n
      this.options.title.text = n[0].name
      this.options.title.subtext = n[0].value
    }
  },
  mounted() {
    this.myEcharts = echarts.init(this.$refs.charts)
    this.myEcharts.setOption(this.options)

    this.myEcharts.on('mouseover', params => {
      const { name, value } = params.data
      this.myEcharts.setOption({
        title: {
          text: name,
          subtext: value
        }
      })
    })
  }
}
</script>

<style lang="scss" scoped>
.category {
  margin-bottom: 10px;
  height: 499px;
}
.category-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.charts {
  width: 100%;
  height: 257px;
  margin: 50px 0 80px 0;
}
</style>
