<template>
  <div class="dashboard-container">
    <el-row v-if="data.chartData" :gutter="10">
      <el-col :xs="24" :sm="12" :lg="6">
        <Card :title="'总销售额'" :data="`¥ ${data.chartData.salesTotal}`">
          <div class="chart">
            <span>月同比</span>
            <span
              class="abc"
            >{{ data.chartData.salesGrowthLastMonth }}%<i
              :class="data.chartData.salesGrowthLastMonth>0?'rise':'decline'"
              class="el-icon-caret-top"
            /></span>
            <span>日同比</span>
            <span
              class="abc"
            >{{ data.chartData.salesGrowthLastDay }}%<i
              :class="data.chartData.salesGrowthLastDay>0?'rise':'decline'"
              class="el-icon-caret-bottom"
            /></span>
          </div>
          <template #footer>
            <div class="footer">日销售额 ¥ {{ data.chartData.salesToday }}</div>
          </template>
        </Card>
      </el-col>
      <el-col :xs="24" :sm="12" :lg="6">
        <Card :title="'访问量'" :data="data.chartData.visitTotal+''">
          <LineCharts />
          <template #footer>
            <div class="footer">日访问量 {{ data.chartData.visitToday }}</div>
          </template>
        </Card>
      </el-col>
      <el-col :xs="24" :sm="12" :lg="6">
        <Card :title="'支付笔数'" :data="data.chartData.payTotal+''">
          <BarCharts />
          <template #footer>
            <div class="footer">转化率 {{ data.chartData.payRate }}</div>
          </template>
        </Card>
      </el-col>
      <el-col :xs="24" :sm="12" :lg="6">
        <Card :title="'运营活动效果'" :data="`${data.chartData.activityRate}%`">
          <BarCharts2 />
          <template #footer>
            <div class="footer"><span>月同比</span>
              <span
                class="abc"
              >{{ data.chartData.activityGrowthLastMonth }}%<i
                :class="data.chartData.activityGrowthLastMonth>0?'rise':'decline'"
                class="el-icon-caret-top"
              /></span>
              <span>日同比</span>
              <span
                class="abc"
              >{{ data.chartData.activityGrowthLastDay }}%<i
                :class="data.chartData.activityGrowthLastDay>0?'rise':'decline'"
                class="el-icon-caret-bottom"
              /></span></div>
          </template>
        </Card>
      </el-col>
    </el-row>
    <SaleStatistics />
    <Footer />
  </div>
</template>

<script>
import Card from './card'
import LineCharts from './line'
import BarCharts from './bar'
import BarCharts2 from './bar2'
import SaleStatistics from './saleStatistics'
import Footer from './footer'

import { mapActions, mapState } from 'vuex'
export default {
  name: 'Dashboard',
  components: {
    Card,
    LineCharts,
    BarCharts,
    BarCharts2,
    SaleStatistics,
    Footer
  },
  computed: {
    ...mapState('charts', ['data'])
  },
  async mounted() {
    await this.getChartsData()
  },
  methods: {
    ...mapActions('charts', ['getChartsData'])
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
.chart{
  height: 100px;
  display: table-cell;
  vertical-align: bottom;
  padding-bottom: 10px;
  border-bottom: 1px solid rgb(238, 234, 234);
}
.abc{
  margin: 0 8px;
}
.footer{
  margin-top: 10px;
}
.rise{
  color: red;
  margin: 0 4px;
}
.decline{
  color: green;
  margin: 0 4px;
}
</style>
