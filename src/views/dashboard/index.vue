<template>
  <div class="dashboard-container">
    <el-row :gutter="10">
      <el-col :xs="24" :sm="12" :lg="6">
        <Card :title="'总销售额'" :data="'¥ 126560'">
          <div class="chart">
            <span>周同比</span>
            <span
              class="abc"
            >56.67%<i
              style="color:red;margin:0 4px"
              class="el-icon-caret-top"
            /></span>
            <span>日同比</span>
            <span
              class="abc"
            >76.999%<i
              style="color:green;margin:0 4px"
              class="el-icon-caret-bottom"
            /></span>
          </div>
          <template #footer>
            <div class="footer">日销售额 ¥ 126560</div>
          </template>
        </Card>
      </el-col>
      <el-col :xs="24" :sm="12" :lg="6">
        <Card :title="'访问量'" :data="'46856'">
          <LineCharts />
          <template #footer>
            <div class="footer">日访问量 1245</div>
          </template>
        </Card>
      </el-col>
      <el-col :xs="24" :sm="12" :lg="6">
        <Card :title="'支付笔数'" :data="'84855'">
          <BarCharts />
          <template #footer>
            <div class="footer">转化率 66%</div>
          </template>
        </Card>
      </el-col>
      <el-col :xs="24" :sm="12" :lg="6">
        <Card :title="'运营活动效果'" :data="'78%'">
          <BarCharts2 />
          <template #footer>
            <div class="footer"><span>周同比</span>
              <span
                class="abc"
              >56.67%<i
                style="color:red;margin:0 4px"
                class="el-icon-caret-top"
              /></span>
              <span>日同比</span>
              <span
                class="abc"
              >76.999%<i
                style="color:green;margin:0 4px"
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
export default {
  name: 'Dashboard',
  components: {
    Card,
    LineCharts,
    BarCharts,
    BarCharts2,
    SaleStatistics,
    Footer
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
</style>
