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

export default {
  name: 'Category',
  data() {
    return {
      category: '全部渠道'
    }
  },
  mounted() {
    this.myEcharts = echarts.init(this.$refs.charts)
    this.myEcharts.setOption({
      title: {
        text: '搜索引擎',
        subtext: 1048,
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
          data: [
            { value: 1048, name: '搜索引擎' },
            { value: 735, name: '直接访问' },
            { value: 580, name: '邮件营销' },
            { value: 484, name: '联盟广告' },
            { value: 300, name: '视频广告' }
          ]
        }
      ]
    })

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
.category{
  margin-bottom: 10px;
}
.category-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.charts{
  width: 100%;
  height: 257px;
}
</style>
