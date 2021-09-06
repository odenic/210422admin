<template>
  <el-card>
    <template #header>
      <div class="search-header">
        <span>线上热门搜索</span>

        <el-dropdown>
          <i class="el-icon-more" />
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>黄金糕</el-dropdown-item>
            <el-dropdown-item>狮子头</el-dropdown-item>
            <el-dropdown-item>螺蛳粉</el-dropdown-item>
            <el-dropdown-item>双皮奶</el-dropdown-item>
            <el-dropdown-item>蚵仔煎</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </template>

    <el-row :gutter="30">
      <el-col :span="12"><SearchChart :search-data="userData" /></el-col>
      <el-col :span="12"><SearchChart :search-data="countData" /></el-col>
    </el-row>

    <el-table :data="tableData" size="small" border class="search-table">
      <el-table-column label="排名" type="index" width="80" />
      <el-table-column label="搜索关键字" width="180" />
      <el-table-column label="用户数" sortable />
      <el-table-column label="周涨幅" sortable />
    </el-table>
    <el-pagination
      class="search-pagination"
      layout="prev, pager, next"
      :total="1000"
    />
  </el-card>
</template>

<script>
import SearchChart from './searchChart'
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
      tableData: [{}]
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
</style>
