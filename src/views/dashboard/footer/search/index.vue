<template>
  <el-card class="searchCard">
    <template #header>
      <div class="search-header">
        <span>线上热门搜索</span>
      </div>
    </template>

    <el-row :gutter="30">
      <el-col :span="12"><SearchChart :search-data="userData" /></el-col>
      <el-col :span="12"><SearchChart :search-data="countData" /></el-col>
    </el-row>

    <el-table :data="tableData" size="small" border class="search-table">
      <el-table-column label="排名" type="index" width="80" />
      <el-table-column label="搜索关键字" width="180" prop="word" />
      <el-table-column label="用户数" sortable prop="user" />
      <el-table-column label="搜索次数" sortable prop="count" />
    </el-table>
    <el-pagination
      class="search-pagination"
      layout="prev, pager, next"
      :total="45"
      :page-size="5"
      :current-page="page"
      @current-change="handleCurrentChange"
    />
  </el-card>
</template>

<script>
import SearchChart from './searchChart'
import { mapState } from 'vuex'
export default {
  name: 'Search',
  components: {
    SearchChart
  },
  data() {
    return {
      userData: {
        title: '搜索用户数',
        count: 12321,
        precent: 17.1,
        data: [20, 15, 35, 22, 30, 10, 45]
      },
      countData: {
        title: '人均搜索次数',
        count: 2.7,
        precent: -26.2,
        data: [20, 15, 35, 22, 30, 10, 45]
      },
      tableData: [{}],
      page: 1
    }
  },
  computed: {
    ...mapState('charts', ['data'])
  },
  watch: {
    page() {
      const start = (this.page - 1) * 5
      const end = start + 5
      this.tableData = this.data.chartData.searchWord.slice(start, end)
    },
    data() {
      this.tableData = this.data.chartData.searchWord.slice(0, 5)
    }
  },
  methods: {
    handleCurrentChange(current) {
      this.page = current
    }
  }
}
</script>

<style lang="sass" scoped>
.search-header
  display: flex
  justify-content: space-between
.search-table
  margin-bottom: 10px
.search-pagination
  float: right
  margin-bottom: 10px
  position: absolute
  bottom: 0
  right: 20px
.searchCard
  height: 499px
  position: relative
</style>
