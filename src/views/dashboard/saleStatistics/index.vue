<template>
  <el-card class="statistics">
    <el-tabs v-model="activeName">
      <el-tab-pane label="销售额" name="sale" />
      <el-tab-pane label="访问量" name="visit" />
    </el-tabs>
    <div class="block">
      <span class="demonstration" @click="setToday">今日</span>
      <span class="demonstration" @click="setWeek">本周</span>
      <span class="demonstration" @click="setMonth">本月</span>
      <span class="demonstration" @click="setYear">本年</span>
      <el-date-picker
        v-model="date"
        class="date"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        value-format="yyyy-MM-dd"
      />
    </div>
    <el-row :gutter="20">
      <el-col :sm="24" :lg="18">
        <VisitedChart :name="name" :data="chartData" />
      </el-col>
      <el-col :sm="24" :lg="6">
        <p class="sales-data-title">{{ name }}</p>
        <ul class="sales-data-list">
          <li v-for="item,index in list" :key="index">
            <span :class="item.no<=3?'sales-data-index active':'sales-data-index'">{{ item.no }}</span>
            <span class="sales-data-name">{{ item.name }}</span>
            <span class="sales-data-value">{{ item.money || item.user }}</span>
          </li>
        </ul>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
import dayjs from 'dayjs'
import VisitedChart from './visitedChart'
import { mapState } from 'vuex'
export default {
  name: 'SaleStatistics',
  components: {
    VisitedChart
  },
  data() {
    return {
      activeName: 'sale',
      date: []
    }
  },
  computed: {
    ...mapState('charts', ['data']),
    name() {
      return this.activeName === 'sale' ? '门店销售量排名' : '门店访问量排名'
    },
    list() {
      if (this.data.chartData) {
        return this.activeName === 'sale' ? this.data.chartData.orderRank : this.data.chartData.userRank
      }
      return undefined
    },
    chartData() {
      if (this.data.chartData) {
        return this.activeName === 'sale' ? this.data.chartData.orderFullYear : this.data.chartData.userFullYear
      }
      return undefined
    }
  },
  methods: {
    setToday() {
      const date = dayjs().format('YYYY-MM-DD')
      this.date = [date, date]
    },
    setWeek() {
      const start = dayjs()
        .startOf('week')
        .add(1, 'day')
        .format('YYYY-MM-DD')
      const end = dayjs()
        .endOf('week')
        .add(1, 'day')
        .format('YYYY-MM-DD')
      this.date = [start, end]
    },
    setMonth() {
      const start = dayjs()
        .startOf('month')
        .format('YYYY-MM-DD')
      const end = dayjs()
        .endOf('month')
        .format('YYYY-MM-DD')
      this.date = [start, end]
    },
    setYear() {
      const start = dayjs()
        .startOf('year')
        .format('YYYY-MM-DD')
      const end = dayjs()
        .endOf('year')
        .format('YYYY-MM-DD')
      this.date = [start, end]
    }
  }
}
</script>

<style lang="scss" scoped>
.statistics {
  margin-top: 10px;
  margin-bottom: 10px;
  position: relative;
}
.demonstration {
  margin: 0 10px;
}
.date {
  margin-left: 10px;
}
.sales-data-title {
  font-size: 14px;
  color: #000;
}
.sales-data-list {
  list-style: none;
  margin: 0;
  padding: 0;
  li {
    overflow: hidden;
    line-height: 20px;
    margin-bottom: 20px;
    font-size: 16px;
  }
}
.sales-data-index {
  float: left;
  font-size: 14px;
  width: 20px;
  height: 20px;
  background-color: #fafafa;
  color: #000;
  border-radius: 50%;
  text-align: center;
  line-height: 20px;
  &.active {
    background-color: #000;
    color: #fafafa;
  }
}
.sales-data-name {
  float: left;
  margin-left: 30px;
}
.sales-data-value {
  float: right;
}
.block {
  position: absolute;
  right: 20px;
  top: 15px;
}
</style>
